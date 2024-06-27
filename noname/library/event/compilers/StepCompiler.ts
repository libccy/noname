// 喵喵！step写法的content全在这里处理喵！

import { EventCompiledContent, EventContent, EventContentTypes } from "./IContentCompiler";
import { _status, ai, game, get, lib, ui } from "../../../../noname";
import ContentCompilerBase from "./ContentCompilerBase";
import ContentCompiler from "./ContentCompiler";
import security from "../../../util/security";
import { CodeSnippet, ErrorManager } from "../../../util/error";

export default class StepCompiler extends ContentCompilerBase {
    get type(): EventContentTypes {
        return "step";
    }

    filter(_: EventContent) {
        return true; // 无需任何额外过滤
    }

    static #mapArgs(event: GameEvent): any[] {
        return [
            event, event.step, event.source,
            event.player, event.target, event.targets,
            event.card, event.cards, event.skill,
            event.forced, event.num, event._trigger,
            event._result,
            _status, lib, game, ui, get, ai,
        ];
    }

    compile(content: EventContent): EventCompiledContent {
        if (typeof content != "function")
            throw new Error("StepCompiler只能接受函数");

        const compiled = StepCompiler.parseStep(content);
        compiled.type = "step";
        return compiled;

        // const final: EventCompiledContent = async (event) => {
        //     if (!Number.isInteger(event.step))
        //         event.step = 0;

        //     while (!event.finished) {
        //         this.beforeExecute(event);

        //         if (this.checkPrevented(event)) {
        //             const args = StepCompiler.#mapArgs(event);
        //             Reflect.apply(compiled, event, args);
        //         }

        //         this.afterExecute(event);
        //         event.step++;

        //         event._result = await event.waitNext(); // 等待狂神喵的代码哦
        //     }
        // };

        // final.type = "step";
        // return final;
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
        let str = code.slice(code.indexOf("{") + 1);
        //判断代码中是否有debugger
        let regex = /event\.debugger\(\)/;
        let hasDebugger = false;
        let insertDebugger = `await event.debugger()`; // yield code=>eval(code) 唔唔不是我干的喵
        let debuggerSkip = 0;
        let debuggerResult;

        while ((debuggerResult = str.slice(debuggerSkip).match(regex)) != null) {
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
        const argList = ["event", "step", "source", "player", "target", "targets", "card", "cards",
            "skill", "forced", "num", "trigger", "result", "_status", "lib", "game", "ui", "get", "ai"];

        //func中要写步骤的话，必须要写step 0
        if (str.indexOf("step 0") == -1) {
            const compiled = new ModAsyncFunction(...argList, str);
            ErrorManager.setCodeSnippet(compiled, new CodeSnippet(str, 3)); // 记录编译后函数的原代码片段
            contents.push(compiled);
        } else {
            let skip = 0;
            let step = 0;
            let result: RegExpMatchArray | null;

            //去除99个step的限制
            while ((result = str.slice(skip).match(new RegExp(`\\(?['"]step ${step}['"]\\)?;?`))) != null) {
                if (result.index == null)
                    throw new Error("匹配到了step但是没有索引值");

                const head = str.slice(0, skip + result.index);

                try {
                    const compiled = new ModAsyncFunction(...argList, head);
                    ErrorManager.setCodeSnippet(compiled, new CodeSnippet(head, 3)); // 记录编译后函数的原代码片段
                    contents.push(compiled);
                } catch (e) {
                    skip = result.index + result[0].length;
                    continue;
                }

                str = str.slice(head.length + result[0].length);
                skip = 0;
                step++;
            }
        }

        return ContentCompiler.compile(contents);
    }
}

ContentCompiler.compiler(new StepCompiler());