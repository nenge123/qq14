import t9ex from "./t9ex_base.js";
export default class t9exp1 extends t9ex {
	constructor(elm, dom) {
		super(elm, dom);
		this.start();
	}
	creatSize() {
		this.canvas.width = this.bg.width * 2 + 5;
		this.canvas.height = this.bg.height;
	}
	createP1() {
		this.clear();
		const ctx = this.ctx;
		const width = this.bg.width;
		this.Each(null, j => {
			let offsetC = this.SetOffset([width / 2, width / 2], j, 0);
			this.WriteStrokeCircle(offsetC, 15 / 2);
			this.WriteStrokeCircle(offsetC, 235 / 2);
			this.WriteStrokeCircle(offsetC, 273 / 2);
			this.WriteStrokeCircle(offsetC, width / 2);
			for (let i = -30; i <= 210;) {
				let offset1 = this.getSamallCircle(offsetC, 235 / 4, i);
				this.WriteStrokeCircle(offset1, 85 / 2);
				this.WriteStrokeCircle(offset1, 15 / 2);
				i += 120;
			}
			for (let i = 90; i <= 360 + 90;) {
				let offset1 = this.getSamallCircle(offsetC, width / 2 - 15, i);
				this.WriteStrokeCircle(offset1, 15 / 2);
				i += 360 / 12;
			}
		});
	}
	sixingST(points){
		const [x,y] = points;
		this.WriteIcon(this.def_6, [x , y- 80], '非140食物可配战粟', 'white','red');
		this.WriteIcon(this.def_3, [x, y-40], '尖喙读条,预见+裂石飞环回血','white', 'red');

	}
	sixingMT(points){
		const [x,y] = points;
		this.WriteIcon(this.def_1,[x - 50, y-40], '减伤(可加翅膀)', 'red');
	}
	duST(points){
		const [x,y] = points;
		this.WriteIcon(this.du, [x + 50, y-40], '毒5-7秒', 'red');
		this.WriteIcon(this.def_4,[x + 50, y], '复仇', 'red');
	}
	duMT(points){
		const [x,y] = points;
		this.WriteIcon(this.du, [x - 30, y-80], '毒5-7秒', 'red');
		this.WriteIcon(this.def_4,[x - 30, y-40], '20%大减(不要玩翅膀)', 'red');
	}
	maxTime = 35;
	loopFrame() {
		const T = this;
		T.createP1();
		if (this.time < 20) this.time = 20;
		//if(this.time<=10){
		let points = [
			[207, 236],
			[130, 250],//1
			[280, 250],//2
			[199, 223],//近1 3
			[227, 212],//近1 4
			[184, 207],//月流1 5
			[224, 207],//月流2 6

			[111, 373],//陨石1 7
			[207, 397],//陨石2 8
			[303, 373],//陨石3 9
			[211, 332],//陨石2上 9
		];
		this.timeFunction([

			[
				[0, 0],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(points[0], j, 0);
						this.WriteIcon(this.heal, offset, this.time >= 9 ? undefined : '人群', 'red');
					});
				}],
			[
				[14, 1],
				p => {
					this.Each(null, j => {
						let offset = this.MoveOffset(points[0], points[1], p, j, 0);
						let offset2 = this.MoveOffset(points[0], points[2], p, j, 0);
						this.WriteIcon(this.heal, offset, '队1远', 'red');
						this.WriteIcon(this.heal, offset2, '队2远', 'red');
						let offset3 = this.MoveOffset(points[0], points[3], p, j, 0);
						let offset4 = this.MoveOffset(points[0], points[3], p, j, 0);
						this.WriteIcon(this.longqi, offset3, '近3', 'red');;
						this.WriteIcon(this.longqi, offset4, '近4', 'red');
					});
				}
			],
			[
				[15, 1],
				p => {
					//近战远离
					this.Each(null, j => {
						let offset3 = this.MoveOffset(points[3], points[1], p, j, 0);
						let offset4 = this.MoveOffset(points[4], points[2], p, j, 0);
						this.WriteIcon(this.longqi, offset3, p >= 0.2 ? '' : '近3', 'red');
						this.WriteIcon(this.longqi, offset4, p >= 0.2 ? '' : '近4', 'red');
						let offset = this.SetOffset(points[1], j, 0);
						let offset2 = this.SetOffset(points[2], j, 0);
						this.WriteIcon(this.heal, offset, '队1', 'red');
						this.WriteIcon(this.heal, offset2, '队2', 'red');
					});
				}
			],
			[
				[17,1],
				p => {
					//1分摊
					this.Each(null, j => {
						let offset = this.SetOffset(points[j + 1], 0, 0);
						this.WriteShareDGM(offset, 'red', 20);
						this.WriteIcon(this.heal, offset, j == 0 ? '队1 分摊' : '队2 分摊', 'rgba(0,0,0,1)');
					});
					//2月环
					this.Each(null, j => {
						let offset = this.MoveOffset(points[j + 1], points[j + 5], p, 1, 0);
						this.WriteIcon(this.heal, offset, j == 0 ? '队1' : '队2', 'red');
					});
				}
			],
			[
				[18, 1],
				p => {
					//1月环
					this.Each(null, j => {
						let offset = this.MoveOffset(points[j + 1], points[j + 5], p, 0, 0);
						this.WriteIcon(this.heal, offset, j == 0 ? '队1' : '队2', 'red');
					});
					//2分摊
					this.Each(null, j => {
						let offset = this.SetOffset(points[j + 5], 1, 0);
						this.WriteShareDGM(offset, 'red', 20);
						this.WriteIcon(this.heal, offset, j == 0 ? '队1' : '队2', 'red');
					});
				}
			],
			[
				[20, 0],
				p => {
					this.Each(null, j => {
						let offset1 = this.SetOffset(points[5], j, 0);
						let offset2 = this.SetOffset(points[6], j, 0);
						this.WriteIcon(this.heal, offset1, '队1', 'red');
						this.WriteIcon(this.heal, offset2, '队2', 'red');
					});
				}
			],
			[
				[21, 0],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(points[0], j, 0);
						this.WriteIcon(this.heal, offset,'人群', 'red');
					});
				}
			],
			[
				[24,1],
				p => {
					this.Each(null, j => {
						let yunshi1 = this.MoveOffset(points[5], points[7], p, j);
						let yunshi2 = this.MoveOffset(points[6], points[8], p, j);
						let yunshi3 = this.MoveOffset(points[6], points[9], p, j);
						this.WriteIcon(this.heal, yunshi1, '疗3', 'red');
						this.WriteIcon(this.dps, yunshi2, '远8', 'red');
						this.WriteIcon(this.heal, yunshi3, '疗4', 'red');
					});
				}
			],
			[
				[25,1],
				p => {
					this.Each(null, j => {
						let yunshi1 = this.SetOffset(points[7], j);
						let yunshi2 = this.SetOffset(points[8], j);
						let yunshi3 = this.SetOffset(points[9], j);
						if(this.time>=27.5){
							this.WriteCircle(yunshi1,'red',20);
							this.WriteCircle(yunshi2,'red',20);
							this.WriteCircle(yunshi2,'red',20);
						}
						this.WriteIcon(this.heal, yunshi1, '疗3', 'red');
						this.WriteIcon(this.dps, yunshi2, '远8', 'red');
						this.WriteIcon(this.heal, yunshi3, '疗4', 'red');
					});
				}
			],
			[
				[27,1],
				p => {
					this.Each(null, j => {
						let yunshi1 = this.MoveOffset(points[7],points[0],p, j);
						let yunshi2 = this.MoveOffset(points[8],points[0],p, j);
						let yunshi3 = this.MoveOffset(points[9],points[0],p, j);
						this.WriteCircle(this.SetOffset(points[7],j),'black',20);
						this.WriteCircle(this.SetOffset(points[8],j),'black',20);
						this.WriteCircle(this.SetOffset(points[9],j),'black',20);
						this.WriteIcon(this.heal, yunshi1, '疗3', 'red');
						this.WriteIcon(this.dps, yunshi2, '远8', 'red');
						this.WriteIcon(this.heal, yunshi3, '疗4', 'red');
					});
				}
			],
			[
				[30,1],
				p => {
					this.Each(null, j => {
						this.WriteCircle(this.SetOffset(points[7],j),'black',20);
						this.WriteCircle(this.SetOffset(points[8],j),'black',20);
						this.WriteCircle(this.SetOffset(points[9],j),'black',20);

						let offset3 = this.MoveOffset(points[0],points[7],p*16,j, 0);
						let offset4 = this.MoveOffset(points[0],points[8],p*16,j, 0);
						let offset5 = this.MoveOffset(points[0],points[1],p*16,j, 0);
						let offset6 = this.MoveOffset(points[0],points[2],p*16,j, 0);
						let offset7 = this.MoveOffset(points[0],points[10],p*16,j, 0);
						let offset8 = this.MoveOffset(points[0],points[9],p*16,j, 0);
						this.WriteIcon(this.heal, offset3, '疗3', 'red');
						this.WriteIcon(this.heal, offset4, '疗4', 'red');
						this.WriteIcon(this.dps, offset5, '近5', 'red');
						this.WriteIcon(this.dps, offset6, '近6', 'red');
						this.WriteIcon(this.dps, offset7, '远7', 'red');
						this.WriteIcon(this.dps, offset8, '远8', 'red');
					});
				}
			]

		]);
		let tankPoint = [
			[207, 226],//0
			[207, 177],//1 主位
			[235, 200],//2 ST 副位
			[177, 200],//3 MT 副位
			[207, 207],//4 地图中心

			[130, 250],//5 1队左
			[280, 250],//6 2队右


			[184, 227],//月流1 7
			[224, 227],//月流2 8


			[207, 270],//第二次月流2 9
			[207, 246],//第二次月流2 10
			[155,177],//11
			[257,177],//12

		];
		this.timeFunction([
			[
				[0, 0],
				p => {
					//嘲讽 开场
					this.Each(null, j => {
						let offsetST = this.SetOffset(tankPoint[0], j, 0);
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
						if (this.time <= 1) {
							this.WriteIcon(this.changeAtk, [offsetST[0] + 30, offsetST[1]],'嘲讽固定中间','red');
						}
					});
				}
			],
			[
				[3,1],
				p => {
					//BOSS背对人群
					this.Each(null, j => {
						//let offsetMT = this.MoveOffset(tankPoint[0], tankPoint[3], p * 2, j, 0);
						let offsetST = this.MoveOffset(tankPoint[0], tankPoint[1], p * 2, j, 0);
						//this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
					});
				}
			],
			[
				[5,1],
				p => {
					//死刑
					this.Each(null, j => {
						let offsetMT = this.MoveOffset(tankPoint[0],tankPoint[3],p, j, 0);
						let offsetST = this.SetOffset(tankPoint[1], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
						this.sixingST(offsetST);
					});
				}
			],
			[
				[7,1],
				p => {
					//换T
					this.Each(null, j => {
						let offsetST = this.MoveOffset(tankPoint[1],tankPoint[2],p, j, 0);
						this.WriteIcon(this.tankST, offsetST, 'ST');
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						this.WriteIcon(this.tankST, offsetMT);
						this.WriteIcon(this.changeAtk, [offsetMT[0] - 30, offsetMT[1]-30],'MT换T','red');
					});
				}
			],
			[
				[10,1],
				p => {
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST, 'ST排毒 近战远离', 'red');
					});
				}
			],
			[
				[12,0],
				p => {
					//静默
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT 主仇保持中间', 'red');
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
					});
				}
			],
			[
				[13,1],
				p => {
					this.Each(null, j => {
						let offsetMT = this.MoveOffset(tankPoint[3], tankPoint[4], p, j, 0);
						let offsetST = this.MoveOffset(tankPoint[2], tankPoint[4], p, j, 0);
						this.WriteIcon(this.tankST, offsetST);
						this.WriteIcon(this.tankMT, offsetMT, 'MT&ST', 'red');
					});
				}
			],
			[
				[14,1],
				p => {
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[4], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT 主仇不可立即开中间', 'red');
					});
				}
			],
			[
				[15, 1],
				p => {
					//钢铁读条
					this.Each(null, j => {
						let offsetST = this.MoveOffset(tankPoint[4], tankPoint[6], p, j, 0);
						let offsetMT = this.MoveOffset(tankPoint[4], tankPoint[5], p, j, 0);
						this.WriteIcon(this.tankMT, offsetMT);
						this.WriteIcon(this.tankST, offsetST);
					});
				}
			],
			[
				[16,0],
				p => { },
			],
			[
				[21, 1],
				p => {
					this.Each(null, j => {
						let offsetST = this.MoveOffset(tankPoint[8], tankPoint[2], p , j, 0);
						let offsetMT = this.MoveOffset(tankPoint[7], tankPoint[3], p , j, 0);
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
					});
				}
			],
			[
				[23,0],
				p => {
					//死刑
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3],j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.sixingMT(offsetMT);
					});
				}
			],

			[
				[24,1],
				p => {
					//换T
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankMT, offsetMT);
						this.WriteIcon(this.tankST, offsetST,'ST','red');
						this.WriteIcon(this.changeAtk, [offsetST[0], offsetST[1] - 40], '换T', 'red');
					});
				}
			],
			[
				[25,1],
				p => {
					//MT毒
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT排毒', 'red');
						this.WriteIcon(this.tankST, offsetST,'ST','red');
						this.duMT(offsetMT);
					});
				}
			],
			[
				[26,1],
				p => {
					//月华冲
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[3], j, 0);
						let offsetST = this.SetOffset(tankPoint[2], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST,'ST','red');
					});
				}
			],
			[
				[27,0],
				p => {
					//星辰
					this.Each(null, j => {
						let offsetST = this.SetOffset(tankPoint[1], j, 0);
						let offsetMT = this.SetOffset(tankPoint[3],j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST,'ST','red');
					});
				}
			],
			[
				[30,0],
				p => {
					//星辰
					this.Each(null, j => {
						let offsetST = this.MoveOffset(tankPoint[1],tankPoint[9],p*16, j, 0);
						this.WriteIcon(this.tankST, offsetST,'ST','red');
					});
				}
			],
			[
				[32.2,0.5],
				p => {
					//星辰
					this.Each(null, j => {
						let offsetMT = this.MoveOffset(tankPoint[10], tankPoint[11], p , j, 0);
						let offsetST = this.MoveOffset(tankPoint[9], tankPoint[12], p, j, 0);
						this.WriteIcon(this.tankST, offsetST, 'ST', 'red');
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
					});
				}
			],
			[
				[34,0],
				p => {
					//最后月华冲
					this.Each(null, j => {
						let offsetMT = this.SetOffset(tankPoint[7],j, 0);
						let offsetST = this.SetOffset(tankPoint[8], j, 0);
						this.WriteIcon(this.tankMT, offsetMT, 'MT', 'red');
						this.WriteIcon(this.tankST, offsetST,'ST 推荐使用战栗','red');
					});
				}
			],

		]);
		let bossPoint = [
			[210, 47],//0
			[207, 207],//1
			[207, 246],//2
			[207, 207],//3
			[207, 177],//1 主位 4
			[207, 177],//1 主位 4
		];
		this.timeFunction([
			[
				[0, 0],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[0], j, 0);
						this.WriteIcon(this.boss, offset);
					});
				}
			],
			[
				[1,2],
				p => {
					this.Each(null, j => {
						let offset = this.MoveOffset(bossPoint[0], bossPoint[1], p, j);
						this.WriteIcon(this.boss, offset);
					});
				}
			],
			[
				[12,0],
				p => {
					//凶鸟冲
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[2], j);
						this.WriteIcon(this.boss, offset, '凶鸟冲', 'red');
						this.WriteBigText([offset[0] - 80, offset[1] + 50], j == 0 ? '台词:燃烧殆尽(先分摊)' : '台词:月亮祝福(先月环)', 'red');
					});
				}
			],
			[
				[14,1],
				p => {
					this.Each(null, j => {
						let offset = this.MoveOffset(bossPoint[2], bossPoint[3], p, j);
						this.WriteIcon(this.boss, offset,'BOSS会先跑去主仇');
					});
				}
			],
			[
				[15, 1],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[3],j);
						this.WriteIcon(this.boss, offset,'僵直&钢铁读条...','red');
					});
				}
			],
			[
				[16,1],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[3], j);
						this.WriteCircle(offset, 'rgba(0,0,0,0.5)', 90);
						this.WriteIcon(this.boss, offset, '钢铁远离', 'red');
					});
				}
			],
			[
				[17, 1],
				p => {
					//2图月环
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[3], j);
						this.WriteIcon(this.boss, offset);
						if (j==1) {
							const ctx = this.ctx;
							ctx.fillStyle = 'rgba(0,0,0,0.5)';
							ctx.beginPath();
							ctx.arc(offset[0], offset[1], 40, 0, Math.PI * 2);
							ctx.arc(offset[0], offset[1], 200, 0, Math.PI * 2, true);
							ctx.fill();
						}
					});
				}
			],
			[
				[19, 1],
				p => {
					//1图月环
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[3], j);
						this.WriteIcon(this.boss, offset);
						if (j==0) {
							const ctx = this.ctx;
							ctx.fillStyle = 'rgba(0,0,0,0.5)';
							ctx.beginPath();
							ctx.arc(offset[0], offset[1], 40, 0, Math.PI * 2);
							ctx.arc(offset[0], offset[1], 200, 0, Math.PI * 2, true);
							ctx.fill();
						}
					});
				}
			],
			[
				[23, 0],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset(bossPoint[3], j);
						this.WriteIcon(this.boss, offset, '凶鸟尖喙读条', 'black');
					});

				}
			],
			[
				
				[24,0],
				p => {
					this.Each(null, j => {
						let offset = this.SetOffset([this.bg.width,60], j);
						this.WriteBigText(offset,'近战远离一仇坦克(月华冲)','black')
					});
				}
			],
			[
				
				[26,0],
				p => {
					this.Each(null, j => {
						this.Each(null, j => {
							let offset = this.SetOffset(bossPoint[3], j);
							this.WriteIcon(this.boss, offset);
						});	
					});
				}
			],
			[
				
				[28,0],
				p => {
					this.Each(null, j => {
						this.Each(null, j => {
							let offset = this.SetOffset(bossPoint[3],j);
							const ctx = this.ctx;
							ctx.fillStyle = 'rgba(0,0,0,0.5)';
							ctx.beginPath();
							ctx.arc(offset[0], offset[1], 40, 0, Math.PI * 2);
							ctx.arc(offset[0], offset[1], 200, 0, Math.PI * 2, true);
							ctx.fill();
							this.WriteIcon(this.boss, offset,'---::月圈80%准备跑离BOSS','rgb(255,255,255)');
						});	
					});
				}
			],
			[
				
				[30,1],
				p => {
					this.Each(null, j => {
						this.Each(null, j => {
							let offset = this.SetOffset(bossPoint[3],j);
							if(this.time<31){
								this.WriteCircle(offset, 'rgba(0,0,0,0.5)', 90);
							}
							this.WriteIcon(this.boss, offset,'钢铁战车','red');
						});	
					});
				}
			],
			[
				
				[32,0],
				p => {
					this.Each(null, j => {
						this.Each(null, j => {
							let offset = this.SetOffset(bossPoint[3],j);
							this.WriteIcon(this.boss, offset,'陨石流+月华冲','red');
						});	
					});
				}
			],
		]);
		//}

	}
}