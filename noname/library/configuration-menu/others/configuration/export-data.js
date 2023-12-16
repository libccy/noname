import { Game as game } from '../../../../game.js';
import { Library as lib } from '../../../../library.js';
import { status as _status } from '../../../../status.js';

export const EXPORT_DATA = {
	name: "导出游戏设置",
	onclick() {
		var data;
		var export_data = function (data) {
			game.export(lib.init.encode(JSON.stringify(data)), "无名杀 - 数据 - " + (new Date()).toLocaleString());
		}
		if (!lib.db) {
			data = {};
			for (var i in localStorage) {
				if (i.startsWith(lib.configprefix)) {
					data[i] = localStorage[i];
				}
			}
			export_data(data);
		}
		else {
			game.getDB("config", null, function (data1) {
				game.getDB("data", null, function (data2) {
					export_data({
						config: data1,
						data: data2
					});
				});
			});
		}

	},
	clear: true
};
