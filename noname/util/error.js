class CodeSnippet {
	/** @type {Array<CodeSnippet>} */
	static #snippetStack = [];

	/** @type {string} */
	#code;
	/** @type {number} */
	#erroff;

	/**
	 * ```plain
	 * 构造一个代码片段对象
	 * 
	 * 通过 `erroff` 指定在发生错误时，错误信息指出的行与实际代码行的偏移量
	 * ```
	 * @param {string} code 
	 * @param {number} erroff 
	 */
	constructor(code, erroff = 0) {
		this.#code = String(code);
		this.#erroff = parseInt(String(erroff)) || 0;
	}

	/** @type {string} */
	get code() {
		return this.#code;
	}

	/** @type {Array<string>} */
	get lines() {
		return this.code.split(/\r?\n/);
	}

	/**
	 * ```plain
	 * 给定错误行号来获取错误代码片段
	 * ```
	 * 
	 * @param {number} lineno 
	 * @returns {string} 
	 */
	viewCode(lineno) {
		if (!Number.isInteger(lineno))
			throw new TypeError("错误行号必须是一个整数");

		const index = lineno - this.#erroff;
		const lines = this.lines;
		const width = String(index + 4).length;

		let codeView = "";

		for (let i = index - 4; i < index + 5; i++) {
			if (i < 0 || i >= lines.length)
				continue;

			codeView += String(i + 1).padStart(width, "0");
			codeView += `|${i == index ? "⚠️" : "    "}${lines[i]}\n`;
		}

		return codeView;
	}

	/**
	 * ```plain
	 * 获取当前代码片段
	 * ```
	 * 
	 * @type {CodeSnippet}
	 */
	static get currentSnippet() {
		if (!this.#snippetStack.length)
			throw new Error("代码片段栈为空");

		return this.#snippetStack[this.#snippetStack.length - 1];
	}

	/**
	 * ```plain
	 * 压入一个代码片段作为当前代码片段
	 * ```
	 * 
	 * @param {CodeSnippet} snippet 
	 */
	static pushSnippet(snippet) {
		if (!(snippet instanceof CodeSnippet))
			throw new TypeError("参数必须是一个代码片段对象");

		this.#snippetStack.push(snippet);
	}

	/**
	 * ```plain
	 * 弹出当前代码片段
	 * ```
	 * 
	 * @returns {CodeSnippet} 
	 */
	static popSnippet() {
		if (!this.#snippetStack.length)
			throw new Error("代码片段栈为空");

		// @ts-ignore // eslint好不智能哦
		return this.#snippetStack.pop();
	}
}

class ErrorReporter {
	static #topAlert = window.alert.bind(null);
	static #errorLineNoPatterns = [
		/<anonymous>:(\d+):\d+\)/,
		/at <anonymous>:(\d+):\d+/,
		/eval:(\d+):\d+/,
		/Function:(\d+):\d+/,
		/:(\d+):\d+/,
	];

	/** @type {CodeSnippet} */
	#snippet;
	/** @type {string} */
	#message;
	/** @type {string} */
	#stack;

	/**
	 * ```plain
	 * 构造一个错误报告对象
	 * 以此来保存错误相关信息
	 * ```
	 * 
	 * @param {Error} error 
	 * @param {CodeSnippet} snippet 
	 */
	constructor(error, snippet = CodeSnippet.currentSnippet) {
		if (!("stack" in error))
			throw new TypeError("传入的对象不是一个错误对象");

		this.#snippet = snippet;
		this.#message = String(error);
		this.#stack = String(error.stack);
	}

	get message() {
		return this.#message;
	}

	get stack() {
		return this.#stack;
	}

	static #findLineNo = function (line) {
		for (const pattern of ErrorReporter.#errorLineNoPatterns) {
			const match = pattern.exec(line);

			if (match)
				return parseInt(match[1]);
		}

		return NaN;
	}

	viewCode() {
		const stack = this.#stack;
		const line = stack.split("\n")[1];
		const lineno = ErrorReporter.#findLineNo(line);

		if (!isNaN(lineno))
			return this.#snippet.viewCode(lineno);

		return null;
	}

	/**
	 * ```plain
	 * 向用户报告错误信息
	 * ```
	 * 
	 * @param {string} title 
	 * @returns {string} 
	 */
	report(title) {
		const codeView = this.viewCode() || "#没有代码预览#";
		let errorInfo = `${title}:\n\t${this.#message}\n`;
		errorInfo += `----------\n${codeView.trim()}\n`;
		errorInfo += `----------\n调用堆栈:\n${this.#stack}`;
		ErrorReporter.#topAlert(errorInfo);
		return errorInfo;
	}

	/**
	 * ```plain
	 * 向用户报告错误信息
	 * ```
	 * 
	 * @param {Error} error 
	 * @param {string} title 
	 */
	static reportError(error, title = "发生错误") {
		new ErrorReporter(error).report(title);
	}
}

class ErrorManager {
	/** @type {WeakMap<Object, ErrorReporter>} */
	static #errorReporters = new WeakMap();

	/**
	 * ```plain
	 * 设置错误报告器
	 * 
	 * 在报告错误时可以从此处获取错误报告器来直接报告错误
	 * ```
	 * 
	 * @param {Object} obj 
	 * @param {ErrorReporter?} reporter 
	 */
	static setErrorReporter(obj, reporter = null) {
		if (obj !== Object(obj))
			throw new TypeError("参数必须是一个对象");
		if (!(reporter instanceof ErrorReporter))
			reporter = new ErrorReporter(obj);

		ErrorManager.#errorReporters.set(obj, reporter);
	}

	/**
	 * ```plain
	 * 获取设置的错误报告器
	 * ```
	 * 
	 * @param {Object} obj 
	 * @returns {ErrorReporter?}
	 */
	static getErrorReporter(obj) {
		return ErrorManager.#errorReporters.get(obj) || null;
	}
}

export {
	CodeSnippet,
	ErrorReporter,
	ErrorManager,
};