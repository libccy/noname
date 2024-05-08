import { lib, game, ui, get, ai, _status } from "../../noname.js";

const characterFilters = {
	zuoci(mode) {
		return mode != "guozhan";
	},
};

export default characterFilters;
