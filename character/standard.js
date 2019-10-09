'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'standard',
		connect:true,
		characterSort:{
			standard:{
				standard_2008:["caocao","simayi","xiahoudun","zhangliao","xuzhu","guojia","zhenji","liubei","guanyu","zhangfei","zhugeliang","zhaoyun","machao","huangyueying","sunquan","ganning","lvmeng","huanggai","zhouyu","daqiao","luxun","sunshangxiang","huatuo","lvbu","diaochan",],
				standard_2013:["huaxiong","re_yuanshu"],
				standard_2019:["gongsunzan","caozhang","xf_yiji"],
			},
		},
		character:{
			caocao:['male','wei',4,['hujia','jianxiong'],['zhu']],
			simayi:['male','wei',3,['fankui','guicai']],
			xiahoudun:['male','wei',4,['ganglie']],
			zhangliao:['male','wei',4,['tuxi']],
			xuzhu:['male','wei',4,['luoyi']],
			guojia:['male','wei',3,['tiandu','yiji']],
			zhenji:['female','wei',3,['luoshen','qingguo']],
			liubei:['male','shu',4,['rende','jijiang'],['zhu']],
			guanyu:['male','shu',4,['wusheng']],
			zhangfei:['male','shu',4,['paoxiao']],
			zhugeliang:['male','shu',3,['guanxing','kongcheng']],
			zhaoyun:['male','shu',4,['longdan']],
			machao:['male','shu',4,['mashu','tieji']],
			huangyueying:['female','shu',3,['jizhi','qicai']],
			sunquan:['male','wu',4,['zhiheng','jiuyuan'],['zhu']],
			ganning:['male','wu',4,['qixi']],
			lvmeng:['male','wu',4,['keji']],
			huanggai:['male','wu',4,['kurou']],
			zhouyu:['male','wu',3,['yingzi','fanjian']],
			daqiao:['female','wu',3,['guose','liuli']],
			luxun:['male','wu',3,['qianxun','lianying']],
			sunshangxiang:['female','wu',3,['xiaoji','jieyin']],
			huatuo:['male','qun',3,['qingnang','jijiu']],
			lvbu:['male','qun',4,['wushuang']],
			diaochan:['female','qun',3,['lijian','biyue']],
			huaxiong:['male','qun',6,['yaowu']],
			gongsunzan:['male','qun',4,['yicong']],
			
			caozhang:['male','wei',4,['new_jiangchi']],
			xf_yiji:["male","shu",3,["xinfu_jijie","xinfu_jiyuan"],[]],
			re_yuanshu:['male','qun',4,['wangzun','tongji']],
		},
		characterIntro:{
			liubei:'先主姓刘，讳备，字玄德，涿郡涿县人，汉景帝子中山靖王胜之后也。以仁德治天下。',
			guanyu:'字云长，本字长生，并州河东解州人。五虎上将之首，爵至汉寿亭侯，谥曰“壮缪侯”。被奉为“关圣帝君”，崇为“武圣”。',
			zhangfei:'字翼德，涿郡人，燕颔虎须，豹头环眼。有诗云：“长坂坡头杀气生，横枪立马眼圆睁。一声好似轰雷震，独退曹家百万兵”。',
			zhugeliang:'字孔明，号卧龙，琅琊阳都人，蜀汉丞相。在世时被封为武乡侯，谥曰忠武侯。著有《出师表》、《诫子书》等。怀不世之才，以空城戏司马，能观星象而通鬼神。',
			zhaoyun:'字子龙，常山真定人。身长八尺，姿颜雄伟。长坂坡单骑救阿斗，先主云：“子龙一身都是胆也。”',
			machao:'字孟起，扶风茂陵人。面如冠玉，目如流星，虎体猿臂，彪腹狼腰，声雄力猛。因衣着讲究，举止非凡，故人称“锦马超”。麾铁骑，捻金枪。',
			huangyueying:'荆州沔南白水人，沔阳名士黄承彦之女，诸葛亮之妻，诸葛瞻之母。容貌甚丑，而有奇才：上通天文，下察地理，韬略近于诸书无所不晓，诸葛亮在南阳闻其贤而迎娶。',
			sunquan:'吴大帝，字仲谋，吴郡富春县人。统领吴与蜀魏三足鼎立，制衡天下。',
			ganning:'字兴霸，巴郡临江人，祖籍荆州南阳郡。为人勇猛刚强，忠心耿耿，勇往无前。曾带兵百人于二更奇袭曹营，大挫其锐气。',
			lvmeng:'字子明，汝南富陂人。陈寿评曰：“吕蒙勇而有谋断，识军计，谲郝普，擒关羽，最其妙者。初虽轻果妄杀，终于克己，有国士之量，岂徒武将而已乎！”',
			huanggai:'字公覆，零陵郡泉陵县人。官至偏将军、武陵太守。以苦肉计骗曹孟德，亲往诈降，火烧战船，重创敌军。',
			zhouyu:'字公瑾，庐江舒县人，任东吴三军大都督，雄姿英发，人称“美周郎”。赤壁之战前，巧用反间计杀了精通水战的叛将蔡瑁、张允。',
			daqiao:'庐江皖县人，为乔公长女，孙策之妻，小乔之姊。与小乔并称为“江东二乔”，容貌国色流离。',
			luxun:'本名陆议，字伯言，吴郡吴县人。历任东吴大都督、丞相。吴大帝孙权兄孙策之婿，世代为江东大族。以谦逊之书麻痹关羽，夺取荆州，又有火烧连营大破蜀军。',
			sunshangxiang:'孙夫人，乃孙权之妹。刘备定荆州，孙权进妹与其结姻，重固盟好。孙夫人才捷刚猛，有诸兄之风。后人为其立庙，号曰“枭姬庙”。',
			caocao:'魏武帝曹操，字孟德，小名阿瞒、吉利，沛国谯人。精兵法，善诗歌，乃治世之能臣，乱世之奸雄也。',
			simayi:'晋宣帝，字仲达，河内温人。曾任职过曹魏的大都督，太尉，太傅。少有奇节，聪明多大略，博学洽闻，伏膺儒教，世之鬼才也。',
			xiahoudun:'字元让，沛国谯人。有拔矢啖睛之勇，性格勇猛刚烈。',
			zhangliao:'字文远，魏雁门马邑人。官至前将军、征东将军、晋阳侯。武功高强，又谋略过人，多次建立奇功，以800人突袭孙权十万大军，皆望风披靡。',
			xuzhu:'字仲康，谯国谯县人。和典韦一同统率着曹操的亲卫队“虎卫军”。因为他十分勇猛，所以有“虎痴”的绰号。曾有裸衣斗马超之举。',
			guojia:'字奉孝，颍川阳翟人，官至军师祭酒。惜天妒英才，英年早逝。有诗云：“良计环环不遗策，每临制变满座惊”。',
			zhenji:'中山无极人，别称甄洛或甄宓，庙号文昭甄皇后。魏文帝曹丕的正室。懂诗文，有倾国倾城之貌，《洛神赋》即是曹植为她所作。',
			huatuo:'字元化，一名旉，沛国谯人，“建安三神医”之一。集平生之所得著《青囊经》，现已失传。',
			lvbu:'字奉先，五原郡九原县人。三国第一猛将，曾独力战刘关张三人，其武力世之无双。时人语曰：“人中有吕布，马中有赤兔。”',
			diaochan:'中国古代四大美女之一，有闭月羞花之貌。司徒王允之义女，由王允授意施行连环计，离间董卓、吕布，借布手除卓。后貂蝉成为吕布的妾。',
			huaxiong:'董卓旗下名将，自荐抵抗山东地区反对董卓的诸侯联军于汜水关前，他先后斩杀济北相鲍信之弟鲍忠和孙坚部将祖茂、以及袁术部将俞涉和韩馥手下潘凤等人，最后关东联军派出关羽与之一对一决斗而被杀。',
			
			xf_yiji:"伊籍，字机伯，生卒年不详，兖州山阳郡（今山东金乡县）人，三国时期蜀汉官员。年少时依附于同乡刘表。刘备落难到荆州时，伊籍时常拜访，托请刘备照顾。建安十三年（208年），刘表病死，伊籍便转投刘备，一起渡江南下。建安十六年（211年），刘备入蜀帮助刘璋，伊籍亦有跟随。随后刘备和刘璋双方决裂。建安十九年（214年），刘备平定益州，任命伊籍为左将军从事中郎，其待遇次于简雍、孙乾等。后升任昭文将军，并与诸葛亮、法正、刘巴、李严共同编制《蜀科》。",
		},
		perfectPair:{
			xiahoudun:['xiahouyuan'],
			zhenji:['caopi'],
			caocao:['xuzhu','dianwei','bianfuren'],
			huangzhong:['weiyan'],
			zhugeliang:['huangyueying','jiangwei','jiangfei'],
			liubei:['guanyu','zhangfei','ganfuren'],
			zhaoyun:['liushan'],
			daqiao:['xiaoqiao'],
			zhouyu:['huanggai','xiaoqiao'],
			sunquan:['zhoutai'],
			lvbu:['diaochan'],
			machao:['madai','mayunlu'],
			zhangliao:['zangba'],
			ganning:['lingtong'],
		},
		skill:{
			hujia:{
				audio:2,
				audioname:['re_caocao'],
				unique:true,
				zhuSkill:true,
				trigger:{player:'chooseToRespondBegin'},
				filter:function(event,player){
					if(event.responded) return false;
					if(player.storage.hujiaing) return false;
					if(!player.hasZhuSkill('hujia')) return false;
					if(event.filterCard({name:'shan'})==false) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='wei';
					});
				},
				check:function(event,player){
					if(get.damageEffect(player,event.player,player)>=0) return false;
					return true;
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.finish();
					}
					else if(event.current.group=='wei'){
						if((event.current==game.me&&!_status.auto)||(
							get.attitude(event.current,player)>2)||
							event.current.isOnline()){
							player.storage.hujiaing=true;
							var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张闪？',{name:'shan'});
							next.set('ai',function(){
								var event=_status.event;
								return (get.attitude(event.player,event.source)-2);
							});
							next.set('skillwarn','替'+get.translation(player)+'打出一张闪');
							next.autochoose=lib.filter.autoRespondShan;
							next.set('source',player);
						}
					}
					"step 1"
					player.storage.hujiaing=false;
					if(result.bool){
						event.finish();
						trigger.result=result;
						trigger.responded=true;
						trigger.animate=false;
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(0);
					}
				},
			},
			jianxiong:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0])=='d';
				},
				content:function(){
					player.gain(trigger.cards,'gain2');
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
			fankui:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					return (event.source&&event.source.countGainableCards(player,'he')&&event.num>0&&event.source!=player);
				},
				content:function(){
					player.gainPlayerCard(get.prompt('fankui',trigger.source),trigger.source,get.buttonValue,'he').set('logSkill',['fankui',trigger.source]);
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
			guicai:{
				audio:2,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('guicai'),'h').set('ai',function(card){
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
						player.respond(result.cards,'guicai','highlight');
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
						if(!get.owner(result.cards[0],'judge')){
							trigger.position.appendChild(result.cards[0]);
						}
						game.log(trigger.player,'的判定牌改为',result.cards[0]);
						game.delay(2);
					}
				},
				ai:{
					tag:{
						rejudge:1,
					}
				}
			},	
			ganglie:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return (event.source!=undefined);
				},
				check:function(event,player){
					return (get.attitude(player,event.source)<=0);
				},
				logTarget:'source',
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.suit(card)=='heart') return -2;
						return 2;
					})
					"step 1"
					if(result.judge<2){
						event.finish();return;
					}
					trigger.source.chooseToDiscard(2).set('ai',function(card){
						if(card.name=='tao') return -10;
						if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
						return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					});
					"step 2"
					if(result.bool==false){
						trigger.source.damage();
					}
				},
				ai:{
					maixie_defend:true,
					effect:{
						target:function(card,player,target){
							if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
							return 0.8;
							// if(get.tag(card,'damage')&&get.damageEffect(target,player,player)>0) return [1,0,0,-1.5];
						}
					}
				}
			},
			tuxi:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check;
					var i,num=game.countPlayer(function(current){
						return current!=player&&current.countCards('h')&&get.attitude(player,current)<=0;
					});
					check=(num>=2);
					player.chooseTarget(get.prompt('tuxi'),'获得其他一至两名角色的各一张手牌',[1,2],function(card,player,target){
						return target.countCards('h')>0&&player!=target;
					},function(target){
						if(!_status.event.aicheck) return 0;
						var att=get.attitude(_status.event.player,target);
						if(target.hasSkill('tuntian')) return att/10;
						return 1-att;
					}).set('aicheck',check);
					"step 1"
					if(result.bool){
						player.logSkill('tuxi',result.targets);
						player.gainMultiple(result.targets);
						trigger.cancel();
					}
					else{
						event.finish();
					}
					"step 2"
					game.delay();
				},
				ai:{
					threaten:2,
					expose:0.3
				}
			},
			luoyi:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				check:function(event,player){
					if(player.countCards('h')<3) return false;
					if(!player.hasSha()) return false;
					return game.hasPlayer(function(current){
						return get.attitude(player,current)<0&&player.canUse('sha',current);
					});
				},
				content:function(){
					player.addTempSkill('luoyi2','phaseEnd');
					trigger.num--;
				}
			},
			luoyi2:{
				trigger:{source:'damageBegin'},
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
			tiandu:{
				audio:2,
				audioname:['re_guojia','xizhicai'],
				trigger:{player:'judgeEnd'},
				frequent:function(event){
					if(event.result.card.name=='du') return false;
					if(get.mode()=='guozhan') return false;
					return true;
				},
				check:function(event){
					if(event.result.card.name=='du') return false;
					return true;
				},
				filter:function(event,player){
					if(get.owner(event.result.card)){
						return false;
					}
					if(event.nogain&&event.nogain(event.result.card)){
						return false;
					}
					return true;
				},
				content:function(){
					player.gain(trigger.result.card);
					player.$gain2(trigger.result.card);
				}
			},
			yiji:{
				audio:2,
				trigger:{player:'damageEnd'},
				frequent:true,
				filter:function(event){
					return (event.num>0)
				},
				content:function(){
					"step 0"
					event.cards=get.cards(2*trigger.num);
					"step 1"
					if(event.cards.length>1){
						player.chooseCardButton('将“遗计”牌分配给任意角色',true,event.cards,[1,event.cards.length]).set('ai',function(button){
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
				ai:{
					maixie:true,
					maixie_hp:true,
					effect:{
						target:function(card,player,target){
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
								if(target.hp>=4) return [1,num*2];
								if(target.hp==3) return [1,num*1.5];
								if(target.hp==2) return [1,num*0.5];
							}
						}
					}
				}
			},
			luoshen:{
				audio:2,
				trigger:{player:'phaseBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					},ui.special);
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains('luoshen')){
							player.chooseBool('是否再次发动【洛神】？');
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])!='s'){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards);
						if(event.cards.length){
							player.$draw(event.cards);
						}
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						player.gain(event.cards);
						if(event.cards.length){
							player.$draw(event.cards);
						}
					}
				}
			},
			xinluoshen:{
				audio:'luoshen',
				// alter:true,
				trigger:{player:'phaseBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(event.cards==undefined) event.cards=[];
					player.judge(function(card){
						if(get.color(card)=='black') return 1.5;
						return -1.5;
					},ui.special);
					"step 1"
					if(result.judge>0){
						event.cards.push(result.card);
						if(lib.config.autoskilllist.contains('luoshen')){
							player.chooseBool('是否再次发动【洛神】？');
						}
						else{
							event._result={bool:true};
						}
					}
					else{
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])!='s'){
								event.cards.splice(i,1);i--;
							}
						}
						player.gain(event.cards,'gain2');
						player.storage.xinluoshen=event.cards.slice(0);
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.goto(0);
					}
					else{
						if(event.cards.length){
							player.gain(event.cards,'gain2');
							player.storage.xinluoshen=event.cards.slice(0);
						}
					}
				},
				mod:{
					ignoredHandcard:function(card,player){
						if(get.is.altered('xinluoshen')&&player.storage.xinluoshen&&player.storage.xinluoshen.contains(card)){
							return true;
						}
					}
				},
				group:'xinluoshen_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.xinluoshen;
						}
					}
				}
			},
			qingguo:{
				audio:2,
				enable:['chooseToRespond'],
				filterCard:function(card){
					return get.color(card)=='black';
				},
				viewAs:{name:'shan'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{color:'black'})) return false;
				},
				prompt:'将一张黑色手牌当闪打出',
				check:function(){return 1},
				ai:{
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('h',{color:'black'})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					}
				}
			},
			rende:{
				audio:2,
				group:['rende1'],
				enable:'phaseUse',
				filterCard:true,
				selectCard:[1,Infinity],
				discard:false,
				prepare:'give',
				filterTarget:function(card,player,target){
					return player!=target;
				},
				check:function(card){
					if(ui.selected.cards.length>1) return 0;
					if(ui.selected.cards.length&&ui.selected.cards[0].name=='du') return 0;
					if(!ui.selected.cards.length&&card.name=='du') return 20;
					var player=get.owner(card);
					if(player.hp==player.maxHp||player.storage.rende<0||player.countCards('h')<=1){
						if(ui.selected.cards.length){
							return -1;
						}
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
					target.gain(cards,player);
					if(typeof player.storage.rende!='number'){
						player.storage.rende=0;
					}
					if(player.storage.rende>=0){
						player.storage.rende+=cards.length;
						if(player.storage.rende>=2){
							player.recover();
							player.storage.rende=-1;
						}
					}
				},
				ai:{
					order:function(skill,player){
						if(player.hp<player.maxHp&&player.storage.rende<2&&player.countCards('h')>1){
							return 10;
						}
						return 1;
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
							if(player.hp==player.maxHp||player.storage.rende<0||player.countCards('h')<=1){
								if(nh>=np-1&&np<=player.hp&&!target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1,5-nh);
						}
					},
					effect:{
						target:function(card,player,target){
							if(player==target&&get.type(card)=='equip'){
								if(player.countCards('e',{subtype:get.subtype(card)})){
									var players=game.filterPlayer();
									for(var i=0;i<players.length;i++){
										if(players[i]!=player&&get.attitude(player,players[i])>0){
											return 0;
										}
									}
								}
							}
						}
					},
					threaten:0.8
				}
			},
			rende1:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				content:function(){
					player.storage.rende=0;
				}
			},
			jijiang:{
				audio:'jijiang1',
				audioname:['liushan','re_liubei'],
				unique:true,
				group:['jijiang1','jijiang2'],
				zhuSkill:true,
			},
			jijiang1:{
				audio:2,
				audioname:['liushan','re_liubei'],
				trigger:{player:'chooseToRespondBegin'},
				check:function(event){
					if(event.jijiang) return false;
					return true;
				},
				filter:function(event,player){
					if(event.responded) return false;
					if(player.storage.jijianging) return false;
					if(!player.hasZhuSkill('jijiang')) return false;
					if(event.filterCard({name:'sha'},player,event)==false) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='shu';
					});
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						event.finish();
					}
					else if(event.current.group=='shu'){
						player.storage.jijianging=true;
						var next=event.current.chooseToRespond('是否替'+get.translation(player)+'打出一张杀？',{name:'sha'});
						next.set('ai',function(){
							var event=_status.event;
							return (get.attitude(event.player,event.source)-2);
						});
						next.set('source',player);
						next.set('jijiang',true);
						next.set('skillwarn','替'+get.translation(player)+'打出一张杀');
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					player.storage.jijianging=false;
					if(result.bool){
						event.finish();
						trigger.result=result;
						trigger.responded=true;
						trigger.animate=false;
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(0);
					}
				}
			},
			jijiang2:{
				audio:'jijiang1',
				audioname:['liushan','re_liubei'],
				enable:'chooseToUse',
				filter:function(event,player){
					if(event.filterCard&&!event.filterCard({name:'sha'},player,event)) return false;
					if(!player.hasZhuSkill('jijiang')) return false;
					if(player.hasSkill('jijiang3')) return false;
					if(!lib.filter.cardUsable({name:'sha'},player)) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.group=='shu';
					});
				},
				filterTarget:function(card,player,target){
					if(_status.event._backup&&
						typeof _status.event._backup.filterTarget=='function'&&
						!_status.event._backup.filterTarget({name:'sha'},player,target)){
						return false;
					}
					return player.canUse({name:'sha'},target);
				},
				content:function(){
					"step 0"
					if(event.current==undefined) event.current=player.next;
					if(event.current==player){
						player.addSkill('jijiang3');
						event.getParent(2).step=0;
						event.finish();
					}
					else if(event.current.group=='shu'){
						var next=event.current.chooseToRespond('是否替'+get.translation(player)+'对'+get.translation(target)+'使用一张杀',
						function(card,player,event){
							event=event||_status.event;
							return card.name=='sha'&&event.source.canUse(card,event.target);
						});
						next.set('ai',function(card){
							var event=_status.event;
							return get.effect(event.target,card,event.source,event.player);
						});
						next.set('source',player);
						next.set('target',target);
						next.set('jijiang',true);
						next.set('skillwarn','替'+get.translation(player)+'打出一张杀');
						next.autochoose=lib.filter.autoRespondSha;
					}
					else{
						event.current=event.current.next;
						event.redo();
					}
					"step 1"
					if(result.bool){
						event.finish();
						if(result.cards&&result.cards.length==1&&result.cards[0].name=='sha'){
							player.useCard(result.cards[0],target).animate=false;
						}
						else{
							player.useCard({name:'sha'},target).animate=false;
						}
						if(typeof event.current.ai.shown=='number'&&event.current.ai.shown<0.95){
							event.current.ai.shown+=0.3;
							if(event.current.ai.shown>0.95) event.current.ai.shown=0.95;
						}
					}
					else{
						event.current=event.current.next;
						event.goto(0);
					}
				},
				ai:{
					result:{
						target:function(player,target){
							if(player.hasSkill('jijiang3')) return 0;
							return get.effect(target,{name:'sha'},player,target);
						}
					},
					order:function(){
						return get.order({name:'sha'})-0.1;
					},
				}
			},
			jijiang3:{
				trigger:{global:['useCardAfter','useSkillAfter','phaseAfter']},
				silent:true,
				filter:function(event){
					return event.skill!='jijiang2'&&event.skill!='qinwang2';
				},
				content:function(){
					player.removeSkill('jijiang3');
				}
			},
			wusheng:{
				audio:2,
				audioname:['re_guanyu','guanzhang','jsp_guanyu','guansuo'],
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card,player){
					if(get.zhu(player,'shouyue')) return true;
					return get.color(card)=='red';
				},
				position:'he',
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(get.zhu(player,'shouyue')){
						if(!player.countCards('he')) return false;
					}
					else{
						if(!player.countCards('he',{color:'red'})) return false;
					}
				},
				prompt:'将一张红色牌当杀使用或打出',
				check:function(card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(get.zhu(player,'shouyue')){
							if(!player.countCards('he')) return false;
						}
						else{
							if(!player.countCards('he',{color:'red'})) return false;
						}
					},
					respondSha:true,
				}
			},
			paoxiao:{
				audio:2,
				audioname:['re_zhangfei','guanzhang','xiahouba'],
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&player.getStat().card.sha>1&&event.getParent().type=='phase';
				},
				content:function(){},
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha') return Infinity;
					}
				},
				ai:{
					unequip:true,
					skillTagFilter:function(player,tag,arg){
						if(!get.zhu(player,'shouyue')) return false;
						if(arg&&arg.name=='sha') return true;
						return false;
					}
				}
			},
			xinguanxing:{
				audio:'guanxing',
				// alter:true,
				trigger:{player:['phaseBegin','phaseEnd']},
				frequent:true,
				filter:function(event,player,name){
					if(name=='phaseEnd'){
						return player.hasSkill('xinguanxing_on');
					}
					return true;
				},
				content:function(){
					'step 0'
					if(get.is.altered('xinguanxing')){
						event.num=game.countPlayer()<4?3:5;
					}
					else{
						event.num=Math.min(5,game.countPlayer());
					}
					event.cards=get.cards(event.num);
					event.chosen=[];
					event.num1=0;
					event.num2=0;
					event.bottom=-1;
					'step 1'
					var js=player.getCards('j');
					var pos;
					var choice=-1;
					var getval=function(card,pos){
						if(js[pos]){
							return (get.judge(js[pos]))(card);
						}
						else if(event.triggername=='phaseEnd'&&get.attitude(player,player.getNext())<=0){
							return 11.5-get.value(card,player);
						}
						else{
							return get.value(card,player);
						}
					};
					event.discard=false;
					var minval=6;
					for(pos=0;pos<event.cards.length;pos++){
						var max=getval(event.cards[pos],pos);
						for(var j=pos+1;j<event.cards.length;j++){
							var current=getval(event.cards[j],pos);
							if(current>max){
								choice=j;
								max=current;
							}
						}
						if(event.bottom<0){
							if(!js[pos]){
								if(max<minval){
									event.bottom=pos;
								}
							}
							else if(max<0){
								event.bottom=pos;
							}
						}
						if(event.bottom>=0&&event.bottom<=pos){
							choice=pos;
							event.discard=true;break;
						}
						if(choice!=-1){
							break;
						}
					}
					player.chooseCardButton('观星：选择要移动的牌',event.cards).set('filterButton',function(button){
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
						var controlai=event.pos||0;
						if(event.discard){
							controlai=event.cards.length+1;
						}
						var buttons=event.cards.slice(0);
						player.chooseControl(function(){
							return _status.event.controlai;
						}).set('controlai',controlai).set('sortcard',buttons).set('tosort',card);
					}
					else{
						event.goto(4);
					}
					'step 3'
					if(typeof result.index=='number'){
						if(result.index>event.cards.length){
							ui.cardPile.appendChild(event.card);
							event.num2++;
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
						event.num1++;
					}
					var js=player.getCards('j');
					if(js.length==1){
						if((get.judge(js[0]))(ui.cardPile.firstChild)<0){
							player.addTempSkill('guanxing_fail');
						}
					}
					player.popup(get.cnNumber(event.num1)+'上'+get.cnNumber(event.num2)+'下');
					game.log(player,'将','#y'+get.cnNumber(event.num1)+'张牌','置于牌堆顶，','#y'+get.cnNumber(event.num2)+'张牌','置于牌堆底');
					if(event.triggername=='phaseBegin'&&get.is.altered('xinguanxing')&&event.num1==0){
						player.addTempSkill('xinguanxing_on');
					}
				},
				subSkill:{
					on:{}
				}
			},
			guanxing_oldnew:{
				audio:2,
				audioname:['jiangwei'],
				trigger:{player:'phaseBegin'},
				frequent:true,
				content:function(){
					'step 0'
					event.num=Math.min(5,game.countPlayer());
					if(event.name!='yizhi'&&player.hasSkill('yizhi')) event.num=5;
					event.cards=get.cards(event.num);
					event.chosen=[];
					event.num1=0;
					event.num2=0;
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
					player.chooseCardButton('观星：选择要移动的牌',event.cards).set('filterButton',function(button){
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
							event.num2++;
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
						event.num1++;
					}
					var js=player.getCards('j');
					if(js.length==1){
						if((get.judge(js[0]))(ui.cardPile.firstChild)<0){
							player.addTempSkill('guanxing_fail');
						}
					}
					player.popup(get.cnNumber(event.num1)+'上'+get.cnNumber(event.num2)+'下');
					game.log(player,'将','#y'+get.cnNumber(event.num1)+'张牌','置于牌堆顶，','#y'+get.cnNumber(event.num2)+'张牌','置于牌堆底');
				},
				ai:{
					guanxing:true
				}
			},
			guanxing_fail:{},
			guanxing:{
				audio:2,
				audioname:['jiangwei'],
				trigger:{player:'phaseBegin'},
				frequent:true,
				content:function(){
					"step 0"
					if(player.isUnderControl()){
						game.modeSwapPlayer(player);
					}
					var num=Math.min(5,game.countPlayer());
					if(player.hasSkill('yizhi')&&player.hasSkill('guanxing')){
						num=5;
					}
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
						player.popup(get.cnNumber(top.length)+'上'+get.cnNumber(event.cards.length-top.length)+'下');
						game.log(player,'将'+get.cnNumber(top.length)+'张牌置于牌堆顶');
						game.updateRoundNumber();
						game.delay(2);
					}
				},
				ai:{
					threaten:1.2
				}
			},
			kongcheng:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(target.countCards('h')==0){
							if(card.name=='sha'||card.name=='juedou') return false;
						}
					}
				},
				group:'kongcheng1',
				ai:{
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					}
				}
			},
			kongcheng1:{
				audio:2,
				trigger:{player:'loseEnd'},
				forced:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){}
			},
			longdan:{
				audio:'longdan_sha',
				audioname:['re_zhaoyun'],
				group:['longdan_sha','longdan_shan','longdan_draw'],
				subSkill:{
					draw:{
						trigger:{player:['useCard','respond']},
						forced:true,
						popup:false,
						filter:function(event,player){
							if(!get.zhu(player,'shouyue')) return false;
							return event.skill=='longdan_sha'||event.skill=='longdan_shan';
						},
						content:function(){
							player.draw();
							player.storage.fanghun2++;
						}
					},
					sha:{
						audio:2,
						audioname:['re_zhaoyun'],
						enable:['chooseToUse','chooseToRespond'],
						filterCard:{name:'shan'},
						viewAs:{name:'sha'},
						viewAsFilter:function(player){
							if(!player.countCards('h','shan')) return false;
						},
						prompt:'将一张闪当杀使用或打出',
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.6
								}
							},
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.countCards('h','shan')) return false;
							},
							order:function(){
								return get.order({name:'sha'})+0.1;
							},
							useful:-1,
							value:-1
						}
					},
					shan:{
						audio:'longdan_sha',
						audioname:['re_zhaoyun'],
						enable:['chooseToRespond'],
						filterCard:{name:'sha'},
						viewAs:{name:'shan'},
						prompt:'将一张杀当闪打出',
						check:function(){return 1},
						viewAsFilter:function(player){
							if(!player.countCards('h','sha')) return false;
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.countCards('h','sha')) return false;
							},
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondShan')&&current<0) return 0.6
								}
							},
							order:4,
							useful:-1,
							value:-1
						}
					}
				}
			},
			mashu:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-1;
					}
				}
			},
			feiying:{
				mod:{
					globalTo:function(from,to,distance){
						return distance+1;
					}
				}
			},
			tieji:{
				audio:2,
				trigger:{player:'shaBegin'},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				logTarget:'target',
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.zhu(_status.event.player,'shouyue')){
							if(get.suit(card)!='spade') return 2;
						}
						else{
							if(get.color(card)=='red') return 2;
						}
						return -0.5;
					});
					"step 1"
					if(result.bool){
						trigger.directHit=true;
					}
				}
			},
			jizhi:{
				audio:2,
				audioname:['jianyong'],
				trigger:{player:'useCard'},
				frequent:true,
				filter:function(event){
					return (get.type(event.card)=='trick'&&(!event.cards.length||event.cards[0]&&event.cards[0]==event.card));
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				}
			},
			xinjizhi:{
				audio:'jizhi',
				trigger:{player:'useCard'},
				frequent:true,
				// alter:true,
				filter:function(event){
					if(!get.is.altered('xinjizhi')&&get.type(event.card)=='delay') return false;
					return (get.type(event.card,'trick')=='trick'&&event.cards[0]&&event.cards[0]==event.card);
				},
				init:function(player){
					player.storage.xinjizhi=0;
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(get.is.altered('xinjizhi')&&get.type(result[0])=='basic'){
						event.card=result[0];
						player.chooseBool('是否弃置'+get.translation(event.card)+'并令本回合手牌上限+1？').set('ai',function(evt,player){
							return _status.currentPhase==player&&player.needsToDiscard(-3)&&_status.event.value<6;
						}).set('value',get.value(event.card,player));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.discard(event.card);
						player.storage.xinjizhi++;
						if(_status.currentPhase==player){
							player.markSkill('xinjizhi');
						}
					}
				},
				ai:{
					threaten:1.4,
					noautowuxie:true,
				},
				mod:{
					maxHandcard:function(player,num){
						if(get.is.altered('xinjizhi')&&_status.currentPhase==player){
							return num+player.storage.xinjizhi;
						}
						return num;
					}
				},
				intro:{
					content:'本回合手牌上限+#'
				},
				group:'xinjizhi_clear',
				subSkill:{
					clear:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.storage.xinjizhi=0;
							player.unmarkSkill('xinjizhi');
						}
					}
				}
			},
			qicai:{
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					}
				},
			},
			xinqicai:{
				// alter:true,
				mod:{
					targetInRange:function(card,player,target,now){
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					},
					canBeDiscarded:function(card){
						if(get.is.altered('xinqicai')&&get.position(card)=='e') return false;
					},
					cardDiscardable:function(card){
						if(get.is.altered('xinqicai')&&get.position(card)=='e') return false;
					}
				},
			},
			xinzhiheng:{
				audio:'zhiheng',
				enable:'phaseUse',
				// alter:true,
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				check:function(card){
					var player=_status.event.player;
					if(get.is.altered('xinzhiheng')&&get.position(card)=='h'&&!player.countCards('h',function(card){
						return get.value(card)>=8;
					})){
						return 8-get.value(card);
					}
					return 6-get.value(card)
				},
				delay:0,
				content:function(){
					'step 0'
					if(!player.hasSkill('xinzhiheng_delay')) game.delayx();
					'step 1'
					player.draw(cards.length);
				},
				group:'xinzhiheng_draw',
				subSkill:{
					draw:{
						trigger:{player:'loseEnd'},
						silent:true,
						filter:function(event,player){
							if(event.getParent(2).skill!='xinzhiheng') return false;
							if(!get.is.altered('xinzhiheng')) return false;
							if(player.countCards('h')) return false;
							for(var i=0;i<event.cards.length;i++){
								if(event.cards[i].original=='h') return true;
							}
							return false;
						},
						content:function(){
							player.draw();
							player.addTempSkill('xinzhiheng_delay','xinzhihengAfter');
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
			zhiheng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:[1,Infinity],
				prompt:'弃置任意张牌并摸等量的牌',
				check:function(card){
					return 6-get.value(card)
				},
				content:function(){
					player.draw(cards.length);
				},
				ai:{
					order:1,
					result:{
						player:1
					},
					threaten:1.5
				},
			},
			jiuyuan:{
				audio:2,
				unique:true,
				trigger:{target:'taoBegin'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(event.player==player) return false;
					if(!player.hasZhuSkill('jiuyuan')) return false;
					if(player.hp>0) return false;
					if(event.player.group!='wu') return false;
					return true;
				},
				content:function(){
					player.recover();
				}
			},
			xinjiuyuan:{
				audio:'jiuyuan',
				unique:true,
				// alter:true,
				trigger:{target:'taoBegin'},
				zhuSkill:true,
				forced:true,
				filter:function(event,player){
					if(get.is.altered('xinjiuyuan')) return false;
					if(event.player==player) return false;
					if(!player.hasZhuSkill('jiuyuan')) return false;
					if(player.hp>0) return false;
					if(event.player.group!='wu') return false;
					return true;
				},
				content:function(){
					player.recover();
				},
				global:'xinjiuyuan2',
			},
			xinjiuyuan2:{
				audio:'jiuyuan',
				forceaudio:true,
				trigger:{player:'taoBegin'},
				filter:function(event,player){
					if(!get.is.altered('xinjiuyuan')) return false;
					if(player.group!='wu') return false;
					return game.hasPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('xinjiuyuan',player);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(target){
						return player!=target&&target.isDamaged()&&target.hp<player.hp&&target.hasZhuSkill('xinjiuyuan',player);
					});
					list.sortBySeat();
					event.list=list;
					'step 1'
					if(event.list.length){
						var current=event.list.shift();
						event.current=current;
						player.chooseBool(get.prompt('xinjiuyuan',current)).set('choice',get.attitude(player,current)>0);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.logSkill('xinjiuyuan',event.current);
						event.current.recover();
						player.draw();
					}
					event.goto(1);
				}
			},
			qixi:{
				audio:2,
				audioname:['ganning','re_ganning'],
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='black';
				},
				position:'he',
				viewAs:{name:'guohe'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{color:'black'})) return false;
				},
				prompt:'将一张黑色牌当过河拆桥使用',
				check:function(card){return 4-get.value(card)}
			},
			keji:{
				audio:2,
				audioname:['re_lvmeng','sp_lvmeng'],
				trigger:{player:'phaseDiscardBefore'},
				frequent:function(event,player){
					return player.needsToDiscard();
				},
				filter:function(event,player){
					return player.countUsed('sha')==0;
				},
				content:function(){
					trigger.cancel();
				}
			},
			kurou:{
				audio:4,
				enable:'phaseUse',
				prompt:'失去一点体力并摸两张牌',
				content:function(){
					"step 0"
					player.loseHp(1);
					"step 1"
					player.draw(2);
				},
				ai:{
					basic:{
						order:1
					},
					result:{
						player:function(player){
							if(player.countCards('h')>=player.hp-1) return -1;
							if(player.hp<3) return -1;
							return 1;
						}
					}
				}
			},
			yingzi:{
				audio:2,
				audioname:['sp_lvmeng'],
				trigger:{player:'phaseDrawBegin'},
				frequent:true,
				content:function(){
					trigger.num++;
				},
				ai:{
					threaten:1.3
				}
			},
			fanjian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return player!=target;
				},
				content:function(){
					"step 0"
					target.chooseControl('heart2','diamond2','club2','spade2').set('ai',function(event){
						switch(Math.floor(Math.random()*6)){
							case 0:return 'heart2';
							case 1:case 4:case 5:return 'diamond2';
							case 2:return 'club2';
							case 3:return 'spade2';
						}
					});
					"step 1"
					game.log(target,'选择了'+get.translation(result.control));
					event.choice=result.control;
					target.popup(event.choice);
					event.card=player.getCards('h').randomGet();
					target.gain(event.card,player,'give');
					game.delay();
					"step 2"
					if(get.suit(event.card)+'2'!=event.choice) target.damage('nocard');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var eff=get.damageEffect(target,player);
							if(eff>=0) return 1+eff;
							var value=0,i;
							var cards=player.getCards('h');
							for(i=0;i<cards.length;i++){
								value+=get.value(cards[i]);
							}
							value/=player.countCards('h');
							if(target.hp==1) return Math.min(0,value-7);
							return Math.min(0,value-5);
						}
					}
				}
			},
			guose:{
				audio:2,
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>0;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.suit(card)=='diamond';
				},
				position:'he',
				viewAs:{name:'lebu'},
				prompt:'将一张方片牌当乐不思蜀使用',
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},
			liuli:{
				audio:2,
				audioname:['re_daqiao','daxiaoqiao'],
				trigger:{target:'shaBefore'},
				direct:true,
				priority:5,
				filter:function(event,player){
					if(player.countCards('he')==0) return false;
					return game.hasPlayer(function(current){
						return get.distance(player,current,'attack')<=1&&current!=event.player&&
							current!=player&&lib.filter.targetEnabled(event.card,event.player,current);
					});
				},
				content:function(){
					"step 0"
					var next=player.chooseCardTarget({
						position:'he',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event.getTrigger();
							if(get.distance(player,target,'attack')<=1&&
								target!=trigger.player){
								if(player.canUse(trigger.card,target)) return true;
							}
							return false;
						},
						ai1:function(card){
							return get.unuseful(card)+9;
						},
						ai2:function(target){
							if(_status.event.player.countCards('h','shan')){
								return -get.attitude(_status.event.player,target);
							}
							if(get.attitude(_status.event.player,target)<5){
								return 6-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==1&&player.countCards('h','shan')==0){
								return 10-get.attitude(_status.event.player,target);
							}
							if(_status.event.player.hp==2&&player.countCards('h','shan')==0){
								return 8-get.attitude(_status.event.player,target);
							}
							return -1;
						},
						prompt:get.prompt('liuli'),
						prompt2:'弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色',
					});
					"step 1"
					if(result.bool){
						player.discard(result.cards);
						var target=result.targets[0];
						player.logSkill(event.name,target);
						trigger.target=target;
						var evt=trigger.getParent();
						if(evt&&evt.targets&&evt.num){
							trigger.targets[evt.num]=target;
							evt.targets[evt.num]=target;
						}
					}
					else{
						event.finish();
					}
					"step 2"
					trigger.untrigger();
					trigger.trigger('useCardToBefore');
					trigger.trigger('shaBefore');
					game.delay();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.countCards('he')==0) return;
							if(card.name!='sha') return;
							var min=1;
							var friend=get.attitude(player,target)>0;
							var vcard={name:'shacopy',nature:card.nature,suit:card.suit};
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(player!=players[i]&&
									get.attitude(target,players[i])<0&&
									target.canUse(card,players[i])){
									if(!friend) return 0;
									if(get.effect(players[i],vcard,player,player)>0){
										if(!player.canUse(card,players[0])){
											return [0,0.1];
										}
										min=0;
									}
								}
							}
							return min;
						}
					}
				}
			},
			qianxun:{
				mod:{
					targetEnabled:function(card,player,target,now){
						if(card.name=='shunshou'||card.name=='lebu') return false;
					}
				},
			},
			lianying:{
				audio:2,
				trigger:{player:'loseEnd'},
				frequent:true,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:0.8,
					effect:{
						target:function(card){
							if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						}
					},
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					}
				}
			},
			xiaoji:{
				audio:2,
				audioname:['sp_sunshangxiang'],
				trigger:{player:'loseEnd'},
				frequent:true,
				filter:function(event,player){
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='e') return true;
					}
					return false;
				},
				content:function(){
					var num=0;
					for(var i=0;i<trigger.cards.length;i++){
						if(trigger.cards[i].original=='e') num+=2;
					}
					player.draw(num);
				},
				ai:{
					noe:true,
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip') return [1,3];
						}
					}
				}
			},
			jieyin:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				selectCard:2,
				check:function(card){
					var player=get.owner(card);
					if(player.countCards('h')>player.hp)
						return 8-get.value(card)
					if(player.hp<player.maxHp)
						return 6-get.value(card)
					return 4-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(target.sex!='male') return false;
					if(target.hp>=target.maxHp) return false;
					if(target==player) return false;
					return true;
				},
				content:function(){
					player.recover();
					target.recover();
				},
				ai:{
					order:5.5,
					result:{
						player:function(player){
							if(player.hp<player.maxHp) return 4;
							if(player.countCards('h')>player.hp) return 0
							return -1;
						},
						target:4
					},
					threaten:2,
				}
			},
			xinjieyin:{
				group:['xinjieyin_old','xinjieyin_new'],
				// alter:true,
				subSkill:{
					new:{
						audio:'jieyin',
						enable:'phaseUse',
						filterCard:true,
						usable:1,
						position:'he',
						filter:function(event,player){
							if(!get.is.altered('xinjieyin')) return false;
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
							if(get.position(card)=='e'&&target.countCards('e',{subtype:get.subtype(card)})) return false;
							return true;
						},
						discard:false,
						delay:0,
						lose:false,
						content:function(){
							'step 0'
							if(get.position(cards[0])=='e'){
								player.$give(cards,target);
								target.equip(cards[0]);
							}
							else{
								player.discard(cards);
							}
							'step 1'
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
					old:{
						audio:'jieyin',
						enable:'phaseUse',
						filterCard:true,
						usable:1,
						selectCard:2,
						filter:function(event,player){
							if(get.is.altered('xinjieyin')) return false;
							return player.countCards('h')>=2;
						},
						check:function(card){
							var player=get.owner(card);
							if(player.countCards('h')>player.hp)
								return 8-get.value(card)
							if(player.hp<player.maxHp)
								return 6-get.value(card)
							return 4-get.value(card)
						},
						filterTarget:function(card,player,target){
							if(target.sex!='male') return false;
							if(target.hp>=target.maxHp) return false;
							if(target==player) return false;
							return true;
						},
						content:function(){
							player.recover();
							target.recover();
						},
						ai:{
							order:5.5,
							result:{
								player:function(player){
									if(player.hp<player.maxHp) return 4;
									if(player.countCards('h')>player.hp) return 0
									return -1;
								},
								target:4
							}
						}
					}
				},
				ai:{
					threaten:2.3
				}
			},
			qingnang:{
				audio:2,
				enable:'phaseUse',
				filterCard:true,
				usable:1,
				check:function(card){
					return 9-get.value(card)
				},
				filterTarget:function(card,player,target){
					if(target.hp>=target.maxHp) return false;
					return true;
				},
				content:function(){
					target.recover();
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							if(target.hp==1) return 5;
							if(player==target&&player.countCards('h')>player.hp) return 5;
							return 2;
						}
					},
					threaten:2
				}
			},
			jijiu:{
				audio:2,
				audioname:['re_huatuo'],
				enable:'chooseToUse',
				filter:function(event,player){
					return _status.currentPhase!=player;
				},
				filterCard:function(card){
					return get.color(card)=='red';
				},
				position:'he',
				viewAs:{name:'tao'},
				prompt:'将一张红色牌当桃使用',
				check:function(card){return 15-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						return player.countCards('he',{color:'red'})>0&&_status.currentPhase!=player;
					},
					threaten:1.5,
					save:true,
					respondTao:true,
				}
			},
			wushuang:{
				audio:'wushuang1',
				forced:true,
				locked:true,
				group:['wushuang1','wushuang2']
			},
			wushuang1:{
				audio:2,
				audioname:['re_lvbu'],
				trigger:{player:'shaBegin'},
				forced:true,
				filter:function(event,player){
					return !event.directHit;
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
			wushuang2:{
				audio:2,
				audioname:['re_lvbu'],
				trigger:{player:'juedou',target:'juedou'},
				forced:true,
				filter:function(event,player){
					return event.turn!=player;
				},
				priority:-1,
				content:function(){
					"step 0"
					var next=trigger.turn.chooseToRespond({name:'sha'},'请打出一张杀响应决斗');
					next.set('prompt2','（共需打出2张杀）');
					next.autochoose=lib.filter.autoRespondSha;
					next.set('ai',function(card){
						var player=_status.event.player;
						var trigger=_status.event.getTrigger();
						if(get.attitude(trigger.turn,player)<0&&trigger.turn.countCards('h','sha')>1){
							return get.unuseful2(card);
						}
						return -1;
					});
					"step 1"
					if(result.bool==false){
						trigger.directHit=true;
					}
				},
				ai:{
					result:{
						target:function(card,player,target){
							if(card.name=='juedou'&&target.countCards('h')>0) return [1,0,0,-1];
						}
					}
				}
			},
			lijian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.countPlayer(function(current){
						return current!=player&&current.sex=='male';
					})>1;
				},
				check:function(card){return 10-get.value(card)},
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					if(player==target) return false;
					if(target.sex!='male') return false;
					if(ui.selected.targets.length==1){
						return target.canUse({name:'juedou'},ui.selected.targets[0]);
					}
					return true;
				},
				targetprompt:['先出杀','后出杀'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					targets[1].useCard({name:'juedou'},targets[0],'noai').animate=false;
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return -3;
							}
							else{
								return get.effect(target,{name:'juedou'},ui.selected.targets[0],target);
							}
						}
					},
					expose:0.4,
					threaten:3,
				}
			},
			biyue:{
				audio:2,
				trigger:{player:'phaseEnd'},
				frequent:true,
				content:function(){
					player.draw();
				},
			},
			xinbiyue:{
				audio:'biyue',
				trigger:{player:'phaseEnd'},
				frequent:true,
				// alter:true,
				content:function(){
					var num=1;
					if(get.is.altered('xinbiyue')&&!player.countCards('h')){
						num=2;
					}
					player.draw(num);
				},
			},
			yaowu:{
				trigger:{player:'damage'},
				priority:1,
				audio:2,
				filter:function(event){
					if(event.card&&(event.card.name=='sha')){
						if(get.color(event.card)=='red') return true;
					}
					return false;
				},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					trigger.source.chooseDrawRecover(true);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&(get.color(card)=='red')){
								return [1,-2];
							}
						}
					}
				}
			},
			"new_jiangchi":{
				audio:"jiangchi",
				trigger:{
					player:"phaseDrawEnd",
				},
				direct:true,
				content:function (){
					"step 0"
					var list=['弃牌','摸牌','取消'];
					if(!player.countCards('he')) list.remove('弃牌');
					player.chooseControl(list,function(){
						var player=_status.event.player;
						if(list.contains('弃牌')){
							if(player.countCards('h')>3&&player.countCards('h','sha')>1){
								return '弃牌';
							}
							if(player.countCards('h','sha')>2){
								return '弃牌';
							}
						}
						if(!player.countCards('h','sha')){
							return '摸牌';
						}
						return 'cancel2';
					}).set('prompt',get.prompt('new_jiangchi')).set('prompt2',get.translation('new_jiangchi_info'));
					"step 1"
					if(result.control=='弃牌'){
						player.chooseToDiscard(true,'he');
						player.addTempSkill('jiangchi2','phaseUseEnd');
						player.logSkill('new_jiangchi');
					}
					else if(result.control=='摸牌'){
						player.draw();
						player.addTempSkill('jiangchi3','phaseUseEnd');
						player.logSkill('new_jiangchi');
					}
				},
			},
		},
		translate:{
			caocao:'曹操',
			hujia:'护驾',
			hujia_info:'主公技，当你需要使用或打出一张【闪】时，你可以令其他魏势力角色选择是否打出一张【闪】。若有角色相应，则你视为使用或打出了一张【闪】。',
			jianxiong:'奸雄',
			jianxiong_info:'当你受到伤害后，你可以获得对你造成伤害的牌。',

			simayi:'司马懿',
			fankui:'反馈',
			fankui_info:'当你受到伤害后，你可以获得伤害来源的一张牌。',
			guicai:'鬼才',
			guicai_info:'一名角色的判定牌生效前，你可以打出一张手牌代替之。',

			xiahoudun:'夏侯惇',
			zhangliao:'张辽',
			xuzhu:'许褚',
			guojia:'郭嘉',
			zhenji:'甄姬',
			liubei:'刘备',
			guanyu:'关羽',
			zhangfei:'张飞',
			zhugeliang:'诸葛亮',
			zhaoyun:'赵云',
			machao:'马超',
			huangyueying:'黄月英',
			sunquan:'孙权',
			ganning:'甘宁',
			lvmeng:'吕蒙',
			huanggai:'黄盖',
			zhouyu:'周瑜',
			daqiao:'大乔',
			luxun:'陆逊',
			sunshangxiang:'孙尚香',
			huatuo:'华佗',
			lvbu:'吕布',
			diaochan:'貂蝉',
			huaxiong:'华雄',
			"xf_yiji":"伊籍",
			re_yuanshu:'袁术',
			caozhang:'曹彰',
			
			ganglie:'刚烈',
			tuxi:'突袭',
			luoyi:'裸衣',
			luoyi2:'裸衣',
			tiandu:'天妒',
			yiji:'遗计',
			luoshen:'洛神',
			xinluoshen:'洛神',
			qingguo:'倾国',
			rende:'仁德',
			jijiang:'激将',
			jijiang1:'激将',
			jijiang2:'激将',
			wusheng:'武圣',
			paoxiao:'咆哮',
			guanxing:'观星',
			kongcheng:'空城',
			kongcheng1:'空城',
			longdan:'龙胆',
			longdan1:'龙胆',
			longdan2:'龙胆',
			mashu:'马术',
			feiying:'飞影',
			tieji:'铁骑',
			jizhi:'集智',
			qicai:'奇才',
			zhiheng:'制衡',
			jiuyuan:'救援',
			qixi:'奇袭',
			keji:'克己',
			kurou:'苦肉',
			yingzi:'英姿',
			fanjian:'反间',
			guose:'国色',
			liuli:'流离',
			qianxun:'谦逊',
			lianying:'连营',
			xiaoji:'枭姬',
			jieyin:'结姻',
			xinjieyin:'结姻',
			qingnang:'青囊',
			jijiu:'急救',
			wushuang:'无双',
			wushuang1:'无双',
			wushuang2:'无双',
			lijian:'离间',
			biyue:'闭月',
			xinbiyue:'闭月',
			pileTop:'牌堆顶',
			pileBottom:'牌堆底',
			ganglie_info:'当你受到伤害后，你可以进行一次判定。若结果不为红桃，则伤害来源须弃置两张手牌，否则受到来自你的一点伤害。',
			tuxi_info:'摸牌阶段，你可以改为获得至多两名其他角色的各一张手牌。',
			luoyi_info:'摸牌阶段，你可以少摸一张牌。若如此做，你本回合内使用【杀】或【决斗】造成的伤害+1。',
			tiandu_info:'当你的判定牌生效后，你可以获得之。',
			yiji_info:'当你受到一点伤害后，你可以观看牌堆顶的两张牌，然后将其分配给任意角色。',
			luoshen_info:'准备阶段，你可以进行一次判定。若结果为黑色，则可以继续判定，直到出现红色的判定牌。然后你获得所有黑色的判定牌。',
			xinluoshen_info:'准备阶段，你可以进行一定判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌',
			xinluoshen_info_alter:'准备阶段，你可以进行一定判定，若为黑色则可以继续判定，直到出现红色。然后你获得所有黑色的判定牌。你通过洛神获得的牌，不计入当前回合的手牌上限',
			qingguo_info:'你可以将一张黑色手牌当做【闪】使用或打出',
			rende_info:'出牌阶段，你可以将任意张手牌交给其他角色。当你以此法于一回合内给出第二张牌时，你回复1点体力。',
			jijiang_info:'主公技，当你需要使用或打出【杀】时，你可以令其他蜀势力角色依次选择是否打出一张【杀】。若有角色响应，则你视为使用或打出了一张【杀】。',
			wusheng_info:'你可以将一张红色牌当做【杀】使用或打出。',
			paoxiao_info:'锁定技，出牌阶段，你使用【杀】没有数量限制。',
			guanxing_info:'准备阶段，你可以观看牌堆顶的X张牌，并将其以任意顺序置于牌堆项或牌堆底。（X为存活角色数且至多为5）',
			xinguanxing:'观星',
			xinguanxing_info:'准备阶段，你可以观看牌堆顶的x张牌，并将其以任意顺序置于牌堆项或牌堆底，x为存活角色个数且不超过5',
			xinguanxing_info_alter:'准备阶段，你可以观看牌堆顶的5张牌（存活角色小于4时改为3张），并将其以任意顺序置于牌堆项或牌堆底，如果你把观星的牌都放在牌堆底，你可以在结束阶段再进行1次观星',
			kongcheng_info:'锁定技，当你没有手牌时，你不能成为【杀】或【决斗】的目标。',
			longdan_info:'你可以将【杀】当做【闪】，或将【闪】当做【闪】使用或打出',
			mashu_info:'锁定技，你计算与其他角色的距离时-1。',
			feiying_info:'锁定技，其他角色计算与你的距离时+1',
			tieji_info:'当你使用【杀】指定目标时，你可以进行一次判定。若结果为红色，则此【杀】不可被闪避。',
			jizhi_info:'当你使用一张非转化的普通锦囊牌时，你可以摸一张牌。',
			xinjizhi:'集智',
			xinjizhi_info:'每当你使用一张非转化的普通锦囊牌，可以摸一张牌',
			xinjizhi_info_alter:'每当你使用一张非转化的锦囊牌，可以摸一张牌，如果摸到的是基本牌，你可以弃置这张牌，然后本回合手牌上限+1',
			xinqicai:'奇才',
			xinqicai_info:'锁定技，你使用锦囊牌无距离限制。',
			xinqicai_info_alter:'锁定技，你使用的锦囊牌无距离限制，你装备区内的牌不能被弃置',
			qicai_info:'锁定技，你使用锦囊牌无距离限制。',
			zhiheng_info:'出牌阶段一次，你可以弃置任意张牌，然后摸等量的牌。',
			xinzhiheng:'制衡',
			xinzhiheng_info:'出牌阶段限1次，你可以弃置任意张牌并摸等量的牌',
			xinzhiheng_info_alter:'出牌阶段限1次，你可以弃置任意张牌并摸等量的牌，如果在发动制衡时弃置了所有手牌，你额外摸一张牌',
			jiuyuan_info:'主公技，锁定技，其他吴势力角色对濒死的你使用【桃】时，你额外回复一点体力。',
			xinjiuyuan:'救援',
			xinjiuyuan_info:'主公技，锁定技，濒死阶段，吴势力角色对你使用的[桃]额外回复一点体力',
			xinjiuyuan_info_alter:'主公技，其他吴国角色对自己使用【桃】时，如果他的体力值大于你，他可以选择让你回复1点体力，然后他摸1张牌',
			qixi_info:'你可以将一张黑色牌当做【过河拆桥】使用',
			keji_info:'若你于出牌阶段内没有过使用【杀】，则你可以跳过弃牌阶段。',
			kurou_info:'出牌阶段，你可以失去一点体力，然后摸两张牌。',
			yingzi_info:'摸牌阶段，你可以多摸一张牌。',
			fanjian_info:'出牌阶段限一次，你可以令一名角色选择一种花色并展示你的一张手牌，若选择的花色与展示的不同，该角色受到来自你的一点伤害。然后该角色获得展示的牌。',
			guose_info:'你可以将一张方片的手牌当做【乐不思蜀】使用。',
			liuli_info:'当你成为【杀】的目标时，你可以弃置一张牌并将此【杀】转移给攻击范围内的一名其他角色（不能是[杀]的使用者）。',
			qianxun_info:'锁定技，你不能成为【顺手牵羊】和【乐不思蜀】的目标',
			lianying_info:'当你失去最后的手牌时，你可以摸一张牌。',
			xiaoji_info:'当你失去一张装备区内的牌后，你可以摸两张牌。',
			jieyin_info:'出牌阶段限一次，你可以弃置两张手牌并选择一名已经受伤的男性角色。你与其各回复一点体力。',
			xinjieyin_info:'出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力，每阶段限一次',
			xinjieyin_old_info:'出牌阶段，你可以弃置两张牌并选择1名已经受伤的男性角色，你与其各回复一点体力，每阶段限一次',
			xinjieyin_new_info:'出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力',
			xinjieyin_info_alter:'出牌阶段限1次，你可以选择一名男性角色，弃置一张手牌或将一张装备牌置于其装备区，你与其体力较高的角色摸一张牌，体力值较低的角色回复1点体力',
			qingnang_info:'出牌阶段限一次，你可以弃置一张手牌并令一名角色回复一点体力。',
			jijiu_info:'你的回合外，你可以将一张红色牌当做【桃】使用。',
			wushuang_info:'锁定技，你使用的【杀】或【决斗】需要两张【闪】或【杀】响应。',
			lijian_info:'出牌阶段限一次，你可以弃置一张牌，视为一名男性角色对另一名男性角色使用一张【决斗】。',
			biyue_info:'结束阶段，你可以摸一张牌。',
			xinbiyue_info:'结束阶段，你可以摸一张牌',
			xinbiyue_info_alter:'结束阶段，你可以摸一张牌，如果你没有手牌，改为摸2张牌',
			yaowu:'耀武',
			yaowu_info:'锁定技，当任意一名角色使用红色【杀】对你造成伤害时，该角色回复1点体力或摸一张牌。',
			"new_jiangchi":"将驰",
			"new_jiangchi_info":"摸牌阶段结束时，你可以选择一项：1、摸一张牌，若如此做，你本回合内不能使用或打出【杀】。 2、弃置一张牌，若如此做，出牌阶段你使用【杀】无距离限制且你可以额外使用一张【杀】，直到回合结束。",
			
			standard_2008:"2008版标准包",
			standard_2013:"2013版标准包",
			standard_2019:"2019版标准包",
		},
	};
});
