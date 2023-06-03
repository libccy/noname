# 无名杀（noname）
无名杀是一个使用JavaScript、HTML5和CSS编写的回合制卡牌桌游平台，可用于DIY常见的卡牌游戏。无名杀是一个网页应用程序(Web Application)，可在浏览器和客户端中运行。

## 如何运行？
由于无名杀是一个纯网页应用程序，所有具有多种运行方式。

### 直接使用浏览器打开index.js运行
你可以直接使用电脑上的浏览器打开此项目的index..html目录进行试玩。此种方法具有限制，权可当做在不借助额外程序的一种试玩方式。

### 在浏览器-服务器架构中运行
首先，你需要一个可访问的网页服务器（例如，apache、nginx等）。
其次，将noname文件夹放到网页服务器的托管目录，
最后，使用浏览器访问url http://localhost/noname 即可在浏览器上运行。
注：此种运行方式需要用户事先架设一个网页服务器，而架设服务器是一种独立于无名杀之外的通用技术，目前互联网上具有众多的教程，此处不在赘述。

### 使用特制的客户端运行
目前出现了一些能将纯网页应用程序打包成特定平台客户端的技术，比如electron技术可以将noname打包到windows和mac os等平台，而cordova可以将noname
打包到安卓平台。
目前无名杀社区，制作好的客户端，有由理版、玄武版和诗笺版。



客户端下载戳这里：

GitHub： https://github.com/libccy/noname/releases/tag/SSS

Coding： https://nakamurayuri.coding.net/p/noname/d/noname/git/releases/SSS

网页端推荐使用Chrome系内核浏览器游玩，不推荐使用Firefox浏览器
