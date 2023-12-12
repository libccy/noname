export const ENABLE = {
	name: "开启",
	init: false,
	restart: true,
	onswitch(bool) {
		if (bool) {
			var storage = { boss: {}, versus: {}, translate: {} };
			var loadversus = function () {
				game.loadModeAsync("versus", function (mode) {
					for (var i in mode.translate) {
						storage.translate[i] = mode.translate[i];
					}
					for (var i in mode.jiangeboss) {
						if (mode.jiangeboss[i][4].contains("bossallowed")) {
							storage.versus[i] = mode.jiangeboss[i];
						}
					}
					localStorage.setItem("boss_storage_playpackconfig", JSON.stringify(storage));
				});
			};
			game.loadModeAsync("boss", function (mode) {
				for (var i in mode.translate) {
					storage.translate[i] = mode.translate[i];
				}
				for (var i in mode.characterPack.mode_boss) {
					if (mode.characterPack.mode_boss[i][4].contains("bossallowed")) {
						storage.boss[i] = mode.characterPack.mode_boss[i];
					}
				}
				loadversus();
			});
		}
		else {
			localStorage.removeItem("boss_storage_playpackconfig");
		}
	}
};
