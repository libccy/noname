// 喵喵！step写法的content全在这里处理喵！

import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler.ts";
import { _status, ai, game, get, lib, ui } from "../../../../../noname.js";
import ContentCompilerBase from "./ContentCompilerBase.ts";
import ContentCompiler from "./ContentCompiler.ts";
import security from "../../../../util/security.js";
import { CodeSnippet, ErrorManager } from "../../../../util/error.js";

export default class StepCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "step";
    }

    filter(_: EventContent) {
        return true; // 无需任何额外过滤
    }

    compile(content: EventContent): EventCompiledContent {
        if (typeof content != "function")
            throw new Error("StepCompiler只能接受函数");

        const compiled = StepCompiler.parseStep(content);
        compiled.type = "step";
        compiled.original = content;
        return compiled;
    }

    static parseStep(func: Function) {
        if (typeof func !== "function")
            throw new TypeError("为确保安全禁止用parsex/parseStep解析非函数");

        // 虽然现在 parsex 被控制到了沙盒，
        // 但是因为默认沙盒还是可以额外操作东西，
        // 故而对不同的运行域做了区分
        const [
            _ModFunction,
            _ModGeneratorFunction,
            ModAsyncFunction,
            // ModAsyncGeneratorFunction,
        ] = security.getIsolatedsFrom(func);

        //by 诗笺、Tipx-L
        // 沙盒在封装函数时，为了保存源代码会另外存储函数的源代码
        const decompileFunction: (func: Function) => string =
            security.isSandboxRequired()
                ? security.importSandbox().Marshal.decompileFunction
                : Function.prototype.call.bind(Function.prototype.toString);

        //Remove all comments
        //移除所有注释
        const code = decompileFunction(func)
            .replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|(?:\r?\n|[\s\S])[^/"'\\\s]*)/gm, "$2")
            .trim();

        //获取第一个 { 后的所有字符
        let str = code.slice(code.indexOf("{") + 1).trimEnd();
        // 因为我们丢掉了开头的`{`，现在要去除尾`}`
        str = str.slice(0, str.lastIndexOf("}"));

        //判断代码中是否有debugger
        let regex = /event\.debugger\(\)/;
        let hasDebugger = false;
        let insertDebugger = `await event.debugger()`; // yield code=>eval(code) 唔唔不是我干的喵
        let debuggerSkip = 0;
        let debuggerResult: RegExpMatchArray | null;

        while ((debuggerResult = str.slice(debuggerSkip).match(regex)) != null) {
            if (debuggerResult.index == null)
                throw new Error("匹配到了debugger但是没有索引值");

            let debuggerCopy = str;
            debuggerCopy = debuggerCopy.slice(0, debuggerSkip + debuggerResult.index) + insertDebugger + debuggerCopy.slice(debuggerSkip + debuggerResult.index + debuggerResult[0].length, -1);
            //测试是否有错误
            try {
                new ModAsyncFunction(debuggerCopy);
                str = debuggerCopy + "}";
                debuggerSkip += debuggerResult.index + insertDebugger.length;
                hasDebugger = true;
            } catch (error) {
                debuggerSkip += debuggerResult.index + debuggerResult[0].length;
            }
        }

        const contents: Function[] = [];
        const deconstructs = ["step", "source", "target", "targets", "card", "cards", "skill", "forced", "num"];
        const topVars = ["_status", "lib", "game", "ui", "get", "ai"];

        const compileStep = (code: string) => {
            const params = ["topVars", "event", "trigger", "player", "_result"];
            const body = `
                var { ${deconstructs.join(", ")} } = event;
                var { ${topVars.join(", ")} } = topVars;
                var { result } = _result || {};
                ${code}\n
                return event.next[event.next.length - 1];
            `;

            return new ModAsyncFunction(...params, body).bind(null, { lib, game, ui, get, ai, _status });
        };

        const packStep = (code: string) => {
            const compiled = compileStep(code);
            ErrorManager.setCodeSnippet(compiled, new CodeSnippet(code, 3)); // 记录编译后函数的原代码片段
            contents.push(compiled)
        };

        //func中要写步骤的话，必须要写step 0
        if (str.indexOf("step 0") == -1) {
            packStep(str);
        } else {
            let skip = 0;
            let step = 0;
            let result: RegExpMatchArray | null;

            //去除99个step的限制
            while ((result = str.slice(skip).match(new RegExp(`\\(?['"]step ${step}['"]\\)?;?`))) != null) {
                if (result.index == null)
                    throw new Error("匹配到了step但是没有索引值");

                const head = str.slice(0, skip + result.index);

                if (step > 0) {
                    try {
                        packStep(head);
                    } catch (e) {
                        skip = result.index + result[0].length;
                        continue;
                    }
                }

                str = str.slice(head.length + result[0].length);
                skip = 0;
                step++;
            }

            packStep(str);
        }

        return ContentCompiler.compile(contents);
    }
}