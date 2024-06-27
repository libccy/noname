import { game } from "../../../game";
import { _status } from "../../../status";
import IContentCompiler, { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler";

type HandlerOption = { state?: "begin" | "end" };

/**
 * 向子类提供统一的公共方法
 */
export default abstract class ContentCompilerBase implements IContentCompiler {
    abstract get type(): EventContentTypes;
    abstract filter(content: EventContent): boolean;
    abstract compile(content: EventContent): EventCompiledContent;

    /**
     * ```plain
     * 对于事件执行前的一些准备工作
     * ```
     * 
     * @param event 事件
     */
    beforeExecute(event: GameEvent) {
        const handlerType = event.getDefaultHandlerType() as `on${Capitalize<string>}`;
        const option: HandlerOption = { state: "begin" };
        event.callHandler(handlerType, event, option);
    }

    /**
     * ```plain
     * 判断事件能否继续执行
     * ```
     * 
     * @param event 事件
     * @returns 当返回true继续执行，当返回false时，代表event.finish()已经被调用
     */
    checkPrevented(event: GameEvent): boolean {
        const { player } = event;
        let prevent = false;

        if (event.name != "phaseLoop") {
            let action: string | null = null;

            if (player?.isDead() && !event.forceDie)
                action = "die";
            else if (player?.isOut() && !event.includeOut)
                action = "out";
            else if (player?.removed)
                action = "remove";

            switch (action) {
                case "die":
                    // 抽象喵，game.broadcastAll不能传函数喵
                    // @ts-ignore
                    game.broadcastAll(function () {
                        while (_status.dieClose.length) {
                            _status.dieClose.shift().close();
                        }
                    });
                    event._oncancel?.();
                    break;
                case "out":
                    if (event.name == "phase"
                        && player == _status.roundStart
                        && !event.skill)
                        _status.roundSkipped = true;
                    break;
            }

            if (action) {
                prevent = true;
                event.finish();
            }
        }

        return !prevent;
    }

    /**
     * ```plain
     * 对于事件执行后的一些收尾工作
     * ```
     * 
     * @param event 事件
     */
    afterExecute(event: GameEvent) {
        event.clearStepCache(null);

        const handlerType = event.getDefaultHandlerType() as `on${Capitalize<string>}`;
        const option: HandlerOption = { state: "end" };
        event.callHandler(handlerType, event, option);
    }
}
