'use strict';
mode.brawl={
    start:function(){
        var dialog=ui.create.dialog();
        dialog.classList.add('fixed');
        dialog.classList.add('scroll1');
        dialog.classList.add('scroll2');
        dialog.classList.add('fullwidth');
        dialog.classList.add('fullheight');
        dialog.classList.add('noupdate');
        dialog.classList.add('character');
        dialog.contentContainer.style.overflow='visible';
        dialog.style.overflow='hidden';
        dialog.content.style.height='100%';
        dialog.contentContainer.style.transition='all 0s';
        var packnode=ui.create.div('.packnode',dialog);
        lib.setScroll(packnode);
        var clickCapt=function(){
            var active=this.parentNode.querySelector('.active');
            if(active){
                for(var i=0;i<active.nodes.length;i++){
                    active.nodes[i].remove();
                    if(active.nodes[i].showcaseinterval){
                        clearInterval(active.nodes[i].showcaseinterval);
                        delete active.nodes[i].showcaseinterval;
                    }
                }
                active.classList.remove('active');
            }
            this.classList.add('active');
            for(var i=0;i<this.nodes.length;i++){
                dialog.content.appendChild(this.nodes[i]);
            }
            var showcase=this.nodes[this.nodes.length-1];
            showcase.style.height=(dialog.content.offsetHeight-showcase.offsetTop)+'px';
            if(typeof showcase.action=='function'){
                showcase.action(showcase._showcased?false:true);
                showcase._showcased=true;
            }
        }
        var createNode=function(name){
            var info=lib.brawl[name];
            var node=ui.create.div('.dialogbutton.menubutton.large',info.name,packnode,clickCapt);
            var caption=get.translation(info.mode)+'模式';
            if(info.submode){
                caption+=' - '+info.submode;
            }
            var intro;
            if(Array.isArray(info.intro)){
                intro='<ul style="text-align:left;margin-top:0;width:450px">';
                for(var i=0;i<info.intro.length;i++){
                    intro+='<li>'+info.intro[i];
                }
            }
            else{
                intro=info.intro;
            }
            var showcase=ui.create.div();
            showcase.style.margin='0px';
            showcase.style.padding='0px';
            showcase.style.width='100%';
            showcase.style.display='block'
            showcase.action=info.showcase;
            node.nodes=[
                ui.create.div('.caption',caption),
                ui.create.div('.text center',intro),
                showcase
            ];
            node.link=name;
            return node;
        }
        for(var i in lib.brawl){
            createNode(i);
        }
        clickCapt.call(packnode.firstChild);
        var start=ui.create.div('.menubutton.round.highlight','斗',dialog.content,function(){
            var active=packnode.querySelector('.active');
            if(active){
                for(var i=0;i<active.nodes.length;i++){
                    if(active.nodes[i].showcaseinterval){
                        clearInterval(active.nodes[i].showcaseinterval);
                        delete active.nodes[i].showcaseinterval;
                    }
                }
                dialog.delete();
                var info=lib.brawl[active.link];
                ui.brawlinfo=ui.create.system('乱斗',null,true);
                lib.setPopped(ui.brawlinfo,function(){
                    var uiintro=ui.create.dialog('hidden');
                    uiintro.add(info.name);
                    uiintro.add('<div class="text center">'+active.nodes[1].innerHTML+'</div>');
                    var ul=uiintro.querySelector('ul');
                    if(ul){
                        ul.style.width='180px';
                    }
                    uiintro.add(ui.create.div('.placeholder'));
                    return uiintro;
                },250);
                _status.brawl=info.content;
                game.switchMode(info.mode);
                if(info.init){
                    info.init();
                }
            }
        });
        start.style.position='absolute';
        start.style.left='auto';
        start.style.right='10px';
        start.style.top='auto';
        start.style.bottom='10px';
        start.style.width='80px';
        start.style.height='80px';
        start.style.lineHeight='80px';
        start.style.fontSize='72px';
        start.style.zIndex=2;
    },
    game:{

    },
    brawl:{
        duzhansanguo:{
            name:'毒战三国',
            mode:'identity',
            intro:'牌堆中额外添加10%的毒',
            showcase:function(){
                var node=this;
                node.nodes=node.nodes||[];
                node.showcaseinterval=setInterval(function(){
                    var card=game.createCard('du');
                    node.nodes.push(card);
                    card.style.position='absolute';
                    var rand1=Math.round(Math.random()*100);
                    var rand2=Math.round(Math.random()*100);
                    card.style.left='calc('+rand1+'% - '+rand1+'px)';
                    card.style.top='calc('+rand2+'% - '+rand2+'px)';
                    card.style.transform='rotate('+Math.round(Math.random()*360)+'deg)';
                    card.style.opacity=0;
                    node.appendChild(card);
                    ui.refresh(card);
                    card.style.opacity=1;
                    if(node.nodes.length>7){
                        setTimeout(function(){
                            while(node.nodes.length>5){
                                node.nodes.shift().delete();
                            }
                        },500);
                    }
                },1000);
            },
            content:{
                cardPile:function(list){
                    var num=Math.ceil(list.length/10);
                    while(num--){
                        list.push([['heart','diamond','club','spade'].randomGet(),Math.ceil(Math.random()*13),'du']);
                    }
                    return list;
                }
            },
        },
        daozhiyueying:{
            name:'导师月英',
            mode:'identity',
            intro:'牌堆中所有非延时锦囊牌数量翻倍；移除拥有集智技能的角色',
            showcase:function(init){
                var node=this;
                var player1,player2;
                if(init){
                    player1=ui.create.player().init('huangyueying');
                    player2=ui.create.player().init('re_huangyueying');
                    player1.style.left='20px';
                    player1.style.top='20px';
                    player1.style.transform='scale(0.9)';
                    player1.node.count.remove();
                    player2.style.left='auto';
                    player2.style.right='20px';
                    player2.style.top='20px';
                    player2.style.transform='scale(0.9)';
                    player2.node.count.remove();
                    this.appendChild(player1);
                    this.appendChild(player2);
                    this.player1=player1;
                    this.player2=player2;
                }
                else{
                    player1=this.player1;
                    player2=this.player2;
                }
                var rect1=player1.getBoundingClientRect();
                var rect2=player2.getBoundingClientRect();
                var left1=rect1.left+rect1.width/2-ui.arena.offsetLeft;
                var left2=rect2.left+rect2.width/2-ui.arena.offsetLeft;
                var top1=rect1.top+rect1.height/2-ui.arena.offsetTop;
                var top2=rect2.top+rect2.height/2-ui.arena.offsetTop;
                node.showcaseinterval=setInterval(function(){
                    game.linexy([left1,top1,left2,top2]);
                },1000);
            },
            init:function(){
                for(var i in lib.character){
                    var skills=lib.character[i][3]
                    if(skills.contains('jizhi')||skills.contains('rejizhi')||skills.contains('lingzhou')){
                        delete lib.character[i];
                    }
                }
            },
            content:{
                cardPile:function(list){
                    var list2=[];
                    for(var i=0;i<list.length;i++){
                        list2.push(list[i]);
                        if(get.type(list[i][2])=='trick'){
                            list2.push(list[i]);
                        }
                    }
                    return list2;
                }
            }
        },
        weiwoduzun:{
            name:'唯我独尊',
            mode:'identity',
            intro:[
                '牌堆中杀的数量增加30',
                '游戏开始时，主公获得一枚战神标记',
                '拥有战神标记的角色杀造成的伤害+1',
                '受到杀造成的伤害后战神印记将移到伤害来源的武将牌上'
            ]
        },
        tongxingzhizheng:{
            name:'同姓之争',
            mode:'versus',
            submode:'2v2',
            intro:'姓氏相同的武将组合一队'
        },
        tongqueduopao:{
            name:'铜雀夺袍',
            mode:'identity',
            intro:[
                '主公必选曹操',
                '其余玩家从曹休、文聘、曹洪、张郃、夏侯渊、徐晃、许褚这些武将中随机选中一个',
                '游戏开始时将麒麟弓和爪黄飞电各置于每名角色的装备区内，大宛马洗入牌堆，移除其他的武器牌和坐骑牌'
            ]
        },
        // shenrudihou:{
        //     name:'深入敌后',
        //     mode:'versus',
        //     submode:'1v1',
        //     intro:'选将阶段选择武将和对战阶段选择上场的武将都由对手替你选择，而且你不知道对手为你选择了什么武将'
        // },
        tongjiangmoshi:{
            name:'同将模式',
            mode:'identity',
            intro:'主公选择一个武将，所有角色均使用此武将',
        },
        baiyudujiang:{
            name:'白衣渡江',
            mode:'versus',
            submode:'2v2',
            intro:[
                '玩家在选将时可从6-8张的武将牌里选择两张武将牌，一张面向大家可见（加入游戏），另一张是隐藏面孔（暗置）',
                '选择的两张武将牌需满足以下至少两个条件：1.性别相同；2.体力上限相同；3.技能数量相同',
                '每名玩家在其回合开始或回合结束时，可以选择将自己的武将牌弃置，然后使用暗置的武将牌进行剩余的游戏'
            ]
        }
    }
};
