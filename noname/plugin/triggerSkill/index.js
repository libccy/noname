// @ts-nocheck
import { game } from "../../game/index.js";
import { lib } from "../../library/index.js";

import config from "./config.js";

/*
参考：
player.addTempSkill
player.when

触发器技能(triggerSkill)，简称为“触发器”
在特定的时间节点触发对应效果

“效果”特指技能的content

触发器的优点：
1.具有极好的异步函数支持
2.通过 hook(钩子) 进行生命周期管理，同时支持自定义 hook 和异步 hook
3.可以通过 expire 设置触发器的持续时间，到达expire节点后自动移除
4.可以通过 config.triggerTimes 来设置触发器的触发次数，达到触发次数后自行移除
5.作用域保留，你设置的async content和hook的代码内可以自由使用外部变量，十分灵活
注意，普通的content会经过编译，无法保留作用域，同时普通的content无法添加 beforeContent 和 afterContent 钩子
*/

/*
普通触发器
普通触发器的本质是一个特化的普通技能
普通触发器默认属性
forced: true,
charlotte: true,
popup: false,
默认属性可以自行覆盖抵消
在createTriggerSkill(config)的config中可以配置 default:false 选项取消默认属性
*/

/*
全局触发器
全局触发器的本质是一个特化的全局技能

全局触发器默认属性
forced: true,
charlotte: true,
popup: false,
默认属性可以自行覆盖抵消

全局触发器可以用于取代许多的传统的锁定触发的全局技能
全局触发器拥有完整的生命周期管理，可以用于一些复杂操作

全局触发器相较于普通全局技能的优点：
普通的全局技能无法使用init、onremove标签
也无法通过 mark:true 显示标记
全局触发器可以通过 add hook 和.remove hook 实现上述效果
*/

/*
API设计思维：
组件式
多级异步锁
*/

let Dev_mode = config.dev;
const console = new Proxy(window.console, {
	get(target, prop) {
		if (Dev_mode) {
			if (prop in target) {
				return target[prop];
			} else {
				return; // 处理console中不存在的属性或方法
			}
		} else {
			return function () {}; // Dev_mode不为true时，返回空方法
		}
	},
});

let YH;
if (!window.YH) {
	YH = new Proxy(
		{},
		{
			get(target, prop) {
				return function () {}; // 返回空方法
			},
		}
	);
} else {
	YH = window.YH;
}

/*
在async content中调用异步函数，原则上来说，每个异步函数前都应该加上await
但是为了让triggerSkill的异步API不需要重复await，使用【多级异步锁】进行了异步操作的对齐
你可以只在需要获取异步函数返回结果的时候使用 await 

多级异步锁(防止异步死锁)
异步死锁：
异步函数嵌套调用，连续两次Lock，无法解锁(Unlock)

多级异步锁原理：
异步锁栈(后进先出)：
licence1→licence2→licence3

初始时刻，当异步锁数组没有元素时，可以直接注册进入
当异步锁数组已经存在元素时：
1.提供与licence1相同的licence才能进入(函数自身回调)
2.licence1提前为licence2注册licence，然后licence2才能注册进入

父锁释放的sub_licence称为子锁，它们是相互对应的关系
其中，licence1称为主锁，位于第一位(也是栈的底层)，在同一时间，栈底的主锁只存在一个

除了以上的两种情况，其他情况尝试注册的licence必须进入等待队列
等待队列(先进先出)：
waiter1→waiter2→waiter3
当主锁被释放后，释放waiter1，通知其注册licence(主锁)
*/

/*
async_lock:{
    licence,
    promise,
    resolve,
    sub_licence,
}
*/
const async_lock_array = [];

/*
async_lock_waiter:{
    promise,
    resolve,
}
*/
const async_lock_waiter_array = [];

/*
async_lock  父锁
licence  子锁

返回值：检验结果
selfCall  自身调用
sub  满足sub_licence检验，可以作为子锁
wait  不满足以上两种情况，现在不能加入异步锁栈，需要加入等侯队列
*/
const Lock_checkLicence = function (async_lock, licence) {
	let selfCall, sub, wait;
	if (licence === async_lock.licence) {
		//允许自身回调
		selfCall = true;
		//sub=true;
	} else if (licence === async_lock.sub_licence) {
		sub = true;
	} else if (
		async_lock.sub_licence === "Any" ||
		async_lock.sub_licence === "All"
	) {
		sub = true;
	} else {
		wait = true;
	}
	return { selfCall, sub, wait };
};

let Lock_times = 0;
const Lock = async function (licence) {
	console.log("Lock " + licence);
	Lock_times++;
	console.log("Lock_times:", Lock_times);

	const arr = async_lock_array;
	let selfCall, sub, wait;

	if (arr.length === 0) {
	} else {
		const async_lock = arr[arr.length - 1];
		const result = Lock_checkLicence(async_lock, licence);
		selfCall = result.selfCall;
		sub = result.sub;
		wait = result.wait;

		if (wait) {
			const { promise, resolve } = Promise.withResolvers();
			const waiter = { promise, resolve };
			async_lock_waiter_array.push(waiter);
			await promise;
			console.log("Lock " + licence + " wait完毕");

			if (async_lock_array.length !== 1)
				throw "异步锁队列出错，同时添加了多个异步锁作为主锁";
		}
	}

	const { promise, resolve } = Promise.withResolvers();
	const new_async_lock = {
		licence,
		promise,
		resolve,

		sub,
		selfCall,
	};

	arr.push(new_async_lock);

	if (wait) {
		//删除之前的主锁
		arr.shift();
	}

	if (Lock_times >= 5) {
		console.log("async_lock_array:", YH.stringify(arr));
	}
};

/*
释放子通行证允许sub_licence注册进入异步锁栈
sub_licence  充许的子通行证
特殊通行证：
  Any  在该父锁下，允许接下来的任一licence进行Lock(只限免一次)
  All  在该父锁下，允许所有licence进行Lock
*/
const ReleaseSublock = function (licence, sub_licence) {
	//console.log("ReleaseSublock");

	const arr = async_lock_array;
	const async_lock = arr[arr.length - 1];
	if (async_lock.sub_licence)
		throw "ReleaseSublock 错误，似乎先前的子异步锁尚未解锁";
	async_lock.sub_licence = sub_licence;
};

let Unlock_times = 0;
const Unlock = function (licence) {
	console.log("Unlock " + licence);
	Unlock_times++;
	console.log("Unlock_times:", Unlock_times);

	const arr = async_lock_array;
	const async_lock = arr[arr.length - 1];

	console.log("async_lock_array:", YH.stringify(arr));

	if (!async_lock) {
		console.log("async_lock_array:", arr);
		throw "Unlock 错误，主锁丟失";
	}
	if (licence !== async_lock.licence) {
		console.log("async_lock_array:", arr);
		console.log("async_lock.licence:", async_lock.licence);
		console.log("licence:", licence);
		throw "Unlock 层级错误，父锁提前解锁，似乎子异步锁尚未解锁";
	}

	arr.pop();

	if (async_lock.sub) {
		//这是子锁
		//清除上级锁下放的sub_licence
		const pre_async_lock = arr[arr.length - 1];
		if (!Lock_checkLicence(pre_async_lock, async_lock.licence))
			throw "Unlock 子锁时层级错误，似乎主异步锁变更了子锁";

		if (pre_async_lock.sub_licence === "All") {
		} else {
			delete pre_async_lock.sub_licence;
		}
	} else if (async_lock_waiter_array.length) {
		console.log("waiter开始释放");
		const waiter = async_lock_waiter_array.shift();
		waiter.resolve();
	}

	async_lock.resolve();
};

/*
handle外置组件
handle对象除了可以通过createTriggerSkill和createGlobalTriggerSkill获取
也可以通过 lib.skill[name].triggerSkill.handle 获取
*/

/*
setting:{
  global,
}
*/
game.createTriggerSkill_handle_basic = function (obj, setting = {}) {
	const handle_component_basic = {
		set_setattr(skill, attr, value) {
			if (attr === "content") {
				obj.storage.content = value;
			} else if (attr === "hook") {
				this.addHook(value);
			} else if (attr === "translate") {
				lib.translate[obj.name] = value;
			} else if (attr === "triggerTimes") {
				obj.storage.triggerTimes = value;
				if (obj.global) {
					if (obj.count.triggerTimes === undefined)
						obj.count.triggerTimes = 0;

					this.addHook(
						"afterContent",
						async function () {
							obj.count.triggerTimes += 1;
							if (
								obj.count.triggerTimes >=
								obj.storage.triggerTimes
							) {
								await handle_component_global.remove(
									"ReachTriggerLimit"
								);
							}
						},
						"__triggerTimesCounter"
					);

					this.addHook(
						"afterRemove",
						async function () {
							delete obj.count.triggerTimes;
						},
						"__triggerTimesCounter_clear"
					);
				} else {
					let counter = obj.name + "_triggerTimes";
					this.addHook(
						"afterContent",
						async function (skill, player) {
							//execHook
							console.log("triggerTimesCounter");

							if (!player.storage[counter])
								player.storage[counter] = 0;

							player.storage[counter]++;
							if (
								player.storage[counter] >=
								obj.storage.triggerTimes
							) {
								await player.removeTriggerSkill(obj.name);
							}
						},
						"__triggerTimesCounter"
					);

					this.addHook(
						"afterRemove",
						async function (skill, player) {
							delete player.storage[counter];
						},
						"__triggerTimesCounter_clear"
					);
				}
			} else if (attr === "expire") {
				obj.storage.expire = value;

				let expire_hook = obj.name + "_expire_hook";
				if (obj.global) {
					this.addHook(
						"afterAdd",
						() => {
							game.addGlobalTriggerSkill({
								name: expire_hook,
								trigger: value,
								triggerTimes: 1,
								content: async function () {
									const result = await this.remove(
										"ReachExpire"
									);
								},
							});
						},
						expire_hook
					);
				} else {
					this.addHook(
						"afterAdd",
						(skill, player) => {
							lib.skill[expire_hook] = {
								onremove: function (player, skill) {
									player.removeTriggerSkill(
										obj.name,
										"ReachExpire"
									);
								},
							};
							if (value === "default") {
								player.addTempSkill(expire_hook);
							} else {
								player.addTempSkill(expire_hook, value);
							}
						},
						expire_hook
					);
				}
			} else {
				skill[attr] = value;
			}
		},
		/*
        设置triggerSkill的属性
        set(config)
        set(atrr,value)
        
        atrr
          hook:{lifetime,name,content}  添加生命周期钩子
        注意，set函数只能添加 hook，要移除hook请使用removeHook和removeAllHook函数
        
        set函数可以用于动态设置技能的属性(同createTriggerSkill的config)，但以下属性不允许动态设置，设置后不允许变更        
        name  不允许通过set函数设置，只能在creatTriggerSkill的时候设置
        expire
        
        注意，一般情况下不要直接操作lib.skill[name]，尽量使用set函数设置属性
        */
		set(...args) {
			const skill = obj.skill;
			if (args.length == 0) return this;
			else if (args.length == 1) {
				const skill_attribute = args[0];
				for (const i in skill_attribute) {
					this.set_setattr(skill, i, skill_attribute[i]);
				}
			} else if (args.length == 2) {
				const key = args[0];
				const value = args[1];
				this.set_setattr(skill, key, value);
			}

			return this;
		},
		remove_Hook_basic(setting = {}, ...filters) {
			let once;
			if (setting.times === 1) once = true;
			//解析参数
			let filter_config, filter_func;
			if (filters.length === 1) {
				if (typeof filters[0] === "string") {
					filter_config = {
						lifetime: filters[0],
					};
				} else {
					filter_func = filters[0];
				}
			} else if (filters.length === 2) {
				if (typeof filters[1] === "string") {
					filter_config = {
						lifetime: filters[0],
						name: filters[1],
					};
				} else {
					filter_config = {
						lifetime: filters[0],
					};
					filter_func = filters[1];
				}
			}

			let removed = 0;

			const hooklib = obj.storage.hooklib;
			let hooks;
			if (filter_config.lifetime) {
				hooks = hooklib[filter_config.lifetime];

				//不要在遍历数组的过程中改变原数组的长度
				const indexs = [];

				if (hooks) {
					for (let index = 0; index < hooks.length; index++) {
						const hook = hooks[index];
						if (filter_config.name) {
							if (hook.name !== filter_config.name) {
								continue;
							}
						}
						if (filter_func) {
							if (!filter_func(hook)) continue;
						}

						if (once) {
							hooks.splice(index, 1);
							return true;
						} else {
							indexs.push(index);
						}
					}
				}

				if (indexs.length) removed = indexs.length;
				indexs.forEach((index) => {
					hooks.splice(index, 1);
				});
			} else {
				//对应removeAllHook(filter_func)
				for (const i in hooklib) {
					if (once) {
						if (this.remove_Hook_basic(setting, i, filter_func))
							return true;
					} else {
						removed += this.remove_Hook_basic(
							setting,
							i,
							filter_func
						);
					}
				}
			}

			if (once) {
				return false;
			} else {
				return removed;
			}
		},
		/*
        移除生命周期钩子
        
        removeAllHook(filter_func)
          filter_func(hook)
        
        removeAllHook(lifetime)
        移除一个生命周期内的所有钩子
        
        removeAllHook(lifetime,name)
        removeAllHook(lifetime,filter_func)
                
        返回值：发现并移除了的生命周期钩子的数量             
        */
		removeAllHook(...filters) {
			this.remove_Hook_basic({}, ...filters);
		},
		/*
        与removeAllHook不同，removeHook只执行一次
        参数同removeAllHook
        返回值：是否发现并移除了钩子
        */
		removeHook(...filters) {
			this.remove_Hook_basic({ times: 1 }, ...filters);
		},

		/*
        添加生命周期钩子
        addHook(lifetime,func,name)
          lifetime  生命周期节点
          func  钩子的内容，可为异步函数
          name  可选，允许添加匿名钩子(anonymous hook)
        
        addHook(hook)
          hook hook对象
          hook:{
              lifetime:func
          }
          
          hook:{
              lifetime:{
                  name,
                  content,
              }
          }
        
        一个生命周期内的钩子(hook)的name是唯一的
                
        返回值：操作状态信息
        如果原钩子已存在则返回 replace
        否则返回 add
        注意：
        新添加的钩子始终在数组的末尾
        
        已有的生命周期节点
        触发器添加时
        beforeAdd、afterAdd
        
        触发器变更时(已有同名触发器再添加时触发该效果)
        beforeReplace、afterReplace
        注意，如果没有设置Replace Hook，默认执行Add Hook
        注意，该hook的时机暂未实现
        
        触发器移除时
        beforeRemove、afterRemove
        
        触发器效果执行时
        beforeContent、afterContent
        注意，目前只为async content添加了这两个时机
        普通的content无法触发这两个时机
        
        与Event的事件流程类似，在before阶段的钩子函数返回true时(prevent)，可以阻止后续阶段的执行
        注意，prevent特性只在必要的时候使用，一般情况下不要使用        
        */
		addHook(lifetime, func, name, setting = {}) {
			//console.log("addHook args:",YH.stringify(arguments));
			/*
            {
                lifetime:content
                lifetime:{
                    name,
                    content,
                }
            }
            */
			console.log("lifetime:", lifetime);
			if (typeof lifetime === "object") {
				for (const time in lifetime) {
					console.log("time:", time);
					const hook = lifetime[time];
					if (typeof hook === "object") {
						this.addHook(time, hook.content, hook.name);
					} else {
						this.addHook(time, hook);
					}
				}
				/*
                func=lifetime.content;
                name=lifetime.name;
                lifetime=lifetime.lifetime;
                */
			}

			let result = "add";
			if (name) {
				if (this.removeAllHook(lifetime, name)) {
					result = "replace";
				}
			}
			const hooklib = obj.storage.hooklib;
			if (!hooklib[lifetime]) {
				hooklib[lifetime] = [];
			}
			const hooks = hooklib[lifetime];

			const hook = {
				name,
				content: func,
			};

			hooks.push(hook);

			return result;
		},
		/*
        与addHook不同，replaceHook替换后hook位置不变
        返回值：操作状态信息
        如果不存在同名钩子，返回false
        否则返回true
        注意，该API暂未实现
        */
		replaceHook() {},
		/*
        执行特定生命周期的钩子(async)
        lifetime  生命周期节点
        name  可选，指定hook的名称，不填执行这个生命周期节点的所有hook
        ...args  传递给hook函数的参数
        
        返回值：执行的钩子的数量
        */
		async execHook(lifetime, name, ...args) {
			await Lock("execHook");
			ReleaseSublock("execHook", "All");

			console.log("obj:", obj);
			let execed = 0;
			const hooklib = obj.storage.hooklib;
			const hooks = hooklib[lifetime];
			if (!hooks) {
				Unlock("execHook");
				return execed;
			}
			for (let i = 0; i < hooks.length; i++) {
				const hook = hooks[i];
				if (name) {
					if (hook.name !== name) continue;
				}
				await hook.content(...args);
				execed++;
			}

			Unlock("execHook");
			return execed;
		},
		/*
        async trigger(){
            //event, trigger, player
            const result=await obj.skill.content(_status.event, _status.event, _status.event.player);
            if(result==="cancel") return false;
            else return true;
        },
        */
	};
	const handle_component_global = {
		/*
        移除此handle对应的全局技能(async)
        
        reason  移除原因
        预设的reason：
        ReachTriggerLimit  到达触发次数被移除
        ReachExpire  到达持续时间被移除
        
        返回值：操作状态
        操作成功返回true
        否则返回false
        */
		async remove(reason) {
			await Lock("remove");
			ReleaseSublock("remove", "execHook");
			if (
				await handle_component_basic.execHook(
					"beforeRemove",
					null,
					obj.name,
					reason
				)
			) {
				Unlock("remove");
				return false;
			}
			//一般情况下，不要使用这个特性

			game.removeGlobalSkill(obj.name);

			ReleaseSublock("remove", "execHook");
			await handle_component_basic.execHook(
				"afterRemove",
				null,
				obj.name,
				reason
			);

			Unlock("remove");
			return true;
		},
	};

	Object.assign(obj, handle_component_basic);
	if (setting.global) Object.assign(obj, handle_component_global);
	return obj;
};

game.createTriggerSkill_handle = function (obj) {
	return game.createTriggerSkill_handle_basic(obj);
};
game.createGlobalTriggerSkill_handle = function (obj) {
	return game.createTriggerSkill_handle_basic(obj, { global: true });
};

game.createTriggerSkill_getContent_basic = function (
	name,
	handle,
	content,
	setting = {}
) {
	if (
		content &&
		content.constructor &&
		content.constructor.name === "AsyncFunction"
	) {
		return async function (event, trigger, player) {
			if (setting.global) {
				if (await handle.execHook("beforeContent", null, name))
					return "cancel";
			} else {
				let player;
				if (_status.event) {
					player = _status.event.player;
				}
				if (await handle.execHook("beforeContent", null, name, player))
					return "cancel";
			}

			await content(event, trigger, player);

			if (setting.global) {
				await handle.execHook("afterContent", null, name);
			} else {
				let player;
				if (_status.event) {
					player = _status.event.player;
				}

				console.log("execHook afterContent");
				await handle.execHook("afterContent", null, name, player);
			}
		};
	} else return content;
};

game.createTriggerSkill_getContent = function (name, handle, content) {
	return game.createTriggerSkill_getContent_basic(name, handle, content);
};
game.createGlobalTriggerSkill_getContent = function (name, handle, content) {
	return game.createTriggerSkill_getContent_basic(name, handle, content, {
		global: true,
	});
};

/*
注意，由于triggerSkill支持异步钩子，导致triggerSkill的部分API也为异步函数
当前阶段triggerSkill API不允许在普通content中使用，而且创建的触发器也只能使用 async content
异步的API：
triggerSkill：
player.addTriggerSkill、player.removeTriggerSkill

globalTriggerSkill：
game.mountGlobalTriggerSkill、game.addGlobalTriggerSkill、game.removeGlobalTriggerSkill

handle：
handle.execHook()
handle.remove()

同步的API：
triggerSkill：
game.createTriggerSkill

globalTriggerSkill：
game.createGlobalTriggerSkill

handle：
handle.set、handle.removeAllHook、handle.removeHook、handle.addHook、handle.replaceHook

如果未来提供同步版本的API，提供给普通content使用的对应的triggerSkill API也不会允许使用异步钩子
*/

game.createTriggerSkill_index = 0;
game.createGlobalTriggerSkill_index = 0;

/*
setting:{
    global:{
        add:true,
    },
    ...
}
*/
game.createTriggerSkill_basic = function (_trigger, _name, setting = {}) {
	const global = setting.global;

	console.log("createTriggerSkill_basic args:", arguments);
	//解析参数
	let handle, name, config, obj;
	if (!_name) {
		obj = _trigger;
		_trigger = undefined;
	} else if (typeof _name === "object") {
		obj = _name;
	} else name = _name;

	if (obj) {
		name = obj.name;
		config = obj;
	}

	if (global) {
		if (!name)
			name = "_GlobalTriggerSkill_" + game.createGlobalTriggerSkill_index;
	} else {
		name = "TriggerSkill_" + game.createTriggerSkill_index;
	}

	handle = game.createGlobalTriggerSkill_handle({
		name,
		get skill() {
			return lib.skill[name];
		},
		storage: {
			hooklib: {
				/*
                lifetime:hooks,
                ...
                */
			},
			//content:skillContent
			count: {},
		},
	});
	if (global) {
		handle.global = true;
	}

	lib.skill[name] = {
		trigger: _trigger,
		triggerSkill: {
			handle,
		},
		get content() {
			if (global) {
				return game.createGlobalTriggerSkill_getContent(
					name,
					handle,
					handle.storage.content
				);
			} else
				return game.createTriggerSkill_getContent(
					name,
					handle,
					handle.storage.content
				);
		},
	};
	if (config && config.default === false) {
	} else {
		lib.skill[name].forced = true;
		lib.skill[name].charlotte = true;
		lib.skill[name].popup = true;
	}

	Object.defineProperty(lib.skill, name, {
		configurable: true,
		//这类技能不需要被遍历到
		enumerable: false,
		writable: true,
		value: lib.skill[name],
	});

	game.broadcast(function (name) {
		Object.defineProperty(lib.skill, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: {
				triggerSkill: {
					handle: {},
				},
			},
		});
	}, name);

	if (config && config.default === false) {
		delete config.default;
	} else {
		game.broadcast(function (name) {
			lib.skill[name].forced = true;
			lib.skill[name].charlotte = true;
			lib.skill[name].popup = true;
		}, name);
	}

	if (config) {
		delete config.name;
		handle.set(config);
	}

	game.createGlobalTriggerSkill_index++;

	return {
		name,
		handle,
	};
};

/*
创建普通触发器
createTriggerSkill(config)
  config.name  技能名，不填入则生成随机名的技能
  
  config.translate  设置lib.translate[name](技能中文名)
  config.expire  设置技能持续时间，到达expire时机后技能自动移除，expire的值参考player.addTempSkill
    config.expire:"default"  设置为player.addTempSkill的默认值：global: ['phaseAfter', 'phaseBeforeStart']
  config.triggerTimes  设置限定的触发次数，达到触发次数后自动移除，技能移除后统计的触发次数会清空，重新计数
  config.default  设置为false后不应用默认属性
    默认属性：
    forced: true,
    charlotte: true,
    popup: false,

createTriggerSkill(trigger,name)
  trigger  设置技能的trigger
  name  技能名
createTriggerSkill(trigger,config)

返回值：{name,handle}
  name  技能名
*/

game.createTriggerSkill = function (_trigger, _name) {
	const result = game.createTriggerSkill_basic(_trigger, _name);

	return result;
};

/*
创建全局触发器
与createTriggerSkill基本一致
createGlobalTriggerSkill(config)
  config.name  技能名
  注意，全局技能的技能名最好以_开始

注意，全局触发器的config.expire没有default选项
createGlobalTriggerSkill(trigger,name)
createGlobalTriggerSkill(trigger,config)

返回值：{name,handle}
  name  技能名
*/

game.createGlobalTriggerSkill = function (_trigger, _name) {
	const result = game.createTriggerSkill_basic(_trigger, _name);

	return result;
};

/*
挂载全局触发器(async)
返回值：操作状态
操作成功返回true
否则返回false
*/
game.mountGlobalTriggerSkill = async function (name) {
	await Lock("mountGlobalTriggerSkill");

	console.log("name:", name);
	const handle = lib.skill[name].triggerSkill.handle;

	ReleaseSublock("mountGlobalTriggerSkill", "execHook");
	if (await handle.execHook("beforeAdd", null, name)) {
		Unlock("mountGlobalTriggerSkill");
		return false;
	}

	game.addGlobalSkill(name);

	ReleaseSublock("mountGlobalTriggerSkill", "execHook");
	let num = await handle.execHook("afterAdd", null, name);
	console.log("num:", num);

	Unlock("mountGlobalTriggerSkill");
	return true;
};

/*
移除全局触发器(async)
返回值：操作状态
操作成功返回true
否则返回false

tips：
也可以通过handle.remove()移除
*/
game.removeGlobalTriggerSkill = async function (name) {
	await Lock("removeGlobalTriggerSkill");

	const handle = lib.skill[name].triggerSkill.handle;

	ReleaseSublock("removeGlobalTriggerSkill", "remove");
	const result = await handle.remove();

	Unlock("removeGlobalTriggerSkill");
	return result;
};

/*
创建全局触发器并挂载(async)
相当于：
const {name}=game.createGlobalTriggerSkill();
await game.mountGlobalTriggerSkill(name);

参数同 game.createGlobalTriggerSkill
返回值同 game.mountGlobalTriggerSkill
*/

game.addGlobalTriggerSkill = async function (_trigger, _name) {
	await Lock("addGlobalTriggerSkill");

	const { name } = game.createGlobalTriggerSkill(_trigger, _name);

	ReleaseSublock("addGlobalTriggerSkill", "mountGlobalTriggerSkill");
	const result = await game.mountGlobalTriggerSkill(name);

	Unlock("addGlobalTriggerSkill");
	return result;
};

const player = lib.element.player;

/*
添加触发器(async)

返回值：操作状态
操作成功返回true
否则返回false
*/
player.addTriggerSkill = async function (name) {
	await Lock("addTriggerSkill");

	const player = this;
	const handle = lib.skill[name].triggerSkill.handle;

	ReleaseSublock("addTriggerSkill", "execHook");
	if (await handle.execHook("beforeAdd", null, name, player)) {
		Unlock("addTriggerSkill");
		return false;
	}

	player.addSkill(name);

	ReleaseSublock("addTriggerSkill", "execHook");
	await handle.execHook("afterAdd", null, name, player);

	Unlock("addTriggerSkill");
	return true;
};

/*
移除触发器(async)

返回值：操作状态
操作成功返回true
否则返回false
*/
player.removeTriggerSkill = async function (name, reason) {
	await Lock("removeTriggerSkill");

	const player = this;
	const handle = lib.skill[name].triggerSkill.handle;

	ReleaseSublock("removeTriggerSkill", "execHook");
	if (await handle.execHook("beforeRemove", null, name, player, reason)) {
		Unlock("removeTriggerSkill");
		return false;
	}

	player.removeSkill(name);

	ReleaseSublock("removeTriggerSkill", "execHook");
	await handle.execHook("afterRemove", null, name, player, reason);

	Unlock("removeTriggerSkill");
	return true;
};
