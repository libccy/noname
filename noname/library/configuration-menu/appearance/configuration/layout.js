import { Game } from "../../../../game.js";
import { Library } from "../../../../library.js";
import { Create } from "../../../../ui/create.js";
import { configuration } from "../../../configuration.js";
import { Initialization } from "../../../initialization.js";
import { ITEM } from "./layout/item.js";

export const LAYOUT = {
	name: "布局",
	init: "mobile",
	item: ITEM,
	visualMenu(node, link) {
		node.className = `button character themebutton ${configuration.theme}`;
		if (!node.created) {
			node.created = true;
			node.style.overflow = "hidden";
			node.firstChild.style.display = "none";
			var me = Create.div(node);
			me.style.top = "auto";
			if (link == "default" || link == "newlayout") {
				me.style.width = "calc(100% - 6px)";
				me.style.left = "3px";
				me.style.bottom = "3px";
				me.style.height = "25px";
				if (link == "newlayout") {
					me.style.height = "23px";
					me.style.bottom = "4px";
				}
			}
			else if (link == "long2" || link == "nova") {
				me.style.display = "none";
			}
			else {
				me.style.width = "120%";
				me.style.left = "-10%";
				me.style.bottom = "0";
				me.style.height = "22px";
			}
			me.style.borderRadius = "2px";
			var list = ["re_caocao", "re_liubei", "sp_zhangjiao", "sunquan"];
			for (var i = 0; i < 4; i++) {
				var player = Create.div(".fakeplayer", node);
				Create.div(".avatar", player).setBackground(list.randomRemove(), "character");
				player.style.borderRadius = "2px";
				if (i != 3) {
					player.style.top = "auto";
				}
				if (link == "default") {
					player.style.height = "19px";
					player.style.width = "38px";
					player.classList.add("oldlayout")
				}
				else if (link == "mobile" || link == "newlayout") {
					player.style.width = "24px";
					player.style.height = "29px";
				}
				else if (link == "nova") {
					player.style.width = "20px";
					player.style.height = "24px";
				}
				else {
					player.style.width = "20px";
					player.style.height = "34px";
				}
				if (i == 1) {
					player.style.left = "3px";
				}
				if (i == 2) {
					player.style.left = "auto";
					player.style.right = "3px";
				}
				if (i == 3) {
					player.style.top = "3px";
				}
				if (link == "default") {
					if (i == 0) {
						player.style.bottom = "6px";
					}
					if (i == 0 || i == 3) {
						player.style.left = "calc(50% - 18px)";
					}
					if (i == 1 || i == 2) {
						player.style.bottom = "36px";
					}
				}
				else if (link == "newlayout") {
					if (i == 0) {
						player.style.bottom = "1px";
					}
					if (i == 0 || i == 3) {
						player.style.left = "calc(50% - 12px)";
					}
					if (i == 1 || i == 2) {
						player.style.bottom = "32px";
					}
				}
				else if (link == "mobile") {
					if (i == 0 || i == 3) {
						player.style.left = "calc(50% - 12px)";
					}
					if (i == 1 || i == 2) {
						player.style.bottom = "30px";
					}
				}
				else if (link == "long") {
					if (i == 0 || i == 3) {
						player.style.left = "calc(50% - 10px)";
					}
					if (i == 1 || i == 2) {
						player.style.bottom = "45px";
					}
				}
				else if (link == "long2") {
					if (i == 0) {
						player.style.bottom = "2px";
						player.style.left = "3px";
					}
					if (i == 3) {
						player.style.left = "calc(50% - 10px)";
					}
					if (i == 1 || i == 2) {
						player.style.bottom = "45px";
					}
				}
				else if (link == "nova") {
					if (i == 0) {
						player.style.bottom = "2px";
						player.style.left = "3px";
					}
					if (i == 3) {
						player.style.left = "calc(50% - 10px)";
					}
					if (i == 1 || i == 2) {
						player.style.left = "3px";
						player.style.bottom = (i * 30) + "px";
					}
				}

				if (i == 0 && (link == "mobile" || link == "long")) {
					player.classList.add("me");
					player.style.borderRadius = "0px";
					player.style.width = "25px";
					player.style.height = "25px";
					player.style.bottom = "-3px";
					player.style.left = "-3px";
				}
			}
		}
	},
	onclick(layout) {
		if (Library.layoutfixed.includes(configuration.mode)) {
			Game.saveConfig("layout", layout);
		}
		else {
			Initialization.layout(layout);
		}
	}
};
