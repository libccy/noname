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
		if (this.#value != newVal || this.#value.constructor != Object(newVal).constructor) {
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
				// 不代理构造函数
				if (prop != 'constructor') {
					if (typeof value == 'function') {
						value = value.bind(target);
					}
					if (Object(value) === value && Boolean(value)) {
						return new Proxy(value, handler);
					}
				}
				return value;
			},
			set: (target, prop, newVal, receiver) => {
				const oldVal = Reflect.get(target, prop);
				const result = Reflect.set(target, prop, newVal, receiver);
				// 更新视图
				if (oldVal != newVal || Object(oldVal).constructor != Object(newVal).constructor) {
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
					// 更新prop信息,但m-for除外
					if (key != 'instructions:m-for') {
						// 此处得判断是否是ref
						const result = evaluateJavascript(value);
						if (result instanceof RefImpl) {
							element[key] = result.value;
						} else {
							element[key] = result;
						}
					}
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
		compiler(this.templateMap.get(url).template, evaluateJavascript);
	},
};

/**
 * 优先编译Template元素内的元素，然后再渲染到真实dom中。
 * @param { HTMLTemplateElement | HTMLElement } el
 * @param { (str: string) => any } evaluateJavascript 
 */
export function compiler(el, evaluateJavascript) {
	if (el instanceof HTMLTemplateElement) {
		const { content } = el;
		if (content.children) {
			// @ts-ignore
			[...content.children].forEach(ele => compiler(ele, evaluateJavascript));
		}
		const target = el.parentElement;
		target.appendChild(content);
		target.removeChild(el);
		
		// 刷新m-if指向的parent元素
		const parentKey = `instructions-m-if-parent:m-if`;
		const siblingKey = `instructions-m-if-sibling:m-if`;
		const unionKey = `instructions-m-if-union:m-if`;
		function updateParentKey(el) {
			if (el['instructions:m-if']) {
				el[parentKey] = el.parentElement;
				el[siblingKey] = Array.from(el.parentElement.childNodes);
				if (!el[siblingKey].includes(el)) {
					const index = el[siblingKey].findIndex(e => {
						return el[unionKey].includes(e);
					});
					if (index > -1) {
						el[siblingKey].splice(index, 0, el);
					}
				}
			}
			else if (el['instructions:m-else-if'] || el['instructions:m-else']) {
				/** @type { HTMLElement } 绑定的m-if元素 */
				const firstIfElement = el[unionKey];
				firstIfElement[parentKey] = el.parentElement;
				firstIfElement[siblingKey] = Array.from(el.parentElement.childNodes);
				if (!firstIfElement[siblingKey].includes(firstIfElement)) {
					const index = firstIfElement[siblingKey].findIndex(e => {
						return firstIfElement[unionKey].includes(e);
					});
					if (index > -1) {
						firstIfElement[siblingKey].splice(index, 0, firstIfElement);
					}
				}
			} 
			else if (el['instructions-m-for-source:m-for']) {
				const sourceElement = el['instructions-m-for-source:m-for'];
				sourceElement[`instructions-m-for-parent:m-for`] = el.parentElement;
				const siblingKey = `instructions-m-for-sibling:m-for`;
				const arr = sourceElement[siblingKey] || Array.from(el.parentElement.childNodes);
				arr[arr.indexOf(el)] = sourceElement;
				sourceElement[siblingKey] = [...new Set(arr)];
			}
			if (el.children) {
				// @ts-ignore
				[...el.children].forEach(ele => updateParentKey(ele));
			}
		}
		updateParentKey(target);

	} else {
		const attrNames = el.getAttributeNames();

		// 优先处理内置指令
		// 内置指令中优先处理m-for
		Instructions.initial.forEach(instructions => {
			if (attrNames.includes(instructions)) {
				if (instructions == 'm-if') {
					// 刷新m-if指向的parent元素
					const parentKey = `instructions-m-if-parent:m-if`;
					const siblingKey = `instructions-m-if-sibling:m-if`;
					// 初始指向Template
					el[parentKey] = el.parentNode;
					el[siblingKey] = Array.from(el[parentKey].childNodes);
				}
				Instructions.parse(el, evaluateJavascript, instructions);
			}
		});

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

		if (el.innerHTML.length > 0) {
			const oldVal = el.innerHTML;
			el.innerHTML = oldVal.replace(/\{\{(.+?)\}\}/g, (_, str) => {
				RefImpl.recordExecution = true;
				RefImpl.executionList.length = 0;
				let getVal;
				try {
					getVal = evaluateJavascript(str);
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
				} catch {
					getVal = str;
				}
				RefImpl.recordExecution = false;
				RefImpl.executionList.length = 0;
				return getVal;
			});
		}

		if (el.children) {
			// @ts-ignore
			[...el.children].forEach(ele => compiler(ele, evaluateJavascript));
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
	 * @type { ['m-for', 'm-if', 'm-else-if', 'm-else', 'm-show'] }
	 */
	static initial = ['m-for', 'm-if', 'm-else-if', 'm-else', 'm-show'];

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
	 */
	static parse(el, evaluateJavascript, instructions) {
		// 首先，指令是存在于html标签属性中的
		// 而且编译后，需要移除。
		// 不同的指令，需要做的功能需要提取出来
		const instructionsKey = `instructions:${instructions}`;
		RefImpl.recordExecution = true;
		RefImpl.executionList.length = 0;
		/**
		 * 默认执行
		 * @param { HTMLElement } [ele] 限定执行的元素，默认为el
		 * @param { string } [instru]
		 */
		const defaultExecution = (ele = el, instru = instructions) => {
			const key = `instructions:${instru}`;
			/**
			 * 原字符串 
			 * @type { string }
			 **/
			let val = ele.getAttribute(instru) || ele[key];
			if (val === '' || val === instru) val = 'true';
			const getVal = evaluateJavascript(val);
			if (!(getVal instanceof RefImpl)) {
				if (RefImpl.executionList.length > 0) {
					RefImpl.executionList.forEach(ref => {
						ref.use(ele, {
							props: [{
								key: key,
								// @ts-ignore
								value: val,
								evaluateJavascript,
							}],
						});
					});
				}
				ele[key] = getVal;
			} else {
				getVal.use(ele, {
					props: [{
						key: key,
						// @ts-ignore
						value: val,
						evaluateJavascript,
					}],
				});
				ele[key] = evaluateJavascript(getVal.value);
			}
			return ele[key];
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
				const unionKey = `instructions-${instructions}-union:${instructions}`;
				// 第一次渲染之前，要获取其下一个元素是否有m-else-if或者m-else指令
				// 三者只能显示一个元素
				// m-else-if可以绑定另一个变量，而m-else不绑定变量
				if (!el[unionKey]) {
					el[unionKey] = [];
					let nextElement = el.nextElementSibling;
					if (nextElement) while (nextElement.hasAttribute('m-else-if') || nextElement.hasAttribute('m-else')) {
						if (nextElement.hasAttribute('m-else-if') && nextElement.hasAttribute('m-else')) {
							throw new TypeError('m-else-if和m-else指令不能出现在同一标签中');
						}
						el[unionKey].push(nextElement);
						nextElement[unionKey] = el;
						if (nextElement.hasAttribute('m-else-if')) {
							defaultExecution(nextElement, 'm-else-if');
							nextElement.removeAttribute('m-else-if');
						}
						if (nextElement.hasAttribute('m-else')) {
							defaultExecution(nextElement, 'm-else');
							nextElement.removeAttribute('m-else');
						}
						nextElement = nextElement.nextElementSibling;
						if (!nextElement) break;
					}
				}
				// 更新记录的父节点信息
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
						}) || null);
					}
					// 处理m-else-if和m-else
					if (Array.isArray(el[unionKey])) {
						el[unionKey].forEach(ele => {
							if (ele.parentNode) ele.parentNode.removeChild(ele);
						});
					}
				}
				// 移除节点
				else {
					if (el.parentNode) el.parentNode.removeChild(el);
					// 处理m-else-if和m-else
					if (Array.isArray(el[unionKey])) {
						const displayElement = el[unionKey].find(ele => {
							return ele['instructions:m-else-if'] == true || ele['instructions:m-else'] == true;
						});
						if (displayElement) {
							// 根据m-if指令元素的位置去显示
							if (el[parentKey] && !el[parentKey].contains(displayElement)) {
								const insertBeforeElement = el[siblingKey].filter(child => {
									// 排除不处于父节点的兄弟节点
									return child.parentElement == el[parentKey] || child == el;
								}).find((_, index, arr) => {
									return index > arr.indexOf(el);
								}) || null;
								el[parentKey].insertBefore(displayElement, insertBeforeElement);
							}
						}
						el[unionKey]
							.filter(ele => ele != displayElement)
							.forEach(ele => {
								if (ele.parentNode) ele.parentNode.removeChild(ele);
							});
					}
				}
				// 如果节点在dom中(先渲染，再刷新)
				const oldParentNode = el[parentKey];
				if (el.parentNode) {
					el[parentKey] = el.parentNode;
					// 如果状态从false改回true，那应该执行以下代码:
					// el.parentElement.insertBefore(el, child);
					// 所以要保存的是el的父节点，和后一个兄弟节点
					// 但是后一个兄弟节点也有可能被m-if指令指定不渲染。
					// 所以要保存其所有兄弟节点(顺序)
					// @ts-ignore
					if (oldParentNode != el.parentNode) el[siblingKey] = Array.from(el.parentNode.childNodes);
				}
				break;
			}
			case 'm-else-if': {
				const unionKey = `instructions-m-if-union:m-if`;
				const parentKey = `instructions-m-if-parent:m-if`;
				const siblingKey = `instructions-m-if-sibling:m-if`;
				if (el.hasAttribute('m-else-if') || !el[unionKey]) {
					throw new TypeError('m-else-if指令不能单独出现');
				}
				/** @type { HTMLElement } 绑定的m-if元素 */
				const firstIfElement = el[unionKey];
				// 更新绑定的m-if元素父节点信息
				if (firstIfElement[parentKey] && firstIfElement.parentNode && firstIfElement[parentKey] != firstIfElement.parentNode) {
					firstIfElement[parentKey] = firstIfElement.parentNode;
				}
				const unionElements = [firstIfElement, ...firstIfElement[unionKey]];

				const result = el[instructionsKey];
				if (Array.isArray(firstIfElement[unionKey])) {
					if (result == true) {
						// m-else-if的状态改为true后，需要判断m-if，或者前置m-else-if
						const displayElement = unionElements.find(ele => {
							return ele['instructions:m-if'] == true ||
								ele['instructions:m-else-if'] == true ||
								ele['instructions:m-else'] == true;
						});
						if (displayElement) {
							if (firstIfElement[parentKey] && !firstIfElement[parentKey].contains(displayElement)) {
								const insertBeforeElement = firstIfElement[siblingKey].filter(child => {
									// 排除不处于父节点的兄弟节点
									return child.parentElement == firstIfElement[parentKey] || child == firstIfElement;
								}).find((_, index, arr) => {
									return index > arr.indexOf(firstIfElement);
								}) || null;
								firstIfElement[parentKey].insertBefore(displayElement, insertBeforeElement);
							}
						}
						unionElements.filter(ele => ele != displayElement)
							.forEach(ele => {
								if (ele.parentNode) ele.parentNode.removeChild(ele);
							});
					} else {
						// 进行下一个m-else-if或者m-else判断
						const displayElement = unionElements.find((ele, index, array) => {
							// 虽然是寻找下一个，但是还是得首先判断最初绑定m-if的元素
							// 如果是true那其他的不显示，只显示绑定m-if的元素
							if (ele['instructions:m-if'] == true) return true;
							// 这个元素的下一个m-else-if或m-else元素
							if (array.indexOf(el) >= index) return false;
							return ele['instructions:m-else-if'] == true ||
								ele['instructions:m-else'] == true;
						});
						if (displayElement) {
							if (firstIfElement[parentKey] && !firstIfElement[parentKey].contains(displayElement)) {
								const insertBeforeElement = firstIfElement[siblingKey].filter(child => {
									// 排除不处于父节点的兄弟节点
									return child.parentElement == firstIfElement[parentKey] || child == firstIfElement;
								}).find((_, index, arr) => {
									return index > arr.indexOf(firstIfElement);
								}) || null;
								firstIfElement[parentKey].insertBefore(displayElement, insertBeforeElement);
							}
						}
						unionElements.filter(ele => ele != displayElement)
							.forEach(ele => {
								if (ele.parentNode) ele.parentNode.removeChild(ele);
							});
					}
				}
				break;
			}
			case 'm-else': {
				const unionKey = `instructions-m-if-union:m-if`;
				const parentKey = `instructions-m-if-parent:m-if`;
				const siblingKey = `instructions-m-if-sibling:m-if`;
				if (el.hasAttribute('m-else') || !el[unionKey]) {
					throw new TypeError('m-else指令不能单独出现');
				}
				/** @type { HTMLElement } 绑定的m-if元素 */
				const firstIfElement = el[unionKey];
				// 更新绑定的m-if元素父节点信息
				if (firstIfElement[parentKey] && firstIfElement.parentNode && firstIfElement[parentKey] != firstIfElement.parentNode) {
					firstIfElement[parentKey] = firstIfElement.parentNode;
				}
				const unionElements = [firstIfElement, ...firstIfElement[unionKey]];
				// m-else一定为true
				if (Array.isArray(firstIfElement[unionKey])) {
					// 默认为el
					const displayElement = unionElements.find(ele => {
						return ele['instructions:m-if'] == true || ele['instructions:m-else-if'] == true || ele == el;
					});
					if (firstIfElement[parentKey] && !firstIfElement[parentKey].contains(displayElement)) {
						const insertBeforeElement = firstIfElement[siblingKey].filter(child => {
							// 排除不处于父节点的兄弟节点
							return child.parentElement == firstIfElement[parentKey] || child == firstIfElement;
						}).find((_, index, arr) => {
							return index > arr.indexOf(firstIfElement);
						}) || null;
						firstIfElement[parentKey].insertBefore(displayElement, insertBeforeElement);
					}
					unionElements.filter(ele => ele != displayElement)
						.forEach(ele => {
							if (ele.parentNode) ele.parentNode.removeChild(ele);
						});
				}
				break;
			}
			case 'm-for': {
				// 期望的绑定值类型：Array | Object | number | string | Iterable
				// 需要特殊处理，所以不使用defaultExecution函数
				// 给编译出的元素指定el
				const sourceKey = `instructions-${instructions}-source:${instructions}`;
				// 记录兄弟节点
				const siblingKey = `instructions-${instructions}-sibling:${instructions}`;
				// 记录父元素位置
				const parentKey = `instructions-${instructions}-parent:${instructions}`;
				// 其所渲染的所有元素
				const childKey = `instructions-${instructions}-childKey:${instructions}`;
				// 初始处理
				if (el.hasAttribute(instructions)) {
					if (!el[childKey]) el[childKey] = [];
					execution(el);
				}
				// 从保存的数据处理
				else {
					// 移除已经渲染的元素
					el[childKey].forEach(ele => {
						if (ele.parentNode) ele.parentNode.removeChild(ele);
					});
					let doc = document.implementation.createHTMLDocument('');
					doc.body.innerHTML = el[instructionsKey];
					const resolvingElement = doc.body.firstChild;
					if (!resolvingElement[childKey]) resolvingElement[childKey] = [];
					if (el[parentKey]) resolvingElement[parentKey] = el[parentKey];
					if (el[siblingKey]) resolvingElement[siblingKey] = el[siblingKey];
					resolvingElement[sourceKey] = el;
					execution(resolvingElement, false);
				}
				
				function execution(el, record = true) {
					if (el.hasAttribute(instructions)) {
						// 储存其本身的outerHTML，数据变动后重新解析
						// 因为解析后，其的其他标签属性会丢失
						if (!el[instructionsKey]) el[instructionsKey] = el.outerHTML;
						/**
						 * 原字符串 
						 * @type { string }
						 **/
						let val = el.getAttribute(instructions);
						if (val === '' || val === instructions) val = 'true';
						// 有多个“ in ”也是不允许的
						if (!val.includes(' in ') || val.lastIndexOf(' in ') != val.indexOf(' in ')) {
							throw new TypeError('m-for使用格式错误: ' + val);
						}
						val = val.trim();
						/** 要进行遍历的变量名称 */
						let list, item, index, objIndex;
						const indexOfInKeyWord = val.lastIndexOf(' in ');
						// 如果是以括号形式写的
						if (val.startsWith('(')) {
							/** 去除括号后的数组 */
							let item_index = val.match("\\((.+?)\\)")[1];// item,index
							[item, index, objIndex] = item_index.split(',');
						}
						// 没有括号，那就只有一个item变量
						else {
							item = val.slice(0, indexOfInKeyWord);
						}
						list = val.slice(indexOfInKeyWord + ' in '.length);
						if (typeof item == 'string') item = item.trim();
						if (typeof index == 'string') index = index.trim();
						if (typeof objIndex == 'string') objIndex = objIndex.trim();
						if (typeof list == 'string') list = list.trim();
						/** 要进行遍历的变量 */
						let dataList = evaluateJavascript(list);
						// 绑定
						if (dataList instanceof RefImpl) {
							if (record) dataList.use(el, {
								props: [{
									key: instructionsKey,
									value: el[instructionsKey],
									evaluateJavascript,
								}],
							});
							// 解包
							dataList = dataList.value;
						} else {
							if (record && RefImpl.executionList.length > 0) {
								RefImpl.executionList.forEach(ref => {
									ref.use(el, {
										props: [{
											key: instructionsKey,
											value: el[key],
											evaluateJavascript,
										}],
									});
								});
							}
						}
						/**
						 * <div v-for="(item, index) in items">{{ item }}</div>
						 * 
						 * items.length个<div>{{ item }}</div>，然后用item和index做其他事
						 */
						let fun;
						if (Array.isArray(dataList)) {
							fun = evaluateJavascript(`
								(function (_el, _list, _compiler) {
									/** 模板 */
									const _fragment = document.createDocumentFragment();
									for (let _i = 0; _i < _list.length; _i++) {
										// 创建数据(考虑变量不存在的情况)
										${item !== undefined ? ('const ' + item + ' = _list[_i];') : ''}
										${index !== undefined ? ('const ' + index + ' = _i;') : ''}
										// 创建dom
										let _doc = document.implementation.createHTMLDocument('');
										_doc.body.innerHTML = _el.outerHTML;
										const _li = _doc.body.firstChild;
										_doc = null;
										// 移除m-for标签属性
										_li.removeAttribute('m-for');
										_fragment.appendChild(_li);
										// 编译dom
										_compiler(_li, _str => eval(_str));
									}
									return _fragment;
								});
							`);
						}
						else if (typeof dataList == 'number' || dataList instanceof Number) {
							fun = evaluateJavascript(`
								(function (_el, _number, _compiler) {
									/** 模板 */
									const _fragment = document.createDocumentFragment();
									for (let _i = 0; _i < _number; _i++) {
										// 创建数据(考虑变量不存在的情况)
										${item !== undefined ? ('const ' + item + ' = _i;') : ''}
										// 创建dom
										let _doc = document.implementation.createHTMLDocument('');
										_doc.body.innerHTML = _el.outerHTML;
										const _li = _doc.body.firstChild;
										_doc = null;
										// 移除m-for标签属性
										_li.removeAttribute('m-for');
										_fragment.appendChild(_li);
										// 编译dom
										_compiler(_li, _str => eval(_str));
									}
									return _fragment;
								});
							`);
						}
						else if (typeof dataList == 'string' || dataList instanceof String) {
							fun = evaluateJavascript(`
								(function (_el, _string, _compiler) {
									/** 模板 */
									const _fragment = document.createDocumentFragment();
									for (let _i = 0; _i < _string.length; _i++) {
										// 创建数据(考虑变量不存在的情况)
										${item !== undefined ? ('const ' + item + ' = _string[_i];') : ''}
										${index !== undefined ? ('const ' + index + ' = _i;') : ''}
										// 创建dom
										let _doc = document.implementation.createHTMLDocument('');
										_doc.body.innerHTML = _el.outerHTML;
										const _li = _doc.body.firstChild;
										_doc = null;
										// 移除m-for标签属性
										_li.removeAttribute('m-for');
										_fragment.appendChild(_li);
										// 编译dom
										compiler(_li, _str => eval(_str));
									}
									return _fragment;
								});
							`);
						}
						else if (dataList && dataList.constructor === Object) {
							fun = evaluateJavascript(`
								(function (_el, _obj, _compiler) {
									/** 模板 */
									const _fragment = document.createDocumentFragment();
									const _entries = Object.entries(_obj);
									for (let _i = 0; _i < _entries.length; _i++) {
										// 创建数据(考虑变量不存在的情况)
										// value
										${item !== undefined ? ('const ' + item + ' = _entries[_i][1];') : ''}
										// key
										${index !== undefined ? ('const ' + index + ' = _entries[_i][0];') : ''}
										// index
										${objIndex !== undefined ? ('const ' + objIndex + ' = _i;') : ''}
										// 创建dom
										let _doc = document.implementation.createHTMLDocument('');
										_doc.body.innerHTML = _el.outerHTML;
										const _li = _doc.body.firstChild;
										_doc = null;
										// 移除m-for标签属性
										_li.removeAttribute('m-for');
										_fragment.appendChild(_li);
										// 编译dom
										compiler(_li, _str => eval(_str));
									}
									return _fragment;
								});
							`);
						}
						else if (dataList && typeof dataList[Symbol.iterator]) {
							fun = evaluateJavascript(`
								(function (_el, _obj, _compiler) {
									/** 模板 */
									const _fragment = document.createDocumentFragment();
									let _i = 0;
									for (const _value of _obj) {
										// 创建数据(考虑变量不存在的情况)
										${item !== undefined ? ('const ' + item + ' = _value[1];') : ''}
										${index !== undefined ? ('const ' + index + ' = _value[0];') : ''}
										${objIndex !== undefined ? ('const ' + objIndex + ' = _i;') : ''}
										// 创建dom
										let _doc = document.implementation.createHTMLDocument('');
										_doc.body.innerHTML = _el.outerHTML;
										const _li = _doc.body.firstChild;
										_doc = null;
										// 移除m-for标签属性
										_li.removeAttribute('m-for');
										_fragment.appendChild(_li);
										// 编译dom
										_compiler(_li, _str => eval(_str));
										_i++;
									}
									return _fragment;
								});
							`);
						}
						if (typeof fun != 'function') throw new TypeError('未识别的m-for语法');
						/** @type { DocumentFragment } */
						const fragment = fun(el, dataList, compiler);
						[...fragment.children].forEach(e => {
							if (!el[sourceKey]) {
								e[sourceKey] = el;
								el[childKey].push(e);
							} else {
								e[sourceKey] = el[sourceKey];
								el[sourceKey][childKey].push(e);
							}
						});
						if (el[parentKey]) {
							const insertBeforeElement = el[siblingKey].filter(child => {
								// 排除不处于父节点的兄弟节点
								if (child.parentElement == el[parentKey]) return true;
								if (!el[sourceKey]) {
									return child == el;
								} else {
									return child == el[sourceKey];
								}
							}).find((_, index, arr) => {
								// 此处el并不是原先的el
								if (!el[sourceKey]) {
									return index > arr.indexOf(el);
								} else {
									return index > arr.indexOf(el[sourceKey]);
								}
							}) || null;
							el[parentKey].insertBefore(fragment, insertBeforeElement);
						} else if (el.parentNode) el.parentNode.replaceChild(fragment, el);
					}
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