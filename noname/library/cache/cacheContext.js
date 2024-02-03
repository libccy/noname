import { Library } from "../index.js";
import { Game } from "../../game/index.js";
import { Get } from "../../get/index.js";
import { status as _status } from "../../status/index.js";
import { hex_md5 } from "../crypt/md5.js";
/**
 * 缓存上下文，用于在各种方法中暂时缓存值，以第一次获取的缓存值为准。
 */
export class CacheContext{
    
    constructor(){
        this.lib = this.createCacheProxy(Library);
        this.game = this.createCacheProxy(Game);
        this.get = this.createCacheProxy(Get);
        this.sourceMap = new Map();
        this.storageMap = new Map();
    }

    static setInCacheEnvironment(cache){
        _status.cacheEnvironment = cache;
    }

    static setCacheContext(context){
        _status.cacheContext = context;
    }

    static getCacheContext(){
        return _status.cacheContext;
    }

    static removeCacheContext(){
        delete _status.cacheContext;
    }

    static requireCacheContext(){
        let cache = CacheContext.getCacheContext();
        if(!cache){
            return new CacheContext();
        }
        return cache;
    }

    delegate(source){
        if(source === null || source === undefined)return source;
        if(source._cacheDelegateSource)return source;
        let proxy = this.sourceMap.get(source);
        if(proxy){
            return proxy;
        }
        proxy = this.createCacheProxy(source);
        this.sourceMap.set(source,proxy);
        return proxy;
    }

    static inject(source,methods){
        if(source == null || source === undefined)return null;
        for(let method of methods){
            let func = source[method];
            if(typeof func != 'function')continue;
            source[method] = function(){
                try{
                    if(!_status.cacheEnvironment){
                        return func.call(this,...arguments);
                    }
                    return CacheContext
                    .getCacheValueFromObject(CacheContext.requireCacheContext().requireStorage(this),method,arguments,this,func);
                }catch(e){
                    return func.call(this,...arguments);
                }
            }
        }
    }

    requireStorage(obj){
        let storage = this.storageMap.get(obj);
        if(!storage){
            storage = {};
            this.storageMap.set(obj,storage);
        }
        return storage;
    }

    /**
     * @template T
     * @param {T} delegateObject 
     * @returns {T}
     */
    createCacheProxy(delegateObject){
        const cacheFuncObj = {};
        const cacheStorage = {};
        return new Proxy(delegateObject,{
            get:(target,key)=>{
                if(key == '_cacheDelegateSource')return delegateObject;
                let value = target[key];
                if(key.indexOf('cache') == 0){
                    return value;
                }
                if(typeof target.cacheSupportFunction == 'function'){
                    if(!target.cacheSupportFunction().includes(key)){
                        return value;
                    }
                }
                if(typeof value == 'function'){
                    let wrapFunc = cacheFuncObj[key];
                    if(typeof wrapFunc != 'function'){
                        wrapFunc = function(){
                            try{
                                return CacheContext
                                .getCacheValueFromObject(cacheStorage,key,arguments,target);
                            }catch(e){
                                return value.call(target,...arguments);
                            }
                        };
                        cacheFuncObj[key] = wrapFunc;
                    }
                    return wrapFunc;
                }
                return value;
            }
        });
    }

    static getCacheValueFromObject(storage,key,params,source,func){
        let cache = storage;
        let funcCache = CacheContext.ensureMember(cache,key);
        let cacheKey = CacheContext.wrapParametersToCacheKey(params);
        let ret = funcCache[cacheKey];
        if(ret === undefined){
            ret = ((typeof func == 'function')?func:source[key]).call(source,...params);
            funcCache[cacheKey] = ret;
            //console.log('缓存未命中!'+key+":"+cacheKey+":"+params.length+":ret:"+ret);
        }else{
            //console.log(key+":"+cacheKey+":"+params.length+":ret:"+ret);
        }
        return ret;
    }

    static ensureMember(obj,key){
        let mem = obj[key];
        if(!mem){
            mem = {};
            obj[key] = mem;
        }
        return mem;
    }

    static wrapParametersToCacheKey(params){
        return Array.from(params)
        .filter(p=>!(p instanceof CacheContext))
        .map(param=>CacheContext.wrapParameterToCacheKey(param))
        .join('-');
    }

    static wrapParameterToCacheKey(param){
        if(param === null)return 'null';
        if(param === undefined)return 'undefined';
        if(typeof param === 'string')return `[str:${param}]`;
        if(typeof param === 'number')return `[d:${param}]`;
        if(typeof param === 'boolean')return `[bl:${param}]`;
        if(typeof param.getCacheKey == 'function')return param.getCacheKey();
        if(Array.isArray(param)){
            return `[arr:[${param.filter(p=>!(p instanceof CacheContext)).map(p=>CacheContext.wrapParameterToCacheKey(p)).join('-')}]]`;
        }
        if(typeof param === 'function')return `[f:${hex_md5(param.toString())}]`;
        let entries = Object.entries(param);
        entries.sort((a,b)=>a[0]<b[0]?-1:1);
        return `[obj:{${entries.map(e=>e[0]+":"+CacheContext.wrapParameterToCacheKey(e[1])).join(',')}}]`;
    }
}