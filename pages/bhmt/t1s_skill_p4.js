export default class t1s{
	constructor(elm,dom) {
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.canvas = canvas;
		this.start();
	}
	async start(){
		const img =  await createImageBitmap(await (await fetch('/pages/bhmt/t1s_s_1.webp')).blob(),{resizeHeight:180});
		const fh =  await createImageBitmap(await (await fetch('/images/job/fh.webp')).blob());
		const boss =  await createImageBitmap(await (await fetch('/images/boss/1.webp')).blob());
		this.dps  =  await createImageBitmap(await (await fetch('/images/job/d.webp')).blob());
		this.canvas.width = img.width;
		this.canvas.height = img.height*2;
		this.ctx = this.canvas.getContext('2d');
		this.time = 1;
		setInterval(()=>this.loop(fh,boss,img),100);
	}
	loop(fh,boss,img){
		const ctx = this.ctx;
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		ctx.drawImage(img,0,0);
		ctx.drawImage(img,0,img.height);
		if(this.time>5&&this.time<40){
			let per = (this.time-5)/35;
			this.computeHexagonPoints(131,88,0.3+per/2);
			this.computeHexagonPoints(99,32+img.height,0.3+per/2);
		}
		if(this.time>30&&this.time<50){
			let per = (this.time-30)/20;
			this.computeHexagonPoints(131,88+img.height,0.3+per/2);
			this.computeHexagonPoints(99,32,0.3+per/2);
		}
		ctx.drawImage(boss,120,35);
		ctx.drawImage(boss,120,35+img.height);
		if(this.time<10){
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.roundRect(140,18, 28, 28, [25]);
			ctx.fill();
			ctx.fillStyle = "red";
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.roundRect(140,18+img.height, 28, 28, [25]);
			ctx.fill();
			ctx.drawImage(fh,142,22);
			ctx.drawImage(fh,142,22+img.height);
		}
		if(this.time<15){
			ctx.font = "bold 32px serif";
			ctx.fillStyle = "red";
			ctx.fillText('开始',200,200);
		}
		ctx.font = "bold 14px serif";
		if(this.time>30&&this.time<40){
			// 半径为零的圆角矩形（指定为数字）
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.fillStyle  = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.roundRect(142,0, 50, 50, [0,50,0,0]);
			ctx.fill();
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.fillStyle  = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.roundRect(142,0+img.height, 50, 50, [0,50,0,0]);
			ctx.fill();
		}
		if(this.time<40){
			ctx.fillStyle = "red";
			ctx.fillText('人群',100,50)
			ctx.fillText('人群',120,75+img.height);
			if(this.time<20&&this.time>10){
				let per = (this.time-10)/10;
				if(per>1)per=1;
				ctx.drawImage(fh,142-35*per,25+10*per);
				ctx.drawImage(fh,142-20*per,img.height+22+38*per);
			}else if(this.time>=20){
				ctx.drawImage(fh,107,35);
				ctx.drawImage(fh,122,img.height+60);
			}
		}else{
			let per = (this.time-40)/10;
			if(per>1)per=1;
			ctx.fillStyle = "red";
			ctx.fillText('人群',100+20*per,50+25*per);
			ctx.fillText('人群',120-20*per,img.height+75-25*per);
			if(this.time<60){
				ctx.drawImage(fh,107+20*per,35+25*per);
				ctx.drawImage(fh,122-20*per,img.height+60-25*per);
			}else if(this.time>=60){
				let per2 = (this.time-60)/20;
				if(per2>1)per2=1;
				ctx.drawImage(fh,127+(142-127)*per2,50-(50-22)*per2);
				ctx.drawImage(fh,102+(142-102)*per2,img.height+35-(35-22)*per2);
			}
		}
		if(this.time>40){
			ctx.drawImage(this.dps,90,30);
			ctx.drawImage(this.dps,122,img.height+80);
			ctx.fillStyle = "red";
			ctx.fillText('喂蛇人(71+)',90,30);
			ctx.fillText('喂蛇人(71+)',122,img.height+80);
		}
		this.time+=1;
		if(this.time>80){
			this.time = 1;
		}
		//requestAnimationFrame(this.loop(ctx,fh,boss));
	}
	r = (194-132)/2;
	width = Math.sqrt(Math.pow(132-163,2)+Math.pow(125-108,2));
	h = Math.sqrt(Math.pow(this.width,2)- Math.pow(this.r,2));
	computeHexagonPoints(x, y, opt) {
		const ctx = this.ctx;
		const points = [];
		const size = 31.5;
		const s2 = Math.sqrt(Math.pow(131-163,2)+Math.pow(125-107,2));
		const h = Math.sqrt(s2*s2-size*size);
		for(let i=0;i<4;i++){
			points[i] = [x,y];
			points[4+i] = [x,y];
			if(i==1||i==2){
				points[i][0] -= this.r;
				points[i+4][0] += this.r;
			}
			if(i<2){
				points[i][1] -= this.h*(2-i);
				points[i+4][1] -= this.h*(2-i);
			}
			if(i>=2){
				points[i][1] +=this.h*(i-1);
				points[i+4][1] += this.h*(i-1);
			}
		}
		ctx.strokeStyle = "rgba(255,255,255,"+opt+")";
		ctx.fillStyle  = "rgba(255,255,255,"+opt+")";
		ctx.beginPath();
		ctx.moveTo(points[0][0],points[0][1]);
		for (let p of points) {
			ctx.lineTo(p[0],p[1]);
		}
		ctx.closePath();
		ctx.fill();
	  }
	
}