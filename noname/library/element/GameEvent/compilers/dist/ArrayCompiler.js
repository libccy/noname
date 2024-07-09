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
            while (event.step < originals.length && !event.finished) {
                this.beforeExecute(event);
                if (!this.isPrevented(event)) {
                    const original = originals[event.step];
                    const next = await Reflect.apply(original, this, [event, event._trigger, event.player]);
                    event._result = next && next.result || event._result;
                }
                await event.waitNext();
                this.afterExecute(event);
                event.step += 2;
                if (event.step >= originals.length)
                    event.finish();
            }
        };
        compiled.type = "array";
        compiled.originals = content;
        return compiled;
    }
}
