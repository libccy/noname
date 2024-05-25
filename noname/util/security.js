import { Sandbox, Domain, Marshal, Monitor, AccessAction, Rule, SANDBOX_ENABLED } from "./sandbox.js";

// 是否强制所有模式下使用沙盒
const SANDBOX_FORCED = true;

let initialized = false;

/** @type {Array<Sandbox>} */
const sandboxStack = [];

/** @type {WeakMap<Sandbox, Array<typeof Function>>} */
const isolatedsMap = new WeakMap();

const topVariables = {
    lib: null,
    game: null,
    ui: null,
    get: null,
    ai: null,
    _status: null,
    gnc: null,
};
const defaultEval = window.eval;

let sandBoxRequired = SANDBOX_FORCED;

// 可能的垫片函数
const pfPrototypes = ["Object", "Array", "String", "Map"]; // 传递的实例垫片
const pfNamespaces = ["Object", "Array", "Reflect", "Math", "Promise"]; // 传递的静态垫片
// 可能还要补充喵？
const nativePattern = /^function \w*\(\) \{ \[native code\] \}$/;

// 垫片备份
const polyfills = {
    prototypes: {},
    namespaces: {},
};

/**
 * ```plain
 * 将一个沙盒作为当前联网传输的运行沙盒
 * ```
 * 
 * @param {Sandbox} box 
 */
function enterSandbox(box) {
    if (!SANDBOX_ENABLED)
        return;

    if (!Domain.isBelievable(Domain.topDomain))
        throw "无法在沙盒里面访问";

    sandboxStack.push(box);
}

/**
 * ```plain
 * 退出当前联网传输的运行沙盒
 * ```
 */
function exitSandbox() {
    if (!SANDBOX_ENABLED)
        return;

    if (!Domain.isBelievable(Domain.topDomain))
        throw "无法在沙盒里面访问";
    if (!sandboxStack.length)
        return;

    sandboxStack.pop();
}

/**
 * ```plain
 * 判断对象是否是安全对象
 * ```
 * 
 * @param {Object?} obj 要检查的对象
 * @param {string?} prop 指定要检查的属性描述符
 */
function isUnsafeObject(obj, prop = null) {
    if (!SANDBOX_ENABLED)
        return true;

    if (prop != null) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);

        if (descriptor) {
            if (descriptor.get
                && isUnsafeObject(descriptor.get))
                return true;
            if (descriptor.set
                && isUnsafeObject(descriptor.set))
                return true;
            if (isUnsafeObject(descriptor.value))
                return true;
        }
    }

    if (isPrimitive(obj))
        return false;

    return !Domain.topDomain.isFrom(obj);
}

/**
 * ```plain
 * 确保对象是安全对象
 * ```
 * 
 * @param {Object?} obj 要检查的对象
 * @param {string?} prop 指定要检查的属性描述符
 */
function assertSafeObject(obj, prop = null) {
    if (isUnsafeObject(obj, prop))
        throw "unsafe object denied";
}

/**
 * @param {Object?} obj 
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}

/**
 * ```plain
 * 获取当前指定的联网传输运行沙盒
 * ```
 * 
 * @returns {Sandbox?} 
 */
function currentSandbox() {
    if (!SANDBOX_ENABLED)
        return null;

    return sandboxStack[sandboxStack.length - 1] || defaultSandbox;
}

/**
 * ```plain
 * 进入沙盒运行模式
 * ```
 */
function requireSandbox() {
    sandBoxRequired = true;
}

/**
 * ```plain
 * 判断是否是沙盒运行模式
 * ```
 * 
 * @returns {boolean} 
 */
function isSandboxRequired() {
    return SANDBOX_ENABLED && sandBoxRequired;
}

/**
 * ```plain
 * 简单的、不带上下文的模拟eval函数
 * 
 * 自动根据沙盒的启用状态使用不同的实现
 * ```
 * 
 * @param {any} x 
 * @returns {any} 
 */
function _eval(x) {
    if (!SANDBOX_ENABLED || !sandBoxRequired)
        return new Function(x)();

    // @ts-ignore
    return defaultSandbox.exec(x);
}

/**
 * ```plain
 * 携带简单上下文的eval函数
 * 
 * 自动根据沙盒的启用状态使用不同的实现
 * ```
 * 
 * @param {any} x 
 * @param {Object} scope 
 * @returns {any} 
 */
function _exec(x, scope = {}) {
    if (isPrimitive(scope))
        scope = {};

    if (!SANDBOX_ENABLED || !sandBoxRequired) {
        new Function(x);
        const name = "_" + Math.random().toString(36).slice(2);
        return new Function(name, `with(${name}){return(()=>{"use strict";${x}})()}`)(scope);
    }

    // @ts-ignore
    return defaultSandbox.exec(x, scope);
}

/**
 * ```plain
 * 携带简单上下文的eval函数，并返回scope
 * eval代码的返回值将覆盖 `scope.return` 这个属性
 * 另外任意因对未定义变量赋值导致全局变量赋值的行为将被转移到scope里面
 * 
 * 自动根据沙盒的启用状态使用不同的实现
 * ```
 * 
 * @param {any} x 
 * @param {Object|"window"} scope 传入一个对象作为上下文，或者传入 "window" 来生成一个包含指向自身的 `window` 属性的对象
 * @returns {Object} 
 */
function _exec2(x, scope = {}) {
    if (scope == "window") {
        scope = {};
        scope.window = scope;
    } else if (isPrimitive(scope))
        scope = {};

    if (!SANDBOX_ENABLED || !sandBoxRequired) {
        new Function(x);

        const intercepter = new Proxy(scope, {
            get(target, prop, receiver) {
                if (prop === Symbol.unscopables)
                    return undefined;

                if (!Reflect.has(target, prop)
                    && !Reflect.has(window, prop))
                    throw new ReferenceError(`"${String(prop)}" is not defined`);

                return Reflect.get(target, prop, receiver) || window[prop];
            },
            has(target, prop) {
                return true;
            },
        });

        const result = new Function("_", `with(_){return(()=>{"use strict";\n${x}})()}`)(intercepter);
        scope.return = result;
        return scope;
    }

    // @ts-ignore
    const [result] = defaultSandbox.exec2(x, scope);
    scope.return = result;
    return scope;
}

function initSecurity({
    lib,
    game,
    ui,
    get,
    ai,
    _status,
    gnc,
}) {
    if (initialized)
        throw "security 已经被初始化过了";
    if (!SANDBOX_ENABLED)
        return;

    topVariables.lib = lib;
    topVariables.game = game;
    topVariables.ui = ui;
    topVariables.get = get;
    topVariables.ai = ai;
    topVariables._status = _status;
    topVariables.gnc = gnc;

    loadPolyfills();

    // @ts-ignore
    Object.assign(defaultSandbox.scope, topVariables);
    // @ts-ignore
    setupPolyfills(defaultSandbox);

    // 不允许被远程代码访问的game函数
    const ioFuncs = [
        "download",
        "readFile",
        "readFileAsText",
        "writeFile",
        "removeFile",
        "getFileList",
        "ensureDirectory",
        "createDir",
        "removeDir",
        "checkForUpdate",
        "checkForAssetUpdate",
        "importExtension",
        "export",
        "multiDownload2",
        "multiDownload",
        "fetch",
    ];

    const accessDenieds = [
        ...ioFuncs.map(n => game[n]).filter(Boolean),
        ...Object.values(game.promises),
        defaultEval,
        window.require,
        window,
    ];

    const callRule = new Rule();
    callRule.canMarshal = false; // 禁止获取函数
    callRule.setGranted(AccessAction.CALL, false); // 禁止函数调用
    callRule.setGranted(AccessAction.NEW, false); // 禁止函数new调用

    accessDenieds.filter(Boolean).forEach(o => {
        Marshal.setRule(o, callRule);
    });

    const bannedRule = new Rule();
    bannedRule.canMarshal = false; // 禁止获取
    bannedRule.setGranted(AccessAction.READ, false); // 禁止读取属性
    bannedRule.setGranted(AccessAction.WRITE, false); // 禁止读取属性

    // 禁止访问关键对象
    [
        lib.cheat,
        lib.node,
        lib.message,
    ]
        .filter(Boolean)
        .forEach(o => Marshal.setRule(o, bannedRule));

    const writeRule = new Rule();
    writeRule.setGranted(AccessAction.WRITE, false); // 禁止写入属性
    writeRule.setGranted(AccessAction.DEFINE, false); // 禁止重定义属性
    Marshal.setRule(game.promises, writeRule);

    new Monitor()
        .action(AccessAction.WRITE)
        .action(AccessAction.DEFINE)
        .require("target", game)
        .require("property", ...ioFuncs)
        .then(() => {
            throw "禁止修改关键函数";
        })
        .start(); // 差点忘记启动了喵

    // 监听原型、toStringTag的更改
    const toStringTag = Symbol.toStringTag;
    new Monitor()
        .action(AccessAction.WRITE)
        .action(AccessAction.DEFINE)
        .action(AccessAction.META)
        .require("property", toStringTag)
        .then((access, nameds, control) => {
            // 阻止原型、toStringTag的更改
            control.preventDefault();
            control.stopPropagation();
            control.setReturnValue(false);
        })
        .start();

    initialized = true;
}

/**
 * ```plain
 * 创建一个新的沙盒
 * ```
 * 
 * @returns {Sandbox?} 
 */
function createSandbox() {
    if (!SANDBOX_ENABLED)
        return null;

    const box = new Sandbox();
    box.freeAccess = true;
    box.initBuiltins();

    // 向沙盒提供顶级运行域的文档对象
    // TODO: 仅提供必要的document函数(?)
    box.document = document;

    // 传递七个变量
    Object.assign(box.scope, topVariables);
    // 复制垫片函数
    setupPolyfills(box);

    box.pushScope();
    return box;
}

/**
 * ```plain
 * 导出当前沙盒的Function类型
 * ```
 * 
 * @param {Sandbox} sandbox 
 * @returns {Array<typeof Function>} 
 */
function getIsolateds(sandbox) {
    let isolateds = isolatedsMap.get(sandbox);

    if (isolateds)
        return isolateds.slice();

    isolateds = Array.from(sandbox.exec(`
        return [
            (function(){}).constructor,
            (function*(){}).constructor,
            (async function(){}).constructor,
            (async function*(){}).constructor,
        ];
    `));

    isolatedsMap.set(sandbox, isolateds);
    return isolateds.slice();
}

/**
 * ```plain
 * 加载当前的垫片函数
 * ```
 */
function loadPolyfills() {
    function copyDescriptors(top, box) {
        for (const key of Reflect.ownKeys(top)) {
            const descriptor = Reflect.getOwnPropertyDescriptor(top, key);

            if (!descriptor
                || typeof descriptor.value !== "function")
                continue;

            const body = descriptor.value.toString();

            if (nativePattern.test(body))
                continue;

            box[key] = descriptor;
        }
    }

    for (const key of pfPrototypes) {
        const top = window[key];

        if (!top || !top.prototype)
            continue;

        copyDescriptors(top.prototype, polyfills.prototypes[key] = {});
    }

    for (const key of pfNamespaces) {
        const top = window[key];

        if (!top)
            continue;

        copyDescriptors(top, polyfills.namespaces[key] = {});
    }
}

/**
 * ```plain
 * 初始化沙盒的垫片
 * ```
 * 
 * @param {Sandbox} sandbox 
 */
function setupPolyfills(sandbox) {
    const context = {
        pfPrototypes,
        pfNamespaces,
        prototypes: polyfills.prototypes,
        namespaces: polyfills.namespaces,
    };

    sandbox.exec(`
    function definePolyfills(top, box) {
        for (const key in top)
            Reflect.defineProperty(box, key, top[key]);
    }

    for (const key of pfPrototypes) {
        if (key in prototypes)
            definePolyfills(
                prototypes[key],
                window[key].prototype
            );
    }

    for (const key of pfNamespaces) {
        if (key in namespaces)
            definePolyfills(
                namespaces[key],
                window[key]
            );
    }
    `, context);
}

/** @type {typeof Function} */
// @ts-ignore
const defaultFunction = function () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultGeneratorFunction = function* () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultAsyncFunction = async function () { }.constructor;
/** @type {typeof Function} */
// @ts-ignore
const defaultAsyncGeneratorFunction = async function* () { }.constructor;

const defaultSandbox = createSandbox(); // 所有 eval、parsex 代码全部丢进去喵

if (SANDBOX_ENABLED) {
    // @ts-ignore
    // 对于 defaultSandbox 我们要补充一些东西喵
    defaultSandbox.scope.localStorage = localStorage;

    // 对Function类型进行包裹
    /** @type {Array<typeof Function>} */
    const [
        IsolatedFunction,
        IsolatedGeneratorFunction,
        IsolatedAsyncFunction,
        IsolatedAsyncGeneratorFunction,
    ]
        // @ts-ignore
        = getIsolateds(defaultSandbox);

    /** @type {typeof Function} */
    let ModFunction;
    /** @type {typeof Function} */
    let ModGeneratorFunction;
    /** @type {typeof Function} */
    let ModAsyncFunction;
    /** @type {typeof Function} */
    let ModAsyncGeneratorFunction;

    ModFunction = new Proxy(defaultFunction, {
        apply(target, thisArg, argumentsList) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedFunction(...argumentsList);
        },
        construct(target, argumentsList, newTarget) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedFunction(...argumentsList);
        },
    });

    /** @type {typeof Function} */
    ModGeneratorFunction = new Proxy(defaultGeneratorFunction, {
        apply(target, thisArg, argumentsList) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedGeneratorFunction(...argumentsList);
        },
        construct(target, argumentsList, newTarget) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedGeneratorFunction(...argumentsList);
        },
    });

    /** @type {typeof Function} */
    ModAsyncFunction = new Proxy(defaultAsyncFunction, {
        apply(target, thisArg, argumentsList) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedAsyncFunction(...argumentsList);
        },
        construct(target, argumentsList, newTarget) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedAsyncFunction(...argumentsList);
        },
    });

    /** @type {typeof Function} */
    ModAsyncGeneratorFunction = new Proxy(defaultAsyncGeneratorFunction, {
        apply(target, thisArg, argumentsList) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedAsyncGeneratorFunction(...argumentsList);
        },
        construct(target, argumentsList, newTarget) {
            if (!sandBoxRequired)
                return new target(...argumentsList);

            return new IsolatedAsyncGeneratorFunction(...argumentsList);
        },
    });

    function rewriteCtor(prototype, newCtor) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, 'constructor')
            || { configurable: true, writable: true, enumerable: false };
        if (!descriptor.configurable) throw new TypeError("无法覆盖不可配置的构造函数");
        descriptor.value = newCtor;
        Reflect.defineProperty(prototype, 'constructor', descriptor);
    }

    // 覆盖所有的Function类型构造函数
    window.Function = ModFunction;
    rewriteCtor(defaultFunction.prototype, ModFunction);
    rewriteCtor(defaultGeneratorFunction.prototype, ModGeneratorFunction);
    rewriteCtor(defaultAsyncFunction.prototype, ModAsyncFunction);
    rewriteCtor(defaultAsyncGeneratorFunction.prototype, ModAsyncGeneratorFunction);
}

// 测试暴露喵
// window.sandbox = defaultSandbox;

const exports = {
    enterSandbox,
    exitSandbox,
    currentSandbox,
    createSandbox,
    isUnsafeObject,
    assertSafeObject,
    getIsolateds,
    requireSandbox,
    isSandboxRequired,
    initSecurity,
    eval: _eval,
    exec: _exec,
    exec2: _exec2,
    SANDBOX_ENABLED,
};

Object.freeze(exports);
export default exports;