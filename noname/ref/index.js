/**
 * ```js
 * // 使用例子: 
 * const btn = xxx;
 * const count = ref(0);
 * btn.onclick = () => count.value++;
 * btn.innerHTML = count.value + 1;
 * // 手动实现数据绑定
 * // 但在.mold文件使用无需如此
 * count.use(btn, { props: [{ 
 * 	// 属性名
 * 	key: 'innerHTML',
 * 	// 更新时执行此字符串决定对应属性的结果
 * 	value: '{{count.value + 1}}',
 * 	// 暴露给ref类的执行代码的函数
 *  evaluateJavascript: str => eval(str),
 * }], attrs: [] });
 * 
 * ```
 * @template T
 * @param { T } value
 * @returns { RefImpl<T> }
 */
export function ref(value) {
	if (value instanceof RefImpl) {
		return value;
	}
	// @ts-ignore
	if ([undefined, null].includes(value)) throw TypeError('Cannot create proxy with a non-object as ref');
	return new RefImpl(Object(value));
}

/**
 * @template T
 */
export class RefImpl {
	static recordExecution = false;
	static executionList = [];
	[Symbol.toPrimitive]() {
		if (RefImpl.recordExecution === true) {
			RefImpl.executionList.add(this);
		}
		if (this.#value instanceof Number) {
			return Number(this.#value);
		}
		return String(this.#value);
	}
	/** @type { T } */
	#value;
	/** @type { ({ element: HTMLElement, props: ({ key: string | Symbol, value: string, evaluateJavascript: (str: string) => any })[], attrs: ({ key: string, value: string, evaluateJavascript: (str: string) => any })[] })[] }  */
	#boundDomList = [];
	/**
	 * @param { T } value 
	 */
	constructor(value) {
		this.#value = this.createProxy(value);
	}
	get value() {
		if (RefImpl.recordExecution === true) {
			RefImpl.executionList.add(this);
		}
		return this.#value;
	}
	set value(newVal) {
		// 更新视图
		if (this.#value != newVal) {
			this.#value = this.createProxy(newVal);
			this.updateDom();
		}
	}
	createProxy(value) {
		/**
		 * @type { ProxyHandler<any> }
		 */
		const handler = {
			get(target, prop) {
				let value = Reflect.get(target, prop);
				if (typeof value == 'function') {
					value = value.bind(target);
				}
				// console.log('get', target, prop, value);
				if (Object(value) !== value && Boolean(value)) {
					return new Proxy(value, handler);
				}
				return value;
			},
			set: (target, prop, newVal, receiver) => {
				const oldVal = Reflect.get(target, prop);
				// console.log('set', target, prop, oldVal, newVal);
				const result = Reflect.set(target, prop, newVal, receiver);
				// 更新视图
				if (oldVal != newVal) {
					this.updateDom();
				}
				return result;
			}
		};
		if ([undefined, null].includes(value)) throw TypeError(' Cannot create proxy with a non-object as ref');
		return new Proxy(Object(value), handler);
	}
	/**
	 * @param { HTMLElement } element
	 * @param { Object } param1 
	 * @param { ({ key: string | Symbol, value: string, evaluateJavascript: (str: string) => any })[] } [param1.props] 
	 * @param { ({ key: string, value: string, evaluateJavascript: (str: string) => any })[] } [param1.attrs] 
	 */
	use(element, { props, attrs }) {
		const bound = this.#boundDomList.find(v => v.element == element) || { element, props: [], attrs: [] };
		if (!this.#boundDomList.includes(bound)) {
			this.#boundDomList.push(bound);
		}
		if (!Array.isArray(bound.props)) bound.props = [];
		if (Array.isArray(props)) {
			bound.props.push(...props.filter(({ key }) => {
				// 有相同监听的属性，就不继续监听了
				return !bound.props.find(({ key: key2 }) => key == key2);
			}));
			
		}
		if (!Array.isArray(bound.attrs)) bound.attrs = [];
		if (Array.isArray(attrs)) {
			bound.attrs.push(...attrs.filter(({ key }) => {
				// 有相同监听的属性，就不继续监听了
				return !bound.attrs.find(({ key: key2 }) => key == key2);
			}));
		}
	}
	updateDom() {
		this.#boundDomList.forEach(({ element, props, attrs }) => {
			props.forEach(({ key, value, evaluateJavascript }) => {
				// @ts-ignore
				if (!['innerText', 'innerHTML'].includes(key)) {
					// @ts-ignore
					element[key] = evaluateJavascript(value);
					// 如果需要更新指令相关信息
					if (typeof key == 'string' && key.startsWith('instructions:')) {
						const instructions = key.slice(13);
						// 解析指令
						Instructions.parse(element, evaluateJavascript, instructions);
					}
				} else {
					// @ts-ignore
					element[key] = value.replaceAll(/\{\{(.+?)\}\}/g, (_, str) => {
						try {
							return evaluateJavascript(str.trim()) ?? `{{${str}}}`;
						} catch {
							return `{{${str}}}`;
						}
					});
				}
			});
			attrs.forEach(({ key, value, evaluateJavascript }) => {
				element.setAttribute(key, evaluateJavascript(value));
				// 如果需要更新指令相关信息
				// @ts-ignore
				if (Instructions.initial.includes(key) || Instructions.custom.includes(key)) {
					Instructions.parse(element, evaluateJavascript, key);
				}
			});
		});
	}
}

/**
 * 对于模板字符串中的html，css代码进行代码提示，可以在vscode安装“Inline HTML”扩展
 * 
 * 噢，手机用mt写代码的可以省省略过这个了。因为mt没代码提示。
 * 
 * 另外提醒一点，这个用法里输入\t\n是不能自动解析的，得用html的那种
 * 
 * @param { TemplateStringsArray } strings
 * @param { ...any } values
 */
export const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

/**
 * @param { TemplateStringsArray } strings 
 * @param { ...any } values 
 */
export const css = (strings, ...values) => String.raw({ raw: strings }, ...values);

window.mold = {
	templateMap: new Map(),
	registerEvaluate(url, evaluateJavascript) {
		let obj = this.templateMap.get(url);
		if (!obj) {
			this.templateMap.set(url, {
				evaluateJavascript
			});
		} else {
			// @ts-ignore
			obj.evaluateJavascript = evaluateJavascript;
		}
		// @ts-ignore
		compileDom(this.templateMap.get(url).template, evaluateJavascript);
	},
};

/**
 * 优先编译Template元素内的元素，然后再渲染到真实dom中。
 * @param { HTMLTemplateElement | HTMLElement } el
 * @param { (str: string) => any } evaluateJavascript 
 */
export function compileDom(el, evaluateJavascript) {
	if (el instanceof HTMLTemplateElement) {
		const { content } = el;
		if (content.children) {
			// @ts-ignore
			[...content.children].forEach(ele => compileDom(ele, evaluateJavascript));
		}
		// @ts-ignore
		el.parentElement.appendChild(content);
		// @ts-ignore
		el.parentElement.removeChild(el);
	} else {
		const attrNames = el.getAttributeNames();

		// 处理@xx的事件
		const names = attrNames.filter(n => n.startsWith('@'));
		if (names.length > 0) {
			names.forEach(evtName => {
				const funVal = el.getAttribute(evtName);
				if (funVal != null) {
					try {
						if (funVal.indexOf('(') == -1 || funVal.indexOf(')') == -1) {
							let fun = evaluateJavascript(funVal);
							if (typeof fun == 'function') {
								el.addEventListener(evtName.slice(1), (event) => {
									if (fun.length < 2) {
										fun.call(el, event);
									} else {
										fun.call(el);
									}
								});
							}
						} else {
							throw new Error('带小括号的不执行');
						}
					} catch (e) {
						try {
							let fun = evaluateJavascript(`(() => function ${evtName.slice(1)} (event) {\n\t${funVal}\n})()`);
							el.addEventListener(evtName.slice(1), event => {
								fun.call(el, event);
							});
						} catch (ex) {
							console.error(`[${evtName}] ${ex}`);
						}
					}
				}
				el.removeAttribute(evtName);
			});
		}

		// 处理:xx的标签属性
		const evaluateNames = attrNames.filter(n => n.startsWith(':'));
		if (evaluateNames.length > 0) {
			evaluateNames.forEach(name => {
				/** 
				 * 原字符串 
				 * @type { string }
				 **/
				// @ts-ignore
				let val = el.getAttribute(name);
				if (val === '' || val === name) val = 'true';
				RefImpl.recordExecution = true;
				RefImpl.executionList.length = 0;
				const getVal = evaluateJavascript(val);
				if (!(getVal instanceof RefImpl)) {
					if (RefImpl.executionList.length > 0) {
						RefImpl.executionList.forEach(ref => {
							ref.use(el, {
								props: [{
									key: name.slice(1),
									// @ts-ignore
									value: val,
									evaluateJavascript,
								}],
							});
						});
					}
					el.setAttribute(name.slice(1), getVal);
				} else {
					el.setAttribute(name.slice(1), evaluateJavascript(getVal.value));
					getVal.use(el, {
						attrs: [{
							key: name.slice(1),
							// @ts-ignore
							value: val,
							evaluateJavascript,
						}],
					});
				}
				el.removeAttribute(name);
				RefImpl.recordExecution = false;
				RefImpl.executionList.length = 0;
			});
		}

		// 处理内置指令
		Instructions.initial.forEach(instructions => {
			if (attrNames.includes(instructions)) {
				Instructions.parse(el, evaluateJavascript, instructions);
			}
		});

		if (el.innerHTML.length > 0) {
			const oldVal = el.innerHTML;
			el.innerHTML = oldVal.replace(/\{\{(.+?)\}\}/g, (_, str) => {
				RefImpl.recordExecution = true;
				RefImpl.executionList.length = 0;
				const getVal = evaluateJavascript(str);
				if (getVal instanceof RefImpl) {
					getVal.use(el, {
						props: [{
							key: 'innerHTML',
							// @ts-ignore
							value: oldVal,
							evaluateJavascript,
						}],
					});
				} else if (RefImpl.executionList.length > 0) {
					RefImpl.executionList.forEach(ref => {
						ref.use(el, {
							props: [{
								key: 'innerHTML',
								// @ts-ignore
								value: oldVal,
								evaluateJavascript,
							}],
						});
					});
				}
				RefImpl.recordExecution = false;
				RefImpl.executionList.length = 0;
				return getVal;
			});
		}

		if (el.children) {
			// @ts-ignore
			[...el.children].forEach(ele => compileDom(ele, evaluateJavascript));
		}
	}
};

/**
 * 指令类
 * 
 * 负责解析内置指令，和注册自定义指令
 */
export class Instructions {
	/**
	 * 内置指令数组
	 * @type { ['m-show', 'm-if'] }
	 */
	static initial = ['m-show', 'm-if'];

	/**
	 * 自定义指令数组
	 * @type { string[] }
	 */
	static custom = [];

	/**
	 * @template { typeof Instructions['initial'] } T
	 * @template { typeof Instructions['custom'] } U
	 * @param { HTMLElement } el
	 * @param { (str: string) => any } evaluateJavascript 
	 * @param { T[number] | U[number] } instructions
	 * 
	 */
	static parse(el, evaluateJavascript, instructions) {
		// 首先，指令是存在于html标签属性中的
		// 而且编译后，需要移除。
		// 不同的指令，需要做的功能需要提取出来
		const instructionsKey = `instructions:${instructions}`;
		/** 
		 * 原字符串 
		 * @type { string }
		 **/
		// @ts-ignore
		let val = el.getAttribute(instructions) || el[instructionsKey];
		if (val === '' || val === instructions) val = 'true';
		RefImpl.recordExecution = true;
		RefImpl.executionList.length = 0;
		/**
		 * 默认执行
		 */
		const defaultExecution = () => {
			const getVal = evaluateJavascript(val);
			if (!(getVal instanceof RefImpl)) {
				if (RefImpl.executionList.length > 0) {
					RefImpl.executionList.forEach(ref => {
						ref.use(el, {
							props: [{
								key: instructionsKey,
								// @ts-ignore
								value: val,
								evaluateJavascript,
							}],
						});
					});
				}
				el[instructionsKey] = getVal;
			} else {
				getVal.use(el, {
					props: [{
						key: instructionsKey,
						// @ts-ignore
						value: val,
						evaluateJavascript,
					}],
				});
				el[instructionsKey] = evaluateJavascript(getVal.value);
			}
			return el[instructionsKey];
		};
		switch (instructions) {
			case 'm-show': {
				// m-show的值如果是true就显示元素，否则隐藏
				const result = defaultExecution();
				if (result == true) {
					el.style.display = '';
				} else {
					el.style.display = 'none';
				}
				break;
			}
			case 'm-if': {
				// m-if的值如果是true就渲染元素
				// 否则移除并且检测下一个元素是否带有m-else或m-else-if
				// 并执行相关判断
				const result = defaultExecution();
				const parentKey = `instructions-${instructions}-parent:${instructions}`;
				const siblingKey = `instructions-${instructions}-sibling:${instructions}`;
				// 更新父节点信息
				if (el[parentKey] && el.parentNode && el[parentKey] != el.parentNode) {
					el[parentKey] = el.parentNode;
				}
				// 渲染节点
				if (result == true) {
					// 如果有记录的父节点
					if (el[parentKey]) {
						el[parentKey].insertBefore(el, el[siblingKey].filter(child => {
							// 排除不处于父节点的兄弟节点
							return child.parentElement == el[parentKey] || child == el;
						}).find((_, index, arr) => {
							return index > arr.indexOf(el);
						}));
					}
					// 处理m-else-if和m-else
				}
				// 移除节点
				else {
					if (el.parentNode) el.parentNode.removeChild(el);
					// 处理m-else-if和m-else
				}
				// 如果节点在dom中(先渲染，再刷新)
				if (el.parentNode) {
					el[parentKey] = el.parentNode;
					// 如果状态从false改回true，那应该执行以下代码:
					// el.parentElement.insertBefore(el, child);
					// 所以要保存的是el的父元素，和后一个兄弟节点
					// 但是后一个兄弟节点也有可能被m-if指令指定不渲染。
					// 所以要保存其所有兄弟元素(顺序)
					// 用节点而不是元素的话，会有部分问题
					// @ts-ignore
					el[siblingKey] = Array.from(el.parentNode.children);
				}
				break;
			}
			default:
				break;
		}
		el.removeAttribute(instructions);
		RefImpl.recordExecution = false;
		RefImpl.executionList.length = 0;
	}
}