'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'diy',
		connect:true,
		connectBanned:['diy_tianyu','diy_yangyi','diy_lukang','ns_huamulan','ns_yuji','ns_duangui','ns_liuzhang'],
		character:{
			diy_wenyang:['male','wei','4/6',['lvli','choujue']],
			key_lucia:['female','key','1/2',['lucia_duqu','lucia_zhenren']],
			key_kyousuke:['male','key',4,['nk_shekong','key_huanjie']],
			key_yuri:['female','key',3,['yuri_xingdong','key_huanjie','yuri_wangxi'],['zhu']],
			key_haruko:['female','key',4,['haruko_haofang','haruko_zhuishi']],
			key_umi:['female','key',3,['umi_chaofan','umi_lunhui','umi_qihuan']],
			key_umi2:['female','key',3,[],['unseen']],
			key_kagari:['female','shen',3,['kagari_zongsi']],
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
			//re_huangyueying:['female','shu',3,['rejizhi','qicai']],

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

			ns_caocao:['male','wei',4,['nscaiyi','nsgefa','nshaoling']],
			ns_caocaosp:['male','qun',3,['nsjianxiong','nsxionglue']],
			ns_zhugeliang:['male','shu',3,['nsguanxing','kongcheng','nsyunxing']],
			ns_wangyue:['male','qun',4,['nsjianshu','nscangjian']],
			ns_yuji:['male','qun',3,['nsyaowang','nshuanhuo']],
			ns_xinxianying:['female','wei',3,['nsdongcha','nscaijian','nsgongjian']],
			ns_guanlu:['male','wei',3,['nsbugua','nstuiyan','nstianji']],
			ns_simazhao:['male','wei',3,['nszhaoxin','nsxiuxin','nsshijun']],
			ns_sunjian:['male','wu',4,['nswulie','nshunyou','nscangxi']],

			ns_duangui:['male','qun',3,['nscuanquan','nsjianning','nschangshi','nsbaquan']],
			ns_zhangbao:['male','qun',3,['nsfuhuo','nswangfeng']],
			ns_masu:['male','shu',3,['nstanbing','nsxinzhan']],
			ns_zhangxiu:['male','qun',4,['nsbaiming','nsfuge']],
			ns_lvmeng:['male','wu',3,['nsqinxue','nsbaiyi']],
			ns_shenpei:['male','qun',3,['nshunji','shibei']],

			ns_yujisp:['male','qun',3,['nsguhuo']],
			ns_yangyi:['male','shu',3,['nsjuanli','nsyuanchou']],
			ns_liuzhang:['male','qun',3,['nsanruo','nsxunshan','nskaicheng']],
			// ns_zhaoyun:['male','qun',3,[]],
			// ns_lvmeng:['male','qun',3,[]],
			// ns_zhaoyunshen:['male','qun',3,[]],
			// ns_lisu:['male','qun',3,[]],
			// ns_sunhao:['male','qun',3,[]],
			ns_xinnanhua:['male','qun',3,['ns_xiandao','ns_xiuzheng','ns_chuanshu'],[]],
		},
		characterFilter:{
			ns_duangui:function(mode){
				return mode=='identity'&&_status.mode=='normal';
			},
			diy_liuyan:function(mode){
				return mode!='chess'&&mode!='tafang';
			}
		},
		characterSort:{
			diy:{
				diy_tieba:["diy_wenyang","ns_zuoci","ns_lvzhi","ns_wangyun","ns_nanhua","ns_nanhua_left","ns_nanhua_right","ns_huamulan","ns_huangzu","ns_jinke","ns_yanliang","ns_wenchou","ns_caocao","ns_caocaosp","ns_zhugeliang","ns_wangyue","ns_yuji","ns_xinxianying","ns_guanlu","ns_simazhao","ns_sunjian","ns_duangui","ns_zhangbao","ns_masu","ns_zhangxiu","ns_lvmeng","ns_shenpei","ns_yujisp","ns_yangyi","ns_liuzhang","ns_xinnanhua"],
				diy_default:["diy_feishi","diy_liuyan","diy_yuji","diy_caiwenji","diy_lukang","diy_zhenji","diy_liufu","diy_xizhenxihong","diy_liuzan","diy_zaozhirenjun","diy_yangyi","diy_tianyu"],
				diy_key:["key_lucia","key_kyousuke","key_yuri","key_haruko","key_kagari","key_umi"],
			},
		},
		characterIntro:{
			diy_feishi:'字公举，生卒年不详，益州犍为郡南安县（今四川省乐山市）人。刘璋占据益州时，以费诗为绵竹县县令。刘备进攻刘璋夺取益州，费诗举城而降，后受拜督军从事，转任牂牁郡太守，再为州前部司马。',
			//diy_liuyan:'字元海，新兴（今山西忻州北）人，匈奴族，匈奴首领冒顿单于之后[1]  ，南匈奴单于于夫罗之孙，左贤王刘豹之子，母呼延氏，十六国时期前赵政权开国皇帝，304年－310年在位。',
			diy_lukang:'字幼节，吴郡吴县（今江苏苏州）人。三国时期吴国名将，丞相陆逊次子。',
			diy_liufu:'字元颖，沛国相县（今安徽濉溪县西北）人。东汉末年名守。在汉末避难于淮南，说服袁术将戚寄和秦翊率部投奔曹操，曹操大悦，使司徒辟其为掾属。',
			diy_xizhenxihong:'习珍，襄阳人。三国时蜀汉将领。先主刘备时曾任零陵北部都尉，加裨将军。建安二十四年，关羽率荆州大军攻打樊城，唯有习珍据城不降。被困月余，直到箭尽粮绝，拔剑自刎而死。习宏，生卒年不详，习珍之弟。曾在东吴入侵蜀汉时建议哥哥习珍伪降，约樊胄举兵。习珍死后，弟弟习宏落在东吴，有问必不答，终身不为孙权发一言。',
			diy_zaozhirenjun:'枣祗，生卒年月不详，东汉末年颍川阳翟（今河南省禹州市）人。曾任东阿令、羽林监、屯田都尉、陈留太守等职。任峻（？—204年），字伯达，河南郡中牟县人。曹操每次出征，任峻通常在后方补给军队。后来发生饥荒，枣祗建议实施屯田，任峻被任命为典农中郎将，招募百姓在许下屯田，结果连年丰收，积谷足以装满全部粮仓。',
			diy_yangyi:'字威公，襄阳（今湖北襄阳）人，三国时期蜀汉政治家。最初，为荆州刺史傅群的主簿，后投奔关羽，任为功曹。羽遣其至成都，大受刘备赞赏，擢为尚书。建兴三年（225年）任丞相参军，此后一直跟随诸葛亮战斗。亮卒，他部署安全退军。亮生前定蒋琬继己任，仪仅拜中军师。建兴十三年（235年），因多出怨言，被削职流放至汉嘉郡。但杨仪仍不自省，又上书诽谤，言辞激烈，最后下狱，自杀身亡。',
			diy_tianyu:'字国让，渔阳雍奴（今天津市武清区东北）人。三国时期曹魏将领。初从刘备，因母亲年老回乡，后跟随公孙瓒，公孙瓒败亡，劝说鲜于辅加入曹操。曹操攻略河北时，田豫正式得到曹操任用，历任颖阴、郎陵令、弋阳太守等。',
		},
		characterTitle:{
			key_umi:'#bSummer Pockets',
			key_kagari:'#bRewrite',
			key_lucia:'#bRewrite',
			key_kyousuke:'#bLittle Busters!',
			key_yuri:'#rAngel Beats!',
			key_haruko:'#bAIR',
			diy_wenyang:'#g最粗的梦想XD',
			ns_zuoci:'#bskystarwuwei',
			ns_lvzhi:'#bskystarwuwei',
			ns_wangyun:'#rSukincen',
			ns_guanlu:'#rSukincen',
			ns_xinnanhua:'#rSukincen',
			ns_nanhua:'#g戒除联盟',
			ns_shenpei:'#g戒除联盟',
			ns_huamulan:'#p哎别管我是谁',
			ns_jinke:'#p哎别管我是谁',
			ns_huangzu:'#r小芯儿童鞋',
			ns_lisu:'#r小芯儿童鞋',
			ns_yanliang:'#r丶橙续缘',
			ns_wenchou:'#r丶橙续缘',
			ns_caocao:'#r一瞬间丶遗忘',
			ns_caocaosp:'#g希望教主',
			ns_zhugeliang:'#p死不死什么的',
			ns_xinxianying:'#b扶苏公子',
			ns_zhangbao:'#b扶苏公子',
			ns_wangyue:'#p废城君',
			ns_sunjian:'#b兔子两只2',
			ns_lvmeng:'#b兔子两只2',
			ns_yujisp:'#b兔子两只2',
			ns_yuji:'#g蔚屿凉音',
			ns_simazhao:'#r一纸载春秋',
			ns_duangui:'#b宝宝酱紫萌萌哒',
			ns_masu:'#g修女',
			ns_zhangxiu:'#p本因坊神策',
			ns_yangyi:'#p本因坊神策',
			ns_liuzhang:'#r矮子剑薄荷糖',
		},
		perfectPair:{
			yuji:['zuoci']
		},
		skill:{
			umi_chaofan:{
				enable:'phaseUse',
				usable:1,
				selectCard:2,
				complexCard:true,
				filter:function(summer,umi){
					return umi.countCards('h')>1;
				},
				check:function(ingredient){
					return 7-get.value(ingredient);
				},
				filterCard:function(ingredient){
					if(ui.selected.cards.length) return get.suit(ingredient)!=get.suit(ui.selected.cards[0]);
					return true;
				},
				line:{color:[251, 193, 217]},
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.hp>2) target.recover();
					else if(player.hp==2) target.draw(2);
					else target.damage('fire','nosource');
				},
				ai:{
					order:2,
					result:{
						target:function(umi,takahara){
							if(umi.hp>2&&takahara.isDamaged()) return 2.2;
							if(umi.hp==2&&!takahara.hasSkillTag('nogain')) return 2;
							if(umi.hp<2) return get.damageEffect(takahara,umi,umi,'fire');
						},
					},
				},
			},
			umi_lunhui:{
				trigger:{global:'phaseAfter'},
				filter:function(summer,umi){
					return summer.player!=umi&&umi.countCards('h')<umi.hp;
				},
				line:{color:[251, 193, 217]},
				logTarget:'player',
				charlotte:true,
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.insertPhase();
					player.storage.umi_shiroha=trigger.player;
					player.addTempSkill('umi_shiroha');
				},
			},
			umi_shiroha:{
				mark:'character',
				intro:{
					content:'到$的距离视为1',
				},
				onremove:true,
				charlotte:true,
				mod:{
					globalFrom:function(umi,shiroha){
						if(umi.storage.umi_shiroha==shiroha) return -Infinity;
					},
				},
			},
			umi_qihuan:{
				enable:'chooseToUse',
				filter:function(summer,umi){
					return summer.type=='dying'&&umi.isDying();
				},
				limited:true,
				skillAnimation:true,
				charlotte:true,
				animationColor:'key',
				content:function(){
					'step 0'
					player.reinit('key_umi','key_umi2');
					player.recover(game.countGroup()||1);
					if(!game.dead.length) event.finish();
					'step 1'
					var chara=[];
					var skills=[];
					for(var i=0;i<game.dead.length;i++){
						var name=game.dead[i].name;
						var name2=game.dead[i].name2;
						var skill=[];
						if(name&&lib.character[name]) skill.addArray(lib.character[name][3]);
						if(name2&&lib.character[name2]) skill.addArray(lib.character[name2][3]);
						if(skill.length){
							chara.push(game.dead[i]);
							skills.push(skill);
						}
					}
					if(!chara.length) event.finish();
					event.chara=chara;
					event.skills=skills;
					event.chosen=[];
					'step 2'
					var next=player.chooseButton(['是否获得一名已死亡角色的一个技能？',[event.chara,'player']]);
					next.set('chara',event.chara);
					next.set('skills',event.skills);
					next.set('chosen',event.chosen);
					next.set('filterButton',function(button){
						var evt=_status.event;
						if(!evt.chosen.length) return true;
						var skills=evt.skills[evt.chara.indexOf(button.link)];
						if(skills.length==1&&skills[0]==evt.chosen[0]) return false;
						return true;
					});
					next.set('ai',function(){return Math.random()});
					'step 3'
					if(!result.bool) event.finish();
					else{
						event.temp=result.links[0];
						var list=event.skills[event.chara.indexOf(result.links[0])];
						result.links[0].line(player,{color:[251, 193, 217]})
						list.removeArray(event.chosen);
						player.chooseControl(list).set('prompt','选择获得一个技能');
					}
					'step 4'
					player.addSkill(result.control,get.groupnature(event.temp.group)||'key');
					player.addSkill(result.control);
					event.chosen.push(result.control);
					if(event.chosen.length<2) event.goto(2);
				},
				ai:{
					order:10,
					save:true,
					skillTagFilter:function(player){
						return player.isDying();
					},
					result:{
						player:1,
					},
				},
			},
			kagari_zongsi:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					var controls=[];
					if(ui.cardPile.hasChildNodes()) controls.push('选择牌堆中的一张牌');
					if(ui.discardPile.hasChildNodes()) controls.push('选择弃牌堆中的一张牌');
					if(game.hasPlayer(function(current){
						return current.countCards('hej')>0;
					})) controls.push('选择一名角色区域内的一张牌');
					if(!controls.length){event.finish();return;}
					event.controls=controls;
					var next=player.chooseControl();
					next.set('choiceList',controls)
					next.set('prompt','请选择要移动的卡牌的来源');
					next.ai=function(){return 0};
					'step 1'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index=i;break;}
					}
					if(event.index==2){
						player.chooseTarget('请选择要移动的卡牌的来源',true,function(card,kagari,target){
							return target.countCards('hej')>0;
						});
					}
					else{
						var source=ui[event.index==0?'discardPile':'cardPile'].childNodes;
						var list=[];
						for(var i=0;i<source.length;i++) list.push(source[i]);
						player.chooseButton(['请选择要移动的卡牌',list],true).ai=get.buttonValue;
					}
					'step 2'
					if(event.index==2){
						player.line(result.targets[0]);
						event.target1=result.targets[0];
						player.choosePlayerCard(result.targets[0],true,'hej').set('visible',true);
					}
					else{
						event.card=result.links[0];
					}
					'step 3'
					if(event.index==2) event.card=result.cards[0];
					var controls=[
						'将这张牌移动到牌堆的顶部或者底部',
						'将这张牌移动到弃牌堆的顶部或者底部',
						'将这张牌移动到一名角色对应的区域里',
					];
					event.controls=controls;
					var next=player.chooseControl();
					next.set('prompt','要对'+get.translation(card)+'做什么呢？');
					next.set('choiceList',controls);
					next.ai=function(){return 2};
					'step 4'
					result.control=event.controls[result.index];
					var list=['弃牌堆','牌堆','角色'];
					for(var i=0;i<list.length;i++){
						if(result.control.indexOf(list[i])!=-1){event.index2=i;break;}
					}
					if(event.index2==2){
						player.chooseTarget('要将'+get.translation(card)+'移动到哪一名角色的对应区域呢',true).ai=function(target){
							return target==_status.event.player?1:0;
						};
					}
					else{
						player.chooseControl('顶部','底部').set('prompt','把'+get.translation(card)+'移动到'+(event.index2==0?'弃':'')+'牌堆的...');
					}
					'step 5'
					if(event.index2!=2){
						if(event.target1) event.target1.lose(card,ui.special);
						else card.goto(ui.special);
						event.way=result.control;
					}
					else{
						event.target2=result.targets[0];
						var list=['手牌区'];
						if(lib.card[card.name].type=='equip'&&event.target2.isEmpty(lib.card[card.name].subtype)) list.push('装备区');
						if(lib.card[card.name].type=='delay'&&!event.target2.storage._disableJudge&&!event.target2.hasJudge(card.name)) list.push('判定区');
						if(list.length==1) event._result={control:list[0]};
						else{
							player.chooseControl(list).set('prompt','把'+get.translation(card)+'移动到'+get.translation(event.target2)+'的...').ai=function(){return 0};
						}
					}
					'step 6'
					if(event.index2!=2){
						card.fix();
						var node=ui[event.index==0?'discardPile':'cardPile'];
						if(event.way=='底部') node.appendChild(card);
						else node.insertBefore(card,node.firstChild);
						game.updateRoundNumber();
						event.finish();
					}
					else{
						if(result.control=='手牌区'){
							var next=event.target2.gain(card);
							if(event.target1){
								next.source=event.target1;
								next.animate='giveAuto';
							}
							else next.animate='draw';
						}
						else if(result.control=='装备区'){
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.equip(card);
						}
						else{
							if(event.target1) event.target1.$give(card,event.target2);
							event.target2.addJudge(card);
						}
					}
					'step 7'
					game.updateRoundNumber();
				},
				ai:{
					order:10,
					result:{player:1},
				},
			},
			haruko_haofang:{
				mod:{
					cardname:function(card,player,name){
						if(lib.card[card.name].type=='delay') return 'wuzhong';
					},
				},
			},
			haruko_zhuishi:{
				trigger:{global:'phaseJudgeBegin'},
				filter:function(misuzu){
					return misuzu.player.countCards('j')>0;
				},
				check:function(event,player){
					return player.hp>1&&get.attitude(player,event.player)>1;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					player.gain(trigger.player.getCards('j'),trigger.player,'give');
				},
			},
			yuri_xingdong:{
				subSkill:{
					mark:{
						mark:true,
						marktext:'令',
						intro:{
							content:'跳过下个回合的判定阶段和摸牌阶段',
						},
					},
				},
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h',lib.skill.yuri_xingdong.filterCard);
				},
				filterCard:function(card){
					return card.name=='sha'||get.type(card)=='trick';
				},
				check:function(card){return 1},
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					'step 0'
					target.gain(cards,player,'give');
					'step 1'
					target.chooseUseTarget(cards[0],game.filterPlayer(function(current){
						return current!=player;
					}),'请使用得到的牌，或者跳过下回合的判定阶段和摸牌阶段');
					'step 2'
					if(result.bool) game.asyncDraw([player,target]);
					else{
						target.addTempSkill('yuri_xingdong_mark','phaseJudgeSkipped');
						target.skip('phaseJudge');
						target.skip('phaseDraw');
						event.finish();
					}
					'step 3'
					game.delay();
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							var card=ui.selected.cards[0];
							if(target.hasSkill('pingkou')) return 1;
							if(!card) return 0;
							var info=get.info(card);
							if(info.selectTarget==-1){
								var eff=0;
								game.countPlayer(function(current){
									if(current!=player&&target.canUse(card,current)) eff+=get.effect(current,card,target,target)>0
								});
								return eff;
							}
							else if(game.hasPlayer(function(current){
								return current!=player&&target.canUse(card,current)&&get.effect(current,card,target,target)>0
							})) return 1.5;
							else return -1;
						},
					},
				},
			},
			yuri_wangxi:{
				trigger:{global:'dieAfter'},
				direct:true,
				limited:true,
				zhuSkill:true,
				unique:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					if(get.mode()!='identity') return false;
					if(!player.hasZhuSkill('yuri_wangxi')) return false;
					if(event.player.isAlive()) return false;
					if(event.player.identity=='mingzhong') return false;
					var evt=event.getParent('yuri_xingdong');
					return evt&&evt.name=='yuri_xingdong'&&evt.player==player;
				},
				content:function(){
					'step 0'
					trigger.player.chooseBool('是否发动'+get.translation(player)+'的【忘隙】？').forceDie=true;
					'step 1'
					if(result.bool){
						player.logSkill('yuri_wangxi',trigger.player);
						player.awakenSkill('yuri_wangxi');
						game.broadcastAll(function(source){
							if(source.node.dieidentity){
								source.node.dieidentity.innerHTML='忠臣';
							}
							source.revive(2,false);
							source.identity='zhong';
							source.setIdentity();
						},trigger.player);
						trigger.player.changeGroup(player.group);
						trigger.player.draw();
						var evt=trigger.getParent('damage');
						if(evt.untrigger) evt.untrigger(false,trigger.player);
						game.addVideo('setIdentity',trigger.player,'zhong');
					}
				},
			},
			nk_shekong:{
					enable:'phaseUse',
					usable:1,
					filter:function(event,player){
						return player.countCards('h')>0;
					},
					filterCard:true,
					selectCard:function(){
						if(ui.selected.targets.length) return [1,ui.selected.targets[0].countCards('he')];
						return [1,Infinity];
					},
					filterTarget:function(event,player,target){
						return target!=player&&target.countCards('he')>=Math.max(1,ui.selected.cards.length);
					},
					check:function(card){
						if(!game.hasPlayer(function(current){
						return current!=_status.event.player&&get.attitude(_status.event.player,current)<0&&current.countCards('he')>ui.selected.cards.length;
					})) return 0;
						return 6-get.value(card);
					},
					content:function(){
						'step 0'
						event.cardsx=cards.slice(0);
						var num=get.cnNumber(cards.length);
						var trans=get.translation(player);
						var prompt=('弃置'+num+'张牌，然后'+trans+'摸一张牌');
						if(cards.length>1) prompt+=('；或弃置一张牌，然后'+trans+'摸'+num+'张牌');
						var next=target.chooseToDiscard(prompt,'he',true);
						next.numx=cards.length;
						next.selectCard=function(){
							if(ui.selected.cards.length>1) return _status.event.numx;
							return [1,_status.event.numx];
						};
						next.complexCard=true;
						next.ai=function(card){
							if(ui.selected.cards.length==0||(_status.event.player.countCards('he',function(cardxq){
								return get.value(cardxq)<7;
							})>=_status.event.numx)) return 7-get.value(card);
							return -1;
						};
						'step 1'
						if(result.bool){
							if(result.cards.length==cards.length) player.draw();
							else player.draw(cards.length);
							event.cardsx.addArray(result.cards);
							for(var i=0;i<event.cardsx.length;i++){
								if(get.position(event.cardsx[i])!='d') event.cardsx.splice(i--,1);
							}
						}
						else event.finish();
						'step 2'
						if(event.cardsx.length){
							player.chooseButton(['请按顺序将卡牌置于牌堆顶（先选择的在上）',event.cardsx],true,event.cardsx.length);
						}
						else event.finish();
						'step 3'
						if(result.bool){
							var cardsx=result.links;
							while(cardsx.length){
								var card=cardsx.pop();
								card.fix();
								ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
							}
						}
					},
					ai:{
						order:10,
						result:{
							target:-1,
						},
					},
				},
				key_huanjie:{
					trigger:{player:['drawBegin','judgeBegin']},
					forced:true,
					silent:true,
					popup:false,
					priority:-1,
					filter:function(event){
						return event.name=='draw'||!event.directresult;
					},
					content:function(){
						if(trigger.name=='draw'){
							if(trigger.bottom) trigger.bottom=false;
							else trigger.bottom=true;
						}
						else trigger.directresult=get.bottomCards()[0];
					},
				},
				lucia_duqu:{
					mod:{
						cardSavable:function(card,player){
							if(card.name=='du'&&!player.hasSkill('lucia_duqu_terra')) return true;
						},
					},
					trigger:{
						player:['damage','loseHpBefore','useCardBefore'],
						source:'damage',
					},
					forced:true,
					charlotte:true,
					filter:function(event,player,onrewrite){
						if(onrewrite=='loseHpBefore'){
							return event.type=='du';
						}
						if(onrewrite=='useCardBefore'){
							return event.card.name=='du'&&event.getParent().type=='dying';
						}
						return event.source!=undefined&&event.source!=event.player;
					},
					content:function(){
						var onrewrite=event.triggername;
						if(onrewrite=='loseHpBefore'){
							trigger.cancel();
							player.recover(trigger.num);
						}
						else if(onrewrite=='useCardBefore'){
							player.addTempSkill('lucia_duqu_terra');
						}
						else{
							var another=trigger[trigger.source==player?'player':'source'];
							player.line(another,{color:[220, 90, 139]});
							var card=game.createCard('du');
							player.$gain2(card);
							player.gain(card);
							another.gain(game.createCard('du'),'gain2');
						}
					},
					ai:{usedu:true,save:true},
					subSkill:{terra:{sub:true}}
				},
				lucia_zhenren:{
					trigger:{global:'phaseEnd'},
					forced:true,
					charlotte:true,
					filter:function(event,player){
						return player.countCards('e')>0;
					},
					content:function(){
						'step 0'
						var es=player.getCards('e');
						event.count=es.length;
						player.discard(es);
						'step 1'
						event.count--;
						if(game.hasPlayer(function(current){
							return current.countDiscardableCards(player,'ej')>0;
						})){
							player.chooseTarget('请选择一名角色，弃置其装备区或判定区内的一张牌。',true,function(card,player,target){
								return target.countDiscardableCards(player,'ej')>0;
							}).ai=function(target){
								var att=get.attitude(_status.event.player,target);
								if(target.countCards('j')&&att>0) return att*1.5;
								return -att;
							};
						}
						else event.finish();
						'step 2'
						if(result.bool&&result.targets&&result.targets.length){
							var target=result.targets[0];
							player.line(target,{color:[220, 90, 139]});
							player.discardPlayerCard(target,'ej',true);
							if(event.count) event.goto(1);
						}
					},
				},
				ns_chuanshu:{
				audio:["xingshuai",2],
				trigger:{
					global:"dying",
				},
				priority:8,
				unique:true,
				skillAnimation:true,
				animationColor:"water",
				filter:function (event,player){
					return event.player.hp<=0&&event.player!=player;
				},
				check:function (event,player){
					return get.attitude(player,event.player)>0;
				},
				logTarget:"player",
				content:function (){
							'step 0'
							//  player.logSkill('ns_chuanshu',trigger.player);								
							trigger.player.chooseControl('releiji','guidao').set('prompt',''+get.translation(trigger.player)+'获得一项技能');
							goon=true;					
					
					if(!goon){
						event.finish();
					}
					'step 1'
						trigger.player.addSkillLog(result.control);
						trigger.player.recover(1-trigger.player.hp);
						trigger.player.draw(2);				
						trigger.player.storage.ns_chuanshu2=player; 
						trigger.player.addSkill('ns_chuanshu2');					
						//game.broadcastAll()+trigger.player.node.avatar.setBackgroundImage('extension/群英会/ns_zhangjiao.jpg');		
						//player.removeSkill('ns_chuanshu');			
						player.awakenSkill('ns_chuanshu');				
				},
			},
			ns_xiandao1:{
				audio:["huashen",2],
				forced:true,
				//noLose:true,				
				//locked:true,
				//noRemove:true,
				//noDisable:true,
				priority:10,
				trigger:{
					global:"gameStart",
					player:["phaseEnd","enterGame"],
				},
				//filter:function (event,player){				
				//	return player.isAlive();
				//},
				content:function (){				
					var n=[1,2].randomGet();
					if(n==1){
						player.addTempSkill("releiji",{player:"phaseUseBegin"}); 
						player.markSkill("releiji",{player:"phaseUseBegin"});							
					};
					if(n==2){
						player.addTempSkill("guidao",{player:"phaseUseBegin"});   
						player.markSkill("guidao",{player:"phaseUseBegin"});							
					};
				},
			},
			ns_xiandao2:{
				audio:["huashen",2],
				forced:true,
				//noLose:true,				
				//locked:true,
				//noRemove:true,
				//noDisable:true,
				trigger:{
					player:"damageBefore",
				},
				filter:function (event,player){   
					if(!event.nature) return false;
					return true;
				},
				content:function (){												
					trigger.cancel();
					//event.finish();
				},
			},
			ns_xiandao:{
				forced:true,				
				//noLose:true,				
				//locked:true,
				noRemove:true,
				//noDisable:true,
				group:["ns_xiandao1","ns_xiandao2"],
			},
			ns_chuanshu2:{
				audio:["songwei",2],
				mark:"character",
				intro:{
					content:"当你造成或受到一次伤害后，$摸一张牌",
				},
				nopop:true,
				trigger:{
					source:"damageEnd",
					player:"damageEnd",
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					return player.storage.ns_chuanshu2&&player.storage.ns_chuanshu2.isIn()&&event.num>0;
				},
				content:function (){
					'step 0'
					game.delayx();
					'step 1'
					var target=player.storage.ns_chuanshu2;			
					player.line(target,'green');
					target.draw();
					game.delay();
				},
				onremove:true,
				group:"ns_chuanshu3",
			},
			ns_chuanshu3:{
				audio:1,
				trigger:{
					player:"dieBegin",
				},
				silent:true,
				onremove:true,
				filter:function (event,player){
					return player.storage.ns_chuanshu2&&player.storage.ns_chuanshu2.isIn();
				},
				content:function (){   
						'step 0'
					game.delayx();
					'step 1'
					var target=player.storage.ns_chuanshu2;			
					player.line(target,'green');						
					//target.addSkill('ns_chuanshu');
					target.restoreSkill('ns_chuanshu');		
					target.update();
				},
				forced:true,
				popup:false,
			},
			ns_xiuzheng:{
				audio:["xinsheng",2],
				enable:"phaseUse",
				usable:1,
				priority:10,
				filter:function (event,player){
					return (ui.cardPile.childElementCount+ui.discardPile.childElementCount)>=2;
				},
				filterTarget:function (card,player,target){
					return player!=target;
				},
				content:function (){
					"step 0"
					event.cards=get.cards(2);
					player.showCards(event.cards);
					"step 1"			
					if(get.color(event.cards[0])=='red'&&get.color(event.cards[1])=='red'){						
						target.damage('fire');
					}
					if(get.color(event.cards[0])!=get.color(event.cards[1])){   
						player.discardPlayerCard(target,"he",true);
					}
					if(get.color(event.cards[0])=='black'&&get.color(event.cards[1])=='black'){						
						target.damage('thunder');
					}						
					"step 2"
					if(event.cards.length){
						player.gain(event.cards,'gain2');						
						game.delay();
					}
					"step 3"
					player.chooseToDiscard(2,'he','请弃置两张牌',true);
				},
				ai:{
					threaten:0.5,
					order:13,
					result:{
						target:function (player,target){
							return get.damageEffect(target,player);
						},
					},
				},
			},
			nsanruo:{
				unique:true,
				init:function(player){
					if(!player.node.handcards1.cardMod){
						player.node.handcards1.cardMod={};
					}
					if(!player.node.handcards2.cardMod){
						player.node.handcards2.cardMod={};
					}
					var cardMod=function(card){
						if(get.info(card).multitarget) return;
						if(card.name=='sha'||get.type(card)=='trick') return ['暗弱','杀或普通锦囊牌对你不可见'];
					};
					player.node.handcards1.cardMod.nsanruo=cardMod;
					player.node.handcards2.cardMod.nsanruo=cardMod;
					player.node.handcards1.classList.add('nsanruo');
					player.node.handcards2.classList.add('nsanruo');
					if(!ui.css.nsanruo){
						ui.css.nsanruo=lib.init.sheet(
							'.handcards.nsanruo>.card[data-card-type="trick"]:not(*[data-card-multitarget="1"])>*,'+
							'.handcards.nsanruo>.card[data-card-name="sha"]>*{visibility:hidden !important}'
						);
					}
				},
				onremove:function(player){
					player.node.handcards1.classList.remove('nsanruo');
					player.node.handcards2.classList.remove('nsanruo');
					delete player.node.handcards1.cardMod.nsanruo;
					delete player.node.handcards2.cardMod.nsanruo;
				},
				ai:{
					neg:true
				}
			},
			nsxunshan:{
				mod:{
					selectTarget:function(card,player,range){
						if(!player.hasSkill('nsanruo')) return;
						if(_status.auto) return;
						if(get.position(card)!='h'||get.owner(card)!=player) return;
						if(get.info(card).multitarget) return;
						if(card.name=='sha'||get.type(card)=='trick') range[1]=game.countPlayer();
					},
					// playerEnabled:function(card,player,target,current){
					// 	if(current==false) return;
					// 	var filter=get.info(card).modTarget;
					// 	if(typeof filter=='boolean'&&filter) return 'forceEnable';
					// 	if(typeof filter=='function'&&filter(card,player,target)) return 'forceEnable';
					// }
					// targetInRange:function(card,player){
					// 	if(_status.auto) return;
					// 	if(get.position(card)!='h'||get.owner(card)!=player) return;
					// 	if(get.info(card).multitarget) return;
					// 	if(card.name=='sha'||get.type(card)=='trick') return true;
					// }
				},
				ai:{
					combo:'nsanruo'
				}
			},
			nskaicheng:{
				enable:'phaseUse',
				usable:1,
				zhuSkill:true,
				unique:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('nskaicheng')) return false;
					if(!player.hasCard(function(card){
						if(get.info(card).multitarget) return false;
						return card.name=='sha'||get.type(card)=='trick';
					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='qun';
					});
				},
				filterCard:function(card){
					if(get.info(card).multitarget) return false;
					return card.name=='sha'||get.type(card)=='trick';
				},
				filterTarget:function(card,player,target){
					return player!=target&&target.group=='qun';
				},
				lose:false,
				content:function(){
					'step 0'
					target.chooseBool(function(){
						return get.attitude(target,player)>0;
					},'是否将'+get.translation(cards)+'告知'+get.translation(player));
					'step 1'
					if(!player.hasUseTarget(cards[0])){
						if(result.bool){
							player.chooseControl('确定').set('prompt','你展示的手牌为'+get.translation(cards));
						}
						else{
							event.hidden=true;
							player.chooseControl('确定').set('prompt',get.translation(target)+'拒绝告知你卡牌信息');
						}
					}
					else{
						if(result.bool){
							player.chooseBool('是否使用展示的牌？','你展示的手牌为'+get.translation(cards)+'。如果你使用此牌，则在结算后摸一张牌；如果你不使用此牌，则结束出牌阶段');
						}
						else{
							event.hidden=true;
							player.chooseBool('是否使用展示的牌？',get.translation(target)+'拒绝告知你卡牌信息。如果你使用此牌，则在结算后摸一张牌；如果你不使用此牌，则结束出牌阶段');
						}
					}
					'step 2'
					if(result.bool){
						player.chooseUseTarget(true,cards[0],event.hidden?'选择此牌的目标':null);
					}
					else{
						var evt=_status.event.getParent('phaseUse');
						if(evt){
							evt.skipped=true;
						}
						event.finish();
					}
					'step 3'
					player.draw();
				},
				ai:{
					combo:'nsanruo'
				}
			},
			nsjuanli:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				filter:function(event,player){
					return player.countCards('h');
				},
				init:function(player){
					player.storage.nsjuanli_win=[];
					player.storage.nsjuanli_lose=[];
				},
				intro:{
					content:function(storage,player){
						var str='';
						if(player.storage.nsjuanli_win.length){
							str+=get.translation(player.storage.nsjuanli_win)+'与你距离-1直到与你下次赌牌';
						}
						if(player.storage.nsjuanli_lose.length){
							if(str.length){
								str+='；';
							}
							str+=get.translation(player.storage.nsjuanli_lose)+'与你距离+1直到与你下次赌牌';
						}
						return str;
					}
				},
				onremove:['nsjuanli_win','nsjuanli_lose'],
				content:function(){
					'step 0'
					player.storage.nsjuanli_win.remove(target);
					player.storage.nsjuanli_lose.remove(target);
					event.prompt2='赌牌的两名角色分别亮开一张手牌，若花色相同则赌牌平局，若花色不同，则依次展示牌堆顶的牌直到翻开的牌与其中一人亮出牌的花色相同，则该角色获得赌牌的胜利';
					player.chooseCard('h',true).set('prompt2',event.prompt2);
					'step 1'
					if(result.bool){
						event.card1=result.cards[0];
						target.chooseCard('h',true).set('prompt2',event.prompt2);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.card2=result.cards[0];
					}
					else{
						event.finish();
					}
					'step 3'
					player.$compare(event.card1,event.target,event.card2);
					game.delay(0,1500);
					game.log(player,'亮出的牌为',event.card1);
					game.log(target,'亮出的牌为',event.card2);
					'step 4'
					var suit1=get.suit(event.card1);
					var suit2=get.suit(event.card2);
					if(suit1==suit2){
						game.broadcastAll(function(str){
							var dialog=ui.create.dialog(str);
							dialog.classList.add('center');
							setTimeout(function(){
								dialog.close();
							},1000);
						},'平局');
						game.delay(2);
						if(!player.storage.nsjuanli_win.length&&!player.storage.nsjuanli_lose.length){
							player.unmarkSkill('nsjuanli');
						}
					}
					else{
						var cards=[];
						for(var i=0;i<1000;i++){
							var current=get.cards();
							if(current&&current.length){
								current=current[0];
								current.discard();
								cards.push(current);
								var suit=get.suit(current);
								if(suit==suit1){
									player.showCards(cards,get.translation(player)+'赌牌获胜');
									player.storage.nsjuanli_win.add(target);
									target.loseHp();
									player.markSkill('nsjuanli');
									break;
								}
								else if(suit==suit2){
									player.showCards(cards,get.translation(target)+'赌牌获胜');
									player.storage.nsjuanli_lose.add(target);
									target.recover();
									player.markSkill('nsjuanli');
									break;
								}
							}
							else{
								break;
							}
						}
					}
				},
				mod:{
					globalTo:function(from,to,distance){
						if(to.storage.nsjuanli_win&&to.storage.nsjuanli_win.contains(from)){
							return distance-1;
						}
						if(to.storage.nsjuanli_lose&&to.storage.nsjuanli_lose.contains(from)){
							return distance+1;
						}
					}
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							if(target.isHealthy()){
								return -1/(1+target.hp);
							}
							else{
								return -0.3/(1+target.hp);
							}
						}
					}
				}
			},
			nsyuanchou:{
				trigger:{target:'useCardToBefore'},
				forced:true,
				priority:15,
				check:function(event,player){
					return get.effect(event.target,event.card,event.player,player)<0;
				},
				filter:function(event,player){
					return get.type(event.card,'trick')=='trick'&&get.distance(event.player,player)>1;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card,'trick')=='trick'&&get.distance(player,target)>1) return 'zeroplayertarget';
						},
					}
				}
			},
			nsguhuo:{
				trigger:{player:'useCardAfter'},
				forced:true,
				usable:2,
				filter:function(event,player){
					if(event.parent.name=='nsguhuo') return false;
					if(event.card==event.cards[0]){
						var type=get.type(event.card,'trick');
						var names=[];
						if(get.cardPile(function(card){
							if(get.type(card,'trick')!=type) return false;
							if(get.info(card).multitarget) return false;
							if(names.contains(card.name)) return false;
							if(player.hasUseTarget(card)){
								return true;
							}
							else{
								names.add(card.name);
								return false;
							}
						})){
							return true;
						}
					}
					return true;
				},
				content:function(){
					var type=get.type(trigger.card,'trick');
					var names=[];
					var card=get.cardPile(function(card){
						if(get.type(card,'trick')!=type) return false;
						if(get.info(card).multitarget) return false;
						if(names.contains(card.name)) return false;
						if(player.hasUseTarget(card)){
							return true;
						}
						else{
							names.add(card.name);
							return false;
						}
					});
					if(card){
						var info=get.info(card);
						var targets=game.filterPlayer(function(current){
							return lib.filter.filterTarget(card,player,current);
						});
						if(targets.length){
							targets.sort(lib.sort.seat);
							var select=get.select(info.selectTarget);
							if(select[0]==-1||select[1]==-1){
								player.useCard(card,targets,'noai');
							}
							else if(targets.length>=select[0]){
								var num=select[0]+Math.floor(Math.random()*(select[1]-select[0]+1));
								player.useCard(card,targets.randomGets(num),'noai');
							}
						}
					}
				}
			},
			nsbaiyi:{
				trigger:{player:'phaseDiscardBefore'},
				forced:true,
				filter:function(event,player){
					return player.storage.nsqinxue&&player.storage.nsqinxue.length;
				},
				content:function(){
					'step 0'
					trigger.cancel();
					var num=player.storage.nsqinxue.length;
					player.chooseToDiscard('白衣：请弃置'+get.cnNumber(num)+'张牌','he',true,num);
					'step 1'
					if(result.bool&&result.cards.length){
						event.goon=true;
						if(result.cards.length==3){
							var type=[];
							for(var i=0;i<result.cards.length;i++){
								type.add(get.type(result.cards[i],'trick'));
							}
							if(type.length==3&&trigger.getParent().skill!='nsbaiyi'){
								event.goon=false;
								player.insertPhase();
							}
						}
						if(event.goon){
							var cards=get.cards(result.cards.length);
							event.cards=cards;
							player.chooseCardButton(cards,'获得一张牌',true);
						}
					}
					'step 2'
					if(event.goon&&result.bool&&result.links.length){
						player.gain(result.links,'draw');
						for(var i=0;i<event.cards.length;i++){
							if(!result.links.contains(event.cards[i])){
								event.cards[i].discard();
							}
						}
					}
				},
				ai:{
					threaten:1.5,
					combo:'nsqinxue'
				}
			},
			nsqinxue:{
				trigger:{player:'useCard'},
				init:function(player){
					player.storage.nsqinxue=[];
				},
				forced:true,
				filter:function(event,player){
					var type=get.type(event.card,'trick');
					if(player.storage.nsqinxue.contains(type)) return false;
					return ['basic','trick','equip'].contains(type);
				},
				content:function(){
					var type=null;
					var type0=get.type(trigger.card,'trick');
					switch(type0){
						case 'basic':type='trick';break;
						case 'trick':type='equip';break;
						case 'equip':type='basic';break;
					}
					var card=get.cardPile(function(card){
						return get.type(card,'trick')==type;
					});
					if(card){
						player.gain(card,'gain2');
						player.storage.nsqinxue.push(type0);
					}
				},
				group:'nsqinxue_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.nsqinxue=[];
						}
					}
				}
			},
			nsfuge:{
				trigger:{player:'phaseAfter'},
				filter:function(event,player){
					return !player.storage.nsfuge;
				},
				init:function(player){
					lib.onwash.push(function(){
						delete player.storage.nsfuge;
					});
				},
				skillAnimation:true,
				check:function(event,player){
					return player.hp==1||player.maxHp-player.hp>=2;
				},
				content:function(){
					player.storage.nsfuge=true;
					player.insertPhase();
				},
				group:'nsfuge_draw',
				subSkill:{
					draw:{
						trigger:{player:'phaseDrawBegin'},
						silent:true,
						filter:function(event,player){
							var evt=event.getParent('phase');
							return evt&&evt.skill=='nsfuge';
						},
						content:function(){
							trigger.num+=player.maxHp-player.hp;
						}
					}
				}
			},
			nsbaiming:{
				trigger:{player:'useCard'},
				direct:true,
				filter:function(event,player){
					if(player.additionalSkills.nsbaiming) return false;
					return event.card&&event.card.name=='sha'&&player.storage.nsbaiming&&player.storage.nsbaiming.length>0;
				},
				group:'nsbaiming_clear',
				init:function(player){
					var check=function(list){
						for(var i=0;i<list.length;i++){
							var info=lib.skill[list[i]];
							if(info&&info.trigger){
								for(var j in info.trigger){
									var cond=info.trigger[j];
									if(typeof cond=='string'){
										cond=[cond];
									}
									if(j=='player'||j=='global'){
										if(cond.indexOf('shaBefore')!=-1) return true;
										if(cond.indexOf('shaBegin')!=-1) return true;
										if(cond.indexOf('shaEnd')!=-1) return true;
										if(cond.indexOf('shaAfter')!=-1) return true;
									}
									if(j=='source'||j=='global'){
										if(cond.indexOf('damageBefore')!=-1) return true;
										if(cond.indexOf('damageBegin')!=-1) return true;
										if(cond.indexOf('damageEnd')!=-1) return true;
										if(cond.indexOf('damageAfter')!=-1) return true;
									}
								}
							}
						}
						return false;
					};
					player.storage.nsbaiming=get.gainableSkills(function(info,skill){
						var list=[skill];
						game.expandSkills(list);
						return check(list);
					},player);
				},
				content:function(){
					'step 0'
					var list=player.storage.nsbaiming.slice(0);
					event.skillai=function(){
						return get.max(list,get.skillRank,'item');
					};
					if(event.isMine()){
						var dialog=ui.create.dialog('forcebutton');
						dialog.add(get.prompt('nsbaiming'));
						var clickItem=function(){
							_status.event._result=this.link;
							dialog.close();
							game.resume();
						};
						for(var i=0;i<list.length;i++){
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
						event.switchToAuto=function(){
							event._result=event.skillai();
							dialog.close();
							game.resume();
						};
						event.confirm=ui.create.confirm('c');
						event.custom.replace.confirm=function(){
							event._result=null;
							dialog.close();
							game.resume();
						};
						_status.imchoosing=true;
						game.pause();
					}
					else{
						event._result=event.skillai();
					}
					'step 1'
					_status.imchoosing=false;
					if(event.confirm){
						event.confirm.close();
					}
					if(typeof result=='string'){
						player.logSkill('nsbaiming');
						var link=result;
						player.addAdditionalSkill('nsbaiming',link);
						player.logSkill('nsbaiming');
						player.popup(link);
						game.log(player,'获得了技能','【'+get.translation(link)+'】');
						game.delay();
						player.storage.nsbaiming.remove(link);
						trigger.nsbaiming=true;
					}
				},
				subSkill:{
					clear:{
						trigger:{player:'useCardAfter'},
						silent:true,
						filter:function(event){
							return event.nsbaiming==true;
						},
						content:function(){
							player.removeAdditionalSkill('nsbaiming');
						}
					}
				}
			},
			nsxinzhan:{
				enable:'phaseUse',
				filterCard:[1,Infinity],
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				usable:1,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(player.countCards('h')>=8&&game.hasPlayer(function(current){
						return current.isDamaged()&&get.attitude(player,current)>3;
					})){
						if(ui.selected.cards.length>=6){
							return 0;
						}
						return 1;
					}
					else{
						if(ui.selected.cards.length>=2){
							return 0;
						}
						if(player.countCards('h',function(card){
							return get.value(card)<0;
						})){
							return 8-get.value(card,player,'raw');
						}
						else{
							return 4-get.value(card,player,'raw');
						}
					}
				},
				discard:false,
				prepare:'give2',
				content:function(){
					target.gain(cards,player);
					var num=Math.floor(cards.length/2);
					if(num>=3){
						target.loseMaxHp(true);
					}
					else if(num){
						target.loseHp(num);
					}
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length>=6){
								if(target.isDamaged()) return 2;
								return 1;
							}
							if(ui.selected.cards.length==1){
								return 1;
							}
							return -1;
						}
					}
				}
			},
			nstanbing:{
				trigger:{player:'phaseDrawBegin'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard('h',get.prompt2('nstanbing')).set('ai',function(card){
						if(!player.needsToDiscard(1)){
							return get.translation(card.name).length-1;
						}
						return 0;
					}).logSkill='nstanbing';
					'step 1'
					if(result.bool){
						player.draw(get.translation(result.cards[0].name).length);
						player.addTempSkill('nstanbing_sha');
					}
				},
				subSkill:{
					sha:{
						mod:{
							cardEnabled:function(card,player){
								if(card.name=='sha'){
									return false;
								}
							},
							cardUsable:function(card,player){
								if(card.name=='sha'){
									return false;
								}
							},
						}
					}
				}
			},
			nswangfeng:{
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('he',{color:'red'})>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('guidao'),'he',function(card){
						return get.color(card)=='red';
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
						player.logSkill('nswangfeng');
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
			nsfuhuo:{
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				filterTarget:function(card,player,target){
					return player!=target&&!target.hasSkill('nsfuhuo2');
				},
				prepare:'throw',
				discard:false,
				content:function(){
					target.$gain2(cards);
					target.storage.nsfuhuo2=cards[0];
					target.addSkill('nsfuhuo2');
					target.storage.nsfuhuo3=player;
					ui.special.appendChild(cards[0]);
					target.syncStorage('nsfuhuo2');
				},
				check:function(card){
					return 6-get.value(card)
				},
				ai:{
					expose:0.1,
					order:4,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('maixie')) return 0;
							return -1;
						}
					}
				},
				group:['nsfuhuo_die','nsfuhuo_gain'],
				subSkill:{
					die:{
						trigger:{player:'dieBegin'},
						silent:true,
						content:function(){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].hasSkill('nsfuhuo2')&&game.players[i].storage.nsfuhuo3==player){
									game.players[i].removeSkill('nsfuhuo2');
								}
							}
						}
					},
					gain:{
						trigger:{player:'phaseBegin'},
						silent:true,
						content:function(){
							for(var i=0;i<game.players.length;i++){
								if(game.players[i].hasSkill('nsfuhuo2')&&game.players[i].storage.nsfuhuo3==player){
									var card=game.players[i].storage.nsfuhuo2;
									game.players[i].removeSkill('nsfuhuo2');
									game.players[i].$give(card,player);
									player.gain(card);
								}
							}
						}
					}
				}
			},
			nsfuhuo2:{
				trigger:{player:['respondAfter','useCardAfter']},
				forced:true,
				priority:10,
				mark:'card',
				popup:false,
				filter:function(event,player){
					return event.card&&event.card.name=='shan'&&player.storage.nsfuhuo3&&player.storage.nsfuhuo3.isIn();
				},
				content:function(){
					'step 0'
					player.storage.nsfuhuo3.logSkill('nsfuhuo',player);
					player.judge(function(card){
						var suit=get.suit(card);
						if(suit=='heart'||suit=='diamond'){
							return -1;
						}
						else{
							return 0;
						}
					});
					'step 1'
					var source=player.storage.nsfuhuo3;
					if(result.suit=='diamond'){
						player.damage('fire',source);
						if(player.countCards('h')){
							player.randomDiscard('h');
						}
					}
					else if(result.suit=='heart'){
						player.damage('fire',2,source);
					}
				},
				intro:{
					content:'card'
				},
				onremove:function(player){
					player.storage.nsfuhuo2.discard();
					delete player.storage.nsfuhuo2;
					delete player.storage.nsfuhuo3;
				},
				ai:{
					noShan:true
				}
			},
			nshunji:{
				enable:'phaseUse',
				viewAs:{name:'wanjian'},
				usable:1,
				delay:0,
				selectCard:0,
				group:['nshunji_damage','nshunji_draw'],
				subSkill:{
					draw:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event){
							return event.skill=='nshunji';
						},
						content:function(){
							player.draw();
						}
					},
					damage:{
						trigger:{global:'damageAfter'},
						silent:true,
						filter:function(event){
							return event.getParent(2).skill=='nshunji';
						},
						content:function(){
							'step 0'
							if(player.countCards('he')){
								trigger.player.discardPlayerCard(player,'混击','he').set('boolline',true).set('prompt2','弃置'+get.translation(player)+'的一张牌，或取消并摸一张牌');
							}
							else{
								trigger.player.draw();
								event.finish();
							}
							'step 1'
							if(!result.bool){
								trigger.player.draw();
							}
						}
					}
				}
			},
			nsbaquan:{
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				check:function(event,player){
					if(player.hasShan()||player.hujia>0) return false;
					var nh=player.countCards('h');
					if(player.hp==1){
						return nh<=3;
					}
					if(player.hp==2){
						return nh<=1;
					}
					return false;
				},
				content:function(){
					var cards=player.getCards('h');
					player.discard(cards);
					player.changeHujia(cards.length);
					player.storage.nsbaquan=true;
				},
				group:'nsbaquan_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseBegin'},
						forced:true,
						filter:function(event,player){
							return player.storage.nsbaquan&&player.hujia>0;
						},
						content:function(){
							player.changeHujia(-player.hujia);
							game.log(player,'失去了所有护甲');
							delete player.storage.nsbaquan;
						}
					}
				}
			},
			nschangshi:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.identity=='fan';
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(ui.selected.targets.length){
						return target.hp!=ui.selected.targets[0].hp;
					}
					return true;
				},
				multitarget:true,
				selectTarget:2,
				content:function(){
					var tmp=targets[0].hp;
					targets[0].hp=targets[1].hp;
					targets[1].hp=tmp;
					targets[0].update();
					targets[1].update();
					if(Math.abs(targets[0].hp-targets[1].hp)==1){
						player.loseHp();
					}
					//else{
						//player.die();
					//}
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(target==game.zhu) return -1;
							if(get.attitude(player,target)>3){
								var num=game.zhu.hp-target.hp;
								if(num==1){
									return 1;
								}
								if(num>1){
									if(player.hp==1) return num;
									if(target.hp==1) return num;
									if(num>=3) return num;
								}
							}
							return 0;
						}
					}
				}
			},
			nsjianning:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.identity=='nei';
				},
				filterTarget:function(card,player,target){
					return target.countCards('h')<player.countCards('h');
				},
				content:function(){
					'step 0'
					player.swapHandcards(target);
					'step 1'
					target.damage();
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(!player.countCards('h',function(card){
								return get.value(card)>=8;
							})&&player.countCards('h')-target.countCards('h')<=1){
								if(target.hp==1||player.countCards('h',function(card){
									return get.value(card)<0;
								})){
									return get.damageEffect(target,player,target);
								}
							}
							return 0;
						}
					}
				}
			},
			nscuanquan:{
				init:function(player){
					player.storage.nscuanquan=0;
				},
				forced:true,
				unique:true,
				forceunique:true,
				skillAnimation:true,
				animationColor:'thunder',
				trigger:{player:'damageAfter'},
				filter:function(event,player){
					return player.identity=='zhong'&&player.storage.nscuanquan==3&&game.zhu&&game.zhu.isZhu;
				},
				group:'nscuanquan_count',
				subSkill:{
					count:{
						trigger:{player:'damageEnd'},
						silent:true,
						content:function(){
							player.storage.nscuanquan++;
						}
					}
				},
				logTarget:function(){
					return [game.zhu];
				},
				content:function(){
					player.awakenSkill('nscuanquan');
					var tmp=player.maxHp;
					player.identity='zhu';
					player.maxHp=game.zhu.hp;
					player.showIdentity();
					player.update();
					game.zhu.identity='zhong';
					game.zhu.maxHp=tmp;
					game.zhu.showIdentity();
					game.zhu.update();
					game.zhu=player;
				}
			},
			nstianji:{
				trigger:{global:'dying'},
				priority:6,
				unique:true,
				skillAnimation:true,
				animationColor:'water',
				filter:function(event,player){
					return event.player.hp<=0&&event.player!=player;
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)>1;
				},
				content:function(){
					'step 0'
					player.awakenSkill('nstianji');
					player.loseMaxHp();
					'step 1'
					trigger.player.recover(1-trigger.player.hp);
					'step 2'
					trigger.player.gainMaxHp();
				}
			},
			nsbugua:{
				group:'nsbugua_use',
				ai:{
					threaten:1.4,
				},
				subSkill:{
					use:{
						enable:'phaseUse',
						usable:1,
						filterCard:true,
						check:function(card){
							return 9-get.value(card);
						},
						filter:function(event,player){
							// if(!player.storage.nstuiyan2_done&&player.getStat().skill.nsbugua_use){
							// 	return false;
							// }
							return player.countCards('he');
						},
						position:'he',
						ai:{
							order:9.5,
							result:{
								player:1
							}
						},
						content:function(){
							'step 0'
							player.throwDice();
							'step 1'
							var cards=get.cards(6);
							var cards2=cards.slice(0);
							var card=(cards2.splice(event.num-1,1))[0];
							player.showCards(get.translation(player)+'亮出了'+get.translation(card),cards).set('hiddencards',cards2);
							card.discard();
							var name=null;
							switch(get.suit(card)){
								case 'club':{
									if(card.number%2==0){
										name='guohe';
									}
									else{
										name='jiedao';
									}
									break;
								}
								case 'spade':{
									if(card.number%2==0){
										name='nanman';
									}
									else{
										name='juedou';
									}
									break;
								}
								case 'diamond':{
									if(card.number%2==0){
										name='shunshou';
									}
									else{
										name='huogong';
									}
									break;
								}
								case 'heart':{
									if(card.number%2==0){
										name='wuzhong';
									}
									else{
										name='wanjian';
									}
									break;
								}
							}
							var togain=get.cardPile(name,'cardPile');
							if(togain){
								player.gain(togain,'gain2');
							}
							else{
								player.draw();
							}
							event.list=cards2;
							'step 2'
							player.chooseCardButton(event.list,true,'按顺序将牌置于牌堆顶（先选择的在上）',event.list.length);
							'step 3'
							var list=result.links.slice(0);
							while(list.length){
								ui.cardPile.insertBefore(list.pop(),ui.cardPile.firstChild);
							}
						},
					},
					twice:{}
				}
			},
			nstuiyan:{
				trigger:{player:'useCard'},
				filter:function(event,player){
					return _status.currentPhase==player&&event.getParent('phaseUse',true)&&!player.hasSkill('nstuiyan_fail')&&
						typeof player.storage.nstuiyan=='number'&&event.card.number>player.storage.nstuiyan;
				},
				frequent:true,
				priority:2,
				content:function(){
					player.draw();
				},
				onremove:function(player){
					delete player.storage.nstuiyan;
					delete player.storage.nstuiyan_done;
					delete player.storage.nstuiyan2;
					delete player.storage.nstuiyan2_done;
				},
				intro:{
					mark:function(dialog,content,player){
						if(player.storage.nstuiyan_done){
							dialog.addText('推演摸牌已结束');
						}
						else{
							dialog.addText('上一张点数：'+player.storage.nstuiyan);
						}
						if(player.storage.nstuiyan2_done){
							dialog.addText('总点数8的倍数已达成');
						}
						else{
							dialog.addText('总点数：'+player.storage.nstuiyan2);
						}
					},
					content:function(storage,player){
						var str='';
						if(player.storage.nstuiyan_done){
							str+='推演摸牌已结束；'
						}
						else{
							str+='上一张牌点数：'+storage+'；';
						}
						if(player.storage.nstuiyan2_done){
							str+='总点数8的倍数已达成';
						}
						else{
							str+='总点数：'+player.storage.nstuiyan2;
						}
						return str;
					},
					markcount:function(storage,player){
						if(player.storage.nstuiyan2_done){
							if(player.storage.nstuiyan_done){
								return 0;
							}
							else{
								return player.storage.nstuiyan;
							}
						}
						else{
							return player.storage.nstuiyan2;
						}
					}
				},
				group:['nstuiyan_use','nstuiyan_clear'],
				subSkill:{
					bugua:{
						trigger:{player:'useCardAfter'},
						direct:true,
						filter:function(event,player){
							return player.countCards('h');
						},
						content:function(){
							'step 0'
							player.removeSkill('nstuiyan_bugua');
							player.chooseToDiscard('he','推演：是否发动一次【卜卦】？').set('ai',function(card){
								return 8-get.value(card);
							}).set('logSkill','nstuiyan');
							'step 1'
							if(result.bool){
								event.insert(lib.skill.nsbugua.subSkill.use.content,{player:player});
							}
						}
					},
					use:{
						trigger:{player:'useCard'},
						silent:true,
						priority:-1,
						filter:function(event,player){
							return _status.currentPhase==player&&event.getParent('phaseUse',true)&&typeof event.card.number=='number';
						},
						content:function(){
							if(typeof player.storage.nstuiyan2!='number'){
								player.storage.nstuiyan2=0;
							}
							if(!player.hasSkill('nstuiyan_fail')&&
								(trigger.card.number<=player.storage.nstuiyan||typeof trigger.card.number!='number')){
									player.storage.nstuiyan_done=true;
									player.addTempSkill('nstuiyan_fail');
								}
							player.storage.nstuiyan=trigger.card.number;
							player.storage.nstuiyan2+=trigger.card.number;
							if(player.storage.nstuiyan2%8==0&&!player.storage.nstuiyan2_done){
								player.storage.nstuiyan2_done=true;
								player.addTempSkill('nstuiyan_bugua');
							}
							player.markSkill('nstuiyan');
						}
					},
					clear:{
						trigger:{player:['phaseUseAfter','phaseAfter']},
						silent:true,
						content:function(){
							delete player.storage.nstuiyan;
							delete player.storage.nstuiyan_done;
							delete player.storage.nstuiyan2;
							delete player.storage.nstuiyan2_done;
							player.unmarkSkill('nstuiyan');
						}
					},
					fail:{}
				},
				ai:{
					threaten:1.4
				}
			},
			nsshijun:{
				trigger:{source:'damageBegin'},
				forced:true,
				content:function(){
					trigger.num++;
					trigger.nsshijun=true;
				},
				subSkill:{
					hp:{
						trigger:{source:'damageAfter'},
						silent:true,
						filter:function(event){
							return event.nsshijun;
						},
						content:function(){
							player.loseHp();
						}
					}
				},
				group:'nsshijun_hp'
			},
			nszhaoxin:{
				mark:true,
				intro:{
					mark:function(dialog,content,player){
						var hs=player.getCards('h');
						if(hs.length){
							dialog.addSmall(hs);
						}
						else{
							dialog.addText('无手牌');
						}
					},
					content:function(content,player){
						var hs=player.getCards('h');
						if(hs.length){
							return get.translation(hs);
						}
						else{
							return '无手牌';
						}
					}
				},
			},
			nsxiuxin:{
				mod:{
					targetEnabled:function(card,player,target){
						var suit=get.suit(card);
						if(suit&&!target.countCards('h',{suit:suit})){
							return false;
						}
					}
				}
			},
			nscangxi:{
				unique:true,
				global:'nscangxi2',
				zhuSkill:true,
				init:function(player){
					player.storage.nscangxi=0;
				},
				intro:{
					content:'手牌上限+#'
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.storage.nscangxi;
					}
				}
			},
			nscangxi2:{
				trigger:{player:'phaseDiscardEnd'},
				filter:function(event,player){
					if(!event.cards||event.cards.length<=1) return false;
					if(player.group!='wu') return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.hasZhuSkill('nscangxi',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current!=player&&current.hasZhuSkill('nscangxi',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt('nscangxi',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.logSkill('nscangxi',event.current);
						player.judge(function(card){
							return _status.event.att*(get.color(card)=='black'?1:0);
						}).set('att',get.sgnAttitude(player,event.current));
					}
					else{
						event.goto(1);
					}
					'step 3'
					if(result.color=='black'){
						var name=get.translation(event.current.name);
						var att=0;
						if(event.current.needsToDiscard()){
							att=1;
						}
						player.chooseControlList(['令'+name+'摸一张牌展示','令'+name+'手牌上永久+1','弃置一张牌并令'+name+'获得一张本回进入弃牌堆的牌'],function(){
							return _status.event.att;
						}).set('att',att);
					}
					else{
						event.goto(1);
					}
					'step 4'
					switch(result.index){
						case 0: event.current.draw('visible');break;
						case 1: {
							if(typeof event.current.storage.nscangxi!='number'){
								event.current.storage.nscangxi=0;
							}
							event.current.storage.nscangxi++;
							event.current.syncStorage('nscangxi');
							event.current.markSkill('nscangxi');
							break;
						}
						case 2: {
							player.chooseToDiscard(true,'he');
							break;
						}
					}
					if(result.index!=2){
						event.goto(1);
					}
					'step 5'
					if(result.bool){
						var discarded=get.discarded();
						if(discarded.length){
							event.current.chooseCardButton('选择一张获得之',discarded,true).set('ai',function(button){
								return get.value(button.link);
							});
						}
						else{
							event.goto(1);
						}
					}
					else{
						event.goto(1);
					}
					'step 6'
					if(result.bool&&result.links&&result.links.length){
						event.current.gain(result.links,'gain2');
					}
					event.goto(1);
				}
			},
			nswulie:{
				trigger:{player:'phaseBegin'},
				skillAnimation:true,
				animationColor:'metal',
				unique:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return ui.discardPile.childElementCount>0;
				},
				content:function(){
					'step 0'
					player.awakenSkill('nswulie');
					player.loseMaxHp();
					'step 1'
					player.chooseCardButton(Array.from(ui.discardPile.childNodes),'将至多3张任意顺置于牌堆顶（先选择的在上）',true,[1,3]);
					'step 2'
					if(result.bool){
						var cards=result.links.slice(0);
						while(cards.length){
							ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
						}
						player.addTempSkill('nswulie_end');
					}
				},
				subSkill:{
					end:{
						trigger:{player:'phaseEnd'},
						check:function(){
							return false;
						},
						filter:function(event,player){
							return ui.discardPile.childElementCount>0;
						},
						content:function(){
							'step 0'
							player.loseMaxHp();
							'step 1'
							player.chooseCardButton(Array.from(ui.discardPile.childNodes),'将至多3张任意顺置于牌堆顶（先选择的在上）',true,[1,3]);
							'step 2'
							if(result.bool){
								var cards=result.links.slice(0);
								while(cards.length){
									ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
								}
							}
						}
					}
				}
			},
			nshunyou:{
				enable:'phaseUse',
				usable:1,
				filterCard:{type:'basic'},
				filter:function(event,player){
					return player.countCards('h',{type:'basic'});
				},
				content:function(){
					'step 0'
					var equip=null, trick=null;
					for(var i=0;i<ui.discardPile.childElementCount;i++){
						var type=get.type(ui.discardPile.childNodes[i],'trick');
						if(type=='trick'){
							trick=ui.discardPile.childNodes[i];
						}
						else if(type=='equip'){
							equip=ui.discardPile.childNodes[i];
						}
						if(trick&&equip){
							break;
						}
					}
					var list=[];
					if(trick) list.push(trick);
					if(equip) list.push(equip);
					if(!list.length){
						player.draw(Math.min(3,1+player.maxHp-player.hp));
					}
					else{
						player.gain(list,'gain2');
						event.equip=equip;
					}
					'step 1'
					if(event.equip&&get.owner(event.equip)==player){
						player.chooseTarget('是否将'+get.translation(event.equip)+'装备给一其角色？',function(card,player,target){
							return target!=player
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(att>1){
								if(!target.getEquip(_status.event.subtype)) return att;
							}
							return 0;
						}).set('subtype',get.subtype(event.equip));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.line(result.targets,'green');
						player.$give(event.equip,result.targets[0]);
						player.lose(event.equip,ui.special);
					}
					else{
						event.finish();
					}
					'step 3'
					game.delay(0.5);
					'step 4'
					result.targets[0].equip(event.equip);
					'step 5'
					game.delay();
				},
				check:function(card){
					return 7-get.value(card);
				},
				ai:{
					order:7,
					result:{
						player:1
					}
				}
			},
			nsgongjian:{
				trigger:{player:'phaseDiscardEnd'},
				forced:true,
				filter:function(event,player){
					if(event.cards&&event.cards.length>0){
						return game.hasPlayer(function(current){
							return current.hp>player.hp;
						});
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget('恭俭：将置的牌交给一名体力值大于你的角色',function(card,player,target){
						return target.hp>player.hp;
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target)/Math.sqrt(target.countCards('h')+1);
					});
					'step 1'
					if(result.bool){
						player.line(result.targets,'green');
						result.targets[0].gain(trigger.cards,'gain2');
					}
				},
			},
			nscaijian:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var nh=player.countCards('h');
					return nh&&nh<=player.maxHp;
				},
				content:function(){
					'step 0'
					player.showHandcards();
					event.num=player.countCards('h');
					'step 1'
					player.directgain(get.cards(event.num));
					player.chooseCard('将'+get.cnNumber(event.num)+'张手牌以按顺序置于牌堆顶（先选择的在上）',event.num,true).set('ai',function(card){
						return -get.value(card);
					});
					'step 2'
					if(result.bool){
						player.lose(result.cards,ui.special)._triggered=null;
						event.cards=result.cards.slice(0);
					}
					else{
						event.finish();
					}
					'step 3'
					if(player==game.me&&_status.auto){
						game.delay();
					}
					'step 4'
					while(event.cards.length){
						var current=event.cards.pop();
						current.fix();
						ui.cardPile.insertBefore(current,ui.cardPile.firstChild);
					}
				},
				ai:{
					order:10,
					result:{
						player:1
					}
				}
			},
			nsdongcha:{
				trigger:{player:'damageBefore'},
				forced:true,
				priority:15,
				filter:function(event,player){
					if(get.type(event.card,'trick')=='trick'){
						if(event.getParent(2).name=='useCard'){
							return event.getParent(2).targets.length==1;
						}
						return true;
					}
					return false;
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					notrick:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='trick'&&get.tag(card,'damage')&&!get.tag(card,'multitarget')){
								return 'zeroplayertarget';
							}
						}
					}
				},
				group:'nsdongcha_cancel',
				subSkill:{
					cancel:{
						trigger:{target:'useCardToAfter'},
						silent:true,
						filter:function(event,player){
							return get.type(event.card,'trick')=='trick'&&_status.currentPhase==event.player&&event.player!=player;
						},
						content:function(){
							player.addTempSkill('nsdongcha_disable');
						}
					},
					disable:{
						trigger:{target:'useCardToBefore'},
						forced:true,
						priority:15,
						onremove:true,
						filter:function(event,player){
							return (event.player==_status.currentPhase&&get.type(event.card,'trick')=='trick');
						},
						content:function(){
							trigger.cancel();
						},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.type(card,'trick')=='trick'&&_status.currentPhase==player) return 'zeroplayertarget';
								}
							}
						}
					}
				}
			},
			nsjianxiong:{
				trigger:{target:'useCardToBefore'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToUse(function(card){
						return !get.info(card).multitarget;
					},get.prompt('nsjianxiong',trigger.player),trigger.player,-1);
					'step 1'
					if(event.damaged){
						trigger.cancel();
						if(get.color(trigger.card)=='black'){
							player.draw();
						}
					}
				},
				subSkill:{
					damage:{
						trigger:{source:'damageAfter'},
						silent:true,
						filter:function(event,player){
							return event.getParent(4).name=='nsjianxiong';
						},
						content:function(){
							trigger.getParent(4).damaged=true;
						}
					}
				},
				group:'nsjianxiong_damage',
				ai:{
					effect:{
						player:function(card,player,target){
							if(_status.currentPhase!=player) return;
							if(get.tag(card,'damage')&&!player.needsToDiscard(1)&&target.hp>1){
								return 'zeroplayertarget';
							}
						}
					}
				}
			},
			nsxionglue:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h',{color:'black'});
				},
				check:function(card){
					return 7-get.value(card);
				},
				filterCard:{color:'black'},
				content:function(){
					'step 0'
					var list=get.inpile('trick');
					list=list.randomGets(3);
					for(var i=0;i<list.length;i++){
						list[i]=['锦囊','',list[i]];
					}
					var dialog=ui.create.dialog('选择一张锦囊牌加入你的手牌',[list,'vcard'],'hidden');
					player.chooseButton(dialog,true).set('ai',function(button){
						var card={name:button.link[2]};
						var value=get.value(card);
						return value;
					});
					'step 1'
					if(result.bool){
						player.gain(game.createCard(result.buttons[0].link[2]),'draw');
					}
				},
				ai:{
					order:9,
					result:{
						player:1
					}
				}
			},
			nshuanhuo:{
				trigger:{player:['loseHpAfter','damageAfter']},
				filter:function(event,player){
					if(game.countPlayer(function(current){
						return current!=player&&!current.isUnseen(2);
					})<2) return false;
					if(event.name=='damage') return event.num>1;
					return true;
				},
				direct:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					'step 0'
					player.chooseTarget(2,get.prompt2('nshuanhuo'),function(card,player,target){
						return target!=player&&!target.isUnseen(2);
					}).set('ai',function(target){
						var att=get.attitude(player,target);
						if(ui.selected.targets.length){
							if(att<0){
								return get.rank(target,true)-get.rank(ui.selected.targets[0],true);
							}
						}
						else{
							if(att>=0){
								return 1/(1+get.rank(target,true));
							}
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						player.logSkill('nshuanhuo',result.targets);
					}
					else{
						event.finish();
					}
					'step 2'
					var name1=result.targets[0].name;
					var name2=result.targets[1].name;
					result.targets[0].reinit(name1,name2,false);
					result.targets[1].reinit(name2,name1,false);
				}
			},
			nsyaowang:{
				trigger:{player:'phaseBegin'},
				direct:true,
				group:'tianshu_remove',
				createDialog:function(player,target,onlylist){
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
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('nsyaowang'),function(card,player,target){
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
						return 0;
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						player.logSkill('nsyaowang',event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					event.skillai=function(list){
						return get.max(list,get.skillRank,'item');
					};
					if(event.isMine()){
						event.dialog=lib.skill.tianshu.createDialog(player,target);
						event.switchToAuto=function(){
							event._result=event.skillai(event.list);
							game.resume();
						};
						_status.imchoosing=true;
						game.pause();
					}
					else{
						event._result=event.skillai(lib.skill.nsyaowang.createDialog(player,target,true));
					}
					'step 3'
					_status.imchoosing=false;
					if(event.dialog){
						event.dialog.close();
					}
					player.addTempSkill(result);
					player.popup(result);
					game.log(player,'获得了','【'+get.translation(result)+'】');

					var names=[];
					for(var i=0;i<game.players.length;i++){
						names.add(game.players[i].name);
						names.add(game.players[i].name1);
						names.add(game.players[i].name2);
					}
					for(var i=0;i<game.dead.length;i++){
						names.add(game.dead[i].name);
						names.add(game.dead[i].name1);
						names.add(game.dead[i].name2);
					}
					var list=get.gainableSkills(function(info,skill,name){
						if(names.contains(name)) return false;
						return true;
					});
					var skill=list.randomGet();
					target.popup(skill);
					target.addTempSkill(skill,{player:'phaseAfter'});
					game.log(target,'获得了','【'+get.translation(skill)+'】');
				}
			},
			nsjianshu:{
				trigger:{player:'shaBegin'},
				forced:true,
				filter:function(event,player){
					return !event.directHit&&player.getEquip(1);
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
			nscangjian:{
				trigger:{source:'damageEnd'},
				direct:true,
				filter:function(event){
					return event.player.isIn()&&event.player.countCards('e');
				},
				content:function(){
					player.gainPlayerCard(trigger.player,'e',get.prompt('nscangjian',trigger.player)).logSkill=['nscangjian',trigger.player];
				}
			},
			nsyunxing:{
				trigger:{global:'dieAfter'},
				forced:true,
				check:function(event,player){
					return event.player.group=='wei'||(event.player.group=='wu'&&player.hp==1);
				},
				filter:function(event,player){
					return ['wei','shu','wu','qun'].contains(event.player.group);
				},
				content:function(){
					'step 0'
					switch(trigger.player.group){
						case 'wei':player.draw();break;
						case 'shu':player.loseHp();break;
						case 'wu':player.recover();break;
						case 'qun':{
							var evt=_status.event.getParent('phaseUse');
							if(evt&&evt.name=='phaseUse'){
								evt.skipped=true;
							}
							var evt=_status.event.getParent('phase');
							if(evt&&evt.name=='phase'){
								evt.finish();
							}
							break;
						}
					}
					if(trigger.player.group!='wei'||!game.hasPlayer(function(current){
						return current.countCards('h');
					})){
						event.finish();
					}
					'step 1'
					player.chooseTarget('弃置一名角色的一张手牌',true,function(card,player,target){
						return target.countCards('h');
					}).set('ai',function(target){
						if(target.hasSkillTag('noh')) return 0;
						return -get.attitude(_status.event.player,target);
					});
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.discardPlayerCard(target,true,'h');
						player.line(target,'green');
					}
				},
				group:'nsyunxing_self',
				subSkill:{
					self:{
						trigger:{player:'dieBegin'},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('nsyunxing'),function(card,player,target){
								return target!=player;
							}).set('prompt2','令一名其他角色翻面').set('ai',function(target){
								var att=get.attitude(_status.event.player,target);
								if(target.isTurnedOver()){
									if(att>2){
										return att*2;
									}
									else{
										return att;
									}
								}
								else{
									return -att;
								}
							});
							'step 1'
							if(result.bool){
								player.logSkill('nsyunxing',result.targets);
								result.targets[0].turnOver();
							}
						}
					}
				}
			},
			nsguanxing:{
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return player.hp>0;
				},
				content:function(){
					'step 0'
					event.cards=get.cards(game.countPlayer());
					event.chosen=[];
					event.num=player.hp;
					'step 1'
					var js=player.getCards('j');
					var pos;
					var choice=-1;
					var getval=function(card,pos){
						if(js[pos]){
							return (get.judge(js[pos]))(card);
						}
						else{
							return get.value(card);
						}
					};
					for(pos=0;pos<Math.min(event.cards.length,js.length+2);pos++){
						var max=getval(event.cards[pos],pos);
						for(var j=pos+1;j<event.cards.length;j++){
							var current=getval(event.cards[j],pos);
							if(current>max){
								choice=j;
								max=current;
							}
						}
						if(choice!=-1){
							break;
						}
					}
					player.chooseCardButton('观星：选择要移动的牌（还能移动'+event.num+'张）',event.cards).set('filterButton',function(button){
						return !_status.event.chosen.contains(button.link);
					}).set('chosen',event.chosen).set('ai',function(button){
						return button.link==_status.event.choice?1:0;
					}).set('choice',event.cards[choice]);
					event.pos=pos;
					'step 2'
					if(result.bool){
						var card=result.links[0];
						var index=event.cards.indexOf(card);
						event.card=card;
						event.chosen.push(card);
						event.cards.remove(event.card);
						var buttons=event.cards.slice(0);
						player.chooseControl(function(){
							return _status.event.controlai;
						}).set('controlai',event.pos||0).set('sortcard',buttons).set('tosort',card);
					}
					else{
						event.goto(4);
					}
					'step 3'
					if(typeof result.index=='number'){
						if(result.index>event.cards.length){
							ui.cardPile.appendChild(event.card);
						}
						else{
							event.cards.splice(result.index,0,event.card);
						}
						event.num--;
						if(event.num>0){
							event.goto(1);
						}
					}
					'step 4'
					while(event.cards.length){
						ui.cardPile.insertBefore(event.cards.pop(),ui.cardPile.firstChild);
					}
					var js=player.getCards('j');
					if(js.length==1){
						if((get.judge(js[0]))(ui.cardPile.firstChild)<0){
							player.addTempSkill('guanxing_fail');
						}
					}
				},
				ai:{
					guanxing:true
				}
			},
			nshaoling:{
				skillAnimation:true,
				animationColor:'water',
				unique:true,
				limited:true,
				enable:'phaseUse',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					"step 0"
					player.awakenSkill('nshaoling');
					event.targets=game.filterPlayer();
					event.targets.remove(player);
					event.targets.remove(target);
					event.targets.sortBySeat();
					"step 1"
					if(event.targets.length){
						event.current=event.targets.shift();
						if(event.current.countCards('he')&&target.isAlive()){
							event.current.chooseToUse({name:'sha'},target,-1,'号令').set('prompt2','选择一项：1. 对'+get.translation(event.current)+'使用一张杀；2. 取消并交给'+get.translation(player)+'一张牌，然后视'+get.translation(player)+'为对你使用一张杀');
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool==false){
						if(event.current.countCards('he')){
							event.current.chooseCard('he',true,'交给'+get.translation(player)+'一张牌');
						}
						else{
							event.goto(4);
						}
					}
					else{
						event.goto(1);
					}
					"step 3"
					if(result.bool){
						event.current.give(result.cards,player);
					}
					"step 4"
					player.useCard({name:'sha'},event.current,false);
					event.goto(1);
				},
				ai:{
					order:5,
					result:{
						target:function(player,target){
							var players=game.filterPlayer();
							if(player.hp>1){
								if(game.phaseNumber<game.players.length) return 0;
								if(player.hasUnknown()) return 0;
							}
							var effect=0;
							for(var i=0;i<players.length;i++){
								if(players[i]!=target&&players[i]!=player&&players[i].countCards('he'))
								effect+=get.effect(target,{name:'sha'},players[i],target);
							}
							return effect;
						}
					}
				}
			},
			nsgefa:{
				enable:'chooseToUse',
				filter:function(event,player){
					return player.hp<=0;
				},
				filterCard:{suit:'club'},
				position:'he',
				viewAs:{name:'tao'},
				prompt:'将一张梅花牌当桃使用',
				check:function(card){return 15-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						return player.countCards('he',{suit:'club'})>0;
					},
					threaten:1.5,
					save:true,
					respondTao:true,
				}
			},
			nscaiyi:{
				trigger:{global:'drawAfter'},
				check:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					if(get.effect(event.player,{name:'sha'},player,player)<=0) return false;
					if(get.effect(player,{name:'sha'},event.player,player)>=0) return true;
					return player.hasShan()&&player.hp>=event.player.hp;
				},
				filter:function(event,player){
					return player!=event.player&&event.result.length>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					player.viewCards(get.translation(trigger.player)+'摸到的牌',trigger.result);
					if(!event.isMine()){
						game.delayx();
					}
					'step 1'
					var list=[];
					for(var i=0;i<trigger.result.length;i++){
						if(trigger.result[i].name=='sha'){
							list.push(trigger.result[i]);
						}
					}
					if(list.length){
						player.useCard({name:'sha'},trigger.player);
					}
					else{
						trigger.player.useCard({name:'sha'},player);
					}
				}
			},
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
						usable:2,
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
				round:2,
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
							player.hp=player.maxHp;
							player.update();
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
							player.logSkill('nscongjun_show');
							'step 2'
							player.removeSkill('nscongjun_show');
							player.line(trigger.player,'green');
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
				group:['nshuanxian_left','nshuanxian_right','nshuanxian_damage','nshuanxian_swap','nshuanxian_draw'],
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
				// usable:4,
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
			diyjizhi:{
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
			liangji:{
				audio:["liangji",2], 
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return target!=player&&!target.hasSkill('liangji_1');
				},
				content:function (){
					'step 0'
					player.chooseCard('h','环计：将1张牌置于'+get.translation(target)+'的武将牌上',true).set('ai',function(card){
						if(get.attitude(_status.event.player,_status.event.getParent().player)>0){
							return 7-get.value(card);
						}
						return -get.value(card);
					});
					'step 1'
					if(result.bool){
						player.$give(result.cards,target);
						player.lose(result.cards,ui.special);
						target.storage.liangji_1=result.cards;
						target.storage.liangji_1_source=target;
						target.syncStorage('liangji_1');
						target.addSkill('liangji_1');
					}
				},
				ai:{
					order:1,
					result:{
						target:function (player,target){
							if(get.attitude(player,target)>0){
								return Math.sqrt(target.countCards('he'));
							}
							return 0;
						},
						player:1,
					},
				},
				subSkill:{
					"1":{
						trigger:{
							player:"phaseDrawBegin",
						},
						forced:true,
						mark:true,
						intro:{
							content:"cards",
						},
						content:function (){
							'step 0'
							var cards=player.storage.liangji_1;
							if(cards){
								player.gain(cards,'gain2');
							}						
							player.storage.liangji_1=0;
							'step 1'			
							if(player.sex=='male')player.addTempSkill('wushuang');						
							if(player.sex=='female')player.addTempSkill('lijian');
							player.removeSkill('liangji_1');									
						},
						sub:true,
					},
				},
			},
 			jugong:{
				audio:["jingong",2], 
				trigger:{
					global:"damageEnd",
				},
				usable:1,
				frequent:true,
				locked:false,
				notemp:true,
				marktext:"功",
				init:function (player){
					player.storage.jugong=[];
				},
				filter:function (event,player){
					return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.notLink()				
					&&_status.currentPhase!=player;
				},
				content:function (){
					"step 0"
					player.draw();
					"step 1"
					if(player.countCards('h')){
						player.chooseCard('将'+get.cnNumber(1)+'张手牌置于武将牌上作为“功”',1,true);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.cards&&result.cards.length){
						player.lose(result.cards,ui.special);
						player.storage.jugong=player.storage.jugong.concat(result.cards);
						player.syncStorage('jugong');
						player.markSkill('jugong');
						game.log(player,'将',result.cards,'置于武将牌上作为“功”');
					}
				},
				intro:{
					content:"cards",
				},
				group:"jugong_1",
				subSkill:{
					"1":{
						trigger:{
							player:"damageBegin",
						},
						filter:function (event,player){		
							return player.storage.jugong.length>1;
						},
						content:function (){
							"step 0" 
							player.chooseCardButton('移去两张“功”',2,player.storage.jugong,true);
							"step 1"
							if(event.directresult||result.bool){
								player.logSkill('jugong');
								var links=event.directresult||result.links;
								for(var i=0;i<links.length;i++){
									player.storage.jugong.remove(links[i]);
								}
								player.syncStorage('jugong');
								if(!player.storage.jugong.length){
									player.unmarkSkill('jugong');
								}
								else{
									player.markSkill('jugong');
								}
								player.$throw(links);
								game.log(player,'被移去了',links);
								for(var i=0;i<links.length;i++){
									ui.discardPile.appendChild(links[i]);
								}
							}
							"step 2"
							trigger.cancel();						
						},
						sub:true,
					},
				},
				ai:{
					effect:{
						target:function (card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
								if(!target.hasSkill('paiyi')&&target.hp>1) return [0.5,get.tag(card,'damage')*1.5];
								if(target.hp==3) return [0.5,get.tag(card,'damage')*0.2];
								if(target.hp==2) return [0.1,get.tag(card,'damage')*0.1];
							}
						},
					},
				},
			},
			chengmou:{
				audio:["moucheng",2],
				trigger:{
					player:"phaseDrawBegin",
				},
				frequent:true,
				filter:function (event,player){		
					return player.storage.jugong.length>0;
				},
				content:function (){
					'step 0'
					if(player.storage.jugong.length>2) player.loseHp();
					'step 1'
					var cards=player.storage.jugong;
					if(cards){					
						player.gain(cards,'gain2');					
					}								
					player.storage.jugong=[];   
					'step 2'
					trigger.cancel();
				},	
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
					trigger.player.chooseCard('立断').set('prompt2','将一张手牌交给'+get.translation(player)+'，或取消并使用'+get.translation(trigger.cards)).ai=function(card){
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
						result.links[0].discard();
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
			batu:{
				trigger:{player:'phaseEnd'},
				frequent:true,
				filter:function(event,player){
					return player.countCards('h')<game.countGroup();
				},
				content:function(){
					player.draw(game.countGroup()-player.countCards('h'));
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
				skillAnimation:'epic',
				limited:true,
				filter:function(event,player){
					if(event.type!='dying') return false;
					if(player!=event.dying) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					return target.sex=='male'&&player!=target;
				},
				content:function(){
					"step 0"
					player.awakenSkill('guihan');
					player.recover();
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
						card.discard();
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
					link:true,
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
			ns_huamulan:'SP花木兰',
			ns_huangzu:'黄祖',
			ns_yanliang:'颜良',
			ns_wenchou:'文丑',
			ns_jinke:'荆轲',

			ns_caocao:'曹操',
			ns_zhugeliang:'诸葛亮',
			ns_wangyue:'王越',
			ns_yuji:'于吉',
			ns_caocaosp:'SP曹操',
			ns_xinxianying:'辛宪英',
			ns_sunjian:'孙坚',
			ns_simazhao:'司马昭',
			ns_guanlu:'管辂',

			ns_duangui:'段珪',
			ns_shenpei:'审配',
			ns_zhangbao:'张宝',
			ns_masu:'马谡',
			ns_zhangxiu:'张绣',
			ns_lvmeng:'吕蒙',

			ns_yujisp:'于吉',
			ns_lisu:'李肃',
			ns_yangyi:'杨仪',
			ns_liuzhang:'刘璋',
			ns_xinnanhua:'南华老仙',
			
			key_lucia:'此花露西娅',
			key_kyousuke:'棗恭介',
			key_yuri:'仲村ゆり',
			key_haruko:'神尾晴子',
			key_kagari:'篝',
			key_umi:'加藤うみ',
			key_umi2:'鹰原羽未',
			lucia_duqu:'毒躯',
			lucia_duqu_info:'锁定技，①当你对其他角色造成伤害或受到其他角色的伤害时，你和对方各获得一张花色点数随机的【毒】。<br>②当你因【毒】失去体力时，你改为回复等量的体力。<br>③当你处于濒死状态时，你可以使用一张【毒】（每回合限一次）。',
			lucia_zhenren:'振刃',
			lucia_zhenren_info:'锁定技，每个结束阶段，若你的装备区内有牌，则你弃置之。然后，你依次弃置场上的X张牌。（X为你以此法弃置的牌数）',
			nk_shekong:'设控',
			nk_shekong_info:'出牌阶段限一次，你可以弃置任意张手牌并选择一名其他角色（不能超过该角色的牌数），然后令其选择一项：弃置一张牌并令你摸X张牌，或弃置X张牌并令你摸一张牌。然后，你将你与其弃置的且位于弃牌堆中的牌以任意顺序置于牌堆顶。',
			key_huanjie:'幻界',
			key_huanjie_info:'锁定技，当你进行判定或摸牌时，你改为从牌堆的另一端获取相应的牌。',
			yuri_xingdong:'行动',
			yuri_xingdong_info:'出牌阶段限一次，你可以将一张【杀】或普通锦囊牌交给一名其他角色，然后该角色选择一项：对除你以外的角色使用此牌并在此牌结算完成后和你各摸一张牌；或跳过下回合的判定阶段和摸牌阶段。',
			yuri_wangxi:'忘隙',
			yuri_wangxi_info:'主公技，限定技，当有角色因你发动的【行动】而死亡后，若其身份不为【明忠】，则其可以将身份改为忠臣并重新加入游戏，然后将势力改为与你相同，将体力值回复至2点并摸一张牌。',
			haruko_haofang:'豪放',
			haruko_haofang_info:'锁定技，你不能使用非转化的延时锦囊牌。你可以将一张延时锦囊牌当做【无中生有】使用。',
			haruko_zhuishi:'追逝',
			haruko_zhuishi_info:'一名角色的判定阶段开始时，若其判定区内有牌，则你可以失去1点体力，然后获得其判定区内的所有牌。',
			kagari_zongsi:'纵丝',
			kagari_zongsi_info:'出牌阶段限一次，你可以选择一张不在游戏外的牌，然后将其置于牌堆/弃牌堆的顶部/底部或一名角色的对应区域内。',
			umi_chaofan:'炒饭',
			umi_chaofan_info:'出牌阶段限一次，你可以弃置两张花色不同的手牌并选择一名其他角色。你摸一张牌，若你的体力值：大于2，目标角色回复1点体力；等于2，目标角色摸两张牌；小于2，目标角色受到1点无来源且对应渠道为这两张牌的火焰伤害。',
			umi_lunhui:'轮回',
			umi_lunhui_info:'一名其他角色的回合结束时，若你的手牌数小于体力值，则你可以失去1点体力。若如此做，你进行一个额外回合，且你于此回合内计算与此角色的距离视为1。',
			umi_shiroha:'轮回 - 延时效果',
			umi_qihuan:'七幻',
			umi_qihuan_info:'限定技，当你处于濒死状态时，你可以移去此武将牌。若如此做，你回复X点体力（X为场上势力数）。然后，你可获得场上已死亡角色武将牌上的至多两个技能。',
			
			ns_chuanshu:'传术',
			ns_chuanshu_info:'<span class=yellowtext>限定技</span> 当一名其他角色进入濒死状态时，你可以令其选择获得技能【雷击】或【鬼道】，其回复体力至1并摸两张牌。当该被【传术】的角色造成或受到一次伤害后，你摸一张牌。其阵亡后，你重置技能【传术】',
			ns_xiandao1:'仙道',
			ns_xiandao1_info:'<font color=#f00>锁定技</font> 游戏开始和回合结束阶段，你随机获得技能【雷击】或【鬼道】，直到下个出牌阶段开始',
			ns_xiandao2:'仙道',
			ns_xiandao2_info:'<font color=#f00>锁定技</font> 你防止受到任何属性伤害',
			ns_xiandao:'仙道',
			ns_xiandao_info:'<font color=#f00>锁定技</font> 游戏开始、你进入游戏时和回合结束阶段，你随机获得技能【雷击】或【鬼道】，直到下个出牌阶段阶段开始。你防止受到任何属性伤害',
			ns_chuanshu2:'术',
			ns_chuanshu2_info:'<font color=#f00>锁定技</font> 当你造成或受到一次伤害后，南华老仙摸一张牌',
			ns_chuanshu3:'术',
			ns_chuanshu3_info:'<font color=#f00>锁定技</font> 当你【传术】的角色阵亡后，你重置技能【传术】',
			ns_xiuzheng:'修真',
			ns_xiuzheng_info:'出牌阶段限一次，你可选择一名其他角色，然后展示牌堆顶的两张牌，若同为红色，则其受到一点火焰伤害；若同为黑色，其受到一点雷电伤害；若颜色不相同，你弃置其一张牌。然后你获得这两张展示的牌后再弃置两张牌',
			nsanruo:'暗弱',
			nsanruo_info:'锁定技，你手牌中的[杀]和普通锦囊牌(借刀杀人等带有指向目标的锦囊除外)均对你不可见。但你可以正常使用之',
			nsxunshan:'循善',
			nsxunshan_info:'锁定技，你使用【暗弱】牌可以为其指定任意名合法目标（托管无效）',
			nskaicheng:'开城',
			nskaicheng_info:'主公技，你的回合内，你可以将一张【暗弱】牌交给一名群势力其他角色观看，其可以选择是否告诉你此牌的名字。然后你选择一项：使用这张牌并摸一张牌；或结束此回合',
			nsjuanli:'狷戾',
			nsjuanli_info:'出牌阶段限一次，你可以和一名有手牌的其他角色进行赌牌，若你赢，目标角色失去1点体力且该角色与你距离-1直到与你下次赌牌，若你没赢，目标角色回复1点体力，且该角色与你距离+1直到与你的下次赌牌。（赌牌:赌牌的两名角色分别亮开一张手牌，若花色相同则赌牌平局，若花色不同，则依次展示牌堆顶的牌直到翻开的牌与其中一人亮出牌的花色相同，则该角色获得赌牌的胜利）',
			nsyuanchou:'远筹',
			nsyuanchou_info:'锁定技，当你成为锦囊牌的目标时，若来源角色与你的距离大于1，则取消之',
			nsguhuo:'蛊惑',
			nsguhuo_info:'锁定技，你在一个回合中使用前两张牌时，你对一名随机角色从牌堆(牌堆无则从弃牌堆)随机使用一张同类别卡牌',
			nsqinxue:'勤学',
			nsqinxue_info:'每个效果每回合只能使用一次。①当你使用一张基本牌时，你从牌堆随机获得一张锦囊牌；②当你使用一张锦囊牌时，你从牌堆随机获得一张装备牌；③当你使用一张装备牌时，你从牌堆随机获得一张基本牌',
			nsbaiyi:'白衣',
			nsbaiyi_info:'锁定技，若你本回合发动过勤学，你跳过弃牌阶段，改为弃置X张牌（X为本回合发动勤学次数）；若你弃置了3张类别不同的牌，你获得一个额外回合（不可连续获得回合），否则你观看牌堆顶的X张牌并获得其中一张',
			nsbaiming:'百鸣',
			nsbaiming_info:'当你使用【杀】时，你可以获得一项未获得过且与杀或伤害相关的技能，此【杀】结算完毕后，你失去以此法获得的技能',
			nsfuge:'覆戈',
			nsfuge_info:'你的回合结束后，你可以执行一个额外的回合，此回合的摸牌阶段，你于摸牌阶段额外摸X张牌（X为你已损失的体力值）；若如此做，直到洗牌前，你不能再发动此技能',
			nstanbing:'谈兵',
			nstanbing_info:'摸牌阶段开始时，你可弃置一张牌，然后摸X张牌(X为你弃置牌的名称字数)，若如此做，本回合你不可使用或打出【杀】',
			nsxinzhan:'心战',
			nsxinzhan_info:'出牌阶段限一次，你可将任意张手牌交给一名其他角色，若如此做，该角色失去X点体力(X为你交给其的牌张数的一半，向下取整)，若你给的牌达到六张，则改为该角色失去一点体力上限',
			nsfuhuo:'符火',
			nsfuhuo2:'符火',
			nsfuhuo_info:'出牌阶段限一次，你可将一张手牌置于一名武将牌上没有“符”的角色的武将牌上，称为“符”，若如此做，其回合外使用或打出【闪】时，你可令其判定，若结果为：红桃，你对其造成2点火焰伤害；方块，你弃置其一张手牌，然后对其造成1点火焰伤害。你的下个回合开始时，你获得其武将牌上的“符”',
			nswangfeng:'望风',
			nswangfeng_info:'在判定牌生效前，你可以打出一张红色牌替换之',
			nshunji:'混击',
			nshunji_info:'出牌阶段限一次，你可以摸一张牌，视为使用一张【万箭齐发】。此【万箭齐发】造成伤害时，受伤害角色选择一项：①弃置你一张牌；②摸一张牌',
			nscuanquan:'篡权',
			nscuanquan_info:'锁定技，如果你的身份为忠臣，则在受伤三次后与主公，互换身份和体力上限',
			nsjianning:'奸佞',
			nsjianning_info:'出牌阶段限一次，如果你的身份为内奸，你可以与一名手牌数比你少的角色交换手牌，并对其造成一点伤害',
			nschangshi:'常仕',
			nschangshi_info:'出牌阶段限一次，如果你的身份为反贼，你可以指定两名其他角色互换体力；如果两名角色体力之差等于1，你失去一点体力',
			nsbaquan:'霸权',
			nsbaquan_info:'回合结束时，你可以弃置所有手牌，并获得相应点数的护甲，你的新一回合开始时清除所有护甲',
			nsbugua:'卜卦',
			nsbugua_use_info:'弃置一张牌，并将牌堆顶的六张牌反面朝上逐张按先后顺序排放，然后抛骰子，展示牌序号与骰子显示的点数一致的牌，然后你根据这张牌的花色、点数随机获得牌堆中相应的一张牌',
			nsbugua_info:'出牌阶段限一次，你可以弃置一张牌，并将牌堆顶的六张牌反面朝上逐张按先后顺序排放，然后抛骰子，展示牌序号与骰子显示的点数一致的牌，然后你根据这张牌的花色、点数按以下规则随机获得牌堆中相应的一张牌：乾（红桃偶数）：无中生有；坤（黑桃奇数）：决斗；震（黑桃偶数）：南蛮入侵；巽（红桃奇数）：万箭齐发；坎（梅花偶数）：过河拆桥、兑（梅花奇数）：借刀杀人、艮（方片偶数）：顺手牵羊、离（方片奇数）：火攻。若牌堆中无此牌则摸一张牌，然后你观看未展示的另外五张牌并按任意顺序将其置于牌堆顶。',
			nstuiyan:'推演',
			nstuiyan_info:'出牌阶段，若你使用的牌点数比上一张使用的牌点数大，你可以摸一张牌，反之你本回合不能再以此法摸牌；当你使用的牌点数首次达到8的倍数时，你可以在结算后立即发动一次【卜卦】',
			nstianji:'天机',
			nstianji_info:'限定技，当一名其他角色进入濒死状态，你可自减一点体力上限，令其回复体力至1并增加一点体力上限',
			nszhaoxin:'昭心',
			nszhaoxin_info:'锁定技，你始终展示手牌',
			nsxiuxin:'修穆',
			nsxiuxin_info:'锁定技，若你没有某种花色的手牌，你不能成为这种花色的牌的目标',
			nsshijun:'弑君',
			nsshijun_info:'锁定技，你造成伤害时，你令此伤害+1，并在结算后失去一点体力',
			nshunyou:'魂佑',
			nshunyou_info:'出阶段限一次，你可以弃置一张基本牌，获得弃牌堆底的一张装备牌和一张锦囊牌，然后你可以将那张装备牌装备给一名角色（允许替换）。如果弃牌堆没有装备以及锦囊牌，则改为摸X张牌，X为损失的体力加一（最多3张）',
			nswulie:'武烈',
			nswulie_info:'限定技，准备阶段，你可以失去1点体力上限，从弃牌堆选择最多三张牌以任意顺序放置于牌堆顶。若如此做，此回合的结束阶段，你可以重复此操作',
			nscangxi:'藏玺',
			nscangxi2:'藏玺',
			nscangxi_info:'主公技，其他吴势力角色的弃牌阶段结束时，若其弃置了至少两张牌，则可以选择判定，若是黑色，则其选择一项，1，令主公摸一张并且展示；2，主公手牌上限永久加一；3，额外弃置一张牌，令主公获得本回合进入弃牌堆的一张牌',
			nsdongcha:'洞察',
			nsdongcha_info:'锁定技，单体锦囊牌无法对你造成伤害。其它角色于其回合内第二次使用锦囊牌指定你为目标时，取消之',
			nscaijian:'才鉴',
			nscaijian_info:'出牌阶段限一次，若你的手牌数不大于你的体力上限，则你可以展示你的手牌，观看牌堆顶相同数量的牌并以任意方式交换之',
			nsgongjian:'恭俭',
			nsgongjian_info:'锁定技，弃牌阶段，你须将弃牌交给一名体力值大于你的其它角色',
			nsjianxiong:'奸雄',
			nsjianxiong_info:'当你成为一名角色牌的目标后你可以对该角色使用一张牌，若此牌对其造成伤害，则该角色的牌失效。若失效的为黑色牌，则你摸一张牌',
			nsxionglue:'雄略',
			nsxionglue_info:'出牌阶段限一次，你可以弃置一张黑色手牌，然后发现一张锦囊牌',
			nsyaowang:'妖妄',
			nsyaowang_info:'回合开始阶段你可以选择一名角色然后获得其其中一项技能直到回合结束，然后该角色随机获得一项未上场武将的其中一项技能直到其回合结束',
			nshuanhuo:'幻惑',
			nshuanhuo_info:'每当你流失一点体力或受到一次大于2的伤害时，你可以交换除你之外的两名角色的武将牌（体力及体力上限不变）',
			nsjianshu:'剑术',
			nsjianshu_info:'锁定技：每当你的装备区有武器时，你使用【杀】指定一个目标后，该角色需要依次使用两张【闪】才能抵消此【杀】',
			nscangjian:'藏剑',
			nscangjian_info:'每当你对一名角色造成伤害，你可以获得其装备区一张牌',
			nsyunxing:'陨星',
			nsyunxing_info:'锁定技，当场上一名角色死亡，若为蜀，你失去一点体力；若为吴，你回复一点体力；若为魏，你摸一张牌并弃置一名角色的手牌；若为群，你强制结束当前回合；若为你，你可以使一名角色翻面',
			nsguanxing:'观星',
			nsguanxing_info:'锁定技，准备阶段，你观看牌堆的X张牌(X为场上存活人数)并且任意移动Y张牌(Y为你当前体力值)',
			nscaiyi:'猜疑',
			nscaiyi_info:'其他角色摸牌后，你可以观看其摸到的牌，若其中有【杀】，则视为你对其使用一张【杀】，若其中没有【杀】，则视为其对你使用一张【杀】（计入出杀次数）',
			nsgefa:'割发',
			nsgefa_info:'当你的体力值等于0或更低时，你可以将任意一张♣牌当【桃】使用',
			nshaoling:'号令',
			nshaoling_info:'限定技，出牌阶段，你可以指定一名其他角色，令另外所有其他角色角色选择一项：1、对该角色使用一张【杀】；2、交给你一张牌，然后视为你对其使用一张【杀】',
			nspinmin:'拼命',
			nspinmin_info:'锁定技，当你于回合内死亡时，你不死亡并增加一点体力上限（每回合最多增加1点且不能超过4）；当你于回合外死亡时，你不死亡并减少一点体力上限（体力上限为0会导致你死亡）',
			nsshishou:'失手',
			nsshishou_info:'锁定技，当你于回合内失去手牌时，你失去一点体力并摸一张牌；你回合内使用的牌数不能超过4',
			nsduijue:'对决',
			nsduijue_info:'出牌阶段开始时，你可以弃置一张手牌，若如此做，此阶段你可以将一张与此牌颜色不同的手牌当作[决斗]使用（限2次）',
			nsshuangxiong:'双雄',
			nsshuangxiong_info:'当你使用[决斗]或被使用[决斗]时，你可以将武将牌翻面',
			nsshuangxiong_append:'背面武将：文丑，2体力，你可以将一张牌当[杀]打出',
			nsguanyong:'冠勇',
			nsguanyong_info:'你可以将一张牌当[杀]打出',
			nsjihui:'急恚',
			nsjihui_info:'锁定技，每当一名角色一次弃置了三张或更多的牌，你获得一个额外回合；你的额外回合内，你使用牌只能指定你与上一回合角色为目标',
			nsmouyun:'谋运',
			nsmouyun_info:'每两轮限一次，你可以弃置场上体力值最少的一名其他角色区域内的X张牌。（X为其损失的体力值）',
			nscongjun:'从军',
			nscongjun_info:'锁定技，游戏开始时，你变身为一名随机男性角色；当一名敌方角色使用无懈可击时，你有小概率亮出此武将并变回花木兰，然后对该角色造成2点伤害',
			nshuanxian:'幻仙',
			nshuanxian_info:'锁定技，游戏开始时，你获得随从“幻身·右”，当你首次受到伤害时，你获得随从“幻身·左”（体力上限2，初始手牌2）；你与幻身在摸牌阶段均少摸一张牌；在你的回合中（如果有对应幻身），你以【幻身·左-本体-幻身·右】的顺序进行3个连续回合',
			nstaiping:'太平',
			nstaiping_info:'当你受到一点伤害后（首次伤害除外），你可以选择一项: ①令一个“幻身”增加一点体力上限。②令一个“幻身”回复一点体力。',
			nsshoudao:'授道',
			nsshoudao_info:'当左右“幻身”全部死亡时，你获得技能“雷击”和“鬼道”。当你死亡时，若此时有两个“幻身”，你可以令一名其他角色获得技能“雷击”和“鬼道”。若有一个“幻身”，你可以令一名其他角色获得技能“雷击”或“鬼道”。(杀死你的角色除外)',
			nsnongquan:'弄权',
			nsnongquan_info:'出牌阶段，你可以将最后一张手牌当作【无中生有】使用',
			nsdufu:'毒妇',
			nsdufu_info:'每当你即将造成一次伤害时，你可以为此伤害重新指定伤害来源',
			diyjizhi:'集智',
			diyjizhi_info:'当你使用一张装备牌或锦囊牌时，你可以摸一张牌并展示之，若此牌是基本牌，你须弃置一张手牌，每回合限3次',
			yiesheng:'回雪',
			yiesheng_info:'出牌阶段，你可以弃置任意数量的黑色手牌，然后摸等量的牌。',
			liangji:'环计',
			liangji_info:'出牌阶段限一次，你可以选择一名未以此法放置牌的其他角色并将一张手牌置于其武将牌上。目标角色于摸牌阶段开始时，获得此牌。若其为男性角色，则获得技能【无双】，若其为女性角色，则获得技能【离间】，直到回合结束。',
			chengmou:'逞谋',
			chengmou_info:'摸牌阶段开始时，若你有“功”牌，你获得之并跳过摸牌阶段，若你所获得的“功”牌多于两张，你须失去一点体力。',
			jugong:'居功',
			jugong_info:'回合外每名角色的回合限一次，每当场上有角色因受到【杀】或【决斗】造成的伤害，你可以摸一张牌并且将一张手牌置于你的武将牌上，称之为“功”。在你即将受到伤害时，你可以弃置两张“功”，防止此伤害。',
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
			diy_tieba:'吧友设计',
			diy_default:'常规',
			diy_key:'论外',
		},
	};
});
