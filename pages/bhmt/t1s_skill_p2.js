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
		this.canvas.width = img.width;
		this.canvas.height = img.height;
		const ctx = this.canvas.getContext('2d');
		this.time = 1;
		setInterval(()=>this.loop(ctx,fh,boss,img),50);
	}
	loop(ctx,fh,boss,img){
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		ctx.drawImage(img,0,0);
		ctx.drawImage(boss,120,35);
		ctx.fillStyle = "red";
		ctx.fillText('人群',100,50)
		ctx.fillText('人群',120,75);
		ctx.save();
		if(this.time<20&&this.time>10 || this.time>30&&this.time<40){
			// 半径为零的圆角矩形（指定为数字）
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.fillStyle  = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.roundRect(142,0, 50, 50, [0,50,0,0]);
			ctx.fill();
		}
		if(this.time>60&&this.time<80){
			ctx.strokeStyle = "rgba(255,0,0,0.5)";
			ctx.fillStyle  = "rgba(255,0,0,0.5)";
			ctx.beginPath();
			ctx.roundRect(140,18, 28, 28, [25]);
			ctx.fill();
		}
		if(this.time<5){
			ctx.drawImage(fh,142,22);
		}else if(this.time>=5&&this.time<40){
			let per = (this.time-5)/20;
			if(per>1)per=1;
			ctx.drawImage(fh,142-32*per,22+33*per);
		}else if(this.time>40){
			let per = (this.time-40)/20;
			if(per>1)per=1;
			ctx.drawImage(fh,110+32*per,55-33*per);
		}
		this.time+=1;
		if(this.time>100){
			this.time = 1;
		}
		//requestAnimationFrame(this.loop(ctx,fh,boss));
	}
}