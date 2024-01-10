/**
 * 关于`Google Chrome`的异步错误处理
 * 
 * `Chrome`所用的`v8`引擎为`Error`提供了特有的报错栈堆处理函数，用于用户自定义报错栈堆的内容。
 * 
 * 我们用到了`Error.prepareStackTrace(error, structuredStackTrace)`这个函数，这个函数的信息可参考[这里](https://v8.dev/docs/stack-trace-api#customizing-stack-traces)
 * 
 * 该函数提供了结构化的栈堆信息，很幸运的是，这个结构化的栈堆能直接告诉我们报错的文件以及位置，故我们使用该函数，让异步报错能直接定位原始位置
 * 
 * @implements {PromiseErrorHandler}
 */
export class ChromePromiseErrorHandler {

	/**
	 * 用于临时记录报错信息的列表，通过`Error.prepareStackTrace`更新该列表
	 * 
	 * @type {[Error, NodeJS.CallSite[]][]}
	 */
	#errorList;

	/**
	 * @type {typeof Error.prepareStackTrace}
	 */
	#originErrorPrepareStackTrace;

	/**
	 * 初始化`Error.prepareStackTrace`，将该值赋值成我们需要的函数
	 * 
	 * 未防止本来Error.prepareStackTrace便存在赋值的行为，我们将原始值存储，并在需要的函数中调用
	 * 
	 * > 这或许就是本体扩展化的第一步（小声）
	 */
	onLoad() {
		this.#errorList = [];
		this.#originErrorPrepareStackTrace = Error.prepareStackTrace;
		Error.prepareStackTrace = (error, stackTraces) => {
			// 其实这步或许不需要
			// 但真赋值了Error.prepareStackTrace的话，保不齐会出现需要返回值的情况
			const result = this.#originErrorPrepareStackTrace
				? this.#originErrorPrepareStackTrace(error, stackTraces)
				: void 0;
			this.#errorList.push([error, stackTraces]);
			return result;
		};
	}

	/**
	 * 将原来可能的`Error.prepareStackTrace`赋值回去
	 */
	onUnload() {
		Error.prepareStackTrace = this.#originErrorPrepareStackTrace;
	}

	/**
	 * 在获取报错的时候，我们通过发生报错的`Promise`来进行捕获错误的操作
	 * 
	 * 如果捕获出来的错误存放我们存报错栈堆的列表中，则证明该错误能获取到栈堆，由此来获取报错的地址和行列号
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
					result[1][0].getScriptNameOrSourceURL(),
					result[1][0].getLineNumber() || void 0,
					result[1][0].getColumnNumber() || void 0,
					result[0]
				);
			}
		});
	}

	/**
	 * 正式报错时便不再需要报错信息了，故直接清空列表，释放内存
	 */
	onErrorPrepare() {
		this.#errorList.length = 0;
	}
}

/**
 * @typedef {import('../interface/promise-error-handler').PromiseErrorHandler} PromiseErrorHandler
 */
