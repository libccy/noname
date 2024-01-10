
/**
 * @typedef {import('../interface/error-handler').ErrorHandler} ErrorHandler
 */

/**
 * @implements {ErrorHandler}
 */
export class UnknownErrorHandler {
	/**
	 * 
	 * @param {PromiseRejectionEvent} event 
	 */
	onHandle(event) {
		event.promise.catch((error) => {
			if (typeof error === 'object' && error instanceof Error) {
				// 非chrome和firefox就自生自灭吧
				// Safari也是，反正没办法解决问题就解决提问的人
				throw error;
			}
		});
	}
}
