export const SHOW_CARD_PILE_NUMBER = {
	name: "显示剩余牌数",
	init: false,
	unfrequent: true,
	onclick(bool) {
		game.saveConfig("show_cardpile_number", bool);
		if (bool) {
			ui.cardPileNumber.style.display = "";
		}
		else {
			ui.cardPileNumber.style.display = "none";
		}
	}
};
