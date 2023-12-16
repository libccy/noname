import { Game as game } from './game.js';
import { Get as get } from './get.js';
import { status as _status } from './status.js';
import { UI as ui } from './ui.js';
import { GNC } from "./gnc.js";
import { InternalLibrary as lib } from "./internal.js";
import { animate } from "./library/animate.js";
import { announce } from "./library/announce.js";
import { cardPack } from "./library/card-pack.js";
import { cardPile } from "./library/card-pile.js";
import { cardType } from "./library/card-type.js";
import { card } from "./library/card.js";
import { Channel } from "./library/channel.js";
import { CharacterDialogGroup } from "./library/character-dialog-group.js";
import { characterFilter } from "./library/character-filter.js";
import { characterIntro } from "./library/character-intro.js";
import { characterPack } from "./library/character-pack.js";
import { characterReplace } from "./library/character-replace.js";
import { characterSort } from "./library/character-sort.js";
import { characterTitle } from "./library/character-title.js";
import { character } from "./library/character.js";
import { Cheat } from "./library/cheat.js";
import { color } from "./library/color.js";
import { Comparator } from "./library/comparator.js";
import { CONFIGURATION_MENU } from "./library/configuration-menu.js";
import { configuration } from "./library/configuration.js";
import { Creation } from "./library/creation.js";
import { dynamicTranslate } from "./library/dynamic-translate.js";
import { element } from "./library/element.js";
import { emotionList } from "./library/emotion-list.js";
import { extensionMenu } from "./library/extension-menu.js";
import { extensionPack } from "./library/extension-pack.js";
import { Filter } from "./library/filter.js";
import { groupNature } from "./library/group-nature.js";
import { HELP } from "./library/help.js";
import { hookMap } from "./library/hook-map.js";
import { hook } from "./library/hook.js";
import { hooks } from "./library/hooks.js";
import { imported } from "./library/imported.js";
import { Initialization } from "./library/initialization.js";
import { internalStatus } from "./library/internal-status.js";
import { linq } from "./library/linq.js";
import { message } from "./library/message.js";
import { MODE } from "./library/mode.js";
import { natureAudio } from "./library/nature-audio.js";
import { Other } from "./library/other.js";
import { perfectPair } from "./library/perfect-pair.js";
import { pinyins } from "./library/pinyins.js";
import { skill } from "./library/skill.js";
import { skin } from "./library/skin.js";
import { Sort } from "./library/sort.js";
import { stratagemBuff } from "./library/stratagem-buff.js";
import { translate } from "./library/translate.js";
import { updateURLs } from "./library/update-urls.js";
import { yingbian } from "./library/yingbian.js";
import { Click } from "./ui/click.js";
import { Create } from "./ui/create.js";

const nonameInitialized = localStorage.getItem("noname_inited");

export class Library {
	static configprefix = "noname_0.9_";
	static versionOL = 27;
	static updateURLS = updateURLs;
	static updateURL = updateURLs.github;
	static mirrorURL = updateURLs.coding;
	static hallURL = "47.99.105.222";
	static assetURL = typeof nonameInitialized != "string" || nonameInitialized == "nodejs" ? "" : nonameInitialized;
	static userAgent = navigator.userAgent.toLowerCase();
	static compatibleEdition = Boolean(typeof nonameInitialized == "string" && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//));
	static changeLog = [];
	static updates = [];
	static canvasUpdates = [];
	static video = [];
	static skilllist = [];
	static connectBanned = [];
	static characterIntro = characterIntro;
	static characterTitle = characterTitle;
	static characterPack = characterPack;
	static characterFilter = characterFilter;
	static characterSort = characterSort;
	static characterReplace = characterReplace;
	static characterGuozhanFilter = ["mode_guozhan"];
	static dynamicTranslate = dynamicTranslate;
	static cardPack = cardPack;
	static skin = skin;
	static onresize = [];
	static onphase = [];
	static onwash = [];
	static onover = [];
	static ondb = [];
	static ondb2 = [];
	static chatHistory = [];
	static emotionList = emotionList;
	static animate = animate;
	static onload = [];
	static onload2 = [];
	static onprepare = [];
	static arenaReady = [];
	static onfree = [];
	static inpile = [];
	static inpile_nature = [];
	static extensions = [];
	static extensionPack = extensionPack;
	static cardType = cardType;
	static hook = hook;
	static hooks = hooks;
	static Channel = Channel;
	/**
	 * @todo Waiting for [Rintim](https://github.com/Rintim)’s pull request.
	 */
	static announce = announce;
	/**
	 * @type {Map<string, string>}
	 */
	static objectURL = new Map();
	static hookmap = hookMap;
	static imported = imported;
	static layoutfixed = ["chess", "tafang", "stone"];
	static pinyins = pinyins;
	static yingbian = yingbian;
	static stratagemBuff = stratagemBuff;
	/**
	 * The actual card name
	 * 
	 * 实际的卡牌名称
	 */
	static actualCardName = new Map([
		["挟令", "挟天子以令诸侯"],
		["霹雳投石车", "霹雳车"]
	])
	static characterDialogGroup = CharacterDialogGroup;
	static configMenu = CONFIGURATION_MENU;
	static extensionMenu = extensionMenu;
	static mode = MODE;
	static status = internalStatus;
	static help = HELP;
	/**
	 * @type {import("path")}
	 */
	// @ts-ignore
	static path = {};
	static gnc = GNC;
	static comparator = Comparator;
	static creation = Creation;
	static linq = linq;
	static init = Initialization;
	static cheat = Cheat;
	static translate = translate;
	static element = element;
	static card = card;
	static filter = Filter;
	static sort = Sort;
	static skill = skill;
	static character = character;
	static perfectPair = perfectPair;
	static cardPile = cardPile;
	static message = message;
	static suit = ["club", "spade", "diamond", "heart"];
	static suits = ["club", "spade", "diamond", "heart", "none"];
	static color = color;
	static group = ["wei", "shu", "wu", "qun", "jin", "shen"];
	/**
	 * 数值代表各元素在名称中排列的先后顺序
	 */
	static nature = new Map([
		["fire", 20],
		["thunder", 30],
		["kami", 60],
		["ice", 40],
		["stab", 10],
		["poison", 50]
	]);
	static natureAudio = natureAudio;
	static linked = ["fire", "thunder", "kami", "ice"];
	static natureBg = new Map([
		["stab", "image/card/cisha.png"]
	]);
	static natureSeparator = "|";
	static namePrefix = new Map([
		["界", {
			color: "#fdd559",
			nature: "soilmm",
		}],
		["谋", {
			color: "#def7ca",
			nature: "woodmm",
		}],
		["武", {
			color: "#fd8359",
			nature: "soilmm",
		}],
		["乐", {
			color: "#f7f4fc",
			nature: "keymm",
		}],
		["神", {
			color: "#faecd1",
			nature: "orangemm",
		}],
		["族", {
			color: "#ee9ac7",
			nature: "firemm",
		}],
		["晋", {
			color: "#f3c5ff",
			nature: "blackmm",
		}],
		["侠", {
			color: "#eeeeee",
			nature: "qunmm",
		}],
		["起", {
			color: "#c3f9ff",
			nature: "thundermm",
		}],
		["承", {
			color: "#c3f9ff",
			nature: "thundermm",
		}],
		["转", {
			color: "#c3f9ff",
			nature: "thundermm",
		}],
		["梦", {
			color: "#6affe2",
			nature: "watermm",
		}],
		["用间", {
			color: "#c3f9ff",
			nature: "thundermm",
		}],
		["战役篇", {
			color: "#c3f9ff",
			nature: "thundermm",
			showName: "战",
		}],
		["武将传", {
			color: "#c3f9ff",
			nature: "thundermm",
			showName: "传",
		}],
		["将", {
			nature: "firemm",
		}],
		["新杀", {
			color: "#fefedc",
			nature: "metalmm",
			showName: "新",
		}],
		["旧", {
			color: "#a4a4a4",
			nature: "black",
		}],
		["旧界", {
			color: "#a4a4a4",
			nature: "black",
		}],
		["节钺", {
			color: "#a4a4a4",
			nature: "black",
		}],
		["毅重", {
			color: "#a4a4a4",
			nature: "black",
		}],
		["★SP", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("SP")}`
		}],
		["☆SP", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("SP")}`
		}],
		["J.SP", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("SP")}`
		}],
		["K系列", {
			showName: "Ｋ",
		}],
		["经典", {
			showName: "典",
		}],
		["君", {
			color: "#fefedc",
			nature: "shenmm",
		}],
		["骰子", {
			getSpan: () => {
				const span = document.createElement("span");
				span.style.fontFamily = "NonameSuits";
				span.textContent = "🎲";
				return span.outerHTML;
			}
		}],
		["SP", {
			getSpan: () => {
				const span = document.createElement("span"), style = span.style;
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.textContent = "SP";
				return span.outerHTML;
			},
		}],
		["OL", {
			getSpan: () => {
				const span = document.createElement("span"), style = span.style;
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.textContent = "OL";
				return span.outerHTML;
			},
		}],
		["RE", {
			getSpan: () => {
				const span = document.createElement("span"), style = span.style;
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.textContent = "RE";
				return span.outerHTML;
			},
		}],
		["手杀", {
			getSpan: (prefix, name) => {
				const simple = configuration.buttoncharacter_prefix == "simple", span = document.createElement("span");
				if (characterPack.shiji && name in characterPack.shiji) {
					for (const entry of Object.entries(characterSort.shiji)) {
						if (!entry[1].includes(name)) continue;
						prefix = get.translation(entry[0]).slice(-1);
						break;
					}
					if (!simple) {
						span.style.color = "#def7ca";
						span.dataset.nature = "watermm";
					}
					span.innerHTML = prefix;
				}
				else if (simple) span.textContent = "手杀";
				else {
					span.style.fontFamily = "NonameSuits";
					span.textContent = "📱";
				}
				return span.outerHTML;
			},
		}],
		["TW", {
			getSpan: () => {
				const span = document.createElement("span"), style = span.style;
				style.writingMode = style.webkitWritingMode = "horizontal-tb";
				style.fontFamily = "MotoyaLMaru";
				style.transform = "scaleY(0.85)";
				span.textContent = "TW";
				return span.outerHTML;
			},
		}],
		["TW神", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("TW")}${get.prefixSpan("神")}`
		}],
		["TW将", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("TW")}${get.prefixSpan("将")}`
		}],
		["OL神", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("OL")}${get.prefixSpan("神")}`
		}],
		["旧神", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("旧")}${get.prefixSpan("神")}`
		}],
		["旧晋", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("旧")}${get.prefixSpan("晋")}`
		}],
		["新杀SP", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("新杀")}${get.prefixSpan("SP")}`
		}],
		["界SP", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("界")}${get.prefixSpan("SP")}`
		}],
		["S特神", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("★")}${get.prefixSpan("神")}`
		}],
		["手杀界", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("手杀")}${get.prefixSpan("界")}`
		}],
		["战役篇神", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("战役篇")}${get.prefixSpan("神")}`
		}],
		["星", {
			color: "#ffd700",
			nature: "glodenmm",
		}],
		["OL界", {
			/**
			 * @returns {string}
			 */
			getSpan: () => `${get.prefixSpan("OL")}${get.prefixSpan("界")}`
		}]
	]);
	static groupnature = groupNature;
	static lineColor = new Map([
		["fire", [255, 146, 68]],
		["yellow", [255, 255, 122]],
		["blue", [150, 202, 255]],
		["green", [141, 255, 216]],
		["ice", [59, 98, 115]],
		["thunder", [141, 216, 255]],
		["kami", [90, 118, 99]],
		["white", [255, 255, 255]],
		["poison", [104, 221, 127]],
		["brown", [195, 161, 223]],
		["legend", [233, 131, 255]]
	]);
	static phaseName = ["phaseZhunbei", "phaseJudge", "phaseDraw", "phaseUse", "phaseDiscard", "phaseJieshu"];
	static quickVoice = [
		"我从未见过如此厚颜无耻之人！",
		"这波不亏",
		"请收下我的膝盖",
		"你咋不上天呢",
		"放开我的队友，冲我来",
		"你随便杀，闪不了算我输",
		"见证奇迹的时刻到了",
		"能不能快一点啊，兵贵神速啊",
		"主公，别开枪，自己人",
		"小内再不跳，后面还怎么玩儿啊",
		"你们忍心，就这么让我酱油了？",
		"我，我惹你们了吗",
		"姑娘，你真是条汉子",
		"三十六计，走为上，容我去去便回",
		"人心散了，队伍不好带啊",
		"昏君，昏君啊！",
		"风吹鸡蛋壳，牌去人安乐",
		"小内啊，您老悠着点儿",
		"不好意思，刚才卡了",
		"你可以打得再烂一点吗",
		"哥们，给力点儿行嘛",
		"哥哥，交个朋友吧",
		"妹子，交个朋友吧",
	];
	static other = Other;

	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static listenEnd(node) {
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
	}

	static getErrorTip(msg) {
		if (typeof msg != "string") {
			try {
				msg = msg.toString();
				if (typeof msg != "string") throw "err";
			} catch (_) {
				throw `传参错误:${msg}`;
			}
		}
		if (msg.startsWith("Uncaught ")) msg = msg.slice(9);
		let newMessage = msg;
		if (/RangeError/.test(newMessage)) {
			if (newMessage.includes("Maximum call stack size exceeded")) {
				newMessage = "堆栈溢出";
			} else if (/argument must be between 0 and 20/.test(newMessage)) {
				let funName = newMessage.slice(newMessage.indexOf("RangeError: ") + 12, newMessage.indexOf(")") + 1);
				newMessage = funName + "参数必须在0和20之间";
			} else {
				newMessage = "传递错误值到数值计算方法";
			}
		} else if (/ReferenceError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("is not defined")) {
				messageName = newMessage.replace("ReferenceError: ", "").replace(" is not defined", "");
				newMessage = "引用了一个未定义的变量：" + messageName;
			} else if (newMessage.includes("invalid assignment left-hand side")) {
				newMessage = "赋值运算符或比较运算符不匹配";
			} else if (newMessage.includes("Octal literals are not allowed in strict mode")) {
				newMessage = "八进制字面量与八进制转义序列语法已经被废弃";
			} else if (newMessage.includes("Illegal \x27use strict\x27 directive in function with non-simple parameter list")) {
				newMessage = "\x27use strict\x27指令不能使用在带有‘非简单参数’列表的函数";
			} else if (newMessage.includes("Invalid left-hand side in assignment")) {
				newMessage = "赋值中的左侧无效，即number，string等不可赋值的非变量数据";
			}
		} else if (/SyntaxError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes("Unexpected token ")) {
				messageName = newMessage.replace("SyntaxError: Unexpected token ", "");
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
				newMessage = "参数列表后面缺少“)” (丢失运算符或者转义字符等)";
			} else if (newMessage.includes("Invalid shorthand property initializer")) {
				newMessage = "在定义一个{}对象时，应该使用“:”而不是“=”";
			} else if (newMessage.includes("Missing initializer in const declaration")) {
				newMessage = "在使用const定义一个对象时，必须指定初始值";
			} else if (newMessage.includes("Unexpected number") || newMessage.includes("Unexpected string")) {
				newMessage = "在定义函数时，函数参数必须为合法标记符";
			} else if (newMessage.includes("Unexpected end of input")) {
				newMessage = "遗漏了符号或符号顺序不对(小括号，花括号等)";
			} else if (newMessage.includes("has already been declared")) {
				messageName = newMessage.replace("SyntaxError: Identifier ", "").replace(" has already been declared", "");
				newMessage = messageName + "变量已经被声明过，不能被重新声明";
			} else if (newMessage.includes("Duplicate parameter name not allowed in this context")) {
				newMessage = "参数名不允许重复";
			} else if (newMessage.includes("Unexpected reserved word") || newMessage.includes(
				"Unexpected strict mode reserved word")) {
				newMessage = "保留字被用作标记符";
			}
		} else if (/TypeError/.test(newMessage)) {
			let messageName;
			if (newMessage.includes(" is not a function")) {
				messageName = newMessage.replace("TypeError: ", "").replace(" is not a function", "");
				newMessage = messageName + "不是一个函数";
			} else if (newMessage.includes(" is not a constructor")) {
				messageName = newMessage.replace("TypeError: ", "").replace(" is not a constructor", "");
				newMessage = messageName + "不是一个构造函数";
			} else if (newMessage.includes("Cannot read property")) {
				messageName = newMessage.replace("TypeError: Cannot read property ", "").replace(" of null", "").replace(" of undefined", "");
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4);
				newMessage = `无法读取“${ofName}”的属性值${messageName}`;
			} else if (newMessage.includes("Cannot read properties")) {
				messageName = newMessage.slice(newMessage.indexOf("reading \x27") + 9, -2);
				let ofName = newMessage.slice(newMessage.indexOf(" of ") + 4, newMessage.indexOf("(") - 1);
				newMessage = `无法读取“${ofName}”的属性值${messageName}`;
			} else if (newMessage.includes("Property description must be an object")) {
				messageName = newMessage.replace("TypeError: Property description must be an object: ", "");
				newMessage = messageName + "是非对象类型的值";
			} else if (newMessage.includes("Cannot assign to read only property ")) {
				messageName = newMessage.slice(47, newMessage.lastIndexOf(" of ") + 1);
				newMessage = messageName + "属性禁止写入";
			} else if (newMessage.includes("Object prototype may only be an Object or null")) {
				newMessage = messageName + "对象原型只能是对象或null";
			} else if (newMessage.includes("Cannot create property")) {
				messageName = newMessage.slice(newMessage.indexOf("\x27") + 1);
				messageName = messageName.slice(0, messageName.indexOf("\x27"));
				let obj = newMessage.slice(newMessage.indexOf(messageName) + 16);
				newMessage = `${obj}不能添加或修改“${messageName}”属性，任何 Primitive 值都不允许有property`;
			} else if (newMessage.includes("Can\x27t add property") && newMessage.includes("is not extensible")) {
				newMessage = "对象不可添加属性（不可扩展）";
			} else if (newMessage.includes("Cannot redefine property")) {
				messageName = newMessage.slice(37);
				newMessage = messageName + "不可配置";
			} else if (newMessage.includes("Converting circular structure to JSON")) {
				messageName = newMessage.slice(37);
				newMessage = "JSON.stringify() 方法处理循环引用结构的JSON会失败";
			} else if (newMessage.includes("Cannot use \x27in\x27 operator to search for ")) {
				newMessage = "in不能用来在字符串、数字或者其他基本类型的数据中进行检索";
			} else if (newMessage.includes("Right-hand side of \x27instanceof\x27 is not an object")) {
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
	}

	static codeMirrorReady(node, editor) {
		ui.window.appendChild(node);
		node.style.fontSize = `${20 / game.documentZoom}px`;
		const mirror = window.CodeMirror(editor, {
			value: node.code,
			mode: "javascript",
			lineWrapping: !configuration.touchscreen && configuration.mousewheel,
			lineNumbers: true,
			indentUnit: 4,
			autoCloseBrackets: true,
			fixedGutter: false,
			hintOptions: { completeSingle: false },
			theme: configuration.codeMirror_theme || "mdn-like",
			extraKeys: {
				"Ctrl-Z": "undo",//撤销
				"Ctrl-Y": "redo",//恢复撤销
				//"Ctrl-A":"selectAll",//全选
			},
		});
		lib.setScroll(editor.querySelector(".CodeMirror-scroll"));
		node.aced = true;
		node.editor = mirror;
		setTimeout(() => mirror.refresh(), 0);
		node.editor.on("change", (e, change) => {
			let code;
			if (node.editor) {
				code = node.editor.getValue();
			} else if (node.textarea) {
				code = node.textarea.value;
			}
			//动态绑定文本
			if (code.length && change.origin == "+input" &&
				/{|}|\s|=|;|:|,|，|。|？|！|!|\?|&|#|%|@|‘|’|；/.test(change.text[0]) == false &&
				change.text.length == 1) {
				//输入了代码，并且不包括空格，{}，=， ; ， : ， 逗号等，才可以自动提示
				node.editor.showHint();
			}
		});
		//防止每次输出字符都创建以下元素
		const event = _status.event;
		const trigger = _status.event;
		const player = Create.player().init("sunce");
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
			//If it’s not a “word-style” token, ignore the token.
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
					const code = context.length == 1 ? context[0].string : context.reduceRight((pre, cur) => `${pre.string || pre}.${cur.string}`);
					obj = eval(code);
					if (![null, undefined].includes(obj)) {
						const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj))).filter(key => key.startsWith(token.string));
						list.addArray(keys);
					}
				} catch (_) { return; }
			} else if (token && typeof token.string == "string") {
				//非开发者模式下，提示这些单词
				list.addArray(["player", "card", "cards", "result", "trigger", "source", "target", "targets", "lib", "game", "ui", "get", "ai", "_status"]);
			}
			return {
				list: [...new Set(getCompletions(token, context, keywords, options).concat(list))]
					.filter(key => key.startsWith(token.string))
					.sort((a, b) => `${a}`.localeCompare(`${b}`))
					.map(text => {
						return {
							render(elt, data, cur) {
								var icon = document.createElement("span");
								var className = "cm-completionIcon cm-completionIcon-";
								if (obj) {
									const type = typeof obj[text];
									if (type == "function") {
										className += "function";
									}
									else if (type == "string") {
										className += "text";
									}
									else if (type == "boolean") {
										className += "variable";
									}
									else {
										className += "namespace";
									}
								} else {
									if (javascriptKeywords.includes(text)) {
										className += "keyword";
									}
									else if (window[text]) {
										const type = typeof window[text];
										if (type == "function") {
											className += "function";
										}
										else if (type == "string") {
											className += "text";
										}
										else if (text == "window" || type == "boolean") {
											className += "variable";
										}
										else {
											className += "namespace";
										}
									} else {
										className += "namespace";
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
		}
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
					if (global.jQuery != null && (obj.string == "$" || obj.string == "jQuery") && (typeof global.jQuery == "function"))
						base = global.jQuery();
					else if (global._ != null && (obj.string == "_") && (typeof global._ == "function"))
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
			return found.sort((a, b) => `${a}`.localeCompare(`${b}`));
		}
	}

	static setIntro(node, func, left) {
		if (configuration.touchscreen) {
			if (left) {
				node.listen(Click.touchintro);
			}
			else {
				lib.setLongPress(node, Click.intro);
			}
		}
		else {
			if (left) {
				node.listen(Click.intro);
			}
			if (configuration.hover_all && !lib.device) {
				lib.setHover(node, Click.hoverplayer);
			}
			if (configuration.right_info) {
				node.oncontextmenu = Click.rightplayer;
			}
		}
		if (func) {
			node._customintro = func;
		}
	}

	static setPopped(node, func, width, height, forceclick, paused2) {
		node._poppedfunc = func;
		node._poppedwidth = width;
		node._poppedheight = height;
		if (forceclick) {
			node.forceclick = true;
		}
		if (configuration.touchscreen || forceclick) {
			node.listen(Click.hoverpopped);
		}
		else {
			node.addEventListener("mouseenter", Click.hoverpopped);
		}
		if (paused2) {
			node._paused2 = true;
		}
	}

	static placePoppedDialog(dialog, e) {
		if (dialog._place_text) {
			if (dialog._place_text.firstChild.offsetWidth >= 190 || dialog._place_text.firstChild.offsetHeight >= 30) {
				dialog._place_text.style.marginLeft = "14px";
				dialog._place_text.style.marginRight = "14px";
				dialog._place_text.style.textAlign = "left";
				dialog._place_text.style.width = "calc(100% - 28px)";
			}
		}
		if (e.touches && e.touches[0]) {
			e = e.touches[0];
		}
		var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
		if (dialog._mod_height) {
			height += dialog._mod_height;
		}
		dialog.style.height = `${height}px`;
		if (e.clientX / game.documentZoom < ui.window.offsetWidth / 2) {
			dialog.style.left = `${e.clientX / game.documentZoom + 10}px`;
		}
		else {
			dialog.style.left = `${e.clientX / game.documentZoom - dialog.offsetWidth - 10}px`;
		}
		var idealtop = (e.clientY || 0) / game.documentZoom - dialog.offsetHeight / 2;
		if (typeof idealtop != "number" || isNaN(idealtop) || idealtop <= 5) {
			idealtop = 5;
		}
		else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
			idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
		}
		dialog.style.top = `${idealtop}px`;
	}

	static setHover(node, func, hoveration, width) {
		node._hoverfunc = func;
		if (typeof hoveration == "number") {
			node._hoveration = hoveration;
		}
		if (typeof width == "number") {
			node._hoverwidth = width
		}
		node.addEventListener("mouseenter", Click.mouseenter);
		node.addEventListener("mouseleave", Click.mouseleave);
		node.addEventListener("mousedown", Click.mousedown);
		node.addEventListener("mousemove", Click.mousemove);
		return node;
	}

	static setScroll(node) {
		node.ontouchstart = Click.touchStart;
		node.ontouchmove = Click.touchScroll;
		node.style.webkitOverflowScrolling = "touch";
		return node;
	}

	static setMousewheel(node) {
		if (configuration.mousewheel) node.onmousewheel = Click.mousewheel;
	}

	static setLongPress(node, func) {
		node.addEventListener("touchstart", Click.longpressdown);
		node.addEventListener("touchend", Click.longpresscancel);
		node._longpresscallback = func;
		return node;
	}

	static updateCanvas(time) {
		if (lib.canvasUpdates.length === 0) {
			internalStatus.canvas = false;
			return false;
		}
		ui.canvas.width = ui.arena.offsetWidth;
		ui.canvas.height = ui.arena.offsetHeight;
		var ctx = ui.ctx;
		ctx.shadowBlur = 5;
		ctx.shadowColor = "rgba(0,0,0,0.3)";
		ctx.strokeStyle = "white";
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
	}

	static run(time) {
		internalStatus.time = time;
		for (var i = 0; i < lib.updates.length; i++) {
			if (!Object.prototype.hasOwnProperty.call(lib.updates[i], "_time")) {
				lib.updates[i]._time = time;
			}
			if (lib.updates[i](time - lib.updates[i]._time - internalStatus.delayed) === false) {
				lib.updates.splice(i--, 1);
			}
		}
		if (lib.updates.length) {
			internalStatus.frameId = requestAnimationFrame(lib.run);
		}
		else {
			internalStatus.time = 0;
			internalStatus.delayed = 0;
		}
	}

	static getUTC(date) {
		return date.getTime();
	}

	static saveVideo() {
		if (_status.videoToSave) {
			game.export(Initialization.encode(JSON.stringify(_status.videoToSave)),
				`无名杀 - 录像 - ${_status.videoToSave.name[0]} - ${_status.videoToSave.name[1]}`);
		}
	}

	static genAsync(fn) {
		return GNC.of(fn);
	}

	static genAwait(item) {
		return GNC.isGenerator(item) ? GNC.of(function* () {
			for (const content of item) {
				yield content;
			}
		})() : Promise.resolve(item);
	}
}
