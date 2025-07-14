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
			case /themes\//.test(url.pathname):
			case /pages\/.+\.webp$/.test(url.pathname):
				return event.respondWith(BaseResponse(request, 'qq14-themes'));
			break;
		}
	}else{

	}

});

async function BaseResponse(request, cachename) {
	const cache = await caches.open(cachename);
	const response = await cache.match(request);
	if (response instanceof Response) {
		return response;
	}
	const newResponse = await fetch(request, { headers:{'cache-control':'no-cache'}});
	if ((newResponse instanceof Response)&& newResponse.status == 200) {
		cache.put(request, newResponse.clone());
	}
	return newResponse || new Response(undefined, { status: 404, statusText: 'not found' });
}