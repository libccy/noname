import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler.ts";
import { _status, ai, game, get, lib, ui } from "../../../../../noname.js";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import ContentCompiler from "./ContentCompiler.ts";

export default class YieldCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "yield";
    }

    static #mapArgs(event: GameEvent): Record<string, any> {
        const {
            step, source, target, targets,
            card, cards, skill, forced,
            num, _result, _trigger, player
        } = event;

        return {
            event, step, source, player,
            target, targets, card, cards, skill,
            forced, num, trigger: _trigger,
            result: _result,
            _status, lib, game, ui, get, ai,
        };
    }

    filter(_: EventContent): boolean {
        return true;
    }

    compile(content: EventContent): EventCompiledContent {
        const original = content as GeneratorFunction;
        const compiled: EventCompiledContent = async (event) => {
            const args = YieldCompiler.#mapArgs(event);
            const generator: Generator<any, void, any> =
                Reflect.apply(original, event, [event, args]);

            let result: any = null;

            while (!event.finished) {
                let value: any = null;
                let done: boolean | undefined = false;

                this.beforeExecute(event);

                if (!this.isPrevented(event))
                    ({ value, done } = generator.next(result));

                this.afterExecute(event);

                const needResult = event.next.includes(value);

                await event.waitNext(); // 等待狂神喵的代码喵

                // return和finish两种情况都可以跳出循环
                if (done || event.finished) {
                    event.finish();
                    continue;
                }

                // 加个判断防止笨蛋的操作喵
                // 你见过有人yield player.insertPhase()然后来问为什么卡了的喵？
                if (needResult)
                    result = value.result;
            }

            generator.return();
        };

        compiled.type = "yield";
        return compiled;
    }
}
