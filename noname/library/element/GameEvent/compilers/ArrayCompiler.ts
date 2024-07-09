import ContentCompiler from "./ContentCompiler.ts";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler.ts";

export default class ArrayCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "array";
    }

    filter(_: EventContent): boolean {
        return true;
    }

    compile(content: EventContent): EventCompiledContent {
        if(!Array.isArray(content))
            throw new ReferenceError("content必须是一个数组");

        const compiled: EventCompiledContent = async (event) => {
            const originals = compiled.originals;

            if(!Array.isArray(originals))
                throw new ReferenceError("compiled.originals必须是一个数组");
            
            if (!Number.isInteger(event.step))
                event.step = 0;

            while (event.step < originals.length && !event.finished) {
                this.beforeExecute(event);

                if (!this.isPrevented(event)) {
                    const original = originals[event.step];
                    event._result = (await Reflect.apply(
                        original, this, [event, event._trigger, event.player]))?.result ?? event._result;
                }

                await event.waitNext();
                this.afterExecute(event);
                event.step += 2;

                if (event.step >= originals.length) event.finish();
            }
        };
        compiled.type = "array";
        compiled.originals = content;
        return compiled;
    }
}