import * as sky from '/assets/js/esm/skywatcher.js';
import * as et from '../../assets/js/esm/time.js';
export default class app {
	timespit = [0, 8, 16];
	constructor(elm, dom) {
		console.log(elm, dom);
		this.elm = elm;
		this.timediv = document.createElement('div');
		this.elm.appendChild(this.timediv);
		this.loader(elm, dom);
	}
	async loader(elm, dom) {
		const json = await (await fetch('/pages/FFXIVSightseeingGuide/data.json')).json();
		this.list = [];
		for (const values of json) {
			let div = document.createElement('div');
			div.classList.add('flex');
			div.classList.add('center');
			const { start, end } = this.setDate(values, div);
			this.list.push({
				elm: div,
				value: values,
				end,
				start
			});
			//elm.appendChild(div);
		}
		this.list.sort((a, b) => a.start.getTime() > b.start.getTime() ? 1 : -1);

		for (const v of this.list) {
			this.elm.appendChild(v.elm);
		}
		this.start();
		setInterval(() => {
			this.start()
		}, 60000 / et.epochTimeFactor);
	}
	setDate(values, div) {
		const eStart = et.eCurrentTime();
		let hour = eStart.getUTCHours();
		/**
		 * @type {Array}
		 */
		const weathers = values.weather.split(',');
		const result = {};
		const start = new Date(eStart);
		const end = new Date(eStart);
		let weather, weather2;
		start.setUTCHours(0);
		end.setUTCHours(0);
		if (values.end > values.start) {
			start.setUTCHours(values.start);
			end.setUTCHours(values.end);
		} else {
			start.setUTCHours(values.start - 24);
			end.setUTCHours(values.end);
		}
		while (true) {
			const now = et.eorzeaToLocal(end);
			if (now.getTime() > Date.now()) {
				weather = sky.eorzeaIterate(new Date(start.getTime() + 1), new Date(start.getTime() - 1), values.zone);
				const size = weather.length;
				if (weather.filter(v => weathers.indexOf(v)!==-1).length == size) {
					console.log(weather,weathers, values.zone,values.area);
					break;
				}
			}
			start.setUTCHours(24);
			end.setUTCHours(24);
		}
		result.start = et.eorzeaToLocal(start);
		result.end = et.eorzeaToLocal(end);
		div.innerHTML = `<div><h4>${values.zone} - ${values.area}(${values.id}) ${values.act}</h4><p>ET:${values.start}:00-ET:${values.end}:00 ${values.weather}</p></div><div><time>${result.start.toLocaleString()}(${weather[0]}) - ${result.end.toLocaleString()}(${weather.pop()})</time><p class="time-end"></p></div>`;
		return result;
	}
	start() {
		const time = (new Date).getTime();
		const etime = et.eCurrentTime();
		let changeWeater = false;
		let nowoffset = (this.timespit.filter(v => etime.getUTCHours() > v)).pop();
		if (!this.timeoffset || this.timeoffset != nowoffset) {
			changeWeater = true;
			this.timeoffset = nowoffset;
		}
		let count = 0;
		for (const data of this.list) {
			data.elm.style.cssText = '';
			if (data.end.getTime() <= time) {
				const { start, end } = this.setDate(data.value, data.elm);
				data.end = end;
				data.start = start;
				this.elm.appendChild(data.elm);
			} else if (data.start.getTime() <= time && data.end.getTime() > time) {
				data.elm.style.cssText = 'background-color:#569fdf;color:#fff;padding:.25rem;margin:.25rem 0px';
				count += 1;
			}
			if (changeWeater) {
				const weather = sky.eorzeaWeather(etime, data.value.zone);
				data.elm.querySelector('.time-end').innerHTML = weather;
			}
		}
		this.timediv.innerHTML = '本地时间:' + (new Date()).toLocaleTimeString() + ', ET:' + etime.getUTCHours() + ':' + etime.getUTCMinutes() + '激活中有' + count;

	}
}