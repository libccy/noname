import { lib, game, ui, get, ai, _status } from "../../noname.js";

const characterFilters = {
	jsrg_xushao(mode) {
		return mode != "guozhan";
	},
	jsrg_jiangwei(mode) {
		return mode !== "guozhan";
	},
};

export default characterFilters;
