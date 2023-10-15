"use strict";
module("lib", [], (lib, game, ui, get, ai, _status) => {
    const _lib = {
        listenEnd: function (node) {
            if (!node._listeningEnd) {
                node._listeningEnd = true;
                node.listenTransition(function () {
                    delete node._listeningEnd;
                    if (node._onEndMoveDelete) {
                        node.moveDelete(node._onEndMoveDelete);
                    }
                    else if (node._onEndDelete) {
                        node.delete();
                    }
                    node._transitionEnded = true;
                });
            }
        },
        getErrorTip: msg => {
            if (typeof msg != 'string') {
                try {
                    msg = msg.toString();
                    if (typeof msg != 'string') throw 'err';
                } catch (_) {
                    throw '传参错误:' + msg;
                }
            }
            if (msg.startsWith('Uncaught ')) msg = msg.slice(9);
            let newMessage = msg;
            if (/RangeError/.test(newMessage)) {
                if (newMessage.includes("Maximum call stack size exceeded")) {
                    newMessage = "堆栈溢出";
                } else if (/argument must be between 0 and 20/.test(newMessage)) {
                    let funName = newMessage.slice(newMessage.indexOf('RangeError: ') + 12, newMessage.indexOf(')') + 1);
                    newMessage = funName + "参数必须在0和20之间";
                } else {
                    newMessage = "传递错误值到数值计算方法";
                }
            } else if (/ReferenceError/.test(newMessage)) {
                let messageName;
                if (newMessage.includes("is not defined")) {
                    messageName = newMessage.replace('ReferenceError: ', '').replace(' is not defined', '');
                    newMessage = "引用了一个未定义的变量：" + messageName;
                } else if (newMessage.includes("invalid assignment left-hand side")) {
                    newMessage = "赋值运算符或比较运算符不匹配";
                } else if (newMessage.includes("Octal literals are not allowed in strict mode")) {
                    newMessage = "八进制字面量与八进制转义序列语法已经被废弃";
                } else if (newMessage.includes("Illegal 'use strict' directive in function with non-simple parameter list")) {
                    newMessage = "'use strict'指令不能使用在带有‘非简单参数’列表的函数";
                } else if (newMessage.includes("Invalid left-hand side in assignment")) {
                    newMessage = "赋值中的左侧无效，即number，string等不可赋值的非变量数据";
                }
            } else if (/SyntaxError/.test(newMessage)) {
                let messageName;
                if (newMessage.includes("Unexpected token ")) {
                    messageName = newMessage.replace('SyntaxError: Unexpected token ', '');
                    newMessage = "使用了未定义或错误的语法 : (" + messageName + ")";
                } else if (newMessage.includes(
                    "Block-scoped declarations (let, const, function, class) not yet supported outside strict mode")) {
                    newMessage = "请在严格模式下运行let，const，class";
                } else if (newMessage.includes("for-of loop variable declaration may not have an initializer.")) {
                    newMessage = "for...of 循环的头部包含有初始化表达式";
                } else if (newMessage.includes("for-in loop variable declaration may not have an initializer.")) {
                    newMessage = "for...in 循环的头部包含有初始化表达式";
                } else if (newMessage.includes("Delete of an unqualified identifier in strict mode.")) {
                    newMessage = "普通变量不能通过 delete 操作符来删除";
                } else if (newMessage.includes("Unexpected identifier")) {
                    newMessage = "不合法的标识符或错误的语法";
                } else if (newMessage.includes("Invalid or unexpected token")) {
                    newMessage = "非法的或者不期望出现的标记符号出现在不该出现的位置";
                } else if (newMessage.includes("Invalid regular expression flags")) {
                    newMessage = "无效的正则表达式的标记";
                } else if (newMessage.includes("missing ) after argument list")) {
                    newMessage = "参数列表后面缺少 \')\' (丢失运算符或者转义字符等)";
                } else if (newMessage.includes("Invalid shorthand property initializer")) {
                    newMessage = "在定义一个{}对象时，应该使用\':\'而不是\'=\'";
                } else if (newMessage.includes("Missing initializer in const declaration")) {
                    newMessage = "在使用const定义一个对象时，必须指定初始值";
                } else if (newMessage.includes("Unexpected number") || newMessage.includes("Unexpected string")) {
                    newMessage = "在定义函数时，函数参数必须为合法标记符";
                } else if (newMessage.includes("Unexpected end of input")) {
                    newMessage = "遗漏了符号或符号顺序不对(小括号，花括号等)";
                } else if (newMessage.includes("has already been declared")) {
                    messageName = newMessage.replace('SyntaxError: Identifier ', '').replace(' has already been declared', '');
                    newMessage = messageName + "变量已经被声明过，不能被重新声明";
                } else if (newMessage.includes("Invalid or unexpected token")) {
                    newMessage = "查询无效或意外的标记，可能是字符串的引号不成对，错误使用了转义序列，字符串在多行中解析异常";
                } else if (newMessage.includes("Duplicate parameter name not allowed in this context")) {
                    newMessage = "参数名不允许重复";
                } else if (newMessage.includes("Unexpected reserved word") || newMessage.includes(
                    "Unexpected strict mode reserved word")) {
                    newMessage = "保留字被用作标记符";
                }
            } else if (/TypeError/.test(newMessage)) {
                let messageName;
                if (newMessage.includes(" is not a function")) {
                    messageName = newMessage.replace('TypeError: ', '').replace(' is not a function', '');
                    newMessage = messageName + "不是一个函数";
                } else if (newMessage.includes(" is not a constructor")) {
                    messageName = newMessage.replace('TypeError: ', '').replace(' is not a constructor', '');
                    newMessage = messageName + "不是一个构造函数";
                } else if (newMessage.includes("Cannot read property")) {
                    messageName = newMessage.replace('TypeError: Cannot read property ', '').replace(' of null', '').replace(' of undefined', '');
                    let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4);
                    newMessage = "无法读取\'" + ofName + "\'的属性值" + messageName;
                } else if (newMessage.includes("Cannot read properties")) {
                    messageName = newMessage.slice(newMessage.indexOf("reading '") + 9, -2);
                    let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4, newMessage.indexOf("(") - 1);
                    newMessage = "无法读取\'" + ofName + "\'的属性值" + messageName;
                } else if (newMessage.includes("Property description must be an object")) {
                    messageName = newMessage.replace('TypeError: Property description must be an object: ', '');
                    newMessage = messageName + "是非对象类型的值";
                } else if (newMessage.includes("Cannot assign to read only property ")) {
                    messageName = newMessage.slice(47, newMessage.lastIndexOf(' of ') + 1);
                    newMessage = messageName + "属性禁止写入";
                } else if (newMessage.includes("Object prototype may only be an Object or null")) {
                    newMessage = messageName + "对象原型只能是对象或null";
                } else if (newMessage.includes("Cannot create property")) {
                    messageName = newMessage.slice(newMessage.indexOf('\'') + 1);
                    messageName = messageName.slice(0, messageName.indexOf('\''));
                    let obj = newMessage.slice(newMessage.indexOf(messageName) + 16);
                    newMessage = obj + "不能添加或修改\'" + messageName + "\'属性，任何 Primitive 值都不允许有property";
                } else if (newMessage.includes("Can't add property") && newMessage.includes("is not extensible")) {
                    newMessage = "对象不可添加属性（不可扩展）";
                } else if (newMessage.includes("Cannot redefine property")) {
                    messageName = newMessage.slice(37);
                    newMessage = messageName + "不可配置";
                } else if (newMessage.includes("Converting circular structure to JSON")) {
                    messageName = newMessage.slice(37);
                    newMessage = "JSON.stringify() 方法处理循环引用结构的JSON会失败";
                } else if (newMessage.includes("Cannot use 'in' operator to search for ")) {
                    newMessage = "in不能用来在字符串、数字或者其他基本类型的数据中进行检索";
                } else if (newMessage.includes("Right-hand side of 'instanceof' is not an object")) {
                    newMessage = "instanceof 操作符 希望右边的操作数为一个构造对象，即一个有 prototype 属性且可以调用的对象";
                } else if (newMessage.includes("Assignment to constant variable")) {
                    newMessage = "const定义的变量不可修改";
                } else if (newMessage.includes("Cannot delete property")) {
                    newMessage = "不可配置的属性不能删除";
                } else if (newMessage.includes("which has only a getter")) {
                    newMessage = "仅设置了getter特性的属性不可被赋值";
                } else if (newMessage.includes("called on incompatible receiver undefined")) {
                    newMessage = "this提供的绑定对象与预期的不匹配";
                }
            } else if (/URIError/.test(newMessage)) {
                newMessage = "一个不合法的URI";
            } else if (/EvalError/.test(newMessage)) {
                newMessage = "非法调用 eval()";
            } else if (/InternalError/.test(newMessage)) {
                if (newMessage.includes("too many switch cases")) {
                    newMessage = "过多case子句";
                } else if (newMessage.includes("too many parentheses in regular expression")) {
                    newMessage = "正则表达式中括号过多";
                } else if (newMessage.includes("array initializer too large")) {
                    newMessage = "超出数组大小的限制";
                } else if (newMessage.includes("too much recursion")) {
                    newMessage = "递归过深";
                }
            }
            if (newMessage != msg) {
                return newMessage;
            }
        },
        codeMirrorReady: (node, editor) => {
            ui.window.appendChild(node);
            node.style.fontSize = 20 / game.documentZoom + 'px';
            const mirror = window.CodeMirror(editor, {
                value: node.code,
                mode: "javascript",
                lineWrapping: !lib.config.touchscreen && lib.config.mousewheel,
                lineNumbers: true,
                indentUnit: 4,
                autoCloseBrackets: true,
                fixedGutter: false,
                hintOptions: { completeSingle: false },
                theme: lib.config.codeMirror_theme || 'mdn-like',
                extraKeys: {
                    "Ctrl-Z": "undo",//撤销
                    "Ctrl-Y": "redo",//恢复撤销
                    //"Ctrl-A":"selectAll",//全选
                },
            });
            lib.setScroll(editor.querySelector('.CodeMirror-scroll'));
            node.aced = true;
            node.editor = mirror;
            setTimeout(() => mirror.refresh(), 0);
            node.editor.on('change', (e, change) => {
                let code;
                if (node.editor) {
                    code = node.editor.getValue();
                } else if (node.textarea) {
                    code = node.textarea.value;
                };
                //动态绑定文本
                if (code.length && change.origin == "+input" &&
                    /{|}|\s|=|;|:|,|，|。|？|！|\!|\?|&|#|%|@|‘|’|；/.test(change.text[0]) == false &&
                    change.text.length == 1) {
                    //输入了代码，并且不包括空格，{}，=， ; ， : ， 逗号等，才可以自动提示
                    node.editor.showHint();
                }
            });
            //防止每次输出字符都创建以下元素
            const event = _status.event;
            const trigger = _status.event;
            const player = ui.create.player().init('sunce');
            const target = player;
            const targets = [player];
            const source = player;
            const card = game.createCard();
            const cards = [card];
            const result = { bool: true };
            function forEach(arr, f) {
                Array.from(arr).forEach(v => f(v));
            }
            function forAllProps(obj, callback) {
                if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
                    for (let name in obj) callback(name);
                } else {
                    for (let o = obj; o; o = Object.getPrototypeOf(o)) Object.getOwnPropertyNames(o).forEach(callback);
                }
            }
            function scriptHint(editor, keywords, getToken, options) {
                //Find the token at the cursor
                let cur = editor.getCursor(), token = editor.getTokenAt(cur);
                if (/\b(?:string|comment)\b/.test(token.type)) return;
                const innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
                if (innerMode.mode.helperType === "json") return;
                token.state = innerMode.state;
                //If it's not a 'word-style' token, ignore the token.
                if (!/^[\w$_]*$/.test(token.string)) {
                    token = {
                        start: cur.ch,
                        end: cur.ch,
                        string: "",
                        state: token.state,
                        type: token.string == "." ? "property" : null
                    };
                } else if (token.end > cur.ch) {
                    token.end = cur.ch;
                    token.string = token.string.slice(0, cur.ch - token.start);
                }
                let tprop = token, context;
                //If it is a property, find out what it is a property of.
                while (tprop.type == "property") {
                    tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
                    if (tprop.string != ".") return;
                    tprop = editor.getTokenAt(CodeMirror.Pos(cur.line, tprop.start));
                    if (!context) context = [];
                    context.push(tprop);
                }
                const list = [];
                let obj;
                if (Array.isArray(context)) {
                    try {
                        const code = context.length == 1 ? context[0].string : context.reduceRight((pre, cur) => (pre.string || pre) + '.' + cur.string);
                        obj = eval(code);
                        if (![null, undefined].includes(obj)) {
                            const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj))).filter(key => key.startsWith(token.string));
                            list.addArray(keys);
                        }
                    } catch (_) { return; }
                } else if (token && typeof token.string == 'string') {
                    //非开发者模式下，提示这些单词
                    list.addArray(['player', 'card', 'cards', 'result', 'trigger', 'source', 'target', 'targets', 'lib', 'game', 'ui', 'get', 'ai', '_status']);
                }
                return {
                    list: [...new Set(getCompletions(token, context, keywords, options).concat(list))]
                        .filter(key => key.startsWith(token.string))
                        .sort((a, b) => (a + '').localeCompare(b + ''))
                        .map(text => {
                            return {
                                render(elt, data, cur) {
                                    var icon = document.createElement("span");
                                    var className = "cm-completionIcon cm-completionIcon-";
                                    if (obj) {
                                        const type = typeof obj[text];
                                        if (type == 'function') {
                                            className += 'function';
                                        }
                                        else if (type == 'string') {
                                            className += 'text';
                                        }
                                        else if (type == 'boolean') {
                                            className += 'variable';
                                        }
                                        else {
                                            className += 'namespace';
                                        }
                                    } else {
                                        if (javascriptKeywords.includes(text)) {
                                            className += 'keyword';
                                        }
                                        else if (window[text]) {
                                            const type = typeof window[text];
                                            if (type == 'function') {
                                                className += 'function';
                                            }
                                            else if (type == 'string') {
                                                className += 'text';
                                            }
                                            else if (text == 'window' || type == 'boolean') {
                                                className += 'variable';
                                            }
                                            else {
                                                className += 'namespace';
                                            }
                                        } else {
                                            className += 'namespace';
                                        }
                                    }
                                    icon.className = className;
                                    elt.appendChild(icon);
                                    elt.appendChild(document.createTextNode(text));
                                },
                                displayText: text,
                                text: text,
                            }
                        }),
                    from: CodeMirror.Pos(cur.line, token.start),
                    to: CodeMirror.Pos(cur.line, token.end)
                };
            }
            function javascriptHint(editor, options) {
                return scriptHint(editor, javascriptKeywords, function (e, cur) { return e.getTokenAt(cur); }, options);
            };
            //覆盖原本的javascript提示
            CodeMirror.registerHelper("hint", "javascript", javascriptHint);
            const stringProps = Object.getOwnPropertyNames(String.prototype);
            const arrayProps = Object.getOwnPropertyNames(Array.prototype);
            const funcProps = Object.getOwnPropertyNames(Array.prototype);
            const javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends from false finally for function " +
                "if in import instanceof let new null return super switch this throw true try typeof var void while with yield").split(" ");
            function getCompletions(token, context, keywords, options) {
                let found = [], start = token.string, global = options && options.globalScope || window;
                function maybeAdd(str) {
                    if (str.lastIndexOf(start, 0) == 0 && !found.includes(str)) found.push(str);
                }
                function gatherCompletions(obj) {
                    if (typeof obj == "string") forEach(stringProps, maybeAdd);
                    else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
                    else if (obj instanceof Function) forEach(funcProps, maybeAdd);
                    forAllProps(obj, maybeAdd);
                }
                if (context && context.length) {
                    //If this is a property, see if it belongs to some object we can
                    //find in the current environment.
                    let obj = context.pop(), base;
                    if (obj.type && obj.type.indexOf("variable") === 0) {
                        if (options && options.additionalContext)
                            base = options.additionalContext[obj.string];
                        if (!options || options.useGlobalScope !== false)
                            base = base || global[obj.string];
                    } else if (obj.type == "string") {
                        base = "";
                    } else if (obj.type == "atom") {
                        base = 1;
                    } else if (obj.type == "function") {
                        if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') && (typeof global.jQuery == 'function'))
                            base = global.jQuery();
                        else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
                            base = global._();
                    }
                    while (base != null && context.length)
                        base = base[context.pop().string];
                    if (base != null) gatherCompletions(base);
                } else {
                    //If not, just look in the global object, any local scope, and optional additional-context
                    //(reading into JS mode internals to get at the local and global variables)
                    for (let v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
                    for (let c = token.state.context; c; c = c.prev) for (let v = c.vars; v; v = v.next) maybeAdd(v.name)
                    for (let v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
                    if (options && options.additionalContext != null) for (let key in options.additionalContext) maybeAdd(key);
                    if (!options || options.useGlobalScope !== false) gatherCompletions(global);
                    forEach(keywords, maybeAdd);
                }
                return found.sort((a, b) => (a + '').localeCompare(b + ''));
            }
        },
        setIntro: function (node, func, left) {
            if (lib.config.touchscreen) {
                if (left) {
                    node.listen(ui.click.touchintro);
                }
                else {
                    lib.setLongPress(node, ui.click.intro);
                }
            }
            else {
                if (left) {
                    node.listen(ui.click.intro);
                }
                if (lib.config.hover_all && !lib.device) {
                    lib.setHover(node, ui.click.hoverplayer);
                }
                if (lib.config.right_info) {
                    node.oncontextmenu = ui.click.rightplayer;
                }
            }
            // if(!left){
            // 	lib.setPressure(node,ui.click.rightpressure);
            // }
            if (func) {
                node._customintro = func;
            }
        },
        setPopped: function (node, func, width, height, forceclick, paused2) {
            node._poppedfunc = func;
            node._poppedwidth = width;
            node._poppedheight = height;
            if (forceclick) {
                node.forceclick = true;
            }
            if (lib.config.touchscreen || forceclick) {
                node.listen(ui.click.hoverpopped);
            }
            else {
                node.addEventListener('mouseenter', ui.click.hoverpopped);
                // node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
            }
            if (paused2) {
                node._paused2 = true;
            }
        },
        placePoppedDialog: function (dialog, e) {
            if (dialog._place_text) {
                if (dialog._place_text.firstChild.offsetWidth >= 190 || dialog._place_text.firstChild.offsetHeight >= 30) {
                    dialog._place_text.style.marginLeft = '14px';
                    dialog._place_text.style.marginRight = '14px';
                    dialog._place_text.style.textAlign = 'left';
                    dialog._place_text.style.width = 'calc(100% - 28px)';
                }
            }
            if (e.touches && e.touches[0]) {
                e = e.touches[0];
            }
            var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
            if (dialog._mod_height) {
                height += dialog._mod_height;
            }
            dialog.style.height = height + 'px';
            if (e.clientX / game.documentZoom < ui.window.offsetWidth / 2) {
                dialog.style.left = (e.clientX / game.documentZoom + 10) + 'px';
            }
            else {
                dialog.style.left = (e.clientX / game.documentZoom - dialog.offsetWidth - 10) + 'px';
            }
            var idealtop = (e.clientY || 0) / game.documentZoom - dialog.offsetHeight / 2;
            if (typeof idealtop != 'number' || isNaN(idealtop) || idealtop <= 5) {
                idealtop = 5;
            }
            else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
                idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
            }
            dialog.style.top = idealtop + 'px';
        },
        setHover: function (node, func, hoveration, width) {
            node._hoverfunc = func;
            if (typeof hoveration == 'number') {
                node._hoveration = hoveration;
            }
            if (typeof width == 'number') {
                node._hoverwidth = width
            }
            node.addEventListener('mouseenter', ui.click.mouseenter);
            node.addEventListener('mouseleave', ui.click.mouseleave);
            node.addEventListener('mousedown', ui.click.mousedown);
            node.addEventListener('mousemove', ui.click.mousemove);
            return node;
        },
        setScroll: function (node) {
            node.ontouchstart = ui.click.touchStart;
            node.ontouchmove = ui.click.touchScroll;
            node.style.WebkitOverflowScrolling = 'touch';
            return node;
        },
        setMousewheel: function (node) {
            if (lib.config.mousewheel) node.onmousewheel = ui.click.mousewheel;
        },
        setLongPress: function (node, func) {
            node.addEventListener('touchstart', ui.click.longpressdown);
            node.addEventListener('touchend', ui.click.longpresscancel);
            node._longpresscallback = func;
            return node;
        },
        updateCanvas: function (time) {
            if (lib.canvasUpdates.length === 0) {
                lib.status.canvas = false;
                return false;
            }
            ui.canvas.width = ui.arena.offsetWidth;
            ui.canvas.height = ui.arena.offsetHeight;
            var ctx = ui.ctx;
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.strokeStyle = 'white';
            // ctx.lineCap='round';
            ctx.lineWidth = 3;
            ctx.save();
            for (var i = 0; i < lib.canvasUpdates.length; i++) {
                ctx.restore();
                ctx.save();
                var update = lib.canvasUpdates[i];
                if (!update.starttime) {
                    update.starttime = time;
                }
                if (update(time - update.starttime, ctx) === false) {
                    lib.canvasUpdates.splice(i--, 1);
                }
            }
        },
        run: function (time) {
            lib.status.time = time;
            for (var i = 0; i < lib.updates.length; i++) {
                if (!lib.updates[i].hasOwnProperty('_time')) {
                    lib.updates[i]._time = time;
                }
                if (lib.updates[i](time - lib.updates[i]._time - lib.status.delayed) === false) {
                    lib.updates.splice(i--, 1);
                }
            }
            if (lib.updates.length) {
                lib.status.frameId = requestAnimationFrame(lib.run);
            }
            else {
                lib.status.time = 0;
                lib.status.delayed = 0;
            }
        },
        getUTC: function (date) {
            return date.getTime();
        },
        saveVideo: function () {
            if (_status.videoToSave) {
                game.export(lib.init.encode(JSON.stringify(_status.videoToSave)),
                    '无名杀 - 录像 - ' + _status.videoToSave.name[0] + ' - ' + _status.videoToSave.name[1]);
            }
        },
    };

    const announce = {
        init() {
            _status._announce = document.createElement("Announce");
            _status._announce_cache = new Map();
            delete lib.announce.init;
        },
        // 推送一个对象给所有监听了name的订阅者。
        publish(name, values) {
            if (_status._announce) _status._announce.dispatchEvent(new CustomEvent(name, {
                detail: values
            }));
            return values;
        },
        // 订阅name相关的事件。
        subscribe(name, method) {
            if (_status._announce && _status._announce_cache) {
                let subscribeFunction;
                if (_status._announce_cache.has(method)) {
                    let records = _status._announce_cache.get(method);
                    subscribeFunction = records.get("Listener");
                    records.get("EventTargets").add(name);
                }
                else {
                    subscribeFunction = event => method(event.detail);
                    let records = new Map();
                    records.set("Listener", subscribeFunction);
                    records.set("EventTargets", [name]);
                    _status._announce_cache.set(method, records);
                }
                _status._announce.addEventListener(name, subscribeFunction);
            }
            return method;
        },
        // 取消对事件name的订阅
        unsubscribe(name, method) {
            if (_status._announce && _status._announce_cache && _status._announce_cache.has(method)) {
                let records = _status._announce_cache.get(method);
                const listener = records.get("Listener");
                let eventTargets = records.get("EventTargets");
                eventTargets.remove(name);
                if (eventTargets.length <= 0) _status._announce_cache.remove(method);
                _status._announce.removeEventListener(name, listener);
            }
            return method;
        }
    };

    const card = {
        list:[],
        cooperation_damage:{
            fullskin:true,
        },
        cooperation_draw:{
            fullskin:true,
            cardimage:'cooperation_damage',
        },
        cooperation_discard:{
            fullskin:true,
            cardimage:'cooperation_damage',
        },
        cooperation_use:{
            fullskin:true,
            cardimage:'cooperation_damage',
        },
        pss_paper:{
            type:'pss',
            fullskin:true,
        },
        pss_scissor:{
            type:'pss',
            fullskin:true,
        },
        pss_stone:{
            type:'pss',
            fullskin:true,
        },
        feichu_equip1:{
            type:"equip",
            subtype:"equip1",
        },
        feichu_equip2:{
            type:"equip",
            subtype:"equip2",
        },
        feichu_equip3:{
            type:"equip",
            subtype:"equip3",
        },
        feichu_equip4:{
            type:"equip",
            subtype:"equip4",
        },
        feichu_equip5:{
            type:"equip",
            subtype:"equip5",
        },
        zhengsu_leijin:{},
        zhengsu_mingzhi:{},
        zhengsu_bianzhen:{},
        disable_judge:{},
        group_wei:{fullskin:true},
        group_shu:{fullskin:true},
        group_wu:{fullskin:true},
        group_qun:{fullskin:true},
        group_key:{fullskin:true},
        group_jin:{fullskin:true},
        
        db_atk1:{
            type:'db_atk',
            fullimage:true,
        },
        db_atk2:{
            type:'db_atk',
            fullimage:true,
        },
        db_def1:{
            type:'db_def',
            fullimage:true,
        },
        db_def2:{
            type:'db_def',
            fullimage:true,
        },
    };

    const cheat = {
        i: function () {
            window.cheat = lib.cheat;
            window.game = game;
            window.ui = ui;
            window.get = get;
            window.ai = ai;
            window.lib = lib;
            window._status = _status;
        },
        dy: function () {
            var next = game.me.next;
            for (var i = 0; i < 10; i++) {
                if (next.identity != 'zhu') {
                    break;
                }
                next = next.next;
            }
            next.die();
        },
        x: function () {
            var gl = function (dir, callback) {
                var files = [], folders = [];
                dir = '/Users/widget/Documents/extension/' + dir;
                lib.node.fs.readdir(dir, function (err, filelist) {
                    for (var i = 0; i < filelist.length; i++) {
                        if (filelist[i][0] != '.' && filelist[i][0] != '_') {
                            if (lib.node.fs.statSync(dir + '/' + filelist[i]).isDirectory()) {
                                folders.push(filelist[i]);
                            }
                            else {
                                files.push(filelist[i]);
                            }
                        }
                    }
                    callback(folders, files);
                });
            }
            var args = Array.from(arguments);
            for (var i = 0; i < args.length; i++) {
                args[i] = args[i][0];
            }
            gl('', function (list) {
                if (args.length) {
                    for (var i = 0; i < list.length; i++) {
                        if (!args.contains(list[i][0])) {
                            list.splice(i--, 1);
                        }
                    }
                }
                if (list.length) {
                    for (var i = 0; i < list.length; i++) {
                        (function (str) {
                            gl(str, function (folders, files) {
                                if (files.length > 1) {
                                    for (var i = 0; i < files.length; i++) {
                                        if (files[i].includes('extension.js')) {
                                            files.splice(i--, 1);
                                        }
                                        else {
                                            if (i % 5 == 0) {
                                                str += '\n\t\t\t';
                                            }
                                            str += '"' + files[i] + '",';
                                        }
                                    }
                                    console.log(str.slice(0, str.length - 1));
                                }
                            });
                        }(list[i]));
                    }
                }
            });
        },
        cfg: function () {
            var mode = lib.config.all.mode.slice(0);
            mode.remove('connect');
            mode.remove('brawl');
            var banned = ['shen_guanyu', 'shen_caocao', 'caopi', 're_daqiao', 'caorui',
                'daqiao', 'lingcao', 'liuzan', 'lusu', 'luxun', 'yanwen', 'zhouyu', 'ns_wangyue', 'gw_yenaifa',
                'old_caozhen', 'swd_jiangziya', 'xuhuang', 'maliang', 'guojia', 'simayi', 'swd_kangnalishi', 'hs_siwangzhiyi', 'hs_nozdormu', 'old_zhuzhi'];
            var bannedcards = ['zengbin'];
            var favs = ["hs_tuoqi", "hs_siwangxianzhi", "hs_xukongzhiying", "hs_hsjiasha", "gjqt_xieyi", "gjqt_yunwuyue", "gjqt_beiluo",
                "gjqt_cenying", "shen_lvmeng", "shen_zhaoyun", "shen_zhugeliang", "ow_ana", "chenlin", "ns_guanlu", "hs_guldan", "swd_guyue",
                "pal_jiangyunfan", "mtg_jiesi", "swd_lanyin", "pal_liumengli", "swd_muyun", "pal_nangonghuang", "swd_muyue", "pal_murongziying",
                "swd_qiner", "pal_shenqishuang", "hs_taisi", "wangji", "pal_xingxuan", "xunyou", "hs_yelise", "pal_yuejinzhao", "pal_yueqi",
                "gjqt_yuewuyi", "swd_yuxiaoxue", "ow_zhaliya", "zhangchunhua", "hs_zhihuanhua", "swd_zhiyin", "old_zhonghui", "gjqt_bailitusu",
                "hs_barnes", "ow_dva", "swd_hengai", "pal_jushifang", "hs_kazhakusi", "hs_lafamu", "ow_liekong", "hs_lreno", "pal_mingxiu",
                "swd_murongshi", "gw_oudimu", "gjqt_ouyangshaogong", "hs_pyros", "qinmi", "gw_sanhanya", "hs_selajin", "swd_shuwaner",
                "swd_situqiang", "hs_xialikeer", "pal_xuejian", "swd_yuchiyanhong", "swd_yuwentuo", "swd_zhaoyun", "zhugeliang", "gw_aigeleisi",
                "gw_aimin", "gjqt_aruan", "hs_aya", "swd_cheyun", "swd_chenjingchou", "gw_diandian", "swd_huzhongxian", "hs_jinglinglong",
                "hs_kaituozhe", "hs_kalimosi", "gw_linjing", "ow_luxiao", "re_luxun", "hs_morgl", "swd_sikongyu", "hs_sthrall", "sunquan",
                "sunshangxiang", "gw_yioufeisisp", "gw_yisilinni", "hs_yogg", "hs_ysera", "pal_yuntianhe", "zhugejin", "zhugeke", "gw_zhuoertan",
                "hs_anduin", "swd_anka", "ow_banzang", "ow_chanyata", "diaochan", "swd_duguningke", "sp_diaochan", "hetaihou", "ns_huamulan",
                "swd_huanglei", "swd_huanyuanzhi", "re_huatuo", "gw_huoge", "pal_jiangcheng", "yj_jushou", "swd_kendi", "yxs_libai",
                "mtg_lilianna", "xin_liru", "liuxie", "pal_lixiaoyao", "pal_longkui", "ns_nanhua", "swd_qi", "swd_septem", "gw_shasixiwusi",
                "ow_tianshi", "swd_weida", "gjqt_xiayize", "swd_xiyan", "hs_xsylvanas", "hs_yelinlonghou", "ow_yuanshi", "zuoci"];
            var vintage = ['tianjian', 'shuiyun', 'zhuyue', 'zhimeng', 'poyun', 'qianfang', 'xfenxin', 'danqing', 'ywuhun', 'tianwu', 'xuelu',
                'shahun', 'yuling', 'duhun', 'liaoyuan', 'touxi', 'wangchen', 'poyue', 'kunlunjing', 'huanhun', 'yunchou', 'tuzhen', 'cyqiaoxie',
                'mufeng', 'duanyi', 'guozao', 'yaotong', 'pozhen', 'tanlin', 'susheng', 'jikong', 'shouyin', 'jilve', 'hxunzhi', 'huodan', 'shanxian',
                'ziyu', 'kuoyin', 'feiren', 'zihui', 'jidong', 'baoxue', 'aqianghua', 'maoding', 'bfengshi', 'zhongdun', 'pingzhang', 'maichong',
                'guozai', 'jingxiang', 'yuelu', 'liechao', 'fengnu', 'hanshuang', 'enze', 'malymowang', 'xshixin', 'qingzun'];
            var favmodes = ["versus|three", "versus|four", "versus|two", "chess|combat"];
            for (var i = 0; i < mode.length; i++) {
                game.saveConfig(mode[i] + '_banned', banned);
                game.saveConfig(mode[i] + '_bannedcards', bannedcards);
            }
            var characters = lib.config.all.characters.slice(0);
            characters.remove('standard');
            characters.remove('old');
            game.saveConfig('vintageSkills', vintage);
            game.saveConfig('favouriteCharacter', favs);
            game.saveConfig('favouriteMode', favmodes);
            game.saveConfig('theme', 'simple');
            game.saveConfig('player_border', 'slim');
            game.saveConfig('cards', lib.config.all.cards);
            game.saveConfig('characters', characters);
            game.saveConfig('change_skin', false);
            game.saveConfig('show_splash', 'off');
            game.saveConfig('show_favourite', false);
            game.saveConfig('animation', false);
            game.saveConfig('hover_all', false);
            game.saveConfig('asset_version', 'v1.9');
            // game.saveConfig('characters',lib.config.all.characters);
            // game.saveConfig('cards',lib.config.all.cards);
            game.saveConfig('plays', ['cardpile']);
            game.saveConfig('skip_shan', false);
            game.saveConfig('tao_enemy', true);
            game.saveConfig('layout', 'long2');
            game.saveConfig('hp_style', 'ol');
            game.saveConfig('background_music', 'music_off');
            game.saveConfig('background_audio', false);
            game.saveConfig('background_speak', false);
            game.saveConfig('show_volumn', false);
            game.saveConfig('show_replay', true);
            game.saveConfig('autostyle', true);
            game.saveConfig('debug', true);
            game.saveConfig('dev', true);
            if (!lib.device) {
                game.saveConfig('sync_speed', false);
            }
            game.reload();
        },
        o: function () {
            ui.arena.classList.remove('observe');
        },
        pt: function () {
            var list = Array.from(arguments);
            while (list.length) {
                var card = cheat.gn(list.pop());
                if (card) ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
            }
        },
        q: function () {
            // if(lib.config.layout!='mobile') lib.init.layout('mobile');
            if (arguments.length == 0) {
                var style = ui.css.card_style;
                if (lib.config.card_style != 'simple') {
                    lib.config.card_style = 'simple';
                    ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', 'simple');
                }
                else {
                    lib.config.card_style = 'default';
                    ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', 'default');
                }
                style.remove();
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    cheat.g(arguments[i]);
                }
            }
            ui.arena.classList.remove('selecting');
            ui.arena.classList.remove('tempnoe');
        },
        p: function (name, i, skin) {
            var list = ['swd', 'hs', 'pal', 'gjqt', 'ow', 'gw'];
            if (!lib.character[name]) {
                for (var j = 0; j < list.length; j++) {
                    if (lib.character[list[j] + '_' + name]) {
                        name = list[j] + '_' + name; break;
                    }
                }
            }
            if (skin) {
                lib.config.skin[name] = skin
            }
            var target;
            if (typeof i == 'number') {
                target = game.players[i];
            }
            else {
                target = game.me.next;
            }
            if (!lib.character[name]) {
                target.node.avatar.setBackground(name, 'character');
                target.node.avatar.show();
            }
            else {
                target.init(name);
            }
            if (i === true) {
                if (lib.config.layout == 'long2') {
                    lib.init.layout('mobile');
                }
                else {
                    lib.init.layout('long2');
                }
            }
        },
        e: function () {
            var cards = [], target;
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    target = arguments[i];
                }
                else {
                    cards.push(game.createCard(arguments[i]));
                }
            }
            if (!cards.length) {
                cards.push(game.createCard('qilin'));
                cards.push(game.createCard('bagua'));
                cards.push(game.createCard('dilu'));
                cards.push(game.createCard('chitu'));
                cards.push(game.createCard('muniu'));
            }
            target = target || game.me;
            for (var i = 0; i < cards.length; i++) {
                var card = target.getEquip(cards[i]);
                if (card) {
                    card.discard();
                    target.removeEquipTrigger(card);
                }
                target.$equip(cards[i]);
            }
        },
        c: function () {
            (function () {
                var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0;
                var sa = 0, sb = 0, sc = 0, sd = 0, se = 0, sf = 0, sg = 0;
                for (var i in lib.character) {
                    switch (lib.character[i][1]) {
                        case 'wei': a++; if (lib.config.banned.contains(i)) sa++; break;
                        case 'shu': b++; if (lib.config.banned.contains(i)) sb++; break;
                        case 'wu': c++; if (lib.config.banned.contains(i)) sc++; break;
                        case 'qun': d++; if (lib.config.banned.contains(i)) sd++; break;
                        case 'jin': g++; if (lib.config.banned.contains(i)) sg++; break;
                        case 'western': e++; if (lib.config.banned.contains(i)) se++; break;
                        case 'key': f++; if (lib.config.banned.contains(i)) sf++; break;
                    }
                }
                console.log('魏：' + (a - sa) + '/' + a);
                console.log('蜀：' + (b - sb) + '/' + b);
                console.log('吴：' + (c - sc) + '/' + c);
                console.log('群：' + (d - sd) + '/' + d);
                console.log('晋：' + (g - sg) + '/' + g);
                console.log('西：' + (e - se) + '/' + e);
                console.log('键：' + (f - sf) + '/' + f);
                console.log('已启用：' + ((a + b + c + d + e + f) - (sa + sb + sc + sd + se + sf)) + '/' + (a + b + c + d + e + f));
            }());
            (function () {
                var a = 0, b = 0, c = 0, d = 0;
                var aa = 0, bb = 0, cc = 0, dd = 0;
                var sa = 0, sb = 0, sc = 0, sd = 0;
                var sha = 0, shan = 0, tao = 0, jiu = 0, wuxie = 0, heisha = 0, hongsha = 0;
                var num = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
                for (var i in lib.card) {
                    if (get.objtype(lib.card[i]) == 'object' && lib.translate[i + '_info']) {
                        switch (lib.card[i].type) {
                            case 'basic': a++; break;
                            case 'trick': b++; break;
                            case 'equip': c++; break;
                            default: d++; break;
                        }
                    }
                }
                for (var i = 0; i < lib.card.list.length; i++) {
                    if (typeof lib.card[lib.card.list[i][2]] == 'object') {
                        switch (lib.card[lib.card.list[i][2]].type) {
                            case 'basic': aa++; break;
                            case 'trick': case 'delay': bb++; break;
                            case 'equip': cc++; break;
                            default: dd++; break;
                        }
                        switch (lib.card.list[i][0]) {
                            case 'heart': sa++; break;
                            case 'diamond': sb++; break;
                            case 'club': sc++; break;
                            case 'spade': sd++; break;
                        }
                        if (lib.card.list[i][2] == 'sha') {
                            sha++;
                            if (lib.card.list[i][0] == 'club' || lib.card.list[i][0] == 'spade') {
                                heisha++;
                            }
                            else {
                                hongsha++;
                            }
                        }
                        if (lib.card.list[i][2] == 'shan') {
                            shan++;
                        }
                        if (lib.card.list[i][2] == 'tao') {
                            tao++;
                        }
                        if (lib.card.list[i][2] == 'jiu') {
                            jiu++;
                        }
                        if (lib.card.list[i][2] == 'wuxie') {
                            wuxie++;
                        }
                        num[lib.card.list[i][1]]++;
                    }
                }
                var str = '基本牌' + aa + '； ' + '锦囊牌' + bb + '； ' + '装备牌' + cc + '； ' + '其它牌' + dd
                console.log(str);
                str = '红桃牌' + sa + '； ' + '方片牌' + sb + '； ' + '梅花牌' + sc + '； ' + '黑桃牌' + sd
                console.log(str);
                str = '杀' + sha + '； ' + '黑杀' + heisha + '； ' + '红杀' + hongsha + '； ' + '闪' + shan + '； ' + '桃' + tao + '； ' + '酒' + jiu + '； ' + '无懈' + wuxie
                console.log(str);
                if (arguments[1]) {
                    for (var i = 1; i <= 13; i++) {
                        if (i < 10) {
                            console.log(i + ' ', num[i]);
                        }
                        else {
                            console.log(i, num[i]);
                        }
                    }
                }
                var arr = [];
                for (var i = 1; i <= 13; i++) {
                    arr.push(num[i]);
                }
                console.log((a + b + c + d) + '/' + (aa + bb + cc + dd), ...arr)
            }());
        },
        id: function () {
            game.showIdentity();
        },
        b: function () {
            if (!ui.dialog || !ui.dialog.buttons) return;
            for (var i = 0; i < Math.min(arguments.length, ui.dialog.buttons.length); i++) {
                ui.dialog.buttons[i].link = arguments[i];
            }
        },
        uy: function (me) {
            if (me) {
                game.me.useCard({ name: 'spell_yexinglanghun' }, game.me);
            }
            else {
                var enemy = game.me.getEnemy();
                enemy.useCard({ name: 'spell_yexinglanghun' }, enemy);
            }
        },
        gs: function (name, act) {
            var card = game.createCard('spell_' + (name || 'yexinglanghun'));
            game.me.node.handcards1.appendChild(card);
            if (!act) {
                game.me.actused = -99;
            }
            ui.updatehl();
            delete _status.event._cardChoice;
            delete _status.event._targetChoice;
            delete _status.event._skillChoice;
            setTimeout(game.check, 300);
        },
        gc: function (name, act) {
            var card = game.createCard('stone_' + (name || 'falifulong') + '_stonecharacter');
            game.me.node.handcards1.appendChild(card);
            if (!act) {
                game.me.actused = -99;
            }
            ui.updatehl();
            delete _status.event._cardChoice;
            delete _status.event._targetChoice;
            delete _status.event._skillChoice;
            setTimeout(game.check, 300);
        },
        a: function (bool) {
            if (lib.config.test_game) {
                game.saveConfig('test_game');
            }
            else {
                if (bool) {
                    if (typeof bool === 'string') {
                        game.saveConfig('test_game', bool);
                    }
                    else {
                        game.saveConfig('test_game', '_');
                    }
                }
                else {
                    game.saveConfig('test_game', true);
                }
            }
            game.reload();
        },
        as: function () {
            ui.window.classList.remove('testing');
            var bg = ui.window.querySelector('.pausedbg');
            if (bg) {
                bg.remove();
            }
        },
        uj: function () {
            cheat.e('qilin');
            game.me.next.useCard({ name: 'jiedao' }, [game.me, game.me.previous]);
        },
        u: function () {
            var card = { name: 'sha' }, source = game.me.next, targets = [];
            for (var i = 0; i < arguments.length; i++) {
                if (get.itemtype(arguments[i]) == 'player') {
                    source = arguments[i];
                }
                else if (Array.isArray(arguments[i])) {
                    targets = arguments[i];
                }
                else if (typeof arguments[i] == 'object' && arguments[i]) {
                    card = arguments[i];
                }
                else if (typeof arguments[i] == 'string') {
                    card = { name: arguments[i] }
                }
            }
            if (!targets.length) targets.push(game.me);
            source.useCard(game.createCard(card.name, card.suit, card.number, card.nature), targets);
        },
        r: function (bool) {
            var list = ['s', 'ap', 'a', 'am', 'bp', 'b', 'bm', 'c', 'd'];
            var str = '';
            for (var i = 0; i < list.length; i++) {
                if (str) str += ' 、 ';
                str += list[i] + '-' + lib.rank[list[i]].length;
            }
            console.log(str);
            for (var i in lib.characterPack) {
                if (!bool && lib.config.all.sgscharacters.contains(i)) continue;
                var map = {};
                var str = '';
                for (var j in lib.characterPack[i]) {
                    var rank = get.rank(j);
                    if (!map[rank]) {
                        map[rank] = 1;
                    }
                    else {
                        map[rank]++;
                    }
                }
                for (var j = 0; j < list.length; j++) {
                    if (map[list[j]]) {
                        if (str) str += ' 、 ';
                        str += list[j] + '-' + map[list[j]];
                    }
                }
                if (str) {
                    console.log(lib.translate[i + '_character_config'] + '：' + str);
                }
            }

            var list = lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
                concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
            Object.keys(lib.character).forEach(key => {
                if (!lib.config.forbidai.includes(key) && !key.startsWith('boss_') && !key.startsWith('tafang_') && !list.includes(key)) console.log(get.translation(key), key);
            });
        },
        h: function (player) {
            console.log(get.translation(player.getCards('h')));
        },
        g: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (i > 0 && typeof arguments[i] == 'number') {
                    for (var j = 0; j < arguments[i] - 1; j++) {
                        cheat.gx(arguments[i - 1]);
                    }
                }
                else {
                    cheat.gx(arguments[i]);
                }
            }
        },
        ga: function (type) {
            for (var i in lib.card) {
                if (lib.card[i].type == type || lib.card[i].subtype == type) {
                    cheat.g(i);
                }
            }
        },
        gg: function () {
            for (var i = 0; i < game.players.length; i++) {
                for (var j = 0; j < arguments.length; j++) {
                    cheat.gx(arguments[j], game.players[i]);
                }
            }
        },
        gx: function (name, target) {
            target = target || game.me;
            var card = cheat.gn(name);
            if (!card) return;
            target.node.handcards1.appendChild(card);
            delete _status.event._cardChoice;
            delete _status.event._targetChoice;
            delete _status.event._skillChoice;
            game.check();
            target.update();
            ui.updatehl();
        },
        gn: function (name) {
            var nature = null;
            var suit = null;
            var suits = ['club', 'spade', 'diamond', 'heart'];
            for (var i = 0; i < suits.length; i++) {
                if (name.startsWith(suits[i])) {
                    suit = suits[i];
                    name = name.slice(suits[i].length);
                    break;
                }
            }
            if (name.startsWith('red')) {
                name = name.slice(3);
                suit = ['diamond', 'heart'].randomGet();
            }
            if (name.startsWith('black')) {
                name = name.slice(5);
                suit = ['spade', 'club'].randomGet();
            }

            if (name == 'huosha') {
                name = 'sha';
                nature = 'fire';
            }
            else if (name == 'leisha') {
                name = 'sha';
                nature = 'thunder';
            }
            if (!lib.card[name]) {
                return null;
            }
            return game.createCard(name, suit, null, nature);
        },
        ge: function (target) {
            if (target) {
                cheat.gx('zhuge', target);
                cheat.gx('qinglong', target);
                cheat.gx('bagua', target);
                cheat.gx('dilu', target);
                cheat.gx('chitu', target);
                cheat.gx('muniu', target);
            }
            else {
                cheat.g('zhuge');
                cheat.g('qinglong');
                cheat.g('bagua');
                cheat.g('dilu');
                cheat.g('chitu');
                cheat.g('muniu');
            }
        },
        gj: function () {
            cheat.g('shandian');
            cheat.g('huoshan');
            cheat.g('hongshui');
            cheat.g('lebu');
            cheat.g('bingliang');
            cheat.g('guiyoujie');
        },
        gf: function () {
            for (var i in lib.card) {
                if (lib.card[i].type == 'food') {
                    cheat.g(i);
                }
            }
        },
        d: function (num, target) {
            if (num == undefined) num = 1;
            var cards = get.cards(num);
            for (var i = 0; i < num; i++) {
                var card = cards[i];
                game.me.node.handcards1.appendChild(card);
                delete _status.event._cardChoice;
                delete _status.event._targetChoice;
                delete _status.event._skillChoice;
                game.check();
                game.me.update();
                ui.updatehl();
            }
        },
        s: function () {
            for (var i = 0; i < arguments.length; i++) {
                game.me.addSkill(arguments[i], true);
            }
            delete _status.event._cardChoice;
            delete _status.event._targetChoice;
            delete _status.event._skillChoice;
            game.check();
        },
        t: function (num) {
            if (game.players.contains(num)) {
                num = game.players.indexOf(num);
            }
            if (num == undefined) {
                for (var i = 0; i < game.players.length; i++) cheat.t(i);
                return;
            }
            var player = game.players[num];
            var cards = player.getCards('hej');
            for (var i = 0; i < cards.length; i++) {
                cards[i].discard();
            }
            player.removeEquipTrigger();
            player.update();
        },
        to: function () {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i] != game.me) {
                    cheat.t(i);
                }
            }
        },
        tm: function () {
            for (var i = 0; i < game.players.length; i++) {
                if (game.players[i] == game.me) {
                    cheat.t(i);
                }
            }
        },
        k: function (i) {
            if (i == undefined) i = 1;
            game.players[i].hp = 1;
            cheat.t(i);
            cheat.g('juedou');
        },
        z: function (name) {
            switch (name) {
                case 'cc': name = 're_caocao'; break;
                case 'lb': name = 're_liubei'; break;
                case 'sq': name = 'sunquan'; break;
                case 'dz': name = 'dongzhuo'; break;
                case 'ys': name = 're_yuanshao'; break;
                case 'zj': name = 'sp_zhangjiao'; break;
                case 'ls': name = 'liushan'; break;
                case 'sc': name = 'sunce'; break;
                case 'cp': name = 'caopi'; break;
                case 'cr': name = 'caorui'; break;
                case 'sx': name = 'sunxiu'; break;
                case 'lc': name = 'liuchen'; break;
                case 'sh': name = 'sunhao'; break;
            }
            game.zhu.init(name);
            game.zhu.maxHp++;
            game.zhu.hp++;
            game.zhu.update();
        },
    };

    const filter = {
        all:()=>true,
        none:()=>false,
        //Check if the card does not count toward the player's hand limit
        //检测此牌是否不计入此角色的手牌上限
        ignoredHandcard:(card,player)=>game.checkMod(card,player,false,'ignoredHandcard',player),
        //Check if the card is giftable
        //检测此牌是否可赠予
        cardGiftable:(card,player,target,strict)=>{
            const mod=game.checkMod(card,player,target,'unchanged','cardGiftable',player);
            if(!mod||strict&&(mod=='unchanged'&&(get.position(card)!='h'||!get.cardtag(card,'gifts'))||player==target)) return false;
            return get.type(card,false)!='equip'||target.canEquip(card,true);
        },
        //Check if the card is recastable
        //检查此牌是否可重铸
        cardRecastable:(card,player,source,strict)=>{
            if(typeof player=='undefined') player=get.owner(card);
            const mod=game.checkMod(card,player,source,'unchanged','cardRecastable',player);
            if(!mod) return false;
            if(strict&&mod=='unchanged'){
                if(get.position(card)!='h') return false;
                const info=get.info(card),recastable=info.recastable||info.chongzhu;
                return Boolean(typeof recastable=='function'?recastable(_status.event,player):recastable);
            }
            return true;
        },
        //装备栏相关
        canBeReplaced:function(card,player){
            var mod=game.checkMod(card,player,'unchanged','canBeReplaced',player);
            if(mod!='unchanged') return mod;
            return true;
        },
        //装备栏 END
        buttonIncluded:function(button){
            return !(_status.event.excludeButton&&_status.event.excludeButton.contains(button));
        },
        filterButton:function(button){
            return true;
        },
        cardSavable:function(card,player,target){
            if(get.itemtype(card)=='card'){
                var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                if(mod2!='unchanged') return mod2;
            }
            var mod=game.checkMod(card,player,target,'unchanged','cardSavable',player);
            if(mod!='unchanged') return mod;
            var savable=get.info(card).savable;
            if(typeof savable=='function') savable=savable(card,player,target);
            return savable;
        },
        filterTrigger:function(event,player,name,skill){
            if(player._hookTrigger){
                for(var i=0;i<player._hookTrigger.length;i++){
                    var info=lib.skill[player._hookTrigger[i]].hookTrigger;
                    if(info){
                        if(info.block&&info.block(event,player,name,skill)){
                            return false;
                        }
                    }
                }
            }
            var fullskills=game.expandSkills(player.getSkills(false).concat(lib.skill.global));
            var info=get.info(skill);
            if(((info&&info.noHidden)||get.mode()!='guozhan')&&!fullskills.contains(skill)){
                return false;
            }
            if(!info.trigger) return false;
            var bool=false;
            var has=function(obj){
                if(typeof obj=='string') return obj==name;
                else if(obj.contains(name)) return true;
                return false;
            }
            for(var i in info.trigger){
                if((i=='global'||player==event[i])&&has(info.trigger[i])){
                    bool=true;break;
                }
            }
            if(!bool) return false;
            if(info.filter&&!info.filter(event,player,name)){
                return false;
            }
            if(event._notrigger.contains(player)&&!lib.skill.global.contains(skill)){
                return false;
            }
            if(typeof info.usable=='number'&&player.hasSkill('counttrigger')&&
                player.storage.counttrigger&&player.storage.counttrigger[skill]>=info.usable){
                return false;
            }
            if(info.round&&(info.round-(game.roundNumber-player.storage[skill+'_roundcount'])>0)){
                return false;
            }
            return true;
        },
        characterDisabled:function(i,libCharacter){
            if(!lib.character[i]||lib.character[i][4]&&lib.character[i][4].contains('forbidai')) return true;
            if(lib.character[i][4]&&lib.character[i][4].contains('unseen')) return true;
            if(lib.config.forbidai.contains(i)) return true;
            if(lib.characterFilter[i]&&!lib.characterFilter[i](get.mode())) return true;
            if(_status.connectMode){
                if(lib.configOL.banned.contains(i)||lib.connectBanned.contains(i)) return true;
                var double_character=false;
                if(lib.configOL.mode=='guozhan'){
                    double_character=true;
                }
                else if(lib.configOL.double_character&&(lib.configOL.mode=='identity'||lib.configOL.mode=='stone')){
                    double_character=true;
                }
                else if(lib.configOL.double_character_jiange&&(lib.configOL.mode=='versus'&&_status.mode=='jiange')){
                    double_character=true;
                }
                if(double_character&&lib.config.forbiddouble.contains(i)){
                    return true;
                }
                // if(lib.configOL.ban_weak){
                // 	if(lib.config.replacecharacter[i]&&libCharacter&&libCharacter[lib.config.replacecharacter[i]]) return true;
                // 	if(lib.config.forbidall.contains(i)) return true;
                // 	if(!double_character&&get.rank(i,true)<=2){
                // 		return true;
                // 	}
                // }
                // if(lib.configOL.ban_strong&&get.rank(i,true)>=8){
                // 	return true;
                // }
            }
            else{
                if(lib.config.banned.contains(i)) return true;
                var double_character=false;
                if(get.mode()=='guozhan'){
                    double_character=true;
                }
                else if(get.config('double_character')&&(lib.config.mode=='identity'||lib.config.mode=='stone')){
                    double_character=true;
                }
                else if(get.config('double_character_jiange')&&(lib.config.mode=='versus'&&_status.mode=='jiange')){
                    double_character=true;
                }
                if(double_character&&lib.config.forbiddouble.contains(i)){
                    return true;
                }
                // if(get.config('ban_weak')){
                // 	if(lib.config.replacecharacter[i]&&lib.character[lib.config.replacecharacter[i]]) return true;
                // 	if(lib.config.forbidall.contains(i)) return true;
                // 	if(!double_character&&get.rank(i,true)<=2){
                // 		return true;
                // 	}
                // }
                // if(get.config('ban_strong')&&get.rank(i,true)>=8){
                // 	return true;
                // }
            }
        },
        characterDisabled2:function(i){
            var info=lib.character[i];
            if(!info) return true;
            if(info[4]){
                if(info[4].contains('boss')) return true;
                if(info[4].contains('hiddenboss')) return true;
                if(info[4].contains('minskin')) return true;
                if(info[4].contains('unseen')) return true;
                if(info[4].contains('forbidai')&&(!_status.event.isMine||!_status.event.isMine())) return true;
                if(lib.characterFilter[i]&&!lib.characterFilter[i](get.mode())) return true;
            }
            return false;
        },
        skillDisabled:function(skill){
            if(!lib.translate[skill]||!lib.translate[skill+'_info']) return true;
            var info=lib.skill[skill];
            if(info&&!info.unique&&!info.temp&&!info.sub&&!info.fixed&&!info.vanish){
                return false;
            }
            return true;
        },
        cardEnabled:function(card,player,event){
            if(player==undefined) player=_status.event.player;
            if(!player) return false;
            if(get.itemtype(card)=='card'){
                var mod2=game.checkMod(card,player,event,'unchanged','cardEnabled2',player);
                if(mod2!='unchanged') return mod2;
            }
            card=get.autoViewAs(card);
            if(event==='forceEnable'){
                var mod=game.checkMod(card,player,event,'unchanged','cardEnabled',player);
                if(mod!='unchanged') return mod;
                return true;
            }
            else{
                var filter=get.info(card).enable;
                if(!filter) return;
                var mod=game.checkMod(card,player,event,'unchanged','cardEnabled',player);
                if(mod!='unchanged') return mod;
                if(typeof filter=='boolean') return filter;
                if(typeof filter=='function') return filter(card,player,event);
            }
        },
        cardRespondable:function(card,player,event){
            event=event||_status.event;
            if(event.name!='chooseToRespond') return true;
            var source=event.getParent().player;
            if(source&&source!=player){
                if(source.hasSkillTag('norespond',false,[card,player,event],true)){
                    return false;
                }
            }
            if(player==undefined) player=_status.event.player;
            if(get.itemtype(card)=='card'){
                var mod2=game.checkMod(card,player,event,'unchanged','cardEnabled2',player);
                if(mod2!='unchanged') return mod2;
            }
            var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
            if(mod!='unchanged') return mod;
            return true;
        },
        cardUsable2:function(card,player,event){
            card=get.autoViewAs(card);
            var info=get.info(card);
            if(info.updateUsable=='phaseUse'){
                event=event||_status.event;
                if(event.type=='chooseToUse_button') event=event.getParent();
                if(player!=_status.event.player) return true;
                if(event.getParent().name!='phaseUse') return true;
                if(event.getParent().player!=player) return true;
            }
            var num=info.usable;
            if(typeof num=='function') num=num(card,player);
            num=game.checkMod(card,player,num,'cardUsable',player);
            if(typeof num!='number') return true;
            else return(player.countUsed(card)<num);
        },
        cardUsable:function(card,player,event){
            card=get.autoViewAs(card);
            var info=get.info(card);
            event=event||_status.event;
            if(event.type=='chooseToUse_button') event=event.getParent();
            if(player!=_status.event.player) return true;
            if(info.updateUsable=='phaseUse'){
                if(event.getParent().name!='phaseUse') return true;
                if(event.getParent().player!=player) return true;
            }
            event.addCount_extra=true;
            var num=info.usable;
            if(typeof num=='function') num=num(card,player);
            num=game.checkMod(card,player,num,'cardUsable',player);
            if(typeof num!='number'){
                return (typeof num=='boolean')?num:true;
            }
            if(player.countUsed(card)<num) return true;
            if(game.hasPlayer(function(current){
                return game.checkMod(card,player,current,false,'cardUsableTarget',player);
            })){
                return true;
            }
            return false;
        },
        cardDiscardable:function(card,player,event){
            event=event||_status.event;
            if(typeof event!='string') event=event.getParent().name;
            var mod=game.checkMod(card,player,event,'unchanged','cardDiscardable',player);
            if(mod!='unchanged') return mod;
            return true;
        },
        canBeDiscarded:function(card,player,target,event){
            event=event||_status.event;
            if(typeof event!='string') event=event.getParent().name;
            var mod=game.checkMod(card,player,target,event,'unchanged','canBeDiscarded',target);
            if(mod!='unchanged') return mod;
            return true;
        },
        canBeGained:function(card,player,target,event){
            event=event||_status.event;
            if(typeof event!='string') event=event.getParent().name;
            var mod=game.checkMod(card,player,target,event,'unchanged','canBeGained',target);
            if(mod!='unchanged') return mod;
            return true;
        },
        cardAiIncluded:function(card){
            if(_status.event.isMine()) return true;
            return (_status.event._aiexclude.contains(card)==false);
        },
        filterCard:function(card,player,event){
            var info=get.info(card);
            //if(info.toself&&!lib.filter.targetEnabled(card,player,player)) return false;
            if(player==undefined) player=_status.event.player;
            if(!lib.filter.cardEnabled(card,player,event)||!lib.filter.cardUsable(card,player,event)) return false;
            if(info.notarget) return true;
            var range;
            var select=get.copy(info.selectTarget);
            if(select==undefined){
                if(info.filterTarget==undefined) return true;
                range=[1,1];
            }
            else if(typeof select=='number') range=[select,select];
            else if(get.itemtype(select)=='select') range=select;
            else if(typeof select=='function') range=select(card,player);
            game.checkMod(card,player,range,'selectTarget',player);
            if(!range||range[1]!=-1) return true;
            var filterTarget=(event&&event.filterTarget)?event.filterTarget:lib.filter.filterTarget;
            return game.hasPlayer(function(current){
                return filterTarget(card,player,current);
            });
        },
        targetEnabledx:function(card,player,target){
            if(!card) return false;
            var event=_status.event;
            if(event._backup&&event._backup.filterCard==lib.filter.filterCard&&(!lib.filter.cardEnabled(card,player,event)||!lib.filter.cardUsable(card,player,event))) return false;
            if(event.addCount_extra){
                if(!lib.filter.cardUsable2(card,player)&&!game.checkMod(card,player,target,false,'cardUsableTarget',player)) return false;
            }
            var info=get.info(card);
            if(info.singleCard&&info.filterAddedTarget&&ui.selected.targets.length) return Boolean(info.filterAddedTarget(card,player,target,ui.selected.targets[ui.selected.targets.length-1]));
            return lib.filter.targetEnabled.apply(this,arguments);
        },
        targetEnabled:function(card,player,target){
            if(!card) return false;
            var info=get.info(card);
            var filter=info.filterTarget;
            if(!info.singleCard||ui.selected.targets.length==0){
                var mod=game.checkMod(card,player,target,'unchanged','playerEnabled',player);
                if(mod!='unchanged') return mod;
                var mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target);
                if(mod!='unchanged') return mod;
            }
            if(typeof filter=='boolean') return filter;
            if(typeof filter=='function') return Boolean(filter(card,player,target));
        },
        targetEnabled2:function(card,player,target){
            if(lib.filter.targetEnabled(card,player,target)) return true;
            if(!card) return false;

            if(game.checkMod(card,player,target,'unchanged','playerEnabled',player)==false) return false;
            if(game.checkMod(card,player,target,'unchanged','targetEnabled',target)==false) return false;

            var filter=get.info(card).modTarget;
            if(typeof filter=='boolean') return filter;
            if(typeof filter=='function') return Boolean(filter(card,player,target));
            return false;
        },
        targetEnabled3:function(card,player,target){
            if(!card) return false;
            var info=get.info(card);

            if(info.filterTarget==true) return true;
            if(typeof info.filterTarget=='function'&&info.filterTarget(card,player,target)) return true;

            if(info.modTarget==true) return true;
            if(typeof info.modTarget=='function'&&info.modTarget(card,player,target)) return true;
            return false;
        },
        targetInRange:function(card,player,target){
            var info=get.info(card);
            var range=info.range;
            var outrange=info.outrange;
            if(range==undefined&&outrange==undefined) return true;
            
            var mod=game.checkMod(card,player,target,'unchanged','targetInRange',player);
            var extra=0;
            if(mod!='unchanged'){
                if(typeof mod=='boolean') return mod;
                if(typeof mod=='number') extra=mod;
            }
            if(typeof info.range=='function') return info.range(card,player,target);
            
            if(player.hasSkill('undist')||target.hasSkill('undist')) return false;
            for(var i in range){
                if(i=='attack'){
                    var range2=player.getAttackRange();
                    if(range2<=0) return false;
                    var distance=get.distance(player,target)+extra;
                    if(range[i]<=distance-range2) return false;
                }
                else{
                    var distance=get.distance(player,target,i)+extra;
                    if(range[i]<distance) return false;
                }
            }
            for(var i in outrange){
                if(i=='attack'){
                    var range2=player.getAttackRange();
                    if(range2<=0) return false;
                    var distance=get.distance(player,target)+extra;
                    if(outrange[i]>distance-range2+1) return false;
                }
                else{
                    var distance=get.distance(player,target,i)+extra;
                    if(outrange[i]>distance) return false;
                }
            }
            return true;
        },
        filterTarget:function(card,player,target){
            return (lib.filter.targetEnabledx(card,player,target)&&
                lib.filter.targetInRange(card,player,target));
        },
        filterTarget2:function(card,player,target){
            return (lib.filter.targetEnabled2(card,player,target)&&
                lib.filter.targetInRange(card,player,target));
        },
        notMe:function(card,player,target){
            return player!=target;
        },
        isMe:function(card,player,target){
            return player==target;
        },
        attackFrom:function(card,player,target){
            return get.distance(player,target,'attack')<=1;
        },
        globalFrom:function(card,player,target){
            return get.distance(player,target)<=1;
        },
        selectCard:function(){
            return [1,1];
        },
        selectTarget:function(card,player){
            if(!card) card=get.card();
            if(!player) player=get.player();
            if(card==undefined) return;
            var range,info=get.info(card);
            var select=get.copy(info.selectTarget);
            if(select==undefined){
                if(info.filterTarget==undefined) return [0,0];
                range=[1,1];
            }
            else if(typeof select=='number') range=[select,select];
            else if(get.itemtype(select)=='select') range=select;
            else if(typeof select=='function') range=select(card,player);
            game.checkMod(card,player,range,'selectTarget',player);
            if(info.singleCard&&info.filterAddedTarget) return [range[0]*2,range[1]*2];
            return range;
        },
        judge:function(card,player,target){
            return target.canAddJudge(card);
        },
        autoRespondSha:function(){
            return !this.player.hasSha(true);
        },
        autoRespondShan:function(){
            return !this.player.hasShan();
        },
        wuxieSwap:function(event){
            if(event.type=='wuxie'){
                if(ui.wuxie&&ui.wuxie.classList.contains('glow')){
                    return true;
                }
                if(ui.tempnowuxie&&ui.tempnowuxie.classList.contains('glow')&&event.state>0){
                    var triggerevent=event.getTrigger();
                    if(triggerevent){
                        if(ui.tempnowuxie._origin==triggerevent.parent.id){
                            return true;
                        }
                    }
                    else if(ui.tempnowuxie._origin==_status.event.id2){
                        return true;
                    }
                }
                if(lib.config.wuxie_self){
                    var tw=event.info_map;
                    if(tw.player&&tw.player.isUnderControl(true)&&!tw.player.hasSkillTag('noautowuxie')&&
                        (!tw.targets||tw.targets.length<=1)&&!tw.noai){
                        return true;
                    }
                }
            }
        }
    };

    const libHooks = {
        // 本体势力的颜色
        addGroup: [(id, _short, _name, config) => {
            if ("color" in config && config.color != null) {
                let color1, color2, color3, color4;
                if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
                    let c1 = parseInt(`0x${config.color.slice(1, 3)}`);
                    let c2 = parseInt(`0x${config.color.slice(3, 5)}`);
                    let c3 = parseInt(`0x${config.color.slice(5, 7)}`);
                    color1 = color2 = color3 = color4 = [c1, c2, c3, 1];
                }
                else if (Array.isArray(config.color) && config.color.length == 4) {
                    if (config.color.every(item => Array.isArray(item))) {
                        color1 = config.color[0];
                        color2 = config.color[1];
                        color3 = config.color[2];
                        color4 = config.color[3];
                    }
                    else color1 = color2 = color3 = color4 = config.color;
                }
                if (color1 && color2 && color3 && color4) {
                    const cs = lib.linq.cselector;
                    const g1 = cs.group(
                        cs.of(
                            cs.class("player", "identity"),
                            cs.isAttr("data-color", `"${id}"`)
                        ),
                        cs.of(
                            "div",
                            cs.isAttr("data-nature", `"${id}"`)
                        ),
                        cs.of(
                            "span",
                            cs.isAttr("data-nature", `"${id}"`)
                        )
                    );
                    const g2 = cs.group(
                        cs.of(
                            "div",
                            cs.isAttr("data-nature", `"${id}m"`)
                        ),
                        cs.of(
                            "span",
                            cs.isAttr("data-nature", `"${id}m"`)
                        )
                    );
                    const g3 = cs.group(
                        cs.of(
                            "div",
                            cs.isAttr("data-nature", `"${id}mm"`)
                        ),
                        cs.of(
                            "span",
                            cs.isAttr("data-nature", `"${id}mm"`)
                        )
                    );
                    let result = {};
                    result[g1] = {
                        textShadow: cs.group(
                            "black 0 0 1px",
                            `rgba(${color1.join()}) 0 0 2px`,
                            `rgba(${color2.join()}) 0 0 5px`,
                            `rgba(${color3.join()}) 0 0 10px`,
                            `rgba(${color4.join()}) 0 0 10px`
                        )
                    };
                    result[g2] = {
                        textShadow: cs.group(
                            "black 0 0 1px",
                            `rgba(${color1.join()}) 0 0 2px`,
                            `rgba(${color2.join()}) 0 0 5px`,
                            `rgba(${color3.join()}) 0 0 5px`,
                            `rgba(${color4.join()}) 0 0 5px`,
                            "black 0 0 1px"
                        )
                    };
                    result[g3] = {
                        textShadow: cs.group(
                            "black 0 0 1px",
                            `rgba(${color1.join()}) 0 0 2px`,
                            `rgba(${color2.join()}) 0 0 2px`,
                            `rgba(${color3.join()}) 0 0 2px`,
                            `rgba(${color4.join()}) 0 0 2px`,
                            "black 0 0 1px"
                        )
                    };
                    game.dynamicStyle.addObject(result);
                    lib.groupnature[id] = id;
                }
            }
            if (typeof config.image == 'string') Object.defineProperty(lib.card, `group_${id}`, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: {
                    fullskin: true,
                    image: config.image
                }
            });
        }],
        //增加新属性杀
        addNature: [(nature, _translation, config) => {
            if (typeof config != 'object') config = {};
            let linked = config.linked, order = config.order, background = config.background, lineColor = config.lineColor;
            if (typeof linked != 'boolean') linked = true;
            if (typeof order != 'number') order = 0;
            if (typeof background != 'string') background = '';
            if (!Array.isArray(lineColor) || lineColor.length != 3) lineColor = [];
            else if (background.startsWith('ext:')) {
                background = background.replace(/^ext:/, 'extension/');
            }
            if (linked) lib.linked.add(nature);
            if (lineColor.length) lib.lineColor.set(nature, lineColor);
            lib.nature.set(nature, order);
            if (background.length > 0) lib.natureBg.set(nature, background);
            if (config.audio) {
                for (let key in config.audio) {
                    if (!lib.natureAudio[key]) {
                        lib.natureAudio[key] = config.audio[key];
                    } else {
                        for (let key2 in config.audio[key]) {
                            lib.natureAudio[key][key2] = config.audio[key][key2];
                        }
                    }
                }
            }

            let color1, color2;
            if (typeof config.color == "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(config.color)) {
                let c1 = parseInt(`0x${item[1].slice(1, 3)}`);
                let c2 = parseInt(`0x${item[1].slice(3, 5)}`);
                let c3 = parseInt(`0x${item[1].slice(5, 7)}`);
                color1 = color2 = [c1, c2, c3, 1];
            }
            else if (Array.isArray(config.color) && config.color.length >= 2 && config.color.length <= 4) {
                if (config.color.every(item => Array.isArray(item))) {
                    color1 = config.color[0];
                    color2 = config.color[1];
                }
                else {
                    let color = config.color.slice();
                    if (color.length == 3) color.push(1);
                    color1 = color2 = color;
                }
            }
            if (color1 && color2) {
                const cs = lib.linq.cselector;
                const g1 = cs.group(
                    cs.of(
                        cs.class("card", "fullskin", `${nature}`),
                        '>',
                        cs.class("name")
                    )
                );
                let result = {};
                result[g1] = {
                    color: `rgba(${color1.join()})`,
                    border: cs.merge(
                        '1px',
                        'solid',
                        `rgba(${color2.join()})`
                    ),
                };
                game.dynamicStyle.addObject(result);

                const g2 = cs.group(
                    cs.of(
                        cs.class("tempname", `${nature}`),
                        ':not([data-nature])>',
                        cs.class("span")
                    )
                )
                let result2 = {};
                result2[g2] = {
                    color: `rgba(${color1.join()})`,
                };
                game.dynamicStyle.addObject(result2);
            }
        }],
    };

    const message = {
        server:{
            init:function(version,config,banned_info){
                if(lib.node.banned.contains(banned_info)){
                    this.send('denied','banned');
                }
                else if(config.id&&lib.playerOL&&lib.playerOL[config.id]){
                    var player=lib.playerOL[config.id];
                    player.setNickname();
                    player.ws=this;
                    player.isAuto=false;
                    this.id=config.id;
                    game.broadcast(function(player){
                        player.setNickname();
                    },player);
                    this.send('reinit',lib.configOL,get.arenaState(),game.getState?game.getState():{},game.ip,null,_status.onreconnect,_status.cardtag,_status.postReconnect);
                }
                else if(version!=lib.versionOL){
                    this.send('denied','version');
                    lib.node.clients.remove(this);
                    this.closed=true;
                }
                else if(!_status.waitingForPlayer){
                    if(game.phaseNumber&&lib.configOL.observe){
                        lib.node.observing.push(this);
                        this.send('reinit',lib.configOL,get.arenaState(),game.getState?game.getState():{},game.ip,game.players[0].playerid,null,_status.cardtag);
                        if(!ui.removeObserve){
                            ui.removeObserve=ui.create.system('移除旁观',function(){
                                lib.configOL.observe=false;
                                if(game.onlineroom){
                                    game.send('server','config',lib.configOL);
                                }
                                while(lib.node.observing.length){
                                    lib.node.observing.shift().ws.close();
                                }
                                this.remove();
                                delete ui.removeObserve;
                            },true,true);
                        }
                    }
                    else{
                        this.send('denied','gaming');
                        lib.node.clients.remove(this);
                        this.closed=true;
                    }
                }
                else if(lib.node.clients.length-(window.isNonameServer?1:0)>=parseInt(lib.configOL.number)){
                    this.send('denied','number');
                    lib.node.clients.remove(this);
                    this.closed=true;
                }
                else{
                    if(config){
                        this.avatar=config.avatar;
                        this.nickname=config.nickname;
                    }
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].classList.contains('unselectable2')) continue;
                        if(game.connectPlayers[i]!=game.me&&!game.connectPlayers[i].playerid){
                            game.connectPlayers[i].playerid=this.id;
                            game.connectPlayers[i].initOL(this.nickname,this.avatar);
                            game.connectPlayers[i].ws=this;
                            break;
                        }
                    }
                    this.send('init',this.id,lib.configOL,game.ip,window.isNonameServer,game.roomId);
                }
            },
            inited:function(){
                this.inited=true;
                if(_status.waitingForPlayer){
                    game.updateWaiting();
                }
            },
            reinited:function(){
                this.inited=true;
            },
            result:function(result){
                if(lib.node.observing.contains(this)) return;
                var player=lib.playerOL[this.id];
                if(player){
                    player.unwait(result);
                }
            },
            tempResult:function(result){
                if(lib.node.observing.contains(this)) return;
                var player=lib.playerOL[this.id];
                if(player){
                    player.tempUnwait(result);
                }
            },
            startGame:function(){
                if(this.id==game.onlinezhu){
                    game.resume();
                }
            },
            changeRoomConfig:function(config){
                if(this.id==game.onlinezhu){
                    game.broadcastAll(function(config){
                        for(var i in config){
                            lib.configOL[i]=config[i];
                        }
                        if(ui.connectStartBar){
                            ui.connectStartBar.firstChild.innerHTML=get.modetrans(lib.configOL,true);
                        }
                    },config);
                    if(lib.configOL.mode=='identity'&&lib.configOL.identity_mode=='zhong'&&game.connectPlayers){
                        for(var i=0;i<game.connectPlayers.length;i++){
                            game.connectPlayers[i].classList.remove('unselectable2');
                        }
                        lib.configOL.number=8;
                        game.updateWaiting();
                    }
                    if(game.onlineroom){
                        game.send('server','config',lib.configOL);
                    }
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==this.id){
                            game.connectPlayers[i].chat('房间设置已更改');
                        }
                    }
                }
            },
            changeNumConfig:function(num,index,bool){
                if(this.id==game.onlinezhu){
                    lib.configOL.number=num;
                    game.send('server','config',lib.configOL);
                    if(game.connectPlayers&&game.connectPlayers[index]){
                        if(bool){
                            game.connectPlayers[index].classList.add('unselectable2');
                        }
                        else{
                            game.connectPlayers[index].classList.remove('unselectable2');
                        }
                        game.updateWaiting();
                    }
                }
            },
            throwEmotion:function(target,emotion){
                if(lib.node.observing.contains(this)) return;
                var player=lib.playerOL[this.id];
                if(player){
                    player.throwEmotion(target,emotion);
                }
            },
            emotion:function(id,pack,emotion){
                if(lib.node.observing.contains(this)) return;
                var that=this;
                if(!this.id||(!lib.playerOL[this.id]&&(!game.connectPlayers||!function(){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==that.id){
                            return true;
                        }
                    }
                    return false;
                }()))) return;
                var player;
                if(lib.playerOL[id]){
                    player=lib.playerOL[id];
                }
                else if(game.connectPlayers){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==id){
                            player=game.connectPlayers[i];break;
                        }
                    }
                }
                if(player) lib.element.player.emotion.apply(player,[pack,emotion]);
            },
            chat:function(id,str){
                if(lib.node.observing.contains(this)) return;
                var that=this;
                if(!this.id||(!lib.playerOL[this.id]&&(!game.connectPlayers||!function(){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==that.id){
                            return true;
                        }
                    }
                    return false;
                }()))) return;
                var player;
                if(lib.playerOL[id]){
                    player=lib.playerOL[id];
                }
                else if(game.connectPlayers){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==id){
                            player=game.connectPlayers[i];break;
                        }
                    }
                }
                if(player) lib.element.player.chat.call(player,str);
            },
            giveup:function(player){
                if(lib.node.observing.contains(this)||!player||!player._giveUp) return;
                _status.event.next.length=0;
                game.createEvent('giveup',false).set('includeOut',true).setContent(function(){
                    game.log(player,'投降');
                    player.popup('投降');
                    player.die('nosource').includeOut=true;
                }).player=player;
            },
            auto:function(){
                if(lib.node.observing.contains(this)) return;
                var player=lib.playerOL[this.id];
                if(player){
                    player.isAuto=true;
                    player.setNickname(player.nickname+' - 托管');
                    game.broadcast(function(player){
                        player.setNickname(player.nickname+' - 托管');
                    },player);
                }
            },
            unauto:function(){
                if(lib.node.observing.contains(this)) return;
                var player=lib.playerOL[this.id];
                if(player){
                    player.isAuto=false;
                    player.setNickname(player.nickname);
                    game.broadcast(function(player){
                        player.setNickname(player.nickname);
                    },player);
                }
            },
            exec:function(func){
                // if(typeof func=='function'){
                //     var args=Array.from(arguments);
                //     args.shift();
                //     func.apply(this,args);
                // }
            },
            log:function(){
                var items=[];
                try{
                    for(var i=0;i<arguments.length;i++){
                        eval('items.push('+arguments[i]+')');
                    }
                }
                catch(e){
                    this.send('log',['err']);
                    return;
                }
                this.send('log',items);
            }
        },
        client:{
            log:function(arr){
                if(Array.isArray(arr)){
                    for(var i=0;i<arr.length;i++){
                        console.log(arr[i]);
                    }
                }
            },
            opened:function(){
                game.send('init',lib.versionOL,{
                    id:game.onlineID,
                    avatar:lib.config.connect_avatar,
                    nickname:get.connectNickname()
                },lib.config.banned_info);
                if(ui.connecting&&!ui.connecting.splashtimeout){
                    ui.connecting.firstChild.innerHTML='重连成功';
                }
            },
            onconnection:function(id){
                var ws={wsid:id};
                for(var i in lib.element.nodews){
                    ws[i]=lib.element.nodews[i];
                }
                lib.wsOL[id]=ws;
                lib.init.connection(ws);
            },
            onmessage:function(id,message){
                if(lib.wsOL[id]){
                    lib.wsOL[id].onmessage(message);
                }
            },
            onclose:function(id){
                if(lib.wsOL[id]){
                    lib.wsOL[id].onclose();
                }
            },
            selfclose:function(){
                if(game.online||game.onlineroom){
                    if((game.servermode||game.onlinehall)&&_status.over){
                        // later
                    }
                    else{
                        game.saveConfig('tmp_user_roomId');
                    }
                }
                game.ws.close();
            },
            reloadroom:function(forced){
                if(window.isNonameServer&&(forced||!_status.protectingroom)){
                    game.reload();
                }
            },
            createroom:function(index,config,mode){
                game.online=false;
                game.onlineroom=true;
                game.roomId=index;
                lib.node={};
                if(config&&mode&&window.isNonameServer){
                    if(mode=='auto'){
                        mode=lib.configOL.mode;
                    }
                    game.switchMode(mode,config);
                }
                else{
                    game.switchMode(lib.configOL.mode);
                }
                ui.create.connecting(true);
            },
            enterroomfailed:function(){
                alert('请稍后再试');
                _status.enteringroom=false;
                ui.create.connecting(true);
            },
            roomlist:function(list,events,clients,wsid){
                game.send('server','key',[game.onlineKey,lib.version]);
                game.online=true;
                game.onlinehall=true;
                lib.config.recentIP.remove(_status.ip);
                lib.config.recentIP.unshift(_status.ip);
                lib.config.recentIP.splice(5);
                if(!lib.config.reconnect_info||lib.config.reconnect_info[0]!=_status.ip){
                    game.saveConfig('reconnect_info',[_status.ip,null]);
                }
                game.saveConfig('recentIP',lib.config.recentIP);
                _status.connectMode=true;

                game.clearArena();
                game.clearConnect();
                ui.pause.hide();
                ui.auto.hide();

                clearTimeout(_status.createNodeTimeout);
                game.send('server','changeAvatar',get.connectNickname(),lib.config.connect_avatar);

                var proceed=function(){
                    game.ip=get.trimip(_status.ip);
                    ui.create.connectRooms(list);
                    if(events){
                        ui.connectEvents=ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv','约战',ui.window,ui.click.connectEvents);
                        ui.connectEventsCount=ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.hidden','',ui.window);
                        ui.connectClients=ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left','在线',ui.window,ui.click.connectClients);
                        ui.connectClientsCount=ui.create.div('.forceopaque.menubutton.icon.connectevents.highlight.left','1',ui.window);
                        ui.createRoomButton=ui.create.div('.forceopaque.menubutton.large.connectevents.pointerdiv.left2','创建房间',ui.window,function(){
                            if(!_status.creatingroom){
                                _status.creatingroom=true;
                                ui.click.connectMenu();
                            }
                        });
                        if(events.length){
                            ui.connectEventsCount.innerHTML=events.filter(function(evt){
                                return evt.creator==game.onlineKey||!get.is.banWords(evt.content)
                            }).length;
                            ui.connectEventsCount.show();
                        }
                    }
                    game.wsid=wsid;
                    lib.message.client.updaterooms(list,clients);
                    lib.message.client.updateevents(events);
                    ui.exitroom=ui.create.system('退出房间',function(){
                        game.saveConfig('tmp_owner_roomId');
                        game.saveConfig('tmp_user_roomId');
                        if(ui.rooms){
                            game.saveConfig('reconnect_info');
                        }
                        else{
                            if(lib.config.reconnect_info){
                                lib.config.reconnect_info.length=1;
                                game.saveConfig('reconnect_info',lib.config.reconnect_info);
                            }
                        }
                        game.reload();
                    },true);

                    var findRoom=function(id){
                        for(var room of ui.rooms){
                            if(room.key==id) return room;
                        }
                        return false;
                    };
                    if(typeof lib.config.tmp_owner_roomId=='string'){
                        if(typeof game.roomId!='string'&&!findRoom(lib.config.tmp_owner_roomId)){
                            lib.configOL.mode=lib.config.connect_mode;
                            game.roomId=lib.config.tmp_owner_roomId;
                        }
                        game.saveConfig('tmp_owner_roomId');
                    }
                    if(typeof lib.config.tmp_user_roomId=='string'){
                        if(typeof game.roomId!='string'){
                            if(findRoom(lib.config.tmp_user_roomId)){
                                game.roomId=lib.config.tmp_user_roomId;
                            }
                            else{
                                ui.create.connecting();
                                (function(){
                                    var n=10;
                                    var id=lib.config.tmp_user_roomId;
                                    var interval=setInterval(function(){
                                        if(n>0){
                                            n--;
                                            if(findRoom(id)){
                                                clearInterval(interval);
                                                game.send('server','enter',id,get.connectNickname(),lib.config.connect_avatar);
                                            }
                                        }
                                        else{
                                            ui.create.connecting(true);
                                            clearInterval(interval);
                                        }
                                    },500);
                                }());
                            }
                        }
                        game.saveConfig('tmp_user_roomId');
                    }

                    if(window.isNonameServer){
                        var cfg='pagecfg'+window.isNonameServer;
                        if(lib.config[cfg]){
                            lib.configOL=lib.config[cfg][0];
                            game.send('server','server',lib.config[cfg].slice(1));
                            game.saveConfig(cfg);
                            _status.protectingroom=true;
                            setTimeout(function(){
                                _status.protectingroom=false;
                                if(!lib.node||!lib.node.clients||!lib.node.clients.length){
                                    game.reload();
                                }
                            },15000);
                        }
                        else{
                            game.send('server','server');
                        }
                    }
                    else if(typeof game.roomId=='string'){
                        var room=findRoom(game.roomId);
                        if(game.roomIdServer&&room&&(room.serving||!room.version)){
                            console.log();
                            if(lib.config.reconnect_info){
                                lib.config.reconnect_info[2]=null;
                                game.saveConfig('reconnect_info',lib.config.reconnect_info);
                            }
                        }
                        else{
                            ui.create.connecting();
                            game.send('server',(game.roomId==game.onlineKey)?'create':'enter',game.roomId,get.connectNickname(),lib.config.connect_avatar);
                        }
                    }
                    lib.init.onfree();
                }
                if(_status.event.parent){
                    game.forceOver('noover',proceed);
                }
                else{
                    proceed();
                }
            },
            updaterooms:function(list,clients){
                if(ui.rooms){
                    var map={},map2={};
                    for(var i of ui.rooms) map2[i.key]=true;
                    for(var i of list){
                        if(!i) continue;
                        map[i[4]]=i;
                    }
                    ui.window.classList.add('more_room');
                    for(var i=0;i<ui.rooms.length;i++){
                        if(!map[ui.rooms[i].key]){
                            ui.rooms[i].remove();
                            ui.rooms.splice(i--,1);
                        }
                        else ui.rooms[i].initRoom(list[i]);
                    }
                    for(var i of list){
                        if(!i) continue;
                        map[i[4]]=i;
                        if(!map2[i[4]]){
                            var player=ui.roombase.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>');
                            player.roomindex=i;
                            player.initRoom=lib.element.player.initRoom;
                            player.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.connectroom);
                            player.initRoom(i);
                            ui.rooms.push(player);
                        }
                    }
                }
                lib.message.client.updateclients(clients,true);
            },
            updateclients:function(clients,bool){
                if(clients&&ui.connectClients){
                    ui.connectClients.info=clients;
                    ui.connectClientsCount.innerHTML=clients.length;
                }
                if(_status.connectClientsCallback){
                    _status.connectClientsCallback();
                }
            },
            updateevents:function(events){
                if(events&&ui.connectEvents){
                    ui.connectEvents.info=events;
                    var num=events.filter(function(evt){
                        return typeof evt.creator=='string'&&(evt.creator==game.onlineKey||!get.is.banWords(evt.content))
                    }).length;
                    if(num){
                        ui.connectEventsCount.innerHTML=num;
                        ui.connectEventsCount.show();
                    }
                    else{
                        ui.connectEventsCount.hide();
                    }
                    if(_status.connectEventsCallback){
                        _status.connectEventsCallback();
                    }
                }
            },
            eventsdenied:function(reason){
                var str='创建约战失败';
                if(reason=='total'){
                    str+='，约战总数不能超过20';
                }
                else if(reason=='time'){
                    str+='，时间已过';
                }
                else if(reason=='ban'){
                    str+='，请注意文明发言';
                }
                alert(str);
            },
            init:function(id,config,ip,servermode,roomId){
                game.online=true;
                game.onlineID=id;
                game.ip=ip;
                game.servermode=servermode;
                game.roomId=roomId;
                if(game.servermode){
                    game.saveConfig('reconnect_info',[_status.ip,id,game.roomId]);
                }
                else{
                    game.saveConfig('reconnect_info',[_status.ip,id]);
                    game.saveConfig('tmp_user_roomId',roomId);
                }
                lib.config.recentIP.remove(_status.ip);
                lib.config.recentIP.unshift(_status.ip);
                lib.config.recentIP.splice(5);
                game.saveConfig('recentIP',lib.config.recentIP);
                _status.connectMode=true;
                lib.configOL=config;
                lib.playerOL={};
                lib.cardOL={};

                game.clearArena();
                game.finishCards();
                ui.create.roomInfo();
                ui.create.chat();
                if(game.servermode){
                    ui.create.connectPlayers(get.modetrans(config,true));
                }
                else{
                    ui.create.connectPlayers(ip);
                }
                ui.pause.hide();
                ui.auto.hide();
                game.clearConnect();
                clearTimeout(_status.createNodeTimeout);

                var proceed=function(){
                    game.loadModeAsync(config.mode,function(mode){
                        for(var i in mode.ai){
                            if(typeof mode.ai[i]=='object'){
                                if(ai[i]==undefined) ai[i]={};
                                for(var j in mode.ai[i]){
                                    ai[i][j]=mode.ai[i][j];
                                }
                            }
                            else{
                                ai[i]=mode.ai[i];
                            }
                        }
                        for(var i in mode.get){
                            if(typeof mode.get[i]=='object'){
                                if(get[i]==undefined) get[i]={};
                                for(var j in mode.get[i]){
                                    get[i][j]=mode.get[i][j];
                                }
                            }
                            else{
                                get[i]=mode.get[i];
                            }
                        }
                        for(var i in mode.translate){
                            lib.translate[i]=mode.translate[i];
                        }
                        if(mode.game){
                            game.getIdentityList=mode.game.getIdentityList;
                            game.updateState=mode.game.updateState;
                            game.getRoomInfo=mode.game.getRoomInfo;
                        }
                        if(mode.element&&mode.element.player){
                            for(var i in mode.element.player){
                                lib.element.player[i]=mode.element.player[i];
                            }
                        }
                        if(mode.skill){
                            for(var i in mode.skill){
                                lib.skill[i]=mode.skill[i];
                            }
                        }
                        if(mode.card){
                            for(var i in mode.card){
                                lib.card[i]=mode.card[i];
                            }
                        }
                        game.finishCards();
                        if(mode.characterPack){
                            for(var i in mode.characterPack){
                                lib.characterPack[i]=mode.characterPack[i];
                            }
                        }
                        _status.event={
                            finished:true,
                            next:[],
                            after:[]
                        };
                        _status.paused=false;
                        game.createEvent('game',false).setContent(lib.init.startOnline);
                        game.loop();
                        game.send('inited');
                        ui.create.connecting(true);
                    });
                }
                if(_status.event.parent){
                    game.forceOver('noover',proceed);
                }
                else{
                    proceed();
                }
                for(var i in lib.characterPack){
                    for(var j in lib.characterPack[i]){
                        lib.character[j]=lib.character[j]||lib.characterPack[i][j];
                    }
                }
            },
            reinit:function(config,state,state2,ip,observe,onreconnect,cardtag,postReconnect){
                ui.auto.show();
                ui.pause.show();
                game.clearConnect();
                clearTimeout(_status.createNodeTimeout);
                game.online=true;
                game.ip=ip;
                game.servermode=state.servermode;
                game.roomId=state.roomId;
                if(state.over){
                    _status.over=true;
                }
                if(observe){
                    game.observe=true;
                    game.onlineID=null;
                    game.roomId=null;
                }
                if(game.servermode&&!observe){
                    game.saveConfig('reconnect_info',[_status.ip,game.onlineID,game.roomId]);
                }
                else{
                    game.saveConfig('reconnect_info',[_status.ip,game.onlineID]);
                    if(!observe){
                        game.saveConfig('tmp_user_roomId',game.roomId);
                    }
                }
                _status.connectMode=true;
                lib.configOL=config;
                lib.playerOL={};
                lib.cardOL={};

                game.loadModeAsync(config.mode,function(mode){
                    for(var i in mode.ai){
                        if(typeof mode.ai[i]=='object'){
                            if(ai[i]==undefined) ai[i]={};
                            for(var j in mode.ai[i]){
                                ai[i][j]=mode.ai[i][j];
                            }
                        }
                        else{
                            ai[i]=mode.ai[i];
                        }
                    }
                    for(var i in mode.get){
                        if(typeof mode.get[i]=='object'){
                            if(get[i]==undefined) get[i]={};
                            for(var j in mode.get[i]){
                                get[i][j]=mode.get[i][j];
                            }
                        }
                        else{
                            get[i]=mode.get[i];
                        }
                    }
                    for(var i in mode.translate){
                        lib.translate[i]=mode.translate[i];
                    }
                    if(mode.game){
                        game.getIdentityList=mode.game.getIdentityList;
                        game.getIdentityList2=mode.game.getIdentityList2;
                        game.updateState=mode.game.updateState;
                        game.showIdentity=mode.game.showIdentity;
                    }
                    if(mode.element&&mode.element.player){
                        for(var i in mode.element.player){
                            lib.element.player[i]=mode.element.player[i];
                        }
                    }
                    if(mode.skill){
                        for(var i in mode.skill){
                            lib.skill[i]=mode.skill[i];
                        }
                    }
                    if(mode.card){
                        for(var i in mode.card){
                            lib.card[i]=mode.card[i];
                        }
                    }
                    game.finishCards();
                    if(mode.characterPack){
                        for(var i in mode.characterPack){
                            lib.characterPack[i]=mode.characterPack[i];
                        }
                    }
                    if(mode.onreinit){
                        mode.onreinit();
                    }
                    _status.cardtag=get.parsedResult(cardtag);
                    game.players=[];
                    game.dead=[];
                    for(var i in lib.characterPack){
                        for(var j in lib.characterPack[i]){
                            lib.character[j]=lib.character[j]||lib.characterPack[i][j];
                        }
                    }
                    game.clearArena();
                    game.finishCards();
                    if(!observe){
                        ui.create.chat();
                        if(ui.exitroom){
                            ui.exitroom.remove();
                            delete ui.exitroom;
                        }
                    }
                    else{
                        if(!ui.exitroom){
                            ui.create.system('退出旁观',function(){
                                game.saveConfig('reconnect_info');
                                game.reload();
                            },true);
                        }
                        if(!lib.configOL.observe_handcard){
                            ui.arena.classList.add('observe');
                        }
                    }
                    postReconnect=get.parsedResult(postReconnect);
                    for(var i in postReconnect){
                        if(Array.isArray(postReconnect[i])){
                            postReconnect[i].shift().apply(this,postReconnect[i]);
                        }
                    }
                    state=get.parsedResult(state);
                    ui.arena.setNumber(state.number);
                    _status.mode=state.mode;
                    _status.renku=state.renku;
                    lib.inpile=state.inpile;
                    lib.inpile_nature=state.inpile_nature;
                    var pos=state.players[observe||game.onlineID].position;
                    for(var i in state.players){
                        var info=state.players[i];
                        var player=ui.create.player(ui.arena).animate('start');
                        player.dataset.position=(info.position<pos)?info.position-pos+parseInt(state.number):info.position-pos;
                        if(i==observe||i==game.onlineID){
                            game.me=player;
                        }
                        if(player.setModeState){
                            player.setModeState(info);
                        }
                        else{
                            player.init(info.name1,info.name2);
                            if(info.name&&info.name!=info.name1) player.name=info.name;
                        }
                        if(!info.unseen) player.classList.remove('unseen');
                        if(!info.unseen2) player.classList.remove('unseen2');
                        if(!player.isUnseen(2)&&player.storage.nohp){
                            delete player.storage.nohp;
                            player.node.hp.show();
                        }
                        player.playerid=i;
                        player.nickname=info.nickname;
                        player.changeGroup(info.group,false,'nobroadcast');
                        player.identity=info.identity;
                        player.identityShown=info.identityShown;
                        player.hp=info.hp;
                        player.maxHp=info.maxHp;
                        player.hujia=info.hujia;
                        player.sex=info.sex;
                        player.side=info.side;
                        player.phaseNumber=info.phaseNumber;
                        player.seatNum=info.seatNum;
                        player.disabledSlots=info.disabledSlots;
                        player.expandedSlots=info.expandedSlots;
                        player.setNickname();
                        if(info.dead){
                            player.classList.add('dead');
                            if(lib.config.die_move){
                                player.$dieflip();
                            }
                            if(lib.element.player.$dieAfter){
                                lib.element.player.$dieAfter.call(player);
                            }
                            game.dead.push(player);
                        }
                        else{
                            game.players.push(player);
                        }
                        if(info.linked){
                            player.addLink();
                        }
                        if(info.turnedover){
                            player.classList.add('turnedover');
                        }
                        if(info.out){
                            player.classList.add('out');
                        }
                        if(info.disableJudge){
                            player.$disableJudge();
                        }
                        player.$syncDisable();

                        player.directgain(info.handcards);
                        lib.playerOL[i]=player;
                        for(var i=0;i<info.equips.length;i++){
                            player.$equip(info.equips[i]);
                        }
                        for(var i=0;i<info.handcards.length;i++){
                            info.handcards[i].addGaintag(info.gaintag[i]);
                        }
                        for(var i=0;i<info.specials.length;i++){
                            info.specials[i].classList.add('glows');
                        }
                        if(info.expansions.length){
                            var expansion_gaintag=[];
                            player.$addToExpansion(info.expansions);
                            for(var i=0;i<info.expansions.length;i++){
                                info.expansions[i].addGaintag(info.expansion_gaintag[i]);
                                expansion_gaintag.addArray(info.expansion_gaintag[i]);
                            }
                            for(var i of expansion_gaintag) player.markSkill[i];
                        }
                        for(var i=0;i<info.judges.length;i++){
                            if(info.views[i]&&info.views[i]!=info.judges[i]){
                                info.judges[i].classList.add('fakejudge');
                                info.judges[i].viewAs=info.views[i];
                                info.judges[i].node.background.innerHTML=lib.translate[info.views[i]+'_bg']||get.translation(info.views[i])[0]
                            }
                            player.node.judges.appendChild(info.judges[i]);
                        }
                        ui.updatej(player);
                        if(!player.setModeState){
                            if(!game.getIdentityList&&info.identityNode){
                                player.node.identity.innerHTML=info.identityNode[0];
                                player.node.identity.dataset.color=info.identityNode[1];
                            }
                            else if(player==game.me||player.identityShown||observe){
                                player.setIdentity();
                                player.forceShown=true;
                            }
                            else{
                                player.setIdentity('cai');
                            }
                            if(!lib.configOL.observe_handcard&&(lib.configOL.mode=='identity'||lib.configOL.mode=='guozhan')){
                                if(observe&&!player.identityShown){
                                    player.setIdentity('cai');
                                    player.forceShown=false;
                                }
                            }
                        }
                        player.update();
                    }
                    game.arrangePlayers();
                    ui.create.me(true);

                    _status.event={
                        finished:true,
                        next:[],
                        after:[]
                    };
                    _status.paused=false;
                    _status.dying=get.parsedResult(state.dying)||[];

                    if(game.updateState){
                        game.updateState(state2);
                    }
                    var next=game.createEvent('game',false);
                    next.setContent(lib.init.startOnline);
                    if(observe){
                        next.custom.replace.target=function(player){
                            if(!lib.configOL.observe_handcard&&lib.configOL.mode=='guozhan'){
                                return;
                            }
                            if(player.isAlive()){
                                if(!game.me.identityShown&&lib.configOL.mode=='guozhan'){
                                    game.me.node.identity.firstChild.innerHTML='猜';
                                    game.me.node.identity.dataset.color='unknown';
                                }
                                game.swapPlayer(player);
                                if(!game.me.identityShown&&lib.configOL.mode=='guozhan'){
                                    game.me.node.identity.firstChild.innerHTML='';
                                }
                            }
                        }
                    }
                    else{
                        if(Array.isArray(onreconnect)){
                            onreconnect.shift().apply(this,onreconnect);
                        }
                    }
                    game.loop();
                    game.send('reinited');
                    game.showHistory();
                    _status.gameStarted=true;
                    if(lib.config.show_cardpile){
                        ui.cardPileButton.style.display='';
                    }
                    if(!observe&&game.me&&(game.me.isDead()||_status.over)){
                        ui.create.exit();
                    }
                    ui.updatehl();
                    ui.create.connecting(true);
                });
            },
            exec:function(func){
                var key=game.onlineKey;
                if(typeof func=='function'){
                    var args=Array.from(arguments);
                    args.shift();
                    func.apply(this,args);
                }
                if(key){
                    game.onlineKey=key;
                    localStorage.setItem(lib.configprefix+'key',game.onlineKey);
                }
            },
            denied:function(reason){
                switch(reason){
                    case 'version':
                        alert('加入失败：版本不匹配，请将游戏更新至最新版');
                        game.saveConfig('tmp_owner_roomId');
                        game.saveConfig('tmp_user_roomId');
                        game.saveConfig('reconnect_info');
                        break;
                    case 'gaming':alert('加入失败：游戏已开始');break;
                    case 'number':alert('加入失败：房间已满');break;
                    case 'banned':alert('加入失败：房间拒绝你加入');break;
                    case 'key':
                        alert('您的游戏版本过低，请升级到最新版');
                        game.saveConfig('tmp_owner_roomId');
                        game.saveConfig('tmp_user_roomId');
                        game.saveConfig('reconnect_info');
                        break;
                    case 'offline':
                    if(_status.paused&&_status.event.name=='game'){
                        setTimeout(game.resume,500);
                    }
                    break;
                }
                game.ws.close();
                if(_status.connectDenied){
                    _status.connectDenied();
                }
            },
            cancel:function(id){
                if(_status.event._parent_id==id){
                    ui.click.cancel();
                }
                if(_status.event.id==id){
                    if(_status.event._backup) ui.click.cancel();
                    ui.click.cancel();
                    if(ui.confirm){
                        ui.confirm.close();
                    }
                    if(_status.event.result){
                        _status.event.result.id=id;
                    }
                }
            },
            closeDialog:function(id){
                var dialog=get.idDialog(id);
                if(dialog){
                    dialog.close();
                }
            },
            createDialog:function(id){
                var args=Array.from(arguments);
                args.shift();
                ui.create.dialog.apply(this,args).videoId=id;
            },
            gameStart:function(){
                for(var i=0;i<game.connectPlayers.length;i++){
                    game.connectPlayers[i].delete();
                }
                delete game.connectPlayers;
                if(ui.connectStartButton){
                    ui.connectStartButton.delete();
                    delete ui.connectStartButton;
                }
                if(ui.connectStartBar){
                    ui.connectStartBar.delete();
                    delete ui.connectStartBar;
                }
                if(ui.roomInfo){
                    ui.roomInfo.remove();
                    delete ui.roomInfo;
                }
                if(ui.exitroom){
                    ui.exitroom.remove();
                    delete ui.exitroom;
                }
                ui.auto.show();
                ui.pause.show();
                if(lib.config.show_cardpile){
                    ui.cardPileButton.style.display='';
                }
                _status.gameStarted=true;
                game.showHistory();
            },
            updateWaiting:function(map){
                if(!game.connectPlayers) return;
                if(!lib.translate.zhu){
                    lib.translate.zhu='主';
                }
                game.onlinezhu=false;
                _status.waitingForPlayer=true;
                for(var i=0;i<map.length;i++){
                    if(map[i]=='disabled'){
                        game.connectPlayers[i].classList.add('unselectable2');
                    }
                    else{
                        game.connectPlayers[i].classList.remove('unselectable2');
                        if(map[i]){
                            game.connectPlayers[i].initOL(map[i][0],map[i][1]);
                            game.connectPlayers[i].playerid=map[i][2];
                            if(map[i][3]=='zhu'){
                                game.connectPlayers[i].setIdentity('zhu');
                                if(map[i][2]==game.onlineID){
                                    game.onlinezhu=true;
                                    if(ui.roomInfo){
                                        ui.roomInfo.innerHTML='房间设置';
                                    }
                                    if(ui.connectStartButton){
                                        ui.connectStartButton.innerHTML='开始游戏';
                                    }
                                }
                            }
                            else{
                                game.connectPlayers[i].node.identity.firstChild.innerHTML='';
                            }
                        }
                        else{
                            game.connectPlayers[i].uninitOL();
                            delete game.connectPlayers[i].playerid;
                        }
                    }
                }
            }
        }
    };

    const skill = {
        expandedSlots: {
            markimage: 'image/card/expandedSlots.png',
            intro: {
                markcount: function (storage, player) {
                    var all = 0, storage = player.expandedSlots;
                    if (!storage) return 0;
                    for (var key in storage) {
                        var num = storage[key];
                        if (typeof num == 'number' && num > 0) {
                            all += num;
                        }
                    }
                    return all;
                },
                content: function (storage, player) {
                    storage = player.expandedSlots;
                    if (!storage) return '当前没有扩展装备栏';
                    const keys = Object.keys(storage).sort(), combined = get.is.mountCombined();
                    let str = '';
                    for (const key of keys) {
                        const num = storage[key];
                        if (typeof num == 'number' && num > 0) {
                            let trans = get.translation(key);
                            if (combined && key == 'equip3') trans = '坐骑栏';
                            str += '<li>' + trans + '栏：' + num + '个<br>'
                        }
                    }
                    if (str.length) return str.slice(0, str.length - 4);
                    return '当前没有扩展装备栏';
                },
            },
        },
        charge: {
            markimage: 'image/card/charge.png',
            intro: {
                content: '当前蓄力点数：#',
            },
        },
        cooperation: {
            charlotte: true,
            trigger: {
                global: ['phaseAfter', 'dieAfter'],
            },
            forced: true,
            lastDo: true,
            filter: function (event, player) {
                if (event.name == 'die' && event.player.isAlive()) return false;
                var storage = player.getStorage('cooperation');
                for (var info of storage) {
                    if (info.target == event.player) return true;
                }
                return false;
            },
            content: function () {
                for (var i = 0; i < player.storage.cooperation.length; i++) {
                    var info = player.storage.cooperation[i];
                    if (info.target == trigger.player) {
                        player.removeCooperation(info);
                        i--;
                    }
                }
            },
            onremove: function (player, skill) {
                var storage = player.getStorage(skill);
                var reasons = [];
                for (var i of storage) reasons.add(i.type);
                for (var i of reasons) player.removeSkill(skill + '_' + i);
                delete player.storage[i];
            },
            subSkill: {
                damage: {
                    mark: true,
                    trigger: { global: 'damage' },
                    forced: true,
                    charlotte: true,
                    popup: false,
                    firstDo: true,
                    filter: function (event, player) {
                        if (!event.source) return false;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'damage' && (event.source == player || event.source == info.target)) return true;
                        }
                        return false;
                    },
                    checkx: (info) => (info.damage && info.damage > 3),
                    content: function () {
                        var source = trigger.source;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'damage' && (source == player || source == info.target)) {
                                if (!info.damage) info.damage = 0;
                                info.damage += trigger.num;
                            }
                        }
                        player.markSkill('cooperation_damage');
                    },
                    marktext: '仇',
                    intro: {
                        name: '协力 - 同仇',
                        markcount: function (storage, player) {
                            return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
                                return info.damage || 0;
                            }));
                        },
                        content: function (storage, player) {
                            var str = '', storage = player.getStorage('cooperation');
                            for (var info of storage) {
                                if (info.type == 'damage') {
                                    str += '<br><li>协力角色：' + get.translation(info.target);
                                    str += '<br><li>协力原因：' + get.translation(info.reason);
                                    str += '<br><li>协力进度：'
                                    var num = (info.damage || 0);
                                    str += num;
                                    str += '/4';
                                    str += (num > 3 ? ' (已完成)' : ' (未完成)');
                                    str += '<br>　　';
                                }
                            }
                            return str.slice(4, str.length - 6);
                        },
                    },
                },
                draw: {
                    mark: true,
                    trigger: { global: 'gainAfter' },
                    forced: true,
                    charlotte: true,
                    popup: false,
                    firstDo: true,
                    filter: function (event, player) {
                        if (event.getParent().name != 'draw') return false;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'draw' && (event.player == player || event.player == info.target)) return true;
                        }
                        return false;
                    },
                    checkx: (info) => (info.draw && info.draw > 7),
                    content: function () {
                        var source = trigger.player;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'draw' && (source == player || source == info.target)) {
                                if (!info.draw) info.draw = 0;
                                info.draw += trigger.cards.length;
                            }
                        }
                        player.markSkill('cooperation_draw');
                    },
                    marktext: '进',
                    intro: {
                        name: '协力 - 并进',
                        markcount: function (storage, player) {
                            return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
                                return info.draw || 0;
                            }));
                        },
                        content: function (storage, player) {
                            var str = '', storage = player.getStorage('cooperation');
                            for (var info of storage) {
                                if (info.type == 'draw') {
                                    str += '<br><li>协力角色：' + get.translation(info.target);
                                    str += '<br><li>协力原因：' + get.translation(info.reason);
                                    str += '<br><li>协力进度：'
                                    var num = (info.draw || 0);
                                    str += num;
                                    str += '/8';
                                    str += (num > 7 ? ' (已完成)' : ' (未完成)');
                                    str += '<br>　　';
                                }
                            }
                            return str.slice(4, str.length - 6);
                        },
                    },
                },
                discard: {
                    mark: true,
                    trigger: { global: 'loseAfter' },
                    forced: true,
                    charlotte: true,
                    popup: false,
                    firstDo: true,
                    filter: function (event, player) {
                        if (event.type != 'discard') return false;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'discard' && (event.player == player || event.player == info.target)) return true;
                        }
                        return false;
                    },
                    checkx: (info) => (info.discard && info.discard.length > 3),
                    content: function () {
                        var source = trigger.player;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'discard' && (source == player || source == info.target)) {
                                if (!info.discard) info.discard = [];
                                for (var i of trigger.cards2) {
                                    var suit = get.suit(i, player);
                                    if (lib.suit.contains(suit)) info.discard.add(suit);
                                }
                            }
                        }
                        player.markSkill('cooperation_discard');
                    },
                    marktext: '财',
                    intro: {
                        name: '协力 - 疏财',
                        markcount: function (storage, player) {
                            return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
                                return info.discard ? info.discard.length : 0;
                            }));
                        },
                        content: function (storage, player) {
                            var str = '', storage = player.getStorage('cooperation');
                            for (var info of storage) {
                                if (info.type == 'discard') {
                                    str += '<br><li>协力角色：' + get.translation(info.target);
                                    str += '<br><li>协力原因：' + get.translation(info.reason);
                                    str += '<br><li>进度：';
                                    var suits = info.discard || [];
                                    var suits2 = [['spade', '♠', '♤'], ['heart', '♥', '♡'], ['club', '♣', '♧'], ['diamond', '♦', '♢']];
                                    for (var i of suits2) {
                                        str += (suits.contains(i[0]) ? i[1] : i[2]);
                                    }
                                    str += (suits.length > 3 ? ' (已完成)' : ' (未完成)');
                                    str += '<br>　　';
                                }
                            }
                            return str.slice(4, str.length - 6);
                        },
                    },
                },
                use: {
                    mark: true,
                    trigger: { global: 'useCard1' },
                    forced: true,
                    charlotte: true,
                    popup: false,
                    firstDo: true,
                    filter: function (event, player) {
                        var suit = get.suit(event.card);
                        if (!lib.suit.contains(suit)) return false;
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'use'
                                && (event.player == player || event.player == info.target) &&
                                (!info.used || !info.used.contains(suit))) return true;
                        }
                        return false;
                    },
                    checkx: (info) => (info.used && info.used.length > 3),
                    content: function () {
                        var source = trigger.player, suit = get.suit(trigger.card);
                        var storage = player.getStorage('cooperation');
                        for (var info of storage) {
                            if (info.type == 'use' && (source == player || source == info.target)) {
                                if (!info.used) info.used = [];
                                info.used.add(suit);
                            }
                        }
                        player.markSkill('cooperation_use');
                    },
                    marktext: '戮',
                    intro: {
                        name: '协力 - 戮力',
                        markcount: function (storage, player) {
                            return Math.max.apply(Math, player.getStorage('cooperation').map(function (info) {
                                return info.used ? info.used.length : 0;
                            }));
                        },
                        content: function (storage, player) {
                            var str = '', storage = player.getStorage('cooperation');
                            for (var info of storage) {
                                if (info.type == 'use') {
                                    str += '<br><li>协力角色：' + get.translation(info.target);
                                    str += '<br><li>协力原因：' + get.translation(info.reason);
                                    str += '<br><li>进度：';
                                    var suits = info.used || [];
                                    var suits2 = [['spade', '♠', '♤'], ['heart', '♥', '♡'], ['club', '♣', '♧'], ['diamond', '♦', '♢']];
                                    for (var i of suits2) {
                                        str += (suits.contains(i[0]) ? i[1] : i[2]);
                                    }
                                    str += (suits.length > 3 ? ' (已完成)' : ' (未完成)');
                                    str += '<br>　　';
                                }
                            }
                            return str.slice(4, str.length - 6);
                        },
                    },
                },
            },
        },
        zhengsu: {
            trigger: { player: 'phaseDiscardEnd' },
            forced: true,
            charlotte: true,
            filter: function (event, player) {
                return (player.storage.zhengsu_leijin || player.storage.zhengsu_bianzhen || player.storage.zhengsu_mingzhi);
            },
            content: function () {
                player.chooseDrawRecover(2, '整肃奖励：摸两张牌或回复1点体力');
            },
            subSkill: {
                leijin: {
                    mod: {
                        aiOrder: function (player, card, num) {
                            if (typeof card.number != 'number') return;
                            var history = player.getHistory('useCard', evt => evt.isPhaseUsing());
                            if (history.length == 0) return num + 10 * (14 - card.number);
                            var num = get.number(history[0].card);
                            if (!num) return;
                            for (var i = 1; i < history.length; i++) {
                                var num2 = get.number(history[i].card);
                                if (!num2 || num2 <= num) return;
                                num = num2;
                            }
                            if (card.number > num) return num + 10 * (14 - card.number);
                        },
                    },
                    mark: true,
                    trigger: { player: 'useCard1' },
                    lastDo: true,
                    charlotte: true,
                    forced: true,
                    popup: false,
                    onremove: true,
                    filter: function (event, player) {
                        return player.isPhaseUsing() && player.storage.zhengsu_leijin !== false;
                    },
                    content: function () {
                        var list = player.getHistory('useCard', function (evt) {
                            return evt.isPhaseUsing(player);
                        });
                        var goon = true;
                        for (var i = 0; i < list.length; i++) {
                            var num = get.number(list[i].card);
                            if (typeof num != 'number') {
                                goon = false;
                                break;
                            }
                            if (i > 0) {
                                var num2 = get.number(list[i - 1].card);
                                if (typeof num2 != 'number' || num2 >= num) {
                                    goon = false;
                                    break;
                                }
                            }
                        }
                        if (!goon) {
                            game.broadcastAll(function (player) {
                                player.storage.zhengsu_leijin = false;
                                if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = '╳';
                                delete player.storage.zhengsu_leijin_markcount;
                            }, player);
                        }
                        else {
                            if (list.length > 2) {
                                game.broadcastAll(function (player, num) {
                                    if (player.marks.zhengsu_leijin) player.marks.zhengsu_leijin.firstChild.innerHTML = '○';
                                    player.storage.zhengsu_leijin = true;
                                    player.storage.zhengsu_leijin_markcount = num;
                                }, player, num);
                            }
                            else game.broadcastAll(function (player, num) {
                                player.storage.zhengsu_leijin_markcount = num;
                            }, player, num);
                        }
                        player.markSkill('zhengsu_leijin');
                    },
                    intro: {
                        content: '<li>条件：回合内所有于出牌阶段使用的牌点数递增且不少于三张。',
                    },
                },
                bianzhen: {
                    mark: true,
                    trigger: { player: 'useCard1' },
                    firstDo: true,
                    charlotte: true,
                    forced: true,
                    popup: false,
                    onremove: true,
                    filter: function (event, player) {
                        return player.isPhaseUsing() && player.storage.zhengsu_bianzhen !== false;
                    },
                    content: function () {
                        var list = player.getHistory('useCard', function (evt) {
                            return evt.isPhaseUsing();
                        });
                        var goon = true, suit = get.suit(list[0].card, false);
                        if (suit == 'none') {
                            goon = false;
                        }
                        else {
                            for (var i = 1; i < list.length; i++) {
                                if (get.suit(list[i]) != suit) {
                                    goon = false;
                                    break;
                                }
                            }
                        }
                        if (!goon) {
                            game.broadcastAll(function (player) {
                                player.storage.zhengsu_bianzhen = false;
                                if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = '╳';
                            }, player);
                        }
                        else {
                            if (list.length > 1) {
                                game.broadcastAll(function (player) {
                                    if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = '○';
                                    player.storage.zhengsu_bianzhen = true;
                                }, player);
                            }
                            else game.broadcastAll(function (player, suit) {
                                if (player.marks.zhengsu_bianzhen) player.marks.zhengsu_bianzhen.firstChild.innerHTML = get.translation(suit);
                            }, player, suit);
                        }
                        player.markSkill('zhengsu_bianzhen');
                    },
                    intro: {
                        content: '<li>条件：回合内所有于出牌阶段使用的牌花色相同且不少于两张。',
                    },
                    ai: {
                        effect: {
                            player_use: function (card, player, target) {
                                if (typeof card != 'object' || !player.isPhaseUsing()) return;
                                var suitx = get.suit(card);
                                var history = player.getHistory('useCard');
                                if (!history.length) {
                                    var val = 0;
                                    if (player.hasCard(function (cardx) {
                                        return get.suit(cardx) == suitx && card != cardx && (!card.cards || !card.cards.contains(cardx)) && player.hasValueTarget(cardx);
                                    }, 'hs')) val = [2, 0.1];
                                    if (val) return val;
                                    return;
                                }
                                var num = 0;
                                var suit = false;
                                for (var i = 0; i < history.length; i++) {
                                    var suit2 = get.suit(history[i].card);
                                    if (!lib.suit.contains(suit2)) return;
                                    if (suit && suit != suit2) return;
                                    suit = suit2;
                                    num++;
                                }
                                if (suitx == suit && num == 1) return [1, 0.1];
                                if (suitx != suit && (num > 1 || num <= 1 && player.hasCard(function (cardx) {
                                    return get.suit(cardx) == suit && player.hasValueTarget(cardx);
                                }, 'hs'))) return 'zeroplayertarget';
                            },
                        },
                    },
                },
                mingzhi: {
                    mark: true,
                    trigger: { player: 'loseAfter' },
                    firstDo: true,
                    charlotte: true,
                    forced: true,
                    popup: false,
                    onremove: true,
                    filter: function (event, player) {
                        if (player.storage.zhengsu_mingzhi === false || event.type != 'discard') return false;
                        var evt = event.getParent('phaseDiscard');
                        return evt && evt.player == player;
                    },
                    content: function () {
                        var goon = true, list = [];
                        player.getHistory('lose', function (event) {
                            if (!goon || event.type != 'discard') return false;
                            var evt = event.getParent('phaseDiscard');
                            if (evt && evt.player == player) {
                                for (var i of event.cards2) {
                                    var suit = get.suit(i, player);
                                    if (list.contains(suit)) {
                                        goon = false;
                                        break;
                                    }
                                    else list.push(suit);
                                }
                            }
                        });
                        if (!goon) {
                            game.broadcastAll(function (player) {
                                player.storage.zhengsu_mingzhi = false;
                                if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = '╳';
                                delete player.storage.zhengsu_mingzhi_list;
                            }, player);
                        }
                        else {
                            if (list.length > 1) {
                                game.broadcastAll(function (player, list) {
                                    if (player.marks.zhengsu_mingzhi) player.marks.zhengsu_mingzhi.firstChild.innerHTML = '○';
                                    player.storage.zhengsu_mingzhi = true;
                                    player.storage.zhengsu_mingzhi_list = list;
                                    player.storage.zhengsu_mingzhi_markcount = list.length;
                                }, player, list);
                            }
                            else game.broadcastAll(function (player, list) {
                                player.storage.zhengsu_mingzhi_list = list;
                                player.storage.zhengsu_mingzhi_markcount = list.length;
                            }, player, list);
                        }
                        player.markSkill('zhengsu_mingzhi');
                    },
                    intro: {
                        content: '<li>条件：回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。',
                    },
                },
            },
        },
        renku: {
            intro: {
                markcount: function () {
                    return _status.renku.length;
                },
                mark: function (dialog, content, player) {
                    if (!_status.renku.length) return '仁库中没有牌';
                    else dialog.addAuto(_status.renku);
                },
                content: function () {
                    if (!_status.renku.length) return '仁库中没有牌';
                    return get.translation(_status.renku);
                },
            },
        },
        _showHiddenCharacter: {
            trigger: { player: ['changeHp', 'phaseBeginStart', 'loseMaxHpBegin', 'gainMaxHpBegin'] },
            firstDo: true,
            forced: true,
            popup: false,
            priority: 25,
            filter: function (event, player, name) {
                return player.isUnseen(2) && get.mode() != 'guozhan';
            },
            content: function () {
                player.showCharacter(2);
                player.removeSkill('g_hidden_ai');
            },
        },
        _kamisha: {
            trigger: { source: 'damageBegin2' },
            //forced:true,
            popup: false,
            prompt: function (event, player) {
                return '是否防止即将对' + get.translation(event.player) + '造成的伤害，改为令其减少' + get.cnNumber(event.num) + '点体力上限？';
            },
            filter: function (event, player) {
                return event.hasNature('kami') && event.num > 0;
            },
            ruleSkill: true,
            check: function (event, player) {
                var att = get.attitude(player, event.player);
                if (event.player.hp == event.player.maxHp) return att < 0;
                if (event.player.hp == event.player.maxHp - 1 &&
                    (event.player.maxHp <= 3 || event.player.hasSkillTag('maixie'))) return att < 0;
                return att > 0;
            },
            content: function () {
                trigger.cancel();
                trigger.player.loseMaxHp(trigger.num).source = player;
            },
        },
        aozhan: {
            charlotte: true,
            mod: {
                targetEnabled: function (card) {
                    if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
                },
                cardSavable: function (card) {
                    if (card.name == 'tao' && (card.isCard && card.cardid || get.itemtype(card) == 'card')) return false;
                },
            },
            group: ["aozhan_sha", "aozhan_shan"],
            subSkill: {
                sha: {
                    enable: ["chooseToUse", "chooseToRespond"],
                    filterCard: {
                        name: "tao",
                    },
                    viewAs: {
                        name: "sha",
                        isCard: true,
                    },
                    viewAsFilter: function (player) {
                        if (!player.countCards('hs', 'tao')) return false;
                    },
                    position: 'hs',
                    prompt: "将一张桃当杀使用或打出",
                    check: function () { return 1 },
                    ai: {
                        respondSha: true,
                        skillTagFilter: function (player) {
                            if (!player.countCards('hs', 'tao')) return false;
                        },
                        order: function () {
                            return get.order({ name: 'sha' }) - 0.1;
                        },
                    },
                    sub: true,
                },
                shan: {
                    enable: ["chooseToRespond", "chooseToUse"],
                    filterCard: {
                        name: "tao",
                    },
                    viewAs: {
                        name: "shan",
                        isCard: true,
                    },
                    prompt: "将一张桃当闪打出",
                    check: function () { return 1 },
                    viewAsFilter: function (player) {
                        if (!player.countCards('hs', 'tao')) return false;
                    },
                    position: 'hs',
                    ai: {
                        respondShan: true,
                        skillTagFilter: function (player) {
                            if (!player.countCards('hs', 'tao')) return false;
                        },
                    },
                    sub: true,
                },
            },
        },
        global: [],
        globalmap: {},
        storage: {},
        undist: {},
        others: {},
        zhu: {},
        zhuSkill: {},
        land_used: {},
        unequip: { ai: { unequip: true } },
        subplayer: {
            trigger: { player: 'dieBefore' },
            forced: true,
            priority: -9,
            onremove: true,
            mark: 'character',
            intro: {
                content: function (storage, player) {
                    if (typeof storage.intro2 == 'string') return storage.intro2;
                    if (typeof storage.intro2 == 'function') return storage.intro2(storage, player);
                    return '死亡前切换回主武将'
                },
                name: function (storage) {
                    return get.rawName(storage.name);
                }
            },
            content: function () {
                trigger.cancel();
                var evt = trigger.getParent('damage');
                if (evt.player == player) {
                    evt.untrigger(false, player);
                }
                player.exitSubPlayer(true);
            },
            ai: {
                nosave: true
            }
        },
        autoswap: {
            firstDo: true,
            trigger: {
                player: ['playercontrol', 'chooseToUseBegin', 'chooseToRespondBegin', 'chooseToDiscardBegin', 'chooseToCompareBegin',
                    'chooseButtonBegin', 'chooseCardBegin', 'chooseTargetBegin', 'chooseCardTargetBegin', 'chooseControlBegin',
                    'chooseBoolBegin', 'choosePlayerCardBegin', 'discardPlayerCardBegin', 'gainPlayerCardBegin', 'chooseToMoveBegin', 'chooseToPlayBeatmapBegin']
            },
            forced: true,
            priority: 100,
            forceDie: true,
            popup: false,
            filter: function (event, player) {
                if (event.autochoose && event.autochoose()) return false;
                if (lib.filter.wuxieSwap(event)) return false;
                if (_status.auto || !player.isUnderControl()) return false;
                return true;
            },
            content: function () {
                game.swapPlayerAuto(player);
            },
        },
        dualside: {
            charlotte: true,
            subSkill: {
                turn: {
                    trigger: { player: ['turnOverAfter', 'dieBefore'] },
                    silent: true,
                    filter: function (event, player) {
                        if (player.storage.dualside_over) return false;
                        return Array.isArray(player.storage.dualside);
                    },
                    content: function () {
                        var cfg = player.storage.dualside;
                        var bool = player.isTurnedOver();
                        if (trigger.name == 'die') {
                            bool = !bool;
                        }
                        if (bool) {
                            cfg[1] = player.hp;
                            cfg[2] = player.maxHp;
                            player.reinit(cfg[0], cfg[3], [cfg[4], cfg[5]]);
                            player.unmarkSkill('dualside');
                            player.markSkillCharacter('dualside', { name: cfg[0] }, '正面', '当前体力：' + cfg[1] + '/' + cfg[2]);
                        }
                        else {
                            cfg[4] = player.hp;
                            cfg[5] = player.maxHp;
                            player.reinit(cfg[3], cfg[0], [cfg[1], cfg[2]]);
                            player.unmarkSkill('dualside');
                            player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
                        }

                        if (trigger.name == 'die') {
                            trigger.cancel();
                            delete player.storage.dualside;
                            player.storage.dualside_over = true;
                            player.unmarkSkill('dualside');
                        }
                    }
                },
                init: {
                    trigger: { global: 'gameStart', player: 'enterGame' },
                    silent: true,
                    content: function () {
                        var list = [player.name, player.name1, player.name2];
                        for (var i = 0; i < list.length; i++) {
                            if (list[i] && lib.character[list[i]]) {
                                var info = lib.character[list[i]];
                                if (info[3].contains('dualside') && info[4]) {
                                    player.storage.dualside = [list[i], player.hp, player.maxHp];
                                    for (var j = 0; j < info[4].length; j++) {
                                        if (info[4][j].startsWith('dualside:')) {
                                            var name2 = info[4][j].slice(9);
                                            var info2 = lib.character[name2];
                                            player.storage.dualside.push(name2);
                                            player.storage.dualside.push(get.infoHp(info2[2]));
                                            player.storage.dualside.push(get.infoMaxHp(info2[2]));
                                        }
                                    }
                                }
                            }
                        }
                        var cfg = player.storage.dualside;
                        if (get.mode() == 'guozhan') {
                            if (player.name1 == cfg[0]) {
                                player.showCharacter(0);
                            }
                            else {
                                player.showCharacter(1);
                            }
                        }
                        player.markSkillCharacter('dualside', { name: cfg[3] }, '背面', '当前体力：' + cfg[4] + '/' + cfg[5]);
                    }
                }
            },
            group: ['dualside_init', 'dualside_turn']
        },
        fengyin: {
            init: function (player, skill) {
                player.addSkillBlocker(skill);
            },
            onremove: function (player, skill) {
                player.removeSkillBlocker(skill);
            },
            charlotte: true,
            skillBlocker: function (skill, player) {
                return !lib.skill[skill].charlotte && !get.is.locked(skill, player);
            },
            mark: true,
            intro: {
                content: function (storage, player, skill) {
                    var list = player.getSkills(null, false, false).filter(function (i) {
                        return lib.skill.fengyin.skillBlocker(i, player);
                    });
                    if (list.length) return '失效技能：' + get.translation(list);
                    return '无失效技能';
                }
            }
        },
        baiban: {
            init: function (player, skill) {
                player.addSkillBlocker(skill);
            },
            onremove: function (player, skill) {
                player.removeSkillBlocker(skill);
            },
            charlotte: true,
            skillBlocker: function (skill, player) {
                return !lib.skill[skill].charlotte;
            },
            mark: true,
            intro: {
                content: function (storage, player, skill) {
                    var list = player.getSkills(null, false, false).filter(function (i) {
                        return lib.skill.baiban.skillBlocker(i, player);
                    });
                    if (list.length) return '失效技能：' + get.translation(list);
                    return '无失效技能';
                }
            }
        },
        qianxing: {
            mark: true,
            nopop: true,
            init: function (player) {
                game.log(player, '获得了', '【潜行】');
            },
            intro: {
                content: '锁定技，你不能成为其他角色的卡牌的目标'
            },
            mod: {
                targetEnabled: function (card, player, target) {
                    if (player != target) return false;
                }
            }
        },
        mianyi: {
            trigger: { player: 'damageBefore' },
            mark: true,
            forced: true,
            init: function (player) {
                game.log(player, '获得了', '【免疫】');
            },
            content: function () {
                trigger.cancel();
            },
            ai: {
                nofire: true,
                nothunder: true,
                nodamage: true,
                effect: {
                    target: function (card, player, target, current) {
                        if (get.tag(card, 'damage')) return [0, 0];
                    }
                },
            },
            intro: {
                content: '防止一切伤害'
            }
        },
        mad: {
            mark: true,
            locked: true,
            intro: {
                content: '已进入混乱状态',
                name: '混乱',
                onunmark: function (storage, player) {
                    game.log(player, '解除混乱状态');
                }
            }
        },
        ghujia: {
            intro: {
                content: function (content, player) {
                    return '已有' + get.cnNumber(player.hujia) + '点护甲值';
                }
            },
            markimage: 'image/card/shield.png',
        },
        counttrigger: {
            trigger: { global: 'phaseAfter' },
            silent: true,
            charlotte: true,
            priority: -100,
            lastDo: true,
            content: function () {
                player.removeSkill('counttrigger');
                delete player.storage.counttrigger;
            },
            group: 'counttrigger_2',
            subSkill: {
                2: {
                    trigger: { global: ['phaseBeforeStart', 'roundStart'] },
                    silent: true,
                    charlotte: true,
                    firstDo: true,
                    priority: 100,
                    content: function () {
                        player.removeSkill('counttrigger');
                        delete player.storage.counttrigger;
                    },
                }
            }
        },
        _recovercheck: {
            trigger: { player: 'recoverBefore' },
            forced: true,
            priority: 100,
            firstDo: true,
            popup: false,
            filter: function (event, player) {
                return player.hp >= player.maxHp;
            },
            content: function () {
                trigger.cancel();
            },
        },
        /**
         * @deprecated
         */
        /*_turnover:{
            trigger:{player:'phaseBefore'},
            forced:true,
            forceOut:true,
            priority:100,
            popup:false,
            firstDo:true,
            content:function(){
                if(player.isTurnedOver()&&!trigger._noTurnOver){
                    trigger.cancel();
                    player.turnOver();
                    player.phaseSkipped=true;
                }
                else{
                    player.phaseSkipped=false;
                }
                var isRound=false;
                if(!trigger.skill){
                    isRound=_status.roundSkipped;
                    if(_status.isRoundFilter){
                        isRound=_status.isRoundFilter(trigger,player);
                    }
                    else if(_status.seatNumSettled){
                        var seatNum=player.getSeatNum();
                        if(seatNum!=0){
                            if(typeof _status.lastSeatNum!='number'||seatNum<_status.lastSeatNum) isRound=true;
                            _status.lastSeatNum=seatNum;
                        }
                    }
                    else if(player==_status.roundStart) isRound=true;
                    if(isRound){
                        delete _status.roundSkipped;
                        game.roundNumber++;
                        trigger._roundStart=true;
                        game.updateRoundNumber();
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].isOut()&&game.players[i].outCount>0){
                                game.players[i].outCount--;
                                if(game.players[i].outCount==0&&!game.players[i].outSkills){
                                    game.players[i].in();
                                }
                            }
                        }
                        event.trigger('roundStart');
                    }
                }
                _status.globalHistory.push({
                    cardMove:[],
                    custom:[],
                    useCard:[],
                    changeHp:[],
                    everything:[],
                });
                var players=game.players.slice(0).concat(game.dead);
                for(var i=0;i<players.length;i++){
                    var current=players[i];
                    current.actionHistory.push({useCard:[],respond:[],skipped:[],lose:[],gain:[],sourceDamage:[],damage:[],custom:[],useSkill:[]});
                    current.stat.push({card:{},skill:{}});
                    if(isRound){
                        current.getHistory().isRound=true;
                        current.getStat().isRound=true;
                    }
                };
                if(!player.phaseSkipped){
                    player.getHistory().isMe=true;
                    player.getStat().isMe=true;
                }
                if(isRound){
                    game.getGlobalHistory().isRound=true;
                }
            },
        },*/
        _usecard: {
            trigger: { global: 'useCardAfter' },
            forced: true,
            popup: false,
            priority: -100,
            lastDo: true,
            filter: function (event) {
                return !event._cleared && event.card.name != 'wuxie';
            },
            content: function () {
                game.broadcastAll(function () {
                    ui.clear();
                });
                event._cleared = true;
            }
        },
        _discard: {
            trigger: { global: ['discardAfter', 'loseToDiscardpileAfter', 'loseAsyncAfter'] },
            forced: true,
            popup: false,
            priority: -100,
            lastDo: true,
            filter: function (event) {
                return ui.todiscard[event.discardid] ? true : false;
            },
            content: function () {
                game.broadcastAll(function (id) {
                    var todiscard = ui.todiscard[id];
                    delete ui.todiscard[id];
                    if (todiscard) {
                        var time = 1000;
                        if (typeof todiscard._discardtime == 'number') {
                            time += todiscard._discardtime - get.time();
                        }
                        if (time < 0) {
                            time = 0;
                        }
                        setTimeout(function () {
                            for (var i = 0; i < todiscard.length; i++) {
                                todiscard[i].delete();
                            }
                        }, time);
                    }
                }, trigger.discardid);
            }
        },
        _save: {
            //trigger:{source:'dying2',player:'dying2'},
            priority: 5,
            forced: true,
            popup: false,
            filter: function (event, player) {
                //if(!event.player.isDying()) return false;
                //if(event.source&&event.source.isIn()&&event.source!=player) return false;
                //return true;
                return false;
            },
            content: function () {
                "step 0"
                event.dying = trigger.player;
                if (!event.acted) event.acted = [];
                "step 1"
                if (trigger.player.isDead()) {
                    event.finish();
                    return;
                }
                event.acted.push(player);
                var str = get.translation(trigger.player) + '濒死，是否帮助？';
                var str2 = '当前体力：' + trigger.player.hp;
                if (lib.config.tao_enemy && event.dying.side != player.side && lib.config.mode != 'identity' && lib.config.mode != 'guozhan' && !event.dying.hasSkillTag('revertsave')) {
                    event._result = { bool: false }
                }
                else if (player.canSave(event.dying)) {
                    player.chooseToUse({
                        filterCard: function (card, player, event) {
                            event = event || _status.event;
                            return lib.filter.cardSavable(card, player, event.dying);
                        },
                        filterTarget: function (card, player, target) {
                            if (target != _status.event.dying) return false;
                            if (!card) return false;
                            var info = get.info(card);
                            if (!info.singleCard || ui.selected.targets.length == 0) {
                                var mod = game.checkMod(card, player, target, 'unchanged', 'playerEnabled', player);
                                if (mod == false) return false;
                                var mod = game.checkMod(card, player, target, 'unchanged', 'targetEnabled', target);
                                if (mod != 'unchanged') return mod;
                            }
                            return true;
                        },
                        prompt: str,
                        prompt2: str2,
                        ai1: function (card) {
                            if (typeof card == 'string') {
                                var info = get.info(card);
                                if (info.ai && info.ai.order) {
                                    if (typeof info.ai.order == 'number') {
                                        return info.ai.order;
                                    }
                                    else if (typeof info.ai.order == 'function') {
                                        return info.ai.order();
                                    }
                                }
                            }
                            return 1;
                        },
                        ai2: get.effect_use,
                        type: 'dying',
                        targetRequired: true,
                        dying: event.dying
                    });
                }
                else {
                    event._result = { bool: false }
                }
                "step 2"
                if (result.bool) {
                    var player = trigger.player;
                    if (player.hp <= 0 && !trigger.nodying && !player.nodying && player.isAlive() && !player.isOut() && !player.removed) event.goto(0);
                    else trigger.untrigger();
                }
                else {
                    for (var i = 0; i < 20; i++) {
                        if (event.acted.contains(event.player.next)) {
                            break;
                        }
                        else {
                            event.player = event.player.next;
                            if (!event.player.isOut()) {
                                event.goto(1);
                                break;
                            }
                        }
                    }
                }
            }
        },
        _ismin: {
            mod: {
                cardEnabled: function (card, player) {
                    if (player.isMin()) {
                        if (get.type(card) == 'equip') return false;
                    }
                }
            }
        },
        _recasting: {
            enable: 'phaseUse',
            logv: false,
            prompt: '将要重铸的牌置入弃牌堆并摸一张牌',
            filter: (event, player) => player.hasCard(card => lib.skill._recasting.filterCard(card, player), lib.skill._recasting.position),
            position: 'he',
            filterCard: (card, player) => player.canRecast(card, null, true),
            discard: false,
            lose: false,
            delay: false,
            content: () => {
                player.recast(cards, null, (player, cards) => {
                    var numberOfCardsToDraw = cards.length;
                    cards.forEach(value => {
                        if (lib.config.mode == 'stone' && _status.mode == 'deck' && !player.isMin() && get.type(value).startsWith('stone')) {
                            var stonecard = get.stonecard(1, player.career);
                            if (stonecard.length) {
                                numberOfCardsToDraw -= stonecard.length;
                                player.gain(game.createCard(stonecard.randomGet()), 'draw');
                            }
                            else player.draw({
                                drawDeck: 1
                            }).log = false;
                        }
                        else if (get.subtype(value) == 'spell_gold') {
                            var libCard = get.libCard(info => info.subtype == 'spell_silver');
                            if (!libCard.length) return;
                            numberOfCardsToDraw--;
                            player.gain(game.createCard(libCard.randomGet()), 'draw');
                        }
                        else if (get.subtype(value) == 'spell_silver') {
                            var libCard = get.libCard(info => info.subtype == 'spell_bronze');
                            if (!libCard.length) return;
                            numberOfCardsToDraw--;
                            player.gain(game.createCard(libCard.randomGet()), 'draw');
                        }
                    });
                    if (numberOfCardsToDraw) player.draw(numberOfCardsToDraw).log = false;
                });
            },
            ai: {
                basic: {
                    order: 6
                },
                result: {
                    player: 1
                }
            }
        },
        _lianhuan: {
            trigger: { player: 'damageAfter' },
            filter: function (event, player) {
                return event.lianhuanable == true;
            },
            forced: true,
            popup: false,
            logv: false,
            forceDie: true,
            //priority:-5,
            content: function () {
                "step 0"
                event.logvid = trigger.getLogv();
                "step 1"
                event.targets = game.filterPlayer(function (current) {
                    return current != event.player && current.isLinked();
                });
                lib.tempSortSeat = _status.currentPhase || player;
                event.targets.sort(lib.sort.seat);
                delete lib.tempSortSeat;
                event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
                if (trigger.source) event._args.push(trigger.source);
                else event._args.push("nosource");
                "step 2"
                if (event.targets.length) {
                    var target = event.targets.shift();
                    if (target.isLinked()) target.damage.apply(target, event._args.slice(0));
                    event.redo();
                }
            },
        },
        _lianhuan4: {
            trigger: { player: 'changeHp' },
            priority: -10,
            forced: true,
            popup: false,
            forceDie: true,
            filter: function (event, player) {
                var evt = event.getParent();
                return evt && evt.name == 'damage' && evt.hasNature('linked') && player.isLinked();
            },
            content: function () {
                player.link();
                if (trigger.getParent().notLink()) trigger.getParent().lianhuanable = true;
            }
        },
        /**
         * @deprecated
         */
        _chongzhu: {
            get filter() {
                return lib.skill._recasting.filter;
            },
            set filter(filter) {
                lib.skill._recasting.filter = filter;
            },
            get filterCard() {
                return lib.skill._recasting.filterCard;
            },
            set filterCard(filterCard) {
                lib.skill._recasting.filterCard = filterCard;
            },
            get content() {
                return lib.skill._recasting.content;
            },
            set content(content) {
                lib.skill._recasting.content = content;
            },
            get ai() {
                return lib.skill._recasting.ai;
            },
            set ai(ai) {
                lib.skill._recasting.ai = ai;
            }
        }
    };

    const sort = {
        nature:function(a,b){
            return (lib.nature.get(b)||0)-(lib.nature.get(a)||0);
        },
        group:function(a,b){
            const groupSort=function(group){
                let base=0;
                if(group=='wei') return base;
                if(group=='shu') return base+1;
                if(group=='wu') return base+2;
                if(group=='qun') return base+3;
                if(group=='jin') return base+4;
                if(group=='key') return base+5;
                if(group=='western') return base+6;
                if(group=='shen') return base+7;
                if(group=='double') return base+7;
                return base+9;
            }
            return groupSort(a)-groupSort(b);
        },
        character:function(a,b){
            const groupSort=function(name){
                const info=get.character(name);
                if(!info) return 7;
                let base=0;
                if(get.is.double(name,true)) base=9;
                const group=info[1];
                if(group=='shen') return base-1;
                if(group=='wei') return base;
                if(group=='shu') return base+1;
                if(group=='wu') return base+2;
                if(group=='qun') return base+3;
                if(group=='jin') return base+4;
                if(group=='key') return base+5;
                if(group=='western') return base+6;
                return base+7;
            }
            const del=groupSort(a)-groupSort(b);
            if(del!=0) return del;
            let aa=a,bb=b;
            if(a.includes('_')){
                a=a.slice(a.indexOf('_')+1);
            }
            if(b.includes('_')){
                b=b.slice(b.indexOf('_')+1);
            }
            if(a!=b){
                return a>b?1:-1;
            }
            return aa>bb?1:-1;
        },
        card:function(a,b){
            var typeSort=function(name){
                var type=get.type(name);
                if(!type) return 10;
                if(type=='basic') return -1;
                if(type=='trick') return 0;
                if(type=='delay') return 1;
                if(type=='equip'){
                    var type2=get.subtype(name,false);
                    if(type2&&type2.slice) return 1+parseInt(type2.slice(5)||7);
                    return 8.5
                }
                return 9;
            }
            var del=typeSort(a)-typeSort(b);
            if(del!=0) return del;
            var aa=a,bb=b;
            if(a.includes('_')){
                a=a.slice(a.indexOf('_')+1);
            }
            if(b.includes('_')){
                b=b.slice(b.indexOf('_')+1);
            }
            if(a!=b){
                return a>b?1:-1;
            }
            return aa>bb?1:-1;
        },
        random:function(){
            return (Math.random()-0.5);
        },
        seat:function(a,b){
            var player=lib.tempSortSeat||_status.event.player;
            var delta=get.distance(player,a,'absolute')-get.distance(player,b,'absolute');
            if(delta) return delta;
            delta=parseInt(a.dataset.position)-parseInt(b.dataset.position);
            if(player.side==game.me.side) return delta;
            return -delta;
        },
        position:function(a,b){
            return parseInt(a.dataset.position)-parseInt(b.dataset.position);
        },
        priority:function(a,b){
            var i1=get.info(a[0]),i2=get.info(b[0]);
            if(i1.priority==undefined) i1.priority=0;
            if(i2.priority==undefined) i2.priority=0;
            if(i1.priority==i2.priority){
                if(i1.forced==undefined&&i2.forced==undefined) return 0;
                if(i1.forced&&i2.forced) return 0;
                if(i1.forced) return 1;
                if(i2.forced) return -1;
            }
            return i2.priority-i1.priority;
        },
        number:function(a,b){
            return get.number(a)-get.number(b);
        },
        number2:function(a,b){
            return get.number(b)-get.number(a);
        },
        capt:function(a,b){
            var aa=a,bb=b;
            if(aa.includes('_')){
                aa=aa.slice(aa.indexOf('_')+1);
            }
            if(bb.includes('_')){
                bb=bb.slice(bb.indexOf('_')+1);
            }
            if(aa!=bb){
                return aa>bb?1:-1;
            }
            return a>b?1:-1;
        },
        name:function(a,b){
            if(a>b) return 1;
            if(a<b) return -1;
            return 0;
        }
    };

    Object.assign(lib, _lib);
    Object.assign(lib.announce, announce);
    Object.assign(lib.card, card);
    Object.assign(lib.cheat, cheat);
    Object.assign(lib.filter, filter);
    Object.assign(lib.hooks, libHooks);
    Object.assign(lib.message, message);
    Object.assign(lib.skill, skill);
    Object.assign(lib.sort, sort);
});
