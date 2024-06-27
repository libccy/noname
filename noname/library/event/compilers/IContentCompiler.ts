import { lib } from "../../../../noname";

export type EventContentType = "step" | "yield" | "async" | "array";
export type EventContentTypes = EventContentType | EventContentType[] | null;
export type EventContent = Function | Function[];
export type EventCompileable = EventContent | Iterable<Function> | keyof typeof lib.element.content;

// 指示标准的事件content应该是只接受event一个参数的异步函数，同时有一个属性指示编译前的content类型
export type EventCompiledContent = ((e: GameEvent) => Promise<void>) & { type: EventContentType };

export default interface IContentCompiler {
    /**
     * ```plain
     * 获取被当前编译器支持的事件content类型
     * 
     * 最基础的类型分流
     * ```
     */
    get type(): EventContentTypes;

    /**
     * ```plain
     * 判断事件content是否被当前编译器支持
     * 
     * 因为进入compile后必须返回编译结果
     * 所以可能需要一个过滤器
     * ```
     * 
     * @param content 事件content
     */
    filter(content: EventContent): boolean;

    /**
     * 对content执行编译
     * 并返回标准的事件content
     * 
     * @param content 要编译的content
     */
    compile(content: EventCompileable): EventCompiledContent;
}