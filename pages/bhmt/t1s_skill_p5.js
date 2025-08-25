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
			ctx.drawImage(this.boss, 115, 210);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "yellow";
			ctx.font = "bold";
			ctx.fillText('HP 68%', 115, 200);
			ctx.fillStyle = "red";
			ctx.fillText('人群', 120, 260);
			ctx.drawImage(this.tank, 150, 205);
		} else if (this.time >= 20 && this.time < 80) {
			ctx.drawImage(this.boss, 130, 160);
			if (this.time < 50) {
				ctx.fillStyle = "red";
				ctx.fillText('人群', 120, 200);
			}
			if (this.time > 30) {
				let p = (this.time - 30) / 50;
				if (p > 1) p = 1;
				//治疗
				this.drawJob('heal', '治疗3', 120 - 60 * p, 200 - 20 * p);
				this.drawJob('heal', '治疗4', 120 + 100 * p, 200 - 40 * p);
				//远程
				this.drawJob('dps', '远程7', 120-60*p,200-40*p);
				this.drawJob('dps', '远程8', 120+100*p, 200-20*p);
				//近战
				this.drawJob('dps', '近战5', 120-10*p,200-10*p,'yellow');
				this.drawJob('dps', '近战6', 120+30*p, 200-60*p,'yellow');
				//坦克
				this.drawJob('tank', '坦克1', 120-30*p,200-30*p,'yellow');
				this.drawJob('tank', '坦克2', 120+40*p, 200-40*p,'yellow');
			}
		} else if (this.time >= 80&&this.time<100) {
			if(this.time>=90){
				let p = (this.time - 90) / 20;
				if (p > 1) p = 1;
				ctx.globalAlpha = 1 - p;
				ctx.drawImage(this.boss, 130, 160);
				ctx.globalAlpha = 1;

			}else{
				ctx.drawImage(this.boss, 130, 160);
			}
			//治疗
			this.drawJob('heal', '治疗3', 60, 180);
			this.drawJob('heal', '治疗4', 220, 160);
			//远程
			this.drawJob('dps', '远程7', 60, 160);
			this.drawJob('dps', '远程8', 220, 180);
			//近战
			this.drawJob('dps', '近战5', 110,190,'yellow');
			this.drawJob('dps', '近战6', 150,140,'yellow');
			//坦克
			this.drawJob('tank', '坦克1', 90,170,'yellow');
			this.drawJob('tank', '坦克2', 160,160,'yellow');
			ctx.fillStyle = "yellow";
			ctx.fillText('没分身的时候可以多打击下', 90, 100);
		}else if (this.time >= 100) {
			if(this.time>=110){
				let p = (this.time - 110) / 20;
				if (p > 1) p = 1;
				
				//近战
				this.drawJob('dps', '近战5', 110-30*p,190+20*p,'yellow');
				this.drawJob('dps', '近战6', 150+50*p,140-20*p,'yellow');
				//坦克
				this.drawJob('tank', '坦克1', 90-50*p,170+50*p,'yellow');
				this.drawJob('tank', '坦克2', 160+80*p,160-20*p,'yellow');
				//近战
				//this.drawJob('dps', '近战5', 80,200,'yellow');
				//this.drawJob('dps', '近战6', 200,120,'yellow');
				//坦克
				//this.drawJob('tank', '坦克1', 40,220,'yellow');
				//this.drawJob('tank', '坦克2', 240,140,'yellow');
				ctx.drawImage(this.boss, 130-70*p, 160+40*p,this.boss.width*.6,this.boss.height*.6);
				ctx.drawImage(this.boss, 130+90*p, 160-20*p,this.boss.width*.6,this.boss.height*.6);
				//ctx.drawImage(this.boss, 60, 200,this.boss.width*.6,this.boss.height*.6);
				//ctx.drawImage(this.boss, 220, 140,this.boss.width*.6,this.boss.height*.6);
			}else{
				//近战
				this.drawJob('dps', '近战5', 110,190,'yellow');
				this.drawJob('dps', '近战6', 150,140,'yellow');
				//坦克
				this.drawJob('tank', '坦克1', 90,170,'yellow');
				this.drawJob('tank', '坦克2', 160,160,'yellow');
				ctx.drawImage(this.boss, 130, 160,this.boss.width*.6,this.boss.height*.6);
			}
			//治疗
			this.drawJob('heal', '治疗3', 60, 180);
			this.drawJob('heal', '治疗4', 220, 160);
			//远程
			this.drawJob('dps', '远程7', 60, 160);
			this.drawJob('dps', '远程8', 220, 180);
		}
		this.time += 1;
		if (this.time > 200) {
			this.time = 1;
		}
	}
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
		this.ctx.fillStyle = color || "red";
		this.ctx.fillText(text, x + 18, y + 12);
	}

}