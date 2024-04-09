export class LibInitPromises extends Uninstantable {
    /**
     * Promise版的`lib.init.js`
     *
     * @param {string} path - 文件路径
     * @param {string | string[]} [file] - 文件名或文件名组，忽略则直接读取`path`的内容
     * @returns {Promise<Event>}
     */
    static js(path: string, file?: string | string[]): Promise<Event>;
    /**
     * Promise版的`lib.init.css`
     *
     * @param {string} path - 文件路径
     * @param {string | string[]} [file] - 文件名或文件名组，忽略则直接读取`path`的内容
     * @param {Element} [before] - 新样式dom的位置
     * @param {boolean} [noerror = false] - 是否忽略报错
     * @returns {Promise<HTMLLinkElement>}
     */
    static css(path: string, file?: string | string[], before?: Element, noerror?: boolean): Promise<HTMLLinkElement>;
    /**
     * Promise版的`lib.init.req`
     *
     * @param {string} str - 要读取的地址
     * @param {string} [master]
     * @returns {Promise<ProgressEvent>}
     */
    static req(str: string, master?: string): Promise<ProgressEvent>;
    /**
     * Promise版的`lib.init.json`
     *
     * @param {string} url - 要读取的地址
     * @returns {Promise<object>}
     */
    static json(url: string): Promise<object>;
    /**
     * Promise版的`lib.init.sheet`
     *
     * @returns {Promise<HTMLStyleElement>}
     */
    static sheet(): Promise<HTMLStyleElement>;
}
import { Uninstantable } from "../../util/index.js";
