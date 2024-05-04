const characterFilters = {
	ns_duangui(mode) {
		return mode == "identity" && _status.mode == "normal";
	},
	diy_liuyan(mode) {
		return mode != "chess" && mode != "tafang";
	},
};

export default characterFilters;
