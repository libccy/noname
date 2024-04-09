export class Game extends Uninstantable {
    static online: boolean;
    static onlineID: any;
    static onlineKey: any;
    /**
     * @type {Player[]}
     */
    static players: Player[];
    /**
     * @type {Player[]}
     */
    static dead: Player[];
    static imported: any[];
    /**
     * @type { { [key: string]: Player } }
     */
    static playerMap: {
        [key: string]: import("../library/element/player.js").Player;
    };
    static phaseNumber: number;
    static roundNumber: number;
    static shuffleNumber: number;
    static promises: typeof GamePromises;
    /**
     * @type { string }
     */
    static layout: string;
    /**
     * @type { Player }
     */
    static me: Player;
    /**
     * @type { boolean }
     */
    static chess: boolean;
    static globalEventHandlers: {
        _handlers: {};
        getHandler(name: any, type: any): any;
        ensureHandlerList(name: any, type: any): any;
        removeHandler(name: any, type: any, func: any): void;
        pushHandler(name: any, type: any, ...args: any[]): void;
        getDefaultHandlerType(name: any): string;
        addHandlerToEvent(event: any): void;
    };
    static setStratagemBuffCost(cardName: any, cost: any): void;
    static setStratagemBuffEffect(cardName: any, effect: any): void;
    static setStratagemBuffPrompt(cardName: any, prompt: any): void;
    /**
     * 添加新的属性杀
     */
    static addNature(nature: any, translation: any, config: any): any;
    /**
     * 判断卡牌信息/事件是否有某个属性
     */
    static hasNature(item: any, nature: any, player: any): boolean;
    /**
     * 设置卡牌信息/事件的属性
     */
    static setNature(item: any, nature: any, addNature: any): any;
    /**
     * 洗牌
     */
    static washCard(): false | any[] | import("../library/index.js").GameEventPromise;
    /**
     * 基于钩子的添加势力方法
     */
    static addGroup(id: any, short: any, name: any, config: any): any;
    /**
     * @typedef {import("../library/hooks/interface.js").NonameHookType} NonameHookType
     */
    /**
     * 通用的调用钩子函数
     *
     * @template {NonameHookType} HookType
     * @template {keyof HookType} Name
     * @param {Name} name
     * @param {Parameters<HookType[Name]>} args
     */
    static callHook<HookType extends import("../library/hooks/interface.js").NonameHookType, Name extends keyof HookType>(name: Name, args: Parameters<HookType[Name]>): void;
    static yingbianEffect(event: any, content: any, ...args: any[]): import("../library/index.js").GameEventPromise;
    static setYingbianConditionColor(yingbianCondition: any, color: any): void;
    static setComplexYingbianCondition(yingbianCondition: any, condition: any): void;
    static setSimpleYingbianCondition(yingbianCondition: any, condition: any): void;
    static setYingbianEffect(yingbianEffect: any, effect: any): void;
    static setYingbianPrompt(yingbian: any, prompt: any): void;
    /**
     * Dynamic Style Manager
     * 动态CSS管理对象
     *
     * > No idea to write, it's just a tool to handle css.
     * > 暂时不知道写啥，反正就是个管CSS的工具
     *
     * @example
     * // 为符合".content"的元素增加"text-align: center"的样式
     * game.dynamicStyle.add(".content", {
     * 	textAlign: "center"
     * });
     *
     * // 在上一条的基础上，再为".content"增加"color: #FFFFFF"的样式
     * game.dynamicStyle.add(".content", {
     * 	color: "#FFFFFF"
     * });
     *
     * @example
     * // 批量添加符合对应选择器元素的样式
     * game.dynamicStyle.addObject({
     * 	".content": {
     * 		textAlign: "center"
     * 	},
     * 	".ansory": {
     * 		fontSize: "16px"
     * 	}
     * });
     *
     * @example
     * // 移除".content"元素的样式
     * game.dynamicStyle.remove(".content");
     *
     * @example
     * // 移除".content"元素的"textAlign"样式
     * game.dynamicStyle.removeStyles(".content", ["textAligh"]);
     *
     * @example
     * // 如果".content"元素的样式存在，则将".content"的样式修改为给定的样式
     * // 反之效果同`game.dynamicStyle.add`
     * game.dynamicStyle.update(".content", {
     * 	textAlign: "center"
     * });
     */
    static dynamicStyle: DynamicStyle;
    /**
     * Add a background music to the config option
     *
     * 在设置选项中添加一首背景音乐
     */
    static addBackgroundMusic(link: any, musicName: any, aozhan: any): void;
    /**
     * Remove a background music from the config option
     *
     * 从设置选项中移除一首背景音乐
     */
    static removeBackgroundMusic(link: any, aozhan: any): void;
    static updateBackground(): void;
    /**
     * Generate a beatmap using the given BPM, beats, and offset
     *
     * 用给定的BPM、节拍和偏移生成谱面
     */
    static generateBeatmapTimeleap(bpm: any, beats: any, offset: any): any;
    static updateRenku(): void;
    /**
     * 为牌添加知情者
     * @param { Card[] | Card } cards
     * @param { Player[] } players
     */
    static addCardKnower(cards: Card[] | Card, players: Player[]): void;
    /**
     * 移除牌的所有知情者。
     * @param { Card[] | Card } cards
     */
    static clearCardKnowers(cards: Card[] | Card): void;
    /**
     * @param { { [key: string]: any } } [arg]
     */
    static loseAsync(arg?: {
        [key: string]: any;
    }): import("../library/index.js").GameEventPromise;
    static callFuncUseStepCache(prefix: any, func: any, params: any): any;
    /**
     * @param {string} name
     */
    static getRarity(name: string): "legend" | "epic" | "rare" | "junk" | "common";
    /**
     * @template { keyof GameHistory } T
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } filter
     * @param { GameEventPromise } [last]
     * @returns { boolean }
     */
    static hasGlobalHistory<T extends keyof GameHistory>(key: T, filter: (event: GameEventPromise) => boolean, last?: GameEventPromise): boolean;
    /**
     * @template { keyof GameHistory } T
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } filter
     * @param { GameEventPromise } [last]
     * @returns { void }
     */
    static checkGlobalHistory<T_1 extends keyof GameHistory>(key: T_1, filter: (event: GameEventPromise) => boolean, last?: GameEventPromise): void;
    /**
     * @overload
     * @returns { GameHistory }
     */
    static getGlobalHistory(): GameHistory;
    /**
     * @template { keyof GameHistory } T
     * @overload
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } [filter]
     * @param { GameEventPromise } [last]
     * @returns { GameHistory[T] }
     */
    static getGlobalHistory<T_2 extends keyof GameHistory>(key: T_2, filter?: (event: GameEventPromise) => boolean, last?: GameEventPromise): GameHistory[T_2];
    /**
     * @template { keyof GameHistory } T
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } filter
     * @param { GameEventPromise } [last]
     * @returns { boolean }
     */
    static hasAllGlobalHistory<T_3 extends keyof GameHistory>(key: T_3, filter: (event: GameEventPromise) => boolean, last?: GameEventPromise): boolean;
    /**
     * @template { keyof GameHistory } T
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } filter
     * @param { GameEventPromise } [last]
     * @returns { void }
     */
    static checkAllGlobalHistory<T_4 extends keyof GameHistory>(key: T_4, filter: (event: GameEventPromise) => boolean, last?: GameEventPromise): void;
    /**
     * @overload
     * @returns { GameHistory[] }
     */
    static getAllGlobalHistory(): GameHistory[];
    /**
     * @template { keyof GameHistory } T
     * @overload
     * @param { T } key
     * @param { (event: GameEventPromise) => boolean } [filter]
     * @param { GameEventPromise } [last]
     * @returns { GameHistory[T] }
     */
    static getAllGlobalHistory<T_5 extends keyof GameHistory>(key: T_5, filter?: (event: GameEventPromise) => boolean, last?: GameEventPromise): GameHistory[T_5];
    /**
     * @overload
     * @returns { void }
     */
    static cardsDiscard(): void;
    /**
     * @overload
     * @param { Card } cards
     * @returns { GameEventPromise }
     */
    static cardsDiscard(cards: Card): GameEventPromise;
    /**
     * @overload
     * @param {Card[]} cards
     * @returns { GameEventPromise }
     */
    static cardsDiscard(cards: Card[]): GameEventPromise;
    /**
     * @overload
     * @returns { void }
     */
    static cardsGotoOrdering(): void;
    /**
     * @overload
     * @param { Card } cards
     * @returns { GameEventPromise }
     */
    static cardsGotoOrdering(cards: Card): GameEventPromise;
    /**
     * @overload
     * @param {Card[]} cards
     * @returns { GameEventPromise }
     */
    static cardsGotoOrdering(cards: Card[]): GameEventPromise;
    /**
     * @overload
     * @returns { void }
     */
    static cardsGotoSpecial(): void;
    /**
     * @overload
     * @param { Card } cards
     * @param { 'toRenku' | false } [bool] 为false时不触发trigger，为'toRenku'时牌放到仁库
     * @returns { GameEventPromise }
     */
    static cardsGotoSpecial(cards: Card, bool?: 'toRenku' | false): GameEventPromise;
    /**
     * @overload
     * @param {Card[]} cards
     * @param { 'toRenku' | false } [bool] 为false时不触发trigger，为'toRenku'时牌放到仁库
     * @returns { GameEventPromise }
     */
    static cardsGotoSpecial(cards: Card[], bool?: 'toRenku' | false): GameEventPromise;
    /**
     *
     * @param {...(
     * 	Card[] |
     * 	Card |
     * 	Function |
     * 	'insert' | 'washCard' | 'triggeronly' |
     * 	[string, any]
     * )} args
     * @returns
     */
    static cardsGotoPile(...args: (Card[] | Card | Function | 'insert' | 'washCard' | 'triggeronly' | [
        string,
        any
    ])[]): import("../library/index.js").GameEventPromise;
    /**
     * @param { GameEventPromise } event
     */
    static $cardsGotoPile(event: GameEventPromise): void;
    /**
     * @param { false } [pause]
     */
    static showHistory(pause?: false): void;
    /**
     * @param { string } src
     * @param { true } [blur]
     */
    static createBackground(src: string, blur?: true): HTMLDivElement;
    /**
     *
     * @param { string } url
     * @param { Player } [player]
     */
    static changeLand(url: string, player?: Player): void;
    /**
     * @param { string[] } updates
     * @param { Function } proceed
     */
    static checkFileList(updates: string[], proceed: Function): void;
    /**
     * @param  {...(Player[] | Player)} args
     */
    static replaceHandcards(...args: (Player[] | Player)[]): void;
    /**
     * @param { string } name
     */
    static removeCard(name: string): void;
    /**
     * @param { 'hidden' } [type]
     */
    static randomMapOL(type?: 'hidden'): void;
    static closeMenu(): void;
    static closeConnectMenu(): void;
    static closePopped(): void;
    /**
     * @template { keyof typeof lib.message.client } T
     * @overload
     * @param { T } func
     * @param { ...Parameters<typeof lib.message.client[T]> } args
     * @returns { void }
     */
    static broadcast<T_6 extends "cancel" | "onclose" | "init" | "reinit" | "log" | "opened" | "onconnection" | "onmessage" | "selfclose" | "reloadroom" | "createroom" | "enterroomfailed" | "roomlist" | "updaterooms" | "updateclients" | "updateevents" | "eventsdenied" | "exec" | "denied" | "closeDialog" | "createDialog" | "gameStart" | "updateWaiting">(func: T_6, ...args: Parameters<{
        log: (arr: any) => void;
        opened: () => void;
        onconnection: (id: any) => void;
        onmessage: (id: any, message: any) => void;
        onclose: (id: any) => void;
        selfclose: () => void;
        reloadroom: (forced: any) => void;
        createroom: (index: any, config: any, mode: any) => void;
        enterroomfailed: () => void;
        roomlist: (list: any, events: any, clients: any, wsid: any) => void;
        updaterooms: (list: any, clients: any) => void;
        updateclients: (clients: any, bool: any) => void;
        updateevents: (events: any) => void;
        eventsdenied: (reason: any) => void;
        init: (id: any, config: any, ip: any, servermode: any, roomId: any) => void;
        reinit: (config: any, state: any, state2: any, ip: any, observe: any, onreconnect: any, cardtag: any, postReconnect: any) => void;
        exec: (func: any, ...args: any[]) => void;
        denied: (reason: any) => void;
        cancel: (id: any) => void;
        closeDialog: (id: any) => void;
        createDialog: (id: any, ...args: any[]) => void;
        gameStart: () => void;
        updateWaiting: (map: any) => void;
    }[T_6]>): void;
    /**
     * @template { any[] } T
     * @overload
     * @param { (...args: T) => void } func
     * @param { ...T } args
     * @returns { void }
     */
    static broadcast<T_6 extends "cancel" | "onclose" | "init" | "reinit" | "log" | "opened" | "onconnection" | "onmessage" | "selfclose" | "reloadroom" | "createroom" | "enterroomfailed" | "roomlist" | "updaterooms" | "updateclients" | "updateevents" | "eventsdenied" | "exec" | "denied" | "closeDialog" | "createDialog" | "gameStart" | "updateWaiting">(func: (...args: T_6) => void, ...args: T_6): void;
    /**
     * @template { keyof typeof lib.message.client } T
     * @overload
     * @param { T } func
     * @param { ...Parameters<typeof lib.message.client[T]> } args
     * @returns { void }
     */
    static broadcastAll<T_7 extends "cancel" | "onclose" | "init" | "reinit" | "log" | "opened" | "onconnection" | "onmessage" | "selfclose" | "reloadroom" | "createroom" | "enterroomfailed" | "roomlist" | "updaterooms" | "updateclients" | "updateevents" | "eventsdenied" | "exec" | "denied" | "closeDialog" | "createDialog" | "gameStart" | "updateWaiting">(func: T_7, ...args: Parameters<{
        log: (arr: any) => void;
        opened: () => void;
        onconnection: (id: any) => void;
        onmessage: (id: any, message: any) => void;
        onclose: (id: any) => void;
        selfclose: () => void;
        reloadroom: (forced: any) => void;
        createroom: (index: any, config: any, mode: any) => void;
        enterroomfailed: () => void;
        roomlist: (list: any, events: any, clients: any, wsid: any) => void;
        updaterooms: (list: any, clients: any) => void;
        updateclients: (clients: any, bool: any) => void;
        updateevents: (events: any) => void;
        eventsdenied: (reason: any) => void;
        init: (id: any, config: any, ip: any, servermode: any, roomId: any) => void;
        reinit: (config: any, state: any, state2: any, ip: any, observe: any, onreconnect: any, cardtag: any, postReconnect: any) => void;
        exec: (func: any, ...args: any[]) => void;
        denied: (reason: any) => void;
        cancel: (id: any) => void;
        closeDialog: (id: any) => void;
        createDialog: (id: any, ...args: any[]) => void;
        gameStart: () => void;
        updateWaiting: (map: any) => void;
    }[T_7]>): void;
    /**
     * @template { any[] } T
     * @overload
     * @param { (...args: T) => void } func
     * @param { ...T } args
     * @returns { void }
     */
    static broadcastAll<T_7 extends "cancel" | "onclose" | "init" | "reinit" | "log" | "opened" | "onconnection" | "onmessage" | "selfclose" | "reloadroom" | "createroom" | "enterroomfailed" | "roomlist" | "updaterooms" | "updateclients" | "updateevents" | "eventsdenied" | "exec" | "denied" | "closeDialog" | "createDialog" | "gameStart" | "updateWaiting">(func: (...args: T_7) => void, ...args: T_7): void;
    static syncState(): void;
    static updateWaiting(): void;
    /**
     * @param { Function } func
     */
    static waitForPlayer(func: Function): void;
    /**
     * @param { number } time
     * @param { Function } [onEnd]
     */
    static countDown(time: number, onEnd?: Function): void;
    static countChoose(clear: any): void;
    static stopCountChoose(): void;
    /**
     * @param { string } ip
     * @param { (result: boolean) => any } callback
     */
    static connect(ip: string, callback: (result: boolean) => any): void;
    static send(...args: any[]): void;
    /**
     * @param { string } id
     * @param {*} message
     */
    static sendTo(id: string, message: any): import("../library/element/client.js").Client;
    static createServer(): void;
    /**
     * @returns { HTMLAudioElement }
     */
    static playAudio(...args: any[]): HTMLAudioElement;
    /**
    * 根据skill中的audio,audioname,audioname2和player来获取音频地址列表
    * @typedef {[string,number]|string|number|boolean} audioInfo
    * @typedef {{audio: audioInfo, audioname?:string[], audioname2?:{[playerName: string]: audioInfo}}} skillInfo
    * @param { string } skill  技能名
    * @param { Player | string } [player]  角色/角色名
    * @param { skillInfo | audioInfo } [skillInfo]  预设的skillInfo/audioInfo(转为skillInfo)，覆盖lib.skill[skill]
    * @returns { string[] }  语音地址列表
    * @example
    * ```js
    * const info=lib.skill['skillname'];
    * info.audio=undefined //默认值[true,2]
    * info.audio=false // 不播放语音
    * info.audio=true // [skill/skillname.mp3]
    * info.audio=3 // [skill/skillname1.mp3,skill/skillname2.mp3,skill/skillname3.mp3]（项数为数字大小）
    * info.audio="(ext:extName|db:extension-extName)(/anyPath):true|number(:format)" //间接路径
    * // 同上，只是将目录改为(ext:extName|db:extension-extName)(/anyPath)，且可以指定格式(默认mp3)
    * info.audio="(ext:extName|db:extension-extName/)(anyPath/)filename(.format)" //直接路径
    * //path和format至少有一个，否则会识别为引用技能
    * //起始位置为audio/(若无anyPath则为audio/skill/)，若没有format默认mp3
    * info.audio="otherSkillname" //引用技能
    * //引用一个其他技能的语音，若lib.skill["otherSkillname"]不存在则读取"otherSkillname"的audio为默认值[true,2]
    * info.audio=["otherSkillname", number] //带fixedNum的引用技能
    * //同样引用一个其他技能的语音，若lib.skill["otherSkillname"]不存在则读取"otherSkillname"的audio为number
    * //若"otherSkillname"的语音数超过number，则只取前number个
    * info.audio=[true,2,"otherSkillname1",["otherSkillname2",2]] //任意元素拼接
    * //数组里可以放任何以上的格式，结果为分析完的结果合并
    *
    * info.audioname=['player1','player2']
    * //audioname里可以放任意角色名。
    * //如果其中包含发动技能的角色名"player"，且info.audio不是直接路径"(anyPath/)filename(.format)"的形式
    * //则在"skill"和number中插入"_player"，形如
    *
    * info.audioname2={'player1':audioInfo1,'player2':audioInfo2}
    * //audioname2是一个对象，其中key为角色名，value的类型和info.audio一样
    * //如果key中包含发动技能的角色名player，则直接改用info.audioname2[player]来播放语音
    * ```
    */
    static parseSkillAudio(skill: string, player?: Player | string, skillInfo?: {
        audio: string | number | boolean | [string, number];
        audioname?: string[];
        audioname2?: {
            [playerName: string]: string | number | boolean | [string, number];
        };
    } | (string | number | boolean | [string, number])): string[];
    /**
     *
     * @param { string } skill
     * @param { Player | string } player
     * @param { boolean } [directaudio]
     * @param { boolean } [nobroadcast]
     * @param { ['lib']['skill'] } [skillInfo]
     * @returns
     */
    static trySkillAudio(skill: string, player: Player | string, directaudio?: boolean, nobroadcast?: boolean, skillInfo?: any): HTMLAudioElement;
    /**
     * @param { string } name
     * @param { number } [index]
     * @returns
     */
    static playSkillAudio(name: string, index?: number, ...args: any[]): void;
    /**
     * @param { string | Card } card
     * @param { Player | Sex } sex
     */
    static playCardAudio(card: string | Card, sex: Player | Sex): void;
    static playBackgroundMusic(): void;
    /**
     * @overload
     * @param { 'character' } type
     * @param {(
     * 	lib: Library,
     * 	game: typeof Game,
     * 	ui: UI,
     * 	get: Get,
     * 	ai: AI,
     * _status: Status
     * ) => importCharacterConfig } content
     * @param {*} [url]
     */
    static import(type: 'character', content: (lib: Library, game: typeof Game, ui: UI, get: Get, ai: AI, _status: Status) => importCharacterConfig, url?: any): any;
    /**
     * @overload
     * @param { 'card' } type
     * @param {(
     * 	lib: Library,
     * 	game: typeof Game,
     * 	ui: UI,
     * 	get: Get,
     * 	ai: AI,
     * _status: Status
     * ) => importCardConfig } content
     * @param {*} [url]
     */
    static import(type: 'card', content: (lib: Library, game: typeof Game, ui: UI, get: Get, ai: AI, _status: Status) => importCardConfig, url?: any): any;
    /**
     * @overload
     * @param { 'mode' } type
     * @param {(
     * 	lib: Library,
     * 	game: typeof Game,
     * 	ui: UI,
     * 	get: Get,
     * 	ai: AI,
     * _status: Status
     * ) => importModeConfig } content
     * @param {*} [url]
     */
    static import(type: 'mode', content: (lib: Library, game: typeof Game, ui: UI, get: Get, ai: AI, _status: Status) => importModeConfig, url?: any): any;
    /**
     * @overload
     * @param { 'player' } type
     * @param {(
     * 	lib: Library,
     * 	game: typeof Game,
     * 	ui: UI,
     * 	get: Get,
     * 	ai: AI,
     * _status: Status
     * ) => importPlayerConfig } content
     * @param {*} [url]
     */
    static import(type: 'player', content: (lib: Library, game: typeof Game, ui: UI, get: Get, ai: AI, _status: Status) => importPlayerConfig, url?: any): any;
    /**
     * @overload
     * @param { 'extension' } type
     * @param {(
     * 	lib: Library,
     * 	game: typeof Game,
     * 	ui: UI,
     * 	get: Get,
     * 	ai: AI,
     * _status: Status
     * ) => importExtensionConfig } content
     * @param {*} [url]
     */
    static import(type: 'extension', content: (lib: Library, game: typeof Game, ui: UI, get: Get, ai: AI, _status: Status) => importExtensionConfig, url?: any): any;
    static loadExtension(object: any): Promise<any>;
    /**
     * 下载文件
     * @type { (url: string, folder: string, onsuccess?: Function, onerror?: (e: Error) => void) => void, dev?: 'nodev', onprogress?: Function) => void }
     */
    static download: (url: string, folder: string, onsuccess?: Function, onerror?: (e: Error) => void) => void;
    /**
     * 读取文件为arraybuffer
     * @type { (filename: string, callback?: (data: Buffer | ArrayBuffer) => any, onerror?: (e: Error) => void) => void }
     */
    static readFile: (filename: string, callback?: (data: Buffer | ArrayBuffer) => any, onerror?: (e: Error) => void) => void;
    /**
     * 读取文件为文本
     * @type { (filename: string, callback?: (data: string) => any, onerror?: (e: Error) => void) => void }
     */
    static readFileAsText: (filename: string, callback?: (data: string) => any, onerror?: (e: Error) => void) => void;
    /**
     * 将数据写入文件
     * @type { (data: File | ArrayBuffer, path: string, name: string, callback?: (e: Error) => void) => void }
     */
    static writeFile: (data: File | ArrayBuffer, path: string, name: string, callback?: (e: Error) => void) => void;
    /**
     * 移除文件
     * @type { (filename: string, callback?: (e: Error) => void) => void }
     */
    static removeFile: (filename: string, callback?: (e: Error) => void) => void;
    /**
     * 获取文件列表
     * @type { (dir: string, success: (folders: string[], files: string[]) => any, failure: (e: Error) => void) => void }
     */
    static getFileList: (dir: string, success: (folders: string[], files: string[]) => any, failure: (e: Error) => void) => void;
    /**
     * 按路径依次创建文件夹
     * @type { (list: string | string[], callback: Function, file?: boolean) => void }
     */
    static ensureDirectory: (list: string | string[], callback: Function, file?: boolean) => void;
    /**
     * 创建文件夹
     * @type { (directory: string, successCallback?: Function, errorCallback?: Function) => void }
     */
    static createDir: (directory: string, successCallback?: Function, errorCallback?: Function) => void;
    /**
     * 删除文件夹
     * @type { (directory: string, successCallback?: Function, errorCallback?: Function) => void }
     */
    static removeDir: (directory: string, successCallback?: Function, errorCallback?: Function) => void;
    static importExtension(data: any, finishLoad: any, exportExtension: any, extensionPackage: any): Promise<boolean>;
    /**
     * @param { string } textToWrite
     * @param { string } [name]
     */
    static export(textToWrite: string, name?: string): void;
    /**
     * @param { string[] } list
     * @param { Function } [onsuccess]
     * @param { Function } [onerror]
     * @param { Function } [onfinish]
     * @param { Function } [process]
     * @param {*} [dev]
     */
    static multiDownload2(list: string[], onsuccess?: Function, onerror?: Function, onfinish?: Function, process?: Function, dev?: any): void;
    /**
     * @param { string[] } list
     * @param { Function } onsuccess
     * @param { Function } onerror
     * @param { Function } onfinish
     * @param { Function } [process]
     * @param {*} [dev]
     */
    static multiDownload(list: string[], onsuccess: Function, onerror: Function, onfinish: Function, process?: Function, dev?: any, ...args: any[]): void;
    /**
     * @param { string } url
     * @param { Function } onload
     * @param { Function } [onerror]
     * @param { Function } [onprogress]
     */
    static fetch(url: string, onload: Function, onerror?: Function, onprogress?: Function): void;
    /**
     * @param { string } time
     * @param { string } mode
     */
    static playVideo(time: string, mode: string): void;
    /**
     * @param { Videos } video
     */
    static playVideoContent(video: Videos): void;
    static videoContent: {
        arrangeLib: (content: any) => void;
        $syncDisable: (player: any, map: any) => void;
        $syncExpand: (player: any, map: any) => void;
        $disableJudge: (player: any, map: any) => void;
        $enableJudge: (player: any, map: any) => void;
        jiuNode: (player: any, bool: any) => void;
        init: (players: any) => void;
        newcard: (content: any) => void;
        changeLand: (player: any, url: any) => void;
        destroyLand: () => void;
        playAudio: (str: any) => void;
        playSkillAudio: (name: any) => void;
        phaseChange: (player: any) => void;
        playerfocus: (player: any, time: any) => void;
        playerfocus2: () => void;
        identityText: (player: any, str: any) => void;
        identityColor: (player: any, str: any) => void;
        chessSwap: (content: any) => void;
        chessgainmod: (player: any, num: any) => void;
        moveTo: (player: any, pos: any) => void;
        addObstacle: (pos: any) => void;
        removeObstacle: (pos: any) => void;
        moveObstacle: (pos: any) => void;
        colorObstacle: (pos: any) => void;
        thrownhighlight1: () => void;
        thrownhighlight2: () => void;
        chessFocus: (player: any) => void;
        removeTreasure: (pos: any) => void;
        initobs: (obs: any) => void;
        stonePosition: (content: any) => void;
        bossSwap: (player: any, name: any) => void;
        stoneSwap: (info: any) => void;
        chess_tongshuai: (player: any, content: any) => void;
        chess_tongshuai_skill: (player: any, content: any) => void;
        smoothAvatar: (player: any, vice: any) => void;
        setAvatar: (player: any, content: any) => void;
        setAvatarQueue: (player: any, content: any) => void;
        addSubPlayer: (player: any, content: any) => void;
        arenaNumber: (content: any) => void;
        reinit: (source: any, content: any) => void;
        reinit2: (source: any, name: any) => void;
        reinit3: (source: any, content: any) => void;
        changeSkin: (player: any, map: any) => void;
        skill: (player: any, content: any) => void;
        addFellow: (content: any) => void;
        windowzoom1: () => void;
        windowzoom2: () => void;
        windowzoom3: () => void;
        windowzoom4: () => void;
        windowzoom5: () => void;
        updateActCount: (player: any, content: any) => void;
        showIdentity: (player: any, identity: any) => void;
        setIdentity: (player: any, identity: any) => void;
        showCharacter: (player: any, num: any) => void;
        hidePlayer: (player: any) => void;
        deleteHandcards: (player: any) => void;
        hideCharacter: (player: any, num: any) => void;
        popup: (player: any, info: any) => void;
        log: (str: any) => void;
        draw: (player: any, info: any) => void;
        drawCard: (player: any, info: any) => void;
        throw: (player: any, info: any) => void;
        compare: (player: any, info: any) => void;
        compareMultiple: (player: any, info: any) => void;
        give: (player: any, info: any) => void;
        giveCard: (player: any, info: any) => void;
        gain: (player: any, info: any) => void;
        gainCard: (player: any, info: any) => void;
        gain2: (player: any, cards: any) => void;
        deletenode: (player: any, cards: any, method: any) => void;
        highlightnode: (player: any, card: any) => void;
        uiClear: () => void;
        judge1: (player: any, content: any) => void;
        centernode: (content: any) => void;
        judge2: (videoId: any) => void;
        unmarkname: (player: any, name: any) => void;
        unmark: (player: any, name: any) => void;
        flame: (player: any, type: any) => void;
        throwEmotion: (player: any, content: any) => void;
        addGaintag: (player: any, content: any) => void;
        removeGaintag: (player: any, content: any) => void;
        line: (player: any, content: any) => void;
        fullscreenpop: (player: any, content: any) => void;
        damagepop: (player: any, content: any) => void;
        damage: (player: any, source: any) => void;
        diex: (player: any) => void;
        tafangMe: (player: any) => void;
        deleteChessPlayer: (player: any) => void;
        addChessPlayer: (content: any) => void;
        die: (player: any) => void;
        revive: (player: any) => void;
        update: (player: any, info: any) => void;
        phaseJudge: (player: any, card: any) => void;
        directgain: (player: any, cards: any) => void;
        directgains: (player: any, cards: any) => void;
        directequip: (player: any, cards: any) => void;
        gain12: (player: any, cards12: any) => void;
        equip: (player: any, card: any) => void;
        addJudge: (player: any, content: any) => void;
        markCharacter: (player: any, content: any) => void;
        changeMarkCharacter: (player: any, content: any) => void;
        mark: (player: any, content: any) => void;
        markSkill: (player: any, content: any) => void;
        unmarkSkill: (player: any, name: any) => void;
        storage: (player: any, content: any) => void;
        markId: (player: any, content: any) => void;
        unmarkId: (player: any, content: any) => void;
        lose: (player: any, info: any) => void;
        loseAfter: (player: any) => void;
        link: (player: any, bool: any) => void;
        turnOver: (player: any, bool: any) => void;
        showCards: (player: any, info: any) => void;
        cardDialog: (content: any) => void;
        changeSeat: (player: any, info: any) => void;
        dialogCapt: (content: any) => void;
        swapSeat: (content: any) => void;
        removeTafangPlayer: () => void;
        swapControl: (player: any, hs: any) => void;
        onSwapControl: () => void;
        swapPlayer: (player: any, hs: any) => void;
        over: (str: any) => void;
    };
    static reload(): void;
    static reload2(): void;
    static exit(): void;
    /**
     * @param { string } url
     */
    static open(url: string): void;
    static reloadCurrent(): void;
    /**
     * @param { Function } func
     */
    static update(func: Function): Function;
    /**
     * @param { Function } func
     */
    static unupdate(func: Function): void;
    static stop(): void;
    static run(): void;
    /**
     * @param { string } type
     * @param { Player } player
     * @param { any } [content]
     * @returns
     */
    static addVideo(type: string, player: Player, content?: any): void;
    /**
     * @param { Function } func
     */
    static draw(func: Function): void;
    /**
     * @param { number } [time]
     */
    static vibrate(time?: number): void;
    static prompt(...args: any[]): void;
    static alert(str: any): void;
    static print(...args: any[]): void;
    static animate: {
        window: (num: any) => void;
        flame: (x: any, y: any, duration: any, type: any) => void;
    };
    /**
     * @param { [number, number | {opacity:any, color:any, dashed:any, duration:any} | string, number, number] } path
     */
    static linexy(path: [number, string | number | {
        opacity: any;
        color: any;
        dashed: any;
        duration: any;
    }, number, number], ...args: any[]): any;
    /**
     * @param { [number, number | {opacity:any, color:any, dashed:any, duration:any} | string, number, number] } path
     */
    static _linexy(path: [number, string | number | {
        opacity: any;
        color: any;
        dashed: any;
        duration: any;
    }, number, number], ...args: any[]): void;
    /**
     * @param { string } name
     * @param { string } skill
     * @param { Player } player
     * @param { GameEventPromise } event
     * @returns { GameEventPromise }
     */
    static createTrigger(name: string, skill: string, player: Player, event: GameEventPromise, indexedData: any): GameEventPromise;
    /**
     * @legacy Use {@link lib.element.GameEvent.constructor} instead.
     *
     * @param { string } name
     * @param { false } [trigger]
     * @param { GameEventPromise } [triggerEvent]
     */
    static createEvent(name: string, trigger?: false, triggerEvent?: GameEventPromise): import("../library/index.js").GameEventPromise;
    /**
     * @param { string } name
     * @param { { extension: string, sex: Sex, group: string, hp: string | number, skills?: string[], tags?: any[], translate: string } } information
     */
    static addCharacter(name: string, information: {
        extension: string;
        sex: Sex;
        group: string;
        hp: string | number;
        skills?: string[];
        tags?: any[];
        translate: string;
    }): void;
    /**
     * @param { { mode?: string, forbid?: any, character: { [key: string]: Character }, skill: { [key: string]: object }, [key: string]: any } } pack
     * @param { string } [packagename]
     */
    static addCharacterPack(pack: {
        [key: string]: any;
        mode?: string;
        forbid?: any;
        character: {
            [key: string]: Character;
        };
        skill: {
            [key: string]: any;
        };
    }, packagename?: string): void;
    /**
     * @param { string } name
     * @param { Card } info
     * @param { { extension: string, translate: string, description: string, number?: number, color?: string } } info2
     */
    static addCard(name: string, info: Card, info2: {
        extension: string;
        translate: string;
        description: string;
        number?: number;
        color?: string;
    }): void;
    /**
     * @param { { extension: string, mode?: string[], forbid?: string[], list: any[], card: {[key: string]: Card}, skill: { [key: string]: object }  } } pack
     * @param { string } [packagename]
     */
    static addCardPack(pack: {
        extension: string;
        mode?: string[];
        forbid?: string[];
        list: any[];
        card: {
            [key: string]: import("../library/element/card.js").Card;
        };
        skill: {
            [key: string]: any;
        };
    }, packagename?: string): void;
    /**
     * @param { string } name
     * @param { { [key: string]: object } } info
     * @param { string } [translate]
     * @param { string } [description]
     * @param { string } [appendInfo]
     * @param { string } [abInfo]
     */
    static addSkill(name: string, info: {
        [key: string]: any;
    }, translate?: string, description?: string, appendInfo?: string, abInfo?: string): boolean;
    /**
     * @param { string } name
     * @param {*} info
     * @param { { translate: string, config: { [key: string]: object } } } info2
     */
    static addMode(name: string, info: any, info2: {
        translate: string;
        config: {
            [key: string]: any;
        };
    }): void;
    /**
     * @param { string } skill
     * @param { Player } [player]
     */
    static addGlobalSkill(skill: string, player?: Player): boolean;
    /**
     * @param { string } skill
     */
    static removeGlobalSkill(skill: string): void;
    static resetSkills(): void;
    /**
     * @param { string } extensionName
     */
    static hasExtension(extensionName: string): any;
    /**
     * @param { string } extensionName
     */
    static hasExtensionInstalled(extensionName: string): any;
    /**
     * @param { string } extensionName
     */
    static hasExtensionLoaded(extensionName: string): any;
    /**
     * @param { string } extensionName
     * @param { Function } runnable
     */
    static runAfterExtensionLoaded(extensionName: string, runnable: Function): void;
    /**
     * @param { string } extensionName
     * @param { boolean } [keepFile]
     */
    static removeExtension(extensionName: string, keepFile?: boolean): void;
    static addRecentCharacter(...args: any[]): void;
    /**
     * @overload
     * @returns { Card }
     */
    static createCard(): Card;
    /**
     * @overload
     * @param { Card | string } name
     * @param { string } [suit]
     * @param { number | string } [number]
     * @param { string } [nature]
     */
    static createCard(name: Card | string, suit?: string, number?: number | string, nature?: string): any;
    /**
     * @overload
     * @returns { Card }
     */
    static createCard2(): Card;
    /**
     * @overload
     * @param { Card | string } name
     * @param { string } suit
     * @param { number } number
     * @param { string } nature
     */
    static createCard2(name: Card | string, suit: string, number: number, nature: string): any;
    /**
     * @param { boolean } bool
     * @param { Function } callback
     */
    static forceOver(bool: boolean, callback: Function): void;
    /**
     * @param { boolean | string } [result]
     * @param { boolean } [bool]
     * @returns
     */
    static over(result?: boolean | string, bool?: boolean, ...args: any[]): void;
    /**
     * @type { Map<GameEvent, Promise<any>> }
     *
     * 以Promise储存异步事件的执行链，使async content调用事件时无需必须使用await
     *
     * 但是需要事件结果的除外
     */
    static executingAsyncEventMap: Map<GameEvent, Promise<any>>;
    /**
     * @type { GameEventPromise[] }
     */
    static belongAsyncEventList: GameEventPromise[];
    /**
     * @param { GameEventPromise } [belongAsyncEvent]
     */
    static loop(belongAsyncEvent?: GameEventPromise): Promise<void>;
    /**
     * @param { GameEventPromise } [belongAsyncEvent]
     */
    static runContent(belongAsyncEvent?: GameEventPromise): Promise<any>;
    static pause(): void;
    static pause2(): void;
    static resume(): void;
    static resume2(): void;
    static delaye(...args: any[]): import("../library/index.js").GameEventPromise;
    static delayex(...args: any[]): import("../library/index.js").GameEventPromise;
    /**
     * @param { number } [time]
     * @param { number } [time2]
     */
    static delay(time?: number, time2?: number): void;
    /**
     * @param { number } [time]
     * @param { number } [time2]
     */
    static delayx(time?: number, time2?: number): void;
    /**
     * 在async content中对game.delay的代替使用方法
     *
     * 因为async content里不应该使用game.pause和game.resume
     *
     * @param { number } [time]
     * @param { number } [time2]
     */
    static asyncDelay(time?: number, time2?: number): Promise<void>;
    /**
     * 在async content中对game.delayx的代替使用方法
     *
     * 因为async content里不应该使用game.pause和game.resume
     *
     * @param { number } [time]
     * @param { number } [time2]
     */
    static asyncDelayx(time?: number, time2?: number): Promise<void>;
    /**
     * @param { GameEventPromise } [event]
     */
    static check(event?: GameEventPromise): boolean;
    static Check: {
        new (): {};
        processSelection({ type, items, event, useCache, isSelectable }: {
            type: any;
            items: any;
            event: any;
            useCache: any;
            isSelectable: any;
        }): {
            ok: boolean;
            auto: boolean;
        };
        button(event: any, useCache: any): {
            ok: boolean;
            auto: boolean;
        };
        card(event: any, useCache: any): {
            ok: boolean;
            auto: boolean;
        };
        target(event: any, useCache: any): {
            ok: boolean;
            auto: boolean;
        };
        skill(event: any): void;
        confirm(event: any, confirm: any): void;
    };
    static uncheck(...args: any[]): void;
    /**
     * @param { Player } player1
     * @param { Player } player2
     * @param { boolean } [prompt]
     * @param { boolean } [behind]
     * @param { boolean } [noanimate]
     */
    static swapSeat(player1: Player, player2: Player, prompt?: boolean, behind?: boolean, noanimate?: boolean): void;
    /**
     * @param { Player } player1
     * @param { Player } [player2]
     */
    static swapPlayer(player: any, player2?: Player): void;
    /**
     * @param { Player } player
     */
    static swapControl(player: Player): void;
    static swapPlayerAuto(player: any): void;
    /**
     * @param { Player } player
     */
    static findNext(player: Player): import("../library/element/player.js").Player;
    /**
     * @param { string } name
     * @param { Function } callback
     */
    static loadModeAsync(name: string, callback: Function): void;
    /**
     * @param { string } name
     * @param {*} configx
     */
    static switchMode(name: string, configx: any): void;
    /**
     * @param { string } mode
     */
    static loadMode(mode: string): void;
    /**
     * @param  {...string} args
     */
    static loadPackage(...args: string[]): void;
    /**
     * @param { Player } player
     */
    static phaseLoop(player: Player): void;
    /**
     * @param { Player } [player]
     */
    static gameDraw(player?: Player, num?: number): import("../library/index.js").GameEventPromise;
    static chooseCharacterDouble(...args: any[]): void;
    static updateRoundNumber(): void;
    /**
     * @param { Player[] } players
     * @param { number | number[] | (player: Player) => number } num
     * @param { { drawDeck: boolean } } [drawDeck]
     * @param { boolean } [bottom]
     */
    static asyncDraw(players: Player[], num: number | number[] | ((player: Player) => number), drawDeck?: {
        drawDeck: boolean;
    }, bottom?: boolean): void;
    /**
     * @param { Player[] } players
     * @param { number | number[] | (player: Player) => number } num
     * @param { { drawDeck: boolean } } [drawDeck]
     */
    static asyncDrawAuto(players: Player[], num: number | number[] | ((player: Player) => number), drawDeck?: {
        drawDeck: boolean;
    }, ...args: any[]): void;
    static finishSkill(i: any, sub: any): void;
    static finishCards(): void;
    /**
     * 这玩意至少19种重载了吧
     */
    static checkMod(...args: any[]): any;
    /**
     * @param { number } num
     */
    static prepareArena(num: number): void;
    static clearArena(): void;
    static clearConnect(): void;
    static log(...args: any[]): void;
    /**
     * @param { Player } player
     * @param { string | Card[] } card
     * @param { Player[] } [targets]
     * @param { GameEventPromise } [event]
     * @param { boolean } [forced]
     * @param { string } [logvid]
     */
    static logv(player: Player, card: string | Card[], targets?: Player[], event?: GameEventPromise, forced?: boolean, logvid?: string): HTMLDivElement;
    /**
     * @param { string } storeName
     * @param { string } idbValidKey
     * @param { any } value
     * @param { Function } [onSuccess]
     * @param { Function } [onError]
     */
    static putDB(storeName: string, idbValidKey: string, value: any, onSuccess?: Function, onError?: Function): Promise<any>;
    /**
     *
     * @param { string } storeName
     * @param { string | null } [query]
     * @param { Function } [onSuccess]
     * @param { Function } [onError]
     */
    static getDB(storeName: string, query?: string | null, onSuccess?: Function, onError?: Function): Promise<any>;
    /**
     * @param { string } storeName
     * @param { string } [query]
     * @param { Function } [onSuccess]
     * @param { Function } [onError]
     */
    static deleteDB(storeName: string, query?: string, onSuccess?: Function, onError?: Function): Promise<any>;
    /**
     * @param { string } key
     * @param { * } [value]
     * @param { string } [mode]
     */
    static save(key: string, value?: any, mode?: string): void;
    static showChangeLog(): void;
    /**
     * @param { string } str
     * @param { string } [extname]
     */
    static showExtensionChangeLog(str: string, extname?: string): void;
    /**
     * @param { string } key
     * @param { * } [value]
     * @param { string | boolean } [local]
     * @param { Function } [callback]
     */
    static saveConfig(key: string, value?: any, local?: string | boolean, callback?: Function): void;
    /**
     * @param { string } key
     */
    static saveConfigValue(key: string): void;
    /**
     * @param { string } extension
     * @param { string } key
     * @param { * } [value]
     */
    static saveExtensionConfig(extension: string, key: string, value?: any): void;
    /**
     * @param { string } extension
     * @param { string } key
     */
    static saveExtensionConfigValue(extension: string, key: string): void;
    /**
     * @param { string } extension
     * @param { string } key
     */
    static getExtensionConfig(extension: string, key: string): any;
    /**
     * @param { string } mode
     */
    static clearModeConfig(mode: string): void;
    /**
     * @param { number } position
     * @param { string } [character]
     * @param { string } [character2]
     */
    static addPlayer(position: number, character?: string, character2?: string): import("../library/element/player.js").Player;
    /**
     * @param { number } position
     * @param { string } [character]
     * @param { string } [animation]
     */
    static addFellow(position: number, character?: string, animation?: string): import("../library/element/player.js").Player;
    /**
     * @param { Player } player
     */
    static triggerEnter(player: Player): import("../library/index.js").GameEventPromise;
    /**
     * @param { Player } player
     */
    static restorePlayer(player: Player): import("../library/element/player.js").Player;
    /**
     * @param { Player } player
     */
    static removePlayer(player: Player): import("../library/element/player.js").Player;
    /**
     * @param { Player } player
     * @param { string } [character]
     * @param { string } [character2]
     */
    static replacePlayer(player: Player, character?: string, character2?: string): import("../library/element/player.js").Player;
    static arrangePlayers(): void;
    /**
     * @param { string[] } skills
     * @param { Player } player
     * @param { string[] } exclude
     */
    static filterSkills(skills: string[], player: Player, exclude: string[]): string[];
    /**
     * @param { string[] } skills
     */
    static expandSkills(skills: string[]): string[];
    /**
     * @param { { [key:string]: any } } style
     */
    static css(style: {
        [key: string]: any;
    }): void;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static hasPlayer(func: (player: Player) => boolean, includeOut?: boolean): boolean;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static hasPlayer2(func: (player: Player) => boolean, includeOut?: boolean): boolean;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static countPlayer(func: (player: Player) => boolean, includeOut?: boolean): number;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static countPlayer2(func: (player: Player) => boolean, includeOut?: boolean): number;
    /**
     * @overload
     * @returns { Player[] }
     */
    static filterPlayer(): Player[];
    /**
     * @overload
     * @param { (player: Player) => boolean } func
     * @param { Player[] } [list]
     * @param { boolean } [includeOut]
     * @returns { Player[] }
     */
    static filterPlayer(func: (player: Player) => boolean, list?: Player[], includeOut?: boolean): Player[];
    /**
     * @overload
     * @returns { Player[] }
     */
    static filterPlayer2(): Player[];
    /**
     * @overload
     * @param { (player: Player) => boolean } func
     * @param { Player[] } [list]
     * @param { boolean } [includeOut]
     * @returns { Player[] }
     */
    static filterPlayer2(func: (player: Player) => boolean, list?: Player[], includeOut?: boolean): Player[];
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static findPlayer(func: (player: Player) => boolean, includeOut?: boolean): import("../library/element/player.js").Player;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [includeOut]
     */
    static findPlayer2(func: (player: Player) => boolean, includeOut?: boolean): import("../library/element/player.js").Player;
    /**
     * @param { (player: Player) => boolean } func
     * @param { boolean } [all]
     */
    static findCards(func: (player: Player) => boolean, all?: boolean): string[];
    static countGroup(): number;
    /**
     * 此函数用于计算函数的时间消耗。
     * @param {function} 测试的函数
     * @returns {number} 消耗的时间
     */
    static testRunCost(func: any): number;
    /**
     * 此方法用于对所有targets按顺序执行一个async函数。
     *
     * @param { Player[] } targets 需要执行async方法的目标
     * @param { (player: Player, i: number) => Promise<any | void> } asyncFunc 需要执行的async方法
     * @param { (a: Player, b: Player) => number } sort 排序器，默认为lib.sort.seat
     */
    static doAsyncInOrder(targets: Player[], asyncFunc: (player: Player, i: number) => Promise<any | void>, sort: (a: Player, b: Player) => number): Promise<void>;
}
export const game: typeof Game;
export type GameHistory = {
    cardMove: GameEventPromise[];
    custom: GameEventPromise[];
    useCard: GameEventPromise[];
    changeHp: GameEventPromise[];
    everything: GameEventPromise[];
};
export type Video = {
    type: string;
    player?: string;
    content?: string | any[];
    delay: number;
};
export type Videos = {
    mode: string;
    name: string[];
    name1: string;
    name2?: string;
    time: number;
    video: Video;
    win: boolean;
};
import { Uninstantable } from "../util/index.js";
import { GamePromises } from "./promises.js";
import { DynamicStyle } from "./dynamic-style/index.js";
import { Library as lib } from '../library/index.js';
import { delay } from "../util/index.js";
