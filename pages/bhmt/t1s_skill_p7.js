import base from "./t1s_skill_base.js";
export default class t1s extends base {
	constructor(elm) {
		super();
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.canvas = canvas;
		this.start();
	}
	async start() {
		const fetchImage = this.fetchImage;
		this.bg = await fetchImage('/pages/bhmt/t1s_s_1.webp', { resizeHeight: 180 });
		this.tank = await fetchImage('/images/job/fh.webp');
		this.boss = await fetchImage('/images/boss/1.webp');
		this.dps = await fetchImage('/images/job/d.webp');
		this.heal = await fetchImage('/images/job/h.webp');

		this.def_1 = await fetchImage('/images/EffectsGood/210156.webp', { resizeWidth: 32 });
		this.def_2 = await fetchImage('/images/EffectsGood/210151.webp', { resizeWidth: 32 });
		this.def_3 = await fetchImage('/images/EffectsGood/210252.webp', { resizeWidth: 32 });
		this.def_4 = await fetchImage('/images/EffectsGood/210256.webp', { resizeWidth: 32 });
		this.def_5 = await fetchImage('/images/EffectsGood/210152.webp', { resizeWidth: 32 });

		this.canvas.width = this.bg.width * 2 + 5;
		this.canvas.height = this.bg.height;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		this.runLoop();
	}
	loop() {
		const ctx = this.ctx;
		this.WriteBg(1, 2);
		this.time += 1;
		if (this.time > 250) {
			this.time = 1;
		}
	}
	//初始固定位置
	boos_1 = [197, 87];
	boos_2 = [163, 108];
	WriteTips(text) {
		this.WriteBigText([30, 30], 'A' + text);
		this.WriteBigText([30, 35 + this.bg.height], 'B注意石板顺序');
		this.WriteBigText([30, 40 + this.bg.height * 2], 'C');
	}
	drawFloor() {
		let opt = 0.5;
		const floor = [
			[],
			[130, 88.5],
			[163, 144],
			[195, 88.5],
			[227.5, 32.5],
			[98, 32.5],
			[163, 32.5]
		];
		let map = [
			[[30, 150], [1, 2], [1, 2], [3, 4, 5, 6]],
			[[70, 180], [3, 4], [5, 6], [1, 2]],
			[[100, 190], [5, 6], [3, 4], []]
		];
		for (const points of map) {
			const time = points.shift();
			if (this.time >= time[0] && this.time < time[1]) {
				let p = this.perSent(time[0], 10);
				for (let i = 0; i < 2; i++) {
					for (let q = 0; q < points.length; q++) {
						const points2 = points[q];
						for (let pos of points2) {
							let [x, y] = floor[pos];
							this.WriteSix(this.SetOffset([x, y], i, q), p * opt);
						}
					}

				}

			}
		}

	}
	drawBOSS() {
		const boos_1 = [197, 87];
		const boos_2 = [163, 108];
		if (this.time <= 40) {
			this.Each((i, j) => this.WriteIcon(this.boss, this.SetOffset(boos_1, j, i)));
		} else if (this.time <= 50) {
			let p = this.perSent(40, 10);
			this.Each((i, j) => {
				const offset = this.MoveOffset(boos_1, boos_2, p, j, i);
				this.WriteIcon(this.boss, offset);
			});
		} else {
			this.Each((i, j) => this.WriteIcon(this.boss, this.SetOffset(boos_2, j, i)));
		}
	}
	drawText() {
		switch (true) {
			case this.time < 20:
				this.WriteTips('紫圈');
				break;

			case this.time < 40:
				//20-40
				this.WriteTips('第一次地板');
				break;
			case this.time < 60:
				//40-60
				this.WriteTips('喷毒');
				break;
			case this.time < 80:
				//60-80
				this.WriteTips('第二次地板');
				break;
			case this.time < 100:
				this.WriteTips('致死毒泡 减伤');
				for (let i = 1; i <= 4; i++) {
					const icon = this['def_' + i];
					let [x, y] = [0, 0];
					if (i == 2 || i == 4) {
						y += 35;
					} else {
						x += 35
					}
					this.ctx.drawImage(
						icon,
						(i - 1) * 32 + this.bg.width - 20,
						0
					);
				}
				this.ctx.fillStyle = "red";
				this.ctx.font = 'bold 32px serif';
				this.ctx.fillText('紧急减伤', this.bg.width - 40, 64);
				this.ctx.font = 'bold 14px serif';
				this.ctx.drawImage(
					this.def_5,
					this.bg.width + 100,
					32
				);
				break;
			case this.time < 120:
				this.WriteTips('第三次地板');
				break;
			case this.time < 140:
				//120-140
				this.WriteTips('喷毒');
				break;
			case this.time < 160:
				//140 - 160
				this.WriteTips('分摊');
				break;
			case this.time < 180:
				//160-180
				this.WriteTips('喂蛇');
				break;
			case this.time < 200:
				this.WriteTips('毒液喷发(不要踩发光地板)');
				break;
		}
	}
}