export class GNC extends Uninstantable {
    /**
     * @param {GeneratorFunction} fn
     * @returns
     */
    static of(fn: GeneratorFunction): (...args: any[]) => Promise<Generator<unknown, any, unknown>>;
    static is: typeof Is;
}
export const gnc: typeof GNC;
import { Uninstantable } from "../util/index.js";
import { GeneratorFunction } from "../util/index.js";
import { Is } from "./is.js";
