import { lib } from "../../../../../../noname.js";
import { Uninstantable } from "../../../../../util/index.js";
import StepCompiler from "./StepCompiler.js";
import YieldCompiler from "./YieldCompiler.js";
import AsyncCompiler from "./AsyncCompiler.js";
import ArrayCompiler from "./ArrayCompiler.js";
export default class ContentCompiler extends Uninstantable {
    static #compilerTypes = new Set();
    static #compilers = new Set();
    static #compiledContent = new WeakMap();
    static addCompiler(compiler) {
        const type = compiler.constructor;
        if (typeof type !== "function")
            throw new TypeError("content编译器没有明确的类型");
        if (ContentCompiler.#compilerTypes.has(type))
            throw new TypeError("相同的content编译器类型不能重复注册");
        ContentCompiler.#compilerTypes.add(type);
        ContentCompiler.#compilers.add(compiler);
    }
    static getType(content) {
        if (Array.isArray(content))
            return "array";
        switch (content.constructor.name) {
            case "AsyncFunction":
                return "async";
            case "GeneratorFunction":
                return "yield";
            case "Function":
                return "step";
        }
        throw new Error(`尝试从非事件content获取类型: ${content.constructor.name}`);
    }
    static regularize(content) {
        let result;
        if (typeof content === 'string') {
            result = lib.element.content[content]
                ?? lib.element.contents[content];
        }
        else if (Symbol.iterator in content) {
            result = Array.from(content);
        }
        else
            result = content;
        return result;
    }
    static compile(content) {
        const target = ContentCompiler.regularize(content);
        if (!target)
            throw new Error(`尝试编译一个空的事件content`);
        const cached = ContentCompiler.#compiledContent.get(target);
        if (cached)
            return cached;
        const type = ContentCompiler.getType(target);
        for (const compiler of ContentCompiler.#compilers) {
            const compilerType = compiler.type;
            if (type !== compilerType
                && (!Array.isArray(compilerType)
                    || !compilerType.includes(type)))
                continue;
            if (compiler.filter(target)) {
                const compiled = compiler.compile(target);
                ContentCompiler.#compiledContent.set(target, compiled);
                return compiled;
            }
        }
        throw new Error(`没有编译器接受编译: [${type}]\n${String(target)}`);
    }
}
ContentCompiler.addCompiler(new ArrayCompiler());
ContentCompiler.addCompiler(new AsyncCompiler());
ContentCompiler.addCompiler(new StepCompiler());
ContentCompiler.addCompiler(new YieldCompiler());
