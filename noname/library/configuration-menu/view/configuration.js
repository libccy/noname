import { AUTOMATICALLY_POPPED_CONFIGURATION } from "./configuration/automatically-popped-configuration.js";
import { AUTOMATICALLY_POPPED_HISTORY } from "./configuration/automatically-popped-history.js";
import { CHARACTER_DIALOG_TOOL } from "./configuration/character-dialog-tool.js";
import { CLEAR_LOG } from "./configuration/clear-log.js";
import { HIDE_CARD_IMAGE } from "./configuration/hide-card-image.js";
import { HIDE_CARD_PROMPT_BASIC } from "./configuration/hide-card-prompt-basic.js";
import { HIDE_CARD_PROMPT_EQUIP } from "./configuration/hide-card-prompt-equip.js";
import { LOG_HIGHLIGHT } from "./configuration/log-highlight.js";
import { MARK_IDENTITY_STYLE } from "./configuration/mark-identity-style.js";
import { POP_EQUIP } from "./configuration/pop-equip.js";
import { POP_LOGV } from "./configuration/pop-logv.js";
import { RECENT_CHARACTER_NUMBER } from "./configuration/recent-character-number.js";
import { REMEMBER_DIALOG } from "./configuration/remember-dialog.js";
import { REMEMBER_ROUND_BUTTON } from "./configuration/remember-round-button.js";
import { RIGHT_RANGE } from "./configuration/right-range.js";
import { SHOW_AUTOMATIC } from "./configuration/show-automatic.js";
import { SHOW_BAN_MENU } from "./configuration/show-ban-menu.js";
import { SHOW_CARD_PILE_NUMBER } from "./configuration/show-card-pile-number.js";
import { SHOW_CARD_PILE } from "./configuration/show-card-pile.js";
import { SHOW_CARD_PROMPT } from "./configuration/show-card-prompt.js";
import { SHOW_CHARACTER_CARD } from "./configuration/show-character-card.js";
import { SHOW_CHARACTER_NAME_PINYIN } from "./configuration/show-character-name-pinyin.js";
import { SHOW_DISCARD_PILE } from "./configuration/show-discard-pile.js";
import { SHOW_EXTENSION_MAKER } from "./configuration/show-extension-maker.js";
import { SHOW_EXTENSION_SHARE } from "./configuration/show-extension-share.js";
import { SHOW_FAVORITE_MENU } from "./configuration/show-favorite-menu.js";
import { SHOW_FAVORITE_MODE } from "./configuration/show-favorite-mode.js";
import { SHOW_FAVORITE } from "./configuration/show-favorite.js";
import { SHOW_GIVE_UP } from "./configuration/show-give-up.js";
import { SHOW_GROUP } from "./configuration/show-group.js";
import { SHOW_HAND_CARD_BUTTON } from "./configuration/show-hand-card-button.js";
import { SHOW_HISTORY } from "./configuration/show-history.js";
import { SHOW_LOG } from "./configuration/show-log.js";
import { SHOW_NAME } from "./configuration/show-name.js";
import { SHOW_PAUSE } from "./configuration/show-pause.js";
import { SHOW_PHASE_PROMPT } from "./configuration/show-phase-prompt.js";
import { SHOW_PHASE_USE_PROMPT } from "./configuration/show-phase-use-prompt.js";
import { SHOW_PLAYER_IDS } from "./configuration/show-player-ids.js";
import { SHOW_RARITY } from "./configuration/show-rarity.js";
import { SHOW_REPLAY } from "./configuration/show-replay.js";
import { SHOW_ROUND_MENU } from "./configuration/show-round-menu.js";
import { SHOW_SEX } from "./configuration/show-sex.js";
import { SHOW_SKILL_NAME_PINYIN } from "./configuration/show-skill-name-pinyin.js";
import { SHOW_SORT_CARD } from "./configuration/show-sort-card.js";
import { SHOW_STATUS_BAR_ANDROID } from "./configuration/show-status-bar-android.js";
import { SHOW_STATUS_BAR_IOS } from "./configuration/show-status-bar-ios.js";
import { SHOW_TIME_2 } from "./configuration/show-time-2.js";
import { SHOW_TIME_3 } from "./configuration/show-time-3.js";
import { SHOW_TIME } from "./configuration/show-time.js";
import { SHOW_VOLUME } from "./configuration/show-volume.js";
import { SHOW_WUXIE } from "./configuration/show-wuxie.js";
import { TRANSPARENT_DIALOG } from "./configuration/transparent-dialog.js";
import { WATCH_FACE } from "./configuration/watch-face.js";
import { WUXIE_RIGHT } from "./configuration/wuxie-right.js";

export const CONFIGURATION = {
	update(config, map) {
		if (config.mode == "versus" || config.mode == "chess" || config.mode == "tafang" || config.mode == "boss") {
			map.show_handcardbutton.show();
		}
		else {
			map.show_handcardbutton.hide();
		}
		if (config.touchscreen) {
			map.pop_logv.hide();
		}
		else {
			map.pop_logv.show();
		}
		if (device) {
			if (device == "android") {
				map.show_statusbar_android.show();
				map.show_statusbar_ios.hide();
			}
			else if (device == "ios") {
				map.show_statusbar_ios.show();
				map.show_statusbar_android.hide();
			}
			if (!game.download) {
				setTimeout(function () {
					if (!window.StatusBar) {
						map.show_statusbar.hide();
					}
				}, 5000);
			}
		}
		else {
			map.show_statusbar_ios.hide();
			map.show_statusbar_android.hide();
		}
		if (get.is.phoneLayout()) {
			map.remember_round_button.show();
			map.popequip.show();
			map.filternode_button.show();
			map.show_pause.hide();
			map.show_auto.hide();
			map.show_replay.hide();
			map.show_round_menu.show();
		}
		else {
			map.show_pause.show();
			map.show_auto.show();
			map.show_replay.show();
			map.show_round_menu.hide();
			map.remember_round_button.hide();
			map.popequip.hide();
			map.filternode_button.hide();
		}
		if (config.show_card_prompt) {
			map.hide_card_prompt_basic.show();
			map.hide_card_prompt_equip.show();
		}
		else {
			map.hide_card_prompt_basic.hide();
			map.hide_card_prompt_equip.hide();
		}
		if (config.show_log != "off") {
			map.clear_log.show();
		}
		else {
			map.clear_log.hide();
		}
		if (get.is.phoneLayout()) {
			map.show_time2.show();
			map.show_time.hide();
			if (config.show_time2) {
				map.watchface.show();
			}
			else {
				map.watchface.hide();
			}
		}
		else {
			map.show_time2.hide();
			map.show_time.show();
			map.watchface.hide();
		}
		if (config.show_extensionmaker) {
			map.show_extensionshare.show();
		}
		else {
			map.show_extensionshare.hide();
		}
	},
	show_history: SHOW_HISTORY,
	pop_logv: POP_LOGV,
	show_log: SHOW_LOG,
	clear_log: CLEAR_LOG,
	log_highlight: LOG_HIGHLIGHT,
	show_time: SHOW_TIME,
	show_time2: SHOW_TIME_2,
	watchface: WATCH_FACE,
	show_time3: SHOW_TIME_3,
	show_statusbar_android: SHOW_STATUS_BAR_ANDROID,
	show_statusbar_ios: SHOW_STATUS_BAR_IOS,
	show_card_prompt: SHOW_CARD_PROMPT,
	hide_card_prompt_basic: HIDE_CARD_PROMPT_BASIC,
	hide_card_prompt_equip: HIDE_CARD_PROMPT_EQUIP,
	show_phase_prompt: SHOW_PHASE_PROMPT,
	show_phaseuse_prompt: SHOW_PHASE_USE_PROMPT,
	auto_popped_config: AUTOMATICALLY_POPPED_CONFIGURATION,
	auto_popped_history: AUTOMATICALLY_POPPED_HISTORY,
	show_round_menu: SHOW_ROUND_MENU,
	remember_round_button: REMEMBER_ROUND_BUTTON,
	remember_dialog: REMEMBER_DIALOG,
	transparent_dialog: TRANSPARENT_DIALOG,
	show_rarity: SHOW_RARITY,
	mark_identity_style: MARK_IDENTITY_STYLE,
	character_dialog_tool: CHARACTER_DIALOG_TOOL,
	recent_character_number: RECENT_CHARACTER_NUMBER,
	popequip: POP_EQUIP,
	show_charactercard: SHOW_CHARACTER_CARD,
	show_favourite: SHOW_FAVORITE,
	show_favmode: SHOW_FAVORITE_MODE,
	show_favourite_menu: SHOW_FAVORITE_MENU,
	show_ban_menu: SHOW_BAN_MENU,
	right_range: RIGHT_RANGE,
	hide_card_image: HIDE_CARD_IMAGE,
	show_name: SHOW_NAME,
	show_sex: SHOW_SEX,
	show_group: SHOW_GROUP,
	show_replay: SHOW_REPLAY,
	show_playerids: SHOW_PLAYER_IDS,
	show_sortcard: SHOW_SORT_CARD,
	show_pause: SHOW_PAUSE,
	show_auto: SHOW_AUTOMATIC,
	show_volumn: SHOW_VOLUME,
	show_cardpile: SHOW_CARD_PILE,
	show_cardpile_number: SHOW_CARD_PILE_NUMBER,
	show_handcardbutton: SHOW_HAND_CARD_BUTTON,
	show_giveup: SHOW_GIVE_UP,
	show_wuxie: SHOW_WUXIE,
	wuxie_right: WUXIE_RIGHT,
	show_discardpile: SHOW_DISCARD_PILE,
	show_extensionmaker: SHOW_EXTENSION_MAKER,
	show_extensionshare: SHOW_EXTENSION_SHARE,
	show_characternamepinyin: SHOW_CHARACTER_NAME_PINYIN,
	show_skillnamepinyin: SHOW_SKILL_NAME_PINYIN
};
