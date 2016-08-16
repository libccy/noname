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
            game.save('currentBrawl',this.link);
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
            if(lib.storage.currentBrawl==name){
                clickCapt.call(node);
            }
            return node;
        }
        for(var i in lib.brawl){
            createNode(i);
        }
        if(!lib.storage.currentBrawl){
            clickCapt.call(packnode.firstChild);
        }
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
        start.style.margin='0';
        start.style.padding='5px';
        start.style.fontSize='72px';
        start.style.zIndex=3;
        start.style.transition='all 0s';
    },
    brawl:{
        duzhansanguo:{
            name:'毒战三国',
            mode:'identity',
            intro:'牌堆中额外添加10%的毒',
            showcase:function(init){
                var node=this;
                var func=function(){
                    var card=game.createCard('du');
                    node.nodes.push(card);
                    card.style.position='absolute';
                    var rand1=Math.round(Math.random()*100);
                    var rand2=Math.round(Math.random()*100);
                    var rand3=Math.round(Math.random()*40)-20;
                    card.style.left='calc('+rand1+'% - '+rand1+'px)';
                    card.style.top='calc('+rand2+'% - '+rand2+'px)';
                    card.style.transform='scale(0.8) rotate('+rand3+'deg)';
                    card.style.opacity=0;
                    node.appendChild(card);
                    ui.refresh(card);
                    card.style.opacity=1;
                    card.style.transform='scale(1) rotate('+rand3+'deg)';
                    if(node.nodes.length>7){
                        setTimeout(function(){
                            while(node.nodes.length>5){
                                node.nodes.shift().delete();
                            }
                        },500);
                    }
                };
                if(init){
                    node.nodes=[];
                    for(var i=0;i<5;i++){
                        func();
                    }
                }
                node.showcaseinterval=setInterval(func,1000);
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
                    player1.node.count.innerHTML='2';
                    player1.node.count.dataset.condition='mid';
                    player2.style.left='auto';
                    player2.style.right='20px';
                    player2.style.top='20px';
                    player2.style.transform='scale(0.9)';
                    player2.node.count.innerHTML='2';
                    player2.node.count.dataset.condition='mid';
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

                var createCard=function(wuxie){
                    var card;
                    if(wuxie){
                        card=game.createCard('wuxie');
                        card.style.transform='scale(0.9)';
                    }
                    else{
                        card=ui.create.card();
                    }
                    card.style.opacity=0;
                    card.style.position='absolute';
                    card.style.zIndex=2;
                    card.style.margin=0;
                    return card;
                }

                var func=function(){
                    game.linexy([left1,top1,left2,top2]);
                    var card=createCard(true);
                    card.style.left='43px';
                    card.style.top='58px';
                    node.appendChild(card);
                    ui.refresh(card);
                    card.style.opacity=1;
                    card.style.transform='scale(0.9) translate(137px,152px)';
                    setTimeout(function(){
                        card.delete();
                    },1000);
                    player1.node.count.innerHTML='1';

                    setTimeout(function(){
                        if(!node.showcaseinterval) return;
                        player1.node.count.innerHTML='2';
                        var card=createCard();
                        card.style.left='43px';
                        card.style.top='58px';
                        card.style.transform='scale(0.9) translate(137px,152px)';
                        node.appendChild(card);
                        ui.refresh(card);
                        card.style.opacity=1;
                        card.style.transform='scale(0.9)';
                        setTimeout(function(){
                            card.delete();
                        },1000);
                    },300);

                    setTimeout(function(){
                        if(!node.showcaseinterval) return;
                        player2.node.count.innerHTML='1';
                        game.linexy([left2,top2,left1,top1]);
                        var card=createCard(true);
                        card.style.left='auto';
                        card.style.right='43px';
                        card.style.top='58px';
                        node.appendChild(card);
                        ui.refresh(card);
                        card.style.opacity=1;
                        card.style.transform='scale(0.9) translate(-137px,152px)';
                        setTimeout(function(){
                            card.delete();
                        },700);

                        setTimeout(function(){
                            if(!node.showcaseinterval) return;
                            player2.node.count.innerHTML='2';
                            var card=createCard();
                            card.style.left='auto';
                            card.style.right='43px';
                            card.style.top='58px';
                            card.style.transform='scale(0.9) translate(-137px,152px)';
                            node.appendChild(card);
                            ui.refresh(card);
                            card.style.opacity=1;
                            card.style.transform='scale(0.9)';
                            setTimeout(function(){
                                card.delete();
                            },700);
                        },300);
                    },1000);
                };
                node.showcaseinterval=setInterval(func,2200);
                func();
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
                '牌堆中杀的数量增加30%',
                '游戏开始时，主公获得一枚战神标记',
                '拥有战神标记的角色杀造成的伤害+1',
                '受到杀造成的伤害后战神印记将移到伤害来源的武将牌上'
            ],
            showcase:function(init){
                var node=this;
                var player;
                if(init){
                    player=ui.create.player();
                    player.init('boss_lvbu2');
                    player.style.left='calc(50% - 75px)';
                    player.style.top='20px';
                    player.node.count.remove();
                    player.node.hp.remove();
                    player.style.transition='all 0.5s';
                    node.appendChild(player);
                    node.playernode=player;
                }
                else{
                    player=node.playernode;
                }
                var num=0;
                var num2=0;
                this.showcaseinterval=setInterval(function(){
                    var dx,dy
                    if(num2%3==0){
                        player.animate('target');
                        player.animate('zoomin');
                    }
                    num2++;
                    switch(num++){
                        case 0:dx=-150;dy=0;break;
                        case 1:dx=-120;dy=100;break;
                        case 2:dx=0;dy=155;break;
                        case 3:dx=120;dy=100;break;
                        case 4:dx=150;dy=0;break;
                    }
                    if(num>=5){
                        num=0;
                    }
                    var card=game.createCard('sha');
                    card.style.left='calc(50% - 52px)';
                    card.style.top='68px';
                    card.style.position='absolute';
                    card.style.margin=0;
                    card.style.zIndex=2;
                    card.style.opacity=0;
                    node.appendChild(card);
                    ui.refresh(card);
                    card.style.opacity=1;
                    card.style.transform='translate('+dx+'px,'+dy+'px)';
                    setTimeout(function(){
                        card.delete();
                    },700);
                },700);
            },
            init:function(){
                lib.skill.weiwoduzun={
                    mark:true,
                    intro:{
                        content:'杀造成的伤害+1'
                    },
                    group:['weiwoduzun_damage','weiwoduzun_lose'],
                    subSkill:{
                        damage:{
                            trigger:{source:'damageBegin'},
                            forced:true,
                            filter:function(event){
                                return event.card&&event.card.name=='sha'&&event.notLink();
                            },
                            content:function(){
                                trigger.num++;
                            }
                        },
                        lose:{
                            trigger:{player:'damageEnd'},
                            forced:true,
                            filter:function(event){
                                return event.source&&event.source.isAlive();
                            },
                            content:function(){
                                player.removeSkill('weiwoduzun');
                                trigger.source.addSkill('weiwoduzun');
                            }
                        }
                    }
                };
                lib.translate.weiwoduzun='战神';
                lib.translate.weiwoduzun_bg='尊';
            },
            content:{
                cardPile:function(list){
                    var num=0;
                    for(var i=0;i<list.length;i++){
                        if(list[i][2]=='sha') num++;
                    }
                    num=Math.round(num*0.3);
                    if(num<=0) return list;
                    while(num--){
                        var nature='';
                        var rand=Math.random();
                        if(rand<0.15){
                            nature='fire';
                        }
                        else if(rand<0.3){
                            nature='thunder';
                        }
                        var suit=['heart','spade','club','diamond'].randomGet();
                        var number=Math.ceil(Math.random()*13);
                        if(nature){
                            list.push([suit,number,'sha',nature]);
                        }
                        else{
                            list.push([suit,number,'sha']);
                        }
                    }
                    return list;
                },
                gameStart:function(){
                    if(_status.mode=='zhong'){
                        game.zhong.addSkill('weiwoduzun');
                    }
                    else{
                        game.zhu.addSkill('weiwoduzun');
                    }
                }
            }
        },
        tongxingzhizheng:{
            name:'同姓之争',
            mode:'versus',
            submode:'2v2',
            intro:'姓氏相同的武将组合一队',
            showcase:function(init){
                var node=this;
                var getList=function(){
                    var list=[['guanyu','guanping','guansuo','guanyinping'],
                    ['caocao','caopi','caozhi','caorui'],['liubei','liushan','liuchen'],
                    ['xiahouyuan','xiahouba','xiahoushi'],['sunjian','sunquan','sunce'],
                    ['zhangjiao','zhangliang','zhangbao'],['zhugeliang','zhugeguo','zhugejin','zhugeke'],
                    ['mateng','machao','madai','mayunlu']];
                    list.randomSort();
                    var list2=[];
                    for(var i=0;i<list.length;i++){
                        list2=list2.concat(list[i]);
                    }
                    node.list=list2;
                };
                var func=function(){
                    if(!node.list.length){
                        getList();
                    }
                    var card=ui.create.player();
                    card.init(node.list.shift());
                    card.node.marks.remove();
                    card.node.count.remove();
                    card.node.hp.remove();
                    node.nodes.push(card);
                    card.style.position='absolute';
                    var rand1=Math.round(Math.random()*100);
                    var rand2=Math.round(Math.random()*100);
                    var rand3=Math.round(Math.random()*40)-20;
                    card.style.left='calc('+rand1+'% - '+(rand1*1.5)+'px)';
                    card.style.top='calc('+rand2+'% - '+(rand2*1.8)+'px)';
                    card.style.transform='scale(1.2) rotate('+rand3+'deg)';
                    card.style.opacity=0;
                    ui.refresh(card);
                    node.appendChild(card);
                    ui.refresh(card);
                    card.style.transform='scale(0.9) rotate('+rand3+'deg)';
                    card.style.opacity=1;
                    if(node.nodes.length>4){
                        setTimeout(function(){
                            while(node.nodes.length>3){
                                node.nodes.shift().delete();
                            }
                        },500);
                    }
                };
                node.list=[];
                if(init){
                    node.nodes=[];
                    for(var i=0;i<3;i++){
                        func();
                    }
                }
                node.showcaseinterval=setInterval(func,1000);
            },
            init:function(){
                var map={};
                var map3=[];
                var list1=['司','夏','诸'];
                var list2=['马','侯','葛'];
                var exclude=['界','新','大'];
                for(var i in lib.character){
                    if(lib.filter.characterDisabled(i)) continue;
                    var surname=lib.translate[i];
                    for(var j=0;j<surname.length;j++){
                        if(exclude.contains(surname[j])) continue;
                        if(!/[a-z]/i.test(surname[j])){
                            var index=list1.indexOf(surname[j]);
                            if(index!=-1&&surname[j+1]==list2[index]){
                                surname=surname[j]+surname[j+1];
                            }
                            else{
                                surname=surname[j];
                            }
                            break;
                        }
                    }
                    if(!map[surname]){
                        map[surname]=[];
                    }
                    map[surname].push(i);
                }
                for(var i in map){
                    if(map[i].length<4){
                        delete map[i];
                    }
                    else{
                        map3.push(i);
                    }
                }
                _status.brawl.map=map;
                _status.brawl.map3=map3;
            },
            content:{
                submode:'two',
                chooseCharacterFixed:true,
                chooseCharacter:function(list,player){
                    if(player.side==game.me.side){
                        if(_status.brawl.mylist){
                            return _status.brawl.mylist.randomGets(2);
                        }
                    }
                    else{
                        if(_status.brawl.enemylist){
                            return _status.brawl.enemylist.randomGets(2);
                        }
                    }
                    var surname=_status.brawl.map3.randomRemove();
                    var list=_status.brawl.map[surname];
                    if(player==game.me){
                        _status.brawl.mylist=list;
                    }
                    else{
                        _status.brawl.enemylist=list;
                    }
                    return list.randomRemove(2);
                }
            }
        },
        tongqueduopao:{
            name:'铜雀夺袍',
            mode:'identity',
            intro:[
                '主公必选曹操',
                '其余玩家从曹休、文聘、曹洪、张郃、夏侯渊、徐晃、许褚这些武将中随机选中一个',
                '游戏开始时将麒麟弓和爪黄飞电各置于每名角色的装备区内，大宛马洗入牌堆，移除其他的武器牌和坐骑牌'
            ],
            init:function(){
                game.saveConfig('player_number','8','identity');
                game.saveConfig('double_character',false,'identity');
            },
            showcase:function(init){
                var node=this;
                var list=['caoxiu','wenpin','caohong','zhanghe','xiahouyuan','xuhuang','re_xuzhu'];
                list.randomSort();
                list.push('re_caocao');
                var func=function(){
                    var card=ui.create.player();
                    card.init(list.shift());
                    card.node.marks.remove();
                    card.node.count.remove();
                    card.node.hp.remove();
                    node.nodes.push(card);
                    card.style.position='absolute';
                    var rand1=Math.round(Math.random()*100);
                    var rand2=Math.round(Math.random()*100);
                    var rand3=Math.round(Math.random()*40)-20;
                    card.style.left='calc('+rand1+'% - '+(rand1*1.5)+'px)';
                    card.style.top='calc('+rand2+'% - '+(rand2*1.8)+'px)';
                    card.style.transform='scale(0.8) rotate('+rand3+'deg)';
                    node.appendChild(card);
                };
                if(init){
                    node.nodes=[];
                }
                else{
                    while(node.nodes.length){
                        node.nodes.shift().remove();
                    }
                }
                for(var i=0;i<8;i++){
                    func();
                }
            },
            content:{
                cardPile:function(list){
                    for(var i=0;i<list.length;i++){
                        var subtype=get.subtype(list[i][2]);
                        if(subtype=='equip1'||subtype=='equip3'||subtype=='equip4'){
                            list.splice(i--,1);
                        }
                    }
                    for(var i=0;i<8;i++){
                        list.push([['heart','diamond','club','spade'].randomGet(),Math.ceil(Math.random()*13),'dawan']);
                    }
                    return list;
                },
                gameStart:function(){
                    for(var i=0;i<game.players.length;i++){
                        game.players[i].$equip(game.createCard('qilin'));
                        game.players[i].$equip(game.createCard('zhuahuang'));
                    }
                },
                submode:'normal',
                list:['caoxiu','wenpin','caohong','zhanghe','xiahouyuan','xuhuang','re_xuzhu'],
                chooseCharacterFixed:true,
                chooseCharacterAi:function(player){
                    if(player==game.zhu){
                        player.init('re_caocao');
                    }
                    else{
                        _status.brawl.list.remove(game.me.name);
                        player.init(_status.brawl.list.randomRemove());
                    }
                },
                chooseCharacter:function(){
                    if(game.me==game.zhu){
                        return ['re_caocao'];
                    }
                    else{
                        return _status.brawl.list.randomGets(1);
                    }
                }
            }
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
            intro:'玩家选择一个武将，所有角色均使用此武将',
            showcase:function(init){
                if(init){
                    this.nodes=[];
                }
                else{
                    while(this.nodes.length){
                        this.nodes.shift().remove();
                    }
                }
                var lx=this.offsetWidth/2-120;
                var ly=Math.min(lx,this.offsetHeight/2-60);
                var setPos=function(node){
                    var i=node.index;
                    var deg=Math.PI/4*i;
                    var dx=lx*Math.cos(deg);
                    var dy=ly*Math.sin(deg);
                    node.style.transform='translate('+dx+'px,'+dy+'px)';
                }
                for(var i=0;i<8;i++){
                    var node=ui.create.player();
                    this.nodes.push(node);
                    node.init('zuoci');
                    node.classList.add('minskin');
                    node.node.marks.remove();
                    node.node.hp.remove();
                    node.node.count.remove();
                    node.style.left='calc(50% - 60px)';
                    node.style.top='calc(50% - 60px)';
                    node.index=i;
                    setPos(node);
                    this.appendChild(node);
                }
                var nodes=this.nodes;
                this.showcaseinterval=setInterval(function(){
                    for(var i=0;i<nodes.length;i++){
                        nodes[i].index++;
                        if(nodes[i].index>7){
                            nodes[i].index=0;
                        }
                        setPos(nodes[i]);
                    }
                },1000);
            },
            content:{
                gameStart:function(){
                    var target=(_status.mode=='zhong')?game.zhong:game.zhu;
                    if(get.config('double_character')){
                        target.init(game.me.name,game.me.name2);
                    }
                    else{
                        target.init(game.me.name);
                    }
                    target.hp++;
                    target.maxHp++;
                    target.update();
                },
                chooseCharacterAi:function(player,list,list2,back){
                    if(player==game.zhu){
                        return;
                    }
                    else{
                        if(get.config('double_character')){
                            player.init(game.me.name,game.me.name2);
                        }
                        else{
                            player.init(game.me.name);
                        }
                    }
                },
                chooseCharacter:function(list,list2,num){
                    if(game.me!=game.zhu){
                        return list.slice(0,list2);
                    }
                    else{
                        if(_status.event.zhongmode){
    						return list.slice(0,6);
    					}
    					else{
    						return list.concat(list2.slice(0,num));
    					}
                    }
                }
            }
        },
        // baiyudujiang:{
        //     name:'白衣渡江',
        //     mode:'versus',
        //     submode:'2v2',
        //     intro:[
        //         '玩家在选将时可从6-8张的武将牌里选择两张武将牌，一张面向大家可见（加入游戏），另一张是隐藏面孔（暗置）',
        //         '选择的两张武将牌需满足以下至少两个条件：1.性别相同；2.体力上限相同；3.技能数量相同',
        //         '每名玩家在其回合开始或回合结束时，可以选择将自己的武将牌弃置，然后使用暗置的武将牌进行剩余的游戏'
        //     ]
        // }
    }
};
