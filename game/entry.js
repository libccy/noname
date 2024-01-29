import { game, get, lib, boot } from "../noname.js";
import { canUseHttpProtocol } from "../noname/init/index.js";
import { userAgent } from "../noname/util/index.js";

const coreAndVersion = get.coreInfo();
const core = coreAndVersion[0], version = coreAndVersion[1];
if (core === 'chrome' && !isNaN(version) && version < 77) {
	const tip = '检测到您的浏览器内核版本小于77，请及时升级浏览器或手机webview内核！';
	console.warn(tip);
	game.print(tip);
	const redirect_tip = `您使用的浏览器或无名杀客户端内核版本过低，将在未来的版本被废弃！\n目前使用的浏览器UA信息为：\n${userAgent}\n点击“确认”以前往GitHub下载最新版无名杀客户端（可能需要科学上网）。`;
	if (confirm(redirect_tip)) {
		window.open('https://github.com/libccy/noname/releases/tag/chromium77-client');
	}
}

// 判断是否从file协议切换到http/s协议
 if (canUseHttpProtocol()) {
	/*
	升级方法:
		1. 导出数据，然后以http/s协议重启
		2. 以http/s协议导入数据
		3. 保存http/s协议的状态，以后不再以file协议启动
	*/
	// 导出数据到根目录的noname.config.txt
	// 成功导入后应删除noname.config.txt
	boot().then(lib.other.ignore);
 } else {
	boot().then(lib.other.ignore);
 }

