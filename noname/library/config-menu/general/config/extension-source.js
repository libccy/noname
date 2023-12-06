import { config } from "../../../config.js";

export const EXTENSION_SOURCE = {
	name: "获取扩展地址",
	init: "GitHub Proxy",
	unfrequent: true,
	get item() {
		return config.extension_sources;
	},
	intro() {
		return `获取在线扩展时的地址。当前地址：${document.createElement("br").outerHTML}${config.extension_sources[config.extension_source]}`;
	}
};
