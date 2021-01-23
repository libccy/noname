'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mobile',
		//connectBanned:['miheng'],
		connect:true,
		characterSort:{
			mobile:{
				mobile_default:["miheng","taoqian","lingcao","sunru","lifeng","zhuling","liuye","zhaotongzhaoguang","majun","simazhao","wangyuanji","pangdegong","shenpei","hujinding","zhangyì","jiakui","yangbiao","chendeng","dongcheng","yangyi","dengzhi","zhengxuan","sp_sufei","furong","dingyuan","simashi","yanghuiyu","hucheer"],
				mobile_yijiang:["yj_zhanghe","yj_zhangliao","yj_xuhuang","yj_ganning"],
				mobile_sunben:["re_sunben"],
				mobile_standard:["xin_xiahoudun","xin_zhangfei"],
				mobile_shenhua:["re_pangtong","re_guanqiujian","xin_yuanshao","re_liushan","re_dongzhuo","re_sp_zhugeliang","re_sunjian"],
				mobile_yijiang1:["re_jikang","old_bulianshi","xin_liaohua","xin_caozhang","re_xusheng","xin_chengpu","xin_jianyong","xin_gongsunzan","xin_zhuran","re_lingtong","re_liubiao"],
				mobile_sp:["old_yuanshu","re_wangyun","re_baosanniang","re_weiwenzhugezhi","re_zhanggong","re_xugong","re_heqi","liuzan","xin_hansui"],
			},
		},
		character:{
			xin_zhangfei:['male','shu',4,['new_repaoxiao','liyong']],
			xin_hansui:['male','qun',4,['xinniluan','xiaoxi_hansui']],
			hucheer:['male','qun',4,['daoji']],
			re_lingtong:['male','wu',4,['rexuanfeng']],
			re_liubiao:['male','qun',3,['zishou','rezongshi']],
			simashi:['male','wei',4,['baiyi','jinglve','shanli']],
			yanghuiyu:['female','wei',3,['hongyi','quanfeng']],
			xin_zhuran:['male','wu',4,['mobiledanshou']],
			xin_gongsunzan:['male','qun',4,['xinyicong','qiaomeng']],
			dingyuan:['male','qun',4,['beizhu']],
			xin_jianyong:['male','shu',3,['xinqiaoshui','xinjyzongshi']],
			xin_caozhang:['male','wei',4,['rejiangchi']],
			xin_liaohua:['male','shu',4,['redangxian','refuli']],
			furong:['male','shu',4,['xuewei','liechi']],
			re_dongzhuo:['male','qun',8,['rejiuchi','roulin','benghuai','baonue'],['zhu']],
			re_xusheng:['male','wu',4,['repojun']],
			sp_sufei:['male','qun',4,['zhengjian','gaoyuan']],
			yj_zhangliao:['male','qun',4,['weifeng']],
			yj_zhanghe:['male','qun',4,['xinzhilve']],
			yj_xuhuang:['male','qun',4,['xinxhzhiyan']],
			yj_ganning:['male','qun',4,['gnjinfan','gnsheque']],
			re_sunjian:['male','wu',4,['gzyinghun','repolu']],
			zhengxuan:['male','qun',3,['zhengjing']],
			dengzhi:['male','shu',3,['jimeng','shuaiyan']],
			xin_chengpu:['male','wu',4,['relihuo','chunlao']],
			yangyi:['male','shu',3,['duoduan','gongsun']],
			dongcheng:['male','qun',4,['chengzhao']],
			re_pangtong:['male','shu',3,['xinlianhuan','niepan'],[]],
			re_guanqiujian:['male','wei',4,['rezhengrong','rehongju']],
			chendeng:['male','qun',3,['zhouxuan','fengji']],
			re_heqi:['male','wu',4,['reqizhou','reshanxi']],
			yangbiao:['male','qun',3,['zhaohan','rangjie','yizheng']],
			re_sp_zhugeliang:["male","shu",3,["bazhen","rehuoji","rekanpo"],[]],
			xin_xiahoudun:['male','wei',4,['reganglie','xinqingjian']],
			zhangyì:['male','shu',4,['rezhiyi']],
			jiakui:['male','wei',3,['zhongzuo','wanlan']],
			re_jikang:["male","wei",3,["new_qingxian","new_juexiang"]],
			old_bulianshi:['female','wu',3,['anxu','zhuiyi']],
			miheng:['male','qun',3,['kuangcai','shejian']],
			taoqian:['male','qun',3,['zhaohuo','yixiang','yirang']],
			liuzan:['male','wu',4,['fenyin']],lingcao:['male','wu',4,['dujin']],
			sunru:['female','wu',3,['yingjian','shixin']],
			lifeng:['male','shu',3,['tunchu','shuliang']],
			zhuling:['male','wei',4,['xinzhanyi']],
			liuye:['male','wei',3,['polu','choulve']],
			zhaotongzhaoguang:["male","shu",4,["yizan_use","xinfu_longyuan"],[]],
			majun:["male","wei",3,["xinfu_jingxie1","qiaosi"],[]],
			simazhao:["male","wei",3,["xinfu_daigong","xinfu_zhaoxin"],[]],
			wangyuanji:["female","wei",3,["xinfu_qianchong","xinfu_shangjian"],[]],
			pangdegong:["male","qun",3,["xinfu_pingcai","xinfu_pdgyingshi"],[]],
			old_yuanshu:['male','qun',4,['xinyongsi','yjixi']],
			
			shenpei:["male","qun","2/3",["shouye","liezhi"],[]],
			re_wangyun:['male','qun',3,['relianji','remoucheng']],
			
			re_baosanniang:['female','shu',3,['meiyong','rexushen','rezhennan']],
			
			hujinding:['female','shu','2/6',['renshi','wuyuan','huaizi']],
			
			re_zhanggong:['male','wei',3,['reqianxin','rezhenxing']],
			re_xugong:['male','wu',3,['rebiaozhao','yechou']],
			re_weiwenzhugezhi:['male','wu',4,['refuhai']],
			
			xin_yuanshao:['male','qun',4,['reluanji','xueyi'],['zhu']],
			re_liushan:['male','shu',3,['xiangle','refangquan','ruoyu'],['zhu']],
			re_sunben:['male','wu',4,['jiang','rehunzi','zhiba'],['zhu']],
		},
		characterIntro:{
			hucheer:'胡车儿（生卒年不详），东汉末年武将，初从张绣，为其心腹猛将，勇冠三军，与贾诩交情甚佳。宛城大战后，张绣投降曹操，曹操爱胡车儿之骁勇，手以黄金与之。后因曹操私纳张绣亡叔张济的遗孀邹氏，张绣深感其辱，欲杀曹操，与贾诩商议后决心反曹。《三国演义》中，作者考虑到典韦的勇猛，便增加了令胡车儿盗走典韦的双戟的情节。最终典韦、曹昂（曹操长子）、曹安民（曹操侄子）皆死于此次战斗。野史说胡车儿跟随曹操征战，被赵云在长坂坡上红枪挑死。',
			simashi:'司马师（208年～255年3月23日），字子元，河内温县（今河南省温县）人。三国时期曹魏权臣，西晋王朝的奠基人之一，晋宣帝司马懿与宣穆皇后张春华的长子，晋文帝司马昭的同母兄，晋武帝司马炎的伯父。司马师沉着坚强，雄才大略，早年与夏侯玄、何晏齐名。高平陵政变后，以功封长平乡侯，旋加卫将军。司马懿死后，以抚军大将军辅政，独揽朝廷大权，次年升为大将军。掌权后，他制定选拔官吏的法规，命百官推荐贤才，整顿纲纪，使其各有职掌，朝野肃然。司马师也有卓越的军事才能，曾用计于新城之战击溃吴国诸葛恪的大军。嘉平六年（254年），魏帝曹芳与中书令李丰等人密谋除司马师，事情泄露，司马师杀死参与者，迫郭太后废曹芳，改立高贵乡公曹髦为帝。次年，亲自率兵平定毌丘俭、文钦之乱。回师途中病死，时年四十八岁，谥号“忠武”。后被追尊为晋景王。西晋建立后，被追尊为景皇帝，庙号世宗。',
			yanghuiyu:'羊徽瑜（214年－278年），泰山南城（今山东新泰）人，晋景帝司马师第三任妻子。羊徽瑜出身官宦世家泰山羊氏，她是南阳太守羊续的孙女，上党太守羊衜之女；其母为东汉名士左中郎将蔡邕之女、蔡文姬的姐妹。羊徽瑜聪慧贤德，嫁给司马师后未有子女。以司马师之弟司马昭的次子司马攸为继子。司马师死后，司马攸侍奉羊徽瑜非常孝顺。泰始元年（265年），司马昭长子司马炎受禅登基，建立西晋，追谥伯父司马师为景皇帝。泰始二年（266年），尊奉羊徽瑜为景皇后，因居弘训宫，故称弘训太后。咸宁四年（278年），羊徽瑜去世，时年六十五岁，谥号景献皇后，与司马师合葬峻平陵。',
			dingyuan:'丁原（？—189年），字建阳，兖州泰山郡南城县（山东省平邑县郑城镇）人。东汉末年军阀，官拜执金吾、并州刺史。任并州刺史期间，他亲近、善待主簿吕布，又调遣部下张杨、张辽等名将到洛阳任职。汉灵帝驾崩后，带兵进入洛阳，担任执金吾，并与大将军何进谋划诛杀十常侍，但不久事情败露，何进被宦官杀死。在宦官被诛灭之后，丁原与军阀董卓在废帝问题上意见不合产生矛盾，于是董卓诱使吕布将其杀害，其势力亦被吞并。',
			furong:'傅肜（róng）（？－222年），义阳（今湖北枣阳）人，三国时蜀汉将领。刘备攻伐吴国时，傅肜为别督。后刘备被陆逊击败，傅肜率部断后，奋战至死。死前怒斥道：“吴狗！何有汉将军降者！”',
			zhengxuan:'郑玄（127年－200年），字康成。北海郡高密县（今山东省高密市）人。东汉末年儒家学者、经学大师。郑玄曾入太学攻《京氏易》、《公羊春秋》及《三统历》、《九章算术》，又从张恭祖学《古文尚书》、《周礼》和《左传》等，最后从马融学古文经。游学归里之后，复客耕东莱，聚徒授课，弟子达数千人，家贫好学，终为大儒。党锢之祸起，遭禁锢，杜门注疏，潜心著述。晚年守节不仕，却遭逼迫从军，最终病逝于元城，年七十四。郑玄治学以古文经学为主，兼采今文经学。他遍注儒家经典，以毕生精力整理古代文化遗产，使经学进入了一个“小统一时代”。著有《天文七政论》、《中侯》等书，共百万余言，世称“郑学”，为汉代经学的集大成者。唐贞观年间，列郑玄于二十二“先师”之列，配享孔庙。宋代时被追封为高密伯。后人建有郑公祠以纪念。',
			dengzhi:'邓芝（178年－251年），字伯苗。义阳郡新野县（今河南新野）人。东汉名将邓禹之后，三国时期蜀汉重臣。邓芝早年曾被预言能位至大将，后被刘备任为郫令，升迁为广汉太守。因任官公廉且有治绩，被征入朝为尚书。刘备逝世后，奉命出使吴国，成功修复两国关系，并深为吴大帝孙权所赏识。建兴六年（228年），丞相诸葛亮策划北伐，命邓芝与大将赵云佯攻郿城，以吸引魏国曹真军主力。建兴十二年（234年），迁前军师、前将军，领兖州刺史，封阳武亭侯，不久督领江州。延熙六年（243年），迁车骑将军，后授假节。又率军平定涪陵叛乱。延熙十四年（251年），邓芝病逝。邓芝性格正直、简单，不刻意修饰情绪。他为将二十多年，赏罚明断，体恤士卒。身上的衣食取自官府，从未经营过私产，妻儿甚至还有忍饥挨饿之时，死时家中也没有多余财物。',
			yangyi:'杨仪（？－235年），字威公，襄阳（今湖北襄阳）人，三国时期蜀汉官员。最初为荆州刺史傅群的主簿，后投奔关羽，任为功曹。关羽遣其至成都，大受刘备赞赏，擢为尚书。因与尚书令刘巴不和，调为弘农太守。建兴三年（225年）任丞相参军，此后一直跟随诸葛亮战斗。亮卒，他部署安全退军。诸葛亮在生前定蒋琬继己任，杨仪仅拜中军师。建兴十三年（235年），因多出怨言，被削职流放至汉嘉郡。但杨仪仍不自省，又上书诽谤，言辞激烈，最后下狱，自杀身亡。',
			dongcheng:'董承（？~200年），字号不详，冀州河间人（今河北献县）人。东汉末年外戚大臣，汉灵帝母亲董太后侄子，汉献帝嫔妃董贵人之父。初从西凉军，为董卓女婿牛辅部曲。护卫汉献帝刘协从长安东归洛阳，拜为卫将军，受封列侯。建安四年（199年），拜车骑将军。自称领受汉献帝衣带诏，联合刘备、种辑、吴子兰、王子服、吴硕等人密谋诛杀曹操。五年正月，图谋泄露，董承诸人及董贵人全部遇害。',
			chendeng:'陈登（163—201），字元龙，下邳淮浦（今江苏涟水西）人。东汉末年将领、官员。沛相陈珪之子。为人爽朗，性格沈静，智谋过人，少年时有扶世济民之志，并且博览群书，学识渊博。二十五岁时，举孝廉，任东阳县长。虽然年轻，但他能够体察民情，抚弱育孤，深得百姓敬重。后来，徐州牧陶谦提拔他为典农校尉，主管一州农业生产。他亲自考察徐州的土壤状况，开发水利，发展农田灌溉，使汉末迭遭破坏的徐州农业得到一定程度的恢复，百姓们安居乐业，“秔稻丰积”。建安初奉使赴许，向曹操献灭吕布之策，被授广陵太守。以灭吕布有功，加伏波将军。又迁东城太守。年三十九卒。其子陈肃，魏文帝时追陈登之功，为郎中。',
			yangbiao:'杨彪（142年－225年），字文先。弘农郡华阴县（今陕西华阴）人。东汉末年名臣，太尉杨赐之子、名士杨修之父。杨彪少年时受家学熏陶，初举孝廉、茂才。其后征拜为议郎，参与续写《东观汉记》。任京兆尹时，揭发黄门令王甫的贪赃行为，使其被定罪诛杀。累任侍中、五官中郎将、卫尉等职。汉献帝时，遍历三公（司空、司徒、太尉）之职。权臣董卓意图迁都时，他据理力争。献帝东迁时，杨彪尽节护主。曹操挟献帝定都许县后，将杨彪下狱，获释后又任太常。他见汉室衰微，便诈称脚疾，不理世事。曹魏建立后，拒绝出任太尉，改光禄大夫，待以客礼。黄初六年（225年），杨彪去世，年八十四。其著作现仅存《答曹公书》一篇。',
			zhangyì:'张翼（？－264年），字伯恭，益州犍为郡武阳县人。三国时期蜀汉将领。历任梓潼、广汉、蜀郡三郡太守，出任庲降都督，后随诸葛亮和姜维北伐，官至左车骑将军，领冀州刺史。初封关内侯，进爵都亭侯。蜀汉灭亡后，魏将钟会密谋造反，成都大乱，张翼亦为乱兵所杀。张翼是蜀汉第三任庲降都督，由于执法严厉，不得南夷欢心。在北伐上，张翼认为国小民疲，不应滥用武力，是蜀汉朝廷当时极少敢当朝和姜维争辩北伐问题的大臣。',
			jiakui:'贾逵（174年—228年），本名贾衢，字梁道，河东襄陵人（今山西临汾县）。汉末三国时期魏国名臣，西晋开国功臣贾充父亲。初为并州郡吏，迁渑池县令，拜弘农太守，历仕曹操、曹丕、曹叡三世，是曹魏政权中具有军政才干的人物，终其一生为魏国统一事业作出卓越贡献。担任豫州刺史期间，兴修水利，凿通运河二百余里，时称“贾侯渠”，便利民生。随同曹丕伐吴，进封阳里亭侯，加号建威将军。石亭之战，率军救出曹休。太和二年，去世，赠本官，谥号为肃，《唐会要》将其尊为魏晋八君子之一。',
			shenpei:'审配（？－204年），字正南，魏郡阴安（今河北清丰北）人。为人正直， 袁绍领冀州，审配被委以腹心之任，并总幕府。河北平定，袁绍以审配、逢纪统军事，审配恃其强盛，力主与曹操决战。曾率领弓弩手大破曹军于官渡。官渡战败，审配二子被俘，反因此受谮见疑，幸得逢纪力保。袁绍病死，审配等矫诏立袁尚为嗣，导致兄弟相争，被曹操各个击破。曹操围邺，审配死守数月，终城破被擒，拒不投降，慷慨受死。',
			hujinding:'胡金定，女，传说中关羽之妻。关索之母，配偶关羽，出处《花关索传》和元代《三国志评话》民间传说人物。',
		},
		card:{
			pss_paper:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_scissor:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			pss_stone:{
				type:'pss',
				fullskin:true,
				//derivation:'shenpei',
			},
			db_atk1:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_atk2:{
				type:'db_atk',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def1:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
			db_def2:{
				type:'db_def',
				fullimage:true,
				//derivation:'shenpei',
			},
			ly_piliche:{
				fullskin:true,
				vanish:true,
				derivation:'liuye',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-8},
				skills:['ly_piliche'],
				destroy:'polu'
			},
			"wolong_card":{
				type:"takaramono",
				fullskin:true,
				//derivation:"pangdegong",
			},
			"fengchu_card":{
				type:"takaramono",
				fullskin:true,
				//derivation:"pangdegong",
			},
			"xuanjian_card":{
				fullskin:true,
				type:"takaramono",
				//derivation:"pangdegong",
			},
			"shuijing_card":{
				fullskin:true,
				type:"takaramono",
				//derivation:"pangdegong",
			},
			"rewrite_bagua":{
				derivation:"majun",
				//cardimage:"bagua",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
				skills:["rw_bagua_skill"],
			},
			"rewrite_baiyin":{
				derivation:"majun",
				fullskin:true,
				//cardimage:"baiyin",
				type:"equip",
				subtype:"equip2",
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				loseDelay:false,
				onLose:function(){
					var next=game.createEvent('rewrite_baiyin_recover');
					event.next.remove(next);
					var evt=event.getParent();
					if(evt.getlx===false) evt=evt.getParent();
					evt.after.push(next);
					next.player=player;
					next.setContent(function(){
						player.logSkill('rw_baiyin_skill');
						player.draw(2);
						player.recover();
					});
				},
				skills:["rw_baiyin_skill"],
				tag:{
					recover:1,
				},
				ai:{
					order:9.5,
					equipValue:function(card,player){
						if(player.hp==player.maxHp) return 5;
						if(player.countCards('h','rewrite_baiyin')) return 6;
						return 0;
					},
					basic:{
						equipValue:5,
					},
				},
			},
			"rewrite_lanyinjia":{
				derivation:"majun",
				//cardimage:"lanyinjia",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:["rw_lanyinjia","lanyinjia2"],
				ai:{
					equipValue:6,
					basic:{
						equipValue:1,
					},
				},
			},
			"rewrite_renwang":{
				derivation:"majun",
				//cardimage:"renwang",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				skills:["rw_renwang_skill"],
				ai:{
					basic:{
						equipValue:7.5,
					},
				},
			},
			"rewrite_tengjia":{
				derivation:"majun",
				//cardimage:"tengjia",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				//cardnature:"fire",
				ai:{
					equipValue:function(card,player){
						if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
						if(player.hasSkillTag('noDirectDamage')) return 10;
						if(get.damageEffect(player,player,player,'fire')>=0) return 10;
						var num=3-game.countPlayer(function(current){
							return get.attitude(current,player)<0;
						});
						if(player.hp==1) num+=4;
						if(player.hp==2) num+=1;
						if(player.hp==3) num--;
						if(player.hp>3) num-=4;
						return num;
					},
					basic:{
						equipValue:3,
					},
				},
				skills:["rw_tengjia1","rw_tengjia2","rw_tengjia3","rw_tengjia4"],
			},
			"rewrite_zhuge":{
				derivation:"majun",
				//cardimage:"zhuge",
				distance:{
					attackFrom:-2,
				},
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				ai:{
					equipValue:function(card,player){
						if(!game.hasPlayer(function(current){
							return player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
						})){
							return 1;
						}
						if(player.hasSha()&&_status.currentPhase==player){
							if(player.getEquip('zhuge')||player.getCardUsable('sha')==0){
								return 10;
							}
						}
						var num=player.countCards('h','sha');
						if(num>1) return 6+num;
						return 3+num;
					},
					basic:{
						equipValue:5,
					},
					tag:{
						valueswap:1,
					},
				},
				skills:["rw_zhuge_skill"],
			},
		},
		characterFilter:{
			simashi:function(mode){
				return !['boss','chess','tafang','stone','versus'].contains(mode);
			},
		},
		skill:{
			//铁骑飞
			liyong:{
				audio:'retishen',
				trigger:{player:'shaMiss'},
				forced:true,
				filter:function(event,player){
					return player.isPhaseUsing();
				},
				content:function(){
					trigger.getParent().liyong=true;
					player.addTempSkill('liyong2','phaseUseEnd');
				},
			},
			liyong2:{
				audio:'retishen',
				mark:true,
				intro:{
					content:'铁骑！强命！加伤！然后掉血嘞…',
				},
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					if(!event.card||event.card.name!='sha') return false;
					var evt=event.getParent();
					if(evt.liyong) return false;
					var history=player.getHistory('useCard',function(evt){
						return evt.card.name=='sha';
					});
					var evt2=history[history.indexOf(evt)-1];
					return evt2&&evt2.liyong;
				},
				logTarget:'target',
				content:function(){
					var target=trigger.target;
					target.addTempSkill('fengyin');
					trigger.directHit.add(target);
					var id=target.playerid;
					var map=trigger.customArgs;
					if(!map[id]) map[id]={};
					if(!map[id].extraDamage) map[id].extraDamage=0;
					map[id].extraDamage++;
					trigger.getParent().liyong2=true;
				},
				group:['liyong3','liyong4'],
			},
			liyong3:{
				trigger:{source:'damageSource'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&
					event.player.isAlive()&&event.getParent(2).liyong2==true;
				},
				content:function(){
					player.loseHp();
				},
			},
			liyong4:{
				trigger:{player:'useCardAfter'},
				forced:true,
				silent:true,
				filter:function(evt,player){
					if(!evt.card||evt.card.name!='sha') return false;
					if(evt.liyong) return false;
					var history=player.getHistory('useCard',function(evt){
						return evt.card.name=='sha';
					});
					var evt2=history[history.indexOf(evt)-1];
					return evt2&&evt2.liyong;
				},
				content:function(){
					player.removeSkill('liyong2');
				},
			},
			//韩遂
			xinniluan:{
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.isAlive()&&event.player.getHistory('useCard',function(evt){
						if(evt.targets&&evt.targets.length){
							var targets=evt.targets.slice(0);
							while(targets.contains(event.player)) targets.remove(event.player);
							return targets.length>0;
						}
						return false;
					}).length>0&&(_status.connectMode||player.hasSha());
				},
				content:function(){
					'step 0'
					player.chooseToUse({
						logSkill:'xinniluan',
						preTarget:trigger.player,
						prompt:'是否发动【逆乱】，对'+get.translation(trigger.player)+'使用一张【杀】？',
						filterCard:function(card,player){
							return get.name(card)=='sha'&&lib.filter.filterCard.apply(this,arguments);
						},
						filterTarget:function(card,player,target){
							return target==_status.event.preTarget&&lib.filter.targetEnabled.apply(this,arguments);
						},
						addCount:false,
					});
					'step 1'
					if(result.bool&&player.getHistory('sourceDamage',function(evt){
						return evt.getParent(4)==event;
					}).length&&trigger.player.countDiscardableCards(player,'he')>0) player.discardPlayerCard(trigger.player,true,'he').boolline=true;
				},
			},
			xiaoxi_hansui:{
				audio:2,
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card,player){
					return get.color(card)=='black';
				},
				position:'he',
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(!player.countCards('he',{color:'black'})) return false;
				},
				prompt:'将一张黑色牌当杀使用或打出',
				check:function(card){return 4.5-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('he',{color:'black'})) return false;
					},
					respondSha:true,
				}
			},
			//胡车儿
			daoji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he',function(card){
						return get.type(card)!='basic';
					})&&game.hasPlayer(function(target){
						return target!=player&&target.countCards('e')>0;
					});
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('e')>0;
				},
				check:function(card){
					var player=_status.event.player;
					if(game.hasPlayer(function(current){
						return current!=player&&get.attitude(player,current)<0&&get.damageEffect(current,player,player)>0&&current.getEquip(1);
					})) return 8-get.value(card);
					return 5-get.value(card)
				},
				content:function(){
					'step 0'
					player.gainPlayerCard(target,'e',true).set('ai',function(button){
						var card=button.link;
						var player=_status.event.player;
						if(get.subtype(card)=='equip1'&&get.damageEffect(_status.event.target,player,player)>0) return 6+get.value(card);
						return get.value(card);
					});
					'step 1'
					if(!result||!result.bool||!result.cards||!result.cards.length){
						event.finish();
						return;
					}
					var card=result.cards[0];
					event.card=card;
					if(player.getCards('h').contains(card)&&get.type(card)=='equip') player.chooseUseTarget(card,true).nopopup=true;
					'step 2'
					if(get.subtype(card,false)=='equip1') target.damage();
				},
				ai:{
					order:6,
					result:{
						target:function(player,current){
							if(get.damageEffect(current,player,player)>0&&current.getEquip(1)) return -1.5;
							return -1;
						},
					},
				},
			},
			//司马师夫妇
			//垃圾
			baiyi:{
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				selectTarget:2,
				limited:true,
				skillAnimation:false,
				//animationColor:'thunder',
				filter:function(event,player){
					return player.isDamaged()&&game.players.length>2;
				},
				multitarget:true,
				multiline:true,
				changeSeat:true,
				contentBefore:function(){
					player.$fullscreenpop('败移','thunder');
				},
				content:function(){
					player.awakenSkill('baiyi');
					game.broadcastAll(function(target1,target2){
						game.swapSeat(target1,target2);
					},targets[0],targets[1])
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(player.hasUnknown()&&target!=player.next&&target!=player.previous) return 0;
							var distance=Math.pow(get.distance(player,target,'absolute'),2);
							if(!ui.selected.targets.length) return distance;
							var distance2=Math.pow(get.distance(player,ui.selected.targets[0],'absolute'),2);
							return Math.min(0,distance-distance2);
						}
					},
				},
			},
			jinglve:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(player.hasSkill('jinglve2')) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0;
					});
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					if(!player.storage.jinglve4) player.storage.jinglve4=[];
					player.storage.jinglve4.add(target);
					player.chooseButton(['选择一张牌作为「死士」',target.getCards('h')],true).set('ai',function(button){
						var target=_status.event.getParent().target;
						var card=button.link;
						var val=target.getUseValue(card);
						if(val>0) return val;
						return get.value(card);
					});
					'step 1'
					if(result.bool){
						player.storage.jinglve2=target;
						player.storage.jinglve3=result.links[0];
						player.addSkill('jinglve2');
					}
				},
				ai:{
					order:12,
					result:{
						target:-1,
					},
				},
			},
			jinglve2:{
				mark:true,
				intro:{
					name:'死士',
					mark:function(dialog,content,player){
						dialog.addText('记录目标');
						dialog.add([content]);
						if(player==game.me||player.isUnderControl()){
							dialog.addText('死士牌');
							dialog.add([player.storage.jinglve3]);
						}
					},
				},
				onremove:function(player){
					delete player.storage.jinglve2;
					delete player.storage.jinglve3;
				},
				trigger:{global:['dieBegin','loseAfter']},
				silent:true,
				lastDo:true,
				charlotte:true,
				filter:function(event,player){
					if(event.player!=player.storage.jinglve2) return false;
					return event.name=='die'||(event.cards.contains(player.storage.jinglve3)&&event.getParent().name!='useCard');
				},
				content:function(){
					player.removeSkill('jinglve2');
				},
				group:'jinglve3',
			},
			jinglve3:{
				audio:'jinglve',
				trigger:{global:['loseAfter','useCard','phaseAfter']},
				filter:function(event,player){
					if(event.player!=player.storage.jinglve2) return false;
					if(event.name=='phase') return event.player.getCards('hej').contains(player.storage.jinglve3);
					if(!event.cards.contains(player.storage.jinglve3)) return false;
					return event.name=='useCard'||get.position(player.storage.jinglve3,true)=='d';
				},
				forced:true,
				charlotte:true,
				logTarget:'player',
				content:function(){
					if(trigger.name=='useCard'){
						trigger.all_excluded=true;
						trigger.targets.length=0;
					}
					else{
						var next=player.gain(player.storage.jinglve3,trigger.name=='phase'?'giveAuto':'gain2');
						if(trigger.name=='phase') next.source=trigger.player;
					}
					player.removeSkill('jinglve2');
				},
			},
			shanli:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				juexingji:true,
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.storage.baiyi&&player.getStorage('jinglve4').length>1;
				},
				content:function(){
					'step 0'
					player.awakenSkill('shanli');
					player.loseMaxHp();
					player.chooseTarget(true,'选择【擅立】的目标').set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(target==game.me||target.isUnderControl()&&target.isOnline()) return 2*att;
						return att;
					});
					'step 1'
					var target=result.targets[0];
					event.target=target;
					player.line(target,'green');
					game.log(player,'拥立',target);
					var list=[];
					if(!_status.characterlist){
						if(_status.connectMode) var list=get.charactersOL();
						else{
							var list=[];
							for(var i in lib.character){
								if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
								list.push(i);
							}
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
					var chara=[];
					var skills=[];
					for(var i of _status.characterlist){
						if(i=='key_yuri') continue;
						var character=lib.character[i];
						if(character&&character[3]){
							for(var j of character[3]){
								if(skills.contains(j)||j=='yuri_wangxi'||target.hasSkill('j')) continue;
								var info=get.info(j);
								if(info&&info.zhuSkill){
									skills.add(j);
									chara.add(i);
									continue;
								}
							}
						}
						if(skills.length>=3) break;
					}
					if(!skills.length){event.finish();return}
					event.chara=chara;
					event.skills=skills;
					player.chooseControl(skills).set('dialog',['选择令'+get.translation(target)+'获得一个技能',[chara,'character']]);
					'step 2'
					target.addSkillLog(result.control);
					target.storage.zhuSkill_shanli=[result.control];
					target.setAvatarQueue(target.name1||target.name,[event.chara[event.skills.indexOf(result.control)]]);
				},
			},
			hongyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>=Math.min(2,game.dead.length);
				},
				selectCard:function(){
					return Math.min(2,game.dead.length);
				},
				filterCard:true,
				filterTarget:lib.filter.notMe,
				check:function(card){
					var num=Math.min(2,game.dead.length);
					if(!num) return 1;
					if(num==1) return 7-get.value(card);
					return 5-get.value(card);
				},
				position:'he',
				content:function(){
					player.addTempSkill('hongyi2',{player:'phaseBeginStart'});
					player.storage.hongyi2.add(target);
					player.markSkill('hongyi2');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.hasJudge('lebu')) return -0.5;
							return -1-target.countCards('h');
						},
					},
				},
			},
			hongyi2:{
				audio:'hongyi',
				trigger:{global:'damageBegin1'},
				charlotte:true,
				forced:true,
				logTarget:'source',
				filter:function(event,player){
					return player.storage.hongyi2.contains(event.source);
				},
				content:function(){
					'step 0'
					trigger.source.judge();
					'step 1'
					if(result.color=='black') trigger.num--;
					else trigger.player.draw();
				},
				onremove:true,
				intro:{
					content:'已选中$为技能目标',
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
			},
			quanfeng:{
				audio:2,
				trigger:{global:'die'},
				filter:function(event,player){
					return event.player.getStockSkills('仲村由理','天下第一').filter(function(skill){
						var info=get.info(skill);
						return info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte&&!info.limited;
					}).length>0;
				},
				logTarget:'player',
				skillAnimation:true,
				limited:true,
				forced:true,
				animationColor:'thunder',
				content:function(){
					'step 0'
					player.awakenSkill('quanfeng');
					var list=trigger.player.getStockSkills('仲村由理','天下第一').filter(function(skill){
						var info=get.info(skill);
						return info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte&&!info.limited;
					});
					if(list.length==1) event._result={control:list[0]};
					else player.chooseControl(list).set('prompt','选择获得'+get.translation(trigger.player)+'的一个技能').set('forceDie',true).set('ai',function(){
						return list.randomGet();
					});
					'step 1'
					player.addSkillLog(result.control);
					game.broadcastAll(function(skill){
						var list=[skill];game.expandSkills(list);
						for(var i of list){
							var info=lib.skill[i];
							if(!info) continue;
							if(!info.audioname2) info.audioname2={};
							info.audioname2.yanghuiyu='quanfeng';
						}
					},result.control);
					player.gainMaxHp();
					player.recover();
				},
			},
			//手杀朱然
			//设计师你改技能有瘾🐴
			mobiledanshou:{
				trigger:{global:'phaseJieshuBegin'},
				audio:2,
				direct:true,
				filter:function(event,player){
					if(player==event.player) return false;
					var num=event.player.getHistory('useCard',function(evt){
						return evt.targets.contains(player);
					}).length;
					return num==0||event.player.isAlive()&&num<=player.countCards('he');
				},
				content:function(){
					'step 0'
					var num=trigger.player.getHistory('useCard',function(evt){
						return evt.targets.contains(player);
					}).length;
					event.num=num;
					if(num==0){
						if(player.hasSkill('mobiledanshou')) event._result={bool:true};
						else player.chooseBool('是否发动【胆守】摸一张牌？',lib.translate.mobiledanshou_info);
					}
					else event.goto(2);
					'step 1'
					if(result.bool){
						player.logSkill('mobiledanshou');
						player.draw();
					}
					event.finish();
					'step 2'
					player.chooseToDiscard(num,get.prompt('mobiledanshou',trigger.player),'弃置'+get.translation(num)+'张牌并对其造成1点伤害','he').set('ai',function(card){
						if(!_status.event.goon) return 0;
						var num=_status.event.getParent().num;
						if(num==1) return 8-get.value(card);
						if(num==2) return 6.5-get.value(card);
						return 5-get.value(card);
					}).set('goon',get.damageEffect(trigger.player,player,player)>0).logSkill=['mobiledanshou',trigger.player];
					'step 3'
					if(result.bool){
						player.addExpose(0.2);
						trigger.player.damage();
					}
				},
			},
			//丁原
			//程序员和设计师至少有一个脑子有坑
			beizhu:{
				audio:3,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.addTempSkill('beizhu_draw');
					player.viewHandcards(target);
					'step 1'
					var cards=target.getCards('h','sha');
					if(cards.length){
						event.cards=cards;
						event.goto(5);
					}
					else player.discardPlayerCard('he',target,true);
					'step 2'
					player.chooseBool('是否令'+get.translation(target)+'获得一张【杀】？').set('ai',function(){
						var evt=status.event.getParent();
						return get.attitude(evt.player,evt.target)>0;
					});
					'step 3'
					if(result.bool){
						var card=get.cardPile2(function(card){
							return card.name=='sha';
						});
						if(card) target.gain(card,'gain2');
					}
					else event.finish();
					'step 4'
					game.updateRoundNumber();
					event.finish();
					'step 5'
					var hs=target.getCards('h');
					cards=cards.filter(function(card){
						return hs.contains(card)&&get.name(card,target)=='sha'&&target.canUse({
							name:'sha',
							isCard:true,
							cards:[card],
						},player,false);
					});
					if(cards.length){
						var card=cards.randomRemove(1)[0];
						target.useCard(player,false,card).card.beizhu=true;
						event.redo();
					}
				},
			},
			beizhu_draw:{
				trigger:{player:'damageEnd'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.card&&event.card.beizhu;
				},
				content:function(){
					player.draw(trigger.num);
				},
			},
			//新简雍
			xinqiaoshui:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool) player.addTempSkill('qiaoshui3','phaseUseEnd');
					else{
						player.addTempSkill('qiaoshui2','phaseUseEnd');
					}
				},
				ai:{
					order:function(item,player){
						if(player.countCards('h',function(card){
							return player.hasValueTarget(card);
						})) return 10;
						return 1;
					},
					result:{
						target:function(player,target){
							if(player.countCards('h',function(card){
								return player.hasValueTarget(card);
							})){
								if(player.hasSkill('qiaoshui3')) return 0;
								var nd=!player.needsToDiscard();
								if(player.hasCard(function(card){
									if(get.position(card)!="h") return false;
									var val=get.value(card)
									if(nd&&val<0) return true;
									if(val<=5){
										return card.number>=12;
									}
									if(val<=6){
										return card.number>=13;
									}
									return false;
								})) return -1;
								return 0;
							}
							return -1;
						},
					},
				},
			},
			xinjyzongshi:{
				audio:2,
				trigger:{
					player:['chooseToCompareAfter','compareMultipleAfter'],
					target:['chooseToCompareAfter','compareMultipleAfter']
				},
				filter:function(event,player){
					return !event.preserve;
				},
				frequent:true,
				content:function(){
					'step 0'
					var str='<div class="text center">牌堆顶';
					var cards=get.cards();
					if(player==trigger.player){
						if(trigger.num1>trigger.num2&&get.position(trigger.card2,true)=='o'){
							str+='/拼点牌';
							cards.push(trigger.card2)
						}
						else if(trigger.num1<trigger.num2&&get.position(trigger.card1,true)=='o'){
							str+='/拼点牌';
							cards.push(trigger.card1);
						}
					}
					else{
						if(trigger.num1<trigger.num2&&get.position(trigger.card1,true)=='o'){
							str+='/拼点牌';
							cards.push(trigger.card1);
						}
						else if(trigger.num1>trigger.num2&&get.position(trigger.card2,true)=='o'){
							str+='/拼点牌';
							cards.push(trigger.card2);
						}
					}
					str+='</div>';
					event.cards=cards;
					player.chooseButton(['纵适：选择要获得的牌',str,cards],true).set('ai',get.buttonValue);
					'step 1'
					if(result.bool){
						var draw=result.links[0]==cards[0];
						player.gain(result.links,draw?'draw':'gain2').log=false;
						game.log(player,'获得了',draw?'牌堆顶的一张牌':result.links);
						if(!draw){
							cards[0].fix();
							ui.cardPile.insertBefore(cards[0],ui.cardPile.firstChild);
							game.updateRoundNumber();
						}
					}
				}
			},
			//通渠张恭
			rezhenxing:{
				audio:'xinfu_zhenxing',
				trigger:{
					player:["damageEnd","phaseJieshuBegin"],
				},
				frequent:true,
				content:function(){
					'step 0'
					event.cards=get.cards(3);
					player.chooseButton(['【镇行】：请选择要获得的牌',event.cards]).set('filterButton',function(button){
						var cards=_status.event.cards;
						for(var i=0;i<cards.length;i++){
							if(button.link!=cards[i]&&get.suit(cards[i])==get.suit(button.link)) return false;
						}
						return true;
					}).set('ai',function(button){
						return get.value(button.link);
					}).set('cards',event.cards);
					'step 1'
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
			//芙蓉，手杀廖化，手杀曹彰
			rejiangchi:{
				audio:2,
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function(){
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
					}).set('prompt',get.prompt2('rejiangchi'));
					"step 1"
					if(result.control=='弃牌'){
						player.chooseToDiscard(true,'he');
						player.addTempSkill('jiangchi2','phaseUseEnd');
						player.logSkill('rejiangchi');
					}
					else if(result.control=='摸牌'){
						player.draw();
						player.addTempSkill('rejiangchi3','phaseUseEnd');
						player.logSkill('rejiangchi');
					}
				},
			},
			rejiangchi3:{
				mod:{
					cardEnabled:function(card){
						if(card.name=='sha') return false;
					},
				},
			},
			refuli:{
				skillAnimation:true,
				animationColor:'soil',
				audio:2,
				unique:true,
				limited:true,
				enable:'chooseToUse',
				mark:true,
				filter:function(event,player){
					if(event.type!='dying') return false;
					if(player!=event.dying) return false;
					return true;
				},
				content:function(){
					"step 0"
					player.awakenSkill('refuli');
					event.num=game.countGroup();
					if(event.num>player.hp) player.recover(event.num-player.hp);
					"step 1"
					if(player.isMaxHp(true)) player.turnOver();
				},
				ai:{
					save:true,
					skillTagFilter:function(player,arg,target){
						return player==target;
					},
					result:{
						player:10
					},
					threaten:function(player,target){
						if(!target.storage.refuli) return 0.9;
					}
				},
			},
			redangxian:{
				trigger:{player:'phaseBegin'},
				forced:true,
				audio:'dangxian',
				audioname:['guansuo','xin_liaohua'],
				content:function(){
					'step 0'
					var card=get.discardPile(function(card){
						return card.name=='sha';
					});
					if(card) player.gain(card,'gain2');
					'step 1'
					game.updateRoundNumber();
					var next=player.phaseUse();
					event.next.remove(next);
					trigger.next.push(next);
				},
			},
			xuewei:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('xuewei'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						if(player==get.zhu(player)&&player.hp<=2) return 0;
						return get.attitude(player,target)-4;
					}).animate=false;
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xuewei');
						player.addTempSkill('xuewei2',{player:'phaseBegin'});
						player.storage.xuewei2=target;
					}
				},
				ai:{
					threaten:1.05,
				},
			},
			xuewei2:{
				audio:'xuewei',
				forced:true,
				onremove:true,
				trigger:{global:'damageBegin4'},
				charlotte:true,
				filter:function(event,player){
					return event.player==player.storage.xuewei2;
				},
				logTarget:'player',
				content:function(){
					player.removeSkill('xuewei2');
					trigger.cancel();
					player.damage(trigger.num,trigger.source||'nosource');
					if(trigger.source&&trigger.source.isIn()) trigger.source.damage(trigger.num,trigger.nature,player);
				},
			},
			liechi:{
				trigger:{player:'dying'},
				forced:true,
				filter:function(event,player){
					return event.getParent().name=='damage'&&event.source&&event.source.countCards('he');
				},
				audio:2,
				content:function(){
					trigger.source.chooseToDiscard('he',true);
				},
			},
			rejiuchi:{
				group:['jiuchi'],
				audioname:['re_dongzhuo'],
				trigger:{source:'damage'},
				forced:true,
				popup:false,
				locked:false,
				audio:'jiuchi',
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.getParent(2).jiu==true&&!player.hasSkill('rejiuchi_air');
				},
				content:function(){
					player.logSkill('jiuchi');
					player.addTempSkill('rejiuchi_air');
				},
				subSkill:{
					air:{},
				},
			},
			//苏飞，新贾逵
			tongqu:{
				audio:2,
				trigger:{
					global:['gameDrawAfter','dying','phaseDrawBegin2'],
					player:['enterGame','phaseZhunbeiBegin'],
				},
				direct:true,
				filter:function(event,player){
					if(event.name=='phaseDraw') return event.player.hasMark('tongqu');
					if(event.name=='dying') return event.player.hasMark('tongqu');
					if(event.name=='phaseZhunbei') return game.hasPlayer(function(current){
						return !current.hasMark('tongqu');
					});
					return !player.hasMark('tongqu');
				},
				content:function(){
					'step 0'
					if(trigger.name=='phaseDraw'){
						player.logSkill('tongqu',trigger.player);
						trigger.player.draw('nodelay');
						trigger.player.addTempSkill('tongqu2','phaseDrawAfter');
						event.finish();
					}
					else if(trigger.name=='dying'){
						player.logSkill('tongqu',trigger.player);
						trigger.player.removeMark('tongqu',1);
						event.finish();
					}
					else if(trigger.name=='phaseZhunbei'){
						player.chooseTarget(get.prompt2('tongqu'),function(card,player,target){
							return !target.hasMark('tongqu');
						}).set('ai',function(target){
							if(_status.event.player.hp<3) return 0;
							return get.attitude(_status.event.player,target);
						});
					}
					else{
						player.logSkill('tongqu');
						player.addMark('tongqu',1);
						event.finish();
					}
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.loseHp();
						player.logSkill('tongqu',target);
						target.addMark('tongqu',1);
					}
				},
				marktext:'渠',
				intro:{content:'mark',name2:'渠'},
			},
			tongqu2:{
				trigger:{player:'phaseDrawEnd'},
				forced:true,
				silent:true,
				filter:function(event,player){
					var bool=game.hasPlayer(function(current){
						return current!=player&&current.hasMark('tongqu');
					});
					return player.countCards('he',function(card){
						if(bool) return true;
						return lib.filter.cardDiscardable(card,player);
					})>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						forced:true,
						position:'he',
						filterCard:true,
						filterTarget:function(card,player,target){
							return player!=target&&target.hasMark('tongqu');
						},
						selectTarget:function(){
							if(ui.selected.cards.length&&!lib.filter.cardDiscardable(ui.selected.cards[0],_status.event.player)) return [1,1];
							return [0,1];
						},
						prompt:'弃置一张牌，或将一张牌交给一名有“渠”的其他角色',
						ai1:function(card){
							var player=_status.event.player;
							if(get.name(card)=='du') return 20;
							if(get.position(card)=='e'&&get.value(card)<=0) return 14;
							if(get.position(card)=='h'&&game.hasPlayer(function(current){
								return current!=player&&current.hasMark('tongqu')&&get.attitude(player,current)>0&&current.getUseValue(card)>player.getUseValue(card)&&current.getUseValue(card)>player.getUseValue(card);
							})) return 12;
							if(game.hasPlayer(function(current){
								return current!=player&&current.hasMark('tongqu')&&get.attitude(player,current)>0;
							})){
								if(card.name=='wuxie') return 11;
								if(card.name=='shan'&&player.countCards('h','shan')>1) return 9
							}
							return 6/Math.max(1,get.value(card));
						},
						ai2:function(target){
							var player=_status.event.player;
							var card=ui.selected.cards[0];
							var att=get.attitude(player,target);
							if(card.name=='du') return -6*att;
							if(att>0){
								if(get.position(card)=='h'&&target.getUseValue(card)>player.getUseValue(card)) return 4*att;
								if(target.hasUseTarget(card)) return 2*att;
								return 1.2*att;
							}
							return 0;
						},
					});
					'step 1'
					if(result.bool){
						if(result.targets.length){
							event.target=result.targets[0];
							event.target.gain(result.cards,player,'giveAuto');
							event.card=result.cards[0];
						}
						else{
							player.discard(result.cards);
							event.finish();
						}
					}
					'step 2'
					if(target.getCards('h').contains(card)&&get.type(card)=='equip'){
						target.chooseUseTarget(card,true);
					}
				},
			},
			xinwanlan:{
				audio:'wanlan',
				trigger:{global:'damageBegin4'},
				filter:function(event,player){
					return event.player.hp<=event.num&&player.countCards('e')>=1;
				},
				logTarget:'player',
				check:function(event,player){
					if(get.attitude(player,event.player)<4) return false;
					if(player.countCards('h',function(card){
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,event.player,'unchanged','cardSavable',player);
						if(mod!='unchanged') return mod;
						var savable=get.info(card).savable;
						if(typeof savable=='function') savable=savable(card,player,event.player);
						return savable;
					})>=1+event.num-event.player.hp) return false;
					if(event.player==player||event.player==get.zhu(player)) return true;
					return !player.hasUnknown();
				},
				content:function(){
					player.discard(player.getCards('e'));
					trigger.cancel();
				},
			},
			zhengjian:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				locked:true,
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget('请选择【诤荐】的目标',lib.translate.zhengjian_info).set('ai',function(target){
						if(target.hasSkill('zhengjian')) return 0;
						if(player==target) return 0.5;
						return get.attitude(_status.event.player,target)*(1+target.countCards('h'));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhengjian',target);
						target.addSkill('zhengjian_mark');
					}
				},
				group:'zhengjian_draw',
			},
			zhengjian_draw:{
				audio:'zhengjian',
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event){
					return game.hasPlayer(function(current){
						return current.hasSkill('zhengjian_mark');
					});
				},
				logTarget:function(event){
					return game.filterPlayer(function(current){
						return current.hasSkill('zhengjian_mark');
					});
				},
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current.countMark('zhengjian_mark')>0;
					});
					if(list.length){
						event.delay=true;
						game.asyncDraw(list,function(target){
							return Math.min(5,target.maxHp,target.countMark('zhengjian_mark'));
						});
					}
					'step 1'
					game.countPlayer(function(current){
						current.removeSkill('zhengjian_mark');
					});
					if(event.delay) game.delayx();
				},
			},
			zhengjian_mark:{
				trigger:{player:['useCard1','respond']},
				silent:true,
				firstDo:true,
				onremove:true,
				charlotte:true,
				content:function(){
					player.addMark('zhengjian_mark',1,false);
				},
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				mark:true,
				intro:{
					content:'已使用/打出过#张牌',
				},
			},
			gaoyuan:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				direct:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(player.countCards('he')==0) return false;
					return game.hasPlayer(function(current){
						return current!=event.player&&current!=player&&
						current.hasSkill('zhengjian_mark')&&lib.filter.targetEnabled(event.card,event.player,current);
					});
				},
				content:function(){
					"step 0"
					var next=player.chooseCardTarget({
						position:'he',
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event;
							if(target!=player&&target!=trigger.source){
								if(target.hasSkill('zhengjian_mark')&&lib.filter.targetEnabled(trigger.card,trigger.source,target)) return true;
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
						prompt:get.prompt('gaoyuan'),
						prompt2:'弃置一张牌，将此【杀】转移给一名有“诤”的角色',
						source:trigger.player,
						card:trigger.card,
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill(event.name,target);
						player.discard(result.cards);
						var evt=trigger.getParent();
						evt.triggeredTargets2.remove(player);
						evt.targets.remove(player);
						evt.targets.push(target);
					}
				},
			},
			//一 将 成 名
			zhilve:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				content:function(){
					'step 0'
					if(!player.canMoveCard()) event._result={index:1};
					else player.chooseControl().set('choiceList',[
						'移动场上的一张牌',
						'本回合的摸牌阶段多摸一张牌且第一张杀无距离次数限制',
					]).set('ai',function(){return 1});
					'step 1'
					if(result.index==1){
						player.addTempSkill('zhilve_yingzi');
						if(!player.getHistory('useCard',function(card){
							return card.card.name=='sha';
						}).length) player.addTempSkill('zhilve_xiandeng');
						event.finish();
					}
					else player.moveCard(true);
					'step 2'
					if(result.position=='e') player.loseHp();
					else player.addTempSkill('zhilve_dis');
				},
				subSkill:{
					dis:{
						mod:{
							maxHandcard:function(player,num){
								return num-1;
							},
						},
					},
					yingzi:{
						trigger:{player:'phaseDrawBegin2'},
						popup:false,
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){trigger.num++},
					},
					xiandeng:{
						mod:{
							targetInRange:function(card,player){
								if(card.name=='sha') return true;
							},
						},
						trigger:{player:'useCard1'},
						forced:true,
						popup:false,
						firstDo:true,
						filter:function(event,player){
							return event.card.name=='sha';
						},
						content:function(){
							player.removeSkill(event.name);
							if(trigger.addCount!==false){
								trigger.addCount=false;
								var stat=player.getStat('card');
								if(stat&&stat.sha) stat.sha--;
							}
						},
					},
				},
			},
			xhzhiyan:{
				enable:'phaseUse',
				audio:2,
				filter:function(event,player){
					return player.countCards('h')!=player.maxHp;
				},
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					var num=Math.max(0,player.countCards('h')-player.maxHp);
					return [num,num];
				},
				check:function(card){
					var player=_status.event.player;
					if(player.getUseValue(card)<=0&&game.hasPlayer(function(current){
						return current!=player&&get.value(card,current)*get.attitude(player,current)>0;
					})) return 1;
					return 0;
				},
				content:function(){
					'step 0'
					if(!cards.length){
						player.draw(player.maxHp-player.countCards('h'));
						player.addTempSkill('zishou2');
						event.finish();
					}
					else{
						cards=cards.filterInD('d');
						if(cards.length) player.chooseButton(['是否将其中的一张牌交给一名其他角色？',cards]).set('',function(button){
							var player=_status.event.player;
							if(game.hasPlayer(function(current){
								return current!=player&&get.value(button.link,current)*get.attitude(player,current)>0;
							})) return Math.abs(get.value(button.link));
							return 0;
						});
						else event.finish();
					}
					'step 1'
					if(result.bool){
						event.card=result.links[0];
						player.chooseTarget(true,lib.filter.notMe,'选择一名其他角色获得'+get.translation(event.card)).set('ai',function(target){
							return get.value(_status.event.getParent().card,target)*get.attitude(_status.event.player,target);
						});
					}
					else event.finish();
					'step 2'
					var target=result.targets[0];
					player.line(target,'green');
					target.gain(card,'gain2','log');
				},
				ai:{
					order:function(obj,player){
						if(player.countCards('h')>player.maxHp) return 10;
						return 0.5;
					},
					result:{
						player:1,
					},
				},
			},
			//水 果 忍 者
			zhengjing_guanju:{audio:true},
			zhengjing:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkill('zhengjing3');
				},
				content:function(){
					"step 0"
					//game.trySkillAudio('zhengjing_guanju',player);
					if(_status.connectMode) event.time=lib.configOL.choose_timeout;
					var cards=[];
					var names=[];
					while(true){
						var card=get.cardPile(function(carde){
							return carde.name!='du'&&!names.contains(carde.name);
						});
						if(card){
							cards.push(card);
							names.push(card.name);
							if(cards.length==3&&!get.isLuckyStar(player)&&Math.random()<0.33) break;
							if(cards.length==4&&!get.isLuckyStar(player)&&Math.random()<0.5) break;
							if(cards.length==5) break;
							if(cards.length>=6) break;
						}
						else break;
					};
					event.cards=cards;
					if(!cards.length){event.finish();return;};
					names.push('du');
					var names2=names.slice(0);
					for(var i=0;i<4;i++){
						names=names.concat(names2);
					}
					names.randomSort();
					event.videoId=lib.status.videoId++;
					if(player.isUnderControl()){
						game.swapPlayerAuto(player);
					}
					var switchToAuto=function(){
						names.remove('du');
						game.pause();
						game.countChoose();
						setTimeout(function(){
							_status.imchoosing=false;
							event._result={
								bool:true,
								links:names.slice(0),
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
							game.resume();
						},5000);
					};
					var createDialog=function(player,id){
						if(_status.connectMode) lib.configOL.choose_timeout='30';
						if(player==game.me) return;
						var str=get.translation(player)+'正在整理经书...<br>';
						ui.create.dialog(str).videoId=id;
					};
					var chooseButton=function(list){
						var event=_status.event;
						event.settleed=false;
						event.finishedx=[];
						event.map={};
						event.zhengjing=list;
						event.zhengjing_nodes=[];
						event.map=[];
						event.dialog=ui.create.dialog('forcebutton','hidden');
						event.dialog.textPrompt=event.dialog.addText('及时点击卡牌，但不要点到毒了！');
						event.switchToAuto=function(){
							event._result={
								bool:true,
								links:event.finishedx.slice(0),
							};
							event.dialog.close();
							game.resume();
							_status.imchoosing=false;
						};
						event.dialog.classList.add('fixed');
						event.dialog.classList.add('scroll1');
						event.dialog.classList.add('scroll2');
						event.dialog.classList.add('fullwidth');
						event.dialog.classList.add('fullheight');
						event.dialog.classList.add('noupdate');
						event.dialog.open();
						event.settle=function(du){
							if(event.settleed) return;
							event.settleed=true;
							if(du){
								if(lib.config.background_speak) game.playAudio('skill','zhengjing_boom');
								event.dialog.textPrompt.innerHTML='  <br>叫你别点毒你非得点 这下翻车了吧';
							}
							else {
								if(lib.config.background_speak) game.playAudio('skill','zhengjing_finish');
								event.dialog.textPrompt.innerHTML='  <br>整理经典结束！共整理出'+get.cnNumber(event.finishedx.length)+'份经典';
							}
							while(event.zhengjing_nodes.length){
								event.zhengjing_nodes.shift().delete();
							}
							setTimeout(function(){
							 event.switchToAuto();
							},1000);
						};
						
						var click=function(){
							var name=this.name;
							if(name=='du'){
								event.zhengjing.length=0;
								event.settle(true);
							}
							else{
								if(lib.config.background_speak) game.playAudio('skill','zhengjing_click');
								if(!event.map[name]) event.map[name]=0;
								event.map[name]++;
								if(event.map[name]>1) event.finishedx.add(name);
							}
							event.zhengjing_nodes.remove(this);
							this.style.transition='all 0.5s';
							this.style.transform='scale(1.2)';
							this.delete();
						};
						var addNode=function(){
							if(event.zhengjing.length){
								var card=ui.create.card(ui.special,'noclick',true);
								card.init(['','',event.zhengjing.shift()]);
								card.addEventListener(lib.config.touchscreen?'touchend':'click',click);
								event.zhengjing_nodes.push(card);
								card.style.position='absolute';
								var rand1=Math.round(Math.random()*100);
								var rand2=Math.round(Math.random()*100);
								var rand3=Math.round(Math.random()*40)-20;
								card.style.left='calc('+rand1+'% - '+rand1+'px)';
								card.style.top='calc('+rand2+'% - '+rand2+'px)';
								card.style.transform='scale(0.8) rotate('+rand3+'deg)';
								card.style.opacity=0;
								event.dialog.appendChild(card);
								ui.refresh(card);
								card.style.opacity=1;
								card.style.transform='scale(1) rotate('+rand3+'deg)';
							}
							if(event.zhengjing_nodes.length>(event.zhengjing.length>0?2:0)) event.zhengjing_nodes.shift().delete();
							if(event.zhengjing.length||event.zhengjing_nodes.length) setTimeout(function(){
								addNode();
							},800);
							else event.settle();
						};
						
						game.pause();
						game.countChoose();
						addNode();
					};
					//event.switchToAuto=switchToAuto;
					game.broadcastAll(createDialog,player,event.videoId);
					if(event.isMine()){
						chooseButton(names);
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,names);
						event.player.wait();
						game.pause();
					}
					else{
						switchToAuto();
					}
					"step 1"
					game.broadcastAll(function(id,time){
						if(_status.connectMode) lib.configOL.choose_timeout=time;
						var dialog=get.idDialog(id);
						if(dialog){
							dialog.close();
						}
					},event.videoId,event.time);
					var result=event.result||result;
					for(var i=0;i<cards.length;i++){
						//if(cards.length==1) break;
						if(!result.links.contains(cards[i].name)) cards.splice(i--,1);
					}
					if(cards.length) player.showCards(cards,get.translation(player)+'整理出了以下经典');
					else{
						game.log(player,'并没有整理出经典');
						player.popup('杯具');
						event.finish();
					}
					"step 2"
					player.chooseTarget(true,'将整理出的经典置于一名角色的武将牌上').set('ai',function(target){
						if(target.hasSkill('xinfu_pdgyingshi')) return 0;
						var player=_status.event.player;
						var cards=_status.event.getParent().cards;
						var att=get.attitude(player,target);
						if(cards.length==1) return -att;
						if(player==target) att/=2;
						if(target.hasSkill('pingkou')) att*=1.4;
						att*=(1+target.countCards('j')/2);
						return att;
					});
					"step 3"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.addSkill('zhengjing2');
						target.markAuto('zhengjing2',cards);
						game.cardsGotoSpecial(cards);
						game.log(player,'将',cards,'置于了',target,'的武将牌上');
					}
					"step 4"
					game.updateRoundNumber();
				},
				ai:{
					order:10,
					result:{player:1},
					threaten:3.2,
				}
			},
			//恁就是仲村由理？
			zhengjing2:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				intro:{content:'cards'},
				content:function(){
					player.gain(player.storage.zhengjing2,'gain2','log','fromStorage');
					delete player.storage.zhengjing2;
					player.removeSkill('zhengjing2');
					//player.addTempSkill('zhengjing3');
					player.skip('phaseJudge');
					player.skip('phaseDraw');
				},
			},
			zhengjing3:{},
			//邓芝
			jimeng:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.countGainableCards(player,'he')>0;
					})
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('jimeng'),function(card,player,target){
						return target!=player&&target.countGainableCards(player,'he')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(player.hp>1&&get.attitude(player,target)<2) return 0;
						return get.effect(target,{name:'shunshou'},player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('jimeng',target);
						player.gainPlayerCard(target,'he',true);
					}
					else event.finish();
					'step 2'
					var hs=player.getCards('he');
					if(player.hp>0&&hs.length){
						if(hs.length<=player.hp) event._result={bool:true,cards:hs};
						else player.chooseCard(player.hp,true,'交给'+get.translation(target)+get.cnNumber(player.hp)+'张牌','he',true);
					}
					else event.finish();
					'step 3'
					target.gain(result.cards,player,'giveAuto');
				},
			},
			shuaiyan:{
				audio:2,
				trigger:{player:'phaseDiscardBegin'},
				filter:function(event,player){
					return player.countCards('h')>1;
				},
				check:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he')&&lib.skill.shuaiyan.check2(current,player);
					});
				},
				check2:function(target,player){
					if(get.itemtype(player)!='player') player=_status.event.player;
					return -get.attitude(player,target)/target.countCards('he');
				},
				content:function(){
					'step 0'
					player.showHandcards(get.translation(player)+'发动了【率言】');
					'step 1'
					var filter=function(card,player,target){
						return player!=target&&target.countCards('he')>0;
					};
					if(game.hasPlayer(function(current){
						return filter('我约等于白板',player,current);
					})){
						player.chooseTarget(true,filter,'选择一名其他角色，令其交给你一张牌').set('ai',lib.skill.shuaiyan.check2);
					}
					else event.finish();
					'step 2'
					var target=result.targets[0];
					event.target=target;
					player.line(target,'green');
					target.chooseCard('he',true,'交给'+get.translation(player)+'一张牌');
					'step 3'
					player.gain(result.cards,target,'giveAuto')
				},
			},
			relihuo:{
				audio:2,
				group:['relihuo_baigei','relihuo_damage'],
				trigger:{player:'useCard1'},
				filter:function(event,player){
					if(event.card.name=='sha'&&!event.card.nature) return true;
				},
				check:function(event,player){
					return false;
				},
				content:function(){
					trigger.card.nature='fire';
					trigger.relihuo=true;
				},
			},
			relihuo_damage:{
				trigger:{source:'damageBegin1'},
				forced:true,
				audio:'relihuo',
				filter:function(event,player){
					return event.getParent(2).relihuo==true;
				},
				content:function(){
					trigger.num++;
				},
			},
			relihuo_baigei:{
				trigger:{player:'useCardAfter'},
				forced:true,
				audio:'relihuo',
				filter:function(event,player){
					if(event.card.name!='sha'||event.card.nature!='fire') return false;
					var num=0;
					player.getHistory('sourceDamage',function(evt){
						if(evt.card==event.card) num+=evt.num;
					});
					return num>1;
				},
				content:function(){
					var num=0;
					player.getHistory('sourceDamage',function(evt){
						if(evt.card==trigger.card) num+=evt.num;
					});
					player.loseHp(Math.floor(num/2));
				},
			},
			gongsun:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>1;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt2('gongsun'),
						selectCard:2,
						filterCard:lib.filter.cardDiscardable,
						filterTarget:lib.filter.notMe,
						position:'he',
						ai1:function(card){
							var friend=0,enemy=0,player=_status.event.player;
							var num=game.countPlayer(function(target){
								var att=get.attitude(player,target);
								if(att<0) enemy++;
								if(target!=player&&att>0) friend++;
								return true;
							});
							if(num>(friend+enemy+2)) return 0;
							if(friend<enemy) return 0;
							if(card.name=='sha') return 10-enemy;
							return 10-enemy-get.value(card);
						},
						ai2:function(target){
							return -get.attitude(_status.event.player,target)*(1+target.countCards('h'));
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('gongsun',target);
						player.discard(result.cards);
						player.addTempSkill('gongsun_shadow',{player:['phaseBegin','die']});
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(get.type(name)=='trick') list.push(['锦囊','',name]);
							else if(get.type(name)=='basic') list.push(['基本','',name]);
						}
						player.chooseButton(['请选择一个牌名',[list,'vcard'],true]).set('ai',function(button){
							return button.link[2]=='sha'?1:0;
						});
					}
					else event.finish();
					'step 2'
					player.storage.gongsun_shadow.push([target,result.links[0][2]]);
					player.popup(result.links[0][2],'soil');
					game.log(player,'选择了',''+get.translation(result.links[0][2]));
					player.markSkill('gongsun_shadow');
				},
			},
			gongsun_shadow:{
				global:'gongsun_shadow2',
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				marktext:'损',
				onremove:true,
				intro:{
					content:function(shadow){
						var str='';
						for(var i=0;i<shadow.length;i++){
							if(i>0) str+='<br>'
							str+=get.translation(shadow[i][0]);
							str+='：';
							str+=get.translation(shadow[i][1]);
						}
						return str;
					},
				},
				mod:{
					cardEnabled:function(card,player){
						var list=player.storage.gongsun_shadow;
						for(var i=0;i<list.length;i++){
							if(list[i][1]==card.name) return false;
						}
					},
					cardRespondable:function(card,player){
						var list=player.storage.gongsun_shadow;
						for(var i=0;i<list.length;i++){
							if(list[i][1]==card.name) return false;
						}
					},
					cardSavable:function(card,player){
						var list=player.storage.gongsun_shadow;
						for(var i=0;i<list.length;i++){
							if(list[i][1]==card.name) return false;
						}
					},
					cardDiscardable:function(card,player){
						var list=player.storage.gongsun_shadow;
						for(var i=0;i<list.length;i++){
							if(list[i][1]==card.name) return false;
						}
					},
				},
			},
			gongsun_shadow2:{
				mod:{
					cardEnabled:function(card,player){
						if(game.hasPlayer(function(current){
 						var list=current.storage.gongsun_shadow;
 						if(!list) return false;
 						for(var i=0;i<list.length;i++){
 							if(list[i][0]==player&&list[i][1]==card.name) return true;
 						}
 						return false;
						})) return false;
					},
					cardSavable:function(card,player){
						if(game.hasPlayer(function(current){
 						var list=current.storage.gongsun_shadow;
 						if(!list) return false;
 						for(var i=0;i<list.length;i++){
 							if(list[i][0]==player&&list[i][1]==card.name) return true;
 						}
 						return false;
						})) return false;
					},
					cardRespondable:function(card,player){
						if(game.hasPlayer(function(current){
 						var list=current.storage.gongsun_shadow;
 						if(!list) return false;
 						for(var i=0;i<list.length;i++){
 							if(list[i][0]==player&&list[i][1]==card.name) return true;
 						}
 						return false;
						})) return false;
					},
					cardDiscardable:function(card,player){
						if(game.hasPlayer(function(current){
 						var list=current.storage.gongsun_shadow;
 						if(!list) return false;
 						for(var i=0;i<list.length;i++){
 							if(list[i][0]==player&&list[i][1]==card.name) return true;
 						}
 						return false;
						})) return false;
					},
				},
			},
			duoduan:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha'&&player.countCards('he')>0&&!player.hasSkill('duoduan_im');
				},
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt2('duoduan')).set('ai',function(card){
						if(_status.event.goon) return 8-get.value(card);
						return 0;
					}).set('goon',function(){
						if(get.attitude(trigger.player,player)>0) return true;
						if(!trigger.player.countCards('he')) return true;
						if(!player.hasShan()) return true;
						return event.getRand()<0.5;
					}());
					'step 1'
					if(result.bool){
						player.addTempSkill('duoduan_im');
						var card=result.cards[0];
						player.logSkill('duoduan',trigger.player);
						player.lose(card,ui.discardPile,'visible');
						player.$throw(card,1000);
						game.log(player,'将',card,'置入弃牌堆');
						player.draw();
					}
					else event.finish();
					'step 2'
					var sha=get.translation(trigger.card);
					if(!trigger.player.countCards('he',function(card){
						return lib.filter.cardDiscardable(card,trigger.player,'duoduan');
					})) event.finish();
					else player.chooseControl().set('choiceList',[
						'令其摸两张牌，然后令'+sha+'对你无效',
						'令其弃置一张牌，然后你不可响应'+sha,
					]).set('prompt','度断：令'+get.translation(trigger.player)+'执行一项').set('ai',function(){
						var player=_status.event.player;
						var source=_status.event.getTrigger().player;
						if(get.attitude(player,source)>0) return 0;
						if(!player.hasShan()&&player.hp>=2) return 1;
						return 0;
					});
					'step 3'
					if(result.index==0) event.goto(5);
					else trigger.player.chooseToDiscard('弃置一张牌令'+get.translation(player)+'不能闪避此【杀】','he',true);
					'step 4'
					if(result.bool){
						trigger.directHit.add(player);
					}
					event.finish();
					'step 5'
					trigger.player.draw(2);
					trigger.excluded.add(player);
				},
			},
			duoduan_im:{
				//'im' refers to 'Iwasawa Masami' in 'Angel Beats!'
				//Although she disappeared in the Episode 3 of the anime, but her route in the game is really worth to play.
			},
			chengzhao:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				filter:function(event,player){
					var num=0;
					player.getHistory('gain',function(evt){
						num+=evt.cards.length;
					});
					if(num<2) return false;
					return player.countCards('h')>0&&game.hasPlayer(function(current){
						return player!=current&&player.canCompare(current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('chengzhao'),function(card,player,target){
						return player.canCompare(target);
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target)/target.countCards('h');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('chengzhao',target);
						player.chooseToCompare(target);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var card={name:'sha',isCard:true};
						if(player.canUse(card,target,false)) player.useCard(card,target,false).card.chengzhao=true;
					}
				},
				ai:{
					unequip:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||arg.card.chengzhao!=true) return false;
					},
				},
			},
			rezhengrong:{
				trigger:{player:'useCardAfter'},
				direct:true,
				audio:'drlt_zhenrong',
				filter:function(event,player){
					if(!event.targets) return false;
					if(!event.isPhaseUsing(player)) return false;
					var bool=false;
					for(var i=0;i<event.targets.length;i++){
						if(event.targets[i]!=player){bool=true;break}
					}
					if(!bool) return false;
					return player.getAllHistory('useCard',function(evt){
						if(!evt.isPhaseUsing(player)) return false;
						for(var i=0;i<evt.targets.length;i++){
							if(evt.targets[i]!=player) return true;
						}
						return false;
					}).indexOf(event)%2==1;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('rezhengrong'),'将一名其他角色的随机一张牌置于你的武将牌上，成为「荣」',function(card,player,target){
						return target!=player&&target.countCards('he')>0;
					}).set('ai',function(target){
						return (1-get.attitude(_status.event.player,target))/target.countCards('he');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=result.targets[0];
						player.logSkill('rezhengrong',target);
						var card=target.getCards('he').randomGet();
						game.log(player,'选择了',card);
						target.$give(card,player,false);
						target.lose(card,ui.special,'toStorage');
						if(!player.storage.rezhengrong) player.storage.rezhengrong=[];
						player.storage.rezhengrong.push(card);
						player.markSkill('rezhengrong');
						game.delayx();
					}
				},
				marktext:'荣',
				intro:{
					content:'cards',
					onunmark:'throw',
				},
			},
			rehongju:{
				trigger:{player:'phaseZhunbeiBegin'},
				audio:'drlt_hongju',
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				derivation:'reqingce',
				filter:function(event,player){
					return player.storage.rezhengrong&&player.storage.rezhengrong.length>=3&&game.dead.length>0;
				},
				content:function(){
					'step 0'
					player.awakenSkill('rehongju');
					player.draw(player.storage.rezhengrong.length);
					'step 1'
					if(player.countCards('h')==0) event.goto(3);
					else{
						var dialog=['请选择要交换的手牌和「荣」，或点「取消」','<div class="text center">「征荣」牌</div>',player.storage.rezhengrong,'<div class="text center">手牌区</div>',player.getCards('h')];
						var next=player.chooseButton(dialog);
						next.set('filterButton',function(button){
							var ss=_status.event.player.storage.rezhengrong;
							var hs=_status.event.player.getCards('h');
							var sn=0;
							var hn=0;
							var ub=ui.selected.buttons;
							for(var i=0;i<ub.length;i++){
								if(ss.contains(ub[i].link)) sn++;
								else hn++;
							}
							return !(sn>=hs.length&&ss.contains(button.link)||hn>=ss.length&&hs.contains(button.link));
						});
						next.set('selectButton',function(){
							if(ui.selected.buttons.length==0) return 2;
							var ss=_status.event.player.storage.rezhengrong;
							var hs=_status.event.player.getCards('h');
							var sn=0;
							var hn=0;
							var ub=ui.selected.buttons;
							for(var i=0;i<ub.length;i++){
								if(ss.contains(ub[i].link)) sn++;
								else hn++;
							}
							if(sn!=hn) return 2*Math.max(sn,hn);
							else{
								if(sn==ss.length||hn==hs.length||sn==hs.length||hn==ss.length) return ub.length;
								return [ub.length,ub.length+1];
							}
						});
						next.set('ai',function(){return -1});
					}
					'step 2'
					if(result.bool){
						var gains=[];
						var pushs=[];
						for(var i=0;i<result.links.length;i++){
							var card=result.links[i];
							if(player.storage.rezhengrong.contains(card)) gains.push(card);
							else pushs.push(card);
						}
						player.lose(pushs,ui.special,'toStorage');
						game.log(player,'将',pushs,'放在了武将牌上');
						player.gain(gains,'gain2','log','fromStorage');
						player.storage.rezhengrong.addArray(pushs);
						player.storage.rezhengrong.removeArray(gains);
						player.markSkill('rezhengrong');
					}
					'step 3'
					player.addSkill('reqingce');
					game.log(player,'获得了技能','#g【清侧】');
					player.loseMaxHp();
				},
			},
			reqingce:{
				enable:'phaseUse',
				audio:'drlt_qingce',
				filter:function(event,player){
					return player.storage.rezhengrong&&player.storage.rezhengrong.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('请选择要移去的「荣」',player.storage.rezhengrong,'hidden');
					},
					backup:function(links,player){
						return {
							card:links[0],
							filterCard:function(){return false},
							selectCard:-1,
							filterTarget:function(card,player,target){
								return target.countDiscardableCards(player,'ej')>0;
							},
							delay:false,
							audio:'drlt_qingce',
							content:lib.skill.reqingce.contentx,
							ai:{
								result:{
									target:function(player,target){
										var att=get.attitude(player,target);
										if(att>0&&(target.countCards('j')>0||target.countCards('e',function(card){
											return get.value(card,target)<0;
										}))) return 2;
										if(att<0&&target.countCards('e')>0&&!target.hasSkillTag('noe')) return -1;
										return 0;
									},
								},
							},
						}
					},
					prompt:function(links,player){
						return '弃置一名角色装备区或判定区内的一张牌';
					},
				},
				contentx:function(){
					'step 0'
					var card=lib.skill.reqingce_backup.card;
					player.$throw(card);
					game.cardsDiscard(card);
					player.storage.rezhengrong.remove(card);
					player[player.storage.rezhengrong.length>0?'markSkill':'unmarkSkill']('rezhengrong');
					'step 1'
					if(target.countDiscardableCards(player,'ej')>0){
						player.discardPlayerCard('ej',true,target);
					}
				},
				ai:{
					order:8,
					result:{
						player:function(player){
							if(game.hasPlayer(function(current){
								var att=get.attitude(player,current);
								if((att>0&&current.countCards('j')>0)||(att<0&&current.countCards('e')>0)) return true;
								return false;
							})) return 1;
							return 0;
						},
					},
				},
			},
			fengji:{
				audio:2,
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return typeof player.storage.fengji=='number'&&player.countCards('h')>=player.storage.fengji;
				},
				content:function(){
					player.draw(2);
					player.addTempSkill('fengji3');
				},
				group:'fengji2',
				intro:{
					content:'上回合结束时的手牌数：#',
				},
			},
			fengji2:{
				trigger:{player:'phaseEnd'},
				silent:true,
				content:function(){
					player.storage.fengji=player.countCards('h');
					if(player.hasSkill('fengji')) player.markSkill('fengji');
				},
			},
			fengji3:{
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					},
				},
			},
			zhouxuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				filterTarget:lib.filter.notMe,
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					player.addSkill('zhouxuan2');
					target.addTempSkill('zhouxuan_ai',{player:'phaseUseAfter'});
					player.storage.zhouxuan2={};
					player.storage.zhouxuan2.player=target;
					var list=[];
					var basic=[];
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var type=get.type(name,'trick');
						if(type=='basic'){
							list.push(name);
							basic.push(name);
						}
						else list.add(type);
					}
					event.basic=basic;
					player.chooseControl(list).set('prompt','请选择一种基本牌的名称或非基本牌的类别').set('ai',function(){
						var player=_status.event.player;
						var target=player.storage.zhouxuan2.player;
						var cards=target.getCards('h',function(card){
							return target.hasUseTarget(card);
						});
						var map={};
						for(var i=0;i<cards.length;i++){
							var type=get.type(cards[i],'trick');
							map[type=='basic'?get.name(cards[i]):type]=true;
						}
						if(map.equip) return 'equip';
						if(map.trick) return 'trick';
						if(map.sha) return 'sha';
						if(map.tao) return 'tao';
						return 0;
					});
					'step 1'
					player.storage.zhouxuan2.card=result.control;
					if(event.basic.contains(result.control)) player.storage.zhouxuan2.isbasic=true;
					player.markSkill('zhouxuan2');
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(get.attitude(player,target)>0) return Math.max(1,target.hp)*target.countCards('h',function(card){
								return target.getUseValue(card)>0;
							});
							return 0;
						},
					},
				},
			},
			zhouxuan_ai:{
				mod:{
					aiOrder:function(player,card,num){
						if(game.hasPlayer(function(current){
							return current.storage.zhouxuan2&&current.storage.zhouxuan2.player==player&&get.attitude(player,current)>0&&(current.storage.zhouxuan2.isbasic?card.name:get.type(card,'trick'))==current.storage.zhouxuan2.card;
						})) return num+10;
					}
				},
			},
			zhouxuan2:{
				intro:{
					mark:function(player,storage){
						return get.translation(storage.player)+'使用或打出下一张牌时，若此牌为'+get.translation(storage.card)+(storage.isbasic?'':'牌')+'，你观看牌堆顶的三张牌并分配给任意角色';
					},
				},
				audio:'zhouxuan',
				forced:true,
				charlotte:true,
				trigger:{global:['useCard','respond']},
				filter:function(event,player){
					if(event.zhouxuanable) return true;
					if(player.storage.zhouxuan2){
						var map=player.storage.zhouxuan2;
						if(map.player!=event.player) return false;
						delete player.storage.zhouxuan2;
						player.unmarkSkill('zhouxuan2');
						if(map.card!=(map.isbasic?event.card.name:get.type(event.card,'trick'))) return false;
						event.zhouxuanable=true;
						return true;
					}
					return false;
				},
				logTarget:'player',
				content:function(){
					"step 0"
					event.cards=game.cardsGotoOrdering(get.cards(3)).cards;
					"step 1"
					if(event.cards.length>1){
						player.chooseCardButton('周旋：请选择要分配的牌',true,event.cards,[1,event.cards.length]).set('ai',function(button){
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
						}).set('enemy',get.value(event.togive[0],player,'raw')<0);
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
			reshanxi:{
				audio:'shanxi',
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.hp>0&&player.countCards('h',function(card){
						if(_status.connectMode) return true;
						return get.color(card)=='red'&&get.type(card)=='basic';
					})>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						filterCard:function(card){
							return get.color(card)=='red'&&get.type(card)=='basic'&&lib.filter.cardDiscardable.apply(this,arguments);
						},
						filterTarget:function(card,player,target){
							return player!=target&&target.countCards('he')>0;
						},
						prompt:get.prompt('reshanxi'),
						prompt2:'弃置一张红色基本牌并选择一名其他角色，将其的至多X张牌置于其武将牌上直到回合结束。（X为你的体力值）',
						ai1:function(){return -1},
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						player.logSkill('reshanxi',event.target);
						player.discard(result.cards);
					}
					else event.finish();
					'step 2'
					var max=Math.min(player.hp,target.countCards('he'));
					if(max>0){
						player.choosePlayerCard('he',target,true,[1,max]).set('forceAuto',true).set('prompt','将'+get.translation(target)+'的至多'+get.cnNumber(max)+'张牌置于其武将牌上');
					}
					else event.finish();
					'step 3'
					target.addSkill('reshanxi2');
					target.storage.reshanxi2.addArray(result.cards);
					target.lose(result.cards,ui.special,'toStorage');
					game.log(target,'失去了'+get.cnNumber(result.cards.length)+'张牌');
					target.markSkill('reshanxi2');
				},
			},
			reshanxi2:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				trigger:{global:'phaseEnd'},
				forced:true,
				popup:false,
				charlotte:true,
				filter:function(event,player){
					return player.storage.reshanxi2&&player.storage.reshanxi2.length>0;
				},
				content:function(){
					game.log(player,'收回了'+get.cnNumber(player.gain(player.storage.reshanxi2,'draw','fromStorage').cards.length)+'张〖闪袭〗牌');
					player.storage.reshanxi2.length=0;
					player.removeSkill('reshanxi2');
				},
				intro:{
					onunmark:'throw',
					content:'cardCount',
				},
			},
			reqizhou:{
				trigger:{player:['equipEnd','loseEnd']},
				forced:true,
				popup:false,
				derivation:['reyingzi','qixi','rexuanfeng'],
				filter:function(event,player){
					if(player.equiping) return false;
					var suits=[];
					var es=player.getCards('e');
					for(var i=0;i<es.length;i++){
						suits.add(get.suit(es[i]));
					}
					if(suits.length>3) suits.length=3;
					if(player.additionalSkills.reqizhou){
						return player.additionalSkills.reqizhou.length!=suits.length;
					}
					else{
						return suits.length>0;
					}
				},
				content:function(){
					lib.skill.reqizhou.init(player,'reqizhou');
				},
				init:function(player,skill){
					var suits=[];
					var es=player.getCards('e');
					for(var i=0;i<es.length;i++){
						suits.add(get.suit(es[i]));
					}
					if(suits.length>3) suits.length=3;
					player.removeAdditionalSkill(skill);
					switch(suits.length){
						case 1:player.addAdditionalSkill(skill,['reyingzi']);break;
						case 2:player.addAdditionalSkill(skill,['reyingzi','qixi']);break;
						case 3:player.addAdditionalSkill(skill,['reyingzi','qixi','rexuanfeng']);break;
					}
				},
				ai:{
					threaten:1.2
				}
			},
			zhaohan:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.phaseNumber<8;
				},
				check:function(event,player){
					return player.phaseNumber<3;
				},
				content:function(){
					if(player.phaseNumber<5){
						player.gainMaxHp();
						player.recover();
					}
					else player.loseMaxHp();
				},
			},
			rangjie:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					var choiceList=['获得一张指定类型的牌'];
					if(player.canMoveCard()) choiceList.push('移动场上的一张牌');
					player.chooseControl('cancel2').set('choiceList',choiceList).set('prompt',get.prompt('rangjie')).set('ai',function(){
						var player=_status.event.player;
						if(player.canMoveCard(true)) return 1;
						return 0;
					});
					'step 2'
					if(result.control=='cancel2') event.finish();
					else{
						player.logSkill('rangjie');
						player.draw();
						if(result.index==0){
							player.chooseControl('basic','trick','equip').set('prompt','选择获得一种类型的牌').set('ai',function(){
								var player=_status.event.player;
								if(player.hp<=3&&!player.countCards('h',{name:['shan','tao']})) return 'basic';
								if(player.countCards('he',{type:'equip'})<2) return 'equip';
								return 'trick';
							});
						}
						else{
							player.moveCard(true);
							event.goto(4);
						}
					}
					'step 3'
					var card=get.cardPile2(function(card){
						return get.type(card,'trick')==result.control;
					});
					if(card) player.gain(card,'gain2','log');
					'step 4'
					if(event.count>0) event.goto(1);
				},
				ai:{
					maixie:true,
					"maixie_hp":true,
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
						},
					},
				},
			},
			yizheng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.hp<=player.hp&&player.canCompare(current);
					});
				},
				filterTarget:function(card,player,current){
					return current.hp<=player.hp&&player.canCompare(current);
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						target.skip('phaseDraw');
						target.addTempSkill('yizheng2',{player:'phaseDrawSkipped'});
					}
					else player.loseMaxHp();
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(target.skipList.contains('phaseDraw')||target.hasSkill('pingkou')) return 0;
							var hs=player.getCards('h').sort(function(a,b){
								return b.number-a.number;
							});
							var ts=target.getCards('h').sort(function(a,b){
								return b.number-a.number;
							});
							if(!hs.length||!ts.length) return 0;
							if(hs[0].number>ts[0].number) return -1;
							return 0;
						},
					},
				},
			},
			yizheng2:{
				mark:true,
				intro:{content:'跳过下回合的摸牌阶段'},
			},
			rw_zhuge_skill:{
				equipSkill:true,
				audio:true,
				firstDo:true,
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
				},
				content:function(){
					trigger.audioed=true;
				},
				mod:{
					cardUsable:function(card,player,num){
						var cardx=player.getEquip('rewrite_zhuge');
						if(card.name=='sha'&&(!cardx||player.hasSkill('rw_zhuge_skill',null,false)||(!_status.rw_zhuge_temp&&!ui.selected.cards.contains(cardx)))){
							return Infinity;
						}
					},
					cardEnabled2:function(card,player){
						if(!_status.event.addCount_extra||player.hasSkill('rw_zhuge_skill',null,false)) return;
						if(card&&card==player.getEquip('rewrite_zhuge')){
							_status.rw_zhuge_temp=true;
							var bool=lib.filter.cardUsable(get.autoViewAs({name:'sha'},ui.selected.cards.concat([card])),player);
							delete _status.rw_zhuge_temp;
							if(!bool) return false;
						}
					},
				},
			},
			xinqingjian:{
				audio:'qingjian',
				trigger:{player:'gainEnd'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return event.getParent('phaseDraw').player!=player&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('xinqingjian'),'he',[1,player.countCards('he')]).ai=function(){return -1};
					'step 1'
					if(result.bool){
						player.logSkill('xinqingjian');
						player.addSkill('xinqingjian2');
						player.storage.xinqingjian2.addArray(result.cards);
						game.log(player,'将'+get.cnNumber(player.lose(result.cards,ui.special,'toStorage').cards.length)+'张牌置于其武将牌上');
						player.markSkill('xinqingjian2');
					}
					else player.storage.counttrigger.xinqingjian--;
				},
			},
			xinqingjian2:{
				audio:'xinqingjian',
				charlotte:true,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.storage.xinqingjian2&&player.storage.xinqingjian2.length>0;
				},
				init:function(player){
					if(!player.storage.xinqingjian2) player.storage.xinqingjian2=[];
				},
				content:function(){
					'step 0'
					player.chooseTarget(true,lib.filter.notMe).set('createDialog',['清俭：选择一名角色获得这些牌'+(player.storage.xinqingjian2.length>1?'，然后摸一张牌':''),player.storage.xinqingjian2]);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						if(target.gain(player.storage.xinqingjian2,player,'giveAuto','fromStorage').cards.length>1) player.draw();
						player.storage.xinqingjian2.length=0;
						player.removeSkill('xinqingjian2');
					}
				},
				intro:{
					onunmark:'throw',mark:function(dialog,content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								dialog.addAuto(content);
							}
							else{
								return '共有'+get.cnNumber(content.length)+'张牌';
							}
						}
					},
					content:function(content,player){
						if(content&&content.length){
							if(player==game.me||player.isUnderControl()){
								return get.translation(content);
							}
							return '共有'+get.cnNumber(content.length)+'张牌';
						}
					}
				},
			},
			zhongzuo:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getHistory('damage').length>0||player.getHistory('sourceDamage').length>0;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhongzuo'),'令一名角色摸两张牌。若其已受伤，则你摸一张牌。').set('ai',function(target){
						if(target.hasSkillTag('nogain')&&target!=_status.currentPhase) return target.isDamaged()?0:1;
						var att=get.attitude(_status.event.player,target);
						if(target.isDamaged()) att=att*1.2;
						return att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zhongzuo',target);
						target.draw(2);
						if(target.isDamaged()) player.draw();
					}
				},
			},
			wanlan:{
				audio:2,
				trigger:{global:'dying'},
				check:function(event,player){
					if(get.attitude(player,event.player)<4) return false;
					if(player.countCards('h',function(card){
						var mod2=game.checkMod(card,player,'unchanged','cardEnabled2',player);
						if(mod2!='unchanged') return mod2;
						var mod=game.checkMod(card,player,event.player,'unchanged','cardSavable',player);
						if(mod!='unchanged') return mod;
						var savable=get.info(card).savable;
						if(typeof savable=='function') savable=savable(card,player,event.player);
						return savable;
					})>=1-event.player.hp) return false;
					if(event.player==player||event.player==get.zhu(player)) return true;
					if(_status.currentPhase&&get.damageEffect(_status.currentPhase,player,player)<0) return false;
					return !player.hasUnknown();
				},
				limited:true,
				unique:true,
				filter:function(event,player){
					return event.player.hp<=0;
				},
				skillAnimation:true,
				animationColor:'thunder',
				logTarget:'player',
				content:function(){
					'step 0'
					player.awakenSkill('wanlan');
					var hs=player.getCards('h')
					if(hs.length) player.discard(hs);
					'step 1'
					var num=1-trigger.player.hp;
					if(num) trigger.player.recover(num);
					'step 2'
					if(_status.currentPhase&&_status.currentPhase.isAlive()){
						var next=_status.currentPhase.damage();
						event.next.remove(next);
						trigger.after.push(next);
					}
				},
			},
			rezhiyi:{
				audio:'zhiyi',
				trigger:{global:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return player.getHistory('useCard',function(card){
						return get.type(card.card)=='basic';
					}).length>0||player.getHistory('respond',function(card){
						return get.type(card.card)=='basic';
					}).length>0;
				},
				content:function(){
					'step 0'
					var list=[];
					player.getHistory('useCard',function(evt){
						if(get.type(evt.card)!='basic') return;
						var name=evt.card.name;
						if(name=='sha'){
							var nature=evt.card.nature;
							switch(nature){
								case 'fire':name='huosha';break;
								case 'thunder':name='leisha';break;
								case 'kami':name='kamisha';break;
								case 'ice':name='icesha';break;
							}
						}
						list.add(name);
					});
					player.getHistory('respond',function(evt){
						if(get.type(evt.card)!='basic') return;
						var name=evt.card.name;
						if(name=='sha'){
							var nature=evt.card.nature;
							switch(nature){
								case 'fire':name='huosha';break;
								case 'thunder':name='leisha';break;
								case 'kami':name='kamisha';break;
								case 'ice':name='icesha';break;
							}
						}
						list.add(name);
					});
					player.chooseButton(['执义：选择要使用的牌，或点取消摸一张牌',[list.map(function(name){
						return ['基本','',name];
					}),'vcard']],function(button){
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},function(button){
						return _status.event.player.hasUseTarget({name:button.link[2],nature:button.link[3]});
					});
					'step 1'
					if(!result.bool) player.draw();
					else player.chooseUseTarget({name:result.links[0][2],isCard:true,nature:result.links[0][3]});
				},
			},
			zhiyi:{
				audio:2,
				trigger:{player:['useCard','respond']},
				forced:true,
				filter:function(event,player){
					if(get.type(event.card)!='basic') return false;
					var history=player.getHistory('useCard',function(evt){
						return get.type(evt.card)=='basic';
					}).concat(player.getHistory('respond',function(evt){
						return get.type(evt.card)=='basic';
					}));
					return history.length==1&&history[0]==event;
				},
				content:function(){
					'step 0'
					var info=get.info(trigger.card);
					if(!info||!info.enable) event._result={index:0};
					else{
						var evt=trigger;
						if(evt.respondTo&&evt.getParent('useCard').name=='useCard') evt=evt.getParent('useCard');
						event.evt=evt;
						player.chooseControl().set('prompt','执义：请选择一项').set('choiceList',[
							'摸一张牌',
							'于'+get.translation(evt.card)+'的使用结算结束之后视为使用一张'+get.translation({name:trigger.card.name,nature:trigger.card.nature,isCard:true}),
						]).set('ai',function(){return _status.event.choice}).set('choice',function(){
							var card={name:trigger.card.name,nature:trigger.card.nature,isCard:true};
							if(card.name=='sha'){
								if(player.getUseValue(card)>0) return 1;
							}
							else if(card.name=='tao'){
								var hp=player.maxHp-player.hp;
								if(trigger.targets.contains(player)) hp--;
								return hp>0?1:0;
							}
							return 0;
						}());
					}
					'step 1'
					if(result.index==0){
						player.draw();
					}
					else{
						var next=player.chooseUseTarget({name:trigger.card.name,nature:trigger.card.nature,isCard:true},false,true);
						_status.event.next.remove(next);
						event.evt.after.push(next);
						next.logSkill='zhiyi';
					}
				},
			},
			//表演测试
			qiaosi_map:{charlotte:true},
			qiaosi:{
				audio:'xinfu_qiaosi',
				derivation:'qiaosi_map',
				enable:'phaseUse',
				usable:1,
				content:function(){
					"step 0"
					event.videoId=lib.status.videoId++;
					if(player.isUnderControl()){
						game.swapPlayerAuto(player);
					}
					var switchToAuto=function(){
						game.pause();
						game.countChoose();
						setTimeout(function(){
							_status.imchoosing=false;
							event._result={
								bool:true,
								links:['qiaosi_c1','qiaosi_c6'].concat(['qiaosi_c2','qiaosi_c3','qiaosi_c4','qiaosi_c5'].randomGets(1)),
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
							game.resume();
						},5000);
					};
					var createDialog=function(player,id){
						if(player==game.me) return;
						var str=get.translation(player)+'正在表演...<br>';
						for(var i=1;i<7;i++){
							str+=get.translation('qiaosi_c'+i);
							if(i%3!=0) str+='　　';
							if(i==3) str+='<br>';
						}
						ui.create.dialog(str,'forcebutton').videoId=id;
					};
					var chooseButton=function(player){
						var event=_status.event;
						player=player||event.player;
						event.status={
							qiaosi_c1:0,
							qiaosi_c2:0,
							qiaosi_c3:0,
							qiaosi_c4:0,
							qiaosi_c5:0,
							qiaosi_c6:0,
						}
						event.map={
							qiaosi_c1:[40,60],
							qiaosi_c2:[80,120],
							qiaosi_c3:[90,110],
							qiaosi_c4:[90,110],
							qiaosi_c5:[80,120],
							qiaosi_c6:[40,60],
						}
						event.finishedx=[];
						event.str='请开始你的表演<br><img src="'+lib.assetURL+'image/card/qiaosi_card1.png" width="60" height="60">qiaosi_c1% <img src="'+lib.assetURL+'image/card/qiaosi_card2.png" width="60" height="60">qiaosi_c2% <img src="'+lib.assetURL+'image/card/qiaosi_card3.png" width="60" height="60">qiaosi_c3%<br><img src="'+lib.assetURL+'image/card/qiaosi_card4.png" width="60" height="60">qiaosi_c4%<img src="'+lib.assetURL+'image/card/qiaosi_card5.png" width="60" height="60">qiaosi_c5% <img src="'+lib.assetURL+'image/card/qiaosi_card6.png" width="60" height="60">qiaosi_c6%';
						event.dialog=ui.create.dialog(event.str,'forcebutton','hidden');
						event.dialog.addText('<li>点击下方的按钮，可以增加按钮对应的角色的「表演完成度」。对于不同的角色，点击时增加的完成度不同，最终获得的牌也不同。一次表演最多只能完成3名角色的进度。',false);
						event.dialog.open();
						for(var i in event.status){
							event.dialog.content.childNodes[0].innerHTML=event.dialog.content.childNodes[0].innerHTML.replace(i,event.status[i]);
						}
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('pointerdiv');
						}
						event.switchToAuto=function(){
							event._result={
								bool:true,
								links:event.finishedx.slice(0),
							};
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing=false;
						},
						event.control=ui.create.control('qiaosi_c1','qiaosi_c2','qiaosi_c3','qiaosi_c4','qiaosi_c5','qiaosi_c6',function(link){
							var event=_status.event;
							if(event.finishedx.contains(link)) return;
							event.status[link]+=get.rand.apply(get,event.map[link]);
							if(event.status[link]>=100){
								event.status[link]=100;
								var str=event.str.slice(0);
								for(var i in event.status){
									str=str.replace(i,event.status[i]);
								}
								event.dialog.content.childNodes[0].innerHTML=str;
								event.finishedx.push(link);
								if(event.finishedx.length>=3){
									event._result={
										bool:true,
										links:event.finishedx.slice(0),
									};
									event.dialog.close();
									event.control.close();
									game.resume();
									_status.imchoosing=false;
								}
							}
							else{
								var str=event.str.slice(0);
								for(var i in event.status){
									str=str.replace(i,event.status[i]);
								}
								event.dialog.content.childNodes[0].innerHTML=str;
							}
						});
						for(var i=0;i<event.dialog.buttons.length;i++){
							event.dialog.buttons[i].classList.add('selectable');
						}
						game.pause();
						game.countChoose();
					};
					//event.switchToAuto=switchToAuto;
					game.broadcastAll(createDialog,player,event.videoId);
					if(event.isMine()){
						chooseButton();
					}
					else if(event.isOnline()){
						event.player.send(chooseButton,event.player);
						event.player.wait();
						game.pause();
					}
					else{
						switchToAuto();
					}
					"step 1"
					game.broadcastAll('closeDialog',event.videoId);
					var map=event.result||result;
					//game.print(map);
					if(!map||!map.bool||!map.links){
						game.log(player,'表演失败');
						event.finish();
						return;
					}
					var list=map.links;
					if(!list.length){
						game.log(player,'表演失败');
						event.finish();
						return;
					}
					var cards=[];
					var list2=[];
					if(list.contains('qiaosi_c1')){
						list2.push('trick');
						list2.push('trick');
					}
					if(list.contains('qiaosi_c2')){
						if(list.contains('qiaosi_c1')) list2.push(['sha','jiu']);
						else list2.push(Math.random()<0.66?'equip':['sha','jiu']);
					}
					if(list.contains('qiaosi_c3')){
						list2.push([Math.random()<0.66?'sha':'jiu'])
					}
					if(list.contains('qiaosi_c4')){
						list2.push([Math.random()<0.66?'shan':'tao'])
					}
					if(list.contains('qiaosi_c5')){
						if(list.contains('qiaosi_c6')) list2.push(['shan','tao']);
						else list2.push(Math.random()<0.66?'trick':['shan','tao']);
					}
					if(list.contains('qiaosi_c6')){
						list2.push('equip');
						list2.push('equip');
					}
					while(list2.length){
						var filter=list2.shift();
						var card=get.cardPile(function(x){
							if(cards.contains(x)) return false;
							if(typeof filter=='string'&&get.type(x,'trick')==filter) return true;
							if(typeof filter=='object'&&filter.contains(x.name)) return true;
						});
						if(card) cards.push(card);
						else{
							var card=get.cardPile(function(x){
								return !cards.contains(x);
							});
							if(card) cards.push(card);
						}
					}
					if(cards.length){
						event.cards=cards;
						event.num=cards.length;
						player.showCards(cards);
					}
					else event.finish();
					"step 2"
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
					"step 3"
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
							prompt:'选择'+get.cnNumber(event.num)+'张牌，交给一名其他角色。',
							forced:true,
						});
					}
					else{
						player.chooseToDiscard(event.num,true,'he');
						event.finish();
					}
					"step 4"
					if(result.bool){
						var target=result.targets[0];
						player.give(result.cards,target);
					}
				},
				ai:{
					order:10,
					result:{player:1},
					threaten:3.2,
				}
			},
			refuhai:{
				audio:'xinfu_fuhai',
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					event.current=player.next;
					event.upper=[];
					event.lower=[];
					event.acted=[];
					event.num=0;
					event.stopped=false;
					'step 1'
					event.acted.push(event.current);
					event.current.chooseControl('潮起','潮落').set('prompt','潮鸣起乎？潮鸣落乎？').ai=function(){
						return Math.random()<0.5?0:1;
					};
					'step 2'
					if(!event.chosen) event.chosen=result.control;
					if(event.chosen!=result.control) event.stopped=true;
					if(!event.stopped) event.num++;
					if(result.control=='潮起'){
						event.upper.push(event.current)
					}
					else event.lower.push(event.current);
					event.current=event.current.next;
					if(event.current!=player&&!event.acted.contains(event.current)) event.goto(1);
					'step 3'
					for(var i=0;i<event.acted.length;i++){
						var bool=event.upper.contains(event.acted[i]);
						game.log(event.acted[i],'选择了',bool?'#g潮起':'#y潮落');
						event.acted[i].popup(bool?'潮起':'潮落',bool?'wood':'orange');
					}
					game.delay(1);
					'step 4'
					if(num>1) player.draw(num);
				},
				ai:{
					order:10,
					result:{player:1},
				},
			},
			rebiaozhao:{
				audio:'biaozhao',
				intro:{
					content:"cards",
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&!player.storage.rebiaozhao;
				},
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt2('rebiaozhao')).ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.addSkill('rebiaozhao2');
						player.addSkill('rebiaozhao3');
						player.logSkill('rebiaozhao');
						player.$give(result.cards,player,false);
						player.lose(result.cards,ui.special,'toStorage','visible');
						player.storage.rebiaozhao=result.cards;
						player.markSkill('rebiaozhao');
					}
				},
			},
			"rebiaozhao2":{
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
				},
				charlotte:true,
				forced:true,
				audio:"biaozhao",
				filter:function(event,player){
					if(!player.storage.rebiaozhao) return false;
					var num=get.number(player.storage.rebiaozhao[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i],true)=='d'&&get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					var card=player.storage.rebiaozhao[0];
					delete player.storage.rebiaozhao;
					player.$throw(card);
					game.cardsDiscard(card);
					"step 1"
					player.unmarkSkill('rebiaozhao');
					player.loseHp();
				},
			},
			"rebiaozhao3":{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				charlotte:true,
				audio:"biaozhao",
				filter:function(event,player){
					return player.storage.rebiaozhao!=undefined;
				},
				content:function(){
					"step 0"
					var card=player.storage.rebiaozhao[0];
					delete player.storage.rebiaozhao;
					player.unmarkSkill('rebiaozhao');
					game.cardsDiscard(card);
					player.chooseTarget('令一名角色摸三张牌并回复1点体力',true).ai=function(target){
						var num=2;
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.draw(3);
						target.recover();
					}
				},
			},
			reqianxin:{
				audio:'xinfu_qianxin',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				selectCard:function(){
					return [1,Math.min(2,game.players.length-1)];
				},
				check:function(card){
					return 6-get.value(card);
				},
				discard:false,
				lose:false,
				delay:0,
				content:function(){
					var targets=game.filterPlayer(function(current){
						return current!=player;
					}).randomGets(cards.length);
					for(var i=0;i<targets.length;i++){
						var target=targets[i];
						target.addSkill('reqianxin2');
						target.storage.reqianxin2.push([cards[i],player]);
						player.$give(1,target);
						target.gain(cards[i],player);
					}
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			reqianxin2:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				popup:false,
				charlotte:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				onremove:true,
				filter:function(event,player){
					var list=player.storage.reqianxin2;
					if(Array.isArray(list)){
						var hs=player.getCards('h');
						for(var i=0;i<list.length;i++){
							if(hs.contains(list[i][0])&&list[i][1].isIn()) return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					var current=player.storage.reqianxin2.shift();
					event.source=current[1];
					if(!event.source.isIn()||!player.getCards('h').contains(current[0])) event.goto(3);
					'step 1'
					source.logSkill('reqianxin',player);
					player.chooseControl().set('choiceList',[
						'令'+get.translation(source)+'摸两张牌',
						'令自己本回合的手牌上限-2',
					]).set('prompt',get.translation(source)+'发动了【遣信】，请选择一项').set('source',source).set('ai',function(){
						var player=_status.event.player;
						if(get.attitude(player,_status.event.source)>0) return 0;
						if(player.maxHp-player.countCards('h')>1) return 1;
						return Math.random()>0.5?0:1;
					});
					'step 2'
					if(result.index==0) source.draw(2);
					else{
						player.addTempSkill('reqianxin3')
						player.addMark('reqianxin3',2,false)
					}
					'step 3'
					if(player.storage.reqianxin2.length) event.goto(0);
					else player.removeSkill('reqianxin2');
				},
			},
			reqianxin3:{
				onremove:true,
				mod:{
					maxHandcard:function(player,num){
						return num-player.countMark('reqianxin3');
					},
				},
			},
			renshi:{
				audio:2,
				trigger:{player:'damageBegin4'},
				forced:true,
				filter:function(event,player){
					return player.isDamaged()&&event.card&&event.card.name=='sha';
				},
				content:function(){
					'step 0'
					trigger.cancel();
					var cards=trigger.cards.filterInD();
					if(cards.length) player.gain(cards,'gain2','log');
					'step 1'
					player.loseMaxHp();
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.card&&arg.card.name=='sha') return true;
						return false;
					},
				},
			},
			wuyuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h','sha')>0;
				},
				filterCard:{name:'sha'},
				filterTarget:lib.filter.notMe,
				check:function(card){
					var player=_status.event.player;
					if(get.color(card)=='red'&&game.hasPlayer(function(current){
						return current!=player&&current.isDamaged()&&get.attitude(player,current)>2;
					})) return 2;
					if(get.nature(card)) return 1.5;
					return 1;
				},
				discard:false,
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					player.recover();
					'step 1'
					var num=1;
					if(get.nature(cards[0])) num++;
					target.draw(num);
					if(get.color(cards[0])=='red') target.recover();
				},
				ai:{
					order:1,
					result:{
						player:function(player,target){
							if(player.isDamaged()) return 1;
							return 0;
						},
						target:function(player,target){
							if(ui.selected.cards.length){
								var num=1;
								if(get.nature(ui.selected.cards[0])) num++;
								if(target.hasSkillTag('nogain')) num=0;
								if(get.color(ui.selected.cards[0])=='red') return num+2
								else return num+1;
							}
							return 1;
						},
					},
				},
			},
			huaizi:{
				mod:{
					maxHandcardBase:function(player,num){
						return player.maxHp;
					},
				},
				//audio:2,
				//trigger:{player:'phaseDiscardBegin'},
				forced:true,
				firstDo:true,
				filter:function(event,player){
					return player.isDamaged()&&player.countCards('h')>player.hp;
				},
				content:function(){},
			},
			rexushen:{
				derivation:['new_rewusheng','redangxian'],
				audio:'xinfu_xushen',
				limited:true,
				enable:'phaseUse',
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current.sex=='male';
					})
				},
				skillAnimation:true,
				animationColor:'fire',
				content:function(){
					player.addSkill('rexushen2');
					player.awakenSkill('rexushen');
					player.loseHp(game.countPlayer(function(current){
						return current.sex=='male';
					}));
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.hp!=game.countPlayer(function(current){
								return current.sex=='male';
							})) return 0;
							return game.hasPlayer(function(current){
								return get.attitude(player,current)>4&&current.countCards('h','tao')
							})?1:0;
						},
					},
				},
			},
			rexushen2:{
				charlotte:true,
				subSkill:{
					count:{
						trigger:{
							player:"recoverBegin",
						},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(!event.source) return false;
							if(!player.isDying()) return false;
							var evt=event.getParent('dying').getParent(2);
							return evt.name=='rexushen'&&evt.player==player;
						},
						content:function(){
							trigger.rexushen=true;
						},
						sub:true,
					},
				},
				group:["rexushen2_count"],
				trigger:{
					player:"recoverAfter",
				},
				filter:function(event,player){
					if(player.isDying()) return false;
					return event.rexushen==true;
				},
				direct:true,
				silent:true,
				popup:false,
				content:function(){
					'step 0'
					player.removeSkill('rexushen2');
					player.chooseBool('是否令'+get.translation(trigger.source)+'获得技能〖武圣〗和〖当先〗').ai=function(){
						return get.attitude(player,trigger.source)>0;
					};
					'step 1'
					if(result.bool){
						player.line(trigger.source,'fire');
						trigger.source.addSkillLog('new_rewusheng');
						trigger.source.addSkillLog('redangxian');
					}
				},
			},
			rezhennan:{
				audio:'xinfu_zhennan',
				trigger:{target:'useCardToTargeted'},
				filter:function(event,player){
					return event.player!=player&&event.targets&&event.targets.length&&event.targets.length>event.player.hp;
				},
				direct:true,
				content:function(){
					'step 0'
					var next=player.chooseToDiscard(get.prompt('rezhennan',trigger.player),'弃置一张牌并对其造成1点伤害','he');
					next.set('logSkill',['rezhennan',trigger.player]);
					next.set('ai',function(card){
						var player=_status.event.player;
						var target=_status.event.getTrigger().player;
						if(get.damageEffect(target,player,player)>0) return 7-get.value(card);
						return -1;
					});
					'step 1'
					if(result.bool) trigger.player.damage();
				},
			},
			meiyong:{
				inherit:'xinfu_wuniang',
				audio:'xinfu_wuniang',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('meiyong'),'获得一名其他角色的一张牌，然后其摸一张牌。',function(card,player,target){
						if(player==target) return false;
						return target.countGainableCards(player,'he')>0;
					}).set('ai',function(target){
						return 10-get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('meiyong',target);
						player.gainPlayerCard(target,'he',true);
					}
					else event.finish();
					'step 2'
					target.draw();
				},
			},
			relianji:{
				audio:'wylianji',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.players.length>1;
				},
				filterTarget:lib.filter.notMe,
				targetprompt:['打人','被打'],
				selectTarget:2,
				multitarget:true,
				content:function(){
					'step 0'
					game.delay(0.5);
					if(targets[0].isDisabled(1)) event.goto(2);
					'step 1'
					var target=targets[0];
					var equip1=get.cardPile2(function(card){
						return get.subtype(card)=='equip1';
					});
					if(!equip1){
						player.popup('连计失败');
						game.log('牌堆中无装备');
						event.finish();
						return;
					}
					if(equip1.name=='qinggang'&&!lib.inpile.contains('qibaodao')){
						equip1.remove();
						equip1=game.createCard('qibaodao',equip1.suit,equip1.number);
					}
					target.$draw(equip1);
					target.chooseUseTarget(equip1,'noanimate','nopopup',true);
					'step 2'
					game.updateRoundNumber();
					var list=['nanman','wanjian','huogong','juedou','sha'];
					var list2=game.players.slice(0);
					list2.remove(player);
					for(var i=0;i<list.length;i++){
						if(!targets[0].canUse(list[i],targets[1],false)) list.splice(i--,1);
					}
					if(!list.length) return;
					var name=list.randomGet();
					if(name=='nanman'||name=='wanjian'){
						for(var i=0;i<list2.length;i++){
							if(!targets[0].canUse(name,list2[i],false)) list2.splice(i--,1);
						}
					}
					else list2=targets[1];
					targets[0].useCard({name:name,isCard:true},list2,'noai');
					game.delay(0.5);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(ui.selected.targets.length==0){
								return 1;
							}
							else{
								return -1;
							}
						}
					},
					expose:0.4,
					threaten:3,
				},
				group:'relianji_count',
				subSkill:{
					count:{
						sub:true,
						forced:true,
						popup:false,
						silent:true,
						trigger:{global:'damageEnd'},
						filter:function(event,player){
							var evt=event.getParent(3);
							return evt&&evt.name=='relianji'&&evt.player==player;
						},
						content:function(){
							if(!player.storage.relianji) player.storage.relianji=0;
							player.storage.relianji++;
							if(player.storage.relianji>2){
								event.trigger('remoucheng_awaken');
							}
						},
					},
				},
			},
			remoucheng:{
				derivation:'jingong',
				trigger:{
					player:'remoucheng_awaken'
				},
				forced:true,
				audio:'moucheng',
				juexingji:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					player.awakenSkill('remoucheng');
					player.removeSkill('relianji');
					player.addSkill('jingong');
					player.gainMaxHp();
					player.recover();
				},
			},
			shouye:{
				audio:2,
				group:'shouye_after',
				trigger:{target:"useCardToTarget"},
				filter:function(event,player){
					return event.player!=player&&event.targets.length==1;
				},
				check:function(event,player){
					if(event.player==game.me||event.player.isOnline()) return get.attitude(player,event.player)<0;
					return get.effect(player,event.card,event.player,player)<0;
				},
				usable:1,
				logTarget:'player',
				content:function(){
					'step 0'
					player.line(trigger.player,'green');
					player.chooseToDuiben(trigger.player);
					'step 1'
					if(result.bool){
						trigger.targets.remove(player);
						trigger.getParent().triggeredTargets2.remove(player);
						trigger.getParent().shouyeer=player;
					}
				},
				subSkill:{
					after:{
						sub:true,
						trigger:{global:'useCardAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(event.shouyeer!=player) return false;
							if(event.cards){
								for(var i=0;i<event.cards.length;i++){
									if(event.cards[i].isInPile()) return true;
								}
							}
							return false;
						},
						content:function(){
							var list=[];
							for(var i=0;i<trigger.cards.length;i++){
								if(trigger.cards[i].isInPile()){
									list.push(trigger.cards[i]);
								}
							}
							player.gain(list,'gain2','log');
						},
					},
				},
			},
			liezhi:{
				audio:2,
				group:'liezhi_damage',
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('liezhi_disable');
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('liezhi'),'弃置至多两名其他角色区域内的各一张牌',[1,2],function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'hej')>0;
					}).ai=function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'guohe'},player,player);
					};
					'step 1'
					if(result.bool){
						result.targets.sortBySeat();
						event.targets=result.targets;
						player.line(result.targets,'green');
						player.logSkill('liezhi',result.targets);
					}
					else event.finish();
					'step 2'
					event.current=targets.shift();
					player.discardPlayerCard(event.current,'hej',true)
					if(targets.length) event.redo();
				},
				subSkill:{
					disable:{
						sub:true,
						trigger:{player:'phaseAfter'},
						forced:true,
						silent:true,
						popup:false,
						charlotte:true,
						//filter:function(event){return !event.liezhi},
						content:function(){player.removeSkill('liezhi_disable')},
					},
					damage:{
						trigger:{player:'damage'},
						forced:true,
						silent:true,
						popup:false,
						content:function(){player.addSkill('liezhi_disable')}
					},
				},
			},
			xinzhanyi:{
				audio:'zhanyi',
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				check:function(card){
					var player=_status.event.player;
					if(player.hp<3) return 0;
					var type=get.type(card,'trick');
					if(type=='trick'){
						return 6-get.value(card);
					}
					else if(type=='equip'){
						if(player.hasSha()&&game.hasPlayer(function(current){
							return (player.canUse('sha',current)&&
								get.attitude(player,current)<0&&
								get.effect(current,{name:'sha'},player,player)>0)
						})){
							return 6-get.value(card);
						}
					}
					return 0;
				},
				content:function(){
					player.loseHp();
					switch(get.type(cards[0],'trick',cards[0].original=='h'?player:false)){
						case 'basic':player.addTempSkill('xinzhanyi_basic');break;
						case 'equip':player.addTempSkill('xinzhanyi_equip');break;
						case 'trick':player.addTempSkill('xinzhanyi_trick');player.draw(3);break;
					}
				},
				ai:{
					order:9.1,
					result:{
						player:1
					}
				}
			},
			xinzhanyi_basic1:{
				trigger:{player:"useCard"},
				filter:function(event,player){
					return event.skill=='xinzhanyi_basic_backup'&&!player.storage.xinzhanyi_basic1;
				},
				forced:true,
				silent:true,
				popup:false,
				content:function(){
					if(!trigger.baseDamage) trigger.baseDamage=1;
					trigger.baseDamage++;
					player.storage.xinzhanyi_basic1=true;
				},
			},
			xinzhanyi_basic:{
				group:['xinzhanyi_basic1'],
				onremove:function(p,s){
					delete p.storage[s+1];
				},
				hiddenCard:function(player,name){
					return ['sha','tao','jiu'].contains(name)&&player.countCards('h',{type:'basic'})>0;
				},
				enable:"chooseToUse",
				filter:function(event,player){
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
					dialog:function(event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
							list.push(['基本','','sha','ice']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('战意',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							switch(button.link[2]){
								case 'tao':return 5;
								case 'jiu':{
									if(player.countCards('h',{type:'basic'})>=2) return 3;
								};
								case 'sha':
									if(button.link[3]=='fire') return 2.95;
									else if(button.link[3]=='thunder'||button.link[3]=='ice') return 2.92;
									else return 2.9;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'zhanyi',
							filterCard:function(card,player,target){
								return get.type(card)=='basic';
							},
							check:function(card,player,target){
								return 9-get.value(card);
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
							position:'he',
							popname:true,
						}
					},
					prompt:function(links,player){
						return '将一张基本牌当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用';
					},
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.countCards('h',{type:'basic'})>=2){
							return 3.3;
						}
						return 3.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
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
			xinzhanyi_equip:{
				audio:'zhanyi',
				trigger:{player:'useCardToPlayered'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					'step 0'
					trigger.target.chooseToDiscard('he',true,2);
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						if(result.cards.length==1){
							event._result={bool:true,links:result.cards.slice(0)};
						}
						else player.chooseButton(['选择获得其中的一张牌',result.cards.slice(0)],true).ai=function(button){
							return get.value(button.link);
						};
					}
					else event.finish();
					'step 2'
					if(result.links) player.gain(result.links,'gain2');
				}
			},
			xinzhanyi_trick:{
				mod:{
					wuxieRespondable:function(){
						return false;
					}
				}
			},
			"xinfu_daigong":{
				usable:1,
				audio:2,
				trigger:{
					player:"damageBegin4",
				},
				filter:function(event,player){
					return event.source!=undefined&&player.countCards('h')>0;
				},
				content:function(){
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
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				enable:"phaseUse",
				usable:1,
				audio:2,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				filter:function(event,player){
					return player.storage.xinfu_zhaoxin.length<3&&player.countCards('h')>0;
				},
				visible:true,
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return [1,3-player.storage.xinfu_zhaoxin.length];
				},
				discard:false,
				toStorage:true,
				//lose:false,
				delay:false,
				content:function(){
					'step 0'
					//player.lose(cards,ui.special,'toStorage')
					player.$give(cards,player,false);
					player.storage.xinfu_zhaoxin=player.storage.xinfu_zhaoxin.concat(cards);
					player.markSkill('xinfu_zhaoxin');
					'step 1'
					player.draw(cards.length);
				},
				check:function(card){
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
				filter:function(event,player){
					if(!player.storage.xinfu_zhaoxin||!player.storage.xinfu_zhaoxin.length) return false;
					return player==event.player||player.inRange(event.player);
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCardButton(get.prompt('xinfu_zhaoxin',trigger.player),player.storage.xinfu_zhaoxin,function(button){
						return true;
					}).set('ai',function(button){
						return 1+Math.random();
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
					targetInRange:function(card,player,target){
						if(player.storage.xinfu_qianchong.contains(get.type(card,'trick'))){
							return true;
						}
					},
					cardUsable:function(card,player,num){
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
						content:function(){
							player.storage.xinfu_qianchong=[];
						},
					},
				},
				init:function(event,player){
					event.storage[player]=[];
				},
				trigger:{
					player:"phaseUseBegin",
				},
				locked:false,
				direct:true,
				filter:function(event,player){
					var es=player.getCards('e');
					if(!es.length) return true;
					var col=get.color(es[0]);
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!=col) return true;
					}
					return false;
				},
				content:function(){
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
					targetEnabled:function(card,player,target){
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
					player:["useCard","respond","loseAfter"],
				},
				frequent:true,
				filter:function(event,player){
					if(player.hasSkill('mingzhe')) return false;
					if(player==_status.currentPhase) return false;
					var es=player.getCards('e');
					if(!es.length) return false;
					for(var i=0;i<es.length;i++){
						if(get.color(es[i])!='red') return false;
					}
					if(event.name!='lose') return get.color(event.card)=='red';
					if(event.type!='discard') return false;
					if(event.cards2){
						for(var i=0;i<event.cards2.length;i++){
							if(get.color(event.cards2[i])=='red') return true;
						}
					}
					return false;
				},
				content:function(){
					"step 0"
					event.count=1;
					if(trigger.name=='lose'){
						event.count=0;
						for(var i=0;i<trigger.cards2.length;i++){
							if(get.color(trigger.cards2[i])=='red') event.count++;
						}
					}
					"step 1"
					player.draw();
					event.count--;
					"step 2"
					if(event.count){
			 		player.chooseBool(get.prompt2('mingzhe')).set('frequentSkill',event.name);
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
				trigger:{
					global:"phaseJieshuBegin",
				},
				audio:2,
				filter:function(event,player){
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.cards2) num+=evt.cards2.length;
					});
					return num>0&&num<=player.hp
				},
				frequent:true,
				content:function(){
					'step 0'
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.cards2) num+=evt.cards2.length;
					});
					if(num>0){
						player.draw(num);
					}
				},
			},
			"rw_bagua_skill":{
				inherit:"bagua_skill",
				audio:"bagua_skill",
				content:function(){
					"step 0"
					player.judge('rewrite_bagua',function(card){return (get.suit(card)!='spade')?1.5:-0.5});
					"step 1"
					if(result.judge>0){
						trigger.untrigger();
						trigger.set('responded',true);
						trigger.result={bool:true,card:{name:'shan'}}
					}
				},
			},
			"rw_baiyin_skill":{
				inherit:"baiyin_skill",
				audio:"baiyin_skill",
			},
			"rw_lanyinjia":{
				inherit:"lanyinjia",
				audio:"lanyinjia",
			},
			"rw_minguangkai_cancel":{
				inherit:"minguangkai_cancel",
			},
			"rw_minguangkai_link":{
				inherit:"minguangkai_link",
				trigger:{
					player:"linkBefore",
				},
				forced:true,
				priority:20,
				filter:function(event,player){
					return !player.isLinked();
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(['tiesuo','lulitongxin'].contains(card.name)){
								return 'zerotarget';
							}
						},
					},
				},
			},
			"rw_renwang_skill":{
				inherit:"renwang_skill",
				audio:"renwang_skill",
				filter:function(event,player){
					if(player.hasSkillTag('unequip2')) return false;
					if(event.player.hasSkillTag('unequip',false,{
						name:event.card?event.card.name:null,
						target:player,
						card:event.card
					})) return false;
					return (event.card.name=='sha'&&(get.suit(event.card)=='heart'||get.color(event.card)=='black'))
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.hasSkillTag('unequip2')) return;
							if(player.hasSkillTag('unequip',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})||player.hasSkillTag('unequip_ai',false,{
								name:card?card.name:null,
								target:player,
								card:card
							})) return;
							if(card.name=='sha'&&['spade','club','heart'].contains(get.suit(card))) return 'zerotarget';
						},
					},
				},
			},
			"rw_tengjia1":{
				inherit:"tengjia1",
				audio:"tengjia1",
			},
			"rw_tengjia2":{
				inherit:"tengjia2",
				audio:"tengjia1",
			},
			"rw_tengjia3":{
				audio:"tengjia1",
				inherit:"rw_minguangkai_link",
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(['tiesuo','lulitongxin'].contains(card.name)){
								return 'zeroplayertarget';
							}
						},
					},
				},
			},
			"rw_tengjia4":{
				inherit:"tengjia3",
				audio:"tengjia1",
			},
			"xinfu_pingcai":{
				"wolong_card":function(){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return ['sp_zhugeliang','re_sp_zhugeliang','ol_sp_zhugeliang'].contains(current.name)||['sp_zhugeliang','re_sp_zhugeliang','ol_sp_zhugeliang'].contains(current.name2);
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
						result.targets.sortBySeat();
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].damage('fire');
						}
					}
				},
				"fengchu_card":function(){
					'step 0'
					var ingame=game.hasPlayer(function(current){
						return ['re_pangtong','pangtong','ol_pangtong'].contains(current.name)||['re_pangtong','pangtong','ol_pangtong'].contains(current.name2);
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
						result.targets.sortBySeat();
						for(var i=0;i<result.targets.length;i++){
							result.targets[i].link();
						}
					}
				},
				"xuanjian_card":function(){
					'step 0'
					event.ingame=game.hasPlayer(function(current){
						return ['re_xushu','xin_xushu','xushu'].contains(current.name)||['re_xushu','xin_xushu','xushu'].contains(current.name2);
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
				"shuijing_card":function(){
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
							event.targets[0].$give(link,event.targets[1],false)
							game.delay();
						}
				},
				audio:true,
				enable:"phaseUse",
				usable:1,
				content:function(){
					"step 0"
					var list=["wolong","fengchu","xuanjian","shuijing"];
					var list2=[];
					for(var i=0;i<list.length;i++){
						list2.push(game.createCard(list[i]+'_card','',''))
					}
					//list2.randomSort();
					event.time=get.utc();
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
					var delay=8400-(get.utc()-event.time);
					if(delay>0){
 					event.delay2=true;
 					event.dialog=ui.create.dialog(get.translation(player)+'正在擦拭宝物...'+(_status.connectMode?'':'<br>（点击屏幕可跳过等待）'));
 					event.videoId=lib.status.videoId++;
 					game.broadcast('createDialog',event.videoId,get.translation(player)+'正在擦拭宝物...');
 					game.pause();
 					event.pingcai_delayed=true;
 					setTimeout(function(){
 						if(event.pingcai_delayed==true){
 							delete event.pingcai_delayed;
 							game.resume();
 						}
 					},delay);
 					if(!_status.connectMode){
 						event.forceMine=true;
 						event.custom.replace.window=function(){
 							if(event.pingcai_delayed==true){
 								delete event.forceMine;
 								delete event.pingcai_delayed;
 								game.resume();
 							}
 						}
 					}
					}
					event.card=result.links[0];
					"step 2"
					if(event.delay2){
 					delete event.custom.replace.window;
 					event.dialog.close();
 					game.addVideo('cardDialog',null,event.videoId);
 					game.broadcast('closeDialog',event.videoId);
					}
					player.logSkill('pcaudio_'+event.card.name);
					player.$throw(event.card);
					event.insert(lib.skill.xinfu_pingcai[event.card.name],{
						player:player,
					});
				},
				ai:{
					order:7,
					fireAttack:true,
					threaten:1.7,
					result:{
						player:1,
					},
				},
			},
			"xinfu_pdgyingshi":{
				mod:{
					targetEnabled:function(card,player,target){
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
				content:function(){
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
			"yizan_use":{
				intro:{
					content:"已发动过#次",
				},
				enable:["chooseToUse","chooseToRespond"],
				hiddenCard:function(player,name){
					if(!['sha','shan','tao','jiu'].contains(name)) return false;
					if(!player.storage.yizan&&player.countCards('he')<2) return false;
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'h');
				},
				filter:function(event,player){
					if(!player.storage.yizan&&player.countCards('he')<2) return false;
					if(event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'shan'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)){
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'h');
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							list.push(['基本','','sha','fire']);
							list.push(['基本','','sha','thunder']);
							list.push(['基本','','sha','ice']);
						}
						if(event.filterCard({name:'shan'},player,event)){
							list.push(['基本','','shan']);
						}
						if(event.filterCard({name:'tao'},player,event)){
							list.push(['基本','','tao']);
						}
						if(event.filterCard({name:'jiu'},player,event)){
							list.push(['基本','','jiu']);
						}
						return ui.create.dialog('翊赞',[list,'vcard'],'hidden');
					},
					check:function(button){
						var player=_status.event.player;
						var card={name:button.link[2],nature:button.link[3]};
						if(_status.event.getParent().type!='phase'||game.hasPlayer(function(current){
							return player.canUse(card,current)&&get.effect(current,card,player,player)>0;
						})){
							switch(button.link[2]){
								case 'tao':case 'shan':return 5;
								case 'jiu':{
									if(player.storage.yizan&&player.countCards('h',{type:'basic'})>2) return 3;
								};
								case 'sha':
									if(button.link[3]=='fire') return 2.95;
									else if(button.link[3]=='thunder'||button.link[3]=='ice') return 2.92;
									else return 2.9;
							}
						}
						return 0;
					},
					backup:function(links,player){
						return {
							audio:'yizan_respond_shan',
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
								player.addMark('yizan_use',1,false);
							},
						}
					},
					prompt:function(links,player){
						var str=!player.storage.yizan?'两张牌(其中至少应有一张基本牌)':'一张基本牌';
						return '将'+str+'当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用或打出';
					},
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.storage.yizan&&player.countCards('h',{type:'basic'})>2){
							return 3.3;
						}
						return 3.1;
					},
					skillTagFilter:function(player,tag,arg){
						if(tag=='fireAttack') return true;
						if(!player.storage.yizan&&player.countCards('he')<2) return false;
						if(!player.hasCard(function(card){
							return get.type(card)=='basic';
						},'he')){
							return false;
						}
					},
					result:{
						player:1,
					},
					respondSha:true,
					respondShan:true,
					fireAttack:true,
				},
			},
			"yizan_respond_shan":{
				audio:2,
			},
			"xinfu_longyuan":{
				audio:2,
				forced:true,
				unique:true,
				juexingji:true,
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				skillAnimation:true,
				animationColor:'orange',
				filter:function(event,player){
					return player.countMark('yizan_use')>=3;
				},
				content:function(){
					player.awakenSkill('xinfu_longyuan');
					player.storage.yizan=true;
				},
				derivation:'yizan_rewrite',
			},
			xinfu_jingxie:{audio:2},
			"xinfu_jingxie1":{
				group:["xinfu_jingxie2"],
				position:"he",
				audio:'xinfu_jingxie',
				enable:"phaseUse",
				filter:function(event,player){
					var he=player.getCards('he');
					for(var i=0;i<he.length;i++){
						if(["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(he[i].name)) return true;
					}
					return false;
				},
				filterCard:function(card){
					return ["bagua","baiyin","lanyinjia","renwang","tengjia","zhuge"].contains(card.name);
				},
				discard:false,
				check:function(){
					return 1;
				},
				content:function(){
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
				prompt:"重铸一张防具牌，然后将体力回复至1点。",
				audio:'xinfu_jingxie',
				enable:"chooseToUse",
				filterCard:function(card){
					return get.subtype(card)=='equip2';
				},
				filter:function(event,player){
					if(event.type=='dying'){
						if(player!=event.dying) return false;
						return player.countCards('he',function(card){
							return get.subtype(card)=='equip2';
						})>0;
					}
					return false;
				},
				check:function(){
					return 1;
				},
				position:"he",
				discard:false,
				loseTo:'discardPile',
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆')
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					var num=1-player.hp;
					if(num) player.recover(num);
				},
				ai:{
					order:0.5,
					skillTagFilter:function(player,arg,target){
						if(player!=target) return false;
						return player.countCards('he',function(card){
							if(_status.connectMode&&get.position(card)=='h') return true;
							return get.subtype(card)=='equip2';
						})>0;
					},
					save:true,
					result:{
						player:function(player){
							return 10;
						},
					},
				},
			},
			"xinfu_qiaosi":{
				enable:"phaseUse",
				usable:1,
				content:function(){
					'step 0'
					if(get.isLuckyStar(player)){
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
						player.chooseToDiscard(event.num,true,'he');
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
			zhaohuo:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				//priority:12,
				filter:function(event,player){
					return event.player!=player&&player.maxHp>1;
				},
				content:function(){
					'step 0'
					event.num=player.maxHp-1;
					player.loseMaxHp(event.num,true);
					'step 1'
					player.draw(event.num);
				}
			},
			yixiang:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				frequent:true,
				filter:function(event,player){
					if(event.player.hp<=player.hp) return false;
					//if(event.targets.length>1) return false;
					var hs=player.getCards('h');
					var names=['sha','shan','tao','jiu','du'];
					for(var i=0;i<hs.length;i++){
						names.remove(hs[i].name);
					}
					if(!names.length) return false;
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						if(names.contains(ui.cardPile.childNodes[i].name)){
							return true;
						}
					}
					return false;
				},
				usable:1,
				content:function(){
					var hs=player.getCards('h');
					var list=[];
					var names=['sha','shan','tao','jiu','du'];
					for(var i=0;i<hs.length;i++){
						names.remove(hs[i].name);
					}
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						if(names.contains(ui.cardPile.childNodes[i].name)){
							list.push(ui.cardPile.childNodes[i]);
						}
					}
					if(list.length){
						player.gain(list.randomGet(),'draw');
					}
				}
			},
			yirang:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					if(!player.countCards('he',function(card){
						return get.type(card)!='basic';
					})){
						return false;
					}
					return game.hasPlayer(function(current){
						return current.maxHp>player.maxHp;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yirang'),function(card,player,target){
						return target.maxHp>player.maxHp;
					}).set('ai',function(target){
						return (get.attitude(_status.event.player,target)-2)*target.maxHp;
					});
					'step 1'
					if(result.bool){
						var cards=player.getCards('he',function(card){
							return get.type(card)!='basic';
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i],'trick'));
						}
						player.logSkill('yirang',target);
						target.gain(cards,player,'give');
						player.gainMaxHp(target.maxHp-player.maxHp,true);
						player.recover(types.length);
						game.delay();
					}
				}
			},
			kuangcai:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return !event.player.isMad();
				},
				content:function(){
					game.broadcastAll(function(player){
						player.forceCountChoose={phaseUse:5};
					},player)
					player.addSkill('kuangcai_use');
					player.addSkill('kuangcai_cancel');
					//ui.auto.hide();
				},
				subSkill:{
					use:{
						mod:{
							cardUsable:function(card){
								if(get.info(card)&&get.info(card).forceUsable) return;
								return Infinity;
							},
							targetInRange:function(){
								return true;
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						//audio:'kuangcai',
						silent:true,
						popup:false,
						//usable:5,
						filter:function(event,player){
							if(!player.forceCountChoose||!player.forceCountChoose.phaseUse){
								return false;
							}
							return true;
						},
						content:function(){
							player.draw();
							if(player.forceCountChoose.phaseUse==1){
								var evt=event.getParent('phaseUse');
								if(evt) evt.skipped=true;
							}
							else game.broadcastAll(function(player){
								player.forceCountChoose.phaseUse--;
							},player);
						},
						ai:{
							presha:true,
							pretao:true,
						},
					},
					cancel:{
						trigger:{player:'phaseUseEnd'},
						priority:50,
						silent:true,
						charlotte:true,
						content:function(){
							game.broadcastAll(function(player){
								delete player.forceCountChoose;
							},player);
							//ui.auto.show();
							player.removeSkill('kuangcai_use');
							player.removeSkill('kuangcai_cancel');
						}
					}
				},
				ai:{
					threaten:4.5,
				},
			},
			shejian:{
				audio:2,
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					if(cards){
						if(cards.length<2) return false;
						var suits=[];
						for(var i=0;i<cards.length;i++){
							var suit=get.suit(cards[i]);
							if(suits.contains(suit)){
								return false;
							}
							else{
								suits.push(suit);
							}
						}
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('shejian'),'弃置一名其他角色的一张牌',function(card,player,target){
						if(player==target) return false;
						return target.countDiscardableCards(player,'he')>0;
					}).ai=function(target){
						return -get.attitude(player,target);
					};
					'step 1'
					if(result.bool){
						player.logSkill('shejian',result.targets);
						player.discardPlayerCard(result.targets[0],'he',true);
					}
					else{
						event.finish();
					}
				},
			},
			shixin:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event){
					return event.nature=='fire';
				},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					nofire:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'fireDamage')) return 'zerotarget';
						}
					}
				}
			},
			fenyin:{
				locked:false,
				mod:{
					aiOrder:function(player,card,num){
						if(typeof card=='object'&&player==_status.currentPhase){
							var evt=player.getLastUsed();
							if(evt&&evt.card&&get.color(evt.card)!='none'&&get.color(card)!='none'&&get.color(evt.card)!=get.color(card)){
								return num+10;
							}
						}
					},
				},
				audio:2,
				trigger:{player:'useCard'},
				frequent:true,
				//usable:3,
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					var evt=player.getLastUsed(1);
					if(!evt) return false;
					var color1=get.color(evt.card);
					var color2=get.color(event.card);
					return color1&&color2&&color1!='none'&&color2!='none'&&color1!=color2;
				},
				content:function(){
					player.draw();
				},
				ai:{
					threaten:3,
				},
			},
			dujin:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					return !event.numFixed;
				},
				content:function(){
					trigger.num+=1+Math.floor(player.countCards('e')/2);
				}
			},
			yingjian:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				audio:'qingyi',
				content:function(){
					player.chooseUseTarget('###是否发动【影箭】？###视为使用一张没有距离限制的【杀】',{name:'sha'},false,'nodistance').logSkill='yingjian';
				},
				ai:{
					threaten:function(player,target){
						return 1.6;
					}
				}
			},
			tunchu:{
				audio:2,
				trigger:{player:'phaseDrawBegin2'},
				frequent:true,
				filter:function(event,player){
					if(event.numFixed||player.storage.tunchu&&player.storage.tunchu.length) return false;
					return true;
				},
				content:function(){
					trigger.num+=2;
					player.addTempSkill('tunchu_choose','phaseDrawAfter');
				},
				init:function(player){
					if(!player.storage.tunchu) player.storage.tunchu=[];
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage,1000);
							game.cardsDiscard(storage);
							game.log(storage,'被置入了弃牌堆');
						 storage.length=0;
						}
					},
				},
				group:'tunchu_disable',
				subSkill:{
					choose:{
						trigger:{player:'phaseDrawEnd'},
						forced:true,
						popup:false,
						content:function(){
							'step 0'
							player.removeSkill('tunchu_choose');
							var nh=player.countCards('h');
							if(nh){
								player.chooseCard('h',[1,nh],'将任意张手牌置于你的武将牌上').set('ai',function(card){
									var player=_status.event.player;
									var count=game.countPlayer(function(current){
										return get.attitude(player,current)>2&&current.hp-current.countCards('h')>1;
									});
									if(ui.selected.cards.length>=count) return -get.value(card);
									return 5-get.value(card);
								});
							}
							else{
								event.finish();
							}
							'step 1'
							if(result.bool){
								player.lose(result.cards,ui.special,'toStorage');
								player.storage.tunchu.addArray(result.cards);
								player.markSkill('tunchu');
								player.syncStorage('tunchu');
							}
						}
					},
					disable:{
						mod:{
							cardEnabled:function(card,player){
								if(player.storage.tunchu&&player.storage.tunchu.length&&card.name=='sha'){
									return false;
								}
							},
							cardUsable:function(card,player){
								if(player.storage.tunchu&&player.storage.tunchu.length&&card.name=='sha'){
									return false;
								}
							},
						}
					}
				}
			},
			shuliang:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.tunchu&&player.storage.tunchu.length>0&&event.player.countCards('h')<event.player.hp&&event.player.isAlive();
				},
				content:function(){
					'step 0'
					var goon=(get.attitude(player,trigger.player)>0);
					player.chooseCardButton(get.prompt('shuliang',trigger.player),player.storage.tunchu).set('ai',function(){
						if(_status.event.goon) return 1;
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						player.logSkill('shuliang',trigger.player);
						player.storage.tunchu.remove(result.links[0]);
						player.$throw(result.links);
						game.cardsDiscard(result.links);
						player.syncStorage('tunchu');
						if(player.storage.tunchu.length==0){
							player.unmarkSkill('tunchu');
						}
						trigger.player.draw(2);
					}
				}
			},
			choulve:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					})
				},
				content:function(){
					'step 0'
					var str='令一名其他角色交给你一张牌';
					var history=player.getAllHistory('damage',function(evt){
						return evt.card&&evt.card.name&&lib.card[evt.card.name];
					})
					if(history.length) event.cardname=history[history.length-1].card.name;
					if(event.cardname){
						str+='若其如此做，视为你使用【'+get.translation(event.cardname)+'】';
					}
					var goon=true;
					if(event.cardname){
						goon=game.hasPlayer(function(current){
							return player.canUse(event.cardname,current)&&get.effect(current,{name:event.cardname},player,player)>0;
						});
					}
					player.chooseTarget(get.prompt('choulve'),str,function(card,player,target){
						return target!=player&&target.countCards('he');
					}).set('ai',function(target){
						if(!_status.event.goon) return 0;
						var player=_status.event.player;
						if(get.attitude(player,target)>=0&&get.attitude(target,player)>=0){
							return Math.sqrt(target.countCards('he'));
						}
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('choulve',target);
						target.chooseCard('he','是否交给'+get.translation(player)+'一张牌？',
							event.cardname?('若如此做，视为'+get.translation(player)+
							'使用【'+get.translation(event.cardname)+'】'):null).set('ai',function(card){
							if(_status.event.goon) return 7-get.value(card);
							return 0;
						}).set('goon',get.attitude(target,player)>1);
						event.target=target;
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.target.give(result.cards,player);
						if(event.cardname){
							player.chooseUseTarget(event.cardname,true,false);
						}
					}
				},
			},
			polu:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','damageEnd']},
				forced:true,
				filter:function(event,player){
					return !player.getEquip('ly_piliche');
				},
				content:function(){
					if(trigger.name=='phaseZhunbei'){
						player.useCard(game.createCard('ly_piliche','diamond',1),player);
					}
					else{
						player.draw(trigger.num);
					}
				}
			},
			ly_piliche:{
				trigger:{source:'damageSource'},
				check:function(event,player){
					return get.attitude(player,event.player)<0;
				},
				filter:function(event,player){
					if(event.card&&get.type(event.card)=='delay') return false;
					return event.player.isIn()&&(event.player.getEquip(2)||event.player.getEquip(3));
				},
				logTarget:'player',
				content:function(){
					var equip2=trigger.player.getEquip(2);
					var equip3=trigger.player.getEquip(3);
					var cards=[];
					if(equip2) cards.push(equip2);
					if(equip3) cards.push(equip3);
					if(cards.length){
						trigger.player.discard(cards);
					}
				}
			},
			xinzhilve:{
				enable:'phaseUse',
				audio:'zhilve',
				usable:1,
				chooseButton:{
					dialog:function(event,player){
						var list=[
							'移动场上的一张牌',
							'摸一张牌并视为使用一张【杀】',
						];
						var choiceList=ui.create.dialog('知略：失去1点体力并...','forcebutton','hidden');
						for(var i=0;i<list.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
							var bool=lib.skill.xinzhilve.chooseButton.filter({link:i},player);
							if(!bool) str+='<div style="opacity:0.5">';
							str+=list[i];
							if(!bool) str+='</div>';
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[i];
							}
							choiceList.buttons.add(next.firstChild);
						}
						return choiceList;
					},
					filter:function(button,player){
						if(button.link==0) return player.canMoveCard();
						return player.hasUseTarget({name:'sha',isCard:true},false);
					},
					check:function(button){
						return button.link;
					},
					backup:function(links){
						return lib.skill['xinzhilve_'+['move','use'][links[0]]];
					},
					prompt:function(){return '请选择【杀】的目标'},
				},
				ai:{
					order:function(item,player){
						return get.order({name:'sha'})+0.1;
					},
					result:{
						player:function(player){
							if(player.hp>2&&player.hasValueTarget({name:'sha'})) return 1;
							return 0;
						},
					},
				},
			},
			xinzhilve_move:{
				audio:'zhilve',
				filterCard:function(){return false},
				selectCard:-1,
				delay:false,
				content:function(){
					'step 0'
					event.forceDie=true;
					if(!player.canMoveCard(null,event.nojudge)){
						event.finish();
						return;
					}
					var next=player.chooseTarget(2,function(card,player,target){
						if(ui.selected.targets.length){
							var from=ui.selected.targets[0];
							var js=from.getCards('j');
							for(var i=0;i<js.length;i++){
								if(_status.event.nojudge) break;
								if(target.canAddJudge(js[i])) return true;
							}
							if(target.isMin()) return false;
							var es=from.getCards('e');
							for(var i=0;i<es.length;i++){
								if(target.isEmpty(get.subtype(es[i]))) return true;
							}
							return false;
						}
						else{
							var range='ej';
							if(_status.event.nojudge) range='e';
							return target.countCards(range)>0;
						}
					});
					next.set('nojudge',event.nojudge||false);
					next.set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var sgnatt=get.sgn(att);
						if(ui.selected.targets.length==0){
							if(att>0){
								if(!_status.event.nojudge&&target.countCards('j',function(card){
									return game.hasPlayer(function(current){
										return current.canAddJudge(card)&&get.attitude(player,current)<0;
									})
								})) return 14;
								if(target.countCards('e',function(card){
									return get.value(card,target)<0&&game.hasPlayer(function(current){
										return current!=target&&get.attitude(player,current)<0&&current.isEmpty(get.subtype(card))
									});
								})>0) return 9;
							}
							else if(att<0){
								if(game.hasPlayer(function(current){
									if(current!=target&&get.attitude(player,current)>0){
										var es=target.getCards('e');
										for(var i=0;i<es.length;i++){
											if(get.value(es[i],target)>0&&current.isEmpty(get.subtype(es[i]))&&get.value(es[i],current)>0) return true;
										}
									}
								})){
									return -att;
								}
							}
							return 0;
						}
						var es=ui.selected.targets[0].getCards('e');
						var i;
						var att2=get.sgn(get.attitude(player,ui.selected.targets[0]));
						for(i=0;i<es.length;i++){
							if(sgnatt!=0&&att2!=0&&
								get.sgn(get.value(es[i],ui.selected.targets[0]))==-att2&&
								get.sgn(get.value(es[i],target))==sgnatt&&
								target.isEmpty(get.subtype(es[i]))){
								return Math.abs(att);
							}
						}
						if(i==es.length&&(_status.event.nojudge||!ui.selected.targets[0].countCards('j',function(card){
							return target.canAddJudge(card);
						}))){
							return 0;
						}
						return -att*get.attitude(player,ui.selected.targets[0]);
					});
					next.set('multitarget',true);
					next.set('targetprompt',_status.event.targetprompt||['被移走','移动目标']);
					next.set('prompt',event.prompt||'移动场上的一张牌');
					if(event.prompt2) next.set('prompt2',event.prompt2);
					if(event.forced) next.set('forced',true);
					'step 1'
					event.result=result;
					if(result.bool){
						player.line2(result.targets,'green');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					'step 2'
					game.delay();
					'step 3'
					if(targets.length==2){
						player.choosePlayerCard('ej',true,function(button){
							var player=_status.event.player;
							var targets0=_status.event.targets0;
							var targets1=_status.event.targets1;
							if(get.attitude(player,targets0)>0&&get.attitude(player,targets1)<0){
								if(get.position(button.link)=='j') return 12;
								if(get.value(button.link,targets0)<0) return 10;
								return 0;
							}
							else{
								if(get.position(button.link)=='j') return -10;
								return get.equipValue(button.link);
							}
						},targets[0]).set('nojudge',event.nojudge||false).set('targets0',targets[0]).set('targets1',targets[1]).set('filterButton',function(button){
							var targets1=_status.event.targets1;
							if(get.position(button.link)=='j'){
								if(_status.event.nojudge) return false;
								return targets1.canAddJudge(button.link);
							}
							else{
								return targets1.isEmpty(get.subtype(button.link));
							}
						});
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool&&result.links.length){
						player.loseHp();
					}
					'step 5'
					if(result.bool&&result.links.length){
						var link=result.links[0];
						if(get.position(link)=='e'){
							event.targets[1].equip(link);
						}
						else if(link.viewAs){
							event.targets[1].addJudge({name:link.viewAs},[link]);
						}
						else{
							event.targets[1].addJudge(link);
						}
						event.targets[0].$give(link,event.targets[1])
						event.result.card=link;
						event.result.position=get.position(link);
						game.delay();
						player.addTempSkill('xinzhilve_mark');
						player.addMark('xinzhilve_mark',1,false);
					}
				},
			},
			xinzhilve_use:{
				audio:'zhilve',
				filterCard:function(){return false},
				selectCard:-1,
				filterTarget:function(card,player,target){
					return player.canUse({name:'sha',isCard:true},target,false);
				},
				content:function(){
					player.loseHp();
					player.draw();
					player.useCard({name:'sha',isCard:true},false,target).forceDie=true;
					player.addTempSkill('xinzhilve_mark');
					player.addMark('xinzhilve_mark',1,false);
				},
				ai:{
					result:{
						target:function(player,target){
							return get.effect(target,{name:'sha'},player,target);
						},
					},
				},
			},
			xinzhilve_mark:{
				intro:{content:'本回合手牌上限+#'},
				onremove:true,
				charlotte:true,
				mod:{
					maxHandcard:function(player,num){
						return num+player.countMark('xinzhilve_mark');
					},
				},
			},
			xinxhzhiyan:{
				audio:'xhzhiyan',
				enable:'phaseUse',
				filter:function(event,player){
					return (!player.hasSkill('xinxhzhiyan_true')&&player.countCards('h')>player.hp)||(!player.hasSkill('xinxhzhiyan_false')&&player.countCards('h')<player.maxHp)
				},
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					if(player.hasSkill('xinxhzhiyan_true')) return 0;
					var num=Math.max(0,player.countCards('h')-player.hp);
					if(ui.selected.cards.length||player.hasSkill('xinxhzhiyan_false')) return [num,num];
					return [0,num]
				},
				filterTarget:lib.filter.notMe,
				selectTarget:function(){
					if(ui.selected.cards.length) return [1,1];
					return [0,0];
				},
				check:function(card){
					var player=_status.event.player;
					var checkx=function(card){
						if(player.getUseValue(card,null,true)<=0&&game.hasPlayer(function(current){
							return current!=player&&get.value(card,current)>0&&get.attitude(player,current)>0;
						})) return 2;
						return 1;
					}
					if(player.countCards('h',function(card){
						return checkx(card)>0;
					})<(player.countCards('h')-player.hp)) return 0;
					return checkx(card);
				},
				delay:false,
				discard:false,
				lose:false,
				content:function(){
					var bool=(cards&&cards.length>0);
					player.addTempSkill('xinxhzhiyan_'+bool,'phaseUseEnd');
					if(!bool){
						player.draw(player.maxHp-player.countCards('h'));
					}
					else{
						target.gain(cards,player,'giveAuto');
					}
				},
				ai:{
					order:function(obj,player){
						if(player.countCards('h')>player.hp) return 10;
						return 0.5;
					},
					result:{
						player:function(player,target){
							if(!ui.selected.cards.length&&player.countCards('h')<player.maxHp) return 1;
							return 0;
						},
						target:1,
					},
				},
			},
			xinxhzhiyan_true:{},
			xinxhzhiyan_false:{
				mod:{
					playerEnabled:function(card,player,target){
						if(player!=target&&(!get.info(card)||!get.info(card).singleCard||!ui.selected.targets.length)) return false;
					},
				},
				mark:true,
				intro:{
					content:'不能对其他角色使用牌',
				},
			},
			weifeng:{
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					if(!event.targets||!event.targets.filter(function(target){
						return target!=player&&!target.storage.weifeng2;
					}).length) return false;
					var evt=event.getParent('phaseUse');
					if(!evt||evt.player!=player) return false;
					if(!get.tag(event.card,'damage')) return false;
					if(!['basic','trick'].contains(get.type(event.card))) return false;
					return player.getHistory('useCard',function(ev){
						return ev.getParent('phaseUse')==evt&&get.tag(ev.card,'damage')&&['basic','trick'].contains(get.type(ev.card));
					}).indexOf(event)==0&&game.hasPlayer(function(current){
						return current!=player&&!current.storage.weifeng2&&event.targets.contains(current);
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(true,'威风：请选择一个目标，令其获得一个【惧('+get.translation(trigger.card.name)+')】标记',function(card,player,target){
						return player!=target&&!target.storage.weifeng2&&_status.event.getTrigger().targets.contains(target);
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.storage.weifeng2=trigger.card.name;
						player.line(target,'green');
						game.log(target,'获得了一个','#g【惧('+get.translation(trigger.card.name)+')】','标记')
						target.markSkill('weifeng2');
						player.addSkill('weifeng3');
					}
				},
			},
			weifeng2:{
				intro:{
					content:'当前“惧”标记名称：$',
					onunmark:function(storage,player){
						if(player.storage.weifeng2){
 						game.log(player,'移去了一个','#g【惧('+get.translation(player.storage.weifeng2)+')】','标记')
 						delete player.storage.weifeng2;
						}
					},
				},
				marktext:'惧',
			},
			weifeng3:{
				trigger:{
					global:'damageBegin3',
					player:['phaseZhunbeiBegin','dieBegin'],
				},
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.name!='damage') return true;
					return event.player!=player&&typeof event.player.storage.weifeng2=='string';
				},
				content:function(){
					if(trigger.name=='damage'){
						player.logSkill('weifeng',trigger.player);
						if(trigger.card&&trigger.card.name==trigger.player.storage.weifeng2) trigger.num++;
						else if(trigger.player.countGainableCards(player,'he')>0) player.gainPlayerCard(trigger.player,'he',true);
						trigger.player.unmarkSkill('weifeng2');
					}
					else{
 					game.countPlayer(function(current){
 						if(current.storage.weifeng2) current.unmarkSkill('weifeng2');
 					});
 					player.removeSkill('weifeng3');
					}
				},
			},
			gnjinfan:{
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				audio:2,
				filter:function(event,player){
					var list=[];
					player.getStorage('gnjinfan').filter(function(card){
						list.add(get.suit(card));
					});
					if(list.length>=lib.suit.length) return false;
					return player.countCards('h',function(card){
						return _status.connectMode||!list.contains(get.suit(card));
					})>0;
				},
				content:function(){
					'step 0'
					player.chooseCard('h',get.prompt('gnjinfan'),'将任意张手牌当做“铃”置于武将牌上',[1,function(){
						var list=[];
						var list2=[];
						player.getStorage('gnjinfan').filter(function(card){
							list.add(get.suit(card));
						});
						player.getCards('h',function(card){
							list2.add(get.suit(card));
						});
						list2.removeArray(list);
						return list2.length;
					}()],function(card,player){
						var list=player.getStorage('gnjinfan').concat(ui.selected.cards);
						return list.filter(function(cardx){
							return get.suit(card)==get.suit(cardx);
						}).length==0;
					}).set('ai',function(card){
						var player=_status.event.player;
						if(player.hasUseTarget(card)&&!player.hasValueTarget(card)) return 0;
						if(['sha','shan','wuxie','caochuan'].contains(card.name)) return 2+Math.random();
						return 1+Math.random();
					}).set('complexCard',true);
					'step 1'
					if(result.bool){
						player.logSkill('gnjinfan');
						player.markAuto('gnjinfan',result.cards);
						player.lose(result.cards,'toStorage',ui.special,'visible');
						game.log(player,'将',result.cards,'放到了武将牌上');
					}
				},
				group:['gnjinfan3','gnjinfan4','gnjinfan6','gnjinfan7','gnjinfan8'],
				marktext:'铃',
				intro:{
					content:'cards',
				},
			},
			gnjinfan3:{
				trigger:{player:'chooseToRespondBegin'},
				filter:function(event,player){
					if(event.responded) return false;
					var gnjinfan=player.getStorage('gnjinfan');
					if(!gnjinfan) return false;
					for(var i=0;i<gnjinfan.length;i++){
						if(event.filterCard(gnjinfan[i],player,event)&&lib.filter.cardRespondable(gnjinfan[i],player,event)) return true;
					}
					return false;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseButton([get.prompt('gnjinfan'),player.getStorage('gnjinfan')]).set('filterButton',function(button){
						var evt=_status.event.getTrigger();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,_status.event.player,evt)&&lib.filter.cardRespondable(button.link,_status.event.player,evt);
						}
						return true;
					}).set('ai',function(button){
						var evt=_status.event.getTrigger();
						if(evt&&evt.ai){
							var tmp=_status.event;
							_status.event=evt;
							var result=evt.ai(button.link,_status.event.player,evt);
							_status.event=tmp;
							return result;
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						trigger.untrigger();
						trigger.responded=true;
						trigger.result={
 						bool:true,
 						card:result.links[0],
 						cards:result.links.slice(0),
 						skill:'gnjinfan',
						}
						player.unmarkAuto('gnjinfan',result.links);
					}
				},
				ai:{
					order:4,
					useful:-1,
					value:-1
				}
			},
			gnjinfan4:{
				enable:'chooseToUse',
				filter:function(event,player){
					var gnjinfan=player.getStorage('gnjinfan');
					if(!gnjinfan) return false;
					for(var i=0;i<gnjinfan.length;i++){
						if(event.filterCard(gnjinfan[i],player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('锦帆',player.getStorage('gnjinfan'),'hidden');
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return evt.filterCard(button.link,player,evt);
						}
						return true;
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						if(button.link.name=='du') return 10;
						var player=_status.event.player;
						if(player.getUseValue(button.link)>0) return get.order(button.link);
						return -1;
					},
					backup:function(links,player){
						return {
							audio:'gnjinfan',
							filterCard:function(){return false},
							selectCard:-1,
							viewAs:links[0],
							onuse:function(result,player){
								var gnjinfan=player.getStorage('gnjinfan');
								if(gnjinfan){
									player.unmarkAuto('gnjinfan',[result.card]);
								}
							}
						}
					},
					prompt:function(links){
						return '选择'+get.translation(links)+'的目标';
					},
				},
				ai:{
					order:function(item,player){
						var event=_status.event;
						if(event.type!='phase') return 4;
						if(!player) return -1;
						var gnjinfan=player.getStorage('gnjinfan');
						if(!gnjinfan) return -1;
						var order=0;
						for(var i=0;i<gnjinfan.length;i++){
							if(player.getUseValue(gnjinfan[i])>0){
								var order2=get.order(gnjinfan[i]);
								if(order2>order) order=order2
							}
						}
						return order+0.1;
					},
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					},
					useful:-1,
					value:-1
				}
			},
			gnjinfan6:{
				trigger:{global:'cardsGotoOrderingAfter'},
				forced:true,
				popup:false,
				filter:function(event,player){
					var evt=event.getParent();
					return evt&&evt.player==player&&player!=_status.currentPhase&&evt.skill&&evt.skill.indexOf('gnjinfan')==0;
				},
				content:function(){
					'step 0'
					event.cards=trigger.cards.slice(0);
					'step 1'
					var suit=get.suit(cards[0]);
					cards.shift();
					var card=get.cardPile2(function(cardx){
						return get.suit(cardx)==suit;
					});
					if(card) player.gain(card,'gain2','log');
					if(cards.length) event.redo();
					'step 2'
					game.delayx();
				},
			},
			gnjinfan7:{
				filter:function(){return false},
				hiddenCard:function(player,name){
					var gnjinfan=player.getStorage('gnjinfan');
					if(!gnjinfan) return false;
					for(var i=0;i<gnjinfan.length;i++){
						if(gnjinfan[i].name==name) return true;
					}
					return false;
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag){
						var gnjinfan=player.getStorage('gnjinfan');
						for(var i=0;i<gnjinfan.length;i++){
							switch(tag){
								case 'respondSha':if(gnjinfan[i].name=='sha') return true;break;
								case 'respondShan':if(gnjinfan[i].name=='shan') return true;break;
							}
						}
						return false;
					},
				}
			},
			gnjinfan8:{
				audio:'gnjinfan',
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return player.getStorage('gnjinfan').length>0;
				},
				content:function(){
					var cards=player.getStorage('gnjinfan');
					player.gain('gain2','log',cards,'fromStorage');
					cards.length=0;
					player.unmarkSkill('gnjinfan');
				},
			},
			gnsheque:{
				audio:2,
				trigger:{global:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return event.player.isAlive()&&event.player.countCards('e')>0&&
					lib.filter.targetEnabled({name:'sha'},player,event.player)&&(player.hasSha()||_status.connectMode&&player.countCards('h')>0);
				},
				content:function(){
					player.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'射却：是否对'+get.translation(trigger.player)+'使用一张杀？').set('logSkill','gnsheque').set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',trigger.player).set('oncard',function(card){
						card.gnsheque_tag=true;
					});
				},
 			ai:{
 				unequip:true,
 				unequip_ai:true,
 				skillTagFilter:function(player,tag,arg){
 					if(tag=='unequip_ai'){
 						if(_status.event.getParent().name!='gnsheque') return false;
 					}
 					else if(!arg||!arg.card||!arg.card.gnsheque_tag) return false;
 				},
 			},
			},
		},
		dynamicTranslate:{
			yizan_use:function(player){
				if(player.storage.yizan) return '你可以将一张基本牌当做任意基本牌使用或打出。';
				return '你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。';
			},
		},
		characterReplace:{
			caochun:['caochun','old_caochun'],
			majun:['majun','old_majun'],
			zhanggong:['zhanggong','re_zhanggong'],
			baosanniang:['xin_baosanniang','re_baosanniang','baosanniang'],
			heqi:['re_heqi','heqi'],
			weiwenzhugezhi:['weiwenzhugezhi','re_weiwenzhugezhi'],
			xugong:['xugong','re_xugong'],
			liuzan:['re_liuzan','liuzan'],
			sufei:['sp_sufei','xf_sufei'],
			jiakui:['jiakui','old_jiakui'],
			shenpei:['shenpei','sp_shenpei'],
		},
		translate:{
			liuzan:'手杀留赞',
			re_sp_zhugeliang:"手杀卧龙",
			ly_piliche:'霹雳车',
			ly_piliche_info:'当你对其他角色造成伤害后，若造成伤害的牌不为延时锦囊牌，你可以弃置其装备区里的防具牌与+1坐骑牌；当你失去此装备时，销毁之。',
			polu:'破橹',
			polu_info:'锁定技，回合开始时，若你的装备区里没有【霹雳车】，你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，你摸一张牌。',
			choulve:'筹略',
			choulve_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌，若其如此做，视为你使用上一张对你过造成伤害且不为延时锦囊牌的牌。',
			tunchu:'屯储',
			tunchu_info:'摸牌阶段，若你没有「粮」，你可以多摸两张牌。若如此做，摸牌阶段结束时，你可以将任意张手牌置于你的武将上，称为「粮」，只要你的武将牌上有「粮」，你便不能使用【杀】',
			shuliang:'输粮',
			shuliang_info:'一名角色的结束阶段开始时，若其手牌数少于体力值，你可以移去一张「粮」，然后该角色摸两张牌',
			fenyin:'奋音',
			yingjian:'影箭',
			fenyin_info:'你的回合内，当你使用牌时，若此牌与你于此回合内使用的上一张牌的颜色不同，则你可以摸一张牌。',
			yingjian_info:'准备阶段开始时，你可以视为使用一张无距离限制的【杀】。',
			dujin:'独进',
			dujin_info:'摸牌阶段，你可以多摸X+1张牌。（X为你装备区里牌数的一半且向下取整）',
			shixin:'释衅',
			shixin_info:'锁定技，当你受到火属性伤害时，你防止此伤害。',
			zhaohuo:'招祸',
			zhaohuo_info:'锁定技，当其他角色进入濒死状态时，你将体力上限调整为1点。若你的体力上限因此减少，则你摸X张牌。（X为你以此法减少的体力上限）',
			yixiang:'义襄',
			yixiang_info:'每名角色的回合限一次，当你成为一名角色使用牌的目标后，若该角色的体力值大于你的体力值，你可以随机获得牌堆里的一张你没有的基本牌。',
			yirang:'揖让',
			yirang_info:'出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同并回复X点体力（X为你以此法交给其的牌的类别数）。',
			kuangcai:'狂才',
			kuangcai_info:'出牌阶段开始时，你可以令你此阶段内的主动出牌时间变为5秒。若如此做，你于此阶段内使用牌没距离和次数限制，且每当你于此阶段内使用牌时，你摸一张牌且主动出牌时间-1秒。若主动出牌时间减至0，则你结束出牌阶段。',
			shejian:'舌剑',
			shejian_info:'弃牌阶段结束时，若你于此阶段弃置的所有牌花色均不相同，则你可以弃置一名其他角色的一张牌。',
			"xinfu_daigong":"怠攻",
			"xinfu_daigong_info":"每回合限一次。当你受到伤害时，你可以展示所有手牌，然后令伤害来源选择一项：交给你一张与你所有手牌花色均不相同的一张牌，或防止此伤害。",
			"xinfu_zhaoxin":"昭心",
			"xinfu_zhaoxin_info":"出牌阶段限一次，你可以将任意张手牌置于武将牌上并摸等量的牌，称之为「望」（你至多拥有三张「望」）。你或你攻击范围内的一名其他角色的摸牌阶段结束后，其可以获得一张由你选择的「望」，然后你可以对其造成1点伤害。",
			"zhaoxin_give":"昭心",
			"zhaoxin_give_info":"",
			"xinfu_qianchong":"谦冲",
			"xinfu_qianchong_info":"锁定技，若你的装备区内有牌且：均为红色，则你视为拥有技能〖明哲〗。均为黑色，则你视为拥有技能〖帷幕〗。若均不满足，则出牌阶段开始时，你可以选择一种类别的牌，然后你本回合内使用该类别的牌时没有次数和距离限制。",
			"qc_weimu":"帷幕",
			"qc_weimu_info":"",
			"qc_mingzhe":"明哲",
			"qc_mingzhe_info":"",
			"xinfu_shangjian":"尚俭",
			"xinfu_shangjian_info":"一名角色的结束阶段开始时，若你于此回合内失去了X张或更少的牌，则你可以摸等量的牌。（X为你的体力值）",
			"rw_bagua_skill":"先天八卦阵",
			"rw_bagua_skill_info":"当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rw_baiyin_skill":"照月狮子盔",
			"rw_baiyin_skill_info":"锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
			"rw_lanyinjia":"精银甲",
			"rw_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rw_minguangkai_cancel":"耀光铠",
			"rw_minguangkai_cancel_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_minguangkai_link":"耀光铠",
			"rw_minguangkai_link_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rw_renwang_skill":"仁王金刚盾",
			"rw_renwang_skill_info":"黑色【杀】和红桃【杀】对你无效。",
			"rw_tengjia1":"桐油百韧甲",
			"rw_tengjia1_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia2":"桐油百韧甲",
			"rw_tengjia2_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia3":"桐油百韧甲",
			"rw_tengjia3_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rw_tengjia4":"桐油百韧甲",
			"rewrite_bagua":"先天八卦阵",
			"rewrite_bagua_info":"当你需要使用或打出一张【闪】时，你可以进行判定，若判定结果不为黑桃，视为你使用或打出了一张【闪】。",
			"rewrite_baiyin":"照月狮子盔",
			"rewrite_baiyin_info":"锁定技，当你受到大于1的伤害时，你将伤害值改为1；当你失去装备区里的【照月狮子盔】时，你回复1点体力并摸两张牌。",
			"rewrite_lanyinjia":"精银甲",
			"rewrite_lanyinjia_info":"你可以将一张手牌当做【闪】使用或打出。锁定技，【精银甲】不会无效。",
			"rewrite_minguangkai":"耀光铠",
			"rewrite_minguangkai_info":"锁定技，当你成为【火烧连营】、【火攻】或火【杀】的目标时，或即将被横置时，取消之。",
			"rewrite_renwang":"仁王金刚盾",
			"rewrite_renwang_info":"黑色【杀】和红桃【杀】对你无效。",
			"rewrite_tengjia":"桐油百韧甲",
			"rewrite_tengjia_info":"锁定技，【南蛮入侵】、【万箭齐发】和普【杀】对你无效。当你受到火焰伤害时，此伤害+1。当你即将被横置时，取消之。",
			"rewrite_zhuge":"元戎精械弩",
			"rewrite_zhuge_info":"锁定技，你于出牌阶段内使用【杀】无次数限制。",
			rw_zhuge_skill:'诸葛连弩',
			rw_zhuge_skill_info:'锁定技，你于出牌阶段内使用【杀】无次数限制。',
			takaramono:"宝物",
			"wolong_card":"卧龙",
			"wolong_card_info":"对一名角色造成1点火焰伤害。若场上有存活的诸葛亮(火)，则改为对至多两名角色各造成1点火焰伤害。",
			"fengchu_card":"凤雏",
			"fengchu_card_info":"横置至多三名角色。若场上有存活的庞统(火)，则改为横置至多四名角色。",
			"xuanjian_card":"玄剑",
			"xuanjian_card_info":"令一名角色摸一张牌并回复1点体力。若场上有存活的徐庶(将/界)，则改为令一名角色摸一张牌并回复1点体力，然后你摸一张牌。",
			"shuijing_card":"水镜",
			"shuijing_card_info":"将一名角色装备区内的防具牌移动到另一名角色对应区域。若场上有存活的司马徽，则改为将1名角色装备区内的1件装备移动到另1角色对应区域。","xinfu_pingcai":"评才",
			"xinfu_pingcai_info":"出牌阶段限一次，你可以挑选一个宝物并擦拭掉其上面的灰尘。然后，你可以根据宝物类型执行对应的效果。",
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
			yizan_use_backup:'翊赞',
			"yizan_use_info":"你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。",
			"yizan_respond_shan":"翊赞",
			"yizan_respond_shan_info":"",
			"xinfu_longyuan":"龙渊",
			"xinfu_longyuan_info":"觉醒技，准备阶段，若你本局游戏内发动过〖翊赞〗的次数大于等于3，则你修改〖翊赞〗。",
			yizan_rewrite:'翊赞·改',
			yizan_rewrite_info:'你可以将一张基本牌当做任意基本牌使用或打出。',
			"yizan_count":"翊赞",
			"yizan_count_info":"",
			"xinfu_jingxie1":"精械",
			"xinfu_jingxie1_info":"出牌阶段，你可以展示一张未强化过的【诸葛连弩】或标准包/军争包/SP包中的防具牌，然后对其进行强化。当你处于濒死状态时，你可以重铸一张防具牌，然后将体力回复至1点。",
			"xinfu_jingxie2":"精械",
			"xinfu_jingxie2_info":"",
			"xinfu_qiaosi":"巧思",
			"xinfu_qiaosi_info":"出牌阶段限一次，你可以投掷一枚六面骰子，展示牌堆顶的X张牌并获得之。然后，你选择一项：1.交给一名其他角色X张牌。2.弃置X张牌。（X为骰子的点数）",
			xin_xiahoudun:'手杀夏侯惇',
			xinqingjian:'清俭',
			xinqingjian2:'清俭',
			xinqingjian_info:'每回合限一次。当你不因摸牌阶段的额定摸牌而获得牌时，你可以将任意张牌扣置于武将牌上。回合结束时，你将这些牌交给一名其他角色。若这些牌的数量大于1，你摸一张牌。',
			zhangyì:'张翼',
			jiakui:'贾逵',
			zhiyi:'执义',
			zhiyi_info:'锁定技，当你于一回合内使用或打出第一张基本牌时，你选择一项：1.摸一张牌。2.于此牌A（若此牌是因响应牌B而使用或打出的，则改为牌B）的使用或打出流程结算完成后，视为使用一张与此牌名称和属性相同的卡牌。',
			rezhiyi:'执义',
			rezhiyi_info:'锁定技，一名角色的结束阶段开始时，若你本回合内使用或打出过基本牌，则你选择一项：1.摸一张牌。2.视为使用一张本回合内使用或打出过的基本牌。',
			zhongzuo:'忠佐',
			zhongzuo_info:'一名角色的结束阶段开始时，若你于此回合内造成或受到过伤害，则你可以令一名角色摸两张牌。若该角色已受伤，则你摸一张牌。',
			wanlan:'挽澜',
			wanlan_info:'限定技，当一名角色进入濒死状态时，你可以弃置所有手牌并令其回复体力至1点，然后对当前回合角色造成1点伤害。',
			re_jikang:"手杀嵇康",
			old_bulianshi:'手杀步练师',
			old_caochun:'旧曹纯',
			shenpei:'审配',
			re_wangyun:'手杀王允',
			relianji:'连计',
			relianji_info:'出牌阶段限一次，你可以选择两名其他角色。第一名角色随机使用牌堆中的一张武器牌，然后这名角色视为对另一名角色随机使用一张下列的牌名的牌：【决斗】、【火攻】、【南蛮入侵】、【万箭齐发】或普【杀】。然后若此牌造成伤害，你获得X枚“连计”标记（X为此次扣减的体力值点数）。',
			remoucheng:'谋逞',
			remoucheng_info:'觉醒技，当一名角色造成伤害后，若你拥有的“连计”标记数大于2，你加1点体力上限，回复1点体力，失去“连计”，获得“矜功”。',
			mobile_default:'常规',
			mobile_others:'其他',
			
			pss:'手势',
			pss_paper:'布',
			pss_scissor:'剪刀',
			pss_stone:'石头',
			pss_paper_info:'石头剪刀布时的一种手势。克制石头，但被剪刀克制。',
			pss_scissor_info:'石头剪刀布时的一种手势。克制布，但被石头克制。',
			pss_stone_info:'石头剪刀布时的一种手势。克制剪刀，但被布克制。',
			
			db_atk:'进攻对策',
			db_atk1:'全军出击',
			db_atk2:'分兵围城',
			
			db_def:'防御对策',
			db_def1:'奇袭粮道',
			db_def2:'开城诱敌',
			
			shouye:'守邺',
			shouye_info:'每回合限一次。当其他角色使用牌指定你为唯一目标时，你可以与其进行【对策】。若你赢，则你取消此牌的目标，且你于此牌结算完成后获得其对应的所有实体牌。',
			liezhi:'烈直',
			liezhi_info:'准备阶段，你可以依次弃置至多两名其他角色区域内的各一张牌。若你受到过伤害，则〖烈直〗于你的下个回合无效。',
			
			xinzhanyi:'战意',
			xinzhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定目标角色后，其弃置两张牌，然后你获得其中的一张。',
			xinzhanyi_basic_backup:'战意',
			xinzhanyi_basic:'战意',
			xinzhanyi_equip:'战意',
			
			meiyong:'姝勇',
			meiyong_info:'当你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后其摸一张牌。',
			rexushen:'许身',
			rexushen_info:'限定技，出牌阶段，你可以失去X点体力（X为场上男性角色的数量）。若你以此法进入了濒死状态，则当你因一名角色而脱离此濒死状态后，你可以令其获得技能〖武圣〗和〖当先〗。',
			rezhennan:'镇南',
			rezhennan_info:'当你成为其他角色使用的牌的目标后，若此牌的目标数大于该角色的体力值，则你可以弃置一张牌并对其造成1点伤害。',
			
			hujinding:'胡金定',
			huaizi:'怀子',
			huaizi_info:'锁定技，你的手牌上限为你的体力上限。',
			renshi:'仁释',
			renshi_info:'锁定技，当你受到【杀】的伤害时，若你已受伤，则你防止此伤害并获得此【杀】对应的所有实体牌，然后减1点体力上限。',
			wuyuan:'武缘',
			wuyuan_info:'出牌阶段限一次，你可将一张【杀】交给一名其他角色，然后你回复1点体力，其摸一张牌。若此【杀】为：红色【杀】，其回复1点体力；属性【杀】，其改为摸两张牌。',
			
			re_weiwenzhugezhi:'手杀卫温诸葛直',
			re_xugong:'手杀许贡',
			re_zhanggong:'手杀张恭',
			reqianxin:'遣信',
			reqianxin_info:'出牌阶段限一次，你可将至多两张手牌随机交给等量的其他角色，称为「信」。这些角色的准备阶段开始时，若其手牌中有「信」，则其选择一项：令你摸两张牌，本回合手牌上限-2。',
			rebiaozhao:"表召",
			"rebiaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为「表」。当有一张与「表」点数相同的牌进入弃牌堆时，你将「表」置入弃牌堆并失去1点体力。准备阶段，若你的武将牌上有「表」，则你移去「表」并选择一名角色，该角色回复1点体力并摸三张牌。",
			"rebiaozhao2":"表召",
			"rebiaozhao2_info":"",
			"rebiaozhao3":"表召",
			"rebiaozhao3_info":"",
			refuhai:'浮海',
			refuhai_info:'出牌阶段限一次，你可令其他角色同时在「潮起」和「潮落」中选择一项，并依次展示这些角色的选项。若从你下家开始选择了相同选项的角色数目大于1，则你摸X张牌（X为连续相同结果的数量）。',
			qiaosi:'巧思',
			qiaosi_info:'出牌阶段限一次，你可以表演「大键角色图」并根据表演结果获得相应的牌。然后，你选择一项：1.弃置X张牌。2.将X张牌交给一名其他角色。（X为你以此法获得的牌数）',
			qiaosi_map:'大键角色图',
			qiaosi_map_info:'<br><li>星野 梦美：锦囊牌*2<br><li>能美 库特莉亚芙卡：装备牌/【杀】/【酒】*1<br><li>友利 奈绪：【杀】/【酒】*1<br><li>神尾 观铃：【闪】/【桃】*1<br><li>伊吹 风子：锦囊牌/【闪】/【桃】*1<br><li>仲村 ゆり：装备牌*2<br><li>Illustration: うら;Twitter:@ura530',
			qiaosi_c1:'<img src="'+lib.assetURL+'image/card/qiaosi_card1.png" width="60" height="60"> ',
			//星野 梦美
			qiaosi_c2:'<img src="'+lib.assetURL+'image/card/qiaosi_card2.png" width="60" height="60"> ',
			//能美 库特莉亚芙卡
			qiaosi_c3:'<img src="'+lib.assetURL+'image/card/qiaosi_card3.png" width="60" height="60"> ',
			//友利 奈绪
			qiaosi_c4:'<img src="'+lib.assetURL+'image/card/qiaosi_card4.png" width="60" height="60"> ',
			//神尾 观铃
			qiaosi_c5:'<img src="'+lib.assetURL+'image/card/qiaosi_card5.png" width="60" height="60"> ',
			//伊吹 风子
			qiaosi_c6:'<img src="'+lib.assetURL+'image/card/qiaosi_card6.png" width="60" height="60"> ',
			//仲村 ゆり
			mobile_sunben:'那个男人',
			//孙笨
			
			yangbiao:'杨彪',
			zhaohan:'昭汉',
			zhaohan_info:'锁定技，你的第1-4个准备阶段开始时，你加1点体力上限并回复1点体力，你的第5-7个准备阶段开始时，你减1点体力上限。',
			rangjie:'让节',
			rangjie_info:'当你受到1点伤害后，你可以选择一项并摸一张牌：获得牌堆里你选择的类型的一张牌，或移动场上的一张牌。',
			yizheng:'义争',
			yizheng2:'义争',
			yizheng_info:'出牌阶段限一次，你可以和一名体力值不大于你的其他角色拼点。若你赢，其跳过下个摸牌阶段。若你没赢，你减1点体力上限。',
			re_heqi:'手杀贺齐',
			reqizhou:'绮胄',
			reqizhou_info:'锁定技，你根据装备区里牌的花色数获得以下技能：1种或以上：〖英姿〗；2种或以上：〖奇袭〗；3种或以上：〖旋风〗。',
			reshanxi:'闪袭',
			reshanxi2:'闪袭',
			reshanxi_info:'出牌阶段开始时，你可以弃置一张红色基本牌并选择一名有牌的其他角色，将其的至多X张牌置于其的武将牌上（X为你的体力值）。回合结束时，该角色获得这些牌。',
			chendeng:'陈登',
			zhouxuan:'周旋',
			zhouxuan2:'周旋',
			zhouxuan_info:'出牌阶段限一次，你可以弃置一张牌并指定一名角色，然后选择一个基本牌的名称或非基本牌的类型。其使用或打出下一张牌时，若此牌的名称或类型和你选择的相同，则你观看牌堆顶的三张牌，然后将这些牌分配给任意角色。',
			fengji:'丰积',
			fengji_info:'锁定技，回合结束时，你记录你的手牌数。回合开始时，若你的手牌数不小于你记录的手牌数，则你摸两张牌且本回合手牌上限为体力上限。',
			re_guanqiujian:'手杀毌丘俭',
			rezhengrong:'征荣',
			rehongju:'鸿举',
			reqingce:'清侧',
			reqingce_backup:'清侧',
			rezhengrong_info:'当你于出牌阶段使用的指定了其他角色为目标的牌结算完成后，若此牌是你本局游戏内于出牌阶段使用的指定了其他角色为目标的第偶数张牌，则你可以将一名其他角色角色的随机一张牌置于你的武将牌上，称为「荣」。',
			rehongju_info:'觉醒技，准备阶段，若你武将牌上「荣」的数量不小于3且有角色死亡，则你摸等同于「荣」数量的牌。然后可以用任意数量的手牌交换等量的「荣」。你减1点体力上限并获得技能〖清侧〗。',
			reqingce_info:'出牌阶段，你可以将一张「荣」置入弃牌堆，然后弃置场上的一张牌。',
			re_pangtong:"手杀庞统",
			dongcheng:'董承',
			chengzhao:'承诏',
			chengzhao_info:'一名角色的结束阶段，若你于本回合内获得了两张以上的牌，则你可以与一名其他角色拼点。若你赢，你视为对其使用一张无视防具的【杀】。',
			yangyi:'杨仪',
			duoduan:'度断',
			duoduan_info:'每回合限一次，当你成为【杀】的目标后，你可以重铸一张牌。若如此做，你选择一项：①令使用者摸两张牌，且此【杀】无效。②令使用弃置一张牌，且你不能响应此【杀】。',
			gongsun:'共损',
			gongsun_info:'出牌阶段开始时，你可以弃置两张牌并指定一名其他角色。你选择一个基本牌或普通锦囊牌的牌名。直到你的下回合开始或你死亡，你与其不能使用或打出或弃置此名称的牌。',
			gongsun_shadow:'共损',
			xin_chengpu:'手杀程普',
			relihuo:'疠火',
			relihuo_damage:'疠火',
			relihuo_baigei:'疠火',
			relihuo_info:'当你使用普【杀】时，你可以将此杀改为火属性。若如此做，当你因执行此【杀】的效果而对横置角色造成伤害时，此伤害+1；当你使用的火【杀】结算完成后，你失去X点体力（X为你因此【杀】造成的伤害总点数的一半且向下取整）',
			dengzhi:'邓芝',
			jimeng:'急盟',
			jimeng_info:'出牌阶段开始时，你可以获得一名其他角色的一张牌，然后交给该角色X张牌（X为你当前体力值）。',
			shuaiyan:'率言',
			shuaiyan_info:'弃牌阶段开始时，若你的手牌数大于1，则你可以展示所有手牌，然后你令一名其他角色交给你一张牌。',
			zhengxuan:'郑玄',
			zhengjing:'整经',
			zhengjing_info:'出牌阶段，你可以整理卡牌。然后，你将整理出的卡牌置于一名角色的武将牌上。该角色的准备阶段获得这些牌，且跳过此回合的判定和摸牌阶段。',
			zhengjing2:'整经',
			
			mobile_yijiang:'武将设计征集大赛',
			yj_zhanghe:'☆张郃',
			yj_zhangliao:'☆张辽',
			yj_xuhuang:'☆徐晃',
			yj_ganning:'☆甘宁',
			xhzhiyan:'治严',
			xhzhiyan_info:'出牌阶段，若你的手牌数不等于体力上限，则你可以将手牌摸至/弃至手牌上限，然后本回合不能对其他角色使用牌/可以将弃置的一张牌交给一名其他角色。',
			zhilve:'知略',
			zhilve_info:'锁定技，准备阶段，你选择一项：1.移动场上装备区的一张牌并失去1点体力。2.移动场上判定区的一张牌并令本回合手牌上限-1。3.本回合摸牌阶段多摸一张牌且使用的第一张【杀】无距离限制且不计入次数限制。',
			xinzhilve:'知略',
			xinzhilve_backup:'知略',
			xinzhilve_mark:'知略',
			xinzhilve_info:'出牌阶段限一次，你可以失去1点体力并选择一项：1.移动场上的一张牌；2.视为使用一张无距离限制且不计入次数限制的【杀】并摸一张牌。然后你本回合的手牌上限+1。',
			xinxhzhiyan:'治严',
			xinxhzhiyan_false:'治严',
			xinxhzhiyan_info:'出牌阶段每项各限一次，若你的手牌数：大于体力上限，则你可以将X张手牌交给一名其他角色；小于体力值，则你可以摸X张牌且本阶段内不能再对其他角色使用牌。（X为你的手牌数与体力上限之差的绝对值）',
			weifeng:'威风',
			weifeng2:'威风',
			weifeng3:'威风',
			weifeng_info:'锁定技，当你于出牌阶段内使用第一张伤害性基本牌或普通锦囊牌后，你令此牌的一名没有“惧”的其他目标角色获得一枚名称为此牌牌名的“惧”。有“惧”的角色受到伤害时，其移去“惧”，然后若造成伤害的牌名称和“惧”：相同，此伤害+1；不同，你获得该角色的一张牌。准备阶段开始时或你死亡时，你移去场上的所有“惧”。',
			gnjinfan:'锦帆',
			gnjinfan3:'锦帆',
			gnjinfan4:'锦帆',
			gnjinfan6:'锦帆',
			gnjinfan7:'锦帆',
			gnjinfan8:'锦帆',
			gnjinfan4_backup:'锦帆',
			gnjinfan_info:'弃牌阶段开始时，你可将任意张手牌置于武将牌上，称为“铃”（每种花色的“铃”限一张）。当你需要使用或打出一张手牌时，你可以使用或打出一张“铃”。你的回合外，当有“铃”移动到处理区后，你从牌堆中获得与“铃”花色相同的一张牌。回合开始时，你获得所有“铃”。',
			gnsheque:'射却',
			gnsheque_info:'一名其他角色的准备阶段开始时，若其装备区内有牌，则你可以对其使用一张【杀】（无距离关系的限制且无视防具）。',
			sp_sufei:'SP苏飞',
			zhengjian:'诤荐',
			zhengjian_draw:'诤荐',
			zhengjian_mark:'诤荐',
			zhengjian_info:'锁定技，结束阶段，你令一名角色获得一枚“诤”。回合开始时，你令有“诤”的角色移去“诤”并摸X张牌（X为其最后一次获得“诤”后使用和打出的牌数，且至多不能超过其体力上限或5）。',
			gaoyuan:'告援',
			gaoyuan_info:'当你成为【杀】的目标时，你可弃置一张牌将此【杀】转移给一名有“诤”且不是此【杀】使用者的其他角色。',
			tongqu:'通渠',
			tongqu_info:'游戏开始时，你拥有一个“渠”标记。准备阶段，你可以失去1点体力令一名没有“渠”标记的角色获得“渠”标记。有“渠”的角色摸牌阶段额外摸一张牌，然后将一张牌交给其他有“渠”的角色或弃置。若以此法给出的是装备牌则使用之。当有“渠”的角色进入濒死状态时，移除其“渠”标记。',
			xinwanlan:'挽澜',
			xinwanlan_info:'当一名角色受到会令其进入濒死状态的伤害时，你可以弃置装备区中的所有牌（至少一张） 防止此伤害。',
			re_xusheng:'手杀徐盛',
			re_dongzhuo:'手杀董卓',
			rejiuchi:'酒池',
			rejiuchi_info:'你可以将一张黑桃手牌当做【酒】使用。锁定技，当你于回合内使用带有【酒】效果的【杀】造成伤害时，你令你的【崩坏】失效直到回合结束。',
			furong:'傅肜',
			xuewei:'血卫',
			xuewei_info:'准备阶段，你可以选择一名其他角色（仅自己可见）。若如此做，直到你的下回合开始前，当其第一次受到伤害时，你防止此伤害，改为由你受到等量的伤害并对伤害来源造成等量同属性的伤害。',
			liechi:'烈斥',
			liechi_info:'锁定技，当你进入濒死状态时，伤害来源弃置一张牌。',
			xin_liaohua:'手杀廖化',
			redangxian:'当先',
			redangxian_info:'锁定技，回合开始时，你从弃牌堆中获得一张【杀】并进行一个额外的出牌阶段。',
			refuli:'伏枥',
			refuli_info:'限定技，当你处于濒死状态时，你可以将体力值回复至X点（X为势力数）。然后若你的体力值为全场唯一最多，你翻面。',
			xin_caozhang:'手杀曹彰',
			"rejiangchi":"将驰",
			"rejiangchi_info":"出牌阶段开始时，你可以选择一项：1、摸一张牌，若如此做，你本阶段内不能使用【杀】。 2、弃置一张牌，若如此做，此阶段你使用【杀】无距离限制且你可以额外使用一张【杀】。",
			rezhenxing:"镇行",
			rezhenxing_info:"结束阶段开始时或当你受到伤害后，你可以观看牌堆顶的三张牌，然后你获得其中与其余牌花色均不相同的一张牌。",
			xin_jianyong:'手杀简雍',
			xinqiaoshui:'巧说',
			xinqiaoshui_info:'出牌阶段限一次，你可以和一名其他角色拼点。若你赢，则你本阶段内使用的下一张基本牌或普通锦囊牌可以增加减少一个目标。若你没赢，你本阶段内不能使用锦囊牌。',
			xinjyzongshi:'纵适',
			xinjyzongshi_info:'当你拼点后，你可以观看牌堆顶的一张牌，然后选择一项：获得此牌，或获得两张拼点牌中点数较小的一张。',
			dingyuan:'手杀丁原',
			beizhu:'备诛',
			beizhu_draw:'备诛',
			beizhu_info:'出牌阶段限一次，你可以观看一名其他角色的手牌。若其中：没有【杀】，你弃置其一张牌，然后你可令其获得牌堆中的一张【杀】；有【杀】，其依次对你使用这些【杀】，当你因此受到1点伤害后，你摸一张牌。',
			xin_zhuran:'手杀朱然',
			mobiledanshou:'胆守',
			mobiledanshou_info:'一名其他角色的结束阶段开始时，若X：为0，你摸一张牌；不等于0，你可弃置X张牌并对其造成1点伤害（X为其本回合内使用的目标包含你的牌的数量）',
			yanghuiyu:'羊徽瑜',
			hongyi:'弘仪',
			hongyi2:'弘仪',
			hongyi_info:'出牌阶段限一次，你可以弃置X张牌并选择一名其他角色（X为场上已阵亡的角色数且至多为2）。你的下回合开始前，该角色造成伤害时进行判定，若结果为：黑色，此伤害-1。红色，受到伤害的角色摸一张牌。',
			quanfeng:'劝封',
			quanfeng_info:'锁定技，限定技，一名角色死亡时，你选择获得其的一个技能（主公技，限定技，觉醒技，隐匿技，带有Charlotte标签的技能除外），然后加1点体力上限并回复1点体力。',
			simashi:'司马师',
			baiyi:'败移',
			baiyi_info:'限定技，出牌阶段，若你已受伤，你可以交换两名其他角色的座次。',
			jinglve:'景略',
			jinglve2:'景略',
			jinglve3:'景略',
			jinglve_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，将其中一张牌标记为「死士」。当其使用对应的实体牌中包含「死士」的牌时，你取消此牌的所有目标。当「死士」牌不因使用而进入弃牌堆，或其回合结束后，若「死士」牌仍在其区域内，则你获得此牌。',
			shanli:'擅立',
			shanli_info:'觉醒技，准备阶段，若你已发动过〖败移〗且对至少两名角色发动过〖景略〗，则你减1点体力上限并选择一名角色。系统随机选择三个不为〖忘隙(仲村由理)〗的主公技，然后你选择其中一个技能，令其获得之。其将交互表情中的【拖鞋】和【酒杯】替换为【枷锁】和【玉玺】。',
			re_lingtong:'手杀凌统',
			re_liubiao:'手杀刘表',
			hucheer:'胡车儿',
			daoji:'盗戟',
			daoji_info:'出牌阶段限一次，你可以弃置一张非基本牌并选择一名装备区里有牌的其他角色，你获得其装备区中的一张牌并使用之。若你以此法获得的牌是武器牌，则你使用此牌后对其造成1点伤害。',
			xin_hansui:'手杀韩遂',
			xinniluan:'逆乱',
			xinniluan_info:'其他角色的结束阶段，若其本回合对除其以外的角色使用过牌，则你可以对其使用一张【杀】。若以此法使用的【杀】造成伤害，则你弃置其一张牌。',
			xiaoxi_hansui:'骁袭',
			xiaoxi_hansui_info:'你可以将一张黑色牌当做【杀】使用或打出。',
			xin_zhangfei:'手杀张飞',
			liyong:'厉勇',
			liyong2:'厉勇',
			liyong3:'厉勇',
			liyong_info:'锁定技，若你于出牌阶段使用的【杀】被【闪】抵消，本阶段你下一张【杀】不可被响应且伤害+1，指定的目标本回合非锁定技失效，当此【杀】造成伤害后，若目标角色未死亡，你失去1点体力。',
			mobile_standard:'手杀异构·标准包',
			mobile_shenhua:'手杀异构·神话再临',
			mobile_yijiang1:'手杀异构·一将成名',
			mobile_sp:'手杀异构·SP',
			xin_gongsunzan:'手杀公孙瓒',
		}
	};
});
