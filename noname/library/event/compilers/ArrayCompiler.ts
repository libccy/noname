import ContentCompiler from "./ContentCompiler";
import ContentCompilerBase from "./ContentCompilerBase";
import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler";

export default class ArrayCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "array";
    }

    filter(_: EventContent): boolean {
        return true;
    }

    compile(content: EventContent): EventCompiledContent {
        const originals = content as Function[];
        const compiled: EventCompiledContent = async (event) => {
            const trigger = event._trigger;
            const player = event.player;

            let resultEvent: GameEvent | null = null;

            if (!Number.isInteger(event.step))
                event.step = 0;

            while (event.step < originals.length && !event.finished) {
                this.beforeExecute(event);

                if (this.checkPrevented(event)) {
                    const original = originals[event.step];
                    const nextResultEvent = await Reflect.apply(
                        original, this, [event, trigger, player, resultEvent]);

                    if (event.next.includes(nextResultEvent))
                        resultEvent = nextResultEvent;
                }

                this.afterExecute(event);
                event.step++;

                event._result = await event.waitNext(); // 等待狂神喵的代码哦
            }
        };

        compiled.type = "array";
        return compiled;
    }
}

ContentCompiler.compiler(new ArrayCompiler());