import ContentCompiler from "./ContentCompiler.ts";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler.ts";
import { GameEvent } from "../../gameEvent.js";

export default class ArrayCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "array";
    }

    filter(_: EventContent): boolean {
        return true;
    }

    compile(content: EventContent): EventCompiledContent {
        const compiled: EventCompiledContent & { originals: Function[] } = async (event) => {
            const trigger = event._trigger;
            const player = event.player;

            if (!Number.isInteger(event.step))
                event.step = 0;

            while (event.step < compiled.originals.length && !event.finished) {
                this.beforeExecute(event);

                if (!this.isPrevented(event)) {
                    const original = compiled.originals[event.step];
                    event._result = await Reflect.apply(
                        original, this, [event, trigger, player, event._result || {}]);
                }

                await event.waitNext();
                this.afterExecute(event);
                event.step++;

                if (event.step >= compiled.originals.length) event.finish();
            }
        };
        compiled.originals = content as Function[];
        compiled.type = "array";
        return compiled;
    }
}