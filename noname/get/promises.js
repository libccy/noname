import { get } from "./index.js";
import { Uninstantable } from "../util/index.js";

export class Promises extends Uninstantable {
	/**
	 * @returns { Promise<JSZip> }
	 */
	static zip() {
		return new Promise(resolve => get.zip(resolve));
	}
}