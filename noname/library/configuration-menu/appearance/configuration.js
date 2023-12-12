import { ANIMATION } from "./configuration/animation.js";
import { AUTOMATIC_BORDER_COUNT } from "./configuration/automatic-border-count.js";
import { AUTOMATIC_BORDER_START } from "./configuration/automatic-border-start.js";
import { BLUR_UI } from "./configuration/blur-ui.js";
import { BORDER_STYLE } from "./configuration/border-style.js";
import { BUTTON_CHARACTER_PREFIX } from "./configuration/button-character-prefix.js";
import { BUTTON_CHARACTER_STYLE } from "./configuration/button-character-style.js";
import { BUTTON_PRESS } from "./configuration/button-press.js";
import { CARD_BACK_STYLE } from "./configuration/card-back-style.js";
import { CARD_SHAPE } from "./configuration/card-shape.js";
import { CARD_STYLE } from "./configuration/card-style.js";
import { CARD_TEMPORARY_NAME } from "./configuration/card-temporary-name.js";
import { CARD_TEXT_FONT } from "./configuration/card-text-font.js";
import { CHANGE_SKIN_AUTOMATICALLY } from "./configuration/change-skin-automatically.js";
import { CHANGE_SKIN } from "./configuration/change-skin.js";
import { CONTROL_STYLE } from "./configuration/control-style.js";
import { CURSOR_STYLE } from "./configuration/cursor-style.js";
import { CUSTOM_BUTTON_CONTROL_BOTTOM } from "./configuration/custom-button-control-bottom.js";
import { CUSTOM_BUTTON_CONTROL_TOP } from "./configuration/custom-button-control-top.js";
import { CUSTOM_BUTTON_SYSTEM_BOTTOM } from "./configuration/custom-button-system-bottom.js";
import { CUSTOM_BUTTON_SYSTEM_TOP } from "./configuration/custom-button-system-top.js";
import { CUSTOM_BUTTON } from "./configuration/custom-button.js";
import { DAMAGE_SHAKE } from "./configuration/damage-shake.js";
import { DIE_MOVE } from "./configuration/die-move.js";
import { FOLD_CARD } from "./configuration/fold-card.js";
import { FOLD_MODE } from "./configuration/fold-mode.js";
import { GLASS_UI } from "./configuration/glass-ui.js";
import { GLOBAL_FONT } from "./configuration/global-font.js";
import { GLOW_PHASE } from "./configuration/glow-phase.js";
import { HP_STYLE } from "./configuration/hp-style.js";
import { IDENTITY_FONT } from "./configuration/identity-font.js";
import { IMAGE_BACKGROUND_BLUR } from "./configuration/image-background-blur.js";
import { IMAGE_BACKGROUND_RANDOM } from "./configuration/image-background-random.js";
import { IMAGE_BACKGROUND } from "./configuration/image-background.js";
import { JIU_EFFECT } from "./configuration/jiu-effect.js";
import { LAYOUT } from "./configuration/layout.js";
import { LINK_STYLE_2 } from "./configuration/link-style-2.js";
import { MENU_STYLE } from "./configuration/menu-style.js";
import { NAME_FONT } from "./configuration/name-font.js";
import { PHONE_LAYOUT } from "./configuration/phone-layout.js";
import { PLAYER_BORDER } from "./configuration/player-border.js";
import { PLAYER_HEIGHT_NOVA } from "./configuration/player-height-nova.js";
import { PLAYER_HEIGHT } from "./configuration/player-height.js";
import { PLAYER_STYLE } from "./configuration/player-style.js";
import { RADIUS_SIZE } from "./configuration/radius-size.js";
import { SEPARATE_CONTROL } from "./configuration/separate-control.js";
import { SKILL_ANIMATION_TYPE } from "./configuration/skill-animation-type.js";
import { SPLASH_STYLE } from "./configuration/splash-style.js";
import { SUITS_FONT } from "./configuration/suits-font.js";
import { TARGET_SHAKE } from "./configuration/target-shake.js";
import { THEME } from "./configuration/theme.js";
import { TURNED_STYLE } from "./configuration/turned-style.js";
import { UI_ZOOM } from "./configuration/ui-zoom.js";

export const CONFIGURATION = {
	theme: THEME,
	layout: LAYOUT,
	splash_style: SPLASH_STYLE,
	player_height: PLAYER_HEIGHT,
	player_height_nova: PLAYER_HEIGHT_NOVA,
	ui_zoom: UI_ZOOM,
	image_background: IMAGE_BACKGROUND,
	image_background_random: IMAGE_BACKGROUND_RANDOM,
	image_background_blur: IMAGE_BACKGROUND_BLUR,
	phonelayout: PHONE_LAYOUT,
	change_skin: CHANGE_SKIN,
	change_skin_auto: CHANGE_SKIN_AUTOMATICALLY,
	card_style: CARD_STYLE,
	cardback_style: CARD_BACK_STYLE,
	hp_style: HP_STYLE,
	player_style: PLAYER_STYLE,
	border_style: BORDER_STYLE,
	autoborder_count: AUTOMATIC_BORDER_COUNT,
	autoborder_start: AUTOMATIC_BORDER_START,
	player_border: PLAYER_BORDER,
	menu_style: MENU_STYLE,
	control_style: CONTROL_STYLE,
	custom_button: CUSTOM_BUTTON,
	custom_button_system_top: CUSTOM_BUTTON_SYSTEM_TOP,
	custom_button_system_bottom: CUSTOM_BUTTON_SYSTEM_BOTTOM,
	custom_button_control_top: CUSTOM_BUTTON_CONTROL_TOP,
	custom_button_control_bottom: CUSTOM_BUTTON_CONTROL_BOTTOM,
	radius_size: RADIUS_SIZE,
	glow_phase: GLOW_PHASE,
	fold_card: FOLD_CARD,
	fold_mode: FOLD_MODE,
	seperate_control: SEPARATE_CONTROL,
	blur_ui: BLUR_UI,
	glass_ui: GLASS_UI,
	damage_shake: DAMAGE_SHAKE,
	button_press: BUTTON_PRESS,
	jiu_effect: JIU_EFFECT,
	animation: ANIMATION,
	skill_animation_type: SKILL_ANIMATION_TYPE,
	die_move: DIE_MOVE,
	target_shake: TARGET_SHAKE,
	turned_style: TURNED_STYLE,
	link_style2: LINK_STYLE_2,
	cardshape: CARD_SHAPE,
	cardtempname: CARD_TEMPORARY_NAME,
	buttoncharacter_style: BUTTON_CHARACTER_STYLE,
	buttoncharacter_prefix: BUTTON_CHARACTER_PREFIX,
	cursor_style: CURSOR_STYLE,
	name_font: NAME_FONT,
	identity_font: IDENTITY_FONT,
	cardtext_font: CARD_TEXT_FONT,
	global_font: GLOBAL_FONT,
	suits_font: SUITS_FONT,
	update(config, map) {
		if (config.custom_button) {
			map.custom_button_system_top.show();
			map.custom_button_system_bottom.show();
			map.custom_button_control_top.show();
			map.custom_button_control_bottom.show();
		}
		else {
			map.custom_button_system_top.hide();
			map.custom_button_system_bottom.hide();
			map.custom_button_control_top.hide();
			map.custom_button_control_bottom.hide();
		}
		if (config.change_skin) {
			map.change_skin_auto.show();
		}
		else {
			map.change_skin_auto.hide();
		}
		if (config.image_background_random) {
			map.image_background_blur.show();
			map.image_background.hide();
		}
		else {
			map.image_background.show();
			if (config.image_background == "default") {
				map.image_background_blur.hide();
			}
			else {
				map.image_background_blur.show();
			}
		}
		if (config.layout == "long" || config.layout == "mobile") {
			map.cardshape.show();
			map.phonelayout.show();
		}
		else {
			if (config.layout == "long2" || config.layout == "nova") {
				map.phonelayout.show();
				map.cardshape.show();
			}
			else {
				map.phonelayout.hide();
				map.cardshape.hide();
			}
		}
		if (config.layout == "long") {
			map.player_height.show();
		}
		else {
			if (config.layout == "long2") {
				map.player_height.show();
			}
			else {
				map.player_height.hide();
			}
		}
		if (config.layout == "nova") {
			map.player_height_nova.show();
		}
		else {
			map.player_height_nova.hide();
		}
		if (config.touchscreen) {
			map.cursor_style.hide();
		}
		else {
			map.cursor_style.show();
		}
		if (config.border_style == "auto") {
			map.autoborder_count.show();
			map.autoborder_start.show();
		}
		else {
			map.autoborder_count.hide();
			map.autoborder_start.hide();
		}
	}
};
