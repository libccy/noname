export class Is extends Uninstantable {
    /**
     * 判断是否为进攻坐骑
     * @param { Card | VCard } card
     * @param { false | Player } [player]
     * @returns { boolean }
     */
    static attackingMount(card: Card | VCard, player?: false | Player): boolean;
    /**
     * 判断是否为防御坐骑
     * @param { Card | VCard } card
     * @param { false | Player } [player]
     * @returns { boolean }
     */
    static defendingMount(card: Card | VCard, player?: false | Player): boolean;
    /**
     * 判断坐骑栏是否被合并
     * @returns { boolean }
     */
    static mountCombined(): boolean;
    /**
     * 判断传入的参数的属性是否相同（参数可以为卡牌、卡牌信息、属性等）
     * @param {...} infos 要判断的属性列表
     * @param {boolean} every 是否判断每一个传入的属性是否完全相同而不是存在部分相同
     */
    static sameNature(...args: any[]): boolean;
    /**
     * 判断传入的参数的属性是否不同（参数可以为卡牌、卡牌信息、属性等）
     * @param ...infos 要判断的属性列表
     * @param every {boolean} 是否判断每一个传入的属性是否完全不同而不是存在部分不同
     */
    static differentNature(...args: any[]): boolean;
    /**
     * 判断一张牌是否为明置手牌
     * @param { Card } card
     */
    static shownCard(card: Card): boolean;
    /**
     * 是否是虚拟牌
     * @param { Card | VCard } card
     */
    static virtualCard(card: Card | VCard): boolean;
    /**
     * 是否是转化牌
     * @param { Card | VCard } card
     */
    static convertedCard(card: Card | VCard): boolean;
    /**
     * 是否是实体牌
     * @param { Card | VCard } card
     */
    static ordinaryCard(card: Card | VCard): boolean;
    /**
     * 押韵判断
     * @param { string } str1
     * @param { string } str2
     */
    static yayun(str1: string, str2: string): boolean;
    /**
     * @param { string } skill 技能id
     * @param { Player } player 玩家
     * @returns
     */
    static blocked(skill: string, player: Player): boolean;
    /**
     * 是否是双势力武将
     * @param { string } name
     * @param { string[] } array
     * @returns { boolean | string[] }
     */
    static double(name: string, array: string[]): boolean | string[];
    /**
     * Check if the card has a Yingbian condition
     *
     * 检测此牌是否具有应变条件
     * @param { Card | VCard } card
     */
    static yingbianConditional(card: Card | VCard): boolean;
    /**
     * @param { Card | VCard } card
     */
    static complexlyYingbianConditional(card: Card | VCard): boolean;
    /**
     * @param { Card | VCard } card
     */
    static simplyYingbianConditional(card: Card | VCard): boolean;
    /**
     * Check if the card has a Yingbian effect
     *
     * 检测此牌是否具有应变效果
     *
     * @param { Card | VCard } card
     */
    static yingbianEffective(card: Card | VCard): boolean;
    /**
     * @param { Card | VCard } card
     */
    static yingbian(card: Card | VCard): boolean;
    /**
     * @param { string } [substring]
     */
    static emoji(substring?: string): boolean;
    /**
     * @param { string } str
     */
    static banWords(str: string): boolean;
    /**
     * @param { GameEventPromise } event
     */
    static converted(event: GameEventPromise): boolean;
    static safari(): boolean;
    /**
     * @param { (Card | VCard)[]} cards
     */
    static freePosition(cards: (Card | VCard)[]): boolean;
    /**
     * @param { string } name
     * @param { boolean } item
     */
    static nomenu(name: string, item: boolean): boolean;
    static altered(skillName: any): boolean;
    /**
     * @param { any } obj
     * @returns { boolean }
     */
    static node(obj: any): boolean;
    /**
     * @param { any } obj
     */
    static div(obj: any): boolean;
    /**
     * @param { any } obj
     */
    static map(obj: any): boolean;
    /**
     * @param { any } obj
     */
    static set(obj: any): boolean;
    /**
     * @param { any } obj
     */
    static object(obj: any): boolean;
    /**
     * @overload
     * @param { Function } func
     * @returns { false }
     */
    static singleSelect(func: Function): false;
    /**
     * @overload
     * @param { number | [number, number] } func
     * @returns { boolean }
     */
    static singleSelect(func: number | [number, number]): boolean;
    /**
     * @param { string | Player } name
     */
    static jun(name: string | Player): boolean;
    static versus(): boolean;
    static changban(): boolean;
    static single(): boolean;
    /**
     * @param { Player } [player]
     */
    static mobileMe(player?: Player): boolean;
    static newLayout(): boolean;
    static phoneLayout(): boolean;
    static singleHandcard(): any;
    /**
     * @param { Player } player
     */
    static linked2(player: Player): boolean;
    /**
     * @param { {} } obj
     */
    static empty(obj: {}): boolean;
    /**
     * @param { string } str
     */
    static pos(str: string): boolean;
    /**
     * @param { string } skill
     * @param { Player } player
     * @returns
     */
    static locked(skill: string, player: Player): any;
    /**
     * @param { string } skill
     * @param { Player } player
     * @returns
     */
    static zhuanhuanji(skill: string, player: Player): boolean;
}
import { Uninstantable } from "../util/index.js";
