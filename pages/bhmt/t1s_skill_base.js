import { AnimationFrame } from "../../assets/js/esm/AnimationFrame.js";
export default class base {
	time = 0;
	maxTime = 0;
	constructor(elm, dom) {
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.dom = dom;
		this.canvas = canvas;
		this.canvas.width = 180;
		this.canvas.height = 60;
		this.ctx = this.canvas.getContext('2d');
		this.WriteBigText([0, 30], '图片加载中...', 'red');
	}
	setLoopFrame(MyName, maxTime) {
		const T = this;
		this.MyName = MyName;
		this.MyLoop = {
			maxTime,
			canvas: T.canvas,
			progress(speedTime,nowTime) {
				if (!this.canvas.isfocus) return;
				T.time += new Number(speedTime).toSeconds(3);
				T.indexTime +=1;
				if(T.maxTime&&T.maxTime<T.time){
					T.time = 0;
					T.indexTime = 0;
				}
				T.loopFrame(this);
			}
		};
		AnimationFrame.setLoop(T.MyName, T.MyLoop);
		['mouseover', 'focusin', 'touchstart'].forEach(
			v => this.canvas.addEventListener(v, () => {
				this.canvas.isfocus = false;
			}));
		['mouseout', 'focusout', 'touchend', 'touchout'].forEach(
			v => this.canvas.addEventListener(v, () => {
				this.canvas.isfocus = true;
			}));
		this.dom.addEventListener('hide.bs.modal', e => AnimationFrame.removeLoop(MyName));
		this.dom.addEventListener('show.bs.modal', e => AnimationFrame.setLoop(T.MyName, T.MyLoop));
	}
	/**
	 * 启动循环
	 */
	runLoop() {
		if (!this.time) this.time = 1;
		this.isfocus = true;
		['mouseover', 'focusin', 'touchstart'].forEach(v => this.canvas.addEventListener(v, () => {
			this.isfocus = false;
		}));
		['mouseout', 'focusout', 'touchend', 'touchout'].forEach(v => this.canvas.addEventListener(v, () => {
			this.isfocus = true;
		}));
		setInterval(() => {
			if (this.isfocus) {
				this.loop();
			}
		}, 100);
	}
	/**
	 * 下载图像对象
	 * @param {*} url 
	 * @param {*} option 
	 * @returns 
	 */
	async fetchImage(url, option) {
		const blob = /\.svg$/.test(url) ? await this.fetchSvg(url) : await (await fetch(url)).blob();
		return createImageBitmap(blob, option);
	}
	async fetchSvg(url) {
		return new Promise(res => {
			const imageElement = document.createElement('img');
			imageElement.src = url;
			imageElement.onload = e => {
				res(imageElement);
			}
		});
	}
	async fetchImageList(obj) {
		return Promise.all(Object.entries(obj).map(async value => {
			const [name, data] = value;
			this[name] = await this.fetchImage(data[0], data[1]);
			return true;
		}));
	}
	/**
	 * 清楚画布
	 */
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	/**
	 * 百分比进度
	 * @param {*} start 
	 * @param {*} limit 
	 * @returns 
	 */
	perSent(start, limit) {
		let p = (this.time - start) / limit;
		if (p >= 1) p = 1;
		if (p <= 0) p = 0;
		return p;
	}
	/**
	 * 循环
	 * @param {Function} fn1 
	 * @param {Function} fn2 
	 * @param {Function} fn3 
	 * @param {int} top 垂直偏移
	 * @param {int} left 水平偏移
	 */
	Each(fn1, fn2, fn3, top, left) {
		top = top || 3;
		left = left || 2;
		for (let j = 0; j < left; j++) {
			if (fn2 instanceof Function) {
				fn2(j);
			}
			for (let i = 0; i < top; i++) {
				if (fn1 instanceof Function) {
					fn1(i, j);
				}
				if (fn3 instanceof Function) {
					if (j == 0) {
						fn3(i);
					}
				}
			}
		}
	}
	/**
	 * 偏移
	 * @param {Array} points 
	 * @param {int} left 
	 * @param {int} top 
	 * @returns {Array}
	 */
	SetOffset(points, left, top) {
		left = left > 0 ? left : 0;
		top = top > 0 ? top : 0;
		const [x, y] = points;
		return [x + (this.bg.width + 5) * left, y + (this.bg.height + 5) * top];
	}
	/**
	 * 移动偏移
	 * @param {*} start 
	 * @param {*} end 
	 * @param {*} progress 
	 * @param {*} left 
	 * @param {*} top 
	 * @returns 
	 */
	MoveOffset(start, end, progress, left, top) {
		let points = [];
		if (progress >= 1) {
			return this.SetOffset(end, left, top);
		}
		if (progress <= 0) {
			return this.SetOffset(start, left, top);
		}
		for (let i = 0; i < 2; i++) {
			points[i] = start[i] > end[i] ? start[i] - (start[i] - end[i]) * progress : start[i] + (end[i] - start[i]) * progress;
		}
		return this.SetOffset(points, left, top);
	}
	/**
	 * 六边形坐标
	 * @param {int} x 
	 * @param {int} y 
	 * @param {DoubleRange} opt 
	 */
	CreatSixPoint(xy, rWidth, rHeight) {
		rWidth = rWidth || 30;
		rHeight = rHeight || 17.3;
		const [x, y] = xy;
		const points = [];
		for (let i = 0; i < 6; i++) {
			points[i] = [x, y];
			if (i == 0 || i == 3) {
				points[i][1] = y + rHeight * 2 * (i == 0 ? -1 : 1);
			} else {
				points[i][0] = x + rWidth * (i > 3 ? -1 : 1);
				points[i][1] = y + rHeight * (i == 1 || i == 5 ? -1 : 1);
			}
		}
		return points;

	}
	/**
	 * 实心六边形
	 * @param {*} xy 
	 * @param {*} opt 
	 * @param {*} rWidth 
	 * @param {*} rLine 
	 */
	WriteSix(xy, opt, rWidth, rHeight) {
		const [x, y] = xy;
		const ctx = this.ctx;
		opt = isNaN(opt) ? 1 : opt;
		//ctx.strokeStyle = "rgba(255,255,255," + opt + ")";
		ctx.fillStyle = "rgba(255,255,255," + opt + ")";
		const points = this.CreatSixPoint([x, y], rWidth, rHeight);
		ctx.beginPath();
		ctx.moveTo(...points.shift());
		for (let p of points) {
			ctx.lineTo(...p);
		}
		ctx.closePath();
		ctx.fill();
	}

	WriteFT(xy, opt, rWidth, rHeight) {
		rWidth = rWidth || 30 * .5;
		rHeight = rHeight || 17.3 * .5;
		opt = isNaN(opt) ? 1 : opt;
		const [x, y] = xy;
		const ctx = this.ctx;
		ctx.fillStyle = "rgba(255,193,7," + opt + ")";
		const points = this.CreatSixPoint([x, y], rWidth, rHeight);
		for (let i = 0; i < points.length;) {
			const pointsA = points[i];
			i++;
			const pointsB = points[i];
			i++;
			const pointsG = [
				(pointsA[0] + pointsB[0] + xy[0]) / 3,
				(pointsA[1] + pointsB[1] + xy[1]) / 3
			];
			const pointsC = [
				(pointsG[0] + xy[0]) / 2,
				(pointsG[1] + xy[1]) / 2
			];
			ctx.beginPath();
			ctx.moveTo(...pointsA);
			ctx.lineTo(...pointsC);
			ctx.lineTo(...pointsB);
			ctx.lineTo(...pointsG);
			ctx.lineTo(...pointsA);
			ctx.closePath();
			ctx.fill();
		}
	}
	/**
	 * 伤害分摊
	 * @param {*} xy 
	 * @param {*} opt 
	 * @param {*} r 
	 */
	WriteShareDGM(xy, opt, r) {
		const [x, y] = xy;
		const ctx = this.ctx;
		r = r || 18;
		const pi = Math.PI / 180;
		for (let i = 0; i < 9; i++) {
			//Math.PI
			const start = (10 + 45 * i);
			const end = (35 + 45 * i);
			const center = (22.5 + 45 * i);
			const pointsA = [
				x + r * Math.cos(pi * start),
				y + r * Math.sin(pi * start)
			];
			const pointsB = [
				x + r * Math.cos(pi * end),
				y + r * Math.sin(pi * end)
			];
			const pointsC = [
				x + r * Math.cos(pi * center),
				y + r * Math.sin(pi * center)
			];
			const pointsG = [
				//三角形中心
				(pointsA[0] + pointsB[0] + xy[0]) / 3,
				(pointsA[1] + pointsB[1] + xy[1]) / 3
			];
			const pointsD = [
				(pointsG[0] + pointsC[0]) / 2,
				(pointsG[1] + pointsC[1]) / 2
			];
			const pointsF = [
				(pointsD[0] + pointsC[0]) / 2,
				(pointsD[1] + pointsC[1]) / 2
			];
			ctx.fillStyle =isNaN(opt)?opt:"rgba(255,193,7," + (opt||0.5) + ")";
			ctx.beginPath();
			ctx.moveTo(...pointsA);
			ctx.lineTo(...pointsD);
			ctx.lineTo(...pointsB);
			ctx.lineTo(...pointsG);
			ctx.lineTo(...pointsA);
			//ctx.closePath();
			ctx.fill();
		}
		if (r > 10) {
			this.WriteShareDGM(xy, opt, r - 10);
		}
	}
	/**
	 * 击退
	 * @param {*} xy 
	 * @param {*} opt 
	 * @param {*} r 
	 */
	WriteOutDGM(xy, opt, r) {
		const [x, y] = xy;
		const ctx = this.ctx;
		opt = isNaN(opt) ? 1 : opt;
		r = r || 18;
		ctx.fillStyle = "rgba(255,193,7," + opt + ")";
		const pi = Math.PI / 180;
		for (let i = 0; i < 9; i++) {
			//Math.PI
			const start = (5 + 45 * i);
			const end = (40 + 45 * i);
			const center = (22.5 + 45 * i);
			const pointsA = [
				x + r * Math.cos(pi * start),
				y + r * Math.sin(pi * start)
			];
			const pointsB = [
				x + r * Math.cos(pi * end),
				y + r * Math.sin(pi * end)
			];
			const pointsC = [
				x + r * Math.cos(pi * center),
				y + r * Math.sin(pi * center)
			];
			const pointsW = [
				(pointsA[0] + pointsB[0] - xy[0]),
				(pointsA[1] + pointsB[1] - xy[1])
			];
			const pointsD = [
				(pointsW[0] + pointsC[0]) / 2,
				(pointsW[1] + pointsC[1]) / 2
			];
			const pointsF = [
				(pointsD[0] + pointsC[0]) / 2,
				(pointsD[1] + pointsC[1]) / 2
			];
			ctx.beginPath();
			ctx.moveTo(...pointsA);
			ctx.lineTo(...pointsD);
			ctx.lineTo(...pointsB);
			ctx.lineTo(...pointsF);
			ctx.lineTo(...pointsA);
			ctx.closePath();
			ctx.fill();
		}
		if (r > 10) {
			this.WriteOutDGM(xy, opt, r * .6);
		}
	}
	/**
	 * 画一个圆
	 * @param {*} points 
	 * @param {*} rgb 
	 * @param {*} size 
	 * @param {*} height 
	 */
	WriteCircle(points, rgb, size) {
		rgb = rgb || 'red';
		size = size || 60;
		let [x, y] = [points[0] - size / 2, points[1] - size / 2];
		this.ctx.strokeStyle = rgb;
		this.ctx.fillStyle = rgb;
		this.ctx.beginPath();
		this.ctx.roundRect(x, y, size, size, [size]);
		this.ctx.fill();
		return points;
	}
	WriteHalfCircle(points, rgb, size, deg) {
		let Angle;
		let [x, y] = [points[0], points[1]];
		const ctx = this.ctx;
		rgb = rgb || 'red';
		if (deg && deg instanceof Array && deg.length == 2) {
			Angle = deg;
		} else {
			deg = isNaN(deg) ? 180 : (deg % 360) - 90;
			Angle = [
				deg, // 圆弧起始角度
				deg + 90 // 圆弧结束角度
			];
		}
		ctx.strokeStyle = rgb;
		ctx.fillStyle = rgb;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.arc(x, y, (size || 60) / 2, Angle[0] * Math.PI / 180, Angle[1] * Math.PI / 180);
		ctx.lineTo(x, y);
		ctx.fill();
		return points;
	}
	/**
	 * 写入图标
	 * @param {*} icon 
	 * @param {*} points 
	 * @param {*} text 
	 * @param {*} color 
	 * @returns 
	 */
	WriteIcon(icon, points, text, color,color2,FontSize) {
		const ctx = this.ctx;
		icon = icon instanceof ImageBitmap ? icon : this[icon];
		if(!icon) return;
		const [x, y] = [points[0] - icon.width / 2,points[1] - icon.height / 2];
		FontSize = FontSize||14;
		if (text) {
			ctx.font = 'normal '+FontSize+'px serif';
			const info = ctx.measureText(text);
			const left = x + icon.width;
			const top = y +icon.height / 2;
			if(color2){
				const height = FontSize*2>icon.height?FontSize*2:icon.height;
				ctx.fillStyle = color2 || "black";
				ctx.fillRect(left,top-height/2,info.width,height);
			}
			ctx.fillStyle = color || "yellow";
			ctx.fillText(text,left,top);
		}
		ctx.drawImage(icon,x,y);
		return points;
	}
	/**
	 * 移动图标
	 * @param {*} icon 
	 * @param {*} start 
	 * @param {*} end 
	 * @param {*} progress 
	 * @param {*} text 
	 * @param {*} color 
	 * @param {*} left 
	 * @param {*} top 
	 * @returns 
	 */
	MoveIcon(icon, start, end, progress, text, color, left, top) {
		const [x, y] = this.MoveOffset(start, end, progress, left, top);
		this.WriteIcon(icon, [x, y], text, color);
		return [x, y];
	}
	/**
	 * 打印文字
	 * @param {*} points 
	 * @param {*} text 
	 * @param {*} color 
	 * @param {*} font 
	 */
	WriteBigText(points, text, color, font) {
		this.ctx.fillStyle = color || "yellow";
		this.ctx.font = font || 'normal 32px serif';
		this.ctx.fillText(text, ...points);
		this.ctx.font = 'normal 14px serif';
	}
	/**
	 * 填充背景
	 * @param {*} i 
	 * @param {*} j 
	 */
	WriteBg(i, j) {
		this.clear();
		for (let x = 0; x < i; x++) {
			this.ctx.drawImage(
				this.bg,
				0,
				(this.bg.height + 5) * x
			);
			if (j > 1) {
				for (let y = 1; y < j; y++) {
					this.ctx.drawImage(
						this.bg,
						(this.bg.width + 5) * y,
						(this.bg.height + 5) * x
					);
				}
			}
		}

	}

	setFloorStart(points, rWidth, rHeight) {
		let map = new Map;
		const [x, y] = points;
		rWidth = rWidth || 30;
		rHeight = rHeight || 17.3;
		const l = [4, 2, 1];
		let pointsA = [
			[x, y]
		];
		for (let j = 1; j < l[0]; j++) {
			const [a, b] = pointsA[j - 1];
			pointsA.push([a + 2 * rWidth + 4.5, b]);
		}
		map.set(1, pointsA);
		for (let i = 0; i < 3; i++) {
			let p = i * -1 - 1;
			let pointsB = map.has(p + 1) ? map.get(p + 1) : map.get(1);
			map.set(p, pointsB.map(v => {
				const [a, b] = v;
				return [a + rWidth + 2, b - 3 * rHeight - 4];
			}).slice(0, l[i]));
			if (i > 0) {
				map.set(i + 1, map.get(i).map(v => {
					const [a, b] = v;
					return [a - rWidth - 2, b + 3 * rHeight + 4];
				}).slice(l[i]));
			}
		}
		this.floorMap = map;
	}
	setFloorPoint(list) {
		let points = [];
		//坐标系
		for (let pos of list) {
			if (!pos || !pos.length) continue;
			let [x, y, j, i] = pos;
			j = j || 0;
			i = i || 0;
			j = j instanceof Array ? j : [j, j + 1];
			i = i instanceof Array ? i : [i, i + 1];
			for (let k = i[0]; k < i[1]; k++) {
				for (let l = j[0]; l < j[1]; l++) {
					let offset = this.SetOffset(this.floorMap.get(x)[y], l, k);
					points.push(offset.concat(l, k));
				}
			}
		}
		return points;
	}
	loopFrame(value) {

	}
	loopFloor(baseOpt) {
		baseOpt = isNaN(baseOpt) ? 0.5 : baseOpt;
		for (const list of this.floorTime) {
			//时间轴
			const [time, points] = list;
			if (this.time >= time[0] && this.time < time[1]) {
				let p = this.perSent(time[0], 10);
				for (let pos of points) {
					const [x, y, l, k] = pos;
					if (time[2] instanceof Function) {
						time[2]([x, y], l, k, p);
					}
					if (p != 1) {
						if (this.time % 2 == 0) {
							this.WriteSix([x, y], p * baseOpt);
						}
					} else {
						this.WriteSix([x, y], p * baseOpt);
					}
					if (time[2] instanceof Function) {
						time[3]([x, y], l, k, p);
					}

				}
			}
		}
	}
	loopIcon(icon, timePoint) {
		for (let index = 0; index < timePoint.length; index++) {
			if (!timePoint[index]) continue;
			const [time, points, option, fn, text, color] = timePoint[index];
			const endtime = timePoint[index + 1] ? timePoint[index + 1][0][0] : 9999;
			if (this.time >= time[0] && this.time < endtime) {
				let [j, i] = option || [];
				let limit = time[1] || 10;
				let p = this.perSent(time[0], limit); p
				let offset;
				j = j || 0;
				i = i || 0;
				j = j instanceof Array ? j : [j, j + 1];
				i = i instanceof Array ? i : [i, i + 1];
				for (let k = i[0]; k < i[1]; k++) {
					for (let l = j[0]; l < j[1]; l++) {
						if (index > 0 && points != timePoint[index - 1][1]) {
							const oldpoint = timePoint[index - 1][1];
							offset = this.MoveOffset(oldpoint, points, p, l, k);

						} else {
							offset = this.SetOffset(points, l, k);
						}
						if (fn && fn[0] instanceof Function) {
							fn[0](offset, l, k, p);
						}
						this.WriteIcon(icon, offset, text || '', color);
						if (fn && fn[1] instanceof Function) {
							fn[1](offset, l, k, p);
						}
					}
				}
				break;
			}
		}
	}
	timeFunction(timePoint) {
		for (let index = 0; index < timePoint.length; index++) {
			if (!timePoint[index]) continue;
			const [time, startFn] = timePoint[index];
			const endtime = timePoint[index + 1] ? timePoint[index + 1][0][0] : 9999;
			if (this.time*1000 >= time[0]*1000 && this.time*1000 < endtime*1000) {
				let progress = !time[1] ? 0 : this.perSent(time[0], time[1]);
				if (startFn instanceof Function) {
					startFn(progress);
				}
			}
		}
	}
}