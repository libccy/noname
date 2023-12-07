import { Game } from "../../../../game.js";
import { gnc } from "../../../../gnc.js";
import { Library } from "../../../../library.js";
import { UI } from "../../../../ui.js";
import { Create } from "../../../../ui/create.js";
import { css } from "../../../../ui/css.js";
import { announce } from "../../../announce.js";
import { configuration } from "../../../configuration.js";
import { Initialization } from "../../../initialization.js";
import { ITEM } from "./theme/item.js";

export const THEME = {
	name: "主题",
	init: "woodden",
	item: ITEM,
	visualMenu(node, link) {
		if (!node.menu) {
			node.className = `button character themebutton ${link}`;
			node.menu = Create.div(node, "", "<div></div><div></div><div></div><div></div>");
		}
	},
	onclick: gnc.of(function* (theme) {
		Game.saveConfig("theme", theme);
		UI.arena.hide();
		Initialization.background();
		if (configuration.autostyle) {
			if (theme === "simple") {
				Library.configMenu.appearence.config.player_border.onclick("slim");
			}
			else {
				Library.configMenu.appearence.config.player_border.onclick("normal");
			}
		}
		announce.publish("Noname.Apperaence.Theme.onChanging", theme);
		yield new Promise(resolve => setTimeout(resolve, 500));

		const deletingTheme = css.theme;
		css.theme = Initialization.css(`${Library.assetURL}theme/${configuration.theme}`, "style");
		deletingTheme.remove();
		announce.publish("Noname.Apperaence.Theme.onChanged", theme);
		yield new Promise(resolve => setTimeout(resolve, 100));

		UI.arena.show();
		announce.publish("Noname.Apperaence.Theme.onChangeFinished", theme);
	})
};
