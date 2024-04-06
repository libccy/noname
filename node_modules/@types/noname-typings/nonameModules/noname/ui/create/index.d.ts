export class Create extends Uninstantable {
    /**
     * 创建身份牌实例
     */
    static identityCard(identity: any, position: any, noclick: any): import("../../library/element/card.js").Card;
    /**
     * 让卡牌旋转
     */
    static cardSpinning(card: any): void;
    /**
     * 旋转的身份牌！
     */
    static spinningIdentityCard(identity: any, dialog: any): void;
    /**
     * 创建codemirror编辑器
     * @param {HTMLDivElement} container
     * @param {Function} saveInput
     */
    static editor(container: HTMLDivElement, saveInput: Function): HTMLDivElement;
    static cardTempName(card: any, applyNode: any): any;
    static connectRooms(list: any): void;
    static rarity(button: any): void;
    static div(...args: any[]): HTMLDivElement;
    static filediv(...args: any[]): any;
    static node(...args: any[]): any;
    static iframe(src: any): void;
    static identitycircle(list: any, target: any): void;
    static chat(): void;
    static exit(): void;
    static connecting(bool: any): void;
    static roomInfo(): void;
    static templayer(time: any): void;
    static selectlist(list: any, init: any, position: any, onchange: any): HTMLSelectElement;
    /** 创建菜单 */
    static menu: typeof menu;
    /** 创建“开始”菜单 */
    static startMenu: (connectMenu: any) => HTMLDivElement;
    /** 创建“选项”菜单 */
    static optionsMenu: (connectMenu: any) => void;
    /** 创建“武将”菜单 */
    static characterPackMenu: (connectMenu: any) => (packName: string) => void;
    /** 创建“卡牌”菜单 */
    static cardPackMenu: (connectMenu: any) => (packName: string) => void;
    /** 创建“扩展”菜单 */
    static extensionMenu: (connectMenu: any) => void;
    /** 创建“其他”菜单 */
    static otherMenu: (connectMenu: any) => void;
    static statictable(...args: any[]): HTMLTableElement;
    static giveup(): void;
    static groupControl(dialog: any): import("../../library/element/control.js").Control;
    static cardDialog(...args: any[]): any;
    static characterDialog2(filter: any): import("../../library/element/dialog.js").Dialog;
    static characterDialog(...args: any[]): import("../../library/element/dialog.js").Dialog;
    static dialog(...args: any[]): import("../../library/element/dialog.js").Dialog;
    static line2(...args: any[]): any;
    static line(...args: any[]): HTMLDivElement;
    static switcher(name: any, current: any, current2: any, ...args: any[]): HTMLDivElement;
    static caption(str: any, position: any): HTMLDivElement;
    static control(...args: any[]): import("../../library/element/control.js").Control;
    static confirm(str: any, func: any): void;
    static skills(skills: any): import("../../library/element/control.js").Control;
    static skills2(skills: any): import("../../library/element/control.js").Control;
    static skills3(skills: any): import("../../library/element/control.js").Control;
    static arena(): void;
    static system(str: any, func: any, right: any, before: any): HTMLDivElement;
    static pause(): HTMLDivElement;
    static prebutton(item: any, type: any, position: any, noclick: any): HTMLDivElement;
    static buttonPresets: {
        /**
         * @returns { import("../library/index.js").Button }
         */
        tdnodes: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        blank: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        card: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        vcard: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        character: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        characterx: (item: any, type: any, position: any, noclick: any, node: any) => any;
        /**
         * @returns { import("../library/index.js").Button }
         */
        player: (item: any, type: any, position: any, noclick: any, node: any) => any;
    };
    static button(item: any, type: any, position: any, noClick: any, button: any): import("../../library/element/button.js").Button;
    static buttons(list: any, type: any, position: any, noclick: any, zoom: any): HTMLDivElement[];
    static textbuttons(list: any, dialog: any, noclick: any): void;
    static player(position: any, noclick: any): import("../../library/element/player.js").Player;
    static connectPlayers(ip: any): void;
    static players(numberOfPlayers: any): import("../../library/element/player.js").Player[];
    static me(hasme: any): void;
    static card(position: any, info: any, noclick: any): import("../../library/element/card.js").Card;
    static cardsAsync(...args: any[]): void;
    static cards(ordered: any): void;
}
import { Uninstantable } from "../../util/index.js";
import { menu } from "./menu/index.js";
