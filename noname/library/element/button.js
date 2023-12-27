import { AI as ai } from '../../ai/index.js';
import { Get as get } from '../../get/index.js';
import { Game as game } from '../../game/index.js';
import { Library as lib } from "../index.js";
import { status as _status } from '../../status/index.js';
import { UI as ui } from '../../ui/index.js';

export class Button extends HTMLDivElement {
	/**
	 * @param {{}} item
	 * @param {keyof typeof ui.create.buttonPresets | ((item: {}, type: Function, position?: HTMLDivElement | DocumentFragment, noClick?: true, button?: typeof Button) => typeof Button)} type
	 * @param {HTMLDivElement|DocumentFragment} [position]
	 * @param {true} [noClick]
	 * @param { typeof Button } [button]
	 */
	// @ts-ignore
	constructor(item, type, position, noClick, button) {
		if (ui.create.buttonPresets[type]) button = ui.create.buttonPresets[type](item, type, position, noClick, button);
		else if (typeof type == 'function') button = type(item, type, position, noClick, button);
		Object.setPrototypeOf(button, Button.prototype);
		// @ts-ignore
		if (!noClick) button.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
		else {
			// @ts-ignore
			button.classList.add('noclick');
			// @ts-ignore
			const intro = button.querySelector('.intro');
			if (intro) intro.remove();
		}
		// @ts-ignore
		return button;
	}
	exclude() {
		if (_status.event.excludeButton == undefined) {
			_status.event.excludeButton = [];
		}
		_status.event.excludeButton.add(this);
	}
	get updateTransform() {
		return lib.element.Card.prototype.updateTransform;
	}
}