import { Is } from "../../../get/is.js";
import { Library } from "../../../library.js";
import { AUTO_CHECK_UPDATE } from "./config/auto-check-update.js";
import { AUTO_CONFIRM } from "./config/auto-confirm.js";
import { COMPATIBLE_MODE } from "./config/compatible-mode.js";
import { CONFIRM_EXIT } from "./config/confirm-exit.js";
import { DEVELOPER } from "./config/developer.js";
import { DOUBLE_CLICK_INTRODUCTION } from "./config/double-click-introduction.js";
import { ENABLE_DRAG_LINE } from "./config/enable-drag-line.js";
import { ENABLE_DRAG } from "./config/enable-drag.js";
import { ENABLE_TOUCH_DRAG_LINE } from "./config/enable-touch-drag-line.js";
import { ENABLE_VIBRATE } from "./config/enable-vibrate.js";
import { ERROR_STOP } from "./config/error-stop.js";
import { EXTENSION_CREATE } from "./config/extension-create.js";
import { EXTENSION_DELETE } from "./config/extension-delete.js";
import { EXTENSION_SOURCE } from "./config/extension-source.js";
import { FUCK_SO_JSON } from "./config/fuck-so-json.js";
import { GAME_SPEED } from "./config/game-speed.js";
import { HOVER_ALL } from "./config/hover-all.js";
import { HOVER_HAND_CARD } from "./config/hover-hand-card.js";
import { HOVERATION } from "./config/hoveration.js";
import { KEEP_AWAKE } from "./config/keep-awake.js";
import { LONG_PRESS_INFORMATION } from "./config/long-press-information.js";
import { LOW_PERFORMANCE } from "./config/low-performance.js";
import { LUCKY_STAR } from "./config/lucky-star.js";
import { MAXIMUM_LOAD_TIME } from "./config/maximum-load-time.js";
import { MOUNT_COMBINE } from "./config/mount-combine.js";
import { MOUSE_WHEEL } from "./config/mouse-wheel.js";
import { RIGHT_CLICK } from "./config/right-click.js";
import { RIGHT_INFORMATION } from "./config/right-information.js";
import { ROUND_MENU_FUNCTION } from "./config/round-menu-function.js";
import { SHOW_SPLASH } from "./config/show-splash.js";
import { SKIP_SHAN } from "./config/skip-shan.js";
import { SWIPE_DOWN } from "./config/swipe-down.js";
import { SWIPE_LEFT } from "./config/swipe-left.js";
import { SWIPE_RIGHT } from "./config/swipe-right.js";
import { SWIPE_UP } from "./config/swipe-up.js";
import { SWIPE } from "./config/swipe.js";
import { SYNCHRONIZE_SPEED } from "./config/synchronize-speed.js";
import { TAO_ENEMY } from "./config/tao-enemy.js";
import { TOUCHSCREEN } from "./config/touchscreen.js";
import { UN_AUTO_CHOOSE } from "./config/un-auto-choose.js";
import { UPDATE_LINK } from "./config/update-link.js";
import { VIDEO } from "./config/video.js";
import { WUXIE_SELF } from "./config/wuxie-self.js";

export const config = {
	mount_combine: MOUNT_COMBINE,
	low_performance: LOW_PERFORMANCE,
	compatiblemode: COMPATIBLE_MODE,
	confirm_exit: CONFIRM_EXIT,
	keep_awake: KEEP_AWAKE,
	auto_confirm: AUTO_CONFIRM,
	skip_shan: SKIP_SHAN,
	unauto_choose: UN_AUTO_CHOOSE,
	wuxie_self: WUXIE_SELF,
	tao_enemy: TAO_ENEMY,
	enable_drag: ENABLE_DRAG,
	enable_dragline: ENABLE_DRAG_LINE,
	enable_touchdragline: ENABLE_TOUCH_DRAG_LINE,
	touchscreen: TOUCHSCREEN,
	swipe: SWIPE,
	swipe_down: SWIPE_DOWN,
	swipe_up: SWIPE_UP,
	swipe_left: SWIPE_LEFT,
	swipe_right: SWIPE_RIGHT,
	round_menu_func: ROUND_MENU_FUNCTION,
	show_splash: SHOW_SPLASH,
	game_speed: GAME_SPEED,
	sync_speed: SYNCHRONIZE_SPEED,
	enable_vibrate: ENABLE_VIBRATE,
	right_click: RIGHT_CLICK,
	longpress_info: LONG_PRESS_INFORMATION,
	right_info: RIGHT_INFORMATION,
	hover_all: HOVER_ALL,
	hover_handcard: HOVER_HAND_CARD,
	hoveration: HOVERATION,
	doubleclick_intro: DOUBLE_CLICK_INTRODUCTION,
	video: VIDEO,
	max_loadtime: MAXIMUM_LOAD_TIME,
	mousewheel: MOUSE_WHEEL,
	auto_check_update: AUTO_CHECK_UPDATE,
	lucky_star: LUCKY_STAR,
	dev: DEVELOPER,
	fuck_sojson: FUCK_SO_JSON,
	errstop: ERROR_STOP,
	update_link: UPDATE_LINK,
	extension_source: EXTENSION_SOURCE,
	extension_create: EXTENSION_CREATE,
	extension_delete: EXTENSION_DELETE,
	update(config, map) {
		if ("ontouchstart" in document) {
			map.touchscreen.show();
		}
		else {
			map.touchscreen.hide();
		}
		if (Library.device || Library.node) {
			map.auto_check_update.show();
		}
		else {
			map.auto_check_update.hide();
		}
		if (Library.device) {
			map.enable_vibrate.show();
			map.keep_awake.show();
		}
		else {
			map.enable_vibrate.hide();
			map.keep_awake.hide();
		}
		if (config.touchscreen) {
			map.mousewheel.hide();
			map.hover_all.hide();
			map.hover_handcard.hide();
			map.hoveration.hide();
			map.right_info.hide();
			map.right_click.hide();
			map.longpress_info.show();
			map.swipe.show();
			if (config.swipe) {
				map.swipe_up.show();
				map.swipe_down.show();
				map.swipe_left.show();
				map.swipe_right.show();
			}
			else {
				map.swipe_up.hide();
				map.swipe_down.hide();
				map.swipe_left.hide();
				map.swipe_right.hide();
			}
		}
		else {
			map.mousewheel.show();
			map.hover_all.show();
			map.right_info.show();
			map.right_click.show();
			map.longpress_info.hide();
			if (!config.hover_all) {
				map.hover_handcard.hide();
				map.hoveration.hide();
			}
			else {
				map.hover_handcard.show();
				map.hoveration.show();
			}
			map.swipe.hide();
			map.swipe_up.hide();
			map.swipe_down.hide();
			map.swipe_left.hide();
			map.swipe_right.hide();
		}
		if (config.enable_drag) {
			if (config.touchscreen) {
				map.enable_dragline.hide();
				map.enable_touchdragline.show();
			}
			else {
				map.enable_dragline.show();
				map.enable_touchdragline.hide();
			}
		}
		else {
			map.enable_dragline.hide();
			map.enable_touchdragline.hide();
		}
		if (!Is.phoneLayout()) {
			map.round_menu_func.hide();
		}
		else {
			map.round_menu_func.show();
		}
		if (!Library.node && Library.device != "ios") {
			map.confirm_exit.show();
		}
		else {
			map.confirm_exit.hide();
		}
		if (config.dev) {
			map.errstop.show();
		}
		else {
			map.errstop.hide();
		}
	}
};
