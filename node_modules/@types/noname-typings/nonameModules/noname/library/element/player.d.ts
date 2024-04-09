export class Player extends HTMLDivElement {
    /**
     * @param {HTMLDivElement|DocumentFragment} [position]
     */
    constructor(position?: HTMLDivElement | DocumentFragment);
    build(noclick: any): this;
    buildNode(): void;
    /** @type { SMap<HTMLDivElement> } */
    node: SMap<HTMLDivElement>;
    buildExtra(): void;
    buildProperty(): void;
    /**
     * @type { number }
     */
    phaseNumber: number;
    /**
     * @type { string[] }
     */
    skipList: string[];
    /**
     * @type { string[] }
     */
    skills: string[];
    /**
     * @type { string[] }
     */
    invisibleSkills: string[];
    /**
     * @type { string[] }
     */
    initedSkills: string[];
    /**
     * @type { SMap<string[]> }
     */
    additionalSkills: SMap<string[]>;
    /**
     * @type { SMap<string[]> }
     */
    disabledSkills: SMap<string[]>;
    /**
     * @type { string[] }
     */
    hiddenSkills: string[];
    /**
     * @type { string[] }
     */
    awakenedSkills: string[];
    /**
     * @type { SMap<string[]> }
     */
    forbiddenSkills: SMap<string[]>;
    /**
     * @type { any[] }
     */
    popups: any[];
    /**
     * @type { any[] }
     */
    damagepopups: any[];
    /**
     * @type { Card[] }
     */
    judging: Card[];
    /**
     * @type { { card:{}, skill: {} }[] }
     */
    stat: {
        card: {};
        skill: {};
    }[];
    /**
     * @type { {
     * 	useCard: GameEventPromise[],
     * 	respond: GameEventPromise[],
     * 	skipped: GameEventPromise[],
     * 	lose: GameEventPromise[],
     * 	gain: GameEventPromise[],
     * 	sourceDamage: GameEventPromise[],
     * 	damage: GameEventPromise[],
     * 	custom: GameEventPromise[],
     * 	useSkill: GameEventPromise[],
     * }[] }
     */
    actionHistory: {
        useCard: GameEventPromise[];
        respond: GameEventPromise[];
        skipped: GameEventPromise[];
        lose: GameEventPromise[];
        gain: GameEventPromise[];
        sourceDamage: GameEventPromise[];
        damage: GameEventPromise[];
        custom: GameEventPromise[];
        useSkill: GameEventPromise[];
    }[];
    /**
     * @type { SMap<string[]> }
     */
    tempSkills: SMap<string[]>;
    /**
     * @type { SMap<any> }
     */
    storage: SMap<any>;
    /**
     * @type { SMap<HTMLDivElement> }
     */
    marks: SMap<HTMLDivElement>;
    /**
     * @type { SMap<number> }
     */
    expandedSlots: SMap<number>;
    /**
     * @type { SMap<number> }
     */
    disabledSlots: SMap<number>;
    /**
     * @type { {
     * 	friend: [],
     * 	enemy: [],
     * 	neutral: [],
     * 	handcards: {
     * 		global: [],
     * 		source: [],
     * 		viewed: []
     * 	}
     * } }
     */
    ai: {
        friend: [];
        enemy: [];
        neutral: [];
        handcards: {
            global: [];
            source: [];
            viewed: [];
        };
    };
    /**
     * @type { number }
     */
    queueCount: number;
    /**
     * @type { number }
     */
    outCount: number;
    buildEventListener(noclick: any): void;
    noclick: boolean;
    /**
     * @type { number }
     */
    maxHp: number;
    /**
     * @type { number }
     */
    hp: number;
    /**
     * @type { number }
     */
    hujia: number;
    /**
     * @type { number }
     */
    seatNum: number;
    /**
     * @type { Player }
     */
    nextSeat: Player;
    /**
     * @type { Player }
     */
    next: Player;
    /**
     * @type { Player }
     */
    previousSeat: Player;
    /**
     * @type { Player }
     */
    previous: Player;
    /**
     * @type { string }
     */
    name: string;
    /**
     * @type { string }
     */
    name1: string;
    /**
     * @type { string }
     */
    name2: string;
    /**
     * @type { any[] }
     */
    tempname: any[];
    /**
     * @type { string }
     */
    sex: string;
    /**
     * @type { string }
     */
    group: string;
    /**
     * @type { ((player: this) => any)[] }
     */
    inits: ((player: this) => any)[];
    /**
     * @type { ((player: this) => any)[] }
     */
    _inits: ((player: this) => any)[];
    /**
     * 怒气
     * @param { number } amount
     * @param { boolean } [limit]
     */
    changeFury(amount: number, limit?: boolean): void;
    /**
     * version 1.7
     *
     * 链式创建一次性技能的api。
     *
     * 使用者只需要关注技能的效果，而不是技能的本身。
     *
     * v1.7 可传递作用域
     * @example
     * ```js
     * (function () {
     * 	let _var = 1;
     * 	let me = player;
     * 	player.when('drawAfter')
     * 		.apply(code => eval(code))
     * 		.then(() => console.log(_var))
     * 		.then('me.gainMaxHp(5)');
     * })();
     * ```
     */
    when(...args: any[]): {
        /**
         * @param { Required<Skill>['filter'] } fun
         */
        filter(fun: Required<Skill>['filter']): any;
        /**
         * @param { Required<Skill>['filter'] } fun
         */
        removeFilter(fun: Required<Skill>['filter']): any;
        /**
         * @param { Required<Skill>['filter'] } fun
         */
        filter2(fun: Required<Skill>['filter']): any;
        /**
         * @param { Required<Skill>['filter'] } fun
         */
        removeFilter2(fun: Required<Skill>['filter']): any;
        /**
         * @param { Required<Skill>['content'] } fun
         */
        then(fun: Required<Skill>['content']): any;
        /**
         * @param { string } str
         */
        popup(str: string): any;
        /**
         * @param { string } translation
         */
        translation(translation: string): any;
        /**
         * @param { SMap<any> } obj
         */
        assign(obj: SMap<any>): any;
        /**
         * @param { SMap<any> } arg
         */
        vars(arg: SMap<any>): any;
        /**
         * 传递外部作用域
         *
         * 一般是传递一个 code=>eval(code) 函数
         *
         * 传递后可在then中使用外部变量(vars的上位替代)
         *
         * @param {Function} _scope
         */
        apply(_scope: Function): any;
        /**
         * 获得技能
         * 如果instantlyAdd为false，则需要以此法获得技能
         **/
        finish(): any;
    };
    /**
     * 让一名角色明置一些手牌
     */
    addShownCards(...args: any[]): import("../index.js").GameEventPromise;
    hideShownCards(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * 获取角色所有的明置手牌
     */
    getShownCards(): import("./card.js").Card[];
    /**
     * 获取该角色被other所知的牌
     * @param { Player } [other]
     * @param { (card: Card) => boolean } [filter]
     */
    getKnownCards(other?: Player, filter?: (card: Card) => boolean): import("./card.js").Card[];
    /**
     * 判断此角色的手牌是否已经被看光了
     * @param { Player } [other]
     */
    isAllCardsKnown(other?: Player): boolean;
    /**
     * 判断此角色是否有被知的牌。
     * @param { Player } [other]
     * @param { (card: Card) => boolean } [filter]
     */
    hasKnownCards(other?: Player, filter?: (card: Card) => boolean): boolean;
    /**
     * 数此角色被知道的牌
     * @param { Player } [other]
     * @param { (card: Card) => boolean } [filter]
     */
    countKnownCards(other?: Player, filter?: (card: Card) => boolean): number;
    /**
     * Execute the delay card effect
     *
     * 执行延时锦囊牌效果
     * @param { Card | string } card
     * @param { Player } target
     * @param {*} judge
     * @param {*} judge2
     * @returns
     */
    executeDelayCardEffect(card: Card | string, target: Player, judge: any, judge2: any, ...args: any[]): import("../index.js").GameEventPromise;
    /**
     * Check if the card does not count toward hand limit
     *
     * 检测此牌是否不计入手牌上限
     * @param { Card } card
     */
    canIgnoreHandcard(card: Card): boolean;
    /**
     * Gift
     *
     * 赠予
     * @param { Card | Card[] } cards
     * @param { Player } target
     */
    gift(cards: Card | Card[], target: Player, ...args: any[]): import("../index.js").GameEventPromise;
    /**
     * Check if the player can gift the card
     *
     * 检测角色是否能赠予此牌
     * @param { Card } card
     * @param { Player } target
     * @param { boolean } [strict]
     */
    canGift(card: Card, target: Player, strict?: boolean): boolean;
    /**
     * Check if the player refuses gifts
     *
     * 检测角色是否拒绝赠予
     * @param { Card } card
     * @param { Player } player
     */
    refuseGifts(card: Card, player: Player): boolean;
    /**
     * Gift AI related
     *
     * 赠予AI相关
     * @param { Card } card
     * @param { Player } target
     */
    getGiftAIResultTarget(card: Card, target: Player): number;
    /**
     * @param { Card } card
     * @param { Player } target
     */
    getGiftEffect(card: Card, target: Player): number;
    /**
     * 重铸
     * @param { Card | Card[] } cards
     * @param { (player: Player, cards: Card[]) => any } [recastingLose]
     * @param { (player: Player, cards: Card[]) => any } [recastingGain]
     */
    recast(cards: Card | Card[], recastingLose?: (player: Player, cards: Card[]) => any, recastingGain?: (player: Player, cards: Card[]) => any, ...args: any[]): import("../index.js").GameEventPromise;
    /**
     * Check if the player can recast the card
     *
     * 检测角色是否能重铸此牌
     * @param { Card } card
     * @param { Player } [source]
     * @param { boolean } [strict]
     */
    canRecast(card: Card, source?: Player, strict?: boolean): boolean;
    /**
     * 判断一名角色的某个区域是否被废除
     *
     * type为要判断的区域 若为空 则判断玩家是否有任意一个被废除的区域
     * @param { string | number } [type]
     * @returns { boolean }
     */
    hasDisabledSlot(type?: string | number): boolean;
    /**
     * 判断一名角色的某个区域被废除的数量
     *
     * 用法同 {@link hasDisabledSlot}
     * @param { string | number } [type]
     */
    countDisabledSlot(type?: string | number): number;
    /**
     * 判断一名角色是否有某个装备栏空着
     * @param { string | number } [type]
     * @returns { boolean }
     */
    hasEmptySlot(type?: string | number): boolean;
    /**
     * 判断一名角色的某个装备栏空位的数量
     * @param { string | number } [type]
     */
    countEmptySlot(type?: string | number): number;
    /**
     * 判断一名角色是否有可以用于装备新装备牌的区域（排除金箍棒和六龙等“不可被替换装备”）
     *
     * 用法同 {@link hasEnabledSlot}
     * @param { string | number } [type]
     */
    hasEquipableSlot(type?: string | number): boolean;
    /**
     * 统计一名角色有多少个可以用于装备新的装备牌的区域
     *
     * 用法同 {@link hasEnabledSlot}
     * @param { string | number } [type]
     */
    countEquipableSlot(type?: string | number): number;
    /**
     * 判断一名角色是否拥有未被废除的某个区域
     *
     * type为要判断的区域 若为空 则判断玩家是否有任意一个未被废除的区域
     * @param { string | number } [type]
     * @returns { boolean }
     */
    hasEnabledSlot(type?: string | number): boolean;
    /**
     * 判断一名角色的某个区域未被废除的数量
     *
     * 用法同 {@link hasEnabledSlot}
     * @param { string | number } [type]
     */
    countEnabledSlot(type?: string | number): number;
    /**
     * 获取一名角色装备区内某种类型的装备牌
     *
     * 参数可以为数字/区域字符串/实体牌/虚拟牌/牌名
     * @param { number | string | Card | VCard } subtype
     * @returns { Card[] }
     */
    getEquips(subtype: number | string | Card | VCard): Card[];
    /**
     * 新的废除装备区
     *
     * 参数：废除来源角色（不写默认当前事件角色），废除区域（数字/区域字符串/数组，可以写多个，重复废除）
     */
    disableEquip(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * 新的恢复装备区
     *
     * 参数：恢复来源角色（不写默认当前事件角色），恢复区域（数字/区域字符串/数组，可以写多个，重复恢复）
     */
    enableEquip(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * 新的扩展装备区
     *
     * 参数：扩展来源角色（不写默认当前事件角色），扩展区域（数字/区域字符串/数组，可以写多个，重复扩展）
     */
    expandEquip(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * 判断判定区是否被废除
     */
    isDisabledJudge(): boolean;
    /**
     * 同步显示扩展装备区状态
     * @param { SMap<number> } [map]
     */
    $syncExpand(map?: SMap<number>): void;
    /**
     * 同步装备区废除牌显示状态
     * @param { SMap<number> } [map]
     */
    $syncDisable(map?: SMap<number>): void;
    /**
     * @param { string | Card | VCard | CardBaseUIData } name
     * @param { boolean } [replace]
     * @returns
     */
    canEquip(name: string | Card | VCard | CardBaseUIData, replace?: boolean): boolean;
    /**
     * @deprecated
     */
    countDisabled(...args: any[]): number;
    /**
     * @deprecated
     */
    isDisabled(arg: any): boolean;
    /**
     * @deprecated
     */
    isEmpty(num: any): boolean;
    /**
     * @deprecated
     */
    $disableEquip(): void;
    /**
     * @deprecated
     */
    $enableEquip(): void;
    chooseToDebate(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * 向target发起协力
     * @param { Player } target
     * @param {*} type
     * @param {*} reason
     */
    cooperationWith(target: Player, type: any, reason: any): void;
    chooseCooperationFor(...args: any[]): import("../index.js").GameEventPromise;
    checkCooperationStatus(target: any, reason: any): boolean;
    removeCooperation(info: any): void;
    /**
     * @param { string } clan 氏族名称
     * @param { boolean } unseen 是否无视暗将的限制
     */
    hasClan(clan: string, unseen: boolean): boolean;
    /**
     * @param { string } skill
     */
    changeZhuanhuanji(skill: string): void;
    /**
     * @param { string } skill
     */
    $changeZhuanhuanji(skill: string): void;
    /**
     * @param { number } num
     */
    setSeatNum(num: number): void;
    getSeatNum(): number;
    /**
     * 是否拥有某一性别
     * @param { string } sex
     */
    hasSex(sex: string): boolean;
    /**
     * 是否和target同一性别
     * @param { Player } target
     */
    sameSexAs(target: Player): boolean;
    /**
     * 是否和target不同性别
     * @param { Player } target
     */
    differentSexFrom(target: Player): boolean;
    /**
     * @param { string } skill
     */
    addSkillBlocker(skill: string): void;
    /**
     * @param { string } skill
     */
    removeSkillBlocker(skill: string): void;
    loseToSpecial(cards: any, tag: any, target: any): import("../index.js").GameEventPromise;
    /**
     * @param { Card | Card[] } cards
     * @param { string } tag
     */
    addGaintag(cards: Card | Card[], tag: string): void;
    /**
     * @param { string } tag
     * @param { Card[] } [cards]
     */
    removeGaintag(tag: string, cards?: Card[]): void;
    /**
     * @param { Player } target
     */
    canSave(target: Player): boolean;
    /**
     * @param { Card } card
     * @param { Player } target
     */
    canSaveCard(card: Card, target: Player): any;
    /**
     * @param { String } from
     * @param { String } to
     * @returns { GameEventPromise }
     */
    reinitCharacter(from: string, to: string, log?: boolean): GameEventPromise;
    /**
     * @param { String[] } newPairs
     * @returns { GameEventPromise }
     */
    changeCharacter(newPairs: string[], log?: boolean): GameEventPromise;
    /**
     * @param { 0 | 1 | 2 } num
     * @param { false } [log]
     */
    showCharacter(num: 0 | 1 | 2, log?: false, ...args: any[]): import("../index.js").GameEventPromise;
    /**
     * @param { 0 | 1 | 2 } num
     * @param { false } [log]
     */
    $showCharacter(num: 0 | 1 | 2, log?: false): void;
    chooseToPlayBeatmap(beatmap: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseToMove(...args: any[]): import("../index.js").GameEventPromise;
    chooseToGuanxing(num: any): import("../index.js").GameEventPromise;
    /**
     * @param { Player } target
     * @param { string } name
     * @param {*} rotate
     */
    $throwEmotion(target: Player, name: string, rotate: any): void;
    /**
     * @param { boolean } bool
     */
    tryJudgeAnimate(bool: boolean): void;
    /**
     * @param { string } name
     * @param { string } popname
     * @param { 'main' | 'vice' | boolean } checkShow
     */
    trySkillAnimate(name: string, popname: string, checkShow: 'main' | 'vice' | boolean, ...args: any[]): void;
    /**
     * @param { Card } card
     * @param { string } name
     * @param { string } [nature]
     * @param { string } [popname]
     */
    tryCardAnimate(card: Card, name: string, nature?: string, popname?: string, ...args: any[]): void;
    /**
     * @param { string } name
     * @param { string } type
     */
    hasUsableCard(name: string, type: string): boolean;
    /**
     * @param { Player } to
     * @returns { boolean }
     */
    inRange(to: Player): boolean;
    /**
     * @param { Player } source
     */
    inRangeOf(source: Player): boolean;
    /**
     * Get the player's HP not less than 0. Set “raw” to true to get the player's raw HP instead.
     *
     * 获取角色的体力值。设置“raw”为true以获取角色的体力。
     *
     * @param { boolean } [raw]
     */
    getHp(raw?: boolean): number;
    /**
     * Set “raw” to true to get the player's raw damaged HP instead.
     *
     * 设置“raw”为true以获取角色已损失的体力。
     *
     * @param { boolean } [raw]
     */
    getDamagedHp(raw?: boolean): number;
    /**
     * @param { string } group
     */
    changeGroup(group: string, log: any, broadcast: any, ...args: any[]): import("../index.js").GameEventPromise;
    /**
     * @param { Player } target
     */
    chooseToDuiben(target: Player): import("../index.js").GameEventPromise;
    /**
     * @param { Player } target
     */
    chooseToPSS(target: Player): import("../index.js").GameEventPromise;
    chooseToEnable(...args: any[]): import("../index.js").GameEventPromise;
    chooseToDisable(...args: any[]): import("../index.js").GameEventPromise;
    /**
     * @param { boolean } [notmeisok]
     */
    isPhaseUsing(notmeisok?: boolean): boolean;
    /**
     * @param { Player } target
     */
    swapEquip(target: Player): import("../index.js").GameEventPromise;
    /**
     * @param { Player } target
     * @param { boolean } [goon]
     * @param { boolean} [bool]
     */
    canCompare(target: Player, goon?: boolean, bool?: boolean): boolean;
    $disableJudge(): void;
    $enableJudge(): void;
    disableJudge(): import("../index.js").GameEventPromise;
    enableJudge(): import("../index.js").GameEventPromise;
    init(character: any, character2: any, skill: any, update: any): this;
    skin: {
        name: any;
        name2: any;
    };
    singleHp: boolean;
    $init(character: any, character2: any): this;
    /**
     * 换肤换音：想要支持某个武将更换皮肤，必须在lib.character.characterSubstitute中存在该武将的id（以下以name代指武将id，character代指换肤图片名）
     *
     * 如果换肤换音引用本体的image/character素材作为更换的皮肤且不需要使用本体audio/die以外的地方的配音，则你无需在characterSubstitute中书写关于此皮肤的信息
     *
     * 如果lib.character[character]不存在，且想引用其他路径的图片素材或阵亡素材，请以[character,[]]的形式写入lib.character.characterSubstitute[name]中，第二个数组填入形式同lib.character[4]的书写形式
     *
     * @param { string | object | function } map
     * @param { string } character
     */
    changeSkin(map: string | object | Function, character: string): void;
    changeSkinByName(character: any, index: any): void;
    initOL(name: any, character: any): void;
    nickname: any;
    avatar: any;
    uninitOL(): void;
    initRoom(info: any, info2: any): this;
    serving: boolean;
    roomempty: boolean;
    roomfull: boolean;
    roomgaming: boolean;
    version: any;
    key: any;
    config: any;
    reinit2(newPairs: any): void;
    $reinit12(newPairs: any): void;
    $reinit21(newPairs: any): void;
    reinit(from: any, to: any, maxHp: any, online: any): this;
    $reinit(from: any, to: any, maxHp: any, online: any): void;
    uninit(): this;
    $uninit(): void;
    getLeft(): number;
    getTop(): number;
    smoothAvatar(vice: any, video: any): void;
    changeSeat(position: any, video: any): void;
    send(...args: any[]): this;
    getId(): this;
    playerid: string;
    throwEmotion(target: any, emotion: any, rotate: any): void;
    emotion(pack: any, id: any): void;
    chat(str: any): void;
    say(str: any): void;
    showGiveup(): void;
    _giveUp: boolean;
    applySkills(skills: any): void;
    getState(): {
        hp: number;
        maxHp: number;
        nickname: any;
        sex: string;
        group: string;
        name: string;
        name1: string;
        name2: string;
        handcards: import("./card.js").Card[];
        gaintag: any[];
        equips: import("./card.js").Card[];
        judges: import("./card.js").Card[];
        specials: import("./card.js").Card[];
        expansions: import("./card.js").Card[];
        expansion_gaintag: any[];
        disableJudge: boolean;
        disabledSlots: SMap<number>;
        expandedSlots: SMap<number>;
        views: any[];
        position: number;
        hujia: number;
        side: any;
        identityShown: any;
        identityNode: string[];
        identity: any;
        dead: boolean;
        linked: boolean;
        turnedover: boolean;
        out: boolean;
        phaseNumber: number;
        unseen: boolean;
        unseen2: boolean;
        seatNum: number;
    };
    setNickname(str: any): this;
    setAvatar(name: any, name2: any, video: any, fakeme: any): void;
    setAvatarQueue(name: any, list: any): void;
    flashAvatar(skill: any, name: any): void;
    update(...args: any[]): void;
    $update(...args: any[]): this;
    clearMark(i: any, log: any): void;
    removeMark(i: any, num: any, log: any): void;
    addMark(i: any, num: any, log: any): void;
    setMark(name: any, num: any, log: any): void;
    /**
     * @param {*} i
     * @returns { number }
     */
    countMark(i: any): number;
    hasMark(i: any): boolean;
    updateMark(i: any, storage: any): this;
    updateMarks(connect: any): void;
    num(arg1: any, arg2: any, arg3: any): any;
    line(target: any, config: any): void;
    line2(targets: any, config: any): void;
    getNext(): this;
    getPrevious(): this;
    countUsed(card: any, type: any): number;
    getCacheKey(): string;
    countSkill(skill: any): any;
    getStockSkills(unowned: any, unique: any, hidden: any): any[];
    /**
     * @param { string } [arg1='h']
     * @param { string | Record<string, any> | ((card: Card) => boolean) } [arg2]
     * @returns { Iterable<Card> }
     */
    iterableGetCards(arg1?: string, arg2?: string | Record<string, any> | ((card: Card) => boolean)): Iterable<Card>;
    /**
     * @param { string } [arg1='h']
     * @param { string | Record<string, any> | ((card: Card) => boolean) } [arg2]
     * @returns { Card[] }
     */
    getCards(arg1?: string, arg2?: string | Record<string, any> | ((card: Card) => boolean)): Card[];
    iterableGetDiscardableCards(player: any, arg1: any, arg2: any): Generator<any, void, unknown>;
    getDiscardableCards(player: any, arg1: any, arg2: any): any[];
    iterableGetGainableCards(player: any, arg1: any, arg2: any): Generator<any, void, unknown>;
    getGainableCards(player: any, arg1: any, arg2: any): any[];
    getGainableSkills(func: any): any[];
    countCards(arg1: any, arg2: any): number;
    getCardIndex(arg1: any, name: any, card: any, max: any): number;
    countDiscardableCards(player: any, arg1: any, arg2: any): number;
    countGainableCards(player: any, arg1: any, arg2: any): number;
    getOriginalSkills(): any[];
    getModableSkills(): any[];
    getSkills(arg2: any, arg3: any, arg4: any): any[];
    get(arg1: any, arg2: any, arg3: any, arg4: any, ...args: any[]): any[] | ChildNode;
    syncStorage(skill: any): void;
    syncSkills(): void;
    playerfocus(time: any): this;
    setIdentity(identity: any, nature: any): this;
    insertPhase(skill: any, insert: any): import("../index.js").GameEventPromise;
    insertEvent(name: any, content: any, arg: any): import("../index.js").GameEventPromise;
    phase(skill: any): import("../index.js").GameEventPromise;
    phaseZhunbei(): import("../index.js").GameEventPromise;
    phaseJudge(): import("../index.js").GameEventPromise;
    phaseDraw(): import("../index.js").GameEventPromise;
    phaseUse(): import("../index.js").GameEventPromise;
    phaseDiscard(): import("../index.js").GameEventPromise;
    phaseJieshu(): import("../index.js").GameEventPromise;
    chooseToUse(use: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseToRespond(...args: any[]): import("../index.js").GameEventPromise;
    chooseToGive(...args: any[]): import("../index.js").GameEventPromise;
    chooseToDiscard(...args: any[]): import("../index.js").GameEventPromise;
    chooseToCompare(target: any, check: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseSkill(target: any, ...args: any[]): void;
    discoverCard(list: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseCardButton(...args: any[]): import("../index.js").GameEventPromise;
    chooseVCardButton(...args: any[]): import("../index.js").GameEventPromise;
    chooseButton(...args: any[]): import("../index.js").GameEventPromise;
    chooseButtonOL(list: any, callback: any, ai: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseCardOL(...args: any[]): import("../index.js").GameEventPromise;
    chooseCard(choose: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseUseTarget(...args: any[]): import("../index.js").GameEventPromise;
    chooseTarget(...args: any[]): import("../index.js").GameEventPromise;
    chooseCardTarget(choose: any, ...args: any[]): import("../index.js").GameEventPromise;
    chooseControlList(...args: any[]): import("../index.js").GameEventPromise;
    chooseControl(...args: any[]): import("../index.js").GameEventPromise;
    chooseBool(...args: any[]): import("../index.js").GameEventPromise;
    chooseDrawRecover(...args: any[]): import("../index.js").GameEventPromise;
    choosePlayerCard(...args: any[]): import("../index.js").GameEventPromise;
    discardPlayerCard(...args: any[]): import("../index.js").GameEventPromise;
    gainPlayerCard(...args: any[]): import("../index.js").GameEventPromise;
    showHandcards(str: any, ...args: any[]): import("../index.js").GameEventPromise;
    showCards(cards: any, str: any, ...args: any[]): import("../index.js").GameEventPromise;
    viewCards(str: any, cards: any, ...args: any[]): import("../index.js").GameEventPromise;
    viewHandcards(target: any): false | import("../index.js").GameEventPromise;
    canMoveCard(withatt: any, nojudge: any, ...args: any[]): boolean;
    moveCard(...args: any[]): import("../index.js").GameEventPromise;
    useResult(result: any, event: any): import("../index.js").GameEventPromise;
    useCard(...args: any[]): import("../index.js").GameEventPromise;
    useSkill(...args: any[]): import("../index.js").GameEventPromise;
    drawTo(num: any, args: any): import("../index.js").GameEventPromise;
    draw(...args: any[]): import("../index.js").GameEventPromise;
    randomDiscard(...args: any[]): import("./card.js").Card[];
    randomGain(...args: any[]): any;
    discard(...args: any[]): import("../index.js").GameEventPromise;
    loseToDiscardpile(...args: any[]): import("../index.js").GameEventPromise;
    respond(...args: any[]): import("../index.js").GameEventPromise;
    swapHandcards(target: any, cards1: any, cards2: any): import("../index.js").GameEventPromise;
    directequip(cards: any): void;
    $addToExpansion(cards: any, broadcast: any, gaintag: any): this;
    directgain(cards: any, broadcast: any, gaintag: any): this;
    directgains(cards: any, broadcast: any, gaintag: any): this;
    gainMultiple(targets: any, position: any): import("../index.js").GameEventPromise;
    gain(...args: any[]): import("../index.js").GameEventPromise;
    addToExpansion(...args: any[]): import("../index.js").GameEventPromise;
    give(cards: any, target: any, visible: any): any;
    lose(...args: any[]): import("../index.js").GameEventPromise;
    damage(...args: any[]): import("../index.js").GameEventPromise;
    recover(...args: any[]): import("../index.js").GameEventPromise;
    doubleDraw(): import("../index.js").GameEventPromise;
    loseHp(num: any): import("../index.js").GameEventPromise;
    loseMaxHp(...args: any[]): import("../index.js").GameEventPromise;
    gainMaxHp(...args: any[]): import("../index.js").GameEventPromise;
    changeHp(num: any, popup: any): import("../index.js").GameEventPromise;
    changeHujia(num: any, type: any, limit: any): import("../index.js").GameEventPromise;
    getBuff(...args: any[]): this;
    getDebuff(...args: any[]): this;
    dying(reason: any): import("../index.js").GameEventPromise;
    die(reason: any): import("../index.js").GameEventPromise;
    revive(hp: any, log: any): void;
    isMad(): boolean;
    goMad(end: any): void;
    unMad(): void;
    tempHide(): void;
    addExpose(num: any): this;
    equip(card: any, draw: any): import("../index.js").GameEventPromise;
    addJudge(card: any, cards: any): import("../index.js").GameEventPromise;
    /**
     * @returns { boolean }
     */
    canAddJudge(card: any): boolean;
    addJudgeNext(card: any, unlimited: any): void;
    judge(...args: any[]): import("../index.js").GameEventPromise;
    turnOver(bool: any): import("../index.js").GameEventPromise;
    out(skill: any): void;
    outSkills: any[];
    in(skill: any): void;
    link(bool: any): import("../index.js").GameEventPromise;
    skip(name: any): void;
    wait(callback: any): void;
    unwait(result: any): void;
    tempUnwait(result: any): void;
    logSkill(name: any, targets: any, nature: any, logv: any): void;
    unprompt(): void;
    prompt(str: any, nature: any): void;
    prompt_old(name2: any, className: any): void;
    popup(name: any, className: any, nobroadcast: any): void;
    popup_old(name: any, className: any): HTMLDivElement;
    _popup(): void;
    showTimer(time: any): void;
    hideTimer(): void;
    markAuto(name: any, info: any): void;
    unmarkAuto(name: any, info: any): void;
    getExpansions(tag: any): import("./card.js").Card[];
    countExpansions(tag: any): number;
    hasExpansions(tag: any): boolean;
    setStorage(name: any, value: any, mark: any): any;
    getStorage(name: any, defaultValue?: any[]): any;
    hasStorage(name: any, value: any): boolean;
    hasStorageAny(name: any, values: any, ...args: any[]): any;
    hasStorageAll(name: any, values: any, ...args: any[]): any;
    initStorage(name: any, value: any, mark: any): any;
    updateStorage(name: any, operation: any, mark: any): any;
    updateStorageAsync(name: any, operation: any, mark: any): Promise<any>;
    removeStorage(name: any, mark: any): boolean;
    markSkill(name: any, info: any, card: any, nobroadcast: any): this;
    unmarkSkill(name: any, nobroadcast: any): this;
    markSkillCharacter(id: any, target: any, name: any, content: any, nobroadcast: any): this;
    markCharacter(name: any, info: any, learn: any, learn2: any): HTMLDivElement;
    mark(name: any, info: any, skill: any): any;
    unmark(name: any, info: any): void;
    addLink(): void;
    removeLink(): void;
    canUse(card: any, target: any, distance: any, includecard: any): any;
    hasUseTarget(card: any, distance: any, includecard: any): boolean;
    hasValueTarget(card: any, distance: any, includecard: any): boolean;
    getUseValue(card: any, distance: any, includecard: any): number;
    addSubPlayer(cfg: any): string;
    removeSubPlayer(name: any): void;
    callSubPlayer(...args: any[]): import("../index.js").GameEventPromise;
    toggleSubPlayer(...args: any[]): import("../index.js").GameEventPromise;
    exitSubPlayer(remove: any): import("../index.js").GameEventPromise;
    getSubPlayers(tag: any): any[];
    addSkillTrigger(skills: any, hidden: any, triggeronly: any): this;
    _hookTrigger: any[];
    addSkillLog(skill: any): this;
    removeSkillLog(skill: any, popup: any): this;
    addInvisibleSkill(skill: any): void;
    removeInvisibleSkill(skill: any, ...args: any[]): any;
    addSkills(skill: any): import("../index.js").GameEventPromise;
    removeSkills(skill: any): import("../index.js").GameEventPromise;
    changeSkills(addSkill?: any[], removeSkill?: any[]): import("../index.js").GameEventPromise;
    addSkill(skill: any, checkConflict: any, nobroadcast: any, addToSkills: any): any;
    addAdditionalSkills(skill: any, skillsToAdd: any, keep: any): import("../index.js").GameEventPromise;
    addAdditionalSkill(skill: any, skillsToAdd: any, keep: any): this;
    $removeAdditionalSkills(skill: any, target: any): void;
    getRemovableAdditionalSkills(skill: any, target: any): string[];
    removeAdditionalSkill(skill: any, target: any): this;
    removeAdditionalSkills(skill: any, target: any): import("../index.js").GameEventPromise;
    awakenSkill(skill: any, nounmark: any): this;
    restoreSkill(skill: any, nomark: any): this;
    disableSkill(skill: any, skills: any): this;
    enableSkill(skill: any): this;
    checkMarks(): this;
    addEquipTrigger(card: any): this;
    removeEquipTrigger(card: any): this;
    removeSkillTrigger(skills: any, triggeronly: any): this;
    removeSkill(skill: any, ...args: any[]): any;
    addTempSkills(skillsToAdd: any, expire: any): import("../index.js").GameEventPromise;
    addTempSkill(skill: any, expire: any, checkConflict: any): any;
    tempBanSkill(skill: any, expire: any, log: any): any;
    isTempBanned(skill: any): boolean;
    attitudeTo(target: any): any;
    clearSkills(all: any, ...args: any[]): string[];
    checkConflict(skill: any): void;
    getHistory(key: any, filter: any, last: any): any;
    checkHistory(key: any, filter: any, last: any): void;
    hasHistory(key: any, filter: any, last: any): any;
    getLastHistory(key: any, filter: any, last: any): any;
    checkAllHistory(key: any, filter: any, last: any): void;
    getAllHistory(key: any, filter: any, last: any): any[];
    hasAllHistory(key: any, filter: any, last: any): boolean;
    getLastUsed(num: any): any;
    getStat(key: any): any;
    getLastStat(key: any): any;
    queue(time: any): void;
    queueTimeout: NodeJS.Timeout;
    getCardUsable(card: any, pure: any): number;
    getAttackRange(raw: any): number;
    getEquipRange(cards: any): number;
    getGlobalFrom(): number;
    getGlobalTo(): number;
    getHandcardLimit(): number;
    getEnemies(func: any): Player[];
    getFriends(func: any): any[];
    isEnemyOf(...args: any[]): boolean;
    isFriendOf(player: any): boolean;
    isFriendsOf(player: any): any;
    isEnemiesOf(player: any): any;
    isAlive(): boolean;
    isDead(): boolean;
    isDying(): boolean;
    isDamaged(): boolean;
    isHealthy(): any;
    isMaxHp(only: any, raw: any): boolean;
    isMinHp(only: any, raw: any): boolean;
    isMaxCard(only: any): boolean;
    isMinCard(only: any): boolean;
    isMaxHandcard(only: any): boolean;
    isMinHandcard(only: any): boolean;
    isMaxEquip(only: any): boolean;
    isMinEquip(only: any): boolean;
    isLinked(): boolean;
    isTurnedOver(): boolean;
    isOut(): boolean;
    isMin(distance: any): boolean;
    isIn(): boolean;
    isUnseen(num: any): boolean;
    isUnderControl(self: any, me: any): any;
    isOnline(): boolean;
    isOnline2(): boolean;
    isOffline(): boolean;
    checkShow(skill: any, showonly: any): false | "main" | "vice";
    needsToDiscard(add: any, filter: any, pure: any): number;
    distanceTo(target: any, method: any): number;
    distanceFrom(target: any, method: any): number;
    hasSkill(skill: any, arg2: any, arg3: any, arg4: any): boolean;
    hasStockSkill(skill: any, arg1: any, arg2: any, arg3: any): boolean;
    isZhu2(): boolean;
    isInitFilter(tag: any): boolean;
    hasZhuSkill(skill: any, player: any): boolean;
    hasGlobalTag(tag: any, arg: any): boolean;
    hasSkillTag(tag: any, hidden: any, arg: any, globalskill: any): boolean;
    hasJudge(name: any): boolean;
    hasFriend(): boolean;
    hasUnknown(num: any): boolean;
    isUnknown(player: any): boolean;
    hasWuxie(info: any): boolean;
    hasSha(respond: any, noauto: any): boolean;
    hasShan(respond: any): boolean;
    mayHaveSha(viewer: any, type: any, ignore: any, rvt: any): number | boolean;
    mayHaveShan(viewer: any, type: any, ignore: any, rvt: any): number | boolean;
    hasCard(name: any, position: any): boolean;
    getEquip(name: any): import("./card.js").Card;
    getJudge(name: any): ChildNode;
    $drawAuto(cards: any, target: any): void;
    $draw(num: any, init: any, config: any): void;
    $compareMultiple(card1: any, targets: any, cards: any): void;
    $compare(card1: any, target: any, card2: any): void;
    $throw(card: any, time: any, init: any, nosource: any): any;
    $throwordered(...args: any[]): any;
    $throwordered1(node: any, nosource: any): any;
    $throwordered2(node: any, nosource: any): any;
    $throwxy(card: any, left: any, top: any): any;
    $throwxy2(card: any, left: any, top: any, trans: any, flipx: any, flipy: any, ...args: any[]): any;
    throwDice(num: any): void;
    $giveAuto(card: any, player: any, ...args: any[]): any;
    $give(card: any, player: any, log: any, init: any): void;
    $handleEquipChange(): void;
    $equip(card: any): this;
    $gain(card: any, log: any, init: any): void;
    $gain2(cards: any, log: any): boolean;
    $skill(name: any, type: any, color: any, avatar: any): void;
    $fire(): void;
    $thunder(): void;
    $rare2(): void;
    $epic2(): void;
    $legend2(): void;
    $rare(time: any): void;
    $epic(time: any): void;
    $legend(time: any): void;
    $coin(): void;
    $dust(): void;
    $recover(): void;
    $fullscreenpop(str: any, nature: any, avatar: any, broadcast: any): void;
    $damagepop(num: any, nature: any, font: any, nobroadcast: any): void;
    $damage(source: any, ...args: any[]): void;
    $die(): void;
    $dieflip(type: any): void;
    $phaseJudge(card: any): void;
}
