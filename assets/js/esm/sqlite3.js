import {MyStore,IDBStore} from './indexdb.js';
const file = await MyStore.getZip("https://unpkg.com/sql.js@1.13.0/dist/sqljs-wasm.zip");
const {initSqlJs,initSqlJsPromise} = await import(
    URL.createObjectURL(
        new Blob([
            file.get('sql-wasm.js'),
            ';;var module;export {initSqlJsPromise,initSqlJs};'
        ],{type:'text/javascript'})
    )
);
const BaseSQLite = await initSqlJs({wasmBinary:file.get('sql-wasm.wasm')});
delete BaseSQLite.wasmBinary;
BaseSQLite._free();
async function creatSQLite3(sqliteName,url){
    let autoSave = true;
    let buffer = await MyStore.getContents('sqlite-'+sqliteName,'data')||undefined;
    if(!buffer){
        autoSave = false;
        if(url){
            const rp = await fetch(url).catch(e=>undefined);
            if(rp instanceof Response){
                buffer = new Uint8Array(await (await fetch(url)).arrayBuffer());   
            }
        }
    }
    return new SQLite3(sqliteName,buffer,autoSave);
}
class SQLite3 extends BaseSQLite.Database {
    constructor(sqliteName,sqliteData,autoSave) {
        super(sqliteData||undefined);
        this.sqliteName = sqliteName || 'mysqlite';
        if(!autoSave&&sqliteData){
            this.exportSave();
        }
    }
    All(sql, params, limit) {
        return this.fetchAll(sql,params,limit);
    }
    One(sql, params) {
        return this.fetch(sql,params);
    }
    fetchAll(sql,params,limit){
        let result = this.exec(sql, params);
        if (result[0]) {
            let data = [];
            let index = 0;
            for (let value of result[0].values) {
                data.push(Object.fromEntries(value.map((v, k) => [result[0].columns[k], v])));
                index+=1;
                if (limit===index) break;
            }
            if(limit==1) return data[0];
            return data;
        }
    }
    fetch(sql,params){
        return this.fetchAll(sql, params, 1);
    }
    fetchColumn(sql,params,index){
        let result = Object.values(this.fetch(sql, params) || []);
        if (result.length) {
            return result[index || 0];
        }
    }
    resultFirst(sql, params) {
        return this.fetchColumn(sql, params, 0);
    }
    str_select(table,column){
        column = column?column:'*';
        if(column instanceof Array)column = this.str_qoute(column);
        return 'SELECT '+column+' FROM `'+table+'` ';
    }
    str_where(keys) {
        return keys.length ? ' WHERE ' +this.str_set(keys,' AND '): '';
    }
    str_param(keys){
        return keys.length?this.str_set(keys,' , '):'';
    }
    str_qoute(keys){
        if(keys instanceof Array){
            return Array.from(keys,key=>this.str_qoute(key)).join(' , ');
        }
        return '`'+keys+'`';
    }
    str_set(keys,sp){
        if(keys instanceof Array&&keys.length){
            return Array.from(keys,key=>this.str_set(key)).join(sp||' , ');
        }else if(typeof keys === 'string'){
            return this.str_qoute(keys)+' = ? ';
        }
        return '';
    }
    str_var(size){
        return Array.from(''.padEnd(size,'?')).join(',');
    }
    str_insert(table){
        return 'INSERT INTO '+this.str_qoute(table)+' ';
    }
    str_delete(table){
        return 'DELETE FROM '+this.str_qoute(table)+' ';
    }
    str_update(table){
        return 'UPDATE '+this.str_qoute(table)+' SET ';
    }
    selectAll(table, where,limit,column) {
        const keys = where&&Object.keys(where)||[];
        const values = where&&Object.values(where)||[];
        return this.fetchAll(this.str_select(table,column)+ this.str_where(keys),values,limit);
    }
    selectOne(table, where,column) {
        return this.selectAll(table,where,1,column);
    }
    selectCount(table, where) {
        const result = this.selectOne(table,where,'count(*)');
        return result ? Object.values(result)[0]:0;
    }
    selectSQL(table,sql,param,column){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.fetchAll(this.str_select(table,column)+sql,param);
    }
    fetchSQL(table,sql,param,column){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.fetch(this.str_select(table,column)+sql,param);
    }
    selectColumnSQL(table,sql,param,column,index){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.fetchColumn(this.str_select(table,column)+sql,param,index);
    }
    selectCountSQL(table,sql,param){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.fetchColumn(this.str_select(table,'count(*)')+sql,param);
    }
    deleteSQL(table,sql,param){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.exec(this.str_delete(table)+sql,param);
    }
    insertSQL(table,sql,param){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.exec(this.str_insert(table)+sql,param);
    }
    updateSQL(table,sql,param){
        sql = sql?sql:'';
        param = param instanceof Array?param:[];
        return this.exec(this.str_update(table)+sql,param);
    }
    delete(table, where) {
        const keys = where&&Object.keys(where);
        const values = where&&Object.values(where)||[];
        this.exec(this.str_delete(table) + this.str_where(keys) + ';',values);
    }
    updateJson(table, data, where) {
        const keys = where&&Object.keys(where);
        const values = where&&Object.values(where)||[];
        const param = Object.values(data);
        if(values.length)param.push(...values);
        return this.exec(this.str_update(table)+this.str_param(Object.keys(data)) + this.str_where(keys) + ' ;', param);
    }
    insertJson(table, data, where) {
        if(where)this.delete(table,where);
        const param = Object.values(data);
        return this.exec(this.str_insert(table)+' ( '+this.str_qoute(Object.keys(data))+' ) VALUES ( ' + this.str_var(param.length)+ ' ) ',param);
    }
    createTable(table,list) {
        let keys = typeof list === 'string' ? list : Array.from(Object.entries(list), s => '`' + s[0] + '` ' + s[1]).join(',');
        return this.exec(`CREATE TABLE IF NOT EXISTS \`${table}\` (${keys});`);
    }
    resultTable() {
        let result = this.exec(this.str_select('sqlite_master','`name`')+this.str_where(['type']), ['table']);
        if (result[0]) {
            return Array.from(result[0].values, e => e[0]);
        }
    }
    resultSql() {
        let result = this.exec(this.str_select('sqlite_master',['name','sql'])+this.str_where(['type']), ['table']);
        if (result[0]) {
            return Object.fromEntries(result[0].values)
        }
    }
    exportSave(){
        if(this.url) return this.exportCache();
        return MyStore.setContents('sqlite-'+this.sqliteName,new Uint8Array(this.export()));
    }
    async exportCache(){
        const cacheStore = await caches.open('data-cache');
        const blob = new Blob([new Uint8Array(this.export())],{type:'application/binary+sqlite3'});
        return cacheStore.put(this.url,
            new Response(blob,{
                status: 200, 
                statusText: 'ok',
                headers:{
                    'content-length':blob.size,
                    'content-type':blob.type
                }
            })
        );
    }
};
SQLite3.create = creatSQLite3;
SQLite3.createCache = async function (sqliteName,url){
    const cacheStore = await caches.open('data-cache');
    let response = cacheStore.match(url);
	if (!response instanceof Response) {
        response = await fetch(url);
        await cacheStore.put(url,response.clone());
	}
    const _SQLite3 = new _SQLite3(sqliteName,new Uint8Array(await response.arrayBuffer()),true);
    _SQLite3.url = url;
    return _SQLite3;
}
export {
    SQLite3,
    creatSQLite3,
    BaseSQLite
};