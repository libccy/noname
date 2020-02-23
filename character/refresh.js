'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'refresh',
		characterSort:{
			refresh:{
    refresh_standard:["re_caocao","re_simayi","re_guojia","re_lidian","re_zhangliao","re_xuzhu","re_xiahoudun","re_zhangfei","re_zhaoyun","re_guanyu","re_machao","re_xushu","re_zhouyu","re_lvmeng","re_ganning","re_luxun","re_daqiao","re_huanggai","re_lvbu","re_gongsunzan","re_huatuo","re_liubei","re_diaochan","re_huangyueying","re_sunquan","re_sunshangxiang","re_zhenji","re_zhugeliang","re_huaxiong"],
    refresh_feng:['caoren','re_xiahouyuan','re_huangzhong','re_weiyan','re_xiaoqiao','zhoutai','re_zhangjiao','xin_yuji'],
				refresh_huo:["re_sp_zhugeliang","re_xunyu","re_dianwei","re_yanwen","re_pangtong","xin_yuanshao","re_pangde"],
				refresh_lin:['re_zhurong','re_menghuo','re_dongzhuo','re_sunjian','re_caopi','re_xuhuang'],
				refresh_shan:['re_dengai','re_jiangwei','re_caiwenji','re_liushan','re_zhangzhang','re_zuoci','re_sunce'],
   },
		},
		connect:true,
		character:{
			re_caocao:['male','wei',4,['new_rejianxiong','hujia'],['zhu']],
			re_simayi:['male','wei',3,['refankui','reguicai']],
			re_guojia:['male','wei',3,['tiandu','new_reyiji']],
			re_lidian:['male','wei',3,['xunxun','wangxi']],
			re_zhangliao:['male','wei',4,['new_retuxi']],
			re_xuzhu:['male','wei',4,['new_reluoyi']],
			re_xiahoudun:['male','wei',4,['reganglie','new_qingjian']],
			re_zhangfei:['male','shu',4,['new_repaoxiao','new_tishen']],
			re_zhaoyun:['male','shu',4,['longdan','new_yajiao']],
			re_guanyu:['male','shu',4,['new_rewusheng','new_yijue']],
			re_machao:['male','shu',4,['mashu','retieji']],
			re_xushu:['male','shu',4,['zhuhai','qianxin']],
			re_zhouyu:['male','wu',3,['reyingzi','refanjian']],
			re_lvmeng:['male','wu',4,['keji','qinxue','botu']],
			re_ganning:['male','wu',4,['qixi','fenwei']],
			re_luxun:['male','wu',3,['reqianxun','relianying']],
			re_daqiao:['female','wu',3,['reguose','liuli']],
			re_huanggai:['male','wu',4,['rekurou','zhaxiang']],
			re_lvbu:['male','qun',5,['wushuang','new_liyu']],
			re_gongsunzan:['male','qun',4,['qiaomeng','reyicong']],
			re_huatuo:['male','qun',3,['jijiu','new_reqingnang']],
			re_liubei:['male','shu',4,['rerende','jijiang'],['zhu']],
			re_diaochan:['female','qun',3,['lijian','rebiyue']],
			re_huangyueying:['female','shu',3,['rejizhi','reqicai']],
			re_sunquan:['male','wu',4,['rezhiheng','rejiuyuan'],['zhu']],
			re_sunshangxiang:['female','wu',3,['xiaoji','rejieyin']],
			re_zhenji:['female','wei',3,['reluoshen','reqingguo']],
			re_zhugeliang:['male','shu',3,['reguanxing','kongcheng']],
			re_huaxiong:["male","qun",6,["new_reyaowu"]],
			
			re_zhangjiao:['male','qun',3,['xinleiji','xinguidao','huangtian'],['zhu']],
			xin_yuji:['male','qun',3,['reguhuo']],
			re_zuoci:['male','qun',3,['rehuashen','rexinsheng']],
			
			re_xiahouyuan:['male','wei',4,['xinshensu']],
			caoren:['male','wei',4,['xinjushou','xinjiewei']],
			re_huangzhong:['male','shu',4,['xinliegong']],
			re_weiyan:['male','shu',4,['xinkuanggu','qimou']],
			re_xiaoqiao:['female','wu',3,['retianxiang','hongyan']],
			zhoutai:['male','wu',4,['buqu','fenji']],
			re_pangde:['male','qun',4,['mashu','jianchu']],
			re_xuhuang:['male','wei',4,['duanliang','jiezi']],
			re_sp_zhugeliang:["male","shu",3,["rehuoji","rekanpo","bazhen"],[]],
			re_xunyu:["male","wei",3,["quhu","rejieming"],[]],
			re_dianwei:["male","wei",4,["reqiangxi"],[]],
			re_yanwen:["male","qun",4,["reshuangxiong"],[]],
			re_pangtong:['male','shu',3,['xinlianhuan','niepan'],[]],
			xin_yuanshao:['male','qun',4,['olluanji','olxueyi'],['zhu']],
			re_zhurong:['female','shu',4,['juxiang','relieren']],
			re_menghuo:['male','shu',4,['huoshou','rezaiqi']],
			re_dongzhuo:['male','qun',8,['rejiuchi','roulin','benghuai','baonue'],['zhu']],
			re_sunjian:['male','wu',4,['gzyinghun','repolu']],
			re_caopi:['male','wei',3,['rexingshang','refangzhu','songwei'],['zhu']],
			re_dengai:['male','wei',4,['retuntian','zaoxian']],
			re_jiangwei:['male','shu',4,['retiaoxin','zhiji']],
			re_caiwenji:['female','qun',3,['rebeige','duanchang']],
			re_liushan:['male','shu',3,['xiangle','olfangquan','olruoyu'],['zhu']],
			re_zhangzhang:['male','wu',3,['rezhijian','guzheng']],
			
			re_sunce:['male','wu',4,['jiang','olhunzi','olzhiba'],['zhu']],
		},
		characterIntro:{
			re_gongsunzan:'群雄之一。出身贵族，因母地位卑贱，只当了郡中小吏。他貌美，声音洪亮，机智善辩。后随卢植于缑氏山中读书，粗通经传。',
			re_lidian:'字曼成，曹操麾下将领。李典深明大义，不与人争功，崇尚学习与高贵儒雅，尊重博学之士，在军中被称为长者。李典有长者之风，官至破虏将军，三十六岁去世。魏文帝曹丕继位后追谥号为愍侯。',
			sunben:' ',
		},
		characterFilter:{
			//re_zuoci:function(mode){
			//	return mode=='identity'||mode=='single'||mode=='doudizhu';
			//}
		},
		perfectPair:{
			sunben:['zhouyu','taishici','daqiao'],
		},
		skill:{
			sishu:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('sishu')).ai=function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.countMark('sishu2')%2==1) return -att;
						return att;
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('sishu',target)
						target.addSkill('sishu2');
						target.addMark('sishu2',1,false);
					}
				},
			},
			sishu2:{
				charlotte:true,
				marktext:'思',
				intro:{
					name:'思蜀',
					content:'本局游戏内计算【乐不思蜀】的效果时反转#次',
				},
				mod:{
					judge:function(player,result){
						if(_status.event.card&&_status.event.card.name=='lebu'&&player.countMark('sishu2')%2==1){
							if(result.bool==false){
								result.bool=true;
							}
							else{
								result.bool=false;
							}
						}
					}
				},
			},
			olruoyu:{
				skillAnimation:true,
				animationColor:'fire',
				audio:2,
				unique:true,
				juexingji:true,
				zhuSkill:true,
				keepSkill:true,
				derivation:['jijiang','sishu'],
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('olruoyu')) return false;
					if(player.storage.olruoyu) return false;
					return player.isMinHp();
				},
				content:function(){
					'step 0'
					player.storage.olruoyu=true;
					player.gainMaxHp();
					'step 1'
					player.recover();
					game.log(player,'获得了技能','#g【思蜀】','和','#g【激将】');
					player.addSkill('sishu');
					if(player.hasSkill('olruoyu')){
						player.addSkill('jijiang');
					}
					else{
						player.addAdditionalSkill('olruoyu','jijiang');
					}
					if(!player.isZhu){
						player.storage.zhuSkill_olruoyu=['jijiang'];
					}
					else{
						event.trigger('zhuUpdate');
					}
					player.awakenSkill('olruoyu');
				}
			},
			olfangquan:{
				audio:'refangquan',
				trigger:{player:'phaseUseBefore'},
				filter:function(event,player){
					return player.countCards('h')>0&&!player.hasSkill('olfangquan3');
				},
				direct:true,
				content:function(){
					"step 0"
					var fang=player.countMark('olfangquan2')==0&&player.hp>=2&&player.countCards('h')<=player.hp+1;
					player.chooseBool(get.prompt2('olfangquan')).set('ai',function(){
						if(!_status.event.fang) return false;
						return game.hasPlayer(function(target){
							if(target.hasJudge('lebu')||target==player) return false;
							if(get.attitude(player,target)>4){
								return (get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1)>0);
							}
							return false;
						});
					}).set('fang',fang);
					"step 1"
					if(result.bool){
						player.logSkill('olfangquan');
						trigger.cancel();
						player.addSkill('olfangquan2');
						player.addMark('olfangquan2',1,false);
					}
				}
			},
			olfangquan2:{
				trigger:{player:'phaseDiscardBegin'},
				forced:true,
				popup:false,
				audio:false,
				onremove:true,
				content:function(){
					"step 0"
					event.count=player.countMark(event.name);
					"step 1"
					event.count--;
					player.chooseToDiscard('是否弃置一张牌并令一名其他角色进行一个额外回合？').set('logSkill','olfangquan').ai=function(card){
						return 20-get.value(card);
					};
					"step 2"
					if(result.bool){
						player.chooseTarget(true,'请选择进行额外回合的目标角色',lib.filter.notMe).ai=function(target){
							if(target.hasJudge('lebu')) return -1;
							if(get.attitude(player,target)>4){
								return get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1);
							}
							return -1;
						};
					}
					else event.finish();
					"step 3"
					var target=result.targets[0];
					player.line(target,'fire');
					target.markSkillCharacter('olfangquan',player,'放权','进行一个额外回合');
					target.insertPhase();
					target.addSkill('olfangquan3');
					if(event.count>0) event.goto(1);
				}
			},
			olfangquan3:{
				trigger:{player:['phaseAfter','phaseCancelled']},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					player.unmarkSkill('olfangquan');
					player.removeSkill('olfangquan3');
				}
			},
			olluanji:{
				inherit:'luanji',
				audio:'luanji',
				line:false,
				group:'olluanji_remove',
				check:function(card){
					return 7-get.value(card);
				},
			},
			olluanji_remove:{
				trigger:{player:'useCard2'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='wanjian'&&event.targets.length>0;
				},
				line:false,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('olluanji'),'为'+get.translation(trigger.card)+'减少一个目标',function(card,player,target){
						return _status.event.targets.contains(target)
					}).set('targets',trigger.targets).set('ai',function(target){
						var player=_status.event.player;
						return -get.effect(target,_status.event.getTrigger().card,player,player)
					});
					'step 1'
					if(result.bool){
						player.logSkill('olluanji',result.targets);
						trigger.targets.remove(result.targets[0]);
					}
				},
			},
			olxueyi:{
				audio:'xueyi',
				trigger:{global:'phaseBefore'},
				forced:true,
				zhuSkill:true,
				unique:true,
				filter:function(event,player){
					return !player.storage.olxueyi_inited&&player.hasZhuSkill('olxueyi');
				},
				content:function(){
					player.storage.olxueyi_inited=true;
					var num=game.countPlayer(function(current){
						return	current.group=='qun';
					})
					if(num) player.addMark('olxueyi',num)
				},
				marktext:'裔',
				intro:{
					name2:'裔',
					content:'mark',
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.hasZhuSkill('olxueyi')) return num+2*player.countMark('olxueyi');
					},
				},
				group:'olxueyi_draw',
			},
			olxueyi_draw:{
				audio:'xueyi',
				trigger:{player:'phaseBegin'},
				prompt2:'弃置一枚「裔」标记，然后摸一张牌',
				check:function(event,player){
					return !player.hasJudge('lebu')&&player.getUseValue('wanjian')>0;
				},
				filter:function(event,player){
					return player.hasZhuSkill('olxueyi')&&player.hasMark('olxueyi');
				},
				content:function(){
					player.removeMark('olxueyi',1);
					player.draw();
				},
			},
			olhunzi:{
				audio:'hunzi',
				inherit:'hunzi',
				content:function(){
					player.loseMaxHp();
					player.recover();
					player.addSkill('reyingzi');
					player.addSkill('gzyinghun');
					game.log(player,'获得了技能','#g【英姿】','和','#g【英魂】');
					player.awakenSkill(event.name);
					player.storage[event.name]=true;
				}
			},
			olzhiba:{
				audio:'zhiba',
				unique:true,
				zhuSkill:true,
				global:'olzhiba2',
			},
			olzhiba2:{
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(player.hasZhuSkill('olzhiba')&&!player.hasSkill('olzhiba3')&&target.group=='wu'){
								if(player.countCards('h',function(card){
 								var val=get.value(card);
 								if(val<0) return true;
 								if(val<=5){
 									return card.number>=12;
 								}
 								if(val<=6){
 									return card.number>=13;
 								}
 								return false;
 							})>0) return -1;
 							return 0;
							}
							else{
								if(player.countCards('h','du')&&get.attitude(player,target)<0) return -1;
 							if(player.countCards('h')<=player.hp) return 0;
 							var maxnum=0;
 							var cards2=target.getCards('h');
 							for(var i=0;i<cards2.length;i++){
 								if(cards2[i].number>maxnum){
 									maxnum=cards2[i].number;
 								}
 							}
 							if(maxnum>10) maxnum=10;
 							if(maxnum<5&&cards2.length>1) maxnum=5;
 							var cards=player.getCards('h');
 							for(var i=0;i<cards.length;i++){
 								if(cards[i].number<maxnum) return 1;
 							}
 							return 0;
							}
						},
					},
				},
				enable:'phaseUse',
				usable:1,
				prompt:'请选择〖制霸〗的目标',
				filter:function(event,player){
					if(player.hasZhuSkill('olzhiba')&&!player.hasSkill('olzhiba3')&&game.hasPlayer(function(current){
						return current!=player&&current.group=='wu'&&player.canCompare(current);
					})) return true;
					return (player.group=='wu'&&game.hasPlayer(function(current){
						return current!=player&&current.hasZhuSkill('olzhiba',player)&&!current.hasSkill('olzhiba3')&&player.canCompare(current);
					}));
				},
				filterTarget:function(card,player,target){
					if(player.hasZhuSkill('olzhiba')&&!player.hasSkill('olzhiba3')&&target.group=='wu'&&player.canCompare(target)) return true;
					return player.group=='wu'&&target.hasZhuSkill('olzhiba',player)&&!target.hasSkill('olzhiba3')&&player.canCompare(target);
				},
				prepare:function(cards,player,targets){
					if(player.hasZhuSkill('olzhiba')) player.logSkill('olzhiba')
					if(targets[0].hasZhuSkill('olzhiba',player)) targets[0].logSkill('olzhiba');
				},
				direct:true,
				contentBefore:function(){
					'step 0'
					var list=[];
					if(player.hasZhuSkill('olzhiba')&&targets[0].group=='wu'&&!player.hasSkill('olzhiba3')) list.push(player);
					if(player.group=='wu'&&targets[0].hasZhuSkill('olzhiba')&&!targets[0].hasSkill('olzhiba3')) list.push(targets[0]);
					if(list.length==1){
						event.target=list[0];
						event.goto(2);
					}
					else player.chooseTarget(true,'请选择获得所有拼点牌的角色',function(card,player,target){
						return _status.event.list.contains(target);
					}).set('list',list);
					'step 1'
					event.target=result.targets[0];
					'step 2'
					target.addTempSkill('olzhiba3','phaseUseEnd')
					if(target==targets[0]){
						target.chooseBool('是否接受来自'+get.translation(player)+'的拼点请求？').set('choice',(get.attitude(target,player)>0||target.countCards('h',function(card){
							var val=get.value(card);
							if(val<0) return true;
							if(val<=5){
								return card.number>=12;
							}
							if(val<=6){
								return card.number>=13;
							}
							return false;
						})>0)).set('ai',function(){return _status.event.choice});
					}
					else event._result={bool:true};
					'step 3'
					if(result.bool) event.getParent().zhiba_target=target;
					else{
						game.log(target,'拒绝了',player,'的拼点请求');
						target.chat('拒绝');
					}
				},
				content:function(){
					'step 0'
					event.source=event.getParent().zhiba_target;
					if(!event.source){
						event.finish();
					}
					'step 1'
					player.chooseToCompare(target).set('small',target==source&&get.attitude(player,target)>0);
					'step 2'
					if(player==source&&result.bool||target==source&&!result.bool){
						event.cards=[result.player,result.target].filterInD('d');
						if(!event.cards.length) event.finish();
						else source.chooseControl('ok','cancel2').set('dialog',['是否获得拼点牌？',event.cards]).set('ai',function(){
							if(get.value(event.cards,source,'raw')<=0) return false;
							return true;
						});
					}
					else event.finish();
					'step 3'
					if(result.control!='cancel2') source.gain(event.cards,'gain2','log');
				},
			},
			olzhiba3:{},
			rehuashen:{
				//mode:['identity','single','doudizhu'],
				audio:2,
				unique:true,
				direct:true,
				content:function(){
					"step 0"
					_status.noclearcountdown=true;
					event.videoId=lib.status.videoId++;
					var cards=player.storage.rehuashen.character.slice(0);
					if(player.isOnline2()){
						player.send(function(cards,id){
							var dialog=ui.create.dialog('是否发动【化身】？',[cards,'character']);
							dialog.videoId=id;
						},cards,event.videoId);
					}
					event.dialog=ui.create.dialog(get.prompt('rehuashen'),[cards,'character']);
					event.dialog.videoId=event.videoId;
					if(!event.isMine()){
						event.dialog.style.display='none';
					}
					if(event.triggername=='rehuashen') event._result={control:'更换技能'};
					else player.chooseControl('弃置化身','更换技能','cancel2');
					"step 1"
					event.control=result.control;
					if(event.control=='cancel2'){
						if(player.isOnline2()){
							player.send('closeDialog',event.videoId);
						}
						delete _status.noclearcountdown;
						if(!_status.noclearcountdown){
							game.stopCountChoose();
						}
						event.dialog.close();
						event.finish();return;
					}
					if(!event.logged){player.logSkill('rehuashen');event.logged=true}
					var next=player.chooseButton(true).set('dialog',event.videoId);
					if(event.control=='弃置化身'){
						next.set('selectButton',[1,2]);
						next.set('filterButton',function(button){
							return button.link!=_status.event.current;
						});
						next.set('current',player.storage.rehuashen.current);
					}
					var prompt=event.control=='弃置化身'?'选择弃置至多两张化身':'选择要切换的化身';
					var func=function(id,prompt){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.content.childNodes[0].innerHTML=prompt;
						}
					}
					if(player.isOnline2()){
						player.send(func,event.videoId,prompt);
					}
					else if(event.isMine()){
						func(event.videoId,prompt);
					}
					"step 2"
					if(result.bool&&event.control!='弃置化身'){
						event.card=result.links[0];
						var func=function(card,id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].classList.add('selectedx');
									}
									else{
										dialog.buttons[i].classList.add('unselectable');
									}
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.card,event.videoId);
						}
						else if(event.isMine()){
							func(event.card,event.videoId);
						}
						var list=player.storage.rehuashen.map[event.card].slice(0);
						list.push('返回');
						player.chooseControl(list);
					}
					else{
						lib.skill.rehuashen.removeHuashen(player,result.links.slice(0));
						lib.skill.rehuashen.addHuashens(player,result.links.length);
					}
					"step 3"
					if(result.control=='返回'){
						var func=function(id){
							var dialog=get.idDialog(id);
							if(dialog){
								for(var i=0;i<dialog.buttons.length;i++){
									dialog.buttons[i].classList.remove('selectedx');
									dialog.buttons[i].classList.remove('unselectable');
								}
							}
						}
						if(player.isOnline2()){
							player.send(func,event.videoId);
						}
						else if(event.isMine()){
							func(event.videoId);
						}
						event._result={control:'更换化身'};
						event.goto(1);
						return;
					}
					if(player.isOnline2()){
						player.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					delete _status.noclearcountdown;
					if(!_status.noclearcountdown){
						game.stopCountChoose();
					}
					if(event.control=='弃置化身') return;
					if(player.storage.rehuashen.current!=event.card){
						player.storage.rehuashen.current=event.card;
						game.broadcastAll(function(character,player){
							player.sex=lib.character[character][0];
							player.group=lib.character[character][1];
							player.node.name.dataset.nature=get.groupnature(player.group);
						},event.card,player);
					}
					var link=result.control;
					player.storage.rehuashen.current2=link;
					if(!player.additionalSkills.rehuashen||!player.additionalSkills.rehuashen.contains(link)){
						player.addAdditionalSkill('rehuashen',link);
						player.flashAvatar('rehuashen',event.card);
						game.log(player,'获得技能','#g【'+get.translation(link)+'】');
						player.popup(link);
						player.syncStorage('rehuashen');
						player.updateMarks('rehuashen');
					}
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]={
						character:[],
						map:{},
					}
				},
				group:'rehuashen_init',
				trigger:{
					player:['phaseBegin','phaseEnd','rehuashen'],
				},
				filter:function(event,player,name){
					//if(name=='phaseBegin'&&game.phaseNumber==1) return false;
					return player.storage.rehuashen&&player.storage.rehuashen.character.length>0;
				},
				addHuashen:function(player){
					if(!player.storage.rehuashen) return;
					if(!_status.characterlist){
						var list=[];
						for(var i in lib.character){
							if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
							list.push(i);
						}
						game.countPlayer2(function(current){
							list.remove(current.name);
							list.remove(current.name1);
							list.remove(current.name2);
							if(current.storage.rehuashen&&current.storage.rehuashen.character) list.removeArray(current.storage.rehuashen.character)
						});
						_status.characterlist=list;
					}
					_status.characterlist.randomSort();
					var bool=false;
					for(var i=0;i<_status.characterlist.length;i++){
						var name=_status.characterlist[i];
						if(name.indexOf('zuoci')!=-1||name.indexOf('key')==0||player.storage.rehuashen.character.contains(name)) continue;
						var skills=lib.character[name][3];
						for(var j=0;j<skills.length;j++){
							var info=lib.skill[skills[j]];
							if(info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill) skills.splice(j--,1);
						}
						if(skills.length){
							player.storage.rehuashen.character.push(name);
							player.storage.rehuashen.map[name]=skills;
							_status.characterlist.remove(name);
							return name;
						}
					}
				},
				addHuashens:function(player,num){
					var list=[];
					for(var i=0;i<num;i++){
						var name=lib.skill.rehuashen.addHuashen(player);
						if(name) list.push(name);
					}
					if(list.length){
						game.log(player,'获得了',get.cnNumber(list.length)+'张','#g化身')
						lib.skill.rehuashen.drawCharacter(player,list);
					}
				},
				removeHuashen:function(player,links){
					player.storage.rehuashen.character.removeArray(links);
					_status.characterlist.addArray(links);
					game.log(player,'移去了',get.cnNumber(links.length)+'张','#g化身')
				},
				drawCharacter:function(player,list){
					game.broadcastAll(function(player,list){
						if(player.isUnderControl(true)){
							var cards=[];
							for(var i=0;i<list.length;i++){
								var cardname='huashen_card_'+list[i];
								lib.card[cardname]={
									fullimage:true,
									image:'character:'+list[i]
								}
								lib.translate[cardname]=lib.translate[list[i]];
								cards.push(game.createCard(cardname,'',''));
							}
							player.$draw(cards,'nobroadcast');
						}
					},player,list);
				},
				intro:{
					onunmark:function(storage,player){
						_status.characterlist.addArray(storage.character);
						storage.character=[];
					},
					mark:function(dialog,storage,player){
						if(storage&&storage.current) dialog.addSmall([[storage.current],'character']);
						if(storage&&storage.current2) dialog.addText('【'+get.translation(storage.current2)+
								'】'+lib.translate[storage.current2+'_info']);
						if(storage&&storage.character.length){
							if(player.isUnderControl(true)){
								dialog.addSmall([storage.character,'character']);
							}
							else{
								dialog.addText('共有'+get.cnNumber(storage.character.length)+'张“化身”');
							}
						}
						else{
							return '没有化身';
						}
					},
					content:function(storage,player){
							return '共有'+get.cnNumber(storage.character.length)+'张“化身”'
					},
					markcount:function(storage,player){
						if(storage&&storage.character) return storage.character.length;
						return 0;
					},
				},
			},
			rehuashen_init:{
				trigger:{
					global:'gameDrawAfter',
					player:'enterGame',
				},
				forced:true,
				popup:false,
				content:function(){
					lib.skill.rehuashen.addHuashens(player,3);
					player.syncStorage('rehuashen');
					player.markSkill('rehuashen');
					var next=game.createEvent('rehuashen');
					next.player=player;
					next._trigger=trigger;
					next.triggername='rehuashen';
					next.setContent(lib.skill.rehuashen.content);
				},
			},
			rexingsheng:{audio:2},
			rexinsheng:{
				//mode:['identity','single','doudizhu'],
				unique:true,
				audio:'rexingsheng',
				trigger:{player:'damageEnd'},
				frequent:true,
				content:function(){
					lib.skill.rehuashen.addHuashens(player,trigger.num);
					player.syncStorage('rehuashen');
					player.updateMarks('rehuashen');
				},
			},
			"reguhuo":{
				audio:2,
				group:["reguhuo_guess","reguhuo_respond","reguhuo_wuxie"],
				derivation:'rechanyuan',
				enable:"chooseToUse",
				filter:function (event,player){
					if(!player.countCards('h')||player.hasSkill('reguhuo_phase')) return false;
					var list=['sha','tao','shan','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
					if(get.mode()=='guozhan'){
						list=list.concat(['xietianzi','shuiyanqijunx','lulitongxin','lianjunshengyan','chiling','diaohulishan','yuanjiao','huoshaolianying']);
					}
					for(var i=0;i<list.length;i++){
						if(event.filterCard({name:list[i]},player)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function (){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=='wuxie') continue;
							if(name=='sha'){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
								list.push(['基本','','sha','thunder']);
							}
							else if(get.type(name)=='trick') list.push(['锦囊','',name]);
							else if(get.type(name)=='basic') list.push(['基本','',name]);
						}
						return ui.create.dialog('蛊惑',[list,'vcard']);
					},
					filter:function (button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard({name:button.link[2]},player,evt);
						}
						return true;
					},
					backup:function (links,player){
						return {
							filterCard:true,
							selectCard:1,
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function (links,player){
						return '将一张手牌当'+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					save:true,
					respondShan:true,
					respondSha:true,
					skillTagFilter:function(player){
						if(!player.countCards('h')||player.hasSkill('reguhuo_phase')) return false;
					},
				},
			},
			"reguhuo_guess":{
				audio:'reguhuo',
				trigger:{
					player:"useCardBefore",
				},
				filter:function (event,player){
					return event.skill=="reguhuo_backup"||event.skill=="reguhuo_wuxie";
				},
				forced:true,
				direct:true,
				priority:15,
				content:function (){
					'step 0'
					player.logSkill('reguhuo_guess');
					player.addTempSkill('reguhuo_phase');
					player.popup(trigger.card.name,'metal');
					player.lose(trigger.cards,ui.special);
					player.line(trigger.targets,trigger.card.nature);
					trigger.line=false;
					event.prompt=get.translation(player)+'声明了'+get.translation(trigger.card.name)+'，是否质疑？';
					event.guessers=game.filterPlayer(function(current){
						return current!=player&&!current.hasSkill('rechanyuan');
					});
					event.guessers.sort(lib.sort.seat);
					event.ally=[];
					event.betray=[];
					'step 1'
					if(event.guessers.length==0) event.goto(3);
					else{
						event.guessers[0].chooseControl('质疑','不质疑').set('prompt',event.prompt).set('ai',function(){
							if(get.attitude(event.guessers[0],player)>0) return '不质疑';
							return Math.random()<0.5?'不质疑':'质疑';
						});
					}
					'step 2'
					if(!result.control) result.control='不质疑';
					//event.guessers[0].chat(result.control);
					//game.delay();
					if(result.control=='不质疑'){
						//game.log(event.guessers[0],'#g不质疑');
						event.ally.push(event.guessers[0]);
					}else{
						//game.log(event.guessers[0],'#y质疑');
						event.betray.push(event.guessers[0]);
					}
					event.guessers.remove(event.guessers[0]);
					if(event.guessers.length) event.goto(1);
					'step 3'
					for(var i=0;i<event.ally.length;i++) event.ally[i].chat('不质疑');
					for(var i=0;i<event.betray.length;i++) event.betray[i].chat('质疑');
					game.delay(1.5);
					'step 4'
					player.showCards(trigger.cards);
					if(event.betray.length){
						if(trigger.card.name==trigger.cards[0].name){
							event.fake=false;
						}
						else{
							event.fake=true;
							game.log(player,'使用的','#y'+get.translation(trigger.card.name),'作废了');
							game.cardsDiscard(trigger.cards);
							trigger.cancel();
							game.asyncDraw(event.betray);
							if(trigger.name=='useCard'&&trigger.parent) trigger.parent.goto(0);
						}
					}
					else event.finish();
					'step 5'
					if(event.fake){
						game.delay();
						event.finish();
					}
					'step 6'
					var target=event.betray.shift();
					event.target=target;
					target.chooseToDiscard('弃置一张牌或失去一点体力','he').ai=lib.skill.qiangxi.check;
					'step 7'
					if(!result.bool) target.loseHp();
					'step 8'
					target.addSkill('rechanyuan');
					if(event.betray.length) event.goto(6);
				},
			},
			"reguhuo_respond":{
				trigger:{
					player:"chooseToRespondBegin",
				},
				filter:function (event,player){
					if(event.responded) return false;
					if(!event.filterCard({name:'shan'})&&!event.filterCard({name:'sha'})) return false;
					if(!player.countCards('h')||player.hasSkill('reguhuo_phase')) return false;
					return true;
				},
				direct:true,
				content:function (){
					'step 0'
					if(trigger.filterCard({name:'shan'})&&lib.filter.cardRespondable({name:'shan'},player,trigger)) event.name='shan';
					else event.name='sha';
					player.chooseCard('是否发动【蛊惑】，将一张手牌当做'+get.translation(event.name)+'打出？');
					'step 1'
					if(result.bool){
						player.logSkill('reguhuo_guess');
						player.addTempSkill('reguhuo_phase');
						player.popup(event.name,'metal');
						player.lose(result.cards,ui.special);
						event.card=result.cards[0];
						event.prompt=get.translation(player)+'声明了'+get.translation(event.name)+'，是否质疑？';
						event.guessers=game.filterPlayer(function(current){
							return current!=player&&!current.hasSkill('rechanyuan');
						});
						event.guessers.sort(lib.sort.seat);
						event.ally=[];
						event.betray=[];
					}
					else event.finish();
					'step 2'
					if(event.guessers.length==0) event.goto(4);
					else{
						event.guessers[0].chooseControl('质疑','不质疑').set('prompt',event.prompt).set('ai',function(){
							if(get.attitude(event.guessers[0],player)>0) return '不质疑';
							return Math.random()<0.5?'不质疑':'质疑';
						});
					}
					'step 3'
					if(!result.control) result.control='不质疑';
					//event.guessers[0].chat(result.control);
					//game.delay();
					if(result.control=='不质疑'){
						//game.log(event.guessers[0],'#g不质疑');
						event.ally.push(event.guessers[0]);
					}else{
						//game.log(event.guessers[0],'#y质疑');
						event.betray.push(event.guessers[0]);
					}
					event.guessers.remove(event.guessers[0]);
					if(event.guessers.length) event.goto(2);
					'step 4'
					for(var i=0;i<event.ally.length;i++) event.ally[i].chat('不质疑');
					for(var i=0;i<event.betray.length;i++) event.betray[i].chat('质疑');
					game.delay(1.5);
					'step 5'
					var bool=true;
					player.showCards(event.card);
					if(event.betray.length){
						if(event.name==event.card.name){
							event.fake=false;
						}
						else{
							event.fake=true;
							game.log(player,'打出的','#y'+get.translation(event.name),'作废了');
							game.cardsDiscard(event.card);
							bool=false;
							game.asyncDraw(event.betray);
						}
					}
					else event.finish();
					if(bool){
						trigger.untrigger();
						trigger.responded=true;
						trigger.result={bool:true,card:{name:event.name},cards:[event.card]};
					}
					'step 6'
					if(event.fake){
						game.delay();
						event.finish();
					}
					'step 7'
					var target=event.betray.shift();
					event.target=target;
					target.chooseToDiscard('弃置一张牌或失去一点体力','he').ai=lib.skill.qiangxi.check;
					'step 8'
					if(!result.bool) target.loseHp();
					'step 9'
					if(target.isAlive()) target.addSkill('rechanyuan');
					if(event.betray.length) event.goto(7);
				},
				ai:{
					order:4,
					useful:-1,
					value:-1,
				},
			},
			"reguhuo_wuxie":{
				log:false,
				silent:true,
				popup:false,
				enable:"chooseToUse",
				filterCard:true,
				viewAsFilter:function (player){
					return !player.hasSkill('reguhuo_phase')&&player.countCards('h')>0;
				},
				viewAs:{
					name:"wuxie",
				},
				check:function(card){
					if(card.name=='wuxie') return 1000;
					return 0;
				},
				prompt:"将一张手牌当无懈可击使用",
				threaten:1.2,
			},
			reguhuo_phase:{},
			rechanyuan:{
				//charlotte:true,
				firstDo:true,
				trigger:{
					player:["phaseBefore","changeHp"],
				},
				priority:99,
				forced:true,
				popup:false,
				unique:true,
				content:function (){
					if(player.hp<=1){
						var skills=player.getSkills(true,false);
						for(var i=0;i<skills.length;i++){
							var info=get.info(skills[i]);
							if(skills[i]=='chanyuan'||skills[i]=='rechanyuan'||info.charlotte){
								skills.splice(i--,1);
							}
						}
						player.disableSkill('rechanyuan',skills);
					}
					else player.enableSkill('rechanyuan');
				},
				mark:true,
				intro:{
					content:function (storage,player,skill){
						var str='<li>锁定技，你不能质疑于吉，只要你的体力值不大于1，你的其他技能便全部失效。';
						var list=[];
						for(var i in player.disabledSkills){
							if(player.disabledSkills[i].contains(skill)){
								list.push(i)
							}
						}
						if(list.length){
							str+='<br><li>失效技能：';
							for(var i=0;i<list.length;i++){
								if(lib.translate[list[i]+'_info']){
									str+=get.translation(list[i])+'、';
								}
							}
							return str.slice(0,str.length-1);
						}else return str;
					},
				},
				init:function (player,skill){
					if(player.hp<=1){
						var skills=player.getSkills(true,false);
						for(var i=0;i<skills.length;i++){
							var info=get.info(skills[i]);
							if(skills[i]=='chanyuan'||skills[i]=='rechanyuan'||info.charlotte){
								skills.splice(i--,1);
							}
						}
						player.disableSkill(skill,skills);
					}
				},
				onremove:function (player,skill){
					player.enableSkill(skill);
				},
				locked:true,
			},
			botu:{
				audio:2,
				trigger:{player:'phaseAfter'},
				frequent:true,
				filter:function(event,player){
					var history=player.getHistory('useCard',function(evt){
						return evt.isPhaseUsing();
					});
					var suits=[];
					for(var i=0;i<history.length;i++){
						var suit=get.suit(history[i].card);
						if(suit) suits.add(suit);
					}
					return suits.length==4;
				},
				content:function(){
					player.insertPhase();
				},
			},
			xinleiji:{
				group:'xinleiji_misa',
				audio:2,
				audioname:['boss_qinglong'],
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return event.card.name=='shan'||event.name=='useCard'&&event.card.name=='shandian';
				},
				judgeCheck:function(card,bool){
					var suit=get.suit(card);
					if(suit=='spade'){
						if(bool&&card.number>1&&card.number<10) return 5;
						return 4;
					}
					if(suit=='club') return 2;
					return 0;
				},
				content:function(){
					player.judge(lib.skill.xinleiji.judgeCheck);
				},
				ai:{
					useShan:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')){
								var hastarget=game.hasPlayer(function(current){
									return get.attitude(target,current)<0;
								});
								var be=target.countCards('e',{color:'black'});
								if(target.countCards('h','shan')&&be){
									if(!target.hasSkill('xinguidao')) return 0;
									return [0,hastarget?target.countCards('he')/2:0];
								}
								if(target.countCards('h','shan')&&target.countCards('h')>2){
									if(!target.hasSkill('xinguidao')) return 0;
									return [0,hastarget?target.countCards('h')/4:0];
								}
								if(target.countCards('h')>3||(be&&target.countCards('h')>=2)){
									return [0,0];
								}
								if(target.countCards('h')==0){
									return [1.5,0];
								}
								if(target.countCards('h')==1&&!be){
									return [1.2,0];
								}
								if(!target.hasSkill('xinguidao')) return [1,0.05];
								return [1,Math.min(0.5,(target.countCards('h')+be)/4)];
							}
						}
					}
				}
			},
			xinleiji_misa:{
				audio:'xinleiji',
				trigger:{player:'judgeAfter'},
				direct:true,
				filter:function(event,player){
					return event.judgestr!='暴虐'&&event.judgestr!='助祭'&&['spade','club'].contains(event.result.suit);
				},
				content:function(){
					'step 0'
					event.num=1+['club','spade'].indexOf(trigger.result.suit);
					event.logged=false;
					if(event.num==1&&player.isDamaged()){
						event.logged=true;
						player.logSkill('xinleiji');
						player.recover();
					}
					player.chooseTarget('雷击：是否对一名角色造成'+event.num+'点雷电伤害？',lib.filter.notMe).ai=function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'thunder');
					};
					'step 1'
					if(result.bool&&result.targets&&result.targets.length){
						if(!event.logged) player.logSkill('xinleiji',result.targets);
						else player.line(result.targets,'thunder');
						result.targets[0].damage(event.num,'thunder');
					}
				},
			},
			xinguidao:{
				audio:2,
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('he',{color:'black'})>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('xinguidao'),'he',function(card){
  				if(get.color(card)!='black') return false;
  				var player=_status.event.player;
  				var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
  				if(mod2!='unchanged') return mod2;
  				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
  				if(mod!='unchanged') return mod;
  				return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0){
							if(trigger.player!=player) return 0;
							if(game.hasPlayer(function(current){
								return get.attitude(player,current)<0;
							})){
								var checkx=lib.skill.xinleiji.judgeCheck(card,true)-lib.skill.xinleiji.judgeCheck(judging);
								if(checkx>0) return checkx;
							}
							return 0;
						};
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight','xinguidao','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.$gain2(trigger.player.judging[0]);
						player.gain(trigger.player.judging[0]);
						var card=result.cards[0];
						if(get.suit(card)=='spade'&&card.number>1&&card.number<10) player.draw('nodelay');
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}
					"step 3"
					game.delay(2);
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1
					}
				}
			},
			reqingguo:{
				audio:2,
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card){
					return get.color(card)=='black';
				},
				position:'he',
				viewAs:{name:'shan'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{color:'black'})) return false;
				},
				prompt:'将一张黑色牌当闪打出',
				check:function(){return 1},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('he',{color:'black'})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					}
				}
			},
			reqiangxi:{
				subSkill:{
					off:{
						sub:true,
					},
				},
				audio:2,
				enable:"phaseUse",
				filterCard:function (card){
					return get.subtype(card)=='equip1';
				},
				selectCard:function (){
					return [0,1];
				},
				filterTarget:function (card,player,target){
					if(player==target) return false;
					if(target.hasSkill('reqiangxi_off')) return false;
					return get.distance(player,target,'attack')<=1;
				},
				content:function (){
					"step 0"
					if(cards.length==0){
						player.loseHp();
					}
					"step 1"
					target.addTempSkill('reqiangxi_off');
					target.damage('nocard');
				},
				check:function (card){
					return 10-get.value(card);
				},
				position:"he",
				ai:{
					order:8.5,
					result:{
						target:function (player,target){
							if(!player.countCards('he',{type:'equip'})){
								if(player.hp<2) return 0;
								if(target.hp>=player.hp) return 0;
							}
							return get.damageEffect(target,player);
						},
					},
				},
				threaten:1.5,
			},
			rehuoji:{
				position:"he",
				audio:2,
				enable:"chooseToUse",
				filterCard:function (card){
					return get.color(card)=='red';
				},
				viewAs:{
					name:"huogong",
					nature:"fire",
				},
				viewAsFilter:function (player){
					if(!player.countCards('he',{color:'red'})) return false;
				},
				prompt:"将一张红色牌当火攻使用",
				check:function (card){
					var player=_status.currentPhase;
					if(player.countCards('h')>player.hp){
						return 6-get.value(card);
					}
					return 4-get.value(card)
				},
				ai:{
					basic:{
						order:4,
						value:[3,1],
						useful:1,
					},
					wuxie:function (target,card,player,current,state){
						if(get.attitude(current,player)>=0&&state>0) return false;
					},
					result:{
						player:function (player){
							var nh=player.countCards('h');
							if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'})){
									return -10;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -10;
									if(viewAs&&viewAs.name=='huogong') return -10;
								}
							}
							return 0;
						},
						target:function (player,target){
							if(target.hasSkill('huogong2')||target.countCards('h')==0) return 0;
							if(player.countCards('h')<=1) return 0;
							if(target==player){
								if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'})){
									return -1.5;
								}
								if(_status.event.skill){
									var viewAs=get.info(_status.event.skill).viewAs;
									if(viewAs=='huogong') return -1.5;
									if(viewAs&&viewAs.name=='huogong') return -1.5;
								}
								return 0;
							}
							return -1.5;
						},
					},
					tag:{
						damage:1,
						fireDamage:1,
						natureDamage:1,
						norepeat:1,
					},
				},
			},
			rekanpo:{
				audio:2,
				position:"he",
				enable:"chooseToUse",
				filterCard:function (card){
					return get.color(card)=='black';
				},
				viewAsFilter:function (player){
					return player.countCards('he',{color:'black'})>0;
				},
				viewAs:{
					name:"wuxie",
				},
				prompt:"将一张黑色手牌当无懈可击使用",
				check:function (card){return 8-get.value(card)},
				threaten:1.2,
				ai:{
					basic:{
						useful:[6,4],
						value:[6,4],
					},
					result:{
						player:1,
					},
					expose:0.2,
				},
			},
			rejieming:{
				audio:2,
				trigger:{
					player:"damageEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					event.count=trigger.num;
					"step 1"
					player.chooseTarget(get.prompt('rejieming'),'令一名角色摸两张牌。然后若其手牌数少于体力上限，你摸一张牌').set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							if((target.maxHp-target.countCards('h'))>2) return 2*att;
							return att;
						}
						return att/3;
					});
					"step 2"
					if(result.bool){
						event.current=result.targets[0];
						player.logSkill('rejieming',event.current);
						player.line(event.current,'thunder');
						event.current.draw(2);
						event.count--;
					}
					else event.finish();
					"step 3"
					if(event.current.countCards('h')<event.current.maxHp){
						player.draw();
					}
					if(event.count>0) event.goto(1);
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'damage')&&target.hp>1){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								var max=0;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(get.attitude(target,players[i])>0){
										max=Math.max(Math.min(5,players[i].hp)-players[i].countCards('h'),max);
									}
								}
								switch(max){
									case 0:return 2;
									case 1:return 1.5;
									case 2:return [1,2];
									default:return [0,max];
								}
							}
							if((card.name=='tao'||card.name=='caoyao')&&
								target.hp>1&&target.countCards('h')<=target.hp) return [0,0];
						},
					},
				},
			},
			reshuangxiong:{
				trigger:{
					player:"phaseDrawBegin1",
				},
				group:"reshuangxiong2",
				audio:"shuangxiong",
				audioname:['re_yanwen'],
				check:function (event,player){
					if(player.countCards('h')>player.hp) return true;
					if(player.countCards('h')>3) return true;
					return false;
				},
				content:function (){
					"step 0"
					trigger.cancel(null,null,'notrigger');
					event.cards=get.cards(2);
					event.videoId=lib.status.videoId++;
					game.broadcastAll(function(player,id,cards){
						var str;
						if(player==game.me&&!_status.auto){
							str='【双雄】选择获得其中一张牌';
						}
						else{
							str='双雄';
						}
						var dialog=ui.create.dialog(str,cards);
						dialog.videoId=id;
					},player,event.videoId,event.cards);
					event.time=get.utc();
					game.addVideo('showCards',player,['双雄',get.cardsInfo(event.cards)]);
					game.addVideo('delay',null,2);
					"step 1"
					var next=player.chooseButton([1,1],true);
					next.set('dialog',event.videoId);
					next.set('ai',function(button){
						var player=_status.event.player;
						var color=get.color(button.link);
						var value=get.value(button.link,player);
						if(player.countCards('h',{color:color})>player.countCards('h',['red','black'].remove(color)[0])) value+=5;
						return value;
					});
					"step 2"
					if(result.bool&&result.links){
						var cards2=[];
						for(var i=0;i<result.links.length;i++){
							cards2.push(result.links[i]);
							cards.remove(result.links[i]);
						}
						game.cardsDiscard(cards);
						event.card2=cards2[0];
					}
					var time=1000-(get.utc()-event.time);
					if(time>0){
						game.delay(0,time);
					}
					"step 3"
					game.broadcastAll('closeDialog',event.videoId);
					var card2=event.card2;
					player.gain(card2,'gain2');
					player.addTempSkill('shuangxiong2');
					player.storage.shuangxiong=get.color(card2);
					game.delay();
				},
			},
			"reshuangxiong2":{
				trigger:{
					player:"damageEnd",
				},
				direct:true,
				filter:function (event,player){
					var evt=event.getParent();
					return (evt&&evt.name=='juedou'&&evt[player==evt.player?'targetCards':'playerCards'].length)>0;
				},
				content:function (){
					"step 0"
					var evt=trigger.getParent();
					var cards=evt[player==evt.player?'targetCards':'playerCards'].slice(0);
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])!='d') cards.remove(cards[i--]);
					}
					if(!cards.length) event.finish();
					else{
						event.cards=cards;
						player.chooseBool('是否发动【双雄】，获得'+get.translation(event.cards)+'?').ai=function(){
							return true;
						};
					}
					"step 1"
					if(result.bool){
						player.logSkill('reshuangxiong');
						player.gain(cards,'gain2');
					}
				},
			},
			
			"new_yajiao":{
				audio:"reyajiao",
				trigger:{
					player:["respond","useCard"],
				},
				frequent:true,
				filter:function (event,player){
					return player!=_status.currentPhase&&get.itemtype(event.cards)=='cards';
				},
				content:function (){
					"step 0"
					event.card=get.cards();
					player.showCards(event.card);
					event.same=false;
					if(get.type(event.card[0],'trick')==get.type(trigger.card,'trick')) event.same=true;
					player.chooseTarget('选择获得此牌的角色',true).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.du){
							if(target.hasSkillTag('nodu')) return 0;
							return -att;
						}
						if(!_status.event.same) att+=target==_status.event.player?1:0;
						if(att>0){
							return att+Math.max(0,5-target.countCards('h'));
						}
						return att;
					}).set('du',event.card.name=='du').set('same',event.same);
					"step 1"
					if(result.targets){
						player.line(result.targets,'green');
						result.targets[0].gain(event.card,'gain2');
						if(!event.same) player.chooseToDiscard(true,'he');
					}
				},
				ai:{
					effect:{
						target:function (card,player){
							if(get.tag(card,'respond')&&player.countCards('h')>1) return [1,0.2];
						},
					},
				},
			},
			"new_liyu":{
				audio:"liyu",
				trigger:{
					source:"damageSource",
				},
				filter:function (event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.player!=player&&event.player.isAlive()&&event.player.countGainableCards(player,'hej')>0;
				},
				direct:true,
				content:function (){
					'step 0'
					player.gainPlayerCard(get.prompt('new_liyu',trigger.player),trigger.player,'hej','visibleMove').set('ai',function(card){
						var player=_status.event.player;
						var evt=_status.event.target;
						if(get.attitude(player,evt)>0&&get.position(card)=='j') return 4+get.value(card);
						if(get.type(card)=='equip'){
							if(get.attitude(player,evt)>0&&game.hasPlayer(function(current){
								return (player.canUse({name:'juedou'},current)&&current!=evt.target&&get.effect(current,{name:'juedou'},player,player)>2);
							})){
								return 5;
							}
							else if(game.hasPlayer(function(current){
								return (player.canUse({name:'juedou'},current)&&current!=evt&&current!=player&&get.effect(current,{name:'juedou'},player,player)<0);
							})){
								return 1;
							}
							else return 4;
						};
						return 3;
					}).set('logSkill',['new_liyu',trigger.player]);
					'step 1'
					if(result.bool){
						if(get.type(result.cards[0])!='equip'){
							trigger.player.draw();
							event.finish();
						}
					else{
						if(!game.hasPlayer(function(current){
							return current!=player&&current!=trigger.player&&player.canUse('juedou',current);
						})){
							event.finish();
							return;
						}
						trigger.player.chooseTarget(true,function(card,player,target){
							var evt=_status.event.getParent();
							return evt.player.canUse({name:'juedou'},target)&&target!=_status.event.player;
						},'请选择一名角色，视为'+get.translation(player)+'对其使用【决斗】').set('ai',function(target){
							var evt=_status.event.getParent();
							return get.effect(target,{name:'juedou'},evt.player,_status.event.player)-2;
						});
						}
					}
					else event.finish();
					'step 2'
					if(result.targets){
						player.useCard({name:'juedou'},result.targets[0],'noai');
					}
				},
				ai:{
					halfneg:true,
				},
			},
			"new_retuxi":{
				audio:"retuxi",
				trigger:{
					player:"phaseDrawBegin2",
				},
				direct:true,
				//priority:-10,
				filter:function (event){
					return event.num>0;
				},
				content:function (){
					"step 0"
					var num=get.copy(trigger.num);
					if(get.mode()=='guozhan'&&num>2) num=2;
					player.chooseTarget(get.prompt('new_retuxi'),'获得至多'+get.translation(num)+'名角色的各一张手牌，然后少摸等量的牌',[1,num],function(card,player,target){
						return target.countCards('h')>0&&player!=target;
					},function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					});
					"step 1"
					if(result.bool){
						result.targets.sortBySeat();
						player.logSkill('new_retuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.num-=result.targets.length;
					}
					else{
						event.finish();
					}
					"step 2"
					if(trigger.num<=0) game.delay();
				},
				ai:{
					threaten:1.6,
					expose:0.2,
				},
			},
			"new_reyiji":{
				audio:"reyiji",
				trigger:{
					player:"damageEnd",
				},
				frequent:true,
				filter:function (event){
					return (event.num>0)
				},
				content:function (){
					"step 0"
					event.count=1;
					"step 1"
					player.draw(2);
					event.given=0;
					"step 2"
					player.chooseCardTarget({
						filterCard:true,
						selectCard:[1,2-event.given],
						filterTarget:function(card,player,target){
							return player!=target&&target!=event.temp;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 3"
					if(result.bool){
						player.line(result.targets,'green');
						result.targets[0].gain(result.cards,player,'giveAuto');
						event.given+=result.cards.length;
						if(event.given<2){
							event.temp=result.targets[0];
							event.goto(2);
						}
						else if(event.count<trigger.num){
							delete event.temp;
							event.count++;
							player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
						}
						else event.finish();
					}
					else if(event.count<trigger.num){
						delete event.temp;
						event.count++;
						player.chooseBool(get.prompt2(event.name)).set('frequentSkill',event.name);
					}
					else event.finish();
					"step 4"
					if(result.bool){
						player.logSkill(event.name);
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					result:{
						effect:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(player.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						},
					},
					threaten:0.6,
				},
			},
			"new_rejianxiong":{
				audio:"rejianxiong",
				trigger:{
					player:"damageEnd",
				},
				content:function (){
					"step 0"
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0],true)=='o'){
						player.gain(trigger.cards,"gain2");
					}
					player.draw('nodelay');
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
					effect:{
						target:function (card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')&&player!=target) return [1,0.6];
						},
					},
				},
			},
			"new_reluoyi":{
				audio:"reluoyi",
				trigger:{
					player:"phaseDrawBegin1",
				},
				forced:true,
				locked:false,
				content:function (){
					"step 0"
					var cards=get.cards(3);
					game.cardsGotoOrdering(cards);
					player.showCards(cards,'裸衣');
					var cardsx=[];
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])=='basic'||cards[i].name=='juedou'||
							(get.type(cards[i])=='equip'&&get.subtype(cards[i])=='equip1')){
							cardsx.push(cards[i]);
						}
					}
					event.cards=cardsx;
					player.chooseBool("是否放弃摸牌"+(cardsx.length?("，改为获得"+get.translation(cardsx)):"")+"？").ai=function(event,player){
						var num=3
						for(var i=0;i<event.cards.length;i++){
							if(get.type(event.cards[i])!='basic'&&event.cards[i].name!='juedou'&&
								(get.type(event.cards[i])!='equip'||get.subtype(event.cards[i])!='equip1')){
								num--;
							}
						}
						return num>=trigger.num;
					};
					"step 1"
					if(result.bool){
						if(cards.length) player.gain(cards,'gain2');
						//game.cardsDiscard(cards2);
						player.addTempSkill('reluoyi2',{player:'phaseBefore'});
						trigger.cancel(null,null,'notrigger');
					}
					//else game.cardsDiscard(cards);
				},
			},
			"new_rewusheng":{
				mod:{
					targetInRange:function (card){
						if(get.suit(card)=='diamond'&&(_status.event.skill=='new_rewusheng'||card.name=='sha')) return true;
					},
				},
				audio:"wusheng",
				audioname:['re_guanyu','guanzhang','jsp_guanyu','guansuo'],
				enable:["chooseToRespond","chooseToUse"],
				filterCard:function (card,player){
					if(get.zhu(player,'shouyue')) return true;
					return get.color(card)=='red';
				},
				position:"he",
				viewAs:{
					name:"sha",
				},
				viewAsFilter:function (player){
					if(get.zhu(player,'shouyue')){
						if(!player.countCards('he')) return false;
					}
					else{
						if(!player.countCards('he',{color:'red'})) return false;
					}
				},
				prompt:"将一张红色牌当杀使用或打出",
				check:function (card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function (player){
						if(get.zhu(player,'shouyue')){
							if(!player.countCards('he')) return false;
						}
						else{
							if(!player.countCards('he',{color:'red'})) return false;
						}
					},
					respondSha:true,
					basic:{
						useful:[5,1],
						value:[5,1],
					},
					order:function (){
						if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10;
						return 3;
					},
					result:{
						target:function (player,target){
							if(player.hasSkill('jiu')&&!target.getEquip('baiyin')){
								if(get.attitude(player,target)>0){
									return -6;
								}
								else{
									return -3;
								}
							}
							return -1.5;
						},
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:function (card){
							if(card.nature=='poison') return;
							return 1;
						},
						natureDamage:function (card){
							if(card.nature) return 1;
						},
						fireDamage:function (card,nature){
							if(card.nature=='fire') return 1;
						},
						thunderDamage:function (card,nature){
							if(card.nature=='thunder') return 1;
						},
						poisonDamage:function (card,nature){
							if(card.nature=='poison') return 1;
						},
					},
				},
			},
			"new_yijue":{
				audio:"yijue",
				enable:"phaseUse",
				usable:1,
				position:"he",
				filterTarget:function (card,player,target){
					return player!=target&&target.countCards('h');
				},
				filterCard:true,
				check:function (card){
					return 8-get.value(card);
				},
				content:function (){
					"step 0"
					target.chooseCard(true).ai=function(card){
						var player=_status.event.player;
						if((player.hasShan()||player.hp<3)&&get.color(card)=='black') return 0.5;
						return Math.max(1,20-get.value(card));
					};
					"step 1"
					target.showCards(result.cards);
					event.card2=result.cards[0];
					if(get.color(event.card2)=='black'){
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
						target.addTempSkill('new_yijue2');
						event.finish();
					}
					else{
						player.gain(event.card2,target,'give');
						if(target.hp<target.maxHp){
							player.chooseBool('是否让目标回复一点体力？').ai=function(event,player){
								return get.recoverEffect(target,player,player)>0;
							};
						}
					}
					"step 2"
					if(result.bool){
						target.recover();
					}
				},
				ai:{
					result:{
						target:function (player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							if(target.countCards('h')>target.hp+1&&get.recoverEffect(target)>0){
								return 1;
							}
							if(player.canUse('sha',target)&&(player.countCards('h','sha')||player.countCards('he',{color:'red'}))){
								return -2;
							}
							return -0.5;
						},
					},
					order:9,
				},
			},
			"new_yijue2":{
				trigger:{
					player:"damageBegin1",
				},
				filter:function (event){
					return event.source&&event.source.hasSkill('new_yijue')&&event.card&&event.card.name=='sha'&&get.suit(event.card)=='heart'&&event.notLink();
				},
				silent:true,
				popup:false,
				forced:true,
				content:function (){
					trigger.num++;
				},
				mark:true,
				mod:{
					cardEnabled2:function (card){
						if(get.position(card)=='h') return false;
					},
				},
				intro:{
					content:"不能使用或打出手牌",
				},
			},
			"new_repaoxiao":{
				audio:"paoxiao",
				inherit:"paoxiao",
				mod:{
					targetInRange:function (card,player){
						if(card.name=='sha'&&get.cardCount({name:'sha'},player)>0) return true;
					},
					cardUsable:function (card,player,num){
						if(card.name=='sha') return Infinity;
					},
				},
				ai:{
					unequip:true,
					skillTagFilter:function (player,tag,arg){
						if(!get.zhu(player,'shouyue')) return false;
						if(arg&&arg.name=='sha') return true;
						return false;
					},
				},
			},
			"new_tishen":{
				trigger:{
					player:"phaseUseEnd",
				},
				check:function (event,player){
					var num=0;
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(get.type(he[i],'trick')=='trick'){
							num++;
						}
						if(get.type(he[i])=='equip'){
							var subtype=get.subtype(he[i]);
							if(subtype=='equip3'||subtype=='equip4'){
								num++;
							}
						}
					}
					return num==0||num<=player.countCards('h')-player.maxHandcard;
				},
				content:function (){
					var list=[];
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(get.type(he[i],'trick')=='trick'){
							list.push(he[i]);
						}
						if(get.type(he[i])=='equip'){
							var subtype=get.subtype(he[i]);
							if(subtype=='equip3'||subtype=='equip4'){
								list.push(he[i]);
							}
						}
					}
					if(list.length) player.discard(list);
					player.addTempSkill('new_tishen2',{player:'phaseBefore'});
				},
				audio:"retishen",
			},
			"new_tishen2":{
				trigger:{
					target:"shaUnhirt",
				},
				filter:function (event,player){
					if(get.itemtype(event.cards)!='cards') return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].isInPile()){
							return true;
						}
					}
					return false;
				},
				forced:true,
				nopop:true,
				content:function (){
					player.logSkill('new_tishen');
					var list=[];
						for(var i=0;i<trigger.cards.length;i++){
							if(trigger.cards[i].isInPile()){
								list.push(trigger.cards[i]);
							}
						}
					player.gain(list,'gain2');
				},
			},
			"new_qingjian":{
				audio:"qingjian",
				//unique:true,
				trigger:{
					player:"gainAfter",
				},
				direct:true,
				usable:1,
				filter:function (event,player){
					if(event.parent.parent.name=='phaseDraw') return false;
					return event.cards&&event.cards.length>0
				},
				content:function (){
					"step 0"
					player.chooseCardTarget({
						position:'he',
						filterCard:true,
						selectCard:[1,Infinity],
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							if(get.attitude(_status.event.player,_status.currentPhase)<0&&_status.currentPhase.needsToDiscard()&&card.name!='du') return -1;
							for(var i=0;i<ui.selected.cards.length;i++){
								if(get.type(ui.selected.cards[i])==get.type(card)||(ui.selected.cards[i].name=='du'&&card.name!='du')) return -1;
							};
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							if(get.attitude(_status.event.player,_status.currentPhase)<0) return -1;
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							if(target.countCards('h')>_status.event.player.countCards('h')) return 0;
							return att-4;
						},
						prompt:get.prompt2('new_qingjian'),
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						var cards=result.cards;
						var type=[];
						for(var i=0;i<cards.length;i++){
							if(!type.contains(get.type(cards[i],'trick'))) type.push(get.type(cards[i],'trick'));
						}
						player.storage.new_qingjian++;
						player.logSkill('new_qingjian',target);
						target.gain(cards,player,'give');
						_status.currentPhase.addTempSkill('qingjian_add');
						_status.currentPhase.storage.qingjian_add=type.length;
					}
					else{
						player.storage.counttrigger.new_qingjian--;
					}
				},
				ai:{
					expose:0.3,
				},
			},
			"qingjian_add":{
				mark:true,
				intro:{
					content:function (storage,player){
						return '手牌上限+'+player.storage.qingjian_add;
					},
				},
				mod:{
					maxHandcard:function (player,num){
						return num+player.storage.qingjian_add;
					},
				},
				onremove:function (player){
					delete player.storage.qingjian_add;
				},
			},
			"new_reqingnang":{
				subSkill:{
					off:{
						sub:true,
					},
					"off2":{
						sub:true,
					},
				},
				audio:"qingnang",
				enable:"phaseUse",
				filterCard:true,
				check:function (card){
					var player=_status.event.player;
					if(game.countPlayer(function(current){
						return (get.recoverEffect(current,player,player)>0&&get.attitude(player,current)>2);
					})>1&&get.color(card)=='black'&&player.countCards('h',{color:'red'})>0) return 3-get.value(card);
					return 9-get.value(card);
				},
				filter:function (event,player){
					return !player.hasSkill('new_reqingnang_off2');
				},
				filterTarget:function (card,player,target){
					if(target.hp>=target.maxHp||target.hasSkill('new_reqingnang_off')) return false;
					return true;
				},
				content:function (){
					target.addTempSkill('new_reqingnang_off');
					if(get.color(cards[0])=='black') player.addTempSkill('new_reqingnang_off2');
					target.recover();
				},
				ai:{
					order:9,
					result:{
						target:function (player,target){
							if(target.hp==1) return 5;
							if(player==target&&player.countCards('h')>player.hp) return 5;
							return 2;
						},
					},
					threaten:2,
				},
			},
			"new_reyaowu":{
				trigger:{
					player:"damageBegin3",
				},
				//priority:1,
				audio:2,
				filter:function (event){
					return event.card&&event.card.name=='sha';
				},
				forced:true,
				check:function (event){
					if(event.card&&(event.card.name=='sha')){
						return get.color(event.card)=='black';
					}
				},
				content:function (){
					if(get.color(trigger.card)!='red') player.draw();
					else trigger.source.chooseDrawRecover(true);
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(card.name=='sha'&&(get.color(card)=='red')){
								return [1,-2];
							}
							if(card.name=='sha'&&(get.color(card)=='black')){
								return [0,-0.6];
							}
						},
					},
				},
			},
			
			reguanxing:{
				audio:'guanxing',
				audioname:['jiangwei','re_jiangwei','re_zhugeliang','gexuan'],
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				frequent:true,
				filter:function(event,player,name){
					if(name=='phaseJieshuBegin'){
						return player.hasSkill('reguanxing_on');
					}
					return true;
				},
				content:function(){
					"step 0"
					if(player.isUnderControl()){
						game.modeSwapPlayer(player);
					}
					var num=game.countPlayer()<4?3:5;
					var cards=get.cards(num);
					event.cards=cards;
					var switchToAuto=function(){
						_status.imchoosing=false;
						if(event.dialog) event.dialog.close();
						if(event.control) event.control.close();
						var top=[];
						var judges=player.node.judges.childNodes;
						var stopped=false;
						if(!player.hasWuxie()){
							for(var i=0;i<judges.length;i++){
								var judge=get.judge(judges[i]);
								cards.sort(function(a,b){
									return judge(b)-judge(a);
								});
								if(judge(cards[0])<0){
									stopped=true;break;
								}
								else{
									top.unshift(cards.shift());
								}
							}
						}
						var bottom;
						if(!stopped){
							cards.sort(function(a,b){
								return get.value(b,player)-get.value(a,player);
							});
							while(cards.length){
								if(get.value(cards[0],player)<=5) break;
								top.unshift(cards.shift());
							}
						}
						bottom=cards;
						for(var i=0;i<top.length;i++){
							ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
						}
						for(i=0;i<bottom.length;i++){
							ui.cardPile.appendChild(bottom[i]);
						}
						if(event.triggername=='phaseZhunbeiBegin'&&top.length==0){
							player.addTempSkill('reguanxing_on');
						}
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(bottom.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.delay(2);
					};
					var chooseButton=function(online,player,cards){
						var event=_status.event;
						player=player||event.player;
						cards=cards||event.cards;
						event.top=[];
						event.bottom=[];
						event.status=true;
						event.dialog=ui.create.dialog('按顺序选择置于牌堆顶的牌（先选择的在上）',cards);
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('pointerdiv');
						}
						event.switchToAuto=function(){
							event._result='ai';
							event.dialog.close();
							event.control.close();
							_status.imchoosing=false;
						},
						event.control=ui.create.control('ok','pileTop','pileBottom',function(link){
							var event=_status.event;
							if(link=='ok'){
								if(online){
									event._result={
										top:[],
										bottom:[]
									}
									for(var i=0;i<event.top.length;i++){
										event._result.top.push(event.top[i].link);
									}
									for(var i=0;i<event.bottom.length;i++){
										event._result.bottom.push(event.bottom[i].link);
									}
								}
								else{
									var i;
									for(i=0;i<event.top.length;i++){
										ui.cardPile.insertBefore(event.top[i].link,ui.cardPile.firstChild);
									}
									for(i=0;i<event.bottom.length;i++){
										ui.cardPile.appendChild(event.bottom[i].link);
									}
									for(i=0;i<event.dialog.buttons.length;i++){
										if(event.dialog.buttons[i].classList.contains('glow')==false&&
											event.dialog.buttons[i].classList.contains('target')==false)
										ui.cardPile.appendChild(event.dialog.buttons[i].link);
									}
									if(event.triggername=='phaseZhunbeiBegin'&&event.top.length==0){
										player.addTempSkill('reguanxing_on');
									}
									player.popup(get.cnNumber(event.top.length)+'上'+get.cnNumber(event.cards.length-event.top.length)+'下');
									game.log(player,'将'+get.cnNumber(event.top.length)+'张牌置于牌堆顶');
								}
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							}
							else if(link=='pileTop'){
								event.status=true;
								event.dialog.content.childNodes[0].innerHTML='按顺序选择置于牌堆顶的牌';
							}
							else{
								event.status=false;
								event.dialog.content.childNodes[0].innerHTML='按顺序选择置于牌堆底的牌';
							}
						})
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						event.custom.replace.button=function(link){
							var event=_status.event;
							if(link.classList.contains('target')){
								link.classList.remove('target');
								event.top.remove(link);
							}
							else if(link.classList.contains('glow')){
								link.classList.remove('glow');
								event.bottom.remove(link);
							}
							else if(event.status){
								link.classList.add('target');
								event.top.unshift(link);
							}
							else{
								link.classList.add('glow');
								event.bottom.push(link);
							}
						}
						event.custom.replace.window=function(){
							for(var i=0;i<_status.event.dialog.buttons.length;i++){
								_status.event.dialog.buttons[i].classList.remove('target');
								_status.event.dialog.buttons[i].classList.remove('glow');
								_status.event.top.length=0;
								_status.event.bottom.length=0;
							}
						}
						game.pause();
						game.countChoose();
					};
					event.switchToAuto=switchToAuto;

					if(event.isMine()){
						chooseButton();
						event.finish();
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,true,event.player,event.cards);
						event.player.wait();
						game.pause();
					}
					else{
						event.switchToAuto();
						event.finish();
					}
					"step 1"
					if(event.result=='ai'||!event.result){
						event.switchToAuto();
					}
					else{
						var top=event.result.top||[];
						var bottom=event.result.bottom||[];
						for(var i=0;i<top.length;i++){
							ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
						}
						for(i=0;i<bottom.length;i++){
							ui.cardPile.appendChild(bottom[i]);
						}
						for(i=0;i<event.cards.length;i++){
							if(!top.contains(event.cards[i])&&!bottom.contains(event.cards[i])){
								ui.cardPile.appendChild(event.cards[i]);
							}
						}
						if(event.triggername=='phaseZhunbeiBegin'&&top.length==0){
							player.addTempSkill('reguanxing_on');
						}
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(event.cards.length-top.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.updateRoundNumber();
						game.delay(2);
					}
				},
				subSkill:{
					on:{}
				}
			},
			reluoshen:{
				audio:2,
				locked:false,
				trigger:{player:'phaseZhunbeiBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(!player.storage.reluoshen) player.storage.reluoshen=[];
					if(event.cards==undefined) event.cards=[];
					var next=player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					});
					if(get.mode()!='guozhan'&&!player.hasSkillTag('rejudge')) next.set('callback',function(){
						if(event.judgeResult.color=='black'&&get.position(card,true)=='o'){
							player.storage.reluoshen.push(card);
							player.gain(card,'gain2');
						}
					});
					else next.set('callback',function(){
						if(event.judgeResult.color=='black') event.getParent().orderingCards.remove(card);
					});
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains('reluoshen')){
							player.chooseBool('是否再次发动【洛神】？');
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i],true)!='o'){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards,'gain2');
						player.storage.reluoshen.addArray(event.cards);
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i],true)!='o'){
								event.cards.splice(i,1);i--;
							}
						}
						if(event.cards.length){
							player.gain(event.cards,'gain2');
							player.storage.reluoshen=event.cards.slice(0);
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(player.storage.reluoshen&&player.storage.reluoshen.contains(card)){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&player.storage.reluoshen&&player.storage.reluoshen.contains(card)){
							return false;
						}
					},
				},
				group:'reluoshen_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.reluoshen;
						}
					}
				}
			},
			rejieyin:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				position:'he',
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='e'){
						var subtype=get.subtype(card);
						if(!game.hasPlayer(function(current){
							return current!=player&&current.hp!=player.hp&&get.attitude(player,current)>0&&!current.countCards('e',{subtype:subtype});
						})){
							return 0;
						}
						if(player.countCards('h',{subtype:subtype})) return 20-get.value(card);
						return 10-get.value(card);
					}
					else{
						if(player.countCards('e')) return 0;
						if(player.countCards('h',{type:'equip'})) return 0;
						return 8-get.value(card);
					}
				},
				filterTarget:function(card,player,target){
					if(target.sex!='male') return false;
					var card=ui.selected.cards[0];
					if(!card) return false;
					if(get.position(card)=='e'&&!target.isEmpty(get.subtype(card))) return false;
					return true;
				},
				discard:false,
				delay:0,
				lose:false,
				content:function(){
					'step 0'
					if(get.position(cards[0])=='e') event._result={index:0};
					else if(get.type(cards[0])!='equip'||!target.isEmpty(get.subtype(cards[0]))) event._result={index:1};
					else player.chooseControl().set('choiceList',[
						'将'+get.translation(cards[0])+'置入'+get.translation(target)+'的装备区',
						'弃置'+get.translation(cards[0]),
					]).ai=function(){return 1};
					'step 1'
					if(result.index==0){
						player.$give(cards,target,false);
						target.equip(cards[0]);
					}
					else{
						player.discard(cards);
					}
					'step 2'
					if(player.hp>target.hp){
						player.draw();
						if(target.isDamaged()) target.recover();
					}
					else if(player.hp<target.hp){
						target.draw();
						if(player.isDamaged()) player.recover();
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var es=player.getCards('e');
						for(var i=0;i<es.length;i++){
							if(player.countCards('h',{subtype:get.subtype(es[i])})) return 10;
						}
						return 2;
					},
					result:{
						target:function(player,target){
							var goon=function(){
								var es=player.getCards('e');
								for(var i=0;i<es.length;i++){
									if(player.countCards('h',{subtype:get.subtype(es[i])})) return true;
								}
								return false;
							}
							if(player.hp<target.hp){
								if(player.isHealthy()){
									if(!player.needsToDiscard(1)||goon()) return 0.1;
									return 0;
								}
								return 1.5;
							}
							if(player.hp>target.hp){
								if(target.isHealthy()){
									if(!player.needsToDiscard(1)||goon()) return 0.1;
									return 0;
								}
								return 1;
							}
							return 0;
						}
					}
				}
			},
			rejiuyuan:{
				global:'rejiuyuan2',
				audio:2,
				zhuSkill:true,
			},
			rejiuyuan2:{
				audio:'jiuyuan',
				forceaudio:true,
				trigger:{player:'useCardToPlayer'},
				filter:function(event,player){
					if(event.card.name!='tao') return false;
					if(player.group!='wu') return false;
					if(event.target!=player) return false;
					return game.hasPlayer(function(target){
						return player!=target&&!event.targets.contains(target)&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('rejiuyuan',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('rejiuyuan'),function(card,player,target){
						return player!=target&&!_status.event.targets.contains(target)&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('rejiuyuan',player);
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.logSkill('rejiuyuan');
						player.line('rejiuyuan2',target,'green');
						trigger.getParent().targets.remove(player);
						trigger.getParent().targets.push(target);
						player.draw();
					}
				}
			},
			rezhiheng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:lib.filter.cardDiscardable,
				discard:false,
				lose:false,
				delay:0,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				content:function(){
					'step 0'
					player.discard(cards);
					event.num=1;
					var hs=player.getCards('h');
					if(!hs.length) event.num=0;
					for(var i=0;i<hs.length;i++){
						if(!cards.contains(hs[i])){
							event.num=0;break;
						}
					}
					'step 1'
					player.draw(event.num+cards.length);
				},
				//group:'rezhiheng_draw',
				subSkill:{
					draw:{
						trigger:{player:'loseEnd'},
						silent:true,
						filter:function(event,player){
							if(event.getParent(2).skill!='rezhiheng'&&event.getParent(2).skill!='jilue_zhiheng') return false;
							if(player.countCards('h')) return false;
							for(var i=0;i<event.cards.length;i++){
								if(event.cards[i].original=='h') return true;
							}
							return false;
						},
						content:function(){
							player.addTempSkill('rezhiheng_delay',trigger.getParent(2).skill+'After');
						}
					},
					delay:{}
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.55
				},
			},
			reqicai:{
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					},
					canBeDiscarded:function(card){
						if(get.position(card)=='e'&&['equip2','equip5'].contains(get.subtype(card))) return false;
					},
				},
			},
			rejizhi:{
				audio:2,
				locked:false,
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event){
					return (get.type(event.card)=='trick');
				},
				init:function(player){
					player.storage.rejizhi=0;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					event.card=result[0];
					if(get.type(event.card)=='basic'){
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.rejizhi++;
						if(_status.currentPhase==player){
							player.markSkill('rejizhi');
						}
					}
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.rejizhi;
					}
				},
				intro:{
					content:'本回合手牌上限+#'
				},
				group:'rejizhi_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.rejizhi=0;
							player.unmarkSkill('rejizhi');
						}
					}
				}
			},
			rebiyue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				content:function(){
					var num=1;
					if(!player.countCards('h')){
						num=2;
					}
					player.draw(num);
				},
			},
			rerende:{
				audio:2,
				group:['rerende1'],
				audioname:['gz_jun_liubei'],
				enable:'phaseUse',
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				prepare:'give2',
				filterTarget:function(card,player,target){
					if(player.storage.rerende2&&player.storage.rerende2.contains(target)) return false;
					return player!=target;
				},
				onremove:['rerende','rerende2'],
				check:function(card){
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(ui.selected.cards.length>=Math.max(2,player.countCards('h')-player.hp)) return 0;
					if(player.hp==player.maxHp||player.storage.rerende<0||player.countCards('h')<=1){
						var players=game.filterPlayer();
						for(var i=0;i<players.length;i++){
							if(players[i].hasSkill('haoshi')&&
								!players[i].isTurnedOver()&&
								!players[i].hasJudge('lebu')&&
								get.attitude(player,players[i])>=3&&
								get.attitude(players[i],player)>=3){
								return 11-get.value(card);
							}
						}
						if(player.countCards('h')>player.hp) return 10-get.value(card);
						if(player.countCards('h')>2) return 6-get.value(card);
						return -1;
					}
					return 10-get.value(card);
				},
				content:function(){
					'step 0'
					if(!Array.isArray(player.storage.rerende2)){
						player.storage.rerende2=[];
					}
					player.storage.rerende2.push(target);
					target.gain(cards,player);
					if(typeof player.storage.rerende!='number'){
						player.storage.rerende=0;
					}
					if(player.storage.rerende>=0){
						player.storage.rerende+=cards.length;
						if(player.storage.rerende>=2){
							var list=[];
							if(lib.filter.cardUsable({name:'sha'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('sha',current);
							})){
								list.push(['基本','','sha']);
								list.push(['基本','','sha','fire']);
								list.push(['基本','','sha','thunder']);
							}
							if(lib.filter.cardUsable({name:'tao'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('tao',current);
							})){
								list.push(['基本','','tao']);
							}
							if(lib.filter.cardUsable({name:'jiu'},player,event.getParent('chooseToUse'))&&game.hasPlayer(function(current){
								return player.canUse('jiu',current);
							})){
								list.push(['基本','','jiu']);
							}
							if(list.length){
								player.chooseButton(['是否视为使用一张基本牌？',[list,'vcard']]).set('ai',function(button){
									var player=_status.event.player;
									var card={name:button.link[2],nature:button.link[3]};
									if(card.name=='tao'){
										if(player.hp==1||(player.hp==2&&!player.hasShan())||player.needsToDiscard()){
											return 5;
										}
										return 1;
									}
									if(card.name=='sha'){
										if(game.hasPlayer(function(current){
											return player.canUse(card,current)&&get.effect(current,card,player,player)>0
										})){
											if(card.nature=='fire') return 2.95;
											if(card.nature=='thunder') return 2.92;
											return 2.9;
										}
										return 0;
									}
									if(card.name=='jiu'){
										return 0.5;
									}
									return 0;
								});
							}
							else{
								event.finish();
							}
							player.storage.rerende=-1;
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 1'
					if(result&&result.bool&&result.links[0]){
						var card={name:result.links[0][2],nature:result.links[0][3]};
						player.chooseUseTarget(card,true);
					}
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.rerende<2&&player.countCards('h')>1){
							return 10;
						}
						return 4;
					},
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if(target.hasJudge('lebu')) return 0;
							var nh=target.countCards('h');
							var np=player.countCards('h');
							if(player.hp==player.maxHp||player.storage.rerende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									if(game.hasPlayer(function(current){
										return current!=player&&get.attitude(player,current)>0;
									})){
										return 0;
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			rerende1:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				content:function(){
					player.storage.rerende=0;
					player.storage.rerende2=[];
				}
			},
			liyu:{
				audio:2,
				trigger:{source:'damageSource'},
				forced:true,
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.player.isAlive()&&event.player.countGainableCards(player,'he')>0;
				},
				check:function(){
					return false;
				},
				content:function(){
					'step 0'
					trigger.player.chooseTarget(function(card,player,target){
						var evt=_status.event.getParent();
						return evt.player.canUse({name:'juedou'},target)&&target!=_status.event.player;
					},get.prompt('liyu')).set('ai',function(target){
						var evt=_status.event.getParent();
						return get.effect(target,{name:'juedou'},evt.player,_status.event.player)-2;
					});
					'step 1'
					if(result.bool){
						player.gainPlayerCard(trigger.player,'he',true);
						event.target=result.targets[0];
						trigger.player.line(player,'green');
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.target){
						player.useCard({name:'juedou'},event.target,'noai');
					}
				},
				ai:{
					halfneg:true
				}
			},
			/*reqicai:{
				trigger:{player:'equipEnd'},
				frequent:true,
				content:function(){
					player.draw();
				},
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					}
				},
			},*/
			retuxi:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				direct:true,
				filter:function(event){
					return event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('retuxi'),[1,trigger.num],function(card,player,target){
						return target.countCards('h')>0&&player!=target&&target.countCards('h')>=player.countCards('h');
					},function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					});
					"step 1"
					if(result.bool){
						player.logSkill('retuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.num-=result.targets.length;
					}
					else{
						event.finish();
					}
					"step 2"
					if(trigger.num<=0) game.delay();
				},
				ai:{
					threaten:1.6,
					expose:0.2
				}
			},
			reguicai:{
				audio:2,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('reguicai'),'he',function(card){
  				var player=_status.event.player;
  				var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
  				if(mod2!='unchanged') return mod2;
  				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player);
  				if(mod!='unchanged') return mod;
  				return true;
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result-get.value(card)/2;
						}
						else{
							return -result-get.value(card)/2;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'reguicai','highlight','noOrdering');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						trigger.orderingCards.addArray(result.cards);
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:1,
					}
				}
			},
			refankui:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return (event.source&&event.source.countGainableCards(player,'he')&&event.num>0&&event.source!=player);
				},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					event.count--;
					player.gainPlayerCard(get.prompt('refankui',trigger.source),trigger.source,get.buttonValue,'he').set('logSkill',['refankui',trigger.source]);
					"step 2"
					if(result.bool&&event.count>0&&trigger.source.countGainableCards(player,'he')>0) event.goto(1);
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.countCards('he')>1&&get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-1.5];
								if(get.attitude(target,player)<0) return [1,1];
							}
						}
					}
				}
			},
			reluoyi:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				check:function(event,player){
					if(player.countCards('h','sha')) return true;
					return Math.random()<0.5;
				},
				content:function(){
					"step 0"
					player.addTempSkill('reluoyi2',{player:'phaseBefore'});
					trigger.cancel(null,null,'notrigger');
					"step 1"
					event.cards=get.cards(3);
					player.showCards(event.cards,'裸衣');
					"step 2"
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])!='basic'&&cards[i].name!='juedou'&&
							(get.type(cards[i])!='equip'||get.subtype(cards[i])!='equip1')){
							cards[i].discard();
							cards.splice(i--,1);
						}
					}
					player.gain(cards,'gain2');
				}
			},
			reluoyi2:{
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					damageBonus:true
				}
			},
			reganglie:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return (event.source!=undefined&&event.num>0);
				},
				check:function(event,player){
					return (get.attitude(player,event.source)<=0);
				},
				logTarget:'source',
				content:function(){
					"step 0"
					event.num=trigger.num;
					"step 1"
					player.judge(function(card){
						if(get.color(card)=='red') return 1;
						return 0;
					});
					"step 2"
					if(result.color=='black'){
						if(trigger.source.countCards('he')){
							player.discardPlayerCard(trigger.source,'he',true);
						}
					}
					else if(trigger.source.isIn()){
						trigger.source.damage();
					}
					event.num--;
					if(event.num>0){
						player.chooseBool(get.prompt2('reganglie'));
					}
					else{
						event.finish();
					}
					"step 3"
					if(result.bool){
						player.logSkill('reganglie',trigger.source);
						event.goto(1);
					}
				},
				ai:{
					maixie_defend:true,
					expose:0.4
				}
			},
			qinxue:{
				skillAnimation:true,
				animationColor:'wood',
				audio:2,
				unique:true,
				juexingji:true,
				derivation:'gongxin',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					if(player.storage.qinxue) return false;
					if(player.countCards('h')>=player.hp+3) return true;
					if(player.countCards('h')>=player.hp+2&&game.players.length+game.dead.length>=7) return true;
					return false;
				},
				content:function(){
					player.storage.qinxue=true;
					player.loseMaxHp();
					player.addSkill('gongxin');
					player.awakenSkill('qinxue');
				}
			},
			qingjian:{
				audio:2,
				unique:true,
				trigger:{player:'gainAfter'},
				direct:true,
				usable:4,
				filter:function(event,player){
					if(event.parent.parent.name=='phaseDraw') return false;
					return event.cards&&event.cards.length>0
				},
				content:function(){
					"step 0"
					event.cards=trigger.cards.slice(0);
					"step 1"
					player.chooseCardTarget({
						filterCard:function(card){
							return _status.event.getParent().cards.contains(card);
						},
						selectCard:[1,event.cards.length],
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							if(target.countCards('h')>_status.event.player.countCards('h')) return 0;
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 2"
					if(result.bool){
						player.storage.qingjian++;
						player.logSkill('qingjian',result.targets);
						result.targets[0].gain(result.cards,player,'give');
						for(var i=0;i<result.cards.length;i++){
							event.cards.remove(result.cards[i]);
						}
						if(event.cards.length) event.goto(1);
					}
					else{
						player.storage.counttrigger.qingjian--;
					}
				},
				ai:{
					expose:0.3
				},
			},
			reyingzi:{
				audio:2,
				audioname:['heqi','sunce','gexuan','re_sunben'],
				trigger:{player:'phaseDrawBegin2'},
				forced:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					threaten:1.5
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.hp<player.maxHp) return num+player.getDamagedHp();
					}
				}
			},
			refanjian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				discard:false,
				prepare:'give',
				content:function(){
					"step 0"
					target.storage.refanjian=cards[0];
					target.gain(cards[0],player);
					"step 1"
					target.chooseControl('refanjian_card','refanjian_hp').ai=function(event,player){
						var cards=player.getCards('he',{suit:get.suit(player.storage.refanjian)});
						if(cards.length==1) return 0;
						if(cards.length>=2){
							for(var i=0;i<cards.length;i++){
								if(get.tag(cards[i],'save')) return 1;
							}
						}
						if(player.hp==1) return 0;
						for(var i=0;i<cards.length;i++){
							if(get.value(cards[i])>=8) return 1;
						}
						if(cards.length>2&&player.hp>2) return 1;
						if(cards.length>3) return 1;
						return 0;
					}
					"step 2"
					if(result.control=='refanjian_card'){
						target.showHandcards();
					}
					else{
						target.loseHp();
						event.finish();
					}
					"step 3"
					target.discard(target.getCards('he',{suit:get.suit(target.storage.refanjian)}))
					delete target.storage.refanjian;
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							return -target.countCards('he')-(player.countCards('h','du')?1:0);
						}
					},
					threaten:2,
				}
			},
			reqianxun:{
				init:function(player){
					if(!player.storage.reqianxun2) player.storage.reqianxun2=[];
				},
				audio:2,
				trigger:{target:'useCardToBegin',player:'judgeBefore'},
				filter:function(event,player){
					if(player.countCards('h')==0) return false;
					if(event.parent.name=='phaseJudge'){
						if(lib.skill.reqianxun.trigger.player=='judgeBefore'){
							return true;
						}
						return event.result&&event.result.judge!=0;
					}
					if(event.name=='judge') return false;
					if(event.targets&&event.targets.length>1) return false;
					if(event.card&&get.type(event.card)=='trick'&&event.player!=player) return true;
				},
				content:function(){
					player.storage.reqianxun2=player.storage.reqianxun2.concat(player.getCards('h'));
					game.addVideo('storage',player,['reqianxun2',get.cardsInfo(player.storage.reqianxun2),'cards']);
					player.lose(player.getCards('h'),ui.special,'toStorage');
					player.addSkill('reqianxun2');
				},
				ai:{
					effect:function(card,player,target){
						if(!target.hasFriend()) return;
						if(player==target) return;
						var type=get.type(card);
						var nh=target.countCards();
						if(type=='trick'){
							if(!get.tag(card,'multitarget')||get.info(card).singleCard){
								if(get.tag(card,'damage')){
									if(nh<3||target.hp<=2) return 0.8;
								}
								return [1,nh];
							}
						}
						else if(type=='delay'){
							return [0.5,0.5];
						}
					},
				}
			},
			reqianxun2:{
				trigger:{global:'phaseEnd'},
				forced:true,
				audio:false,
				content:function(){
					player.gain(player.storage.reqianxun2,'fromStorage','draw');
					player.storage.reqianxun2.length=0;
					player.removeSkill('reqianxun2');
					game.addVideo('storage',player,['reqianxun2',get.cardsInfo(player.storage.reqianxun2),'cards']);
				},
				mark:true,
				intro:{
					content:'cardCount',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
							player.storage.reqianxun2.length=0;
						}
					},
				}
			},
			relianying:{
				audio:2,
				trigger:{player:'loseAfter'},
				direct:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					return event.hs&&event.hs.length;
				},
				content:function(){
					"step 0"
					var num=trigger.hs.length;
					player.chooseTarget('选择发动连营的目标',[1,num]).ai=function(target){
						var player=_status.event.player;
						if(player==target) return get.attitude(player,target)+10;
						return get.attitude(player,target);
					}
					"step 1"
					if(result.bool){
						player.logSkill('relianying',result.targets);
						game.asyncDraw(result.targets);
					}
					else event.finish();
					"step 2"
					game.delay();
				},
				ai:{
					threaten:0.8,
					effect:{
						target:function(card){
							if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						}
					},
					noh:true,
				}
			},
			retishen:{
				audio:2,
				unique:true,
				mark:true,
				skillAnimation:true,
				animationColor:'soil',
				limited:true,
				trigger:{player:'phaseZhunbeiBegin'},
				init:function(player){
					player.storage.retishen=false;
				},
				filter:function(event,player){
					if(player.storage.retishen) return false;
					if(typeof player.storage.retishen2=='number'){
						return player.hp<player.storage.retishen2;
					}
					return false;
				},
				check:function(event,player){
					if(player.hp<=1) return true;
					return player.hp<player.storage.retishen2-1;
				},
				content:function(){
					player.awakenSkill('retishen');
					player.recover(player.storage.retishen2-player.hp);
					player.draw(player.storage.retishen2-player.hp);
					player.storage.retishen=true;
				},
				intro:{
					mark:function(dialog,content,player){
						if(player.storage.retishen) return;
						if(typeof player.storage.retishen2!='number'){
							return '上回合体力：无';
						}
						return '上回合体力：'+player.storage.retishen2;
					},
					content:'limited'
				},
				group:['retishen2']
			},
			retishen2:{
				trigger:{player:'phaseJieshuBegin'},
				priority:-10,
				silent:true,
				content:function(){
					player.storage.retishen2=player.hp;
					game.broadcast(function(player){
						player.storage.retishen2=player.hp;
					},player);
					game.addVideo('storage',player,['retishen2',player.storage.retishen2]);
				},
				intro:{
					content:function(storage,player){
						if(player.storage.retishen) return;
						return '上回合体力：'+storage;
					}
				}
			},
			reyajiao:{
				audio:2,
				trigger:{player:['respond','useCard']},
				frequent:true,
				filter:function(event,player){
					return player!=_status.currentPhase&&get.itemtype(event.cards)=='cards';
				},
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					game.broadcast(function(card){
						ui.arena.classList.add('thrownhighlight');
						card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					},event.card);
					event.node=event.card.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					game.addVideo('centernode',null,get.cardInfo(event.card));
					if(get.type(event.card,'trick')==get.type(trigger.card,'trick')){
						player.chooseTarget('选择获得此牌的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0;
								return -att;
							}
							if(att>0){
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
						}).set('du',event.card.name=='du');
					}
					else{
						player.chooseBool('是否弃置'+get.translation(event.card)+'？');
						event.disbool=true;
					}
					game.delay(2);
					"step 1"
					if(event.disbool){
						if(!result.bool){
							game.log(player,'展示了',event.card);
							ui.cardPile.insertBefore(event.card,ui.cardPile.firstChild);
						}
						else{
							game.log(player,'展示并弃掉了',event.card);
							event.card.discard();
						}
						game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
						event.node.delete();
						game.broadcast(function(card){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.delete();
							}
						},event.card);
					}
					else if(result.targets){
						player.line(result.targets,'green');
						result.targets[0].gain(event.card,'log');
						event.node.moveDelete(result.targets[0]);
						game.addVideo('gain2',result.targets[0],[get.cardInfo(event.node)]);
						game.broadcast(function(card,target){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.moveDelete(target);
							}
						},event.card,result.targets[0]);
					}
					else{
						game.log(player,'展示并弃掉了',event.card);
						event.card.discard();
						game.addVideo('deletenode',player,[get.cardInfo(event.node)]);
						event.node.delete();
						game.broadcast(function(card){
							ui.arena.classList.remove('thrownhighlight');
							if(card.clone){
								card.clone.delete();
							}
						},event.card);
					}
					game.addVideo('thrownhighlight2');
					ui.arena.classList.remove('thrownhighlight');
				},
				ai:{
					effect:{
						target:function(card,player){
							if(get.tag(card,'respond')&&player.countCards('h')>1) return [1,0.2];
						}
					}
				}
			},
			rejianxiong:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o';
				},
				content:function(){
					player.gain(trigger.cards);
					player.$gain2(trigger.cards);
					player.draw();
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')) return [1,0.55];
						}
					}
				}
			},
			rejianxiong_old:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0],true)=='o'){
						player.chooseControl('rejianxiong_mopai','rejianxiong_napai','cancel2').set('prompt',get.prompt('rejianxiong')).ai=function(){
							var trigger=_status.event.getTrigger();
							if(trigger.cards.length==1&&trigger.cards[0].name=='sha') return 0;
							return 1;
						};
					}
					else{
						player.chooseControl('rejianxiong_mopai','cancel2').set('prompt',get.prompt('rejianxiong'));
					}
					"step 1"
					if(result.control=='rejianxiong_napai'){
						player.logSkill('rejianxiong');
						player.gain(trigger.cards);
						player.$gain2(trigger.cards);
					}
					else if(result.control=='rejianxiong_mopai'){
						player.logSkill('rejianxiong');
						player.draw();
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							if(get.tag(card,'damage')&&player!=target) return [1,0.6];
						}
					}
				}
			},
			reyiji:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				filter:function(event){
					return (event.num>0)
				},
				content:function(){
					"step 0"
					event.num=1;
					event.count=1;
					"step 1"
					player.gain(get.cards(2));
					player.$draw(2);
					"step 2"
					player.chooseCardTarget({
						filterCard:true,
						selectCard:[1,2],
						filterTarget:function(card,player,target){
							return player!=target&&target!=event.temp;
						},
						ai1:function(card){
							if(ui.selected.cards.length>0) return -1;
							if(card.name=='du') return 20;
							return (_status.event.player.countCards('h')-_status.event.player.hp);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0;
								return 1-att;
							}
							return att-4;
						},
						prompt:'请选择要送人的卡牌'
					});
					"step 3"
					if(result.bool){
						player.lose(result.cards,ui.special,'toStorage');
						if(result.targets[0].hasSkill('reyiji2')){
							result.targets[0].storage.reyiji2=result.targets[0].storage.reyiji2.concat(result.cards);
						}
						else{
							result.targets[0].addSkill('reyiji2');
							result.targets[0].storage.reyiji2=result.cards;
						}
						player.$give(result.cards.length,result.targets[0],false);
						player.line(result.targets,'green');
						game.addVideo('storage',result.targets[0],['reyiji2',get.cardsInfo(result.targets[0].storage.reyiji2),'cards']);
						if(num==1){
							event.temp=result.targets[0];
							event.num++;
							event.goto(2);
						}
						else if(event.count<trigger.num){
							delete event.temp;
							event.num=1;
							event.count++;
							event.goto(1);
						}
					}
					else if(event.count<trigger.num){
						delete event.temp;
						event.num=1;
						event.count++;
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					result:{
						effect:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								var num=1;
								if(get.attitude(player,target)>0){
									if(player.needsToDiscard()){
										num=0.7;
									}
									else{
										num=0.5;
									}
								}
								if(player.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					},
					threaten:0.6
				}
			},
			reyiji2:{
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				mark:true,
				popup:'遗计拿牌',
				audio:false,
				content:function(){
					player.$draw(player.storage.reyiji2.length);
					player.gain(player.storage.reyiji2,'fromStorage');
					delete player.storage.reyiji2;
					player.removeSkill('reyiji2');
					game.delay();
				},
				intro:{
					content:'cardCount'
				}
			},
			yijue:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('h');
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target).set('small',true);
					"step 1"
					if(result.bool){
						if(!target.hasSkill('fengyin')){
							target.addTempSkill('fengyin');
						}
						target.addTempSkill('yijue2');
						event.finish();
					}
					else if(target.hp<target.maxHp){
						player.chooseBool('是否让目标回复一点体力？').ai=function(event,player){
							return get.recoverEffect(target,player,player)>0;
						};
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						target.recover();
					}
				},
				ai:{
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							if(hs.length<3) return 0;
							var bool=false;
							for(var i=0;i<hs.length;i++){
								if(hs[i].number>=9&&get.value(hs[i])<7){
									bool=true;
									break;
								}
							}
							if(!bool) return 0;
							if(target.countCards('h')>target.hp+1&&get.recoverEffect(target)>0){
								return 1;
							}
							if(player.canUse('sha',target)&&(player.countCards('h','sha')||player.countCards('he',{color:'red'}))){
								return -2;
							}
							return -0.5;
						}
					},
					order:9,
				}
			},
			yijue2:{
				mark:true,
				mod:{
					cardEnabled:function(){
						return false;
					},
					cardUsable:function(){
						return false;
					},
					cardRespondable:function(){
						return false;
					},
					cardSavable:function(){
						return false;
					}
				},
				intro:{
					content:'不能使用或打出卡牌'
				}
			},
			retieji:{
				audio:2,
				audioname:['boss_lvbu3'],
				trigger:{player:'useCardToPlayered'},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					"step 0"
					player.judge(function(){return 0});
					if(!trigger.target.hasSkill('fengyin')){
						trigger.target.addTempSkill('fengyin');
					}
					"step 1"
					var suit=get.suit(result.card);
					var target=trigger.target;
					var num=target.countCards('h','shan');
					target.chooseToDiscard('请弃置一张'+get.translation(suit)+'牌，否则不能使用闪抵消此杀','he',function(card){
						return get.suit(card)==_status.event.suit;
					}).set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return 8-get.value(card);
					}).set('num',num).set('suit',suit);
					"step 2"
					if(!result.bool){
						trigger.getParent().directHit.add(trigger.target);
					}
				}
			},
			reyicong:{
				trigger:{
					player:["changeHp"],
				},
				audio:2,
				forced:true,
				filter:function(event,player){
					return get.sgn(player.hp-2.5)!=get.sgn(player.hp-2.5-event.num);
				},
				content:function (){},
				mod:{
					globalFrom:function(from,to,current){
						if(from.hp>2) return current-1;
					},
					globalTo:function(from,to,current){
						if(to.hp<=2) return current+1;
					},
				},
				ai:{
					threaten:0.8
				}
			},
			qiaomeng:{
				audio:2,
				trigger:{source:'damageSource'},
				direct:true,
				filter:function(event){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.cards&&
					get.color(event.cards)=='black'&&event.player.countCards('e');
				},
				content:function(){
					"step 0"
					player.choosePlayerCard('e',trigger.player);
					"step 1"
					if(result.bool){
						player.logSkill('qiaomeng');
						trigger.player.discard(result.links[0]);
						event.card=result.links[0];
					}
					else{
						event.finish();
					}
					"step 2"
					if(get.position(card)=='d'){
						if(get.subtype(card)=='equip3'||get.subtype(card)=='equip4'){
							player.gain(card,trigger.player);
							player.$gain2(card);
						}
					}
				}
			},
			rekurou:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				check:function(card){
					return 8-get.value(card);
				},
				position:'he',
				content:function(){
					player.loseHp();
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							if(player.hp<=2) return player.countCards('h')==0?1:0;
							if(player.countCards('h',{name:'sha',color:'red'})) return 1;
							return player.countCards('h')<=player.hp?1:0;
						}
					},
					effect:function(card,player,target){
						if(get.tag(card,'damage')){
							if(player.hasSkillTag('jueqing',false,target)) return [1,1];
							return 1.2;
						}
						if(get.tag(card,'loseHp')){
							if(player.hp<=1) return;
							return [0,0];
						}
					}
				}
			},
			zhaxiang:{
				trigger:{player:'loseHpEnd'},
				forced:true,
				audio:2,
				content:function(){
					var num=trigger.num;
					player.draw(3*num);
					if(_status.currentPhase==player){
						if(!player.storage.zhaxiang2) player.storage.zhaxiang2=0;
						player.storage.zhaxiang2+=num;
						player.addTempSkill('zhaxiang2',{player:'phaseAfter'});
					}
					else{
						game.trySkillAudio('zhaxiang',player);
					}
				},
				ai:{
					maihp:true
				}
			},
			zhaxiang2:{
				mod:{
					targetInRange:function(card,player,target,now){
						if(card.name=='sha'&&get.color(card)=='red') return true;
					},
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+player.storage.zhaxiang2;
					}
				},
				onremove:true,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&get.color(event.card)=='red';
				},
				content:function(){
					trigger.directHit.addArray(game.players);
				}
			},
			zhuhai:{
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return event.player.isAlive()&&event.player.getStat('damage')&&
					lib.filter.targetEnabled({name:'sha'},player,event.player)&&player.hasSha();
				},
				content:function(){
					player.chooseToUse({name:'sha'},'诛害：是否对'+get.translation(trigger.player)+'使用一张杀？').set('logSkill','zhuhai').set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',trigger.player);
				}
			},
			qianxin:{
				skillAnimation:true,
				animationColor:'orange',
				audio:2,
				unique:true,
				juexingji:true,
				trigger:{source:'damageSource'},
				forced:true,
				derivation:'jianyan',
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				content:function(){
					player.awakenSkill('qianxin');
					player.addSkill('jianyan');
					player.loseMaxHp();
				}
			},
			jianyan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				delay:0,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.sex=='male';
					});
				},
				content:function(){
					"step 0"
					player.chooseControl(['red','black','basic','trick','equip']).set('ai',function(){
						var player=_status.event.player;
						if(!player.hasShan()) return 'basic';
						if(player.countCards('e')<=1) return 'equip';
						if(player.countCards('h')>2) return 'trick';
						return 'red';
					});
					"step 1"
					event.card=get.cardPile(function(card){
						if(get.color(card)==result.control) return true;
						if(get.type(card,'trick')==result.control) return true;
						return false;
					},'cardPile');
					if(!event.card){
						event.finish();
						return;
					}
					player.showCards([event.card]);
					"step 2"
					player.chooseTarget(true,'选择一名男性角色送出'+get.translation(event.card),function(card,player,target){
						return target.sex=='male';
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(_status.event.neg) return -att;
						return att;
					}).set('neg',get.value(event.card,player,'raw')<0);
					"step 3"
					player.line(result.targets,'green');
					result.targets[0].gain(event.card,'gain2');

				},
				ai:{
					order:9,
					result:{
						player:2
					},
					threaten:1.2
				}
			},
			reguose:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				discard:false,
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>0;
				},
				prepare:'throw',
				position:'he',
				filterCard:{suit:'diamond'},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(target.hasJudge('lebu')) return true;
					return lib.filter.targetEnabled({name:'lebu'},player,target);
				},
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					if(target.hasJudge('lebu')){
						target.discard(target.getJudge('lebu'));
					}
					else{
						var next=player.useCard({name:'lebu'},target,cards);
						next.animate=false;
						next.audio=false;
					}
					player.draw();
				},
				ai:{
					result:{
						target:function(player,target){
							if(target.hasJudge('lebu')) return -get.effect(target,{name:'lebu'},player,target);
							return get.effect(target,{name:'lebu'},player,target);
						}
					},
					order:9,
				}
			},
			fenwei:{
				skillAnimation:true,
				animationColor:'wood',
				audio:2,
				audioname:['heqi'],
				unique:true,
				mark:true,
				limited:true,
				trigger:{global:'useCardToPlayered'},
				//priority:5,
				filter:function(event,player){
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(get.type(event.card)!='trick') return false;
					if(get.info(event.card).multitarget) return false;
					if(event.targets.length<2) return false;
					if(player.storage.fenwei) return false;
					return true;
				},
				init:function(player){
					player.storage.fenwei=false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('fenwei'),
						[1,trigger.targets.length],function(card,player,target){
						var evt=_status.event.getTrigger().getParent();
						return evt.targets.contains(target)&&!evt.excluded.contains(target);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						if(game.phaseNumber>game.players.length*2&&trigger.targets.length>=game.players.length-1){
							return -get.effect(target,trigger.card,trigger.player,_status.event.player);
						}
						return -1;
					});
					"step 1"
					if(result.bool){
						player.awakenSkill('fenwei');
						player.logSkill('fenwei',result.targets);
						player.storage.fenwei=true;
						trigger.getParent().excluded.addArray(result.targets);
						game.delay();
					}
				},
				intro:{
					content:'limited'
				}
			},
			chulao:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(target.group=='unknown') return false;
					for(var i=0;i<ui.selected.targets.length;i++){
						if(ui.selected.targets[i].group==target.group) return false;
					}
					return target.countCards('he')>0;
				},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				selectTarget:[1,Infinity],
				check:function(card){
					if(get.suit(card)=='spade') return 8-get.value(card);
					return 5-get.value(card);
				},
				content:function(){
					"step 0"
					if(num==0&&get.suit(cards[0])=='spade') player.draw();
					player.choosePlayerCard(targets[num],'he',true);
					"step 1"
					if(result.bool){
						if(result.links.length) targets[num].discard(result.links[0]);
						if(get.suit(result.links[0])=='spade') targets[num].draw();
					}
				},
				ai:{
					result:{
						target:-1
					},
					threaten:1.2,
					order:3
				}
			},
			xunxun:{
				audio:2,
				trigger:{player:'phaseDrawBegin1'},
				//check:function(event,player){
				//	return !player.hasSkill('reyiji2');
				//},
				content:function(){
					"step 0"
					event.cards=get.cards(4);
					player.chooseCardButton(event.cards,2,'选择两张牌置于牌堆顶',true).set('ai',ai.get.buttonValue);
					"step 1"
					if(result.bool){
						var choice=[];
						for(var i=0;i<result.links.length;i++){
							choice.push(result.links[i]);
							cards.remove(result.links[i]);
						}
						for(var i=0;i<cards.length;i++){
							ui.cardPile.appendChild(cards[i]);
						}
						while(choice.length){
							ui.cardPile.insertBefore(choice.pop(),ui.cardPile.firstChild);
						}
					}
				},
			},
			wangxi:{
				audio:2,
				trigger:{player:'damageEnd',source:'damageSource'},
				filter:function(event){
					if(event._notrigger.contains(event.player)) return false;
					return event.num&&event.source&&event.player&&
					event.player.isAlive()&&event.source.isAlive()&&event.source!=event.player;
				},
				check:function(event,player){
					if(player.isPhaseUsing()) return true;
					if(event.player==player) return get.attitude(player,event.source)>-3;
					return get.attitude(player,event.player)>-3;
				},
				logTarget:function(event,player){
					if(event.player==player) return event.source;
					return event.player;
				},
				content:function(){
					"step 0"
					event.count=trigger.num;
					"step 1"
					game.asyncDraw([trigger.player,trigger.source]);
					event.count--;
					"step 2"
					game.delay();
					"step 3"
					if(event.count){
						player.chooseBool(get.prompt2('wangxi',lib.skill.wangxi.logTarget(trigger,player)))
					}
					else event.finish();
					"step 4"
					if(result.bool){
						player.logSkill('wangxi',lib.skill.wangxi.logTarget(trigger,player));
						event.goto(1);
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true
				}
			}
		},
		translate:{
			re_zhangliao:'界张辽',
			re_huangyueying:'新黄月英',
			re_simayi:'界司马懿',
			re_xuzhu:'界许褚',
			re_xiahoudun:'界夏侯惇',
			re_lvmeng:'界吕蒙',
			re_zhouyu:'界周瑜',
			re_luxun:'界陆逊',
			re_zhaoyun:'界赵云',
			re_guanyu:'界关羽',
			re_zhangfei:'界张飞',
			re_machao:'界马超',
			re_caocao:'界曹操',
			re_guojia:'界郭嘉',
			re_lvbu:'界吕布',
			re_xushu:'界徐庶',
			re_huanggai:'界黄盖',
			re_gongsunzan:'界公孙瓒',
			re_daqiao:'界大乔',
			re_ganning:'界甘宁',
			re_huatuo:'界华佗',
			re_lidian:'李典',
			re_liubei:'界刘备',

			re_diaochan:'界貂蝉',
			re_huangyueying:'界黄月英',
			re_sunquan:'界孙权',
			re_sunshangxiang:'界孙尚香',
			re_zhugeliang:'界诸葛亮',
			re_zhenji:'界甄姬',
			re_huaxiong:"界华雄",
			
			"re_sp_zhugeliang":"界卧龙",
			"re_xunyu":"界荀彧",
			"re_dianwei":"界典韦",
			"re_yanwen":"界颜良文丑",
			re_pangtong:"界庞统",
			xin_yuanshao:"界袁绍",
			re_zhangjiao:'界张角',
			re_sunce:'界孙策',
			
			olfangquan:'放权',
			olfangquan_info:'出牌阶段开始前，你可以跳过此阶段。若如此做，弃牌阶段开始时，你可以弃置一张手牌，令一名其他角色进行一个额外回合。',
			olruoyu:'若愚',
			olruoyu_info:'主公技，觉醒技，准备阶段，若你的体力值为全场最少，则你加1点体力上限并回复1点体力，然后获得技能〖思蜀〗和〖激将〗。',
			sishu:'思蜀',
			sishu_info:'出牌阶段开始时，你可以选择一名角色。该角色本回合内【乐不思蜀】的判定效果反转。',
			olluanji:'乱击',
			olluanji_info:'你可以将两张花色相同的手牌当做【万箭齐发】使用。当你使用【万箭齐发】选择目标后，你可以为此牌减少一个目标。',
			olluanji_remove:'乱击',
			olxueyi:'血裔',
			olxueyi_info:'锁定技，游戏开始时，你获得X个“裔”标记。回合开始时，你可以移去一个“裔”标记，然后摸一张牌。你每有一个“裔”标记，手牌上限便+2。（X为场上群势力角色的数目）',
			olxueyi_draw:'血裔',
			olhunzi:'魂姿',
			olhunzi_info:'觉醒技，准备阶段，若你的体力上限为1，你减1点体力上限并回复1点体力，然后获得技能〖英姿〗和〖英魂〗。',
			olzhiba:'制霸',
			olzhiba_info:'主公技，其他吴势力的角色的出牌阶段限一次，其可以与你拼点（你可拒绝此拼点）。若其没赢，你可以获得两张拼点牌。你的出牌阶段限一次，你可以和一名吴势力角色拼点，若你赢，你获得两张拼点牌。',
			olzhiba2:'制霸',
			xinleiji:'雷击',
			xinguidao:'鬼道',
			xinleiji_info:'①当你使用或打出【闪】或【闪电】时，你可以进行判定。<br>②当你不因〖暴虐〗或〖助祭〗而进行的判定的判定牌生效后，若结果为：黑桃，你可对一名其他角色造成2点雷电伤害；梅花：你回复1点体力并可对一名其他其他角色造成1点雷电伤害。',
			xinguidao_info:'一名角色的判定牌生效前，你可以打出一张黑色牌作为判定牌并获得原判定牌。若你以此法打出的牌为黑桃2-9，则你摸一张牌。',
			reqiangxi:"强袭",
			"reqiangxi_info":"出牌阶段对每名其他角色限一次，你可以选择一项：1. 失去一点体力并对你攻击范围内的一名其他角色造成一点伤害；2. 弃置一张武器牌并对你攻击范围内的一名其他角色造成一点伤害。",
			rehuoji:"火计",
			"rehuoji_info":"出牌阶段，你可一张红色牌当作【火攻】使用。",
			rekanpo:"看破",
			"rekanpo_info":"你可以将一张黑色牌当作【无懈可击】使用。",
			rejieming:"节命",
			"rejieming_info":"当你受到1点伤害后，你可以令一名角色摸两张牌。然后若其手牌数小于体力上限，则你摸一张牌。",
			reshuangxiong:"双雄",
			"reshuangxiong_info":"摸牌阶段，你可以放弃摸牌。若如此做，你展示牌堆顶的两张牌并选择获得其中的一张。然后，你本回合内可以将与此牌颜色不同的一张手牌当做【决斗】使用。当你受到【决斗】造成的伤害时，你可以获得对方于此决斗中打出的所有【杀】",
			"reshuangxiong2":"双雄",
			"reshuangxiong2_info":"",

			reguanxing:'观星',
			reguanxing_info:'准备阶段，你可以观看牌堆顶的5张牌（存活角色小于4时改为3张），并将其以任意顺序置于牌堆项或牌堆底，若你将〖观星〗的牌都放在了牌堆底，则你可以在结束阶段再次发动〖观星〗。',
			reluoshen:'洛神',
			reluoshen_info:'准备阶段，你可以进行判定，若结果为黑色则获得此判定牌，且可重复此流程直到出现红色的判定结果。你通过〖洛神〗获得的牌，不计入当前回合的手牌上限',
			reluoshen_info_guozhan:'准备阶段，你可以进行判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌。你通过〖洛神〗获得的牌，不计入当前回合的手牌上限。（结果为黑色的判定牌于此过程中不会进入弃牌堆）',
			rejieyin:'结姻',
			rejieyin_info:'出牌阶段限一次，你可以选择一名男性角色并弃置一张手牌或将装备区内的一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力。',
			rebiyue:'闭月',
			rebiyue_info:'结束阶段，你可以摸一张牌，若你没有手牌，则改为摸两张牌。',
			rejizhi:'集智',
			rejizhi_info:'当你使用非延时锦囊牌时，你可以摸一张牌。若此牌为基本牌，则你可以弃置之，然后令本回合手牌上限+1。',
			reqicai:'奇才',
			reqicai_info:'锁定技，你使用锦囊牌无距离限制，你装备区内的防具牌和宝物牌不能被其他角色弃置。',
			rezhiheng:'制衡',
			rezhiheng_info:'出牌阶段限一次，你可以弃置任意张牌并摸等量的牌，若你在发动〖制衡〗时弃置了所有手牌，则你多摸一张牌。',
			rejiuyuan:'救援',
			rejiuyuan_info:'主公技，其他吴势力角色对自己使用【桃】时，若其体力值大于你，则其可以选择令你回复1点体力，然后其摸1张牌。',

			"new_yajiao":"涯角",
			"new_yajiao_info":"每当你于回合外使用或打出牌时，你可以亮出牌堆顶的一张牌，并将其交给一名角色。若此牌与你此次使用或打出的牌类别不同，则你弃置一张牌。",
			"new_liyu":"利驭",
			"new_liyu_info":"当你使用【杀】对一名其他角色造成伤害后，你可以获得其一张牌。若此牌不为装备牌，则其摸一张牌。若此牌为装备牌，则视为你对其选择的另一名角色使用一张【决斗】。",
			"new_retuxi":"突袭",
			"new_retuxi_info":"摸牌阶段摸牌时，你可以少摸任意张牌，然后获得等量的角色的各一张手牌。",
			"new_retuxi_info_guozhan":"摸牌阶段摸牌时，你可以少摸至多两张牌，然后获得等量的角色的各一张手牌。",
			"new_reyiji":"遗计",
			"new_reyiji_info":"当你受到1点伤害后，你可以摸两张牌，然后可以将至多两张手牌交给其他角色。",
			"new_rejianxiong":"奸雄",
			"new_rejianxiong_info":"当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。",
			"new_reluoyi":"裸衣",
			"new_reluoyi_info":"摸牌阶段开始时，你展示牌堆顶的三张牌。然后，你可以放弃摸牌。若如此做，你获得其中的基本牌、武器牌和【决斗】，且直到你的下回合开始，你使用的【杀】或【决斗】造成伤害时，此伤害+1。否则，你将这些牌置入弃牌堆。",
			"new_rewusheng":"武圣",
			"new_rewusheng_info":"你可以将一张红色牌当做【杀】使用或打出。你使用的方片杀没有距离限制。",
			"new_yijue":"义绝",
			"new_yijue_info":"出牌阶段限一次，你可以弃置一张牌并令一名有手牌的其他角色展示一张手牌。若此牌为黑色，则该角色不能使用或打出牌，非锁定技失效且受到来自你的红桃【杀】的伤害+1直到回合结束。若此牌为红色，则你可以获得此牌，并可以令其回复一点体力。",
			"new_yijue2":"义绝",
			"new_yijue2_info":"",
			"new_repaoxiao":"咆哮",
			"new_repaoxiao_info":"锁定技，出牌阶段，你使用【杀】没有数量限制。若你于此出牌阶段内使用过【杀】，则你本回合内使用【杀】没有距离限制。",
			"new_tishen":"替身",
			"new_tishen_info":"出牌阶段结束时，你可以弃置你所有的锦囊牌与坐骑牌。若如此做，直到你的下个回合开始，你获得所有以你为目标且未对你造成伤害的【杀】。",
			"new_tishen2":"替身",
			"new_tishen2_info":"",
			"new_qingjian":"清俭",
			"new_qingjian_info":"当你于摸牌阶段外获得牌时，你可以展示任意张牌并交给一名其他角色。然后，当前回合角色本回合的手牌上限+X（X为你给出的牌中包含的类别数）。每回合限一次。",
			"qingjian_add":"清俭",
			"qingjian_add_info":"",
			"new_reqingnang":"青囊",
			"new_reqingnang_info":"出牌阶段，你可以弃置一张手牌，令一名本回合内未成为过〖青囊〗的目标的角色回复一点体力。若你弃置的是黑色牌，则你本回合内不能再发动〖青囊〗。",
			"new_reyaowu":"耀武",
			"new_reyaowu_info":"锁定技，当一名角色使用【杀】对你造成伤害时，若此杀为红色，该角色回复1点体力或摸一张牌。否则则你摸一张牌。",
			reqingguo:'倾国',
			reqingguo_info:'你可以将一张黑色牌当做【闪】使用或打出。',
			
			qinxue:'勤学',
			retuxi:'突袭',
			reluoyi:'裸衣',
			reluoyi2:'裸衣',
			reganglie:'刚烈',
			qingjian:'清俭',
			reyingzi:'英姿',
			refanjian:'反间',
			refanjian_card:'弃牌',
			refanjian_hp:'流失体力',
			reqianxun:'谦逊',
			reqianxun2:'谦逊',
			relianying:'连营',
			retishen:'替身',
			retishen2:'替身',
			reyajiao:'涯角',
			rejianxiong:'奸雄',
			rejianxiong_mopai:'摸牌',
			rejianxiong_napai:'拿牌',
			reyiji:'遗计',
			reyiji2:'遗计',
			yijue:'义绝',
			yijue2:'义绝',
			retieji:'铁骑',
			refankui:'反馈',
			reyicong:'义从',
			qiaomeng:'趫猛',
			rekurou:'苦肉',
			zhaxiang:'诈降',
			zhaxiang2:'诈降',
			zhuhai:'诛害',
			qianxin:'潜心',
			jianyan:'荐言',
			reguicai:'鬼才',
			xunxun:'恂恂',
			wangxi:'忘隙',
			reguose:'国色',
			fenwei:'奋威',
			chulao:'除疠',
			liyu:'利驭',
			rerende:'仁德',
			rerende_info:'出牌阶段，你可以将至少一张手牌交给其他角色，然后你于此阶段内不能再以此法交给该角色牌；若你于此阶段内给出的牌首次达到两张，你可以视为使用一张基本牌',
			liyu_info:'当你使用【杀】对一名其他角色造成伤害后，该角色可令你获得其一张牌，若如此做，则视为你对其选择的另一名角色使用一张【决斗】',
			xunxun_info:'摸牌阶段，你可以观看牌堆顶的四张牌，然后将其中的两张牌置于牌堆顶，并将其余的牌以任意顺序置于牌堆底。',
			wangxi_info:'每当你对其他角色造成1点伤害后，或受到其他角色造成的1点伤害后，你可与该角色各摸一张牌。',
			reguose_info:'出牌阶段限一次，你可以选择一项：将一张方片花色牌当做【乐不思蜀】使用；或弃置一张方片花色牌并弃置场上的一张【乐不思蜀】。选择完成后，你摸一张牌。',
			fenwei_info:'限定技，当一名角色使用的锦囊牌指定了至少两名角色为目标时，你可以令此牌对其中任意名角色无效。',
			chulao_info:'出牌阶段限一次，若你有牌，你可以选择任意名势力各不相同的其他角色，你弃置你和这些角色的各一张牌。然后以此法弃置黑桃牌的角色各摸一张牌。',
			reguicai_info:'在任意角色的判定牌生效前，你可以打出一张牌代替之',
			zhuhai_info:'一名其他角色的结束阶段开始时，若该角色本回合造成过伤害，你可以对其使用一张【杀】。',
			qianxin_info:'觉醒技，当你造成一次伤害后，若你已受伤，你须减1点体力上限，并获得技能“荐言”。',
			jianyan_info:'出牌阶段限一次，你可以声明一种牌的类别或颜色，并亮出牌库中第一张符合你声明的牌，然后你令一名男性角色获得此牌',
			rekurou_info:'出牌阶段限一次，你可以弃置一张牌，然后失去1点体力。',
			zhaxiang_info:'锁定技 每当你失去1点体力后，你摸三张牌。然后若此时是你的出牌阶段，则直到回合结束，你使用红色【杀】无距离限制且不能被【闪】响应，你可以额外使用一张【杀】。',
			qiaomeng_info:'每当你使用黑色【杀】对一名角色造成伤害后，你可以弃置该角色装备区里的一张牌，若此牌是坐骑牌，你于此牌置入弃牌堆时获得之。',
			reyicong_info:'锁定技，只要你的体力值大于2点，你的进攻距离+1；只要你的体力值为2点或更低，你的防御距离+1',
			refankui_info:'每当你受到1点伤害后，你可以获得伤害来源的一张牌。',
			retieji_info:'当你使用【杀】指定一名角色为目标后，你可以进行一次判定并令该角色的非锁定技失效直到回合结束，除非该角色弃置一张与判定结果花色相同的牌，否则不能使用【闪】抵消此【杀】。',
			yijue_info:'出牌阶段限一次，你可以与一名其他角色拼点，若你赢，则直到回合结束，该角色不能使用或打出手牌且其非锁定技失效，若你没赢，你可令该角色回复一点体力。',
			reyiji_info:'每当你受到1点伤害后，你可以摸两张牌。然后你可以在至多两名角色的武将牌旁边分别扣置至多两张手牌，这些角色的下个摸牌阶段开始时，该角色获得其武将牌旁的这些牌。',
			rejianxiong_info:'每当你受到伤害后，你可以获得对你造成伤害的牌，然后摸一张牌。',
			reyajiao_info:'每当你于回合外使用或打出一张手牌时，你可以亮出牌堆顶的一张牌，若此牌与你此次使用或打出的牌类别相同，你可以将之交给任意一名角色；若不同则你可以将之置入弃牌堆。',
			retishen_info:'限定技，准备阶段开始时，你可以将体力回复至等同于你上回合结束时的体力值，然后你每以此法回复1点体力，便摸一张牌。',
			reqianxun_info:'每当一张延时类锦囊牌或其他角色使用的普通锦囊牌生效时，若你是此牌的唯一目标，你可以将所有手牌置于你的武将牌上，若如此做，此回合结束时，你获得你武将牌上的所有牌。',
			relianying_info:'当你失去最后的手牌时，你可以令至多X名角色各摸一张牌（X为你此次失去的手牌数）。',
			reyingzi_info:'锁定技，摸牌阶段摸牌时，你额外摸一张牌；你的手牌上限不会因体力值的减少而减少。',
			refanjian_info:'出牌阶段限一次，你可以展示一张手牌并将此牌交给一名其他角色。然后该角色选择一项：展示其手牌并弃置所有与此牌花色相同的牌，或失去一点体力。',
			qingjian_info:'每当你于摸牌阶段外获得牌时，你可以将其中任意牌以任意顺序交给其他角色，每回合最多发动四次',
			qinxue_info:'觉醒技，准备阶段开始时，若你的手牌数比体力值多3（人数不少于7时改为2）或更多，你须减一点体力上限并获得技能【攻心】',
			retuxi_info:'摸牌阶段摸牌时，你可以少摸任意张牌，然后选择等量的手牌数大于或等于你的其他角色，获得这些角色的各一张手牌。',
			reluoyi_info:'你可以跳过摸牌阶段，然后展示牌堆顶的三张牌，获得其中的基本牌、武器牌和【决斗】，若如此做，直到你的下回合开始，你为伤害来源的【杀】或【决斗】造成的伤害+1。',
			reganglie_info:'每当你受到1点伤害后，可进行一次判定，若结果为红色，你对伤害来源造成1点伤害，若结果为黑色，你弃置其一张牌。',
			botu:'博图',
			botu_info:'回合结束时，若你本回合出牌阶段内使用的牌包含四种花色，则你可以进行一个额外回合。',
			
			xin_yuji:'界于吉',
			re_zuoci:'界左慈',
			"reguhuo":"蛊惑",
			"reguhuo_info":"每名角色的回合限一次，你可以扣置一张手牌当一张基本牌或普通锦囊牌使用或打出。其他角色依次选择是否质疑。然后，你展示此牌。若有质疑的角色：若此牌为假，则此牌作废，且所有质疑者各摸一张牌；为真，则所有质疑角色须弃置一张牌或失去1点体力，并获得技能〖缠怨〗。",
			"reguhuo_guess":"蛊惑",
			"reguhuo_guess_info":"",
			rechanyuan:"缠怨",
			"rechanyuan_info":"锁定技，你不能质疑于吉，只要你的体力值不大于1，你失去你的武将技能。",
			"reguhuo_respond":"蛊惑",
			"reguhuo_respond_info":"",
			"reguhuo_wuxie":"蛊惑",
			"reguhuo_wuxie_info":"",
			"reguhuo_phase":"蛊惑",
			"reguhuo_phase_info":"",
			rehuashen:'化身',
			rehuashen_info:'游戏开始后，你随机获得三张未加入游戏的武将牌，选一张置于你面前并声明该武将牌的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同直到该化身被替换。你的每个准备阶段和结束后，你可以选择一项：①弃置至多两张未展示的化身牌并重新获得等量化身牌；②更换所展示的化身牌或技能。（你不可声明限定技、觉醒技或主公技）。',
			rexinsheng:'新生',
			rexinsheng_info:'当你受到1点伤害后，你可以获得一张新的化身牌。',
			refresh_standard:'界限突破·标',
			refresh_feng:'界限突破·风',
			refresh_huo:'界限突破·火',
			refresh_lin:'界限突破·林',
			refresh_shan:'界限突破·山',
		},
	};
});
