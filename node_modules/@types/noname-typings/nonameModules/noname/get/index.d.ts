export class Get extends Uninstantable {
    static is: typeof Is;
    /**
     * 获取当前内核版本信息
     *
     * 目前仅考虑`chrome`, `firefox`和`safari`三种浏览器的信息，其余均归于其他范畴
     *
     * > 其他后续或许会增加，但`IE`永无可能
     *
     * @returns {["firefox" | "chrome" | "safari" | "other", number, number, number]}
     */
    static coreInfo(): ["firefox" | "chrome" | "safari" | "other", number, number, number];
    /**
     * 返回 VCard[] 形式的所有牌，用于印卡将遍历
     * @param {Function} filter
     * @returns {string[][]}
     */
    static inpileVCardList(filter: Function): string[][];
    /**
     * 根据(Player的)座次数n（从1开始）获取对应的“n号位”翻译
     * @param {number | Player} seat
     */
    static seatTranslation(seat: number | Player): string;
    /**
     * @param {number} numberOfPlayers
     * @returns {string[]}
     */
    static identityList(numberOfPlayers: number): string[];
    /**
     * Generate an object URL from the Base64-encoded octet stream
     *
     * 从Base64编码的八位字节流生成对象URL
     */
    static objectURL(octetStream: any): any;
    /**
     * Get the card name length
     *
     * 获取此牌的字数
     */
    static cardNameLength(card: any, player: any): number;
    /**
     * Get the Yingbian conditions (of the card)
     *
     * 获取（此牌的）应变条件
     */
    static yingbianConditions(card: any): string[];
    static complexYingbianConditions(card: any): string[];
    static simpleYingbianConditions(card: any): string[];
    /**
     * Get the Yingbian effects (of the card)
     *
     * 获取（此牌的）应变效果
     */
    static yingbianEffects(card: any): string[];
    /**
     * Get the default Yingbian effect of the card
     *
     * 获取此牌的默认应变效果
     */
    static defaultYingbianEffect(card: any): any;
    /**
     * 优先度判断
     */
    static priority(skill: any): any;
    /**
     * 新装备栏相关
     *
     * 获取一张装备牌实际占用的装备栏(君曹操六龙)
     *
     * 用法同{@link subtype}，返回数组
     *
     * @param { string | Card | VCard | CardBaseUIData } obj
     * @param { false | Player } [player]
     * @returns { string[] }
     */
    static subtypes(obj: string | Card | VCard | CardBaseUIData, player?: false | Player): string[];
    /**
     * @returns { string[] }
     */
    static pinyin(chinese: any, withTone: any): string[];
    static yunmu(str: any): any;
    /**
     * 用于将参数转换为字符串，作为缓存的key。
     */
    static paramToCacheKey(...args: any[]): string;
    static yunjiao(str: any): string;
    /**
     * @param { string } skill
     * @param { Player } player
     * @returns { string[] }
     */
    static skillCategoriesOf(skill: string, player: Player): string[];
    static numOf(obj: any, item: any): any;
    static connectNickname(): any;
    static zhinangs(filter: any): any;
    static sourceCharacter(str: any): any;
    static isLuckyStar(player: any): boolean;
    static infoHp(hp: any): number;
    static infoMaxHp(hp: any): number;
    static infoHujia(hp: any): number;
    static bottomCards(num: any, putBack: any): any;
    static discarded(): any;
    static cardOffset(): number;
    static colorspan(str: any): any;
    static evtprompt(next: any, str: any): void;
    static autoViewAs(card: any, cards: any): import("../library/element/vcard.js").VCard;
    /**
     * @deprecated
     */
    static _autoViewAs(card: any, cards: any): any;
    static max(list: any, func: any, type: any): any;
    static min(list: any, func: any, type: any): any;
    /**
     * @overload
     * @param { string } name
     * @returns { Character }
     */
    static character(name: string): Character;
    /**
     * @template { 0 | 1 | 2 | 3 | 4 } T
     * @overload
     * @param { string } name
     * @param { T } num
     * @returns { Character[T] }
     */
    static character<T extends 0 | 1 | 2 | 3 | 4>(name: string, num: T): Character[T];
    static characterInitFilter(name: any): string[];
    static characterIntro(name: any): any;
    static bordergroup(info: any, raw: any): any;
    static groupnature(group: any, method: any): any;
    static sgn(num: any): 0 | 1 | -1;
    static rand(num: any, num2: any): any;
    static sort(arr: any, method: any, arg: any): any;
    static sortSeat(arr: any, target: any): any;
    static zip(callback: any): void;
    static delayx(num: any, max: any): number;
    static prompt(skill: any, target: any, player: any): string;
    static prompt2(skill: any, target: any, player: any, ...args: any[]): any;
    static url(master: any): string;
    static round(num: any, f: any): number;
    static playerNumber(): number;
    static benchmark(func1: any, func2: any, iteration: any, arg: any): number;
    static stringify(obj: any, level: any): any;
    /**
     * 深拷贝函数（虽然只处理了部分情况）
     *
     * 除了普通的Object和NullObject，均不考虑自行赋值的数据，但会原样将Symbol复制过去
     *
     * @template T
     * @param {T} obj - 要复制的对象，若不是对象则直接返回原值
     * @param {boolean} [copyKeyDeep = false] - 是否深复制`Map`的`key`
     * @param {WeakMap<object, unknown>} [map] - 拷贝用的临时存储，用于处理循环引用（请勿自行赋值）
     * @returns {T} - 深拷贝后的对象，若传入值不是对象则为传入值
     */
    static copy<T_1>(obj: T_1, copyKeyDeep?: boolean, map?: WeakMap<object, unknown>): T_1;
    static inpilefull(type: any): {
        name: any;
        suit: any;
        number: any;
        nature: any;
    }[];
    static inpile(type: any, filter: any): any[];
    static inpile2(type: any): any[];
    static typeCard(type: any, filter: any): string[];
    static libCard(filter: any): string[];
    static ip(): string;
    static modetrans(config: any, server: any): string;
    static charactersOL(func: any): number[];
    static trimip(str: any): any;
    static mode(): any;
    static idDialog(id: any): import("../library/element/dialog.js").Dialog;
    static arenaState(): {
        number: string;
        players: {};
        mode: any;
        dying: any[];
        servermode: any;
        roomId: any;
        over: boolean;
        inpile: any[];
        inpile_nature: any[];
        renku: any[];
    };
    static skillState(player: any): {
        global: string[];
    };
    static id(): string;
    static zhu(player: any, skill: any, group: any): any;
    static config(item: any, mode: any): any;
    static coinCoeff(list: any): number;
    static rank(name: any, num: any): number | "x" | "s" | "b" | "c" | "d" | "a" | "ap" | "am" | "bp" | "bm" | "sp";
    static skillRank(skill: any, type: any, grouped: any): number;
    static targetsInfo(targets: any): any[];
    static infoTargets(infos: any): import("../library/element/player.js").Player[];
    static cardInfo(card: any): any[];
    static cardsInfo(cards?: any[]): any[][];
    static infoCard(info: any): import("../library/element/card.js").Card;
    static infoCards(infos: any): import("../library/element/card.js").Card[];
    static cardInfoOL(card: any): string;
    static infoCardOL(info: any): any;
    static cardsInfoOL(cards: any): string[];
    static infoCardsOL(infos: any): any[];
    static playerInfoOL(player: any): string;
    static infoPlayerOL(info: any): any;
    static playersInfoOL(players: any): string[];
    static infoPlayersOL(infos: any): any[];
    static funcInfoOL(func: any): any;
    static infoFuncOL(info: any): any;
    static eventInfoOL(item: any, level: any, noMore: any): string;
    /**
     * @param {string} item
     */
    static infoEventOL(item: string): string | import("../library/element/gameEvent.js").GameEvent;
    static stringifiedResult(item: any, level: any, nomore: any): any;
    static parsedResult(item: any): any;
    static verticalStr(str: any, sp: any): string;
    static numStr(num: any, method: any): any;
    static rawName(str: any): any;
    /**
     * 作用修改：只读前缀 不读_ab
     */
    static rawName2(str: any): any;
    static slimNameHorizontal(str: any): any;
    /**
     * @param {string} prefix
     * @param {string} name
     * @returns {string}
     */
    static prefixSpan(prefix: string, name: string): string;
    static slimName(str: any): string;
    static time(): number;
    static utc(): number;
    static evtDistance(e1: any, e2: any): number;
    static xyDistance(from: any, to: any): number;
    /**
     * @overload
     * @returns { void }
     */
    static itemtype(): void;
    /**
     * @overload
     * @param { string } obj
     * @returns { 'position' | 'natures' | 'nature' }
     */
    static itemtype(obj: string): 'position' | 'natures' | 'nature';
    /**
     * @overload
     * @param { Player[] } obj
     * @returns { 'players' }
     */
    static itemtype(obj: Player[]): 'players';
    /**
     * @overload
     * @param { Card[] } obj
     * @returns { 'cards' }
     */
    static itemtype(obj: Card[]): 'cards';
    /**
     * @overload
     * @param { [number, number] } obj
     * @returns { 'select' }
     */
    static itemtype(obj: [number, number]): 'select';
    /**
     * @overload
     * @param { [number, number, number, number] } obj
     * @returns { 'divposition' }
     */
    static itemtype(obj: [number, number, number, number]): 'divposition';
    /**
     * @overload
     * @param { Button } obj
     * @returns { 'button' }
     */
    static itemtype(obj: Button): 'button';
    /**
     * @overload
     * @param { Card } obj
     * @returns { 'card' }
     */
    static itemtype(obj: Card): 'card';
    /**
     * @overload
     * @param { Player } obj
     * @returns { 'player' }
     */
    static itemtype(obj: Player): 'player';
    /**
     * @overload
     * @param { Dialog } obj
     * @returns { 'dialog' }
     */
    static itemtype(obj: Dialog): 'dialog';
    /**
     * @overload
     * @param { GameEvent | GameEventPromise } obj
     * @returns { 'event' }
     */
    static itemtype(obj: GameEvent | GameEventPromise): 'event';
    static equipNum(card: any): number;
    static objtype(obj: any): "object" | "div" | "array" | "table" | "tr" | "td" | "fragment";
    static type(obj: any, method: any, player: any): any;
    static type2(card: any, player: any): any;
    /**
     *
     * @param { string | Card | VCard | CardBaseUIData } obj
     * @param { false | Player } [player]
     * @returns { string }
     */
    static subtype(obj: string | Card | VCard | CardBaseUIData, player?: false | Player): string;
    static equiptype(card: any, player: any): number;
    /**
     *
     * @param { Card | VCard | CardBaseUIData } card
     * @param { false | Player } [player]
     * @returns { string }
     */
    static name(card: Card | VCard | CardBaseUIData, player?: false | Player): string;
    /**
     * @param {Card | VCard | Card[] | VCard[]} card
     * @param {false | Player} [player]
     * @returns {string}
     */
    static suit(card: Card | VCard | Card[] | VCard[], player?: false | Player): string;
    /**
     * @param {Card | VCard | Card[] | VCard[]} card
     * @param {false | Player} [player]
     * @returns {string}
     */
    static color(card: Card | VCard | Card[] | VCard[], player?: false | Player): string;
    /**
     * @param {Card | VCard} card
     * @param {false | Player} [player]
     * @returns {number}
     */
    static number(card: Card | VCard, player?: false | Player): number;
    /**
     * 返回一张杀的属性。如有多种属性则用`lib.natureSeparator`分割开来。例：火雷【杀】的返回值为`fire|thunder`
     * @param {string | string[] | Card | VCard} card
     * @param {false | Player} [player]
     * @returns {string}
     */
    static nature(card: string | string[] | Card | VCard, player?: false | Player): string;
    /**
     * 返回包含所有属性的数组
     * @param {string[] | string} card
     * @param {false | Player} [player]
     * @returns {string[]}
     */
    static natureList(card: string[] | string, player?: false | Player): string[];
    static cards(num: any, putBack: any): any;
    static judge(card: any): any;
    static judge2(card: any): any;
    static distance(from: any, to: any, method: any): number;
    /**
     * @overload
     * @param { string } item
     * @returns { Skill }
     */
    static info(item: string): Skill;
    /**
     * @overload
     * @param { Card | VCard | CardBaseUIData } item
     * @param { Player | false } [player]
     * @returns { any }
     */
    static info(item: Card | VCard | CardBaseUIData, player?: Player | false): any;
    /**
     * @param { number | Select | (()=>Select) } [select]
     * @returns { Select }
     */
    static select(select?: number | Select | (() => Select)): Select;
    static card(original: any): any;
    /**
     * @overload
     * @returns {GameEvent}
     */
    static event(): GameEvent;
    /**
     * @template { keyof GameEvent } T
     * @overload
     * @param {T} key
     * @returns {GameEvent[T]}
     */
    static event<T_2 extends keyof import("../library/element/gameEvent.js").GameEvent>(key: T_2): import("../library/element/gameEvent.js").GameEvent[T_2];
    static player(): import("../library/element/player.js").Player;
    static players(sort: any, dead: any, out: any): import("../library/element/player.js").Player[];
    static position(card: any, ordering: any): number | "x" | "s" | "e" | "j" | "h" | "c" | "d" | "o";
    static skillTranslation(str: any, player: any): string;
    static skillInfoTranslation(name: any, player: any): any;
    /**
     * @returns {string}
     */
    static translation(str: any, arg: any): string;
    static menuZoom(): any;
    static strNumber(num: any): any;
    static cnNumber(num: any, ordinal: any): any;
    /**
     * 遍历子元素
     * @param {HTMLElement} node
     * @returns {Iterable<HTMLElement>} 迭代器
     */
    static iterableChildNodes(node: HTMLElement, ...args: any[]): Iterable<HTMLElement>;
    /**
     * @param {((a: Button, b: Button) => number)} [sort] 排序函数
     * @returns { Button[] }
     */
    static selectableButtons(sort?: (a: Button, b: Button) => number): Button[];
    /**
     * @param {((a: Card, b: Card) => number)} [sort] 排序函数
     * @returns { Card[] }
     */
    static selectableCards(sort?: (a: Card, b: Card) => number): Card[];
    /**
     * @returns { string[] } 技能名数组
     */
    static skills(): string[];
    static gainableSkills(func: any, player: any): any[];
    static gainableSkillsName(name: any, func: any): any[];
    static gainableCharacters(func: any): string[];
    /**
     * @param {((a: Player, b: Player) => number)} [sort] 排序函数
     * @returns { Player[] }
     */
    static selectableTargets(sort?: (a: Player, b: Player) => number): Player[];
    static filter(filter: any, i: any): any;
    static cardCount(card: any, player: any): any;
    static skillCount(skill: any, player: any): any;
    static owner(card: any, method: any): import("../library/element/player.js").Player;
    static noSelected(): boolean;
    static population(identity: any): number;
    static totalPopulation(identity: any): number;
    /**
     * @param { Card | VCard } item
     */
    static cardtag(item: Card | VCard, tag: any): any;
    static tag(item: any, tag: any, item2: any, bool: any): any;
    static sortCard(sort: any): (card: any) => any;
    static difficulty(): 2 | 1 | 3;
    static cardPile(name: any, create: any): any;
    static cardPile2(name: any): any;
    static discardPile(name: any): any;
    static aiStrategy(): 2 | 1 | 3 | 4 | 5 | 6;
    static skillintro(name: any, learn: any, learn2: any): string;
    static intro(name: any): string;
    static storageintro(type: any, content: any, player: any, dialog: any, skill: any): any;
    static nodeintro(node: any, simple: any, evt: any): import("../library/element/dialog.js").Dialog;
    static linkintro(dialog: any, content: any, player: any): void;
    static groups(): string[];
    static types(): any[];
    static links(buttons: any): any[];
    static threaten(target: any, player: any, hp: any): number;
    static condition(player: any): any;
    static attitude(from: any, to: any, ...args: any[]): any;
    static sgnAttitude(...args: any[]): 0 | 1 | -1;
    static useful_raw(card: any, player: any): any;
    static useful(card: any, player: any): any;
    static unuseful(card: any): number;
    static unuseful2(card: any): number;
    static unuseful3(card: any): number;
    static value(card: any, player: any, method: any): any;
    static equipResult(player: any, target: any, name: any): number;
    static equipValue(card: any, player: any): number;
    static equipValueNumber(card: any): number;
    static disvalue(card: any, player: any): number;
    static disvalue2(card: any, player: any): number;
    static skillthreaten(skill: any, player: any, target: any): number | void;
    static cacheOrder(item: any): number;
    /**
     * @returns { number }
     */
    static order(item: any, player?: import("../library/element/player.js").Player): number;
    static result(item: any, skill: any): any;
    static cacheEffectUse(target: any, card: any, player: any, player2: any, isLink: any): number;
    static effect_use(target: any, card: any, player: any, player2: any, isLink: any): number;
    static cacheEffect(target: any, card: any, player: any, player2: any, isLink: any): number;
    static effect(target: any, card: any, player: any, player2: any, isLink: any): number;
    static damageEffect(target: any, player: any, viewer: any, nature: any): any;
    /**
     *
     * @param {any} source 如果参数是function，执行此函数并返回结果，传参为此方法剩余的参数。如果参数不是function，直接返回结果。
     * @returns 返回的结果
     */
    static dynamicVariable(source: any, ...args: any[]): any;
    static recoverEffect(target: any, player: any, viewer: any): number;
    static buttonValue(button: any): number;
    static attitude2(to: any): any;
}
export const get: typeof Get;
export { Is };
import { Uninstantable } from "../util/index.js";
import { Is } from "./is.js";
