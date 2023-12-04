{
	const userAgent = navigator.userAgent.toLowerCase();

	const nonameInitialized = localStorage.getItem("noname_inited");
	const assetURL =
		typeof nonameInitialized != "string" || nonameInitialized == "nodejs"
			? ""
			: nonameInitialized;

	let exit = false;
	if (!localStorage.getItem("gplv3_noname_alerted")) {
		const warning = [
			"①无名杀是一款基于GPLv3协议的开源软件！",
			"你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。",
			"点击“确定”即代表您认可并接受GPLv3协议↓️",
			"https://www.gnu.org/licenses/gpl-3.0.html",
			"②无名杀官方发布地址仅有GitHub仓库！",
			"其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！",
		].join("\n");

		if (confirm(warning)) {
			// @ts-ignore
			localStorage.setItem("gplv3_noname_alerted", true);
		} else exit = true;
	}

	/**
	 *
	 * @returns {[core: string, version: number]}
	 */
	function coreInfo() {
		const userAgent = navigator.userAgent.toLowerCase();
		const regex = /(firefox|chrome|safari)\/([\d.]+)/;
		let result;
		if (!(result = userAgent.match(regex))) return ["other", NaN];
		if (result[1] != "safari") return [result[1], parseInt(result[2])];
		result = userAgent.match(/version\/([\d.]+).*safari/);
		// @ts-ignore
		return ["safari", parseInt(result[1])];
	}

	const [core, version] = coreInfo();
	if (core == "chrome" && !isNaN(version) && version < 77) {
		const tip = [
			"检测到您的浏览器内核版本小于77，无名杀已不支持当前版本，即将退出",
			"请及时升级浏览器或手机webview内核后再运行无名杀！",
			"点击“确认”以前往GitHub下载最新版无名杀客户端（可能需要科学上网）。",
		].join("\n");
		console.error(tip);
		if (confirm(tip)) {
			window.open(
				"https://github.com/libccy/noname/releases/tag/chromium77-client"
			);
		}
		exit = true;
	}

	if (exit) {
		const ios =
			userAgent.includes("iphone") ||
			userAgent.includes("ipad") ||
			userAgent.includes("macintosh");
		//electron
		if (
			// @ts-ignore
			typeof window.process == "object" &&
			// @ts-ignore
			typeof window.require == "function"
		) {
			// @ts-ignore
			const versions = window.process.versions;
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
			// @ts-ignore
			window.process.exit();
		}
		//android-cordova环境
		//ios-cordova环境或ios浏览器环境
		//非ios的网页版
		else if (!ios) {
			window.close();
		}
	} else {
		const nonameScript = document.createElement("script");
		nonameScript.type = "module";
		nonameScript.src = `${assetURL}game/src/main.js`;
		document.head.appendChild(nonameScript);
	}
}
