export default class t1s{
	constructor(elm){
		const canvas = document.createElement('canvas');
		elm.appendChild(canvas);
		this.canvas = canvas;
		this.start();
	}
	async start(){
		const img =  await createImageBitmap(await (await fetch('/pages/bhmt/t1s_s_1.webp')).blob(),{resizeHeight:180});
		const fh =  await createImageBitmap(await (await fetch('/images/job/fh.webp')).blob());
		const boss =  await createImageBitmap(await (await fetch('/images/boss/1.webp')).blob());
		this.canvas.width = img.width*2;
		this.canvas.height = img.height;
		const ctx = this.canvas.getContext('2d');
		this.time = 1;
		setInterval(()=>this.loop(ctx,fh,boss,img),100);
	}
	loop(ctx,fh,boss,img){
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		ctx.drawImage(img,0,0);
		ctx.drawImage(img,img.width,0);
		ctx.drawImage(boss,120,35);
		ctx.drawImage(boss,120+img.width,35);
		if(this.time<5){
			ctx.strokeStyle = "plum";
			ctx.beginPath();
			ctx.roundRect(140,18, 28, 28, [25]);
			ctx.stroke();
			ctx.strokeStyle = "plum";
			ctx.beginPath();
			ctx.roundRect(140+img.width,18, 28, 28, [25]);
			ctx.stroke();
			ctx.drawImage(fh,142,22);
			ctx.drawImage(fh,142+img.width,22);
		}
		if(this.time<20&&this.time>4 || this.time>30&&this.time<40){
			// 半径为零的圆角矩形（指定为数字）
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.roundRect(142,0, 50, 50, [0,50,0,0]);
			ctx.fill();
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.roundRect(142+img.width,0, 50, 50, [0,50,0,0]);
			ctx.fill();
		}
		if(this.time<40){
			ctx.fillStyle = "red";
			ctx.fillText('人群',100,50)
			ctx.fillText('人群',120+img.width,75);
			if(this.time<20&&this.time>5){
				let per = (this.time-5)/15;
				if(per>1)per=1;
				ctx.drawImage(fh,142-35*per,25+10*per);
				ctx.drawImage(fh,142+img.width-20*per,22+38*per);
			}else if(this.time>=20){
				ctx.drawImage(fh,107,35);
				ctx.drawImage(fh,122+img.width,60);
			}
		}else{
			let per = (this.time-40)/10;
			if(per>1)per=1;
			ctx.fillStyle = "red";
			ctx.fillText('人群',100+20*per,50+25*per);
			ctx.fillText('人群',120+img.width-20*per,75-25*per);
			if(this.time<60){
				ctx.drawImage(fh,107+20*per,35+25*per);
				ctx.drawImage(fh,122+img.width-20*per,60-25*per);
			}else if(this.time>=60){
				let per2 = (this.time-60)/20;
				if(per2>1)per2=1;
				ctx.drawImage(fh,127+(142-127)*per2,50-(50-22)*per2);
				ctx.drawImage(fh,102+img.width+(142-102)*per2,35-(35-22)*per2);
			}
		}
		this.time+=1;
		if(this.time>80){
			this.time = 1;
		}
		//requestAnimationFrame(this.loop(ctx,fh,boss));
	}
}