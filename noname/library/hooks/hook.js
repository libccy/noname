import * as buildin from "./buildin.js"

/**
 * @template {import("./interface.js").NonameHookType} HookType
 * @template {keyof HookType} Name
 */
export class NonameHook {
	/**
	 * @type {Name}
	 */
	#name

	/**
	 * @type {HookType[Name][]}
	 */
	#methodList

	/**
	 * 
	 * @param {Name} name 
	 */
	constructor(name) {
		this.#name = name
		this.#methodList = (name in buildin) ? [...buildin[name]] : []
	}

	get name() {
		return this.#name
	}

	/**
	 * 
	 * @param {HookType[Name]} method 
	 */
	add(method) {
		return this.#methodList.add(method)
	}

	/**
	 * 
	 * @param {HookType[Name]} method 
	 */
	push(method) {
		return this.#methodList.push(method)
	}


	*[Symbol.iterator]() {
		yield* this.#methodList
	}
}
