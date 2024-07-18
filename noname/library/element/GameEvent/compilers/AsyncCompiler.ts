// 因为需要规范content的函数体，所以即使是async也要编译喵！

import ContentCompiler from "./ContentCompiler.ts";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import { EventCompiledContent, EventContent } from "./IContentCompiler.ts";

type AsyncFunction<R> = (...args: any[]) => Promise<R>;

export default class AsyncCompiler extends ContentCompilerBase {
    type = "async";

    filter(content: EventContent): boolean {
        if(typeof content !== 'function') return false;
        return content.constructor.name === "AsyncFunction" && content.length >= 1;
    }

    compile(content: EventContent): EventCompiledContent {
        const original = content as AsyncFunction<void>;
        const compiled: EventCompiledContent = ContentCompiler.compile([original]);

        compiled.type = this.type;
        compiled.original = content;
        return compiled;
    }
}
