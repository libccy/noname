export class UI extends Uninstantable {
    static updates: any[];
    static thrown: any[];
    static touchlines: any[];
    static todiscard: {};
    /**
     * @type { HTMLStyleElement[] }
     */
    static playerPositions: HTMLStyleElement[];
    static create: typeof Create;
    static click: typeof Click;
    static selected: {
        /**
         * @type { Button[] }
         */
        buttons: Button[];
        /**
         * @type { Card[] }
         */
        cards: Card[];
        /**
         * @type { Player[] }
         */
        targets: Player[];
    };
    /**
     * @type { Dialog[] }
     */
    static dialogs: Dialog[];
    /**
     * @type { Dialog }
     */
    static dialog: Dialog;
    /**
     * @type { HTMLDivElement }
     */
    static arena: HTMLDivElement;
    /**
     * @type { Control[] }
     */
    static controls: Control[];
    /**
     * @type { Control }
     */
    static control: Control;
    /**
     * @type { Control | undefined }
     */
    static confirm: Control | undefined;
    /**
     * @type { Control | undefined }
     */
    static skills: Control | undefined;
    /**
     * @type { Control | undefined }
     */
    static skills1: Control | undefined;
    /**
     * @type { Control | undefined }
     */
    static skills2: Control | undefined;
    /**
     * @type { Control | undefined }
     */
    static skills3: Control | undefined;
    /**
     * @type { HTMLDivElement }
     */
    static window: HTMLDivElement;
    /**
     * @type { HTMLDivElement }
     */
    static pause: HTMLDivElement;
    /**
     * @type { HTMLAudioElement }
     */
    static backgroundMusic: HTMLAudioElement;
    /**
     * @type { HTMLDivElement }
     */
    static special: HTMLDivElement;
    /**
     * @type { HTMLDivElement }
     */
    static fakeme: HTMLDivElement;
    /**
     * @type { HTMLDivElement }
     */
    static chess: HTMLDivElement;
    /**
     * 手动在菜单栏中添加一个武将包的ui
     * @type { ((packName: string) => void)[] }
     */
    static updateCharacterPackMenu: ((packName: string) => void)[];
    /**
     * 手动在菜单栏中添加一个卡牌包的ui
     * @type { ((packName: string) => void)[] }
     */
    static updateCardPackMenu: ((packName: string) => void)[];
    /**
     * @type { HTMLDivElement } 挑战模式下正在操作的角色
     */
    static mebg: HTMLDivElement;
    static refresh(node: any): void;
    static clear(): void;
    static updatec(): void;
    static updatex(...args: any[]): void;
    static updatexr(): void;
    static updatejm(player: any, nodes: any, start: any, inv: any): void;
    static updatem(player: any): void;
    static updatej(player: any): void;
    static updatehl(): void;
    static updateh(compute: any): void;
    static updatehx(node: any): void;
    static updated(): void;
    static updatez(): void;
    static update(): void;
    static recycle(node: any, key: any): any;
    /**
     * @author curpond
     * @author Tipx-L
     * @param {number} [numberOfPlayers]
     */
    static updateConnectPlayerPositions(numberOfPlayers?: number): void;
    /**
     * @author curpond
     * @author Tipx-L
     * @param {number} [numberOfPlayers]
     */
    static updatePlayerPositions(numberOfPlayers?: number): void;
    static updateRoundNumber(roundNumber: any, cardPileNumber: any): void;
}
export const ui: typeof UI;
import { Uninstantable } from "../util/index.js";
import { Create } from "./create/index.js";
import { Click } from "./click/index.js";
