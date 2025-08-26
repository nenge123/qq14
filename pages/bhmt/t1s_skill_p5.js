export default class t1s {
	constructor(elm) {
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.canvas = canvas;
		this.start();
	}
	async start() {
		this.bg = await createImageBitmap(await (await fetch('/pages/bhmt/t1s_s_2.webp')).blob(), { resizeHeight: 360 });
		this.tank = await createImageBitmap(await (await fetch('/images/job/fh.webp')).blob());
		this.boss = await createImageBitmap(await (await fetch('/images/boss/1.webp')).blob());
		this.dps = await createImageBitmap(await (await fetch('/images/job/d.webp')).blob());
		this.heal = await createImageBitmap(await (await fetch('/images/job/h.webp')).blob());
		this.canvas.width = this.bg.width;
		this.canvas.height = this.bg.height;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		setInterval(() => this.loop(), 100);
	}
	loop() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.drawImage(this.bg, 0, 0);
		if (this.time < 20) {
			let p = this.time / 20;
			ctx.globalAlpha = 1 - p;
			this.setBoss(this.boos_start);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "yellow";
			ctx.font = "bold";
			ctx.fillText('HP 68%', 115, 200);
			ctx.fillStyle = "red";
			ctx.fillText('人群',...this.player_pos);
			ctx.drawImage(this.tank, 150, 205);
		} else if (this.time >= 20 && this.time < 80) {
			this.setBoss(this.boos_center_top);
			if (this.time < 50) {
				ctx.fillStyle = "red";
				ctx.fillText('人群',...this.player_pos);
			}
			if (this.time > 30) {
				let p = (this.time - 30) / 50;
				if (p > 1) p = 1;
				//1组
				this.moveJob(this.player_pos,this.player_t1_1,p,this.tank,'坦1');
				this.moveJob(this.player_pos,this.player_h3_1,p,this.heal,'疗3');
				this.moveJob(this.player_pos,this.player_d5_1,p,this.dps,'近5');
				this.moveJob(this.player_pos,this.player_d7_1,p,this.dps,'远7');
				//2组
				this.moveJob(this.player_pos,this.player_t2_1,p,this.tank,'坦2');
				this.moveJob(this.player_pos,this.player_h4_1,p,this.heal,'疗4');
				this.moveJob(this.player_pos,this.player_d6_1,p,this.dps,'近6');
				this.moveJob(this.player_pos,this.player_d8_1,p,this.dps,'远8');
			}
		} else if (this.time >= 80 && this.time < 100) {
			if (this.time >= 90) {
				let p = (this.time - 90) / 25;
				if (p > 1) p = 1;
				ctx.globalAlpha = 1 - p;
				this.setBoss(this.boos_center_top);
				ctx.globalAlpha = 1;

			} else {
				this.setBoss(this.boos_center_top);
			}
			//1组
			this.setJob(this.player_t1_1,this.tank,'坦1');
			this.setJob(this.player_h3_1,this.heal,'疗3');
			this.setJob(this.player_d5_1,this.dps,'近5');
			this.setJob(this.player_d7_1,this.dps,'远7');
			//2组
			this.setJob(this.player_t2_1,this.tank,'坦2');
			this.setJob(this.player_h4_1,this.heal,'疗4');
			this.setJob(this.player_d6_1,this.dps,'近6');
			this.setJob(this.player_d8_1,this.dps,'远8');
			ctx.fillStyle = "yellow";
			ctx.fillText('没分身的时候可以多打击下', 90, 100);
		} else if (this.time >= 100 && this.time < 140) {
			if (this.time >= 110) {
				let p = (this.time - 110) / 20;
				if (p > 1) p = 1;
				//1组
				this.moveJob(this.player_t1_1,this.player_t1_2,p,this.tank,'坦1');
				this.moveJob(this.player_h3_1,this.player_h3_2,p,this.heal,'疗3');
				this.moveJob(this.player_d5_1,this.player_d5_2,p,this.dps,'近5');
				this.moveJob(this.player_d7_1,this.player_d7_2,p,this.dps,'远7');
				//2组
				this.moveJob(this.player_t2_1,this.player_t2_2,p,this.tank,'坦2');
				this.moveJob(this.player_h4_1,this.player_h4_2,p,this.heal,'疗4');
				this.moveJob(this.player_d6_1,this.player_d6_2,p,this.dps,'近6');
				this.moveJob(this.player_d8_1,this.player_d8_2,p,this.dps,'远8');
				if (p < 1) {
					this.moveBoss(this.boos_center_top, this.boos_D, p, 0.6);
					this.moveBoss(this.boos_center_top, this.boos_B, p, 0.6);
				} else {
					this.setBoss(this.boos_D);
					this.setBoss(this.boos_B);
				}
			} else {
				//1组
				this.setJob(this.player_t1_1,this.tank,'坦1');
				this.setJob(this.player_h3_1,this.heal,'疗3');
				this.setJob(this.player_d5_1,this.dps,'近5');
				this.setJob(this.player_d7_1,this.dps,'远7');
				//2组
				this.setJob(this.player_t2_1,this.tank,'坦2');
				this.setJob(this.player_h4_1,this.heal,'疗4');
				this.setJob(this.player_d6_1,this.dps,'近6');
				this.setJob(this.player_d8_1,this.dps,'远8');
			}
		} else if (this.time >= 140&&this.time<160) {
			this.setBoss(this.boos_B);
			this.setBoss(this.boos_D);
			// 半径为零的圆角矩形（指定为数字）
			this.setRound(this.boos_B, "rgba(0,128,0,0.5)");
			this.setRound(this.boos_D, "rgba(0,0,255,0.5)");
			//1组
			this.setJob(this.player_t1_2,this.tank,'坦1');
			this.setJob(this.player_h3_2,this.heal,'疗3');
			this.setJob(this.player_d5_2,this.dps,'近5');
			this.setJob(this.player_d7_2,this.dps,'远7');
			//2组
			this.setJob(this.player_t2_2,this.tank,'坦2');
			this.setJob(this.player_h4_2,this.heal,'疗4');
			this.setJob(this.player_d6_2,this.dps,'近6');
			this.setJob(this.player_d8_2,this.dps,'远8');

		} else if (this.time >= 160) {
			this.setBoss(this.boos_B);
			this.setBoss(this.boos_D);
			//1组
			this.setJob(this.player_t1_2,this.tank,'坦1');
			this.setJob(this.player_h3_2,this.heal,'疗3');
			this.setJob(this.player_d5_2,this.dps,'近5');
			//2组
			this.setJob(this.player_t2_2,this.tank,'坦2');
			this.setJob(this.player_h4_2,this.heal,'疗4');
			this.setJob(this.player_d6_2,this.dps,'近6');
			//1组
			this.setRound(this.player_t1_2,"rgba(206,0,225,0.5)",60);
			this.setRound(this.player_h3_2,"rgba(206,0,225,0.5)",60);
			this.setRound(this.player_d5_2,"rgba(206,0,225,0.5)",60);
			//2组
			this.setRound(this.player_t2_2,"rgba(206,0,225,0.5)",60);
			this.setRound(this.player_h4_2,"rgba(206,0,225,0.5)",60);
			this.setRound(this.player_d6_2,"rgba(206,0,225,0.5)",60);
			if(this.time>190){
				let p = (this.time-190)/10;
				if(p>1)p=1;
				const pointsA = this.moveJob(this.player_d7_2,this.player_d7_3,p,this.dps,'远7');
				const pointsB = this.moveJob(this.player_d8_2,this.player_d8_3,p,this.dps,'远8');
				this.setRound(pointsA,"rgba(206,0,225,0.5)",60);
				this.setRound(pointsB,"rgba(206,0,225,0.5)",60);

			}else{
				this.setJob(this.player_d7_2,this.dps,'远7');
				this.setJob(this.player_d8_2,this.dps,'远8');
				this.setRound(this.player_d7_2,"rgba(206,0,225,0.5)",60);
				this.setRound(this.player_d8_2,"rgba(206,0,225,0.5)",60);
			}

		}
		this.time += 1;
		if (this.time > 250) {
			this.time = 1;
		}
	}
	//初始固定位置
	boos_start = [132, 227];
	//剧中
	boos_center_top = [131, 150];
	//1组
	boos_D = [99, 208];
	//2组
	boos_B = [197, 152];
	//人群
	player_pos = [120, 260];
	//1组
	player_t1_1 = [112,165];
	player_h3_1 = [120,214];
	player_d5_1 = [130,179];
	player_d7_1 = [91,180];
	//2组
	player_t2_1 = [151,166];
	player_h4_1 = [171,152];
	player_d6_1 = [142,128];
	player_d8_1 = [197,179];
	//1组2
	player_t1_2 = [74,208];
	player_h3_2 = [122,208];
	player_d5_2 = [99,231];
	player_d7_2 = [99,181];
	//2组2
	player_t2_2 = [222,152];
	player_h4_2 = [171,152];
	player_d6_2 = [197,123];
	player_d8_2 = [197,179];
	//远程
	player_d7_3 = [63,130];
	player_d8_3 = [229,224];
	r = (194 - 132) / 2;
	width = Math.sqrt(Math.pow(132 - 163, 2) + Math.pow(125 - 108, 2));
	h = Math.sqrt(Math.pow(this.width, 2) - Math.pow(this.r, 2));
	computeHexagonPoints(x, y, opt) {
		const ctx = this.ctx;
		const points = [];
		const size = 31.5;
		const s2 = Math.sqrt(Math.pow(131 - 163, 2) + Math.pow(125 - 107, 2));
		const h = Math.sqrt(s2 * s2 - size * size);
		for (let i = 0; i < 4; i++) {
			points[i] = [x, y];
			points[4 + i] = [x, y];
			if (i == 1 || i == 2) {
				points[i][0] -= this.r;
				points[i + 4][0] += this.r;
			}
			if (i < 2) {
				points[i][1] -= this.h * (2 - i);
				points[i + 4][1] -= this.h * (2 - i);
			}
			if (i >= 2) {
				points[i][1] += this.h * (i - 1);
				points[i + 4][1] += this.h * (i - 1);
			}
		}
		ctx.strokeStyle = "rgba(255,255,255," + opt + ")";
		ctx.fillStyle = "rgba(255,255,255," + opt + ")";
		ctx.beginPath();
		ctx.moveTo(points[0][0], points[0][1]);
		for (let p of points) {
			ctx.lineTo(p[0], p[1]);
		}
		ctx.closePath();
		ctx.fill();
	}
	drawJob(type, text, x, y, color) {
		const icon = this[type];
		this.ctx.drawImage(icon, x, y);
		if (text) {
			this.ctx.fillStyle = color || "yellow";
			this.ctx.fillText(text, x + 18, y + 12);
		}
	}
	setBoss(points, scale) {
		scale = scale || 1;
		this.ctx.drawImage(
			this.boss,
			points[0] - 16 * scale,
			points[1] - 16 * scale,
			this.boss.width * scale,
			this.boss.height * scale
		);
	}
	moveBoss(start, end, progress, scale) {
		scale = scale || 1;
		const x = start[0] > end[0] ? start[0] - (start[0] - end[0]) * progress : start[0] + (end[0] - start[0]) * progress;
		const y = start[1] > end[1] ? start[1] - (start[1] - end[1]) * progress : start[1] + (end[1] - start[1]) * progress;
		this.setBoss([x, y], scale);
	}
	setJob(points, type, text, color) {
		const icon = type instanceof ImageBitmap?type:this[type];
		const [x, y] = [points[0] - icon.width/2, points[1] - icon.height/2];
		this.ctx.drawImage(icon, x, y);
		if (text) {
			this.ctx.fillStyle = color || "yellow";
			this.ctx.fillText(text, x + 18, y + 12);
		}
	}
	moveJob(start, end, progress, type, text, color) {
		const x = start[0] > end[0] ? start[0] - (start[0] - end[0]) * progress : start[0] + (end[0] - start[0]) * progress;
		const y = start[1] > end[1] ? start[1] - (start[1] - end[1]) * progress : start[1] + (end[1] - start[1]) * progress;
		this.setJob([x, y], type, text, color);
		return [x,y];
	}
	setRound(points, rgb, size) {
		rgb = rgb || 'red';
		size = size || 60;
		this.ctx.strokeStyle = rgb;
		this.ctx.fillStyle = rgb;
		this.ctx.beginPath();
		this.ctx.roundRect(points[0] - size / 2, points[1] - size / 2, size, size, [size]);
		this.ctx.fill();
	}

}