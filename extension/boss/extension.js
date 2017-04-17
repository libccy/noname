'use strict';
game.import('play',function(lib,game,ui,get,ai,_status){
	return {
		name:'boss',
		init:function(){
			if(get.mode()=='tafang') return;
			if(get.mode()!='boss'){
				lib.characterPack.mode_extension_boss={
					boss_zhuque:['female','shen',4,['boss_shenyi','boss_fentian'],['shu','hiddenboss','bossallowed']],
					boss_huoshenzhurong:['male','shen',5,['boss_shenyi','boss_xingxia'],['shu','hiddenboss','bossallowed']],
					boss_yanling:['male','shen',4,['boss_huihuo','boss_furan'],['shu','hiddenboss','bossallowed']],
					boss_yandi:['male','shen',6,['boss_shenyi','boss_shenen','boss_chiyi'],['shu','hiddenboss','bossallowed']],

					boss_qinglong:['male','shen',4,['boss_shenyi','releiji'],['wu','hiddenboss','bossallowed']],
					boss_mushengoumang:['male','shen',5,['boss_shenyi','boss_buchun'],['wu','hiddenboss','bossallowed']],
					boss_shujing:['female','shen',2,['boss_cuidu','boss_zhongdu'],['wu','hiddenboss','bossallowed']],
					boss_taihao:['male','shen',6,['boss_shenyi','boss_shenen','boss_qingyi'],['wu','hiddenboss','bossallowed']],

					boss_nianshou_heti:['male','shen',12,['boss_nianrui','boss_mengtai','boss_nbianshen','boss_nbianshenx'],['shu','boss','bossallowed'],'shu'],
					boss_nianshou_jingjue:['male','shen',12,['boss_nianrui','boss_mengtai','boss_jingjue','boss_nbianshen'],['shu','hiddenboss','bossallowed'],'shu'],
					boss_nianshou_renxing:['male','shen',12,['boss_nianrui','boss_mengtai','boss_renxing','boss_nbianshen'],['shu','hiddenboss','bossallowed'],'shu'],
					boss_nianshou_ruizhi:['male','shen',12,['boss_nianrui','boss_mengtai','boss_ruizhi','boss_nbianshen'],['shu','hiddenboss','bossallowed'],'shu'],
					boss_nianshou_baonu:['male','shen',12,['boss_nianrui','boss_mengtai','boss_nbaonu','boss_shouyi','boss_nbianshen'],['shu','hiddenboss','bossallowed'],'shu'],
					boss_baiwuchang:['male','shen',9,['boss_baolian','boss_qiangzheng','boss_zuijiu','juece','boss_bianshen4'],['shu','hiddenboss','bossallowed']],
					boss_heiwuchang:['male','shen',9,['boss_guiji','boss_taiping','boss_suoming','boss_xixing','boss_bianshen4'],['shu','hiddenboss','bossallowed']],
					boss_luocha:['male','shen',12,['boss_modao','boss_yushou','yizhong','boss_moyany'],['shu','hiddenboss','bossallowed']],
					boss_yecha:['male','shen',11,['boss_modao','boss_mojian','bazhen','boss_danshu'],['shu','hiddenboss','bossallowed']],
					boss_niutou:['male','shen',7,['boss_baolian','niepan','boss_manjia','boss_xiaoshou','boss_bianshen3'],['shu','hiddenboss','bossallowed']],
					boss_mamian:['male','shen',6,['boss_guiji','fankui','boss_lianyu','juece','boss_bianshen3'],['shu','hiddenboss','bossallowed']],
					boss_chi:['male','shen',5,['boss_guimei','boss_didong','boss_shanbeng','boss_bianshen2'],['shu','hiddenboss','bossallowed']],
					boss_mo:['female','shen',5,['boss_guimei','enyuan','boss_beiming','boss_bianshen2'],['shu','hiddenboss','bossallowed']],
					boss_wang:['male','shen',5,['boss_guimei','boss_luolei','huilei','boss_bianshen2'],['shu','hiddenboss','bossallowed']],
					boss_liang:['female','shen',5,['boss_guimei','boss_guihuo','boss_minbao','boss_bianshen2'],['shu','hiddenboss','bossallowed']],

					boss_lvbu1:['male','shen',8,['mashu','wushuang','boss_baonu'],['qun','boss','bossallowed'],'wei'],
					boss_lvbu2:['male','shen',4,['mashu','wushuang','xiuluo','shenwei','shenji'],['qun','hiddenboss','bossallowed'],'qun'],
					boss_lvbu3:['male','shen',4,['wushuang','shenqu','jiwu'],['qun','hiddenboss','bossallowed'],'qun'],

					boss_caocao:['male','shen',12,['boss_guixin','xiongcai'],['wei','boss','bossallowed'],'wei'],
					boss_guojia:['male','shen',4,['tiandu','boss_guimou','boss_yuance','boss_qizuo'],['wei','boss','bossallowed'],'zhu'],
					boss_zhangchunhua:['female','shen',4,['jueqing','boss_wuxin','shangshix'],['wei','boss','bossallowed'],'wei'],
					boss_zhenji:['female','shen',4,['tashui','lingbo','jiaoxia','fanghua'],['wei','boss','bossallowed'],'wei'],

					boss_liubei:['male','shen',12,['xiaoxiong','boss_zhangwu'],['shu','boss','bossallowed'],'qun'],
					boss_zhugeliang:['male','shen',Infinity,['xiangxing','yueyin','fengqi','gaiming'],['shu','boss','bossallowed'],'qun'],
					boss_huangyueying:['female','shen',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['shu','boss','bossallowed'],'wei'],
					boss_pangtong:['male','shen',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['shu','boss','bossallowed'],'zhu'],
					boss_zhaoyun:['male','shen',1,['boss_juejing','longhun','zhanjiang'],['shu','boss','bossallowed'],'qun'],

					boss_zhouyu:['male','shen',6,['huoshen','boss_honglian','boss_xianyin'],['wu','boss','bossallowed'],'zhu'],

					boss_caiwenji:['female','shen',4,['beige','boss_hujia','boss_guihan'],['qun','boss','bossallowed'],'wei'],
					boss_zhangjiao:['male','shen',8,['boss_leiji','tiandao','jidian'],['qun','boss','bossallowed'],'shu'],
					boss_zuoci:['male','shen',0,['huanhua'],['qun','boss','bossallowed'],'shu'],

					boss_diaochan:['female','shen',4,['fengwu','yunshen','lianji','boss_wange','yuehun'],['qun','boss','bossallowed'],'qun'],
					boss_huatuo:['male','shen',6,['chulao','mazui','boss_shengshou','guizhen','wuqin'],['qun','boss','bossallowed'],'wu'],
					boss_dongzhuo:['male','shen',20,['jiuchi','boss_qiangzheng','boss_baolin'],['qun','boss','bossallowed'],'shu'],
				};
				for(var i in lib.characterPack.mode_extension_boss){
					lib.characterPack.mode_extension_boss[i][4].push('mode:boss');
					lib.character[i]=lib.characterPack.mode_extension_boss[i];
					if(!lib.config.boss_enableai_playpackconfig){
						lib.config.forbidai.push(i);
					}
				}
				var list2={
					boss_liedixuande:['male','shu',5,['boss_lingfeng','boss_jizhen'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
					boss_gongshenyueying:['male','shu',4,['boss_gongshenjg','boss_jingmiao','boss_zhinang'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
					boss_tianhoukongming:['male','shu',4,['boss_biantian','bazhen'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
					boss_yuhuoshiyuan:['male','shu',4,['boss_yuhuojg','boss_qiwu','boss_tianyujg'],['jiangeboss','hiddenboss','bossallowed'],'shu'],
					boss_qiaokuijunyi:['male','wei',4,['boss_huodi','boss_jueji'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
					boss_jiarenzidan:['male','wei',5,['boss_chiying','boss_jingfan'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
					boss_duanyuzhongda:['male','wei',5,['boss_fanshi','boss_xuanlei','boss_skonghun'],['jiangeboss','hiddenboss','bossallowed'],'wei'],
					boss_juechenmiaocai:['male','wei',4,['boss_chuanyun','boss_leili','boss_fengxing'],['jiangeboss','hiddenboss','bossallowed'],'wei'],

					boss_jileibaihu:['male','shu',4,['boss_jiguan','boss_zhenwei','boss_benlei'],['jiangemech','hiddenboss','bossallowed'],'shu'],
					boss_yunpingqinglong:['male','shu',4,['boss_jiguan','boss_mojianjg'],['jiangemech','hiddenboss','bossallowed'],'shu'],
					boss_lingjiaxuanwu:['male','shu',5,['boss_jiguan','yizhong','boss_lingyu'],['jiangemech','hiddenboss','bossallowed'],'shu'],
					boss_chiyuzhuque:['male','shu',5,['boss_jiguan','boss_yuhuojg','boss_tianyun'],['jiangemech','hiddenboss','bossallowed'],'shu'],
					boss_fudibian:['male','wei',4,['boss_jiguan','boss_didongjg'],['jiangemech','hiddenboss','bossallowed'],'wei'],
					boss_tuntianchiwen:['male','wei',5,['boss_jiguan','boss_tanshi','boss_tunshi'],['jiangemech','hiddenboss','bossallowed'],'wei'],
					boss_shihuosuanni:['male','wei',3,['boss_jiguan','boss_lianyujg'],['jiangemech','hiddenboss','bossallowed'],'wei'],
					boss_lieshiyazi:['male','wei',4,['boss_jiguan','boss_nailuo'],['jiangemech','hiddenboss','bossallowed'],'wei'],
				}
				if(get.mode()!='versus'||get.config('versus_mode')!='jiange'){
					lib.characterPack.mode_extension_jiange=list2;
					for(var i in list2){
						lib.characterPack.mode_extension_jiange[i]=list2[i];
						lib.characterPack.mode_extension_jiange[i][4].push('mode:versus');
						lib.character[i]=list2[i];
						if(!lib.config.boss_enableai_playpackconfig){
							lib.config.forbidai.push(i);
						}
					}
					lib.characterIntro.boss_liedixuande=lib.characterIntro.liubei;
					lib.characterIntro.boss_gongshenyueying=lib.characterIntro.huangyueying;
					lib.characterIntro.boss_tianhoukongming=lib.characterIntro.shen_zhugeliang;
					lib.characterIntro.boss_yuhuoshiyuan=lib.characterIntro.pangtong;
					lib.characterIntro.boss_qiaokuijunyi=lib.characterIntro.zhanghe;
					lib.characterIntro.boss_jiarenzidan=lib.characterIntro.caozhen;
					lib.characterIntro.boss_duanyuzhongda=lib.characterIntro.simayi;
					lib.characterIntro.boss_juechenmiaocai=lib.characterIntro.xiahouyuan;
				}
				else if(_status.mode!='jiange'){
					for(var i in list2){
						lib.character[i]=list2[i];
						if(!lib.config.boss_enableai_playpackconfig){
							lib.config.forbidai.push(i);
						}
					}
				}
				var list={
					boss_chi:'魑',
					boss_mo:'魅',
					boss_wang:'魍',
					boss_liang:'魉',
					boss_niutou:'牛头',
					boss_mamian:'马面',
					boss_baiwuchang:'白无常',
					boss_heiwuchang:'黑无常',
					boss_luocha:'罗刹',
					boss_yecha:'夜叉',

					boss_nianshou:'年兽',
					boss_nianshou_heti:'合体',
					boss_nianshou_jingjue:'警觉年兽',
					boss_nianshou_renxing:'任性年兽',
					boss_nianshou_baonu:'暴怒年兽',
					boss_nianshou_ruizhi:'睿智年兽',

					boss_shuijing:'水镜先生',
					boss_huangyueying:'奇智女杰',
					boss_zhangchunhua:'冷血皇后',
					boss_satan:'堕落天使',
					boss_dongzhuo:'乱世魔王',
					boss_lvbu1:'最强神话',
					boss_lvbu2:'暴怒战神',
					boss_lvbu3:'神鬼无前',
					boss_zhouyu:'赤壁火神',
					boss_pangtong:'涅盘凤雏',
					boss_zhugeliang:'祭风卧龙',
					boss_zhangjiao:'天公将军',
					boss_zuoci:'迷之仙人',
					boss_yuji:'琅琊道士',
					boss_liubei:'蜀汉烈帝',
					boss_caiwenji:'异乡孤女',
					boss_huatuo:'药坛圣手',
					boss_luxun:'蹁跹君子',
					boss_zhenji:'洛水仙子',
					boss_diaochan:'绝代妖姬',
					boss_zhaoyun:'高达一号',
					boss_zhuoguiquxie:'捉鬼驱邪',
					boss_caocao:'魏武大帝',
					boss_guojia:'世之奇士',

					boss_liedixuande:'烈帝玄德',
					boss_gongshenyueying:'工神月英',
					boss_tianhoukongming:'天侯孔明',
					boss_yuhuoshiyuan:'浴火士元',
					boss_qiaokuijunyi:'巧魁儁乂',
					boss_jiarenzidan:'佳人子丹',
					boss_duanyuzhongda:'断狱仲达',
					boss_juechenmiaocai:'绝尘妙才',

					boss_jileibaihu:'机雷白虎',
					boss_yunpingqinglong:'云屏青龙',
					boss_lingjiaxuanwu:'灵甲玄武',
					boss_chiyuzhuque:'炽羽朱雀',
					boss_fudibian:'缚地狴犴',
					boss_tuntianchiwen:'吞天螭吻',
					boss_shihuosuanni:'食火狻猊',
					boss_lieshiyazi:'裂石睚眦',

					mode_extension_boss_character_config:'挑战武将',
					mode_extension_jiange_character_config:'剑阁武将',
				};

				for(var i in list){
					lib.translate[i]=lib.translate[i]||list[i];
				}
			}
		},
		arenaReady:function(){
			if(get.mode()=='tafang') return;
			var loadversus=function(){
				if(get.mode()!='versus'){
					game.loadModeAsync('versus',function(mode){
						for(var i in mode.translate){
							lib.translate[i]=lib.translate[i]||mode.translate[i];
						}
						for(var i in mode.skill){
							if(lib.skill[i]) console.log(i);
							if(i!='versus_ladder'){
								lib.skill[i]=mode.skill[i];
								game.finishSkill(i);
							}
						}
					});
				}
			};
			if(get.mode()!='boss'){
				game.loadModeAsync('boss',function(mode){
					for(var i in mode.translate){
						lib.translate[i]=lib.translate[i]||mode.translate[i];
					}
					for(var i in mode.skill){
						if(lib.skill[i]) console.log(i);
						lib.skill[i]=mode.skill[i];
						game.finishSkill(i);
					}
					loadversus();
				});
			}
			else{
				loadversus();
			}
		},
	};
});
