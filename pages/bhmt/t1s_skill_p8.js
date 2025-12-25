import base from "./t1s_skill_base.js";
import { AnimationFrame } from "../../assets/js/esm/AnimationFrame.js";
export default class t1s extends base {
	constructor(elm, dom) {
		super(elm, dom);
		this.start();
	}
	async start() {
		await this.fetchImageList({
			bg: ['/pages/bhmt/t1s_s_2.webp',{ resizeHeight: 360 }],
			boss: ['/images/boss/1.webp'],
			tank: ['/images/job/fh.webp'],
			dps: ['/images/job/d.webp'],
			heal: ['images/job/h.webp'],
			def_1: ['/images/EffectsGood/210156.webp', { resizeWidth: 32 }],
			def_2: ['/images/EffectsGood/210151.webp', { resizeWidth: 32 }],
			def_3: ['/images/EffectsGood/210252.webp', { resizeWidth: 32 }],
			def_4: ['/images/EffectsGood/210256.webp', { resizeWidth: 32 }],
			def_5: ['/images/EffectsGood/210152.webp', { resizeWidth: 32 }],
			lb: ['/images/skill/lb.webp', { resizeWidth: 32 }]
		});
		this.canvas.width = this.bg.width * 2 + 5;
		this.canvas.height = this.bg.height;
		//this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		this.CreatFloor();
		this.setLoopFrame('t1s-p8', 20);
	}
	loop() {
		const T = this;
		this.MyName = 't1s-p8';
		this.MyLoop = {
			maxTime: 100,
			progress() {
				T.time = this.loopTime;
				T.indexTime = this.indexTime;
				T.loopFrame(this);
			}
		};
		AnimationFrame.setLoop(this.MyName, this.MyLoop);

		return;
		this.WriteBg(1, 2);
		if (this.time >= 30 && this.time < 60) {
			this.Each(null, j => {
				this.WriteOutDGM(this.SetOffset([148, 180], j, 0), 0.5, 150);
			});
		}
		this.drawTank();
		this.drawDPS1();
		this.drawDPS2();
		this.drawHeal();
		this.drawBOSS();
		this.drawText();
		this.time += 1;
		if (this.time > 100) {
			this.time = 1;
		}
	}
	loopFrame() {
		const T = this;
		T.WriteBg(1, 2);
		if (T.time >= 10 && T.time < 15) {
			T.Each(null, j => {
				if (T.indexTime % 2 == 0) {
					T.WriteOutDGM(T.SetOffset([148, 180], j, 0), 0.8, 150);
				}
			});
		}
		T.drawTank();
		T.drawDPS1();
		T.drawDPS2();
		T.drawHeal();
		T.drawBOSS();
		T.drawText();

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
		const points = [148, 180];
		const fenshen = [
			[
				[261, 150],
				[35, 208],
			],
			[
				[132, 40],
				[165, 317],
			],
		]
		const centerOffset = [];
		if (this.time < 15) {
			this.Each(null, j => {
				let offset = this.SetOffset(points, j, 0);
				centerOffset[j] = offset;
				this.WriteIcon(this.boss, offset);
			});
		}
		this.Each(null, j => {
			let offset1 = this.SetOffset(fenshen[j][0], j, 0);
			let offset2 = this.SetOffset(fenshen[j][1], j, 0);
			this.WriteIcon(this.boss, offset1);
			this.WriteIcon(this.boss, offset2);
			if (this.time >5&&this.time<15) {
				const ctx = this.ctx;
				ctx.lineWidth = 5;
				ctx.strokeStyle = "rgba(206,0,225,0.5)";
				ctx.beginPath();
				ctx.moveTo(...centerOffset[j]);
				ctx.lineTo(...offset1);
				ctx.stroke(); // 渲染路径
				ctx.beginPath();
				ctx.moveTo(...centerOffset[j]);
				ctx.lineTo(...offset2);
				ctx.stroke(); // 渲染路径
			}
		});
	}

	CreatFloor() {
		this.setFloorStart([35, 208]);
	}
	ziquan(endOffset) {
		if (this.time < 30) {
			this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
		}

	}
	drawTank() {
		let points = [
			[125, 170],//1
			[170, 200],//2
			[123, 186],//1左
			[123, 186],//1右
		];
		const pos = [[0, 2], 0];
		return this.timeFunction([
			[
				//紫圈
				[0, 0],
				()=>{
					this.Each(null,j=>{
						const offset1 = this.SetOffset(points[0],j,0);
						const offset2 = this.SetOffset(points[1],j,0);
						this.ziquan(offset1);
						this.ziquan(offset2);
						this.WriteIcon(this.tank,offset1,'坦1');
						this.WriteIcon(this.tank,offset2,'坦2');
					});
				},
				//紫圈
				[3,0.2],
				p=>{
					this.Each(null,j=>{
						const offset1 = this.SetOffset(points[0],j,0);
						const offset2 = this.SetOffset(points[1],j,0);
						this.ziquan(offset1);
						this.ziquan(offset2);
						this.WriteIcon(this.tank,offset1,'坦1');
						this.WriteIcon(this.tank,offset2,'坦2');
					});
				}
			],

		]);
		this.loopIcon(
			this.tank,
			[
				[
					//头尾夹击
					[0, 0],
					points[0],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'坦2'
				],
				[
					//头尾夹击
					[5,0.1],
					points[1],
					pos,
				],
			]
		);
		this.loopIcon(
			this.tank,
			[
				[
					//头尾夹击
					[0, 0],
					points[1],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'坦1'
				],
				[
					//头尾夹击
					[5,0.1],
					points[1],
					pos,
				],
			]
		);
	}
	drawDPS1() {
		let points = [
			[164, 157],//4
			[132, 209],//3
			[203, 72],
			[164, 13],
		];
		const pos = [[0, 2], 0];
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0, 0],
					points[0],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'近6'
				],
			]
		);
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0, 0],
					points[1],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'近5'
				],
			]
		);
	}
	drawDPS2() {
		let points = [
			[215, 212],//8
			[99, 134],
			[119, 80],
		];
		const pos = [[0, 2], 0];
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0, 0],
					points[0],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'远8'
				],
			]
		);
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0, 0],
					points[1],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'远7'
				],
			]
		);
	}
	drawHeal() {
		let points = [
			[200, 174],//4
			[83, 169],//3
		];
		const pos = [[0, 2], 0];
		this.loopIcon(
			this.heal,
			[
				[
					//头尾夹击
					[0, 0],
					points[0],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'疗4',
				],
			]
		);
		this.loopIcon(
			this.heal,
			[
				[
					//头尾夹击
					[0, 0],
					points[1],
					pos,
					[(endOffset) => this.ziquan(endOffset)],
					'疗3',
				],
			]
		);
	}
	drawText() {
		switch (true) {
			case this.time < 5:
				//0-30
				this.WriteBigText([30, 30], '合体+毒液喷发');
				break;
			case this.time < 12:
				//30-60
				this.WriteBigText([30, 30], '分裂');
				break;
			case this.time < 15:
				//60-90
				this.WriteBigText([30, 30], '击退');
				break;
		}
	}
}