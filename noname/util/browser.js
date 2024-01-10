import { ErrorHandler } from './struct/index.js';

/**
 * @typedef {import('./struct/interface/error-handler').ErrorHandler} ErrorHandler
 */

/**
 * @type {Record<"firefox" | "chrome" | "safari" | "other", new () => ErrorHandler>}
 */
export const errorHandlerMap = {
	'chrome': ErrorHandler.ChromeErrorHandler,
	'firefox': ErrorHandler.FirefoxErrorHandler,
	'safari': ErrorHandler.UnknownErrorHandler,
	'other': ErrorHandler.UnknownErrorHandler
};
