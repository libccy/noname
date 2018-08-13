'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenhua',
		connect:true,
		connectBanned:['zuoci'],
		character:{
			xiahouyuan:['male','wei',4,['xinshensu']],
			caoren:['male','wei',4,['xinjushou','xinjiewei']],
			huangzhong:['male','shu',4,['xinliegong']],
			weiyan:['male','shu',4,['xinkuanggu','qimou']],
			xiaoqiao:['female','wu',3,['retianxiang','hongyan']],
			zhoutai:['male','wu',4,['buqu','fenji']],
			sp_zhangjiao:['male','qun',3,['releiji','guidao','huangtian'],['zhu']],
			// yuji:['male','qun',3,['guhuo']],
			// xin_yuji:['male','qun',3,['guhuo']],

			sp_zhugeliang:['male','shu',3,['huoji','bazhen','kanpo']],
			pangtong:['male','shu',3,['xinlianhuan','niepan']],
			xunyu:['male','wei',3,['quhu','jieming']],
			dianwei:['male','wei',4,['xinqiangxi']],
			taishici:['male','wu',4,['tianyi']],
			yanwen:['male','qun',4,['shuangxiong']],
			re_yuanshao:['male','qun',4,['reluanji','xueyi'],['zhu']],
			pangde:['male','qun',4,['mashu','jianchu']],

			menghuo:['male','shu',4,['huoshou','zaiqi']],
			zhurong:['female','shu',4,['juxiang','lieren']],
			caopi:['male','wei',3,['xingshang','fangzhu','songwei'],['zhu']],
			xuhuang:['male','wei',4,['duanliang','jiezi']],
			re_lusu:['male','wu',3,['haoshi','redimeng']],
			sunjian:['male','wu',4,['yinghun']],
			dongzhuo:['male','qun',8,['jiuchi','roulin','benghuai','baonue'],['zhu']],
			jiaxu:['male','qun',3,['luanwu','wansha','weimu']],

			jiangwei:['male','shu',4,['tiaoxin','zhiji']],
			liushan:['male','shu',3,['xiangle','fangquan','ruoyu'],['zhu']],
			zhanghe:['male','wei',4,['qiaobian']],
			dengai:['male','wei',4,['tuntian','zaoxian']],
			sunce:['male','wu',4,['jiang','hunzi','zhiba'],['zhu']],
			zhangzhang:['male','wu',3,['zhijian','guzheng']],
			caiwenji:['female','qun',3,['beige','duanchang']],
			zuoci:['male','qun',3,['huashen','xinsheng']],
		},
		perfectPair:{
			jiaxu:['liqueguosi'],
			yuanshao:['yanwen'],
			menghuo:['zhurong'],
			sp_zhugeliang:['pangtong'],
			sunce:['zhouyu','taishici','daqiao'],
			zuoci:['yuji'],
			xunyu:['xunyou'],
		},
		characterFilter:{
			zuoci:function(mode){
				return mode!='guozhan';
			}
		},
		characterIntro:{
			huangzhong:'字汉升，今河南南阳人。汉末三国时期蜀汉名将。本为刘表部下中郎将，后归刘备，并助刘备攻益州刘璋，在定军山一战中阵斩曹操部下名将夏侯渊。备称汉中王后改封后将军，赐关内侯。',
			weiyan:'字文长，义阳人。三国时期蜀汉名将，诸葛亮死后，魏延因被陷害谋反而遭杨仪一党所杀。',
			xiahouyuan:'字妙才，沛国谯人。东汉末年曹操部下名将，夏侯惇之族弟，八虎骑之一。群雄征讨董卓时随曹操一同起兵，后征战四方，屡立功勋。在平定马超叛乱后负责西北防线的镇守。公元219年刘备攻打汉中，被刘备部将黄忠所杀。',
			caoren:'字子孝，沛国谯人，曹操的从弟。三国时期曹魏名将，官至大司马。谥曰忠侯。',
			xiaoqiao:'庐江皖县人也。父桥国老德尊于时。小乔国色流离，资貌绝伦。建安三年，周瑜协策攻皖，拔之。娶小乔为妻。后人谓英雄美女，天作之合。',
			zhoutai:'字幼平，九江下蔡人，三国时期吴国武将。早年与蒋钦随孙策左右，立过数次战功。孙策讨伐六县山贼时，周泰胆气绝伦，保卫孙权，勇战退敌，身受十二处伤。有诗云：三番救主出重围，忠勇如公世所稀。遍体疮痍犹痛饮，血痕残酒满征衣。',
			yuji:'自号太平道人，琅琊人，在吴郡、会稽一带为百姓治病，甚得人心。孙策怒之，以惑人心为由斩之，后策常受吉咒而亡。',
			zhangjiao:'乱世的开始，黄巾起义军首领，太平道创始人。张角早年信奉黄老学说，对在汉代十分流行的谶纬之学也深有研究，对民间医术 、巫术也很熟悉。',
			dianwei:'己吾城村人。东汉末年曹魏猛将。擅使大双戟，为人壮猛任侠，曾为乡人刘氏报仇，杀人出市，人莫敢近。相貌魁梧，膂力过人。建安二年（197），张绣背叛曹操，典韦为保护曹操而独挡叛军，击杀多人，但最终因寡不敌众而战死。',
			xunyu:'荀彧，字文若，颍川颍阴（今河南许昌）人。东汉末年曹操帐下首席谋臣，杰出的战略家。自小被世人称作“王佐之才”。',
			pangtong:'庞统，字士元，襄阳（治今湖北襄阳）人。三国时刘备帐下谋士，官拜军师中郎将。才智与诸葛亮齐名，人称“凤雏”。在进围雒县时，统率众攻城，不幸被流矢击中去世，时年三十六岁。追赐统为关内侯，谥曰靖侯。庞统死后，葬于落凤庞统墓坡。',
			sp_zhugeliang:'字孔明，号卧龙居士，琅琊阳都人。刘备曾“三顾茅庐”得见卧龙。卧龙以一篇《隆中对》分析天下形势，提出先取荆州，再取益州成鼎足之势的说法。《三国演义》中的诸葛亮善用“火攻”，曾用火攻战术赢得多场战役，如“火烧赤壁”、“火烧博望坡”、“火烧藤甲兵”等。',
			taishici:'太史慈，字子义，东莱黄县（今山东龙口东黄城集）人。东汉末年武将，守言应诺，恪遵信义，始终如一，弭息诽论。官至建昌都尉。弓马熟练，箭法精良。原为刘繇部下，后被孙策收降，于赤壁之战前病逝，死时才四十一岁。',
			pangde:'字令明，东汉末年雍州南安郡狟道县（今甘肃天水市武山县四门镇）人。曹操部下重要将领。官至立义将军，拜关门亭侯。谥曰壮侯。有一子庞会。',
			yanwen:'东汉末年河北袁绍部下武将，素有威名。颜良与文丑一起作为袁绍军队的勇将而闻名。建安四年（199），袁绍以颜良、文丑为将，率精卒十万，准备攻许都；次年，兵进黎阳，遣颜良攻白马。终均亡于关羽刀下。',
			yuanshao:'字本初，汉族，汝南汝阳人，出身名门望族，自曾祖父起四代有五人位居三公，自己也居三公之上，其家族也因此有“四世三公”之称。曾于初平元年被推举为反董卓联合军的盟主，联军瓦解后，在汉末群雄割据的过程中，袁绍先占据冀州，又先后夺青、并二州，并于建安四年击败了割据幽州的军阀公孙瓒，势力达到顶点；但在建安五年的官渡之战中败于曹操。在平定冀州叛乱之后，于建安七年病死。',
			xuhuang:'字公明，河东杨人。三国时期曹魏名将，本为杨奉帐下骑都尉，杨奉被曹操击败后转投曹操，在曹操手下多立功勋，参与官渡、赤壁、关中征伐、汉中征伐等几次重大战役。',
			caopi:'字子桓，三国时期著名的政治家、文学家，曹魏的开国皇帝，公元220－226年在位。沛国谯人，魏武帝曹操与武宣卞皇后的长子。去世后庙号高祖，谥为文皇帝，葬于首阳陵。',
			sunjian:'字文台，汉族，吴郡富春人。东汉末期地方军阀，著名将领。史书说他“容貌不凡，性阔达，好奇节”，是大军事家孙武的后裔。汉末群雄之一，三国中吴国的奠基人。孙权建国后，追谥孙坚为武烈皇帝。',
			dongzhuo:'字仲颖，陇西临洮人。东汉末年少帝、献帝时权臣，西凉军阀。官至太师、郿侯。其为人残忍嗜杀，倒行逆施，招致群雄联合讨伐，但联合军在董卓迁都长安不久后瓦解。后被其亲信吕布所杀。',
			zhurong:'据传为火神祝融氏后裔，南蛮王孟获之妻。武艺超群，善使飞刀，是《三国演义》中写到的唯一真正上过战场的女性。曾与孟获一起抵抗蜀军，在诸葛亮七擒七纵孟获之后，随孟获投降蜀汉。',
			menghuo:'中国三国时期南中少数族首领。系东汉末益州建宁郡( 今云南晋宁东 )大姓，身材肥硕。生卒年不详。官至御史中丞。曾被诸葛亮七擒七纵，传为佳话。',
			jiaxu:'字文和，武威姑臧人。三国时期魏国著名谋士。曾先后担任三国军阀李傕、张绣、曹操的谋士。官至魏国太尉，谥曰肃侯。',
			lusu:'字子敬，汉族，临淮东城人，中国东汉末年东吴的著名军事统帅。他曾为孙权提出鼎足江东的战略规划，因此得到孙权的赏识，于周瑜死后代替周瑜领兵，守陆口。曾单刀赴会关羽于荆州。',
			zhanghe:'字儁乂，河间鄚人。三国时期魏国名将。官渡之战时，本为袁绍部将的张郃投降了曹操，并在曹操帐下多立功勋，于曹魏建立后加封为征西车骑将军。诸葛亮六出祁山之间，张郃多次抵御蜀军的进攻，于公元231年在木门道被诸葛亮设伏射死。后谥曰壮侯。为曹魏“五子良将”之一。',
			dengai:'字士载，义阳棘阳人。三国时期魏国杰出的军事家、将领。公元263年他与钟会分别率军攻打蜀汉，最后他率先进入成都，使得蜀汉灭亡。后因遭到钟会的污蔑和陷害，被司马昭猜忌而被收押，最后与其子邓忠一起被卫瓘派遣的武将田续所杀害。',
			jiangwei:'字伯约，天水冀人。三国时期蜀汉著名将领、军事统帅。原为曹魏天水郡的中郎将，后降蜀汉，官至凉州刺史、大将军。诸葛亮去世后继承诸葛亮的遗志，继续率领蜀汉军队北伐曹魏，与曹魏名将陈泰、郭淮、邓艾等多次交手。',
			liushan:'蜀汉后主，字公嗣。小名阿斗。刘备之子，母亲是昭烈皇后甘氏。三国时期蜀汉第二位皇帝，公元223－263年在位。公元263年蜀汉被曹魏所灭，刘禅投降曹魏，被封为安乐公。',
			sunce:'字伯符，吴郡富春人。孙坚长子，孙权长兄。东汉末年割据江东一带的军阀，汉末群雄之一，三国时期吴国的奠基者。三国演义中绰号“小霸王”，统一江东。在一次狩猎中为刺客所伤，不久后身亡，年仅二十六岁。其弟孙权接掌孙策势力，并于称帝后，追谥孙策为长沙桓王。',
			zhangzhang:'张昭，字子布，彭城人，三国时期吴国重臣，善丹青。拜辅吴将军，班亚三司，改封娄侯。年八十一卒，谥曰文侯。张纮，字子纲，广陵人。东吴谋士，和张昭一起合称“二张”。孙策平定江东时亲自登门邀请，张纮遂出仕为官。张纮后来建议孙权迁都秣陵，孙权正在准备时张纮病逝，其年六十岁。孙权为之流涕。',
			zuoci:'左慈，字元放，东汉末方士，汉族，庐江（今安徽庐江西南）人。在道教历史上，东汉时期的丹鼎派道术是从他一脉相传。',
			caiwenji:'名琰，原字昭姬，晋时避司马昭讳，改字文姬，东汉末年陈留圉（今河南开封杞县）人，东汉大文学家蔡邕的女儿，是中国历史上著名的才女和文学家，精于天文数理，既博学能文，又善诗赋，兼长辩才与音律。代表作有《胡笳十八拍》、《悲愤诗》等 。',
		},
		skill:{
			xinjushou:{
				audio:'jushou',
				trigger:{player:'phaseEnd'},
				content:function(){
					'step 0'
					player.draw(4);
					player.turnOver();
					'step 1'
					player.chooseCard('h',true,'弃置一张手牌，若以此法弃置的是装备牌，则你改为使用之').set('ai',function(card){
						if(get.type(card)=='equip'){
							return 5-get.value(card);
						}
						return -get.value(card);
					}).set('filterCard',lib.filter.cardDiscardable);
					'step 2'
					if(result.bool&&result.cards.length){
						if(get.type(result.cards[0])=='equip'){
							player.$give(result.cards,player);
							player.lose(result.cards,ui.special);
							event.toequip=result.cards[0];
						}
						else{
							player.discard(result.cards[0]);
						}
					}
					'step 3'
					if(event.toequip){
						game.delay();
					}
					'step 4'
					if(event.toequip){
						player.equip(event.toequip);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='guiyoujie') return [0,1];
						}
					}
				},
			},
			xinjiewei:{
				audio:'yanzheng',
				enable:'chooseToUse',
				filterCard:true,
				position:'e',
				viewAs:{name:'wuxie'},
				filter:function(event,player){
					return player.countCards('e')>0;
				},
				viewAsFilter:function(player){
					return player.countCards('e')>0;
				},
				prompt:'将一张装备区内的牌当无懈可击使用',
				check:function(card){return 8-get.equipValue(card)},
				threaten:1.2,
				group:'xinjiewei_move',
				subSkill:{
					move:{
						trigger:{player:'turnOverEnd'},
						direct:true,
						audio:'jiewei',
						filter:function(event,player){
							return !player.isTurnedOver()&&player.canMoveCard();
						},
						content:function(){
							"step 0"
							player.chooseToDiscard('he',get.prompt('xinjiewei'),'弃置一张牌并移动场上的一张牌',lib.filter.cardDiscardable).set('ai',function(card){
								if(!_status.event.check) return 0;
								return 7-get.value(card);
							}).set('check',player.canMoveCard(true)).set('logSkill','xinjiewei');
							"step 1"
							if(result.bool){
								player.moveCard(true);
							}
							else{
								event.finish();
							}
						}
					}
				}
			},
			jianchu:{
				trigger:{player:'shaBegin'},
				filter:function(event){
					return event.target.countCards('he')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.discardPlayerCard(trigger.target,get.prompt('jianchu',trigger.target)).set('ai',function(button){
						if(!_status.event.att) return 0;
						if(get.position(button.link)=='e') return get.value(button.link);
						return 1;
					}).set('logSkill',['jianchu',trigger.target]).set('att',get.attitude(player,trigger.target)<=0);
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						if(get.type(result.links[0])=='equip'){
							trigger.directHit=true;
						}
						else if(trigger.cards){
							trigger.target.gain(trigger.cards,'gain2','log');
						}
					}
				}
			},
			redimeng:{
				audio:'dimeng',
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:function(){
					if(ui.selected.targets.length==2) return false;
					return true;
				},
				selectCard:[0,Infinity],
				selectTarget:2,
				complexCard:true,
				complexSelect:true,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(ui.selected.targets.length==0) return true;
					return (Math.abs(ui.selected.targets[0].countCards('h')-target.countCards('h'))==
						ui.selected.cards.length);
				},
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					var cards=targets[0].getCards('h').concat(targets[1].getCards('h'));
					var dialog=ui.create.dialog('缔盟',true);
					if(player.isUnderControl(true)||targets[0].isUnderControl(true)||targets[1].isUnderControl(true)){
						dialog.add(cards);
						dialog.seeing=true;
					}
					else{
						dialog.add([cards,'blank']);
					}
					_status.dieClose.push(dialog);
					dialog.videoId=lib.status.videoId++;
					game.addVideo('cardDialog',null,['缔盟',get.cardsInfo(cards),dialog.videoId]);
					game.broadcast(function(cards,id,player,targets){
						var dialog=ui.create.dialog('缔盟',true);
						if(player.isUnderControl(true)||targets[0].isUnderControl(true)||targets[1].isUnderControl(true)){
							dialog.add(cards);
							dialog.seeing=true;
						}
						else{
							dialog.add([cards,'blank']);
						}
						_status.dieClose.push(dialog);
						dialog.videoId=id;
					},cards,dialog.videoId,player,targets);

					event.current=targets[0];
					event.dialog=dialog;
					event.num1=0;
					event.num2=0;
					game.delay();
					'step 1'
					if(event.dialog.buttons.length>1){
						var next=event.current.chooseButton(true,function(button){
							return get.value(button.link,_status.event.player);
						});
						next.set('dialog',event.dialog.videoId);
						next.set('closeDialog',false);
						next.set('dialogdisplay',true);
					}
					else{
						event.directButton=event.dialog.buttons[0];
					}
					'step 2'
					var dialog=event.dialog;
					var card;
					if(event.directButton){
						card=event.directButton.link;
					}
					else{
						card=result.links[0];
					}
					for(var i=0;i<dialog.buttons.length;i++){
						if(dialog.buttons[i].link==card){
							var button=dialog.buttons[i];
							if(dialog.seeing){
								button.querySelector('.info').innerHTML=get.translation(event.current.name);
								if(!_status.connectMode){
									game.log(event.current,'选择了',button.link);
								}
							}
							dialog.buttons.remove(button);
							break;
						}
					}
					if(card){
						event.current.gain(card);
						if(dialog.seeing){
							event.current.$draw(card,'nobroadcast');
						}
						else{
							event.current.$draw(1,'nobroadcast');
						}
						game.broadcast(function(card,id,target){
							var dialog=get.idDialog(id);
							if(dialog&&dialog.seeing){
								for(var i=0;i<dialog.buttons.length;i++){
									if(dialog.buttons[i].link==card){
										dialog.buttons[i].querySelector('.info').innerHTML=get.translation(target.name);
										dialog.buttons.splice(i--,1);
										break;
									}
								}
								target.$draw(card,'nobroadcast');
							}
							else{
								target.$draw(1,'nobroadcast');
							}
						},card,dialog.videoId,event.current);
					}
					game.delay(2);
					if(event.current==targets[0]){
						event.num1++;
						event.current=targets[1];
					}
					else{
						event.num2++;
						event.current=targets[0];
					}
					if(dialog.buttons.length){
						event.goto(1);
					}
					'step 3'
					if(!_status.connectMode){
						game.log(targets[0],'获得了'+get.cnNumber(event.num1)+'张牌');
						game.log(targets[1],'获得了'+get.cnNumber(event.num2)+'张牌');
					}
					var dialog=event.dialog;
					dialog.close();
					_status.dieClose.remove(dialog);
					game.broadcast(function(id){
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
							_status.dieClose.remove(dialog);
						}
					},dialog.videoId);
					game.addVideo('cardDialog',null,dialog.videoId);
				},
				targetprompt:['先拿牌','后拿牌'],
				find:function(type){
					var list=game.filterPlayer(function(current){
						return current!=player&&get.attitude(player,current)>3;
					});
					var player=_status.event.player;
					var num=player.countCards('he',function(card){
						return get.value(card)<7;
					});
					var count=null;
					var from,nh;
					if(list.length==0) return null;
					list.sort(function(a,b){
						return a.countCards('h')-b.countCards('h');
					});
					if(type==1) return list[0];
					from=list[0];
					nh=from.countCards('h');

					list=game.filterPlayer(function(current){
						return current!=player&&get.attitude(player,current)<1;
					});
					if(list.length==0) return null;
					list.sort(function(a,b){
						return b.countCards('h')-a.countCards('h');
					});
					for(var i=0;i<list.length;i++){
						var nh2=list[i].countCards('h');
						if(nh2-nh<=num){
							count=nh2-nh;break;
						}
					}
					if(count==null||count<0) return null;
					if(type==3) return count;
					return list[i];
				},
				check:function(card){
					var count=lib.skill.redimeng.find(3);
					if(count==null) return -1;
					if(ui.selected.cards.length<count) return 7-get.value(card);
					return -1;
				},
				ai:{
					order:8,
					threaten:1.6,
					expose:0.5,
					result:{
						player:function(player,target){
							if(ui.selected.targets.length==0){
								if(target==lib.skill.redimeng.find(1)) return 1;
								return 0;
							}
							else{
								if(target==lib.skill.redimeng.find(2)) return 1;
								return 0;
							}
						}
					}
				}
			},
			xinlianhuan:{
				group:['lianhuan3','lianhuan2','lianhuan4'],
			},
			lianhuan3:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{suit:'club'})>0;
				},
				filterCard:{suit:'club'},
				viewAs:{name:'tiesuo'},
				prompt:'将一张梅花牌当铁锁连环使用',
				check:function(card){return 6-get.value(card)},
				ai:{
					order:7.5,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length) return 0;
							if(target.isLinked()) return 1;
							return -1;
						}
					}
				}
			},
			lianhuan4:{
				trigger:{player:'useCard'},
				filter:function(event){
					return event.skill=='lianhuan3'&&event.targets.length==1;
				},
				forced:true,
				popup:false,
				content:function(){
					player.draw();
				}
			},
			reluanji:{
				audio:'luanji',
				enable:'phaseUse',
				viewAs:{name:'wanjian'},
				filterCard:function(card,player){
					if(!player.storage.reluanji) return true;
					return !player.storage.reluanji.contains(get.suit(card));
				},
				selectCard:2,
				check:function(card){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return player.canUse('wanjian',current);
					});
					var num=0;
					for(var i=0;i<targets.length;i++){
						var eff=get.sgn(get.effect(targets[i],{name:'wanjian'},player,player));
						if(targets[i].hp==1){
							eff*=1.5;
						}
						num+=eff;
					}
					if(!player.needsToDiscard(-1)){
						if(targets.length>=7){
							if(num<2) return 0;
						}
						else if(targets.length>=5){
							if(num<1.5) return 0;
						}
					}
					return 6-get.value(card);
				},
				ai:{
					basic:{
						order:10
					}
				},
				group:['reluanji_count','reluanji_reset','reluanji_respond'],
				subSkill:{
					reset:{
						trigger:{player:'phaseAfter'},
						silent:true,
						filter:function(event,player){
							return player.storage.reluanji?true:false;
						},
						content:function(){
							delete player.storage.reluanji;
						}
					},
					count:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event){
							return event.skill=='reluanji';
						},
						content:function(){
							if(!player.storage.reluanji){
								player.storage.reluanji=[];
							}
							for(var i=0;i<trigger.cards.length;i++){
								player.storage.reluanji.add(get.suit(trigger.cards[i]));
							}
						}
					},
					respond:{
						trigger:{global:'respond'},
						silent:true,
						filter:function(event){
							return event.getParent(2).skill=='reluanji'&&event.player.isDamaged();
						},
						content:function(){
							trigger.player.draw();
						}
					}
				}
			},
			qimou:{
				unique:true,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.storage.qimou;
				},
				init:function(player){
					player.storage.qimou=false;
				},
				mark:true,
				intro:{
					content:'limited'
				},
				skillAnimation:'legend',
				animationColor:'metal',
				content:function(){
					'step 0'
					var shas=player.getCards('h','sha');
					var num;
					if(player.hp>=4&&shas.length>=3){
						num=3;
					}
					else if(player.hp>=3&&shas.length>=2){
						num=2;
					}
					else{
						num=1
					}
					player.awakenSkill('qimou');
					player.storage.qimou=true;
					player.chooseControl('一','二','三','四','五','六',function(){
						return get.cnNumber(_status.event.goon,true);
					}).set('prompt','失去任意点体力').set('goon',num);
					'step 1'
					var num;
					switch(result.control){
						case '一':num=1;break;
						case '二':num=2;break;
						case '三':num=3;break;
						case '四':num=4;break;
						case '五':num=5;break;
						case '六':num=6;break;
					}
					player.storage.qimou2=num;
					player.loseHp(num);
					player.addTempSkill('qimou2');
				},
				ai:{
					order:2,
					result:{
						player:function(player){
							if(player.hp==1) return 0;
							var shas=player.getCards('h','sha');
							if(!shas.length) return 0;
							var card=shas[0];
							if(!lib.filter.cardEnabled(card,player)) return 0;
							if(lib.filter.cardUsable(card,player)) return 0;
							var mindist;
							if(player.hp>=4&&shas.length>=3){
								mindist=4;
							}
							else if(player.hp>=3&&shas.length>=2){
								mindist=3;
							}
							else{
								mindist=2;
							}
							if(game.hasPlayer(function(current){
								return (current.hp<=mindist-1&&
									get.distance(player,current,'attack')<=mindist&&
									player.canUse(card,current,false)&&
									get.effect(current,card,player,player)>0);
							})){
								return 1;
							}
							return 0;
						}
					}
				}
			},
			qimou2:{
				onremove:true,
				mod:{
					cardUsable:function(card,player,num){
						if(typeof player.storage.qimou2=='number'&&card.name=='sha'){
							return num+player.storage.qimou2;
						}
					},
					globalFrom:function(from,to,distance){
						if(typeof from.storage.qimou2=='number'){
							return distance-from.storage.qimou2;
						}
					}
				}
			},
			xinkuanggu:{
				trigger:{source:'damageEnd'},
				filter:function(event,player){
					return get.distance(player,event.player)<=1&&event.num>0;
				},
				direct:true,
				audio:'kuanggu',
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					player.chooseDrawRecover(get.prompt('xinkuanggu')).set('logSkill','xinkuanggu');
					'step 2'
					if(result.control!='cancel2'){
						event.num--;
						if(event.num>0){
							event.goto(1);
						}
					}
				}
			},
			xinliegong:{
				mod:{
					targetInRange:function(card,player,target){
						if(card.name=='sha'&&card.number){
							if(get.distance(player,target)<=card.number) return true;
						}
					}
				},
				audio:'liegong',
				trigger:{player:'shaBegin'},
				logTarget:'target',
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				filter:function(event,player){
					if(event.target.countCards('h')<=player.countCards('h')) return true;
					if(event.target.hp<=player.hp) return true;
					return false;
				},
				content:function(){
					if(trigger.target.countCards('h')<=player.countCards('h')) trigger.directHit=true;
					if(trigger.target.hp>=player.hp) player.addTempSkill('xinliegong2','shaAfter');
				},
				ai:{
					threaten:0.5
				}
			},
			xinliegong2:{
				trigger:{source:'damageBegin'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&event.notLink();
				},
				forced:true,
				audio:false,
				content:function(){
					trigger.num++;
				}
			},
			tiaoxin:{
				audio:4,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target.canUse({name:'sha'},player)&&target.countCards('he');
				},
				content:function(){
					"step 0"
					target.chooseToUse({name:'sha'},player,-1,'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true);
					"step 1"
					if(result.bool==false&&target.countCards('he')>0){
						player.discardPlayerCard(target,'he',true);
					}
					else{
						event.finish();
					}
				},
				ai:{
					order:4,
					expose:0.2,
					result:{
						target:-1,
						player:function(player,target){
							if(target.countCards('h')==0) return 0;
							if(target.countCards('h')==1) return -0.1;
							if(player.hp<=2) return -2;
							if(player.countCards('h','shan')==0) return -1;
							return -0.5;
						}
					},
					threaten:1.1
				}
			},
			zhiji:{
				skillAnimation:true,
				audio:2,
				unique:true,
				priority:-10,
				derivation:'guanxing',
				trigger:{player:'phaseBeginStart'},
				forced:true,
				filter:function(event,player){
					if(player.storage.zhiji) return false;
					return player.countCards('h')==0;
				},
				content:function(){
					"step 0"
					player.awakenSkill('zhiji');
					player.chooseControl('zhiji_recover','zhiji_draw',function(event,player){
						if(player.hp>=2) return 'zhiji_draw';
						return 'zhiji_recover';
					});
					"step 1"
					if(result.control=='zhiji_draw'){
						player.draw(2);
					}
					else{
						player.recover();
					}
					"step 2"
					player.loseMaxHp();
					player.storage.zhiji=true;
					if(player.hp>player.maxHp) player.hp=player.maxHp;
					player.update();
					player.addSkill('guanxing');
				}
			},
			xiangle:{
				audio:2,
				trigger:{target:'useCardToBefore'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha';
				},
				content:function(){
					"step 0"
					var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
					trigger.player.chooseToDiscard('享乐：弃置一张基本牌，否则杀对'+get.translation(player)+'无效',function(card){
						return get.type(card)=='basic';
					}).set('ai',function(card){
						if(_status.event.eff>0){
							return 10-get.value(card);
						}
						return 0;
					}).set('eff',eff);
					"step 1"
					if(result.bool==false){
						trigger.cancel();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&get.attitude(player,target)<0){
								if(_status.event.name=='xiangle') return;
								var bs=player.getCards('h',{type:'basic'});
								if(bs.length<2) return 0;
								if(player.hasSkill('jiu')||player.hasSkill('tianxianjiu')) return;
								if(bs.length<=3&&player.countCards('h','sha')<=1){
									for(var i=0;i<bs.length;i++){
										if(bs[i].name!='sha'&&get.value(bs[i])<7){
											return [1,0,1,-0.5];
										}
									}
									return 0;
								}
								return [1,0,1,-0.5];
							}
						}
					}
				}
			},
			fangquan:{
				audio:2,
				trigger:{player:'phaseUseBefore'},
				filter:function(event,player){
					return player.countCards('h')>0&&!player.hasSkill('fangquan3');
				},
				direct:true,
				content:function(){
					"step 0"
					var fang=player.hp>=2&&player.countCards('h')<=player.hp+1;
					player.chooseTarget(get.prompt('fangquan'),function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						if(!_status.event.fang) return -1;
						if(target.hasJudge('lebu')) return -1;
						return get.attitude(player,target)-4;
					}).set('fang',fang);
					"step 1"
					if(result.bool){
						player.logSkill('fangquan',result.targets);
						trigger.cancel();
						player.addSkill('fangquan2');
						player.storage.fangquan=result.targets[0];
					}
				}
			},
			fangquan2:{
				trigger:{player:'phaseAfter'},
				forced:true,
				popup:false,
				audio:false,
				priority:-50,
				content:function(){
					"step 0"
					player.chooseToDiscard(true);
					"step 1"
					var target=player.storage.fangquan;
					target.markSkillCharacter('fangquan',player,'放权','进行一个额外回合');
					target.insertPhase();
					target.addSkill('fangquan3');
					player.removeSkill('fangquan2');
					delete player.storage.fangquan;
				}
			},
			fangquan3:{
				trigger:{player:['phaseAfter','phaseCancelled']},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					player.unmarkSkill('fangquan');
					player.removeSkill('fangquan3');
				}
			},
			ruoyu:{
				skillAnimation:true,
				audio:2,
				unique:true,
				zhuSkill:true,
				keepSkill:true,
				derivation:'jijiang',
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('ruoyu'))return false;
					if(player.storage.ruoyu) return false;
					return player.isMinHp();
				},
				content:function(){
					player.storage.ruoyu=true;
					player.maxHp++;
					player.update();
					player.recover();
					if(player.hasSkill('ruoyu')){
						player.addSkill('jijiang');
					}
					else{
						player.addAdditionalSkill('ruoyu','jijiang');
					}
					if(!player.isZhu){
						player.storage.zhuSkill_ruoyu=['jijiang'];
					}
					else{
						event.trigger('zhuUpdate');
					}
					player.awakenSkill('ruoyu');
				}
			},
			qiaobian:{
				audio:2,
				group:['qiaobian1','qiaobian2','qiaobian3','qiaobian4'],
				ai:{
					threaten:3
				}
			},
			qiaobian1:{
				audio:2,
				trigger:{player:'phaseJudgeBefore'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				direct:true,
				frequent:true,
				content:function(){
					"step 0"
					if(player.countCards('j')==0&&(!event.isMine()||!lib.config.autoskilllist.contains('qiaobian1'))){
						event.finish();
					}
					else{
						var next=player.chooseToDiscard(get.prompt('qiaobian'),'弃置一张手牌并跳过判定阶段');
						next.set('ai',get.unuseful2);
						next.set('logSkill','qiaobian1');
					}
					"step 1"
					if(result.bool){
						trigger.cancel();
					}
				}
			},
			qiaobian2:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var check,i,num=0,num2=0,players=game.filterPlayer();
					for(i=0;i<players.length;i++){
						if(player!=players[i]&&players[i].countCards('h')){
							var att=get.attitude(player,players[i]);
							if(att<=0){
								num++;
							}
							if(att<0){
								num2++;
							}
						}
					}
					check=(num>=2&&num2>0);

					player.chooseToDiscard(get.prompt('qiaobian'),'弃置一张手牌并跳过摸牌阶段，然后可以获得至多两名角色各一张手牌',lib.filter.cardDiscardable).set('ai',function(card){
						if(!_status.event.check) return 0;
						return 7-get.value(card);
					}).set('check',check).set('logSkill','qiaobian2');
					"step 1"
					if(result.bool){
						trigger.cancel();
						player.chooseTarget([1,2],'获得至多两名角色各一张手牌',function(card,player,target){
							return target!=player&&target.countCards('h');
						}).set('ai',function(target){
							return 1-get.attitude(_status.event.player,target);
						})
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.line(result.targets,'green');
						event.targets=result.targets;
						if(!event.targets.length) event.finish();
					}
					else{
						event.finish();
					}
					"step 3"
					player.gainMultiple(event.targets);
					"step 4"
					game.delay();
				},
				ai:{
					expose:0.2
				}
			},
			qiaobian3:{
				audio:2,
				trigger:{player:'phaseUseBefore'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var check;
					if(!player.canMoveCard(true)){
						check=false;
					}
					else{
						check=game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('j');
						});
						if(!check){
							if(player.countCards('h')>player.hp+1){
								check=false;
							}
							else if(player.countCards('h',{name:['wuzhong']})){
								check=false;
							}
							else{
								check=true;
							}
						}
					}
					player.chooseToDiscard(get.prompt('qiaobian'),'弃置一张手牌并跳过出牌阶段，然后可以移动场上的一张牌',lib.filter.cardDiscardable).set('ai',function(card){
						if(!_status.event.check) return 0;
						return 7-get.value(card);
					}).set('check',check).set('logSkill','qiaobian3');
					"step 1"
					if(result.bool){
						trigger.cancel();
						player.moveCard();
					}
					else{
						event.finish();
					}
				},
				ai:{
					expose:0.2
				}
			},
			qiaobian4:{
				audio:2,
				trigger:{player:'phaseDiscardBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					var discard=player.countCards('h')>player.hp;
					var next=player.chooseToDiscard(get.prompt('qiaobian4'),'弃置一张手牌并跳过弃牌阶段');
					next.logSkill='qiaobian';
					next.ai=function(card){
						if(discard){
							return 100-get.useful(card);
						}
						else{
							return -1;
						}
					};
					"step 1"
					if(result.bool){
						trigger.cancel();
					}
				}
			},
			tuntian:{
				audio:2,
				trigger:{player:'loseEnd'},
				frequent:true,
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original&&event.cards[i].original!='j') return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.suit(card)=='heart') return -1;
						return 1;
					},ui.special).nogain=function(card){
						return get.suit(card)!='heart';
					};
					"step 1"
					if(result.bool){
						result.card.goto(ui.special);
						player.storage.tuntian.push(result.card);
						result.node.moveDelete(player);
						game.broadcast(function(cardid,player){
							var node=lib.cardOL[cardid];
							if(node){
								node.moveDelete(player);
							}
						},result.node.cardid,player);
						game.addVideo('gain2',player,get.cardsInfo([result.node]));
						player.markSkill('tuntian');
						game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
					}
				},
				init:function(player){
					player.storage.tuntian=[];
				},
				intro:{
					content:'cards'
				},
				group:'tuntian_dist',
				subSkill:{
					dist:{
						mod:{
							globalFrom:function(from,to,distance){
								if(from.storage.tuntian) return distance-from.storage.tuntian.length;
							}
						}
					}
				},
				locked:false,
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(!target.hasFriend()&&!player.hasUnknown()) return;
							if(_status.currentPhase==target) return;
							if(get.tag(card,'loseCard')&&target.countCards('he')){
								if(target.hasSkill('ziliang')) return 0.7;
								return [0.5,Math.max(2,target.countCards('h'))];
							}
							if(target.isUnderControl(true,player)){
								if((get.tag(card,'respondSha')&&target.countCards('h','sha'))||
									(get.tag(card,'respondShan')&&target.countCards('h','shan'))){
									if(target.hasSkill('ziliang')) return 0.7;
									return [0.5,1];
								}
							}
							else if(get.tag(card,'respondSha')||get.tag(card,'respondShan')){
								if(get.attitude(player,target)>0&&card.name=='juedou') return;
								if(get.tag(card,'damage')&&target.hasSkillTag('maixie')) return;
								if(target.countCards('h')==0) return 2;
								if(target.hasSkill('ziliang')) return 0.7;
								if(get.mode()=='guozhan') return 0.5;
								return [0.5,Math.max(target.countCards('h')/4,target.countCards('h','sha')+target.countCards('h','shan'))];
							}
						}
					},
					threaten:function(player,target){
						if(target.countCards('h')==0) return 2;
						return 0.5;
					},
					nodiscard:true,
					nolose:true
				}
			},
			zaoxian:{
				skillAnimation:true,
				audio:2,
				unique:true,
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					if(player.storage.tuntian) return player.storage.tuntian.length>=3&&!player.storage.zaoxian;
				},
				derivation:'jixi',
				content:function(){
					player.loseMaxHp();
					player.addSkill('jixi');
					player.storage.zaoxian=true;
					player.awakenSkill('zaoxian');
				}
			},
			jixi:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.tuntian.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('急袭',player.storage.tuntian,'hidden');
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							selectCard:-1,
							viewAs:{name:'shunshou'},
							cards:links,
							onuse:function(result,player){
								result.cards=lib.skill[result.skill].cards;
								var card=result.cards[0];
								player.storage.tuntian.remove(card);
								player.syncStorage('tuntian');
								if(!player.storage.tuntian.length){
									player.unmarkSkill('tuntian');
								}
								else{
									player.markSkill('tuntian');
								}
								player.logSkill('jixi',result.targets);
							}
						}
					},
					prompt:function(links,player){
						return '选择急袭的目标';
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							return player.storage.tuntian.length-1;
						}
					}
				}
			},
			jiang:{
				audio:2,
				trigger:{player:['shaBefore','juedouBefore'],target:['shaBefore','juedouBefore']},
				filter:function(event,player){
					if(event.card.name=='juedou') return true;
					return get.color(event.card)=='red';
				},
				frequent:true,
				content:function(){
					player.draw();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='sha'&&get.color(card)=='red') return [1,0.6];
						},
						player:function(card,player,target){
							if(card.name=='sha'&&get.color(card)=='red') return [1,1];
						}
					}
				}
			},
			hunzi:{
				skillAnimation:true,
				audio:2,
				derivation:['reyingzi','yinghun'],
				unique:true,
				trigger:{player:'phaseBeginStart'},
				filter:function(event,player){
					return player.hp==1&&!player.storage.hunzi;
				},
				forced:true,
				priority:3,
				content:function(){
					player.loseMaxHp();
					player.addSkill('reyingzi');
					player.addSkill('yinghun');
					player.awakenSkill('hunzi');
					player.storage.hunzi=true;
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 2;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(!target.hasFriend()) return;
							if(get.tag(card,'damage')==1&&target.hp==2&&!target.isTurnedOver()&&
							_status.currentPhase!=target&&get.distance(_status.currentPhase,target,'absolute')<=3) return [0.5,1];
						}
					}
				}
			},
			zhiba:{
				unique:true,
				global:'zhiba2',
				zhuSkill:true,
			},
			zhiba2:{
				audio:2,
				forceaudio:true,
				enable:'phaseUse',
				filter:function(event,player){
					if(player.group!='wu'||player.countCards('h')==0) return false;
					return game.hasPlayer(function(target){
						return target!=player&&target.hasZhuSkill('zhiba',player)&&target.countCards('h')>0;
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.hasZhuSkill('zhiba',player)&&target.countCards('h')>0;
				},
				usable:1,
				content:function(){
					"step 0"
					if(target.storage.hunzi){
						target.chooseControl('拒绝','不拒绝').set('prompt','是否拒绝制霸拼点？').set('choice',get.attitude(target,player)<=0);
					}
					else{
						event.forced=true;
					}
					"step 1"
					if(!event.forced&&result.control=='拒绝'){
						game.log(target,'拒绝了拼点');
						target.chat('拒绝');
						event.finish();
						return;
					}
					player.chooseToCompare(target,function(card){
						if(card.name=='du') return 20;
						var player=get.owner(card);
						var target=_status.event.getParent().target;
						if(player!=target&&get.attitude(player,target)>0){
							return -get.number(card);
						}
						return get.number(card);
					}).set('preserve','lose');
					"step 2"
					if(result.bool==false){
						target.gain([result.player,result.target]);
						target.$gain2([result.player,result.target]);
					}
				},
				ai:{
					basic:{
						order:1
					},
					expose:0.2,
					result:{
						target:function(player,target){
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
					}
				}
			},
			zhijian:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{type:'equip'})>0;
				},
				filterCard:function(card){
					return get.type(card)=='equip';
				},
				check:function(card){
					var player=_status.currentPhase;
					if(player.countCards('he',{subtype:get.subtype(card)})>1){
						return 11-get.equipValue(card);
					}
					return 6-get.value(card);
				},
				filterTarget:function(card,player,target){
					if(target.isMin()) return false;
					return player!=target&&!target.getEquip(card);
				},
				content:function(){
					target.equip(cards[0]);
					player.draw();
				},
				discard:false,
				prepare:function(cards,player,targets){
					player.$give(cards,targets[0],false);
				},
				ai:{
					basic:{
						order:10
					},
					result:{
						target:3,
					},
					threaten:1.3
				}
			},
			guzheng:{
				audio:2,
				// unique:true,
				// gainable:true,
				trigger:{global:'discardAfter'},
				filter:function(event,player){
					if(event.player!=player&&event.player.isIn()&&
					event.cards&&event.cards.length&&event.getParent(2).name=='phaseDiscard'){
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])=='d'){
								return true;
							}
						}
						return false;
					}
				},
				checkx:function(event,player){
					var du=false;
					var num=0;
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'){
							num++;
							if(event.cards[i].name=='du'){
								du=true;
							}
						}
					}
					if(get.attitude(player,event.player)>0){
						if(du&&num<=3){
							return false;
						}
						return true;
					}
					if(du) return true;
					return num>2;
				},
				direct:true,
				content:function(){
					"step 0"
					event.cards=trigger.cards.slice(0);
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])!='d'){
							event.cards.splice(i,1);i--;
						}
					}
					if(event.cards.length==0){
						event.finish();
						return;
					}
					var check=lib.skill.guzheng.checkx(trigger,player);
					player.chooseCardButton(event.cards,'固政：选择令'+get.translation(trigger.player)+'收回的牌').set('ai',function(button){
						if(_status.event.check){
							return 20-get.value(button.link);
						}
						return 0;
					}).set('check',check);
					"step 1"
					if(result.bool){
						game.delay(0.5);
						player.logSkill('guzheng',trigger.player);
						trigger.player.gain(result.links[0]);
						trigger.player.$gain2(result.links[0]);
						game.log(trigger.player,'收回了',result.links[0]);
						event.cards.remove(result.links[0]);
						if(event.cards.length){
							player.gain(event.cards);
							player.$gain2(event.cards);
							game.log(player,'收回了',event.cards);
						}
						game.delay();
					}
				},
				ai:{
					threaten:1.3,
					expose:0.2
				}
			},
			beige:{
				audio:4,
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return (event.card&&event.card.name=='sha'&&event.source&&
						event.player.classList.contains('dead')==false&&player.countCards('he'));
				},
				direct:true,
				checkx:function(event,player){
					var att1=get.attitude(player,event.player);
					var att2=get.attitude(player,event.source);
					return att1>0&&att2<=0;
				},
				content:function(){
					"step 0"
					var next=player.chooseToDiscard('he',get.prompt('beige'));
					var check=lib.skill.beige.checkx(trigger,player);
					next.set('ai',function(card){
						if(_status.event.goon) return 8-get.value(card);
						return 0;
					});
					next.set('logSkill','beige');
					next.set('goon',check);
					"step 1"
					if(result.bool){
						trigger.player.judge();
					}
					else{
						event.finish();
					}
					"step 2"
					switch(get.suit(result.card)){
						case 'heart':trigger.player.recover();break;
						case 'diamond':trigger.player.draw(2);break;
						case 'club':trigger.source.chooseToDiscard('he',2,true);break;
						case 'spade':trigger.source.turnOver();break;
					}
				},
				ai:{
					expose:0.3
				}
			},
			duanchang:{
				audio:4,
				forbid:['boss'],
				trigger:{player:'dieBegin'},
				forced:true,
				filter:function(event){
					return event.source&&event.source.isIn();
				},
				content:function(){
					trigger.source.clearSkills();
				},
				logTarget:'source',
				ai:{
					threaten:function(player,target){
						if(target.hp==1) return 0.2;
						return 1.5;
					},
					effect:{
						target:function(card,player,target,current){
							if(!target.hasFriend()) return;
							if(target.hp<=1&&get.tag(card,'damage')) return [1,0,0,-2];
						}
					}
				}
			},
			huashen:{
				unique:true,
				forbid:['guozhan'],
				init:function(player){
					player.storage.huashen={
						list:[],
						shown:[],
						owned:{},
						player:player,
					}
				},
				get:function(player,num){
					if(typeof num!='number') num=1;
					var list=[];
					while(num--){
						var name=player.storage.huashen.list.randomRemove();
						var skills=lib.character[name][3].slice(0);
						for(var i=0;i<skills.length;i++){
							var info=lib.skill[skills[i]];
							if(info.unique&&!info.gainable){
								skills.splice(i--,1);
							}
						}
						player.storage.huashen.owned[name]=skills;
						// player.popup(name);
						game.log(player,'获得了一个化身');
						list.push(name);
					}
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
						player.$draw(cards);
					}
				},
				group:['huashen1','huashen2'],
				intro:{
					content:function(storage,player){
						var str='';
						var slist=storage.owned;
						var list=[];
						for(var i in slist){
							list.push(i);
						}
						if(list.length){
							str+=get.translation(list[0]);
							for(var i=1;i<list.length;i++){
								str+='、'+get.translation(list[i]);
							}
						}
						var skill=player.additionalSkills.huashen[0];
						if(skill){
							str+='<p>当前技能：'+get.translation(skill);
						}
						return str;
					},
					mark:function(dialog,content,player){
						var slist=content.owned;
						var list=[];
						for(var i in slist){
							list.push(i);
						}
						if(list.length){
							dialog.addSmall([list,'character']);
						}
						if(!player.isUnderControl(true)){
							for(var i=0;i<dialog.buttons.length;i++){
								if(!content.shown.contains(dialog.buttons[i].link)){
									dialog.buttons[i].node.group.remove();
									dialog.buttons[i].node.hp.remove();
									dialog.buttons[i].node.intro.remove();
									dialog.buttons[i].node.name.innerHTML='未<br>知';
									dialog.buttons[i].node.name.dataset.nature='';
									dialog.buttons[i].style.background='';
									dialog.buttons[i]._nointro=true;
									dialog.buttons[i].classList.add('menubg');
								}
							}
						}
						if(player.additionalSkills.huashen){
							var skill=player.additionalSkills.huashen[0];
							if(skill){
								dialog.add('<div><div class="skill">【'+get.translation(skill)+
								'】</div><div>'+lib.translate[skill+'_info']+'</div></div>');
							}
						}
					}
				},
				mark:true
			},
			huashen1:{
				trigger:{global:'gameStart',player:'enterGame'},
				forced:true,
				popup:false,
				priority:10,
				filter:function(event,player){
					return !player.storage.huasheninited;
				},
				content:function(){
					for(var i in lib.character){
						if(lib.filter.characterDisabled2(i)) continue;
						var add=false;
						for(var j=0;j<lib.character[i][3].length;j++){
							var info=lib.skill[lib.character[i][3][j]];
							if(!info){
								continue;
							}
							if(info.gainable||!info.unique){
								add=true;break;
							}
						}
						if(add){
							player.storage.huashen.list.push(i);
						}
					}
					for(var i=0;i<game.players.length;i++){
						player.storage.huashen.list.remove([game.players[i].name]);
						player.storage.huashen.list.remove([game.players[i].name1]);
						player.storage.huashen.list.remove([game.players[i].name2]);
					}
					lib.skill.huashen.get(player,2);
					player.storage.huasheninited=true;
					event.trigger('huashenStart');
				}
			},
			huashen2:{
				audio:2,
				trigger:{player:['phaseBeginStart','phaseEnd','huashenStart']},
				filter:function(event,player,name){
					if(name=='phaseBeginStart'&&game.phaseNumber==1) return false;
					return true;
				},
				priority:50,
				forced:true,
				popup:false,
				content:function(){
					'step 0'
					event.trigger('playercontrol');
					'step 1'
					var slist=player.storage.huashen.owned;
					var list=[];
					for(var i in slist){
						list.push(i);
					}
					event.switchToAuto=function(){
						var currentbutton=event.dialog.querySelector('.selected.button');
						if(!currentbutton){
							currentbutton=event.dialog.buttons[0];
							currentbutton.classList.add('selected');
						}
						event.clickControl(player.storage.huashen.owned[currentbutton.link].randomGet());
					}

					event.clickControl=function(link,type){
						if(link!='cancel2'){
							var currentname;
							if(type=='ai'){
								currentname=event.currentname;
							}
							else{
								currentname=event.dialog.querySelector('.selected.button').link;
							}
							player.storage.huashen.shown.add(currentname);
							var mark=player.marks.huashen;
							if(trigger.name=='game'||trigger.name=='enterGame'){
								mark.hide();
								// mark.style.transform='scale(0.8)';
								mark.style.transition='all 0.3s';
								setTimeout(function(){
									mark.style.transition='all 0s';
									ui.refresh(mark);
									mark.setBackground(currentname,'character');
									if(mark.firstChild){
										mark.firstChild.remove();
									}
									setTimeout(function(){
										mark.style.transition='';
										mark.show();
										// mark.style.transform='';
									},50);
								},500);
							}
							else{
								if(mark.firstChild){
									mark.firstChild.remove();
								}
								mark.setBackground(currentname,'character');
							}
							if(!player.additionalSkills.huashen||!player.additionalSkills.huashen.contains(link)){
								player.addAdditionalSkill('huashen',link);
								player.logSkill('huashen2');
								player.flashAvatar('huashen',currentname);
								game.log(player,'获得技能','【'+get.translation(link)+'】');
								player.popup(link);

								if(event.dialog&&event.dialog.buttons){
									for(var i=0;i<event.dialog.buttons.length;i++){
										if(event.dialog.buttons[i].classList.contains('selected')){
											var name=event.dialog.buttons[i].link;
											player.sex=lib.character[name][0];
											player.group=lib.character[name][1];
											// player.node.identity.style.backgroundColor=get.translation(player.group+'Color');
											break;
										}
									}
								}

								// if(event.triggername=='phaseBegin'){
								// 	(function(){
								// 		var skills=[link];
								// 		var list=[];
								// 		game.expandSkills(skills);
								// 		var triggerevent=event._trigger;
								// 		var name='phaseBegin';
								// 		for(i=0;i<skills.length;i++){
								// 			var trigger=get.info(skills[i]).trigger;
								// 			if(trigger){
								// 				var add=false;
								// 				if(player==triggerevent.player&&trigger.player){
								// 					if(typeof trigger.player=='string'){
								// 						if(trigger.player==name) add=true;
								// 					}
								// 					else if(trigger.player.contains(name)) add=true;
								// 				}
								// 				if(trigger.global){
								// 					if(typeof trigger.global=='string'){
								// 						if(trigger.global==name) add=true;
								// 					}
								// 					else if(trigger.global.contains(name)) add=true;
								// 				}
								// 				if(add&&player.isOut()==false) list.push(skills[i]);
								// 			}
								// 		}
								// 		for(var i=0;i<list.length;i++){
								// 			game.createTrigger('phaseBegin',list[i],player,triggerevent);
								// 		}
								// 	}());
								// }
							}
						}
						if(type!='ai'){
							// ui.auto.show();
							event.dialog.close();
							event.control.close();
							game.resume();
						}
					};
					if(event.isMine()){
						event.dialog=ui.create.dialog('选择获得一项技能',[list,'character']);
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('pointerdiv');
						}
						if(trigger.name=='game'){
							event.control=ui.create.control();
						}
						else{
							event.control=ui.create.control(['cancel2']);
						}
						event.control.custom=event.clickControl;
						event.control.replaceTransition=false;
						// ui.auto.hide();
						game.pause();
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						event.custom.replace.button=function(button){
							if(button.classList.contains('selected')){
								button.classList.remove('selected');
								if(trigger.name=='game'){
									event.control.style.opacity=0;
								}
								else{
									event.control.replace(['cancel2']);
								}
							}
							else{
								for(var i=0;i<event.dialog.buttons.length;i++){
									event.dialog.buttons[i].classList.remove('selected');
								}
								button.classList.add('selected');
								event.control.replace(slist[button.link]);
								if(trigger.name=='game'&&getComputedStyle(event.control).opacity==0){
									event.control.style.transition='opacity 0.5s';
									ui.refresh(event.control);
									event.control.style.opacity=1;
									event.control.style.transition='';
									ui.refresh(event.control);
								}
								else{
									event.control.style.opacity=1;
								}
							}
							event.control.custom=event.clickControl;
						}
						event.custom.replace.window=function(){
							for(var i=0;i<event.dialog.buttons.length;i++){
								if(event.dialog.buttons[i].classList.contains('selected')){
									event.dialog.buttons[i].classList.remove('selected');
									if(trigger.name=='game'){
										event.control.style.opacity=0;
									}
									else{
										event.control.replace(['cancel2']);
									}
									event.control.custom=event.clickControl;
									return;
								}
							}
						}
					}
					else{
						var skills=[];
						var map={};
						for(var i=0;i<list.length;i++){
							var sub=player.storage.huashen.owned[list[i]];
							skills.addArray(sub);
							for(var j=0;j<sub.length;j++){
								map[sub[j]]=list[i];
							}
						}
						var add=player.additionalSkills.huashen;
						if(typeof add=='string'){
							add=[add];
						}
						if(Array.isArray(add)){
							for(var i=0;i<add.length;i++){
								skills.remove(add[i]);
							}
						}
						var cond='out';
						if(event.triggername=='phaseBegin'){
							cond='in';
						}
						skills.randomSort();
						skills.sort(function(a,b){
							return get.skillRank(b,cond)-get.skillRank(a,cond);
						});
						var choice=skills[0];
						event.currentname=map[choice];
						event.clickControl(choice,'ai');
					}
				}
			},
			xinsheng:{
				audio:2,
				unique:true,
				forbid:['guozhan'],
				trigger:{player:'damageEnd'},
				frequent:true,
				filter:function(event,player){
					return player.storage.huashen&&player.storage.huashen.list&&
						player.storage.huashen.list.length>0;
				},
				content:function(){
					for(var i=0;i<trigger.num;i++){
						lib.skill.huashen.get(player);
					}
				},
				ai:{
					maixie_hp:true
				}
			},
			huoshou:{
				locked:true,
				group:['huoshou1','huoshou2'],
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='nanman') return 0;
						}
					}
				}
			},
			huoshou1:{
				audio:2,
				trigger:{target:'useCardToBefore'},
				forced:true,
				priority:15,
				filter:function(event,player){
					return (event.card.name=='nanman');
				},
				content:function(){
					trigger.cancel();
				},
			},
			huoshou2:{
				trigger:{global:'damageBefore'},
				forced:true,
				filter:function(event,player){
					return (event.card&&event.card.name=='nanman');
				},
				content:function(){
					trigger.source=player;
				}
			},
			zaiqi:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				check:function(event,player){
					if(player.maxHp-player.hp<2){
						return false;
					}
					else if(player.maxHp-player.hp==2){
						return player.countCards('h')>=2;
					}
					return true;
				},
				content:function(){
					"step 0"
					trigger.cancel();
					event.cards=get.cards(player.maxHp-player.hp);
					player.showCards(event.cards);
					"step 1"
					var num=0;
					for(var i=0;i<event.cards.length;i++){
						if(get.suit(event.cards[i])=='heart'){
							num++;
							event.cards[i].discard();
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
			juxiang:{
				unique:true,
				locked:true,
				group:['juxiang1','juxiang2'],
				ai:{
					effect:{
						target:function(card){
							if(card.name=='nanman') return [0,1];
						}
					}
				}
			},
			juxiang1:{
				audio:2,
				trigger:{target:'useCardToBefore'},
				forced:true,
				priority:15,
				filter:function(event,player){
					return (event.card.name=='nanman');
				},
				content:function(){
					trigger.cancel();
				}
			},
			juxiang2:{
				trigger:{global:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return (event.card.name=='nanman'&&event.player!=player&&get.position(event.card)=='d'&&get.itemtype(event.card)=='card');
				},
				content:function(){
					player.gain(trigger.card);
					player.$gain2(trigger.card);
				}
			},
			lieren:{
				audio:2,
				trigger:{source:'damageEnd'},
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return (event.card&&event.card.name=='sha'&&
						event.player.classList.contains('dead')==false&&
						event.player.countCards('h')&&player.countCards('h'))&&event.player!=player;
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0&&player.countCards('h')>1;
				},
				priority:5,
				content:function(){
					"step 0"
					player.chooseToCompare(trigger.player);
					"step 1"
					if(result.bool&&trigger.player.countGainableCards(player,'he')){
						player.gainPlayerCard(trigger.player,true,'he');
					}
				}
			},
			xingshang:{
				audio:2,
				unique:true,
				gainable:true,
				trigger:{global:'dieEnd'},
				priority:5,
				filter:function(event){
					return event.playerCards&&event.playerCards.length>0
				},
				check:function(event){
					for(var i=0;i<event.playerCards.length;i++){
						if(event.playerCards[i].name=='du') return false;
					}
					return true;
				},
				content:function(){
					"step 0"
					player.gain(trigger.playerCards);
					player.$draw(trigger.playerCards);
					game.delay();
					"step 1"
					for(var i=0;i<trigger.playerCards.length;i++){
						trigger.cards.remove(trigger.playerCards[i]);
					}
					trigger.playerCards.length=0;
				}
			},
			fangzhu:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('fangzhu'),function(card,player,target){
						return player!=target
					}).ai=function(target){
						if(target.hasSkillTag('noturn')) return 0;
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)==0) return 0;
						if(get.attitude(_status.event.player,target)>0){
							if(target.classList.contains('turnedover')) return 1000-target.countCards('h');
							if(player.maxHp-player.hp<3) return -1;
							return 100-target.countCards('h');
						}
						else{
							if(target.classList.contains('turnedover')) return -1;
							if(player.maxHp-player.hp>=3) return -1;
							return 1+target.countCards('h');
						}
					}
					"step 1"
					if(result.bool){
						player.logSkill('fangzhu',result.targets);
						result.targets[0].draw(player.maxHp-player.hp);
						result.targets[0].turnOver();
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp<=1) return;
								if(!target.hasFriend()) return;
								var hastarget=false;
								var turnfriend=false;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(get.attitude(target,players[i])<0&&!players[i].isTurnedOver()){
										hastarget=true;
									}
									if(get.attitude(target,players[i])>0&&players[i].isTurnedOver()){
										hastarget=true;
										turnfriend=true;
									}
								}
								if(get.attitude(player,target)>0&&!hastarget) return;
								if(turnfriend||target.hp==target.maxHp) return [0.5,1];
								if(target.hp>1) return [1,0.5];
							}
						}
					}
				}
			},
			songwei:{
				unique:true,
				global:'songwei2',
				zhuSkill:true,
			},
			songwei2:{
				audio:2,
				forceaudio:true,
				trigger:{player:'judgeEnd'},
				filter:function(event,player){
					if(player.group!='wei') return false;
					if(get.color(event.result.card)!='black') return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.hasZhuSkill('songwei',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current!=player&&current.hasZhuSkill('songwei',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt('songwei',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.logSkill('songwei',event.current);
						event.current.draw();
					}
					event.goto(1);
				}
			},
			jiezi:{
				trigger:{global:['phaseDrawSkipped','phaseDrawCancelled']},
				forced:true,
				filter:function(event,player){
					return event.player!=player;
				},
				content:function(){
					player.draw();
				}
			},
			gzduanliang:{
				group:['duanliang1','duanliang2'],
				ai:{
					threaten:1.2
				}
			},
			duanliang:{
				group:['duanliang1','duanliang3'],
				ai:{
					threaten:1.2
				}
			},
			duanliang1:{
				audio:2,
				enable:'chooseToUse',
				filterCard:function(card){
					if(get.type(card)!='basic'&&get.type(card)!='equip') return false;
					return get.color(card)=='black';
				},
				filter:function(event,player){
					return player.countCards('he',{type:['basic','equip'],color:'black'})
				},
				position:'he',
				viewAs:{name:'bingliang'},
				prompt:'将一黑色的基本牌或装备牌当兵粮寸断使用',
				check:function(card){return 6-get.value(card)},
				ai:{
					order:9
				}
			},
			duanliang2:{
				mod:{
					targetInRange:function(card,player,target){
						if(card.name=='bingliang'){
							if(get.distance(player,target)<=2) return true;
						}
					}
				}
			},
			duanliang3:{
				mod:{
					targetInRange:function(card,player,target){
						if(card.name=='bingliang'){
							if(target.countCards('h')>=player.countCards('h')) return true;
						}
					}
				}
			},
			haoshi:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				threaten:1.4,
				check:function(event,player){
					if(player.countCards('h')<=1) return true;
					return game.hasPlayer(function(current){
						return current!=player&&current.isMinHandcard()&&get.attitude(player,current)>0;
					});
				},
				content:function(){
					trigger.num+=2;
					player.addSkill('haoshi2');
				},
				ai:{
					threaten:2,
					ai:{
						noh:true,
						skillTagFilter:function(player,tag){
							if(tag=='noh'){
								if(player.countCards('h')!=2) return false;
							}
						}
					}
				}
			},
			haoshi2:{
				trigger:{player:'phaseDrawEnd'},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					"step 0"
					player.removeSkill('haoshi2');
					if(player.countCards('h')<=5){
						event.finish();
						return;
					}
					player.chooseCardTarget({
						selectCard:Math.floor(player.countCards('h')/2),
						filterTarget:function(card,player,target){
							return target.isMinHandcard();
						},
						forced:true,
						ai2:function(target){
							return get.attitude(_status.event.player,target);
						}
					});
					"step 1"
					if(result.targets&&result.targets[0]){
						result.targets[0].gain(result.cards,player);
						player.$give(result.cards.length,result.targets[0]);
					}
				}
			},
			dimeng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:function(){
					if(ui.selected.targets.length==2) return false;
					return true;
				},
				selectCard:[0,Infinity],
				selectTarget:2,
				complexCard:true,
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(ui.selected.targets.length==0) return true;
					return (Math.abs(ui.selected.targets[0].countCards('h')-target.countCards('h'))==
						ui.selected.cards.length);
				},
				multitarget:true,
				multiline:true,
				complexSelect:true,
				content:function(){
					targets[0].swapHandcards(targets[1]);
				},
				check:function(card){
					var list=[],player=_status.event.player;
					var num=player.countCards('he');
					var count;
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&get.attitude(player,players[i])>3) list.push(players[i]);
					}
					list.sort(function(a,b){
						return a.countCards('h')-b.countCards('h');
					});
					if(list.length==0) return -1;
					var from=list[0];
					list.length=0;

					for(var i=0;i<players.length;i++){
						if(players[i]!=player&&get.attitude(player,players[i])<1) list.push(players[i]);
					}
					if(list.length==0) return -1;
					list.sort(function(a,b){
						return b.countCards('h')-a.countCards('h');
					});
					if(from.countCards('h')>=list[0].countCards('h')) return -1;
					for(var i=0;i<list.length&&from.countCards('h')<list[i].countCards('h');i++){
						if(list[i].countCards('h')-from.countCards('h')<=num){
							count=list[i].countCards('h')-from.countCards('h');break;
						}
					}
					if(count<2&&from.countCards('h')>=2) return -1;
					if(ui.selected.cards.length<count) return 11-get.value(card);
					return -1;
				},
				ai:{
					order:6,
					threaten:3,
					expose:0.9,
					result:{
						target:function(player,target){
							var list=[];
							var num=player.countCards('he');
							var players=game.filterPlayer();
							if(ui.selected.targets.length==0){
								for(var i=0;i<players.length;i++){
									if(players[i]!=player&&get.attitude(player,players[i])>3) list.push(players[i]);
								}
								list.sort(function(a,b){
									return a.countCards('h')-b.countCards('h');
								});
								if(target==list[0]) return get.attitude(player,target);
								return -get.attitude(player,target);
							}
							else{
								var from=ui.selected.targets[0];
								for(var i=0;i<players.length;i++){
									if(players[i]!=player&&get.attitude(player,players[i])<1) list.push(players[i]);
								}
								list.sort(function(a,b){
									return b.countCards('h')-a.countCards('h');
								});
								if(from.countCards('h')>=list[0].countCards('h')) return -get.attitude(player,target);
								for(var i=0;i<list.length&&from.countCards('h')<list[i].countCards('h');i++){
									if(list[i].countCards('h')-from.countCards('h')<=num){
										var count=list[i].countCards('h')-from.countCards('h');
										if(count<2&&from.countCards('h')>=2) return -get.attitude(player,target);
										if(target==list[i]) return get.attitude(player,target);
										return -get.attitude(player,target);
									}
								}
							}
						}
					}
				}
			},
			yinghun:{
				audio:2,
				audioname:['sunce'],
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('yinghun'),function(card,player,target){
						return player!=target;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(player.maxHp-player.hp==1&&target.countCards('he')==0){
							return 0;
						}
						if(get.attitude(_status.event.player,target)>0){
							return 10+get.attitude(_status.event.player,target);
						}
						if(player.maxHp-player.hp==1){
							return -1;
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						event.num=player.maxHp-player.hp;
						if(player.countCards('e')>=player.hp){
							event.num=player.maxHp;
						}
						player.logSkill('yinghun',result.targets);
						event.target=result.targets[0];
						if(event.num==1){
							event.directcontrol=true;
						}
						else{
							var str1='摸'+get.cnNumber(event.num,true)+'弃一';
							var str2='摸一弃'+get.cnNumber(event.num,true);
							player.chooseControl(str1,str2,function(event,player){
								return _status.event.choice;
							}).set('choice',get.attitude(player,event.target)>0?str1:str2);
							event.str=str1;
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.directcontrol||result.control==event.str){
						event.target.draw(event.num);
						event.target.chooseToDiscard(true,'he');
					}
					else{
						event.target.draw();
						event.target.chooseToDiscard(event.num,true,'he');
					}
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==1||target.countCards('e')>=target.hp) return 2;
						if(target.hp==target.maxHp) return 0.5;
						if(target.hp==2) return 1.5;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(target.maxHp<=3) return;
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp) return [0,1];
							}
							if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
						}
					}
				}
			},
			gzyinghun:{
				audio:'yinghun',
				audioname:['sunce'],
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('yinghun'),function(card,player,target){
						return player!=target;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(player.maxHp-player.hp==1&&target.countCards('he')==0){
							return 0;
						}
						if(get.attitude(_status.event.player,target)>0){
							return 10+get.attitude(_status.event.player,target);
						}
						if(player.maxHp-player.hp==1){
							return -1;
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						event.num=player.maxHp-player.hp;
						player.logSkill(event.name,result.targets);
						event.target=result.targets[0];
						if(event.num==1){
							event.directcontrol=true;
						}
						else{
							var str1='摸'+get.cnNumber(event.num,true)+'弃一';
							var str2='摸一弃'+get.cnNumber(event.num,true);
							player.chooseControl(str1,str2,function(event,player){
								return _status.event.choice;
							}).set('choice',get.attitude(player,event.target)>0?str1:str2);
							event.str=str1;
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(event.directcontrol||result.control==event.str){
						event.target.draw(event.num);
						event.target.chooseToDiscard(true,'he');
					}
					else{
						event.target.draw();
						event.target.chooseToDiscard(event.num,true,'he');
					}
				},
				ai:{
					threaten:function(player,target){
						if(target.hp==target.maxHp) return 0.5;
						if(target.hp==1) return 2;
						if(target.hp==2) return 1.5;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(target.maxHp<=3) return;
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp) return [0,1];
							}
							if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
						}
					}
				}
			},
			jiuchi:{
				audio:2,
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='spade';
				},
				viewAs:{name:'jiu'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{suit:'spade'})) return false;
				},
				prompt:'将一张黑桃手牌当酒使用',
				check:function(card){
					if(_status.event.type=='dying') return 1;
					return 4-get.value(card);
				},
				ai:{
					skillTagFilter:function(player){
						return player.countCards('h',{suit:'spade'})>0&&player.hp<=0;
					},
					threaten:1.5,
					save:true,
				}
			},
			roulin:{
				audio:2,
				trigger:{player:'shaBegin',target:'shaBegin'},
				forced:true,
				filter:function(event,player){
					if(event.directHit) return false;
					if(player==event.player){
						return event.target.sex=='female';
					}
					return event.player.sex=='female';
				},
				check:function(event,player){
					return player==event.player;
				},
				priority:-1,
				content:function(){
					if(typeof trigger.shanRequired=='number'){
						trigger.shanRequired++;
					}
					else{
						trigger.shanRequired=2;
					}
				}
			},
			benghuai:{
				audio:4,
				trigger:{player:'phaseEnd'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return !player.isMinHp();
				},
				content:function(){
					"step 0"
					player.chooseControl('baonue_hp','baonue_maxHp',function(event,player){
						if(player.hp==player.maxHp) return 'baonue_hp';
						if(player.hp<player.maxHp-1||player.hp<=2) return 'baonue_maxHp';
						return 'baonue_hp';
					});
					"step 1"
					if(result.control=='baonue_hp'){
						player.loseHp();
					}
					else{
						player.loseMaxHp(true);
					}
				},
				ai:{
					threaten:0.5,
					neg:true,
				}
			},
			baonue:{
				unique:true,
				global:'baonue2',
				zhuSkill:true,
			},
			baonue2:{
				audio:2,
				forceaudio:true,
				trigger:{source:'damageEnd'},
				filter:function(event,player){
					if(player.group!='qun') return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.hp<target.maxHp&&target.hasZhuSkill('baonue',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(target){
						return player!=target&&target.hp<target.maxHp&&target.hasZhuSkill('baonue',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt('baonue',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.logSkill('baonue',event.current);
						player.judge(function(card){
							if(get.suit(card)=='spade') return 4;
							return 0;
						});
					}
					else{
						event.goto(1);
					}
					'step 3'
					if(result.suit=='spade'){
						event.current.recover();
					}
					event.goto(1);
				}
			},
			luanwu:{
				audio:2,
				unique:true,
				enable:'phaseUse',
				limited:true,
				skillAnimation:'epic',
				animationColor:'thunder',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					"step 0"
					player.awakenSkill('luanwu');
					event.current=player.next;
					"step 1"
					event.current.animate('target');
					event.current.chooseToUse('乱武：使用一张杀或流失一点体力',{name:'sha'},function(card,player,target){
						if(player==target) return false;
						if(!player.canUse('sha',target)) return false;
						if(get.distance(player,target)<=1) return true;
						if(game.hasPlayer(function(current){
							return current!=player&&get.distance(player,current)<get.distance(player,target);
						})){
							return false;
						}
						return true;
					});
					"step 2"
					if(result.bool==false) event.current.loseHp();
					if(event.current.next!=player){
						event.current=event.current.next;
						game.delay(0.5);
						event.goto(1);
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							if(lib.config.mode=='identity'&&game.zhu.isZhu&&player.identity=='fan'){
								if(game.zhu.hp==1&&game.zhu.countCards('h')<=2) return 1;
							}
							var num=0;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								var att=get.attitude(player,players[i]);
								if(att>0) att=1;
								if(att<0) att=-1;
								if(players[i]!=player&&players[i].hp<=3){
									if(players[i].countCards('h')==0) num+=att/players[i].hp;
									else if(players[i].countCards('h')==1) num+=att/2/players[i].hp;
									else if(players[i].countCards('h')==2) num+=att/4/players[i].hp;
								}
								if(players[i].hp==1) num+=att*1.5;
							}
							if(player.hp==1){
								return -num;
							}
							if(player.hp==2){
								return -game.players.length/4-num;
							}
							return -game.players.length/3-num;
						}
					}
				}
			},
			wansha:{
				locked:true,
				global:'wansha2',
				trigger:{global:'dying'},
				priority:15,
				forced:true,
				filter:function(event,player){
					return _status.currentPhase==player&&event.player!=player;
				},
				content:function(){}
			},
			wansha2:{
				mod:{
					cardSavable:function(card,player){
						if(!_status.currentPhase) return;
						if(_status.currentPhase.hasSkill('wansha')&&_status.currentPhase!=player){
							if(card.name=='tao'&&_status.event.dying!=player) return false;
						}
					}
				}
			},
			weimu:{
				mod:{
					targetEnabled:function(card){
						if((get.type(card)=='trick'||get.type(card)=='delay')&&
							get.color(card)=='black') return false;
					}
				}
			},
			huoji:{
				audio:2,
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				viewAs:{name:'huogong',nature:'fire'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{color:'red'})) return false;
				},
				prompt:'将一张红色牌当火攻使用',
				check:function(card){
					var player=_status.currentPhase;
					if(player.countCards('h')>player.hp){
						return 6-get.value(card);
					}
					return 4-get.value(card)
				}
			},
			bazhen:{
				audio:2,
				inherit:'bagua_skill',
				filter:function(event,player){
					if(!lib.skill.bagua_skill.filter(event,player)) return false;
					if(player.getEquip(2)) return false;
					return true;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=7.5) return 0;
							}
							if(target.getEquip(2)) return;
							return lib.skill.bagua_skill.ai.effect.target.apply(this,arguments);
						}
					}
				}
			},
			kanpo:{
				audio:2,
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='black';
				},
				viewAsFilter:function(player){
					return player.countCards('h',{color:'black'})>0;
				},
				viewAs:{name:'wuxie'},
				prompt:'将一张黑色手牌当无懈可击使用',
				check:function(card){return 8-get.value(card)},
				threaten:1.2
			},
			lianhuan:{
				group:['lianhuan1','lianhuan2']
			},
			lianhuan1:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{suit:'club'})>0;
				},
				filterCard:function(card){
					return get.suit(card)=='club';
				},
				viewAs:{name:'tiesuo'},
				prompt:'将一张梅花牌当铁锁连环使用',
				check:function(card){return 4-get.value(card)}
			},
			lianhuan2:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',{suit:'club'})>0;
				},
				filterCard:function(card){
					return get.suit(card)=='club';
				},
				check:function(card){
					return 5-get.useful(card);
				},
				content:function(){
					player.draw();
				},
				discard:false,
				prompt:'将一张梅花牌置入弃牌堆并摸一张牌',
				delay:0.5,
				prepare:function(cards,player){
					player.$throw(cards,1000);
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:1,
					},
				}
			},
			niepan:{
				audio:2,
				unique:true,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				animationStr:'涅盘',
				animationColor:'fire',
				init:function(player){
					player.storage.niepan=false;
				},
				filter:function(event,player){
					if(player.storage.niepan) return false;
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return true;
					}
					else if(event.parent.name=='phaseUse'){
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.hp=Math.min(3,player.maxHp);
					player.discard(player.getCards('hej'));
					player.draw(3);
					player.awakenSkill('niepan');
					player.storage.niepan=true;
					'step 1'
					player.link(false);
					'step 2'
					player.turnOver(false);
				},
				ai:{
					order:0.5,
					skillTagFilter:function(player){
						if(player.storage.niepan) return false;
						if(player.hp>0) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp==0) return 10;
							if(player.hp<=1&&player.countCards('he')<=1) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.niepan) return 0.6;
					}
				},
				intro:{
					content:'limited'
				}
			},
			oldniepan:{
				audio:'niepan',
				unique:true,
				enable:'chooseToUse',
				mark:true,
				skillAnimation:true,
				animationStr:'涅盘',
				animationColor:'fire',
				init:function(player){
					player.storage.oldniepan=false;
				},
				filter:function(event,player){
					if(player.storage.oldniepan) return false;
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.hp=Math.min(3,player.maxHp);
					player.discard(player.getCards('hej'));
					player.draw(3);
					player.awakenSkill('oldniepan');
					player.storage.oldniepan=true;
					'step 1'
					player.link(false);
					'step 2'
					player.turnOver(false);
				},
				ai:{
					order:1,
					skillTagFilter:function(player){
						if(player.storage.oldniepan) return false;
						if(player.hp>0) return false;
					},
					save:true,
					result:{
						player:function(player){
							if(player.hp==0) return 10;
							if(player.hp<=2&&player.countCards('he')<=1) return 10;
							return 0;
						}
					},
					threaten:function(player,target){
						if(!target.storage.oldniepan) return 0.6;
					}
				},
				intro:{
					content:'limited'
				}
			},
			quhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(player.countCards('h')==0) return false;
					return game.hasPlayer(function(current){
						return current.hp>player.hp&&current.countCards('h');
					});
				},
				filterTarget:function(card,player,target){
					return target.hp>player.hp&&target.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target);
					"step 1"
					if(result.bool){
						if(game.hasPlayer(function(player){
							return player!=target&&get.distance(target,player,'attack')<=1;
						})){
							player.chooseTarget(function(card,player,target){
								var source=_status.event.source;
								return target!=source&&get.distance(source,target,'attack')<=1;
							},true).set('ai',function(target){
								return get.damageEffect(target,_status.event.source,player);
							}).set('source',target);
						}
						else{
							event.finish();
						}
					}
					else{
						player.damage(target);
						event.finish();
					}
					"step 2"
					if(result.bool&&result.targets&&result.targets.length){
						target.line(result.targets[0],'green');
						result.targets[0].damage(target);
					}
				},
				ai:{
					order:0.5,
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							var oc=(target.countCards('h')==1);
							if(att>0&&oc) return 0;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i]!=target&&players[i]!=player&&
									get.distance(target,players[i],'attack')<=1){
									if(get.damageEffect(players[i],target,player)>0){
										return att>0?att/2:att-(oc?5:0);
									}
								}
							}
							return 0;
						},
						player:function(player,target){
							if(target.hasSkillTag('jueqing',false,target)) return -10;
							var mn=1;
							var hs=player.getCards('h');
							for(var i=0;i<hs.length;i++){
								mn=Math.max(mn,hs[i].number);
							}
							if(mn<=11&&player.hp<2) return -20;
							var max=player.maxHp-hs.length;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(get.attitude(player,players[i])>2){
									max=Math.max(Math.min(5,players[i].hp)-players[i].countCards('h'),max);
								}
							}
							switch(max){
								case 0:return mn==13?0:-20;
								case 1:return mn>=12?0:-15;
								case 2:return 0;
								case 3:return 1;
								default:return max;
							}
						}
					},
					expose:0.2
				}
			},
			jieming:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('jieming'),[1,trigger.num],function(card,player,target){
						return target.countCards('h')<Math.min(target.maxHp,5);
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return Math.min(5,target.maxHp)-target.countCards('h');
						}
						return att/3;
					});
					"step 1"
					if(result.bool){
						player.logSkill('jieming',result.targets);
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].draw(Math.min(5,result.targets[i].maxHp)-result.targets[i].countCards('h'));
						}
					}
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target,current){
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
						}
					},
				}
			},
			qiangxi:{
				audio:2,
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
				},
				check:function(card){
					return 10-get.value(card);
				},
				position:'he',
				ai:{
					damage:true,
					order:8,
					result:{
						player:function(player,target){
							if(player.getEquip(1)) return 0;
							if(player.hp>=target.hp) return -0.9;
							if(player.hp<=2) return -10;
							return -2;
						},
						target:function(player,target){
							if(!player.getEquip(1)){
								if(player.hp<2) return 0;
								if(player.hp==2&&target.hp>=2) return 0;
								if(target.hp>player.hp) return 0;
							}
							return get.damageEffect(target,player);
						}
					}
				},
				threaten:1.3
			},
			xinqiangxi:{
				audio:'qiangxi',
				enable:'phaseUse',
				filter:function(event,player){
					if(player.hasSkill('xinqiangxi2')){
						return !player.hasSkill('xinqiangxi3');
					}
					else if(player.hasSkill('xinqiangxi3')){
						return !player.hasSkill('xinqiangxi2')&&player.countCards('he',{type:'equip'})>0;
					}
					else{
						return true;
					}
				},
				filterCard:function(card){
					var player=_status.event.player;
					if(player.hasSkill('xinqiangxi2')) return false;
					return get.type(card)=='equip';
				},
				selectCard:function(){
					var player=_status.event.player;
					if(player.hasSkill('xinqiangxi2')) return -1;
					if(player.hasSkill('xinqiangxi3')) return [1,1];
					return [0,1];
				},
				filterTarget:function(card,player,target){
					if(player==target) return false;
					return get.distance(player,target,'attack')<=1;
				},
				content:function(){
					"step 0"
					if(cards.length==0){
						player.loseHp();
						player.addTempSkill('xinqiangxi3');
					}
					else{
						player.addTempSkill('xinqiangxi2');
					}
					"step 1"
					target.damage();
				},
				check:function(card){
					return 10-get.value(card);
				},
				position:'he',
				ai:{
					order:8.5,
					result:{
						target:function(player,target){
							if(player.hasSkill('xinqiangxi2')||!player.countCards('he',{type:'equip'})){
								if(player.hp<2) return 0;
								if(target.hp>=player.hp) return 0;
							}
							return get.damageEffect(target,player);
						}
					}
				},
				threaten:1.5
			},
			xinqiangxi2:{},
			xinqiangxi3:{},
			tianyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('h')>0;
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseToCompare(target);
					"step 1"
					if(result.bool){
						player.addTempSkill('tianyi2');
					}
					else{
						player.addTempSkill('tianyi3');
					}
				},
				ai:{
					order:function(name,player){
						var cards=player.getCards('h');
						if(player.countCards('h','sha')==0){
							return 1;
						}
						for(var i=0;i<cards.length;i++){
							if(cards[i].name!='sha'&&cards[i].number>11&&get.value(cards[i])<7){
								return 9;
							}
						}
						return get.order({name:'sha'})-1;
					},
					result:{
						player:function(player){
							if(player.countCards('h','sha')>0) return 0.6;
							var num=player.countCards('h');
							if(num>player.hp) return 0;
							if(num==1) return -2;
							if(num==2) return -1;
							return -0.7;
						},
						target:function(player,target){
							var num=target.countCards('h');
							if(num==1) return -1;
							if(num==2) return -0.7;
							return -0.5
						},
					},
					threaten:1.3
				}
			},
			tianyi2:{
				mod:{
					targetInRange:function(card,player,target,now){
						if(card.name=='sha') return true;
					},
					selectTarget:function(card,player,range){
						if(card.name=='sha'&&range[1]!=-1) range[1]++;
					},
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					}
				},
			},
			tianyi3:{
				mod:{
					cardEnabled:function(card){if(card.name=='sha') return false}
				}
			},
			shuangxiong:{
				audio:true,
				trigger:{player:'phaseDrawBefore'},
				check:function(event,player){
					if(player.countCards('h')>player.hp) return true;
					if(player.countCards('h')>3) return true;
					return false;
				},
				content:function(){
					"step 0"
					player.judge(ui.special);
					"step 1"
					player.gain(result.card);
					player.$gain2(result.card);
					player.addTempSkill('shuangxiong2');
					player.storage.shuangxiong=get.color(result.card);
					trigger.cancel();
				}
			},
			shuangxiong2:{
				audio:true,
				enable:'phaseUse',
				viewAs:{name:'juedou'},
				filterCard:function(card,player){
					return get.color(card)!=player.storage.shuangxiong;
				},
				check:function(card){
					return 8-get.value(card);
				},
				ai:{
					basic:{
						order:10
					}
				}
			},
			luanji:{
				audio:2,
				enable:'phaseUse',
				viewAs:{name:'wanjian'},
				filterCard:function(card,player){
					if(ui.selected.cards.length){
						return get.suit(card)==get.suit(ui.selected.cards[0]);
					}
					var cards=player.getCards('h');
					for(var i=0;i<cards.length;i++){
						if(card!=cards[i]){
							if(get.suit(card)==get.suit(cards[i])) return true;
						}
					}
					return false;
				},
				selectCard:2,
				complexCard:true,
				check:function(card){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return player.canUse('wanjian',current);
					});
					var num=0;
					for(var i=0;i<targets.length;i++){
						var eff=get.sgn(get.effect(targets[i],{name:'wanjian'},player,player));
						if(targets[i].hp==1){
							eff*=1.5;
						}
						num+=eff;
					}
					if(!player.needsToDiscard(-1)){
						if(targets.length>=7){
							if(num<2) return 0;
						}
						else if(targets.length>=5){
							if(num<1.5) return 0;
						}
					}
					return 6-get.value(card);
				},
				ai:{
					basic:{
						order:10
					}
				}
			},
			xueyi:{
				mod:{
					maxHandcard:function(player,num){
						if(player.hasZhuSkill('xueyi')){
							return num+game.countPlayer(function(current){
								if(player!=current&&current.group=='qun') return 2;
							});
						}
						return num;
					}
				},
				zhuSkill:true,
			},
			mengjin:{
				audio:2,
				trigger:{player:'shaMiss'},
				priority:-1,
				filter:function(event){
					return event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					player.discardPlayerCard('he',trigger.target,true);
				}
			},
			jiewei:{
				trigger:{player:'turnOverEnd'},
				direct:true,
				audio:2,
				content:function(){
					'step 0'
					player.chooseToUse(function(card){
						if(!lib.filter.cardEnabled(card,_status.event.player,_status.event)){
							return false;
						}
						var type=get.type(card,'trick');
						return type=='trick'||type=='equip';
					},'是否使用一张锦囊牌或装备牌？').set('logSkill','jiewei');
					'step 1'
					if(result.bool){
						var type=get.type(result.card||result.cards[0]);
						if(game.hasPlayer(function(current){
							if(type=='equip'){
								return current.countCards('e');
							}
							else{
								return current.countCards('j');
							}
						})){
							var next=player.chooseTarget('是否弃置场上的一张'+get.translation(type)+'牌？',function(card,player,target){
								if(_status.event.type=='equip'){
									return target.countCards('e')>0;
								}
								else{
									return target.countCards('j')>0;
								}
							});
							next.set('ai',function(target){
								if(type=='equip'){
									return -get.attitude(player,target);
								}
								else{
									return get.attitude(player,target);
								}
							});
							next.set('type',type);
							event.type=type;
						}
						else{
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.type&&result.bool&&result.targets&&result.targets.length){
						player.line(result.targets,'green');
						if(event.type=='equip'){
							player.discardPlayerCard(result.targets[0],'e',true);
						}
						else{
							player.discardPlayerCard(result.targets[0],'j',true);
						}
					}
				}
			},
			releiji:{
				audio:2,
				audioname:['boss_qinglong'],
				trigger:{player:'respond'},
				filter:function(event,player){
					return event.card.name=='shan';
				},
				direct:true,
				content:function(){
					"step 0";
					player.chooseTarget(get.prompt('releiji')).ai=function(target){
						if(target.hasSkill('hongyan')) return 0;
						return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
					};
					"step 1"
					if(result.bool){
						player.logSkill('releiji',result.targets,'thunder');
						event.target=result.targets[0];
						event.target.judge(function(card){
							var suit=get.suit(card);
							if(suit=='spade') return -4;
							if(suit=='club') return -2;
							return 0;
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.suit=='club'){
						event.target.damage('thunder');
						player.recover();
					}
					else if(result.suit=='spade'){
						event.target.damage(2,'thunder');
					}
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
									if(!target.hasSkill('guidao')) return 0;
									return [0,hastarget?target.countCards('he')/2:0];
								}
								if(target.countCards('h','shan')&&target.countCards('h')>2){
									if(!target.hasSkill('guidao')) return 0;
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
								if(!target.hasSkill('guidao')) return [1,0.05];
								return [1,Math.min(0.5,(target.countCards('h')+be)/4)];
							}
						}
					}
				}
			},
			shensu:{
				group:['shensu1','shensu2']
			},
			xinshensu:{
				group:['shensu1','shensu2','shensu4']
			},
			shensu1:{
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					"step 0"
					var check= player.countCards('h')>2;
					player.chooseTarget(get.prompt('shensu'),function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('shensu1',result.targets);
						player.useCard({name:'sha'},result.targets[0],false);
						player.skip('phaseJudge');
						player.skip('phaseDraw');
					}
				}
			},
			shensu2:{
				audio:2,
				trigger:{player:'phaseUseBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				content:function(){
					"step 0"
					var check=player.needsToDiscard();
					player.chooseCardTarget({
						prompt:get.prompt('shensu'),
						filterCard:function(card,player){
							return get.type(card)=='equip'&&lib.filter.cardDiscardable(card,player)
						},
						position:'he',
						filterTarget:function(card,player,target){
							if(player==target) return false;
							return player.canUse({name:'sha'},target,false);
						},
						ai1:function(card){
							if(_status.event.check) return 0;
							return 6-get.value(card);
						},
						ai2:function(target){
							if(_status.event.check) return 0;
							return get.effect(target,{name:'sha'},_status.event.player);
						},
						check:check
					});
					"step 1"
					if(result.bool){
						player.logSkill('shensu2',result.targets);
						player.discard(result.cards[0]);
						player.useCard({name:'sha'},result.targets[0]);
						trigger.cancel();
					}
				}
			},
			shensu4:{
				audio:'shensu1',
				trigger:{player:'phaseDiscardBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check=player.needsToDiscard()||player.isTurnedOver();
					player.chooseTarget(get.prompt('shensu'),function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target,false);
					}).set('check',check).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('shensu4',result.targets);
						player.turnOver();
						player.useCard({name:'sha'},result.targets[0],false);
						trigger.cancel();
					}
				}
			},
			jushou:{
				audio:true,
				trigger:{player:'phaseEnd'},
				content:function(){
					player.draw(3);
					player.turnOver();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(card.name=='guiyoujie') return [0,1];
						}
					}
				},
			},
			liegong:{
				audio:2,
				trigger:{player:'shaBegin'},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				logTarget:'target',
				filter:function(event,player){
					var length=event.target.countCards('h');
					return (length>=player.hp||length<=player.getAttackRange());
				},
				content:function(){
					trigger.directHit=true;
				},
				locked:false,
				mod:{
					attackFrom:function(from,to,distance){
						if(get.zhu(from,'shouyue')) return distance-1;
					}
				}
			},
			kuanggu:{
				audio:2,
				trigger:{source:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return get.distance(player,event.player)<=1&&player.isDamaged();
				},
				content:function(){
					player.recover(trigger.num);
				}
			},
			tianxiang:{
				audio:2,
				trigger:{player:'damageBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h',{suit:'heart'})>0&&event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card,player){
							return get.suit(card)=='heart'&&lib.filter.cardDiscardable(card,player);
						},
						filterTarget:function(card,player,target){
							return player!=target;
						},
						ai1:function(card){
							return 10-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							var trigger=_status.event.getTrigger();
							var da=0;
							if(_status.event.player.hp==1){
								da=10;
							}
							if(trigger.num>1){
								if(target.maxHp>5&&target.hp>1) return -att/10+da;
								return -att+da;
							}
							var eff=get.damageEffect(target,trigger.source,target,trigger.nature);
							if(att==0) return 0.1+da;
							if(eff>=0&&trigger.num==1){
								return att+da;
							}
							if(target.hp==target.maxHp) return -att+da;
							if(target.hp==1){
								if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
									if(target.maxHp<=3){
										return -att+da;
									}
									return -att/2+da;
								}
								return da;
							}
							if(target.hp==target.maxHp-1){
								if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
								if(att>0) return 0.02+da;
								return 0.05+da;
							}
							return att/2+da;
						},
						prompt:get.prompt('tianxiang')
					});
					"step 1"
					if(result.bool){
						player.logSkill(event.name,result.targets);
						trigger.untrigger();
						trigger.player=result.targets[0];
						trigger.player.addSkill('tianxiang2');
						player.discard(result.cards[0]);
					}
					else{
						event.finish();
					}
					"step 2"
					trigger.trigger('damageBefore');
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(get.tag(card,'damage')&&target.countCards('h')>1) return 0.7;
						}
					},
					threaten:function(player,target){
						if(target.countCards('h')==0) return 2;
					}
				}
			},
			tianxiang2:{
				trigger:{player:['damageAfter','damageCancelled','damageZero']},
				forced:true,
				popup:false,
				audio:false,
				vanish:true,
				content:function(){
					if(player.hp<player.maxHp) player.draw(player.maxHp-player.hp);
					player.removeSkill('tianxiang2');
					player.popup('tianxiang');
				}
			},
			retianxiang:{
				audio:'tianxiang',
				trigger:{player:'damageBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{suit:'heart'})>0&&event.num>0;
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card,player){
							return get.suit(card)=='heart'&&lib.filter.cardDiscardable(card,player);
						},
						filterTarget:function(card,player,target){
							return player!=target;
						},
						// position:'he',
						ai1:function(card){
							return 10-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							var trigger=_status.event.getTrigger();
							var da=0;
							if(_status.event.player.hp==1){
								da=10;
							}
							var eff=get.damageEffect(target,trigger.source,target);
							if(att==0) return 0.1+da;
							if(eff>=0&&att>0){
								return att+da;
							}
							if(att>0&&target.hp>1){
								if(target.maxHp-target.hp>=3) return att*1.1+da;
								if(target.maxHp-target.hp>=2) return att*0.9+da;
							}
							return -att+da;
						},
						prompt:get.prompt('retianxiang'),
						prompt2:lib.translate.retianxiang_info
					});
					"step 1"
					if(result.bool){
						player.discard(result.cards,ui.special);
						var target=result.targets[0];
						player.chooseControlList(true,function(event,player){
							var target=_status.event.target;
							var att=get.attitude(player,target);
							if(target.hasSkillTag('maihp')) att=-att;
							if(att>0){
								return 0;
							}
							else{
								return 1;
							}
						},
							['令'+get.translation(target)+'受到伤害来源对其造成的1点伤害，然后摸X张牌（X为其已损失体力值且至多为5）',
							'令'+get.translation(target)+'失去1点体力，然后获得'+get.translation(result.cards)]).set('target',target);
						player.logSkill(event.name,target);
						trigger.cancel();
						event.target=target;
						event.card=result.cards[0];
					}
					else{
						event.finish();
					}
					"step 2"
					if(typeof result.index=='number'){
						if(result.index){
							event.target.loseHp().type='retianxiang';
							event.target.addSkill('retianxiang3');
							event.target.storage.retianxiang3=event.card;
						}
						else{
							event.target.damage(trigger.source).type='retianxiang';
							event.target.addSkill('retianxiang2');
							if(get.position(event.card)=='s'){
								event.card.discard();
							}
						}
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(get.tag(card,'damage')&&target.countCards('he')>1) return 0.7;
						}
					},
				}
			},
			retianxiang3:{
				trigger:{player:'loseHpAfter'},
				forced:true,
				popup:false,
				filter:function(event){
					return event.type=='retianxiang';
				},
				vanish:true,
				content:function(){
					player.gain(player.storage.retianxiang3,'gain2');
					player.removeSkill('retianxiang3');
				},
				onremove:function(player){
					var card=player.storage.retianxiang3;
					if(get.position(card)=='s'){
						card.discard();
					}
					delete player.storage.retianxiang3;
				}
			},
			retianxiang2:{
				trigger:{player:'damageAfter'},
				forced:true,
				popup:false,
				filter:function(event){
					return event.type=='retianxiang';
				},
				vanish:true,
				content:function(){
					if(player.isDamaged()){
						player.draw(player.maxHp-player.hp);
					}
					player.removeSkill('retianxiang2');
				},
			},
			xintianxiang:{
				audio:'tianxiang',
				trigger:{player:'damageBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{suit:'heart'})>0&&event.num>0&&!player.hasSkill('xintianxiang3');
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card,player){
							return get.suit(card)=='heart'&&lib.filter.cardDiscardable(card,player);
						},
						filterTarget:function(card,player,target){
							return player!=target;
						},
						position:'he',
						ai1:function(card){
							return 10-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							var trigger=_status.event.getTrigger();
							var da=0;
							if(_status.event.player.hp==1){
								da=10;
							}
							if(trigger.num>1){
								if(target.maxHp>5&&target.hp>1) return -att/10+da;
								return -att+da;
							}
							var eff=get.damageEffect(target,trigger.source,target,trigger.nature);
							if(att==0) return 0.1+da;
							if(eff>=0&&trigger.num==1){
								return att+da;
							}
							if(target.hp==target.maxHp) return -att+da;
							if(target.hp==1){
								if(target.maxHp<=4&&!target.hasSkillTag('maixie')){
									if(target.maxHp<=3){
										return -att+da;
									}
									return -att/2+da;
								}
								return da;
							}
							if(target.hp==target.maxHp-1){
								if(target.hp>2||target.hasSkillTag('maixie')) return att/5+da;
								if(att>0) return 0.02+da;
								return 0.05+da;
							}
							return att/2+da;
						},
						prompt:get.prompt('tianxiang')
					});
					"step 1"
					if(result.bool){
						player.logSkill(event.name,result.targets);
						trigger.untrigger();
						trigger.player=result.targets[0];
						trigger.player.addSkill('xintianxiang2');
						trigger.player.storage.xintianxiang=player;
						player.discard(result.cards[0]);
					}
					else{
						event.finish();
					}
					"step 2"
					trigger.trigger('damageBefore');
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return;
							if(get.tag(card,'damage')&&target.countCards('he')>1) return 0.7;
						}
					},
				}
			},
			xintianxiang2:{
				trigger:{player:['damageAfter','damageCancelled','damageZero']},
				forced:true,
				popup:false,
				audio:false,
				vanish:true,
				content:function(){
					'step 0'
					var source=player.storage.xintianxiang;
					if(source.isDead()){
						event.finish();
						return;
					}
					var num=player.maxHp-player.hp||0;
					var str1='令'+get.translation(player)+'摸'+get.cnNumber(num)+'张牌';
					var str2='令'+get.translation(player)+'防止造成和受到的所有伤害且天香失效直到你下一回合开始';
					var att=get.attitude(source,player);
					var choice='选项一';
					if(att<0){
						if(num>=2){
							choice='选项二';
						}
					}
					else if(att>0){
						if(num<2&&!player.hasSkillTag('maixie')){
							choice='选项二';
						}
					}
					source.chooseControl(function(){
						return _status.event.choice;
					}).set('choiceList',[str1,str2]).set('choice',choice);
					'step 1'
					if(result.control=='选项一'){
						if(player.isDamaged()){
							player.draw(player.maxHp-player.hp);
						}
					}
					else{
						player.storage.xintianxiang.addSkill('xintianxiang3');
						player.storage.xintianxiang.storage.xintianxiang3=player;
						player.addSkill('xintianxiang4');
					}
					player.removeSkill('xintianxiang2');
					delete player.storage.xintianxiang;
				}
			},
			xintianxiang3:{
				trigger:{player:['phaseBegin','dieBegin']},
				silent:true,
				content:function(){
					if(player.storage.xintianxiang3){
						player.storage.xintianxiang3.removeSkill('xintianxiang4');
						delete player.storage.xintianxiang3;
					}
					player.removeSkill('xintianxiang3');
				}
			},
			xintianxiang4:{
				trigger:{source:'damageBefore',player:'damageBefore'},
				forced:true,
				mark:true,
				intro:{
					content:'防止造成和受到的一切伤害'
				},
				priority:15,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					nothunder:true,
					nodamage:true,
					notrick:true,
					notricksource:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						},
						player:function(card,player,target,current){
							if(get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						}
					}
				}
			},
			hongyan:{
				mod:{
					suit:function(card,suit){
						if(suit=='spade') return 'heart';
					}
				}
			},
			gzbuqu:{
				audio:'buqu',
				trigger:{player:'changeHp'},
				filter:function(event,player){
					return player.hp<=0&&event.num<0;
				},
				init:function(player){
					player.storage.gzbuqu=[];
				},
				priority:-15,
				intro:{
					content:'cards'
				},
				group:'gzbuqu_recover',
				locked:true,
				frequent:true,
				ondisable:true,
				onremove:function(player){
					if(player.storage.gzbuqu.length){
						delete player.nodying;
						player.hp=1-player.storage.gzbuqu.length;
						game.log(player,'移去了不屈牌',player.storage.gzbuqu);
						while(player.storage.gzbuqu.length){
							player.storage.gzbuqu.shift().discard();
						}
						player.unmarkSkill('gzbuqu');
						player.dying({});
					}
				},
				process:function(player){
					delete player.nodying;
					player.markSkill('gzbuqu');
					player.syncStorage('gzbuqu');
					var nums=[];
					var cards=player.storage.gzbuqu;
					for(var i=0;i<cards.length;i++){
						if(nums.contains(cards[i].number)){
							return;
						}
						else{
							nums.push(cards[i].number);
						}
					}
					player.nodying=true;
					if(player.hp<0){
						player.hp=0;
						player.update();
					}
				},
				subSkill:{
					recover:{
						trigger:{player:'changeHp'},
						filter:function(event,player){
							return player.storage.gzbuqu.length>0&&event.num>0;
						},
						forced:true,
						popup:false,
						content:function(){
							'step 0'
							if(player.hp>=player.storage.gzbuqu.length){
								player.hp-=player.storage.gzbuqu.length-1;
								player.update();
								while(player.storage.gzbuqu.length){
									player.storage.gzbuqu.shift().discard();
								}
								player.unmarkSkill('gzbuqu');
								delete player.nodying;
								event.finish();
							}
							else{
								player.chooseCardButton('移去'+get.cnNumber(player.hp)+'张不屈牌',true,player.hp,player.storage.gzbuqu).set('ai',function(button){
									var buttons=get.selectableButtons();
									for(var i=0;i<buttons.length;i++){
										if(buttons[i]!=button&&
											buttons[i].link.number==button.link.number&&
											!ui.selected.buttons.contains(buttons[i])){
											return 1;
										}
									}
									return 0;
								});
								player.hp=0;
								player.update();
							}
							'step 1'
							for(var i=0;i<result.links.length;i++){
								result.links[i].discard();
								player.storage.gzbuqu.remove(result.links[i]);
							}
							player.$throw(result.links);
							game.log(player,'移去了不屈牌',result.links);
							lib.skill.gzbuqu.process(player);
						}
					}
				},
				content:function(){
					'step 0'
					var num=-player.hp;
					if(!player.storage.gzbuqu.length){
						num++;
					}
					player.storage.gzbuqu.addArray(get.cards(num));
					player.showCards(get.translation(player)+'的不屈牌',player.storage.gzbuqu);
					player.hp=0;
					player.update();
					'step 1'
					lib.skill.gzbuqu.process(player);
				},
				ai:{
					mingzhi:true
				}
			},
			buqu:{
				audio:2,
				trigger:{player:'dieBefore'},
				forced:true,
				filter:function(event,player){return player.maxHp>0&&player.hp<=0},
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					if(player.storage.buqu==undefined) player.storage.buqu=[];
					player.storage.buqu.push(event.card);
					player.syncStorage('buqu');
					player.showCards(player.storage.buqu,'不屈')
					player.markSkill('buqu');
					"step 1"
					for(var i=0;i<player.storage.buqu.length-1;i++){
						if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])) return;
					}
					trigger.cancel();
					if(player.hp<=0){
						player.hp=1;
						player.update();
					}
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.storage.buqu&&player.storage.buqu.length) return num-player.hp+player.storage.buqu.length;
					}
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage);
							for(var i=0;i<storage.length;i++){
								storage[i].discard();
							}
							delete player.storage.buqu;
						}
					}
				}
			},
			fenji:{
				audio:2,
				trigger:{global:'discardAfter'},
				filter:function(event){
					if(_status.currentPhase!=event.player){
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].original=='h') return true;
						}
					}
					return false;
				},
				check:function(event,player){
					return get.attitude(player,event.player)>2;
				},
				content:function(){
					"step 0"
					player.line(trigger.player,'green');
					player.loseHp();
					"step 1"
					trigger.player.draw(2);
				},
			},
			leiji:{
				audio:2,
				trigger:{player:'respond'},
				filter:function(event,player){
					return event.card.name=='shan';
				},
				direct:true,
				content:function(){
					"step 0";
					player.chooseTarget(get.prompt('leiji')).ai=function(target){
						if(target.hasSkill('hongyan')) return 0;
						return get.damageEffect(target,_status.event.player,_status.event.player,'thunder');
					};
					"step 1"
					if(result.bool){
						player.logSkill('leiji',result.targets,'thunder');
						event.target=result.targets[0];
						event.target.judge(function(card){
							if(get.suit(card)=='spade') return -4;
							return 0;
						});
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool==false){
						event.target.damage(2,'thunder');
					}
				},
				ai:{
					mingzhi:false,
					useShan:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')){
								var hastarget=game.hasPlayer(function(current){
									return get.attitude(target,current)<0;
								});
								if(target.countCards('h','shan')&&target.countCards('e',{suit:'spade'})){
									return [0,hastarget?target.countCards('he')/2:0];
								}
								if(target.countCards('h','shan')){
									return [1,hastarget?target.countCards('he')/2:0];
								}
								return [1,target.countCards('h')/4];
							}
						}
					}
				}
			},
			guidao:{
				audio:2,
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('he',{color:'black'})>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('guidao'),'he',function(card){
						return get.color(card)=='black';
					}).set('ai',function(card){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						if(attitude==0||result==0) return 0;
						if(attitude>0){
							return result;
						}
						else{
							return -result;
						}
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.respond(result.cards,'highlight');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.logSkill('guidao');
						player.$gain2(trigger.player.judging[0]);
						player.gain(trigger.player.judging[0]);
						trigger.player.judging[0]=result.cards[0];
						if(!get.owner(result.cards[0],'judge')){
							trigger.position.appendChild(result.cards[0]);
						}
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
					}
					"step 3"
					game.delay(2);
				},
				ai:{
					tag:{
						rejudge:1
					}
				}
			},
			guhuo:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				filter:function(event,player){
					return player.countCards('h')>0
				},
				chooseButton:{
					dialog:function(){
						var list=['sha','tao','jiu','taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
						for(var i=0;i<list.length;i++){
							if(i<3){
								list[i]=['基本','',list[i]];
							}
							else{
								list[i]=['锦囊','',list[i]];
							}
						}
						return ui.create.dialog([list,'vcard']);
					},
					filter:function(button,player){
						return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						if(player.countCards('h','wuzhong')){
							if(player.hp==1&&player.countCards('h','tao')){
								return button.link=='tao'?1:0;
							}
							return button.link=='wuzhong'?1:0;
						}
						if(player.hp<player.maxHp){
							if(player.countCards('h','tao')){
								return button.link=='tao'?1:0;
							}
						}
					},
					backup:function(links,player){
						return {
							filterCard:true,
							selectCard:-1,
							audio:2,
							popname:true,
							viewAs:{name:links[0][2]},
						}
					},
					prompt:function(links,player){
						return '将全部手牌当'+get.translation(links[0][2])+'使用';
					}
				},
				ai:{
					order:1,
					result:{
						player:function(player){
							var num=0;
							var cards=player.getCards('h');
							if(cards.length>=3&&player.hp>=3) return 0;
							for(var i=0;i<cards.length;i++){
								num+=Math.max(0,get.value(cards[i],player,'raw'));
							}
							num/=cards.length;
							num*=Math.min(cards.length,player.hp);
							return 12-num;
						}
					},
					threaten:1.6,
				}
			},
			huangtian:{
				unique:true,
				global:'huangtian2',
				zhuSkill:true,
			},
			huangtian2:{
				audio:2,
				enable:'phaseUse',
				discard:false,
				line:true,
				prepare:'give',
				filter:function(event,player){
					if(player.group!='qun') return false;
					if(player.countCards('h','shan')+player.countCards('h','shandian')==0) return 0;
					return game.hasPlayer(function(target){
						return target!=player&&target.hasZhuSkill('huangtian',player);
					});
				},
				filterCard:function(card){
					return (card.name=='shan'||card.name=='shandian')
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.hasZhuSkill('huangtian',player);
				},
				usable:1,
				forceaudio:true,
				content:function(){
					target.gain(cards,player);
				},
				ai:{
					expose:0.3,
					order:10,
					result:{
						target:5
					}
				}
			}
		},
		translate:{
			re_yuanshao:'袁绍',
			re_lusu:'鲁肃',

			jianchu:'鞬出',
			jianchu_info:'当你使用【杀】指定一名角色为目标后，你可以弃置其一张牌，若以此法弃置的牌为装备牌，此【杀】不可被【闪】响应，若不为装备牌，该角色获得此【杀】',
			redimeng:'缔盟',
			redimeng_info:'出牌阶段限一次，你可以弃置X张牌选择两名其他角色（X为这两名角色的手牌差），你混合他们的手牌，然后令其中一名角色获得其中的一张牌，并令另一名角色获得其中的一张牌，然后重复此流程，直到这些牌均被获得为止',
			reluanji:'乱击',
			reluanji_info:'你可以将两张与你本回合以此法转化的花色均不相同的手牌当【万箭齐发】使用，然后当一名已受伤的角色因响应此牌而打出【闪】时，该角色摸一张牌',
			xintianxiang:'天香',
			xintianxiang2:'天香',
			xintianxiang3:'天香',
			xintianxiang4:'天香',
			xintianxiang_bg:'香',
			xintianxiang_info:'当你受到伤害时，你可以弃置一张♥牌，将此伤害转移给一名其他角色，然后你选择一项：令该角色摸X张牌（X为其已损失的体力值）；或防止其造成与受到的所有伤害，且此技能失效直到你的下回合开始',
			xinshensu:'神速',
			xinshensu_info:'你可以选择一至三项：1. 跳过判定阶段和摸牌阶段；2. 跳过出牌阶段并弃置一张装备牌；3. 跳过弃牌阶段并将你的武将牌翻面。你每选择一项，视为你对一名其他角色使用一张【杀】',
			yinghun:'英魂',
			yinghun_info:'准备阶段开始时，若你已受伤，你可令一名其他角色执行一项：摸X张牌，然后弃置一张牌；或摸一张牌，然后弃置X张牌（X为你已损失的体力值，若你装备区里牌的数量不小于你的体力值，则X改为你的体力上限）',
			gzyinghun:'英魂',
			gzyinghun_info:'准备阶段开始时，若你已受伤，你可令一名其他角色执行一项：摸X张牌，然后弃置一张牌；或摸一张牌，然后弃置X张牌（X为你已损失的体力值）',

			tiaoxin:'挑衅',
			zhiji:'志继',
			zhiji_draw:'摸牌',
			zhiji_recover:'回血',
			xiangle:'享乐',
			fangquan:'放权',
			ruoyu:'若愚',
			qiaobian:'巧变',
			qiaobian1:'巧变·判定',
			qiaobian2:'巧变·摸牌',
			qiaobian3:'巧变·出牌',
			qiaobian4:'巧变·弃牌',
			tuntian:'屯田',
			tuntian_bg:'田',
			zaoxian:'凿险',
			jixi:'急袭',
			jiang:'激昂',
			hunzi:'魂姿',
			zhiba:'制霸',
			zhiba2:'制霸',
			zhijian:'直谏',
			guzheng:'固政',
			beige:'悲歌',
			duanchang:'断肠',
			// fushen:'附身',
			huashen:'化身',
			huashen1:'化身',
			huashen2:'化身',
			xinsheng:'新生',
			qimou:'奇谋',
			xinqiangxi:'强袭',
			xinjushou:'据守',
			xinjiewei:'解围',
			retianxiang:'天香',
			retianxiang_info:'当你受到伤害时，你可以弃置一张红桃手牌，防止此次伤害并选择一名其他角色，然后你选择一项：1.令其受到伤害来源对其造成的1点伤害，然后摸X张牌（X为其已损失体力值且至多为5）；2.令其失去1点体力，然后获得你弃置的牌。',
			xinjiewei_info:'你可以将装备区里的牌当【无懈可击】使用；当你从背面翻至正面时，你可以弃置一张牌，然后移动场上的一张牌',
			xinjushou_info:'结束阶段，你可以翻面并摸四张牌，然后弃置一张手牌，若以此法弃置的是装备牌，则你改为使用之',
			jixi_info:'出牌阶段，你可以把任意一张田当【顺手牵羊】使用',
			xinqiangxi_info:'出牌阶段各限一次，你可以选择一项：1. 失去一点体力并对你攻击范围内的一名其他角色造成一点伤害；2. 弃置一张装备牌并对你攻击范围内的一名其他角色造成一点伤害 ',
			qimou_info:'限定技，出牌阶段，你可以失去任意点体力，然后直到回合结束，你的进攻距离+X，且你可以多使用X张【杀】（X为你失去的体力值）',
			tiaoxin_info:'出牌阶段，你可以指定一名使用【杀】能攻击到你的角色，该角色需对你使用一张【杀】，若该角色不如此做，你弃掉他的一张牌，每回合限一次。',
			zhiji_info:'觉醒技，准备阶段，若你没有手牌，你须回复1点体力或摸两张牌，然后减1点体力上限，并永久获得技能“观星”。',
			xiangle_info:'锁定技，当其他玩家使用【杀】指定你为目标时，需额外弃掉一张基本牌，否则该【杀】对你无效。',
			fangquan_info:'你可跳过你的出牌阶段，若如此做，在回合结束时可弃一张手牌令一名其他角色进行一个额外的回合。',
			ruoyu_info:'主公技，觉醒技，准备阶段，若你的体力是全场最少的(或之一)，你须增加1点体力上限，回复1点体力，并永久获得技能“激将”。',
			qiaobian_info:'你可以弃一张手牌来跳过自己的一个阶段(回合开始和结束阶段除外);若以此法跳过摸牌阶段,你可以从其他至多两名角色手里各抽取一张牌;若以此法跳过出牌阶段,你可以将场上的一张牌移动到另一个合理的位置。',
			tuntian_info:'每次当你于回合外失去牌时，可以进行一次判定，将非♥结果的判定牌置于你的武将牌上，称为“田”，每有一张田，你的进攻距离+1.',
			zaoxian_info:'觉醒技，准备阶段，若田的数量达到3张或更多，你须减1点体力上限，并永久获得技能“急袭”',
			jiang_info:'每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸一张牌。',
			hunzi_info:'觉醒技，准备阶段，若你的体力为1，你须减1点体力上限，并永久获得技能“英姿”和“英魂”。',
			zhiba_info:'主公技，其他吴势力角色的出牌阶段，可与你进行一次拼点，若该角色没赢，你可以获得双方拼点的牌；你的觉醒技发动后，你可以拒绝此拼点。每回合限一次。',
			zhijian_info:'出牌阶段，你可以将你手牌中的一张装备牌置于一名其他角色装备区里（不得替换原装备），然后摸一张牌。',
			guzheng_info:'其他角色的弃牌阶段结束时，你可将其弃置的一张牌返回其手牌，然后获得其弃置的其它牌',
			beige_info:'一名角色每受到【杀】造成的一次伤害，你可以弃一张牌，并令其进行一次判定，判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
			duanchang_info:'锁定技，杀死你的角色失去当前的所有技能直到游戏结束。',
			// fushen_info:'回合开始前，你可以选择与任意一名角色交换控制权，该角色可选择在下一个回合开始前与你换回',
			huashen_info:'所有人都展示武将牌后，你随机获得两张未加入游戏的武将牌，选一张置于你面前并声明该武将的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同知道该化身被替换。在你的每个准备阶段和结束后，你可以替换化身牌，你须为新的化身重新声明一项技能（你不可声明限定技、觉醒技或主公技）。',
			xinsheng_info:'你每受到1点伤害，可获得一张新化身牌。',
			jiangwei:'姜维',
			liushan:'刘禅',
			zhanghe:'张郃',
			dengai:'邓艾',
			sunce:'孙策',
			zhangzhang:'张昭张紘',
			caiwenji:'蔡文姬',
			zuoci:'左慈',

			zhurong:'祝融',
			menghuo:'孟获',
			caopi:'曹丕',
			xuhuang:'徐晃',
			lusu:'旧鲁肃',
			sunjian:'孙坚',
			dongzhuo:'董卓',
			jiaxu:'贾诩',
			huoshou:'祸首',
			huoshou1:'祸首',
			huoshou2:'祸首',
			zaiqi:'再起',
			juxiang:'巨象',
			juxiang1:'巨象',
			juxiang2:'巨象',
			lieren:'烈刃',
			xingshang:'行殇',
			fangzhu:'放逐',
			songwei:'颂威',
			songwei2:'颂威',
			duanliang:'断粮',
			duanliang1:'断粮',
			haoshi:'好施',
			dimeng:'缔盟',
			jiuchi:'酒池',
			roulin:'肉林',
			benghuai:'崩坏',
			baonue:'暴虐',
			baonue2:'暴虐',
			baonue_hp:'体力',
			baonue_maxHp:'体力上限',
			luanwu:'乱武',
			wansha:'完杀',
			weimu:'帷幕',
			jiezi:'截辎',
			jiezi_info:'锁定技，一名其他角色跳过摸牌阶段后，你摸一张牌',
			huoshou_info:'【南蛮入侵】对你无效；你是任何【南蛮入侵】造成伤害的来源。',
			zaiqi_info:'摸牌阶段，若你已受伤，你可以改为展示牌堆顶的X张牌，X为你已损失的体力值，其中每有一张♥牌，你回复1点体力，然后弃掉这些♥牌，将其余的牌收入手牌。',
			juxiang_info:'南蛮入侵】对你无效；若其他角色使用的【南蛮入侵】在结算完时进入弃牌堆，你立即获得它。',
			lieren_info:'你每使用【杀】造成一次伤害，可与受到该伤害的角色拼点；若你赢，你获得对方的一张牌。',
			xingshang_info:'你可以立即获得死亡角色的所有牌。',
			fangzhu_info:'你每受到一次伤害，可令除你以外的任一角色补X张牌，X为你已损失的体力值，然后该角色将其武将牌翻面。',
			songwei_info:'主公技，其他魏势力的角色的判定牌结果为♠或♣且生效后，可以让你摸一张牌。',
			duanliang_info:'你可以将一张黑色基本牌或装备牌当做【兵粮寸断】使用；若一名角色的手牌数大于或等于你的手牌数，你对其使用【兵粮寸断】没有距离限制',
			haoshi_info:'摸牌阶段，你可以额外摸两张牌，若此时你的手牌数多于五张，你必须将一半(向下取整)的手牌交给场上除你外手牌数最少的一名角色。',
			dimeng_info:'出牌阶段，你可以选择其他两名角色，你弃掉等同于这两名角色手牌数量之差的牌，然后交换他们的手牌，每回合限一次。',
			yinghun_old_info:'准备阶段，若你已受伤，可选择一名其他角色执行下列两项中的一项： 1.摸X张牌，然后弃一张牌。 2.摸一张牌，然后弃X张牌。 X为你已损失的体力值，每回合限一次。',
			jiuchi_info:'你可将你的任意一张♠手牌当【酒】使用。',
			roulin_info:'你对女性角色、女性角色对你使用【杀】时，都需连续使用两张【闪】才能抵消。',
			benghuai_info:'结束阶段，若你的体力不是全场最少的(或之一)，你须减1点体力或体力上限。',
			baonue_info:'主公技，其他群雄角色每造成一次伤害，可进行一次判定，若为♠，你回复1点体力。',
			luanwu_info:'限定技，出牌阶段，可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，无法如此做者失去1点体力。',
			wansha_info:'在你的回合，除你以外，只有处于濒死状态的角色才能使用【桃】。',
			weimu_info:'你不能成为♠或♣锦囊的目标。',

			sp_zhugeliang:'卧龙',
			pangtong:'庞统',
			xunyu:'荀彧',
			dianwei:'典韦',
			taishici:'太史慈',
			yanwen:'颜良文丑',
			yuanshao:'旧袁绍',
			pangde:'庞德',
			huoji:'火计',
			bazhen:'八阵',
			kanpo:'看破',
			xinlianhuan:'连环',
			lianhuan:'连环',
			lianhuan1:'连环',
			lianhuan3:'连环',
			lianhuan2:'连铸',
			niepan:'涅槃',
			oldniepan:'涅槃',
			quhu:'驱虎',
			jieming:'节命',
			qiangxi:'强袭',
			tianyi:'天义',
			shuangxiong:'双雄',
			shuangxiong2:'双雄',
			luanji:'乱击',
			xueyi:'血裔',
			mengjin:'猛进',
			xinlianhuan_info:' 你可以将一张♣手牌当【铁索连环】使用，若以此法使用的【铁索连环】仅指定一个目标，你摸一张牌；你可以重铸♣牌',
			huoji_info:'出牌阶段，你可以将你的任意一张♥或♦手牌当【火攻】使用。',
			bazhen_info:'当你没装备防具时，始终视为你装备着【八卦阵】。',
			kanpo_info:'你可以将你的任意一张♠或♣手牌当【无懈可击】使用。',
			lianhuan_info:'出牌阶段，你可以将你任意一张梅花手牌当【铁索连环】使用或重铸。',
			niepan_info:'限定技，出牌阶段或当你处于濒死状态时，你可以丢弃你所有的牌和你判定区里的牌，并复原你的武将牌，然后摸三张牌且体力回复至3点。',
			oldniepan_info:'限定技，当你处于濒死状态时，你可以丢弃你所有的牌和你判定区里的牌，并复原你的武将牌，然后摸三张牌且体力回复至3点。',
			quhu_info:'出牌阶段，你可以与一名体力比你多的角色拼点，若你赢，则该角色对其攻击范围内另一名由你指定的角色造成1点伤害。若你没赢，他/她对你造成一点伤害。每回合限用一次。',
			jieming_info:'你每受到1点伤害，可令任意一名角色将手牌补至其体力上限的张数(不能超过五张)。',
			qiangxi_info:'出牌阶段，你可以自减一点体力或弃一张武器牌，然后你对你攻击范围内的一名角色造成一点伤害，每回合限一次。',
			tianyi_info:'出牌阶段，你可以和一名角色拼点，若你赢，你获得以下技能直到回合结束：攻击范围无限；可额外使用一张【杀】；使用【杀】时可额外指定一个目标，若你没赢，你不能使用【杀】直到回合结束。每回合限一次。',
			shuangxiong_info:'摸牌阶段，你可选择改为进行一次判定：你获得此判定牌，且于此回合的出牌阶段，你可以将任意一张与此判定牌不同颜色的手牌当【决斗】使用。',
			luanji_info:'出牌阶段，你可以将任意两张相同花色的手牌当【万箭齐发】使用。',
			xueyi_info:'主公技，场上每有一名其他群雄角色存活，你的手牌上限便+2。',
			mengjin_info:'当你使用的【杀】被【闪】抵消时，你可以弃掉对方的一张牌。',

			xiahouyuan:'夏侯渊',
			caoren:'曹仁',
			huangzhong:'黄忠',
			sp_zhangjiao:'张角',
			weiyan:'魏延',
			xiaoqiao:'小乔',
			zhoutai:'周泰',
			zhangjiao:'旧张角',
			yuji:'于吉',
			shensu:'神速',
			shensu1:'神速',
			shensu2:'神速',
			shensu4:'神速',
			jushou:'据守',
			liegong:'烈弓',
			kuanggu:'狂骨',
			tianxiang:'天香',
			hongyan:'红颜',
			buqu:'不屈',
			buqu_bg:'创',
			leiji:'雷击',
			guidao:'鬼道',
			huangtian:'黄天',
			huangtian2:'黄天',
			guhuo:'蛊惑',
			fenji:'奋激',
			releiji:'雷击',
			jiewei:'解围',
			tiangong:'天公',
			tiangong2:'天公',
			xinliegong:'烈弓',
			xinkuanggu:'狂骨',
			gzbuqu:'不屈',
			gzbuqu_info:'当你扣减1点体力时，若你的体力值为0，你可以将牌堆顶的一张牌置于你的武将牌上：若此牌的点数与你武将牌上的其他牌均不同，你不会死亡；若你的武将牌上有点数相同的牌，你进入濒死状态',
			xinkuanggu_info:'当你对距离1以内的一名角色造成1点伤害后，你可以回复1点体力或摸一张牌',
			xinliegong_info:'你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标；当你使用【杀】指定一个目标后，你可以根据下列条件执行相应的效果：1.其手牌数小于等于你的手牌数，此【杀】不可被【闪】响应 2.其体力值大于等于你的体力值，此【杀】伤害+1',
			jiewei_info:'每当你翻面，你可以使用一张锦囊牌或装备牌，若如此做，此牌结算后，你可以弃置场上一张同类型的牌',
			releiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为梅花，其受到一点雷电伤害，然后你回复一点体力；若结果为黑桃，其受到两点雷电伤害',
			tiangong_info:'锁定技，你防止即将受到的雷电伤害，每当你造成一次雷电伤害，你摸一张牌',
			shensu_info:'你可以跳过摸牌阶段，或跳过出牌阶段并弃置一张装备牌，若如此则视为对任意一名使用一张【杀】',
			jushou_info:'结束阶段，你可以摸3张牌并将武将牌翻面',
			liegong_info:'当你使用【杀】时，若目标的手牌数大于等于你的体力值，或小于等于你的攻击范围，你可令此【杀】不能闪避',
			kuanggu_info:'锁定技，每当你造成一点伤害，若受伤害角色与你的距离不大于1，你回复一点体力',
			tianxiang_info:'当你即将受到伤害时，你可以弃置一张红桃牌将伤害转移给任意一名其他角色，然后该角色摸x张牌，x为其已损失体力值',
			hongyan_info:'锁定技，你的黑桃牌均视为红桃',
			buqu_info:'锁定技，在你死亡前，若你的体力值不大于0，亮出牌堆顶的一张牌并置于你的武将牌上，若此牌的点数与你武将牌上已有的牌点数均不同，则你回复至1体力。只要你的武将牌上有牌，你的手牌上限便与这些牌数量相等',
			leiji_info:'每当你使用或打出一张【闪】，可令任意一名角色进行一次判定，若结果为黑桃，其受到两点雷电伤害',
			guidao_info:'任意一名角色的判定生效前，你可以打出一张黑色牌替换之',
			huangtian_info:'主公技，群雄角色可在他们各自的回合里给你一张【闪】或【闪电】。',
			guhuo_info:'每名角色的回合限一次，你可以扣置一张手牌当一张基本牌或普通锦囊牌使用或打出。其他角色依次选择是否质疑。一旦有其他角色质疑则翻开此牌：若为假则此牌作废，若为真，则质疑角色获得技能“缠怨”（锁定技，你不能质疑于吉，只要你的体力值为1，你失去你的武将技能）',
			fenji_info:'每当一名角色的手牌于回合外被弃置时，你可以失去1点体力，然后该角色摸两张牌。',

		},
	};
});
