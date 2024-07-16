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

            while (!event.finished) {
                if (event.step >= originals.length){
                    event.finish();
                    break;
                }
                this.beforeExecute(event);
                event.step ++;
                let result: Result | undefined;
                if (!this.isPrevented(event)) {
                    const original = originals[event.step];
                    const next = await Reflect.apply(original, event, [event, event._trigger, event.player]);
                    result = next && next.result;
                }
                const nextResult = await event.waitNext();
                event._result = result || nextResult || event._result;
                event.updateStep();
                this.afterExecute(event);
            }
        };
        compiled.type = "array";
        compiled.originals = content;
        return compiled;
    }
}