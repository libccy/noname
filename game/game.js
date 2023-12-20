"use strict";
new Promise(resolve => {
	if ('__core-js_shared__' in window) resolve(null);
	else {
		const nonameInitialized = localStorage.getItem('noname_inited');
		const assetURL = typeof nonameInitialized != 'string' || nonameInitialized == 'nodejs' ? '' : nonameInitialized;
		const coreJSBundle = document.createElement('script');
		coreJSBundle.onerror = coreJSBundle.onload = resolve;
		coreJSBundle.src = `${assetURL}game/core-js-bundle.js`;
		document.head.appendChild(coreJSBundle);
	}
}).then(() => {
	const userAgent = navigator.userAgent.toLowerCase();
	if (!localStorage.getItem('gplv3_noname_alerted')) {
		if (confirm('①无名杀是一款基于GPLv3协议的开源软件！\n你可以在遵守GPLv3协议的基础上任意使用，修改并转发《无名杀》，以及所有基于《无名杀》开发的拓展。\n点击“确定”即代表您认可并接受GPLv3协议↓️\nhttps://www.gnu.org/licenses/gpl-3.0.html\n②无名杀官方发布地址仅有GitHub仓库！\n其他所有的所谓“无名杀”社群（包括但不限于绝大多数“官方”QQ群、QQ频道等）均为玩家自发组织，与无名杀官方无关！')) {
			// @ts-ignore
			localStorage.setItem('gplv3_noname_alerted', true);
		}
		else {
			const ios = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('macintosh');
			//electron
			if (typeof window.process == 'object' && typeof window.require == 'function') {
				const versions = window.process.versions;
				// @ts-ignore
				const electronVersion = parseFloat(versions.electron);
				let remote;
				if (electronVersion >= 14) {
					// @ts-ignore
					remote = require('@electron/remote');
				} else {
					// @ts-ignore
					remote = require('electron').remote;
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
	}
	window['b' + 'ann' + 'e' + 'dE' + 'x' + 'ten' + 's' + 'i' + 'o' + 'ns'] = ['\u4fa0\u4e49', '\u5168\u6559\u7a0b'];

	/**
	 * @type { Promise<import('../noname.js')> }
	 * 
	 * game.js不是一个模块，所以导入的路径是从html文件开始算起的
	 */
	// @ts-ignore
	const module = import('../noname.js');

	module.then(({ ai, game, get, lib, _status, ui }) => {
		const coreAndVersion = get.coreInfo();
		const core = coreAndVersion[0], version = coreAndVersion[1];
		if (core == 'chrome' && !isNaN(version) && version < 77) {
			const tip = '检测到您的浏览器内核版本小于77，请及时升级浏览器或手机webview内核！';
			console.warn(tip);
			game.print(tip);
			const redirect_tip = '您使用的浏览器或无名杀客户端内核版本过低，将在未来的版本被废弃！\n点击“确认”以前往GitHub下载最新版无名杀客户端（可能需要科学上网）。';
			if (confirm(redirect_tip)) {
				window.open('https://github.com/libccy/noname/releases/tag/chromium77-client');
			}
		}
		lib.init.init();
	});
});
