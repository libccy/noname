// TODO: 添加文件描述

import { Failure } from "./failure";

/**
 * @template T
 * @template U
 * @todo 添加类描述
 */
export class Either {
    /**
     * @callback ThenContent
     * @param {T} value
     * @returns {Either<T, U> | Failure.Failable<T, U>}
     */
    /**
     * @callback ElseContent
     * @param {Failure<U>} value
     * @returns {Either<T, U> | Failure.Failable<T, U>}
     */

    /**
     * @type {T | Failure<U>}
     */
    #value;

    /**
     * @param {T | Failure<U> | Either<T, U>} item
     */
    constructor(item) {
        if (!new.target)
            throw new TypeError('calling Either constructor without new is invalid');

        if (item instanceof Either)
            this.#value = item.value;
        else
            this.#value = item;
    }

    get value() {
        return this.#value;
    }

    /**
     *
     * @param {ThenContent} callback
     * @returns {Either<T, U>}
     */
    then(callback) {
        if (this.#value instanceof Failure)
            return this;
        return new Either(callback(this.#value));
    }

    /**
     *
     * @param {ElseContent} callback
     * @returns {Either<T, U>}
     */
    else(callback) {
        if (this.#value instanceof Failure)
            return new Either(callback(this.#value));
        return this;
    }
}
