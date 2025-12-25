import base from "./t1s_skill_base.js";
export default class t9ex extends base {
	maxTime = 0;
	bg = {
		width: 414,
		height: 414
	};
	constructor(elm, dom) {
		super(elm, dom);
		this.start();
	}
	async start() {
		this.creatSize();
		await this.fetchImageList({
			boss: ['/images/boss/1.webp',{ resizeWidth: 32 }],
			tankMT: ['/images/job/qishi.svg',{ resizeWidth: 20 }],
			tankST: ['/images/job/zhanshi.svg',{ resizeWidth: 20 }],
			longqi: ['/images/job/longqi.svg',{ resizeWidth: 20 }],
			dps: ['/images/job/d.webp',{ resizeWidth: 20 }],
			heal: ['images/job/xuezhe.svg',{ resizeWidth: 20 }],
			def_1: ['/images/EffectsGood/210156.webp', { resizeWidth: 32 }],
			def_2: ['/images/skill/000151.webp', { resizeWidth: 32 }],
			def_3: ['/images/skill/Foresight.webp', { resizeWidth: 32 }],
			def_4: ['/images/skill/000267.webp', { resizeWidth: 32 }],
			def_5: ['/images/skill/000801.webp', { resizeWidth: 32 }],
			def_6: ['/images/skill/000263.webp', { resizeWidth: 32 }],
			lb: ['/images/skill/lb.webp', { resizeWidth: 32 }],
			changeAtk:['/images/skill/000803.webp', { resizeWidth: 32 }],
			du:['/images/EffectsBad/215007.webp', { resizeWidth: 32 }]
		});
		this.setLoopFrame('t9ex-p1', this.maxTime);
	}
	creatSize() {

	}
	WriteStrokeCircle(points, r) {
		const ctx = this.ctx;
		ctx.strokeStyle = 'blue';
		ctx.beginPath();
		ctx.arc(...points, r, 0, Math.PI * 2);
		ctx.stroke();
	}
	getSamallCircle(offsetC, r, Angle) {
		return [
			offsetC[0] + r * Math.cos(Angle * Math.PI / 180),
			offsetC[1] + r * Math.sin(Angle * Math.PI / 180),
		];
	}

}