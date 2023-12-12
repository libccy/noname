import { Promises } from "./initialization/promises.js";
import { GNC as gnc } from "../gnc.js";
import { Library as lib } from "../library.js";

export class Initialization {
	static promises = Promises;

	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static init() {
		if (typeof __dirname === "string" && __dirname.length) {
			var dirsplit = __dirname.split("/");
			for (var i = 0; i < dirsplit.length; i++) {
				if (dirsplit[i]) {
					var c = dirsplit[i][0];
					lib.configprefix += /[A-Z]|[a-z]/.test(c) ? c : "_";
				}
			}
			lib.configprefix += "_";
		}
		window.resetGameTimeout = setTimeout(lib.init.reset, parseInt(localStorage.getItem(lib.configprefix + "loadtime")) || 10000);
		if (window.cordovaLoadTimeout) {
			clearTimeout(window.cordovaLoadTimeout);
			delete window.cordovaLoadTimeout;
		}
		var links = document.head.querySelectorAll("link");
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.includes("app/color.css")) {
				links[i].remove();
				break;
			}
		}
		var index = window.location.href.indexOf("index.html?server=");
		if (index != -1) {
			window.isNonameServer = window.location.href.slice(index + 18);
			window.nodb = true;
		}
		else {
			index = localStorage.getItem(lib.configprefix + "asserver");
			if (index) {
				window.isNonameServer = index;
				window.isNonameServerIp = lib.hallURL;
			}
		}

		var htmlbg = localStorage.getItem(lib.configprefix + "background");
		if (htmlbg) {
			if (htmlbg[0] == "[") {
				try {
					htmlbg = JSON.parse(htmlbg);
					htmlbg = htmlbg[get.rand(htmlbg.length)];
					if (htmlbg.startsWith("custom_")) {
						throw ("err");
					}
					_status.htmlbg = htmlbg;
				}
				catch (e) {
					htmlbg = null;
				}
			}
			if (htmlbg) {
				document.documentElement.style.backgroundImage = `url("${lib.assetURL}image/background/${htmlbg}.jpg")`;
				document.documentElement.style.backgroundSize = "cover";
				document.documentElement.style.backgroundPosition = "50% 50%";
			}
		}

		lib.get = get;
		lib.ui = ui;
		lib.ai = ai;
		lib.game = game;
		_status.event = lib.element.GameEvent.initialGameEvent();

		HTMLDivElement.prototype.animate = function (name, time) {
			var that;
			if (get.is.mobileMe(this) && name == "target") {
				that = ui.mebg;
			}
			else {
				that = this;
			}
			that.classList.add(name);
			setTimeout(function () {
				that.classList.remove(name);
			}, time || 1000);
			return this;
		};
		HTMLDivElement.prototype.hide = function () {
			this.classList.add("hidden");
			return this;
		};
		HTMLDivElement.prototype.unfocus = function () {
			if (lib.config.transparent_dialog) this.classList.add("transparent");
			return this;
		};
		HTMLDivElement.prototype.refocus = function () {
			this.classList.remove("transparent");
			return this;
		};
		HTMLDivElement.prototype.show = function () {
			this.classList.remove("hidden");
			return this;
		};
		HTMLDivElement.prototype.delete = function (time, callback) {
			if (this.timeout) {
				clearTimeout(this.timeout);
				delete this.timeout;
			}
			if (!this._listeningEnd || this._transitionEnded) {
				if (typeof time != "number") time = 500;
				this.classList.add("removing");
				var that = this;
				this.timeout = setTimeout(function () {
					that.remove();
					that.classList.remove("removing");
					if (typeof callback == "function") {
						callback();
					}
				}, time);
			}
			else {
				this._onEndDelete = true;
			}
			return this;
		};
		HTMLDivElement.prototype.goto = function (position, time) {
			if (this.timeout) {
				clearTimeout(this.timeout);
				delete this.timeout;
			}

			if (typeof time != "number") time = 500;
			this.classList.add("removing");

			var that = this;
			this.timeout = setTimeout(function () {
				if (!that._selfDestroyed) {
					position.appendChild(that);
				}
				that.classList.remove("removing");
				delete that.destiny;
			}, time);
			this.destiny = position;
			return this;
		};
		HTMLDivElement.prototype.fix = function () {
			clearTimeout(this.timeout);
			delete this.timeout;
			delete this.destiny;
			this.classList.remove("removing");
			return this;
		};
		Object.defineProperty(HTMLDivElement.prototype, "setBackground", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (name, type, ext, subfolder) {
				if (!name) return;
				let src;
				if (ext == "noskin") ext = ".jpg";
				ext = ext || ".jpg";
				subfolder = subfolder || "default";
				if (type) {
					let dbimage = null, extimage = null, modeimage = null, nameinfo, gzbool = false;
					const mode = get.mode();
					if (type == "character") {
						if (lib.characterPack[`mode_${mode}`] && lib.characterPack[`mode_${mode}`][name]) {
							if (mode == "guozhan") {
								nameinfo = lib.character[name];
								if (name.startsWith("gz_shibing")) name = name.slice(3, 11);
								else {
									if (lib.config.mode_config.guozhan.guozhanSkin && lib.character[name] && lib.character[name][4].contains("gzskin")) gzbool = true;
									name = name.slice(3);
								}
							}
							else modeimage = mode;
						}
						else if (name.includes("::")) {
							name = name.split("::");
							modeimage = name[0];
							name = name[1];
						}
						else {
							nameinfo = get.character(name);
						}
					}
					if (!modeimage && nameinfo && nameinfo[4]) for (const value of nameinfo[4]) {
						if (value.startsWith("ext:")) {
							extimage = value;
							break;
						}
						else if (value.startsWith("db:")) {
							dbimage = value;
							break;
						}
						else if (value.startsWith("mode:")) {
							modeimage = value.slice(5);
							break;
						}
						else if (value.startsWith("character:")) {
							name = value.slice(10);
							break;
						}
					}
					if (extimage) src = extimage.replace(/^ext:/, "extension/");
					else if (dbimage) {
						this.setBackgroundDB(dbimage.slice(3));
						return this;
					}
					else if (modeimage) src = `image/mode/${modeimage}/character/${name}${ext}`;
					else if (type == "character" && lib.config.skin[name] && arguments[2] != "noskin") src = `image/skin/${name}/${lib.config.skin[name]}${ext}`;
					else if (type == "character") {
						src = `image/character/${gzbool ? "gz_" : ""}${name}${ext}`;
					}
					else src = `image/${type}/${subfolder}/${name}${ext}`;
				}
				else src = `image/${name}${ext}`;
				this.setBackgroundImage(src);
				this.style.backgroundPositionX = "center";
				this.style.backgroundSize = "cover";
				if (type == "character") {
					new Promise((_, reject) => {
						const image = new Image();
						image.src = `${lib.assetURL}${src}`;
						image.onerror = reject;
					}).catch(() => new Promise((_, reject) => {
						const nameinfo = get.character(name);
						if (!nameinfo) reject("noinfo");
						const sex = nameinfo[0];
						src = `image/character/default_silhouette_${sex}${ext}`;
						const image = new Image();
						image.src = `${lib.assetURL}${src}`;
						image.onload = () => this.setBackgroundImage(src);
						image.onerror = () => reject(`sex:${sex}`);
					})).catch(reason => {
						let sex;
						if (reason == "noinfo") sex = "male";
						else sex = reason.slice(4);
						src = `image/character/default_silhouette_${sex == "female" ? "female" : "male"}${ext}`;
						const image = new Image();
						image.src = `${lib.assetURL}${src}`;
						image.onload = () => this.setBackgroundImage(src);
					});
				}
				return this;
			}
		});
		HTMLDivElement.prototype.setBackgroundDB = function (img) {
			return game.getDB("image", img).then(src => {
				this.style.backgroundImage = `url("${src}")`;
				this.style.backgroundSize = "cover";
				return this;
			});
		};
		HTMLDivElement.prototype.setBackgroundImage = function (img) {
			this.style.backgroundImage = `url("${lib.assetURL}${img}")`;
			return this;
		},
			HTMLDivElement.prototype.listen = function (func) {
				if (lib.config.touchscreen) {
					this.addEventListener("touchend", function (e) {
						if (!_status.dragged) {
							func.call(this, e);
						}
					});
					var fallback = function (e) {
						if (!_status.touchconfirmed) {
							func.call(this, e);
						}
						else {
							this.removeEventListener("click", fallback);
						}
					}
					this.addEventListener("click", fallback);
				}
				else {
					this.addEventListener("click", func);
				}
				return this;
			};
		HTMLDivElement.prototype.listenTransition = function (func, time) {
			let done = false;
			const callback = () => {
				if (!done) {
					done = true;
					func.call(this);
				}
				clearTimeout(timer);
				this.removeEventListener("webkitTransitionEnd", callback);
			};
			const timer = setTimeout(callback, time || 1000);
			this.addEventListener("webkitTransitionEnd", callback);
			return timer;
		};
		HTMLDivElement.prototype.setPosition = function () {
			var position;
			if (arguments.length == 4) {
				position = [];
				for (var i = 0; i < arguments.length; i++) position.push(arguments[i]);
			}
			else if (arguments.length == 1 && Array.isArray(arguments[0]) && arguments[0].length == 4) {
				position = arguments[0];
			}
			else {
				return this;
			}
			var top = "calc(" + position[0] + "% ";
			if (position[1] > 0) top += "+ " + position[1] + "px)";
			else top += "- " + Math.abs(position[1]) + "px)";
			var left = "calc(" + position[2] + "% ";
			if (position[3] > 0) left += "+ " + position[3] + "px)";
			else left += "- " + Math.abs(position[3]) + "px)";
			this.style.top = top;
			this.style.left = left;
			return this;
		};
		HTMLDivElement.prototype.css = function (style) {
			for (var i in style) {
				if (i == "innerHTML") {
					this.innerHTML = style[i];
				}
				else {
					this.style[i] = style[i];
				}
			}
			return this;
		};
		HTMLTableElement.prototype.get = function (row, col) {
			if (row < this.childNodes.length) {
				return this.childNodes[row].childNodes[col];
			}
		};
		/*处理lib.nature的兼容性问题*/
		const mapHasFunc = function (item) {
			return this.has(item)
		};
		Object.defineProperty(Map.prototype, "contains", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: mapHasFunc
		});
		Object.defineProperty(Map.prototype, "includes", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: mapHasFunc
		});
		const mapAddFunc = function (item) {
			this.set(item, 0);
			return this;
		}
		Object.defineProperty(Map.prototype, "add", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: mapAddFunc
		});
		Object.defineProperty(Map.prototype, "push", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: mapAddFunc
		});
		Object.defineProperty(Map.prototype, "addArray", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (arr) {
				for (var i = 0; i < arr.length; i++) {
					this.add(arr[i]);
				}
				return this;
			}
		});
		Object.defineProperty(Map.prototype, "remove", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (item) {
				this.delete(item);
				return this;
			}
		});
		/*Map prototype end*/
		Object.defineProperty(Array.prototype, "filterInD", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (pos) {
				if (typeof pos != "string") pos = "o";
				return this.filter(card => pos.includes(get.position(card, true)));
			}
		});
		Object.defineProperty(Array.prototype, "someInD", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (pos) {
				if (typeof pos != "string") pos = "o";
				return this.some(card => pos.includes(get.position(card, true)));
			}
		});
		Object.defineProperty(Array.prototype, "everyInD", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (pos) {
				if (typeof pos != "string") pos = "o";
				return this.every(card => pos.includes(get.position(card, true)));
			}
		});
		/**
		*@legacy Use {@link Array#includes} instead.
		 */
		Object.defineProperty(Array.prototype, "contains", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: Array.prototype.includes
		});
		Object.defineProperty(Array.prototype, "containsSome", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				return Array.from(arguments).some(i => this.includes(i));
			}
		});
		Object.defineProperty(Array.prototype, "containsAll", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				return Array.from(arguments).every(i => this.includes(i));
			}
		});

		Object.defineProperty(Array.prototype, "add", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				for (const arg of arguments) {
					if (this.contains(arg)) continue;
					this.push(arg);
				}
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "addArray", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				for (const arr of arguments) {
					for (const item of arr) this.add(item);
				}
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "remove", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				for (const item of arguments) {
					let pos = -1;
					if (typeof item == "number" && isNaN(item)) {
						pos = this.findIndex(v => isNaN(v))
					} else {
						pos = this.indexOf(item);
					}
					if (pos == -1) continue;
					this.splice(pos, 1);
				}
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "removeArray", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				for (const i of Array.from(arguments)) this.remove(...i);
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "unique", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				let uniqueArray = [...new Set(this)];
				this.length = uniqueArray.length;
				for (let i = 0; i < uniqueArray.length; i++) this[i] = uniqueArray[i];
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "toUniqued", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				return [...new Set(this)];
			}
		});
		Object.defineProperty(Array.prototype, "randomGet", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				let arr = this.slice(0);
				arr.removeArray(Array.from(arguments));
				return arr[Math.floor(Math.random() * arr.length)];
			}
		});
		Object.defineProperty(Array.prototype, "randomGets", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (num) {
				if (num > this.length) num = this.length;
				let arr = this.slice(0);
				let list = [];
				for (let i = 0; i < num; i++) {
					list.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
				}
				return list;
			}
		});
		Object.defineProperty(Array.prototype, "randomRemove", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (num) {
				if (typeof num == "number") {
					let list = [];
					for (let i = 0; i < num; i++) {
						if (!this.length) break;
						list.push(this.randomRemove());
					}
					return list;
				}
				return this.splice(Math.floor(Math.random() * this.length), 1)[0];
			}
		});
		Object.defineProperty(Array.prototype, "randomSort", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function () {
				let list = [];
				while (this.length) {
					list.push(this.randomRemove());
				}
				for (let i = 0; i < list.length; i++) {
					this.push(list[i]);
				}
				return this;
			}
		});
		Object.defineProperty(Array.prototype, "sortBySeat", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (target) {
				lib.tempSortSeat = target;
				this.sort(lib.sort.seat);
				delete lib.tempSortSeat;
				return this;
			}
		});
		/**
		*@description 从数组中寻找某个特征最大的，且通过筛选的第一个元素
		 */
		Object.defineProperty(Array.prototype, "maxBy", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (sortBy, filter) {
				let list = this.filter(filter || (() => true));
				if (sortBy && typeof sortBy == "function") list.sort((a, b) => sortBy(a) - sortBy(b));
				else list.sort();
				return list[list.length - 1];
			}
		});
		Object.defineProperty(Array.prototype, "minBy", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: function (sortBy, filter) {
				let list = this.filter(filter || (() => true));
				if (sortBy && typeof sortBy == "function") list.sort((a, b) => sortBy(a) - sortBy(b));
				else list.sort();
				return list[0];
			}
		});
		window.onkeydown = function (e) {
			if (!ui.menuContainer || !ui.menuContainer.classList.contains("hidden")) {
				if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
					if (e.shiftKey) {
						if (confirm("是否重置游戏？")) {
							var noname_inited = localStorage.getItem("noname_inited");
							var onlineKey = localStorage.getItem(lib.configprefix + "key");
							localStorage.clear();
							if (noname_inited) {
								localStorage.setItem("noname_inited", noname_inited);
							}
							if (onlineKey) {
								localStorage.setItem(lib.configprefix + "key", onlineKey);
							}
							if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
							game.reload();
							return;
						}
					}
					else {
						game.reload();
					}
				}
				else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
					if (window.saveNonameInput) {
						window.saveNonameInput();
					}
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
				else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
					lib.node.debug();
				}
			}
			else {
				game.closePopped();
				var dialogs = document.querySelectorAll("#window>.dialog.popped:not(.static)");
				for (var i = 0; i < dialogs.length; i++) {
					dialogs[i].delete();
				}
				if (e.keyCode == 32) {
					var node = ui.window.querySelector("pausedbg");
					if (node) {
						node.click();
					}
					else {
						ui.click.pause();
					}
				}
				else if (e.keyCode == 65) {
					if (ui.auto) ui.auto.click();
				}
				else if (e.keyCode == 87) {
					if (ui.wuxie && ui.wuxie.style.display != "none") {
						ui.wuxie.classList.toggle("glow")
					}
					else if (ui.tempnowuxie) {
						ui.tempnowuxie.classList.toggle("glow")
					}
				}
				else if (e.keyCode == 116 || ((e.ctrlKey || e.metaKey) && e.keyCode == 82)) {
					if (e.shiftKey) {
						if (confirm("是否重置游戏？")) {
							var noname_inited = localStorage.getItem("noname_inited");
							var onlineKey = localStorage.getItem(lib.configprefix + "key");
							localStorage.clear();
							if (noname_inited) {
								localStorage.setItem("noname_inited", noname_inited);
							}
							if (onlineKey) {
								localStorage.setItem(lib.configprefix + "key", onlineKey);
							}
							if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
							game.reload();
							return;
						}
					}
					else {
						game.reload();
					}
				}
				else if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
				else if (e.keyCode == 74 && (e.ctrlKey || e.metaKey) && lib.node) {
					lib.node.debug();
				}
				// else if(e.keyCode==27){
				// 	if(!ui.arena.classList.contains("paused")) ui.click.config();
				// }
			}
		};
		window.onload = function () {
			if (lib.device) {
				var script = document.createElement("script");
				script.src = "cordova.js";
				document.body.appendChild(script);
				document.addEventListener("deviceready", function () {
					if (lib.init.cordovaReady) {
						lib.init.cordovaReady();
						delete lib.init.cordovaReady;
					}
				});
			}
			if (_status.packLoaded) {
				delete _status.packLoaded;
				lib.init.onload();
			}
			else {
				_status.windowLoaded = true;
			}
		};

		window.onerror = function (msg, src, line, column, err) {
			const winPath = window.__dirname ? ("file:///" + (__dirname.replace(new RegExp("\\\\", "g"), "/") + "/")) : "";
			let str = `错误文件: ${typeof src == "string" ? decodeURI(src).replace(lib.assetURL, "").replace(winPath, "") : "未知文件"}`;
			str += `\n错误信息: ${msg}`;
			const tip = lib.getErrorTip(msg);
			if (tip) str += `\n错误提示: ${tip}`;
			str += `\n行号: ${line}`;
			str += `\n列号: ${column}`;
			const version = lib.version || "";
			const reg = /[^\d.]/;
			const match = version.match(reg) != null;
			str += "\n" + `${match ? "游戏" : "无名杀"}版本: ${version || "未知版本"}`;
			if (match) str += "\n⚠️您使用的游戏代码不是源于libccy/noname无名杀官方仓库，请自行寻找您所使用的游戏版本开发者反馈！";
			if (_status && _status.event) {
				let evt = _status.event;
				str += `\nevent.name: ${evt.name}\nevent.step: ${evt.step}`;
				if (evt.parent) str += `\nevent.parent.name: ${evt.parent.name}\nevent.parent.step: ${evt.parent.step}`;
				if (evt.parent && evt.parent.parent) str += `\nevent.parent.parent.name: ${evt.parent.parent.name}\nevent.parent.parent.step: ${evt.parent.parent.step}`;
				if (evt.player || evt.target || evt.source || evt.skill || evt.card) {
					str += "\n-------------"
				}
				if (evt.player) {
					if (lib.translate[evt.player.name]) str += `\nplayer: ${lib.translate[evt.player.name]}[${evt.player.name}]`;
					else str += "\nplayer: " + evt.player.name;
					let distance = get.distance(_status.roundStart, evt.player, "absolute");
					if (distance != Infinity) {
						str += `\n座位号: ${distance + 1}`;
					}
				}
				if (evt.target) {
					if (lib.translate[evt.target.name]) str += `\ntarget: ${lib.translate[evt.target.name]}[${evt.target.name}]`;
					else str += "\ntarget: " + evt.target.name;
				}
				if (evt.source) {
					if (lib.translate[evt.source.name]) str += `\nsource: ${lib.translate[evt.source.name]}[${evt.source.name}]`;
					else str += "\nsource: " + evt.source.name;
				}
				if (evt.skill) {
					if (lib.translate[evt.skill]) str += `\nskill: ${lib.translate[evt.skill]}[${evt.skill}]`;
					else str += "\nskill: " + evt.skill;
				}
				if (evt.card) {
					if (lib.translate[evt.card.name]) str += `\ncard: ${lib.translate[evt.card.name]}[${evt.card.name}]`;
					else str += "\ncard: " + evt.card.name;
				}
			}
			str += "\n-------------";
			if (typeof line == "number" && (typeof game.readFile == "function" || location.origin != "file://")) {
				const createShowCode = function (lines) {
					let showCode = "";
					if (lines.length >= 10) {
						if (line > 4) {
							for (let i = line - 5; i < line + 6 && i < lines.length; i++) {
								showCode += `${i + 1}| ${line == i + 1 ? "⚠️" : ""}${lines[i]}\n`;
							}
						} else {
							for (let i = 0; i < line + 6 && i < lines.length; i++) {
								showCode += `${i + 1}| ${line == i + 1 ? "⚠️" : ""}${lines[i]}\n`;
							}
						}
					} else {
						showCode = lines.map((_line, i) => `${i + 1}| ${line == i + 1 ? "⚠️" : ""}${_line}\n`).toString();
					}
					return showCode;
				}
				//协议名须和html一致(网页端防跨域)，且文件是js 
				if (typeof src == "string" && src.startsWith(location.protocol) && src.endsWith(".js")) {
					//获取代码
					const codes = lib.init.reqSync("local:" + decodeURI(src).replace(lib.assetURL, "").replace(winPath, ""));
					const lines = codes.split("\n");
					str += "\n" + createShowCode(lines);
					str += "\n-------------";
				}
				//解析parsex里的content fun内容(通常是技能content) 
				else if (err && err.stack && err.stack.split("\n")[1].trim().startsWith("at Object.eval [as content]")) {
					const codes = _status.event.content;
					if (typeof codes == "function") {
						const lines = codes.toString().split("\n");
						str += "\n" + createShowCode(lines);
						str += "\n-------------";
					}
				}
			}
			if (err && err.stack) str += "\n" + decodeURI(err.stack).replace(new RegExp(lib.assetURL, "g"), "").replace(new RegExp(winPath, "g"), "");
			alert(str);
			window.ea = Array.from(arguments);
			window.em = msg;
			window.el = line;
			window.ec = column;
			window.eo = err;
			game.print(str);
			if (!lib.config.errstop) {
				_status.withError = true;
				game.loop();
			}
		};

		if (window.noname_update) {
			lib.version = window.noname_update.version;
			lib.changeLog = window.noname_update.changeLog;
			if (window.noname_update.players) {
				lib.changeLog.push("players://" + JSON.stringify(window.noname_update.players));
			}
			if (window.noname_update.cards) {
				lib.changeLog.push("cards://" + JSON.stringify(window.noname_update.cards));
			}
			delete window.noname_update;
		}
		var noname_inited = localStorage.getItem("noname_inited");
		if (noname_inited && noname_inited !== "nodejs") {
			var ua = userAgent;
			if (ua.includes("android")) {
				lib.device = "android";
			}
			else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("macintosh")) {
				lib.device = "ios";
			}
		}

		if (lib.assetURL.includes("com.widget.noname.qingyao") || lib.assetURL.includes("online.nonamekill.android")) {
			alert("您正在一个不受信任的闭源客户端上运行《无名杀》。建议您更换为其他开源的无名杀客户端，避免给您带来不必要的损失。");
		}

		var config3 = null;
		var proceed = function (config2) {
			if (config3 === null) {
				config3 = config2;
				return;
			}
			if (config2.mode) lib.config.mode = config2.mode;
			if (lib.config.mode_config[lib.config.mode] == undefined) lib.config.mode_config[lib.config.mode] = {};
			for (var i in lib.config.mode_config.global) {
				if (lib.config.mode_config[lib.config.mode][i] == undefined) {
					lib.config.mode_config[lib.config.mode][i] = lib.config.mode_config.global[i];
				}
			}
			if (lib.config.characters) {
				lib.config.defaultcharacters = lib.config.characters.slice(0);
			}
			if (lib.config.cards) {
				lib.config.defaultcards = lib.config.cards.slice(0);
			}
			for (var i in config2) {
				if (i.includes("_mode_config")) {
					var thismode = i.substr(i.indexOf("_mode_config") + 13);
					if (!lib.config.mode_config[thismode]) {
						lib.config.mode_config[thismode] = {};
					}
					lib.config.mode_config[thismode][i.substr(0, i.indexOf("_mode_config"))] = config2[i];
				}
				else {
					lib.config[i] = config2[i];
				}
			}
			for (var i in lib.config.translate) {
				lib.translate[i] = lib.config.translate[i];
			}

			lib.config.all.characters = [];
			lib.config.all.cards = [];
			lib.config.all.plays = [];
			lib.config.all.mode = [];

			if (lib.config.debug) {
				lib.init.js(lib.assetURL + "game", "asset", function () {
					lib.skin = window.noname_skin_list;
					delete window.noname_skin_list;
					delete window.noname_asset_list;
				});
			}

			if (window.isNonameServer) {
				lib.config.mode = "connect";
			}
			var pack = window.noname_package;
			delete window.noname_package;
			for (i in pack.character) {
				if (lib.config.all.sgscharacters.contains(i) || lib.config.hiddenCharacterPack.indexOf(i) == -1) {
					lib.config.all.characters.push(i);
					lib.translate[i + "_character_config"] = pack.character[i];
				}
			}
			for (i in pack.card) {
				if (lib.config.all.sgscards.contains(i) || lib.config.hiddenCardPack.indexOf(i) == -1) {
					lib.config.all.cards.push(i);
					lib.translate[i + "_card_config"] = pack.card[i];
				}
			}
			for (i in pack.play) {
				lib.config.all.plays.push(i);
				lib.translate[i + "_play_config"] = pack.play[i];
			}
			for (i in pack.submode) {
				for (var j in pack.submode[i]) {
					lib.translate[i + "|" + j] = pack.submode[i][j];
				}
			}

			if (!lib.config.gameRecord) {
				lib.config.gameRecord = {};
			}
			for (i in pack.mode) {
				if (lib.config.hiddenModePack.indexOf(i) == -1) {
					lib.config.all.mode.push(i);
					lib.translate[i] = pack.mode[i];
					if (!lib.config.gameRecord[i]) {
						lib.config.gameRecord[i] = { data: {} };
					}
				}
			}
			if (lib.config.all.mode.length == 0) {
				lib.config.all.mode.push("identity");
				lib.translate.identity = "身份";
				if (!lib.config.gameRecord.identity) {
					lib.config.gameRecord.identity = { data: {} };
				}
			}
			if (pack.background) {
				for (i in pack.background) {
					if (lib.config.hiddenBackgroundPack.contains(i)) continue;
					lib.configMenu.appearence.config.image_background.item[i] = pack.background[i];
				}
				for (var i = 0; i < lib.config.customBackgroundPack.length; i++) {
					var link = lib.config.customBackgroundPack[i];
					lib.configMenu.appearence.config.image_background.item[link] = link.slice(link.indexOf("_") + 1);
				}
				lib.configMenu.appearence.config.image_background.item.default = "默认";
			}
			if (pack.music) {
				if (lib.device || typeof window.require == "function") {
					lib.configMenu.audio.config.background_music.item.music_custom = "自定义音乐";
				}
				lib.config.all.background_music = ["music_default"];
				for (i in pack.music) {
					lib.config.all.background_music.push(i);
					lib.configMenu.audio.config.background_music.item[i] = pack.music[i];
				}
				if (lib.config.customBackgroundMusic) {
					for (i in lib.config.customBackgroundMusic) {
						lib.config.all.background_music.push(i);
						lib.configMenu.audio.config.background_music.item[i] = lib.config.customBackgroundMusic[i];
					}
				}
				lib.configMenu.audio.config.background_music.item.music_random = "随机播放";
				lib.configMenu.audio.config.background_music.item.music_off = "关闭";
			}
			if (pack.theme) {
				for (i in pack.theme) {
					lib.configMenu.appearence.config.theme.item[i] = pack.theme[i];
				}
			}
			if (lib.config.extension_sources) {
				for (i in lib.config.extension_sources) {
					lib.configMenu.general.config.extension_source.item[i] = i;
				}
			}

			if (pack.font) {
				ui.css.fontsheet = lib.init.sheet();
				const appearenceConfig = lib.configMenu.appearence.config, fontSheet = ui.css.fontsheet.sheet, suitsFont = lib.config.suits_font;
				Object.keys(pack.font).forEach(value => {
					const font = pack.font[value];
					appearenceConfig.name_font.item[value] = font;
					appearenceConfig.identity_font.item[value] = font;
					appearenceConfig.cardtext_font.item[value] = font;
					appearenceConfig.global_font.item[value] = font;
					fontSheet.insertRule(`@font-face {font-family: "${value}"; src: local("${font}"), url("${lib.assetURL}font/${value}.woff2");}`, 0);
					if (suitsFont) fontSheet.insertRule(`@font-face {font-family: "${value}"; src: local("${font}"), url("${lib.assetURL}font/suits.woff2");}`, 0);
				});
				if (suitsFont) fontSheet.insertRule(`@font-face {font-family: "Suits"; src: url("${lib.assetURL}font/suits.woff2");}`, 0);
				fontSheet.insertRule(`@font-face {font-family: "NonameSuits"; src: url("${lib.assetURL}font/suits.woff2");}`, 0);
				fontSheet.insertRule(`@font-face {font-family: "MotoyaLMaru"; src: url("${lib.assetURL}font/motoyamaru.woff2");}`, 0)
				appearenceConfig.cardtext_font.item.default = "默认";
				appearenceConfig.global_font.item.default = "默认";
			}

			var ua = userAgent;
			if ("ontouchstart" in document) {
				if (!lib.config.totouched) {
					game.saveConfig("totouched", true);
					if (lib.device) {
						game.saveConfig("low_performance", true);
						game.saveConfig("confirm_exit", true);
						game.saveConfig("touchscreen", true);
						game.saveConfig("fold_mode", false);
						if (ua.indexOf("ipad") == -1) {
							game.saveConfig("phonelayout", true);
						}
						else if (lib.device == "ios") {
							game.saveConfig("show_statusbar_ios", "overlay");
						}
					}
					else if (confirm("是否切换到触屏模式？（触屏模式可提高触屏设备的响应速度，但无法使用鼠标）")) {
						game.saveConfig("touchscreen", true);
						if (ua.includes("iphone") || ua.includes("android")) {
							game.saveConfig("phonelayout", true);
						}
						game.reload();
					}
				}
			}
			else if (lib.config.touchscreen) {
				game.saveConfig("touchscreen", false);
			}
			if (!lib.config.toscrolled && ua.includes("macintosh")) {
				game.saveConfig("toscrolled", true);
				game.saveConfig("mousewheel", false);
			}

			var show_splash = lib.config.show_splash;
			if (show_splash == "off") {
				show_splash = false;
			}
			else if (show_splash == "init") {
				if (localStorage.getItem("show_splash_off")) {
					show_splash = false;
				}
			}
			localStorage.removeItem("show_splash_off");
			var extensionlist = [];
			if (!localStorage.getItem(lib.configprefix + "disable_extension")) {
				if (lib.config.extensions && lib.config.extensions.length) {
					window.resetExtension = function () {
						for (var i = 0; i < lib.config.extensions.length; i++) {
							game.saveConfig("extension_" + lib.config.extensions[i] + "_enable", false);
						}
						localStorage.setItem(lib.configprefix + "disable_extension", true);
					}
				}
				for (var i = 0; i < lib.config.plays.length; i++) {
					if (lib.config.all.plays.includes(lib.config.plays[i])) {
						extensionlist.push(lib.config.plays[i]);
					}
				}
				var alerted = false;
				for (var i = 0; i < lib.config.extensions.length; i++) {
					if (window.bannedExtensions.contains(lib.config.extensions[i])) {
						//if(!alerted) alert("读取某些扩展时出现问题。");
						alerted = true;
						continue;
					}
					var extcontent = localStorage.getItem(lib.configprefix + "extension_" + lib.config.extensions[i]);
					if (extcontent) {
						//var backup_onload=lib.init.onload;
						_status.evaluatingExtension = true;
						try {
							eval(extcontent);
						}
						catch (e) {
							console.log(e);
						}
						//lib.init.onload=backup_onload;
						_status.evaluatingExtension = false;
					}
					else if (lib.config.mode != "connect" || (!localStorage.getItem(lib.configprefix + "directstart") && show_splash)) {
						extensionlist.push(lib.config.extensions[i]);
					}
				}
			}
			else {
				if (lib.config.mode != "connect" || (!localStorage.getItem(lib.configprefix + "directstart") && show_splash)) {
					var alerted = false;
					for (var i = 0; i < lib.config.extensions.length; i++) {
						if (window.bannedExtensions.contains(lib.config.extensions[i])) {
							//if(!alerted) alert("读取某些扩展时出现问题。");
							alerted = true;
							continue;
						}
						game.import("extension", { name: lib.config.extensions[i] });
					}
				}
			}
			const loadPack = () => {
				const isArray = Array.isArray;
				if (isArray(lib.onprepare) && lib.onprepare.length) {
					_status.onprepare = Object.freeze(lib.onprepare.map(fn => {
						if (typeof fn != "function") return;
						return (gnc.is.generatorFunc(fn) ? gnc.of(fn) : fn)();
					}));
				}
				let toLoad = lib.config.all.cards.length + lib.config.all.characters.length + 1;
				if (_status.javaScriptExtensions) toLoad += _status.javaScriptExtensions.reduce((constructingToLoad, javaScriptExtension) => {
					const lengths = Object.values(javaScriptExtension).reduce((constructingLengths, value) => {
						if (isArray(value)) constructingLengths.push(value.length);
						return constructingLengths;
					}, []);
					if (!lengths.length) return constructingToLoad + 1;
					return constructingToLoad + Math.min(...lengths);
				}, 0);
				const packLoaded = gnc.of(function* () {
					toLoad--;
					if (toLoad) return;
					if (_status.importing) {
						let promises = lib.creation.array;
						for (const type in _status.importing) {
							promises.addArray(_status.importing[type])
						}
						yield Promise.allSettled(promises);
						delete _status.importing;
					}
					if (_status.windowLoaded) {
						delete _status.windowLoaded;
						lib.init.onload();
					}
					else _status.packLoaded = true;
				});
				if (localStorage.getItem(`${lib.configprefix}playback`)) {
					toLoad++;
					lib.init.js(`${lib.assetURL}mode`, lib.config.mode, packLoaded, packLoaded);
				}
				else if ((localStorage.getItem(`${lib.configprefix}directstart`) || !show_splash) && lib.config.all.mode.includes(lib.config.mode)) {
					toLoad++;
					lib.init.js(`${lib.assetURL}mode`, lib.config.mode, packLoaded, packLoaded);
				}
				lib.init.js(`${lib.assetURL}card`, lib.config.all.cards, packLoaded, packLoaded);
				lib.init.js(`${lib.assetURL}character`, lib.config.all.characters, packLoaded, packLoaded);
				lib.init.js(`${lib.assetURL}character`, "rank", packLoaded, packLoaded);
				if (!_status.javaScriptExtensions) return;
				const loadJavaScriptExtension = (javaScriptExtension, pathArray, fileArray, onLoadArray, onErrorArray, index) => {
					if (!pathArray && !fileArray && !onLoadArray && !onErrorArray) {
						lib.init.js(javaScriptExtension.path, javaScriptExtension.file, () => {
							if (typeof javaScriptExtension.onload == "function") javaScriptExtension.onload();
							packLoaded();
						}, () => {
							if (typeof javaScriptExtension.onerror == "function") javaScriptExtension.onerror();
							packLoaded();
						});
						return;
					}
					if (typeof index != "number") index = 0;
					if (pathArray && index >= javaScriptExtension.path.length) return;
					if (fileArray && index >= javaScriptExtension.file.length) return;
					if (onLoadArray && index >= javaScriptExtension.onload.length) return;
					if (onErrorArray && index >= javaScriptExtension.onerror.length) return;
					const path = pathArray ? javaScriptExtension.path[index] : javaScriptExtension.path;
					const file = fileArray ? javaScriptExtension.file[index] : javaScriptExtension.file;
					const onLoad = onLoadArray ? javaScriptExtension.onload[index] : javaScriptExtension.onload;
					const onError = onErrorArray ? javaScriptExtension.onerror[index] : javaScriptExtension.onerror;
					const javaScriptExtensionOnLoad = () => {
						if (typeof onLoad == "function") onLoad();
						loadJavaScriptExtension(javaScriptExtension, pathArray, fileArray, onLoadArray, onErrorArray, index + 1);
						packLoaded();
					}, jsExtOnError = () => {
						if (typeof onError == "function") onError();
						loadJavaScriptExtension(javaScriptExtension, pathArray, fileArray, onLoadArray, onErrorArray, index + 1);
						packLoaded();
					};
					lib.init.js(path, file, javaScriptExtensionOnLoad, jsExtOnError);
				};
				_status.javaScriptExtensions.forEach(javaScriptExtension => {
					const pathArray = isArray(javaScriptExtension.path);
					const fileArray = isArray(javaScriptExtension.file);
					const onLoadArray = isArray(javaScriptExtension.onLoad);
					const onErrorArray = isArray(javaScriptExtension.onError);
					loadJavaScriptExtension(javaScriptExtension, pathArray, fileArray, onLoadArray, onErrorArray);
				});
			};

			var layout = lib.config.layout;
			if (layout == "default" || lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
				layout = "mobile";
			}
			if (layout == "phone") {
				layout = "mobile";
				game.saveConfig("layout", "mobile");
				game.saveConfig("phonelayout", true);
			}
			game.layout = layout;
			if (lib.config.image_background_random) {
				if (_status.htmlbg) {
					game.saveConfig("image_background", _status.htmlbg);
				}
				else {
					var list = [];
					for (var i in lib.configMenu.appearence.config.image_background.item) {
						if (i == "default") continue;
						list.push(i);
					}
					game.saveConfig("image_background", list.randomGet(lib.config.image_background));
				}
				lib.init.background();
			}
			delete _status.htmlbg;

			window.game = game;
			// node:path library alternative
			if (typeof module != "object" || typeof module.exports != "object") lib.init.js(`${lib.assetURL}game`, "path", () => {
				lib.path = window._noname_path;
				delete window._noname_path;
			}, e => {
				console.log(e);
			});
			var styleToLoad = 6;
			var styleLoaded = gnc.of(function* () {
				--styleToLoad;
				if (styleToLoad == 0) {
					if (extensionlist.length && (lib.config.mode != "connect" || show_splash)) {
						_status.extensionLoading = [];
						let extToLoad = extensionlist.length;
						const extLoaded = gnc.of(function* () {
							--extToLoad;
							if (extToLoad == 0) {
								yield Promise.allSettled(_status.extensionLoading);
								_status.extensionLoaded.filter(Boolean).forEach(name => {
									lib.announce.publish("Noname.Init.Extension.onLoad", name);
									lib.announce.publish(`Noname.Init.Extension.${name}.onLoad`, void 0);
								});
								delete _status.extensionLoading;
								loadPack();
							}
						});
						//读取扩展
						var alerted = false;
						for (var i = 0; i < extensionlist.length; i++) {
							if (window.bannedExtensions.contains(extensionlist[i])) {
								alerted = true;
								--extToLoad;
								if (extToLoad == 0) {
									yield Promise.allSettled(_status.extensionLoading);
									delete _status.extensionLoading;
									loadPack();
								}
								continue;
							}
							lib.init.js(lib.assetURL + "extension/" + extensionlist[i], "extension", extLoaded, (function (i) {
								return gnc.of(function* () {
									game.removeExtension(i);
									--extToLoad;
									if (extToLoad == 0) {
										yield Promise.allSettled(_status.extensionLoading);
										delete _status.extensionLoading;
										loadPack();
									}
								});
							}(extensionlist[i])));
						}
					}
					else {
						loadPack();
					}
				}
			});
			if (lib.config.layout == "default") {
				lib.config.layout = "mobile";
			}
			ui.css.layout = lib.init.css(lib.assetURL + "layout/" + layout, "layout", styleLoaded);
			if (get.is.phoneLayout()) {
				ui.css.phone = lib.init.css(lib.assetURL + "layout/default", "phone", styleLoaded);
			}
			else {
				ui.css.phone = lib.init.css();
				styleToLoad--;
			}
			ui.css.theme = lib.init.css(lib.assetURL + "theme/" + lib.config.theme, "style", styleLoaded);
			ui.css.card_style = lib.init.css(lib.assetURL + "theme/style/card", lib.config.card_style, styleLoaded);
			ui.css.cardback_style = lib.init.css(lib.assetURL + "theme/style/cardback", lib.config.cardback_style, styleLoaded);
			ui.css.hp_style = lib.init.css(lib.assetURL + "theme/style/hp", lib.config.hp_style, styleLoaded);

			if (lib.config.player_style && lib.config.player_style != "default" && lib.config.player_style != "custom") {
				var str = "";
				switch (lib.config.player_style) {
					case "wood": str = `url("${lib.assetURL}theme/woodden/wood.jpg")`; break;
					case "music": str = "linear-gradient(#4b4b4b, #464646)"; break;
					case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))"; break;
				}
				ui.css.player_stylesheet = lib.init.sheet("#window .player{background-image:" + str + "}");
			}
			if (lib.config.border_style && lib.config.border_style != "default" && lib.config.border_style != "custom" && lib.config.border_style != "auto") {
				ui.css.border_stylesheet = lib.init.sheet();
				var bstyle = lib.config.border_style;
				if (bstyle.startsWith("dragon_")) {
					bstyle = bstyle.slice(7);
				}
				ui.css.border_stylesheet.sheet.insertRule(`#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("${lib.assetURL}theme/style/player/${bstyle}1.png")}`, 0);
				ui.css.border_stylesheet.sheet.insertRule(`#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("${lib.assetURL}theme/style/player/${bstyle}3.png")}`, 0);
				ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
			}
			if (lib.config.control_style && lib.config.control_style != "default" && lib.config.control_style != "custom") {
				var str = "";
				switch (lib.config.control_style) {
					case "wood": str = `url("${lib.assetURL}theme/woodden/wood.jpg")`; break;
					case "music": str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px"; break;
					case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px"; break;
				}
				if (lib.config.control_style == "wood") {
					ui.css.control_stylesheet = lib.init.sheet("#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:" + str + "}");
				}
				else {
					ui.css.control_stylesheet = lib.init.sheet("#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:" + str + "}");
				}
			}
			if (lib.config.menu_style && lib.config.menu_style != "default" && lib.config.menu_style != "custom") {
				var str = "";
				switch (lib.config.menu_style) {
					case "wood": str = `url("${lib.assetURL}theme/woodden/wood2.png")`; break;
					case "music": str = "linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px"; break;
					case "simple": str = "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px"; break;
				}
				ui.css.menu_stylesheet = lib.init.sheet("html #window>.dialog.popped,html .menu,html .menubg{background-image:" + str + "}");
			}

			lib.config.duration = 500;

			if (!lib.config.touchscreen) {
				document.addEventListener("mousewheel", ui.click.windowmousewheel, { passive: true });
				document.addEventListener("mousemove", ui.click.windowmousemove);
				document.addEventListener("mousedown", ui.click.windowmousedown);
				document.addEventListener("mouseup", ui.click.windowmouseup);
				document.addEventListener("contextmenu", ui.click.right);
			}
			else {
				document.addEventListener("touchstart", ui.click.touchconfirm);
				document.addEventListener("touchstart", ui.click.windowtouchstart);
				document.addEventListener("touchend", ui.click.windowtouchend);
				document.addEventListener("touchmove", ui.click.windowtouchmove);
			}
		};
		var proceed2 = () => {
			if (config3) {
				proceed(config3);
			}
			else {
				config3 = true;
			}
		};

		ui.css = {
			menu: lib.init.css(lib.assetURL + "layout/default", "menu", function () {
				ui.css.default = lib.init.css(lib.assetURL + "layout/default", "layout");
				proceed2();
			})
		};

		if (lib.device) {
			lib.init.cordovaReady = function () {
				if (lib.device == "android") {
					document.addEventListener("pause", function () {
						if (!_status.paused2 && (typeof _status.event.isMine == "function" && !_status.event.isMine())) {
							ui.click.pause();
						}
						if (ui.backgroundMusic) {
							ui.backgroundMusic.pause();
						}
					});
					document.addEventListener("resume", () => {
						if (ui.backgroundMusic) ui.backgroundMusic.play();
					});
					document.addEventListener("backbutton", function () {
						if (ui.arena && ui.arena.classList.contains("menupaused")) {
							if (window.saveNonameInput) {
								window.saveNonameInput();
							}
							else {
								ui.click.configMenu();
							}
						}
						else if (lib.config.confirm_exit) {
							navigator.notification.confirm(
								"是否退出游戏？",
								function (index) {
									switch (index) {
										case 2: game.reload(); break;
										case 3: navigator.app.exitApp(); break;
									}
								},
								"确认退出",
								["取消", "重新开始", "退出"]
							);
						}
						else {
							navigator.app.exitApp();
						}
					});
					if ("cordova" in window && "plugins" in window.cordova && "permissions" in window.cordova.plugins) {
						const permissions = cordova.plugins.permissions;
						const requests = ["WRITE_EXTERNAL_STORAGE", "READ_EXTERNAL_STORAGE"]
						requests.forEach(request => {
							permissions.checkPermission(permissions[request], status => {
								if (!status.hasPermission) {
									permissions.requestPermission(permissions[request], lib.other.ignore, lib.other.ignore);
								}
							}, lib.other.ignore);
						});
					}
				}
				game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
					if (!url.startsWith("http")) {
						url = get.url(dev) + url;
					}
					var fileTransfer = new FileTransfer();
					folder = lib.assetURL + folder;
					if (onprogress) {
						fileTransfer.onprogress = function (progressEvent) {
							onprogress(progressEvent.loaded, progressEvent.total);
						};
					}
					lib.config.brokenFile.add(folder);
					game.saveConfigValue("brokenFile");
					fileTransfer.download(encodeURI(url), encodeURI(folder), function () {
						lib.config.brokenFile.remove(folder);
						game.saveConfigValue("brokenFile");
						if (onsuccess) {
							onsuccess();
						}
					}, onerror);
				};
				game.readFile = function (filename, callback, onerror) {
					window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
						entry.getFile(filename, {}, function (fileEntry) {
							fileEntry.file(function (fileToLoad) {
								var fileReader = new FileReader();
								fileReader.onload = function (e) {
									callback(e.target.result);
								};
								fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
							}, onerror);
						}, onerror);
					}, onerror);
				};
				game.readFileAsText = function (filename, callback, onerror) {
					window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
						entry.getFile(filename, {}, function (fileEntry) {
							fileEntry.file(function (fileToLoad) {
								var fileReader = new FileReader();
								fileReader.onload = function (e) {
									callback(e.target.result);
								};
								fileReader.readAsText(fileToLoad, "UTF-8");
							}, onerror);
						}, onerror);
					}, onerror);
				};
				game.writeFile = function (data, path, name, callback) {
					game.ensureDirectory(path, function () {
						if (Object.prototype.toString.call(data) == "[object File]") {
							var fileReader = new FileReader();
							fileReader.onload = function (e) {
								game.writeFile(e.target.result, path, name, callback);
							};
							fileReader.readAsArrayBuffer(data, "UTF-8");
						}
						else {
							window.resolveLocalFileSystemURL(lib.assetURL + path, function (entry) {
								entry.getFile(name, { create: true }, function (fileEntry) {
									fileEntry.createWriter(function (fileWriter) {
										fileWriter.onwriteend = callback;
										fileWriter.write(data);
									}, callback);
								}, callback);
							}, callback);
						}
					});
				};
				game.removeFile = function (dir, callback) {
					window.resolveLocalFileSystemURL(lib.assetURL, function (entry) {
						entry.getFile(dir, {}, function (fileEntry) {
							fileEntry.remove();
							if (callback) callback();
						}, callback || (() => void 0));
					}, callback || (() => void 0));
				};
				game.getFileList = (dir, success, failure) => {
					var files = [], folders = [];
					window.resolveLocalFileSystemURL(lib.assetURL + dir, entry => {
						var dirReader = entry.createReader();
						var entries = [];
						var readEntries = () => {
							dirReader.readEntries(results => {
								if (!results.length) {
									entries.sort();
									for (var i = 0; i < entries.length; i++) {
										if (entries[i].isDirectory) {
											folders.push(entries[i].name);
										}
										else {
											files.push(entries[i].name);
										}
									}
									success(folders, files);
								}
								else {
									entries = entries.concat(Array.from(results));
									readEntries();
								}
							}, failure);
						};
						readEntries();
					}, failure);
				};
				game.ensureDirectory = (list, callback, file) => {
					const directoryList = typeof list == "string" ? [list] : list.slice().reverse(), num = file ? 1 : 0, access = (entry, directory, createDirectory) => {
						if (directory.length <= num) {
							createDirectory();
							return;
						}
						const str = directory.pop();
						return new Promise((resolve, reject) => entry.getDirectory(str, {
							create: false
						}, resolve, reject)).catch(() => new Promise(resolve => entry.getDirectory(str, {
							create: true
						}, resolve))).then(directoryEntry => access(directoryEntry, directory, createDirectory));
					};
					return new Promise((resolve, reject) => window.resolveLocalFileSystemURL(lib.assetURL, rootEntry => {
						const createDirectory = () => {
							if (directoryList.length) access(rootEntry, directoryList.pop().split("/").reverse(), createDirectory);
							if (typeof callback == "function") callback();
							resolve();
						};
						createDirectory();
					}, reject));
				};
				if (ui.updateUpdate) {
					ui.updateUpdate();
				}
				var showbar = function () {
					if (window.StatusBar) {
						if (lib.device == "android") {
							if (lib.config.show_statusbar_android) {
								window.StatusBar.overlaysWebView(false);
								window.StatusBar.backgroundColorByName("black");
								window.StatusBar.show();
							}
						}
						else if (lib.device == "ios") {
							if (lib.config.show_statusbar_ios != "off" && lib.config.show_statusbar_ios != "auto") {
								if (lib.config.show_statusbar_ios == "default") {
									window.StatusBar.overlaysWebView(false);
								}
								else {
									window.StatusBar.overlaysWebView(true);
								}
								window.StatusBar.backgroundColorByName("black");
								window.StatusBar.show();
							}
						}
					}
				}
				if (lib.arenaReady) {
					lib.arenaReady.push(showbar);
				}
				else {
					showbar();
				}
			};
		}
		else if (typeof window.require == "function") {
			lib.node = {
				fs: require("fs"),
				path: require("path"),
				debug: function () {
					require("electron").remote.getCurrentWindow().toggleDevTools();
				}
			};
			lib.path = lib.node.path;
			game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
				if (!url.startsWith("http")) {
					url = get.url(dev) + url;
				}
				game.ensureDirectory(folder, function () {
					try {
						var file = lib.node.fs.createWriteStream(__dirname + "/" + folder);
					}
					catch (e) {
						onerror();
					}
					lib.config.brokenFile.add(folder);
					game.saveConfigValue("brokenFile");
					if (!lib.node.http) lib.node.http = require("http");
					if (!lib.node.https) lib.node.https = require("https");
					var opts = require("url").parse(encodeURI(url));
					opts.headers = { "User-Agent": "AppleWebkit" };
					(url.startsWith("https") ? lib.node.https : lib.node.http).get(opts, function (response) {
						var stream = response.pipe(file);
						stream.on("finish", function () {
							lib.config.brokenFile.remove(folder);
							game.saveConfigValue("brokenFile");
							if (onsuccess) {
								onsuccess();
							}
						});
						stream.on("error", onerror);
						if (onprogress) {
							var streamInterval = setInterval(function () {
								if (stream.closed) {
									clearInterval(streamInterval);
								}
								else {
									onprogress(stream.bytesWritten);
								}
							}, 200);
						}
					});
				}, true);
			};
			game.readFile = function (filename, callback, onerror) {
				lib.node.fs.readFile(__dirname + "/" + filename, function (err, data) {
					if (err) {
						onerror(err);
					}
					else {
						callback(data);
					}
				});
			};
			game.readFileAsText = function (filename, callback, onerror) {
				lib.node.fs.readFile(__dirname + "/" + filename, "utf-8", function (err, data) {
					if (err) {
						onerror(err);
					}
					else {
						callback(data);
					}
				});
			};
			game.writeFile = function (data, path, name, callback) {
				game.ensureDirectory(path, function () {
					if (Object.prototype.toString.call(data) == "[object File]") {
						var fileReader = new FileReader();
						fileReader.onload = function (e) {
							game.writeFile(e.target.result, path, name, callback);
						};
						fileReader.readAsArrayBuffer(data, "UTF-8");
					}
					else {
						get.zip(function (zip) {
							zip.file("i", data);
							lib.node.fs.writeFile(__dirname + "/" + path + "/" + name, zip.files.i.asNodeBuffer(), null, callback);
						});
					}
				});
			};
			game.removeFile = function (filename, callback) {
				lib.node.fs.unlink(__dirname + "/" + filename, callback || (() => void 0));
			};
			game.getFileList = (dir, success, failure) => {
				var files = [], folders = [];
				dir = __dirname + "/" + dir;
				if (typeof failure == "undefined") {
					failure = err => {
						throw err;
					};
				}
				else if (failure == null) {
					failure = () => void 0;
				}
				try {
					lib.node.fs.readdir(dir, (err, filelist) => {
						if (err) {
							failure(err);
							return;
						}
						for (var i = 0; i < filelist.length; i++) {
							if (filelist[i][0] != "." && filelist[i][0] != "_") {
								if (lib.node.fs.statSync(dir + "/" + filelist[i]).isDirectory()) {
									folders.push(filelist[i]);
								}
								else {
									files.push(filelist[i]);
								}
							}
						}
						success(folders, files);
					});
				}
				catch (e) {
					failure(e);
				}
			};
			game.ensureDirectory = (list, callback, file) => {
				const directoryList = typeof list == "string" ? [list] : list.slice().reverse(), number = file ? 1 : 0, access = (path, directory, createDirectory) => {
					if (directory.length <= number) {
						createDirectory();
						return;
					}
					path += `/${directory.pop()}`;
					const fullPath = `${__dirname}${path}`;
					return new Promise((resolve, reject) => lib.node.fs.access(fullPath, errnoException => {
						if (errnoException) reject();
						else resolve();
					})).catch(() => new Promise((resolve, reject) => lib.node.fs.mkdir(fullPath, errnoException => {
						if (errnoException) reject(errnoException);
						else resolve();
					}))).then(() => access(path, directory, createDirectory), console.log);
				};
				return new Promise(resolve => {
					const createDirectory = () => {
						if (directoryList.length) access("", directoryList.pop().split("/").reverse(), createDirectory);
						else {
							if (typeof callback == "function") callback();
							resolve();
						}
					};
					createDirectory();
				});
			};
			if (ui.updateUpdate) {
				ui.updateUpdate();
			}
		}
		else {
			//为其他自定义平台提供文件读写函数赋值的一种方式。
			//但这种方式只能修改game的文件读写函数。
			if (window.initReadWriteFunction) {
				const g = {};
				const ReadWriteFunctionName = ["download", "readFile", "readFileAsText", "writeFile", "removeFile", "getFileList", "ensureDirectory", "createDir"];
				ReadWriteFunctionName.forEach(prop => {
					Object.defineProperty(g, prop, {
						configurable: true,
						get() { return undefined; },
						set(newValue) {
							if (typeof newValue == "function") {
								delete g[prop];
								g[prop] = game[prop] = newValue;
							}
						}
					})
				});
				window.initReadWriteFunction(g);
			}
			window.onbeforeunload = function () {
				if (lib.config.confirm_exit && !_status.reloading) {
					return "是否离开游戏？"
				}
				else {
					return null;
				}
			};
		}

		lib.config = window.config;
		lib.configOL = {};
		delete window.config;
		let config2;
		if (localStorage.getItem(`${lib.configprefix}nodb`)) window.nodb = true;
		if (window.indexedDB && !window.nodb) new Promise((resolve, reject) => {
			const idbOpenDBRequest = window.indexedDB.open(`${lib.configprefix}data`, 4);
			idbOpenDBRequest.onerror = reject;
			idbOpenDBRequest.onsuccess = resolve;
			idbOpenDBRequest.onupgradeneeded = idbVersionChangeEvent => {
				const idbDatabase = idbVersionChangeEvent.target.result;
				if (!idbDatabase.objectStoreNames.contains("video")) idbDatabase.createObjectStore("video", {
					keyPath: "time"
				});
				if (!idbDatabase.objectStoreNames.contains("image")) idbDatabase.createObjectStore("image");
				if (!idbDatabase.objectStoreNames.contains("audio")) idbDatabase.createObjectStore("audio");
				if (!idbDatabase.objectStoreNames.contains("config")) idbDatabase.createObjectStore("config");
				if (!idbDatabase.objectStoreNames.contains("data")) idbDatabase.createObjectStore("data");
			};
		}).then(event => {
			lib.db = event.target.result;
			return game.getDB("config");
		}).then(object => {
			if (!object.storageImported) {
				try {
					config2 = JSON.parse(localStorage.getItem(`${lib.configprefix}config`));
					if (!config2 || typeof config2 != "object") throw "err";
				}
				catch (err) {
					config2 = {};
				}
				Object.keys(config2).forEach(key => game.saveConfig(key, config2[key]));
				Object.keys(lib.mode).forEach(key => {
					try {
						config2 = JSON.parse(localStorage.getItem(`${lib.configprefix}${key}`));
						if (!config2 || typeof config2 != "object" || get.is.empty(config2)) throw "err";
					}
					catch (err) {
						config2 = false;
					}
					localStorage.removeItem(`${lib.configprefix}${key}`);
					if (config2) game.putDB("data", key, config2);
				});
				game.saveConfig("storageImported", true);
				lib.init.background();
				localStorage.removeItem(`${lib.configprefix}config`);
			}
			else config2 = object;
			proceed(config2);
		});
		else {
			try {
				config2 = JSON.parse(localStorage.getItem(lib.configprefix + "config"));
				if (!config2 || typeof config2 != "object") throw "err"
			}
			catch (err) {
				config2 = {};
				localStorage.setItem(lib.configprefix + "config", JSON.stringify({}));
			}
			proceed(config2);
		}
	}

	static reset() {
		if (window.inSplash) return;
		if (window.resetExtension) {
			if (confirm("游戏似乎未正常载入，有可能因为部分扩展未正常载入，或者因为部分扩展未载入完毕。\n是否禁用扩展并重新打开？")) {
				window.resetExtension();
				window.location.reload();
			}
		}
		else {
			if (lib.device) {
				if (navigator.notification) {
					navigator.notification.confirm(
						"游戏似乎未正常载入，是否重置游戏？",
						function (index) {
							if (index == 2) {
								localStorage.removeItem("noname_inited");
								window.location.reload();
							}
							else if (index == 3) {
								var noname_inited = localStorage.getItem("noname_inited");
								var onlineKey = localStorage.getItem(lib.configprefix + "key");
								localStorage.clear();
								if (noname_inited) {
									localStorage.setItem("noname_inited", noname_inited);
								}
								if (onlineKey) {
									localStorage.setItem(lib.configprefix + "key", onlineKey);
								}
								if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
								setTimeout(function () {
									window.location.reload();
								}, 200);
							}
						},
						"确认退出",
						["取消", "重新下载", "重置设置"]
					);
				}
				else {
					if (confirm("游戏似乎未正常载入，是否重置游戏？")) {
						localStorage.removeItem("noname_inited");
						window.location.reload();
					}
				}
			}
			else {
				if (confirm("游戏似乎未正常载入，是否重置游戏？")) {
					var onlineKey = localStorage.getItem(lib.configprefix + "key");
					localStorage.clear();
					if (onlineKey) {
						localStorage.setItem(lib.configprefix + "key", onlineKey);
					}
					if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + "data");
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}
			}
		}
	}

	static onload = gnc.of(function* () {
		const libOnload = lib.onload;
		delete lib.onload;
		while (Array.isArray(libOnload) && libOnload.length) {
			const fun = libOnload.shift();
			if (typeof fun != "function") continue;
			yield (gnc.is.generatorFunc(fun) ? gnc.of(fun) : fun)();
		}
		ui.updated();
		game.documentZoom = game.deviceZoom;
		if (game.documentZoom != 1) {
			ui.updatez();
		}
		ui.background = ui.create.div(".background");
		ui.background.style.backgroundSize = "cover";
		ui.background.style.backgroundPosition = "50% 50%";
		if (lib.config.image_background && lib.config.image_background != "default" && !lib.config.image_background.startsWith("custom_")) {
			ui.background.setBackgroundImage("image/background/" + lib.config.image_background + ".jpg");
			if (lib.config.image_background_blur) {
				ui.background.style.filter = "blur(8px)";
				ui.background.style.webkitFilter = "blur(8px)";
				ui.background.style.transform = "scale(1.05)";
			}
		}
		document.documentElement.style.backgroundImage = "";
		document.documentElement.style.backgroundSize = "";
		document.documentElement.style.backgroundPosition = "";
		document.body.insertBefore(ui.background, document.body.firstChild);
		document.body.onresize = ui.updatexr;
		if (lib.config.touchscreen) {
			document.body.addEventListener("touchstart", function (e) {
				this.startX = e.touches[0].clientX / game.documentZoom;
				this.startY = e.touches[0].clientY / game.documentZoom;
				_status.dragged = false;
			});
			document.body.addEventListener("touchmove", function (e) {
				if (_status.dragged) return;
				if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 ||
					Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
					_status.dragged = true;
				}
			});
		}

		if (lib.config.image_background.startsWith("custom_")) {
			ui.background.style.backgroundImage = "none";
			game.getDB("image", lib.config.image_background, function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					ui.background.style.backgroundImage = "url(" + data + ")";
					if (lib.config.image_background_blur) {
						ui.background.style.filter = "blur(8px)";
						ui.background.style.webkitFilter = "blur(8px)";
						ui.background.style.transform = "scale(1.05)";
					}
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.card_style == "custom") {
			game.getDB("image", "card_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.card_stylesheet) {
						ui.css.card_stylesheet.remove();
					}
					ui.css.card_stylesheet = lib.init.sheet(".card:not(*:empty){background-image:url(" + fileLoadedEvent.target.result + ")}");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.cardback_style == "custom") {
			game.getDB("image", "cardback_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.cardback_stylesheet) {
						ui.css.cardback_stylesheet.remove();
					}
					ui.css.cardback_stylesheet = lib.init.sheet(".card:empty,.card.infohidden{background-image:url(" + fileLoadedEvent.target.result + ")}");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "cardback_style2", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.cardback_stylesheet2) {
						ui.css.cardback_stylesheet2.remove();
					}
					ui.css.cardback_stylesheet2 = lib.init.sheet(".card.infohidden:not(.infoflip){background-image:url(" + fileLoadedEvent.target.result + ")}");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.hp_style == "custom") {
			game.getDB("image", "hp_style1", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet1) {
						ui.css.hp_stylesheet1.remove();
					}
					ui.css.hp_stylesheet1 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style2", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet2) {
						ui.css.hp_stylesheet2.remove();
					}
					ui.css.hp_stylesheet2 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style3", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet3) {
						ui.css.hp_stylesheet3.remove();
					}
					ui.css.hp_stylesheet3 = lib.init.sheet(`.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(${fileLoadedEvent.target.result})}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB("image", "hp_style4", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet4) {
						ui.css.hp_stylesheet4.remove();
					}
					ui.css.hp_stylesheet4 = lib.init.sheet(".hp:not(.text):not(.actcount)>.lost{background-image:url(" + fileLoadedEvent.target.result + ")}");
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.player_style == "custom") {
			ui.css.player_stylesheet = lib.init.sheet("#window .player{background-image:none;background-size:100% 100%;}");
			game.getDB("image", "player_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.player_stylesheet) {
						ui.css.player_stylesheet.remove();
					}
					ui.css.player_stylesheet = lib.init.sheet(`#window .player{background-image:url("${fileLoadedEvent.target.result}");background-size:100% 100%;}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.border_style == "custom") {
			game.getDB("image", "border_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.border_stylesheet) {
						ui.css.border_stylesheet.remove();
					}
					ui.css.border_stylesheet = lib.init.sheet();
					ui.css.border_stylesheet.sheet.insertRule(`#window .player>.framebg{display:block;background-image:url("${fileLoadedEvent.target.result}")}`, 0);
					ui.css.border_stylesheet.sheet.insertRule(".player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}", 0);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.control_style == "custom") {
			game.getDB("image", "control_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.control_stylesheet) {
						ui.css.control_stylesheet.remove();
					}
					ui.css.control_stylesheet = lib.init.sheet(`#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("${fileLoadedEvent.target.result}")}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.menu_style == "custom") {
			game.getDB("image", "menu_style", function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.menu_stylesheet) {
						ui.css.menu_stylesheet.remove();
					}
					ui.css.menu_stylesheet = lib.init.sheet(`html #window>.dialog.popped,html .menu,html .menubg{background-image:url("${fileLoadedEvent.target.result}");background-size:cover}`);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}

		var proceed2 = gnc.of(function* () {
			var mode = lib.imported.mode;
			var card = lib.imported.card;
			var character = lib.imported.character;
			var play = lib.imported.play;
			delete window.game;
			var i, j, k;
			for (i in mode[lib.config.mode].element) {
				if (!lib.element[i]) lib.element[i] = [];
				for (j in mode[lib.config.mode].element[i]) {
					if (j == "init") {
						if (!lib.element[i].inits) lib.element[i].inits = [];
						lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
					}
					else {
						lib.element[i][j] = mode[lib.config.mode].element[i][j];
					}
				}
			}
			for (i in mode[lib.config.mode].ai) {
				if (typeof mode[lib.config.mode].ai[i] == "object") {
					if (ai[i] == undefined) ai[i] = {};
					for (j in mode[lib.config.mode].ai[i]) {
						ai[i][j] = mode[lib.config.mode].ai[i][j];
					}
				}
				else {
					ai[i] = mode[lib.config.mode].ai[i];
				}
			}
			for (i in mode[lib.config.mode].ui) {
				if (typeof mode[lib.config.mode].ui[i] == "object") {
					if (ui[i] == undefined) ui[i] = {};
					for (j in mode[lib.config.mode].ui[i]) {
						ui[i][j] = mode[lib.config.mode].ui[i][j];
					}
				}
				else {
					ui[i] = mode[lib.config.mode].ui[i];
				}
			}
			for (i in mode[lib.config.mode].game) {
				game[i] = mode[lib.config.mode].game[i];
			}
			for (i in mode[lib.config.mode].get) {
				get[i] = mode[lib.config.mode].get[i];
			}
			lib.init.start = mode[lib.config.mode].start;
			lib.init.startBefore = mode[lib.config.mode].startBefore;
			if (game.onwash) {
				lib.onwash.push(game.onwash);
				delete game.onwash;
			}
			if (game.onover) {
				lib.onover.push(game.onover);
				delete game.onover;
			}
			lib.config.banned = lib.config[lib.config.mode + "_banned"] || [];
			lib.config.bannedcards = lib.config[lib.config.mode + "_bannedcards"] || [];

			lib.rank = window.noname_character_rank;
			delete window.noname_character_rank;
			for (i in mode[lib.config.mode]) {
				if (i == "element") continue;
				if (i == "game") continue;
				if (i == "ai") continue;
				if (i == "ui") continue;
				if (i == "get") continue;
				if (i == "config") continue;
				if (i == "onreinit") continue;
				if (i == "start") continue;
				if (i == "startBefore") continue;
				if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][i])) ? [] : {};
				for (j in mode[lib.config.mode][i]) {
					lib[i][j] = mode[lib.config.mode][i][j];
				}
			}
			if (typeof mode[lib.config.mode].init == "function") {
				mode[lib.config.mode].init();
			}

			var connectCharacterPack = [];
			var connectCardPack = [];
			for (i in character) {
				if (character[i].character) {
					const characterPack = lib.characterPack[i];
					if (characterPack) Object.assign(characterPack, character[i].character);
					else lib.characterPack[i] = character[i].character;
				}
				for (j in character[i]) {
					if (j == "mode" || j == "forbid") continue;
					if (j == "connect") {
						connectCharacterPack.push(i);
						continue;
					}
					if (j == "character" && !lib.config.characters.contains(i) && lib.config.mode != "connect") {
						if (lib.config.mode == "chess" && get.config("chess_mode") == "leader" && get.config("chess_leader_allcharacter")) {
							for (k in character[i][j]) {
								lib.hiddenCharacters.push(k);
							}
						}
						else if (lib.config.mode != "boss" || i != "boss") {
							continue;
						}
					}
					if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
						lib[j].addArray(character[i][j]);
						continue;
					}
					for (k in character[i][j]) {
						if (j == "character") {
							if (!character[i][j][k][4]) {
								character[i][j][k][4] = [];
							}
							if (character[i][j][k][4].contains("boss") ||
								character[i][j][k][4].contains("hiddenboss")) {
								lib.config.forbidai.add(k);
							}
							if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
								lib.config.forbidai.add(k);
							}
							for (var l = 0; l < character[i][j][k][3].length; l++) {
								lib.skilllist.add(character[i][j][k][3][l]);
							}
						}
						if (j == "skill" && k[0] == "_" && (lib.config.mode != "connect" ? (!lib.config.characters.contains(i)) : (!character[i].connect))) {
							continue;
						}
						if (j == "translate" && k == i) {
							lib[j][k + "_character_config"] = character[i][j][k];
						}
						else {
							if (lib[j][k] == undefined) {
								if (j == "skill" && !character[i][j][k].forceLoad && lib.config.mode == "connect" && !character[i].connect) {
									lib[j][k] = {
										nopop: character[i][j][k].nopop,
										derivation: character[i][j][k].derivation
									};
								}
								else {
									Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(character[i][j], k));
								}
								if (j == "card" && lib[j][k].derivation) {
									if (!lib.cardPack.mode_derivation) {
										lib.cardPack.mode_derivation = [k];
									}
									else {
										lib.cardPack.mode_derivation.push(k);
									}
								}
							}
							else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
								lib[j][k].addArray(character[i][j][k]);
							}
							else {
								console.log(
									`dublicate ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`,
									lib[j][k],
									`\ncharacter.${i}.${j}.${k}`,
									character[i][j][k]
								);
							}
						}
					}
				}
			}
			var connect_avatar_list = [];
			for (var i in lib.character) {
				connect_avatar_list.push(i);
			}
			connect_avatar_list.sort(lib.sort.capt);
			for (var i = 0; i < connect_avatar_list.length; i++) {
				var ia = connect_avatar_list[i];
				lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
			}
			if (lib.config.mode != "connect") {
				var pilecfg = lib.config.customcardpile[get.config("cardpilename") || "当前牌堆"];
				if (pilecfg) {
					lib.config.bannedpile = get.copy(pilecfg[0] || {});
					lib.config.addedpile = get.copy(pilecfg[1] || {});
				}
				else {
					lib.config.bannedpile = {};
					lib.config.addedpile = {};
				}
			}
			else {
				lib.cardPackList = {};
			}
			for (i in card) {
				const cardPack = lib.cardPack[i] ? lib.cardPack[i] : lib.cardPack[i] = [];
				if (card[i].card) {
					for (var j in card[i].card) {
						if (!card[i].card[j].hidden && card[i].translate[j + "_info"]) {
							cardPack.push(j);
						}
					}
				}
				for (j in card[i]) {
					if (j == "mode" || j == "forbid") continue;
					if (j == "connect") {
						connectCardPack.push(i);
						continue;
					}
					if (j == "list") {
						if (lib.config.mode == "connect") {
							const cardPackList = lib.cardPackList[i];
							if (cardPackList) cardPackList.addArray(card[i][j]);
							else lib.cardPackList[i] = card[i][j];
						}
						else {
							if (lib.config.cards.contains(i)) {
								var pile;
								if (typeof card[i][j] == "function") {
									pile = card[i][j]();
								}
								else {
									pile = card[i][j];
								}
								const cardPile = lib.cardPile[i];
								if (cardPile) cardPile.addArray(pile);
								else lib.cardPile[i] = pile.slice(0);
								if (lib.config.bannedpile[i]) {
									for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
										pile[lib.config.bannedpile[i][k]] = null;
									}
								}
								for (var k = 0; k < pile.length; k++) {
									if (!pile[k]) {
										pile.splice(k--, 1);
									}
								}
								if (lib.config.addedpile[i]) {
									for (var k = 0; k < lib.config.addedpile[i].length; k++) {
										pile.push(lib.config.addedpile[i][k]);
									}
								}
								lib.card.list.addArray(pile);
							}
						}
					}
					else {
						for (k in card[i][j]) {
							if (j == "skill" && k[0] == "_" && !card[i][j][k].forceLoad && (lib.config.mode != "connect" ? (!lib.config.cards.contains(i)) : (!card[i].connect))) {
								continue;
							}
							if (j == "translate" && k == i) {
								lib[j][k + "_card_config"] = card[i][j][k];
							}
							else {
								if (lib[j][k] == undefined) {
									if (j == "skill" && !card[i][j][k].forceLoad && lib.config.mode == "connect" && !card[i].connect) {
										lib[j][k] = {
											nopop: card[i][j][k].nopop,
											derivation: card[i][j][k].derivation
										};
									}
									else {
										Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(card[i][j], k));
									}
								}
								else {
									console.log(
										`dublicate ${j} in card ${i}:\n${k}:\nlib.${j}.${k}`,
										lib[j][k],
										`\ncard.${i}.${j}.${k}`,
										card[i][j][k]
									);
								}
								if (j == "card" && lib[j][k].derivation) {
									if (!lib.cardPack.mode_derivation) {
										lib.cardPack.mode_derivation = [k];
									}
									else {
										lib.cardPack.mode_derivation.push(k);
									}
								}
							}
						}
					}
				}
			}
			if (lib.cardPack.mode_derivation) {
				for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
					if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation == "string" && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
						lib.cardPack.mode_derivation.splice(i--, 1);
					}
					else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == "string" && !lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)) {
						lib.cardPack.mode_derivation.splice(i--, 1);
					}
				}
				if (lib.cardPack.mode_derivation.length == 0) {
					delete lib.cardPack.mode_derivation;
				}
			}
			if (lib.config.mode != "connect") {
				for (i in play) {
					if (lib.config.hiddenPlayPack.contains(i)) continue;
					if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
					if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
					for (j in play[i].element) {
						if (!lib.element[j]) lib.element[j] = [];
						for (k in play[i].element[j]) {
							if (k == "init") {
								if (!lib.element[j].inits) lib.element[j].inits = [];
								lib.element[j].inits.push(play[i].element[j][k]);
							}
							else {
								lib.element[j][k] = play[i].element[j][k];
							}
						}
					}
					for (j in play[i].ui) {
						if (typeof play[i].ui[j] == "object") {
							if (ui[j] == undefined) ui[j] = {};
							for (k in play[i].ui[j]) {
								ui[j][k] = play[i].ui[j][k];
							}
						}
						else {
							ui[j] = play[i].ui[j];
						}
					}
					for (j in play[i].game) {
						game[j] = play[i].game[j];
					}
					for (j in play[i].get) {
						get[j] = play[i].get[j];
					}
					for (j in play[i]) {
						if (j == "mode" || j == "forbid" || j == "init" || j == "element" ||
							j == "game" || j == "get" || j == "ui" || j == "arenaReady") continue;
						for (k in play[i][j]) {
							if (j == "translate" && k == i) {
								// lib[j][k+"_play_config"]=play[i][j][k];
							}
							else {
								if (lib[j][k] != undefined) {
									console.log(
										`dublicate ${j} in play ${i}:\n${k}:\nlib.${j}.${k}`,
										lib[j][k],
										`\nplay.${i}.${j}.${k}`,
										play[i][j][k]
									);
								}
								lib[j][k] = play[i][j][k];
							}
						}
					}
					if (typeof play[i].init == "function") play[i].init();
					if (typeof play[i].arenaReady == "function") lib.arenaReady.push(play[i].arenaReady);
				}
			}

			lib.connectCharacterPack = [];
			lib.connectCardPack = [];
			for (var i = 0; i < lib.config.all.characters.length; i++) {
				var packname = lib.config.all.characters[i];
				if (connectCharacterPack.contains(packname)) {
					lib.connectCharacterPack.push(packname)
				}
			}
			for (var i = 0; i < lib.config.all.cards.length; i++) {
				var packname = lib.config.all.cards[i];
				if (connectCardPack.contains(packname)) {
					lib.connectCardPack.push(packname)
				}
			}
			if (lib.config.mode != "connect") {
				for (i = 0; i < lib.card.list.length; i++) {
					if (lib.card.list[i][2] == "huosha") {
						lib.card.list[i] = lib.card.list[i].slice(0);
						lib.card.list[i][2] = "sha";
						lib.card.list[i][3] = "fire";
					}
					else if (lib.card.list[i][2] == "leisha") {
						lib.card.list[i] = lib.card.list[i].slice(0);
						lib.card.list[i][2] = "sha";
						lib.card.list[i][3] = "thunder";
					}
					if (!lib.card[lib.card.list[i][2]]) {
						lib.card.list.splice(i, 1); i--;
					}
					else if (lib.card[lib.card.list[i][2]].mode &&
						lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
						lib.card.list.splice(i, 1); i--;
					}
				}
			}

			if (lib.config.mode == "connect") {
				_status.connectMode = true;
			}
			if (window.isNonameServer) {
				lib.cheat.i();
			}
			else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
				lib.cheat.i();
			}
			lib.config.sort_card = get.sortCard(lib.config.sort);
			delete lib.imported.character;
			delete lib.imported.card;
			delete lib.imported.mode;
			delete lib.imported.play;
			for (var i in lib.init) {
				if (i.startsWith("setMode_")) {
					delete lib.init[i];
				}
			}
			if (!_status.connectMode) {
				for (var i = 0; i < lib.extensions.length; i++) {
					try {
						_status.extension = lib.extensions[i][0];
						_status.evaluatingExtension = lib.extensions[i][3];
						if (typeof lib.extensions[i][1] == "function")
							yield (gnc.is.coroutine(lib.extensions[i][1]) ? gnc.of(lib.extensions[i][1]) : lib.extensions[i][1]).call(lib.extensions[i], lib.extensions[i][2], lib.extensions[i][4]);
						if (lib.extensions[i][4]) {
							if (lib.extensions[i][4].character) {
								for (var j in lib.extensions[i][4].character.character) {
									game.addCharacterPack(get.copy(lib.extensions[i][4].character));
									break;
								}
							}
							if (lib.extensions[i][4].card) {
								for (var j in lib.extensions[i][4].card.card) {
									game.addCardPack(get.copy(lib.extensions[i][4].card));
									break;
								}
							}
							if (lib.extensions[i][4].skill) {
								for (var j in lib.extensions[i][4].skill.skill) {
									game.addSkill(j, lib.extensions[i][4].skill.skill[j],
										lib.extensions[i][4].skill.translate[j],
										lib.extensions[i][4].skill.translate[j + "_info"],
										lib.extensions[i][4].skill.translate[j + "_append"],
										lib.extensions[i][4].skill.translate[j + "_ab"]);
								}
							}
						}
						delete _status.extension;
						delete _status.evaluatingExtension;
					}
					catch (e) {
						console.log(e);
					}
				}
			}
			delete lib.extensions;

			if (lib.init.startBefore) {
				lib.init.startBefore();
				delete lib.init.startBefore;
			}
			ui.create.arena();
			game.createEvent("game", false).setContent(lib.init.start);
			if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
				var startstr = mode[lib.config.mode].start.toString();
				if (startstr.indexOf("onfree") == -1) {
					setTimeout(lib.init.onfree, 500);
				}
			}
			delete lib.init.start;
			if (Array.isArray(_status.onprepare) && _status.onprepare.length) {
				yield Promise.allSettled(_status.onprepare);
				delete _status.onprepare;
			}
			game.loop();
		})
		var proceed = gnc.of(function* () {
			if (!lib.db) {
				try {
					lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
					if (typeof lib.storage != "object") throw ("err");
					if (lib.storage == null) throw ("err");
				}
				catch (err) {
					lib.storage = {};
					localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
				}
				yield proceed2();
			}
			else {
				game.getDB("data", lib.config.mode, function (obj) {
					lib.storage = obj || {};
					proceed2();
				});
			}
		});
		if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
			window.inSplash = true;
			clearTimeout(window.resetGameTimeout);
			delete window.resetGameTimeout;
			var clickedNode = false;
			var clickNode = function () {
				if (clickedNode) return;
				this.classList.add("clicked");
				clickedNode = true;
				lib.config.mode = this.link;
				game.saveConfig("mode", this.link);
				if (this.link == "connect") {
					localStorage.setItem(lib.configprefix + "directstart", true);
					game.reload();
				}
				else {
					if (game.layout != "mobile" && lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
						game.layout = "mobile";
						ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
					}
					else if (game.layout == "mobile" && lib.config.layout != "mobile" && lib.layoutfixed.indexOf(lib.config.mode) === -1) {
						game.layout = lib.config.layout;
						if (game.layout == "default") {
							ui.css.layout.href = "";
						}
						else {
							ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
						}
					}
					splash.delete(1000);
					delete window.inSplash;
					window.resetGameTimeout = setTimeout(lib.init.reset, 10000);

					this.listenTransition(function () {
						lib.init.js(lib.assetURL + "mode", lib.config.mode, proceed);
					}, 500);
				}
			}
			var downNode = function () {
				this.classList.add("glow");
			}
			var upNode = function () {
				this.classList.remove("glow");
			}
			var splash = ui.create.div("#splash", document.body);
			if (lib.config.touchscreen) {
				splash.classList.add("touch");
				lib.setScroll(splash);
			}
			if (lib.config.player_border != "wide") {
				splash.classList.add("slim");
			}
			splash.dataset.radius_size = lib.config.radius_size;
			for (var i = 0; i < lib.config.all.mode.length; i++) {
				var node = ui.create.div(".hidden", splash, clickNode);
				node.link = lib.config.all.mode[i];
				ui.create.div(node, ".splashtext", get.verticalStr(get.translation(lib.config.all.mode[i])));
				if (lib.config.all.stockmode.includes(lib.config.all.mode[i])) {
					// 初始启动页设置
					if (lib.config.splash_style == undefined) game.saveConfig("splash_style", "style1");
					splash.dataset.splash_style = lib.config.splash_style;
					// 扩展可通过window.splashurl设置素材读取路径
					if (window.splashurl == undefined) window.splashurl = "image/splash/";
					if (lib.config.splash_style == "style1" || lib.config.splash_style == "style2") {
						ui.create.div(node, ".avatar").setBackgroundImage("image/splash/" + lib.config.splash_style + "/" + lib.config.all.mode[i] + ".jpg");
					} else {
						ui.create.div(node, ".avatar").setBackgroundImage(splashurl + lib.config.splash_style + "/" + lib.config.all.mode[i] + ".jpg");
					}
				}
				else {
					var avatarnode = ui.create.div(node, ".avatar");
					var avatarbg = lib.mode[lib.config.all.mode[i]].splash;
					if (avatarbg.startsWith("ext:")) {
						avatarnode.setBackgroundImage(avatarbg.replace(/^ext:/, "extension/"));
					}
					else {
						avatarnode.setBackgroundDB(avatarbg);
					}
				}
				if (!lib.config.touchscreen) {
					node.addEventListener("mousedown", downNode);
					node.addEventListener("mouseup", upNode);
					node.addEventListener("mouseleave", upNode);
				}
				setTimeout((function (node) {
					return function () {
						node.show();
					}
				}(node)), i * 100);
			}
			if (lib.config.mousewheel) {
				splash.onmousewheel = ui.click.mousewheel;
			}
		}
		else {
			yield proceed();
		}
		localStorage.removeItem(lib.configprefix + "directstart");
		delete lib.init.init;
		const libOnload2 = lib.onload2;
		delete lib.onload2;
		while (Array.isArray(libOnload2) && libOnload2.length) {
			const fun = libOnload2.shift();
			if (typeof fun != "function") continue;
			yield (gnc.is.generatorFunc(fun) ? gnc.of(fun) : fun)();
		}
	})

	static startOnline() {
		"step 0"
		event._resultid = null;
		event._result = null;
		game.pause();
		"step 1"
		if (result) {
			if (event._resultid) {
				result.id = event._resultid;
			}
			game.send("result", result);
		}
		event.goto(0);
	}

	static onfree() {
		if (lib.onfree) {
			clearTimeout(window.resetGameTimeout);
			delete window.resetGameTimeout;
			if (!game.syncMenu) {
				delete window.resetExtension;
				localStorage.removeItem(lib.configprefix + "disable_extension");
			}

			if (game.removeFile && lib.config.brokenFile.length) {
				while (lib.config.brokenFile.length) {
					game.removeFile(lib.config.brokenFile.shift());
				}
				game.saveConfigValue("brokenFile");
			}

			var onfree = lib.onfree;
			delete lib.onfree;
			var loop = function () {
				if (onfree.length) {
					(onfree.shift())();
					setTimeout(loop, 100);
				}
			};
			setTimeout(loop, 500);
			if (!_status.new_tutorial) game.saveConfig("menu_loadondemand", true, lib.config.mode);
		}
	}

	static connection(ws) {
		const client = new lib.element.Client(ws);
		lib.node.clients.push(client);
		if (window.isNonameServer) {
			document.querySelector("#server_count").innerHTML = lib.node.clients.length;
		}
		ws.on("message", function (messagestr) {
			var message;
			try {
				message = JSON.parse(messagestr);
				if (!Array.isArray(message) ||
					typeof lib.message.server[message[0]] !== "function") {
					throw ("err");
				}
				for (var i = 1; i < message.length; i++) {
					message[i] = get.parsedResult(message[i]);
				}
			}
			catch (e) {
				console.log(e);
				console.log("invalid message: " + messagestr);
				return;
			}
			lib.message.server[message.shift()].apply(client, message);
		});
		ws.on("close", function () {
			client.close();
		});
		client.send("opened");
	}

	static sheet() {
		var style = document.createElement("style");
		document.head.appendChild(style);
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "string") {
				style.sheet.insertRule(arguments[i], 0);
			}
		}
		return style;
	}

	static css(path, file, before) {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		if (path) {
			if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
			if (file) path = `${path}${/^db:extension-[^:]*$/.test(path) ? ":" : "/"}${file}.css`;
			(path.startsWith("db:") ? game.getDB("image", path.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(path))).then(resolvedPath => {
				style.href = resolvedPath;
				if (typeof before == "function") {
					style.addEventListener("load", before);
					document.head.appendChild(style);
				}
				else if (before) document.head.insertBefore(style, before);
				else document.head.appendChild(style);
			});
		}
		return style;
	}

	/**
	 * 在扩展的precontent中调用，用于加载扩展必需的JS文件。
	 * If any of the parameters is an Array, corresponding files will be loaded in order
	 * 如果任意参数为数组，则按顺序加载加载相应的文件
	 */
	static jsForExtension(path, file, onLoad, onError) {
		if (!_status.javaScriptExtensions) _status.javaScriptExtensions = [];
		_status.javaScriptExtensions.push({
			path: path,
			file: file,
			onLoad: onLoad,
			onError: onError
		});
	}

	static js(path, file, onLoad, onError) {
		if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			file.forEach(value => lib.init.js(path, value, onLoad, onError));
			return;
		}
		let scriptSource = file ? `${path}${/^db:extension-[^:]*$/.test(path) ? ":" : "/"}${file}.js` : path;
		if (path.startsWith("http")) scriptSource += `?rand=${get.id()}`;
		else if (lib.config.fuck_sojson && scriptSource.includes("extension") != -1 && scriptSource.startsWith(lib.assetURL)) {
			const pathToRead = scriptSource.slice(lib.assetURL.length);
			const alertMessage = `检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`;
			if (typeof game.readFileAsText == "function") game.readFileAsText(pathToRead, result => {
				if (result.includes("sojson") || result.includes("jsjiami") || result.includes("var _0x")) alert(alertMessage);
			}, () => void 0);
			else if (location.origin != "file://") lib.init.reqSync(pathToRead, function () {
				const result = this.responseText;
				if (result.includes("sojson") || result.includes("jsjiami") || result.includes("var _0x")) alert(alertMessage);
			}, () => void 0);
		}
		const script = document.createElement("script");
		(scriptSource.startsWith("db:") ? game.getDB("image", scriptSource.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(scriptSource))).then(resolvedScriptSource => {
			script.src = resolvedScriptSource;
			if (path.startsWith("http")) script.addEventListener("load", () => script.remove());
			document.head.appendChild(script);
			if (typeof onLoad == "function") script.addEventListener("load", onLoad);
			if (typeof onError == "function") script.addEventListener("error", onError);
		});
		return script;
	}

	/**
	 * 同步lib.init.js
	 * @returns { void }
	 */
	static jsSync(path, file, onLoad, onError) {
		if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
			const e = new Error("浏览器file协议下无法使用此api，请在http/https协议下使用此api");
			if (typeof onError == "function") onError(e);
			else throw e;
			return;
		}
		if (path[path.length - 1] == "/") path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			return file.forEach(value => lib.init.jsSync(path, value, onLoad, onError));
		}
		let scriptSource;
		if (!file) scriptSource = path;
		else scriptSource = `${path}/${file}.js`;
		if (path.startsWith("http")) scriptSource += `?rand=${get.id()}`;
		const xmlHttpRequest = new XMLHttpRequest();
		let data;
		xmlHttpRequest.addEventListener("load", () => {
			data = xmlHttpRequest.responseText;
			if (!data) {
				if (typeof onError == "function") onError(new Error(`${scriptSource}加载失败！`));
				return;
			}
			if (lib.config.fuck_sojson && scriptSource.includes("extension") != -1 && scriptSource.startsWith(lib.assetURL)) {
				const pathToRead = scriptSource.slice(lib.assetURL.length);
				if (data.includes("sojson") || data.includes("jsjiami") || data.includes("var _0x")) alert(`检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`);
			}
			try {
				window.eval(data);
				if (typeof onLoad == "function") onLoad();
			}
			catch (error) {
				if (typeof onError == "function") onError(error);
			}
		});
		if (typeof onError == "function") xmlHttpRequest.addEventListener("error", onError);
		xmlHttpRequest.open("GET", scriptSource, false);
		xmlHttpRequest.send();
	}

	static req(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith("http")) sScriptURL = str;
		else if (str.startsWith("local:")) {
			if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
				const e = new Error("浏览器file协议下无法使用此api，请在http/https协议下使用此api");
				if (typeof onerror == "function") onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		}
		else {
			let url = get.url(master);
			if (url[url.length - 1] != "/") url += "/";
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function") oReq.addEventListener("load", onload);
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL);
		oReq.send();
	}

	/**
	 * 同步lib.init.req
	 */
	static reqSync(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith("http")) sScriptURL = str;
		else if (str.startsWith("local:")) {
			if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
				const e = new Error("浏览器file协议下无法使用此api，请在http/https协议下使用此api");
				if (typeof onerror == "function") onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		}
		else {
			let url = get.url(master);
			if (url[url.length - 1] != "/") url += "/";
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function") oReq.addEventListener("load", onload);
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL, false);
		oReq.send();
		if (typeof onload !== "function") return oReq.responseText;
	}

	static json(url, onload, onerror) {
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function") oReq.addEventListener("load", () => {
			let result;
			try {
				result = JSON.parse(oReq.responseText);
				if (!result) throw ("err");
			}
			catch (e) {
				if (typeof onerror == "function") onerror(e);
				return;
			}
			onload(result);
		});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", url);
		oReq.send();
	}

	/**
	 * 同步lib.init.json
	 */
	static jsonSync(url, onload, onerror) {
		if (lib.assetURL.length == 0 && location.origin == "file://" && typeof game.readFile == "undefined") {
			const e = new Error("浏览器file协议下无法使用此api，请在http/https协议下使用此api");
			if (typeof onerror == "function") onerror(e);
			else throw e;
			return;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == "function") oReq.addEventListener("load", () => {
			let result;
			try {
				result = JSON.parse(oReq.responseText);
				if (!result) throw ("err");
			}
			catch (e) {
				if (typeof onerror == "function") onerror(e);
				return;
			}
			onload(result);
		});
		if (typeof onerror == "function") oReq.addEventListener("error", onerror);
		oReq.open("GET", url, false);
		oReq.send();
	}

	static cssstyles() {
		if (ui.css.styles) {
			ui.css.styles.remove();
		}
		ui.css.styles = lib.init.sheet();
		ui.css.styles.sheet.insertRule("#arena .player>.name,#arena .button.character>.name {font-family: " + (lib.config.name_font || "xinwei") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule("#arena .player>.name,.button.character>.name {font-family: " + (lib.config.name_font || "xinwei") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule("#arena .player .identity>div {font-family: " + (lib.config.identity_font || "huangcao") + ",xinwei}", 0);
		ui.css.styles.sheet.insertRule(".button.character.newstyle>.identity {font-family: " + (lib.config.identity_font || "huangcao") + ",xinwei}", 0);
		if (lib.config.cardtext_font && lib.config.cardtext_font != "default") {
			ui.css.styles.sheet.insertRule(".card div:not(.info):not(.background) {font-family: " + lib.config.cardtext_font + ";}", 0);
		}
		if (lib.config.global_font && lib.config.global_font != "default") {
			ui.css.styles.sheet.insertRule("#window {font-family: " + lib.config.global_font + ",xinwei}", 0);
			ui.css.styles.sheet.insertRule("#window #control{font-family: STHeiti,SimHei,Microsoft JhengHei,Microsoft YaHei,WenQuanYi Micro Hei,Suits,Helvetica,Arial,sans-serif}", 0);
		}
		switch (lib.config.glow_phase) {
			case "yellow": ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(217, 152, 62) 0 0 15px, rgb(217, 152, 62) 0 0 15px !important;}", 0); break;
			case "green": ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(10, 155, 67, 1) 0 0 15px, rgba(10, 155, 67, 1) 0 0 15px !important;}", 0); break;
			case "purple": ui.css.styles.sheet.insertRule("#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(189, 62, 170) 0 0 15px, rgb(189, 62, 170) 0 0 15px !important;}", 0); break;
		}
	}

	static layout(layout, nosave) {
		const loadingScreen = ui.create.div(".loading-screen", document.body), loadingScreenStyle = loadingScreen.style;
		loadingScreenStyle.animationDuration = "1s";
		loadingScreenStyle.animationFillMode = "forwards";
		loadingScreenStyle.animationName = "opacity-0-1";
		if (layout == "default") layout = "mobile";
		if (!nosave) game.saveConfig("layout", layout);
		game.layout = layout;
		ui.arena.hide();
		new Promise(resolve => setTimeout(resolve, 500)).then(() => {
			if (game.layout == "default") {
				ui.css.layout.href = "";
			}
			else {
				ui.css.layout.href = lib.assetURL + "layout/" + game.layout + "/layout.css";
			}
			if (game.layout == "mobile" || game.layout == "long") {
				ui.arena.classList.add("mobile");
			}
			else {
				ui.arena.classList.remove("mobile");
			}
			if (game.layout == "mobile" || game.layout == "long" || game.layout == "long2" || game.layout == "nova") {
				if (game.me && game.me.node.handcards2.childNodes.length) {
					while (game.me.node.handcards2.childNodes.length) {
						game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
					}
				}
			}
			if (game.layout == "default") {
				ui.arena.classList.add("oldlayout");
			}
			else {
				ui.arena.classList.remove("oldlayout");
			}
			if (lib.config.cardshape == "oblong" && (game.layout == "long" || game.layout == "mobile" || game.layout == "long2" || game.layout == "nova")) {
				ui.arena.classList.add("oblongcard");
				ui.window.classList.add("oblongcard");
			}
			else {
				ui.arena.classList.remove("oblongcard");
				ui.window.classList.remove("oblongcard");
			}
			//if(lib.config.textequip=="text"&&(game.layout=="long"||game.layout=="mobile")){
			if (game.layout == "long" || game.layout == "mobile") {
				ui.arena.classList.add("textequip");
			}
			else {
				ui.arena.classList.remove("textequip");
			}
			if (get.is.phoneLayout()) {
				ui.css.phone.href = lib.assetURL + "layout/default/phone.css";
				ui.arena.classList.add("phone");
			}
			else {
				ui.css.phone.href = "";
				ui.arena.classList.remove("phone");
			}
			for (var i = 0; i < game.players.length; i++) {
				if (get.is.linked2(game.players[i])) {
					if (game.players[i].classList.contains("linked")) {
						game.players[i].classList.remove("linked");
						game.players[i].classList.add("linked2");
					}
				}
				else {
					if (game.players[i].classList.contains("linked2")) {
						game.players[i].classList.remove("linked2");
						game.players[i].classList.add("linked");
					}
				}
			}
			if (game.layout == "long" || game.layout == "long2") {
				ui.arena.classList.add("long");
			}
			else {
				ui.arena.classList.remove("long");
			}
			if (lib.config.player_border != "wide" || game.layout == "long" || game.layout == "long2") {
				ui.arena.classList.add("slim_player");
			}
			else {
				ui.arena.classList.remove("slim_player");
			}
			if (lib.config.player_border == "normal" && lib.config.mode != "brawl" && (game.layout == "long" || game.layout == "long2")) {
				ui.arena.classList.add("lslim_player");
			}
			else {
				ui.arena.classList.remove("lslim_player");
			}
			if (lib.config.player_border == "slim") {
				ui.arena.classList.add("uslim_player");
			}
			else {
				ui.arena.classList.remove("uslim_player");
			}
			if (lib.config.player_border == "narrow") {
				ui.arena.classList.add("mslim_player");
			}
			else {
				ui.arena.classList.remove("mslim_player");
			}
			ui.updatej();
			ui.updatem();
			return new Promise(resolve => setTimeout(resolve, 100));
		}).then(() => {
			ui.arena.show();
			if (game.me) game.me.update();
			return new Promise(resolve => setTimeout(resolve, 500));
		}).then(() => {
			ui.updatex();
			ui.updatePlayerPositions();
			return new Promise(resolve => setTimeout(resolve, 500));
		}).then(() => {
			ui.updatec();
			loadingScreenStyle.animationName = "opacity-1-0";
			loadingScreen.addEventListener("animationend", animationEvent => animationEvent.target.remove());
		});
	}

	static background() {
		if (lib.config.image_background_random) {
			var list = [];
			for (var i in lib.configMenu.appearence.config.image_background.item) {
				if (i == "default") continue;
				list.push(i);
			}
			list.remove(lib.config.image_background);
			localStorage.setItem(lib.configprefix + "background", JSON.stringify(list));
		}
		else if (lib.config.image_background && lib.config.image_background != "default" && !lib.config.image_background.startsWith("custom_")) {
			localStorage.setItem(lib.configprefix + "background", lib.config.image_background);
		}
		else if (lib.config.image_background == "default" && lib.config.theme == "simple") {
			localStorage.setItem(lib.configprefix + "background", "ol_bg");
		}
		else {
			localStorage.removeItem(lib.configprefix + "background");
		}
	}

	/**
	 * 
	 * @param {*} item 
	 * @param {Function} [scope] 作用域
	 * @returns 
	 */
	static parsex(item, scope) {
		//by 诗笺、Tipx-L
		/**
		 * @param {Function} func 
		 */
		function Legacy(func) {
			//Remove all comments
			//移除所有注释
			let str = func.toString().replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|"(?:\\[\s\S]|[^"\\])*"|(?:\r?\n|[\s\S])[^/""\\\s]*)/mg, "$2").trim();
			//获取第一个 { 后的所有字符
			str = str.slice(str.indexOf("{") + 1);
			//判断代码中是否有debugger
			let regex = /event\.debugger\(\)/;
			let hasDebugger = false;
			let insertDebugger = `yield code=>eval(code);`;
			let debuggerSkip = 0;
			let debuggerResult;
			while ((debuggerResult = str.slice(debuggerSkip).match(regex)) != null) {
				let debuggerCopy = str;
				debuggerCopy = debuggerCopy.slice(0, debuggerSkip + debuggerResult.index) + insertDebugger + debuggerCopy.slice(debuggerSkip + debuggerResult.index + debuggerResult[0].length, -1);
				//测试是否有错误
				try {
					new GeneratorFunction(debuggerCopy);
					str = debuggerCopy + "}";
					debuggerSkip += debuggerResult.index + insertDebugger.length;
					hasDebugger = true;
				} catch (error) {
					debuggerSkip += debuggerResult.index + debuggerResult[0].length;
				}
			}
			//func中要写步骤的话，必须要写step 0
			if (str.indexOf("step 0") == -1) {
				str = "{if(event.step==1) {event.finish();return;}\n" + str;
			} else {
				let skip = 0;
				let k = 0;
				let result;
				//去除99个step的限制
				while ((result = str.slice(skip).match(new RegExp(`[""]step ${k}[""]`))) != null) {
					let insertStr;
					if (k == 0) {
						insertStr = `switch(step){case 0:`;
					} else {
						insertStr = `break;case ${k}:`;
					}
					let copy = str;
					copy = copy.slice(0, skip + result.index) + insertStr + copy.slice(skip + result.index + result[0].length);
					//测试是否有错误
					try {
						new (hasDebugger ? GeneratorFunction : Function)(copy);
						str = copy;
						skip += result.index + insertStr.length;
					} catch (error) {
						k--;
						skip += result.index + result[0].length;
					}
					k++;
				}
				str = `if(event.step==${k}){event.finish();return;}` + str;
			}
			if (!scope) {
				return (new (hasDebugger ? GeneratorFunction : Function)("event", "step", "source", "player", "target", "targets",
					"card", "cards", "skill", "forced", "num", "trigger", "result",
					"_status", "lib", "game", "ui", "get", "ai", str));
			} else {
				return scope(`function${hasDebugger ? "*" : ""} anonymous(event,step,source,player,target,targets,
					card,cards,skill,forced,num,trigger,result,
					_status,lib,game,ui,get,ai){${str}}; anonymous;`);
			}
		}
		switch (typeof item) {
			case "object":
				if (Array.isArray(item)) {
					let lastEvent = null;
					return function* (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai) {
						if (step >= item.length) return event.finish();
						var current = item[step];
						if (typeof current != "function") throw new Error(`content ${step} of ${event.name} is not vaild: ${current}`);
						var currentResult = current(event, {
							event: event,
							step: step,
							source: source,
							player: player,
							target: target,
							targets: targets,
							card: card,
							cards: cards,
							skill: skill,
							forced: forced,
							num: num,
							trigger: trigger,
							result: result
						}, (lastEvent && ("result" in lastEvent)) ? lastEvent.result : null);
						// TODO: use `event.debugger` to replace source
						if (gnc.is.generator(currentResult)) lastEvent = yield* currentResult;
						else lastEvent = currentResult;
					}
				}
				else {
					if (Symbol.iterator in item) return lib.init.parsex(Array.from(item));
					if (item.toString !== Object.prototype.toString) return lib.init.parsex(item.toString());
					if ("render" in item) {
						// TODO: Object Render Parse
						throw new Error("NYI: Object Render Parse");
					}
					// TODO: Object Other Parse
					throw new Error("NYI: Object Other Parse");
				}
			case "function":
				if (gnc.is.generatorFunc(item)) {
					let gen, lastEvent;
					return function* (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai) {
						event.step = NaN;
						if (!gen) gen = item(event, {
							event: event,
							step: step,
							source: source,
							player: player,
							target: target,
							targets: targets,
							card: card,
							cards: cards,
							skill: skill,
							forced: forced,
							num: num,
							trigger: trigger,
							result: result
						});
						var res = gen.next((lastEvent && ("result" in lastEvent)) ? lastEvent.result : null);
						if (res.done) return event.finish();
						var currentResult = res.value;
						// TODO: use `event.debugger` to replace source
						if (typeof currentResult == "function") yield currentResult;
						else {
							if (Array.isArray(currentResult)) {
								event.step = currentResult[1];
								currentResult = currentResult[0];
							}
							lastEvent = currentResult;
						}
					}
				} else if (item._parsed) return item;
			// falls through
			default:
				return Legacy(item);
		}
	}

	static eval(func) {
		if (typeof func == "function") {
			return eval("(" + func.toString() + ")");
		}
		else if (typeof func == "object") {
			for (var i in func) {
				if (Object.prototype.hasOwnProperty.call(func, i)) {
					func[i] = lib.init.eval(func[i]);
				}
			}
		}
		return func;
	}

	static encode(strUni) {
		var strUtf = strUni.replace(
			/[\u0080-\u07ff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
			});
		strUtf = strUtf.replace(
			/[\u0800-\uffff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
			});
		return btoa(strUtf);
	}

	static decode(str) {
		var strUtf = atob(str);
		var strUni = strUtf.replace(
			/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
				var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
				return String.fromCharCode(cc);
			});
		strUni = strUni.replace(
			/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
				var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
				return String.fromCharCode(cc);
			});
		return strUni;
	}

	static stringify(obj) {
		var str = "{"
		for (var i in obj) {
			str += `"${i}":`
			if (Object.prototype.toString.call(obj[i]) == "[object Object]") {
				str += lib.init.stringify(obj[i]);
			}
			else if (typeof obj[i] == "function") {
				str += obj[i].toString();
			}
			else {
				str += JSON.stringify(obj[i]);
			}
			str += ","
		}
		str += "}";
		return str;
	}

	static stringifySkill(obj) {
		var str = "";
		for (var i in obj) {
			str += i + ":"
			if (Object.prototype.toString.call(obj[i]) == "[object Object]") {
				str += "{\n" + lib.init.stringifySkill(obj[i]) + "}";
			}
			else if (typeof obj[i] == "function") {
				str += obj[i].toString().replace(/\t/g, "");
			}
			else {
				str += JSON.stringify(obj[i]);
			}
			str += ",\n"
		}
		return str;
	}
}
