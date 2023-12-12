export class Button extends HTMLDivElement {
	/**
	 * @param {{}} item
	 * @param {keyof typeof ui.create.buttonPresets | (item: {}, type: Function, position?: HTMLDivElement, noClick?: true, button?: HTMLDivElement) => HTMLDivElement} type
	 * @param {HTMLDivElement} [position]
	 * @param {true} [noClick]
	 * @param {HTMLDivElement} [button]
	 */
	constructor(item, type, position, noClick, button) {
		if (ui.create.buttonPresets[type]) button = ui.create.buttonPresets[type](item, type, position, noClick, button);
		else if (typeof type == "function") button = type(item, type, position, noClick, button);
		Object.setPrototypeOf(button, lib.element.Button.prototype);
		if (!noClick) button.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.button);
		else {
			button.classList.add("noclick");
			const intro = button.querySelector(".intro");
			if (intro) intro.remove();
		}
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
