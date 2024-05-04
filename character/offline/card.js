import { lib, game, ui, get, ai, _status } from "../../noname.js";

const cards = {
	yanxiao_card: {
		type: "special_delay",
		fullimage: true,
		noEffect: true,
		ai: {
			basic: {
				order: 1,
				useful: 1,
				value: 8,
			},
			result: {
				target: 1,
			},
		},
	},
};
export default cards;
