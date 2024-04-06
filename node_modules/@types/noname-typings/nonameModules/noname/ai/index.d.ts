export class AI extends Uninstantable {
    static basic: typeof Basic;
    static get: typeof get;
}
export const ai: typeof AI;
export { Basic };
import { Uninstantable } from "../util/index.js";
import { Basic } from './basic.js';
import { Get as get } from '../get/index.js';
