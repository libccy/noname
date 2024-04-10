export class Is extends Uninstantable {
    /**
     * @param {*} item
     * @returns {boolean}
     */
    static coroutine(item: any): boolean;
    /**
     * @param {*} item
     * @returns {boolean}
     */
    static generatorFunc(item: any): boolean;
    /**
     * @param {*} item
     * @returns {boolean}
     */
    static generator(item: any): boolean;
}
import { Uninstantable } from "../util/index.js";
