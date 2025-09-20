new class {
	constructor() {
		const N = this;
		window.addEventListener('error',function(e){
			alert(e.message);
		});
		Object.defineProperty(self, 'N', { get: () => N });
		self.navigator.serviceWorker && self.navigator.serviceWorker.register('sw.js',
			{
				scope: "/",
				type:'module',
				updateViaCache:'none'
			  }
		);
		$(function () {
			N.parse();
			const page = localStorage.getItem('base-page');
			if (page) {
				const elm = document.querySelector('[data-page="' + page + '"]');
				if (elm instanceof HTMLElement) {
					elm.click();
				} else {
					N.getWin(page);
				}
			}
		});

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
		Array.from(dom.querySelectorAll('[data-app]'), async elm => {
			const js = elm.getAttribute('data-app');
			elm.removeAttribute('data-app');
			const {default:Module} = await import(js);
			new Module(elm,dom);
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
				$(newelm).attr('page-href',page);
				if(newelm.hasAttribute('uk-modal')){
					return  N.UIKIT_Modal(newelm,elm);
				}
				if(newelm.classList.contains('modal')){
					return  N.showModal(newelm,elm);
				}
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
						$(newelm).trigger('window.open');
					},
					onClose(){
						const page = localStorage.getItem('base-page');
						if(page&&page==$(newelm).attr('page-href')){
							localStorage.removeItem('base-page');
						}
						$(newelm).trigger('window.close');
					}
				});
				$.parser.parse(newelm);
				N.parse(newelm);
			}
		});
		request.open('GET', href);
		request.responseType = 'document';
		request.send(null);
	}
	showModal(newelm,elm){
		document.body.appendChild(newelm);
		localStorage.setItem('base-page', elm.getAttribute('data-page'));
		jQuery(newelm).modal('show').on('hide.bs.modal', function () {
			const page = localStorage.getItem('base-page');
			if(page&&page==$(newelm).attr('page-href')){
				localStorage.removeItem('base-page');
			}
			$(newelm).trigger('window.close');
		});
		elm.addEventListener('click', function () {
			jQuery(newelm).modal('show');
		});
		this.parse(newelm);
	}
	UIKIT_Modal(newelm,elm){
		document.body.appendChild(newelm);
		UIkit.util.on(newelm, 'show', function () {
			localStorage.setItem('base-page', elm.getAttribute('data-page'));
		});
		UIkit.util.on(newelm, 'hide', function () {
			const page = localStorage.getItem('base-page');
			if(page&&page==$(newelm).attr('page-href')){
				localStorage.removeItem('base-page');
			}
		});
		UIkit.modal(newelm).show();
		this.parse(newelm);

	}
}