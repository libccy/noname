import { userAgent } from "../util/index.js";

export class GameCompatible {
	/**
	 * `game/game.js`中退出客户端用到的代码
	 *
	 * @author Spmario233
	 */
	exit() {
		const ios = userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("macintosh");
		//electron
		if (typeof window.process == "object" && typeof window.require == "function") {
			const versions = window.process.versions;
			// @ts-ignore
			const electronVersion = parseFloat(versions.electron);
			let remote;
			if (electronVersion >= 14) {
				// @ts-ignore
				remote = require("@electron/remote");
			} else {
				// @ts-ignore
				remote = require("electron").remote;
			}
			const thisWindow = remote.getCurrentWindow();
			thisWindow.destroy();
			window.process.exit();
		}
		//android-cordova环境
		//ios-cordova环境或ios浏览器环境
		//非ios的网页版
		else if (!ios) {
			window.close();
		}
	}

	/**
	 *
	 * @param {boolean} [debug]
	 */
	tryUpdateClient(debug = false) {}
}

export let game = new GameCompatible();

/**
 * @param { InstanceType<typeof GameCompatible> } [instance]
 */
export function setGameCompatible(instance) {
	game = instance || new GameCompatible();
}
