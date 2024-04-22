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
    hujia;
    /** @type { string } */
    group;
    /** @type { string[] } */
    skills;
    /** @type { Array } */
    trashBin;
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
        }
        else if (get.is.object(data)) {
            this.sex = data.sex;
            this.group = data.group || '';
            this.hp = data.hp || 1;
            this.maxHp = data.maxHp || this.hp;
            this.hujia = data.hujia || 0;
            this.skills = get.copy(data.skills || []);
            this.trashBin = get.copy(data.trashBin || []);
        }
    };
    /**
     * @deprecated
     */
    get 0() {
        return this.sex;
    };
    set 0(sex) {
        this.sex = sex;
    };

    /**
     * @deprecated
     */
    get 1() {
        return this.group;
    };
    set 1(group) {
        this.group = group;
    };

    /**
     * @deprecated
     */
    get 2() {
        if (this.hujia > 0) return `${this.hp}/${this.maxHp}/${this.hujia}`;
        else if (this.hp !== this.maxHp) return `${this.hp}/${this.maxHp}`;
        return this.hp;
    };
    set 2(hp) {
        this.hp = get.infoHp(hp);
        this.maxHp = get.infoMaxHp(hp);
        this.hujia = get.infoHujia(hp);
    };

    /**
     * @deprecated
     */
    get 3() {
        return this.skills;
    };
    set 3(skills) {
        this.skills = skills;
    };

    /**
     * @deprecated
     */
    get 4() {
        return this.trashBin;
    };
    set 4(trashBin) {
        this.trashBin = trashBin;
    };
}