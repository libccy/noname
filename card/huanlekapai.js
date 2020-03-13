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
					},
				},
			},
			"mianju":{
				audio:true,
				fullskin:true,
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
					},
				},
			},
			"shoulijian":{
				audio:true,
				type:"basic",
				enable:true,
				fullskin:true,
				outrange:{
					global:2,
				},
				filterTarget:lib.filter.notMe,
				content:function (){
					"step 0"		
					if(!target.countCards('he',{type:'equip'})){
						target.damage();
						event.finish();
					}
					else{
						target.chooseToDiscard('he',{type:'equip'},'弃置一张装备牌或受到一点伤害').ai=function(card){
							var player=_status.event.player;
							var source=_status.event.getParent().player;
							if(get.damageEffect(player,source,player)>0) return -1;
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
				},
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
					},
				},
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
					},
				},
			},
		},
		skill:{
			"monkey":{
				trigger:{
					global:"useCardToBegin",
				},
				audio:true,
				filter:function (event,player){
					var card=player.getEquip(5);
					if(card){
						var name=card.name;
						if(name&&name.indexOf('monkey')!=-1&&event.name=='tao'&&event.player!=player&&event.cards.filterInD().length>0) return true;
					}
					return false;
				},
				check:function (event,player){
					return get.attitude(player,event.player)<=0;
				},
				content:function (){
					"step 0"
					player.$fullscreenpop('猴子偷桃','fire');
					trigger.untrigger();
					trigger.finish();
					"step 1"
					player.discard(player.getEquip(5));
					"step 2"
					player.gain(trigger.cards.filterInD(),'gain2','log');
				},
			},
			"mianju":{
				audio:true,
				trigger:{
					player:"turnOverBefore",
				},
				forced:true,
				equipSkill:true,
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
					source:"damageSource",
				},
				forced:true,
				equipSkill:true,
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
				equipSkill:true,
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
						if(dialog) dialog.close();
   		 _status.imchoosing=false;
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
   			return Math.random();
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
   				event.dialog.close();
   		 	_status.imchoosing=false;
   				game.resume();
   			};
   			_status.imchoosing=true;
   			game.pause();
   		}
   		else if(event.isOnline()){
   			event.player.send(function(){
   				var event=_status.event;
   				event.skillai=function(list){
   					return get.max(list,get.skillRank,'item');
   				};
   				event.dialog=lib.skill.xuelunyang.createDialog(player,target);//tianshu
   	 		event.switchToAuto=function(){
   	 			event._result=event.skillai(event.list);
   		 		event.dialog.close();
   		 		_status.imchoosing=false;
   		 		game.resume();
    			};
    			_status.imchoosing=true;
    			game.pause();
   			})
						event.player.wait();
						game.pause();
   		}
   		else{
   			event._result=event.skillai(lib.skill.xuelunyang.createDialog(player,target,true));
   		}
   		'step 3'
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
				frequent:true,
				equipSkill:true,
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
