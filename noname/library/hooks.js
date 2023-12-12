import { Game } from "../game.js";
import { Library } from "../library.js";

/**
 * 函数钩子
 */
export const hooks = {
	/**
	 * 本体势力的颜色
	 */
	addGroup: [(id, _short, _name, config) => {
		if ("color" in config && config.color != null) {
			let color1, color2, color3, color4;
			if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
				let c1 = parseInt(`0x${config.color.slice(1, 3)}`);
				let c2 = parseInt(`0x${config.color.slice(3, 5)}`);
				let c3 = parseInt(`0x${config.color.slice(5, 7)}`);
				color1 = color2 = color3 = color4 = [c1, c2, c3, 1];
			}
			else if (Array.isArray(config.color) && config.color.length == 4) {
				if (config.color.every(item => Array.isArray(item))) {
					color1 = config.color[0];
					color2 = config.color[1];
					color3 = config.color[2];
					color4 = config.color[3];
				}
				else color1 = color2 = color3 = color4 = config.color;
			}
			if (color1 && color2 && color3 && color4) {
				const cs = Library.linq.cselector;
				const g1 = cs.group(
					cs.of(
						cs.class("player", "identity"),
						cs.isAttr("data-color", `"${id}"`)
					),
					cs.of(
						"div",
						cs.isAttr("data-nature", `"${id}"`)
					),
					cs.of(
						"span",
						cs.isAttr("data-nature", `"${id}"`)
					)
				);
				const g2 = cs.group(
					cs.of(
						"div",
						cs.isAttr("data-nature", `"${id}m"`)
					),
					cs.of(
						"span",
						cs.isAttr("data-nature", `"${id}m"`)
					)
				);
				const g3 = cs.group(
					cs.of(
						"div",
						cs.isAttr("data-nature", `"${id}mm"`)
					),
					cs.of(
						"span",
						cs.isAttr("data-nature", `"${id}mm"`)
					)
				);
				let result = {};
				result[g1] = {
					textShadow: cs.group(
						"black 0 0 1px",
						`rgba(${color1.join()}) 0 0 2px`,
						`rgba(${color2.join()}) 0 0 5px`,
						`rgba(${color3.join()}) 0 0 10px`,
						`rgba(${color4.join()}) 0 0 10px`
					)
				};
				result[g2] = {
					textShadow: cs.group(
						"black 0 0 1px",
						`rgba(${color1.join()}) 0 0 2px`,
						`rgba(${color2.join()}) 0 0 5px`,
						`rgba(${color3.join()}) 0 0 5px`,
						`rgba(${color4.join()}) 0 0 5px`,
						"black 0 0 1px"
					)
				};
				result[g3] = {
					textShadow: cs.group(
						"black 0 0 1px",
						`rgba(${color1.join()}) 0 0 2px`,
						`rgba(${color2.join()}) 0 0 2px`,
						`rgba(${color3.join()}) 0 0 2px`,
						`rgba(${color4.join()}) 0 0 2px`,
						"black 0 0 1px"
					)
				};
				Game.dynamicStyle.addObject(result);
				Library.groupnature[id] = id;
			}
		}
		if (typeof config.image == "string") Object.defineProperty(Library.card, `group_${id}`, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: {
				fullskin: true,
				image: config.image
			}
		});
	}],
	/**
	 * 增加新属性杀
	 */
	addNature: [(nature, _translation, config) => {
		if (typeof config != "object") config = {};
		let linked = config.linked, order = config.order, background = config.background, lineColor = config.lineColor;
		if (typeof linked != "boolean") linked = true;
		if (typeof order != "number") order = 0;
		if (typeof background != "string") background = "";
		if (!Array.isArray(lineColor) || lineColor.length != 3) lineColor = [];
		else if (background.startsWith("ext:")) {
			background = background.replace(/^ext:/, "extension/");
		}
		if (linked) Library.linked.add(nature);
		if (lineColor.length) Library.lineColor.set(nature, lineColor);
		Library.nature.set(nature, order);
		if (background.length > 0) Library.natureBg.set(nature, background);
		if (config.audio) {
			for (let key in config.audio) {
				if (!Library.natureAudio[key]) {
					Library.natureAudio[key] = config.audio[key];
				} else {
					for (let key2 in config.audio[key]) {
						Library.natureAudio[key][key2] = config.audio[key][key2];
					}
				}
			}
		}

		let color1, color2;
		if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
			let c1 = parseInt(`0x${item[1].slice(1, 3)}`);
			let c2 = parseInt(`0x${item[1].slice(3, 5)}`);
			let c3 = parseInt(`0x${item[1].slice(5, 7)}`);
			color1 = color2 = [c1, c2, c3, 1];
		}
		else if (Array.isArray(config.color) && config.color.length >= 2 && config.color.length <= 4) {
			if (config.color.every(item => Array.isArray(item))) {
				color1 = config.color[0];
				color2 = config.color[1];
			}
			else {
				let color = config.color.slice();
				if (color.length == 3) color.push(1);
				color1 = color2 = color;
			}
		}
		if (color1 && color2) {
			const cs = Library.linq.cselector;
			const g1 = cs.group(
				cs.of(
					cs.class("card", "fullskin", `${nature}`),
					">",
					cs.class("name")
				)
			);
			let result = {};
			result[g1] = {
				color: `rgba(${color1.join()})`,
				border: cs.merge(
					"1px",
					"solid",
					`rgba(${color2.join()})`
				),
			};
			Game.dynamicStyle.addObject(result);

			const g2 = cs.group(
				cs.of(
					cs.class("tempname", `${nature}`),
					":not([data-nature])>",
					cs.class("span")
				)
			)
			let result2 = {};
			result2[g2] = {
				color: `rgba(${color1.join()})`,
			};
			Game.dynamicStyle.addObject(result2);
		}
	}]
};
