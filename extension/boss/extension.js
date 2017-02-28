play.boss={
	init:function(){
		if(get.mode()=='tafang') return;
		if(get.mode()!='boss'){
			lib.characterPack.mode_extension_boss={
				boss_zhangchunhua:['female','wei',4,['jueqing','wuxin','shangshix'],['boss','bossallowed'],'wei'],
				boss_zhenji:['female','wei',4,['tashui','lingbo','jiaoxia','fanghua'],['boss','bossallowed'],'wei'],
				boss_huangyueying:['female','shu',4,['boss_gongshen','boss_jizhi','qicai','boss_guiyin'],['boss','bossallowed'],'wei'],
				boss_pangtong:['male','shu',4,['boss_tianyu','qiwu','niepan','boss_yuhuo'],['boss','bossallowed'],'zhu'],
				boss_zhaoyun:['male','shu',1,['boss_juejing','longhun','zhanjiang'],['boss','bossallowed'],'qun'],
				boss_zhouyu:['male','wu',6,['huoshen','boss_honglian','boss_xianyin'],['boss','bossallowed'],'zhu'],

				boss_zhuoguiquxie:['male','qun',0,['boss_bianshen'],['boss','bossallowed'],'shu'],
				boss_nianshou:['male','qun',Infinity,['boss_nianrui','boss_qixiang','boss_damagecount'],['boss'],'shu'],
				boss_nianshou_heti:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbianshen','boss_nbianshenx'],['boss','bossallowed'],'shu'],
				boss_nianshou_jingjue:['male','qun',12,['boss_nianrui','boss_mengtai','boss_jingjue','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
				boss_nianshou_renxing:['male','qun',12,['boss_nianrui','boss_mengtai','boss_renxing','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
				boss_nianshou_ruizhi:['male','qun',12,['boss_nianrui','boss_mengtai','boss_ruizhi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
				boss_nianshou_baonu:['male','qun',12,['boss_nianrui','boss_mengtai','boss_nbaonu','boss_shouyi','boss_nbianshen'],['hiddenboss','bossallowed'],'shu'],
				boss_baiwuchang:['male','qun',9,['boss_baolian','boss_qiangzheng','boss_zuijiu','juece','boss_bianshen4'],['hiddenboss','bossallowed']],
				boss_heiwuchang:['male','qun',9,['boss_guiji','boss_taiping','boss_suoming','boss_xixing','boss_bianshen4'],['hiddenboss','bossallowed']],
				boss_luocha:['male','qun',12,['boss_modao','boss_yushou','yizhong','boss_moyany'],['hiddenboss','bossallowed']],
				boss_yecha:['male','qun',11,['boss_modao','boss_mojian','bazhen','boss_danshu'],['hiddenboss','bossallowed']],
				boss_niutou:['male','qun',7,['boss_baolian','niepan','boss_manjia','boss_xiaoshou','boss_bianshen3'],['hiddenboss','bossallowed']],
				boss_mamian:['male','qun',6,['boss_guiji','fankui','boss_lianyu','juece','boss_bianshen3'],['hiddenboss','bossallowed']],
				boss_chi:['male','qun',5,['boss_guimei','boss_didong','boss_shanbeng','boss_bianshen2'],['hiddenboss','bossallowed']],
				boss_mo:['female','qun',5,['boss_guimei','enyuan','boss_beiming','boss_bianshen2'],['hiddenboss','bossallowed']],
				boss_wang:['male','qun',5,['boss_guimei','boss_luolei','huilei','boss_bianshen2'],['hiddenboss','bossallowed']],
				boss_liang:['female','qun',5,['boss_guimei','boss_guihuo','boss_minbao','boss_bianshen2'],['hiddenboss','bossallowed']],

				boss_lvbu1:['male','qun',8,['mashu','wushuang','boss_baonu'],['boss','bossallowed'],'wei'],
				boss_lvbu2:['male','qun',4,['mashu','wushuang','swd_xiuluo','shenwei','shenji'],['hiddenboss','bossallowed'],'qun'],
				boss_lvbu3:['male','qun',4,['mashu','wushuang','shenqu','jiwu'],['hiddenboss','bossallowed'],'qun'],
				boss_caiwenji:['female','qun',4,['beige','boss_hujia','boss_guihan'],['boss','bossallowed'],'wei'],
				boss_zhangjiao:['male','qun',8,['boss_leiji','tiandao','jidian'],['boss','bossallowed'],'shu'],
				boss_zuoci:['male','qun',0,['huanhua'],['boss','bossallowed'],'shu'],
				// boss_yuji:['male','qun',8,[],['boss','bossallowed'],'nei'],
				boss_diaochan:['female','qun',4,['fengwu','yunshen','lianji','boss_wange','yuehun'],['boss','bossallowed'],'qun'],
				boss_huatuo:['male','qun',6,['chulao','mazui','boss_shengshou','guizhen','wuqin'],['boss','bossallowed'],'wu'],
				boss_dongzhuo:['male','qun',20,['jiuchi','boss_qiangzheng','boss_baolin'],['boss','bossallowed'],'shu'],
				// boss_shuijing:['male','qun',8,[],['boss','bossallowed'],'wei'],


				boss_liubei:['male','shu',12,['xiaoxiong','boss_zhangwu'],['boss','bossallowed'],'qun'],
				boss_zhugeliang:['male','shu',Infinity,['xiangxing','yueyin','fengqi','gaiming'],['boss','bossallowed'],'qun'],
				boss_guojia:['male','wei',4,['tiandu','boss_guimou','boss_yuance','boss_qizuo'],['boss','bossallowed'],'zhu'],
				boss_caocao:['male','wei',12,['boss_guixin','xiongcai'],['boss','bossallowed'],'wei'],
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
			if(get.mode()!='versus'){
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
				boss_nianshou_heti:'合体年兽',
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
				window.mode={};
				lib.init.js(lib.assetURL+'mode','versus',function(){
					for(var i in mode.versus.translate){
						lib.translate[i]=lib.translate[i]||mode.versus.translate[i];
					}
					for(var i in mode.versus.skill){
						if(lib.skill[i]) console.log(i);
						if(i!='versus_ladder'){
							lib.skill[i]=lib.init.eval(mode.versus.skill[i]);
							game.finishSkill(i);
						}
					}
					delete window.mode;
				});
			}
		};
		if(get.mode()!='boss'){
			window.mode={};
			lib.init.js(lib.assetURL+'mode','boss',function(){
				for(var i in mode.boss.translate){
					lib.translate[i]=lib.translate[i]||mode.boss.translate[i];
				}
				for(var i in mode.boss.skill){
					if(lib.skill[i]) console.log(i);
					lib.skill[i]=lib.init.eval(mode.boss.skill[i]);
					game.finishSkill(i);
				}
				delete window.mode;
				loadversus();
			});
		}
		else{
			loadversus();
		}
	},
	help:{
		'挑战武将':'<ul><li>在非挑战模式中使用挑战武将'
	},
}
