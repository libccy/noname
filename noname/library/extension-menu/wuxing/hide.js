import { Game as game } from '../../../game.js';
import { Library as lib } from '../../../library.js';
import { status as _status } from '../../../status.js';
export const HIDE = {
	name: "隐藏此扩展",
	clear: true,
	onclick() {
		if (this.firstChild.innerHTML == "隐藏此扩展") {
			this.firstChild.innerHTML = "此扩展将在重启后隐藏";
			lib.config.hiddenPlayPack.add("wuxing");
			if (!lib.config.prompt_hidepack) {
				alert("隐藏的扩展包可通过选项-其它-重置隐藏内容恢复");
				game.saveConfig("prompt_hidepack", true);
			}
		}
		else {
			this.firstChild.innerHTML = "隐藏此扩展";
			lib.config.hiddenPlayPack.remove("wuxing");
		}
		game.saveConfig("hiddenPlayPack", lib.config.hiddenPlayPack);
	}
};
