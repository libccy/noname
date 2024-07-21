# triggerSkill API 介绍文档

## 触发器技能简介

触发器技能（triggerSkill），简称为“触发器”，是在特定的时间节点触发对应效果的技能，其中“效果”特指技能的 `content`。

### 触发器的优点
1. 具有极好的异步函数支持
2. 通过 hook（钩子）进行生命周期管理，同时支持自定义 hook 和异步 hook
3. 可以通过 `expire` 设置触发器的持续时间，到达 `expire` 节点后自动移除
4. 可以通过 `config.triggerTimes` 来设置触发器的触发次数，达到触发次数后自行移除
5. 作用域保留，你设置的 async `content` 和 hook 的代码内可以自由使用外部变量，十分灵活

注意：普通的 `content` 会经过编译，无法保留作用域，同时普通的 `content` 无法添加 `beforeContent` 和 `afterContent` 钩子。

## 普通触发器

普通触发器的本质是一个特化的普通技能，默认属性如下：
- `forced: true`
- `charlotte: true`
- `popup: false`

默认属性可以自行覆盖抵消。在 `createTriggerSkill(config)` 的 `config` 中可以配置 `default: false` 选项取消默认属性。

## 全局触发器

全局触发器的本质是一个特化的全局技能，默认属性如下：
- `forced: true`
- `charlotte: true`
- `popup: false`

默认属性可以自行覆盖抵消。全局触发器可以用于取代许多传统的锁定触发的全局技能，拥有完整的生命周期管理，可以用于一些复杂操作。

### 全局触发器相较于普通全局技能的优点
普通的全局技能无法使用 `init`、`onremove` 标签，也无法通过 `mark: true` 显示标记。全局触发器可以通过 `add hook` 和 `remove hook` 实现上述效果。

### 用法示例
```javascript
const {handle} = await game.addGlobalTriggerSkill({
    name: "_test1",
    marktext: "灵",
    translate: "灵力",
    intro: {
        content: "mark",
    },
    hook: {
        afterAdd: function(skill) {
            console.log("skill:", skill);
            for (const player of game.players) {
                player.setMark(skill, player.hp, false);
                player.markSkill(skill);
            }
        },
        afterRemove: function(skill) {
            for (const player of game.players) {
                player.setMark(skill, 0, false);
                player.unmarkSkill(skill);
            }
        },
    },
});
```

## 创建普通触发器

### 方法
```javascript
game.createTriggerSkill(config)
```
- `config.name`：技能名，不填则生成随机名的技能
- `config.translate`：设置 `lib.translate[name]`（技能中文名）
- `config.expire`：设置技能持续时间，到达 `expire` 时机后技能自动移除
  - `config.expire: "default"`：设置为 `player.addTempSkill` 的默认值：`global: ['phaseAfter', 'phaseBeforeStart']`
- `config.triggerTimes`：设置限定的触发次数，达到触发次数后自动移除，技能移除后统计的触发次数会清空，重新计数
- `config.default`：设置为 `false` 后不应用默认属性
  - 默认属性：
    - `forced: true`
    - `charlotte: true`
    - `popup: false`

### 返回值
```javascript
{name, handle}
```
- `name`：技能名

### 添加触发器 (async)
```javascript
player.addTriggerSkill(name)
```
- 返回值：操作状态
  - 操作成功返回 `true`
  - 否则返回 `false`

### 移除触发器 (async)
```javascript
player.removeTriggerSkill(name)
```
- 返回值：操作状态
  - 操作成功返回 `true`
  - 否则返回 `false`

## 创建全局触发器

与 `createTriggerSkill` 基本一致：
```javascript
game.createGlobalTriggerSkill(config)
```
- `config.name`：技能名
- 注意，全局技能的技能名最好以 `_` 开始

### 返回值
```javascript
{name, handle}
```
- `name`：技能名

### 挂载全局触发器 (async)
```javascript
game.mountGlobalTriggerSkill(name)
```
- 返回值：操作状态
  - 操作成功返回 `true`
  - 否则返回 `false`

### 移除全局触发器 (async)
```javascript
game.removeGlobalTriggerSkill(name)
```
- 返回值：操作状态
  - 操作成功返回 `true`
  - 否则返回 `false`

## hook 概念及 handle 对象的方法

`handle` 对象除了可以通过 `createTriggerSkill` 和 `createGlobalTriggerSkill` 获取，也可以通过 `lib.skill[name].triggerSkill.handle` 获取。

### 设置 triggerSkill 的属性
```javascript
handle.set(skill)
handle.set(attr, value)
```
- `attr`：
  - `hook: {lifetime, name, content}`：添加生命周期钩子
  - 注意，`set` 函数只能添加 `hook`，要移除 `hook` 请使用 `removeHook` 和 `removeAllHook` 函数

# 添加生命周期钩子

## `handle.addHook(lifetime, func, name)`

- **lifetime**: 生命周期节点
- **func**: 钩子的内容，可为异步函数
- **name**: 可选，允许添加匿名钩子 (anonymous hook)

### 示例
```javascript
handle.addHook('beforeAdd', asyncFunction, 'hookName');
```

## `handle.addHook(hook)`

- **hook**: hook对象
  - `hook: { lifetime: func }`
  - `hook: { lifetime: { name, content } }`

### 示例
```javascript
handle.addHook({
  beforeAdd: asyncFunction
});
```

```javascript
handle.addHook({
  beforeAdd: {
    name: 'hookName',
    content: asyncFunction
  }
});
```

### 注意事项
- 一个生命周期内的钩子 (hook) 的 `name` 是唯一的。
- 返回值：操作状态信息。
  - 如果原钩子已存在则返回 `replace`。
  - 否则返回 `add`。
- 新添加的钩子始终在数组的末尾。

## 已有的生命周期节点

- 触发器添加时
  - `beforeAdd`
  - `afterAdd`

- 触发器变更时 (已有同名触发器再添加时触发该效果)
  - `beforeReplace`
  - `afterReplace`
    - 注意，如果没有设置 Replace Hook，默认执行 Add Hook。
    - 注意，该 hook 的时机暂未实现。

- 触发器移除时
  - `beforeRemove`
  - `afterRemove`

- 触发器效果执行时
  - `beforeContent`
  - `afterContent`
    - 注意，目前只为 async content 添加了这两个时机。
    - 普通的 content 无法触发这两个时机。

与 Event 的事件流程类似，在 `before` 阶段的钩子函数返回 `true` 时 (prevent)，可以阻止后续阶段的执行。

- 注意，`prevent` 特性只在必要的时候使用，一般情况下不要使用。

## `handle.replaceHook()`

- 与 `addHook` 不同，`replaceHook` 替换后 hook 位置不变。
- 返回值：操作状态信息。
  - 如果不存在同名钩子，返回 `false`。
  - 否则返回 `true`。
- 注意，该 API 暂未实现。

### 移除生命周期钩子
```javascript
handle.removeAllHook(filter_func)
```
- `filter_func(hook)`

```javascript
handle.removeAllHook(lifetime)
```
- 移除一个生命周期内的所有钩子

```javascript
handle.removeAllHook(lifetime, name)
handle.removeAllHook(lifetime, filter_func)
```
- 返回值：发现并移除了的生命周期钩子的数量

### 添加生命周期钩子
```javascript
handle.addHook(lifetime, func, name)
```
- `lifetime`：生命周期节点
- `func`：钩子的内容，可为异步函数
- `name`：可选，允许添加匿名钩子（anonymous hook）

```javascript
handle.addHook(hook)
```
- `hook`：hook 对象
- `hook: {lifetime: func}`
  
- `hook: {lifetime: {name, content}}`

### 执行特定生命周期的钩子 (async)
```javascript
handle.execHook(lifetime, name, ...args)
```
- `lifetime`：生命周期节点
- `name`：可选，指定 `hook` 的名称，不填执行这个生命周期节点的所有 `hook`
- `...args`：传递给 `hook` 函数的参数

- 返回值：执行的钩子的数量

### 移除此 handle 对应的全局技能 (async)
```javascript
handle.remove(reason)
```
- `reason`：移除原因
  - 预设的 `reason`：
    - `ReachTriggerLimit`：到达触发次数被移除
    - `ReachExpire`：到达持续时间被移除

- 返回值：操作状态
  - 操作成功返回 `true`
  - 否则返回 `false`

# 注意事项

注意，由于 `triggerSkill` 支持异步钩子，导致 `triggerSkill` 的部分 API 也为异步函数。

## 当前阶段

`triggerSkill` API 不允许在普通 `content` 中使用，而且创建的触发器也只能使用 `async content`

## 异步的 API

### TriggerSkill：

- `player.addTriggerSkill`
- `player.removeTriggerSkill`

### GlobalTriggerSkill：

- `game.mountGlobalTriggerSkill`
- `game.addGlobalTriggerSkill`
- `game.removeGlobalTriggerSkill`

### Handle：

- `handle.execHook()`
- `handle.remove()`

## 同步的 API

### TriggerSkill：

- `game.createTriggerSkill`

### GlobalTriggerSkill：

- `game.createGlobalTriggerSkill`

### Handle：

- `handle.set`
- `handle.removeAllHook`
- `handle.removeHook`
- `handle.addHook`
- `handle.replaceHook`

## 异步 API 的使用原则

如果未来提供同步版本的 API，提供给普通 `content` 使用的对应的 `triggerSkill` API 也不会允许使用异步钩子。

在 `async content` 中调用异步函数，原则上来说，每个异步函数前都应该加上 `await`。但是为了让 `triggerSkill` 的异步 API 不需要重复 `await`，使用【多级异步锁】进行了异步操作的对齐。你可以只在需要获取异步函数返回结果的时候使用 `await`。

---

## 使用示例

### 示例1：使用全局触发器的 `afterAdd` 和 `afterRemove` 钩子
```javascript
const {name, handle} = await game.addGlobalTriggerSkill({
    name: "_test1",
    marktext: "灵",
    translate: "灵力",
    intro: {
        content: "mark",
    },
    hook: {
        afterAdd: function(skill) {
            console.log("skill:", skill);
            for (const player of game.players) {
                player.setMark(skill, player.hp, false);
                player.markSkill(skill);
            }
        },
        afterRemove: function(skill) {
            for (const player of game.players) {
                player.setMark(skill, 0, false);
                player.unmarkSkill(skill);
            }
        },
    },
});
```

### 示例2：使用 `triggerTimes` 限制触发器只发动一次
```javascript
const {name} = game.createTriggerSkill({
    name: "test2",
    triggerTimes: 1,
    trigger: {
        player: "useCardAfter",
    },
    async content(event, trigger, player) {
        await player.draw(2);
        //player.damage();
    },
});

game.me.addTriggerSkill(name);
```

### 示例3：通过 `expire` 限制技能的持续时间，在回合结束后自动移除
```javascript
const {name} = game.createTriggerSkill({
    name: "test3",
    expire: {
        player: "phaseAfter",
    },
    trigger: {
        player: "useCardAfter",
    },
    async content(event, trigger, player) {
        await player.draw(2);
    },
});

game.me.addTriggerSkill(name);
```

### 示例 4：展示作用域保留与变量传递的方便

实现一个稍微复杂一点的技能：

在其他角色的弃牌阶段结束后，你可对其造成一点伤害并封印其技能直到其下一位次的角色使用卡牌之后或回合结束之后。

```javascript
lib.skill.test4={
    trigger:{
        global:"phaseDiscardAfter",
    },
    direct:true,
    async content(event,trigger,player){
        if(trigger.player===player) return;
                         
        const {result}=await player.chooseBool("是否封印其技能直到下一位次的角色的回合结束并对其造成一点伤害？");
        if(result.bool){
            trigger.player.addSkill("fengyin");
            await trigger.player.damage(1,player);
                                                    
            const next=trigger.player.next;
            const {name}=game.createTriggerSkill({
                expire:{
                    player:"phaseAfter",
                },
                trigger:{
                    player:"useCardAfter",
                },                
                triggerTimes:1,
                async content(){},//使用 async content 保证能正常触发 afterContent hook
                hook:{
                    afterRemove(){
                        trigger.player.removeSkill("fengyin");
                    },
                },
            });
            await next.addTriggerSkill(name);            
        }
    },
};

game.me.addSkill("test4");
```
