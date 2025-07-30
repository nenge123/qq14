import * as timeTools from './time.js';
import * as weatherZone from './skywatcherRate.js';
export function forecast(lDate, zone) {
	var weatherRate = weatherZone.findRate(zone);
	if (!weatherRate) {
		console.error("天气地区不存在 ", zone,weatherRate);
		return null;
	}
	var forecastTarget = calculateForecastTarget(lDate);
	var rate = weatherRate.rates.filter(r=>{
		return forecastTarget < r.rate;
	})[0];
	return weatherZone.weatherCnIndex[rate.weather];
}

export function calculateForecastTarget(lDate) {
	// Thanks to Rogueadyn's SaintCoinach library for this calculation.

	var unixSeconds = parseInt(lDate.getTime() / 1000);
	// Get Eorzea hour for weather start
	var bell = unixSeconds / 175;

	// Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
	var increment = (bell + 8 - (bell % 8)) % 24;

	// Take Eorzea days since unix epoch
	var totalDays = unixSeconds / 4200;
	totalDays = (totalDays << 32) >>> 0; // uint

	// 0x64 = 100
	var calcBase = totalDays * 100 + increment;

	// 0xB = 11
	var step1 = ((calcBase << 11) ^ calcBase) >>> 0; // uint
	var step2 = ((step1 >>> 8) ^ step1) >>> 0; // uint

	// 0x64 = 100
	return step2 % 100;
}

export function getWeatherInterval(eDate) {
	var eWeather = new Date(eDate ? eDate : timeTools.eCurrentTime());
	eWeather.setUTCHours(parseInt(eWeather.getUTCHours() / 8) * 8);
	eWeather.setUTCMinutes(0);
	eWeather.setUTCSeconds(0);
	return eWeather;
}
/**
 * 迭代区域天气列表
 * @param {Number} eStart 
 * @param {*} zone 
 * @param {*} name 
 * @param {Function} callback(weather:当前天气, transitionWeather:之前天气, eTime:艾欧泽亚时间) 回调函数返回一个布尔值,是否停止迭代
 * @returns 
 */
export function iterateWeather(eStart, zone, name, callback) {
	var eCurrent = new Date(eStart);
	eCurrent.setUTCHours(eCurrent.getUTCHours() - 8);
	var transitionWeather = forecast(timeTools.eorzeaToLocal(eCurrent), zone);
	if (!transitionWeather) {
		console.error('Invalid weather zone, aborting.');
		return null;
	}

	for (var i = 0; i < 200000; i++) {
		eCurrent.setUTCHours(eCurrent.getUTCHours() + 8);
		var weather = forecast(timeTools.eorzeaToLocal(eCurrent), zone);
		if(!weather){
			break;
		}
		var result = callback(weather, transitionWeather, eCurrent);
		if (result)
			return result;

		transitionWeather = weather;
	}
	console.error('Infinite iteration detected', zone, name, eStart);
	return null;
}
/**
 * 当前天气
 * @param {*} eStart 
 * @param {*} zone 
 * @returns 
 */
export function eorzeaWeather(eStart, zone){
	return forecast(timeTools.eorzeaToLocal(eStart), zone);
}
/**
 * 
 * @param {*} eStart 
 * @param {*} eEnd 
 * @param {*} zone 
 * @returns {Array}
 */
export function eorzeaIterate(eStart, eEnd, zone){
	let data = [];
	eStart.setUTCHours(eStart.getUTCHours() - 8);
	for (var i = 0; i < 200000; i++) {
		eStart.setUTCHours(eStart.getUTCHours() + 8);
		data.push(eorzeaWeather(eStart,zone));
		if(eStart.getTime()>=eEnd.getTime()){
			break;
		}
	}
	return data;
}

/**
 * 
 * @param {JSON} timer 
 * {
 * 	def:{
 * 		zone:21,//区域
 * 		name:"名称",//
 * 		during:{start:1,end:1},//时间范围
 * 		weather:["阴云","薄雾","微风"],//指定天气
 * 		transition:["小雨","暴雨"],//过渡天气,
 * 		after:{eorzeaHours:}//延时
 * 	}
 * }
 * @param {*} now 
 * @returns 
 */
export function calculateNextPeriod(timer, now) {
	var eStart;
	now = now instanceof Date?now:new Date(now||undefined);
	if (timer.period) {
		eStart = timeTools.localToEorzea(timer.period.expire);
		eStart.setUTCHours(eStart.getUTCHours() + 8);
	} else
		eStart = timeTools.localToEorzea(now);

	var results = calculateWindow(eStart, timer.def);
	if (!results) {
		timer.isTimed = false;
		timer.period = null;
		return;
	}

	timer.period = {
		active: timeTools.eorzeaToLocal(results.active),
		expire: timeTools.eorzeaToLocal(results.expire),
		lastExpire: timer.period ? timer.period.expire : null
	};

	timer.period.mUp = (timer.period.expire - timer.period.active) / 60000;

	// If no expiration was encountered in the last 8 hours default to now.
	if (!timer.period.lastExpire)
		timer.period.lastExpire = now;
}
/**
 * 
 * @param {Number} eStart 
 * @param {JSON} options {
 * 		zone:21,//区域
 * 		name:"名称",//
 * 		during:{start:1,end:1},//时间范围
 * 		weather:["阴云","薄雾","微风"],//指定天气
 * 		transition:["小雨","暴雨"],//过渡天气,
 * 		after:{eorzeaHours:}//延时
 * 	}
 * @returns 
 */
export function calculateWindow(eStart, options) {
	var eStartInterval = getWeatherInterval(eStart);

	var hourCheck = null;
	if (options.during) {
		if (options.during.start < options.during.end)
			hourCheck = function (h) {
				return h >= options.during.start && h < options.during.end;
			};
		else
			hourCheck = function (h) {
				return h >= options.during.start || h < options.during.end;
			};
	}

	var results = {};

	results.active = iterateWeather(eStartInterval, options.zone, options.name, function (weather, transitionWeather, eTime) {
		if (options.transition && !options.transition.includes(transitionWeather))
			return;

		if (options.weather && !options.weather.includes(weather))
			return;

		if (hourCheck) {
			var eCheckTime = new Date(eTime);
			// Check all the hours between the time this weather starts and the time it ends.
			for (var i = 0; i < 8; i++) {
				var hour = eCheckTime.getUTCHours();
				if (hourCheck(hour)) {
					// Last check, it's happening!!
					return eCheckTime;
				}

				eCheckTime.setUTCHours(hour + 1);
			}

			return;
		}

		// All other checks passed.
		return eTime;
	});

	if (!results.active)
		return null;

	// Additional transforms after conditions are met.
	if (options.after) {
		if (options.after.eorzeaHours)
			results.active.setUTCHours(results.active.getUTCHours() + options.after.eorzeaHours);
	}

	// Now find when it expires.
	var eActive = getWeatherInterval(results.active);
	results.expire = iterateWeather(eActive, options.zone, options.name, function (weather, transitionWeather, eTime) {
		var eEnd = new Date(eTime);
		eEnd.setUTCHours(eEnd.getUTCHours() + 8);

		if (eEnd < results.active)
			return; // Doesn't start fast enough.

		if (options.transition && !options.transition.includes(transitionWeather))
			return eTime;

		if (options.weather && !options.weather.includes(weather))
			return eTime;

		if (hourCheck) {
			var eCheckTime = new Date(eTime);
			// Check all the hours between the time this weather starts and the time it ends.
			for (var i = 0; i < 8; i++) {
				var hour = eCheckTime.getUTCHours();
				if (eCheckTime > results.active && !hourCheck(hour))
					return eCheckTime;

				eCheckTime.setUTCHours(hour + 1);
			}
		}

		// Must still be happening.
	});

	if (!results.expire) {
		console.error("No expiration detected.  Possible 24/7 or all-weather duration.", options);
		return null;
	}

	return results;
}

export function daysIntoLunarCycle(eDate) {
	// Moon is visible starting around 6pm.  Change phase around noon when
	// it can't be seen.
	return ((eDate.getTime() / (1000 * 60 * 60 * 24)) + .5) % 32;
}

export function nextMoonPhase(eDate, moon, interCycleHourOffset) {
	var daysIntoCycle = daysIntoLunarCycle(eDate);
	var daysNeeded = moon * 4;

	var offsetDays = (daysNeeded - daysIntoCycle) + (interCycleHourOffset / 24);

	// Use next month if this time is in the past.
	if (offsetDays <= 0)
		offsetDays += 32;

	var ticks = eDate.getTime() + (offsetDays * timeTools.millisecondsPerDay);
	return new Date(ticks);
}