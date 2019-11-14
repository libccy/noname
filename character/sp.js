'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'sp',
		connect:true,
		characterSort:{
			sp:{
				sp_default:["caoying","simahui","baosanniang","yangxiu","chenlin","caohong","xiahouba","yuanshu","sp_diaochan","sp_zhaoyun","liuxie","zhugejin","zhugeke","guanyinping","simalang","zhangxingcai","fuwan","sp_sunshangxiang","caoang","sp_caoren","zhangbao","maliang","zhugedan","sp_jiangwei","sp_machao","sunhao","shixie","mayunlu","zhanglu","wutugu","sp_caiwenji","zhugeguo","lingju","jsp_guanyu","jsp_huangyueying","sunluyu","zumao","wenpin","daxiaoqiao","guansuo","tadun","yanbaihu","chengyu","wanglang","sp_pangde","sp_jiaxu","litong","mizhu","buzhi","caochun","dongbai","zhaoxiang","mazhong","dongyun","kanze","heqi","wangyun","sunqian","xizhicai","quyi","luzhi","wenyang","guanlu","gexuan"],
				sp_whlw:["xurong","lijue","zhangji","fanchou","guosi"],
				sp_zlzy:["zhangqiying","lvkai","zhanggong","weiwenzhugezhi","beimihu"],
				sp_longzhou:["xf_tangzi","xf_huangquan","xf_sufei","sp_liuqi"],
				sp_zizouqi:["mangyachang","xugong","zhangchangpu"],
				sp_zhongdan:["cuiyan","huangfusong"],
				sp_star:["sp_xiahoushi","jsp_zhaoyun","huangjinleishi","sp_pangtong","sp_daqiao","sp_ganning","sp_xiahoudun","sp_lvmeng","sp_zhangfei","sp_liubei"],
				sp_guozhan:["shamoke","ganfuren","yuejin","hetaihou","dingfeng","panfeng","jianggan"],
				sp_guozhan2:["mifuren","mateng","tianfeng","chendong","sp_dongzhuo","jiangfei","jiangqing","kongrong","bianfuren","liqueguosi","lvfan","cuimao","jiling","zangba","zhangren","zoushi"],
				sp_single:["hejin","hansui","niujin"],
				sp_others:["hanba"],
			},
		},
		character:{
			hejin:['male','qun',4,['mouzhu','yanhuo']],
			hansui:['male','qun',4,['mashu','niluan']],
			niujin:['male','wei',4,['cuorui','liewei']],
			
			guanlu:['male','wei',3,['tuiyan','busuan','mingjie']],
			gexuan:['male','wu',3,['gxlianhua','zhafu']],
			wenyang:['male','wei',5,['xinlvli','choujue']],
			mangyachang:["male","qun",4,["spjiedao"],[]],
			xugong:["male","wu",3,["biaozhao","yechou"],[]],
			zhangchangpu:["female","wei",3,["yanjiao","xingshen"],[]],
			jianggan:["male","wei",3,["weicheng","daoshu"]],
			lijue:["male","qun","4/6",["xinfu_langxi","xinfu_yisuan"],[]],
			zhangji:["male","qun",4,["xinfu_lveming","xinfu_tunjun"],[]],
			fanchou:["male","qun",4,["xinfu_xingluan"],[]],
			guosi:["male","qun",4,["xinfu_tanbei","xinfu_sidao"],[]],
			lvkai:["male","shu",3,["xinfu_tunan","xinfu_bijing"],[]],
			zhanggong:["male","wei",3,["xinfu_zhenxing","xinfu_qianxin"],[]],
			weiwenzhugezhi:["male","wu",4,["xinfu_fuhai"],[]],
			xf_tangzi:["male","wei",4,["xinfu_xingzhao"],[]],
			xf_huangquan:["male","shu",3,["xinfu_dianhu","xinfu_jianji"],[]],
			xf_sufei:["male","wu",4,["xinfu_lianpian"],[]],
			caoying:["female","wei",4,["xinfu_lingren","xinfu_fujian"],[]],
			simahui:["male","qun",3,["xinfu_jianjie","xinfu_chenghao","xinfu_yinshi"],[]],
			baosanniang:["female","shu",3,["xinfu_wuniang","xinfu_xushen"],[]],
			xurong:["male","qun",4,["xinfu_xionghuo","xinfu_shajue"],[]],
			zhangqiying:["female","qun",3,["xinfu_falu","xinfu_dianhua","xinfu_zhenyi"],[]],
			sp_xiahoushi:["female","shu",3,["xinfu_yanyu","xinfu_xiaode"],[]],
			
			
			yangxiu:['male','wei',3,['jilei','danlao']],
			chenlin:['male','wei',3,['bifa','songci']],
			caohong:['male','wei',4,['yuanhu']],
			xiahouba:['male','shu',4,['baobian']],
			yuanshu:['male','qun',4,['yongsi','weidi']],
			sp_diaochan:['female','qun',3,['lihun','rebiyue']],
			sp_zhaoyun:['male','qun',3,['longdan','chongzhen']],
			jsp_zhaoyun:['male','qun',3,['chixin','yicong','suiren']],
			liuxie:['male','qun',3,['tianming','mizhao']],
			zhugejin:['male','wu',3,['hongyuan','huanshi','mingzhe']],
			zhugeke:['male','wu',3,['aocai','duwu']],
			guanyinping:['female','shu',3,['huxiao','xueji','wuji']],
			simalang:['male','wei',3,['junbing','quji']],
			zhangxingcai:['female','shu',3,['shenxian','qiangwu']],
			fuwan:['male','qun',4,['moukui']],
			sp_sunshangxiang:['female','shu',3,['liangzhu','fanxiang']],
			caoang:['male','wei',4,['kaikang']],
			sp_caoren:['male','wei',4,['weikui','lizhan']],
			zhangbao:['male','qun',3,['zhoufu','yingbin']],
			huangjinleishi:['female','qun',3,['fulu','fuji']],
			maliang:['male','shu',3,['zishu','yingyuan']],
			sp_pangtong:['male','qun',3,['xinmanjuan','zuixiang']],
			zhugedan:['male','wei',4,['gongao','juyi']],
			sp_jiangwei:['male','wei',4,['kunfen','fengliang']],
			sp_machao:['male','qun',4,['zhuiji','ol_shichou']],
			sunhao:['male','wu',5,['canshi','chouhai','guiming'],['zhu']],
			shixie:['male','qun',3,['biluan','lixia']],
			mayunlu:['female','shu',4,['fengpo','mashu']],
			zhanglu:['male','qun',3,['yishe','bushi','midao']],
			wutugu:['male','qun',15,['ranshang','hanyong']],
			sp_caiwenji:['female','wei',3,['chenqing','mozhi']],
			zhugeguo:['female','shu',3,['yuhua','qirang']],
			
			lingju:['female','qun',3,['jieyuan','fenxin']],
			
			cuiyan:['male','wei',3,['yawang','xunzhi']],
			sp_zhangfei:['male','shu',4,['jie','dahe']],
			jsp_guanyu:['male','wei',4,['new_rewusheng','danji']],
			jsp_huangyueying:['female','qun',3,['jiqiao','linglong']],
			sunluyu:['female','wu',3,['new_meibu','new_mumu']],
			hanba:['female','qun',4,['fentian','zhiri']],
			zumao:['male','wu',4,['yinbing','juedi']],
			wenpin:['male','wei',4,['zhenwei']],
			daxiaoqiao:['female','wu',3,['new_xingwu','new_luoyan']],
			sp_daqiao:['female','wu',3,['yanxiao','anxian']],
			sp_ganning:['male','qun',4,['yinling','junwei']],
			sp_xiahoudun:['male','wei',4,['fenyong','xuehen'],['die_audio']],
			sp_lvmeng:['male','wu',3,['tanhu','mouduan']],

			guansuo:['male','shu',4,['xinzhengnan','xiefang']],
			tadun:['male','qun',4,['luanzhan']],
			yanbaihu:['male','qun',4,['zhidao','jili']],
			chengyu:['male','wei',3,['shefu','benyu']],

			wanglang:['male','wei',3,['gushe','jici']],
			sp_pangde:['male','wei',4,['mashu','juesi']],
			sp_jiaxu:['male','wei',3,['zhenlue','jianshu','yongdi']],

			litong:['male','wei',4,['tuifeng']],
			mizhu:['male','shu',3,['ziyuan','jugu']],
			buzhi:['male','wu',3,['hongde','dingpan']],

			sp_liubei:['male','shu',4,['zhaolie','shichou']],
			caochun:['male','wei',4,['xinshanjia']],
			
			dongbai:['female','qun',3,['lianzhu','xiehui']],

			zhaoxiang:['female','shu',4,['fanghun','fuhan']],
			mazhong:['male','shu',4,['fuman']],
			dongyun:['male','shu',3,['bingzheng','sheyan']],
			kanze:['male','wu',3,['xiashu','kuanshi']],
			heqi:['male','wu',4,['qizhou','shanxi']],

			ganfuren:['female','shu',3,['shushen','shenzhi']],
			mifuren:['female','shu',3,['guixiu','cunsi']],
			mateng:['male','qun',4,['xiongyi','mashu']],
			tianfeng:['male','qun',3,['sijian','suishi']],
			yuejin:['male','wei',4,['xiaoguo']],
			chendong:['male','wu',4,['duanxie','fenming']],
			sp_dongzhuo:['male','qun',5,['hengzheng']],
			jiangfei:['male','shu',3,['shengxi','shoucheng']],
			jiangqing:['male','wu',4,['shangyi']],
			hetaihou:['female','qun',3,['zhendu','qiluan']],
			kongrong:['male','qun',3,['lirang','mingshi']],
			dingfeng:['male','wu',4,['fenxun','duanbing']],
			panfeng:['male','qun',4,['kuangfu']],
			bianfuren:['female','wei',3,['wanwei','yuejian']],
			shamoke:['male','shu',4,['gzjili']],
			liqueguosi:['male','qun',4,['xiongsuan']],
			lvfan:['male','wu',3,['diaodu','diancai']],
			cuimao:['male','wei',3,['zhengbi','fengying']],

			jiling:['male','qun',4,['shuangren']],
			zangba:['male','wei',4,['hengjiang']],
			zhangren:['male','qun',4,['chuanxin','zfengshi']],
			zoushi:['female','qun',3,['zhuoshui','zqingcheng']],

			huangfusong:['male','qun',4,['fenyue']],
			

			wangyun:['male','qun',4,['wylianji','moucheng']],
			sunqian:['male','shu',3,['qianya','shuimeng']],
			xizhicai:['male','wei',3,['tiandu','xianfu','chouce']],
			quyi:['male','qun',4,['fuqi','jiaozi']],

			
			beimihu:['female','qun',3,['zongkui','guju','baijia']],

			sp_liuqi:['male','qun',3,['spwenji','sptunjiang']],
			luzhi:['male','wei',3,['qingzhong','weijing']],
			
			//kaisa:["male","western",4,["zhengfu"]],
		},
		characterIntro:{
			hejin:'何进（？~189年），字遂高，南阳郡宛县（今河南南阳市宛城区）人。东汉时期外戚大臣，灵思皇后之兄。初以妹妹有宠，拜为郎中，出任虎贲中郎将、颍川太守，迁侍中、将作大匠、河南尹。黄巾起义时，拜为大将军，总镇京师，发现并镇压马元义的密谋，封为慎侯。为张大威望，在京师讲武结营，置西园八校尉。汉灵帝驾崩后，粉碎了中常侍蹇硕拥立皇子刘协的图谋，听从袁绍之言，博征智谋之士，内借元舅之资，外据辅政之权，独揽朝中大权。中平六年（189），不纳陈琳和曹操劝谏，阴结军阀董卓，联合袁绍谋诛宦竖。事情败露后，为中常侍张让等人损害，其后代是魏晋高门士族南阳何氏。',
			hansui:'韩遂（？－215年），字文约。凉州金城郡人。东汉末年军阀、将领，汉末群雄之一。原名韩约，后改名遂。韩遂最初闻名于西州，被羌胡叛军劫持并推举为首领，以诛宦官为名举兵造反，聚众十万，先后败皇甫嵩、张温、董卓、孙坚等名将，使得天下骚动。后受朝廷招安，拥兵割据一方长达三十余年。韩遂曾与马腾结为异姓兄弟，后二人关系破裂。袁绍、曹操相争之际，马腾、韩遂被钟繇说服，依附于曹操。马腾入京后，留其子马超统领部队。马超推举韩遂为都督起兵反叛曹操，为曹操所败，韩遂逃奔凉州，后又为夏侯渊所败，病死（一说被杀），享年七十余岁。',
			niujin:'牛金（生卒年不详），初为曹仁部曲将，周瑜军数万人来攻，前锋数千人始至，曹仁登城望，乃募得三百人，遣牛金迎战。但对方兵力较多，牛金遂被围困。曹仁亲自杀入阵中救出牛金。司马懿使牛金轻骑饵诱蜀军，刚交战诸葛亮就退兵，追至祁山。蜀将马岱入寇，司马懿遣将军牛金击退，斩千余级。公孙渊反，司马懿帅牛金、胡遵等步骑四万发自洛阳，后平定辽东。牛金官至后将军。',
			guanlu:"管辂（209年－256年），字公明，平原（今山东德州平原县）人。三国时期曹魏术士。年八九岁，便喜仰观星辰。成人后，精通《周易》，善于卜筮、相术，习鸟语，相传每言辄中，出神入化。体性宽大，常以德报怨。正元初，为少府丞。北宋时被追封为平原子。管辂是历史上著名的术士，被后世奉为卜卦观相的祖师。",
			gexuan:"葛玄（164年-244年），汉族，吴丹阳郡句容县都乡吉阳里人（今句容市），祖籍山东琅琊，三国著名高道，道教灵宝派祖师。字孝先，号仙翁，被尊称为“葛天师”。道教尊为葛仙翁，又称太极仙翁，与张道陵、许逊、萨守坚共为四大天师。为汉下邳僮侯葛艾后裔，祖葛矩，安平太守，黄门郎；从祖葛弥，豫章第五郡太守。父葛焉，字德儒，州主簿，山阴令，散骑常侍，大尚书。随左慈学道，得《太清丹经》、《黄帝九鼎神丹经》、《金液丹经》等道经。曾采药海山，吴嘉禾二年（233年），在閤皂山修道建庵，筑坛立炉，修炼九转金丹。喜好遨游山川，去过括苍山、南岳山、罗浮山。编撰《灵宝经诰》，精研上清、灵宝等道家真经，并嘱弟子世世箓传。",
			wenyang:"文俶（238年—291年），一作文淑，字次骞，小名阿鸯，世称文鸯，谯郡（今安徽亳州市）人。魏末晋初名将，曹魏扬州刺史文钦之子。骁勇善战，依附大将军曹爽，效忠于王室。司马师废黜皇帝曹芳后，随父联合毌丘俭于淮南起兵勤王。兵败之后，向南投奔吴国。诸葛诞发动淮南叛乱，奉命率军驰援。双方发生内讧，父亲为诸葛诞所害，遂降于司马昭，封关内侯。西晋建立后，任平虏护军。咸宁三年（277年），拜平西将军、都督凉秦雍州三州军事，大破鲜卑首领秃发树机能，名震天下，迁使持节、护东夷校尉、监辽东军事。八王之乱中，为诸葛诞外孙、东安王司马繇所诬杀，惨遭灭族，时年五十四岁。",
			jianggan:"蒋干，字子翼，汉末三国时期的人物，九江（治今安徽寿县）人。历史上的蒋干是当时的名士、辩论家。而罗贯中在历史小说《三国演义》中则将蒋干刻画成了被周瑜所愚弄的小丑形象。",
			zhangchangpu:"钟会的母亲。《母夫人张氏传》：夫人张氏，字昌蒲，太原兹氏人，太傅定陵成侯之命妇也。",
			xugong:"许贡是东汉末官吏。先后任吴郡都尉、太守，欲送密信给曹操，要曹操注意孙策，却被孙策发现而被杀。许贡生前招揽了一些门客，当中有三人不忘故主，千方百计想要手刃仇人。建安五年（公元200年），广陵太守陈登派人秘密联系孙策治下的山贼余党，企图颠覆孙策在江东的统治。孙策决定讨伐陈登，行军到丹徒时，许贡门客终于找到了机会。因为孙策有单骑出猎，在野外思考的习惯，三门客趁孙策轻装外出打猎时，放冷箭射中孙策面颊。这些门客后来在与孙策的搏斗中，被赶到的侍卫杀死。孙策此后因为伤口感染，并且俊美的容貌被毁，终于不治身亡，去世时年仅26岁。",
			mangyachang:"南蛮王孟获的部将，使一口截头大刀，骑一匹黄骠马。率军与蜀军交战，战败王平。后被平北将军马岱斩杀。只出现在《三国演义》里，正史中无此人。",
			huangjinleishi:"黄巾军中负责施法的女祭司二人组。",
			lijue:"李傕（jué，一说“傕”读音“què”）（？—198年），字稚然。北地郡泥阳县（今陕西省耀县）人，汉末群雄之一。东汉末年汉献帝时的军阀、权臣，官至大司马、车骑将军、开府、领司隶校尉、假节。<br>李傕本为董卓部将，后被董卓的女婿牛辅派遣至中牟与朱儁交战，大破朱儁，进而至陈留、颍川等地劫掠。初平三年（192年）董卓和牛辅被杀后，李傕归无所依，于是采用贾诩之谋，伙同郭汜、张济、樊稠等原董卓部曲将攻向长安。击败吕布，杀死王允等人，占领长安，把持朝廷大权。后诸将不和，李傕在会议上杀死了樊稠，又与郭汜分别劫持了汉献帝和众臣，相互交战，张济率兵赶来和解，于是二人罢兵，李傕出屯池阳黄白城，郭汜、张济等人随汉献帝东归前往弘农。<br>后来，李傕、郭汜、张济反悔，联合起来追击汉献帝，与杨奉、董承等人几番交战。汉献帝一路逃亡，狼狈不堪，到达安邑，与李傕等人讲和。不久，汉献帝被曹操迎往许都。建安三年（198年），曹操派谒者仆射裴茂召集关西诸将段煨等人征讨李傕，灭其三族。",
			zhangji:"张济（？－196年），武威郡祖厉县（今甘肃靖远东南）人。东汉末年割据军阀之一。 张济原为董卓部将，董卓被诛杀后，张济与李傕一同率军攻破长安，任中郎将。不久，升任镇东将军，封平阳侯，出屯弘农。献帝东迁时，张济升任骠骑将军，率军护卫献帝，后来因与董承等人有矛盾，便与李傕、郭汜一同追赶献帝。 建安元年（196年），张济因军队缺粮而进攻穰城，中流矢而死。死后，部队由侄儿张绣接管。",
			guosi:"郭汜（？－197年），又名郭多，凉州张掖（今甘肃张掖西北）人，东汉末年将领、军阀，献帝时权臣。原为董卓部下。董卓被杀后，凉州众将归无所依，于是采用贾诩之谋，联兵将攻向长安，击败吕布，杀死王允等人，占领长安，把持朝廷大权。几年后，郭汜被部将伍习杀死。",
			fanchou:"樊稠（？—195年），凉州金城（治今甘肃永靖西北）人。东汉末年军阀、将领。官至右将军，封万年侯。 原为董卓部将，董卓死后，伙同李傕、郭汜、张济等人合众十余万反扑长安，败吕布、杀王允，把持朝政。后马腾因与李傕有隙，于是联合韩遂举兵进攻，李傕派樊稠、郭汜等与其交战，大败马腾、韩遂于长平观下。樊稠追至陈仓，与韩遂友好罢兵，却遭李傕猜疑。兴平二年（195年），李傕让外甥骑都尉胡封在会议上将樊稠刺死（一说趁醉用杖击杀）。",
			lvkai:"吕凯（？―225年），字季平，永昌郡不韦县（今云南保山东北）人，三国时期蜀汉官员。初任永昌郡五官掾功曹。章武三年（223年），建宁太守雍闿反叛，投降吴国，吴国任雍闿为永昌太守，吕凯闭境抗拒雍闿。建兴三年（225年），丞相诸葛亮南征，表奏吕凯功劳，任命他为云南太守，封阳迁亭侯。吕凯还未上任，便被叛乱的少数民族杀害。",
			zhanggong:"张恭（生卒年不详），三国时期魏国大臣，与子张就一同闻名于西域。官至西域戊己校尉、关内侯，赠执金吾。初为敦煌郡功曹。东汉末河西大乱，太守马艾卒官，他被众人推为代理长史，遂派儿子张就请曹操委任太守，直至新太守到任。魏文帝时拜西域戊己校尉。魏明帝时去世。",
			weiwenzhugezhi:"卫温 （？—231年），三国时期东吴将领，曾任将军职。诸葛直（？—231年），三国时期东吴将领。黄龙二年（230年）正月，孙权派卫温、诸葛直带领上万士兵出海寻找夷洲、亶洲，想要俘获那里的民众以充实东吴的人口，陆逊和全琮都谏言反对，孙权不听。230年和卫温一起登上台湾（当时的台湾叫做夷洲），他们是中国历史上记载的最早登陆台湾的人。卫温和诸葛直花费了约一年时间行军，士兵们因为疾病死去了十分之八到十分之九，因为亶洲太过遥远，卫温和诸葛直最终没能到达那里，只带了几千名夷洲的人返回。黄龙三年（231年），孙权认为诸葛直违背诏令，劳财伤民，无功而返，和卫温一同入狱被处死。",
			xf_tangzi:"唐咨（生卒年不详），三国时魏利城（今江苏赣榆西）人。魏文帝黄初中利城郡反，推唐咨为主。后为魏军击破，遂亡至吴，官至左将军，封侯、持节。后助诸葛诞拒魏，兵败被俘。为安抚吴国军民，魏主拜唐咨为安远将军。",
			xf_huangquan:"黄权（？－240年），字公衡。巴西郡阆中县（今四川阆中）人。三国时期蜀汉、曹魏将领。<br>黄权年轻时为郡吏，后被益州牧刘璋召为主簿。曾劝谏刘璋不要迎接刘备，因而被外放为广汉县长。刘璋败，才降刘备，被拜为偏将军。建计取汉中，拜护军。刘备为汉中王，仍领益州牧，以黄权为治中从事。及刘备称帝，将伐吴，黄权劝谏而不纳。以其为镇北将军，督江北军以防魏师进攻。刘备伐吴败还，而归途隔绝，黄权不得归，无奈之下率部降魏。被魏文帝所赏识，拜镇南将军，封育阳侯，加侍中，使同车陪乘。后领益州刺史，进驻河南。景初三年（239年），迁车骑将军、仪同三司。正始元年（240年），黄权去世，谥号“景”。",
			xf_sufei:"苏飞（生卒年不详），东汉末年人物，原为东汉末年荆州牧刘表的部将，任江夏都督。<br>苏飞与甘宁交好，但是数次向黄祖推荐都失败。甘宁决定投效孙权时助其逃离。后来甘宁率吴军攻破江夏，苏飞兵败被俘。孙权打算将苏飞处斩，但是因为甘宁用性命担保而赦免了苏飞。降吴后官至军都督。",
			caoying:"曹婴是在电影《三国志之见龙卸甲》中登场的虚拟人物，由李美琪饰演。曹婴是曹操的孙女，弓马娴熟，文武双全，深得曹操的用兵之道及心术。于凤鸣山一战中担任魏军大都督阻止诸葛亮北伐并因罗平安的告密而全歼关兴、张苞、赵云率领的蜀军部队。",
			simahui:"司马徽（约145—208年），字德操，颍川阳翟（今河南禹州）人。东汉末年名士，精通道学、奇门、兵法、经学。有“水镜先生”之称。 司马徽为人清雅，学识广博，有知人之明，并向刘备推荐了诸葛亮、庞统等人，受到世人的敬重。",
			baosanniang:"鲍三娘是中国民间传说中的人物，事迹多见于《花关索传》。相传她是鲍家庄鲍员外的小女儿。后来与关索成亲，关羽自传授其武艺，因此也造就了鲍三娘的文武双全。荆州失守之后鲍三娘就跟随关索一同投奔蜀汉，并随诸葛亮征讨南蛮。平定了南蛮之后，夫妻二人就此一直替诸葛亮镇守着南中，他们也的确留下了许多脍炙人口的行侠仗义故事，在民间广为流传。",
			xurong:"徐荣（？－192年），玄菟人（一说为辽东襄平人，《公孙度传》中说公孙度本辽东襄平人，迁居玄菟，为同郡徐荣所举，任辽东太守。同郡当是同“玄菟”郡），东汉末年将领。本为中郎将，曾向董卓推举同郡出身的公孙度出任辽东太守。于汴水之战中击败曹操的独立追击军，以及在梁东之战中击败孙坚的部队。在董卓死后，受司徒王允的命令与李傕、郭汜交战，因部将胡珍投降，寡不敌众，于新丰之战被击败，战死在乱军之中。",
			zhangqiying:"张琪瑛（196年－217年），字不详（或琪瑛为字，名不详），祖籍沛国丰县（今江苏省丰县）。她的曾祖父张陵是西汉留侯张良的十一世孙、天师道（五斗米道）教祖，她的父亲是东汉末年割据汉中的军阀张鲁。张琪瑛继承家说，是五斗米教的传人。",
			pangdegong:"庞德公，字尚长，荆州襄阳人，东汉末年名士、隐士。 庞德公与当时徐庶、司马徽、诸葛亮、庞统等人交往密切。庞德公曾称诸葛亮为\"卧龙\"，庞统为\"凤雏\"，司马徽为\"水镜\"，被誉为知人。对诸葛亮、庞统等人早年影响较大，并得到诸葛亮的敬重。庞德公最后隐居于鹿门山，采药而终。",
			zhaotongzhaoguang:"赵统，赵云长子，生卒年不详。常山真定（今为河北正定）人，陈寿在正史《三国志》中记载赵云去世后，赵统袭爵永昌亭侯，官至蜀汉虎贲中郎督，加行领军。赵广（？—263年），三国时期蜀汉牙门将，赵云的次子，赵统之弟。随姜维前往沓中，官拜牙门将。曹魏司马氏派五路大军伐蜀时，随大将军姜维与魏兵战于疆川口，姜维败绩还守剑阁，赵广于沓中战死。",
			majun:"马钧，字德衡，扶风（今陕西扶风）人，生活在汉朝末期，是中国古代科技史上最负盛名的机械发明家之一。马钧年幼时家境贫寒，自己又有口吃的毛病，所以不擅言谈却精于巧思，后来在魏国担任给事中的官职。马钧最突出的表现有还原指南车；改进当时操作笨重的织绫机；发明一种由低处向高地引水的龙骨水车；制作出一种轮转式发石机，能连续发射石块，远至数百步；把木制原动轮装于木偶下面，叫做“水转百戏”。此后，马钧还改制了诸葛连弩，对科学发展和技术进步做出了贡献。",
			simazhao:"司马昭（211年—265年9月6日），字子上（小说《三国演义》为子尚），河内温县（今属河南）人。三国时期曹魏权臣，西晋王朝的奠基人之一。为晋宣帝司马懿与宣穆皇后张春华次子、晋景帝司马师之弟、晋武帝司马炎之父。 司马昭早年随父抗击蜀汉，多有战功。累官洛阳典农中郎将，封新城乡侯。正元二年（255年），继兄司马师为大将军，专揽国政。甘露五年（260年），魏帝曹髦被弑杀，司马昭立曹奂为帝。景元四年（263年），分兵遣钟会、邓艾、诸葛绪三路灭亡蜀汉，受封晋公。次年，进爵晋王。 咸熙二年（265年），司马昭病逝，年五十四，葬于崇阳陵。数月后，其子司马炎代魏称帝，建立晋朝，追尊司马昭为文帝，庙号太祖。",
			wangyuanji:"王元姬（217年—268年4月20日），东海郯县（今山东郯城西北）人。三国时期曹魏经学家王朗之孙女、王肃之女，晋文帝司马昭妻子，晋武帝司马炎与齐王司马攸的生母。 王元姬幼时便通《诗经》、《论语》，嫁司马昭后竭尽妇道、谦虚谨慎。其人颇有远见，曾预言钟会谋反之事。泰始元年（265年），司马炎建立西晋，尊王元姬为皇太后，宫号曰崇化宫。王元姬身处太后之位，提倡节俭，身体力行，作为众妃子的表率。在其治理之下，后宫井井有条，众人和睦相处。 泰始四年（268年），王元姬崩逝，终年五十二岁。谥号文明皇后，与司马昭合葬于崇阳陵。",
			
			liuye:'刘晔（？－234年），字子扬，淮南成德人，是光武帝刘秀之子阜陵王刘延的后代，三国时期魏国著名的战略家。刘晔年少知名，人称有佐世之才，是曹操手下举足轻重的谋士，他屡献妙计，对天下形势的发展往往一语中的。刘晔历仕数朝，是曹魏的三朝元老。',
			luzhi:'鲁芝（190年—273年），字世英。扶风郡郿县（今陕西眉县）人。魏晋时期名臣。官至光禄大夫，位特进，封阴平侯。泰始九年（273年）卒，时年八十四。谥号“贞”。',
			xizhicai:'戏志才（生卒年不详），或志才为字，名不详（一说名忠），东汉颍川郡（今河南禹州）人。经张邈推荐，成为曹操手下谋士。为人多谋略，曹操十分器重，不幸早卒。三国演义中并无此人，三国志中只有寥寥数语。由荀彧推荐给曹操，被称为有“负俗之讥”。死后，荀彧又举荐了郭嘉。<br>陈寿《三国志》记载：太祖与荀彧书曰：自志才亡后，莫可与计事者。汝、颍固多奇士，谁可以继之？彧荐嘉。',
			sunqian:'孙乾（？—约215年），字公祐。北海郡（治今山东昌乐西）人。东汉末年刘备的幕僚。最初被大儒郑玄推荐于州里。刘备领徐州，以孙乾为从事。自徐州跟随刘备，多次作为刘备的使臣。刘备定益州后，拜孙乾为秉忠将军，其待遇仅次于麋竺，与简雍相同。不久后便病逝。',
			beimihu:'卑弥呼（ひみこ，约159年-约249年，有的史书也写成“俾弥呼”）是日本弥生时代邪马台国（今日本本州近畿地区）的女王，在《三国志·魏书·倭人传》中有关于她的记载。关于她的真实身份一直众说纷纭，是个极具神秘色彩的古代女性统治者。亦是日本古代宗教鬼道教的发源者。',
			liuqi:'刘琦（？－209年）。兖州山阳郡高平县（今山东省济宁市微山县两城镇）人。荆州牧刘表的长子、谏议大夫刘琮兄。官至荆州刺史。建安十四年（209年）病逝。',
			miheng:'祢衡（173年－198年），字正平，平原郡（今山东德州临邑德平镇）人。个性恃才傲物．和孔融交好。孔融著有《荐祢衡表》，向曹操推荐祢衡，但是祢衡称病不肯去，曹操封他为鼓手，想要羞辱祢衡，却反而被祢衡裸身击鼓而羞辱。后来祢衡骂曹操，曹操就把他遣送给刘表，祢衡对刘表也很轻慢，刘表又把他送去给江夏太守黄祖，最后因为和黄祖言语冲突而被杀，时年二十六岁。黄祖对杀害祢衡一事感到十分后悔，便将其加以厚葬。',
			quyi:'麴义（又作曲义、鞠义），生卒年不详，是东汉末年军阀袁绍部下的将领，能征善战，屡建战功，早年在凉州，精通羌人战法，率领着袁绍的精锐部队。后来由于自恃功高而骄纵不轨，被袁绍所杀。',
			taoqian:'陶谦（132年－194年），字恭祖。丹阳郡（治今安徽宣城）人。汉末群雄之一。陶谦最初为诸生，在州郡任职，被举茂才，历任舒、卢二县令、幽州刺史、议郎，性格刚直，有大志。后随左车骑将军皇甫嵩对抗北宫伯玉，任扬武校尉，之后又随张温征韩遂、边章。中平五年（188年），徐州黄巾起，陶谦被朝廷任为徐州刺史，击破徐州黄巾，并推行屯田，恢复生产。尔后听从王朗、赵昱建议遣使进京朝贡，获拜安东将军、徐州牧，封溧阳侯。晚年因战事上为曹操大败，徐州大半几乎遭兵祸所害，以致过度忧劳而逝，终年六十三岁。',
			wangyun:'王允（137~192年），字子师，太原郡祁县（今山西祁县）人。东汉末年时期大臣。出身太原王氏，世代官宦。举孝廉出身，司徒高第征为侍御史。出任豫州刺史，勤政爱民。斗争中常侍张让失败后，去官隐居。中平六年，大将军何进掌权之后，辟为从事中郎，迁河南尹。董卓拥立汉献帝即位后，代替杨彪，拜太仆、尚书令、司徒，密谋刺死董卓，联合吕布共同执政，日益骄傲自满。初平三年（192年），董卓余党李傕、郭汜、樊稠等攻破长安。王允兵败处死，时年五十六岁。',
			bianfuren:'武宣皇后卞氏（159年12月30日－230年7月9日），琅邪开阳（今山东临沂）人，魏武帝曹操的正妻（继室），魏文帝曹丕、任城威王曹彰、陈思王曹植、萧怀王曹熊的母亲。原本是倡家，即汉代专门从事音乐歌舞的乐人家庭，后来与曹操成婚，建安初年，原配丁夫人被废，卞夫人成为曹操的正妻。曹丕继位后尊其为皇太后，曹叡继位后尊其为太皇太后。卞后在太和四年去世，与魏武帝曹操合葬高陵。',
			shamoke:'沙摩柯（？－222年），东汉末三国时期五溪蛮首领。汉章武元年（221年）初，为报关羽被东吴杀害之仇，刘备亲自领兵攻孙权，以金锦爵赏诱沙摩柯助战。章武二年（222年），吴大都督陆逊以火攻破刘备，率诸军齐击，汉军四十多个营寨被攻破，沙摩柯在大乱中匹马奔逃，被乱军杀死。',
			lvfan:'吕范（？－228年），字子衡。汝南郡细阳县（今安徽太和）人。汉末至三国时期吴国重臣。吕范年轻为汝南县吏，后避难寿春，结识孙策。此后随孙策、孙权征伐四方，对稳固孙氏在江东的统治做出了杰出的贡献，孙权将其比之于东汉开国元勋吴汉。吴国建立后，吕范累官至前将军、假节、扬州牧，封南昌侯。黄武七年（228年），吕范被拜为大司马，未得授官，便已病逝。孙权悲痛不已，遣使赠其大司马印绶。孙权还都建业后，以太牢礼祭祀吕范。',
			liqueguosi:"请分别参考武将【李傕】和【郭汜】各自的介绍。",
			cuimao:"关于【崔琰】的内容，请查看武将【崔琰】的介绍。<br>毛玠（？—216年），字孝先，陈留平丘（今河南封丘）人。东汉末年大臣。年少时为县吏，以清廉公正著称。因战乱而打算到荆州避乱，但中途知道刘表政令不严明，因而改往鲁阳。后来投靠曹操，提出“奉天子以令不臣，脩耕植，畜军资”的战略规划，得到曹操的欣赏。<br>毛玠与崔琰主持选举，所举用的都是清廉正直之士。而毛玠为人廉洁，激起天下廉洁之风，一改朝中奢华风气。曹操大为赞赏，曹丕也亲自去拜访他。<br>曹操获封魏公后，毛玠改任尚书仆射，再典选举。又密谏曹操应该立嫡长子曹丕为魏国太子。崔琰被杀后，毛玠十分不快。后来有人诬告毛玠，曹操大怒，将毛玠收于狱中。及后在桓阶、和洽营救下，只被免职，不久逝世于家中。曹操在他死后赐他棺材和钱帛。",
			
			huangfusong:'字义真。安定郡朝那县（今宁夏彭阳）人。于黄巾起义时，以中郎将身份讨伐黄巾，用火攻大破张梁、张宝。后接替董卓进攻张梁，连胜七阵。掘张角墓，拜左车骑将军、冀州牧，因拒绝贿赂宦官而被免职。 董卓死，王允命其与吕布等共至郿坞抄籍董卓家产、人口，皇甫嵩将坞中所藏良家子女，尽行释放。',
			zangba:'其父臧戒，有二子臧艾与臧舜。年少时曾召集数人将获罪的父亲救出，此后四处流亡。后来成为陶谦麾下的骑都尉，负责募兵抵抗黄巾军。与孙观、尹礼等人拥兵驻屯于开阳，自成一股独立势力，后跟随吕布。吕布战败后，投降了曹操。后与袁绍、孙权等的战役里战功赫赫，官至镇东将军。',
			zhangren:'刘璋的属下，以忠勇著称。刘备入蜀时，张任曾劝刘璋提防刘备，但刘璋没有听从。魏延舞剑想趁机除掉刘璋时，张任出面对舞，解救刘璋。后在刘备进攻时于落凤坡射死了庞统。',
			jiling:'东汉末年袁术帐下将领，勇猛非常，曾奉命率军攻打小沛的刘备，在吕布辕门射戟的调停下撤兵。',
			zoushi:'军阀张济之妻，张绣之婶。张绣降曹后，邹氏遂被曹操霸占。贾诩献计趁机诛杀曹操，险些得手。曹操在损失爱将典韦、侄子曹安民和长子曹昂后方才逃出生天。',
			ganfuren:'刘备起兵后，于沛城娶甘氏为妾。后来，甘夫人随刘备到荆州，生了阿斗(也就是后主刘禅)。223年四月，刘备病死于白帝城，追谥甘夫人为“昭烈皇后”。',
			jiangfei:'蒋琬，蜀四英之一。初随刘备入蜀，诸葛亮卒后封大将军，辅佐刘禅，主持朝政，统兵御魏。采取闭关息民政策，国力大增。官至大司马，安阳亭侯，谥号恭侯。费祎，蜀国著名政治家和武将，官至大将军。在一次回途的筵会中，被降将郭修刺杀而亡，谥号敬侯。',
			mifuren:'刘备夫人。徐州别驾糜竺之妹。长坂兵败，她怀抱年仅两岁的刘禅在乱军中走散，被赵云发现；但麋夫人因为赵云只有一匹马，不肯上马，在将阿斗托付给赵云后投井而亡。',
			chendong:'陈武，东吴将领，孙策攻打刘繇，陈武前来相助，孙策非常喜爱陈武，拜为校尉，使作先锋。陈武以十数骑兵力杀敌五十余人。后于赤壁等战役屡立功勋。董袭献上严白虎的人头来降孙策。赤壁之战，董袭受周瑜命，分兵去汉阳，合肥会战时接应太史慈，逍遥津支援孙权。濡须口之战时，董袭在船上督战，船覆董袭坚守殉职。',
			jiangqing:'擅长弓术。与周泰原为活跃于长江一带的江贼，孙策脱离袁术下江东自立门户时，和周泰一起率众投靠。 孙策攻刘繇，并引出城中麾下的陈横、薛礼、张英三名将领，陈横后被蒋钦一箭射杀，后与韩当等将乘舟过江，乱箭射杀敌军。曾在赤壁之战与周泰，还有擅使长枪的韩当率领水军在三江口踏江破敌。',
			kongrong:'字文举，鲁国人，东汉文学家，“建安七子”之首。献帝即位后任北军中侯、虎贲中郎将、北海相，时称孔北海后因触怒曹操，为曹操所杀。能诗善文。',
			mateng:'字寿成，扶风茂陵人，东汉末年征西将军，割据西凉一带的军阀，伏波将军马援的后代，官至卫尉，封爵槐里乡侯。因其子马超谋反，而被杀，夷灭三族。',
			tianfeng:'字元皓。东汉末年大军阀袁绍部下重要谋士。为人刚直不阿，曾多次向袁绍进言而不被采纳。后因谏阻袁绍征伐曹操而被袁绍下令监禁，并于官渡之战后，被袁绍杀害。',
			caochun:'字子和，沛国谯（今安徽亳州）人。东汉末年曹操麾下将领，曹仁之弟。曹纯是曹操部下精锐部队“虎豹骑”的统领者之一，因在平定北方的战役中颇有功绩，被加封为高陵亭侯。死后谥曰威侯。曹纯擅战，甚得人心，为人重纲纪，不失理智，好学问，敬爱学士，闻名天下。',
			hanba:'中国古代神话传说中引起旱灾的怪物。《诗·大雅·云汉》：“旱魃为虐，如惔如焚。”',
			cuiyan:'字季珪，清河东武城（今河北省清河县）人。东汉末年名士，司空崔林的从兄，曹操帐下谋士。崔琰相貌俊美，很有威望，曹操对他也很敬畏。建安二十一年（216年），崔琰在给杨训的书信中写道“时乎时乎，会当有变时”，曹操认为此句有不逊之意，因而将崔琰下狱，不久崔琰即被曹操赐死。',
			lifeng:'南阳（治今河南南阳）人，三国时期蜀汉大臣李严之子。230年，李严迁为骠骑将军，率军前往汉中，诸葛亮上表推举李丰为江州都督督军，以代替李严管理后方事务。李严去世后，李丰在蜀汉官至朱提太守。',
			sunru:'孙茹，孙坚之妹，其名载于《江浙通志》中。儿子徐琨亦为孙吴早期名将，当初母子二人随军跟从孙策渡长江时，因为暂时没足够的船，孙策感到苦恼打算暂时驻军江边。孙茹夫人献计以芦苇为筏，孙策大喜。吴军遂以神不知鬼不觉的速度过长江击破刘繇部将张英，立下平江东第一功。',
			lingcao:'东汉末年将领，吴郡余杭（今浙江余杭）人，凌统之父。早年跟随孙策转战江东。孙权统军后，凌操随其征伐黄祖，被甘宁射杀。《吴书》载：甘宁以善射，将兵在后，射杀校尉凌操',
			zhugeguo:'诸葛果，为《历代神仙通鉴》中诸葛亮女儿的名字，《历代神仙通鉴》记录从上古到明代的神仙历史，因此诸葛果不见于任何史书。成都西南有朝真观，即乘烟观。相传，诸葛果在这里修行后成仙升天。',
			zhuling:'朱灵（生卒年不详），字文博，冀州清河国人，三国时期曹魏名将。官至后将军，封为高唐侯，谥号威侯。初为袁绍部将，后归顺曹操，随曹操征伐四方，屡建战功。',
			liuzan:'字正明，会稽长山人人，曾任左护军，有两子：留略、留平。少为会稽郡吏，曾参与镇压黄巾起义，后被东吴大将凌统所引用，任屯骑校尉。吴五凤二年（公元255年）留赞任左护军，随孙峻征淮南，因病撤军，被魏将蒋班围困于道，力战而死，时年73岁。',
			re_yuanshu:'字公路，汝南汝阳人，袁绍之弟。初为虎贲中郎将。董卓进京后以袁术为后将军，袁术因畏祸而出奔南阳。初平元年与袁绍、曹操等同时起兵，共讨董卓。后与袁绍对立，被袁绍、曹操击败，率馀众奔九江，割据扬州。建安二年称帝，建号仲氏。',
			fuwan:'伏完（?－209），琅邪东武（今属山东）人，东汉末大臣，汉献帝伏皇后之父。历官辅国将军、中散大夫、屯骑校尉。',
			liuxie:'字伯和，又字合。汉族，祖籍沛县，生于洛阳。汉灵帝第三子，被董卓迎立为帝。董卓被王允和吕布诛杀后，董卓部将李傕等攻入长安，再次挟持了他，后来逃出长安。公元196年，曹操控制了刘协，并迁都许昌，“挟天子以令诸侯”。公元220年，曹操病死，刘协被曹丕控制，随后被迫禅让于曹丕。',
			yuanshu:'字公路，汝南汝阳人，袁绍之弟。初为虎贲中郎将。董卓进京后以袁术为后将军，袁术因畏祸而出奔南阳。初平元年与袁绍、曹操等同时起兵，共讨董卓。后与袁绍对立，被袁绍、曹操击败，率馀众奔九江，割据扬州。建安二年称帝，建号仲氏。',
			gongsunzan:'字伯珪，汉族，号“白马义从”。辽西令支人。东汉末年献帝年间占据幽州一带的军阀，汉末群雄之一。出身贵族，因母地位卑贱，只当了郡中小吏。他貌美，声音洪亮，机智善辩。后随卢植于缑氏山中读书，粗通经传。',
			caohong:'字子廉，沛国谯（今安徽亳县）人，曹操从弟，曾献马并救护曹操。后多随军征伐，平兖州、征刘表、讨祝臂。曹丕即位时封曹洪为骠骑将军。曹叡即位，拜曹洪为后将军，更封乐城侯，后复拜为骠骑将军。曹洪逝世，追谥曰恭侯。',
			guanyinping:'河东解县（今山西运城）人，美髯公关羽之女。因在关羽的四个子女中排行第三，故又被称作“关三小姐”、“关氏三姐”或“关羽三小姐”。传说她是赵云的弟子、并随同诸葛亮平定南蛮。',
			xiahouba:'夏侯渊次子。本为曹魏武将，后因司马懿诛曹爽一族，夏侯霸身为曹氏宗室而心怀不安，遂投降蜀汉。后随蜀将姜维北伐，官至车骑将军。',
			daxiaoqiao:'大乔，庐江皖县人，为乔公长女，孙策之妻，容貌国色流离。小乔为大乔之妹，周瑜之妻，资貌绝伦。两人合称“二乔”。',
			yuejin:'字文谦，魏“五子良将”之一。容貌短小，以胆烈跟从曹操，南征北讨，战功无数。从击袁绍于官渡，奋勇力战，斩袁绍部将淳于琼。又从击袁绍子谭、尚于黎阳，斩其大将严敬。从平荆州，留屯襄阳，进击关羽、苏非等人，击退其众，南郡诸郡的山谷蛮夷都前往乐进处投降。后来从曹操征孙权，假进节。曹操回师后，留乐进与张辽、李典屯于合肥。又以乐进数有军功，迁右将军。建安二十三年逝世，谥曰威侯。',
			caoang:'字子修，曹操的长子，由于性情谦和且聪慧所以深得曹操喜爱。曹操征讨张绣时，羞辱张绣之婶邹氏，被张绣突然袭击。曹昂为保护曹操撤退，与典韦一起战死在宛城。',
			zhugejin:'字子瑜，吴国大臣，诸葛亮之兄，诸葛恪之父。经鲁肃推荐，为东吴效力。胸怀宽广，温厚诚信，得到孙权的深深信赖，努力缓和蜀汉与东吴的关系。建安二十五年（220年）吕蒙病逝，诸葛瑾代吕蒙领南郡太守，驻守公安。孙权称帝后，诸葛瑾官至大将军，领豫州牧。',
			zhangxingcai:'蜀名将张飞与夏侯氏所生之女，刘禅的妻子，史上称为“敬哀皇后”。',
			zumao:'字大荣，吴郡富春人，使用双刀。孙坚在汜水关被华雄击败，祖茂为保护主公而主动提出与孙坚交换头盔，孙坚因此得脱。祖茂将孙坚的赤帻挂在柱子上，准备以此引诱华雄，趁机偷袭，却反被华雄所杀。',
			dingfeng:'吴国将领。年少时以骁勇为小将，经常奋勇杀敌，屡立功勋，此后又于东兴之战中“雪中奋短兵”，大破侵犯东吴的魏军。吴景帝孙休在位时，丁奉设计除掉了东吴的权臣孙綝，被拜为大将军，后为右大司马、左军师。',
			panfeng:'冀州牧韩馥部下的上将。当十八路诸侯讨伐董卓之时，他奉韩馥之命前往汜水关前挑战董卓部下大将华雄，不敌被斩。',
			maliang:'字季常，因眉毛中有白毛，人称白眉马良，马谡的兄长。马良在兄弟五人中名声最佳，因此有“马氏五常，白眉最良”的说法。',
			zhugedan:'字公休，曹魏后期的重要将领，诸葛亮的族弟。曾与司马师一同平定毌丘俭、文钦的叛乱。之后因与被诛的夏侯玄、邓飏交厚，且见到王淩、毌丘俭等人的覆灭而心不自安，于甘露二年起兵，并得到东吴的支援，但于次年被镇压，被大将军司马胡奋所斩。',
			hetaihou:'大将军何进的妹妹，汉灵帝刘宏第二任皇后，汉少帝刘辩的生母。何氏出身于屠户家庭，后选入掖庭，得到汉灵帝临幸，生下皇子刘辩，并受封贵人。光和三年（180年），立为皇后。中平六年（189年），汉灵帝去世，刘辩继位，尊何氏为皇太后。董卓进京，废黜刘辩，不久毒杀刘辩及何氏。',
			sunluyu:'又名小虎，孙权与步练师之女。吴后期，孙鲁班诬陷孙鲁育参与谋反，于是孙峻杀害了孙鲁育。',
			wenpin:'本为刘表大将，刘表死后，跟随刘琮投降曹操。后曹操令其镇守江夏，多次阻止了关羽和孙权的进攻，为曹操倚为屏障的大将之一。',
			zhanglu:'汉宁太守，继父祖之后传播五斗米教。刘璋杀张鲁之母，二人因此结仇，多次交战。刘备攻益州时，刘璋向张鲁求援。张鲁派马超前往，但马超投降刘备。张鲁后见曹操自封魏王，想要自立为汉宁王，为谋士阎圃劝免。后曹操讨汉中，张鲁败，众人劝其烧粮仓，张鲁认为这是国家之物，未听从，为曹操所称赞。后投降曹操，任镇南将军。',
			mayunlu:'马腾之女，马超之妹，赵云之妻。父亲令其自幼习武，枪术非凡，寻常男子也是难以匹敌。',
			tadun:'东汉末年辽西乌桓（亦称乌丸）的首领，乌桓大人丘力居的从子，总摄三王部。曾出兵协助袁绍，击破公孙瓒。此后受袁绍假传朝廷诏命，与三王难楼、苏仆延、乌延等人同受单于称号及印绶。后难楼、苏仆延率其部众奉立楼班为单于，蹋顿于是退位为王。袁绍死后，收到被曹操击败的袁尚的求助，纠集逃亡至乌桓的幽州、冀州官吏百姓，企图夺回河北。东汉建安十二年，曹操亲征乌桓。八月，乌桓、袁氏部队于柳城白狼山为曹军所败，蹋顿在此战中被曹操的先锋张辽所斩杀。	',
			yanbaihu:'吴郡乌程县人，原名“严虎”，别号“白虎”，东汉末年盘据吴郡一带山贼出身的地方豪帅。献帝初拥兵万人自固。孙策受袁术使渡江，攻破白虎等。白虎奔余杭，投靠许昭。建安二年，再度被孙策击败，至此不知亡佚何处。',
			simalang:'字伯达，“司马八达”之一。曹操任司空后，司马朗被辟为司空属官，又历任成皋令、堂阳长、元城令、丞相主簿、兖州刺史等职，所在皆有政绩，深受百姓爱戴。后司马朗与夏侯惇、臧霸等征讨吴国，到达居巢。军队中流行瘟疫，司马朗亲自去视察，派送医药，因此染病去世。',
			wangji:'字伯舆，东莱曲城人。三国时期魏国将领。王基文武兼备，才高于世，德溥于时，深得司马懿、司马师、司马昭的器重，尤其在南征毋丘俭，文钦之乱，东征诸葛诞之叛大规模军事活动中，王基与司马师、司马昭结下了深厚的军友情谊。魏景元二年王基去世，追赠司空，谥号为景侯。',
			buzhi:'吴重臣，最初避难江东，于孙权统事后，被召为主记。后游历吴地，又任海盐县长，还任东曹掾，出领鄱阳太守。建安十五年，转交州刺史、立武中郎将，率军接管往交州，追拜使持节、征南中郎将。次年，以平定交州功，加平戎将军，封广信侯。后迁右将军、左护军，改封临湘侯。孙权称帝后，拜骠骑将军，领冀州牧，后因冀州分与蜀汉而解牧职。又都督西陵。赤乌九年，代陆逊为丞相。',
			litong:'字文达，小字万亿。江夏平春（今河南信阳）人，汝南太守。早年以游侠闻名于江汝，在率众补充曹操兵源有功拜为阳安都尉，其间不因私而忘公，不因其妻子的求请而过问执法者。后来在曹操讨伐马超时出阵挑战，死于马超枪下。',
			mizhu:'原为徐州富商，后被徐州牧陶谦辟为别驾从事。陶谦病死后，奉其遗命迎接刘备。与其弟麋芳拒绝曹操的任命而跟随刘备，在刘备最潦倒之时给予刘备很大的帮助，使他重新振作。214年（建安十九年），刘备入主益州后，拜麋竺为安汉将军，地位在诸葛亮之上，为刘备手下众臣之最。吕蒙袭取荆州，麋芳举城投降，导致关羽兵败身亡，麋竺面缚请罪，刘备劝慰麋竺，对他待遇如初。',
			dongbai:'东汉末年县君，陇西临洮（今甘肃省岷县）人，董卓之孙女。董卓当权时，遍封其宗族，其中孙女董白尚未及笄，被封为渭阳君。',
			zhaoxiang:'赵云与马云騄之女，赵统赵广之妹，关平之妻。',
			heqi:'早年在平定山越的战争中立有大功，又讨平叛乱无数，身经百战，所向披靡，深受孙权器重。后来在与魏国的多次边境争斗中也屡立战功，官至后将军，并领徐州牧。',
			dongyun:'大汉重臣，掌军中郎将董和之子。东汉末年，其父董和事刘璋为益州太守，刘备立太子时，允被选为洗马，后为黄门侍郎，延熙六年（公元243年）加辅国将军，延熙七年（公元244年）以侍中守尚书令，任大将军费祎的副手。',
			mazhong:'本名狐笃，字德信，巴西阆中人，初次出场时随丞相诸葛亮南征孟获，诸葛亮遣马忠与赵云两路夹攻，大败蛮将阿会喃。孟获派弟孟优赴汉军处假投降，欲内应外合，诸葛亮将计就计，埋伏擒获孟获和诸洞酋长，马忠亦于此战立下战功。后诸葛亮北伐时亦数次出阵，立下汗马功劳。',
			kanze:'孙权谋士，在孙权广纳贤才之时与严畯等来到江东，甚为孙权礼遇。第一个识破周瑜打黄盖是苦肉计，后欣然向曹操献诈降书，被曹操识破后面不改色，哈哈大笑，一番妙言让曹操相信了诈降书，是苦肉计中的关键人物。后劝孙权不要设局请关羽。在刘备御驾亲征东吴时，向孙权举荐陆逊为都督，间接上挽救了东吴的命运。',
			lingju:'相传为吕布与貂蝉的女儿，被汉献帝掳走并训练为死士，被秘密送入宫中接近曹操，成为其“忘年红颜知己”。外表是柔弱的女子，实际上身怀致命的杀人绝技，等待时机给予曹操致命一击。',
			yangxiu:'字德祖，今陕西华阴人，是东汉末年的文学家。杨修学问渊博，极聪慧，任丞相府主簿。史载，“是时，军国多事，修总知外内，事皆称意”。',
			chenlin:'陈琳（？－217年），字孔璋，广陵射阳（今江苏宝应）人。东汉末年著名文学家，“建安七子”之一。',
			zhugeke:'字元逊，琅邪阳都（今山东沂南）人。三国时期吴臣，蜀丞相诸葛亮之侄，吴大将军诸葛瑾长子，从小就以神童著称，深受孙权赏识。',
			zhangbao:'东汉末年黄巾起义的首领之一，张角之弟，张梁之兄。中平元年（184）随兄张角起义，号称“地公将军”。',
			chengyu:'字仲德，本名程立，因梦中於泰山捧日，更名程昱。荀彧投曹操时向其举荐程昱。他参与了攻打吕布、袁绍、刘备、孙权的大部份战事，一直出谋献策，表现出众。',
			sunhao:'孙权之孙，孙和之子，东吴的末代君主。在位初期虽施行过明政，但不久即沉溺酒色，专于杀戮，变得昏庸暴虐，嗜用挖眼、剥皮等酷刑。280年，吴国被西晋所灭，孙皓投降西晋，被封为归命侯。',
			wutugu:'南蛮乌戈国主，身长丈二（约合现在2.77米），不食五谷，以生蛇恶兽为饭。身有鳞甲，刀箭不能侵。兀突骨乘骑巨象，头戴日月狼须帽，身披金珠缨络，两肋下露出生鳞甲，眼目中微有光芒。',
			shixie:'割据交州（今越南）一带的军阀，年少时师事刘陶，经逐渐升迁任交趾太守。后被朝廷加职绥南中郎将，迁安远将军，封龙度亭侯。在步骘接管交州时积极配合，归附孙权，被孙权加为左将军；此后又因诱降益州豪族雍闿而迁任卫将军，进封龙编侯。任交趾太守四十年。',
			guansuo:'关羽的三子。自荆州失陷后，逃难在鲍家庄养病，伤势痊愈之后入蜀，逢丞相诸葛亮南征，拜之为前部先锋，一同南征。',
			wanglang:'字景兴，汉末三国经学家，曹魏初期重臣。曾任会稽太守举兵抵抗孙策，后为曹操所征，被拜为谏议大夫等职。曹丕建立魏国后任命为司空。小说《三国演义》中他在阵前与诸葛亮饶舌比拼，最终被诸葛亮言词所驳倒，一时气愤坠马身亡。',
			zhangliang:'东汉末年黄巾起义首领之一，张角的三弟。中平元年（184）随兄起义，号称“人公将军”。遭到朝廷所派左中郎将皇甫嵩进攻时，他率军在广宗（今河北威县）进行反击。后因警戒疏忽，遭到汉军夜袭，兵败身亡。',
		},
		characterTitle:{
			//"baosanniang":"Sukincen",	
			//'zhaotongzhaoguang':"Sukincen"			
		},
		perfectPair:{
			yuejin:['re_lidian'],
			zhugejin:['zhugeke'],
			guanyinping:['guanyu'],
			zhangxingcai:['liushan'],
			fuwan:['fuhuanghou'],
			sunshangxiang:['liubei'],
			caoang:['caocao'],
			zhangbao:['zhangliang','zhangjiao'],
			zhangliang:['zhangjiao'],
			maliang:['masu'],
			lingcao:['lingtong'],
			lingju:['diaochan','lvbu'],
			jiangqing:['zhoutai'],
			dingfeng:['xusheng'],
			caohong:['caoren'],
			daxiaoqiao:['zhouyu','sunce'],
			cuiyan:['caocao'],
			guansuo:['guanyu'],
			mateng:['machao','madai','mayunlu'],
			chengpu:['zhouyu'],
			hanba:['swd_muyun'],
			dongbai:['dongzhuo'],
			cuimao:['caopi'],
		},
		card:{
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
			wy_meirenji:{
				fullskin:true,
				vanish:true,
				derivation:'wangyun',
				type:'trick',
				enable:true,
				filterTarget:function(card,player,target){
					return target.countCards('h')&&target!=player&&target.sex=='male';
				},
				content:function(){
					'step 0'
					event.list=game.filterPlayer(function(current){
						return current!=player&&current!=target&&current.sex=='female';
					}).sortBySeat();
					'step 1'
					if(target.countCards('h')&&event.list.length){
						event.current=event.list.shift();
						event.current.gainPlayerCard(target,true);
						target.line2([event.current,player]);
					}
					else{
						event.goto(4);
					}
					'step 2'
					event.current.chooseCard('h',true,'将一张手牌交给'+get.translation(player));
					'step 3'
					if(result.bool){
						event.current.give(result.cards,player);
					}
					event.goto(1);
					'step 4'
					var n1=target.countCards('h');
					var n2=player.countCards('h');
					if(n1>n2){
						target.damage(player);
						player.line(target);
					}
					else if(n1<n2){
						player.damage(target);
						target.line(player);
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var num=game.countPlayer(function(current){
								return current!=player&&current!=target&&current.sex=='female';
							});
							var nh=target.countCards('h');
							num=Math.min(num,nh);
							var nh1=nh-num;
							var nh2=player.countCards('h')-1+num;
							if(nh1==nh2&&num==0) return 0;
							if(nh2<=nh1) return -3;
							if(player.hp==1||num==1) return 0;
							return -1;
						}
					}
				}
			},
			wy_xiaolicangdao:{
				fullskin:true,
				vanish:true,
				derivation:'wangyun',
				type:'trick',
				enable:true,
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					'step 0'
					var num=Math.min(5,target.maxHp-target.hp);
					if(num) target.draw(num);
					'step 1'
					target.damage();
				},
				ai:{
					order:6,
					tag:{
						damage:1
					},
					result:{
						target:function(player,target){
							var num=Math.min(5,target.maxHp-target.hp);
							if(target.hp==1){
								if(num>=3) return 0;
								if(!target.hasSkillTag('maixie_hp')){
									return -3;
								}
								return -1;
							}
							if(num==2) return 0;
							return -2+num+(Math.pow(target.hp,0.2)-1);
						}
					}
				}
			},
			"wolong_card":{
				type:"takaramono",
				fullskin:true,
				derivation:"pangdegong",
			},
			"fengchu_card":{
				type:"takaramono",
				fullskin:true,
				derivation:"pangdegong",
			},
			"xuanjian_card":{
				fullskin:true,
				type:"takaramono",
				derivation:"pangdegong",
			},
			"shuijing_card":{
				fullskin:true,
				type:"takaramono",
				derivation:"pangdegong",
			},
			"rewrite_bagua":{
				derivation:"majun",
				cardimage:"bagua",
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
				cardimage:"baiyin",
				type:"equip",
				subtype:"equip2",
				filterLose:function(card,player){
					if(player.hasSkillTag('unequip2')) return false;
					return true;
				},
				onLose:function (){
					player.recover();
					player.draw(2);
				},
				skills:["rw_baiyin_skill"],
				tag:{
					recover:1,
				},
				ai:{
					order:9.5,
					equipValue:function (card,player){
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
				cardimage:"lanyinjia",
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
				cardimage:"renwang",
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
				cardimage:"tengjia",
				fullskin:true,
				type:"equip",
				subtype:"equip2",
				cardnature:"fire",
				ai:{
					equipValue:function (card,player){
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
				cardimage:"zhuge",
				distance:{
					attackFrom:-2,
				},
				fullskin:true,
				type:"equip",
				subtype:"equip1",
				ai:{
					equipValue:function (card,player){
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
				skills:["zhuge_skill"],
			},
		},
		skill:{
			//新1v1
			yanhuo:{
				audio:2,
				trigger:{player:'die'},
				forceDie:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				direct:true,
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yanhuo'),function(card,player,target){
						return target!=player&&target.countDiscardableCards(player,'he')>0
					}).set('forceDie',true).ai=function(target){
						return -target.countCards('he')*get.attitude(player,target);
					};
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('yanhuo',target);
						event.count=player.countCards('he');
					}
					else event.finish()
					'step 2'
					if(target.countDiscardableCards(player,'he')){
						player.line(target);
						player.discardPlayerCard(target,'he',true).set('forceDie',true);
						event.count--;
						if(event.count) event.redo();
					}
				},
			},
			mouzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				content:function(){
					'step 0'
					target.chooseCard('he','交给'+get.translation(player)+'一张牌',true);
					'step 1'
					player.gain(result.cards,target,'giveAuto');
					'step 2'
					if(player.countCards('h')<=target.countCards('h')){
						event.finish();
						return;
					}
					var list=[];
					if(target.canUse('sha',player,false)) list.push('sha');
					if(target.canUse('juedou',player,false)) list.push('juedou');
					if(!list.length) event.finish();
					else if(list.length==1) event._result={control:list[0]};
					else target.chooseControl(list).set('prompt','对'+get.translation(player)+'使用一张【杀】或【决斗】。');
					'step 3'
					target.useCard({name:result.control},player);
				},
			},
			niluan:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					return event.player!=player&&(event.player.hp>player.hp||event.player.countUsed('sha'))
				},
				direct:true,
				content:function(){
					var next=player.chooseToUse();
					next.logSkill='niluan';
					next.set('openskilldialog',get.prompt2('niluan'));
					next.set('norestore',true);
					next.set('_backupevent','niluanx');
					next.backup('niluanx');
				},
			},
			niluanx:{
				viewAs:{name:'sha'},
				filterCard:{color:'black'},
				position:'he',
				check:function(card){return 5-get.value(card)},
			},
			cuorui:{
				audio:2,
				trigger:{global:'gameDrawAfter'},
				forced:true,
				filter:function(event,player){
					return player.maxHp>0&&!get.is.single();
				},
				content:function(){
					player.draw(Math.min(5,player.maxHp),false);
				},
				group:'cuorui_nojudge',
				subSkill:{
					nojudge:{
						trigger:{
							player:'phaseJudgeBefore',
						},
						forced:true,
						audio:'cuorui',
						filter:function(event,player){
							return !player.storage.cuorui&&(get.is.single()||player.countCards('j'));
						},
						content:function(){
							player.storage.cuorui=true;
							trigger.cancel();
							game.log(player,'跳过了','#g判定阶段');
						},
					},
				},
			},
			liewei:{
				audio:2,
				trigger:{source:'dieAfter'},
				frequent:true,
				content:function(){
					player.draw(3);
				},
			},
			//管辂和葛玄
			gxlianhua:{
				audio:2,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]={
						red:0,black:0,
					}
				},
				marktext:'丹',
				intro:{
					name:'丹血',
					markcount:function(storage){
						return storage.red+storage.black;
					},
					content:function(storage){
						return '共有'+(storage.red+storage.black)+'个标记';
					},
				},
				trigger:{global:'damage'},
				forced:true,
				filter:function(event,player){
					return event.player!=player&&_status.currentPhase!=player;
				},
				content:function(){
					player.storage.gxlianhua[player.getFriends().contains(trigger.player)?'red':'black']++;
					player.markSkill('gxlianhua');
				},
				group:'gxlianhua_harmonia',
				subSkill:{
					harmonia:{
						forced:true,
						audio:'gxlianhua',
						sub:true,
						trigger:{player:'phaseBegin'},
						//filter:function(event,player){
						//	return player.storage.gxlianhua&&player.storage.gxlianhua.red+player.storage.gxlianhua.black>0;
						//},
						forced:true,
						content:function(){
							var cards=[];
							var cards2=[];
							var skill='';
							var red=player.storage.gxlianhua.red;
							var black=player.storage.gxlianhua.black;
							player.storage.gxlianhua={red:0,black:0};
							player.unmarkSkill('gxlianhua');
							if(red+black<4){
								cards=['tao'];
								skill='reyingzi';
							}
							else if(red>black){
								cards=['wuzhong'];
								skill='reguanxing';
							}
							else if(red<black){
								cards=['shunshou'];
								skill='zhiyan';
							}
							else{
								cards=['sha','juedou'];
								skill='gongxin';
							}
							for(var i=0;i<cards.length;i++){
								var card=get.cardPile2(function(shiona){
									return shiona.name==cards[i];
								});
								if(card) cards2.push(card);
							}
							player.addTempSkill(skill);
							if(cards2.length) player.gain(cards2,'gain2','log');
						},
					},
				},
			},
			zhafu:{
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'wood',
				filterTarget:lib.filter.notMe,
				content:function(){
					player.awakenSkill('zhafu');
					target.addSkill('zhafu_hf');
					target.storage.zhafu_hf=player;
				},
				subSkill:{
					hf:{
						trigger:{
							player:'phaseDiscardBegin'
						},
						forced:true,
						popup:false,
						charlotte:true,
						onremove:true,
						content:function(){
							'step 0'
							if(player.countCards('h')<=1||player.storage.zhafu_hf.isDead()) event.goto(3);
							'step 1'
							player.storage.zhafu_hf.logSkill('zhafu_hf',player);
							player.chooseCard('h',true,'选择保留一张手牌，将其余的手牌交给'+get.translation(player.storage.zhafu_hf)).ai=get.value;
							'step 2'
							var cards=player.getCards('h');
							cards.remove(result.cards[0]);
							player.storage.zhafu_hf.gain(cards,player,'giveAuto');
							'step 3'
							player.removeSkill('zhafu_hf');
						},
					},
				},
			},
			
			tuiyan:{
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				content:function(){
					'step 0'
					var cards=get.cards(2);
					event.cards=cards;
					game.log(player,'观看了牌堆顶的'+get.cnNumber(cards.length)+'张牌');
					player.chooseControl('ok').set('dialog',['卜卦',cards]);
					'step 1'
					while(cards.length){
						ui.cardPile.insertBefore(cards.pop(),ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
				},
			},
			busuan:{
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<lib.inpile.length;i++){
						var name=lib.inpile[i];
						var type=get.type(name,'trick');
						if(['basic','trick'].contains(type)) list.push([type,'',name]);
					}
					player.chooseButton(['选择至多两种牌',[list,'vcard']],true,[1,2]).set('ai',function(button){
						var target=_status.event.getParent('busuan').target;
						return get.attitude(_status.event.player,target)*get.useful({name:button.link[2]})+0.1;
					});
					'step 1'
					target.storage.busuan_angelbeats=result.links.slice(0);
					target.addSkill('busuan_angelbeats');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var att=get.attitude(player,target);
							if(att>0) return 1
							return -5/(target.countCards('h')+1);
						},
					},
				},
			},
			busuan_angelbeats:{
				mark:true,
				intro:{
					mark:function(dialog,content,player){
						if(content&&content.length) dialog.add([content,'vcard']);
					},
				},
				trigger:{player:'drawBefore'},
				forced:true,
				filter:function(event,player){
					return event.getParent().name=='phaseDraw';
				},
				onremove:true,
				content:function(){
					'step 0'
					var list=player.storage['busuan_angelbeats'];
					var cards=[];
					for(var i=0;i<Math.min(trigger.num,list.length);i++){
						var card=get.cardPile(function(cardx){
							return !cards.contains(cardx)&&cardx.name==list[Math.min(i,list.length-1)][2];
						});
						if(card){
							player.storage.busuan_angelbeats.splice(i--,1);
							trigger.num--;
							cards.push(card);
						}
					}
					if(cards.length){
						player.gain(cards,'gain2','log');
					}
					'step 1'
					if(!trigger.num) trigger.cancel();
					if(!player.storage.busuan_angelbeats.length) player.removeSkill('busuan_angelbeats');
				},
			},
			mingjie:{
				trigger:{player:'phaseEnd'},
				check:function(){
					return ui.cardPile.hasChildNodes()&&get.color(ui.cardPile.firstChild)!='black';
				},
				content:function(){
					'step 0'
					event.count=0;
					'step 1'
					player.draw('visible');
					event.count++;
					'step 2'
					if(Array.isArray(result)){
						if(get.color(result[0])=='black'){
							player.loseHp();
							event.finish();
						}
						else if(event.count<3) player.chooseBool('是否继续发动【命戒】？').ai=lib.skill.mingjie.check;
					}
					else event.finish();
					'step 3'
					if(result.bool) event.goto(1);
				},
			},
			//文鸯
			xinlvli:{
				audio:'lvli',
				trigger:{player:'damageEnd',source:'damageSource'},
				filter:function(event,player){
					if(player.hp==player.countCards('h')) return false;
					if(player.hp<player.countCards('h')&&player.isHealthy()) return false;
					if(event.source!=player&&!player.storage.beishui) return false;
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				content:function(){
					'step 0'
					player.storage.lvli++;
					var num=player.hp-player.countCards('h');
					if(num>0) player.draw(num);
					else player.recover(-num);
				},
				group:'lvli3',
			},
			lvli:{
				audio:2,
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return event.type!='wuxie';
				},
				chooseButton:{
					dialog:function(event,player){
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
						return ui.create.dialog(event.lvli6?get.prompt('lvli'):'膂力',[list,'vcard']);
					},
					filter:function(button,player){
						return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						var player=_status.event.player;
						var players=game.filterPlayer();
						if(player.countCards('h',button.link)) return 0;
						if(button.link[2]=='wuzhong'){
							if(player.countCards('h')<player.hp){
								return 3+Math.random();
							}
							return 0;
						}
						if(button.link[2]=='tao'){
							return 3+Math.random();
						}
						if(button.link[2]=='sha'){
							return 2+Math.random();
						}
						if(button.link[2]=='juedou'){
							return 2+Math.random();
						}
						if(button.link[2]=='guohe'){
							return 2+Math.random();
						}
						if(button.link[2]=='shunshou'){
							for(var i=0;i<players.length;i++){
								if(player.canUse('shunshou',players[i])&&get.attitude(player,players[i])<0){
									return 2+Math.random();
								}
							}
							return 0;
						}
						if(button.link[2]=='tiesuo'){
							return 1+Math.random();
						}
						if(button.link[2]=='jiu'){
							if(get.effect(player,{name:'jiu'})>0){
								return 1+Math.random();
							}
							return 0;
						}
						if(button.link[2]=='nanman'||button.link[2]=='wanjian'||button.link[2]=='taoyuan'||button.link[2]=='wugu'){
							var eff=0;
							for(var i=0;i<players.length;i++){
								if(players[i]!=player){
									eff+=get.effect(players[i],{name:button.link[2]},player,player);
								}
							}
							if(eff>0){
								return eff+Math.random();
							}
							return 0;
						}
						return Math.random();
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false;},
							audio:'lvli',
							selectCard:-1,
							check:function(card){
								return 1;
							},
							viewAs:{name:links[0][2],nature:links[0][3]},
						}
					},
					prompt:function(links,player){
						return '请选择'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'的目标';
					}
				},
				ai:{
					order:4,
					result:{
						player:1,
					},
					threaten:2.9,
				},
				group:['lvli2','lvli3','lvli4','lvli5','lvli6']
			},
			lvli2:{
				trigger:{player:['useCardBefore','respondBefore']},
				forced:true,
				popup:false,
				priority:35,
				filter:function(event,player){
					return event.skill=='lvli_backup'||event.skill=='lvli5'||event.skill=='lvli4';
				},
				content:function(){
					'step 0'
					player.logSkill('lvli');
					player.storage.lvli++;
					player.popup(trigger.card.name,trigger.name=='useCard'?'metal':'wood');
					'step 1'
					var random=0.5+player.countCards('e')*0.1;
					if(random>=Math.random()){
						player.popup('洗具');
					}
					else{
						player.popup('杯具');
						trigger.cancel();
						if(trigger.name=='respond'){
							var evt=trigger.getParent();
							if(evt&&evt.result) evt.result.bool=false;
						}
						game.broadcastAll(function(str){
							var dialog=ui.create.dialog(str);
							dialog.classList.add('center');
							setTimeout(function(){
								dialog.close();
							},1000);
						},get.translation(player)+'声明的'+get.translation(trigger.card.name)+'并没有生效');
						game.log('然而什么都没有发生');
						game.delay(2);
					}
				},
			},
			lvli3:{
				trigger:{global:'phaseBefore'},
				forced:true,
				silent:true,
				popup:false,
				content:function(){
					player.storage.lvli=0;
				},
			},
			lvli4:{
				log:false,
				enable:'chooseToRespond',
				filter:function(event,player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return (event.parent.name=='sha');
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:'shan'},
				ai:{
					skillTagFilter:function(player){
						if(player.storage.lvli>1) return false;
						if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
						return true;
					},
					threaten:1.5,
					respondShan:true,
				}
			},
			lvli5:{
				log:false,
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				filterCard:function(){return false},
				selectCard:-1,
				viewAs:{name:'wuxie'},
			},
			lvli6:{
				trigger:{player:'damageEnd'},
				direct:true,
				filter:function(event,player){
					if(!player.storage.beishui) return false;
					if(player.storage.lvli>1) return false;
					if(player.storage.lvli>0&&(player!=_status.currentPhase||!player.storage.choujue)) return false;
					return true;
				},
				content:function(){
					var next=player.chooseToUse();
					next.set('norestore',true);
					next.set('_backupevent','lvli');
					next.backup('lvli');
					next.lvli6=true;
				},
			},
			choujue:{
				derivation:['beishui','qingjiao'],
				trigger:{global:'phaseAfter'},
				audio:2,
				skillAnimation:true,
				animationColor:'water',
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=false;
				},
				filter:function(event,player){
					if(player.storage.choujue) return false;
					return Math.abs(player.hp-player.countCards('h'))>=3;
				},
				content:function(){
					player.awakenSkill('choujue');
					player.storage.choujue=true;
					player.loseMaxHp();
					player.addSkill('beishui');
				},
			},
			beishui:{
				trigger:{player:'phaseBegin'},
				audio:2,
				skillAnimation:'epic',
				animationColor:'thunder',
				unique:true,
				juexingji:true,
				forced:true,
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=false;
				},
				filter:function(event,player){
					if(player.storage.beishui) return false;
					return Math.min(player.hp,player.countCards('h'))<2;
				},
				content:function(){
					player.awakenSkill('beishui');
					player.storage.beishui=true;
					player.loseMaxHp();
					player.addSkill('qingjiao');
				},
			},
			qingjiao:{
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					return player.countCards('h')&&(ui.cardPile.hasChildNodes()||ui.discardPile.hasChildNodes());
				},
				check:function(event,player){
					return player.countCards('h')<=player.hp;
				},
				content:function(){
					'step 0'
					player.discard(player.getCards('h'));
					'step 1'
					var evt=trigger.getParent();
					if(evt&&evt.getParent&&!evt.qingjiao){
						evt.qingjiao=true;
						var next=game.createEvent('qingjiao_discard',false,evt.getParent());
						next.player=player;
						next.setContent(function(){
							var hs=player.getCards('he');
							if(hs.length) player.discard(hs);
						});
					}
					'step 2'
					var list=[];
					var typelist=[];
					var getType=function(card){
						var sub=get.subtype(card);
						if(sub) return sub;
						return card.name;
					};
					for(var i=0;i<ui.cardPile.childElementCount;i++){
						var node=ui.cardPile.childNodes[i];
						var typex=getType(node);
						if(!typelist.contains(typex)){
							list.push(node);
							typelist.push(typex);
							if(list.length>=8) break;
						}
					}
					if(list.length<8){
						for(var i=0;i<ui.discardPile.childElementCount;i++){
							var node=ui.discardPile.childNodes[i];
							var typex=getType(node);
								if(!typelist.contains(typex)){
								list.push(node);
								typelist.push(typex);
								if(list.length>=8) break;
							}
						}
					}
					player.gain(list,'gain2');
					'step 3'
					game.updateRoundNumber();
				},
			},
			//蒋干
			weicheng:{
				audio:2,
				trigger:{global:'gainEnd'},
				//forced:true,
				frequent:true,
				filter:function(event,player){
					if(event.source==player&&event.player!=player&&player.hp>player.countCards('h')){
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].original=='h') return true;
						}
					}
					return false;
				},
				content:function(){
					player.draw();
				},
			},
			daoshu:{
				audio:2,
				enable:'phaseUse',
				filterTarget:function(c,p,t){
					return t!=p&&t.countGainableCards(p,'h')>0;
				},
				filter:function(e,p){
					return !p.hasSkill('daoshu_used')
				},
				content:function(){
					'step 0'
					player.chooseControl(lib.suit).set('prompt','请选择一个花色').ai=function(){return lib.suit.randomGet()};
					'step 1'
					event.suit=result.control;
					player.popup(event.suit+2);
					game.log(player,'选择了',event.suit+2);
					player.gainPlayerCard(target,true,'h','visibleMove');
					'step 2'
					if(result.bool){
						var suit2=get.suit(result.cards[0]);
						if(suit2==event.suit){
							target.damage();
							event.finish();
						}
						else{
							player.addTempSkill('daoshu_used','phaseUseAfter');
							if(player.countCards('h',function(card){return get.suit(card)!=suit2})==0){
								player.showHandcards();
								event.finish();
							}
							else player.chooseCard('h',true,function(card){
								return get.suit(card)!=_status.event.suit2
							},'交给'+get.translation(target)+'一张不为'+get.translation(suit2)+'花色的牌').set('suit2',suit2);
						}
					}
					else event.finish();
					'step 3'
					player.give(result.cards,target,true);
				},
				ai:{
					order:1,
					result:{
						target:-1,
					},
				},
				subSkill:{
					used:{sub:true},
				},
			},
		//和沙摩柯一起上线的新服三将
		spjiedao:{
				audio:2,
				trigger:{
					source:"damageBegin1",
				},
				usable:1,
				direct:true,
				popup:false,
				content:function (){
					'step 0'
					event.num=player.getDamagedHp();
					if(event.num>0) player.chooseBool(get.prompt2('spjiedao',trigger.player)).ai=function(){
						if(get.attitude(player,trigger.player)>=-1) return false;
						return !trigger.player.getEquip('baiyin')&&!trigger.player.getEquip('rewrite_baiyin');
					};
					'step 1'
					if(result.bool){
						player.logSkill('spjiedao',trigger.player);
						trigger.num+=num;
						var next=game.createEvent('spjiedao_after',null,trigger.getParent());
						next.player=player;
						next.target=trigger.player;
						next.num=num;
						next.setContent(function(){
							if(target.isAlive()) player.chooseToDiscard(num,true);
						});
					}
				},
			},
			biaozhao:{
				audio:2,
				group:["biaozhao2","biaozhao3"],
				intro:{
					content:"cards",
				},
				trigger:{
					player:"phaseEnd",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he')>0&&!player.storage.biaozhao;
				},
				content:function (){
					'step 0'
					player.chooseCard('he',get.prompt2('biaozhao')).ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.logSkill('biaozhao');
						player.lose(result.cards,ui.special,'toStorage');
						player.storage.biaozhao=result.cards;
						player.markSkill('biaozhao');
					}
				},
			},
			"biaozhao2":{
				trigger:{
					global:["loseEnd","cardsDiscardEnd"],
				},
				forced:true,
				audio:"biaozhao",
				filter:function (event,player){
					if(!player.storage.biaozhao) return false;
					if(event.getParent().name=='biaozhao2') return false;
					var suit=get.suit(player.storage.biaozhao[0]);
					var num=get.number(player.storage.biaozhao[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'&&get.suit(event.cards[i])==suit
						&&get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function (){
					"step 0"
					var card=player.storage.biaozhao[0];
					delete player.storage.biaozhao;
					if(trigger.getParent().name=='discard'){
						trigger.player.gain(card,'fromStorage');
						player.$give(card,trigger.player);
					}
					else{
						player.$throw(card);
						game.cardsDiscard(card);
					}
					"step 1"
					player.unmarkSkill('biaozhao');
					player.loseHp();
				},
			},
			"biaozhao3":{
				trigger:{
					player:"phaseBegin",
				},
				forced:true,
				audio:"biaozhao",
				filter:function (event,player){
					return player.storage.biaozhao!=undefined;
				},
				content:function (){
					"step 0"
					var card=player.storage.biaozhao[0];
					delete player.storage.biaozhao;
					player.unmarkSkill('biaozhao');
					game.cardsDiscard(card);
					event.num=0;
					game.countPlayer(function(current){
						if(current.countCards('h')>event.num) event.num=current.countCards('h');
					});
					player.chooseTarget('是否令一名角色将手牌摸至'+event.num+'张并回复1点体力？').ai=function(target){
						var num=Math.min(event.num-target.countCards('h'),5);
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						var draw=Math.min(num-target.countCards('h'),5);
						if(draw) target.draw(draw);
						target.recover();
					}
				},
			},
			yechou:{
				audio:2,
				trigger:{
					player:"die",
				},
				direct:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'wood',
				content:function (){
					"step 0"
					player.chooseTarget(get.prompt2('yechou'),function(card,player,target){
						return player!=target&&target.getDamagedHp()>1
					}).set('forceDie',true).set('ai',function(target){
						var num=get.attitude(_status.event.player,target);
						return -num;
					});
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('yechou',target);
						player.line(target,'green');
						target.addTempSkill('yechou2',{player:'phaseBeginStart'});
					}
				},
				ai:{
					expose:0.5,
				},
			},
			"yechou2":{
				mark:true,
				marktext:"仇",
				intro:{
					content:"每个回合结束时失去1点体力直到回合开始",
				},
				trigger:{
					global:"phaseAfter",
				},
				forced:true,
				content:function (){player.loseHp()},
			},
			yanjiao:{
				audio:2,
				ai:{
					order:10,
					result:{
						player:1,
						target:1.1,
					},
				},
				enable:"phaseUse",
				usable:1,
				filterTarget:function (card,player,target){
					return target!=player;
				},
				content:function (){
					"step 0"
					var num=4;
					if(player.storage.xingshen){
						num+=player.storage.xingshen;
						player.storage.xingshen=0;
						player.unmarkSkill('xingshen');
					}
					event.cards=get.cards(num);
					player.showCards(event.cards);
					"step 1"
					event.getedResult=lib.skill.yanjiao.getResult(cards);
					if(!event.getedResult.length){
						game.cardsDiscard(cards);
						player.addTempSkill('yanjiao2');
						event.finish();
					}
					"step 2"
					target.chooseControl("自动分配","手动分配").set("prompt","【严教】：是否让系统自动分配方案？").ai=function(){
						return 0;
					};
					"step 3"
					if(result.control=="手动分配"){
						event.map=[cards,[],[]];
						event.goto(8);
					}
					else if(!_status.connectMode){
						var choiceList=ui.create.dialog('请选择一种方案','hidden','forcebutton');
						for(var i=0;i<event.getedResult.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">方案'+get.cnNumber(i+1,true);
							str+='<br>第一组：';
							var current=event.getedResult[i];
							str+=get.translation(current[0]);
							str+='<br>第二组：';
							str+=get.translation(current[1]);
							if(current[2].length){
								str+='<br>剩余：';
								str+=get.translation(current[2]);
							}
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[i];
							}
							choiceList.buttons.add(next.firstChild);
						}
						event.choiceList=choiceList;
						target.chooseButton(choiceList,true,function(button){
						return true;
						});
					}
					"step 4"
					if(result.bool&&result.links) event.index=result.links[0];
					else event.index=0;
					event.togain=event.getedResult[event.index];
					target.showCards(event.togain[0],get.translation(target)+'分出的第一份牌');
					"step 5"
					target.showCards(event.togain[1],get.translation(target)+'分出的第二份牌');
					"step 6"
					target.chooseControl().set('choiceList',[
						'获得'+get.translation(event.togain[0]),
						'获得'+get.translation(event.togain[1])
					]).ai=function(){return Math.random()<0.5?1:0};
					"step 7"
					target.gain(event.togain[result.index],'gain2');
					player.gain(event.togain[1-result.index],'gain2');
					if(event.togain[2].length){
						game.cardsDiscard(event.togain[2]);
						if(event.togain[2].length>1) player.addTempSkill('yanjiao2');
					}
					event.finish();
					"step 8"
					event.videoId=lib.status.videoId++;
					var dialogx=['严教：选择要移动的牌'];
					var name=["未分配","第一组","第二组"];
					for(var i=0;i<event.map.length;i++){
						if(event.map[i].length>0){
							dialogx.push('<div class="text center">'+name[i]+'</div>');
							dialogx.push(event.map[i])
						}
					}
					if(target.isOnline2()){
						target.send(function(dialogx,id){
							ui.create.dialog.apply(null,dialogx).videoId=id;
						},dialogx,event.videoId);
					}
					event.dialog=ui.create.dialog.apply(null,dialogx);
					event.dialog.videoId=event.videoId;
					if(target!=game.me||_status.auto){
						event.dialog.style.display='none';
					}
					var next=target.chooseButton();
					next.set('selectButton',function(){
						if(!_status.event.map[1].length||!_status.event.map[2].length) return 1;
						var num1=0;
						for(var i=0;i<_status.event.map[1].length;i++){
							num1+=_status.event.map[1][i].number;
						}
						var num2=0;
						for(var j=0;j<_status.event.map[2].length;j++){
							num2+=_status.event.map[2][j].number;
						}
						return (num1==num2?[0,1]:1);
					});
					next.set('map',event.map);
					next.set('dialog',event.videoId);
					next.set('ai',function(){return -1});
					next.set('forceAuto',true);
					"step 9"
					if(result.bool){
						if(!result.links.length){
							if(target.isOnline2()){
								target.send('closeDialog',event.videoId);
							}
							event.dialog.close();
							event.togain=[event.map[1],event.map[2],event.map[0]];
							target.showCards(event.togain[0],get.translation(target)+'分出的第一份牌');
							event.goto(5);
						}
						else{
							event.card=result.links[0];
							var controls=["取消分组","移动到第一组","移动到第二组"];
							for(var i=0;i<event.map.length;i++){
								if(event.map[i].contains(event.card)){
									controls.splice(i,1);
									break;
								}
							}
							var func=function(card,id){
							var dialog=get.idDialog(id);
								if(dialog){
									for(var i=0;i<dialog.buttons.length;i++){
										if(dialog.buttons[i].link==card){
											dialog.buttons[i].classList.add('glow');
										}
										else{
											dialog.buttons[i].classList.add('unselectable');
										}
									}
								}
							}
							if(target.isOnline2()){
								target.send(func,event.card,event.videoId);
							}
							else if(target==game.me&&!_status.auto){
								func(event.card,event.videoId);
							}
							target.chooseControl(controls);
						}
					}
					else{
						if(target.isOnline2()){
							target.send('closeDialog',event.videoId);
						}
						event.dialog.close();
						game.cardsDiscard(cards);
						player.addTempSkill('yanjiao2');
						event.finish();
					}
					"step 10"
					if(target.isOnline2()){
						target.send('closeDialog',event.videoId);
					}
					event.dialog.close();
					var position={
						"取消分组":0,
						"移动到第一组":1,
						"移动到第二组":2,
					}[result.control||"取消分组"];
					for(var i=0;i<event.map.length;i++){
						if(event.map[i].contains(card)){
							event.map[i].remove(card);
							event.map[position].push(card);
							break;
						}
					}
					event.goto(8);
				},
				getResult:function (cards){
					var cl=cards.length;
					var maxmium=Math.pow(3,cl);
					var filter=function(list){
						if(!list[1].length||!list[0].length) return false;
						var num1=0;
						for(var i=0;i<list[1].length;i++){
							num1+=list[1][i].number;
						}
						var num2=0;
						for(var j=0;j<list[0].length;j++){
							num2+=list[0][j].number;
						}
						return num1==num2
					};
					var results=[];
					for(var i=0;i<maxmium;i++){
						var result=[[],[],[]];
						for(var j=0;j<cl;j++){
							result[Math.floor((i%Math.pow(3,j+1))/Math.pow(3,j))].push(cards[j]);
						}
						if(filter(result)) results.push(result);
					}
					var filterSame=function(list1,list2){
						if(list1[1].length==list2[0].length&&list1[0].length==list2[1].length){
							for(var i=0;i<list1[0].length;i++){
								if(!list2[1].contains(list1[0][i])) return false;
							}
							for(var i=0;i<list1[1].length;i++){
								if(!list2[0].contains(list1[1][i])) return false;
							}
							return true;
						}
						return false;
					}
					for(var i=0;i<results.length;i++){
						for(var j=i+1;j<results.length;j++){
							if(filterSame(results[i],results[j])) results.splice(j--,1);
						}
					}
					results.sort(function(a,b){
						return a[2].length-b[2].length;
					});
					return results;
				},
			},
			"yanjiao2":{
				marktext:"教",
				mark:true,
				intro:{
					content:"本回合手牌上限-1",
				},
				mod:{
					maxHandcard:function (player,num){
						return num-1;
					},
				},
			},
			xingshen:{
				audio:2,
				intro:{
					content:"下一次发动【严教】时多展示#张牌",
				},
				trigger:{
					player:"damageEnd",
				},
				frequent:true,
				content:function (){
					player.draw(player.isMinHandcard()?2:1);
					if(!player.storage.xingshen) player.storage.xingshen=0;
					player.storage.xingshen+=player.isMinHp()?2:1;
					if(player.storage.xingshen>4) player.storage.xingshen=4;
					player.markSkill('xingshen');
				},
			},
			//统率三军诸葛瑾和文聘
			"zhenwei_three":{
				global:"zhenwei_three_others",
				subSkill:{
					others:{
						mod:{
							globalTo:function (from,to,distance){
								if(from.side!=to.side&&game.hasPlayer(function(current){
									return current!=to&&current.side==to.side&&current.hasSkill('zhenwei_three');
								}))return distance+1;
							},
						},
						sub:true,
					},
				},
			},
			"huanshi_three":{
				audio:"huanshi",
				trigger:{
					global:"judge",
				},
				filter:function (event,player){
					return player.countCards('he')>0&&player.side==event.player.side;
				},
				direct:true,
				content:function (){
					"step 0"
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('huanshi_three'),'he').set('ai',function(card){
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
						player.respond(result.cards,'highlight','huanshi_three');
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
					},
				},
			},
			//英文版特典武将凯撒
			zhengfu:{
				trigger:{
					player:"useCardToPlayered",
				},
				check:function (event,player){
					return get.attitude(player,event.target)<0;
				},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				logTarget:"target",
				line:false,
				content:function (){
					'step 0'
					player.line(trigger.target,{color:[220, 90, 139]});
					player.chooseControl(['basic','trick','equip']).set('ai',function(){
						if(!trigger.target.countCards('h','sha')&&trigger.target.countCards('h','shan')) return 'trick';
						return 'basic';
					}).set('prompt','请选择一种牌的类别');
					'step 1'
					trigger.target.chooseCard('he','交给'+get.translation(player)+'一张'+get.translation(result.control)+'牌，否则此【杀】不可被闪避。',function(card){
						return get.type(card,'trick')==result.control;
					}).set('ai',function(card){
						var num=_status.event.num;
						if(num==0) return 0;
						if(card.name=='shan') return num>1?2:0;
						return 8-get.value(card);
					}).set('num',trigger.target.countCards('h','shan'))
					'step 2'
					if(result.bool){
						var cards=result.cards;
						player.gain(cards,trigger.target,'giveAuto');
					}
					else trigger.getParent().directHit.add(trigger.target);
					game.delay();
				},
			},
			//变权移植
			wanwei:{
				trigger:{target:['rewriteGainResult','rewriteDiscardResult']},
				direct:true,
				filter:function(event,player){
					return event.player!=player;
				},
				audio:2,
				content:function(){
					'step 0'
					var prompt='即将失去'+get.translation(trigger.result.cards)+'，是否发动【挽危】？';
					var next=player.choosePlayerCard(player,prompt,trigger.position);
					next.set('ai',function(button){
						return 20-get.value(button.link);
					});
					next.filterButton=trigger.filterButton;
					next.selectButton=trigger.result.cards.length;
					'step 1'
					if(result.bool){
						player.logSkill('wanwei');
						trigger.result.cards=result.links.slice(0);
						trigger.result.links=result.links.slice(0);
						trigger.cards=result.links.slice(0);
						trigger.untrigger();
					}
				}
			},
			yuejian:{
				trigger:{global:'phaseDiscardBegin'},
				audio:2,
				filter:function(event,player){
					return event.player.countUsed()<event.player.maxHp;
				},
				content:function(){
					trigger.player.addTempSkill('yuejian_num');
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)>0&&event.player.needsToDiscard();
				},
				subSkill:{
					num:{
						mod:{
							maxHandcard:function(player,num){
								return num+player.maxHp;
							}
						}
					},
				}
			},
			gzjili:{
				subSkill:{
					count:{
						trigger:{player:['useCard','respond']},
						silent:true,
						priority:1,
						content:function(){
							player.storage.gzjili++;
						}
					},
					init:{
						trigger:{global:'phaseBefore'},
						silent:true,
						content:function(){
							player.storage.gzjili=0;
						}
					}
				},
				group:['gzjili_count','gzjili_init'],
				trigger:{player:['useCard','respond']},
				frequent:true,
				filter:function(event,player){
					return player.storage.gzjili==player.getAttackRange();
				},
				audio:2,
				content:function(){
					player.draw(player.getAttackRange());
				},
				ai:{
					threaten:1.8
				}
			},
			xiongsuan:{
				limited:true,
				enable:'phaseUse',
				filterCard:true,
				filter:function(event,player){
					return player.countCards('h');
				},
				check:function(card){
					return 7-get.value(card);
				},
				filterTarget:true,
				content:function(){
					'step 0'
					player.awakenSkill('xiongsuan');
					target.damage('nocard');
					'step 1'
					player.draw(3);
					var list=[];
					var skills=target.getOriginalSkills();
					for(var i=0;i<skills.length;i++){
						if(lib.skill[skills[i]].limited&&target.awakenedSkills.contains(skills[i])){
							list.push(skills[i]);
						}
					}
					if(list.length==1){
						target.storage.xiongsuan_restore=list[0];
						target.addTempSkill('xiongsuan_restore','phaseBegin');
						event.finish();
					}
					else if(list.length>1){
						player.chooseControl(list).set('prompt','选择一个限定技在回合结束后重置之');
					}
					else{
						event.finish();
					}
					'step 2'
					target.storage.xiongsuan_restore=result.control;
					target.addTempSkill('xiongsuan_restore','phaseBegin');
				},
				subSkill:{
					restore:{
						trigger:{global:'phaseAfter'},
						silent:true,
						content:function(){
							player.restoreSkill(player.storage.xiongsuan_restore);
						}
					}
				},
				ai:{
					order:4,
					damage:true,
					result:{
						target:function(player,target){
							if(target.hp>1){
								var skills=target.getOriginalSkills();
								for(var i=0;i<skills.length;i++){
									if(lib.skill[skills[i]].limited&&target.awakenedSkills.contains(skills[i])){
										return 8;
									}
								}
							}
							if(target!=player) return 0;
							if(get.damageEffect(target,player,player)>0) return 10;
							if(target.hp>=4) return 5;
							if(target.hp==3){
								if(player.countCards('h')<=2&&game.hasPlayer(function(current){
									return current.hp<=1&&get.attitude(player,current)<0;
								})){
									return 3;
								}
							}
							return 0;
						}
					}
				}
			},
			diancai:{
				group:['diancai_count','diancai_init'],
				audio:2,
				trigger:{global:'phaseUseEnd'},
				filter:function(event,player){
					return _status.currentPhase!=player&&player.storage.diancai>=player.hp;
				},
				content:function(){
					'step 0'
					var num=player.maxHp-player.countCards('h');
					if(num>0){
						player.draw(num);
					}
				},
				subSkill:{
					init:{
						trigger:{global:'phaseUseBegin'},
						filter:function(event,player){
							return _status.currentPhase!=player;
						},
						silent:true,
						content:function(){
							player.storage.diancai=0;
						}
					},
					count:{
						trigger:{player:'loseEnd'},
						silent:true,
						filter:function(event,player){
							return _status.currentPhase!=player;
						},
						content:function(){
							player.storage.diancai+=trigger.cards.length;
						}
					}
				}
			},
			diaodu:{
				audio:2,
				group:"diaodu_use",
				subfrequent:['use'],
				subSkill:{
					use:{
						trigger:{
							player:"useCard",
						},
						audio:"diaodu",
						frequent:true,
						prompt:'是否发动【调度】摸一张牌？',
						filter:function (event,player){
							return get.type(event.card)=='equip'
						},
						content:function (){
							player.draw('nodelay');
						},
						ai:{
							reverseEquip:true,
							effect:{
								target:function (card,player,target,current){
									if(get.type(card)=='equip') return [1,3];
								},
							},
						},
					},
				},
				trigger:{
					player:"phaseUseBegin",
				},
				filter:function (event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countGainableCards(player,'e')>0;
					});
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt2('diaodu'),function(card,player,current){
						return current!=player&&current.countGainableCards(player,'e')>0;
					}).ai=function(target){
						var num=get.attitude(_status.event.player,target);
						if(target.isDamaged()&&target.getEquip('baiyin')&&att>0) return 2*num
						return -num;
					};
					'step 1'
					if(result.bool){
						event.target1=result.targets[0];
						player.logSkill('diaodu',event.target1);
						player.line(event.target1,'diaodu');
						player.gainPlayerCard(event.target1,'e',true);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						event.card=result.cards[0];
						player.chooseTarget('是否将'+get.translation(event.card)+'交给一名其他角色？',function(card,player,current){
							return current!=player&&current!=event.target1;
						});
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.gain(card,player,'give');
					}
				},
			},
			zhengbi:{
				trigger:{player:'phaseUseBegin'},
				filter:function(event,player){
					//if(event.player!=player) return false;
					return game.hasPlayer(function(current){return current!=player&&current.isHealthy()})||player.countCards('h',{type:'basic'});
				},
				content:function(){
					'step 0'
					var choices=[];
					if(game.hasPlayer(function(current){return current.isHealthy()})) choices.push('选择一名未受伤的角色');
					if(player.countCards('h',{type:'basic'})) choices.push('交给一名角色一张基本牌');
					player.chooseControl(choices,ui.create.dialog('征辟</br></br><div class="center text">选择一项</div>','hidden')).set('ai',function(){
						if(choices.length>1){
							return 1;
						}
						return 0;
					});
					'step 1'
					if(result.control=='选择一名未受伤的角色') player.chooseTarget('征辟</br></br><div class="center text">选择一名未受伤的角色，你对其使用牌没有次数和距离限制直到回合结束</div>',function(card,player,target){
						return target!=player&&target.isHealthy();
					},true);
					else player.chooseCardTarget({
						prompt:'征辟</br></br><div class="center text">交给一名其他角色一张基本牌，然后该角色交给你一张非基本牌或两张基本牌</div>',
						position:'h',
						filterCard:function(card){return get.type(card)=='basic'},
						filterTarget:function(card,player,target){
							return target!=player;
						},
						ai1:function(card){return 7-get.value(card)},
						//ai2:function(card,player,target){}
					}).set('forced',true);
					'step 2'
					event.target=result.targets[0];
					player.line(result.targets,'green');
					if(result.cards.length){
						event.cards=result.cards;
						result.targets[0].gain(result.cards,player,'give');
					}
					else{
						player.storage.zhengbi_eff1=result.targets[0];
						player.addTempSkill('zhengbi_eff1');
						event.finish();
					}
					'step 3'
					var choices=[];
					if(target.countCards('he',{type:['trick','delay','equip']})) choices.push('一张非基本牌');
					if(target.countCards('h',{type:'basic'})>1) choices.push('两张基本牌');
					if(choices.length) target.chooseControl(choices,ui.create.dialog('征辟</br></br><div class="center text">交给'+get.translation(player)+'</div>')).set('ai',function(event,player){
						if(choices.length>1){
							if(player.countCards('he',{type:['trick','delay','equip']},function(card){return get.value(card)<7})) return 0;
							return 1;
						}
						return 0;
					});
					else{
						if(target.countCards('h')){
							var cards=target.getCards('h');
							player.gain(cards,target,'giveAuto');
							event.finish();
						}
						else event.finish();
					}
					'step 4'
					var check=(result.control=='一张非基本牌');
					target.chooseCard('he',(check?1:2),{type:(check?['trick','delay','equip']:'basic')},true);
					'step 5'
					if(result.cards){
						player.gain(result.cards,target,'giveAuto');
					}
				},
				subSkill:{
					eff1:{
						sub:true,
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.zhengbi_eff1) return true;
							},
							cardUsable:function (card,player,num){
								if(typeof num=='number'&&player.storage.zhengbi_eff1&&player.storage.zhengbi_eff1.isAlive()) return num+100;
							},
							playerEnabled:function (card,player,target){
								if(player.storage.zhengbi_eff1.isAlive()&&player.storage.zhengbi_eff1&&target!=player.storage.zhengbi_eff1){
									var num=player.getCardUsable(card)-100;
									if(num<=0) return false;
								}
							},
						},
						onremove:true,
					},
					eff2:{sub:true},
				}
			},
			fengying:{
				limited:true,
				enable:'phaseUse',
				position:'h',
				filterCard:true,
				selectCard:-1,
				filter:function(event,player){
					return !player.storage.fengying&&player.countCards('h')>0;
				},
				filterTarget:function(card,player,target){
					return target==player;
				},
				selectTarget:-1,
				discard:false,
				lose:false,
				content:function(){
					'step 0'
					player.awakenSkill('fengying');
					player.storage.fengying=true;
					player.insertPhase();
					var evt=_status.event.getParent('phaseUse');
					if(evt&&evt.name=='phaseUse'){
						evt.skipped=true;
					}
					'step 1'
					var cards=player.getCards('h');
					player.discard(cards);
					player.chooseTarget('请选择至多'+cards.length+'名角色，令这些角色将手牌摸至手牌上限。',[1,cards.length],function(card,player,target){
						return target.countCards('h')<Math.min(target.maxHp,5);
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>2){
							return Math.min(5,target.maxHp)-target.countCards('h');
						}
						return att/3;
					});
					'step 2'
					if(result.bool){
						var list=result.targets;
						list.sort(lib.sort.seat);
						player.line(list,'thunder');
						game.asyncDraw(list,function(current){
							return current.maxHp-current.countCards('h');
						});
					}
				},
				skillAnimation:'epic',
				animationColor:'gray',
				ai:{
					order:0.1,
					result:{
						player:0,
					}
				},
			},
			//新服曹笨
			xinshanjia:{
				group:["xinshanjia_count"],
				subSkill:{
					count:{
						forced:true,
						silent:true,
						popup:false,
						trigger:{
							player:"loseEnd",
						},
						filter:function (event,player){
							var cs=event.cards;
							for(var i=0;i<cs.length;i++){ 
								if(get.type(cs[i])=='equip'&&cs[i].original=='e') return true;
							}
							return false;
						},
						content:function (){
							var cs=trigger.cards;
							var num=0;
							for(var i=0;i<cs.length;i++){ 
								if(get.type(cs[i])=='equip'&&cs[i].original=='e') num++;
							}
							player.storage.xinshanjia+=num;
							player.markSkill('xinshanjia');
						},
					},
				},
				audio:"shanjia",
				trigger:{
					player:"phaseUseBegin",
				},
				intro:{
					content:"本局游戏内已失去过#张装备区内的牌",
				},
				frequent:true,
				init:function (player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				content:function (){
					'step 0'
					player.draw(3);
					'step 1'
					var num=3-player.storage.xinshanjia;
					if(num>0){
						player.chooseToDiscard('he',true,num);
					}
					'step 2'
					var bool=true;
					if(result.cards){
						for(var i=0;i<result.cards.length;i++){
							if(['basic','trick'].contains(get.type(result.cards[i],'trick'))){
								bool=false;break;
							}
						}
					}
					if(bool){
						player.chooseUseTarget({name:'sha'},'是否视为使用一张【杀】？',false);
					}
				}
			},
			//OL马超
			ol_shichou:{
				audio:2,
				trigger:{
					player:'useCard2',
				},
				direct:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&player.isDamaged();
				},
				content:function(){
					'step 0'
					var num=player.getDamagedHp();
					player.chooseTarget('是否发动【誓仇】，令至多'+num+'名其他角色也成为此【杀】的目标？',[1,num],function(card,player,target){
						return target!=player&&!trigger.targets.contains(target)&&player.canUse({name:'sha'},target);
					}).ai=function(target){
						return get.effect(target,{name:'sha'},_status.event.player);
					};
					'step 1'
					if(result.bool&&result.targets&&result.targets.length){
						var targets=result.targets;
						player.logSkill('ol_shichou',targets);
						player.line(targets,trigger.card.nature);
						trigger.targets.addArray(targets);
					}
				},
			},
			//新大小乔
			"new_xingwu":{
				audio:"xingwu",
				trigger:{
					player:"phaseDiscardBegin",
				},
				direct:true,
				intro:{
					content:"cards",
				},
				init:function (player){
					player.storage.new_xingwu=[];
				},
				content:function (){
					'step 0'
					player.chooseCard(get.prompt2('new_xingwu')).set('ai',function(card){
						var player=_status.event.player;
						for(var i=0;i<player.storage.new_xingwu.length;i++){
							if(get.suit(player.storage.new_xingwu[i])==get.suit(card)) return 0;
						}
						if(player.storage.new_xingwu.length==2){
							if(!game.hasPlayer(function(current){
								return (current!=player&&
									get.damageEffect(current,player,player)>0&&
									get.attitude(player,current)<0)
							})) return 0;
						}
						return 7-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('new_xingwu');
						if(player.storage.new_xingwu.length<2){
							player.$give(result.cards,player);
						}
						player.lose(result.cards,ui.special,'toStorage');
						player.storage.new_xingwu=player.storage.new_xingwu.concat(result.cards);
						player.markSkill('new_xingwu');
						player.syncStorage('new_xingwu');
					}
					else{
						event.finish();
					}
					'step 2'
					var suitlist=[];
					for(var i=0;i<player.storage.new_xingwu.length;i++){
						if(!suitlist.contains(get.suit(player.storage.new_xingwu[i]))){
							suitlist.push(get.suit(player.storage.new_xingwu[i]));
						}
					}
					if(suitlist.length==3){
						player.chooseButton(['请选择要弃置的「星舞」牌',player.storage.new_xingwu],true,3).set('filterButton',function(button){
						if(ui.selected.buttons.length){
							for(var i=0;i<ui.selected.buttons.length;i++){
								if(get.suit(ui.selected.buttons[i])==get.suit(button.link)) return false;
							}
						}
						return true;
					}).set('ai',function(button){
						return 1;
					});
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.links){
						player.$throw(result.links);
						for(var i=0;i<result.links.length;i++) player.storage.new_xingwu.remove(result.links[i]);
						game.cardsDiscard(result.links);
						player.syncStorage('new_xingwu');
						player.updateMarks('new_xingwu');
						if(!player.storage.new_xingwu.length) player.unmarkSkill('new_xingwu');
						player.chooseTarget(function(card,player,target){
							return target!=player;
						},'对一名男/女性角色造成两/一点伤害并弃置其装备区内的牌').set('ai',function(target){
							var player=_status.event.player;
							if(get.attitude(player,target)>0) return -1;
							return get.damageEffect(target,player,player)*target.sex=='male'?2:1+target.countCards('e')/2;
						});
					}
					'step 4'
					if(result.bool){
						var target=result.targets[0];
						var num=target.sex=="male"?2:1;
						target.damage(num);
						event.target=target;
						player.line(target,'green');
					}
					else{
						event.finish();
					}
					'step 5'
					if(event.target&&event.target.isAlive()){
						var es=event.target.getCards('e');
						if(es.length){
							event.target.discard(es);
						}
					}
				},
				ai:{
					threaten:1.5,
				},
			},
			"new_luoyan":{
				group:["new_luoyan_tianxiang","new_luoyan_liuli"],
			},
			"new_luoyan_tianxiang":{
				inherit:"retianxiang",
				filter:function (event,player){
					if(!player.storage.new_xingwu||!player.storage.new_xingwu.length) return false;
					if(player.hasSkill('retianxiang')||player.hasSkill('tianxiang')) return false;
					return lib.skill.retianxiang.filter(event,player);
				},
				audio:"tianxiang",
			},
			"new_luoyan_liuli":{
				inherit:"liuli",
				filter:function (event,player){
					if(!player.storage.new_xingwu||!player.storage.new_xingwu.length) return false;
					if(player.hasSkill('liuli')) return false;
					return lib.skill.liuli.filter(event,player);
				},
				audio:"liuli",
			},
			//新孙鲁育
			"new_meibu":{
				audio:"meibu",
				trigger:{
					global:"phaseUseBegin",
				},
				filter:function (event,player){
					return event.player!=player&&event.player.isAlive()&&get.distance(event.player,player,'attack')<=1;
				},
				direct:true,
				derivation:["new_zhixi"],
				checkx:function (event,player){
					if(get.attitude(player,event.player)>=0) return false;
					var e2=player.getEquip(2);
					if(e2){
						if(e2.name=='tengjia') return true;
						if(e2.name=='bagua') return true;
					}
					return event.player.countCards('h')>event.player.hp;
				},
				content:function (){
					"step 0"
					var check=lib.skill.new_meibu.checkx(trigger,player);
					player.chooseToDiscard(get.prompt2('new_meibu',trigger.player),'he').set('ai',function(card){
						if(_status.event.check) return 6-get.value(card);
						return 0;
					}).set('check',check).set('logSkill','new_meibu');
					"step 1"
					if(result.bool){
						var target=trigger.player;
						var card=result.cards[0];
						player.line(target,'green');
						target.addTempSkill('new_zhixi','phaseUseEnd');
						target.addTempSkill('new_meibu_range');
						if(card.name!='sha'&&get.type(card)!='trick'&&get.color(card)!='black'){
							target.storage.meibu=player;
						}
						target.markSkillCharacter('new_meibu',player,'魅步','锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。');
					}
				},
				ai:{
					expose:0.2,
				},
				subSkill:{
					range:{
						mod:{
							targetInRange:function (card,player,target){
								if(target==player.storage.meibu){
									return true;
								}
							},
						},
						onremove:function (player){
							game.broadcast(function(player){
								if(player.marks.new_meibu){
									player.marks.new_meibu.delete();
									delete player.marks.new_meibu;
								}
							},player);
							if(player.marks.new_meibu){
								player.marks.new_meibu.delete();
								delete player.marks.new_meibu;
								game.addVideo('unmark',player,'new_meibu');
							}
						},
						trigger:{
							player:"phaseUseEnd",
						},
						forced:true,
						popup:false,
						content:function (){
							player.removeSkill('new_meibu_viewas');
							game.broadcastAll(function(player){
								if(player.marks.new_meibu&&player.marks.new_meibu.info){
									player.marks.new_meibu.info.content=player.marks.new_meibu.info.content.slice(8);
								}
							},player);
						},
						sub:true,
					},
					viewas:{
						mod:{
							cardEnabled:function (card,player){
								return false;
							},
							cardUsable:function (card,player){
								return false;
							},
							cardSavable:function (card,player){
								return false;
							},
						},
						sub:true,
					},
				},
			},
			"new_mumu":{
				audio:"mumu",
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('new_mumu'),'弃置一名角色装备区内的一张牌，或者获得一名角色装备区内的防具牌',function(card,player,target){
						if(target==player) return target.getEquip(2)!=undefined;
						return target.countCards('e')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target)
						if(target.getEquip(2)&&player.isEmpty(2)){
							return -2*att;
						}
						return -att;
					});
					'step 1'
					if(result.bool&&result.targets&&result.targets.length){
						event.target=result.targets[0];
						player.logSkill('new_mumu',event.target);
						player.line(event.target,'green');
						var e=event.target.getEquip(2);
						event.e=e;
						if(target==player) event.choice='获得一张防具牌';
						else if(e){
							player.chooseControl('弃置一张装备牌','获得一张防具牌').set('ai',function(){
								if(_status.event.player.getEquip(2)){
									return '弃置一张装备牌';
								}
								return '获得一张防具牌';
							});
						}
						else{
							event.choice='弃置一张装备牌';
						}
					}else event.finish();
					'step 2'
					var choice=event.choice||result.control;
					if(choice=='弃置一张装备牌'){
						player.discardPlayerCard(event.target,'e',true);
					}
					else{
						if(event.e){
							player.gain(event.e,event.target,'give');
							player.addTempSkill('new_mumu2')
						}
					}
				},
			},
			"new_zhixi":{
				trigger:{
					player:"useCardAfter",
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					if(get.type(event.card,'trick')=='trick') return true;
					return player.countUsed()>=player.hp;
				},
				content:function (){
					player.addTempSkill('new_meibu_viewas','phaseUseEnd');
				},
			},
			"new_mumu2":{
				mod:{
					cardEnabled:function (card){if(card.name=='sha') return false},
				},
			},
			
			qingzhong:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				check:function(event,player){
					if(game.hasPlayer(function(current){
						return current!=player&&current.isMinHandcard()&&get.attitude(player,current)>0;
					})){
						return true;
					}
					if(player.countCards('h')<=2) return true;
					// if(player.countCards('h')<=3&&!player.countCards('h','shan')) return true;
					if(player.countCards('h',{type:'basic'})<=1) return true;
					return false;
				},
				content:function(){
					player.draw(2);
					player.addTempSkill('qingzhong_give');
				},
				subSkill:{
					give:{
						trigger:{player:'phaseUseEnd'},
						filter:function(event,player){
							return !player.isMinHandcard(true);
						},
						audio:'qingzhong',
						forced:true,
						content:function(){
							'step 0'
							var list=game.filterPlayer(function(current){
								return current.isMinHandcard();
							});
							if(list.length==1){
								if(list[0]!=player){
									player.line(list[0],'green');
									player.swapHandcards(list[0]);
								}
								event.finish();
							}
							else{
								player.chooseTarget(true,'清忠：选择一名手牌最少的角色与其交换手牌',function(card,player,target){
									return target.isMinHandcard();
								}).set('ai',function(target){
									return get.attitude(_status.event.player,target);
								});
							}
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								if(target!=player){
									player.line(target,'green');
									player.swapHandcards(target);
								}
							}
						}
					}
				}
			},
			weijing:{
				audio:2,
				group:['weijing_sha','weijing_shan'],
				subSkill:{
					sha:{
						enable:'chooseToUse',
						viewAs:{name:'sha'},
						filterCard:function(){return false},
						viewAsFilter:function(player){
							if(player.hasSkill('weijing_disable')) return false;
						},
						selectCard:-1,
						mark:false,
						precontent:function(){
							player.addTempSkill('weijing_disable','roundStart');
						},
						prompt:'视为使用一张杀',
						ai:{
							order:function(){
								var player=_status.event.player;
								if(!player.hasShan()&&!game.hasPlayer(function(current){
									return player.canUse('sha',current)&&current.hp==1&&get.effect(current,{name:'sha'},player,player)>0;
								})){
									return 0;
								}
								return 2.95;
							},
							skillTagFilter:function(player,tag,arg){
								if(player.hasSkill('weijing_disable')) return false;
								if(arg!='use') return false;
							},
							respondSha:true,
						}
					},
					shan:{
						enable:'chooseToRespond',
						viewAs:{name:'shan'},
						mark:false,
						filterCard:function(){return false},
						viewAsFilter:function(player){
							if(player.hasSkill('weijing_disable')) return false;
							if(!lib.filter.cardRespondable({name:'shan'},player)) return false;
							if(_status.event.getParent().name!='sha') return false;
							return true;
						},
						onrespond:function(event,player){
							player.addTempSkill('weijing_disable','roundStart');
						},
						selectCard:-1,
						prompt:'视为使用一张闪',
						ai:{
							order:function(){
								if(player.hasSkill('qingzhong_give')) return 2.95;
								return 3.15;
							},
							skillTagFilter:function(player){
								if(player.hasSkill('weijing_disable')) return false;
								if(!lib.filter.cardRespondable({name:'sha'},player)) return false;
							},
							respondShan:true,
						}
					},
					disable:{
						mark:true,
						intro:{
							content:'本轮已发动'
						}
					}
				}
			},
			spwenji:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('spwenji'),function(card,player,target){
						return target!=player&&target.countCards('he');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return Math.sqrt(att)/10;
						return 5-att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('spwenji',target);
						target.chooseCard('he',true,'问计：将一张牌交给'+get.translation(player));
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.addTempSkill('spwenji_respond');
						player.storage.spwenji_respond=result.cards[0].name;
						event.target.give(result.cards,player);
					}
				},
				subSkill:{
					respond:{
						onremove:true,
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						audio:'spwenji',
						filter:function(event,player){
							return event.card.name==player.storage.spwenji_respond;
						},
						content:function(){
							trigger.directHit.addArray(game.players);
						},
					}
				}
			},
			sptunjiang:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				silent:true,
				locked:false,
				subfrequent:['end'],
				content:function(){
					player.addTempSkill('sptunjiang_count');
					player.addTempSkill('sptunjiang_end');
				},
				subSkill:{
					count:{
						trigger:{player:'useCardAfter'},
						silent:true,
						filter:function(event,player){
							if(event.targets){
								for(var i=0;i<event.targets.length;i++){
									if(event.targets[i]!=player){
										return true;
									}
								}
							}
							return false;
						},
						content:function(){
							player.addTempSkill('sptunjiang_used');
						}
					},
					used:{},
					end:{
						audio:'sptunjiang',
						trigger:{player:'phaseEnd'},
						frequent:true,
						prompt2:'结束阶段，若你未跳过本回合的出牌阶段，且你于本回合出牌阶段内未使用牌指定过其他角色为目标，则你可以摸X张牌（X为全场势力数）。',
						filter:function(event,player){
							return !player.hasSkill('sptunjiang_used');
						},
						content:function(){
							player.draw(game.countGroup());
						}
					}
				}
			},
			bingzhao:{
				audio:2,
				unique:true,
				zhuSkill:true,
				forced:true,
				intro:{
					content:function(group){
						return '已选择了'+get.translation(group)+'势力'
					},
				},
				trigger:{global:['gameDrawAfter','zhuUpdate']},
				filter:function(event,player){
					return !player.storage.bingzhao&&player.hasZhuSkill('bingzhao');
				},
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<lib.group.length;i++){
						if(lib.group[i]=='shen') continue;
						if(lib.group[i]=='western'&&!gamehasPlayer(function(current){
							return current.group=='western'
						})) continue;
						list.push(lib.group[i]);
					}
					player.chooseControl(list).set('prompt','秉诏：请选择一个势力').set('ai',function(){
						var listx=list.slice(0);
						list.sort(function(a,b){
							return game.countPlayer(function(current){
								return current.group==b;
							})-game.countPlayer(function(current){
								return current.group==a;
							});
						})
						return listx[0];
					});
					'step 1'
					var group=result.control;
					player.popup(get.translation(group)+'势力',get.groupnature(group,'raw'));
					game.log(player,'选择了','#y'+get.translation(group)+'势力');
					player.storage.bingzhao=group;
					player.markSkill('bingzhao');
				},
			},
			baijia:{
				audio:2,
				unique:true,
				juexingji:true,
				ai:{
					combo:'guju'
				},
				trigger:{player:'phaseBegin'},
				forced:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return player.hasSkill('guju')&&player.storage.guju>=7;
				},
				content:function(){
					player.awakenSkill('baijia');
					player.gainMaxHp();
					player.recover();
					var list=game.filterPlayer();
					for(var i=0;i<list.length;i++){
						if(list[i]!=player&&!list[i].hasSkill('zongkui_mark')){
							list[i].addSkill('zongkui_mark');
							player.line(list[i],'green');
						}
					}
					player.removeSkill('guju');
					player.addSkill('bmcanshi');
				}
			},
			bmcanshi:{
				audio:2,
				group:['bmcanshi_add','bmcanshi_remove'],
				subSkill:{
					add:{
						audio:'bmcanshi',
						trigger:{player:'useCard2'},
						filter:function(event,player){
							if(!event.targets||event.targets.length!=1) return false;
							var info=get.info(event.card);
							if(info.multitarget) return false;
							if(info.allowMultiple==false) return false;
							if(info.type=='equip') return false;
							if(info.type=='delay') return false;
							return game.hasPlayer(function(current){
								if(!current.hasSkill('zongkui_mark')) return false;
								return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,player,current);
							});
						},
						direct:true,
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt2('bmcanshi'),[1,Infinity],function(card,player,target){
								if(!target.hasSkill('zongkui_mark')) return false;
								var trigger=_status.event.getTrigger();
								return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,player,target);
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,_status.event.getTrigger().card,player,player);
							});
							'step 1'
							if(result.bool){
								if(!event.isMine()&&!_status.connectMode) game.delayx();
								event.targets=result.targets.slice(0);
								for(var i=0;i<event.targets.length;i++){
									event.targets[i].removeSkill('zongkui_mark');
								}
							}
							else{
								event.finish();
							}
							'step 2'
							player.logSkill('bmcanshi',event.targets);
							trigger.targets.addArray(event.targets);
						}
					},
					remove:{
						audio:'bmcanshi',
						trigger:{
							target:'useCardToTarget',
						},
						check:function(event,player){
							return get.attitude(event.player,player)<0&&get.effect(player,event.card,event.player,player)<0;
						},
						logTarget:'player',
						filter:function(event,player){
							if(!event.targets||event.targets.length!=1) return false;
							return event.player.hasSkill('zongkui_mark');
						},
						content:function(){
							trigger.getParent().excluded.add(player);
							game.delay();
							trigger.player.removeSkill('zongkui_mark');
						}
					}
				}
			},
			guju:{
				audio:2,
				init:function(player){
					player.storage.guju=0;
				},
				intro:{
					content:'已因此技能获得#张牌'
				},
				trigger:{global:'damageEnd'},
				forced:true,
				filter:function(event,player){
					return event.player!=player&&event.player.isAlive()&&event.player.hasSkill('zongkui_mark');
				},
				content:function(){
					'step 0'
					player.draw();
					player.storage.guju++;
					player.markSkill('guju');
					'step 1'
					if(player.hasZhuSkill('bingzhao',trigger.player)&&trigger.player.group==player.storage.bingzhao){
						trigger.player.chooseBool(get.prompt2('bingzhao',player)).ai=function(){
							return get.attitude(trigger.player,player)>1;
						};
					}
					else event.finish();
					'step 2'
					if(result.bool){
						trigger.player.logSkill('bingzhao',player);
						player.draw();
						player.storage.guju++;
						player.markSkill('guju');
					}
				},
				ai:{
					combo:'zongkui'
				}
			},
			zongkui:{
				trigger:{player:'phaseBegin',global:'roundStart'},
				direct:true,
				audio:2,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						if(event.name=='roundStart'&&!current.isMinHp()) return false;
						return current!=player&&!current.hasSkill('zongkui_mark');
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zongkui'),function(card,player,target){
						if(_status.event.round&&!target.isMinHp()) return false;
						return target!=player&&!target.hasSkill('zongkui_mark');
					}).set('ai',function(target){
						var num=target.isMinHp()?0.5:(1+Math.random());
						if(get.attitude(_status.event.player,target)<0){
							num+=0.5;
						}
						return num;
					}).set('round',event.triggername=='roundStart');
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('zongkui',target);
						target.addSkill('zongkui_mark');
					}
				},
				subSkill:{
					mark:{
						mark:true,
						intro:{
							content:'已获得“傀”标记'
						}
					}
				},
				ai:{
					combo:'guju',
					threaten:1.4
				}
			},
			zishu:{
				audio:2,
				locked:true,
				subSkill:{
					discard:{
						trigger:{player:'gainAfter'},
						audio:"zishu",
						forced:true,
						filter:function(event,player){
							return _status.currentPhase!=player;
						},
						content:function(){
							if(!player.storage.zishu){
								player.storage.zishu=[];
							}
							player.storage.zishu.addArray(trigger.cards);
						}
					},
					discard2:{
						trigger:{global:'phaseAfter'},
						audio:"zishu",
						forced:true,
						filter:function(event,player){
							if(_status.currentPhase!=player&&player.storage.zishu){
								var he=player.getCards('he');
								for(var i=0;i<player.storage.zishu.length;i++){
									if(he.contains(player.storage.zishu[i])){
										return true;
									}
								}
								return false;
							}
						},
						content:function(){
							var he=player.getCards('he');
							var list=[];
							for(var i=0;i<player.storage.zishu.length;i++){
								if(he.contains(player.storage.zishu[i])){
									list.push(player.storage.zishu[i])
								}
							}
							player.$throw(list);
							player.lose(list,ui.discardPile,'visible');
							game.log(player,'将',list,'置入弃牌堆');
						}
					},
					discard3:{
						trigger:{global:'phaseBegin'},
						silent:true,
						content:function(){
							delete player.storage.zishu;
						}
					},
					draw:{
						trigger:{player:'gainAfter'},
						audio:"zishu",
						forced:true,
						filter:function(event,player){
							if(_status.currentPhase!=player) return false;
							return event.getParent(2).name!='zishu_draw';
						},
						content:function(){
							player.draw('nodelay');
						}
					}
				},
				ai:{
					threaten:1.2,
					nogain:1
				},
				group:['zishu_draw','zishu_discard','zishu_discard2','zishu_discard3']
			},
			yingyuan:{
				audio:2,
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					if(player.storage.yingyuan&&player.storage.yingyuan.contains(event.card.name)){
						return false;
					}
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].isInPile()) return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('yingyuan'),'将'+get.translation(trigger.cards)+'交给一名其他角色',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						if(target.hasJudge('lebu')) return 0;
						var att=get.attitude(_status.event.player,target);
						if(att<3) return 0;
						if(target.hasSha()&&_status.event.sha){
							att/=5;
						}
						if(event.wuxie&&target.needsToDiscard(1)){
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
						player.logSkill('yingyuan',result.targets[0]);
						result.targets[0].gain(list,'gain2');
						if(!player.storage.yingyuan){
							player.storage.yingyuan=[];
						}
						player.storage.yingyuan.push(trigger.card.name);
					}
				},
				group:'yingyuan_clear',
				subSkill:{
					clear:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.yingyuan;
						}
					}
				},
				ai:{
					threaten:1.8
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
					if(player.storage.choulve){
						str+='若其如此做，视为你使用【'+get.translation(player.storage.choulve)+'】';
					}
					var goon=true;
					if(player.storage.choulve){
						goon=game.hasPlayer(function(current){
							return player.canUse(player.storage.choulve,current)&&get.effect(current,player.storage.choulve,player,player)>0;
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
							player.storage.choulve?('若如此做，视为'+get.translation(player)+
							'使用【'+get.translation(player.storage.choulve)+'】'):null).set('ai',function(card){
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
						if(player.storage.choulve){
							player.chooseUseTarget(player.storage.choulve,true,false);
						}
					}
				},
				group:'choulve_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						silent:true,
						content:function(){
							if(trigger.card&&get.info(trigger.card).enable&&get.type(trigger.card)!='delay'){
								player.storage.choulve={name:trigger.card.name};
							}
						}
					}
				}
			},
			polu:{
				audio:2,
				trigger:{player:['phaseBegin','damageEnd']},
				forced:true,
				filter:function(event,player){
					return !player.getEquip('ly_piliche');
				},
				content:function(){
					if(trigger.name=='phase'){
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
			shuimeng:{
				audio:true,
				trigger:{player:'phaseUseAfter'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h');
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('shuimeng'),function(card,player,target){
						return player.canCompare(target);
					}).set('ai',function(target){
						if(!_status.event.goon) return 0;
						return -get.attitude(_status.event.player,target);
					}).set('goon',player.needsToDiscard()||player.hasCard(function(card){
						var val=get.value(card);
						if(val<0) return true;
						if(val<=5){
							return card.number>=11;
						}
						if(val<=6){
							return card.number>=12;
						}
						return false;
					}));
					'step 1'
					if(result.bool){
						player.logSkill('shuimeng',result.targets);
						event.target=result.targets[0];
						player.chooseToCompare(event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.chooseUseTarget({name:'wuzhong'},true);
					}
					else{
						event.target.useCard({name:'guohe'},player);
					}
				}
			},
			qianya:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				direct:true,
				filter:function(event,player){
					return get.type(event.card,'trick')=='trick'&&player.countCards('h');
				},
				content:function(){
					'step 0'
					var nh=player.countCards('h');
					player.chooseCardTarget({
						filterCard:true,
						filterTarget:function(card,player,target){
							return target!=player;
						},
						selectCard:[1,nh],
						ai1:function(card){
							var player=_status.event.player;
							var cardname=_status.event.cardname;
							if(_status.event.du) return -get.value(card);
							else if(_status.event.shuimeng){
								if(cardname=='wuzhong'){
									if(player.needsToDiscard(2-ui.selected.cards.length)){
										return 10-get.value(card);
									}
								}
								else if(cardname=='guohe'){
									if(player.needsToDiscard(-1-ui.selected.cards.length)){
										return 10-get.value(card);
									}
								}
								return 0;
							}
							else if(cardname=='lebu'){
								if(player.needsToDiscard(1-ui.selected.cards.length)){
									return 8-get.value(card);
								}
								else{
									if(!ui.selected.cards.length){
										return 6-get.value(card);
									}
									return 0;
								}
							}
							else if(cardname=='shunshou'){
								if(_status.event.nh<=2) return get.value(card);
							}
							else if(cardname=='huogong'){
								if(player.hp==1) return get.value(card);
							}
							if(ui.selected.cards.length) return 0;
							return 7-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							var nh2=target.countCards('h');
							var num=Math.sqrt(1+nh2);
							var cardname=_status.event.cardname;
							if(_status.event.du) return 0.5-att;
							else if(_status.event.shuimeng){
								return att/num;
							}
							else if(cardname=='lebu'){
								return att/num;
							}
							else if(cardname=='shunshou'){
								if(_status.event.nh<=2) return att/num;
							}
							else if(cardname=='huogong'){
								if(_status.event.player.hp==1) return att/num;
							}
							if(_status.event.nh>nh2+1){
								return att/num;
							}
							return 0;
						},
						du:player.hasCard(function(card){
							return get.value(card)<0;
						}),
						shuimeng:trigger.getParent(2).name=='shuimeng',
						nh:nh,
						cardname:trigger.card.name,
						prompt:get.prompt2('qianya')
					});
					'step 1'
					if(result.bool){
						player.logSkill('qianya',result.targets);
						player.give(result.cards,result.targets[0]);
					}
				}
			},
			xianfu:{
				trigger:{global:'gameDrawAfter'},
				forced:true,
				filter:function(){
					return game.players.length>1;
				},
				audio:6,
				content:function(){
					'step 0'
					player.chooseTarget('选择【先辅】的目标',lib.translate.xianfu_info,true,function(card,player,target){
						return target!=player&&!target.hasSkill('xianfu2');
					}).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(att>0) return att+1;
						if(att==0) return Math.random();
						return att;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						//player.line(target,'green');
						//game.log(target,'成为了','【先辅】','的目标');
						target.storage.xianfu2=player;
						target.addSkill('xianfu2');
					}
				}
			},
			xianfu2:{
				//mark:'character',
				marktext:'辅',
				intro:{
					content:'当你受到伤害后，$受到等量的伤害，当你回复体力后，$回复等量的体力'
				},
				nopop:true,
				trigger:{player:['damageEnd','recoverEnd']},
				forced:true,
				popup:false,
				priority:15,
				filter:function(event,player){
					if(!(player.storage.xianfu2&&player.storage.xianfu2.isIn()&&event.num>0)) return false;
					if(event.name=='damage') return true;
					return player.storage.xianfu2.isDamaged();
				},
				content:function(){
					'step 0'
					game.delayx();
					'step 1'
					player.markSkill('xianfu2');
					var target=player.storage.xianfu2;
					player.line(target,'green');
					target.logSkill('xianfu');
					target[trigger.name](trigger.num,'nosource');
					game.delay();
				},
				group:'xianfu3',
				onremove:true,
			},
			xianfu3:{
				trigger:{global:'dieAfter'},
				silent:true,
				filter:function(event,player){
					return event.player==player.storage.xianfu2;
				},
				content:function(){
					player.removeSkill('xianfu2');
				}
			},
			chouce:{
				trigger:{player:'damageEnd'},
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					player.judge();
					'step 2'
					event.color=result.color;
					if(event.color=='black'){
						player.chooseTarget('弃置一名角色区域内的一张牌',function(card,player,target){
							return target.countCards('hej');
						}).set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att<0){
								att=-Math.sqrt(-att);
							}
							else{
								att=Math.sqrt(att);
							}
							return att*lib.card.guohe.ai.result.target(player,target);
						})
					}
					else{
						var next=player.chooseTarget('令一名角色摸一张牌');
						var xianfu=game.findPlayer(function(current){
							return current.hasSkill('xianfu2')&&current.storage.xianfu2==player;
						});
						if(xianfu){
							next.set('prompt2','（若目标为'+get.translation(xianfu)+'则改为摸两张牌）');
						}
						next.set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target)/Math.sqrt(1+target.countCards('h'));
							if(target.storage.xianfu2==player) return att*2;
							return att;
						})
					}
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						if(event.color=='black'){
							player.discardPlayerCard(target,'hej',true);
						}
						else{
							if(target.hasSkill('xianfu2')&&target.storage.xianfu2==player){
								target.markSkill('xianfu2');
								target.draw(2);
							}
							else{
								target.draw();
							}
						}
					}
					'step 4'
					if(--event.num>0){
						player.chooseBool(get.prompt2('chouce'));
					}
					else{
						event.finish();
					}
					'step 5'
					if(result.bool){
						player.logSkill('chouce');
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
								if(target.hp>=4) return [1,get.tag(card,'damage')*1.5];
								if(target.hp==3) return [1,get.tag(card,'damage')*1];
								if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
							}
						}
					}
				}
			},
			fuqi:{
				audio:2,
				forced:true,
				trigger:{
					player:"useCard",
				},
				filter:function(event,player){
					return event.card&&(get.type(event.card)=='trick'||get.type(event.card)=='basic'&&!['shan','tao','jiu','du'].contains(event.card.name))&&game.hasPlayer(function(current){
						return current!=player&&get.distance(current,player)<=1;
					});
				},
				content:function(){
					trigger.directHit.addArray(game.filterPlayer(function(current){
						return current!=player&&get.distance(current,player)<=1;
					}));
				},
			},
			wylianji:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hasCard(lib.skill.wylianji.filterCard);
				},
				check:function(card){
					if(card.name=='sha') return 1;
					else{
						if(get.tag(card,'damage')){
							if(get.tag(card,'multineg')) return 5;
							return 2;
						}
					}
					return 0;
				},
				filterCard:function(card){
					return get.name(card)=='sha'||(get.type(card,'trick')=='trick'&&get.color(card)=='black'&&!get.info(card).multitarget)&&get.info(card).enable;
				},
				filterTarget:function(card,player,target){
					return target!=player&&!target.isMin()&&
					(player.canUse(card,target,false)||game.hasPlayer(function(current){
						return current!=player&&target.canUse(card,current);
					}));
				},
				discard:false,
				lose:true,
				delay:0,
				content:function(){
					'step 0'
					player.showCards(get.translation(player)+'对'+get.translation(target)+'发动了【连计】',cards);
					'step 1'
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
					target.chooseUseTarget(true,equip1,'noanimate','nopopup');
					game.delay();
					'step 2'
					game.updateRoundNumber();
					var card=cards[0];
					var bool1=game.hasPlayer(function(current){
						return current!=player&&target.canUse(card,current);
					});
					var bool2=player.canUse(card,target,false);
					if(bool1&&bool2){
						target.chooseControl(function(){
							return 0;
						}).set('choiceList',[
							'对除'+get.translation(player)+'以外的角色使用'+get.translation(cards)+'，并将装备区里的武器牌交给该牌的一个目标角色',
							'视为'+get.translation(player)+'对你使用'+get.translation(cards)+'，并将装备区内的武器牌交给'+get.translation(player)
						]);
					}
					else if(bool1){
						event.directindex=0;
					}
					else if(bool2){
						event.directindex=1;
					}
					else{
						event.finish();
					}
					'step 3'
					var card=cards[0];
					if(result&&typeof event.directindex!='number'){
						event.directindex=result.index;
					}
					if(event.directindex==1){
						event.insert(lib.skill.wylianji.content_use,{
							player:player,
							target:target,
							card:card
						})
					}
					else{
						event.insert(lib.skill.wylianji.content_give,{
							player:target,
							card:card,
							targets:game.filterPlayer(function(current){
								return current!=player;
							})
						});
					}
				},
				content_use:function(){
					'step 0'
					player.useCard(card,target);
					'step 1'
					if(!get.owner(card)){
						target.gain(card,'gain2');
					}
					'step 2'
					var equip1=target.getEquip(1);
					if(equip1){
						game.delay();
						target.give(equip1,player);
						target.line(player);
					}
				},
				content_give:function(){
					'step 0'
					var select=get.select(get.info(card).selectTarget);
					if(select[1]==-1){
						for(var i=0;i<targets.length;i++){
							if(!player.canUse(card,targets[i])){
								targets.splice(i--,1);
							}
						}
						if(targets.length){
							player.useCard(card,targets);
						}
						event.list=targets.slice(0);
						event.goto(2);
					}
					else{
						player.chooseTarget(select,'选择'+get.translation(card)+'的目标',true,function(cardx,player,target){
							var card=_status.event.card;
							return _status.event.targets.contains(target)&&player.canUse(card,target);
						}).set('ai',function(target){
							var card=_status.event.card;
							var player=_status.event.player;
							return get.effect(target,card,player,player);
						}).set('targets',targets).set('card',card);
					}
					'step 1'
					if(result.bool){
						player.useCard(card,result.targets);
						event.list=result.targets.slice(0);
					}
					'step 2'
					var equip1=player.getEquip(1);
					if(equip1){
						for(var i=0;i<event.list.length;i++){
							if(event.list[i].isDead()) event.list.splice(i--,1);
						}
						if(event.list.length>1){
							player.chooseTarget(true,'将'+get.translation(equip1)+'交给一名角色',function(card,player,target){
								return _status.event.list.contains(target);
							}).set('ai',function(target){
								return get.attitude(player,target);
							}).set('list',_status.event.list);
							event.equip1=equip1;
						}
						else{
							if(event.list.length==1){
								player.give(equip1,event.list[0]);
								player.line(event.list);
							}
							event.finish();
						}
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool&&result.targets.length&&event.equip1){
						player.give(event.equip1,result.targets[0]);
						player.line(result.targets);
					}
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								var bool=(card.name!='sha');
								if(game.hasPlayer(function(current){
									return target.canUse(card,current,bool)&&get.effect(current,card,target,player)>0;
								})){
									var num=1;
									if(target.getEquip(1)){
										num=0.6;
									}
									if(target.hasSkillTag('noe')) 2*num;
									return num;
								}
							}
							return 0;
						}
					}
				}
			},
			moucheng:{
				audio:2,
				derivation:['jingong','wy_meirenji','wy_xiaolicangdao'],
				trigger:{global:'damageEnd'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.source!=player&&event.getParent(2).name=='useCard'&&event.getParent(3).name=='wylianjiInserted';
				},
				init:function(player){
					player.storage.moucheng=0;
				},
				intro:{
					content:'已造成#点伤害'
				},
				unique:true,
				juexingji:true,
				content:function(){
					player.storage.moucheng+=trigger.num;
					if(player.hasSkill('moucheng')){
						player.markSkill('moucheng');
						player.syncStorage('moucheng');
					}
					if(player.storage.moucheng>=3){
						event.trigger('mouchengAwaken');
					}
				},
				group:'moucheng_awaken',
				subSkill:{
					awaken:{
						trigger:{player:'mouchengAwaken'},
						forced:true,
						skillAnimation:true,
						animationColor:'gray',
						content:function(){
							player.awakenSkill('moucheng');
							player.removeSkill('wylianji');
							player.addSkill('jingong');
						}
					}
				}
			},
			jingong:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he',function(card){
						return card.name=='sha'||get.type(card)=='equip';
					});
				},
				delay:0,
				usable:1,
				content:function(){
					'step 0'
					var list=get.inpile('trick').randomGets(2);
					if(Math.random()<0.5){
						list.push('wy_meirenji');
					}
					else{
						list.push('wy_xiaolicangdao');
					}
					for(var i=0;i<list.length;i++){
						list[i]=['锦囊','',list[i]];
					}
					player.chooseButton(['矜功',[list,'vcard']]).set('filterButton',function(button,player){
						return game.hasPlayer(function(current){
							return player.canUse(button.link[2],current,true,false);
						});
					}).set('ai',function(button){
						var player=_status.event.player;
						var name=button.link[2];
						if(game.hasPlayer(function(current){
							return player.canUse(name,current)&&get.effect(current,{name:name},player,player)>0;
						})){
							if(name=='wy_meirenji'||name=='wy_xiaolicangdao') return Math.random()+0.5;
							return Math.random();
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						var name=result.links[0][2];
						event.fakecard={name:name};
						player.chooseCardTarget({
							filterCard:function(card){
								return card.name=='sha'||get.type(card)=='equip';
							},
							position:'he',
							filterTarget:lib.filter.filterTarget,
							selectTarget:lib.filter.selectTarget,
							ai1:function(card){
								return 7-get.value(card);
							},
							ai2:function(target){
								var card=_status.event.fakecard;
								var player=_status.event.player;
								return get.effect(target,card,player,player);
							},
							_get_card:event.fakecard,
							prompt:'将一张装备牌或【杀】当作'+get.translation(name)+'使用'
						}).set('fakecard',event.fakecard);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.useCard(event.fakecard,result.cards,result.targets);
						player.addTempSkill('jingong2');
					}
				},
				ai:{
					order:2,
					result:{
						player:function(player){
							if((player.hp<=2||player.needsToDiscard())&&!player.getStat('damage')) return 0;
							return 1;
						}
					}
				}
			},
			jingong2:{
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return !player.getStat('damage');
				},
				content:function(){
					player.loseHp();
				}
			},
			jingong3:{},
			weikui:{
				audio:'kuiwei',
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h');
				},
				content:function(){
					'step 0'
					player.loseHp();
					'step 1'
					if(target.countCards('h','shan')){
						player.viewHandcards(target);
						player.useCard({name:'sha'},target,false);
						player.storage.weikui2=target;
						player.addTempSkill('weikui2');
					}
					else{
						player.discardPlayerCard(target,'visible',true,'h');
					}
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(player.hp<=2) return 0;
							if(player.hp==3) return target.hp<=2?-1:0;
							return -1;
						}
					}
				}
			},
			weikui2:{
				onremove:true,
				mod:{
					globalFrom:function(from,to){
						if(to==from.storage.weikui2) return -Infinity;
					}
				},
				mark:'character',
				intro:{
					content:'与$的距离视为1直到回合结束'
				},
			},
			lizhan:{
				audio:'yanzheng',
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isDamaged()){
							return true;
						}
					}
					return false;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('lizhan'),'令任意名已受伤的角色各摸一张牌',[1,Infinity],function(card,player,target){
						return target.isDamaged();
					}).set('ai',function(target){
						return get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						player.logSkill('lizhan',result.targets);
						game.asyncDraw(result.targets);
					}
				},
				ai:{
					expose:0.3,
					threaten:1.3
				}
			},
			zhaohuo:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				priority:12,
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
				trigger:{target:'useCardToBegin'},
				frequent:true,
				filter:function(event,player){
					if(event.player.hp<=player.hp) return false;
					if(event.targets.length>1) return false;
					var hs=player.getCards('h');
					var names=['sha','shan','tao','jiu'];
					for(var i=0;i<hs.length;i++){
						names.remove(hs[i].name);
					}
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
					var names=['sha','shan','tao','jiu'];
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
					if(!player.countCards('h',function(card){
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
						var cards=player.getCards('h',function(card){
							return get.type(card)!='basic';
						});
						var target=result.targets[0];
						var types=[];
						for(var i=0;i<cards.length;i++){
							types.add(get.type(cards[i]));
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
					return !event.player.isMad()&&!_status.connectMode;
				},
				content:function(){
					player.forceCountChoose={chooseToUse:5,default:5};
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
							cardEnabled:function(card,player){
								if(player.forceCountChoose&&player.forceCountChoose.chooseToUse<=0) return false;
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						//audio:'kuangcai',
						silent:true,
						popup:false,
						usable:5,
						filter:function(event,player){
							if(!player.forceCountChoose){
								return false;
							}
							return true;
						},
						content:function(){
							player.draw();
							player.forceCountChoose.chooseToUse--;
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
						content:function(){
							delete player.forceCountChoose;
							//ui.auto.show();
							player.removeSkill('kuangcai_use');
							player.removeSkill('kuangcai_cancel');
							if(player.storage.counttrigger) delete player.storage.counttrigger.kuangcai_use;
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
					if(event.cards){
						if(event.cards.length<2) return false;
						var suits=[];
						for(var i=0;i<event.cards.length;i++){
							var suit=get.suit(event.cards[i]);
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
			fenyue:{
				enable:'phaseUse',
				filter:function(event,player){
					if(!player.countCards('h')) return false;
					var num;
					if(get.mode()=='identity'){
						num=game.countPlayer(function(current){
							return current.identity=='zhong'||current.identity=='mingzhong';
						});
					}
					else{
						num=1;
					}
					if(player.getStat().skill.fenyue>=num) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				ai:{
					order:2.8,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)<0&&player.hasCard(function(card){
								return (card.number>=9&&get.value(card)<=5)||get.value(card)<=3;
							})){
								return get.effect(target,{name:'sha'},player,target);
							}
							else{
								return 0;
							}
						}
					}
				},
				content:function(){
					'step 0'
					player.chooseToCompare(target);
					'step 1'
					if(result.bool){
						player.chooseControl(function(){
							return 1;
						}).set('choiceList',[
							'令'+get.translation(target)+'不能使用或打出手牌直到回合结束',
							'视为对'+get.translation(target)+'使用一张杀（不计入次数限制）'
						]);
					}
					else{
						var evt=_status.event.getParent('phaseUse');
						if(evt&&evt.name=='phaseUse'){
							evt.skipped=true;
						}
						event.finish();
					}
					'step 2'
					if(result.control=='选项一'){
						target.addTempSkill('fenyue2');
					}
					else{
						player.useCard({name:'sha'},target,false);
					}
				}
			},
			fenyue2:{
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
			zhuoshui:{
				audio:'huoshui',
				trigger:{player:'phaseBegin'},
				forced:true,
				content:function(){
					game.countPlayer(function(current){
						if(current!=player&&!current.hasSkill('fengyin')){
							player.line(current,'green');
							current.addTempSkill('fengyin');
						}
					});
				}
			},
			zqingcheng:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he',{type:'equip'});
				},
				filterCard:{type:'equip'},
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				check:function(card){
					var player=_status.event.player;
					if(game.hasPlayer(function(current){
						return get.attitude(player,current)>2&&current.isTurnedOver();
					})){
						return 10-get.value(card,player);
					}
					return 6-get.value(card,player);
				},
				content:function(){
					'step 0'
					target.turnOver();
					'step 1'
					target.draw(2);
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('noturn')) return 0;
							if(target.isTurnedOver()) return 2;
							return -0.5;
						}
					}
				}
			},
			zfengshi:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countCards('e');
				},
				logTarget:'target',
				check:function(event,player){
					if(event.target.hasSkillTag('noe')) return false;
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					trigger.target.chooseToDiscard('e',true);
				}
			},
			chuanxin:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					if(!_status.event.getParent('phaseUse')) return false;
					if(event.card&&(event.card.name=='sha'||event.card.name=='juedou')){
						if(get.mode()=='guozhan'){
							return (event.player.identity!='qun'||player.identity=='ye')&&
							!event.player.isUnseen()&&event.player.hasViceCharacter();
						}
						else{
							var info=lib.character[event.player.name];
							if(!info) return false;
							var skills=event.player.getSkills();
							for(var i=0;i<info[3].length;i++){
								if(lib.skill[info[3][i]].fixed) continue;
								if(skills.contains(info[3][i])) return true;
							}
						}
					}
					return false;
				},
				logTarget:'player',
				check:function(event,player){
					if(get.mode()=='guozhan'){
						if(get.guozhanRank(event.player.name2)<4) return false;
					}
					if(event.player.hasSkill('subplayer')) return false;
					if(get.attitude(player,event.player)<0){
						if(event.player.hp==1) return false;
						return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					trigger.cancel();
					if(trigger.player.countCards('e')){
						trigger.player.chooseControl(function(event,player){
							if(get.mode()=='guozhan'&&get.guozhanRank(event.player.name2)<4) return 1;
							if(player.hp==1) return 1;
							if(player.hp==2&&player.countCards('e')>=2) return 1;
							return 0;
						}).set('choiceList',['弃置装备区内的所有牌并失去一点体力',get.mode()=='guozhan'?'移除副将牌':'随机移除武将牌上的一个技能']);
					}
					else{
						event._result={index:1};
					}
					'step 1'
					if(result.index==1){
						if(get.mode()!='guozhan'){
							var info=lib.character[trigger.player.name];
							var skills=trigger.player.getSkills();
							var list=[];
							for(var i=0;i<info[3].length;i++){
								if(lib.skill[info[3][i]].fixed) continue;
								if(skills.contains(info[3][i])){
									list.push(info[3][i]);
								}
							}
							if(list.length){
								var skill=list.randomGet();
								trigger.player.popup(skill);
								trigger.player.disableSkill('chuanxin_disable',skill,true);
							}
						}
						else{
							trigger.player.removeCharacter(1);
						}
					}
					else{
						trigger.player.discard(trigger.player.getCards('e'));
						trigger.player.loseHp();
					}
				}
			},
			hengjiang:{
				trigger:{player:'damageEnd'},
				check:function(event,player){
					return get.attitude(player,_status.currentPhase)<0||!_status.currentPhase.needsToDiscard(2);
				},
				filter:function(event){
					return _status.currentPhase&&_status.currentPhase.isIn()&&event.num>0;
				},
				//logTarget:'source',
				content:function(){
					var source=_status.currentPhase;
					if(source.hasSkill('hengjiang2')){
						source.storage.hengjiang2+=trigger.num;
						source.storage.hengjiang3.add(player);
						source.updateMarks();
					}
					else{
						source.storage.hengjiang3=[player];
						source.storage.hengjiang2=trigger.num;
						source.addTempSkill('hengjiang2');
					}
				},
				ai:{
					maixie_defend:true,
				}
			},
			hengjiang2:{
				mark:true,
				intro:{
					content:'手牌上限-#'
				},
				mod:{
					maxHandcard:function(player,num){
						return num-player.storage.hengjiang2;
					}
				},
				onremove:function(player){
					delete player.storage.hengjiang2;
					delete player.storage.hengjiang3;
				},
				trigger:{player:'phaseDiscardEnd'},
				filter:function(event,player){
					if(event.cards&&event.cards.length) return false;
					var players=player.storage.hengjiang3;
					for(var i=0;i<players.length;i++){
						if(players[i].isIn()) return true;
					}
					return false;
				},
				forced:true,
				popup:false,
				content:function(){
					var players=player.storage.hengjiang3;
					for(var i=0;i<players.length;i++){
						if(players[i].isIn()){
							players[i].logSkill('hengjiang');
							players[i].line(player,'green');
						}
					}
					game.asyncDraw(player.storage.hengjiang3);
				}
			},
			shuangren:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				priority:15,
				content:function(){
					'step 0'
					var goon;
					if(player.needsToDiscard()>1){
						goon=player.hasCard(function(card){
							return card.number>10&&get.value(card)<=5;
						});
					}
					else{
						goon=player.hasCard(function(card){
							return (card.number>=9&&get.value(card)<=5)||get.value(card)<=3;
						});
					}
					player.chooseTarget(get.prompt2('shuangren'),function(card,player,target){
						return player.canCompare(target);
					}).set('ai',function(target){
						var player=_status.event.player;
						if(_status.event.goon&&get.attitude(player,target)<0){
							return get.effect(target,{name:'sha'},player,player);
						}
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('shuangren',target);
						player.chooseToCompare(target);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						var target=event.target;
						if(target.identity!='ye'&&target.identity!='unknown'&&game.hasPlayer(function(current){
							if(!player.canUse('sha',current,false)) return false;
							if(target==current) return false;
							if(get.mode()=='guozhan'){
								return target.identity==current.identity;
							}
							return true;
						})){
							var str='对一名';
							if(get.mode()=='guozhan'){
								str+=get.translation(target.identity)+'势力的';
							}
							player.chooseTarget(str+'角色使用一张杀',true,function(card,player,target){
								if(!player.canUse('sha',target,false)) return false;
								if(get.mode()=='guozhan'){
									return target.identity==_status.event.identity;
								}
								return true;
							}).set('ai',function(target){
								var player=_status.event.player;
								return get.effect(target,{name:'sha'},player,player);
							}).set('identity',target.identity);
						}
						else{
							player.useCard({name:'sha'},target,false);
							event.finish();
						}
					}
					else{
						trigger.cancel();
						event.finish();
					}
					'step 3'
					if(result.bool&&result.targets&&result.targets.length){
						player.useCard({name:'sha'},result.targets[0],false);
					}
				}
			},
			kuanshi:{
				audio:2,
				trigger:{player:'phaseEnd'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('kuanshi')).set('ai',function(target){
						if(get.attitude(_status.event.player,target)>0){
							return 1/Math.sqrt(target.hp+1);
						}
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('kuanshi');
						target.storage.kuanshi2=player;
						target.addSkill('kuanshi2');
					}
				}
			},
			kuanshi2:{
				/*mark:'character',
				intro:{
					content:'下一次受到超过1点的伤害时，防止此伤害，然后$跳过下个回合的摸牌阶段'
				},*/
				trigger:{player:'damageBegin4'},
				forced:true,
				filter:function(event,player){
					return event.num>1;
				},
				//priority:-11,
				content:function(){
					trigger.cancel();
					player.storage.kuanshi2.skip('phaseDraw');
					player.removeSkill('kuanshi2');
				},
				group:'kuanshi2_remove',
				onremove:true,
				subSkill:{
					remove:{
						trigger:{global:['phaseBegin','dieAfter']},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.player==player.storage.kuanshi2;
						},
						content:function(){
							player.removeSkill('kuanshi2');
						}
					}
				}
			},
			xiashu:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					'step 0'
					var maxval=0;
					var hs=player.getCards('h');
					for(var i=0;i<hs.length;i++){
						maxval=Math.max(maxval,get.value(hs[i]));
					}
					player.chooseTarget(get.prompt2('xiashu'),lib.filter.notMe).set('ai',function(target){
						var player=_status.event.player;
						var maxval=_status.event.maxval;
						var dh=target.countCards('h')-player.countCards('h');
						var att=get.attitude(player,target);
						if(target.hasSkill('qingjian')) return false;
						if(dh<=0) return 0;
						if(att>0) return 0.1;
						if(maxval>=8) return 0;
						if(att==0) return 0.2;
						if(dh>=3) return dh;
						if(dh==2){
							if(maxval<=7) return dh;
						}
						if(maxval<=6) return dh;
						return 0;

					}).set('maxval',maxval);
					'step 1'
					if(result.bool){
						player.logSkill('xiashu',result.targets);
						event.target=result.targets[0];
						var hs=player.getCards('h');
						event.target.gain(hs,player,'giveAuto');
					}
					else{
						event.finish();
					}
					'step 2'
					var hs=event.target.getCards('h');
					if(!hs.length){
						event.finish();
						return;
					}
					hs.sort(function(a,b){
						return get.value(b,player,'raw')-get.value(a,player,'raw');
					});
					event.target.chooseCard([1,hs.length],'展示至少一张手牌',true).set('ai',function(card){
						var rand=_status.event.rand;
						var list=_status.event.list;
						if(_status.event.att){
							if(ui.selected.cards.length>=Math.ceil(list.length/2)) return 0;
							var value=get.value(card);
							if(_status.event.getParent().player.isHealthy()){
								value+=(get.tag(card,'damage')?1.5:0)+(get.tag(card,'draw')?2:0);
							}
							return value;
						}
						if(ui.selected.cards.length>=Math.floor(list.length/2)) return 0;
						return (list.indexOf(card)%2==rand)?1:0;
					}).set('rand',(Math.random()<0.6)?1:0).set('list',hs).set('att',get.attitude(event.target,player)>0);
					'step 3'
					event.target.showCards(result.cards);
					event.cards1=result.cards;
					event.cards2=event.target.getCards('h',function(card){
						return !event.cards1.contains(card);
					});
					'step 4'
					var choice;
					var num1=event.cards1.length;
					var num2=event.cards2.length;
					if(get.attitude(event.target,player)>0&&num1>=num2){
						choice=0;
					}
					else if(num1==num2){
						choice=(Math.random()<0.45)?0:1;
					}
					else if(num1>num2){
						if(num1-num2==1){
							choice=(Math.random()<0.6)?0:1;
						}
						else{
							choice=0;
						}
					}
					else{
						if(num2-num1==1){
							choice=(Math.random()<0.6)?1:0;
						}
						else{
							choice=1;
						}
					}
					player.chooseControl(function(event,player){
						return _status.event.choice;
					}).set('choiceList',['获得'+get.translation(event.target)+'展示的牌',
					'获得'+get.translation(event.target)+'未展示的牌']).set('choice',choice);
					'step 5'
					if(result.index==0){
						player.gain(event.cards1,target,'give');
					}
					else{
						player.gain(event.cards2,target,'giveAuto');
					}
				},
				ai:{
					expose:0.1
				}
			},
			sheyan:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				filter:function(event,player){
					if(!event.targets||!event.targets.contains(player)) return false;
					var info=get.info(event.card);
					if(info.type!='trick') return false;
					if(info.multitarget) return false;
					if(event.targets.length>1) return true;
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&lib.filter.targetEnabled2(event.card,event.player,current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					var bool1=(trigger.targets.length>1);
					var bool2=game.hasPlayer(function(current){
						return !trigger.targets.contains(current)&&lib.filter.targetEnabled2(trigger.card,trigger.player,current);
					});
					if(bool1&&bool2){
						player.chooseControlList(get.prompt('sheyan'),['为'+get.translation(trigger.card)+'增加一个目标','为'+get.translation(trigger.card)+'减少一个目标'],function(event,player){
							if(_status.event.add) return 0;
							return 1;
						}).set('add',get.effect(player,trigger.card,trigger.player,player)>=0);
					}
					else if(bool2){
						event.type='add';
						event.goto(2);
						event.unchosen=true;
					}
					else{
						event.type='remove';
						event.goto(2);
						event.unchosen=true;
					}
					'step 1'
					if(result.control=='cancel2'){
						event.finish();
					}
					else if(result.index==1){
						event.type='remove';
					}
					else{
						event.type='add';
					}
					'step 2'
					if(event.type=='add'){
						player.chooseTarget(event.unchosen?get.prompt('sheyan'):null,'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
							var trigger=_status.event.getTrigger();
							return !trigger.targets.contains(target)&&lib.filter.targetEnabled2(trigger.card,trigger.player,target);
						}).set('ai',function(target){
							var trigger=_status.event.getTrigger();
							return get.effect(target,trigger.card,trigger.player,_status.event.player);
						});
					}
					else{
						player.chooseTarget(event.unchosen?get.prompt('sheyan'):null,'为'+get.translation(trigger.card)+'减少一个目标',function(card,player,target){
							return _status.event.targets.contains(target);
						}).set('ai',function(target){
							var trigger=_status.event.getTrigger();
							return -get.effect(target,trigger.card,trigger.player,_status.event.player);
						}).set('targets',trigger.targets);
					}
					'step 3'
					if(result.bool){
						if(!event.isMine()) game.delayx();
						event.target=result.targets[0];
					}
					else{
						event.finish();
					}
					'step 4'
					player.logSkill('sheyan',event.target);
					if(event.type=='add'){
						trigger.targets.push(event.target);
					}
					else{
						trigger.getParent().excluded.add(event.target);
					}
				},
				ai:{
					expose:0.2
				}
			},
			bingzheng:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('bingzheng'),function(card,player,target){
						return target.countCards('h')!=target.hp;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						var nh=target.countCards('h');
						if(att>0){
							if(nh==target.hp-1){
								if(player==target) return att+1;
								return att+2;
							}
							if(player==target&&player.needsToDiscard()) return att/3;
							return att;
						}
						else{
							if(nh==target.hp+1) return -att;
							if(nh==0) return 0;
							return -att/2;
						}
					});
					'step 1'
					if(result.bool){
						player.logSkill('bingzheng',result.targets);
						event.target=result.targets[0];
						if(event.target.countCards('h')){
							player.chooseControl(function(event,player){
								var target=event.target;
								if(get.attitude(player,target)<0) return 1;
								return 0;
							}).set('choiceList',['令'+get.translation(event.target)+'摸一张牌',
							'令'+get.translation(event.target)+'弃置一张手牌']);
						}
						else{
							event.directfalse=true;
						}
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.directfalse||result.index==0){
						event.target.draw();
					}
					else{
						event.target.chooseToDiscard('h',true);
					}
					'step 3'
					if(event.target.countCards('h')==event.target.hp){
						player.draw();
						if(event.target==player){
							event.finish();
							return;
						}
						var next=player.chooseCard('是否交给'+get.translation(event.target)+'一张牌？','he');
						next.set('ai',function(card){
							if(get.position(card)!='h') return 0;
							if(_status.event.shan){
								return card.name=='shan'?1:0;
							}
							if(_status.event.goon){
								return 10-get.value(card);
							}
							return -get.value(card,_status.event.player,'raw');
						});
						if(get.attitude(player,event.target)>1&&
							player.countCards('h','shan')>1&&player.countCards('h')>event.target.countCards('h')){
							next.set('shan',true);
						}
						if(get.attitude(player,event.target)>0&&player.needsToDiscard()){
							next.set('goon',true);
						}
					}
					else{
						event.finish();
					}
					'step 4'
					if(result.bool){
						event.target.gain(result.cards,player,'giveAuto');
					}
				},
				ai:{
					expose:0.2,
					threaten:1.4
				}
			},
			fuman:{
				audio:2,
				enable:'phaseUse',
				filterTarget:function(card,player,target){
					return !target.hasSkill('fuman2')&&target!=player;
				},
				filter:function(event,player){
					return player.countCards('h','sha');
				},
				discard:false,
				prepare:'give',
				filterCard:{name:'sha'},
				content:function(){
					target.gain(cards,player);
					target.storage.fuman3=cards[0];
					target.storage.fuman2=player;
					target.addTempSkill('fuman2',{player:'phaseAfter'});
				},
				check:function(card){
					return 6-get.value(card);
				},
				ai:{
					order:2,
					result:{
						target:function(player,target){
							if(!target.hasSha()) return 1.2;
							return 1;
						}
					}
				}
			},
			fuman2:{
				trigger:{player:'useCard'},
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.card==player.storage.fuman3&&player.storage.fuman2.isIn();
				},
				mark:true,
				intro:{
					content:'下个回合结束之前使用“抚蛮”牌时，令$一张牌'
				},
				content:function(){
					'step 0'
					game.delayx();
					'step 1'
					player.line(player.storage.fuman2,'green');
					player.storage.fuman2.draw();
					player.storage.fuman2.logSkill('fuman');
				},
				onremove:function(player){
					delete player.storage.fuman2;
					delete player.storage.fuman3;
				},
				ai:{
					effect:{
						player:function(card,player,target,current){
							if(card.name=='sha'&&card!=player.storage.fuman3&&
							player.storage.fuman2.isIn()&&get.attitude(player,player.storage.fuman2)>0){
								return 'zeroplayertarget';
							}
						}
					}
				}
			},
			qizhou:{
				trigger:{player:['phaseBefore','equipAfter','loseAfter']},
				forced:true,
				popup:false,
				derivation:['mashu','reyingzi','duanbing','fenwei'],
				filter:function(event,player){
					if(player.equiping) return false;
					var suits=[];
					var es=player.getCards('e');
					for(var i=0;i<es.length;i++){
						suits.add(get.suit(es[i]));
					}
					if(player.additionalSkills.qizhou){
						return player.additionalSkills.qizhou.length!=suits.length;
					}
					else{
						return suits.length>0;
					}
				},
				content:function(){
					var suits=[];
					var es=player.getCards('e');
					for(var i=0;i<es.length;i++){
						suits.add(get.suit(es[i]));
					}
					player.removeAdditionalSkill('qizhou');
					switch(suits.length){
						case 1:player.addAdditionalSkill('qizhou',['mashu']);break;
						case 2:player.addAdditionalSkill('qizhou',['mashu','reyingzi']);break;
						case 3:player.addAdditionalSkill('qizhou',['mashu','reyingzi','duanbing']);break;
						case 4:player.addAdditionalSkill('qizhou',['mashu','reyingzi','duanbing','fenwei']);break;
					}
				},
				ai:{
					threaten:1.2
				}
			},
			shanxi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:{color:'red',type:'basic'},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')&&get.distance(player,target,'attack')<=1;
				},
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					player.discardPlayerCard(target,true);
					'step 1'
					if(result.bool){
						if(result.cards[0].name=='shan'){
							player.viewHandcards(target);
						}
						else{
							target.viewHandcards(player);
						}
					}
				},
				ai:{
					order:8,
					result:{
						target:-1
					}
				}
			},
			fenxun:{
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					player.storage.fenxun2=target;
					player.addTempSkill('fenxun2');
				},
				check:function(card){
					if(card.name=='sha'&&_status.event.player.countCards('h','sha')<=1) return 0;
					return 6-get.value(card);
				},
				filterCard:true,
				ai:{
					order:4,
					result:{
						player:function(player,target){
							if(get.distance(player,target)<=1) return 0;
							var hs=player.getCards('h','shunshou');
							if(hs.length&&player.canUse(hs[0],target,false)){
								return 1;
							}
							var geteff=function(current){
								return player.canUse('sha',current,false,true)&&get.effect(current,{name:'sha'},player,player)>0;
							}
							if(player.hasSha()&&geteff(target)){
								var num=game.countPlayer(function(current){
									return current!=player&&get.distance(player,current)<=1&&geteff(current);
								});
								if(num==0){
									if(game.hasPlayer(function(current){
										return player.canUse('sha',current)&&geteff(current)&&current!=target;
									})){
										return 1;
									}
								}
								else if(num==1){
									return 1;
								}
							}
							return 0;
						}
					}
				}
			},
			fenxun2:{
				mark:'character',
				onremove:true,
				intro:{
					content:'到$的距离视为1'
				},
				mod:{
					globalFrom:function(from,to){
						if(to==from.storage.fenxun2){
							return -Infinity;
						}
					}
				}
			},
			duanbing:{
				audio:2,
				audioname:['heqi'],
				trigger:{player:'useCard2'},
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					return game.hasPlayer(function(current){
						return !event.targets.contains(current)&&get.distance(player,current)<=1&&player.canUse('sha',current);
					});
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('duanbing'),'为'+get.translation(trigger.card)+'增加一个目标',function(card,player,target){
						return !_status.event.sourcex.contains(target)&&get.distance(player,target)<=1&&player.canUse('sha',target);
					}).set('sourcex',trigger.targets).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'sha'},player,player);
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
					player.logSkill('duanbing',event.target);
					trigger.targets.push(event.target);
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(card.name=='sha'){
								if(player._duanbingtmp) return;
								player._duanbingtmp=true;
								if(get.effect(target,{name:'sha'},player,player)<=0){
									delete player._duanbingtmp;
									return;
								}
								if(game.hasPlayer(function(current){
									return current!=target&&get.distance(player,current)<=1&&
									player.canUse('sha',current)&&get.effect(current,{name:'sha'},player,player)>0;
								})){
									delete player._duanbingtmp;
									return [1,1];
								}
								delete player._duanbingtmp;
							}
						}
					}
				}
			},
			fuhan:{
				audio:2,
				trigger:{player:'phaseBefore'},
				unique:true,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				forceunique:true,
				filter:function(event,player){
					return player.storage.fanghun2>0;
				},
				prompt:function(event,player){
					var num=player.storage.fanghun2;
					var mode=get.mode();
					if(mode!='chess'&&mode!='tafang'&&mode!='stone'){
						num=Math.min(num,game.players.length+game.dead.length);
					}
					return get.prompt('fuhan')+'（体力上限：'+num+'）';
				},
				check:function(event,player){
					var num=player.storage.fanghun2;
					if(num==1) return false;
					if(player.hp<=1) return true;
					if(num==2) return false;
					if(num==3) return player.hp<3&&player.isMinHp();
					return true;
				},
				content:function(){
					'step 0'
					event.num=player.storage.fanghun2;
					var list;
					if(_status.connectMode){
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
					// var dialog=ui.create.dialog();
					// dialog.add([list.randomGets(5),'character']);
					player.chooseButton(true).set('ai',function(button){
						return get.rank(button.link,true)-lib.character[button.link][2];
					}).set('createDialog',['将武将牌替换为一名角色',[list.randomGets(5),'character']]);
					player.awakenSkill('fuhan');
					'step 1'
					var mode=get.mode();
					if(mode!='chess'&&mode!='tafang'&&mode!='stone'){
						event.num=Math.min(event.num,game.players.length+game.dead.length);
					}
					player.reinit('zhaoxiang',result.links[0],event.num);
				}
			},
			fanghun:{
				audio:2,
				init:function(player){
					player.storage.fanghun=0;
					player.storage.fanghun2=0;
				},
				intro:{
					content:'mark'
				},
				trigger:{source:'damageSource'},
				forced:true,
				filter:function(event){
					return event.card&&event.card.name=='sha';
				},
				content:function(){
					player.storage.fanghun++;
					player.storage.fanghun2++;
					player.markSkill('fanghun');
				},
				group:['fanghun_sha','fanghun_shan','fanghun_draw'],
				subSkill:{
					draw:{
						trigger:{player:['useCard','respond']},
						forced:true,
						popup:false,
						filter:function(event){
							return event.skill=='fanghun_sha'||event.skill=='fanghun_shan';
						},
						content:function(){
							player.draw();
						}
					},
					sha:{
						audio:'fanghun',
						enable:['chooseToUse','chooseToRespond'],
						filterCard:{name:'shan'},
						viewAs:{name:'sha'},
						viewAsFilter:function(player){
							if(!player.storage.fanghun||player.storage.fanghun<0) return false;
							if(!player.countCards('h','shan')) return false;
						},
						prompt:'将一张闪当杀使用或打出',
						onuse:function(result,player){
							player.storage.fanghun--;
							if(!player.storage.fanghun||player.storage.fanghun<0){
								player.storage.fanghun=0;
								player.unmarkSkill('fanghun');
							}
							else{
								player.updateMarks();
							}
						},
						check:function(){return 1},
						ai:{
							respondSha:true,
							skillTagFilter:function(player){
								if(!player.storage.fanghun||player.storage.fanghun<0) return false;
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
						enable:['chooseToRespond'],
						audio:'fanghun',
						filterCard:{name:'sha'},
						viewAs:{name:'shan'},
						prompt:'将一张杀当闪打出',
						viewAsFilter:function(player){
							if(!player.storage.fanghun||player.storage.fanghun<0) return false;
							if(!player.countCards('h','sha')) return false;
						},
						onrespond:function(result,player){
							player.storage.fanghun--;
							if(!player.storage.fanghun||player.storage.fanghun<0){
								player.storage.fanghun=0;
								player.unmarkSkill('fanghun');
							}
							else{
								player.updateMarks();
							}
						},
						check:function(){return 1},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								if(!player.storage.fanghun||player.storage.fanghun<0) return false;
								if(!player.countCards('h','sha')) return false;
							},
							order:4,
							useful:-1,
							value:-1
						}
					}
				}
			},
			yjixi:{
				init:function(player){
					player.storage.yjixi=0;
				},
				derivation:'wangzun',
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.storage.yjixi>=3;
				},
				skillAnimation:true,
				animationColor:'gray',
				unique:true,
				juexingji:true,
				content:function(){
					'step 0'
					player.awakenSkill('yjixi');
					player.gainMaxHp();
					player.recover();
					'step 1'
					var str='摸两张牌';
					var mode=get.mode();
					var choice='选项一';
					if(mode=='identity'||(mode=='versus'&&_status.mode=='four')){
						var list=[];
						var zhu=get.zhu(player);
						if(zhu&&zhu!=player&&zhu.skills){
							for(var i=0;i<zhu.skills.length;i++){
								if(lib.skill[zhu.skills[i]]&&lib.skill[zhu.skills[i]].zhuSkill){
									list.push(zhu.skills[i]);
								}
							}
						}
						if(list.length){
							str+='并获得技能'+get.translation(list);
							event.list=list;
							choice='选项二';
						}
					}
					player.chooseControl(function(event,player){
						return _status.event.choice;
					}).set('choiceList',['获得技能妄尊',str]).set('choice',choice);
					'step 2'
					if(result.control=='选项一'){
						player.addSkill('wangzun');
						player.popup('wangzun');
					}
					else{
						player.draw(2);
						if(event.list){
							player.addSkill(event.list);
							player.popup(event.list[0]);
							player.storage.zhuSkill_yjixi=event.list;
						}
					}
				},
				group:['yjixi_count1','yjixi_count2'],
				subSkill:{
					count1:{
						trigger:{player:'phaseBegin'},
						silent:true,
						content:function(){
							player.storage.yjixi++;
						}
					},
					count2:{
						trigger:{player:'loseHpAfter'},
						silent:true,
						content:function(){
							player.storage.yjixi=0;
						}
					}
				}
			},
			xinyongsi:{
				group:['xinyongsi1','xinyongsi2'],
			},
			xinyongsi1:{
				audio:'yongsi1',
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				content:function(){
					trigger.num+=game.countGroup()-2;
				}
			},
			xinyongsi2:{
				audio:'yongsi2',
				trigger:{player:'phaseDiscardBegin'},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he','庸肆').set('prompt2','弃置一张牌，或取消并失去一点体力').ai=function(card){
						return 8-get.value(card);
					};
					'step 1'
					if(!result.bool){
						player.loseHp();
					}
				}
			},
			lianzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				position:'he',
				filterTarget:function(card,player,target){
					return target!=player;
				},
				check:function(card){
					var num=get.value(card);
					if(get.color(card)=='black'){
						if(num>=6) return 0;
						return 20-num;
					}
					else{
						if(_status.event.player.needsToDiscard()){
							return 7-num;
						}
					}
					return 0;
				},
				discard:false,
				prepare:'give',
				content:function(){
					'step 0'
					target.gain(cards,player);
					if(get.color(cards[0])=='black'){
						target.chooseToDiscard(2,'he','弃置两张牌，或令'+get.translation(player)+'摸两张牌').set('ai',function(card){
							if(_status.event.goon) return 7-get.value(card);
							return 0;
						}).set('goon',get.attitude(target,player)<0);
					}
					else{
						event.finish();
					}
					'step 1'
					if(!result.bool){
						player.draw(2);
					}
				},
				ai:{
					order:8,
					expose:0.2,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length&&get.color(ui.selected.cards[0])=='red'){
								if(target.countCards('h')<player.countCards('h')) return 1;
								return 0.5;
							}
							return -1;
						}
					}
				}
			},
			xiehui:{
				mod:{
					ignoredHandcard:function(card,player){
						if(get.color(card)=='black'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&get.color(card)=='black') return false;
					}
				},
				trigger:{global:'gainBegin'},
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.source==player&&event.player!=player){
						for(var i=0;i<event.cards.length;i++){
							if(get.color(event.cards[i])=='black') return true;
						}
					}
					return false;
				},
				content:function(){
					trigger.player.addSkill('xiehui2');
					if(!trigger.player.storage.xiehui2){
						trigger.player.storage.xiehui2=[];
					}
					for(var i=0;i<trigger.cards.length;i++){
						if(get.color(trigger.cards[i])=='black'){
							trigger.player.storage.xiehui2.add(trigger.cards[i]);
						}
					}
				}
			},
			xiehui2:{
				mark:true,
				intro:{
					content:'不能使用、打出或弃置获得的黑色牌',
					nocount:true
				},
				mod:{
					cardDiscardable:function(card,player){
						if(player.storage.xiehui2&&player.storage.xiehui2.contains(card)) return false;
					},
					cardEnabled:function(card,player){
						if(player.storage.xiehui2&&player.storage.xiehui2.contains(card)) return false;
					},
					cardUsable:function(card,player){
						if(player.storage.xiehui2&&player.storage.xiehui2.contains(card)) return false;
					},
					cardRespondable:function(card,player){
						if(player.storage.xiehui2&&player.storage.xiehui2.contains(card)) return false;
					},
					cardSavable:function(card,player){
						if(player.storage.xiehui2&&player.storage.xiehui2.contains(card)) return false;
					},
				},
				group:['xiehui3','xiehui4']
			},
			xiehui3:{
				trigger:{player:'changeHp'},
				forced:true,
				popup:false,
				filter:function(event){
					return event.num<0;
				},
				content:function(){
					player.removeSkill('xiehui2');
					delete player.storage.xiehui2;
				}
			},
			xiehui4:{
				trigger:{player:'loseEnd'},
				silent:true,
				content:function(){
					if(player.storage.xiehui2){
						for(var i=0;i<player.storage.xiehui2.length;i++){
							if(trigger.cards.contains(player.storage.xiehui2[i])){
								player.storage.xiehui2.splice(i--,1);
							}
						}
					}
					// player.updateMarks();
				}
			},
			shanjia:{
				audio:2,
				init:function(player){
					player.storage.shanjia=0;
				},
				mark:true,
				intro:{
					content:function(storage){
						if(storage==0) return '未使用过装备牌';
						return '已使用过'+storage+'张装备牌';
					}
				},
				group:'shanjia2',
				trigger:{player:'phaseUseBegin'},
				frequent:true,
				filter:function(event,player){
					return player.storage.shanjia>0;
				},
				content:function(){
					'step 0'
					player.draw(player.storage.shanjia);
					'step 1'
					player.chooseToDiscard('he',player.storage.shanjia,true);
					'step 2'
					var useCard=false;
					if(result.bool&&result.cards){
						for(var i=0;i<result.cards.length;i++){
							if(result.cards[i].original=='e'){
								useCard=true;break;
							}
						}
					}
					if(useCard){
						player.chooseUseTarget({name:'sha'},false,'是否视为使用一张【杀】？','nodistance');
					}
				},
				ai:{
					threaten:function(player,target){
						if(typeof target.storage.shanjia=='number'){
							return Math.min(2,Math.sqrt(1+target.storage.shanjia));
						}
					}
				}
			},
			shanjia2:{
				trigger:{player:'useCard'},
				silent:true,
				filter:function(event,player){
					return get.type(event.card)=='equip'&&player.storage.shanjia<7;
				},
				content:function(){
					player.storage.shanjia++;
					player.updateMarks();
				}
			},
			zhanyi:{
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
					switch(get.type(cards[0],'trick')){
						case 'basic':player.addTempSkill('zhanyi_basic');break;
						case 'equip':player.addTempSkill('zhanyi_equip');break;
						case 'trick':player.addTempSkill('zhanyi_trick');player.draw(2);break;
					}
				},
				ai:{
					order:9.1,
					result:{
						player:1
					}
				}
			},
			zhanyi_basic:{
				group:['zhanyi_basic_sha','zhanyi_basic_jiu','zhanyi_basic_tao']
			},
			zhanyi_basic_tao:{
				enable:'chooseToUse',
				filterCard:{type:'basic'},
				viewAs:{name:'tao'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{type:'basic'})) return false;
				},
				prompt:'将一张基本牌当桃使用',
				check:function(card){
					return 8-get.value(card);
				},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('h',{type:'basic'})) return false;
					},
					save:true,
				}
			},
			zhanyi_basic_sha:{
				enable:'chooseToUse',
				filterCard:{type:'basic'},
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{type:'basic'})) return false;
				},
				prompt:'将一张基本牌当杀使用',
				check:function(card){return 4-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('h',{type:'basic'})) return false;
					},
					respondSha:true,
				}
			},
			zhanyi_basic_jiu:{
				enable:'chooseToUse',
				filterCard:{type:'basic'},
				viewAs:{name:'jiu'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{type:'basic'})) return false;
				},
				prompt:'将一张基本牌当酒使用',
				check:function(card){
					if(_status.event.type=='dying') return 1;
					return 4-get.value(card);
				},
				ai:{
					skillTagFilter:function(player){
						return player.countCards('h',{type:'basic'})>0&&player.hp<=0;
					},
					save:true,
				}
			},
			zhanyi_equip:{
				trigger:{player:'shaBegin'},
				forced:true,
				filter:function(event,player){
					return event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				content:function(){
					trigger.target.chooseToDiscard('he',true,2);
				}
			},
			zhanyi_trick:{
				mod:{
					targetInRange:function(){
						return true;
					}
				}
			},
			shichou:{
				audio:1,
				skillAnimation:true,
				animationColor:'orange',
				unique:true,
				limited:true,
				enable:'phaseUse',
				zhuSkill:true,
				filter:function(event,player){
					if(!player.hasZhuSkill('shichou'))return false;
					if(player.countCards('he')<2) return false;
					return !player.storage.shichou;
				},
				selectCard:2,
				init:function(player){
					if(player.hasZhuSkill('shichou')){
						player.markSkill('shichou');
						player.storage.shichou=false;
					}
				},
				filterTarget:function(card,player,target){
					return target.group=='shu'&&target!=player;
				},
				filterCard:true,
				position:'he',
				check:function(card){
					return 7-get.value(card);
				},
				discard:false,
				prepare:'give',
				content:function(){
					player.storage.shichou=true;
					player.awakenSkill('shichou');
					target.gain(cards,player);
					player.storage.shichou_target=target;
					player.addSkill('shichou2');
					target.markSkillCharacter('shichou',player,'誓仇','代替'+get.translation(player)+'承受伤害直到首次进入濒死状态');
				},
				intro:{
					content:'limited'
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if(player.hasUnknown()) return 0;
							var att=get.attitude(player,target);
							if(att<=0){
								if(target.hp==1) return (10-att)/2;
								return 10-att;
							}
							else{
								if(target.hp==1) return 0;
								return (10-att)/4;
							}
						},
					}
				}
			},
			shichou2:{
				group:'shichou3',
				trigger:{player:'damageBegin3'},
				forced:true,
				popup:false,
				content:function(){
					trigger.untrigger();
					trigger.player=player.storage.shichou_target;
					trigger.player.addSkill('shichou4');
					trigger.trigger('damageBegin3');
					player.logSkill('shichou2',player.storage.shichou_target);
					game.delay(0.5);
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(get.attitude(player,target)>0) return [0,0];
								var eff=get.damageEffect(target.storage.shichou_target,player,target);
								if(eff>0){
									return [0,1];
								}
								else if(eff<0){
									return [0,-2];
								}
								else{
									return [0,0];
								}
							}
						}
					}
				}
			},
			shichou3:{
				trigger:{global:['dying','dieBegin']},
				forced:true,
				popup:false,
				priority:10,
				filter:function(event,player){
					return event.player==player.storage.shichou_target;
				},
				content:function(){
					trigger.player.unmarkSkill('shichou');
					delete player.storage.shichou_target;
					player.removeSkill('shichou2');
				}
			},
			shichou4:{
				trigger:{player:['damageAfter','damageCancelled']},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					if(event.triggername=='damageAfter'&&trigger.num){
						player.draw(trigger.num);
					}
					player.removeSkill('shichou4');
				}
			},
			zhaolie:{
				trigger:{player:'phaseDrawBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('zhaolie'),function(card,player,target){
						return target!=player&&get.distance(player,target,'attack')<=1;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(get.attitude(player,target)>0) return 0;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						trigger.num--;
						player.storage.zhaolie=result.targets[0];
						player.logSkill('zhaolie',result.targets);
						player.addTempSkill('zhaolie2','phaseDrawAfter');
					}
				}
			},
			zhaolie2:{
				trigger:{player:'phaseDrawEnd'},
				forced:true,
				popup:false,
				content:function(){
					'step 0'
					event.cards=get.cards(3);
					player.showCards(event.cards);
					'step 1'
					event.basic=[];
					event.nonbasic=[];
					event.todis=[];
					for(var i=0;i<event.cards.length;i++){
						if(get.type(event.cards[i])=='basic'){
							if(event.cards[i].name=='tao'){
								event.todis.push(event.cards[i]);
							}
							else{
								event.basic.push(event.cards[i]);
							}
						}
						else{
							event.todis.push(event.cards[i]);
							event.nonbasic.push(event.cards[i]);
						}
					}
					game.cardsDiscard(event.todis);
					var num=event.nonbasic.length;
					if(num==0){
						if(event.basic.length==0){
							event.finish();
							return;
						}
						player.storage.zhaolie.chooseTarget(function(card,player,target){
							var source=_status.event.source;
							return target==source||target==source.storage.zhaolie;
						},true,'选择一个目标获得'+get.translation(event.basic)).set('ai',function(target){
							return get.attitude(_status.event.player,target);
						}).set('source',player);
					}
					else{
						player.storage.zhaolie.chooseToDiscard(num,'he','弃置'+get.cnNumber(num)+
						'张牌并令'+get.translation(player)+'拿牌，或受到'+get.cnNumber(num)+'点伤害并拿牌').set('ai',function(card){
							var player=_status.event.player;
							switch(_status.event.num){
								case 1:return player.hp>1?0:7-get.value(card);
								case 2:return 8-get.value(card);
								case 3:return 10-get.value(card);
								default:return 0;
							}
						}).set('num',num);
					}
					'step 2'
					var num=event.nonbasic.length;
					var undone=false;
					if(num==0){
						if(event.basic.length){
							result.targets[0].gain(event.basic,'gain2','log');
						}
					}
					else{
						if(result.bool){
							if(event.basic.length){
								player.gain(event.basic,'gain2','log');
							}
						}
						else{
							player.storage.zhaolie.damage(num);
							if(event.basic.length){
								undone=true;
							}
						}
					}
					if(!undone){
						delete player.storage.zhaolie;
						event.finish();
					}
					'step 3'
					if(player.storage.zhaolie.isAlive()){
						player.storage.zhaolie.gain(event.basic,'gain2','log');
					}
					else{
						game.cardsDiscard(event.basic);
					}
					delete player.storage.zhaolie;
				}
			},
			yingjian:{
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					player.chooseUseTarget('###是否发动【影箭】？###视为使用一张没有距离限制的【杀】',{name:'sha'},false,'nodistance').logSkill='yingjian';
				},
				ai:{
					threaten:function(player,target){
						return 1.6;
					}
				}
			},
			dingpan:{
				enable:'phaseUse',
				filter:function(event,player){
					var num;
					var mode=get.mode();
					if(mode=='identity'){
						num=get.population('fan');
					}
					else if(mode=='versus'){
						num=player.getEnemies().length;
					}
					else{
						num=1;
					}
					if(player.getStat().skill.dingpan>=num) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					return target.countCards('e')>0;
				},
				content:function(){
					'step 0'
					target.draw();
					'step 1'
					var goon=get.damageEffect(target,player,target)>=0;
					if(!goon&&target.hp>=4&&get.attitude(player,target)<0){
						var es=target.getCards('e');
						for(var i=0;i<es.length;i++){
							if(get.equipValue(es[i],target)>=8){
								goon=true;break;
							}
						}
					}
					target.chooseControl(function(){
						if(_status.event.goon) return '选项二';
						return '选项一';
					}).set('goon',goon).set('prompt','定叛').set('choiceList',['令'+get.translation(player)+'弃置你装备区里的一张牌','获得你装备区内的所有牌并受到一点伤害']);
					'step 2'
					if(result.control=='选项一'){
						player.discardPlayerCard(target,true,'e');
						event.finish();
					}
					else{
						target.gain(target.getCards('e'),'gain2');
					}
					'step 3'
					game.delay(0.5);
					target.damage();
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							if(get.damageEffect(target,player,target)>=0) return 2;
							var att=get.attitude(player,target);
							if(att==0) return 0;
							var es=target.getCards('e');
							if(att>0&&(target.countCards('h')>2||target.needsToDiscard(1))) return 0;
							if(es.length==1&&att>0) return 0;
							for(var i=0;i<es.length;i++){
								var val=get.equipValue(es[i],target);
								if(val<=4){
									if(att>0){
										return 1;
									}
								}
								else if(val>=7){
									if(att<0){
										return -1;
									}
								}
							}
							return 0;
						}
					}
				}
			},
			hongde:{
				audio:2,
				trigger:{player:['gainEnd','loseEnd']},
				direct:true,
				filter:function(event,player){
					return event.cards&&event.cards.length>1;
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('hongde'),'令一名其他角色摸一张牌',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						return get.attitude(player,target);
					});
					'step 1'
					if(result.bool){
						player.logSkill('hongde',result.targets);
						result.targets[0].draw();
					}
				}
			},
			ziyuan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					return get.number(card)+num<=13;
				},
				complexCard:true,
				selectCard:function(){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num==13) return ui.selected.cards.length;
					return ui.selected.cards.length+2;
				},
				discard:false,
				prepare:'give',
				filterTarget:function(card,player,target){
					return player!=target;
				},
				check:function(card){
					var num=0;
					for(var i=0;i<ui.selected.cards.length;i++){
						num+=get.number(ui.selected.cards[i]);
					}
					if(num+get.number(card)==13) return 9-get.value(card);
					if(ui.selected.cards.length==0){
						var cards=_status.event.player.getCards('h');
						for(var i=0;i<cards.length;i++){
							for(var j=i+1;j<cards.length;j++){
								if(cards[i].number+cards[j].number==13){
									if(cards[i]==card||cards[j]==card) return 8.5-get.value(card);
								}
							}
						}
					}
					return 0;
				},
				content:function(){
					target.gain(cards,player);
					target.recover();
				},
				ai:{
					order:function(skill,player){
						if(game.hasPlayer(function(current){
							return (current.hp<current.maxHp&&current!=player&&
								get.recoverEffect(current,player,player)>0);
						})){
							return 10;
						}
						return 1;
					},
					result:{
						player:function(player,target){
							if(get.attitude(player,target)<0) return -1;
							var eff=get.recoverEffect(target,player,player);
							if(eff<0) return 0;
							if(eff>0){
								if(target.hp==1) return 3;
								return 2;
							}
							if(player.needsToDiscard()) return 1;
							return 0;
						}
					},
					threaten:1.3
				}
			},
			jugu:{
				audio:2,
				mod:{
					maxHandcard:function(player,num){
						return num+player.maxHp;
					}
				},
				trigger:{global:'gameDrawAfter',player:'enterGame'},
				forced:true,
				content:function(){
					player.draw(player.maxHp);
				}
			},
			tuifeng:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				notemp:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				init:function(player){
					if(!player.storage.tuifeng) player.storage.tuifeng=[];
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt2('tuifeng'),'he',[1,trigger.num]).set('ai',function(card){
						if(card.name=='du') return 20;
						return 7-get.useful(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('tuifeng');
						player.lose(result.cards,ui.special,'toStorage');
						player.$give(result.cards,player);
						for(var i=0;i<result.cards.length;i++){
							player.storage.tuifeng.push(result.cards[i]);
						}
						player.markSkill('tuifeng');
					}
				},
				marktext:'锋',
				intro:{
					content:'cards'
				},
				group:'tuifeng2',
				ai:{
					threaten:0.8,
					maixie:true,
					maixie_hp:true
				}
			},
			tuifeng2:{
				audio:'tuifeng',
				trigger:{player:'phaseBegin'},
				forced:true,
				filter:function(event,player){
					return player.storage.tuifeng.length>0;
				},
				content:function(){
					player.draw(2*player.storage.tuifeng.length);
					player.addTempSkill('tuifeng3');
					player.$throw(player.storage.tuifeng.slice(0),1000);
					player.storage.tuifeng3=player.storage.tuifeng.length;
					game.cardsDiscard(player.storage.tuifeng);
					player.storage.tuifeng=[];
					player.unmarkSkill('tuifeng')
				}
			},
			tuifeng3:{
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha'&&player.storage.tuifeng3) return num+player.storage.tuifeng3;
					}
				},
				onremove:true
			},
			weidi:{
				trigger:{global:['gameStart','zhuUpdate']},
				forced:true,
				audio:2,
				filter:function(event,player){
					var mode=get.mode();
					return (mode=='identity'||(mode=='versus'&&_status.mode=='four'));
				},
				content:function(){
					var list=[];
					var zhu=get.zhu(player);
					if(zhu&&zhu!=player&&zhu.skills){
						for(var i=0;i<zhu.skills.length;i++){
							if(lib.skill[zhu.skills[i]]&&lib.skill[zhu.skills[i]].zhuSkill){
								list.push(zhu.skills[i]);
							}
						}
					}
					player.addAdditionalSkill('weidi',list);
					player.storage.zhuSkill_weidi=list;
				}
			},
			zhenlue:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event){
					return get.type(event.card)=='trick';
				},
				content:function(){
					trigger.nowuxie=true;
				},
				mod:{
					targetEnabled:function(card,player,target){
						if(get.type(card)=='delay'&&player!=target){
							return false;
						}
					},
				}
			},
			jianshu:{
				audio:2,
				unique:true,
				limited:true,
				enable:'phaseUse',
				animationColor:'thunder',
				skillAnimation:'epic',
				filter:function(event,player){
					return !player.storage.jianshu&&player.countCards('h',{color:'black'})>0;
				},
				init:function(player){
					player.storage.jianshu=false;
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(ui.selected.targets.length){
						return !ui.selected.targets[0].hasSkillTag('noCompareSource')&&target.countCards('h')
						&&!target.hasSkillTag('noCompareTarget')&&target.distanceTo(ui.selected.targets[0])<=1;
					}
					return true;
				},
				filterCard:{color:'black'},
				mark:true,
				discard:false,
				delay:0,
				check:function(card){
					if(_status.event.player.hp==1) return 8-get.value(card);
					return 6-get.value(card);
				},
				selectTarget:2,
				multitarget:true,
				content:function(){
					'step 0'
					player.awakenSkill('jianshu');
					player.storage.jianshu=true;
					targets[0].gain(cards,player,'give');
					'step 1'
					targets[0].chooseToCompare(targets[1]);
					'step 2'
					if(result.bool){
						targets[0].chooseToDiscard('he',2,true);
						targets[1].loseHp();
					}
					else if(result.tie){
						targets[0].loseHp()
						targets[1].loseHp()
					}
					else{
						targets[1].chooseToDiscard('he',2,true);
						targets[0].loseHp();
					}
				},
				intro:{
					content:'limited'
				},
				ai:{
					expose:0.4,
					order:4,
					result:{
						target:function(player,target){
							if(player.hasUnknown()) return 0;
							if(ui.selected.targets.length) return -1;
							return -0.5;
						}
					}
				}
			},
			yongdi:{
				audio:2,
				unique:true,
				limited:true,
				trigger:{player:'damageEnd'},
				animationColor:'thunder',
				skillAnimation:'legend',
				filter:function(event,player){
					return !player.storage.yongdi;
				},
				init:function(player){
					player.storage.yongdi=false;
				},
				mark:true,
				intro:{
					content:'limited'
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('yongdi'),function(card,player,target){
						return (target.sex=='male'||target.name=='key_yuri')&&target!=player;
					}).set('ai',function(target){
						if(!_status.event.goon) return 0;
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<=1) return 0;
						var mode=get.mode();
						if(mode=='identity'||(mode=='versus'&&_status.mode=='four')){
							if(target.name&&lib.character[target.name]){
								for(var i=0;i<lib.character[target.name][3].length;i++){
									if(lib.skill[lib.character[target.name][3][i]].zhuSkill){
										return att*2;
									}
								}
							}
						}
						return att;
					}).set('goon',!player.hasUnknown());
					'step 1'
					if(result.bool){
						player.awakenSkill('yongdi');
						player.storage.yongdi=true;
						player.logSkill('yongdi',result.targets);
						var target=result.targets[0];
						target.gainMaxHp(true);
						var mode=get.mode();
						if(mode=='identity'||(mode=='versus'&&_status.mode=='four')){
							if(target.name&&lib.character[target.name]){
								var skills=lib.character[target.name][3];
								target.storage.zhuSkill_yongdi=[];
								for(var i=0;i<skills.length;i++){
									var info=lib.skill[skills[i]];
									if(info.zhuSkill){
										target.storage.zhuSkill_yongdi.push(skills[i]);
										if(info.init){
											info.init(target);
										}
										if(info.init2){
											info.init2(target);
										}
									}
								}
							}
						}
					}
				},
				ai:{
					expose:0.2
				}
			},
			gushe:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canCompare(target);
				},
				selectTarget:[1,3],
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				multitarget:true,
				multiline:true,
				content:function(){
					player.chooseToCompare(targets).callback=lib.skill.gushe.callback;
				},
				init:function(player){
					player.storage.gushe=0;
				},
				intro:{
					name:'饶舌',
					content:'mark'
				},
				chat:['粗鄙之语','天地不容','谄谀之臣','皓首匹夫，苍髯老贼','二臣贼子','断脊之犬','我从未见过有如此厚顔无耻之人！'],
				callback:function(){
					'step 0'
					if(event.num1<=event.num2){
						target.chat(lib.skill.gushe.chat[player.storage.gushe]);
						game.delay();
						player.storage.gushe++;
						player.markSkill('gushe');
						if(player.storage.gushe>=7){
							player.die();
						}
					}
					'step 1'
					if(event.num1>=event.num2){
						target.chooseToDiscard('he','弃置一张牌，或令'+get.translation(player)+'摸一张牌').set('ai',function(card){
							if(_status.event.goon) return 6-get.value(card);
							return 0;
						}).set('goon',get.attitude(target,player)<0);
					}
					else event.goto(3);
					'step 2'
					if(!result.bool){
						player.draw();
					}
					'step 3'
					if(event.num1<=event.num2){
						player.chooseToDiscard('弃置一张牌，或摸一张牌').set('ai',function(){return -1;});
					}
					else event.finish();
					'step 4'
					if(!result.bool) player.draw();
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							var num=game.countPlayer(function(current){
								return get.attitude(player,current)<0&&current!=player&&current.countCards('h');
							});
							if(num>3) num=3;
							var hs=player.getCards('h');
							for(var i=0;i<hs.length;i++){
								if(get.value(hs[i])<=6){
									switch(hs[i].number){
										case 13:return -1;
										case 12:if(player.storage.gushe+num<=8) return -1;break;
										case 11:if(player.storage.gushe+num<=7) return -1;break;
										default:if(hs[i].number>5&&player.storage.gushe+num<=6) return -1;
									}
								}
							}
							return 0;
						},
					}
				}
			},
			jici:{
				audio:2,
				trigger:{player:'compare'},
				filter:function(event,player){
					return event.getParent().name=='gushe'&&!event.iwhile&&event.num1<=player.storage.gushe;
				},
				content:function(){
					if(trigger.num1<player.storage.gushe){
						trigger.num1+=player.storage.gushe;
					}
					else{
						player.getStat().skill.gushe--;
					}
				}
			},
			juesi:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h','sha')>0;
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he')>0;
				},
				filterCard:{name:'sha'},
				content:function(){
					'step 0'
					target.chooseToDiscard('he',true);
					'step 1'
					if(target.hp>=player.hp&&result.bool&&result.cards[0].name!='sha'){
						player.useCard({name:'juedou'},target);
					}
				},
				ai:{
					order:2,
					result:{
						target:function(player,target){
							if(get.effect(target,{name:'juedou'},player,player)<=0){
								return 0;
							}
							if(target.hp<player.hp){
								if(player.countCards('h')>player.hp) return -0.1;
								return 0;
							}
							var hs1=target.getCards('h','sha');
							var hs2=player.getCards('h','sha');
							if(hs1.length>hs2.length){
								return 0;
							}
							var hsx=target.getCards('h');
							if(hsx.length>2&&hs2.length<=1&&hsx[0].number<6){
								return 0;
							}
							if(hsx.length>3&&hs2.length<=1){
								return 0;
							}
							if(hs1.length>hs2.length-1&&hs1.length>0&&(hs2.length<=1||hs1[0].number>hs2[0].number)){
								return 0;
							}
							return -1;
						}
					}
				}
			},
			shefu:{
				trigger:{player:'phaseEnd'},
				direct:true,
				audio:2,
				init:function(player){
					player.storage.shefu=[];
					player.storage.shefu2=[];
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				intro:{
					content:'cards',
					mark:function(dialog,content,player){
						if(content&&content.length){
							dialog.addAuto(content);
							if(player.isUnderControl(true)){
								var str='';
								for(var i=0;i<player.storage.shefu2.length;i++){
									str+=get.translation(player.storage.shefu2[i]);
									if(i<player.storage.shefu2.length-1){
										str+='、';
									}
								}
								dialog.add('<div class="text center">'+str+'</div>')
							}
						}
					},
				},
				content:function(){
					'step 0'
					var list1=[],list2=[],list3=[];
					for(var i=0;i<lib.inpile.length;i++){
						var type=get.type(lib.inpile[i]);
						if(type=='basic'){
							list1.push(['基本','',lib.inpile[i]]);
						}
						else if(type=='trick'){
							list2.push(['锦囊','',lib.inpile[i]]);
						}
						else if(type=='delay'){
							list3.push(['锦囊','',lib.inpile[i]]);
						}
					}
					player.chooseButton([get.prompt('shefu'),[list1.concat(list2).concat(list3),'vcard']]).set('filterButton',function(button){
						var player=_status.event.player;
						if(player.storage.shefu2&&player.storage.shefu2.contains(button.link[2])) return false;
						return true;
					}).set('ai',function(button){
						var rand=_status.event.rand*2;
						switch(button.link[2]){
							case 'sha':return 5+rand[1];
							case 'tao':return 4+rand[2];
							case 'lebu':return 3+rand[3];
							case 'shan':return 4.5+rand[4];
							case 'wuzhong':return 4+rand[5];
							case 'shunshou':return 3+rand[6];
							case 'nanman':return 2+rand[7];
							case 'wanjian':return 2+rand[8];
							default:return rand[9];
						}
					}).set('rand',[Math.random(),Math.random(),Math.random(),Math.random(),
					Math.random(),Math.random(),Math.random(),Math.random()],Math.random());
					'step 1'
					if(result.bool){
						player.storage.shefu2.push(result.links[0][2]);
						player.logSkill('shefu');
						player.chooseCard('h','选择一张手牌作为“伏兵”',true);
						if(player.isOnline2()){
							player.send(function(storage){
								game.me.storage.shefu2=storage;
							},player.storage.shefu2);
						}
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						var card=result.cards[0];
						player.lose(card,ui.special,'toStorage');
						player.storage.shefu.push(card);
						player.syncStorage('shefu');
						player.markSkill('shefu');
						player.$give(card,player);
					}
				},
				group:['shefu2']
			},
			shefu2:{
				trigger:{global:['useCard','respondEnd']},
				priority:15,
				audio:'shefu',
				filter:function(event,player){
					if(_status.currentPhase==player) return false;
					if(event.name=='respond'){
						if(event.getParent(2).name!='sha') return false;
					}
					return player.storage.shefu2&&player.storage.shefu2.contains(event.card.name);
				},
				direct:true,
				content:function(){
					"step 0"
					var effect=0;
					if(trigger.card.name=='wuxie'||trigger.name=='respond'){
						if(get.attitude(player,trigger.player)<-1){
							effect=-1;
						}
					}
					else if(trigger.targets&&trigger.targets.length){
						for(var i=0;i<trigger.targets.length;i++){
							effect+=get.effect(trigger.targets[i],trigger.card,trigger.player,player);
						}
					}
					var str='设伏：是否令'+get.translation(trigger.player);
					if(trigger.targets&&trigger.targets.length){
						str+='对'+get.translation(trigger.targets);
					}
					str+='的'+get.translation(trigger.card)+'失效？'
					var next=player.chooseBool(str,function(){
						var player=_status.event.player;
						var trigger=_status.event.getTrigger();
						if(_status.event.effect<0){
							if(trigger.card.name=='sha'){
								var target=trigger.targets[0];
								if(target==player){
									return !player.countCards('h','shan');
								}
								else{
									return target.hp==1||(target.countCards('h')<=2&&target.hp<=2);
								}
							}
							else{
								return true;
							}
						}
						return false;
					});
					next.set('effect',effect);
					"step 1"
					if(result.bool){
						player.logSkill('shefu');
						var index=player.storage.shefu2.indexOf(trigger.card.name);
						if(index!=-1){
							var card=player.storage.shefu[index];
							game.cardsDiscard(card);
							player.$throw(card);
							player.storage.shefu.splice(index,1);
							player.storage.shefu2.splice(index,1);
							if(player.storage.shefu.length==0){
								player.unmarkSkill('shefu');
							}
							else{
								player.syncStorage('shefu');
								player.markSkill('shefu');
								if(player.isOnline2()){
									player.send(function(storage){
										game.me.storage.shefu2=storage;
									},player.storage.shefu2);
								}
							}
						}
						game.delay(2);
						if(trigger.name=='respond'){
							if(trigger.parent.result){
								trigger.parent.result.bool=false;
							}
						}
						else{
							trigger.cancel();
						}
					}
					else{
						event.finish();
					}
					"step 2"
					game.broadcastAll(ui.clear);
				},
				ai:{
					threaten:1.8,
					expose:0.3
				}
			},
			benyu:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					if(!event.source) return false;
					var nh1=player.countCards('h');
					var nh2=event.source.countCards('h');
					if(nh1==nh2) return false;
					if(nh2<nh2&&nh1>=5) return false;
					if(nh2>nh2&&event.source.isDead()) return false;
					return true;
				},
				direct:true,
				content:function(){
					"step 0"
					var num1=player.countCards('h');
					var num2=trigger.source.countCards('h');
					if(num1>num2){
						var next=player.chooseToDiscard([num2+1,num1],'贲育：是否弃置至少'+(num2+1)+'张手牌,并对'+get.translation(trigger.source)+'造成一点伤害？');
						next.logSkill=['benyu',trigger.source];
						next.set('ai',function(card){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							if(ui.selected.cards.length>=_status.event.num){
								return -1;
							}
							if(get.damageEffect(trigger.source,player,player)>0&&_status.event.num<=2){
								return 8-get.value(card);
							}
							return -1;
						});
						next.set('num',num2+1);
					}
					else{
						event.draw=true;
						event.num=Math.min(num2,5)-num1;
						player.chooseBool(get.prompt2('benyu'));
					}
					"step 1"
					if(result.bool){
						if(event.draw){
							player.logSkill('benyu',trigger.source);
							player.draw(event.num);
						}
						else{
							trigger.source.damage(player);
						}
					}
				},
			},
			jili:{
				audio:2,
				trigger:{
					global:'useCardToTarget'
				},
				forced:true,
				check:function(event,player){
					return get.effect(player,event.card,event.player,player)>0;
				},
				filter:function(event,player){
					if(get.color(event.card)!='red') return false;
					if(!event.targets) return false;
					if(event.player==player) return false;
					if(event.targets.contains(player)) return false;
					if(get.info(event.card).multitarget) return false;
					var type=get.type(event.card);
					if(type!='basic'&&type!='trick') return false;
					if(lib.filter.targetEnabled2(event.card,event.player,player)){
						for(var i=0;i<event.targets.length;i++){
							if(get.distance(event.targets[i],player)<=1) return true;
						}
					}
					return false;
				},
				autodelay:true,
				content:function(){
					trigger.getParent().targets.add(player);
					trigger.player.line(player,'green');
				}
			},
			zhidao:{
				audio:2,
				trigger:{source:'damageSource'},
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return _status.currentPhase==player&&event.player.isAlive()&&
					event.player.countCards('hej')>0&&event.player!=player&&!player.hasSkill('zhidao2');
				},
				forced:true,
				content:function(){
					var num=0;
					if(trigger.player.countCards('h')) num++;
					if(trigger.player.countCards('e')) num++;
					if(trigger.player.countCards('j')) num++;
					if(num){
						player.gainPlayerCard(trigger.player,num,'hej',true).set('filterButton',function(button){
							for(var i=0;i<ui.selected.buttons.length;i++){
								if(get.position(button.link)==get.position(ui.selected.buttons[i].link)) return false;
							}
							return true;
						});
					}
					player.addTempSkill('zhidao2');
				}
			},
			zhidao2:{
				mod:{
					playerEnabled:function(card,player,target){
						if(player!=target) return false;
					}
				}
			},
			luanzhan:{
				mod:{
					selectTarget:function(card,player,range){
						if(!player.storage.luanzhan) return;
						if(range[1]==-1) return;
						if(card.name=='sha') range[1]+=player.storage.luanzhan;
						if(get.color(card)=='black'&&get.type(card)=='trick'){
							var info=get.info(card);
							if(info.multitarget) return false;
							range[1]+=player.storage.luanzhan;
						}
					},
				},
				trigger:{source:'damageSource'},
				audio:2,
				forced:true,
				mark:true,
				intro:{
					content:function(storage){
						return '可以额外指定'+storage+'个目标';
					}
				},
				init:function(player){
					player.storage.luanzhan=0;
				},
				init2:function(player){
					player.markSkill('luanzhan');
				},
				content:function(){
					if(typeof player.storage.luanzhan=='number'){
						player.storage.luanzhan+=trigger.num;
					}
					else{
						player.storage.luanzhan=trigger.num;
					}
					if(player.hasSkill('luanzhan')){
						player.markSkill('luanzhan');
					}
				},
				group:'luanzhan_cancel',
				subSkill:{
					cancel:{
						audio:'luanzhan',
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							if(!player.storage.luanzhan) return false;
							var check=false;
							var card=event.card;
							if(card.name=='sha'){
								check=true;
							}
							else if(get.color(card)=='black'&&get.type(card)=='trick'){
								var info=get.info(card);
								if(!info.multitarget){
									check=true;
									if(info.selectTarget==-1){
										check=false;
									}
									else if(Array.isArray(info.selectTarget)&&info.selectTarget[1]==-1){
										check=false;
									}
								}
							}
							if(check&&event.targets&&event.targets.length<player.storage.luanzhan){
								return true;
							}
							return false;
						},
						content:function(){
							player.storage.luanzhan=0;
							player.markSkill('luanzhan');
						}
					}
				}
			},
			xinzhengnan:{
				audio:'zhengnan',
				trigger:{global:'dieAfter'},
				direct:true,
				content:function(){
					'step 0'
					var list=['摸牌'];
					if(!player.hasSkill('new_rewusheng')){
						list.push('new_rewusheng');
					}
					if(!player.hasSkill('xindangxian')){
						list.push('xindangxian');
					}
					if(!player.hasSkill('zhiman')){
						list.push('zhiman');
					}
					list.push('cancel2');
					if(list.length){
						player.chooseControl(list).set('prompt',get.prompt2('xinzhengnan')).set('ai',function(){
							if(list.contains('new_rewusheng')) return 1;
							return 0;
						});
					}
					'step 1'
					if(result.control=='cancel2') return;
					player.logSkill('xinzhengnan');
					if(result.control=='摸牌'){
						player.draw(3);
						return;
					}
					player.addSkill(result.control);
					player.popup(result.control);
					game.log(player,'获得了技能','#g【'+get.translation(result.control)+'】');
				},
				ai:{
					threaten:1.3
				}
			},
			zhengnan:{
				audio:1,
				trigger:{global:'dieAfter'},
				frequent:true,
				content:function(){
					'step 0'
					player.draw(3);
					var list=[];
					if(!player.hasSkill('new_rewusheng')){
						list.push('new_rewusheng');
					}
					if(!player.hasSkill('dangxian')){
						list.push('dangxian');
					}
					if(!player.hasSkill('zhiman')){
						list.push('zhiman');
					}
					if(list.length){
						player.chooseControl(list).set('prompt','选择获得一项技能');
					}
					'step 1'
					player.addSkill(result.control);
					player.popup(result.control);
					game.log(player,'获得技能','【'+get.translation(result.control)+'】');
				},
				ai:{
					threaten:2.4
				}
			},
			xiefang:{
				mod:{
					globalFrom:function(from,to,distance){
						return distance-game.countPlayer(function(current){
							return current.sex=='female';
						});
					}
				}
			},
			qizhi:{
				audio:2,
				trigger:{
					player:'useCardToPlayered'
				},
				direct:true,
				filter:function(event,player){
					if(!event.targets) return false;
					if(event.getParent().triggeredTargets3.length>1) return false;
					if(_status.currentPhase!=player) return false;
					var type=get.type(event.card,'trick');
					if(type!='basic'&&type!='trick') return false;
					if(event.noai) return false;
					return game.hasPlayer(function(target){
						return !event.targets.contains(target)&&target.countCards('he')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('qizhi'),'弃置一名角色的一张牌，然后其摸一张牌',function(card,player,target){
						return !_status.event.getTrigger().targets.contains(target)&&target.countCards('he')>0;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(target==player) return 2;
						if(get.attitude(player,target)<=0){
							return 1
						}
						return 0.5;
					});
					'step 1'
					if(result.bool){
						player.storage.qizhi++;
						if(!event.isMine()&&!_status.connectMode) game.delay();
						player.logSkill('qizhi',result.targets);
						player.discardPlayerCard(result.targets[0],true,'he');
						event.target=result.targets[0];
					}
					else{
						event.finish();
					}
					'step 2'
					event.target.draw();
				},
				group:'qizhi2'
			},
			qizhi2:{
				trigger:{player:'phaseBegin'},
				silent:true,
				content:function(){
					player.storage.qizhi=0;
				}
			},
			jinqu:{
				audio:2,
				trigger:{player:'phaseEnd'},
				check:function(event,player){
					return player.storage.qizhi>=player.countCards('h');
				},
				prompt:function(event,player){
					if(typeof player.storage.qizhi!='number'){
						'进趋：是否摸两张牌并将手牌弃置至'+get.cnNumber(0)+'张？';
					}
					return '进趋：是否摸两张牌并将手牌弃置至'+get.cnNumber(player.storage.qizhi)+'张？';
				},
				content:function(){
					'step 0'
					player.draw(2);
					'step 1'
					if(typeof player.storage.qizhi!='number'){
						player.storage.qizhi=0;
					}
					var dh=player.countCards('h')-player.storage.qizhi;
					if(dh>0){
						player.chooseToDiscard(dh,true);
					}
				}
			},
			mouduan:{
				audio:1,
				init2:function(player){
					game.broadcastAll(function(player){
						player._mouduan_mark=player.mark('武',{
							content:'拥有技能【激昂】、【谦逊】'
						});
					},player);
					player.addAdditionalSkill('mouduan',['jiang','qianxun']);
				},
				onremove:function(player){
					game.broadcastAll(function(player){
						if(player._mouduan_mark){
							player._mouduan_mark.delete();
							delete player._mouduan_mark;
						}
					},player);
					player.removeAdditionalSkill('mouduan');
				},
				trigger:{player:'loseEnd'},
				forced:true,
				filter:function(event,player){
					return player._mouduan_mark&&player._mouduan_mark.name=='武'&&player.countCards('h')<=2;
				},
				content:function(){
					game.broadcastAll(function(player){
						if(!player._mouduan_mark) return;
						player._mouduan_mark.name='文';
						player._mouduan_mark.skill='文';
						player._mouduan_mark.firstChild.innerHTML='文';
						player._mouduan_mark.info.content='拥有技能【英姿】、【克己】';
					},player);
					player.addAdditionalSkill('mouduan',['yingzi','keji']);
				},
				group:'mouduan2'
			},
			mouduan2:{
				audio:1,
				trigger:{global:'phaseBegin'},
				priority:5,
				filter:function(event,player){
					return player._mouduan_mark&&player._mouduan_mark.name=='文'&&player.countCards('h')>2;
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseToDiscard('he','谋断：是否弃置一张牌将标记变为“武”？').ai=function(){
						return -1;
					}
					'step 1'
					if(result.bool&&player.countCards('h')>2){
						game.broadcastAll(function(player){
							if(!player._mouduan_mark) return;
							player._mouduan_mark.name='武';
							player._mouduan_mark.skill='武';
							player._mouduan_mark.firstChild.innerHTML='武';
							player._mouduan_mark.info.content='拥有技能【激昂】、【谦逊】';
						},player);
						player.addAdditionalSkill('mouduan',['jiang','qianxun']);
					}
				}
			},
			tanhu:{
				audio:1,
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
					if(result.bool){
						target.addTempSkill('tanhu2');
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
							return -1;
						}
					},
					order:9,
				},
				group:'tanhu3'
			},
			tanhu2:{
				mark:true,
				intro:{
					content:'已成为探虎目标'
				}
			},
			tanhu3:{
				mod:{
					globalFrom:function(from,to){
						if(to.hasSkill('tanhu2')) return -Infinity;
					},
					wuxieRespondable:function(card,player,target){
						if(target&&target.hasSkill('tanhu2')) return false;
					}
				}
			},
			jiaozi:{
				audio:2,
				trigger:{player:'damageBegin3',source:'damageBegin1'},
				forced:true,
				filter:function(event,player){
					return player.isMaxHandcard(true);
				},
				content:function(){
					trigger.num++;
				}
			},
			jiqiao:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard(get.prompt2('jiqiao'),[1,player.countCards('he',{type:'equip'})],'he',function(card){
						return get.type(card)=='equip';
					}).set('ai',function(card){
						if(card.name=='bagua') return 10;
						return 7-get.value(card);
					}).logSkill='jiqiao';
					'step 1'
					if(result.bool){
						event.cards=get.cards(3*result.cards.length);
						player.showCards(event.cards);
					}
					else{
						event.finish();
					}
					'step 2'
					var gained=[];
					var tothrow=[];
					for(var i=0;i<event.cards.length;i++){
						if(get.type(event.cards[i],'trick')=='trick'){
							gained.push(event.cards[i]);
						}
						else{
							tothrow.push(event.cards[i]);
						}
					}
					player.gain(gained,'gain2');
					game.cardsDiscard(tothrow);
				},
				ai:{
					threaten:1.5
				}
			},
			linglong:{
				audio:2,
				inherit:'bagua_skill',
				filter:function(event,player){
					if(!lib.skill.bagua_skill.filter(event,player)) return false;
					if(!player.isEmpty(2)) return false;
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
				},
				mod:{
					maxHandcard:function(player,num){
						if(player.getEquip(3)||player.getEquip(4)) return;
						return num+1;
					},
					targetInRange:function(card,player,target,now){
						if(player.getEquip(5)) return;
						var type=get.type(card);
						if(type=='trick'||type=='delay') return true;
					},
					canBeDiscarded:function (card,player){
						if(player.getEquip(5)) return;
						if(get.position(card)=='e'&&['equip2','equip5'].contains(get.subtype(card))) return false;
					},
					/*cardDiscardable:function (card,player){
						if(player.getEquip(5)) return;
						if(get.position(card)=='e') return false;
					},*/
				}
			},
			fenyong:{
				audio:2,
				trigger:{player:'damageEnd'},
				content:function(){
					player.addTempSkill('fenyong2');
				}
			},
			fenyong2:{
				audio:'fenyong',
				mark:true,
				intro:{
					content:'防止你受到的所有伤害'
				},
				trigger:{player:'damageBegin3'},
				forced:true,
				content:function(){
					trigger.cancel();
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					nofire:true,
					nothunder:true,
					nodamage:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')) return [0,0];
						}
					},
				}
			},
			xuehen:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.hasSkill('fenyong2')&&event.player.isAlive();
				},
				content:function(){
					'step 0'
					player.removeSkill('fenyong2');
					player.chooseControl('弃牌','出杀',function(){
						var player=_status.event.player;
						var trigger=_status.event.getTrigger();
						if(get.attitude(player,trigger.player)<0){
							var he=trigger.player.countCards('he');
							if(he<2) return '出杀';
							if(player.maxHp-player.hp>=2&&he<=3){
								return '弃牌';
							}
							if(player.maxHp-player.hp>=3&&he<=5){
								return '弃牌';
							}
							if(player.maxHp-player.hp>3){
								return '弃牌';
							}
							return '出杀';
						}
						return '出杀';
					}).set('prompt','弃置'+get.translation(trigger.player)+get.cnNumber(player.maxHp-player.hp)+'张牌，或对任意一名角色使用一张杀');
					'step 1'
					if(result.control=='弃牌'){
						player.line(trigger.player,'green');
						if(player.hp<player.maxHp&&trigger.player.countCards('he')){
							player.discardPlayerCard(trigger.player,true,'he',player.maxHp-player.hp);
						}
					}
					else{
						player.chooseUseTarget({name:'sha'},true,false,'nodistance');
					}
				}
			},
			zhenwei:{
				audio:2,
				trigger:{
					global:'useCardToTarget'
				},
				direct:true,
				filter:function(event,player){
					if(player==event.target||player==event.player) return false;
					if(!player.countCards('he')) return false;
					if(event.targets.length>1) return false;
					if(!event.target) return false;
					if(event.target.hp>=player.hp) return false;

					var card=event.card;
					if(card.name=='sha') return true;
					if(get.color(card)=='black'&&get.type(card)=='trick') return true;
					return false;
				},
				content:function(){
					"step 0"
					var save=false;
					if(get.attitude(player,trigger.target)>2){
						if(trigger.card.name=='sha'){
							if(player.countCards('h','shan')||player.getEquip(2)||
							trigger.target.hp==1||player.hp>trigger.target.hp+1){
								if(!trigger.target.countCards('h','shan')||trigger.target.countCards('h')<player.countCards('h')){
									save=true;
								}
							}
						}
						else if(trigger.card.name=='juedou'&&trigger.target.hp==1){
							save=true;
						}
						else if(trigger.card.name=='shunshou'&&
							get.attitude(player,trigger.player)<0&&
							get.attitude(trigger.player,trigger.target)<0){
							save=true;
						}
					}
					var next=player.chooseToDiscard('he',get.prompt2('zhenwei'));
					next.logSkill=['zhenwei',trigger.target];
					next.set('ai',function(card){
						if(_status.event.aisave){
							return 7-get.value(card);
						}
						return 0;
					});
					next.set('aisave',save);
					"step 1"
					if(result.bool){
						player.chooseControl('转移','失效',function(){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							if(trigger.card.name=='sha'){
								if(player.countCards('h','shan')) return '转移';
							}
							else if(trigger.card.name=='juedou'){
								if(player.countCards('h','sha')) return '转移';
							}
							return '失效';
						}).set('prompt','将'+get.translation(trigger.card)+'转移给你，或令其失效');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.control=='转移'){
						player.draw();
						trigger.getParent().targets.remove(trigger.target);
						trigger.getParent().targets.push(player);
						trigger.untrigger();
						trigger.player.line(player);
					}
					else{
						if(get.itemtype(trigger.card)=='card'){
							trigger.player.$gain2(trigger.card);
							if(!trigger.player.storage.zhenwei2){
								trigger.player.storage.zhenwei2=[trigger.card];
							}
							else{
								trigger.player.storage.zhenwei2.push(trigger.card);
							}
							ui.special.appendChild(trigger.card);
							trigger.player.markSkill('zhenwei2');
							event.trigger("addCardToStorage");
						}
						trigger.getParent().excluded.add(trigger.target);
						trigger.player.addSkill('zhenwei2');
					}
					game.delay();
				},
				ai:{
					threaten:1.1
				}
			},
			zhenwei2:{
				mark:true,
				intro:{
					content:'cards'
				},
				trigger:{global:'phaseAfter'},
				forced:true,
				content:function(){
					player.gain(player.storage.zhenwei2,'gain2');
					delete player.storage.zhenwei2;
					player.removeSkill('zhenwei2');
				}
			},
			jie:{
				audio:1,
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&event.card.name=='sha'&&get.color(event.card)=='red'&&event.notLink();
				},
				forced:true,
				content:function(){
					trigger.num++;
				}
			},
			dahe:{
				audio:1,
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
					player.chooseToCompare(target).set('preserve','win');
					'step 1'
					if(result.bool&&result.target){
						event.type=true;
						event.card=result.target;
						player.chooseTarget('将'+get.translation(result.target)+'交给一名角色',function(card,player,target){
							return target.hp<=player.hp;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.du) return -att;
							return att;
						}).set('du',event.card.name=='du');
						target.addTempSkill('dahe2');
					}
					else{
						event.type=false;
						if(player.countCards('h')){
							player.showHandcards();
							player.chooseToDiscard('h',true);
						}
					}
					'step 2'
					if(event.type){
						if(result.bool){
							player.line(result.targets,'green');
							result.targets[0].gain(event.card,'gain2');
						}
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
							if(player.canUse('sha',target)&&(player.countCards('h','sha'))){
								return -2;
							}
							return -0.5;
						}
					},
					order:9,
				}
			},
			dahe2:{
				mark:true,
				intro:{
					content:'非红桃闪无效'
				},
				mod:{
					cardRespondable:function(card,player){
						if(card.name=='shan'&&get.suit(card)!='heart') return false;
					},
				}
			},
			xunzhi:{
				audio:2,
				trigger:{player:'phaseBegin'},
				init:function(player){
					player.storage.xunzhi=0;
				},
				filter:function(event,player){
					var previous=player.getPrevious();
					var next=player.getNext();
					if(previous&&next){
						return player.hp!=previous.hp&&player.hp!=next.hp;
					}
					return false;
				},
				check:function(event,player){
					return player.hp>=3&&player.countCards('h')>player.hp+1+player.storage.xunzhi;
				},
				content:function(){
					player.loseHp();
					player.storage.xunzhi+=2;
				},
				mark:true,
				intro:{
					content:function(storage,player){
						return '手牌上限+'+player.storage.xunzhi;
					}
				},
				mod:{
					maxHandcard:function(player,num){
						if(typeof player.storage.xunzhi=='number'){
							return num+player.storage.xunzhi;
						}
					}
				}
			},
			yawang:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				forced:true,
				check:function(event,player){
					var num=game.countPlayer(function(target){
						return target.hp==player.hp;
					});
					if(!player.hasSkill('xunzhi2')){
						var nh=player.countCards('h');
						if(nh>5) return false;
						if(num==3&&nh>3) return false;
					}
					return num>=3;
				},
				content:function(){
					trigger.cancel();
					var num=game.countPlayer(function(target){
						return target.hp==player.hp;
					});
					if(num){
						player.draw(num);
					}
					player.storage.yawang=num;
					player.addTempSkill('yawang2');
				}
			},
			yawang2:{
				mod:{
					cardEnabled:function(card,player){
						if(_status.currentPhase!=player) return;
						if(player.countUsed()>=player.storage.yawang) return false;
					}
				}
			},
			junwei:{
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.storage.yinling&&player.storage.yinling.length>=3;
				},
				content:function(){
					'step 0'
					if(player.storage.yinling.length>3){
						player.chooseButton(3,[get.prompt('junwei'),'hidden',player.storage.yinling]).set('ai',function(button){
							return 1;
						});
					}
					else{
						player.chooseBool().set('createDialog',[get.prompt('junwei'),'hidden',player.storage.yinling]).set('dialogselectx',true);
						event.cards=player.storage.yinling.slice(0);
					}
					'step 1'
					if(result.bool){
						var cards=event.cards||result.links;
						for(var i=0;i<cards.length;i++){
							player.storage.yinling.remove(cards[i]);
						}
						game.cardsDiscard(cards);
						player.$throw(cards);
						player.syncStorage('yinling');
						if(player.storage.yinling.length==0){
							player.unmarkSkill('yinling');
						}
						else{
							player.markSkill('yinling');
						}
						game.delay();
						player.chooseTarget(true,function(card,player,target){
							return player!=target;
						}).set('ai',function(target){
							return -get.attitude(_status.event.player,target)/Math.sqrt(1+target.hp);
						});
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool&&result.targets&&result.targets.length){
						var target=result.targets[0];
						player.logSkill('junwei',result.targets);
						event.target=target;
						var nshan=target.countCards('h','shan');
						if(nshan==0){
							event.directfalse=true;
						}
						else{
							target.chooseCard('交给'+get.translation(player)+'一张闪，或流失一点体力',function(card){
								return card.name=='shan';
							}).set('ai',function(card){
								if(_status.event.nshan>1) return 1;
								if(_status.event.player.hp>=3) return 0;
								return 1;
							}).set('nshan',nshan);
						}
					}
					else{
						event.finish();
					}
					'step 3'
					if(!event.directfalse&&result.bool) game.delay();
					ui.clear();
					'step 4'
					if(!event.directfalse&&result.bool){
						event.cards=result.cards;
						event.target.$throw(result.cards);
						player.chooseTarget('将闪交给一名角色',true,function(card,player,target){
							return target!=_status.event.getParent().target;
						}).set('ai',function(target){
							return get.attitude(_status.event.player,target)/(target.countCards('h','shan')+1);
						});
					}
					else{
						event.target.loseHp();
						delete event.cards;
					}
					'step 5'
					if(event.cards){
						player.line(result.targets,'green');
						result.targets[0].gain(event.cards,'gain2');
						game.log(player,'将',event.cards,'交给',result.targets[0]);
						event.finish();
					}
					else{
						if(event.target.countCards('e')){
							player.choosePlayerCard('e','将'+get.translation(event.target)+'的一张装备牌移出游戏',true,event.target);
						}
						else{
							event.finish();
						}
					}
					'step 6'
					if(result.bool){
						var card=result.links[0];
						if(event.target.storage.junwei2){
							event.target.storage.junwei2.push(card);
							event.target.markSkill('junwei2');
						}
						else{
							event.target.storage.junwei2=[card];
						}
						event.target.lose(card,ui.special);
						event.target.addSkill('junwei2');
						event.target.syncStorage('junwei2');
					}
				}
			},
			junwei2:{
				mark:true,
				intro:{
					content:'cards'
				},
				trigger:{player:'phaseEnd'},
				forced:true,
				content:function(){
					'step 0'
					if(player.storage.junwei2.length){
						var card=player.storage.junwei2.shift();
						player.equip(card);
						event.redo();
					}
					'step 1'
					player.removeSkill('junwei2');
					delete player.storage.junwei2;
				}
			},
			yinling:{
				enable:'phaseUse',
				filterCard:{color:'black'},
				position:'he',
				intro:{
					content:'cards',
					onunmark:'throw'
				},
				filter:function(event,player){
					return player.countCards('he',{color:'black'})>0&&player.storage.yinling.length<4;
				},
				filterTarget:function(card,player,target){
					return target.countCards('he')>0&&target!=player;
				},
				init:function(player){
					player.storage.yinling=[];
				},
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					player.choosePlayerCard('hej',target,true);
					'step 1'
					if(result.bool&&result.links&&result.links.length){
						target.$give(result.links,player);
						target.lose(result.links,ui.special,'toStorage');
						player.storage.yinling.push(result.links[0]);
						player.markSkill('yinling');
						player.syncStorage('yinling');
					}
				},
				ai:{
					order:10.1,
					expose:0.1,
					result:{
						target:function(player,target){
							if(target.hasSkill('tuntian')) return 0;
							var es=target.getCards('e');
							var nh=target.countCards('h');
							var noe=(es.length==0||target.hasSkillTag('noe'));
							var noe2=(es.length==1&&es[0].name=='baiyin'&&target.hp<target.maxHp);
							var noh=(nh==0||target.hasSkillTag('noh'));
							if(noh&&noe) return 0;
							if(noh&&noe2) return 0.01;
							if(get.attitude(player,target)<=0) return (target.countCards('he'))?-1.5:1.5;
							var js=target.getCards('j');
							if(js.length){
								var jj=js[0].viewAs?{name:js[0].viewAs}:js[0];
								if(jj.name=='guohe') return 3;
								if(js.length==1&&get.effect(target,jj,target,player)>=0){
									return -1.5;
								}
								return 2;
							}
							return -1.5;
						},
					},
				}
			},
			yanxiao:{
				audio:2,
				enable:'phaseUse',
				filterCard:{suit:'diamond'},
				filterTarget:true,
				check:function(card){
					return 7-get.value(card);
				},
				position:'he',
				filter:function(event,player){
					return player.countCards('he',{suit:'diamond'})>0;
				},
				discard:false,
				lose:false,
				prepare:'give',
				content:function(){
					player.lose(cards,ui.special,'toStorage','visible');
					if(target.hasSkill('yanxiao2')&&target.storage.yanxiao2){
						target.storage.yanxiao2.push(cards[0]);
						target.syncStorage('yanxiao2');
						target.markSkill('yanxiao2');
					}
					else{
						target.storage.yanxiao2=cards.slice(0);
						target.syncStorage('yanxiao2');
						target.addSkill('yanxiao2');
					}
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(target.storage.yanxiao2&&target.storage.yanxiao2.length) return 0;
							if(target.countCards('j')) return 1;
							return 0;
						}
					}
				}
			},
			yanxiao2:{
				audio:'yanxiao',
				mark:true,
				intro:{
					content:'cards'
				},
				trigger:{player:'phaseJudgeBegin'},
				forced:true,
				content:function(){
					var cards=player.storage.yanxiao2.concat(player.getCards('j'));
					player.gain(cards,'gain2','log','fromStorage');
					delete player.storage.yanxiao2;
					player.removeSkill('yanxiao2');
				},
				ai:{
					effect:{
						target:function(card){
							if(get.type(card)=='delay') return [0,0.1];
						}
					}
				}
			},
			anxian:{
				audio:2,
				group:['anxian_source','anxian_target'],
				subSkill:{
					source:{
						audio:"anxian",
						trigger:{source:'damageBegin2'},
						filter:function(event,player){
							return event.card&&event.card.name=='sha';
						},
						check:function(event,player){
							if(get.damageEffect(event.player,player,player)<=0) return true;
							return false;
						},
						content:function(){
							'step 0'
							if(trigger.player.countCards('h')){
								trigger.player.chooseToDiscard(true);
							}
							'step 1'
							player.draw();
							trigger.cancel();
						}
					},
					target:{
						audio:"anxian",
						trigger:{target:'shaBefore'},
						direct:true,
						filter:function(event,player){
							return player.countCards('h');
						},
						content:function(){
							"step 0"
							var next=player.chooseToDiscard(get.prompt2('anxian'));
							next.set('ai',function(card){
								var player=_status.event.player;
								var trigger=_status.event.getTrigger();
								if(get.attitude(player,trigger.player)>0){
									return 9-get.value(card);
								}
								if(player.countCards('h',{name:'shan'})) return -1;
								return 7-get.value(card);
							});
							next.logSkill='anxian';
							"step 1"
							if(result.bool){
								trigger.player.draw();
								trigger.cancel();
							}
						},
					}
				}
			},
			luoyan_tianxiang:{
				inherit:'tianxiang',
				filter:function(event,player){
					if(!player.storage.xingwu||!player.storage.xingwu.length) return false;
					if(player.hasSkill('tianxiang')) return false;
					return lib.skill.tianxiang.filter(event,player);
				},
			},
			luoyan_liuli:{
				inherit:'liuli',
				filter:function(event,player){
					if(!player.storage.xingwu||!player.storage.xingwu.length) return false;
					if(player.hasSkill('liuli')) return false;
					return lib.skill.liuli.filter(event,player);
				},
			},
			luoyan:{
				group:['luoyan_tianxiang','luoyan_liuli'],
			},
			xingwu:{
				audio:2,
				group:['xingwu_color','xingwu_color2'],
				subSkill:{
					color:{
						trigger:{player:'phaseBegin'},
						silent:true,
						content:function(){
							player.storage.xingwu_color=['black','red'];
						}
					},
					color2:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event,player){
							return Array.isArray(player.storage.xingwu_color)&&_status.currentPhase==player;
						},
						content:function(){
							player.storage.xingwu_color.remove(get.color(trigger.card));
						}
					}
				},
				trigger:{player:'phaseDiscardBegin'},
				direct:true,
				filter:function(event,player){
					if(!player.storage.xingwu_color) return false;
					var length=player.storage.xingwu_color.length;
					if(length==0) return false;
					var hs=player.getCards('h');
					if(hs.length==0) return false;
					if(length==2) return true;
					var color=player.storage.xingwu_color[0];
					for(var i=0;i<hs.length;i++){
						if(get.color(hs[i])==color) return true;
					}
					return false;
				},
				intro:{
					content:'cards'
				},
				init:function(player){
					player.storage.xingwu=[];
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt('xingwu'),function(card){
						return _status.event.player.storage.xingwu_color.contains(get.color(card));
					}).set('ai',function(card){
						var player=_status.event.player;
						if(player.storage.xingwu.length==2){
							if(!game.hasPlayer(function(current){
								return (current!=player&&current.sex=='male'&&
									get.damageEffect(current,player,player)>0&&
									get.attitude(player,current)<0)
							})) return 0;
						}
						return 7-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('xingwu');
						if(player.storage.xingwu.length<2){
							player.$give(result.cards,player);
						}
						player.lose(result.cards,ui.special);
						player.storage.xingwu=player.storage.xingwu.concat(result.cards);
						player.markSkill('xingwu');
						player.syncStorage('xingwu');
					}
					else{
						event.finish();
					}
					'step 2'
					if(player.storage.xingwu.length==3){
						player.$throw(player.storage.xingwu);
						while(player.storage.xingwu.length){
							player.storage.xingwu.shift().discard();
						}
						player.unmarkSkill('xingwu');
						player.chooseTarget(function(card,player,target){
							return target!=player&&target.sex=='male';
						},'对一名男性角色造成两点伤害并弃置其装备区内的牌').set('ai',function(target){
							var player=_status.event.player;
							if(get.attitude(player,target)>0) return -1;
							return get.damageEffect(target,player,player)+target.countCards('e')/2;
						});
					}
					else{
						event.finish();
					}
					'step 3'
					if(result.bool){
						var target=result.targets[0];
						target.damage(2);
						event.target=target;
						player.line(target,'green');
					}
					else{
						event.finish();
					}
					'step 4'
					if(event.target&&event.target.isAlive()){
						var es=event.target.getCards('e');
						if(es.length){
							event.target.discard(es);
						}
					}
				},
				ai:{
					threaten:1.5
				}
			},
			yinbing:{
				trigger:{player:'phaseEnd'},
				direct:true,
				audio:2,
				init:function(player){
					player.storage.yinbing=[];
				},
				filter:function(event,player){
					return player.countCards('he',{type:'basic'})<player.countCards('he');
				},
				marktext:'兵',
				content:function(){
					"step 0"
					player.chooseCard([1,player.countCards('he')-player.countCards('he',{type:'basic'})],'he',get.prompt('yinbing'),function(card){
						return get.type(card)!='basic';
					}).set('ai',function(card){
						return 6-get.value(card);
					});
					"step 1"
					if(result.bool){
						player.$give(result.cards,player,false);
						player.logSkill('yinbing');
						game.log(player,'将',result.cards,'置于武将牌上');
						player.storage.yinbing=player.storage.yinbing.concat(result.cards);
						player.lose(result.cards,ui.special,'toStorage');
						player.markSkill('yinbing');
						player.syncStorage('yinbing');
					}
				},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							game.cardsDiscard(storage);
							player.$throw(storage);
							delete player.storage.yinbing;
						}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'||card.name=='juedou'){
								if(current<0) return 1.2;
							}
						}
					},
					threaten:function(player,target){
						if(target.storage.yinbing&&target.storage.yinbing.length) return 2;
						return 1;
					}
				},
				subSkill:{
					discard:{
						trigger:{player:'damageEnd'},
						forced:true,
						filter:function(event,player){
							return event.card&&player.storage.yinbing.length>0&&
							(event.card.name=='sha'||event.card.name=='juedou');
						},
						content:function(){
							'step 0'
							player.chooseCardButton('移去一张引兵牌',true,player.storage.yinbing);
							'step 1'
							var card=result.links[0];
							player.storage.yinbing.remove(card);
							game.cardsDiscard(card);
							player.$throw(card);
							game.log(player,'将',card,'置入弃牌堆');
							player.syncStorage('yinbing');
							if(player.storage.yinbing.length==0){
								player.unmarkSkill('yinbing');
							}
						}
					}
				},
				group:'yinbing_discard'
			},
			juedi:{
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.storage.yinbing&&player.storage.yinbing.length>0;
				},
				forced:true,
				audio:2,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('juedi'),true,function(card,player,target){
						return player.hp>=target.hp;
					}).set('ai',function(target){
						var player=_status.event.player;
						var att=get.attitude(player,target);
						if(att<2) return att-10;
						var num=att/10;
						if(target==player){
							num+=player.maxHp-player.countCards('h')+0.5;
						}
						else{
							num+=_status.event.n2*2;
							if(target.isDamaged()){
								if(target.hp==1){
									num+=3;
								}
								else if(target.hp==2){
									num+=2;
								}
								else{
									num+=0.5;
								}
							}
						}
						if(target.hasJudge('lebu')){
							num/=2;
						}
						return num;
					}).set('n2',player.storage.yinbing.length);
					'step 1'
					if(result.bool){
						player.line(result.targets[0],'green');
						if(result.targets[0]==player){
							player.$throw(player.storage.yinbing,1000);
							var num=player.maxHp-player.countCards('h');
							if(num>0) player.draw(num);
							game.cardsDiscard(player.storage.yinbing);
							player.storage.yinbing=[];
							player.syncStorage('yinbing');
							player.unmarkSkill('yinbing');
						}
						else{
							var target=result.targets[0];
							target.recover();
							target.gain(player.storage.yinbing.slice(0),'gain2','log','fromStorage');
							target.draw(player.storage.yinbing.length);
							player.storage.yinbing.length=0;
						}
						player.syncStorage('yinbing');
						player.unmarkSkill('yinbing');
					}
				}
			},
			meibu:{
				trigger:{global:'phaseUseBegin'},
				filter:function(event,player){
					return event.player!=player&&get.distance(event.player,player,'attack')>1;
				},
				logTarget:'player',
				check:function(event,player){
					if(get.attitude(player,event.player)>=0) return false;
					var e2=player.getEquip(2);
					if(e2){
						if(e2.name=='tengjia') return true;
						if(e2.name=='bagua') return	true;
					}
					return player.countCards('h','shan')>0;
				},
				content:function(){
					var target=trigger.player;
					target.addTempSkill('meibu_viewas');
					target.addTempSkill('meibu_range');
					target.storage.meibu=player;
					target.markSkillCharacter('meibu',player,'魅步','锦囊牌均视为杀且'+get.translation(player)+'视为在攻击范围内');
				},
				ai:{
					expose:0.2
				},
				subSkill:{
					range:{
						mod:{
							targetInRange:function(card,player,target){
								if(card.name=='sha'&&target==player.storage.meibu){
									return true;
								}
							}
						},
						onremove:function(player){
							game.broadcast(function(player){
								if(player.marks.meibu){
									player.marks.meibu.delete();
									delete player.marks.meibu;
								}
							},player);
							if(player.marks.meibu){
								player.marks.meibu.delete();
								delete player.marks.meibu;
								game.addVideo('unmark',player,'meibu');
							}
						},
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.skill=='meibu_viewas'
						},
						content:function(){
							player.removeSkill('meibu_viewas');
							game.broadcastAll(function(player){
								if(player.marks.meibu&&player.marks.meibu.info){
									player.marks.meibu.info.content=player.marks.meibu.info.content.slice(8);
								}
							},player);
						}
					},
					viewas:{
						mod:{
							cardEnabled:function(card,player){
								if(card.name!='sha'&&get.type(card,'trick')=='trick') return false;
							},
							cardUsable:function(card,player){
								if(card.name!='sha'&&get.type(card,'trick')=='trick') return false;
							},
							cardRespondable:function(card,player){
								if(card.name!='sha'&&get.type(card,'trick')=='trick') return false;
							},
							cardSavable:function(card,player){
								if(card.name!='sha'&&get.type(card,'trick')=='trick') return false;
							},
						},
						enable:['chooseToUse','chooseToRespond'],
						filterCard:function(card){
							return get.type(card,'trick')=='trick';
						},
						viewAs:{name:'sha'},
						check:function(){return 1},
						ai:{
							effect:{
								target:function(card,player,target,current){
									if(get.tag(card,'respondSha')&&current<0) return 0.8
								}
							},
							respondSha:true,
							order:4,
							useful:-1,
							value:-1
						}
					}
				}
			},
			mumu:{
				enable:'phaseUse',
				usable:1,
				filterCard:function(card,player,target){
					return card.name=='sha'||(get.type(card,'trick')=='trick'&&get.color(card)=='black');
				},
				check:function(card){
					return 7-get.value(card);
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					return target.getEquip(1)||target.getEquip(2);
				},
				content:function(){
					'step 0'
					var e1=target.getEquip(1);
					var e2=target.getEquip(2);
					event.e1=e1;
					event.e2=e2;
					if(e1&&e2){
						player.chooseControl('武器牌','防具牌').set('ai',function(){
							if(_status.event.player.getEquip(2)){
								return '武器牌';
							}
							return '防具牌';
						});
					}
					else if(e1){
						event.choice='武器牌';
					}
					else{
						event.choice='防具牌';
					}
					'step 1'
					var choice=event.choice||result.control;
					if(choice=='武器牌'){
						if(event.e1){
							target.discard(event.e1);
						}
						player.draw();
					}
					else{
						if(event.e2){
							player.equip(event.e2);
							target.$give(event.e2,player);
						}
					}
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(target.getEquip(2)&&!player.getEquip(2)){
								return -2;
							}
							return -1;
						}
					}
				}
			},
			fentian:{
				audio:2,
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					if(player.countCards('h')>=player.hp) return false;
					return game.hasPlayer(function(current){
						return player!=current&&get.distance(player,current,'attack')<=1&&current.countCards('he');
					});
				},
				intro:{
					content:'cards',
				},
				init:function(player){
					player.storage.fentian=[];
				},
				content:function(){
					'step 0'
					player.chooseTarget('焚天：选择一名攻击范围内的角色，将其一张牌置于你的武将牌上',true,function(card,player,target){
						return player!=target&&get.distance(player,target,'attack')<=1&&target.countCards('he')>0;
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target)
					});
					'step 1'
					if(result.bool){
						player.logSkill('fentian',result.targets);
						event.target=result.targets[0];
						player.choosePlayerCard(result.targets[0],'he',true);
					}
					else{
						event.finish();
					}
					'step 2'
					if(result.bool){
						event.target.$give(result.links,player);
						event.target.lose(result.links,ui.special,'toStorage');
						player.storage.fentian=player.storage.fentian.concat(result.links);
						player.syncStorage('fentian');
						setTimeout(function(){
							player.markSkill('fentian');
						},700);
					}
				},
				mod:{
					attackFrom:function(from,to,distance){
						return distance-from.storage.fentian.length;
					}
				}
			},
			zhiri:{
				trigger:{player:'phaseBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				audio:2,
				skillAnimation:true,
				animationColor:'fire',
				derivation:'xintan',
				filter:function(event,player){
					return player.storage.fentian&&player.storage.fentian.length>=3&&!player.storage.zhiri;
				},
				content:function(){
					player.loseMaxHp();
					player.addSkill('xintan');
					player.storage.zhiri=true;
					player.awakenSkill('zhiri');
				}
			},
			xintan:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				unique:true,
				filter:function(event,player){
					return player.storage.fentian&&player.storage.fentian.length>=2;
				},
				filterTarget:true,
				prompt:'移去两张“焚”并令一名角色失去一点体力',
				content:function(){
					'step 0'
					player.chooseCardButton(2,'移去两张“焚”并令'+get.translation(target)+'失去一点体力',player.storage.fentian,true);
					'step 1'
					if(result.bool){
						player.$throw(result.links);
						for(var i=0;i<result.links.length;i++){
							player.storage.fentian.remove(result.links[i]);
						}
						game.cardsDiscard(player.storage.fentian);
						player.syncStorage('fentian');
						target.loseHp();
					}
				},
				ai:{
					order:8,
					result:{
						target:-1
					}
				}
			},
			danji:{
				skillAnimation:true,
				animationColor:'water',
				trigger:{player:'phaseBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				filter:function(event,player){
					return !player.storage.danji&&player.countCards('h')>player.hp;
				},
				content:function(){
					player.storage.danji=true;
					player.loseMaxHp();
					player.addSkill('mashu');
					player.addSkill('nuzhan');
					player.awakenSkill('danji');
				}
			},
			nuzhan:{
				audio:2,
				trigger:{player:'useCard'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.cards&&
						event.cards.length==1&&get.type(event.cards[0],'trick')=='trick';
				},
				forced:true,
				content:function(){
					if(player.stat[player.stat.length-1].card.sha>0){
						player.stat[player.stat.length-1].card.sha--;
					}
				},
				group:'nuzhan2'
			},
			nuzhan2:{
				audio:'nuzhan',
				trigger:{source:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.cards&&
						event.cards.length==1&&get.type(event.cards[0])=='equip';
				},
				content:function(){
					trigger.num++;
				}
			},
			tunchu:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				check:function(event,player){
					return player.countCards('h')-player.countCards('h',{type:'equip'})<=player.hp;
				},
				filter:function(event,player){
					if(player.storage.tunchu&&player.storage.tunchu.length) return false;
					return true;
				},
				content:function(){
					trigger.num+=2;
					player.addTempSkill('tunchu_choose','phaseDrawAfter');
				},
				init:function(player){
					player.storage.tunchu=[];
				},
				intro:{
					content:'cards'
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
				trigger:{global:'phaseEnd'},
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
			jieyuan:{
				group:['jieyuan_more','jieyuan_less'],
				subSkill:{
					more:{
						audio:true,
						trigger:{source:'damageBegin1'},
						direct:true,
						filter:function(event,player){
							if(!player.hasSkill('fenxin_nei')){
								if(!player.countCards('h',{color:'black'})) return false;
							}
							return (event.player.hp>=player.hp||player.hasSkill('fenxin_fan'))&&player!=event.player;
						},
						content:function(){
							'step 0'
							var goon=(get.attitude(player,trigger.player)<0);
							var next=player.chooseToDiscard(get.prompt('jieyuan',trigger.player));
							if(!player.hasSkill('fenxin_nei')){
								next.set('filterCard',function(card){
									return get.color(card)=='black';
								});
								next.set('prompt2','弃置一张黑色手牌令伤害+1');
							}
							else{
								next.set('prompt2','弃置一张手牌令伤害+1');
							}
							next.set('ai',function(card){
								if(_status.event.goon){
									return 8-get.value(card);
								}
								return 0;
							});
							next.set('goon',goon);
							next.logSkill=['jieyuan_more',trigger.player];
							'step 1'
							if(result.bool){
								trigger.num++;
							}
						}
					},
					less:{
						audio:true,
						trigger:{player:'damageBegin2'},
						filter:function(event,player){
							if(!player.hasSkill('fenxin_nei')){
								if(!player.countCards('h',{color:'red'})) return false;
							}
							return event.source&&(event.source.hp>=player.hp||player.hasSkill('fenxin_zhong'))&&player!=event.source;
						},
						direct:true,
						content:function(){
							"step 0"
							var next=player.chooseToDiscard(get.prompt('jieyuan'),{color:'red'});
							if(!player.hasSkill('fenxin_nei')){
								next.set('filterCard',function(card){
									return get.color(card)=='red';
								});
								next.set('prompt2','弃置一张红色手牌令伤害-1');
							}
							else{
								next.set('prompt2','弃置一张手牌令伤害-1');
							}
							next.set('ai',function(card){
								var player=_status.event.player;
								if(player.hp==1||_status.event.getTrigger().num>1){
									return 9-get.value(card);
								}
								if(player.hp==2){
									return 8-get.value(card);
								}
								return 7-get.value(card);
							});
							next.logSkill='jieyuan_less';
							"step 1"
							if(result.bool){
								trigger.num--;
							}
						}
					}
				},
				ai:{
					expose:0.2,
					threaten:1.5
				}
			},
			fenxin:{
				mode:['identity'],
				trigger:{global:'dieAfter'},
				filter:function(event,player){
					return ['fan','zhong','nei'].contains(event.player.identity)&&!player.hasSkill('fenxin_'+event.player.identity);
				},
				forced:true,
				content:function(){
					player.addSkill('fenxin_'+trigger.player.identity);
					player.markSkill('fenxin');
				},
				intro:{
					mark:function(dialog,content,player){
						if(player.hasSkill('fenxin_zhong')){
							dialog.addText('你发动“竭缘”减少伤害无体力值限制');
						}
						if(player.hasSkill('fenxin_fan')){
							dialog.addText('你发动“竭缘”增加伤害无体力值限制');
						}
						if(player.hasSkill('fenxin_nei')){
							dialog.addText('将“竭缘”中的黑色手牌和红色手牌改为一张牌');
						}
					}
				},
				subSkill:{
					fan:{},
					zhong:{},
					nei:{}
				},
				ai:{
					combo:'jieyuan'
				}
			},
			fenxin_old:{
				mode:['identity'],
				trigger:{source:'dieBegin'},
				init:function(player){
					player.storage.fenxin=false;
				},
				intro:{
					content:'limited'
				},
				skillAnimation:'epic',
				animationColor:'fire',
				unique:true,
				limited:true,
				audio:2,
				mark:true,
				filter:function(event,player){
					if(player.storage.fenxin) return false;
					return event.player.identity!='zhu'&&player.identity!='zhu'&&
						player.identity!='mingzhong'&&event.player.identity!='mingzhong';
				},
				check:function(event,player){
					if(player.identity==event.player.identity) return Math.random()<0.5;
					var stat=get.situation();
					switch(player.identity){
						case 'fan':
							if(stat<0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'zhong':
							if(stat>0) return false;
							if(stat==0) return Math.random()<0.6;
							return true;
						case 'nei':
							if(event.player.identity=='fan'&&stat<0) return true;
							if(event.player.identity=='zhong'&&stat>0) return true;
							if(stat==0) return Math.random()<0.7;
							return false;
					}
				},
				prompt:function(event,player){
					return '焚心：是否与'+get.translation(event.player)+'交换身份？';
				},
				content:function(){
					game.broadcastAll(function(player,target,shown){
						var identity=player.identity;
						player.identity=target.identity;
						if(shown||player==game.me){
							player.setIdentity();
						}
						target.identity=identity;
					},player,trigger.player,trigger.player.identityShown);
					player.line(trigger.player,'green');
					player.storage.fenxin=true;
					player.awakenSkill('fenxin_old');
				}
			},
			qingyi:{
				group:['qingyi1','qingyi2']
			},
			qingyi1:{
				audio:true,
				trigger:{player:'phaseBegin'},
				direct:true,
				content:function(){
					"step 0"
					player.addSkill('qingyi3');
					var check= player.countCards('h')>2;
					player.chooseTarget(get.prompt2('qingyi'),function(card,player,target){
						if(player==target) return false;
						return player.canUse({name:'sha'},target);
					}).ai=function(target){
						if(!check) return 0;
						return get.effect(target,{name:'sha'},_status.event.player);
					}
					"step 1"
					if(result.bool){
						player.logSkill('qingyi1',result.targets);
						player.useCard({name:'sha'},result.targets[0],false);
						player.skip('phaseJudge');
						player.skip('phaseDraw');
					}
					player.removeSkill('qingyi3');
				}
			},
			qingyi2:{
				audio:true,
				trigger:{player:'phaseUseBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				content:function(){
					"step 0"
					player.addSkill('qingyi3');
					var check=player.countCards('h')<=player.hp;
					player.chooseCardTarget({
						prompt:get.prompt2('qingyi'),
						filterCard:function(card,player){
							return get.type(card)=='equip'&&lib.filter.cardDiscardable(card,player);
						},
						position:'he',
						filterTarget:function(card,player,target){
							if(player==target) return false;
							return player.canUse({name:'sha'},target);
						},
						ai1:function(card){
							if(!_status.event.check) return 0;
							return 6-get.value(card);
						},
						ai2:function(target){
							if(!_status.event.check) return 0;
							return get.effect(target,{name:'sha'},_status.event.player);
						},
						check:check
					});
					"step 1"
					if(result.bool){
						player.logSkill('qingyi2',result.targets);
						player.discard(result.cards[0]);
						player.useCard({name:'sha'},result.targets[0]);
						trigger.cancel();
					}
					player.removeSkill('qingyi3');
				}
			},
			qingyi3:{
				mod:{
					targetInRange:function(card,player,target,now){
						return true;
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
							if(get.tag(card,'fireDamage')) return 0;
						}
					}
				}
			},
			fenyin:{
				audio:2,
				trigger:{player:'useCard'},
				frequent:true,
				//usable:3,
				filter:function(event,player){
					if(!event.cards||event.cards.length!=1) return false;
					if(_status.currentPhase!=player) return false;
					if(!player.storage.fenyin) return false;
					return get.color(player.storage.fenyin)!=get.color(event.cards[0]);
				},
				content:function(){
					player.draw();
				},
				intro:{
					content:'card'
				},
				group:['fenyin2','fenyin3']
			},
			fenyin3:{
				trigger:{player:'useCard'},
				priority:-1,
				silent:true,
				filter:function(event,player){
					if(!event.cards||event.cards.length!=1) return false;
					if(_status.currentPhase!=player) return false;
					return true;
				},
				content:function(){
					player.storage.fenyin=trigger.cards[0];
				}
			},
			fenyin2:{
				trigger:{player:'phaseBefore'},
				silent:true,
				priority:10,
				content:function(){
					player.storage.fenyin=null;
				}
			},
			dujin:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				frequent:true,
				content:function(){
					trigger.num+=1+Math.floor(player.countCards('e')/2);
				}
			},
			qirang:{
				audio:2,
				trigger:{player:'equipEnd'},
				frequent:true,
				content:function(){
					player.gain(get.cardPile(function(card){
						return get.type(card,'trick')=='trick';
					}),'gain2');
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip') return [1,3];
						}
					},
					threaten:1.3
				}
			},
			yuhua:{
				trigger:{player:'phaseDiscardBegin'},
				forced:true,
				audio:2,
				filter:function(event,player){
					return event.parent.name=='phaseDiscard'&&player.countCards('h',{type:'basic'})<player.countCards('h');
				},
				content:function(){},
				mod:{
					ignoredHandcard:function(card,player){
						if(get.type(card)!='basic'){
							return true;
						}
					},
					cardDiscardable:function(card,player,name){
						if(name=='phaseDiscard'&&get.type(card)!='basic') return false;
					}
				},
			},
			chenqing:{
				audio:2,
				trigger:{global:'dying'},
				priority:6,
				filter:function(event,player){
					return event.player.hp<=0&&!player.hasSkill('chenqing2');
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('chenqing'),function(card,player,target){
						return target!=player&&target!=_status.event.getTrigger().player;
					}).set('ai',function(target){
						var player=_status.event.player;
						var trigger=_status.event.getTrigger();
						if(get.attitude(player,trigger.player)>0){
							var att1=get.attitude(target,player);
							var att2=get.attitude(target,trigger.player);
							var att3=get.attitude(player,target);
							if(att3<0) return 0;
							return att1/2+att2+att3;
						}
						else{
							return 0;
							// return get.attitude(player,target);
						}
					});
					'step 1'
					if(result.bool){
						player.addTempSkill('chenqing2',{player:'phaseBegin'});
						event.target=result.targets[0];
						event.target.draw(4);
						player.logSkill('chenqing',event.target);
					}
					else{
						event.finish();
					}
					'step 2'
					var target=event.target;
					var tosave=trigger.player;
					var att=get.attitude(target,tosave);
					var hastao=target.countCards('h','tao');
					target.chooseToDiscard(4,true,'he').set('ai',function(card){
						var hastao=_status.event.hastao;
						var att=_status.event.att;
						if(!hastao&&att>0){
							var suit=get.suit(card);
							for(var i=0;i<ui.selected.cards.length;i++){
								if(get.suit(ui.selected.cards[i])==suit){
									return -4-get.value(card);
								}
							}
						}
						if(att<0&&ui.selected.cards.length==3){
							var suit=get.suit(card);
							for(var i=0;i<ui.selected.cards.length;i++){
								if(get.suit(ui.selected.cards[i])==suit){
									return -get.value(card);
								}
							}
							return -10-get.value(card);
						}
						return -get.value(card);
					}).set('hastao',hastao).set('att',att);
					'step 3'
					if(result.cards&&result.cards.length==4){
						var suits=[];
						for(var i=0;i<result.cards.length;i++){
							suits.add(get.suit(result.cards[i]));
						}
						if(suits.length==4&&game.checkMod({name:'tao'},player,'unchanged','cardSavable',player)){
							event.target.useCard({name:'tao'},trigger.player);
						}
					}
				},
				ai:{
					skillTagFilter:function(player){
						return !player.hasSkill('chenqing2');
					},
					expose:0.2,
					threaten:1.5,
					save:true,
				}
			},
			mozhi:{
				audio:2,
				intro:{
					content:'cards'
				},
				init:function(player){
					player.storage.mozhi=[];
				},
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.storage.mozhi.length>0&&player.countCards('h')>0;
				},
				content:function(){
					if(player.storage.mozhi.length&&player.countCards('h')){
						var card=player.storage.mozhi.shift();
						card={name:card.name,nature:card.nature,suit:card.suit,number:card.number};
						if(lib.filter.cardEnabled(card)){
							if(game.hasPlayer(function(current){
								return player.canUse(card,current);
							})){
								lib.skill.mozhix.viewAs=card;
								var next=player.chooseToUse();
								if(next.isOnline()){
									player.send(function(card){
										lib.skill.mozhix.viewAs=card;
									},card)
								}
								next.logSkill='mozhi';
								next.set('openskilldialog','默识：将一张手牌当'+get.translation(card)+'使用');
								next.set('norestore',true);
								next.set('_backupevent','mozhix');
								next.backup('mozhix');
							}
						}
						event.redo();
					}
				},
				group:['mozhi2','mozhi3']
			},
			mozhix:{
				filterCard:true,
				selectCard:1,
				popname:true,
			},
			mozhi2:{
				trigger:{player:'phaseAfter'},
				silent:true,
				content:function(){
					player.storage.mozhi.length=0;
					player.unmarkSkill('mozhi');
				}
			},
			mozhi3:{
				trigger:{player:'useCard'},
				silent:true,
				filter:function(event,player){
					if(_status.currentPhase!=player) return false;
					if(event.parent.parent.name!='phaseUse') return false;
					var type=get.type(event.card);
					return player.storage.mozhi.length<2&&(type=='basic'||type=='trick');
				},
				content:function(){
					player.storage.mozhi.add(trigger.card);
					if(player.hasSkill('mozhi')) player.markSkill('mozhi');
				}
			},
			chenqing2:{},
			ranshang:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.nature=='fire';
				},
				init:function(player){
					player.storage.ranshang=0;
				},
				forced:true,
				check:function(){
					return false;
				},
				content:function(){
					if(player.storage.ranshang){
						player.storage.ranshang+=trigger.num;
					}
					else{
						player.storage.ranshang=trigger.num;
					}
					player.markSkill('ranshang');
					game.addVideo('storage',player,['ranshang',player.storage.ranshang]);
				},
				intro:{
					content:'mark'
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'){
								if(card.nature=='fire'||player.hasSkill('zhuque_skill')) return 2;
							}
							if(get.tag(card,'fireDamage')&&current<0) return 2;
						}
					}
				},
				group:'ranshang2'
			},
			ranshang2:{
				audio:2,
				trigger:{player:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player.storage.ranshang>0;
				},
				content:function(){
					player.loseHp(player.storage.ranshang);
				}
			},
			hanyong:{
				trigger:{player:'useCard'},
				filter:function(event,player){
					return game.roundNumber>player.hp&&event.card&&
						(event.card.name=='nanman'||event.card.name=='wanjian');
				},
				content:function(){
					player.addTempSkill('hanyong3');
					player.storage.hanyong3=trigger.card;
				},
			},
			hanyong3:{
				audio:false,
				trigger:{source:'damageBegin1'},
				forced:true,
				onremove:true,
				filter:function(event,player){
					return event.card==player.storage.hanyong3;
				},
				content:function(){
					trigger.num++;
				}
			},
			yishe:{
				audio:2,
				trigger:{player:'phaseEnd'},
				init:function(player){
					player.storage.yishe=[];
				},
				filter:function(event,player){
					return !player.storage.yishe||!player.storage.yishe.length;
				},
				intro:{
					content:'cards'
				},
				content:function(){
					'step 0'
					player.draw(2);
					player.chooseCard(2,'he',true,'选择两张牌作为“米”');
					'step 1'
					player.storage.yishe=result.cards;
					player.lose(result.cards,ui.special,'toStorage');
					player.syncStorage('yishe');
					player.markSkill('yishe');
				}
			},
			bushi:{
				audio:2,
				trigger:{player:'damageEnd',source:'damageEnd'},
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return player.storage.yishe&&player.storage.yishe.length&&event.player.isAlive();
				},
				direct:true,
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					trigger.player.chooseCardButton('选择获得一张“米”',player.storage.yishe);
					'step 2'
					if(result.bool){
						event.count--;
						player.logSkill('bushi');
						trigger.player.gain(result.links[0],'draw2','log','fromStorage');
						player.storage.yishe.remove(result.links[0]);
						player.syncStorage('yishe');
						if(player.storage.yishe.length==0){
							player.recover();
							player.unmarkSkill('yishe');
						}
						else{
							player.markSkill('yishe');
							if(event.count>0) event.goto(1);
						}
					}
				}
			},
			midao:{
				audio:2,
				unique:true,
				trigger:{global:'judge'},
				direct:true,
				filter:function(event,player){
					return player.storage.yishe&&player.storage.yishe.length&&event.player.isAlive();
				},
				content:function(){
					"step 0"
					var list=player.storage.yishe;
					player.chooseButton([get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+get.translation(trigger.player.judging[0])+
						'，'+get.prompt('midao'),list,'hidden'],function(button){
						var card=button.link;
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						var judging=_status.event.judging;
						var result=trigger.judge(card)-trigger.judge(judging);
						var attitude=get.attitude(player,trigger.player);
						return result*attitude;
					}).set('judging',trigger.player.judging[0]);
					"step 1"
					if(result.bool){
						player.logSkill('midao',trigger.player);
						var card=result.links[0];
						player.storage.yishe.remove(card);
						player.syncStorage('yishe');
						if(player.storage.yishe.length==0){
							player.recover();
							player.unmarkSkill('yishe');
						}
						else{
							player.markSkill('yishe');
						}

						player.$throw(card);
						game.broadcastAll(function(card){
							if(card.clone){
								card.clone.classList.add('thrownhighlight');
							}
						},card);
						if(trigger.player.judging[0].clone){
							trigger.player.judging[0].clone.classList.remove('thrownhighlight');
							game.broadcast(function(card){
								if(card.clone){
									card.clone.classList.remove('thrownhighlight');
								}
							},trigger.player.judging[0]);
							game.addVideo('deletenode',player,get.cardsInfo([trigger.player.judging[0].clone]));
						}
						trigger.player.judging[0]=card;
						trigger.position.appendChild(card);
						game.log(player,'的判定牌改为',card);
						game.delay(2);
					}
				},
				ai:{
					tag:{
						rejudge:0.6
					}
				}
			},
			fengpo:{
				audio:2,
				trigger:{
					player:'useCardToPlayered',
				},
				filter:function(event,player){
					if(!['sha','juedou'].contains(event.card.name)) return false;
					if(player.hasSkill('fengpo3')) return false;
					return player.isPhaseUsing()&&event.target&&event.targets&&event.targets.length==1;
				},
				direct:true,
				content:function(){
					'step 0'
					player.addTempSkill('fengpo3');
					player.chooseControl('draw_card','加伤害','cancel2').set('prompt',get.prompt2('fengpo'));
					'step 1'
					if(result.control&&result.control!='cancel2'){
						player.logSkill('fengpo');
						var nd=trigger.target.countCards('h',{suit:'diamond'});
						if(result.control=='draw_card'){
							player.draw(nd);
						}
						else{
							var trigger2=trigger.getParent();
							if(typeof trigger2.extraDamage!='number'){
							trigger2.extraDamage=0;
						}
						trigger2.extraDamage+=nd;
						}
					}
				}
			},
			fengpo2:{
				trigger:{source:'damageBegin1'},
				filter:function(event){
					return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.notLink();
				},
				forced:true,
				audio:false,
				content:function(){
					if(typeof player.storage.fengpo=='number'){
						trigger.num+=player.storage.fengpo;
					}
				}
			},
			fengpo3:{},
			biluan:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				mark:true,
				unique:true,
				intro:{
					content:function(storage){
						if(storage>0){
							return '防御距离+'+storage;
						}
						else if(storage<0){
							return '防御距离'+storage;
						}
						else{
							return '无距离变化';
						}
					}
				},
				init:function(player){
					player.storage.biluan=0;
				},
				check:function(event,player){
					if(player.countCards('h')>player.hp) return true;
					if(player.hasJudge('lebu')) return true;
					var ng=[];
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].group!='unknown'){
							ng.add(players[i].group);
						}
					}
					ng=ng.length;
					if(ng<2) return false;
					var nai=0;
					for(var i=0;i<players.length;i++){
						if(players[i]!=player){
							var dist=get.distance(players[i],player,'attack');
							if(dist<=1&&dist+ng>1){
								nai++;
							}
						}
					}
					return nai>=2;
				},
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&get.distance(current,player)<=1;
					});
				},
				content:function(){
					var ng=[];
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].group!='unknown'){
							ng.add(players[i].group);
						}
					}
					player.$damagepop(ng.length,'unknownx');
					player.storage.biluan+=ng.length;
					player.markSkill('biluan');
					game.addVideo('storage',player,['biluan',player.storage.biluan]);
					trigger.cancel();
				},
				mod:{
					globalTo:function(from,to,distance){
						if(typeof to.storage.biluan=='number'){
							return distance+to.storage.biluan;
						}
					}
				}
			},
			lixia:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					return event.player.isAlive()&&event.player!=player&&get.distance(event.player,player,'attack')>1;
				},
				forced:true,
				content:function(){
					'step 0'
					player.chooseTarget(function(card,player,target){
						return target==player||target==_status.event.getTrigger().player;
					},true,'礼下：选择一个目标摸一张牌').set('ai',function(target){
						return player==target?1:0;
					});
					'step 1'
					if(result.targets.length){
						result.targets[0].draw();
						player.line(result.targets[0],'green');
					}
					player.storage.biluan--;
					player.markSkill('biluan');
					game.addVideo('storage',player,['biluan',player.storage.biluan]);
				}
			},
			fuji:{
				trigger:{global:'damageBegin1'},
				filter:function(event){
					return event.source&&event.nature=='thunder';
				},
				check:function(event,player){
					return get.attitude(player,event.source)>0&&get.attitude(player,event.player)<0;
				},
				prompt:function(event){
					return get.translation(event.source)+'即将对'+get.translation(event.player)+'造成伤害，'+get.prompt('fuji');
				},
				logTarget:'source',
				content:function(){
					"step 0"
					trigger.source.judge(ui.special);
					"step 1"
					if(result.color=='black'){
						game.cardsDiscard(result.card);
						trigger.num++;
					}
					else{
						trigger.source.gain(result.card);
						trigger.source.$gain2(result.card);
					}
				}
			},
			fulu:{
				enable:'chooseToUse',
				filterCard:function(card){
					return card.name=='sha'&&!card.nature;
				},
				viewAs:{name:'sha',nature:'thunder'},
				ai:{
					order:function(){
						return get.order({name:'sha'})+0.1;
					}
				}
			},
			guiming:{
				unique:true,
				zhuSkill:true,
			},
			canshi:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				check:function(event,player){
					var num=game.countPlayer(function(current){
						if(player.hasZhuSkill('guiming')&&current.group=='wu') return true;
						return current.isDamaged();
					});
					return num>3;
				},
				prompt:function(event,player){
					var num=game.countPlayer(function(current){
						if(player.hasZhuSkill('guiming')&&current.group=='wu'&&current!=player) return true;
						return current.isDamaged();
					});
					return '残蚀：是否改为摸'+get.cnNumber(num)+'张牌？';
				},
				content:function(){
					trigger.cancel();
					var num=game.countPlayer(function(current){
						if(player.hasZhuSkill('guiming')&&current.group=='wu'&&current!=player) return true;
						return current.isDamaged();
					});
					if(num>0){
						player.draw(num);
					}
					player.addTempSkill('canshi2');
				}
			},
			canshi2:{
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					if(player.countCards('he')==0) return false;
					var type=get.type(event.card,'trick');
					return type=='basic'||type=='trick';
				},
				autodelay:true,
				content:function(){
					player.chooseToDiscard(true,'he');
				}
			},
			chouhai:{
				audio:2,
				trigger:{player:'damageBegin3'},
				forced:true,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return player.countCards('h')==0;
				},
				content:function(){
					trigger.num++;
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&target.countCards('h')==0) return [1,-2];
						}
					}
				}
			},
			kunfen:{
				audio:2,
				trigger:{player:'phaseEnd'},
				direct:true,
				content:function(){
					"step 0"
					if(player.storage.kunfen||
					(get.mode()=='guozhan'&&player.hiddenSkills.contains('kunfen'))){
						if(!player.storage.kunfen){
							event.skillHidden=true;
						}
						player.chooseBool(get.prompt2('kunfen')).set('ai',function(){
							var player=_status.event.player;
							if(player.hp>3) return true;
							if(player.hp==3&&player.countCards('h')<3) return true;
							if(player.hp==2&&player.countCards('h')==0) return true;
							return false;
						});
					}
					else{
						event.forced=true;
					}
					"step 1"
					if(event.forced||result.bool){
						player.logSkill('kunfen');
						player.loseHp();
					}
					else{
						event.finish();
					}
					"step 2"
					player.draw(2);
				},
				ai:{
					threaten:1.5
				}
			},
			fengliang:{
				skillAnimation:true,
				animationColor:'thunder',
				unique:true,
				juexingji:true,
				audio:2,
				derivation:'tiaoxin',
				trigger:{player:'dying'},
				priority:10,
				forced:true,
				filter:function(event,player){
					return !player.storage.kunfen;
				},
				content:function(){
					"step 0"
					player.loseMaxHp();
					"step 1"
					if(player.hp<2){
						player.recover(2-player.hp);
					}
					"step 2"
					player.addSkill('tiaoxin');
					player.storage.kunfen=true;
					player.awakenSkill('fengliang');
				},
			},
			zhuiji:{
				mod:{
					globalFrom:function(from,to){
						if(from.hp>=to.hp) return -Infinity;
					}
				}
			},
			cihuai:{
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('h','sha')==0;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('cihuai'),function(card,player,target){
						return player.canUse({name:'sha'},target);
					}).set('ai',function(target){
						var player=_status.event.player;
						return get.effect(target,{name:'sha'},player,player);
					});
					"step 1"
					if(result.bool){
						player.logSkill('cihuai');
						player.showHandcards();
						player.useCard({name:'sha'},result.targets);
					}
				},
				ai:{
					expose:0.2,
				}
			},
			jilei:{
				trigger:{player:'damageEnd'},
				priority:9,
				audio:2,
				direct:true,
				filter:function(event){
					return event&&event.source;
				},
				content:function(){
					'step 0'
					player.chooseControl('basic','trick','equip','cancel2',function(){
						var source=_status.event.source;
						if(get.attitude(_status.event.player,source)>0) return 'cancel2';
						if(_status.currentPhase!=source) return 'trick';
						if(lib.filter.cardUsable({name:'sha'},source)&&source.countCards('h')>=2) return 'basic';
						return 'trick';
					}).set('prompt',get.prompt2('jilei',trigger.source)).set('source',trigger.source);
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('jilei',trigger.source);
						player.popup(get.translation(result.control)+'牌');
						trigger.source.storage.jilei2=result.control;
						trigger.source.addTempSkill('jilei2');
					}
				},
				ai:{
					maixie_defend:true,
					threaten:0.7
				}
			},
			jilei2:{
				unique:true,
				intro:{
					content:function(storage){
						return '不能使用、打出或弃置'+get.translation(storage)+'牌';
					}
				},
				mark:true,
				onremove:true,
				mod:{
					cardDiscardable:function(card,player){
						if(player.storage.jilei2==get.type(card,'trick')) return false;
					},
					cardEnabled:function(card,player){
						if(player.storage.jilei2==get.type(card,'trick')) return false;
					},
					cardUsable:function(card,player){
						if(player.storage.jilei2==get.type(card,'trick')) return false;
					},
					cardRespondable:function(card,player){
						if(player.storage.jilei2==get.type(card,'trick')) return false;
					},
					cardSavable:function(card,player){
						if(player.storage.jilei2==get.type(card,'trick')) return false;
					},
				},
			},
			danlao:{
				audio:2,
				filter:function(event,player){
					return event.player!=player&&get.type(event.card)=='trick'&&event.targets&&event.targets.length>1;
				},
				check:function(event,player){
					return get.tag(event.card,'multineg')||get.effect(player,event.card,event.player,player)<=0;
				},
				trigger:{target:'useCardToTargeted'},
				content:function(){
					trigger.getParent().excluded.add(player);
					player.draw();
				},
				ai:{
					effect:{
						target:function(card){
							if(get.type(card)!='trick') return;
							if(card.name=='tiesuo') return [0,0];
							if(card.name=='yihuajiemu') return [0,1];
							if(get.tag(card,'multineg')) return [0,2];
						}
					}
				}
			},
			taichen:{
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player.canUse('sha',target);
				},
				content:function(){
					"step 0"
					player.loseHp();
					"step 1"
					player.useCard({name:'sha'},target,false);
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(player.hp>2&&player.hp>target.hp&&target.countCards('he')<4){
								return get.effect(target,{name:'sha'},player,target);
							}
							return 0;
						}
					}
				}
			},
			xinmanjuan:{
				audio:'manjuan',
				forced:true,
				priority:15,
				trigger:{player:'gainEnd'},
				filter:function(event,player){
					return event.type!='xinmanjuan';
				},
				content:function(){
					"step 0"
					player.lose(trigger.cards,ui.discardPile,'visible');
					player.$throw(trigger.cards,1000);
					game.log(player,'将',trigger.cards,'置入了弃牌堆')
					"step 1"
					event.cards=trigger.cards.slice(0);
					if(_status.currentPhase!=player) event.finish();
					"step 2"
					event.card=event.cards.shift();
					event.togain=[];
					var number=get.number(event.card);
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var current=ui.discardPile.childNodes[i];
						if((!trigger.cards.contains(current))&&get.number(current)==number) event.togain.push(current);
					}
					if(!event.togain.length) event.goto(4);
					"step 3"
					player.chooseButton(['是否获得其中的一张牌？',event.togain]).ai=function(button){
						return get.value(button.link);
					};
					"step 4"
					if(result.bool){
						player.gain(result.links[0],'gain2').type='xinmanjuan';
					}
					"step 5"
					if(event.cards.length) event.goto(2);
				},
				ai:{
					threaten:4.2,
					nogain:1
				},
			},
			manjuan:{
				audio:true,
				trigger:{global:'discardAfter'},
				filter:function(event,player){
					if(event.player==player) return false;
					if(!player.countCards('he')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'){
							return true;
						}
					}
					return false;
				},
				direct:true,
				unique:true,
				gainable:true,
				content:function(){
					"step 0"
					if(trigger.delay==false) game.delay();
					"step 1"
					var cards=[];
					var suits=['club','spade','heart','diamond']
					for(var i=0;i<trigger.cards.length;i++){
						if(get.position(trigger.cards[i])=='d'){
							cards.push(trigger.cards[i]);
							suits.remove(get.suit(trigger.cards[i]));
						}
					}
					if(cards.length){
						var maxval=0;
						for(var i=0;i<cards.length;i++){
							var tempval=get.value(cards[i]);
							if(tempval>maxval){
								maxval=tempval;
							}
						}
						maxval+=cards.length-1;
						var next=player.chooseToDiscard('he',{suit:suits});
						next.set('ai',function(card){
							return _status.event.maxval-get.value(card);
						});
						next.set('maxval',maxval);
						next.set('dialog',[get.prompt(event.name),'hidden',cards])
						next.logSkill=event.name;
						event.cards=cards;
					}
					"step 2"
					if(result.bool){
						player.gain(event.cards,'gain2','log');
					}
				},
				ai:{
					threaten:1.3
				}
			},
			zuixiang:{
				skillAnimation:true,
				animationColor:'gray',
				audio:true,
				unique:true,
				mark:true,
				trigger:{player:'phaseBegin'},
				priority:10,
				filter:function(event,player){
					if(player.storage.zuixiang) return false;
					return true;
				},
				check:function(event,player){
					return player.countCards('h')<player.hp&&player.hp==player.maxHp;
				},
				content:function(){
					"step 0"
					player.storage.zuixiang=get.cards(3);
					event.trigger('addCardToStorage');
					player.showCards(player.storage.zuixiang);
					player.markSkill('zuixiang');
					player.syncStorage('zuixiang');
					"step 1"
					var cards=player.storage.zuixiang;
					var bool=false;
					for(var i=0;i<cards.length;i++){
						for(var j=i+1;j<cards.length;j++){
							if(cards[i].number==cards[j].number){
								bool=true;
								break;
							}
						}
						if(bool) break;
					}
					if(bool){
						player.gain(player.storage.zuixiang,'draw2').type='xinmanjuan';
						player.storage.zuixiang=[];
						player.awakenSkill('zuixiang');
						delete player.storage.zuixiang2;
					}
					else{
						player.storage.zuixiang2=[];
						for(var i=0;i<cards.length;i++){
							player.storage.zuixiang2.add(get.type(cards[i],'trick'));
						}
					}
					player.storage.zuixiangtemp=true;
				},
				group:'zuixiang2',
				intro:{
					content:'cards'
				},
				mod:{
					targetEnabled:function(card,player,target){
						if(target.storage.zuixiang2&&target.storage.zuixiang2.contains(get.type(card,'trick'))){
							return false;
						}
					},
					cardEnabled:function(card,player){
						if(player.storage.zuixiang2&&player.storage.zuixiang2.contains(get.type(card,'trick'))){
							return false;
						}
					},
					cardUsable:function(card,player){
						if(player.storage.zuixiang2&&player.storage.zuixiang2.contains(get.type(card,'trick'))){
							return false;
						}
					},
					cardRespondable:function(card,player){
						if(player.storage.zuixiang2&&player.storage.zuixiang2.contains(get.type(card,'trick'))){
							return false;
						}
					},
					cardSavable:function(card,player){
						if(player.storage.zuixiang2&&player.storage.zuixiang2.contains(get.type(card,'trick'))){
							return false;
						}
					}
				}
			},
			zuixiang2:{
				unique:true,
				trigger:{player:'phaseBegin'},
				priority:9.5,
				filter:function(event,player){
					if(player.storage.zuixiang&&player.storage.zuixiang.length) return true;
					return false;
				},
				forced:true,
				popup:false,
				content:function(){
					"step 0"
					if(player.storage.zuixiangtemp){
						delete player.storage.zuixiangtemp;
						event.finish();
					}
					else{
						player.storage.zuixiang.addArray(get.cards(3));
						event.trigger('addCardToStorage');
						player.showCards(player.storage.zuixiang);
						player.markSkill('zuixiang');
						player.syncStorage('zuixiang');
					}
					"step 1"
					var cards=player.storage.zuixiang;
					var bool=false;
					for(var i=0;i<cards.length;i++){
						for(var j=i+1;j<cards.length;j++){
							if(cards[i].number==cards[j].number){
								bool=true;
								break;
							}
						}
						if(bool) break;
					}
					if(bool){
						player.gain(player.storage.zuixiang,'draw2').type='xinmanjuan';
						player.storage.zuixiang=[];
						player.awakenSkill('zuixiang');
						delete player.storage.zuixiang2;
					}
					else{
						player.storage.zuixiang2=[];
						for(var i=0;i<cards.length;i++){
							player.storage.zuixiang2.add(get.type(cards[i]));
						}
					}
				},
			},
			naman:{
				audio:2,
				trigger:{global:'respondEnd'},
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(event.player==player) return false;
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])=='d') return true;
						}
					}
					return false;
				},
				frequent:true,
				content:function(){
					var cards=trigger.cards.slice(0);
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])!='d'){
							cards.splice(i--,1);
						}
					}
					game.delay(0.5);
					player.gain(cards,'gain2');
				},
			},
			xiemu:{
				audio:2,
				trigger:{target:'useCardToBegin'},
				filter:function(event,player){
					if(get.color(event.card)!='black') return false;
					if(!event.player) return false;
					if(event.player==player) return false;
					return player.countCards('h','sha')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var next=player.chooseToDiscard('协穆：是否弃置一张杀并摸两张牌？',{name:'sha'});
					next.set('ai',function(card){
						return 9-get.value(card);
					});
					next.logSkill='xiemu';
					"step 1"
					if(result.bool){
						player.draw(2);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.color(card)=='black'&&target.countCards('h')>0){
								return [1,0.5];
							}
						}
					}
				}
			},
			spmengjin:{
				trigger:{player:'shaBegin'},
				filter:function(event,player){
					return event.target.countCards('he')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var att=get.attitude(player,trigger.target);
					player.choosePlayerCard(get.prompt('spmengjin',trigger.target),'he',trigger.target).ai=function(button){
						var val=get.buttonValue(button);
						if(att>0) return -val;
						return val;
					};
					"step 1"
					if(result.bool){
						trigger.target.discard(result.links);
						player.logSkill('spmengjin',trigger.target);
						trigger.target.addTempSkill('mengjin2','shaAfter');
					}
				},
				ai:{
					expose:0.2
				}
			},
			fenxun_old:{
				audio:2,
				trigger:{player:'shaBefore'},
				direct:true,
				filter:function(event,player){
					return event.targets.length==1;
				},
				position:'he',
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:lib.filter.cardDiscardable,
						filterTarget:function(card,player,target){
							var trigger=_status.event.getTrigger();
							return lib.filter.targetEnabled(trigger.card,player,target)&&target!=trigger.targets[0];
						},
						ai1:function(card){
							return 6-get.value(card);
						},
						ai2:function(target){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							return get.effect(target,trigger.card,player,player);
						},
						prompt:get.prompt2('fenxun')
					});
					"step 1"
					if(result.bool){
						player.discard(result.cards);
						trigger.targets.push(result.targets[0]);
						player.logSkill('fenxun',result.targets);
					}
				}
			},
			zhoufu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterCard:true,
				filterTarget:function(card,player,target){
					return player!=target&&!target.hasSkill('zhoufu2');
				},
				prepare:'throw',
				discard:false,
				lose:false,
				content:function(){
					player.lose(cards,ui.special,'toStorage');
					target.$gain2(cards);
					target.storage.zhoufu2=cards[0];
					target.addSkill('zhoufu2');
					target.storage.zhoufu3=player;
					ui.special.appendChild(cards[0]);
					target.syncStorage('zhoufu2');
				},
				check:function(card){
					return 6-get.value(card)
				},
				ai:{
					expose:0.1,
					order:1,
					result:{
						player:1
					}
				}
			},
			zhoufu2:{
				trigger:{player:'judgeBegin'},
				forced:true,
				priority:10,
				mark:'card',
				filter:function(event){
				 return !event.directresult;
				},
				content:function(){
					"step 0"
					trigger.directresult=player.storage.zhoufu2;
					player.removeSkill('zhoufu2');
					delete player.storage.zhoufu2;
					delete player.storage.zhoufu2_markcount;
					if(player.storage.zhoufu3.isIn()){
						player.storage.zhoufu3.line(player,'green');
					}
					"step 1"
					player.addTempSkill('zhoufu3');
				},
				intro:{
					content:'card'
				}
			},
			zhoufu3:{
				trigger:{global:'phaseEnd'},
				silent:true,
				content:function(){
					if(player.storage.zhoufu3.isIn()){
						player.storage.zhoufu3.logSkill('zhoufu',player);
						player.loseHp();
					}
					delete player.storage.zhoufu3;
				},
				onremove:true
			},
			yingbin:{
				audio:2,
				trigger:{global:'useCard'},
				filter:function(event,player){
					return event.player.hasSkill('zhoufu2')&&event.player.storage.zhoufu3==player&&
						get.suit(event.player.storage.zhoufu2)==get.suit(event.card);
				},
				forced:true,
				autodelay:true,
				content:function(){
					player.draw();
					if(trigger.player.storage.zhoufu2_markcount==1){
						trigger.player.removeSkill('zhoufu2');
						delete trigger.player.storage.zhoufu2;
						delete trigger.player.storage.zhoufu2_markcount;
						delete trigger.player.storage.zhoufu3;
					}
					else{
						trigger.player.storage.zhoufu2_markcount=1;
						trigger.player.updateMarks();
					}
				}
			},
			kuiwei:{
				audio:2,
				trigger:{player:'phaseEnd'},
				check:function(event,player){
					if(player.isTurnedOver()) return true;
					var num=game.countPlayer(function(current){
						return current.getEquip(1);
					});
					return num>1;
				},
				content:function(){
					"step 0"
					player.turnOver();
					"step 1"
					var num=game.countPlayer(function(current){
						return current.getEquip(1);
					});
					player.draw(2+num);
					player.addSkill('kuiwei2');
				},
				ai:{
					effect:{
						target:function(card){
							if(card.name=='guiyoujie') return [0,2];
						}
					}
				}
			},
			kuiwei2:{
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				audio:false,
				content:function(){
					var num=game.countPlayer(function(current){
						return current.getEquip(1);
					});
					if(num>=player.countCards('he')){
						player.discard(player.getCards('he'));
					}
					else if(num){
						player.chooseToDiscard('he',num,true);
					}
					player.removeSkill('kuiwei2');
				}
			},
			yanzheng:{
				enable:'chooseToUse',
				audio:2,
				filter:function(event,player){
					return player.hp<player.countCards('h')&&player.countCards('e')>0;
				},
				viewAsFilter:function(player){
					return player.hp<player.countCards('h')&&player.countCards('e')>0;
				},
				filterCard:true,
				position:'e',
				viewAs:{name:'wuxie'},
				prompt:'将一张装备区内的牌当无懈可击使用',
				check:function(card){return 8-get.equipValue(card)},
				threaten:1.2
			},
			tongji:{
				global:'tongji_disable',
				audio:2,
				trigger:{global:"useCard"},
				forced:true,
				filter:function (event,player){
					return get.distance(event.player,player,'attack')<=1&&player!=event.player&&event.card.name=='sha'&&player.hp<player.countCards('h');
				},
				content:function(){},
				unique:true,
				gainable:true,
				subSkill:{
					disable:{
						mod:{
							targetEnabled:function(card,player,target){
								if(player.hasSkill('tongji')) return;
								if(card.name=='sha'){
									if(target.hasSkill('tongji')) return;
									if(game.hasPlayer(function(current){
										return current.hasSkill('tongji')&&current.hp<current.countCards('h')&&
											get.distance(player,current,'attack')<=1;
									})){
										return false;
									}
								}
							}
						}
					}
				}
			},
			wangzun:{
				audio:2,
				trigger:{global:'phaseBegin'},
				check:function(event,player){
					var att=get.attitude(player,event.player);
					return !game.hasPlayer(function(current){
						return get.attitude(player,current)<att;
					});
				},
				filter:function(event,player){
					return event.player!=player&&!player.storage.wangzun;
				},
				logTarget:'player',
				content:function(){
					player.draw();
					player.markSkill('wangzun');
					player.storage.wangzun=trigger.player;
					trigger.player.addTempSkill('wangzun3');
				},
				ai:{
					expose:0.2
				},
				intro:{
					content:'player'
				},
				group:'wangzun2'
			},
			wangzun2:{
				trigger:{player:'phaseBegin'},
				silent:true,
				content:function(){
					player.unmarkSkill('wangzun');
					player.storage.wangzun=null;
				}
			},
			wangzun3:{
				mod:{
					maxHandcard:function(player,num){
						return num-1;
					}
				}
			},
			kaikang:{
				audio:2,
				trigger:{global:'useCardToTargeted'},
				filter:function(event,player){
					return event.card.name=='sha'&&get.distance(player,event.target)<=1;
				},
				check:function(event,player){
					return get.attitude(player,event.target)>=0;
				},
				content:function(){
					"step 0"
					player.draw();
					if(trigger.target!=player){
						player.chooseCard(true,'he','交给'+get.translation(trigger.target)+'一张牌').set('ai',function(card){
							if(get.position(card)=='e') return -1;
							if(card.name=='shan') return 1;
							if(get.type(card)=='equip') return 0.5;
							return 0;
						});
					}
					else{
						event.finish();
					}
					"step 1"
					trigger.target.gain(result.cards,player,'give');
					game.delay();
					event.card=result.cards[0];
					"step 2"
					if(trigger.target.getCards('h').contains(card)&&get.type(card)=='equip'){
						trigger.target.chooseUseTarget(card);
					}
				},
				ai:{
					threaten:1.1
				}
			},
			liangzhu:{
				audio:2,
				trigger:{global:'recoverAfter'},
				direct:true,
				filter:function(event,player){
					return _status.currentPhase==event.player;
				},
				content:function(){
					'step 0'
					if(player==trigger.player){
						player.chooseControl('摸一张','摸两张','cancel2',function(){
							return '摸两张';
						}).set('prompt',get.prompt2('liangzhu'));
						event.single=true;
					}
					else{
						player.chooseTarget(get.prompt2('liangzhu'),function(card,player,target){
							return target==_status.event.player||target==_status.event.target;
						}).set('target',trigger.player).set('ai',function(target){
							var player=_status.event.player;
							if(player==target) return 1;
							return get.attitude(player,target)-1.5;
						});
					}
					'step 1'
					if(event.single){
						if(result.control!='cancel2'){
							player.logSkill('liangzhu',player);
							if(result.control=='摸一张'){
								player.draw();
							}
							else{
								player.draw(2);
								player.storage.liangzhu=player;
							}
						}
					}
					else if(result.bool){
						var target=result.targets[0];
						player.logSkill('liangzhu',target);
						if(target==player){
							target.draw();
						}
						else{
							target.draw(2);
							if(target.storage.liangzhu){
								target.storage.liangzhu.add(player);
							}
							else{
								target.storage.liangzhu=[player];
							}
						}
					}
				},
				ai:{
					expose:0.1
				}
			},
			fanxiang:{
				skillAnimation:true,
				animationColor:'fire',
				audio:2,
				unique:true,
				juexingji:true,
				forceunique:true,
				derivation:'xiaoji',
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					if(player.storage.fanxiang) return false;
					return game.hasPlayer(function(current){
						return current.storage.liangzhu&&current.storage.liangzhu.contains(player)&&current.isDamaged();
					});
				},
				forced:true,
				content:function(){
					player.storage.fanxiang=true;
					player.gainMaxHp();
					player.recover();
					player.removeSkill('liangzhu');
					player.addSkill('xiaoji');
					player.awakenSkill('fanxiang');
				},
			},
			mingshi:{
				audio:2,
				trigger:{player:'damageBegin3'},
				direct:true,
				filter:function(event,player){
					return event.source&&event.source.hp>player.hp;
				},
				content:function(){
					"step 0"
					var next=player.chooseToDiscard(get.prompt2('mingshi'),{color:'black'});
					next.set('ai',function(card){
						return 9-get.value(card);
					});
					next.set('logSkill','mingshi');
					"step 1"
					if(result.bool){
						trigger.num--;
					}
				},
				ai:{
					threaten:0.8
				}
			},
			lirang:{
				audio:2,
				trigger:{player:'discardAfter'},
				filter:function(event,player){
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'){
							return true;
						}
					}
					return false;
				},
				direct:true,
				popup:false,
				content:function(){
					"step 0"
					if(trigger.delay==false) game.delay();
					event.cards=[];
					for(var i=0;i<trigger.cards.length;i++){
						if(get.position(trigger.cards[i])=='d'){
							event.cards.push(trigger.cards[i]);
							//ui.special.appendChild(trigger.cards[i]);
						}
					}
					"step 1"
					if(event.cards.length){
						var goon=false;
						for(var i=0;i<event.cards.length;i++){
							if(event.cards[i].name=='du'){
								goon=true;break;
							}
						}
						if(!goon){
							goon=game.hasPlayer(function(current){
								return player!=current&&get.attitude(player,current)>1;
							});
						}
						player.chooseCardButton(get.prompt('lirang'),event.cards,[1,event.cards.length]).set('ai',function(button){
							if(!_status.event.goon||ui.selected.buttons.length) return 0;
							if(button.link.name=='du') return 2;
							return 1;
						}).set('goon',goon);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						event.togive=result.links.slice(0);
						player.chooseTarget('将'+get.translation(result.links)+'交给一名角色',true,function(card,player,target){
							return target!=player;
						}).set('ai',function(target){
							var att=get.attitude(_status.event.player,target);
							if(_status.event.enemy){
								return -att;
							}
							else{
								if(att>2) return att/Math.sqrt(1+target.countCards('h'));
								return att/Math.sqrt(1+target.countCards('h'))/5;
							}
						}).set('enemy',get.value(event.togive[0])<0);
					}
					else{
						//game.cardsDiscard(event.cards);
						event.finish();
					}
					"step 3"
					if(result.bool){
						if(!event.logged){
							player.logSkill('lirang',result.targets);
							event.logged=true;
						}
						else player.line(result.targets,'green');
						for(var i=0;i<event.togive.length;i++){
							event.cards.remove(event.togive[i]);
						}
						result.targets[0].gain(event.togive);
						result.targets[0].$gain2(event.togive);
						event.goto(1);
					}
					else{
						//game.cardsDiscard(event.cards);
						event.finish();
					}
				},
				ai:{
					expose:0.1,
					effect:{
						target:function(card,player,target,current){
							if(target.hasFriend()&&get.tag(card,'discard')){
								if(current<0) return 0;
								return [1,1];
							}
						}
					}
				}
			},
			moukui:{
				trigger:{player:'useCardToPlayered'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha';
				},
				audio:2,
				content:function(){
					"step 0"
					var controls=['draw_card'];
					if(trigger.target.countCards('he')){
						controls.push('discard_card');
					}
					controls.push('cancel');
					player.chooseControl(controls).set('ai',function(){
						var trigger=_status.event.getTrigger();
						if(trigger.target.countCards('he')&&get.attitude(_status.event.player,trigger.target)<0){
							return 'discard_card';
						}
						else{
							return 'draw_card';
						}
					}).set('prompt',get.prompt2('moukui'));
					"step 1"
					if(result.control=='draw_card'){
						player.draw();
						player.logSkill('moukui');
					}
					else if(result.control=='discard_card'&&trigger.target.countCards('he')){
						player.discardPlayerCard(trigger.target,'he',true).logSkill=['moukui',trigger.target];
					}
					else event.finish();
					"step 2"
					player.addTempSkill('moukui2','shaEnd');
				},
				ai:{
					expose:0.1
				}
			},
			moukui2:{
				audio:false,
				trigger:{player:'shaMiss'},
				forced:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					trigger.target.discardPlayerCard(player,true);
				}
			},
			shenxian:{
				audio:2,
				trigger:{global:'discardAfter'},
				filter:function(event,player){
					if(event.player==player||_status.currentPhase==player) return false;
					if(player.hasSkill('shenxian2')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(get.type(event.cards[i])=='basic'){
							return true;
						}
					}
					return false;
				},
				frequent:true,
				content:function(){
					"step 0"
					if(trigger.delay==false) game.delay();
					"step 1"
					player.draw();
					player.addTempSkill('shenxian2');
				},
				ai:{
					threaten:1.5
				}
			},
			shenxian2:{},
			qiangwu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					"step 0"
					player.judge();
					"step 1"
					player.storage.qiangwu=result.number;
				},
				ai:{
					result:{
						player:1
					},
					order:11
				},
				mod:{
					targetInRange:function(card,player){
						if(_status.currentPhase==player&&card.name=='sha'&&card.number<player.storage.qiangwu) return true;
					},
					cardUsable:function(card,player){
						if(_status.currentPhase==player&&card.name=='sha'&&card.number>player.storage.qiangwu) return Infinity;
					}
				},
				group:['qiangwu2','qiangwu3']
			},
			qiangwu2:{
				trigger:{player:'phaseUseBegin'},
				silent:true,
				content:function(){
					delete player.storage.qiangwu;
				}
			},
			qiangwu3:{
				trigger:{player:'useCard'},
				filter:function(event,player){
					if(_status.currentPhase==player&&event.card.name=='sha'&&
					event.card.number>player.storage.qiangwu) return true;
					return false;
				},
				forced:true,
				popup:false,
				content:function(){
					if(player.stat[player.stat.length-1].card.sha>0){
						player.stat[player.stat.length-1].card.sha--;
					}
				},
			},
			zhendu:{
				audio:2,
				trigger:{global:'phaseUseBegin'},
				filter:function(event,player){
					return event.player!=player&&player.countCards('h')>0;
				},
				direct:true,
				content:function(){
					"step 0"
					var nono=(Math.abs(get.attitude(player,trigger.player))<3);
					if(get.damageEffect(trigger.player,player,player)<=0){
						nono=true
					}
					else if(trigger.player.hp>2){
						nono=true;
					}
					else if(trigger.player.hp>1&&player.countCards('h')<3){
						nono=true;
					}
					else if(trigger.player.canUse('sha',player)&&!player.countCards('h','shan')&&trigger.player.countCards('h')>=3){
						nono=true;
					}
					var next=player.chooseToDiscard(get.prompt2('zhendu',trigger.player));
					next.set('ai',function(card){
						if(_status.event.nono) return -1;
						return 7-get.useful(card);
					});
					next.set('logSkill',['zhendu',trigger.player]);
					next.set('nono',nono);
					"step 1"
					if(result.bool){
						trigger.player.damage();
					}
					else{
						event.finish();
					}
					"step 2"
					trigger.player.useCard({name:'jiu'},trigger.player);
				},
				ai:{
					threaten:2,
					expose:0.3
				}
			},
			qiluan:{
				audio:'qiluan2',
				trigger:{source:'dieAfter'},
				priority:-10,
				silent:true,
				locked:false,
				onremove:function(player){
					delete player.storage.qiluan;
				},
				filter:function(event){
					return _status.currentPhase!=event.player;
				},
				content:function(){
					if(!player.storage.qiluan){
						player.storage.qiluan=1;
					}
					else{
						player.storage.qiluan++;
					}
				},
				group:['qiluan2','qiluan3','qiluan4']
			},
			qiluan2:{
				audio:2,
				trigger:{global:'phaseAfter'},
				frequent:true,
				filter:function(event,player){
					return player.storage.qiluan?true:false;
				},
				content:function(){
					if(get.mode()=='guozhan'){
						player.draw(3);
					}
					else{
						player.draw(3*player.storage.qiluan);
					}
					player.storage.qiluan=0;
				}
			},
			qiluan3:{
				audio:'qiluan2',
				trigger:{source:'dieAfter'},
				frequent:true,
				priority:-10,
				filter:function(event){
					return _status.currentPhase==event.player;
				},
				content:function(){
					var num=3;
					if(player.storage.qiluan){
						if(get.mode()!='guozhan'){
							num+=3*player.storage.qiluan;
						}
						player.storage.qiluan=0;
					}
					player.draw(num);
				},
			},
			qiluan4:{
				trigger:{global:'phaseBegin'},
				silent:true,
				content:function(){
					player.storage.qiluan=0;
				}
			},
			shangyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.countCards('h');
				},
				content:function(){
					"step 0"
					player.chooseCardButton(target,target.getCards('h')).set('filterButton',function(button){
						return get.color(button.link)=='black';
					});
					"step 1"
					if(result.bool){
						target.discard(result.links[0]);
					}
				},
				ai:{
					order:11,
					result:{
						target:function(player,target){
							return -target.countCards('h');
						}
					},
					threaten:1.1
				},
			},
			shengxi:{
				trigger:{player:'phaseDiscardBegin'},
				frequent:true,
				filter:function(event,player){
					return !player.getStat('damage');
				},
				content:function(){
					player.draw(2);
				},
				audio:2,
				audioname:['liushan']
			},
			shoucheng:{
				trigger:{global:'loseEnd'},
				audio:2,
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				filter:function(event,player){
					if(event.player.countCards('h')) return false;
					if(_status.currentPhase==event.player) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				logTarget:'player',
				content:function(){
					trigger.player.draw();
				},
				ai:{
					threaten:1.3,
					expose:0.2,
					noh:true,
				}
			},
			hengzheng:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				filter:function(event,player){
					return player.hp==1||player.countCards('h')==0;
				},
				check:function(event,player){
					var num=game.countPlayer(function(current){
						if(current.countCards('he')&&current!=player&&get.attitude(player,current)<=0){
							return true;
						}
						if(current.countCards('j')&&current!=player&&get.attitude(player,current)>0){
							return true;
						}
					});
					return num>=2;
				},
				content:function(){
					"step 0"
					var targets=game.filterPlayer();
					targets.remove(player);
					targets.sort(lib.sort.seat);
					event.targets=targets;
					event.num=0;
					trigger.cancel();
					player.line(targets,'green');
					"step 1"
					if(num<event.targets.length){
						if(event.targets[num].countCards('hej')){
							player.gainPlayerCard(event.targets[num],'hej',true);
						}
						event.num++;
						event.redo();
					}
				},
				ai:{
					noh:true,
					skillTagFilter:function(player,tag){
						if(tag=='noh'){
							if(player.countCards('h')!=1) return false;
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 2.5;
						return 1;
					},
				}
			},
			yongjue:{
				audio:2,
				trigger:{global:'useCardEnd'},
				usable:1,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(event.player==player) return false;
					if(event.targets.contains(player)) return false;
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(get.position(event.cards[i])=='d') return true;
						}
					}
					return false;
				},
				frequent:true,
				content:function(){
					var cards=trigger.cards.slice(0);
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])!='d'){
							cards.splice(i--,1);
						}
					}
					player.gain(cards,'gain2');
				},
			},
			guixiu:{
				audio:2,
				trigger:{target:'shaBegin'},
				frequent:true,
				filter:function(event,player){
					return player.countCards('h')<player.hp;
				},
				content:function(){
					player.draw();
				}
			},
			cunsi:{
				skillAnimation:true,
				animationColor:'orange',
				audio:2,
				unique:true,
				enable:'phaseUse',
				mark:true,
				limited:true,
				derivation:'yongjue',
				filter:function(event,player){
					return !player.storage.cunsi&&player.countCards('h')&&!player.isTurnedOver();
				},
				init:function(player){
					player.storage.cunsi=false;
				},
				filterTarget:function(card,player,target){
					return player!=target&&target.sex=='male';
				},
				content:function(){
					"step 0"
					player.awakenSkill('cunsi');
					var cards=player.getCards('h');
					target.gain(cards,player,'giveAuto');
					player.storage.cunsi=true;
					game.delay();
					target.addSkill('yongjue');
					target.markSkillCharacter('yongjue',player,'存嗣','<div class="skill">【勇决】</div><div>每当其他角色于回合内使用一张杀，若目标不是你，你可以获得之，每回合限一次</div>');
					"step 1"
					player.turnOver();
				},
				intro:{
					content:'limited'
				},
				ai:{
					order:4,
					result:{
						target:function(player,target){
							if(target.isMin()) return 0;
							if(player.hp>1){
								if(game.phaseNumber<game.players.length) return 0;
								if(target.hp==1&&target.maxHp>2) return 0;
								if(get.attitude(player,target)<5) return 0;
							}
							if(get.attitude(player,target)<5) return 0;
							if(target.hp==1&&target.maxHp>2) return 0.2;
							if(target==game.me) return 1.2;
							return 1;
						}
					},
					expose:0.5,
					threaten:1.5
				}
			},
			fenming:{
				audio:2,
				trigger:{player:'phaseEnd'},
				check:function(event,player){
					var num=game.countPlayer(function(current){
						if(current.isLinked()&&current.countCards('he')){
							return get.attitude(player,current);
						}
					});
					return num<0;
				},
				filter:function(event,player){
					return player.isLinked();
				},
				content:function(){
					"step 0"
					event.targets=game.filterPlayer(function(current){
						if(current.isLinked()&&current.countCards('he')){
							return true;
						}
					});
					event.num=0;
					event.targets.sort(lib.sort.seat);
					"step 1"
					if(event.num<event.targets.length){
						var target=event.targets[event.num];
						if(player==target){
							player.chooseToDiscard(true,'he');
						}
						else{
							player.discardPlayerCard(true,'he',target);
						}
						event.num++;
						event.redo();
					}
				}
			},
			duanxie:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				filterTarget:function(card,player,target){
					return player!=target&&!target.isLinked();
				},
				content:function(){
					"step 0"
					if(!target.isLinked()) target.link();
					"step 1"
					if(!player.isLinked()) player.link();
				},
				ai:{
					result:{
						target:-1,
						player:function(player){
							return player.isLinked()?0:-0.8;
						}
					},
					order:2,
					expose:0.3,
					effect:{
						target:function(card){
							if(card.name=='tiesuo'){
								return 0.5;
							}
						}
					}
				}
			},
			xiaoguo:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					return event.player.isAlive()&&event.player!=player&&player.countCards('h',{type:'basic'});
				},
				direct:true,
				content:function(){
					"step 0"
					var nono=(Math.abs(get.attitude(player,trigger.player))<3);
					if(get.damageEffect(trigger.player,player,player)<=0){
						nono=true;
					}
					var next=player.chooseToDiscard(get.prompt('xiaoguo',trigger.player),{type:'basic'});
					next.set('ai',function(card){
						if(_status.event.nono) return 0;
						return 8-get.useful(card);
					});
					next.set('logSkill',['xiaoguo',trigger.player]);
					next.set('nono',nono);
					"step 1"
					if(result.bool){
						var nono=(get.damageEffect(trigger.player,player,trigger.player)>=0);
						trigger.player.chooseToDiscard('he','弃置一张装备牌并令'+get.translation(player)+'摸一张牌，或受到一点伤害',{type:'equip'}).set('ai',function(card){
							if(_status.event.nono){
								return 0;
							}
							if(_status.event.player.hp==1) return 10-get.value(card);
							return 9-get.value(card);
						}).set('nono',nono);
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.draw();
					}
					else{
						trigger.player.damage();
					}
				},
				ai:{
					expose:0.3,
					threaten:1.3
				}
			},
			suishi:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				popup:false,
				priority:12,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.player!=player&&event.parent.name=='damage'&&event.parent.source&&event.parent.source!=event.player;
				},
				content:function(){
					'step 0'
					var str;
					if(trigger.parent.source==player){
						str='随势：是否摸一张牌？';
					}
					else{
						str='随势：是否令'+get.translation(player)+'摸一张牌？'
					}
					trigger.parent.source.chooseBool(str).set('ai',function(){
						return get.attitude(_status.event.player,_status.event.target)>0;
					}).set('target',player);
					'step 1'
					if(result.bool){
						player.logSkill('suishi');
						trigger.parent.source.line(player,'green');
						player.draw();
					}
				},
				group:'suishi2'
			},
			suishi2:{
				trigger:{global:'dieAfter'},
				forced:true,
				popup:false,
				check:function(){
					return false;
				},
				filter:function(event,player){
					return event.player!=player&&event.source&&event.source!=player&&event.source!=event.player;
				},
				content:function(){
					'step 0'
					var str;
					if(trigger.source==player){
						str='随势：是否流失一点体力？';
					}
					else{
						str='随势：是否令'+get.translation(player)+'流失一点体力？'
					}
					trigger.source.chooseBool(str).set('ai',function(){
						return get.attitude(_status.event.player,_status.event.target)<0;
					}).set('target',player);
					'step 1'
					if(result.bool){
						player.logSkill('suishi');
						trigger.source.line(player,'green');
						player.loseHp();
					}
				},
			},
			sijian:{
				trigger:{player:'loseEnd'},
				direct:true,
				audio:2,
				filter:function(event,player){
					if(player.countCards('h')) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('sijian'),'弃置一名其他角色的一张牌',function(card,player,target){
						return player!=target&&target.countCards('he')>0;
					}).set('ai',function(target){
						return -get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.bool){
						player.logSkill('sijian',result.targets);
						event.target=result.targets[0];
						player.discardPlayerCard(event.target,true);
					}
					else{
						event.finish();
					}
				},
				ai:{
					expose:0.2,
				}
			},
			quji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				position:'he',
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return player.getDamagedHp();
				},
				filterTarget:function(card,player,target){
					return target.hp<target.maxHp;
				},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				selectTarget:function(){
					return [1,ui.selected.cards.length];
				},
				check:function(card){
					if(get.color(card)=='black') return -1;
					return 9-get.value(card);
				},
				content:function(){
					"step 0"
					target.recover();
					"step 1"
					if(target==player){
						for(var i=0;i<cards.length;i++){
							if(get.color(cards[i])=='black'){
								player.loseHp();
								break;
							}
						}
					}
				},
				ai:{
					result:{
						target:1
					},
					order:6
				}
			},
			junbing2:{
				audio:'junbing',
				trigger:{player:'phaseEnd'},
				filter:function(event,player){
					if(player.countCards('h')>1) return false;
					return game.hasPlayer(function(current){
						return current.hasSkill('junbing');
					});
				},
				check:function(event,player){
					var target=game.findPlayer(function(current){
						return current.hasSkill('junbing');
					});
					if(target){
						var num=target.countCards('h');
						var att=get.attitude(player,target);
						if(num==0) return true;
						if(num==1) return att>-1;
						if(num==2) return att>0;
						return att>1;
					}
					return false;
				},
				content:function(){
					"step 0"
					player.draw();
					if(player.hasSkill('junbing')){
						event.finish();
					}
					else{
						event.target=game.findPlayer(function(current){
							return current.hasSkill('junbing');
						});
					}
					"step 1"
					var cards=player.getCards('h');
					target.gain(cards,player,'giveAuto');
					event.num=cards.length;
					game.delay();
					"step 2"
					target.chooseCard('选择还给'+get.translation(player)+'的牌',true,event.num);
					game.delay(0.2);
					"step 3"
					player.gain(result.cards,target,'giveAuto');
					game.delay();
				}
			},
			junbing:{
				audio:2,
				global:'junbing2',
				unique:true,
				forceunique:true
			},
			xiongyi:{
				skillAnimation:true,
				animationColor:'gray',
				unique:true,
				enable:'phaseUse',
				audio:2,
				limited:true,
				filterTarget:function(card,player,target){
					if(get.mode()=='guozhan'){
						if(player==target) return true;
						if(player.identity=='ye') return false;
						if(player.identity=='unknown'){
							if(_status.yeidentity.contains(player._group)){
								return false;
							}
							else if(get.zhu(player)||get.population(player._group)+1<=get.population()/2){
								return player._group==target.identity;
							}
							else{
								return false;
							}
						}
						return player.identity==target.identity;
					}
					else{
						return true;
					}
				},
				multitarget:true,
				multiline:true,
				selectTarget:function(){
					if(get.mode()=='guozhan') return -1;
					return [1,3];
				},
				content:function(){
					"step 0"
					player.awakenSkill('xiongyi');
					game.asyncDraw(targets,3);
					"step 1"
					if(player.isDamaged()){
						if(get.mode()=='guozhan'){
							if(player.isMinor(true)){
								player.recover();
							}
						}
						else if(targets.length<=2){
							player.recover();
						}
					}
				},
				ai:{
					order:1,
					result:{
						target:function(player){
							var num=player.countCards('h');
							if(player.hp==1) return 1;
							if(player.hp==2&&num<=2) return 1;
							if(player.hp==3&&num<=1) return 1;
							if(game.phaseNumber<game.players.length*2) return 0;
							if(player.hasUnknown()) return 0;
							return 1;
						},
					}
				}
			},
			gzshushen:{
				audio:'shushen',
				trigger:{player:'recoverAfter'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return player!=current&&player.sameIdentityAs(current);
					});
				},
				content:function(){
					'step 0'
					event.num=trigger.num||1;
					"step 1"
					player.chooseTarget(get.prompt2('gzshushen'),function(card,player,target){
						return target!=player&&player.sameIdentityAs(target);
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					"step 2"
					if(result.bool){
						player.logSkill('gzshushen',result.targets);
						result.targets[0].draw();
						if(event.num>1){
							event.num--;
							event.goto(1);
						}
					}
				},
				ai:{
					threaten:0.8,
					expose:0.1
				}
			},
			shushen:{
				audio:2,
				trigger:{player:'recoverAfter'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('shushen'),'令一名其他角色选择摸两张牌或回复1点体力',function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					"step 1"
					if(result.bool){
						player.logSkill('shushen',result.targets);
						result.targets[0].chooseDrawRecover(2,true);
					}
				},
				ai:{
					threaten:0.8,
					expose:0.1
				}
			},
			shenzhi:{
				audio:2,
				trigger:{player:'phaseBegin'},
				check:function(event,player){
					if(player.hp>2) return false;
					var cards=player.getCards('h');
					if(cards.length<player.hp) return false;
					if(cards.length>3) return false;
					for(var i=0;i<cards.length;i++){
						if(get.value(cards[i])>7||get.tag(cards[i],'recover')>=1) return false;
					}
					return true;
				},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					var cards=player.getCards('h');
					event.bool=cards.length>=player.hp;
					player.discard(cards);
					"step 1"
					if(event.bool){
						player.recover();
					}
				}
			},
			wuji:{
				skillAnimation:true,
				animationColor:'orange',
				audio:2,
				trigger:{player:'phaseEnd'},
				forced:true,
				unique:true,
				juexingji:true,
				filter:function(event,player){
					return player.getStat('damage')>=3&&!player.storage.wuji;
				},
				content:function(){
					"step 0"
					player.removeSkill('huxiao');
					player.gainMaxHp();
					"step 1"
					player.recover();
					player.awakenSkill('wuji');
					player.storage.wuji=true;

					var card=get.cardPile('qinglong','field');
					if(card){
						player.gain(card,'gain2','log');
					}
				}
			},
			xueji_old:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.hp<player.maxHp&&player.countCards('he',{color:'red'})>0;
				},
				filterTarget:function(card,player,target){
					return player!=target&&get.distance(player,target,'attack')<=1;
				},
				selectTarget:function(){
					return [1,_status.event.player.maxHp-_status.event.player.hp];
				},
				position:'he',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				check:function(card){
					return 8-get.useful(card);
				},
				content:function(){
					"step 0"
					target.damage();
					"step 1"
					target.draw();
				},
				ai:{
					order:7,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player);
						}
					},
					threaten:function(player,target){
						if(target.hp==1) return 2;
						if(target.hp==2) return 1.5;
						return 0.5;
					},
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(target.hp==target.maxHp&&target.hasFriend()) return [0,1];
							}
							if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
						}
					}
				}
			},
			xueji:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he',{color:'red'})>0;
				},
				filterTarget:true,
				selectTarget:function(){
					var player=_status.event.player
					return [1,Math.max(1,player.getDamagedHp())];
				},
				position:'he',
				filterCard:{color:'red'},
				check:function(card){
					return 8-get.value(card);
				},
				multitarget:true,
				multiline:true,
				line:'fire',
				content:function(){
					'step 0'
					event.delay=false;
					for(var i=0;i<targets.length;i++){
						if(!targets[i].isLinked()){
							targets[i].link(true);
							event.delay=true;
						}
					}
					'step 1'
					if(event.delay){
						game.delay();
					}
					'step 2'
					targets[0].damage('fire','nocard');
				},
				ai:{
					damage:true,
					threaten:1.5,
					order:7,
					result:{
						target:function(player,target){
							var eff=get.damageEffect(target,player,target,'fire');
							if(target.isLinked()){
								return eff/10;
							}
							else{
								return eff;
							}
						}
					},
				}
			},
			huxiao:{
				trigger:{source:'damageSource'},
				silent:true,
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return event.nature=='fire';
				},
				content:function(){
					if(!player.storage.huxiao){
						player.storage.huxiao=[];
					}
					player.storage.huxiao.add(trigger.player);
				},
				group:['huxiao_draw','huxiao_clear'],
				subSkill:{
					draw:{
						trigger:{source:'damageSource'},
						priority:-6,
						filter:function(event,player){
							if(!player.storage.huxiao||!player.storage.huxiao.length) return false;
							for(var i=0;i<player.storage.huxiao.length;i++){
								if(player.storage.huxiao[i].isIn()) return true;
							}
							return false;
						},
						check:function(){
							return false;
						},
						forced:true,
						content:function(){
							for(var i=0;i<player.storage.huxiao.length;i++){
								if(!player.storage.huxiao[i].isIn()){
									player.storage.huxiao.splice(i--,1);
								}
							}
							game.asyncDraw(player.storage.huxiao);
							if(!player.storage.huxiao3){
								player.storage.huxiao3=[];
							}
							player.storage.huxiao3.addArray(player.storage.huxiao);
							player.addTempSkill('huxiao3');
						}
					},
					clear:{
						trigger:{source:'damageSource'},
						priority:-7,
						silent:true,
						content:function(){
							delete player.storage.huxiao;
						}
					}
				}
			},
			huxiao3:{
				onremove:true,
				mark:true,
				intro:{
					content:'players'
				},
				mod:{
					cardUsable:function(card,player,num){
						if(typeof num=='number') return num+100;
					},
					playerEnabled:function(card,player,target){
						if(!player.storage.huxiao3||!player.storage.huxiao3.contains(target)){
							var num=player.getCardUsable(card)-100;
							if(num<=0) return false;
						}
					}
				}
			},
			aocai:{
				audio:2,
				trigger:{player:'chooseToRespondBegin'},
				frequent:true,
				filter:function(event,player){
					if(event.responded) return false;
					return _status.currentPhase!==player;
				},
				content:function(){
					"step 0"
					var cards=[];
					if(ui.cardPile.childNodes.length<2){
						var discardcards=get.cards(2);
						game.cardsDiscard(discardcards);
					}
					for(var i=0;i<2;i++){
						cards.push(ui.cardPile.childNodes[i]);
					}
					player.chooseCardButton('傲才：选择一张卡牌打出',cards).set('filterButton',function(button){
						return get.type(button.link)=='basic'&&_status.event.getTrigger().filterCard(button.link);
					});
					"step 1"
					if(result.bool){
						game.log(player,'傲才发动成功');
						trigger.untrigger();
						trigger.responded=true;
						result.links[0].remove();
						trigger.result={bool:true,card:result.links[0]}
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,effect){
							if(get.tag(card,'respondShan')) return 0.7;
							if(get.tag(card,'respondSha')) return 0.7;
						}
					}
				},
				group:'aocai2',
			},
			aocai2:{
				enable:'chooseToUse',
				filter:function(event,player){
					return _status.currentPhase!==player&&event.type!='wuxie'&&event.type!='trickuse';
				},
				onChooseToUse:function(event){
					if(!game.online){
						var cards=[];
						if(ui.cardPile.childNodes.length<2){
							var discardcards=get.cards(2);
							game.cardsDiscard(discardcards);
						}
						for(var i=0;i<2;i++){
							cards.push(ui.cardPile.childNodes[i]);
						}
						event.set('aocaicards',cards);
					}
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('傲才：选择一张卡牌使用',event.aocaicards);
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						if(evt&&evt.filterCard){
							return get.type(button.link)=='basic'&&evt.filterCard(button.link,player,evt);
						}
						return false;
					},
					check:function(button){
						return 1;
					},
					backup:function(links,player){
						return {
							filterCard:function(){return false},
							selectCard:-1,
							viewAs:links[0],
						}
					},
					prompt:function(links,player){
						return '选择'+get.translation(links)+'的目标';
					}
				},
				ai:{
					order:11,
					save:true,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						}
					}
				}
			},
			hongyuan:{
				trigger:{player:'phaseDrawBegin'},
				direct:true,
				audio:2,
				content:function(){
					"step 0"
					var check;
					if(player.countCards('h')==0){
						check=false;
					}
					else{
						check=(game.countPlayer(function(current){
							return player!=current&&get.attitude(player,current)>1;
						})>=2);
					}
					if(get.is.versus()){
						event.versus=true;
						player.chooseBool(get.prompt2('hongyuan')).ai=function(){
							return game.countPlayer(function(current){
								return player.side==current.side;
							})>2;
						};
					}
					else{
						player.chooseTarget(get.prompt2('hongyuan'),[1,2],function(card,player,target){
							return player!=target;
						},function(target){
							if(!_status.event.check) return 0;
							return get.attitude(_status.event.player,target);
						}).set('check',check);
					}
					"step 1"
					if(result.bool){
						var targets;
						if(event.versus){
							targets=game.filterPlayer(function(current){
								return current!=player&&current.side==player.side;
							});
						}
						else{
							targets=result.targets;
						}
						player.logSkill('hongyuan',targets);
						game.asyncDraw(targets);
						trigger.num--;
					}
				},
			},
			huanshi:{
				audio:2,
				trigger:{global:'judge'},
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				logTarget:'player',
				check:function(event,player){
					if(get.attitude(player,event.player)<=0) return false;
					var cards=player.getCards('he');
					var judge=event.judge(event.player.judging[0]);
					for(var i=0;i<cards.length;i++){
						var judge2=event.judge(cards[i]);
						if(_status.currentPhase!=player&&judge2==judge&&get.color(cards[i])=='red'&&get.useful(cards[i])<5) return true;
						if(judge2>judge) return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					var target=trigger.player;
					player.line(target,'green');
					var judge=trigger.judge(target.judging[0]);
					var attitude=get.attitude(target,player);
					target.choosePlayerCard('请选择代替判定的牌','he','visible',true,player).set('ai',function(button){
						var card=button.link;
						var judge=_status.event.judge;
						var attitude=_status.event.attitude;
						var result=trigger.judge(card)-judge;
						var player=_status.event.player;
						if(result>0){
							return 20+result;
						}
						if(result==0){
							if(_status.currentPhase==player) return 0;
							if(attitude>=0){
								return get.color(card)=='red'?7:0-get.value(card);
							}
							else{
								return get.color(card)=='black'?10:0+get.value(card);
							}
						}
						if(attitude>=0){
							return get.color(card)=='red'?0:-10+result;
						}
						else{
							return get.color(card)=='black'?0:-10+result;
						}
					}).set('judge',judge).set('attitude',attitude);
					"step 1"
					if(result.bool){
						event.card=result.links[0];
						player.respond(event.card,'highlight').nopopup=true;
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
						trigger.player.judging[0]=event.card;
						if(!get.owner(event.card,'judge')){
							trigger.position.appendChild(event.card);
						}
						game.log(trigger.player,'的判定牌改为',event.card);
						game.delay(2);
					}
				},
				ai:{
					tag:{
						rejudge:1,
					}
				}
			},
			mingzhe:{
				audio:2,
				trigger:{player:['useCardAfter','respondAfter','discardAfter']},
				frequent:true,
				filter:function(event,player){
					if(player==_status.currentPhase) return false;
					if(event.cards){
						for(var i=0;i<event.cards.length;i++){
							if(get.color(event.cards[i])=='red'&&
							event.cards[i].original!='j') return true;
						}
					}
					return false;
				},
				content:function(){
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
						player.logSkill('mingzhe');
						event.goto(1);
					}
				},
				ai:{
					threaten:0.7
				}
			},
			duwu:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.hasSkill('duwu2')==false;
				},
				filterCard:function(){
					if(ui.selected.targets.length) return false;
					return true;
				},
				position:'he',
				selectCard:[1,Infinity],
				complexSelect:true,
				complexCard:true,
				filterTarget:function(card,player,target){
					return target!=player&&get.distance(player,target,'attack')<=1&&ui.selected.cards.length==target.hp;
				},
				check:function(card){
					switch(ui.selected.cards.length){
						case 0:return 7-get.value(card);
						case 1:return 6-get.value(card);
						case 2:return 3-get.value(card);
						default:return 0;
					}
				},
				content:function(){
					"step 0"
					player.addSkill('duwu3');
					target.damage('nocard');
					"step 1"
					if(!player.hasSkill('duwu3')){
						player.addSkill('duwu2');
						player.loseHp();
					}
					else{
						player.removeSkill('duwu3');
					}
				},
				ai:{
					damage:true,
					order:2,
					result:{
						target:function(player,target){
							return get.damageEffect(target,player);
						}
					},
					threaten:1.5,
					expose:0.3
				}
			},
			duwu2:{
				trigger:{player:'phaseBegin'},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					player.removeSkill('duwu2');
				}
			},
			duwu3:{
				trigger:{global:'dying'},
				priority:15,
				silent:true,
				filter:function(event,player){
					return event.reason&&event.reason.getParent().name=='duwu';
				},
				content:function(){
					player.removeSkill('duwu3');
				}
			},
			yicong:{
				trigger:{
					player:["changeHp"],
				},
				audio:2,
				audioname:['re_gongsunzan'],
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
			yongsi:{
				group:['yongsi1','yongsi2'],
				ai:{
					threaten:2.2
				}
			},
			yongsi1:{
				audio:2,
				trigger:{player:'phaseDrawBegin'},
				forced:true,
				content:function(){
					trigger.num+=game.countGroup();
				}
			},
			yongsi2:{
				audio:2,
				trigger:{player:'phaseDiscardBegin'},
				forced:true,
				content:function(){
					player.chooseToDiscard(game.countGroup(),'he',true);
				}
			},
			bifa:{
				trigger:{player:'phaseEnd'},
				direct:true,
				audio:2,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				content:function(){
					"step 0"
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].storage.bifa){
							players[i].addSkill('bifa2');
						}
					}
					player.chooseCardTarget({
						filterCard:true,
						filterTarget:function(card,player,target){
							return player!=target&&!target.storage.bifa;
						},
						ai1:function(card){
							return 7-get.value(card);
						},
						ai2:function(target){
							var num=target.hasSkillTag('maixie')?2:0;
							return -get.attitude(_status.event.player,target)-num;
						},
						prompt:get.prompt2('bifa')
					});
					"step 1"
					if(result.bool){
						player.logSkill('bifa',result.targets[0]);
						result.targets[0].addSkill('bifa2');
						result.targets[0].storage.bifa=[result.cards[0],player];
						player.lose(result.cards[0],result.targets[0].node.special,'toStorage');
						player.$give(1,result.targets[0]);
					}
				},
				ai:{
					threaten:1.7,
					expose:0.3
				}
			},
			bifa2:{
				trigger:{player:'phaseBegin'},
				forced:true,
				mark:true,
				audio:false,
				content:function(){
					"step 0"
					if(player.storage.bifa[1].isAlive()&&player.countCards('h')){
						player.chooseCard(get.translation(player.storage.bifa[1])+
							'的笔伐牌为'+get.translation(player.storage.bifa[0]),function(card){
							return get.type(card,'trick')==_status.event.type;
						}).set('ai',function(card){
							return 8-get.value(card);
						}).set('type',get.type(player.storage.bifa[0],'trick'));
					}
					else{
						event.directfalse=true;
					}
					"step 1"
					if(result.bool&&!event.directfalse){
						player.storage.bifa[1].gain(result.cards,player);
						player.$give(result.cards,player.storage.bifa[1]);
						player.gain(player.storage.bifa[0],'draw2','log','fromStorage');
					}
					else{
						game.cardsDiscard(player.storage.bifa[0]);
						game.log(player.storage.bifa[0],'进入弃牌堆');
						player.$throw(player.storage.bifa[0],1000);
						player.loseHp();
					}
					player.removeSkill('bifa2');
					delete player.storage.bifa;
				},
				intro:{
					name:'笔伐',
					content:'已成为笔伐目标'
				}
			},
			songci:{
				audio:2,
				enable:'phaseUse',
				unique:true,
				filter:function(){
					return game.hasPlayer(function(current){
						return !current.storage.songci;
					});
				},
				init:function(player){
					player.storage.songci=false;
				},
				filterTarget:function(card,player,target){
					return (!target.storage.songci&&target.countCards('h')!=target.hp);
				},
				content:function(){
					if(target.countCards('h')>target.hp){
						target.chooseToDiscard(2,'he',true);
					}
					else{
						target.draw(2);
					}
					target.storage.songci=true;
					target.markSkill('songci');
				},
				intro:{
					content:'已发动'
				},
				ai:{
					order:7,
					threaten:1.5,
					expose:0.2,
					result:{
						target:function(player,target){
							if(target.countCards('h')<target.hp){
								if(target.countCards('h')<=2) return 1;
							}
							else if(target.countCards('h')>target.hp){
								if(target.countCards('h')<=3) return -1;
							}
						}
					}
				}
			},
			baobian:{
				audio:2,
				trigger:{player:['phaseBefore','changeHp']},
				forced:true,
				popup:false,
				unique:true,
				derivation:['tiaoxin','new_repaoxiao','xinshensu'],
				content:function(){
					player.removeAdditionalSkill('baobian');
					var list=[];
					if(player.hp<=3){
						if(trigger.num!=undefined&&trigger.num<0) player.logSkill('baobian');
						list.push('tiaoxin');
					}
					if(player.hp<=2){
						list.push('new_repaoxiao');
					}
					if(player.hp<=1){
						list.push('xinshensu');
					}
					if(list.length){
						player.addAdditionalSkill('baobian',list);
					}
				},
				ai:{
					maixie:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(!target.hasFriend()) return;
								if(target.hp>=4) return [0,1];
							}
							if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
						}
					}
				}
			},
			chongzhen:{
				group:['chongzhen1','chongzhen2'],
				ai:{
					combo:'longdan',
					mingzhi:false,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')||get.tag(card,'respondSha')){
								if(get.attitude(target,player)<=0){
									if(current>0) return;
									if(target.countCards('h')==0) return 1.6;
									if(target.countCards('h')==1) return 1.2;
									if(target.countCards('h')==2) return [0.8,0.2,0,-0.2];
									return [0.4,0.7,0,-0.7];
								}
							}
						},
					},
				}
			},
			chongzhen1:{
				audio:2,
				trigger:{player:'shaBefore'},
				filter:function(event,player){
					if(event.skill!='longdan_sha'&&event.skill!='fanghun_sha') return false;
					return event.target.countGainableCards(player,'h')>0;
				},
				logTarget:'target',
				prompt2:'每当你发动“龙胆”使用或打出一张手牌时，你可以立即获得对方的一张手牌。',
				content:function(){
					player.gainPlayerCard(trigger.target,'h',true);
				}
			},
			chongzhen2:{
				audio:2,
				trigger:{player:'respond'},
				filter:function(event,player){
					if(event.skill!='longdan_shan'&&event.skill!='longdan_sha'&&
					event.skill!='fanghun_shan'&&event.skill!='fanghun_sha') return false;
					return event.source&&event.source.countGainableCards(player,'h')>0;
				},
				logTarget:'source',
				prompt2:'每当你发动“龙胆”使用或打出一张手牌时，你可以立即获得对方的一张手牌。',
				content:function(){
					player.gainPlayerCard(trigger.source,'h',true);
				}
			},
			lihun:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return player!=target&&target.sex=='male';
				},
				filterCard:true,
				position:'he',
				content:function(){
					player.gain(target.getCards('h'),target,'giveAuto');
					player.turnOver();
					player.addSkill('lihun2');
					player.storage.lihun=target;
				},
				check:function(card){return 8-get.value(card)},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.classList.contains('turnedover')) return 10;
							return 0;
						},
						target:function(player,target){
							if(target.countCards('h')>target.hp) return target.hp-target.countCards('h');
							return 0;
						}
					},
					threaten:1.5,
					effect:{
						target:function(card){
							if(card.name=='guiyoujie') return [0,2];
						}
					}
				},
			},
			lihun2:{
				trigger:{player:'phaseUseEnd'},
				forced:true,
				popup:false,
				audio:false,
				content:function(){
					"step 0"
					player.removeSkill('lihun2');
					if(player.storage.lihun.classList.contains('dead')){
						event.finish();
					}
					else{
						player.chooseCard('he',true,player.storage.lihun.hp);
					}
					"step 1"
					player.storage.lihun.gain(result.cards,player);
					player.$give(result.cards.length,player.storage.lihun);
				}
			},
			yuanhu:{
				audio:3,
				trigger:{player:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				content:function(){
					"step 0"
					player.chooseCardTarget({
						filterCard:function(card){
							return get.type(card)=='equip';
						},
						position:'he',
						filterTarget:function(card,player,target){
							return target.isEmpty(get.subtype(card));
						},
						ai1:function(card){
							return 6-get.value(card);
						},
						ai2:function(target){
							return get.attitude(_status.event.player,target)-3;
						},
						prompt:get.prompt2('yuanhu')
					});
					"step 1"
					if(result.bool){
						player.logSkill('yuanhu',result.targets);
						var thisTarget=result.targets[0];
						var thisCard=result.cards[0];
						thisTarget.equip(thisCard);
						event.target=thisTarget;
						if(thisTarget!=player){
							player.$give(thisCard,thisTarget);
						}
						switch(get.subtype(thisCard)){
							case 'equip1':{
								if(!game.hasPlayer(function(current){
									return get.distance(thisTarget,current)<=1;
								})){
									event.finish();
									return;
								}
								game.delay();
								player.chooseTarget(true,function(card,player,target){
									return get.distance(_status.event.thisTarget,target)<=1&&target.countCards('hej');
								}).set('ai',function(target){
									var attitude=get.attitude(_status.event.player,target);
									if(attitude>0&&target.countCards('j')){
										return attitude*1.5;
									}
									return -attitude;
								}).set('thisTarget',thisTarget);
								return;
							}
							case 'equip2':{
								thisTarget.draw();event.finish();
								return;
							}
							default:{
								thisTarget.recover();
								event.finish();
								return;
							}
						}
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.targets.length){
						player.discardPlayerCard(true,result.targets[0],'hej');
					}
				},
			},
			tianming:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				check:function(event,player){
					var cards=player.getCards('h');
					if(cards.length<=2){
						for(var i=0;i<cards.length;i++){
							if(cards[i].name=='shan'||cards[i].name=='tao') return false;
						}
					}
					return true;
				},
				filter:function(event,player){
					return event.card.name=='sha';
				},
				content:function(){
					"step 0"
					player.chooseToDiscard(2,true,'he');
					player.draw(2);
					var players=game.filterPlayer();
					players.sort(function(a,b){
						return b.hp-a.hp;
					});
					if(players[0].hp>players[1].hp&&players[0]!=player){
						players[0].chooseBool(get.prompt2('tianming'));
						event.player=players[0];
					}
					else{
						event.finish();
					}
					"step 1"
					if(result.bool){
						player.chooseToDiscard(2,true,'he');
						player.draw(2);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha') return [1,0.5];
						}
					}
				}
			},
			mizhao:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterCard:true,
				selectCard:-1,
				filterTarget:function(card,player,target){
					return player!=target;
				},
				discard:false,
				prepare:'give2',
				ai:{
					order:1,
					result:{
						player:0,
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							if(player.countCards('h')>1){
								return 1;
							}
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i].countCards('h')&&players[i]!=target&&players[i]!=player&&get.attitude(player,players[i])<0){
									break;
								}
							}
							if(i==players.length){
								return 1;
							}
							return -2/(target.countCards('h')+1);
						}
					}
				},
				content:function(){
					"step 0"
					event.target1=targets[0];
					targets[0].gain(cards,player);
					var players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(players[i].countCards('h')&&players[i]!=event.target1&&players[i]!=player){
							break;
						}
					}
					if(i==players.length){
						event.finish();
					}
					"step 1"
					player.chooseTarget(true,'选择拼点目标',function(card,player,target){
						return _status.event.target1.canCompare(target)&&target!=player;
					}).set('ai',function(target){
						var player=_status.event.player;
						var eff=get.effect(target,{name:'sha'},_status.event.target1,player);
						var att=get.attitude(player,target);
						if(att>0){
							return eff-10;
						}
						return eff;
					}).set('target1',event.target1);
					"step 2"
					if(result.targets.length){
						event.target2=result.targets[0];
						event.target1.line(event.target2);
						event.target1.chooseToCompare(event.target2);
					}
					else{
						event.finish();
					}
					"step 3"
					if(!result.tie){
						if(result.bool&&event.target1.canUse({name:'sha'},event.target2,false)){
							event.target1.useCard({name:'sha'},event.target2);
						}
						else if(event.target2.canUse({name:'sha'},event.target1,false)){
							event.target2.useCard({name:'sha'},event.target1);
						}
					}
				}
			},
			gongao:{
				audio:2,
				trigger:{global:'dieAfter'},
				forced:true,
				unique:true,
				content:function(){
					player.gainMaxHp();
					player.recover();
				},
				ai:{
					threaten:1.5
				}
			},
			juyi:{
				skillAnimation:true,
				animationColor:'thunder',
				audio:true,
				derivation:['benghuai','weizhong'],
				trigger:{player:'phaseBegin'},
				filter:function(event,player){
					return player.maxHp>game.players.length&&player.hp<player.maxHp&&!player.storage.juyi;
				},
				forced:true,
				unique:true,
				juexingji:true,
				content:function(){
					var num=player.maxHp-player.countCards('h');
					if(num>0){
						player.draw(num);
					}
					player.addSkill('benghuai');
					player.addSkill('weizhong');
					player.storage.juyi=true;
					player.awakenSkill('juyi');
				}
			},
			weizhong:{
				audio:true,
				trigger:{player:['gainMaxHpEnd','loseMaxHpEnd']},
				forced:true,
				content:function(){
					player.draw();
				}
			},
			chixin:{
				group:['chixin1','chixin2'],
				mod:{
					cardUsable:function(card,player,num){
						if(card.name=='sha'){
							return num+20;
						}
					},
				},
				trigger:{player:'shaBefore'},
				forced:true,
				popup:false,
				check:function(event,player){
					return player.countCards('h','sha')>0;
				},
				filter:function(event,player){
					return _status.currentPhase==player;
				},
				content:function(){
					var target=trigger.target;
					if(target.hasSkill('chixin3')){
						target.storage.chixin++;
					}
					else{
						target.storage.chixin=1;
						target.addTempSkill('chixin3','phaseUseEnd');
					}
				}
			},
			chixin1:{
				enable:['chooseToRespond','chooseToUse'],
				filterCard:{suit:'diamond'},
				position:'he',
				viewAs:{name:'sha'},
				prompt:'将一张♦牌当杀使用或打出',
				check:function(card){return 5-get.value(card)},
				ai:{
					respondSha:true,
				}
			},
			chixin2:{
				enable:['chooseToRespond'],
				filterCard:{suit:'diamond'},
				viewAs:{name:'shan'},
				position:'he',
				prompt:'将一张♦牌当闪打出',
				check:function(card){return 5-get.value(card)},
				ai:{
					respondShan:true,
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.8
						}
					},
				}
			},
			chixin3:{
				mod:{
					targetEnabled:function(card,player,target){
						if(card.name!='sha') return;
						if(player==_status.currentPhase&&player.hasSkill('chixin')){
							var num=player.getCardUsable(card,true)-20;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(players[i].hasSkill('chixin3')){
									num+=1-players[i].storage.chixin;
								}
							}
							return num>1;
						}
					}
				}
			},
			suiren:{
				trigger:{player:'phaseBegin'},
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return !player.storage.suiren;
				},
				intro:{
					content:'limited',
				},
				mark:true,
				direct:true,
				unique:true,
				limited:true,
				content:function(){
					"step 0"
					var check=(player.hp==1||(player.hp==2&&player.countCards('h')<=1));
					player.chooseTarget(get.prompt2('suiren')).set('ai',function(target){
						if(!_status.event.check) return 0;
						return get.attitude(_status.event.player,target);
					}).set('check',check);
					"step 1"
					if(result.bool){
						player.storage.suiren=true;
						player.awakenSkill('suiren');
						player.logSkill('suiren',result.targets);
						player.removeSkill('yicong');
						player.gainMaxHp();
						player.recover();
						result.targets[0].draw(3);
					}
				}
			},
			kuangfu:{
				trigger:{source:'damageSource'},
				direct:true,
				audio:2,
				filter:function(event){
					if(event._notrigger.contains(event.player)) return false;
					return event.card&&event.card.name=='sha'&&event.player.countCards('e');
				},
				content:function(){
					"step 0"
					var neg=get.attitude(player,trigger.player)<=0;
					player.choosePlayerCard('e',trigger.player).set('ai',function(button){
						if(_status.event.neg){
							return get.buttonValue(button);
						}
						return 0;
					}).set('neg',neg);
					"step 1"
					if(result.bool){
						player.logSkill('kuangfu');
						event.card=result.links[0];
						if(player.isEmpty(get.subtype(event.card))){
							player.chooseBool('是否将'+get.translation(event.card)+'置入自己的装备区？').ai=function(){
								return true;
							};
						}
						else event._result={bool:false};
					}
					else event.finish();
					"step 2"
					if(result.bool){
						trigger.player.$give(event.card,player);
						player.equip(event.card);
					}
					else trigger.player.discard(event.card);
				}
			},
		},
		translate:{
			zhangren:'张任',
			zoushi:'邹氏',
			zangba:'臧霸',
			jiling:'纪灵',
			gz_sp_dongzhuo:'董卓',
			gz_zhangjiao:'张角',
			litong:'李通',
			mizhu:'糜竺',
			buzhi:'步骘',
			chenlin:'陈琳',
			yuanshu:'SP袁术',
			gongsunzan:'公孙瓒',
			sp_diaochan:'SP貂蝉',
			yangxiu:'杨修',
			sp_zhaoyun:'SP赵云',
			jsp_zhaoyun:'☆SP赵云',
			caohong:'曹洪',
			liuxie:'刘协',
			xiahouba:'夏侯霸',
			zhugejin:'诸葛瑾',
			zhugeke:'诸葛恪',
			guanyinping:'关银屏',
			ganfuren:'甘夫人',
			sunhao:'孙皓',
			chengyu:'程昱',
			simalang:'司马朗',
			tianfeng:'田丰',
			sp_pangtong:'SP庞统',
			sp_jiaxu:'SP贾诩',
			maliang:'马良',
			sp_caoren:'SP曹仁',
			yuejin:'乐进',
			mifuren:'糜夫人',
			sp_dongzhuo:'SP董卓',
			chendong:'陈武董袭',
			jiangfei:'蒋琬费祎',
			jiangqing:'蒋钦',
			hetaihou:'何太后',
			dingfeng:'丁奉',
			zhangxingcai:'张星彩',
			caoang:'曹昂',
			kongrong:'孔融',
			fuwan:'伏完',
			sp_pangde:'SP庞德',
			sp_sunshangxiang:'SP孙尚香',
			zhugedan:'诸葛诞',
			sp_machao:'SP马超',
			sp_jiangwei:'SP姜维',
			zhangbao:'张宝',
			yangxiou:'杨修',
			shixie:'士燮',
			mayunlu:'马云騄',
			zhanglu:'张鲁',
			wutugu:'兀突骨',
			mateng:'马腾',
			sp_caiwenji:'SP蔡文姬',
			zhugeguo:'诸葛果',
			liuzan:'留赞',
			lingcao:'凌操',
			sunru:'孙茹',
			lingju:'灵雎',
			lifeng:'李丰',
			jsp_guanyu:'SP关羽',
			zhuling:'朱灵',
			sunluyu:'孙鲁育',
			hanba:'旱魃',
			panfeng:'潘凤',
			zumao:'祖茂',
			daxiaoqiao:'大小乔',
			sp_daqiao:'☆SP大乔',
			sp_ganning:'☆SP甘宁',
			sp_zhangfei:'☆SP张飞',
			sp_xiahoudun:'☆SP夏侯惇',
			cuiyan:'崔琰',
			wenpin:'文聘',
			jsp_huangyueying:'SP黄月英',
			sp_lvmeng:'☆SP吕蒙',
			guansuo:'关索',
			tadun:'蹋顿',
			yanbaihu:'严白虎',
			wanglang:'王朗',
			sp_liubei:'☆SP刘备',
			caochun:'曹纯',
			dongbai:'董白',
			zhaoxiang:'赵襄',
			heqi:'贺齐',
			kanze:'阚泽',
			dongyun:'董允',
			mazhong:'马忠',
			huangfusong:'皇甫嵩',
			miheng:'祢衡',
			taoqian:'陶谦',
			wangyun:'王允',
			sunqian:'孙乾',
			xizhicai:'戏志才',
			quyi:'麴义',
			liuye:'刘晔',
			beimihu:'卑弥呼',
			luzhi:'鲁芝',
			sp_liuqi:'刘琦',
			huangjinleishi:'黄巾雷使',
			bianfuren:'卞夫人',
			shamoke:'沙摩柯',
			lvfan:'吕范',
			liqueguosi:'李傕郭汜',
			cuimao:'崔琰毛玠',
			kaisa:"凯撒",
			
			lijue:"李傕",
			zhangji:"张济",
			fanchou:"樊稠",
			guosi:"郭汜",
			lvkai:"吕凯",
			zhanggong:"张恭",
			weiwenzhugezhi:"卫温诸葛直",
			caoying:"曹婴",
			simahui:"司马徽",
			baosanniang:"鲍三娘",
			xurong:"徐荣",
			sp_xiahoushi:"SP夏侯氏",
			zhangqiying:"张琪瑛",
			xf_tangzi:"唐咨",
			xf_huangquan:"黄权",
			xf_sufei:"苏飞",
			pangdegong:"庞德公",
			zhaotongzhaoguang:"赵统赵广",
			majun:"马钧",
			simazhao:"司马昭",
			wangyuanji:"王元姬",
			
			mangyachang:"忙牙长",
			xugong:"许贡",
			zhangchangpu:"张昌蒲",
			jianggan:"蒋干",
			wenyang:'文鸯',
			diy_wenyang:'文鸯',
			guanlu:'管辂',
			gexuan:'葛玄',
			hejin:'何进',
			hansui:'韩遂',
			niujin:'牛金',
			
			mouzhu:'谋诛',
			mouzhu_info:'出牌阶段限一次，你可以令一名有牌的其他角色交给你一张牌。然后若你的手牌数大于其，其选择视为对你使用一张【杀】或【决斗】。',
			yanhuo:'延祸',
			yanhuo_info:'当你死亡时，你可以依次弃置一名其他角色的X张牌。（X为你的牌数）',
			niluan:'逆乱',
			niluan_info:'其他角色的结束阶段开始时，若其本回合内使用过【杀】或其体力值大于你，则你可以将一张黑色牌当做【杀】使用。',
			cuorui:'挫锐',
			cuorui_info:'锁定技，游戏开始时，你摸X张牌（X为你的体力上限）。锁定技，限定技，判定阶段开始前，若你的判定区有牌，你跳过此阶段。',
			cuorui_info_single:'锁定技，你的起始手牌数改为X+2（X为你剩余的备选武将数）。你跳过登场后的第一个判定阶段。',
			liewei:'裂围',
			liewei_info:'当你杀死一名角色后，你可以摸三张牌。',
			tuiyan:'推演',
			tuiyan_info:'出牌阶段开始时，你可以观看牌堆顶的两张牌。',
			busuan:'卜算',
			busuan_info:'出牌阶段限一次，你可以选择一名其他角色，然后选择至多两张不同的卡牌名称（限基本牌或锦囊牌）。该角色下次摸牌阶段摸牌时，改为从牌堆或弃牌堆中获得你选择的牌。',
			busuan_angelbeats:'卜算',
			mingjie:'命戒',
			mingjie_info:'结束阶段，你可以摸一张牌，若此牌为红色，你可以重复此流程直到摸到黑色牌或摸到第三张牌。当你以此法摸到黑色牌时，你失去1点体力。',
			gxlianhua:'炼化',
			gxlianhua_info:'你的回合外，每当有其他角色受到伤害后，你获得一个“丹血”标记  （该角色与你阵营一致为红色，不一致为黑色，此颜色对玩家不可见）直到你的准备阶段开始。准备阶段，根据你获得的“丹血”标记的数量和颜色，你获得相应的游戏牌以及获得相应技能直到回合结束。3枚或以下：“英姿”和【桃】；超过3枚且红色“丹血”较多：“观星”和【无中生有】；超过3枚且黑色“丹血”较多：“直言”和【顺手牵羊】；超过3枚且红色和黑色一样多：【杀】、【决斗】和“攻心”。',
			zhafu:'札符',
			zhafu_info:'	限定技，出牌阶段，你可以选择一名其他角色。该角色的下一个弃牌阶段开始时，其选择保留一张手牌，然后将其余的手牌交给你。',
			xinlvli:'膂力',
			xinlvli_info:'每回合限一次，当你造成伤害后，你可选择：1，若你的体力值大于你的手牌数，你摸Ｘ张牌；2，若你的手牌数大于你的体力值且你已受伤，你回复Ｘ点体力（Ｘ为你的手牌数与体力值之差）。',
			lvli:'膂力',
			lvli4:'膂力',
			lvli5:'膂力',
			lvli_info:'每名角色的回合限一次， 你可以声明一个基本牌或普通锦囊牌的牌名，有随机概率视为使用之(装备区里的牌数越多成功概率越大) ',
			choujue:'仇决',
			choujue_info:'觉醒技，每个回合结束时，若你的手牌数和体力值相差3或更多，你减1点体力上限并获得技能“背水”，然后“膂力”改为“在自己的回合时每回合限两次”。',
			beishui:'背水',
			beishui_info:'觉醒技，准备阶段，若你的手牌数或体力值小于2，你减1点体力 上限并获得技能“清剿”，然后“膂力”改为受到伤害后也可发动。',
			qingjiao:'清剿',
			qingjiao_info:'出牌阶段开始时，你可以弃置所有手牌，然后从牌堆或弃牌堆中随机获得八张牌名各不相同且副类别不同的牌。若如此做，结束阶段，你弃置所有牌。',
			spjiedao:"截刀",
			"spjiedao_info":"当你每回合第一次造成伤害时，你可令此伤害至多+X（X为你损失的体力值）。然后若受到此伤害的角色没有死亡，你弃置等同于此伤害加值的牌。",
			biaozhao:"表召",
			"biaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为“表”。当有一张与“表”花色点数均相同的牌进入弃牌堆时，移去“表”且你失去1点体力，若此牌是其他角色因弃置而进入弃牌堆的，则改为该角色获得“表”。准备阶段，若你的武将牌上有“表”，则移去“表”然后你选择一名角色，该角色回复1点体力且将手牌摸至与全场手牌数最多的人相同（最多摸五张）。",
			"biaozhao2":"表召",
			"biaozhao2_info":"",
			"biaozhao3":"表召",
			"biaozhao3_info":"",
			yechou:"业仇",
			"yechou_info":"你死亡时，可以选择一名已损失体力值大于1的角色。每个回合结束时，该角色失去1点体力直到其回合开始",
			"yechou2":"业仇",
			"yechou2_info":"",
			yanjiao:"严教",
			"yanjiao_info":"出牌阶段限一次，你可以选择一名其他角色。从牌堆顶亮出四张牌，该角色将这些牌分成点数之和相等的两组，你与其各获得其中一组，然后将剩余未分组的牌置入弃牌堆。若未分组的牌超过一张，你本回合手牌上限-1。",
			"yanjiao2":"严教",
			"yanjiao2_info":"",
			xingshen:"省身",
			"xingshen_info":"当你受到伤害后，你可以摸一张牌且下一次发动“严教”亮出的牌数+1。若你的手牌数为全场最少，则改为摸两张牌；若你的体力值为全场最少，则“严教”亮出的牌数改为+2（加值总数不能超过4）。",
			
			weicheng:'伪诚',
			weicheng_info:'当其他角色获得你的手牌后，若你的手牌数小于体力值，你可以摸一张牌。',
			daoshu:'盗书',
			daoshu_info:'出牌阶段，你可以选择一个花色并获得一名其他角色的一张手牌。若此牌花色与你选择的相同，则你对其造成1点伤害。否则你须交给其一张与此牌花色不同的手牌（没有则展示手牌），且本阶段内不能再发动【盗书】',

			xinshanjia:"缮甲",
			"xinshanjia_info":"出牌阶段开始时，你可以摸三张牌，然后弃置3-X张牌(X为你本局游戏内失去过的装备区内的牌的数目且至多为3)。若你没有以此法弃置基本牌或锦囊牌，则你可以视为使用了一张不计入出牌阶段使用次数的【杀】。",
			"new_meibu":"魅步",
			"new_meibu_info":"其他角色的出牌阶段开始时，若你在其攻击范围内，你可以弃置一张牌，令该角色于本回合内拥有“止息”。若你以此法弃置的牌不是【杀】或黑色锦囊牌，则本回合其与你距离视为1。",
			"new_mumu":"穆穆",
			"new_mumu_info":"出牌阶段开始时，你可以选择一项：1.弃置一名其他角色装备区里的一张牌；2.获得一名角色装备区里的一张防具牌，若如此做，你本回合不能使用【杀】。",
			"new_zhixi":"止息",
			"new_zhixi_info":"锁定技，出牌阶段，你至多可使用X张牌，你使用了锦囊牌后不能再使用牌（X为你的体力值）。",
			"new_mumu2":"穆穆",
			"new_mumu2_info":"锁定技，你不能使用【杀】。",
			"new_xingwu":"星舞",
			"new_xingwu_info":"弃牌阶段开始时，你可以将一张手牌置于武将牌上，称之为「舞」。然后若你的「舞」中包含三种花色，则你须移去三张花色不同的「舞」并选择一名角色，该角色受到2点伤害(若为女性，则改为1点)并弃置其装备区的所有牌。",
			"new_luoyan":"落雁",
			"new_luoyan_info":"锁定技。若你的武将牌上有「舞」，则你视为拥有技能〖天香〗和〖流离〗。",
			"new_luoyan_tianxiang":"天香",
			"new_luoyan_tianxiang_info":"",
			"new_luoyan_liuli":"流离",
			"new_luoyan_liuli_info":"",
			ol_shichou:"誓仇",
			ol_shichou_info:"当你使用【杀】时，你可以令至多X名角色也成为此【杀】的目标。（X为你已损失的体力值）",
			"zhenwei_three":"镇卫",
			"zhenwei_three_info":"锁定技，敌方角色至己方其他角色的距离+1。",
			"huanshi_three":"缓释",
			"huanshi_three_info":"一名友方角色的判定牌生效前，你可打出一张牌代替之。",
			zhengfu:"征服",
			"zhengfu_info":"当你使用【杀】指定目标时，你可以选择一种牌的类别，然后除非目标角色交给你一种该类别的牌，否则其不能闪避此【杀】。",
			
			yizan:"翊赞",
			yizan_info:"你可以将两张牌（其中至少一张是基本牌）当任意基本牌牌使用",
			yizan0:"翊赞",
			yizan0_info:"你可以将两张牌（其中至少一张是基本牌）当任意基本牌牌使用",
			yizan1:"翊赞",
			yizan1_info:"你可以将两张牌（其中至少一张是基本牌）当【闪】打出",
			yizan2:"翊赞",
			yizan2_info:"你可以将一张基本牌当任意基本牌牌使用",
			yizan3:"翊赞",
			yizan3_info:"你可以将一张基本牌当【闪】打出 ",
			yizan5:"翊赞",
			yizan5_info:"你可以将两张牌（其中至少一张是基本牌）当【杀】打出",
			yizan6:"翊赞",
			yizan6_info:"你可以将一张基本牌当【杀】打出",
			longyuan:"龙渊",
			longyuan_info:"<span class=greentext>觉醒技</span> 当你使用或打出基本牌时，若你已经已累计发动过3次【翊赞】，你将【翊赞】改为“你可以将一张基本牌当任意基本牌牌使用或打出”。",
			wuniang:"武娘",
			wuniang_info:"你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后该角色摸一张牌；若“关索”在场，你可令“关索”也摸一张牌",
			zhennan:"镇南",
			zhennan_info:"当你成为【南蛮入侵】的目标时，你可令一名其他角色随机受到一至三点伤害",
			xushen:"许身",
			xushen_info:"当其他男性角色令你脱离濒死状态时，若“关索”不在场，其可以选择是否用“关索”替换其武将牌，然后你回复一点体力并获得技能【镇南】",
			
			wanwei:'挽危',
			wanwei_info:'当你因被其他角色获得或弃置而失去牌时，你可以改为自己选择失去的牌',
			yuejian:'约俭',
			yuejian_info:'一名角色的弃牌阶段开始时，若其本回合内使用过的牌数小于X，则你可以令其本回合的手牌上限+X。(X为其的体力上限)',
			gzjili:'蒺藜',
			gzjili_info:'当你于一回合内使用或打出第X张牌时，你可以摸X张牌（X为你的攻击范围）。',
			xiongsuan:'凶算',
			xiongsuan_info:'限定技，出牌阶段，你可以弃置一张手牌并选择一名角色，对其造成1点伤害，然后你摸三张牌。若该角色有已发动的限定技，则你选择其中一个限定技，此回合结束后视为该限定技未发动过。',
			diaodu:"调度",
			diaodu_info:"当你使用装备牌时，你可以摸一张牌；出牌阶段开始时，你可以获得一名其他角色装备区里的一张牌，然后你可以将此牌交给另一名角色。",
			diancai:'典财',
			diancai_info:'其他角色的出牌阶段结束时，若你于此阶段失去了X张或更多的牌，则你可以将手牌摸至体力上限。（X为你的体力值）',
			zhengbi:'征辟',
			zhengbi_info:'出牌阶段开始时，你可以选择一项：选择一名未受伤的其他角色，你对其使用的牌无距离限制且不计入使用次数直到回合结束；或将一张基本牌交给一名其他角色，然后其交给你一张非基本牌或两张基本牌。',
			fengying:'奉迎',
			fengying_info:'限定技，出牌阶段，你可以弃置所有手牌。若如此做，你可以令等量的角色将手牌摸至X张(X为其手牌上限且至多为5)。然后，你结束出牌阶段，并在当前回合结束后进行一个新的回合。',
			
			qingzhong:'清忠',
			qingzhong_info:'出牌阶段开始时，你可以摸两张牌，若如此做，本阶段结束时，你与手牌数最少的角色交换手牌。',
			weijing:'卫境',
			weijing_info:'每轮限一次，你可以在需要使用【杀】或【闪】时，视为使用一张【杀】或【闪】。',
			spwenji:'问计',
			spwenji_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌。你于本回合内使用与该牌同名的牌不能被其他角色响应。',
			sptunjiang:'屯江',
			sptunjiang_info:'结束阶段，若你未跳过本回合的出牌阶段，且你于本回合出牌阶段内未使用牌指定过其他角色为目标，则你可以摸X张牌（X为全场势力数）。',
			zongkui:'纵傀',
			zongkui_mark:'纵傀',
			zongkui_mark_bg:'傀',
			zongkui_info:'回合开始时，你可以指定一名未拥有“傀”标记的其他角色，令其获得一枚“傀”标记。每轮游戏开始时，你可以指定一名体力值最少且没有“傀”标记的其他角色，令其获得一枚“傀”标记。',
			guju:'骨疽',
			guju_info:'锁定技，拥有“傀”标记的角色受到伤害后，你摸一张牌。',
			baijia:'拜假',
			baijia_info:'觉醒技，准备阶段，若你因“骨疽”获得牌不小于7张，则你增加1点体力上限，回复1点体力，然后令所有未拥有“傀”标记的其他角色获得“傀”标记，最后失去技能“骨疽”，并获得技能“蚕食”。',
			bmcanshi:'蚕食',
			bmcanshi_info:'一名角色使用牌指定你为唯一目标时，若其有“傀”标记，你可以取消之，然后其失去“傀”标记；你使用牌仅指定一名角色为目标时，你可以额外指定任意名带有“傀”标记的角色为目标，然后其失去“傀”标记。',
			zishu:'自书',
			zishu_info:'锁定技，你的回合外，你获得的牌均会在当前回合结束后置入弃牌堆；你的回合内，当你不因此技能效果获得牌时，额外摸一张牌。',
			yingyuan:'应援',
			yingyuan_info:'当你于回合内使用的牌置入弃牌堆后，你可以将之交给一名其他角色（相同牌名的牌每回合限一次）。',
			ly_piliche:'霹雳车',
			ly_piliche_info:'当你对其他角色造成伤害后，若造成伤害牌不为延时锦囊牌，你可以弃置其装备区里的防具牌与+1坐骑牌；当你失去此装备时，销毁之',
			polu:'破橹',
			polu_info:'锁定技，回合开始时，若你的装备区里没有【霹雳车】，你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，你摸一张牌',
			choulve:'筹略',
			choulve_info:'出牌阶段开始时，你可以令一名其他角色交给你一张牌，若其如此做，视为你使用上一张对你造成伤害且不为延时锦囊牌的牌',
			qianya:'谦雅',
			qianya_info:'当你成为锦囊牌的目标后，你可以将任意张手牌交给一名其他角色',
			shuimeng:'说盟',
			shuimeng_info:'出牌阶段结束时，你可以与一名角色拼点，若你赢，视为你使用【无中生有】；若你没赢，视为其对你使用【过河拆桥】',
			xianfu:'先辅',
			xianfu2:'先辅',
			xianfu2_bg:'辅',
			xianfu_info:'锁定技，游戏开始时，你选择一名其他角色，当其受到伤害后，你受到等量的伤害，当其回复体力后，你回复等量的体力',
			chouce:'筹策',
			chouce_info:'当你受到1点伤害后，你可以判定，若结果为：黑色，你弃置一名角色区域里的一张牌；红色，你选择一名角色，其摸一张牌，若其是“先辅”选择的角色，改为其摸两张牌',
			fuqi:'伏骑',
			fuqi_info:'锁定技，当你使用牌时，你令所有与你距离为1的其他角色不能使用或打出牌响应此牌。',
			jiaozi:'骄恣',
			jiaozi_info:'锁定技，若你的手牌数为全场唯一最多，则当你造成或受到伤害时，此伤害+1',
			wy_meirenji:'美人计',
			wy_meirenji_info:'出牌阶段，对一名有手牌的其他男性角色使用。每名女性角色各获得其一张手牌并将一张手牌交给你，然后比较你与其的手牌数，手牌少的角色对手牌多的角色造成1点伤害',
			wy_xiaolicangdao:'笑里藏刀',
			wy_xiaolicangdao_info:'出牌阶段，对一名其他角色使用。该角色摸X张牌（X为其已损失的体力值且至多为5），然后你对其造成1点伤害',
			weikui:'伪溃',
			weikui2:'伪溃',
			weikui_info:'出牌阶段限一次，你可以失去1点体力并选择一名有手牌的其他角色，你观看其手牌：若其手牌中有【闪】，则视为你对其使用【杀】,且本回合你计算与其的距离视为1；若其手牌中没有【闪】，你弃置其中一张牌',
			lizhan:'励战',
			lizhan_info:'结束阶段，你可以令任意名已受伤的角色摸一张牌',
			wylianji:'连计',
			wylianji_info:'出牌阶段限一次，你可以展示一张【杀】或黑色锦囊牌，并令一名其他角色将牌堆中的随机一张武器牌置入装备区（可替换原装备）。然后该角色选择一项：1.对除你以外的角色使用该牌，并将装备区里的武器牌交给该牌的一个目标角色；2.令你对其使用此牌，然后获得此牌，并将装备区内的武器牌交给你。',
			// from here
			moucheng:'谋逞',
			moucheng_info:'觉醒技，当其他角色使用因“连计”交给其的牌累计造成伤害达到3点后，你失去技能“连计”，然后获得技能“矜功”',
			jingong:'矜功',
			jingong2:'矜功',
			jingong_backup:'矜功',
			jingong_info:'出牌阶段限一次，你可以将一张装备牌或【杀】当一张随机锦囊牌使用（三选一，其中一张为【美人计】或【笑里藏刀】），然后本回合的结束阶段，若你于本回合内未造成过伤害，你失去1点体力',
			zhaohuo:'招祸',
			zhaohuo_info:'锁定技，当其他角色进入濒死状态时，你的体力上限变为1点，你每以此法减少1点体力上限，你摸一张牌',
			yixiang:'义襄',
			yixiang_info:'每名角色的回合限一次，当你成为一名角色使用牌的目标后，若其的体力值大于你的体力值，你可以随机获得牌堆里一张你没有的基本牌',
			yirang:'揖让',
			yirang_info:'出牌阶段开始时，你可以将所有非基本牌交给一名体力上限大于你的其他角色，然后调整体力上限至与该角色相同，你回复X点体力（X为你以此法交给其的牌的类别数）',
			kuangcai:'狂才',
			kuangcai_info:'出牌阶段开始时，你可以令你此阶段内的主动出牌时间变为5秒，响应出牌时间也变为5秒。若如此做，你使用牌没距离和次数限制，且每当你于此阶段内使用牌时，你摸一张牌且主动出牌时间-1秒。你一回合通过狂才最多获得5张牌',
			shejian:'舌剑',
			shejian_info:'弃牌阶段结束时，若你于此阶段弃置的所有牌花色均不相同，你可以弃置一名其他角色的一张牌',
			fenyue:'奋钺',
			fenyue2:'奋钺',
			fenyue2_bg:'钺',
			fenyue_info:'出牌阶段限X次，你可以与一名角色拼点，若你赢，你选择一项：1.其不能使用或打出手牌直到回合结束；2.视为你对其使用了【杀】（不计入次数限制）。若你没赢，你结束出牌阶段。（X为存活的忠臣数）',
			zhuoshui:'祸水',
			zhuoshui_info:'锁定技，准备阶段，你令所有其他角色的非锁定技失效直到回合结束',
			zqingcheng:'倾城',
			zqingcheng_info:'出牌阶段，你可以弃置一张装备牌，然后令一名角色翻面并摸两张牌',
			zfengshi:'锋矢',
			zfengshi_info:'你使用杀指定目标后，可以令目标弃置装备区内的一张牌',
			chuanxin:'穿心',
			chuanxin_info:'当你于出牌阶段内使用【杀】或【决斗】对目标角色造成伤害时，你可以防止此伤害。若如此做，该角色选择一项：1.弃置装备区里的所有牌，若如此做，其失去1点体力；2.随机移除主武将牌上的一个技能',
			chuanxin_info_guozhan:'当你于出牌阶段内使用【杀】或【决斗】对目标角色造成伤害时，若其与你势力不同且有副将，你可以防止此伤害。若如此做，该角色选择一项：1.弃置装备区里的所有牌，若如此做，其失去1点体力；2.移除副将',
			hengjiang:'横江',
			hengjiang2:'横江',
			hengjiang_info:'当你受到1点伤害后，你可以令当前回合角色本回合的手牌上限-1。然后若其弃牌阶段内没有弃牌，则你摸一张牌',
			shuangren:'双刃',
			shuangren_info:'出牌阶段开始时，你可以与一名角色拼点。若你赢，你视为任意一名角色使用一张【杀】（此【杀】不计入限制的次数）；若你没赢，你结束出牌阶段',
			shuangren_info_guozhan:'出牌阶段开始时，你可以与一名角色拼点。若你赢，你视为对其或与其势力相同的另一名角色使用一张【杀】（此【杀】不计入限制的次数）；若你没赢，你结束出牌阶段',
			xiashu:'下书',
			xiashu_info:'出牌阶段开始时，你可以将所有手牌交给一名其他角色，然后该角色亮出任意数量的手牌（至少一张），令你选择一项：1.获得其亮出的手牌；2.获得其未亮出的手牌',
			kuanshi:'宽释',
			kuanshi2:'宽释',
			kuanshi_info:'结束阶段，你可以选择一名角色。直到你的下回合开始，该角色下一次受到超过1点的伤害时，防止此伤害，然后你跳过下个回合的摸牌阶段',
			bingzheng:'秉正',
			bingzheng_info:'出牌阶段结束时，你可以令手牌数不等于体力值的一名角色弃置一张手牌或摸一张牌。然后若其手牌数等于体力值，你摸一张牌，且可以交给该角色一张牌',
			sheyan:'舍宴',
			sheyan_info:'当你成为一张普通锦囊牌的目标时（借刀杀人等带有指向目标的锦囊除外），你可以为此牌增加一个目标或令其对其中一个目标无效。（有效目标数至少为一）',
			fuman:'抚蛮',
			fuman2:'抚蛮',
			fuman_info:'出牌阶段，你可以将一张【杀】交给一名本回合未获得过“抚蛮”牌的其他角色，然后其于下个回合结束之前使用“抚蛮”牌时，你摸一张牌',
			qizhou:'绮胄',
			qizhou_info:'锁定技，你根据装备区里牌的花色数获得以下技能：1种或以上-马术；2种或以上-英姿；3种或以上-短兵；4种-奋威',
			shanxi:'闪袭',
			shanxi_info:'出牌阶段限一次，你可以弃置一张红色基本牌，然后弃置攻击范围内的一名其他角色的一张牌，若弃置的牌是【闪】，你观看其手牌，若弃置的不是【闪】，其观看你的手牌',
			duanbing:'短兵',
			duanbing_info:'你使用【杀】可以多选择一名距离为1的角色为目标',
			fanghun:'芳魂',
			fanghun_info:'当你使用【杀】造成伤害后，你获得1个“梅影”标记；你可以移去1个“梅影”标记来发动“龙胆”并摸一张牌',
			fuhan:'扶汉',
			fuhan_info:'限定技，回合开始时，你可以移去所有“梅影”标记，随机观看五名未登场的蜀势力角色，将武将牌替换为其中一名角色，并将体力上限数调整为本局游戏中移去“梅影”标记的数量（至多为游戏开始时的角色数），然后若你是体力值最低的角色，你回复1点体力',
			yjixi:'觊玺',
			yjixi_info:'觉醒技，结束阶段，若你连续三回合没有失去过体力，则你增加1点体力上限并回复1点体力，然后选择一项：获得技能“妄尊”或摸两张牌并获得当前主公的主公技',
			xinyongsi:'庸肆',
			xinyongsi1:'庸肆',
			xinyongsi2:'庸肆',
			xinyongsi_info:'锁定技，摸牌阶段，你令额定摸牌数为X(X为势力数);弃牌阶段开始时，你选择一项：1.弃置一张牌;2.失去1点体力',
			xiehui:'黠慧',
			xiehui2:'黠慧',
			xiehui_info:'锁定技，你的黑色牌不占用手牌上限；其他角色获得你的黑色牌时，其不能使用、打出、弃置这些牌直到其体力值减少为止',
			lianzhu:'连诛',
			lianzhu_info:'出牌阶段限一次，你可以展示并交给一名其他角色一张牌，若该牌为黑色，其选择一项：1.你摸两张牌；2.弃置两张牌',
			zhaolie:'昭烈',
			zhaolie_info:'摸牌阶段摸牌时，你可以少摸一张，指定你攻击范围内的一名角色亮出牌堆顶上3张牌，将其中的非基本牌和【桃】置于弃牌堆，该角色进行二选一：你对其造成X点伤害，然后他获得这些基本牌；或他弃置X张牌，然后你获得这些基本牌。（X为其中非基本牌的数量）',
			shichou:'誓仇',
			shichou2:'誓仇',
			shichou_info:'主公技，限定技，准备阶段，你可指定一名蜀国角色并交给其两张牌。本盘游戏中，每当你受到伤害时，改为该角色替你受到等量的伤害，然后摸等量的牌，直至该角色第一次进入濒死状态',
			shanjia:'缮甲',
			shanjia_info:'出牌阶段开始时，你可以先摸X张牌再弃置等量的牌，若你以此法弃置了装备区内的牌，视为你使用了一张无视距离的【杀】（X为你于本局游戏内使用过的装备牌数且最大为7）',
			tuifeng:'推锋',
			tuifeng2:'推锋',
			tuifeng_info:'1.当你受到1点伤害后，你可以将一张牌置于武将牌上，称为“锋”。2.准备阶段开始时，若你的武将牌上有“锋”，你移去所有“锋”，摸2X张牌，然后你于此回合的出牌阶段内使用【杀】的次数上限+X（X为你此次移去的“锋”数）',
			ziyuan:'资援',
			ziyuan_info:'出牌阶段限一次，你可以将任意张点数之和为13的手牌交给一名其他角色，然后该角色回复1点体力',
			jugu:'巨贾',
			jugu_info:'锁定技，1.你的手牌上限+X。2.游戏开始时，你摸X张牌（X为你的体力上限）',
			hongde:'弘德',
			hongde_info:'当你一次获得或失去至少两张牌后，你可以令一名其他角色摸一张牌',
			dingpan:'定叛',
			dingpan_info_identity:'出牌阶段限X次，你可以令一名装备区里有牌的角色摸一张牌，然后其选择一项：1.令你弃置其装备区里的一张牌；2.获得其装备区里的所有牌，若如此做，你对其造成1点伤害（X为场上存活的反贼数）',
			dingpan_info_versus:'出牌阶段限X次，你可以令一名装备区里有牌的角色摸一张牌，然后其选择一项：1.令你弃置其装备区里的一张牌；2.获得其装备区里的所有牌，若如此做，你对其造成1点伤害（X为场上存活的敌方角色数）',
			dingpan_info:'出牌阶段限一次，你可以令一名装备区里有牌的角色摸一张牌，然后其选择一项：1.令你弃置其装备区里的一张牌；2.获得其装备区里的所有牌，若如此做，你对其造成1点伤害',
			weidi:'伪帝',
			weidi_info:'锁定技，你视为拥有当前主公的主公技',
			juesi:'决死',
			juesi_info:'出牌阶段，你可以弃置一张杀并选择你攻击范围内的一名有牌的其他角色，该角色弃置一张牌，然后若弃置的牌不是杀且你的体力值不大于该角色，你视为对其使用决斗',
			zhenlue:'缜略',
			zhenlue_info:'锁定技，你使用的普通锦囊牌不能被无懈可击响应；你不能成为其他角色的延时类锦囊的目标',
			jianshu:'间书',
			jianshu_info:'限定技，出牌阶段，你可以将一张黑色手牌交给一名其他角色，并选择一名攻击范围内含有其的另一名其他角色，然后令这两名角色拼点，赢的角色弃置两张牌，没赢的角色失去一点体力',
			yongdi:'拥嫡',
			yongdi_info:'限定技，当你受到伤害后，你可令一名其他男性角色增加一点体力上限，然后若该角色的武将牌上有主公技且其不为主公，其获得此主公技',
			gushe:'鼓舌',
			gushe_bg:'舌',
			gushe_info:'出牌阶段限一次，你可以用一张手牌与至多三名角色同时拼点，然后依次结算拼点结果，没赢的角色选择一项：1.弃置一张牌；2.令你摸一张牌。若你没赢，你获得一个“饶舌”标记（你有7个饶舌标记时，你死亡）',
			jici:'激词',
			jici_info:'当你发动“鼓舌”拼点的牌亮出后，若点数小于X，你可令点数+X；若点数等于X，你可令你本回合发动“鼓舌”的次数上限+1（X为你“饶舌”标记的数量）',
			shefu:'设伏',
			shefu_bg:'伏',
			shefu_info:'结束阶段开始时，你可以将一张手牌移出游戏，称为"伏兵"。然后为"伏兵"记录一个基本牌或锦囊牌名称（须与其他"伏兵"记录的名称均不同）。你的回合外，当有其他角色使用与你记录的"伏兵"牌名相同的牌时，你可以令此牌无效，然后移去该"伏兵"',
			benyu:'贲育',
			benyu2:'贲育',
			benyu_info:'每当你受到伤害后，若你的手牌数不大于伤害来源手牌数，你可以将手牌摸至与伤害来源手牌数相同（最多摸至5张）；否则你可以弃置大于伤害来源手牌数的手牌，然后对其造成1点伤害',
			zhidao:'雉盗',
			zhidao_info:'锁定技，当你于你的回合内第一次对区域里有牌的其他角色造成伤害后，你获得其手牌、装备区和判定区里的各一张牌，然后直到回合结束，其他角色不能被选择为你使用牌的目标',
			jili:'寄篱',
			jili_info:'锁定技，当一名其他角色成为红色基本牌或红色普通锦囊牌的目标时，若其与你的距离为1且你既不是此牌的使用者也不是目标，你也成为此牌的目标',
			luanzhan:'乱战',
			luanzhan_info:'你使用【杀】或黑色普通锦囊牌可以额外选择X名角色为目标；当你使用【杀】或黑色普通锦囊牌指定目标后，若此牌的目标角色数小于X，则X减至0。（X为你于本局游戏内造成过伤害的次数）',
			zhengnan:'征南',
			zhengnan_info:'当其他角色死亡后，你可以摸三张牌。若如此做，你获得下列技能中的任意一个：“武圣”、 “当先”和“制蛮”',
			xinzhengnan:'征南',
			xinzhengnan_info:'当其他角色死亡后，你可以摸三张牌，或者获得下列技能中的任意一个：“武圣”、 “当先”和“制蛮”',
			xiefang:'撷芳',
			xiefang_info:'锁定技，你的进攻距离+X（X为女性角色数）',
			qizhi:'奇制',
			qizhi_info:'当你于回合内使用基本牌或锦囊牌指定目标后，你可以弃置不是此牌目标的一名角色的一张牌。若如此做，其摸一张牌',
			jinqu:'进趋',
			jinqu_info:'结束阶段开始时，你可以摸两张牌，若如此做，你将手牌弃置至X张（X为你于此回合发动过“奇制”的次数）',
			tanhu:'探虎',
			tanhu2:'探虎',
			tanhu3:'探虎',
			tanhu_info:'出牌阶段限一次，你可以与一名其他角色拼点。若你赢，你获得以下技能直到回合结束：你与该角色的距离为1，你对该角色使用的普通锦囊牌不能被无懈可击响应',
			mouduan:'谋断',
			mouduan_info:'通常状态下，你拥有标记“武”并拥有技能“激昂”和“谦逊”。当你的手牌数为2张或以下时，你须将你的标记翻面为“文”，将该两项技能转化为“英姿”和“克己”。任一角色的回合开始前，你可弃一张牌将标记翻回',
			jiqiao:'机巧',
			jiqiao_info:'出牌阶段开始时，你可以弃置任意张装备牌，然后亮出牌堆顶三倍数量的牌，你获得其中的锦囊牌',
			linglong:'玲珑',
			linglong_info:'锁定技，若你的装备区没有防具牌，视为你装备着【八卦阵】；若你的装备区没有坐骑牌，你的手牌上限+1；若你的装备区没有宝物牌，则你视为拥有技能〖奇才(界)〗',
			fenyong:'愤勇',
			fenyong2:'愤勇',
			fenyong2_bg:'勇',
			fenyong_info:'每当你受到一次伤害后，你可以获得一枚愤勇标记；当你有愤勇标记时，防止你受到的所有伤害',
			xuehen:'雪恨',
			xuehen_info:'每个角色的结束阶段开始时，若你有愤勇标记，你须弃置之，然后选择一项：1.弃置当前回合角色X张牌（X为你已损失的体力值）；2.视为对一名任意角色使用一张【杀】',
			zhenwei:'镇卫',
			zhenwei2:'镇卫',
			zhenwei_info:'当一名其他角色成为【杀】或黑色锦囊牌的目标时（使用者不是你），若该角色的体力值小于你且此牌的目标角色数为1，你可以弃置一张牌。若如此做，你选择一项：1、摸一张牌，然后将此【杀】或黑色锦囊牌转移给你；2、令此【杀】或黑色锦囊牌无效，然后将此【杀】或黑色锦囊牌置于使用者的武将牌旁，若如此做，当前回合结束后，使用者获得使用者武将牌旁的这些牌',
			jie:'嫉恶',
			jie_info:'锁定技，你使用的红色【杀】造成的伤害+1',
			dahe:'大喝',
			dahe2:'大喝',
			dahe2_bg:'喝',
			dahe_info:'出牌阶段，你可以与一名其他角色拼点。若你赢，该角色的非红心【闪】无效直到回合结束，你可将该角色拼点的牌交给场上一名体力不多于你的角色。若你没赢，你须展示手牌并选择一张弃置。每阶段限一次',
			yinling:'银铃',
			yinling_bg:'锦',
			yinling_info:'出牌阶段，你可以弃置一张黑色牌并指定一名其他角色。若如此做，你获得其一张牌并置于你的武将牌上，称为“锦”（数量最多为四）',
			junwei:'军威',
			junwei2:'军威',
			junwei_info:'结束阶段开始时，你可以移去三张“锦”，若如此做，你须指定一名角色并令其选择一项：1.亮出一张【闪】，然后由你交给任意一名角色。2.该角色失去1点体力，然后由你选择将其装备区的一张牌移出游戏。在该角色的回合结束后，将以此法移出游戏的装备牌移回原处',
			yanxiao:'言笑',
			yanxiao2:'言笑',
			yanxiao_info:'出牌阶段，你可以将一张♦牌置于一名角色的武将牌上，武将牌上有“言笑”牌的角色下个判定阶段开始时，获得言笑牌及其判定区里的所有牌',
			anxian:'安娴',
			anxian_info:'每当你使用【杀】对目标角色造成伤害时，你可以防止此次伤害，令其弃置一张手牌，然后你摸一张牌；当你成为【杀】的目标时，你可以弃置一张手牌使之无效，然后该【杀】的使用者摸一张牌',
			xingwu:'星舞',
			xingwu_info:'弃牌阶段开始时，你可以将一张与你本回合使用的牌颜色均不同的手牌置于武将牌上：若你有至少三张“星舞”牌，你移去“星舞”牌并选择一名男性角色，该角色受到2点伤害并弃置其装备区的所有牌',
			luoyan:'落雁',
			luoyan_info:'锁定技。若你的武将牌上有“星舞牌”，你拥有“天香”和“流离”',
			yinbing:'引兵',
			yinbing_info:'结束阶段开始时，你可以将至少一张非基本牌置于武将牌上。每当你受到【杀】或【决斗】的伤害后，你移去一张“引兵牌”',
			juedi:'绝地',
			juedi_info:'锁定技，准备阶段，你选择一项：1.移去“引兵”牌，将手牌补至体力上限数；2.将“引兵”牌交给一名体力值不大于你的其他角色，其回复1点体力，摸等量的牌',
			kuangfu:'狂斧',
			kuangfu_info:'每当你使用杀造成伤害，可以将对方的一张装备牌移到你的装备区或弃置之。',
			xintan:'心惔',
			xintan_info:'出牌阶段限一次，你可以移去两张“焚”并选择一名角色，该角色失去一点体力',
			fentian:'焚天',
			fentian_info:'锁定技，结束阶段开始时，若你的手牌数少于体力值，你须选择一名攻击范围内的角色，将其一张牌置于你的武将牌上，称为“焚”。锁定技，你的攻击范围+X（X为“焚”的数量）',
			zhiri:'炙日',
			zhiri_info:'觉醒技，准备阶段开始时，若“焚”数不小于3，你减1点体力上限，然后获得技能“心惔”',
			meibu:'魅步',
			meibu_info:'一名其他角色的出牌阶段开始时，若你不在其攻击范围内，你可以令该角色的锦囊牌均视为【杀】，直到该角色以此法使用了一张【杀】或回合结束。若如此做，则直到回合结束，视为你在其攻击范围内',
			mumu:'穆穆',
			mumu_info:'出牌阶段限一次，你可以弃置一张【杀】或黑色锦囊牌，然后选择一项：弃置场上一张武器牌，然后摸一张牌；或将场上的一张防具牌移动到你的装备区里（可替换原防具）',
			zhanyi:'战意',
			zhanyi_basic_sha:'战杀',
			zhanyi_basic_jiu:'战酒',
			zhanyi_basic_tao:'战桃',
			zhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用；锦囊牌，摸两张牌且你使用的牌无距离限制；装备牌，你使用【杀】指定目标角色后，其弃置两张牌',
			nuzhan:'怒斩',
			nuzhan2:'怒斩',
			nuzhan_info:'锁定技，你每当你使用由一张锦囊牌转化而来的【杀】时，你可以额外使用一张杀；锁定技，你使用的由一张装备牌转化而来的【杀】的伤害值基数+1',
			danji:'单骑',
			danji_info:'觉醒技，准备阶段开始时，若你的手牌数大于你的体力值，你减1点体力上限，然后获得“马术”和“怒斩”',
			tunchu:'屯储',
			tunchu_info:'摸牌阶段摸牌时，若你没有“粮”，你可以额外摸两张牌，然后可以将任意张手牌置于你的武将上，称为“粮”，只要你的武将牌上有“粮”，你便不能使用【杀】',
			shuliang:'输粮',
			shuliang_info:'每当一名角色的结束阶段开始时，若其手牌数少于体力值，你可以移去一张“粮”，然后该角色摸两张牌',
			jieyuan:'竭缘',
			jieyuan_more:'竭缘',
			jieyuan_less:'竭缘',
			jieyuan_info:'当你对一名其他角色造成伤害时，若其体力值大于或等于你的体力值，你可弃置一张黑色手牌令此伤害+1；当你受到一名其他角色造成的伤害时，若其体力值大于或等于你的体力值，你可弃置一张红色手牌令此伤害-1。',
			fenxin:'焚心',
			fenxin_old:'焚心',
			fenxin_info:'锁定技，一名其他角色死亡后，若其身份为：忠臣，你发动“竭缘”减少伤害无体力值限制；反贼，你发动“竭缘”增加伤害无体力值限制；内奸，将“竭缘”中的黑色手牌和红色手牌改为一张牌。',
			fenxin_old_info:'限定技，当你杀死一名非主公角色时，在其翻开身份牌之前，你可以与该角色交换身份牌。（你的身份为主公时不能发动此技能）',
			shixin:'释衅',
			shixin_info:'锁定技，当你受到火属性伤害时，你防止此伤害',
			qingyi:'轻逸',
			qingyi1:'轻逸',
			qingyi2:'轻逸',
			qingyi_info:'你可以跳过摸牌阶段，或跳过出牌阶段并弃置一张装备牌，若如此则视为对任意一名使用一张【杀】',
			dujin:'独进',
			dujin_info:'摸牌阶段，你可以额外摸X+1张牌（X为你装备区里牌数的一半且向下取整）',
			yuhua:'羽化',
			yuhua_info:'锁定技，弃牌阶段内，你的非基本牌不计入手牌数，且你不能弃置你的非基本牌',
			qirang:'祈禳',
			qirang_info:'当有装备牌进入你的装备区时，你可以获得牌堆中的一张锦囊牌',
			biluan:'避乱',
			biluan_info:'摸牌阶段开始时，若有其他角色与你距离不大于1，则你可以放弃摸牌。若如此做，你的防御距离+X（X为势力数）',
			lixia:'礼下',
			lixia_info:'锁定技，其他角色结束阶段开始时，若你不在其攻击范围内，你摸一张牌或令其摸一张牌。若如此做，你的防御距离-1',
			yishe:'义舍',
			yishe_bg:'米',
			yishe_info:'结束阶段开始时，若你的武将牌上没有牌，你可以摸两张牌。若如此做，你将两张牌置于武将牌上，称为“米”；当“米”移至其他区域后，若你的武将牌上没有“米”，你回复1点体力',
			bushi:'布施',
			midao:'米道',
			bushi_info:'当你受到1点伤害后，或其他角色受到你造成的1点伤害后，受到伤害的角色可以获得一张“米”',
			midao_info:'当一张判定牌生效前，你可以打出一张“米”代替之',
			fengpo:'凤魄',
			fengpo_info:'当你于出牌阶段内使用第一张【杀】或【决斗】指定目标后，若目标角色数为1，你可以选择一项：1.摸X张牌；2.此牌造成的伤害+X（X为其手牌中方牌的数量）',
			chenqing:'陈情',
			chenqing_info:'每轮限一次，当一名角色处于濒死状态时，你可以令另一名其他角色摸四张牌，然后弃置四张牌。若其以此法弃置的四张牌花色各不相同，则视为该角色对濒死的角色使用一张【桃】',
			mozhi:'默识',
			mozhi_info:'结束阶段开始时，你可以将一张手牌当你本回合出牌阶段使用的第一张基本或普通锦囊牌使用。然后，你可以将一张手牌当你本回合出牌阶段使用的第二张基本或普通锦囊牌使用',
			ranshang:'燃殇',
			ranshang2:'燃殇',
			ranshang_info:'锁定技，当你受到1点火焰伤害后，你获得1枚“燃”标记；结束阶段开始时，你失去X点体力（X为“燃”标记的数量）',
			hanyong:'悍勇',
			hanyong_info:'当你使用【南蛮入侵】或【万箭齐发】时，若你的体力值小于游戏轮数，你可以令此牌造成的伤害+1',

			yicong:'义从',
			yongsi:'庸肆',
			yongsi1:'庸肆',
			yongsi2:'庸肆',
			bifa:'笔伐',
			bifa2:'笔伐',
			songci:'颂词',
			baobian:'豹变',
			lihun:'离魂',
			chongzhen:'冲阵',
			chongzhen1:'冲阵',
			chongzhen2:'冲阵',
			yuanhu:'援护',
			tianming:'天命',
			mizhao:'密诏',
			duwu:'黩武',
			mingzhe:'明哲',
			huanshi:'缓释',
			hongyuan:'弘援',
			aocai:'傲才',
			aocai2:'傲才',
			aocai2_backup:'傲才',
			aocai3:'傲才',
			huxiao:'虎啸',
			huxiao3:'虎啸',
			xueji:'雪恨',
			wuji:'武继',
			shushen:'淑慎',
			shenzhi:'神智',
			xiongyi:'雄异',
			junbing:'郡兵',
			junbing2:'郡兵',
			quji:'去疾',
			sijian:'死谏',
			suishi:'随势',
			suishi2:'随势',
			xiaoguo:'骁果',
			duanxie:'断绁',
			fenming:'奋命',
			guixiu:'闺秀',
			cunsi:'存嗣',
			yongjue:'勇决',
			hengzheng:'横征',
			shengxi:'生息',
			shoucheng:'守成',
			shangyi:'尚义',
			zhendu:'鸩毒',
			qiluan:'戚乱',
			qiluan2:'戚乱',
			qiluan3:'戚乱',
			shenxian:'甚贤',
			qiangwu:'枪舞',
			moukui:'谋溃',
			moukui2:'谋溃',
			lirang:'礼让',
			mingshi:'名士',
			liangzhu:'良助',
			kaikang:'慷忾',
			wangzun:'妄尊',
			tongji:'同疾',
			kuiwei:'溃围',
			kuiwei2:'溃围',
			yanzheng:'严整',
			zhoufu:'咒缚',
			zhoufu2:'咒缚',
			zhoufu3:'咒缚',
			yingbin:'影兵',
			fenxun:'奋迅',
			fenxun2:'奋迅',
			spmengjin:'猛进',
			xiemu:'协穆',
			naman:'纳蛮',
			zuixiang:'醉乡',
			manjuan:'漫卷',
			taichen:'抬榇',
			jilei:'鸡肋',
			jilei2:'鸡肋',
			jilei2_bg:'肋',
			fulu:'符箓',
			fuji:'助祭',
			fenyin:'奋音',
			yawang:'雅望',
			xunzhi:'殉志',
			yingjian:'影箭',
			fanxiang:'返乡',
			fanxiang_info:'觉醒技，准备阶段开始时，若全场有至少一名已受伤且你曾发动【良助】令其摸牌的角色，则你回复1点体力和体力上限，失去技能【良助】并获得技能【枭姬】',
			yingjian_info:'准备阶段，你可以视为使用一张无视距离的杀',
			xunzhi_info:'准备阶段开始时，若你的上家和下家与你的体力值均不相等，你可以失去1点体力。若如此做，你的手牌上限+2',
			yawang_info:'锁定技，摸牌阶段开始时，你改为摸x张牌，然后你于出牌阶段内至多使用x张牌（x为与你体力值相等的角色数）',
			fenyin_info:'你的回合内，当你使用牌时，若此牌与你于此回合内使用的上一张牌颜色不同，则你可以摸一张牌。',
			fuji_info:'当一名角色造成雷电伤害时，你可以令其进行一次判定，若结果为黑色，此伤害+1；若结果为红色，该角色获得此牌。',
			fulu_info:'你可以将【杀】当雷【杀】使用。',
			jilei_info:'每当你受到有来源的伤害时，你可以选择一种牌的类别，令伤害来源不能使用、打出或弃置其此类别的手牌，直到回合结束',
			danlao:'啖酪',
			danlao_info:'当你成为一张指定了多个目标的锦囊牌的目标时，你可以取消之，并摸一张牌。',
			gongao:'功獒',
			zhuiji:'追击',
			chouhai:'仇海',
			chouhai_info:'锁定技，当你每次受到伤害时，若你没有手牌，此伤害+1。',
			guiming:'归命',
			guiming_info:'主公技，锁定技，你将残蚀描述中的“已受伤角色”改为“已受伤角色或其他吴势力角色”',
			chixin:'赤心',
			chixin1:'赤心',
			chixin2:'赤心',
			chixin_info:'你可以将♦牌当【杀】或【闪】使用或打出。出牌阶段，你对你攻击范围内的每名角色均可使用一张【杀】。',
			suiren:'随仁',
			suiren_info:'限定技，准备阶段开始时，你可以失去技能“义从”，然后加1点体力上限并回复1点体力，再令一名角色摸三张牌。',
			canshi:'残蚀',
			canshi2:'残蚀',
			canshi_info:'摸牌阶段开始时，你可以改为摸x张牌（x为已受伤的角色数），若如此做，当你与此回合内使用基本牌或锦囊牌时，你弃置一张牌。',
			zhuiji_info:'锁定技，你与体力值不大于你的角色距离为1。',
			kunfen:'困奋',
			kunfen_info:'锁定技，结束阶段开始时，你失去１点体力，然后摸两张牌',
			fengliang:'逢亮',
			fengliang_info:'觉醒技，当你进入濒死状态时，你减１点体力上限并将体力值回复至２点，然后获得技能挑衅，将困奋改为非锁定技',
			cihuai:'刺槐',
			cihuai_info:'出牌阶段开始时，若你的手牌中没有【杀】，则你可以展示你的手牌，并视为对一名角色使用一张【杀】。',
			gongao_info:'锁定技，每当一名角色死亡后，你增加一点体力上限，回复一点体力。',
			juyi:'举义',
			juyi_info:'觉醒技，准备阶段开始时，若你已受伤且体力上限大于存活角色数，你须将手牌摸至体力上限，然后获得技能“崩坏”和“威重”。',
			weizhong:'威重',
			weizhong_info:'锁定技，每当你的体力上限增加或减少时，你摸一张牌。',
			taichen_info:'出牌阶段限一次，你可以自减一点体力，视为对一名角色使用一张杀（不计入回合内出杀限制）',
			manjuan_info:'其他角色的卡牌因弃置而进入弃牌堆后，你可以弃置一张花色与之不同的牌，然后获得之',
			xinmanjuan:'漫卷',
			xinmanjuan_info:'锁定技，当你不因【漫卷】或【醉乡】而获得牌时，你将此牌置入弃牌堆。然后若此时处于你的回合内，则你可以从弃牌堆中选择获得一张与此牌点数相同的其他牌。',
			zuixiang_info:'限定技，准备阶段开始时，你可以展示牌堆顶的3张牌并置于你的武将牌上。你不可使用或打出与该些牌同类的牌，所有同类牌对你无效。之后每个你的准备阶段，你须重复展示一次，直至这些牌中任意两张点数相同时，将你武将牌上的全部牌置于你的手上。',
			naman_info:'你可以获得其他角色打出的杀',
			xiemu_info:'每当你成为其他角色的黑色牌的目标，可以弃置一张杀并摸两张牌',
			spmengjin_info:'每当你使用一张杀，可以弃置目标一张牌',
			fenxun_info:'出牌阶段限一次，你可以弃置一张牌并选择一名其他角色，然后本回合你计算与其的距离视为1',
			yingbin_info:'锁定技，有“咒”的角色使用与“咒”花色相同的牌时，你摸一张牌；当你因同一名角色的同一张“咒”的效果摸第二张牌时，移去该“咒”',
			zhoufu_info:'出牌阶段限一次，你可以将一张手牌置于一名没有"咒"的其他角色武将牌旁，称为"咒"。当有“咒”的角色判定时，将"咒"作为判定牌；一名角色回合结束时，若有角色于此回合因判定移除过“咒”，则你令这些角色各失去1点体力',
			yanzheng_info:'若你的手牌数大于你的体力值，你可以将你装备区内的牌当【无懈可击】使用',
			kuiwei_info:'结束阶段开始时，你可以摸2+X张牌，然后将你的武将牌翻面。在你的下个摸牌阶段开始时，你须弃置X张牌。（X等于当时场上装备区内的武器牌的数量）',
			tongji_info:'锁定技。若你的手牌数大于你的体力值，则只要你在任一其他角色的攻击范围内，该角色使用【杀】时便不能指定你以外的角色为目标',
			wangzun_info:'其他角色的准备阶段，你可以摸一张牌，然后令该角色此回合的手牌上限-1；直到你的回合开始，你不能再次发动此技',
			kaikang_info:'每当你距离1以内的角色成为杀的目标后，你可以摸一张牌。若如此做，你交给其一张牌并展示之，若该牌为装备牌，该角色可以使用此牌。',
			liangzhu_info:'当一名角色于其出牌阶段内回复体力时，你可以选择一项：1、摸一张牌；2、令该角色摸两张牌 ',
			mingshi_info:'当你即将受到伤害时，若伤害来源的体力值大于你，你可以弃置一张黑色手牌令伤害-1 ',
			lirang_info:'当你的牌因弃置而置入弃牌堆时，你可以将其中的任意张牌交给其他角色',
			moukui_info:'当你使用【杀】指定一名角色为目标后，你可以选择一项：摸一张牌，或弃置其一张牌。若如此做，此【杀】被【闪】抵消时，该角色弃置你的一张牌。 ',
			qiangwu_info:'出牌阶段，你可以进行一次判定。若如此做，则直到回合结束，你使用点数小于判定牌的 【杀】时不受距离限制，且你使用点数大于判定牌的【杀】时不计入出牌阶段的使用次数。',
			shenxian_info:'每名角色的回合限一次，你的回合外，每当有其他角色因弃置而失去牌时，若其中有基本牌，你可以摸一张牌。',
			qiluan_info:'每当你杀死一名角色后，可以在此回合结束时摸三张牌。',
			qiluan_info_guozhan:'当你杀死一名角色后，你可于此回合结束后摸三张牌',
			zhendu_info:'其他角色的出牌阶段开始时，你可以弃置一张手牌，视为该角色使用一张【酒】，然后你对其造成一点伤害。',
			shangyi_info:'出牌阶段限一次，你可以观看一名其他角色的手牌，然后弃置其中的一张黑色牌',
			shoucheng_info:'每当一名其他角色在其回合外失去最后的手牌时，你可令该角色摸一张牌。',
			shengxi_info:'若你于出牌阶段未造成伤害，你可在弃牌阶段开始时摸两张牌。',
			hengzheng_info:'摸牌阶段开始时，若你的体力值为1或你没有手牌，你可以改为获得每名其他角色区域里的一张牌。',
			cunsi_info:'限定技，出牌阶段，你可以将所有手牌交给一名男性角色，令该角色获得技能【勇决】，然后将武将牌翻面',
			guixiu_info:'每当你成为杀的目标，若你的手牌数小于体力值，可以摸一张牌',
			fenming_info:'结束阶段开始时，若你处于连环状态，你可以弃置处于连环状态的每名角色的一张牌。',
			duanxie_info:'出牌阶段限一次，你可以令一名其他角色横置武将牌，若如此做，你横置武将牌。',
			xiaoguo_info:'其他角色的结束阶段开始时，你可以弃置一张基本牌，令该角色选择一项：1.弃置一张装备牌并令你摸一张牌；2.受到你对其造成的1点伤害。',
			sijian_info:'当你失去最后的手牌时，你可以弃置一名其他角色的一张牌。',
			suishi_info:'每当其他角色进入濒死状态时，伤害来源可以令你摸一张牌；每当其他角色死亡时，伤害来源可以令你失去1点体力',
			quji_info:'出牌阶段限一次，你可以弃置X张牌（X为你已损失的体力值），然后令至多X名已受伤的角色各回复1点体力。若你以此法弃置的牌中有黑色牌，你失去一点体力。',
			junbing_info:'一名角色的结束阶段开始时，若其手牌数少于或者等于1，该角色可以摸一张牌。若如此做，该角色须将所有手牌交给你，然后你交给其等量的牌。',
			xiongyi_info:'限定技，出牌阶段，你可以指定至多三名角色各摸三张牌；若你指定的角色数不超过2，你回复1点体力',
			xiongyi_info_guozhan:'限定技，出牌阶段，你可以令与你势力相同的所有角色各摸三张牌，然后若你的势力是角色最少的势力（或之一），则你回复1点体力',
			shenzhi_info:'准备阶段开始时，你可以弃置所有手牌，若你以此法弃置的牌的张数不小于X，你回复1点体力（X为你当前的体力值）。',
			shushen_info:'当你回复1点体力时，你可以令一名其他角色回复1点体力或摸两张牌',
			wuji_info:'觉醒技，结束阶段，若你于此回合内造成过3点或更多伤害，你加1点体力上限并回复1点体力，失去"虎啸"，然后从场上、牌堆或弃牌堆中获得【青龙偃月刀】',
			xueji_info:'出牌阶段限一次，你可以弃置一张红色牌，然后选择至多X名角色，横置这些角色并对其中一名角色造成1点火焰伤害。（X为你已损失的体力值数且至少为1）',
			huxiao_info:'锁定技，当你造成火焰伤害后，受到此伤害的角色各摸一张牌，本回合你对这些角色使用牌没有次数限制',
			aocai_info:'当你于回合外需要使用或打出一张基本牌时，你可以观看牌堆顶的两张牌。若你观看的牌中有此牌，你可以使用打出之。',
			hongyuan_info:'摸牌阶段摸牌时，你可以少摸一张牌，然后指定至多两名其他角色各摸一张牌。',
			hongyuan_info_combat:'摸牌阶段摸牌时，你可以少摸一张牌，然后令其他友方角色各摸一张牌',
			huanshi_info:'一名角色的判定牌生效前，你可令其观看你的手牌。若如此做，该角色选择你的一张牌，令你打出此牌代替之。',
			mingzhe_info:'你的回合外，每当你因使用、打出或弃置而失去一张红色牌时，你可以摸一张牌。',
			duwu_info:'出牌阶段，你可以弃置X张牌对你攻击范围内的一名其他角色造成1点伤害(X为该角色的体力值)。若你以此法令该角色进入濒死状态，则濒死状态结算后你失去1点体力，且本回合不能再发动黩武。',
			tianming_info:'当你成为【杀】的目标时，你可以弃置两张牌(不足则全弃，无牌则不弃)，然后摸两张牌;若此时全场体力值最多的角色仅有一名(且不是你)，该角色也可以如此做。',
			mizhao_info:'出牌阶段，你可以将所有手牌(至少一张)交给一名其他角色。若如此做，你令该角色与你指定的另一名有手牌的角色拼点。视为拼点赢的角色对没赢的角色使用一张【杀】。每阶段限一次。',
			yuanhu_info:'结束阶段开始时，你可以将一张装备牌置于一名角色的装备区里，然后根据此装备牌的种类执行以下效果。武器牌：弃置距离该角色1以内的一名角色区域中的一张牌；防具牌：该角色摸一张牌；坐骑牌：该角色回复1点体力。',
			lihun_info:'出牌阶段，你可以弃置一张牌并将你的武将牌翻面，若如此做，你指定一名男性角色，获得其所有手牌。出牌阶段结束时，你需为该角色每一点体力分配给其一张牌。每回合限一次。',
			chongzhen_info:'每当你发动“龙胆”使用或打出一张手牌时，你可以立即获得对方的一张手牌。',
			bifa_info:'结束阶段开始时，你可以将一张手牌移出游戏并指定一名其他角色。该角色的准备阶段，其观看你移出游戏的牌并选择一项：交给你一张与此牌同类型的手牌并获得此牌；或将此牌置入弃牌堆，然后失去1点体力。',
			songci_info:'出牌阶段，你可以选择一项：令一名手牌数小于其体力值的角色摸两张牌；或令一名手牌数大于其体力值的角色弃置两张牌。此技能对每名角色只能使用一次。',
			yongsi_info:'锁定技，摸牌阶段，你额外摸X张牌，X为场上现存势力数。弃牌阶段，你至少须弃置等同于场上现存势力数的牌（不足则全弃）。',
			yicong_info:'锁定技，只要你的体力值大于2点，你的进攻距离+1；只要你的体力值为2点或更低，你的防御距离+1',
			baobian_info:'锁定技，若你的体力值为3或更少，你视为拥有技能“挑衅”；若你的体力值为2或更少；你视为拥有技能“咆哮”；若你的体力值为1，你视为拥有技能“神速”。',
			
			bingzhao:'秉诏',
			bingzhao_info:'主公技，游戏开始时，你选择一个其他势力，该势力有“傀”标记的角色受到伤害后，可令你因“骨疽”额外摸一张牌。',
			
			sp_default:"常规",
			sp_whlw:"文和乱武",
			sp_zlzy:"逐鹿中原",
			sp_longzhou:"同舟共济",
			sp_zizouqi:"自走棋",
			sp_zhongdan:"忠胆英杰",
			sp_star:"☆SP系列",
			sp_guozhan:"国战",
			sp_guozhan2:"国战移植",
			sp_others:"其他",
			sp_single:'新1v1',
		},
	};
});
