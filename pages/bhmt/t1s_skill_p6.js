export default class t1s {
	constructor(elm) {
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.canvas = canvas;
		this.start();
	}
	async start() {
		this.bg = await createImageBitmap(await (await fetch('/pages/bhmt/t1s_s_1.webp')).blob(), { resizeHeight: 180 });
		this.tank = await createImageBitmap(await (await fetch('/images/job/fh.webp')).blob());
		this.boss = await createImageBitmap(await (await fetch('/images/boss/1.webp')).blob());
		this.dps = await createImageBitmap(await (await fetch('/images/job/d.webp')).blob());
		this.heal = await createImageBitmap(await (await fetch('/images/job/h.webp')).blob());


		this.def_1 = await createImageBitmap(await (await fetch('/images/EffectsGood/210156.webp')).blob(), { resizeWidth: 32 });
		this.def_2 = await createImageBitmap(await (await fetch('/images/EffectsGood/210151.webp')).blob(), { resizeWidth: 32 });
		this.def_3 = await createImageBitmap(await (await fetch('/images/EffectsGood/210252.webp')).blob(), { resizeWidth: 32 });
		this.def_4 = await createImageBitmap(await (await fetch('/images/EffectsGood/210256.webp')).blob(), { resizeWidth: 32 });
		this.def_5 = await createImageBitmap(await (await fetch('/images/EffectsGood/210152.webp')).blob(), { resizeWidth: 32 });

		this.canvas.width = this.bg.width;
		this.canvas.height = this.bg.height * 3;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		setInterval(() => this.loop(), 100);
	}
	loop() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.drawImage(this.bg, 0, 0);
		ctx.drawImage(this.bg, 0, this.bg.height);
		ctx.drawImage(this.bg, 0, this.bg.height * 2);
		if (this.time <= 70) {
			this.path1();
		}
		if (this.time < 20) {
			this.path0();
		} else if (this.time >= 20 && this.time < 60) {
			this.setText('毒液 远');
			if (this.time < 40) {
				this.path2();
			} else if (this.time < 60 && this.time >= 40) {
				this.path3();
			}

		} else if (this.time < 80) {
			this.setText('改变BOSS位置');
			this.path4();
		} else if (this.time < 100) {
			this.path5();
		} else if (this.time < 120) {
			if(this.time<110){				
				let p = (this.time - 80) / 10;
				if (p > 1) p = 1;
				this.path_floor2();
				this.computeHexagonPoints(...this.floor_5, 0.6*p);
				this.computeHexagonPoints(...this.floor_6, 0.6*p);
				this.computeHexagonPoints(...this.floor_3, 0.6*p, 1);
				this.computeHexagonPoints(...this.floor_4, 0.6*p, 1);
				this.computeHexagonPoints(...this.floor_5, 0.6*p, 2);
				this.computeHexagonPoints(...this.floor_6, 0.6*p, 2);
			}else{
				this.path_floor3();
			}
			this.setText('喷毒 远');
			//p1
			this.setJob(this.player_h_4, this.heal, '疗');
			this.setJob(this.player_d1_4, this.dps, '近');
			//p2
			this.setJob(this.player_h_4, this.dps, '近', 'yellow', 1);
			this.setJob(this.player_d1_4, this.dps, '近', 'yellow', 1);
			//p3
			this.setJob(this.player_d1_x_4,this.dps, '近', 'yellow', 2);
			this.setJob(this.player_h_x_4, this.dps, '近', 'yellow', 2);
			this.setBoss(this.boos_2);
			if(this.time<110){				
				let p = (this.time - 100) / 10;
				if (p > 1) p = 1;
				this.setJob(this.player_d2_2, this.dps, '远');
				this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 1);
				this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 2);
				this.setRound(this.player_d2_2, "rgba(0,128,0," + p / 2 + ")", 30);
				this.setRound(this.player_d2_2, "rgba(0,128,0," + p / 2 + ")", 30, 1);
				this.setRound(this.player_d2_2, "rgba(0,128,0," + p / 2 + ")", 30, 2);
				this.moveJob(this.player_t_3, this.player_h_4, p, this.tank, '坦');
				this.moveJob(this.player_t_3, this.player_h_4, p, this.tank, '坦', 'yellow', 1);
				this.moveJob(this.player_t_3, this.player_h_x_4, p, this.tank, '坦', 'yellow', 2);
			}else{
				let p = (this.time - 110) / 10;
				if (p > 1) p = 1;
				this.setJob(this.player_h_4, this.tank, '坦');
				this.setJob(this.player_h_4, this.tank, '坦', 'yellow', 1);
				this.setJob(this.player_h_x_4, this.tank, '坦', 'yellow', 2);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30, 1);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30, 2);
				this.moveJob(this.player_d2_2, this.player_d1_4, p, this.dps, '远');
				this.moveJob(this.player_d2_2, this.player_d1_4, p, this.heal, '疗', 'yellow', 1);
				this.moveJob(this.player_d2_2, this.player_d1_x_4, p, this.heal, '疗', 'yellow', 2);
			}
			
		} else if(this.time<140){
			if(this.time<130){
				let p = (this.time - 120) / 10;
				if (p > 1) p = 1;
				this.path_floor3();
				this.setJob(this.player_h_4, this.tank, '坦');
				this.setJob(this.player_h_4, this.tank, '坦', 'yellow', 1);
				this.setJob(this.player_h_x_4, this.tank, '坦', 'yellow', 2);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30, 1);
				this.setRound(this.player_d2_2, "rgba(0,128,0,1)", 30, 2);
				this.setJob(this.player_d1_4,this.dps, '远');
				this.setJob(this.player_d1_4, this.heal, '疗', 'yellow', 1);
				this.setJob(this.player_d1_x_4,this.heal, '疗', 'yellow', 2);
				this.setRound(this.player_h_4, "rgba(255,255,0,0.3)", 40);
				this.setRound(this.player_h_4, "rgba(255,255,0,0.3)", 40, 1);
				this.setRound(this.player_h_x_4, "rgba(255,255,0,0.3)", 40, 2);
				this.setBoss(this.boos_2);
			}else{
				let p = (this.time - 130) / 10;
				if (p > 1) p = 1;
				this.computeHexagonPoints(...this.floor_3, 0.6);
				this.computeHexagonPoints(...this.floor_4, 0.6);
				this.computeHexagonPoints(...this.floor_5, 0.6, 1);
				this.computeHexagonPoints(...this.floor_6, 0.6, 1);
				this.computeHexagonPoints(...this.floor_1, 0.6, 2);
				this.computeHexagonPoints(...this.floor_2, 0.6, 2);
				this.computeHexagonPoints(...this.floor_5, 0.6);
				this.computeHexagonPoints(...this.floor_6, 0.6);
				this.computeHexagonPoints(...this.floor_3, 0.6, 1);
				this.computeHexagonPoints(...this.floor_4, 0.6, 1);
				this.computeHexagonPoints(...this.floor_5, 0.6, 2);
				this.computeHexagonPoints(...this.floor_6, 0.6, 2);

				this.setJob([197,85], this.dps, '远7/8', 'yellow');
				this.moveJob(this.player_d2_2,[176,50], p, this.dps, '近7/8', 'yellow', 1);
				this.setJob([119,86],this.dps, '近7/8', 'yellow', 2);
				//p1
				this.moveJob(this.player_h_4,this.player_h_x_4,p, this.heal, '疗');
				this.moveJob(this.player_d1_4,this.player_h_x_4,p, this.dps, '近');
				//p2
				this.moveJob(this.player_h_4,this.player_h_x_4,p, this.heal, '疗', 'yellow', 1);
				this.moveJob(this.player_d1_4,this.player_h_x_4,p, this.dps, '近', 'yellow', 1);
				//p3
				this.moveJob(this.player_h_x_4,this.player_h_4,p, this.heal, '疗', 'yellow', 2);
				this.moveJob(this.player_h_x_4,this.player_h_4,p, this.dps, '近', 'yellow', 2);

				this.moveJob(this.player_h_4, this.player_t_3, p, this.tank, '坦');
				this.moveJob(this.player_h_4, this.player_t_3, p, this.tank, '坦', 'yellow', 1);
				this.moveJob(this.player_h_x_4, this.player_h_4, p, this.tank, '坦', 'yellow', 2);
				this.setBoss(this.boos_2);
				
			}
			this.setText('分摊');
		} else if(this.time<160){
			this.computeHexagonPoints(...this.floor_5, 0.6);
			this.computeHexagonPoints(...this.floor_6, 0.6);
			this.computeHexagonPoints(...this.floor_3, 0.6, 1);
			this.computeHexagonPoints(...this.floor_4, 0.6, 1);
			this.computeHexagonPoints(...this.floor_5, 0.6, 2);
			this.computeHexagonPoints(...this.floor_6, 0.6, 2);
			
			this.setRound(this.setJob(this.player_t_3, this.tank, '坦'),"rgba(206,0,225,0.5)", 60);
			this.setRound(this.setJob(this.player_t_3, this.tank, '坦', 'yellow', 1),"rgba(206,0,225,0.5)", 60);
			this.setRound(this.setJob(this.player_t_3, this.tank, '坦', 'yellow', 2),"rgba(206,0,225,0.5)", 60);
			this.setBoss(this.boos_2);
			this.setText('紫圈 毒液喷发(不要踩发光地板)');
		}
		this.time += 1;
		if (this.time > 180) {
			this.time = 1;
		}
	}
	//初始固定位置
	boos_1 = [197, 87];
	boos_2 = [163, 108];
	//1组
	player_t_1 = [182, 113];
	player_h_1 = [179, 65];
	player_d1_1 = [220, 87];
	player_d2_1 = [106, 87];

	player_t_2 = [136, 122];
	player_d2_2 = [133, 63];


	player_t_3 = [163, 142];

	player_d1_4 = [194, 98];
	player_h_4 = [180, 87];

	player_d1_x_4 = [146, 99];
	player_h_x_4 = [146, 89];



	floor_1 = [130, 87];
	floor_2 = [163, 143];

	floor_3 = [196, 88];
	floor_4 = [228, 32];

	floor_5 = [97, 32];
	floor_6 = [165, 32];
	r = (194 - 132) / 2;
	width = Math.sqrt(Math.pow(132 - 163, 2) + Math.pow(125 - 108, 2));
	h = Math.sqrt(Math.pow(this.width, 2) - Math.pow(this.r, 2));
	computeHexagonPoints(x, y, opt, height) {
		const ctx = this.ctx;
		const points = [];
		if (height) {
			y += this.bg.height * height;
		}
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
		this.ctx.drawImage(
			this.boss,
			points[0] - 16 * scale,
			points[1] - 16 * scale + this.bg.height,
			this.boss.width * scale,
			this.boss.height * scale
		);
		this.ctx.drawImage(
			this.boss,
			points[0] - 16 * scale,
			points[1] - 16 * scale + this.bg.height * 2,
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
	setJob(points, type, text, color, height) {
		const icon = type instanceof ImageBitmap ? type : this[type];
		let [x, y] = points;
		// [points[0] - icon.width / 2, points[1] - icon.height / 2];
		if (height) {
			y += this.bg.height * height;
		}
		this.ctx.drawImage(icon, x - icon.width / 2, y - icon.height / 2);
		if (text) {
			this.ctx.fillStyle = color || "yellow";
			this.ctx.fillText(text, x - icon.width / 2 + 18, y - icon.height / 2 + 12);
		}
		return [x, y];
	}
	moveJob(start, end, progress, type, text, color, height) {
		const x = start[0] > end[0] ? start[0] - (start[0] - end[0]) * progress : start[0] + (end[0] - start[0]) * progress;
		const y = start[1] > end[1] ? start[1] - (start[1] - end[1]) * progress : start[1] + (end[1] - start[1]) * progress;
		this.setJob([x, y], type, text, color, height);
		return [x, y];
	}
	setRound(points, rgb, size, height) {
		rgb = rgb || 'red';
		size = size || 60;
		let [x, y] = [points[0] - size / 2, points[1] - size / 2];
		if (height) {
			y += this.bg.height * height;
		}
		this.ctx.strokeStyle = rgb;
		this.ctx.fillStyle = rgb;
		this.ctx.beginPath();
		this.ctx.roundRect(x, y, size, size, [size]);
		this.ctx.fill();
	}
	path0() {
		this.setText('紫圈');
		//p1
		this.setRound(this.player_t_1, "rgba(206,0,225,0.5)", 60);
		this.setRound(this.player_h_1, "rgba(206,0,225,0.5)", 60);
		this.setRound(this.player_d1_1, "rgba(206,0,225,0.5)", 60);
		this.setRound(this.player_d2_1, "rgba(206,0,225,0.5)", 60);
		this.setJob(this.player_t_1, this.tank, '坦');
		this.setJob(this.player_h_1, this.heal, '疗');
		this.setJob(this.player_d1_1, this.dps, '近');
		this.setJob(this.player_d2_1, this.dps, '远');
		//p2
		this.setRound(this.player_t_1, "rgba(206,0,225,0.5)", 60, 1);
		this.setRound(this.player_h_1, "rgba(206,0,225,0.5)", 60, 1);
		this.setRound(this.player_d1_1, "rgba(206,0,225,0.5)", 60, 1);
		this.setRound(this.player_d2_1, "rgba(206,0,225,0.5)", 60, 1);
		this.setJob(this.player_t_1, this.tank, '坦', 'yellow', 1);
		this.setJob(this.player_d2_1, this.heal, '疗', 'yellow', 1);
		this.setJob(this.player_h_1, this.dps, '近', 'yellow', 1);
		this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 1);
		//p3
		this.setRound(this.player_t_1, "rgba(206,0,225,0.5)", 60, 2);
		this.setRound(this.player_h_1, "rgba(206,0,225,0.5)", 60, 2);
		this.setRound(this.player_d1_1, "rgba(206,0,225,0.5)", 60, 2);
		this.setRound(this.player_d2_1, "rgba(206,0,225,0.5)", 60, 2);
		this.setJob(this.player_t_1, this.tank, '坦', 'yellow', 2);
		this.setJob(this.player_d2_1, this.heal, '疗', 'yellow', 2);
		this.setJob(this.player_h_1, this.dps, '近', 'yellow', 2);
		this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 2);
		this.setBoss(this.boos_1);

	}
	path1() {
		//p1
		this.setJob(this.player_h_1, this.heal, '疗');
		this.setJob(this.player_d1_1, this.dps, '近');
		//p2
		this.setJob(this.player_h_1, this.dps, '近', 'yellow', 1);
		this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 1);
		//p3
		this.setJob(this.player_h_1, this.dps, '近', 'yellow', 2);
		this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 2);
	}
	path2() {
		let p = (this.time - 20) / 20;
		this.computeHexagonPoints(...this.floor_1, p * 0.8);
		this.computeHexagonPoints(...this.floor_2, p * 0.8);
		this.computeHexagonPoints(...this.floor_1, p * 0.8, 1);
		this.computeHexagonPoints(...this.floor_2, p * 0.8, 1);
		this.computeHexagonPoints(...this.floor_3, p * 0.8, 2);
		this.computeHexagonPoints(...this.floor_4, p * 0.8, 2);

		this.setJob(this.player_t_1, this.tank, '坦');
		this.setJob(this.player_t_1, this.tank, '坦', 'yellow', 1);
		this.setJob(this.player_t_1, this.tank, '坦', 'yellow', 2);


		this.setJob(this.player_d2_1, this.dps, '远');
		this.setJob(this.player_d2_1, this.heal, '疗', 'yellow', 1);
		this.setJob(this.player_d2_1, this.heal, '疗', 'yellow', 2);
		this.setRound(this.player_d2_1, "rgba(0,128,0," + p / 2 + ")", 30);
		this.setRound(this.player_d2_1, "rgba(0,128,0," + p / 2 + ")", 30, 1);
		this.setRound(this.player_d2_1, "rgba(0,128,0," + p / 2 + ")", 30, 2);
		this.setBoss(this.boos_1);
	}
	path3() {
		let p = (this.time - 40) / 20;
		this.path_floor1();
		this.computeHexagonPoints(...this.floor_3, p * 0.8);
		this.computeHexagonPoints(...this.floor_4, p * 0.8);
		this.computeHexagonPoints(...this.floor_5, p * 0.8, 1);
		this.computeHexagonPoints(...this.floor_6, p * 0.8, 1);
		this.computeHexagonPoints(...this.floor_1, p * 0.8, 2);
		this.computeHexagonPoints(...this.floor_2, p * 0.8, 2);
		this.moveJob(this.player_d2_1, this.player_d2_2, p, this.dps, '远');
		this.moveJob(this.player_d2_1, this.player_d2_2, p, this.heal, '疗', 'yellow', 1);
		this.moveJob(this.player_d2_1, this.player_d2_2, p, this.heal, '疗', 'yellow', 2);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 1);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 2);
		let a = this.moveJob(this.player_t_1, this.player_t_2, p, this.tank, '坦');
		let b = this.moveJob(this.player_t_1, this.player_t_2, p, this.tank, '坦', 'yellow', 1);
		let c = this.moveJob(this.player_t_1, this.player_t_2, p, this.tank, '坦', 'yellow', 2);
		this.setBoss(this.boos_1);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 1);
		this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 2);
		//if(this.time%2==1){
		//	this.setRound(a,"rgba(206,0,225,1)",25);
		//	this.setRound(b,"rgba(206,0,225,1)",25,1);
		//	this.setRound(c,"rgba(206,0,225,1)",25,2);
		//}

	}
	path4() {
		;
		this.path_floor2();
		this.setJob(this.player_d2_2, this.dps, '远');
		this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 1);
		this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 2);
		if (this.time <= 70) {
			let p = (this.time - 60) / 10;
			this.moveBoss(this.boos_1, this.boos_2, p);
			this.setJob(this.player_t_2, this.tank, '坦');
			this.setJob(this.player_t_2, this.tank, '坦', 'yellow', 1);
			this.setJob(this.player_t_2, this.tank, '坦', 'yellow', 2);
			this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30);
			this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 1);
			this.setRound(this.player_d2_1, "rgba(0,128,0,1)", 30, 2);
		} else {
			let p = (this.time - 70) / 10;
			if (p > 1) p = 1;
			this.moveJob(this.player_t_2, this.player_t_3, p, this.tank, '坦');
			this.moveJob(this.player_t_2, this.player_t_3, p, this.tank, '坦', 'yellow', 1);
			this.moveJob(this.player_t_2, this.player_t_3, p, this.tank, '坦', 'yellow', 2);
			//p1
			this.setJob(this.player_h_1, this.heal, '疗');
			this.setJob(this.player_d1_1, this.dps, '近');
			//p2
			this.setJob(this.player_h_1, this.dps, '近', 'yellow', 1);
			this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 1);
			//p3
			this.setJob(this.player_h_1, this.dps, '近', 'yellow', 2);
			this.setJob(this.player_d1_1, this.dps, '近', 'yellow', 2);
			this.setBoss(this.boos_2);
		}

	}
	path5() {
		this.setText('致死毒泡');
		this.path_floor2();
		let p = (this.time - 80) / 10;
		if (p > 1) p = 1;
		this.setJob(this.player_d2_2, this.dps, '远');
		this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 1);
		this.setJob(this.player_d2_2, this.heal, '疗', 'yellow', 2);
		//p1
		this.moveJob(this.player_h_1,this.player_h_4,p, this.heal, '疗');
		this.moveJob(this.player_d1_1,this.player_d1_4,p, this.dps, '近');
		//p2
		this.moveJob(this.player_h_1,this.player_h_4,p, this.dps, '近', 'yellow', 1);
		this.moveJob(this.player_d1_1,this.player_d1_4,p, this.dps, '近', 'yellow', 1);
		//p3
		this.moveJob(this.player_h_1,this.player_h_x_4,p, this.dps, '近', 'yellow', 2);
		this.moveJob(this.player_d1_1,this.player_d1_x_4,p, this.dps, '近', 'yellow', 2);

		let a = this.setJob(this.player_t_3, this.tank, '坦');
		let b = this.setJob(this.player_t_3, this.tank, '坦', 'yellow', 1);
		let c = this.setJob(this.player_t_3, this.tank, '坦', 'yellow', 2);
		if (this.time < 90) {
			if (this.time % 2 == 1) {
				this.setRound(a, "rgba(206,0,225,1)", 25);
				this.setRound(b, "rgba(206,0,225,1)", 25, 1);
				this.setRound(c, "rgba(206,0,225,1)", 25, 2);
			}
		}
		this.setDef();
		this.setBoss(this.boos_2);

	}
	path_floor1() {
		this.computeHexagonPoints(...this.floor_1, 0.6);
		this.computeHexagonPoints(...this.floor_2, 0.6);
		this.computeHexagonPoints(...this.floor_1, 0.6, 1);
		this.computeHexagonPoints(...this.floor_2, 0.6, 1);
		this.computeHexagonPoints(...this.floor_3, 0.6, 2);
		this.computeHexagonPoints(...this.floor_4, 0.6, 2);
	}
	path_floor2() {
		this.path_floor1();
		this.computeHexagonPoints(...this.floor_3, 0.6);
		this.computeHexagonPoints(...this.floor_4, 0.6);
		this.computeHexagonPoints(...this.floor_5, 0.6, 1);
		this.computeHexagonPoints(...this.floor_6, 0.6, 1);
		this.computeHexagonPoints(...this.floor_1, 0.6, 2);
		this.computeHexagonPoints(...this.floor_2, 0.6, 2);
	}
	path_floor3() {
		this.path_floor2();
		this.computeHexagonPoints(...this.floor_5, 0.6);
		this.computeHexagonPoints(...this.floor_6, 0.6);
		this.computeHexagonPoints(...this.floor_3, 0.6, 1);
		this.computeHexagonPoints(...this.floor_4, 0.6, 1);
		this.computeHexagonPoints(...this.floor_5, 0.6, 2);
		this.computeHexagonPoints(...this.floor_6, 0.6, 2);
	}
	setText(text) {
		this.ctx.fillStyle = "yellow";
		this.ctx.font = 'bold 32px serif';
		this.ctx.fillText('A ' + text, 30, 30);
		this.ctx.fillText('B ' + text, 30, this.bg.height + 30);
		this.ctx.fillText('C ' + text, 30, this.bg.height * 2 + 30);
		this.ctx.font = 'bold 14px serif';
	}
	setDef() {
		let [x, y] = [219, 113];
		for (let i = 0; i < 3; i++) {
			this.ctx.drawImage(
				this.def_1,
				x - this.def_1.width / 2,
				y + this.bg.height * i - this.def_1.height / 2
			);
			this.ctx.drawImage(this.def_2, x + 40 - this.def_2.width / 2, y + this.bg.height * i - this.def_2.height / 2);
			this.ctx.drawImage(this.def_3, x - this.def_3.width / 2, y + 40 + this.bg.height * i - this.def_3.height / 2);
			this.ctx.drawImage(this.def_4, x + 40 - this.def_4.width / 2, y + 40 + this.bg.height * i - this.def_4.height / 2);
		}

	}

}