export class LibInit extends Uninstantable {
    /**
     * 部分函数的Promise版本
     */
    static promises: typeof LibInitPromises;
    static init(): void;
    static reset(): void;
    static onload(): Promise<void>;
    static startOnline(): void;
    static onfree(): void;
    static connection(ws: any): void;
    static sheet(...args: any[]): HTMLStyleElement;
    static css(path: any, file: any, before: any): HTMLLinkElement;
    static jsForExtension(path: any, file: any, onLoad: any, onError: any): void;
    static js(path: any, file: any, onLoad: any, onError: any): HTMLScriptElement;
    /**
     * 同步lib.init.js
     * @returns { void }
     */
    static jsSync(path: any, file: any, onLoad: any, onError: any): void;
    static req(str: any, onload: any, onerror: any, master: any): void;
    /**
     * 同步lib.init.req
     */
    static reqSync(str: any, onload: any, onerror: any, master: any): string;
    static json(url: any, onload: any, onerror: any): void;
    /**
     * 同步lib.init.json
     */
    static jsonSync(url: any, onload: any, onerror: any): void;
    static cssstyles(): void;
    static layout(layout: any, nosave: any): void;
    static background(): void;
    /**
     *
     * @param {*} item
     * @param {Function} [scope] 作用域
     * @returns
     */
    static parsex(item: any, scope?: Function): any;
    static eval(func: any): any;
    static encode(strUni: any): string;
    static decode(str: any): string;
    static stringify(obj: any): string;
    static stringifySkill(obj: any): string;
    /**
     * 在返回当前加载的esm模块相对位置。
     * @param {*} url 传入import.meta.url
     */
    static getCurrentFileLocation(url: any): string;
}
import { Uninstantable } from "../../util/index.js";
import { LibInitPromises } from "./promises.js";
