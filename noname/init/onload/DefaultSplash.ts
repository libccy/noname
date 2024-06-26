import type { Ref } from "vue";
import { lib, game, ui } from "../../../noname.js";
import { IOnloadSplash } from "./IOnloadSplash.ts";
import { createApp } from "../../../game/vue.esm-browser.js";

import OnloadSplash from "./OnloadSplash.vue";

export class DefaultSplash implements IOnloadSplash {
	id = "style1";
	name = "样式一";

	path = "image/splash/style1/";
	resolve: (mode: string) => void;
	app: any;
	clicked: HTMLDivElement;

	async init(node: HTMLDivElement, resolve: (mode: string) => void) {
		this.resolve = resolve;

		if (lib.config.touchscreen) {
			node.classList.add("touch");
			lib.setScroll(node);
		}
		if (lib.config.player_border != "wide") {
			node.classList.add("slim");
		}

		node.dataset.radius_size = lib.config.radius_size;

		this.app = createApp(OnloadSplash, {
			handle: this.handle.bind(this),
			click: this.click.bind(this),
		});

		this.app.mount(node);

		if (lib.config.mousewheel) {
			node.addEventListener("wheel", ui.click.mousewheel);
		}
	}

	async dispose(node: HTMLDivElement): Promise<void> {
		node.delete(1000);

		await new Promise<void>(resolve => this.clicked.listenTransition(resolve, 500));
		this.app.unmount();
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

		this.clicked = node;
		this.resolve(mode);
	}
}
