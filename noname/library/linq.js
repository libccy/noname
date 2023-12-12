import { Creation } from "./creation.js";

export const linq = {
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
			let result = Creation.nullObject;
			const args = Array.from(arguments);
			for (const item of args) {
				switch (typeof item) {
					case "object":
						switch (item.constructor) {
							case Object:
							case null:
								if ("_type" in item) {
									const type = item["_type"];
									if (!(type in result)) result[type] = Creation.nullObject;
									result[type][item.name] = item.value;
								}
								else {
									if (!("style" in result)) result.style = Creation.nullObject;
									for (const name in item) {
										result.style[name] = item[name];
									}
								}
								break;
							default:
								if (!("childs" in result)) result.childs = Creation.array;
								result.childs.add(item);
								break;
						}
						break;
					case "string":
						if (/^\.|#/.test(item)) {
							if (!("identity" in result)) result.identity = Creation.array;
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
			return this.inject(document.createElement("div"), this.generate(...arguments));
		}
	}
};
