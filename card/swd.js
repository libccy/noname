card.swd={
	card:{
		baihupifeng:{
			fullskin:true,
			type:"equip",
			subtype:"equip2",
			skills:['baihupifeng'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp<=2) return 8;
						return 6;
					}
				},
			},
		},
		fengxueren:{
			type:"equip",
			subtype:"equip1",
			distance:{attackFrom:-1},
			skills:['fengxueren'],
			ai:{
				basic:{
					equipValue:6
				},
			},
		},
		chilongya:{
			type:"equip",
			subtype:"equip1",
			distance:{attackFrom:-1},
			skills:['chilongya'],
			ai:{
				basic:{
					equipValue:4
				},
			},
		},
		daihuofenglun:{
			type:'equip',
			subtype:'equip4',
			distance:{globalFrom:-2,globalTo:-1},
			ai:{
				basic:{
					equipValue:4
				},
			},
		},
		xiayuncailing:{
			type:'equip',
			subtype:'equip3',
			distance:{globalFrom:1,globalTo:2},
		},
		shentoumianju:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['shentou'],
			ai:{
				basic:{
					equipValue:7,
				}
			}
		},
		pusafazhou:{
			type:'equip',
			subtype:'equip5',
			skills:['pusafazhou'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.hp==2) return 7;
						if(player.hp==1) return 9;
						return 5;
					}
				}
			}
		},
		yuhuanghua:{
			type:'basic',
			enable:true,
			selectTarget:-1,
			// filterTarget:function(card,player,target){
			// 	return target.hp<target.maxHp;
			// },
			filterTarget:true,
			content:function(){
				"step 0"
				target.recover();
				"step 1"
				target.draw();
			},
			ai:{
				basic:{
					order:7,
					useful:3,
					value:3,
				},
				result:{
					target:function(player,target){
						target.hp<target.maxHp?2:1;
					},
				},
			}
		},
		xiangyuye:{
			type:'basic',
			enable:true,
			fullskin:true,
			filterTarget:function(card,player,target){
				return get.distance(player,target,'attack')>1;
			},
			content:function(){
				"step 0"
				if(!target.num('h',{color:'black'})){
					target.loseHp();
					event.finish();
				}
				else{
					target.chooseToDiscard({color:'black'},'弃置一张黑色手牌或受流失一点体力').ai=function(card){
						return 8-ai.get.value(card);
					};
				}
				"step 1"
				if(!result.bool){
					target.loseHp();
				}
			},
			ai:{
				basic:{
					order:9,
					value:3,
					useful:1,
				},
				result:{
					target:-2
				},
				tag:{
					discard:1,
					loseHp:1
				}
			}
		},
		caoyao:{
			fullskin:true,
			type:'basic',
			range:{global:1},
			enable:true,
			filterTarget:function(card,player,target){
				return target.hp<target.maxHp;
			},
			content:function(){
				target.recover();
			},
			ai:{
				basic:{
					useful:[7,2],
					value:[7,2],
				},
				order:7,
				result:{
					target:2
				},
				tag:{
					recover:1,
				}
			}
		},
		huanpodan:{
			type:'basic',
			enable:function(){return game.dead.length>0},
			notarget:true,
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.dead.length;i++){
					list.push(game.dead[i].name);
				}
				player.chooseButton(ui.create.dialog([list,'character']),function(button){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
					return ai.get.attitude(_status.event.player,game.dead[i]);
				},true);
				"step 1"
				if(result.bool){
					for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
					var dead=game.dead[i];
					dead.revive(1);
					player.logSkill('huanpodan',dead);
					player.loseHp();
				}
			},
			ai:{
				basic:{
					useful:[4,2],
					value:[9,2],
				},
				order:function(card,player){
					if(player.hp<=2) return -1;
					for(var i=0;i<game.dead.length;i++){
						if(ai.get.attitude(player,game.dead[i])>3) return 7;
					}
					return -10;
				},
				result:{
					player:function(player){
						if(player.hp<=2) return -1;
						for(var i=0;i<game.dead.length;i++){
							if(ai.get.attitude(player,game.dead[i])>3) return 2;
						}
						return -10;
					}
				},
			}
		},
		pantao:{
			type:'basic',
			enable:function(card,player){
				return player.hp<player.maxHp;
			},
			savable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				target.recover(2);
			},
			ai:{
				order:7,
				basic:{
					useful:[10,6],
					value:[10,6],
				},
				result:{
					target:function(player,target){
						if(target.get('h').length<=target.hp) return 0;
						return 2;
					},
				},
				tag:{
					recover:2,
					save:2
				}
			}
		},
		tianxianjiu:{
			fullskin:true,
			type:'basic',
			enable:true,
			savable:function(card,player){
				return _status.event.dying==player;
			},
			usable:1,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				"step 0"
				if(target==_status.dying) target.recover();
				else{
					target.addTempSkill('tianxianjiu',['phaseAfter','shaAfter']);
					if(card.clone&&card.clone.parentNode==player.parentNode){
						card.clone.moveDelete(target);
						game.addVideo('gain2',target,get.cardsInfo([card]));
					}
				}
			},
			ai:{
				basic:{
					useful:function(card,i){
						if(_status.event.player.hp>1){
							if(i==0) return 5;
							return 1;
						}
						if(i==0) return 7.3;
						return 3;
					},
					value:function(card,player){
						if(player.hp>1){
							if(i==0) return 5;
							return 1;
						}
						if(i==0) return 7.3;
						return 3;
					},
				},
				order:function(){
					return lib.card.sha.ai.order+0.2;
				},
				result:{
					target:function(player,target){
						if(target&&target==_status.dying) return 2;
						if(lib.config.mode=='stone'&&!player.isMin()){
							if(player.getActCount()+1>=player.actcount) return false;
						}
						var shas=target.get('h','sha');
						var ok=false;
						if(shas.length){
							for(var i=0;i<shas.length;i++){
								if(lib.filter.filterCard(shas[i],target)){
									ok=true;break;
								}
							}
						}
						if(ok){
							var card=target.get('h','sha',0);
							for(var i=0;i<game.players.length;i++){
								if(ai.get.attitude(target,game.players[i])<0&&
								target.canUse(card,game.players[i],true,true)){
									if(ai.get.effect(game.players[i],card,target)>0) return 1;
								}
							}
						}
						return 0;
					},
				},
			}
		},
		langeguaiyi:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['longfan'],
			ai:{
				basic:{
					equipValue:7,
				}
			}
		},
		guiyoujie:{
			fullskin:true,
			type:'delay',
			filterTarget:function(card,player,target){
				return (lib.filter.judge(card,player,target)&&player!=target);
			},
			judge:function(card){
				if(get.color(card)=='black') return -3;
				return 0;
			},
			effect:function(){
				if(result.bool==false){
					player.turnOver();
					player.draw();
				}
			},
			ai:{
				basic:{
					order:1,
					useful:1,
					value:6,
				},
				result:{
					target:-3
				},
			}
		},
		yufulu:{
			fullskin:true,
			type:'equip',
			chongzhu:true,
			enable:function(card,player){
				return player.sex=='female';
			},
			subtype:'equip5',
			skills:['touzhi'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.sex=='female') return 5;
						return 0;
					},
				}
			}
		},
		xixueguizhihuan:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['xixue'],
			ai:{
				basic:{
					equipValue:5
				}
			}
		},
		zhufangshenshi:{
			fullskin:true,
			chongzhu:true,
			type:'trick',
			enable:function(){
				return game.players.length>2;
			},
			filterTarget:function(card,player,target){
				return player.next==target||player.previous==target;
			},
			content:function(){
				game.swapSeat(player,target);
			},
			ai:{
				basic:{
					order:7,
				},
				result:{
					target:function(player,target){
						if(player.next==target) return -1;
						if(player.previous==target) return 1;
					}
				}
			},
			mode:['identity','guozhan'],
		},
		jingleishan:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'sha'});
				next.ai=function(card){
					if(ai.get.damageEffect(target,player,target,'thunder')>=0) return 0;
					if(player.get('s').contains('xinwuyan')) return 0;
					if(target.get('s').contains('xinwuyan')) return 0;
					return 1;
				};
				next.autochoose=lib.filter.autoRespondSha;
				"step 1"
				if(result.bool==false){
					target.damage('thunder');
				}
			},
			ai:{
				wuxie:function(target,card,player,viewer){
					if(ai.get.attitude(viewer,target)>0&&target.num('h','sha')){
						if(!target.num('h')||target.hp==1||Math.random()<0.7) return 0;
					}
				},
				basic:{
					order:9,
					useful:[5,1]
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nothunder')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('h');
						if(lib.config.mode=='identity'){
							if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
						}
						if(nh==0) return -2;
						if(nh==1) return -1.7
						return -1.5;
					},
				},
				tag:{
					respond:1,
					respondSha:1,
					damage:1,
					natureDamage:1,
					thunderDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		chiyuxi:{
			fullskin:true,
			type:'trick',
			enable:true,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				var next=target.chooseToRespond({name:'shan'});
				next.ai=function(card){
					if(ai.get.damageEffect(target,player,target,'fire')>=0) return 0;
					if(player.get('s').contains('xinwuyan')) return 0;
					if(target.get('s').contains('xinwuyan')) return 0;
					return 1;
				};
				next.autochoose=lib.filter.autoRespondShan;
				"step 1"
				if(result.bool==false){
					target.damage('fire');
				}
			},
			ai:{
				wuxie:function(target,card,player,viewer){
					if(ai.get.attitude(viewer,target)>0&&target.num('h','shan')){
						if(!target.num('h')||target.hp==1||Math.random()<0.7) return 0;
					}
				},
				basic:{
					order:9,
					useful:1
				},
				result:{
					target:function(player,target){
						if(target.hasSkillTag('nofire')) return 0;
						var num=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].ai.shown==0) num++;
						}
						if(num>1) return 0;
						var nh=target.num('h');
						if(lib.config.mode=='identity'){
							if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
						}
						if(nh==0) return -2;
						if(nh==1) return -1.7
						return -1.5;
					},
				},
				tag:{
					respond:1,
					respondShan:1,
					damage:1,
					natureDamage:1,
					fireDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		guangshatianyi:{
			fullskin:true,
			type:'equip',
			enable:function(card,player){
				return player.sex=='female';
			},
			subtype:'equip2',
			skills:['guangshatianyi'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(player.sex=='female') return 6;
						return 0;
					},
				}
			}
		},
		guilingzhitao:{
			type:'equip',
			subtype:'equip5',
			skills:['nigong'],
			ai:{
				basic:{
					equipValue:function(card,player){
						if(!player.storage.nigong) return 5;
						return 5+player.storage.nigong;
					}
				}
			},
			onLose:function(){
				player.storage.nigong=0;
			},
			onEquip:function(){
				player.storage.nigong=0;
			}
		},
		qipoguyu:{
			type:'equip',
			subtype:'equip5',
			skills:['xujin'],
			onLose:function(){
				player.storage.xujin=0;
			},
			onEquip:function(){
				player.storage.xujin=0;
			}
		},
		sadengjinhuan:{
			fullskin:true,
			type:'equip',
			subtype:'equip5',
			skills:['sadengjinhuan'],
			ai:{
				basic:{
					equipValue:5.5
				}
			},
		},
		ximohu:{
			type:'equip',
			subtype:'equip5',
			skills:['ximohu'],
			ai:{
				basic:{
					equipValue:6
				}
			},
		},
		guiyanfadao:{
			type:'equip',
			subtype:'equip1',
			distance:{attackFrom:-1},
			ai:{
				basic:{
					equipValue:3
				}
			},
			skills:['guiyanfadao']
		},
	},
	skill:{
		baihupifeng:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			filter:function(event,player){
				if(player.hp==player.maxHp) return false;
				for(var i=0;i<game.players.length;i++){
					if(player.hp>game.players[i].hp) return false;
				}
				return true;
			},
			content:function(){
				player.recover();
			},
		},
		// fengxueren:{
		// 	trigger:{source:'damageEnd'},
		// 	filter:function(event){
		// 		return event.card&&event.card.name=='sha';
		// 	},
		// 	forced:true,
		// 	content:function(){
		// 		"step 0"
		// 		trigger.player.turnOver();
		// 		trigger.player.popup('fengxueren');
		// 		"step 1"
		// 		trigger.player.draw();
		// 		"step 2"
		// 		if(player.num('he')){
		// 			player.chooseToDiscard(true);
		// 		}
		// 	}
		// },
		fengxueren:{
			trigger:{player:'shaHit'},
			check:function(event,player){
				var att=ai.get.attitude(player,event.target);
				if(player.skills.contains('jiu')) return att>0;
				if(event.target.hasSkillTag('maixie')){
					return att<=0;
				}
				if(event.target.hp==1) return att>0;
				if(player.skills.contains('tianxianjiu')) return false;
				return att<=0;
			},
			filter:function(event,player){
				return !event.target.isTurnedOver()&&!player.skills.contains('fengxueren2');
			},
			content:function(){
				trigger.unhurt=true;
				trigger.target.turnOver();
				player.addTempSkill('fengxueren2','phaseAfter')
			}
		},
		fengxueren2:{},
		chilongya:{
			trigger:{source:'damageBefore'},
			forced:true,
			priority:5,
			content:function(){
				trigger.nature='fire';
			}
		},
		chilongya2:{
			trigger:{source:'damageBegin'},
			filter:function(event,player){
				return (event.card&&event.card.name=='sha');
			},
			popup:false,
			forced:true,
			content:function(){
				if(Math.random()<0.5){
					trigger.num++;
					trigger.player.addSkill('chilongfengxue');
				}
			}
		},
		chilongfengxue:{
			trigger:{global:'shaAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.draw();
				player.removeSkill('chilongfengxue');
			}
		},
		shentou:{
			enable:'phaseUse',
			usable:1,
			filterCard:true,
			filter:function(event,player){
				var nh=player.num('h');
				if(nh==0) return false;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')>nh) return true;
				}
				return false;
			},
			check:function(card){
				return 8-ai.get.value(card);
			},
			filterTarget:function(card,player,target){
				if(target.get('h').length==0) return false;
				if(target==player) return false;
				if(target.num('h')<=player.num('h')) return false;
				return true;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					if(get.suit(card)=='club') return -1;
					return 1;
				});
				"step 1"
				if(result.bool){
					player.gain(target.get('h').randomGet());
					target.$give(1,player);
				}
			},
			ai:{
				basic:{
					order:5
				},
				result:{
					player:0.3,
					target:-1,
				}
			}
		},
		pusafazhou:{
			trigger:{player:'dieBefore'},
			forced:true,
			filter:function(event,player){
				return player.maxHp>0;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.hp=1;
				player.draw();
				player.discard(player.get('e',{subtype:'equip5'}));
				game.delay();
			}
		},
		old_longfan:{
			enable:'phaseUse',
			usable:1,
			prompt:'？',
			filterTarget:true,
			content:function(){
				"step 0"
				if(event.isMine()){
					event.longfan=ui.create.control('〇','〇','〇','〇',function(){
						event.longfan.status--;
					});
					event.longfan.status=4;
					for(var i=0;i<event.longfan.childNodes.length;i++){
						event.longfan.childNodes[i].num=0;
					}
					event.timer=setInterval(function(){
						if(event.longfan.status<=0){
							clearInterval(event.timer);
							game.resume();
							event.longfan.close();
							return;
						}
						event.count(0);
						if(event.longfan.status>1) event.count(1);
						if(event.longfan.status>2) event.count(2);
						if(event.longfan.status>3) event.count(3);
					},200);
					event.count=function(num){
						event.longfan.childNodes[num].num=(event.longfan.childNodes[num].num+1)%10;
						if(event.longfan.childNodes[num].num==2) event.longfan.childNodes[num].innerHTML='二';
						else event.longfan.childNodes[num].innerHTML=get.cnNumber(event.longfan.childNodes[num].num);
					}
					game.pause();
				}
				else{
					event.finish();
					var x=Math.random();
					if(x<0.1) target.draw();
					else if(x<0.2) target.chooseToDiscard(true);
					else if(x<0.3) target.loseHp();
					else if(x<0.4) target.recover();
					else if(x<0.6){
						if(ai.get.attitude(player,target)>0) target.draw();
						else target.chooseToDiscard(true);
					}
					else if(x<0.8){
						if(ai.get.attitude(player,target)>0) target.recover();
						else target.loseHp();
					}
				}
				"step 1"
				var str='';
				for(var i=0;i<event.longfan.childNodes.length;i++){
					str+=event.longfan.childNodes[i].num;
				}
				target.popup(str);
				game.delay();
				switch(str){
					case '0000':target.turnOver();break;
					case '1111':target.chooseToDiscard(2,true);break;
					case '2222':target.chooseToDiscard('e',true);break;
					case '3333':target.damage();break;
					case '4444':target.loseHp();break;
					case '5555':target.link();break;
					case '6666':target.draw();break;
					case '7777':target.recover();break;
					case '8888':target.discard(target.get('j'));break;
					case '9999':target.draw(2);target.chooseToDiscard(2,true);break;
					default:
					for(var i=1;i<4;i++){
						if(str[i]==str[0]) return;
					}
					player.chooseToDiscard(true);return;
				}
				player.draw();
			},
			ai:{
				basic:{
					order:10
				},
				result:{
					target:function(){
						return Math.random()-0.5;
					},
				}
			}
		},
		longfan:{
			enable:'phaseUse',
			usable:1,
			content:function(){
				"step 0"
				player.judge(function(card){
					switch(get.suit(card)){
						case 'heart':return player.maxHp>player.hp?2:0;
						case 'diamond':return 1;
						case 'club':return 1;
						case 'spade':return 0;
					}
				});
				"step 1"
				switch(result.suit){
					case 'heart':player.recover();break;
					case 'diamond':player.draw();break;
					case 'club':{
						player.chooseTarget('弃置一名角色的一张牌',function(card,player,target){
							return player!=target&&target.num('he')>0;
						}).ai=function(target){
							return -ai.get.attitude(player,target);
						};
						break;
					}
				}
				if(result.suit!='club'){
					event.finish();
				}
				"step 2"
				if(result.bool&&result.targets&&result.targets.length){
					player.discardPlayerCard(result.targets[0],'he',true);
				}
			},
			ai:{
				order:10,
				result:{
					player:1
				}
			}
		},
		touzhi:{
			enable:'phaseUse',
			usable:1,
			filterCard:function(card){
				return get.subtype(card)=='equip1';
			},
			filter:function(event,player){
				return player.num('he',{subtype:'equip1'})>0;
			},
			discard:false,
			prepare:function(cards,player,targets){
				player.$give(cards,targets[0]);
			},
			filterTarget:function(card,player,target){
				if(player==target) return false;
				return true;
			},
			content:function(){
				target.damage();
				target.gain(cards);
				game.delay();
			},
			check:function(card){
				return 10-ai.get.value(card);
			},
			position:'he',
			ai:{
				basic:{
					order:8
				},
				result:{
					target:-1
				}
			}
		},
		xixue:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.card&&event.card.name=='sha'&&player.hp<player.maxHp;
			},
			content:function(){
				player.recover(trigger.num);
			}
		},
		guangshatianyi:{
			trigger:{player:'damageBegin'},
			forced:true,
			filter:function(event,player){
				if(event.source&&event.source.num('s','unequip')) return;
				if(Math.random()>1/3) return false;
				if(event.parent.player.num('s','unequip')) return false;
				return true;
			},
			content:function(){
				trigger.num--;
			}
		},
		nigong:{
			trigger:{player:'damageAfter'},
			group:['nigong2'],
			forced:true,
			content:function(){
				player.storage.nigong+=trigger.num;
				if(player.storage.nigong>4){
					player.storage.nigong=4;
				}
			},
			ai:{
				threaten:0.6,
				effect:function(card,player,target){
					if(get.tag(card,'damage')) return [1,0.5];
				}
			},
			intro:{
				content:function(storage){
					return '已积攒'+storage+'点伤害';
				}
			}
		},
		nigong2:{
			enable:'phaseUse',
			usable:1,
			filter:function(event,player){
				return player.storage.nigong>1;
			},
			filterTarget:function(card,player,target){
				return player!=target;
			},
			content:function(){
				target.damage(Math.floor(player.storage.nigong/2));
				player.storage.nigong=0;
			},
			ai:{
				order:10,
				result:{
					target:function(player,target){
						return -Math.floor(player.storage.nigong/2);
					}
				}
			}
		},
		xujin:{
			trigger:{player:'phaseBefore'},
			check:function(){return false;},
			filter:function(event,player){
				return player.storage.xujin<player.hp;
			},
			content:function(){
				player.storage.xujin++;
				trigger.untrigger();
				trigger.finish();
			},
			intro:{
				content:function(storage){
					return '已积攒'+storage+'点力量';
				}
			},
			group:['xujin2']
		},
		xujin2:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return player.storage.xujin>0;
			},
			content:function(){
				trigger.num+=player.storage.xujin;
				player.storage.xujin--;
			}
		},
		sadengjinhuan:{
			trigger:{player:'shaMiss'},
			check:function(event,player){
				return ai.get.attitude(player,event.target)<0;
			},
			content:function(){
				"step 0"
				player.judge(function(card){
					return get.color(card)=='red'?1:0;
				})
				"step 1"
				if(result.bool){
					trigger.target.chooseToRespond({name:'shan'}).autochoose=lib.filter.autoRespondShan;
				}
				else{
					event.finish();
				}
				"step 2"
				if(!result.bool){
					trigger.untrigger();
					trigger.trigger('shaHit');
					trigger._result.bool=false;
				}
			}
		},
		ximohu:{
			trigger:{player:'damageBefore'},
			forced:true,
			filter:function(event){
				return event.nature=='thunder';
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.recover(trigger.num);
			},
			ai:{
				effect:function(card){
					if(get.tag(card,'thunderDamage')) return [0,2];
				}
			}
		},
		guiyanfadao:{
			trigger:{player:'useCardToBefore'},
			priority:5,
			filter:function(event,player){
				if(event.card.name=='sha'&&!event.card.nature) return true;
			},
			content:function(){
				trigger.card.nature='poison';
				player.addSkill('guiyanfadao2');
				player.storage.zhuque_skill=trigger.card;
			}
		},
		guiyanfadao2:{
			trigger:{player:'useCardAfter'},
			forced:true,
			popup:false,
			content:function(){
				delete player.storage.zhuque_skill.nature;
			}
		},
		tianxianjiu:{
			trigger:{source:'damageEnd'},
			filter:function(event){
				return (event.card&&(event.card.name=='sha'));
			},
			forced:true,
			content:function(){
				player.draw(2);
				player.removeSkill('tianxianjiu');
			}
		},
	},
	translate:{
		guiyanfadao:'鬼眼法刀',
		guiyanfadao_bg:'眼',
		// guiyanfadao_info:'你可以将一张普通杀当毒杀使用',
		tianxianjiu:'天仙酒',
		tianxianjiu_bg:'仙',
		tianxianjiu_info:'出牌阶段对自己使用，你使用的下一张杀造成伤害后可以摸两张牌',
		xiangyuye:'翔羽叶',
		xiangyuye_info:'出牌阶段，对一名攻击范围外的角色使用，令其弃置一张黑色手牌或流失一点体力',
		huanpodan:'还魄丹',
		huanpodan_bg:'魄',
		// huanpodan_info:'出牌阶段对一名已死亡角色使用，令其复活并回复一点体力，然后你流失一点体力',
		ximohu:'吸魔壶',
		ximohu_bg:'魔',
		// ximohu_info:'锁定技，你将即将受到的雷属性伤害转化为你的体力值',
		sadengjinhuan:'萨登荆环',
		sadengjinhuan_info:'当你的杀被闪避后，可以进行一次判定，若结果为红色目标需再打出一张闪',
		// sadengjinhuan_info:'锁定技，每当你使用一张杀被闪避后，若此杀在弃牌堆，你有50%的机率对目标再使用一次此杀',
		sadengjinhuan_bg:'荆',
		qipoguyu:'奇魄古玉',
		xujin:'蓄劲',
		xujin2:'蓄劲',
		// qipoguyu_info:'装备后获得蓄劲技能',
		xujin_info:'回合开始前，若你的蓄劲标记数小于当前的体力值，你可以跳过此回合，并获得一枚蓄劲标记。锁定技，每当你即将造成伤害，你令此伤害+X，然后弃置一枚蓄劲标记，X为你拥有的蓄劲标记数',
		guilingzhitao:'归灵指套',
		nigong:'逆攻',
		nigong2:'逆攻',
		nigong3:'逆攻',
		nigong4:'逆攻',
		// guilingzhitao_info:'装备后获得逆攻技能',
		nigong_info:'每当你受到一点伤害，你获得一个逆攻标记，标记数不能超4。出牌阶段，你可以弃置所有逆攻标记并令任意一名其他角色X/2点伤害，X为逆攻标记的数量且向下取整',
		baihupifeng:'白狐披风',
		baihupifeng_bg:'狐',
		baihupifeng_info:'回合结束阶段，若你的体力值是全场最小的之一，你可以回复一点体力',
		fengxueren:'封雪刃',
		fengxueren_bg:'雪',
		// fengxueren_info:'你使用杀击中目标后，可以防止伤害并令目标翻面，每回合限发动一次',
		chilongya:'赤龙牙',
		// chilongya_info:'锁定技，你即将造成的伤害均视为火焰伤害',
		daihuofenglun:'带火风轮',
		daihuofenglun_bg:'轮',
		// daihuofenglun_info:'你与其他角色的距离-2，其他角色与你的距离-1',
		xiayuncailing:'霞云彩绫',
		xiayuncailing_bg:'云',
		// xiayuncailing_info:'你与其他角色的距离+1，其他角色与你的距离+2',
		shentoumianju:'神偷面具',
		shentoumianju_bg:'偷',
		shentoumianju_info:'出牌阶段，你可以指定一名手牌比你多的角色进行一次判定，若结果不为梅花，你获得其一张手牌',
		shentou:'神偷',
		shentou_info:'出牌阶段，你可以进行一次判定，若结果不为梅花，你获得任意一名角色的一张手牌',
		pusafazhou:'菩萨发咒',
		pusafazhou_bg:'发',
		// pusafazhou_info:'令你抵挡一次死亡，将体力回复至1，并摸一张牌',
		yuhuanghua:'雨皇花',
		yuhuanghua_bg:'皇',
		// yuhuanghua_info:'令所有角色回复一点体力并摸一张牌',
		caoyao:'草药',
		caoyao_info:'出牌阶段，对距离为1以内的角色使用，回复一点体力。',
		pantao:'蟠桃',
		// pantao_info:'出牌阶段，对自己使用，回复两点体力。',
		langeguaiyi:'蓝格怪衣',
		langeguaiyi_bg:'格',
		langeguaiyi_info:'出牌阶段限一次，你可以进行一次判定，然后按花色执行以下效果。红桃：你回复一点体力；方片：你摸一张牌；梅花：你弃置一名其他角色的一张牌；黑桃：无事发生',
		longfan:'龙帆',
		longfan_info:'出牌阶段限一次，你可以进行一次判定，然后按花色执行以下效果。红桃：你回复一点体力；方片：你摸一张牌；梅花：你弃置一名其他角色的一张牌；黑桃：无事发生',
		// longfan_info:'0000：翻面；1111：弃手牌；2222：弃装备牌；3333：受伤害；4444：流失体力；5555：连环；6666：摸牌；7777：回复体力；8888：弃置判定牌；9999：置衡',
		guiyoujie:'鬼幽结',
		guiyoujie_info:'出牌阶段，对一名其他角色使用。若判定结果为黑色，则将其翻面。',
		yufulu:'御夫录',
		yufulu_info:'仅女性角色可以使用，出牌阶段，可弃置一张武器牌令一名角色受到一点伤害，然后该角色获得此武器牌',
		touzhi:'投掷',
		touzhi_info:'出牌阶段，可弃置一张武器牌令一名角色受到一点伤害，然后该角色获得此武器牌',
		xixueguizhihuan:'吸血鬼指环',
		xixueguizhihuan_info:'锁定技，每当你使用杀造成一点伤害，你回复一点体力',
		xixue:'吸血',
		xixue_info:'锁定技，每当你使用杀造成一点伤害，你回复一点体力',
		zhufangshenshi:'祠符',
		zhufangshenshi_info:'出牌阶段，对一名相邻角色使用，与其交换位置',
		jingleishan:'惊雷闪',
		jingleishan_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【杀】，否则受到1点雷电伤害。',
		chiyuxi:'炽羽袭',
		chiyuxi_info:'出牌阶段，对所有其他角色使用。每名目标角色需打出一张【闪】，否则受到1点火焰伤害。',
		guangshatianyi:'光纱天衣',
		guangshatianyi_bg:'纱',
		// guangshatianyi_info:'仅女性可装备，锁定技，每当你即将受到伤害，有三分之一的概率令伤害减一',
	},
	list:[
		['spade',1,'baihupifeng'],
		// ['club',1,'fengxueren'],
		['diamond',1,'langeguaiyi'],
		// ['heart',1,'daihuofenglun','fire'],

//		['diamond',2,'xiayuncailing'],
		// ['spade',2,'pusafazhou'],
//		['heart',2,'pantao'],
		//['club',2,'huanpodan'],

		['club',3,'caoyao'],
		// ['diamond',3,'chilongya','fire'],
		['spade',3,'guiyoujie'],
		//['heart',3,'xiangyuye','poison'],

		['club',4,'caoyao'],
		['spade',4,'zhufangshenshi'],
		//['spade',4,'huanpodan'],
//		['diamond',4,'xiangyuye','poison'],

		['club',5,'caoyao'],
		['spade',5,'xixueguizhihuan'],
		//['diamond',5,'huanpodan'],

		['club',6,'shentoumianju'],
		['spade',6,'yufulu'],
//		['heart',6,'xiangyuye','poison'],
		//['diamond',6,'xiangyuye','poison'],

		['diamond',7,'chiyuxi','fire'],
		['club',7,'jingleishan','thunder'],
		// ['spade',7,'guilingzhitao'],
//		['heart',7,'xiangyuye','poison'],

		['spade',8,'zhufangshenshi'],
		['club',8,'xiangyuye'],
		//['heart',8,'huanpodan'],

		// ['spade',9,'ximohu','brown'],
		['club',9,'guiyoujie'],
		['diamond',9,'xiangyuye'],

		// ['diamond',9,'tianxianjiu'],
		['heart',9,'tianxianjiu'],
		['spade',5,'jiu'],
		['diamond',2,'tianxianjiu'],

		//['spade',10,'qipoguyu'],
		//['diamond',10,'xiangyuye','poison'],

		['spade',11,'xiangyuye'],
		// ['club',11,'xiangyuye','poison'],

//		['diamond',12,'xiangyuye','poison'],
		//['spade',12,'guiyanfadao','poison'],

		// ['heart',13,'yuhuanghua'],
		// ['diamond',13,'guangshatianyi'],
		['club',13,'sadengjinhuan'],
		//['spade',6,'xiangyuye','poison'],
	],
}
