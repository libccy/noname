import { _status, ai, game, get, lib, ui } from "../../../../../../noname.js";
import ContentCompilerBase from "./ContentCompilerBase.js";
export default class YieldCompiler extends ContentCompilerBase {
    type = "yield";
    static #mapArgs(event) {
        const { step, source, target, targets, card, cards, skill, forced, num, _result, _trigger, player } = event;
        return {
            event, step, source, player,
            target, targets, card, cards, skill,
            forced, num, trigger: _trigger,
            result: _result,
            _status, lib, game, ui, get, ai,
        };
    }
    filter(content) {
        return typeof content === "function" && content.constructor.name === "GeneratorFunction";
    }
    compile(content) {
        return async (event) => {
            const args = YieldCompiler.#mapArgs(event);
            const generator = Reflect.apply(content, event, [event, args]);
            let result = null;
            while (!event.finished) {
                let value = null;
                let done = false;
                this.beforeExecute(event);
                if (!this.isPrevented(event))
                    ({ value, done } = generator.next(result));
                this.afterExecute(event);
                const needResult = event.next.includes(value);
                await event.waitNext();
                if (done || event.finished) {
                    event.finish();
                    continue;
                }
                if (needResult)
                    result = value.result;
            }
            generator.return();
        };
    }
}
