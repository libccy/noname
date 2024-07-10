import ContentCompiler from "./ContentCompiler.js";
import ContentCompilerBase from "./ContentCompilerBase.js";
export default class AsyncCompiler extends ContentCompilerBase {
    get type() {
        return "async";
    }
    filter(_) {
        return true;
    }
    compile(content) {
        const original = content;
        const compiled = ContentCompiler.compile([original]);
        compiled.type = "async";
        compiled.original = content;
        return compiled;
    }
}