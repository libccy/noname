export const CONFIGURATION = {
	update(config, map) {
		for (var i in map) {
			if (map[i]._link.config.type == "autoskill") {
				if (!config.autoskilllist.contains(i)) {
					map[i].classList.add("on");
				}
				else {
					map[i].classList.remove("on");
				}
			}
			else if (map[i]._link.config.type == "banskill") {
				if (!config.forbidlist.contains(i)) {
					map[i].classList.add("on");
				}
				else {
					map[i].classList.remove("on");
				}
			}
		}
	}
};
