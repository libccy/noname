import { lib } from "../index.js";
import { ui } from "../../ui/index.js";
import { get } from "../../get/index.js";
import { _status } from "../../status/index.js";

/**
 * @type {(NonameAssemblyType["checkBegin"])}
 */
export const checkBegin = {};

/**
 * @type {(NonameAssemblyType["checkCard"])}
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
 */
export const checkButton = {};

/**
 * @type {(NonameAssemblyType["checkEnd"])}
 */
export const checkEnd = {
	autoConfirm(event, { ok, auto, autoConfirm }) {
		if (!event.isMine()) return;
		const skillinfo = get.info(event.skill) || {};
		if (ok && auto && (autoConfirm || skillinfo.direct) && !_status.touchnocheck && !_status.mousedown && (!_status.mousedragging || !_status.mouseleft)) {
			if (ui.confirm) ui.confirm.close();
			// @ts-ignore
			if (event.skillDialog === true) event.skillDialog = false;
			ui.click.ok();
			_status.mousedragging = null;
			if (skillinfo.preservecancel) ui.create.confirm("c");
		}
	},
};

/**
 * @type {(NonameAssemblyType["uncheckBegin"])}
 */
export const uncheckBegin = {};

/**
 * @type {(NonameAssemblyType["uncheckCard"])}
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
 */
export const uncheckButton = {};

/**
 * @type {(NonameAssemblyType["uncheckEnd"])}
 */
export const uncheckEnd = {};

/**
 * @type {(NonameAssemblyType["checkOverflow"])}
 */
export const checkOverflow = {
	updateDialog(itemOption, itemContainer, addedItems, game) {
		//计算压缩折叠的量
		const gap = 3;
		const L = (itemContainer.originWidth - 2 * gap) / game.documentZoom;
		const W = addedItems[0].getBoundingClientRect().width / game.documentZoom;
		let n = addedItems.length;
		const r = 16; //为偏移留出的空间，如果r为0，可能会把前面的卡牌全遮住
		if (n * W + (n + 1) * gap < L) {
			itemContainer.style.setProperty("--ml", gap + "px");
		} else {
			const ml = Math.min((n * W - L + gap) / (n - 1), W - r / game.documentZoom);
			itemContainer.style.setProperty("--ml", "-" + ml + "px");
		}
	},
};

/**
 * @type {(NonameAssemblyType["checkDamage1"])}
 */
export const checkDamage1 = {
	kuanggu(event, player) {
		if(get.distance(event.source, player) <= 1) event.checkKuanggu = true;
	},
};

/**
 * @type {(NonameAssemblyType["checkDamage2"])}
 */
export const checkDamage2 = {};

/**
 * @type {(NonameAssemblyType["checkDamage3"])}
 */
export const checkDamage3 = {
	jiushi(event, player) {
		if(player.isTurnedOver()) event.checkJiushi = true;
	},
};

/**
 * @type {(NonameAssemblyType["checkDamage4"])}
 */
export const checkDamage4 = {};
