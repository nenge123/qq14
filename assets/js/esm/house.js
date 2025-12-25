
const houserefresh = document.querySelector('#houserefresh');
const housenum = document.querySelector('#housenum');
const housenum_data = localStorage.getItem('housenum');
if(housenum_data!=undefined){
	housenum.value = housenum_data;
}
housenum.addEventListener('change',async function(){
	localStorage.setItem('housenum',this.value);
	await getpost();
	alert('切换成功');
});


const house = document.querySelectorAll('[id^=house-]');

house.forEach((e,index)=>{
	const id = index+1;
	const elm = e.querySelector('.accordion-body');
	elm.innerHTML = '下翻可以查看地图';
	const table = document.createElement('table');
	table.setAttribute('class','table table-striped-columns table-dark');
	let i = 1;
	if([2,4,6].includes(id))i+=30;
	const thead = document.createElement('thead');
	const th = document.createElement('tr');
	const td3 = document.createElement('td');
	const td4 = document.createElement('td');
	td3.style.width = '80px';
	td3.innerHTML = '房号';
	td4.innerHTML ='申请信息';
	th.appendChild(td3);
	th.appendChild(td4);
	thead.appendChild(th);
	table.appendChild(thead);
	const tbody = document.createElement('tbody');
	for(let j=1;j<=30;j++){
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		const td2 = document.createElement('td');
		td.innerHTML = i+'号';
		td.setAttribute('class','text-center')
		td2.setAttribute('id','housename-'+id+'-'+i);
		const input = document.createElement('input');
		input.type = 'text';
		input.setAttribute('id','input-'+id+'-'+i);
		input.placeholder= '你的游戏ID,备注等信息,控制在100字内!';
		input.setAttribute('class','form-control');
		const btn = document.createElement('button');
		btn.setAttribute('class','btn btn-success');
		btn.setAttribute('data-pos',id);
		btn.setAttribute('data-no',i);
		btn.type= 'button';
		btn.addEventListener('pointerdown',posttext);
		btn.innerHTML = '申请';
		td2.appendChild(input);
		td2.appendChild(btn);
		const group = document.createElement('div');
		group.setAttribute('class','input-group mb-1');
		group.appendChild(input);
		group.appendChild(btn);
		const resut = document.createElement('div');
		resut.setAttribute('id','result-'+id+'-'+i);
		td2.appendChild(group);
		td2.appendChild(resut);
		tr.appendChild(td);
		tr.appendChild(td2);
		tbody.appendChild(tr);
		i++;
	}
	table.appendChild(tbody);
	elm.appendChild(table);
	const img = document.createElement('img');
	img.loading = 'lazy';
	img.style.width = '100%';
	img.src = '/images/house/'+id+'.webp';
	elm.appendChild(img);
});
async function posttext(event){
	/**
	 * @type HTMLElement
	 */
	const elm = this;
	const data = elm.dataset;
	const input = document.querySelector('#input-'+data.pos+'-'+data.no);
	if(!input.value)return alert('请输入信息');
	const post = new FormData;
	post.set('path',housenum.value);
	post.set('pos',data.pos);
	post.set('no',data.no);
	post.set('text',input.value);
	await topost(post);
	input.value = '';
	alert('提交成功');

}
async function getpost(){
	const post = new FormData;
	post.set('path',housenum.value);
	return topost(post);
}
async function topost(post) {
	const res = await fetch('https://8.134.255.198/qq14.php',{
		method:'POST',body:post
	});
	const json = await res.json();
	if(json instanceof Array){
		document.querySelectorAll('[id^=result-]').forEach(elm=>elm.innerHTML='');
		json.forEach(entry=>{
			//console.log(entry);
			const div = document.querySelector('#result-'+entry.pos+'-'+entry.no);
			const p = document.createElement('div');
			p.setAttribute('class','alert alert-warning fs-6 flex p-1');
			p.style.cssText='justify-content: space-between;flex-wrap: nowrap;'
			p.innerHTML = `<span style="flex-grow: 1;">${entry.text}</span><span><span>${new Date(entry.time*1000).toLocaleString()}</span>`;
			div.appendChild(p);
		})
	}
}
houserefresh.addEventListener('pointerdown',async e=>{
await getpost();
alert('更新成功');
});
getpost();