const GeneratorFunction = (function* () {
}).constructor;

export class GNC {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static of(fn) {
		return this.isGeneratorFunc(fn) ? function genCoroutine() {
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
	}

	static isCoroutine(item) {
		return typeof item == "function" && item.name == "genCoroutine";
	}

	/**
	 * @returns {item is GeneratorFunction}
	 */
	static isGeneratorFunc(item) {
		return item instanceof GeneratorFunction;
	}

	static isGenerator(item) {
		return typeof item == "object" && "constructor" in item && item.constructor && "constructor" in item.constructor && item.constructor.constructor === GeneratorFunction;
	}
}
