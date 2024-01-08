/**
 * 
 */
export class Mutex {
	/**
	 * @type {'locked' | 'unlocked'}
	 */
	#status;

	/**
	 * @type {null | Promise<void>}
	 */
	#promise;

	/**
	 * @type {null | function(): void}
	 */
	#resolve;

	constructor() {
		this.#status = 'unlocked';
		this.#promise = null;
		this.#resolve = null;
	}

	async lock() {
		switch (this.#status) {
			case 'locked':
				await this.#promise;

			case 'unlocked':
				this.#status = 'locked';
				// @ts-ignore
				({ promise: this.#promise, resolve: this.#resolve } = Promise.withResolvers())
				break;
		}
	}

	unlock() {
		if (this.#status === 'unlocked') throw new Error('This Mutex is not locked.');

		this.#status = 'unlocked';
		if (this.#resolve) this.#resolve();
	}

	/**
	 * 
	 * @param {function(): void | Promise<void>} content
	 */
	async scoped(content) {
		try {
			await this.lock();
			await content();
		} finally {
			this.unlock();
		}
	}
}
