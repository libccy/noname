import { lib } from "../index.js";
import { ui } from "../../ui/index.js";
import { get } from "../../get/index.js";
import { _status } from "../../status/index.js";

/**
 * @type {(NonameAssemblyType["checkBegin"])}
 * 
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkBegin = {};

/**
 * @type {(NonameAssemblyType["checkCard"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkCard = {
	updateTempname(card, event) {
		if (lib.config.cardtempname === "off") return;
		if (get.name(card) === card.name && get.is.sameNature(get.nature(card), card.nature, true)) return;
		const node = ui.create.cardTempName(card);
		if (lib.config.cardtempname !== "default") node.classList.remove("vertical");
	},
};

/**
 * @type {(NonameAssemblyType["checkTarget"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkTarget = {
	updateInstance(target, event) {
		// @ts-ignore
		if (!target.instance) return;
		["selected", "selectable"].forEach(className => {
			if (target.classList.contains(className)) {
				// @ts-ignore
				target.instance.classList.add(className);
			} else {
				// @ts-ignore
				target.instance.classList.remove(className);
			}
		});
	},
};

/**
 * @type {(NonameAssemblyType["checkButton"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkButton = {};

/**
 * @type {(NonameAssemblyType["checkEnd"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkEnd = {
	autoConfirm(event, { ok, auto, autoConfirm }) {
		if (!event.isMine()) return;
		const skillinfo = get.info(event.skill) || {};
		// @ts-ignore
		if (ok && auto && (autoConfirm || skillinfo.direct) && !_status.touchnocheck && !_status.mousedown && (!_status.mousedragging || !_status.mouseleft)) {
			if (ui.confirm) ui.confirm.close();
			// @ts-ignore
			if (event.skillDialog === true) event.skillDialog = false;
			ui.click.ok();
			// @ts-ignore
			_status.mousedragging = null;
			if (skillinfo.preservecancel) ui.create.confirm("c");
		}
	},
};

/**
 * @type {(NonameAssemblyType["uncheckBegin"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const uncheckBegin = {};

/**
 * @type {(NonameAssemblyType["uncheckCard"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const uncheckCard = {
	removeTempname(card, event) {
		// @ts-ignore
		if (!card._tempName) return;
		// @ts-ignore
		card._tempName.delete();
		// @ts-ignore
		delete card._tempName;
	},
};

/**
 * @type {(NonameAssemblyType["uncheckTarget"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const uncheckTarget = {
	removeInstance(target, event) {
		// @ts-ignore
		if (!target.instance) return;
		// @ts-ignore
		target.instance.classList.remove("selected");
		// @ts-ignore
		target.instance.classList.remove("selectable");
	},
};

/**
 * @type {(NonameAssemblyType["uncheckButton"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const uncheckButton = {};

/**
 * @type {(NonameAssemblyType["uncheckEnd"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const uncheckEnd = {};

/**
 * @type {(NonameAssemblyType["checkOverflow"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkOverflow = {
	updateDialog(itemOption, itemContainer, addedItems, game) {
		//计算压缩折叠的量
		const gap = 3;
		// @ts-ignore
		const L = (itemContainer.originWidth - 2 * gap) / game.documentZoom;
		// @ts-ignore
		const W = addedItems[0].getBoundingClientRect().width / game.documentZoom;
		// @ts-ignore
		let n = addedItems.length;
		const r = 16; //为偏移留出的空间，如果r为0，可能会把前面的卡牌全遮住
		if (n * W + (n + 1) * gap < L) {
			itemContainer.style.setProperty("--ml", gap + "px");
			itemContainer.classList.remove('zoom');
		} else {
			// @ts-ignore
			const ml = Math.min((n * W - L + gap) / (n - 1), W - r / game.documentZoom);
			itemContainer.style.setProperty("--ml", "-" + ml + "px");
			itemContainer.classList.add('zoom');
		}
	},
};
/**
 * @type {(NonameAssemblyType["checkTipBottom"])}
 */
export const checkTipBottom = {
	undateTipBottom(player) {

		if (!player.node.tipContainer) return;
		if ((lib.config.layout == "mobile" || lib.config.layout == "long") && player.dataset.position == '0') {
			player.style.removeProperty('--bottom');
		} else {
			if (!player.node.equips.querySelectorAll(":not(.emptyequip)").length) {
				player.style.removeProperty('--bottom');
			} else {
				let eqipContainerTop = player.node.equips.offsetTop;
				let equipTop = 0;
				for (let equip of Array.from(player.node.equips.children)) {
					if (!equip.classList.contains("emptyequip")) {
						equipTop = equip.offsetTop;
						break;
					}
				}
				let top = equipTop + eqipContainerTop;
				const bottom = player.getBoundingClientRect().height - top;
				player.style.setProperty('--bottom', bottom + 'px');
			}

		}
	}
};

/**
 * @type {(NonameAssemblyType["checkDamage1"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkDamage1 = {
	kuanggu(event, player) {
		// @ts-ignore
		if (get.distance(event.source, player) <= 1) event.checkKuanggu = true;
	},
};

/**
 * @type {(NonameAssemblyType["checkDamage2"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkDamage2 = {};

/**
 * @type {(NonameAssemblyType["checkDamage3"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkDamage3 = {
	jiushi(event, player) {
		// @ts-ignore
		if (player.isTurnedOver()) event.checkJiushi = true;
	},
};

/**
 * @type {(NonameAssemblyType["checkDamage4"])}
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 * 要加接口去node_modules/@types/noname-typings/NonameAssemblyType.d.ts里把类型补了
 */
export const checkDamage4 = {};
