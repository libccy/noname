// 因为需要规范content的函数体，所以即使是async也要编译喵！

import ContentCompiler from "./ContentCompiler.ts";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler.ts";

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
        const compiled: EventCompiledContent = ContentCompiler.compile([original]);

        compiled.type = "async";
        return compiled;
    }
}
