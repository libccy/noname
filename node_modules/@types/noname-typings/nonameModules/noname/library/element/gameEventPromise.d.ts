/**
 * 将事件Promise化以使用async异步函数来执行事件。
 *
 * 事件Promise化后，需要既能使用await等待事件完成，
 * 又需要在执行之前对事件进行配置。
 *
 * 所以这个类的实例集成了事件和Promise二者的所有属性，
 * 且Promise的原有属性无法被修改，一切对这个类实例的属性修改，删除，
 * 再配置等操作都会转发到事件对应的属性中。
 *
 * @extends {Promise<GameEvent>}
 *
 * @example
 * 使用await xx()等待异步事件执行：
 * ```js
 * await game.xxx().setContent('yyy').set(zzz, 'i');
 * ```
 * 使用await player.xxx()等待异步事件执行：
 * ```js
 * await player.draw(2);
 * game.log('等待', player, '摸牌完成执行log');
 * ```
 */
export class GameEventPromise extends Promise<import("./gameEvent.js").GameEvent> {
    /**
     * @param { GameEvent | GameEventPromise } arg
     */
    constructor(arg: GameEvent | GameEventPromise);
    /** 获取原事件对象 */
    toEvent(): import("./gameEvent.js").GameEvent;
    /**
     * 在某个异步事件中调试变量信息
     *
     * 注: 在调试步骤中`定义的变量只在当前输入的语句有效`
     *
     * @example
     * 在技能中调试技能content相关的信息
     * ```js
     * await event.debugger();
     * ```
     * 在技能中调试触发此技能事件的相关的信息
     * ```js
     * await trigger.debugger();
     * ```
     */
    debugger(): Promise<any>;
    /**
     *
     * 直接获得result中的信息。
     *
     *
     * @example
     * ①
     * let chooseCardResult = await player.chooseCard().forResult();
     * 选择的卡牌：chooseCardResult.cards
     * ②
     * let cards = await player.chooseCard().forResult('cards');
     * 选择的卡牌：cards
     * ③
     * let [success,cards,targets] = await player.chooseCardTarget().forResult('bool','cards','targets');
     * success:是否做出选择。
     * cards:选择的牌。
     * targets:选择的目标。
     *
     * @returns {Promise} 返回的结果
     */
    forResult(...args: any[]): Promise<any>;
    /**
     * 返回result中的bool项。
     *
     * @returns {Promise<boolean>} 返回的bool项
     */
    forResultBool(): Promise<boolean>;
    /**
     * 返回result中的targets项。
     *
     * @returns {Promise<Player[]>} 返回的targets项。
     *
     */
    forResultTargets(): Promise<Player[]>;
    /**
     * 返回result中的cards项
     *
     * @returns {Promise<Card[]>} 返回的cards项。
     *
     */
    forResultCards(): Promise<Card[]>;
    /**
     * 返回result中的card项
     *
     * @returns {Promise<VCard>|Promise<Card>} 返回的card项。
     *
     */
    forResultCard(): Promise<VCard> | Promise<Card>;
    /**
     * 返回result中的control项。
     *
     * @returns {Promise<string>} 返回的control项。
     */
    forResultControl(): Promise<string>;
    /**
     * 返回result中的links项。
     *
     * @returns {Promise<Array<any>>} 返回的links项。
     */
    forResultLinks(): Promise<Array<any>>;
    #private;
}
