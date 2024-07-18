import ContentCompilerBase from "./ContentCompilerBase.js";
export default class ArrayCompiler extends ContentCompilerBase {
    get type() {
        return "array";
    }
    filter(_) {
        return true;
    }
    compile(content) {
        if (!Array.isArray(content))
            throw new ReferenceError("content必须是一个数组");
        const compiled = async (event) => {
            const originals = compiled.originals;
            if (!Array.isArray(originals))
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
                let result;
                if (!this.isPrevented(event)) {
                    const original = originals[event.step];
                    const next = await Reflect.apply(original, event, [event, event._trigger, event.player]);
                    result = next && next.result;
                }
                const nextResult = await event.waitNext();
                event._result = result || nextResult || event._result;
                this.afterExecute(event);
            }
        };
        compiled.type = "array";
        compiled.originals = content;
        return compiled;
    }
}
