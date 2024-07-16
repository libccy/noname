import { _status, ai, game, get, lib, ui } from "../../../../../../noname.js";
import ContentCompilerBase from "./ContentCompilerBase.js";
import ContentCompiler from "./ContentCompiler.js";
import security from "../../../../../util/security.js";
import { CodeSnippet, ErrorManager } from "../../../../../util/error.js";
export default class StepCompiler extends ContentCompilerBase {
    get type() {
        return "step";
    }
    filter(_) {
        return true;
    }
    compile(content) {
        if (typeof content != "function")
            throw new Error("StepCompiler只能接受函数");
        const compiled = StepCompiler.parseStep(content);
        compiled.type = "step";
        compiled.original = content;
        return compiled;
    }
    static parseStep(func) {
        if (typeof func !== "function")
            throw new TypeError("为确保安全禁止用parsex/parseStep解析非函数");
        const [_ModFunction, _ModGeneratorFunction, ModAsyncFunction,] = security.getIsolatedsFrom(func);
        const decompileFunction = security.isSandboxRequired()
            ? security.importSandbox().Marshal.decompileFunction
            : Function.prototype.call.bind(Function.prototype.toString);
        const code = decompileFunction(func)
            .replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|(?:\r?\n|[\s\S])[^/"'\\\s]*)/gm, "$2")
            .trim();
        let str = code.slice(code.indexOf("{") + 1).trimEnd();
        str = str.slice(0, str.lastIndexOf("}"));
        let regex = /event\.debugger\(\)/;
        let hasDebugger = false;
        let insertDebugger = `await event.debugger()`;
        let debuggerSkip = 0;
        let debuggerResult;
        while ((debuggerResult = str.slice(debuggerSkip).match(regex)) != null) {
            if (debuggerResult.index == null)
                throw new Error("匹配到了debugger但是没有索引值");
            let debuggerCopy = str;
            debuggerCopy = debuggerCopy.slice(0, debuggerSkip + debuggerResult.index) + insertDebugger + debuggerCopy.slice(debuggerSkip + debuggerResult.index + debuggerResult[0].length, -1);
            try {
                new ModAsyncFunction(debuggerCopy);
                str = debuggerCopy + "}";
                debuggerSkip += debuggerResult.index + insertDebugger.length;
                hasDebugger = true;
            }
            catch (error) {
                debuggerSkip += debuggerResult.index + debuggerResult[0].length;
            }
        }
        const contents = [];
        const deconstructs = ["step", "source", "target", "targets", "card", "cards", "skill", "forced", "num", "_result: result"];
        const topVars = ["_status", "lib", "game", "ui", "get", "ai"];
        const compileStep = (code, stepHead) => {
            const params = ["topVars", "event", "trigger", "player"];
            const body = `
                var { ${deconstructs.join(", ")} } = event;
                var { ${topVars.join(", ")} } = topVars;
                ${[stepHead, code].filter(Boolean)
                .map(c => `{\n${c}\n}\n`).join("")}
            `;
            return function(...args){
                return new ModAsyncFunction(...params, body)
                    //@ts-ignore
                    .apply(this, [{ lib, game, ui, get, ai, _status }, ...args]);
            }
        };
        const packStep = (code, stepHead) => {
            const compiled = compileStep(code, stepHead);
            ErrorManager.setCodeSnippet(compiled, new CodeSnippet(code, 3));
            contents.push(compiled);
        };
        if (str.indexOf("step 0") == -1) {
            packStep(str);
        }
        else {
            let skip = 0;
            let step = 0;
            let stepHead = null;
            let result;
            while ((result = str.slice(skip).match(new RegExp(`\\(?['"]step ${step}['"]\\)?;?`))) != null) {
                if (result.index == null)
                    throw new Error("匹配到了step但是没有索引值");
                const head = str.slice(0, skip + result.index);
                if (step > 0) {
                    try {
                        packStep(head, stepHead);
                    }
                    catch (e) {
                        skip = result.index + result[0].length;
                        continue;
                    }
                }
                else {
                    stepHead = head.trim();
                    if (stepHead.length == 0)
                        stepHead = null;
                }
                str = str.slice(head.length + result[0].length);
                skip = 0;
                step++;
            }
            packStep(str, stepHead);
        }
        return ContentCompiler.compile(contents);
    }
}
