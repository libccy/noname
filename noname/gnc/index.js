import { GeneratorFunction, Uninstantable } from "../util/index.js";

class Is extends Uninstantable {
	static coroutine(item) {
		return typeof item == "function" && item.name == "genCoroutine";
	}
	static generatorFunc(item) {
		return item instanceof GeneratorFunction;
	}
	static generator(item) {
		return (typeof item == "object") && ("constructor" in item) && item.constructor && ("constructor" in item.constructor) && item.constructor.constructor === GeneratorFunction;
	}
};

// gnc: GeNCoroutine
export class GNC extends Uninstantable {
	static of(fn) {
		return gnc.is.generatorFunc(fn) ? function genCoroutine() {
			let gen = fn.apply(this, arguments);
			gen.status = "next";
			gen.state = undefined;
			const callback = (resolve, reject) => {
				let result,
					nexts = resolve,
					throws = reject;
				try {
					result = gen[gen.status](gen.state);
				} catch (error) {
					reject(error);
					return;
				}
				if (!result.done) {
					nexts = (item) => {
						gen.state = item;
						gen.status = "next";
						callback(resolve, reject);
					}
					throws = (err) => {
						gen.state = err;
						gen.status = "throw";
						callback(resolve, reject);
					}
				}
				result = result.value;
				Promise.resolve(result).then(nexts, throws);
			}
			return new Promise(callback);
		} : (() => { throw new TypeError("gnc.of needs a GeneratorFunction.") })()
	}
	static is = Is;
};

export const gnc = GNC;