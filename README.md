# 无名杀

####使用方法
#####运行
使用chrome（推荐）或safari打开index.html<br>
#####升级
windows：覆盖resources/app文件夹下的同名文件<br>
mac：覆盖contents/resources/app下的同名文件

####选项设置
#####通用
开启“触屏模式”可消除触屏设备上的点击延迟
#####外观
屏幕较小的设备可在外观选项中将布局改为“移动”，在移动布局中，点击左上角或右上角可显示顶部按钮，双击顶部可令界面下移<br>
若运行速度较慢可关闭“游戏特效”<br>
#####玩法
为游戏添加额外的规则，开启并重启后可在帮助中看到说明

####添加配音
#####启用
添加游戏未自带的配音或音效。需在选项－音效中开启“补全配音”<br>
支持mp3或ogg格式
#####技能
路径：audio/skill<br>
以制衡为例，若技能有一个配音，则命名为zhiheng.mp3，若有两个配音，则改为zhiheng1.mp3和zhiheng2.mp3<br>
查看自己技能名：在战局－命令中输入
````javascript
game.print(game.me.skills);
````
查看场上所有角色技能名：在战局－命令中输入
````javascript
var players=get.players(null,true);
while(players.length){
    game.print(players.shift().skills);
}
````
#####卡牌
路径：audio/card<br>
查看所有卡牌名：在战局－命令中输入
````javascript
for(var i in lib.card){
    if(lib.translate[i+'_info']){
        game.print(lib.translate[i],i);
    }
}
````
#####阵亡
路径：audio/die<br>
查看场上所有角色名：在战局－命令中输入
````javascript
var players=get.players(null,true);
while(players.length){
    var player=players.shift();
    if(player.name1){
        game.log(player.name1,player.name2);
    }
    else{
        game.log(player.name);
    }
}
````
