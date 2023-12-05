import { Click } from "./ui/click.js";
import { selected } from "./ui/selected.js";

class HTMLWindowElement extends HTMLDivElement { }

customElements.define("window", HTMLWindowElement, {
	extends: "div"
});

export class UI {
	static click = Click;
	static selected = selected;
	/**
	 * @type {HTMLWindowElement}
	 */
	static window;

	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
}
