export class GamePromises extends Uninstantable {
    /**
     * 模仿h5的prompt，用于显示可提示用户进行输入的对话框
     *
     * 注: 由于参数列表是随意的，在这里我准备限制一下这个函数的参数顺序
     *
     * @type {{
     *  (title: string): Promise<string | false>;
     *	(title: string, forced: true): Promise<string>;
     *	(alertOption: 'alert', title: string): Promise<true>;
     * }}
     *
     * @param { string } [title] 设置prompt标题与input内容
     * @param { boolean } [forced] 为true的话将没有"取消按钮"
     * @param { string } alertOption 设置prompt是否模拟alert
     * @example
     * ```js
     * // 只设置标题(但是input的初始值就变成了undefined)
     * game.promises.prompt('###prompt标题').then(value => console.log(value));
     * // 设置标题和input初始内容
     * game.promises.prompt('###prompt标题###input初始内容').then(value => console.log(value));
     * ```
     * @returns { Promise<string> }
     */
    static prompt(alertOption: string, title?: string, forced?: boolean): Promise<string>;
    /**
     * 模仿h5的alert，用于显示信息的对话框
     *
     * @param { string } title
     * @example
     * ```js
     * await game.promises.alert('弹窗内容');
     * ```
     * @returns { Promise<true> }
     */
    static alert(title: string): Promise<true>;
    static download(url: any, folder: any, dev: any, onprogress: any): Promise<any>;
    static readFile(filename: any): Promise<any>;
    static readFileAsText(filename: any): Promise<any>;
    static writeFile(data: any, path: any, name: any): Promise<any>;
    static ensureDirectory(list: any, callback: any, file: any): Promise<any>;
    static createDir(directory: any): Promise<any>;
    static removeFile(filename: any): Promise<void>;
    static removeDir(directory: any): Promise<void>;
}
import { Uninstantable } from "../util/index.js";
