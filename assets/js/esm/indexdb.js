class IDBStore{
	dataName = 'qq14';
	tableList = ['soft','data','files','other'];
	constructor(name){
		this.name = name||'data';
	}
	/**
	 * @returns {Promise<IDBDatabase>}
	 */
	async open(){
		if(!this.db){
			this.db = this._open();
		}
		return await this.db;
	}
	/**
	 * 
	 * @param {IDBOpenDBRequest||null} database 
	 * @returns {Promise<IDBDatabase>}
	 */
	async _open(database){
		const D = this;
		const {dataName,tableList} = D;
		database = database||indexedDB.open(dataName);
		return new Promise(res=>{
			database.addEventListener('success',async function(e){
				const db = e.target.result;
				const tables = Array.from(db.objectStoreNames);
				if(tableList.filter(v=>!tables.includes(v)).length){
					const version = db.version;
					db.close();
					return res(await D._open(indexedDB.open(dataName,version+1)));
				}
				res(db);
			});
			database.addEventListener('upgradeneeded',function(e){
				const db = e.target.result;
				for(let name of tableList){
					if(!db.objectStoreNames.contains(name)){
						const store = db.createObjectStore(name);
						store.createIndex('timestamp','timestamp',{ "unique": false });
					}
				}
			});
		});
	}
	/**
	 * 
	 * @param {boolean} bool 
	 * @param {string|null} name 
	 * @returns {Promise<IDBObjectStore>}
	 */
	async transaction(bool,name){
		name = name || this.name;
		const db = await this.open();
        const transaction = db.transaction([name],bool?'readwrite':'readonly');
		return transaction.objectStore(name);
	}
	/**
	 * 
	 * @param {IDBRequest} obj 
	 * @returns {any}
	 */
	async __success(obj,fn){
		return new Promise(res=>obj.addEventListener('success',fn instanceof Function?e=>fn(e,res):function(e){res(e.target.result)},fn?undefined:{once:true}));
	}
	async getItem(name,storeName){
        const store =  await this.transaction(false,storeName);
		return this.__success(store.get(name));
	}
	async setItem(name,data,storeName){
        const store =  await this.transaction(true,storeName);
		return this.__success(store.put(data,name));
	}
	/**
	 * 
	 * @param {String} storeName 
	 * @returns {Array}
	 */
	async keys(storeName){
        const store =  await this.transaction(false,storeName);
		return this.__success(store.getAllKeys());
	}
	/**
	 * 
	 * @param {*} storeName 
	 * @returns {Map}
	 */
	async indexKeys(storeName){
        const store =  await this.transaction(false,storeName);
		const myIndex = store.index("timestamp");
		const data = new Map;
		await this.__success(myIndex.openKeyCursor(),function(event,res){
			const cursor = event.target.result;
			if(cursor){
				console.log(cursor);
				data.set(cursor.primaryKey,cursor.key);
				cursor.continue();
			}else{
				res(true);
			}
		});
		return data;
	}
	async getContents(name,storeName){
		const data = await this.getItem(name,storeName);
		if(data&&data.contents){
			return data.contents;
		}
		return undefined;
	}
	async setContents(name,data,storeName){
		return await this.setItem(name,{contents:data,timestamp:new Date},storeName);
	}
	async fetchFile(url){
		const file = await this.getContents(url,'files');
		if(file instanceof Blob){
			return file;
		}
		const blob = await this.fetchBlob(url);
		await this.setContents(url,blob);
		return blob;
	}
	async fetchBlob(url){
		const res = await fetch(url);
		const type = (res.headers.get('content-type')||'application/binary').split(';').shift().trim();
		return new File(
			[await res.blob()],
			url.split('/').pop().replace(/[\?\#].+$/,''),
			{type}
		);
	}
	async importFile(url){
		const file = this.fetchFile(url);
		return import(URL.createObjectURL(file));
	}
	async readZip(url){
		if(!self.zip){
			await import('https://unpkg.com/@zip.js/zip.js@latest/dist/zip.min.js');
		}
		const zip = self.zip;
        const reader = await new zip.ZipReader(new zip.BlobReader(await this.fetchBlob(url)));
		return await reader.getEntries();

	}
	async fetchZip(url,callback){
		const reader = await this.readZip(url);
		const zip = self.zip;
        const result = new Map();
        for (let entry of reader) {
			let data = await entry.getData(new zip.Uint8ArrayWriter());
			if(callback instanceof Function){
				data = callback(data,entry.filename);
			}
			result.set(entry.filename,data);
		}
		return result;
	}
	async getZip(url){
		const file = await this.getContents(url,'soft');
		if(file instanceof Map){
			return file;
		}
		let files = await this.fetchZip(url);
		await this.setContents(url,files,'soft');
		return files;
	}
}
const MyStore = new IDBStore;
Object.defineProperties(self,{
	IDBStore:{
		get:()=>IDBStore,
	},
	MyStore:{
		get:()=>MyStore,
	}
});
export {IDBStore,MyStore};