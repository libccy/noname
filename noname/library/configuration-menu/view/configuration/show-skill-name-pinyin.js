import { SHOW_CHARACTER_NAME_PINYIN } from "./show-character-name-pinyin.js";
import { status as _status } from '../../../../status.js';
export const SHOW_SKILL_NAME_PINYIN = {
	name: "显示技能名注解",
	intro: "在武将资料卡显示技能名注解",
	get init() {
		return SHOW_CHARACTER_NAME_PINYIN.init;
	},
	get unfrequent() {
		return SHOW_CHARACTER_NAME_PINYIN.unfrequent;
	},
	get item() {
		return SHOW_CHARACTER_NAME_PINYIN.item;
	},
	get visualMenu() {
		return SHOW_CHARACTER_NAME_PINYIN.visualMenu;
	}
};
