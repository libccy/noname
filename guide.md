# 技能章节

## 一、技能基础教程:

### 1. 技能代码是什么样的？

我们来看下面的例子:

```javascript
var skill = {
    trigger: {
        player: "phaseBegin"
    },
    async content(event, trigger, player) {
        player.draw(2)
    }
}
```

所有技能最外层都用一个大括号包裹，以此代表着一个单独的技能

在游戏内编辑器中，技能都是按照 `var skill = {...};` 这类形式来写的:

```javascript
var skill = {
    ...
}
```

而如果你通过外部编辑器编辑技能，你可能会看到技能是这样的:

```javascript
...
技能名: {
    ...
}
...
```

这是内部编辑器和外部编辑器的不同，但他们大括号内的内容是一致的

而我们会着重去了解大括号内部的内容，也就是技能的具体代码

回到我们给出的例子:

```javascript
var skill = {
    trigger: {
        player: "phaseBegin"
    },
    async content(event, trigger, player) {
        player.draw(2)
    }
}
```

这个例子的对应的大致描述是:`“当你的回合开始时，你摸两张牌”`

接下来我们一点一点解析，让你明白代码是如何和描述一一对应的

首先你要明白这是一个触发技能，触发技能的特征是`当`一件事情发生时，如果满足什么条件，就执行一个效果

由此我们可以看出，所有触发技能都分为三部分:`时机`、`条件`、`效果`

而根据描述来说，这个技能只有时机和效果，所以它代码部分也只有两部分

#### 时机

> `trigger`代表着这个技能的时机，它后面跟着一对大括号
> 
> 里面的内容指定技能触发的时机是什么，在什么情况下触发
> 
> 无名杀的时机很多，比如`回合开始时`、`受到伤害时`、`使用牌时`等等
> 
> 这里我们只介绍一个触发时机: `phaseBegin`，代表`回合开始时`的代码
> 
> 而前面的`player`代表的是技能持有者，也就是技能描述中的“你”
> 
> 将两个连起来就是`当你的回合开始时`触发此技能
> 
> 那么到此我们就明白了技能的时机与描述基本的对应了

#### 效果

> `content`就是技能具体去做什么的效果
> 
> `async`这个单词我们暂时不进行解释，到async章节时我们会讲到
> 
> 我们看到`(event, trigger, player)`这里有三样东西，这三样东西是固定的位置，是由无名杀提供给我们的技能，以供技能执行效果
> 
> 其中`player`我们已经讲过了，就是持有此技能的玩家
> 
> 而`event`、`trigger`分别代表技能本身和触发技能的事件，事件简单来说就是无名杀的一次结算，后面我们也会具体讲到
> 
> 我们看到`content`大括号里面有一行代码`player.draw(2)`，`content`大括号里面代表了技能触发后执行的操作，即效果具体内容
> 
> 而在无名杀中，表示对玩家执行某种操作是这样的:
> 
> > `玩家`.`操作`(`操作细节信息`)
> 
> 在代码`player.draw(2)`中，`玩家`是`player`——即技能持有者，而`draw`是摸牌操作的代码，括号中的`2`指定了摸牌这个操作的细节信息——摸牌数量为2张。
> 
> 那么合起来就是让`技能持有者`执行`摸牌`操作，摸牌数量为`2`张

根据这个格式，你可以轻松的实现`闭月`的代码:

```javascript
var skill = {
    trigger: {
        player: "phaseJieshuBegin"
    },
    async content(event, trigger, player) {
        player.draw(1)
    }
}
```

其中`phaseJieshuBegin`代表`当结束阶段开始时`，`player.draw(1)`代表让`闭月`的持有者摸一张牌

接下来是本节JavaScript知识补充，你如果不了解JavaScript，想要打好编写代码的基础，请一定要阅读

#### JavaScript知识补充
> 在JavaScript中，一对单独的大括号一般表示的东西叫做`对象`，`对象`可以拥有多个`属性`，每个属性之间通过逗号分隔，且属性名称不能相同
> 
> 如`{ noname: "无名杀" }`代表了一个对象，其中`noname`代表对象的一个`属性`，`"无名杀"`代表对象的`noname`属性的数据值
> 
> 在JavaScript当中，文本数据(又称`字符串`)要用引号包裹，否则会导致代码执行不正常甚至报错
> 
> 本节中的触发时机代码就是一个对象:
> 
> ```javascript
> trigger: {
>     player: "phaseBegin"
> }
> ```
> 
> 这代表技能的`trigger`属性是一个对象，并且这个对象有一个属性`player`，数据值为文本数据(字符串)`"phaseBegin"`
> 
> 那么如果要再添加一个触发时机`global: "phaseBegin"`，应该如何写呢？
> 
> 答案是在前一个触发时机代码后面加上一个逗号，再添加一个新触发时机代码，像这样:
> 
> ```javascript
> trigger: {
>     player: "phaseBegin",
>     global: "phaseJieshuBegin"
> }
> ```
> 
> `global`代表所有人，所以这个触发时机为`当玩家回合开始时`或`当任何玩家结束阶段开始时`

# ASYNC章节
## 一、了解async函数
async函数即类似下面格式的代码:
```javascript
async xxx(...) {
    ...
}
```
它的特征是由`async`开头，标记这是一个async函数

很多人喜欢称其为`新写法`，与`step`这个`旧写法`相对

### 1. async写法怎么用？
很简单，我们先来看看一个旧写法下的技能:

```javascript
var skill = {
    trigger: {
        player: "phaseBegin"
    },
    content() {
        "step 0"
        player.draw(2)
    }
}
```

这个技能对应的描述是: `当你回合开始时，你摸两张牌`

改写为async写法后长这样:

```javascript
var skill = {
    trigger: {
        player: "phaseBegin"
    },
    async content(event, trigger, player) {
        await player.draw(2)
    }
}
```

我们看到改变了几处地方:
1. 添加了`async`在函数前面
2. 添加了三个参数: `event`,`trigger`,`player`
3. 函数里面的`"step 0"`被删除了
4. `player.draw`之前添加了`await`

接下来我们来具体聊聊这些改变究竟带来了什么

### 2. async函数替代step写法的基本变化有哪些？
async函数写法可以让`content`这类step写法的函数贴近其他的函数
> 例如函数`filter`要求你写出`(event, player, name)`参数，然后你才可以用`event`/`player`/`name`三个变量
> 
> 而async函数也是如此，你需要写出`(event, trigger, player)`三个由无名杀提供的参数才能使用`event`/`player`/`name`三个变量
> 
> 这样的好处是统一规范了函数写法，减少了新开发者的疑惑，你所使用的`event`/`trigger`/`player`都是你看得到的
> 
> 而另外在报错/调试代码时，可以更加方便，这个我们之后再说
>
> 到这里你可能会反应过来，平常在`step`写法中经常直接使用`card`/`target`/`num`等变量，现在参数里面没有这些变量，要怎么样引用这些变量呢？
> 
> 我们要知道，`card`/`target`/`num`等变量其实都是`event`的属性，无名杀提前为我们从`event`对象中取出了这些变量
> 
> 换言之我们用`event.card`/`event.target`/`event.num`就可以代替原本的`card`/`target`/`num`这些变量了
> 
> 值得注意的是，`event.step`变量在async函数中不再有意义，因为没有了`step`标注，本体也无法确定async函数执行到了哪一步，自然`event.step`的值也就没有了意义

### 3. 那么async函数如何写出分步的效果呢？
来认识一下新的朋友——`await`
它就是我们分步的关键，我们来看个最简单的例子:

> 技能描述: 出牌阶段限一次，你可以摸两张牌，然后若手牌数量超过五张，你弃置两张牌。

如果是`step`写法，我们应该这样写:

```javascript
var skill = {
    enable: "phaseUse",
    usable: 1,
    async content(event, trigger, player) {
        "step 0"
        player.draw(2)
        "step 1"
        if (player.countCards('h') > 5)
            player.chooseToDiscard(2, true)
    }
}
```

很明显，我们需要分为两步，因为我们要在摸牌之后计算手牌数量

而分布的作用正是等待这一步所有结算完成，再执行下一步

如果不分步就执行`countCards`，会导致我们读取的是摸牌前的手牌数量，从而导致效果与描述不一致

那么我们来看看async写法:

```javascript
var skill = {
    enable: "phaseUse",
    usable: 1,
    async content(event, trigger, player) {
        await player.draw(2)
        
        if (player.countCards('h') > 5)
            await player.chooseToDiscard(2, true)
    }
}
```

我们可以看到分步没有了，取而代之的是每次操作前面附加了一个`await`

`await`和英语的`wait`(等待)很相近，实际上就是取`async`的`a`与`wait`拼接而成，我们由此也可以了解到它的大致意思就是`等待`，等待它后面的操作完成

而`await player.draw(2)`中，就是等待摸牌的结算完成，然后再执行下面的代码

而这正和我们分步来等待结算完成的作用是一致的，一个是等待一次结算，一个是等待本步中所有结算完成

到此你应该明白了，`await`的作用就是`等待`结算完成，然后执行后续代码

### 4. 代替event.goto、event.redo、event.finish
我们来看看这三个函数的作用:

* `event.goto`: 跳转到指定步
* `event.redo`: 重新执行当前步
* `event.finish`: 结束当前事件

如果要使用async写法，那么这些函数就需要更换了，必须找到代替的方法

#### 代替`event.finish`

我们先从`event.finish`开始，它的作用是结束当前事件，那么如何替代它呢？

我们一直说async写法就是使用async函数，如果要退出一个函数你会使用什么呢？

使用`return`对吧，同样在async函数里面，你可以使用`return`退出一个async函数，无名杀检测到函数退出时，会自动结束当前事件

也就是说你可以把

```javascript
if (!result.bool) event.finish()
```

直接写成

```javascript
if (!result.bool) return
```

同时， 如果你使用`event.finish()`结束事件，意味着后面的代码依旧会继续执行，直到下一次结算完成，你还需要额外进行处理才能不继续执行后续代码

而`return`会立刻停止函数执行，不需要你再额外进行处理

#### 代替`event.goto`与`event.redo`

有了上面`return`的启发，你应该可以想到代替`event.goto`与`event.redo`的替代方案了

JavaScript里面如果要重复执行一段代码，最简单的办法就是使用循环

比如下面这段代码使用了`event.redo`:

```javascript
var target = event.targets.shift()
target.draw(1)
if (event.targets.length) event.redo()
```

你可以改成

```javascript
while (event.targets.length) {
    var target = event.targets.shift()
    await target.draw(1)
}
```

这样写出来的代码也更加清晰，你可以一眼看出来这是一个循环，对吧？

而`event.goto`也是同理，你可以用`if`、`while`、`for`、`break`、`continue`等语句来代替它

### 5. 操作结果的获取
### 6. async使用的一些细节补充
#### delay与delayx
#### pause与resume
#### Promise的使用