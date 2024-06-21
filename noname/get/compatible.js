import { userAgent } from "../util/index.js";

/**
 * 用于老版本能用的`get`
 */
export class GetCompatible {
	// require是需求的版本号，current是浏览器环境本身的版本号
	/**
	 *
	 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} require
	 * @param {[majorVersion: number, minorVersion: number, patchVersion: number]} current
	 * @returns
	 */
	checkVersion(require, current) {
		// 防止不存在的意外，提前截断当前版本号的长度
		if (current.length > require.length) current.length = require.length;

		// 考虑到玄学的NaN情况，记录是否存在NaN
		let flag = false;
		// 从主版本号遍历到修订版本号，只考虑当前版本号的长度
		for (let i = 0; i < current.length; ++i) {
			// 当前环境版本号当前位若是NaN，则记录后直接到下一位
			if (isNaN(current[i])) {
				flag = true;
				continue;
			}
			// 如果此时flag为true且current[i]不为NaN，版本号则不合法，直接否
			if (flag) return false;
			// 上位版本号未达到要求，直接否决
			if (require[i] > current[i]) return false;
			// 上位版本号已超过要求，直接可行
			if (current[i] > require[i]) return true;
		}
		return true;
	}

	/**
	 * 获取当前内核版本信息
	 *
	 * 目前仅考虑`chrome`, `firefox`和`safari`三种浏览器的信息，其余均归于其他范畴
	 *
	 * > 其他后续或许会增加，但`IE`永无可能
	 *
	 * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
	 */
	coreInfo() {
		const regex = /(firefox|chrome|safari)\/(\d+(?:\.\d+)+)/;
		let result;
		if (!(result = userAgent.match(regex))) return ["other", NaN, NaN, NaN];

		// 非Safari情况直接返回结果
		if (result[1] != "safari") {
			const [major, minor, patch] = result[2].split(".");
			// @ts-expect-error "Matched result must be the status."
			return [result[1], parseInt(major), parseInt(minor), parseInt(patch)];
		}

		// 以下是所有Safari平台的判断方法
		// macOS以及以桌面显示的移动端则直接判断
		if (/macintosh/.test(userAgent)) {
			result = userAgent.match(/version\/(\d+(?:\.\d+)+).*safari/);
			if (!result) return ["other", NaN, NaN, NaN];
		}
		// 不然则通过OS后面的版本号来获取内容
		else {
			let safariRegex = /(?:iphone|ipad); cpu (?:iphone )?os (\d+(?:_\d+)+)/;
			result = userAgent.match(safariRegex);
			if (!result) return ["other", NaN, NaN, NaN];
		}
		// result = userAgent.match(/version\/(\d+(?:\.\d+)+).*safari/)
		// @ts-ignore
		const [major, minor, patch] = result[1].split(".");
		return ["safari", parseInt(major), parseInt(minor), parseInt(patch)];
	}
}

export let get = new GetCompatible();

/**
 * @param { InstanceType<typeof GetCompatible> } [instance]
 */
export function setGetCompatible(instance) {
	get = instance || new GetCompatible();
}
