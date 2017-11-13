'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'diy',
		connect:true,
		connectBanned:['diy_tianyu','diy_yangyi','diy_lukang','ns_huamulan'],
		character:{
			// diy_caocao:['male','wei',4,['xicai','diyjianxiong','hujia']],
			// diy_hanlong:['male','wei',4,['siji','ciqiu']],
			diy_feishi:['male','shu',3,['shuaiyan','moshou']],
			diy_liuyan:['male','shu',3,['juedao','geju']],
			// diy_luxun:['male','wu',3,['shaoying','zonghuo']],
			diy_yuji:['male','qun',3,['diyguhuo','diychanyuan']],
			// diy_zhouyu:['male','wu',3,['jieyan','honglian']],
			// diy_zhouyu:['male','wu',3,['xiongzi','yaliang']],
			diy_caiwenji:['female','qun',3,['beige','guihan']],
			diy_lukang:['male','wu',4,['luweiyan','qianxun']],
			// diy_xuhuang:['male','wei',4,['diyduanliang']],
			// diy_dianwei:['male','wei',4,['diyqiangxi']],
			// diy_huangzhong:['male','shu',4,['liegong','fuli']],
			// diy_weiyan:['male','shu',4,['diykuanggu']],
			diy_zhenji:['female','wei',3,['diy_jiaoxia','yiesheng']],
			// diy_menghuo:['male','shu',4,['huoshou','zaiqix']],
			re_huangyueying:['female','shu',3,['rejizhi','qicai']],

			diy_liufu:['male','wei',3,['zhucheng','duoqi']],
			diy_xizhenxihong:['male','shu',4,['fuchou','jinyan']],
			diy_liuzan:['male','wu',4,['kangyin']],
			diy_zaozhirenjun:['male','wei',3,['liangce','jianbi','juntun']],
			diy_yangyi:['male','shu',3,['choudu','liduan']],
			diy_tianyu:['male','wei',4,['chezhen','youzhan']],

			ns_zuoci:['male','qun',3,['nsxinsheng','nsdunxing']],
			ns_lvzhi:['female','qun',3,['nsnongquan','nsdufu']],
			ns_wangyun:["male","qun",4,["liangji","jugong","chengmou"]],
			ns_nanhua:["male","qun",3,["nshuanxian","nstaiping","nsshoudao"]],
			ns_nanhua_left:["male","qun",2,[],['unseen']],
			ns_nanhua_right:["female","qun",2,[],['unseen']],
			ns_huamulan:['female','qun',3,['nscongjun','xiaoji','gongji']],
			ns_huangzu:['male','qun',4,['nsjihui','nsmouyun']],
			ns_jinke:['male','qun',4,['nspinmin','nsshishou']],
			ns_yanliang:['male','qun',4,['nsduijue','nsshuangxiong','dualside'],['dualside:ns_wenchou']],
			ns_wenchou:['male','qun',2,['nsguanyong','dualside'],['unseen']],
		},
		characterIntro:{
			diy_feishi:'字公举，生卒年不详，益州犍为郡南安县（今四川省乐山市）人。刘璋占据益州时，以费诗为绵竹县县令。刘备进攻刘璋夺取益州，费诗举城而降，后受拜督军从事，转任牂牁郡太守，再为州前部司马。',
			diy_liuyan:'字元海，新兴（今山西忻州北）人，匈奴族，匈奴首领冒顿单于之后[1]  ，南匈奴单于于夫罗之孙，左贤王刘豹之子，母呼延氏，十六国时期前赵政权开国皇帝，304年－310年在位。',
			diy_lukang:'字幼节，吴郡吴县（今江苏苏州）人。三国时期吴国名将，丞相陆逊次子。',
			diy_liufu:'字元颖，沛国相县（今安徽濉溪县西北）人。东汉末年名守。在汉末避难于淮南，说服袁术将戚寄和秦翊率部投奔曹操，曹操大悦，使司徒辟其为掾属。',
			diy_xizhenxihong:'习珍，襄阳人。三国时蜀汉将领。先主刘备时曾任零陵北部都尉，加裨将军。建安二十四年，关羽率荆州大军攻打樊城，唯有习珍据城不降。被困月余，直到箭尽粮绝，拔剑自刎而死。习宏，生卒年不详，习珍之弟。曾在东吴入侵蜀汉时建议哥哥习珍伪降，约樊胄举兵。习珍死后，弟弟习宏落在东吴，有问必不答，终身不为孙权发一言。',
			diy_zaozhirenjun:'枣祗，生卒年月不详，东汉末年颍川阳翟（今河南省禹州市）人。曾任东阿令、羽林监、屯田都尉、陈留太守等职。任峻（？—204年），字伯达，河南郡中牟县人。曹操每次出征，任峻通常在后方补给军队。后来发生饥荒，枣祗建议实施屯田，任峻被任命为典农中郎将，招募百姓在许下屯田，结果连年丰收，积谷足以装满全部粮仓。',
			diy_yangyi:'字威公，襄阳（今湖北襄阳）人，三国时期蜀汉政治家。最初，为荆州刺史傅群的主簿，后投奔关羽，任为功曹。羽遣其至成都，大受刘备赞赏，擢为尚书。建兴三年（225年）任丞相参军，此后一直跟随诸葛亮战斗。亮卒，他部署安全退军。亮生前定蒋琬继己任，仪仅拜中军师。建兴十三年（235年），因多出怨言，被削职流放至汉嘉郡。但杨仪仍不自省，又上书诽谤，言辞激烈，最后下狱，自杀身亡。',
			diy_tianyu:'字国让，渔阳雍奴（今天津市武清区东北）人。三国时期曹魏将领。初从刘备，因母亲年老回乡，后跟随公孙瓒，公孙瓒败亡，劝说鲜于辅加入曹操。曹操攻略河北时，田豫正式得到曹操任用，历任颖阴、郎陵令、弋阳太守等。',
		},
		characterTitle:{
			ns_zuoci:'#bskystarwuwei',
			ns_lvzhi:'#bskystarwuwei',
			ns_wangyun:'#rSukincen',
			ns_nanhua:'#g戒除联盟',
			ns_huamulan:'#p哎别管我是谁',
			ns_jinke:'#p哎别管我是谁',
			ns_huangzu:'#r小芯儿童鞋',
			ns_yanliang:'#r丶橙续缘',
			ns_wenchou:'#r丶橙续缘',
		},
		perfectPair:{
			yuji:['zuoci']
		},
		skill:{
			nspinmin:{
				trigger:{player:'dieBefore'},
				forced:true,
				filter:function(event,player){
					return player.maxHp>0;
				},
				content:function(){
					trigger.cancel();
					player.hp=1;
					player.update();
					if(_status.currentPhase==player){
						var num=4;
						// if(game.countPlayer()>=7){
						// 	num=5;
						// }
						if(!player.hasSkill('nspinmin_used')&&player.maxHp<num){
							player.gainMaxHp(true);
							player.addTempSkill('nspinmin_used');
						}
					}
					else{
						player.loseMaxHp(true);
					}
				},
				subSkill:{
					used:{}
				}
			},
			nsshishou:{
				trigger:{player:'loseEnd'},
				forced:true,
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.draw();
				},
				group:'nsshishou_use',
				subSkill:{
					use:{
						mod:{
							cardEnabled:function(card,player){
								if(_status.currentPhase!=player) return;
								if(get.cardCount(true,player)>=4){
									return false;
								}
							}
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'save')){
								if(_status.currentPhase==player) return 0;
								if(target.maxHp>1&&player!=target) return 0;
							}
							if(get.tag(card,'recover')){
								if(_status.currentPhase==player) return 0;
							}
						}
					}
				}
			},
			nsduijue:{
				trigger:{player:'phaseUseBegin'},
    			direct:true,
				filter:function(event,player){
					return player.countCards('h');
				},
    			content:function(){
    				"step 0"
					var color={
						black:player.countCards('h',function(card){
							return get.color(card)=='red'&&get.value(card)<8;
						}),
						red:player.countCards('h',function(card){
							return get.color(card)=='black'&&get.value(card)<8;
						})
					};
    				player.chooseToDiscard(get.prompt2('nsduijue')).set('ai',function(card){
						var num=_status.event.color[get.color(card)];
						if(_status.event.goon&&num>=1){
							return 7+num-get.value(card);
						}
					}).set('goon',game.hasPlayer(function(current){
						return get.effect(current,{name:'juedou'},player,player)>0;
					})).set('color',color).set('logSkill','nsduijue');
    				"step 1"
					if(result.bool){
						player.addTempSkill('nsduijue_use');
	    				player.storage.nsduijue_use=get.color(result.cards[0]);
					}
    			},
				subSkill:{
					use:{
						enable:'phaseUse',
		    			viewAs:{name:'juedou'},
						filter:function(event,player){
							return player.hasCard(function(card){
			    				return get.color(card)!=player.storage.nsduijue_use;
			    			});
						},
		    			filterCard:function(card,player){
		    				return get.color(card)!=player.storage.nsduijue_use;
		    			},
		    			check:function(card){
		    				return 8-get.value(card);
		    			},
		    			ai:{
		    				basic:{
		    					order:10
		    				}
		    			}
					}
				}
			},
			nsshuangxiong:{
				trigger:{player:'juedouBegin',target:'juedouBegin'},
				check:function(event,player){
					return player.isTurnedOver();
				},
				content:function(){
					player.turnOver();
				}
			},
			nsguanyong:{
				enable:'chooseToRespond',
				filterCard:true,
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(!player.countCards('h')) return false;
				},
				prompt:'将一张手牌当杀打出',
				check:function(card){return 7-get.value(card)},
				ai:{
					respondSha:true,
	                skillTagFilter:function(player,tag,arg){
						if(arg!='respond') return false;
						if(!player.countCards('h')) return false;
					},
				}
			},
			nsjihui:{
				trigger:{global:'discardAfter'},
				filter:function(event,player){
					return event.cards.length>=3;
				},
				content:function(){
					player.insertPhase();
					player.storage.nsjihui_use=_status.currentPhase;
					player.addSkill('nsjihui_use');
				},
				subSkill:{
					use:{
						mark:'character',
						intro:{
							content:'使用牌只能指定自己与$为目标'
						},
						trigger:{player:'phaseAfter'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.skill=='nsjihui';
						},
						onremove:true,
						content:function(){
							player.removeSkill('nsjihui_use');
						},
						mod:{
							playerEnabled:function(card,player,target){
							   if(player!=target&&player.storage.nsjihui_use!=target) return false;
						   }
						}
					}
				}
			},
			nsmouyun:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hp%2==1||game.roundNumber%2==1;
				},
				filterTarget:function(card,player,target){
					return target.isMinHp()&&target!=player&&target.isDamaged();
				},
				content:function(){
					if(target.isDamaged()){
						player.discardPlayerCard(target,'hej',target.maxHp-target.hp,true);
					}
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							return target.hp-target.maxHp;
						}
					}
				}
			},
			nscongjun:{
				forbid:['guozhan'],
				unique:true,
				forceunique:true,
				init:function(player){
					if(player.storage.nscongjun_show) return false;
					var change=function(target){
						if(target==player){
							var list;
		    				if(_status.connectMode){
		    					list=get.charactersOL(function(i){
		    						return lib.character[i][0]!='male';
		    					});
		    				}
		    				else{
		                        list=get.gainableCharacters(function(info){
		                            return info[0]=='male';
		                        });
		    				}
							var name=list.randomGet();
							target.reinit('ns_huamulan',name,'nosmooth');
							target.storage.nscongjun_show=name;
							target.addSkill('nscongjun_show');
							player._inits.remove(change);
						}
					}
					if(!player._inits){
						player._inits=[];
					}
					player._inits.push(change);
				},
				subSkill:{
					show:{
						trigger:{global:'useCard'},
						filter:function(event,player){
							return player.getEnemies().contains(event.player)&&event.card.name=='wuxie'&&event.getRand()<0.1;
						},
						direct:true,
						skillAnimation:true,
						animationColor:'thunder',
						content:function(){
							'step 0'
							game.delay(0.5);
							'step 1'
							player.reinit(player.storage.nscongjun_show,'ns_huamulan','nosmooth');
							player.logSkill('nscongjun_show',trigger.player);
							'step 2'
							player.removeSkill('nscongjun_show');
							trigger.player.damage(2);
						}
					}
				}
			},
			nstaiping:{
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return !event.nshuanxian&&player.getSubPlayers('nshuanxian').length;
				},
				direct:true,
				priority:-0.1,
				ai:{
					maixie:true,
					maixie_hp:true
				},
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					var left=player.storage.nshuanxian_left;
					var right=player.storage.nshuanxian_right;
					var list=[];
					var choice=0;
					var hpleft=0;
					var maxleft=0;
					if(left&&player.hasSkill(left)){
						if(player.storage[left].hp<player.storage[left].maxHp){
							list.push('令幻身·左回复一点体力');
							hpleft=player.storage[left].hp;
						}
						list.push('令幻身·左增加一点体力上限');
						maxleft=player.storage[left].hp;
					}
					if(left&&player.hasSkill(right)){
						if(player.storage[right].hp<player.storage[right].maxHp){
							list.push('令幻身·右回复一点体力');
							if(!hpleft||player.storage[right].hp<hpleft||
								(player.storage[right].hp==hpleft&&Math.random()<0.5)){
								choice=list.length-1;
							}
						}
						list.push('令幻身·右增加一点体力上限');
						if(!hpleft&&maxleft&&choice==0){
							if(player.storage[right].maxHp<maxleft||
								(player.storage[right].maxHp==maxleft&&Math.random()<0.5)){
								choice=list.length-1;
							}
						}
					}
					if(!list.length){
						event.finish();
						return;
					}
					event.map={};
					for(var i=0;i<list.length;i++){
						event.map['选项'+get.cnNumber(i+1,true)]=list[i];
					}
					player.chooseControlList(list,function(){
						return _status.event.choice;
					}).set('prompt',get.prompt('nstaiping')).set('choice',choice);
					'step 2'
					var left=player.storage.nshuanxian_left;
					var right=player.storage.nshuanxian_right;
					if(result.control!='cancel2'){
						player.logSkill('nstaiping');
						switch(event.map[result.control]){
							case '令幻身·左回复一点体力':player.storage[left].hp++;break;
							case '令幻身·左增加一点体力上限':player.storage[left].maxHp++;break;
							case '令幻身·右回复一点体力':player.storage[right].hp++;break;
							case '令幻身·右增加一点体力上限':player.storage[right].maxHp++;break;
						}
						game.log(player,event.map[result.control].replace(/一/,'了一'));
					}
					'step 3'
					if(event.num>1){
						event.num--;
						event.goto(1);
					}
				}
			},
			nsshoudao:{
				group:['nsshoudao_gain','nsshoudao_die'],
				subSkill:{
					gain:{
						trigger:{player:'subPlayerDie'},
						forced:true,
						filter:function(event,player){
							var left=player.storage.nshuanxian_left;
							if(left&&player.hasSkill(left)) return false;
							var right=player.storage.nshuanxian_right;
							if(right&&player.hasSkill(right)) return false;
							if(!player.storage.nshuanxian_damage) return false;
							return true;
						},
						content:function(){
							player.addSkill('releiji');
							player.addSkill('guidao');
						}
					},
					die:{
						trigger:{player:'dieBegin'},
						direct:true,
						filter:function(event,player){
							if(game.countPlayer()<=2) return false;
							var left=player.storage.nshuanxian_left;
							if(left&&player.hasSkill(left)) return true;
							var right=player.storage.nshuanxian_right;
							if(right&&player.hasSkill(right)) return true;
							return false;
						},
						content:function(){
							'step 0'
							var str;
							var left=player.storage.nshuanxian_left;
							var right=player.storage.nshuanxian_right;
							if(left&&player.hasSkill(left)&&right&&player.hasSkill(right)){
								str='令一名其他角色获得技能【雷击】和【鬼道】';
							}
							else{
								str='令一名其他角色获得技能【雷击】或【鬼道】';
							}
							if(trigger.source){
								str+='（'+get.translation(trigger.source)+'除外）';
							}
							player.chooseTarget(function(card,player,target){
								return target!=player&&target!=_status.event.source;
							},get.prompt('nsshoudao')).set('ai',function(target){
								if(target.hasSkill('releiji')) return 0;
								return get.attitude(_status.event.player,target);
							}).set('source',trigger.source).set('prompt2',str);
							'step 1'
							var goon=false;
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('nsshoudao',target);
								var left=player.storage.nshuanxian_left;
								var right=player.storage.nshuanxian_right;
								if(left&&player.hasSkill(left)&&right&&player.hasSkill(right)){
									target.addSkillLog('releiji');
									target.addSkillLog('guidao');
								}
								else{
									event.target=target;
									player.chooseControl('releiji','guidao').set('prompt','令'+get.translation(target)+'获得一项技能');
									goon=true;
								}
							}
							if(!goon){
								event.finish();
							}
							'step 2'
							event.target.addSkillLog(result.control);
						}
					}
				}
			},
			nshuanxian:{
				trigger:{global:'gameStart',player:'enterGame'},
				forced:true,
				nosub:true,
				unique:true,
				group:['nshuanxian_left','nshuanxian_right','nshuanxian_damage','nshuanxian_swap'],
				content:function(){
					player.storage.nshuanxian_right=player.addSubPlayer({
						name:'ns_nanhua_right',
						skills:['nshuanxian_left','nshuanxian_draw','nshuanxian_swap'],
						hp:2,
						maxHp:2,
						hs:get.cards(2),
						skill:'nshuanxian',
						intro:'你的本体回合结束后，切换至此随从并进行一个额外的回合；若你的上家与下家不同，在你的下家的准备阶段，切换至此随从',
						intro2:'当前回合结束后切换回本体',
						onremove:function(player){
							delete player.storage.nshuanxian_right;
						}
					});
				},
				ai:{
					effect:{
						target:function(card,player,target){
    						if(get.tag(card,'damage')){
    							if(!target.hasFriend()) return;
								if(target.hp<=2) return;
    							if(!target.storage.nshuanxian_damage){
									if(get.attitude(player,target)<0||get.tag(card,'multineg')) return [0,1];
									return [1,1];
								}
    						}
    					}
					}
				},
				// mod:{
				// 	globalFrom:function(from,to,distance){
                //
				// 	},
				// 	globalTo:function(from,to,distance){
                //
				// 	}
				// },
				// global:'nshuanxian_choose',
				subSkill:{
					chosen:{},
					leftdist:{
						mod:{
							globalFrom:function(from,to,distance){

							},
							globalTo:function(from,to,distance){

							}
						}
					},
					rightdist:{
						mod:{
							globalFrom:function(from,to,distance){

							},
							globalTo:function(from,to,distance){

							}
						}
					},
					swap:{
						trigger:{global:'phaseBegin'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.player!=player;
						},
						priority:20,
						content:function(){
							var next=player.getNext();
							var prev=player.getPrevious();
							var left=player.storage.nshuanxian_left;
							var right=player.storage.nshuanxian_right;
							if(prev==next||(trigger.player!=next&&trigger.player!=prev)){
								if(player.hasSkill('subplayer')){
									player.exitSubPlayer();
								}
							}
							else if(prev==trigger.player&&player.name!=left&&left){
								if(!player.hasSkill('subplayer')){
									player.callSubPlayer(left);
								}
								else{
									player.toggleSubPlayer(left);
								}
							}
							else if(next==trigger.player&&player.name!=right&&right){
								if(!player.hasSkill('subplayer')){
									player.callSubPlayer(right);
								}
								else{
									player.toggleSubPlayer(right);
								}
							}
						}
					},
					damage:{
						trigger:{player:'damageEnd'},
						forced:true,
						filter:function(event,player){
							return !player.storage.nshuanxian_damage;
						},
						content:function(){
							player.storage.nshuanxian_damage=true;
							player.storage.nshuanxian_left=player.addSubPlayer({
								name:'ns_nanhua_left',
								skills:['nshuanxian_middle','nshuanxian_draw','nshuanxian_swap'],
								hp:2,
								maxHp:2,
								hs:get.cards(2),
								skill:'nshuanxian',
								intro:'你的本体回合开始前，切换至此随从并进行一个额外的回合；若你的上家与下家不同，在你的上家的准备阶段，切换至此随从',
								intro2:'当前回合结束后切换回本体',
								onremove:function(player){
									delete player.storage.nshuanxian_left;
								}
							});
							trigger.nshuanxian=true;
						}
					},
					draw:{
						trigger:{player:'phaseDrawBegin'},
						silent:true,
						filter:function(event){
							return event.num>0;
						},
						content:function(){
							trigger.num--;
						}
					},
					left:{
						trigger:{player:'phaseBefore'},
						forced:true,
						popup:false,
						priority:40,
						filter:function(event,player){
							if(event.skill=='nshuanxian_middle') return false;
							if(event.skill=='nshuanxian_right') return false;
							var left=player.storage.nshuanxian_left;
							if(player.hasSkill('subplayer')){
								if(!left) return player.name==player.storage.nshuanxian_right;
								return player.storage.subplayer.skills.contains(left);
							}
							else{
								if(!left) return false;
								return player.hasSkill(left);
							}
						},
						content:function(){
							if(player.hasSkill('subplayer')){
								var left=player.storage.nshuanxian_left;
								if(left&&player.storage.subplayer.skills.contains(left)){
									player.toggleSubPlayer(player.storage.nshuanxian_left);
								}
								else{
									player.exitSubPlayer();
								}
							}
							else{
								player.callSubPlayer(player.storage.nshuanxian_left);
							}
						}
					},
					middle:{
						trigger:{player:['phaseAfter','phaseCancelled']},
						forced:true,
						popup:false,
						priority:-40,
						filter:function(event,player){
							if(player.hasSkill('nshuanxian_chosen')) return false;
							return true;
						},
						content:function(){
							player.exitSubPlayer();
							player.insertPhase(null,true);
						}
					},
					right:{
						trigger:{player:['phaseAfter','phaseCancelled']},
						forced:true,
						popup:false,
						priority:-40,
						filter:function(event,player){
							if(player.hasSkill('nshuanxian_chosen')) return false;
							if(player.hasSkill('subplayer')) return false;
							var right=player.storage.nshuanxian_right;
							if(!right) return false;
							return player.hasSkill(right);
						},
						content:function(){
							player.callSubPlayer(player.storage.nshuanxian_right);
							player.insertPhase(null,true);
							player.addTempSkill('nshuanxian_chosen',['phaseBegin','phaseCancelled']);
						}
					},
					end:{
						trigger:{player:['phaseAfter','phaseCancelled']},
						forced:true,
						popup:false,
						priority:-40,
						filter:function(event,player){
							if(player.hasSkill('nshuanxian_chosen')) return false;
							return true;
						},
						content:function(){
							if(player.hasSkill('subplayer')){
								player.exitSubPlayer();
							}
						},
						content_old:function(){
							'step 0'
							var controls=['本体'];
							var left=player.storage.nshuanxian_left;
							var right=player.storage.nshuanxian_right;
							if(player.hasSkill('subplayer')){
								if(player.storage.subplayer.skills.contains(left)){
									controls.unshift('幻身·左');
								}
								if(player.storage.subplayer.skills.contains(right)){
									controls.push('幻身·右');
								}
							}
							else{
								if(player.hasSkill(left)){
									controls.unshift('幻身·左');
								}
								if(player.hasSkill(right)){
									controls.push('幻身·右');
								}
							}
							if(controls.length>1){
								player.chooseControl(controls,function(event,player){
									return Math.floor(Math.random()*_status.event.num);
								}).set('prompt','选择一个形态直到下一回合开始').set('num',controls.length);
							}
							else{
								event.finish();
							}
							'step 1'
							switch(result.control){
								case '幻身·左':{
									if(!player.hasSkill('subplayer')){
										player.callSubPlayer(player.storage.nshuanxian_left);
									}
									else{
										player.toggleSubPlayer(player.storage.nshuanxian_left);
									}
									break;
								}
								case '幻身·右':{
									if(!player.hasSkill('subplayer')){
										player.callSubPlayer(player.storage.nshuanxian_right);
									}
									break;
								}
								default:{
									if(player.hasSkill('subplayer')){
										player.exitSubPlayer();
									}
									break;
								}
							}
							player.addTempSkill('nshuanxian_chosen','phaseBegin');
						}
					}
				}
			},
			nsnongquan:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h')==1&&player.canUse('wuzhong',player);
				},
				direct:true,
				delay:0,
				content:function(){
					player.useCard({name:'wuzhong'},player.getCards('h'),player,'nsnongquan');
				},
				ai:{
					order:10,
					result:{
						player:function(player,target){
							return 10-get.value(player.getCards('h')[0]);
						}
					}
				}
			},
			nsdufu:{
				trigger:{source:'damageBefore'},
				check:function(event,player){
					return event.player.hasSkillTag('maixie');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('nsdufu'),function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						if(_status.event.bool){
							return -get.attitude(_status.event.player,target);
						}
						return 0;
					}).set('bool',trigger.player.hasSkillTag('maixie_defend'));
					'step 1'
					if(result.bool){
						player.logSkill('nsdufu',result.targets);
						trigger.source=result.targets[0];
						trigger.untrigger();
						trigger.trigger('damageBefore');
					}
				}
			},
			rejizhi:{
				audio:2,
				usable:3,
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event){
					var type=get.type(event.card,'trick');
					return (type=='trick'||type=='equip')&&event.cards[0]&&event.cards[0]==event.card;
				},
				content:function(){
					"step 0"
					var cards=get.cards();
					player.gain(cards,'gain2','log');
					if(get.type(cards[0])!='basic'){
						event.finish();
					}
					"step 1"
					player.chooseToDiscard('h',true);
				},
				ai:{
					threaten:1.4
				}
			},
			yiesheng:{
				enable:'phaseUse',
				filterCard:{color:'black'},
				filter:function(event,player){
					return player.countCards('h',{color:'black'})>0;
				},
				selectCard:[1,Infinity],
				prompt:'弃置任意张黑色手牌并摸等量的牌',
				check:function(card){return 5-get.value(card)},
				content:function(){
					player.draw(cards.length);
				},
				ai:{
					order:1,
					result:{
						player:1
					},
				},
			},
			jugong: {
				trigger: {
					global: "damageEnd",
				},
				usable: 1,
				frequent: true,
				locked: false,
				notemp: true,
				init: function(player) {
					player.storage.jugong = [];
				},
				filter: function(event, player) {
					return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink() && _status.currentPhase != player;

				},
				content: function() {
					"step 0"
					player.draw();
					"step 1"
					if (player.countCards('h')) {
						player.chooseCard('将' + get.cnNumber(1) + '张手牌置于武将牌上作为“功”', 1, true);
					} else {
						event.finish();
					}
					"step 2"
					if (result.cards && result.cards.length) {
						player.lose(result.cards, ui.special);
						player.storage.jugong = player.storage.jugong.concat(result.cards);
						player.syncStorage('jugong');
						player.markSkill('jugong');
						game.log(player, '将', result.cards, '置于武将牌上作为“功”');
					}
				},
				intro: {
					content: "cards",
				},
				group: "jugong_1",
				subSkill: {
					"1": {
						trigger: {
							player: "damageBegin",
						},
						filter: function(event, player) {
							return player.storage.jugong.length > 1;
						},
						content: function() {
							'step 0'
							player.chooseCardButton('移去两张“功”', 2, player.storage.jugong, true);
							'step 1'
							if (event.directresult || result.bool) {
								player.logSkill('jugong');
								var links = event.directresult || result.links;
								for (var i = 0; i < links.length; i++) {
									player.storage.jugong.remove(links[i]);
								}
								player.syncStorage('jugong');
								if (!player.storage.jugong.length) {
									player.unmarkSkill('jugong');
								} else {
									player.markSkill('jugong');
								}
								player.$throw(links);
								game.log(player, '被移去了', links);
								for (var i = 0; i < links.length; i++) {
									ui.discardPile.appendChild(links[i]);
								}
							}
							'step 2'
							trigger.cancel();
						},
						sub: true,
					},
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					threaten: 0.8,
					effect: {
						target: function(card, player, target) {
							if (get.tag(card, 'damage')) {
								if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
								if (!target.hasFriend()) return;
								if (target.hp >= 4) return [0.5, get.tag(card, 'damage') * 2];
								if (!target.hasSkill('paiyi') && target.hp > 1) return [0.5, get.tag(card, 'damage') * 1.5];
								if (target.hp == 3) return [0.5, get.tag(card, 'damage') * 1];
								if (target.hp == 2) return [1, get.tag(card, 'damage') * 0.5];
							}
						},
					},
				},
			},
			liangji:{
				enable: "phaseUse",
				usable: 1,
				filterTarget: function(card, player, target) {
					return target != player;
				},
				content: function() {
					'step 0'
					player.chooseCard('h', '连计：将1张牌置于' + get.translation(target) + '的武将牌上', true).set('ai', function(card) {
						if (get.attitude(_status.event.player, _status.event.getParent().player) > 0) {
							return 7 - get.value(card);
						}
						return -get.value(card);
					});
					'step 1'
					if (result.bool) {
						player.$give(result.cards, target);
						player.lose(result.cards, ui.special);
						target.storage.liangji_1 = result.cards;
						target.storage.liangji_1_source = target;
						target.syncStorage('liangji_1');
						target.addSkill('liangji_1');
					}
				},
				ai: {
					order: 1,
					result: {
						target:function(player, target) {
							if(target.sex=='female') return 1.5;
							if(target.sex=='male') return 1;
						}
					},
				},
				subSkill: {
					"1": {
						trigger: {
							player: "phaseDrawBegin",
						},
						forced: true,
						mark: true,
						intro: {
							content: "cards",
						},
						content: function() {
							'step 0'
							var cards = player.storage.liangji_1;
							if (cards) {
								player.gain(cards, 'gain2');
							}
							player.storage.liangji_1 = 0;
							'step 1'
							if (player.sex == 'male') player.addTempSkill('wushuang');
							if (player.sex == 'female') player.addTempSkill('lijian');
							player.removeSkill('liangji_1');
						},
						sub: true,
					},
				},
			},
			chengmou:{
				trigger: {
					player: "phaseDrawBegin",
				},
				frequent: true,
				filter: function(event, player) {
					return player.storage.jugong.length > 0;
				},
				content: function(){
					'step 0'
					if (player.storage.jugong.length > 2) player.loseHp();
					'step 1'
					var cards = player.storage.jugong;

					if (cards) {
						player.gain(cards, 'gain2');
					}
					player.storage.jugong = [];
					player.unmarkSkill('jugong');
				}
			},
			nsxinsheng:{
				trigger:{source:'damageEnd'},
				frequent:true,
				filter:function(event,player){
					return player.isHealthy();
				},
				content:function(){
					player.gainMaxHp(trigger.num,true);
					player.draw(trigger.num);
				}
			},
			nsdunxing:{
				trigger:{player:'damageBefore'},
				filter:function(event,player){
					return player.isDamaged();
				},
				content:function(){
					trigger.cancel();
					player.loseMaxHp(trigger.num,true);
					player.draw(trigger.num);
				}
			},
			liangce:{
				enable:'phaseUse',
				viewAs:{name:'wugu'},
				usable:1,
				filterCard:{type:'basic'},
				filter:function(event,player){
					return player.countCards('h',{type:'basic'})>0;
				},
				check:function(card){
					return 6-get.value(card);
				},
				group:'liangce2'
			},
			liangce2:{
				trigger:{global:'wuguRemained'},
				direct:true,
				filter:function(event){
					return event.remained.length>0;
				},
				content:function(){
					'step 0'
					var du=0;
					for(var i=0;i<trigger.remained.length;i++){
						if(trigger.remained[i].name=='du') du++;
					}
					var dialog=ui.create.dialog(get.prompt('liangce'),trigger.remained,'hidden');
					dialog.classList.add('noselect');
					player.chooseTarget(dialog).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(du>=trigger.remained.length/2) return -att;
						return att;
					});
					'step 1'
					if(result.bool){
						player.logSkill('liangce',result.targets);
						result.targets[0].gain(trigger.remained.slice(0),'gain2','log');
						trigger.remained.length=0;
					}
				}
			},
			jianbi:{
				trigger:{global:'useCard'},
				priority:5,
				filter:function(event,player){
					if(get.type(event.card)!='trick') return false;
					if(get.info(event.card).multitarget) return false;
					if(event.targets.length<2) return false;
					if(!event.targets.contains(player)) return false;
					return true;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('jianbi'),
						[1,1],function(card,player,target){
						return _status.event.getTrigger().targets.contains(target);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var eff=-get.effect(target,trigger.card,trigger.player,_status.event.player);
						if(trigger.card.name=='wugu'&&eff==0&&get.attitude(player,target)<0){
							return 0.01;
						}
						return eff;
					});
					"step 1"
					if(result.bool){
						event.targets=result.targets;
						if(event.isMine()){
							player.logSkill('jianbi',event.targets);
							event.finish();
						}
						for(var i=0;i<result.targets.length;i++){
							trigger.targets.remove(result.targets[i]);
						}
						game.delay();
					}
					else{
						event.finish();
					}
					"step 2"
					player.logSkill('jianbi',event.targets);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'multineg')){
								return 'zerotarget';
							}
							if(get.tag(card,'multitarget')){
								var info=get.info(card);
								if(info.selectTarget==-1&&!info.multitarget){
									return [1,Math.min(3,1+target.maxHp-target.hp)];
								}
							}
						}
					}
				}
			},
			juntun:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				position:'he',
				filterCard:{type:'equip'},
				check:function(card){
					var player=_status.event.player;
					var he=player.getCards('he');
					var subtype=get.subtype(card);
					var value=get.equipValue(card);
					for(var i=0;i<he.length;i++){
						if(he[i]!=card&&get.subtype(he[i])==subtype&&get.equipValue(he[i])>=value){
							return 10;
						}
					}
					if(!player.needsToDiscard()){
						return 4-get.equipValue(card);
					}
					return 0;
				},
				content:function(){
					player.draw();
				},
				discard:false,
				prompt:'将一张装备牌置入弃牌堆并摸一张牌',
				delay:0.5,
				prepare:function(cards,player){
					player.$throw(cards,1000);
				},
				ai:{
					basic:{
						order:8.5
					},
					result:{
						player:1,
					},
				}
			},
			choudu:{
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					return lib.filter.cardEnabled({name:'diaobingqianjiang'},target);
				},
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					var list=game.filterPlayer();
					list.sortBySeat(target);
					target.useCard({name:'diaobingqianjiang'},list);
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)<=1) return 0;
							return game.countPlayer(function(current){
								return get.effect(current,{name:'diaobingqianjiang'},target,player);
							});
						}
					}
				}
			},
			liduan:{
				trigger:{global:'gainAfter'},
				filter:function(event,player){
					if(event.player==player) return false;
					if(_status.currentPhase==event.player) return false;
					if(event.cards.length!=1) return false;
					return get.type(event.cards[0])=='equip'&&get.position(event.cards[0])=='h';
				},
				logTarget:'player',
				check:function(event,player){
					var att=get.attitude(player,event.player);
					var subtype=get.subtype(event.cards[0]);
					if(att>0){
						if(event.player.countCards('h')>=player.countCards('h')+2) return true;
						return event.player.countCards('e',{subtype:subtype})==0;
					}
					else{
						return event.player.countCards('e',{subtype:subtype})>0;
					}
				},
				content:function(){
					'step 0'
					var bool=false;
					var subtype=get.subtype(trigger.cards[0]);
					var current=trigger.player.getEquip('e',parseInt(subtype[5]));
					var att=get.attitude(trigger.player,player);
					if(current){
						if(att>0){
							bool=true;
						}
						else{
							if(get.equipValue(current)>get.equipValue(trigger.cards[0])){
								bool=true;
							}
						}
					}
					trigger.player.chooseCard('立断：将一张手牌交给'+get.translation(player)+'，或取消并使用'+get.translation(trigger.cards)).ai=function(card){
						if(bool){
							if(att>0){
								return 8-get.value(card);
							}
							else{
								return 4-get.value(card);
							}
						}
						else{
							if(att<=0) return -get.value(card);
							return 0;
						}
					}
					'step 1'
					if(result.bool){
						player.gain(result.cards,trigger.player);
						trigger.player.$give(1,player);
					}
					else{
						trigger.player.useCard(trigger.cards,trigger.player);
					}
				}
			},
			jinyan:{
				mod:{
					cardEnabled:function(card,player){
						if(_status.event.skill!='jinyan'&&player.hp<=2&&get.type(card,'trick')=='trick'&&get.color(card)=='black') return false;
					},
					cardUsable:function(card,player){
						if(_status.event.skill!='jinyan'&&player.hp<=2&&get.type(card,'trick')=='trick'&&get.color(card)=='black') return false;
					},
					cardRespondable:function(card,player){
						if(_status.event.skill!='jinyan'&&player.hp<=2&&get.type(card,'trick')=='trick'&&get.color(card)=='black') return false;
					},
					cardSavable:function(card,player){
						if(_status.event.skill!='jinyan'&&player.hp<=2&&get.type(card,'trick')=='trick'&&get.color(card)=='black') return false;
					},
				},
				enable:['chooseToUse','chooseToRespond'],
				filterCard:function(card){
					return get.type(card,'trick')=='trick'&&get.color(card)=='black';
				},
				viewAsFilter:function(player){
					if(player.hp>2) return false;
					if(!player.hasCard(function(card){
						return get.type(card,'trick')=='trick'&&get.color(card)=='black';
					})) return false;
				},
				viewAs:{name:'sha'},
				prompt:'将一张黑色锦囊牌当作杀使用或打出',
				check:function(){return 1},
				ai:{
					respondSha:true,
					skillTagFilter:function(player){
						if(player.hp>2) return false;
						if(!player.hasCard(function(card){
							return get.type(card,'trick')=='trick'&&get.color(card)=='black';
						})) return false;
					}
				}
			},
			fuchou:{
				trigger:{target:'shaBefore'},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					var bool=false;
					if(!player.hasShan()&&get.effect(player,trigger.card,trigger.player,player)<0){
						bool=true;
					}
					player.chooseCard('he',get.prompt('fuchou',trigger.player)).set('ai',function(card){
						var player=_status.event.player;
						if(bool){
							if(player.hp<=1){
								if(get.tag(card,'save')) return 0;
								return 8-get.value(card);
							}
							return 6-get.value(card);
						}
						return -get.value(card);
					});
					'step 1'
					if(result.bool){
						trigger.cancel();
						player.logSkill('fuchou',trigger.player);
						trigger.player.gain(result.cards,player);
						if(get.position(result.cards[0])=='h'){
							player.$give(1,trigger.player);
						}
						else{
							player.$give(result.cards,trigger.player);
						}
						player.storage.fuchou2.add(trigger.player);
					}
				},
				group:'fuchou2'
			},
			fuchou2:{
				init:function(player){
					player.storage.fuchou2=[];
				},
				forced:true,
				trigger:{global:'phaseAfter'},
				filter:function(event,player){
					for(var i=0;i<player.storage.fuchou2.length;i++){
						if(player.storage.fuchou2[i].isAlive()) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					if(player.storage.fuchou2.length){
						var target=player.storage.fuchou2.shift();
						if(target.isAlive()){
							player.draw();
							if(player.canUse('sha',target,false)&&player.hasSha()){
								player.chooseToUse({name:'sha'},target,-1,'对'+get.translation(target)+'使用一张杀，或失去一点体力');
							}
							else{
								player.loseHp();
								event.redo();
							}
						}
					}
					else{
						event.finish();
					}
					'step 1'
					if(!result.bool){
						player.loseHp();
					}
					event.goto(0);
				}
			},
			chezhen:{
				mod:{
					globalFrom:function(from,to,distance){
						if(from.countCards('e')) return distance-1;
					},
					globalTo:function(from,to,distance){
						if(!to.countCards('e')) return distance+1;
					}
				}
			},
			youzhan:{
				trigger:{global:'shaBefore'},
				direct:true,
				filter:function(event,player){
					return get.distance(player,event.target)<=1&&player.countCards('he',{type:'equip'});
				},
				content:function(){
					'step 0'
					var bool=(get.attitude(player,trigger.player)<0&&get.attitude(player,trigger.target)>0);
					var next=player.chooseToDiscard('he',{type:'equip'},get.prompt('youzhan',trigger.target));
					next.ai=function(card){
						if(bool){
							return 7-get.value(card);
						}
						return 0;
					};
					next.logSkill=['youzhan',trigger.target];
					'step 1'
					if(result.bool){
						event.youdiinfo={
							source:trigger.player,
							evt:trigger
						}
						trigger.target.useCard({name:'youdishenru'});
					}
				}
			},
			kangyin:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.discardPlayerCard(target,true);
					'step 2'
					if(player.isDamaged()&&result.links&&result.links.length){
						if(get.type(result.links[0])=='basic'){
							player.chooseTarget([1,player.maxHp-player.hp],
							'选择至多'+get.cnNumber(player.maxHp-player.hp)+'名角色各摸一张牌').set('ai',function(target){
								return get.attitude(_status.event.player,target);
							});
						}
						else{
							player.storage.kangyin2=player.maxHp-player.hp;
							player.addTempSkill('kangyin2');
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.targets&&result.targets.length){
						result.targets.sort(lib.sort.seat);
						player.line(result.targets,'green');
						game.asyncDraw(result.targets);
					}
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(player.hp>=4) return -1;
							if(player.hp==3&&!player.needsToDiscard()) return -1;
							return 0;
						}
					}
				}
			},
			kangyin2:{
				mark:true,
				intro:{
					content:'到其他角色的距离-#；使用【杀】的额外目标数上限+#'
				},
				onremove:true,
				mod:{
					globalFrom:function(from,to,distance){
						return distance-from.storage.kangyin2;
					},
					selectTarget:function(card,player,range){
						if(card.name=='sha'&&range[1]!=-1) range[1]+=player.storage.kangyin2;
					},
				}
			},
			duoqi:{
				trigger:{global:'discardAfter'},
				filter:function(event,player){
					if(_status.currentPhase==player) return false;
					if(!player.storage.zhucheng||!player.storage.zhucheng.length) return false;
					var evt=event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse') return true;
					return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var bool=false;
					if(get.attitude(player,trigger.player)<0&&trigger.player.needsToDiscard()){
						bool=true;
					}
					player.chooseCardButton(get.prompt('zhucheng',_status.currentPhase),player.storage.zhucheng).set('ai',function(button){
						return _status.event.bool?1:0;
					}).set('bool',bool);
					'step 1'
					if(result.bool){
						player.logSkill('zhucheng',_status.currentPhase);
						player.$throw(result.links[0]);
						player.storage.zhucheng.remove(result.links[0]);
						ui.discardPile.appendChild(result.links[0]);
						player.syncStorage('zhucheng');
						if(player.storage.zhucheng.length==0){
							player.unmarkSkill('zhucheng');
						}
						else{
							player.updateMarks();
						}
						var evt=trigger.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'){
							evt.skipped=true;
						}
					}
				},
				ai:{
					expose:0.2
				}
			},
			zhucheng:{
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					return !player.storage.zhucheng||!player.storage.zhucheng.length;
				},
				check:function(event,player){
					if(player.storage.zhucheng&&player.storage.zhucheng.length){
						if(!player.hasShan()) return false;
						if(player.storage.zhucheng.length>=2) return false;
					}
					return true;
				},
				intro:{
					content:'cards'
				},
				content:function(){
					if(player.storage.zhucheng&&player.storage.zhucheng.length){
						player.gain(player.storage.zhucheng,'gain2');
						delete player.storage.zhucheng;
						player.unmarkSkill('zhucheng');
					}
					else{
						var cards=get.cards(Math.max(1,player.maxHp-player.hp));
						player.$gain2(cards);
						player.storage.zhucheng=cards;
						player.markSkill('zhucheng');
					}
				},
				ai:{
					target:function(card,player,target,current){
						if(card.name=='sha'&&player.storage.zhucheng&&player.storage.zhucheng.length){
							if(player.storage.zhucheng.length>=2){
								if(!player.hasFriend()&&player.countCards('he')-2<player.storage.zhucheng.length) return 'zeroplayertarget';
								return 0.1;
							}
							else{
								var he=player.getCards('he');
								var sha=false;
								for(var i=0;i<he.length;i++){
									if(he[i]=='sha'&&!sha){
										sha=true;
									}
									else{
										if(get.value(he[i])<=6){
											return [1,0,1,-0.5];
										}
									}
								}
								return 'zeroplayertarget';
							}
						}
					}
				},
				group:'zhucheng2'
			},
			zhucheng2:{
				trigger:{target:'shaBefore'},
				check:function(event,player){
					if(get.attitude(event.player,player)<=0) return true;
					return get.effect(player,event.card,event.player,player)<=0;
				},
				filter:function(event,player){
					return player.storage.zhucheng&&player.storage.zhucheng.length>0;
				},
				content:function(){
					'step 0'
					var bool=false;
					if(get.effect(player,trigger.card,trigger.player,trigger.player)>=0){
						bool=true;
					}
					var num=player.storage.zhucheng.length;
					trigger.player.chooseToDiscard('弃置'+get.cnNumber(num)+'张牌，或令杀无效','he',num).set('ai',function(card){
						if(_status.event.bool){
							return 10-get.value(card);
						}
						return 0;
					}).set('bool',bool);
					'step 1'
					if(!result.bool){
						trigger.cancel();
					}
				}
			},
			diy_jiaoxia:{
				audio:['jiaoxia',2],
				trigger:{target:'useCardToBegin'},
				filter:function(event,player){
					return event.card&&get.color(event.card)=='red';
				},
				frequent:true,
				content:function(){
					player.draw();
				},
				ai:{
					effect:function(card,player,target){
						if(get.color(card)=='red') return [1,1];
					},
				}
			},
			zaiqix:{
				trigger:{player:'phaseDrawBefore'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				check:function(event,player){
					if(1+player.maxHp-player.hp<2){
						return false;
					}
					else if(1+player.maxHp-player.hp==2){
						return player.countCards('h')>=2;
					}
					return true;
				},
				content:function(){
					"step 0"
					trigger.cancel();
					event.cards=get.cards(player.maxHp-player.hp+1);
					player.showCards(event.cards);
					"step 1"
					var num=0;
					for(var i=0;i<event.cards.length;i++){
						if(get.suit(event.cards[i])=='heart'){
							num++;
							ui.discardPile.appendChild(event.cards[i]);
							event.cards.splice(i--,1);
						}
					}
					if(num){
						player.recover(num);
					}
					"step 2"
					if(event.cards.length){
						player.gain(event.cards);
						player.$gain2(event.cards);
						game.delay();
					}
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 2;
						if(target.hp==2) return 1.5;
						return 1;
					},
				}
			},
			batu:{
				trigger:{player:'phaseEnd'},
				frequent:true,
				filter:function(event,player){
					var list=['wei','shu','wu','qun'];
					var players=game.filterPlayer();
					var num=0;
					for(var i=0;i<players.length&&list.length;i++){
						if(list.contains(players[i].group)){
							list.remove(players[i].group);
							num++;
						}
					}
					return player.countCards('h')<num;
				},
				content:function(){
					var list=['wei','shu','wu','qun'];
					var players=game.filterPlayer();
					var num=0;
					for(var i=0;i<players.length&&list.length;i++){
						if(list.contains(players[i].group)){
							list.remove(players[i].group);
							num++;
						}
					}
					player.draw(num-player.countCards('h'));
				},
				ai:{
					threaten:1.3
				}
			},
			diyzaiqi:{
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				content:function(){
					trigger.num+=player.maxHp-player.hp;
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 2.5;
						if(target.hp==2) return 1.8;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp) return [0,1];
							}
							if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
						}
					}
				}
			},
			diykuanggu:{
				trigger:{source:'damageEnd'},
				forced:true,
				content:function(){
					if(get.distance(trigger.player,player,'attack')>1){
						player.draw(trigger.num);
					}
					else{
						player.recover(trigger.num);
					}
				}
			},
			diyduanliang:{
				group:['diyduanliang1','diyduanliang2'],
				ai:{
					threaten:1.2
				}
			},
			diyduanliang1:{
				enable:'phaseUse',
				usable:1,
				discard:false,
				filter:function(event,player){
					var cards=player.getCards('he',{color:'black'});
					for(var i=0;i<cards.length;i++){
						var type=get.type(cards[i]);
						if(type=='basic') return true;
					}
					return false;
				},
				prepare:'throw',
				position:'he',
				filterCard:function(card){
					if(get.color(card)!='black') return false;
					var type=get.type(card);
					return type=='basic';
				},
				filterTarget:function(card,player,target){
					return lib.filter.filterTarget({name:'bingliang'},player,target);
				},
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					player.useCard({name:'bingliang'},target,cards).animate=false;
					player.draw();
				},
				ai:{
					result:{
						target:function(player,target){
							return get.effect(target,{name:'bingliang'},player,target);
						}
					},
					order:9,
				}
			},
			diyduanliang2:{
				mod:{
					targetInRange:function(card,player,target){
						if(card.name=='bingliang'){
							if(get.distance(player,target)<=2) return true;
						}
					}
				}
			},
			guihan:{
				unique:true,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:'epic',
				init:function(player){
					player.storage.guihan=false;
				},
				filter:function(event,player){
					if(event.type!='dying') return false;
					if(player!=event.dying) return false;
					if(player.storage.guihan) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					return target.sex=='male'&&player!=target;
				},
				content:function(){
					"step 0"
					player.awakenSkill('guihan');
					player.recover();
					player.storage.guihan=true;
					"step 1"
					player.draw(2);
					"step 2"
					target.recover();
					"step 3"
					target.draw(2);
					// if(lib.config.mode=='identity'){
					// 	player.node.identity.style.backgroundColor=get.translation('weiColor');
					// 	player.group='wei';
					// }
				},
				ai:{
					skillTagFilter:function(player){
						if(player.storage.guihan) return false;
						if(player.hp>0) return false;
					},
					save:true,
					result:{
						player:4,
						target:function(player,target){
							if(target.hp==target.maxHp) return 2;
							return 4;
						}
					},
					threaten:function(player,target){
						if(!target.storage.guihan) return 0.8;
					}
				},
				intro:{
					content:'limited'
				}
			},
			luweiyan:{
				enable:'phaseUse',
				usable:1,
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filter:function(event,player){
					return player.hasCard(function(card){
						return get.type(card)!='basic';
					},'he');
				},
				viewAs:{name:'shuiyanqijun'},
				prompt:'将一张非基本牌当水淹七军使用',
				check:function(card){return 8-get.value(card)},
				group:'luweiyan2'
			},
			luweiyan2:{
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					if(event.skill!='luweiyan') return false;
					for(var i=0;i<event.targets.length;i++){
						if(player.canUse('sha',event.targets[i],false)){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget('是否视为使用一张杀？',function(card,player,target){
						return _status.event.targets.contains(target)&&player.canUse('sha',target,false);
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'sha'},player,player);
					}).set('targets',trigger.targets);
					'step 1'
					if(result.bool){
						player.useCard({name:'sha'},result.targets,false);
					}
				}
			},
			yaliang:{
				inherit:'wangxi'
			},
			xiongzi:{
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				content:function(){
					trigger.num+=1+Math.floor(player.countCards('e')/2);
				}
			},
			honglian:{
				trigger:{player:'damageEnd'},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				filter:function(event,player){
					return event.source&&event.source!=player&&event.source.countCards('he',{color:'red'})>0;
				},
				content:function(){
					trigger.source.discard(trigger.source.getCards('he',{color:'red'}));
				},
				ai:{
					expose:0.1,
					result:{
						threaten:0.8,
						target:function(card,player,target){
							if(get.tag(card,'damage')&&get.attitude(target,player)<0){
								return [1,0,0,-player.countCards('he',{color:'red'})];
							}
						}
					}
				}
			},
			diyguhuo:{
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return player.countCards('hej')>0;
				},
				content:function(){
					"step 0"
					player.draw(2);
					"step 1"
					var next=player.discardPlayerCard(player,'hej',2,true);
					next.ai=function(button){
						if(get.position(button.link)=='j') return 10;
						return -get.value(button.link);
					};
					next.filterButton=function(button){
						return lib.filter.cardDiscardable(button.link,player);
					}
				},
				ai:{
					effect:{
						target:function(card){
							if(get.type(card)=='delay') return [0,0.5];
						}
					}
				}
			},
			diychanyuan:{
				trigger:{player:'dieBegin'},
				forced:true,
				filter:function(event){
					return event.source!=undefined;
				},
				content:function(){
					trigger.source.loseMaxHp(true);
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 0.2;
					},
					result:{
						target:function(card,player,target,current){
							if(target.hp<=1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-5];
								return [1,0,0,-2];
							}
						}
					}
				}
			},
			zonghuo:{
				trigger:{source:'damageBefore'},
				direct:true,
				priority:10,
				filter:function(event){
					return event.nature!='fire';
				},
				content:function(){
					"step 0"
					player.chooseToDiscard(get.prompt('zonghuo')).ai=function(card){
						var att=get.attitude(player,trigger.player);
						if(trigger.player.hasSkillTag('nofire')){
							if(att>0) return 8-get.value(card);
							return -1;
						}
						if(att<0){
							return 7-get.value(card);
						}
						return -1;
					}
					"step 1"
					if(result.bool){
						player.logSkill('zonghuo',trigger.player,'fire');
						trigger.nature='fire';
					}
				}
			},
			shaoying:{
				trigger:{source:'damageAfter'},
				direct:true,
				filter:function(event){
					return event.nature=='fire';
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('shaoying'),function(card,player,target){
						return get.distance(trigger.player,target)<=1&&trigger.player!=target;
					}).ai=function(target){
						return get.damageEffect(target,player,player,'fire');
					}
					"step 1"
					if(result.bool){
						var card=get.cards()[0];
						ui.discardPile.appendChild(card);
						player.showCards(card);
						event.bool=get.color(card)=='red';
						event.target=result.targets[0];
						player.logSkill('shaoying',event.target,false);
						trigger.player.line(event.target,'fire');
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.bool){
						event.target.damage('fire');
					}
				}
			},
			tiangong:{
				group:['tiangong2'],
				trigger:{player:'damageBefore'},
				filter:function(event){
					if(event.nature=='thunder') return true;
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='tiesuo') return 0;
							if(get.tag(card,'thunderDamage')) return 0;
						}
					},
					threaten:0.5
				}
			},
			tiangong2:{
				trigger:{source:'damageAfter'},
				filter:function(event){
					if(event.nature=='thunder') return true;
				},
				forced:true,
				popup:false,
				priority:1,
				content:function(){
					player.draw();
				},
			},
			xicai:{
				inherit:'jianxiong'
			},
			diyjianxiong:{
				mode:['identity'],
				trigger:{global:'dieBefore'},
				forced:true,
				filter:function(event,player){
					return event.player!=game.zhu&&_status.currentPhase==player;
				},
				content:function(){
					trigger.player.identity='fan';
					trigger.player.setIdentity('fan');
					trigger.player.identityShown=true;
				}
			},
			shuaiyan:{
				trigger:{global:'recoverAfter'},
				filter:function(event,player){
					return event.player!=player&&_status.currentPhase!=player;
				},
				logTarget:'player',
				content:function(){
					"step 0"
					var att=get.attitude(trigger.player,player);
					var bool=0;
					if(att<0){
						if(trigger.player.countCards('e')==0&&trigger.player.countCards('h')>2) bool=1;
						else if(trigger.player.countCards('he')==0) bool=1;
					}
					else if(att==0&&trigger.player.countCards('he')==0){
						bool=1;
					}
					trigger.player.chooseControl(function(){
						return _status.event.bool;
					}).set('prompt','率言').set('bool',bool).set('choiceList',['令'+get.translation(player)+'摸一张牌','令'+get.translation(player)+'弃置你一张牌']);
					"step 1"
					if(result.control=='选项一'){
						player.draw();
						event.finish();
					}
					else if(trigger.player.countCards('he')){
						player.discardPlayerCard(trigger.player,true,'he');
					}
					else{
						event.finish();
					}
				},
				ai:{
					threaten:1.2
				}
			},
			moshou:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=='bingliang'||card.name=='lebu') return false;
					}
				},
			},
			siji:{
				trigger:{player:'phaseDiscardEnd'},
				frequent:true,
				filter:function(event,player){
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].name=='sha') return true;
						}
					}
					return false;
				},
				content:function(){
					var num=0;
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].name=='sha') num++;
					}
					player.draw(2*num);
				}
			},
			ciqiu:{
				unique:true,
				trigger:{source:'damageBegin'},
				forced:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player.hp==event.player.maxHp&&event.notLink();
				},
				content:function(){
					trigger.num++;
					trigger._ciqiu3=true;
				},
				group:['ciqiu2']
			},
			ciqiu2:{
				trigger:{global:'dying'},
				priority:9,
				filter:function(event,player){
					return event.player!=player&&event.parent._ciqiu3&&event.parent.source==player;
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				forced:true,
				logTarget:'player',
				content:function(){
					'step 0'
					trigger.player.die();
					player.removeSkill('ciqiu2');
					'step 1'
					if(!trigger.player.isAlive()){
						trigger.cancel(true);
					}
				}
			},
			ciqiu3:{},
			juedao:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.isLinked()==false;
				},
				filterCard:true,
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					if(player.isLinked()==false) player.link();
				},
				ai:{
					order:2,
					result:{
						player:function(player){
							if(player.isLinked()) return 0;
							return 1;
						},
					},
					effect:{
						target:function(card,player,target){
							if(card.name=='tiesuo'){
								if(target.isLinked()){
									return [0,-0.5];
								}
								else{
									return [0,0.5];
								}
							}
						}
					}
				},
				mod:{
					globalFrom:function(from,to,distance){
						if(from.isLinked()) return distance+1;
					},
					globalTo:function(from,to,distance){
						if(to.isLinked()) return distance+1;
					},
				}
			},
			geju:{
				trigger:{player:'phaseBegin'},
				frequent:true,
				filter:function(event,player){
					var list=[];
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(player!=players[i]) list.add(players[i].group);
					}
					list.remove('unknown');
					for(var i=0;i<players.length;i++){
						if(players[i]!=player){
							if(lib.filter.targetInRange({name:'sha'},players[i],player)){
								list.remove(players[i].group);
							}
						}
					}
					return list.length>0;
				},
				content:function(){
					var list=[];
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(player!=players[i]) list.add(players[i].group);
					}
					list.remove('unknown');
					for(var i=0;i<players.length;i++){
						if(players[i]!=player){
							if(lib.filter.targetInRange({name:'sha'},players[i],player)){
								list.remove(players[i].group);
							}
						}
					}
					if(list.length>0) player.draw(list.length);
				}
			},
			diyqiangxi:{
				enable:'phaseUse',
				usable:1,
				filterCard:function(card){
					return get.subtype(card)=='equip1';
				},
				selectCard:[0,1],
				filterTarget:function(card,player,target){
					if(player==target) return false;
					return get.distance(player,target,'attack')<=1;
				},
				content:function(){
					"step 0"
					if(cards.length==0){
						player.loseHp();
					}
					"step 1"
					target.damage();
					"step 2"
					if(target.isAlive()&&target.countCards('he')){
						player.discardPlayerCard(target);
					}
				},
				check:function(card){
					return 10-get.value(card);
				},
				position:'he',
				ai:{
					order:8,
					result:{
						player:function(player,target){
							if(ui.selected.cards.length) return 0;
							if(player.hp>=target.hp) return -0.9;
							if(player.hp<=2) return -10;
							return -2;
						},
						target:function(player,target){
							if(player.hp<=1) return 0;
							return get.damageEffect(target,player);
						}
					}
				},
				threaten:1.3
			},
		},
		translate:{
			diy_liufu:'刘馥',
			diy_xizhenxihong:'习珍习宏',
			diy_liuzan:'留赞',
			diy_zaozhirenjun:'枣祗任峻',
			diy_yangyi:'杨仪',
			diy_tianyu:'田豫',

			// diy_caocao:'曹操',
			diy_menghuo:'孟获',
			diy_huangzhong:'黄汉升',
			diy_xuhuang:'徐公明',
			diy_dianwei:'新典韦',
			diy_weiyan:'魏文长',
			xicai:'惜才',
			diyjianxiong:'奸雄',
			diy_feishi:'费诗',
			shuaiyan:'率言',
			moshou:'墨守',
			diy_hanlong:'韩龙',
			diy_luxun:'陆伯言',
			diy_yuji:'于吉',
			diy_zhouyu:'周公瑾',
			diy_lukang:'陆抗',
			diy_caiwenji:'蔡昭姬',
			diy_zhenji:'甄宓',

			ns_zuoci:'左慈',
			ns_wangyun:'王允',
			ns_lvzhi:'吕后',
			ns_nanhua:'南华',
			ns_nanhua_left:'幻身·左',
			ns_nanhua_right:'幻身·右',
			ns_huamulan:'sp花木兰',
			ns_huangzu:'黄祖',
			ns_yanliang:'颜良',
			ns_wenchou:'文丑',
			ns_jinke:'荆轲',

			nspinmin:'拼命',
			nspinmin_info:'锁定技，当你于回合内死亡时，你不死亡并增加一点体力上限（每回合最多增加1点且不能超过4）；当你于回合外死亡时，你不死亡并减少一点体力上限（体力上限为0会导致你死亡）',
			nsshishou:'失手',
			nsshishou_info:'锁定技，当你于回合内失去手牌时，你失去一点体力并摸一张牌；你回合内使用的牌数不能超过4',
			nsduijue:'对决',
			nsduijue_info:'出牌阶段开始时，你可以弃置一张手牌，若如此做，此阶段你可以将一张与此牌颜色不同的手牌当作[决斗]使用',
			nsshuangxiong:'双雄',
			nsshuangxiong_info:'当你使用[决斗]或被使用[决斗]时，你可以将武将牌翻面',
			nsshuangxiong_append:'背面武将：文丑，2体力，你可以将一张牌当[杀]打出',
			nsguanyong:'冠勇',
			nsguanyong_info:'你可以将一张牌当[杀]打出',
			nsjihui:'急恚',
			nsjihui_info:'锁定技，每当一名角色一次弃置了三张或更多的牌，你获得一个额外回合；你的额外回合内，你使用牌只能指定你与上一回合角色为目标',
			nsmouyun:'谋运',
			nsmouyun_info:'出牌阶段限一次，若你的体力值或当前轮数为奇数，你可以弃置场上体力值最少的一名其他角色区域内的X张牌。（X为其损失的体力值）',
			nscongjun:'从军',
			nscongjun_info:'锁定技，游戏开始时，你变身为一名随机男性角色；当一名敌方角色使用无懈可击时，你有小概率亮出此武将并变回花木兰，然后对该角色造成2点伤害',
			nshuanxian:'幻仙',
			nshuanxian_info:'锁定技，游戏开始时，你获得随从“幻身·右”，当你首次受到伤害时，你获得随从“幻身·左”（体力上限2，初始手牌2，摸牌阶段少摸一张牌）；在你的回合中（如果有对应幻身），你以【幻身·左-本体-幻身·右】的顺序进行3个连续回合',
			nstaiping:'太平',
			nstaiping_info:'当你受到一点伤害后（首次伤害除外），你可以选择一项: ①令一个“幻身”增加一点体力上限。②令一个“幻身”回复一点体力。',
			nsshoudao:'授道',
			nsshoudao_info:'当“幻身”全部死亡时，你获得技能“雷击”和“鬼道”。当你死亡时，若此时有两个“幻身”，你可以令一名其他角色获得技能“雷击”和“鬼道”。若有一个“幻身”，你可以令一名其他角色获得技能“雷击”或“鬼道”。(杀死你的角色除外)',
			nsnongquan:'弄权',
			nsnongquan_info:'出牌阶段不限次数，你可以将最后一张手牌当【无中生有】使用',
			nsdufu:'毒妇',
			nsdufu_info:'每当你即将造成一次伤害时，你可以为此伤害重新指定伤害来源',
			rejizhi:'集智',
			rejizhi_info:'当你使用一张装备牌或锦囊牌时，你可以摸一张牌并展示之，若此牌是基本牌，你须弃置一张手牌，每回合限3次',
    		yiesheng:'回雪',
    		yiesheng_info:'出牌阶段，你可以弃置任意数量的黑色手牌，然后摸等量的牌。',
			liangji:'环计',
			liangji_info:'出牌阶段限一次，你可以选择一名其他角色并将一张手牌置于其武将牌上。目标角色于摸牌阶段开始时，获得此牌。若其为男性角色，则获得技能【无双】，若其为女性角色，则获得技能【离间】，直到回合结束。',
			jugong:'居功',
			jugong_info:'回合外每名角色的回合限一次，每当场上有角色因受到【杀】或【决斗】造成的伤害，你可以摸一张牌并且将一张手牌置于你的武将牌上，称之为“功”。在你即将受到伤害时，你可以弃置两张“功”，防止此伤害。',
			chengmou:'逞谋',
			chengmou_info:'摸牌阶段开始时，若你有“功”牌，你获得之，若你所获得的“功”牌多于两张，你须失去一点体力。',
			nsxinsheng:'新生',
			nsxinsheng_info:'每当你对其他角色造成伤害后，若你未受伤，则你可以增加X点体力上限并摸X张牌，X为伤害点数',
			nsdunxing:'遁形',
			nsdunxing_info:'每当你即将受到其他角色造成的伤害时，若你已受伤，则你可以防止此伤害，改为失去X点体力上限并摸X张牌，X为伤害点数',
			liangce:'粮策',
			liangce_info:'①出牌阶段限一次，你可以将一张基本牌当【五谷丰登】使用。②当因执行【五谷丰登】的效果而亮出的牌因效果执行完毕而置入弃牌堆后，你可以选择一名角色，令该角色获取之',
			jianbi:'坚壁',
			jianbi_info:'当你成为锦囊牌的目标时，若此牌的目标包括其他角色，你可以令此牌对1个目标无效',
			juntun:'军屯',
			juntun_info:'出牌阶段，你可以重铸装备牌',
			choudu:'筹度',
			choudu_info:'出牌阶段限一次，你可以弃置一张牌，并指定一名角色视为其使用一张调兵遣将',
			liduan:'立断',
			liduan_info:'当一名其他角色于其回合外获得牌后，若其此次获得的牌数为1且为装备牌（无论是否可见），你可以令该角色选择一项：1.使用此牌；2.将一张手牌交给你',
			fuchou:'负仇',
			fuchou2:'负仇',
			fuchou_info:'当你成为【杀】的目标时，你可以将一张牌交给此【杀】的使用者，令此【杀】对你无效且你到其的距离于当前回合内视为1，若如此做，此回合的结束阶段开始时，其令你摸一张牌，然后你需对其使用【杀】，否则失去1点体力',
			jinyan:'噤言',
			jinyan_info:'锁定技。若你的体力值不大于2，你的黑色锦囊牌视为【杀】',
			chezhen:'车阵',
			chezhen_info:'锁定技。若你的装备区里：没有牌，你的防御距离+1；有牌，你的进攻距离+1',
			youzhan:'诱战',
			youzhan_info:'当以你距离不大于1的角色为目标的【杀】的使用结算开始时，你可以弃置一张装备牌，令该角色视为使用【诱敌深入】',
			kangyin:'亢音',
			kangyin2:'亢音',
			kangyin_info:'出牌阶段限一次，你可以失去1点体力并选择一名其他角色，弃置该角色的一张牌。若此牌：为基本牌，你可以令一至X名角色各摸一张牌；不为基本牌，于此回合内：你的进攻距离+X，且你使用杀的额外目标数上限+X。（X为你已损失的体力值）',
			zhucheng:'筑城',
			zhucheng2:'筑城',
			zhucheng_info:'①结束阶段开始时，若没有“筑”，你可以将牌堆顶的X张牌置于你的武将牌上〔称为“筑”〕（X为你已损失的体力值与1中的较大值），否则你可以获取所有“筑”。②当你成为杀的目标时，若有“筑”，你可以令此杀的使用者弃置X张牌（X为“筑”的数量），否则杀对你无效',
			duoqi:'夺气',
			duoqi_info:'当一名角色于除你之外的角色的出牌阶段内因弃置而失去牌后，你可以移去一张“筑”，并结束此出牌阶段',

			siji:'伺机',
			ciqiu:'刺酋',
			ciqiu2:'刺酋',
			ciqiu3:'刺酋',
			diy_liuyan:'刘焉',
			juedao:'绝道',
			geju:'割据',
			shaoying:'烧营',
			zonghuo:'纵火',
			diychanyuan:'缠怨',
			diyguhuo:'蛊惑',
			jieyan:'劫焰',
			honglian:'红莲',
			xiongzi:'雄姿',
			luweiyan:'围堰',
			guihan:'归汉',
			diyduanliang:'断粮',
			diyduanliang1:'断粮',
			diyduanliang2:'断粮',
			diyqiangxi:'强袭',
			diykuanggu:'狂骨',
			diyzaiqi:'再起',
			batu:'霸图',
			zaiqix:'再起',
			diy_jiaoxia:'皎霞',
			yaliang:'雅量',
			yaliang_info:'每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。',
			diy_jiaoxia_info:'每当你成为红色牌的目标，你可以摸一张牌',
			zaiqix_info:'摸牌阶段，若你已受伤，你可以改为展示牌堆顶的X+1张牌，X为你已损失的体力值，其中每有一张♥牌，你回复1点体力，然后弃掉这些♥牌，将其余的牌收入手牌。',
			batu_info:'结束阶段，你可以将手牌数补至X，X为现存的势力数',
			diyzaiqi_info:'锁定技，你摸牌阶段额外摸X张牌，X为你已损失的体力值',
			diykuanggu_info:'锁定技，每当你造成一点伤害，你在其攻击范围内，你回复一点体力，否则你摸一张牌',
			diyqiangxi_info:'出牌阶段，你可以自减一点体力或弃一张武器牌，然后你对你攻击范围内的一名角色造成一点伤害并弃置其一张牌，每回合限一次。',
			diyduanliang_info:'出牌阶段限一次，你可以将一张黑色的基本牌当兵粮寸断对一名角色使用，然后摸一张牌。你的兵粮寸断可以指定距离2以内的角色作为目标',
			guihan_info:'限定技，当你进入濒死状态时，可以指定一名男性角色与其各回复一点体力并摸两张牌',
			luweiyan_info:'出牌阶段限一次，你可以将一张非基本牌当作水攻使用；结算后你可以视为对其中一个目标使用一张不计入出杀次数的杀',
			xiongzi_info:'锁定技，你于摸牌阶段额外摸X+1张牌，X为你装备区牌数的一半，向下取整',
			honglian_info:'每当你受到来自其他角色的伤害，可以弃置伤害来源的所有红色牌',
			jieyan_info:'出牌阶段限一次，你可以弃置一张红色手牌令场上所有角色受到一点火焰伤害',
			diyguhuo_info:'锁定技，准备阶段，你摸两张牌，然后弃置区域内的两张牌',
			diychanyuan_info:'锁定技，杀死你的角色失去一点体力上限',
			zonghuo_info:'你可弃置一张牌将你即将造成的伤害变为火焰伤害',
			shaoying_info:'每当你造成一次火焰伤害，可指定距离受伤害角色1以内的另一名角色，并展示牌堆顶的一张牌，若此牌为红色，该角色受到一点火焰伤害',
			juedao_info:'出牌阶段，你可以弃置一张手牌，横置你的武将牌；锁定技，若你处于连环状态，你进攻距离-1、防御距离+1。',
			geju_info:'准备阶段开始时，你可以摸X张牌（X为攻击范围内不含有你的势力数）。',
			siji_info:'弃牌阶段结束后，你可以摸2X张牌（X为你于此阶段内弃置的【杀】的数量）。',
			ciqiu_info:'锁定技，每当你使用【杀】对目标角色造成伤害时，若该角色未受伤，你令此伤害+1；若其因此进入濒死状态，你令其死亡，然后你失去“刺酋”。 ',
			shuaiyan_info:'每当其他角色于你的回合外回复体力后，你可以令该角色选择一项：1.令你摸一张牌；2.令你弃置其一张牌。',
			moshou_info:'锁定技，你不能成为乐不思蜀和兵粮寸断的目标。',
			xicai_info:'你可以立即获得对你造成伤害的牌',
			diyjianxiong_info:'锁定技，在身份局中，在你回合内死亡的角色均视为反贼，国战中，在你回合内死亡的角色若与你势力相同则随机改为另一个势力',
		},
	};
});
