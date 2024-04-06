export class GameEvent {
    static initialGameEvent(): import("../index.js").GameEventPromise;
    /**
     * @param {string | GameEvent} [name]
     * @param {false} [trigger]
     */
    constructor(name?: string | GameEvent, trigger?: false);
    /**
     * @type { string }
     */
    name: string;
    step: number;
    finished: boolean;
    /**
     * @type {GameEventPromise[]}
     */
    next: GameEventPromise[];
    /**
     * @type {GameEventPromise[]}
     */
    after: GameEventPromise[];
    custom: {
        add: {};
        replace: {};
    };
    _aiexclude: any[];
    _notrigger: any[];
    /**
     * @type { Result }
     */
    _result: Result;
    _set: any[];
    /**
     * @type {boolean} 这个事件是否使用异步函数处理
     **/
    async: boolean;
    /**
     * @type {null|(event: GameEvent)=>any} 这个异步事件对应Promise的resolve函数
     **/
    resolve: (event: GameEvent) => any;
    _triggered: number;
    __args: any;
    /**
     * @type { Player }
     */
    source: Player;
    /**
     * @type { Player }
     */
    player: Player;
    /**
     * @type { Player }
     */
    target: Player;
    /**
     * @type { Player[] }
     */
    targets: Player[];
    /**
     * @type { Card }
     */
    card: Card;
    /**
     * @type { Card[] }
     */
    cards: Card[];
    /**
     * @type { string }
     */
    skill: string;
    /**
     * @type { boolean }
     */
    forced: boolean;
    /**
     * @type { number }
     */
    num: number;
    /**
     * @type { GameEvent }
     */
    _trigger: GameEvent;
    /**
     * @type { number }
     */
    baseDamage: number;
    /**
     * @type { Player }
     */
    customSource: Player;
    /**
     * @type { number }
     */
    extraDamage: number;
    /**
     * @type { string }
     */
    nature: string;
    /**
     * @type { boolean }
     */
    notrigger: boolean;
    /**
     * @type { number }
     */
    original_num: number;
    /**
     * @type { boolean }
     */
    unreal: boolean;
    /**
     * @type { Button[] }
     */
    excludeButton: Button[];
    /**
     * @type { Result }
     */
    result: Result;
    /**
     * @type { GameEventPromise | void | null }
     */
    parent: GameEventPromise | void | null;
    /**
     * @type { Function | void | null }
     */
    filterStop: Function | void | null;
    /**
     * @param {keyof this} key
     * @param {number} [value]
     * @param {number} [baseValue]
     */
    addNumber(key: keyof this, value?: number, baseValue?: number): this;
    /**
     * @param {keyof this} key
     * @param {number} [baseValue]
     */
    decrease(key: keyof this, baseValue?: number): this;
    /**
     * @param {keyof this} key
     * @param {number} [baseValue]
     */
    increase(key: keyof this, baseValue?: number): this;
    /**
     * @param {keyof this} key
     * @param {number} [value]
     * @param {number} [baseValue]
     */
    subtractNumber(key: keyof this, value?: number, baseValue?: number): this;
    /**
     * @param {Parameters<typeof this.hasHandler>[0]} type
     * @param {GameEvent} event
     * @param {{
     * state?: 'begin' | 'end';
     * }} option
     * @returns {this}
     */
    callHandler(type: Parameters<typeof this.hasHandler>[0], event: GameEvent, option: {
        state?: 'begin' | 'end';
    }): this;
    getDefaultHandlerType(): string;
    /**
     * @param {Parameters<typeof this.hasHandler>[0]} [type]
     * @returns {((event: GameEvent, option: {
     * state?: 'begin' | 'end';
     * }) => void)[]}
     */
    getHandler(type?: any): ((event: GameEvent, option: {
        state?: 'begin' | 'end';
    }) => void)[];
    /**
     * @param {`on${Capitalize<string>}`} [type]
     */
    hasHandler(type?: `on${Capitalize<string>}`): any;
    /**
     * @overload
     * @param {...((event: GameEvent, option: {
     * state?: 'begin' | 'end';
     * }) => void)[]} handlers
     * @returns {number}
     */
    pushHandler(...handlers: ((event: GameEvent, option: {
        state?: 'begin' | 'end';
    }) => void)[]): number;
    /**
     * @overload
     * @param {Parameters<typeof this.hasHandler>[0]} type
     * @param {...((event: GameEvent, option: {
     * state?: 'begin' | 'end';
     * }) => void)[]} handlers
     * @returns {number}
     */
    pushHandler(type: Parameters<typeof this.hasHandler>[0], ...handlers: ((event: GameEvent, option: {
        state?: 'begin' | 'end';
    }) => void)[]): number;
    changeToZero(): this;
    numFixed: boolean;
    finish(): this;
    putStepCache(key: any, value: any): this;
    _stepCache: {};
    getStepCache(key: any): any;
    clearStepCache(key: any): this;
    callFuncUseStepCache(prefix: any, func: any, params: any): any;
    putTempCache(key1: any, key2: any, value: any): any;
    _tempCache: {};
    getTempCache(key1: any, key2: any): any;
    cancel(arg1: any, arg2: any, notrigger: any): import("../index.js").GameEventPromise;
    neutralize(event: any): this;
    _neutralized: boolean;
    _neutralize_event: any;
    unneutralize(): this;
    directHit: boolean;
    goto(step: any): this;
    redo(): this;
    setHiddenSkill(skill: any): this;
    set(key: any, value: any, ...args: any[]): this;
    /**
     * @param {ArrayLike<Function> | Function | keyof typeof lib.element.content} item
     */
    setContent(item: ArrayLike<Function> | Function | keyof typeof lib.element.content): this;
    content: any;
    /**
     *
     * @param {Function | keyof typeof lib.element.contents} contents
     * @returns {GameEvent}
     */
    setContents(contents: Function | keyof typeof lib.element.contents): GameEvent;
    contents: (string | number | Function) & any[];
    getLogv(): any;
    send(): this;
    resume(): this;
    /**
     * 获取事件的父节点。
     * 获取事件链上的指定事件。
     * 默认获取上一个父节点（核心）。
     * @param {number|string|(evt:gameEvent)=>boolean} [level=1] 获取深度（number）/指定名字（string）/指定特征（function）
     * @param {boolean} [forced] 若获取不到节点，默认返回{}，若forced为true则返回null
     * @param {boolean} [includeSelf] 若level不是数字，指定搜索时是否包含事件本身
     * @returns {GameEvent|{}|null}
     */
    getParent(level?: string | number | ((evt: gameEvent) => boolean), forced?: boolean, includeSelf?: boolean): GameEvent | {} | null;
    getTrigger(): any;
    getRand(name: any): any;
    _rand_map: {};
    _rand: number;
    insert(content: any, map: any): import("../index.js").GameEventPromise;
    insertAfter(content: any, map: any): import("../index.js").GameEventPromise;
    backup(skill: any): this;
    _backup: any;
    filterButton: any;
    selectButton: any;
    filterTarget: any;
    selectTarget: any;
    ignoreMod: boolean;
    filterCard2: any;
    filterCard: any;
    filterOk: any;
    selectCard: any;
    position: any;
    complexSelect: any;
    complexCard: any;
    complexTarget: any;
    ai1: any;
    ai2: any;
    restore(): this;
    fakeforce: any;
    _buttonChoice: any;
    _cardChoice: any;
    _targetChoice: any;
    _skillChoice: any;
    isMine(): boolean;
    isOnline(): boolean;
    notLink(): boolean;
    isPhaseUsing(player: any): boolean;
    addTrigger(skills: any, player: any): this;
    removeTrigger(skills: any, player: any): this;
    trigger(name: any): import("../index.js").GameEventPromise;
    untrigger(all: boolean, player: any): this;
    /**
     * 事件转为Promise化
     *
     * @returns { GameEventPromise }
     */
    toPromise(): GameEventPromise;
    #private;
}
import { Library as lib } from "../index.js";
