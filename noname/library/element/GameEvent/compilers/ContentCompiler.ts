import { lib } from "../../../../../noname.js";
import { Uninstantable } from "../../../../util/index.js";
import IContentCompiler, { EventCompileable, EventCompiledContent, EventContent, EventContentType } from "./IContentCompiler.ts";

import StepCompiler from "./StepCompiler.ts"
import YieldCompiler from "./YieldCompiler.ts"
import AsyncCompiler from "./AsyncCompiler.ts"
import ArrayCompiler from "./ArrayCompiler.ts"

type Class<T> = new (...args: any) => T;

export default class ContentCompiler extends Uninstantable {
    static #compilerTypes = new Set<Class<IContentCompiler>>();
    static #compilers = new Set<IContentCompiler>();

    static #compiledContent = new WeakMap<EventContent, EventCompiledContent>();

    /**
     * ```plain
     * 注册一个编译器实例
     * 
     * 如果后面开始全面迁移到 TypeScript，那么请使用依赖注入代替这个方法喵
     * ```
     * 
     * @todo 应该使用依赖注入替代
     * @param compiler 编译器实例对象
     */
    static addCompiler(compiler: IContentCompiler) {
        const type = compiler.constructor as Class<IContentCompiler>;

        if (typeof type !== "function")
            throw new TypeError("content编译器没有明确的类型");

        if (ContentCompiler.#compilerTypes.has(type))
            throw new TypeError("相同的content编译器类型不能重复注册");

        ContentCompiler.#compilerTypes.add(type);
        ContentCompiler.#compilers.add(compiler);
    }

    /**
     * ```plain
     * 获取事件content的类型
     * 
     * 为事件content类型分流提供方法
     * ```
     * 
     * @param content 事件content
     */
    static getType(content: EventContent): EventContentType {
        if (Array.isArray(content))
            return "array";

        // 考虑到多个运行域问题，我们使用名称来简单判断喵
        // 多个运行域的原型互相隔离，instanceof会失效喵
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

    /**
     * ```plain
     * 对无法直接编译的数据做处理
     * ```
     * 
     * @param content 
     * @returns 
     */
    private static regularize(content: EventCompileable): EventContent {
        let result: EventContent;

        // 无法直接编译的数据做处理
        if (typeof content === 'string') {
            result = lib.element.content[content]
                ?? lib.element.contents[content];
        } else if (Symbol.iterator in content) {
            result = Array.from(content);
        } else
            result = content;

        return result;
    }

    /**
     * ```plain
     * 集成的编译函数
     * 通过责任链模式将content分发给所有注册的编译器喵
     * ```
     * 
     * @param content 
     */
    static compile(content: EventCompileable): EventCompiledContent {
        const target = ContentCompiler.regularize(content);

        if (!target) // 对于一些萌新奇奇怪怪的问题，我们做一次检查喵
            throw new Error(`尝试编译一个空的事件content`);

        // 尝试读取缓存
        const cached = ContentCompiler.#compiledContent.get(target);

        if (cached)
            return cached;

        const type = ContentCompiler.getType(target);

        for (const compiler of ContentCompiler.#compilers) {
            const compilerType = compiler.type;

            // 判断类型是否支持
            if (type !== compilerType
                && (!Array.isArray(compilerType)
                    || !compilerType.includes(type)))
                continue;

            // 如果编译器接受了这个事件content
            // 那么我们立即执行编译并返回结果喵
            if (compiler.filter(target)) {
                const compiled = compiler.compile(target);
                // 对编译结果进行缓存
                ContentCompiler.#compiledContent.set(target, compiled);
                return compiled;
            }
        }

        // 无家可归的可怜孩子喵
        throw new Error(`没有编译器接受编译: [${type}]\n${String(target)}`);
    }
}


ContentCompiler.addCompiler(new ArrayCompiler());
ContentCompiler.addCompiler(new AsyncCompiler());
ContentCompiler.addCompiler(new StepCompiler());
ContentCompiler.addCompiler(new YieldCompiler());