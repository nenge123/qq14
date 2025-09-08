export default class base {
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
		return createImageBitmap(await (await fetch(url)).blob(), option);
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
		if (p > 1) p = 1;
		if (p < 0) p = 0;
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
		opt = isNaN(opt) ? 1 : opt;
		r = r || 18;
		ctx.fillStyle = "rgba(255,193,7," + opt + ")";
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
			ctx.beginPath();
			ctx.moveTo(...pointsA);
			ctx.lineTo(...pointsD);
			ctx.lineTo(...pointsB);
			ctx.lineTo(...pointsG);
			ctx.lineTo(...pointsA);
			ctx.closePath();
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
		rgb = rgb || 'red';
		size = size || 60;
		let [x, y] = [points[0] - size / 2, points[1] - size / 2];
		if (height) {
			y += this.bg.height * height;
		}
		if (deg) {

		}
		this.ctx.strokeStyle = rgb;
		this.ctx.fillStyle = rgb;
		this.ctx.beginPath();
		this.ctx.roundRect(x, y, size, size, [0, size, 0, 0]);
		this.ctx.fill();
		if (deg) {
			this.ctx.resetTransform();
		}
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
	WriteIcon(icon, points, text, color) {
		icon = icon instanceof ImageBitmap ? icon : this[icon];
		let [x, y] = points;
		this.ctx.drawImage(icon, x - icon.width / 2, y - icon.height / 2);
		if (text) {
			this.ctx.font = 'normal 14px serif';
			this.ctx.fillStyle = color || "yellow";
			this.ctx.fillText(text, x + icon.width / 2, y + 5);
		}
		return [x, y];
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
}