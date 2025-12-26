const serverID = 1;//1 帝国南方堡 若其他大区用其他标识
const serverSize = 6;//房区数量
const houseSize = {
	haidu: {
		L: [2, 5, 15],
		M: [1, 4, 6, 7, 14, 29, 30],
		S: [8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
	},
	shadu: {
		L: [5, 13, 30],
		M: [4, 6, 8, 11, 12, 19, 25],
		S: [1, 2, 3, 7, 9, 10, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 26, 27, 28, 29]
	},
	sendu: {
		L: [3, 6, 28],
		M: [1, 5, 11, 16, 21, 27, 30],
		S: [2, 4, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20, 22, 23, 24, 25, 26, 29],
	}
};
const househead = document.querySelector('#househead');
const house = document.querySelectorAll('[id^=house-]');
async function posttext(event) {
	/**
	 * @type HTMLElement
	 */
	const elm = this;
	const data = elm.dataset;
	const input = document.querySelector('#input-' + data.pos + '-' + data.no);
	if (!input.value) return alert('请输入信息');
	const post = new FormData;
	post.set('path', housenum.value);
	post.set('pos', data.pos);
	post.set('no', data.no);
	post.set('text', input.value);
	await topost(post);
	input.value = '';
	alert('提交成功');

}
async function getpost() {
	const post = new FormData;
	post.set('path', housenum.value);
	return topost(post);
}
async function topost(post) {
	//1帝国
	post.set('server',serverID);
	const res = await fetch('https://8.134.255.198/qq14.php', {
		method: 'POST', body: post
	}).catch(e=>false);
	if(!res) return alert('网络通信失败!请检查网络!');
	const json = await res.json();
	if (json instanceof Array) {
		document.querySelectorAll('[id^=result-]').forEach(elm => elm.innerHTML = '');
		json.forEach(entry => {
			//console.log(entry);
			const div = document.querySelector('#result-' + entry.pos + '-' + entry.no);
			const p = document.createElement('div');
			p.setAttribute('class', 'alert alert-warning fs-6 flex p-1');
			p.style.cssText = 'justify-content: space-between;flex-wrap: nowrap;'
			p.innerHTML = `<span style="flex-grow: 1;">${entry.text}</span><span><span>${new Date(entry.time * 1000).toLocaleString()}</span>`;
			div.appendChild(p);
		})
	}
}
function createHouse(index,elm){
	let housePos = houseSize['haidu'];
	switch(index){
		case 3:
		case 4:
			housePos = houseSize['shadu'];
		break;
		case 5:
		case 6:
			housePos = houseSize['sendu'];
		break;
	}
	Object.entries(housePos).forEach(entry=>{
		const details = document.createElement('details');
		const summary = document.createElement('summary');
		summary.innerHTML = entry[0]+'房型:'+entry[1].map(v=>[2, 4, 6].includes(index)?v+30:v).join('&nbsp;&nbsp;');
		createTable(entry[1],details,index);
		details.appendChild(summary);
		elm.appendChild(details);
	});
}
function createTable(list,elm,id){
	const table = document.createElement('table');
	table.setAttribute('class', 'table table-striped-columns table-dark');
	const thead = document.createElement('thead');
	const th = document.createElement('tr');
	const td3 = document.createElement('td');
	const td4 = document.createElement('td');
	td3.style.width = '80px';
	td3.innerHTML = '房号';
	td4.innerHTML = '申请信息';
	th.appendChild(td3);
	th.appendChild(td4);
	thead.appendChild(th);
	table.appendChild(thead);
	const tbody = document.createElement('tbody');
	for (let i of list) {
		if ([2, 4, 6].includes(id)) i += 30;
		const tr = document.createElement('tr');
		const td = document.createElement('td');
		const td2 = document.createElement('td');
		td.innerHTML = i + '号';
		td.setAttribute('class', 'text-center')
		td2.setAttribute('id', 'housename-' + id + '-' + i);
		const input = document.createElement('input');
		input.type = 'text';
		input.style.cssText = 'max-width:320px';
		input.setAttribute('id', 'input-' + id + '-' + i);
		input.placeholder = '你的游戏ID,备注等信息,控制在100字内!';
		input.setAttribute('class', 'form-control');
		const btn = document.createElement('button');
		btn.setAttribute('class', 'btn btn-success');
		btn.setAttribute('data-pos', id);
		btn.setAttribute('data-no', i);
		btn.type = 'button';
		btn.addEventListener('pointerdown', posttext);
		btn.innerHTML = '需求';
		td2.appendChild(input);
		td2.appendChild(btn);
		const group = document.createElement('div');
		group.setAttribute('class', 'input-group mb-1');
		group.appendChild(input);
		group.appendChild(btn);
		const resut = document.createElement('div');
		resut.setAttribute('id', 'result-' + id + '-' + i);
		td2.appendChild(group);
		td2.appendChild(resut);
		tr.appendChild(td);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	elm.appendChild(table);
}
const housenum = document.createElement('select');
househead.appendChild(housenum);
for (let x = 1; x <= serverSize; x++) {
	const opt = document.createElement('option');
	opt.value = x;
	opt.innerHTML = x + '区';
	housenum.appendChild(opt);
}
const houserefresh = document.createElement('button');
houserefresh.setAttribute('class', 'btn btn-primary ms-1 p-1');
houserefresh.innerHTML = '刷新记录';
houserefresh.addEventListener('pointerdown', async function () {
	await getpost();
	alert('更新成功');
});
househead.appendChild(houserefresh);
const housenum_data = localStorage.getItem('housenum');
if (housenum_data != undefined) {
	housenum.value = housenum_data;
}
house.forEach((e, index) => {
	const id = index + 1;
	const elm = e.querySelector('.accordion-body');
	createHouse(id,elm);
	const img = document.createElement('img');
	img.loading = 'lazy';
	img.style.width = '100%';
	img.src = '/images/house/' + id + '.webp';
	elm.appendChild(img);
});
housenum.addEventListener('change', async function () {
	localStorage.setItem('housenum', this.value);
	await getpost();
});
getpost();