
/**
 * @typedef {import('../interface/error-handler').ErrorHandler} ErrorHandler
 */

/**
 * @implements {ErrorHandler}
 */
export class FirefoxErrorHandler {
	/**
	 * 
	 * @param {PromiseRejectionEvent} event 
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			if (typeof error === 'object' && error instanceof Error) {
				// Firefox在大环境下默认情况必须要那么多ts-ignore
				// @ts-ignore
				window.onerror(
					error.message,
					// @ts-ignore
					error.fileName,
					// @ts-ignore
					error.lineNumber,
					// @ts-ignore
					error.columnNumber,
					error
				);
			}
		});
	}
}
