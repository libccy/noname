/**
 * **无名杀频道推送机制**
 * 
 * 鉴于`Javascript`的特性及自身对所需功能的思考，这是一个参考`Golang`的`channel`设计的、完全和`go channel`不一样的异步消息传递对象
 * 
 * 当且仅当接收方和发送方均存在时进行消息传递，完全保证信息传递的单一性（发送方/接收方一旦确定则无法更改）和准确性（发送方必然将消息发送给接收方）
 * 
 * 若存在发送方/接收方时调用`send`/`receive`，将报错
 * 
 * 若需要异步/不报错发送信息，请等待`lib.actor`
 * 
 * @template T
 * @example
 * // 创建一个频道
 * const channel = new lib.channel();
 * 
 * // 从某个角落接收channel发出的消息，若无消息则等待
 * const message = await channel.receive();
 * 
 * // 从某个角落向channel发消息，若无消息接收则等待
 * await channel.send(item);
 */
export class Channel {
	constructor() {
		/**
		 * @type {"active" | "receiving" | "sending"}
		 */
		this.status = "active";

		/**
		 * @type {import("./promise-resolve").PromiseResolve<T> | [T, import("./promise-resolve").PromiseResolve<void>] | null}
		 */
		this._buffer = null;
	}

	/**
	 * 向该频道发送消息，在消息未被接受前将等待
	 * 
	 * @param {T} value - 要发送的消息
	 * @returns {Promise<void>}
	 */
	send(value) {
		return new Promise((resolve, reject) => {
			switch (this.status) {
				case "sending":
					// TODO: handle the error.
					reject(new Error());
					break;
				case "receiving": {
					/**
					 * @type {import("./promise-resolve").PromiseResolve<T>}
					 */
					const buffer = this._buffer;
					this._buffer = null;
					buffer(value);
					this.status = "active";
					resolve();
					break;
				}
				case "active":
					this.status = "sending";
					this._buffer = [value, resolve];
					break;
			}
		});
	}

	/**
	 * 接收频道所发送的消息，若无消息发送则等待
	 * 
	 * @returns {Promise<T>} 接收到的消息
	 */
	receive() {
		return new Promise((resolve, reject) => {
			switch (this.status) {
				case "receiving":
					// TODO: handle the error.
					reject(new Error());
					break;
				case "sending": {
					/**
					 * @type {[T, import("./promise-resolve").PromiseResolve<void>]}
					 */
					const buffer = this._buffer;
					this._buffer = null;
					resolve(buffer[0]);
					this.status = "active";
					buffer[1]();
					break;
				}
				case "active":
					this.status = "receiving";
					this._buffer = resolve;
					break;
			}
		});
	}
}
