import type { Ref } from "vue";
import { lib, game, ui } from "../../../noname.js";
import { IOnloadSplash } from "./IOnloadSplash.ts";
import { createApp } from "../../../game/vue.esm-browser.js";

import OnloadSplash from "./OnloadSplash.vue";

export class DefaultSplash implements IOnloadSplash {
	path = "image/splash/style1/";
	resolve: (mode: string) => void;
	app: any;

	async init(node: HTMLDivElement, resolve: (mode: string) => void) {
		this.resolve = resolve;

		this.app = createApp(OnloadSplash, {
			handle: this.handle,
			click: this.click,
		});

		this.app.mount(node);
	}

	async dispose(node: HTMLDivElement): Promise<void> {
		node.delete(1000, () => this.app.unmount());
	}

	handle(mode: string) {
		return `${this.path}/${mode}.jpg`;
	}

	click(mode: string, node: HTMLDivElement) {
		lib.config.mode = mode;
		game.saveConfig("mode", mode);
		if (game.layout != "mobile" && lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
			game.layout = "mobile";
			// @ts-ignore
			ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
		} else if (game.layout == "mobile" && lib.config.layout != "mobile" && lib.layoutfixed.indexOf(lib.config.mode) === -1) {
			game.layout = lib.config.layout;
			if (game.layout == "default") {
				// @ts-ignore
				ui.css.layout.href = "";
			} else {
				// @ts-ignore
				ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
			}
		}

		node.listenTransition(() => this.resolve(mode), 500);
	}
}
