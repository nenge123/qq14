import base from "./t1s_skill_base.js";
export default class t1s extends base {
	constructor(elm,dom) {
		super(elm,dom);
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

		this.changeAtk = await fetchImage('/images/skill/000803.webp', { resizeWidth: 32 });
		this.lb = await fetchImage('/images/skill/lb.webp', { resizeWidth: 32 });

		this.canvas.width = this.bg.width * 2 + 5;
		this.canvas.height = this.bg.height;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		this.CreatFloor();
		this.runLoop();
	}
	loop() {
		const ctx = this.ctx;
		this.WriteBg(1, 2);
		this.loopFloor(0.5);
		this.drawBOSS();
		this.drawTank();
		this.drawDPS1();
		this.drawDPS2();
		this.drawHeal();
		this.drawText();
		this.time += 1;
		if (this.time > 300) {
			this.time = 1;
		}
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
		const points = [163, 108];
		if (this.time <= 40) {
			this.Each(null, j =>{
				let offset = this.SetOffset(points, j, 0);
				if(this.time<=20){
					//头尾夹击
					this.WriteHalfCircle(offset,'rgba(255,193,7,0.8)',60,135);
					this.WriteHalfCircle(offset,'rgba(255,193,7,0.8)',60,-45);
				}
				this.WriteIcon(this.boss, offset);
			});

		} else if (this.time <= 60) {
			this.Each(null, j => {
				let offset = this.SetOffset(points, j, 0);
				if (this.time % 2 == 0) {
					//以形换位
					this.WriteIcon(this.boss, offset);
				}
				this.WriteCircle(offset, 'rgba(219,200,145,0.5)', 60);
				this.WriteOutDGM(offset);
			});
		} else if (this.time <= 80) {
			//凝视
			this.Each(null, j => {
				let offset = this.SetOffset(points, j, 0);
				this.WriteIcon(this.boss, offset);
				this.WriteCircle(offset, 'rgba(0,128,0,0.5)', 60);
			});
		} else {
			this.Each(null, j => {
				let offset = this.SetOffset(points, j, 0);
				if(this.time<=200&&this.time>180){
					//头尾夹击
					this.WriteHalfCircle(offset,'rgba(255,193,7,0.8)',60,135);
					this.WriteHalfCircle(offset,'rgba(255,193,7,0.8)',60,-45);
				}
				if(this.time<=220){
					this.WriteIcon(this.boss, offset);
				}else{
					let offset2 = this.SetOffset([145,4], j, 0);
					this.WriteIcon(this.boss, offset2);
				}
			});
		}
	}
	
	CreatFloor() {
		this.setFloorStart([33, 33]);
		this.floorTime = [
			[
				[120, 999], //时间轴
				this.setFloorPoint(
					[
						[2, 0,0,0],
						[3, 0,0,0],
		
						[2, 1,1,0],
						[1, 3,1,0],
						[1, 2,1,0],
						[1, 1,1,0],

					]
				)
			],
			[
				[160, 999],
				this.setFloorPoint(
					[
						[1, 3, [0, 2], 0],
						[2, 1, [0, 2], 0],
		
						[1, 1, [0, 2], 1],
						[1, 2, [0, 2], 1],
		
						[2, 0, [0, 2], 2],
						[3, 0, [0, 2], 2]

					]
				)
			],
		];

	}
	drawTank(){
		let points = [
			[163, 137],
			[184,103],
			[165,167],
		];
		const pos = [[0,2],0];
		this.loopIcon(
			this.tank,
			[
				[
					//头尾夹击
					[0,0],
					points[0],
					pos,
				],
				[
					//头尾夹击
					[10,5],
					points[1],
					pos,
				],
				[
					//归位
					[25,5],
					points[0],
					pos,
				],
				[
					//以形换位
					[40,5],
					points[2],
					pos,
				],
				[
					//凝视 需要嘲讽
					[60,5],
					points[0],
					pos,
					[(endOffset)=>{
						if(this.time<=80){
							let [x,y] = endOffset;
							this.WriteIcon(this.changeAtk,[x+25,y],'嘲讽');
						}
					}],
				],
				[
					//毒液喷发
					[80],
					points[0],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
				],
				[
					//致死毒孢
					[100],
					points[0],
					pos,
					[(endOffset)=>{
						if(this.time%2==0){
							this.WriteCircle(endOffset, "rgba(206,0,225,1)", 25);
						}
					}],
					'致死毒孢'
				],
				[
					//无
					[120],
					points[0],
					pos
				],
				[
					//头尾夹击
					[180,5],
					points[1],
					pos
				],
				[
					//头尾夹击-归位
					[200,5],
					points[0],
					pos
				],
				[
					//头尾夹击-归位
					[220,5],
					points[0],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
				],
			]
		);
	}
	drawDPS1(){
		let points = [
			[184, 96],
			[221,73],
			[203,72],
			[164,13],
		];
		const pos = [[0,2],0];
		const text = '近';
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0,0],
					points[0],
					pos,
					null,
					text
				],
				[
					//头尾夹击
					[19,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒点名
					[25,5],
					points[1],
					pos,
					[(endOffset)=>{
						if(this.time%2==0){
							this.WriteCircle(endOffset, "rgba(25,135,84," + 0.6 + ")", 40);
						}
					}],
					text
				],
				[
					//毒点名
					[30,5],
					points[0],
					pos,
					[(endOffset,l,k)=>{
						let offset = this.SetOffset(points[1],l,k);
						this.WriteCircle(offset, "rgba(25,135,84," +  0.6 + ")", 40);
					}],
					text
				],
				[
					//以形换位
					[40,5],
					points[2],
					pos,
					[(endOffset,l,k)=>{
						if(this,this.time<50){
							let offset = this.SetOffset(points[1],l,k);
							this.WriteCircle(offset, "rgba(25,135,84," +  0.6 + ")", 40);
						}
					}],
					text
				],
				[
					//凝视 需要嘲讽
					[60,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒液喷发
					[80],
					points[0],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
					text
				],
				[
					//致死毒孢
					[100],
					points[0],
					pos,
					null,
					text
				],
				[
					//无
					[120],
					points[0],
					pos,
					null,
					text
				],
				[
					//头尾夹击
					[180,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒
					[200,5],
					points[0],
					pos,
					[(endOffset)=>{
						if(this.time%2==0){
							this.WriteCircle(endOffset, "rgba(25,135,84," + 0.6 + ")", 40);
						}
					}],
					text
				],
				[
					//毒
					[215,5],
					points[2],
					pos,
					[(endOffset,l,k)=>{
						let offset = this.SetOffset(points[0],l,k);
						this.WriteCircle(offset, "rgba(25,135,84," +  0.6 + ")", 40);
					}],
					text
				],
				[
					//头尾夹击-归位
					[220,5],
					points[3],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
						const [x,y] = endOffset;
						this.WriteIcon(this.lb,[x+25,y],'龙骑二段极限技');
					}],
					text
				],
			]
		);
	}
	drawDPS2(){
		let points = [
			[140, 96],
			[103,96],
			[119,80],
		];
		const pos = [[0,2],0];
		const text = '远';
		this.loopIcon(
			this.dps,
			[
				[
					//头尾夹击
					[0,0],
					points[0],
					pos,
					null,
					text
				],
				[
					//头尾夹击
					[19,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒点名
					[25,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒点名
					[30,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//以形换位
					[40,5],
					points[2],
					pos,
					text
				],
				[
					//凝视 需要嘲讽
					[60,5],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒液喷发
					[80],
					points[0],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
					text
				],
				[
					//致死毒孢
					[100],
					points[0],
					pos,
					null,
					text
				],
				[
					//毒点名
					[145,5],
					points[0],
					pos,
					[(endOffset)=>{
						if(this.time%2==0){
							this.WriteCircle(endOffset, "rgba(25,135,84," + 0.6 + ")", 40);
						}
					}],
					text
				],
				[
					//毒点名
					[150,5],
					points[2],
					pos,
					[(endOffset,l,k)=>{
						if(this.time<170){
							let offset = this.SetOffset(points[0],l,k);
							this.WriteCircle(offset, "rgba(25,135,84," +  0.6 + ")", 40);
						}
					}],
					text
				],
				[
					//头尾夹击
					[180,5],
					points[2],
					pos,
					null,
					text
				],
				[
					//头尾夹击-归位
					[200,5],
					points[2],
					pos,
					null,
					text
				],
				[
					//头尾夹击-归位
					[220,5],
					points[2],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
					text
				],
			]
		);
	}
	drawHeal(){
		let points = [
			[163,48],
			[163,86],
		];
		const pos = [[0,2],0];
		this.loopIcon(
			this.heal,
			[
				[
					//头尾夹击
					[0,0],
					points[0],
					pos,
				],
				[
					//以形换位
					[59,0],
					points[0],
					pos,
				],
				[
					//凝视 需要嘲讽
					[60,5],
					points[1],
					pos,
				],
				[
					//毒液喷发
					[80,5],
					points[0],
					pos,
					[(endOffset)=>{
						if(this.time<100){
							//紫圈
							this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
						}
					}],
				],
				[
					//头尾夹击-归位
					[220,5],
					points[0],
					pos,
					[(endOffset)=>{
						//紫圈
						this.WriteCircle(endOffset, "rgba(206,0,225,0.5)", 60);
					}],
				],
			]
		);
	}
	drawText() {
		switch (true) {
			case this.time <20:
				this.WriteBigText([30, 30], '头尾夹击');
			break;
			case this.time <40:
				this.WriteBigText([30, 30], '喷毒');
			break;
			case this.time <60:
				//40-60
				this.WriteBigText([30, 30], '以形换位');
			break;
			case this.time <80:
				//60-80
				this.WriteBigText([30, 30], '凝视');
			break;
			case this.time <100:
				//80-100
				this.WriteBigText([30, 30], '毒液喷发');
			break;
			case this.time <120:
				//100-120
				this.WriteBigText([30, 30], '致死毒孢');
			break;
			case this.time <140:
				this.WriteBigText([30, 30], '防卫反应启动');
			break;
			case this.time <160:
				this.WriteBigText([30, 30], '喷毒');
			break;
			case this.time <180:
				this.WriteBigText([30, 30], '防卫反应启动');
			break;
			case this.time <200:
				//180
				this.WriteBigText([30, 30], '头尾夹击');
			break;
			case this.time <220:
				this.WriteBigText([30, 30], '喷毒');
			break;
			case this.time <240:
				this.WriteBigText([30, 30], '合体+毒液喷发');
			break;
		}
	}
}