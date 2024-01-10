
/**
 * @typedef {import('../interface/error-handler').ErrorHandler} ErrorHandler
 */

/**
 * @implements {ErrorHandler}
 */
export class ChromeErrorHandler {
	#errorList;

	constructor() {
		this.#errorList = [];
	}

	onLoad() {
		Error.prepareStackTrace = (error, stackTraces) => {
			this.#errorList.push([error, stackTraces]);
		};
	}

	/**
	 * 
	 * @param {PromiseRejectionEvent} event 
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			const result = this.#errorList.find(savedError => savedError[0] === error);
			if (result) {
				// @ts-ignore
				window.onerror(
					result[0].message,
					result[1][0].getScriptNameOrSourceURL() || void 0,
					result[1][0].getLineNumber() || void 0,
					result[1][0].getColumnNumber() || void 0,
					result[0]
				);
			}
		});
	}

	onErrorPrepare() {
		this.#errorList.length = 0;
	}
}
