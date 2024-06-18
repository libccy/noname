import { userAgent, compatibleEnvironment } from "../util/index.js";

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
	 * @param { UpdateReason } type
	 */
	tryUpdateClient(type) {
		if (!compatibleEnvironment && type != UpdateReason.DEBUG) return;

		/**
		 * @returns { Promise<File>}
		 */
		function update(url) {
			let fileName = undefined;

			// @ts-ignore
			return (
				import("../library/update.js")
					.then(({ request, createProgress }) => {
						let progress = createProgress("正在下载最新客户端");

						return request(url, (receivedBytes, total, filename) => {
							if (typeof filename == "string") {
								progress.setFileName(filename);
								fileName = filename;
							}
							let received = 0,
								max = 0;
							if (total) {
								max = +(total / (1024 * 1024)).toFixed(1);
							} else {
								max = 1000;
							}
							received = +(receivedBytes / (1024 * 1024)).toFixed(1);
							if (received > max) max = received;
							progress.setProgressMax(max);
							progress.setProgressValue(received);
						}).then(result => (progress.remove(), result));
					})
					// @ts-ignore
					.then(blob => ((blob.name = fileName), blob))
			);
		}

		/**
		 *
		 * @param {File} blob
		 */
		function open(blob) {
			let a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = blob.name;
			a.addEventListener("click", () => {
				setTimeout(() => URL.revokeObjectURL(blob.name), 100);
			});
			a.click();
		}

		switch (type) {
			case UpdateReason.DEBUG: {
				// 测试环境
				let url = "https://ghproxy.cc/https://github.com/libccy/noname/releases/download/chromium85-client/Noname-linux-x64.zip";
				return update(url).then(open);
			}
			case UpdateReason.FALLBACK: {
				break;
			}
			case UpdateReason.UNDERSUPPORT: {
				break;
			}
			default: {
				return Promise.resolve();
			}
		}
	}
}

export let game = new GameCompatible();

/**
 * @param { InstanceType<typeof GameCompatible> } [instance]
 */
export function setGameCompatible(instance) {
	game = instance || new GameCompatible();
}

/**
 * @enum {number}
 * @constant
 */
export const UpdateReason = {
	DEBUG: 1,
	FALLBACK: 2,
	UNDERSUPPORT: 4,
};
