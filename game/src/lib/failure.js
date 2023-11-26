// TODO: 添加文件描述

/**
 * @template T
 * @template U
 * @typedef {T | Failure<U>} Failure.Failable
 */

/**
 * @template T
 * @todo 添加类描述
 */
export class Failure {
    /**
     * @type {T}
     */
    #message;

    /**
     *
     * @param {T} [message]
     */
    constructor(message) {
        if (!new.target)
            throw new TypeError("calling Failure constructor without new is invalid");
        this.#message = message;
    }

    get message() {
        return this.#message;
    }
}
