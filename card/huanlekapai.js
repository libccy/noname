'use strict';
game.import('card',function(lib,game,ui,get,ai,_status){
	return {
		name:'huanlekapai',
		connect:true,
		card:{
			"monkey":{
                audio:true,
                fullskin:true,
                type:"equip",
                subtype:"equip5",
                skills:["monkey"],
                ai:{
                    basic:{
                        equipValue:8,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },             
                enable:true,
                selectTarget:-1,
                filterTarget:function (card,player,target){
        return target==player;
    },
                modTarget:true,
                allowMultiple:false,
                content:function (){
        target.equip(card);
    },
                toself:true,
            },
            
            "mianju":{
                audio:true,
                type:"equip",
                subtype:"equip2",
                skills:["mianju"],
                ai:{
                    order:9.5,
                    basic:{
                        equipValue:function (card,player){
            if(!player.isTurnedOver()) return 6;
            if(player.isTurnedOver()) return -10;
            return 0;
              },
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,                
                modTarget:true,
                allowMultiple:false,               
                toself:true,
                fullskin:true,
            },
            "shoulijian":{             
               	audio:true, 			
                type:"basic",
				skills:["shoulijian"],
                enable:true,
                fullskin:true,   
				filterTarget:function (card,player,target){
        return get.distance(player,target)>1;
    },
                content:function (){
        "step 0"        
        if(!target.countCards('he',{type:'equip'})){
            target.damage();
            event.finish();
        }
        else{
            target.chooseToDiscard('he',{type:'equip'},'弃置一张装备牌或受到一点伤害').ai=function(card){
                return 7-get.value(card);
            };
        }
        "step 1"
        if(!result.bool){
            target.damage();
        }
    },
		
                ai:{
                    basic:{
                        order:9,
                        value:6,
                        useful:2,
                    },
                    result:{
                        target:-2,
                    },
                    tag:{
                        discard:1,
                        damage:1,
                    },
                },
                selectTarget:1,
            },
			
            "kuwu":{
                audio:true,
                fullskin:true,
				
                type:"equip",
                subtype:"equip1",
                skills:["kuwu"],
                nomod:true,
                nopower:true,
                unique:true,
                distance:{
                    attackFrom:-1,
                },
                ai:{
                    equipValue:6,
                    basic:{
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        equipValue:1,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                enable:true,
                selectTarget:-1,               
                modTarget:true,
                allowMultiple:false,                
                toself:true,
            },
            "xuelunyang":{
                audio:true,
                fullskin:true,
                type:"equip",
                subtype:"equip5",
                skills:["xuelunyang"],
                ai:{
                    basic:{
                        equipValue:8,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
                
                enable:true,
                selectTarget:-1,                
                modTarget:true,
                allowMultiple:false,                
                toself:true,
            },
            "jiuwei":{
                audio:true,
                fullskin:true,
                type:"equip",
                subtype:"equip5",
                skills:["jiuwei"],
                ai:{
                    basic:{
                        equipValue:8,
                        order:function (card,player){
                if(player&&player.hasSkillTag('reverseEquip')){
                    return 8.5-get.equipValue(card,player)/20;
                }
                else{
                    return 8+get.equipValue(card,player)/20;
                }
            },
                        useful:2,
                        value:function (card,player){
                var value=0;
                var info=get.info(card);
                var current=player.getEquip(info.subtype);
                if(current&&card!=current){
                    value=get.value(current,player);
                }
                var equipValue=info.ai.equipValue;
                if(equipValue==undefined){
                    equipValue=info.ai.basic.equipValue;
                }
                if(typeof equipValue=='function') return equipValue(card,player)-value;
                if(typeof equipValue!='number') equipValue=0;
                return equipValue-value;
            },
                    },
                    result:{
                        target:function (player,target){
                return get.equipResult(player,target,name);
            },
                    },
                },
               
                enable:true,
                selectTarget:-1,                
                modTarget:true,
                allowMultiple:false,               
                toself:true,
            },
		},
		skill:{
			
				"shoulijian":{		       
                audio:true,        
                enable:true,                
                filterTarget:function (card,player,target){
        return get.distance(player,target)>1;
    },
                content:function (){
        "step 0"        
        if(!target.countCards('he',{type:'equip'})){
            target.damage();
            event.finish();
        }
        else{
            target.chooseToDiscard('he',{type:'equip'},'弃置一张装备牌或受到一点伤害').ai=function(card){
                return 7-get.value(card);
            };
        }
        "step 1"
        if(!result.bool){
            target.damage();
        }
    },
                ai:{
                    basic:{
                        order:9,
                        value:6,
                        useful:2,
                    },
                    result:{
                        target:-2,
                    },
                    tag:{
                        discard:1,
                        damage:1,
                    },
                },
                selectTarget:1,
            },
				
					"monkey":{
trigger:{
        global:"useCardToBegin",
    },
    audio:true,
    filter:function (event,player){
        var card=player.get('e','5');
        if(card){
            var name=card.name;              
            if(event.name=='tao'&&get.itemtype(event.cards)=='cards'&&get.position(event.cards[0])=='d'&&event.player!=player&&name&&name.indexOf('monkey')!=-1) return true;
        }
        return false;
    },
    check:function (event,player){
        return ai.get.attitude(player,event.player)<=0;
    },
    content:function (){
    "step 0"
     player.$fullscreenpop('猴子偷桃','fire');
       trigger.untrigger();
    trigger.finish();
   "step 1"
      player.discard(player.get('e','5'));
   "step 2"
     player.gain(trigger.cards);
    player.$gain2(trigger.cards);
       },
},

"mianju":{
 audio:true,
    trigger:{
        player:"turnOverBefore",
    },
    forced:true,
    content:function (){
        trigger.cancel();
    },
    ai:{
        noturnOver:true,
        effect:{
            target:function (card,player,target,current){
                if(get.tag(card,'turnOver')) return [0,0];
            },
        },
    },
},

"kuwu":{
audio:true,
    trigger:{
        source:"damageEnd",
    },
    forced:true,
    priority:55,
    filter:function (event,player){
        if(event._notrigger.contains(event.player)) return false;
        return event.card&&event.card.name=='sha'&&event.notLink()&&event.player.countCards('he')>0;
    },
    content:function (){
        trigger.player.chooseToDiscard(true,'he');
    },
},

"xuelunyang":{
 audio:true,
    trigger:{
        player:"phaseBegin",
    },
    priority:2018,
    direct:true,
    createDialog:function (player,target,onlylist){
        var names=[];
        var list=[];
        if(target.name&&!target.isUnseen(0)) names.add(target.name);
        if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
        if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
        var pss=player.getSkills();
        for(var i=0;i<names.length;i++){
            var info=lib.character[names[i]];
            if(info){
                var skills=info[3];
                for(var j=0;j<skills.length;j++){
                    if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                        !lib.skill[skills[j]].unique&&
                        !pss.contains(skills[j])){
                        list.push(skills[j]);
                    }
                }
            }
        }
        if(onlylist) return list;
        var dialog=ui.create.dialog('forcebutton');
        dialog.add('选择获得一项技能');
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
        return dialog;
    },
    content:function (){
        'step 0'
        player.chooseTarget(get.prompt2('xuelunyang'),function(card,player,target){
            var names=[];
            if(target.name&&!target.isUnseen(0)) names.add(target.name);
            if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
            if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
            var pss=player.getSkills();
            for(var i=0;i<names.length;i++){
                var info=lib.character[names[i]];
                if(info){
                    var skills=info[3];
                    for(var j=0;j<skills.length;j++){
                        if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                            !lib.skill[skills[j]].unique&&!pss.contains(skills[j])){
                            return true;
                        }
                    }
                }
                return false;
            }
        }).set('ai',function(target){
            if(get.attitude(_status.event.player,target)>0) return Math.random();
            return get.attitude(_status.event.player,target)<=0;
        });
        'step 1'
        if(result.bool){
            event.target=result.targets[0];
            player.logSkill('xuelunyang',event.target);
        }
        else{
            event.finish();
        }
        'step 2'
        event.skillai=function(list){
            return get.max(list,get.skillRank,'item');
        };
        if(event.isMine()){
            event.dialog=lib.skill.xuelunyang.createDialog(player,target);//tianshu
            event.switchToAuto=function(){
                event._result=event.skillai(event.list);
                game.resume();
            };
            _status.imchoosing=true;
            game.pause();
        }
        else{
            event._result=event.skillai(lib.skill.xuelunyang.createDialog(player,target,true));
        }
        'step 3'
        _status.imchoosing=false;
        if(event.dialog){
            event.dialog.close();
        }
        player.addTempSkill(result);
        player.popup(result);
        game.log(player,'获得了','【'+get.translation(result)+'】');
    },
},

"jiuwei":{
trigger:{
        player:"phaseEnd",
    },
    audio:true,
    filter:function (event,player){        
        return player.isAlive();
    },
   frequent:true,
    content:function (){
       if(player.isDamaged()){
       player.recover();
       }
       else{
       player.draw();
       }
       },
},
		},
		translate:{
			"monkey":"猴子",
            "monkey_info":"猴子偷桃：当场上有其他角色使用【桃】时，你可以弃掉【猴子】，阻止【桃】的结算并将其收为手牌",
            "mianju":"漩涡面具",
            "mianju_info":"<font color=#f00>锁定技</font> 你的武将牌不能被翻面",
            "shoulijian":"手里剑",
            "shoulijian_info":"出牌阶段，对一名距离1以外的角色使用，令其弃置一张装备牌或受到一点伤害",
            "kuwu":"苦无",
            "kuwu_info":"<font color=#f00>锁定技</font> 每当你使用【杀】造成一次伤害，受伤角色须弃置一张牌",
            "xuelunyang":"写轮眼",
            "xuelunyang_info":"回合开始阶段，你可以选择一名角色，然后获得其一项技能，直到回合结束",
            "jiuwei":"九尾",
            "jiuwei_info":"（收集查克拉）回合结束时，若你已受伤，你可回复一点体力，否则摸一张牌",
		},
		list:[
		["diamond","5","monkey"],
		["heart","9","jiuwei"],
		["heart","2","xuelunyang"],
		["spade","6","kuwu"],
		["diamond","4","shoulijian"],
		["spade","4","shoulijian"],
		["club","3","mianju"],
		],
	}
});
