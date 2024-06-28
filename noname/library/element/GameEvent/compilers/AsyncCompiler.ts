// 因为需要规范content的函数体，所以即使是async也要编译喵！

import ContentCompiler from "./ContentCompiler";
import ContentCompilerBase from "./ContentCompilerBase";
import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler";

type AsyncFunction<R> = (...args: any[]) => Promise<R>;

export default class AsyncCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "async";
    }

    filter(_: EventContent): boolean {
        return true;
    }

    compile(content: EventContent): EventCompiledContent {
        const original = content as AsyncFunction<void>;
        const compiled: EventCompiledContent = async (event) => {
            const trigger = event._trigger;
            const player = event.player;

            this.beforeExecute(event);

            if (this.checkPrevented(event))
                await Reflect.apply(original, this, [event, trigger, player]);

            this.afterExecute(event);
        };

        compiled.type = "async";
        return compiled;
    }
}

ContentCompiler.compiler(new AsyncCompiler());