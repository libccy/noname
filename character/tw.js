'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'tw',
		connect:true,
		characterSort:{
			tw:{
				tw_mobile:['nashime','tw_dongzhao','jiachong','duosidawang','wuban','yuejiu','tw_huojun','tw_caocao','tw_zhangmancheng','tw_caozhao','tw_wangchang','tw_puyangxing'],
				tw_mobile2:['tw_beimihu','tw_gexuan','tw_fuwan','tw_yujin','tw_zhaoxiang','tw_hucheer','tw_hejin','tw_mayunlu','tw_re_caohong','tw_zangba','tw_liuhong','tw_chengpu','tw_guohuai','tw_wujing','tw_wangcan','old_quancong','tw_tianyu'],
				tw_yijiang:['tw_caoang','tw_caohong','tw_zumao','tw_dingfeng','tw_maliang','tw_xiahouba'],
				tw_english:['kaisa'],
			},
		},
		character:{
			tw_puyangxing:['male','wu',4,['twzhengjian','twzhongchi']],
			tw_tianyu:['male','wei',4,['twzhenxi','twyangshi']],
			old_quancong:['male','wu',4,['zhenshan']],
			tw_wujing:['male','wu',4,['twfenghan','twcongji']],
			tw_wangcan:['male','wei',3,['twdianyi','twyingji','twshanghe']],
			tw_wangchang:['male','wei',3,['twkaiji','twshepan']],
			tw_caozhao:['male','wei',4,['twfuzuan','twchongqi']],
			tw_guohuai:["male","wei",4,["twjingce","yuzhang"]],
			tw_chengpu:['male','wu',4,['twlihuo','twchunlao']],
			tw_zhangmancheng:['male','qun',4,['twfengji','twyiju','twbudao']],
			tw_caocao:['male','qun',4,['twlingfa']],
			tw_liuhong:['male','qun',4,['twyujue','twgezhi','twfengqi'],['zhu']],
			tw_huojun:['male','shu',4,['twsidai','twjieyu']],
			tw_zangba:['male','wei',4,['twhanyu','twhengjiang']],
			tw_re_caohong:['male','wei',4,['twyuanhu','twjuezhu']],
			tw_mayunlu:['female','shu',4,['mashu','twfengpo']],
			tw_hejin:['male','qun',4,['twmouzhu','twyanhuo']],
			tw_hucheer:['male','qun',4,['twshenxing','twdaoji']],
			tw_yujin:['male','qun',4,['xinzhenjun']],
			tw_fuwan:['male','qun',4,['twmoukui']],
			tw_zhaoxiang:['female','shu',4,['refanghun','twfuhan','twqueshi']],
			yuejiu:['male','qun',4,['cuijin']],
			wuban:['male','shu',4,['jintao']],
			duosidawang:['male','qun','4/5',['equan','manji']],
			jiachong:['male','qun',3,['beini','dingfa']],
			tw_dongzhao:['male','wei',3,['twmiaolve','twyingjia']],
			tw_gexuan:['male','qun',3,['twdanfa','twlingbao','twsidao']],
			tw_beimihu:['female','qun',3,['zongkui','guju','baijia','bingzhao'],['zhu']],
			nashime:['male','qun',3,['chijie','waishi','renshe']],
			tw_xiahouba:['male','shu',4,['twyanqin','twbaobian']],
			tw_zumao:['male','wu',4,['twtijin']],
			tw_caoang:['male','wei',4,['twxiaolian']],
			tw_dingfeng:['male','wu',4,['twqijia','twzhuchen']],
			tw_caohong:['male','wei',4,['twhuzhu','twliancai']],
			tw_maliang:['male','shu',3,['twrangyi','twbaimei']],
			kaisa:["male","western",4,["zhengfu"]],
		},
		characterIntro:{
			nashime:'难升米（なしめ，或なんしょうまい）是倭国大夫。景初二年六月，受女王卑弥呼之命，与都市牛利出使魏国，被魏国拜为率善中郎将。',
			jiachong:'贾充（217年—282年），字公闾，平阳襄陵（今山西襄汾）人，三国曹魏至西晋时期大臣，曹魏豫州刺史贾逵之子。西晋王朝的开国元勋。出身平阳贾氏。曾参与镇压淮南二叛和弑杀魏帝曹髦，因此深得司马氏信任，其女儿贾褒（一名荃）及贾南风分别嫁予司马炎弟司马攸及次子司马衷，与司马氏结为姻亲，地位显赫。晋朝建立后，转任车骑将军、散骑常侍、尚书仆射，后升任司空、太尉等要职。更封鲁郡公。咸宁末，为使持节、假黄钺、大都督征讨吴国。吴国平定后，增邑八千户。太康三年（282年），贾充去世。西晋朝廷追赠他为太宰，礼官议谥曰荒，司马炎不采纳，改谥为武。有集五卷。',
			duosidawang:'朵思大王是《三国演义》中人物，南蛮秃龙洞的元帅，孟获弟弟孟优的朋友，据说是南蛮第一智者。',
			wuban:'吴班，字元雄，生卒年不详，兖州陈留郡（治今河南省开封市）人。三国时期蜀汉将领。为领军，随刘备参加伐吴之战，后又随蜀汉丞相诸葛亮参加北伐曹魏的战争，并于公元231年（建兴九年）的北伐中大破司马懿。官至骠骑将军，封绵竹侯。吴班以豪爽侠义著称于当时，又因族妹吴氏是蜀汉穆皇后，在蜀汉将领中有较高的地位。',
			yuejiu:'乐就（？－197），在袁术为攻徐州而大兴七军之际，以督战官之身份担任联络之役。但是，袁术军不幸战败，其也在寿春被曹操军逮捕并遭到斩首。',
			huojun:'霍峻（178年—217年），字仲邈，南郡枝江（今湖北枝江）人，东汉末年刘备麾下名将。其兄霍笃曾在故乡聚部众数百人。后霍笃逝世，刘表以霍峻继承其部曲。208年（建安十三年），刘表病逝，霍峻便率部曲归降刘备，并被任为中郎将。后随刘备入蜀，刘备从葭萌还袭刘璋，留霍峻守葭萌城。张鲁遣将杨帛劝降霍峻，霍峻严词拒绝，杨帛退去。后刘璋将扶禁、向存等率万余人由阆水上，攻围霍峻，城中兵不过数百人，霍峻坚守一年，伺机将其击破。刘备定蜀，嘉霍峻之功，于是分广汉为梓潼郡，以峻为梓潼太守、裨将军。三年后去世，还葬成都。刘备亲率群僚临会吊祭，留宿墓上，当时的人都为他感到荣幸。',
			zhangmancheng:'张曼成（？—184年6月），东汉末年黄巾之乱时南阳黄巾军首领，杀郡守褚贡，一度占据宛城数月，后为秦颉所杀。',
			caozhao:'曹肇（？-244年），字长思，沛国谯县（今安徽亳州）人。三国时期魏国大臣，大司马曹休之子。容貌俊美，有当世才度，深得魏明帝宠信，官至散骑常侍、屯骑校尉。魏明帝临死，与燕王曹宇等托付后事。不果，以长平侯归第。正始五年（244年）卒，追赠为卫将军。',
			wangchang:'王昶（2世纪－259年），字文舒，太原郡晋阳县（今山西太原）人。三国时期曹魏将领，东汉代郡太守王泽之子。出身太原王氏，少有名气，进入曹丕幕府，授太子文学。曹丕即位后，拜散骑侍郎，迁兖州刺史，撰写《治论》、《兵书》，作为朝廷提供施政参考。魏明帝曹叡即位后，升任扬烈将军，封关内侯。齐王曹芳即位，迁徐州刺史，拜征南将军。太傅司马懿掌权后，深得器重，奏请伐吴，在江陵取得重大胜利，升任征南大将军、开府仪同三司，晋爵京陵侯。正元年间（255年），参与平定“淮南三乱”有功，迁骠骑大将军，守司空。甘露四年（259年），去世，赠司徒，谥号为穆。',
			puyangxing:'濮阳兴（？-264年），字子元，陈留（治今河南开封）人，三国时期东吴大臣，吴景帝孙休末年至末帝孙皓初年任丞相。孙权时为上虞县令，后升任尚书左曹、五官中郎将、会稽太守。孙休即位，征召为太常卫将军、平军国事，封外黄侯。永安三年（260年），力主建丹杨湖田，事倍功半，百姓大怨。后升任丞相。永安七年（264年），孙休去世，濮阳兴与张布迎立孙皓。担任侍郎，兼任青州牧。同年被万彧谮毁，流放广州，途中被孙皓派人追杀，并夷三族。',
		},
		card:{
			dz_mantianguohai:{
				fullskin:true,
				type:'trick',
				enable:true,
				derivation:'tw_dongzhao',
				global:['dz_mantianguohai'],
				selectTarget:[1,2],
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('hej')>0;
				},
				content:function(){
					player.gainPlayerCard(target,'hej',true);
				},
				contentAfter:function(){
					'step 0'
					var evtx=event.getParent();
					event.targets=targets.filter(function(target){
						return target.hasHistory('lose',function(evt){
							return evt.getParent(3).name=='dz_mantianguohai'&&evt.getParent(4)==evtx;
						});
					});
					if(!event.targets.length||!player.countCards('he')) event.finish();
					'step 1'
					var target=targets.shift();
					event.target=target;
					var next=player.chooseCard('he',true,'交给'+get.translation(target)+'一张牌');
					if(player.hasSkill('twyingjia')&&player.countUsed('dz_mantianguohai')==1) next.set('ai',function(card){
						if(card.name=='dz_mantianguohai') return -10;
						return -get.value(card,_status.event.getParent().target);
					});
					'step 2'
					if(result.bool){
						target.gain(result.cards,player,'giveAuto');
					}
					'step 3'
					if(targets.length&&player.countCards('h')>0) event.goto(1);
				},
				ai:{
					order:6,
					tag:{
						lose:1,
						loseCard:1,
					},
					result:{
						target:-0.1,
					},
				},
			},
			gx_lingbaoxianhu:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_lingbaoxianhu']
			},
			gx_taijifuchen:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				derivation:'tw_gexuan',
				distance:{attackFrom:-4},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['gx_taijifuchen']
			},
			gx_chongyingshenfu:{
				fullskin:true,
				type:'equip',
				subtype:'equip2',
				derivation:'tw_gexuan',
				ai:{
					basic:{
						equipValue:7,
					}
				},
				skills:['gx_chongyingshenfu'],
				loseDelay:false,
			},
			meiyingqiang:{
				fullskin:true,
				type:'equip',
				subtype:'equip1',
				cardimage:'yinyueqiang',
				derivation:'tw_zhaoxiang',
				distance:{attackFrom:-2},
				ai:{
					basic:{
						equipValue:4.5,
					}
				},
				skills:['meiyingqiang'],
			},
		},
		characterFilter:{
			nashime:function(mode){
				return mode!='guozhan';
			},
			tw_xiahouba:function(mode){
				return mode!='guozhan';
			},
		},
		skill:{
			//濮阳兴
			twzhengjian:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					if(event.name=='phase'&&game.phaseNumber!=0) return false;
					return !player.hasSkill('twzhengjian_eff0')&&!player.hasSkill('twzhengjian_eff1')
				},
				content:function(){
					'step 0'
					player.chooseControl().set('prompt','征建：请选择一种效果').set('choiceList',[
						'令“出牌阶段内未使用过非基本牌”的其他角色受到惩罚',
						'令“出牌阶段内未获得过牌”的其他角色受到惩罚',
					]).set('ai',()=>Math.random()<=0.5?0:1);
					'step 1'
					player.addSkill('twzhengjian_eff'+result.index);
					game.log(player,'获得了','#g【征建】','的','#y效果'+get.cnNumber(result.index+1,true));
					game.delayx();
				},
				onremove:true,
				subSkill:{
					eff0:{
						audio:'twzhengjian',
						trigger:{global:'phaseUseEnd'},
						forced:true,
						charlotte:true,
						marktext:'建',
						mark:true,
						filter:function(event,player){
							if(event.player==player||event._twzhengjian||!event.player.isIn()) return false;
							if(event.player.hasHistory('useCard',function(evt){
								return evt.getParent('phaseUse')==event&&get.type(evt.card)!='basic';
							})) return false;
							return player.storage.twzhengjian||event.player.countCards('he')>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							trigger._twzhengjian=true;
							var target=trigger.player;
							event.target=target;
							if(player.storage.twzhengjian){
								player.chooseBool('征建：是否对'+get.translation(target)+'造成1点伤害？').set('ai',()=>_status.event.goon).set('goon',get.damageEffect(target,player,player)>0);
							}
							else{
								target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌');
							}
							'step 1'
							if(result.bool){
								if(result.cards&&result.cards.length){
									player.gain(result.cards,target,'giveAuto').type='twzhengjian';
								}
								else target.damage();
							}
							player.chooseBool('是否变更【征建】的效果？');
							'step 2'
							if(result.bool){
								player.removeSkill('twzhengjian_eff0');
								player.addSkill('twzhengjian_eff1');
								game.log(player,'将','#g【征建】','的效果变更为','#y效果二');
							}
						},
						intro:{
							content:function(storage,player){
								if(player.storage.twzhengjian) return '其他角色的出牌阶段结束时，若其本阶段内未使用过非基本牌，则你可对其造成1点伤害，然后你可失去此效果并获得〖征建〗的效果二。';
								return '其他角色的出牌阶段结束时，若其本阶段内未使用过非基本牌，则其须交给你一张牌，然后你可失去此效果并获得〖征建〗的效果二。';
							},
						},
					},
					eff1:{
						audio:'twzhengjian',
						trigger:{global:'phaseUseEnd'},
						forced:true,
						charlotte:true,
						marktext:'征',
						mark:true,
						filter:function(event,player){
							if(event.player==player||event._twzhengjian||!event.player.isIn()) return false;
							if(event.player.hasHistory('gain',function(evt){
								return evt.getParent('phaseUse')==event;
							})) return false;
							return player.storage.twzhengjian||event.player.countCards('he')>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							trigger._twzhengjian=true;
							var target=trigger.player;
							event.target=target;
							if(player.storage.twzhengjian){
								player.chooseBool('征建：是否对'+get.translation(target)+'造成1点伤害？');
							}
							else{
								target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌');
							}
							'step 1'
							if(result.bool){
								if(result.cards&&result.cards.length){
									player.gain(result.cards,target,'giveAuto').type='twzhengjian';
								}
								else target.damage();
							}
							player.chooseBool('是否变更【征建】的效果？').set('ai',()=>Math.random()>0.5);
							'step 2'
							if(result.bool){
								player.removeSkill('twzhengjian_eff1');
								player.addSkill('twzhengjian_eff0');
								game.log(player,'将','#g【征建】','的效果变更为','#y效果一');
							}
						},
						intro:{
							content:function(storage,player){
								if(player.storage.twzhengjian) return '其他角色的出牌阶段结束时，若其本阶段内未获得过牌，则你可对其造成1点伤害，然后你可失去此效果并获得〖征建〗的效果二。';
								return '其他角色的出牌阶段结束时，若其本阶段内未获得过牌，则其须交给你一张牌，然后你可失去此效果并获得〖征建〗的效果二。';
							},
						},
					},
				},
			},
			twzhongchi:{
				audio:2,
				trigger:{player:'gainAfter'},
				forced:true,
				skillAnimation:true,
				animationColor:'wood',
				filter:function(event,player){
					if(player.storage.twzhengjian||!player.hasSkill('twzhengjian',null,null,false)) return false;
					var num1=game.countPlayer2();
					var list=[];
					player.getAllHistory('gain',function(evt){
						if(evt.type=='twzhengjian') list.add(evt.source);
					});
					return list.length>=Math.ceil(num1/2);
				},
				content:function(){
					player.storage.twzhengjian=true;
					player.addSkill('twzhongchi_effect');
					game.delayx();
				},
				subSkill:{
					effect:{
						mark:true,
						marktext:'斥',
						intro:{content:'受到渠道为【杀】的伤害+1'},
						trigger:{player:'damageBegin1'},
						forced:true,
						filter:function(event,player){
							return event.card&&event.card.name=='sha';
						},
						content:function(){
							trigger.num++;
						},
					},
				},
			},
			//田豫
			twzhenxi:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				direct:true,
				filter:function(event,player){
					var target=event.target;
					return event.card.name=='sha'&&(target.countCards('h')>0||target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canEquip(card);
						})
					},'e')||target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canAddJudge(card);
						})
					},'j'));
				},
				usable:1,
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					var str=get.translation(target);
					var list=[
						'弃置'+str+'的'+get.cnNumber(get.distance(player,target))+'张手牌',
						'将'+str+'装备区或判定区内的一张牌移动到另一名角色的对应区域内',
					];
					var choices=[];
					if(target.countCards('h')>0) choices.push('选项一');
					else list[0]='<span style="opacity:0.5">'+list[0]+'</span>';
					if(target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canEquip(card);
						})
					},'e')||target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canAddJudge(card);
						})
					},'j')) choices.push('选项二');
					else list[1]='<span style="opacity:0.5">'+list[1]+'</span>';
					if(choices.length==2&&(target.hp>player.hp||target.isMaxHp())) choices.push('全部执行');
					choices.push('cancel2');
					player.chooseControl(choices).set('choiceList',list).set('prompt',get.prompt('twzhenxi',target)).set('ai',function(){
						var player=_status.event.player,target=_status.event.getTrigger().target;
						var eff1=0,eff2=0;
						var choices=_status.event.controls.slice(0);
						if(choices.contains('选项一')){
							eff1=-get.distance(player,target)*get.attitude(player,target);
						}
						if(choices.contains('选项二')){
							var equip=0,judge=0,att=get.attitude(player,target);
							var es=target.getCards('e'),js=target.getCards('j');
							for(var i of es){
								var val=get.value(i);
								if(att>0){
									if(val<=Math.min(0,equip)&&game.hasPlayer(function(current){
										return current!=target&&current.isEmpty(get.subtype(i))&&get.effect(current,i,player,player)>0;
									})) equip=val;
								}
								else{
									if(val>Math.max(0,equip)&&game.hasPlayer(function(current){
										return current!=target&&current.isEmpty(get.subtype(i))&&get.effect(current,i,player,player)>0;
									})) equip=val;
								}
							}
							for(var i of js){
								var card={name:i.viewAs||i.name};
								var effect=get.effect(target,card,player,player);
								if(effect<0){
									game.countPlayer(function(current){
										if(current!=target&&current.canAddJudge(i)){
											var eff=get.effect(current,card,player,player);
											judge=Math.max(eff,judge);
										}
									});
								}
							}
							eff2=Math.max(-equip*att,judge);
						}
						if(eff1>0){
							if(eff2>0){
								if(choices.contains('全部执行')) return '全部执行';
								else if(eff2>=eff1) return '选项二';
							}
							return '选项一';
						}
						else if(eff2>0) return '选项二';
						return 'cancel2';
					});
					'step 1'
					if(result.control=='cancel2'){
						event.finish();
						return;
					}
					player.logSkill('twzhenxi',target);
					event.control=result.control;
					if(event.control!='选项二') player.discardPlayerCard(target,true,'h',get.distance(player,target));
					if(event.control=='选项一') event.finish();
					'step 2'
					if(event.control!='选项一'&&(target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canEquip(card);
						})
					},'e')||target.hasCard(function(card){
						return game.hasPlayer(function(current){
							return current!=target&&current.canAddJudge(card);
						})
					},'j'))){
						player.chooseTarget(true,'将'+get.translation(target)+'区域内的一张牌移动给另一名角色',function(card,player,target){
							var source=_status.event.preTarget;
							if(source==target) return false;
							return source.hasCard(function(card){
								return target.canEquip(card);
							},'e')||source.hasCard(function(card){
								return target.canAddJudge(card);
							},'j');
						}).set('preTarget',target).set('ai',function(target){
							var player=_status.event.player,source=_status.event.preTarget;
							var att=get.attitude(player,source);
							var es=source.getCards('e',function(card){
								return target.canEquip(card);
							}),js=source.getCards('j',function(card){
								return target.canAddJudge(card);
							});
							var eff=0;
							for(var i of es){
								var val=get.value(i,source);
								if(att>0?val<=0:val>0){
									eff=Math.max(eff,get.effect(target,i,player,player));
								}
							}
							for(var i of js){
								var card={name:i.viewAs||i.name};
								if(get.effect(source,card,player,player)<0){
									eff=Math.max(eff,get.effect(target,card,player,player));
								}
							}
							return eff;
						});
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var target2=result.targets[0];
						event.target2=target2;
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
						},target).set('targets0',target).set('targets1',target2).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							if(get.position(button.link)=='j'){
								return targets1.canAddJudge(button.link);
							}
							else{
								return targets1.isEmpty(get.subtype(button.link));
							}
						}).set('ai',function(button){
							var player=_status.event.player,target=_status.event.targets1,source=_status.event.targets[0];
							var att=get.attitude(player,source);
							if(get.position(card)=='e'){
								var val=get.value(card);
								if(att>0?val>0:val<=0) return 0;
								return get.effect(target,card,player,player);
							}
							var cardx={name:card.viewAs||card.name};
							if(get.effect(source,cardx,player,player)>=0) return 0;
							return get.effect(target,cardx,player,player)
						});
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						if(get.position(link)=='e'){
							event.target2.equip(link);
						}
						else if(link.viewAs){
							event.target2.addJudge({name:link.viewAs},[link]);
						}
						else{
							event.target2.addJudge(link);
						}
						target.$give(link,event.target2,false);
						game.log(target,'的',link,'被移动给了',event.target2);
						game.delay();
					}
				},
				ai:{
					unequip_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.name||arg.name!='sha') return false;
						if(player.storage.counttrigger&&player.storage.counttrigger.twzhenxi) return false;
						if(!arg.target) return false;
						var card=arg.target.getEquip(2);
						return card&&get.value(card)>0&&game.hasPlayer(function(current){
							return current!=arg.target&&current.canEquip(card)&&get.effect(current,card,player,player)>0;
						})
					},
				},
			},
			twyangshi:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				content:function(){
					if(game.hasPlayer(function(current){
						return current!=player&&!player.inRange(current);
					})){
						player.addSkill('twyangshi_distance');
						player.addMark('twyangshi_distance',1,false);
					}
					else{
						var card=get.cardPile2(function(card){
							return card.name=='sha';
						});
						if(card) player.gain(card,'gain2');
						else game.log('但是牌堆里已经没有杀了！');
					}
				},
				subSkill:{
					distance:{
						charlotte:true,
						onremove:true,
						mod:{
							attackRange:function(player,num){
								return num+player.countMark('twyangshi_distance');
							},
						},
						intro:{
							content:'攻击范围+#',
						},
					},
				},
			},
			//全琮
			zhenshan:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					if(event.type=='wuxie') return false;
					var nh=player.countCards('h');
					if(!game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')<nh;
					})){
						return false;
					}
					for(var i of lib.inpile){
						if(get.type(i)!='basic') continue;
						var card={name:i,isCard:true};
						if(event.filterCard(card,player,event)) return true;
						if(i=='sha'){
							for(var j of lib.inpile_nature){
								card.nature=j;
								if(event.filterCard(card,player,event)) return true;
							}
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];for(var i of lib.inpile){
						if(get.type(i)!='basic') continue;
						var card={name:i,isCard:true};
						if(event.filterCard(card,player,event)) list.push(['基本','',i]);
						if(i=='sha'){
							for(var j of lib.inpile_nature){
								card.nature=j;
								if(event.filterCard(card,player,event)) list.push(['基本','',i,j]);
							}
						}
					}
						return ui.create.dialog('振赡',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(card.name=='jiu') return 0;
						if(game.hasPlayer(function(current){
							return get.effect(current,card,player,player)>0;
						})){
							if(card.name=='sha'){
								var eff=player.getUseValue(card);
								if(eff>0) return 2.9+eff/10;
								return 0;
							}
							else if(card.name=='tao'||card.name=='shan'){
								return 4;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
								isCard:true,
							},
							selectCard:-1,
							precontent:function(){
								'step 0'
								player.chooseTarget('选择一名手牌数小于你的角色交换手牌',function(card,player,target){
									return target!=player&&target.countCards('h')<player.countCards('h')
								},true).set('ai',function(target){
									return get.attitude(player,target)*Math.sqrt(target.countCards('h')+1);
								});
								'step 1'
								if(result.bool){
									player.logSkill('zhenshan',result.targets);
									player.swapHandcards(result.targets[0]);
									delete event.result.skill;
								}
								else event.finish();
								'step 2'
								game.delayx();
							},
						}
					},
					prompt:function(links,player){
						return '选择【'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'】的目标';
					}
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						var nh=player.countCards('h');
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0&&current.countCards('h')<nh;
						})){
							if(event.type=='dying'){
								if(event.filterCard({name:'tao'},player,event)){
									return 0.5;
								}
							}
							else{
								if(event.filterCard({name:'tao'},player,event)||event.filterCard({name:'shan'},player,event)){
									return 4;
								}
								if(event.filterCard({name:'sha'},player,event)){
									return 2.9;
								}
							}
						}
						return 0;
					},
					save:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						var nh=player.countCards('h');
						return game.hasPlayer(function(current){
							return current!=player&&current.countCards('h')<nh;
						});
					},
					result:{
						player:function(player){
							if(_status.event.type=='dying'){
								return get.attitude(player,_status.event.dying);
							}
							else{
								return 1;
							}
						}
					}
				}
			},
			//吴景
			twfenghan:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return event.isFirstTarget&&event.targets.length>0&&(event.card.name=='sha'||get.type(event.card,false)=='trick'&&get.tag(event.card,'damage')>0);
				},
				content:function(){
					'step 0'
					var num=trigger.targets.length;
					player.chooseTarget([1,num],get.prompt('twfenghan'),'令至多'+get.cnNumber(num)+'名角色各摸一张牌').set('ai',function(target){
						return Math.sqrt(5-Math.min(4,target.countCards('h')))*get.attitude(_status.event.player,target)*(target.hasSkillTag('nogain')?0.1:1);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('twfenghan',targets);
						if(targets.length>1) game.asyncDraw(targets);
						else{
						 targets[0].draw();
						 event.finish();
						}
					}
					else{
						player.storage.counttrigger.twfenghan--;
						event.finish();
					}
					'step 2'
					game.delayx();
				},
			},
			twcongji:{
				audio:2,
				trigger:{player:'loseAfter'},
				direct:true,
				filter:function(event,player){
					if(player==_status.currentPhase||event.type!='discard'||event.position!=ui.discardPile||!game.hasPlayer((current)=>current!=player)) return false;
					for(var i of event.cards2){
						if(get.color(i,player)=='red'&&get.position(i,true)=='d') return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					var cards=[];
					for(var i of trigger.cards2){
						if(get.color(i,player)=='red'&&get.position(i,true)=='d') cards.push(i);
					}
					player.chooseButton(['从击：选择任意张牌交给其他角色',cards],[1,cards.length]).set('goon',game.hasPlayer(function(current){
						return current!=player&&get.attitude(player,current)>0;
					})).set('ai',function(button){
						if(_status.event.goon) return get.value(button.link);
						return button.link.name=='du'?1:0;
					});
					'step 1'
					if(result.bool){
						event.cards=result.links;
						player.chooseTarget('选择一名角色获得以下牌：',get.translation(cards),true,lib.filter.notMe).set('ai',function(target){
							var player=_status.event.player,cards=_status.event.getParent().cards;
							if(cards[0].name=='du') return -get.attitude(player,target);
							var att=get.attitude(player,target);
							if(att<=0) return 0;
							if(target.hasSkillTag('nogain')) att/=10;
							if(target.hasJudge('lebu')) att/=4;
							return get.value(cards,target)*att;
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('twcongji',target);
						target.gain(cards,'gain2');
					}
				},
			},
			//王粲
			twdianyi:{
				audio:2,
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					if(!player.getHistory('sourceDamage').length) return player.countCards('h')!=4;
					return player.countCards('h')>0;
				},
				content:function(){
					var num=player.countCards('h');
					if(player.getHistory('sourceDamage').length) player.chooseToDiscard('h',true,num);
					else if(num>4) player.chooseToDiscard('h',true,num-4);
					else player.drawTo(4);
				},
			},
			twyingji:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				hiddenCard:function(player,name){
					return player!=_status.currentPhase&&lib.inpile.contains(name)&&player.countCards('h')==0;
				},
				filter:function(event,player){
					if(player==_status.currentPhase||player.countCards('h')>0) return false;
					for(var i of lib.inpile){
						if(i=='wuxie') continue;
						var type=get.type(i);
						if((type=='basic'||type=='trick')&&event.filterCard({name:i},player,event)) return true;
						if(i=='sha'){
							for(var j of lib.inpile_nature){
								if(event.filterCard({name:i,nature:j},player,event)) return true;
							}
						}
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var i of lib.inpile){
							if(i=='wuxie') continue;
							var type=get.type(i);
							if(type=='basic'||type=='trick'){
								var card={name:i,isCard:true};
								if(event.filterCard(card,player,event)) list.push([type,'',i]);
								if(i=='sha'){
									for(var j of lib.inpile_nature){
										card.nature=j;
										if(event.filterCard(card,player,event)) list.push(['基本','','sha',j]);
									}
								}
							}
						}
						return ui.create.dialog('应机',[list,'vcard']);
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						var val=_status.event.getParent().type=='phase'?player.getUseValue(card):1;
						return val;
					},
					backup:function(links,player){
						return {
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
								isCard:true,
							},
							filterCard:()=>false,
							selectCard:-1,
							precontent:function(){
								player.logSkill('twyingji');
								player.draw('nodelay');
								delete event.result.skill;
							},
						}
					},
					prompt:function(links){
						return '将一张手牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					fireAttack:true,
					respondShan:true,
					respondSha:true,
					skillTagFilter:function(player){
						if(player==_status.currentPhase||player.countCards('h')>0) return false;
					},
					order:10,
					result:{
						player:1,
					},
				},
				group:['twyingji_wuxie'],
			},
			twyingji_wuxie:{
				enable:'chooseToUse',
				viewAs:{
					name:'wuxie',
					isCard:true,
				},
				viewAsFilter:function(player){
					return player!=_status.currentPhase&&player.countCards('h')==0;
				},
				filterCard:()=>false,
				prompt:'视为使用【无懈可击】并摸一张牌',
				selectCard:[0,1],
				check:()=>1,
				precontent:function(){
					player.logSkill('twyingji');
					player.draw('nodelay');
					delete event.result.skill;
				},
				ai:{
					order:4,
				},
			},
			twshanghe:{
				trigger:{player:'dying'},
				limited:true,
				audio:2,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he')>0;
					})
				},
				prompt:'是否发动【觞贺】？',
				skillAnimation:true,
				animationColor:'soil',
				logTarget:(event,player)=>game.filterPlayer((current)=>current!=player),
				content:function(){
					"step 0"
					player.awakenSkill('twshanghe');
					event.targets=game.filterPlayer((current)=>current!=player);
					event.num=0;
					event.jiu=false;
					"step 1"
					event.current=targets[num];
					if(!event.current.countCards('he')) event.goto(3);
					else event.current.chooseCard('交给'+get.translation(player)+'一张牌','he',true).set('ai',function(card){
						var evt=_status.event.getParent();
						return 100-get.value(card);
					});
					"step 2"
					if(result.bool&&result.cards&&result.cards.length){
						player.gain(result.cards,event.current,'giveAuto');
						if(!event.jiu&&get.name(result.cards[0],player)=='jiu') event.jiu=true;
					}
					"step 3"
					event.num++;
					if(event.num<targets.length) event.goto(1);
					else if(!event.jiu&&player.hp<1) player.recover(1-player.hp);
				},
			},
			//王昶
			twkaiji:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					var num=1+player.getStorage('twkaiji').length;
					player.chooseTarget([1,num],get.prompt('twkaiji'),'令至多'+get.cnNumber(num)+'名角色各摸一张牌').set('ai',function(target){
						return Math.sqrt(5-Math.min(4,target.countCards('h')))*get.attitude(_status.event.player,target)*(target.hasSkillTag('nogain')?0.1:1);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						event.targets=targets;
						player.logSkill('twkaiji',targets);
						if(targets.length==1) targets[0].draw();
						else game.asyncDraw(targets);
					}
					else event.finish();
					'step 2'
					if(targets.length>1) game.delayx();
					if(game.hasPlayer(function(current){
						return targets.contains(current)&&current.hasHistory('gain',function(evt){
							return evt.getParent(2)==event&&get.type(evt.cards[0],current)!='basic';
						})
					})) player.draw();
				},
				group:'twkaiji_count',
				subSkill:{
					count:{
						trigger:{global:'dying'},
						forced:true,
						firstDo:true,
						silent:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return !player.getStorage('twkaiji').contains(event.player);
						},
						content:function(){
							player.markAuto('twkaiji',[trigger.player]);
						},
					},
				},
			},
			twshepan:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				usable:1,
				direct:true,
				filter:function(event,player){
					return player!=event.player;
				},
				content:function(){
					'step 0'
					var target=trigger.player;
					event.target=target;
					var choiceList=[
						'摸一张牌',
						'将'+get.translation(target)+'区域内的一张牌置于牌堆顶',
					];
					var choices=['选项一'];
					if(target.countCards('hej')>0) choices.push('选项二');
					else choiceList[1]='<span style="opacity:0.5">'+choiceList[1]+'</span>';
					choices.push('cancel2');
					player.chooseControl(choices).set('choiceList',choiceList).set('choice',function(){
						if(choices.length>2&&get.effect(target,{name:'guohe_copy'},player,player)>0) return 1;
						return 0;
					}())
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('twshepan',target);
						if(result.index==1) player.choosePlayerCard(target,'hej',true);
						else{
							player.draw();
							event.goto(3);
						}
					}
					else{
						player.storage.counttrigger.twshepan--;
						event.finish();
					}
					'step 2'
					var card=result.cards[0];
					target.$throw(get.position(card)=='h'?1:card,1000);
					target.lose(card,ui.cardPile,'insert');
					'step 3'
					game.delayx();
					if(target.isIn()&&player.countCards('h')==target.countCards('h')){
						player.storage.counttrigger.twshepan--;
						player.chooseBool('是否令'+get.translation(trigger.card)+'对自己无效？').set('ai',function(){
							var evt=_status.event.getTrigger();
							return get.effect(evt.target,evt.card,evt.player,evt.target)<0;
						});
					}
					else event.finish();
					'step 4'
					if(result.bool) trigger.excluded.add(player);
				},
			},
			//曹肇
			twfuzuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.getSkills(null,false,false).filter(function(i){
							var info=get.info(i);
							return info&&info.zhuanhuanji;
						}).length>0;
					});
				},
				filterTarget:function(card,player,target){
					return target.getSkills(null,false,false).filter(function(i){
						var info=get.info(i);
						return info&&info.zhuanhuanji;
					}).length>0;
				},
				content:function(){
					'step 0'
					var list=target.getSkills(null,false,false).filter(function(i){
						var info=get.info(i);
						return info&&info.zhuanhuanji;
					});
					if(list.length==1){
						event._result={control:list[0]};
					}
					else player.chooseControl(list).set('prompt','选择变更'+get.translation(target)+'一个技能的状态').set('choice',list.contains('twfeifu')?'twfeifu':0).set('ai',()=>_status.event.choice);
					'step 1'
					var skill=result.control;
					target.changeZhuanhuanji(skill);
					target.popup(skill,'wood');
					game.log(target,'的','#g【'+get.translation(skill)+'】','发生了状态变更');
					game.delayx();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(!target.hasSkill('twfeifu')) return 0;
							return target.storage.twfeifu?-1:1;
						},
					},
				},
				group:'twfuzuan_damage',
				subSkill:{
					damage:{
						audio:'twfuzuan',
						trigger:{
							player:'damageEnd',
							source:'damageSource',
						},
						direct:true,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current.getSkills(null,false,false).filter(function(i){
									var info=get.info(i);
									return info&&info.zhuanhuanji;
								}).length>0;
							});
						},
						content:function(){
						 'step 0'
						 player.chooseTarget(lib.skill.twfuzuan.filterTarget,get.prompt('twfuzuan'),'变更一名角色的一个转换技的状态').set('ai',function(target){
						 	var player=_status.event.player;
						 	return get.effect(target,'twfuzuan',player,player);
						 });
						 'step 1'
						 if(result.bool){
						  var target=result.targets[0];
						  player.logSkill('twfuzuan',target);
						  var next=game.createEvent('twfuzuan');
						  next.player=player;
						  next.target=target;
						  next.setContent(lib.skill.twfuzuan.content);
						 }
						},
					},
				},
			},
			twchongqi:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return event.name!='phase'||game.phaseNumber==0;
				},
				logTarget:()=>game.filterPlayer().sortBySeat(),
				content:function(){
					'step 0'
					game.countPlayer(function(current){
						current.addSkill('twfeifu');
					});
					game.log(player,'令所有其他角色获得了技能','#g【非服】')
					game.delayx();
					'step 1'
					player.chooseTarget('是否减1点体力上限，并令一名其他角色获得技能【复纂】？',lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						if(player.hasUnknown()&&!target.isZhu) return 0;
						if(player.getEnemies().contains(target)) return 0;
						return get.attitude(player,target);
					});
					'step 2'
					if(result.bool){
						player.loseMaxHp();
						var target=result.targets[0];
						player.line(target,'fire');
						target.addSkillLog('twfuzuan');
						game.delayx();
					}
				},
				derivation:'twfeifu',
			},
			twfeifu:{
				audio:2,
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				zhuanhuanji:true,
				forced:true,
				mark:true,
				marktext:'☯',
				intro:{
					content:function(storage,player){
						return (storage?'当你使用【杀】指定唯一目标后':'当你成为【杀】的唯一目标后')+'目标角色须交给使用者一张牌。若此牌为装备牌，则使用者可使用此牌。';
					},
				},
				filter:function(event,player,name){
					return event.card.name=='sha'&&event.targets.length==1
						&&event.player.isIn()&&event.target.countCards('he')>0&&
						(name=='useCardToPlayered')==Boolean(player.storage.twfeifu);
				},
				logTarget:function(event,player){
					return player.storage.twfeifu?event.target:event.player;
				},
				content:function(){
					'step 0'
					player.changeZhuanhuanji('twfeifu');
					trigger.target.chooseCard('he',true,'非服：交给'+get.translation(trigger.player)+'一张牌','若选择装备牌，则其可以使用此牌');
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						event.card=card;
						trigger.player.gain(card,trigger.target,'giveAuto');
					}
					else event.finish();
					'step 2'
					var target=trigger.player;
					if(target.getCards('h').contains(card)&&get.type(card,target)=='equip'&&target.hasUseTarget(card)) target.chooseUseTarget(card,'nopopup');
				},
			},
			//Powered by @污言噫对
			twjingce:{
				marktext:"策",
				intro:{
					name:"策",
					content:"mark",
				},
				audio:2,
				trigger:{player:"useCard"},
				filter:function(event,player){
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					var history=player.getHistory('useCard',function(evtx){
						return evtx.getParent('phaseUse')==evt;
					});
					return history&&history.indexOf(event)==player.hp-1;
				},
				frequent:true,
				content:function(){
					'step 0'
					player.draw(player.hp);
					'step 1'
					if(player.getHistory('sourceDamage').length||player.getHistory('gain',function(evt){
						return evt.getParent('phaseUse')==trigger.getParent('phaseUse')&&evt.getParent().name=='draw';
					}).length>1) player.addMark('twjingce',1);
				},
			},
			yuzhang:{
				audio:2,
				trigger:{
					player:"damageEnd",
				},
				filter:function(event,player){
					return event.source&&player.hasMark('twjingce');
				},
				direct:true,
				content:function(){
					'step 0'
					var choiceList=['令'+get.translation(trigger.source)+'本回合不能再使用或打出牌'];
					if (trigger.source.countCards('h')) choiceList.push('令'+get.translation(trigger.source)+'弃置'+get.cnNumber(trigger.source.hp)+'张牌');
					player.chooseControl('cancel2').set('prompt2',get.prompt2('yuzhang')).set('choiceList',choiceList).set('ai',function(){
						var player=_status.event.player,source=_status.event.source;
						if(get.attitude(player,event.source)>0) return 'cancel2';
						if(source.hasSkillTag('noh')||source.hasSkillTag('noe')||source.countCards('h')>=2*source.hp) return 0;
						if(source.hp>1&&source.countCards('h')>1) return 1;
						return 'cancel2';
					}).set('source',trigger.source);
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('yuzhang',trigger.source);
						player.removeMark('twjingce',1);
						if(result.index==0) trigger.source.addTempSkill('yuzhang_dontuse');
						else trigger.source.chooseToDiscard('he',trigger.source.hp,true);
					}
				},
				group:"yuzhang_skip",
				subSkill:{
					skip:{
						trigger:{
							player:["phaseJudgeBefore","phaseDrawBefore","phaseUseBefore","phaseDiscardBefore"],
						},
						filter:function(event,player){
							return player.hasMark('twjingce');
						},
						"prompt2":function(event,player){
							var str='弃置一枚“策”并跳过'
							if(event.name=='phaseJudge') str+='判定';
							if(event.name=='phaseDraw') str+='摸牌';
							if(event.name=='phaseUse') str+='出牌';
							if(event.name=='phaseDiscard') str+='弃牌';
							str+='阶段';
							return str;
						},
						check:function(event,player){
							if(event.name=='phaseDiscard') return player.needsToDiscard();
							return event.name=='phaseJudge';
						},
						content:function(){
							player.removeMark('twjingce',1);
							trigger.cancel();
						},
						sub:true,
					},
					dontuse:{
						charlotte:true,
						mark:true,
						mod:{
							cardEnabled:function(card){
								return false;
							},
							cardRespondable:function(card){
								return false;
							},
							cardSavable:function(card){
								return false;
							},
						},
						intro:{
							content:"不能使用或打出牌",
						},
						sub:true,
					},
				},
			},
			twlihuo:{
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(event.card.name=='sha'&&!event.card.nature) return true;
					return false;
				},
				audio:'lihuo',
				prompt2:function(event){
					return '将'+get.translation(event.card)+'改为火属性';
				},
				audioname:['re_chengpu'],
				check:function(event,player){
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&player.canUse(event.card,current)&&get.effect(current,{name:'sha',nature:'fire',cards:event.cards.slice(0)},player,player)>0;
					});
				},
				content:function(){
					trigger.card.nature='fire';
					trigger.card.twlihuo_buffed=true;
				},
				group:['twlihuo2','twlihuo3'],
				ai:{
					fireAttack:true,
				},
			},
			twlihuo2:{
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(event.card.name!='sha'||event.card.nature!='fire') return false;
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&player.canUse(event.card,current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('twlihuo'),'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
						return !_status.event.sourcex.contains(target)&&player.canUse(_status.event.card,target);
					}).set('sourcex',trigger.targets).set('card',trigger.card).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,_status.event.card,player,player);
					});
					'step 1'
					if(result.bool){
						if(!event.isMine()&&!_status.connectMode) game.delayx();
						event.target=result.targets[0];
					}
					else{
						event.finish();
					}
					'step 2'
					player.logSkill('twlihuo',event.target);
					trigger.targets.push(event.target);
				},
			},
			twlihuo3:{
				trigger:{player:'useCardAfter'},
				filter:function(event,player){
					return event.card.twlihuo_buffed=true&&player.getHistory('sourceDamage',function(evt){
						return evt.card==event.card&&evt._dyinged;
					}).length>0;
				},
				forced:true,
				audio:'lihuo',
				audioname:['re_chengpu'],
				content:function(){
					player.loseHp();
				}
			},
			twchunlao:{
				audio:'chunlao',
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})&&!game.hasPlayer(function(current){
						return current.getExpansions('twchunlao').length>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('twchunlao'),'将一名角色区域内的一张牌作为“醇”置于其武将牌上',function(card,player,target){
						return target.countCards('hej')>0;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target))*(player==target?1:2);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('twchunlao',target);
						player.choosePlayerCard(target,'hej',true);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						target.addToExpansion(result.cards,target,'give').gaintag.add('twchunlao');
					}
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				group:['twchunlao_sha','twchunlao_dying'],
				subSkill:{
					sha:{
						trigger:{global:'useCard'},
						direct:true,
						filter:function(event,player){
							return event.card.name=='sha'&&event.player.countCards('he')>0&&event.player.getExpansions('twchunlao').length>0;
						},
						content:function(){
							'step 0'
							event.target=trigger.player;
							event.target.chooseCard('he','醇醪：是否交给'+get.translation(player)+'一张牌，令'+get.translation(trigger.card)+'的伤害值基数+1？').set('ai',function(card){
								if(!_status.event.goon) return 3.5-get.value(card);
								return 7-get.value(card);
							}).set('goon',function(){
								if(get.attitude(target,player)<0) return false;
								var d1=true;
								if(trigger.player.hasSkill('jueqing')||trigger.player.hasSkill('gangzhi')) d1=false;
								for(var target of trigger.targets){
									if(!target.mayHaveShan()||trigger.player.hasSkillTag('directHit_ai',true,{
										target:target,
										card:trigger.card,
									},true)){
										if(!target.hasSkill('gangzhi')) d1=false;
										if(!target.hasSkillTag('filterDamage',null,{
											player:trigger.player,
											card:trigger.card,
										})&&get.attitude(player,target)<0) return true;
									}
								}
								return d1;
							}());
							if(!event.target.isUnderControl(true)&&!event.target.isOnline()) game.delayx();
							'step 1'
							if(result.bool){
								target.logSkill('twchunlao',player);
								if(!target.hasSkill('twchunlao')) game.trySkillAudio('twchunlao',player);
								if(player!=target) player.gain(result.cards,target,'giveAuto');
								trigger.baseDamage++;
							}
						},
					},
					dying:{
						audio:'chunlao',
						trigger:{global:'dying'},
						logTarget:'player',
						filter:function(event,player){
							return event.player.getExpansions('twchunlao').length>0;
						},
						prompt2:(event,player)=>('移去'+get.translation(event.player)+'武将牌上的“醇”并摸一张牌，然后令其回复1点体力'),
						check:function(event,player){
							return get.attitude(player,event.player)>0;
						},
						content:function(){
							var target=trigger.player,cards=target.getExpansions('twchunlao');
							if(cards.length) target.loseToDiscardpile(cards);
							player.draw();
							target.recover();
						},
					},
				},
			},
			//张曼成
			twfengji:{
				audio:2,
				mahouSkill:true,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return !player.getExpansions('twfengji').length&&!player.hasSkill('twfengji_mahou')&&player.countCards('he');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt2('twfengji')).set('ai',function(card){
						var name=card.name,num=0;
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							if(ui.cardPile.childNodes[i].name==name) num++;
						}
						if(num<2) return false;
						return 8-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('twfengji');
						player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('twfengji');
						player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
							var player=_status.event.player;
							var safe=Math.min(player.getHandcardLimit(),player.countCards('h','shan'));
							if(safe<Math.min(3,game.countPlayer())){
								var next=player.next;
								while(next!=player&&get.attitude(next,player)>0){
									safe++;
									next=next.next;
								}
							}
							return Math.max(2,Math.min(safe,3,game.countPlayer()))-1;
						});
					}
					else event.finish();
					'step 2'
					player.storage.twfengji_mahou=[result.index+1,result.index+1];
					player.addTempSkill('twfengji_mahou',{player:'die'});
				},
				marktext:'示',
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				subSkill:{
					mahou:{
						trigger:{global:'phaseEnd'},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							var list=player.storage.twfengji_mahou;
							list[1]--;
							if(list[1]==0){
								game.log(player,'的“蜂集”魔法生效');
								player.logSkill('twfengji');
								var cards=player.getExpansions('twfengji');
								if(cards.length){
									var cards2=[],num=list[0];
									for(var card of cards){
										for(var i=0;i<num;i++){
											var card2=get.cardPile2(function(cardx){
												return cardx.name==card.name&&!cards2.contains(cardx);
											});
											if(card2) cards2.push(card2);
											else break;
										}
									}
									game.delayx();
									if(cards2.length) player.gain(cards2,'gain2');
									player.loseToDiscardpile(cards);
								}
								player.removeSkill('twfengji_mahou');
							}
							else{
								game.log(player,'的“蜂集”魔法剩余','#g'+(list[1])+'回合');
								player.markSkill('twfengji_mahou');
							}
						},
						ai:{threaten:2.5},
						mark:true,
						onremove:true,
						//该图标为灵魂宝石
						marktext:'♗',
						intro:{
							name:'施法：蜂集',
							markcount:function(storage){
								if(storage) return storage[1];
								return 0;
							},
							content:function(storage){
								if(storage){
								 return '经过'+storage[1]+'个“回合结束时”后，若有“示”，则从牌堆中获得'+storage[0]+'张和“示”名称相同的牌';
								}
								return '未指定施法效果';
							},
						},
					},
				},
			},
			twyiju:{
				audio:2,
				locked:false,
				mod:{
					attackRangeBase:function(player,num){
						if(player.getExpansions('twfengji').length) return player.hp;
					},
					cardUsable:function(card,player,num){
						if(card.name=='sha'&&player.getExpansions('twfengji').length) return num-1+player.hp;
					},
				},
				trigger:{player:'damageBegin3'},
				filter:function(event,player){
					return player.getExpansions('twfengji').length>0;
				},
				forced:true,
				content:function(){
					trigger.num++;
					var cards=player.getExpansions('twfengji');
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{
					halfneg:true,
					combo:'twfengji',
				},
			},
			twbudao:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				derivation:['twzhouhu','twharvestinori','twzuhuo'],
				limited:true,
				skillAnimation:true,
				animationColor:'metal',
				check:function(event,player){
					return !player.hasUnknown()||!player.hasFriend();
				},
				content:function(){
					'step 0'
					player.awakenSkill('twbudao');
					player.loseMaxHp();
					player.recover();
					player.chooseControl(lib.skill.twbudao.derivation).set('prompt','选择获得一个技能').set('ai',function(){
						return 'twharvestinori';
					});
					'step 1'
					var skill=result.control;
					player.addSkillLog(skill);
					event.twbudao_skill=skill;
					player.chooseTarget(lib.filter.notMe,'是否令一名其他角色也获得【'+get.translation(skill)+'】？').set('ai',function(target){
						var player=_status.event.player;
						if(player.identity=='nei') return 0;
						return get.attitude(player,target)-6;
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'green');
						target.addSkillLog(event.twbudao_skill);
						var cards=target.getCards('he');
						if(!cards.length) event.finish();
						else if(cards.length==1) event._result={bool:true,cards:cards};
						else target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌作为学费');
					}
					else event.finish();
					'step 3'
					if(result.bool) player.gain(result.cards,target,'giveAuto');
				},
			},
			twzhouhu:{
				audio:2,
				mahouSkill:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkill('twzhouhu_mahou')&&player.countCards('h',lib.skill.twzhouhu.filterCard)>0;
				},
				filterCard:{color:'red'},
				check:function(card){
					if(_status.event.player.isHealthy()) return 0;
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
						var player=_status.event.player;
						var safe=1;
						if(safe<Math.min(3,game.countPlayer(),player.getDamagedHp())){
							var next=player.next;
							while(next!=player&&get.attitude(next,player)>0){
								safe++;
								next=next.next;
							}
						}
						return Math.max(1,Math.min(safe,3,game.countPlayer(),player.getDamagedHp()))-1;
					});
					'step 1'
					player.storage.twzhouhu_mahou=[result.index+1,result.index+1];
					player.addTempSkill('twzhouhu_mahou',{player:'die'});
				},
				ai:{
					order:2,
					result:{
						player:1,
					},
				},
				subSkill:{
					mahou:{
						trigger:{global:'phaseEnd'},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							var list=player.storage.twzhouhu_mahou;
							list[1]--;
							if(list[1]==0){
								game.log(player,'的“咒护”魔法生效');
								player.logSkill('twzhouhu');
								var num=list[0];
								player.recover(num);
								player.removeSkill('twzhouhu_mahou');
							}
							else{
								game.log(player,'的“咒护”魔法剩余','#g'+(list[1])+'回合');
								player.markSkill('twzhouhu_mahou');
							}
						},
						mark:true,
						onremove:true,
						marktext:'♗',
						intro:{
							name:'施法：咒护',
							markcount:function(storage){
								if(storage) return storage[1];
								return 0;
							},
							content:function(storage){
								if(storage){
								 return '经过'+storage[1]+'个“回合结束时”后，回复'+storage[0]+'点体力';
								}
								return '未指定施法效果';
							},
						},
					},
				},
			},
			twharvestinori:{
				audio:2,
				mahouSkill:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkill('twharvestinori_mahou')&&player.countCards('h',lib.skill.twharvestinori.filterCard)>0;
				},
				filterCard:{color:'black'},
				check:function(card){
					return 8-get.value(card);
				},
				content:function(){
					'step 0'
					player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
						var player=_status.event.player;
						var safe=player.hp;
						if(safe<Math.min(3,game.countPlayer())){
							var next=player.next;
							while(next!=player&&get.attitude(next,player)>0){
								safe++;
								next=next.next;
							}
						}
						return Math.max(1,Math.min(safe,3,game.countPlayer()))-1;
					});
					'step 1'
					player.storage.twharvestinori_mahou=[result.index+1,result.index+1];
					player.addTempSkill('twharvestinori_mahou',{player:'die'});
				},
				ai:{
					order:8,
					result:{
						player:1,
					},
				},
				subSkill:{
					mahou:{
						trigger:{global:'phaseEnd'},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							var list=player.storage.twharvestinori_mahou;
							list[1]--;
							if(list[1]==0){
								game.log(player,'的“丰祈”魔法生效');
								player.logSkill('twharvestinori');
								var num=list[0]*2;
								player.draw(num);
								player.removeSkill('twharvestinori_mahou');
							}
							else{
								game.log(player,'的“丰祈”魔法剩余','#g'+(list[1])+'回合');
								player.markSkill('twharvestinori_mahou');
							}
						},
						mark:true,
						onremove:true,
						marktext:'♗',
						intro:{
							name:'施法：丰祈',
							markcount:function(storage){
								if(storage) return storage[1];
								return 0;
							},
							content:function(storage){
								if(storage){
								 return '经过'+storage[1]+'个“回合结束时”后，摸'+storage[0]*2+'张牌';
								}
								return '未指定施法效果';
							},
						},
					},
				},
			},
			twzuhuo:{
				audio:2,
				mahouSkill:true,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkill('twzuhuo_mahou')&&player.countCards('he',lib.skill.twzuhuo.filterCard)>0;
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.chooseControl('1回合','2回合','3回合').set('prompt','请选择施法时长').set('ai',function(){
						var player=_status.event.player;
						var safe=Math.min(player.getHandcardLimit(),player.countCards('h','shan'));
						if(safe<Math.min(3,game.countPlayer())){
							var next=player.next;
							while(next!=player&&get.attitude(next,player)>0){
								safe++;
								next=next.next;
							}
						}
						return Math.max(2,Math.min(safe,3,game.countPlayer()))-1;
					});
					'step 1'
					player.storage.twzuhuo_mahou=[result.index+1,result.index+1];
					player.addTempSkill('twzuhuo_mahou',{player:'die'});
				},
				ai:{
					order:2,
					result:{
						player:1,
					},
				},
				subSkill:{
					mahou:{
						trigger:{global:'phaseEnd'},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							var list=player.storage.twzuhuo_mahou;
							list[1]--;
							if(list[1]==0){
								game.log(player,'的“阻祸”魔法生效');
								player.logSkill('twzuhuo');
								var num=list[0];
								player.addSkill('twzuhuo_effect');
								player.addMark('twzuhuo_effect',num,false);
								player.removeSkill('twzuhuo_mahou');
							}
							else{
								game.log(player,'的“阻祸”魔法剩余','#g'+(list[1])+'回合');
								player.markSkill('twzuhuo_mahou');
							}
						},
						mark:true,
						onremove:true,
						marktext:'♗',
						intro:{
							name:'施法：阻祸',
							markcount:function(storage){
								if(storage) return storage[1];
								return 0;
							},
							content:function(storage){
								if(storage){
								 return '经过'+storage[1]+'个“回合结束时”后，获得'+storage[0]+'层“防止一次伤害”的效果';
								}
								return '未指定施法效果';
							},
						},
					},
					effect:{
						charlotte:true,
						onremove:true,
						trigger:{player:'damageBegin2'},
						forced:true,
						filter:function(event,player){
							return player.hasMark('twzuhuo_effect');
						},
						content:function(){
							trigger.cancel();
							player.removeMark('twzuhuo_effect',1,false);
							if(!player.countMark('twzuhuo_effect')) player.removeSkill('twzuhuo_effect');
						},
						marktext:'阻︎',
						intro:{
							onremove:true,
							content:'防止接下来的#次伤害',
						},
					},
				},
			},
			//群曹操
			twlingfa:{
				audio:2,
				trigger:{global:'roundStart'},
				direct:true,
				content:function(){
					'step 0'
					if(game.roundNumber<3||!player.hasSkill('twlingfa')){
						var str;
						switch(game.roundNumber){
							case 1:str='获得如下效果直到本轮结束：其他角色使用【杀】时，若其有牌，则其需弃置一张牌，否则受到你造成的1点伤害。';break;
							case 2:str='获得如下效果直到本轮结束：其他角色使用【桃】结算结束后，若其有牌，则其需交给你一张牌，否则受到你造成的1点伤害。';break;
							default:str='失去【令法】并获得【治暗】';break;
						}
						player.chooseBool(get.prompt('twlingfa'),str);
					}
					else event._result={bool:true};
					'step 1'
					if(result.bool){
						switch(game.roundNumber){
							case 1:
								player.logSkill('twlingfa',game.filterPlayer((current)=>current!=player).sortBySeat());
								player.addTempSkill('twlingfa_sha','roundStart');
								break;
							case 2:
								player.logSkill('twlingfa',game.filterPlayer((current)=>current!=player).sortBySeat());
								player.addTempSkill('twlingfa_tao','roundStart');
								break;
							default:
								player.logSkill('twlingfa');
								player.removeSkill('twlingfa');
								game.log(player,'失去了技能','#g【令法】');
								player.addSkillLog('twzhian');
								break;
						}
					}
				},
				subSkill:{
					sha:{
						audio:'twlingfa',
						trigger:{global:'useCard'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return player!=event.player&&event.card.name=='sha'&&event.player.countCards('he')>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							game.delayx();
							trigger.player.chooseToDiscard('he','令法：弃置一张牌，或受到来自'+get.translation(player)+'的1点伤害').set('goon',get.damageEffect(trigger.player,player,trigger.player)<0).set('ai',function(card){
								if(!_status.event.goon) return 0;
								return 8-get.value(card);
							});
							'step 1'
							if(!result.bool){
								trigger.player.damage();
							}
						},
						mark:true,
						marktext:'<span style="text-decoration: line-through;">杀</span>',
						intro:{content:'其他角色使用【杀】时，若其有牌，则其需弃置一张牌，否则受到你造成的1点伤害。'},
					},
					tao:{
						audio:'twlingfa',
						trigger:{global:'useCard'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return player!=event.player&&event.card.name=='tao'&&event.player.countCards('he')>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							game.delayx();
							trigger.player.chooseCard('he','令法：交给'+get.translation(player)+'一张牌，否则受到来自其的1点伤害').set('goon',get.damageEffect(trigger.player,player,trigger.player)<0).set('ai',function(card){
								if(!_status.event.goon) return 0;
								return 8-get.value(card);
							});
							'step 1'
							if(!result.bool){
								trigger.player.damage();
							}
							else player.gain(result.cards,trigger.player,'giveAuto');
						},
						mark:true,
						marktext:'<span style="text-decoration: line-through;">桃</span>',
						intro:{content:'其他角色使用【桃】结算结束后，若其有牌，则其需交给你一张牌，否则受到你造成的1点伤害。'},
					},
				},
				derivation:'twzhian',
			},
			twzhian:{
				audio:2,
				usable:1,
				trigger:{global:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					var type=get.type(event.card);
					if(type!='delay'&&type!='equip') return false;
					if(event.cards.length!=1) return false;
					var position=get.position(event.cards[0]);
					if(position=='e'||position=='j') return true;
					return event.player.isIn();
				},
				content:function(){
					'step 0'
					var str=get.translation(trigger.cards[0]),owner=get.owner(trigger.cards[0]);
					var choiceList=[
						'弃置'+(owner?(get.translation(owner)+'区域内的'):'')+str,
						'弃置一张手牌并获得'+str,
						'对'+get.translation(trigger.player)+'造成1点伤害',
					];
					var choices=[];
					if(owner&&lib.filter.canBeDiscarded(card,player,owner)) choices.push('选项一');
					else choiceList[0]='<span style="opacity:0.5">'+choiceList[0]+'</span>';
					if(owner&&player.hasCard(function(card){
						return lib.filter.cardDiscardable(card,player,'twzhian');
					},'h')&&lib.filter.canBeGained(card,player,owner)) choices.push('选项二');
					else choiceList[1]='<span style="opacity:0.5">'+choiceList[1]+'</span>';
					if(trigger.player.isIn()) choices.push('选项三');
					else choiceList[2]='<span style="opacity:0.5">'+choiceList[2]+'</span>';
					player.chooseControl(choices,'cancel2').set('choiceList',choiceList).set('prompt',get.prompt('twzhian')).set('ai',function(){
						var player=_status.event.player,choices=_status.event.controls.slice(0);
						var card=_status.event.getTrigger().cards[0],owner=get.owner(card);
						var getEffect=function(choice){
							if(choice=='cancel2') return 0.1;
							if(choice=='选项三'){
								return get.damageEffect(_status.event.getTrigger().player,player,player);
							}
							var result;
							if(get.position(card)=='j'){
								result=-get.effect(player,{
									name:card.viewAs||card.name,
									cards:[card],
								},player,player)*get.sgn(get.attitude(player,owner));
							}
							else result=-(get.value(card,owner)-0.01)*get.sgn(get.attitude(player,owner));
							if(choice=='选项一') return result;
							if(player.hasCard(function(cardx){
								return lib.filter.cardDiscardable(cardx,player,'twzhian')&&get.value(cardx,player)<get.value(card,player);
							},'h')) return result*1.2;
							return 0;
						}
						choices.sort(function(a,b){
							return getEffect(b)-getEffect(a);
						});
						return choices[0];
					});
					'step 1'
					if(result.control!='cancel2'){
						var card=trigger.cards[0],owner=get.owner(card);
						switch(result.control){
							case '选项一':
								player.logSkill('twzhian',owner);
								owner.discard(card,'notBySelf');
								event.finish();
								break;
							case '选项二':
								player.chooseToDiscard('h',true).logSkill=['twzhian',owner];
								event.target=owner;
								break;
							case '选项三':
								player.logSkill('twzhian',trigger.player);
								trigger.player.damage();
								event.finish();
								break;
						}
					}
					else player.storage.counttrigger.twzhian--;
					'step 2'
					if(result.bool&&target.getCards('ej').contains(trigger.cards[0])) player.gain(trigger.cards,target,'give');
				},
			},
			twyujue:{
				audio:2,
				global:'twyujue_give',
				trigger:{player:'gainAfter'},
				direct:true,
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					return game.hasPlayer(function(current){
						if(current==player) return false;
						var evt=event.getl(current);
						if(!evt||!evt.cards2||!evt.cards2.length) return false;
						return (!current.hasSkill('twyujue_effect0'))||(!current.hasSkill('twyujue_effect1'));
					})
				},
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						if(current==player) return false;
						var evt=trigger.getl(current);
						if(!evt||!evt.cards2||!evt.cards2.length) return false;
						return (!current.hasSkill('twyujue_effect0'))||(!current.hasSkill('twyujue_effect1'));
					}).sortBySeat();
					event.targets=list;
					'step 1'
					var target=event.targets.shift();
					if(target.isIn()){
						event.target=target;
						var num=2;
						if(target.hasSkill('twyujue_effect0')) num--;
						if(target.hasSkill('twyujue_effect1')) num--;
						num=Math.min(num,trigger.getl(target).cards2.length);
						if(num>0) event.count=num;
						else if(targets.length>0) event.redo();
						else event.finish();
					}
					else if(targets.length>0) event.redo();
					else event.finish();
					'step 2'
					event.count--;
					player.chooseBool(get.prompt('twyujue',target),'可令其选择本回合内未选择过的一项：⒈弃置攻击范围内一名角色的一张牌。⒉下一次使用牌时，从牌堆中获得一张同类别的牌。').set('ai',function(){
						var evt=_status.event.getParent();
						return get.attitude(evt.player,evt.target)>0;
					});
					'step 3'
					if(result.bool){
						player.logSkill('twyujue',target);
						var list=[0,1];
						if(target.hasSkill('twyujue_effect0')) list.remove(0);
						if(target.hasSkill('twyujue_effect1')) list.remove(1);
						if(!list.length) event.goto(6);
						else if(list.length==1) event._result={index:list[0]};
						else target.chooseControl().set('choiceList',['弃置攻击范围内一名角色的一张牌','下一次使用牌时，从牌堆中获得一张同类别的牌']).set('ai',function(){
							var player=_status.event.player;
							if(game.hasPlayer(function(current){
								return player.inRange(current)&&current.countDiscardableCards(player,'he')>0&&get.effect(current,{name:'guohe_copy2'},player,player)>0;
							})) return 0;
							return 1;
						});
					}
					else event.goto(6);
					'step 4'
					target.addTempSkill('twyujue_effect'+result.index);
					if(result.index==0){
						if(game.hasPlayer(function(current){
							return target.inRange(current)&&current.countDiscardableCards(target,'he')>0;
						})){
							target.chooseTarget('弃置攻击范围内一名角色的一张牌',true,function(card,player,target){
								return player.inRange(target)&&target.countDiscardableCards(player,'he')>0;
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,{name:'guohe_copy2'},player,player)
							});
						}
						else event.goto(6);
					}
					else event.goto(6);
					'step 5'
					if(result.bool){
						var target2=result.targets[0];
						target.line(target2,'green');
						target.discardPlayerCard(target2,'he',true);
					}
					'step 6'
					game.delayx();
					if(event.count>0) event.goto(2);
					else if(targets.length) event.goto(1);
				},
				subSkill:{
					clear:{
						onremove:true,
					},
					effect0:{charlotte:true},
					effect1:{
						charlotte:true,
						trigger:{player:'useCard'},
						usable:1,
						forced:true,
						popup:false,
						content:function(){
							player.unmarkSkill('twyujue_effect1');
							var type2=get.type2(trigger.card,false);
							var card=get.cardPile2(function(card){
								return get.type2(card,false)==type2;
							});
							if(card) trigger.player.gain(card,'gain2');
						},
						mark:true,
						marktext:'爵',
						intro:{content:'使用下一张牌时，从牌堆中获得一张类型相同的牌'},
					},
				},
			},
			twyujue_give:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					var targets=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('twyujue');
					});
					if(!targets.length) return false;
					for(var target of targets){
						var num=2;
						if(player.group=='qun'&&target.hasZhuSkill('twfengqi',player)) num=4;
						if(target.countMark('twyujue_clear')<num) return true;
					}
					return false;
				},
				selectCard:function(){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('twyujue');
					});
					return [1,Math.max.apply(Math,targets.map(function(target){
						var num=2;
						if(player.group=='qun'&&target.hasZhuSkill('twfengqi',player)) num=4;
						return num-target.countMark('twyujue_clear');
					}))];
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					if(!target.hasSkill('twyujue')) return false;
					var num=2;
					if(player.group=='qun'&&target.hasZhuSkill('twfengqi',player)) num=4;
					return (num-target.countMark('twyujue_clear'))>=Math.max(1,ui.selected.cards.length);
				},
				selectTarget:function(){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('twyujue');
					});
					return targets.length>1?1:-1;
				},
				complexSelect:true,
				prompt:function(){
					var player=_status.event.player;
					var targets=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('twyujue');
					});
					return '将任意张牌交给'+get.translation(targets)+(targets.length>1?'中的一人':'');
				},
				position:'he',
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					if(ui.selected.cards.length) return 0;
					var player=_status.event.player;
					if(game.hasPlayer(function(current){
						return lib.skill.twyujue_give.filterTarget(null,player,current)&&get.attitude(player,current)>0;
					})){
						var val=get.value(card);
						if(val<=0&&get.position(card)=='e') return 100-val;
						if(!player.hasSkill('twyujue_effect1')&&player.hasCard(function(cardx){
							return cardx!=card&&player.getUseValue(cardx,null,true)>0;
						},'hs')) return 6-get.value(card);
						if(!player.hasSkill('twyujue_effect0')&&game.hasPlayer(function(current){
							return player.inRange(current)&&current.countDiscardableCards(player,'he')>0&&get.effect(current,{name:'guohe_copy2'},player,player)>0;
						})) return 5.5-get.value(card);
					}
					return 0;
				},
				content:function(){
					game.trySkillAudio('twyujue',target);
					target.gain(cards,player,'give');
					target.addTempSkill('twyujue_clear');
					target.addMark('twyujue_clear',cards.length,false);
				},
				ai:{
					order:10,
					result:{target:1},
				},
			},
			twgezhi:{
				audio:2,
				trigger:{player:'useCard'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('h')) return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					var type=get.type2(event.card,false);
					return !player.hasHistory('useCard',function(evtx){
						return evtx!=event&&get.type2(evtx.card,false)==type&&evtx.getParent('phaseUse')==evt;
					},event);
				},
				content:function(){
					'step 0'
					if(!event.isMine()&&!event.isOnline()) game.delayx();
					player.chooseCard('是否发动【革制】重铸一张牌？').set('ai',function(card){
						return 5.5-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('twgezhi');
						player.loseToDiscardpile(result.cards);
						player.draw();
					}
				},
				group:'twgezhi_buff',
				subSkill:{
					buff:{
						audio:'twgezhi',
						trigger:{player:'phaseUseEnd'},
						direct:true,
						filter:function(event,player){
							return player.getHistory('lose',function(evt){
								return evt.getParent(2).name=='twgezhi'&&evt.getParent('phaseUse')==event;
							}).length>1;
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('twgezhi'),'你可以令一名角色选择获得一个其未获得过的效果：⒈攻击范围+2；⒉手牌上限+2；⒊加1点体力上限。',function(card,player,target){
								return !target.hasSkill('twgezhi_选项一')||!target.hasSkill('twgezhi_选项二')||!target.hasSkill('twgezhi_选项三');
							}).set('ai',function(target){
								return get.attitude(_status.event.player,target);
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								event.target=target;
								player.logSkill('twgezhi',target);
								var list=[];
								for(var i=1;i<=3;i++){
									var str='选项'+get.cnNumber(i,true);
									if(!target.hasSkill('twgezhi_'+str)) list.push(str);
								}
								if(list.length==1) event._result={control:list[0]};
								else target.chooseControl(list).set('choiceList',['令自己的攻击范围+2','令自己的手牌上限+2','令自己的体力上限+1']).set('ai',function(){
									var player=_status.event.player,controls=_status.event.controls;
									if(controls.contains('选项一')&&game.hasPlayer(function(current){
										return (get.realAttitude||get.attitude)(player,current)<0&&get.distance(player,current,'attack')>1;
									})) return '选项一';
									if(controls.contains('选项二')&&player.needsToDiscard()) return '选项二';
									if(controls.contains('选项三')) return '选项三';
									return controls.randomGet();
								});
							}
							else{
								event._triggered=null;
								event.finish();
							}
							'step 2'
							target.addSkill('twgezhi_'+result.control);
							if(result.control=='选项三') target.gainMaxHp();
							'step 3'
							game.delayx();
						},
					},
					选项一:{
						charlotte:true,
						mod:{
							attackFrom:function(from,to,distance){
								return distance-2;
							},
						},
						mark:true,
						marktext:' +2 ',
						intro:{content:'攻击范围+2'},
					},
					选项二:{
						charlotte:true,
						mod:{
							maxHandcard:function(player,num){
								return num+2;
							},
						},
						mark:true,
						marktext:' +2 ',
						intro:{content:'手牌上限+2'},
					},
					选项三:{
						charlotte:true,
						mark:true,
						marktext:' +1 ',
						intro:{content:'体力上限+1'},
					},
				},
			},
			twfengqi:{
				audio:2,
				zhuSkill:true,
				trigger:{player:'twgezhi_buffAfter'},
				direct:true,
				filter:function(event,player){
					if(!event.target||!event.target.isIn()||!player.hasZhuSkill('twfengqi',event.target)) return false;
					var skills=event.target.getStockSkills(true,true);
					for(var i of skills){
						var info=get.info(i);
						if(info.zhuSkill&&!event.target.hasZhuSkill(i)) return true;
					}
					return false;
				},
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					'step 0'
					event.target=trigger.target;
					event.target.chooseBool(get.prompt('twfengqi'),'激活武将牌上的所有主公技');
					'step 1'
					if(result.bool){
						target.logSkill('twfengqi',player);
						var skills=target.getStockSkills(true,true).filter(function(i){
							var info=get.info(i);
							if(info.zhuSkill&&!target.hasZhuSkill(i)) return true;
						});
						target.markAuto('zhuSkill_twfengqi',skills);
						game.log(target,'激活了武将牌上的主公技')
					}
				},
			},
			twsidai:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				locked:false,
				limited:true,
				skillAnimation:true,
				animationColor:'fire',
				filter:function(event,player){
					var cards=player.getCards('h',{type:'basic'});
					if(!cards.length) return false;
					for(var i of cards){
						if(!game.checkMod(i,player,'unchanged','cardEnabled2',player)) return false;
					}
					return event.filterCard(get.autoViewAs({name:'sha',storage:{twsidai:true}},cards),player,event);
				},
				viewAs:{name:'sha',storage:{twsidai:true}},
				filterCard:{type:'basic'},
				selectCard:-1,
				check:()=>1,
				onuse:function(result,player){
					player.awakenSkill('twsidai');
					player.addTempSkill('twsidai_effect');
				},
				ai:{
					order:2.9,
					result:{
						target:function(player,target){
							var cards=ui.selected.cards.slice(0);
							var names=[];
							for(var i of cards) names.add(i.name);
							if(names.length<player.hp) return 0;
							if(player.hasUnknown()&&(player.identity!='fan'||!target.isZhu)) return 0;
							if(get.attitude(player,target)>=0) return -20;
							return lib.card.sha.ai.result.target.apply(this,arguments);
						},
					},
				},
				mod:{
					cardUsable:function(card){
						if(card.storage&&card.storage.twsidai) return Infinity;
					},
					targetInRange:function(card){
						if(card.storage&&card.storage.twsidai) return true;
					},
				},
				subSkill:{
					effect:{
						charlotte:true,
						trigger:{source:'damageBegin1'},
						filter:function(event,player){
							if(!event.card||!event.card.storage||!event.card.storage.twsidai||event.getParent().type!='card') return false;
							for(var i of event.cards){
								if(i.name=='jiu') return true;
							}
							return false;
						},
						forced:true,
						popup:false,
						content:function(){
							trigger.num*=2;
							game.log(trigger.card,'的伤害值','#y×2');
						},
						group:['twsidai_tao','twsidai_shan'],
					},
					tao:{
						trigger:{source:'damageSource'},
						filter:function(event,player){
							if(!event.card||!event.card.storage||!event.card.storage.twsidai||!event.player.isIn()) return false;
							for(var i of event.cards){
								if(i.name=='tao') return true;
							}
							return false;
						},
						forced:true,
						popup:false,
						content:function(){
							trigger.player.loseMaxHp();
						},
					},
					shan:{
						trigger:{player:'useCardToPlayered'},
						filter:function(event,player){
							if(!event.card||!event.card.storage||!event.card.storage.twsidai||!event.target.isIn()) return false;
							for(var i of event.cards){
								if(i.name=='shan') return true;
							}
							return false;
						},
						forced:true,
						popup:false,
						content:function(){
							'step 0'
							trigger.target.chooseToDiscard('h',{type:'basic'},'弃置一张基本牌，否则不能响应'+get.translation(trigger.card)).set('ai',function(card){
								var player=_status.event.player;
								if(player.hasCard('hs',function(cardx){
									return cardx!=card&&get.name(cardx,player)=='shan';
								})) return 12-get.value(card);
								return 0;
							});
							'step 1'
							if(!result.bool) trigger.directHit.add(trigger.target);
						},
					},
				},
			},
			twjieyu:{
				audio:2,
				trigger:{player:['phaseJieshuBegin','damageEnd']},
				round:1,
				filter:function(event,player){
					if(event.name!='phaseJieshu'){
						var history=player.getHistory('damage');
						for(var i of history){
							if(i==event) break;
							return false;
						}
						var all=player.actionHistory;
						for(var i=all.length-2;i>=0;i--){
							if(all[i].damage.length) return false;
							if(all[i].isRound) break;
						}
					}
					return player.countCards('h')>0&&!player.hasCard(function(card){
						return !lib.filter.cardDiscardable(card,player,'twjieyu');
					},'h')
				},
				check:function(event,player){
					var cards=[],names=[];
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var card=ui.discardPile.childNodes[i];
						if(get.type(card,false)=='basic'&&!names.contains(card.name)){
							cards.push(card);
							names.push(card.name);
						}
					}
					if(!names.contains('shan')||!names.contains('tao')) return false;
					if(player.countCards('h','shan')<2&&player.countCards('h','tao')<1) return true;
					return false;
				},
				content:function(){
					'step 0'
					player.discard(player.getCards('h'));
					'step 1'
					var cards=[],names=[];
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var card=ui.discardPile.childNodes[i];
						if(get.type(card,false)=='basic'&&!names.contains(card.name)){
							cards.push(card);
							names.push(card.name);
						}
					}
					if(cards.length) player.gain(cards,'gain2');
				},
			},
			twhanyu:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				filter:function(event,player){
					return event.name!='phase'||game.phaseNumber==0;
				},
				content:function(){
					var cards=[],types=['basic','trick','equip'];
					for(var i of types){
						var card=get.cardPile2(function(card){
							return get.type2(card,false)==i;
						});
						if(card) cards.push(card);
					}
					if(cards.length) player.gain(cards,'gain2');
				},
			},
			twhengjiang:{
				audio:2,
				trigger:{player:'useCardToPlayer'},
				filter:function(event,player){
					return !player.hasSkill('twhengjiang2')&&event.targets.length==1&&['basic','trick'].contains(get.type(event.card,false))&&player.isPhaseUsing()&&game.hasPlayer(function(current){
						return player.inRange(current)&&lib.filter.targetEnabled2(event.card,player,current);
					});
				},
				prompt:'是否发动【横江】？',
				prompt2:function(event,player){
					return '将'+get.translation(event.card)+'的目标改为'+get.translation(lib.skill.twhengjiang.logTarget(event,player));
				},
				logTarget:function(event,player){
					return game.filterPlayer(function(current){
						return player.inRange(current)&&lib.filter.targetEnabled2(event.card,player,current);
					}).sortBySeat();
				},
				check:function(event,player){
					var effect1=get.effect(event.target,event.card,player,player);
					var effect2=0,targets=lib.skill.twhengjiang.logTarget(event,player);
					for(var i of targets) effect2+=get.effect(i,event.card,player,player);
					return effect2>effect1;
				},
				content:function(){
					var targets=lib.skill.twhengjiang.logTarget(trigger,player);
					trigger.targets.length=0;
					trigger.targets.addArray(targets);
					trigger.getParent().triggeredTargets1.length=0;
					trigger.getParent().twhengjiang_buffed=true;
					player.addTempSkill('twhengjiang2','phaseUseAfter');
				},
			},
			twhengjiang2:{
				charlotte:true,
				trigger:{player:'useCardAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.twhengjiang_buffed&&game.hasPlayer2(function(current){
						return current!=player&&(current.hasHistory('useCard',function(evt){
							return evt.respondTo&&evt.respondTo[1]==event.card;
						})||current.hasHistory('respond',function(evt){
							return evt.respondTo&&evt.respondTo[1]==event.card;
						}))
					});
				},
				content:function(){
					player.draw(game.countPlayer2(function(current){
						return current!=player&&(current.hasHistory('useCard',function(evt){
							return evt.respondTo&&evt.respondTo[1]==trigger.card;
						})||current.hasHistory('respond',function(evt){
							return evt.respondTo&&evt.respondTo[1]==trigger.card;
						}))
					}));
				},
			},
			twyuanhu:{
				audio:'yuanhu',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard({type:'equip'},'eh');
				},
				filterCard:{type:'equip'},
				filterTarget:function(card,player,target){
					var card=ui.selected.cards[0];
					return target.isEmpty(get.subtype(card));
				},
				discard:false,
				lose:false,
				prepare:'give',
				position:'he',
				check:function(card){
					if(get.position(card)=='h') return 9-get.value(card);
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					target.equip(cards[0]);
					'step 1'
					event.goto(3);
					switch(get.subtype(cards[0])){
						case 'equip1':
							if(game.hasPlayer(function(current){
								return current!=target&&get.distance(target,current)==1&&current.countCards('hej')>0;
							})){
								player.chooseTarget(true,'弃置一名距离'+get.translation(target)+'为1的角色区域内的一张牌',function(card,player,target){
									var current=_status.event.current;
									return current!=target&&get.distance(current,target)==1&&current.countCards('hej')>0;
								}).set('current',target).set('ai',function(target){
									var player=_status.event.player;
									return get.effect(target,{name:'guohe_copy'},player,player);
								});
								event.goto(2);
							}
							break;
						case 'equip2':
							target.draw();
							break;
						case 'equip3': case 'equip4': case 'equip6':
							target.recover();
							break;
					}
					'step 2'
					var target=result.targets[0];
					player.line(target);
					player.discardPlayerCard(target,true,'hej');
					'step 3'
					if(target.hp<=player.hp||target.countCards('h')<=player.countCards('h')){
						player.draw();
						player.addTempSkill('twyuanhu_end');
					}
				},
				ai:{
					order:10,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)==0) return 0;
							if(!ui.selected.cards.length) return;
							var eff=get.effect(target,ui.selected.cards[0],player,player),sub=get.subtype(ui.selected.cards[0],false);
							if(target==player) eff+=4;
							else{
								var hp=player.hp,hs=player.countCards('h',(card)=>card!=ui.selected.cards[0]);
								var tp=target.hp,ts=target.countCards('h');
								if(sub=='equip2') ts++;
								if(tp<target.maxHp&&(sub=='equip3'||sub=='equip4')) tp++;
								if(tp<=hp||ts<=hs) eff+=2;
							}
							if(sub=='equip1'){
								var list=game.filterPlayer(function(current){
									return current!=target&&get.distance(target,current)==1&&current.countCards('hej')<0;
								}).map(function(i){
									return get.effect(i,{name:'guohe_copy'},player,player);
								}).sort((a,b)=>b-a);
								if(list.length) eff+=list[0];
							}
							return eff;
						},
						target:function(player,target){
							if(!ui.selected.cards.length) return 0;
							var sub=get.subtype(ui.selected.cards[0],false);
							var eff=get.effect(target,ui.selected.cards[0],player,target);
							if(sub=='equip2') eff+=(get.effect(target,{name:'wuzhong'},target,target)/2);
							if(target.isDamaged()&&(sub=='equip3'||sub=='equip4')) eff+=get.recoverEffect(target,player,player);
							return eff;
						},
					},
				},
				subSkill:{
					end:{
						trigger:{player:'phaseJieshuBegin'},
						direct:true,
						charlotte:true,
						filter:function(event,player){
							return player.hasSkill('twyuanhu')&&player.hasCard({type:'equip'},'eh');
						},
						content:function(){
							'step 0'
							player.chooseCardTarget({
								prompt:get.prompt('twyuanhu'),
								prompt2:'将一张装备牌置入一名角色的装备区内。若此牌为：武器牌，你弃置与其距离为1的另一名角色区域的一张牌；防具牌，其摸一张牌；坐骑牌，其回复1点体力。若其的体力值或手牌数不大于你，则你可摸一张牌。',
								filterCard:lib.skill.twyuanhu.filterCard,
								filterTarget:lib.skill.twyuanhu.filterTarget,
								position:'he',
								ai1:lib.skill.twyuanhu.check,
								ai2:function(target){
									var player=_status.event.player;
									return get.effect(target,'twyuanhu',player,player);
								},
							});
							'step 1'
							if(result.bool){
								result.skill='twyuanhu';
								player.useResult(result,event);
							}
						},
					},
				},
			},
			twjuezhu:{
				audio:2,
				limited:true,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return !player.isDisabled('equip3')||!player.isDisabled('equip4');
				},
				skillAnimation:true,
				animationColor:'water',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('twjuezhu'),[1,2],function(card,player,target){
						return !ui.selected.targets.length&&!target.hasSkill('feiying');
					}).set('promptbar','none').set('ai',function(target){
						if(player.hasUnknown()) return false;
						return get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						var list=[];
						if(!player.isDisabled(3)) list.push('equip3');
						if(!player.isDisabled(4)) list.push('equip4');
						if(list.length==1) event._result={control:list[0]};
						else player.chooseControl(list).set('prompt','选择废除一个坐骑栏');
					}
					else event.finish();
					'step 2'
					player.logSkill('twjuezhu',target);
					player.awakenSkill('twjuezhu');
					player.disableEquip(result.control);
					target.disableJudge();
					player.markAuto('twjuezhu_restore',[[target,result.control]]);
					player.addSkill('twjuezhu_restore');
					target.addSkill('feiying');
				},
				subSkill:{
					restore:{
						trigger:{global:'die'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							for(var i of player.getStorage('twjuezhu_restore')){
								if(i[0]==event.player&&player.isDisabled(i[1])) return true;
							}
							return false;
						},
						content:function(){
							var list=[];
							for(var i of player.getStorage('twjuezhu_restore')){
								if(i[0]==trigger.player&&player.isDisabled(i[1])) list.add(i[1]);
							}
							for(var i of list) player.enableEquip(i);
						},
					},
				},
				derivation:'feiying',
			},
			twfengpo:{
				audio:'fengpo',
				trigger:{player:'useCardToPlayered'},
				logTarget:'target',
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou')&&event.targets.length==1&&event.target.countCards('h')>0;
				},
				onremove:true,
				content:function(){
					'step 0'
					event.target=trigger.target;
					player.viewHandcards(trigger.target);
					'step 1'
					var num=target.countCards('h',player.storage.twfengpo?{color:'red'}:{suit:'diamond'});
					if(!num){
						event.finish();
						return;
					}
					event.num=num;
					player.chooseControl().set('choiceList',[
						'摸'+num+'张牌',
						'令'+get.translation(trigger.card)+'的伤害值基数+'+num,
					]);
					'step 2'
					if(result.index==0) player.draw(num);
					else trigger.getParent().baseDamage+=num;
				},
				group:'twfengpo_kill',
				subSkill:{
					kill:{
						trigger:{source:'die'},
						forced:true,
						filter:(event,player)=>!player.storage.twfengpo,
						skillAnimation:true,
						animationColor:'fire',
						content:function(){
							player.storage.twfengpo=true;
						},
					},
				},
			},
			twmouzhu:{
				audio:'mouzhu',
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				contentBefore:function(){
					var target=targets[0],evt=event.getParent();
					evt._target=target;
					var list=game.filterPlayer(function(current){
						return current!=player&&current!=target&&current.hp<=player.hp;
					});
					if(!list.length){
						player.loseHp();
						evt.finish();
					}
					else{
						evt.targets=list.sortBySeat();
						player.line(list);
					}
				},
				content:function(){
					'step 0'
					target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？').set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return 0;
					}).set('goon',get.attitude(target,player)>0);
					'step 1'
					if(result.bool){
						player.gain(result.cards,target,'giveAuto');
					}
					else{
						game.log(target,'拒绝给牌');
					}
				},
				contentAfter:function(){
					'step 0'
					var num=0,par=event.getParent();
					player.getHistory('gain',function(evt){
						if(evt.getParent(2)==par) num+=evt.cards.length;
					});
					if(!num){
						player.loseHp();
						for(var i of targets) i.loseHp();
						event.finish();
					}
					else{
						var target=event.getParent()._target;
						event.target=target;
						event.num=num;
						var bool1=player.canUse('sha',target,false),bool2=player.canUse('juedou',target,false);
						if(bool1&&bool2) target.chooseControl('sha','juedou').set('prompt','谋诛：视为被'+get.translation(player)+'使用一张…').set('prompt2','（伤害值基数：'+num+'）').set('ai',function(){
							var target=_status.event.player,player=_status.event.getParent().player;
							if(target.hasShan()||get.effect(target,{name:'sha'},player,target)>0) return 'sha';
							if(get.effect(target,{name:'juedou'},player,target)>0) return 'juedou';
							return 'sha';
						});
						else if(bool1) event._result={control:'sha'};
						else if(bool2) event._result={control:'juedou'};
						else event.finish();
					}
					'step 1'
					if(result.control&&lib.card[result.control]) player.useCard({
						name:result.control,
						isCard:true,
					},false,target).baseDamage=num;
				},
			},
			twyanhuo:{
				audio:'yanhuo',
				trigger:{player:'die'},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.countCards('he')>0&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0;
					});
				},
				content:function(){
					'step 0'
					var num=player.countCards('he'),str=get.cnNumber(num);
					event.num1=num;
					event.num2=1;
					var list=['令一名其他角色弃置'+str+'张牌'];
					if(num>1){
						list.push('令至多'+str+'名其他角色各弃置一张牌');
					}
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('twyanhuo')).set('forceDie',true);
					'step 1'
					if(result.control!='cancel2'){
						if(result.index==0){
							event.num2=event.num1;
							event.num1=1;
						}
						player.chooseTarget([1,event.num1],true,'请选择【延祸】的目标',function(card,player,target){
							return target!=player&&target.countCards('he')>0;
						}).set('forceDie',true).set('ai',function(target){
							return -get.attitude(_status.event.player,target)
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var targets=result.targets.sortBySeat();
						player.logSkill('twyanhuo',targets);
						for(var i of targets) i.chooseToDiscard(true,'he',event.num2);
					}
				},
			},
			twshenxing:{
				mod:{
					globalFrom:function(player,target,distance){
						var es=player.getCards('e',function(card){
							return !ui.selected.cards.contains(card);
						});
						for(var i of es){
							var type=get.subtype(i);
							if(type=='equip3'||type=='equip4'||type=='equip6') return distance;
						}
						return distance-1;
					},
					maxHandcard:function(player,distance){
						var es=player.getCards('e',function(card){
							return !ui.selected.cards.contains(card);
						});
						for(var i of es){
							var type=get.subtype(i);
							if(type=='equip3'||type=='equip4'||type=='equip6') return distance;
						}
						return distance+1;
					},
				},
			},
			twdaoji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard(lib.skill.twdaoji.filterCard,'he');
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player&&player.inRange(target)&&target.hasCard((card)=>lib.filter.canBeGained(card,target,player),'he');
				},
				check:function(card){
					return 8-get.value(card);
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'he',true);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length==1){
						var card=result.cards[0];
						if(player.getCards('h').contains(card)){
							var type=get.type(card);
							if(type=='basic') player.draw();
							else if(type=='equip'){
								if(player.hasUseTarget(card)) player.chooseUseTarget(card,'nopopup',true);
								target.damage('nocard');
							}
						}
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var eff=get.effect(target,{name:'shunshou_copy2'},player,target);
							if(target.countCards('e')>0) eff+=get.damageEffect(target,player,target);
							return eff;
						},
					},
				},
			},
			xinzhenjun:{
				audio:2,
				trigger:{
					player:'phaseUseBegin'
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						filterCard:true,
						filterTarget:lib.filter.notMe,
						position:'he',
						prompt:get.prompt2('xinzhenjun'),
						ai1:function(card){
							var player=_status.event.player;
							if(card.name=='sha'&&get.color(card)=='red'){
								for(var i=0;i<game.players.length;i++){
									var current=game.players[i];
									if(current!=player&&get.attitude(player,current)>0&&current.hasValueTarget(card)) return 7;
								}
								return 0;
							}
							return 7-get.value(card);
						},
						ai2:function(target){
							var player=_status.event.player;
							var card=ui.selected.cards[0];
							var att=get.attitude(player,target);
							if(get.value(card)<0) return -att*2;
							if(target.countCards('h',{name:'sha',color:'red'})||target.hasSkill('wusheng')||target.hasSkill('new_rewusheng')||target.hasSkill('wushen')||(card.name=='sha'&&get.color(card)=='red'&&target.hasValueTarget(card))) return att*2;
							var eff=0;
							game.countPlayer(function(current){
								if(target!=current&&get.distance(target,current,'attack')>1) return;
								var eff2=get.damageEffect(current,player,player);
								if(eff2>eff) eff=eff2;
							});
							if(att>0&&eff>0) eff+=2*att;
							return eff;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('xinzhenjun',target);
						target.gain(result.cards,player,'giveAuto')
					}
					else event.finish();
					'step 2'
					target.chooseToUse({
						filterCard:function(card){
							return get.name(card)=='sha'&&get.color(card)!='black'&&lib.filter.cardEnabled.apply(this,arguments);
						},
						prompt:'请使用一张不为黑色的【杀】，否则'+get.translation(player)+'可以对你或你攻击范围内的一名其他角色造成1点伤害',
					});
					'step 3'
					if(result.bool){
						var num=1;
						game.countPlayer2(function(current){
							current.getHistory('damage',function(evt){
								if(evt.getParent(evt.notLink()?4:8)==event) num+=evt.num;
							});
						});
						player.draw(num);
						event.finish();
					}
					else{
						player.chooseTarget('是否对'+get.translation(target)+'或其攻击范围内的一名角色造成1点伤害？',function(card,player,target){
							return target==_status.event.targetx||_status.event.targetx.inRange(target);
						}).set('targetx',event.target).ai=function(target){
							var player=_status.event.player;
							return get.damageEffect(target,player,player)
						};
					}
					'step 4'
					if(result.bool){
						player.line(result.targets);
						result.targets[0].damage('nocard');
					}
				},
			},
			twmoukui:{
				trigger:{player:'useCardToPlayered'},
				direct:true,
				preHidden:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				content:function(){
					'step 0'
					var list=['选项一'];
					if(trigger.target.countDiscardableCards(player,'he')>0) list.push('选项二');
					list.push('背水！');
					list.push('cancel2');
					player.chooseControl(list).set('choiceList',[
						'摸一张牌',
						'弃置'+get.translation(trigger.target)+'的一张牌',
						'背水！依次执行以上两项。然后若此【杀】未令其进入濒死状态，则其弃置你的一张牌。',
					]).set('prompt',get.prompt('twmoukui',trigger.target)).setHiddenSkill('twmoukui');
					'step 1'
					if(result.control!='cancel2'){
						var target=trigger.target;
						player.logSkill('twmoukui',target);
						if(result.control=='选项一'||result.control=='背水！') player.draw();
						if(result.control=='选项二'||result.control=='背水！') player.discardPlayerCard(target,true,'he');
						if(result.control=='背水！'){
							player.addTempSkill('twmoukui_effect');
							var evt=trigger.getParent();
							if(!evt.twmoukui_effect) evt.twmoukui_effect=[];
							evt.twmoukui_effect.add(target);
						}
					}
				},
				subSkill:{
					effect:{
						trigger:{player:'useCardAfter'},
						charlotte:true,
						forced:true,
						filter:function(event,player){
							return event.twmoukui_effect&&event.twmoukui_effect.filter(function(current){
								return current.isIn()&&!current.hasHistory('damage',function(evt){
									return evt._dyinged&&evt.card==event.card;
								});
							}).length>0;
						},
						content:function(){
							var list=trigger.twmoukui_effect.filter(function(current){
								return current.isIn()&&!current.hasHistory('damage',function(evt){
									return evt._dyinged&&evt.card==event.card;
								});
							}).sortBySeat();
							for(var i of list){
							 i.discardPlayerCard(player,true,'he').boolline=true;
							}
						},
					},
				},
			},
			twfuhan:{
				audio:'fuhan',
				trigger:{player:'phaseZhunbeiBegin'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				forceunique:true,
				filter:function(event,player){
					return player.countMark('fanghun')>0;
				},
				prompt:function(event,player){
					var num=Math.max(2,player.storage.fanghun);
					num=Math.min(num,8);
					return get.prompt('twfuhan')+'（体力上限：'+num+'）';
				},
				check:function(event,player){
					if(player.storage.fanghun>=Math.min(4,player.maxHp)) return true;
					if(player.hp<=2&&player.storage.fanghun>=3) return true;
					return false;
				},
				content:function(){
					'step 0'
					event.num=player.storage.fanghun;
					player.removeMark('fanghun',player.storage.fanghun);
					player.awakenSkill('twfuhan');
					if(_status.characterlist){
						list=[];
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(lib.character[name][1]=='shu') list.push(name);
						}
					}
					else if(_status.connectMode){
						list=get.charactersOL(function(i){
							return lib.character[i][1]!='shu';
						});
					}
					else{
						list=get.gainableCharacters(function(info){
							return info[1]=='shu';
						});
					}
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						list.remove(players[i].name);
						list.remove(players[i].name1);
						list.remove(players[i].name2);
					}
					list.remove('zhaoxiang');
					player.chooseButton(['扶汉：选择获得一张武将牌上的所有技能',[list.randomGets(5),'character']],true);
					'step 1'
					if(result.bool){
						var name=result.links[0];
						player.flashAvatar('twhuashen',name);
						game.log(player,'获得了','#y'+get.translation(name),'的所有技能');
						player.addSkill(lib.character[name][3])
					}
					'step 2'
					var num=event.num-player.maxHp;
					if(num>0) player.gainMaxHp(num);
					else player.loseMaxHp(-num);
					player.recover();
					'step 3'
					var card=get.cardPile('meiyingqiang','field');
					if(card){
						player.gain(card,'gain2','log');
					}
				},
			},
			twqueshi:{
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&!player.isDisabled(1);
				},
				content:function(){
					if(!lib.inpile.contains('meiyingqiang')){
						lib.inpile.push('meiyingqiang');
						player.equip(game.createCard('meiyingqiang','diamond',12));
					}
					else{
						var card=get.cardPile(function(card){
							return card.name=='meiyingqiang'&&card!=player.getEquip(1);
						},'field');
						if(card) player.equip(card);
					}
				},
			},
			meiyingqiang:{
				equipSkill:true,
				trigger:{
					player:['loseAfter','gainAfter'],
					global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				},
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					var evt=event.getl(player);
					if(!evt||!evt.cards2||!evt.cards2.length) return false;
					var list=player.getHistory('lose',function(evt){
						return evt.cards2&&evt.cards2.length;
					});
					if(event.name=='lose'){
						if(list.indexOf(event)!=0) return false;
					}
					else{
						if(!player.hasHistory('lose',function(evt){
							return evt.getParent()==event&&list.indexOf(evt)==0;
						})) return false;
					}
					return _status.connectMode||!lib.config.skip_shan||player.hasSha();
				},
				direct:true,
				content:function(){
					if(trigger.delay===false) game.delayx();
					player.chooseToUse('梅影枪：是否使用一张【杀】？',function(card){
						if(get.name(card)!='sha') return false;
						return lib.filter.cardEnabled.apply(this,arguments);
					}).set('addCount',false).logSkill='meiyingqiang';
				},
			},
			cuijin:{
				trigger:{global:'useCard'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha'&&(event.player==player||player.inRange(event.player))&&player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(player!=game.me&&!player.isOnline()) game.delayx();
					var target=trigger.player;
					event.target=target;
					player.chooseToDiscard('he',get.prompt('cuijin',target),'弃置一张牌并令'+get.translation(trigger.player)+'使用的【杀】伤害+1，但若其未造成伤害，则你对其造成1点伤害。').set('ai',function(card){
						if(_status.event.goon) return 7-get.value(card);
						return 0;
					}).set('goon',function(){
						var d1=true;
						if(trigger.player.hasSkill('jueqing')||trigger.player.hasSkill('gangzhi')) d1=false
						for(var target of trigger.targets){
							if(!target.mayHaveShan()||trigger.player.hasSkillTag('directHit_ai',true,{
								target:target,
								card:trigger.card,
							},true)){
								if(!target.hasSkill('gangzhi')) d1=false;
								if(!target.hasSkillTag('filterDamage',null,{
									player:trigger.player,
									card:trigger.card,
								})&&get.attitude(player,target)<0) return true;
							}
						}
						if(d1) return get.damageEffect(trigger.player,player,player)>0;
						return false;
					}()).logSkill=['cuijin',target];
					'step 1'
					if(result.bool){
						if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
						trigger.baseDamage++;
						player.addTempSkill('cuijin_damage');
						player.markAuto('cuijin_damage',[trigger.card]);
					}
				},
				subSkill:{
					damage:{
						trigger:{global:'useCardAfter'},
						forced:true,
						popup:false,
						charlotte:true,
						onremove:true,
						filter:function(event,player){
							return player.storage.cuijin_damage.contains(event.card);
						},
						content:function(){
							player.storage.cuijin_damage.remove(trigger.card);
							if(!player.storage.cuijin_damage.length) player.removeSkill('cuijin_damage');
							if(trigger.player.isIn()&&!game.hasPlayer2(function(current){
								return current.hasHistory('damage',function(evt){
									return evt.card==trigger.card;
								});
							})){
								player.line(trigger.player,'green');
								trigger.player.damage();
							}
						},
					},
				},
			},
			jintao:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return num+1;
					},
					targetInRange:function(card){
						if(card.name=='sha') return true;
					},
				},
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(event);
					return index==0||index==1;
				},
				content:function(){
					var evt=trigger.getParent('phaseUse');
					var index=player.getHistory('useCard',function(evtx){
						return evtx.card.name=='sha'&&evtx.getParent('phaseUse')==evt;
					}).indexOf(trigger);
					if(index==0){
						game.log(trigger.card,'伤害+1');
						if(typeof trigger.baseDamage!='number') trigger.baseDamage=1;
						trigger.baseDamage++;
					}
					else{
						game.log(trigger.card,'不可被响应');
						trigger.directHit.addArray(game.players);
					}
				},
			},
			equan:{
				audio:2,
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return player==_status.currentPhase&&event.player.isIn();
				},
				logTarget:'player',
				content:function(){
					trigger.player.addMark('equan',trigger.num,false);
				},
				group:['equan_block','equan_lose'],
				marktext:'毒',
				intro:{
					name:'恶泉(毒)',
					name2:'毒',
				},
				subSkill:{
					lose:{
						audio:'equan',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(){
							return game.hasPlayer(function(current){
								return current.hasMark('equan');
							});
						},
						logTarget:function(){
							return game.filterPlayer(function(current){
								return current.hasMark('equan');
							});
						},
						content:function(){
							game.countPlayer(function(current){
								var num=current.countMark('equan');
								if(num){
									current.removeMark('equan',num);
									current.loseHp(num);
								}
							});
						},
					},
					block:{
						trigger:{global:'dyingBegin'},
						forced:true,
						logTarget:'player',
						filter:function(event,player){
							var evt=event.getParent(2);
							return evt.name=='equan_lose'&&evt.player==player;
						},
						content:function(){
							trigger.player.addTempSkill('baiban');
						},
					},
				},
			},
			manji:{
				audio:2,
				trigger:{global:'loseHpAfter'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&(player.hp>=event.player.hp||player.isDamaged());
				},
				logTarget:'player',
				content:function(){
					if(player.hp<=trigger.player.hp) player.recover();
					if(player.hp>=trigger.player.hp) player.draw();
				},
			},
			beini:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var str=get.translation(target);
					player.chooseControl().set('choiceList',[
						'摸两张牌，然后令'+str+'视为对自己使用【杀】',
						'令'+str+'摸两张牌，然后视为对其使用【杀】',
					]).set('ai',function(){
						var evt=_status.event.getParent(),player=evt.player,target=evt.target;
						var card={name:'sha',isCard:true},att=get.attitude(player,target)>0;
						if(!target.canUse(card,player,false)||get.effect(player,card,target,player)>=0) return 0;
						if(att&&(!player.canUse(card,target,false)||get.effect(target,card,player,player)>=0)) return 1;
						if(target.hasSkill('nogain')&&player.canUse(card,target,false)&&get.effect(target,card,player,player)>0) return 1;
						if(player.hasShan()) return 0;
						if(att&&target.hasShan()) return 1;
						return 0;
					});
					'step 1'
					var list=[player,target];
					if(result.index==1) list.reverse();
					event.list=list;
					list[0].draw(2);
					'step 2'
					var list=event.list;
					if(list[1].isIn()&&list[0].isIn()&&list[1].canUse('sha',list[0],false)) list[1].useCard({name:'sha',isCard:true},list[0],false,'noai');
				},
				ai:{
					order:5,
					expose:0,
					result:{
						player:function(player,target){
							var card={name:'sha',isCard:true},att=get.attitude(player,target)>0;
							if(!target.canUse(card,player,false)||get.effect(player,card,target,player)>=0) return 2;
							if(att&&(!player.canUse(card,target,false)||get.effect(target,card,player,player)>=0)) return 2;
							if(target.hasSkill('nogain')&&player.canUse(card,target,false)) return get.effect(target,card,player,player)
							if(player.hasShan()) return 1;
							if(att&&target.hasShan()) return 1;
							return 0;
						},
					},
				},
			},
			dingfa:{
				audio:2,
				trigger:{player:'phaseDiscardAfter'},
				direct:true,
				filter:function(event,player){
					var num=0;
					player.getHistory('lose',function(evt){
						num+=evt.cards2.length;
					});
					return num>=player.hp;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('dingfa'),'操作提示：选择自己以回复体力，或选择其他角色以造成伤害',function(card,player,target){
						return target==player?player.isDamaged():true;
					}).set('ai',function(target){
						return target!=player?get.damageEffect(target,player,player):get.recoverEffect(player,player,player)
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('dingfa',target);
						if(target==player) player.recover();
						else target.damage();
					}
				},
			},
			dz_mantianguohai:{
				mod:{
					ignoredHandcard:function(card,player){
						if(get.name(card)=='dz_mantianguohai') return true;
					},
					cardDiscardable:function(card,player,name){
						if(name=='cardsDiscard'&&get.name(card)=='dz_mantianguohai') return false;
					},
				},
			},
			twmiaolve:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				filter:function(event,player){
					return event.name!='phase'||game.phaseNumber==0;
				},
				forced:true,
				locked:false,
				content:function(){
					if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
					if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
					var list=_status.dz_mantianguohai_suits.randomRemove(2).map(function(i){
						return game.createCard2('dz_mantianguohai',i,get.rand(1,13));
					});
					if(list.length) player.gain(list,'gain2','log');
				},
				group:'twmiaolve_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						direct:true,
						content:function(){
							'step 0'
							event.count=trigger.num;
							'step 1'
							event.count--;
							var list=['dz_mantianguohai'];
							list.addArray(get.zhinangs());
							player.chooseButton([get.prompt('twmiaolve'),[list,'vcard']]).set('ai',function(button){
								if(button.link[2]=='dz_mantianguohai'&&player.countCards('hs','dz_mantianguohai')<2) return 10;
								return get.value({name:button.link[2]});
							});
							'step 2'
							if(result.bool){
								player.logSkill('twmiaolve');
								var name=result.links[0][2];
								if(name=='dz_mantianguohai'){
									if(!lib.inpile.contains('dz_mantianguohai')) lib.inpile.add('dz_mantianguohai');
									if(!_status.dz_mantianguohai_suits) _status.dz_mantianguohai_suits=lib.suit.slice(0);
									if(_status.dz_mantianguohai_suits.length) player.gain(game.createCard2('dz_mantianguohai',_status.dz_mantianguohai_suits.randomRemove(),get.rand(1,13)),'gain2');
									else{
										var card=get.cardPile(function(card){
											return card.name==name;
										});
										if(card) player.gain(card,'gain2');
									}
									player.draw();
								}
								else{
									var card=get.cardPile(function(card){
										return card.name==name;
									});
									if(card) player.gain(card,'gain2');
								}
								if(event.count>0) event.goto(1);
							}
						},
					},
				},
			},
			twyingjia:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					var history=player.getHistory('useCard'),map={};
					for(var i of history){
						if(get.type2(i.card)=='trick'){
							if(!map[i.card.name]) map[i.card.name]=true;
							else return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt('twyingjia'),
						prompt2:'弃置一张牌并令一名角色进行一个额外回合',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:true,
						ai1:function(card){
							return 8-get.value(card);
						},
						ai2:function(target){
							if(target.hasJudge('lebu')) return -1;
							var player=_status.event.player;
							if(get.attitude(player,target)>4){
								return get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1);
							}
							return -1;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('twyingjia',target);
						player.discard(result.cards);
						target.insertPhase();
					}
				},
			},
			gx_lingbaoxianhu:{
				trigger:{
					source:'damageSource',
					global:'dieAfter',
				},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(event.name=='damage') return event.num>1;
					return true;
				},
				content:function(){
					player.gainMaxHp();
					player.recover();
				},
			},
			gx_taijifuchen:{
				trigger:{player:'useCardToPlayered'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha';
				},
				logTarget:'target',
				content:function(){
					'step 0'
					var suit=get.suit(trigger.card);
					var num=trigger.target.countCards('h','shan');
					var next=trigger.target.chooseToDiscard('弃置一张牌，或不能响应'+get.translation(trigger.card),'he').set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return (get.suit(card)!=_status.event.suit?9:6)-get.value(card);
					}).set('num',num);
					if(lib.suit.contains(suit)){
						next.set('prompt2','若弃置的是'+get.suit(suit)+'牌，则改为'+get.translation(player)+'获得之');
						next.set('suit',suit);
					}
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						if(get.suit(card,trigger.target)==get.suit(trigger.card,false)&&get.position(card)=='d') player.gain(card,'gain2');
					}
					else trigger.directHit.add(trigger.target);
				},
			},
			gx_chongyingshenfu:{
				trigger:{player:'damageEnd'},
				forced:true,
				equipSkill:true,
				filter:function(event,player){
					if(!event.card||!event.card.name||player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
					if(player.hasSkillTag('unequip2')) return false;
					if(event.source.hasSkillTag('unequip',false,{
						name:event.card.name,
						target:player,
						card:event.card,
					})) return false;
					return true;
				},
				content:function(){
					player.markAuto('gx_chongyingshenfu_effect',[trigger.card.name]);
				},
				group:'gx_chongyingshenfu_effect',
				subSkill:{
					effect:{
						trigger:{player:'damageBegin4'},
						forced:true,
						equipSkill:true,
						filter:function(event,player){
							if(!event.card||!event.card.name||!player.storage.gx_chongyingshenfu_effect||!player.getStorage('gx_chongyingshenfu_effect').contains(event.card.name)) return false;
							if(player.hasSkillTag('unequip2')) return false;
							if(event.source.hasSkillTag('unequip',false,{
								name:event.card.name,
								target:player,
								card:event.card,
							})) return false;
							return true;
						},
						content:function(){
							trigger.num--;
						},
						onremove:true,
						intro:{
							content:'受到$造成的伤害-1',
						},
					},
				},
			},
			twdanfa:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('twdanfa'),'将一张牌作为“丹”置于武将牌上').set('ai',function(card){
						if(player.storage.twdanfa){
							var suit=get.suit(card);
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return 4-get.value(card);
							}
						}
						return 5.5-get.value(card);
					});
					'step 1'
					if(result.bool){
						var card=result.cards[0];
						player.logSkill('twdanfa');
						game.log(player,'将',card,'放在了武将牌上');
						player.$give(card,player,false);
						player.lose(card,ui.special,'toStorage');
						player.markAuto('twdanfa',result.cards);
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
				mark:true,
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				group:'twdanfa_draw',
				subSkill:{
					draw:{
						audio:'twdanfa',
						trigger:{player:'useCard'},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(!player.storage.twdanfa||!player.storage.twdanfa.length) return false;
							var suit=get.suit(event.card,false);
							if(suit=='none'||player.storage.twdanfa_count&&player.storage.twdanfa_count.contains(suit)) return false;
							for(var i of player.storage.twdanfa){
								if(get.suit(i,false)==suit) return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill('twdanfa_count');
							if(!player.storage.twdanfa_count) player.storage.twdanfa_count=[];
							player.storage.twdanfa_count.push(get.suit(trigger.card,false));
						},
					},
					count:{onremove:true},
				},
			},
			twlingbao:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var list=player.getStorage('twdanfa');
					if(list.length<2) return false;
					var suit=get.suit(list[0],false);
					for(var i=1;i<list.length;i++){
						if(get.suit(list[i],false)!=suit) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('灵宝',player.storage.twdanfa);
					},
					filter:function(button,player){
						if(!ui.selected.buttons.length) return true;
						return get.suit(button.link)!=get.suit(ui.selected.buttons[0].link);
					},
					select:2,
					backup:function(links){
						var obj=get.copy(lib.skill['twlingbao_'+get.color(links)]);
						obj.cards=links;
						obj.audio='twlingbao';
						obj.filterCard=()=>false;
						obj.selectCard=-1;
						return obj;
					},
					prompt:function(links){
						return lib.skill['twlingbao_'+get.color(links)].prompt;
					},
					check:function(button){
						var storage=_status.event.player.storage.twdanfa.slice(0);
						storage.remove(button.link);
						if(storage.filter(function(card){
							return card.suit==button.link.suit;
						}).length) return 1+Math.random();
						return 0;
					},
				},
				subSkill:{
					red:{
						filterTarget:function(card,player,target){
							return target.isDamaged();
						},
						delay:false,
						prompt:'令一名角色回复1点体力',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							target.recover();
						},
						ai:{
							tag:{
								recover:1,
							},
							result:{
								target:1.5,
							},
						},
					},
					black:{
						filterTarget:function(card,player,target){
							return target.countDiscardableCards(player,'hej')>0;
						},
						delay:false,
						prompt:'弃置一名角色区域内至多两张区域不同的牌',
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							var num=0;
							if(target.countDiscardableCards(player,'h')) num++;
							if(target.countDiscardableCards(player,'e')) num++;
							if(target.countDiscardableCards(player,'j')) num++;
							if(num){
								player.discardPlayerCard(target,[1,Math.max(2,num)],'hej',true).set('filterButton',function(button){
									for(var i=0;i<ui.selected.buttons.length;i++){
										if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
									}
									return true;
								});
							}
						},
						ai:{
							tag:{
								lose:1.5,
								loseCard:1.5,
								discard:1.5,
							},
							result:{
								target:function(player,target){
									if(get.attitude(player,target)>0&&target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0&&target.countCards('j',function(card){
										return get.effect(target,card,target,target)<0;
									})>8) return 3;
									if(target.countCards('h')>0&&target.countCards('e',function(card){
										return get.value(card,target)>0;
									})>0) return -2;
									return 0;
								},
							},
						},
					},
					none:{
						selectTarget:2,
						filterTarget:function(card,player,target){
							if(!ui.selected.targets.length) return true;
							return target.countCards('he')>0;
						},
						complexSelect:true,
						targetprompt:['摸牌','弃牌'],
						delay:false,
						prompt:'令一名角色摸一张牌并令另一名角色弃置一张牌',
						multitarget:true,
						multiline:true,
						content:function(){
							'step 0'
							var cards=lib.skill.twlingbao_backup.cards;
							player.$throw(cards,1000);
							player.unmarkAuto('twdanfa',cards);
							game.log(player,'将',cards,'置入了弃牌堆');
							game.delayx();
							game.cardsDiscard(cards);
							'step 1'
							targets[0].draw();
							targets[1].chooseToDiscard('he',true);
						},
						ai:{
							result:{
								target:function(player,target){
									if(!ui.selected.targets.length) return 1;
									if(target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})>0) return 1;
									return -1;
								},
							},
						},
					},
					backup:{audio:'twlingbao'},
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			twsidao:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&!player.storage.twsidao;
				},
				content:function(){
					'step 0'
					player.chooseButton(['请选择你的初始法宝',[['gx_lingbaoxianhu','gx_taijifuchen','gx_chongyingshenfu'],'vcard']],true).set('ai',function(button){
						return button.link[2]=='gx_chongyingshenfu'?2:1;
					});
					'step 1'
					if(result.bool){
						var card=game.createCard2(result.links[0][2]);
						lib.inpile.add(result.links[0][2]);
						player.storage.twsidao=card;
						player.chooseUseTarget(card,'nopopup',true);
					}
				},
				group:'twsidao_equip',
				subSkill:{
					equip:{
						audio:'twsidao',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							var card=player.storage.twsidao;
							return card&&card.isInPile()&&player.hasUseTarget(card);
						},
						content:function(){
							player.chooseUseTarget(player.storage.twsidao,'nopopup',true);
						},
					},
				},
			},
			twrangyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:lib.filter.notMe,
				delay:0,
				content:function(){
					'step 0'
					event.cards=player.getCards('h');
					target.gain(event.cards,player,'giveAuto').gaintag.add('twrangyi');
					target.addTempSkill('twrangyi2');
					'step 1'
					target.chooseToUse({
						prompt:'请使用得到的一张牌，或者受到来自'+get.translation(player)+'的一点伤害',
						filterCard:function(card,player){
							if(get.itemtype(card)!='card'||!card.hasGaintag('twrangyi')) return false;
							return lib.filter.filterCard(card,player,event);
						},
						cards:cards,
					});
					'step 2'
					target.removeSkill('twrangyi2');
					if(!result.bool) target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var hs=player.getCards('h');
							for(var i=0;i<hs.length;i++){
								var hi=hs[i];
								if(hi.name=='tao'||game.hasPlayer(function(current){
									return target.canUse(hi,current)&&get.effect(current,hi,target,target);
								})) return 1;
							}
							return get.damageEffect(target,player,target);
						},
					},
				},
			},
			twrangyi2:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				charlotte:true,
				filter:function(event,player){
					var evt=event.getParent(2);
					return evt.name=='twrangyi'&&evt.player.isAlive()&&player.countCards('h',function(card){
						return card.hasGaintag('twrangyi');
					})>0;
				},
				content:function(){
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('twrangyi');
					});
					game.delayx();
					trigger.getParent(2).player.gain(cards,player,'giveAuto');
				},
				onremove:function(player){
					player.removeGaintag('twrangyi');
				},
			},
			twbaimei:{
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				forced:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					if(event.nature) return true;
					return get.type(event.card,'trick')=='trick';
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(target.countCards('h')) return;
							if(get.tag(card,'natureDamage')) return 'zerotarget';
							if(get.type(card)=='trick'&&get.tag(card,'damage')){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			twhuzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(e,player){
					return player.countCards('e')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0
				},
				content:function(){
					'step 0'
					target.chooseCard('交给'+get.translation(player)+'一张手牌','h',true);
					'step 1'
					target.give(result.cards,player);
					'step 2'
					if(player.countGainableCards(player,'e')) target.gainPlayerCard(player,'e',true);
					'step 3'
					if(target.isDamaged()&&target.hp<=player.hp){
						player.chooseBool('是否令'+get.translation(target)+'回复1点体力？').set('ai',function(){
							return get.recoverEffect(target,player,player);
						});
					}
					'step 4'
					if(result.bool) target.recover();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							var eff=(target.isDamaged()&&target.hp<=player.hp)?get.recoverEffect(target,player,target):0;
							if(eff<=0&&!player.countGainableCards(target,'e')) return -1;
							return eff;
						},
					},
				},
			},
			twliancai:{
				audio:2,
				trigger:{player:['turnOverEnd','phaseJieshuBegin']},
				filter:function(card,player,target){
					return target=='phaseJieshuBegin'||player.countCards('h')<player.hp;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'e')>0;
				},
				check:function(card,player){
					if(card.name=='turnOver') return true;
					if(player.isTurnedOver()) return true;
					if(player.hp-player.countCards('h')>1) return true;
					return game.hasPlayer(function(current){
						return lib.skill.twliancai.filterTarget(null,player,current)&&lib.skill.twliancai.filterAI(current);
					});
				},
				filterAI:function(target){
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(target.isDamaged()&&target.countCards('e','baiyin')&&att>0) return 2*att;
					return -att;
				},
				prompt2:function(card,player,target){
					return card.name=='phaseJieshu'?'将武将牌翻面，然后获得一名其他角色装备区内的一张牌':'将手牌摸至与体力值相同';
				},
				content:function(){
					'step 0'
					if(event.triggername=='phaseJieshuBegin') player.turnOver();
					else{
						player.draw(player.hp-player.countCards('h'));
						event.finish();
					}
					'step 1'
					player.chooseTarget('获得一名角色装备区内的一张牌',lib.skill.twliancai.filterTarget).ai=lib.skill.twliancai.filterAI;
					'step 2'
					if(result.bool){
						player.line(result.targets,'thunder');
						player.gainPlayerCard('e',true,result.targets[0]);
					}
				},
			},
			twqijia:{
				//group:'twqijia_alka',
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('e',function(card){
						return !player.getStorage('twqijia_alka').contains(get.subtype(card));
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canUse({name:'sha'},target);
				},
				position:'e',
				filterCard:function(card,player){
					return !player.getStorage('twqijia_alka').contains(get.subtype(card));
				},
				content:function(){
					'step 0'
					player.addTempSkill('twqijia_alka');
					player.storage.twqijia_alka.push(get.subtype(cards[0]));
					player.useCard({name:'sha'},target,false);
				},
				subSkill:{
					alka:{
						charlotte:true,
						onremove:function(player){
							delete player.storage.twqijia_alka;
							delete player.storage.twzhuchen;
							player.unmarkSkill('twzhuchen');
						},
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
							if(!player.storage.twzhuchen) player.storage.twzhuchen=[];
						},
						mod:{
							globalFrom:function(from,to,distance){
								if(from.storage.twzhuchen&&from.storage.twzhuchen.contains(to)) return -Infinity;
							}
						},
					},
				},
				check:function(card){
					return 7-get.value(card);
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})-0.2;
					},
					result:{
						target:function(player,target){
							return get.effect(target,{name:'sha'},player,player);
						},
					},
				},
			},
			twzhuchen:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h',lib.skill.twzhuchen.filterCard)>0;
				},
				filterCard:function(card,player){
					var name=get.name(card,player);
					return name=='tao'||name=='jiu';
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					player.addTempSkill('twqijia_alka');
					player.storage.twzhuchen.add(target);
					player.markSkill('twzhuchen');
				},
				intro:{
					content:function(content,player){
						return '至'+get.translation(content)+'的距离视为1';
					},
				},
			},
			twxiaolian:{
				audio:2,
				trigger:{global:'useCardToTarget'},
				logTarget:'target',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&
					event.targets.length==1&&event.targets[0]!=player;
				},
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					trigger.getParent().twxiaolian=trigger.targets[0];
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets2.length=0;
					trigger.targets.push(player);
				},
				group:'twxiaolian_damage',
				subSkill:{
					distance:{
						sub:true,
						charlotte:true,
						init:function(player,skill){
							if(!player.storage[skill]) player.storage[skill]=[];
						},
						mark:true,
						marktext:'马',
						intro:{
							content:'cards',
							onunmark:'throw',
						},
						mod:{
							globalTo:function(from,to,distance){
								if(from!=to&&to.storage.twxiaolian_distance) return distance+to.storage.twxiaolian_distance.length;
							},
						},
					},
					damage:{
						sub:true,
						trigger:{player:'damageEnd'},
						direct:true,
						filter:function(event,player){
							return event.getParent(2).twxiaolian!=undefined;
						},
						content:function(){
							'step 0'
							var target=trigger.getParent(2).twxiaolian;
							event.target=target;
							player.chooseCard('是否将一张牌当做【马】置于'+get.translation(target)+'的武将牌旁？','he').ai=function(card){
								if(get.attitude(_status.event.player,_status.event.getParent('twxiaolian_damage').target)>2) return 7-get.value(card);
								return 0;
							};
							'step 1'
							if(result.bool){
								player.logSkill('twxiaolian',target);
								player.lose(result.cards,ui.special,'toStorage');
								target.addSkill('twxiaolian_distance');
								target.storage.twxiaolian_distance.addArray(result.cards);
								target.markSkill('twxiaolian_distance');
							}
						},
					},
				},
			},
			twtijin:{
				audio:2,
				trigger:{global:'useCardToPlayer'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.player!=player&&event.target!=player&&
					event.targets.length==1&&event.player.inRange(player);
				},
				logTarget:'target',
				check:function(event,player){
					return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
				},
				content:function(){
					'step 0'
					trigger.targets.length=0;
					trigger.getParent().triggeredTargets1.length=0;
					trigger.targets.push(player);
					var next=game.createEvent('twtijin_discard',null,trigger.getParent(2));
					next.player=player;
					next.target=trigger.player;
					next.setContent(function(){
						if(target.isDead()||!target.countCards('he')) return;
						player.line(target,'green');
						player.discardPlayerCard(target,true,'he');
					});
				},
			},
			twyanqin:{
				forbid:['guozhan'],
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					'step 0'
					var list=[];
					if(player.group!='wei') list.push('wei2');
					if(player.group!='shu') list.push('shu2');
					list.push('cancel2');
					player.chooseControl(list).set('ai',function(){
						return list.randomGet();
					}).set('prompt',get.prompt2('twyanqin'));
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('twyanqin');
						var group=result.control.slice(0,3);
						player.changeGroup(group);
					}
				},
			},
			twbaobian:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					var card=event.card;
					if(!card||(card.name!='sha'&&card.name!='juedou')) return false;
					return event.player.group==player.group||event.player.countCards('h')>event.player.hp
				},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					if(event.player.group==player.group) return att>0;
					return att<0;
				},
				logTarget:'player',
				content:function(){
					var target=trigger.player;
					if(target.group==player.group){
						trigger.cancel();
						var num=target.maxHp-target.countCards('h');
						if(num) target.draw(num);
					}
					else{
						player.discardPlayerCard(target,'h',true,target.countCards('h')-target.hp)
					}
				},
			},
			renshe:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					'step 0'
					var choiceList=['令一名其他角色与你各摸一张牌','令自己下个出牌阶段可以多发动一次【外使】'];
					if(lib.skill.chijie.filter&&lib.skill.chijie.filter({},player)) choiceList.push('将自己的势力变更为场上存在的一个其他势力');
					player.chooseControl('cancel2').set('prompt',get.prompt('renshe')).set('choiceList',choiceList).set('ai',function(){
						if(game.hasPlayer(function(current){
							return get.attitude(player,current)>0||current.hasSkillTag('nogain');
						})) return 0;
						return 1;
					});
					'step 1'
					if(result.control=='cancel2') event.finish();
					else{
						event.index=result.index;
						player.logSkill('renshe');
						if(event.index==0){
							player.chooseTarget('请选择一名角色，与其各摸一张牌',lib.filter.notMe,true).ai=function(target){
								if(target.hasSkillTag('nogain')) return 0.1;
								return get.attitude(_status.event.player,target);
							};
						}
						else if(result.index==1){
							player.storage.waishi++;
							event.finish();
						}
						else{
							var next=game.createEvent('renshe_changeGroup');
							next.player=player;
							next.renshe=true;
							next.setContent(lib.skill.chijie.content);
							event.finish();
						}
					}
					'step 2'
					if(result.bool){
						player.line(result.targets[0],'green');
						game.asyncDraw([player,result.targets[0]].sortBySeat());
					}
					else event.finish();
					'step 3'
					game.delay();
				},
			},
			waishi:{
				audio:2,
				group:'waishi_afterstory',
				subSkill:{
					afterstory:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.storage.waishi=1},
					},
				},
				init:function(player,skill){
					player.storage[skill]=1;
				},
				enable:'phaseUse',
				filter:function(event,player){
					return typeof player.storage.waishi!='number'||player.storage.waishi>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>=ui.selected.cards.length;
				},
				filterCard:true,
				position:'he',
				check:function(card){
					if(!game.hasPlayer(function(current){
						return current!=_status.event.player&&current.countCards('h')>ui.selected.cards.length;
					})) return 0;
					return 6-get.value(card);
				},
				selectCard:function(){
					if(!ui.selected.targets.length) return [1,game.countGroup()];
					return [1,Math.min(ui.selected.targets[0].countCards('h'),game.countGroup())];
				},
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					if(typeof player.storage.waishi!='number') player.storage.waishi=1;
					player.storage.waishi--;
					player.lose(cards,ui.special);
					player.choosePlayerCard(target,true,'h',cards.length).chooseonly=true;
					'step 1'
					event.cards2=result.cards;
					target.lose(event.cards2,ui.special);
					'step 2'
					player.gain(event.cards2);
					target.gain(cards);
					player.$give(cards.length,target);
					target.$give(event.cards2.length,player);
					'step 3'
					game.delay(1.2);
					'step 4'
					if(target.countCards('h')>player.countCards('h')||player.group==target.group) player.draw();
				},
				ai:{
					result:{
						player:function(player,target){
							if(player.countCards('h')<target.countCards('h')||player.group==target.group) return 1;
							return 0.1;
						},
					},
				},
			},
			chijie:{
				audio:true,
				forbid:['guozhan'],
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				direct:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0)&&game.hasPlayer(function(current){
						return current.group!=player.group;
					});
				},
				content:function(){
					'step 0'
					var list=lib.group.filter(function(group){
						return group!=player.group&&game.hasPlayer(function(current){
							return current.group==group;
						});
					})
					if(!event.renshe) list.push('cancel2');
					player.chooseControl(list).set('prompt',event.renshe?'请选择一个势力':get.prompt('chijie')).set('prompt2',event.renshe?'':'将自己的势力变更为场上存在的一个势力').set('',function(){
						return list.randomGet();
					});
					'step 1'
					if(result.control!='cancel2'){
						if(!event.renshe) player.logSkill('chijie');
						player.changeGroup(result.control);
					}
				},
			},
		},
		characterReplace:{
			tw_caocao:['tw_caocao','yj_caocao'],
		},
		dynamicTranslate:{
			twfengpo:function(player){
				if(player.storage.twfengpo) return '当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的红色牌数）。';
				return '①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。';
			},
		},
		translate:{
			tw_beimihu:'TW卑弥呼',
			nashime:'难升米',
			tw_xiahouba:'TW夏侯霸',
			tw_zumao:'TW祖茂',
			tw_caoang:'TW曹昂',
			tw_dingfeng:'TW丁奉',
			tw_caohong:'TW曹洪',
			tw_maliang:'TW马良',
			
			twyanqin:'姻亲',
			twyanqin_info:'准备阶段，你可以将势力变更为魏或蜀。',
			twbaobian:'豹变',
			twbaobian_info:'当你使用【杀】或【决斗】造成伤害时，若目标角色的势力与你相同，则你可以防止此伤害，然后其将手牌数补充至与体力值相同。若不同且其手牌数大于体力值，则你可以将其手牌弃置至与其体力值相同。',
			twtijin:'替巾',
			twtijin_info:'当你攻击范围内的一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，此【杀】结算完成后，你弃置该角色的一张牌。',
			twxiaolian:'孝廉',
			twxiaolian_info:'当一名其他角色使用【杀】指定另一名其他角色为目标时，你可以将此【杀】的目标改为你。若如此做，当你受到此【杀】的伤害后，你可以将一张牌放在此【杀】原目标的武将牌旁，称之为“马”。锁定技，场上的一名角色每有一张“马”，其他角色计算与其的距离便+1。',
			twqijia:'弃甲',
			twqijia_info:'出牌阶段，你可以弃置一张装备区内的牌（每种类型的装备牌限一次），然后视为对攻击范围内的一名其他角色使用了一张【杀】。',
			twzhuchen:'诛綝',
			twzhuchen_info:'出牌阶段，你可以弃置一张【桃】或【酒】并选择一名其他角色。你与其的距离视为1直到此阶段结束。',
			twhuzhu:'护主',
			twhuzhu_info:'出牌阶段限一次，若你的装备区内有牌，则你可以令一名其他角色交给你一张手牌，然后获得你装备区内的一张牌。若其体力值不大于你，则你可以令其回复1点体力。',
			twliancai:'敛财',
			twliancai_info:'结束阶段，你可以将武将牌翻面，然后获得一名其他角色装备区内的一张牌。当你的武将牌翻面时，你可以将手牌补至与体力值相同。',
			twrangyi:'攘夷',
			twrangyi2:'攘夷',
			twrangyi_info:'出牌阶段限一次，你可以将所有手牌交给一名其他角色，然后令其选择一项：1.使用其中的一张牌，并于此牌被使用时将其余的牌交还给你。2.受到来自你的1点伤害。',
			twbaimei:'白眉',
			twbaimei_info:'锁定技，若你没有手牌，则防止你受到的所有属性伤害和锦囊牌造成的伤害。',
			chijie:'持节',
			chijie_info:' 游戏开始时，你可以选择一个现存势力，你的势力视为该势力。 ',
			waishi:'外使',
			waishi_info:' 出牌阶段限一次，你可以用至多X张牌交换一名其他角色等量的手牌（X为现存势力数），然后若其与你势力相同或手牌多于你，你摸一张牌。',
			renshe:'忍涉',
			renshe_info:'当你受到伤害后，你可以选择一项：将势力改为现存的另一个势力；或可以额外发动一次“外使”直到你的下个出牌阶段结束；或与另一名其他角色各摸一张牌。',
			tw_gexuan:'TW葛玄',
			twdanfa:'丹法',
			twdanfa_info:'准备阶段或结束阶段开始时，你可将一张牌置于武将牌上，称为“丹”。每回合每种花色限一次，当你使用牌时，若“丹”中有与此牌花色相同的牌，则你摸一张牌。',
			twlingbao:'灵宝',
			twlingbao_info:'出牌阶段限一次，你可以将两张花色不同的“丹”置入弃牌堆。若这两张牌：均为红色，你令一名其他角色回复1点体力；均为黑色，你弃置一名其他角色区域内至多两张区域不同牌；颜色不同，则你令一名角色摸一张牌，并令另一名角色弃置一张牌。',
			twsidao:'司道',
			twsidao_info:'游戏开始时，你选择一张“法宝”置入装备区。准备阶段，若你以此法选择的法宝在牌堆/弃牌堆中，则你使用之。',
			gx_lingbaoxianhu:'灵宝仙壶',
			gx_lingbaoxianhu_info:'锁定技，当你造成点数大于1的伤害后，或有角色死亡后，你加1点体力上限并回复1点体力。',
			gx_taijifuchen:'太极拂尘',
			gx_taijifuchen_info:'锁定技，当你使用【杀】指定目标后，你令目标角色选择一项：①弃置一张牌，若此牌和【杀】花色相同，则你获得之。②其不可响应此【杀】。',
			gx_chongyingshenfu:'冲应神符',
			gx_chongyingshenfu_info:'锁定技。①当你受到牌造成的伤害后，你记录此牌的名称。②当你受到〖冲应神符①〗记录过的牌造成的伤害时，你令此牌伤害-1。',
			tw_dongzhao:'TW董昭',
			twmiaolve:'妙略',
			twmiaolve_info:'游戏开始时，你获得两张【瞒天过海】。当你受到1点伤害后，你可选择：①获得一张【瞒天过海】并摸一张牌。②获得一张智囊。',
			twyingjia:'迎驾',
			twyingjia_info:'一名角色的回合结束时，若你本回合内使用过两张或更多的同名锦囊牌，则你可弃置一张手牌并令一名角色进行一个额外回合。',
			dz_mantianguohai:'瞒天过海',
			dz_mantianguohai_info:'此牌不计入拥有者的手牌上限。出牌阶段，对一至两名区域内有牌的其他角色使用。你获得目标角色一张牌，然后依次交给每名目标角色各一张牌。',
			jiachong:'TW贾充',
			beini:'悖逆',
			beini_info:'出牌阶段限一次，你可以选择一名体力值不小于你的角色，令你或其摸两张牌，然后未摸牌的角色视为对摸牌的角色使用一张【杀】。',
			dingfa:'定法',
			dingfa_info:'弃牌阶段结束时，若本回合你失去的牌数不小于你的体力值，你可以选择一项：1、回复1点体力；2、对一名其他角色造成1点伤害。 ',
			duosidawang:'朵思大王',
			equan:'恶泉',
			equan_info:'锁定技。①当有角色于你的回合内受到伤害后，其获得X枚“毒”（X为伤害值）。②准备阶段，你令所有拥有“毒”标记的角色移去所有“毒”标记并失去等量的体力。③当有角色因〖恶泉②〗进入濒死状态时，你令其所有技能失效直到回合结束。',
			manji:'蛮汲',
			manji_info:'锁定技。其他角色失去体力后，若你的体力值：不大于该角色，你回复1点体力；不小于该角色，你摸一张牌。',
			wuban:'吴班',
			jintao:'进讨',
			jintao_info:'锁定技，你使用【杀】无距离限制且次数上限+1。你于出牌阶段内使用的第一张【杀】伤害+1，第二张【杀】不可被响应。',
			yuejiu:'乐就',
			cuijin:'催进',
			cuijin_info:'当你或你攻击范围内的角色使用【杀】时，你可以弃置一张牌并获得如下效果：此【杀】的伤害值基数+1，且当此【杀】结算结束后，若未造成过伤害，则你对使用者造成1点伤害。',
			tw_zhaoxiang:'TW赵襄',
			twfuhan:'扶汉',
			twfuhan_info:'限定技。准备阶段开始时时，你可以移去所有"梅影"标记，然后从五张未登场的蜀势力武将牌中选择一名获得其所有技能，将体力上限数调整为以此技能移去所有“梅影”标记的数量（最少为2，最多为8）并回复1点体力，然后从牌堆/弃牌堆/场上获得【梅影枪】。',
			twqueshi:'鹊拾',
			twqueshi_info:'游戏开始时，你将【梅影枪】置于你的装备区。',
			meiyingqiang:'梅影枪',
			meiyingqiang_info:'当你于其他角色的回合内第一次失去牌时，你可以使用一张【杀】。',
			tw_fuwan:'TW伏完',
			twmoukui:'谋溃',
			twmoukui_info:'当你使用【杀】指定目标后，你可以选择一项：①摸一张牌；②弃置该角色的一张牌；③背水：若此【杀】未因造成伤害而令该角色进入过濒死状态，则该角色弃置你的一张牌。',
			tw_yujin:'SP于禁',
			xinzhenjun:'镇军',
			xinzhenjun_info:'出牌阶段开始时，你可以将一张牌交给一名其他角色，令其选择是否使用一张不为黑色的【杀】。若其选择是，则你于此【杀】结算完成后摸1+X张牌(X为此【杀】造成的伤害总点数)。若其选择否，则你对其或其攻击范围内的一名其他角色造成1点伤害。',
			tw_hucheer:'TW胡车儿',
			twshenxing:'神行',
			twshenxing_info:'锁定技。若你的装备区内没有坐骑牌，则你至其他角色的距离-1且手牌上限+1。',
			twdaoji:'盗戟',
			twdaoji_info:'出牌阶段限一次，你可以弃置一张非基本牌并选择一名攻击范围内的角色，获得其一张牌。若你以此法获得的牌为：基本牌，你摸一张牌；装备牌，你使用此牌并对其造成1点伤害。',
			tw_hejin:'TW何进',
			twmouzhu:'谋诛',
			twmouzhu_info:'出牌阶段限一次，你可以选择一名其他角色A。你令除A外所有体力值小于等于你的其他角色依次选择是否交给你一张牌。若你以此法获得的牌数X：等于0，你和所有进行选择的角色依次失去1点体力。大于0，你令A选择由你视为对其使用一张伤害值基数为X的【杀】或【决斗】。',
			twyanhuo:'延祸',
			twyanhuo_info:'当你死亡时，你可以选择一项：①令一名其他角色弃置X张牌。②令X名其他角色依次弃置一张牌。（X为你的牌数）',
			tw_mayunlu:'TW马云禄',
			twfengpo:'凤魄',
			twfengpo_info:'①当你使用【杀】或【决斗】指定唯一目标后，你可观看目标角色的手牌并选择一项：⒈摸X张牌。⒉令此牌的伤害值基数+X（X为其手牌中的♦数）。②当你杀死一名角色后，你将〖凤魄①〗中的“♦数”改为“红色牌数”。',
			tw_re_caohong:'TW手杀曹洪',
			tw_re_caohong_ab:'曹洪',
			twyuanhu:'援护',
			twyuanhu_info:'出牌阶段限一次。你可将一张装备牌置入一名角色的装备区内。若此牌为：武器牌，你弃置与其距离为1的另一名角色区域的一张牌；防具牌，其摸一张牌；坐骑牌，其回复1点体力。若其的体力值或手牌数不大于你，则你可摸一张牌，且可以于本回合的结束阶段再发动一次〖援护〗。',
			twjuezhu:'决助',
			twjuezhu_info:'限定技。准备阶段，你可废除一个坐骑栏，令一名角色获得〖飞影〗并废除判定区。该角色死亡后，你恢复以此法废除的装备栏。',
			tw_zangba:'TW臧霸',
			twhanyu:'捍御',
			twhanyu_info:'锁定技。游戏开始时，你获得牌堆中的基本牌，锦囊牌，装备牌各一张。',
			twhengjiang:'横江',
			twhengjiang_info:'出牌阶段限一次，当你使用基本牌或普通锦囊牌指定唯一目标后，你可将此牌的目标改为攻击范围内的所有合法目标，然后你于此牌结算结束后摸X张牌（X为因响应此牌而使用或打出过牌的角色数）。',
			tw_huojun:'霍峻',
			twsidai:'伺怠',
			twsidai_info:'限定技。出牌阶段，你可以将手牌区内的所有基本牌当做【杀】使用（无距离和次数限制）。若此牌对应的实体牌中：包含【闪】，则目标角色成为此牌的目标后，需弃置一张基本牌，否则不可响应此牌；包含【桃】，则当目标角色受到此牌的伤害后，其减1点体力上限；包含【酒】，则当目标角色受到此牌的伤害时，此伤害×2。',
			twjieyu:'竭御',
			twjieyu_info:'每轮限一次。结束阶段开始时，或当你于一轮内第一次受到伤害后，你可以弃置所有手牌，然后从弃牌堆中获得不同牌名的基本牌各一张。',
			tw_liuhong:'TW刘宏',
			twyujue:'鬻爵',
			twyujue_give:'鬻爵',
			twyujue_info:'①其他角色的出牌阶段内，可以交给你任意张牌（每阶段上限为两张）。②当你于回合外获得其他角色的一张牌后，你可令其选择本回合内未选择过的一项：⒈弃置攻击范围内一名角色的一张牌。⒉下一次使用牌时，从牌堆中获得一张同类别的牌。',
			twgezhi:'革制',
			twgezhi_info:'①当你于出牌阶段内首次使用某种类别的牌时，你可以重铸一张手牌。②出牌阶段结束时，若你本阶段内因〖革制①〗失去过至少两张牌，则你可以令一名角色选择获得一个其未获得过的效果：⒈攻击范围+2；⒉手牌上限+2；⒊加1点体力上限。',
			twfengqi:'烽起',
			twfengqi_info:'主公技，锁定技。①其他群势力角色发动〖鬻爵①〗时，将每阶段上限改为四张。②以其他角色为目标的〖革制②〗结算结束后，目标角色可以激活其武将牌上的主公技。',
			tw_caocao:'TW曹操',
			twlingfa:'令法',
			twlingfa_info:'①第一轮游戏开始时，你可选择获得如下效果直到本轮结束：其他角色使用【杀】时，若其有牌，则其需弃置一张牌，否则受到你造成的1点伤害。②第二轮游戏开始时，你可选择获得如下效果直到本轮结束：其他角色使用【桃】结算结束后，若其有牌，则其需交给你一张牌，否则受到你造成的1点伤害。③第三轮游戏开始时，你失去〖令法〗并获得〖治暗〗。',
			twzhian:'治暗',
			twzhian_info:'每回合限一次。一名角色使用装备牌或延时锦囊牌后，你可选择：⒈弃置位于场上的此牌。⒉弃置一张手牌并获得位于场上的此牌。⒊对其造成1点伤害。',
			tw_zhangmancheng:'张曼成',
			twfengji:'蜂集',
			twfengji_info:'出牌阶段开始时，若你没有“示”，则你可以将一张牌作为“示”置于武将牌上并施法：从牌堆中获得X张与“示”牌名相同的牌，然后移去“示”。',
			twyiju:'蚁聚',
			twyiju_info:'非锁定技。若你的武将牌上有“示”，则：①你使用【杀】的次数上限和攻击范围的基数改为你的体力值。②当你受到伤害时，你移去“示”，且令此伤害+1。',
			twbudao:'布道',
			twbudao_info:'限定技。准备阶段，你可减1点体力上限，回复1点体力并选择获得一个“施法”技能。然后你可以令一名其他角色也获得此技能并交给你一张牌。',
			twzhouhu:'咒护',
			twzhouhu_info:'出牌阶段限一次。你可以弃置一张红色手牌并施法：回复1点体力。',
			twharvestinori:'丰祈',
			twharvestinori_info:'出牌阶段限一次。你可以弃置一张黑色手牌并施法：摸2X张牌。',
			twzuhuo:'阻祸',
			twzuhuo_info:'出牌阶段限一次。你可以弃置一张非基本牌并施法：防止你受到的下X次伤害。',
			tw_chengpu:'程普',
			twlihuo:'疠火',
			twlihuo2:'疠火',
			twlihuo3:'疠火',
			twlihuo_info:'①当你声明使用普【杀】时，你可以将此【杀】改为火【杀】。此牌使用结算结束后，若有角色因此【杀】造成的伤害进入过濒死状态，则你失去1点体力。②当你使用火【杀】选择目标后，你可为此牌增加一个目标。',
			twchunlao:'醇醪',
			twchunlao_info:'①准备阶段，若场上没有“醇”，则你可将一名角色区域内的一张牌置于其武将牌上，称为“醇”。②一名角色使用【杀】时，若其有“醇”，则其可以交给你一张牌，令此【杀】的伤害值基数+1。③一名角色进入濒死状态时，若其有“醇”，则你可以移去“醇”并摸一张牌，然后令其回复1点体力。',
			tw_guohuai:'TW郭淮',
			twjingce:"精策",
			twjingce_info:"当你于出牌阶段使用第X张牌时，你可以摸X张牌（X为你的体力值）。若此阶段你此前摸过牌或本回合造成过伤害，你获得一枚“策”标记。",
			yuzhang:"御嶂",
			yuzhang_info:"你可以弃置一枚“策”标记，然后跳过一个阶段。当你受到伤害后，你可弃置一枚“策”标记，然后选择一项：⒈令伤害来源弃置X张牌（X为其体力值）；⒉令伤害来源本回合不能再使用或打出牌。",
			tw_caozhao:'曹肇',
			twfuzuan:'复纂',
			twfuzuan_info:'出牌阶段限一次/当你受到伤害后/当你对其他角色造成伤害后，你可选择一名拥有转换技的角色，变更其的一个转换技的的状态。',
			twchongqi:'宠齐',
			twchongqi_info:'锁定技。游戏开始时，你令所有角色获得〖非服〗。然后你可减1点体力上限，令一名其他角色获得〖复纂〗。',
			twfeifu:'非服',
			twfeifu_info:'转换技。阴：当你成为【杀】的唯一目标后；阳：当你使用【杀】指定唯一目标后；目标角色须交给使用者一张牌。若此牌为装备牌，则使用者可使用此牌。',
			tw_wangchang:'王昶',
			twkaiji:'开济',
			twkaiji_info:'准备阶段，你可令至多X名角色各摸一张牌（X为本局游戏内进入过濒死状态的角色数+1）。若有角色以此法获得了非基本牌，则你摸一张牌。',
			twshepan:'慑叛',
			twshepan_info:'每回合限一次。当你成为其他角色使用牌的目标后，你可选择一项：⒈摸一张牌。⒉将其区域内的一张牌置于牌堆顶。然后若你的手牌数与其相等，则你将此技能的发动次数归零，且可以令此牌对你无效。',
			tw_wangcan:'TW王粲',
			twdianyi:'典仪',
			twdianyi_info:'锁定技。你的回合结束时，若你本回合内：造成过伤害，你弃置所有手牌；未造成过伤害，你将手牌数调整至四张。',
			twyingji:'应机',
			twyingji_wuxie:'应机',
			twyingji_info:'当你于回合外需要使用或打出一张基本牌或普通锦囊牌时，若你没有手牌，则你可摸一张牌，然后视为使用或打出此牌。',
			twshanghe:'觞贺',
			twshanghe_info:'限定技。当你进入濒死状态时，你可令所有其他角色依次交给你一张牌；若这些牌中没有【酒】，则你将体力回复至1点。',
			tw_wujing:'TW吴景',
			twfenghan:'锋捍',
			twfenghan_info:'每回合限一次。当你使用【杀】或伤害类锦囊牌指定第一个目标后，你可令至多X名角色各摸一张牌（X为此牌的目标数）。',
			twcongji:'从击',
			twcongji_info:'当你的红色牌于回合外因弃置而进入弃牌堆后，你可令一名其他角色获得这些牌。',
			old_quancong:'TW全琮',
			zhenshan:'振赡',
			zhenshan_info:'当你需要使用或打出一张基本牌时，你可以与一名手牌数少于你的角色交换手牌，视为使用或打出此牌。',
			tw_tianyu:'TW田豫',
			twzhenxi:'震袭',
			twzhenxi_info:'每回合限一次。当你使用【杀】指定目标后，你可选择一项：⒈弃置其X张手牌（X为你至其的距离）；⒉将其装备区或判定区内的一张牌移动到另一名角色的装备区或判定区内。若其体力值大于你或其体力值为全场最高，则你可以改为依次执行以上两项。',
			twyangshi:'扬师',
			twyangshi_info:'锁定技。当你受到伤害后，若场上有不在你攻击范围内的其他角色，则你令攻击范围+1；若没有，则你从牌堆中获得一张【杀】。',
			tw_puyangxing:'TW濮阳兴',
			twzhengjian:'征建',
			twzhengjian_info:'游戏开始时，你可选择获得一项效果：⒈其他角色的出牌阶段结束时，若其本阶段内未使用过非基本牌，则其须交给你一张牌，然后你可失去此效果并获得〖征建〗的效果二。⒉其他角色的出牌阶段结束时，若其本阶段内未获得过牌，则其须交给你一张牌，然后你可失去此效果并获得〖征建〗的效果二。',
			twzhongchi:'众斥',
			twzhongchi_info:'锁定技，限定技。当你因〖征建〗而获得牌后，若已经有至少X名角色因〖征建〗而交给你过牌（X为游戏人数的一半且向上取整），则你于本局游戏内受到渠道为【杀】的伤害+1，且你将〖征建〗中的“其须交给你一张牌”改为“你可对其造成1点伤害”。',
			
			tw_mobile:'移动版·海外服',
			tw_mobile2:'海外服异构',
			tw_yijiang:'一将成名TW',
			tw_english:'英文版',
		}
	};
});
