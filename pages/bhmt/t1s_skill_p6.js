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
		this.canvas.height = this.bg.height * 3 + 10;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		this.runLoop();
	}
	loop() {
		const ctx = this.ctx;
		this.WriteBg(3, 2);
		this.drawFloor();
		this.drawText();
		this.drawBOSS();
		this.drawHeal();
		this.drawTank();
		this.drawDPS1();
		this.drawDPS2();
		this.drawDPS3();
		if(this.time>150&&this.time<170){
			this.Each((i,j)=>{
				let offset;
				if(i==2){
					offset = this.SetOffset([140,96],j,i);
				}else{
					offset = this.SetOffset([185,96],j,i);
				}
				this.WriteShareDGM(offset,1);
			});
		}
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
	/**
	 * 坦克
	 */
	drawTank() {
		const points = [
			[196, 112],//原始 0
			[136, 134],//拉怪 1
			[163, 137],//固定底 2
			[188, 105],//右 3
			[140, 105],//左 4
		];;
		switch (true) {
			//分裂
			case this.time <= 30: {
				this.Each((i, j) => {
					const offset = this.SetOffset(points[0], j, i);
					this.WriteIcon(this.tank, offset);
					if (this.time <= 20) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}
			case this.time <= 50: {
				//转移BOSS
				let p = this.perSent(30, 10);
				this.Each((i, j) => {
					const offset = this.MoveOffset(points[0], points[1], p, j, i);
					this.WriteIcon(this.tank, offset);
				});
				break;
			}
			case this.time <= 100: {
				//转移BOSS
				let p = this.perSent(50, 10);
				this.Each((i, j) => {
					const offset = this.MoveOffset(points[1], points[2], p, j, i);
					this.WriteIcon(this.tank, offset, this.time >= 80 && this.time < 90 ? '死刑' : undefined);
					if (this.time >= 80 && this.time < 90) {
						if (this.time % 2 == 1) {
							//死刑
							this.WriteCircle(offset, "rgba(206,0,225,1)", 25);
						}
					}
				});
				break;
			}
			case this.time <= 120: {
				//转移石板
				let p = this.perSent(110, 10);
				this.Each((i, j) => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[2], points[4], p, j, i);
					} else {
						offset = this.MoveOffset(points[2], points[3], p, j, i);
					}
					this.WriteIcon(this.tank, offset);
				});
				break;
			}
			case this.time <= 185: {
				let p = this.perSent(165, 5);
				this.Each(
					(i, j) => {
						if (i != 2) {
							let offset1 = this.MoveOffset(points[3], points[2], p, j, i);
							this.WriteIcon(this.tank, offset1);
							if (this.time >= 180) {
								//紫圈
								this.WriteCircle(offset1, "rgba(206,0,225,0.5)", 60);
							}
						}
					},
					j => {
						let offset;
						if (this.time < 175) {
							offset = this.MoveOffset(points[4], points[3], p, j, 2);
						} else {
							let p2 = this.perSent(175, 10);
							offset = this.MoveOffset(points[3], points[2], p2, j, 2);
						}
						this.WriteIcon(this.tank, offset);
						if (this.time >= 180) {
							//紫圈
							this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
						}
					}
				);
				break;
			}
			default: {
				//转移石板
				//图1/2
				this.Each(
					(i, j) => {
						let offset = this.SetOffset(points[2], j, i);
						this.WriteIcon(this.tank, offset);
						if (this.time >= 180) {
							//紫圈
							this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
						}
					});
				break;
			}
		}
	}
	/**
	 * 近战
	 */
	drawDPS1() {
		//输出5/6
		let points = [
			[220, 86],
			[188, 103],
			[135, 103]
		];
		switch (true) {
			case this.time <= 40: {
				this.Each((i, j) => {
					let offset = this.SetOffset(points[0], j, i);
					this.WriteIcon(this.dps, offset, '近1');
					if (this.time < 20) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}

				});
				break;
			}
			case this.time < 160: {
				let p = this.perSent(50, 10);
				this.Each((i, j) => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[0], points[2], p, j, i);
					} else {
						offset = this.MoveOffset(points[0], points[1], p, j, i);

					}
					this.WriteIcon(this.dps, offset, '近1');

				});
				break;
			}
			case this.time < 175: {
				let p = this.perSent(165, 10);
				this.Each((i, j) => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[2], points[1], p, j, i);
					} else {
						offset = this.MoveOffset(points[1], points[2], p, j, i);
					}
					this.WriteIcon(this.dps, offset, '近1');
				});
				break;
			}

			default: {
				this.Each((i, j) => {
					let offset;
					if (i == 2) {
						offset = this.SetOffset(points[1], j, i);
					} else {
						offset = this.SetOffset(points[2], j, i);
					}
					this.WriteIcon(this.dps, offset, '近1');
					if (this.time >= 180) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});

			}
		}
	}
	/**
	 * 近战2
	 */
	drawDPS2() {
		//输出6/8 近
		let points = [
			[168, 83], //0
			[153, 83],//左 1
			[173, 83],//右 2

			[129, 52],//远左 3
			[204, 50],//远右 4

			[164, 56],//上 5


			[135, 83],//x近左 6
			[190, 83],//x近右 7
		];
		switch (true) {
			case this.time <= 40: {
				this.Each(null, null, i => {
					let offset = this.SetOffset(points[0], 1, i);
					this.WriteIcon(this.dps, offset, '近2');
					if (this.time < 20) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}
			case this.time <= 60: {
				let p = this.perSent(50, 10);
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[0], points[1], p, 1, i);
					} else {
						offset = this.MoveOffset(points[0], points[2], p, 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					if (this.time > 55) {
						//毒
						this.WriteCircle(offset, "rgba(25,135,84," + p * 0.6 + ")", 40);
					}

				});
				break;
			}
			case this.time <= 70: {
				let p = this.perSent(60, 5);
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[1], points[3], p, 1, i);
					} else {
						offset = this.MoveOffset(points[2], points[4], p, 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					this.WriteCircle(offset, "rgba(25,135,84," + p * 0.6 + ")", 40);
				});
				break;
			}
			case this.time < 130: {
				let p = this.perSent(70, 5);
				this.Each(null, null, i => {
					let offset, offset2;
					if (i == 2) {
						offset = this.MoveOffset(points[3], points[1], p, 1, i);
						offset2 = this.SetOffset(points[3], 1, i);
					} else {
						offset = this.MoveOffset(points[4], points[2], p, 1, i);
						offset2 = this.SetOffset(points[4], 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					if (this.time < 80) {
						this.WriteCircle(offset2, "rgba(25,135,84,1)", 40);
					}
				});
				break;
			}
			case this.time < 140: {
				let p = this.perSent(130, 5);
				this.Each(null, null, i => {
					let offset, offset2;
					if (i == 2) {
						offset = this.MoveOffset(points[1], points[3], p, 1, i);
					} else {
						offset = this.MoveOffset(points[2], points[4], p, 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					this.WriteCircle(offset, "rgba(25,135,84,0.5)", 40);
				});
				break;
			}
			case this.time < 165: {
				//喂蛇
				let p = this.perSent(140, 5);
				this.Each(null, null, i => {
					let offset, offset2;
					if (i == 2) {
						offset = this.MoveOffset(points[3], points[1], p, 1, i);
						offset2 = this.SetOffset(points[3], 1, i);
					} else {
						offset = this.MoveOffset(points[4], points[2], p, 1, i);
						offset2 = this.SetOffset(points[4], 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					if (this.time <= 155) {
						this.WriteCircle(offset2, "rgba(25,135,84,1)", 40);
					}
				});
				break;
			}
			case this.time < 175: {
				//毒液分摊
				let p = this.perSent(165, 10);
				this.Each(null, null, i => {
					let offset;
					if (i == 0) {
						offset = this.MoveOffset(points[1], points[7], p, 1, i);
					} else if (i == 1) {
						offset = this.MoveOffset(points[1], points[5], p, 1, i);
					} else {
						offset = this.MoveOffset(points[2], points[6], p, 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
				});
				break;
			}
			default: {
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.SetOffset(points[6], 1, i);
					} else if (i == 1) {
						offset = this.SetOffset(points[5], 1, i);
					} else {
						offset = this.SetOffset(points[2], 1, i);
					}
					this.WriteIcon(this.dps, offset, '近2');
					if (this.time >= 180) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}
		}
	}
	/**
	 * 远程2
	 */
	drawDPS3() {
		//输出6/8 远
		let points = [
			[168, 86],//0

			[100, 100],//远左 1
			[222, 100],//远右 2

			[100, 72],//远左上 3
			[222, 72],//远右上 4

			[153, 83],//近左 5
			[173, 83],//近右 6

			[164, 56],//上 7

		];
		switch (true) {
			case this.time <= 40: {
				this.Each(null, null, i => {
					let offset = this.SetOffset(points[0], 0, i);
					this.WriteIcon(this.dps, offset, '远2');
					if (this.time < 20) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}
			case this.time < 60: {
				let p = this.perSent(50, 10);
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[0], points[1], p, 0, i);
					} else {
						offset = this.MoveOffset(points[0], points[2], p, 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
					if (this.time > 55) {
						//毒
						this.WriteCircle(offset, "rgba(25,135,84," + p * 0.6 + ")", 40);
					}
				});
				break;
			}
			case this.time < 65: {
				let p = this.perSent(60, 5);
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[1], points[3], p, 0, i);
					} else {
						offset = this.MoveOffset(points[2], points[4], p, 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
					if (i == 2) {
						//毒
						this.WriteCircle(this.SetOffset(points[1], 0, i), "rgba(25,135,84,0.6)", 40);
					} else {
						//毒
						this.WriteCircle(this.SetOffset(points[2], 0, i), "rgba(25,135,84,0.6)", 40);
					}
				});
				break;
			}
			case this.time < 120: {
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.SetOffset(points[3], 0, i);
					} else {
						offset = this.SetOffset(points[4], 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
					if (this.time < 80) {
						if (i == 2) {
							this.WriteCircle(this.SetOffset(points[1], 0, i), "rgba(25,135,84,0.6)", 40);
						} else {
							this.WriteCircle(this.SetOffset(points[2], 0, i), "rgba(25,135,84,0.6)", 40);
						}
					}
				});
				break;
			}
			case this.time < 160: {
				let p = this.perSent(130, 5);
				this.Each(null, null, i => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[3], points[5], p, 0, i);
					} else {
						offset = this.MoveOffset(points[4], points[6], p, 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
					if (this.time > 120 && this.time < 155) {
						if (i == 2) {
							this.WriteCircle(this.SetOffset(points[3], 0, i), "rgba(25,135,84,0.6)", 40);
						} else {
							this.WriteCircle(this.SetOffset(points[4], 0, i), "rgba(25,135,84,0.6)", 40);
						}
					}
				});
				break;
			}
			case this.time < 175: {
				let p = this.perSent(165, 10);
				this.Each(null, null, i => {
					let offset;
					if (i == 0) {
						offset = this.MoveOffset(points[6], points[4], p, 0, i);
					} else if (i == 1) {
						offset = this.MoveOffset(points[6], points[7], p, 0, i);
					} else {
						offset = this.MoveOffset(points[5], points[3], p, 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
				});
				break;
			}
			default: {
				this.Each(null, null, i => {
					let offset;
					if (i == 0) {
						offset = this.SetOffset(points[4], 0, i);
					} else if (i == 1) {
						offset = this.SetOffset(points[7], 0, i);
					} else {
						offset = this.SetOffset(points[3], 0, i);
					}
					this.WriteIcon(this.dps, offset, '远2');
					if (this.time >= 180) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}

		}
	}
	drawHeal() {
		//治疗
		let points = [
			[195, 57], //0

			[135, 83],//近左 1
			[190, 83],//近右 2


			[100, 100],//远左 3
			[222, 72],//远右 4

			[188, 93], //5

			[130, 60],// 6 左上
			[104, 76],// 7 左左
			[217, 72],//远右上 8


		];
		switch (true) {
			case this.time <= 40: {
				this.Each((i, j) => {
					let offset = this.SetOffset(points[0], j, i);
					this.WriteIcon(this.heal, offset);
					if (this.time < 20) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;
			}
			case this.time < 160: {
				let p = this.perSent(50, 10);
				this.Each((i, j) => {
					let offset;
					if (i == 2) {
						offset = this.MoveOffset(points[0], points[1], p, j, i);
					} else {
						offset = this.MoveOffset(points[0], points[2], p, j, i);
					}
					this.WriteIcon(this.heal, offset);
				});
				break;
			}
			case this.time < 175: {
				let p = this.perSent(165, 10);
				this.Each((i, j) => {
					let offset;
					if (i == 0) {
						offset = this.MoveOffset(points[2], points[6], p, j, i);
					} else if (i == 1) {
						offset = this.MoveOffset(points[2], points[7], p, j, i);
					} else {
						offset = this.MoveOffset(points[1], points[8], p, j, i);
					}
					this.WriteIcon(this.heal, offset);
				});
				break;
			}
			default: {
				this.Each((i,j) => {
					let offset;
					if (i == 0) {
						offset = this.SetOffset(points[6], j, i);
					} else if (i == 1) {
						offset = this.SetOffset(points[7], j, i);
					} else {
						offset = this.SetOffset(points[8], j, i);
					}
					this.WriteIcon(this.heal, offset);
					if (this.time >= 180) {
						//紫圈
						this.WriteCircle(offset, "rgba(206,0,225,0.5)", 60);
					}
				});
				break;

			}
		}
	}
}