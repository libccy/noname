const GeneratorFunction = (function* () { }).constructor;

export class Is {
	static coroutine(item) {
		return typeof item == "function" && item.name == "genCoroutine";
	}

	/**
	 * @returns {item is GeneratorFunction}
	 */
	static generatorFunc(item) {
		return item instanceof GeneratorFunction;
	}

	static generator(item) {
		return typeof item == "object" && "constructor" in item && item.constructor && "constructor" in item.constructor && item.constructor.constructor === GeneratorFunction;
	}
}
