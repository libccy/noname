import { get } from "../../get/index.js";
import { game } from "../../game/index.js";
import { lib } from "../index.js";
import { _status } from "../../status/index.js";
import { ui } from "../../ui/index.js";

export class Character {
	/** @type { string } */
	sex;
	/** @type { number } */
	hp;
	/** @type { number } */
	maxHp;
	/** @type { number } */
	hujia = 0;
	/** @type { string } */
	group;
	/** @type { string } */
	groupBorder;
	/** @type { string } */
	groupInGuozhan;
	/** @type { string[] } */
	skills = [];
	/** @type { boolean } */
	isZhugong = false;
	/** @type { boolean } */
	isUnseen = false;
	/** @type { boolean } */
	hasHiddenSkill = false;
	/** @type { Array } */
	trashBin = [];
	/** @type { string } */
	dualSideCharacter;
	/** @type { Array } */
	doubleGroup = [];
	/** @type { boolean } */
	isMinskin = false;
	/** @type { boolean } */
	isBoss = false;
	/** @type { boolean } */
	isHiddenBoss = false;
	/** @type { boolean } */
	isAiForbidden = false;
	/** @type { boolean } */
	isHiddenInStoneMode = false;
	/** @type { boolean } */
	isBossAllowed = false;
	/**
	 * @param { Array|Object } [data]
	 */
	constructor(data) {
		if (Array.isArray(data)) {
			this.sex = data[0];
			this.group = data[1];
			this.hp = get.infoHp(data[2]);
			this.maxHp = get.infoMaxHp(data[2]);
			this.hujia = get.infoHujia(data[2]);
			this.skills = get.copy(data[3] || []);
			this.trashBin = get.copy(data[4] || []);
			Character.convertTrashToProperties(this, this.trashBin);
		} else if (get.is.object(data)) {
			Object.assign(this, data);
			if (typeof this.maxHp !== "number") this.maxHp = this.hp;
		}
	}
	/**
	 * @param { Character } character
	 * @param { Array } trash
	 */
	static convertTrashToProperties(character, trash) {
		for (let i = 0; i < trash.length; i++) {
			let item = trash[i];
			if (i === 0 && lib.group.includes(item)) {
				character.groupInGuozhan = item;
			} else if (item === "zhu") {
				character.isZhugong = true;
			} else if (item === "unseen") {
				character.isUnseen = true;
			} else if (item === "minskin") {
				character.isMinskin = true;
			} else if (item === "boss") {
				character.isBoss = true;
			} else if (item === "bossallowed") {
				character.isBossAllowed = true;
			} else if (item === "hiddenBoss") {
				character.isHiddenBoss = true;
			} else if (item === "forbidai") {
				character.isAiForbidden = true;
			} else if (item === "stonehidden") {
				character.isHiddenInStoneMode = true;
			} else if (item === "hiddenSkill") {
				character.hasHiddenSkill = true;
			} else if (item.startsWith("border:")) {
				character.groupBorder = item.slice(7);
			} else if (item.startsWith("dualside:")) {
				character.dualSideCharacter = item.slice(9);
			} else if (item.startsWith("doublegroup:")) {
				character.doubleGroup = item.slice(12).split(":");
			}
		}
	}
	/**
	 * @deprecated
	 */
	get 0() {
		return this.sex;
	}
	set 0(sex) {
		this.sex = sex;
	}

	/**
	 * @deprecated
	 */
	get 1() {
		return this.group;
	}
	set 1(group) {
		this.group = group;
	}

	/**
	 * @deprecated
	 */
	get 2() {
		if (this.hujia > 0) return `${this.hp}/${this.maxHp}/${this.hujia}`;
		else if (this.hp !== this.maxHp) return `${this.hp}/${this.maxHp}`;
		return this.hp;
	}
	set 2(hp) {
		this.hp = get.infoHp(hp);
		this.maxHp = get.infoMaxHp(hp);
		this.hujia = get.infoHujia(hp);
	}

	/**
	 * @deprecated
	 */
	get 3() {
		return this.skills;
	}
	set 3(skills) {
		this.skills = skills;
	}

	/**
	 * @deprecated
	 */
	get 4() {
		return this.trashBin;
	}
	set 4(trashBin) {
		this.trashBin = trashBin;
	}
}
