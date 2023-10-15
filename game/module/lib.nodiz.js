"use strict";
module("lib.nodiz", ["lib"], (lib, game, ui, get, ai, _status) => {
	const libnodiz = {
		comparator: {
			equals: function () {
				if (arguments.length == 0) return false;
				if (arguments.length == 1) return true;
				for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return false;
				return true;
			},
			equalAny: function () {
				if (arguments.length == 0) return false;
				if (arguments.length == 1) return true;
				for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return true;
				return false;
			},
			notEquals: function () {
				if (arguments.length == 0) return false;
				if (arguments.length == 1) return true;
				for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return false;
				return true;
			},
			notEqualAny: function () {
				if (arguments.length == 0) return false;
				if (arguments.length == 1) return true;
				for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return true;
				return false;
			},
			typeEquals: function () {
				if (arguments.length == 0) return false;
				if (arguments.length == 1) return arguments[0] !== null;
				const type = typeof arguments[0];
				for (let i = 1; i < arguments.length; ++i) if (type !== arguments[i]) return false;
				return true;
			}
		},

		creation: {
			get array() {
				return [];
			},
			get object() {
				return {};
			},
			get nullObject() {
				return Object.create(null);
			},
			get string() {
				return "";
			}
		},

		linq: {
			cselector: {
				hasAttr: name => `[${name}]`,
				isAttr: (name, item) => `[${name}=${item}]`,
				inAttr: (name, item) => `[${name}~=${item}]`,
				conAttr: (name, item) => `[${name}*=${item}]`,
				onAttr: (name, item) => `[${name}|=${item}]`,
				bgnAttr: (name, item) => `[${name}^=${item}]`,
				endAttr: (name, item) => `[${name}^=${item}]`,
				merge: function () { return Array.from(arguments).join(" "); },
				of: function () { return Array.from(arguments).join(""); },
				class: function () { return `.${Array.from(arguments).join(".")}`; },
				group: function () { return Array.from(arguments).join(","); },
				media: type => `@media ${type}`
			},
			dom: {
				attributes: {
					style(name, value) {
						return {
							_type: "style",
							name: name,
							value: value
						}
					}
				},
				inject(element, options) {
					//处理id和class
					if (options.identity) {
						for (const item of options.identity) {
							if (item.startsWith("#")) element.id = item.slice(1);
							else element.classList.add(item);
						}
					}
					//处理属性
					if (options.attributes) {
						for (const item in options.attributes) element.setAttribute(item, options.attributes[item]);
					}
					//处理样式
					if (options.style) {
						for (const item in options.style) element.style[item] = options.style[item];
					}
					//处理内容
					if (options.content) {
						element.innerHTML = options.content;
					}
					//处理子元素
					if (options.childs) {
						for (const item of options.childs) {
							element.appendChild(item);
						}
					}
					return element;
				},
				generate() {
					let result = lib.creation.nullObject;
					const args = Array.from(arguments);
					for (const item of args) {
						switch (typeof item) {
							case "object":
								switch (item.constructor) {
									case Object:
									case null:
										if ("_type" in item) {
											const type = item["_type"];
											if (!(type in result)) result[type] = lib.creation.nullObject;
											result[type][item.name] = item.value;
										}
										else {
											if (!("style" in result)) result.style = lib.creation.nullObject;
											for (const name in item) {
												result.style[name] = item[name];
											}
										}
										break;
									default:
										if (!("childs" in result)) result.childs = lib.creation.array;
										result.childs.add(item);
										break;
								}
								break;
							case "string":
								if (/^\.|#/.test(item)) {
									if (!("identity" in result)) result.identity = lib.creation.array;
									const identities = item.split(".").filter(Boolean);
									for (const item of identities) result.identity.add(item);
								}
								else result.content = item;
								break;
						}
					}
					return result;
				},
				attribute(name, value) {
					return {
						_type: "attributes",
						name: name,
						value: value
					}
				},
				div() {
					const dom = lib.linq.dom;
					return dom.inject(document.createElement("div"), dom.generate(...arguments));
				}
			}
		},

		other: {
			ignore: () => void 0
		}
	};

	Object.assign(lib, libnodiz);
});
