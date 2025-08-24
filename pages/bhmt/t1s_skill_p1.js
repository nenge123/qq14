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
		//ctx.drawImage(img,0,0);
		//ctx.save();
		this.time = 1;
		setInterval(()=>this.loop(ctx,fh,boss,img),50);
	}
	loop(ctx,fh,boss,img){
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		ctx.drawImage(img,0,0);
		let per = this.time/21;
		if(this.time>21){
			if(per>2)per=2;
			ctx.drawImage(fh,100+21*per,60-19*per);
			ctx.drawImage(boss,120,35);
			ctx.fillStyle = "red";
			ctx.fillText('人群',100,50)
			ctx.fillText('人群',120,75);
		}else{
			ctx.drawImage(fh,100,60);
			ctx.drawImage(boss,145-20*per,20+15*per);
			ctx.fillStyle = "red";
			ctx.fillText('人群',100,80)
		}
		this.time+=1;
		if(this.time>100){
			this.time = 1;
		}
		//requestAnimationFrame(this.loop(ctx,fh,boss));
	}
}