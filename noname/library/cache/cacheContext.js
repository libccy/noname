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
        this.sourceMap = {};
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
        if(source === null || source === undefined)return null;
        if(typeof source.getCacheKey !== 'function')return source;
        let cacheKey = source.getCacheKey();
        if(this.sourceMap[cacheKey]){
            return this.sourceMap[cacheKey];
        }
        this.sourceMap[cacheKey] = this.createCacheProxy(source);
        return this.sourceMap[cacheKey];
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
                                return value.apply(target,arguments);
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

    static getCacheValueFromObject(storage,key,params,source){
        let cache = storage;
        let funcCache = CacheContext.ensureMember(cache,key);
        let cacheKey = CacheContext.wrapParametersToCacheKey(params);
        let ret = funcCache[cacheKey];
        if(ret === undefined){
            ret = source[key](...params);
            funcCache[cacheKey] = ret;
        }
        //console.log(key+":"+cacheKey+":"+params.length+":ret:"+ret);
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