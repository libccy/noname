# ASYNC章节

首先要辛苦诗笺喵制作了async的新框架哦，无名杀的技能写法又多了一种！async写法对于复杂的技能来说非常方便，为让大家更好的适应和过渡到async写法，也是为了响应大家的需要，特此编写了此入门指引喵~

另外在此声明: 此指引面向于JavaScript基础稍微薄弱的，对于async函数相关用法不熟悉的开发者，所以本指引在编写时偏向于技能写法，而不是专业的JavaScript异步编程讲解，如果想要了解更加详细的JavaScript异步编程，请参考[JavaScript异步编程指南](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous)

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

例如，函数`filter`要求你写出`(event, player, name)`参数，然后你才可以用`event`/`player`/`name`三个变量

而async函数也是如此，你需要写出`(event, trigger, player)`三个由无名杀提供的参数才能使用`event`/`trigger`/`player`三个变量

这样的好处是统一规范了函数写法，减少了新开发者的疑惑，你所使用的`event`/`trigger`/`player`都是你看得到的

而另外在报错/调试代码时，可以更加方便，这个我们之后再说

到这里你可能会反应过来，平常在`step`写法中经常直接使用`card`/`target`/`num`等变量，现在参数里面没有这些变量，要怎么样引用这些变量呢？

我们要知道，`card`/`target`/`num`等变量其实都是`event`的属性，无名杀提前为我们从`event`对象中取出了这些变量

换言之，我们用`event.card`/`event.target`/`event.num`就可以代替原本的`card`/`target`/`num`这些变量了

值得注意的是，`event.step`变量在async函数中不再有意义，因为没有了`step`标注，本体也无法确定async函数执行到了哪一步，自然`event.step`的值也就没有了意义

### 3. 那么async函数如何写出分步的效果呢？
来认识一下新的朋友——`await`
它就是我们分步的关键，我们来看个最简单的例子:

> 技能描述: 出牌阶段限一次，你可以摸两张牌，然后若手牌数量超过五张，你弃置两张牌。

如果是`step`写法，我们应该这样写:

```javascript
var skill = {
    enable: "phaseUse",
    usable: 1,
    content() {
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

到此你应该明白了，`await`的作用就是`等待`结算完成，然后再让后续代码继续执行

接下来我们来聊聊`step`用法中被替代的东西

### 4. 代替event.goto、event.redo、event.finish
我们来看看这三个函数的作用:

* `event.goto`: 跳转到指定步
* `event.redo`: 重新执行当前步
* `event.finish`: 结束当前事件

如果要使用async写法，那么这些函数就需要更换了，必须找到代替的方法

#### 代替`event.finish`

我们先从`event.finish`开始，它的作用是结束当前事件，那么如何替代它呢？

我们一直说async写法就是使用async函数，如果要退出一个函数你会使用什么呢？

使用`return`对吧？同样在async函数里面，你可以使用`return`退出一个async函数，无名杀检测到函数退出时，会自动结束当前事件

也就是说你可以把

```javascript
if (!result.bool) event.finish()
```

直接写成

```javascript
if (!result.bool) return
```

同时，如果你在分步中使用`event.finish()`结束事件，代码并不会立刻停止执行，当前步后面的代码依旧会继续执行，直到当前步结束为止。如果你要阻止后续代码的执行，你还需要额外进行处理才能不继续执行后续代码

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

而`event.goto`也是同理，你可以用`if`、`while`、`for`、`break`、`continue`等语句来代替它，从而达到更好的可读性

### 5. 操作结果的获取
使用过分步写法的应该很清楚，如果要获取操作的结果，就必须要在下一步使用`result`

而async函数里面如果想要获取`result`要怎么做呢？

我们这里提供两种办法:

#### 1. 解构写法

```javascript
var { result } = await xxx
```

你可以通过在`await`前面加上`var { result } =`来获取本次操作的结果，例如下面这样:

```javascript
var { result } = await player.chooseBool("你要摸牌吗？")
if (result.bool) {
    await player.draw()
}
```

上面的代码会先询问玩家是否摸牌，如果玩家点击了`确定`，那么就让玩家摸一张牌

#### 2. forResult写法

如果你不习惯使用解构语法，或者你认为解构的大括号让你实在不方便，你还可以换另一种方式:

```javascript
var result = await xxx.forResult()
```

这样获得的`result`与上面的代码是相同的

### 6. async使用的一些细节补充

恭喜你哦，看到这里，你对于async写法的大致特点已经掌握，那接下来我们就来对一些实战中可能遇到的问题进行补充吧

#### 1. 什么情况下要使用await？

非常简单的判断，你可以查看操作是否有以下情况:

1. 会触发时机。触发时机意味着可能进行插入结算，你需要等待所有插入结算的完成，故而使用`await`(包括使用`event.trigger`来主动触发时机也需要`await`)
2. 等待玩家确认。如果有个操作需要玩家点击确认，或者会弹出窗口给玩家查看时，你需要等待玩家确认完毕，所以也使用`await`
3. `asyncDelay`/`asyncDelayx`/其他Promise，这个我们稍后会讲到

另外哪些操作不要使用`await`呢？

根据现在无名杀本体代码，有大致下面几种情况：

1. 基本的运算。基本的运算都是即时性的，不需要你的代码去等待什么。基本运算包括很多：数学运算、文本(字符串)操作、数组操作、对象操作、变量操作等等...
2. 统计操作。例如统计玩家数量、统计手牌数量、统计标记数量、统计使用牌的次数、判断父事件的名称等等...这些都是直接获取一项已经确定的游戏数据，可以立刻执行完毕而不需要`await`
3. 操作标记、storage、ui界面。添加/删除标记、获取/设置storage、更改ui界面也都是可以立刻执行的操作。不过比较特殊的是ui操作，有些ui操作有动画效果，但是它们不使用`await`，需要你特地去监听它们的动画结束

不过如果在实际编写代码时，实在无法区分哪些需要`await`怎么办呢？

你可以通过在控制台输入`!!lib.element.content.xxx`(xxx为你的操作名称)来查看是否可以`await`，如果控制台显示是`true`，就说明需要你使用`await`等待这项操作完成

例如:

```javascript
player.draw(2)
player.addMark("mark")
```

上面的代码执行了两个操作，分别是`摸牌`与`添加标记`，如果我们要查看是否可以`await`那么可以这样做:

```javascript
!!lib.element.content.draw // true，可以await
!!lib.element.content.addMark // false，不能await
```

#### 2. delay与delayx

需要注意的是，在async函数里面，我们不能再使用`game.delay`/`game.delayx`/`game.resume`这三样了，我们需要替代方案

本体对于这种情况已经准备好了，来看看这两个新函数:

```javascript
await game.asyncDelay()
await game.asyncDelayx()
```

请注意哦，他们必须加上`await`，否则是不会产生任何效果的

那么有了这两个函数，你在编写代码时就可以进行替换了哦

将`game.delay()`替换为`await game.asyncDelay()`、`game.delayx()`替换为`await game.asyncDelayx()`，即可在async函数中实现类似的效果

#### 3. Promise的使用

上面我们提到了`game.resume`不能在async函数中使用，但是我们没有给出解决方案——这是因为使用`game.resume`需要我们会使用`Promise`

**Promise的概念**

`Promise`是什么？

`Promise`其实已经算老朋友了——只是你没有意识到使用了它，你使用`await`等待的东西其实就是它

`Promise`类似于一个通知，比如你点了一份外卖，如果你要知道外卖有没有完成，你肯定是查看外卖app是否显示已送达 而不是跑到楼下去看看外卖员有没有到对吧？

`Promise`就是充当了一个外卖app的作用，当你对它使用`await`时，你的代码会暂停执行，等待`Promise`提供者确认任务完成之后，`Promise`就会结束你代码的等待，并继续向下执行

**Promise的语法**

我们来看看`Promise`的创建:

```javascript
var { promise, resolve } = Promise.withResolvers()
```

其中`promise`就是我们可以进行`await`的东西，我们可以`await promise`来暂停当前代码的执行

但别着急！你创建的`Promise`还没有人通知结束，如果你直接等待会导致无限的等待时间哦！

如何通知结束呢？这就要用到我们的`resolve`函数了，你可以把`resolve`传递给通知代码，当通知代码执行了`resolve`时，你的`Promise`便会结束等待

**代码演示**

接下来我们来看看如何用`Promise`演示外卖送达的流程

```javascript
// 外卖平台部分
// 我们要提供dian_can()函数来接受外卖任务
var { promise, resolve } = Promise.withResolvers() // 创建一个新的promise

funcion dian_can() {
    return promise // 返回我们创建的promise
}

// 外卖员部分
// 当外卖员送达时需要通知用户取餐
... // 送餐流程省略
resolve() // 执行promise创建时提供的通知函数，告诉正在等待这个promise的代码任务已经完成

// 用餐人部分
// 我们执行dian_can()函数来发起一个外卖任务
var waimaiPromise = dian_can() // 调用并获取promise
await waimaiPromise // 等待外卖送达
```

从上面可以看出，如果要使用`Promise`，我们需要三个部分：

1. 创建`Promise`
2. 等待`Promise`
3. 通知`Promise`

**使用示例**

那么我们来实现一个简单的效果，用`await`暂停代码5秒:

我们的思路应该是这样的，首先我们肯定要创建一个`Promise`，这样才可以使用`await`

然后我们要在5秒后执行`resolve`函数，让`await`结束等待

```javascript
var { promise, resolve } = Promise.withResolvers() // 创建promise
setTimeout(resolve, 5000) // 将resolve传递给setTimeout，setTimeout是一个系统函数，会在指定时间后执行你传入的函数，这里填写的时间是5000毫秒即5秒
await promise // 等待直到resolve在5秒后被调用
```

你有没有发现，我们已经实现了类似`game.asyncDelay`的功能了！

而事实上无名杀本体的`game.asyncDelay`也就是使用这种方式实现的功能

当你掌握了`Promise`与`resolve`的使用时，你就可以进入下面的一节了

#### 4. pause与resume

`game.pause`与`game.resume`是一对游戏内暂停函数，与玩家暂停不同，它们用于`等待游戏动画`/`等待玩家确定`这类耗时的操作时使用

在分步中，如果你要等待玩家按下确定再执行下一步，你需要先执行`game.pause`，这将启动游戏内暂停，直到你执行`game.resume`之前，下一步都不会执行

而到了async函数里面，`game.resume`不再可以使用，这会导致事件被重复执行，出现不可预料的问题

那么如果要实现原来的效果要如何做呢？

这就要用到我们的`Promise`了，假设`button`是一个按钮，我们要等待按钮按下再继续执行，这种代码应该这样写:

```javascript
// 创建一个Promise来等待
var { promise, resolve } = Promise.withResolvers()

// 监听按钮点击，当按钮点击时执行大括号里面的代码
button.listen(() => {
    _status.paused = false // 手动关闭游戏内暂停，而不是执行`game.resume`
    resolve() // 结束await的等待
    game.log("玩家点击了按钮")
})

// 启动游戏内暂停
game.pause()
// 暂停代码的执行并等待点击
await promise
```

这里可能会有人疑惑，为什么已经用了`Promise`还要追加`game.pause`？

这是因为`Promise`只是暂停了当前代码的执行，并没有启动`游戏内暂停`，这会导致游戏其他部分并不知道已经暂停了，我们需要补充`game.pause`来告诉游戏已经暂停

#### 5. async的其他优势

**支持闭包访问**

什么是闭包？

闭包是指一种变量的访问，当一个函数访问外层代码声明的变量就叫做闭包访问，而那个变量成为闭包变量

```javascript
var v1 = 1

function funA() {
    var v2 = 2
    function funB() {
        return v1 + v2 // 访问了两个闭包变量
    }
}
```

在上面的代码中，对于`funB`函数来说，无论`v1`还是`v2`变量都不是它声明的，但是它可以通过闭包访问来获取这些变量

在`step`写法中，因为代码被重新编译了，导致无法使用闭包

这种情况下，你如果要访问你其他地方定义的变量，必须将这个变量暴露为公共变量，不利于扩展对自身数据的封闭管理

**更好的调试**

async写法支持电脑上的开发者工具进行断点调试

在电脑上可以按`Ctrl+Shift+I`打开开发工具，然后在`源代码`/`Sources`里面找到你觉得有问题的代码，在编辑器左边的行数点击一下，会出现一个蓝色的箭头，代表此行已经被打上断点

断点被打上后，当代码执行到此行时，开发工具会暂停代码的执行，此时你可以在开发工具里面观察各个变量的值，或者执行额外的代码

另外使用async写法的技能出现错误时，不会出现报错信息不正确的问题

---

好了，到此你就已经彻底的把async写法的关键知识浏览了一遍，如果要更好的巩固它，可以试着把你之前的技能改成async写法试试哦

感谢你的阅读，希望你能通过这篇指引来创作出更好的扩展喵~