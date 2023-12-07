import { Is } from "./gnc/is.js";

export const gnc = {
	of(fn) {
		return Is.generatorFunc(fn) ? function genCoroutine() {
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
		} : (() => { throw new TypeError("gnc.of needs a GeneratorFunction.") })();
	},
	is: Is
};
