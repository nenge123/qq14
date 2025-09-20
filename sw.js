self.addEventListener('install',
	function (event) {
		console.log(event.type);
		return self.skipWaiting();
	}
);
self.addEventListener('activate',
	function (event) {
		return self.skipWaiting();
	}
);
self.addEventListener('fetch',function(event){
	const request = event.request;
	const url = new URL(request.url);
	const ext = url.pathname.split('.').pop();
	if (url.origin === location.origin) {
		const pathname = url.pathname.replace(location.pathname,'');
		//本域
		switch(true){
			//case /themes\//.test(url.pathname):
			case /pages\/.+\.webp$/.test(url.pathname):
				return event.respondWith(BaseResponse(request, 'qq14-themes',true));
			break;
		}
	}else{
		switch(true){
			case /unpkg\.com/.test(url.origin):{
				if(ext!='zip')return event.respondWith(BaseResponse(request, 'qq14-cdn',false));
				break;
			}
			case /cdn/.test(url.origin):{
				return event.respondWith(BaseResponse(request, 'qq14-cdn',false));
			}
		}
	}

});

async function BaseResponse(request, cachename,bool) {
	const cache = await caches.open(cachename);
	const response = await cache.match(request);
	if (response instanceof Response) {
		return response;
	}
	const newResponse = await fetch(request, { headers:bool?{'cache-control':'no-cache'}:{}}).catch(e=>undefined);
	if ((newResponse instanceof Response)&& (newResponse.status == 200 || newResponse.type=='opaque')) {
		cache.put(request, newResponse.clone());
	}else{
		console.log(newResponse,request);
	}
	return newResponse || new Response(undefined, { status: 404, statusText: 'not found' });
}