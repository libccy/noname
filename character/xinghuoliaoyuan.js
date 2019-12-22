'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'xinghuoliaoyuan',
		connect:true,
		character:{
			wangcan:["male","qun",3,["xinfu_sanwen","xinfu_qiai","xinfu_denglou"],[]],
			sp_taishici:["male","qun",4,["xinfu_jixu"],[]],
			re_jsp_pangtong:["male","wu",3,["xinfu_guolun","xinfu_songsang"],[]],
			lvdai:["male","wu",4,["xinfu_qinguo"],[]],
			re_zhangliang:["male","qun",4,["xinfu_jijun","xinfu_fangtong"],[]],
			lvqian:["male","wei",4,["xinfu_weilu","xinfu_zengdao"],[]],
			panjun:["male","wu",3,["xinfu_guanwei","xinfu_gongqing"],[]],
			duji:["male","wei",3,["xinfu_andong","xinfu_yingshi"],[]],
			zhoufang:["male","wu",3,["xinfu_duanfa","xinfu_youdi"],[]],
			yanjun:["male","wu",3,["xinfu_guanchao","xinfu_xunxian"],[]],
			liuyao:["male","qun",4,["xinfu_kannan"],[]],
			liuyan:["male","qun",3,["xinfu_tushe","xinfu_limu"],[]],
		},
		characterIntro:{
			wangcan:"王粲（177年－217年2月17日），字仲宣。山阳郡高平县（今山东微山两城镇）人。东汉末年文学家，“建安七子”之一，太尉王龚曾孙、司空王畅之孙。",
			re_jsp_pangtong:"庞统，字士元，襄阳（治今湖北襄阳）人。三国时刘备帐下谋士，官拜军师中郎将。才智与诸葛亮齐名，人称“凤雏”。在进围雒县时，统率众攻城，不幸被流矢击中去世，时年三十六岁。追赐统为关内侯，谥曰靖侯。庞统死后，葬于落凤庞统墓坡。",
			lvdai:"吕岱（161年－256年），字定公，广陵海陵（今江苏如皋）人。三国时期吴国重臣、将领。吕岱一生戮力奉公，为孙吴开疆拓土，功勋赫赫。太平元年（256年），吕岱去世，年九十六。",
			lvqian:"吕虔（生卒年不详），字子恪。任城国（今山东济宁东南）人。汉末至三国曹魏时期将领。 吕虔有勇有谋，曹操在兖州时，任命他为从事，率领家丁驻守湖陆。后升任泰山太守，与夏侯渊共同镇压济南等地的黄巾军。被推举为秀才，加任骑都尉，仍管辖泰山郡。 曹丕继任魏王后，加吕虔为裨将军，封益寿亭侯。再升任徐州刺史，加任威虏将军。任用王祥为别驾，将民政事务都委托于他，为世人所称赞。曹叡继位后，改封万年亭侯。吕虔死后，其子吕翻世袭万年亭侯。",
			panjun:"潘濬（一作潘浚）（？－239年），字承明。武陵郡汉寿县（今湖南汉寿）人。三国时期吴国重臣，蜀汉大司马蒋琬的表弟。 潘濬为人聪察，对问有机理，拜大儒宋忠为师，得到“建安七子”之一的王粲赏识。不到三十，即被荆州牧刘表任命为江夏从事，因按杀贪污的沙羡长而闻名。建安十六年（211年），被刘备任命为荆州治中从事，与守臣关羽不睦。建安二十四年（219年），孙权得荆州，拜潘濬为辅军中郎将。又迁奋威将军，封常迁亭侯。孙权称帝后，拜少府，进封刘阳侯，又改太常。黄龙三年（231年），授假节，与吕岱率军五万平五溪蛮夷叛乱，经三年而斩获数万，使得一方宁静。潘濬为人刚正不阿，在吕壹弄权时，屡请孙权将其诛杀。甚至想亲手击杀吕壹，使吕壹对他非常畏惧。 赤乌二年（239年），潘濬去世。",
			duji:"杜畿 （jī）（163年—224年），字伯侯，京兆杜陵（今陕西西安东南）人。东汉末及三国时曹魏官吏及将领。西汉御史大夫杜延年的后代。历官郡功曹、守郑县令，善于断案。荀彧将他举荐给曹操，曹操任命他为司空司直，调任护羌校尉，使持节领西平太守。 曹丕受禅登基后，封杜畿为丰乐亭侯。官至尚书仆射。后在陶河试航时遇上大风沉没，杜畿淹死，死时六十二岁，曹丕为之涕泣，追赠其为太仆，谥戴侯。",
			zhoufang:"周鲂（生卒年不详），字子鱼。吴郡阳羡县（今江苏宜兴）人。三国时期吴国将领。周鲂年少时好学，被举为孝廉。历任宁国县长、怀安县长、钱塘侯相，一月之内，便斩杀作乱的彭式及其党羽，因而升任丹阳西部都尉。彭绮率数万人反叛时，周鲂被任命为鄱阳太守，与胡综共同将其生擒，因功加职昭义校尉。后诈降曹休，诱其率军接应，使曹休在石亭之战中一败涂地，战后因功被加职为裨将军，封关内侯。贼帅董嗣凭险骚扰豫章等郡，周鲂派间谍将其诱杀，不费兵卒即安定数郡。周鲂在鄱阳赏罚分明、恩威并施，于任职十三年后去世。",
			yanjun:"严畯（生卒年不详），字曼才，彭城（治今江苏徐州）人，三国时期孙吴官员、学者。性情忠厚，待人以诚。少好学，精通《诗》、《书》、《三礼》，又好《说文》。避乱江东，与诸葛瑾、步骘是好朋友，被张昭推荐给孙权作骑都尉、从事中郎。建安二十二年（217年），横江将军鲁肃去世，孙权打算让严畯接替其位。严畯很有自知之明，知道自己没有能力对抗在荆州的关羽和北面的曹魏，便坚决不接受此任命。后来担任尚书令。严畯享年七十八岁。著有《孝经传》、《潮水论》。",
			liuyao:"刘繇（yáo，一读yóu）（156年－197年），字正礼。东莱牟平（今山东牟平）人。东汉末年宗室、大臣，汉末群雄之一，齐悼惠王刘肥之后，太尉刘宠之侄。<br>刘繇最初被推举为孝廉，授郎中。任下邑县长时，因拒郡守请托而弃官。后被征辟为司空掾属，除授侍御史，因战乱而不到任，避居淮浦。兴平元年（194年），被任命为扬州刺史。他先后与袁术、孙策交战，一度被朝廷加授为扬州牧、振武将军，但最终还是败归丹徒。此后，刘繇又击破反叛的笮融，旋即病逝，年四十二。",
			liuyan:"刘焉（？－194年），字君郎（《华阳国志》又作君朗）。江夏郡竟陵县（今湖北省天门市）人。东汉末年宗室、军阀，汉末群雄之一，西汉鲁恭王刘余之后。<br>刘焉初以汉朝宗室身份，拜为中郎，历任雒阳令、冀州刺史、南阳太守、宗正、太常等官。因益州刺史郄俭在益州大肆聚敛，贪婪成风，加上当时天下大乱。刘焉欲取得一安身立命之所，割据一方，于是向朝廷求为益州牧，封阳城侯，前往益州整饬吏治。郄俭为黄巾军所杀，刘焉进入益州，派张鲁盘踞汉中，张鲁截断交通，斩杀汉使，从此益州与中央道路不通。刘焉进一步对内打击地方豪强，巩固自身势力，益州因而处于半独立的状态。兴平元年（194年），刘焉因背疮迸发而逝世，其子刘璋继领益州牧。",
		},
		characterTitle:{},
		perfectPair:{
			lijue:['guosi','jiaxu'],
			zhangji:['zhangxiu','drlt_zhangxiu','zoushi'],
			xf_sufei:['ganning'],
			//baosanniang:['guansuo'],
			simahui:['pangdegong'],
			zhangqiying:['zhanglu'],
			pangtong:['zhugejin'],
			taishici:['liuyao','kongrong'],
			//zhaotongzhaoguang:['zhaoyun','mayunlu'],
			simazhao:['wangyuanji'],
		},
		skill:{
			"xinfu_langxi":{
				audio:2,
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt('xinfu_langxi'),'对一名其他角色造成0-2点随机伤害',function(card,player,target){
						return target.hp<=player.hp&&target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						player.logSkill('xinfu_langxi',result.targets);
						var num=[1,2,0].randomGet();
						if(get.isLuckyStar()) num=2;
						player.line(result.targets[0],'green');
						result.targets[0].damage(num);
					}
				},
			},
			"xinfu_yisuan":{
				usable:1,
				audio:2,
				trigger:{
					player:"useCardAfter",
				},
				check:function (event,player){
					return 18-get.value(event.card)-player.maxHp*2;
				},
				filter:function (event,player){
					if(!player.isPhaseUsing()) return false;
					if(event.cards){
						if(get.type(event.card)!='trick') return false;
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].isInPile()) return true;
						}
					}
					return false;
				},
				content:function (){
					var list=[];
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].isInPile()){
							list.push(trigger.cards[i]);
						}
					}
					player.gain(list,'gain2');
					player.loseMaxHp();
				},
			},
			"xinfu_xingluan":{
				usable:1,
				audio:2,
				trigger:{
					player:"useCardAfter",
				},
				filter:function (event,player){
					if(!player.isPhaseUsing()) return false;
					if(get.type(event.card)==undefined) return false;
					return (event.targets&&event.targets.length==1);
				},
				content:function (){
					var card=get.cardPile2(function(card){
						return card.number==6;
					});
					if(!card){
						player.chat('无牌可得了吗');
						game.log('但是牌堆里面已经没有点数为6的牌了！');
						event.finish();
						return;
					}
					player.gain(card,'gain2');
				},
			},
			"xinfu_lveming":{
				init:function (player){
					player.storage.xinfu_lveming=0;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target&&target.countCards('e')<player.countCards('e')&&target.countCards('hej');
				},
				content:function (){
					"step 0"
					var list=[1,2,3,4,5,6,7,8,9,10,11,12,13]
					target.chooseControl(list).set('ai',function(){
						return list.randomGet();
					});
					"step 1"
					if(result.control){
						target.popup(result.control);
						player.storage.xinfu_lveming++;
						event.num=result.control;
					}
					else{
						target.popup('13');
						player.storage.xinfu_lveming++;
						event.num=13;
					};
					player.judge(function(card){
						if(card.number==event.num) return 4;
						return -1;
					});
					"step 2"
					if(result.bool==true){
						target.damage(2);
					}
					else{
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
					}
				},
				ai:{
					order:9,
					result:{
						target:function (player,target){
							var numj=target.countCards('j');
							var numhe=target.countCards('he');
							if(numhe==0) return 6;
							return -6+(numj+1)/numhe;
						},
					},
					threaten:1.1,
				},
			},
			"xinfu_tunjun":{
				skillAnimation:true,
				animationColor:'metal',
				limited:true,
				unique:true,
				enable:"phaseUse",
				audio:2,
				filter:function (event,player){
					if(player.storage.xinfu_tunjun) return false;
					return player.storage.xinfu_lveming&&player.storage.xinfu_lveming>0;
				},
				filterTarget:true,
				selectTarget:1,
				content:function (){
					"step 0"
					player.awakenSkill('xinfu_tunjun');
					event.num=player.storage.xinfu_lveming;
					event.toequip=[];
					"step 1"
					var equip=get.cardPile(function(card){
						var bool1=true;
						for(var i=0;i<event.toequip.length;i++){
							if(get.type(card)=='equip'&&get.subtype(card)==get.subtype(event.toequip[i])) bool1=false;
						}
						return (get.type(card)=='equip'&&!event.toequip.contains(card)&&!target.isDisabled(get.subtype(card))&&bool1);
					});
					if(equip) event.toequip.push(equip);
					else event.num=0;
					event.num--;
					"step 2"
					if(event.num>0) event.goto(1);
					"step 3"
					for (var i=0;i<event.toequip.length;i++){
						target.chooseUseTarget(event.toequip[i],true).set('animate',false).set('nopopup',true);
					}
				},
				ai:{
					order:1,
					result:{
						target:0,
					},
				},
				mark:true,
				intro:{
					content:"limited",
				},
				init:function (player){
					player.storage.xinfu_tunjun=false;
				},
			},
			"xinfu_tanbei":{
				locked:false,
				mod:{
					targetInRange:function (card,player,target){
						if(target.hasSkill('tanbei_effect1')){
							return true;
						}
					},
					cardUsable:function (card,player,num){
						if(typeof num=='number'&&game.hasPlayer(function(current){
							return current.hasSkill('tanbei_effect1');
						})) return num+100;
					},
					playerEnabled:function (card,player,target){
						if(target.hasSkill('tanbei_effect2')) return false;
						if(game.hasPlayer(function(current){
							return current.hasSkill('tanbei_effect1');
						})&&!target.hasSkill('tanbei_effect1')){
							var num=player.getCardUsable(card)-100;
							if(num<=0) return false;
						}
					},
				},
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target;
				},
				content:function (){
					"step 0"
					if(!target.countCards('hej')){
						event._result={index:1};
					}
					else{
						target.chooseControl().set('choiceList',[
				'令'+get.translation(player)+'随机获得你区域内的一张牌，然后其本回合内不能再对你使用牌。',
				'令'+get.translation(player)+'本回合内对你使用牌没有次数与距离限制。',
						]).set('ai',function(){
							var list=[0,1];
							return list.randomGet();
						});
					}
					"step 1"
					if(result.index==0){
						var card=target.getCards('hej').randomGet();
						player.gain(card,target,'giveAuto','bySelf');
						target.addTempSkill('tanbei_effect2','phaseAfter');
					}
					else{
						target.addTempSkill('tanbei_effect1','phaseAfter');
					}
				},
				ai:{
					order:function (){
						return [2,4,6,8,10].randomGet();
					},
					result:{
						target:function (player,target){
							return -2-target.countCards('h');
						},
					},
					threaten:1.1,
				},
			},
			"xinfu_sidao":{
				group:["xinfu_sidao_count","xinfu_sidao_init"],
				subSkill:{
					init:{
						sub:true,
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							player:"phaseBefore",
						},
						content:function (){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].storage.sidao){
									delete game.players[i].storage.sidao;
								}
							}
						},
					},
					count:{
						sub:true,
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							player:"useCard",
						},
						filter:function (event,player){
							return (event.targets&&event.targets.length);
						},
						content:function (){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i]==player) continue;
								if(game.players[i].storage.sidao){
									if(trigger.targets.contains(game.players[i])) game.players[i].storage.sidao++;
									else delete game.players[i].storage.sidao;
								}else{
									if(trigger.targets.contains(game.players[i])) game.players[i].storage.sidao=1;
								}
							}
						},
					},
				},
				audio:2,
				enable:"chooseToUse",
				usable:1,
				filterCard:true,
				position:"h",
				viewAs:{
					name:"shunshou",
				},
				viewAsFilter:function (player){
					if(!player.countCards('h')||!game.hasPlayer(function(target){
						return target.storage.sidao&&target.storage.sidao>1;
					})) return false;
				},
				filterTarget:function (card,player,target){
					return target.storage.sidao&&target.storage.sidao>1;
				},
				prompt:"将一张手牌当顺手牵羊使用",
				check:function (card){return 4-get.value(card)},
				ai:{
					wuxie:function (target,card,player,viewer){
						if(get.attitude(viewer,player)>0&&get.attitude(viewer,target)>0){
							return 0;
						}
					},
					basic:{
						order:7.5,
						useful:4,
						value:9,
					},
					result:{
						target:function (player,target){
							if(get.attitude(player,target)<=0) return (target.countCards('he')>0)?-1.5:1.5;
							var js=target.getCards('j');
							if(js.length){
								var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
								if(jj.name=='shunshou') return 3;
								if(js.length==1&&get.effect(target,jj,target,player)>=0){
									return -1.5;
								}
								return 3;
							}
							return -1.5;
						},
						player:function (player,target){
							if(get.attitude(player,target)<0&&!target.countCards('he')){
								return 0;
							}
							if(get.attitude(player,target)>1){
								var js=target.getCards('j');
								if(js.length){
									var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
									if(jj.name=='shunshou') return 1;
									if(js.length==1&&get.effect(target,jj,target,player)>=0){
										return 0;
									}
									return 1;
								}
								return 0;
							}
							return 1;
						},
					},
					tag:{
						loseCard:1,
						gain:1,
					},
				},
			},
			"tanbei_effect1":{
			},
			"tanbei_effect2":{
			},
			"xinfu_tunan":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return target!=player;
				},
				content:function (){
					'step 0'
					event.cards=get.cards(1);
					player.showCards(get.translation(player)+'对'+get.translation(target)+'发动了【图南】',event.cards);
					'step 1'
					var card=cards[0];
					var bool1=game.hasPlayer(function(current){
						return target.canUse(card,current,false);
					});
					var bool2=game.hasPlayer(function(current){
						return target.canUse({name:'sha'},current);
					});
					if(bool1&&bool2){
						target.chooseControl(function(){
							return 0;
						}).set('choiceList',[
							'使用'+get.translation(cards)+'。（没有距离限制）',
							'将'+get.translation(cards)+'当做【杀】使用。',
						]).set('ai',function(){
							var list=[0,1];
							return list.randomGet();
						});
					}
					else if(bool1){
						event.directindex=0;
					}
					else if(bool2){
						event.directindex=1;
					}
					else{
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						event.finish();
					}
					'step 2'
					var card=cards[0];
					if(result&&typeof event.directindex!='number'){
						event.directindex=result.index;
					}
					if(event.directindex==1){
						target.chooseUseTarget({name:'sha'},cards,true,false)
					}
					else{
						target.chooseUseTarget(card,true,false,'nodistance');
					}
				},
				ai:{
					order:7,
					result:{
						target:1,
					},
				},
			},
			"xinfu_bijing":{
				audio:2,
				group:["xinfu_bijing_lose","xinfu_bijing_discard"],
				subSkill:{
					lose:{
						trigger:{
							player:"loseEnd",
						},
						filter:function (event,player){
							if(!player.storage.xinfu_bijing) return false;
							if(_status.currentPhase==player) return false;
							return event.cards.contains(player.storage.xinfu_bijing);
						},
						forced:true,
						silent:true,
						popup:false,
						content:function (){
							_status.currentPhase.storage.bijing=player;
							_status.currentPhase.addTempSkill('xinfu_bijing_effect');
						},
						sub:true,
					},
					discard:{
						trigger:{
							player:"phaseZhunbeiBegin",
						},
						forced:true,
						filter:function (event,player){
							if(!player.storage.xinfu_bijing)return false;
							return get.owner(player.storage.xinfu_bijing)==player;
						},
						content:function (){
							player.discard(player.storage.xinfu_bijing);
							delete player.storage.xinfu_bijing;
						},
						sub:true,
					},
					effect:{
						trigger:{
							player:"phaseDiscardBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						content:function (){
							player.storage.bijing.logSkill('xinfu_bijing');
							player.storage.bijing.line(player,'green');
							player.chooseToDiscard(2,'he',true);
						},
						sub:true,
					},
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function (player,event){
					return event.countCards('h')>0;
				},
				content:function (){
				'step 0'
					player.chooseCard(get.prompt2('xinfu_bijing'),'h').set('ai',function(card){
						if(card.name=='shan') return 6;
						return 6-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('xinfu_bijing');
						player.showCards(result.cards);
						player.storage.xinfu_bijing=result.cards[0];
					}
				},
			},
			"xinfu_zhenxing":{
				audio:2,
				trigger:{
					player:["damageEnd","phaseJieshuBegin"],
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseControl('一张','两张','三张','cancel2').set('prompt',get.prompt2('xinfu_zhenxing')).set('',function(){return 0});
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						player.logSkill('xinfu_zhenxing');
						event.num={一张:1,两张:2,三张:3}[result.control];
					};
					'step 2'
					event.cards=get.cards(num);
					player.chooseButton(['【镇行】：请选择要获得的牌',event.cards]).set('filterButton',function(button){
						for(var i=0;i<event.cards.length;i++){
							if(button.link!=event.cards[i]&&get.suit(event.cards[i])==get.suit(button.link)) return false;
						}
						return true;
					}).set('ai',function(button){
						return get.value(button.link);
					});
					'step 3'
					var tothrow=[];
					for(var i=event.cards.length-1;i>=0;i--){
						if(result.bool&&result.links.contains(event.cards[i])){
							player.gain(event.cards[i],'gain2');
						}
						else{
							event.cards[i].fix();
							ui.cardPile.insertBefore(event.cards[i],ui.cardPile.childNodes[0]);
						}
					}
					game.updateRoundNumber();
				},
			},
			"xinfu_qianxin":{
				audio:2,
				group:["qianxin_effect"],
				enable:"phaseUse",
				usable:1,
				onChooseToUse:function(event){
					if(!game.online){
						var num1=game.players.length-1;
						var player=event.player;
						var num2=ui.cardPile.childElementCount;
						var num3=num2;
						if(num1>num2) num3=0;
						else if(!player.storage.xinfu_qianxin){}
						else{
							for(var i=0;i<num2;i++){
								if(player.storage.xinfu_qianxin.contains(ui.cardPile.childNodes[i])){
									num3=0;break;
								}
							}
						}
						event.set('qianxinNum',num3);
					}
				},
				filter:function (event,player){
					return event.qianxinNum&&event.qianxinNum>0;
				},
				filterTarget:function (card,player,target){
					return target!=player;
				},
				filterCard:true,
				selectCard:function (){
					var num1=game.players.length-1;
					var num2=_status.event.qianxinNum;
					return [1,Math.floor(num2/num1)];
				},
				discard:false,
				check:function (){
					return -1;
				},
				delay:0,
				content:function (){
					'step 0'
					player.$throw(cards.length);
					player.storage.xinfu_qianxin=cards;
					player.storage.xinfu_qianxin_target=target;
					var num1=game.players.length;
					var num2=ui.cardPile.childElementCount;
					for(var i=0;i<event.cards.length;i++){
						event.cards[i].fix();
						var num3=num1*(i+1)-1;
						if(num3<num2){
							ui.cardPile.insertBefore(cards[i],ui.cardPile.childNodes[num3]);
						}
						else{
							ui.cardPile.appendChild(cards[i]);
						}
					}
					game.updateRoundNumber();
					game.log(player,'把',get.cnNumber(cards.length),'张牌放在了牌堆里');
				},
				ai:{
					order:1,
					result:{
						target:-1,
					},
				},
	
			},
			"qianxin_effect":{
				trigger:{
					global:"gainAfter",
				},
				silent:true,
				forced:true,
				popup:false,
				filter:function (event,player){
					if(!player.storage.xinfu_qianxin||!player.storage.xinfu_qianxin_target) return false;
					if(event.player==player) return false;
					if(_status.currentPhase!=event.player) return false;
					if(player.storage.xinfu_qianxin_target!=event.player) return false;
					for(var i=0;i<event.cards.length;i++){
						if(player.storage.xinfu_qianxin.contains(event.cards[i])) return true;
					}
					return false;
				},
				content:function (){
					trigger.player.storage.xinfu_qianxin_source=player;
					trigger.player.addTempSkill('xinfu_qianxin2');
				},
			},
			"xinfu_qianxin2":{
				subSkill:{
					dis:{
						mod:{
							maxHandcard:function (player,num){
					return num-2;
				},
						},
						sub:true,
					},
				},
				forced:true,
				silent:true,
				popup:false,
				trigger:{
					player:"phaseDiscardBefore",
				},
				filter:function (event,player){
					return true;
				},
				content:function (){
					'step 0'
					event.source=player.storage.xinfu_qianxin_source;
					event.source.logSkill('xinfu_qianxin',player);
					event.source.line(player,'thunder');
					delete event.source.storage.xinfu_qianxin_target;
					delete player.storage.xinfu_qianxin_source;
					if(event.source.countCards('h')>=4){
						event._result={index:1};
					}
					else{
						player.chooseControl().set('choiceList',[
							'令'+get.translation(event.source)+'将手牌摸至四张',
							'令自己本回合的手牌上限-2'
						]).set('ai',function(){
							var player=_status.event.player;
							var source=_status.event.getParent().player;
							if(get.attitude(player,source)>0) return 0;
							if(player.hp-player.countCards('h')>1) return 1;
							return [0,1].randomGet();
						})
					}
					'step 1'
					if(result.index==0){
						event.source.draw(4-event.source.countCards('h'));
					}
					else{
						player.addTempSkill('xinfu_qianxin2_dis');
					}
				},
			},
			"xinfu_fuhai":{
				subSkill:{
					next:{},
					previous:{},
				},
				audio:2,
				group:["fuhai_clear"],
				intro:{
					content:"已指定过#个目标",
				},
				enable:"phaseUse",
				filter:function (event,player){
					if(player.hasSkill('xinfu_fuhai_next')&&player.hasSkill('xinfu_fuhai_previous')) return false;
					return player.countCards('h')>0;
				},
				filterTarget:function (card,player,target){
					if(![player.next,player.previous].contains(target)||target.countCards('h')==0) return false;
					if(player.hasSkill('xinfu_fuhai_next')) return target==player.previous;
					if(player.hasSkill('xinfu_fuhai_previous')) return target==player.next;
					return true;
				},
				line:false,
				content:function (){
					'step 0'
					event.side=target==player.next?'next':'previous';
					event.current=target;
					if(!player.storage.xinfu_fuhai) player.storage.xinfu_fuhai=1;
					player.addTempSkill('xinfu_fuhai_'+event.side,'phaseUseAfter');
					'step 1'
					if(player.countCards('h')==0||event.current.countCards('h')==0||event.current==player){
					event.finish();
					return;
					}
					player.markSkill('xinfu_fuhai');
					player.line(event.current,'green');
					player.chooseCard('请选择要展示的牌',true).set('ai',function(){
						return 1+Math.random();
					});
					'step 2'
					event.mes=result.cards[0];
					player.showCards(event.mes);
					'step 3'
					event.current.chooseCard('请选择要展示的牌',true).set('ai',function(){
						return 1+Math.random();
					});
					'step 4'
					event.tes=result.cards[0];
					event.current.showCards(event.tes);
					'step 5'
					var num1=get.number(event.mes);
					var num2=get.number(event.tes);
					if(num1<num2){
						event.current.discard(event.tes);
						game.asyncDraw([player,event.current],player.storage.xinfu_fuhai);
						player.addTempSkill('xinfu_fuhai_next','phaseUseAfter');
						player.addTempSkill('xinfu_fuhai_previous','phaseUseAfter');
						player.unmarkSkill('xinfu_fuhai');
					}
					else{
						player.discard(event.mes);
						player.storage.xinfu_fuhai++;
						event.current=event.current[event.side];
						if(player.countCards('h')>0&&event.current.countCards('h')>0&&event.current!=player) event.goto(1);
					}
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			"fuhai_clear":{
				trigger:{
					player:"phaseAfter",
				},
				forced:true,
				silent:true,
				popup:false,
				filter:function (event,player){
					return player.storage.xinfu_fuhai!=undefined;
				},
				content:function (){
					player.unmarkSkill('xinfu_fuhai');
					delete player.storage.xinfu_fuhai;
				},
			},
			"xz_xunxun":{
				filter:function (event,player){
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
					return num>=1&&!player.hasSkill('xunxun');
				},
				audio:2,
				trigger:{
					player:"phaseDrawBefore",
				},
				//priority:10,
				content:function (){
					"step 0"
					event.cards=get.cards(4);
					player.chooseCardButton(true,event.cards,2,'选择两张牌置于牌堆顶').set('ai',ai.get.buttonValue);
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
			"xinfu_xingzhao":{
				audio:true,
				group:["xz_xunxun","xinfu_xingzhao2"],
				mark:true,
				intro:{
					content:function (storage,player){
						var num=game.countPlayer(function(current){
							return current.isDamaged();
						})
						var str='暂无任何效果';
						if(num>=1){
							str='<li>视为拥有技能“恂恂”';
						}
						if(num>=2){
							str+='；使用装备牌时摸一张牌';
						}
						if(num>=3){
						str+='；始终跳过弃牌阶段';
						}
						return str;
					},
				},
				trigger:{
					player:"useCard",
				},
				forced:true,
				filter:function (event,player){
					if(get.type(event.card)!='equip') return false;
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
					return num>=2;
				},
				content:function (){
					player.draw();
				},
			},
			"xinfu_xingzhao2":{
				audio:true,
				trigger:{
					player:"phaseDiscardBefore",
				},
				forced:true,
				filter:function (event,player){
					var num=game.countPlayer(function(current){
						return current.isDamaged();
					});
				return num>=3;
				},
				content:function (){
					trigger.cancel();
					game.log(player,'跳过了弃牌阶段');
				},
			},
			"xinfu_dianhu":{
				audio:2,
				trigger:{
					global:"gameDrawAfter",
				},
				forced:true,
				filter:function (){
					return game.players.length>1;
				},
				content:function (){
					'step 0'
					player.chooseTarget('选择【点虎】的目标',lib.translate.xinfu_dianhu_info,true,function(card,player,target){
						return target!=player&&!target.hasSkill('xinfu_dianhu2');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att<0) return -att+3;
						return Math.random();
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						game.log(target,'成为了','【点虎】','的目标');
						target.storage.xinfu_dianhu2=player;
						target.addSkill('xinfu_dianhu2');
					}
				},
			},
			"xinfu_dianhu2":{
				mark:"character",
				intro:{
					content:"当你受到来自$的伤害或回复体力后，$摸一张牌",
				},
				nopop:true,
				trigger:{
					player:["damageAfter","recoverAfter"],
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					if(player.storage.xinfu_dianhu2&&player.storage.xinfu_dianhu2.isIn()){
						if(event.name=='damage') return event.source==player.storage.xinfu_dianhu2;
						return true;
					};
				},
				content:function (){
					'step 0'
					var target=player.storage.xinfu_dianhu2;
					target.logSkill('xinfu_dianhu');
					target.draw();
				},
				onremove:true,
			},
			"xinfu_jianji":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
				return target!=player;
				},
				content:function (){
					'step 0'
					target.draw();
					'step 1'
					var card=result[0];
					if(card&&game.hasPlayer(function(current){
						return target.canUse(card,current);
					})&&get.owner(card)==target){
						target.chooseToUse({
							prompt:'是否使用'+get.translation(card)+'？',
							filterCard:function(cardx,player,target){
								return cardx==_status.event.cardx;
							},
							cardx:card,
						});
					}
				},
				ai:{
					order:7.5,
					result:{
						target:1,
					},
				},
			},
			"xinfu_lianpian":{
				audio:2,
				subSkill:{
					refrain:{
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							global:["phaseBefore","phaseAfter"],
						},
						content:function (){
							player.storage.xinfu_lianpian=[];
							player.storage.xinfu_lianpian_number=0;
						},
					},
				},
				group:["xinfu_lianpian_refrain"],
				trigger:{
					player:"useCard",
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					return _status.currentPhase==player&&player.storage.xinfu_lianpian_number<3;
				},
				content:function (){
					'step 0'
					if(!player.storage.xinfu_lianpian){
						event.goto(4);
					}
					else{
						event.ablers=[];
						for(var i=0;i<trigger.targets.length;i++){
							if(player.storage.xinfu_lianpian.contains(trigger.targets[i])){
								event.ablers.add(trigger.targets[i]);
							}
						}
						if(!event.ablers.length) event.goto(4);
						else{
							player.chooseBool(get.prompt2('xinfu_lianpian')).set('ai',function(){
								return true;
							}).set('prompt2',get.translation('xinfu_lianpian_info'));
						}
					}
					'step 1'
					if(result.bool){
						player.logSkill('xinfu_lianpian');
						player.storage.xinfu_lianpian_number++;
						player.draw();
					}
					else event.goto(4);
					'step 2'
					event.card=result[0];
					if(event.card&&get.owner(event.card)==player&&(event.ablers.length>1||event.ablers[0]!=player)){
						player.chooseTarget('是否将'+get.translation(event.card)+'交给其他角色？',function(card,player,target){
							return _status.event.ablers.contains(target)&&target!=player;
						}).set('ablers',event.ablers).ai=function(){
							return false;
						};
					}
					'step 3'
					if(result.bool){
						player.give(event.card,result.targets[0],true);
					}
					'step 4'
					player.storage.xinfu_lianpian=trigger.targets;
				},
			},
			"xinfu_lingren":{
				usable:1,
				audio:2,
				trigger:{
					player:"useCardToPlayered",
				},
				direct:true,
				filter:function (event,player){
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(!player.isPhaseUsing()) return false;
					if(!['basic','trick'].contains(get.type(event.card))) return false;
					if(get.tag(event.card,'damage')) return true;
					return false;
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('xinfu_lingren'),function(card,player,target){
						return _status.event.targets.contains(target);
					}).set('ai',function(target){
						return 2-get.attitude(_status.event.player,target);
					}).set('targets',trigger.targets);
					'step 1'
					if(result.bool){
						player.logSkill('xinfu_lingren',result.targets);
						var target=result.targets[0];
						event.target=target;
						player.line('water',target);
						event.choice={
							basic:false,
							trick:false,
							equip:false,
						}
						player.chooseBool('是否押基本牌？').ai=function(event,player){
							var rand=0.95;
							if(!target.countCards('h',{type:['basic']})) rand=0;
							return Math.random()<rand?true:false;
						};
					}
					else{
						player.storage.counttrigger.xinfu_lingren--;
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.choice.basic=true;
					}
					player.chooseBool('是否押锦囊牌？').ai=function(event,player){
						var rand=0.95;
							if(!target.countCards('h',{type:['trick','delay']})) rand=0;
							return Math.random()<rand?true:false;
					};
					'step 3'
					if(result.bool){
						event.choice.trick=true;
					}
					player.chooseBool('是否押装备牌？').ai=function(event,player){
						var rand=0.95;
							if(!target.countCards('h',{type:['equip']})) rand=0;
							return Math.random()<rand?true:false;
					};
					'step 4'
					if(result.bool){
						event.choice.equip=true;
					}
					game.delay();
					var reality={
						basic:false,
						trick:false,
						equip:false,
					}
					var he=target.getCards('h');
					for(var i=0;i<he.length;i++){
						reality[get.type(he[i],'trick')]=true;
					}
					event.num=0;
					var tl=['basic','trick','equip'];
					for(var i=0;i<tl.length;i++){
						if(event.choice[tl[i]]==reality[tl[i]]) event.num++;
					}
					'step 5'
					player.popup('猜对'+get.cnNumber(event.num)+'项');
					game.log(player,'猜对了'+get.cnNumber(event.num)+'项');
					if(event.num>0){
						target.addTempSkill('lingren_adddamage');
						target.storage.lingren={
							card:trigger.card,
							//player:event.targett,
						}
					}
					if(event.num>1) player.draw(2);
					if(event.num>2){
						player.addTempSkill('lingren_jianxiong',{player:'phaseBegin'});
						player.addTempSkill('lingren_xingshang',{player:'phaseBegin'});
					}
				},
				ai:{
					threaten:2.4,
				},
			},
			"lingren_adddamage":{
				onremove:function (player){
					delete player.storage.lingren;
				},
				trigger:{
					player:"damageBegin3",
				},
				filter:function (event,player){
					var info=player.storage.lingren;
					return event.card&&event.card==info.card;
				},
				silent:true,
				popup:false,
				forced:true,
				content:function (){
						trigger.num++;
				},
			},
			"lingren_jianxiong":{
				audio:1,
				trigger:{
					player:"damageEnd",
				},
				content:function (){
					"step 0"
					if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0],true)=='o'){
						player.gain(trigger.cards,"gain2");
					}
					player.draw("nodelay");
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
			"lingren_xingshang":{
				audio:1,
				inherit:'rexingshang',
			},
			"xinfu_fujian":{
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				filter:function (event,player){
					return !game.hasPlayer(function(current){
						return current.countCards('h')==0;
					});
				},
				forced:true,
				content:function (){
					event.num=0;
					var list=game.filterPlayer(function(target){
						if(target.isMinHandcard()) event.num=target.countCards('h');
						return player!=target;
					});
					if(event.num<1){
						event.finish();
					}
					else{
						var target=list.randomGet();
						var cards=target.getCards('h').randomGets(event.num);
						player.line(target);
						var content=[get.translation(target)+'的部分手牌',cards];
						game.log(player,'观看了',target,'的部分手牌');
						player.chooseControl('ok').set('dialog',content);
					}
				},
			},
			"xinfu_xionghuo":{
				group:["xinfu_xionghuo_damage","xinfu_xionghuo_begin"],
				subSkill:{
					begin:{
						silent:true,
						popup:false,
						sub:true,
						forced:true,
						trigger:{
							global:"phaseUseBegin",
						},
						filter:function (event,player){
							return event.player.hasSkill('xionghuo')&&event.player!=player;
						},
						content:function (){
							'step 0'
							player.logSkill("xinfu_xionghuo");
							if(trigger.player.storage.xionghuo>1) trigger.player.storage.xionghuo--;
							else{
								delete trigger.player.storage.xionghuo;
								trigger.player.removeSkill('xionghuo');
							}
							var list=[1,2,3];
							var num=list.randomGet();
							event.goto(num);
							'step 1'
							player.line(trigger.player,'fire');
							trigger.player.damage('fire');
							trigger.player.addTempSkill('xionghuo_disable','phaseAfter');
							event.goto(4);
							'step 2'
							player.line(trigger.player,'water');
							trigger.player.loseHp();
							trigger.player.addTempSkill('xionghuo_low','phaseAfter');
							event.goto(4);
							'step 3'
							player.line(trigger.player,'green');
							var card1=trigger.player.getCards('h').randomGet();
							var card2=trigger.player.getCards('e').randomGet();
							var list=[];
							if(card1) list.push(card1);
							if(card2) list.push(card2);
							if(list.length>0){
								player.gain(list,trigger.player,'giveAuto','bySelf');
							}
							'step 4'
							game.delay();
						},
					},
					damage:{
						audio:"xinfu_xionghuo",
						sub:true,
						forced:true,
						trigger:{
							source:"damageBegin1",
						},
						filter:function (event,player){
							return event.player.hasSkill('xionghuo');
						},
						content:function (){
							trigger.num++;
						},
					},
				},
				audio:2,
				enable:"phaseUse",
				usable:null,
				init:function (player){
					if(player.storage.xinfu_xionghuo==undefined) player.storage.xinfu_xionghuo=3;
				},
				mark:true,
				marktext:"戾",
				intro:{
					content:"mark",
				},
				filter:function(event,player){
					return player.storage.xinfu_xionghuo>0;
				},
				filterTarget:function (card,player,target){
					if(target.storage.xionghuo!=undefined&&target.storage.xionghuo>0) return false;
					return player!=target&&player.storage.xinfu_xionghuo>0;
				},
				content:function (){
					if(target.storage.xionghuo==undefined||target.storage.xionghuo==0){
						target.addSkill('xionghuo');
						target.storage.xionghuo=0;
					}
					target.storage.xionghuo++;
					player.storage.xinfu_xionghuo--;
					target.syncStorage('xionghuo');
					player.syncStorage('xinfu_xionghuo');
					if(player.storage.xinfu_xionghuo==0) player.unmarkSkill('xinfu_xionghuo');
				},
				ai:{
					order:11,
					result:{
						target:function (player,target){
							return Math.min(-(1+player.storage.xinfu_xionghuo-target.hp),0);
						},
					},
					threaten:1.1,
				},
			},
			xionghuo:{
				marktext:"戾",
				mark:true,
				intro:{
					content:"mark",
				},
				locked:true,
			},
			"xionghuo_disable":{
				mod:{
					playerEnabled:function (card,player,target){
						if(target.hasSkill('xinfu_xionghuo')&&card.name=='sha') return false;
					},
				},
				mark:true,
				marktext:"禁",
				intro:{
					content:"本回合内不能对“徐荣”使用“杀”。",
				},
			},
			"xionghuo_low":{
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
				marktext:"减",
				mark:true,
				intro:{
					content:"本回合内手牌上限-1。",
				},
			},
			"xinfu_shajue":{
				audio:2,
				trigger:{
					global:"dying",
				},
				filter:function (event,player){
					return event.player.hp<0&&event.player!=player;
				},
				forced:true,
				//priority:7,
				content:function (){
					if(trigger.parent.name=='damage'&&get.itemtype(trigger.parent.cards)=='cards'&&get.position(trigger.parent.cards[0],true)=='o'){
						player.gain(trigger.parent.cards,"gain2");
					}
					player.storage.xinfu_xionghuo++;
					player.markSkill('xinfu_xionghuo');
					player.syncStorage('xinfu_xionghuo');
				},
			},
			"xinfu_jianjie":{
				derivation:["jianjie_faq"],
				group:["xinfu_jianjie1","xinfu_jianjie2"],
				subSkill:{
					phase:{
						charlotte:true,
						sub:true,
					},
					off:{
						charlotte:true,
						sub:true,
					},
				},
				audio:3,
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				direct:true,
				filter:function (event,player){
					if(player.hasSkill('xinfu_jianjie_off')) return false;
					return !game.hasPlayer(function(current){
						return current.hasSkill('smh_huoji')||current.hasSkill('smh_lianhuan');
					});
				},
				content:function (){
					"step 0"
					player.addTempSkill('xinfu_jianjie_phase');
					player.addSkill('xinfu_jianjie_off');
					player.chooseTarget('请将「龙印」交给一名角色',true,function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return 10+get.attitude(player,target);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.logSkill('xinfu_jianjie',target);
						player.line(target,'fire');
						target.addSkill('smh_huoji');
						game.delay();
					}
					if(game.hasPlayer(function(current){
						return !current.hasSkill('smh_huoji')&&current!=player
					})){
					player.chooseTarget('请将「凤印」交给一名角色',true,function(card,player,target){
						return target!=player&&!target.hasSkill('smh_huoji');
					}).set('ai',function(target){
						var player=_status.event.player;
						return 10+get.attitude(player,target);
					});
					}else event.finish();
					"step 2"
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.logSkill('xinfu_jianjie',target);
						player.line(target,'green');
						target.addSkill('smh_lianhuan');
						game.delay();
					}
				},
			},
			"xinfu_jianjie1":{
				audio:3,
				prompt:"你的第一个准备阶段，你令两名不同的角色分别获得龙印与凤印；出牌阶段限一次（你的第一个回合除外），或当拥有龙印、凤印的角色死亡时，你可以转移龙印、凤印。",
				enable:"phaseUse",
				usable:1,
				filter:function (event,player){
					if(!game.hasPlayer(function(current){
						return current.hasSkill('smh_huoji')||current.hasSkill('smh_lianhuan');
					})) return false;
					return !player.hasSkill('xinfu_jianjie_phase');
				},
				filterTarget:function (card,player,target){
					if(ui.selected.targets.length==1){
						return true;
					}else{
						return target.hasSkill('smh_huoji')||target.hasSkill('smh_lianhuan');
					}
				},
				targetprompt:["移走印","得到印"],
				selectTarget:2,
				multitarget:true,
				content:function (){
					'step 0'
					if(targets[0].hasSkill('smh_huoji')&&targets[0].hasSkill('smh_lianhuan')){
						player.chooseControl('龙印','凤印').set('prompt','请选择要移动的印');
					}
					else{
						if(targets[0].hasSkill('smh_huoji')) event._result={control:'龙印'};
						else event._result={control:'凤印'};
					}
					'step 1'
					if(result.control=='龙印'){
						targets[0].removeSkill('smh_huoji');
						targets[1].addSkill('smh_huoji');
					}
					else{
						targets[0].removeSkill('smh_lianhuan');
						targets[1].addSkill('smh_lianhuan');
					}
				},
				ai:{
					order:8,
					result:{
						target:function (player,target){
							if(ui.selected.targets.length==0){
								return get.attitude(player,target)<0?-999:-3;
							}
							else{
								return target.countCards('h');
							}
						},
					},
					expose:0.4,
					threaten:3,
				},
			},
			"smh_huoji":{
				charlotte:true,
				group:["smh_yeyan"],
				mark:true,
				marktext:"龙",
				intro:{
					name:"龙印",
					content:"<li>出牌阶段限三次，你可以将你的任意一张♥或♦手牌当【火攻】使用。<br><li>若你同时拥有「凤印」，则你视为拥有技能〖业炎〗。（发动〖业炎〗后，弃置龙印和凤印）",
				},
				usable:3,
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
					if(player.hasSkill('huoji')) return false;
					if(!player.countCards('h',{color:'red'})) return false;
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
			"smh_lianhuan":{
				audio:2,
				charlotte:true,
				enable:"phaseUse",
				filter:function (event,player){
					if(player.hasSkill('lianhuan')||player.hasSkill('xinlianhuan')) return false;
					if((player.getStat().skill.smh_lianhuan||0)+(player.getStat().skill.smh_lianhuan1||0)>=3) return false;
					return player.countCards('h',{suit:'club'})>0;
				},
				filterCard:function (card){
					return get.suit(card)=='club';
				},
				viewAs:{
					name:"tiesuo",
				},
				prompt:"将一张梅花牌当铁锁连环使用",
				check:function (card){return 6-get.value(card)},
				mark:true,
				marktext:"凤",
				intro:{
					name:"凤印",
					content:"<li>出牌阶段限三次，你可以将你的任意一张梅花手牌当作【铁索连环】使用或重铸。",
				},
				group:["smh_lianhuan1"],
				ai:{
					wuxie:function (){
						if(Math.random()<0.5) return 0;
					},
					basic:{
						useful:4,
						value:4,
						order:7,
					},
					result:{
						target:function (player,target){
							if(target.isLinked()){
								if(target.hasSkillTag('link')) return 0;
								var f=target.hasSkillTag('nofire');
								var t=target.hasSkillTag('nothunder');
								if(f&&t) return 0;
								if(f||t) return 0.5;
								return 2;
							}
							if(get.attitude(player,target)>=0) return -0.9;
							if(ui.selected.targets.length) return -0.9;
							if(game.hasPlayer(function(current){
								return get.attitude(player,current)<=-1&&current!=target&&!current.isLinked();
							})){
								return -0.9;
							}
							return 0;
						},
					},
					tag:{
						multitarget:1,
						multineg:1,
						norepeat:1,
					},
				},
			},
			"xinfu_jianjie2":{
				trigger:{
					global:"dieAfter",
				},
				forced:true,
				direct:true,
				silent:true,
				popup:false,
				filter:function (event,player){
					return event.player.hasSkill('smh_huoji')||event.player.hasSkill('smh_lianhuan');
				},
				content:function (){
					"step 0"
					player.logSkill('xinfu_jianjie');
					"step 1"
					if(trigger.player.hasSkill('smh_huoji')){
						player.chooseTarget('请将'+get.translation(trigger.player)+'的「龙印」交给一名角色',true).set('ai',function(target){
							var player=_status.event.player;
							return 10+get.attitude(player,target);
						});
					}else event.goto(2);
					"step 2"
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'fire');
						target.addSkill('smh_huoji');
						game.delay();
					}
					"step 3"
					if(trigger.player.hasSkill('smh_lianhuan')){
						player.chooseTarget('请将'+get.translation(trigger.player)+'的「凤印」交给一名角色',true).set('ai',function(target){
							var player=_status.event.player;
							return 10+get.attitude(player,target);
						});
					}else event.finish();
					"step 4"
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'green');
						target.addSkill('smh_lianhuan');
						game.delay();
					}
				},
			},
			"smh_lianhuan1":{
				enable:"phaseUse",
				filter:function (event,player){
					if(player.hasSkill('lianhuan')||player.hasSkill('xinlianhuan')) return false;
					if((player.getStat().skill.smh_lianhuan||0)+(player.getStat().skill.smh_lianhuan1||0)>=3) return false;
					return player.countCards('h',{suit:'club'})>0;
				},
				filterCard:function (card){
					return get.suit(card)=='club';
				},
				check:function (card){
					return -1;
				},
				content:function (){
					player.draw();
				},
				discard:false,
				prompt:"将一张梅花牌置入弃牌堆并摸一张牌",
				delay:0.5,
				prepare:function (cards,player){
					player.$throw(cards,1000);
				},
				ai:{
					basic:{
						order:1,
					},
					result:{
						player:1,
					},
				},
				forced:true,
			},
			"smh_yeyan":{
				unique:true,
				enable:"phaseUse",
				audio:3,
				skillAnimation:true,
				animationColor:'gray',
				prompt:"限定技，出牌阶段，你可以对一至三名角色造成至多共3点火焰伤害（你可以任意分配每名目标角色受到的伤害点数），若你将对一名角色分配2点或更多的火焰伤害，你须先弃置四张不同花色的手牌再失去3点体力。",
				filter:function (event,player){
					return player.hasSkill('smh_lianhuan');
				},
				filterTarget:function (card,player,target){
					var length=ui.selected.cards.length;
					return (length==0||length==4);
				},
				filterCard:function (card){
					var suit=get.suit(card);
					for(var i=0;i<ui.selected.cards.length;i++){
						if(get.suit(ui.selected.cards[i])==suit) return false;
					}
					return true;
				},
				complexCard:true,
				selectCard:[0,4],
				line:"fire",
				check:function (){return -1},
				selectTarget:function (){
					if(ui.selected.cards.length==4) return [1,2];
					if(ui.selected.cards.length==0) return [1,3];
					game.uncheck('target');
					return [1,3];
				},
				multitarget:true,
				multiline:true,
				content:function (){
					"step 0"
					player.removeSkill('smh_huoji');
					player.removeSkill('smh_lianhuan');
					targets.sort(lib.sort.seat);
					event.num=0
					"step 1"
					if(cards.length==4) event.goto(2);
					else {
						if(event.num<targets.length){
						targets[event.num].damage('fire',1,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					}
					"step 2"
					player.loseHp(3);
					if(targets.length==1) event.goto(4);
					else{
						player.chooseTarget('请选择受到2点伤害的角色',true,function(card,player,target){
							return _status.event.targets.contains(target)
						}).set('ai',function(target){
							return 1;
						}).set('targets',targets).set('forceDie',true);
					}
					"step 3"
					if(event.num<targets.length){
						var dnum=1;
						if(result.bool&&result.targets&&targets[event.num]==result.targets[0]) dnum=2;
						targets[event.num].damage('fire',dnum,'nocard');
						event.num++;
					}
					if(event.num==targets.length) event.finish();
					else event.redo();
					"step 4"
					player.chooseControl("2点","3点").set('prompt','请选择伤害点数').set('ai',function(){
						return "3点";
					}).set('forceDie',true);
					"step 5"
					targets[0].damage('fire',result.control=="2点"?2:3,'nocard'); 
				},
				ai:{
					order:1,
					result:{
						target:0,
						/*target:function (player,target){
							if(target.hasSkillTag('nofire')) return 0;
							if(lib.config.mode=='versus') return -1;
							if(player.hasUnknown()) return 0;
							return get.damageEffect(target,player);
						},*/
					},
				},
			},
			"xinfu_yinshi":{
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				//priority:15,
				filter:function (event,player){
					if(player.hasSkill('smh_huoji')||player.hasSkill('smh_lianhuan')) return false;
					if(!player.isEmpty(2)) return false;
					if(event.nature) return true;
					return get.type(event.card,'trick')=='trick';
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					notrick:true,
					nofire:true,
					nothunder:true,
					effect:{
						target:function (card,player,target,current){
							if(target.hasSkill('smh_huoji')||target.hasSkill('smh_lianhuan')) return;
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=8) return 0;
							}
							if(!target.isEmpty(2)) return;
							if(get.tag(card,'natureDamage')) return 'zerotarget';
							if(get.type(card)=='trick'&&get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			"xinfu_chenghao":{
				audio:2,
				trigger:{
					global:"damageEnd",
				},
				filter:function (event,player){
					return event.lianhuanable==true&&event.player.isAlive();
				},
				frequent:true,
				content:function (){
					"step 0"
					event.cards=get.cards(game.countPlayer(function(current){
						return current.isLinked();
					})+1);
					"step 1"
					if(event.cards.length>1){
						player.chooseCardButton('【称好】：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
							if(ui.selected.buttons.length==0) return 1;
							return 0;
						});
					}
					else if(event.cards.length==1){
						event._result={links:event.cards.slice(0),bool:true};
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						for(var i=0;i<result.links.length;i++){
							event.cards.remove(result.links[i]);
						}
						event.togive=result.links.slice(0);
						player.chooseTarget('将'+get.translation(result.links)+'交给一名角色',true).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.enemy){
								return -att;
							}
							else if(att>0){
								return att/(1+target.countCards('h'));
							}
							else{
								return att/100;
							}
						}).set('enemy',get.value(event.togive[0])<0);
					}
					"step 3"
					if(result.targets.length){
						result.targets[0].gain(event.togive,'draw');
						player.line(result.targets[0],'green');
						game.log(result.targets[0],'获得了'+get.cnNumber(event.togive.length)+'张牌');
						event.goto(1);
					}
				},
			},
			"jianjie_faq":{},
			"xinfu_wuniang":{
				trigger:{
					player:["useCard","respond"],
				},
				audio:2,
				direct:true,
				filter:function (event,player){
					return event.card.name=='sha';
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('xinfu_wuniang'),'获得一名其他角色的一张牌，然后其和场上所有的“关索”摸一张牌。',function(card,player,target){
						if(player==target) return false;
						return target.countGainableCards(player,'he')>0;
					}).set('ai',function(target){
						return 10-get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xinfu_wuniang',target);
						player.line(target,'fire');
						event.draws=game.filterPlayer(function(current){
							if(current==target) return true;
							return current.name=='guansuo'||current.name2=='guansuo';
						});
						player.gainPlayerCard(target,'he',true);
					}
					else event.finish();
					'step 2'
					game.asyncDraw(event.draws,1);
					game.delay();
				},
			},
			"xinfu_xushen":{
				derivation:["xinfu_zhennan"],
				audio:2,
				subSkill:{
					count:{
						trigger:{
							player:"recoverBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function (event,player){
							if(!event.card||event.card.name!='tao') return false;
							if(!event.source||event.source.sex!='male') return false;
							if(!player.isDying()) return false;
							if(game.hasPlayer(function(current){
								return current.name=='guansuo'||current.name2=='guansuo';
							})) return false;
							return true;
						},
						content:function (){
							trigger.xinfu_xushen=true;
						},
						sub:true,
					},
				},
				group:["xinfu_xushen_count"],
				trigger:{
					player:"recoverAfter",
				},
				limited:true,
				init:function (player){
					player.storage.xinfu_xushen=false;
				},
				filter:function (event,player){
					if(player.storage.xinfu_xushen) return false;
					if(player.isDying()) return false;
					return event.xinfu_xushen==true;
				},
				direct:true,
				skillAnimation:true,
				animationColor:'fire',
				content:function (){
					"step 0"
					trigger.source.chooseBool('【许身】：是否将自己的一张武将牌替换为“关索”？').set('ai',function(){
						return false;
					});
					"step 1"
					if(result.bool){
						player.awakenSkill('xinfu_xushen');
						player.logSkill('xinfu_xushen',trigger.source);
						if(trigger.source.name2!=undefined){
							trigger.source.chooseControl(trigger.source.name,trigger.source.name2).set('prompt','请选择要更换的武将牌');
						}else event._result={control:trigger.source.name};
					}
					else event.finish();
					"step 2"
					trigger.source.reinit(result.control,'guansuo');
					if(_status.characterlist){
						_status.characterlist.add(result.control);
						_status.characterlist.remove('guansuo');
					}
					player.recover();
					player.addSkill('xinfu_zhennan');
				},
				mark:true,
				intro:{
					content:"limited",
				},
			},
			
			"xinfu_falu":{
				init:function (player,skill){
					if(player.storage[skill]==undefined) player.storage[skill]=4;
					if(player.storage[skill+'_map']==undefined) player.storage[skill+'_map']={
						spade:true,heart:true,diamond:true,club:true,
					};
				},
				mark:true,
				intro:{
					content:function (content,player){
						var storage=player.storage.xinfu_falu_map;
						var str='紫薇：';
						str+=storage.spade?1:0;
						str+='、玉清：';
						str+=storage.heart?1:0;
						str+='、后土：';
						str+=storage.club?1:0;
						str+='、勾陈：';
						str+=storage.diamond?1:0;
						str+='、合计：';
						str+=content;
						return str;
					},
				},
				forced:true,
				audio:2,
				trigger:{
					player:"discardAfter",
				},
				filter:function (event,player){
					for(var i=0;i<event.cards.length;i++){
						if(!player.storage.xinfu_falu_map[get.suit(event.cards[i])]) return true;
					}
					return false;
				},
				content:function (){
					for(var i=0;i<trigger.cards.length;i++){
						player.storage.xinfu_falu_map[get.suit(trigger.cards[i])]=true;
					}
					var num=0;
					for(var i in player.storage.xinfu_falu_map){
						if(player.storage.xinfu_falu_map[i]==true) num++;
					}
					player.storage.xinfu_falu=num;
					player.markSkill('xinfu_falu');
				},
			},
			"xinfu_dianhua":{
				trigger:{
					player:["phaseZhunbeiBegin","phaseJieshuBegin"],
				},
				frequent:true,
				audio:2,
				filter:function (event,player){
					return player.storage.xinfu_falu>0;
				},
				content:function (){
					'step 0'
					var num=player.storage.xinfu_falu;
					player.chooseCardButton(num,true,get.cards(num),'【点化】：按顺将卡牌置于牌堆顶（先选择的在上）').set('ai',function(button){
						return get.value(button.link);
					});
					'step 1'
					if(result.bool){
						var list=result.links.slice(0);
						while(list.length){
							ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
						}
					}
				},
			},
			"xinfu_zhenyi":{
				group:["zhenyi_spade","zhenyi_club","zhenyi_heart"],
				trigger:{
					player:"damageEnd",
				},
				audio:2,
				filter:function (event,player){
					if(!event.nature) return false;
					return player.storage.xinfu_falu_map.diamond;
				},
				prompt2:'弃置“勾陈”标记，从牌堆中获得每种类型的牌各一张。',
				content:function (){
					'step 0'
					player.storage.xinfu_falu_map.diamond=false;
					var num=0;
					for(var i in player.storage.xinfu_falu_map){
						if(player.storage.xinfu_falu_map[i]==true) num++;
					}
					player.storage.xinfu_falu=num;
					player.markSkill('xinfu_falu');
					event.num=0;
					event.togain=[];
					'step 1'
					var card=get.cardPile(function(card){
						for(var i=0;i<event.togain.length;i++){
							if(get.type(card,'trick')==get.type(event.togain[i],'trick')) return false;
						}
						return true;
					});
					if(card){
						event.togain.push(card);
						event.num++;
						if(event.num<3) event.redo();
					}
					'step 2'
					if(event.togain.length){
						player.gain(event.togain,'gain2');
					}
				},
			},
			"zhenyi_spade":{
				subSkill:{
					red:{
						mod:{
							suit:function (card,suit){
								return 'heart';
							},
						},
						sub:true,
					},
					black:{
						mod:{
							suit:function (card,suit){
								return 'spade';
							},
						},
						sub:true,
					},
				},
				trigger:{
					global:"judge",
				},
				direct:true,
				filter:function (event,player){
					return player.storage.xinfu_falu_map.spade==true;
				},
				content:function (){
					"step 0"
					var str=get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，是否发动【真仪】，弃置“紫薇”标记并修改判定结果？';
					player.chooseControl('黑桃5','红桃5','取消').set('prompt',str).set('ai',function(){
						//return '取消';
						var judging=_status.event.judging;
						var cards={name:judging.name,suit:"spade",number:5};
						var cardh={name:judging.name,suit:"heart",number:5};
						var results=trigger.judge(cards)-trigger.judge(judging);
						var resulth=trigger.judge(cardh)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||(resulth==0&&results==0)) return '取消';
						if(attitude>0){
							if(results>0){
								if(resulth>results) return '红桃5';
								return '黑桃5';
							}
							else if(resulth>0) return '红桃5';
							return '取消';
						}
						else{
							if(results<0){
								if(resulth<results) return '红桃5';
								return '黑桃5';
							}
							else if(resulth<0) return '红桃5';
							return '取消';
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(['黑桃5','红桃5'].contains(result.control)){
						player.storage.xinfu_falu_map.spade=false;
						var num=0;
						for(var i in player.storage.xinfu_falu_map){
							if(player.storage.xinfu_falu_map[i]==true) num++;
						}
						player.storage.xinfu_falu=num;
						player.markSkill('xinfu_falu');
						player.logSkill('xinfu_zhenyi',trigger.player);
						player.line(trigger.player);
						player.popup(result.control);
						game.log(player,'将判定结果改为了','#y'+result.control);
						trigger.fixedResult={
							suit:result.control=='黑桃5'?'spade':'heart',
							color:result.control=='黑桃5'?'black':'red',
							number:5,
						};
					}
					else{
						event.finish();
					}
				},
				ai:{
					tag:{
						rejudge:1,
					},
				},
			},
			"zhenyi_club":{
				log:false,
				enable:"chooseToUse",
				filter:function (event,player){
					if(!player.isDying()) return false;
					return player.storage.xinfu_falu_map.club;
				},
				filterCard:true,
				position:"h",
				viewAs:{
					name:"tao",
				},
				prompt:"弃置“后土”标记将一张手牌当桃使用",
				check:function (card){return 15-get.value(card)},
				precontent:function (){
					player.logSkill('xinfu_zhenyi');
					player.storage.xinfu_falu_map.club=false;
					var num=0;
					for(var i in player.storage.xinfu_falu_map){
						if(player.storage.xinfu_falu_map[i]==true) num++;
					}
					player.storage.xinfu_falu=num;
					player.markSkill('xinfu_falu');
				},
				ai:{
					skillTagFilter:function (player){
						if(!player.isDying()) return false;
						return player.storage.xinfu_falu_map.club;
					},
					save:true,
					respondTao:true,
				},
			},
			"zhenyi_heart":{
				trigger:{
					source:"damageBegin1",
				},
				filter:function (event,player){
					return event.source&&player.storage.xinfu_falu_map.heart;
				},
				check:function (event,player){
					return false;
				},
				prompt2:function(event){
					return '弃置“玉清”标记，然后进行判定。若结果为黑色，则对'+get.translation(event.player)+'即将造成的伤害+1。';
				},
				logTarget:"player",
				content:function (){
						"step 0"
						player.storage.xinfu_falu_map.heart=false;
						var num=0;
						for(var i in player.storage.xinfu_falu_map){
							if(player.storage.xinfu_falu_map[i]==true) num++;
						}
						player.storage.xinfu_falu=num;
						player.markSkill('xinfu_falu');
						player.judge(function(card){
							if(get.color(card)=='black') return 4;
							return -1;
						});
						"step 1"
						if(result.bool==true){
							trigger.num++;
						}
					},
			},
			"xinfu_zhennan":{
				audio:2,
				trigger:{
					target:"useCardToTargeted",
				},
				filter:function (event,player){
					return event.card.name=='nanman';
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt('xinfu_zhennan'),'对一名其他角色造成1-3点随机伤害',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					"step 1"
					if(result.bool&&result.targets&&result.targets.length){
						game.delay();
						player.logSkill('xinfu_zhennan',result.targets);
						var num=[1,2,3,1,1,2].randomGet();
						if(get.isLuckyStar()) num=3;
						player.line(result.targets[0],'fire');
						result.targets[0].damage(num);
					}
				},
			},
			"xinfu_yanyu":{
				trigger:{
					global:"phaseUseBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he')>0;
				},
				content:function (){
					'step 0'
					player.chooseToDiscard(get.prompt('xinfu_yanyu'),get.translation('xinfu_yanyu_info'),'he').set('ai',function(card){
						return 5-get.value(card);
					}).set('logSkill','xinfu_yanyu');
					'step 1'
					if(result.bool){
						player.storage.xinfu_yanyu=get.type(result.cards[0],'trick');
						player.addTempSkill('xinfu_yanyu2','phaseUseAfter');
					}
				},
			},
			"xinfu_yanyu2":{
				init:function (player,skill){
					player.storage[skill]=0;
				},
				onremove:function (player,skill){
					delete player.storage.xinfu_yanyu;
					delete player.storage.xinfu_yanyu2;
				},
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
				},
				direct:true,
				filter:function (event,player){
					if(player.storage.xinfu_yanyu2>=3) return false;
					var evt=event.getParent();
					if(evt&&(evt.name=='useCard'||evt.name=='respond')) return false;
					var type=player.storage.xinfu_yanyu;
					var cards=event.cards;
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i],'trick')==type&&get.position(cards[i],true)=='d') return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					event.logged=false;
					event.cards=[];
					var type=player.storage.xinfu_yanyu;
					var cards=trigger.cards;
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i],'trick')==type&&get.position(cards[i],true)=='d') event.cards.push(cards[i]);
					}
					'step 1'
					if(player.storage.xinfu_yanyu2>=3) event.finish();
					else player.chooseCardButton(event.cards,'【燕语】：是否将其中的一张牌交给一名角色？').ai=function(card){
						if(card.name=='du') return 10;
						return get.value(card);
					};
					'step 2'
					if(result.bool){
						player.storage.xinfu_yanyu2++;
						if(!event.logged){
							player.logSkill('xinfu_yanyu');
							event.logged=true;
						}
						event.togain=result.links[0];
						event.cards.remove(event.togain);
						player.chooseTarget(true,'请选择要获得'+get.translation(event.togain)+'的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du) return -att;
							return att;
						}).set('du',event.togain.name=='du');
					}
					else event.finish();
					'step 3'
					var target=result.targets[0];
					player.line(target,'green');
					target.gain(event.togain,'gain2');
					if(event.cards.length) event.goto(1);
				},
			},
			"xinfu_xiaode":{
				subSkill:{
					remove:{
						unique:true,
						charlotte:true,
						trigger:{
							player:"phaseAfter",
						},
						forced:true,
						popup:false,
						content:function (){
							player.removeAdditionalSkill('xinfu_xiaode');
							player.removeSkill('xinfu_xiaode_remove');
						},
					},
				},
				trigger:{
					global:"dieAfter",
				},
				direct:true,
				filter:function (skill,event){
					return !event.hasSkill('xinfu_xiaode_remove');
				},
				content:function (){
					'step 0'
					var list=[];
					var listm=[];
					var listv=[];
					if(trigger.player.name1!=undefined) listm=lib.character[trigger.player.name1][3];
					else listm=lib.character[trigger.player.name][3];
					if(trigger.player.name2!=undefined) listv=lib.character[trigger.player.name2][3];
					listm=listm.concat(listv);
					var func=function(skill){
						var info=get.info(skill);
						if(info.charlotte||info.zhuSkill||(info.unique&&!info.limited)) return false;
						return true;
					};
					for(var i=0;i<listm.length;i++){
						if(func(listm[i])) list.add(listm[i]);
					}
					if(list.length){
						player.chooseControl(list,'cancel2').set('prompt',get.prompt('xinfu_xiaode')).set('prompt2',get.translation('xinfu_xiaode_info')).set('ai',function(){
							return list.randomGet();
						});
					}
					else event.finish();
					'step 1'
					if(result.control&&result.control!='cancel2'){
						player.logSkill('xinfu_xiaode');
						player.popup(result.control,'thunder');
						game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】');
						player.addAdditionalSkill('xinfu_xiaode',[result.control]);
						player.addSkill('xinfu_xiaode_remove');
					}
				},
			},
			"xinfu_guolun":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filter:function (event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function (card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function (){
					'step 0'
					event.cardt=target.getCards('h').randomGet();
					target.showCards(event.cardt);
					player.chooseCard('he').ai=function(card){
						var numt=event.cardt.number;
						var att=get.attitude(player,target);
						var value=get.value(event.cardt);
						if(card.number<numt||att>2) return value+6-get.value(card);
						else if(card.number==numt) return value-get.value(card);
						return -1;
					};
					'step 1'
					if(!result.bool) event.finish();
					else{
						player.showCards(result.cards);
						event.cardp=result.cards;
					}
					'step 2'
					player.give(event.cardp,target);
					target.give(event.cardt,player);
					'step 3'
					var nump=event.cardp[0].number;
					var numt=event.cardt.number;
					if(nump<numt){
						player.draw();
					}
					else if(nump>numt){
						target.draw();
					}
				},
				ai:{
					order:8,
					result:{
						player:function (player,target){
							if(get.attitude(player,target)>0) return 1.5;
							return 0.5;
						},
					},
				},
			},
			"xinfu_zhanji":{
				audio:2,
				trigger:{
					player:"gainAfter",
				},
				forced:true,
				filter:function (event,player){
					if(!player.isPhaseUsing()) return false;
					return event.getParent().name=='draw'&&event.getParent(2).name!='xinfu_zhanji';
				},
				content:function (){
					player.draw('nodelay');
				},
			},
			"xinfu_songsang":{
				limited:true,
				unique:true,
				init:function (player){
					player.storage.xinfu_songsang=false;
				},
				skillAnimation:true,
				animationColor:'wood',
				audio:2,
				derivation:"xinfu_zhanji",
				trigger:{
					global:"dieAfter",
				},
				filter:function (event,player){
					if(player.storage.xinfu_songsang==true) return false;
					return true;
				},
				content:function (){
					player.awakenSkill('xinfu_songsang');
					if(player.isDamaged()){
						player.recover();
					}
					else player.gainMaxHp();
					player.addSkill('xinfu_zhanji');
					player.storage.xinfu_songsang=true;
				},
				mark:true,
				intro:{
					content:"limited",
				},
			},
			"xinfu_jixu":{
				audio:2,
				enable:"phaseUse",
				usable:1,
				filter:function (event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function (card,player,target){
					if(player==target) return false;
					if(ui.selected.targets.length){
						return target.hp==ui.selected.targets[0].hp;
					}
					return true;
				},
				selectTarget:[1,Infinity],
				multitarget:true,
				multiline:true,
				content:function (){
					"step 0"
					targets.sort(lib.sort.seat);
					"step 1"
					if(!event.num) event.num=0;
					if(!event.caicuolist) event.caicuolist=[];
					targets[event.num].chooseBool("是否押杀？").ai=function(event,player){
						var evt=_status.event.getParent();
						if(get.attitude(targets[event.num],evt.player)>0) return evt.player.countCards('h','sha')?false:true;
						return Math.random()<0.5;
					};
					"step 2"
					if(result.bool){
						targets[event.num].chat('有杀');
						game.log(targets[event.num],'认为',player,'#g有杀');
						if(!player.countCards('h','sha')) event.caicuolist.add(targets[event.num]);
					}else{
						targets[event.num].chat('没杀');
						game.log(targets[event.num],'认为',player,'#y没有杀');
						if(player.countCards('h','sha')) event.caicuolist.add(targets[event.num]);
					}
					event.num++;
					game.delay();
					if(event.num<targets.length) event.goto(1);
					"step 3"
					player.popup(player.countCards('h','sha')?"有杀":"没杀");
					game.log(player,player.countCards('h','sha')?"有杀":"没杀");
					if(event.caicuolist.length==0){
						var evt=_status.event.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'){
							evt.skipped=true;
							event.finish();
						}
					}
					else{
						player.draw(event.caicuolist.length)
						if(player.countCards('h','sha')){
							player.addTempSkill('jixu_sha');
							player.storage.jixu_sha=event.caicuolist;
							event.finish();
						}
						else event.num=0;
					}
					"step 4"
					if(event.num<event.caicuolist.length){
						var target=event.caicuolist[event.num];
						player.discardPlayerCard(true,'he',target);
						event.num++;
						event.redo();
					}
				},
				ai:{
					order:function (){
						return get.order({name:'sha'})+0.1;
					},
					result:{
						target:function (player,target){
							var raweffect=function(player,target){
							if(player.countCards('h','sha')){
								return get.effect(target,{name:'sha'},player,target);
							}else{
							var att=get.attitude(player,target);
							var nh=target.countCards('h');
							if(att>0){
								if(target.getEquip('baiyin')&&target.isDamaged()&&
									get.recoverEffect(target,player,player)>0){
									if(target.hp==1&&!target.hujia) return 1.6;
									if(target.hp==2) return 0.01;
									return 0;
								}
							}
							var es=target.getCards('e');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.length==1&&es[0].name=='baiyin'&&target.isDamaged());
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&(noe||noe2)) return 0;
							if(att<=0&&!target.countCards('he')) return 1.5;
							return -1.5;
							}
							}
							var num=game.countPlayer(function(current){
								return current!=player&&current.hp==target.hp&&(raweffect(player,current)*get.attitude(player,current))>0
							});
							return raweffect(player,target)*Math.max(0,num-1);
						},
					},
					expose:0.4,
					threaten:3,
				},
			},
			"jixu_sha":{
				audio:"xinfu_jixu",
				trigger:{
					player:"useCard",
				},
				onremove:function (player){
					delete player.storage.jixu_sha;
				},
				filter:function (event,player){
					if(event.card.name=='sha'){
						return game.hasPlayer(function(current){
							return current!=player&&player.storage.jixu_sha.contains(current)&&!event.targets.contains(current);
						});
					}
					return false;
				},
				forced:true,
				silent:true,
				popup:false,
				content:function (){
					player.logSkill("xinfu_jixu");
					for(var i=0;i<player.storage.jixu_sha.length;i++){
						if(!trigger.targets.contains(player.storage.jixu_sha[i])&&player.canUse('sha',player.storage.jixu_sha[i],false)){
							player.line(player.storage.jixu_sha[i],trigger.card.nature);
							trigger.targets.push(player.storage.jixu_sha[i]);
						}
					}
				},
			},
			"xinfu_sanwen":{
				audio:2,
				usable:1,
				trigger:{
					player:"gainAfter",
				},
				filter:function (event,player){
					var namelist=[];
					var namedlist=[];
					for(var i=0;i<event.cards.length;i++){
						namelist.add(get.name(event.cards[i]));
					}
					var hs=player.getCards('h');
					for(var j=0;j<hs.length;j++){
						if(namelist.contains(get.name(hs[j]))&&!event.cards.contains(hs[j])) return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					var namelist=[];
					var namedlist=[];
					var nameddlist=[];
					var namedddlist=[];
					for(var i=0;i<trigger.cards.length;i++){
						namelist.add(get.name(trigger.cards[i]));
					}
					var hs=player.getCards('h');
					for(var j=0;j<hs.length;j++){
						if(namelist.contains(get.name(hs[j]))&&!trigger.cards.contains(hs[j])){
							namedlist.push(hs[j]);
							namedddlist.add(get.name(hs[j]));
						}
					}
					for(var k=0;k<trigger.cards.length;k++){
						if(namedddlist.contains(get.name(trigger.cards[k]))) nameddlist.push(trigger.cards[k]);
					}
					var showlist=namedlist.concat(nameddlist);
					player.showCards(showlist);
					player.discard(nameddlist);
					player.draw(2*nameddlist.length);
				},
			},
			"xinfu_qiai":{
				unique:true,
				init:function (player){
					player.storage.xinfu_qiai=false;
				},
				filter:function (event,player){
					return player.storage.xinfu_qiai==false;
				},
				skillAnimation:true,
				animationColor:'gray',
				trigger:{
					player:"dying",
				},
				limited:true,
				marktext:"哀",
				mark:true,
				intro:{
					content:"limited",
				},
				//priority:6,
				audio:2,
				content:function (){
					"step 0"
					player.awakenSkill('xinfu_qiai');
					player.storage.xinfu_qiai=true;
					event.current=player.next;
					"step 1"
					if(!event.current.countCards('he')) event.goto(3);
					else event.current.chooseCard('交给'+get.translation(player)+'一张牌','he',true).set('ai',function(card){
						var evt=_status.event.getParent();
						if(get.attitude(_status.event.player,evt.player)>2){
							if(card.name=='jiu') return 120;
							if(card.name=='tao') return 110;
						}
						return 100-get.value(card);
					});
					"step 2"
					if(result.bool&&result.cards&&result.cards.length){
						player.gain(result.cards,event.current,'giveAuto');
					}
					"step 3"
					event.current=event.current.next;
					if(event.current!=player) event.goto(1);
				},
				ai:{
					threaten:1.4,
				},
			},
			"xinfu_denglou":{
				unique:true,
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				limited:true,
				init:function (player){
					player.storage.xinfu_denglou=false;
				},
				filter:function (event,player){
					if(player.countCards('h')) return false;
					return player.storage.xinfu_denglou==false;
				},
				skillAnimation:true,
				animationColor:'gray',
				marktext:"登",
				mark:true,
				intro:{
					content:"limited",
				},
				content:function (){
					"step 0"
					player.awakenSkill('xinfu_denglou');
					player.storage.xinfu_denglou=true;
					event.cards=get.cards(4);
					event.gains=[]
					event.discards=[]
					var content=['牌堆顶的四张牌',event.cards];
					game.log(player,'观看了','#y牌堆顶的四张牌');
					player.chooseControl('ok').set('dialog',content);
					"step 1"
					if(get.type(event.cards[0])!="basic"){
						event.gains.push(event.cards[0]);
						event.cards.remove(event.cards[0]);
					}
					else{
						var bool=game.hasPlayer(function(current){
							return player.canUse(event.cards[0],current);
						});
						if(bool){
							player.chooseUseTarget(event.cards[0],true,false);
						}
						else event.discards.push(event.cards[0]);
						event.cards.remove(event.cards[0]);
					}
					"step 2"
					if(event.cards.length) event.goto(1);
					else{
						if(event.gains.length) player.gain(event.gains,'gain2');
						if(event.discards.length){
							player.$throw(event.discards);
							game.cardsDiscard(event.discards);
						}
					}
				},
			},
			"qinguo_use":{
				audio:2,
				trigger:{
					player:"equipEnd",
				},
				filter:function (event,player){
					if(!event.swapped&&player.countCards('e')==player.hp&&player.isDamaged()){
						return true;
					};
					return false;
				},
				frequent:true,
				content:function (){
					player.recover();
				},
				ai:{
					reverseEquip:true,
					effect:{
						target:function (card,player,target,current){
							if(get.type(card)=='equip'&&player==target&&player==_status.currentPhase) return [1,3];
						},
					},
				},
			},
			"xinfu_qinguo":{
				group:["qinguo_use","qinguo_lose"],
				audio:2,
				trigger:{
					player:"useCardAfter",
				},
				filter:function (event,player){
					return get.type(event.card)=='equip';
				},
				direct:true,
				content:function (){
					player.chooseUseTarget({name:'sha'},get.prompt('xinfu_qinguo'),'视为使用一张【杀】',false).logSkill='qinguo_use';
				},
			},
			"qinguo_lose":{
				audio:2,
				trigger:{
					player:"loseEnd",
				},
				filter:function (event,player){
					if(event.getParent().name=='equip') return false;
					if(player.hp!=player.countCards('e')||!player.isDamaged()) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
					return false;
				},
				frequent:true,
				content:function (){
					player.recover();
				},
			},
			"xinfu_jijun":{
				ai:{
					reverseEquip:true,
					effect:{
						target:function (card,player,target,current){
							if(get.type(card)=='equip'&&player==target&&player==_status.currentPhase&&get.subtype(card)=='equip1') return [1,3];
						},
					},
				},
				audio:2,
				trigger:{
					player:"useCardToPlayered",
				},
				frequent:true,
				filter:function (event,player){
					if(player!=_status.currentPhase) return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(get.type(event.card)=='equip'&&get.subtype(event.card)!='equip1') return false;
					if(event.targets.contains(player)) return true;
					return false;
				},
				callback:function(){
						game.cardsGotoSpecial(card);
						player.storage.xinfu_jijun.push(card);
						var node=event.judgeResult.node;
						node.moveDelete(player);
						game.broadcast(function(cardid,player){
							var node=lib.cardOL[cardid];
							if(node){
								node.moveDelete(player);
							}
						},node.cardid,player);
						game.addVideo('gain2',player,get.cardsInfo([node]));
						player.markSkill('xinfu_jijun');
						game.addVideo('storage',player,['xinfu_jijun',get.cardsInfo(player.storage.xinfu_jijun),'cards']);
						//event.trigger("addCardToStorage");
				},
				content:function (){
					player.judge(function(card){
						return 1;
					}).callback=lib.skill.xinfu_jijun.callback;
				},
				init:function (player){
					player.storage.xinfu_jijun=[];
				},
				intro:{
					content:'cards',
					mark:function (dialog,content,player){
						if(content&&content.length){
							dialog.addAuto(content);
							if(player==game.me||player.isUnderControl()){
								var list=lib.skill.xinfu_fangtong.getAuto(player);
								if(list.length>0){
									dialog.addText('<li>推荐方案：'+get.translation(list));
								}
							}
						}
					},
				},
				marktext:"方",
			},
			"xinfu_fangtong":{
				getAuto:function (player){
					var hs=player.getCards('he');
					var ss=player.storage.xinfu_jijun;
					var bool=false;
					for(var i=0;i<hs.length;i++){
						var num=36-hs[i].number;
						for(var j=0;j<ss.length;j++){
							if(ss[j]==num){var k=-1;bool=true;break}
							for(var k=j+1;k<ss.length;k++){
								if(ss[j].number+ss[k].number==num){var l=-1;bool=true;break}
								for(var l=k+1;l<ss.length;l++){
									if(ss[j].number+ss[k].number+ss[l].number==num){var m=-1;bool=true;break}
									for(var m=l+1;m<ss.length;m++){
										if(ss[j].number+ss[k].number+ss[l].number+ss[m].number==num){var n=-1;bool=true;break}
										for(var n=m+1;n<ss.length;n++){
											if(ss[j].number+ss[k].number+ss[l].number+ss[m].number+ss[n].number==num){var o=-1;bool=true;break}
											for(var o=n+1;o<ss.length;o++){
												if(ss[j].number+ss[k].number+ss[l].number+ss[m].number+ss[n].number+ss[o].number==num){var p=-1;bool=true;break}
												for(var p=o+1;p<ss.length;p++){
													if(ss[j].number+ss[k].number+ss[l].number+ss[m].number+ss[n].number+ss[o].number+ss[p].number==num){bool=true;break}
												}
												if(bool) break;
											}
											if(bool) break;
										}
										if(bool) break;
									}
									if(bool) break;
								}
								if(bool) break;
							}
							if(bool) break;
						}
						if(bool) break;
					}
					if(!bool) return [];
					var list=[i,j,k,l,m,n,o,p];
					for(var q=0;q<list.length;q++){
						if(list[q]==-1){
							list=list.slice(0,q);
							break;
						}
						else if(q==0){
							list[q]=hs[i];
						}
						else list[q]=ss[list[q]];
					}
					return list;
				},
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				filter:function (event,player){
					return player.countCards('he')&&player.storage.xinfu_jijun.length;
				},
				direct:true,
				skillAnimation:true,
				animationColor:'metal',
				content:function (){
					'step 0'
					var info=['是否发动【方统】？'];
					if(player.storage.xinfu_jijun){
						info.push('<div class="text center">'+get.translation(player)+'的“方”</div>');
						info.push(player.storage.xinfu_jijun);
					}
					if(player.countCards('h')){
						info.push('<div class="text center">'+get.translation(player)+'的手牌区</div>');
						info.push(player.getCards('h'));
					}
					if(player.countCards('e')){
						info.push('<div class="text center">'+get.translation(player)+'的装备区</div>');
						info.push(player.getCards('e'));
					}
					var next=player.chooseButton();
					next.set('createDialog',info);
					next.set('selectButton',function (){
						var num=0;
						for(var i=0;i<ui.selected.buttons.length;i++){
							num+=get.number(ui.selected.buttons[i]);
						}
						if(num==36) return ui.selected.buttons.length;
						return ui.selected.buttons.length+2;
					});
					next.set('filterButton',function(button){
						var player=_status.event.player;
						if(ui.selected.buttons.length){
							if(!player.storage.xinfu_jijun.contains(button.link)) return false;
						}
						else if(player.storage.xinfu_jijun.contains(button.link)) return false;
						var num=0;
						for(var i=0;i<ui.selected.buttons.length;i++){
							num+=get.number(ui.selected.buttons[i]);
						}
						return get.number(button.link)+num<=36;
					});
					next.set('autolist',lib.skill.xinfu_fangtong.getAuto(player));
					next.set('processAI',function(){
						if(_status.event.autolist&&_status.event.autolist.length>0){
							return {
								bool:true,
								links:_status.event.autolist,
							}
						}
					});
					'step 1'
					if(result.bool){
						player.logSkill('xinfu_fangtong');
						var tothrow=[];
						var cards=result.links.slice(0);
						for(var i=0;i<cards.length;i++){
							if(player.storage.xinfu_jijun.contains(cards[i])){
								player.storage.xinfu_jijun.remove(cards[i]);
								tothrow.push(cards[i]);
							}else{
								player.discard(cards[i]);
							}
						}
						player.$throw(tothrow);
						player.chooseTarget('选择一个目标并对其造成3点雷电伤害',true,function(card,player,target){
							return target!=player;
						}).set('ai',function(target){
							return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
						});
					}
					else{
						event.finish();
					}
					'step 2'
					var target=result.targets[0];
					player.line(target,'thunder');
					target.damage(3,'thunder');
				},
			},
			"xinfu_weilu":{
				audio:2,
				trigger:{
					player:"damageEnd",
				},
				filter:function (event,player){
					return (event.source!=undefined&&!event.source.hasSkill('weilu_effect'));
				},
				check:function (event,player){
					return (get.attitude(player,event.source)<=0);
				},
				forced:true,
				logTarget:"source",
				content:function (){
					trigger.source.storage.weilu_effect=player;
					trigger.source.addTempSkill('weilu_effect',{player:"dieAfter",});
					trigger.source.addTempSkill('weilu_effect_phase');
				},
				ai:{
					"maixie_defend":true,
					effect:{
						target:function (card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						},
					},
				},
			},
			"weilu_effect":{
				group:["weilu_effect_clear"],
				subSkill:{
					clear:{
						sub:true,
						trigger:{
							global:"phaseAfter",
						},
						filter:function (event,player){
							if(player.hasSkill('weilu_effect_phase')) return false;
							return event.player.hasSkill('xinfu_weilu');
						},
						silent:true,
						forced:true,
						popup:false,
						content:function (){
							player.removeSkill('weilu_effect');
						},
					},
					phase:{
						sub:true,
					},
				},
				mark:"character",
				onremove:true,
				intro:{
					content:"$的下个回合的出牌阶段开始时，失去体力至1点。",
				},
				trigger:{
					global:"phaseUseBegin",
				},
				filter:function (event,player){
					if(player.hasSkill('weilu_effect_phase')) return false;
					return event.player==player.storage.weilu_effect;
				},
				silent:true,
				forced:true,
				popup:false,
				content:function (){
					if(player.hp>1){
						trigger.player.logSkill('xinfu_weilu');
						trigger.player.line(player);
						var num=player.hp-1;
						player.storage.weilu_hp=num;
						player.loseHp(num);
						player.addSkill('weilu_effect2');
					}
					player.removeSkill('weilu_effect');
				},
			},
			"weilu_effect2":{
				trigger:{
					global:"phaseUseEnd",
				},
				silent:true,
				forced:true,
				popup:false,
				content:function (){
					if(player.storage.weilu_hp){
						trigger.player.logSkill('xinfu_weilu');
						trigger.player.line(player);
						player.recover(player.storage.weilu_hp);
					}
					player.removeSkill('weilu_effect2');
				},
			},
			"xinfu_zengdao":{
				audio:2,
				init:function (player){
					player.storage.xinfu_zengdao=false;
				},
				limited:true,
				unique:true,
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return player!=target;
				},
				filter:function (event,player){
					if(player.storage.xinfu_zengdao==true) return false;
					return player.countCards('e')>0;
				},
				skillAnimation:true,
				animationColor:'thunder',
				position:"e",
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				lose:true,
				content:function (){
					player.awakenSkill('xinfu_zengdao');
					player.$give(cards,target);
					target.storage.xinfu_zengdao2=cards;
					target.addSkill('xinfu_zengdao2');
				},
				ai:{
					order:1,
					result:{
						target:0,
					},
				},
				mark:true,
				intro:{
					content:"limited",
				},
			},
			"xinfu_zengdao2":{
				trigger:{
					source:"damageBegin1",
				},
				audio:"xinfu_zengdao",
				forced:true,
				content:function (){
					'step 0'
					player.chooseCardButton('将一张“刀”置入弃牌堆',player.storage.xinfu_zengdao2,true);
					'step 1'
					if(result.bool){
						player.$throw(result.links);
						var card=result.links[0];
						game.cardsDiscard(card);
						player.storage.xinfu_zengdao2.remove(card);
						player.syncStorage('xinfu_zengdao2');
						player.updateMarks('xinfu_zengdao2');
					}
					if(player.storage.xinfu_zengdao2.length==0){
						player.removeSkill('xinfu_zengdao2');
					}
					trigger.num++;
				},
				mark:true,
				marktext:"刀",
				intro:{
					content:"cards",
				},
			},
			"xinfu_guanwei":{
				audio:2,
				usable:1,
				trigger:{
					global:"phaseUseEnd",
				},
				init:function (player){
					player.storage.guanwei={num:0,suit:[]};
				},
				filter:function (event,player){
					if(player.storage.guanwei&&player.storage.guanwei.suit.length==1&&player.storage.guanwei.num>1) return true;
					return false;
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseToDiscard('he',get.prompt2('xinfu_guanwei')).set('ai',function(card){
						if(get.attitude(_status.event.player,_status.currentPhase)<1) return 0;
						return 9-get.value(card);
					}).set('logSkill','xinfu_guanwei');
					'step 1'
					if(result.bool){
						player.line(trigger.player,'green');
						trigger.player.draw(2);
					}else{
						event.finish();
					}
					'step 2'
					var stat=trigger.player.getStat();
					stat.card={};
					for(var i in stat.skill){
						var bool=false;
						var info=lib.skill[i];
						if(info.enable!=undefined){
							if(typeof info.enable=='string'&&info.enable=='phaseUse') bool=true;
							else if(typeof info.enable=='object'&&info.enable.contains('phaseUse')) bool=true;
						}
						if(bool) stat.skill[i]=0;
					}
					'step 3'
					trigger.player.phaseUse();
				},
				group:["xinfu_guanwei_count","xinfu_guanwei_clear"],
				subSkill:{
					count:{
						trigger:{
							global:"useCard",
						},
						filter:function (event,player){
							return event.player.isPhaseUsing();
						},
						silent:true,
						content:function (){
							if(!player.storage.guanwei.suit.contains(get.suit(trigger.card))){
								player.storage.guanwei.suit.push(get.suit(trigger.card));
							}
							player.storage.guanwei.num++;
						},
						sub:true,
						forced:true,
						popup:false,
					},
					clear:{
						trigger:{
							global:"phaseAfter",
						},
						silent:true,
						content:function (){
							player.storage.guanwei={num:0,suit:[]};
						},
						sub:true,
						forced:true,
						popup:false,
					},
				},
			},
			"xinfu_gongqing":{
				audio:true,
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				filter:function (event,player){
					if(!event.source) return false;
					var range=event.source.getAttackRange();
					if(range==3) return false;
					if(range<3&&event.num<=1) return false;
					return true;
				},
				//priority:-9.5,
				content:function (){
					trigger.num=trigger.source.getAttackRange()<3?1:trigger.num+1;
				},
			},
			"xinfu_andong":{
				subSkill:{
					add:{
						sub:true,
						mod:{
							ignoredHandcard:function (card,player){
					if(get.suit(card)=='heart'){
						return true;
					}
				},
							cardDiscardable:function (card,player,name){
					if(name=='phaseDiscard'&&get.suit(card)=='heart') return false;
				},
						},
					},
				},
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				filter:function (event,player){
					return (event.source&&event.source.countCards('h'));
				},
				logTarget:"source",
				content:function (){
					"step 0"
					trigger.source.chooseControlList(
						['令'+get.translation(player)+'观看你的手牌，并获得其中所有的红桃牌。',
						'防止即将对'+get.translation(player)+'造成的伤害，并使自己本回合内的红桃手牌不计入手牌上限。'],
						true).set('ai',function(event,player){
						var target=_status.event.getParent().player;
						var player=_status.event.player;
						if(get.attitude(player,target)>0) return 1;
						return 0;
					});
					"step 1"
					if(result.index==1){
						trigger.cancel();
						trigger.source.addTempSkill('xinfu_andong_add');
						event.finish();
					}else{
						player.viewHandcards(trigger.source);
					}
					"step 2"
					var cards=trigger.source.getCards('h');
					var togain=[]
					for(var i=0;i<cards.length;i++){
						if(get.suit(cards[i])=='heart') togain.push(cards[i]);
					}
					if(togain.length) trigger.source.give(togain,player);
				},
			},
			"xinfu_yingshi":{
				audio:2,
				group:["yingshi_die"],
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he',{suit:'heart'})>0&&!game.hasPlayer(function(current){
						return current.hasSkill('yingshi_heart');
					});
				},
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('xinfu_yingshi'),function(card,player,target){
						return target!=player;
					}).set('ai',function(){
						return -1;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he');
						var togain=[]
						for(var i=0;i<cards.length;i++){
							if(get.suit(cards[i])=='heart') togain.push(cards[i]);
						}
						player.logSkill('xinfu_yingshi',result.targets);
						player.lose(togain,ui.special,'toStorage');
						player.$give(togain,result.targets[0]);
						result.targets[0].storage.yingshi_heart=togain;
						result.targets[0].addSkill('yingshi_heart');
					}
					else{
						event.finish();
					}
				},
			},
			"yingshi_heart":{
				marktext:"酬",
				trigger:{
					player:"damageEnd",
				},
				filter:function (event,player){
					return event.source!=undefined&&event.card&&event.card.name=='sha';
				},
				forced:true,
				content:function (){
					'step 0'
					trigger.source.chooseCardButton('选择要获得的牌',player.storage.yingshi_heart,true);
					'step 1'
					if(result.bool){
						player.$give(result.links,trigger.source);
						trigger.source.gain(result.links,'fromStorage');
						player.storage.yingshi_heart.remove(result.links[0]);
						player.syncStorage('yingshi_heart');
						player.updateMarks('yingshi_heart');
					}
					if(player.storage.yingshi_heart.length==0){
						delete player.storage.yingshi_heart;
						player.removeSkill('yingshi_heart');
					}
				},
				mark:true,
				intro:{
					content:"cards",
				},
			},
			"yingshi_die":{
				forced:true,
				silent:true,
				popup:false,
				trigger:{
					global:"dieBegin",
				},
				filter:function (event,player){
					return event.player.storage.yingshi_heart&&event.player.storage.yingshi_heart.length;
				},
				content:function (){
					player.logSkill('xinfu_yingshi');
					trigger.player.$give(trigger.player.storage.yingshi_heart,player);
					player.gain(trigger.player.storage.yingshi_heart);
					trigger.player.removeSkill('yingshi_heart');
					delete trigger.player.storage.yingshi_heart;
				},
			},
			"xinfu_duanfa":{
				init:function (player){
					player.storage.xinfu_duanfa=0;
				},
				audio:2,
				enable:"phaseUse",
				position:"he",
				filter:function (card,player){
					return player.storage.xinfu_duanfa<player.maxHp;
				},
				filterCard:function (card){
					return get.color(card)=='black';
				},
				selectCard:function (){
					var player=_status.event.player;
					return [1,player.maxHp-player.storage.xinfu_duanfa];
				},
				check:function (card){
					return 6-get.value(card)
				},
				delay:0,
				content:function (){
					player.draw(cards.length);
					player.storage.xinfu_duanfa+=cards.length;
				},
				group:"xinfu_duanfa_clear",
				subSkill:{
					clear:{
						trigger:{
							player:"phaseBefore",
						},
						forced:true,
						silent:true,
						popup:false,
						content:function (){
							player.storage.xinfu_duanfa=0;
						},
						sub:true,
					},
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			"xinfu_youdi":{
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('h')>0;
				},
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt2('xinfu_youdi'),function(card,player,target){
						return player!=target;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(player.countCards('h','sha')>player.countCards('h')/3&&player.countCards('h',{color:'red'})>player.countCards('h')/2) return 0;
						if(target.countCards('he')==0) return 0.1;
						return -get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.bool){
						game.delay();
						player.logSkill('xinfu_youdi',result.targets);
						event.target=result.targets[0];
						event.target.discardPlayerCard(player,'h',true);
					}
					else{
						event.finish();
					}
					"step 2"
					if(get.color(result.links[0])!='black') player.draw('nodelay');
					if(result.links[0].name!='sha'&&event.target.countCards('he')){
						player.gainPlayerCard('he',event.target,true);
					}
				},
				ai:{
					expose:0.2,
					threaten:1.4,
				},
			},
			"xinfu_guanchao":{
				subSkill:{
					dizeng:{
						mark:true,
						marktext:"增",
						intro:{
							content:"单调递增",
						},
						init:function (player){
							player.storage.guanchao=0;
						},
						onremove:function (player){
							delete player.storage.guanchao;
						},
						trigger:{
							player:"useCard",
						},
						silent:true,
						forced:true,
						popup:false,
						filter:function (event,player){
							return get.number(event.card)&&player.storage.guanchao!=14;
						},
						content:function (){
							var num1=get.number(trigger.card);
							var num2=player.storage.guanchao;
							if(num2!=0&&num1>num2){
								player.logSkill('xinfu_guanchao');
								player.draw();
								player.storage.guanchao=num1;
							}
							else if(num2==0){
								player.storage.guanchao=num1;
							}
							else player.storage.guanchao=14;
						},
						sub:true,
					},
					dijian:{
						mark:true,
						marktext:"减",
						intro:{
							content:"单调递减",
						},
						init:function (player){
							player.storage.guanchao=0;
						},
						onremove:function (player){
							delete player.storage.guanchao;
						},
						trigger:{
							player:"useCard",
						},
						silent:true,
						forced:true,
						popup:false,
						filter:function (event,player){
							return get.number(event.card)&&player.storage.guanchao!=14;
						},
						content:function (){
							var num1=get.number(trigger.card);
							var num2=player.storage.guanchao;
							if(num2!=0&&num1<num2){
								player.logSkill('xinfu_guanchao');
								player.draw();
								player.storage.guanchao=num1;
							}
							else if(num2==0){
								player.storage.guanchao=num1;
							}
							else player.storage.guanchao=14;
						},
						sub:true,
					},
				},
				audio:2,
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function (){
					'step 0'
					var list=['递增','递减','取消'];
					player.chooseControl(list).set('prompt',get.prompt2('xinfu_guanchao')).set('ai',function(){
						return [0,1].randomGet();
					});
					'step 1'
					switch(result.control){
						case '递增':{
							player.logSkill('xinfu_guanchao');
							player.addTempSkill('xinfu_guanchao_dizeng','phaseUseEnd');
							break;
						}
						case '递减':{
							player.logSkill('xinfu_guanchao');
							player.addTempSkill('xinfu_guanchao_dijian','phaseUseEnd');
							break;
						}
						case '取消':{
							break;
						}
					}
				},
			},
			"xinfu_xunxian":{
				usable:1,
				audio:2,
				trigger:{
					player:["useCardAfter","respond"],
				},
				filter:function (event,player){
					if(get.itemtype(event.cards)!='cards'||player==_status.currentPhase) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].isInPile()){
							return true;
						}
					}
					return false;
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('xinfu_xunxian'),function(card,player,target){
						return target!=player&&target.countCards('h')>player.countCards('h');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att<3) return 0;
						if(target.hasJudge('lebu')){
							att/=5;
						}
						if(target.hasSha()&&_status.event.sha){
							att/=5;
						}
						if(_status.event.wuxie&&target.needsToDiscard(1)){
							att/=5;
						}
						return att/(1+get.distance(player,target,'absolute'));
					}).set('sha',trigger.cards[0].name=='sha').set('wuxie',trigger.cards[0].name=='wuxie');
					'step 1'
					if(result.bool){
						var list=[];
						for(var i=0;i<trigger.cards.length;i++){
							if(trigger.cards[i].isInPile()){
								list.push(trigger.cards[i]);
							}
						}
						player.logSkill('xinfu_xunxian',result.targets[0]);
						result.targets[0].gain(list,'gain2');
					}
				},
			},
			"xinfu_kannan":{
				audio:true,
				subSkill:{
					phase:{
						sub:true,
					},
				},
				enable:"phaseUse",
				filter:function (event,player){
					if(player.hasSkill('xinfu_kannan_phase')) return false;
					if(player.getStat().skill.xinfu_kannan>=player.hp) return false;
					return player.countCards('h')>0;
				},
				filterTarget:function (card,player,target){
					if(target.hasSkill('xinfu_kannan_phase')) return false;
					return player.canCompare(target);
				},
				ai:{
					order:function (){
						return get.order({name:'sha'})+0.4;
					},
					result:{
						target:function (card,player,target){
							if(player.hasCard(function(card){
								if(get.position(card)!="h") return false;
								var val=get.value(card);
								if(val<0) return true;
								if(val<=5){
									return card.number>=12;
								}
								if(val<=6){
									return card.number>=13;
								}
								return false;
							})) return -1;
							return 0;
						},
					},
				},
				content:function (){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						player.addTempSkill('xinfu_kannan_phase');
						if(!player.hasSkill('kannan_eff')){
							player.addSkill('kannan_eff');
						}else{
							if(!player.storage.kannan_eff) player.storage.kannan_eff=0;
						}
						player.storage.kannan_eff++;
						player.markSkill('kannan_eff');
					}
					else{
						target.addTempSkill('xinfu_kannan_phase');
						if(!target.hasSkill('kannan_eff')){
							target.addSkill('kannan_eff');
						}else{
							if(!target.storage.kannan_eff) player.storage.kannan_eff=0;
							target.storage.kannan_eff++;
							target.markSkill('kannan_eff');
						}
						target.storage.kannan_eff++;
						target.markSkill('kannan_eff');
					}
				},
			},
			"kannan_eff":{
				mark:true,
				intro:{
					content:"下一张杀的伤害基数+#",
				},
				trigger:{
					player:"useCard",
				},
				filter:function (event){
					return event.card&&event.card.name=='sha';
				},
				forced:true,
				content:function (){
				"step 0"
					if(!trigger.baseDamage) trigger.baseDamage=1;
					trigger.baseDamage+=player.storage.kannan_eff;
					"step 1"
					player.removeSkill('kannan_eff');
				},
				init:function (player){
					player.storage.kannan_eff=0;
				},
				onremove:function (player){
					delete player.storage.kannan_eff;
				},
				ai:{
					damageBonus:true,
				},
			},
			"xinfu_tushe":{
				audio:2,
				trigger:{
					player:"useCardToPlayered",
				},
				frequent:true,
				filter:function (event,player){
					if(get.type(event.card)=='equip') return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					return event.targets.length>0&&!player.countCards('h',{type:'basic',});
				},
				content:function (){
					player.draw(trigger.targets.length);
				},
				ai:{
					presha:true,
					pretao:true,
					threaten:1.8,
				},
			},
			"xinfu_limu":{
				mod:{
					targetInRange:function (card,player,target){
						if(player.countCards('j')&&get.distance(player,target,'attack')<=1){
							return true;
						}
					},
					cardUsable:function (card,player,num){
						if(typeof num=='number'&&player.countCards('j')&&card.name!='jiu'){
							return Infinity;
						}
					},
				},
				locked:false,
				audio:2,
				enable:"phaseUse",
				discard:false,
				filter:function (event,player){
					if(player.hasJudge('lebu')) return false;
					return player.countCards('he',{suit:'diamond'})>0;
				},
				viewAs:{name:'lebu'},
				//prepare:"throw",
				position:"he",
				filterCard:{
					suit:"diamond",
				},
				selectTarget:-1,
				filterTarget:function (card,player,target){
					return player==target;
				},
				check:function (card){
					var player=_status.event.player;
					if(player.countCards('h','sha')<2){
					if(player.countCards('h',function(cardx){
						return cardx.name=='shan'&&get.suit(cardx)=='heart';
					})>0) return 0;
					if(player.countCards('h',function(cardx){
						return cardx.name=='shan'&&get.suit(cardx)=='diamond';
					})>0) return 0;
					var damaged=player.maxHp-player.hp-1;
					if(player.countCards('h',function(cardx){
						return cardx.name=='tao'&&get.suit(cardx)=='diamond';
					})>damaged) return 0;
					}
					if(card.name=='shan') return 15;
					if(card.name=='tao') return 10;
					return 9-get.value(card);
				},
				onuse:function (links,player){
					var next=game.createEvent('limu_recover',false,_status.event.getParent());
					next.player=player;
					next.setContent(function(){player.recover()});
				},
				ai:{
					result:{
						target:1,
					},
					order:9,
				},
			},
			"xinfu_guhuo":{
				derivation:["chanyuan"],
				group:["guhuo_guess","guhuo_respond","guhuo_wuxie"],
				enable:"chooseToUse",
				filter:function (event,player){
					if(player.hasSkill('guhuo_phase'))return false;
					if(!player.countCards('h')) return false;
					var list=['sha','shan','tao','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
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
						return '将一张手牌做当'+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					save:true,
					respondShan:true,
					skillTagFilter:function(player){
						if(player.hasSkill('guhuo_phase')) return false;
					},
				},
			},
			"guhuo_guess":{
				audio:2,
				trigger:{
					player:"useCardBefore",
				},
				filter:function (event,player){
					return event.skill=="xinfu_guhuo_backup"||event.skill=="guhuo_wuxie";
				},
				forced:true,
				direct:true,
				priority:15,
				content:function (){
					'step 0'
					player.logSkill('guhuo_guess');
					player.addTempSkill('guhuo_phase');
					player.popup(trigger.card.name,'metal');
					player.lose(trigger.cards,ui.special);
					player.line(trigger.targets,trigger.card.nature);
					trigger.line=false;
					trigger.animate=false;
					event.prompt=get.translation(player)+'声明了'+get.translation(trigger.card.name)+'，是否质疑？';
					event.guessers=game.filterPlayer(function(current){
						return current!=player&&!current.hasSkill('chanyuan');
					});
					event.guessers.sort(lib.sort.seat);
					
					game.broadcastAll(function(card){
					_status.guhuoNode=card.copy('thrown');
					if(lib.config.cardback_style!='default'){
						_status.guhuoNode.style.transitionProperty='none';
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.classList.add('infohidden');
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transitionProperty='';
					}
					else{
						_status.guhuoNode.classList.add('infohidden');
					}
					_status.guhuoNode.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
					player.$throwordered2(_status.guhuoNode);
					},trigger.cards[0]);

					
					event.onEnd01=function(){
						_status.guhuoNode.removeEventListener('webkitTransitionEnd',event.onEnd01);
							_status.guhuoNode.style.transition='all ease-in 0.3s';
							_status.guhuoNode.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
							var onEnd=function(){
								_status.guhuoNode.classList.remove('infohidden');
								_status.guhuoNode.style.transition='all 0s';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transition='';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform='';
								_status.guhuoNode.removeEventListener('webkitTransitionEnd',onEnd);
							}
							_status.guhuoNode.listenTransition(onEnd);
					};
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
					event.guessers[0].chat(result.control);
					game.delay(1);
					if(result.control=='不质疑'){
						game.log(event.guessers[0],'#g不质疑');
						event.guessers.remove(event.guessers[0]);
						event.goto(1);
					}else{
						game.log(event.guessers[0],'#y质疑');
					}
					'step 3'
					game.broadcastAll(function(onEnd){
					_status.guhuoNode.listenTransition(onEnd);
					},event.onEnd01);
					'step 4'
					game.delay(3.2);
					'step 5'
					if(!event.guessers.length) event.finish();
					'step 6'
					if(trigger.card.name==trigger.cards[0].name){
						event.guessers[0].popup('质疑错误','fire');
						event.guessers[0].addSkill('chanyuan');
						game.log(event.guessers[0],'获得了技能','#g【缠怨】');
					}
					else{
						event.guessers[0].popup('质疑正确','wood');
						game.log(player,'使用的',trigger.card,'作废了');
						game.cardsDiscard(trigger.cards);
						game.broadcastAll(ui.clear);
						trigger.cancel();
						if(trigger.name=='useCard'&&trigger.parent) trigger.parent.goto(0);
					}
					game.delay();
				},
			},
			chanyuan:{
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
					if(player.hp==1){
						var skills=player.getSkills(true,false);
						for(var i=0;i<skills.length;i++){
							var info=get.info(skills[i]);
							if(skills[i]=='chanyuan'||skills[i]=='rechanyuan'||info.charlotte){
								skills.splice(i--,1);
							}
						}
						player.disableSkill('chanyuan',skills);
					}
					else player.enableSkill('chanyuan');
				},
				mark:true,
				intro:{
					content:function (storage,player,skill){
						var str='<li>锁定技，你不能质疑于吉，只要你的体力值为1，你的其他技能便全部失效。';
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
					if(player.hp==1){
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
			"guhuo_respond":{
				trigger:{
					player:"chooseToRespondBegin",
				},
				filter:function (event,player){
					if(player.hasSkill('guhuo_phase'))return false;
					if(event.responded) return false;
					if(!event.filterCard({name:'shan'})&&!event.filterCard({name:'sha'})) return false;
					if(!lib.filter.cardRespondable({name:'shan'},player,event)&&!lib.filter.cardRespondable({name:'sha'},player,event)) return false;
					if(!player.countCards('h')) return false;
					return true;
				},
				direct:true,
				content:function (){
					"step 0"
					if(trigger.filterCard({name:'shan'})&&lib.filter.cardRespondable({name:'shan'},player,trigger)) event.name='shan';
					else event.name='sha';
					player.chooseCard('是否发动【蛊惑】，将一张手牌当做'+get.translation(event.name)+'打出？');
					"step 1"
					if(result.bool){
						player.addTempSkill('guhuo_phase');
						player.logSkill('guhuo_guess');
						player.popup(event.name,'metal');
						event.card=result.cards[0];
						player.lose(event.card,ui.special);
						event.prompt=get.translation(player)+'声明了'+get.translation(event.name)+'，是否质疑？';
						event.guessers=game.filterPlayer(function(current){
							return current!=player&&!current.hasSkill('chanyuan');
						});
						event.guessers.sort(lib.sort.seat);
						
						
					game.broadcastAll(function(card){
					_status.guhuoNode=card.copy('thrown');
					if(lib.config.cardback_style!='default'){
						_status.guhuoNode.style.transitionProperty='none';
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.classList.add('infohidden');
						ui.refresh(_status.guhuoNode);
						_status.guhuoNode.style.transitionProperty='';
					}
					else{
						_status.guhuoNode.classList.add('infohidden');
					}
					_status.guhuoNode.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
					player.$throwordered2(_status.guhuoNode);
					},result.cards[0]);

					
					event.onEnd01=function(){
						_status.guhuoNode.removeEventListener('webkitTransitionEnd',event.onEnd01);
							_status.guhuoNode.style.transition='all ease-in 0.3s';
							_status.guhuoNode.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
							var onEnd=function(){
								_status.guhuoNode.classList.remove('infohidden');
								_status.guhuoNode.style.transition='all 0s';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transition='';
								ui.refresh(_status.guhuoNode);
								_status.guhuoNode.style.transform='';
								_status.guhuoNode.removeEventListener('webkitTransitionEnd',onEnd);
							}
							_status.guhuoNode.listenTransition(onEnd);
					};
					}else event.finish();
					"step 2"
					if(event.guessers.length==0) event.goto(4);
					else{
						event.guessers[0].chooseControl('质疑','不质疑').set('prompt',event.prompt).set('ai',function(){
							if(get.attitude(event.guessers[0],player)>0) return '不质疑';
							return Math.random()<0.5?'不质疑':'质疑';
						});
					}
					"step 3"
					if(!result.control) result.control='不质疑';
					event.guessers[0].chat(result.control);
					game.delay();
					if(result.control=='不质疑'){
						game.log(event.guessers[0],'#g不质疑');
						event.guessers.remove(event.guessers[0]);
						event.goto(2);
					}else{
						game.log(event.guessers[0],'#y质疑');
					}
					"step 4"
					game.broadcastAll(function(onEnd){
					_status.guhuoNode.listenTransition(onEnd);
					},event.onEnd01);
					"step 5"
					game.delay(3.2);
					if(!event.guessers.length) event.goto(7);
					"step 6"
					if(event.name==event.card.name){
						event.guessers[0].popup('质疑错误','fire');
						event.guessers[0].addSkill('chanyuan');
						game.log(event.guessers[0],'获得了技能','#g【缠怨】');
					}
					else{
						event.guessers[0].popup('质疑正确','wood');
						game.log(player,'打出的','#y'+get.translation(event.name),'作废了');
						game.cardsDiscard(event.card);
						event.finish();
					}
					"step 7"
					trigger.untrigger();
					trigger.responded=true;
					trigger.result={bool:true,card:{name:event.name},cards:[event.card],noanimate:true};
				},
				ai:{
					order:4,
					useful:-1,
					value:-1,
				},
			},
			"guhuo_wuxie":{
				log:false,
				silent:true,
				popup:false,
				enable:"chooseToUse",
				filterCard:true,
				viewAsFilter:function (player){
					if(player.hasSkill('guhuo_phase'))return false;
					return player.countCards('h')>0;
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
			"guhuo_phase":{},
			"xinfu_pingcai":{
				"wolong_card":function (){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return current.name=='sp_zhugeliang'||current.name2=='sp_zhugeliang';
					})?true:false;
					var prompt='请选择';
					prompt+=ingame?'至多两名':'一名';
					prompt+='角色，对其造成1点火焰伤害';
					var range=ingame?[1,2]:[1,1]
					player.chooseTarget(prompt,range).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'fire');
					});
					'step 1'
					if(result.bool&&result.targets.length){
						player.line(result.targets,'fire');
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].damage('fire');
						}
					}
				},
				"fengchu_card":function (){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return current.name=='pangtong'||current.name2=='pangtong';
					})?true:false;
					var prompt='请选择';
					prompt+=ingame?'至多四名':'至多三名';
					prompt+='要横置的角色';
					var range=ingame?[1,4]:[1,3]
					player.chooseTarget(prompt,range).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'tiesuo'},player,player)
					});
					'step 1'
					if(result.bool&&result.targets.length){
						player.line(result.targets,'green');
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].link();
						}
					}
				},
				"xuanjian_card":function (){
					'step 0'
					event.ingame=game.hasPlayer(function(current){
						return current.name=='xin_xushu'||current.name2=='xin_xushu'||current.name=='re_xushu'||current.name2=='re_xushu';
					})?true:false;
					var prompt='请选择一名角色，令其回复一点体力并摸一张牌';
					prompt+=event.ingame?'，然后你摸一张牌。':'。';
					player.chooseTarget(prompt).set('ai',function(target){
						var player=_status.event.player;
						return get.attitude(player,target)*(target.isDamaged()?2:1);
					});
					'step 1'
					if(result.bool&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.draw();
						target.recover();
						if(event.ingame) player.draw();
					}
				},
				"shuijing_card":function (){
					'step 0'
					event.ingame=game.hasPlayer(function(current){
						return current.name=='simahui'||current.name2=='simahui';
					})?true:false;
					var prompt='将一名角色装备区中的';
					prompt+=event.ingame?'一张牌':'防具牌';
					prompt+='移动到另一名角色的装备区中';
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							if(!_status.event.ingame){
								return target.isEmpty(2)?true:false;
							}
							var from=ui.selected.targets[0];
							if(target.isMin()) return false;
							var es=from.getCards('e');
								for(var i=0;i<es.length;i++){
									if(['equip3','equip4'].contains(get.subtype(es[i]))&&target.getEquip('liulongcanjia')) continue;
									if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
									if(target.isEmpty(get.subtype(es[i]))) return true;
								}
								return false;
							}
							else{
								if(!event.ingame){
									if(target.getEquip(2)) return true;
									return false;
								}
								return target.countCards('e')>0;
							}
						});
						next.set('ingame',event.ingame)
						next.set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(ui.selected.targets.length==0){
								if(att<0){
									if(game.hasPlayer(function(current){
										if(get.attitude(player,current)>0){
											var es=target.getCards('e');
											for(var i=0;i<es.length;i++){
												if(['equip3','equip4'].contains(get.subtype(es[i]))&&current.getEquip('liulongcanjia')) continue;
												else if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
												else if(current.isEmpty(get.subtype(es[i]))) return true;
											}
											return false;
										}
									}))	return -att;
								}
								return 0;
							}
							if(att>0){
								var es=ui.selected.targets[0].getCards('e');
								var i;
								for(i=0;i<es.length;i++){
									if(['equip3','equip4'].contains(get.subtype(es[i]))&&target.getEquip('liulongcanjia')) continue;
									if(es[i].name=='liulongcanjia'&&target.countCards('e',{subtype:['equip3','equip4']})>1) continue;
									if(target.isEmpty(get.subtype(es[i]))) break;
								}
								if(i==es.length) return 0;
							}
							return -att*get.attitude(player,ui.selected.targets[0]);
						});
						next.set('multitarget',true);
						next.set('targetprompt',['被移走','移动目标']);
						next.set('prompt',prompt);
						'step 1'
						if(result.bool){
							player.line2(result.targets,'green');
							event.targets=result.targets;
						}
						else event.finish();
						'step 2'
						game.delay();
						'step 3'
						if(targets.length==2){
							if(!event.ingame){
								event._result={
									bool:true,
									links:[targets[0].getEquip(2)],
								};
							}
							else{
							player.choosePlayerCard('e',true,function(button){
								return get.equipValue(button.link);
							},targets[0]).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
								var targets1=_status.event.targets1;
									if(['equip3','equip4'].contains(get.subtype(button.link))&&targets1.getEquip('liulongcanjia')) return false;
									if(button.link.name=='liulongcanjia'&&targets1.countCards('e',{subtype:['equip3','equip4']})>1) return false;
									return !targets1.countCards('e',{subtype:get.subtype(button.link)});
								
							});
							}
						}
						else event.finish();
						'step 4'
						if(result.bool&&result.links.length){
							var link=result.links[0];
							if(get.position(link)=='e')	event.targets[1].equip(link);
							else if(link.viewAs) event.targets[1].addJudge({name:link.viewAs},[link]);
							else event.targets[1].addJudge(link);
							event.targets[0].$give(link,event.targets[1])
							game.delay();
						}
				},
				audio:true,
				enable:"phaseUse",
				usable:1,
				content:function (){
					"step 0"
					var list=["wolong","fengchu","xuanjian","shuijing"];
					var list2=[];
					for(var i=0;i<list.length;i++){
						list2.push(game.createCard(list[i]+'_card','',''))
					}
					list2.randomSort();
					player.chooseButton(['请选择要擦拭的宝物',list2],true).set('ai',function(button){
						var player=_status.event.player;
						if(button.link.name=='xuanjian_card'){
							if(game.hasPlayer(function(current){
								return current.isDamaged()&&current.hp<3&&get.attitude(player,current)>1;
							})) return 1+Math.random();
							else return 1;
						}
						else if(button.link.name=='wolong_card'){
							if(game.hasPlayer(function(current){
								return get.damageEffect(current,player,player,'fire')>0;
							})) return 1.2+Math.random();
							else return 0.5;
						}
						else return 0.6;
					});
					"step 1"
					event.dialog=ui.create.dialog(get.translation(player)+'正在擦拭宝物...');
					event.videoId=lib.status.videoId++;
					game.broadcast('createDialog',event.videoId,get.translation(player)+'正在擦拭宝物...');
					game.delay(14);
					event.card=result.links[0];
					"step 2"
					event.dialog.close();
					game.addVideo('cardDialog',null,event.videoId);
					game.broadcast('closeDialog',event.videoId);
					player.logSkill('pcaudio_'+event.card.name);
					player.$throw(event.card);
					event.insert(lib.skill.xinfu_pingcai[event.card.name],{
						player:player,
					});
				},
				ai:{
					order:7,
					result:{
						player:1,
					},
				},
			},
			"xinfu_pdgyingshi":{
				mod:{
					targetEnabled:function (card,player,target){
						if(get.type(card)=='delay'){
							return false;
						}
					},
				},
				trigger:{
					player:['phaseZhunbeiBefore','phaseJieshuBefore'],
				},
				forced:true,
				audio:2,
				group:'xinfu_pdgyingshi2',
				priority:15,
				content:function(){
					trigger.cancel();
					game.log(player,'跳过了',event.triggername=='phaseZhunbeiBefore'?'准备阶段':'结束阶段');
				},
			},
			xinfu_pdgyingshi2:{
				popup:false,
				trigger:{
					player:"phaseJudgeBefore",
				},
				forced:true,
				priority:15,
				content:function (){
					trigger.cancel();
					game.log(player,'跳过了判定阶段');
				},
			},
			"pcaudio_wolong_card":{
				audio:true,
			},
			"pcaudio_fengchu_card":{
				audio:true,
			},
			"pcaudio_shuijing_card":{
				audio:true,
			},
			"pcaudio_xuanjian_card":{
				audio:true,
			},
			"yizan_respond_sha":{
				audio:2,
				enable:["chooseToRespond"],
				filterCard:function (card,player,target){
					if(player.storage.yizan) return get.type(card)=='basic';
					else if(ui.selected.cards.length){
						if(get.type(ui.selected.cards[0])=='basic') return true;
						return get.type(card)=='basic';
					}
					return true;
				},
				selectCard:function (){
					var player=_status.event.player;
					if(player.storage.yizan) return 1;
					return 2;
				},
				position:"he",
				viewAs:{
					name:"sha",
				},
				complexCard:true,
				viewAsFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('h')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
				prompt:function (){
					var player=_status.event.player;
					var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
					return '将'+str+'当做杀打出';
				},
				check:function (card){
					if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
					return 5-get.value(card);
				},
				ai:{
					skillTagFilter:function (player){
						if(!player.storage.yizan){
							if(player.countCards('he')<2) return false;
						}
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					},
					respondSha:true,
					basic:{
						useful:[5,1],
						value:[5,1],
					},
					order:function (){
						if(_status.event.player.hasSkillTag('presha',true,null,true)) return 10.1;
						return 3.1;
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
			"yizan_use":{
				init:function (player){
					if(!player.storage.yizan_use) player.storage.yizan_use=0;
					if(!player.storage.yizan) player.storage.yizan=false;
				},
				mark:true,
				intro:{
					content:"已发动过#次",
				},
				group:["yizan_respond_sha","yizan_respond_shan","yizan_count"],
				enable:"chooseToUse",
				filter:function (event,player){
				if(!player.storage.yizan&&player.countCards('he')<2) return false;
					if(event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)){
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					}
					return false;
				},
				chooseButton:{
					dialog:function (event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('翊赞',[list,'vcard'],'hidden');
					},
					check:function (button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							switch(button.link[2]){
								case 'tao':return 5;
								case 'jiu':{
									if(player.storage.yizan&&player.countCards('h',{type:'basic'})>2) return 3;
								};
								case 'sha':
									if(button.link[3]=='fire') return 2.95;
									else if(button.link[3]=='thunder') return 2.92;
									else return 2.9;
							}
						}
						return 0;
					},
					backup:function (links,player){
						return {
							filterCard:function(card,player,target){
								if(player.storage.yizan) return get.type(card)=='basic';
								else if(ui.selected.cards.length){
									if(get.type(ui.selected.cards[0])=='basic') return true;
									return get.type(card)=='basic';
								}
								return true;
							},
							complexCard:true,
							selectCard:function(){
								var player=_status.event.player;
								if(player.storage.yizan) return 1;
								return 2;
							},
							check:function(card,player,target){
								if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
								else return 6-get.value(card);
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
							position:'he',
							popname:true,
							precontent:function(){
								player.logSkill('yizan_respond_shan');
							},
						}
					},
					prompt:function (links,player){
						var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
						return '将'+str+'当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function (){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.storage.yizan&&player.countCards('h',{type:'basic'})>2){
							return 3.3;
						}
						return 3.1;
					},
					save:true,
					respondSha:true,
					skillTagFilter:function (player,tag,arg){
						if(!player.storage.yizan&&player.countCards('he')<2) return false;
						if(player.hasCard(function(card){
							return get.type(card)=='basic';
						},'he')){
							if(tag=='respondSha'){
								if(arg!='use') return false;
							}
						}
						else{
							return false;
						}
					},
					result:{
						player:1,
					},
				},
			},
			"yizan_respond_shan":{
				complexCard:true,
				audio:2,
				enable:["chooseToUse","chooseToRespond"],
				filterCard:function (card,player,target){
					if(player.storage.yizan) return get.type(card)=='basic';
						else if(ui.selected.cards.length){
						if(get.type(ui.selected.cards[0])=='basic') return true;
						return get.type(card)=='basic';
					}
					return true;
				},
				selectCard:function (){
					var player=_status.event.player;
					if(player.storage.yizan) return 1;
					return 2;
				},
				position:"he",
				viewAs:{
					name:"shan",
				},
				viewAsFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('he')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
				prompt:function (){
					var player=_status.event.player;
					var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
					return '将'+str+'当做闪使用或打出';
				},
				check:function (card){
					if(!ui.selected.cards.length&&get.type(card)=='basic') return 6;
					return 5-get.value(card);
				},
				ai:{
					respondShan:true,
					skillTagFilter:function (player){
					if(!player.storage.yizan){
						if(player.countCards('he')<2) return false;
					}
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						},
					},
					basic:{
						useful:[7,2],
						value:[7,2],
					},
				},
			},
			"xinfu_longyuan":{
				audio:2,
				forced:true,
				unique:true,
				trigger:{
					player:["useCardAfter","respondAfter"],
				},
				init:function (player){
					player.storage.xinfu_longyuan=false;
				},
				delay:1.2,
				skillAnimation:true,
				animationColor:'orange',
				filter:function (event,player){
					if(player.storage.xinfu_longyuan) return false;
					return player.storage.yizan_use>2;
				},
				content:function (){
					player.awakenSkill('xinfu_longyuan');
					player.storage.yizan=true;
					game.delay(1);
				},
			},
			"yizan_count":{
				forced:true,
				silent:true,
				popup:false,
				trigger:{
					player:["respond","useCard1"],
				},
				filter:function (event,player){
					if(event.skill!='yizan_respond_sha'&&event.skill!='yizan_respond_shan'&&event.skill!='yizan_use_backup') return false;
					return player.storage.yizan_use!=undefined;
				},
				content:function (){
					player.storage.yizan_use++;
					player.markSkill('yizan_use');
				},
			},
			"xinfu_jingxie1":{
				group:["xinfu_jingxie2"],
				position:"he",
				enable:"phaseUse",
				filter:function(event,player){
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(he[i].name)) return true;
					}
					return false;
				},
				filterCard:function (card){
					return ["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(card.name);
				},
				discard:false,
				check:function(){
					return 1;
				},
				content:function (){
					"step 0"
					player.showCards(cards);
					"step 1"
					var card=cards[0];
					player.gain(game.createCard('rewrite_'+card.name,get.suit(card),card.number),'gain2');
				},
				ai:{
					basic:{
						order:10,
					},
					result:{
						player:1,
					},
				},
			},
			"xinfu_jingxie2":{
				prompt:"出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，将体力回复至1点。",
				audio:2,
				enable:"chooseToUse",
				filterCard:function (card){
					return get.subtype(card)=='equip2';
				},
				filter:function (event,player){
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return true;
					}
					return false;
				},
				check:function(){
					return 1;
				},
				position:"he",
				content:function (){
					'step 0'
					player.draw();
					player.recover(1-player.hp);
				},
				ai:{
					order:0.5,
					skillTagFilter:function (player){
						if(player.hp>0) return false;
					},
					save:true,
					result:{
						player:function (player){
							return 10;
						},
					},
				},
			},
			"xinfu_qiaosi":{
				enable:"phaseUse",
				usable:1,
				content:function (){
					'step 0'
					if(get.isLuckyStar()){
						event.num=6;
						player.throwDice(6);
					}
					else player.throwDice();
					'step 1'
					event.cards=get.cards(event.num);
					player.showCards(event.cards);
					'step 2'
					player.gain(event.cards,'gain2');
					player.chooseControl().set('choiceList',[
						'将'+get.cnNumber(event.num)+'张牌交给一名其他角色',
						'弃置'+get.cnNumber(event.num)+'张牌',
					]).set('ai',function(){
						if(game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)>2;
						})) return 0;
						return 1;
					});
					'step 3'
					if(result.index==0){
						player.chooseCardTarget({
							position:'he',
							filterCard:true,
							selectCard:event.num,
							filterTarget:function(card,player,target){
								return player!=target;
							},
							ai1:function(card){
								return 1;
							},
							ai2:function(target){
								var att=get.attitude(_status.event.player,target);
								return att;
							},
							prompt:'请选择要送人的卡牌',
							forced:true,
						});
					}
					else{
						player.chooseToDiscard(event.num,true);
						event.finish();
					}
					'step 4'
					if(result.bool){
						var target=result.targets[0];
						player.give(result.cards,target);
					}
				},
				ai:{
					order:7.5,
					result:{
						player:1,
					},
				},
			},
			
			"xinfu_jijie":{
				enable:"phaseUse",
				usable:1,
				audio:2,
				//filter:function(){
					//return ui.cardPile.hasChildNodes();
				//},
				content:function (){
					'step 0'
					//event.card=ui.cardPile.lastChild;
					event.card=get.bottomCards()[0];
					var content=['牌堆底的一张牌',[event.card]];
					game.log(player,'观看了牌堆底的一张牌');
					player.chooseControl('ok').set('dialog',content);
					'step 1'
					player.chooseTarget('选择获得此牌的角色').set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du){
								if(target.hasSkillTag('nodu')) return 0.5;
								return -att;
							}
						if(att>0){
								if(_status.event.player!=target) att+=2;
								return att+Math.max(0,5-target.countCards('h'));
							}
							return att;
					}).set('du',event.card.name=='du').set('same',event.same);
					'step 2'
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target,'green');
						player.give(event.card,event.target);
					}
					else ui.cardPile.appendChild(event.card);
					game.updateRoundNumber();
				},
				ai:{
					order:7.2,
					result:{
						player:1,
					},
				},
			},
			"xinfu_jiyuan":{
				trigger:{
					global:"dying",
					source:"gainEnd",
				},
				//priority:6,
				audio:2,
				filter:function (event,player){
					if(event.name=='dying') return true;
					return event.player!=player&&event.bySelf!=true;
				},
				check:function (event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:"player",
				content:function (){
					trigger.player.draw();
				},
			},
			"xinfu_daigong":{
				usable:1,
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				filter:function (event,player){
					return event.source!=undefined&&player.countCards('h')>0;
				},
				content:function (){
					'step 0'
					player.showHandcards();
					'step 1'
					var cards=player.getCards('h');
					var suits=[];
					for(var i=0;i<cards.length;i++){
						suits.add(get.suit(cards[i]));
					}
					trigger.source.chooseCard('he','交给'+get.translation(player)+'一张满足条件的牌，否则防止此伤害。',function(card){
						return !_status.event.suits.contains(get.suit(card));
					}).set('suits',suits).ai=function(card){
						var player=_status.event.player;
						var target=_status.event.getParent('xinfu_daigong').player;
						if(get.damageEffect(target,player,player)>0) return 6.5-get.value(card);
						return 0;
					};
					'step 2'
					if(result.bool){
						trigger.source.give(result.cards,player,true);
					}
					else trigger.cancel();
				},
			},
			"xinfu_zhaoxin":{
				group:["zhaoxin_give"],
				intro:{
					content:"cards",
				},
				enable:"phaseUse",
				usable:1,
				audio:2,
				init:function (player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				filter:function (event,player){
					return player.storage.xinfu_zhaoxin.length<3&&player.countCards('h')>0;
				},
				filterCard:true,
				selectCard:function (){
					var player=_status.event.player;
					return [1,3-player.storage.xinfu_zhaoxin.length];
				},
				discard:false,
				lose:false,
				delay:0,
				content:function (){
					'step 0'
					player.lose(cards,ui.special,'toStorage')
					player.$give(cards,player);
					player.storage.xinfu_zhaoxin=player.storage.xinfu_zhaoxin.concat(cards);
					player.markSkill('xinfu_zhaoxin');
					'step 1'
					player.draw(cards.length);
				},
							check:function (card){
					return 6-get.value(card);
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			"zhaoxin_give":{
				trigger:{
					global:"phaseDrawAfter",
				},
				filter:function (event,player){
					if(!player.storage.xinfu_zhaoxin.length) return false;
					return get.distance(player,event.player,'attack')<=1
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseCardButton(get.prompt('xinfu_zhaoxin',trigger.player),player.storage.xinfu_zhaoxin,function(button){
						return true;
					}).set('ai',function(button){
						var player=_status.event.player;
						if(get.attitude(player,_status.currentPhase)>0) return get.value(button.link);
						return 6-get.value(button.link);
					});
					'step 1'
					if(result.bool){
						event.card=result.links[0];
						player.logSkill('xinfu_zhaoxin',target);
						player.line(trigger.player,'thunder');
						player.showCards(event.card);
					}
					else event.finish();
					'step 2'
					trigger.player.chooseBool('是否获得'+get.translation(event.card)+'?').ai=function(){
						return get.attitude(trigger.player,player)>0;
					};
					'step 3'
					if(result.bool){
						player.storage.xinfu_zhaoxin.remove(event.card);
						player.$give(event.card,trigger.player);
						trigger.player.gain(event.card,'fromStorage');
						if(player.storage.xinfu_zhaoxin.length) player.markSkill('xinfu_zhaoxin');
						else player.unmarkSkill('xinfu_zhaoxin');
						player.chooseBool('是否对'+get.translation(trigger.player)+'造成一点伤害？').ai=function(){
							return get.damageEffect(trigger.player,player,player)>0
						};
					}
					else{
						trigger.player.chat('拒绝');
						event.finish();
					}
					'step 4'
					if(result.bool){
						trigger.player.damage('nocard');
					}
				},
			},
			"xinfu_qianchong":{
				audio:3,
				mod:{
					targetInRange:function (card,player,target){
						if(player.storage.xinfu_qianchong.contains(get.type(card,'trick'))){
							return true;
						}
					},
					cardUsable:function (card,player,num){
						if(player.storage.xinfu_qianchong.contains(get.type(card,'trick'))) return Infinity;
					},
				},
				group:["xinfu_qianchong_clear","qc_weimu","qc_mingzhe"],
				subSkill:{
					clear:{
						sub:true,
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							player:"phaseAfter",
						},
						content:function (){
							player.storage.xinfu_qianchong=[];
						},
					},
				},
				init:function (event,player){
					event.storage[player]=[];
				},
				trigger:{
					player:"phaseUseBegin",
				},
				locked:false,
				direct:true,
				filter:function (event,player){
					var es=player.getCards('e');
					if(!es.length) return true;
					var col=get.color(es[0]);
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!=col) return true;
					}
					return false;
				},
				content:function (){
					'step 0'
					var list=['basic','trick','equip','cancel2'];
					for(var i=0;i<player.storage.xinfu_qianchong.length;i++){
						list.remove(player.storage.xinfu_qianchong[i]);
					}
					if(list.length>1){
					player.chooseControl(list).set('ai',function(){
							return list[0];
						}
			).set('prompt',get.prompt('xinfu_qianchong')).set('prompt2',get.translation('xinfu_qianchong_info'));
					}
					else event.finish();
					'step 1'
					if(result.control&&result.control!='cancel2'){
						player.logSkill('xinfu_qianchong');
						player.storage.xinfu_qianchong.add(result.control);
						var str=get.translation(result.control)+'牌';
						game.log(player,'声明了','#y'+str);
						player.popup(str,'thunder');
					}
				},
			},
			"qc_weimu":{
				audio:"xinfu_qianchong",
				mod:{
					targetEnabled:function (card,player,target){
						var bool=true;
						var es=target.getCards('e');
						if(!es.length) bool=false;
						for(var i=0;i<es.length;i++){
							if(get.color(es[i])!='black') bool=false;
						}
						if(bool&&(get.type(card)=='trick'||get.type(card)=='delay')&&
							get.color(card)=='black') return false;
					},
				},
			},
			"qc_mingzhe":{
				audio:"xinfu_qianchong",
				trigger:{
					player:["useCardAfter","respondAfter","discardAfter"],
				},
				frequent:true,
				filter:function (event,player){
					if(player.hasSkill('mingzhe')) return false;
					if(player==_status.currentPhase) return false;
					var es=player.getCards('e');
					if(!es.length) return false;
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!='red') return false;
					}
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(get.color(event.cards[i])=='red'&&
							event.cards[i].original!='j') return true;
						}
					}
					return false;
				},
				content:function (){
					"step 0"
					event.count=1;
					if(trigger.name=='discard'){
						event.count=0;
						for(var i=0;i<trigger.cards.length;i++){
							if(get.color(trigger.cards[i])=='red'&&trigger.cards[i].original!='j') event.count++;
						}
					}
					"step 1"
					player.draw();
					event.count--;
					"step 2"
					if(event.count){
						if(lib.config.autoskilllist.contains('mingzhe')) player.chooseBool(get.prompt2('mingzhe'));
						else event._result={bool:true};
					}
					else event.finish();
					"step 3"
					if(result.bool){
						player.logSkill('qc_mingzhe');
						event.goto(1);
					}
				},
				ai:{
					threaten:0.7,
				},
			},
			"xinfu_shangjian":{
				group:["xinfu_shangjian_count","xinfu_shangjian_init"],
				trigger:{
					global:"phaseJieshuBegin",
				},
				audio:2,
				filter:function (event,player){
					return player.storage.xinfu_shangjian<=player.hp&&player.storage.xinfu_shangjian>0;
				},
				frequent:true,
				content:function (){
					'step 0'
					var num=player.storage.xinfu_shangjian;
					if(num>0){
						player.draw(num);
					}
				},
				subSkill:{
					init:{
						trigger:{
							global:"phaseBefore",
						},
						filter:function (event,player){
							return true;
						},
						silent:true,
						content:function (){
							player.storage.xinfu_shangjian=0;
						},
						sub:true,
						forced:true,
						popup:false,
					},
					count:{
						trigger:{
							player:"loseEnd",
						},
						silent:true,
						filter:function (event,player){
							return true;
						},
						content:function (){
							for(var i=0;i<trigger.cards.length;i++){
								if(trigger.cards[i].original&&trigger.cards[i].original!='j') player.storage.xinfu_shangjian++;
							}
						},
						sub:true,
						forced:true,
						popup:false,
					},
				},
			},
			"rw_bagua_skill":{
				inherit:"bagua_skill",
				audio:"bagua_skill",
				content:function (){
					"step 0"
					player.judge('rewrite_bagua',function(card){return (get.suit(card)!='spade')?1.5:-0.5});
					"step 1"
					if(result.judge>0){
						trigger.untrigger();
						trigger.responded=true;
						trigger.result={bool:true,card:{name:'shan'}}
					}
				},
			},
			"rw_baiyin_skill":{
				equipSkill:true,
				inherit:"baiyin_skill",
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				audio:true,
				filter:function (event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.num<=1) return false;
					if(event.source&&event.source.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return true;
				},
				//priority:-10,
				content:function (){
					trigger.num=1;
				},
			},
			"rw_lanyinjia":{
				equipSkill:true,
				inherit:"lanyinjia",
				enable:["chooseToRespond","chooseToUse"],
				filterCard:true,
				viewAs:{
					name:"shan",
				},
				viewAsFilter:function (player){
					if(!player.countCards('h')) return false;
				},
				prompt:"将一张手牌当闪使用或打出",
				check:function (card){
					return 6-get.value(card);
				},
				ai:{
					respondShan:true,
					skillTagFilter:function (player){
						if(!player.countCards('h')) return false;
					},
					effect:{
						target:function (card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0&&target.countCards('h')) return 0.59
						},
					},
					order:4,
					useful:-0.5,
					value:-0.5,
					basic:{
						useful:[7,2],
						value:[7,2],
					},
				},
			},
			"rw_minguangkai_cancel":{
				equipSkill:true,
				inherit:"minguangkai_cancel",
				trigger:{
					target:"useCardToBefore",
				},
				forced:true,
				priority:15,
				check:function (event,player){
					return get.effect(event.target,event.card,event.player,player)<0;
				},
				filter:function (event,player){
					if(['huoshaolianying','huogong'].contains(event.card.name)) return true;
					if(event.card.name=='sha') return event.card.nature=='fire';
					return false;
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(['huoshaolianying','huogong'].contains(card.name)||(card.name=='sha'&&card.nature=='fire')){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			"rw_minguangkai_link":{
				equipSkill:true,
				inherit:"minguangkai_link",
				trigger:{
					player:"linkBefore",
				},
				forced:true,
				priority:20,
				filter:function (event,player){
					return !player.isLinked();
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
				if(target.isMinor()&&['tiesuo','lulitongxin'].contains(card.name)){
					return 'zeroplayertarget';
				}
			},
					},
				},
			},
			"rw_renwang_skill":{
				equipSkill:true,
				inherit:"renwang_skill",
				trigger:{
					target:"shaBegin",
				},
				forced:true,
				priority:6,
				audio:true,
				filter:function (event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return (event.card.name=='sha'&&['spade','club','heart'].contains(get.suit(event.card)))
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player){
							if(player.getEquip('qinggang')&&card.name=='sha'||target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})) return;
							if(card.name=='sha'&&get.color(card)=='black') return 'zerotarget';
						},
					},
				},
			},
			"rw_tengjia1":{
				equipSkill:true,
				inherit:"tengjia1",
				trigger:{
					target:"useCardToBefore",
				},
				forced:true,
				priority:6,
				audio:true,
				filter:function (event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					if(event.card.name=='nanman') return true;
					if(event.card.name=='wanjian') return true;
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(player.getEquip('qinggang')&&card.name=='sha'||target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})) return;
							if(card.name=='nanman'||card.name=='wanjian') return 'zerotarget';
							if(card.name=='sha'){
								var equip1=player.getEquip(1);
								if(equip1&&equip1.name=='zhuque') return 2;
								if(equip1&&equip1.name=='qinggang') return 1;
								if(!card.nature) return 'zerotarget';
							}
						},
					},
				},
			},
			"rw_tengjia2":{
				equipSkill:true,
				inherit:"tengjia2",
				trigger:{
					player:"damageBegin3",
				},
				filter:function (event){
					if(event.nature=='fire') return true;
				},
				audio:true,
				forced:true,
				content:function (){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(card.name=='sha'){
								if(card.nature=='fire'||player.hasSkill('zhuque_skill')) return 2;
							}
							if(get.tag(card,'fireDamage')&&current<0) return 2;
						},
					},
				},
			},
			"rw_tengjia3":{
				equipSkill:true,
				inherit:"rw_minguangkai_link",
				trigger:{
					player:"linkBefore",
				},
				forced:true,
				priority:20,
				filter:function (event,player){
					return !player.isLinked();
				},
				content:function (){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function (card,player,target,current){
							if(['tiesuo','lulitongxin'].contains(card.name)){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			"rw_tengjia4":{
				inherit:"tengjia3",
			},
		},
		translate:{
			xinghuoliaoyuan:'星火燎原',
			"xinfu_langxi":"狼袭",
			"xinfu_langxi_info":"准备阶段，你可以对一名体力小于或等于你的其他角色造成0～2点随机伤害。",
			"xinfu_yisuan":"亦算",
			"xinfu_yisuan_info":"每回合限一次。当你于出牌阶段使用的锦囊牌进入弃牌堆时，你可以减1点体力上限，从弃牌堆中获得之。",
			"xinfu_xingluan":"兴乱",
			"xinfu_xingluan_info":"每回合限一次。当你于出牌阶段使用的仅指定一个目标的牌结算完成后，你可以从牌堆中随机获得一张点数为6的牌。",
			"xinfu_lveming":"掠命",
			"xinfu_lveming_info":"出牌阶段限一次，你可以选择一名装备区装备比你少的角色，令其选择一个点数，然后你进行判定：<br>若点数相同，你对其造成2点伤害；<br>若点数不同，则你随机获得其区域内的一张牌。",
			"xinfu_tunjun":"屯军",
			"xinfu_tunjun_info":"限定技，出牌阶段，你可以选择一名角色，令其随机使用牌堆中的X张装备牌。(X为你发动过“掠命”的次数)",
			"xinfu_tanbei":"贪狈",
			"xinfu_tanbei_info":"出牌阶段限一次，你可以令一名其他角色选择一项：<br>1.令你随机获得其区域内的一张牌，本回合内你不能对其使用牌。<br>2.令你此回合内对其使用牌没有次数与距离限制。",
			"xinfu_sidao":"伺盗",
			"xinfu_sidao_info":"出牌阶段限一次，当你对一名其他角色连续使用两张牌后，你可以将一张手牌当做【顺手牵羊】对其使用。",
			"tanbei_effect1":"贪狈",
			"tanbei_effect1_info":"",
			"tanbei_effect2":"贪狈",
			"tanbei_effect2_info":"",
			
			"xinfu_tunan":"图南",
			"xinfu_tunan_info":"出牌阶段限一次，你可以展示牌堆顶的一张牌并选择一名其他角色，然后该角色选择一项：使用此牌（无距离限制）；或将此牌当普通【杀】使用。",
			"xinfu_bijing":"闭境",
			"xinfu_bijing_info":"结束阶段，你可以展示一张手牌并标记为“闭境”。若你于回合外失去“闭境”牌，则当前回合角色的弃牌阶段开始时其需弃置两张牌。你的准备阶段，弃置手牌中的“闭境”牌。",
			"xinfu_zhenxing":"镇行",
			"xinfu_zhenxing_info":"结束阶段开始时或当你受到伤害后，你可以观看牌堆顶的至多三张牌，然后你获得其中与其余牌花色均不相同的一张牌。",
			"xinfu_qianxin":"遣信",
			"xinfu_qianxin_info":"出牌阶段限一次，若牌堆中没有“信”，你可以选择一名角色并将任意张手牌放置于牌堆中X倍数的位置（X为存活人数），称为“信”。该角色的弃牌阶段开始时，若其本回合内获得过“信”，其选择一项：令你将手牌摸至四张；本回合手牌上限-2。",
			"qianxin_effect":"遣信",
			"qianxin_effect_info":"",
			"xinfu_qianxin2":"遣信",
			"xinfu_qianxin2_info":"",
			
			"xinfu_fuhai":"浮海",
			"xinfu_fuhai_info":"出牌阶段对每名角色限一次，你可以展示一张手牌并选择上家或下家。该角色展示一张手牌，若你的牌点数大于等于他的牌点数，你弃置你展示的牌，然后继续对其上家或下家重复此流程；你的牌点数小于该角色牌的点数，则该角色弃置其展示的牌，然后你与其各摸X张牌（X为你此回合内发动此技能选择的角色数），且你此阶段内不能再发动“浮海”。",
			"fuhai_clear":"浮海",
			"fuhai_clear_info":"",
			
			"xz_xunxun":"恂恂",
			"xz_xunxun_info":"摸牌阶段，你可以观看牌堆顶的四张牌，然后将其中的两张牌置于牌堆顶，并将其余的牌以任意顺序置于牌堆底。",
			"xinfu_xingzhao":"兴棹",
			"xinfu_xingzhao_info":"锁定技，若场上的已受伤角色合计为：1个以上，你视为拥有技能〖恂恂〗；2个以上，当你使用装备牌时，摸一张牌；3个以上，你跳过弃牌阶段。",
			"xinfu_xingzhao2":"兴棹",
			"xinfu_xingzhao2_info":"",
			"xinfu_dianhu":"点虎",
			"xinfu_dianhu_info":"锁定技，游戏开始时，你选择一名其他角色。当其受到来自你的伤害后或回复体力后，你摸一张牌。",
			"xinfu_dianhu2":"点虎",
			"xinfu_dianhu2_info":"",
			"xinfu_jianji":"谏计",
			"xinfu_jianji_info":"出牌阶段限一次，你可以令一名其他角色摸一张牌。然后，该角色可以使用此牌。",
			"xinfu_lianpian":"联翩",
			"xinfu_lianpian_info":"出牌阶段限三次。当你对一名角色连续使用牌时，你可以摸一张牌，然后可以将一张牌交给该角色。",
			
			"xinfu_lingren":"凌人",
			"xinfu_lingren_info":"每回合限一次。当你于出牌阶段使用带有“伤害”这一标签的基本牌或普通锦囊牌指定目标后，你可以猜测其中的一个目标的手牌中是否有基本牌，锦囊牌或装备牌。若你猜中的项目数：≥1，此牌对该角色的伤害+1；≥2，你摸两张牌；≥3，你获得技能〖奸雄〗和〖行殇〗直到下回合开始。",
			"lingren_adddamage":"凌人",
			"lingren_adddamage_info":"",
			"lingren_jianxiong":"奸雄",
			"lingren_jianxiong_info":"当你受到伤害后，你可以获得对你造成伤害的牌并摸一张牌。",
			"lingren_xingshang":"行殇",
			"lingren_xingshang_info":"当有角色死亡后，你可以选择一项：1.回复一点体力。2.获得该角色的所有牌。",
			"xinfu_fujian":"伏间",
			"xinfu_fujian_info":"锁定技，结束阶段，你观看一名随机的其他角色的随机X张手牌。(X为场上手牌最少的角色的手牌数)",
			"xinfu_xionghuo":"凶镬",
			"xinfu_xionghuo_info":"游戏开始时，你获得3个“暴戾”标记。出牌阶段，你可以交给一名其他角色一个“暴戾”标记，你对有此标记的角色造成的伤害+1，且其出牌阶段开始时，移去“暴戾”并随机执行一项：1.受到1点火焰伤害且本回合不能对你使用【杀】；2.流失1点体力且本回合手牌上限-1；3.你随机获得其一张手牌和一张装备区里的牌。",
			xionghuo:"凶镬",
			"xionghuo_info":"",
			"xionghuo_disable":"凶镬",
			"xionghuo_disable_info":"",
			"xionghuo_low":"凶镬",
			"xionghuo_low_info":"",
			"xinfu_shajue":"杀绝",
			"xinfu_shajue_info":"锁定技，其他角色进入濒死状态时，若其需要超过一张【桃】或【酒】救回，则你获得一个“暴戾”标记，并获得使其进入濒死状态的牌。",
			"xinfu_jianjie":"荐杰",
			"xinfu_jianjie_info":"你的第一个准备阶段，你令两名其他角色分别获得龙印与凤印；出牌阶段限一次（你的第一个回合除外），或当拥有龙印、凤印的角色死亡时，你可以转移龙印、凤印。",
			"xinfu_jianjie1":"荐杰",
			"xinfu_jianjie1_info":"",
			"smh_huoji":"火计",
			"smh_huoji_info":"",
			"smh_lianhuan":"连环",
			"smh_lianhuan_info":"",
			"xinfu_jianjie2":"荐杰",
			"xinfu_jianjie2_info":"",
			"smh_lianhuan1":"连铸",
			"smh_lianhuan1_info":"",
			"smh_yeyan":"业炎",
			"smh_yeyan_info":"",
			"xinfu_yinshi":"隐士",
			"xinfu_yinshi_info":"锁定技，若你没有龙印、凤印且没装备防具，防止你受到的属性伤害和锦囊牌造成的伤害。",
			"xinfu_chenghao":"称好",
			"xinfu_chenghao_info":"当一名角色受到属性伤害后，若其存活且处于“连环状态”且是伤害传导的起点，你可以观看牌堆顶的X张牌并分配给任意角色（X为横置的角色数量且包含该角色）。",
			"jianjie_faq":"关于龙凤印",
			"jianjie_faq_info":"龙印效果：获得“火计”。凤印效果：获得“连环”。（均一回合限使用三次） 龙凤印齐全：获得“业炎”，“业炎”发动后移除龙凤印。",
			"xinfu_wuniang":"武娘",
			"xinfu_wuniang_info":"当你使用或打出〖杀〗时，你可以获得一名其他角色的一张牌。若如此做，该角色和场上所有的“关索”各摸一张牌。",
			"xinfu_xushen":"许身",
			"xinfu_xushen_info":"限定技，当一名男性角色使用【桃】令你脱离濒死状态时，若场上没有“关索”，则其可以将自己的一张武将牌变更为“关索”。然后你回复一点体力，并获得技能〖镇南〗。",
			"xinfu_zhennan":"镇南",
			"xinfu_zhennan_info":"当你成为【南蛮入侵】的目标时，你可以对一名其他角色造成1-3点随机伤害。",
			"xinfu_falu":"法箓",
			"xinfu_falu_info":"锁定技，游戏开始时，你获得“紫薇”，“后土”，“玉清”，“勾陈”标记各一个。当你的牌因弃置而进入弃牌堆后，根据这些牌的花色，你获得对应的标记：黑桃，你获得1枚“紫薇”；梅花，你获得1枚“后土”；红桃，你获得1枚“玉清”；方块，你获得1枚“勾陈”。（每种标记限拥有1个）",
			"xinfu_dianhua":"点化",
			"xinfu_dianhua_info":"准备阶段或结束阶段，你可以观看牌堆顶的X张牌（X为你的标记数）。若如此做，你将这些牌以任意顺序放回牌堆顶。",
			"xinfu_zhenyi":"真仪",
			"xinfu_zhenyi_info":"你可以在以下时机弃置相应的标记来发动以下效果：当一张判定牌生效前，你可以弃置“紫微”，然后将判定结果改为黑桃5或红桃5；当你处于濒死状态时，你可以弃置“后土”，然后将你的一张手牌当【桃】使用；当你造成伤害时，你可以弃置“玉清”，然后你进行一次判定。若结果为黑色，此伤害+1；当你受到属性伤害后，你可以弃置“勾陈”，然后你从牌堆中随机获得三种类型的牌各一张。",
			"zhenyi_spade":"真仪",
			"zhenyi_spade_info":"",
			"zhenyi_club":"真仪",
			"zhenyi_club_info":"",
			"zhenyi_heart":"真仪",
			"zhenyi_heart_info":"",
			"xinfu_yanyu":"燕语",
			"xinfu_yanyu_info":"任意一名角色的出牌阶段开始时，你可以弃置一张牌。若如此做，则该出牌阶段内，每当与你弃置的牌类别相同的其他牌进入弃牌堆时，你可令任意一名角色获得此牌。每阶段以此法获得的牌不能超过三张。",
			"xinfu_yanyu2":"燕语",
			"xinfu_yanyu2_info":"",
			"xinfu_xiaode":"孝德",
			"xinfu_xiaode_info":"每当有其他角色阵亡后，你可以声明该武将牌的一项技能。若如此做，你获得此技能且不能再发动〖孝德〗直到你的回合结束。(你不能声明觉醒技或主公技)",
			
			"sp_taishici":"太史慈",
			wangcan:"王粲",
			"re_jsp_pangtong":"庞统",
			lvdai:"吕岱",
			"re_zhangliang":"张梁",
			lvqian:"吕虔",
			panjun:"潘濬",
			duji:"杜畿",
			zhoufang:"周鲂",
			yanjun:"严畯",
			liuyao:"刘繇",
			liuyan:"刘焉",
			"xinfu_guolun":"过论",
			"xinfu_guolun_info":"出牌阶段限一次，你可以展示一名其他角色的手牌，然后展示你的一张牌。你与其交换这两张牌，然后展示的牌点数更小的角色摸一张牌。",
			"xinfu_zhanji":"展骥",
			"xinfu_zhanji_info":"锁定技，你的出牌阶段内，当你因摸牌且不是因为此技能效果获得牌时，你额外摸一张牌。",
			"xinfu_songsang":"送丧",
			"xinfu_songsang_info":"限定技，当场上有角色死亡时，你可以回复一点体力（若你未受伤，则改为加一点体力上限）；然后获得技能〖展骥〗。",
			"xinfu_jixu":"击虚",
			"xinfu_jixu_info":"出牌阶段限一次，若你有手牌，你可以令任意数量的体力值相等的其他角色猜测你的手牌中是否有【杀】。然后，你摸X张牌（X为猜错的角色数）。若你有【杀】，则你本回合内使用【杀】时，所有这些角色均成为【杀】的目标；若你没有【杀】，则你弃置所有这些角色的各一张牌。若X为零，你结束出牌阶段。",
			"jixu_sha":"击虚",
			"jixu_sha_info":"",
			"xinfu_sanwen":"散文",
			"xinfu_sanwen_info":"每回合限一次。当你获得牌后，若你的原手牌中有与这些牌名称相同的牌，则你可以展示这些牌，弃置新得到的同名牌并摸两倍的牌。",
			"xinfu_qiai":"七哀",
			"xinfu_qiai_info":"限定技，当你进入濒死状态时，你可以令所有其他角色依次交给你一张牌。",
			"xinfu_denglou":"登楼",
			"xinfu_denglou_info":"限定技，结束阶段，若你没有手牌，则你可以观看牌堆顶的四张牌，依次使用其中的所有基本牌（不能使用则弃置），然后获得其余的牌。",
			"qinguo_use":"勤国",
			"qinguo_use_info":"",
			"xinfu_qinguo":"勤国",
			"xinfu_qinguo_info":"当你使用的装备牌结算完成后，你可以视为使用了一张【杀】；当你因使用或失去装备牌导致装备区内牌的数量发生变化后，若你装备区内牌的数量等于你的体力值，则你回复1点体力。",
			"qinguo_lose":"勤国",
			"qinguo_lose_info":"",
			"xinfu_jijun":"集军",
			"xinfu_jijun_info":"当你于回合内使用非装备牌或武器牌指定了自己为目标时，你可以进行一次判定。然后，你将判定牌置于自己的武将牌上，称之为「方」。",
			"xinfu_fangtong":"方统",
			"xinfu_fangtong_info":"结束阶段，你可以弃置总点数之和为36的一张牌与任意张「方」，并对一名其他角色造成3点雷电伤害。",
			"xinfu_weilu":"威虏",
			"xinfu_weilu_info":"锁定技，当你受到伤害后，伤害来源获得一枚「虏」。你的下个出牌阶段开始时，所有有「虏」的角色将体力失去至1点。此阶段结束后，这些角色回复以此法失去的体力。",
			"weilu_effect":"威虏",
			"weilu_effect_info":"",
			"weilu_effect2":"威虏",
			"weilu_effect2_info":"",
			"xinfu_zengdao":"赠刀",
			"xinfu_zengdao_info":"限定技，出牌阶段，你可以将装备牌内的任意张牌置于一名其他角色的武将牌旁，称之为「刀」。该角色造成伤害时，其须移去一张「刀」，使此伤害+1。",
			"xinfu_zengdao2":"赠刀",
			"xinfu_zengdao2_info":"",
			"xinfu_guanwei":"观微",
			"xinfu_guanwei_info":"每回合限一次。一名角色的出牌阶段结束时，若其于出牌阶段内使用过的牌的数目>1且花色皆相同，则你可以弃置一张牌，令其摸两张牌并进行一个额外的出牌阶段。",
			"xinfu_gongqing":"公清",
			"xinfu_gongqing_info":"锁定技。当你受到伤害时，若伤害来源的攻击范围：<3，则你令此伤害的数值减为1。>3，你令此伤害+1。",
			"xinfu_andong":"安东",
			"xinfu_andong_info":"当你受到伤害时，若伤害来源有手牌，则你可以令伤害来源选择一项：1.令你观看其的手牌并获得其中的所有红桃牌；2.防止此伤害，然后其本回合内的红桃手牌不计入手牌上限。",
			"xinfu_yingshi":"应势",
			"xinfu_yingshi_info":"出牌阶段开始时，若场上的所有角色均没有「酬」，则你可以将所有的红桃牌置于一名其他角色的武将牌旁，称之为「酬」。有「酬」的角色受到「杀」的伤害/死亡时，伤害来源/你获得其中的一张/所有的「酬」。",
			"yingshi_heart":"应势",
			"yingshi_heart_info":"",
			"yingshi_die":"应势",
			"yingshi_die_info":"",
			"xinfu_duanfa":"断发",
			"xinfu_duanfa_info":"出牌阶段，你可以弃置任意张黑色牌，然后摸等量的牌。(每回合内限X张，X为你的体力上限。)",
			"xinfu_youdi":"诱敌",
			"xinfu_youdi_info":"结束阶段开始时，你可以令一名其他角色弃置你的一张手牌，若此牌：不为黑色，你摸一张牌。不为【杀】，你获得该角色的一张牌。",
			"xinfu_guanchao":"观潮",
			"xinfu_guanchao_info":"出牌阶段开始时，你可以选择一项直到回合结束：1.当你使用牌时，若你此阶段使用过的所有牌的点数为递增，你摸一张牌；2.当你使用牌时，若你此阶段使用过的所有牌的点数为递减，你摸一张牌。",
			"xinfu_xunxian":"逊贤",
			"xinfu_xunxian_info":"每名其他角色的回合限一次，当你使用或打出的牌结算完成，即将置入弃牌堆时，你可以将之交给一名手牌比你多的角色。",
			"xinfu_kannan":"戡难",
			"xinfu_kannan_info":"出牌阶段限X次，你可以与一名本回合内未成为过〖戡难〗目标的角色拼点。若你赢，你使用的下一张【杀】的伤害值基数+1，且你本回合内不能再发动〖戡难〗。若你没赢，其使用的下一张【杀】的伤害值基数+1。（X为你的体力值）。",
			"kannan_eff":"戡难",
			"kannan_eff_info":"",
			"xinfu_tushe":"图射",
			"xinfu_tushe_info":"当你使用非装备牌指定目标时，若你没有基本牌，则你可以摸X张牌。（X为此牌指定的目标数）",
			"xinfu_limu":"立牧",
			"xinfu_limu_info":"出牌阶段限一次，将一张方片花色牌当做【乐不思蜀】对自己使用，然后回复1点体力。只要你的判定区内有牌，你对攻击范围内的其他角色使用牌便没有次数和距离限制。",
			
			"xinfu_guhuo":"蛊惑",
			"xinfu_guhuo_info":"每名角色的回合限一次，你可以扣置一张手牌当一张基本牌或普通锦囊牌使用或打出。其他角色依次选择是否质疑。一旦有其他角色质疑则翻开此牌：若为假则此牌作废，若为真，则质疑角色获得技能〖缠怨〗。",
			"guhuo_guess":"蛊惑",
			"guhuo_guess_info":"",
			chanyuan:"缠怨",
			"chanyuan_info":"锁定技，你不能质疑于吉，只要你的体力值为1，你失去你的武将技能。",
			"guhuo_respond":"蛊惑",
			"guhuo_respond_info":"",
			"guhuo_wuxie":"蛊惑",
			"guhuo_wuxie_info":"",
			"guhuo_phase":"蛊惑",
			"guhuo_phase_info":"",
			
			"xinfu_pingcai":"评才",
			"xinfu_pingcai_info":"出牌阶段限一次，你可以挑选一个宝物并擦拭掉其上面的灰尘。然后，你可以根据宝物类型执行对应的效果。<br>【卧龙】：对1名角色造成1点火焰伤害。若场上有存活的诸葛亮(火)，则改为对至多2名角色各造成1点火焰伤害。<br>【凤雏】：横置至多3名角色。若场上有存活的庞统(火)，则改为横置至多4名角色。<br>【水镜】：将1名角色装备区内的防具移动到另1角色对应区域。若场上有存活的司马徽，则改为将1名角色装备区内的1件装备移动到另1角色对应区域。<br>【玄剑】：令1名角色摸一张牌并回复1点体力。若场上有存活的徐庶(将/界)，则改为令1名角色摸一张牌并回复1点体力，然后你摸一张牌。",
			"xinfu_pdgyingshi":"隐世",
			"xinfu_pdgyingshi_info":"锁定技，你始终跳过准备阶段，判定阶段，结束阶段。你不能被选择为延时锦囊牌的目标。",
			"pcaudio_wolong_card":"卧龙",
			"pcaudio_wolong_card_info":"",
			"pcaudio_fengchu_card":"凤雏",
			"pcaudio_fengchu_card_info":"",
			"pcaudio_shuijing_card":"水镜",
			"pcaudio_shuijing_card_info":"",
			"pcaudio_xuanjian_card":"玄剑",
			"pcaudio_xuanjian_card_info":"",
			"yizan_respond_sha":"翊赞",
			"yizan_respond_sha_info":"",
			"yizan_use":"翊赞",
			"yizan_use_info":"你可以将两张牌(其中至少应有一张基本牌)当做任意基本牌使用或打出。",
			"yizan_respond_shan":"翊赞",
			"yizan_respond_shan_info":"",
			"xinfu_longyuan":"龙渊",
			"xinfu_longyuan_info":"觉醒技，当你使用或打出的基本牌结算完成后，若你本局游戏内发动过〖翊赞〗的次数大于等于3，则你将〖翊赞〗描述中的“两张牌”改为“一张牌”。",
			"yizan_count":"翊赞",
			"yizan_count_info":"",
			"xinfu_jingxie1":"精械",
			"xinfu_jingxie1_info":"出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，将体力回复至1点。",
			"xinfu_jingxie2":"精械",
			"xinfu_jingxie2_info":"",
			"xinfu_qiaosi":"巧思",
			"xinfu_qiaosi_info":"出牌阶段限一次，你可以投掷一枚六面骰子，展示牌堆顶的X张牌并获得之。然后，你选择一项：1.交给一名其他角色X张牌。2.弃置X张牌。(X为骰子的点数)",
			"xinfu_jijie":"机捷",
			"xinfu_jijie_info":"出牌阶段限一次。你可以观看牌堆底的一张牌，然后将其交给一名角色。",
			"xinfu_jiyuan":"急援",
			"xinfu_jiyuan_info":"当一名角色进入濒死状态时，或者你交给一名其他角色牌时，你可以令其摸一张牌。",
			"xinfu_daigong":"怠攻",
			"xinfu_daigong_info":"每回合限一次。当你受到伤害时，你可以展示所有手牌，然后令伤害来源选择一项：交给你一张与你所有手牌花色均不相同的一张牌，或防止此伤害。",
			"xinfu_zhaoxin":"昭心",
			"xinfu_zhaoxin_info":"出牌阶段限一次，你可以将任意张手牌置于武将牌上，称之为「望」（你至多拥有三张「望」）。你攻击范围内的一名其他角色的摸牌阶段结束后，其可以获得一张由你选择的「望」，然后你可以对其造成1点伤害。",
			"zhaoxin_give":"昭心",
			"zhaoxin_give_info":"",
			"xinfu_qianchong":"谦冲",
			"xinfu_qianchong_info":"锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能〖明哲〗。均为黑色，则你视为拥有技能〖帷幕〗。若均不满足，则出牌阶段开始时，你可以选择一种类别的牌，然后你本回合内使用该类别的牌时没有次数和距离限制。",
			"qc_weimu":"帷幕",
			"qc_weimu_info":"",
			"qc_mingzhe":"明哲",
			"qc_mingzhe_info":"",
			"xinfu_shangjian":"尚俭",
			"xinfu_shangjian_info":"一名角色的结束阶段开始时，若你于此阶段失去了x张或更少的牌，则你可以摸等量的牌。（x为你的体力值）。",
			"rw_bagua_skill":"先天八卦阵",
			"rw_bagua_skill_info":"每当你需要使用或打出一张【闪】时，你可以进行一次判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rw_baiyin_skill":"玉照狮子盔",
			"rw_baiyin_skill_info":"锁定技，你每次受到伤害时，最多承受1点伤害（防止多余的伤害）；当你失去装备区里的【玉照狮子盔】时，你回复1点体力并摸两张牌。",
			"rw_lanyinjia":"精银甲",
			"rw_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rw_minguangkai_cancel":"耀光铠",
			"rw_minguangkai_cancel_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_minguangkai_link":"耀光铠",
			"rw_minguangkai_link_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_renwang_skill":"仁王金刚盾",
			"rw_renwang_skill_info":"有花色且不为方片的杀对你无效。",
			"rw_tengjia1":"桐油百炼甲",
			"rw_tengjia1_info":"锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效。你每次受到火焰伤害时，该伤害+1。你不会被横置。",
			"rw_tengjia2":"桐油百炼甲",
			"rw_tengjia2_info":"锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效。你每次受到火焰伤害时，该伤害+1。你不会被横置。",
			"rw_tengjia3":"桐油百炼甲",
			"rw_tengjia3_info":"锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效。你每次受到火焰伤害时，该伤害+1。你不会被横置。",
			"rw_tengjia4":"桐油百炼甲",
			"rewrite_bagua":"先天八卦阵",
			"rewrite_bagua_info":"每当你需要使用或打出一张【闪】时，你可以进行一次判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rewrite_baiyin":"玉照狮子盔",
			"rewrite_baiyin_info":"锁定技，你每次受到伤害时，最多承受1点伤害（防止多余的伤害）；当你失去装备区里的【玉照狮子盔】时，你回复1点体力并摸两张牌。",
			"rewrite_lanyinjia":"精银甲",
			"rewrite_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rewrite_minguangkai":"耀光铠",
			"rewrite_minguangkai_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rewrite_renwang":"仁王金刚盾",
			"rewrite_renwang_info":"有花色且不为方片的杀对你无效。",
			"rewrite_tengjia":"桐油百炼甲",
			"rewrite_tengjia_info":"锁定技，【南蛮入侵】、【万箭齐发】和普通【杀】对你无效。你每次受到火焰伤害时，该伤害+1。你不会被横置。",
			"rewrite_zhuge":"元戎精械弩",
			"rewrite_zhuge_info":"你于出牌阶段内使用【杀】无次数限制。",
			takaramono:"宝物",
			"wolong_card":"卧龙",
			"wolong_card_info":"对1名角色造成1点火焰伤害。若场上有存活的诸葛亮(火)，则改为对至多2名角色各造成1点火焰伤害。",
			"fengchu_card":"凤雏",
			"fengchu_card_info":"横置至多3名角色。若场上有存活的庞统(火)，则改为横置至多4名角色。",
			"xuanjian_card":"玄剑",
			"xuanjian_card_info":"令1名角色摸一张牌并回复1点体力。若场上有存活的徐庶(将/界)，则改为令1名角色摸一张牌并回复1点体力，然后你摸一张牌。",
			"shuijing_card":"水镜",
			"shuijing_card_info":"将1名角色装备区内的防具移动到另1角色对应区域。若场上有存活的司马徽，则改为将1名角色装备区内的1件装备移动到另1角色对应区域。",
		},
	};
});
