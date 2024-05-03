const characterFilters = {
	chunyuqiong(mode) {
		return mode != "identity" && mode != "guozhan";
	},
	sp_xuyou(mode) {
		return mode == "versus" && ["guandu", "4v4", "four"].includes(_status.mode);
	},
};

export default characterFilters;
