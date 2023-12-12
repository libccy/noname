import { Get } from "../get.js";
import { configuration } from "./configuration.js";

export class CharacterDialogGroup {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static 收藏(name, capt) {
		return configuration.favouriteCharacter.includes(name) ? capt : null;
	}

	static 最近(name, capt) {
		var list = Get.config("recentCharacter") || [];
		return list.includes(name) ? capt : null;
	}
}
