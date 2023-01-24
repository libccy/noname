'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		//clan n.宗派;(尤指苏格兰的)宗族，氏族，家族;庞大的家族;帮派;小集团
		name:'clan',
		connect:true,
		character:{
			clan_wuxian:['female','shu',3,['clanyirong','clanguixiang','clanmuyin'],['clan:陈留吴氏']],
			clan_wuban:['male','shu',4,['clanzhanding','clanmuyin'],['clan:陈留吴氏']],
		},
		characterSort:{
			clan:{
				clan_wu:['clan_wuxian','clan_wuban'],
			},
		},
		skill:{
			//族吴班
			clanzhanding:{
				audio:2,
				enable:'chooseToUse',
				viewAsFilter:function(player){
					return player.countCards('hes')>0;
				},
				viewAs:{name:'sha'},
				filterCard:true,
				position:'hes',
				selectCard:[1,Infinity],
				check:function(card){
					return 6-ui.selected.cards.length-get.value(card);
				},
				onuse:function(links,player){
					player.addTempSkill('clanzhanding_effect');
				},
				ai:{
					order:1,
					respondSha:true,
					skillTagFilter:function(player){
						return player.countCards('hes')>0;
					},
				},
				subSkill:{
					effect:{
						trigger:{player:'useCardAfter'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.skill=='clanzhanding';
						},
						content:function(){
							lib.skill.chenliuwushi.change(player,-1);
							if(player.hasHistory('sourceDamage',function(evt){
								return evt.card==trigger.card;
							})){
								var num1=player.countCards('h'),num2=player.getHandcardLimit();
								if(num1<num2) player.draw(Math.min(5,num2-num1));
							}
							else if(trigger.addCount!==false){
								trigger.addCount=false;
								player.getStat().card.sha--;
							}
						},
					},
				},
			},
			//族吴苋
			clanyirong:{
				audio:2,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					var num1=player.countCards('h'),num2=player.getHandcardLimit();
					return num1!=num2;
				},
				selectCard:function(){
					var player=_status.event.player;
					var num1=player.countCards('h'),num2=player.getHandcardLimit();
					if(num1>num2) return num1-num2;
					return [0,1];
				},
				filterCard:function(card,player){
					var num1=player.countCards('h'),num2=player.getHandcardLimit();
					return num1>num2;
				},
				check:function(card){
					return 6-ui.selected.cards.length-get.value(card);
				},
				prompt:function(){
					var player=_status.event.player;
					var num1=player.countCards('h'),num2=player.getHandcardLimit();
					var str='<span class="text center">';
					if(num1>num2){
						str+=('弃置'+get.cnNumber(num1-num2)+'张牌，然后手牌上限+1。')
					}
					else{
						str+=('摸'+get.cnNumber(Math.min(5,num2-num1))+'张牌，然后手牌上限-1。');
					}
					str+=('<br>※当前手牌上限：'+num2);
					var num3=player.countMark('clanguixiang_count');
					if(num3>0){
						str+=('；阶段数：'+num3)
					}
					str+='</span>';
					return str;
				},
				content:function(){
					'step 0'
					if(cards.length){
						lib.skill.chenliuwushi.change(player,1);
						event.finish();
					}
					else{
						var num1=player.countCards('h'),num2=player.getHandcardLimit();
						if(num1<num2) player.draw(Math.min(5,num2-num1));
					}
					'step 1'
					lib.skill.chenliuwushi.change(player,-1);
				},
				ai:{
					order:function(item,player){
						var num1=player.countCards('h'),num2=player.getHandcardLimit();
						if(num1-num2==1) return 8;
						return 1;
					},
					result:{player:1},
					threaten:5,
				},
			},
			clanguixiang:{
				audio:2,
				init:function(player){
					player.addSkill('clanguixiang_count');
				},
				onremove:function(player){
					player.removeSkill('clanguixiang_count');
					var event=_status.event.getParent('phase');
					if(event) delete event._clanguixiang;
				},
				trigger:{
					player:['phaseZhunbeiBefore','phaseJudgeBefore','phaseDrawBefore','phaseDiscardBefore','phaseJieshuBefore'],
				},
				forced:true,
				filter:function(event,player){
					var evt=event.getParent('phase');
					if(!evt||!evt._clanguixiang) return false;
					var num1=player.getHandcardLimit()-1,num2=player.countMark('clanguixiang_count');
					return num1==num2;
				},
				content:function(){
					trigger.cancel(null,null,'notrigger');
					var next=player.phaseUse();
					event.next.remove(next);
					trigger.getParent().next.unshift(next);
				},
				subSkill:{
					count:{
						trigger:{
							player:['phaseZhunbeiBegin','phaseJudgeBegin','phaseDrawBegin','phaseDiscardBegin','phaseJieshuBegin','phaseUseBegin'],
						},
						forced:true,
						popup:false,
						lastDo:true,
						priority:-Infinity,
						content:function(){
							player.addMark('clanguixiang_count',1,false);
						},
						group:'clanguixiang_clear',
					},
					clear:{
						trigger:{player:'phaseBefore'},
						forced:true,
						charlotte:true,
						popup:false,
						firstDo:true,
						priority:Infinity,
						content:function(){
							delete player.storage.clanguixiang_count;
							trigger._clanguixiang=true;
						},
					},
				},
			},
			clanmuyin:{
				audio:2,
				audioname:['clan_wuxian','clan_wuban'],
				trigger:{player:'phaseZhunbeiBegin'},
				isMax:function(player){
					var num=player.getHandcardLimit();
					return !game.hasPlayer(function(current){
						return current!=player&&current.getHandcardLimit()>num;
					});
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return (current==player||current.hasClan('陈留吴氏'))&&!lib.skill.clanmuyin.isMax(current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('clanmuyin'),'令一名陈留吴氏角色的手牌上限+1',function(card,player,current){
						return (current==player||current.hasClan('陈留吴氏'))&&!lib.skill.clanmuyin.isMax(current);
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('clanmuyin',target);
						lib.skill.chenliuwushi.change(target,1);
						game.delayx();
					}
				},
			},
			chenliuwushi:{
				charlotte:true,
				change:function(player,num){
					player.addSkill('chenliuwushi');
					var info=player.storage;
					if(typeof info.chenliuwushi!='number') info.chenliuwushi=0;
					info.chenliuwushi+=num;
					if(info.chenliuwushi==0) player.unmarkSkill('chenliuwushi');
					else player.markSkill('chenliuwushi');
					if(num>=0) game.log(player,'的手牌上限','#y+'+num);
					else game.log(player,'的手牌上限','#g'+num);
				},
				mod:{
					maxHandcard:function(player,num){
						var add=player.storage.chenliuwushi;
						if(typeof add=='number') return num+add;
					},
				},
				markimage:'image/card/handcard.png',
				intro:{
					content:function(num,player){
						var str='<li>手牌上限';
						if(num>=0) str+='+';
						str+=num;
						str+='<br><li>当前手牌上限：';
						str+=player.getHandcardLimit();
						return str;
					},
				},
			},
		},
		characterReplace:{
			wuban:['clan_wuban','wuban'],
		},
		translate:{
			clan_wuxian:'族吴苋',
			clanyirong:'移荣',
			clanyirong_info:'出牌阶段限两次。若你的手牌数：小于X，则你可以将手牌摸至X张（至多摸五张），然后X-1；大于X，则你可以将手牌弃置至X张，然后X+1。（X为你的手牌上限）',
			clanguixiang:'贵相',
			clanguixiang_info:'锁定技。你的非出牌阶段开始前，若此阶段即将成为你本回合内的第X个阶段（X为你的手牌上限），则你终止此阶段，改为进行一个出牌阶段。',
			clanmuyin:'穆荫',
			clanmuyin_info:'宗族技。准备阶段，你可以选择一名手牌上限不为全场最多的陈留吴氏角色。该角色的手牌上限+1。',
			chenliuwushi:'陈留·吴氏',
			clan_wuban:'族吴班',
			clanzhanding:'斩钉',
			clanzhanding_info:'你可以将任意张牌当做【杀】使用。你以此法使用的【杀】结算结束后，你令你的手牌上限-1，然后若你因此【杀】造成过伤害，则你将手牌摸至体力上限（至多摸五张），否则你令此【杀】不计入次数限制。',
			
			clan_wu:'陈留·吴氏',
		},
	};
});
