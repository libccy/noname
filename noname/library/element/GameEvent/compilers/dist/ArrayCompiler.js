import ContentCompilerBase from "./ContentCompilerBase.js";
export default class ArrayCompiler extends ContentCompilerBase {
    type = "array";
    filter(content) {
        return Array.isArray(content);
    }
    compile(content) {
        if (!Array.isArray(content))
            throw new ReferenceError("content必须是一个数组");
        const compiled = async (event) => {
            if (!Number.isInteger(event.step))
                event.step = 0;
            while (!event.finished) {
                if (event.step >= content.length) {
                    event.finish();
                    break;
                }
                this.beforeExecute(event);
                event.step++;
                let result;
                if (!this.isPrevented(event)) {
                    const original = content[event.step];
                    const next = await Reflect.apply(original, event, [event, event._trigger, event.player]);
                    result = next && next.result;
                }
                const nextResult = await event.waitNext();
                event._result = result || nextResult || event._result;
                this.afterExecute(event);
            }
        };
        compiled.type = this.type;
        compiled.original = content;
        return compiled;
    }
}