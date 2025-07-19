new class {
	constructor() {
		const N = this;
		Object.defineProperty(self, 'N', { get: () => N });
		self.navigator.serviceWorker && self.navigator.serviceWorker.register('sw.js');
		$(function () {
			N.parse();
			$('#layout-main').window({
				title: '引导',
				fit: true,
				border: false,
				maximized: true,
				maximizable: false,
				closable: false,
				closed: false,
				draggable: false,
				resizable: false,
				minimized: false,
				minimizable: false,
				modal: false,
			});
			const page = localStorage.getItem('base-page');
			if (page) {
				const elm = document.querySelector('[data-page="' + page + '"]');
				if (elm instanceof HTMLElement) {
					elm.click();
				} else {
					N.getWin(page);
				}
			}
		})
	}
	/**
	 * 
	 * @param {Document} dom 
	 */
	parse(dom) {
		dom = dom || document;
		const N = this;
		Array.from(dom.querySelectorAll('[data-page]'), elm => {
			if(dom===document){
				$(elm).prop('save',true);
			}
			elm.addEventListener('click', async function () {
				const page = elm.getAttribute('data-page');
				const newelm = document.querySelector('[page-href="'+page+'"]');
				if(newelm instanceof HTMLElement){
					$(newelm).window('open');
					this.addEventListener('click',()=>$(newelm).window('open'));
				}else{
					N.getWin(page, this);
				}
			}, { once: true });
		});
	}
	getWin(page, elm) {
		const N = this;
		const request = new XMLHttpRequest;
		const href = new URL('pages/' + page, location);
		request.addEventListener('readystatechange', function () {
			if (request.readyState === request.DONE) {
				const response = request.response;
				if(request.status!=200){
					return alert('页面不存在!');
				}
				/**
				 * @type {HTMLElement}
				 */
				const newelm = response.body.firstElementChild;
				if(!newelm.classList.contains('easyui-window')){
					return alert('未能获取合法页面窗口!');
				}
				document.body.append(newelm);
				$(newelm).attr('page-href',page);
				$(newelm).window({
					fit: true,
					border: false,
					maximized: true,
					maximizable: false,
					minimized: false,
					minimizable: false,
					collapsed: false,
					collapsible: false,
					closable: true,
					closed: false,
					draggable: false,
					resizable: false,
					modal: false,
					onOpen(){
						if (elm) {
							elm.addEventListener('click', function () {
								$(newelm).window('open');
							});
							const save = $(elm).prop('save');
							if (save) {
								localStorage.setItem('base-page', elm.getAttribute('data-page'));
							}
						}
					},
					onClose(){
						const page = localStorage.getItem('base-page');
						if(page&&page==$(newelm).attr('page-href')){
							localStorage.removeItem('base-page');
						}
					}
				});
				$.parser.parse(newelm);
			}
		});
		request.open('GET', href);
		request.responseType = 'document';
		request.send(null);
	}
}