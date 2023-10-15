"use strict";
module("lib.element", ["lib"], (lib, game, ui, get, ai, _status) => {
    const element = {
        content:{
            emptyEvent:function(){
                event.trigger(event.name);
            },
            //增加明置手牌
            addShownCards:()=>{
                var hs=player.getCards('h'),showingCards=event._cards.filter(showingCard=>hs.includes(showingCard)),shown=player.getShownCards();
                event.gaintag.forEach(tag=>player.addGaintag(showingCards,tag));
                if(!(event.cards=showingCards.filter(showingCard=>!shown.includes(showingCard))).length) return;
                game.log(player,'明置了',event.cards);
                if(event.animate!=false) player.$give(event.cards,player,false);
                event.trigger('addShownCardsAfter');
            },
            //隐藏明置手牌
            hideShownCards:()=>{
                var shown=player.getShownCards(),hidingCards=event._cards.filter(hidingCard=>shown.includes(hidingCard));
                if(!hidingCards.length) return;
                if(event.gaintag.length) event.gaintag.forEach(tag=>player.removeGaintag(tag,hidingCards));
                else {
                    var map=hidingCards.reduce((constructingMap,hidingCard)=>{
                        hidingCard.gaintag.forEach(tag=>{
                            if(!tag.startsWith('visible_')) return;
                            if(!constructingMap[tag]) constructingMap[tag]=[];
                            constructingMap[tag].push(hidingCard);
                        });
                        return constructingMap;
                    },{});
                    Object.keys(map).forEach(key=>player.removeGaintag(key,map[key]));
                }
                hidingCards.removeArray(player.getShownCards());
                if(!hidingCards.length) return;
                game.log(player,'取消明置了',event.cards=hidingCards);
                if(event.animate!=false) player.$give(hidingCards,player,false);
                event.trigger('hideShownCardsAfter');
            },
            //Execute the delay card effect
            //执行延时锦囊牌效果
            executeDelayCardEffect:()=>{
                'step 0'
                target.$phaseJudge(card);
                event.cancelled=false;
                event.trigger('executeDelayCardEffect');
                event.cardName=card.viewAs||card.name;
                target.popup(event.cardName,'thunder');
                if(!lib.card[event.cardName].effect){
                    game.delay();
                    event.finish();
                }
                else if(!lib.card[event.cardName].judge){
                    game.delay();
                    event.nojudge=true;
                }
                'step 1'
                if(event.cancelled||event.nojudge) return;
                var next=player.judge(card),judge=event.judge;
                if(typeof judge=='function') next.judge=judge;
                var judge2=event.judge2;
                if(typeof judge2=='function') next.judge2=judge2;
                'step 2'
                if(event.excluded) delete event.excluded;
                else{
                    var cardName=event.cardName;
                    if(event.cancelled&&!event.direct){
                        var cardCancel=lib.card[cardName].cancel;
                        if(cardCancel){
                            var next=game.createEvent(`${cardName}Cancel`);
                            next.setContent(cardCancel);
                            next.cards=[card];
                            if(!card.viewAs){
                                var autoViewAs=next.card=get.autoViewAs(card);
                                autoViewAs.expired=card.expired;
                            }
                            else{
                                var autoViewAs=next.card=get.autoViewAs({
                                    name:cardName
                                },next.cards);
                                autoViewAs.expired=card.expired;
                            }
                            next.player=player;
                        }
                    }
                    else{
                        var next=game.createEvent(cardName);
                        next.setContent(lib.card[cardName].effect);
                        next._result=result;
                        next.cards=[card];
                        if(!card.viewAs){
                            var autoViewAs=next.card=get.autoViewAs(card);
                            autoViewAs.expired=card.expired;
                        }
                        else{
                            var autoViewAs=next.card=get.autoViewAs({
                                name:cardName
                            },next.cards);
                            autoViewAs.expired=card.expired;
                        }
                        next.player=player;
                    }
                }
                ui.clear();
                card.delete();
            },
            //Gift
            //赠予
            gift:()=>{
                'step 0'
                event.num=0;
                'step 1'
                if(num<cards.length){
                    event.card=cards[num];
                    event.trigger('gift');
                }
                else{
                    game.delayx();
                    event.finish();
                }
                'step 2'
                if(event.deniedGifts.includes(card)){
                    game.log(target,'拒绝了',player,'赠予的',card);
                    event.trigger('giftDeny');
                    player.loseToDiscardpile(card).log=false;
                    event.trigger('giftDenied');
                    return;
                }
                game.log(player,'将',card,'赠予了',target);
                player.$give(card,target,false);
                game.delay(0.5);
                event.trigger('giftAccept');
                if(get.type(card,false)=='equip') target.equip(card).log=false;
                else target.gain(card,player).visible=true;
                event.trigger('giftAccepted');
                'step 3'
                event.num++;
                event.goto(1);
            },
            //Recast
            //重铸
            recast:()=>{
                'step 0'
                game.log(player,'重铸了',cards);
                if(typeof event.recastingLose!='function') return;
                event.trigger('recastingLose');
                event.recastingLose(player,cards);
                event.trigger('recastingLost');
                event.recastingLosingEvents.push(...event.next.filter(value=>value.name!='arrangeTrigger'));
                'step 1'
                event.trigger('recast');
                'step 2'
                if(typeof event.recastingGain!='function') return;
                event.trigger('recastingGain');
                event.recastingGain(player,cards);
                event.trigger('recastingGained');
                event.recastingGainingEvents.push(...event.next.filter(value=>value.name!='arrangeTrigger'));
            },
            //装备栏相关
            disableEquip:function(){
                'step 0'
                event.cards=[];
                event.num=0;
                event.slotsx=[];
                if(get.is.mountCombined()){
                    event.slots.forEach(type=>{
                        if(type=='equip3'||type=='equip4') event.slotsx.add('equip3_4');
                        else event.slotsx.add(type)
                    });
                }
                else{
                    event.slotsx.addArray(event.slots);
                }
                event.slotsx.sort();
                if(!event.slots.length) event.finish();
                'step 1'
                var slot=event.slotsx[event.num];
                var slot_key=slot;
                var left=player.countEnabledSlot(slot),lose;
                if(slot=='equip3_4'){
                    lose=Math.min(left,Math.max(get.numOf(event.slots,'equip3'),get.numOf(event.slots,'equip4')));
                    slot_key='equip3';
                }
                else lose=Math.min(left,get.numOf(event.slots,slot));
                if(lose<=0) event.goto(3);
                else{
                    game.log(player,'废除了'+get.cnNumber(lose)+'个','#g'+get.translation(slot)+'栏');
                    if(!player.disabledSlots) player.disabledSlots={};
                    if(!player.disabledSlots[slot_key]) player.disabledSlots[slot_key]=0;
                    player.disabledSlots[slot_key]+=lose;
                    var cards=player.getEquips(slot).filter(card=>!event.cards.contains(card));
                    if(cards.length>0){
                        if(lose>=left){
                            event._result={bool:true,links:cards};
                        }
                        else if(cards.length>(left-lose)){
                            var source=event.source,num=(cards.length-(left-lose));
                            if(!source||!source.isIn()) source=player;
                            source.chooseButton([
                                '选择'+(player==source?'你':get.translation(player))+'的'+get.cnNumber(num)+'张'+get.translation(slot)+'牌置入弃牌堆',
                                cards,
                            ],true,[1,num]).set('filterOk',function(){
                                var evt=_status.event;
                                return ui.selected.buttons.reduce(function(num,button){
                                    if(evt.slot=='equip3_4') return num+Math.max(get.numOf(get.subtypes(button.link,false),'equip3'),get.numOf(get.subtypes(button.link,false),'equip4'));
                                    return num+get.numOf(get.subtypes(button.link,false),evt.slot)
                                },0)==evt.required;
                            }).set('required',num).set('slot',slot)
                        }
                        else event.goto(3);
                    }
                    else event.goto(3)
                }
                'step 2'
                if(result.bool) event.cards.addArray(result.links);
                'step 3'
                event.num++;
                if(event.num<event.slotsx.length) event.goto(1);
                else{
                    player.$syncDisable();
                    if(cards.length>0) player.loseToDiscardpile(cards);
                }
            },
            enableEquip:function(){
                if(!event.slots.length) return;
                var slotsx=[...new Set(event.slots)].sort();
                for(var slot of slotsx){
                    var lost=player.countDisabledSlot(slot),gain=Math.min(lost,get.numOf(event.slots,slot));
                    if(lost<=0) continue;
                    else{
                        game.log(player,'恢复了'+get.cnNumber(gain)+'个','#g'+get.translation(slot)+'栏');
                        if(!player.disabledSlots) player.disabledSlots={};
                        if(!player.disabledSlots[slot]) player.disabledSlots[slot]=0;
                        player.disabledSlots[slot]-=gain;
                    }
                }
                player.$syncDisable();
            },
            expandEquip:function(){
                if(!event.slots.length) return;
                var slotsx=[];
                if(get.is.mountCombined()){
                    event.slots.forEach(type=>{
                        if(type=='equip3'||type=='equip4') slotsx.add('equip3_4');
                        else slotsx.add(type)
                    });
                }
                else{
                    slotsx.addArray(event.slots);
                }
                slotsx.sort();
                for(var slot of slotsx){
                    var expand=get.numOf(event.slots,slot),slot_key=slot;
                    if(slot=='equip3_4'){
                        expand=Math.max(get.numOf(event.slots,'equip3'),get.numOf(event.slots,'equip4'));
                        slot_key='equip3';
                    }
                    game.log(player,'获得了'+get.cnNumber(expand)+'个额外的','#g'+get.translation(slot)+'栏');
                    if(!player.expandedSlots) player.expandedSlots={};
                    if(!player.expandedSlots[slot_key]) player.expandedSlots[slot_key]=0;
                    player.expandedSlots[slot_key]+=expand;
                }
                player.$syncExpand();
            },
            //选择顶装备要顶的牌
            replaceEquip:function(){
                'step 0'
                event.cards=[];
                var types=get.subtypes(card,false);
                if(types.length){
                    var info=get.info(card,false);
                    if(info.customSwap){
                        event.cards.addArray(player.getCards('e',function(card){
                            return info.customSwap(card);
                        }));
                        event.goto(4);
                    }
                    else{
                        event.num=0;
                        event.slots=types;
                        event.slotsx=[];
                        if(get.is.mountCombined()){
                            event.slots.forEach(type=>{
                                if(type=='equip3'||type=='equip4') event.slotsx.add('equip3_4');
                                else event.slotsx.add(type)
                            });
                        }
                        else{
                            event.slotsx.addArray(event.slots);
                        }
                        event.slotsx.sort();
                    }
                }
                else event.goto(4);
                'step 1'
                var slot=event.slotsx[event.num];
                var left=player.countEquipableSlot(slot),lose;
                if(slot=='equip3_4') lose=Math.min(left,Math.max(get.numOf(event.slots,'equip3'),get.numOf(event.slots,'equip4')));
                else lose=Math.min(left,get.numOf(event.slots,slot));
                if(lose<=0) event.goto(3);
                else{
                    var cards=player.getEquips(slot).filter(card=>{
                        return !event.cards.contains(card)&&lib.filter.canBeReplaced(card,player);
                    });
                    if(cards.length>0){
                        if(lose>=left){
                            event._result={bool:true,links:cards};
                        }
                        else if(cards.length>(left-lose)){
                            var source=event.source,num=(cards.length-(left-lose));
                            if(!source||!source.isIn()) source=player;
                            source.chooseButton([
                                '选择替换掉'+get.cnNumber(num)+'张'+get.translation(slot)+'牌',
                                cards,
                            ],true,[1,num]).set('filterOk',function(){
                                var evt=_status.event;
                                return ui.selected.buttons.reduce(function(num,button){
                                    if(evt.slot=='equip3_4') return num+Math.max(get.numOf(get.subtypes(button.link,false),'equip3'),get.numOf(get.subtypes(button.link,false),'equip4'));
                                    return num+get.numOf(get.subtypes(button.link,false),evt.slot)
                                },0)==evt.required;
                            }).set('required',num).set('slot',slot)
                        }
                        else event.goto(3);
                    }
                    else event.goto(3)
                }
                'step 2'
                if(result.bool) event.cards.addArray(result.links);
                'step 3'
                event.num++;
                if(event.num<event.slotsx.length) event.goto(1);
                'step 4'
                event.result=cards;
            },
            //装备牌
            equip:function(){
                "step 0"
                var owner=get.owner(card)
                if(owner){
                    event.owner=owner;
                    owner.lose(card,ui.special,'visible').set('type','equip').set('getlx',false);
                }
                else if(get.position(card)=='c') event.updatePile=true;
                "step 1"
                if(event.cancelled){
                    event.finish();
                    return;
                }
                if(card.destroyed){
                    if(player.hasSkill(card.destroyed)){
                        delete card.destroyed;
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                else if(event.owner){
                    if(event.owner.getCards('hejsx').contains(card)){
                        event.finish();
                        return;
                    }
                }
                if(event.draw){
                    game.delay(0,300);
                    player.$draw(card);
                }
                "step 2"
                if(card.clone){
                    game.broadcast(function(card,player){
                        if(card.clone){
                            card.clone.moveDelete(player);
                        }
                    },card,player);
                    card.clone.moveDelete(player);
                    game.addVideo('gain2',player,get.cardsInfo([card.clone]));
                }
                player.equiping=true;
                "step 3"
                var info=get.info(card,false);
                var next=game.createEvent('replaceEquip');
                next.player=player;
                next.card=card;
                next.setContent(info.replaceEquip||'replaceEquip');
                "step 4"
                var info=get.info(card,false);
                if(get.itemtype(result)=='cards'){
                    player.lose(result,false,'visible').set('type','equip').set('getlx',false).swapEquip=true;
                    if(info.loseThrow){
                        player.$throw(result,1000);
                    }
                    event.swapped=true;
                }
                "step 5"
                //if(player.isMin() || player.countCards('e',{subtype:get.subtype(card)})){
                if(player.isMin()||!player.canEquip(card)){
                    event.finish();
                    game.cardsDiscard(card);
                    delete player.equiping;
                    return;
                }
                var subtype=get.subtype(card);
                if(subtype=='equip6') subtype='equip3';
                game.broadcastAll(function(type){
                    if(lib.config.background_audio){
                        game.playAudio('effect',type);
                    }
                },subtype);
                player.$equip(card);
                game.addVideo('equip',player,get.cardInfo(card));
                if(event.log!=false) game.log(player,'装备了',card);
                if(event.updatePile) game.updateRoundNumber();
                "step 6"
                var info=get.info(card,false);
                if(info.onEquip&&(!info.filterEquip||info.filterEquip(card,player))){
                    if(Array.isArray(info.onEquip)){
                        for(var i=0;i<info.onEquip.length;i++){
                            var next=game.createEvent('equip_'+card.name);
                            next.setContent(info.onEquip[i]);
                            next.player=player;
                            next.card=card;
                        }
                    }
                    else{
                        var next=game.createEvent('equip_'+card.name);
                        next.setContent(info.onEquip);
                        next.player=player;
                        next.card=card;
                    }
                    if(info.equipDelay!=false) game.delayx();
                }
                delete player.equiping;
                if(event.delay){
                    game.delayx();
                }
            },
            //装备栏 END
            changeGroup:function(){
                'step 0'
                event.originGroup=player.group;
                if(!event.group) event.group=player.group;
                var group=event.group;
                player.getHistory('custom').push(event);
                if(event.broadcast!==false){
                    game.broadcast(function(player,group){
                        player.group=group;
                        player.node.name.dataset.nature=get.groupnature(group);
                    },player,group);
                }
                player.group=group;
                player.node.name.dataset.nature=get.groupnature(group);
                if(event.log!==false) game.log(player,'将势力变为了','#y'+get.translation(group+2));
            },
            chooseToDebate:function(){
                'step 0'
                event.targets=event.list.filter(function(i){
                    return i.countCards('h')>0;
                });
                if(!event.targets.length) event.result={bool:false};
                else{
                    var next=player.chooseCardOL(event.targets,get.translation(player)+'发起了议事，请选择展示的手牌',true).set('type','debate').set('source',player).set('ai',event.ai||function(card){
                        return Math.random();
                    }).set('aiCard',event.aiCard||function(target){
                        var hs=target.getCards('h');
                        return {bool:true,cards:[hs.randomGet()]};
                    });
                    next._args.remove('glow_result');
                }
                'step 1'
                var red=[],black=[];
                event.videoId=lib.status.videoId++;
                for(var i=0;i<event.targets.length;i++){
                    var card=result[i].cards[0],target=event.targets[i];
                    if(get.color(card,target)=='red') red.push([target,card]);
                    else black.push([target,card]);
                }
                event.red=red; event.black=black;
                if(red.length){
                    game.log(red.map(function(i){
                        return i[0];
                    }),'意见为<span class="firetext">红色</span>，展示了',red.map(function(i){
                        return i[1];
                    }));
                }
                else game.log('#b无人','意见为<span class="firetext">红色</span>');
                if(black.length){
                    game.log(black.map(function(i){
                        return i[0];
                    }),'意见为','#g黑色','，展示了',black.map(function(i){
                        return i[1];
                    }));
                }
                else game.log('#b无人','意见为','#g黑色');
                game.broadcastAll(function(name,id,redArgs,blackArgs){
                    var dialog=ui.create.dialog(name+'发起了议事','hidden','forcebutton');
                    dialog.videoId=id;
                    dialog.classList.add('scroll1');
                    dialog.classList.add('scroll2');
                    dialog.classList.add('fullwidth');
                    dialog.classList.add('fullheight');
                    dialog.buttonss=[];
                    
                    var list=['意见为红色的角色','意见为黑色的角色']
                    for(var i=0;i<list.length;i++){
                        dialog.add('<div class="text center">'+list[i]+'</div>');
                        var buttons=ui.create.div('.buttons',dialog.content);
                        dialog.buttonss.push(buttons);
                        buttons.classList.add('popup');
                        buttons.classList.add('guanxing');
                    }
                    var func=function(target){
                        if(target._tempTranslate) return target._tempTranslate;
                        var name=target.name;
                        if(lib.translate[name+'_ab']) return lib.translate[name+'_ab'];
                        return get.translation(name);
                    };
                    for(var i=0;i<redArgs.length;i++){
                        var list=redArgs[i];
                        var button=ui.create.button(list[1],'card',dialog.buttonss[0]);
                        button.querySelector('.info').innerHTML=func(list[0]);
                    }
                    for(var i=0;i<blackArgs.length;i++){
                        var list=blackArgs[i];
                        var button=ui.create.button(list[1],'card',dialog.buttonss[1]);
                        button.querySelector('.info').innerHTML=func(list[0]);
                    }
                    dialog.open();
                },get.translation(player),event.videoId,red,black);
                game.delay(4);
                'step 2'
                game.broadcastAll('closeDialog',event.videoId);
                var opinion=null;
                if(event.red.length>event.black.length) opinion='red';
                else if(event.red.length<event.black.length) opinion='black';
                if(opinion) game.log(player,'本次发起的议事结果为',opinion=='red'?'<span class="firetext">红色</span>':'#g黑色');
                else game.log(player,'本次发起的议事无结果');
                event.result={
                    bool:true,
                    opinion:opinion,
                    red:event.red,
                    black:event.black,
                    targets:event.targets
                }
                'step 3'
                if(event.callback){
                    var next=game.createEvent('debateCallback',false);
                    next.player=player;
                    next.debateResult=get.copy(event.result);
                    next.setContent(event.callback);
                }
            },
            delay:function(){
                game[event.name].apply(game,event._args)
            },
            chooseCooperationFor:function(){
                'step 0'
                var next=player.chooseButton([
                    '选择和'+get.translation(target)+'的协力方式',
                    [event.cardlist,'vcard'],
                ],true);
                next.set('ai',event.ai||function(){
                    return Math.random();
                });
                'step 1'
                if(result.bool){
                    player.cooperationWith(target,result.links[0][2].slice(12),event.reason);
                }
            },
            chooseToPlayBeatmap:function(){
                'step 0'
                if(game.online) return;
                if(_status.connectMode)	event.time=lib.configOL.choose_timeout;
                event.videoId=lib.status.videoId++;
                //给其他角色看的演奏框
                game.broadcastAll(function(player,id,beatmap){
                    if(_status.connectMode) lib.configOL.choose_timeout=(Math.ceil((beatmap.timeleap[beatmap.timeleap.length-1]+beatmap.speed*100+(beatmap.current||0))/1000)+5).toString();
                    if(player==game.me) return;
                    var str=get.translation(player)+'正在演奏《'+beatmap.name+'》...';
                    if(!_status.connectMode) str+='<br>（点击屏幕可以跳过等待AI操作）';
                    ui.create.dialog(str).videoId=id;
                    if(ui.backgroundMusic) ui.backgroundMusic.pause();
                    if(lib.config.background_audio){
                        if(beatmap.filename.startsWith('ext:')) game.playAudio(beatmap.filename);
                        else game.playAudio('effect',beatmap.filename);
                    }
                },player,event.videoId,event.beatmap);
                'step 1'
                var beatmap=event.beatmap;
                if(event.isMine()){
                    var timeleap=beatmap.timeleap.slice(0);
                    var current=beatmap.current;
                    //获取两个音符的时间间隔
                    var getTimeout=function(){
                        var time=timeleap.shift();
                        var out=time-current;
                        current=time;
                        return out;
                    };
                    //初始化一堆变量
                    var score=0;
                    var added=timeleap.length;
                    var number_of_tracks=beatmap.number_of_tracks||6;
                    var custom_mapping=Array.isArray(beatmap.mapping);
                    var mapping=custom_mapping?beatmap.mapping.slice():beatmap.mapping;
                    var hitsound=beatmap.hitsound||'hitsound.wav';
                    if(hitsound.startsWith('ext:')) hitsound=lib.assetURL+'extension/'+hitsound.slice(4);
                    else hitsound=lib.assetURL+'audio/effect/'+hitsound;
                    var hitsound_audio=new Audio(hitsound);
                    hitsound_audio.volume=0.25;
                    var abs=1;
                    var node_pos=0;
                    if(custom_mapping){
                        node_pos=mapping.shift();
                    }
                    else if(mapping=='random'){
                        abs=get.rand(number_of_tracks);
                        node_pos=abs;
                    }
                    var combo=0;
                    var max_combo=0;
                    var nodes=[];
                    var roundmenu=false;
                    //隐藏菜单按钮
                    if(ui.roundmenu&&ui.roundmenu.display!='none'){
                        roundmenu=true;
                        ui.roundmenu.style.display='none';
                    }
                    if(ui.backgroundMusic) ui.backgroundMusic.pause();
                    var event=_status.event;
                    event.settleed=false;
                    //建个框框
                    var dialog=ui.create.dialog('forcebutton','hidden');
                    event.dialog=dialog;
                    event.dialog.textPrompt=event.dialog.add('<div class="text center">'+(beatmap.prompt||'在音符滑条和底部判定区重合时点击屏幕！')+'</div>');
                    event.switchToAuto=function(){};
                    event.dialog.classList.add('fixed');
                    event.dialog.classList.add('scroll1');
                    event.dialog.classList.add('scroll2');
                    event.dialog.classList.add('fullwidth');
                    event.dialog.classList.add('fullheight');
                    event.dialog.classList.add('noupdate');
                    event.dialog.style.overflow='hidden';
                    //结束后操作
                    event.settle=function(){
                        if(event.settleed) return;
                        event.settleed=true;
                        //评分
                        var acc=Math.floor(score/(added*5)*100);
                        if(!Array.isArray(lib.config.choose_to_play_beatmap_accuracies)) lib.config.choose_to_play_beatmap_accuracies=[];
                        lib.config.choose_to_play_beatmap_accuracies.push(acc);
                        if(lib.config.choose_to_play_beatmap_accuracies.length>5) lib.config.choose_to_play_beatmap_accuracies.shift();
                        game.saveConfigValue("choose_to_play_beatmap_accuracies");
                        var rank;
                        if(acc==100) rank=['SS','metal'];
                        else if(acc>=94) rank=['S','orange'];
                        else if(acc>=87) rank=['A','wood'];
                        else if(acc>=80) rank=['B','water'];
                        else if(acc>=65) rank=['C','thunder'];
                        else rank=['D','fire'];
                        event.dialog.textPrompt.innerHTML='<div class="text center">演奏结束！<br>最大连击数：'+max_combo+'  精准度：'+acc+'%</div>';
                        game.me.$fullscreenpop('<span style="font-family:xinwei">演奏评级：<span data-nature="'+rank[1]+'">'+rank[0]+'</span></span>',null,null,false);
                        //返回结果并继续游戏
                        setTimeout(function(){
                            event._result={
                                bool:true,
                                accuracy:acc,
                                rank:rank,
                            };
                            event.dialog.close();
                            game.resume();
                            _status.imchoosing=false;
                            if(roundmenu) ui.roundmenu.style.display='';
                            if(ui.backgroundMusic) ui.backgroundMusic.play();
                            hitsound_audio.remove();
                        },1000);
                    };
                    event.dialog.open();
                    //操作容差
                    var height=event.dialog.offsetHeight;
                    var width=event.dialog.offsetWidth;
                    var range1=(beatmap.range1||[90,110]);
                    var range2=(beatmap.range2||[93,107]);
                    var range3=(beatmap.range3||[96,104]);
                    var speed=(beatmap.speed||25);
                    //初始化底部的条子
                    var judger=ui.create.div('');
                    judger.style["background-image"]=(beatmap.judgebar_color||'linear-gradient(rgba(240, 235, 3, 1), rgba(230, 225, 5, 1))');
                    judger.style["border-radius"]='3px';
                    judger.style.position='absolute';
                    judger.style.opacity='0.3';
                    var heightj=Math.ceil(height*(beatmap.judgebar_height||0.1));
                    judger.style.height=heightj+'px';
                    judger.style.width=width+'px';
                    judger.style.left='0px';
                    judger.style.top=(height-heightj)+'px';
                    event.dialog.appendChild(judger);
                    //生成每个音符
                    var addNode=function(){
                        var node=ui.create.div('');
                        nodes.push(node);
                        node.style["background-image"]=(beatmap.node_color||'linear-gradient(rgba(120, 120, 240, 1), rgba(100, 100, 230, 1))');
                        node.style["border-radius"]='3px';
                        node.style.position='absolute';
                        node.style.height=Math.ceil(height/10)+'px';
                        node.style.width=Math.ceil(width/number_of_tracks)-10+'px';
                        node._position=get.utc();
                        event.dialog.appendChild(node);
                        
                        node.style.left=Math.ceil(width*node_pos/number_of_tracks+5)+'px';
                        node.style.top='-'+(Math.ceil(height/10))+'px';
                        ui.refresh(node);
                        node.style.transition='all '+speed*110+'ms linear';
                        node.style.transform='translateY('+Math.ceil(height*1.1)+'px)';
                        node.timeout=setTimeout(function(){
                            if(nodes.contains(node)){
                                nodes.remove(node);
                                player.popup('Miss','fire',false);
                                if(player.damagepopups.length) player.$damagepop();
                                combo=0;
                            }
                        },speed*110);
                        
                        if(custom_mapping){
                            node_pos=mapping.shift();
                        }
                        else if(mapping=='random'){
                            while(node_pos==abs){
                                node_pos=get.rand(number_of_tracks);
                            }
                            abs=node_pos;
                        }
                        else{
                            node_pos+=abs;
                            if(node_pos>number_of_tracks-1){
                                abs=-1;
                                node_pos=number_of_tracks-2;
                            }
                            else if(node_pos<0){
                                abs=1;
                                node_pos=1;
                            }
                        }
                        if(timeleap.length){
                            setTimeout(function(){
                                addNode();
                            },getTimeout());
                        }
                        else{
                            setTimeout(function(){
                                event.settle();
                            },speed*110+100)
                        }
                    }
                    //点击时的判断操作
                    var click=function(){
                        if(!nodes.length) return;
                        for(var node of nodes){
                            //用生成到点击的时间差来判断距离
                            var time=get.utc();
                            var top=(time-node._position)/speed;
                            if(top>range1[1]) continue;
                            else if(top<range1[0]) return;
                            nodes.remove(node);
                            clearTimeout(node.timeout);
                            node.style.transform='';
                            node.style.transition='all 0s';
                            node.style.top=(height*((top-10)/100))+'px';
                            ui.refresh(node);
                            node.style.transition='all 0.5s';
                            node.style.transform='scale(1.2)';
                            node.delete();
                            if(top>=range3[0]&&top<range3[1]){
                                score+=5;
                                player.popup('Perfect','orange',false);
                            }
                            else if(top>=range2[0]&&top<range2[1]){
                                score+=3;
                                player.popup('Great','wood',false);
                            }
                            else{
                                score+=1;
                                player.popup('Good','soil',false);
                            }
                            if(player.damagepopups.length) player.$damagepop();
                            combo++;
                            max_combo=Math.max(combo,max_combo);
                            hitsound_audio.currentTime=0;
                            if(hitsound_audio.paused) Promise.resolve(hitsound_audio.play()).catch(()=>void 0);
                            break;
                        }
                    };
                    document.addEventListener(lib.config.touchscreen?'touchstart':'mousedown',click);
                    
                    game.pause();
                    game.countChoose();
                    setTimeout(()=>{
                        if(!lib.config.background_audio) return;
                        if(beatmap.filename.startsWith('ext:')) game.playAudio(beatmap.filename);
                        else game.playAudio('effect',beatmap.filename);
                    },Math.floor(speed*100*(0.9+beatmap.judgebar_height))+beatmap.current);
                    setTimeout(function(){
                        addNode();
                    },getTimeout());
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    game.pause();
                    game.countChoose();
                    var settle=function(){
                        _status.imchoosing=false;
                        //Algorithm: Generate the random number range using the mean and the half standard deviation of accuracies of the player's last 5 plays
                        //算法：用玩家的上5次游玩的准确率的平均数和半标准差生成随机数范围
                        var choose_to_play_beatmap_accuracies=(lib.config.choose_to_play_beatmap_accuracies||[]).concat(Array.from({
                            length:6-(lib.config.choose_to_play_beatmap_accuracies||[]).length
                        },()=>get.rand(70,100)));
                        var mean=Math.round(choose_to_play_beatmap_accuracies.reduce((previousValue,currentValue)=>previousValue+currentValue)/choose_to_play_beatmap_accuracies.length);
                        var half_standard_deviation=Math.round(Math.sqrt(choose_to_play_beatmap_accuracies.reduce((previousValue,currentValue)=>previousValue+Math.pow(currentValue-mean,2),0))/2);
                        var acc=Math.min(Math.max(get.rand.apply(get,beatmap.aiAcc||[mean-half_standard_deviation-get.rand(0,half_standard_deviation),mean+half_standard_deviation+get.rand(0,half_standard_deviation)]),0),100);
                        var rank;
                        if(acc==100) rank=['SS','metal'];
                        else if(acc>=94) rank=['S','orange'];
                        else if(acc>=87) rank=['A','green'];
                        else if(acc>=80) rank=['B','water'];
                        else if(acc>=65) rank=['C','thunder'];
                        else rank=['D','fire'];
                        event._result={
                            bool:true,
                            accuracy:acc,
                            rank:rank,
                        };
                        if(event.dialog) event.dialog.close();
                        if(event.control) event.control.close();
                        game.resume();
                    };
                    var song_duration=beatmap.timeleap[beatmap.timeleap.length-1]+beatmap.speed*100+1000+(beatmap.current||0);
                    var settle_timeout=setTimeout(settle,song_duration);
                    if(!_status.connectMode) {
                        var skip_timeout;
                        var skip=()=>{
                            settle();
                            Array.from(ui.window.getElementsByTagName('audio')).forEach(audio=>{
                                if(audio.currentSrc.includes(beatmap.filename.startsWith('ext:')?beatmap.name:beatmap.filename)) audio.remove();
                            });
                            document.removeEventListener(lib.config.touchscreen?'touchend':'click',skip);
                            clearTimeout(settle_timeout);
                            clearTimeout(skip_timeout);
                        };
                        document.addEventListener(lib.config.touchscreen?'touchend':'click',skip);
                        skip_timeout=setTimeout(()=>document.removeEventListener(lib.config.touchscreen?'touchend':'click',skip),song_duration);
                    }
                }
                'step 2'
                game.broadcastAll(function(id,time){
                    if(_status.connectMode) lib.configOL.choose_timeout=time;
                    var dialog=get.idDialog(id);
                    if(dialog){
                        dialog.close();
                    }
                    if(ui.backgroundMusic) ui.backgroundMusic.play();
                },event.videoId,event.time);
                var result=event.result||result;
                event.result=result;
            },
            chooseToMove:function(){
                'step 0'
                if(event.chooseTime&&_status.connectMode&&!game.online){
                    event.time=lib.configOL.choose_timeout;
                    game.broadcastAll(function(time){
                        lib.configOL.choose_timeout=time;
                    },event.chooseTime);
                }
                if(event.isMine()){
                    delete ui.selected.guanxing_button;
                    var list=event.list,filterMove=event.filterMove,filterOk=event.filterOk;
                    _status.imchoosing=true;
                    var event=_status.event;
                    event.settleed=false;
                    event.dialog=ui.create.dialog(event.prompt||'请选择要操作的牌','hidden','forcebutton');
                    event.switchToAuto=function(){
                        if(!filterOk(event.moved)){
                            if(!event.forced) event._result={bool:false};
                            else event._result='ai';
                        }
                        else{
                            event._result={
                                bool:true,
                                moved:event.moved,
                            };
                        }
                        event.dialog.close();
                        if(ui.confirm) ui.confirm.close();
                        game.resume();
                        _status.imchoosing=false;
                        setTimeout(function(){
                            ui.arena.classList.remove('choose-to-move');
                        },500);
                    };
                    event.dialog.classList.add('scroll1');
                    event.dialog.classList.add('scroll2');
                    event.dialog.classList.add('fullwidth');
                    if(list.length>1){
                        ui.arena.classList.add('choose-to-move');
                        event.dialog.classList.add('fullheight');
                    }
                    
                    event.moved=[];
                    var buttonss=[];
                    event.buttonss=buttonss;
                    var updateButtons=function(){
                        for(var i of buttonss){
                            event.moved[i._link]=get.links(Array.from(i.childNodes));
                            if(i.textPrompt) i.previousSibling.innerHTML=('<div class="text center">'+i.textPrompt(event.moved[i._link])+'</div>');
                        }
                        if(filterOk(event.moved)){
                            ui.create.confirm('o');
                        }
                        else{
                            if(!event.forced) ui.create.confirm('c');
                            else if(ui.confirm) ui.confirm.close();
                        }
                    };
                    var clickButtons=function(){
                        if(!ui.selected.guanxing_button) return;
                        if(ui.selected.guanxing_button.parentNode==this) return;
                        if(!filterMove(ui.selected.guanxing_button,this._link,event.moved)) return;
                        ui.selected.guanxing_button.classList.remove('glow2');
                        this.appendChild(ui.selected.guanxing_button);
                        delete ui.selected.guanxing_button;
                        updateButtons();
                    };
                    
                    for(var i=0;i<list.length;i++){
                        var tex=event.dialog.add('<div class="text center">'+list[i][0]+'</div>');
                        tex.classList.add('choosetomove');
                        var buttons=ui.create.div('.buttons',event.dialog.content,clickButtons);
                        buttonss.push(buttons);
                        buttons.classList.add('popup');
                        buttons.classList.add('guanxing');
                        buttons._link=i;
                        if(list[i][1]){
                            if(get.itemtype(list[i][1])=='cards'){
                                var cardsb=ui.create.buttons(list[i][1],'card',buttons);
                                if(list[i][2]&&typeof list[i][2]=='string'){
                                    for(var ij of cardsb) ij.node.gaintag.innerHTML=get.translation(list[i][2]);
                                }
                            }
                            else if(list[i][1].length==2){
                                ui.create.buttons(list[i][1][0],list[i][1][1],buttons);
                            }
                        }
                        if(list[i][2]&&typeof list[i][2]=='function') buttons.textPrompt=list[i][2];
                    }
                    var tex=event.dialog.add('<div class="text center">点击两张牌以交换位置；点击一张牌并点击其他区域以移动卡牌</div>');
                    tex.classList.add('choosetomove');
                        
                    event.dialog.open();
                    updateButtons();
                    
                    event.custom.replace.button=function(button){
                        var node=button.parentNode;
                        if(!buttonss.contains(node)) return;
                        if(!ui.selected.guanxing_button){
                            ui.selected.guanxing_button=button;
                            button.classList.add('glow2');
                            return;
                        }
                        if(ui.selected.guanxing_button==button){
                            button.classList.remove('glow2');
                            delete ui.selected.guanxing_button;
                            return;
                        }
                        if(!filterMove(button,ui.selected.guanxing_button,event.moved)) return;
                        var par1=ui.selected.guanxing_button.parentNode,ind1=ui.selected.guanxing_button.nextSibling,par2=button.parentNode,ind2=button.nextSibling;
                        ui.selected.guanxing_button.classList.remove('glow2');
                        par1.insertBefore(button,ind1);
                        par2.insertBefore(ui.selected.guanxing_button,ind2);
                        delete ui.selected.guanxing_button;
                        updateButtons();
                    }
                    event.custom.replace.confirm=function(bool){
                        if(bool) event._result={
                            bool:true,
                            moved:event.moved,
                        };
                        else event._result={bool:false};
                        event.dialog.close();
                        if(ui.confirm) ui.confirm.close();
                        game.resume();
                        _status.imchoosing=false;
                        setTimeout(function(){
                            ui.arena.classList.remove('choose-to-move');
                        },500);
                    };
                    
                    game.pause();
                    game.countChoose();
                    event.choosing=true;
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.time) game.broadcastAll(function(time){
                    lib.configOL.choose_timeout=time;
                },event.time);
                var result=event.result||result;
                if((!result||result=='ai'||(event.forced&&!result.bool))&&event.processAI){
                    var moved=event.processAI(event.list);
                    if(moved) result={
                        bool:true,
                        moved:moved,
                    }
                    else result={bool:false};
                }
                event.result=result;
            },
            showCharacter:function(){
                'step 0'
                event.trigger('showCharacterEnd');
                'step 1'
                event.trigger('showCharacterAfter');
                if(get.mode()=='identity'&&player.isZhu) event.trigger('zhuUpdate');
            },
            removeCharacter:function(){
                player.$removeCharacter(event.num);
            },
            chooseUseTarget:function(){
                'step 0'
                if(get.is.object(card)&&!event.viewAs) card.isCard=true;
                if(cards&&get.itemtype(card)!='card'){
                    card=get.copy(card);
                    card.cards=cards.slice(0);
                    event.card=card;
                }
                if(!lib.filter.cardEnabled(card,player)||(event.addCount!==false&&!lib.filter.cardUsable(card,player))){
                    event.result={bool:false};
                    event.finish();
                    return;
                }
                var info=get.info(card);
                var range;
                if(!info.notarget){
                    var select=get.copy(info.selectTarget);
                    range=get.select(select);
                    if(event.selectTarget) range=get.select(event.selectTarget);
                    game.checkMod(card,player,range,'selectTarget',player);
                }
                if(info.notarget||range[1]<=-1){
                    if(!info.notarget&&range[1]<=-1){
                        for(var i=0;i<targets.length;i++){
                            if(event.filterTarget){
                                if(!event.filterTarget(card,player,targets[i])){
                                    targets.splice(i--,1);
                                }
                            }
                            else if(!player.canUse(card,targets[i],event.nodistance?false:null,event.addCount===false?null:true)){
                                targets.splice(i--,1);
                            }
                        }
                        if(targets.length){
                            event.targets2=targets;
                        }
                        else{
                            event.finish();
                            return;
                        }
                    }
                    else event.targets2=[];
                    if(event.forced){
                        event._result={bool:true};
                        return;
                    }
                    else{
                        var next=player.chooseBool();
                        next.set('prompt',event.prompt||('是否'+(event.targets2.length?'对':'')+get.translation(event.targets2)+'使用'+get.translation(card)+'?'));
                        if(event.hsskill) next.setHiddenSkill(event.hsskill);
                        if(event.prompt2) next.set('prompt2',event.prompt2);
                        next.ai=function(){
                            var eff=0;
                            for(var i=0;i<event.targets2.length;i++){
                                eff+=get.effect(event.targets2[i],card,player,player);
                            }
                            return eff>0;
                        };
                    }
                }
                else{
                    if(event.filterTarget){
                        var targets=game.filterPlayer(function(current){
                            return event.filterTarget(card,player,current);
                        });
                        if(targets.length<range[0]){
                            event._result={bool:false};
                            return;
                        }
                        else if(!info.complexTarget&&targets.length==range[0]&&range[0]==range[1]){
                            event.targets2=targets;
                            event._result={bool:true};
                            return;
                        }
                    }
                    var next=player.chooseTarget();
                    next.set('_get_card',card);
                    next.set('filterTarget',event.filterTarget||function(card,player,target){
                        if(!_status.event.targets.contains(target)) return false;
                        if(!_status.event.nodistance&&!lib.filter.targetInRange(card,player,target)) return false;
                        return lib.filter.targetEnabledx(card,player,target);
                    });
                    next.set('ai',event.ai||get.effect_use);
                    next.set('selectTarget',event.selectTarget||lib.filter.selectTarget);
                    if(event.nodistance) next.set('nodistance',true);
                    if(event.forced) next.set('forced',true);
                    if(event.addCount!==false) next.set('addCount_extra',true);
                    next.set('targets',targets);
                    next.set('prompt',event.prompt||('选择'+get.translation(card)+'的目标'));
                    if(event.prompt2) next.set('prompt2',event.prompt2);
                    if(event.hsskill) next.setHiddenSkill(event.hsskill);
                }
                'step 1'
                if(result.bool){
                    event.result={
                        bool:true,
                        targets:event.targets2||result.targets,
                    };
                    var next=player.useCard(card,event.targets2||result.targets);
                    next.oncard=event.oncard;
                    if(cards) next.cards=cards.slice(0);
                    if(event.nopopup) next.nopopup=true;
                    if(event.animate===false) next.animate=false;
                    if(event.throw===false) next.throw=false;
                    if(event.addCount===false) next.addCount=false;
                    if(event.noTargetDelay) next.targetDelay=false;
                    if(event.nodelayx) next.delayx=false;
                    if(event.logSkill){
                        if(typeof event.logSkill=='string'){
                            next.skill=event.logSkill;
                        }
                        else if(Array.isArray(event.logSkill)){
                            player.logSkill.apply(player,event.logSkill);
                        }
                    }
                }
                else event.result={bool:false};
            },
            chooseToDuiben:function(){
                'step 0'
                if(!event.namelist) event.namelist=['全军出击','分兵围城','奇袭粮道','开城诱敌'];
                game.broadcastAll(function(list){
                    var list2=['db_atk1','db_atk2','db_def1','db_def2'];
                    for(var i=0;i<4;i++){
                        lib.card[list2[i]].image='card/'+list2[i]+(list[0]=='全军出击'?'':'_'+list[i]);
                        lib.translate[list2[i]]=list[i];
                    }
                },event.namelist);
                if(!event.title) event.title='对策';
                game.log(player,'向',target,'发起了','#y'+event.title);
                if(!event.ai) event.ai=function(){return 1+Math.random()};
                if(_status.connectMode){
                    player.chooseButtonOL([
                        [player,[event.title+'：请选择一种策略',[[['','','db_def2'],['','','db_def1']],'vcard']],true],
                        [target,[event.title+'：请选择一种策略',[[['','','db_atk1'],['','','db_atk2']],'vcard']],true]
                    ],function(){},event.ai).set('switchToAuto',function(){
                        _status.event.result='ai';
                    }).set('processAI',function(){
                        var buttons=_status.event.dialog.buttons;
                        return {
                            bool:true,
                            links:[buttons.randomGet().link],
                        }
                    });
                }
                'step 1'
                if(_status.connectMode){
                    event.mes=result[player.playerid].links[0][2];
                    event.tes=result[target.playerid].links[0][2];
                    event.goto(4);
                }
                else{
                    player.chooseButton([event.title+'：请选择一种策略',[[['','','db_def2'],['','','db_def1']],'vcard']],true).ai=event.ai;
                }
                'step 2'
                event.mes=result.links[0][2];
                target.chooseButton([event.title+'：请选择一种策略',[[['','','db_atk1'],['','','db_atk2']],'vcard']],true).ai=event.ai;
                'step 3'
                event.tes=result.links[0][2];
                'step 4'
                game.broadcast(function(){
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                target.$compare(game.createCard(event.tes,'',''),player,game.createCard(event.mes,'',''));
                game.log(target,'选择的策略为','#g'+get.translation(event.tes));
                game.log(player,'选择的策略为','#g'+get.translation(event.mes));
                game.delay(0,1500);
                'step 5'
                var mes=event.mes.slice(6);
                var tes=event.tes.slice(6);
                var str;
                if(mes==tes){
                    str=get.translation(player)+event.title+'成功';
                    player.popup('胜','wood');
                    target.popup('负','fire');
                    game.log(player,'#g胜');
                    event.result={bool:true};
                }
                else{
                    str=get.translation(player)+event.title+'失败';
                    target.popup('胜','wood');
                    player.popup('负','fire');
                    game.log(target,'#g胜');
                    event.result={bool:false};
                }
                event.result.player=event.mes;
                event.result.target=event.tes;
                game.broadcastAll(function(str){
                    var dialog=ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function(){
                        dialog.close();
                    },1000);
                },str);
                game.trySkillAudio(event.getParent().name+'_'+(event.result.bool?'true'+mes:'false'),player);
                game.delay(2);
                'step 6'
                game.broadcastAll(function(){
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if(event.clear!==false){
                    game.broadcastAll(ui.clear);
                }
            },
            chooseToPSS:function(){
                'step 0'
                game.log(player,'对',target,'发起了猜拳');
                if(_status.connectMode){
                    player.chooseButtonOL([
                        [player,['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true],
                        [target,['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true]
                    ],function(){},function(){return 1+Math.random()}).set('switchToAuto',function(){
                        _status.event.result='ai';
                    }).set('processAI',function(){
                        var buttons=_status.event.dialog.buttons;
                        return {
                            bool:true,
                            links:[buttons.randomGet().link],
                        }
                    });
                }
                'step 1'
                if(_status.connectMode){
                    event.mes=result[player.playerid].links[0][2];
                    event.tes=result[target.playerid].links[0][2];
                    event.goto(4);
                }
                else{
                    player.chooseButton(['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true).ai=function(){return 1+Math.random()};
                }
                'step 2'
                event.mes=result.links[0][2];
                target.chooseButton(['猜拳：请选择一种手势',[[['','','pss_stone'],['','','pss_scissor'],['','','pss_paper']],'vcard']],true).ai=function(){return 1+Math.random()};
                'step 3'
                event.tes=result.links[0][2];
                'step 4'
                game.broadcast(function(){
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                player.$compare(game.createCard(event.mes,'',''),target,game.createCard(event.tes,'',''));
                game.log(player,'选择的手势为','#g'+get.translation(event.mes));
                game.log(target,'选择的手势为','#g'+get.translation(event.tes));
                game.delay(0,1500);
                'step 5'
                var mes=event.mes.slice(4);
                var tes=event.tes.slice(4);
                var str;
                if(mes==tes){
                    str='二人平局';
                    player.popup('平','metal');
                    target.popup('平','metal');
                    game.log('猜拳的结果为','#g平局');
                    event.result={tie:true};
                }
                else{
                    if({paper:'stone',scissor:'paper',stone:'scissor'}[mes]==tes){
                        str=get.translation(player)+'胜利';
                        player.popup('胜','wood');
                        target.popup('负','fire');
                        game.log(player,'#g胜');
                        event.result={bool:true};
                    }
                    else{
                        str=get.translation(target)+'胜利';
                        target.popup('胜','wood');
                        player.popup('负','fire');
                        game.log(target,'#g胜');
                        event.result={bool:false};
                    }
                }
                game.broadcastAll(function(str){
                    var dialog=ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function(){
                        dialog.close();
                    },1000);
                },str);
                game.delay(2);
                'step 6'
                game.broadcastAll(function(){
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if(event.clear!==false){
                    game.broadcastAll(ui.clear);
                }
            },
            cardsDiscard:function(){
                game.getGlobalHistory().cardMove.push(event);
                var withPile=false;
                for(var i=0;i<cards.length;i++){
                    if(get.position(cards[i],true)=='c') withPile=true;
                    cards[i].discard();
                }
                if(withPile) game.updateRoundNumber();
            },
            orderingDiscard:function(){
                var cards=event.relatedEvent.orderingCards.slice(0);
                for(var i=0;i<cards.length;i++){
                    if(get.position(cards[i],true)!='o') cards.splice(i--,1);
                }
                if(cards.length) game.cardsDiscard(cards);
            },
            cardsGotoOrdering:function(){
                game.getGlobalHistory().cardMove.push(event);
                var withPile=false;
                for(var i=0;i<cards.length;i++){
                    if(get.position(cards[i],true)=='c') withPile=true;
                    cards[i].fix();
                    ui.ordering.appendChild(cards[i]);
                }
                if(withPile) game.updateRoundNumber();
                var evt=event.relatedEvent||event.getParent();
                if(!evt.orderingCards) evt.orderingCards=[];
                if(!evt.noOrdering&&!evt.cardsOrdered){
                    evt.cardsOrdered=true;
                    var next=game.createEvent('orderingDiscard',false,evt.getParent());
                    next.relatedEvent=evt;
                    next.setContent('orderingDiscard');
                }
                if(!evt.noOrdering) evt.orderingCards.addArray(cards);
            },
            cardsGotoSpecial:function(){
                game.getGlobalHistory().cardMove.push(event);
                var withPile=false;
                for(var i=0;i<cards.length;i++){
                    if(get.position(cards[i],true)=='c') withPile=true;
                    cards[i].fix();
                    ui.special.appendChild(cards[i]);
                }
                if(withPile) game.updateRoundNumber();
                if(event.toRenku){
                    _status.renku.addArray(cards);
                    if(_status.renku.length>6){
                        var cards=_status.renku.splice(0,_status.renku.length-6);
                        game.log(cards,'从仁库进入了弃牌堆');
                        game.cardsDiscard(cards).set('outRange',true).fromRenku=true;
                    }
                    game.updateRenku();
                }
            },
            cardsGotoPile:function(){
                if(event.washCard){
                    event.trigger('washCard')
                    for(var i=0;i<lib.onwash.length;i++){
                        if(lib.onwash[i]()=='remove'){
                            lib.onwash.splice(i--,1);
                        }
                    }
                }
                game.getGlobalHistory().cardMove.push(event);
                if(!event._triggeronly) game.$cardsGotoPile(event);
            },
            chooseToEnable:function(){
                'step 0'
                var list=[];
                for(var i=1;i<=5;i++){
                    if(player.hasDisabledSlot(i))  list.push('equip'+i);
                }
                if(!list.length) event.finish();
                else if(list.length==1){
                    event.list=list;
                    event._result={control:list[0]};
                }
                else{
                    var next=player.chooseControl(list);
                    next.set('prompt','请选择恢复一个装备栏');
                    if(!event.ai) event.ai=function(event,player,list){
                        return list.randomGet();
                    }
                    event.ai=event.ai(event.getParent(),player,list);
                    next.ai=function(){
                        return event.ai;
                    };
                }
                'step 1'
                event.result={control:result.control};
                player.enableEquip(result.control);
            },
            chooseToDisable:function(){
                'step 0'
                var list=[];
                for(var i=1;i<=5;i++){
                    if(player.hasEnabledSlot(i)) list.push('equip'+i);
                }
                if(event.horse){
                    if(list.contains('equip3')&&(get.is.mountCombined()||list.contains('equip4'))) list.push('equip3_4');
                    list.remove('equip3');
                    list.remove('equip4');
                }
                if(!list.length) event.finish();
                else if(list.length==1){
                    event.list=list;
                    event._result={control:list[0]};
                }
                else{
                    list.sort();
                    event.list=list;
                    var next=player.chooseControl(list);
                    next.set('prompt','请选择废除一个装备栏');
                    if(!event.ai) event.ai=function(event,player,list){
                        return list.randomGet();
                    }
                    event.ai=event.ai(event.getParent(),player,list);
                    next.ai=function(){
                        return event.ai;
                    };
                }
                'step 1'
                event.result={control:result.control};
                if(result.control=='equip3_4'){
                    player.disableEquip(3,4);
                }
                else player.disableEquip(result.control);
            },
            swapEquip:function(){
                "step 0"
                game.log(player,'和',target,'交换了装备区中的牌')
                event.cards=[player.getCards('e'),target.getCards('e')];
                game.loseAsync({
                    player:player,
                    target:target,
                    cards1:event.cards[0],
                    cards2:event.cards[1],
                }).setContent('swapHandcardsx');
                "step 1"
                for(var i=0;i<event.cards[1].length;i++){
                    if(get.position(event.cards[1][i],true)=='o') player.equip(event.cards[1][i]);
                }
                for(var i=0;i<event.cards[0].length;i++){
                    if(get.position(event.cards[0][i],true)=='o') target.equip(event.cards[0][i]);
                }
            },
            disableJudge:function(){
                'step 0'
                game.log(player,'废除了判定区');
                var js=player.getCards('j');
                if(js.length) player.discard(js);
                player.storage._disableJudge=true;
                //player.markSkill('_disableJudge');
                'step 1'
                game.broadcastAll(function(player,card){
                    player.$disableJudge();
                },player);
            },
            enableJudge:function(){
                if(!player.storage._disableJudge) return;
                game.log(player,'恢复了判定区');
                game.broadcastAll(function(player){
                    player.$enableJudge();
                },player);
            },
            /*----分界线----*/
            phasing:function(){
                'step 0'
                while(ui.dialogs.length){
                    ui.dialogs[0].close();
                }
                game.phaseNumber++;
                player.phaseNumber++;
                game.broadcastAll(function(player,player2,num,popup){
                    if(lib.config.glow_phase){
                        if(player2) player2.classList.remove('glow_phase');
                        player.classList.add('glow_phase');
                    }
                    player.phaseNumber=num;
                    if(popup&&lib.config.show_phase_prompt) player.popup('回合开始',null,false);
                },player,_status.currentPhase,player.phaseNumber,!player.noPhaseDelay);
                _status.currentPhase=player;
                _status.discarded=[];
                game.syncState();
                game.addVideo('phaseChange',player);
                if(game.phaseNumber==1){
                    delete player._start_cards;
                    if(lib.configOL.observe){
                        lib.configOL.observeReady=true;
                        game.send('server','config',lib.configOL);
                    }
                }
                game.log();
                game.log(player,'的回合开始');
                player._noVibrate=true;
                if(get.config('identity_mode')!='zhong'&&get.config('identity_mode')!='purple'&&!_status.connectMode){
                    var num;
                    switch(get.config('auto_identity')){
                        case 'one':num=1;break;
                        case 'two':num=2;break;
                        case 'three':num=3;break;
                        case 'always':num=-1;break;
                        default:num=0;break;
                    }
                    if(num&&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
                        if(!_status.video) player.popup('显示身份');
                        _status.identityShown=true;
                        game.showIdentity(false);
                    }
                }
                player.ai.tempIgnore=[];
                if(ui.land&&ui.land.player==player){
                    game.addVideo('destroyLand');
                    ui.land.destroy();
                }
                'step 1'
                event.trigger('phaseBeginStart');
            },
            toggleSubPlayer:function(){
                'step 0'
                var list=event.list||player.storage.subplayer.skills.slice(0);
                list.remove(player.storage.subplayer.name2);
                event.list=list;
                if(!event.directresult){
                    if(list.length>1){
                        var dialog=ui.create.dialog('更换一个随从','hidden');
                        dialog.add([list,'character']);
                        player.chooseButton(dialog,true);
                    }
                    else if(list.length==1){
                        event.directresult=list[0];
                    }
                    else{
                        event.finish();
                    }
                }
                else{
                    if(!list.contains(event.directresult)){
                        event.finish();
                    }
                }
                'step 1'
                if(!event.directresult){
                    if(result&&result.bool&&result.links[0]){
                        event.directresult=result.links[0];
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                if(player.storage.subplayer){
                    var current=player.storage.subplayer.name2;
                    if(event.directresult==current){
                        event.finish();
                        return;
                    }
                    player.storage[current].hp=player.hp;
                    player.storage[current].maxHp=player.maxHp;
                    player.storage[current].hs=player.getCards('h');
                    player.storage[current].es=player.getCards('e');
                    player.lose(player.getCards('he'),ui.special)._triggered=null;

                    var cfg=player.storage[event.directresult];
                    player.storage.subplayer.name2=event.directresult;
                    player.reinit(current,event.directresult,[
                        cfg.hp,
                        cfg.maxHp
                    ]);
                    if(cfg.hs.length) player.directgain(cfg.hs);
                    if(cfg.es.length) player.directequip(cfg.es);
                }
            },
            exitSubPlayer:function(){
                'step 0'
                if(player.storage.subplayer){
                    var current=player.storage.subplayer.name2;
                    if(event.remove){
                        player.lose(player.getCards('he'),ui.discardPile)._triggered=null;
                    }
                    else{
                        player.storage[current].hp=player.hp;
                        player.storage[current].maxHp=player.maxHp;
                        player.storage[current].hs=player.getCards('h');
                        player.storage[current].es=player.getCards('e');
                        player.lose(player.getCards('he'),ui.special)._triggered=null;
                    }
                    player.reinit(current,player.storage.subplayer.name,[
                        player.storage.subplayer.hp,
                        player.storage.subplayer.maxHp
                    ]);
                    player.update();
                    if(event.remove){
                        if(player.storage[current].onremove){
                            player.storage[current].onremove(player);
                        }
                        delete player.storage[current];
                        player.storage.subplayer.skills.remove(current);
                        game.log(player,'牺牲了随从','#g'+current);
                    }
                    else{
                        game.log(player,'收回了随从','#g'+current);
                    }
                    player.addSkill(player.storage.subplayer.skills);
                }
                'step 1'
                if(player.storage.subplayer){
                    player.directgain(player.storage.subplayer.hs);
                    player.directequip(player.storage.subplayer.es);
                }
                player.removeSkill('subplayer');
                'step 2'
                if(event.remove){
                    event.trigger('subPlayerDie');
                }
            },
            callSubPlayer:function(){
                'step 0'
                var list=player.getSubPlayers(event.tag);
                event.list=list;
                if(!event.directresult){
                    if(list.length>1){
                        var dialog=ui.create.dialog('调遣一个随从','hidden');
                        dialog.add([list,'character']);
                        player.chooseButton(dialog,true);
                    }
                    else if(list.length==1){
                        event.directresult=list[0];
                    }
                    else{
                        event.finish();
                    }
                }
                else{
                    if(!list.contains(event.directresult)){
                        event.finish();
                    }
                }
                'step 1'
                if(!event.directresult){
                    if(result&&result.bool&&result.links[0]){
                        event.directresult=result.links[0];
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                if(event.directresult){
                    var cfg=player.storage[event.directresult];
                    var source=cfg.source||player.name;
                    var name=event.directresult;
                    game.log(player,'调遣了随从','#g'+name);
                    player.storage.subplayer={
                        name:source,
                        name2:event.directresult,
                        hp:player.hp,
                        maxHp:player.maxHp,
                        skills:event.list.slice(0),
                        hs:player.getCards('h'),
                        es:player.getCards('e'),
                        intro2:cfg.intro2
                    }
                    player.removeSkill(event.list);
                    player.reinit(source,name,[cfg.hp,cfg.maxHp]);
                    player.addSkill('subplayer');
                    player.lose(player.getCards('he'),ui.special)._triggered=null;
                    if(cfg.hs.length) player.directgain(cfg.hs);
                    if(cfg.es.length) player.directequip(cfg.es);
                }
                'step 2'
                game.delay();
            },
            addExtraTarget:function(){
                "step 0"
                event.num=0;
                "step 1"
                var target=targets[num],info=get.info(card);
                if(target==event.target&&event.addedTarget){
                    event.addedTargets[num]=event.addedTarget;
                    event._result={bool:false};
                }
                else if(game.hasPlayer(function(current){
                    return info.filterAddedTarget(card,player,current,target)
                })){
                    var next=player.chooseTarget(get.translation(event.card)+'：选择'+get.translation(targets[num])+'对应的指向目标',function(card,player,target){
                        var card=get.card(),info=get.info(card);
                        return info.filterAddedTarget(card,player,target,_status.event.preTarget)
                    },true);
                    next.set('_get_card',card);
                    next.set('preTarget',targets[num]);
                }
                else{
                    event.addedTargets[num]=false;
                    event._result={bool:false};
                }
                "step 2"
                if(result.bool){
                    event.addedTargets[num]=result.targets[0];
                    player.line2([targets[num],result.targets[0]]);
                }
                event.num++;
                if(event.num<targets.length) event.goto(1);
            },
            reverseOrder:function(){
                "step 0"
                game.delay();
                "step 1"
                var choice;
                if(get.tag(card,'multineg')){
                    choice=(player.previous.side==player.side)?'逆时针':'顺时针';
                }
                else{
                    choice=(player.next.side==player.side)?'逆时针':'顺时针';
                }
                player.chooseControl('顺时针','逆时针',function(event,player){
                    return _status.event.choice||'逆时针';
                }).set('prompt','选择'+get.translation(card)+'的结算方向').set('choice',choice).set('forceDie',true);
                "step 2"
                if(result&&result.control=='顺时针'){
                    var evt=event.getParent(),sorter=(_status.currentPhase||player);
                    evt.fixedSeat=true;
                    evt.targets.sortBySeat(sorter);
                    evt.targets.reverse();
                    if(evt.targets[evt.targets.length-1]==sorter){
                        evt.targets.unshift(evt.targets.pop());
                    }
                }
            },
            addJudgeCard:function(){
                if(lib.filter.judge(card,player,target)&&cards.length&&get.position(cards[0],true)=='o') target.addJudge(card,cards);
            },
            equipCard:function(){
                if(cards.length&&get.position(cards[0],true)=='o') target.equip(cards[0]);
            },
            gameDraw:function(){
                "step 0"
                if(_status.brawl&&_status.brawl.noGameDraw){
                    event.finish();
                    return;
                }
                var end=player;
                var numx=num;
                do{
                    if(typeof num=='function'){
                        numx=num(player);
                    }
                    if(player.getTopCards) player.directgain(player.getTopCards(numx));
                    else player.directgain(get.cards(numx));
                    if(player.singleHp===true&&get.mode()!='guozhan'&&(lib.config.mode!='doudizhu'||_status.mode!='online')){
                        player.doubleDraw();
                    }
                    player._start_cards=player.getCards('h');
                    player=player.next;
                }
                while(player!=end);
                event.changeCard=get.config('change_card');
                if(_status.connectMode||(lib.config.mode=='doudizhu'&&_status.mode=='online')||lib.config.mode!='identity'&&lib.config.mode!='guozhan'&&lib.config.mode!='doudizhu'){
                    event.changeCard='disabled';
                }
                "step 1"
                if(event.changeCard!='disabled'&&!_status.auto){
                    event.dialog=ui.create.dialog('是否使用手气卡？');
                    ui.create.confirm('oc');
                    event.custom.replace.confirm=function(bool){
                        _status.event.bool=bool;
                        game.resume();
                    }
                }
                else{
                    event.finish();
                }
                "step 2"
                if(event.changeCard=='once'){
                    event.changeCard='disabled';
                }
                else if(event.changeCard=='twice'){
                    event.changeCard='once';
                }
                else if(event.changeCard=='disabled'){
                    event.bool=false;
                    return;
                }
                _status.imchoosing=true;
                event.switchToAuto=function(){
                    _status.event.bool=false;
                    game.resume();
                }
                game.pause();
                "step 3"
                _status.imchoosing=false;
                if(event.bool){
                    if(game.changeCoin){
                        game.changeCoin(-3);
                    }
                    var hs=game.me.getCards('h');
                    game.addVideo('lose',game.me,[get.cardsInfo(hs),[],[],[]]);
                    for(var i=0;i<hs.length;i++){
                        hs[i].discard(false);
                    }
                    game.me.directgain(get.cards(hs.length));
                    event.goto(2);
                }
                else{
                    if(event.dialog) event.dialog.close();
                    if(ui.confirm) ui.confirm.close();
                    game.me._start_cards=game.me.getCards('h');
                    event.finish();
                }
            },
            phaseLoop:function(){
                "step 0"
                var num=1,current=player;
                while(current.getSeatNum()==0){
                    current.setSeatNum(num);
                    current=current.next;
                    num++;
                }
                "step 1"
                for(var i=0;i<lib.onphase.length;i++){
                    lib.onphase[i]();
                }
                player.phase();
                "step 2"
                if(!game.players.contains(event.player.next)){
                    event.player=game.findNext(event.player.next);
                }
                else{
                    event.player=event.player.next;
                }
                event.goto(1);
            },
            loadPackage:function(){
                'step 0'
                if(event.packages.length){
                    window.game=game;
                    var pack=event.packages.shift().split('/');
                    lib.init.js(lib.assetURL+pack[0],pack[1],game.resume);
                    game.pause();
                }
                else{
                    event.finish();
                }
                'step 1'
                if(!lib.config.dev) delete window.game;
                var character=lib.imported.character;
                var card=lib.imported.card;
                var i,j,k;
                for(i in character){
                    if(character[i].character){
                        var characterPack=lib.characterPack[i];
                        if(characterPack) Object.assign(characterPack,character[i].character);
                        else lib.characterPack[i]=character[i].character;
                    }
                    if(character[i].forbid&&character[i].forbid.contains(lib.config.mode)) continue;
                    if(character[i].mode&&character[i].mode.contains(lib.config.mode)==false) continue;

                    if(Array.isArray(lib[j])&&Array.isArray(character[i][j])){
                        lib[j].addArray(character[i][j]);
                        continue;
                    }
                    for(j in character[i]){
                        if(j=='mode'||j=='forbid'||j=='characterSort') continue;
                        for(k in character[i][j]){
                            if(j=='character'){
                                if(!character[i][j][k][4]){
                                    character[i][j][k][4]=[];
                                }
                                if(character[i][j][k][4].contains('boss')||
                                    character[i][j][k][4].contains('hiddenboss')){
                                    lib.config.forbidai.add(k);
                                }
                                if(lib.config.forbidai_user&&lib.config.forbidai_user.contains(k)){
                                    lib.config.forbidai.add(k);
                                }
                                for(var l=0;l<character[i][j][k][3].length;l++){
                                    lib.skilllist.add(character[i][j][k][3][l]);
                                }
                            }
                            if(j=='translate'&&k==i){
                                lib[j][k+'_character_config']=character[i][j][k];
                            }
                            else{
                                if(lib[j][k]==undefined){
                                    Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(character[i][j],k));
                                }
                                else if(Array.isArray(lib[j][k])&&Array.isArray(character[i][j][k])){
                                    lib[j][k].addArray(character[i][j][k]);
                                }
                                else{
                                    console.log(
                                        `dublicate ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`,
                                        lib[j][k],
                                        `\ncharacter.${i}.${j}.${k}`,
                                        character[i][j][k]
                                    );
                                }
                            }
                        }
                    }
                }
                for(i in card){
                    var cardPack=lib.cardPack[i]?lib.cardPack[i]:lib.cardPack[i]=[];
                    if(card[i].card){
                        for(var j in card[i].card){
                            if(!card[i].card[j].hidden&&card[i].translate[j+'_info']){
                                cardPack.push(j);
                            }
                        }
                    }
                    for(j in card[i]){
                        if(j=='mode'||j=='forbid') continue;
                        if(j=='list') continue;
                        for(k in card[i][j]){
                            if(j=='skill'&&k[0]=='_'&&!lib.config.cards.contains(i)){
                                continue;
                            }
                            if(j=='translate'&&k==i){
                                lib[j][k+'_card_config']=card[i][j][k];
                            }
                            else{
                                if(lib[j][k]==undefined) Object.defineProperty(lib[j],k,Object.getOwnPropertyDescriptor(card[i][j],k));
                                else{
                                    console.log(
                                        `dublicate ${j} in card ${i}:\n${k}\nlib.${j}.${k}`,
                                        lib[j][k],
                                        `\ncard.${i}.${j}.${k}`,
                                        card[i][j][k]
                                    );
                                }
                            }
                        }
                    }
                }
                event.goto(0);
            },
            loadMode:function(){
                'step 0'
                window.game=game;
                lib.init.js(lib.assetURL+'mode',event.mode,game.resume);
                game.pause();
                'step 1'
                if(!lib.config.dev) delete window.game;
                event.result=lib.imported.mode[event.mode];
                delete lib.imported.mode[event.mode];
            },
            forceOver:function(){
                'step 0'
                while(ui.controls.length){
                    ui.controls[0].close();
                }
                while(ui.dialogs.length){
                    ui.dialogs[0].close();
                }
                'step 1'
                if(event.bool!='noover'){
                    game.over(event.bool);
                }
                if(event.callback){
                    event.callback();
                }
            },
            arrangeTrigger:function(){
                'step 0'
                event.filter1=function(info){
                    if(info[1].isDead()&&!lib.skill[info[0]].forceDie) return false;
                    if(info[1].isOut()&&!lib.skill[info[0]].forceOut) return false;
                    return lib.filter.filterTrigger(trigger,info[1],event.triggername,info[0]);
                }
                event.filter2=function(info2){
                    var info=lib.skill[info2[0]];
                    if(!lib.translate[info2[0]]||info.silent) return false;
                    return true;
                }
                event.filter3=function(info,info2){
                    return event.filter2(info2)&&event.filter1(info2)&&info2[1]==info[1]&&info[2]==info2[2]&&(lib.skill.global.contains(info2[0])||info[1].hasSkill(info2[0],true));
                }
                'step 1'
                if(trigger.filterStop&&trigger.filterStop()){
                    event.finish();
                }
                else if(event.list.length){
                    var info=event.list.shift();
                    game.createTrigger(event.triggername,info[0],info[1],trigger);
                    event.redo();
                }
                'step 2'
                if(!event.map.length){
                    if(event.list2.length){
                        var info=event.list2.shift();
                        game.createTrigger(event.triggername,info[0],info[1],trigger);
                        event.redo();
                    }
                    else{
                        if(trigger._triggering==this){
                            delete trigger._triggering;
                        }
                        event.finish();
                        return;
                    }
                };
                event.doing=event.map.shift();
                'step 3'
                event.num=0;
                var bool=false;
                var list=event.doing.list;
                for(var i=0;i<list.length;i++){
                    if(event.filter1(list[i])){
                        event.num=i;
                        bool=true;
                        break;
                    }
                }
                if(!bool){event.goto(2);return;}
                var priority=list[event.num][2];
                for(var i=0;i<event.num;i++){
                    if(event.doing.list[i][2]>priority){
                        event.doing.list.splice(i--,1);
                        event.num--;
                    }
                }
                event.choice=[];
                if(event.num<event.doing.list.length-1&&event.filter2(event.doing.list[event.num])){
                    var current=event.doing.list[event.num];
                    event.choice.push(current);
                    for(var i=event.num+1;i<event.doing.list.length;i++){
                        if(event.filter3(current,event.doing.list[i])) event.choice.push(event.doing.list[i]);
                    }
                }
                if(event.choice.length<2) event.goto(6);
                'step 4'
                var controls=[];
                event.current=event.choice[0][1]
                for(var i=0;i<event.choice.length;i++){
                    controls.push(event.choice[i][0]);
                }
                event.current.chooseControl(controls)
                .set('prompt','选择下一个触发的技能').set('forceDie',true).set('arrangeSkill',true).set('includeOut',true)
                'step 5'
                if(result.control){
                    for(var i=0;i<event.doing.list.length;i++){
                        if(event.doing.list[i][0]==result.control&&event.doing.list[i][1]==event.current){
                            event.num=i;break;
                        }
                    }
                }
                'step 6'
                var info=event.doing.list[event.num];
                if(info){
                    event.doing.list2.push(info);
                    event.doing.list.splice(event.num,1);
                    game.createTrigger(event.triggername,info[0],info[1],trigger);
                }
                'step 7'
                if(trigger.filterStop&&trigger.filterStop()){
                    event.finish();
                }
                else event.goto(event.doing.list.length?3:2);
            },
            createTrigger:function(){
                "step 0"
                //console.log('triggering: ' + player.name+ ' \'s skill: ' + event.skill+' in ' + event.triggername)
                if(lib.filter.filterTrigger(trigger,player,event.triggername,event.skill)){
                    var fullskills=game.expandSkills(player.getSkills().concat(lib.skill.global));
                    if(!fullskills.contains(event.skill)){
                        var info=get.info(event.skill);
                        var hidden=player.hiddenSkills.slice(0);
                        var invisible=player.invisibleSkills.slice(0);
                        game.expandSkills(hidden);
                        game.expandSkills(invisible);
                        if(hidden.contains(event.skill)){
                            if(!info.silent&&player.hasSkillTag('nomingzhi',false,null,true)){
                                event.finish();
                            }
                            else if(!info.direct){
                                event.trigger('triggerHidden');
                            }
                            else{
                                event.skillHidden=true;
                            }
                        }
                        else if(invisible.contains(event.skill)){
                            event.trigger('triggerInvisible');
                        }
                        else{
                            var keep=false;
                            for(var i in player.additionalSkills){
                                if(i.startsWith('hidden:')&&game.expandSkills(player.additionalSkills[i]).contains(event.skill)){
                                    keep=true;break;
                                }
                            }
                            if(!keep){
                                event.finish();
                            }
                        }
                    }
                }
                else{
                    event.finish();
                }
                "step 1"
                if(event.cancelled){
                    event.finish();
                    return;
                }
                var info=get.info(event.skill);
                if(!event.revealed&&!info.forced){
                    var checkFrequent=function(info){
                        if(player.hasSkillTag('nofrequent',false,event.skill)) return false;
                        if(typeof info.frequent=='boolean') return info.frequent;
                        if(typeof info.frequent=='function') return info.frequent(trigger,player);
                        if(info.frequent=='check'&&typeof info.check=='function') return info.check(trigger,player);
                        return false;
                    }
                    if(info.direct&&player.isUnderControl()){
                        game.swapPlayerAuto(player);
                        event._result={bool:true};
                        event._direct=true;
                    }
                    else if(info.direct){
                        event._result={bool:true};
                        event._direct=true;
                    }
                    else if(info.direct&&player.isOnline()){
                        event._result={bool:true};
                        event._direct=true;
                    }
                    else{
                        if(checkFrequent(info)){
                            event.frequentSkill=true;
                        }
                        var str;
                        var check=info.check;
                        if(info.prompt) str=info.prompt;
                        else{
                            if(typeof info.logTarget=='string'){
                                str=get.prompt(event.skill,trigger[info.logTarget],player);
                            }
                            else if(typeof info.logTarget=='function'){
                                var logTarget=info.logTarget(trigger,player);
                                if(get.itemtype(logTarget).startsWith('player')) str=get.prompt(event.skill,logTarget,player);
                            }
                            else{
                                str=get.prompt(event.skill,null,player);
                            }
                        }
                        if(typeof str=='function'){str=str(trigger,player)}
                        var next=player.chooseBool(str);
                        if(event.frequentSkill) next.set('frequentSkill',event.skill);
                        next.set('forceDie',true);
                        next.set('includeOut',true);
                        next.ai=function(){
                            return !check||check(trigger,player);
                        };
                        if(typeof info.prompt2=='function'){
                            next.set('prompt2',info.prompt2(trigger,player));
                        }
                        else if(typeof info.prompt2=='string'){
                            next.set('prompt2',info.prompt2);
                        }
                        else if(info.prompt2!=false){
                            if(lib.dynamicTranslate[event.skill]) next.set('prompt2',lib.dynamicTranslate[event.skill](player,event.skill));
                            else if(lib.translate[event.skill+'_info']) next.set('prompt2',lib.translate[event.skill+'_info']);
                        }
                        if(trigger.skillwarn){
                            if(next.prompt2){
                                next.set('prompt2','<span class="thundertext">'+trigger.skillwarn+'。</span>'+next.prompt2);
                            }
                            else{
                                next.set('prompt2',trigger.skillwarn);
                            }
                        }
                    }
                }
                "step 2"
                var info=get.info(event.skill);
                if(result&&result.bool!=false){
                    var autodelay=info.autodelay;
                    if(typeof autodelay=='function'){
                        autodelay=autodelay(trigger,player);
                    }
                    if(autodelay&&(info.forced||!event.isMine())){
                        if(typeof autodelay=='number'){
                            game.delayx(autodelay);
                        }
                        else{
                            game.delayx();
                        }
                    }
                }
                "step 3"
                var info=get.info(event.skill);
                if(result&&result.bool==false){
                    if(info.oncancel) info.oncancel(trigger,player);
                    event.finish();
                    return;
                }
                if(info.popup!=false&&!info.direct){
                    if(info.popup){
                        player.popup(info.popup);
                        game.log(player,'发动了','【'+get.skillTranslation(event.skill,player)+'】');
                    }
                    else{
                        if(info.logTarget&&info.logLine!==false){
                            if(typeof info.logTarget=='string'){
                                player.logSkill(event.skill,trigger[info.logTarget],info.line);
                            }
                            else if(typeof info.logTarget=='function'){
                                player.logSkill(event.skill,info.logTarget(trigger,player),info.line);
                            }
                        }
                        else{
                            player.logSkill(event.skill,false,info.line);
                        }
                    }
                }
                var next=game.createEvent(event.skill);
                if(typeof info.usable=='number'){
                    player.addSkill('counttrigger');
                    if(!player.storage.counttrigger){
                        player.storage.counttrigger={};
                    }
                    if(!player.storage.counttrigger[event.skill]){
                        player.storage.counttrigger[event.skill]=1;
                    }
                    else{
                        player.storage.counttrigger[event.skill]++;
                    }
                }
                next.player=player;
                next._trigger=trigger;
                next.triggername=event.triggername;
                next.setContent(info.content);
                next.skillHidden=event.skillHidden;
                if(info.forceDie) next.forceDie=true;
                if(info.forceOut) next.includeOut=true;
                "step 4"
                if(player._hookTrigger){
                    for(var i=0;i<player._hookTrigger.length;i++){
                        var info=lib.skill[player._hookTrigger[i]].hookTrigger;
                        if(info){
                            if(info.after&&info.after(event,player,event.triggername)){
                                event.trigger('triggerAfter');
                                break;
                            }
                        }
                    }
                }
            },
            playVideoContent:function(){
                'step 0'
                game.delay(0,500);
                'step 1'
                if(!game.chess){
                    ui.control.innerHTML='';
                    var nodes=[];
                    for(var i=0;i<ui.arena.childNodes.length;i++){
                        nodes.push(ui.arena.childNodes[i]);
                    }
                    for(var i=0;i<nodes.length;i++){
                        if(nodes[i]==ui.canvas) continue;
                        if(nodes[i]==ui.control) continue;
                        if(nodes[i]==ui.mebg) continue;
                        if(nodes[i]==ui.me) continue;
                        if(nodes[i]==ui.roundmenu) continue;
                        nodes[i].remove();
                    }
                    ui.sidebar.innerHTML='';
                    ui.cardPile.innerHTML='';
                    ui.discardPile.innerHTML='';
                    ui.special.innerHTML='';
                    ui.ordering.innerHTML='';
                }
                ui.system.firstChild.innerHTML='';
                ui.system.lastChild.innerHTML='';
                ui.system.firstChild.appendChild(ui.config2);
                if(ui.updateVideoMenu){
                    ui.updateVideoMenu();
                }
                _status.videoDuration=1;
                ui.create.system('返回',function(){
                    var mode=localStorage.getItem(lib.configprefix+'playbackmode');
                    if(mode){
                        game.saveConfig('mode',mode);
                    }
                    game.reload();
                });
                ui.create.system('重播',function(){
                    _status.replayvideo=true;
                    game.playVideo(_status.playback,lib.config.mode);
                });
                ui.create.system('暂停',ui.click.pause,true).id='pausebutton';
                var slow=ui.create.system('减速',function(){
                    _status.videoDuration*=1.5;
                    updateDuration();
                },true);
                var fast=ui.create.system('加速',function(){
                    _status.videoDuration/=1.5;
                    updateDuration();
                },true);
                var updateDuration=function(){
                    if(_status.videoDuration>1){
                        slow.classList.add('glow');
                    }
                    else{
                        slow.classList.remove('glow');
                    }
                    if(_status.videoDuration<1){
                        fast.classList.add('glow');
                    }
                    else{
                        fast.classList.remove('glow');
                    }
                }
                ui.system.style.display='';
                ui.refresh(ui.system);
                ui.system.show();
                ui.window.show();
                if(lib.config.mode!='versus'&&lib.config.mode!='boss'){
                    ui.arena.style.display='';
                    ui.refresh(ui.arena);
                    ui.arena.show();
                }
                if(!game.chess){
                    game.playerMap={};
                }
                game.finishCards();
                'step 2'
                if(event.video.length){
                    var content=event.video.shift();
                    // console.log(content);
                    if(content.type=='delay'){
                        game.delay(content.content);
                    }
                    else if(content.type=='play'){
                        window.play={};
                        if(!event.playtoload){
                            event.playtoload=1;
                        }
                        else{
                            event.playtoload++;
                        }
                        var script=lib.init.js(lib.assetURL+'play',content.name);
                        script.addEventListener('load',function(){
                            var play=window.play[content.name]
                            if(play&&play.video){
                                play.video(content.init);
                            }
                            event.playtoload--;
                            if(event.playtoload==0){
                                delete window.play;
                            }
                        });
                    }
                    else if(typeof content.player=='string'&&game.playerMap[content.player]&&
                        game.playerMap[content.player].classList&&
                        !game.playerMap[content.player].classList.contains('obstacle')){
                        game.videoContent[content.type](game.playerMap[content.player],content.content);
                    }
                    else{
                        game.videoContent[content.type](content.content);
                    }
                    if(event.video.length){
                        game.delay(0,_status.videoDuration*Math.min(2000,event.video[0].delay));
                    }
                    event.redo();
                }
                else{
                    _status.over=true;
                    ui.system.lastChild.hide();
                    setTimeout(function(){
                        ui.system.lastChild.innerHTML='';
                    },500);
                }
            },
            waitForPlayer:function(){
                'step 0'
                ui.auto.hide();
                ui.pause.hide();

                game.createServer();
                if(!lib.translate.zhu){
                    lib.translate.zhu='主';
                }
                if(event.func){
                    event.func();
                }
                if(!lib.configOL.number){
                    lib.configOL.number=parseInt(lib.configOL.player_number);
                }
                if(game.onlineroom){
                    game.send('server','config',lib.configOL);
                }

                ui.create.connectPlayers(game.ip);
                if(!window.isNonameServer){
                    var me=game.connectPlayers[0];
                    me.setIdentity('zhu');
                    me.initOL(get.connectNickname(),lib.config.connect_avatar);
                    me.playerid='1';
                    game.onlinezhu='1';
                }
                _status.waitingForPlayer=true;
                if(window.isNonameServer){
                    document.querySelector('#server_status').innerHTML='等待中';
                }
                game.pause();
                'step 1'
                _status.waitingForPlayer=false;
                lib.configOL.gameStarted=true;
                if(window.isNonameServer){
                    document.querySelector('#server_status').innerHTML='游戏中';
                }
                if(game.onlineroom){
                    game.send('server','config',lib.configOL);
                }
                for(var i=0;i<game.connectPlayers.length;i++){
                    game.connectPlayers[i].delete();
                }
                delete game.connectPlayers;
                if(ui.roomInfo){
                    ui.roomInfo.remove();
                    delete ui.roomInfo;
                }
                if(ui.exitroom){
                    ui.exitroom.remove();
                    delete ui.exitroom;
                }
                game.broadcast('gameStart');
                game.delay(2);
                ui.auto.show();
                ui.pause.show();
                if(lib.config.show_cardpile){
                    ui.cardPileButton.style.display='';
                }
            },
            replaceHandcards:function(){
                'step 0'
                if(event.players.contains(game.me)){
                    game.me.chooseBool('是否置换手牌？');
                }
                else{
                    event.finish();
                }
                'step 1'
                if(result&&result.bool){
                    var hs=game.me.getCards('h')
                    for(var i=0;i<hs.length;i++){
                        hs[i].discard(false);
                    }
                    var cards=get.cards(hs.length);
                    game.me._start_cards=cards;
                    game.me.directgain(cards);
                }
            },
            replaceHandcardsOL:function(){
                'step 0'
                var send=function(){
                    game.me.chooseBool('是否置换手牌？');
                    game.resume();
                };
                var sendback=function(result,player){
                    if(result&&result.bool){
                        var hs=player.getCards('h')
                        game.broadcastAll(function(player,hs){
                            game.addVideo('lose',player,[get.cardsInfo(hs),[],[],[]]);
                            for(var i=0;i<hs.length;i++){
                                hs[i].discard(false);
                            }
                        },player,hs);
                        var cards=get.cards(hs.length);
                        player.directgain(cards);
                        player._start_cards=cards;
                    }
                };
                for(var i=0;i<event.players.length;i++){
                    if(event.players[i].isOnline()){
                        event.withol=true;
                        event.players[i].send(send);
                        event.players[i].wait(sendback);
                    }
                    else if(event.players[i]==game.me){
                        event.withme=true;
                        game.me.chooseBool('是否置换手牌？');
                        game.me.wait(sendback);
                    }
                }
                'step 1'
                if(event.withme){
                    game.me.unwait(result);
                }
                'step 2'
                if(event.withol&&!event.resultOL){
                    game.pause();
                }
            },
            phase:function(){
                'step 0'
                //初始化阶段列表
                if(!event.phaseList){
                    event.phaseList=['phaseZhunbei','phaseJudge','phaseDraw','phaseUse','phaseDiscard','phaseJieshu'];
                }
                if(typeof event.num!='number'){
                    event.num=0;
                }
                //规则集中的“回合开始后①”，更新游戏轮数，触发“一轮游戏开始时”
                var isRound=false;
                if(!event.skill){
                    isRound=_status.roundSkipped;
                    if(_status.isRoundFilter){
                        isRound=_status.isRoundFilter(event,player);
                    }
                    else if(_status.seatNumSettled){
                        var seatNum=player.getSeatNum();
                        if(seatNum!=0){
                            if(get.itemtype(_status.lastPhasedPlayer)!='player'||seatNum<_status.lastPhasedPlayer.getSeatNum()) isRound=true;
                            _status.lastPhasedPlayer=player;
                        }
                    }
                    else if(player==_status.roundStart) isRound=true;
                    if(isRound){
                        delete _status.roundSkipped;
                        game.roundNumber++;
                        event._roundStart=true;
                        game.updateRoundNumber();
                        for(var i=0;i<game.players.length;i++){
                            if(game.players[i].isOut()&&game.players[i].outCount>0){
                                game.players[i].outCount--;
                                if(game.players[i].outCount==0&&!game.players[i].outSkills){
                                    game.players[i].in();
                                }
                            }
                        }
                        event.trigger('roundStart');
                    }
                }
                _status.globalHistory.push({
                    cardMove:[],
                    custom:[],
                    useCard:[],
                    changeHp:[],
                    everything:[],
                });
                var players=game.players.slice(0).concat(game.dead);
                for(var i=0;i<players.length;i++){
                    var current=players[i];
                    current.actionHistory.push({useCard:[],respond:[],skipped:[],lose:[],gain:[],sourceDamage:[],damage:[],custom:[],useSkill:[]});
                    current.stat.push({card:{},skill:{}});
                    if(isRound){
                        current.getHistory().isRound=true;
                        current.getStat().isRound=true;
                    }
                };
                if(isRound){
                    game.getGlobalHistory().isRound=true;
                }
                'step 1'
                //规则集中的“回合开始后②（1v1武将登场专用）”
                event.trigger('phaseBeforeStart');
                'step 2'
                //规则集中的“回合开始后③（处理“游戏开始时”的时机）”
                event.trigger('phaseBefore');
                'step 3'
                //规则集中的“回合开始后④（卑弥呼〖纵傀〗的时机）”
                event.trigger('phaseBeforeEnd');
                'step 4'
                //规则集中的“回合开始后⑤”，进行翻面检测
                if(player.isTurnedOver()&&!event._noTurnOver){
                    event.cancel();
                    player.turnOver();
                    player.phaseSkipped=true;
                }
                else{
                    player.phaseSkipped=false;
                    player.getHistory().isMe=true;
                    player.getStat().isMe=true;
                }
                'step 5'
                //规则集中的“回合开始后⑥”，更新“当前回合角色”
                while(ui.dialogs.length){
                    ui.dialogs[0].close();
                }
                game.phaseNumber++;
                player.phaseNumber++;
                game.broadcastAll(function(player,num,popup){
                    if(lib.config.glow_phase){
                        player.classList.add('glow_phase');
                    }
                    player.phaseNumber=num;
                    _status.currentPhase=player;
                    if(popup&&lib.config.show_phase_prompt) player.popup('回合开始',null,false);
                },player,player.phaseNumber,!player.noPhaseDelay);
                _status.currentPhase=player;
                _status.discarded=[];
                game.syncState();
                game.addVideo('phaseChange',player);
                if(game.phaseNumber==1){
                    delete player._start_cards;
                    if(lib.configOL.observe){
                        lib.configOL.observeReady=true;
                        game.send('server','config',lib.configOL);
                    }
                }
                game.log();
                game.log(player,'的回合开始');
                player._noVibrate=true;
                if(get.config('identity_mode')!='zhong'&&get.config('identity_mode')!='purple'&&!_status.connectMode){
                    var num;
                    switch(get.config('auto_identity')){
                        case 'one':num=1;break;
                        case 'two':num=2;break;
                        case 'three':num=3;break;
                        case 'always':num=-1;break;
                        default:num=0;break;
                    }
                    if(num&&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
                        if(!_status.video) player.popup('显示身份');
                        _status.identityShown=true;
                        game.showIdentity(false);
                    }
                }
                player.ai.tempIgnore=[];
                if(ui.land&&ui.land.player==player){
                    game.addVideo('destroyLand');
                    ui.land.destroy();
                }
                'step 6'
                //规则集中的“回合开始后⑦”，国战武将明置武将牌
                event.trigger('phaseBeginStart');
                'step 7'
                //规则集中的“回合开始后⑨”，进行当先，化身等操作
                //没有⑧ 因为⑧用不到
                event.trigger('phaseBegin');
                //阶段部分
                'step 8'
                if(num<event.phaseList.length){
                    //规则集中没有的新时机 可以用来插入额外阶段啥的
                    if(player.isIn()) event.trigger('phaseChange')
                }
                else event.goto(11);
                'step 9'
                if(player.isIn()&&num<event.phaseList.length){
                    var phase=event.phaseList[num].split('|');
                    event.currentPhase=phase[0];
                    var next=player[event.currentPhase]();
                    next.phaseIndex=num;
                    if(phase.length>1){
                        next._extraPhaseReason=phase[1];
                    }
                    if(event.currentPhase=='phaseDraw'||event.currentPhase=='phaseDiscard'){
                        if(!player.noPhaseDelay){
                            if(player==game.me){
                                game.delay();
                            }
                            else{
                                game.delayx();
                            }
                        }
                    }
                }
                'step 10'
                if(event.currentPhase=='phaseUse'){
                    game.broadcastAll(function(){
                        if(ui.tempnowuxie){
                            ui.tempnowuxie.close();
                            delete ui.tempnowuxie;
                        }
                    });
                    delete player._noSkill;
                }
                event.num++;
                'step 11'
                if(event.num<event.phaseList.length){
                    event.goto(8);
                }
                else if(!event._phaseEndTriggered){
                    event._phaseEndTriggered=true;
                    event.trigger('phaseEnd');
                    event.redo();
                }
                'step 12'
                event.trigger('phaseAfter');
                'step 13'
                //删除当前回合角色 此时处于“不属于任何角色的回合”的阶段
                game.broadcastAll(function(player){
                    player.classList.remove('glow_phase');
                    delete _status.currentPhase;
                },player);
            },
            /**
             * @deprecated
             */
            phase_old:function(){
                "step 0"
                player.phaseZhunbei();
                "step 1"
                player.phaseJudge();
                "step 2"
                player.phaseDraw();
                if(!player.noPhaseDelay){
                    if(player==game.me){
                        game.delay();
                    }
                    else{
                        game.delayx();
                    }
                }
                "step 3"
                player.phaseUse();
                "step 4"
                game.broadcastAll(function(){
                    if(ui.tempnowuxie){
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                });
                player.phaseDiscard()
                if(!player.noPhaseDelay) game.delayx();
                //delete player.using;
                delete player._noSkill;
                "step 5"
                player.phaseJieshu();
            },
            phaseZhunbei:function(){
                event.trigger(event.name);
                game.log(player,'进入了准备阶段');
            },
            phaseJudge:function(){
                "step 0"
                game.log(player,'进入了判定阶段');
                event.cards=player.getCards('j');
                if(!event.cards.length) event.finish();
                "step 1"
                if(cards.length&&player.getCards('j').contains(cards[0])){
                    event.card=cards.shift();
                    if(event.card.classList.contains('removing')){
                        event.card.remove();
                        delete event.card;
                        event.redo();
                    }
                    else if(event.card.classList.contains('feichu')){
                        event.finish();
                        return;
                    }
                    else{
                        player.lose(event.card,'visible',ui.ordering);
                        player.$phaseJudge(event.card);
                        event.cancelled=false;
                        event.trigger('phaseJudge');
                        var name=event.card.viewAs||event.card.name;
                        player.popup(name,'thunder');
                        if(!lib.card[name].effect){
                            game.delay();
                            event.redo();
                        }
                        else if(!lib.card[name].judge){
                            game.delay();
                            event.nojudge=true;
                        }
                    }
                }
                else event.finish();
                "step 2"
                if(!event.cancelled&&!event.nojudge) player.judge(event.card).set('type','phase');
                "step 3"
                var name=event.card.viewAs||event.card.name;
                if(event.excluded){
                    delete event.excluded;
                }
                else if(event.cancelled&&!event.direct){
                    if(lib.card[name].cancel){
                        var next=game.createEvent(name+'Cancel');
                        next.setContent(lib.card[name].cancel);
                        next.cards=[event.card];
                        if(!event.card.viewAs) next.card=get.autoViewAs(event.card);
                        else next.card=get.autoViewAs({name:name},next.cards);
                        next.player=player;
                    }
                }
                else{
                    var next=game.createEvent(name);
                    next.setContent(lib.card[name].effect);
                    next._result=result;
                    next.cards=[event.card];
                    if(!event.card.viewAs) next.card=get.autoViewAs(event.card);
                    else next.card=get.autoViewAs({name:name},next.cards);
                    next.player=player;
                }
                ui.clear();
                event.goto(1);
            },
            phaseDraw:function(){
                "step 0"
                game.log(player,'进入了摸牌阶段');
                event.trigger("phaseDrawBegin1");
                "step 1"
                event.trigger("phaseDrawBegin2");
                "step 2"
                if(game.modPhaseDraw){
                    game.modPhaseDraw(player,event.num);
                }
                else{
                    if(event.num>0){
                        var num=event.num;
                        if(event.attachDraw){
                            for(var i=0;i<event.attachDraw.length;i++){
                                ui.cardPile.insertBefore(event.attachDraw[i],ui.cardPile.firstChild);
                            }
                            num+=event.attachDraw.length;
                        }
                        var next=player.draw(num);
                        if(event.attachDraw){
                            next.minnum=event.attachDraw.length;
                        }
                    }
                }
                "step 3"
                if(Array.isArray(result)){
                    event.cards=result;
                }
            },
            phaseUse:function(){
                "step 0"
                if(!event.logged){
                    game.log(player,'进入了出牌阶段');
                    event.logged=true;
                }
                var next=player.chooseToUse();
                if(!lib.config.show_phaseuse_prompt){
                    next.set('prompt',false);
                }
                next.set('type','phase');
                "step 1"
                if(result.bool&&!event.skipped){
                    event.goto(0);
                }
                game.broadcastAll(function(){
                    if(ui.tempnowuxie){
                        ui.tempnowuxie.close();
                        delete ui.tempnowuxie;
                    }
                });
                "step 2"
                var stat=player.getStat();
                for(var i in stat.skill){
                    var bool=false;
                    var info=lib.skill[i];
                    if(!info) continue;
                    if(info.enable!=undefined){
                        if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
                        else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
                    }
                    if(bool) stat.skill[i]=0;
                }
                for(var i in stat.card){
                    var bool=false;
                    var info=lib.card[i];
                    if(!info) continue;
                    if(info.updateUsable=='phaseUse') stat.card[i]=0;
                }
            },
            phaseDiscard:function(){
                "step 0"
                game.log(player,'进入了弃牌阶段');
                event.num=player.needsToDiscard();
                if(event.num<=0) event.finish();
                else{
                    game.broadcastAll(function(player){
                        if(lib.config.show_phase_prompt){
                            player.popup('弃牌阶段',null,false);
                        }
                    },player);
                }
                event.trigger('phaseDiscard');
                "step 1"
                player.chooseToDiscard(num,true)
                .set('useCache',true);
                "step 2"
                event.cards=result.cards;
            },
            phaseJieshu:function(){
                event.trigger(event.name);
                game.log(player,'进入了结束阶段');
            },
            chooseToUse:function(){
                "step 0"
                if(event.responded) return;
                if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()&&!lib.filter.wuxieSwap(event)){
                    game.modeSwapPlayer(player);
                }
                var skills=player.getSkills('invisible').concat(lib.skill.global);
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var info=lib.skill[skills[i]];
                    if(info&&info.onChooseToUse){
                        info.onChooseToUse(event);
                    }
                }
                _status.noclearcountdown=true;
                if(event.type=='phase'){
                    if(event.isMine()){
                        event.endButton=ui.create.control('结束回合','stayleft',function(){
                            var evt=_status.event;
                            if(evt.name!='chooseToUse'||evt.type!='phase') return;
                            if(evt.skill){
                                ui.click.cancel();
                            }
                            ui.click.cancel();
                        });
                        event.fakeforce=true;
                    }
                    else{
                        if(event.endButton){
                            event.endButton.close();
                            delete event.endButton;
                        }
                        event.fakeforce=false;
                    }
                }
                if(event.player.isUnderControl()&&!_status.auto){
                    event.result={
                        bool:false
                    }
                    return;
                }
                else if(event.isMine()){
                    if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                        ui.click.cancel();
                        return;
                    }
                    if(event.type=='wuxie'){
                        if(ui.tempnowuxie){
                            var triggerevent=event.getTrigger();
                            if(triggerevent&&triggerevent.targets&&triggerevent.num==triggerevent.targets.length-1){
                                ui.tempnowuxie.close();
                            }
                        }
                        if(lib.filter.wuxieSwap(event)){
                            event.result={
                                bool:false
                            }
                            return;
                        }
                    }
                    var ok=game.check();
                    if(!ok||!lib.config.auto_confirm){
                        game.pause();
                        if(lib.config.enable_vibrate&&player._noVibrate){
                            delete player._noVibrate;
                            game.vibrate();
                        }
                        if(typeof event.prompt=='string'){
                            if(event.openskilldialog){
                                event.skillDialog=ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog=event.prompt;
                            }
                            else{
                                event.dialog=ui.create.dialog(event.prompt);
                                if(event.prompt2){
                                    event.dialog.addText(event.prompt2);
                                }
                            }
                        }
                        else if(typeof event.prompt=='function'){
                            event.dialog=ui.create.dialog(event.prompt(event));
                        }
                        else if(event.prompt==undefined){
                            var str;
                            if(typeof event.filterCard=='object'){
                                var filter=event.filterCard;
                                str='请使用'+get.cnNumber(event.selectCard[0])+'张'
                                if(filter.name){
                                    str+=get.translation(filter.name);
                                }
                                else{
                                    str+='牌';
                                }
                            }
                            else{
                                str='请选择要使用的牌';
                            }
                            if(event.openskilldialog){
                                event.skillDialog=ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog=str;
                            }
                            else if(typeof event.skillDialog!='string'){
                                event.dialog=ui.create.dialog(str);
                            }
                            else{
                                event.dialog=str;
                            }
                        }
                    }
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.result=='ai'){
                    var ok=game.check();
                    if(ok){
                        ui.click.ok();
                    }
                    else if(ai.basic.chooseCard(event.ai1)||forced){
                        if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
                            ui.click.ok();
                            event._aiexcludeclear=true;
                        }
                        else{
                            if(!event.norestore){
                                if(event.skill){
                                    var skill=event.skill;
                                    ui.click.cancel();
                                    event._aiexclude.add(skill);
                                    var info=get.info(skill);
                                    if(info.sourceSkill){
                                        event._aiexclude.add(info.sourceSkill);
                                    }
                                }
                                else{
                                    get.card(true).aiexclude();
                                    game.uncheck();
                                }
                                event.redo();
                                game.resume();
                            }
                            else{
                                ui.click.cancel();
                            }
                        }
                    }
                    else if(event.skill&&!event.norestore){
                        var skill=event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        var info=get.info(skill);
                        if(info.sourceSkill){
                            event._aiexclude.add(info.sourceSkill);
                        }
                        event.redo();
                        game.resume();
                    }
                    else{
                        ui.click.cancel();
                    }
                    if(event.aidelay&&event.result&&event.result.bool){
                        game.delayx();
                    }
                }
                "step 2"
                if(event.endButton){
                    event.endButton.close();
                    delete event.endButton;
                }
                event.resume();
                if(event.result){
                    if(event.result._sendskill){
                        lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
                    }
                    if(event.result.skill){
                        var info=get.info(event.result.skill);
                        if(info&&info.chooseButton){
                            if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
                            var dialog=info.chooseButton.dialog(event,player);
                            if(info.chooseButton.chooseControl){
                                var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
                                if(dialog.direct) next.direct=true;
                                if(dialog.forceDirect) next.forceDirect=true;
                                next.dialog=dialog;
                                next.set('ai',info.chooseButton.check||function(){return 0;});
                                if(event.id) next._parent_id=event.id;
                                next.type='chooseToUse_button';
                            }
                            else{
                                var next=player.chooseButton(dialog);
                                if(dialog.direct) next.direct=true;
                                if(dialog.forceDirect) next.forceDirect=true;
                                next.set('ai',info.chooseButton.check||function(){return 1;});
                                next.set('filterButton',info.chooseButton.filter||function(){return true;});
                                next.set('selectButton',info.chooseButton.select||1);
                                if(event.id) next._parent_id=event.id;
                                next.type='chooseToUse_button';
                            }
                            event.buttoned=event.result.skill;
                        }
                        else if(info&&info.precontent&&!game.online&&!event.nouse){
                            var next=game.createEvent('pre_'+event.result.skill);
                            next.setContent(info.precontent);
                            next.set('result',event.result);
                            next.set('player',player);
                        }
                    }
                }
                "step 3"
                if(event.buttoned){
                    if(result.bool||result.control&&result.control!='cancel2'){
                        var info=get.info(event.buttoned).chooseButton;
                        lib.skill[event.buttoned+'_backup']=info.backup(info.chooseControl?result:result.links,player);
                        lib.skill[event.buttoned+'_backup'].sourceSkill=event.buttoned;
                        if(game.online){
                            event._sendskill=[event.buttoned+'_backup',lib.skill[event.buttoned+'_backup']];
                        }
                        event.backup(event.buttoned+'_backup');
                        if(info.prompt){
                            event.openskilldialog=info.prompt(info.chooseControl?result:result.links,player);
                        }
                    }
                    else{
                        ui.control.animate('nozoom',100);
                        event._aiexclude.add(event.buttoned);
                    }
                    event.goto(0);
                    delete event.buttoned;
                }
                "step 4"
                if(event._aiexcludeclear){
                    delete event._aiexcludeclear;
                    event._aiexclude.length=0;
                }
                delete _status.noclearcountdown;
                if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
                    event.skillDialog.close();
                }
                if(event.result&&event.result.bool&&!game.online&&!event.nouse){
                    player.useResult(event.result,event);
                }
                else if(event._sendskill){
                    event.result._sendskill=event._sendskill;
                }
                if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
                if(!_status.noclearcountdown){
                    game.stopCountChoose();
                }
                "step 5"
                if(event._result&&event.result){
                    event.result.result=event._result;
                }
            },
            chooseToRespond:function(){
                "step 0"
                if(event.responded){
                    delete event.dialog;
                    return;
                }
                var skills=player.getSkills('invisible').concat(lib.skill.global);
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var info=lib.skill[skills[i]];
                    if(info&&info.onChooseToRespond){
                        info.onChooseToRespond(event);
                    }
                }
                _status.noclearcountdown=true;
                if(!_status.connectMode&&lib.config.skip_shan&&event.autochoose&&event.autochoose()){
                    event.result={bool:false};
                }
                else{
                    if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()){
                        game.modeSwapPlayer(player);
                    }
                    if(event.isMine()){
                        if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                            ui.click.cancel();
                            return;
                        }
                        var ok=game.check();
                        if(!ok||!lib.config.auto_confirm){
                            game.pause();
                            if(event.openskilldialog){
                                event.skillDialog=ui.create.dialog(event.openskilldialog);
                                delete event.openskilldialog;
                                event.dialog=event.prompt;
                            }
                            else{
                                if(event.prompt) event.dialog=ui.create.dialog(event.prompt);
                                if(event.prompt2) event.dialog.addText(event.prompt2);
                            }
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    var ok=game.check();
                    if(ok){
                        ui.click.ok();
                    }
                    else if(ai.basic.chooseCard(event.ai1||event.ai)||forced){
                        if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
                            ui.click.ok();
                            event._aiexcludeclear=true;
                        }
                        else{
                            if(!event.norestore){
                                if(event.skill){
                                    var skill=event.skill;
                                    ui.click.cancel();
                                    event._aiexclude.add(skill);
                                    var info=get.info(skill);
                                    if(info.sourceSkill){
                                        event._aiexclude.add(info.sourceSkill);
                                    }
                                }
                                else{
                                    get.card(true).aiexclude();
                                    game.uncheck();
                                }
                                event.redo();
                                game.resume();
                            }
                            else{
                                ui.click.cancel();
                            }
                        }
                    }
                    else if(event.skill&&!event.norestore){
                        var skill=event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        var info=get.info(skill);
                        if(info.sourceSkill){
                            event._aiexclude.add(info.sourceSkill);
                        }
                        event.redo();
                        game.resume();
                    }
                    else{
                        ui.click.cancel();
                    }
                    if(event.aidelay&&event.result&&event.result.bool){
                        game.delayx();
                    }
                }
                "step 2"
                event.resume();
                if(event.result){
                    if(event.result._sendskill){
                        lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
                    }
                    if(event.result.skill){
                        var info=get.info(event.result.skill);
                        if(info&&info.chooseButton){
                            if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
                            var dialog=info.chooseButton.dialog(event,player);
                            if(info.chooseButton.chooseControl){
                                var next=player.chooseControl(info.chooseButton.chooseControl(event,player));
                                if(dialog.direct) next.direct=true;
                                if(dialog.forceDirect) next.forceDirect=true;
                                next.dialog=dialog;
                                next.set('ai',info.chooseButton.check||function(){return 0;});
                            }
                            else{
                                var next=player.chooseButton(dialog);
                                if(dialog.direct) next.direct=true;
                                if(dialog.forceDirect) next.forceDirect=true;
                                next.set('ai',info.chooseButton.check||function(){return 1;});
                                next.set('filterButton',info.chooseButton.filter||function(){return true;});
                                next.set('selectButton',info.chooseButton.select||1);
                            }
                            event.buttoned=event.result.skill;
                        }
                        else if(info&&info.precontent&&!game.online){
                            var next=game.createEvent('pre_'+event.result.skill);
                            next.setContent(info.precontent);
                            next.set('result',event.result);
                            next.set('player',player);
                        }
                    }
                }
                "step 3"
                if(event.buttoned){
                    if(result.bool||result.control&&result.control!='cancel2'){
                        var info=get.info(event.buttoned).chooseButton;
                        lib.skill[event.buttoned+'_backup']=info.backup(info.chooseControl?result:result.links,player);
                        lib.skill[event.buttoned+'_backup'].sourceSkill=event.buttoned;
                        if(game.online){
                            event._sendskill=[event.buttoned+'_backup',lib.skill[event.buttoned+'_backup']];
                        }
                        event.backup(event.buttoned+'_backup');
                        if(info.prompt){
                            event.openskilldialog=info.prompt(info.chooseControl?result:result.links,player);
                        }
                    }
                    else{
                        ui.control.animate('nozoom',100);
                        event._aiexclude.add(event.buttoned);
                    }
                    event.goto(0);
                    delete event.buttoned;
                }
                "step 4"
                delete _status.noclearcountdown;
                if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
                    event.skillDialog.close();
                }
                if(event.result.bool&&!game.online){
                    if(event.result._sendskill){
                        lib.skill[event.result._sendskill[0]]=event.result._sendskill[1];
                    }
                    var info=get.info(event.result.skill);
                    if(event.onresult){
                        event.onresult(event.result);
                    }
                    if(event.result.skill){
                        if(info.direct&&!info.clearTime){
                            _status.noclearcountdown=true;
                        }
                    }
                    if(event.logSkill){
                        if(typeof event.logSkill=='string'){
                            player.logSkill(event.logSkill);
                        }
                        else if(Array.isArray(event.logSkill)){
                            player.logSkill.apply(player,event.logSkill);
                        }
                    }
                    if(!event.result.card&&event.result.skill){
                        event.result.used=event.result.skill;
                        player.useSkill(event.result.skill,event.result.cards,event.result.targets);
                    }
                    else{
                        if(info&&info.prerespond){
                            info.prerespond(event.result,player);
                        }
                        var next=player.respond(event.result.cards,event.result.card,event.animate,event.result.skill,event.source);
                        if(event.result.noanimate) next.animate=false;
                        if(event.parent.card&&event.parent.type=='card'){
                            next.set('respondTo',[event.parent.player,event.parent.card]);
                        }
                        if(event.noOrdering) next.noOrdering=true;
                    }
                }
                else if(event._sendskill){
                    event.result._sendskill=event._sendskill;
                }
                if(event.dialog&&event.dialog.close) event.dialog.close();
                if(!_status.noclearcountdown){
                    game.stopCountChoose();
                }
            },
            chooseToDiscard:function(){
                "step 0"
                if(event.autochoose()){
                    event.result={
                        bool:true,
                        autochoose:true,
                        cards:player.getCards(event.position),
                        rawcards:player.getCards(event.position),
                    }
                    for(var i=0;i<event.result.cards.length;i++){
                        if(!lib.filter.cardDiscardable(event.result.cards[i],player,event)){
                            event.result.cards.splice(i--,1);
                        }
                    }
                }
                else{
                    // &&!lib.filter.wuxieSwap(trigger)
                    if(game.modeSwapPlayer&&!_status.auto&&player.isUnderControl()){
                        game.modeSwapPlayer(player);
                    }
                    event.rangecards=player.getCards(event.position);
                    for(var i=0;i<event.rangecards.length;i++){
                        if(lib.filter.cardDiscardable(event.rangecards[i],player,event)){
                            event.rangecards.splice(i--,1);
                        }
                        else{
                            event.rangecards[i].uncheck('chooseToDiscard');
                        }
                    }
                    var range=get.select(event.selectCard);
                    if(event.isMine()){
                        game.check();
                        if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                            ui.click.cancel();
                            return;
                        }
                        game.pause();
                        if(range[1]>1&&typeof event.selectCard!='function'){
                            event.promptdiscard=ui.create.control('AI代选',function(){
                                ai.basic.chooseCard(event.ai);
                                if(_status.event.custom&&_status.event.custom.add.card){
                                    _status.event.custom.add.card();
                                }
                                for(var i=0;i<ui.selected.cards.length;i++){
                                    ui.selected.cards[i].updateTransform(true);
                                }
                            });
                        }
                        if(Array.isArray(event.dialog)){
                            event.dialog=ui.create.dialog.apply(this,event.dialog);
                            event.dialog.open();
                            event.dialog.classList.add('noselect');
                        }
                        else if(event.prompt!=false){
                            var str;
                            if(typeof(event.prompt)=='string') str=event.prompt;
                            else{
                                str='请弃置';
                                if(range[0]==range[1]) str+=get.cnNumber(range[0]);
                                else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
                                else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
                                str+='张';
                                if(event.position=='h'||event.position==undefined) str+='手';
                                if(event.position=='e') str+='装备';
                                str+='牌';
                            }
                            event.dialog=ui.create.dialog(str);
                            if(event.prompt2){
                                event.dialog.addText(event.prompt2,event.prompt2.length<=20);
                            }
                            if(Array.isArray(event.selectCard)){
                                event.promptbar=event.dialog.add('0/'+get.numStr(event.selectCard[1],'card'));
                                event.custom.add.card=function(){
                                    _status.event.promptbar.innerHTML=
                                    ui.selected.cards.length+'/'+get.numStr(_status.event.selectCard[1],'card');
                                }
                            }
                        }
                        else if(get.itemtype(event.dialog)=='dialog'){
                            event.dialog.style.display='';
                            event.dialog.open();
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseCard(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
                        ui.click.ok();
                    }
                    else if(event.skill){
                        var skill=event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        event.redo();
                        game.resume();
                    }
                    else{
                        ui.click.cancel();
                    }
                }
                if(event.rangecards){
                    for(var i=0;i<event.rangecards.length;i++){
                        event.rangecards[i].recheck('chooseToDiscard');
                    }
                }
                "step 2"
                event.resume();
                if(event.promptdiscard){
                    event.promptdiscard.close();
                }
                "step 3"
                if(event.result.bool&&event.result.cards&&event.result.cards.length&&
                    !game.online&&event.autodelay&&!event.isMine()){
                    if(typeof event.autodelay=='number'){
                        game.delayx(event.autodelay);
                    }
                    else{
                        game.delayx();
                    }
                }
                "step 4"
                if(event.logSkill&&event.result.bool&&!game.online){
                    if(typeof event.logSkill=='string'){
                        player.logSkill(event.logSkill);
                    }
                    else if(Array.isArray(event.logSkill)){
                        player.logSkill.apply(player,event.logSkill);
                    }
                }
                if(!game.online){
                    if(typeof event.delay=='boolean'){
                        event.done=player.discard(event.result.cards).set('delay',event.delay);
                    }
                    else{
                        event.done=player.discard(event.result.cards);
                    }
                    event.done.discarder=player;
                }
                if(event.dialog&&event.dialog.close) event.dialog.close();
            },
            gaincardMultiple:function(){
                'step 0'
                event.type='gain';
                if(event.animate=='give'||event.animate=='gain2') event.visible=true;
                if(player&&cards){
                    event._lose=true;
                    player.lose(cards,ui.special).set('type','gain').set('forceDie',true).set('getlx',false);
                }
                'step 1'
                switch(event.animate){
                    case 'draw':
                        game.delay(0,get.delayx(500,500));
                        for(var i of event.gain_list){
                            if(get.itemtype(i[1])=='card') i[1]=[i[1]];
                            if(event._lose){
                                i[1]=i[1].filter(card=>{
                                    return !cards.contains(card)||!player.getCards('hejsx').contains(card);
                                })
                            }
                            if(i[1].length>0) i[0].$draw(i[1].length);
                        }
                        break;
                    case 'gain':
                        game.delay(0,get.delayx(700,700));
                        for(var i of event.gain_list){
                            if(get.itemtype(i[1])=='card') i[1]=[i[1]];
                            if(event._lose){
                                i[1]=i[1].filter(card=>{
                                    return !cards.contains(card)||!player.getCards('hejsx').contains(card);
                                })
                            }
                            if(i[1].length>0) i[0].$gain(i[1].length);
                        }
                        break;
                    case 'gain2': case 'draw2':
                        game.delay(0,get.delayx(500,500));
                        for(var i of event.gain_list){
                            if(get.itemtype(i[1])=='card') i[1]=[i[1]];
                            if(event._lose){
                                i[1]=i[1].filter(card=>{
                                    return !cards.contains(card)||!player.getCards('hejsx').contains(card);
                                })
                            }
                            if(i[1].length>0) i[0].$gain2(i[1]);
                        }
                        break;
                    case 'give': case 'giveAuto':
                        if(!player) break;
                        var evt=event.getl(player);
                        game.delay(0,get.delayx(500,500));
                        for(var i of event.gain_list){
                            if(get.itemtype(i[1])=='card') i[1]=[i[1]];
                            if(event._lose){
                                i[1]=i[1].filter(card=>{
                                    return !cards.contains(card)||!player.getCards('hejsx').contains(card);
                                })
                            }
                            var shown=i[1].slice(0),hidden=[];
                            if(event.animate=='giveAuto'){
                                for(var card of i[1]){
                                    if(evt.hs.contains(card)){
                                        shown.remove(card);
                                        hidden.push(card);
                                    }
                                }
                            }
                            if(shown.length>0) player.$give(shown,i[0]);
                            if(hidden.length>0) player.$giveAuto(hidden,i[0]);
                        }
                        break;
                    default:
                        event.finish();
                }
                for(var i of event.gain_list){
                    if(i[1].length>0){
                        var next=i[0].gain(i[1]);
                        next.getlx=false;
                        if(event.visible) next.visible=true;
                        if(event.giver) next.giver=event.giver;
                        if(event.gaintag) next.gaintag.addArray(event.gaintag);
                    }
                }
                'step 2'
                game.delayx();
            },
            discardMultiple:function(){
                'step 0'
                event.type='discard';
                event.visible=true;
                if(!event.position) event.position=ui.discardPile;
                var cards=[];
                event.cards=cards;
                for(var i=0;i<event.lose_list.length;i++){
                    var next=event.lose_list[i][0].lose(event.lose_list[i][1],event.position);
                    game.log(event.lose_list[i][0],'弃置了',event.lose_list[i][1]);
                    next.type='discard';
                    next.animate=false;
                    next.delay=false;
                    cards.addArray(event.lose_list[i][1]);
                    next.getlx=false;
                }
                var evt=event;
                if(evt.animate!=false){
                    evt.discardid=lib.status.videoId++;
                    game.broadcastAll(function(list,id,cards){
                        for(var i of list){
                            for(var j of i[1]){
                                j.classList.remove('glow');
                                j.classList.remove('glows');
                            }
                            i[0].$throw(i[1],null,'nobroadcast');
                        }
                        var cardnodes=[];
                        cardnodes._discardtime=get.time();
                        for(var ix of list){
                            var card=ix[1];
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].clone){
                                    cardnodes.push(cards[i].clone);
                                }
                            }
                        }
                        ui.todiscard[id]=cardnodes;
                    },event.lose_list,evt.discardid,cards);
                    if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
                        if(evt.delay!=false){
                            var waitingForTransition=get.time();
                            evt.waitingForTransition=waitingForTransition;
                            cards[0].clone.listenTransition(function(){
                                if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                    game.resume();
                                }
                                delete evt.waitingForTransition;
                            });
                        }
                        else if(evt.getParent().discardTransition){
                            delete evt.getParent().discardTransition;
                            var waitingForTransition=get.time();
                            evt.getParent().waitingForTransition=waitingForTransition;
                            cards[0].clone.listenTransition(function(){
                                if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                    game.resume();
                                }
                                delete evt.getParent().waitingForTransition;
                            });
                        }
                    }
                }
                'step 1'
                if(event.delay!=false){
                    if(event.waitingForTransition){
                        _status.waitingForTransition=event.waitingForTransition;
                        game.pause();
                    }
                    else{
                        game.delayx();
                    }
                }
            },
            chooseToCompareLose:function(){
                for(var i=0;i<event.lose_list.length;i++){
                    var next=event.lose_list[i][0].lose(event.lose_list[i][1],ui.ordering);
                    next.relatedEvent=event.getParent();
                    next.getlx=false;
                }
            },
            chooseToCompareMeanwhile:function(){
                'step 0'
                if(player.countCards('h')==0){
                    event.result={cancelled:true,bool:false}
                    event.finish();
                    return;
                }
                for(var i=0; i<targets.length; i++){
                    if(targets[i].countCards('h')==0){
                        event.result={cancelled:true,bool:false}
                        event.finish();
                        return;
                    }
                }
                if(!event.multitarget){
                    targets.sort(lib.sort.seat);
                }
                game.log(player,'对',targets,'发起了共同拼点');
                event.compareMeanwhile=true;
                'step 1'
                event._result=[];
                event.list=targets.filter(function(current){
                    return !event.fixedResult||!event.fixedResult[current.playerid];
                });
                if(event.list.length||!event.fixedResult||!event.fixedResult[player.playerid]){
                    if(!event.fixedResult||!event.fixedResult[player.playerid]) event.list.unshift(player);
                    player.chooseCardOL(event.list,'请选择拼点牌',true).set('type','compare').set('ai',event.ai).set('source',player).aiCard=function(target){
                        var hs=target.getCards('h');
                        var event=_status.event;
                        event.player=target;
                        hs.sort(function(a,b){
                            return event.ai(b)-event.ai(a);
                        });
                        delete event.player;
                        return {bool:true,cards:[hs[0]]};
                    };
                }
                'step 2'
                var cards=[];
                var lose_list=[];
                if(event.fixedResult&&event.fixedResult[player.playerid]){
                    event.list.unshift(player);
                    result.unshift({bool:true,cards:[event.fixedResult[player.playerid]]});
                    lose_list.push([player,[event.fixedResult[player.playerid]]]);
                }
                else{
                    if(result[0].skill&&lib.skill[result[0].skill]&&lib.skill[result[0].skill].onCompare){
                        player.logSkill(result[0].skill);
                        result[0].cards=lib.skill[result[0].skill].onCompare(player)
                    }
                    else lose_list.push([player,result[0].cards]);
                };
                for(var j=0; j<targets.length; j++){
                    if(event.list.contains(targets[j])){
                        var i=event.list.indexOf(targets[j]);
                        if(result[i].skill&&lib.skill[result[i].skill]&&lib.skill[result[i].skill].onCompare){
                            event.list[i].logSkill(result[i].skill);
                            result[i].cards=lib.skill[result[i].skill].onCompare(event.list[i]);
                        }
                        else lose_list.push([targets[j],result[i].cards]);
                        cards.push(result[i].cards[0]);
                    }
                    else if(event.fixedResult&&event.fixedResult[targets[j].playerid]){
                        cards.push(event.fixedResult[targets[j].playerid]);
                        lose_list.push([targets[j],[event.fixedResult[targets[j].playerid]]]);
                    }
                }
                if(lose_list.length){
                    game.loseAsync({
                        lose_list:lose_list,
                    }).setContent('chooseToCompareLose');
                }
                event.lose_list=lose_list;
                event.getNum=function(card){
                    for(var i of event.lose_list){
                        if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
                    }
                    return get.number(card,false);
                }
                event.cardlist=cards;
                event.cards=cards;
                event.card1=result[0].cards[0];
                event.num1=event.getNum(event.card1);
                event.iwhile=0;
                event.winner=null;
                event.maxNum=-1;
                event.tempplayer=event.player;
                event.result={
                    winner:null,
                    player:event.card1,
                    targets:event.cardlist.slice(0),
                    num1:[],
                    num2:[],
                };
                'step 3'
                event.trigger('compareCardShowBefore');
                'step 4'
                player.$compareMultiple(event.card1,targets,cards);
                game.log(player,'的拼点牌为',event.card1);
                player.animate('target');
                game.delay(0,1000);
                'step 5'
                event.target=null;
                event.trigger('compare');
                'step 6'
                if(event.iwhile<targets.length){
                    event.target=targets[event.iwhile];
                    event.target.animate('target');
                    event.card2=event.cardlist[event.iwhile];
                    event.num2=event.getNum(event.card2);
                    game.log(event.target,'的拼点牌为',event.card2);
                    //event.tempplayer.line(event.target);
                    delete event.player;
                    event.trigger('compare');
                }
                else{
                    game.delay(0,1000);
                    event.goto(9);
                }
                'step 7'
                event.result.num1[event.iwhile]=event.num1;
                event.result.num2[event.iwhile]=event.num2;
                var list=[[event.tempplayer,event.num1],[event.target,event.num2]];
                for(var i of list){
                    if(i[1]>event.maxNum){
                        event.maxNum=i[1];
                        event.winner=i[0];
                    }
                    else if(event.winner&&i[1]==event.maxNum&&i[0]!=event.winner){
                        event.winner=null;
                    }
                }
                'step 8'
                event.iwhile++;
                event.goto(6);
                'step 9'
                var player=event.tempplayer;
                event.player=player;
                delete event.tempplayer;
                var str='无人拼点成功';
                if(event.winner){
                    event.result.winner=event.winner;
                    str=get.translation(event.winner)+'拼点成功';
                    game.log(event.winner,'拼点成功');
                    event.winner.popup('胜');
                } else game.log('#b无人','拼点成功');
                var list=[player].addArray(targets);
                list.remove(event.winner);
                for(var i of list){
                    i.popup('负');
                }
                if(str){
                    game.broadcastAll(function(str){
                        var dialog=ui.create.dialog(str);
                        dialog.classList.add('center');
                        setTimeout(function(){
                            dialog.close();
                        },1000);
                    },str);
                }
                game.delay(3);
                'step 10'
                game.broadcastAll(ui.clear);
                'step 11'
                event.cards.add(event.card1);
            },
            chooseToCompareMultiple:function(){
                "step 0"
                if(player.countCards('h')==0){
                    event.result={cancelled:true,bool:false}
                    event.finish();
                    return;
                }
                for(var i=0;i<targets.length;i++){
                    if(targets[i].countCards('h')==0){
                        event.result={cancelled:true,bool:false}
                        event.finish();
                        return;
                    }
                }
                if(!event.multitarget){
                    targets.sort(lib.sort.seat);
                }
                game.log(player,'对',targets,'发起拼点');
                "step 1"
                event._result=[];
                event.list=targets.filter(function(current){
                    return !event.fixedResult||!event.fixedResult[current.playerid];
                });
                if(event.list.length||!event.fixedResult||!event.fixedResult[player.playerid]){
                    if(!event.fixedResult||!event.fixedResult[player.playerid]) event.list.unshift(player);
                    player.chooseCardOL(event.list,'请选择拼点牌',true).set('type','compare').set('ai',event.ai).set('source',player).aiCard=function(target){
                        var hs=target.getCards('h');
                        var event=_status.event;
                        event.player=target;
                        hs.sort(function(a,b){
                            return event.ai(b)-event.ai(a);
                        });
                        delete event.player;
                        return {bool:true,cards:[hs[0]]};
                    };
                }
                "step 2"
                var cards=[];
                var lose_list=[];
                if(event.fixedResult&&event.fixedResult[player.playerid]){
                    event.list.unshift(player);
                    result.unshift({bool:true,cards:[event.fixedResult[player.playerid]]});
                    lose_list.push([player,[event.fixedResult[player.playerid]]]);
                }
                else{
                    if(result[0].skill&&lib.skill[result[0].skill]&&lib.skill[result[0].skill].onCompare){
                        player.logSkill(result[0].skill);
                        result[0].cards=lib.skill[result[0].skill].onCompare(player)
                    }
                    else lose_list.push([player,result[0].cards]);
                };
                for(var j=0;j<targets.length;j++){
                    if(event.list.contains(targets[j])){
                        var i=event.list.indexOf(targets[j]);
                        if(result[i].skill&&lib.skill[result[i].skill]&&lib.skill[result[i].skill].onCompare){
                            event.list[i].logSkill(result[i].skill);
                            result[i].cards=lib.skill[result[i].skill].onCompare(event.list[i]);
                        }
                        else lose_list.push([targets[j],result[i].cards]);
                        cards.push(result[i].cards[0]);
                    }
                    else if(event.fixedResult&&event.fixedResult[targets[j].playerid]){
                        cards.push(event.fixedResult[targets[j].playerid]);
                        lose_list.push([targets[j],[event.fixedResult[targets[j].playerid]]]);
                    }
                }
                if(lose_list.length){
                    game.loseAsync({
                        lose_list:lose_list,
                    }).setContent('chooseToCompareLose');
                }
                event.lose_list=lose_list;
                event.getNum=function(card){
                    for(var i of event.lose_list){
                        if(i[1].contains&&i[1].contains(card)) return get.number(card,i[0]);
                    }
                    return get.number(card,false);
                }
                event.cardlist=cards;
                event.cards=cards;
                event.card1=result[0].cards[0];
                event.num1=event.getNum(event.card1);
                event.iwhile=0;
                event.result={
                    player:event.card1,
                    targets:event.cardlist.slice(0),
                    num1:[],
                    num2:[],
                };
                "step 3"
                event.trigger('compareCardShowBefore');
                "step 4"
                game.log(player,'的拼点牌为',event.card1);
                "step 5"
                if(event.iwhile<targets.length){
                    event.target=targets[event.iwhile];
                    event.target.animate('target');
                    player.animate('target');
                    event.card2=event.cardlist[event.iwhile];
                    event.num2=event.getNum(event.card2);
                    game.log(event.target,'的拼点牌为',event.card2);
                    player.line(event.target);
                    player.$compare(event.card1,event.target,event.card2);
                    event.trigger('compare');
                    game.delay(0,1500);
                }
                else{
                    event.goto(9);
                }
                "step 6"
                event.result.num1[event.iwhile]=event.num1;
                event.result.num2[event.iwhile]=event.num2;
                var str;
                if(event.num1>event.num2){
                    str=get.translation(player)+'拼点成功';
                    player.popup('胜');
                    target.popup('负');
                }
                else{
                    str=get.translation(player)+'拼点失败';
                    if(event.num1==event.num2){
                        player.popup('平');
                        target.popup('平');
                    }
                    else{
                        player.popup('负');
                        target.popup('胜');
                    }
                }
                game.broadcastAll(function(str){
                    var dialog=ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function(){
                        dialog.close();
                    },1000);
                },str);
                game.delay(2);
                "step 7"
                if(event.callback){
                    game.broadcastAll(function(card1,card2){
                        if(card1.clone) card1.clone.style.opacity=0.5;
                        if(card2.clone) card2.clone.style.opacity=0.5;
                    },event.card1,event.card2);
                    var next=game.createEvent('compareMultiple');
                    next.player=player;
                    next.target=event.target;
                    next.card1=event.card1;
                    next.card2=event.card2;
                    next.num1=event.num1;
                    next.num2=event.num2;
                    next.setContent(event.callback);
                    event.compareMultiple=true;
                }
                "step 8"
                game.broadcastAll(ui.clear);
                event.iwhile++;
                event.goto(5);
                "step 9"
                event.cards.add(event.card1);
            },
            chooseToCompare:function(){
                "step 0"
                if(((!event.fixedResult||!event.fixedResult[player.playerid])&&player.countCards('h')==0)||((!event.fixedResult||!event.fixedResult[target.playerid])&&target.countCards('h')==0)){
                    event.result={cancelled:true,bool:false}
                    event.finish();
                    return;
                }
                game.log(player,'对',target,'发起拼点');
                event.lose_list=[];
                "step 1"
                var sendback=function(){
                    if(_status.event!=event){
                        return function(){
                            event.resultOL=_status.event.resultOL;
                        };
                    }
                };
                if(event.fixedResult&&event.fixedResult[player.playerid]){
                    event.card1=event.fixedResult[player.playerid];
                    event.lose_list.push([player,event.card1]);
                }
                else if(player.isOnline()){
                    player.wait(sendback);
                    event.ol=true;
                    player.send(function(ai){
                        game.me.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=ai;
                        game.resume();
                    },event.ai);
                }
                else{
                    event.localPlayer=true;
                    player.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=event.ai;
                }
                if(event.fixedResult&&event.fixedResult[target.playerid]){
                    event.card2=event.fixedResult[target.playerid];
                    event.lose_list.push([target,event.card2]);
                }
                else if(target.isOnline()){
                    target.wait(sendback);
                    event.ol=true;
                    target.send(function(ai){
                        game.me.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=ai;
                        game.resume();
                    },event.ai);
                }
                else{
                    event.localTarget=true;
                }
                "step 2"
                if(event.localPlayer){
                    if(result.skill&&lib.skill[result.skill]&&lib.skill[result.skill].onCompare){
                        result.cards=lib.skill[result.skill].onCompare(player);
                        player.logSkill(result.skill);
                    }
                    else event.lose_list.push([player,result.cards[0]]);
                    event.card1=result.cards[0];
                }
                if(event.localTarget){
                    target.chooseCard('请选择拼点牌',true).set('type','compare').set('glow_result',true).ai=event.ai;
                }
                "step 3"
                if(event.localTarget){
                    if(result.skill&&lib.skill[result.skill]&&lib.skill[result.skill].onCompare){
                        target.logSkill(result.skill);
                        result.cards=lib.skill[result.skill].onCompare(target);
                    }
                    else event.lose_list.push([target,result.cards[0]]);
                    event.card2=result.cards[0];
                }
                if(!event.resultOL&&event.ol){
                    game.pause();
                }
                "step 4"
                try{
                    if(!event.card1){
                        if(event.resultOL[player.playerid].skill&&lib.skill[event.resultOL[player.playerid].skill]&&lib.skill[event.resultOL[player.playerid].skill].onCompare){
                            player.logSkill(event.resultOL[player.playerid].skill);
                            event.resultOL[player.playerid].cards=lib.skill[event.resultOL[player.playerid].skill].onCompare(player);
                        }
                        else event.lose_list.push([player,event.resultOL[player.playerid].cards[0]]);
                        event.card1=event.resultOL[player.playerid].cards[0];
                    };
                    if(!event.card2){
                        if(event.resultOL[target.playerid].skill&&lib.skill[event.resultOL[target.playerid].skill]&&lib.skill[event.resultOL[target.playerid].skill].onCompare){
                            target.logSkill(event.resultOL[target.playerid].skill);
                            event.resultOL[target.playerid].cards=lib.skill[event.resultOL[target.playerid].skill].onCompare(player);
                        }
                        else event.lose_list.push([target,event.resultOL[target.playerid].cards[0]]);
                        event.card2=event.resultOL[target.playerid].cards[0];
                    }
                    if(!event.card1||!event.card2){
                        throw('err');
                    }
                }
                catch(e){
                    console.log(e);
                    game.print(e);
                    event.finish();
                    return;
                }
                if(event.card2.number>=10||event.card2.number<=4){
                    if(target.countCards('h')>2){
                        event.addToAI=true;
                    }
                }
                if(event.lose_list.length){
                    game.loseAsync({
                        lose_list:event.lose_list,
                    }).setContent('chooseToCompareLose');
                }
                "step 5"
                event.trigger('compareCardShowBefore');
                "step 6"
                game.broadcast(function(){
                    ui.arena.classList.add('thrownhighlight');
                });
                ui.arena.classList.add('thrownhighlight');
                game.addVideo('thrownhighlight1');
                player.$compare(event.card1,target,event.card2);
                game.log(player,'的拼点牌为',event.card1);
                game.log(target,'的拼点牌为',event.card2);
                var getNum=function(card){
                    for(var i of event.lose_list){
                        if(i[1]==card) return get.number(card,i[0]);
                    }
                    return get.number(card,false);
                }
                event.num1=getNum(event.card1);
                event.num2=getNum(event.card2);
                event.trigger('compare');
                game.delay(0,1500);
                "step 7"
                event.result={
                    player:event.card1,
                    target:event.card2,
                    num1:event.num1,
                    num2:event.num2
                }
                var str;
                if(event.num1>event.num2){
                    event.result.bool=true;
                    event.result.winner=player;
                    str=get.translation(player)+'拼点成功';
                    player.popup('胜');
                    target.popup('负');
                }
                else{
                    event.result.bool=false;
                    str=get.translation(player)+'拼点失败';
                    if(event.num1==event.num2){
                        event.result.tie=true;
                        player.popup('平');
                        target.popup('平');
                    }
                    else{
                        event.result.winner=target;
                        player.popup('负');
                        target.popup('胜');
                    }
                }
                game.broadcastAll(function(str){
                    var dialog=ui.create.dialog(str);
                    dialog.classList.add('center');
                    setTimeout(function(){
                        dialog.close();
                    },1000);
                },str);
                game.delay(2);
                "step 8"
                if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
                    event.target.ai.shown+=0.1;
                }
                game.broadcastAll(function(){
                    ui.arena.classList.remove('thrownhighlight');
                });
                game.addVideo('thrownhighlight2');
                if(event.clear!==false){
                    game.broadcastAll(ui.clear);
                }
                if(typeof event.preserve=='function'){
                    event.preserve=event.preserve(event.result);
                }
                else if(event.preserve=='win'){
                    event.preserve=event.result.bool;
                }
                else if(event.preserve=='lose'){
                    event.preserve=!event.result.bool;
                }
            },
            chooseSkill:function(){
                'step 0'
                var list;
                if(typeof event.target=='string'){
                    list=get.gainableSkillsName(event.target,event.func);
                }
                else{
                    list=event.target.getGainableSkills(event.func);
                }
                if(!list.length){
                    event.finish();
                    event.result={bool:false};
                    return;
                }
                event.skillai=function(list){
                    return get.max(list,get.skillRank,'item');
                };
                if(event.isMine()){
                    var dialog=ui.create.dialog('forcebutton');
                    dialog.add(event.prompt||'选择获得一项技能');
                    _status.event.list=list;
                    var clickItem=function(){
                        _status.event._result=this.link;
                        game.resume();
                    };
                    for(i=0;i<list.length;i++){
                        if(lib.translate[list[i]+'_info']){
                            var translation=get.translation(list[i]);
                            if(translation[0]=='新'&&translation.length==3){
                                translation=translation.slice(1,3);
                            }
                            else{
                                translation=translation.slice(0,2);
                            }
                            var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                            translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                            item.firstChild.addEventListener('click',clickItem);
                            item.firstChild.link=list[i];
                        }
                    }
                    dialog.add(ui.create.div('.placeholder'));
                    event.dialog=dialog;
                    event.switchToAuto=function(){
                        event._result=event.skillai(event.list);
                        game.resume();
                    };
                    _status.imchoosing=true;
                    game.pause();
                }
                else{
                    event._result=event.skillai(list);
                }
                'step 1'
                _status.imchoosing=false;
                if(event.dialog){
                    event.dialog.close();
                }
                event.result={bool:true,skill:result};
            },
            discoverCard:function(){
                'step 0'
                var num=event.num||3;
                var choice;
                if(typeof event.list=='string'||typeof event.list=='function'){
                    choice=get.inpile(event.list).randomGets(num);
                }
                else if(Array.isArray(event.list)){
                    choice=event.list.randomGets(num);
                }
                else{
                    choice=Array.from(event.list).randomGets(num);
                }
                if(choice.length){
                    var prompt=event.prompt;
                    if(!prompt){
                        prompt='选择一张牌';
                        if(event.use){
                            prompt+='使用之';
                        }
                        else if(!event.nogain){
                            prompt+='获得之';
                        }
                    }
                    if(typeof choice[0]==='string'){
                        var next=player.chooseVCardButton(choice,prompt,event.forced);
                        if(event.ai){
                            next.set('ai',event.ai);
                        }
                    }
                    else if(get.itemtype(choice[0])=='card'){
                        var next=player.chooseCardButton(choice,prompt,event.forced);
                        if(event.ai){
                            next.set('ai',event.ai);
                        }
                    }
                    else{
                        event.finish();
                    }
                }
                else{
                    event.finish();
                }
                'step 1'
                event.result={
                    bool:result.bool,
                    card:null,
                    choice:null
                };
                if(result.bool&&result.links.length){
                    var link=result.links[0];
                    var togain=null;
                    if(get.itemtype(link)=='card'){
                        event.result.card=link;
                        togain=link;
                    }
                    else if(Array.isArray(link)){
                        event.result.choice=link[2];
                        togain=game.createCard(link[2]);
                    }
                    if(togain){
                        if(event.use){
                            player.chooseUseTarget(togain);
                        }
                        else if(!event.nogain){
                            player.gain(togain,'draw');
                            game.log(player,'获得了一张牌');
                        }
                    }
                }
            },
            chooseButton:function(){
                "step 0"
                if(typeof event.dialog=='number'){
                    event.dialog=get.idDialog(event.dialog);
                }
                if(event.createDialog&&!event.dialog){
                    if(Array.isArray(event.createDialog)){
                        event.createDialog.add('hidden');
                        event.dialog=ui.create.dialog.apply(this,event.createDialog);
                    }
                    event.closeDialog=true;
                }
                if(event.dialog==undefined) event.dialog=ui.dialog;
                if(event.isMine()||event.dialogdisplay){
                    event.dialog.style.display='';
                    event.dialog.open();
                }
                var filterButton=event.filterButton||function(){return true};
                var selectButton=get.select(event.selectButton);
                var buttons=event.dialog.buttons;
                var buttonsx=[];
                var num=0;
                for(var i=0;i<buttons.length;i++){
                    var button=buttons[i];
                    if(filterButton(button,player)){
                        num++;
                        buttonsx.add(button);
                    }
                }
                if(event.isMine()){
                    if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                        ui.click.cancel();
                        return;
                    }
                    else if(event.direct&&num==selectButton[0]||event.forceDirect){
                        var buttons=buttonsx.slice(0,num);
                        event.result={
                            bool:true,
                            button:[buttons],
                            links:get.links(buttons),
                        };
                        event.dialog.close();
                    }
                    else{
                        game.check();
                        game.pause();
                    }
                }
                else if(event.isOnline()){
                    if(event.direct&&num==1||event.forceDirect){
                        var buttons=buttonsx.slice(0,num);
                        event.result={
                            bool:true,
                            button:[buttons],
                            links:get.links(buttons),
                        };
                        event.dialog.close();
                    }
                    else{
                        event.send();
                    }
                    delete event.callback;
                }
                else{
                    event.result='ai';
                }
                if(event.onfree){
                    lib.init.onfree();
                }
                "step 1"
                if(event.result=='ai'){
                    if(event.processAI){
                        event.result=event.processAI();
                    }
                    else{
                        game.check();
                        if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
                        else ui.click.cancel();
                    }
                }
                if(event.closeDialog){
                    event.dialog.close();
                }
                if(event.callback){
                    event.callback(event.player,event.result);
                }
                event.resume();
            },
            chooseCardOL:function(){
                'step 0'
                event.targets=event.list.slice(0);
                if(!_status.connectMode){
                    event.result=[];
                    event.goto(7);
                }
                else{
                    for(var i=0;i<event.list.length;i++){
                        var target=event.list[i];
                        target.wait();
                        if(target.isOnline()){
                            target.send(function(args,set){
                                game.me.chooseCard.apply(game.me,args).set(set);
                                game.resume();
                            },event._args,event._set);
                            event.list.splice(i--,1);
                        }
                        else if(target==game.me){
                            event.withme=true;
                            event.list.splice(i--,1);
                        }
                    }
                }
                'step 1'
                if(event.list.length){
                    event.target=event.list.shift();
                    event.target.chooseCard.apply(event.target,event._args).set(event._set);
                }
                else{
                    event.goto(3);
                }
                'step 2'
                event.target.unwait(result);
                event.goto(1);
                'step 3'
                if(event.withme){
                    game.me.chooseCard.apply(game.me,event._args).set(event._set);
                }
                else{
                    event.goto(5);
                }
                'step 4'
                game.me.unwait(result);
                'step 5'
                if(!event.resultOL){
                    game.pause();
                }
                'step 6'
                event.result=[];
                for(var i=0;i<event.targets.length;i++){
                    event.result[i]=event.resultOL[event.targets[i].playerid]||{};
                    if(event.result[i]=='ai'&&event.aiCard){
                        event.result[i]=event.aiCard(event.targets[i]);
                    }
                }
                event.finish();
                'step 7'
                if(event.list.length){
                    event.target=event.list.shift();
                    event.target.chooseCard.apply(event.target,event._args).set(event._set);
                }
                else{
                    for(var i=0;i<event.targets.length;i++){
                        if(!event.result[i]){
                            event.result[i]={};
                        }
                    }
                    event.finish();
                }
                'step 8'
                event.result[event.targets.indexOf(event.target)]=result;
                event.goto(7);
            },
            chooseButtonOL:function(){
                'step 0'
                //ui.arena.classList.add('markhidden');
                for(var i=0;i<event.list.length;i++){
                    var current=event.list[i];
                    current[0].wait();
                    if(current[0].isOnline()){
                        var target=current.shift();
                        target.send(function(args,callback,switchToAuto,processAI){
                            //ui.arena.classList.add('markhidden');
                            var next=game.me.chooseButton.apply(game.me,args);
                            next.callback=callback;
                            next.switchToAuto=switchToAuto;
                            next.processAI=processAI;
                            next.complexSelect=true;
                            game.resume();
                        },current,event.callback,event.switchToAuto,event.processAI);
                        target._choose_button_ol=current;
                        event.list.splice(i--,1);
                    }
                    else if(current[0]==game.me){
                        event.last=current;
                        event.last.shift();
                        event.list.splice(i--,1);
                    }
                }
                'step 1'
                if(event.list.length){
                    var current=event.list.shift();
                    event.target=current.shift();
                    var next=event.target.chooseButton.apply(event.target,current);
                    next.callback=event.callback;
                    next.switchToAuto=event.switchToAuto;
                    next.processAI=event.processAI;
                }
                else{
                    event.goto(3);
                }
                'step 2'
                event.target.unwait(result);
                event.goto(1);
                'step 3'
                if(event.last){
                    var next=game.me.chooseButton.apply(game.me,event.last);
                    next.callback=event.callback;
                    next.switchToAuto=event.switchToAuto;
                    next.processAI=event.processAI;
                }
                else{
                    event.goto(5);
                }
                'step 4'
                game.me.unwait(result);
                'step 5'
                if(!event.resultOL){
                    game.pause();
                }
                'step 6'
                /*game.broadcastAll(function(){
                    ui.arena.classList.remove('markhidden');
                });*/
                event.result=event.resultOL;
            },
            chooseCard:function(){
                "step 0"
                if(event.directresult){
                    event.result={
                        buttons:[],
                        cards:event.directresult.slice(0),
                        targets:[],
                        confirm:'ok',
                        bool:true,
                        links:[]
                    };
                }
                else{
                    if(event.isMine()){
                        game.check();
                        game.pause();
                        if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                            ui.click.cancel();
                            return;
                        }
                        if(event.prompt!=false){
                            var str;
                            if(typeof event.prompt=='string') str=event.prompt;
                            else{
                                str='请选择'
                                var range=get.select(event.selectCard);
                                if(range[0]==range[1]) str+=get.cnNumber(range[0]);
                                else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
                                else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
                                str+='张';
                                if(event.position=='h'||event.position==undefined) str+='手';
                                if(event.position=='e') str+='装备';
                                str+='牌';
                            }
                            event.dialog=ui.create.dialog(str);
                            if(event.prompt2){
                                event.dialog.addText(event.prompt2,event.prompt2.length<=20);
                            }
                            if(Array.isArray(event.promptx)){
                                for(var i=0;i<event.promptx.length;i++){
                                    event.dialog.add(event.promptx[i]);
                                }
                            }
                            if(Array.isArray(event.selectCard)){
                                event.promptbar=event.dialog.add('0/'+get.numStr(event.selectCard[1],'card'));
                                event.custom.add.card=function(){
                                    _status.event.promptbar.innerHTML=
                                    ui.selected.cards.length+'/'+get.numStr(_status.event.selectCard[1],'card');
                                }
                            }
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseCard(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
                        ui.click.ok();
                    }
                    else if(event.skill){
                        var skill=event.skill;
                        ui.click.cancel();
                        event._aiexclude.add(skill);
                        event.redo();
                        game.resume();
                    }
                    else{
                        ui.click.cancel();
                    }
                }
                "step 2"
                event.resume();
                if(event.glow_result&&event.result.cards&&!event.directresult){
                    for(var i=0;i<event.result.cards.length;i++){
                        event.result.cards[i].classList.add('glow');
                    }
                }
                if(event.dialog) event.dialog.close();
            },
            chooseTarget:function(){
                "step 0"
                if(event.isMine()){
                    if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                        ui.click.cancel();
                        return;
                    }
                    game.check();
                    game.pause();
                    if(event.createDialog&&!event.dialog&&Array.isArray(event.createDialog)){
                        event.dialog=ui.create.dialog.apply(this,event.createDialog);
                    }
                    else if(event.prompt!=false){
                        var str;
                        if(typeof event.prompt=='string') str=event.prompt;
                        else{
                            str='请选择'
                            var range=get.select(event.selectTarget);
                            if(range[0]==range[1]) str+=get.cnNumber(range[0]);
                            else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
                            else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
                            str+='个目标';
                        }
                        event.dialog=ui.create.dialog(str);
                        if(event.prompt2){
                            event.dialog.addText(event.prompt2,event.prompt2.length<=20);
                        }
                        if(event.promptbar!='none'){
                            event.promptbar=event.dialog.add('0/'+get.numStr(get.select(event.selectTarget)[1],'target'));
                            event.custom.add.target=function(){
                                _status.event.promptbar.innerHTML=
                                ui.selected.targets.length+'/'+get.numStr(get.select(event.selectTarget)[1],'target');
                            }
                        }
                    }
                    else if(get.itemtype(event.dialog)=='dialog'){
                        event.dialog.open();
                    }
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseTarget(event.ai)||forced)&&(!event.filterOk||event.filterOk())){
                        ui.click.ok();
                    }
                    else{
                        ui.click.cancel();
                    }
                }
                if(event.result.bool&&event.animate!==false){
                    for(var i=0;i<event.result.targets.length;i++){
                        event.result.targets[i].animate('target');
                    }
                }
                if(event.dialog) event.dialog.close();
                event.resume();
                "step 2"
                if(event.onresult){
                    event.onresult(event.result);
                }
                if(event.result.bool&&event.autodelay&&!event.isMine()){
                    if(typeof event.autodelay=='number'){
                        game.delayx(event.autodelay);
                    }
                    else{
                        game.delayx();
                    }
                }
            },
            chooseCardTarget:function(){
                "step 0"
                if(event.isMine()){
                    if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                        ui.click.cancel();
                        return;
                    }
                    game.check();
                    game.pause();
                    if(event.prompt!=false){
                        event.dialog=ui.create.dialog(event.prompt||'请选择卡牌和目标');
                        if(event.prompt2){
                            event.dialog.addText(event.prompt2,event.prompt2.length<=20);
                        }
                    }
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if(ai.basic.chooseCard(event.ai1)||forced){
                        if((ai.basic.chooseTarget(event.ai2)||forced)&&(!event.filterOk||event.filterOk())){
                            ui.click.ok();
                            _status.event._aiexclude.length=0;
                        }
                        else{
                            ui.click.cancel();
                        }
                    }
                    else{
                        ui.click.cancel();
                    }
                }
                "step 2"
                event.resume();
                if(event.result.bool&&event.animate!==false){
                    for(var i=0;i<event.result.targets.length;i++){
                        event.result.targets[i].animate('target');
                    }
                }
                if(event.dialog) event.dialog.close();
            },
            chooseControl:function(){
                "step 0"
                if(event.controls.length==0){
                    if(event.sortcard){
                        var sortnum=2;
                        if(event.sorttop){
                            sortnum=1;
                        }
                        for(var i=0;i<event.sortcard.length+sortnum;i++){
                            event.controls.push(get.cnNumber(i,true));
                        }
                    }
                    else if(event.choiceList){
                        for(var i=0;i<event.choiceList.length;i++){
                            event.controls.push('选项'+get.cnNumber(i+1,true));
                        }
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                else if(event.choiceList&&event.controls.length==1&&event.controls[0]=='cancel2'){
                    event.controls.shift();
                    for(var i=0;i<event.choiceList.length;i++){
                        event.controls.push('选项'+get.cnNumber(i+1,true));
                    }
                    event.controls.push('cancel2');
                }
                if(event.isMine()){
                    if(event.arrangeSkill){
                        var hidden=player.hiddenSkills.slice(0);
                        game.expandSkills(hidden);
                        if(hidden.length){
                            for(var i of event.controls){
                                if(_status.prehidden_skills.contains(i)&&hidden.contains(i)){
                                    event.result={
                                        bool:true,
                                        control:i,
                                    }
                                    return;
                                }
                            }
                        }
                    }
                    else if(event.hsskill&&_status.prehidden_skills.contains(event.hsskill)&&event.controls.contains('cancel2')){
                        event.result={
                            bool:true,
                            control:'cancel2',
                        }
                        return;
                    }
                    if(event.sortcard){
                        var prompt=event.prompt||'选择一个位置';
                        if(event.tosort){
                            prompt+='放置'+get.translation(event.tosort);
                        }
                        event.dialog=ui.create.dialog(prompt,'hidden');
                        if(event.sortcard&&event.sortcard.length){
                            event.dialog.addSmall(event.sortcard);
                        }
                        else{
                            event.dialog.buttons=[];
                            event.dialog.add(ui.create.div('.buttons'));
                        }
                        var buttons=event.dialog.content.lastChild;
                        var sortnum=2;
                        if(event.sorttop){
                            sortnum=1;
                        }
                        for(var i=0;i<event.dialog.buttons.length+sortnum;i++){
                            var item=ui.create.div('.button.card.pointerdiv.mebg');
                            item.style.width='50px';
                            buttons.insertBefore(item,event.dialog.buttons[i]);
                            item.innerHTML='<div style="font-family: xinwei;font-size: 25px;height: 75px;line-height: 25px;top: 8px;left: 10px;width: 30px;">第'+get.cnNumber(i+1,true)+'张</div>';
                            if(i==event.dialog.buttons.length+1){
                                item.firstChild.innerHTML='牌堆底';
                            }
                            item.link=get.cnNumber(i,true);
                            item.listen(ui.click.dialogcontrol);
                        }

                        event.dialog.forcebutton=true;
                        event.dialog.classList.add('forcebutton');
                        event.dialog.open();
                    }
                    else if(event.dialogcontrol){
                        event.dialog=ui.create.dialog(event.prompt||'选择一项','hidden');
                        for(var i=0;i<event.controls.length;i++){
                            var item=event.dialog.add('<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block">'+event.controls[i]+'</div>');
                            item.firstChild.listen(ui.click.dialogcontrol);
                            item.firstChild.link=event.controls[i];
                        }
                        event.dialog.forcebutton=true;
                        event.dialog.classList.add('forcebutton');
                        if(event.addDialog){
                            for(var i=0;i<event.addDialog.length;i++){
                                if(get.itemtype(event.addDialog[i])=='cards'){
                                    event.dialog.addSmall(event.addDialog[i]);
                                }
                                else{
                                    event.dialog.add(event.addDialog[i]);
                                }
                            }
                            event.dialog.add(ui.create.div('.placeholder.slim'));
                        }
                        event.dialog.open();
                    }
                    else{
                        if(event.seperate||lib.config.seperate_control){
                            var controls=event.controls.slice(0);
                            var num=0;
                            controls.remove('cancel2');
                            if(event.direct&&controls.length==1||event.forceDirect){
                                event.result={
                                    control:event.controls[0].link,
                                    links:get.links([event.controls[0]]),
                                };
                                return;
                            }
                            else{
                                event.controlbars=[];
                                for(var i=0;i<event.controls.length;i++){
                                    event.controlbars.push(ui.create.control([event.controls[i]]));
                                }
                            }
                        }
                        else{
                            var controls=event.controls.slice(0);
                            var num=0;
                            controls.remove('cancel2');
                            if(event.direct&&controls.length==1||event.forceDirect){
                                event.result={
                                    control:event.controls[0].link,
                                    links:get.links([event.controls[0]]),
                                };
                                return;
                            }
                            event.controlbar=ui.create.control(event.controls);
                        }
                        if(event.dialog){
                            if(Array.isArray(event.dialog)){
                                event.dialog=ui.create.dialog.apply(this,event.dialog);
                            }
                            event.dialog.open();
                        }
                        else if(event.choiceList){
                            event.dialog=ui.create.dialog(event.prompt||'选择一项','hidden');
                            event.dialog.forcebutton=true;
                            event.dialog.open();
                            for(var i=0;i<event.choiceList.length;i++){
                                event.dialog.add('<div class="popup text" style="width:calc(100% - 10px);display:inline-block">'+
                                (event.displayIndex!==false?('选项'+get.cnNumber(i+1,true)+'：'):'')+event.choiceList[i]+'</div>');
                            }
                        }
                        else if(event.prompt){
                            event.dialog=ui.create.dialog(event.prompt);
                            if(event.prompt2){
                                event.dialog.addText(event.prompt2,Boolean(event.prompt2.length<=20||event.centerprompt2));
                            }
                        }
                    }
                    game.pause();
                    game.countChoose();
                    event.choosing=true;
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.result=='ai'){
                    event.result={};
                    if(event.ai){
                        var result=event.ai(event.getParent(),player);
                        if(typeof result=='number') event.result.control=event.controls[result];
                        else event.result.control=result;
                    }
                    else event.result.control=event.controls[event.choice];
                }
                event.result.index=event.controls.indexOf(event.result.control);
                event.choosing=false;
                _status.imchoosing=false;
                if(event.dialog&&event.dialog.close) event.dialog.close();
                if(event.controlbar) event.controlbar.close();
                if(event.controlbars){
                    for(var i=0;i<event.controlbars.length;i++){
                        event.controlbars[i].close();
                    }
                }
                event.resume();
            },
            chooseBool:function(){
                "step 0"
                if(event.isMine()){
                    if(event.frequentSkill&&!lib.config.autoskilllist.contains(event.frequentSkill)){
                        ui.click.ok();
                        return;
                    }
                    else if(event.hsskill&&_status.prehidden_skills.contains(event.hsskill)){
                        ui.click.cancel();
                        return;
                    }
                    ui.create.confirm('oc');
                    if(event.createDialog&&!event.dialog){
                        if(Array.isArray(event.createDialog)){
                            event.dialog=ui.create.dialog.apply(this,event.createDialog);
                            if(event.dialogselectx){
                                for(var i=0;i<event.dialog.buttons.length;i++){
                                    event.dialog.buttons[i].classList.add('selectedx');
                                }
                            }
                        }
                    }
                    if(event.dialog){
                        event.dialog.open();
                    }
                    else if(event.prompt){
                        event.dialog=ui.create.dialog(event.prompt);
                        if(event.prompt2){
                            event.dialog.addText(event.prompt2,event.prompt2.length<=20);
                        }
                    }
                    game.pause();
                    game.countChoose();
                    event.choosing=true;
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.result='ai';
                }
                "step 1"
                if(event.result=='ai'){
                    if(event.ai){
                        event.choice=event.ai(event.getParent(),player);
                    }
                    event.result={bool:event.choice};
                }
                _status.imchoosing=false;
                event.choosing=false;
                if(event.dialog) event.dialog.close();
                event.resume();
            },
            chooseDrawRecover:function(){
                'step 0'
                if(player.isHealthy()&&event.forced){
                    player.draw(event.num1);
                    event.finish();
                    return;
                }
                var controls=['draw_card'];
                if(player.isDamaged()){
                    event.num2=Math.min(event.num2,player.maxHp-player.hp);
                    controls.push('recover_hp');
                }
                if(!event.forced){
                    controls.push('cancel2');
                }
                var prompt=event.prompt;
                if(!prompt){
                    if(player.isHealthy()){
                        prompt='是否摸'+get.cnNumber(event.num1)+'张牌？';
                    }
                    else{
                        prompt='摸'+get.cnNumber(event.num1)+'张牌或回复'+get.cnNumber(event.num2)+'点体力';
                    }
                }
                var next=player.chooseControl(controls);
                next.set('prompt',prompt);
                if(event.hsskill) next.setHiddenSkill(event.hsskill);
                if(event.ai){
                    next.set('ai',event.ai);
                }
                else{
                    var choice;
                    if(player.isDamaged()&&get.recoverEffect(player)>0&&(
                        player.hp==1||player.needsToDiscard()||
                        player.hasSkillTag('maixie_hp')||event.num2>event.num1||
                        (event.num2==event.num1&&player.needsToDiscard(1))
                    )){
                        choice='recover_hp';
                    }
                    else{
                        choice='draw_card';
                    }
                    next.set('ai',function(){
                        return _status.event.choice;
                    });
                    next.set('choice',choice);
                }
                'step 1'
                if(result.control!='cancel2'){
                    if(event.logSkill){
                        if(typeof event.logSkill=='string'){
                            player.logSkill(event.logSkill);
                        }
                        else if(Array.isArray(event.logSkill)){
                            player.logSkill.apply(player,event.logSkill);
                        }
                    }
                    if(result.control=='draw_card'){
                        player.draw(event.num1);
                    }
                    else{
                        player.recover(event.num2);
                    }
                }
                event.result=result;
            },
            choosePlayerCard:function(){
                "step 0"
                if(!event.dialog) event.dialog=ui.create.dialog('hidden');
                else if(!event.isMine()){
                    event.dialog.style.display='none';
                }
                if(event.prompt){
                    event.dialog.add(event.prompt);
                }
                else{
                    event.dialog.add('选择'+get.translation(target)+'的一张牌');
                }
                if(event.prompt2){
                    event.dialog.addText(event.prompt2);
                }
                var expand_length=0;
                var directh=!lib.config.unauto_choose;
                for(var i=0;i<event.position.length;i++){
                    if(event.position[i]=='h'){
                        var hs=target.getCards('h');
                        if(hs.length){
                            expand_length+=Math.ceil(hs.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            hs.randomSort();
                            if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
                                event.dialog.add(hs);
                                directh=false;
                            }
                            else{
                                var shown=hs.filter(card=>get.is.shownCard(card));
                                if(shown.length){
                                    var hidden=hs.filter(card=>!shown.includes(card));
                                    var buttons=ui.create.div('.buttons',event.dialog.content);
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
                                    if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
                                    if(event.dialog.buttons.length>3){
                                        event.dialog.classList.remove('forcebutton-auto');
                                    }
                                    else if(!event.dialog.noforcebutton){
                                        event.dialog.classList.add('forcebutton-auto');
                                    }
                                }
                                else{
                                    event.dialog.add([hs,'blank']);
                                }
                            }
                        }
                    }
                    else if(event.position[i]=='e'){
                        var es=target.getCards('e');
                        if(es.length){
                            expand_length+=Math.ceil(es.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(es);
                            directh=false;
                        }
                    }
                    else if(event.position[i]=='j'){
                        var js=target.getCards('j');
                        if(js.length){
                            expand_length+=Math.ceil(js.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(js);
                            directh=false;
                        }
                    }
                }
                if(event.dialog.buttons.length==0){
                    event.finish();
                    return;
                }
                var cs=target.getCards(event.position);
                var select=get.select(event.selectButton);
                if(event.forced&&select[0]>=cs.length){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons,
                        links:cs
                    }
                }
                else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons.randomGets(select[0]),
                        links:[]
                    }
                    for(var i=0;i<event.result.buttons.length;i++){
                        event.result.links[i]=event.result.buttons[i].link;
                    }
                }
                else{
                    if(event.isMine()){
                        if(event.hsskill&&!event.forced&&_status.prehidden_skills.contains(event.hsskill)){
                            ui.click.cancel();
                            return;
                        }
                        event.dialog.open();
                        game.check();
                        game.pause();
                        if(expand_length>2){
                            ui.arena.classList.add('choose-player-card');
                            event.dialog.classList.add('fullheight');
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
                    else ui.click.cancel();
                }
                event.dialog.close();
                if(event.result.links){
                    event.result.cards=event.result.links.slice(0);
                }
                event.resume();
                setTimeout(function(){
                    ui.arena.classList.remove('choose-player-card');
                },500);
            },
            discardPlayerCard:function(){
                "step 0"
                if(event.directresult){
                    event.result={
                        buttons:[],
                        cards:event.directresult.slice(0),
                        links:event.directresult.slice(0),
                        targets:[],
                        confirm:'ok',
                        bool:true
                    };
                    event.cards=event.directresult.slice(0);
                    event.goto(2);
                    return;
                }
                if(!event.dialog) event.dialog=ui.create.dialog('hidden');
                else if(!event.isMine()){
                    event.dialog.style.display='none';
                }
                if(event.prompt==undefined){
                    var str='弃置'+get.translation(target);
                    var range=get.select(event.selectButton);
                    if(range[0]==range[1]) str+=get.cnNumber(range[0]);
                    else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
                    else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
                    str+='张';
                    if(event.position=='h'||event.position==undefined) str+='手';
                    if(event.position=='e') str+='装备';
                    str+='牌';
                    event.prompt=str;
                }
                if(event.prompt){
                    event.dialog.add(event.prompt);
                }
                if(event.prompt2){
                    event.dialog.addText(event.prompt2);
                }
                var directh=(!lib.config.unauto_choose&&!event.complexSelect);
                var expand_length=0;
                for(var i=0;i<event.position.length;i++){
                    if(event.position[i]=='h'){
                        var hs=target.getDiscardableCards(player,'h');
                        expand_length+=Math.ceil(hs.length/6);
                        if(hs.length){
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            hs.randomSort();
                            if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
                                event.dialog.add(hs);
                                directh=false;
                            }
                            else{
                                var shown=hs.filter(card=>get.is.shownCard(card));
                                if(shown.length){
                                    var hidden=hs.filter(card=>!shown.includes(card));
                                    var buttons=ui.create.div('.buttons',event.dialog.content);
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
                                    if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
                                    if(event.dialog.buttons.length>3){
                                        event.dialog.classList.remove('forcebutton-auto');
                                    }
                                    else if(!event.dialog.noforcebutton){
                                        event.dialog.classList.add('forcebutton-auto');
                                    }
                                }
                                else{
                                    event.dialog.add([hs,'blank']);
                                }
                            }
                        }
                    }
                    else if(event.position[i]=='e'){
                        var es=target.getDiscardableCards(player,'e');
                        if(es.length){
                            expand_length+=Math.ceil(es.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(es);
                            directh=false;
                        }
                    }
                    else if(event.position[i]=='j'){
                        var js=target.getDiscardableCards(player,'j');
                        if(js.length){
                            expand_length+=Math.ceil(js.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(js);
                            directh=false;
                        }
                    }
                }
                if(event.dialog.buttons.length==0){
                    event.finish();
                    return;
                }
                var cs=target.getCards(event.position);
                var select=get.select(event.selectButton);
                if(event.forced&&select[0]>=cs.length){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons,
                        links:cs
                    }
                }
                else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons.randomGets(select[0]),
                        links:[]
                    }
                    for(var i=0;i<event.result.buttons.length;i++){
                        event.result.links[i]=event.result.buttons[i].link;
                    }
                }
                else{
                    if(event.isMine()){
                        event.dialog.open();
                        game.check();
                        game.pause();
                        if(expand_length>2){
                            ui.arena.classList.add('discard-player-card');
                            event.dialog.classList.add('fullheight');
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
                    else ui.click.cancel();
                }
                event.dialog.close();
                "step 2"
                event.resume();
                setTimeout(function(){
                    ui.arena.classList.remove('discard-player-card');
                },500);
                if(event.result.bool&&event.result.links&&!game.online){
                    if(event.logSkill){
                        if(typeof event.logSkill=='string'){
                            player.logSkill(event.logSkill);
                        }
                        else if(Array.isArray(event.logSkill)){
                            player.logSkill.apply(player,event.logSkill);
                        }
                    }
                    var cards=[];
                    for(var i=0;i<event.result.links.length;i++){
                        cards.push(event.result.links[i]);
                    }
                    event.result.cards=event.result.links.slice(0);
                    event.cards=cards;
                    event.trigger("rewriteDiscardResult");
                }
                "step 3"
                if(event.boolline){
                    player.line(target,'green');
                }
                if(!event.chooseonly){
                    var next=target.discard(event.cards);
                    if(player!=target) next.notBySelf=true;
                    next.discarder=player;
                    event.done=next;
                    if(event.delay===false){
                        next.set('delay',false);
                    }
                }
            },
            gainPlayerCard:function(){
                "step 0"
                if(event.directresult){
                    event.result={
                        buttons:[],
                        cards:event.directresult.slice(0),
                        links:event.directresult.slice(0),
                        targets:[],
                        confirm:'ok',
                        bool:true
                    };
                    event.cards=event.directresult.slice(0);
                    event.goto(2);
                    return;
                }
                if(!event.dialog) event.dialog=ui.create.dialog('hidden');
                else if(!event.isMine()){
                    event.dialog.style.display='none';
                }
                if(event.prompt==undefined){
                    var str='获得'+get.translation(target);
                    var range=get.select(event.selectButton);
                    if(range[0]==range[1]) str+=get.cnNumber(range[0]);
                    else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
                    else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
                    str+='张';
                    if(event.position=='h'||event.position==undefined) str+='手';
                    if(event.position=='e') str+='装备';
                    str+='牌';
                    event.prompt=str;
                }
                if(event.prompt){
                    event.dialog.add(event.prompt);
                }
                if(event.prompt2){
                    event.dialog.addText(event.prompt2);
                }
                var expand_length=0;
                var directh=(!lib.config.unauto_choose&&!event.complexSelect);
                for(var i=0;i<event.position.length;i++){
                    if(event.position[i]=='h'){
                        var hs=target.getGainableCards(player,'h');
                        if(hs.length){
                            expand_length+=Math.ceil(hs.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">手牌区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            hs.randomSort();
                            if(event.visible||target.isUnderControl(true)||player.hasSkillTag('viewHandcard',null,target,true)){
                                event.dialog.add(hs);
                                directh=false;
                            }
                            else{
                                var shown=hs.filter(card=>get.is.shownCard(card));
                                if(shown.length){
                                    var hidden=hs.filter(card=>!shown.includes(card));
                                    var buttons=ui.create.div('.buttons',event.dialog.content);
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(shown,'card',buttons));
                                    event.dialog.buttons=event.dialog.buttons.concat(ui.create.buttons(hidden,'blank',buttons));
                                    if(event.dialog.forcebutton!==false) event.dialog.forcebutton=true;
                                    if(event.dialog.buttons.length>3){
                                        event.dialog.classList.remove('forcebutton-auto');
                                    }
                                    else if(!event.dialog.noforcebutton){
                                        event.dialog.classList.add('forcebutton-auto');
                                    }
                                }
                                else{
                                    event.dialog.add([hs,'blank']);
                                }
                            }
                        }
                    }
                    else if(event.position[i]=='e'){
                        var es=target.getGainableCards(player,'e');
                        if(es.length){
                            expand_length+=Math.ceil(es.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">装备区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(es);
                            directh=false;
                        }
                    }
                    else if(event.position[i]=='j'){
                        var js=target.getGainableCards(player,'j');
                        if(js.length){
                            expand_length+=Math.ceil(js.length/6);
                            var title=event.dialog.add('<div class="text center" style="margin: 0px;">判定区</div>');
                            title.style.margin='0px';
                            title.style.padding='0px';
                            event.dialog.add(js);
                            directh=false;
                        }
                    }
                }
                if(event.dialog.buttons.length==0){
                    event.dialog.close();
                    event.finish();
                    return;
                }
                var cs=target.getCards(event.position);
                var select=get.select(event.selectButton);
                if(event.forced&&select[0]>=cs.length){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons,
                        links:cs
                    }
                }
                else if(event.forced&&directh&&!event.isOnline()&&select[0]==select[1]){
                    event.result={
                        bool:true,
                        buttons:event.dialog.buttons.randomGets(select[0]),
                        links:[]
                    }
                    for(var i=0;i<event.result.buttons.length;i++){
                        event.result.links[i]=event.result.buttons[i].link;
                    }
                }
                else{
                    if(event.isMine()){
                        event.dialog.open();
                        game.check();
                        game.pause();
                        if(expand_length>2){
                            ui.arena.classList.add('gain-player-card');
                            event.dialog.classList.add('fullheight');
                        }
                    }
                    else if(event.isOnline()){
                        event.send();
                    }
                    else{
                        event.result='ai';
                    }
                }
                "step 1"
                if(event.result=='ai'){
                    game.check();
                    if((ai.basic.chooseButton(event.ai)||forced)&&(!event.filterOk||event.filterOk())) ui.click.ok();
                    else ui.click.cancel();
                }
                event.dialog.close();
                "step 2"
                event.resume();
                setTimeout(function(){
                    ui.arena.classList.remove('gain-player-card');
                },500);
                if(game.online||!event.result.bool){
                    event.finish();
                }
                "step 3"
                if(event.logSkill&&event.result.bool&&!game.online){
                    if(typeof event.logSkill=='string'){
                        player.logSkill(event.logSkill);
                    }
                    else if(Array.isArray(event.logSkill)){
                        player.logSkill.apply(player,event.logSkill);
                    }
                }
                var cards=[];
                for(var i=0;i<event.result.links.length;i++){
                    cards.push(event.result.links[i]);
                }
                event.result.cards=event.result.links.slice(0);
                event.cards=cards;
                event.trigger("rewriteGainResult");
                "step 4"
                if(event.boolline){
                    player.line(target,'green');
                }
                if(!event.chooseonly){
                    if(event.delay!==false){
                        var next=player.gain(event.cards,target,event.visibleMove?'give':'giveAuto','bySelf');
                        event.done=next;
                    }
                    else{
                        var next=player.gain(event.cards,target,'bySelf');
                        event.done=next;
                        target[event.visibleMove?'$give':'$giveAuto'](cards,player);
                        if(event.visibleMove) next.visible=true;
                    }
                }
                else target[event.visibleMove?'$give':'$giveAuto'](cards,player);
            },
            showHandcards:function(){
                "step 0"
                if(player.countCards('h')==0){
                    event.finish();
                    return;
                }
                var cards=player.getCards('h');
                player.showCards(cards).setContent(function(){});
                var str=get.translation(player.name)+'的手牌';
                if(typeof event.prompt=='string'){
                    str=event.prompt;
                }
                event.dialog=ui.create.dialog(str,cards);
                event.dialogid=lib.status.videoId++;
                event.dialog.videoId=event.dialogid;
                game.broadcast(function(str,cards,id){
                    ui.create.dialog(str,cards).videoId=id;
                },str,cards,event.dialogid);
                game.log(player,'展示了',cards);
                game.addVideo('showCards',player,[str,get.cardsInfo(cards)]);
                game.delayx(2);
                "step 1"
                game.broadcast('closeDialog',event.dialogid);
                event.dialog.close();
            },
            showCards:function(){
                "step 0"
                if(get.itemtype(cards)!='cards'){
                    event.finish();
                    return;
                }
                if(!event.str){
                    event.str=get.translation(player.name)+'展示的牌';
                }
                event.dialog=ui.create.dialog(event.str,cards);
                event.dialogid=lib.status.videoId++;
                event.dialog.videoId=event.dialogid;

                if(event.hiddencards){
                    for(var i=0;i<event.dialog.buttons.length;i++){
                        if(event.hiddencards.contains(event.dialog.buttons[i].link)){
                            event.dialog.buttons[i].className='button card';
                            event.dialog.buttons[i].innerHTML='';
                        }
                    }
                }
                game.broadcast(function(str,cards,cards2,id){
                    var dialog=ui.create.dialog(str,cards);
                    dialog.forcebutton=true;
                    dialog.videoId=id;
                    if(cards2){
                        for(var i=0;i<dialog.buttons.length;i++){
                            if(cards2.contains(dialog.buttons[i].link)){
                                dialog.buttons[i].className='button card';
                                dialog.buttons[i].innerHTML='';
                            }
                        }
                    }
                },event.str,cards,event.hiddencards,event.dialogid);
                if(event.hiddencards){
                    var cards2=cards.slice(0);
                    for(var i=0;i<event.hiddencards.length;i++){
                        cards2.remove(event.hiddencards[i]);
                    }
                    game.log(player,'展示了',cards2);
                }
                else{
                    game.log(player,'展示了',cards);
                }
                game.delayx(event.delay_time||2.5);
                game.addVideo('showCards',player,[event.str,get.cardsInfo(cards)]);
                "step 1"
                game.broadcast('closeDialog',event.dialogid);
                event.dialog.close();
            },
            viewCards:function(){
                "step 0"
                if(player==game.me){
                    event.dialog=ui.create.dialog(event.str,event.cards);
                    if(event.isMine()){
                        game.pause();
                        ui.create.confirm('o');
                        game.countChoose();
                        event.choosing=true;
                    }
                    else{
                        event.finish();
                        event.result='viewed';
                        setTimeout(function(){
                            event.dialog.close();
                        },2*lib.config.duration);
                        game.delayx(2);
                    }
                }
                else if(event.isOnline()){
                    event.send();
                }
                else{
                    event.finish();
                }
                "step 1"
                event.result='viewed';
                _status.imchoosing=false;
                event.choosing=false;
                if(event.dialog) event.dialog.close();
            },
            moveCard:function(){
                'step 0'
                if(!player.canMoveCard(null,event.nojudge)){
                    event.finish();
                    return;
                }
                var next=player.chooseTarget(2,function(card,player,target){
                    if(ui.selected.targets.length){
                        var from=ui.selected.targets[0];
                        var js=from.getCards('j');
                        for(var i=0;i<js.length;i++){
                            if(_status.event.nojudge) break;
                            if(target.canAddJudge(js[i])) return true;
                        }
                        if(target.isMin()) return false;
                        var es=from.getCards('e');
                        for(var i=0;i<es.length;i++){
                            if(target.canEquip(es[i])) return true;
                        }
                        return false;
                    }
                    else{
                        var range='ej';
                        if(_status.event.nojudge) range='e';
                        return target.countCards(range)>0;
                    }
                });
                next.set('nojudge',event.nojudge||false);
                next.set('ai',function(target){
                    var player=_status.event.player;
                    var att=get.attitude(player,target);
                    var sgnatt=get.sgn(att);
                    if(ui.selected.targets.length==0){
                        if(att>0){
                            if(!_status.event.nojudge&&target.countCards('j',function(card){
                                return game.hasPlayer(function(current){
                                    return current!=target&&current.canAddJudge(card)&&get.attitude(player,current)<0;
                                })
                            })) return 14;
                            if(target.countCards('e',function(card){
                                return get.value(card,target)<0&&game.hasPlayer(function(current){
                                    return current!=target&&get.attitude(player,current)<0&&current.canEquip(card)&&get.effect(target,card,player,player)<0;
                                });
                            })>0) return 9;
                        }
                        else if(att<0){
                            if(game.hasPlayer(function(current){
                                if(current!=target&&get.attitude(player,current)>0){
                                    var es=target.getCards('e');
                                    for(var i=0;i<es.length;i++){
                                        if(get.value(es[i],target)>0&&current.canEquip(es[i])&&get.effect(current,es[i],player,player)>0) return true;
                                    }
                                }
                            })){
                                return -att;
                            }
                        }
                        return 0;
                    }
                    var es=ui.selected.targets[0].getCards('e');
                    var i;
                    var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
                    for(i=0;i<es.length;i++){
                        if(sgnatt!=0&&att2!=0&&sgnatt!=att2&&
                            get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
                            get.sgn(get.effect(target,es[i],player,target))==sgnatt&&
                            target.canEquip(es[i])){
                            return Math.abs(att);
                        }
                    }
                    if(i==es.length&&(_status.event.nojudge||!ui.selected.targets[0].countCards('j',function(card){
                        return target.canAddJudge(card);
                    })||att2<=0)){
                        return 0;
                    }
                    return -att*att2;
                });
                next.set('multitarget',true);
                next.set('targetprompt',_status.event.targetprompt||['被移走','移动目标']);
                next.set('prompt',event.prompt||'移动场上的一张牌');
                if(event.prompt2) next.set('prompt2',event.prompt2);
                if(event.forced) next.set('forced',true);
                'step 1'
                event.result=result;
                if(result.bool){
                    player.line2(result.targets,'green');
                    event.targets=result.targets;
                }
                else{
                    event.finish();
                }
                'step 2'
                game.delay();
                'step 3'
                if(targets.length==2){
                    player.choosePlayerCard('ej',true,function(button){
                        var player=_status.event.player;
                        var targets0=_status.event.targets0;
                        var targets1=_status.event.targets1;
                        if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
                            if(get.position(button.link)=='j') return 12;
                            if(get.value(button.link,targets0)<0&&get.effect(targets1,button.link,player,targets1)>0) return 10;
                            return 0;
                        }
                        else{
                            if(get.position(button.link)=='j') return -10;
                            return get.value(button.link)*get.effect(targets1,button.link,player,targets1);
                        }
                    },targets[0]).set('nojudge',event.nojudge||false).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
                        var targets1=_status.event.targets1;
                        if(get.position(button.link)=='j'){
                            if(_status.event.nojudge) return false;
                            return targets1.canAddJudge(button.link);
                        }
                        else{
                            return targets1.canEquip(button.link);
                        }
                    });
                }
                else{
                    event.finish();
                }
                'step 4'
                if(result.bool&&result.links.length){
                    var link=result.links[0];
                    if(get.position(link)=='e'){
                        event.targets[1].equip(link);
                    }
                    else if(link.viewAs){
                        event.targets[1].addJudge({name:link.viewAs},[link]);
                    }
                    else{
                        event.targets[1].addJudge(link);
                    }
                    event.targets[0].$give(link,event.targets[1],false);
                    game.log(event.targets[0],'的',link,'被移动给了',event.targets[1])
                    event.result.card=link;
                    event.result.position=get.position(link);
                    game.delay();
                }
            },
            useCard:function(){
                "step 0"
                if(!card){
                    console.log('err: no card',get.translation(event.player));
                    event.finish();
                    return;
                }
                if(!get.info(card,false).noForceDie) event.forceDie=true;
                if(cards.length){
                    var owner=(get.owner(cards[0])||player);
                    var next=owner.lose(cards,'visible',ui.ordering).set('type','use');
                    var directDiscard=[];
                    for(var i=0;i<cards.length;i++){
                        if(!next.cards.contains(cards[i])){
                            directDiscard.push(cards[i]);
                        }
                    }
                    if(directDiscard.length) game.cardsGotoOrdering(directDiscard);
                }
                //player.using=cards;
                var cardaudio=true;
                if(event.skill){
                    if(lib.skill[event.skill].audio){
                        cardaudio=false;
                    }
                    if(lib.skill[event.skill].log!=false){
                        player.logSkill(event.skill);
                    }
                    if(get.info(event.skill).popname){
                        player.tryCardAnimate(card,event.card.name,'metal',true);
                    }
                }
                else if(!event.nopopup){
                    if(lib.translate[event.card.name+'_pop']){
                        player.tryCardAnimate(card,lib.translate[event.card.name+'_pop'],'metal');
                    }
                    else{
                        player.tryCardAnimate(card,event.card.name,'metal');
                    }
                }	
                if(event.audio===false){
                    cardaudio=false;
                }
                if(cardaudio) game.broadcastAll((player,card)=>{
                    game.playCardAudio(card,player);
                    /*
                    if(!lib.config.background_audio||get.type(card)=='equip'&&!lib.config.equip_audio) return;
                    const sex=player.sex=='female'?'female':'male';
                    var nature=get.natureList(card)[0];
                    if(card.name=='sha'&&['fire','thunder','ice','stab'].includes(nature)){
                        game.playAudio('card',sex,`${card.name}_${nature}`);
                        return;
                    }
                    const audio=lib.card[card.name].audio;
                    if(typeof audio=='string'){
                        const audioInfo=audio.split(':');
                        if(audio.startsWith('db:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,audioInfo[2],`${card.name}_${sex}.${audioInfo[3]||'mp3'}`);
                        else if(audio.startsWith('ext:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,`${card.name}_${sex}.${audioInfo[2]||'mp3'}`);
                        else game.playAudio('card',sex,`${audioInfo[0]}.${audioInfo[1]||'mp3'}`);
                    }
                    else game.playAudio('card',sex,card.name);*/
                },player,card);
                if(event.animate!=false&&event.line!=false){
                    if(card.name=='wuxie'&&event.getParent()._info_map){
                        var evtmap=event.getParent()._info_map;
                        if(evtmap._source) evtmap=evtmap._source;
                        var lining=(evtmap.multitarget?evtmap.targets:evtmap.target)||event.player;
                        if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
                            player.line(lining[0],'green');
                        }
                        else{
                            player.line(lining,'green');
                        }
                    }
                    else if(card.name=='youdishenru'&&event.getParent().source){
                        var lining=event.getParent().sourcex||event.getParent().source2||event.getParent().source;
                        if(lining==player&&event.getParent().sourcex2){
                            lining=event.getParent().sourcex2;
                        }
                        if(Array.isArray(lining)&&event.getTrigger().name=='jiedao'){
                            player.line(lining[0],'green');
                        }
                        else{
                            player.line(lining,'green');
                        }
                    }
                    else{
                        var config={};
                        var nature=get.natureList(card)[0];
                        if(nature||card.classList&&card.classList.contains(nature)) config.color=nature;
                        if(event.addedTarget){
                            player.line2(targets.concat(event.addedTargets),config);
                        }
                        else if(get.info(card,false).multitarget&&targets.length>1&&!get.info(card,false).multiline){
                            player.line2(targets,config);
                        }
                        else{
                            player.line(targets,config);
                        }
                    }
                    if(event.throw!==false) player.$throw(cards);
                    if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
                        var waitingForTransition=get.time();
                        event.waitingForTransition=waitingForTransition;
                        cards[0].clone.listenTransition(function(){
                            if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                game.resume();
                            }
                            delete event.waitingForTransition;
                        });
                    }
                }
                event.id=get.id();
                if(!Array.isArray(event.excluded)) event.excluded=[];
                if(!Array.isArray(event.directHit)) event.directHit=[];
                if(typeof event.customArgs!='object'||typeof event.customArgs.default!='object') event.customArgs={default:{}};
                if(typeof event.baseDamage!='number') event.baseDamage=get.info(card,false).baseDamage||1;
                if(typeof event.effectCount!='number') event.effectCount=get.info(card,false).effectCount||1;
                event.effectedCount=0;
                if(event.oncard){
                    event.oncard(event.card,event.player);
                }
                player.actionHistory[player.actionHistory.length-1].useCard.push(event);
                game.getGlobalHistory().useCard.push(event);
                if(event.addCount!==false){
                    if(player.stat[player.stat.length-1].card[card.name]==undefined){
                        player.stat[player.stat.length-1].card[card.name]=1;
                    }
                    else{
                        player.stat[player.stat.length-1].card[card.name]++;
                    }
                }
                if(event.skill){
                    if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
                        player.stat[player.stat.length-1].skill[event.skill]=1;
                    }
                    else{
                        player.stat[player.stat.length-1].skill[event.skill]++;
                    }
                    var sourceSkill=get.info(event.skill).sourceSkill;
                    if(sourceSkill){
                        if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
                            player.stat[player.stat.length-1].skill[sourceSkill]=1;
                        }
                        else{
                            player.stat[player.stat.length-1].skill[sourceSkill]++;
                        }
                    }
                }
                if(targets.length){
                    var str=(targets.length==1&&targets[0]==player)?'#b自己':targets;
                    if(cards.length&&!card.isCard){
                        if(event.addedTarget){
                            game.log(player,'对',str,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
                        }
                        else{
                            game.log(player,'对',str,'使用了',card,'（',cards,'）');
                        }
                    }
                    else{
                        if(event.addedTarget){
                            game.log(player,'对',str,'使用了',card,'（指向',event.addedTargets,'）');
                        }
                        else{
                            game.log(player,'对',str,'使用了',card);
                        }
                    }
                }
                else{
                    if(cards.length&&!card.isCard){
                        if(event.addedTarget){
                            game.log(player,'使用了',card,'（',cards,'，指向',event.addedTargets,'）');
                        }
                        else{
                            game.log(player,'使用了',card,'（',cards,'）');
                        }
                    }
                    else{
                        if(event.addedTarget){
                            game.log(player,'使用了',card,'（指向',event.addedTargets,'）');
                        }
                        else{
                            game.log(player,'使用了',card);
                        }
                    }
                }
                if(card.name=='wuxie'){
                    game.logv(player,[card,cards],[event.getTrigger().card]);
                }
                else{
                    game.logv(player,[card,cards],targets);
                }
                event.trigger('useCard1');
                "step 1"
                event.trigger('yingbian');
                "step 2"
                event.trigger('useCard2');
                "step 3"
                event.trigger('useCard');
                event._oncancel=function(){
                    game.broadcastAll(function(id){
                        if(ui.tempnowuxie&&ui.tempnowuxie._origin==id){
                            ui.tempnowuxie.close();
                            delete ui.tempnowuxie;
                        }
                    },event.id);
                };
                "step 4"
                event.sortTarget=function(animate,sort){
                    var info=get.info(card,false);
                    if(num==0&&targets.length>1){
                        if(!info.multitarget){
                            if(!event.fixedSeat&&!sort){
                                targets.sortBySeat((_status.currentPhase||player));
                            }
                            if(animate)	for(var i=0;i<targets.length;i++){
                                targets[i].animate('target');
                            }
                        }
                        else if(animate){
                            for(var i=0;i<targets.length;i++){
                                targets[i].animate('target');
                            }
                        }
                    }
                }
                event.sortTarget();
                event.getTriggerTarget=function(list1,list2){
                    var listx=list1.slice(0).sortBySeat((_status.currentPhase||player));
                    for(var i=0;i<listx.length;i++){
                        if(get.numOf(list2,listx[i])<get.numOf(listx,listx[i])) return listx[i];
                    }
                    return null;
                }
                "step 5"
                if(event.all_excluded) return;
                if(!event.triggeredTargets1) event.triggeredTargets1=[];
                var target=event.getTriggerTarget(targets,event.triggeredTargets1);
                if(target){
                    event.triggeredTargets1.push(target);
                    var next=game.createEvent('useCardToPlayer',false);
                    if(!event.isFirstTarget1){
                        event.isFirstTarget1=true;
                        next.isFirstTarget=true;
                    }
                    next.setContent('emptyEvent');
                    next.targets=targets;
                    next.target=target;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.excluded=event.excluded;
                    next.directHit=event.directHit;
                    next.customArgs=event.customArgs;
                    if(event.forceDie) next.forceDie=true;
                    event.redo();
                }
                "step 6"
                if(event.all_excluded) return;
                if(!event.triggeredTargets2) event.triggeredTargets2=[];
                var target=event.getTriggerTarget(targets,event.triggeredTargets2);
                if(target){
                    event.triggeredTargets2.push(target);
                    var next=game.createEvent('useCardToTarget',false);
                    if(!event.isFirstTarget2){
                        event.isFirstTarget2=true;
                        next.isFirstTarget=true;
                    }
                    next.setContent('emptyEvent');
                    next.targets=targets;
                    next.target=target;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.excluded=event.excluded;
                    next.directHit=event.directHit;
                    next.customArgs=event.customArgs;
                    if(event.forceDie) next.forceDie=true;
                    event.redo();
                }
                "step 7"
                var info=get.info(card,false);
                if(!info.nodelay&&event.animate!=false){
                    if(event.delayx!==false){
                        if(event.waitingForTransition){
                            _status.waitingForTransition=event.waitingForTransition;
                            game.pause();
                        }
                        else{
                            game.delayx();
                        }
                    }
                }
                "step 8"
                if(event.all_excluded) return;
                if(!event.triggeredTargets3) event.triggeredTargets3=[];
                var target=event.getTriggerTarget(targets,event.triggeredTargets3);
                if(target){
                    event.triggeredTargets3.push(target);
                    var next=game.createEvent('useCardToPlayered',false);
                    if(!event.isFirstTarget3){
                        event.isFirstTarget3=true;
                        next.isFirstTarget=true;
                    }
                    next.setContent('emptyEvent');
                    next.targets=targets;
                    next.target=target;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.excluded=event.excluded;
                    next.directHit=event.directHit;
                    next.customArgs=event.customArgs;
                    if(event.forceDie) next.forceDie=true;
                    event.redo();
                }
                "step 9"
                if(event.all_excluded) return;
                if(!event.triggeredTargets4) event.triggeredTargets4=[];
                var target=event.getTriggerTarget(targets,event.triggeredTargets4);
                if(target){
                    event.triggeredTargets4.push(target);
                    var next=game.createEvent('useCardToTargeted',false);
                    if(!event.isFirstTarget4){
                        event.isFirstTarget4=true;
                        next.isFirstTarget=true;
                    }
                    next.setContent('emptyEvent');
                    next.targets=targets;
                    next.target=target;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.excluded=event.excluded;
                    next.directHit=event.directHit;
                    next.customArgs=event.customArgs;
                    if(event.forceDie) next.forceDie=true;
                    if(targets.length==event.triggeredTargets4.length){
                        event.sortTarget();
                    }
                    event.redo();
                }
                "step 10"
                if(event.all_excluded) return;
                event.effectedCount++;
                event.num=0;
                var info=get.info(card,false);
                if(info.contentBefore){
                    var next=game.createEvent(card.name+'ContentBefore');
                    next.setContent(info.contentBefore);
                    next.targets=targets;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.type='precard';
                    if(event.forceDie) next.forceDie=true;
                }
                else if(info.reverseOrder&&get.is.versus()&&targets.length>1){
                    var next=game.createEvent(card.name+'ContentBefore');
                    next.setContent('reverseOrder');
                    next.targets=targets;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.type='precard';
                    if(event.forceDie) next.forceDie=true;
                }
                else if(info.singleCard&&info.filterAddedTarget&&event.addedTargets&&event.addedTargets.length<targets.length){
                    var next=game.createEvent(card.name+'ContentBefore');
                    next.setContent('addExtraTarget');
                    next.target=target;
                    next.targets=targets;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.type='precard';
                    next.addedTarget=event.addedTarget;
                    next.addedTargets=event.addedTargets;
                    if(event.forceDie) next.forceDie=true;
                }
                "step 11"
                if(event.all_excluded) return;
                var info=get.info(card,false);
                if(num==0&&targets.length>1){
                    event.sortTarget(true,true);
                }
                if(targets[num]&&targets[num].isDead()) return;
                if(targets[num]&&targets[num].isOut()) return;
                if(targets[num]&&targets[num].removed) return;
                if(targets[num]&&info.ignoreTarget&&info.ignoreTarget(card,player,targets[num])) return;
                if(targets.length==0&&!info.notarget) return;
                if(targets[num]&&event.excluded.contains(targets[num])){
                var next=game.createEvent('useCardToExcluded',false);
                    next.setContent('emptyEvent');
                    next.targets=targets;
                    next.target=targets[num];
                    next.num=num;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    return;
                };
                var next=game.createEvent(card.name);
                next.setContent(info.content);
                next.targets=targets;
                next.card=card;
                next.cards=cards;
                next.player=player;
                next.num=num;
                next.type='card';
                next.skill=event.skill;
                next.multitarget=info.multitarget;
                next.preResult=event.preResult;
                next.baseDamage=event.baseDamage;
                if(event.forceDie) next.forceDie=true;
                if(event.addedTargets){
                    next.addedTargets=event.addedTargets;
                    next.addedTarget=event.addedTargets[num];
                    next._targets=event._targets;
                }
                if(info.targetDelay===false){
                    event.targetDelay=false;
                }
                next.target=targets[num];
                for(var i in event.customArgs.default) next[i]=event.customArgs.default[i];
                if(next.target&&event.customArgs[next.target.playerid]){
                    var customArgs=event.customArgs[next.target.playerid];
                    for(var i in customArgs) next[i]=customArgs[i];
                }
                if(next.target&&event.directHit.contains(next.target)) next.directHit=true;
                if(next.target&&!info.multitarget){
                    if(num==0&&targets.length>1){
                        // var ttt=next.target;
                        // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
                    }
                    else{
                        next.target.animate('target');
                    }
                }
                if(!info.nodelay&&num>0){
                    if(event.targetDelay!==false){
                        game.delayx(0.5);
                    }
                }
                "step 12"
                if(event.all_excluded) return;
                if(!get.info(event.card,false).multitarget&&num<targets.length-1&&!event.cancelled){
                    event.num++;
                    event.goto(11);
                }
                "step 13"
                if(event.all_excluded) return;
                if(get.info(card,false).contentAfter){
                    var next=game.createEvent(card.name+'ContentAfter');
                    next.setContent(get.info(card,false).contentAfter);
                    next.targets=targets;
                    next.card=card;
                    next.cards=cards;
                    next.player=player;
                    next.skill=event.skill;
                    next.preResult=event.preResult;
                    next.type='postcard';
                    if(event.forceDie) next.forceDie=true;
                }
                "step 14"
                if(event.all_excluded) return;
                if(event.effectedCount<event.effectCount){
                    if(document.getElementsByClassName('thrown').length){
                        if(event.delayx!==false&&get.info(event.card,false).finalDelay!==false) game.delayx();
                    }
                    event.goto(10);
                }
                "step 15"
                if(event.postAi){
                    event.player.logAi(event.targets,event.card);
                }
                if(event._result){
                    event.result=event._result;
                }
                //delete player.using;
                if(document.getElementsByClassName('thrown').length){
                    if(event.delayx!==false&&get.info(event.card,false).finalDelay!==false) game.delayx();
                }
                else{
                    event.finish();
                }
                "step 16"
                event._oncancel();
            },
            useSkill:function(){
                "step 0"
                var info=get.info(event.skill);
                if(!info.noForceDie) event.forceDie=true;
                if(!info.noForceOut) event.includeOut=true;
                event._skill=event.skill;
                game.trySkillAudio(event.skill,player);
                var checkShow=player.checkShow(event.skill);
                if(info.discard!=false&&info.lose!=false&&!info.viewAs){
                    player.discard(cards).delay=false;
                    if(lib.config.low_performance){
                        event.discardTransition=true;
                    }
                }
                else{
                    if(info.lose!=false){
                        if(info.losetrigger==false){
                            var losecard=player.lose(cards,ui.special)._triggered=null;
                        }
                        else{
                            var losecard=player.lose(cards,ui.special);
                            if(info.visible) losecard.visible=true;
                            if(info.loseTo) losecard.position=ui[info.loseTo];
                            if(info.insert) losecard.insert_card=true;
                            if(losecard.position==ui.special&&info.toStorage) losecard.toStorage=true;
                        }
                    }
                    if(!info.prepare&&info.viewAs){
                        player.$throw(cards);
                        if(losecard) losecard.visible=true;
                        if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
                            var waitingForTransition=get.time();
                            event.waitingForTransition=waitingForTransition;
                            cards[0].clone.listenTransition(function(){
                                if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                    game.resume();
                                }
                                delete event.waitingForTransition;
                            });
                        }
                    }
                }
                if(info.line!=false&&targets.length){
                    var config={};
                    if(get.is.object(info.line)) config=info.line;
                    else if(info.line=='fire'){
                        config.color='fire';
                    }
                    else if(info.line=='thunder'){
                        config.color='thunder';
                    }
                    else if(info.line===undefined||info.line=='green'){
                        config.color='green';
                    }
                    if(info.multitarget&&!info.multiline&&targets.length>1){
                        player.line2(targets,config);
                    }
                    else{
                        player.line(targets,config);
                    }
                }
                var str='';
                if(targets&&targets.length&&info.log!='notarget'){
                    str+='对<span class="bluetext">'+(targets[0]==player?'自己':get.translation(targets[0]));
                    for(var i=1;i<targets.length;i++){
                        str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
                    }
                    str+='</span>'
                }
                str+='发动了';
                if(!info.direct&&info.log!==false){
                    game.log(player,str,'【'+get.skillTranslation(skill,player)+'】');
                    if(info.logv!==false) game.logv(player,skill,targets);
                    player.trySkillAnimate(skill,skill,checkShow);
                }
                if(event.addCount!=false){
                    if(player.stat[player.stat.length-1].skill[skill]==undefined){
                        player.stat[player.stat.length-1].skill[skill]=1;
                    }
                    else{
                        player.stat[player.stat.length-1].skill[skill]++;
                    }
                    var sourceSkill=get.info(skill).sourceSkill;
                    if(sourceSkill){
                        if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
                            player.stat[player.stat.length-1].skill[sourceSkill]=1;
                        }
                        else{
                            player.stat[player.stat.length-1].skill[sourceSkill]++;
                        }
                    }
                }
                if(player.stat[player.stat.length-1].allSkills==undefined){
                    player.stat[player.stat.length-1].allSkills=1;
                }
                else{
                    player.stat[player.stat.length-1].allSkills++;
                }
                if(info.prepare){
                    switch(info.prepare){
                        case 'give':if(losecard) losecard.visible=true;player.$give(cards,targets[0]);break;
                        case 'give2':player.$give(cards.length,targets[0]);break;
                        case 'throw':if(losecard) losecard.visible=true;player.$throw(cards);break;
                        case 'throw2':player.$throw(cards.length);break;
                        default:info.prepare(cards,player,targets);
                    }
                }
                if(info.round){
                    var roundname=skill+'_roundcount';
                    player.storage[roundname]=game.roundNumber;
                    player.syncStorage(roundname);
                    player.markSkill(roundname);
                }
                var name=event.skill;
                var players=player.getSkills(false,false,false);
                var equips=player.getSkills('e');
                var global=lib.skill.global.slice(0);
                var logInfo={
                    skill:name,
                    targets:targets,
                    event:_status.event,
                };
                if(info.sourceSkill){
                    logInfo.sourceSkill=info.sourceSkill;
                    if(global.contains(info.sourceSkill)){
                        logInfo.type='global';
                    }
                    else if(players.contains(info.sourceSkill)){
                        logInfo.type='player';
                    }
                    else if(equips.contains(info.sourceSkill)){
                        logInfo.type='equip';
                    }
                }
                else{
                    if(global.contains(name)){
                        logInfo.sourceSkill=name;
                        logInfo.type='global';
                    }
                    else if(players.contains(name)){
                        logInfo.sourceSkill=name;
                        logInfo.type='player';
                    }
                    else if(equips.contains(name)){
                        logInfo.sourceSkill=name;
                        logInfo.type='equip';
                    }
                    else{
                        var bool=false;
                        for(var i of players){
                            var expand=[i];
                            game.expandSkills(expand);
                            if(expand.contains(name)){
                                bool=true;
                                logInfo.sourceSkill=i;
                                logInfo.type='player';
                                break;
                            }
                        }
                        if(!bool){
                            for(var i of players){
                                var expand=[i];
                                game.expandSkills(expand);
                                if(expand.contains(name)){
                                    logInfo.sourceSkill=i;
                                    logInfo.type='equip';
                                    break;
                                }
                            }
                        }
                    }
                }
                event.sourceSkill=logInfo.sourceSkill;
                event.type=logInfo.type;
                player.getHistory('useSkill').push(logInfo);
                event.trigger('useSkill');
                "step 1"
                var info=get.info(event.skill);
                if(info&&info.contentBefore){
                    var next=game.createEvent(event.skill+'ContentBefore');
                    next.setContent(info.contentBefore);
                    next.targets=targets;
                    next.cards=cards;
                    next.player=player;
                    if(event.forceDie) next.forceDie=true;
                    if(event.includeOut) next.includeOut=true;
                }
                "step 2"
                if(!event.skill){
                    console.log('error: no skill',get.translation(event.player),event.player.getSkills());
                    if(event._skill){
                        event.skill=event._skill;
                        console.log(event._skill);
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                var info=get.info(event.skill);
                if(targets[num]&&targets[num].isDead()||
                    targets[num]&&targets[num].isOut()||
                    targets[num]&&targets[num].removed){
                    if(!info.multitarget&&num<targets.length-1){
                        event.num++;
                        event.redo();
                    }
                    return;
                }
                var next=game.createEvent(event.skill);
                next.setContent(info.content);
                next.targets=targets;
                next.cards=cards;
                next.player=player;
                next.num=num;
                next.multitarget=info.multitarget;
                if(num==0&&next.targets.length>1){
                    if(!info.multitarget){
                        lib.tempSortSeat=player;
                        targets.sort(lib.sort.seat);
                        delete lib.tempSortSeat;
                    }
                    for(var i=0;i<targets.length;i++){
                        targets[i].animate('target');
                    }
                }
                next.target=targets[num];
                if(event.forceDie) next.forceDie=true;
                if(event.includeOut) next.includeOut=true;
                if(next.target&&!info.multitarget){
                    if(num==0&&targets.length>1){
                        // var ttt=next.target;
                        // setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
                    }
                    else{
                        next.target.animate('target');
                    }
                }
                if(num==0){
                    if(typeof info.delay=='number') game.delay(info.delay);
                    else if(info.delay!==false&&info.delay!==0){
                        if(event.waitingForTransition){
                            _status.waitingForTransition=event.waitingForTransition;
                            game.pause();
                        }
                        else{
                            game.delayx()
                        }
                    }
                }
                else game.delayx(0.5);
                if(!info.multitarget&&num<targets.length-1){
                    event.num++;
                    event.redo();
                }
                "step 3"
                var info=get.info(event.skill);
                if(info&&info.contentAfter){
                    var next=game.createEvent(event.skill+'ContentAfter');
                    next.setContent(info.contentAfter);
                    next.targets=targets;
                    next.cards=cards;
                    next.player=player;
                    if(event.forceDie) next.forceDie=true;
                    if(event.includeOut) next.includeOut=true;
                }
                "step 4"
                if(player.getStat().allSkills>200){
                    player._noSkill=true;
                    console.log(player.name,event.skill);
                }
                if(document.getElementsByClassName('thrown').length){
                    if(event.skill&&get.info(event.skill).delay!==false&&get.info(event.skill).delay!==0) game.delayx();
                }
                else{
                    event.finish();
                }
                "step 5"
                ui.clear();
            },
            draw:function(){
                // if(lib.config.background_audio){
                // 	game.playAudio('effect','draw');
                // }
                // game.broadcast(function(){
                //     if(lib.config.background_audio){
                // 		game.playAudio('effect','draw');
                // 	}
                // });
                if(typeof event.minnum=='number'&&num<event.minnum){
                    num=event.minnum;
                }
                if(event.drawDeck){
                    if(event.drawDeck>num){
                        event.drawDeck=num;
                    }
                    num-=event.drawDeck;
                }
                if(event.log!=false){
                    if(num>0){
                        if(event.bottom) game.log(player,'从牌堆底摸了'+get.cnNumber(num)+'张牌');
                        else game.log(player,'摸了'+get.cnNumber(num)+'张牌');
                    }
                    if(event.drawDeck){
                        game.log(player,'从牌库中获得了'+get.cnNumber(event.drawDeck)+'张牌');
                    }
                }
                var cards;
                if(num>0){
                    if(event.bottom) cards=get.bottomCards(num);
                    else if(player.getTopCards) cards=player.getTopCards(num);
                    else cards=get.cards(num);
                }
                else{
                    cards=[];
                }
                if(event.drawDeck){
                    cards=cards.concat(player.getDeckCards(event.drawDeck));
                }
                if(event.animate!=false){
                    if(event.visible){
                        var next=player.gain(cards,'gain2');
                        if(event.bottom) game.log(player,'从牌堆底摸了'+get.cnNumber(num)+'张牌（',cards,'）');
                        else game.log(player,'摸了'+get.cnNumber(num)+'张牌（',cards,'）');
                    }
                    else{
                        var next=player.gain(cards,'draw');
                    }
                }
                else{
                    var next=player.gain(cards);
                    if(event.$draw){
                        player.$draw(cards.length);
                    }
                }
                if(event.gaintag) next.gaintag.addArray(event.gaintag);
                event.result=cards;
            },
            discard:function(){
                "step 0"
                game.log(player,'弃置了',cards);
                event.done=player.lose(cards,event.position,'visible');
                event.done.type='discard';
                if(event.discarder) event.done.discarder=event.discarder;
                "step 1"
                event.trigger('discard');
            },
            loseToDiscardpile:function(){
                "step 0"
                if(event.log!=false) game.log(player,'将',cards,'置入了弃牌堆');
                var next=player.lose(cards,event.position);
                if(event.insert_index) next.insert_index=event.insert_index;
                if(event.insert_card) next.insert_card=true;
                if(!event.blank) next.visible=true;
                next.type='loseToDiscardpile';
                event.done=next;
                "step 1"
                event.trigger('loseToDiscardpile');
            },
            respond:function(){
                'step 0'
                var cardaudio=true;
                if(event.skill){
                    if(lib.skill[event.skill].audio){
                        cardaudio=false;
                    }
                    player.logSkill(event.skill);
                    player.checkShow(event.skill,true);
                    if(lib.skill[event.skill].onrespond&&!game.online){
                        lib.skill[event.skill].onrespond(event,player);
                    }
                }
                else if(!event.nopopup) player.tryCardAnimate(card,card.name,'wood');
                if(cardaudio&&event.getParent(3).name=='useCard') game.broadcastAll((player,card)=>{
                    game.playCardAudio(card,player);
                    /*
                    if(!lib.config.background_audio) return;
                    const sex=player.sex=='female'?'female':'male',audio=lib.card[card.name].audio;
                    if(typeof audio=='string'){
                        const audioInfo=audio.split(':');
                        if(audio.startsWith('db:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,audioInfo[2],`${card.name}_${sex}.${audioInfo[3]||'mp3'}`);
                        else if(audio.startsWith('ext:')) game.playAudio(`${audioInfo[0]}:${audioInfo[1]}`,`${card.name}_${sex}.${audioInfo[2]||'mp3'}`);
                        else game.playAudio('card',sex,`${audioInfo[0]}.${audioInfo[1]||'mp3'}`);
                    }
                    else game.playAudio('card',sex,card.name);*/
                },player,card);
                if(event.skill){
                    if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
                        player.stat[player.stat.length-1].skill[event.skill]=1;
                    }
                    else{
                        player.stat[player.stat.length-1].skill[event.skill]++;
                    }
                    var sourceSkill=get.info(event.skill).sourceSkill;
                    if(sourceSkill){
                        if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
                            player.stat[player.stat.length-1].skill[sourceSkill]=1;
                        }
                        else{
                            player.stat[player.stat.length-1].skill[sourceSkill]++;
                        }
                    }
                }
                if(cards.length&&(cards.length>1||cards[0].name!=card.name)){
                    game.log(player,'打出了',card,'（',cards,'）');
                }
                else{
                    game.log(player,'打出了',card);
                }
                player.actionHistory[player.actionHistory.length-1].respond.push(event);
                if(cards.length){
                    var owner=(get.owner(cards[0])||player);
                    var next=owner.lose(cards,'visible',ui.ordering).set('type','use');
                    var directDiscard=[];
                    for(var i=0;i<cards.length;i++){
                        if(!next.cards.contains(cards[i])){
                            directDiscard.push(cards[i]);
                        }
                    }
                    if(directDiscard.length) game.cardsGotoOrdering(directDiscard);
                }
                if(event.animate!=false&&event.throw!==false){
                    for(var i=0;i<cards.length;i++){
                        player.$throw(cards[i]);
                        if(event.highlight){
                            cards[i].clone.classList.add('thrownhighlight');
                            game.addVideo('highlightnode',player,get.cardInfo(cards[i]));
                        }
                    }
                    if(event.highlight){
                        game.broadcast(function(cards){
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].clone){
                                    cards[i].clone.classList.add('thrownhighlight');
                                }
                            }
                        },cards);
                    }
                }
                event.trigger('respond');
                'step 1'
                game.delayx(0.5);
            },
            swapHandcards:function(){
                'step 0'
                event.cards1=event.cards1||player.getCards('h');
                event.cards2=event.cards2||target.getCards('h');
                game.loseAsync({
                    player:player,
                    target:target,
                    cards1:event.cards1,
                    cards2:event.cards2,
                }).setContent('swapHandcardsx');
                'step 1'
                game.loseAsync({
                    gain_list:[
                        [player,event.cards2.filterInD()],
                        [target,event.cards1.filterInD()]
                    ],
                }).setContent('gaincardMultiple');
                'step 2'
                game.delayx();
            },
            swapHandcardsx:function(){
                'step 0'
                player.$giveAuto(event.cards1,target);
                target.$giveAuto(event.cards2,player);
                'step 1'
                event.cards=event.cards1;
                var next=player.lose(event.cards,ui.ordering);
                next.getlx=false;
                next.relatedEvent=event.getParent();
                if(player==game.me){
                    event.delayed=true;
                }
                else{
                    next.delay=false;
                }
                'step 2'
                event.cards=event.cards2;
                var next=target.lose(event.cards,ui.ordering);
                next.getlx=false;
                next.relatedEvent=event.getParent();
                if(target==game.me){
                    event.delayed=true;
                }
                else{
                    next.delay=false;
                }
                'step 3'
                if(!event.delayed) game.delay();
            },
            gainMultiple:function(){
                'step 0'
                event.delayed=false;
                event.num=0;
                event.cards=[];
                'step 1'
                player.gainPlayerCard(targets[num],event.position,true).set('boolline',false).set('delay',num==targets.length-1);
                'step 2'
                if(result.bool){
                    event.cards.addArray(result.cards);
                    if(num==targets.length-1) event.delayed=true;
                }
                event.num++;
                if(event.num<targets.length){
                    event.goto(1);
                }
                'step 3'
                if(!event.delayed) game.delay();
            },
            gain:function(){
                "step 0"
                if(event.animate=='give') event.visible=true;
                if(cards){
                    var map={};
                    for(var i of cards){
                        var owner=get.owner(i,'judge');
                        if(owner&&(owner!=player||get.position(i)!='h')){
                            var id=owner.playerid;
                            if(!map[id]) map[id]=[[],[],[]];
                            map[id][0].push(i);
                            var position=get.position(i);
                            if(position=='h') map[id][1].push(i);
                            else map[id][2].push(i);
                        }
                        else if(!event.updatePile&&get.position(i)=='c') event.updatePile=true;
                    }
                    event.losing_map=map;
                    for(var i in map){
                        var owner=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                        var next=owner.lose(map[i][0],ui.special).set('type','gain').set('forceDie',true).set('getlx',false);
                        if(event.visible==true) next.visible=true;
                        event.relatedLose=next;
                    }
                }
                else{
                    event.finish();
                }
                "step 1"
                for(var i=0;i<cards.length;i++){
                    if(cards[i].destroyed){
                        if(player.hasSkill(cards[i].destroyed)){
                            delete cards[i].destroyed;
                        }
                        else{
                            cards.splice(i--,1);
                        }
                    }
                    else if(event.losing_map){
                        for(var id in event.losing_map){
                            if(event.losing_map[id][0].contains(cards[i])){
                                var source=(_status.connectMode?lib.playerOL:game.playerMap)[id];
                                var hs=source.getCards('hejsx');
                                if(hs.contains(cards[i])){
                                    cards.splice(i--,1);
                                }
                            }
                        }
                    }
                }
                if(cards.length==0){
                    event.finish();
                    return;
                }
                player.getHistory('gain').push(event);
                //if(event.source&&event.delay!==false) game.delayx();
                "step 2"
                if(player.getStat().gain==undefined){
                    player.getStat().gain=cards.length;
                }
                else{
                    player.getStat().gain+=cards.length;
                }
                "step 3"
                var sort;
                var frag1=document.createDocumentFragment();
                var frag2=document.createDocumentFragment();
                var hs=player.getCards('hs');
                for(var i=0;i<cards.length;i++){
                    if(hs.contains(cards[i])){
                        cards.splice(i--,1);
                    }
                }
                for(var num=0;num<cards.length;num++){
                    sort=lib.config.sort_card(cards[num]);
                    if(lib.config.reverse_sort) sort=-sort;
                    cards[num].fix();
                    cards[num].style.transform='';
                    cards[num].addGaintag(event.gaintag);
                    if(_status.discarded){
                        _status.discarded.remove(cards[num]);
                    }
                    // cards[num].vanishtag.length=0;
                    for(var num2=0;num2<cards[num].vanishtag.length;num2++){
                        if(cards[num].vanishtag[num2][0]!='_'){
                            cards[num].vanishtag.splice(num2--,1);
                        }
                    }
                    if(player==game.me){
                        cards[num].classList.add('drawinghidden');
                    }
                    if(get.is.singleHandcard()||sort>1) frag1.appendChild(cards[num]);
                    else frag2.appendChild(cards[num]);
                }
                var addv=function(){
                    if(player==game.me){
                        game.addVideo('gain12',player,[get.cardsInfo(frag1.childNodes),get.cardsInfo(frag2.childNodes),event.gaintag]);
                    }
                };
                var broadcast=function(){
                    game.broadcast(function(player,cards,num,gaintag){
                        player.directgain(cards,null,gaintag);
                        _status.cardPileNum=num;
                    },player,cards,ui.cardPile.childNodes.length,event.gaintag);
                };
                if(event.animate=='draw'){
                    player.$draw(cards.length);
                    game.pause();
                    setTimeout(function(){
                        addv();
                        player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                        player.update();
                        if(player==game.me) ui.updatehl();
                        broadcast();
                        game.resume();
                    },get.delayx(500,500));
                }
                else if(event.animate=='gain'){
                    player.$gain(cards,event.log);
                    game.pause();
                    setTimeout(function(){
                        addv();
                        player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                        player.update();
                        if(player==game.me) ui.updatehl();
                        broadcast();
                        game.resume();
                    },get.delayx(700,700));
                }
                else if(event.animate=='gain2'||event.animate=='draw2'){
                    var gain2t=300;
                    if(player.$gain2(cards,event.log)&&player==game.me){
                        gain2t=500;
                    }
                    game.pause();
                    setTimeout(function(){
                        addv();
                        player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                        player.update();
                        if(player==game.me) ui.updatehl();
                        broadcast();
                        game.resume();
                    },get.delayx(gain2t,gain2t));
                }
                else if(event.animate=='give'||event.animate=='giveAuto'){
                    var evtmap=event.losing_map;
                    if(event.animate=='give'){
                        for(var i in evtmap){
                            var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                            source.$give(evtmap[i][0],player,event.log)
                        }
                    }
                    else{
                        for(var i in evtmap){
                            var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                            if(evtmap[i][1].length) source.$giveAuto(evtmap[i][1],player,event.log);
                            if(evtmap[i][2].length) source.$give(evtmap[i][2],player,event.log);
                        }
                    }
                    game.pause();
                    setTimeout(function(){
                        addv();
                        player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                        player.update();
                        if(player==game.me) ui.updatehl();
                        broadcast();
                        game.resume();
                    },get.delayx(500,500));
                }
                else if(typeof event.animate=='function'){
                    var time=event.animate(event);
                    game.pause();
                    setTimeout(function(){
                        addv();
                        player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                        player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                        player.update();
                        if(player==game.me) ui.updatehl();
                        broadcast();
                        game.resume();
                    },get.delayx(time,time));
                }
                else{
                    addv();
                    player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
                    player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
                    player.update();
                    if(player==game.me) ui.updatehl();
                    broadcast();
                    event.finish();
                }
                "step 4"
                game.delayx();
                if(event.updatePile) game.updateRoundNumber();
            },
            addToExpansion:function(){
                "step 0"
                if(event.animate=='give') event.visible=true;
                if(cards){
                    var map={};
                    for(var i of cards){
                        var owner=get.owner(i,'judge');
                        if(owner&&(owner!=player||get.position(i)!='x')){
                            var id=owner.playerid;
                            if(!map[id]) map[id]=[[],[],[]];
                            map[id][0].push(i);
                            var position=get.position(i);
                            if(position=='h') map[id][1].push(i);
                            else map[id][2].push(i);
                        }
                        else if(!event.updatePile&&get.position(i)=='c') event.updatePile=true;
                    }
                    event.losing_map=map;
                    for(var i in map){
                        var owner=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                        var next=owner.lose(map[i][0],ui.special).set('type','loseToExpansion').set('forceDie',true).set('getlx',false);
                        if(event.visible==true) next.visible=true;
                        event.relatedLose=next;
                    }
                }
                else{
                    event.finish();
                }
                "step 1"
                for(var i=0;i<cards.length;i++){
                    if(cards[i].destroyed){
                        if(player.hasSkill(cards[i].destroyed)){
                            delete cards[i].destroyed;
                        }
                        else{
                            cards.splice(i--,1);
                        }
                    }
                    else if(event.losing_map){
                        for(var id in event.losing_map){
                            if(event.losing_map[id][0].contains(cards[i])){
                                var source=(_status.connectMode?lib.playerOL:game.playerMap)[id];
                                var hs=source.getCards('hejsx');
                                if(hs.contains(cards[i])){
                                    cards.splice(i--,1);
                                }
                            }
                        }
                    }
                }
                if(cards.length==0){
                    event.finish();
                    return;
                }
                "step 2"
                var hs=player.getCards('x');
                for(var i=0;i<cards.length;i++){
                    if(hs.contains(cards[i])){
                        cards.splice(i--,1);
                    }
                }
                for(var num=0;num<cards.length;num++){
                    if(_status.discarded){
                        _status.discarded.remove(cards[num]);
                    }
                    for(var num2=0;num2<cards[num].vanishtag.length;num2++){
                        if(cards[num].vanishtag[num2][0]!='_'){
                            cards[num].vanishtag.splice(num2--,1);
                        }
                    }
                }
                if(event.animate=='draw'){
                    player.$draw(cards.length);
                    if(event.log) game.log(player,'将',get.cnNumber(cards.length),'张牌置于了武将牌上');
                    game.pause();
                    setTimeout(function(){
                        player.$addToExpansion(cards,null,event.gaintag);
                        for(var i of event.gaintag) player.markSkill(i);
                        game.resume();
                    },get.delayx(500,500));
                }
                else if(event.animate=='gain'){
                    player.$gain(cards,false);
                    game.pause();
                    setTimeout(function(){
                        player.$addToExpansion(cards,null,event.gaintag);
                        for(var i of event.gaintag) player.markSkill(i);
                        game.resume();
                    },get.delayx(700,700));
                }
                else if(event.animate=='gain2'||event.animate=='draw2'){
                    var gain2t=300;
                    if(player.$gain2(cards)&&player==game.me){
                        gain2t=500;
                    }
                    game.pause();
                    setTimeout(function(){
                        player.$addToExpansion(cards,null,event.gaintag);
                        for(var i of event.gaintag) player.markSkill(i);
                        game.resume();
                    },get.delayx(gain2t,gain2t));
                }
                else if(event.animate=='give'||event.animate=='giveAuto'){
                    var evtmap=event.losing_map;
                    if(event.animate=='give'){
                        for(var i in evtmap){
                            var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                            source.$give(evtmap[i][0],player,false);
                            if(event.log) game.log(player,'将',evtmap[i][0],'置于了武将牌上');
                        }
                    }
                    else{
                        for(var i in evtmap){
                            var source=(_status.connectMode?lib.playerOL:game.playerMap)[i];
                            if(evtmap[i][1].length){
                                source.$giveAuto(evtmap[i][1],player,false);
                                if(event.log) game.log(player,'将',get.cnNumber(evtmap[i][1].length),'张牌置于了武将牌上');
                            }
                            if(evtmap[i][2].length){
                                source.$give(evtmap[i][2],player,false);
                                if(event.log) game.log(player,'将',evtmap[i][2],'置于了武将牌上');
                            }
                        }
                    }
                    game.pause();
                    setTimeout(function(){
                        player.$addToExpansion(cards,null,event.gaintag);
                        for(var i of event.gaintag) player.markSkill(i);
                        game.resume();
                    },get.delayx(500,500));
                }
                else if(typeof event.animate=='function'){
                    var time=event.animate(event);
                    game.pause();
                    setTimeout(function(){
                        player.$addToExpansion(cards,null,event.gaintag);
                        for(var i of event.gaintag) player.markSkill(i);
                        game.resume();
                    },get.delayx(time,time));
                }
                else{
                    player.$addToExpansion(cards,null,event.gaintag);
                    for(var i of event.gaintag) player.markSkill(i);
                    event.finish();
                }
                "step 4"
                game.delayx();
                if(event.updatePile) game.updateRoundNumber();
            },
            lose:function(){
                "step 0"
                var evt=event.getParent();
                if((evt.name!='discard'||event.type!='discard')&&(evt.name!='loseToDiscardpile'||event.type!='loseToDiscardpile')){
                    event.delay=false;
                    return;
                }
                if(evt.delay===false) event.delay=false;
                if(evt.animate!=false){
                    evt.discardid=lib.status.videoId++;
                    game.broadcastAll(function(player,cards,id,visible){
                        player.$throw(cards,null,'nobroadcast');
                        var cardnodes=[];
                        cardnodes._discardtime=get.time();
                        for(var i=0;i<cards.length;i++){
                            if(cards[i].clone){
                                cardnodes.push(cards[i].clone);
                                if(!visible){
                                    cards[i].clone.classList.add('infohidden');
                                    cards[i].clone.classList.add('infoflip');
                                }
                            }
                        }
                        ui.todiscard[id]=cardnodes;
                    },player,cards,evt.discardid,event.visible);
                    if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
                        if(evt.delay!=false){
                            var waitingForTransition=get.time();
                            evt.waitingForTransition=waitingForTransition;
                            cards[0].clone.listenTransition(function(){
                                if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                    game.resume();
                                }
                                delete evt.waitingForTransition;
                            });
                        }
                        else if(evt.getParent().discardTransition){
                            delete evt.getParent().discardTransition;
                            var waitingForTransition=get.time();
                            evt.getParent().waitingForTransition=waitingForTransition;
                            cards[0].clone.listenTransition(function(){
                                if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                                    game.resume();
                                }
                                delete evt.getParent().waitingForTransition;
                            });
                        }
                    }
                }
                "step 1"
                event.gaintag_map={};
                var hs=[],es=[],js=[],ss=[],xs=[];
                var unmarks=[];
                if(event.insert_card&&event.position==ui.cardPile) event.cards.reverse();
                var hej=player.getCards('hejsx');
                event.stockcards=cards.slice(0);
                for(var i=0;i<cards.length;i++){
                    if(!hej.contains(cards[i])){
                        cards.splice(i--,1);
                        continue;
                    }
                    else if(cards[i].parentNode){
                        if(cards[i].parentNode.classList.contains('equips')){
                            cards[i].original='e';
                            es.push(cards[i]);
                        }
                        else if(cards[i].parentNode.classList.contains('judges')){
                            cards[i].original='j';
                            js.push(cards[i]);
                        }
                        else if(cards[i].parentNode.classList.contains('expansions')){
                            cards[i].original='x';
                            xs.push(cards[i]);
                            if(cards[i].gaintag&&cards[i].gaintag.length) unmarks.addArray(cards[i].gaintag);
                        }
                        else if(cards[i].parentNode.classList.contains('handcards')){
                            if(cards[i].classList.contains('glows')){
                                cards[i].original='s';
                                ss.push(cards[i]);
                            }
                            else{
                                cards[i].original='h';
                                hs.push(cards[i]);
                            }
                        }
                        else{
                            cards[i].original=null;
                        }
                    }
                    if(cards[i].gaintag&&cards[i].gaintag.length){
                        event.gaintag_map[cards[i].cardid]=cards[i].gaintag.slice(0);
                        cards[i].removeGaintag(true);
                    }
                    
                    cards[i].style.transform+=' scale(0.2)';
                    cards[i].classList.remove('glow');
                    cards[i].classList.remove('glows');
                    cards[i].recheck();
                    
                    var info=lib.card[cards[i].name];
                    if(info.destroy||cards[i]._destroy){
                        cards[i].delete();
                        cards[i].destroyed=info.destroy||cards[i]._destroy;
                    }
                    else if(event.position){
                        if(_status.discarded){
                            if(event.position==ui.discardPile){
                                _status.discarded.add(cards[i]);
                            }
                            else{
                                _status.discarded.remove(cards[i]);
                            }
                        }
                        if(event.insert_index){
                            cards[i].fix();
                            event.position.insertBefore(cards[i],event.insert_index(event,cards[i]));
                        }
                        else if(event.insert_card){
                            cards[i].fix();
                            event.position.insertBefore(cards[i],event.position.firstChild);
                        }
                        else if(event.position==ui.cardPile){
                            cards[i].fix();
                            event.position.appendChild(cards[i]);
                        }
                        else cards[i].goto(event.position);
                    }
                    else{
                        cards[i].remove();
                    }
                    //if(ss.contains(cards[i])) cards.splice(i--,1);
                }
                if(player==game.me) ui.updatehl();
                ui.updatej(player);
                game.broadcast(function(player,cards,num){
                    for(var i=0;i<cards.length;i++){
                        cards[i].classList.remove('glow');
                        cards[i].classList.remove('glows');
                        cards[i].fix();
                        cards[i].remove();
                    }
                    if(player==game.me){
                        ui.updatehl();
                    }
                    ui.updatej(player);
                    _status.cardPileNum=num;
                },player,cards,ui.cardPile.childNodes.length);
                game.addVideo('lose',player,[get.cardsInfo(hs),get.cardsInfo(es),get.cardsInfo(js),get.cardsInfo(ss)]);
                event.cards2=hs.concat(es);
                player.getHistory('lose').push(event);
                game.getGlobalHistory().cardMove.push(event);
                player.update();
                game.addVideo('loseAfter',player);
                event.num=0;
                if(event.position==ui.ordering){
                    var evt=event.relatedEvent||event.getParent();
                    if(!evt.orderingCards)	evt.orderingCards=[];
                    if(!evt.noOrdering&&!evt.cardsOrdered){
                        evt.cardsOrdered=true;
                        var next=game.createEvent('orderingDiscard',false,evt.getParent());
                        next.relatedEvent=evt;
                        next.setContent('orderingDiscard');
                    }
                    if(!evt.noOrdering){
                        evt.orderingCards.addArray(cards);
                    }
                }
                else if(event.position==ui.cardPile){
                    game.updateRoundNumber();
                }
                if(unmarks.length){
                    for(var i of unmarks){
                        player[(lib.skill[i]&&lib.skill[i].mark||player.hasCard((card)=>card.hasGaintag(i),'x'))?'markSkill':'unmarkSkill'](i);
                    }
                }
                event.hs=hs;
                event.es=es;
                event.js=js;
                event.ss=ss;
                event.xs=xs;
                "step 2"
                if(num<cards.length){
                    if(event.es.contains(cards[num])){
                        event.loseEquip=true;
                        player.removeEquipTrigger(cards[num]);
                        var info=get.info(cards[num]);
                        if(info.onLose&&(!info.filterLose||info.filterLose(cards[num],player))){
                            event.goto(3);
                            return;
                        }
                    }
                    event.num++;
                    event.redo();
                }
                else{
                    if(event.loseEquip){
                        player.addEquipTrigger();
                    }
                    event.goto(4);
                }
                "step 3"
                var info=get.info(cards[num]);
                if(info.loseDelay!=false&&(player.isAlive()||info.forceDie)){
                    player.popup(cards[num].name);
                    game.delayx();
                }
                if(Array.isArray(info.onLose)){
                    for(var i=0;i<info.onLose.length;i++){
                        var next=game.createEvent('lose_'+cards[num].name);
                        next.setContent(info.onLose[i]);
                        if(info.forceDie) next.forceDie=true;
                        next.player=player;
                        next.card=cards[num];
                    }
                }
                else{
                    var next=game.createEvent('lose_'+cards[num].name);
                    next.setContent(info.onLose);
                    next.player=player;
                    if(info.forceDie) next.forceDie=true;
                    next.card=cards[num];
                }
                event.num++;
                event.goto(2);
                "step 4"
                if(event.toRenku){
                    _status.renku.addArray(cards.filter(function(card){
                        return !card.destroyed;
                    }));
                    if(_status.renku.length>6){
                        var cards=_status.renku.splice(0,_status.renku.length-6);
                        game.log(cards,'从仁库进入了弃牌堆');
                        game.cardsDiscard(cards).set('outRange',true).fromRenku=true;
                    }
                    game.updateRenku();
                }
                "step 5"
                var evt=event.getParent();
                if((evt.name!='discard'&&event.type!='discard')&&(evt.name!='loseToDiscardpile'&&event.type!='loseToDiscardpile')) return;
                if(event.animate===false||event.delay===false) return;
                if(evt.delay!=false){
                    if(evt.waitingForTransition){
                        _status.waitingForTransition=evt.waitingForTransition;
                        game.pause();
                    }
                    else{
                        game.delayx();
                    }
                }
            },
            damage:function(){
                "step 0"
                event.forceDie=true;
                if(event.unreal) event.goto(4)
                event.trigger('damageBegin1');
                "step 1"
                event.trigger('damageBegin2');
                "step 2"
                event.trigger('damageBegin3');
                "step 3"
                event.trigger('damageBegin4');
                "step 4"
                //moved changeHujia to changeHp
                if(player.hujia>0 && !player.hasSkillTag('nohujia')){
                    var damageAudioInfo = lib.natureAudio.hujia_damage[event.nature];
                    if(!damageAudioInfo || damageAudioInfo == 'normal'){
                        damageAudioInfo = 'effect/hujia_damage'+(num>1?'2':'')+'.mp3';
                    }else if(damageAudioInfo == 'default'){
                        damageAudioInfo = 'effect/hujia_damage_'+event.nature+(num>1?'2':'')+'.mp3';
                    }else{
                        damageAudioInfo = damageAudioInfo[num >1 ?2:1];
                    }
                    game.broadcastAll(function(damageAudioInfo){
                        if(lib.config.background_audio) game.playAudio(damageAudioInfo);
                    },damageAudioInfo);
                }else{
                    var damageAudioInfo = lib.natureAudio.damage[event.nature];
                    if(!damageAudioInfo || damageAudioInfo == 'normal'){
                        damageAudioInfo = 'effect/damage'+(num>1?'2':'')+'.mp3';
                    }else if(damageAudioInfo == 'default'){
                        damageAudioInfo = 'effect/damage_'+event.nature+(num>1?'2':'')+'.mp3';
                    }else{
                        damageAudioInfo = damageAudioInfo[num >1 ?2:1];
                    }
                    game.broadcastAll(function(damageAudioInfo){
                        if(lib.config.background_audio) game.playAudio(damageAudioInfo);
                    },damageAudioInfo);
                }
                var str=event.unreal?'视为受到了':'受到了';
                if(source) str+='来自<span class="bluetext">'+(source==player?'自己':get.translation(source))+'</span>的';
                str+=get.cnNumber(num)+'点';
                if(event.nature) str+=get.translation(event.nature)+'属性';
                str+='伤害';
                game.log(player,str);
                if(player.stat[player.stat.length-1].damaged==undefined){
                    player.stat[player.stat.length-1].damaged=num;
                }
                else{
                    player.stat[player.stat.length-1].damaged+=num;
                }
                if(source){
                    source.getHistory('sourceDamage').push(event);
                    if(source.stat[source.stat.length-1].damage==undefined){
                        source.stat[source.stat.length-1].damage=num;
                    }
                    else{
                        source.stat[source.stat.length-1].damage+=num;
                    }
                }
                player.getHistory('damage').push(event);
                if(!event.unreal){
                    if(event.notrigger){
                        player.changeHp(-num,false)._triggered=null;
                    }
                    else{
                        player.changeHp(-num,false);
                    }
                }
                if(event.animate!==false){
                    player.$damage(source);
                    var natures=(event.nature||'').split(lib.natureSeparator);
                    game.broadcastAll(function(natures,player){
                        if(lib.config.animation&&!lib.config.low_performance){
                            if(natures.includes('fire')){
                                player.$fire();
                            }
                            if(natures.includes('thunder')){
                                player.$thunder();
                            }
                        }
                    },natures,player);
                    var numx=Math.max(0,num-player.hujia);
                    player.$damagepop(-numx,natures[0]);
                }
                if(event.unreal) event.goto(6)
                if(!event.notrigger){
                    if(num==0){
                        event.trigger('damageZero');
                        event._triggered=null;
                    }
                    else{
                        event.trigger('damage');
                    }
                }
                "step 5"
                if(player.hp<=0&&player.isAlive()&&!event.nodying){
                    game.delayx();
                    event._dyinged=true;
                    player.dying(event);
                }
                if(source&&lib.config.border_style=='auto'){
                    var dnum=0;
                    for(var j=0;j<source.stat.length;j++){
                        if(source.stat[j].damage!=undefined) dnum+=source.stat[j].damage;
                    }
                    if(dnum>=2){
                        if(lib.config.autoborder_start=='silver'){
                            dnum+=4;
                        }
                        else if(lib.config.autoborder_start=='gold'){
                            dnum+=8;
                        }
                    }
                    if(lib.config.autoborder_count=='damage'){
                        source.node.framebg.dataset.decoration='';
                        if(dnum>=10){
                            source.node.framebg.dataset.auto='gold';
                            if(dnum>=12) source.node.framebg.dataset.decoration='gold';
                        }
                        else if(dnum>=6){
                            source.node.framebg.dataset.auto='silver';
                            if(dnum>=8) source.node.framebg.dataset.decoration='silver';
                        }
                        else if(dnum>=2){
                            source.node.framebg.dataset.auto='bronze';
                            if(dnum>=4) source.node.framebg.dataset.decoration='bronze';
                        }
                        if(dnum>=2){
                            source.classList.add('topcount');
                        }
                    }
                    else if(lib.config.autoborder_count=='mix'){
                        source.node.framebg.dataset.decoration='';
                        switch(source.node.framebg.dataset.auto){
                            case 'bronze':if(dnum>=4) source.node.framebg.dataset.decoration='bronze';break;
                            case 'silver':if(dnum>=8) source.node.framebg.dataset.decoration='silver';break;
                            case 'gold':if(dnum>=12) source.node.framebg.dataset.decoration='gold';break;
                        }
                    }
                }
                "step 6"
                if(!event.notrigger) event.trigger('damageSource');
            },
            recover:function(){
                if(lib.config.background_audio){
                    game.playAudio('effect','recover');
                }
                game.broadcast(function(){
                    if(lib.config.background_audio){
                        game.playAudio('effect','recover');
                    }
                });
                if(num>player.maxHp-player.hp){
                    num=player.maxHp-player.hp;
                    event.num=num;
                }
                if(num>0){
                    player.changeHp(num,false);
                    game.broadcastAll(function(player){
                        if(lib.config.animation&&!lib.config.low_performance){
                            player.$recover();
                        }
                    },player);
                    player.$damagepop(num,'wood');
                    game.log(player,'回复了'+get.cnNumber(num)+'点体力')
                }
            },
            loseHp:function(){
                "step 0"
                if(lib.config.background_audio){
                    game.playAudio('effect','loseHp');
                }
                game.broadcast(function(){
                    if(lib.config.background_audio){
                        game.playAudio('effect','loseHp');
                    }
                });
                game.log(player,'失去了'+get.cnNumber(num)+'点体力')
                player.changeHp(-num);
                "step 1"
                if(player.hp<=0&&!event.nodying){
                    game.delayx();
                    event._dyinged=true;
                    player.dying(event);
                }
            },
            doubleDraw:function(){
                "step 0"
                player.chooseBool('你的主副将体力上限之和是奇数，是否摸一张牌？');
                "step 1"
                if(result.bool){
                    player.draw();
                }
            },
            loseMaxHp:function(){
                "step 0"
                game.log(player,'减少了'+get.cnNumber(num)+'点体力上限');
                player.maxHp-=num;
                event.loseHp=Math.max(0,player.hp-player.maxHp);
                player.update();
                "step 1"
                if(player.maxHp<=0){
                    player.die(event);
                }
            },
            gainMaxHp:function(){
                "step 0"
                game.log(player,'增加了'+get.cnNumber(num)+'点体力上限');
                player.maxHp+=num;
                player.update();
            },
            changeHp:function(){
                //add to GlobalHistory
                game.getGlobalHistory().changeHp.push(event);
                //changeHujia moved here
                if(num<0&&player.hujia>0&&event.getParent().name=='damage'&&!player.hasSkillTag('nohujia')){
                    event.hujia=Math.min(-num,player.hujia);
                    event.getParent().hujia=event.hujia;
                    event.num+=event.hujia;
                    game.log(player,'的护甲抵挡了'+get.cnNumber(event.hujia)+'点伤害');
                    player.changeHujia(-event.hujia).type='damage';
                }
                //old part
                num=event.num;
                player.hp+=num;
                if(isNaN(player.hp)) player.hp=0;
                if(player.hp>player.maxHp) player.hp=player.maxHp;
                player.update();
                if(event.popup!==false){
                    player.$damagepop(num,'water');
                }
                if(_status.dying.contains(player)&&player.hp>0){
                    _status.dying.remove(player);
                    game.broadcast(function(list){
                        _status.dying=list;
                    },_status.dying);
                    var evt=event.getParent('_save');
                    if(evt&&evt.finish) evt.finish();
                    evt=event.getParent('dying');
                    if(evt&&evt.finish) evt.finish()
                }
                event.trigger('changeHp');
            },
            changeHujia:function(){
                player.hujia+=num;
                if(num>0){
                    game.log(player,'获得了'+get.cnNumber(num)+'点护甲');
                }
                if(player.hujia<0){
                    player.hujia=0;
                }
                player.update();
            },
            dying:function(){
                "step 0"
                event.forceDie=true;
                if(player.isDying()||player.hp>0){
                    event.finish();
                    return;
                }
                _status.dying.unshift(player);
                game.broadcast(function(list){
                    _status.dying=list;
                },_status.dying);
                event.trigger('dying');
                game.log(player,'濒死');
                "step 1"
                delete event.filterStop;
                if(player.hp>0||event.nodying){
                    _status.dying.remove(player);
                    game.broadcast(function(list){
                        _status.dying=list;
                    },_status.dying);
                    event.finish();
                }
                else if(!event.skipTao){
                    var next=game.createEvent('_save');
                    var start=false;
                    var starts=[_status.currentPhase,event.source,event.player,game.me,game.players[0]];
                    for(var i=0;i<starts.length;i++){
                        if(get.itemtype(starts[i])=='player'){
                            start=starts[i];break;
                        }
                    }
                    next.player=start;
                    next._trigger=event;
                    next.triggername='_save';
                    next.forceDie=true;
                    next.setContent(lib.skill._save.content);
                }
                "step 2"
                _status.dying.remove(player);
                game.broadcast(function(list){
                    _status.dying=list;
                },_status.dying);
                if(player.hp<=0&&!event.nodying&&!player.nodying) player.die(event.reason);
            },
            die:function(){
                "step 0"
                event.forceDie=true;
                if(_status.roundStart==player){
                    _status.roundStart=player.next||player.getNext()||game.players[0];
                }
                if(ui.land&&ui.land.player==player){
                    game.addVideo('destroyLand');
                    ui.land.destroy();
                }
                var unseen=false;
                if(player.classList.contains('unseen')){
                    player.classList.remove('unseen');
                    unseen=true;
                }
                var logvid=game.logv(player,'die',source);
                event.logvid=logvid;
                if(unseen){
                    player.classList.add('unseen');
                }
                if(source){
                    game.log(player,'被',source,'杀害');
                    if(source.stat[source.stat.length-1].kill==undefined){
                        source.stat[source.stat.length-1].kill=1;
                    }
                    else{
                        source.stat[source.stat.length-1].kill++;
                    }
                }
                else{
                    game.log(player,'阵亡')
                }
                
                
                // player.removeEquipTrigger();
                
                // for(var i in lib.skill.globalmap){
                //     if(lib.skill.globalmap[i].contains(player)){
                //      			lib.skill.globalmap[i].remove(player);
                //      			if(lib.skill.globalmap[i].length==0&&!lib.skill[i].globalFixed){
                //      						 game.removeGlobalSkill(i);
                //      			}
                //     }
                // }
                game.broadcastAll(function(player){
                    player.classList.add('dead');
                    player.removeLink();
                    player.classList.remove('turnedover');
                    player.classList.remove('out');
                    player.node.count.innerHTML='0';
                    player.node.hp.hide();
                    player.node.equips.hide();
                    player.node.count.hide();
                    player.previous.next=player.next;
                    player.next.previous=player.previous;
                    game.players.remove(player);
                    game.dead.push(player);
                    _status.dying.remove(player);

                    if(lib.config.background_speak){
                        if(lib.character[player.name]&&lib.character[player.name][4].some(tag=>/^die:.+$/.test(tag))){
                            var tag=lib.character[player.name][4].find(tag=>/^die:.+$/.test(tag));
                            var reg=new RegExp("^ext:(.+)?/");
                            var match=tag.match(/^die:(.+)$/);
                            if(match){
                                var path=match[1];
                                if(reg.test(path)) path=path.replace(reg,(_o,p)=>`../extension/${p}/`);
                                game.playAudio(path);
                            }
                        }
                        else if(lib.character[player.name]&&lib.character[player.name][4].some(tag=>tag.startsWith('die_audio'))){
                            var tag=lib.character[player.name][4].find(tag=>tag.startsWith('die_audio'));
                            var list=tag.split(':').slice(1);
                            game.playAudio('die',list.length?list[0]:player.name);
                        }
                        else{
                            game.playAudio('die',player.name,function(){
                                game.playAudio('die',player.name.slice(player.name.indexOf('_')+1));
                            });
                        }
                    }
                },player);

                game.addVideo('diex',player);
                if(event.animate!==false){
                    player.$die(source);
                }
                if(player.hp!=0){
                    player.changeHp(0-player.hp,false).forceDie=true;
                }
                "step 1"
                if(player.dieAfter) player.dieAfter(source);
                "step 2"
                event.trigger('die');
                "step 3"
                if(player.isDead()){
                    if(!game.reserveDead){
                        for(var mark in player.marks){
                            player.unmarkSkill(mark);
                        }
                        while(player.node.marks.childNodes.length>1){
                            player.node.marks.lastChild.remove();
                        }
                        game.broadcast(function(player){
                            while(player.node.marks.childNodes.length>1){
                                player.node.marks.lastChild.remove();
                            }
                        },player);
                    }
                    for(var i in player.tempSkills){
                        player.removeSkill(i);
                    }
                    var skills=player.getSkills();
                    for(var i=0;i<skills.length;i++){
                        if(lib.skill[skills[i]].temp){
                            player.removeSkill(skills[i]);
                        }
                    }
                    if(_status.characterlist){
                        if(lib.character[player.name]&&!player.name.startsWith('gz_shibing')&&!player.name.startsWith('gz_jun_')) _status.characterlist.add(player.name);
                        if(lib.character[player.name1]&&!player.name1.startsWith('gz_shibing')&&!player.name1.startsWith('gz_jun_')) _status.characterlist.add(player.name1);
                        if(lib.character[player.name2]&&!player.name2.startsWith('gz_shibing')&&!player.name2.startsWith('gz_jun_')) _status.characterlist.add(player.name2);
                    }
                    event.cards=player.getCards('hejsx');
                    if(event.cards.length){
                        player.discard(event.cards).forceDie=true;
                        //player.$throw(event.cards,1000);
                    }
                }
                "step 4"
                if(player.dieAfter2) player.dieAfter2(source);
                "step 5"
                game.broadcastAll(function(player){
                    if(game.online&&player==game.me&&!_status.over&&!game.controlOver&&!ui.exit){
                        if(lib.mode[lib.configOL.mode].config.dierestart){
                            ui.create.exit();
                        }
                    }
                },player);
                if(!_status.connectMode&&player==game.me&&!_status.over&&!game.controlOver){
                    ui.control.show();
                    if(get.config('revive')&&lib.mode[lib.config.mode].config.revive&&!ui.revive){
                        ui.revive=ui.create.control('revive',ui.click.dierevive);
                    }
                    if(get.config('continue_game')&&!ui.continue_game&&lib.mode[lib.config.mode].config.continue_game&&!_status.brawl&&!game.no_continue_game){
                        ui.continue_game=ui.create.control('再战',game.reloadCurrent);
                    }
                    if(get.config('dierestart')&&lib.mode[lib.config.mode].config.dierestart&&!ui.restart){
                        ui.restart=ui.create.control('restart',game.reload);
                    }
                }

                if(!_status.connectMode&&player==game.me&&!game.modeSwapPlayer){
                    // _status.auto=false;
                    if(ui.auto){
                        // ui.auto.classList.remove('glow');
                        ui.auto.hide();
                    }
                    if(ui.wuxie) ui.wuxie.hide();
                }
                
                if(typeof _status.coin=='number'&&source&&!_status.auto){
                    if(source==game.me||source.isUnderControl()){
                        _status.coin+=10;
                    }
                }
                if(source&&lib.config.border_style=='auto'&&(lib.config.autoborder_count=='kill'||lib.config.autoborder_count=='mix')){
                    switch(source.node.framebg.dataset.auto){
                        case 'gold':case 'silver':source.node.framebg.dataset.auto='gold';break;
                        case 'bronze':source.node.framebg.dataset.auto='silver';break;
                        default:source.node.framebg.dataset.auto=lib.config.autoborder_start||'bronze';
                    }
                    if(lib.config.autoborder_count=='kill'){
                        source.node.framebg.dataset.decoration=source.node.framebg.dataset.auto;
                    }
                    else{
                        var dnum=0;
                        for(var j=0;j<source.stat.length;j++){
                            if(source.stat[j].damage!=undefined) dnum+=source.stat[j].damage;
                        }
                        source.node.framebg.dataset.decoration='';
                        switch(source.node.framebg.dataset.auto){
                            case 'bronze':if(dnum>=4) source.node.framebg.dataset.decoration='bronze';break;
                            case 'silver':if(dnum>=8) source.node.framebg.dataset.decoration='silver';break;
                            case 'gold':if(dnum>=12) source.node.framebg.dataset.decoration='gold';break;
                        }
                    }
                    source.classList.add('topcount');
                }
            },
            addJudge:function(){
                "step 0"
                if(cards){
                    var owner=get.owner(cards[0]);
                    if(owner){
                        event.relatedLose=owner.lose(cards,'visible',ui.special).set('getlx',false);
                    }
                    else if(get.position(cards[0])=='c') event.updatePile=true;
                }
                "step 1"
                if(cards[0].destroyed){
                    if(player.hasSkill(cards[0].destroyed)){
                        delete cards[0].destroyed;
                    }
                    else{
                        event.finish();
                        return;
                    }
                }
                else if(event.relatedLose){
                    var owner=event.relatedLose.player;
                    if(owner.getCards('hejsx').contains(card)){
                        event.finish();
                        return;
                    }
                }
                cards[0].fix();
                cards[0].style.transform='';
                cards[0].classList.remove('drawinghidden');
                delete cards[0]._transform;
                var viewAs=typeof card=='string'?card:card.name;
                if(!lib.card[viewAs]||!lib.card[viewAs].effect){
                    game.cardsDiscard(cards[0]);
                }
                else{
                    cards[0].style.transform='';
                    cards[0].classList.add('drawinghidden');
                    player.node.judges.insertBefore(cards[0],player.node.judges.firstChild);
                    if(_status.discarded){
                        _status.discarded.remove(cards[0]);
                    }
                    ui.updatej(player);
                    game.broadcast(function(player,card,viewAs){
                        card.fix();
                        card.style.transform='';
                        card.classList.add('drawinghidden');
                        card.viewAs=viewAs;
                        if(viewAs&&viewAs!=card.name&&(card.classList.contains('fullskin')||card.classList.contains('fullborder'))){
                            card.classList.add('fakejudge');
                            card.node.background.innerHTML=lib.translate[viewAs+'_bg']||get.translation(viewAs)[0]
                        }
                        else{
                            card.classList.remove('fakejudge');
                        }
                        player.node.judges.insertBefore(card,player.node.judges.firstChild);
                        ui.updatej(player);
                        if(card.clone&&(card.clone.parentNode==player.parentNode||card.clone.parentNode==ui.arena)){
                            card.clone.moveDelete(player);
                            game.addVideo('gain2',player,get.cardsInfo([card]));
                        }
                    },player,cards[0],viewAs);
                    if(cards[0].clone&&(cards[0].clone.parentNode==player.parentNode||cards[0].clone.parentNode==ui.arena)){
                        cards[0].clone.moveDelete(player);
                        game.addVideo('gain2',player,get.cardsInfo(cards));
                    }
                    // player.$gain2(cards);
                    if(get.itemtype(card)!='card'){
                        if(typeof card=='string') cards[0].viewAs=card;
                        else cards[0].viewAs=card.name;
                    }
                    else{
                        delete cards[0].viewAs;
                    }
                    if(cards[0].viewAs&&cards[0].viewAs!=cards[0].name){
                        if(cards[0].classList.contains('fullskin')||cards[0].classList.contains('fullborder')){
                            cards[0].classList.add('fakejudge');
                            cards[0].node.background.innerHTML=lib.translate[cards[0].viewAs+'_bg']||get.translation(cards[0].viewAs)[0];
                        }
                        game.log(player,'被贴上了<span class="yellowtext">'+get.translation(cards[0].viewAs)+'</span>（',cards,'）');
                    }
                    else{
                        cards[0].classList.remove('fakejudge');
                        game.log(player,'被贴上了',cards);
                    }
                    game.addVideo('addJudge',player,[get.cardInfo(cards[0]),cards[0].viewAs]);
                }
                if(event.updatePile) game.updateRoundNumber();
            },
            judge:function(){
                "step 0"
                var judgestr=get.translation(player)+'的'+event.judgestr+'判定';
                event.videoId=lib.status.videoId++;
                var cardj=event.directresult;
                if(!cardj){
                    if(player.getTopCards) cardj=player.getTopCards()[0];
                    else cardj=get.cards()[0];
                }
                var owner=get.owner(cardj);
                if(owner){
                    owner.lose(cardj,'visible',ui.ordering);
                }
                else{
                    var nextj=game.cardsGotoOrdering(cardj);
                    if(event.position!=ui.discardPile) nextj.noOrdering=true;
                }
                player.judging.unshift(cardj);
                game.addVideo('judge1',player,[get.cardInfo(player.judging[0]),judgestr,event.videoId]);
                game.broadcastAll(function(player,card,str,id,cardid){
                    var event;
                    if(game.online){
                        event={};
                    }
                    else{
                        event=_status.event;
                    }
                    if(game.chess){
                        event.node=card.copy('thrown','center',ui.arena).animate('start');
                    }
                    else{
                        event.node=player.$throwordered(card.copy(),true);
                    }
                    if(lib.cardOL) lib.cardOL[cardid]=event.node;
                    event.node.cardid=cardid;
                    event.node.classList.add('thrownhighlight');
                    ui.arena.classList.add('thrownhighlight');
                    event.dialog=ui.create.dialog(str);
                    event.dialog.classList.add('center');
                    event.dialog.videoId=id;
                },player,player.judging[0],judgestr,event.videoId,get.id());

                game.log(player,'进行'+event.judgestr+'判定，亮出的判定牌为',player.judging[0]);
                game.delay(2);
                if(!event.noJudgeTrigger) event.trigger('judge');
                "step 1"
                event.result={
                    card:player.judging[0],
                    name:player.judging[0].name,
                    number:get.number(player.judging[0]),
                    suit:get.suit(player.judging[0]),
                    color:get.color(player.judging[0]),
                    node:event.node,
                };
                if(event.fixedResult){
                    for(var i in event.fixedResult){
                        event.result[i]=event.fixedResult[i];
                    }
                }
                event.result.judge=event.judge(event.result);
                if(event.result.judge>0) event.result.bool=true;
                else if(event.result.judge<0) event.result.bool=false;
                else event.result.bool=null;
                player.judging.shift();
                game.checkMod(player,event.result,'judge',player);
                if(event.judge2){
                    var judge2=event.judge2(event.result);
                    if(typeof judge2=='boolean') player.tryJudgeAnimate(judge2);
                };
                if(event.clearArena!=false){
                    game.broadcastAll(ui.clear);
                }
                game.broadcast(function(id){
                    var dialog=get.idDialog(id);
                    if(dialog){
                        dialog.close();
                    }
                    ui.arena.classList.remove('thrownhighlight');
                },event.videoId);
                event.dialog.close();
                game.addVideo('judge2',null,event.videoId);
                ui.arena.classList.remove('thrownhighlight');
                game.log(player,'的判定结果为',event.result.card);
                event.trigger('judgeFixing');
                if(event.callback){
                    var next=game.createEvent('judgeCallback',false);
                    next.player=player;
                    next.card=event.result.card;
                    next.judgeResult=get.copy(event.result);
                    next.setContent(event.callback);
                }
                else{
                    if(!get.owner(event.result.card)){
                        if(event.position!=ui.discardPile) event.position.appendChild(event.result.card);
                    }
                }
            },
            turnOver:function(){
                game.log(player,'翻面');
                player.classList.toggle('turnedover');
                game.broadcast(function(player){
                    player.classList.toggle('turnedover');
                },player);
                game.addVideo('turnOver',player,player.classList.contains('turnedover'));
            },
            link:function(){
                if(player.isLinked()){
                    game.log(player,'解除连环');
                }
                else{
                    game.log(player,'被连环');
                }
                if(lib.config.background_audio){
                    game.playAudio('effect','link');
                }
                game.broadcast(function(){
                    if(lib.config.background_audio){
                        game.playAudio('effect','link');
                    }
                });
                player.classList.remove('target');
                if(get.is.linked2(player)){
                    player.classList.toggle('linked2');
                }
                else{
                    player.classList.toggle('linked');
                }
                ui.updatej(player);
                ui.updatem(player);
                game.broadcast(function(player,linked){
                    player.classList.remove('target');
                    if(get.is.linked2(player)){
                        if(linked){
                            player.classList.add('linked2');
                        }
                        else{
                            player.classList.remove('linked2');
                        }
                    }
                    else{
                        if(linked){
                            player.classList.add('linked');
                        }
                        else{
                            player.classList.remove('linked');
                        }
                    }
                    ui.updatej(player);
                    ui.updatem(player);
                },player,player.isLinked());
                game.addVideo('link',player,player.isLinked());
            },
            chooseToGuanxing:function(){
                "step 0"
                var cards=get.cards(num);
                game.cardsGotoOrdering(cards);
                var next=player.chooseToMove();
                next.set('list',[
                    ['牌堆顶',cards],
                    ['牌堆底'],
                ]);
                next.set('prompt','点击将牌移动到牌堆顶或牌堆底');
                next.processAI=event.processAI||function(list){
                    var cards=list[0][1],player=_status.event.player;
                    var top=[];
                    var bottom;
                    cards.sort(function(a,b){
                        return get.value(b,player)-get.value(a,player);
                    });
                    while(cards.length){
                        if(get.value(cards[0],player)<=5) break;
                        top.unshift(cards.shift());
                    }
                    bottom=cards;
                    return [top,bottom];
                };
                "step 1"
                var top=result.moved[0];
                var bottom=result.moved[1];
                top.reverse();
                for(var i=0;i<top.length;i++){
                    ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
                }
                for(i=0;i<bottom.length;i++){
                    ui.cardPile.appendChild(bottom[i]);
                }
                player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
                game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
                game.updateRoundNumber();
                game.delayx();
            },
        },
        player:{
            //新函数
            /**
             * version 1.4
             * 
             * 链式创建一次性技能的api。
             *
             * 使用者只需要关注技能的效果，而不是技能的本身。
             */
            when:function(){
                if(!_status.postReconnect.player_when) _status.postReconnect.player_when=[
                    function(map){
                        "use strict";
                        for(let i in map){
                            lib.skill[i]={
                                charlotte:true,
                                forced:true,
                                popup:false,
                            }
                            if(typeof map[i]=='string') lib.translate[i]=map[i];
                        }
                    },{}
                ];
                let triggerNames=Array.from(arguments);
                let trigger;
                if(triggerNames.length==0) throw 'player.when的参数数量应大于0';
                //add other triggerNames
                //arguments.length = 1
                if(triggerNames.length==1){
                    //以下两种情况:
                    //triggerNames = [ ['xxAfter', ...args] ]
                    //triggerNames = [ 'xxAfter' ]
                    if(Array.isArray(triggerNames[0])||typeof triggerNames[0]=='string') trigger={player:triggerNames[0]};
                    //triggerNames = [ {player:'xxx'} ]
                    else if(get.is.object(triggerNames[0])) trigger=triggerNames[0];
                }
                //arguments.length > 1
                else{
                    //triggerNames = [ 'xxAfter', 'yyBegin' ]
                    if(triggerNames.every(t=>typeof t=='string')) trigger={player:triggerNames};
                    //triggerNames = [ {player: 'xxAfter'}, {global: 'yyBegin'} ]
                    //此处不做特殊的合并处理，由使用者自行把握
                    else if(triggerNames.every(t=>get.is.object(t))) trigger=triggerNames.reduce((pre,cur)=>Object.assign(pre,cur));
                }
                if(!trigger) throw 'player.when传参数类型错误:'+triggerNames;
                let skillName;
                do{
                    skillName='player_when_'+Math.random().toString(36).slice(-8);
                }while(lib.skill[skillName]!=null);
                let after=`${skillName}After`;
                if(!trigger.player) trigger.player=after;
                else if(Array.isArray(trigger.player)) trigger.player.add(after);
                else if(typeof trigger.player=='string') trigger.player=[trigger.player,after];
                let skill={
                    trigger,
                    forced:true,
                    charlotte:true,
                    popup:false,
                    //必要条件
                    filterFuns:[],
                    //充分条件
                    filter2Funs:[],
                    contentFuns:[],
                    get filter(){
                        return (event,player,name)=>{
                            if(name==`${skillName}After`){
                                skill.popup=false;
                                return true;
                            }
                            return skill.filterFuns.every(fun=>Boolean(fun(event,player,name)))&&
                                skill.filter2(event,player,name);
                        }
                    },
                    get filter2(){
                        return (event,player,name)=>{
                            return skill.filter2Funs.length==0||
                            skill.filter2Funs.some(fun=>Boolean(fun(event,player,name)));
                        };
                    }
                };
                Object.defineProperty(lib.skill,skillName,{
                    configurable:true,
                    //这类技能不需要被遍历到
                    enumerable:false,
                    writable:true,
                    value:skill
                });
                game.broadcast(function(skillName){
                    Object.defineProperty(lib.skill,skillName,{
                        configurable:true,
                        enumerable:false,
                        writable:true,
                        value:{
                            forced:true,
                            charlotte:true,
                            popup:false,
                        }
                    });
                },skillName);
                this.addSkill(skillName);
                _status.postReconnect.player_when[1][skillName]=true;
                return{
                    filter(fun){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        skill.filterFuns.push(fun);
                        return this;
                    },
                    removeFilter(fun){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        skill.filterFuns.remove(fun);
                        return this;
                    },
                    filter2(fun){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        skill.filter2Funs.push(fun);
                        return this;
                    },
                    removeFilter2(fun){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        skill.filter2Funs.remove(fun);
                        return this;
                    },
                    then(fun){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        skill.contentFuns.push(fun);
                        let str=`
                            function content(){
                                if(event.triggername=='${skillName}After'){
                                    player.removeSkill('${skillName}');
                                    delete lib.skill['${skillName}'];
                                    delete lib.translate['${skillName}'];
                                    return event.finish();
                                }
                        `;
                        for(let i=0;i<skill.contentFuns.length;i++){
                            let fun2=skill.contentFuns[i];
                            let a=fun2.toString();
                            let str2=a.slice(a.indexOf("{")+1,a.lastIndexOf("}")!=-1?a.lastIndexOf("}"):undefined).trim();
                            str+=`'step ${i}'\n\t${str2}\n\t`;
                        }
                        let result=eval(str+`\n};content;`);
                        skill.content=result;
                        return this;
                    },
                    popup(str){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        if(typeof str=='string') skill.popup=str;
                        return this;
                    },
                    translation(translation){
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        if(typeof translation=='string'){
                            _status.postReconnect.player_when[1][skillName]=translation;
                            game.broadcastAll((skillName,translation)=>lib.translate[skillName]=translation,skillName,translation)
                        }
                        return this;
                    },
                    assign(obj) {
                        if(lib.skill[skillName]!=skill) throw `This skill has been destroyed`;
                        if(typeof obj=='object'&&obj!==null) Object.assign(skill,obj);
                        return this;
                    }
                };
            },
            //让一名角色明置一些手牌
            addShownCards:function(){
                const cards=[],tags=[];
                for(const argument of arguments){
                    const type=get.itemtype(argument);
                    if(type=='cards') cards.addArray(argument);
                    else if(type=='card') cards.add(argument);
                    else if(typeof argument=='string'&&argument.startsWith('visible_')) tags.add(argument);
                }
                if(!cards.length||!tags.length) return;
                const next=game.createEvent('addShownCards',false);
                next.player=this;
                next._cards=cards;
                next.gaintag=tags;
                next.setContent('addShownCards');
                return next;
            },
            hideShownCards:function(){
                const cards=[],tags=[];
                for(const argument of arguments){
                    const type=get.itemtype(argument);
                    if(type=='cards') cards.addArray(argument);
                    else if(type=='card') cards.add(argument);
                    else if(typeof argument=='string'&&argument.startsWith('visible_')) tags.add(argument);
                }
                if(!cards.length) return;
                const next=game.createEvent('hideShownCards',false);
                next.player=this;
                next._cards=cards;
                next.gaintag=tags;
                next.setContent('hideShownCards');
                return next;
            },
            //获取角色所有的明置手牌
            getShownCards:function(){
                return this.getCards('h',function(card){
                    return get.is.shownCard(card);
                });
            },
            //Execute the delay card effect
            //执行延时锦囊牌效果
            executeDelayCardEffect:function(card,target,judge,judge2){
                const executeDelayCardEffect=game.createEvent('executeDelayCardEffect');
                executeDelayCardEffect.player=this;
                executeDelayCardEffect.target=target||this;
                if(typeof card=='string'){
                    const virtualCard=executeDelayCardEffect.card=ui.create.card();
                    virtualCard._destroy=true;
                    virtualCard.expired=true;
                    const info=lib.card[card];
                    virtualCard.init(['','',card,info&&info.cardnature]);
                }
                else if(get.itemtype(card)=='card') executeDelayCardEffect.card=card;
                else _status.event.next.remove(executeDelayCardEffect);
                executeDelayCardEffect.judge=judge;
                executeDelayCardEffect.judge2=judge2;
                executeDelayCardEffect.setContent('executeDelayCardEffect');
                executeDelayCardEffect._args=Array.from(arguments);
                return executeDelayCardEffect;
            },
            //Check if the card does not count toward hand limit
            //检测此牌是否不计入手牌上限
            canIgnoreHandcard:function(card){
                return lib.filter.ignoredHandcard(card,this);
            },
            //Gift
            //赠予
            gift:function(cards,target){
                const gift=game.createEvent('gift');
                gift.player=this;
                gift.target=target;
                const isArray=Array.isArray(cards);
                if(cards&&!isArray) gift.cards=[cards];
                else if(isArray&&cards.length) gift.cards=cards;
                else _status.event.next.remove(gift);
                gift.deniedGifts=[];
                gift.setContent('gift');
                gift._args=Array.from(arguments);
                return gift;
            },
            //Check if the player can gift the card
            //检测角色是否能赠予此牌
            canGift:function(card,target,strict){
                return lib.filter.cardGiftable(card,this,target,strict);
            },
            //Check if the player refuses gifts
            //检测角色是否拒绝赠予
            refuseGifts:function(card,player){
                return this.hasSkillTag('refuseGifts',null,{
                    player:player,
                    card:card
                });
            },
            //Gift AI related
            //赠予AI相关
            getGiftAIResultTarget:function(card,target){
                if(!card||target.refuseGifts(card,this)) return 0;
                if(get.type(card,false)=='equip') return get.effect(target,card,target,target);
                if(card.name=='du') return this.hp>target.hp?-1:0;
                if(target.hasSkillTag('nogain')) return 0;
                return Math.max(1,get.value(card,this)-get.value(card,target));
            },
            getGiftEffect:function(card,target){
                return this.getGiftAIResultTarget(card,target)*get.attitude(this,target);
            },
            //Recast
            //重铸
            recast:function(cards,recastingLose,recastingGain){
                const recast=game.createEvent('recast');
                recast.player=this;
                const isArray=Array.isArray(cards);
                if(cards&&!isArray) recast.cards=[cards];
                else if(isArray&&cards.length) recast.cards=cards;
                else _status.event.next.remove(recast);
                if(typeof recastingLose!='function') recastingLose=(player,cards)=>player.loseToDiscardpile(cards).log=false;
                recast.recastingLose=recastingLose;
                recast.recastingLosingEvents=[];
                if(typeof recastingGain!='function') recastingGain=(player,cards)=>player.draw(cards.length).log=false;
                recast.recastingGain=recastingGain;
                recast.recastingGainingEvents=[];
                recast.setContent('recast');
                recast._args=Array.from(arguments);
                return recast;
            },
            //Check if the player can recast the card
            //检测角色是否能重铸此牌
            canRecast:function(card,source,strict){
                return lib.filter.cardRecastable(card,this,source,strict);
            },
            //装备栏相关
            //判断一名角色的某个区域是否被废除
            //type为要判断的区域 若为空 则判断玩家是否有任意一个被废除的区域
            hasDisabledSlot:function(type){
                var player=this;
                if(type=='horse'||type=='equip3_4'){
                    return player.hasDisabledSlot(3)&&(get.is.mountCombined()||player.hasDisabledSlot(4));
                }
                else if(get.is.mountCombined()&&type=='equip4'){
                    return false;
                }
                return player.countDisabledSlot(type)>0;
            },
            //判断一名角色的某个区域被废除的数量
            //用法同上
            countDisabledSlot:function(type){
                var player=this;
                var map=(player.disabledSlots||{});
                if(type==undefined){
                    num=0;
                    for(var i=1;i<=5;i++){
                        num+=player.countDisabledSlot(i);
                    }
                    return num;
                }
                else{
                    if(typeof type=='number') type=('equip'+type);
                    if(get.is.mountCombined()&&type=='equip4'){
                        return 0;
                    }
                    var num=map[type];
                    if(typeof num=='number'&&num>0) return num;
                    return 0;
                }
            },
            //判断一名角色是否有某个装备栏空着
            hasEmptySlot:function(type){
                var player=this;
                if(type=='horse'||type=='equip3_4'){
                    return player.hasEmptySlot(3)&&(get.is.mountCombined()||player.hasEmptySlot(4));
                }
                else if(get.is.mountCombined()&&type=='equip4'){
                    return false;
                }
                return player.countEmptySlot(type)>0;
            },
            //判断一名角色的某个装备栏空位的数量
            countEmptySlot:function(type){
                if(!type) return 0;
                var player=this;
                if(typeof type=='number') type=('equip'+type);
                else if(type=='equip3_4'){
                    type='equip3';
                }
                return Math.max(0,player.countEnabledSlot(type)-player.getEquips(type).reduce(function(num,card){
                    var types=get.subtypes(card,false);
                    return num+get.numOf(types,type);
                },0))
            },
            //判断一名角色是否有可以用于装备新装备牌的区域（排除金箍棒和六龙等“不可被替换装备”）
            //用法同下
            hasEquipableSlot:function(type){
                return this.countEquipableSlot(type)>0;
            },
            //统计一名角色有多少个可以用于装备新的装备牌的区域
            //用法同下
            countEquipableSlot:function(type){
                if(!type) return 0;
                var player=this;
                if(typeof type=='number') type=('equip'+type);
                else if(type=='equip3_4'){
                    type='equip3';
                }
                else if(get.is.mountCombined()&&type=='equip4'){
                    return 0;
                }
                return Math.max(0,player.countEnabledSlot(type)-player.getEquips(type).reduce(function(num,card){
                    var types=get.subtypes(card,false);
                    if(!lib.filter.canBeReplaced(card,player)) num+=get.numOf(types,type);
                    return num;
                },0))
            },
            //判断一名角色是否拥有未被废除的某个区域
            //type为要判断的区域 若为空 则判断玩家是否有任意一个未被废除的区域
            hasEnabledSlot:function(type){
                var player=this;
                if(type=='horse'||type=='equip3_4'){
                    return player.hasEnabledSlot(3)&&(get.is.mountCombined()||player.hasEnabledSlot(4));
                }
                else if(type=='equip3_4'){
                    type='equip3';
                }
                else if(get.is.mountCombined()&&type=='equip4'){
                    return false;
                }
                return player.countEnabledSlot(type)>0;
            },
            //判断一名角色的某个区域未被废除的数量
            //用法同上
            countEnabledSlot:function(type){
                var player=this;
                var map=(player.expandedSlots||{});
                if(!type){
                    num=0;
                    for(var i=1;i<=5;i++){
                        num+=player.countEnabledSlot(i);
                    }
                    return num;
                }
                else{
                    if(typeof type=='number') type=('equip'+type);
                    if(get.is.mountCombined()&&type=='equip4'){
                        return 0;
                    }
                    var slots=1;
                    var num=map[type];
                    if(typeof num=='number'&&num>0) slots+=num;
                    slots-=player.countDisabledSlot(type);
                    return slots;
                }
            },
            //获取一名角色装备区内某种类型的装备牌
            //参数可以为数字/区域字符串/实体牌/虚拟牌/牌名
            getEquips:function(subtype){
                var type=(typeof subtype);
                switch(type){
                    case 'string':
                        if(subtype=='equip3_4'){
                            const cards=[];
                            cards.addArray(this.getEquips(3));
                            cards.addArray(this.getEquips(4));
                            return cards;
                        }
                        else if(subtype.startsWith('equip')&&parseInt(subtype.slice(5))>0){
                            break;
                        }
                        else if(lib.card[subtype]){
                            return this.getCards('e',card=>card.name==subtype);
                        }
                        else return [];
                    case 'number':
                        subtype='equip'+subtype;
                        break;
                    case 'object':
                        subtype=get.subtype(subtype,false);
                        break;
                    default:
                        return [];
                }
                if(!subtype) return [];
                return this.getCards('e',function(card){
                    return get.subtypes(card,false).contains(subtype);
                })
            },
            //新的废除装备区/恢复装备区/扩展装备区
            //参数：废除来源角色（不写默认当前事件角色），废除区域（数字/区域字符串/数组，可以写多个，重复废除）
            disableEquip:function(){
                var next=game.createEvent('disableEquip');
                next.player=this;
                next.slots=[];
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(Array.isArray(arguments[i])){
                        for(var arg of arguments[i]){
                            if(typeof arg=='string'){
                                if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
                            }
                            else if(typeof arg=='number'){
                                next.slots.push('equip'+arg);
                            }
                        }
                    }
                    else if(typeof arguments[i]=='string'){
                        if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
                    }
                    else if(typeof arguments[i]=='number'){
                        next.slots.push('equip'+arguments[i]);
                    }
                }
                if(!next.source) next.source=_status.event.player;
                if(!next.slots.length){
                    _status.event.next.remove(next);
                }
                next.setContent('disableEquip');
                return next;
            },
            enableEquip:function(){
                var next=game.createEvent('enableEquip');
                next.player=this;
                next.slots=[];
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(Array.isArray(arguments[i])){
                        for(var arg of arguments[i]){
                            if(typeof arg=='string'){
                                if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
                            }
                            else if(typeof arg=='number'){
                                next.slots.push('equip'+arg);
                            }
                        }
                    }
                    else if(typeof arguments[i]=='string'){
                        if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
                    }
                    else if(typeof arguments[i]=='number'){
                        next.slots.push('equip'+arguments[i]);
                    }
                }
                if(!next.source) next.source=_status.event.player;
                if(!next.slots.length){
                    _status.event.next.remove(next);
                }
                next.setContent('enableEquip');
                return next;
            },
            expandEquip:function(){
                var next=game.createEvent('expandEquip');
                next.player=this;
                next.slots=[];
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(Array.isArray(arguments[i])){
                        for(var arg of arguments[i]){
                            if(typeof arg=='string'){
                                if(arg.startsWith('equip')&&parseInt(arg.slice(5))>0) next.slots.push(arg);
                            }
                            else if(typeof arg=='number'){
                                next.slots.push('equip'+arg);
                            }
                        }
                    }
                    else if(typeof arguments[i]=='string'){
                        if(arguments[i].startsWith('equip')&&parseInt(arguments[i].slice(5))>0) next.slots.push(arguments[i]);
                    }
                    else if(typeof arguments[i]=='number'){
                        next.slots.push('equip'+arguments[i]);
                    }
                }
                if(!next.source) next.source=_status.event.player;
                if(!next.slots.length){
                    _status.event.next.remove(next);
                }
                next.setContent('expandEquip');
                return next;
            },
            //判断判定区是否被废除
            isDisabledJudge:function(){
                return Boolean(this.storage._disableJudge);
            },
            //同步显示扩展装备区状态
            $syncExpand:function(map){
                var player=this;
                if(!map){
                    map=(player.expandedSlots||{});
                }
                game.addVideo('$syncExpand',player,get.copy(map))
                game.broadcast(function(player,map){
                    player.expandedSlots=map;
                    player.$syncExpand(map);
                },player,map);
                player.markSkill('expandedSlots');
            },
            //同步装备区废除牌显示状态
            $syncDisable:function(map){
                const player=this;
                const suits={equip3:'+1马栏',equip4:'-1马栏',equip6:'特殊栏'};
                if(get.is.mountCombined()) suits.equip3='坐骑栏';
                if(!map){
                    map=(player.disabledSlots||{});
                }
                game.addVideo('$syncDisable',player,get.copy(map))
                game.broadcast(function(player,map){
                    player.disabledSlots=map;
                    player.$syncDisable(map);
                },player,map)
                const map2=get.copy(map);
                const cards=Array.from(player.node.equips.childNodes);
                for(const card of cards){
                    if(card.name.startsWith('feichu_')){
                        const index=card.name.slice(7);
                        if(!map2[index]) map2[index]=0;
                        map2[index]--;
                    }
                }
                for(const index in map2){
                    if(!index.startsWith('equip')||!(parseInt(index.slice(5))>0)) continue;
                    const num=map2[index];
                    if(num>0){
                        for(let i=0;i<num;i++){
                            const card=game.createCard('feichu_'+index,(suits[index]||(get.translation(index)+'栏')),'');
                            card.fix();
                            card.style.transform='';
                            card.classList.remove('drawinghidden');
                            card.classList.add('feichu');
                            delete card._transform;
                            const equipNum=get.equipNum(card);
                            let equipped=false;
                            for(let j=0;j<player.node.equips.childNodes.length;j++){
                                if(get.equipNum(player.node.equips.childNodes[j])>=equipNum){
                                    player.node.equips.insertBefore(card,player.node.equips.childNodes[j]);
                                    equipped=true;
                                    break;
                                }
                            }
                            if(!equipped){
                                player.node.equips.appendChild(card);
                                if(_status.discarded){
                                    _status.discarded.remove(card);
                                }
                            }
                        }
                    }
                    else if(num<0){
                        for(let i=0;i>num;i--){
                            const card=cards.find(card=>card.name=='feichu_'+index);
                            if(card){
                                player.node.equips.removeChild(card);
                                cards.remove(card);
                            }
                        }
                    }
                }
            },
            //以下函数涉及到本次更新内容而进行修改
            canEquip:function(name,replace){
                const ranges=get.subtypes(name),rangex=[],player=this,combined=get.is.mountCombined();
                if(combined){
                    ranges.forEach(type=>{
                        if(type=='equip3'||type=='equip4') rangex.add('equip3_4');
                        else rangex.add(type)
                    })
                }
                else{
                    rangex.push(...new Set(ranges));
                }
                for(let range of rangex){
                    let num=this.countEquipableSlot(range);
                    let num2=get.numOf(rangex,range);
                    if(!replace) num-=this.getEquips(range).filter(card=>lib.filter.canBeReplaced(card,player)).length;
                    if(num<num2) return false;
                }
                return true;
            },
            //以下函数将不再进行后续维护
            countDisabled:function(){
                return this.countDisabledSlot.apply(this,arguments)
            },
            isDisabled:function(arg){
                return this.hasDisabledSlot(arg)&&!this.hasEnabledSlot(arg);
            },
            isEmpty:function(num){
                return this.countEnabledSlot(num)>this.getEquips(num).length;
            },
            //以下函数将被废弃
            $disableEquip:function(){},
            $enableEquip:function(){},
            //装备区End
            chooseToDebate:function(){
                var next=game.createEvent('chooseToDebate');
                next.player=this;
                next._args=[];
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='players'){
                        next.list=arguments[i].slice(0);
                    }
                    else{
                        next._args.push(arguments[i]);
                    }
                }
                next.setContent('chooseToDebate');
                return next;
            },
            cooperationWith:function(target,type,reason){
                var player=this;
                if(!player.storage.cooperation) player.storage.cooperation=[];
                var info={
                    target:target,
                    type:type,
                    reason:reason,
                };
                player.storage.cooperation.add(info);
                player.addTempSkill('cooperation',{player:'dieAfter'});
                player.addSkill('cooperation_'+type,{player:'dieAfter'});
                game.log(player,'向',target,'发起了“协力”，合作类型是','#g'+get.translation('cooperation_'+type));
            },
            chooseCooperationFor:function(){
                var next=game.createEvent('chooseCooperationFor');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.target=arguments[i];
                    }
                    else if(Array.isArray(arguments[i])){
                        next.cardlist=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        next.reason=arguments[i];
                    }
                }
                if(!next.cardlist) next.cardlist=['cooperation_damage','cooperation_draw','cooperation_discard','cooperation_use'];
                next.setContent('chooseCooperationFor');
                return next;
            },
            checkCooperationStatus:function(target,reason){
                var storage=this.getStorage('cooperation');
                for(var info of storage){
                    if(info.target==target&&info.reason==reason){
                        var skill=lib.skill['cooperation_'+info.type];
                        if(skill&&skill.checkx&&skill.checkx(info)) return true;
                    }
                }
                return false;
            },
            removeCooperation:function(info){
                var player=this;
                var storage=player.getStorage('cooperation');
                if(!storage.contains(info)) return;
                storage.remove(info);
                var unmark=true,reason=info.type;
                if(!storage.length){
                    player.removeSkill('cooperation');
                }
                else{
                    for(var i of storage){
                        if(i.type==reason){
                            unmark=false;
                            break;
                        }
                    }
                }
                if(unmark) player.removeSkill('cooperation_'+reason);
                else player.markSkill('cooperation_'+reason);
            },
            hasClan:function(clan,unseen){
                if(unseen||!this.isUnseen(0)){
                    var info=lib.character[this.name1];
                    if(info&&info[4]){
                        for(var i of info[4]){
                            if(typeof i=='string'&&i.startsWith('clan:')&&i.slice(5)==clan) return true;
                        }
                    }
                }
                if(this.name2&&(unseen||!this.isUnseen(1))){
                    var info=lib.character[this.name2];
                    if(info&&info[4]){
                        for(var i of info[4]){
                            if(typeof i=='string'&&i.startsWith('clan:')&&i.slice(5)==clan) return true;
                        }
                    }
                }
                return false;
            },
            changeZhuanhuanji:function(skill){
                var player=this,info=get.info(skill),zhuanhuan=info.zhuanhuanji;
                if(typeof zhuanhuan=='function') zhuanhuan(player,skill);
                else if(zhuanhuan=='number') player.addMark(skill,1,false);
                else player.storage[skill]=!player.storage[skill];
                game.broadcastAll(function(player,skill){
                    player.$changeZhuanhuanji(skill);
                },player,skill);
            },
            $changeZhuanhuanji:function(skill){
                var mark=this.marks[skill];
                if(mark){
                    if(mark.firstChild.reversed){
                        mark.firstChild.reversed=false;
                        mark.firstChild.style.transform='none';
                    }
                    else{
                        mark.firstChild.reversed=true;
                        mark.firstChild.style.transform='rotate(180deg)';
                    }
                }
            },
            setSeatNum:function(num){
                _status.seatNumSettled=true;
                game.broadcastAll(function(player,num){
                    player.seatNum=num;
                },this,num);
            },
            getSeatNum:function(){
                if(typeof this.seatNum=='number') return this.seatNum;
                return 0;
            },
            hasSex:function(sex){
                if(this.sex=='unknown') return false;
                if(this.sex=='double') return true;
                return this.sex==sex;
            },
            sameSexAs:function(target){
                var sex1=this.sex,sex2=target.sex;
                if(sex1=='unknown'||sex2=='unknown') return false;
                if(sex1=='double'||sex2=='double') return true;
                return sex1==sex2;
            },
            differentSexFrom:function(target){
                var sex1=this.sex,sex2=target.sex;
                if(sex1=='unknown'||sex2=='unknown') return false;
                if(sex1=='double'||sex2=='double') return true;
                return sex1!=sex2;
            },
            addSkillBlocker:function(skill){
                if(!this.storage.skill_blocker) this.storage.skill_blocker=[];
                this.storage.skill_blocker.push(skill);
            },
            removeSkillBlocker:function(skill){
                if(this.storage.skill_blocker){
                    this.storage.skill_blocker.remove(skill);
                    if(!this.storage.skill_blocker.length) delete this.storage.skill_blocker;
                }
            },
            loseToSpecial:function(cards,tag,target){
                var next=game.loseAsync({
                    player:this,
                    cards:cards,
                    tag:tag,
                    toStorage:true,
                    target:target||this,
                });
                next.setContent(function(){
                    "step 0"
                    player.lose(cards,ui.special).set('getlx',false);
                    "step 1"
                    var cards=event.cards.slice(0);
                    cards.removeArray(player.getCards('hejsx'));
                    if(cards.length) target.directgains(cards,null,event.tag)
                });
                return next;
            },
            addGaintag:function(cards,tag){
                if(get.itemtype(cards)=='card') cards=[cards];
                game.addVideo('addGaintag',this,[get.cardsInfo(cards),tag]);
                game.broadcastAll(function(player,cards,tag){
                    var hs=player.getCards('hejsx');
                    for(var i of cards){
                        if(hs.contains(i)) i.addGaintag(tag);
                    }
                },this,cards,tag);
            },
            removeGaintag:function(tag,cards){
                cards=cards||this.getCards('h');
                game.addVideo('removeGaintag',this,[tag,get.cardsInfo(cards)]);
                game.broadcastAll(function(player,tag,cards){
                    for(var i of cards) i.removeGaintag(tag);
                },this,tag,cards);
            },
            canSave:function(target){
                var player=this;
                if(player.hasSkillTag('save',true,target,true)) return true;
                var name={},hs=player.getCards('hs');
                for(var i of hs) name[get.name(i)]=true;
                for(var i in lib.card){
                    if(lib.card[i].savable&&(lib.inpile.contains(i)||name[i])){
                        if(lib.filter.cardSavable({name:i},player,target)&&(_status.connectMode||player.hasUsableCard(i))) return true;
                    }
                }
                return false;
            },
            canSaveCard:function(card,target){
                var player=this;
                var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                if(mod2!='unchanged') return mod2;
                var mod=game.checkMod(card,player,target,'unchanged','cardSavable',player);
                if(mod!='unchanged') return mod;
                var savable=get.info(card).savable;
                if(typeof savable=='function') savable=savable(card,player,target);
                return savable;
            },
            showCharacter:function(num,log){
                var toShow=[];
                if((num==0||num==2)&&this.isUnseen(0)) toShow.add(this.name1);
                if((num==1||num==2)&&this.isUnseen(1)) toShow.add(this.name2);
                if(!toShow.length) return;
                lib.element.player.$showCharacter.apply(this,arguments);
                var next=game.createEvent('showCharacter',false);
                next.player=this;
                next.num=num;
                next.toShow=toShow;
                next._args=Array.from(arguments);
                next.setContent('showCharacter');
                var evt=_status.event;
                evt.next.remove(next);
                if(evt.logSkill) evt=evt.getParent();
                evt.after.push(next);
                return next;
            },
            $showCharacter:function(num,log){
                if(num==0&&!this.isUnseen(0)){
                    return;
                }
                if(num==1&&(!this.name2||!this.isUnseen(1))){
                    return;
                }
                if(!this.isUnseen(2)){
                    return;
                }
                game.addVideo('showCharacter',this,num);
                var skills;
                switch(num){
                    case 0:
                    if(log!==false) game.log(this,'展示了主将','#b'+this.name1);
                    this.name=this.name1;
                    skills=lib.character[this.name][3]||[];
                    this.sex=lib.character[this.name][0];
                    if(this.group=='unknown') this.group=lib.character[this.name][1];
                    this.classList.remove('unseen');
                    break;
                    case 1:
                    if(log!==false) game.log(this,'展示了副将','#b'+this.name2);
                    skills=lib.character[this.name2][3]||[];
                    if(this.sex=='unknown') this.sex=lib.character[this.name2][0];
                    if(this.name.startsWith('unknown')) this.name=this.name2;
                    this.classList.remove('unseen2');
                    break;
                    case 2:
                    if(log!==false){
                        if(this.name2) game.log(this,'展示了主将','#b'+this.name1,'、副将','#b'+this.name2);
                        else game.log(this,'展示了主将','#b'+this.name1);
                    }
                    this.name=this.name1;
                    var skills=(lib.character[this.name][3]||[]);
                    if(this.name2) skills=skills.concat(lib.character[this.name2][3]||[]);
                    this.sex=lib.character[this.name][0];
                    if(this.group=='unknown') this.group=lib.character[this.name][1];
                    this.classList.remove('unseen');
                    this.classList.remove('unseen2');
                    break;
                }
                if(!this.isUnseen(2)){
                    delete this.storage.nohp;
                    this.hp=this.storage.rawHp+this.maxHp-1;
                    this.maxHp=this.storage.rawMaxHp+this.maxHp-1;
                    this.node.hp.show();
                    this.update();
                }
                game.broadcast(function(player,name,sex,num,group){
                    player.group=group;
                    player.name=name;
                    player.sex=sex;
                    switch(num){
                        case 0:player.classList.remove('unseen');break;
                        case 1:player.classList.remove('unseen2');break;
                        case 2:player.classList.remove('unseen');player.classList.remove('unseen2');break;
                    }
                    if(!player.isUnseen(2)){
                        delete player.storage.nohp;
                        player.node.hp.show();
                        player.update();
                    }
                },this,this.name,this.sex,num,this.group);
                skills=skills.filter(skill=>{
                    var info=get.info(skill);
                    if(info&&info.zhuSkill&&!this.isZhu2()) return false;
                    return true;
                });
                for(var i=0;i<skills.length;i++){
                    if(this.hiddenSkills.contains(skills[i])){
                        this.hiddenSkills.remove(skills[i]);
                        this.addSkill(skills[i]);
                    }
                }
                this.checkConflict();
            },
            chooseToPlayBeatmap:function(beatmap){
                var next=game.createEvent('chooseToPlayBeatmap');
                next.player=this;
                next.beatmap=beatmap;
                next._args=Array.from(arguments);
                next.setContent('chooseToPlayBeatmap');
                return next;
            },
            chooseToMove:function(){
                var next=game.createEvent('chooseToMove');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                }
                next.setContent('chooseToMove');
                next.filterOk=function(){return true};
                next.filterMove=function(){return true};
                return next;
            },
            chooseToGuanxing:function(num){
                var next=game.createEvent('chooseToGuanxing');
                next.num=num||1;
                next.player=this;
                next.setContent('chooseToGuanxing');
                return next;
            },
            $throwEmotion:function(target,name){
                game.addVideo('throwEmotion',this,[target.dataset.position,name]);
                var getLeft=function(player){
                    if(player==game.me&&!ui.fakeme&&!ui.chess) return player.getLeft()+player.node.avatar.offsetWidth/2;
                    return player.getLeft()+player.offsetWidth/2;
                }
                var player=this;
                var emotion=ui.create.div('','<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'1.png"> </div>',game.chess?ui.chess:ui.window);
                emotion.style.width='60px';
                emotion.style.height='60px';
                var width=emotion.offsetWidth/2;
                var height=emotion.offsetHeight/2;
                if(game.chess) width+=60;
                var left=getLeft(player)-width;
                var top=player.getTop()+player.offsetHeight/3-height;
                emotion.style.left=left+'px';
                emotion.style.top=top+'px';
                var left2=getLeft(target)-width;
                var top2=target.getTop()+target.offsetHeight/3-height;
                emotion.style['z-index']=10;
                emotion.style.transform='translateY('+(top2-top)+'px) translateX('+(left2-left)+'px)';
                if(lib.config.background_audio) game.playAudio('effect','throw_'+name+get.rand(1,2));
                setTimeout(function(){
                    emotion.innerHTML=('<div style="text-align:center"> <img src="'+lib.assetURL+'image/emotion/throw_emotion/'+name+'2.png"> </div>');
                    setTimeout(function(){
                        emotion.delete();
                    },1200);
                },600);
            },
            tryJudgeAnimate:function(bool){
                var player=this;
                game.broadcast(function(player,bool){
                    player.trySkillAnimate(bool);
                },player,bool);
                if(bool) this.popup('判定生效','wood',false);
                else this.popup('判定失效','fire',false);
            },
            trySkillAnimate:function(name,popname,checkShow){
                if(!game.online&&lib.config.skill_animation_type!='off'&&lib.skill[name]&&lib.skill[name].skillAnimation){
                    if(lib.config.skill_animation_type=='default'){
                        checkShow=checkShow||'main';
                    }
                    else{
                        checkShow=false;
                    }
                    if(lib.skill[name].textAnimation){
                        checkShow=false;
                    }
                    this.$skill(lib.skill[name].animationStr||lib.translate[name],lib.skill[name].skillAnimation,lib.skill[name].animationColor,checkShow);
                    return;
                }
                var player=this;
                game.broadcast(function(player,name,popname){
                    player.trySkillAnimate(name,popname);
                },player,name,popname);
                if(lib.animate.skill[name]) lib.animate.skill[name].apply(this,arguments);
                else{
                    if(popname!=name) this.popup(popname,'water',false);
                    else this.popup(get.skillTranslation(name,this),'water',false);
                }
            },
            tryCardAnimate:function(card,name,nature,popname){
                var player=this;
                game.broadcast(function(player,card,name,nature,popname){
                    player.tryCardAnimate(card,name,nature,popname);
                },player,card,name,nature,popname);
                if(lib.animate.card[card.name]) lib.animate.card[card.name].apply(this,arguments);
                else {
                    if(!lib.config.show_card_prompt) return;
                    if(get.type(card)=='equip'&&lib.config.hide_card_prompt_equip) return;
                    if(get.type(card)=='basic'&&lib.config.hide_card_prompt_basic) return;
                    if(popname) player.popup({name:card.name,nature:card.nature},nature,false);
                    else player.popup(name,nature,false);
                }
            },
            hasUsableCard:function(name){
                var player=this;
                if(player.countCards('hs',name)) return true;
                var skills=player.getSkills('invisible').concat(lib.skill.global);
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var ifo=get.info(skills[i]);
                    if(ifo.viewAs&&typeof ifo.viewAs!='function'&&ifo.viewAs.name==name){
                        if(!ifo.viewAsFilter||ifo.viewAsFilter(player)!==false){
                            return true;
                        }
                    }
                    else{
                        var hiddenCard=get.info(skills[i]).hiddenCard;
                        if(typeof hiddenCard=='function'&&hiddenCard(player,name)){
                            return true;
                        }
                    }
                }
            },
            inRange:function(to){
                var from=this;
                if(from==to||from.hasSkill('undist')||to.hasSkill('undist')) return false;
                if(!game.players.contains(from)&&!game.dead.contains(from)) return false;
                if(!game.players.contains(to)&&!game.dead.contains(to)) return false;
                var mod1=game.checkMod(from,to,'unchanged','inRange',from);
                if(mod1!='unchanged') return mod1;
                var mod2=game.checkMod(from,to,'unchanged','inRangeOf',to);
                if(mod2!='unchanged') return mod2;
                var range=from.getAttackRange();
                if(range<1) return false;
                var player=from,m,n=1,i;
                var fxy,txy;
                if(game.chess){
                    fxy=from.getXY();
                    txy=to.getXY();
                    n=Math.abs(fxy[0]-txy[0])+Math.abs(fxy[1]-txy[1]);
                }
                else if(to.isMin(true)||from.isMin(true)){}
                else{
                    var length=game.players.length;
                    var totalPopulation=game.players.length+game.dead.length+1;
                    for(var iwhile=0;iwhile<totalPopulation;iwhile++){
                        if(player.nextSeat!=to){
                            player=player.nextSeat;
                            if(player.isAlive()&&!player.isOut()&&!player.hasSkill('undist')&&!player.isMin(true)) n++;
                        }
                        else{
                            break;
                        }
                    }
                    for(i=0;i<game.players.length;i++){
                        if(game.players[i].isOut()||game.players[i].hasSkill('undist')||game.players[i].isMin(true)) length--;
                    }
                    if(from.isDead()) length++;
                    if(to.isDead()) length++;
                    var left=from.hasSkillTag('left_hand');
                    var right=from.hasSkillTag('right_hand');
                    if(left===right) n=Math.min(n,length-n);
                    else if(left==true) n=length-n;
                }
                n=game.checkMod(from,to,n,'globalFrom',from);
                n=game.checkMod(from,to,n,'globalTo',to);
                m=n;
                m=game.checkMod(from,to,m,'attackFrom',from);
                m=game.checkMod(from,to,m,'attackTo',to);
                var equips1=from.getCards('e',function(card){
                    return !ui.selected.cards||!ui.selected.cards.contains(card);
                }),equips2=to.getCards('e',function(card){
                    return !ui.selected.cards||!ui.selected.cards.contains(card);
                });
                for(i=0;i<equips1.length;i++){
                    var info=get.info(equips1[i]).distance;
                    if(!info) continue;
                    if(info.globalFrom){
                        m+=info.globalFrom;
                        n+=info.globalFrom;
                    }
                }
                for(i=0;i<equips2.length;i++){
                    var info=get.info(equips2[i]).distance;
                    if(!info) continue;
                    if(info.globalTo){
                        m+=info.globalTo;
                        n+=info.globalTo;
                    }
                    if(info.attaclTo){
                        m+=info.attaclTo;
                    }
                }
                return m<=range;
            },
            inRangeOf:function(source){
                return source.inRange(this);
            },
            //Get the player's HP not less than 0. Set “raw” to true to get the player's raw HP instead.
            //获取角色的体力值。设置“raw”为true以获取角色的体力。
            getHp:function(raw){
                return raw?this.hp:Math.max(0,this.hp);
            },
            //Set “raw” to true to get the player's raw damaged HP instead.
            //设置“raw”为true以获取角色已损失的体力。
            getDamagedHp:function(raw){
                return this.maxHp-this.getHp(raw);
            },
            changeGroup:function(group,log,broadcast){
                var next=game.createEvent('changeGroup');
                next.player=this;
                next.log=true;
                for(var i=0;i<arguments.length;i++){
                    var arg=arguments[i];
                    if(lib.group.contains(arg)){
                        next.group=arg;
                    }
                    else if(typeof arg==='boolean'){
                        next.log=arg;
                    }
                    else if(arg==='nobroadcast'){
                        next.broadcast=false;
                    }
                }
                next.setContent('changeGroup');
                return next;
            },
            chooseToDuiben:function(target){
                var next=game.createEvent('chooseToDuiben');
                next.player=this;
                next.target=target;
                next.setContent('chooseToDuiben');
                return next;
            },
            chooseToPSS:function(target){
                var next=game.createEvent('chooseToPSS');
                next.player=this;
                next.target=target;
                next.setContent('chooseToPSS');
                return next;
            },
            chooseToEnable:function(){
                var next=game.createEvent('chooseToEnable');
                next.player=this;
                next.setContent('chooseToEnable');
                return next;
            },
            chooseToDisable:function(horse){
                var next=game.createEvent('chooseToDisable');
                next.player=this;
                if(horse) next.horse=true;
                next.setContent('chooseToDisable');
                return next;
            },
            isPhaseUsing:function(notmeisok){
                if(!notmeisok&&_status.currentPhase!=this) return false;
                return _status.event.name=='phaseUse'||_status.event.getParent('phaseUse').name=='phaseUse';
            },
            swapEquip:function(target){
                var next=game.createEvent('swapEquip');
                next.player=this;
                next.target=target;
                next.setContent('swapEquip');
                return next;
            },
            canCompare:function(target){
                if(this==target) return false;
                if(!this.countCards('h')||!target.countCards('h')) return false;
                if(this.hasSkillTag('noCompareSource')||target.hasSkillTag('noCompareTarget')) return false;
                return true;
            },
            $disableJudge:function(){
                var player=this;
                game.addVideo('$disableJudge',player);
                player.storage._disableJudge=true;
                var card=game.createCard('disable_judge','','');
                card.fix();
                card.classList.add('feichu');
                card.style.transform='';
                card.classList.add('drawinghidden');
                player.node.judges.insertBefore(card,player.node.judges.firstChild);
                ui.updatej(player);
            },
            $enableJudge:function(){
                var player=this;
                game.addVideo('$enableJudge',player);
                player.storage._disableJudge=false;
                for(var i=0;i<player.node.judges.childNodes.length;i++){
                    if(player.node.judges.childNodes[i].name=='disable_judge'){
                        player.node.judges.removeChild(player.node.judges.childNodes[i]);
                        break;
                    }
                }
            },
            disableJudge:function(){
                var next=game.createEvent('disableJudge');
                next.player=this;
                next.source=_status.event.player;
                next.setContent('disableJudge');
                return next;
            },
            enableJudge:function(){
                var next=game.createEvent('enableJudge');
                next.player=this;
                next.source=_status.event.player;
                next.setContent('enableJudge');
                return next;
            },
            //原有函数
            init:function(character,character2,skill,update){
                if(typeof character=='string'&&!lib.character[character]){
                    lib.character[character]=get.character(character);
                }
                if(typeof character2=='string'&&!lib.character[character2]){
                    lib.character[character2]=get.character(character2);
                }
                if(!lib.character[character]) return;
                if(get.is.jun(character2)){
                    var tmp=character;
                    character=character2;
                    character2=tmp;
                }
                if(character2==false){
                    skill=false;
                    character2=null;
                }
                var info=lib.character[character];
                if(!info){
                    info=['','',1,[],[]];
                }
                if(!info[4]){
                    info[4]=[];
                }
                var skills=info[3].slice(0);
                this.clearSkills(true);
                this.classList.add('fullskin');
                if(!game.minskin&&get.is.newLayout()&&!info[4].contains('minskin')){
                    this.classList.remove('minskin');
                    this.node.avatar.setBackground(character,'character');
                }
                else{
                    this.node.avatar.setBackground(character,'character');
                    if(info[4].contains('minskin')){
                        this.classList.add('minskin');
                    }
                    else if(game.minskin){
                        this.classList.add('minskin');
                    }
                    else{
                        this.classList.remove('minskin');
                    }
                }

                var hp1=get.infoHp(info[2]);
                var maxHp1=get.infoMaxHp(info[2]);
                var hujia1=get.infoHujia(info[2]);
                
                this.node.avatar.show();
                this.node.count.show();
                this.node.equips.show();
                this.name=character;
                this.name1=character;
                this.sex=info[0];
                this.group=info[1];
                this.hp=hp1;
                this.maxHp=maxHp1;
                this.hujia=hujia1;
                this.node.intro.innerHTML=lib.config.intro;
                this.node.name.dataset.nature=get.groupnature(this.group);
                lib.setIntro(this);
                this.node.name.innerHTML=get.slimName(character);
                if(this.classList.contains('minskin')&&this.node.name.querySelectorAll('br').length>=4){
                    this.node.name.classList.add('long');
                }
                if(info[4].contains('hiddenSkill')&&!this.noclick){
                    if(!this.hiddenSkills) this.hiddenSkills=[];
                    this.hiddenSkills.addArray(skills);
                    skills=[];
                    this.classList.add(_status.video?'unseen_v':'unseen');
                    this.name='unknown';
                    if(!this.node.name_seat&&!_status.video){
                        this.node.name_seat=ui.create.div('.name.name_seat',get.verticalStr(get.translation(this.name)),this);
                        this.node.name_seat.dataset.nature=get.groupnature(this.group);
                    }
                    this.sex='male';
                    //this.group='unknown';
                    this.storage.nohp=true;
                    skills.add('g_hidden_ai');
                }
                if(character2&&lib.character[character2]){
                    var info2=lib.character[character2];
                    if(!info2){
                        info2=['','',1,[],[]];
                    }
                    if(!info2[4]){
                        info2[4]=[];
                    }
                    this.classList.add('fullskin2');
                    this.node.avatar2.setBackground(character2,'character');

                    this.node.avatar2.show();
                    this.name2=character2;
                    var hp2=get.infoHp(info2[2]);
                    var maxHp2=get.infoMaxHp(info2[2]);
                    var hujia2=get.infoHujia(info2[2]);
                    this.hujia+=hujia2;
                    var double_hp;
                    if(_status.connectMode||get.mode()=='single'){
                        double_hp='pingjun';
                    }
                    else{
                        double_hp=get.config('double_hp');
                    }
                    switch(double_hp){
                        case 'pingjun':{
                            this.maxHp=Math.floor((maxHp1+maxHp2)/2);
                            this.hp=Math.floor((hp1+hp2)/2);
                            this.singleHp=((maxHp1+maxHp2)%2===1);
                            break;
                        }
                        case 'zuidazhi':{
                            this.maxHp=Math.max(maxHp1,maxHp2);
                            this.hp=Math.max(hp1,hp2);
                            break;
                        }
                        case 'zuixiaozhi':{
                            this.maxHp=Math.min(maxHp1,maxHp2);
                            this.hp=Math.min(hp1,hp2);
                            break;
                        }
                        case 'zonghe':{
                            this.maxHp=maxHp1+maxHp2;
                            this.hp=hp1+hp2;
                            break;
                        }
                        default:{
                            this.maxHp=maxHp1+maxHp2-3;
                            this.hp=hp1+hp2-3;
                        };
                    }
                    this.node.count.classList.add('p2');
                    if(info2[4].contains('hiddenSkill')&&!this.noclick){
                        if(!this.hiddenSkills) this.hiddenSkills=[];
                        this.hiddenSkills.addArray(info2[3]);
                        this.classList.add(_status.video?'unseen2_v':'unseen2');
                        this.storage.nohp=true;
                        skills.add('g_hidden_ai');
                    }
                    else skills=skills.concat(info2[3]);

                    this.node.name2.innerHTML=get.slimName(character2);
                }
                if(this.storage.nohp){
                    this.storage.rawHp=this.hp;
                    this.storage.rawMaxHp=this.maxHp;
                    this.hp=1;
                    this.maxHp=1;
                    this.node.hp.hide();
                }
                if(skill!=false){
                    skills=skills.filter(skill=>{
                        var info=get.info(skill);
                        if(info&&info.zhuSkill&&!this.isZhu2()) return false;
                        return true;
                    });
                    for(var i=0;i<skills.length;i++){
                        this.addSkill(skills[i],null,true);
                    }
                    this.checkConflict();
                }
                lib.group.add(this.group);
                if(this.inits){
                    for(var i=0;i<lib.element.player.inits.length;i++){
                        lib.element.player.inits[i](this);
                    }
                }
                if(this._inits){
                    for(var i=0;i<this._inits.length;i++){
                        this._inits[i](this);
                    }
                }
                if(update!==false) this.$update();
                return this;
            },
            initOL:function(name,character){
                this.node.avatar.setBackground(character,'character');
                this.node.avatar.show();
                this.node.name.innerHTML=get.verticalStr(name);
                this.nickname=name;
                this.avatar=character;
                this.node.nameol.innerHTML='';
                if(lib.character[character]) this.sex=lib.character[character][0];
            },
            uninitOL:function(){
                this.node.avatar.hide();
                this.node.name.innerHTML='';
                this.node.identity.firstChild.innerHTML='';
                delete this.nickname;
                delete this.avatar;
                delete this.sex;
            },
            initRoom:function(info,info2){
                var str='';
                this.serving=false;
                if(!info||info=='server'){
                    this.roomempty=true;
                    str='空房间';
                    this.roomfull=false;
                    this.roomgaming=false;
                    this.version=null;
                    if(info=='server'){
                        this.serving=true;
                    }
                }
                else{
                    var config=info[2];
                    this.key=info[4];
                    this.roomempty=false;
                    str+=get.modetrans(config);
                    str+=' 模式　';
                    for(var i=str.length;i<11;i++) str+='　';
                    this.version=config.version;
                    if(config.gameStarted){
                        str+='<span class="firetext">游戏中</span>　';
                        if(config.observe&&config.observeReady&&this.version==lib.versionOL){
                            this.classList.remove('exclude');
                        }
                        else{
                            this.classList.add('exclude');
                        }
                    }
                    else{
                        str+='<span class="greentext">等待中</span>　';
                        if(this.version!=lib.versionOL){
                            this.classList.add('exclude');
                        }
                        else{
                            this.classList.remove('exclude');
                        }
                    }
                    this.maxHp=parseInt(config.number);
                    this.hp=Math.min(this.maxHp,info[3]);
                    if(this.hp<this.maxHp||config.gameStarted) str+=('人数：'+this.hp+'/'+this.maxHp);
                    else str+=('人数：<span class="firetext">'+this.hp+'/'+this.maxHp+'</span>');
                    
                    str+=('　('+info[0].slice(0,12)+' 的房间)');
                    if(config.mode!='guozhan'&&(config.mode!='doudizhu'||config.doudizhu_mode!='online')){
                        str+='【';
                        for(var i=0;i<config.cardPack.length;i++){
                            str+=(get.translation(config.cardPack[i]+'_card_config').slice(0,2));
                            if(i<config.cardPack.length-1) str+='+';
                        }
                        str+='】';
                    }
                    this.config=config;
                    if(this.hp==this.maxHp&&!config.gameStarted){
                        this.roomfull=true;
                    }
                    else{
                        this.roomfull=false;
                    }
                    if(config.gameStarted&&(!config.observe||!config.observeReady)){
                        this.roomgaming=true;
                    }
                    else{
                        this.roomgaming=false;
                    }
                }
                this.firstChild.innerHTML=str;
                return this;
            },
            reinit:function(from,to,maxHp,online){
                var info1=lib.character[from];
                var info2=lib.character[to];
                var smooth=true;
                if(maxHp=='nosmooth'){
                    smooth=false;
                    maxHp=null;
                }
                if(this.name2==from){
                    this.name2=to;
                    if(this.isUnseen(0)&&!this.isUnseen(1)){
                        this.sex=info2[0];
                        this.name=to;
                    }
                    if(smooth) this.smoothAvatar(true);
                    this.node.avatar2.setBackground(to,'character');
                    this.node.name2.innerHTML=get.slimName(to);
                }
                else if(this.name==from||this.name1==from){
                    if(this.name1==from){
                        this.name1=to;
                    }
                    if(!this.classList.contains('unseen2')){
                        this.name=to;
                        this.sex=info2[0];
                    }
                    if(smooth) this.smoothAvatar(false);
                    this.node.avatar.setBackground(to,'character');
                    this.node.name.innerHTML=get.slimName(to);

                    if(this==game.me&&ui.fakeme){
                        ui.fakeme.style.backgroundImage=this.node.avatar.style.backgroundImage;
                    }
                }
                else{
                    return this;
                }
                if(online){
                    return;
                }
                for(var i=0;i<info1[3].length;i++){
                    this.removeSkill(info1[3][i]);
                }
                for(var i=0;i<info2[3].length;i++){
                    var info=get.info(info2[3][i]);
                    if(info&&info.zhuSkill&&!this.isZhu2()) continue;
                    this.addSkill(info2[3][i]);
                }
                if(Array.isArray(maxHp)){
                    this.maxHp=maxHp[1];
                    this.hp=maxHp[0];
                }
                else{
                    var num;
                    if(maxHp===false){
                        num=0;
                    }
                    else{
                        if(typeof maxHp!='number'){
                            maxHp=get.infoMaxHp(info2[2]);
                        }
                        num=maxHp-get.infoMaxHp(info1[2]);
                    }
                    if(typeof this.singleHp=='boolean'){
                        if(num%2!=0){
                            if(this.singleHp){
                                this.maxHp+=(num+1)/2;
                                this.singleHp=false;
                            }
                            else{
                                this.maxHp+=(num-1)/2;
                                this.singleHp=true;
                                if(!game.online){
                                    this.doubleDraw();
                                }
                            }
                        }
                        else{
                            this.maxHp+=num/2;
                        }
                    }
                    else{
                        this.maxHp+=num;
                    }
                }
                game.broadcast(function(player,from,to,skills){
                    player.reinit(from,to,null,true);
                    player.applySkills(skills);
                },this,from,to,get.skillState(this));
                game.addVideo('reinit3',this,{
                    from:from,
                    to:to,
                    hp:this.maxHp,
                    avatar2:this.name2==to
                });
                this.update();
            },
            uninit:function(){
                this.expandedSlots={};
                this.disabledSlots={};
                this.$syncDisable();
                if(this.isDisabledJudge()){
                    game.broadcastAll(function(player){
                        player.storage._disableJudge=false;
                        for(var i=0;i<player.node.judges.childNodes.length;i++){
                            if(player.node.judges.childNodes[i].name=='disable_judge'){
                                player.node.judges.removeChild(player.node.judges.childNodes[i]);
                                break;
                            }
                        }
                    },this);
                }
                this.node.avatar.hide();
                this.node.count.hide();
                if(this.node.wuxing){
                    this.node.wuxing.hide();
                }
                if(this.node.name_seat){
                    this.node.name_seat.remove();
                    delete this.node.name_seat;
                }
                if(this.storage.nohp) this.node.hp.show();
                this.classList.remove('unseen');
                this.classList.remove('unseen2');
                delete this.name;
                delete this.name1;
                delete this.sex;
                delete this.group;
                delete this.hp;
                delete this.maxHp;
                delete this.hujia;
                this.clearSkills(true);
                this.node.identity.style.backgroundColor='';
                this.node.intro.innerHTML='';
                this.node.name.innerHTML='';
                this.node.hp.innerHTML='';
                this.node.count.innerHTML='0';
                if(this.name2){
                    delete this.singleHp;
                    this.node.avatar2.hide();
                    this.node.name2.innerHTML='';
                    this.classList.remove('fullskin2')
                    delete this.name2;
                    this.node.count.classList.remove('p2');
                }
                for(var mark in this.marks){
                    this.marks[mark].remove();
                }
                ui.updatem(this);

                this.skipList=[];
                this.skills=this.skills.contains('cangji_yozuru')?['cangji_yozuru']:[];
                this.initedSkills=[];
                this.additionalSkills={};
                this.disabledSkills={};
                this.hiddenSkills=[];
                this.awakenedSkills=[];
                this.forbiddenSkills={};
                this.phaseNumber=0;
                this.stat=[{card:{},skill:{}}];
                this.tempSkills={};
                this.storage={};
                this.marks={};
                this.ai={friend:[],enemy:[],neutral:[]};

                return this;
            },
            getLeft:function(){
                return this.offsetLeft;
            },
            getTop:function(){
                return this.offsetTop;
            },
            smoothAvatar:function(vice,video){
                var div=ui.create.div('.fullsize');
                if(vice){
                    div.style.background=getComputedStyle(this.node.avatar2).background;
                    this.node.avatar2.appendChild(div);
                }
                else{
                    div.style.background=getComputedStyle(this.node.avatar).background;
                    this.node.avatar.appendChild(div);
                }
                ui.refresh(div);
                div.style.transition='all 1s';
                setTimeout(function(){
                    div.classList.add('removing');
                    setTimeout(function(){
                        div.remove();
                    },2000);
                },100);
                if(video!=false){
                    game.addVideo('smoothAvatar',this,vice);
                }
            },
            changeSeat:function(position,video){
                var player=this;
                if(video!==false) game.addVideo('changeSeat',player,position);
                var rect1=player.getBoundingClientRect();
                player.style.transition='all 0s';
                ui.refresh(player);
                player.dataset.position=position;
                var rect2=player.getBoundingClientRect();
                var dx=rect1.left-rect2.left;
                var dy=rect1.top-rect2.top;
                if((game.chess||(player.dataset.position!=0&&position!=0))&&player.classList.contains('linked')){
                    player.style.transform='rotate(-90deg) translate('+(-dy)+'px,'+(dx)+'px)';
                }
                else{
                    player.style.transform='translate('+(dx)+'px,'+(dy)+'px)';
                }
                setTimeout(function(){
                    player.style.transition='';
                    ui.refresh(player);
                    player.style.transform='';
                },100);
            },
            send:function(){
                if(!this.ws||this.ws.closed) return this;
                this.ws.send.apply(this.ws,arguments);
                return this;
            },
            getId:function(){
                if(_status.video||_status.connectMode) return this;
                if(this.playerid){
                    delete game.playerMap[this.playerid];
                }
                this.playerid=get.id();
                game.playerMap[this.playerid]=this;
                return this;
            },
            throwEmotion:function(target,emotion){
                game.broadcastAll(function(player,target,emotion){
                    player.$throwEmotion(target,emotion);
                },this,target,emotion);
            },
            emotion:function(pack,id){
                var str='<img src="##assetURL##image/emotion/'+pack+'/'+id+'.gif" width="50" height="50">';
                lib.element.player.say.call(this,str);
                game.broadcast(function(id,str){
                    if(lib.playerOL[id]){
                        lib.playerOL[id].say(str);
                    }
                    else if(game.connectPlayers){
                        for(var i=0;i<game.connectPlayers.length;i++){
                            if(game.connectPlayers[i].playerid==id){
                                lib.element.player.say.call(game.connectPlayers[i],str);
                                return;
                            }
                        }
                    }
                },this.playerid,str);
            },
            chat:function(str){
                if(get.is.banWords(str)) return;
                lib.element.player.say.call(this,str);
                game.broadcast(function(id,str){
                    if(lib.playerOL[id]){
                        lib.playerOL[id].say(str);
                    }
                    else if(game.connectPlayers){
                        for(var i=0;i<game.connectPlayers.length;i++){
                            if(game.connectPlayers[i].playerid==id){
                                lib.element.player.say.call(game.connectPlayers[i],str);
                                return;
                            }
                        }
                    }
                },this.playerid,str);
            },
            say:function(str){
                str=str.replace(/##assetURL##/g,lib.assetURL);
                var dialog=ui.create.dialog('hidden');
                dialog.classList.add('static');
                dialog.add('<div class="text" style="word-break:break-all;display:inline">'+str+'</div>');
                dialog.classList.add('popped');
                ui.window.appendChild(dialog);
                var width=dialog.content.firstChild.firstChild.offsetWidth;
                if(width<190){
                    dialog._mod_height=-16;
                }
                else{
                    dialog.content.firstChild.style.textAlign='left';
                }
                dialog.style.width=(width+16)+'px';
                var refnode;
                if(this.node&&this.node.avatar&&this.parentNode==ui.arena){
                    refnode=this.node.avatar;
                }
                if(refnode){
                    lib.placePoppedDialog(dialog,{
                        clientX:(ui.arena.offsetLeft+this.getLeft()+refnode.offsetLeft+refnode.offsetWidth/2)*game.documentZoom,
                        clientY:(ui.arena.offsetTop+this.getTop()+refnode.offsetTop+refnode.offsetHeight/4)*game.documentZoom
                    });
                }
                else{
                    lib.placePoppedDialog(dialog,{
                        clientX:(this.getLeft()+this.offsetWidth/2)*game.documentZoom,
                        clientY:(this.getTop()+this.offsetHeight/4)*game.documentZoom
                    });
                }
                if(dialog._mod_height){
                    dialog.content.firstChild.style.padding=0;
                }
                setTimeout(function(){
                    dialog.delete();
                },lib.quickVoice.includes(str)?3800:2000);
                var name=get.translation(this.name);
                var info=[name?(name+'['+this.nickname+']'):this.nickname,str];
                lib.chatHistory.push(info);
                if(_status.addChatEntry){
                    if(_status.addChatEntry._origin.parentNode){
                        _status.addChatEntry(info,false);
                    }
                    else{
                        delete _status.addChatEntry;
                    }
                }
                if(lib.config.background_speak&&lib.quickVoice.includes(str)){
                    game.playAudio('voice',(this.sex=='female'?'female':'male'),lib.quickVoice.indexOf(str));
                }
            },
            showGiveup:function(){
                this._giveUp=true;
                if(this==game.me){
                    ui.create.giveup();
                }
                else if(this.isOnline2()){
                    this.send(ui.create.giveup);
                }
            },
            applySkills:function(skills){
                for(var i in skills){
                    if(i=='global'){
                        lib.skill.global=skills[i];
                    }
                    //else if(i=='skillinfo'){
                    //	for(var j in skills[i]){
                    //		if(!lib.skill[j]){
                    //			lib.skill[j]={};
                    //		}
                    //		lib.skill[j].chooseButton=skills[i][j];
                    //	}
                    //}
                    else if(i=='stat'){
                        this.stat=[skills.stat];
                    }
                    else if(lib.playerOL[i]){
                        for(var j in skills[i]){
                            lib.playerOL[i][j]=skills[i][j];
                        }
                    }
                }
            },
            getState:function(){
                var state={
                    hp:this.hp,
                    maxHp:this.maxHp,
                    nickname:this.nickname,
                    sex:this.sex,
                    group:this.group,
                    name:this.name,
                    name1:this.name1,
                    name2:this.name2,
                    handcards:this.getCards('hs'),
                    gaintag:[],
                    equips:this.getCards('e'),
                    judges:this.getCards('j'),
                    specials:this.getCards('s'),
                    expansions:this.getCards('x'),
                    expansion_gaintag:[],
                    disableJudge:this.isDisabledJudge(),
                    disabledSlots:this.disabledSlots,
                    expandedSlots:this.expandedSlots,
                    views:[],
                    position:parseInt(this.dataset.position),
                    hujia:this.hujia,
                    side:this.side,
                    identityShown:this.identityShown,
                    identityNode:[this.node.identity.innerHTML,this.node.identity.dataset.color],
                    identity:this.identity,
                    dead:this.isDead(),
                    linked:this.isLinked(),
                    turnedover:this.isTurnedOver(),
                    out:this.isOut(),
                    phaseNumber:this.phaseNumber,
                    unseen:this.isUnseen(0),
                    unseen2:this.isUnseen(1),
                    seatNum:this.seatNum,
                }
                for(var i=0;i<state.judges.length;i++){
                    state.views[i]=state.judges[i].viewAs;
                }
                for(var i=0;i<state.handcards.length;i++){
                    state.gaintag[i]=state.handcards[i].gaintag;
                }
                for(var i=0;i<state.expansions.length;i++){
                    state.expansion_gaintag[i]=state.expansions[i].gaintag;
                }
                if(this.getModeState){
                    state.mode=this.getModeState();
                }
                return state;
            },
            setNickname:function(str){
                this.node.nameol.innerHTML=(str||this.nickname||'').slice(0,12);
                return this;
            },
            setAvatar:function(name,name2,video,fakeme){
                var node;
                if(this.name2==name){
                    node=this.node.avatar2;
                    this.smoothAvatar(true,video);
                }
                else if(this.name==name){
                    node=this.node.avatar;
                    this.smoothAvatar(false,video);
                }
                if(node){
                    node.setBackground(name2,'character');
                    if(this==game.me&&ui.fakeme&&fakeme!==false){
                        ui.fakeme.style.backgroundImage=node.style.backgroundImage;
                    }
                    if(video!=false){
                        game.addVideo('setAvatar',this,[name,name2]);
                    }
                }
                game.broadcast(function(player,name,name2){
                    player.setAvatar(name,name2,false);
                },this,name,name2);
            },
            setAvatarQueue:function(name, list){
                var node;
                var player=this;
                if(player.name2==name){
                    node=player.node.avatar2;
                }
                else{
                    node=player.node.avatar;
                }
                if(node._avatarqueue){
                    for(var i=0;i<list.length;i++){
                        node._avatarqueue.push(list[i]);
                    }
                }
                else{
                    var func=function(){
                        if(node._avatarqueue.length){
                            player.setAvatar(name,node._avatarqueue.shift(),false,false);
                        }
                        else{
                            clearInterval(node._avatarqueueinterval);
                            delete node._avatarqueue;
                            delete node._avatarqueueinterval;
                            player.setAvatar(name,name,false,false);
                        }
                    };
                    node._avatarqueue=list.slice(0);
                    node._avatarqueueinterval=setInterval(func,1000);
                    func();
                }
                game.addVideo('setAvatarQueue',this,[name,list]);
            },
            flashAvatar:function(skill,name){
                if(lib.skill[name]&&!lib.character[name]){
                    var stop=false;
                    var list=lib.config.all.characters.slice(0);
                    for(var i in lib.characterPack){
                        list.add(i);
                    }
                    for(var i=0;i<list.length;i++){
                        for(var j in lib.characterPack[list[i]]){
                            if(lib.characterPack[list[i]][j][3].contains(name)){
                                name=j;
                                stop=true;
                                break;
                            }
                        }
                        if(stop){
                            break;
                        }
                    }
                }
                if(lib.character[this.name2]&&lib.character[this.name2][3].contains(skill)){
                    this.setAvatarQueue(this.name2,[name]);
                }
                else{
                    this.setAvatarQueue(this.name,[name]);
                }
            },
            update:function(){
                if(_status.video&&arguments.length==0) return;
                if(this.hp>=this.maxHp) this.hp=this.maxHp;
                game.broadcast(function(player,hp,maxHp,hujia){
                    player.hp=hp;
                    player.maxHp=maxHp;
                    player.hujia=hujia;
                    player.$update();
                },this,this.hp,this.maxHp,this.hujia);
                this.$update();
            },
            $update:function(){
                if(this.hp>=this.maxHp) this.hp=this.maxHp;
                var hp=this.node.hp;
                hp.style.transition='none';
                if(!_status.video){
                    if(this.hujia){
                        this.markSkill('ghujia');
                    }
                    else{
                        this.unmarkSkill('ghujia');
                    }
                }
                if(!this.storage.nohp){
                    if(this.maxHp==Infinity){
                        hp.innerHTML='∞';
                    }
                    else if(game.layout=='default'&&this.maxHp>14){
                        hp.innerHTML=this.hp+'/'+this.maxHp;
                        hp.classList.add('text');
                    }
                    else if(get.is.newLayout()&&
                    (
                        this.maxHp>9||
                        (this.maxHp>5&&this.classList.contains('minskin'))||
                        ((game.layout=='mobile'||game.layout=='long')&&this.dataset.position==0&&this.maxHp>7)
                    )){
                        hp.innerHTML=this.hp+'<br>/<br>'+this.maxHp+'<div></div>';
                        if(this.hp==0){
                            hp.lastChild.classList.add('lost');
                        }
                        hp.classList.add('textstyle');
                        // hp.classList.remove('long');
                    }
                    else{
                        hp.innerHTML='';
                        hp.classList.remove('text');
                        hp.classList.remove('textstyle');
                        while(this.maxHp>hp.childNodes.length){
                            ui.create.div(hp);
                        }
                        while(Math.max(0,this.maxHp)<hp.childNodes.length){
                            hp.removeChild(hp.lastChild);
                        }
                        for(var i=0;i<this.maxHp;i++){
                            var index=i;
                            if(get.is.newLayout()){
                                index=this.maxHp-i-1;
                            }
                            if(i<this.hp){
                                hp.childNodes[index].classList.remove('lost');
                            }
                            else{
                                hp.childNodes[index].classList.add('lost');
                            }
                        }
                        // if(this.maxHp==9){
                        // 	hp.classList.add('long');
                        // }
                        // else{
                        // 	hp.classList.remove('long');
                        // }
                    }
                    if(hp.classList.contains('room')){
                        hp.dataset.condition='high';
                    }
                    else if(this.hp==0){
                        hp.dataset.condition='';
                    }
                    else if(this.hp>Math.round(this.maxHp/2)||this.hp===this.maxHp){
                        hp.dataset.condition='high';
                    }
                    else if(this.hp>Math.floor(this.maxHp/3)){
                        hp.dataset.condition='mid';
                    }
                    else{
                        hp.dataset.condition='low';
                    }

                    setTimeout(function(){
                        hp.style.transition='';
                    });
                }
                var numh=this.countCards('h');
                if(_status.video){
                    numh=arguments[0];
                }
                if(numh>=10){
                    numh=numh.toString();
                    this.node.count.dataset.condition='low';
                    this.node.count.innerHTML=numh[0]+'<br>'+numh[1];
                }
                else{
                    if(numh>5){
                        this.node.count.dataset.condition='higher';
                    }
                    else if(numh>2){
                        this.node.count.dataset.condition='high';
                    }
                    else if(numh>0){
                        this.node.count.dataset.condition='mid';
                    }
                    else{
                        this.node.count.dataset.condition='none';
                    }
                    this.node.count.innerHTML=numh;
                }
                if(this.updates){
                    for(var i=0;i<lib.element.player.updates.length;i++){
                        lib.element.player.updates[i](this);
                    }
                }
                if(!_status.video){
                    game.addVideo('update',this,[this.countCards('h'),this.hp,this.maxHp,this.hujia]);
                }
                this.updateMarks();
                return this;
            },
            clearMark:function(i,log){
                let num=this.countMark(i);
                if(num>0) this.removeMark(i,num,log)
            },
            removeMark:function(i,num,log){
                if(typeof num!='number'||!num) num=1;
                if(typeof this.storage[i]!='number'||!this.storage[i]) return;
                if(num>this.storage[i]) num=this.storage[i];
                this.storage[i]-=num;
                if(log!==false){
                    var str=false;
                    var info=get.info(i);
                    if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
                    else str=lib.translate[i];
                    if(str) game.log(this,'移去了',get.cnNumber(num),'个','#g【'+str+'】');
                }
                this.syncStorage(i);
                this[(this.storage[i]||(lib.skill[i]&&lib.skill[i].mark))?'markSkill':'unmarkSkill'](i);
            },
            addMark:function(i,num,log){
                if(typeof num!='number'||!num) num=1;
                if(typeof this.storage[i]!='number') this.storage[i]=0;
                this.storage[i]+=num;
                if(log!==false){
                    var str=false;
                    var info=get.info(i);
                    if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
                    else str=lib.translate[i];
                    if(str) game.log(this,'获得了',get.cnNumber(num),'个','#g【'+str+'】');
                }
                this.syncStorage(i);
                this.markSkill(i);
            },
            setMark:function(name,num,log){
                const count=this.countMark(name);
                if(count>num)this.removeMark(name,count-num,log);
                else if(count<num)this.addMark(name,num-count,log);
            },
            countMark:function(i){
                if(this.storage[i]==undefined) return 0;
                if(typeof this.storage[i]=='number') return this.storage[i];
                if(Array.isArray(this.storage[i])) return this.storage[i].length;
                return 0;
            },
            hasMark:function(i){
                return this.countMark(i)>0;
            },
            updateMark:function(i,storage){
                if(!this.marks[i]){
                    if(lib.skill[i]&&lib.skill[i].intro&&(this.storage[i]||lib.skill[i].intro.markcount)){
                        this.markSkill(i);
                        if(!this.marks[i]) return this;
                    }
                    else{
                        return this;
                    }
                }
                if(storage&&this.storage[i]){
                    this.syncStorage(i);
                }
                if(i=='ghujia'||((!this.marks[i].querySelector('.image')||this.storage[i+'_markcount'])&&
                    lib.skill[i]&&lib.skill[i].intro&&!lib.skill[i].intro.nocount&&
                    (this.storage[i]||this.storage[i+'_markcount']||lib.skill[i].intro.markcount))){
                    this.marks[i].classList.add('overflowmark')
                    var num=0;
                    if(typeof lib.skill[i].intro.markcount=='function'){
                        num=lib.skill[i].intro.markcount(this.storage[i],this);
                    }
                    else if(lib.skill[i].intro.markcount=='expansion'){
                        num=this.countCards('x',(card)=>card.hasGaintag(i));
                    }
                    else if(typeof this.storage[i+'_markcount']=='number'){
                        num=this.storage[i+'_markcount'];
                    }
                    else if(i=='ghujia'){
                        num=this.hujia;
                    }
                    else if(typeof this.storage[i]=='number'){
                        num=this.storage[i];
                    }
                    else if(Array.isArray(this.storage[i])){
                        num=this.storage[i].length;
                    }
                    if(num){
                        if(!this.marks[i].markcount){
                            this.marks[i].markcount=ui.create.div('.markcount.menubutton',this.marks[i]);
                        }
                        this.marks[i].markcount.innerHTML=num;
                    }
                    else if(this.marks[i].markcount){
                        this.marks[i].markcount.delete();
                        delete this.marks[i].markcount;
                    }
                }
                else{
                    if(this.marks[i].markcount){
                        this.marks[i].markcount.delete();
                        delete this.marks[i].markcount;
                    }
                    if(lib.skill[i].mark=='auto'){
                        this.unmarkSkill(i);
                    }
                }
                return this;
            },
            updateMarks:function(connect){
                if(typeof connect=='string'&&_status.connectMode&&!game.online){
                    game.broadcast(function(player,storage,skill){
                        player.storage[skill]=storage;
                        player.updateMarks();
                    },this,this.storage[connect],connect);
                }
                for(var i in this.marks){
                    this.updateMark(i);
                }
            },
            num:function(arg1,arg2,arg3){
                if(get.itemtype(arg1)=='position'){
                    return this.get(arg1,arg2,arg3).length;
                }
                else if(arg1=='s'){
                    if(typeof arg2=='boolean'){
                        return game.expandSkills(this.getSkills(arg2).concat(lib.skill.global)).contains(arg3);
                    }
                    else{
                        return game.expandSkills(this.getSkills().concat(lib.skill.global)).contains(arg2);
                    }
                }
            },
            line:function(target,config){
                if(get.itemtype(target)=='players'){
                    for(var i=0;i<target.length;i++){
                        this.line(target[i],config);
                    }
                }
                else if(get.itemtype(target)=='player'){
                    if(target==this) return;
                    game.broadcast(function(player,target,config){
                        player.line(target,config);
                    },this,target,config);
                    game.addVideo('line',this,[target.dataset.position,config]);
                    game.linexy([
                        this.getLeft()+this.offsetWidth/2,
                        this.getTop()+this.offsetHeight/2,
                        target.getLeft()+target.offsetWidth/2,
                        target.getTop()+target.offsetHeight/2
                    ],config,true);
                }
            },
            line2:function(targets,config){
                this.line(targets[0],config);
                targets=targets.slice(0);
                for(var i=1;i<targets.length;i++){
                    (function(j){
                        setTimeout(function(){
                            targets[j-1].line(targets[j],config);
                        },lib.config.duration*i);
                    }(i));
                }
            },
            getNext:function(){
                if(this.hasSkill('undist')) return null;
                var target=this;
                for(var i=0;i<game.players.length-1;i++){
                    target=target.next;
                    if(!target.hasSkill('undist')){
                        return target;
                    }
                }
                return null;
            },
            getPrevious:function(){
                if(this.hasSkill('undist')) return null;
                var target=this;
                for(var i=0;i<game.players.length-1;i++){
                    target=target.previous;
                    if(!target.hasSkill('undist')){
                        return target;
                    }
                }
                return null;
            },
            countUsed:function(card,type){
                if(type===true){
                    var num=0;
                    var history=this.getHistory('useCard');
                    for(var i=0;i<history.length;i++){
                        if(!card) num++;
                        else if(typeof card=='string'&&history[i].card&&card==history[i].card.name) num++;
                        else if(typeof card=='object'&&history[i].card&&card.name==history[i].card.name) num++;
                    }
                    return num;
                }
                var num;
                var stat=this.getStat('card');
                if(!card){
                    num=0;
                    for(var i in stat){
                        if(typeof stat[i]=='number') num+=stat[i];
                    }
                    return num;
                }
                if(typeof card=='object'){
                    card=card.name;
                }
                num=stat[card];
                if(typeof num!='number') return 0;
                return num;
            },
            countSkill:function(skill){
                var num=this.getStat('skill')[skill];
                if(num==undefined) return 0;
                return num;
            },
            getStockSkills:function(unowned,unique,hidden){
                var list=[];
                if(lib.character[this.name]&&(hidden||!this.isUnseen(0))){
                    list.addArray(lib.character[this.name][3]);
                }
                if(lib.character[this.name1]&&(hidden||!this.isUnseen(0))){
                    list.addArray(lib.character[this.name1][3]);
                }
                if(lib.character[this.name2]&&(hidden||!this.isUnseen(1))){
                    list.addArray(lib.character[this.name2][3]);
                }
                if(!unowned){
                    for(var i=0;i<list.length;i++){
                        if(!this.hasSkill(list[i])){
                            list.splice(i--,1);
                        }
                    }
                }
                if(!unique){
                    for(var i=0;i<list.length;i++){
                        var info=lib.skill[list[i]];
                        if(!info||info.unique||info.temp||info.sub||info.charlotte){
                            list.splice(i--,1);
                        }
                    }
                }
                return list;
            },
            getCards:function(arg1,arg2){
                if(typeof arg1!='string'){
                    arg1='h';
                }
                var cards=[],cards1=[];
                var i,j;
                for(i=0;i<arg1.length;i++){
                    if(arg1[i]=='h'){
                        for(j=0;j<this.node.handcards1.childElementCount;j++){
                            if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&!this.node.handcards1.childNodes[j].classList.contains('glows')){
                                cards.push(this.node.handcards1.childNodes[j]);
                            }
                        }
                        for(j=0;j<this.node.handcards2.childElementCount;j++){
                            if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&!this.node.handcards2.childNodes[j].classList.contains('glows')){
                                cards.push(this.node.handcards2.childNodes[j]);
                            }
                        }
                    }
                    else if(arg1[i]=='s'){
                        for(j=0;j<this.node.handcards1.childElementCount;j++){
                            if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&this.node.handcards1.childNodes[j].classList.contains('glows')){
                                cards.push(this.node.handcards1.childNodes[j]);
                            }
                        }
                        for(j=0;j<this.node.handcards2.childElementCount;j++){
                            if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&this.node.handcards2.childNodes[j].classList.contains('glows')){
                                cards.push(this.node.handcards2.childNodes[j]);
                            }
                        }
                    }
                    else if(arg1[i]=='e'){
                        for(j=0;j<this.node.equips.childElementCount;j++){
                            if(!this.node.equips.childNodes[j].classList.contains('removing')&&!this.node.equips.childNodes[j].classList.contains('feichu')){
                                cards.push(this.node.equips.childNodes[j]);
                            }
                        }
                    }
                    else if(arg1[i]=='j'){
                        for(j=0;j<this.node.judges.childElementCount;j++){
                            if(!this.node.judges.childNodes[j].classList.contains('removing')&&!this.node.judges.childNodes[j].classList.contains('feichu')){
                                cards.push(this.node.judges.childNodes[j]);
                                if(this.node.judges.childNodes[j].viewAs&&arguments.length>1){
                                    this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
                                    this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
                                    cards1.push(this.node.judges.childNodes[j]);
                                }
                            }
                        }
                    }
                    else if(arg1[i]=='x'){
                        for(j=0;j<this.node.expansions.childElementCount;j++){
                            if(!this.node.expansions.childNodes[j].classList.contains('removing')){
                                cards.push(this.node.expansions.childNodes[j]);
                            }
                        }
                    }
                }
                if(arguments.length==1){
                    return cards;
                }
                if(arg2){
                    if(typeof arg2=='string'){
                        for(i=0;i<cards.length;i++){
                            if(get.name(cards[i])!=arg2){
                                cards.splice(i,1);i--;
                            }
                        }
                    }
                    else if(typeof arg2=='object'){
                        for(i=0;i<cards.length;i++){
                            for(j in arg2){
                                var value;
                                if(j=='type'||j=='subtype'||j=='color'||j=='suit'||j=='number'){
                                    value=get[j](cards[i]);
                                }
                                else{
                                    value=cards[i][j];
                                }
                                if((typeof arg2[j]=='string'&&value!=arg2[j])||
                                    (Array.isArray(arg2[j])&&!arg2[j].contains(value))){
                                    cards.splice(i--,1);break;
                                }
                            }
                        }
                    }
                    else if(typeof arg2=='function'){
                        for(i=0;i<cards.length;i++){
                            if(!arg2(cards[i])){
                                cards.splice(i--,1);
                            }
                        }
                    }
                }
                for(i=0;i<cards1.length;i++){
                    if(cards1[i].tempJudge){
                        cards1[i].name=cards1[i].tempJudge;
                        delete cards1[i].tempJudge;
                    }
                }
                return cards;
            },
            getDiscardableCards:function(player,arg1,arg2){
                var cards=this.getCards(arg1,arg2);
                for(var i=0;i<cards.length;i++){
                    if(!lib.filter.canBeDiscarded(cards[i],player,this)){
                        cards.splice(i--,1);
                    }
                }
                return cards;
            },
            getGainableCards:function(player,arg1,arg2){
                var cards=this.getCards(arg1,arg2);
                for(var i=0;i<cards.length;i++){
                    if(!lib.filter.canBeGained(cards[i],player,this)){
                        cards.splice(i--,1);
                    }
                }
                return cards;
            },
            getGainableSkills:function(func){
                var list=[];
                var names=[this.name,this.name1,this.name2];
                for(var i=0;i<names.length;i++){
                    list.addArray(get.gainableSkillsName(names[i],func));
                }
                return list;
            },
            countCards:function(arg1,arg2){
                return this.getCards(arg1,arg2).length;
            },
            countDiscardableCards:function(player,arg1,arg2){
                return this.getDiscardableCards(player,arg1,arg2).length;
            },
            countGainableCards:function(player,arg1,arg2){
                return this.getGainableCards(player,arg1,arg2).length;
            },
            getOriginalSkills:function(){
                var skills=[];
                if(lib.character[this.name]&&!this.isUnseen(0)){
                    skills.addArray(lib.character[this.name][3]);
                }
                if(this.name2&&lib.character[this.name2]&&!this.isUnseen(1)){
                    skills.addArray(lib.character[this.name2][3]);
                }
                return skills;
            },
            getModableSkills:function(useCache){
                var func = function(player){
                    var skills=player.getSkills().concat(lib.skill.global);
                    game.expandSkills(skills);
                    skills = skills.filter(function(skill){
                        var info = get.info(skill);
                        return info && info.mod;
                    });
                    skills.sort((a,b)=>get.priority(a)-get.priority(b));
                    return skills;
                };
                if(!useCache)return func(this);
                return game.callFuncUseStepCache("player.getModableSkills",func,[this]);
            },
            getSkills:function(arg2,arg3,arg4){
                var skills=this.skills.slice(0);
                var es=[];
                var i,j;
                if(arg3!==false){
                    for(i=0;i<this.node.equips.childElementCount;i++){
                        if(!this.node.equips.childNodes[i].classList.contains('removing')){
                            var equipskills=get.info(this.node.equips.childNodes[i],false).skills;
                            if(equipskills){
                                es.addArray(equipskills);
                            }
                        }
                    }
                    if(arg2=='e'){
                        return es;
                    }
                }
                for(var i in this.additionalSkills){
                    if(Array.isArray(this.additionalSkills[i])&&(arg2||i.indexOf('hidden:')!==0)){
                        for(j=0;j<this.additionalSkills[i].length;j++){
                            if(this.additionalSkills[i][j]){
                                skills.add(this.additionalSkills[i][j]);
                            }
                        }
                    }
                    else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
                        skills.add(this.additionalSkills[i]);
                    }
                }
                for(var i in this.tempSkills){
                    skills.add(i);
                }
                if(arg2) skills.addArray(this.hiddenSkills);
                if(arg2===false||arg2=='invisible') skills.addArray(this.invisibleSkills);
                if(arg3!==false) skills.addArray(es);
                for(var i in this.forbiddenSkills){
                    skills.remove(i);
                }
                if(arg4!==false){
                    skills=game.filterSkills(skills,this,es);
                }
                return skills;
            },
            get:function(arg1,arg2,arg3,arg4){
                var i,j;
                if(arg1=='s'){
                    var skills=this.skills.slice(0);
                    var es=[];
                    if(arg3!==false){
                        for(i=0;i<this.node.equips.childElementCount;i++){
                            if(!this.node.equips.childNodes[i].classList.contains('removing')&&!this.node.equips.childNodes[i].classList.contains('feichu')){
                                var equipskills=get.info(this.node.equips.childNodes[i]).skills;
                                if(equipskills){
                                    es.addArray(equipskills);
                                }
                            }
                        }
                        if(arg2=='e'){
                            return es;
                        }
                    }
                    for(var i in this.additionalSkills){
                        if(Array.isArray(this.additionalSkills[i])){
                            for(j=0;j<this.additionalSkills[i].length;j++){
                                if(this.additionalSkills[i][j]){
                                    skills.add(this.additionalSkills[i][j]);
                                }
                            }
                        }
                        else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
                            skills.add(this.additionalSkills[i]);
                        }
                    }
                    for(var i in this.tempSkills){
                        skills.add(i);
                    }
                    if(arg2) skills.addArray(this.hiddenSkills);
                    if(arg3!==false) skills.addArray(es);
                    for(var i in this.forbiddenSkills){
                        skills.remove(i);
                    }
                    if(arg4!==false){
                        skills=game.filterSkills(skills,this,es);
                    }
                    return skills;
                }
                else if(get.is.pos(arg1)){
                    var cards=[],cards1=[];
                    for(i=0;i<arg1.length;i++){
                        if(arg1[i]=='h'){
                            for(j=0;j<this.node.handcards1.childElementCount;j++){
                                if(!this.node.handcards1.childNodes[j].classList.contains('removing')&&!this.node.handcards1.childNodes[j].classList.contains('feichu')&&!this.node.handcards1.childNodes[j].classList.contains('glows')){
                                    cards.push(this.node.handcards1.childNodes[j]);
                                }
                            }
                            for(j=0;j<this.node.handcards2.childElementCount;j++){
                                if(!this.node.handcards2.childNodes[j].classList.contains('removing')&&!this.node.handcards2.childNodes[j].classList.contains('feichu')&&!this.node.handcards2.childNodes[j].classList.contains('glows')){
                                    cards.push(this.node.handcards2.childNodes[j]);
                                }
                            }
                        }
                        else if(arg1[i]=='e'){
                            for(j=0;j<this.node.equips.childElementCount;j++){
                                if(!this.node.equips.childNodes[j].classList.contains('removing')&&!this.node.equips.childNodes[j].classList.contains('feichu')){
                                    cards.push(this.node.equips.childNodes[j]);
                                }
                            }
                            if(arguments.length==2&&typeof arg2=='string'&&/1|2|3|4|5/.test(arg2)){
                                for(j=0;j<cards.length;j++){
                                    if(get.subtype(cards[j])=='equip'+arg2) return cards[j];
                                }
                                return;
                            }
                        }
                        else if(arg1[i]=='j'){
                            for(j=0;j<this.node.judges.childElementCount;j++){
                                if(!this.node.judges.childNodes[j].classList.contains('removing')&&!this.node.judges.childNodes[j].classList.contains('feichu')){
                                    cards.push(this.node.judges.childNodes[j]);
                                    if(this.node.judges.childNodes[j].viewAs&&arguments.length>1){
                                        this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
                                        this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
                                        cards1.push(this.node.judges.childNodes[j]);
                                    }
                                }
                            }
                        }
                    }
                    if(arguments.length==1){
                        return cards;
                    }
                    if(arg2!=undefined){
                        if(typeof arg3=='function'){
                            var cards2=cards.slice(0);
                            cards.sort(function(a,b){
                                return arg3(b,cards2)-arg3(a,cards2);
                            });
                        }
                        if(typeof arg2=='string'){
                            for(i=0;i<cards.length;i++){
                                if(cards[i].name!=arg2){
                                    cards.splice(i,1);i--;
                                }
                            }
                        }
                        else if(typeof arg2=='object'){
                            for(i=0;i<cards.length;i++){
                                for(j in arg2){
                                    if(j=='type'){
                                        if(typeof arg2[j]=='object'){
                                            if(arg2[j].contains(get.type(cards[i]))==false){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                        else if(typeof arg2[j]=='string'){
                                            if(get.type(cards[i])!=arg2[j]){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                    }
                                    else if(j=='subtype'){
                                        if(typeof arg2[j]=='object'){
                                            if(arg2[j].contains(get.subtype(cards[i]))==false){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                        else if(typeof arg2[j]=='string'){
                                            if(get.subtype(cards[i])!=arg2[j]){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                    }
                                    else if(j=='color'){
                                        if(typeof arg2[j]=='object'){
                                            if(arg2[j].contains(get.color(cards[i]))==false){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                        else if(typeof arg2[j]=='string'){
                                            if(get.color(cards[i])!=arg2[j]){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                    }
                                    else if(j=='suit'){
                                        if(typeof arg2[j]=='object'){
                                            if(arg2[j].contains(get.suit(cards[i]))==false){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                        else if(typeof arg2[j]=='string'){
                                            if(get.suit(cards[i])!=arg2[j]){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                    }
                                    else if(j=='number'){
                                        if(typeof arg2[j]=='object'){
                                            if(arg2[j].contains(get.number(cards[i]))==false){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                        else if(typeof arg2[j]=='string'){
                                            if(get.number(cards[i])!=arg2[j]){
                                                cards.splice(i,1);i--;break;
                                            }
                                        }
                                    }
                                    else if(typeof arg2[j]=='object'){
                                        if(arg2[j].contains(cards[i][j])==false){
                                            cards.splice(i,1);i--;break;
                                        }
                                    }
                                    else if(typeof arg2[j]=='string'){
                                        if(cards[i][j]!=arg2[j]){
                                            cards.splice(i,1);i--;break;
                                        }
                                    }
                                }
                            }
                        }
                        else if(typeof arg2=='number'&&arg2>0){
                            cards.splice(arg2);
                        }
                        else if(typeof arg2=='function'){
                            for(i=0;i<cards.length;i++){
                                if(!arg2(cards[i])){
                                    cards.splice(i,1);i--;
                                }
                            }
                        }
                    }
                    for(i=0;i<cards1.length;i++){
                        if(cards1[i].tempJudge){
                            cards1[i].name=cards1[i].tempJudge;
                            delete cards1[i].tempJudge;
                        }
                    }
                    if(arg2===0) return cards[0];
                    if(typeof arg3=='number'){
                        if(arg3==0) return cards[0];
                        cards.splice(arg3);
                    }
                    if(typeof arg4=='number'){
                        if(arg4==0) return cards[0];
                        cards.splice(arg4);
                    }
                    return cards;
                }
            },
            syncStorage:function(skill){
                switch(get.itemtype(this.storage[skill])){
                    case 'cards':game.addVideo('storage',this,[skill,get.cardsInfo(this.storage[skill]),'cards']);break;
                    case 'card':game.addVideo('storage',this,[skill,get.cardInfo(this.storage[skill]),'card']);break;
                    default:
                    try{
                        game.addVideo('storage',this,[skill,JSON.parse(JSON.stringify(this.storage[skill]))]);
                    }
                    catch(e){
                        console.log(this.storage[skill]);
                    }
                }
            },
            syncSkills:function(){
                game.broadcast(function(player,skills){
                    player.applySkills(skills);
                },this,get.skillState(this));
            },
            playerfocus:function(time){
                time=time||1000;
                this.classList.add('playerfocus');
                ui.arena.classList.add('playerfocus');
                var that=this;
                setTimeout(function(){
                    that.classList.remove('playerfocus');
                    ui.arena.classList.remove('playerfocus');
                },time);
                game.addVideo('playerfocus',this,time);
                game.broadcast(function(player,time){
                    player.playerfocus(time);
                },this,time);
                return this;
            },
            setIdentity:function(identity,nature){
                if(!identity) identity=this.identity;
                if(get.is.jun(this)){
                    this.node.identity.firstChild.innerHTML='君';
                }
                else{
                    this.node.identity.firstChild.innerHTML=get.translation(identity);
                }
                this.node.identity.dataset.color=nature||identity;
                return this;
            },
            insertPhase:function(skill,insert){
                var evt=_status.event.getParent('phase');
                var next;
                if(evt&&evt.parent&&evt.parent.next){
                    evt=evt.parent;
                    next=game.createEvent('phase',false,evt);
                }
                else if(_status.event.parent&&_status.event.parent.next){
                    evt=_status.event.parent;
                    next=game.createEvent('phase',false,evt);
                }
                else{
                    evt=null;
                    next=game.createEvent('phase',false);
                }
                if(evt&&insert&&evt.next.contains(next)){
                    evt.next.remove(next);
                    evt.next.unshift(next);
                }
                next.player=this;
                next.forceDie=true;
                next.includeOut=true;
                next.skill=skill||_status.event.name;
                next.setContent('phase');
                return next;
            },
            insertEvent:function(name,content,arg){
                var evt=_status.event.getParent('phase');
                var next;
                if(evt&&evt.parent&&evt.parent.next){
                    next=game.createEvent(name,null,evt.parent);
                }
                else{
                    next=game.createEvent(name);
                }
                for(var i in arg){
                    next[i]=arg[i];
                }
                next.player=this;
                next.setContent(content);
                return next;
            },
            phase:function(skill){
                var next=game.createEvent('phase',false);
                next.player=this;
                next.setContent('phase');
                if(!_status.roundStart){
                    _status.roundStart=this;
                }
                if(skill){
                    next.skill=skill;
                }
                next.forceDie=true;
                next.includeOut=true;
                return next;
            },
            phaseZhunbei:function(){
                var next=game.createEvent('phaseZhunbei');
                next.player=this;
                next.setContent('phaseZhunbei');
                return next;
            },
            phaseJudge:function(){
                var next=game.createEvent('phaseJudge');
                next.player=this;
                next.setContent('phaseJudge');
                return next;
            },
            phaseDraw:function(){
                var next=game.createEvent('phaseDraw');
                next.player=this;
                next.num=2;
                if((get.config('first_less')||_status.connectMode||_status.first_less_forced)&&game.phaseNumber==1&&_status.first_less){
                    next.num--;
                }
                next.setContent('phaseDraw');
                return next;
            },
            phaseUse:function(){
                var next=game.createEvent('phaseUse');
                next.player=this;
                next.setContent('phaseUse');
                return next;
            },
            phaseDiscard:function(){
                var next=game.createEvent('phaseDiscard');
                next.player=this;
                next.setContent('phaseDiscard');
                return next;
            },
            phaseJieshu:function(){
                var next=game.createEvent('phaseJieshu');
                next.player=this;
                next.setContent('phaseJieshu');
                return next;
            },
            chooseToUse:function(use){
                var next=game.createEvent('chooseToUse');
                next.player=this;
                if(arguments.length==1&&get.objtype(arguments[0])=='object'){
                    for(var i in use){
                        next[i]=use[i];
                    }
                }
                else{
                    for(var i=0;i<arguments.length;i++){
                        if(typeof arguments[i]=='number'||get.itemtype(arguments[i])=='select'){
                            next.selectTarget=arguments[i];
                        }
                        else if((typeof arguments[i]=='object'&&arguments[i])||typeof arguments[i]=='function'){
                            if(get.itemtype(arguments[i])=='player'||next.filterCard){
                                next.filterTarget=arguments[i];
                            }
                            else next.filterCard=arguments[i];
                        }
                        else if(typeof arguments[i]=='boolean'){
                            next.forced=arguments[i];
                        }
                        else if(typeof arguments[i]=='string'){
                            next.prompt=arguments[i];
                        }
                    }
                }
                if(typeof next.filterCard=='object'){
                    next.filterCard=get.filter(next.filterCard);
                }
                if(typeof next.filterTarget=='object'){
                    next.filterTarget=get.filter(next.filterTarget,2);
                }
                if(next.filterCard==undefined){
                    next.filterCard=lib.filter.filterCard;
                }
                if(next.selectCard==undefined){
                    next.selectCard=[1,1];
                }
                if(next.filterTarget==undefined){
                    next.filterTarget=lib.filter.filterTarget;
                }
                if(next.selectTarget==undefined){
                    next.selectTarget=lib.filter.selectTarget;
                }
                if(next.position==undefined){
                    next.position='hs';
                }
                if(next.ai1==undefined) next.ai1=get.order;
                if(next.ai2==undefined) next.ai2=get.effect_use;
                next.setContent('chooseToUse');
                next._args=Array.from(arguments);
                return next;
            },
            chooseToRespond:function(){
                var next=game.createEvent('chooseToRespond');
                next.player=this;
                var filter;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        next.selectCard=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectCard=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        next.position=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.filterCard) next.ai=arguments[i];
                        else next.filterCard=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]){
                        next.filterCard=get.filter(arguments[i]);
                        filter=arguments[i];
                    }
                    else if(arguments[i]=='nosource'){
                        next.nosource=true;
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                }
                if(next.filterCard==undefined) next.filterCard=lib.filter.all;
                if(next.selectCard==undefined) next.selectCard=[1,1];
                if(next.source==undefined&&!next.nosource) next.source=_status.event.player;
                if(next.ai==undefined) next.ai=get.unuseful2;
                if(next.prompt!=false){
                    if(typeof next.prompt=='string'){
                        //next.dialog=next.prompt;
                    }
                    else{
                        var str='请打出'+get.cnNumber(next.selectCard[0])+'张'
                        if(filter){
                            if(filter.name){
                                str+=get.translation(filter.name);
                            }
                            else{
                                str+='牌';
                            }
                        }
                        else{
                            str+='牌';
                        }
                        if(_status.event.getParent().name=='useCard'){
                            var cardname=_status.event.name;
                            if(lib.card[cardname]&&lib.translate[cardname]){
                                str+='响应'+lib.translate[cardname];
                            }
                        }
                        next.prompt=str;
                    }
                }
                next.position='hs';
                if(next.ai2==undefined) next.ai2=(()=>1);
                next.setContent('chooseToRespond');
                next._args=Array.from(arguments);
                return next;
            },
            chooseToDiscard:function(){
                var next=game.createEvent('chooseToDiscard');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        next.selectCard=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectCard=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='dialog'){
                        next.dialog=arguments[i];
                        next.prompt=false;
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        next.position=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.filterCard) next.ai=arguments[i];
                        else next.filterCard=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]){
                        next.filterCard=get.filter(arguments[i]);
                    }
                    else if(typeof arguments[i]=='string'){
                        get.evtprompt(next,arguments[i]);
                    }
                    if(arguments[i]===null){
                        for(var i=0;i<arguments.length;i++){
                            console.log(arguments[i]);
                        }
                    }
                }
                if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
                if(next.filterCard==undefined) next.filterCard=lib.filter.all;
                if(next.selectCard==undefined) next.selectCard=[1,1];
                if(next.ai==undefined) next.ai=get.unuseful;
                next.autochoose=function(){
                    if(!this.forced) return false;
                    if(typeof this.selectCard=='function') return false;
                    var cards=this.player.getCards(this.position);
                    var num=cards.length;
                    for(var i=0;i<cards.length;i++){
                        if(!lib.filter.cardDiscardable(cards[i],this.player,this)) num--;
                    }
                    return get.select(this.selectCard)[0]>=num;
                }
                next.setContent('chooseToDiscard');
                next._args=Array.from(arguments);
                return next;
            },
            chooseToCompare:function(target,check){
                var next=game.createEvent('chooseToCompare');
                next.player=this;
                if(Array.isArray(target)){
                    next.targets=target;
                    if(check) next.ai=check;
                    else next.ai=function(card){
                        if(typeof card=='string'&&lib.skill[card]){
                            var ais=lib.skill[card].check||function(){return 0};
                            return ais();
                        }
                        var addi=(get.value(card)>=8&&get.type(card)!='equip')?-3:0;
                        if(card.name=='du') addi-=3;
                        var source=_status.event.source;
                        var player=_status.event.player;
                        var event=_status.event.getParent();
                        var getn=function(card){
                            if(player.hasSkill('tianbian')&&get.suit(card)=='heart') return 13*(Boolean(event.small)?-1:1);
                            return get.number(card)*(Boolean(event.small)?-1:1);
                        }
                        if(source&&source!=player){
                            if(get.attitude(player,source)>1){
                                if(Boolean(event.small)) return getn(card)-get.value(card)/2+addi;
                                return -getn(card)-get.value(card)/2+addi;
                            }
                            if(Boolean(event.small)) return -getn(card)-get.value(card)/2+addi;
                            return getn(card)-get.value(card)/2+addi;
                        }
                        else{
                            if(Boolean(event.small)) return -getn(card)-get.value(card)/2+addi;
                            return getn(card)-get.value(card)/2+addi;
                        }
                    }
                    next.setContent('chooseToCompareMultiple');
                }
                else{
                    next.target=target;
                    if(check) next.ai=check;
                    else next.ai=function(card){
                        if(typeof card=='string'&&lib.skill[card]){
                            var ais=lib.skill[card].check||function(){return 0};
                            return ais();
                        }
                        var player=get.owner(card);
                        var getn=function(card){
                            if(player.hasSkill('tianbian')&&get.suit(card)=='heart') return 13;
                            return get.number(card);
                        }
                        var event=_status.event.getParent();
                        var to=(player==event.player?event.target:event.player);
                        var addi=(get.value(card)>=8&&get.type(card)!='equip')?-6:0;
                        if(card.name=='du') addi-=5;
                        if(player==event.player){
                            if(Boolean(event.small)){
                                return -getn(card)-get.value(card)/2+addi;
                            }
                            return getn(card)-get.value(card)/2+addi;
                        }
                        else{
                            if((get.attitude(player,to)<=0)==Boolean(event.small)){
                                return -getn(card)-get.value(card)/2+addi;
                            }
                            return getn(card)-get.value(card)/2+addi;
                        }
                    }
                    next.setContent('chooseToCompare');
                }
                next.forceDie=true;
                next._args=Array.from(arguments);
                return next;
            },
            chooseSkill:function(target){
                var next=game.createEvent('chooseSkill');
                next.player=this;
                next.setContent('chooseSkill');
                next.target=target;
                for(var i=1;i<arguments.length;i++){
                    if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        next.func=arguments[i];
                    }
                }
            },
            discoverCard:function(list){
                var next=game.createEvent('discoverCard');
                next.player=this;
                next.setContent('discoverCard');
                next.list=list||lib.inpile.slice(0);
                next.forced=true;
                for(var i=1;i<arguments.length;i++){
                    if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        switch(arguments[i]){
                            case 'use': next.use=true; break;
                            case 'nogain': next.nogain=true; break;
                            default: next.prompt=arguments[i];
                        }
                    }
                    else if(typeof arguments[i]=='number'){
                        next.num=arguments[i];
                    }
                    else if(typeof arguments[i]==='function'){
                        next.ai=arguments[i];
                    }
                }
                return next;
            },
            chooseCardButton:function(){
                var cards,prompt,forced,select;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards') cards=arguments[i];
                    else if(typeof arguments[i]=='boolean') forced=arguments[i];
                    else if(typeof arguments[i]=='string') prompt=arguments[i];
                    else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
                }
                if(prompt==undefined) prompt='请选择卡牌';
                return this.chooseButton(forced,select,'hidden',[prompt,cards,'hidden']);
            },
            chooseVCardButton:function(){
                var list,prompt,forced,select,notype=false;
                for(var i=0;i<arguments.length;i++){
                    if(Array.isArray(arguments[i])){
                        list=arguments[i];
                    }
                    else if(arguments[i]=='notype'){
                        notype=true;
                    }
                    else if(typeof arguments[i]=='boolean') forced=arguments[i];
                    else if(typeof arguments[i]=='string') prompt=arguments[i];
                    else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
                }
                for(var i=0;i<list.length;i++){
                    list[i]=[notype?'':(get.subtype(list[i],false)||get.type(list[i])),'',list[i]];
                }
                if(prompt==undefined) prompt='请选择卡牌';
                return this.chooseButton(forced,select,'hidden',[prompt,[list,'vcard'],'hidden']);
            },
            chooseButton:function(){
                var next=game.createEvent('chooseButton');
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='dialog'){
                        next.dialog=arguments[i];
                        next.closeDialog=true;
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectButton=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.selectButton=[arguments[i],arguments[i]];
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.ai) next.filterButton=arguments[i];
                        else next.ai=arguments[i];
                    }
                    else if(Array.isArray(arguments[i])){
                        next.createDialog=arguments[i];
                    }
                }
                next.player=this;
                if(typeof next.forced!='boolean') next.forced=false;
                if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
                if(next.filterButton==undefined) next.filterButton=lib.filter.filterButton;
                if(next.selectButton==undefined) next.selectButton=[1,1];
                if(next.ai==undefined) next.ai=function(){return 1};
                next.setContent('chooseButton');
                next._args=Array.from(arguments);
                next.forceDie=true;
                return next;
            },
            chooseButtonOL:function(list,callback,ai){
                var next=game.createEvent('chooseButtonOL');
                next.list=list;
                next.setContent('chooseButtonOL');
                next.ai=ai;
                next.callback=callback;
                next._args=Array.from(arguments);
                return next;
            },
            chooseCardOL:function(){
                var next=game.createEvent('chooseCardOL');
                next._args=[];
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='players'){
                        next.list=arguments[i].slice(0);
                    }
                    else{
                        next._args.push(arguments[i]);
                    }
                }
                next.setContent('chooseCardOL');
                next._args.add('glow_result');
                return next;
            },
            chooseCard:function(choose){
                var next=game.createEvent('chooseCard');
                next.player=this;
                if(arguments.length==1&&get.is.object(choose)){
                    for(var i in choose){
                        next[i]=choose[i];
                    }
                }
                else{
                    for(var i=0;i<arguments.length;i++){
                        if(typeof arguments[i]=='number'){
                            next.selectCard=[arguments[i],arguments[i]];
                        }
                        else if(get.itemtype(arguments[i])=='select'){
                            next.selectCard=arguments[i];
                        }
                        else if(typeof arguments[i]=='boolean'){
                            next.forced=arguments[i];
                        }
                        else if(get.itemtype(arguments[i])=='position'){
                            next.position=arguments[i];
                        }
                        else if(typeof arguments[i]=='function'){
                            if(next.filterCard) next.ai=arguments[i];
                            else next.filterCard=arguments[i];
                        }
                        else if(typeof arguments[i]=='object'&&arguments[i]){
                            next.filterCard=get.filter(arguments[i]);
                        }
                        else if(arguments[i]=='glow_result'){
                            next.glow_result=true;
                        }
                        else if(typeof arguments[i]=='string'){
                            get.evtprompt(next,arguments[i]);
                        }
                    }
                }
                if(next.filterCard==undefined) next.filterCard=lib.filter.all;
                if(next.selectCard==undefined) next.selectCard=[1,1];
                if(next.ai==undefined) next.ai=get.unuseful3;
                next.setContent('chooseCard');
                next._args=Array.from(arguments);
                return next;
            },
            chooseUseTarget:function(){
                var next=game.createEvent('chooseUseTarget');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='players'){
                        next.targets=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        next.targets=[arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectTarget=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.selectTarget=[arguments[i],arguments[i]];
                    }
                    else if(get.is.object(arguments[i])&&arguments[i].name){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        if(arguments[i]=='nopopup'){
                            next.nopopup=true;
                        }
                        else if(arguments[i]=='noanimate'){
                            next.animate=false;
                        }
                        else if(arguments[i]=='nothrow'){
                            next.throw=false;
                        }
                        else if(arguments[i]=='nodistance'){
                            next.nodistance=true;
                        }
                        else if(arguments[i]=='noTargetDelay'){
                            next.noTargetDelay=true;
                        }
                        else if(arguments[i]=='nodelayx'){
                            next.nodelayx=true;
                        }
                        else if(lib.card[arguments[i]]&&!next.card){
                            next.card={name:arguments[i],isCard:true};
                        }
                        else get.evtprompt(next,arguments[i]);
                    }
                    else if(arguments[i]===true){
                        next.forced=true;
                    }
                    else if(arguments[i]===false){
                        next.addCount=false;
                    }
                }
                if(!next.targets) next.targets=game.players.slice(0);
                if(next.cards==undefined){
                    if(get.itemtype(next.card)=='card'){
                        next.cards=[next.card];
                    }
                    else next.cards=[];
                }
                else if(next.card==undefined){
                    if(next.cards){
                        next.card=next.cards[0];
                    }
                }
                next.setContent('chooseUseTarget');
                next._args=Array.from(arguments);
                return next;
                // Fully Online-Ready! Enjoy It!
            },
            chooseTarget:function(){
                var next=game.createEvent('chooseTarget');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        next.selectTarget=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectTarget=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='dialog'){
                        next.dialog=arguments[i];
                        next.prompt=false;
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.filterTarget) next.ai=arguments[i];
                        else next.filterTarget=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        get.evtprompt(next,arguments[i]);
                    }
                }
                if(next.filterTarget==undefined) next.filterTarget=lib.filter.all;
                if(next.selectTarget==undefined) next.selectTarget=[1,1];
                if(next.ai==undefined) next.ai=get.attitude2;
                next.setContent('chooseTarget');
                next._args=Array.from(arguments);
                next.forceDie=true;
                return next;
            },
            chooseCardTarget:function(choose){
                var next=game.createEvent('chooseCardTarget');
                next.player=this;
                if(arguments.length==1){
                    for(var i in choose){
                        next[i]=choose[i];
                    }
                }
                if(typeof next.filterCard=='object'){
                    next.filterCard=get.filter(next.filterCard);
                }
                if(typeof next.filterTarget=='object'){
                    next.filterTarget=get.filter(next.filterTarget,2);
                }
                if(next.filterCard==undefined||next.filterCard===true){
                    next.filterCard=lib.filter.all;
                }
                if(next.selectCard==undefined){
                    next.selectCard=1;
                }
                if(next.filterTarget==undefined||next.filterTarget===true){
                    next.filterTarget=lib.filter.all;
                }
                if(next.selectTarget==undefined){
                    next.selectTarget=1;
                }
                if(next.ai1==undefined) next.ai1=get.unuseful2;
                if(next.ai2==undefined) next.ai2=get.attitude2;
                next.setContent('chooseCardTarget');
                next._args=Array.from(arguments);
                return next;
            },
            chooseControlList:function(){
                var list=[];
                var prompt=null;
                var forced='cancel2';
                var func=null;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='string'){
                        if(!prompt){
                            prompt=arguments[i];
                        }
                        else{
                            list.push(arguments[i]);
                        }
                    }
                    else if(Array.isArray(arguments[i])){
                        list=arguments[i];
                    }
                    else if(arguments[i]===true){
                        forced=null;
                    }
                    else if(typeof arguments[i]=='function'){
                        func=arguments[i];
                    }
                }
                return this.chooseControl(forced,func).set('choiceList',list).set('prompt',prompt);
            },
            chooseControl:function(){
                var next=game.createEvent('chooseControl');
                next.controls=[];
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='string'){
                        if(arguments[i]=='dialogcontrol'){
                            next.dialogcontrol=true;
                        }
                        else if(arguments[i]=='seperate'){
                            next.seperate=true;
                        }
                        else{
                            next.controls.push(arguments[i]);
                        }
                    }
                    else if(Array.isArray(arguments[i])){
                        next.controls=next.controls.concat(arguments[i]);
                    }
                    else if(typeof arguments[i]=='function'){
                        next.ai=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.choice=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='dialog'){
                        next.dialog=arguments[i];
                    }
                }
                next.player=this;
                if(next.choice==undefined) next.choice=0;
                next.setContent('chooseControl');
                next._args=Array.from(arguments);
                next.forceDie=true;
                return next;
            },
            chooseBool:function(){
                var next=game.createEvent('chooseBool');
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='boolean'){
                        next.choice=arguments[i];
                    }
                    else  if(typeof arguments[i]=='function'){
                        next.ai=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        get.evtprompt(next,arguments[i]);
                    }
                    else if(get.itemtype(arguments[i])=='dialog'){
                        next.dialog=arguments[i];
                    }
                    if(next.choice==undefined) next.choice=true;
                }
                next.player=this;
                next.setContent('chooseBool');
                next._args=Array.from(arguments);
                next.forceDie=true;
                return next;
            },
            chooseDrawRecover:function(){
                var next=game.createEvent('chooseDrawRecover',false);
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        if(typeof next.num1=='number'){
                            next.num2=arguments[i];
                        }
                        else{
                            next.num1=arguments[i];
                        }
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        next.ai=arguments[i];
                    }
                }
                if(typeof next.num1!='number'){
                    next.num1=1;
                }
                if(typeof next.num2!='number'){
                    next.num2=1;
                }
                next.setContent('chooseDrawRecover');
                return next;
            },
            choosePlayerCard:function(){
                var next=game.createEvent('choosePlayerCard');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.target=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.selectButton=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectButton=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='visible'){
                        next.visible=true;
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.ai) next.filterButton=arguments[i];
                        else next.ai=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]){
                        next.filterButton=get.filter(arguments[i]);
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                }
                if(next.filterButton==undefined) next.filterButton=lib.filter.all;
                if(next.position==undefined) next.position='he';
                if(next.selectButton==undefined) next.selectButton=[1,1];
                if(next.ai==undefined) next.ai=function(button){
                    var val=get.buttonValue(button);
                    if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
                    return val;
                };
                next.setContent('choosePlayerCard');
                next._args=Array.from(arguments);
                return next;
            },
            discardPlayerCard:function(){
                var next=game.createEvent('discardPlayerCard');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.target=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.selectButton=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectButton=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='visible'){
                        next.visible=true;
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.ai) next.filterButton=arguments[i];
                        else next.ai=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]){
                        next.filterButton=get.filter(arguments[i]);
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                }
                if(next.filterButton==undefined) next.filterButton=lib.filter.all;
                if(next.position==undefined) next.position='he';
                if(next.selectButton==undefined) next.selectButton=[1,1];
                if(next.ai==undefined) next.ai=function(button){
                    var val=get.buttonValue(button);
                    if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
                    return val;
                };
                next.setContent('discardPlayerCard');
                next._args=Array.from(arguments);
                return next;
            },
            gainPlayerCard:function(){
                var next=game.createEvent('gainPlayerCard');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.target=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.selectButton=[arguments[i],arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='select'){
                        next.selectButton=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='visible'){
                        next.visible=true;
                    }
                    else if(arguments[i]=='visibleMove'){
                        next.visibleMove=true;
                    }
                    else if(typeof arguments[i]=='function'){
                        if(next.ai) next.filterButton=arguments[i];
                        else next.ai=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]){
                        next.filterButton=get.filter(arguments[i]);
                    }
                    else if(typeof arguments[i]=='string'){
                        next.prompt=arguments[i];
                    }
                }
                if(next.filterButton==undefined) next.filterButton=lib.filter.all;
                if(next.position==undefined) next.position='he';
                if(next.selectButton==undefined) next.selectButton=[1,1];
                if(next.ai==undefined) next.ai=function(button){
                    var val=get.buttonValue(button);
                    if(get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
                    return val;
                };
                next.setContent('gainPlayerCard');
                next._args=Array.from(arguments);
                return next;
            },
            showHandcards:function(str){
                var next=game.createEvent('showHandcards');
                next.player=this;
                if(typeof str=='string'){
                    next.prompt=str;
                }
                next.setContent('showHandcards');
                next._args=Array.from(arguments);
                return next;
            },
            showCards:function(cards,str){
                var next=game.createEvent('showCards');
                next.player=this;
                next.str=str;
                if(typeof cards=='string'){
                    str=cards;
                    cards=next.str;
                    next.str=str;
                }
                if(get.itemtype(cards)=='card') next.cards=[cards];
                else if(get.itemtype(cards)=='cards') next.cards=cards.slice(0);
                else _status.event.next.remove(next);
                next.setContent('showCards');
                next._args=Array.from(arguments);
                return next;
            },
            viewCards:function(str,cards){
                var next=game.createEvent('viewCards');
                next.player=this;
                next.str=str;
                next.cards=cards.slice(0);
                next.setContent('viewCards');
                next._args=Array.from(arguments);
                return next;
            },
            viewHandcards:function(target){
                var cards=target.getCards('h');
                if(cards.length){
                    return this.viewCards(get.translation(target)+'的手牌',cards);
                }
                else{
                    return false;
                }
            },
            canMoveCard:function(withatt,nojudge){
                var player=this;
                return game.hasPlayer(function(current){
                    var att=get.sgn(get.attitude(player,current));
                    if(!withatt||att!=0){
                        var es=current.getCards('e');
                        for(var i=0;i<es.length;i++){
                            if(game.hasPlayer(function(current2){
                                if(withatt){
                                    if(get.sgn(get.value(es[i],current))!=-att) return false;
                                    var att2=get.sgn(get.attitude(player,current2));
                                    if(att==att2||att2!=get.sgn(get.effect(current2,es[i],player,current2))) return false;
                                }
                                return current!=current2&&!current2.isMin()&&current2.canEquip(es[i]);
                            })){
                                return true;
                            }
                        }
                    }
                    if(!nojudge&&(!withatt||att>0)){
                        var js=current.getCards('j');
                        for(var i=0;i<js.length;i++){
                            if(game.hasPlayer(function(current2){
                                if(withatt){
                                    var att2=get.attitude(player,current2);
                                    if(att2>=0) return false;
                                }
                                return current!=current2&&current2.canAddJudge(js[i]);
                            })){
                                return true;
                            }
                        }
                    }
                });
            },
            moveCard:function(){
                var next=game.createEvent('moveCard');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='boolean'){
                        next.forced=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        get.evtprompt(next,arguments[i]);
                    }
                    else if(Array.isArray(arguments[i])){
                        for(var j=0;j<arguments[i].length;j++){
                            if(typeof arguments[i][j]!='string') break;
                        }
                        if(j==arguments[i].length){
                            next.targetprompt=arguments[i];
                        }
                    }
                }
                next.setContent('moveCard');
                next._args=Array.from(arguments);
                return next;
            },
            useResult:function(result,event){
                event=event||_status.event;
                if(result._sendskill){
                    lib.skill[result._sendskill[0]]=result._sendskill[1];
                }
                if(event.onresult){
                    event.onresult(result);
                }
                if(result.skill){
                    var info=get.info(result.skill);
                    if(info.onuse){
                        info.onuse(result,this);
                    }
                    if(info.direct&&!info.clearTime){
                        _status.noclearcountdown=true;
                    }
                }
                if(event.logSkill){
                    if(typeof event.logSkill=='string'){
                        this.logSkill(event.logSkill);
                    }
                    else if(Array.isArray(event.logSkill)){
                        this.logSkill.apply(this,event.logSkill);
                    }
                }
                if(result.card||!result.skill){
                    result.used=result.card||result.cards[0];
                    var next=this.useCard(result.used,result.cards,result.targets,result.skill);
                    next.oncard=event.oncard;
                    next.respondTo=event.respondTo;
                    if(event.addCount===false){
                        next.addCount=false;
                    }
                    if(result._apply_args){
                        for(var i in result._apply_args){
                            next[i]=result._apply_args[i];
                        }
                    }
                    return next;
                }
                else if(result.skill){
                    result.used=result.skill;
                    return this.useSkill(result.skill,result.cards,result.targets);
                }
            },
            useCard:function(){
                var next=game.createEvent('useCard');
                next.player=this;
                next.num=0;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='players'){
                        next.targets=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        next.targets=[arguments[i]];
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        if(arguments[i]=='noai'){
                            next.noai=true;
                        }
                        else if(arguments[i]=='nowuxie'){
                            next.nowuxie=true;
                        }
                        else{
                            next.skill=arguments[i];
                        }
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.addCount=arguments[i];
                    }
                }
                if(next.cards==undefined){
                    if(get.itemtype(next.card)=='card'){
                        next.cards=[next.card];
                    }
                    else next.cards=[];
                }
                else if(next.card==undefined){
                    if(next.cards){
                        next.card=next.cards[0];
                    }
                }
                if(!next.targets){
                    next.targets=[];
                }
                if(next.card){
                    next.card=get.autoViewAs(next.card,next.cards);
                    var info=get.info(next.card);
                    if(info.changeTarget){
                        info.changeTarget(next.player,next.targets);
                    }
                    if(info.singleCard){
                        next._targets=next.targets.slice(0);
                        next.target=next.targets[0];
                        next.addedTargets=next.targets.splice(1);
                        if(next.addedTargets.length){
                            next.addedTarget=next.addedTargets[0];
                        }
                    }
                }
                for(var i=0;i<next.targets.length;i++){
                    if(get.attitude(this,next.targets[i])>=-1&&get.attitude(this,next.targets[i])<0){
                        if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
                        this.ai.tempIgnore.add(next.targets[i]);
                    }
                }
                if(typeof this.logAi=='function'&&!next.noai&&!get.info(next.card).noai){
                    var postAi=get.info(next.card).postAi;
                    if(postAi&&postAi(next.targets)){
                        next.postAi=true;
                    }
                    else{
                        this.logAi(next.targets,next.card);
                    }
                }
                next.stocktargets=next.targets.slice(0);
                next.setContent('useCard');
                return next;
            },
            useSkill:function(){
                var next=game.createEvent('useSkill');
                next.player=this;
                next.num=0;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='players'){
                        next.targets=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        next.skill=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.addCount=arguments[i];
                    }
                }
                if(next.cards==undefined){
                    next.cards=[];
                }
                if(next.skill&&get.info(next.skill)&&get.info(next.skill).changeTarget){
                    get.info(next.skill).changeTarget(next.player,next.targets);
                }
                if(next.targets){
                    for(var i=0;i<next.targets.length;i++){
                        if(get.attitude(this,next.targets[i])>=-1&&get.attitude(this,next.targets[i])<0){
                            if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
                            this.ai.tempIgnore.add(next.targets[i]);
                        }
                    }
                    if(typeof this.logAi=='function'){
                        this.logAi(next.targets,next.skill);
                    }
                }
                else{
                    next.targets=[];
                }
                next.setContent('useSkill');
                return next;
            },
            drawTo:function(num,args){
                var num2=num-this.countCards('h');
                if(!num2) return;
                var next=this.draw(num2);
                if(Array.isArray(args)){
                    for(var i=0;i<args.length;i++){
                        if(get.itemtype(args[i])=='player'){
                            next.source=args[i];
                        }
                        else if(typeof args[i]=='boolean'){
                            next.animate=args[i];
                        }
                        else if(args[i]=='nodelay'){
                            next.animate=false;
                            next.$draw=true;
                        }
                        else if(args[i]=='visible'){
                            next.visible=true;
                        }
                        else if(args[i]=='bottom'){
                            next.bottom=true;
                        }
                        else if(typeof args[i]=='object'&&args[i]&&args[i].drawDeck!=undefined){
                            next.drawDeck=args[i].drawDeck;
                        }
                    }
                }
                return next;
            },
            draw:function(){
                var next=game.createEvent('draw');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.num=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.animate=arguments[i];
                    }
                    else if(arguments[i]=='nodelay'){
                        next.animate=false;
                        next.$draw=true;
                    }
                    else if(arguments[i]=='visible'){
                        next.visible=true;
                    }
                    else if(arguments[i]=='bottom'){
                        next.bottom=true;
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].drawDeck!=undefined){
                        next.drawDeck=arguments[i].drawDeck;
                    }
                }
                if(next.num==undefined) next.num=1;
                if(next.num<=0) _status.event.next.remove(next);
                next.setContent('draw');
                if(lib.config.mode=='stone'&&_status.mode=='deck'&&
                next.drawDeck==undefined&&!next.player.isMin()&&next.num>1){
                    next.drawDeck=1;
                }
                next.result=[];
                return next;
            },
            randomDiscard:function(){
                var position='he',num=1,delay=null;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        num=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        position=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        delay=arguments[i];
                    }
                }
                var cards=this.getCards(position).randomGets(num);
                if(cards.length){
                    var next=this.discard(cards,'notBySelf');
                    if(typeof delay=='boolean'){
                        next.delay=delay;
                    }
                }
                return cards;
            },
            randomGain:function(){
                var position='he',num=1,target=null,line=false;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        num=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='position'){
                        position=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        target=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        line=arguments[i];
                    }
                }
                if(target){
                    var cards=target.getCards(position).randomGets(num);
                    if(cards.length){
                        if(line){
                            this.line(target,'green');
                        }
                        this.gain(cards,target,'log','bySelf');
                        target.$giveAuto(cards,this);
                    }
                    return cards;
                }
                return [];
            },
            discard:function(){
                var next=game.createEvent('discard');
                next.player=this;
                next.num=0;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.cards=[arguments[i]];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.animate=arguments[i];
                    }
                    else if(get.objtype(arguments[i])=='div'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='notBySelf'){
                        next.notBySelf=true;
                    }
                }
                if(next.cards==undefined) _status.event.next.remove(next);
                next.setContent('discard');
                return next;
            },
            loseToDiscardpile:function(){
                var next=game.createEvent('loseToDiscardpile');
                next.player=this;
                next.num=0;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.cards=[arguments[i]];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.animate=arguments[i];
                    }
                    else if(get.objtype(arguments[i])=='div'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='notBySelf'){
                        next.notBySelf=true;
                    }
                    else if(arguments[i]=='insert'){
                        next.insert_card=true;
                    }
                    else if(arguments[i]=='blank'){
                        next.blank=true;
                    }
                }
                if(next.cards==undefined) _status.event.next.remove(next);
                next.setContent('loseToDiscardpile');
                return next;
            },
            respond:function(){
                var next=game.createEvent('respond');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean') next.animate=arguments[i];
                    else if(arguments[i]=='highlight') next.highlight=true;
                    else if(arguments[i]=='noOrdering') next.noOrdering=true;
                    else if(typeof arguments[i]=='string') next.skill=arguments[i];
                }
                if(next.cards==undefined){
                    if(get.itemtype(next.card)=='card'){
                        next.cards=[next.card];
                    }
                    else{
                        next.cards=[];
                    }
                }
                else if(next.card==undefined){
                    if(next.cards){
                        next.card=next.cards[0];
                        if(!next.skill){
                            next.card=get.autoViewAs(next.card,next.cards);
                        }
                    }
                }
                next.setContent('respond');
                return next;
            },
            swapHandcards:function(target,cards1,cards2){
                var next=game.createEvent('swapHandcards',false);
                next.player=this;
                next.target=target;
                if(cards1) next.cards1=cards1;
                if(cards2) next.cards2=cards2;
                next.setContent('swapHandcards');
                return next;
            },
            directequip:function(cards){
                for(var i=0;i<cards.length;i++){
                    this.$equip(cards[i]);
                }
                if(!_status.video){
                    game.addVideo('directequip',this,get.cardsInfo(cards));
                }
            },
            $addToExpansion:function(cards,broadcast,gaintag){
                var hs=this.getCards('x');
                for(var i=0;i<cards.length;i++){
                    if(hs.contains(cards[i])){
                        cards.splice(i--,1);
                    }
                }
                for(var i=0;i<cards.length;i++){
                    cards[i].fix();
                    if(gaintag) cards[i].addGaintag(gaintag);
                    var sort=lib.config.sort_card(cards[i]);
                    this.node.expansions.insertBefore(cards[i],this.node.expansions.firstChild);
                }
                if(broadcast!==false) game.broadcast(function(player,cards,gaintag){
                    player.$addToExpansion(cards,null,gaintag);
                },this,cards,gaintag);
                return this;
            },
            directgain:function(cards,broadcast,gaintag){
                var hs=this.getCards('hs');
                for(var i=0;i<cards.length;i++){
                    if(hs.contains(cards[i])){
                        cards.splice(i--,1);
                    }
                }
                for(var i=0;i<cards.length;i++){
                    cards[i].fix();
                    if(gaintag) cards[i].addGaintag(gaintag);
                    var sort=lib.config.sort_card(cards[i]);
                    if(this==game.me){
                        cards[i].classList.add('drawinghidden');
                    }
                    if(get.is.singleHandcard()||sort>0){
                        this.node.handcards1.insertBefore(cards[i],this.node.handcards1.firstChild);
                    }
                    else{
                        this.node.handcards2.insertBefore(cards[i],this.node.handcards2.firstChild);
                    }
                }
                if(this==game.me||_status.video) ui.updatehl();
                if(!_status.video){
                    game.addVideo('directgain',this,get.cardsInfo(cards));
                    this.update();
                }
                if(broadcast!==false) game.broadcast(function(player,cards){
                    player.directgain(cards);
                },this,cards);
                return this;
            },
            directgains:function(cards,broadcast,gaintag){
                var hs=this.getCards('hs');
                for(var i=0;i<cards.length;i++){
                    if(hs.contains(cards[i])){
                        cards.splice(i--,1);
                    }
                }
                var addLast=function(card,node){
                    if(gaintag){
                        for(var i=0;i<node.childNodes.length;i++){
                            var add=node.childNodes[node.childNodes.length-i-1];
                            if(!add.classList.contains('glows')) break;
                            if(add.hasGaintag(gaintag)){
                                node.insertBefore(card,add.nextSibling);
                                return;
                            }
                        }
                    }
                    node.appendChild(card);
                }
                for(var i=0;i<cards.length;i++){
                    cards[i].fix();
                    cards[i].remove();
                    if(gaintag) cards[i].addGaintag(gaintag);
                    cards[i].classList.add('glows');
                    if(this==game.me){
                        cards[i].classList.add('drawinghidden');
                    }
                    if(get.is.singleHandcard()){
                        addLast(cards[i],this.node.handcards1);
                    }
                    else{
                        addLast(cards[i],this.node.handcards2);
                    }
                }
                if(this==game.me||_status.video) ui.updatehl();
                if(!_status.video){
                    game.addVideo('directgains',this,get.cardsInfo(cards));
                    this.update();
                }
                if(broadcast!==false) game.broadcast(function(player,cards,gaintag){
                    player.directgains(cards,null,gaintag);
                },this,cards,gaintag);
                return this;
            },
            gainMultiple:function(targets,position){
                var next=game.createEvent('gainMultiple',false);
                next.setContent('gainMultiple');
                next.player=this;
                next.targets=targets;
                next.position=position||'h';
                return next;
            },
            gain:function(){
                var next=game.createEvent('gain');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.cards=[arguments[i]];
                    }
                    else if(arguments[i]==='log'){
                        next.log=true;
                    }
                    else if(arguments[i]=='fromStorage'){
                        next.fromStorage=true;
                    }
                    else if(arguments[i]=='fromRenku'){
                        next.fromStorage=true;
                        next.fromRenku=true;
                    }
                    else if(arguments[i]=='bySelf'){
                        next.bySelf=true;
                    }
                    else if(typeof arguments[i]=='string'){
                        next.animate=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.delay=arguments[i];
                    }
                }
                if(next.animate=='gain2'||next.animate=='draw2'){
                    if(!next.hasOwnProperty('log')){
                        next.log=true;
                    }
                }
                next.setContent('gain');
                next.getd=function(player,key,position){
                    if(!position) position=ui.discardPile;
                    if(!key) key='cards';
                    var cards=[],event=this;
                    game.checkGlobalHistory('cardMove',function(evt){
                        if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
                        if(player&&player!=evt.player) return;
                        cards.addArray(evt[key]);
                    });
                    return cards;
                };
                next.getl=function(player){
                    const that=this;
                    const map={
                        player:player,
                        hs:[],
                        es:[],
                        js:[],
                        ss:[],
                        xs:[],
                        cards:[],
                        cards2:[],
                        gaintag_map:{},
                    };
                    player.checkHistory('lose',function(evt){
                        if(evt.parent==that){
                            map.hs.addArray(evt.hs);
                            map.es.addArray(evt.es);
                            map.js.addArray(evt.js);
                            map.ss.addArray(evt.ss);
                            map.xs.addArray(evt.xs);
                            map.cards.addArray(evt.cards);
                            map.cards2.addArray(evt.cards2);
                            for(let key in evt.gaintag_map){
                                if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
                                map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                            }
                        }
                    });
                    return map;
                };
                next.getg=function(player){
                    if(this.getlx===false||player!=this.player||!this.cards) return [];
                    return this.cards.slice(0);
                }
                next.gaintag=[];
                return next;
            },
            addToExpansion:function(){
                var next=game.createEvent('addToExpansion');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.cards=[arguments[i]];
                    }
                    else if(arguments[i]==='log'){
                        next.log=true;
                    }
                    else if(arguments[i]=='fromStorage'){
                        next.fromStorage=true;
                    }
                    else if(arguments[i]=='fromRenku'){
                        next.fromStorage=true;
                        next.fromRenku=true;
                    }
                    else if(arguments[i]=='bySelf'){
                        next.bySelf=true;
                    }
                    else if(typeof arguments[i]=='string'){
                        next.animate=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.delay=arguments[i];
                    }
                }
                if(next.animate=='gain2'||next.animate=='draw2'||next.animate=='give'){
                    if(!next.hasOwnProperty('log')){
                        next.log=true;
                    }
                }
                next.setContent('addToExpansion');
                next.getd=function(player,key,position){
                    if(!position) position=ui.discardPile;
                    if(!key) key='cards';
                    var cards=[],event=this;
                    game.checkGlobalHistory('cardMove',function(evt){
                        if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
                        if(player&&player!=evt.player) return;
                        cards.addArray(evt[key]);
                    });
                    return cards;
                };
                next.getl=function(player){
                    const that=this;
                    const map={
                        player:player,
                        hs:[],
                        es:[],
                        js:[],
                        ss:[],
                        xs:[],
                        cards:[],
                        cards2:[],
                        gaintag_map:{},
                    };
                    player.checkHistory('lose',function(evt){
                        if(evt.parent==that){
                            map.hs.addArray(evt.hs);
                            map.es.addArray(evt.es);
                            map.js.addArray(evt.js);
                            map.ss.addArray(evt.ss);
                            map.xs.addArray(evt.xs);
                            map.cards.addArray(evt.cards);
                            map.cards2.addArray(evt.cards2);
                            for(let key in evt.gaintag_map){
                                if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
                                map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                            }
                        }
                    });
                    return map;
                };
                next.gaintag=[];
                return next;
            },
            give:function(cards,target,visible){
                var next=target.gain(cards,this);
                next.animate=visible?'give':'giveAuto';
                next.giver=this;
                return next;
            },
            lose:function(){
                var next=game.createEvent('lose');
                next.player=this;
                next.forceDie=true;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.cards=[arguments[i]];
                    }
                    else if(get.objtype(arguments[i])=='div'){
                        next.position=arguments[i];
                    }
                    else if(arguments[i]=='toStorage'){
                        next.toStorage=true;
                    }
                    else if(arguments[i]=='toRenku'){
                        next.toStorage=true;
                        next.toRenku=true;
                    }
                    else if(arguments[i]=='visible'){
                        next.visible=true;
                    }
                    else if(arguments[i]=='insert'){
                        next.insert_card=true;
                    }
                }
                if(next.cards){
                    var hej=this.getCards('hejsx');
                    for(var i=0;i<next.cards.length;i++){
                        if(!hej.contains(next.cards[i])){
                            next.cards.splice(i--,1);
                        }
                    }
                }
                if(!next.cards||!next.cards.length){
                    _status.event.next.remove(next);
                }
                else{
                    if(next.position==undefined) next.position=ui.discardPile;
                    next.cards=next.cards.slice(0);
                }
                next.setContent('lose');
                next.getd=function(player,key,position){
                    if(!position) position=ui.discardPile;
                    if(!key) key='cards';
                    if(this.getlx===false||this.position!=position||(player&&this.player!=player)||!Array.isArray(this[key])) return [];
                    return this[key].slice(0);
                };
                next.getl=function(player){
                    if(this.getlx!==false&&this.player==player) return this;
                    return {
                        player:player,
                        hs:[],
                        es:[],
                        js:[],
                        ss:[],
                        xs:[],
                        cards:[],
                        cards2:[],
                        gaintag_map:{},
                    };
                };
                return next;
            },
            damage:function(){
                var next=game.createEvent('damage');
                //next.forceDie=true;
                next.player=this;
                var nocard,nosource;
                var event=_status.event;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.num=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
                        next.card=arguments[i];
                    }
                    else if(arguments[i]=='nocard'){
                        nocard=true;
                    }
                    else if(arguments[i]=='nosource'){
                        nosource=true;
                    }
                    else if(arguments[i]=='notrigger'){
                        next._triggered=null;
                        next.notrigger=true;
                    }
                    else if(arguments[i]=='unreal'){
                        next.unreal=true
                    }
                    else if(get.itemtype(arguments[i])=='nature'&&arguments[i]!='stab'){
                        next.nature=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='natures'){
                        var natures=arguments[i].split(lib.natureSeparator);
                        natures.remove('stab');
                        if(natures.length) next.nature=natures.join(lib.natureSeparator);
                    }
                }
                if(next.card==undefined&&!nocard) next.card=event.card;
                if(next.cards==undefined&&!nocard) next.cards=event.cards;
                if(next.source==undefined&&!nosource) next.source=event.customSource||event.player;
                if(next.source&&next.source.isDead()) delete next.source;
                if(next.unreal==undefined) next.unreal=false;
                if(next.num==undefined) next.num=(event.baseDamage||1)+(event.extraDamage||0);
                next.original_num=next.num;
                next.change_history=[];
                next.hasNature=function(nature){
                    if(!nature) return Boolean(this.nature&&this.nature.length>0);
                    let natures=get.natureList(nature),naturesx=get.natureList(this.nature);
                    if(nature=='linked') return naturesx.some(n=>lib.linked.includes(n));
                    return get.is.sameNature(natures,naturesx);
                };
                if(next.hasNature('poison')) delete next._triggered;
                next.setContent('damage');
                next.filterStop=function(){
                    if(this.source&&this.source.isDead()) delete this.source;
                    var num=this.original_num;
                    for(var i of this.change_history) num+=i;
                    if(num!=this.num) this.change_history.push(this.num-num);
                    if(this.num<=0){
                        delete this.filterStop;
                        this.trigger('damageZero');
                        this.finish();
                        this._triggered=null;
                        return true;
                    }
                };
                return next;
            },
            recover:function(){
                var next=game.createEvent('recover');
                next.player=this;
                var nocard,nosource;
                var event=_status.event;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='cards'){
                        next.cards=arguments[i].slice(0);
                    }
                    else if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(get.itemtype(arguments[i])=='player'){
                        next.source=arguments[i];
                    }
                    else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='number'){
                        next.num=arguments[i];
                    }
                    else if(arguments[i]=='nocard'){
                        nocard=true;
                    }
                    else if(arguments[i]=='nosource'){
                        nosource=true;
                    }
                }
                if(next.card==undefined&&!nocard) next.card=event.card;
                if(next.cards==undefined&&!nocard) next.cards=event.cards;
                if(next.source==undefined&&!nosource) next.source=event.customSource||event.player;
                if(next.num==undefined) next.num=(event.baseDamage||1)+(event.extraDamage||0);
                if(next.num<=0) _status.event.next.remove(next);
                next.setContent('recover');
                return next;
            },
            doubleDraw:function(){
                if(get.is.changban()) return;
                var next=game.createEvent('doubleDraw');
                next.player=this;
                next.setContent('doubleDraw');
                return next;
            },
            loseHp:function(num){
                var next=game.createEvent('loseHp');
                next.num=num;
                next.player=this;
                if(next.num==undefined) next.num=1;
                next.setContent('loseHp');
                return next;
            },
            loseMaxHp:function(){
                var next=game.createEvent('loseMaxHp');
                next.player=this;
                next.num=1;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]==='number'){
                        next.num=arguments[i];
                    }
                    else if(typeof arguments[i]==='boolean'){
                        next.forced=arguments[i];
                    }
                }
                next.setContent('loseMaxHp');
                return next;
            },
            gainMaxHp:function(){
                var next=game.createEvent('gainMaxHp');
                next.player=this;
                next.num=1;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]==='number'){
                        next.num=arguments[i];
                    }
                    else if(typeof arguments[i]==='boolean'){
                        next.forced=arguments[i];
                    }
                }
                next.setContent('gainMaxHp');
                return next;
            },
            changeHp:function(num,popup){
                var next=game.createEvent('changeHp');
                next.num=num;
                if(popup!=undefined) next.popup=popup;
                next.player=this;
                next.setContent('changeHp');
                return next;
            },

            changeHujia:function(num,type,limit){
                var next=game.createEvent('changeHujia');
                if(typeof num!='number'){
                    num=1;
                }
                next.num=num;
                next.player=this;
                if(type) next.type=type;
                next.setContent('changeHujia');
                if(limit===true) limit=5;
                if(typeof limit=='number'&&this.hujia+num>parseInt(limit)){
                    var numx=parseInt(limit)-this.hujia;
                    if(numx>0) next.num=numx;
                    else _status.event.next.remove(next);
                }
                return next;
            },
            getBuff:function(){
                var list=[1,2,3,4,5,6];
                var nodelay=false;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        list.remove(arguments[i]);
                    }
                    else if(arguments[i]===false){
                        nodelay=true;
                    }
                }
                if(this.isHealthy()){
                    list.remove(2);
                }
                if(!this.countCards('j')){
                    list.remove(5);
                }
                if(!this.isLinked()&&!this.isTurnedOver()){
                    list.remove(6);
                }
                if(this.hasSkill('qianxing')){
                    list.remove(4);
                }
                switch(list.randomGet()){
                    case 1:this.draw(nodelay?'nodelay':1);break;
                    case 2:this.recover();break;
                    case 3:this.changeHujia();break;
                    case 4:this.tempHide();
                    case 5:this.discard(this.getCards('j')).delay=(!nodelay);break;
                    case 6:{
                        if(this.isLinked()) this.link();
                        if(this.isTurnedOver()) this.turnOver();
                        break;
                    }
                }
                return this;
            },
            getDebuff:function(){
                var list=[1,2,3,4,5,6];
                var nodelay=false;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='number'){
                        list.remove(arguments[i]);
                    }
                    else if(arguments[i]===false){
                        nodelay=true;
                    }
                }
                if(this.countCards('he')==0){
                    list.remove(1);
                }
                if(this.isLinked()){
                    list.remove(4);
                }
                if(this.hasSkill('fengyin')){
                    list.remove(5);
                }
                if(this.hp==1){
                    list.remove(3);
                    if(list.length>1) list.remove(2);
                }
                if(!list.length) return this;
                var num=list.randomGet();
                switch(list.randomGet()){
                    case 1:this.randomDiscard(nodelay?false:'he');break;
                    case 2:this.loseHp();break;
                    case 3:this.damage();break;
                    case 4:if(!this.isLinked()) this.link();break;
                    case 5:this.addTempSkill('fengyin',{player:'phaseAfter'});break;
                    case 6:{
                        var list=[];
                        for(var i=0;i<lib.inpile.length;i++){
                            var info=lib.card[lib.inpile[i]];
                            if(info.type=='delay'&&!info.cancel&&!this.hasJudge(lib.inpile[i])){
                                list.push(lib.inpile[i]);
                            }
                        }
                        if(list.length){
                            var card=game.createCard(list.randomGet());
                            this.addJudge(card);
                            this.$draw(card);
                            if(!nodelay) game.delay();
                        }
                        else{
                            this.getDebuff(6);
                        }
                        break;
                    }
                }
                return this;
            },
            dying:function(reason){
                if(this.nodying||this.hp>0||this.isDying()) return;
                var next=game.createEvent('dying');
                next.player=this;
                next.reason=reason;
                if(reason&&reason.source) next.source=reason.source;
                next.setContent('dying');
                next.filterStop=function(){
                    if(this.player.hp>0||this.nodying){
                        delete this.filterStop;
                        return true;
                    }
                };
                return next;
            },
            die:function(reason){
                var next=game.createEvent('die');
                next.player=this;
                next.reason=reason;
                if(reason) next.source=reason.source;
                next.setContent('die');
                return next;
            },
            revive:function(hp,log){
                if(log!==false) game.log(this,'复活');
                if(this.maxHp<1) this.maxHp=1;
                if(hp) this.hp=hp;
                else{
                    this.hp=1;
                }
                game.addVideo('revive',this);
                this.classList.remove('dead');
                this.removeAttribute('style');
                this.node.avatar.style.transform='';
                this.node.avatar2.style.transform='';
                this.node.hp.show();
                this.node.equips.show();
                this.node.count.show();
                this.update();
                var player;
                player=this.previousSeat;
                while(player.isDead()) player=player.previousSeat;
                player.next=this;
                this.previous=player;
                player=this.nextSeat;
                while(player.isDead()) player=player.nextSeat;
                player.previous=this;
                this.next=player;
                game.players.add(this);
                game.dead.remove(this);
                if(this==game.me){
                    if(ui.auto) ui.auto.show();
                    if(ui.wuxie) ui.wuxie.show();
                    if(ui.revive){
                        ui.revive.close();
                        delete ui.revive;
                    }
                    if(ui.exit){
                        ui.exit.close();
                        delete ui.exit;
                    }
                    if(ui.swap){
                        ui.swap.close();
                        delete ui.swap;
                    }
                    if(ui.restart){
                        ui.restart.close();
                        delete ui.restart;
                    }
                    if(ui.continue_game){
                        ui.continue_game.close();
                        delete ui.continue_game;
                    }
                }
            },
            isMad:function(){
                return this.hasSkill('mad');
            },
            goMad:function(end){
                if(end){
                    this.addTempSkill('mad',end);
                }
                else{
                    this.addSkill('mad');
                }
                game.log(this,'进入混乱状态');
            },
            unMad:function(){
                this.removeSkill('mad');
            },
            tempHide:function(){
                this.addTempSkill('qianxing',{player:'phaseBeginStart'});
            },
            addExpose:function(num){
                if(typeof this.ai.shown=='number'&&!this.identityShown&&this.ai.shown<1){
                    this.ai.shown+=num;
                    if(this.ai.shown>0.95){
                        this.ai.shown=0.95;
                    }
                }
                return this;
            },
            equip:function(card,draw){
                var next=game.createEvent('equip');
                next.card=card;
                next.player=this;
                if(draw){
                    next.draw=true;
                }
                next.setContent(lib.element.content.equip);
                if(get.is.object(next.card)&&next.card.cards) next.card=next.card.cards[0];
                next.cards=[next.card];
                next.getd=function(player,key,position){
                    if(!position) position=ui.discardPile;
                    if(!key) key='cards';
                    var cards=[],event=this;
                    game.checkGlobalHistory('cardMove',function(evt){
                        if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
                        if(player&&player!=evt.player) return;
                        cards.addArray(evt[key]);
                    });
                    return cards;
                };
                next.getl=function(player){
                    const that=this;
                    const map={
                        player:player,
                        hs:[],
                        es:[],
                        js:[],
                        ss:[],
                        xs:[],
                        cards:[],
                        cards2:[],
                        gaintag_map:{},
                    };
                    player.checkHistory('lose',function(evt){
                        if(evt.parent==that){
                            map.hs.addArray(evt.hs);
                            map.es.addArray(evt.es);
                            map.js.addArray(evt.js);
                            map.ss.addArray(evt.ss);
                            map.xs.addArray(evt.xs);
                            map.cards.addArray(evt.cards);
                            map.cards2.addArray(evt.cards2);
                            for(let key in evt.gaintag_map){
                                if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
                                map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                            }
                        }
                    });
                    return map;
                };
                return next;
            },
            addJudge:function(card,cards){
                var next=game.createEvent('addJudge');
                if(get.itemtype(card)=='card'){
                    next.card=card;
                    next.cards=[card];
                }
                else{
                    next.cards=cards;
                    if(get.itemtype(next.cards)=='card') next.cards=[next.cards];
                    if(typeof card=='string'){
                        card={name:card};
                    }
                    next.card=get.autoViewAs(card,next.cards)
                }
                next.player=this;
                next.setContent('addJudge');
                next.getd=function(player,key,position){
                    if(!position) position=ui.discardPile;
                    if(!key) key='cards';
                    var cards=[],event=this;
                    game.checkGlobalHistory('cardMove',function(evt){
                        if(evt.name!='lose'||evt.position!=position||evt.getParent()!=event) return;
                        if(player&&player!=evt.player) return;
                        cards.addArray(evt[key]);
                    });
                    return cards;
                };
                next.getl=function(player){
                    const that=this;
                    const map={
                        player:player,
                        hs:[],
                        es:[],
                        js:[],
                        ss:[],
                        xs:[],
                        cards:[],
                        cards2:[],
                        gaintag_map:{},
                    };
                    player.checkHistory('lose',function(evt){
                        if(evt.parent==that){
                            map.hs.addArray(evt.hs);
                            map.es.addArray(evt.es);
                            map.js.addArray(evt.js);
                            map.ss.addArray(evt.ss);
                            map.xs.addArray(evt.xs);
                            map.cards.addArray(evt.cards);
                            map.cards2.addArray(evt.cards2);
                            for(let key in evt.gaintag_map){
                                if(!map.gaintag_map[key]) map.gaintag_map[key]=[];
                                map.gaintag_map[key].addArray(evt.gaintag_map[key]);
                            }
                        }
                    });
                    return map;
                };
                return next;
            },
            canAddJudge:function(card){
                if(this.isDisabledJudge()) return false;
                var name;
                if(typeof card=='string'){
                    name=card;
                }
                else{
                    name=card.viewAs||card.name;
                }
                if(!name) return false;
                if(this.hasJudge(name)) return false;
                if(this.isOut()) return false;
                var mod=game.checkMod(card,this,this,'unchanged','targetEnabled',this);
                if(mod!='unchanged') return mod;
                return true;
            },
            addJudgeNext:function(card,unlimited){
                if(!card.expired){
                    let target=this.next;
                    const name=card.viewAs||card.name;
                    const cards=(get.itemtype(card)=='card')?[card]:card.cards;
                    if(get.itemtype(cards)!='cards') return;
                    let bool=false;
                    if(!unlimited&&cards.some(card=>{
                        const position=get.position(card,true);
                        return position!='j'&&position!='o';
                    })){
                          game.log(card,'已被移出处理区，无法置入判定区');
                        return;
                    }
                    for(let iwhile=0;iwhile<20;iwhile++){
                        if(target.canAddJudge(card)){
                            bool=true;break;
                        }
                        target=target.next;
                    }
                    if(bool){
                        if(card.cards&&card.cards.length){
                            target.addJudge(name,card.cards[0]);
                        }
                        else if(card.name!=name){
                            target.addJudge(name,card);
                        }
                        else{
                            target.addJudge(card);
                        }
                    }
                }
                else{
                    card.expired=false;
                }
            },
            judge:function(){
                var next=game.createEvent('judge');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(get.itemtype(arguments[i])=='card'){
                        next.card=arguments[i];
                    }
                    else if(typeof arguments[i]=='string'){
                        next.skill=arguments[i];
                    }
                    else if(typeof arguments[i]=='function'){
                        next.judge=arguments[i];
                    }
                    else if(typeof arguments[i]=='boolean'){
                        next.clearArena=arguments[i];
                    }
                    else if(get.objtype(arguments[i])=='div'){
                        next.position=arguments[i];
                    }
                }
                if(next.card&&next.judge==undefined){
                    next.judge=get.judge(next.card);
                    next.judge2=get.judge2(next.card);
                }
                if(next.judge==undefined) next.judge=function(){return 0};
                if(next.position==undefined) next.position=ui.discardPile;
                if(next.card) next.cardname=next.card.viewAs||next.card.name;

                var str='';
                if(next.card) str=get.translation(next.card.viewAs||next.card.name);
                else if(next.skill) str=get.translation(next.skill);
                else str=get.translation(_status.event.name);
                next.judgestr=str;
                next.setContent('judge');
                return next;
            },
            turnOver:function(bool){
                if(typeof bool=='boolean'){
                    if(bool){
                        if(this.isTurnedOver()) return;
                    }
                    else{
                        if(!this.isTurnedOver()) return;
                    }
                }
                var next=game.createEvent('turnOver');
                next.player=this;
                next.includeOut=true;
                next.setContent('turnOver');
                return next;
            },
            out:function(skill){
                if(typeof skill=='number'){
                    this.outCount+=skill;
                }
                else if(typeof skill=='string'){
                    if(!this.outSkills){
                        this.outSkills=[];
                    }
                    this.outSkills.add(skill);
                }
                else{
                    this.outCount++;
                }
                if(!this.classList.contains('out')){
                    this.classList.add('out');
                    game.log(this,'离开游戏');
                }
                if(!game.countPlayer()){
                    game.over();
                }
            },
            in:function(skill){
                if(this.isOut()){
                    if(typeof skill=='string'){
                        if(this.outSkills){
                            this.outSkills.remove(skill);
                            if(!this.outSkills.length){
                                delete this.outSkills;
                            }
                        }
                    }
                    else if(typeof skill=='number'){
                        this.outCount-=skill;
                    }
                    else{
                        if(skill===true){
                            delete this.outSkills;
                        }
                        this.outCount=0;
                    }
                    if(this.outCount<=0&&!this.outSkills){
                        this.outCount=0;
                        this.classList.remove('out');
                        game.log(this,'进入游戏');
                    }
                }
            },
            link:function(bool){
                if(typeof bool=='boolean'){
                    if(bool){
                        if(this.isLinked()) return;
                    }
                    else{
                        if(!this.isLinked()) return;
                    }
                }
                var next=game.createEvent('link');
                next.player=this;
                next.setContent('link');
                return next;
            },
            skip:function(name){
                this.skipList.add(name);
            },
            wait:function(callback){
                if(lib.node){
                    if(typeof callback=='function'){
                        callback._noname_waiting=true;
                        lib.node.torespond[this.playerid]=callback;
                    }
                    else{
                        lib.node.torespond[this.playerid]='_noname_waiting';
                    }
                    clearTimeout(lib.node.torespondtimeout[this.playerid]);
                    if(this.ws&&!this.ws.closed){
                        var player=this;
                        var time=parseInt(lib.configOL.choose_timeout)*1000;
                        if(_status.event._global_timer||_status.event.getParent().skillHidden){
                            for(var i=0;i<game.players.length;i++){
                                game.players[i].showTimer(time);
                            }
                            player._hide_all_timer=true;
                        }
                        else if(!_status.event._global_waiting){
                            player.showTimer(time);
                        }
                        lib.node.torespondtimeout[this.playerid]=setTimeout(function(){
                            player.unwait('ai');
                            player.ws.ws.close();
                        },time+5000);
                    }
                }
            },
            unwait:function(result){
                if(this._hide_all_timer){
                    delete this._hide_all_timer;
                    for(var i=0;i<game.players.length;i++){
                        game.players[i].hideTimer();
                    }
                }
                else if(!_status.event._global_waiting){
                    this.hideTimer();
                }
                clearTimeout(lib.node.torespondtimeout[this.playerid]);
                delete lib.node.torespondtimeout[this.playerid];
                if(!lib.node.torespond.hasOwnProperty(this.playerid)){
                    return;
                }
                var noresume=false;
                var proceed=null;
                if(typeof lib.node.torespond[this.playerid]=='function'&&lib.node.torespond[this.playerid]._noname_waiting){
                    proceed=lib.node.torespond[this.playerid](result,this);
                    if(proceed===false){
                        noresume=true;
                    }
                }
                lib.node.torespond[this.playerid]=result;
                for(var i in lib.node.torespond){
                    if(lib.node.torespond[i]=='_noname_waiting'){
                        return;
                    }
                    else if(lib.node.torespond[i]&&lib.node.torespond[i]._noname_waiting){
                        return;
                    }
                }
                _status.event.result=result;
                _status.event.resultOL=lib.node.torespond;
                lib.node.torespond={};
                if(typeof proceed=='function') proceed();
                else if(_status.paused&&!noresume) game.resume();
            },
            tempUnwait:function(result){
                if(!lib.node.torespond.hasOwnProperty(this.playerid)){
                    return;
                }
                var proceed;
                if(typeof lib.node.torespond[this.playerid]=='function'&&lib.node.torespond[this.playerid]._noname_waiting){
                    proceed=lib.node.torespond[this.playerid](result,this);
                }
                if(typeof proceed=='function') proceed();
            },
            logSkill:function(name,targets,nature,logv){
                if(get.itemtype(targets)=='player') targets=[targets];
                var nopop=false;
                var popname=name;
                if(Array.isArray(name)){
                    popname=name[1];
                    name=name[0];
                }
                var checkShow=this.checkShow(name);
                if(lib.translate[name]){
                    this.trySkillAnimate(name,popname,checkShow);
                    if(Array.isArray(targets)&&targets.length){
                        var str;
                        if(targets[0]==this){
                            str='#b自己';
                            if(targets.length>1){
                                str+='、';
                                str+=get.translation(targets.slice(1));
                            }
                        }
                        else str=targets;
                        game.log(this,'对',str,'发动了','【'+get.skillTranslation(name,this)+'】');
                    }
                    else{
                        game.log(this,'发动了','【'+get.skillTranslation(name,this)+'】');
                    }
                }
                if(nature!=false){
                    if(nature===undefined){
                        nature='green';
                    }
                    this.line(targets,nature);
                }
                var info=lib.skill[name];
                if(info&&info.ai&&info.ai.expose!=undefined&&
                    this.logAi&&(!targets||targets.length!=1||targets[0]!=this)){
                    this.logAi(lib.skill[name].ai.expose);
                }
                if(info&&info.round){
                    var roundname=name+'_roundcount';
                    this.storage[roundname]=game.roundNumber;
                    this.syncStorage(roundname);
                    this.markSkill(roundname);
                }
                game.trySkillAudio(name,this,true);
                if(game.chess){
                    this.chessFocus();
                }
                if(logv===true){
                    game.logv(this,name,targets,null,true);
                }
                else if(info&&info.logv!==false){
                    game.logv(this,name,targets);
                }
                if(info){
                    var player=this;
                    var players=player.getSkills(false,false,false);
                    var equips=player.getSkills('e');
                    var global=lib.skill.global.slice(0);
                    var logInfo={
                        skill:name,
                        targets:targets,
                        event:_status.event,
                    };
                    if(info.sourceSkill){
                        logInfo.sourceSkill=info.sourceSkill;
                        if(global.contains(info.sourceSkill)){
                            logInfo.type='global';
                        }
                        else if(players.contains(info.sourceSkill)){
                            logInfo.type='player';
                        }
                        else if(equips.contains(info.sourceSkill)){
                            logInfo.type='equip';
                        }
                    }
                    else{
                        if(global.contains(name)){
                            logInfo.sourceSkill=name;
                            logInfo.type='global';
                        }
                        else if(players.contains(name)){
                            logInfo.sourceSkill=name;
                            logInfo.type='player';
                        }
                        else if(equips.contains(name)){
                            logInfo.sourceSkill=name;
                            logInfo.type='equip';
                        }
                        else{
                            var bool=false;
                            for(var i of players){
                                var expand=[i];
                                game.expandSkills(expand);
                                if(expand.contains(name)){
                                    bool=true;
                                    logInfo.sourceSkill=i;
                                    logInfo.type='player';
                                    break;
                                }
                            }
                            if(!bool){
                                for(var i of players){
                                    var expand=[i];
                                    game.expandSkills(expand);
                                    if(expand.contains(name)){
                                        logInfo.sourceSkill=i;
                                        logInfo.type='equip';
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    var next=game.createEvent('logSkill',false),evt=_status.event;
                    next.player=player;
                    next.forceDie=true;
                    next.includeOut=true;
                    evt.next.remove(next);
                    if(evt.logSkill) evt=evt.getParent();
                    for(var i in logInfo){
                        if(i=='event') next.log_event=logInfo[i];
                        else next[i]=logInfo[i];
                    }
                    evt.after.push(next);
                    next.setContent('emptyEvent');
                    player.getHistory('useSkill').push(logInfo);
                    //尽可能别往这写插入结算
                    //不能用来终止技能发动！！！
                    var next2=game.createEvent('logSkillBegin',false);
                    next2.player=player;
                    next2.forceDie=true;
                    next2.includeOut=true;
                    for(var i in logInfo){
                        if(i=='event') next2.log_event=logInfo[i];
                        else next2[i]=logInfo[i];
                    }
                    next2.setContent('emptyEvent');
                }
                if(this._hookTrigger){
                    for(var i=0;i<this._hookTrigger.length;i++){
                        var info=lib.skill[this._hookTrigger[i]].hookTrigger;
                        if(info&&info.log){
                            info.log(this,name,targets);
                        }
                    }
                }
            },
            unprompt:function(){
                if(this.node.prompt){
                    this.node.prompt.delete();
                    delete this.node.prompt;
                }
            },
            prompt:function(str,nature){
                var node;
                if(this.node.prompt){
                    node=this.node.prompt;
                    node.innerHTML='';
                    node.className='damage normal-font damageadded';
                }
                else{
                    node=ui.create.div('.damage.normal-font',this);
                    this.node.prompt=node;
                    ui.refresh(node);
                    node.classList.add('damageadded');
                }
                node.innerHTML=str;
                node.dataset.nature=nature||'soil';
            },
            prompt_old:function(name2,className){
                var node;
                if(this.node.prompt){
                    node=this.node.prompt;
                    node.innerHTML='';
                    node.className='popup';
                }
                else{
                    node=ui.create.div('.popup',this.parentNode);
                    this.node.prompt=node;
                }
                node.dataset.position=this.dataset.position;
                if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
                    typeof name2=='number'||this.classList.contains('minskin')){
                    node.innerHTML=name2;
                }
                else{
                    for(var i=0;i<name2.length;i++){
                        node.innerHTML+=name2[i]+'<br/>';
                    }
                }
                if(className){
                    node.classList.add(className);
                }
            },
            popup:function(name,className,nobroadcast){
                var name2=get.translation(name);
                if(!name2) return;
                this.$damagepop(name2,className||'water',true,nobroadcast);
            },
            popup_old:function(name,className){
                var name2=get.translation(name);
                var node=ui.create.div('.popup',this.parentNode);
                if(!name2){
                    node.remove();
                    return node;
                }
                game.addVideo('popup',this,[name,className]);
                node.dataset.position=this.dataset.position;
                if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
                    typeof name2=='number'||this.classList.contains('minskin')){
                    node.innerHTML=name2;
                }
                else{
                    for(var i=0;i<name2.length;i++){
                        node.innerHTML+=name2[i]+'<br/>';
                    }
                }
                if(className){
                    node.classList.add(className);
                }
                this.popups.push(node);
                if(this.popups.length>1){
                    node.hide();
                }
                else{
                    var that=this;
                    setTimeout(function(){that._popup();},1000);
                }
                return node;
            },
            _popup:function(){
                if(this.popups.length){
                    this.popups.shift().delete();
                    if(this.popups.length){
                        this.popups[0].show();
                        var that=this;
                        setTimeout(function(){that._popup();},1000);
                    }
                }
            },
            showTimer:function(time){
                if(!time&&lib.configOL){
                    time=parseInt(lib.configOL.choose_timeout)*1000;
                }
                if(_status.connectMode&&!game.online){
                    game.broadcast(function(player,time){
                        player.showTimer(time);
                    },this,time);
                }
                if(this==game.me){
                    return;
                }
                if(this.node.timer){
                    this.node.timer.remove();
                }
                var timer=ui.create.div('.timerbar',this);
                this.node.timer=timer;
                ui.create.div(this.node.timer);
                var bar=ui.create.div(this.node.timer);
                ui.refresh(bar);
                bar.style.transitionDuration=(time/1000)+'s';
                bar.style.transform='scale(0,1)';
            },
            hideTimer:function(){
                if(_status.connectMode&&!game.online&&this.playerid){
                    game.broadcast(function(player){
                        player.hideTimer();
                    },this);
                }
                if(this.node.timer){
                    this.node.timer.delete();
                    delete this.node.timer;
                }
            },
            markAuto:function(name,info){
                if(typeof info!='undefined'){
                    if(!Array.isArray(this.storage[name])) this.storage[name]=[];
                    if(Array.isArray(info)){
                        this.storage[name].addArray(info);
                    }
                    else this.storage[name].add(info);
                    this.markSkill(name);
                }
                else{
                    var storage=this.storage[name];
                    if(Array.isArray(storage)){
                        this[storage.length>0?'markSkill':'unmarkSkill'](name);
                    }
                    else if(typeof storage=='number'){
                        this[storage>0?'markSkill':'unmarkSkill'](name);
                    }
                }
            },
            unmarkAuto:function(name,info){
                var storage=this.storage[name]
                if(Array.isArray(info)&&Array.isArray(storage)){
                    storage.removeArray(info.slice(0));
                    this.markAuto(name);
                }
            },
            getExpansions:function(tag){
                return this.getCards('x',(card)=>card.hasGaintag(tag));
            },
            countExpansions:function(tag){
                return this.getExpansions(tag).length;
            },
            hasExpansions:function(tag){
                return this.countExpansions(tag)>0;
            },
            setStorage:function(name,value,mark){
                this.storage[name]=value;
                if(mark) this.markAuto(name);
                return value;
            },
            getStorage:function(name){
                return this.storage[name]||[];
            },
            hasStorage:function(name,value){
                if(!(name in this.storage)) return false;
                if(typeof value=="undefined") return true;
                const storage=this.storage[name];
                if(storage===value) return true;
                return Array.isArray(storage) && storage.includes(value);
            },
            hasStorageAny:function(name,values){
                const storage=this.storage[name];
                if(!Array.isArray(values)) values=Array.from(arguments).slice(1);
                if(!storage) return false;
                if (!Array.isArray(storage)) return values.contains(storage);
                return values.some(item => storage.contains(item));
            },
            hasStorageAll:function(name,values){
                const storage=this.storage[name];
                if(!Array.isArray(values)) values=Array.from(arguments).slice(1);
                if(!storage) return false;
                if (!Array.isArray(storage)) return false;
                return values.every(item => storage.contains(item));
            },
            initStorage:function(name,value,mark){
                return this.hasStorage(name)?this.getStorage(name):this.setStorage(name,value,mark);
            },
            updateStorage:function(name,operation,mark){
                return this.setStorage(name,operation(this.getStorage(name)),mark);
            },
            updateStorageAsync:function(name,operation,mark){
                return Promise.resolve(this.getStorage(name))
                .then(value=>operation(value))
                .then(value=>this.setStorage(name,value,mark));
            },
            removeStorage:function(name,mark){
                if(!this.hasStorage(name)) return false;
                delete this.storage[name]
                if(mark){
                    this.unmarkSkill(name);
                }
                return true;
            },
            markSkill:function(name,info,card,nobroadcast){
                if(info===true){
                    this.syncStorage(name);
                    info=null;
                }
                if(get.itemtype(card)=='card'){
                    game.addVideo('markSkill',this,[name,get.cardInfo(card)]);
                }
                else{
                    game.addVideo('markSkill',this,[name]);
                }
                const func=function(storage,player,name,info,card){
                    player.storage[name]=storage;
                    if(!info){
                        if(player.marks[name]){
                            player.updateMarks();
                            return;
                        }
                        if(lib.skill[name]){
                            info=lib.skill[name].intro;
                        }
                        if(!info){
                            return;
                        }
                    }
                    if(player.marks[name]){
                        player.marks[name].info=info;
                    }
                    else{
                        if(card){
                            player.marks[name]=player.mark(card,info,name);
                        }
                        else{
                            player.marks[name]=player.mark(name,info);
                        }
                    }
                    player.updateMarks();
                };
                func(this.storage[name],this,name,info,card);
                if(!nobroadcast) game.broadcast(func,this.storage[name],this,name,info,card);
                return this;
            },
            unmarkSkill:function(name,nobroadcast){
                game.addVideo('unmarkSkill',this,name);
                if(!nobroadcast) game.broadcast(function(player,name){
                    if(player.marks[name]){
                        player.marks[name].delete();
                        player.marks[name].style.transform+=' scale(0.2)';
                        delete player.marks[name];
                        ui.updatem(player);
                    }
                },this,name);
                if(this.marks[name]){
                    this.marks[name].delete();
                    this.marks[name].style.transform+=' scale(0.2)';
                    delete this.marks[name];
                    ui.updatem(this);
                    var info=lib.skill[name];
                    if(!game.online&&info&&info.intro&&info.intro.onunmark){
                        if(info.intro.onunmark=='throw'){
                            if(get.itemtype(this.storage[name])=='cards'){
                                this.$throw(this.storage[name],1000);
                                game.cardsDiscard(this.storage[name]);
                                game.log(this.storage[name],'进入了弃牌堆');
                                this.storage[name].length=0;
                            }
                        }
                        else if(typeof info.intro.onunmark=='function'){
                            info.intro.onunmark(this.storage[name],this);
                        }
                        else delete this.storage[name];
                    }
                }
                return this;
            },
            markSkillCharacter:function(id,target,name,content,nobroadcast){
                if(typeof target=='object'){
                    target=target.name;
                }
                const func=function(player,target,name,content,id){
                    if(player.marks[id]){
                        player.marks[id].name=name+'_charactermark';
                        player.marks[id]._name=target;
                        player.marks[id].info={
                            name:name,
                            content:content,
                            id:id
                        };
                        player.marks[id].setBackground(target,'character');
                        game.addVideo('changeMarkCharacter',player,{
                            id:id,
                            name:name,
                            content:content,
                            target:target
                        });
                    }
                    else{
                        player.marks[id]=player.markCharacter(target,{
                            name:name,
                            content:content,
                            id:id
                        });
                        player.marks[id]._name=target;
                        game.addVideo('markCharacter',player,{
                            name:name,
                            content:content,
                            id:id,
                            target:target
                        });
                    }
                }
                func(this,target,name,content,id);
                if(!nobroadcast) game.broadcast(func,this,target,name,content,id);
                return this;
            },
            markCharacter:function(name,info,learn,learn2){
                if(typeof name=='object'){
                    name=name.name;
                }
                var node;
                if(name.startsWith('unknown')){
                    node=ui.create.div('.card.mark.drawinghidden');
                    ui.create.div('.background.skillmark',node).innerHTML=get.translation(name)[0];
                }
                else{
                    if(!lib.character[name]) return;
                    node=ui.create.div('.card.mark.drawinghidden').setBackground(name,'character');
                }
                this.node.marks.insertBefore(node,this.node.marks.childNodes[1]);
                node.name=name+'_charactermark';
                if(!info){
                    info={};
                }
                if(!info.name){
                    info.name=get.translation(name);
                }
                if(!info.content){
                    info.content=get.skillintro(name,learn,learn2)
                }
                node.info=info;
                node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.card);
                if(!lib.config.touchscreen){
                    if(lib.config.hover_all){
                        lib.setHover(node,ui.click.hoverplayer);
                    }
                    if(lib.config.right_info){
                        node.oncontextmenu=ui.click.rightplayer;
                    }
                }
                ui.updatem(this);
                return node;
            },
            mark:function(name,info,skill){
                if(get.itemtype(name)=='cards'){
                    var marks=[];
                    for(var i=0;i<name.length;i++){
                        marks.push(this.mark(name[i],info));
                    }
                    return marks;
                }
                else{
                    var node;
                    if(get.itemtype(name)=='card'){
                        node=name.copy('mark');
                        node.classList.add('drawinghidden');
                        this.node.marks.insertBefore(node,this.node.marks.childNodes[1]);
                        node.suit=name.suit;
                        node.number=name.number;
                        // if(name.name&&lib.card[name.name]&&lib.card[name.name].markimage){
                        // 	node.node.image.style.left=lib.card[name.name].markimage;
                        // }

                        if(name.classList.contains('fullborder')){
                            node.classList.add('fakejudge');
                            node.classList.add('fakemark');
                            (node.querySelector('.background')||ui.create.div('.background',node)).innerHTML=lib.translate[name.name+'_bg']||get.translation(name.name)[0];
                        }

                        name=name.name;
                    }
                    else{
                        node=ui.create.div('.card.mark.drawinghidden');
                        this.node.marks.insertBefore(node,this.node.marks.childNodes[1]);
                        if(lib.skill[name]&&lib.skill[name].markimage){
                            node.setBackgroundImage(lib.skill[name].markimage);
                            node.style['box-shadow']='none';
                            node.style['background-size']='contain';
                        }
                        else if(lib.skill[name]&&lib.skill[name].markimage2){
                            let img=ui.create.div('.background.skillmark',node);
                            img.setBackgroundImage(lib.skill[name].markimage2);
                            img.style['background-size']='contain';
                        }
                        else{
                            var str=lib.translate[name+'_bg'];
                            if(!str||str[0]=='+'||str[0]=='-'){
                                str=get.translation(name)[0];
                            }
                            ui.create.div('.background.skillmark',node).innerHTML=str;
                        }
                    }
                    node.name=name;
                    node.skill=skill||name;
                    if(typeof info=='object'){
                        node.info=info;
                    }
                    else if(typeof info=='string'){
                        node.markidentifer=info;
                    }
                    node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.card);
                    if(!lib.config.touchscreen){
                        if(lib.config.hover_all){
                            lib.setHover(node,ui.click.hoverplayer);
                        }
                        if(lib.config.right_info){
                            node.oncontextmenu=ui.click.rightplayer;
                        }
                    }
                    this.updateMarks();
                    ui.updatem(this);
                    return node;
                }
            },
            unmark:function(name,info){
                game.addVideo('unmarkname',this,name);
                if(get.itemtype(name)=='card'){
                    this.unmark(name.name,info);
                }
                else if(get.itemtype(name)=='cards'){
                    for(var i=0;i<name.length;i++){
                        this.unmark(name[i].name,info);
                    }
                }
                else{
                    for(var i=0;i<this.node.marks.childNodes.length;i++){
                        if(this.node.marks.childNodes[i].name==name&&
                            (!info||this.node.marks.childNodes[i].markidentifer==info)){
                            this.node.marks.childNodes[i].delete();
                            this.node.marks.childNodes[i].style.transform+=' scale(0.2)';
                            ui.updatem(this);
                            return;
                        }
                    }
                }
            },
            addLink:function(){
                if(get.is.linked2(this)){
                    this.classList.add('linked2');
                }
                else{
                    this.classList.add('linked');
                }
            },
            removeLink:function(){
                if(get.is.linked2(this)){
                    this.classList.remove('linked2');
                }
                else{
                    this.classList.remove('linked');
                }
            },
            canUse:function(card,target,distance,includecard){
                if(typeof card=='string') card={name:card,isCard:true};
                var info=get.info(card);
                if(info.multicheck&&!info.multicheck(card,this)) return false;
                if(!lib.filter.cardEnabled(card,this)) return false;
                if(includecard&&!lib.filter.cardUsable(card,this)) return false;
                if(distance!==false&&!lib.filter.targetInRange(card,this,target)) return false;
                return lib.filter[includecard?'targetEnabledx':'targetEnabled'](card,this,target);
            },
            hasUseTarget:function(card,distance,includecard){
                var player=this;
                return game.hasPlayer(function(current){
                    return player.canUse(card,current,distance,includecard);
                });
            },
            hasValueTarget:function(){
                return this.getUseValue.apply(this,arguments)>0;
            },
            getUseValue:function(card,distance,includecard){
                if(typeof(card)=='string'){
                    card={name:card,isCard:true};
                }
                var player=this;
                var targets=game.filterPlayer();
                var value=[];
                var min=0;
                var info=get.info(card);
                if(!info||info.notarget) return 0;
                var range;
                var select=get.copy(info.selectTarget);
                if(select==undefined){
                    if(info.filterTarget==undefined) return true;
                    range=[1,1];
                }
                else if(typeof select=='number') range=[select,select];
                else if(get.itemtype(select)=='select') range=select;
                else if(typeof select=='function') range=select(card,player);
                if(info.singleCard) range=[1,1];
                game.checkMod(card,player,range,'selectTarget',player);
                if(!range) return 0;
            
                for(var i=0;i<targets.length;i++){
                    if(player.canUse(card,targets[i],distance,includecard)){
                        var eff=get.effect(targets[i],card,player,player);
                        value.push(eff);
                    }
                }
                value.sort(function(a,b){
                    return b-a;
                });
                for(var i=0;i<value.length;i++){
                    if(i==range[1]||range[1]!=-1&&value[i]<=0) break;
                    min+=value[i];
                }
                return min;
            },
            addSubPlayer:function(cfg){
                var skill='subplayer_'+cfg.name+'_'+get.id();
                game.log(this,'获得了随从','#g'+get.translation(cfg.name))
                cfg.hs=cfg.hs||[];
                cfg.es=cfg.es||[];
                cfg.skills=cfg.skills||[];
                cfg.hp=cfg.hp||1;
                cfg.maxHp=cfg.maxHp||1;
                cfg.sex=cfg.sex||'male';
                cfg.group=cfg.group||'qun';
                cfg.skill=cfg.skill||_status.event.name;
                if(!cfg.source){
                    if(this.hasSkill(_status.event.name)&&this.name2&&lib.character[this.name2]&&
                        lib.character[this.name2][3].contains(_status.event.name)){
                        cfg.source=this.name2;
                    }
                    else{
                        cfg.source=this.name;
                    }
                }
                game.broadcastAll(function(player,skill,cfg){
                    lib.skill[skill]={
                        intro:{
                            content:cfg.intro||''
                        },
                        mark:'character',
                        subplayer:cfg.skill,
                        ai:{
                            subplayer:true
                        }
                    }
                    lib.character[skill]=[cfg.sex,cfg.group,cfg.maxHp,cfg.skills,['character:'+cfg.name]];
                    lib.translate[skill]=cfg.caption||get.rawName(cfg.name);
                    player.storage[skill]=cfg;
                },this,skill,cfg);
                game.addVideo('addSubPlayer',this,[skill,lib.skill[skill],lib.character[skill],lib.translate[skill],{name:cfg.name}]);
                this.addSkill(skill);
                return skill;
            },
            removeSubPlayer:function(name){
                if(this.hasSkill('subplayer')&&this.name==name){
                    this.exitSubPlayer(true);
                }
                else{
                    if(player.storage[name].onremove){
                        player.storage[name].onremove(player);
                    }
                    this.removeSkill(name);
                    delete this.storage[name];
                    game.log(player,'牺牲了随从','#g'+name);
                    _status.event.trigger('removeSubPlayer');
                }
            },
            callSubPlayer:function(){
                if(this.hasSkill('subplayer')) return;
                var next=game.createEvent('callSubPlayer');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='string'){
                        next.directresult=arguments[i];
                    }
                }
                next.setContent('callSubPlayer');
                return next;
            },
            toggleSubPlayer:function(){
                if(!this.hasSkill('subplayer')) return;
                var next=game.createEvent('toggleSubPlayer');
                next.player=this;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='string'){
                        next.directresult=arguments[i];
                    }
                }
                next.setContent('toggleSubPlayer');
                return next;
            },
            exitSubPlayer:function(remove){
                if(!this.hasSkill('subplayer')) return;
                var next=game.createEvent('exitSubPlayer');
                next.player=this;
                next.remove=remove;
                next.setContent('exitSubPlayer');
                return next;
            },
            getSubPlayers:function(tag){
                var skills=this.getSkills();
                var list=[];
                for(var i=0;i<skills.length;i++){
                    var name=skills[i];
                    var info=lib.skill[name];
                    if(tag&&info.subplayer!=tag) continue;
                    if(info.ai&&info.ai.subplayer&&this.storage[name]&&this.storage[name].name){
                        list.push(name);
                    }
                }
                return list;
            },
            addSkillTrigger:function(skill,hidden,triggeronly){
                var info=lib.skill[skill];
                if(!info) return;
                if(typeof info.group=='string'){
                    this.addSkillTrigger(info.group,hidden);
                }
                else if(Array.isArray(info.group)){
                    for(var i=0;i<info.group.length;i++){
                        this.addSkillTrigger(info.group[i],hidden);
                    }
                }
                if(!triggeronly){
                    if(info.global&&(!hidden||info.globalSilent)){
                        if(typeof info.global=='string'){
                            game.addGlobalSkill(info.global,this);
                        }
                        else{
                            for(var j=0;j<info.global.length;j++){
                                game.addGlobalSkill(info.global[j],this);
                            }
                        }
                    }
                    if(this.initedSkills.contains(skill)) return this;
                    this.initedSkills.push(skill);
                    if(info.init&&!_status.video){
                        info.init(this,skill);
                    }
                }
                if(info.trigger&&this.playerid){
                    var playerid=this.playerid;
                    var setTrigger=function(i,evt){
                        if(i=='global'){
                            if(!lib.hook.globaltrigger[evt]){
                                lib.hook.globaltrigger[evt]={};
                            }
                            if(!lib.hook.globaltrigger[evt][playerid]){
                                lib.hook.globaltrigger[evt][playerid]=[];
                            }
                            lib.hook.globaltrigger[evt][playerid].add(skill);
                        }
                        else{
                            var name=playerid+'_'+i+'_'+evt;
                            if(!lib.hook[name]){
                                lib.hook[name]=[];
                            }
                            lib.hook[name].add(skill);
                        }
                        lib.hookmap[evt]=true;
                    }
                    for(var i in info.trigger){
                        if(typeof info.trigger[i]=='string'){
                            setTrigger(i,info.trigger[i]);
                        }
                        else if(Array.isArray(info.trigger[i])){
                            for(var j=0;j<info.trigger[i].length;j++){
                                setTrigger(i,info.trigger[i][j]);
                            }
                        }
                    }
                }
                if(info.hookTrigger){
                    if(!this._hookTrigger){
                        this._hookTrigger=[];
                    }
                    this._hookTrigger.add(skill);
                }
                if(_status.event&&_status.event.addTrigger) _status.event.addTrigger(skill,this);
                return this;
            },
            addSkillLog:function(skill){
                this.addSkill(skill);
                this.popup(skill);
                game.log(this,'获得了技能','#g【'+get.translation(skill)+'】');
            },
            addInvisibleSkill:function(skill){
                if(Array.isArray(skill)){
                    _status.event.clearStepCache();
                    for(var i=0;i<skill.length;i++){
                        this.addInvisibleSkill(skill[i]);
                    }
                }
                else{
                    if(this.invisibleSkills.contains(skill)) return;
                    _status.event.clearStepCache();
                    var info=lib.skill[skill];
                    if(!info) return;
                    this.invisibleSkills.add(skill);
                    this.addSkillTrigger(skill);
                    if(this.awakenedSkills.contains(skill)){
                        this.awakenSkill(skill);
                        return;
                    }
                }
            },
            removeInvisibleSkill:function(skill){
                if(!skill) return;
                if(Array.isArray(skill)){
                    for(var i=0;i<skill.length;i++){
                        this.removeSkill(skill[i]);
                    }
                }
                else{
                    var info=lib.skill[skill];
                    if(info&&info.fixed&&arguments[1]!==true) return skill;
                    game.broadcastAll(function(player,skill){
                        player.invisibleSkills.remove(skill);
                    },this,skill);
                    if(!player.hasSkill(skill,true)) player.removeSkill(skill);
                }
                return skill;
            },
            addSkill:function(skill,checkConflict,nobroadcast,addToSkills){
                if(Array.isArray(skill)){
                    _status.event.clearStepCache();
                    for(var i=0;i<skill.length;i++){
                        this.addSkill(skill[i]);
                    }
                }
                else{
                    if(this.skills.contains(skill)) return;
                    _status.event.clearStepCache();
                    var info=lib.skill[skill];
                    if(!info) return;
                    if(!addToSkills){
                        this.skills.add(skill);
                        if(!nobroadcast){
                            game.broadcast(function(player,skill){
                                player.skills.add(skill);
                            },this,skill);
                        }
                    }
                    this.addSkillTrigger(skill);
                    if(this.awakenedSkills.contains(skill)){
                        this.awakenSkill(skill);
                        return;
                    }
                    if(info.init2&&!_status.video){
                        info.init2(this,skill);
                    }
                    if(info.mark){
                        if(info.mark=='card'&&
                            get.itemtype(this.storage[skill])=='card'){
                                this.markSkill(skill,null,this.storage[skill],nobroadcast);
                        }
                        else if(info.mark=='card'&&
                            get.itemtype(this.storage[skill])=='cards'){
                                this.markSkill(skill,null,this.storage[skill][0],nobroadcast);
                        }
                        else if(info.mark=='image'){
                                this.markSkill(skill,null,ui.create.card(null,'noclick').init([null,null,skill]),nobroadcast);
                        }
                        else if(info.mark=='character'){
                            var intro=info.intro.content;
                            if(typeof intro=='function'){
                                intro=intro(this.storage[skill],this);
                            }
                            else if(typeof intro=='string'){
                                intro=intro.replace(/#/g,this.storage[skill]);
                                intro=intro.replace(/&/g,get.cnNumber(this.storage[skill]));
                                intro=intro.replace(/\$/g,get.translation(this.storage[skill]));
                            }
                            var caption;
                            if(typeof info.intro.name=='function'){
                                caption=info.intro.name(this.storage[skill],this);
                            }
                            else if(typeof info.intro.name=='string'){
                                caption=info.name;
                            }
                            else{
                                caption=get.translation(skill);
                            }
                            this.markSkillCharacter(skill,this.storage[skill],caption,intro,nobroadcast);
                        }
                        else{
                            this.markSkill(skill,null,null,nobroadcast);
                        }
                    }
                }
                if(checkConflict) this.checkConflict();
                return skill;
            },
            addAdditionalSkill:function(skill,skills,keep){
                if(this.additionalSkills[skill]){
                    if(keep){
                        if(typeof this.additionalSkills[skill]=='string'){
                            this.additionalSkills[skill]=[this.additionalSkills[skill]];
                        }
                    }
                    else{
                        this.removeAdditionalSkill(skill);
                        this.additionalSkills[skill]=[];
                    }
                }
                else{
                    this.additionalSkills[skill]=[];
                }
                if(typeof skills=='string'){
                    skills=[skills];
                }
                for(var i=0;i<skills.length;i++){
                    this.addSkill(skills[i],null,true,true);
                    //this.skills.remove(skills[i]);
                    this.additionalSkills[skill].push(skills[i]);
                }
                this.checkConflict();
                _status.event.clearStepCache();
                return this;
            },
            removeAdditionalSkill:function(skill,target){
                const player=this;
                if(this.additionalSkills[skill]){
                    const additionalSkills=this.additionalSkills[skill];
                    const hasAnotherSKill=function(skillkey,skill){
                        return (player.skills.contains(skill)||player.tempSkills[skill]||Object.keys(player.additionalSkills).some(key=>{
                            if(key===skillkey) return false;
                            if(Array.isArray(player.additionalSkills[key])) return player.additionalSkills[key].includes(skill);
                            return player.additionalSkills[key]==skill;
                        }))
                    }
                    if(Array.isArray(additionalSkills)&&typeof target=='string'){
                        if(additionalSkills.contains(target)){
                            additionalSkills.remove(target);
                            if(!hasAnotherSKill(skill,target)) this.removeSkill(target);
                        }
                    }
                    else{
                        delete this.additionalSkills[skill];
                        if(typeof additionalSkills=='string'){
                            if(!hasAnotherSKill(skill,additionalSkills)) this.removeSkill(additionalSkills);
                        }
                        else if(Array.isArray(additionalSkills)){
                            const skillsToRemove=additionalSkills.filter(target=>!hasAnotherSKill(skill,target))
                            this.removeSkill(skillsToRemove);
                        }
                    }
                }
                _status.event.clearStepCache();
                return this;
            },
            awakenSkill:function(skill,nounmark){
                if(!nounmark) this.unmarkSkill(skill);
                this.disableSkill(skill+'_awake',skill);
                this.awakenedSkills.add(skill);
                if(this.storage[skill]===false) this.storage[skill]=true;
                _status.event.clearStepCache();
                return this;
            },
            restoreSkill:function(skill,nomark){
                if(this.storage[skill]===true) this.storage[skill]=false;
                this.awakenedSkills.remove(skill);
                this.enableSkill(skill+'_awake',skill);
                if(!nomark) this.markSkill(skill);
                _status.event.clearStepCache();
                return this;
            },
            disableSkill:function(skill,skills){
                if(typeof skills=='string'){
                    if(!this.disabledSkills[skills]){
                        this.disabledSkills[skills]=[];
                        var info=get.info(skills);
                        if(info.ondisable&&info.onremove){
                            if(typeof info.onremove=='function'){
                                info.onremove(this,skill);
                            }
                            else if(typeof info.onremove=='string'){
                                if(info.onremove=='storage'){
                                    delete this.storage[skill];
                                }
                                else{
                                    var cards=this.storage[skill];
                                    if(get.itemtype(cards)=='card'){
                                        cards=[cards];
                                    }
                                    if(get.itemtype(cards)=='cards'){
                                        if(this.onremove=='discard'){
                                            this.$throw(cards);
                                        }
                                        if(this.onremove=='discard'||this.onremove=='lose'){
                                            game.cardsDiscard(cards);
                                            delete this.storage[skill];
                                        }
                                    }
                                }
                            }
                            else if(Array.isArray(info.onremove)){
                                for(var i=0;i<info.onremove.length;i++){
                                    delete this.storage[info.onremove[i]];
                                }
                            }
                            else if(info.onremove===true){
                                delete this.storage[skill];
                            }
                        }
                    }
                    this.disabledSkills[skills].add(skill);
                    var group=lib.skill[skills].group;
                    if(typeof group=='string'||Array.isArray(group)){
                        this.disableSkill(skill,group);
                    }
                }
                else if(Array.isArray(skills)){
                    for(var i=0;i<skills.length;i++){
                        this.disableSkill(skill,skills[i]);
                    }
                }
                _status.event.clearStepCache();
                return this;
            },
            enableSkill:function(skill){
                for(var i in this.disabledSkills){
                    this.disabledSkills[i].remove(skill);
                    if(this.disabledSkills[i].length==0){
                        delete this.disabledSkills[i];
                    }
                }
                _status.event.clearStepCache();
                return this;
            },
            checkMarks:function(){
                var skills=this.getSkills();
                game.expandSkills(skills);
                for(var i in this.marks){
                    if(!skills.contains(i)&&!this.marks[i].info.fixed){
                        this.unmarkSkill(i);
                    }
                }
                return this;
            },
            addEquipTrigger:function(card){
                if(card){
                    var info=get.info(card);
                    if(info.skills){
                        for(var j=0;j<info.skills.length;j++){
                            this.addSkillTrigger(info.skills[j]);
                        }
                    }
                }
                else{
                    var es=this.getCards('e');
                    for(var i=0;i<es.length;i++){
                        this.addEquipTrigger(es[i]);
                    }
                }
                return this;
            },
            removeEquipTrigger:function(card){
                if(card){
                    var info=get.info(card);
                    var skills=this.getSkills(null,false);
                    if(info.skills){
                        for(var j=0;j<info.skills.length;j++){
                            if(skills.contains(info.skills[j])) continue;
                            this.removeSkillTrigger(info.skills[j]);
                        }
                    }
                    if(info.clearLose&&typeof info.onLose=='function'){
                        var next=game.createEvent('lose_'+card.name);
                        next.setContent(info.onLose);
                        next.player=this;
                        next.card=card;
                    }
                }
                else{
                    var es=this.getCards('e');
                    for(var i=0;i<es.length;i++){
                        this.removeEquipTrigger(es[i]);
                    }
                }
                return this;
            },
            removeSkillTrigger:function(skill,triggeronly){
                var info=lib.skill[skill];
                if(!info) return;
                if(typeof info.group=='string'){
                    this.removeSkillTrigger(info.group);
                }
                else if(Array.isArray(info.group)){
                    for(var i=0;i<info.group.length;i++){
                        this.removeSkillTrigger(info.group[i]);
                    }
                }
                if(!triggeronly) this.initedSkills.remove(skill);
                if(info.trigger){
                    var playerid=this.playerid;
                    var removeTrigger=function(i,evt){
                        if(i=='global'){
                            for(var j in lib.hook.globaltrigger){
                                if(lib.hook.globaltrigger[j][playerid]){
                                    lib.hook.globaltrigger[j][playerid].remove(skill);
                                    if(lib.hook.globaltrigger[j][playerid].length==0){
                                        delete lib.hook.globaltrigger[j][playerid];
                                    }
                                    if(get.is.empty(lib.hook.globaltrigger[j])){
                                        delete lib.hook.globaltrigger[j];
                                    }
                                }
                            }
                        }
                        else{
                            var name=playerid+'_'+i+'_'+evt;
                            if(lib.hook[name]){
                                lib.hook[name].remove(skill);
                                if(lib.hook[name].length==0){
                                    delete lib.hook[name];
                                }
                            }
                        }
                    }
                    for(var i in info.trigger){
                        if(typeof info.trigger[i]=='string'){
                            removeTrigger(i,info.trigger[i]);
                        }
                        else if(Array.isArray(info.trigger[i])){
                            for(var j=0;j<info.trigger[i].length;j++){
                                removeTrigger(i,info.trigger[i][j]);
                            }
                        }
                    }
                }
                if(info.hookTrigger){
                    if(this._hookTrigger){
                        this._hookTrigger.remove(skill);
                        if(!this._hookTrigger.length){
                            delete this._hookTrigger;
                        }
                    }
                }
                return this;
            },
            removeSkill:function(skill){
                if(!skill) return;
                if(Array.isArray(skill)){
                    for(var i=0;i<skill.length;i++){
                        this.removeSkill(skill[i]);
                    }
                }
                else{
                    var info=lib.skill[skill];
                    if(info&&info.fixed&&arguments[1]!==true) return skill;
                    this.unmarkSkill(skill);
                    game.broadcastAll(function(player,skill){
                        player.skills.remove(skill);
                        player.hiddenSkills.remove(skill);
                        player.invisibleSkills.remove(skill);
                        delete player.tempSkills[skill];
                        for(var i in player.additionalSkills){
                            player.additionalSkills[i].remove(skill);
                        }
                    },this,skill);
                    this.checkConflict(skill);
                    if(info){
                        if(info.onremove){
                            if(typeof info.onremove=='function'){
                                info.onremove(this,skill);
                            }
                            else if(typeof info.onremove=='string'){
                                if(info.onremove=='storage'){
                                    delete this.storage[skill];
                                }
                                else{
                                    var cards=this.storage[skill];
                                    if(get.itemtype(cards)=='card'){
                                        cards=[cards];
                                    }
                                    if(get.itemtype(cards)=='cards'){
                                        if(this.onremove=='discard'){
                                            this.$throw(cards);
                                        }
                                        if(this.onremove=='discard'||this.onremove=='lose'){
                                            game.cardsDiscard(cards);
                                            delete this.storage[skill];
                                        }
                                    }
                                }
                            }
                            else if(Array.isArray(info.onremove)){
                                for(var i=0;i<info.onremove.length;i++){
                                    delete this.storage[info.onremove[i]];
                                }
                            }
                            else if(info.onremove===true){
                                delete this.storage[skill];
                            }
                        }
                        this.removeSkillTrigger(skill);
                        if(!info.keepSkill){
                            this.removeAdditionalSkill(skill);
                        }
                    }
                    this.enableSkill(skill+'_awake');
                }
                return skill;
            },
            addTempSkill:function(skill,expire,checkConflict){
                if(this.hasSkill(skill)&&this.tempSkills[skill]==undefined) return;
                this.addSkill(skill,checkConflict,true,true);

                if(!expire){
                    expire=['phaseAfter','phaseBeforeStart'];
                }
                this.tempSkills[skill]=expire;

                if(typeof expire=='string'){
                    lib.hookmap[expire]=true;
                }
                else if(Array.isArray(expire)){
                    for(var i=0;i<expire.length;i++){
                        lib.hookmap[expire[i]]=true;
                    }
                }
                else if(get.objtype(expire)=='object'){
                    var roles=['player','source','target'];
                    for(var i=0;i<roles.length;i++){
                        if(typeof expire[roles[i]]=='string'){
                            lib.hookmap[expire[roles[i]]]=true;
                        }
                        else if(Array.isArray(expire[roles[i]])){
                            for(var j=0;j<expire[roles[i]].length;j++){
                                lib.hookmap[expire[roles[i]][j]]=true;
                            }
                        }
                    }
                    if(expire.global){
                        if(typeof expire.global=='string'){
                            lib.hookmap[expire.global]=true;
                        }
                        else if(Array.isArray(expire.global)){
                            for(var i=0;i<expire.global.length;i++){
                                lib.hookmap[expire.global[i]]=true;
                            }
                        }
                    }
                }

                return skill;
            },
            attitudeTo:function(target){
                if(typeof get.attitude=='function') return get.attitude(this,target);
                return 0;
            },
            clearSkills:function(all){
                var list=[];
                var exclude=[];
                for(var i=0;i<arguments.length;i++){
                    exclude.push(arguments[i]);
                }
                for(i=0;i<this.skills.length;i++){
                    if(lib.skill[this.skills[i]].superCharlotte) continue;
                    if(!all&&(lib.skill[this.skills[i]].temp||lib.skill[this.skills[i]].charlotte)) continue;
                    if(!exclude.contains(this.skills[i])){
                        list.push(this.skills[i]);
                    }
                }
                if(all){
                    for(var i in this.additionalSkills){
                        this.removeAdditionalSkill(i);
                    }
                }
                this.removeSkill(list);
                this.checkConflict();
                this.checkMarks();
                return list;
            },
            checkConflict:function(skill){
                if(skill){
                    if(this.forbiddenSkills[skill]){
                        delete this.forbiddenSkills[skill];
                    }
                    else{
                        for(var i in this.forbiddenSkills){
                            if(this.forbiddenSkills[i].remove(skill)){
                                if(!this.forbiddenSkills[i].length){
                                    delete this.forbiddenSkills[i];
                                }
                            }
                        }
                    }
                }
                else{
                    this.forbiddenSkills={};
                    var forbid=[];
                    var getName=function(arr){
                        var str='';
                        for(var i=0;i<arr.length;i++){
                            str+=arr[i]+'+';
                        }
                        return str.slice(0,str.length-1);
                    }
                    var forbidlist=lib.config.forbid.concat(lib.config.customforbid);
                    var skills=this.getSkills();
                    for(var i=0;i<forbidlist.length;i++){
                        if(lib.config.customforbid.contains(forbidlist[i])||
                            !lib.config.forbidlist.contains(getName(forbidlist[i]))){
                            for(var j=0;j<forbidlist[i].length;j++){
                                if(!skills.contains(forbidlist[i][j])) break;
                            }
                            if(j==forbidlist[i].length){
                                forbid.push(forbidlist[i]);
                            }
                        }
                    }
                    for(var i=0;i<forbid.length;i++){
                        if(forbid[i][1]||this.name2){
                            this.forbiddenSkills[forbid[i][0]]=this.forbiddenSkills[forbid[i][0]]||[];
                            if(forbid[i][1]){
                                this.forbiddenSkills[forbid[i][0]].add(forbid[i][1]);
                            }
                        }
                    }
                }
            },
            getHistory:function(key,filter,last){
                if(!key) return this.actionHistory[this.actionHistory.length-1];
                if(!filter) return this.actionHistory[this.actionHistory.length-1][key];
                else{
                    const history=this.getHistory(key);
                    if(last){
                        const lastIndex=history.indexOf(last);
                        return history.filter((event,index)=>{
                            if(index>lastIndex) return false;
                            return filter(event);
                        })
                    }
                    return history.filter(filter);
                }
            },
            checkHistory:function(key,filter,last){
                if(!key||!filter) return;
                else{
                    const history=this.getHistory(key);
                    if(last){
                        const lastIndex=history.indexOf(last);
                        history.forEach((event,index)=>{
                            if(index>lastIndex) return false;
                            filter(event);
                        })
                    }
                    else{
                        history.forEach(filter);
                    }
                }
            },
            hasHistory:function(key,filter,last){
                const history=this.getHistory(key);
                if(!filter||typeof filter!="function") filter=lib.filter.all;
                if(last){
                    const lastIndex=history.indexOf(last);
                    return history.some((event,index)=>{
                        if(index>lastIndex) return false;
                        return filter(event);
                    })
                }
                return history.some(filter);
            },
            getLastHistory:function(key,filter,last){
                let history=false;
                for(let i=this.actionHistory.length-1;i>=0;i--){
                    if(this.actionHistory[i].isMe){
                        history=this.actionHistory[i];break;
                    }
                }
                if(!history) return null;
                if(!key) return history;
                if(!filter) return history[key];
                else{
                    if(last){
                        const lastIndex=history.indexOf(last);
                        return history.filter((event,index)=>{
                            if(index>lastIndex) return false;
                            return filter(event);
                        })
                    }
                    return history.filter(filter);
                }
            },
            checkAllHistory:function(key,filter,last){
                if(!key||!filter) return;
                this.actionHistory.forEach((value)=>{
                    let history=value[key];
                    if(last&&history.includes(last)){
                        const lastIndex=history.indexOf(last);
                        history.forEach((event,index)=>{
                            if(index>lastIndex) return false;
                            return filter(event);
                        });
                    }
                    else{
                        history.forEach(filter);
                    }
                });
            },
            getAllHistory:function(key,filter,last){
                const history=[];
                this.actionHistory.forEach((value)=>{
                    if(!key||!value[key]){
                        history.push(value);
                    }
                    else{
                        history.push(...value[key]);
                    }
                })
                if(filter){
                    if(last){
                        const lastIndex=history.indexOf(last);
                        return history.filter((event,index)=>{
                            if(index>lastIndex) return false;
                            return filter(event);
                        });
                    }
                    return history.filter(filter);
                }
                return history;
            },
            hasAllHistory:function(key,filter,last){
                return this.actionHistory.some((value)=>{
                    let history=value[key];
                    if(last&&history.includes(last)){
                        const lastIndex=history.indexOf(last);
                        if(history.some(function(event,index){
                            if(index>lastIndex) return false;
                            return filter(event);
                        })) return true;
                    }
                    else{
                        if(history.some(filter)) return true;
                    }
                    return false;
                })
            },
            getLastUsed:function(num){
                if(typeof num!='number') num=0;
                var history=this.getHistory('useCard');
                if(history.length<=num) return null;
                return history[history.length-num-1];
            },
            getStat:function(key){
                if(!key) return this.stat[this.stat.length-1];
                return this.stat[this.stat.length-1][key];
            },
            getLastStat:function(key){
                var stat=false;
                for(var i=this.stat.length-1;i>=0;i--){
                    if(this.stat[i].isMe){
                        stat=this.stat[i];break;
                    }
                }
                if(!stat) return null
                if(!key) return stat;
                return stat[key];
            },
            queue:function(time){
                if(time==false){
                    clearTimeout(this.queueTimeout);
                    this.queueCount=0;
                    return;
                }
                if(time==undefined) time=500;
                var player=this;
                player.queueCount++;
                this.queueTimeout=setTimeout(function(){
                    player.queueCount--;
                    if(player.queueCount==0){
                        player.style.transform='';
                        player.node.avatar.style.transform='';
                        player.node.avatar2.style.transform='';
                        if(game.chess){
                            ui.placeChess(player,player.dataset.position);
                        }
                        if(player==game.me) ui.me.removeAttribute('style');
                    }
                },time)
            },
            getCardUsable:function(card,pure){
                var player=this;
                if(typeof card=='string'){
                    card={name:card};
                }
                card=get.autoViewAs(card);
                var num=get.info(card).usable;
                if(typeof num=='function') num=num(card,player);
                num=game.checkMod(card,player,num,'cardUsable',player);
                if(typeof num!='number') return Infinity;
                if(!pure&&_status.currentPhase==player){
                    return num-player.countUsed(card);
                }
                return num;
            },
            getAttackRange:function(raw){
                const player=this;
                let range=0;
                if(raw){
                    range=game.checkMod(player,player,range,'globalFrom',player);
                    range=game.checkMod(player,player,range,'attackFrom',player);
                    const equips=player.getCards('e',function(card){
                        return !ui.selected.cards||!ui.selected.cards.contains(card);
                    });
                    equips.forEach(card=>{
                        const info=get.info(card,false).distance;
                        if(ininfo&&info.globalFrom){
                            range+=info.globalFrom;
                        }
                    })
                    return (player.getEquipRange()-range);
                }
                let base=game.checkMod(player,'unchanged','attackRangeBase',player);
                if(base!='unchanged'){
                    range=base;
                }
                else{
                    range=player.getEquipRange();
                }
                range=game.checkMod(player,range,'attackRange',player);
                return range;
            },
            getEquipRange:function(cards){
                const player=this;
                if(!cards) cards=player.getCards('e',function(card){
                    return !ui.selected.cards||!ui.selected.cards.contains(card);
                });
                const range=cards.reduce((range,card)=>{
                    let newRange=false;
                    const info=get.info(card,false);
                    if(info.distance){
                        //如果存在attackRange 则通过attackRange动态获取攻击范围
                        if(typeof info.distance.attackRange=='function'){
                            newRange=info.distance.attackRange(card,player);
                        }
                        //否则采用祖宗之法
                        else if(typeof info.distance.attackFrom=='number'){
                            newRange=(1-info.distance.attackFrom);
                        }
                    }
                    let isN1=(typeof range=='number');
                    let isN2=(typeof newRange=='number');
                    if(isN1&&isN2) return Math.max(range,newRange);
                    else return (isN1?range:newRange);
                },false);
                return (typeof range=='number')?range:1;
            },
            getGlobalFrom:function(){
                var player=this;
                var range=0;
                range=game.checkMod(player,player,range,'globalFrom',player);
                var equips=player.getCards('e',function(card){
                    return !ui.selected.cards||!ui.selected.cards.contains(card);
                });
                for(var i=0;i<equips.length;i++){
                    var info=get.info(equips[i]).distance;
                    if(!info) continue;
                    if(info.globalFrom){
                        range+=info.globalFrom;
                    }
                }
                return (-range);
            },
            getGlobalTo:function(){
                var player=this;
                var range=0;
                range=game.checkMod(player,player,range,'globalTo',player);
                var equips=player.getCards('e',function(card){
                    return !ui.selected.cards||!ui.selected.cards.contains(card);
                });
                for(var i=0;i<equips.length;i++){
                    var info=get.info(equips[i]).distance;
                    if(!info) continue;
                    if(info.globalTo){
                        range+=info.globalTo;
                    }
                }
                return (range);
            },
            getHandcardLimit:function(){
                var num=Math.max(this.hp,0);
                num=game.checkMod(this,num,'maxHandcardBase',this);
                num=game.checkMod(this,num,'maxHandcard',this);
                num=game.checkMod(this,num,'maxHandcardFinal',this);
                return Math.max(0,num);
            },
            getEnemies:function(func){
                var player=this;
                var targets;
                var mode=get.mode();
                if(mode=='identity'){
                    if(_status.mode=='purple'){
                        switch(player.identity){
                            case 'bZhu':case 'bZhong':case 'rNei':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['rZhu','rZhong','bNei'].contains(target.identity);
                            });break;
                            case 'rZhu':case 'rZhong':case 'bNei':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['bZhu','bZhong','rNei'].contains(target.identity);
                            });break;
                            case 'rYe':case 'bYe':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return !['rYe','bYe'].contains(target.identity);
                            });break;
                        }
                    }
                    else{
                        var num=get.population('fan');
                        switch(player.identity){
                            case 'zhu':case 'zhong':case 'mingzhong':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                if(num>=3) return target.identity=='fan';
                                return target.identity=='nei'||target.identity=='fan';
                            });break;
                            case 'nei':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                if(num>=3) return target.identity=='fan';
                                if(game.players.length==2) return target!=player;
                                return target.identity=='zhong'||target.identity=='mingzhong'||target.identity=='fan';
                            });break;
                            case 'fan':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return target.identity!='fan';
                            });break;
                        }
                    }
                }
                else if(mode=='guozhan'){
                    if(player.identity=='ye'){
                        targets=game.filterPlayer(function(target){
                            if(func&&!func(target)) return false;
                            return true;
                        });
                    }
                    else{
                        var group=lib.character[player.name1][1];
                        targets=game.filterPlayer(function(target){
                            if(func&&!func(target)) return false;
                            return target.identity=='ye'||lib.character[target.name1][1]!=group;
                        });
                    }
                }
                else if(mode=='doudizhu'){
                    targets=game.filterPlayer(function(target){
                        if(func&&!func(target)) return false;
                        return target.identity!=player.identity;
                    });
                }
                else{
                    targets=game.filterPlayer(function(target){
                        if(func&&!func(target)) return false;
                        return target.side!=player.side;
                    });
                }
                targets.remove(player);
                return targets;
            },
            getFriends:function(func){
                var player=this;
                var targets;
                var mode=get.mode();
                var self=false;
                if(func===true){
                    func=null;
                    self=true;
                }
                if(mode=='identity'){
                    if(_status.mode=='purple'){
                        switch(player.identity){
                            case 'rZhu':case 'rZhong':case 'bNei':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['rZhu','rZhong','bNei'].contains(target.identity);
                            });break;
                            case 'bZhu':case 'bZhong':case 'rNei':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['bZhu','bZhong','rNei'].contains(target.identity);
                            });break;
                            case 'rYe':case 'bYe':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['rYe','bYe'].contains(target.identity);
                            });break;
                        }
                    }
                    else{
                        switch(player.identity){
                            case 'zhu':case 'zhong':case 'mingzhong':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return ['zhu','zhong','mingzhong'].contains(target.identity);
                            });break;
                            case 'nei':targets=[];break;
                            case 'fan':targets=game.filterPlayer(function(target){
                                if(func&&!func(target)) return false;
                                return target.identity=='fan';
                            });break;
                        }
                    }
                }
                else if(mode=='guozhan'){
                    if(player.identity=='ye'){
                        targets=[];
                    }
                    else{
                        var group=lib.character[player.name1][1];
                        targets=game.filterPlayer(function(target){
                            if(func&&!func(target)) return false;
                            return target.identity!='ye'&&lib.character[target.name1][1]==group;
                        });
                    }
                }
                else if(mode=='doudizhu'){
                    targets=game.filterPlayer(function(target){
                        if(func&&!func(target)) return false;
                        return target.identity==player.identity;
                    });
                }
                else{
                    targets=game.filterPlayer(function(target){
                        if(func&&!func(target)) return false;
                        return target.side==player.side;
                    });
                }
                if(self){
                    targets.add(player);
                }
                else{
                    targets.remove(player);
                }
                return targets;
            },
            isEnemyOf:function(){
                return !this.isFriendOf.apply(this,arguments);
            },
            isFriendOf:function(player){
                if(get.mode()=='guozhan'){
                    if(this==player) return true;
                    if(this.getStorage('yexinjia_friend').includes(player)||player.getStorage('yexinjia_friend').includes(this)) return true;
                    if(this.identity=='unknown'||this.identity=='ye') return false;
                    if(player.identity=='unknown'||player.identity=='ye') return false;
                    return this.identity==player.identity;
                }
                if(get.mode()=='doudizhu'){
                    return this.identity==player.identity;
                }
                if(this.side!=undefined&&typeof player.side=='boolean'){
                    return this.side==player.side;
                }
                return this==player;
            },
            isFriendsOf:function(player){
                return player.getFriends(true).contains(this);
            },
            isEnemiesOf:function(player){
                return player.getEnemies().contains(this);
            },
            isAlive:function(){
                return this.classList.contains('dead')==false;
            },
            isDead:function(){
                return this.classList.contains('dead');
            },
            isDying:function(){
                return _status.dying.contains(this)&&this.hp<=0&&this.isAlive();
            },
            isDamaged:function(){
                return this.hp<this.maxHp&&!this.storage.nohp;
            },
            isHealthy:function(){
                return this.hp>=this.maxHp||this.storage.nohp;
            },
            isMaxHp:function(only,raw){
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.getHp(raw)<this.getHp(raw):value.getHp(raw)<=this.getHp(raw);
                });
            },
            isMinHp:function(only,raw){
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.getHp(raw)>this.getHp(raw):value.getHp(raw)>=this.getHp(raw);
                });
            },
            isMaxCard:function(only){
                const numberOfCards=this.countCards('he');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('he')<numberOfCards:value.countCards('he')<=numberOfCards;
                });
            },
            isMinCard:function(only){
                const numberOfCards=this.countCards('he');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('he')>numberOfCards:value.countCards('he')>=numberOfCards;
                });
            },
            isMaxHandcard:function(only){
                const numberOfHandCards=this.countCards('h');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('h')<numberOfHandCards:value.countCards('h')<=numberOfHandCards;
                });
            },
            isMinHandcard:function(only){
                const numberOfHandCards=this.countCards('h');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('h')>numberOfHandCards:value.countCards('h')>=numberOfHandCards;
                });
            },
            isMaxEquip:function(only){
                const numberOfEquipAreaCards=this.countCards('e');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('e')<numberOfEquipAreaCards:value.countCards('e')<=numberOfEquipAreaCards;
                });
            },
            isMinEquip:function(only){
                const numberOfEquipAreaCards=this.countCards('e');
                return game.players.every(value=>{
                    if(value.isOut()||value==this) return true;
                    return only?value.countCards('e')>numberOfEquipAreaCards:value.countCards('e')>=numberOfEquipAreaCards;
                });
            },
            isLinked:function(){
                if(get.is.linked2(this)){
                    return this.classList.contains('linked2');
                }
                return this.classList.contains('linked');
            },
            isTurnedOver:function(){
                return this.classList.contains('turnedover');
            },
            isOut:function(){
                return this.classList.contains('out');
            },
            isMin:function(distance){
                if(distance&&lib.config.mode!='stone') return false;
                if(this.forcemin) return true;
                return this.classList.contains('minskin')&&!game.chess;
            },
            isIn:function(){
                return this.classList.contains('dead')==false&&this.classList.contains('out')==false&&!this.removed;
            },
            isUnseen:function(num){
                switch(num){
                    case 0:return this.classList.contains('unseen');
                    case 1:return this.classList.contains('unseen2');
                    case 2:return this.classList.contains('unseen')||this.classList.contains('unseen2');
                    default:return this.classList.contains('unseen')&&(!this.name2||this.classList.contains('unseen2'));
                }
            },
            isUnderControl:function(self,me){
                me=(me||game.me);
                var that=this._trueMe||this;
                if(that.isMad()||game.notMe) return false;
                if(this===me){
                    if(self) return true;
                    return false;
                }
                if(that===me||this==me._trueMe) return true;
                if(_status.connectMode) return false;
                if(lib.config.mode=='versus'){
                    if(_status.mode=='three') return this.side==me.side;
                    if(_status.mode=='standard') return lib.storage.single_control&&this.side==me.side;
                    if(_status.mode=='four') return get.config('four_phaseswap')&&this.side==me.side;
                    if(_status.mode=='two') return get.config('two_phaseswap')&&this.side==me.side;
                    return false;
                }
                else if(lib.config.mode=='boss'){
                    if(me.side) return false;
                    return this.side==me.side&&get.config('single_control');
                }
                else if(game.chess){
                    if(lib.config.mode=='chess'){
                        if(_status.mode=='combat'&&!get.config('single_control')) return false;
                    }
                    return this.side==me.side;
                }
                return false;
            },
            isOnline:function(){
                if(this.ws&&lib.node&&!this.ws.closed&&this.ws.inited&&!this.isAuto){
                    return true;
                }
                return false;
            },
            isOnline2:function(){
                if(this.ws&&lib.node&&!this.ws.closed){
                    return true;
                }
                return false;
            },
            isOffline:function(){
                if(this.ws&&lib.node&&this.ws.closed){
                    return true;
                }
                return false;
            },
            checkShow:function(skill,showonly){
                var sourceSkill=get.info(skill);
                var noshow=false;
                if(sourceSkill&&sourceSkill.sourceSkill){
                    skill=sourceSkill.sourceSkill;
                }
                if(lib.skill.global.contains(skill)) return false;
                if(get.mode()!='guozhan'||game.expandSkills(this.getSkills()).contains(skill)){
                    if(showonly){
                        return false;
                    }
                    else{
                        noshow=true;
                    }
                }
                var unseen0=this.isUnseen(0);
                var name1=this.name1||this.name;
                if(lib.character[name1]&&(!showonly||unseen0)){
                    var skills=game.expandSkills(lib.character[name1][3].slice(0));
                    if(skills.contains(skill)){
                        if(!noshow&&this.isUnseen(0)) this.showCharacter(0);
                        return 'main';
                    }
                }
                var unseen1=this.isUnseen(1);
                var name2=this.name2;
                if(lib.character[name2]&&(!showonly||unseen1)){
                    var skills=game.expandSkills(lib.character[name2][3].slice(0));
                    if(skills.contains(skill)){
                        if(!noshow&&this.isUnseen(1)) this.showCharacter(1);
                        return 'vice';
                    }
                }
                return false;
            },
            needsToDiscard:function(num){
                if(typeof num!='number') num=0;
                return Math.max(0,num+this.countCards('h',card=>!this.canIgnoreHandcard(card))-this.getHandcardLimit());
            },
            distanceTo:function(target,method){
                return get.distance(this,target,method);
            },
            distanceFrom:function(target,method){
                return get.distance(target,this,method);
            },
            hasSkill:function(skill,arg2,arg3,arg4){
                return game.expandSkills(this.getSkills(arg2,arg3,arg4)).contains(skill);
            },
            hasStockSkill:function(skill,arg1,arg2,arg3){
                return game.expandSkills(this.getStockSkills(arg1,arg2,arg3)).contains(skill);
            },
            isZhu2:function(){
                var player=this,mode=get.mode();
                if(!this.isZhu) return false;
                if(mode=='identity') return true;
                if(mode=='versus'&&(_status.mode=='four'||_status.mode=='guandu')) return true;
                return false;
            },
            hasZhuSkill:function(skill,player){
                if(!this.hasSkill(skill)) return false;
                if(player){
                    var mode=get.mode();
                    if(mode=='identity'&&_status.mode=='purple'){
                        if(this.identity.slice(0,1)!=player.identity.slice(0,1)) return false;
                    }
                    if(mode=='versus'&&(_status.mode=='four'||_status.mode=='guandu')){
                        if(this.side!=player.side) return false;
                    }
                }
                return true;
            },
            hasGlobalTag:function(tag,arg){
                var skills=lib.skill.global.slice(0);
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var info=lib.skill[skills[i]];
                    if(info&&info.ai){
                        if(info.ai.skillTagFilter&&info.ai[tag]&&
                            info.ai.skillTagFilter(this,tag,arg)===false) continue;
                        if(typeof info.ai[tag]=='string'){
                            if(info.ai[tag]==arg) return true;
                        }
                        else if(info.ai[tag]){
                            return true;
                        }
                    }
                }
                return false;
            },
            hasSkillTag:function(tag,hidden,arg,globalskill){
                var skills=this.getSkills(hidden);
                if(globalskill){
                    skills.addArray(lib.skill.global);
                }
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var info=lib.skill[skills[i]];
                    if(info&&info.ai){
                        if(info.ai.skillTagFilter&&info.ai[tag]&&
                            info.ai.skillTagFilter(this,tag,arg)===false) continue;
                        if(typeof info.ai[tag]=='string'){
                            if(info.ai[tag]==arg) return true;
                        }
                        else if(info.ai[tag]){
                            return true;
                        }
                    }
                }
                return false;
            },
            hasJudge:function(name){
                if(name&&typeof name=='object'){
                    name=name.viewAs||name.name;
                }
                var judges=this.getCards('j');
                for(var i=0;i<judges.length;i++){
                    if((judges[i].viewAs||judges[i].name)==name){
                        return true;
                    }
                }
                return false;
            },
            hasFriend:function(){
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].isOut()) continue;
                    if(game.players[i]!=this&&get.attitude(game.players[i],this)>0){
                        return true;
                    }
                }
                return false;
            },
            hasUnknown:function(num){
                var mode=get.mode();
                if(typeof num!='number'){
                    num=0;
                }
                if(mode=='identity'||mode=='guozhan'){
                    for(var i=0;i<game.players.length;i++){
                        if(game.players[i].ai.shown==0&&game.players[i]!=this){
                            num--;
                            if(num<=0){
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
            isUnknown:function(player){
                var mode=get.mode();
                if(mode=='identity'||mode=='guozhan'){
                    if(this.ai.shown==0&&this!=player){
                        return true;
                    }
                }
                return false;
            },
            hasWuxie:function(info){
                if(this.countCards('hs','wuxie')) return true;
                var skills=this.getSkills('invisible').concat(lib.skill.global);
                game.expandSkills(skills);
                for(var i=0;i<skills.length;i++){
                    var ifo=get.info(skills[i]);
                    if(ifo.hiddenWuxie&&info){
                        if(typeof ifo.hiddenWuxie=='function'&&ifo.hiddenWuxie(this,info)){
                            return true;
                        }
                    }
                    else if(ifo.viewAs&&typeof ifo.viewAs!='function'&&ifo.viewAs.name=='wuxie'){
                        if(!ifo.viewAsFilter||ifo.viewAsFilter(this)){
                            return true;
                        }
                    }
                    else{
                        var hiddenCard=ifo.hiddenCard;
                        if(typeof hiddenCard=='function'&&hiddenCard(this,'wuxie')){
                            return true;
                        }
                    }
                }
                return false;
            },
            hasSha:function(respond,noauto){
                if(this.countCards('hs','sha')) return true;
                if(this.countCards('hs','hufu')) return true;
                if(!noauto&&this.countCards('hs','yuchanqian')) return true;
                if(this.hasSkillTag('respondSha',true,respond?'respond':'use',true)) return true;
                return this.hasUsableCard('sha');
            },
            hasShan:function(){
                if(this.countCards('hs','shan')) return true;
                if(this.countCards('hs','hufu')) return true;
                if(this.hasSkillTag('respondShan',true,null,true)) return true;
                return this.hasUsableCard('shan');
            },
            mayHaveSha:function(viewer,type){
                if((this.hp>2||!this.isZhu&&this.hp>1)&&this.hasSkillTag('respondSha',true,type,true)) return true;
                if(get.itemtype(viewer)!=='player') viewer=_status.event.player;
                let cards;
                if(this===viewer||get.itemtype(viewer)==='player'&&viewer.hasSkillTag('viewHandcard',null,this,true)) cards=this.getCards('h');
                else cards=this.getShownCards();
                if(cards.some(card=>{
                    let name=get.name(card,this);
                    if(name=='sha'||name=='hufu'||name=='yuchanqian'){
                        if(type==='use') return lib.filter.cardEnabled(card,this);
                        if(type==='respond') return lib.filter.cardRespondable(card,this);
                        return true;
                    }
                    return false;
                })) return true;
                let hs=this.getCards('hs').removeArray(cards).length;
                if(hs===0) return false;
                return Math.pow(hs+(this.isPhaseUsing()?6:4),2)>100*_status.event.getRand('mayHaveSha');
            },
            mayHaveShan:function(viewer,type){
                if((this.hp>2||!this.isZhu&&this.hp>1)&&this.hasSkillTag('respondShan',true,type,true)) return true;
                if(get.itemtype(viewer)!=='player') viewer=_status.event.player;
                let cards;
                if(this===viewer||get.itemtype(viewer)==='player'&&viewer.hasSkillTag('viewHandcard',null,this,true)) cards=this.getCards('h');
                else cards=this.getShownCards();
                if(cards.some(card=>{
                    let name=get.name(card,this);
                    if(name==='shan'||name==='hufu'){
                        if(type==='use') return lib.filter.cardEnabled(card,this);
                        if(type==='respond') return lib.filter.cardRespondable(card,this);
                        return true;
                    }
                    return false;
                })) return true;
                let hs=this.getCards('hs').removeArray(cards).length;
                if(hs===0) return false;
                return Math.pow(hs+(this.isPhaseUsing()?3:5),2)>100*_status.event.getRand('mayHaveShan');
            },
            hasCard:function(name,position){
                if(typeof name=='function'){
                    var hs=this.getCards(position);
                    for(var i=0;i<hs.length;i++){
                        if(name(hs[i])) return true;
                    }
                }
                else{
                    if(this.countCards(position,name)) return true;
                }
                return false;
            },
            getEquip:function(name){
                var es=this.getCards('e');
                if(typeof name=='object'&&get.info(name)){
                    name=get.info(name).subtype;
                    if(name){
                        name=parseInt(name[5]);
                    }
                }
                else if(typeof name=='string'&&name.startsWith('equip')&&name.length==6){
                    name=parseInt(name[5]);
                }
                if(!name){
                    return null;
                }
                for(var i=0;i<es.length;i++){
                    if(typeof name==='number'){
                        if(get.info(es[i]).subtype==='equip'+name){
                            return es[i];
                        }
                    }
                    else{
                        if(es[i].name===name) return es[i];
                        var source=get.info(es[i]).source;
                        if(Array.isArray(source)&&source.contains(name)){
                            return es[i];
                        }
                    }
                }
                return null;
            },
            getJudge:function(name){
                var judges=this.node.judges.childNodes;
                for(var i=0;i<judges.length;i++){
                    if(judges[i].classList.contains('removing')) continue;
                    if((judges[i].viewAs||judges[i].name)==name){
                        return judges[i];
                    }
                }
                return null;
            },
            $drawAuto:function(cards,target){
                if(this.isUnderControl(true,target)){
                    this.$draw(cards);
                }
                else{
                    this.$draw(cards.length);
                }
            },
            $draw:function(num,init,config){
                if(init!==false&&init!=='nobroadcast'){
                    game.broadcast(function(player,num,init,config){
                        player.$draw(num,init,config)
                    },this,num,init,config);
                }
                var cards,node;
                if(get.itemtype(num)=='cards'){
                    cards=num;
                    num=cards.length;
                }
                else if(get.itemtype(num)=='card'){
                    cards=[num];
                    num=1;
                }
                if(init!==false){
                    if(cards){
                        game.addVideo('drawCard',this,get.cardsInfo(cards));
                    }
                    else{
                        game.addVideo('draw',this,num);
                    }
                }
                if(cards){
                    cards=cards.slice(0);
                    node=cards.shift().copy('thrown','drawingcard');
                }
                else{
                    node=ui.create.div('.card.thrown.drawingcard');
                }
                node.fixed=true;
                node.hide();

                var dx,dy;
                if(game.chess){
                    var rect=this.getBoundingClientRect();

                    if(rect.left<=80){
                        dx=-10;
                        if(rect.top<=80){
                            dy=-10;
                        }
                        else if(rect.top+rect.height+80>=ui.chessContainer.offsetHeight){
                            dy=10;
                        }
                        else{
                            dy=0;
                        }
                    }
                    else if(rect.left+rect.width+80>=ui.chessContainer.offsetWidth){
                        dx=10;
                        if(rect.top<=80){
                            dy=-10;
                        }
                        else if(rect.top+rect.height+80>=ui.chessContainer.offsetHeight){
                            dy=10;
                        }
                        else{
                            dy=0;
                        }
                    }
                    else if(rect.top<=80){
                        dx=0;
                        dy=-10;
                    }
                    else if(rect.top+rect.height+80>=ui.chessContainer.offsetHeight){
                        dx=0;
                        dy=10;
                    }
                    else{
                        dx=rect.left+this.offsetWidth/2-ui.arena.offsetWidth/2;
                        dy=rect.top+this.offsetHeight/2-ui.arena.offsetHeight/2;
                    }

                    var coeff=240/Math.sqrt(dx*dx+dy*dy);
                    dx*=coeff;
                    dy*=coeff;

                    node.style.left=(this.getLeft()+this.offsetWidth/2-52-dx)+'px';
                    node.style.top=(this.getTop()+this.offsetHeight/2-52-dy)+'px';
                    this.parentNode.appendChild(node);
                }
                else{
                    this.parentNode.appendChild(node);
                    node.style.left='calc(50% - 52px)';
                    node.style.top='calc(50% - 52px)';

                    dx=this.getLeft()+this.offsetWidth/2-52-node.offsetLeft;
                    dy=this.getTop()+this.offsetHeight/2-52-node.offsetTop;

                    if(get.is.mobileMe(this)){
                        dx+=get.cardOffset();
                        if(ui.arena.classList.contains('oblongcard')){
                            dy-=16;
                        }
                    }
                }
                node.style.transitionDuration='0.8s';
                ui.refresh(node);
                if(typeof num=='number'&&init!==false){
                    config={
                        total:num,
                        current:1
                    }
                }
                if(config&&config.total>1){
                    var total=config.total,current=config.current;
                    var dxtotal;
                    if(total<=5){
                        dxtotal=Math.min(80,(total-1)*20);
                        dx+=-dxtotal+2*dxtotal*(current-1)/(total-1)
                    }
                    else{
                        var total2=Math.floor(total/2);
                        if(current<=total2){
                            total=total2;
                            dy-=20;
                        }
                        else{
                            current-=total2;
                            total-=total2;
                            dy+=20;
                        }
                        dxtotal=Math.min(80,(total-1)*20);
                        dx+=-dxtotal+2*dxtotal*(current-1)/(total-1)
                    }
                    config.current++;
                }
                if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                    node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                }
                else{
                    node.style.transform='translate('+dx+'px,'+dy+'px)';
                }
                node.show();

                node.listenTransition(function(){
                    node.style.transitionDuration='0.5s';
                    ui.refresh(node);
                    node.delete();
                });
                var that=this;
                if(num&&num>1){
                    if(config&&config.total>1){
                        setTimeout(function(){
                            if(cards){
                                that.$draw(cards,false,config)
                            }
                            else{
                                that.$draw(num-1,false,config)
                            }
                        },50)
                    }
                    else{
                        setTimeout(function(){
                            if(cards){
                                that.$draw(cards,false,config)
                            }
                            else{
                                that.$draw(num-1,false,config)
                            }
                        },200);
                    }
                }
            },
            $compareMultiple:function(card1,targets,cards){
                game.broadcast(function(player,card1,targets,cards){
                    player.$compareMultiple(card1,targets,cards);
                },this,card1,targets,cards);
                game.addVideo('compareMultiple',this,[get.cardInfo(card1),get.targetsInfo(targets),get.cardsInfo(cards)]);
                var player=this;
                var node1=player.$throwxy2(card1,
                    'calc(50% - 52px)','calc(50% + 10px)','perspective(600px) rotateY(180deg)',true
                );
                if(lib.config.cardback_style!='default'){
                    node1.style.transitionProperty='none';
                    ui.refresh(node1);
                    node1.classList.add('infohidden');
                    ui.refresh(node1);
                    node1.style.transitionProperty='';
                }
                else{
                    node1.classList.add('infohidden');
                }

                node1.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
                var onEnd01=function(){
                    //node1.removeEventListener('webkitTransitionEnd',onEnd01);
                    setTimeout(function(){
                        node1.style.transition='all ease-in 0.3s';
                        node1.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
                        var onEnd=function(){
                            node1.classList.remove('infohidden');
                            node1.style.transition='all 0s';
                            ui.refresh(node1);
                            node1.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
                            ui.refresh(node1);
                            node1.style.transition='';
                            ui.refresh(node1);
                            node1.style.transform='';
                            //node1.removeEventListener('webkitTransitionEnd',onEnd);
                        }
                        node1.listenTransition(onEnd);
                    },300);
                };
                node1.listenTransition(onEnd01);

                setTimeout(function(){
                    var left0=-targets.length*52-(targets.length-1)*8;
                    for(var i=0;i<targets.length;i++){
                        (function(target,card2,i){
                            var left=left0+i*120;
                            var node2;
                            if(left<0){
                                node2=target.$throwxy2(card2,
                                    'calc(50% - '+(-left)+'px)','calc(50% - 114px)','perspective(600px) rotateY(180deg)',true
                                );
                            }
                            else{
                                node2=target.$throwxy2(card2,
                                    'calc(50% + '+left+'px)','calc(50% - 114px)','perspective(600px) rotateY(180deg)',true
                                );
                            }
                            if(lib.config.cardback_style!='default'){
                                node2.style.transitionProperty='none';
                                ui.refresh(node2);
                                node2.classList.add('infohidden');
                                ui.refresh(node2);
                                node2.style.transitionProperty='';
                            }
                            else{
                                node2.classList.add('infohidden');
                            }
                            node2.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
                            var onEnd02=function(){
                                //node2.removeEventListener('webkitTransitionEnd',onEnd02);
                                setTimeout(function(){
                                    node2.style.transition='all ease-in 0.3s';
                                    node2.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
                                    var onEnd=function(){
                                        node2.classList.remove('infohidden');
                                        node2.style.transition='all 0s';
                                        ui.refresh(node2);
                                        node2.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
                                        ui.refresh(node2);
                                        node2.style.transition='';
                                        ui.refresh(node2);
                                        node2.style.transform='';
                                        //node2.removeEventListener('webkitTransitionEnd',onEnd);
                                    }
                                    node2.listenTransition(onEnd);
                                },200);
                            };
                            node2.listenTransition(onEnd02);
                        }(targets[i],cards[i],i))
                    }
                },200);
            },
            $compare:function(card1,target,card2){
                game.broadcast(function(player,target,card1,card2){
                    player.$compare(card1,target,card2);
                },this,target,card1,card2);
                game.addVideo('compare',this,[get.cardInfo(card1),target.dataset.position,get.cardInfo(card2)]);
                var player=this;
                var node1=player.$throwxy2(card1,
                    'calc(50% - 114px)','calc(50% - 52px)','perspective(600px) rotateY(180deg)',true
                );
                if(lib.config.cardback_style!='default'){
                    node1.style.transitionProperty='none';
                    ui.refresh(node1);
                    node1.classList.add('infohidden');
                    ui.refresh(node1);
                    node1.style.transitionProperty='';
                }
                else{
                    node1.classList.add('infohidden');
                }

                node1.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
                var onEnd01=function(){
                    //node1.removeEventListener('webkitTransitionEnd',onEnd01);
                    setTimeout(function(){
                        node1.style.transition='all ease-in 0.3s';
                        node1.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
                        var onEnd=function(){
                            node1.classList.remove('infohidden');
                            node1.style.transition='all 0s';
                            ui.refresh(node1);
                            node1.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
                            ui.refresh(node1);
                            node1.style.transition='';
                            ui.refresh(node1);
                            node1.style.transform='';
                            //node1.removeEventListener('webkitTransitionEnd',onEnd);
                        }
                        node1.listenTransition(onEnd);
                    },300);
                };
                node1.listenTransition(onEnd01);
                setTimeout(function(){
                    var node2=target.$throwxy2(card2,
                        'calc(50% + 10px)','calc(50% - 52px)','perspective(600px) rotateY(180deg)',true
                    );
                    if(lib.config.cardback_style!='default'){
                        node2.style.transitionProperty='none';
                        ui.refresh(node2);
                        node2.classList.add('infohidden');
                        ui.refresh(node2);
                        node2.style.transitionProperty='';
                    }
                    else{
                        node2.classList.add('infohidden');
                    }
                    node2.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
                    var onEnd02=function(){
                        //node2.removeEventListener('webkitTransitionEnd',onEnd02);
                        setTimeout(function(){
                            node2.style.transition='all ease-in 0.3s';
                            node2.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
                            var onEnd=function(){
                                node2.classList.remove('infohidden');
                                node2.style.transition='all 0s';
                                ui.refresh(node2);
                                node2.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
                                ui.refresh(node2);
                                node2.style.transition='';
                                ui.refresh(node2);
                                node2.style.transform='';
                                //node2.removeEventListener('webkitTransitionEnd',onEnd);
                            }
                            node2.listenTransition(onEnd);
                        },200);
                    };
                    node2.listenTransition(onEnd02);
                },200);
            },
            $throw:function(card,time,init,nosource){
                if(typeof card=='number'){
                    var tmp=card;
                    card=[];
                    while(tmp--){
                        var cardx=ui.create.card();
                        cardx.classList.add('infohidden');
                        cardx.classList.add('infoflip');
                        card.push(cardx);
                    }
                }
                if(init!==false){
                    if(init!=='nobroadcast'){
                        game.broadcast(function(player,card,time,init,nosource){
                            player.$throw(card,time,init,nosource);
                        },this,card,time,init);
                    }
                    if(get.itemtype(card)!='cards'){
                        if(get.itemtype(card)=='card'){
                            card=[card];
                        }
                        else{
                            return;
                        }
                    }
                    game.addVideo('throw',this,[get.cardsInfo(card),time,nosource]);
                }
                if(game.chess){
                    this.chessFocus();
                }
                if(get.itemtype(card)=='cards'){
                    var node;
                    for(var i=0;i<card.length;i++){
                        node=this.$throw(card[i],time,false,nosource);
                    }
                    return node;
                }
                else{
                    var node;
                    if(card==undefined||card.length==0) return;
                    node=this.$throwordered(card.copy('thrown'),nosource);
                    if(time!=undefined){
                        node.fixed=true;
                        setTimeout(function(){node.delete()},time);
                    }
                    lib.listenEnd(node);
                    return node;
                }
            },
            $throwordered:function(){
                return this.$throwordered2.apply(this,arguments);
                // if(lib.config.low_performance){
                // 	return this.$throwordered2.apply(this,arguments);
                // }
                // else{
                // 	return this.$throwordered1.apply(this,arguments);
                // }
            },
            $throwordered1:function(node,nosource){
                node.classList.add('thrown');
                node.hide();
                node.style.transitionProperty='left,top,opacity,transform';
                for(var i=0;i<ui.thrown.length;i++){
                    if(ui.thrown[i].parentNode!=ui.arena||
                        ui.thrown[i].classList.contains('removing')){
                        ui.thrown.splice(i--,1);
                    }
                }
                ui.thrown.push(node);
                var uithrowns=ui.thrown.slice(0);
                var tops;
                if(game.chess){
                    switch(Math.floor((ui.thrown.length-1)/4)){
                        case 0:
                            tops=['calc(50% - 82px)'];
                            break;
                        case 1:
                            tops=['calc(50% - 139px)','calc(50% - 25px)'];
                            break;
                        case 2:
                            tops=['calc(50% - 196px)','calc(50% - 82px)','calc(50% + 32px)'];
                            break;
                        default:
                            tops=['calc(50% - 253px)','calc(50% - 139px)',
                                'calc(50% - 25px)','calc(50% + 89px)'];
                    }
                }
                else{
                    switch(Math.floor((ui.thrown.length-1)/4)){
                        case 0:
                            tops=['calc(50% - 52px)'];
                            break;
                        case 1:
                            tops=['calc(50% - 109px)','calc(50% + 5px)'];
                            break;
                        case 2:
                            tops=['calc(50% - 166px)','calc(50% - 52px)','calc(50% + 62px)'];
                            break;
                        default:
                            tops=['calc(50% - 223px)','calc(50% - 109px)',
                                'calc(50% + 5px)','calc(50% + 119px)'];
                    }
                }
                while(uithrowns.length){
                    var throwns=uithrowns.splice(0,Math.min(uithrowns.length,4));
                    switch(throwns.length){
                        case 1:
                            throwns[0].style.left='calc(50% - 52px)';
                            break;
                        case 2:
                            throwns[0].style.left='calc(50% - 109px)';
                            throwns[1].style.left='calc(50% + 5px)';
                            break;
                        case 3:
                            throwns[0].style.left='calc(50% - 166px)';
                            throwns[1].style.left='calc(50% - 52px)';
                            throwns[2].style.left='calc(50% + 62px)';
                            break;
                        case 4:
                            throwns[0].style.left='calc(50% - 223px)';
                            throwns[1].style.left='calc(50% - 109px)';
                            throwns[2].style.left='calc(50% + 5px)';
                            throwns[3].style.left='calc(50% + 119px)';
                            break;
                    }
                    var top;
                    if(tops.length){
                        top=tops.shift();
                    }
                    else{
                        if(game.chess){
                            top='calc(50% - 82px)';
                        }
                        else{
                            top='calc(50% - 52px)';
                        }
                    }
                    for(var i=0;i<throwns.length;i++){
                        throwns[i].style.top=top;
                    }
                }
                if(nosource){
                    node.style.transform='scale(0)';
                    node.classList.add('center');
                }
                else{
                    var parseCalc=function(str){
                        var per=str.slice(str.indexOf('calc(')+5,str.indexOf('%'));
                        var add=str.slice(str.indexOf('%')+1,str.indexOf('px')).replace(/\s/g,'');
                        return [parseInt(per),parseInt(add)];
                    }
                    var nx=parseCalc(node.style.left);
                    var ny=parseCalc(node.style.top);
                    nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
                    ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
                    var dx,dy;
                    if(game.chess){
                        var rect=this.getBoundingClientRect();
                        dx=rect.left+this.offsetWidth/2-52-nx;
                        dy=rect.top+this.offsetHeight/2-52-ny;
                    }
                    else{
                        dx=this.getLeft()+this.offsetWidth/2-52-nx;
                        dy=this.getTop()+this.offsetHeight/2-52-ny;
                        if(get.is.mobileMe(this)){
                            dx+=get.cardOffset();
                            if(ui.arena.classList.contains('oblongcard')){
                                dy-=16;
                            }
                        }
                    }
                    if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                        node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                    }
                    else{
                        node.style.transform='translate('+dx+'px,'+dy+'px)';
                    }
                }
                ui.arena.appendChild(node);
                ui.refresh(node);
                node.style.transform='';
                node.show();
                lib.listenEnd(node);
                return node;
            },
            $throwordered2:function(node,nosource){
                node.classList.add('thrown');
                node.classList.add('center');
                node.hide();
                node.style.transitionProperty='left,top,opacity,transform';

                if(nosource){
                    // node.style.transform='scale(0)';
                }
                else{
                    var nx=[50,-52];
                    var ny=[50,-52];
                    nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
                    ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
                    var dx,dy;
                    if(game.chess){
                        var rect=this.getBoundingClientRect();
                        dx=rect.left+this.offsetWidth/2-52-nx;
                        dy=rect.top+this.offsetHeight/2-52-ny;
                    }
                    else{
                        dx=this.getLeft()+this.offsetWidth/2-52-nx;
                        dy=this.getTop()+this.offsetHeight/2-52-ny;
                        if(get.is.mobileMe(this)){
                            dx+=get.cardOffset();
                            if(ui.arena.classList.contains('oblongcard')){
                                dy-=16;
                            }
                        }
                    }
                    if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                        node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                    }
                    else{
                        node.style.transform='translate('+dx+'px,'+dy+'px)';
                    }
                }
                ui.arena.appendChild(node);
                ui.refresh(node);

                for(var i=0;i<ui.thrown.length;i++){
                    if(ui.thrown[i].parentNode!=ui.arena||
                        ui.thrown[i].classList.contains('removing')){
                        ui.thrown.splice(i--,1);
                    }
                }
                ui.thrown.push(node);
                var uithrowns=ui.thrown.slice(0);
                var tops;
                switch(Math.floor((ui.thrown.length-1)/4)){
                    case 0:
                        tops=[0];
                        break;
                    case 1:
                        tops=[-57,57];
                        break;
                    case 2:
                        tops=[-114,0,114];
                        break;
                    default:
                        tops=[-171,-57,57,171];
                }
                while(uithrowns.length){
                    var throwns=uithrowns.splice(0,Math.min(uithrowns.length,4));
                    switch(throwns.length){
                        case 1:
                            throwns[0]._transthrown='translate(0px,';
                            break;
                        case 2:
                            throwns[0]._transthrown='translate(-57px,';
                            throwns[1]._transthrown='translate(57px,';
                            break;
                        case 3:
                            throwns[0]._transthrown='translate(-114px,';
                            throwns[1]._transthrown='translate(0,';
                            throwns[2]._transthrown='translate(114px,';
                            break;
                        case 4:
                            throwns[0]._transthrown='translate(-171px,';
                            throwns[1]._transthrown='translate(-57px,';
                            throwns[2]._transthrown='translate(57px,';
                            throwns[3]._transthrown='translate(171px,';
                            break;
                    }
                    var top;
                    if(tops.length){
                        top=tops.shift();
                    }
                    else{
                        top=0;
                    }
                    if(game.chess){
                        top-=30;
                    }
                    for(var i=0;i<throwns.length;i++){
                        throwns[i].style.transform=throwns[i]._transthrown+top+'px)';
                        delete throwns[i]._transthrown;
                    }
                }

                node.show();
                lib.listenEnd(node);
                return node;
            },
            $throwxy:function(card,left,top){
                var node=card.copy('thrown','thrownhighlight');
                node.dataset.position=this.dataset.position;
                node.hide();
                node.style.transitionProperty='left,top,opacity';

                ui.arena.appendChild(node);
                ui.refresh(node);
                node.show();
                node.style.left=left;
                node.style.top=top;
                lib.listenEnd(node);
                return node;
            },
            $throwxy2:function(card,left,top,trans,flipx,flipy){
                if(game.chess){
                    return this.$throwxy.apply(this,arguments);
                }
                var node=card.copy('thrown','thrownhighlight');
                node.style.left=left;
                node.style.top=top;
                node.hide();
                // node.style.transitionProperty='left,top,opacity,transform';

                var parseCalc=function(str){
                    var per=str.slice(str.indexOf('calc(')+5,str.indexOf('%'));
                    var add=str.slice(str.indexOf('%')+1,str.indexOf('px')).replace(/\s/g,'');
                    return [parseInt(per),parseInt(add)];
                }
                var nx=parseCalc(node.style.left);
                var ny=parseCalc(node.style.top);
                nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
                ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
                var dx=this.getLeft()+this.offsetWidth/2-52-nx;
                var dy=this.getTop()+this.offsetHeight/2-52-ny;
                if(flipx) dx=-dx;
                if(flipy) dy=-dy;
                if(trans){
                    node.style.transform=trans+' translate('+dx+'px,'+dy+'px)';
                }
                else{
                    node.style.transform='translate('+dx+'px,'+dy+'px)';
                }

                ui.arena.appendChild(node);
                ui.refresh(node);
                node.show();
                // node.style.transform=trans||'';
                lib.listenEnd(node);
                return node;
            },
            throwDice:function(num){
                if(typeof num!='number'){
                    num=get.rand(6)+1;
                    _status.event.num=num;
                }
                if(!game.online){
                    game.pause();
                }
                game.broadcastAll(function(num){
                    var diceContainer=ui.create.div('.fullsize.dice-container',ui.window);
                    ui.window.classList.add('dicepaused');
                    var dice=ui.create.div('.dice');
                    var side;

                    side=ui.create.div('.side.front',dice);
                    ui.create.div('.dot.center',side);
                    ui.create.div('.side.front.inner',dice);

                    side=ui.create.div('.side.top',dice);
                    ui.create.div('.dot.dtop.dleft',side);
                    ui.create.div('.dot.dbottom.dright',side);
                    ui.create.div('.side.top.inner',dice);

                    side=ui.create.div('.side.right',dice);
                    ui.create.div('.dot.dtop.dleft',side);
                    ui.create.div('.dot.center',side);
                    ui.create.div('.dot.dbottom.dright',side);
                    ui.create.div('.side.right.inner',dice);

                    side=ui.create.div('.side.left',dice);
                    ui.create.div('.dot.dtop.dleft',side);
                    ui.create.div('.dot.dtop.dright',side);
                    ui.create.div('.dot.dbottom.dleft',side);
                    ui.create.div('.dot.dbottom.dright',side);
                    ui.create.div('.side.left.inner',dice);

                    side=ui.create.div('.side.bottom',dice);
                    ui.create.div('.dot.center',side);
                    ui.create.div('.dot.dtop.dleft',side);
                    ui.create.div('.dot.dtop.dright',side);
                    ui.create.div('.dot.dbottom.dleft',side);
                    ui.create.div('.dot.dbottom.dright',side);
                    ui.create.div('.side.bottom.inner',dice);

                    side=ui.create.div('.side.back',dice);
                    ui.create.div('.dot.dtop.dleft',side);
                    ui.create.div('.dot.dtop.dright',side);
                    ui.create.div('.dot.dbottom.dleft',side);
                    ui.create.div('.dot.dbottom.dright',side);
                    ui.create.div('.dot.center dleft',side);
                    ui.create.div('.dot.center dright',side);
                    ui.create.div('.side.back.inner',dice);

                    ui.create.div('.side.cover.x',dice);
                    ui.create.div('.side.cover.y',dice);
                    ui.create.div('.side.cover.z',dice);

                    var map={
                        1:[75,0,45],
                        2:[-15,45,0],
                        3:[165,-45,90],
                        4:[345,-45,90],
                        5:[345,-45,180],
                        6:[255,0,135]
                    };
                    dice.roll=function(deg){
                        if(typeof deg=='number'){
                            dice.current[0]+=deg;
                            deg=dice.current;
                        }
                        deg=deg.slice(0);
                        dice.current=deg;
                        this.style.transform='rotateX('+deg[0]+'deg) rotateY('+deg[1]+'deg) rotateZ('+deg[2]+'deg)';
                    };
                    dice.roll(map[num]);
                    diceContainer.appendChild(dice);
                    ui.refresh(dice);
                    dice.roll(1025);

                    dice.addEventListener('webkitTransitionEnd',function(){
                        if(!dice.over){
                            dice.style.transition='transform 0.8s ease';
                            dice.roll(-20);
                            dice.over=true;
                        }
                        else if(!dice.resumed){
                            setTimeout(function(){
                                diceContainer.delete();
                                ui.window.classList.remove('dicepaused');
                            },300);
                            if(!game.online){
                                setTimeout(game.resume,800);
                            }
                            dice.resumed=true;
                        }
                    });
                },num);
            },
            $giveAuto:function(card,player){
                if(Array.isArray(card)&&card.length==0) return;
                var args=Array.from(arguments);
                if(_status.connectMode||(!this.isUnderControl(true)&&!player.isUnderControl(true))){
                    if(Array.isArray(card)){
                        card=card.length;
                    }
                    else{
                        card=1;
                    }
                    args[0]=card;
                }
                return this.$give.apply(this,args);
            },
            $give:function(card,player,log,init){
                if(init!==false){
                    game.broadcast(function(source,card,player,init){
                        source.$give(card,player,false,init);
                    },this,card,player,init);
                    if(typeof card=='number'&&card>=0){
                        game.addVideo('give',this,[card,player.dataset.position]);
                    }
                    else{
                        if(get.itemtype(card)=='card'){
                            card=[card];
                        }
                        if(get.itemtype(card)=='cards'){
                            game.addVideo('giveCard',this,[get.cardsInfo(card),player.dataset.position]);
                        }
                    }
                }
                if(get.itemtype(card)=='cards'){
                    if(log!=false&&!_status.video){
                        game.log(player,'从',this,'获得了',card);
                    }
                    if(this.$givemod){
                        this.$givemod(card,player);
                    }
                    else{
                        for(var i=0;i<card.length;i++){
                            this.$give(card[i],player,false,false);
                        }
                    }
                }
                else if(typeof card=='number'&&card>=0){
                    if(log!=false&&!_status.video){
                        game.log(player,'从',this,'获得了'+get.cnNumber(card)+'张牌');
                    }
                    if(this.$givemod){
                        this.$givemod(card,player);
                    }
                    else{
                        while(card--) this.$give('',player,false,false);
                    }
                }
                else{
                    if(log!=false&&!_status.video){
                        if(get.itemtype(card)=='card'&&log!=false){
                            game.log(player,'从',this,'获得了',card);
                        }
                        else{
                            game.log(player,'从',this,'获得了一张牌');
                        }
                    }
                    if(this.$givemod){
                        this.$givemod(card,player);
                    }
                    else{
                        var node;
                        if(get.itemtype(card)=='card'){
                            node=card.copy('card','thrown',false);
                        }
                        else{
                            node=ui.create.div('.card.thrown');
                        }
                        // node.dataset.position=this.dataset.position;
                        node.fixed=true;
                        this.$throwordered(node);
                        // lib.listenEnd(node);
                        // node.hide();
                        // node.style.transitionProperty='left,top,opacity';
                        //
                        // node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
                        //
                        // ui.arena.appendChild(node);
                        // ui.refresh(node);
                        // node.show();
                        // node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
                        // node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

                        node.listenTransition(function(){
                            var dx=player.getLeft()+player.offsetWidth/2-52-node.offsetLeft;
                            var dy=player.getTop()+player.offsetHeight/2-52-node.offsetTop;
                            if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                                node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                            }
                            else{
                                node.style.transform='translate('+dx+'px,'+dy+'px)';
                            }

                            node.delete();
                        });
                        // setTimeout(function(){
                        // 	// node.removeAttribute('style');
                        // 	// node.dataset.position=player.dataset.position;
                        // 	var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
                        // 	var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
                        // 	if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
                        // 		node.style.transform+=' translate('+dx+'px,'+dy+'px)';
                        // 	}
                        // 	else{
                        // 		node.style.transform='translate('+dx+'px,'+dy+'px)';
                        // 	}
                        //
                        // 	node.delete();
                        // },700);
                    }
                }
            },
            $equip:function(card){
                game.broadcast(function(player,card){
                    player.$equip(card);
                },this,card);
                card.fix();
                card.style.transform='';
                card.classList.remove('drawinghidden');
                delete card._transform;
                var player=this;
                var equipNum=get.equipNum(card);
                var equipped=false;
                for(var i=0;i<player.node.equips.childNodes.length;i++){
                    if(get.equipNum(player.node.equips.childNodes[i])>=equipNum){
                        player.node.equips.insertBefore(card,player.node.equips.childNodes[i]);
                        equipped=true;
                        break;
                    }
                }
                if(!equipped){
                    player.node.equips.appendChild(card);
                    if(_status.discarded){
                        _status.discarded.remove(card);
                    }
                }
                var info=get.info(card);
                if(info.skills){
                    for(var i=0;i<info.skills.length;i++){
                        player.addSkillTrigger(info.skills[i]);
                    }
                }
                return player;
            },
            $gain:function(card,log,init){
                if(init!==false){
                    game.broadcast(function(player,card,init){
                        player.$gain(card,false,init);
                    },this,card,init);
                    if(typeof card=='number'&&card>=0){
                        game.addVideo('gain',this,card);
                    }
                    else{
                        if(get.itemtype(card)=='card'){
                            card=[card];
                        }
                        if(get.itemtype(card)=='cards'){
                            game.addVideo('gainCard',this,get.cardsInfo(card));
                        }
                        else{
                            game.addVideo('gain',this,1);
                        }
                    }
                }
                if(get.itemtype(card)=='cards'){
                    if(log!=false&&!_status.video){
                        game.log(this,'获得了',card);
                    }
                    if(this.$gainmod){
                        this.$gainmod(card);
                    }
                    else{
                        for(var i=0;i<card.length;i++){
                            this.$gain(card[i],false,false);
                        }
                    }
                }
                else if(typeof card=='number'&&card>1){
                    if(log!=false&&!_status.video){
                        game.log(this,'获得了'+get.cnNumber(card)+'张牌');
                    }
                    if(this.$gainmod){
                        this.$gainmod(card);
                    }
                    else{
                        for(var i=0;i<card;i++){
                            this.$gain(1,false,false);
                        }
                    }
                }
                else{
                    if(get.itemtype(card)=='card'&&log!=false&&!_status.video){
                        game.log(this,'获得了',card);
                    }
                    if(this.$gainmod){
                        this.$gainmod(card);
                    }
                    else{
                        var node;
                        if(get.itemtype(card)=='card'){
                            // node=this.$throwordered(card.copy(),true);
                            node=card.copy('thrown',false);
                        }
                        else{
                            // node=this.$throwordered(ui.create.div('.card.thrown'),true);
                            node=ui.create.div('.card.thrown');
                            node.moveTo=lib.element.card.moveTo;
                            node.moveDelete=lib.element.card.moveDelete;
                        }
                        node.fixed=true;
                        node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
                        node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
                        node.style.transform='scale(0)';
                        node.hide();
                        ui.arena.appendChild(node);
                        ui.refresh(node);
                        node.show();
                        node.style.transform='';

                        lib.listenEnd(node);
                        var player=this;
                        setTimeout(function(){
                            node.moveDelete(player);
                        },700);
                    }
                }
            },
            $gain2:function(cards,log){
                if(log===true){
                    game.log(this,'获得了',cards);
                }
                game.broadcast(function(player,cards){
                    player.$gain2(cards);
                },this,cards);
                if(get.itemtype(cards)=='card') cards=[cards];
                else if(get.itemtype(cards)!='cards') return;
                var list=[],list2=[];
                for(var i=0;i<cards.length;i++){
                    if(cards[i].clone&&
                        (cards[i].clone.parentNode==this.parentNode||
                        cards[i].clone.parentNode==ui.arena)&&
                        parseFloat(getComputedStyle(cards[i].clone).opacity)>0.3){
                        cards[i].clone.moveDelete(this);
                        list2.push(cards[i].clone);
                    }
                    else{
                        list.push(cards[i]);
                    }
                }
                if(list2.length){
                    game.addVideo('gain2',this,get.cardsInfo(list2));
                }
                if(list.length){
                    this.$draw(list,'nobroadcast');
                    return true;
                }
            },
            $skill:function(name,type,color,avatar){
                if(typeof type!='string') type='legend';
                if(!avatar){
                    this.playerfocus(1500);
                    game.delay(2);
                }
                else{
                    game.addVideo('playerfocus2');
                    game.broadcastAll(function(){
                        ui.arena.classList.add('playerfocus');
                        setTimeout(function(){
                            ui.arena.classList.remove('playerfocus');
                        },1800)
                    });
                    game.delay(3);
                }
                var that=this;
                setTimeout(function(){
                    game.broadcastAll(function(that,type,name,color,avatar){
                        if(lib.config.animation&&!lib.config.low_performance){
                            if(game.chess){
                                that['$'+type+'2'](1200);
                            }
                            else{
                                that['$'+type](1200);
                            }
                        }
                        if(name){
                            that.$fullscreenpop(name,color,avatar);
                        }
                    },that,type,name,color,avatar);
                },avatar?0:300);
            },
            $fire:function(){
                game.addVideo('flame',this,'fire');
                var left,top;
                if(game.chess){
                    var rect=this.getBoundingClientRect();
                    left=rect.left;
                    top=rect.top;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-20,700,'fire');
            },
            $thunder:function(){
                game.addVideo('flame',this,'thunder');
                var left,top;
                if(game.chess){
                    var rect=this.getBoundingClientRect();
                    left=rect.left;
                    top=rect.top;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'thunder');
            },
            $rare2:function(){
                game.addVideo('flame',this,'rare2');
                var rect=this.getBoundingClientRect();
                var left=rect.left;
                var top=rect.top+15;
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'rare');
            },
            $epic2:function(){
                game.addVideo('flame',this,'epic2');
                var rect=this.getBoundingClientRect();
                var left=rect.left;
                var top=rect.top+15;
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'epic');
            },
            $legend2:function(){
                game.addVideo('flame',this,'legend2');
                var rect=this.getBoundingClientRect();
                var left=rect.left;
                var top=rect.top+15;
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'legend');
            },
            $rare:function(time){
                time=time||700;
                game.addVideo('flame',this,'rare');
                var left,top;
                if(game.chess){
                    left=this.getLeft()-ui.arena.offsetLeft;
                    top=this.getTop()-ui.arena.offsetTop;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                if(this.classList.contains('minskin')){
                    top+=15;
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,time,'rare');
            },
            $epic:function(time){
                time=time||700;
                game.addVideo('flame',this,'epic');
                var left,top;
                if(game.chess){
                    left=this.getLeft()-ui.arena.offsetLeft;
                    top=this.getTop()-ui.arena.offsetTop;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                if(this.classList.contains('minskin')){
                    top+=15;
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,time,'epic');
            },
            $legend:function(time){
                time=time||700;
                game.addVideo('flame',this,'legend');
                var left,top;
                if(game.chess){
                    left=this.getLeft()-ui.arena.offsetLeft;
                    top=this.getTop()-ui.arena.offsetTop;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                if(this.classList.contains('minskin')){
                    top+=15;
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,time,'legend');
            },
            $coin:function(){
                game.broadcast(function(player){
                    if(!lib.config.low_performance){
                        player.$coin();
                    }
                },this);
                game.addVideo('flame',this,'coin');
                var left=this.getLeft()-ui.arena.offsetLeft;
                var top=this.getTop()-ui.arena.offsetTop;
                if(this.classList.contains('minskin')){
                    top+=15;
                }
                top-=25;
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'coin');
            },
            $dust:function(){
                game.broadcast(function(player){
                    if(!lib.config.low_performance){
                        player.$dust();
                    }
                },this);
                game.addVideo('flame',this,'dust');
                var left=this.getLeft()-ui.arena.offsetLeft;
                var top=this.getTop()-ui.arena.offsetTop;
                if(this.classList.contains('minskin')){
                    top+=15;
                }
                top-=25;
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'dust');
            },
            $recover:function(){
                game.addVideo('flame',this,'recover');
                var left,top;
                if(game.chess){
                    var rect=this.getBoundingClientRect();
                    left=rect.left;
                    top=rect.top;
                }
                else{
                    left=this.getLeft();
                    top=this.getTop();
                }
                game.animate.flame(left+this.offsetWidth/2,
                    top+this.offsetHeight-30,700,'recover');
            },
            $fullscreenpop:function(str,nature,avatar,broadcast){
                if(broadcast!==false) game.broadcast(function(player,str,nature,avatar){
                    player.$fullscreenpop(str,nature,avatar);
                },this,str,nature,avatar);
                game.addVideo('fullscreenpop',this,[str,nature,avatar]);
                var node=ui.create.div('.damage');
                if(avatar&&this.node){
                    if(avatar=='vice'){
                        if(lib.character[this.name2]){
                            avatar=this.node.avatar2;
                        }
                    }
                    else{
                        if(lib.character[this.name]){
                            avatar=this.node.avatar;
                        }
                    }
                    if(!get.is.div(avatar)){
                        avatar=false;
                    }
                }
                else{
                    avatar=false;
                }
                if(avatar){
                    node.classList.add('fullscreenavatar');
                    ui.create.div('',ui.create.div(node));
                    // ui.create.div('',str.split('').join('<br>'),ui.create.div('.text.textbg',node));
                    ui.create.div('','<div>'+str.split('').join('</div><br><div>')+'</div>',ui.create.div('.text',node));
                    node.firstChild.firstChild.style.backgroundImage=avatar.style.backgroundImage;
                    node.dataset.nature=nature||'unknown';
                    var num=0;
                    var nodes=node.lastChild.firstChild.querySelectorAll('div');
                    var interval=setInterval(function(){
                        if(num<nodes.length){
                            nodes[num].classList.add('flashtext');
                            num++;
                        }
                        else{
                            clearInterval(interval);
                        }
                    },100);
                }
                else{
                    avatar=false;
                    node.innerHTML=str;
                    node.dataset.nature=nature||'soil';
                }
                if(avatar){
                    var rect1=ui.window.getBoundingClientRect();
                    var rect2=this.getBoundingClientRect();
                    var dx=Math.round(2*rect2.left+rect2.width-rect1.width);
                    var dy=Math.round(2*rect2.top+rect2.height-rect1.height);
                    node.style.transform='scale(0.5) translate('+dx+'px,'+dy+'px)';
                }
                ui.window.appendChild(node);
                ui.refresh(node);
                if(avatar){
                    node.style.transform='scale(1)';
                    node.style.opacity=1;
                }
                else{
                    node.classList.add('damageadded');
                }
                setTimeout(function(){
                    node.delete();
                    node.style.transform='scale(1.5)'
                },avatar?1600:1000);
            },
            $damagepop:function(num,nature,font,nobroadcast){
                if(typeof num=='number'||typeof num=='string'){
                    game.addVideo('damagepop',this,[num,nature,font]);
                    if(nobroadcast!==false) game.broadcast(function(player,num,nature,font){
                        player.$damagepop(num,nature,font);
                    },this,num,nature,font);
                    var node=ui.create.div('.damage');
                    if(font){
                        node.classList.add('normal-font');
                    }
                    if(typeof num=='number'&&num>0){
                        if(num==Infinity) num='+∞'
                        else num='+'+num;
                    }
                    else if(num==-Infinity) num='-∞';
                    node.innerHTML=num;
                    this.damagepopups.push(node);
                    node.dataset.nature=nature||'soil';
                    if(this.damagepopups.length==1){
                        this.$damagepop();
                    }
                }
                else if(this.damagepopups.length){
                    var node=this.damagepopups[0];
                    this.appendChild(node);
                    ui.refresh(node);
                    node.classList.add('damageadded');
                    node.listenTransition(function(){
                        setTimeout(function(){
                            node.delete();
                        },200);
                    });
                    // setTimeout(function(){
                    // 	node.delete();
                    // },500);
                    var that=this;
                    setTimeout(function(){
                        that.damagepopups.shift();
                        that.$damagepop();
                    },500);
                }
            },
            $damage:function(source){
                if(get.itemtype(source)=='player'){
                    game.addVideo('damage',this,source.dataset.position);
                }
                else{
                    game.addVideo('damage',this);
                }
                game.broadcast(function(player,source){
                    player.$damage(source);
                },this,source);
                if(source&&source!=this&&lib.config.damage_shake){
                    var left,top;
                    if(source.getTop()==this.getTop()){
                        left=20;
                        top=0;
                    }
                    else{
                        var ratio=(source.getLeft()-this.getLeft())/(source.getTop()-this.getTop());
                        left=Math.abs(20*ratio/Math.sqrt(1+ratio*ratio));
                        top=Math.abs(20/Math.sqrt(1+ratio*ratio));
                    }
                    if(source.getLeft()-this.getLeft()>0) left=-left;
                    if(source.getTop()-this.getTop()>0) top=-top;
                    if(get.is.mobileMe(this)){
                        if(this.classList.contains('linked')){
                            this.node.avatar.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
                            this.node.avatar2.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
                        }
                        else{
                            this.node.avatar.style.transform='translate('+left+'px,'+top+'px)';
                            this.node.avatar2.style.transform='translate('+left+'px,'+top+'px)';
                        }
                    }
                    else if(this.classList.contains('linked')&&get.is.newLayout()){
                        this.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
                    }
                    else if(this._chesstransform){
                        this.style.transform='translate('+(left+this._chesstransform[0])+'px,'+(top+this._chesstransform[1])+'px)';
                    }
                    else{
                        this.style.transform='translate('+left+'px,'+top+'px)';
                    }
                }
                else{
                    var zoom1=0.9,zoom2=0.95;
                    if(arguments[1]=='phase'){
                        zoom1=1.05;
                        zoom2=1.05;
                    }
                    if(get.is.mobileMe(this)){
                        if(this.classList.contains('linked')){
                            this.node.avatar.style.transform='scale('+zoom1+') rotate(-90deg)';
                            this.node.avatar2.style.transform='scale('+zoom1+') rotate(-90deg)';
                        }
                        else{
                            this.node.avatar.style.transform='scale('+zoom1+')';
                            this.node.avatar2.style.transform='scale('+zoom1+')';
                        }
                    }
                    else if(this.classList.contains('linked')&&get.is.newLayout()){
                        this.style.transform='scale('+zoom2+') rotate(-90deg)';
                    }
                    else if(game.chess&&this._chesstransform){
                        this.style.transform='translate('+this._chesstransform[0]+'px,'+this._chesstransform[1]+'px) scale('+zoom2+')';
                    }
                    else{
                        this.style.transform='scale('+zoom2+')';
                    }
                }
                this.queue();
            },
            $die:function(){
                game.addVideo('die',this);
                game.broadcast(function(player){
                    player.$die();
                },this);
                if(lib.config.die_move!='off'){
                    this.$dieflip(lib.config.die_move);
                }
                if(lib.element.player.$dieAfter){
                    lib.element.player.$dieAfter.call(this);
                }
            },
            $dieflip:function(type){
                var top0=ui.window.offsetHeight/2;
                var left0=ui.window.offsetWidth/2;
                var ratio=(left0-this.getLeft())/(top0-this.getTop());
                var left=Math.abs(50*ratio/Math.sqrt(1+ratio*ratio));
                var top=Math.abs(50/Math.sqrt(1+ratio*ratio));
                if(left0-this.getLeft()>0) left=-left;
                if(top0-this.getTop()>0) top=-top;
                if(get.is.mobileMe(this)){
                    left=-Math.random()*5-10;
                    top=Math.random()*5+10;
                }
                if(this._chesstransform){
                    left+=this._chesstransform[0];
                    top+=this._chesstransform[1];
                }
                var transform='translate('+left+'px,'+top+'px) '+
                'rotate('+(Math.random()*20-10)+'deg) ';
                if(type=='flip'){
                    if(game.layout=='long'||game.layout=='long2'){
                        transform+='rotateY(180deg)';
                    }
                    else{
                        transform+=((Math.random()-0.5<0)?'rotateX(180deg)':'rotateY(180deg)');
                    }
                }
                if(get.is.mobileMe(this)){
                    this.node.avatar.style.transform=transform;
                    this.node.avatar2.style.transform=transform;
                    this.style.transform='';
                }
                else{
                    this.node.avatar.style.transform='';
                    this.node.avatar2.style.transform='';
                    this.style.transform=transform;
                }
                this.queue(false);
            },
            $phaseJudge:function(card){
                game.addVideo('phaseJudge',this,get.cardInfo(card));
                var player=this;
                var clone=player.$throw(card);
                if(lib.config.low_performance&&card&&card.clone){
                    var waitingForTransition=get.time();
                    _status.waitingForTransition=waitingForTransition;
                    card.clone.listenTransition(function(){
                        if(_status.waitingForTransition==waitingForTransition&&_status.paused){
                            game.resume();
                        }
                    });
                    game.pause();
                }
                else{
                    game.delay();
                }
            }
        },
        card:{
            hasNature:function(nature,player){
                return game.hasNature(this,nature,player);
            },
            //只针对【杀】起效果
            addNature:function(nature){
                let natures=[];
                if(!this.nature) this.nature='';
                else{
                    natures.addArray(get.natureList(this.nature));
                }
                natures.addArray(get.natureList(nature));
                this.nature=get.nature(natures);
                this.classList.add(nature);
                let str=get.translation(this.nature)+'杀';
                this.node.name.innerText=str;
                let name=get.name(this,false);
                do{
                    if(name=='sha'){
                        let _bg;
                        for(const n of natures) if(lib.natureBg.has(n)) _bg=n;
                        if(_bg){
                            this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
                            break;
                        }
                    }
                    this.node.image.setBackgroundImage('image/card/'+name+'.png');
                }
                while(0);
                return this.nature;
            },
            removeNature:function(nature){
                if(!this.nature) return;
                let natures=get.natureList(this.nature);
                natures.remove(nature);
                if(!natures.length) delete this.nature;
                else this.nature=get.nature(natures);
                this.classList.remove(nature);
                let str=get.translation(this.nature)+'杀';
                this.node.name.innerText=str;
                let name=get.name(this,false);
                do{
                    if(name=='sha'){
                        let _bg;
                        for(const n of natures) if(lib.natureBg.has(n)) _bg=n;
                        if(_bg){
                            this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
                            break;
                        }
                    }
                    this.node.image.setBackgroundImage('image/card/'+name+'.png');
                }
                while(0);
                return this.nature;
            },
            addGaintag:function(gaintag){
                if(Array.isArray(gaintag)) this.gaintag=gaintag.slice(0);
                else this.gaintag.add(gaintag);
                var str='';
                for(var gi=0;gi<this.gaintag.length;gi++){
                    var translate=get.translation(this.gaintag[gi]);
                    if(translate!='invisible'){
                        str+=translate;
                        if(gi<this.gaintag.length-1) str+=' ';
                    }
                }
                this.node.gaintag.innerHTML=str;
            },
            removeGaintag:function(tag){
                if(tag===true){
                    if(this.gaintag&&this.gaintag.length||this.node.gaintag.innerHTML.length) this.addGaintag([]);
                }
                else if(this.hasGaintag(tag)){
                    this.gaintag.remove(tag);
                    this.addGaintag(this.gaintag);
                }
            },
            hasGaintag:function(tag){
                return this.gaintag&&this.gaintag.contains(tag);
            },
            init:function(card){
                if(Array.isArray(card)){
                    if(card[2]=='huosha'){
                        card[2]='sha';
                        card[3]='fire';
                    }
                    else if(card[2]=='leisha'){
                        card[2]='sha';
                        card[3]='thunder';
                    }
                    // else if(card[2]=='kamisha'){
                    // 	card[2]='sha';
                    // 	card[3]='kami';
                    // }
                    // else if(card[2]=='icesha'){
                    // 	card[2]='sha';
                    // 	card[3]='ice';
                    // }
                    else if(card[2]=='cisha'){
                        card[2]='sha';
                        card[3]='stab';
                    }
                    else if(card[2].length>3){
                        let prefix=card[2].slice(0,card[2].lastIndexOf('sha'));
                        if(lib.nature.has(prefix)){
                            if(prefix.length+3==card[2].length){
                                card[2]='sha';
                                card[3]=prefix;
                            }
                        }
                        if(card[2].startsWith('sha_')){
                            let suffix=card[2].slice(4);
                            let natureList=suffix.split('_');
                            card[2]='sha';
                            card[3]=get.nature(natureList);
                        }
                    }
                }
                else if(typeof card=='object'){
                    card=[card.suit,card.number,card.name,card.nature];
                }
                var cardnum=card[1]||'';
                if(parseInt(cardnum)==cardnum) cardnum=parseInt(cardnum);
                if(cardnum>0&&cardnum<14){
                    cardnum=['A','2','3','4','5','6','7','8','9','10','J','Q','K'][cardnum-1];
                }
                if(!lib.card[card[2]]){
                    lib.card[card[2]]={};
                }
                var info=lib.card[card[2]];
                if(info.global&&!this.classList.contains('button')){
                    if(Array.isArray(info.global)){
                        while(info.global.length){
                            game.addGlobalSkill(info.global.shift());
                        }
                    }
                    else if(typeof info.global=='string'){
                        game.addGlobalSkill(info.global);
                    }
                    delete info.global;
                }
                if(this.name){
                    this.classList.remove('epic');
                    this.classList.remove('legend');
                    this.classList.remove('gold');
                    this.classList.remove('unique');
                    this.style.background='';
                    var subtype=get.subtype(this,false);
                    if(subtype){
                        this.classList.remove(subtype);
                    }
                }
                if(info.epic){
                    this.classList.add('epic');
                }
                else if(info.legend){
                    this.classList.add('legend');
                }
                else if(info.gold){
                    this.classList.add('gold');
                }
                else if(info.unique){
                    this.classList.add('unique');
                }
                var bg=card[2];
                if(info.cardimage){
                    bg=info.cardimage;
                }
                var img=lib.card[bg].image;
                if(img){
                    if(img.startsWith('db:')){
                        img=img.slice(3);
                    }
                    else if(!img.startsWith('ext:')){
                        img=null;
                    }
                }
                this.classList.remove('fullskin');
                this.classList.remove('fullimage');
                this.classList.remove('fullborder');
                this.dataset.cardName=card[2];
                this.dataset.cardType=info.type||'';
                this.dataset.cardSubype=info.subtype||'';
                this.dataset.cardMultitarget=info.multitarget?'1':'0';
                this.node.name.dataset.nature='';
                this.node.info.classList.remove('red');
                if(!lib.config.hide_card_image&&lib.card[bg].fullskin){
                    this.classList.add('fullskin');
                    if(img){
                        if(img.startsWith('ext:')){
                            this.node.image.setBackgroundImage(img.replace(/^ext:/,'extension/'));
                        }
                        else{
                            this.node.image.setBackgroundDB(img);
                        }
                    }
                    else{
                        if(lib.card[bg].modeimage){
                            this.node.image.setBackgroundImage('image/mode/'+lib.card[bg].modeimage+'/card/'+bg+'.png');
                        }
                        else{
                            do{
                                let nature=card[3];
                                if(bg=='sha'&&typeof nature=='string'){
                                    let natures=get.natureList(nature),_bg;
                                    for(const n of natures) if(lib.natureBg.has(n)) _bg=n;
                                    if(_bg){
                                        this.node.image.setBackgroundImage(lib.natureBg.get(_bg));
                                        break;
                                    }
                                }
                                this.node.image.setBackgroundImage('image/card/'+bg+'.png');
                            }
                            while(0);
                        }
                    }
                }
                else if(lib.card[bg].image=='background'){
                    if(card[3]) this.node.background.setBackground(bg+'_'+get.natureList(card[3])[0],'card');
                    else this.node.background.setBackground(bg,'card');
                }
                else if(lib.card[bg].fullimage){
                    this.classList.add('fullimage');
                    if(img){
                        if(img.startsWith('ext:')){
                            this.setBackgroundImage(img.replace(/^ext:/,'extension/'));
                            this.style.backgroundSize='cover';
                        }
                        else{
                            this.setBackgroundDB(img);
                        }
                    }
                    else if(lib.card[bg].image){
                        if(lib.card[bg].image.startsWith('character:')){
                            this.setBackground(lib.card[bg].image.slice(10),'character');
                        }
                        else{
                            this.setBackground(lib.card[bg].image);
                        }
                    }
                    else{
                        var cardPack=lib.cardPack['mode_'+get.mode()];
                        if(Array.isArray(cardPack)&&cardPack.contains(bg)){
                            this.setBackground('mode/'+get.mode()+'/card/'+bg);
                        }
                        else{
                            this.setBackground('card/'+bg);
                        }
                    }
                }
                else if(lib.card[bg].fullborder){
                    this.classList.add('fullborder');
                    if(lib.card[bg].fullborder=='gold'){
                        this.node.name.dataset.nature='metalmm';
                    }
                    else if(lib.card[bg].fullborder=='silver'){
                        this.node.name.dataset.nature='watermm';
                    }
                    if(!this.node.avatar){
                        this.node.avatar=ui.create.div('.cardavatar');
                        this.insertBefore(this.node.avatar,this.firstChild);
                    }
                    if(!this.node.framebg){
                        this.node.framebg=ui.create.div('.cardframebg');
                        this.node.framebg.dataset.auto=lib.card[bg].fullborder;
                        this.insertBefore(this.node.framebg,this.firstChild);
                    }
                    if(img){
                        if(img.startsWith('ext:')){
                            this.node.avatar.setBackgroundImage(img.replace(/^ext:/,'extension/'));
                            this.node.avatar.style.backgroundSize='cover';
                        }
                        else{
                            this.node.avatar.setBackgroundDB(img);
                        }
                    }
                    else if(lib.card[bg].image){
                        if(lib.card[bg].image.startsWith('character:')){
                            this.node.avatar.setBackground(lib.card[bg].image.slice(10),'character');
                        }
                        else{
                            this.node.avatar.setBackground(lib.card[bg].image);
                        }
                    }
                    else{
                        var cardPack=lib.cardPack['mode_'+get.mode()];
                        if(Array.isArray(cardPack)&&cardPack.contains(bg)){
                            this.node.avatar.setBackground('mode/'+get.mode()+'/card/'+bg);
                        }
                        else{
                            this.node.avatar.setBackground('card/'+bg);
                        }
                    }
                }
                else if(lib.card[bg].image=='card'){
                    if(card[3]) this.setBackground(bg+'_'+get.natureList(card[3])[0],'card');
                    else this.setBackground(bg,'card');
                }
                else if(typeof lib.card[bg].image=='string'&&!lib.card[bg].fullskin){
                    if(img){
                        if(img.startsWith('ext:')){
                            this.setBackgroundImage(img.replace(/^ext:/,'extension/'));
                            this.style.backgroundSize='cover';
                        }
                        else{
                            this.setBackgroundDB(img);
                        }
                    }
                    else{
                        this.setBackground(lib.card[bg].image);
                    }
                }
                else{
                    this.node.background.innerHTML=lib.translate[bg+'_cbg']||lib.translate[bg+'_bg']||get.translation(bg)[0];
                    // this.node.background.style.fontFamily=lib.config.card_font;
                    if(this.node.background.innerHTML.length>1) this.node.background.classList.add('tight');
                    else this.node.background.classList.remove('tight');
                }
                if(!lib.card[bg].fullborder&&this.node.avatar&&this.node.framebg){
                    this.node.avatar.remove();
                    this.node.framebg.remove();
                    delete this.node.avatar;
                    delete this.node.framebg;
                }
                if(info.noname&&!this.classList.contains('button')){
                    this.node.name.style.display='none';
                }
                if(info.color){
                    this.style.color=info.color;
                }
                if(info.textShadow){
                    this.style.textShadow=info.textShadow;
                }
                if(info.opacity){
                    this.node.info.style.opacity=info.opacity;
                    this.node.name.style.opacity=info.opacity;
                }
                if(info.modinfo){
                    this.node.info.innerHTML=info.modinfo;
                }
                else{
                    this.node.info.innerHTML=get.translation(card[0])+'<span style="font-family:xinwei"> </span><span style="font-family:xinwei">'+cardnum+'</span>';
                }
                if(info.addinfo){
                    if(!this.node.addinfo){
                        this.node.addinfo=ui.create.div('.range',this);
                    }
                    this.node.addinfo.innerHTML=info.addinfo;
                }
                else if(this.node.addinfo){
                    this.node.addinfo.remove();
                    delete this.node.addinfo;
                }
                if(card[0]=='heart'||card[0]=='diamond'){
                    this.node.info.classList.add('red');
                }
                this.node.image.className='image';
                var name=get.translation(card[2]);
                if(card[2]=='sha'){
                    name='';
                    let nature=card[3];
                    if(nature){
                        let natures=get.natureList(nature);
                        natures.sort(lib.sort.nature);
                        for(let nature of natures){
                            name+=lib.translate['nature_'+nature]||lib.translate[nature]||'';
                            if(nature!='stab') this.node.image.classList.add(nature);
                        }
                    }
                    name+='杀';
                }
                this.node.name.innerHTML=name;
                if(name.length>=5){
                    this.node.name.classList.add('long');
                    if(name.length>=7){
                        this.node.name.classList.add('longlong');
                    }
                }
                this.node.name2.innerHTML=get.translation(card[0])+cardnum+' '+name;
                this.suit=card[0];
                this.number=parseInt(card[1])||0;
                this.name=card[2];
                this.classList.add('card');
                if(card[3]){
                    let natures=get.natureList(card[3]);
                    natures.forEach(n=>{if(n) this.classList.add(n)});
                    this.nature=natures.filter(n=>lib.nature.has(n)).sort(lib.sort.nature).join(lib.natureSeparator);
                }
                else if(this.nature){
                    this.classList.remove(this.nature);
                    delete this.nature;
                }
                if(info.subtype) this.classList.add(info.subtype);
                if(this.inits){
                    for(var i=0;i<lib.element.card.inits.length;i++){
                        lib.element.card.inits[i](this);
                    }
                }
                if(typeof info.init=='function') info.init();
                this.node.range.innerHTML='';
                switch(get.subtype(this,false)){
                    case 'equip1':
                        var added=false;
                        if(lib.card[this.name]&&lib.card[this.name].distance){
                            var dist=lib.card[this.name].distance;
                            if(dist.attackFrom){
                                added=true;
                                this.node.range.innerHTML='范围: '+(-dist.attackFrom+1);
                            }
                        }
                        if(!added){
                            this.node.range.innerHTML='范围: 1';
                        }
                        break;
                    case 'equip3':
                    if(info.distance&&info.distance.globalTo){
                        this.node.range.innerHTML='防御: '+info.distance.globalTo;
                        this.node.name2.innerHTML+='+';
                    }
                    break;
                    case 'equip4':
                    if(info.distance&&info.distance.globalFrom){
                        this.node.range.innerHTML='进攻: '+(-info.distance.globalFrom);
                        this.node.name2.innerHTML+='-';
                    }
                    break;
                }
                if(_status.connectMode&&!game.online&&lib.cardOL&&!this.cardid){
                    this.cardid=get.id();
                    lib.cardOL[this.cardid]=this;
                }
                if(!_status.connectMode&&!_status.video){
                    this.cardid=get.id();
                }
                var tags=[];
                if(Array.isArray(card[4])){
                    tags.addArray(card[4]);
                }
                if(this.cardid){
                    if(!_status.cardtag){
                        _status.cardtag={};
                    }
                    for(var i in _status.cardtag){
                        if(_status.cardtag[i].contains(this.cardid)){
                            tags.add(i);
                        }
                    }
                    if(tags.length){
                        var tagstr=' <span class="cardtag">';
                        for(var i=0;i<tags.length;i++){
                            var tag=tags[i];
                            if(!_status.cardtag[tag]){
                                _status.cardtag[tag]=[];
                            }
                            _status.cardtag[tag].add(this.cardid);
                            tagstr+=lib.translate[tag+'_tag'];
                            //if(i<tags.length-1) tagstr+=' ';
                        }
                        tagstr+='</span>';
                        this.node.range.innerHTML+=tagstr;
                    }
                }
                return this;
            },
            updateTransform:function(bool,delay){
                if(delay){
                    var that=this;
                    setTimeout(function(){
                        that.updateTransform(that.classList.contains('selected'));
                    },delay);
                }
                else{
                    if(_status.event.player!=game.me) return;
                    if(this._transform&&this.parentNode&&this.parentNode.parentNode&&
                        this.parentNode.parentNode.parentNode==ui.me&&
                        (!_status.mousedown||_status.mouseleft)&&
                        (!this.parentNode.parentNode.classList.contains('scrollh')||(game.layout=='long2'||game.layout=='nova'))){
                        if(bool){
                            this.style.transform=this._transform+' translateY(-20px)';
                        }
                        else{
                            this.style.transform=this._transform||'';
                        }
                    }
                }
            },
            aiexclude:function(){
                _status.event._aiexclude.add(this);
            },
            getSource:function(name){
                if(this.name==name) return true;
                var info=lib.card[this.name];
                if(info&&Array.isArray(info.source)){
                    return info.source.contains(name);
                }
                return false;
            },
            moveDelete:function(player){
                this.fixed=true;
                if(!this._listeningEnd||this._transitionEnded){
                    this.moveTo(player);
                    var that=this;
                    setTimeout(function(){
                        that.delete();
                    },200);
                }
                else{
                    this._onEndMoveDelete=player;
                }
            },
            moveTo:function(player){
                this.fixed=true;
                var dx,dy;
                if(this.classList.contains('center')){
                    var nx=[50,-52];
                    var ny=[50,-52];
                    nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
                    ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
                    dx=player.getLeft()+player.offsetWidth/2-52-nx;
                    dy=player.getTop()+player.offsetHeight/2-52-ny;
                }
                else{
                    this.style.left=this.offsetLeft+'px';
                    this.style.top=this.offsetTop+'px';

                    dx=player.getLeft()+player.offsetWidth/2-52-this.offsetLeft;
                    dy=player.getTop()+player.offsetHeight/2-52-this.offsetTop;
                }
                if(get.is.mobileMe(player)){
                    dx+=get.cardOffset();
                    if(ui.arena.classList.contains('oblongcard')){
                        dy-=16;
                    }
                }


                if(this.style.transform&&this.style.transform!='none'&&this.style.transform.indexOf('translate')==-1){
                    this.style.transform+=' translate('+dx+'px,'+dy+'px)';
                }
                else{
                    this.style.transform='translate('+dx+'px,'+dy+'px)';
                }
                return this;
            },
            copy:function(){
                var node=this.cloneNode(true);
                node.style.transform='';
                node.name=this.name;
                node.suit=this.suit;
                node.number=this.number;
                node.classList.remove('hidden');
                node.classList.remove('start');
                node.classList.remove('thrown');
                node.classList.remove('selectable');
                node.classList.remove('selected');
                node.classList.remove('removing');
                node.classList.remove('drawinghidden');
                node.classList.remove('glows');
                node.node={
                    name:node.querySelector('.name'),
                    info:node.querySelector('.info'),
                    intro:node.querySelector('.intro'),
                    background:node.querySelector('.background'),
                    image:node.querySelector('.image'),
                    gaintag:node.querySelector('.gaintag'),
                }
                node.node.gaintag.innerHTML='';
                var clone=true;
                var position;
                for(var i=0;i<arguments.length;i++){
                    if(typeof arguments[i]=='string') node.classList.add(arguments[i]);
                    else if(get.objtype(arguments[i])=='div') position=arguments[i];
                    else if(typeof arguments[i]=='boolean') clone=arguments[i];
                }
                node.moveTo=lib.element.card.moveTo;
                node.moveDelete=lib.element.card.moveDelete;
                if(clone) this.clone=node;
                if(position) position.appendChild(node);
                return node;
            },
            uncheck:function(skill){
                if(skill) this._uncheck.add(skill);
                this.classList.add('uncheck');
            },
            recheck:function(skill){
                if(skill) this._uncheck.remove(skill);
                else this._uncheck.length=0;
                if(this._uncheck.length==0) this.classList.remove('uncheck');
            },
            discard:function(bool){
                if(!this.destroyed){
                    ui.discardPile.appendChild(this);
                }
                this.fix();
                this.classList.remove('glow');
                if(bool===false){
                    ui.cardPile.insertBefore(this,ui.cardPile.childNodes[Math.floor(Math.random()*ui.cardPile.childNodes.length)]);
                }
                else{
                    if(_status.discarded){
                        _status.discarded.add(this);
                    }
                }
            },
            hasTag:function(tag){
                if(this.cardid&&_status.cardtag&&_status.cardtag[tag]&&_status.cardtag[tag].contains(this.cardid)){
                    return true;
                }
                return false;
            },
            hasPosition:function(){
                return ['h','e','j','s','x'].contains(get.position(this));
            },
            isInPile:function(){
                return ['c','d'].contains(get.position(this));
            }
        },
        button:{
            exclude:function(){
                if(_status.event.excludeButton==undefined){
                    _status.event.excludeButton=[];
                }
                _status.event.excludeButton.add(this);
            }
        },
        event:{
            changeToZero:function(){
                this.num=0;
                this.numFixed=true;
            },
            finish:function(){
                this.finished=true;
            },
            putStepCache:function(key,value){
                if(!this._stepCache){
                    this._stepCache = {};
                }
                this._stepCache[key] = value;
            },
            getStepCache:function(key){
                if(!this._stepCache)return undefined;
                return this._stepCache[key];
            },
            clearStepCache:function(key){
                if(key !==  undefined && key !== null){
                    delete this._stepCache[key];
                }
                delete this._stepCache;
            },
            callFuncUseStepCache:function(prefix,func,params){
                if(typeof func != 'function')return;
                if(_status.closeStepCache)return func.apply(null,params);
                var cacheKey = "["+prefix+"]"+get.paramToCacheKey.apply(null,params);
                var ret = this.getStepCache(cacheKey);
                if(ret === undefined || ret === null){
                    ret = func.apply(null,params);
                    this.putStepCache(cacheKey,ret);
                }
                return ret;
            },
            putTempCache:function(key1,key2,value){
                if(!this._tempCache){
                    this._tempCache = {};
                }
                if(!this._tempCache[key1]){
                    this._tempCache[key1] = {};
                }
                this._tempCache[key1][key2] = value;
                return value;
            },
            getTempCache:function(key1,key2){
                if(!this._tempCache){
                    return undefined;
                }
                if(!this._tempCache[key1]){
                    return undefined;
                }
                return this._tempCache[key1][key2];
            },
            cancel:function(arg1,arg2,notrigger){
                this.untrigger(arg1,arg2);
                this.finish();
                if(notrigger!='notrigger'){
                    this.trigger(this.name+'Cancelled');
                    if(this.player&&lib.phaseName.contains(this.name)) this.player.getHistory('skipped').add(this.name)}
            },
            neutralize:function(event){
                this.untrigger();
                this.finish();
                this._neutralized=true;
                this.trigger('eventNeutralized');
                this._neutralize_event=event||_status.event;
            },
            unneutralize:function(){
                this.untrigger();
                delete this._neutralized;
                delete this.finished;
                if(this.type=='card'&&this.card&&this.name=='sha') this.directHit=true;
            },
            goto:function(step){
                this.step=step-1;
            },
            redo:function(){
                this.step--;
            },
            setHiddenSkill:function(skill){
                if(!this.player) return this;
                var hidden=this.player.hiddenSkills.slice(0);
                game.expandSkills(hidden);
                if(hidden.contains(skill)) this.set('hsskill',skill);
                return this;
            },
            set:function(key,value){
                if(arguments.length==1&&Array.isArray(arguments[0])){
                    for(var i=0;i<arguments[0].length;i++){
                        if(Array.isArray(arguments[0][i])){
                            this.set(arguments[0][i][0],arguments[0][i][1]);
                        }
                    }
                }
                else{
                    if(typeof key!='string'){
                        console.log('warning: using non-string object as event key');
                        console.log(key,value);
                        console.log(_status.event);
                    }
                    this[key]=value;
                    this._set.push([key,value]);
                }
                return this;
            },
            setContent:function(item){
                switch(typeof item){
                    case "object":
                    case "function":
                        this.content=lib.init.parsex(item);
                        break;
                    default:
                        try{
                            if(!lib.element.content[item]._parsed){
                                lib.element.content[item]=lib.init.parsex(lib.element.content[item]);
                                lib.element.content[item]._parsed=true;
                            }
                        }
                        catch(_){
                            throw new Error(`Content ${item} may not exist.\nlib.element.content[${item}] = ${lib.element.content[item]}`);
                        }
                        this.content=lib.element.content[item];
                        break;
                }
                return this;
            },
            getLogv:function(){
                for(var i=1;i<=3;i++){
                    var event=this.getParent(i);
                    if(event&&event.logvid) return event.logvid;
                }
                return null;
            },
            send:function(){
                this.player.send(function(name,args,set,event,skills){
                    game.me.applySkills(skills);
                    var next=game.me[name].apply(game.me,args);
                    for(var i=0;i<set.length;i++){
                        next.set(set[i][0],set[i][1]);
                    }
                    if(next._backupevent){
                        next.backup(next._backupevent);
                    }
                    next._modparent=event;
                    game.resume();
                },this.name,this._args||[],this._set,
                get.stringifiedResult(this.parent),get.skillState(this.player));
                this.player.wait();
                game.pause();
            },
            resume:function(){
                delete this._cardChoice;
                delete this._targetChoice;
                delete this._skillChoice;
            },
            getParent:function(level,forced){
                var parent,historys=[];
                if(this._modparent&&game.online){
                    parent=this._modparent;
                }
                else{
                    parent=this.parent;
                }
                var toreturn={};
                if(typeof level=='string'&&forced==true){
                    toreturn=null;
                }
                if(!parent) return toreturn;
                if(typeof level=='number'){
                    for(var i=1;i<level;i++){
                        if(!parent) return toreturn;
                        parent=parent.parent;
                    }
                }
                else if(typeof level=='string'){
                    while(true){
                        if(!parent) return toreturn;
                        historys.push(parent);
                        if(parent.name==level) return parent;
                        parent=parent.parent;
                        if(historys.contains(parent)) return toreturn;
                    }
                    if(!parent) return toreturn;
                }
                if(toreturn===null){
                    return null;
                }
                return parent;
            },
            getTrigger:function(){
                return this.getParent()._trigger;
            },
            getRand:function(name){
                if(name){
                    if(!this._rand_map) this._rand_map={};
                    if(!this._rand_map[name]) this._rand_map[name]=Math.random();
                    return this._rand_map[name];
                }
                if(!this._rand) this._rand=Math.random();
                return this._rand;
            },
            insert:function(func,map){
                var next=game.createEvent(this.name+'Inserted',false,this);
                next.setContent(func);
                for(var i in map){
                    next.set(i,map[i]);
                }
                return next;
            },
            insertAfter:function(func,map){
                var next=game.createEvent(this.name+'Inserted',false,{next:[]});
                this.after.push(next);
                next.setContent(func);
                for(var i in map){
                    next.set(i,map[i]);
                }
                return next;
            },
            backup:function(skill){
                this._backup={
                    filterButton:this.filterButton,
                    selectButton:this.selectButton,
                    filterTarget:this.filterTarget,
                    selectTarget:this.selectTarget,
                    filterCard:this.filterCard,
                    selectCard:this.selectCard,
                    position:this.position,
                    forced:this.forced,
                    fakeforce:this.fakeforce,
                    _aiexclude:this._aiexclude,
                    complexSelect:this.complexSelect,
                    complexCard:this.complexCard,
                    complexTarget:this.complexTarget,
                    _cardChoice:this._cardChoice,
                    _targetChoice:this._targetChoice,
                    _skillChoice:this._skillChoice,
                    ai1:this.ai1,
                    ai2:this.ai2,
                    filterOk:this.filterOk,
                }
                if(skill){
                    var info=get.info(skill);
                    this.skill=skill;
                    this._aiexclude=[];
                    if(typeof info.viewAs=='function'){
                        if(info.filterButton!=undefined) this.filterButton=get.filter(info.filterButton);
                        if(info.selectButton!=undefined) this.selectButton=info.selectButton;
                        if(info.filterTarget!=undefined) this.filterTarget=get.filter(info.filterTarget);
                        if(info.selectTarget!=undefined) this.selectTarget=info.selectTarget;
                        if(info.filterCard!=undefined){
                            if(info.ignoreMod) this.ignoreMod=true;
                            this.filterCard2=get.filter(info.filterCard);
                            this.filterCard=function(card,player,event){
                                var evt=event||_status.event;
                                if(!evt.ignoreMod&&player){
                                    var mod=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                                    if(mod!='unchanged') return mod;
                                }
                                return get.filter(evt.filterCard2).apply(this,arguments);
                            };
                        }
                        if(info.filterOk==undefined){
                            this.filterOk=function(){
                                var evt=_status.event;
                                var card=get.card(),player=get.player();
                                var filter=evt._backup.filterCard;
                                if(filter&&!filter(card,player,evt)) return false;
                                if(evt._backup.filterOk) return evt._backup.filterOk();
                                return true;
                            };
                        }
                        else this.filterOk=info.filterOk;
                        if(info.selectCard!=undefined) this.selectCard=info.selectCard;
                        if(info.position!=undefined) this.position=info.position;
                        //if(info.forced!=undefined) this.forced=info.forced;
                        if(info.complexSelect!=undefined) this.complexSelect=info.complexSelect;
                        if(info.complexCard!=undefined) this.complexCard=info.complexCard;
                        if(info.complexTarget!=undefined) this.complexTarget=info.complexTarget;
                        if(info.ai1!=undefined) this.ai1=info.ai1;
                        if(info.ai2!=undefined) this.ai2=info.ai2;
                    }
                    else if(info.viewAs){
                        if(info.filterButton!=undefined) this.filterButton=get.filter(info.filterButton);
                        if(info.selectButton!=undefined) this.selectButton=info.selectButton;
                        if(info.filterTarget!=undefined) this.filterTarget=get.filter(info.filterTarget);
                        if(info.selectTarget!=undefined) this.selectTarget=info.selectTarget;
                        if(info.filterCard!=undefined){
                            if(info.ignoreMod) this.ignoreMod=true;
                            this.filterCard2=get.filter(info.filterCard);
                            this.filterCard=function(card,player,event){
                                var evt=event||_status.event;
                                if(!evt.ignoreMod&&player){
                                    var mod=game.checkMod(card,player,'unchanged','cardEnabled2',player);
                                    if(mod!='unchanged') return mod;
                                }
                                return get.filter(evt.filterCard2).apply(this,arguments);
                            };
                        }
                        if(info.filterOk==undefined){
                            this.filterOk=function(){
                                var evt=_status.event;
                                var card=get.card(),player=get.player();
                                var filter=evt._backup.filterCard;
                                if(filter&&!filter(card,player,evt)) return false;
                                if(evt._backup.filterOk) return evt._backup.filterOk()
                                return true;
                            };
                        }
                        else this.filterOk=info.filterOk;
                        if(info.selectCard!=undefined) this.selectCard=info.selectCard;
                        if(info.position!=undefined) this.position=info.position;
                        //if(info.forced!=undefined) this.forced=info.forced;
                        if(info.complexSelect!=undefined) this.complexSelect=info.complexSelect;
                        if(info.complexCard!=undefined) this.complexCard=info.complexCard;
                        if(info.complexTarget!=undefined) this.complexTarget=info.complexTarget;
                        if(info.ai1!=undefined) this.ai1=info.ai1;
                        if(info.ai2!=undefined) this.ai2=info.ai2;
                    }
                    else{
                        this.filterButton=info.filterButton?get.filter(info.filterButton):undefined;
                        this.selectButton=info.selectButton;
                        this.filterTarget=info.filterTarget?get.filter(info.filterTarget):undefined;
                        this.selectTarget=info.selectTarget;
                        this.filterCard=info.filterCard?get.filter(info.filterCard):undefined;
                        this.selectCard=info.selectCard;
                        this.position=info.position;
                        //this.forced=info.forced;
                        this.complexSelect=info.complexSelect;
                        this.complexCard=info.complexCard;
                        this.complexTarget=info.complexTarget;
                        if(info.ai1!=undefined) this.ai1=info.ai1;
                        if(info.ai2!=undefined) this.ai2=info.ai2;
                        this.filterOk=info.filterOk;
                    }
                    delete this.fakeforce;
                }
                delete this._cardChoice;
                delete this._targetChoice;
                delete this._skillChoice;
            },
            restore:function(){
                if(this._backup){
                    this.filterButton=this._backup.filterButton;
                    this.selectButton=this._backup.selectButton;
                    this.filterTarget=this._backup.filterTarget;
                    this.selectTarget=this._backup.selectTarget;
                    this.filterCard=this._backup.filterCard;
                    this.selectCard=this._backup.selectCard;
                    this.position=this._backup.position;
                    this.forced=this._backup.forced;
                    this.fakeforce=this._backup.fakeforce;
                    this._aiexclude=this._backup._aiexclude;
                    this.complexSelect=this._backup.complexSelect;
                    this.complexCard=this._backup.complexCard;
                    this.complexTarget=this._backup.complexTarget;
                    this.ai1=this._backup.ai1;
                    this.ai2=this._backup.ai2;
                    this._cardChoice=this._backup._cardChoice;
                    this._targetChoice=this._backup._targetChoice;
                    this._skillChoice=this._backup._skillChoice;
                    this.filterOk=this._backup.filterOk;
                }
                delete this.skill;
                delete this.ignoreMod;
                delete this.filterCard2;
            },
            isMine:function(){
                return (this.player&&this.player==game.me&&!_status.auto&&!this.player.isMad()&&!game.notMe);
            },
            isOnline:function(){
                return (this.player&&this.player.isOnline());
            },
            notLink:function(){
                return this.getParent().name!='_lianhuan'&&this.getParent().name!='_lianhuan2';
            },
            isPhaseUsing:function(player){
                var evt=this.getParent('phaseUse');
                if(!evt||evt.name!='phaseUse') return false;
                return !player||player==evt.player;
            },
            addTrigger:function(skill,player){
                if(!player) return;
                var evt=this;
                while(true){
                    var evt=evt.getParent('arrangeTrigger');
                    if(!evt||evt.name!='arrangeTrigger'||!evt.map) return;
                    if(typeof skill=='string') skill=[skill];
                    game.expandSkills(skill);
                    var filter=function(content){
                        if(typeof content=='string') return content==triggername;
                        return content.contains(triggername);
                    };
                    var trigger=evt._trigger;
                    var triggername=evt.triggername;
                    var map=false;
                    if(evt.doing&&evt.doing.player==player) map=evt.doing;
                    else{
                        for(var i=0;i<evt.map.length;i++){
                            if(evt.map[i].player==player){map=evt.map[i];break;}
                        }
                    }
                    if(!map) return;
                    var func=function(skillx){
                        var info=lib.skill[skillx];
                        var bool=false;
                        for(var i in info.trigger){
                            if(filter(info.trigger[i])){bool=true;break}
                        }
                        if(!bool) return;
                        var priority=get.priority(skill);
                        var toadd=[skillx,player,priority];
                        if(map.list2){
                            for(var i=0;i<map.list2.length;i++){
                                if(map.list2[i][0]==toadd[0]&&map.list2[i][1]==toadd[1]) return;
                            }
                        };
                        for(var i=0;i<map.list.length;i++){
                            if(map.list[i][0]==toadd[0]&&map.list[i][1]==toadd[1]) return;
                        }
                        map.list.add(toadd);
                        map.list.sort(function(a,b){
                            return b[2]-a[2];
                        });
                    }
                    for(var j=0;j<skill.length;j++){
                        func(skill[j]);
                    }
                }
            },
            trigger:function(name){
                if(_status.video) return;
                if((this.name==='gain'||this.name==='lose')&&!_status.gameDrawed) return;
                if(name==='gameDrawEnd') _status.gameDrawed=true;
                if(name==='gameStart'){
                    lib.announce.publish('gameStart',{});
                    if(_status.brawl&&_status.brawl.gameStart){
                        _status.brawl.gameStart();
                    }
                    if(lib.config.show_cardpile){
                        ui.cardPileButton.style.display='';
                    }
                    _status.gameStarted=true;
                    game.showHistory();
                }
                if(!lib.hookmap[name]&&!lib.config.compatiblemode) return;
                if(!game.players||!game.players.length) return;
                var event=this;
                var start=false;
                var starts=[_status.currentPhase,event.source,event.player,game.me,game.players[0]];
                for(var i=0;i<starts.length;i++){
                    if(get.itemtype(starts[i])=='player'){
                        start=starts[i];break;
                    }
                }
                if(!start) return;
                if(!game.players.contains(start)&&!game.dead.contains(start)){
                    start=game.findNext(start);
                }
                var list=[];
                var list2=[];
                var mapx=[];
                var allbool=false;
                var roles=['player','source','target'];
                var listAdded;
                var mapxx;
                var addList=function(skill,player){
                    if(listAdded[skill]) return;
                    if(player.forbiddenSkills[skill]) return;
                    if(player.disabledSkills[skill]) return;
                    listAdded[skill]=true;
                    var info=lib.skill[skill];
                    var num=0;
                    if(info.priority){
                        num=info.priority*100;
                    }
                    if(info.silent){
                        num++;
                    }
                    if(info.equipSkill) num-=30;
                    if(info.ruleSkill) num-=30;
                    if(info.firstDo){
                        list.push([skill,player,num]);
                        list.sort(function(a,b){
                            return b[2]-a[2];
                        });
                        allbool=true;
                        return;
                    }
                    else if(info.lastDo){
                        list2.push([skill,player,num]);
                        list2.sort(function(a,b){
                            return b[2]-a[2];
                        });
                        allbool=true;
                        return;
                    }
                    mapxx.list.push([skill,player,num]);
                    mapxx.list.sort(function(a,b){
                        return b[2]-a[2];
                    });
                    allbool=true;
                };
                var totalPopulation=game.players.length+game.dead.length+1;
                var player=start;
                var globalskill='global_'+name;
                var map=_status.connectMode?lib.playerOL:game.playerMap;
                for(var iwhile=0;iwhile<totalPopulation;iwhile++){
                    var id=player.playerid;
                    var mapxx={
                        player:player,
                        list:[],
                        list2:[],
                    };
                    listAdded={};
                    var notemp=player.skills.slice(0);
                    for(var j in player.additionalSkills){
                        if(!j.startsWith('hidden:')) notemp.addArray(player.additionalSkills[j]);
                    }
                    for(var j in player.tempSkills){
                        if(notemp.contains(j)) continue;
                        var expire=player.tempSkills[j];
                        if(expire===name||
                            (Array.isArray(expire)&&expire.contains(name))||
                            (typeof expire==='function'&&expire(event,player,name))){
                            delete player.tempSkills[j];
                            player.removeSkill(j);
                        }
                        else if(get.objtype(expire)==='object'){
                            for(var i=0;i<roles.length;i++){
                                if(expire[roles[i]]&&player===event[roles[i]]&&
                                    (expire[roles[i]]===name||(Array.isArray(expire[roles[i]])&&expire[roles[i]].contains(name)))){
                                    delete player.tempSkills[j];
                                    player.removeSkill(j);
                                }
                            }
                        }
                    }
                    if(lib.config.compatiblemode){
                        (function(){
                            var skills=player.getSkills('invisible').concat(lib.skill.global);
                            game.expandSkills(skills);
                            for(var i=0;i<skills.length;i++){
                                var info=get.info(skills[i]);
                                if(info&&info.trigger){
                                    var trigger=info.trigger;
                                    var add=false;
                                    if(trigger.player){
                                        if(typeof trigger.player==='string'){
                                            if(trigger.player===name) add=true;
                                        }
                                        else if(trigger.player.contains(name)) add=true;
                                    }
                                    if(trigger.target){
                                        if(typeof trigger.target==='string'){
                                            if(trigger.target===name) add=true;
                                        }
                                        else if(trigger.target.contains(name)) add=true;
                                    }
                                    if(trigger.source){
                                        if(typeof trigger.source==='string'){
                                            if(trigger.source===name) add=true;
                                        }
                                        else if(trigger.source.contains(name)) add=true;
                                    }
                                    if(trigger.global){
                                        if(typeof trigger.global==='string'){
                                            if(trigger.global===name) add=true;
                                        }
                                        else if(trigger.global.contains(name)) add=true;
                                    }
                                    if(add){
                                        addList(skills[i],player);
                                    }
                                }
                            }
                        }());
                    }
                    else{
                        for(var i=0;i<roles.length;i++){
                            var triggername=player.playerid+'_'+roles[i]+'_'+name;
                            if(lib.hook[triggername]){
                                for(var j=0;j<lib.hook[triggername].length;j++){
                                    addList(lib.hook[triggername][j],player);
                                }
                            }
                            triggername=roles[i]+'_'+name;
                            if(lib.hook.globalskill[triggername]){
                                for(var j=0;j<lib.hook.globalskill[triggername].length;j++){
                                    addList(lib.hook.globalskill[triggername][j],player);
                                }
                            }
                        }
                        if(lib.hook.globalskill[globalskill]){
                            for(var j=0;j<lib.hook.globalskill[globalskill].length;j++){
                                addList(lib.hook.globalskill[globalskill][j],player);
                            }
                        }
                        for(var i in lib.hook.globaltrigger[name]){
                            if(map[i]===player){
                                for(var j=0;j<lib.hook.globaltrigger[name][i].length;j++){
                                    addList(lib.hook.globaltrigger[name][i][j],map[i]);
                                }
                            }
                        }
                    }
                    mapx.push(mapxx);
                    player=player.nextSeat;
                    if(!player||player===start){
                        break;
                    }
                }
                
                if(allbool){
                    var next=game.createEvent('arrangeTrigger',false,event);
                    next.setContent('arrangeTrigger');
                    next.list=list;
                    next.list2=list2;
                    next.map=mapx;
                    next._trigger=event;
                    next.triggername=name;
                    //next.starter=start;
                    event._triggering=next;
                }
            },
            untrigger:function(all,player){
                if(typeof all=='undefined') all=true;
                var evt=this._triggering;
                if(all){
                    if(evt&&evt.map){
                        for(var i=0;i<evt.map.length;i++){
                            evt.map[i].list=[];
                        }
                        evt.list=[];
                        if(evt.doing) evt.doing.list=[];
                    };
                    this._triggered=5;
                }
                else{
                    if(player){
                        this._notrigger.add(player);
                        if(!evt||!evt.map) return;
                        for(var i=0;i<evt.map.length;i++){
                            if(evt.map[i].player==player) evt.map[i].list.length=0;
                        }
                    }
                }
            }
        },
        dialog:{
            add:function(item,noclick,zoom){
                if(typeof item=='string'){
                    if(item.startsWith('###')){
                        var items=item.slice(3).split('###');
                        this.add(items[0],noclick,zoom);
                        this.addText(items[1],items[1].length<=20,zoom);
                    }
                    else if(noclick){
                        var strstr=item;
                        item=ui.create.div('',this.content);
                        item.innerHTML=strstr;
                    }
                    else{
                        item=ui.create.caption(item,this.content);
                    }
                }
                else if(get.objtype(item)=='div'){
                    this.content.appendChild(item);
                }
                else if(get.itemtype(item)=='cards'){
                    var buttons=ui.create.div('.buttons',this.content);
                    if(zoom) buttons.classList.add('smallzoom');
                    this.buttons=this.buttons.concat(ui.create.buttons(item,'card',buttons,noclick));
                }
                else if(get.itemtype(item)=='players'){
                    var buttons=ui.create.div('.buttons',this.content);
                    if(zoom) buttons.classList.add('smallzoom');
                    this.buttons=this.buttons.concat(ui.create.buttons(item,'player',buttons,noclick));
                }
                else if(item[1]=='textbutton'){
                    ui.create.textbuttons(item[0],this,noclick);
                }
                else{
                    var buttons=ui.create.div('.buttons',this.content);
                    if(zoom) buttons.classList.add('smallzoom');
                    this.buttons=this.buttons.concat(ui.create.buttons(item[0],item[1],buttons,noclick));
                }
                if(this.buttons.length) {
                    if(this.forcebutton!==false) this.forcebutton=true;
                    if(this.buttons.length>3||(zoom&&this.buttons.length>5)){
                        this.classList.remove('forcebutton-auto');
                    }
                    else if(!this.noforcebutton){
                        this.classList.add('forcebutton-auto');
                    }
                }
                ui.update();
                return item;
            },
            addText:function(str,center){
                if(str&&str.startsWith('<div')) this.add(str);
                else if(center!==false){
                    this.add('<div class="text center">'+str+'</div>');
                }
                else{
                    this.add('<div class="text">'+str+'</div>');
                }
                return this;
            },
            addSmall:function(item,noclick){
                return this.add(item,noclick,true);
            },
            addAuto:function(content){
                if(content&&content.length>4&&!this._hovercustomed){
                    this.addSmall(content);
                }
                else{
                    this.add(content);
                }
            },
            open:function(){
                if(this.noopen) return;
                for(var i=0;i<ui.dialogs.length;i++){
                    if(ui.dialogs[i]==this){
                        this.show();
                        this.refocus();
                        ui.dialogs.remove(this);
                        ui.dialogs.unshift(this);
                        ui.update();
                        return this;
                    }
                    if(ui.dialogs[i].static) ui.dialogs[i].unfocus();
                    else ui.dialogs[i].hide();
                }
                ui.dialog=this;
                var translate;
                if(lib.config.remember_dialog&&lib.config.dialog_transform&&!this.classList.contains('fixed')){
                    translate=lib.config.dialog_transform;
                    this._dragtransform=translate;
                    this.style.transform='translate('+translate[0]+'px,'+translate[1]+'px) scale(0.8)';
                }
                else{
                    this.style.transform='scale(0.8)';
                }
                this.style.transitionProperty='opacity,transform';
                this.style.opacity=0;
                ui.arena.appendChild(this);
                ui.dialogs.unshift(this);
                ui.update();
                ui.refresh(this);
                if(lib.config.remember_dialog&&lib.config.dialog_transform&&!this.classList.contains('fixed')){
                    this.style.transform='translate('+translate[0]+'px,'+translate[1]+'px) scale(1)';
                }
                else{
                    this.style.transform='scale(1)';
                }
                this.style.opacity=1;
                var that=this;
                setTimeout(function(){
                    that.style.transitionProperty='';
                },500);
                return this;
            },
            close:function(){
                ui.dialogs.remove(this);
                this.delete();
                if(ui.dialogs.length>0){
                    ui.dialog=ui.dialogs[0];
                    ui.dialog.show();
                    ui.dialog.refocus();
                    ui.update();
                }
                // if(ui.arenalog){
                // 	ui.arenalog.classList.remove('withdialog');
                // }
                return this;
            },
            setCaption:function(str){
                this.querySelector('.caption').innerHTML=str;
                return this;
            }
        },
        control:{
            open:function(){
                ui.control.insertBefore(this,_status.createControl||ui.confirm);
                ui.controls.unshift(this);
                if(this.childNodes.length){
                    this.style.transition='opacity 0.5s';
                    ui.refresh(this);
                    this.style.transform='translateX(-'+(this.offsetWidth/2)+'px)';
                    this.style.opacity=1;
                    ui.refresh(this);
                    this.style.transition='';
                }
                else{
                    this.animate('controlpressdownx',500);
                }
                ui.updatec();
                return this;
            },
            add:function(item){
                var node=document.createElement('div');
                this.appendChild(node);
                node.link=item;
                node.innerHTML=get.translation(item);
                node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.control);
            },
            close:function(){
                this.animate('controlpressdownx',500);

                ui.controls.remove(this);
                this.delete();

                setTimeout(ui.updatec,100);


                if(ui.confirm==this) delete ui.confirm;
                if(ui.skills==this) delete ui.skills;
                if(ui.skills2==this) delete ui.skills2;
                if(ui.skills3==this) delete ui.skills3;
            },
            replace:function(){
                // this.animate('controlpressdownx',500);
                if(this.replaceTransition===false){
                    this.style.transitionProperty='none';
                    ui.refresh(this);
                }

                while(this.childNodes.length) this.firstChild.remove();
                var i,controls;
                if(Array.isArray(arguments[0])) controls=arguments[0];
                else controls=arguments;
                delete this.custom;
                for(i=0;i<controls.length;i++){
                    if(typeof controls[i]=='function'){
                        this.custom=controls[i];
                    }
                    else{
                        this.add(controls[i]);
                    }
                }
                if(this.childNodes.length){
                    var width=0;
                    for(i=0;i<this.childNodes.length;i++) width+=this.childNodes[i].offsetWidth;
                    ui.refresh(this);
                    this.style.width=width+'px';
                }
                ui.updatec();
                if(this.replaceTransition===false){
                    var that=this;
                    setTimeout(function(){
                        that.style.transitionProperty='';
                    },200);
                }
                return this;
            }
        },
        client:{
            send:function(){
                if(this.closed) return this;
                var args=Array.from(arguments);
                if(typeof args[0]=='function'){
                    args.unshift('exec');
                }
                for(var i=1;i<args.length;i++){
                    args[i]=get.stringifiedResult(args[i]);
                }
                try{
                    this.ws.send(JSON.stringify(args));
                }
                catch(e){
                    this.ws.close();
                }
                return this;
            },
            close:function(){
                lib.node.clients.remove(this);
                lib.node.observing.remove(this);
                if(ui.removeObserve&&!lib.node.observing.length){
                    ui.removeObserve.remove();
                    delete ui.removeObserve;
                }
                this.closed=true;
                if(_status.waitingForPlayer){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        if(game.connectPlayers[i].playerid==this.id){
                            game.connectPlayers[i].uninitOL();
                            delete game.connectPlayers[i].playerid;
                        }
                    }
                    if(game.onlinezhu==this.id){
                        game.onlinezhu=null;
                    }
                    game.updateWaiting();
                }
                else if(lib.playerOL[this.id]){
                    var player=lib.playerOL[this.id];
                    player.setNickname(player.nickname+' - 离线');
                    game.broadcast(function(player){
                        player.setNickname(player.nickname+' - 离线');
                    },player);
                    player.unwait('ai');
                }

                if(window.isNonameServer){
                    document.querySelector('#server_count').innerHTML=lib.node.clients.length;
                }
                return this;
            }
        },
        nodews:{
            send:function(message){
                game.send('server','send',this.wsid,message);
            },
            on:function(type,func){
                this['on'+type]=func;
            },
            close:function(){
                game.send('server','close',this.wsid);
            }
        },
        ws:{
            onopen:function(){
                if(_status.connectCallback){
                    _status.connectCallback(true);
                    delete _status.connectCallback;
                }
            },
            onmessage:function(messageevent){
                if(messageevent.data=='heartbeat'){
                    this.send('heartbeat');
                    return;
                }
                var message;
                try{
                    message=JSON.parse(messageevent.data);
                    if(!Array.isArray(message)||
                        typeof lib.message.client[message[0]]!=='function'){
                        throw('err');
                    }
                    for(var i=1;i<message.length;i++){
                        message[i]=get.parsedResult(message[i]);
                    }
                }
                catch(e){
                    console.log(e);
                    console.log('invalid message: '+messageevent.data);
                    return;
                }
                lib.message.client[message.shift()].apply(null,message);
            },
            onerror:function(e){
                if(this._nocallback) return;
                if(_status.connectCallback){
                    _status.connectCallback(false);
                    delete _status.connectCallback;
                }
                else{
                    alert('连接失败');
                }
            },
            onclose:function(){
                if(this._nocallback) return;
                if(_status.connectCallback){
                    _status.connectCallback(false);
                    delete _status.connectCallback;
                }
                if(game.online||game.onlineroom){
                    if((game.servermode||game.onlinehall)&&_status.over){

                    }
                    else{
                        localStorage.setItem(lib.configprefix+'directstart',true);
                        game.reload();
                    }
                }
                else{
                    // game.saveConfig('reconnect_info');
                }
                game.online=false;
                game.ws=null;
            }
        }
    };

    Object.assign(lib.element, element);
});