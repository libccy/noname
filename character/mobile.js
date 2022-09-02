'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'mobile',
		//connectBanned:['miheng'],
		connect:true,
		characterSort:{
			mobile:{
				mobile_default:["miheng","taoqian","lingcao","sunru","lifeng","zhuling","liuye","zhaotongzhaoguang","majun","simazhao","wangyuanji","pangdegong","shenpei","hujinding","zhangyì","jiakui","yangbiao","chendeng","dongcheng","yangyi","dengzhi","zhengxuan","sp_sufei","furong","dingyuan","simashi","yanghuiyu","hucheer","gongsunkang","nanhualaoxian","zhouqun","qiaozhou","fuqian","simafu","mayuanyi","yanpu","sunhanhua","sp_maojie","peixiu","sp_jianggan"],
				mobile_yijiang:["yj_zhanghe","yj_zhangliao","yj_xuhuang","yj_ganning",'yj_huangzhong'],
				mobile_shijizhi:["sp_wangcan","sp_chenzhen","sp_sunshao","sp_xunchen","luotong","sp_duyu","sp_bianfuren","feiyi"],
				mobile_shijixin:['wujing','sp_mifuren','sp_xinpi','wangling','wangfuzhaolei','zhouchu','sp_kongrong','sp_yanghu'],
				mobile_shijiren:['caizhenji','xiangchong','sp_huaxin','sp_xujing','zhangzhongjing','sp_zhangwen','liuzhang','qiaogong'],
				mobile_shijiyong:['db_wenyang','sp_chendong','yuanhuan','sp_zongyu','sp_wangshuang','sunyi','sp_gaolan','sp_huaman'],
				mobile_shijiyan:['sp_cuiyan','sp_zhangchangpu','sp_jiangwan','sp_jiangqing','sp_lvfan','sp_huangfusong','sp_zhujun','liuba'],
				mobile_sunben:["re_sunben"],
				mobile_standard:["xin_xiahoudun","xin_zhangfei"],
				mobile_shenhua:["re_pangtong","re_guanqiujian","xin_yuanshao","re_liushan","re_dongzhuo","re_sp_zhugeliang","re_sunjian","re_dengai","re_jiangwei","re_zhurong","re_caiwenji"],
				mobile_yijiang1:["re_xusheng","re_lingtong","ol_yujin","re_wuguotai","re_gaoshun"],
				mobile_yijiang2:["xin_liaohua","xin_caozhang","re_liubiao","re_handang","xin_chengpu","xin_gongsunzan","re_zhonghui","re_bulianshi"],
				mobile_yijiang3:["xin_jianyong","xin_zhuran","xin_guohuai","xin_panzhangmazhong","xin_fuhuanghou","re_yufan"],
				mobile_yijiang4:["xin_zhoucang","xin_caifuren","xin_guyong","xin_sunluban","xin_caozhen","xin_jushou"],
				mobile_yijiang5:['xin_sunxiu',],
				mobile_yijiang67:["re_jikang"],
				mobile_sp:["old_yuanshu","re_wangyun","re_baosanniang","re_weiwenzhugezhi","re_zhanggong","re_xugong","re_heqi","liuzan","xin_hansui"],
			},
		},
		character:{
			xin_jushou:['male','qun',3,['xinjianying','shibei']],
			liuba:['male','shu',3,['duanbi','tongduo']],
			re_bulianshi:['female','wu',3,['reanxu','zhuiyi']],
			re_caiwenji:['female','qun',3,['rebeige','duanchang']],
			sp_jianggan:['male','wei',3,['spdaoshu','spdaizui']],
			peixiu:['male','qun',3,['xingtu','juezhi']],
			re_gaoshun:['male','qun',4,['rexianzhen','rejinjiu']],
			re_wuguotai:['female','wu',3,['reganlu','buyi']],
			xin_sunxiu:['male','wu',3,['mobileyanzhu','mobilexingxue','zhaofu'],['zhu']],
			sp_maojie:['male','wei',3,['bingqing','yingfeng']],
			sp_zhujun:['male','qun',4,['yangjie','zjjuxiang','houfeng']],
			sp_huangfusong:['male','qun',4,['spzhengjun','spshiji','sptaoluan']],
			yj_huangzhong:['male','qun',4,['spshidi','spyishi','spqishe']],
			sp_lvfan:['male','wu',3,['spdiaodu','spdiancai','spyanji']],
			re_yufan:['male','wu',3,['zhiyan','rezongxuan']],
			sunhanhua:['female','wu',3,['chongxu','miaojian','shhlianhua']],
			sp_jiangqing:['male','wu',4,['spjianyi','spshangyi']],
			sp_jiangwan:['male','shu',3,['spzhenting','spjincui']],
			sp_zhangchangpu:['female','wei',3,['spdifei','spyanjiao']],
			sp_cuiyan:['male','wei',3,['spyajun','spzundi']],
			sp_huaman:['female','shu',4,['spxiangzhen','spfangzong','spxizhan']],
			sp_gaolan:['male','qun',4,['spjungong','spdengli']],
			sunyi:['male','wu',4,['zaoli']],
			sp_wangshuang:['male','wei',4,['yiyong','shanxie']],
			yanpu:['male','qun',3,['huantu','bihuo']],
			mayuanyi:['male','qun',4,['jibing','wangjing','moucuan']],
			simafu:['male','wei',3,['xunde','chenjie']],
			fuqian:['male','shu',4,['jueyong','poxiang']],
			sp_zongyu:['male','shu',3,['zhibian','yuyan']],
			yuanhuan:['male','wei',3,['qingjue','fengjie']],
			sp_chendong:['male','wu',4,['spyilie','spfenming']],
			xin_caozhen:['male','wei',4,['discretesidi']],
			xin_sunluban:['female','wu',3,['xinzenhui','xinjiaojin']],
			qiaozhou:['male','shu',3,['zhiming','xingbu']],
			db_wenyang:['male','wei',4,['dbquedi','dbzhuifeng','dbchongjian','dbchoujue'],['doublegroup:wei:wu']],
			xin_guyong:['male','wu',3,['xinshenxing','xinbingyi']],
			re_zhonghui:['male','wei',4,['requanji','zili']],
			xin_caifuren:['female','qun',3,['xinqieting','xianzhou']],
			sp_yanghu:['male','qun',3,['mingfa','rongbei']],
			qiaogong:['male','wu',3,['yizhu','luanchou']],
			liuzhang:['male','qun',3,['jutu','yaohu','rehuaibi'],['zhu']],
			sp_zhangwen:['male','wu',3,['gebo','spsongshu']],
			zhangzhongjing:['male','qun',3,['jishi','xinliaoyi','binglun']],
			xin_zhoucang:['male','shu',4,['mobilezhongyong']],
			sp_xujing:['male','shu',3,['boming','ejian']],
			sp_huaxin:['male','wei',3,['yuanqing','shuchen']],
			xiangchong:['male','shu',4,['guying','muzhen']],
			caizhenji:['female','wei',3,['sheyi','tianyin']],
			ol_yujin:['male','wei',4,['rejieyue']],
			sp_kongrong:['male','qun',3,['xinlirang','xinmingshi']],
			zhouchu:['male','wu',4,['xianghai','rechuhai']],
			wangfuzhaolei:['male','shu',4,['xunyi']],
			wangling:['male','wei',4,['xingqi','xinzifu','mibei']],
			zhouqun:['male','shu',3,['tiansuan']],
			re_zhurong:['female','shu',4,['juxiang','relieren']],
			re_jiangwei:['male','shu',4,['retiaoxin','zhiji']],
			wujing:['male','wu',4,['heji','liubing']],
			sp_mifuren:['female','shu',3,['xinguixiu','qingyu']],
			sp_xinpi:['male','wei',3,['spyinju','spchijie']],
			nanhualaoxian:['male','qun',3,['yufeng','tianshu']],
			feiyi:['male','shu',3,['mjshengxi','fyjianyu']],
			sp_bianfuren:['female','wei',3,['spwanwei','spyuejian']],
			sp_duyu:['male','qun',4,['spwuku','spsanchen']],
			luotong:['male','wu',4,['qinzheng']],
			re_handang:['male','wu',4,['regongji','jiefan']],
			sp_wangcan:['male','wei',3,['spqiai','spshanxi']],
			sp_chenzhen:['male','shu',3,['shameng']],
			sp_sunshao:['male','wu',3,['mjdingyi','mjzuici','mjfubi']],
			sp_xunchen:['male','qun',3,['mjweipo','mjchenshi','mjmouzhi']],
			re_dengai:['male','wei',4,['retuntian','zaoxian']],
			xin_fuhuanghou:['female','qun',3,['xinzhuikong','xinqiuyuan']],
			xin_panzhangmazhong:['male','wu',4,['xinduodao','xinanjian']],
			xin_guohuai:['male','wei',4,['mobilejingce']],
			gongsunkang:['male','qun',4,['juliao','taomie']],
			xin_zhangfei:['male','shu',4,['new_repaoxiao','liyong']],
			xin_hansui:['male','qun',4,['xinniluan','xiaoxi_hansui']],
			hucheer:['male','qun',4,['daoji']],
			re_lingtong:['male','wu',4,['rexuanfeng']],
			re_liubiao:['male','qun',3,['zishou','rezongshi']],
			simashi:['male','wei',4,['baiyi','jinglve','shanli']],
			yanghuiyu:['female','wei',3,['hongyi','requanfeng']],
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
			re_pangtong:['male','shu',3,['xinlianhuan','niepan']],
			re_guanqiujian:['male','wei',4,['rezhengrong','rehongju']],
			chendeng:['male','qun',3,['zhouxuan','fengji']],
			re_heqi:['male','wu',4,['reqizhou','reshanxi']],
			yangbiao:['male','qun',3,['zhaohan','rangjie','yizheng']],
			re_sp_zhugeliang:["male","shu",3,["bazhen","rehuoji","rekanpo"]],
			xin_xiahoudun:['male','wei',4,['reganglie','xinqingjian']],
			zhangyì:['male','shu',4,['rezhiyi']],
			jiakui:['male','wei',3,['zhongzuo','wanlan']],
			re_jikang:["male","wei",3,["new_qingxian","new_juexiang"]],
			miheng:['male','qun',3,['kuangcai','shejian']],
			taoqian:['male','qun',3,['zhaohuo','yixiang','yirang']],
			liuzan:['male','wu',4,['fenyin']],
			lingcao:['male','wu',4,['dujin']],
			sunru:['female','wu',3,['yingjian','shixin']],
			lifeng:['male','shu',3,['tunchu','shuliang']],
			zhuling:['male','wei',4,['xinzhanyi']],
			liuye:['male','wei',3,['polu','choulve']],
			zhaotongzhaoguang:["male","shu",4,["yizan_use","xinfu_longyuan"]],
			majun:["male","wei",3,["xinfu_jingxie1","qiaosi"]],
			simazhao:["male","wei",3,["xinfu_daigong","xinfu_zhaoxin"]],
			wangyuanji:["female","wei",3,["xinfu_qianchong","xinfu_shangjian"]],
			pangdegong:["male","qun",3,["xinfu_pingcai","xinfu_pdgyingshi"]],
			old_yuanshu:['male','qun',4,['xinyongsi','yjixi']],
			
			shenpei:["male","qun","2/3",["shouye","liezhi"]],
			re_wangyun:['male','qun',3,['relianji','remoucheng']],
			
			re_baosanniang:['female','shu',3,['meiyong','rexushen','rezhennan']],
			
			hujinding:['female','shu','2/6',['renshi','wuyuan','huaizi']],
			
			re_zhanggong:['male','wei',3,['reqianxin','rezhenxing']],
			re_xugong:['male','qun',3,['rebiaozhao','yechou']],
			re_weiwenzhugezhi:['male','wu',4,['refuhai']],
			
			xin_yuanshao:['male','qun',4,['reluanji','xueyi'],['zhu']],
			re_liushan:['male','shu',3,['xiangle','refangquan','ruoyu'],['zhu']],
			re_sunben:['male','wu',4,['jiang','rehunzi','zhiba'],['zhu']],
		},
		characterIntro:{
			peixiu:'裴秀（224年－271年4月3日），字季彦。河东郡闻喜县（今山西省闻喜县）人。[1]魏晋时期名臣、地图学家，东汉尚书令裴茂之孙、曹魏光禄大夫裴潜之子。出身河东裴氏，少年时便颇有名气，后被大将军曹爽辟为掾属，袭爵清阳亭侯，又迁黄门侍郎。高平陵之变后，因是曹爽的故吏而被罢免。此后历任廷尉正、安东将军及卫将军司马，参与谋划军国之政，参与平定诸葛诞叛乱。因功转任尚书，进封鲁阳乡侯。魏元帝继位后，进爵鲁阳县侯，任尚书仆射。咸熙元年（264年），受命负责修改官制，又提议恢复五等爵制。五等制恢复后，获封济川侯。他建议立司马炎为世子，司马炎继位晋王后，拜裴秀为尚书令、右光禄大夫。西晋建立后，加左光禄大夫，封钜鹿郡公。泰始三年（267年），升任司空。泰始七年（271年），裴秀因服食寒食散后饮冷酒而逝世，年四十八，谥号“元”。有文集三卷。裴秀作《禹贡地域图》，开创了中国古代地图绘制学。李约瑟称他为“中国科学制图学之父”，与古希腊著名地图学家托勒密齐名，是世界古代地图学史上东西辉映的两颗灿烂明星。为纪念这位中国地图科学创始人而设立的“裴秀奖”，每两年评选一次，是中国地图学界最高奖项。由于他的贡献突出，联合国天文组织将月球正面的一个环形山命名为“裴秀环形山”，',
			liucheng:'游卡桌游的原创人物。设定为黄忠的妻子。',
			jiangwan:'蒋琬（？－246年），字公琰。零陵郡湘乡县人。三国时期蜀汉政治家，与诸葛亮、董允、费祎合称“蜀汉四相”。蒋琬最初随刘备入蜀，为广都县长。因其不理政事，惹怒刘备，在诸葛亮的劝说下才免于一死。后重获启用，受到诸葛亮的悉心培养，累官丞相长史兼抚军将军。建兴十二年（234年），诸葛亮去世，蒋琬继其执政，拜尚书令，又加行都护、假节，领益州刺史，再迁大将军，录尚书事，封安阳亭侯。延熙元年（238年），受命开府，加大司马，总揽蜀汉军政。曾制定由水路进攻曹魏的计划，但未被采纳。延熙九年（246年），蒋琬病逝，谥号为恭。',
			sunhanhua:'孙寒华，三国时女仙。梁·陶弘景《真诰》卷一三、五代·杜光庭《墉城集仙录》卷七：其父孙贲为孙权堂兄，寒华少时与杜契有私情，后从杜契受玄白之要，颜容日少。周旋吴越诸山十馀年，得道仙去。《鉴后集》卷四：一云即吴大帝孙权之女。于茅山修道，道成，冲虚而去，因号其山为华姥山。山在茅山崇禧观前。《神异典》卷二五九人于明代，误。',
			yanpu:'阎圃，生卒年不详，是益州巴西安汉（今四川省南充市）人。张鲁割据巴、汉，就以阎圃为功曹。东汉末年人物，本为张鲁部下谋士，后随张鲁一同投降曹操，封平乐乡侯。',
			mayuanyi:'马元义（？—184年6月7日），东汉末年黄巾之乱的组织者之一，是黄巾大方首领。光和六年（183年），马元义奉黄巾军首领张角之命，筹划起事的准备工作。马元义聚集荆州、扬州信徒数万人约定于邺城相会，并收买中常侍封谞、徐奉等为内应，准备于次年（甲子年）三月初五（戊申日）内外同时起事。由于张角弟子济南人唐周的告密，马元义于于中平元年（184年）正月在河内郡山阳县被捕，送往洛阳车裂，同时被杀的还有教众近千人。由于马元义的被杀，迫使张角提前于二月起兵发动叛乱。',
			simafu:'司马孚（180年－272年4月3日），字叔达。河内郡温县（今河南温县）人。三国曹魏至西晋初年重臣，西晋宗室，东汉京兆尹司马防第三子，晋宣帝司马懿之弟。自曹操时代起，司马孚就任文学掾，而后历仕魏国五代皇帝，累迁至太傅。司马孚在“高平陵事变”之际，协助司马懿控制京师，诛杀曹爽一党。后又督军成功防御吴、蜀的进攻，为司马氏政权的稳固多有功劳。但他性格十分谨慎，自司马懿执掌大权起，便逐渐引退，更未直接参与司马氏废立魏帝的谋划。西晋代魏后，司马孚进拜太宰，封安平王。晋武帝司马炎对他十分尊宠，但他并不以此为荣，至死仍以魏臣自称。泰始八年二月壬辰日（272年4月3日），司马孚去世，年九十三。武帝为其举哀三日，葬礼规格比照东汉东平献王刘苍，赐谥献王。',
			yuanhuan:'袁涣，字曜卿，陈郡扶乐（今河南省周口市太康县）人。东汉末年官员，出身陈郡袁氏，为东汉司徒袁滂之子。袁涣早年曾任郡功曹，后被公府征辟，相继被举为高第、秀才。汉末战乱时，袁涣流寓江淮一带，初为袁术所用，后投吕布。建安三年（198年），曹操率兵剿灭了吕布，袁涣又转投曹操，拜沛南部都尉，后又任谏议大夫、郎中令等职，在任上尽心尽责，以敢谏直言称名。袁涣恕思而后行，外表温柔而内心能断，处危难则勇气极大。汉末三国时期，唯有程昱、曹仁、袁涣三人被评价为勇冠贲育。',
			sunchen:'孙綝（chēn）（231年－259年1月18日），字子通，吴郡富春（今浙江杭州市富阳区）人。三国时期吴国宗室、权臣，昭义中郎将孙静曾孙、定武中郎将孙暠之孙、安民都尉孙绰的儿子。门荫入仕，初任偏将军。太平元年（256年），升任侍中、武卫将军、都督中外诸军事。掌权以后，诛杀大司马滕胤、骠骑将军吕据等重臣，升任大将军，册封永宁县侯。嗜好杀戮，与皇帝孙亮的矛盾激化，最终废黜孙亮，拥立琅琊王孙休即位，累迁丞相、荆州牧。永安元年十二月（259年1月），在左将军张布的协助下，遭到皇帝孙休捕杀，时年二十八岁，削除宗籍，改姓故氏。',
			qiaozhou:'谯周（201年－270年），字允南，巴西郡西充国县（今四川西充县槐树镇）人。三国时期蜀汉大臣、学者、儒学家、史学家。幼年丧父，少读典籍，精研六经，颇晓天文，成为蜀地大儒之一，门下有陈寿、罗宪等学生。诸葛亮担任益州牧时，授劝学从事。诸葛亮死后，不顾朝令，前往奔丧。后主刘禅册立太子时，授太子仆，迁太子家令、光禄大夫。反对姜维北伐，著《仇国论》，力陈北伐之失。炎兴元年（263年），邓艾攻打成都时期，力劝刘禅投降，“有全国之功”，投降魏国后，受封阳城亭侯，迁骑都尉。泰始六年（270年），授散骑常侍，同年去世，时年七十岁。',
			gongsunkang:'公孙康（生卒年不详），辽东襄平（今辽宁辽阳）人。东汉末年辽东地区割据军阀，辽东太守公孙度长子（一作庶子）、车骑将军公孙恭之兄。公孙康在其父死后继任辽东太守。建安十二年（207年），擒斩图谋不轨的袁尚、袁熙兄弟，将其首级献予曹操，被拜为左将军，封襄平侯。建安十四年（209年），公孙康大破高句丽，陷其国都，并讨伐韩濊，设置带方郡。死后因二子年幼，由公孙恭继任。曹丕称帝后，被追赠为大司马。',
			qiaogong:'桥公，亦作“乔公”，名字不详，是中国汉末三国时期的长者，江东二乔的父亲，三国时期庐江郡皖县（今安徽潜山）人，中国长篇古典名著《三国演义》中称之为“乔国老”。',
			liuzhang:'刘璋（生卒年不详），字季玉，江夏竟陵（今湖北省天门市）人。东汉末年宗室、军阀，益州牧刘焉幼子，在父亲刘焉死后继任益州牧。刘璋为人懦弱多疑。汉中张鲁骄纵，不听刘璋号令，于是刘璋杀张鲁母弟，双方成为仇敌，刘璋派庞羲攻击张鲁，战败。后益州内乱，平定后，又有曹操将前来袭击的消息。在内外交逼之下，刘璋听信手下张松、法正之言，迎接刘备入益州，想借刘备之力，抵抗曹操。不料此举乃引狼入室，刘备反手攻击刘璋，又有法正为内应，进至成都。成都吏民都想抵抗刘备，但刘璋为百姓计而开城出降，群下莫不流涕。刘备占据成都后，刘璋以振威将军的身份被迁往荆州居住，关羽失荆州后，刘璋归属东吴，被孙权任命为益州牧，不久后去世，卒年不详。',
			zhangzhongjing:'张仲景（约公元150～154年—约公元215～219年），名机，字仲景，南阳涅阳县（今河南省邓州市穰东镇张寨村）人。东汉末年著名医学家，被后人尊称为“医圣”。张仲景广泛收集医方，写出了传世巨著《伤寒杂病论》。它确立的“辨证论治”原则，是中医临床的基本原则，是中医的灵魂所在。在方剂学方面，《伤寒杂病论》也做出了巨大贡献，创造了很多剂型，记载了大量有效的方剂。其所确立的六经辨证的治疗原则，受到历代医学家的推崇。这是中国第一部从理论到实践、确立辨证论治法则的医学专著，是中国医学史上影响最大的著作之一，是后学者研习中医必备的经典著作，广泛受到医学生和临床大夫的重视。',
			xiangchong:'向宠（？～240年），左将军向朗之侄，蜀汉重要将领。具有谦和公允的性格品行，对军事通晓畅达，被汉昭烈帝刘备称赞。刘备时，历任牙门将（类似于主将帐下的偏将），诸葛亮北伐时，以向宠为中领军，封都亭侯。诸葛亮北行汉中前，特意在《出师表》中向刘禅推荐向宠。延熙三年（公元240年），南征汉嘉（今四川省雅安市）蛮夷时，遇害，尸体被其部下夺回，送回成都安葬。',
			caizhenji:'蔡贞姬，生卒年不详，汉末大儒蔡邕之女。其父蔡邕精于天文数理，妙解音律，是曹操的挚友和老师。生在书香门第的家庭的蔡贞姬，自小耳濡目染，精通书法与音律。后来，其父为避宦竖迫害，便随父亲来泰山依付羊衜一族，在羊衜的元配孔氏死后，便在父亲的做主下与之成亲。夫妻二人婚后生有两子一女：羊承、羊徽瑜、羊祜。在与羊衜成亲之前，羊衜和孔氏生有一子羊发。后来羊发、羊承同时生病，蔡贞姬知道不能两全，就专心照顾羊发，最后羊发痊愈，羊承病死。',
			zhouchu:'周处（236—297年），字子隐，吴郡阳羡（今江苏宜兴）人。西晋大臣、将领，东吴鄱阳太守周鲂之子。少时纵情肆欲，为祸乡里。后来改过自新，拜访名人陆机和陆云，浪子回头，发奋读书，留下“周处除三害”的传说，拜东观左丞，迁无难都督，功业胜过父亲。吴国灭亡后，出仕西晋，拜新平太守，转广汉太守，治境有方。入为散骑常侍，迁御史中丞，刚正不阿。得罪梁孝王司马肜。元康七年，出任建威将军，前往关中，讨伐氐羌齐万年叛乱，遇害于沙场。追赠平西将军，谥号为孝。',
			wangfuzhaolei:'王甫（？—222年），字国山，广汉郪（今四川三台县）人，三国时期蜀汉重臣。刘璋时，为益州书佐，之后归降刘备，先后担任绵竹令、荆州议曹从事，并在夷陵之战中阵亡。其子王祐，官至尚书右选郎。赵累，蜀汉大将关羽部下都督。后来吴将吕蒙袭取荆州，赵累被吴将潘璋等在临沮擒获。',
			wangling:'王凌（172年～251年6月15日），字彦云，太原郡祁县（今山西省祁县）人，三国时期曹魏将领，东汉司徒王允之侄。王凌出身太原王氏祁县房。举孝廉出身，授发干县令，迁中山太守。颇有政绩，迁司空（曹操）掾属。魏文帝曹丕即位，拜散骑常侍、兖州刺史。参加洞口之战，跟从张辽击败吴将吕范，加号建武将军，封宜城亭侯。太和二年（228年），王凌参与石亭之战，跟从曹休征伐东吴，力挽狂澜，历任扬豫二州刺史，治境有方。齐王曹芳继位，拜征东将军，联合孙礼击败吴将全琮，进封南乡侯，授车骑将军、仪同三司，正始九年（248年），代高柔为司空。嘉平元年（249年），代蒋济为太尉。嘉平三年（251年），不满太傅司马懿专擅朝政，联合兖州刺史令狐愚谋立楚王曹彪为帝，事泄自尽，时年八十岁，夷灭三族。',
			zhouqun:'周群（生卒年不详），字仲直，巴西阆中（今四川阆中）人。周群年少时随父周舒学习占验天算之术。后来刘璋聘请周群为师友从事，其预言大多得以应验。刘备割据益州，任命周群为儒林校尉。曾劝说刘备攻汉中必定不利，事后得到应验，被举荐为茂才。',
			dongzhao:'董昭（156年－236年7月4日），字公仁，济阴定陶（今山东省菏泽市定陶区）人。东汉末年曹魏谋士、重臣、开国元勋。董昭年轻时被举为孝廉，后担任袁绍帐下参军。多有战功，但是袁绍听信谗言，董昭不得已离开袁绍投奔张杨。张杨率军迎接汉献帝时，董昭随行，并拜为议郎。后与曹操在洛阳相见，又建议曹操将汉献帝迎接到许昌。董昭自此成为曹操的谋士。建安年间（198年）历任河南尹、冀州牧、徐州牧、魏郡太守等职，多有功劳，深受曹操器重。曹操受封魏公、魏王的谋划都是出自董昭之手。曹丕继魏王位后，董昭任将作大匠。曹丕称帝后，升任大鸿胪。此后先后担任侍中、太常、光禄大夫、太仆等重要职位。魏明帝曹叡即位后转任卫尉。太和六年（232年）升任司徒。青龙四年（236年）卒，时年八十一，谥曰定。',
			wujing:'吴景，本吴郡吴县（今江苏苏州）人，后迁居吴郡钱塘（今浙江杭州），孙坚妻子吴夫人（武烈皇后）之弟，孙策和孙权的舅舅，东汉末年将领。吴景因追随孙坚征伐有功，被任命为骑都尉。袁术上表举荐吴景兼任丹杨太守，讨伐前任太守周昕，占据丹杨。后遭扬州刺史刘繇逼迫，再度依附袁术，袁术任用他为督军中郎将，与孙贲共同进击樊能等人。又在秣陵攻打笮融、薛礼。袁术与刘备争夺徐州时，任吴景为广陵太守。建安二年（197年），吴景放弃广陵东归孙策，孙策任他为丹杨太守。朝廷使者吴景为扬武将军，郡守之职照旧。建安八年（203年），吴景死于任上。',
			nanhualaoxian:'南华老仙，是古典小说《三国演义》中的虚拟人物。其原型来自道教典籍中对庄子的封号，又称“南华仙人”、“南华真人”等。在古典小说《三国演义》通行本的第一回中，描述了南华老仙将《太平要术》赠送给张角的情节。',
			feiyi:'费祎（？～253年2月），字文伟，江夏鄳县（今河南省罗山县）人，三国时期蜀汉名臣，与诸葛亮、蒋琬、董允并称为蜀汉四相。深得诸葛亮器重，屡次出使东吴，孙权、诸葛恪、羊茞等人以辞锋刁难，而费祎据理以答，辞义兼备，始终不为所屈。孙权非常惊异于他的才能，加以礼遇。北伐时为中护军，又转为司马。当时魏延与杨仪不和，经常争论，费祎常为二人谏喻，两相匡护，以尽其用。诸葛亮死后，初为后军师，再为尚书令，官至大将军，封成乡侯。费祎主政时，与姜维北伐的主张相左，执行休养生息的政策，为蜀汉的发展尽心竭力。费祎性格谦恭真诚，颇为廉洁，家无余财。后为魏降将郭循（一作郭脩）行刺身死。葬于今广元市昭化古城城西。',
			luotong:'骆统（193年－228年），字公绪。会稽郡乌伤县（今浙江义乌）人。东汉末年至三国时期吴国将领、学者，陈国相骆俊之子。骆统二十岁时已任乌程国相，任内有政绩，使得国中民户过万。又迁为功曹，行骑都尉。曾劝孙权尊贤纳士，省役息民。后出任为建忠中郎将。将军凌统逝世后，统领其部曲。因战功迁偏将军，封新阳亭侯，任濡须督。黄武七年（228年），骆统去世，年仅三十六岁。有集十卷，今已佚。',
			chenzhen:'陈震（？—公元235年），字孝起。荆州南阳郡（今河南南阳）人。三国时期蜀汉官员。刘备领荆州牧时，辟陈震为从事。后随刘备入蜀，为蜀郡北部都尉、汶山太守、犍为太守。建兴三年（225年），拜尚书，迁尚书令。建兴七年（229年），孙权称帝。蜀汉以陈震为卫尉，前往祝贺，与孙权开坛歃盟，交分天下。还蜀，封城阳亭侯。建兴十三年（235年），卒。',
			nanhualaoxian:'南华老仙，其原型来自道教典籍中对庄子的封号，又称“南华仙人”、“南华真人”等。在古典小说《三国演义》通行本的第一回中，描述了南华老仙将《太平要术》赠送给张角的情节。',
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
		characterTitle:{
			sp_jianggan:'#b对决限定武将',
		},
		card:{
			binglinchengxiax:{
				enable:true,
				type:'trick',
				derivation:'sp_xunchen',
				fullskin:true,
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					if(!player.isIn()||!target.isIn()){
						event.finish();
						return;
					}
					event.showCards=get.cards(4);
					game.cardsGotoOrdering(event.showCards);
					player.showCards(event.showCards);
					'step 1'
					if(player.isIn()&&target.isIn()&&event.showCards.length){
						for(var i of event.showCards){
							if(i.name=='sha'&&player.canUse(i,target,false)){
								player.useCard(i,target,false);
								event.showCards.remove(i);
								event.redo();
								break;
							}
						}
					}
					'step 2'
					if(event.showCards.length){
						while(event.showCards.length) ui.cardPile.insertBefore(event.showCards.pop().fix(),ui.cardPile.firstChild);
						game.updateRoundNumber();
					}
				},
				ai:{
					basic:{
						useful:4,
						value:3,
					},
					order:4,
					result:{
						target:function(player,target,card,isLink){
							if(get.effect(target,{name:'sha'},player,target)==0) return 0;
							return -2.5;
						},
					},
					tag:{
						respond:1,
						respondShan:1,
						damage:1,
					}
				}
			},
			tiaojiyanmei:{
				enable:true,
				type:'trick',
				derivation:'feiyi',
				fullskin:true,
				filterTarget:function(card,player,target){
					var targets=[];
					if(ui.selected.targets.length) targets.addArray(ui.selected.targets);
					var evt=_status.event.getParent('useCard');
					if(evt&&evt.card==card) targets.addArray(evt.targets);
					if(targets.length){
						var hs=target.countCards('h');
						for(var i of targets){
							if(i.countCards('h')!=hs) return true;
						}
						return false;
					}
					return true;
				},
				chongzhu:true,
				selectTarget:2,
				postAi:()=>true,
				contentBefore:function(){
					if(!targets.length) return;
					var map={};
					event.getParent().customArgs.default.tiaojiyanmei_map=map;
					var average=0;
					for(var target of targets){
						var hs=target.countCards('h');
						map[target.playerid]=hs;
						average+=hs;
					}
					map.average=(average/targets.length);
				},
				content:function(){
					var map=event.tiaojiyanmei_map,num1=map.average,num2=map[target.playerid];
					if(typeof num2!='number') num2=target.countCards('h');
					if(num2>num1) target.chooseToDiscard('he',true);
					else if(num2<num1) target.draw();
				},
				contentAfter:function(){
					'step 0'
					if(!player.isIn()||targets.length<2){
						event.finish();
						return;
					}
					var num=targets[0].countCards('h');
					for(var i=1;i<targets.length;i++){
						if(targets[i].countCards('h')!=num){
							event.finish();
							return;
						}
					}
					var cards=[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name=='lose'&&evt.type=='discard'&&evt.getParent(3).card==card) cards.addArray(evt.cards);
					});
					cards=cards.filterInD('d');
					if(cards.length){
						event.tiaojiyanmei_cards=cards;
						player.chooseTarget('是否令一名角色获得'+get.translation(cards)+'？').set('ai',function(target){
							var evt=_status.event.getParent();
							return get.attitude(evt.player,target)*get.value(evt.tiaojiyanmei_cards,target)*(target.hasSkillTag('nogain')?0.1:1);
						});
					}
					else event.finish();
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						target.gain(event.tiaojiyanmei_cards,'gain2');
					}
				},
				ai:{
					order:6.1,
					basic:{
						useful:4,
						value:3,
					},
					result:{
						target:function(player,target,card,isLink){
							var targets=[];
							if(ui.selected.targets.length) targets.addArray(ui.selected.targets);
							var evt=_status.event.getParent('useCard');
							if(evt&&evt.card==card) targets.addArray(evt.targets);
							if(evt&&evt.card==card&&evt.customArgs&&evt.customArgs.tiaojiyanmei_map){
								var map=evt.customArgs.tiaojiyanmei_map,num1=map.average,num2=map[target.playerid];
								if(typeof num2!='number') num2=target.countCards('h');
								if(num2>num1){
									if(target.countCards('e',function(card){
										return get.value(card)<=0;
									})) return 1;
									return -1;
								}
								if(num2<num1) return 1;
								return 0;
							}
							var cards=[card];
							if(card.cards) cards.addArray(card.cards);
							var fh=function(card){
								return !cards.contains(card);
							};
							if(!targets.length){
								if(get.attitude(player,target)<0){
								 if(target.countCards('e',function(card){
										return get.value(card,target)<=0;
									})) return 1;
								 if(game.hasPlayer(function(current){
										return current.countCards('h',fh)==target.countCards('h',fh)-2;
									})) return -2;
									if(game.hasPlayer(function(current){
										return current.countCards('h',fh)<target.countCards('h',fh);
									})) return -1;
								}
								if(target.countCards('e',function(card){
									return get.value(card,target)<=0;
								})&&game.hasPlayer(function(current){
									return current.countCards('h',fh)<target.countCards('h',fh);
								})) return 1;
								return 0;
							}
							var average=0;
							for(var i of targets) average+=i.countCards('h',fh);
							if(!targets.contains(target)){
								var th=target.countCards('h',fh);
								average+=th;
								average/=(targets.length+1);
								if(th==average) return 0;
								if(th<average) return th==average-1?2:1;
								if(th>average){
									if(target.countCards('e',function(card){
										return get.value(card)<=0;
									})) return 1;
									return -0.5;
								}
								return 0;
							}
							average/=targets.length;
							if(th<average) return 1;
							if(th>average){
								if(target.countCards('e',function(card){
									return get.value(card)<=0;
								})) return 1;
								return -1;
							}
							return 0;
						},
					},
				},
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
				//vanish:true,
				derivation:'liuye',
				type:'equip',
				subtype:'equip1',
				distance:{attackFrom:-8},
				skills:['ly_piliche'],
				//destroy:'polu'
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
			sp_jianggan:function(mode){
				return mode!='identity'&&mode!='guozhan';
			},
		},
		skill:{
			//沮授
			xinjianying:{
				audio:'jianying',
				audioname:['xin_jushou'],
				subfrequent:['draw'],
				group:['xinjianying_draw'],
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					if(!player.countCards('he')) return false;
					for(var i of lib.inpile){
						if(i!='du'&&get.type(i,false)=='basic'){
							if(event.filterCard({name:i},player,event)) return true;
							if(i=='sha'){
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:i,nature:j},player,event)) return true;
								}
							}
						}
					}
					return false;
				},
				onChooseToUse:function(event){
					if(event.type=='phase'&&!game.online){
						var last=event.player.getLastUsed();
						if(last&&last.getParent('phaseUse')==event.getParent()){
							var suit=get.suit(last.card,false);
							if(suit!='none') event.set('xinjianying_suit',suit);
						}
					}
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						var suit=event.xinjianying_suit||'',str=get.translation(suit);
						for(var i of lib.inpile){
							if(i!='du'&&get.type(i,false)=='basic'){
								if(event.filterCard({name:i},player,event)) list.push(['基本',str,i]);
								if(i=='sha'){
									for(var j of lib.inpile_nature){
										if(event.filterCard({name:i,nature:j},player,event)) list.push(['基本',str,i,j]);
									}
								}
							}
						}
						return ui.create.dialog('渐营',[list,'vcard']);
					},
					check:function(button){
						if(button.link[2]=='jiu') return 0;
						return _status.event.player.getUseValue({name:button.link[2],nature:button.link[3]});
					},
					backup:function(links,player){
						var next={
							audio:'jianying',
							audioname:['xin_jushou'],
							filterCard:true,
							popname:true,
							position:'he',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
							},
							ai1:function(card){
								return 7-_status.event.player.getUseValue(card,null,true);
							},
							precontent:function(){
								event.getParent().addCount=false;
								var evtx=event.getParent(2);
								if(player.hasHistory('useCard',function(evt){
									return evt.skill=='xinjianying_backup'&&evt.getParent(2)==evtx;
								})){
									alert('检测到您安装了十周年UI等具有出牌特效的扩展。该扩展会导致【渐营】出现无视次数限制发动的bug。为避免无限循环，即将重启游戏。请卸载相关扩展以解决此问题。');
									game.reload();
								}
							},
						};
						if(_status.event.xinjianying_suit) next.viewAs.suit=_status.event.xinjianying_suit;
						return next;
					},
					prompt:function(links){
						return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+(_status.event.xinjianying_suit?('('+get.translation(_status.event.xinjianying_suit)+')'):'')+'使用';
					},
				},
				ai:{
					order:function(item,player){
						if(_status.event.xinjianying_suit) return 16;
						return 3;
					},
					result:{player:1},
				},
				subSkill:{
					draw:{inherit:'jianying'},
				},
			},
			//刘巴
			duanbi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var num1=0,num2=0;
					var count=game.countPlayer(function(current){
						num1+=current.countCards('h');
						num2++;
						return current!=player;
					});
					return count>0&&num1>num2*2;
				},
				filterTarget:true,
				selectTarget:-1,
				multitarget:true,
				multiline:true,
				content:function(){
					'step 0'
					event.num=0;
					event.cards=[];
					event.targets.sortBySeat();
					event.targets.remove(player);
					'step 1'
					var target=targets[num];
					var num=Math.min(3,Math.floor(target.countCards('h')/2));
					if(num>0) target.chooseToDiscard('h',true,num);
					else event._result={bool:false};
					'step 2'
					if(result.bool&&Array.isArray(result.cards)) event.cards.addArray(result.cards);
					event.num++;
					if(event.num<targets.length) event.goto(1);
					'step 3'
					event.cards=cards.filter(function(i){
						return get.position(i,true)=='d';
					});
					if(!event.cards.length) event.finish();
					else player.chooseTarget('是否令一名角色'+(event.cards.length>3?'随机获得三':('获得'+get.cnNumber(event.cards.length)))+'张被弃置的牌？').set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(target.hasSkillTag('nogain')) att/=10;
						if(target.hasJudge('lebu')) att/=4;
						return att*Math.sqrt(Math.max(1,5-target.countCards('h')));
					});
					'step 4'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'fire');
						target.gain(cards.randomGets(3),'gain2');
					}
				},
				ai:{
					order:10,
						result:{
							target:function(player,target){
								if(player==target) return 3;
								return -Math.min(3,Math.floor(target.countCards('h')/2));
							},
						},
				},
			},
			tongduo:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return player!=event.player&&event.targets.length==1&&game.hasPlayer(function(current){
						return current.countCards('he')>0;
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('tongduo'),'令一名角色重铸一张牌',function(card,player,target){
						return target.countCards('he')>0;
					}).set('ai',function(target){
						return get.attitude(_status.event.player,target)*Math.min(3,Math.floor(target.countCards('h')/2));
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('tongduo',target);
					}
					else event.finish();
					'step 2'
					if(target.countCards('he')==0) event.finish();
					else target.chooseCard('he',true,'请重铸一张牌');
					'step 3'
					target.loseToDiscardpile(result.cards);
					target.draw();
				},
			},
			//步练师
			reanxu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.countPlayer()>2&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('he');
					});
				},
				selectTarget:2,
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(!ui.selected.targets.length) return target.countCards('he')>0;
					return target!=ui.selected.targets[0]&&ui.selected.targets[0].countGainableCards(target,'he')>0;
				},
				multitarget:true,
				targetprompt:['被拿牌','得到牌'],
				content:function(){
					'step 0'
					targets[1].gainPlayerCard(targets[0],'he',true);
					'step 1'
					if(targets[0].getHistory('lose',function(evt){
						return evt.getParent(3)==event&&!evt.es.length;
					}).length) player.draw();
					'step 2'
					if(targets[0].isIn()&&targets[1].isIn()&&
						targets[0].countCards('h')!=targets[1].countCards('h')){
						event.target=targets[targets[0].countCards('h')>targets[1].countCards('h')?1:0];
						player.chooseBool('是否令'+get.translation(event.target)+'摸一张牌？').set('ai',function(){
							var evt=_status.event.getParent();
							return get.attitude(evt.player,evt.target)>0;
						})
					}
					else event.finish();
					'step 3'
					if(result.bool) target.draw();
				},
				ai:{
					expose:0.2,
					threaten:2,
					order:9,
					result:{
						player:function(player,target){
							if(ui.selected.targets.length) return 0.01;
							return target.countCards('e')?0:0.5;
						},
						target:function(player,target){
							if(ui.selected.targets.length){
								player=target;
								target=ui.selected.targets[0];
								if(get.attitude(player,target)>1){
									return 0;
								}
								return target.countCards('h')-player.countCards('h')>(target.countCards('e')?2:1)?2:1;
							}
							else{
								if(get.attitude(player,target)<=0) return (target.countCards('he',function(card){
									return card.name=='tengjia'||get.value(card)>0;
								})>0)?-1.5:1.5;
								return (target.countCards('he',function(card){
									return card.name!='tengjia'&&get.value(card)<=0;
								})>0)?1.5:-1.5
							}
						},
					},
				},
			},
			//蒋干
			spdaoshu:{
				audio:2,
				trigger:{global:'phaseUseBegin'},
				round:1,
				filter:function(event,player){
					return event.player.isEnemyOf(player)&&event.player.countCards('h')>0&&event.player.hasUseTarget({name:'jiu',isCard:true},null,true);
				},
				logTarget:'player',
				prompt2:'令其视为使用一张【酒】。其声明一个基本牌的牌名，然后你判断其手牌区内是否有该牌名的牌。若你判断正确，则你随机获得其五张手牌，否则你不能响应其使用的牌直到回合结束。',
				check:function(event,player){
					var target=event.player;
					if(target.countCards('h')<3) return false;
					var att=get.attitude(player,target);
					if(att>0) return false;
					if(att==0) return !player.inRangeOf(target);
					return true;
				},
				content:function(){
					'step 0'
					event.target=trigger.player;
					event.target.chooseUseTarget('jiu',true);
					'step 1'
					if(!target.countCards('h')){
						event.finish();
						return;
					}
					var list=[];
					for(var i of lib.inpile){
						if(get.type(i)=='basic') list.push(i);
					}
					if(!list.length){
						event.finish();
						return;
					}
					target.chooseControl(list).set('prompt','请声明一种基本牌').set('ai',()=>_status.event.rand).set('rand',get.rand(0,list.length-1));
					'step 2'
					event.cardname=result.control;
					target.chat('我声明'+get.translation(event.cardname));
					game.log(target,'声明的牌名为','#y'+get.translation(event.cardname));
					game.delayx();
					player.chooseControl('有！','没有！').set('prompt','你觉得'+get.translation(target)+'的手牌区里有'+get.translation(event.cardname)+'吗？').set('ai',function(){
						return _status.event.choice;
					}).set('choice',function(){
						var rand={
							sha:0.273,
							shan:0.149,
							tao:0.074,
							jiu:0.031,
						}[event.cardname]||0.1;
						return (1-Math.pow(1-rand,target.countCards('h')))>0.5?'有！':'没有！';
					}());
					'step 3'
					player.chat(result.control);
					game.log(player,'认为','#y'+result.control);
					game.delayx();
					'step 4'
					var bool1=(result.index==0);
					var bool2=(target.hasCard(function(card){
						return get.name(card,target)==event.cardname;
					},'h'));
					if(bool1==bool2){
						player.popup('判断正确','wood');
						var cards=target.getCards('h',function(card){
							return lib.filter.canBeGained(card,player,target);
						}).randomGets(5);
						if(cards.length>0) player.gain(cards,target,'giveAuto','bySelf');
					}
					else{
						player.popup('判断错误','fire');
						player.addTempSkill('spdaoshu_respond');
					}
				},
				subSkill:{
					respond:{
						trigger:{global:'useCard1'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.player==_status.currentPhase;
						},
						content:function(){
							trigger.directHit.add(player);
						},
					},
				},
			},
			spdaizui:{
				audio:2,
				trigger:{player:'damageBegin2'},
				limited:true,
				logTarget:'source',
				filter:function(event,player){
					return event.num>=player.hp&&event.source&&event.source.isIn()&&event.cards&&event.cards.filterInD().length>0;
				},
				prompt2:function(event){
					return '防止即将受到的'+get.cnNumber(event.num)+'点伤害，并令'+get.translation(event.source)+'将'+get.translation(event.cards.filterInD())+'置于武将牌上且回合结束时收回';
				},
				skillAnimation:true,
				animationColor:'thunder',
				content:function(){
					player.awakenSkill('spdaizui');
					trigger.source.addSkill('spdaizui2');
					trigger.source.addToExpansion(trigger.cards.filterInD(),'gain2').gaintag.add('spdaizui2');
					trigger.cancel();
				},
			},
			spdaizui2:{
				trigger:{global:'phaseEnd'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return player.getExpansions('spdaizui2').length>0;
				},
				content:function(){
					'step 0'
					var cards=player.getExpansions('spdaizui2');
					player.gain(cards,'gain2');
					'step 1'
					player.removeSkill('spdaizui2');
				},
				marktext:'释',
				intro:{
					markcount:'expansion',
					content:'expansion',
				},
			},
			//裴秀
			xingtu:{
				trigger:{player:'useCard'},
				filter:function(event,player){
					var num1=get.number(event.card),num2=player.storage.xingtu;
					return typeof num1=='number'&&typeof num2=='number'&&num2%num1==0;
				},
				forced:true,
				content:function(){
					player.draw();
				},
				mod:{
					cardUsable:function(card,player){
						var num1=get.number(card),num2=player.storage.xingtu;
						if(typeof num1=='number'&&typeof num2=='number'&&num1%num2==0) return Infinity;
					},
					aiOrder:function(player,card,num){
						var num1=get.number(card),num2=player.storage.xingtu;
						if(typeof num1=='number'&&typeof num2=='number'&&num2%num1==0) return num+5;
					},
				},
				group:'xingtu_record',
				intro:{
					content:'当前记录：X=#',
				},
				subSkill:{
					record:{
						trigger:{player:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return typeof get.number(event.card)=='number';
						},
						content:function(){
							player.storage.xingtu=get.number(trigger.card);
							player.markSkill('xingtu');
						},
					},
				},
			},
			juezhi:{
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('he')>1;
				},
				filterCard:true,
				position:'he',
				selectCard:[2,Infinity],
				check:function(card){
					if(ui.selected.cards.length>1) return 0;
					return 4-get.value(card);
				},
				content:function(){
					var num=0;
					for(var i of cards) num+=get.number(i,player);
					num=Math.min(num,13);
					var card=get.cardPile2(function(card){
						return get.number(card,false)==num;
					});
					if(card) player.gain(card,'gain2');
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			reganlu:{
				enable:'phaseUse',
				usable:1,
				audio:2,
				selectTarget:2,
				delay:0,
				filterTarget:function(card,player,target){
					if(target.isMin()) return false;
					if(ui.selected.targets.length==0) return true;
					if(ui.selected.targets[0].countCards('e')==0&&target.countCards('e')==0) return false;
					return target==player||ui.selected.targets[0]==player||Math.abs(ui.selected.targets[0].countCards('e')-target.countCards('e'))<=player.maxHp-player.hp;
				},
				multitarget:true,
				multiline:true,
				content:function(){
					targets[0].swapEquip(targets[1]);
				},
				ai:{
					order:10,
					threaten:function(player,target){
						return 0.8*Math.max(1+target.maxHp-target.hp);
					},
					result:{
						target:function(player,target){
							var list1=[];
							var list2=[];
							var num=player.maxHp-player.hp;
							var players=game.filterPlayer();
							for(var i=0;i<players.length;i++){
								if(get.attitude(player,players[i])>0) list1.push(players[i]);
								else if(get.attitude(player,players[i])<0) list2.push(players[i]);
							}
							list1.sort(function(a,b){
								return a.countCards('e')-b.countCards('e');
							});
							list2.sort(function(a,b){
								return b.countCards('e')-a.countCards('e');
							});
							var delta;
							for(var i=0;i<list1.length;i++){
								for(var j=0;j<list2.length;j++){
									delta=list2[j].countCards('e')-list1[i].countCards('e');
									if(delta<=0) continue;
									if(delta<=num||list1[i]==player||list2[j]==player){
										if(target==list1[i]||target==list2[j]){
											return get.attitude(player,target);
										}
										return 0;
									}
								}
							}
							return 0;
						}
					},
				}
			},
			//孙休
			mobilexingxue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				content:function(){
					'step 0'
					var num=player.hp;
					if(!player.hasSkill('mobileyanzhu')){
						num=player.maxHp;
					}
					player.chooseTarget([1,num],get.prompt2('mobilexingxue')).set('ai',function(target){
						var att=get.attitude(_status.event.player,target);
						if(target.countCards('he')) return att;
						return att/10;
					});
					'step 1'
					if(result.bool){
						player.logSkill('mobilexingxue',result.targets);
						event.targets=result.targets;
						event.targets2=event.targets.slice(0);
						event.targets.sort(lib.sort.seat);
					}
					else{
						event.finish();
					}
					'step 2'
					if(event.targets.length){
						var target=event.targets.shift();
						target.draw();
						event.current=target;
					}
					else{
						event.finish();
					}
					'step 3'
					if(event.current&&event.current.countCards('he')){
						if(player.hasSkill('mobileyanzhu')||event.targets2.length==1) event.current.chooseCard('选择一张牌置于牌堆顶','he',true);
						else event.current.chooseCardTarget({
							prompt:'选择一张牌置于牌堆顶，或交给其他目标角色',
							filterCard:true,
							filterTarget:function(card,player,target){
								return target!=player&&_status.event.getParent().targets2.contains(target);
							},
							forced:true,
							selectTarget:[0,1],
							ai1:(card)=>6-get.value(card),
							ai2:(target)=>get.attitude(_status.event.player,target),
						});
					}
					else{
						event.goto(2);
					}
					'step 4'
					if(result&&result.cards){
						event.card=result.cards[0];
						if(!result.targets||!result.targets.length){
							event.current.lose(result.cards,ui.cardPile,'insert');
							game.broadcastAll(function(player){
								var cardx=ui.create.card();
								cardx.classList.add('infohidden');
								cardx.classList.add('infoflip');
								player.$throw(cardx,1000,'nobroadcast');
							},event.current);
						}
						else{
							result.targets[0].gain(result.cards,event.current,'giveAuto');
						}
					}
					else{
						event.card=null;
					}
					'step 5'
					event.goto(2);
				}
			},
			mobileyanzhu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target.countCards('he')>0&&target!=player;
				},
				content:function(){
					'step 0'
					if(target.countCards('e')){
						target.chooseBool('是否将装备区内的所有牌交给'+get.translation(player)+'？','若选择“取消”，则其将获得你的一张牌').set('ai',function(){
							if(_status.event.player.countCards('e')>=3) return false;
							return true;
						});
					}
					else{
						player.gainPlayerCard(target,true,'he');
						event.finish();
					}
					'step 1'
					if(result.bool){
						var es=target.getCards('e');
						player.gain(es,target,'give');
						player.removeSkill('mobileyanzhu');
					}
					else{
						player.gainPlayerCard(target,true,'he');
					}
				},
				ai:{
					order:6,
					result:{
						target:function(player,target){
							var ne=target.countCards('e');
							if(!ne) return -2;
							if(ne>=2) return -ne;
							return 0;
						}
					}
				}
			},
			//毛玠
			bingqing:{
				audio:2,
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					var suit=get.suit(event.card);
					if(!lib.suit.contains(suit)) return false;
					var evt=event.getParent('phaseUse');
					if(!evt||player!=evt.player) return false;
					var list=[],history=player.getHistory('useCard');
					if(history.length<2) return false;
					for(var i of history){
						if(i.getParent('phaseUse')!=evt) continue;
						var suit2=get.suit(i.card);
						if(!lib.suit.contains(suit2)) continue;
						if(i!=event&&suit2==suit) return false;
						list.add(suit2);
					}
					return list.length>1&&list.length<5;
				},
				content:function(){
					'step 0'
					var suit=get.suit(trigger.card);
					var evt=event.getParent('phaseUse');
					var list=[],history=player.getHistory('useCard');
					for(var i of history){
						if(i.getParent('phaseUse')!=evt) continue;
						var suit2=get.suit(i.card);
						if(!lib.suit.contains(suit2)) continue;
						list.add(suit2);
					}
					var prompt,filterTarget,ai;
					switch(list.length){
						case 2:
							prompt='令一名角色摸两张牌';
							filterTarget=function(card,player,target){
								return true;
							};
							ai=function(target){
								var player=_status.event.player;
								var att=get.attitude(player,target);
								if(target.hasSkill('nogain')) att/=10;
								return att/Math.sqrt(Math.min(5,1+target.countCards('h')));
							}
							break;
						case 3:
							prompt='弃置一名角色区域内的一张牌';
							filterTarget=function(card,player,target){
								return target.hasCard(function(card){
									return lib.filter.canBeDiscarded(card,player,target);
								},'hej');
							};
							ai=function(target){
								var player=_status.event.player;
								return get.effect(target,{name:'guohe_copy'},player,player);
							}
							break;
						case 4:
							prompt='对一名其他角色造成1点伤害';
							filterTarget=function(card,player,target){
								return target!=player;
							};
							ai=function(target){
								var player=_status.event.player;
								return get.damageEffect(target,player,player);
							}
							break;
						default:
							event.finish();
							return;
					}
					event.num=list.length;
					player.chooseTarget(get.prompt('bingqing'),prompt,filterTarget).set('ai',ai);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('bingqing',target);
						event.target=target;
						event.goto(num);
					}
					else event.finish();
					'step 2'
					target.draw(2);
					event.finish();
					'step 3'
					player.discardPlayerCard(target,true,'hej');
					event.finish();
					'step 4'
					target.damage();
				},
			},
			yingfeng:{
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('yingfeng'),'令一名角色获得“奉”标记',function(card,player,target){
						return !target.hasSkill('yingfeng_mark');
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(att<=0) return 0;
						var eff=0.1;
						var preTarget=game.findPlayer(function(current){
							return (current!=target&&current.hasSkill('yingfeng_mark'));
						});
						if(preTarget){
							if(get.attitude(player,preTarget)<0) eff+=4;
							else if(preTarget.hasValueTarget({name:'sha'},false)&&!preTarget.hasValueTarget({name:'sha'})) eff-=3;
						}
						if(target.hasValueTarget({name:'sha'},false)&&!target.hasValueTarget({name:'sha'})) eff+=3;
						if(player==target) att*=1.2;
						return 0.01+att*eff;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('yingfeng',target);
						target.addAdditionalSkill('yingfeng_'+player.playerid,'yingfeng_mark');
						game.countPlayer(function(current){
							if(current!=target&&current.hasSkill('yingfeng_mark')){
								current.removeSkill('yingfeng_mark');
								current.removeAdditionalSkill('yingfeng_'+player.playerid);
							}
						});
					}
				},
				subSkill:{
					mark:{
						charlotte:true,
						mark:true,
						marktext:'奉',
						mod:{
							targetInRange:()=>true,
						},
						intro:{content:'使用牌无距离限制'},
					},
				},
			},
			//朱儁
			yangjie:{
				audio:2,
				group:['yangjie_add'],
				enable:'phaseUse',
				prompt:'摸一张牌并与一名其他角色进行拼点',
				usable:1,
				filter:function(event,player){
					return !player.hasSkillTag('noCompareSource');
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0&&
					!target.hasSkillTag('noCompareTarget');
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.canCompare(target)) player.chooseToCompare(target).set('preserve','lose');
					else event.finish();
					'step 2'
					if(!result.bool){
						var cards=[result.player,result.target].filterInD('d');
						if(!cards.length||!game.hasPlayer((current)=>current!=player&&current!=target)) event.finish();
						else{
							event.cards=cards;
							player.chooseTarget('请选择一名角色','令其获得'+get.translation(cards)+'，且视为对'+get.translation(target)+'使用一张火【杀】',function(card,player,target){
								return target!=player&&target!=_status.event.getParent().target;
							}).set('ai',function(target){
								var player=_status.event.player,cards=_status.event.getParent().cards,target2=_status.event.getParent().target;
								var val=get.value(cards,target)*get.attitude(player,target);
								if(val<=0) return 0;
								return val+target.canUse({name:'sha',nature:'fire',isCard:true},target2,false)?get.effect(target2,{name:'sha',nature:'fire',isCard:true},target,player):0;
							});
						}
					}
					else event.finish();
					'step 3'
					if(result.bool){
						var source=result.targets[0];
						event.source=source;
						player.line(source);
						source.gain(cards,'gain2');
					}
					else event.finish();
					'step 4'
					var card={name:'sha',nature:'fire',isCard:true};
					if(target.isIn()&&source.isIn()&&source.canUse(card,target,false)) source.useCard(card,target,false);
				},
				subSkill:{
					add:{
						trigger:{player:'compare'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.getParent().name=='yangjie'&&event.num1>1&&player.isDamaged();
						},
						content:function(){
							var num=player.getDamagedHp();
							game.log(player,'的拼点牌点数-',num);
							trigger.num1=Math.max(1,trigger.num1-num);
						}
					},
				},
				ai:{
					order:3,
					result:{target:-1.5},
				},
			},
			zjjuxiang:{
				audio:2,
				trigger:{global:'dyingAfter'},
				logTarget:'player',
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return event.player!=player&&event.player.isAlive();
				},
				check:function(event,player){
					return get.damageEffect(event.player,player,player)>0;
				},
				content:function(){
					'step 0'
					player.awakenSkill('zjjuxiang');
					trigger.player.damage();
					'step 1'
					if(trigger.player.maxHp>0) player.draw(trigger.player.maxHp);
				},
				ai:{expose:10},
			},
			houfeng:{
				audio:2,
				trigger:{global:'phaseUseBegin'},
				logTarget:'player',
				round:1,
				filter:(event,player)=>player.inRange(event.player),
				check:function(event,player){
					var att=get.attitude(player,event.player);
					return att>0;
				},
				content:function(){
					'step 0'
					player.chooseButton(['选择'+get.translation(trigger.player)+'要进行的整肃类型',[['zhengsu_leijin','zhengsu_bianzhen','zhengsu_mingzhi'],'vcard']],true).set('ai',()=>Math.random());
					'step 1'
					if(result.bool){
						var name=result.links[0][2],target=trigger.player;
						target.addTempSkill('zhengsu',{player:['phaseDiscardAfter','phaseAfter']});
						target.addTempSkill(name,{player:['phaseDiscardAfter','phaseAfter']});
						target.popup(name,'thunder');
						player.addTempSkill('houfeng_share');
						game.delayx();
					}
				},
				subSkill:{
					share:{
						trigger:{global:['drawAfter','recoverAfter']},
						forced:true,
						popup:false,
						charlotte:true,
						filter:function(event,player){
							return event.getParent(2).name=='zhengsu';
						},
						content:function(){
							player.chooseDrawRecover(2,true);
						},
					},
				},
			},
			//手杀皇甫嵩
			spzhengjun:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('zhengsu');
				},
				content:function(){
					'step 0'
					player.chooseButton([get.prompt('spyanji'),[['zhengsu_leijin','zhengsu_bianzhen','zhengsu_mingzhi'],'vcard']]).set('ai',()=>Math.random());
					'step 1'
					if(result.bool){
						player.logSkill('spzhengjun',player);
						var name=result.links[0][2];
						player.addTempSkill('zhengsu',{player:['phaseDiscardAfter','phaseAfter']});
						player.addTempSkill(name,{player:['phaseDiscardAfter','phaseAfter']});
						player.popup(name,'thunder');
						game.delayx();
					}
				},
				group:'spzhengjun_share',
				subSkill:{
					share:{
						trigger:{player:['drawAfter','recoverAfter']},
						direct:true,
						filter:function(event,player){
							return event.getParent(2).name=='zhengsu';
						},
						content:function(){
							'step 0'
							player.chooseTarget('整军：是否令一名其他角色也回复1点体力或摸两张牌？',lib.filter.notMe).set('ai',function(target){
								var player=_status.event.player;
								return Math.max(get.effect(target,{name:'wuzhong'},target,player),get.recoverEffect(target,target,player));
							});
							'step 1'
							if(result.bool){
								var target=result.targets[0];
								player.logSkill('spzhengjun',target);
								target.chooseDrawRecover(2,true);
							}
						},
					},
				},
			},
			spshiji:{
				audio:2,
				trigger:{source:'damageBegin2'},
				logTarget:'player',
				filter:function(event,player){
					return player!=event.player&&lib.linked.contains(event.nature)&&event.player.countCards('h')>0&&!player.isMaxHandcard(true);
				},
				check:function(event,player){
					return get.attitude(player,event.player)<=0;
				},
				content:function(){
					var target=trigger.player;
					player.viewHandcards(target);
					var hs=target.getCards('h',{color:'red'});
					if(hs.length){
						target.discard(hs);
						player.draw(hs.length);
					}
				},
			},
			sptaoluan:{
				audio:2,
				trigger:{global:'judgeEnd'},
				usable:1,
				filter:function(event,player){
					return event.result&&event.result.suit=='spade';
				},
				check:function(event,player){
					return event.result.judge*get.attitude(player,event.player)<=0;
				},
				content:function(){
					'step 0'
					var evt=trigger.getParent();
					if(evt.name=='phaseJudge') evt.excluded=true;
					else{
						evt.finish();
						evt._triggered=null;
					}
					var list=[];
					if(get.position(trigger.result.card)=='d') list.push(0);
					if(trigger.player.isIn()&&player.canUse({name:'sha',nature:'fire',isCard:true},trigger.player,false)) list.push(1);
					if(list.length==2) player.chooseControl().set('choiceList',[
						'获得'+get.translation(trigger.result.card),
						'视为对'+get.translation(trigger.player)+'使用一张火【杀】',
					]).set('choice',(get.effect(trigger.player,{name:'sha'},player,player)>0)?1:0);
					else if(list.length==1) event._result={index:list[0]};
					else event.finish();
					'step 1'
					if(result.index==0) player.gain(trigger.result.card,'gain2');
					else player.useCard({name:'sha',nature:'fire',isCard:true},trigger.player,false)
				},
			},
			//猩黄忠
			spshidi:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseJieshuBegin']},
				forced:true,
				zhuanhuanji:'number',
				filter:function(event,player){
					return (player.countMark('spshidi')%2)==['phaseJieshu','phaseZhunbei'].indexOf(event.name);
				},
				content:function(){
					player.changeZhuanhuanji('spshidi');
				},
				mod:{
					globalFrom:function(from,to,distance){
						if(from.countMark('spshidi')%2==0) return distance-1;
					},
					globalTo:function(from,to,distance){
						if(to.countMark('spshidi')%2==1) return distance+1;
					},
				},
				mark:true,
				marktext:'☯',
				intro:{
					content:function(storage,player){
						return '已转换过'+(storage||0)+'次';
					},
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||!arg.target||(arg.card.name!='sha')) return false;
						return player.countMark('spshidi')%2==0&&get.color(arg.card)=='black';
					},
				},
				group:['spshidi_use','spshidi_beused'],
				subSkill:{
					use:{
						trigger:{player:'useCard'},
						forced:true,
						filter:function(event,player){
							return event.card.name=='sha'&&player.countMark('spshidi')%2==0&&get.color(event.card,false)=='black';
						},
						content:function(){
							trigger.directHit.addArray(game.players);
						},
					},
					beused:{
						trigger:{target:'useCardToTargeted'},
						forced:true,
						filter:function(event,player){
							return event.card.name=='sha'&&player.countMark('spshidi')%2==1&&get.color(event.card,false)=='red';
						},
						content:function(){
							trigger.directHit.add(player);
						},
					},
				},
			},
			spyishi:{
				audio:2,
				trigger:{source:'damageBegin2'},
				filter:function(event,player){
					return player!=event.player&&event.player.countCards('e')>0;
				},
				check:function(event,player){
					return get.damageEffect(event.player,player,player)<0||(!event.player.hasSkillTag('noe')&&event.player.hasCard(function(card){
						return get.value(card)>6;
					},'e'))
				},
				logTarget:'player',
				content:function(){
					trigger.num--;
					player.gainPlayerCard(trigger.player,'e',true);
				},
			},
			spqishe:{
				enable:'chooseToUse',
				viewAs:{name:'jiu'},
				filterCard:{type:'equip'},
				position:'hes',
				viewAsFilter:function(player){
					return player.hasCard({type:'equip'},'ehs');
				},
				check:(card)=>5-get.value(card),
				locked:false,
				mod:{
					maxHandcard:function(player,num){
						return num+player.countCards('e');
					},
				},
			},
			//吕范
			spdiaodu:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('spdiaodu'),'令一名角色摸一张牌，然后移动其装备区内的一张牌').set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(att>0){
							if(target.hasCard(function(card){
								if(get.value(card,target)<=0&&game.hasPlayer(function(current){
									return current!=target&&current.isEmpty(get.subtype(card,false))&&get.effect(current,card,player,player)>0;
								})) return true;
								return false;
							},'e')) return 2*att;
							if(!target.hasCard(function(card){
								var sub=get.subtype(card,false);
								return game.hasPlayer(function(current){
									return current!=target&&current.isEmpty(sub);
								})
							},'e')) return 1;
						}
						else if(att<0){
							if(target.hasCard(function(card){
								if(get.value(card,target)>=4.5&&game.hasPlayer(function(current){
									return current!=target&&current.isEmpty(get.subtype(card,false))&&get.effect(current,card,player,player)>0;
								})) return true;
								return false;
							},'e')) return -att;
						}
						return 0;
					})
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('spdiaodu',target);
						target.draw();
					}
					else event.finish();
					'step 2'
					var es=target.getCards('e',function(card){
						var sub=get.subtype(card,false);
						return game.hasPlayer(function(current){
							return current!=target&&current.isEmpty(sub);
						})
					});
					if(es.length){
						if(es.length==1) event._result={bool:true,links:es};
						else player.chooseButton(['移动'+get.translation(target)+'的一张装备牌',es],true).set('ai',function(button){
							var player=_status.event.player,target=_status.event.getParent().target,card=button.link;
							if(game.hasPlayer(function(current){
								return current!=target&&current.isEmpty(get.subtype(card,false))&&get.effect(current,card,player,player)>0;
							})) return -get.value(card,target)*get.attitude(player,target);
							return 0;
						});
					}
					else event.finish();
					'step 3'
					if(result.bool){
						event.card=result.links[0];
						player.chooseTarget(true,'选择'+get.translation(event.card)+'的移动目标',function(card,player,target){
							return target.isEmpty(_status.event.subtype);
						}).set('subtype',get.subtype(event.card)).set('ai',function(target){
							var evt=_status.event;
							return get.effect(target,evt.getParent().card,evt.player,evt.player);
						});
					}
					else event.finish();
					'step 4'
					if(result.bool){
						var target2=result.targets[0];
						target.line(target2);
						target.$give(card,target2);
						game.delay(0.5);
						target2.equip(card);
					}
				},
			},
			spdiancai:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&player.hasHistory('lose',function(evt){
						return evt.hs&&evt.hs.length>0;
					});
				},
				content:function(){
					'step 0'
					var num=0;
					player.getHistory('lose',function(evt){
						if(evt.hs) num+=evt.hs.length;
					});
					num=Math.min(num,game.countPlayer());
					player.chooseTarget(get.prompt('spdiancai'),[1,num],'令至多'+get.cnNumber(num)+'名角色各摸一张牌').set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var targets=result.targets.sortBySeat(trigger.player);
						player.logSkill('spdiancai',targets);
						if(targets.length==1){
							targets[0].draw();
							event.finish();
						}
						else game.asyncDraw(targets);
					}
					else event.finish();
					'step 2'
					game.delayx();
				},
			},
			spyanji:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('zhengsu');
				},
				content:function(){
					'step 0'
					player.chooseButton([get.prompt('spyanji'),[['zhengsu_leijin','zhengsu_bianzhen','zhengsu_mingzhi'],'vcard']]);
					'step 1'
					if(result.bool){
						player.logSkill('spyanji',player);
						var name=result.links[0][2];
						player.addTempSkill('zhengsu',{player:'phaseDiscardAfter'});
						player.addTempSkill(name,{player:'phaseDiscardAfter'});
						player.popup(name,'thunder');
						game.delayx();
					}
				},
			},
			//虞翻
			rezongxuan:{
				inherit:'zongxuan',
				group:'rezongxuan_place',
			},
			rezongxuan_place:{
				audio:'rezongxuan',
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					player.chooseCard('he',true,'将一张牌置于牌堆顶');
					'step 2'
					if(result&&result.cards){
						event.card=result.cards[0];
						player.lose(result.cards,ui.cardPile,'insert');
						game.log(player,'将',(get.position(event.card)=='h'?'一张牌':event.card),'置于牌堆顶');
						game.broadcastAll(function(player){
							var cardx=ui.create.card();
							cardx.classList.add('infohidden');
							cardx.classList.add('infoflip');
							player.$throw(cardx,1000,'nobroadcast');
						},player);
					}
					else event.finish();
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			//孙寒华
			chongxu:{
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.chooseToPlayBeatmap(lib.skill.chongxu.beatmaps.randomGet());
					'step 1'
					var score=Math.floor(Math.min(5,result.accuracy/17));
					event.score=score;
					game.log(player,'的演奏评级为','#y'+result.rank[0],'，获得积分点数','#y'+score,'分');
					if(score<3){
						if(score>=2) player.draw();
						event.finish();
						return;
					}
					var list=[];
					if(player.countMark('miaojian')<2&&player.hasSkill('miaojian')) list.push('修改【妙剑】');
					if(player.countMark('shhlianhua')<2&&player.hasSkill('shhlianhua')) list.push('修改【莲华】');
					if(list.length){
						list.push('全部摸牌');
						player.chooseControl(list).set('prompt','冲虚：修改技能'+(score==5?'并摸一张牌':'')+'；或摸'+Math.floor(score/2)+'张牌');
					}
					else event._result={control:'全部摸牌'};
					'step 2'
					var score=event.score;
					if(result.control!='全部摸牌'){
						score-=3;
						var skill=result.control=='修改【妙剑】'?'miaojian':'shhlianhua';
						player.addMark(skill,1,false);
						game.log(player,'修改了技能','#g【'+get.translation(skill)+'】');
					}
					if(score>1) player.draw(Math.floor(score/2));
				},
				ai:{
					order:10,
					result:{
						player:1,
					},
				},
				beatmaps:[
					{
						//歌曲名称
						name:'鳥の詩',
						//歌曲文件名（默认在audio/effect文件夹下 若要重定向到扩展 请写为'ext:扩展名称'的格式 并将文件名重命名为和上面的歌曲名称相同）
						filename:'tori_no_uta',
						//每个音符的开始时间点（毫秒，相对未偏移的开始播放时间）
						timeleap:[1047,3012,4978,5469,5961,6452,6698,7435,8909,10875,12840],
						//开始播放时间的偏移量（毫秒）
						current:-110,
						//判定栏高度（相对整个对话框高度比例）
						judgebar_height:0.16,
						//Good/Great/Prefect的位置判定范围（百分比，相对于整个对话框。以滑条的底部作为判定基准）
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						//滑条每相对于整个对话框下落1%所需的时间（毫秒）
						speed:25,
					},
					{
						name:'竹取飛翔　～ Lunatic Princess',
						filename:'taketori_hishou',
						timeleap:[1021,1490,1959,2896,3834,4537,4771,5709,6646,7585,8039,8494,9403,10291,11180,11832,12049,12920,13345,13771,14196],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(250, 170, 190, 1), rgba(240, 160, 180, 1))',
						judgebar_color:'linear-gradient(rgba(240, 120, 243, 1), rgba(245, 106, 230, 1))',
					},
					{
						name:'ignotus',
						filename:'ignotus',
						timeleap:[0,1412,2824,4235,5647,5824,7059,8294,8471,9882,10941,11294,12000,12706,13412,14118,14824,15529,15882,16059,16235,16412,16588],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(240, 250, 240, 1), rgba(230, 240, 230, 1))',
						judgebar_color:'linear-gradient(rgba(161, 59, 150, 1), rgba(58, 43, 74, 1))',
					},
					{
						name:'Super Mario 3D World Theme',
						filename:'sm3dw_overworld',
						timeleap:[0,1071,1518,2054,4018,4286,5357,6429,7500,8571,9643,10714,11786,12321,12589,12857,13929,15000,16071,17143,18214,18482,18750,19018,19286,20357],
						current:-110,
						judgebar_height:0.16,
						range1:[84,110],
						range2:[90,104],
						range3:[94,100],
						speed:25,
						node_color:'linear-gradient(rgba(120, 130, 240, 1), rgba(100, 100, 230, 1))',
						judgebar_color:'linear-gradient(rgba(230, 40, 30, 1), rgba(220, 30, 10, 1))',
					},
				],
				derivation:'chongxu_faq',
			},
			miaojian:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var level=player.countMark('miaojian');
					if(event.filterCard({name:'sha',nature:'stab'},player,event)){
						if(level==2) return true;
						if(level==1&&player.hasCard(function(card){
							return get.type2(card)=='basic';
						},'hs')) return true;
						if(level==0&&player.hasCard(function(card){
							return get.name(card)=='sha';
						},'hs')) return true;
					}
					if(event.filterCard({name:'wuzhong'},player,event)){
						if(level==2) return true;
						if(level==1&&player.hasCard(function(card){
							return get.type2(card)!='basic';
						},'hes')) return true;
						if(level==0&&player.hasCard(function(card){
							return get.type2(card)=='trick';
						},'hs')) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(){
						return ui.create.dialog('妙剑',[[
							['基本','','sha','stab'],
							['锦囊','','wuzhong'],
						],'vcard']);
					},
					filter:function(button,player){
						var event=_status.event.getParent(),level=player.countMark('miaojian');
						if(button.link[2]=='sha'){
							if(!event.filterCard({name:'sha',nature:'stab'},player,event)) return false;
							if(level==2) return true;
							if(level==1) return player.hasCard(function(card){
								return get.type2(card)=='basic';
							},'hs');
							return level==0&&player.hasCard(function(card){
								return get.name(card)=='sha';
							},'hs');
						}
						if(button.link[2]=='wuzhong'){
							if(!event.filterCard({name:'wuzhong'},player,event)) return false;
							if(level==2) return true;
							if(level==1) return player.hasCard(function(card){
								return get.type2(card)!='basic';
							},'hes');
							return level==0&&player.hasCard(function(card){
								return get.type2(card)=='trick';
							},'hs');
						}
					},
					check:function(button){
						var card={name:button.link[2],nature:button.link[3]},player=_status.event.player;
						return get.value(card,player)*get.sgn(player.getUseValue(card));
					},
					backup:function(links,player){
						var index=(links[0][2]=='sha'?0:1),level=player.countMark('miaojian');
						var next={
							audio:'miaojian',
							filterCard:[[
								function(card){
									return get.name(card)=='sha';
								},
								function(card){
									return get.type(card)=='basic';
								},
								()=>false,
							],[
								function(card){
									return get.type2(card)=='trick';
								},
								function(card){
									return get.type(card)!='basic';
								},
								()=>false,
							]][index][level],
							position:'hes',
							check:function(card){
								if(card) return 6.5-get.value(card);
								return 1;
							},
							viewAs:[{
								name:'sha',
								nature:'stab',
							},{
								name:'wuzhong',
							}][index],
						}
						if(level==2){
							next.selectCard=-1;
							next.viewAs.isCard=true;
						}
						return next;
					},
					prompt:function(links,player){
						var index=(links[0][2]=='sha'?0:1),level=player.countMark('miaojian');
						return [[
							'将一张【杀】当做刺【杀】使用',
							'将一张基本牌当做刺【杀】使用',
							'请选择刺【杀】的目标',
						],[
							'将一张锦囊牌当做【无中生有】使用',
							'将一张非基本牌当做【无中生有】使用',
							'请选择【无中生有】的目标',
						]][index][level];
					},
				},
				onremove:true,
				derivation:['miaojian1','miaojian2'],
				subSkill:{backup:{audio:'miaojian'}},
				ai:{
					order:7,
					result:{player:1},
				},
			},
			shhlianhua:{
				audio:2,
				derivation:['shhlianhua1','shhlianhua2'],
				trigger:{target:'useCardToTargeted'},
				forced:true,
				locked:false,
				filter:(event)=>event.card.name=='sha',
				content:function(){
					'step 0'
					player.draw();
					var level=player.countMark('shhlianhua');
					if(!level) event.finish();
					else if(level==2) event.goto(2);
					else player.judge(function(result){
						return get.suit(result)=='spade'?1:-1;
					}).set('judge2',(result)=>result.bool);
					'step 1'
					if(result.bool) trigger.excluded.add(player);
					event.finish();
					'step 2'
					var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
					trigger.player.chooseToDiscard('he','弃置一张牌，或令'+get.translation(trigger.card)+'对'+get.translation(player)+'无效').set('ai',function(card){
						if(_status.event.eff>0){
							return 10-get.value(card);
						}
						return 0;
					}).set('eff',eff);
					'step 3'
					if(result.bool==false){
						trigger.getParent().excluded.add(player);
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&current<0) return 0.7;
						}
					},
				},
			},
			//蒋钦
			spjianyi:{
				audio:2,
				trigger:{global:'phaseEnd'},
				forced:true,
				filter:function(event,player){
					return player!=event.player&&game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='lose'||evt.type!='discard') return false;
						for(var i of evt.cards){
							if(get.subtype(i,false)=='equip2'&&get.position(i,true)=='d') return true;
						}
						return false;
					}).length>0;
				},
				content:function(){
					'step 0'
					var cards=[];
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='lose'||evt.type!='discard') return false;
						for(var i of evt.cards){
							if(get.subtype(i,false)=='equip2'&&get.position(i,true)=='d') cards.push(i);
						}
					});
					player.chooseButton(['俭衣：获得一张防具牌',cards],true).set('ai',function(button){
						return get.value(button.link,_status.event.player);
					});
					'step 1'
					if(result.bool) player.gain(result.links,'gain2');
				},
			},
			spshangyi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0&&game.hasPlayer((current)=>lib.skill.spshangyi.filterTarget(null,player,current));
				},
				filterCard:true,
				position:'he',
				check:function(card){
					return 6-get.value(card);
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0;
				},
				content:function(){
					target.viewHandcards(player);
					player.gainPlayerCard(target,'h',true,'visible');
				},
				ai:{
					order:6,
					result:{
						player:0.5,
						target:function(player,target){
							if(target.hasSkillTag('noh')) return 0;
							return -1;
						},
					},
				},
			},
			//蒋琬
			spzhenting:{
				audio:2,
				trigger:{global:'useCardToTarget'},
				usable:1,
				filter:function(event,player){
					return (event.card.name=='sha'||get.type(event.card,false)=='delay')&&
						event.player!=player&&!event.targets.contains(player)&&player.inRange(event.target);
				},
				logTarget:'target',
				check:function(event,player){
					var target=event.target,source=event.player;
					var eff2=get.effect(player,event.card,source,player);
					if(eff2>=0) return true;
					var eff1=get.effect(target,event.card,source,player);
					if(eff1>=0) return false;
					if(eff1)
					if(event.card.name=='sha'){
						if(player.hasShan()) return true;
						if(eff1>eff2) return false;
						if(player.hp>2) return true;
						if(player.hp==2) return eff2>eff1/3;
						return false;
					}
					if(event.card.name=='shandian'||event.card.name=='bingliang') return true;
					if(event.card.name=='lebu') return !player.needsToDiscard()&&target.needsToDiscard();
					return false;
				},
				content:function(){
					'step 0'
					var target=trigger.target,evt=trigger.getParent();
					evt.triggeredTargets2.remove(target);
					evt.targets.remove(target);
					evt.triggeredTargets2.add(player);
					evt.targets.add(player);
					game.log(trigger.card,'的目标被改为了',player);
					trigger.untrigger();
					'step 1'
					if(!trigger.player.countDiscardableCards(player,'h')) event._result={index:0};
					else player.chooseControl().set('choiceList',[
						'摸一张牌',
						'弃置'+get.translation(trigger.player)+'的一张手牌',
					]);
					'step 2'
					if(result.index==0) player.draw();
					else{
						player.line(trigger.player,'fire');
						player.discardPlayerCard(trigger.player,true,'h');
					}
				},
				ai:{
					threaten:1.4,
				},
			},
			spjincui:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				limited:true,
				skillAnimation:true,
				animationColor:'orange',
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.awakenSkill('spjincui');
					game.broadcastAll(function(target1,target2){
						game.swapSeat(target1,target2);
					},player,target);
					'step 1'
					if(player.hp>0) player.loseHp(player.hp);
				},
				ai:{
					order:5,
					result:{
						player:function(player,target){
							if(player.hasUnknown()) return 0;
							if(!player.countCards('h',{name:['tao','jiu']})) return 0;
							var num=0,current=player.next;
							while(true){
								num-=get.sgn(get.attitude(player,current));
								if(current==target) break;
								current=current.next;
							}
							while(true){
								if(current==player) break;
								num+=get.sgn(get.attitude(player,current))*1.1;
								current=current.next;
							}
							if(num<player.hp) return 0;
							return num+1-player.hp;
						},
					},
				},
			},
			//张昌蒲
			spdifei:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				usable:1,
				content:function(){
					'step 0'
					var next=player.chooseToDiscard('h','抵诽：弃置一张手牌或摸一张牌');
					if(trigger.card){
						var suit=get.suit(trigger.card,false);
						if(lib.suit.contains(suit)){
							next.set('suit',suit);
							next.set('prompt2','然后若没有'+get.translation(suit)+'手牌则回复1点体力');
							next.set('ai',function(card){
								var player=_status.event.player,suit=_status.event.suit;
								if(player.hasCard(function(cardx){
									return cardx!=card&&get.suit(cardx)==suit;
								},'h')) return 0;
								if(get.name(card)!='tao'&&((get.position(card)=='h'&&get.suit(card)==suit)||player.hp==1)) return 8-get.value(card);
								return 5-get.value(card);
							});
						}
						else next.set('ai',function(card){
							return -get.value(card);
						})
					}
					'step 1'
					if(!result.bool) player.draw();
					'step 2'
					player.showHandcards();
					if(trigger.card){
						var suit=get.suit(trigger.card,false);
						if(!lib.suit.contains(suit)||!player.countCards('h',{suit:suit})) player.recover();
					}
				},
			},
			spyanjiao:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				chooseButton:{
					dialog:function(){
						return ui.create.dialog('###严教###'+get.translation('spyanjiao_info'));
					},
					chooseControl:function(event,player){
						var map={},hs=player.getCards('h');
						for(var i of hs) map[get.suit(i,player)]=true;
						var list=lib.suit.filter((i)=>map[i]);
						list.push('cancel2');
						return list;
					},
					check:function(event,player){
						var map={},hs=player.getCards('h'),min=Infinity,min_suit=null;
						for(var i of hs){
							var suit=get.suit(i,player);
							if(!map[suit]) map[suit]=0;
							map[suit]+=get.value(i);
						}
						for(var i in map){
							if(map[i]<min){
								min=map[i];
								min_suit=i;
							}
						}
						return min_suit;
					},
					backup:function(result,player){
						return {
							audio:'spyanjiao',
							filterCard:{suit:result.control},
							selectCard:-1,
							position:'h',
							filterTarget:lib.filter.notMe,
							discard:false,
							lose:false,
							delay:false,
							content:function(){
								player.addSkill('spyanjiao_draw');
								player.addMark('spyanjiao_draw',cards.length,false);
								target.gain(cards,player,'giveAuto');
								target.damage('nocard');
							},
							ai:{
								result:{
									target:function(player,target){
										if(!ui.selected.cards.length) return 0;
										var val=get.value(ui.selected.cards,target);
										if(val<0) return val+get.damageEffect(target,player,target);
										if(val>5||get.value(ui.selected.cards,player)>5) return 0;
										return get.damageEffect(target,player,target);
									},
								},
							},
						}
					},
					prompt:()=>'请选择【严教】的目标',
				},
				subSkill:{
					draw:{
						onremove:true,
						trigger:{player:'phaseBegin'},
						forced:true,
						charlotte:true,
						content:function(){
							player.draw(player.countMark('spyanjiao_draw'));
							player.removeSkill('spyanjiao_draw');
						},
						mark:true,
						intro:{content:'下回合开始时摸#张牌'},
					},
					backup:{audio:'spyanjiao'},
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			//崔琰
			spyajun:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					var hs=player.getCards('h');
					return hs.length>0&&!player.hasSkillTag('noCompareSource')&&player.hasHistory('gain',function(evt){
						for(var i of evt.cards){
							if(hs.contains(i)) return true;
						}
						return false;
					})&&game.hasPlayer(function(current){
						return current!=player&&player.canCompare(current);
					});
				},
				content:function(){
					'step 0'
					var cards=[],hs=player.getCards('h');
					player.getHistory('gain',function(evt){
						cards.addArray(evt.cards);
					});
					cards=cards.filter(function(i){
						return hs.contains(i);
					});
					player.chooseCardTarget({
						prompt:get.prompt('spyajun'),
						prompt2:'操作提示：选择一张本回合新获得的牌作为拼点牌，然后选择一名拼点目标',
						cards:cards,
						filterCard:function(card){
							return _status.event.cards.contains(card);
						},
						filterTarget:function(card,player,target){
							return player.canCompare(target);
						},
						ai1:function(card){
							return get.number(card)-get.value(card);
						},
						ai2:function(target){
							return -get.attitude(_status.event.player,target)*Math.sqrt(5-Math.min(4,target.countCards('h')))*(target.hasSkillTag('noh')?0.5:1);
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('spyajun',target);
						var next=player.chooseToCompare(target);
						if(!next.fixedResult) next.fixedResult={};
						next.fixedResult[player.playerid]=result.cards[0];
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var cards=[result.player,result.target].filterInD('d');
						if(cards.length){
							player.chooseButton(['是否将一张牌置于牌堆顶？',cards]).set('ai',function(button){
								if(get.color(button.link)=='black') return 1;
								return 0;
							});
						}
						else event.finish();
					}
					else{
						player.addMark('spyajun_less',1,false);
						player.addTempSkill('spyajun_less');
						event.finish();
					}
					'step 3'
					if(result.bool){
						var card=result.links[0];
						card.fix();
						ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
						game.updateRoundNumber();
						game.log(player,'将',card,'置于牌堆顶');
					}
				},
				group:'spyajun_draw',
				subSkill:{
					draw:{
						audio:'spyajun',
						trigger:{player:'phaseDrawBegin2'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							trigger.num++;
						},
					},
					less:{
						onremove:true,
						charlotte:true,
						intro:{content:'手牌上限-#'},
						mod:{
							maxHandcard:function(player,num){
								return num-player.countMark('spyajun_less');
							}
						},
					},
				},
			},
			spzundi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterCard:true,
				filterTarget:true,
				check:function(card){
					return 7-get.value(card);
				},
				content:function(){
					'step 0'
					player.judge();
					'step 1'
					if(result.color=='black') target.draw(3);
					else target.moveCard();
				},
				ai:{
					order:8,
					result:{
						target:function(player,target){
							if(target.canMoveCard(true)) return 3;
							return 1;
						},
					},
				},
			},
			//花蔓
			spxiangzhen:{
				trigger:{target:'useCardToBefore'},
				forced:true,
				audio:2,
				filter:function(event,player){
					return event.card.name=='nanman';
				},
				content:function(){
					trigger.cancel();
				},
				group:'spxiangzhen_draw',
				subSkill:{
					draw:{
						audio:'spxiangzhen',
						audio:2,
						trigger:{global:'useCardAfter'},
						forced:true,
						filter:function(event,player){
							return event.card.name=='nanman'&&game.hasPlayer2(function(current){
								return current.hasHistory('damage',function(evt){
									return evt.card==event.card;
								});
							});
						},
						content:function(){
							'step 0'
							if(player!=trigger.player&&trigger.player.isIn()) game.asyncDraw([player,trigger.player].sortBySeat());
							else{
								player.draw();
								event.finish();
							}
							'step 1'
							game.delayx();
						},
					},
				},
			},
			spfangzong:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return !player.hasSkill('spxizhan_spfangzong')&&player.countCards('h')<Math.min(8,game.countPlayer());
				},
				content:function(){
					player.drawTo(Math.min(8,game.countPlayer()));
				},
				mod:{
					playerEnabled:function(card,player,target){
						if(player==_status.currentPhase&&get.tag(card,'damage')>0&&!player.hasSkill('spxizhan_spfangzong')&&player.inRange(target)) return false;
					},
					targetEnabled:function(card,player,target){
						if(get.tag(card,'damage')>0&&!target.hasSkill('spxizhan_spfangzong')&&player.inRange(target)) return false;
					},
				},
			},
			spxizhan:{
				trigger:{global:'phaseBegin'},
				forced:true,
				locked:false,
				logTarget:'player',
				filter:function(event,player){
					return player!=event.player;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('he','嬉战：弃置一张牌或失去1点体力','根据弃置的牌对'+get.translation(trigger.player)+'视为使用如下牌：<br>♠，其使用【酒】；♥，你使用【无中生有】<br>♣，对其使用【铁索连环】；♦：对其使用火【杀】').set('ai',function(card){
						var player=_status.event.player,target=_status.event.getTrigger().player;
						var suit=get.suit(card,player),list;
						switch(suit){
							case 'spade': list=[{name:'jiu'},target,target];break;
							case 'heart': list=[{name:'wuzhong'},player,player];break;
							case 'club': list=[{name:'tiesuo'},player,target];break;
							case 'diamond': list=[{name:'sha',nature:'fire'},player,target];break;
						}
						list[0].isCard=true;
						var eff=0;
						if(list[1].canUse(list[0],list[2],false)) eff=get.effect(list[2],list[0],list[1],player);
						if(eff>=0||suit=='club') eff=Math.max(eff,5);
						return eff*1.5-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.addTempSkill('spxizhan_spfangzong');
						var target=trigger.player,card=result.cards[0],suit=get.suit(card,player);
						if((!target||!target.isIn())&&suit!='heart') return;
						switch(suit){
							case 'spade':
								target.chooseUseTarget('jiu',true);
								break;
							case 'heart':
								player.chooseUseTarget('wuzhong',true);
								break;
							case 'club':
								if(player.canUse('tiesuo',target)) player.useCard({
									name:'tiesuo',
									isCard:true,
								},target);
								break;
							case 'diamond':
								if(player.canUse({
									name:'sha',
									isCard:true,
									nature:'fire',
								},target,false)) player.useCard({
									name:'sha',
									isCard:true,
									nature:'fire',
								},target,false);
								break;
						}
					}
					else player.loseHp();
				},
				subSkill:{
					spfangzong:{charlotte:true},
				},
			},
			//高览
			spjungong:{
				enable:'phaseUse',
				filter:function(event,player){
					var num=(player.getStat('skill').spjungong||0);
					return (num<player.hp||num<=player.countCards('he'))&&!player.hasSkill('spjungong_block');
				},
				filterTarget:function(card,player,target){
					return target!=player&&player.canUse('sha',target,false);
				},
				filterCard:true,
				position:'he',
				selectCard:function(){
					var player=_status.event.player,num=(player.getStat('skill').spjungong||0)+1;
					if(ui.selected.cards.length||num>player.hp) return num;
					return [0,num];
				},
				check:function(card){
					return 6-get.value(card);
				},
				prompt:function(){
					var player=_status.event.player,num=get.cnNumber((player.getStat('skill').spjungong||0)+1);
					return '弃置'+num+'张牌或失去'+num+'点体力，视为使用杀';
				},
				content:function(){
					'step 0'
					if(!cards.length) player.loseHp(player.getStat('skill').spjungong||1);
					player.useCard({name:'sha',isCard:true},target,false);
					'step 1'
					if(player.hasHistory('sourceDamage',function(evt){
						var card=evt.card;
						if(!card||card.name!='sha') return false;
						var evtx=evt.getParent('useCard');
						return evtx.card==card&&evtx.getParent()==event;
					})) player.addTempSkill('spjungong_block');
				},
				ai:{
					order:function(item,player){
						return get.order({name:'sha'},player)+1;
					},
					result:{
						target:function(player,target){
							if(!ui.selected.cards.length) return 0;
							return get.effect(target,{name:'sha'},player,target);
						},
					},
				},
				subSkill:{block:{charlotte:true}},
			},
			spdengli:{
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				frequent:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.player.hp==event.target.hp;
				},
				content:function(){
					player.draw();
				},
				ai:{
					effect:{
						player:function(card,player,target){
							var hp=player.hp,evt=_status.event;
							if(evt.name=='chooseToUse'&&evt.player==player&&evt.skill=='spjungong'&&!ui.selected.cards.length) hp-=((player.getStat('skill').spjungong||0)+1);
							if(card&&card.name=='sha'&&hp==target.hp) return [1,0.3];
						},
						target:function(card,player,target){
							if(card&&card.name=='sha'&&player.hp==target.hp) return [1,0.3];
						},
					},
				},
			},
			//孙翊
			zaoli:{
				trigger:{player:'phaseBegin'},
				audio:2,
				forced:true,
				filter:function(event,player){
					return player.countMark('zaoli')>0;
				},
				content:function(){
					'step 0'
					event.num=player.storage.zaoli;
					player.removeMark('zaoli',event.num);
					if(player.countCards('he')>0){
						player.chooseToDiscard(true,'he',[1,Infinity],'躁厉：弃置至少一张牌').set('ai',function(card){
							if(card.hasGaintag('zaoli')) return 1;
							return 5-get.value(card);
						});
					}
					'step 1'
					if(result.bool) num+=result.cards.length;
					if(event.num>2) player.loseHp();
					player.draw(num);
				},
				mod:{
					cardEnabled2:function(card,player){
						if(player==_status.currentPhase&&get.itemtype(card)=='card'&&card.hasGaintag('zaoli')) return false;
					},
				},
				group:['zaoli_add','zaoli_count'],
				init:function(player){
					if(player==_status.currentPhase){
						var hs=player.getCards('h');
						player.getHistory('gain',function(evt){
							hs.removeArray(evt.cards);
						});
						if(hs.length) player.addGaintag(hs,'zaoli');
					}
				},
				onremove:function(player){
					player.removeGaintag('zaoli');
					delete player.storage.zaoli;
				},
				intro:{content:'mark'},
				subSkill:{
					add:{
						audio:'zaoli',
						trigger:{player:['useCard','respond']},
						forced:true,
						filter:function(event,player){
							return player.countMark('zaoli')<4&&player.hasHistory('lose',function(evt){
								return evt.hs&&evt.hs.length>0&&evt.getParent()==event;
							});
						},
						content:function(){
							player.addMark('zaoli',1);
						},
					},
					count:{
						trigger:{global:'phaseBeginStart'},
						forced:true,
						firstDo:true,
						silent:true,
						filter:function(event,player){
							if(player==event.player) return player.countCards('h')>0;
							return player.hasCard(function(card){
								return card.hasGaintag('zaoli');
							},'h');
						},
						content:function(){
							if(player==trigger.player){
								player.addGaintag(player.getCards('h'),'zaoli');
							}
							else player.removeGaintag('zaoli');
						},
					},
				},
			},
			//王双
			yiyong:{
				audio:2,
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&
						event.source&&event.source.isIn()&&player!=event.source
						&&event.cards.filterInD().length>0&&player.getEquip(1);
				},
				check:function(event,player){
					var card={
						name:'sha',
						cards:event.cards.filterInD(),
					},target=event.source;
					return !player.canUse(card,target,false)||get.effect(target,card,player,player)>0;
				},
				content:function(){
					'step 0'
					event.cards=trigger.cards.filterInD();
					player.gain(event.cards,'gain2');
					'step 1'
					var target=trigger.source,hs=player.getCards('h');
					if(target&&target.isIn()&&hs.length>=cards.length&&cards.filter(function(i){
						return hs.contains(i);
					}).length==cards.length&&player.canUse({name:'sha',cards:cards},target,false)){
						var next=player.useCard({name:'sha'},cards,target,false);
						if(!target.getEquip(1)) next.baseDamage=2;
					}
				},
			},
			shanxie:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				//filterTarget:function(card,player,target){
				//	return target!=player&&target.getEquip(1);
				//},
				//selectTarget:[0,1],
				content:function(){
					var card=get.cardPile2(function(card){
						return get.subtype(card)=='equip1';
					});
					if(card) player.gain(card,'gain2');
					else{
						var targets=game.filterPlayer(function(current){
							return current.getEquip(1);
						});
						if(targets.length){
							var target=targets.randomGet();
							player.gain(target.getEquip(1),target,'give');
						}
					}
				},
				content_old:function(){
					'step 0'
					if(!target){
						var card=get.cardPile2(function(card){
							return get.subtype(card)=='equip1';
						});
						if(card) player.gain(card,'gain2');
						event.finish();
					}
					else{
						var card=target.getEquip(1);
						if(card){
							event.card=card;
							player.gain(card,target,'give');
						}
						else event.finish();
					}
					'step 1'
					if(player.getCards('h').contains(card)&&get.type(card,player)=='equip'&&player.hasUseTarget(card)) player.chooseUseTarget(card,true,'nopopup');
					'step 2'
					var hs=target.getCards('h',function(card){
						return target.canUse(get.autoViewAs({name:'sha'},[card]),player,false);
					});
					if(hs.length){
						if(hs.length==1) event._result={bool:true,cards:hs};
						else target.chooseCard('h',true,'将一张牌当做【杀】对'+get.translation(player)+'使用',function(card){
							return _status.event.cards.contains(card);
						}).set('cards',hs).set('ai',function(card){
							return get.effect(_status.event.getParent().player,get.autoViewAs({name:'sha',},[card]),_status.event.player)
						})
					}
					else event.finish();
					'step 3'
					if(result.bool) target.useCard({name:'sha'},result.cards,player,false);
				},
				ai:{
					order:9,
					result:{player:1},
				},
				group:'shanxie_exclude',
				subSkill:{
					exclude:{
						trigger:{global:'useCard'},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(event.card.name!='shan'||event.getParent(2).player!=player) return false;
							var num=get.number(event.card);
							return !num||num<=player.getAttackRange()*2;
						},
						logTarget:'player',
						content:function(){
							trigger.all_excluded=true;
						},
					},
				},
			},
			//阎圃
			huantu:{
				audio:2,
				trigger:{global:'phaseDrawBefore'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&!player.hasSkill('huantu_round')&&player.inRange(event.player);
				},
				checkx:function(event,player){
					var target=event.player;
					return get.attitude(player,target)>0&&(target.hasSkill('pingkou')||target.skipList.contains('phaseUse')||target.isDamaged()&&target.hp<=2||target.needsToDiscard());
				},
				content:function(){
					'step 0'
					player.chooseCard(get.prompt('huantu',trigger.player),'交给其一张牌并令其暂时跳过摸牌阶段','he').set('ai',function(card){
						if(!_status.event.checkx) return 0;
						return 1+Math.random();
					}).set('checkx',lib.skill.huantu.checkx(trigger,player));
					'step 1'
					if(result.bool){
						player.addTempSkill('huantu_round','roundStart');
						player.logSkill('huantu',trigger.player);
						trigger.player.gain(result.cards,player,'giveAuto');
						trigger.cancel();
						player.addTempSkill('huantu_effect');
					}
				},
				subSkill:{
					round:{
						charlotte:true,
						mark:true,
						intro:{content:'本轮已发动'},
					},
					effect:{
						audio:'huantu',
						trigger:{global:'phaseJieshuBegin'},
						forced:true,
						charlotte:true,
						logTarget:'player',
						filter:function(event,player){
							return event.player.isIn();
						},
						content:function(){
							'step 0'
							var str=get.translation(trigger.player);
							player.chooseControl().set('choiceList',[
								'令'+str+'回复1点体力并摸两张牌',
								'摸三张牌，然后交给'+str+'两张手牌',
							]).set('choice',trigger.player.isDamaged()?0:1);
							'step 1'
							if(result.index==0){
								trigger.player.recover();
								trigger.player.draw(2);
								event.finish();
							}
							else{
								event.target=trigger.player;
								player.draw(3);
							}
							'step 2'
							var hs=player.getCards('h');
							if(hs.length&&target.isIn()&&player.isIn()){
								if(hs.length<=2) event._result={bool:true,cards:hs};
								else player.chooseCard('h',2,true,'交给'+get.translation(target)+'两张手牌');
							}
							else event.finish();
							'step 3'
							if(result.bool) trigger.player.gain(result.cards,player,'giveAuto');
						},
					},
				},
			},
			bihuo:{
				trigger:{global:'dyingAfter'},
				logTarget:'player',
				limited:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return event.player.isIn();
				},
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				content:function(){
					player.awakenSkill('bihuo');
					trigger.player.draw(3);
					trigger.player.addTempSkill('bihuo_effect','roundStart');
					trigger.player.addMark('bihuo_effect',game.countPlayer(),false);
				},
				subSkill:{
					effect:{
						onremove:true,
						charlotte:true,
						mod:{
							globalTo:function(from,to,distance){
								return distance+to.countMark('bihuo_effect');
							},
						},
						intro:{content:'其他角色至你的距离+#'},
					},
				},
			},
			//马元义
			jibing:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					return player.getStorage('jibing').length>0&&(event.filterCard({name:'sha'},player,event)||event.filterCard({name:'shan'},player,event));
				},
				chooseButton:{
					dialog:function(event,player){
						var dialog=ui.create.dialog('集兵','hidden');
						if(event.filterCard({name:'sha'},player,event)&&event.filterCard({name:'shan'},player,event)){
							dialog._chooseButton=2;
							var table=document.createElement('div');
							table.classList.add('add-setting');
							table.style.margin='0';
							table.style.width='100%';
							table.style.position='relative';
							var list=['sha','shan'];
							for(var i of list){
								if(player.isDisabled(i)) continue;
								var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
								td.innerHTML='<span>'+get.translation(i)+'</span>';
								td.link=i;
								td.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
								for(var j in lib.element.button){
									td[j]=lib.element.button[j];
								}
								table.appendChild(td);
								dialog.buttons.add(td);
							}
							dialog.content.appendChild(table);
						}
						else dialog._cardName=event.filterCard({name:'sha'},player,event)?'sha':'shan';
						dialog.add(player.storage.jibing);
						return dialog;
					},
					filter:function(button){
						var evt=_status.event,player=_status.event.player;
						if(!evt.dialog._chooseButton){
							var evt2=_status.event.getParent();
							return evt2.filterCard(get.autoViewAs({name:evt.dialog._cardName},[button.link]),player,evt2);
						}
						if(ui.selected.buttons.length){
							var str=ui.selected.buttons[0].link;
							if(typeof str!='string'||typeof button.link=='string') return false;
							var evt2=_status.event.getParent();
							return evt2.filterCard(get.autoViewAs({name:str},[button.link]),player,evt2);
						}
						return typeof button.link=='string';
					},
					select:function(){
						return (_status.event.dialog._chooseButton||1);
					},
					backup:function(links,player){
						var card,name;
						if(links.length==2){
							name=links[0];
							card=links[1];
						}
						else{
							card=links[0];
							var event=_status.event;
							name=event.filterCard(get.autoViewAs({name:'sha'},[card]),player,event)?'sha':'shan';
						}
						return {
							audio:'jibing',
							filterCard:function(){return false},
							selectCard:-1,
							card:card,
							viewAs:get.autoViewAs({name:name},card),
							card:card,
							precontent:function(){
								var card=lib.skill.jibing_backup.card;
								player.unmarkAuto('jibing',[card]);
								event.result.card={name:event.result.card.name};
								event.result.cards=[card];
							},
						}
					},
					prompt:function(links,player){
						return '请选择【杀】的目标';
					},
				},
				ai:{
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player,tag,arg){
						return player.getStorage('jibing').length>0;
					},
					order:function(item,player){
						if(player.hasSkill('binghuo')) return 6;
						return 1
					},
					result:{
						player:1,
					},
				},
				group:'jibing_place',
				subSkill:{
					place:{
						audio:'jibing',
						trigger:{player:'phaseDrawBegin1'},
						prompt2:'摸牌阶段开始时，若你的“兵”数小于势力数，则你可以改为将牌堆顶的两张牌置于你的武将牌上，称为“兵”。',
						filter:function(event,player){
							return !event.numFixed&&player.getStorage('jibing').length<game.countGroup();
						},
						content:function(){
							trigger.changeToZero();
							var cards=get.cards(2);
							game.cardsGotoOrdering(cards);
							player.markAuto('jibing',cards);
							player.$gain2(cards,false);
							game.log(player,'将',cards,'置于了武将牌上');
							game.delayx();
						},
					},
					backup:{audio:'jibing'},
				},
				intro:{content:'cards',onunmark:'throw'},
			},
			wangjing:{
				audio:2,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					if(event.skill!='jibing_backup') return false;
					var target=lib.skill.wangjing.logTarget(event,player);
					return target&&target.isMaxHp();
				},
				logTarget:function(event,player){
					if(event.name=='respond') return event.source;
					if(event.card.name=='sha') return event.targets[0];
					return event.respondTo[0];
				},
				forced:true,
				content:function(){
					player.draw();
				},
				ai:{
					combo:'jibing',
					mingzhi:false,
					effect:{
						target:function(card,player,target,current){
							if((get.tag(card,'respondShan')||get.tag(card,'respondSha'))&&target.getStorage('jibing').length>0&&player.isMaxHp()){
								if(get.attitude(target,player)<=0){
									return [0,0,1,0.3];
								}
							}
						},
					},
				}
			},
			moucuan:{
				audio:2,
				derivation:'binghuo',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'metal',
				filter:function(event,player){
					return player.getStorage('jibing').length>=game.countGroup();
				},
				content:function(){
					player.awakenSkill('moucuan');
					player.loseMaxHp();
					player.addSkill('binghuo');
				},
				ai:{combo:'jibing'},
			},
			binghuo:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.hasHistory('useCard',function(evt){
						return evt.skill=='jibing_backup';
					})||player.hasHistory('respond',function(evt){
						return evt.skill=='jibing_backup';
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('binghuo')).set('ai',function(target){
						var player=_status.event.player;
						return get.damageEffect(target,player,player);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('binghuo',target);
						target.judge(function(card){
							if(get.color(card)=='black') return -2;
							return 0.1;
						}).judge2=function(result){
							return result.bool===false?true:false;
						};
					}
					else event.finish();
					'step 2'
					if(result.bool==false) target.damage('thunder');
				},
				ai:{combo:'jibing',expose:0.2},
			},
			//司马孚
			xunde:{
				audio:2,
				trigger:{global:'damageEnd'},
				filter:function(event,player){
					return event.player.isAlive()&&get.distance(player,event.player)<=1;
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)>0&&(!event.source||get.attitude(player,event.source)<0);
				},
				content:function(){
					'step 0'
					player.judge().set('callback',function(){
						if(event.judgeResult.number>5){
							var player=event.getParent(2)._trigger.player;
							if(get.position(card,true)=='o') player.gain(card,'gain2');
						}
					});
					'step 1'
					if(result.number<7){
						var source=trigger.source;
						if(source&&source.isIn()&&source.countCards('h')>0){
							player.line(source);
							source.chooseToDiscard('h',true);
						}
					}
				},
			},
			chenjie:{
				audio:2,
				trigger:{global:'judge'},
				filter:function(event,player){
					var suit=get.suit(event.player.judging[0],event.player);
					return player.countCards('hes',function(card){
						if(_status.connectMode&&get.position(card)!='e') return true;
						return get.suit(card)==suit;
					})>0;
				},
				direct:true,
				preHidden:true,
				content:function(){
					"step 0"
					var suit=get.suit(trigger.player.judging[0],trigger.player);
					player.chooseCard(get.translation(trigger.player)+'的'+(trigger.judgestr||'')+'判定为'+
					get.translation(trigger.player.judging[0])+'，'+get.prompt('chenjie'),'hes',function(card){
						if(get.suit(card)!=_status.event.suit) return false;
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
						if(attitude==0||result==0) return 0.1;
						if(attitude>0){
							return result+0.01;
						}
						else{
							return 0.01-result;
						}
					}).set('judging',trigger.player.judging[0]).set('suit',suit).setHiddenSkill(event.name);
					"step 1"
					if(result.bool){
						event.card=result.cards[0];
						player.respond(result.cards,'highlight','chenjie','noOrdering');
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
						trigger.player.judging[0]=card;
						trigger.orderingCards.add(card);
						game.log(trigger.player,'的判定牌改为',card);
						player.draw(2);
					}
				},
				ai:{
					rejudge:true,
					tag:{
						rejudge:0.1,
					}
				}
			},
			//吴景流兵
			liubing:{
				trigger:{player:'useCard1'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='sha'&&event.cards.length==1&&player.getHistory('useCard',function(evt){
						return evt.card.name=='sha'&&evt.cards.length==1;
					}).indexOf(event)==0;
				},
				content:function(){
					game.log(player,'将',trigger.card,'的花色改为','#y♦');
					trigger.card.suit='diamond';
				},
				group:'liubing_gain',
				subSkill:{
					gain:{
						trigger:{global:'useCardAfter'},
						forced:true,
						audio:'liubing',
						filter:function(event,player){
							return event.player!=player&&event.card.isCard&&event.card.name=='sha'&&
								get.color(event.card)=='black'&&event.cards.filterInD().length>0&&
								event.player.isPhaseUsing()&&!event.player.hasHistory('sourceDamage',function(evt){
									return evt.card==event.card;
								});
						},
						logTarget:'player',
						content:function(){
							player.gain(trigger.cards.filterInD(),'gain2');
						},
					},
				},
			},
			//新刘璋
			jutu:{
				audio:'xiusheng',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.storage.yaohu&&game.hasPlayer(function(current){
						return current.group==player.storage.yaohu;
					});
				},
				content:function(){
					'step 0'
					var cards=player.getExpansions('jutu');
					if(cards.length>0){
						player.gain(cards,'gain2');
					}
					'step 1'
					event.num=game.countPlayer(function(current){
						return current.group==player.storage.yaohu;
					});
					player.draw(event.num+1);
					if(!event.num) event.finish();
					'step 2'
					var he=player.getCards('he');
					if(!he.length) event.finish();
					else if(he.length<num) event._result={bool:true,cards:he};
					else player.chooseCard('he',true,num,'选择'+get.cnNumber(num)+'张牌作为生');
					'step 3'
					if(result.bool){
						var cards=result.cards;
						player.addToExpansion(player,'give',cards).gaintag.add('jutu');
					}
					'step 4'
					game.delayx();
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{combo:'yaohu'},
			},
			yaohu:{
				audio:'yinlang',
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('yaohu_round')&&game.hasPlayer(function(current){
						return current.group&&current.group!='unknown';
					});
				},
				content:function(){
					'step 0'
					var list=[];
					game.countPlayer(function(current){
						if(current.group&&current.group!='unknown') list.add(current.group);
					});
					list.sort(function(a,b){
						return lib.group.indexOf(a)-lib.group.indexOf(b);
					});
					if(!player.hasSkill('yaohu')) list.push('cancel2');
					player.chooseControl(list).set('prompt','邀虎：请选择一个势力').set('ai',function(){
						return _status.event.choice;
					}).set('choice',function(){
						var getn=function(group){
							return game.countPlayer(function(current){
								if(current.group!=group) return false;
								if(player==current) return 2;
								if(get.attitude(current,player)>0) return 1;
								return 1.3;
							});
						}
						list.sort(function(a,b){
							return getn(b)-getn(a);
						});
						return list[0];
					}());
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('yaohu',game.filterPlayer(function(current){
							return current.group==result.control;
						}));
						game.log(player,'选择了','#y'+get.translation(result.control+2))
						player.storage.yaohu=result.control;
						player.markSkill('yaohu');
					}
				},
				ai:{combo:'jutu'},
				intro:{content:'已选择了$势力'},
				group:'yaohu_gain',
				subSkill:{
					round:{},
					gain:{
						audio:'yinlang',
						trigger:{global:'phaseUseBegin'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return event.player!=player&&event.player.group==player.storage.yaohu&&event.player.isIn()&&player.getExpansions('jutu').length>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							var target=trigger.player;
							event.target=target;
							target.chooseButton(['选择获得一张“生”',player.getExpansions('jutu')],true).set('ai',function(button){
								return get.value(button.link,player);
							});
							'step 1'
							if(result.bool){
								target.gain(result.links,'give',player);
							}
							'step 2'
							if(game.hasPlayer(function(current){
								return current!=player&&current!=target;
							})){
								player.chooseTarget(true,'选择'+get.translation(target)+'使用【杀】的目标',function(card,player,target){
									return target!=player&&target!=_status.event.source;
								}).set('source',target).set('ai',function(target){
									var evt=_status.event;
									return get.effect(target,{name:'sha'},evt.source,evt.player);
								});
							}
							else{
								event._result={bool:false};
								event.goto(4);
							}
							'step 3'
							var target2=result.targets[0];
							player.line(target2,'green');
							target.chooseToUse(function(card,player,event){
								if(get.name(card)!='sha') return false;
								return lib.filter.filterCard.apply(this,arguments);
							},'对'+get.translation(target2)+'使用一张杀，否则交给其两张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
								if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
								return lib.filter.targetEnabled.apply(this,arguments);
							}).set('sourcex',target2).set('addCount',false);
							'step 4'
							if(!result.bool){
								var hs=target.getCards('he');
								if(!hs.length) event.finish();
								else if(hs.length<=2) event._result={bool:true,cards:hs};
								else target.chooseCard(2,true,'交给'+get.translation(player)+'两张牌','he');
							}
							else event.finish();
							'step 5'
							if(result.bool) player.gain(result.cards,target,'giveAuto');
						},
					},
				},
			},
			rehuaibi:{
				audio:'huaibi',
				zhuSkill:true,
				mod:{
					maxHandcard:function(player,num){
						if(player.storage.yaohu&&player.hasZhuSkill('rehuaibi')) return num+game.countPlayer(function(current){
							return current.group==player.storage.yaohu;
						});
					},
				},
				ai:{combo:'yaohu'},
			},
			//傅佥
			jueyong:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				forced:true,
				filter:function(event,player){
					return event.card.name!='jiu'&&event.card.name!='tao'&&
						event.targets.length==1&&event.card.isCard&&event.cards.length==1&&event.getParent(2).name!='jueyong_timeout'&&
						get.position(event.cards[0],true)=='o'&&event.card.name==event.cards[0].name&&
						(!player.storage.jueyong||player.storage.jueyong[0].length<player.hp*2);
				},
				content:function(){
					trigger.targets.remove(player);
					trigger.getParent().triggeredTargets2.remove(player);
					trigger.untrigger();
					var card=trigger.cards[0];
					player.addToExpansion(card,'gain2').gaintag.add('jueyong');
					if(!player.storage.jueyong) player.storage.jueyong=[[],[]];
					player.storage.jueyong[0].push(card);
					player.storage.jueyong[1].push(trigger.player);
					game.delayx();
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
					delete player.storage[skill];
				},
				intro:{
					markcount:function(storage){
						if(!storage) return 0;
						return storage[0].length;
					},
					mark:function(dialog,storage,player){
						if(!storage) return;
						dialog.addAuto(storage[0]);
						dialog.addText(get.translation(storage[1]));
					},
					onunmark:function(storage,player){
						player.storage.jueyong=[[],[]];
					},
				},
				ai:{
					reverseEquip:true,
					effect:{
						target:function(card,player,target,current){
							if(get.type(card)=='equip'&&!get.tag(card,'gifts')&&target.storage.jueyong&&target.storage.jueyong[1].length){
								var result1=get.equipResult(player,target,card.name),subtype=get.subtype(card);
								for(var i of target.storage.jueyong[0]){
									if(get.subtype(i,false)==subtype&&get.equipResult(target,target,i.name)>=result1) return 'zerotarget';
								}
							}
						},
					},
				},
				group:'jueyong_timeout',
				subSkill:{
					timeout:{
						audio:'jueyong',
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						filter:function(event,player){
							return player.storage.jueyong&&player.storage.jueyong[0].length>0;//=Math.max(1,player.getDamagedHp());
						},
						content:function(){
							var list=player.storage.jueyong,card=list[0].shift(),source=list[1].shift();
							if(player.getExpansions('jueyong').contains(card)){
								if(source&&source.isIn()&&source.canUse(card,player,false)) source.useCard(card,player,false);
								else player.loseToDiscardpile(card);
							}
							if(list[0].length) event.redo();
						},
					},
				},
			},
			poxiang:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:(event,player)=>player.countCards('he')>0,
				filterCard:true,
				filterTarget:lib.filter.notMe,
				position:'he',
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					var player=_status.event.player;
					if(!player.storage.jueyong||player.storage.jueyong[0].length<Math.max(1,player.getDamagedHp())||!player.storage.jueyong[0].filter(function(card){
						return get.effect(player,card,player.storage.jueyong[1][player.storage.jueyong[0].indexOf(card)],player)<0;
					}).length||(player.hp<=1&&!player.storage.jueyong[0].filter(function(card){
						return get.tag(card,'damage')>0;
					}).length)) return -1;
					return 20-get.value(card);
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'giveAuto');
					player.draw(3).gaintag=['poxiang'];
					player.addTempSkill('poxiang_mark')
					'step 1'
					var cards=player.getExpansions('jueyong');
					if(cards.length) player.loseToDiscardpile(cards);
					player.unmarkSkill('jueyong');
					player.loseHp();
					'step 2'
					//player.skip('phaseDiscard');
					game.delayx();
				},
				ai:{
					order:12,
					result:{
						player:4,
						target:1,
					},
				},
				subSkill:{
					mark:{
						charlotte:true,
						onremove:function(player){
							player.removeGaintag('poxiang');
						},
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('poxiang')){
									return true;
								}
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('poxiang')){
									return false;
								}
							},
						},
					},
				},
			},
			//宗预
			zhibian:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer((current)=>(current!=player&&player.canCompare(current)));
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('zhibian'),'与一名其他角色进行拼点',function(card,player,target){
						return target!=player&&player.canCompare(target);
					}).set('ai',function(target){
						if(!_status.event.goon) return false;
						var att=get.attitude(player,target);
						if(att<0&&target.countCards('e',function(card){
							return player.canEquip(card)&&get.effect(player,card,target,player)>0;
						})) return -att/Math.sqrt(target.countCards('h'));
						if(!player.isDamaged()) return false;
						if(att<=0) return (1-att)/Math.sqrt(target.countCards('h'));
						return Math.sqrt(2/att*Math.sqrt(target.countCards('h')));
					}).set('goon',function(){
						if(!player.hasCard(function(card){
							return (card.number>=14-player.hp&&get.value(card)<=5);
						})) return false;
						return true;
					}());
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('zhibian',target);
						player.chooseToCompare(target);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var list=[],list2=[
							'将'+get.translation(target)+'装备区/判定区中的一张牌移动到你的区域内',
							'回复1点体力',
							'背水！跳过摸牌阶段，并依次执行上述所有选项',
						];
						if(target.hasCard(function(card){
							return player.canEquip(card);
						},'e')||target.hasCard(function(card){
							return player.canAddJudge(card);
						},'j')){
							list.push('选项一');
						}
						if(player.isDamaged()){
							list.push('选项二');	
						}
						if(list.contains('选项一')) list.push('背水！')
						list.push('cancel2');
						player.chooseControl(list).set('choiceList',list2).set('ai',function(target){
							if(player.isDamaged()&&(player.hp<=2||!target.countCards('e',function(card){
								return player.canEquip(card)&&get.value(card,target)>=4+player.getDamagedHp();
							}))) return 1;
							return 0;
						});
					}
					else{
						player.loseHp();
						event.finish();
					}
					'step 3'
					if(result.control!='cancel2'){
						event.control=result.control;
						if(result.control=='选项一'||result.control=='背水！'){
							player.choosePlayerCard(target,'ej',true).set('ai',get.buttonValue);
						}
						else event.goto(5);
					}
					else event.finish();
					'step 4'
					if(result.bool){
						var card=result.cards[0];
						target.$give(card,player,false);
						game.delayx();
						if(get.position(card)=='e') player.equip(card);
						else player.addJudge(card);
					}
					'step 5'
					if(event.control=='选项二'||event.control=='背水！'){
						player.recover();
					}
					if(event.control=='背水！') player.skip('phaseDraw');
				},
			},
			yuyan:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.card.name=='sha'&&event.card.isCard&&typeof get.number(event.card)=='number'&&player.hp<event.player.hp;
				},
				content:function(){
					'step 0'
					var num=get.number(trigger.card);
					if(num>=13||!trigger.player.hasCard(function(card){
						if(_status.connectMode&&get.position(card)=='h') return true;
						return get.number(card)>num;
					},'he')) event._result={bool:false};
					else trigger.player.chooseCard('he',function(card){
						return get.number(card)>_status.event.number;
					},'交给'+get.translation(player)+'一张点数大于'+get.cnNumber(num)+'的牌，或令'+get.translation(trigger.card)+'对其无效').set('number',num).set('',function(card){
						if(card.name=='shan'||card.name=='tao'||card.name=='jiu') return false;
						return 6-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.gain(result.cards,trigger.player,'giveAuto');
					}
					else{
						trigger.targets.remove(player);
						trigger.getParent().triggeredTargets2.remove(player);
						trigger.untrigger();
					}
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(card.name=='sha'&&player.hp>target.hp&&get.attitude(player,target)<0){
								var num=get.number(card);
								if(typeof num!='number') return false;
								var bs=player.getCards('h',function(cardx){
									return (get.number(cardx)>num&&!['','',''].contains(cardx.name));
								});
								if(bs.length<2) return 0;
								if(player.hasSkill('jiu')||player.hasSkill('tianxianjiu')) return;
								if(bs.length<=2){
									for(var i=0;i<bs.length;i++){
										if(get.value(bs[i])<6){
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
			//袁涣
			qingjue:{
				audio:2,
				trigger:{global:'useCardToPlayer'},
				logTarget:'player',
				round:1,
				filter:function(event,player){
					return (event.player!=player&&event.target!=player&&event.player!=event.target&&
						event.player.hp>event.target.hp&&event.targets.length==1&&event.player.countCards('h')>0&&!event.target.isDying()&&
						!event.player.hasSkillTag('noCompareTarget')&&!player.hasSkillTag('noCompareSource'));
				},
				check:function(event,player){
					var target=event.target,source=event.player;
					var eff1=get.effect(target,event.card,source,player);
					if(eff1>=0) return false;
					var eff2=get.effect(player,event.card,source,player);
					if(eff2>=0) return true;
					if(eff2>eff1/3) return player.hasCard(function(card){
						return (card.number>=9&&get.value(card)<=5)||get.value(card)<=3;
					});
					if(eff2>eff1/2) return player.hasCard(function(card){
						return card.number>10&&get.value(card)<=5;
					});
					return player.hasCard(function(card){
						return card.number>11&&get.value(card)<=5;
					});
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.canCompare(trigger.player)) player.chooseToCompare(trigger.player);
					else event.finish();
					'step 2'
					trigger.targets.remove(trigger.target);
					trigger.getParent().triggeredTargets1.remove(trigger.target);
					trigger.untrigger();
					if(!result.bool) trigger.targets.push(player);
				},
			},
			fengjie:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return game.hasPlayer((current)=>(current!=player));
				},
				content:function(){
					'step 0'
					player.chooseTarget('请选择【奉节】的目标','选择一名其他角色并获得如下效果直到你下回合开始：一名角色的结束阶段开始时，你将手牌摸至（至多摸至四张）或弃置至与其体力值相等。',lib.filter.notMe,true).set('ai',function(target){
						return (target.hp-player.countCards('h'))/get.threaten(target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						game.log(player,'选择了',target);
						player.storage.fengjie2=target;
						player.addTempSkill('fengjie2',{player:'phaseBegin'});
						game.delayx();
					}
				},
			},
			fengjie2:{
				audio:'fengjie',
				trigger:{global:'phaseJieshuBegin'},
				forced:true,
				charlotte:true,
				onremove:true,
				filter:function(event,player){
					if(!player.storage.fengjie2||!player.storage.fengjie2.isIn()) return false;
					var num1=player.countCards('h'),num2=player.storage.fengjie2.hp;
					return num1!=num2;
				},
				logTarget:(event,player)=>player.storage.fengjie2,
				content:function(){
					var num1=player.countCards('h'),num2=player.storage.fengjie2.hp;
					if(num1>num2) player.chooseToDiscard('h',true,num1-num2);
					else player.drawTo(Math.min(num1+4,num2));
				},
			},
			//陈武董袭
			spyilie:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				content:function(){
					'step 0'
					player.chooseControl('选项一','选项二','背水！','cancel2').set('choiceList',[
						'本阶段内使用【杀】的次数上限+1',
						'本回合内使用【杀】被【闪】抵消时摸一张牌',
						'背水！失去1点体力并依次执行上述所有选项',
					]).set('ai',function(){
						if(player.countCards('hs',function(card){
							return get.name(card)=='sha'&&player.hasValueTarget(card);
						})>player.getCardUsable({name:'sha'})) return 0;
						return 1;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('spyilie');
						game.log(player,'选择了','#g【毅烈】','的','#y'+result.control);
						if(result.index%2==0) player.addTempSkill('spyilie_add','phaseUseEnd');
						if(result.index>0) player.addTempSkill('spyilie_miss');
						if(result.index==2) player.loseHp();
					}
				},
				subSkill:{
					add:{
						charlotte:true,
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+1;
							},
						},
					},
					miss:{
						charlotte:true,
						audio:'spyilie',
						trigger:{player:'shaMiss'},
						forced:true,
						content:function(){
							player.draw();
						},
					},
				},
			},
			spfenming:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:(event,player)=>game.hasPlayer((current)=>lib.skill.spfenming.filterTarget(null,player,current)),
				filterTarget:function(card,player,target){
					if(target.hp>player.hp) return false;
					return !target.isLinked()||target.hasCard(function(card){
						return lib.filter.canBeGained(card,player,target);
					},target==player?'e':'he');
				},
				content:function(){
					if(!target.isLinked()) target.link();
					else player.gainPlayerCard(target,target==player?'e':'he',true);
				},
				ai:{
					order:7,
					result:{
						player:function(player,target){
							if(!target.isLinked()) return get.effect(target,{name:'tiesuo'},player,player);
							return get.effect(target,{name:'shunshou_copy2'},player,player);
						},
					},
				},
			},
			//曹真
			disordersidi:{audio:2},
			discretesidi:{
				audio:'disordersidi',
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					return get.type(event.card,false)!='delay'&&game.hasPlayer(function(current){
						return player!=current&&(!player.storage.discretesidi||!player.storage.discretesidi.contains(current));
					});
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt('discretesidi'),'选择两名角色a,b建立二元序偶<a,b>，或仅选择一名角色，建立二元序偶<a,a>',[1,2],function(card,player,target){
						if(ui.selected.targets.length) return true;
						return target!=player&&(!player.storage.discretesidi||!player.storage.discretesidi.contains(target));
					}).set('complexTarget',true).set('complexSelect',true).set('targetprompt',['第一元素','第二元素']).set('ai',function(target){
						var player=_status.event.player;
						if(!ui.selected.targets.length){
							if(target.getEnemies().length==1) return 2+Math.random();
							return 1+Math.random();
						}
						var targetx=ui.selected.targets[0];
						if(targetx.getEnemies().contains(target)&&targetx.inRange(target)) return Math.random()-0.5;
						return 0;
					}).animate=false;
					'step 1'
					if(result.bool&&result.targets.length){
						var targets=result.targets;
						player.logSkill('discretesidi',targets[0]);
						if(targets.length==1) targets.push(targets[0]);
						if(!player.storage.discretesidi) player.storage.discretesidi=[];
						if(!player.storage.discretesidi2) player.storage.discretesidi2=[];
						player.storage.discretesidi.push(targets[0]);
						player.storage.discretesidi2.push(targets[1]);
						player.markSkill('discretesidi');
						game.delayx();
					}
				},
				intro:{
					content:function(storage,player){
						if((player==game.me||player.isUnderControl())&&!game.observe){
							var str='R={ ';
							for(var i=0;i<storage.length;i++){
								str+=('&lt;'+get.translation(storage[i])+', '+get.translation(player.storage.discretesidi2[i])+'&gt;');
								if(i<storage.length-1) str+=', ';
							}
							str+=' }'
							return str;
						}
						return '已指定'+get.translation(storage)+'为目标';
					},
				},
				onremove:function(player){
					delete player.storage.discretesidi;
					delete player.storage.discretesidi2;
				},
				group:['discretesidi_clear','discretesidi_exec'],
				subSkill:{
					clear:{
						trigger:{global:['useCardToPlayered','die']},
						forced:true,
						popup:false,
						locked:false,
						filter:function(event,player){
							if(!player.storage.discretesidi||!player.storage.discretesidi.contains(event.player)) return false;
							if(event.name=='die') return true;
							if(get.type(event.card,false)!='delay'){
								var index=player.storage.discretesidi.indexOf(event.player);
								return index!=-1&&(player.storage.discretesidi2[index]!=event.target||event.targets.length!=1);
							}
							return false;
						},
						content:function(){
							player.storage.discretesidi2.splice(player.storage.discretesidi.indexOf(trigger.player),1);
							player.unmarkAuto('discretesidi',[trigger.player]);
						},
					},
					exec:{
						audio:'disordersidi',
						trigger:{global:'useCardToPlayered'},
						forced:true,
						locked:false,
						filter:function(event,player){
							if(get.type(event.card,false)=='delay'||!player.storage.discretesidi||event.targets.length!=1) return false;
							var index=player.storage.discretesidi.indexOf(event.player);
							return index!=-1&&player.storage.discretesidi2[index]==event.target;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							player.storage.discretesidi2.splice(player.storage.discretesidi.indexOf(trigger.player),1);
							player.unmarkAuto('discretesidi',[trigger.player])
							if(trigger.target==player){
								player.draw();
								event.finish();
								return;
							}
							var target=trigger.player;
							event.target=target;
							player.chooseControl('cancel2').set('choiceList',[
								'取消'+get.translation(trigger.card)+'的所有目标并对'+get.translation(target)+'造成1点伤害',
								'摸两张牌',
							]).set('ai',function(){
								var player=_status.event.player,evt=_status.event.getTrigger();
								if(get.damageEffect(evt.player,player,player)>0&&get.effect(evt.target,evt.card,evt.player,player)<0) return 0;
								return 1;
							});
							'step 1'
							if(result.index==0){
								trigger.cancel();
								trigger.targets.length=0;
								trigger.getParent().triggeredTargets1.length=0;
								if(!_status.dying.length) target.damage();
							}
							else if(result.index==1) player.draw(2);
						},
					},
				}
			},
			//孙鲁班
			xinzenhui:{
				audio:2,
				trigger:{player:'useCardToPlayer'},
				filter:function(event,player){
					if(event.targets.length!=1) return false;
					var card=event.card;
					if(card.name!='sha'&&(get.type(card,null,false)!='trick'||get.color(card,false)!='black')) return false;
					if(!player.isPhaseUsing()||player.hasSkill('xinzenhui2')) return false;
					return game.hasPlayer(function(current){
						return current!=player&&current!=event.target&&lib.filter.targetEnabled2(card,player,current)&&lib.filter.targetInRange(card,player,current);
					});
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('xinzenhui'),function(card,player,target){
						if(player==target) return false;
						var evt=_status.event.getTrigger();
						return !evt.targets.contains(target)&&lib.filter.targetEnabled2(evt.card,player,target)&&lib.filter.targetInRange(evt.card,player,target);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return Math.max((target.countGainableCards(player,'he')?get.effect(target,{name:'shunshou_copy2'},player,player):0),get.effect(target,trigger.card,player,player));
					});
					"step 1"
					if(result.bool){
						player.addTempSkill('xinzenhui2','phaseUseAfter');
						var target=result.targets[0],str=get.translation(target);
						event.target=target;
						player.logSkill('xinzenhui',target);
						if(!target.countGainableCards(player,'he')) event._result={index:0};
						else player.chooseControl().set('choiceList',[
							'令'+str+'也成为'+get.translation(trigger.card)+'的目标',
							'获得'+str+'的一张牌，然后其成为'+get.translation(trigger.card)+'的使用者',
						]).set('ai',function(){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player,target=_status.event.getParent().target;
							return (target.countGainableCards(player,'he')?get.effect(target,{name:'shunshou_copy2'},player,player):0)>get.effect(target,trigger.card,player,player)?1:0;
						})
					}
					else event.finish();
					"step 2"
					if(result.index==1){
						trigger.untrigger();
						trigger.getParent().player=event.target;
						game.log(event.target,'成为了',trigger.card,'的使用者');
						player.gainPlayerCard(target,true,'he');
					}
					else{
						game.log(event.target,'成为了',trigger.card,'的额外目标');
						trigger.getParent().targets.push(event.target); 
					}
				}
			},
			xinzenhui2:{},
			xinjiaojin:{
				audio:2,
				trigger:{player:'damageBegin4'},
				filter:function(event,player){
					return player.countCards('he',{type:'equip'})&&event.source&&event.source.hasSex('male');
				},
				direct:true,
				content:function(){
					"step 0"
					var next=player.chooseToDiscard('he','骄矜：是否弃置一张装备牌防止伤害？',function(card,player){
						return get.type(card)=='equip';
					});
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
					next.logSkill='xinjiaojin';
					"step 1"
					if(result.bool){
						game.delay(0.5);
						trigger.cancel();
					}
				}
			},
			//周处
			rechuhai:{
				audio:'chuhai',
				inherit:'chuhai',
				dutySkill:true,
				locked:true,
				group:['rechuhai_add','rechuhai_achieve','rechuhai_fail'],
				derivation:'zhangming',
				prompt:'与一名其他角色进行拼点',
				subSkill:{
					add:{
						trigger:{player:'compare'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.getParent().name=='rechuhai'&&event.num1<13&&player.countCards('e')<4;
						},
						content:function(){
							var num=4-player.countCards('e');
							game.log(player,'的拼点牌点数+',num);
							trigger.num1=Math.min(13,trigger.num1+num);
						}
					},
					achieve:{
						audio:'rechuhai',
						trigger:{player:'equipAfter'},
						forced:true,
						skillAnimation:true,
						animationColor:'wood',
						filter:function(event,player){
							return player.countCards('e')>2;
						},
						content:function(){
							player.awakenSkill('rechuhai');
							game.log(player,'成功完成使命');
							if(player.isDamaged()) player.recover(player.maxHp-player.hp);
							player.removeSkill('xianghai');
							player.addSkill('zhangming');
						},
					},
					fail:{
						trigger:{player:'chooseToCompareAfter'},
						forced:true,
						filter:function(event,player){
							return event.getParent().name=='rechuhai'&&event.num1<7&&!event.result.bool;
						},
						content:function(){
							player.awakenSkill('rechuhai');
							game.log(player,'使命失败');
						},
					},
				},
			},
			zhangming:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return get.suit(event.card)=='club';
				},
				content:function(){
					trigger.directHit.addArray(game.filterPlayer(function(current){
						return current!=player;
					}));
				},
				group:'zhangming_damage',
				subSkill:{
					damage:{
						audio:'zhangming',
						trigger:{source:'damageEnd'},
						forced:true,
						usable:1,
						filter:function(event,player){
							return player!=event.player;
						},
						logTarget:'player',
						content:function(){
							var list=[],cards=[],target=trigger.player,hs=target.getCards('h');
							if(hs.length>0){
								var card=hs.randomGet();
								list.push(get.type2(card,target));
								player.showCards(card,get.translation(player)+'对'+get.translation(target)+'发动了【彰名】');
							}
							target.discard(card);
							for(var i=0;i<ui.cardPile.childNodes.length;i++){
								var type=get.type2(ui.cardPile.childNodes[i],false);
								if(!list.contains(type)){
									list.push(type);
									cards.push(ui.cardPile.childNodes[i])
								};
							}
							player.gain(cards,'gain2').gaintag.add('zhangming');
							player.addTempSkill('zhangming_keep');
						},
					},
					keep:{
						charlotte:true,
						onremove:function(player){
							player.removeGaintag('zhangming');
						},
						mod:{
							ignoredHandcard:function(card,player){
								if(card.hasGaintag('zhangming')){
									return true;
								}
							},
							cardDiscardable:function(card,player,name){
								if(name=='phaseDiscard'&&card.hasGaintag('zhangming')){
									return false;
								}
							},
						},
					},
				},
			},
			//新华歆
			yuanqing:{
				audio:2,
				trigger:{player:'phaseUseEnd'},
				forced:true,
				filter:function(event,player){
					return player.hasHistory('useCard',function(evt){
						return evt.getParent('phaseUse')==event;
					});
				},
				content:function(){
					var map={},cards=[];
					player.getHistory('useCard',function(evt){
						if(evt.getParent('phaseUse')==trigger){
							var type=get.type2(evt.card,false);
							if(!map[type]) map[type]=[];
						}
					});
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var card=ui.discardPile.childNodes[i],type=get.type2(card,false);
						if(map[type]) map[type].push(card);
					}
					for(var i in map){
						if(map[i].length) cards.push(map[i].randomGet());
					}
					if(cards.length){
						player.$gain2(cards,false);
						game.cardsGotoSpecial(cards,'toRenku');
						game.log(player,'将',cards,'置入了仁库');
						game.delayx();
					}
				},
				init:function(player){
					player.storage.renku=true;
				},
			},
			shuchen:{
				audio:2,
				init:function(player){
					player.storage.renku=true;
				},
				trigger:{global:'dying'},
				forced:true,
				filter:function(event,player){
					return _status.renku.length>4;
				},
				logTarget:'player',
				content:function(){
					player.gain(_status.renku,'gain2','fromRenku');
					_status.renku.length=0;
					game.updateRenku();
					trigger.player.recover();
				},
			},
			//谯周
			zhiming:{
				audio:2,
				trigger:{player:['phaseZhunbeiBegin','phaseDiscardEnd']},
				frequent:true,
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.countCards('he')>0){
						var next=player.chooseCard('he','是否将一张牌置于牌堆顶？');
						if(trigger.name=='phaseZhunbei'){
							next.set('ai',function(card){
								var player=_status.event.player,js=player.getCards('j');
								if(js.length){
									var judge=get.judge(js[0]);
									if(judge&&judge(card)>=0) return 20-get.value(card);
								}
								return 0;
							});
						}
						else next.set('ai',function(card){
							var player=_status.event.player,js=player.next.getCards('j');
							if(js.length){
								var judge=get.judge(js[0]);
								if(judge&&(judge(card)+0.01)*get.attitude(player,player.next)>0) return 20-get.value(card);
							}
							return 0;
						});
					}
					else event.finish();
					'step 2'
					if(result.bool){
						player.$throw(get.position(result.cards[0])=='e'?result.cards[0]:1,1000);
						game.log(player,'将',get.position(result.cards[0])=='e'?result.cards[0]:'#y一张手牌','置于了牌堆顶');
						player.lose(result.cards,ui.cardPile,'insert');
					}
					else event.finish();
					'step 3'
					game.updateRoundNumber();
					game.delayx();
				},
				ai:{guanxing:true},
			},
			xingbu:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				prompt2:'展示牌堆顶的三张牌，并根据其中红色牌的数量，令一名其他角色获得一种效果',
				check:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&get.attitude(player,current)>0;
					});
				},
				content:function(){
					'step 0'
					var cards=get.cards(3);
					for(var i=cards.length-1;i--;i>=0){
						ui.cardPile.insertBefore(cards[i],ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
					event.cards=cards;
					//game.cardsGotoOrdering(cards);
					player.showCards(cards,get.translation(player)+'发动了【星卜】');
					'step 1'
					var num=0;
					for(var i of cards){
						if(get.color(i,false)=='red') num++;
					}
					player.chooseTarget('选择一名其他角色获得星卜效果（'+get.cnNumber(num)+'张）',lib.filter.notMe,true).set('ai',function(target){
						var player=_status.event.player,num=_status.event.getParent().num;
						var att=get.attitude(player,target);
						if(num<3) att*=(-1);
						if(num==2&&target.hasJudge('lebu')) att*=(-1.4);
						return att;
					});
					if(num==0) num=1;
					event.num=num;
					'step 2'
					if(result.bool){
						var skill='xingbu_effect'+num,target=result.targets[0];
						player.line(target,'green');
						game.log(player,'选择了',target);
						target.addTempSkill(skill,{player:'phaseEnd'});
						target.addMark(skill,1,false);
						game.delayx();
					}
				},
				subSkill:{
					effect1:{
						charlotte:true,
						onremove:true,
						intro:{content:'准备阶段开始时弃置#张手牌'},
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							return player.countCards('h')>0;
						},
						content:function(){
							player.chooseToDiscard('h',true,player.countMark('xingbu_effect1'));
						},
					},
					effect2:{
						charlotte:true,
						onremove:true,
						intro:{content:'使用【杀】的次数上限-#，跳过弃牌阶段'},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num-player.countMark('xingbu_effect2');
							},
						},
						trigger:{player:'phaseDiscardBegin'},
						forced:true,
						content:function(){
							trigger.cancel();
						},
					},
					effect3:{
						charlotte:true,
						onremove:true,
						intro:{content:'摸牌阶段多摸2*#张牌，使用【杀】的次数上限+#。'},
						trigger:{player:['phaseDrawBegin2']},
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							if(trigger.name=='phaseDraw') trigger.num+=(player.countMark('xingbu_effect3')*2);
						},
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('xingbu_effect3');
							},
						},
					},
				},
			},
			//文鸯
			dbquedi:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				direct:true,
				usable:1,
				filter:function(event,player){
					return (event.card.name=='sha'||event.card.name=='juedou')&&event.targets.length==1&&
					(event.target.countGainableCards(player,'h')>0||player.hasCard(function(i){
						return _status.connectMode||get.type(i,player)=='basic'&&lib.filter.cardDiscardable(i,player,'dbquedi');
					},'h'));
				},
				content:function(){
					'step 0'
					var target=trigger.target;
					event.target=target;
					var list=[];
					if(target.countGainableCards(player,'h')>0) list.push('选项一');
					if(player.hasCard(function(i){
						return get.type(i,player)=='basic'&&lib.filter.cardDiscardable(i,player,'dbquedi');
					},'h')) list.push('选项二');
					list.push('背水！');
					list.push('cancel2');
					player.chooseControl(list).set('choiceList',[
						'获得'+get.translation(target)+'的一张手牌',
						'弃置一张基本牌并令'+get.translation(trigger.card)+'伤害+1',
						'背水！减1点体力上限并执行所有选项',
					]).set('prompt',get.prompt('dbquedi',target)).set('ai',function(){
						var evt=_status.event.getTrigger(),player=evt.player,target=evt.target,card=evt.card;
						if(get.attitude(player,target)>0) return 'cancel2';
						var bool1=target.countGainableCards(player,'h')>0;
						var bool2=player.hasCard(function(i){
							return get.type(i,player)=='basic'&&lib.filter.cardDiscardable(i,player,'dbquedi')&&get.value(card,player)<5;
						},'h')&&!target.hasSkillTag('filterDamage',null,{
							player:player,
							card:card,
						});
						if(bool1&&bool2&&(target.hp<=2||(player.isDamaged()&&player.maxHp>3))) return '背水！';
						if(bool1) return '选项一';
						if(bool2) return '选项二';
						return 'cancel2';
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('dbquedi',target);
						event.control=result.control;
						if(event.control=='背水！') player.loseMaxHp();
					}
					else{
						player.storage.counttrigger.dbquedi--;
						event.finish();
					}
					'step 2'
					if((event.control=='选项一'||event.control=='背水！')&&target.countGainableCards(player,'h')>0) player.gainPlayerCard(target,true,'h');
					'step 3'
					if((event.control=='选项二'||event.control=='背水！')&&player.hasCard(function(i){
						return get.type(i,player)=='basic'&&lib.filter.cardDiscardable(i,player,'dbquedi');
					},'h')){
						player.chooseToDiscard('h','弃置一张基本牌',{type:'basic'},true);
					}
					else event.finish();
					'step 4'
					if(result.bool) trigger.getParent().baseDamage++;
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||!arg.target||(arg.card.name!='sha'&&arg.card.name!='juedou')) return false;
						if(player.storage.counttrigger&&player.storage.counttrigger.dbquedi&&player.storage.counttrigger.dbquedi>0) return false;
						if(arg.target.countCards('h')==1&&(arg.card.name!='sha'||!arg.target.getEquip('bagua')||player.hasSkillTag('unequip',false,{
							name:arg.card?arg.card.name:null,
							target:arg.target,
							card:arg.card
						})||player.hasSkillTag('unequip_ai',false,{
							name:arg.card?arg.card.name:null,
							target:arg.target,
							card:arg.card
						}))) return true;
						return false;
					},
				},
			},
			dbzhuifeng:{
				audio:2,
				groupSkill:true,
				enable:'phaseUse',
				usable:2,
				viewAsFilter:function(player){
					return player.group=='wei'&&player.hp>0;
				},
				viewAs:{name:'juedou',isCard:true},
				filterCard:()=>false,
				selectCard:-1,
				log:false,
				precontent:function(){
					player.logSkill('dbzhuifeng');
					player.loseHp();
				},
				ai:{
					order:function(){
						return get.order({name:'juedou'})-0.5;
					},
				},
				group:'dbzhuifeng_self',
				subSkill:{
					self:{
						trigger:{player:'damageBegin2'},
						forced:true,
						filter:function(event,player){
							var evt=event.getParent();
							return evt.skill=='dbzhuifeng'&&evt.player==player;
						},
						content:function(){
							trigger.cancel();
							player.getStat().skill.dbzhuifeng=2;
						},
					},
				},
			},
			dbchongjian:{
				audio:2,
				groupSkill:true,
				hiddenCard:function(player,name){
					if(player.group=='wu'&&(name=='sha'||name=='jiu')&&player.hasCard(function(card){
						return get.type(card)=='equip';
					},'hes')) return true;
					return false;
				},
				enable:'chooseToUse',
				filter:function(event,player){
					return player.group=='wu'&&player.hasCard(function(card){
						return get.type(card)=='equip';
					},'hes')&&(event.filterCard({name:'sha'},player,event)||event.filterCard({name:'jiu'},player,event));
				},
				locked:false,
				mod:{
					targetInRange:function(card){
						if(card.storage&&card.storage.dbchongjian) return true;
					},
				},
				chooseButton:{
					dialog:function(){
						var list=[];
						list.push(['基本','','sha']);
						for(var i of lib.inpile_nature) list.push(['基本','','sha',i]);
						list.push(['基本','','jiu']);
						return ui.create.dialog('冲坚',[list,'vcard']);
					},
					filter:function(button,player){
						var evt=_status.event.getParent();
						return evt.filterCard({name:button.link[2],nature:button.link[3],isCard:true},player,evt);
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(button.link[2]=='jiu'&&(player.hasCard(function(card){
							return get.name(card)=='sha';
						},'hs')||player.countCards('hes',function(card){
							if(get.type(card)!='equip') return false;
							if(get.position(card)=='e'){
								if(player.hasSkillTag('noe')) return (10-get.value(card))>0;
								var sub=get.subtype(card);
								if(player.hasCard(function(card){
									return get.subtype(card)==sub&&player.canUse(card,player)&&get.effect(player,card,player,player)>0;
								},'hs')) return (10-get.value(card))>0;
							}
							return (5-get.value(card))>0;
						})>1)) return player.getUseValue({name:'jiu'})*4;
						return player.getUseValue({name:button.link[2],nature:button.link[3]},false);
					},
					backup:function(links,player){
						return {
							audio:'dbchongjian',
							viewAs:{
								name:links[0][2],
								nature:links[0][3],
								//isCard:true,
								storage:{dbchongjian:true},
							},
							filterCard:{type:'equip'},
							position:'hes',
							popname:true,
							precontent:function(){
								player.addTempSkill('dbchongjian_effect');
							},
							check:function(card){
								var player=_status.event.player;
								if(get.position(card)=='e'){
									if(player.hasSkillTag('noe')) return 10-get.value(card);
									var sub=get.subtype(card);
									if(player.hasCard(function(card){
										return get.subtype(card)==sub&&player.canUse(card,player)&&get.effect(player,card,player,player)>0;
									},'hs')) return 10-get.value(card);
								}
								return 5-get.value(card);
							},
						}
					},
					prompt:function(links){
						return '将一张装备牌当做'+(links[0][3]?get.translation(links[0][3]):'')+'【'+get.translation(links[0][2])+'】使用';
					},
				},
				ai:{
					unequip:true,
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(tag=='unequip'){
							if(player.group!='wu'||!arg||!arg.card||!arg.card.storage||!arg.card.storage.dbchongjian) return false;
							return true
						}
						return player.group=='wu'&&arg=='use'&&player.hasCard(function(card){
							return get.type(card)=='equip';
						},'hes');
					},
					order:function(item,player){
						if(_status.event.type!='phase') return 1;
						var player=_status.event.player;
						if(player.hasCard(function(card){
							if(get.value(card,player)<0) return true;
							var sub=get.subtype(card);
							return player.hasCard(function(card){
								return get.subtype(card)==sub&&player.canUse(card,player)&&get.effect(player,card,player,player)>0;
							},'hs')>0;
						},'e')) return 10;
						if(player.countCards('hs','sha')||player.countCards('he',function(card){
							return get.type(card)=='equip'&&get.value(card,player)<5;
						})>1) return get.order({name:'jiu'})-0.1;
						return get.order({name:'sha'})-0.1;
					},
					result:{player:1},
				},
				subSkill:{
					effect:{
						charlotte:true,
						mod:{
							targetInRange:function(card){
								if(card.storage&&card.storage.dbchongjian) return true;
							},
						},
						trigger:{source:'damageSource'},
						forced:true,
						logTarget:'player',
						filter:function(event,player){
							return event.parent.skill=='dbchongjian_backup'&&event.card.name=='sha'&&event.getParent().name=='sha'&&event.player.countGainableCards(player,'e')>0;
						},
						content:function(){
							player.gainPlayerCard(trigger.player,'e',true,trigger.num);
						},
					},
				},
			},
			dbchoujue:{
				audio:2,
				trigger:{source:'dieAfter'},
				forced:true,
				content:function(){
					player.gainMaxHp();
					player.draw(2);
					player.addSkill('counttrigger');
					if(!player.storage.counttrigger) player.storage.counttrigger={};
					if(!player.storage.counttrigger.dbquedi) player.storage.counttrigger.dbquedi=0;
					player.storage.counttrigger.dbquedi--;
				},
			},
			//顾雍
			xinshenxing:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return (player.getStat('skill').xinshenxing||0)<player.hp&&player.countCards('he')>1;
				},
				selectCard:2,
				position:'he',
				check:function(card){
					if(!ui.selected.cards.length||get.color(card)!=get.color(ui.selected.cards[0])) return 6.5-get.value(card);
					return 6.5-get.value(card)-get.value(ui.selected.cards[0]);
				},
				filterCard:true,
				content:function(){
					player.draw(get.color(cards)=='none'?2:1);
				},
				ai:{
					order:1,
					result:{player:1},
				},
			},
			xinbingyi:{
				audio:'bingyi',
				audioname:['xin_guyong'],
				trigger:{player:'phaseJieshuBegin'},
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterx:function(event,player){
					var cards=player.getCards('h');
					if(cards.length==1) return true;
					var color=get.color(cards[0],player),type=get.type2(cards[0],player);
					for(var i=1;i<cards.length;i++){
						if(color&&get.color(cards[i],player)!=color) color=false;
						if(type&&get.type2(cards[i],player)!=type) type=false;
						if(!color&&!type) return false;
					}
					return true;
				},
				direct:true,
				content:function(){
					"step 0"
					if(lib.skill.xinbingyi.filterx(trigger,player)){
						player.chooseTarget(get.prompt('xinbingyi'),'展示所有手牌，并选择至多'+get.cnNumber(player.countCards('h'))+'名角色各摸一张牌',[0,player.countCards('h')],function(card,player,target){
							return true;
						}).set('ai',function(target){
							return get.attitude(_status.event.player,target);
						});
					}
					else player.chooseBool(get.prompt('bingyi'),'展示所有手牌').ai=function(){return false};
					"step 1"
					if(result.bool){
						player.logSkill('xinbingyi');
						player.showHandcards(get.translation(player)+'发动了【秉壹】');
						event.targets=result.targets;
					}
					else{
						event.finish();
					}
					"step 2"
					if(targets&&targets.length){
						player.line(targets,'green');
						targets.sortBySeat();
						game.asyncDraw(targets);
					}
				},
				ai:{
					expose:0.1,
				}
			},
			//钟会
			requanji:{
				audio:2,
				trigger:{player:['damageEnd','phaseUseEnd']},
				frequent:true,
				locked:false,
				notemp:true,
				filter:function(event,player){
					if(event.name=='phaseUse') return player.countCards('h')>player.hp;
					return event.num>0;
				},
				content:function(){
					"step 0"
					event.count=trigger.num||1;
					"step 1"
					event.count--;
					player.draw();
					"step 2"
					if(player.countCards('h')){
						player.chooseCard('将一张手牌置于武将牌上作为“权”',true);
					}
					else{
						event.goto(4);
					}
					"step 3"
					if(result.cards&&result.cards.length){
						player.addToExpansion(result.cards,player,'give').gaintag.add('quanji');
					}
					"step 4"
					if(event.count>0){
						player.chooseBool(get.prompt2('requanji')).set('frequentSkill','requanji');
					}
					else event.finish();
					"step 5"
					if(result.bool){
						player.logSkill('requanji');
						event.goto(1);
					}
				},
				mod:{
					maxHandcard:function(player,num){
						return num+player.getExpansions('quanji').length;
					}
				},
				onremove:function(player,skill){
					var cards=player.getExpansions('quanji');
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					threaten:0.8,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasFriend()) return;
								if(target.hp>=4) return [0.5,get.tag(card,'damage')*2];
								if(!target.hasSkill('paiyi')&&target.hp>1) return [0.5,get.tag(card,'damage')*1.5];
								if(target.hp==3) return [0.5,get.tag(card,'damage')*1.5];
								if(target.hp==2) return [1,get.tag(card,'damage')*0.5];
							}
						}
					}
				}
			},
			//王凌
			xingqi:{
				audio:2,
				trigger:{player:'useCard'},
				forced:true,
				locked:false,
				filter:function(event,player){
					return get.type(event.card,false)!='delay'&&!player.getStorage('xingqi').contains(event.card.name);
				},
				content:function(){
					player.markAuto('xingqi',[trigger.card.name]);
					game.log(player,'获得了一个','#g【备('+get.translation(trigger.card.name)+')】');
				},
				marktext:'备',
				intro:{
					content:'$',
					onunmark:function(storage,player){
						delete player.storage.xingqi;
					},
				},
				group:'xingqi_gain',
				subSkill:{
					gain:{
						trigger:{player:'phaseJieshuBegin'},
						direct:true,
						filter:function(event,player){
							return player.getStorage('xingqi').length>0;
						},
						content:function(){
							'step 0'
							player.removeSkill('mibei_mark');
							player.chooseButton(['星启：是否获得一张牌？',[player.getStorage('xingqi'),'vcard']]).set('ai',function(button){
								var card={name:button.link[2]},player=_status.event.player;
								if(!get.cardPile2(function(cardx){
									return cardx.name==card.name;
								})) return 0;
								return get.value(card,player)*player.getUseValue(card);
							});
							'step 1'
							if(result.bool){
								player.logSkill('xingqi');
								var name=result.links[0][2];
								game.log(player,'移去了一个','#g【备('+get.translation(name)+')】');
								player.unmarkAuto('xingqi',[name]);
								var card=get.cardPile2(function(card){
									return card.name==name;
								});
								if(card) player.gain(card,'gain2');
							}
						},
					},
				},
			},
			xinzifu:{
				audio:'zifu',
				trigger:{player:'phaseUseEnd'},
				forced:true,
				filter:function(event,player){
					return player.getStorage('xingqi').length>0&&!player.hasHistory('useCard',function(evt){
						return evt.getParent('phaseUse')==event;
					});
				},
				content:function(){
					game.log(player,'移去了所有','#g【备】');
					player.unmarkSkill('xingqi');
				},
				ai:{
					neg:true,
					combo:'xingqi',
				},
			},
			mibei:{
				audio:2,
				trigger:{player:'useCardAfter'},
				dutySkill:true,
				forced:true,
				skillAnimation:true,
				animationColor:'water',
				filter:function(event,player){
					if(!player.storage.xingqi||!player.storage.xingqi.length) return false;
					var map={basic:0,trick:0,equip:0};
					for(var i of player.storage.xingqi){
						var type=get.type(i);
						if(typeof map[type]=='number') map[type]++;
					}
					for(var i in map){
						if(map[i]<2) return false;
					}
					return true;
				},
				content:function(){
					'step 0'
					game.log(player,'成功完成使命');
					player.awakenSkill('mibei');
					var list=['basic','equip','trick'],cards=[];
					for(var i of list){
						var card=get.cardPile2(function(card){
							return get.type(card)==i;
						});
						if(card) cards.push(card);
					}
					if(cards.length) player.gain(cards,'gain2');
					'step 1'
					player.addSkill('xinmouli');
				},
				group:['mibei_fail','mibei_silent'],
				derivation:'xinmouli',
				subSkill:{
					silent:{
						trigger:{player:'phaseZhunbeiBegin'},
						silent:true,
						lastDo:true,
						filter:function(event,player){
							return !player.getStorage('xingqi').length;
						},
						content:function(){
							player.addTempSkill('mibei_mark');
						},
						charlotte:true,
					},
					mark:{},
					fail:{
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						filter:function(event,player){
							return !player.getStorage('xingqi').length&&player.hasSkill('mibei_mark');
						},
						content:function(){
							game.log(player,'使命失败');
							player.awakenSkill('mibei');
							player.loseMaxHp();
						},
					},
				},
			},
			xinmouli:{
				audio:'mouli',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.getStorage('xingqi').length>0;
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					target.chooseButton(['谋立：是否获得一张牌？',[player.getStorage('xingqi'),'vcard']],true).set('ai',function(button){
						var card={name:button.link[2]},player=_status.event.player;
						return get.value(card,player);
					});
					'step 1'
					if(result.bool){
						var name=result.links[0][2];
						game.log(player,'移去了一个','#g【备('+get.translation(name)+')】');
						player.unmarkAuto('xingqi',[name]);
						var card=get.cardPile2(function(card){
							return card.name==name;
						});
						if(card) target.gain(card,'gain2');
					}
				},
				ai:{
					combo:'xingqi',
					order:1,
					result:{
						target:function(player,target){
							if(target.hasSkillTag('nogain')) return 0;
							return 1;
						},
					},
				},
			},
			//孔融
			xinlirang:{
				audio:'splirang',
				trigger:{global:'phaseDrawBegin2'},
				logTarget:'player',
				filter:function(event,player){
					return !event.numFixed&&event.player!=player&&player.countMark('xinlirang')==0;
				},
				prompt2:'获得一枚“谦”并令其多摸两张牌',
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				content:function(){
					trigger.num+=2;
					player.addMark('xinlirang',1);
					player.addTempSkill('xinlirang_gain');
				},
				marktext:'谦',
				intro:{
					name:'谦',
					content:'mark',
				},
				group:'xinlirang_skip',
				subSkill:{
					gain:{
						audio:'splirang',
						trigger:{global:'phaseDiscardEnd'},
						direct:true,
						filter:function(event,player){
							return event.player.hasHistory('lose',function(evt){
								return evt.type=='discard'&&evt.cards2.filterInD('d').length>0&&evt.getParent('phaseDiscard')==event;
							});
						},
						content:function(){
							'step 0'
							var cards=[];
							trigger.player.getHistory('lose',function(evt){
								if(evt.type=='discard'&&evt.getParent('phaseDiscard')==trigger) cards.addArray(evt.cards2.filterInD('d'));
							});
							player.chooseButton(['礼让：是否获得其中至多两张牌？',cards],[1,2]);
							'step 1'
							if(result.bool){
								player.logSkill('xinlirang_gain',trigger.player);
								player.gain(result.links,'gain2');
							}
						},
					},
					skip:{
						audio:'splirang',
						trigger:{player:'phaseDrawBefore'},
						forced:true,
						filter:function(event,player){
							return player.hasMark('xinlirang');
						},
						content:function(){
							trigger.cancel();
							player.removeMark('xinlirang',player.countMark('xinlirang'));
						},
					},
				},
			},
			xinmingshi:{
				audio:'spmingshi',
				trigger:{player:'damageEnd'},
				forced:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source&&event.source.isIn()&&player.hasMark('xinlirang')&&event.source.countCards('he')>0;
				},
				content:function(){
					'step 0'
					trigger.source.chooseToDiscard('he',true).set('color',get.attitude(trigger.source,player)>0?'red':'black').set('ai',function(card){
						return (get.color(card)==_status.event.color?4:0)-get.value(card);
					});
					'step 1'
					if(result.bool&&result.cards&&result.cards.length){
						var card=result.cards[0];
						if(get.color(card,trigger.source)=='red') player.recover();
						else if(get.position(card,true)=='d') player.gain(card,'gain2');
					}
				},
				ai:{
					combo:'xinmingshi',
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')&&target.hasMark('xinlirang')){
								var cards=[card];
								if(card.cards&&card.cards.length) cards.addArray(card.cards);
								if(ui.selected.cards.length) cards.addArray(ui.selected.cards);
								if(!player.countCards('he',function(card){
									return !cards.contains(card);
								})) return;
								if(!player.countCards('h',function(card){
									return !cards.contains(card)&&get.color(card)=='black'&&get.value(card,player)<6;
								})) return 'zerotarget';
								return 0.5;
							}
						},
					},
				},
			},
			//糜夫人
			xinguixiu:{
				audio:'spguixiu',
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					return player.hp%2==1||player.isDamaged();
				},
				content:function(){
					if(player.hp%2==1) player.draw();
					else player.recover();
				},
			},
			qingyu:{
				audio:2,
				dutySkill:true,
				trigger:{player:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					return player.countCards('he',function(card){
						return lib.filter.cardDiscardable(card,player,'qingyu');
					})>1;
				},
				content:function(){
					trigger.cancel();
					player.chooseToDiscard(2,'he',true);
				},
				group:['qingyu_achieve','qingyu_fail'],
				subSkill:{
					achieve:{
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						skillAnimation:true,
						animationColor:'fire',
						filter:function(event,player){
							return player.isHealthy()&&player.countCards('h')==0;
						},
						content:function(){
							game.log(player,'成功完成使命');
							player.awakenSkill('qingyu');
							player.addSkillLog('xuancun');
						},
					},
					fail:{
						trigger:{player:'dying'},
						forced:true,
						content:function(){
							game.log(player,'使命失败');
							player.awakenSkill('qingyu');
							player.loseMaxHp();
						},
					},
				},
				derivation:'xuancun',
			},
			xuancun:{
				audio:2,
				trigger:{global:'phaseEnd'},
				filter:function(event,player){
					return player!=event.player&&player.countCards('h')<player.hp;
				},
				logTarget:'player',
				check:function(event,player){
					return get.attitude(player,event.player)>0;
				},
				prompt2:function(event,player){
					return '令其摸'+get.cnNumber(Math.min(2,player.hp-player.countCards('h')))+'张牌';
				},
				content:function(){
					trigger.player.draw(Math.min(2,player.hp-player.countCards('h')));
				},
			},
			//蔡夫人
			xinqieting:{
				audio:2,
				trigger:{global:'phaseEnd'},
				direct:true,
				filter:function(event,player){
					return player!=event.player&&event.player.getHistory('sourceDamage',function(evt){
						return evt.player!=event.player;
					}).length==0;
				},
				content:function(){
					'step 0'
					var list=['摸一张牌'],target=trigger.player,str=get.translation(target);
					event.target=target;
					event.addIndex=0;
					if(target.countCards('h')>0) list.push('观看'+str+'的两张手牌并获得其中一张');
					else event.addIndex++;
					if(target.countCards('e',function(card){
						return player.canEquip(card);
					})>0) list.push('将'+str+'装备区内的一张牌移动至自己的装备区');
					player.chooseControl('cancel2').set('choiceList',list).set('prompt',get.prompt('xinqieting',target)).set('ai',function(){
						var evt=_status.event.getParent();
						if(get.attitude(evt.player,evt.target)>0) return 0;
						var val=evt.target.hasSkillTag('noe')?6:0;
						if(evt.target.countCards('e',function(card){
							return evt.player.canEquip(card)&&get.value(card,evt.target)>val&&get.effect(evt.player,card,evt.player,evt.player)>0;
						})>0) return 2-evt.addIndex;
						if(evt.target.countCards('h')>0) return 1;
						return 0;
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('xinqieting',target);
						if(result.index==0){
							player.draw();
							event.finish();
						}
						else if(result.index+event.addIndex==1){
							player.choosePlayerCard(target,'h',2,true);
							player.addExpose(0.2);
							event.goto(3);
						}
						else{
							player.addExpose(0.1);
							player.choosePlayerCard(target,'e',true).set('filterButton',function(button){
								return _status.event.player.canEquip(button.link);
							}).set('ai',function(button){
								var player=_status.event.player;
								return get.effect(player,button.link,player,player);
							});
						}
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var card=result.cards[0];
						target.$give(card,player,false);
						game.delay(0.5);
						player.equip(card);
					}
					event.finish();
					'step 3'
					if(result.bool) player.chooseButton(['选择获得一张牌',result.cards],true);
					else event.finish();
					'step 4'
					if(result.bool){
						var card=result.links[0];
						if(lib.filter.canBeGained(card,player,target)) player.gain(card,target,'giveAuto','bySelf');
						else game.log('但',card,'不能被',player,'获得！');
					}
				},
			},
			//羊祜
			mingfa:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return player.storage.mingfa&&player.countCards('h')>0&&player.getCards('he').contains(player.storage.mingfa)
					&&!player.hasSkillTag('noCompareSource')&&game.hasPlayer(function(current){
						return current!=player&&player.canCompare(current);
					});
				},
				content:function(){
					'step 0'
					event.card=player.storage.mingfa;
					delete player.storage.mingfa;
					player.chooseTarget(get.prompt('mingfa'),'用'+get.translation(event.card)+'和一名其他角色拼点',function(card,player,target){
						return player.canCompare(target);
					}).set('ai',function(target){
						var player=_status.event.player,card=_status.event.getParent().card;
						if(card.number>9||!target.countCards('h',function(cardx){
							return cardx.number>=card.number+2;
						})) return -get.attitude(player,target)/Math.sqrt(target.countCards('h'));
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('mingfa',target);
						var next=player.chooseToCompare(target);
						if(!next.fixedResult) next.fixedResult={};
						next.fixedResult[player.playerid]=event.card;
					}
					else{
						player.removeGaintag('mingfa');
						event.finish();
					}
					'step 2'
					if(result.bool){
						player.gainPlayerCard(target,true,'he');
						if(event.card.number==1) event.finish();
					}
					else{
						player.addTempSkill('mingfa_block');
						event.finish();
					}
					'step 3'
					var card=get.cardPile2(function(card){
						return card.number==event.card.number-1;
					});
					if(card) player.gain(card,'gain2');
				},
				group:['mingfa_choose','mingfa_add','mingfa_mark'],
				subSkill:{
					block:{
						mod:{
							playerEnabled:function(card,player,target){
								if(player!=target) return false;
							},
						},
					},
					choose:{
						trigger:{player:'phaseJieshuBegin'},
						direct:true,
						filter:function(event,player){
							return player.countCards('he')>0;
						},
						content:function(){
							'step 0'
							player.chooseCard('he',get.prompt('mingfa'),'选择展示自己的一张牌').set('ai',function(card){
								return Math.min(13,get.number(card)+2)/Math.pow(Math.min(2,get.value(card)),0.25);
							});
							'step 1'
							if(result.bool){
								var card=result.cards[0];
								player.logSkill('mingfa');
								player.removeGaintag('mingfa');
								player.addGaintag(card,'mingfa');
								player.storage.mingfa=card;
								player.showCards(card,get.translation(player)+'发动了【明伐】');
							}
						},
					},
					add:{
						trigger:{player:'compare',target:'compare'},
						filter:function(event){
							return !event.iwhile;
						},
						forced:true,
						locked:false,
						content:function(){
							if(player==trigger.player){
								trigger.num1+=2;
								if(trigger.num1>13) trigger.num1=13;
							}
							else{
								trigger.num2+=2;
								if(trigger.num2>13) trigger.num2=13;
							}
							game.log(player,'的拼点牌点数+2')
						},
					},
					mark:{
						trigger:{player:'gainEnd'},
						silent:true,
						firstDo:true,
						filter:function(event,player){
							return player.storage.mingfa&&event.cards.contains(player.storage.mingfa)&&player.getCards('h').contains(player.storage.mingfa);
						},
						content:function(){
							player.addGaintag(player.storage.mingfa,'mingfa');
						},
					},
				},
			},
			rongbei:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return game.hasPlayer((current)=>lib.skill.rongbei.filterTarget(null,player,current));
				},
				filterTarget:function(card,player,target){
					for(var i=1;i<6;i++){
						if(target.isEmpty(i)) return true;
					}
					return false;
				},
				content:function(){
					'step 0'
					event.num=0;
					player.awakenSkill('rongbei');
					'step 1'
					while(!target.isEmpty(event.num)){
						event.num++;
						if(event.num>5){
							event.finish();
							return;
						}
					}
					var card=get.cardPile2(function(card){
						return get.subtype(card)=='equip'+event.num&&target.canUse(card,target);
					});
					if(card){
						target.chooseUseTarget(card,true,'nopopup');
					}
					event.num++;
					if(event.num<=5) event.redo();
				},
				ai:{
					order:5,
					result:{
						target:function(player,target){
							return (target.hasSkillTag('noe')?2:1)*(5-target.countCards('e')-target.countDisabled());
						},
					},
				},
			},
			//桥公
			yizhu:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				locked:false,
				content:function(){
					'step 0'
					player.draw(2);
					'step 1'
					var hs=player.getCards('he');
					if(!hs.length) event.finish();
					else if(hs.length<=2) event._result={bool:true,cards:hs};
					else player.chooseCard('he',true,2,'选择两张牌洗入牌堆');
					'step 2'
					if(result.bool){
						player.$throw(result.cards.length,1000);
						player.lose(result.cards,ui.cardPile).insert_index=function(){
							return ui.cardPile.childNodes[get.rand(0,game.players.length*2-2)];
						}
						player.markAuto('yizhu',result.cards);
					}
					else event.finish();
					'step 3'
					game.updateRoundNumber();
					game.delayx();
				},
				intro:{
					mark:function(dialog,content,player){
						if(player==game.me||player.isUnderControl()) dialog.addAuto(content);
						else{
							var names=[];
							for(var i of content) names.add(i.name);
							return get.translation(names);
						}
					},
				},
				group:['yizhu_use','yizhu_discard'],
				subSkill:{
					use:{
						audio:'yizhu',
						trigger:{global:'useCardToPlayer'},
						filter:function(event,player){
							return player.storage.yizhu&&player.storage.yizhu.length&&
							event.player!=player&&event.targets.length==1&&
							event.cards.filter(function(i){
								return player.storage.yizhu.contains(i);
							}).length>0;
						},
						logTarget:'player',
						check:function(event,player){
							return get.effect(event.targets[0],event.card,event.player,player)<0;
						},
						prompt2:function(event,player){
							return '令'+get.translation(event.card)+'无效并可重新使用';
						},
						content:function(){
							trigger.cancel();
							trigger.targets.length=0;
							trigger.getParent().triggeredTargets1.length=0;
							var list=trigger.cards.filter(function(i){
								return player.storage.yizhu.contains(i);
							});
							player.unmarkAuto('yizhu',list);
							game.delayx();
							player.chooseUseTarget(trigger.card,trigger.cards,false,'nothrow');
						},
					},
					discard:{
						trigger:{
							global:['loseAfter','cardsDiscardAfter'],
						},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.storage.yizhu&&player.storage.yizhu.length&&(event.name!='lose'||event.position==ui.discardPile)&&event.cards.filter(function(i){
								return player.storage.yizhu.contains(i);
							}).length>0;
						},
						content:function(){
							var list=trigger.cards.filter(function(i){
								return player.storage.yizhu.contains(i);
							});
							player.unmarkAuto('yizhu',list);
							player.draw();
						},
					},
				},
			},
			luanchou:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				selectTarget:2,
				filterTarget:true,
				multitarget:true,
				multiline:true,
				content:function(){
					game.countPlayer(function(current){
						var num=current.countMark('luanchou');
						if(num) current.removeMark('luanchou',num);
					});
					targets.sortBySeat();
					for(var i of targets) i.addMark('luanchou',1);
				},
				global:['gonghuan','gonghuan_clear'],
				derivation:'gonghuan',
				marktext:'姻',
				intro:{
					name:'共患',
					content:'锁定技。每回合限一次，一名其他角色受到伤害时，若其拥有“姻”标记且其体力值小于你，则你将伤害转移给自己。此伤害结算结束后，若你与其体力值相等，则你与其移去“姻”标记。',
					onunmark:true,
				},
				ai:{
					order:10,
					expose:0.2,
					result:{
						target:function(player,target){
							if(!ui.selected.targets.length) return -Math.pow(target.hp,3);
							if(target.hp>=ui.selected.targets[0].hp) return 0;
							return Math.pow(ui.selected.targets[0].hp-target.hp,3);
						},
					},
				},
			},
			gonghuan:{
				audio:2,
				forceaudio:true,
				trigger:{global:'damageBegin4'},
				usable:1,
				forced:true,
				logTarget:'player',
				filter:function(event,player){
					return event.player.hp<player.hp&&player.hasMark('luanchou')&&event.player.hasMark('luanchou')&&game.hasPlayer(function(current){
						return current.hasSkill('luanchou');
					});
				},
				content:function(){
					trigger._gonghuan_player=trigger.player;
					trigger.player=player;
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(_status.luanchou_judging) return;
							_status.luanchou_judging=true;
							if(get.tag(card,'damage')&&target.hasMark('luanchou')){
								var other=game.findPlayer(function(current){
									return current!=target&&current.hasMark('luanchou')&&current.hp>target.hp&&(!current.storage.counttrigger||!current.storage.counttrigger.gonghuan);
								});
								if(!other){
									delete _status.luanchou_judging;
									return;
								};
								var eff=[0,0,0,get.damageEffect(other,player,target,get.nature(card))];
								delete _status.luanchou_judging;
								return eff;
							}
						},
					},
				},
				subSkill:{
					clear:{
						trigger:{player:'damageEnd'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event._gonghuan_player&&player.hp==event._gonghuan_player.hp;
						},
						content:function(){
							player.removeMark('luanchou',player.countMark('luanchou'));
							trigger._gonghuan_player.removeMark('luanchou',trigger._gonghuan_player.countMark('luanchou'));
						},
					},
				},
			},
			//刘璋
			xiusheng:{
				audio:2,
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					return player.storage.yinlang&&game.hasPlayer(function(current){
						return current.group==player.storage.yinlang;
					});
				},
				content:function(){
					'step 0'
					if(player.storage.xiusheng&&player.storage.xiusheng.length>0) player.unmarkSkill('xiusheng');
					'step 1'
					event.num=game.countPlayer(function(current){
						return current.group==player.storage.yinlang;
					});
					if(event.num>0) player.draw(event.num);
					else event.finish();
					'step 2'
					var he=player.getCards('he');
					if(!he.length) event.finish();
					else if(he.length<num) event._result={bool:true,cards:he};
					else player.chooseCard('he',true,num,'选择'+get.cnNumber(num)+'张牌作为生');
					'step 3'
					if(result.bool){
						var cards=result.cards;
						player.markAuto('xiusheng',cards);
						game.log(player,'将',cards,'放在了武将牌上');
						player.lose(cards,ui.special,'toStorage');
					}
					'step 4'
					game.delayx();
				},
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				ai:{combo:'yinlang'},
			},
			yinlang:{
				audio:2,
				trigger:{player:'phaseBegin'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('yinlang_round')&&game.hasPlayer(function(current){
						return current.group&&current.group!='unknown';
					});
				},
				content:function(){
					'step 0'
					var list=[];
					game.countPlayer(function(current){
						if(current.group&&current.group!='unknown') list.add(current.group);
					});
					list.sort(function(a,b){
						return lib.group.indexOf(a)-lib.group.indexOf(b);
					});
					if(!player.hasSkill('yinlang')) list.push('cancel2');
					player.chooseControl(list).set('prompt','引狼：请选择一个势力').set('ai',function(){
						return _status.event.choice;
					}).set('choice',function(){
						var getn=function(group){
							return game.countPlayer(function(current){
								if(current.group!=group) return false;
								if(get.attitude(current,player)>0) return 1.5;
								if(!current.inRange(player)) return 1;
								return 0.6;
							});
						}
						list.sort(function(a,b){
							return getn(b)-getn(a);
						});
						return list[0];
					}());
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('yinlang',game.filterPlayer(function(current){
							return current.group==result.control;
						}));
						game.log(player,'选择了','#y'+get.translation(result.control+2))
						player.storage.yinlang=result.control;
						player.markSkill('yinlang');
					}
				},
				ai:{combo:'xiusheng'},
				intro:{content:'已选择了$势力'},
				group:'yinlang_gain',
				subSkill:{
					round:{},
					gain:{
						audio:'yinlang',
						trigger:{global:'phaseUseBegin'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return event.player.group==player.storage.yinlang&&event.player.isIn()&&player.getStorage('xiusheng').length>0;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							var str=get.translation(player);
							event.target=trigger.player;
							event.target.chooseControl().set('choiceList',[
								'获得'+str+'的一张“生”，然后本阶段使用牌时只能指定其为目标',
								'令'+str+'获得一张“生”',
							]).set('ai',function(){
								var evt=_status.event.getParent(),player=evt.target,target=evt.player;
								if(get.attitude(player,target)>0) return 1;
								if(!player.countCards('hs',function(card){
									return player.hasValueTarget(card,null,true)&&(!player.canUse(card,target,null,true)||get.effect(target,card,player,player)<0)
								})) return 0;
								return 1;
							});
							'step 1'
							event.gainner=(result.index==0)?target:player;
							if(result.index==0) event.block=true;
							event.gainner.chooseButton(['选择获得一张“生”',player.storage.xiusheng],true);
							'step 2'
							player.unmarkAuto('xiusheng',result.links);
							event.gainner.gain(result.links,'gain2');
							if(event.block){
								target.markAuto('yinlang_block',[player]);
								target.addTempSkill('yinlang_block','phaseUseAfter');
							}
						},
					},
					block:{
						mod:{
							playerEnabled:function(card,player,target){
								var info=get.info(card);
								if(info&&info.singleCard&&ui.selected.cards.length) return;
								if(!player.getStorage('yinlang_block').contains(target)) return false;
							},
						},
						onremove:true,
					},
				},
			},
			huaibi:{
				audio:2,
				zhuSkill:true,
				mod:{
					maxHandcard:function(player,num){
						if(player.storage.yinlang&&player.hasZhuSkill('huaibi')) return num+game.countPlayer(function(current){
							return current.group==player.storage.yinlang;
						});
					},
				},
				ai:{combo:'yinlang'},
			},
			//张温
			gebo:{
				audio:2,
				trigger:{global:'recoverAfter'},
				forced:true,
				content:function(){
					game.cardsGotoSpecial(get.cards(),'toRenku');
				},
			},
			spsongshu:{
				audio:2,
				trigger:{global:'phaseDrawBegin1'},
				logTarget:'player',
				filter:function(event,player){
					return event.player.hp>player.hp&&player.hp>0&&!event.numFixed&&_status.renku.length>0;
				},
				check:function(event,player){
					var num=Math.min(5,player.hp,_status.renku.length);
					if(num<=event.num) return get.attitude(player,event.player)<0;
					return false;
				},
				content:function(){
					'step 0'
					trigger.changeToZero();
					var num=Math.min(5,player.hp,_status.renku.length);
					trigger.player.chooseButton(['选择获得'+get.cnNumber(num)+'张牌',_status.renku],true,num);
					'step 1'
					if(result.bool){
						var cards=result.links;
						_status.renku.removeArray(cards);
						game.updateRenku();
						trigger.player.gain(cards,'gain2','fromRenku');
						trigger.player.addTempSkill('spsongshu_block');
					}
				},
				init:function(player){
					player.storage.renku=true;
				},
				subSkill:{
					block:{
						mod:{
							playerEnabled:function(card,player,target){
								if(player!=target) return false;
							},
						},
						mark:true,
						intro:{content:'不能对其他角色使用牌'},
					},
				},
			},
			//张机
			jishi:{
				audio:2,
				trigger:{player:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return event.cards.filterInD().length>0&&!player.getHistory('sourceDamage',function(evt){
						return evt.card==event.card;
					}).length;
				},
				content:function(){
					var cards=trigger.cards.filterInD();
					game.log(player,'将',cards,'置于了仁库');
					game.cardsGotoSpecial(cards,'toRenku');
				},
				init:function(player){
					player.storage.renku=true;
				},
				group:'jishi_draw',
				subSkill:{
					draw:{
						trigger:{
							global:['gainAfter','cardsDiscardAfter'],
						},
						forced:true,
						filter:function(event,player){
							return event.fromRenku==true&&!event.outRange;
						},
						content:function(){
							player.draw();
						},
					},
				},
			},
			xinliaoyi:{
				audio:'liaoyi',
				trigger:{global:'phaseBegin'},
				filter:function(event,player){
					if(player==event.player) return false;
					if(_status.renku.length) return true;
					return event.player.countCards('h')>event.player.hp;
				},
				direct:true,
				content:function(){
					'step 0'
					var target=trigger.player;
					event.target=target;
					var num=Math.max(0,target.countCards('h')-target.hp);
					var choiceList=['令其从仁库中获得一张牌','令其将'+get.cnNumber(num)+'张手牌置入仁库'];
					var choices=[];
					if(_status.renku.length) choices.push('选项一');
					else choiceList[0]='<span style="opacity:0.5">'+choiceList[0]+'</span>';
					if(target.countCards('h')>target.hp){
						event.num=num;
						choices.push('选项二');
					}
					else choiceList[1]='<span style="opacity:0.5">'+choiceList[1]+'</span>';
					if(!choices.length) event.finish();
					else player.chooseControl(choices,'cancel2').set('prompt',get.prompt('xinliaoyi',target)).set('choiceList',choiceList).set('ai',function(){
						var player=_status.event.player,target=_status.event.getTrigger().player;
						var att=get.attitude(player,target);
						if(att>0){
							if(_status.renku.length>0) return '选项一';
							return 0;
						}
						if(target.countCards('h')>target.hp) return '选项二';
						return 'cancel2';
					});
					'step 1'
					if(result.control!='cancel2'){
						player.logSkill('xinliaoyi',target);
						if(result.control=='选项一'){
							target.chooseButton(true,['选择获得一张牌',_status.renku]).set('ai',function(button){
								return get.value(button.link,_status.event.player);
							});
							event.goto(4);
						}
						else{
							var hs=target.getCards('h');
							if(hs.length<=num) event._result={bool:true,cards:hs};
							else target.chooseCard('h',true,'将'+get.cnNumber(num)+'张手牌置于仁库中',num);
						}
					}
					else event.finish();
					'step 2'
					if(result.bool){
						target.$throw(result.cards,1000);
						game.log(target,'将',result.cards,'置入了仁库');
						target.lose(result.cards,ui.special,'toRenku');
					}
					else event.finish();
					'step 3'
					game.delayx();
					event.finish();
					'step 4'
					var cards=result.links;
					_status.renku.removeArray(cards);
					game.updateRenku();
					target.gain(cards,'gain2','fromRenku');
				},
				init:function(player){
					player.storage.renku=true;
				},
				ai:{threaten:3.4},
			},
			liaoyi:{
				audio:2,
				trigger:{global:'phaseBegin'},
				filter:function(event,player){
					if(player==event.player) return false;
					var num=event.player.hp-event.player.countCards('h');
					if(num<0) return true;
					return num>0&&_status.renku.length>=Math.min(4,num);
				},
				logTarget:'player',
				prompt2:function(event,player){
					var target=event.player,num=target.hp-target.countCards('h');
					if(num<0) return '令'+get.translation(target)+'将'+get.cnNumber(Math.min(4,-num))+'张牌置入仁库';
					return '令'+get.translation(target)+'从仁库中获得'+get.cnNumber(Math.min(4,num))+'张牌';
				},
				check:function(event,player){
					var target=event.player,num=target.hp-target.countCards('h'),att=get.attitude(player,target);
					if(num<0){
						if(target.countCards('e',function(card){
							return get.value(card,target)<=0;
						})>=(-num/2)) return att>0;
						return att<=0;
					}
					return att>0;
				},
				content:function(){
					'step 0'
					var target=trigger.player,num=target.hp-target.countCards('h');
					event.target=target;
					if(num<0){
						num=Math.min(4,-num);
						target.chooseCard('he',true,'将'+get.cnNumber(num)+'张牌置于仁库中',num);
					}
					else{
						num=Math.min(4,num);
						target.chooseButton(['选择获得'+get.cnNumber(num)+'张牌',_status.renku],num,true).set('ai',function(button){
							return get.value(button.link,_status.event.player);
						});
						event.goto(3);
					}
					'step 1'
					if(result.bool){
						target.$throw(result.cards,1000);
						game.log(target,'将',result.cards,'置入了仁库');
						target.lose(result.cards,ui.special,'toRenku');
					}
					else event.finish();
					'step 2'
					game.delayx();
					event.finish();
					'step 3'
					var cards=result.links;
					_status.renku.removeArray(cards);
					game.updateRenku();
					target.gain(cards,'gain2','fromRenku');
				},
			},
			binglun:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return _status.renku.length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('病论',_status.renku);
					},
					backup:function(links,player){
						var obj=lib.skill.binglun_backup;
						obj.card=links[0];
						return obj;
					},
					prompt:()=>'请选择【病论】的目标',
				},
				subSkill:{
					backup:{
						audio:'binglun',
						filterCard:()=>false,
						selectCard:-1,
						filterTarget:true,
						delay:false,
						content:function(){
							'step 0'
							var card=lib.skill.binglun_backup.card;
							game.log(card,'从仁库进入了弃牌堆');
							player.$throw(card,1000);
							game.delayx();
							game.cardsDiscard(card).fromRenku=true;
							_status.renku.remove(card);
							game.updateRenku();
							'step 1'
							target.chooseControl().set('choiceList',[
								'摸一张牌',
								'于自己的下回合结束后回复1点体力',
							]).set('ai',function(){
								if(_status.event.player.isHealthy()) return 0;
								return 1;
							});
							'step 2'
							if(result.index==0) target.draw();
							else{
								target.addSkill('binglun_recover');
								target.addMark('binglun_recover',1,false);
							}
						},
						ai:{
							result:{
								target:function(player,target){
									if(target.isDamaged()) return 1.5;
									return 1;
								},
							},
						},
					},
					recover:{
						trigger:{player:'phaseEnd'},
						forced:true,
						popup:false,
						onremove:true,
						charlotte:true,
						content:function(){
							if(player.isDamaged()){
								player.logSkill('binglun_recover');
								player.recover(player.countMark('binglun_recover'));
							}
							player.removeSkill('binglun_recover');
						},
						intro:{
							content:'下回合结束时回复#点体力',
						},
						ai:{threaten:1.7},
					},
				},
				ai:{
					order:2,
					result:{
						player:1,
					},
				},
			},
			mjweipo:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return !current.hasSkill('mjweipo_effect');
					});
				},
				filterTarget:function(card,player,target){
					return !target.hasSkill('mjweipo_effect');
				},
				content:function(){
					'step 0'
					var list=['binglinchengxiax'];
					list.addArray(get.zhinangs());
					player.chooseButton(['危迫：选择一个智囊',[list,'vcard']],true).set('ai',function(button){
						return _status.event.getParent().target.getUseValue({name:button.link[2]});
					});
					'step 1'
					if(result.bool){
						var name=result.links[0][2];
						game.log(player,'选择了','#y'+get.translation(name));
						target.storage.mjweipo_effect=name;
						target.storage.mjweipo_source=player;
						target.addSkill('mjweipo_effect');
						game.delayx();
					}
				},
				ai:{
					order:7.1,
					result:{
						target:function(player,target){
							if(target==player) return player.countCards('hs','sha')>0?10:0.01;
							return (target.countCards('hs','sha')+0.5)*Math.sqrt(Math.max(1,target.hp));
						},
					},
				},
			},
			mjweipo_effect:{
				audio:'mjweipo',
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h','sha')>0;
				},
				prompt:function(){
					return '弃置一张【杀】并获得一张'+get.translation(_status.event.player.storage.mjweipo_effect);
				},
				filterCard:{name:'sha'},
				check:function(card){
					return 6-get.value(card);
				},
				position:'h',
				popname:true,
				content:function(){
					var name=player.storage.mjweipo_effect,card=false;
					if(name=='binglinchengxiax'){
						if(!_status.binglinchengxiax){
							_status.binglinchengxiax=[
								['spade',7],
								['club',7],
								['club',13],
							];
							game.broadcastAll(function(){lib.inpile.add('binglinchengxiax')});
						}
						if(_status.binglinchengxiax.length){
							var info=_status.binglinchengxiax.randomRemove();
							card=game.createCard2('binglinchengxiax',info[0],info[1]);
						}
					}
					if(!card) card=get.cardPile(name);
					if(card) player.gain(card,'gain2');
					player.removeSkill('mjweipo_effect');
				},
				ai:{
					order:7,
					result:{player:1},
				},
				mark:true,
				marktext:'迫',
				intro:{content:'可弃置一张【杀】并获得【$】'},
				group:'mjweipo_remove',
			},
			mjweipo_remove:{
				trigger:{global:['phaseBegin','die']},
				forced:true,
				firstDo:true,
				popup:false,
				filter:function(event,player){
					return event.player==player.storage.mjweipo_source;
				},
				content:function(){
					player.removeSkill('mjweipo_effect');
				},
			},
			mjchenshi:{
				audio:2,
				global:['mjchenshi_player','mjchenshi_target'],
				ai:{combo:'mjweipo'},
			},
			mjchenshi_player:{
				trigger:{player:'useCardToPlayered'},
				direct:true,
				filter:function(event,player){
					if(!event.card||event.card.name!='binglinchengxiax'||!event.isFirstTarget) return false;
					return player.countCards('he')>0&&game.hasPlayer(function(current){
						return current!=player&&current.hasSkill('mjchenshi');
					});
				},
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('mjchenshi');
					});
					player.chooseCardTarget({
						prompt:'是否交给'+get.translation(list)+'一张牌，将牌堆顶三张牌中不为【杀】的牌置于弃牌堆？',
						filterCard:true,
						position:'he',
						filterTarget:function(card,player,target){
							return _status.event.list.contains(target);
						},
						list:list,
						selectTarget:list.length>1?1:-1,
						goon:function(){
							for(var i of list){
								if(get.attitude(player,i)>0) return 1;
								return -1;
							}
						}(),
						ai1:function(card){
							if(_status.event.goon>0) return 7-get.value(card);
							return 0.01-get.value(card);
						},
						ai2:function(target){
							var card=ui.selected.cards[0];
							return get.value(card,target)*get.attitude(_status.event.player,target);
						},
					});
					'step 1'
					if(result.bool&&result.cards.length&&result.targets.length){
						var target=result.targets[0];
						target.logSkill('mjchenshi');
						player.line(target,'green');
						target.gain(result.cards,player,'giveAuto');
						trigger.getParent().mjchenshi_ai=true;
					}
					else event.finish();
					'step 2'
					var cards=get.cards(3);
					for(var i=cards.length-1;i>=0;i--){
						if(cards[i].name=='sha'){
							cards[i].fix();
							ui.cardPile.insertBefore(cards[i],ui.cardPile.firstChild);
							cards.splice(i,1);
						}
					}
					if(cards.length){
						player.$throw(cards,1000);
						game.delayx();
						game.cardsDiscard(cards);
						game.log(cards,'进入了弃牌堆');
					}
				},
			},
			mjchenshi_target:{
				trigger:{target:'useCardToTargeted'},
				direct:true,
				filter:function(event,player){
					if(!event.card||event.card.name!='binglinchengxiax') return false;
					return player.countCards('he')>0&&game.hasPlayer(function(current){
						return current!=player&&current.hasSkill('mjchenshi');
					});
				},
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(current){
						return current!=player&&current.hasSkill('mjchenshi');
					});
					player.chooseCardTarget({
						prompt:'是否交给'+get.translation(list)+'一张牌，将牌堆顶三张牌中的【杀】置于弃牌堆？',
						filterCard:true,
						position:'he',
						filterTarget:function(card,player,target){
							return _status.event.list.contains(target);
						},
						list:list,
						selectTarget:list.length>1?1:-1,
						goon:function(){
							if(trigger.getParent().chenshi_ai) return 1;
							for(var i of list){
								if(get.attitude(player,i)>0) return 1;
								return -1;
							}
						}(),
						ai1:function(card){
							if(_status.event.goon>0) return 7-get.value(card);
							return 3-get.value(card);
						},
						ai2:function(target){
							var card=ui.selected.cards[0];
							return Math.max(0.1,get.value(card,target)*get.attitude(_status.event.player,target));
						},
					});
					'step 1'
					if(result.bool&&result.cards.length&&result.targets.length){
						var target=result.targets[0];
						target.logSkill('mjchenshi');
						player.line(target,'green');
						target.gain(result.cards,player,'giveAuto');
					}
					else event.finish();
					'step 2'
					var cards=get.cards(3);
					for(var i=cards.length-1;i>=0;i--){
						if(cards[i].name!='sha'){
							cards[i].fix();
							ui.cardPile.insertBefore(cards[i],ui.cardPile.firstChild);
							cards.splice(i,1);
						}
					}
					if(cards.length){
						player.$throw(cards,1000);
						game.delayx();
						game.cardsDiscard(cards);
						game.log(cards,'进入了弃牌堆');
					}
				},
			},
			mjmouzhi:{
				audio:2,
				trigger:{player:'damageBegin2'},
				forced:true,
				filter:function(event,player){
					if(!event.card||get.suit(event.card)=='none') return false;
					var all=player.getAllHistory('damage');
					if(!all.length) return false;
					return all[all.length-1].card&&get.suit(all[all.length-1].card)==get.suit(event.card);
				},
				content:function(){
					trigger.cancel();
				},
				group:'mjmouzhi_mark',
				intro:{content:'上次受到伤害的花色：$'},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								var color=get.suit(card);
								if(color=='none') return;
								var all=target.getAllHistory('damage');
								if(!all.length||!all[all.length-1].card) return;
								if(get.suit(all[all.length-1].card)==color) return 'zerotarget';
							}
						},
					},
				},
				subSkill:{
					mark:{
						trigger:{player:'damage'},
						silent:true,
						firstDo:true,
						content:function(){
							if(!trigger.card||get.suit(trigger.card)=='none') player.unmarkSkill('mjmouzhi');
							else{
								player.markSkill('mjmouzhi');
								game.broadcastAll(function(player,suit){
									if(player.marks.mjmouzhi) player.marks.mjmouzhi.firstChild.innerHTML=get.translation(suit);
									player.storage.mjmouzhi=suit;
								},player,get.suit(trigger.card))
							}
						},
					},
				},
			},
			mjshengxi:{
				audio:'shengxi',
				audioname:['feiyi'],
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getHistory('useCard').length>0&&player.getHistory('sourceDamage').length==0;
				},
				content:function(){
					'step 0'
					var list=get.zhinangs();
					player.chooseButton(['是否发动【生息】获得一张智囊？',[list,'vcard']]).set('ai',function(card){
						return (Math.random()+0.5)*get.value({name:card.link[2]},_status.event.player)
					});
					'step 1'
					if(result.bool){
						player.logSkill('mjshengxi');
						var card=get.cardPile2(function(card){
							return card.name==result.links[0][2];
						});
						if(card) player.gain(card,'gain2');
					}
				},
				group:'mjshengxi_zhunbei',
				subfrequent:['zhunbei'],
				subSkill:{
					zhunbei:{
						trigger:{player:'phaseZhunbeiBegin'},
						frequent:true,
						prompt2:'从游戏外或牌堆中获得一张【调剂盐梅】',
						content:function(){
							if(!_status.tiaojiyanmei_suits||_status.tiaojiyanmei_suits.length>0){
								if(!lib.inpile.contains('tiaojiyanmei')) lib.inpile.add('tiaojiyanmei');
								if(!_status.tiaojiyanmei_suits) _status.tiaojiyanmei_suits=lib.suit.slice(0);
								player.gain(game.createCard2('tiaojiyanmei',_status.tiaojiyanmei_suits.randomRemove(),6),'gain2');
							}
							else{
								var card=get.cardPile2(function(card){
									return card.name=='tiaojiyanmei';
								});
								if(card) player.gain(card,'gain2');
							}
						},
					}
				},
			},
			mjkuanji:{
				audio:'fyjianyu',
				usable:1,
				trigger:{player:'loseAfter'},
				direct:true,
				filter:function(event,player){
					return event.type=='discard'&&event.cards2.filterInD('d').length>0;
				},
				content:function(){
					'step 0'
					player.chooseButton(['宽济：是否将一张牌交给一名其他角色？',trigger.cards2.filterInD('d')]).set('ai',function(button){
						var player=_status.event.player;
						if(game.hasPlayer(function(current){
							return current!=player&&get.attitude(player,current)>0;
						})) return Math.abs(get.value(button.link,'raw'))+1;
						return -get.value(button.link,'raw');
					});
					'step 1'
					if(result.bool){
						event.card=result.links[0];
						player.chooseTarget('将'+get.translation(card)+'交给一名其他角色并摸一张牌',lib.filter.notMe,true).set('ai',function(target){
							var evt=_status.event.getParent();
							return get.attitude(evt.player,target)*get.value(evt.card,target)*(target.hasSkillTag('nogain')?0.1:1);
						});
					}
					else{
						player.storage.counttrigger.mjkuanji--;
						event.finish();
					}
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('mjkuanji',target);
						target.gain(card,'gain2');
						player.draw();
					}
				},
			},
			mjdingyi:{
				audio:2,
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				forced:true,
				locked:false,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				logTarget:function(){
					return game.players;
				},
				content:function(){
					'step 0'
					var list=[];
					for(var i=0;i<4;i++) list.push(lib.skill['mjdingyi_'+i].title);
					player.chooseControl().set('choiceList',list).set('prompt','定仪：请选择一个全局效果').set('ai',function(target){
						var list1=player.getEnemies().length;
						var list2=game.players.length-list1;
						if(list2-list1>1) return 0;
						if(game.players.length<6) return 2;
						return 3;
					});
					'step 1'
					if(typeof result.index=='number'){
						var skill='mjdingyi_'+result.index;
						game.log(player,'选择了','#g'+lib.skill[skill].title);
						for(var i of game.players) i.addSkill(skill);
						game.delayx();
					}
				},
				subSkill:{
					0:{
						title:'摸牌阶段的额定摸牌数+1',
						charlotte:true,
						mark:true,
						marktext:'仪',
						trigger:{player:'phaseDrawBegin'},
						forced:true,
						filter:function(event,player){
							return !event.numFixed;
						},
						content:function(){
							trigger.num+=((player.storage.mjdingyi_plus||0)+1);
						},
						intro:{
							content:function(storage,player){
								return '摸牌阶段的额定摸牌数+'+(1*((player.storage.mjdingyi_plus||0)+1));
							},
						},
					},
					1:{
						title:'手牌上限+2',
						charlotte:true,
						mark:true,
						marktext:'仪',
						mod:{
							maxHandcard:function(player,num){
								return num+2*((player.storage.mjdingyi_plus||0)+1);
							},
						},
						intro:{
							content:function(storage,player){
								return '手牌上限+'+(2*((player.storage.mjdingyi_plus||0)+1));
							},
						},
					},
					2:{
						title:'攻击范围+1',
						charlotte:true,
						mark:true,
						marktext:'仪',
						mod:{
							attackRange:function(player,num){
								return num+((player.storage.mjdingyi_plus||0)+1);
							},
						},
						intro:{
							content:function(storage,player){
								return '攻击范围+'+((player.storage.mjdingyi_plus||0)+1);
							},
						},
					},
					3:{
						title:'脱离濒死状态后回复1点体力',
						charlotte:true,
						mark:true,
						marktext:'仪',
						trigger:{player:'dyingAfter'},
						forced:true,
						filter:function(event,player){
							return player.isDamaged();
						},
						content:function(){
							player.recover((player.storage.mjdingyi_plus||0)+1);
						},
						intro:{
							content:function(storage,player){
								return '脱离濒死状态后回复'+((player.storage.mjdingyi_plus||0)+1)+'点体力';
							},
						},
					},
				},
			},
			mjzuici:{
				audio:'zuici',
				trigger:{player:'damageEnd'},
				filter:function(event,player){
					if(!event.source||!event.source.isIn()) return false;
					for(var i=0;i<4;i++){
						if(event.source.hasSkill('mjdingyi_'+i)) return true;
					}
					return false;
				},
				logTarget:'source',
				check:()=>false,
				content:function(){
					'step 0'
					var target=trigger.source;
					event.target=target;
					for(var i=0;i<4;i++){
						if(target.hasSkill('mjdingyi_'+i)) target.removeSkill('mjdingyi_'+i);
					}
					'step 1'
					var list=get.zhinangs();
					if(list.length){
						player.chooseButton(['选择要令'+get.translation(target)+'获得的智囊',[list,'vcard']],true);
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var card=get.cardPile2(function(card){
							return card.name==result.links[0][2];
						})
						if(card) target.gain(card,'gain2');
					}
				},
			},
			mjfubi:{
				audio:'fubi',
				enable:'phaseUse',
				filter:function(event,player){
					if(player.hasSkill('mjfubi_round')) return false;
					return game.hasPlayer(function(current){
						for(var i=0;i<4;i++){
							if(current.hasSkill('mjdingyi_'+i)) return true;
						}
					});
				},
				filterCard:true,
				selectCard:[0,1],
				filterTarget:function(card,player,target){
					if(ui.selected.cards.length){
						for(var i=0;i<4;i++){
							if(target.hasSkill('mjdingyi_'+i)) return true;
						}
					}
					var num=0;
					for(var i=0;i<4;i++){
						if(target.hasSkill('mjdingyi_'+i)) return true;
					}
					return num>1&&num<4;
				},
				check:()=>false,
				position:'he',
				content:function(){
					'step 0'
					player.addTempSkill('mjfubi_round','roundStart');
					if(cards.length){
						player.addSkill('mjfubi_clear');
						player.markAuto('mjfubi_clear',[target]);
						target.addMark('mjdingyi_plus',1,false);
						game.log(target,'的','#g【定仪】','效果增加一倍');
						event.finish();
						return;
					}
					var list=[],nums=[];
					for(var i=0;i<4;i++){
						if(!target.hasSkill('mjdingyi_'+i)){
							list.push(lib.skill['mjdingyi_'+i].title);
							nums.push(i);
						}
					}
					if(list.length){
						event.nums=nums;
						player.chooseControl().set('choiceList',list).set('prompt','辅弼：请选择为'+get.translation(target)+'更换的〖定仪〗效果').set('ai',function(){
							var player=_status.event.player,target=_status.event.getParent().target;
							if(get.attitude(player,target)>0&&!target.hasSkill('mjdingyi_0')) return 0;
							return _status.event.getParent().nums.length-1;
						});
					}
					else event.finish();
					'step 1'
					for(var i=0;i<4;i++){
						if(target.hasSkill('mjdingyi_'+i)) target.removeSkill('mjdingyi_'+i);
					}
					target.addSkill('mjdingyi_'+event.nums[result.index]);
					game.log(target,'的效果被改为','#g'+lib.skill['mjdingyi_'+event.nums[result.index]].title);
				},
				ai:{
					order:10,
					expose:0,
					result:{
						target:function(player,target){
							if(target.hasSkill('mjdingyi_0')) return -1;
							return 2;
						},
					},
				},
				subSkill:{
					round:{},
					clear:{
						trigger:{player:['phaseBegin','dieBegin']},
						forced:true,
						popup:false,
						charlotte:true,
						content:function(){
							while(player.storage.mjfubi_clear&&player.storage.mjfubi_clear.length){
								var target=player.storage.mjfubi_clear.shift();
								if(target.hasMark('mjdingyi_plus')) target.removeMark('mjdingyi_plus',1,false);
							}
							delete player.storage.mjfubi_clear;
							player.removeSkill('mjfubi_clear');
						},
					},
				},
			},
			mobilezhongyong:{
				audio:2,
				trigger:{player:'useCardAfter'},
				direct:true,
				filter:function(event,player){
					if(event.card.name!='sha'||!event.isPhaseUsing(player)) return false;
					if(event.cards.filterInD().length>0) return true;
					var list=lib.skill.mobilezhongyong.getResponds(event);
					if(list.length){
						for(var evt of list){
							if(evt.cards.filterInD('od').length>0) return true;
						}
					}
					return false;
				},
				getResponds:function(event){
					var list=[];
					for(var i of event.targets){
						list.addArray(i.getHistory('useCard',function(evt){
							return evt.card.name=='shan'&&evt.respondTo&&evt.respondTo[1]==event.card;
						}))
					}
					return list;
				},
				content:function(){
					'step 0'
					event.shas=trigger.cards.filterInD();
					var list=lib.skill.mobilezhongyong.getResponds(trigger);
					if(list.length){
						event.shans=[];
						for(var evt of list){
							event.shans.addArray(evt.cards.filterInD('od'));
						}
						event.goto(2);
					}
					else player.chooseBool(get.prompt('mobilezhongyong'),'获得'+get.translation(event.shas)).set('ai',function(){
						var evt=_status.event.getParent();
						return get.value(evt.shas,evt.player)>0;
					});
					'step 1'
					if(result.bool){
						player.logSkill('mobilezhongyong');
						player.addTempSkill('mobilezhongyong_buff');
						player.gain(event.shas,'gain2').gaintag.add('mobilezhongyong');
					}
					event.finish();
					'step 2'
					var shans=get.translation(event.shans),choiceList=[
						'获得'+shans,
					];
					if(game.hasPlayer(function(current){
						return current!=player&&!trigger.targets.contains(current);
					})){
						if(event.shas.length) choiceList[0]+=('，然后可以令另一名其他角色获得'+get.translation(event.shas));
						choiceList.push('令另一名其他角色获得'+shans+'，然后你于本回合内使用【杀】的次数上限+1且下一张【杀】的伤害值基数+1');
					}
					player.chooseControl('cancel2').set('choiceList',choiceList).set('prompt',get.prompt('mobilezhongyong')).set('ai',function(){
						var evt=_status.event.getParent(),player=evt.player,tri=_status.event.getTrigger();
						if(game.hasPlayer(function(current){
							return current!=player&&!tri.targets.contains(current)&&get.attitude(player,current)>0;
						})&&player.countCards('hs',function(card){
							return get.name(card)=='sha'&&player.hasValueTarget(card);
						})>player.getCardUsable({name:'sha'})) return 1;
						return 0;
					});
					'step 3'
					if(result.index==0){
						player.logSkill('mobilezhongyong');
						player.addTempSkill('mobilezhongyong_buff');
						player.gain(event.shans,'gain2').gaintag.add('mobilezhongyong');
					}
					else event.goto(6);
					'step 4'
					event.shas=event.shas.filterInD('od');
					if(event.shas.length&&game.hasPlayer(function(current){
						return current!=player&&!trigger.targets.contains(current);
					})){
						player.chooseTarget('是否令一名其他角色获得'+get.translation(event.shas)+'？',function(card,player,target){
							return target!=player&&!_status.event.getTrigger().targets.contains(target);
						}).set('ai',function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(att<=0) return att;
							if(target.hasSkillTag('nogain')) return att/10;
							if(!target.hasSha()) return 2*att;
							return att;
						});
					}
					else event.finish();
					'step 5'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.gain(event.shas,'gain2');
					}
					event.finish();
					'step 6'
					player.chooseTarget('令一名其他角色获得'+get.translation(event.shans),true,function(card,player,target){
						return target!=player&&!_status.event.getTrigger().targets.contains(target);
					}).set('ai',function(target){
						var player=_status.event.player,att=get.attitude(player,target);
						if(att<=0) return att;
						if(target.hasSkillTag('nogain')) return att/10;
						if(!target.hasShan()) return 2*att;
						return att;
					});
					'step 7'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('mobilezhongyong',target);
						target.gain(event.shans,'gain2');
						player.addTempSkill('mobilezhongyong_buff');
						player.addMark('mobilezhongyong_buff',1,false);
						player.addMark('mobilezhongyong_damage',1,false);
					}
				},
				subSkill:{
					buff:{
						mod:{
							cardEnabled2:function(card,player){
								if(get.itemtype(card)=='card'&&card.hasGaintag('mobilezhongyong')) return false;
							},
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('mobilezhongyong_buff');
							},
						},
						trigger:{player:'useCard1'},
						firstDo:true,
						forced:true,
						charlotte:true,
						popup:false,
						filter:function(event,player){
							return event.card.name=='sha'&&player.countMark('mobilezhongyong_damage')>0;
						},
						content:function(){
							trigger.baseDamage+=player.storage.mobilezhongyong_damage;
							delete player.storage.mobilezhongyong_damage;
						},
						onremove:function(player){
							delete player.storage.mobilezhongyong_buff;
							delete player.storage.mobilezhongyong_damage;
							player.removeGaintag('mobilezhongyong');
						},
					},
				},
			},
			boming:{
				audio:2,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					target.gain(player,cards,'giveAuto');
				},
				check:function(card){
					return 5-get.value(card);
				},
				ai:{
					order:10,
					result:{
						target:function(player,target){
							if(!ui.selected.cards.length) return 0;
							var card=ui.selected.cards[0];
							if(player.hasSkill('ejian')&&!player.getStorage('ejian').contains(target)){
								var dam=get.damageEffect(target,player,target);
								if(dam>0) return dam;
								var type=get.type(card,target),ts=target.getCards('he',function(card){
									return get.type(card)==type;
								});
								if(ts.length){
									var val=get.value(ts,target);
									if(val>get.value(card)) return -Math.max(1,val);
									return 0;
								}
							}
							return get.value(card,target)/1.5;
						},
					},
				},
				group:'boming_draw',
				subSkill:{
					draw:{
						trigger:{player:'phaseJieshuBegin'},
						forced:true,
						locked:false,
						filter:function(event,player){
							return player.getHistory('lose',function(evt){
								return evt.getParent(2).name=='boming';
							}).length>1;
						},
						content:function(){
							player.draw();
						},
					},
				},
			},
			ejian:{
				audio:2,
				trigger:{global:'gainAfter'},
				forced:true,
				filter:function(event,player){
					var evt=event.getParent(),target=event.player;
					if(evt.name!='boming'||evt.player!=player||player.getStorage('ejian').contains(target)||!target.isIn()) return false;
					var he=target.getCards('he'),card=event.cards[0];
					if(!he.contains(card)) return false;
					var type=get.type2(card);
					for(var i of he){
						if(i!=card&&get.type2(i)==type) return true;
					}
					return false;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					event.cardType=get.type2(trigger.cards[0]);
					event.target=trigger.player;
					player.markAuto('ejian',[event.target]);
					event.target.chooseControl().set('choiceList',[
						'受到1点伤害',
						'展示手牌并弃置所有'+get.translation(event.cardType)+'牌',
					]).set('ai',function(event,player){
						if(get.damageEffect(player,_status.event.getParent().player,player)>=0) return 0;
						var type=_status.event.cardType,cards=player.getCards('he',function(card){
							return get.type2(card)==type;
						});
						if(cards.length==1) return 1;
						if(cards.length>=2){
							for(var i=0;i<cards.length;i++){
								if(get.tag(cards[i],'save')) return 0;
							}
						}
						if(player.hp==1) return 1;
						for(var i=0;i<cards.length;i++){
							if(get.value(cards[i])>=8) return 0;
						}
						if(cards.length>2&&player.hp>2) return 0;
						if(cards.length>3) return 0;
						return 1;
					}).set('cardType',event.cardType);
					'step 1'
					if(result.index==1){
						if(target.countCards('h')>0) target.showHandcards();
					}
					else{
						target.damage();
						event.finish();
					}
					'step 2'
					target.discard(target.getCards('he',function(card){
						return get.type2(card)==event.cardType;
					}));
				},
				ai:{combo:'boming',halfneg:true},
				onremove:true,
				intro:{content:'已对$发动过此技能'},
			},
			hxrenshi:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.countCards('h')>0&&(!player.storage.hxrenshi2||game.hasPlayer(function(current){
						return !player.storage.hxrenshi2.contains(current);
					}))
				},
				filterCard:true,
				filterTarget:function(card,player,target){
					return !player.storage.hxrenshi2||!player.storage.hxrenshi2.contains(target);
				},
				position:'h',
				discard:false,
				lose:false,
				delay:false,
				check:function(cardx){
					var player=_status.event.player;
					if(player.getStorage('debao').length==1&&(!game.hasPlayer(function(current){
						return get.attitude(player,current)>0&&current.hp*1.5+current.countCards('h')<4;
					})||game.hasPlayer(function(current){
						return get.attitude(player,current)<=0&&current.hp*1.5+current.countCards('h')<4;
					}))) return 0;
					return 5-get.value(cardx);
				},
				content:function(){
					player.addTempSkill('hxrenshi2','phaseUseEnd');
					player.markAuto('hxrenshi2',targets);
					target.gain(cards,player,'giveAuto');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							if(ui.selected.cards.length) return get.value(ui.selected.cards[0],target)+0.1;
							return 0;
						},
					},
				},
			},
			hxrenshi2:{
				onremove:true,
			},
			debao:{
				audio:2,
				trigger:{global:'gainAfter'},
				forced:true,
				filter:function(event,player){
					if(player==event.player||player.getStorage('debao').length>=player.maxHp) return false;
					var evt=event.getl(player);
					return evt&&evt.cards2&&evt.cards2.length>0;
				},
				content:function(){
					var cards=get.cards();
					player.markAuto('debao',cards);
					player.$gain2(cards[0],false);
					game.cardsGotoSpecial(cards);
					game.log(player,'将',cards[0],'放在了武将牌上');
					game.delayx();
				},
				marktext:'仁',
				intro:{content:'cards',onunmark:'throw'},
				group:'debao_gain',
				subSkill:{
					gain:{
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							return player.getStorage('debao').length>0;
						},
						content:function(){
							var cards=player.storage.debao;
							player.gain(cards,'gain2','fromStorage');
							cards.length=0;
							player.unmarkSkill('debao');
						},
					},
				},
			},
			buqi:{
				audio:2,
				trigger:{global:'dying'},
				forced:true,
				filter:function(event,player){
					return player.getStorage('debao').length>1;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					var cards=player.getStorage('debao');
					if(cards.length==2) event._result={bool:true,links:cards.slice(0)};
					else player.chooseButton(['不弃：请选择移去两张“仁”',cards],2,true);
					'step 1'
					if(result.bool){
						var cards=result.links;
						player.unmarkAuto('debao',cards);
						player.$throw(cards,1000);
						game.log(player,'将',cards,'置入了弃牌堆');
						game.delayx();
						game.cardsDiscard(cards);
					}
					else event.finish();
					'step 2'
					if(trigger.player.isIn()&&trigger.player.isDamaged()) trigger.player.recover();
				},
				group:'buqi_die',
				subSkill:{
					die:{
						trigger:{global:'dieAfter'},
						forced:true,
						filter:function(event,player){
							return player.getStorage('debao').length>0;
						},
						content:function(){
							player.unmarkSkill('debao');
						},
					},
				},
				ai:{
					neg:true,
					combo:'debao',
				},
			},
			guying:{
				audio:2,
				trigger:{player:'loseAfter'},
				forced:true,
				usable:1,
				filter:function(event,player){
					if(event.type!='discard'){
						var evt=event.getParent();
						if(evt.name!='useCard'&&evt.name!='respond') return false;
					}
					var target=_status.currentPhase;
					if(!event.cards2||event.cards2.length!=1||!target||target==player||!target.isIn()) return false;
					return get.position(event.cards2[0])=='d'||target.countCards('he')<0;
				},
				logTarget:function(){
					return _status.currentPhase;
				},
				content:function(){
					'step 0'
					if(trigger.delay===false) game.delayx();
					event.target=_status.currentPhase;
					event.card=trigger.cards2[0];
					'step 1'
					player.addMark('guying',1,false);
					event.addIndex=0;
					var choiceList=[],str=get.translation(player);
					if(target.countCards('he')>0) choiceList.push('随机交给'+str+'一张牌');
					else event.addIndex++;
					if(get.position(card)=='d') choiceList.push('令'+str+'收回'+get.translation(card));
					if(choiceList.length==1) event._result={index:0};
					target.chooseControl().set('choiceList',choiceList).set('ai',function(){
						var player=_status.event.player,evt=_status.event.getParent();
						if(get.value(evt.card,evt.player)*get.attitude(player,evt.player)>0) return 0;
						return Math.random()>(get.value(evt.card,evt.player)/6)?1:0;
						return 1;
					});
					'step 2'
					if(result.index+event.addIndex==0){
						player.gain(target.getCards('he').randomGet(),'giveAuto',target);
						event.finish();
					}
					else player.gain(card,'gain2');
					'step 3'
					if(player.isIn()&&player.getCards('h').contains(card)&&get.type(card,player)=='equip') player.chooseUseTarget(card,true,'nopopup');
				},
				onremove:true,
				intro:{content:'已发动过#次'},
				group:'guying_discard',
				subSkill:{
					discard:{
						audio:'guying',
						trigger:{player:'phaseZhunbeiBegin'},
						forced:true,
						filter:function(event,player){
							return player.countMark('guying')>0;
						},
						content:function(){
							var num=player.countMark('guying');
							player.removeMark('guying',num,false);
							player.chooseToDiscard('he',num,true);
						},
					},
				},
			},
			muzhen:{
				audio:2,
				enable:'phaseUse',
				usable:2,
				filter:function(event,player){
					if(!player.hasSkill('muzhen1')&&player.countCards('e')>0&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('h')>0;
					})) return true;
					if(!player.hasSkill('muzhen2')&&player.countCards('he')>1&&game.hasPlayer(function(current){
						return current!=player&&current.countCards('e')>0;
					})) return true;
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[
							'将一张装备牌置于其他角色的装备区内并获得其一张手牌',
							'将两张牌交给一名其他角色并获得其装备区内的一张牌',
						];
						var choiceList=ui.create.dialog('睦阵：请选择一项','hidden');
						for(var i=0;i<list.length;i++){
							var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
							var bool=lib.skill.muzhen.chooseButton.filter({link:i},player);
							if(!bool) str+='<div style="opacity:0.5">';
							str+=list[i];
							if(!bool) str+='</div>';
							str+='</div>';
							var next=choiceList.add(str);
							next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
							next.firstChild.link=i;
							for(var j in lib.element.button){
								next[j]=lib.element.button[j];
							}
							choiceList.buttons.add(next.firstChild);
						}
						return choiceList;
					},
					filter:function(button,player){
						if(button.link==0) return !player.hasSkill('muzhen1')&&player.countCards('e')>0&&game.hasPlayer(function(current){
							return current!=player&&current.countCards('h')>0;
						})
						return !player.hasSkill('muzhen2')&&player.countCards('he')>1&&game.hasPlayer(function(current){
							return current!=player&&current.countCards('e')>0;
						});
					},
					backup:function(links){
						return {
							audio:'muzhen',
							filterTarget:[
								function(card,player,target){
									return target.countCards('h')>0&&target.isEmpty(ui.selected.cards[0]);
								},
								function(card,player,target){
									return target.countCards('e')>0;
								}
							][links[0]],
							filterCard:[
								function(card,player){
									if(ui.selected.targets.length) return ui.selected.targets[0].isEmpty(card);
									return game.hasPlayer(function(current){
										return current.countCards('h')>0&&current.isEmpty(card);
									})
								},
								true,
							],
							selectCard:1+links[0],
							position:('eh')[links[0]],
							discard:false,
							lose:false,
							delay:false,
							content:function(){
								'step 0'
								player.addTempSkill('muzhen'+cards.length,'phaseUseEnd');
								if(cards.length==1){
									player.$giveAuto(cards[0],target);
									game.delayx();
									target.equip(cards[0]);
								}
								else{
									target.gain(cards,player,'giveAuto');
								}
								player.gainPlayerCard(target,cards.length==2?'e':'h',true);
							},
						}
					},
					prompt:function(){
						return '请选择【睦阵】的牌和目标'
					},
				},
			},
			muzhen1:{},
			muzhen2:{},
			sheyi2:{charlotte:true},
			sheyi:{
				audio:2,
				trigger:{global:'damageBegin4'},
				direct:true,
				filter:function(event,player){
					return !player.hasSkill('sheyi2')&&player!=event.player&&event.player.hp<player.hp&&player.countCards('he')>=Math.max(1,player.hp);
				},
				content:function(){
					'step 0'
					var num=Math.max(1,player.hp),target=trigger.player;
					player.chooseCard('he',get.prompt('sheyi',target),'交给其至少'+get.cnNumber(num)+'张牌，防止即将受到的伤害（'+trigger.num+'点）',[num,player.countCards('he')]).set('goon',function(){
						if(get.attitude(player,target)<0) return false;
						if(trigger.num<target.hp&&get.damageEffect(target,trigger.source,player,trigger.nature)>=0)	return false;
						if(trigger.num<2&&target.hp>trigger.num) return 6/Math.sqrt(num);
						if(target==get.zhu(player)) return 9;
						return 8/Math.sqrt(num);
					}()).set('ai',function(card){
						if(ui.selected.cards.length>=Math.max(1,_status.event.player.hp)) return 0;
						if(typeof _status.event.goon=='number') return _status.event.goon-get.value(card);
						return 0;
					});
					'step 1'
					if(result.bool){
						var target=trigger.player;
						player.logSkill('sheyi',target);
						player.addTempSkill('sheyi2','roundStart');
						target.gain(result.cards,player,'giveAuto');
						trigger.cancel();
					}
				},
			},
			tianyin:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				filter:function(event,player){
					var list=[];
					player.getHistory('useCard',function(evt){
						list.add(get.type2(evt.card,false));
					});
					for(var i=0;i<ui.cardPile.childNodes.length;i++){
						if(!list.contains(get.type2(ui.cardPile.childNodes[i],false))) return true;
					}
					return false;
				},
				content:function(){
					var list=[],cards=[];
					player.getHistory('useCard',function(evt){
						list.add(get.type2(evt.card,false));
					});
					for(var i=0;i<ui.cardPile.childNodes.length;i++){
						var type=get.type2(ui.cardPile.childNodes[i],false);
						if(!list.contains(type)){
							list.push(type);
							cards.push(ui.cardPile.childNodes[i])
						};
					}
					player.gain(cards,'gain2');
				}
			},
			rejieyue:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:get.prompt2('rejieyue'),
						filterCard:true,
						position:'he',
						filterTarget:lib.filter.notMe,
						ai1:function(card){
							var player=_status.event.player;
							if(get.name(card)=='du') return 20;
							if(get.position(card)=='e'&&get.value(card)<=0) return 14;
							if(get.position(card)=='h'&&game.hasPlayer(function(current){
								return current!=player&&get.attitude(player,current)>0&&current.getUseValue(card)>player.getUseValue(card)&&current.getUseValue(card)>player.getUseValue(card);
							})) return 12;
							if(game.hasPlayer(function(current){
								return current!=player&&get.attitude(player,current)>0;
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
								if(get.value(card,target)>get.value(card,player)) return 2*att;
								return 1.2*att;
							}
							return -att*Math.min(4,target.countCards('he'))/4;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.logSkill('rejieyue',target);
						target.gain(result.cards,player,'giveAuto');
					}
					else event.finish();
					'step 2'
					var num=0;
					if(target.countCards('h')) num++;
					if(target.countCards('e')) num++;
					if(num>0){
						var next=target.chooseCard('he',num,'选择保留每个区域的各一张牌，然后弃置其余的牌。或点取消，令'+get.translation(player)+'摸三张牌',function(card){
							for(var i=0;i<ui.selected.cards.length;i++){
								if(get.position(ui.selected.cards[i])==get.position(card)) return false;
							}
							return true;
						});
						next.set('complexCard',true);
						next.set('goon',get.attitude(target,player)>=0);
						next.set('maxNum',num);
						next.set('ai',function(card){
							if(_status.event.goon) return -1;
							var num=_status.event.maxNum;
							if(ui.selected.cards.length>=num-1){
								var val=get.value(player.getCards('he',function(cardx){
									return cardx!=card&&!ui.selected.cards.contains(cardx);
								}));
								if(val>=14) return 0;
							}
							return get.value(card);
						});
					}
					else event._result={bool:false};
					'step 3'
					if(!result.bool) player.draw(3);
					else {
						var cards=target.getCards('he');
						cards.removeArray(result.cards);
						if(cards.length) target.discard(cards);
					}
				},
				ai:{
					threaten:1.3,
					expose:0.2,
				},
			},
			spmingshi:{
				audio:2,
				trigger:{player:'damageEnd'},
				forced:true,
				logTarget:'source',
				filter:function(event,player){
					return event.source&&player!=event.source&&event.source.countCards('he')>0;
				},
				content:function(){
					'step 0'
					event.count=trigger.num;
					'step 1'
					event.count--;
					trigger.source.chooseToDiscard('he',true);
					'step 2'
					if(event.count>0&&result.bool&&lib.skill.spmingshi.filter(trigger,player)) event.goto(1);
				},
				ai:{
					threaten:0.8,
					maixie:true,
					maixie_defend:true,
				},
			},
			splirang:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var hs=player.getCards('h');
					if(!hs.length) return false;
					for(var i of hs){
						if(!lib.filter.cardDiscardable(i,player,'splirang')) return false;
					}
					return true;
				},
				filterCard:true,
				selectCard:-1,
				content:function(){
					'step 0'
					cards=cards.filterInD('d');
					if(!cards.length||player.hp<1) event.goto(3);
					else player.chooseButton(['将任意张牌交给一名其他角色',cards],[1,Math.min(cards.length,player.hp)]).set('ai',function(button){
						return get.value(button.link);
					});
					'step 1'
					if(result.bool){
						event.cards=result.links;
						player.chooseTarget(true,'令一名角色获得'+get.translation(event.cards),lib.filter.notMe).set('ai',function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(target.hasSkillTag('nogain')) att/=10;
							if(target.hasJudge('lebu')) att/=5;
							return att;
						});
					}
					else event.goto(3);
					'step 2'
					if(result.targets&&result.targets.length){
						var target=result.targets[0];
						player.line(target,'green');
						target.gain(cards,'gain2');
					}
					'step 3'
					player.draw();
				},
				ai:{
					order:0.1,
					result:{
						player:function(player){
							var hs=player.getCards('h');
							if(hs.length<=player.hp&&game.hasPlayer(function(current){
								return current!=player&&get.attitude(player,current)>0&&!current.hasJudge('lebu')&&!current.hasSkillTag('nogain');
							})) return 1;
							if(get.value(hs,player)<6) return 1;
							return 0;
						},
					},
				},
			},
			xianghai:{
				audio:2,
				global:'xianghai_g',
				mod:{
					cardname:function(card){
						if(get.type(card,null,false)=='equip') return 'jiu';
					},
				},
				ai:{
					threaten:2,
				},
			},
			xianghai_g:{
				mod:{
					maxHandcard:function(player,num){
						return num-game.countPlayer(function(current){
							return current!=player&&current.hasSkill('xianghai');
						});
					},
				},
			},
			chuhai:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkillTag('noCompareSource');
				},
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('h')>0&&
					!target.hasSkillTag('noCompareTarget');
				},
				content:function(){
					'step 0'
					player.draw();
					'step 1'
					if(player.canCompare(target)) player.chooseToCompare(target);
					else event.finish();
					'step 2'
					if(result.bool){
						player.storage.chuhai2=target;
						player.addTempSkill('chuhai2','phaseUseEnd');
						if(target.countCards('h')>0){
							player.viewHandcards(target);
							var types=[],cards=[],hs=target.getCards('h');
							for(var i of hs){
								types.add(get.type2(i,target));
							}
							for(var i of types){
								var card=get.cardPile(function(card){
									return get.type2(card,false)==i;
								});
								if(card) cards.push(card);
							}
							if(cards.length) player.gain(cards,'gain2','log');
						}
					}
				},
				ai:{
					order:9,
					result:{
						target:function(player,target){
							if(player.countCards('hs',function(card){
								return get.tag(card,'damage')>0&&player.canUse(card,target,null,true)&&
								get.effect(target,card,player,player)>0&&player.hasValueTarget(card,null,true);
							})>0) return -3;
							return -1;
						},
					},
				},
			},
			chuhai2:{
				trigger:{source:'damageSource'},
				forced:true,
				charlotte:true,
				onremove:true,
				filter:function(event,player){
					if(event.player!=player.storage.chuhai2) return false;
					for(var i=1;i<6;i++){
						if(player.isEmpty(i)) return true;
					}
					return false;
				},
				content:function(){
					for(var i=1;i<7;i++){
						if(player.isEmpty(i)){
							var sub='equip'+i,card=get.cardPile(function(card){
								return get.subtype(card,false)==sub&&!get.cardtag(card,'gifts');
							});
							if(card){
								player.$gain2(card);
								game.delayx();
								player.equip(card);
								break;
							}
						}
					}
				},
			},
			xunyi:{
				audio:2,
				trigger:{
					global:['phaseBefore','dieAfter'],
					player:'enterGame',
				},
				direct:true,
				filter:function(event,player){
					if(event.name=='die') return event.player==player.storage.xunyi2;
					return !player.storage.xunyi2&&(event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					'step 0'
					player.removeSkill('xunyi2');
					player.chooseTarget(lib.filter.notMe,get.prompt2('xunyi')).set('ai',function(target){
						var player=_status.event.player;
						return Math.max(1+get.attitude(player,target)*get.threaten(target),Math.random());
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xunyi',target);
						player.storage.xunyi2=target;
						player.addSkill('xunyi2');
					}
				},
			},
			xunyi2:{
				audio:'xunyi',
				trigger:{global:'damageSource'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					var list=[player,player.storage.xunyi2];
					return list.contains(event.source)&&!list.contains(event.player);
				},
				logTarget:function(event,player){
					return player.storage.xunyi2;
				},
				content:function(){
					(player==trigger.source?player.storage.xunyi2:player).draw();
				},
				group:'xunyi3',
				mark:true,
				intro:{content:'效果目标：$'},
			},
			xunyi3:{
				audio:'xunyi',
				trigger:{global:'damageEnd'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					var list=[player,player.storage.xunyi2];
					return list.contains(event.player)&&!list.contains(event.source)&&
					(player==event.player?player.storage.xunyi2:player).countCards('he')>0;
				},
				logTarget:function(event,player){
					return player.storage.xunyi2;
				},
				content:function(){
					(player==trigger.player?player.storage.xunyi2:player).chooseToDiscard('he',true);
				},
			},
			mouli:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>0;
				},
				filterCard:true,
				position:'h',
				filterTarget:lib.filter.notMe,
				discard:false,
				lose:false,
				delay:false,
				check:function(card){
					return 8-get.value(card);
				},
				content:function(){
					target.gain(cards,player,'giveAuto');
					if(!target.storage.mouli2) target.storage.mouli2=[];
					if(!target.storage.mouli3) target.storage.mouli3=[];
					target.storage.mouli2.add(player);
					target.storage.mouli3.push(player);
					target.addSkill('mouli_effect');
				},
				ai:{
					threaten:1.2,
					order:4,
					result:{
						target:1,
					},
				},
				subSkill:{
					effect:{
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						filter:function(event,player){
							if(event.card.name!='sha'&&event.card.name!='shan') return false;
							for(var i of player.storage.mouli3){
								if(i.isIn()) return true;
							}
							return false;
						},
						logTarget:function(event,player){
							return player.storage.mouli3;
						},
						content:function(){
							'step 0'
							game.delayx();
							player.storage.mouli3.sortBySeat();
							if(player.storage.mouli3.length==1){
								player.storage.mouli3[0].draw(3);
								player.storage.mouli3.length=0;
								event.finish();
							}
							else game.asyncDraw(player.storage.mouli3,3);
							'step 1'
							player.storage.mouli3.length=0;
							game.delayx();
						},
						group:['mouli_sha','mouli_shan','mouli_clear'],
						mark:true,
						intro:{
							content:'已因$获得“谋立”效果',
						},
					},
					sha:{
						enable:'chooseToUse',
						viewAs:{name:'sha'},
						filterCard:{color:'black'},
						position:'he',
						prompt:'将一张黑色牌当做杀使用',
						check:function(card){
							return 6-get.value(card);
						},
						viewAsFilter:function(player){
							return player.countCards('he',{color:'black'})>0;
						},
						ai:{
							respondSha:true,
							skillTagFilter:function(player){
								return player.countCards('he',{color:'black'})>0;
							},
						},
					},
					shan:{
						enable:'chooseToUse',
						viewAs:{name:'shan'},
						filterCard:{color:'red'},
						position:'he',
						prompt:'将一张红色牌当做闪使用',
						check:function(card){
							return 7-get.value(card);
						},
						viewAsFilter:function(player){
							return player.countCards('he',{color:'red'})>0;
						},
						ai:{
							respondShan:true,
							skillTagFilter:function(player){
								return player.countCards('he',{color:'red'})>0;
							},
						},
					},
					clear:{
						trigger:{global:['phaseBegin','dieAfter']},
						forced:true,
						silent:true,
						popup:false,
						lastDo:true,
						forceDie:true,
						filter:function(event,player){
							if(event.name=='die'&&player==event.player) return true;
							return player.storage.mouli2.contains(event.player);
						},
						content:function(){
							if(trigger.name=='die'&&player==trigger.player){
								player.removeSkill('mouli_effect');
								delete player.storage.mouli2;
								delete player.storage.mouli3;
								return;
							}
							player.storage.mouli2.remove(trigger.player);
							while(player.storage.mouli3.contains(trigger.player)) player.storage.mouli3.remove(trigger.player);
							if(!player.storage.mouli2.length) player.removeSkill('mouli_effect');
						},
					},
				},
			},
			zifu:{
				audio:2,
				trigger:{global:'dieAfter'},
				forced:true,
				filter:function(event,player){
					return event.player.storage.mouli2&&event.player.storage.mouli2.contains(player);
				},
				content:function(){
					player.loseMaxHp(2);
				},
				ai:{
					combo:'mouli',
					neg:true,
				},
			},
			tiansuan:{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return !player.storage.tiansuan2;
				},
				content:function(){
					'step 0'
					player.chooseControl('上上签','上签','中签','下签','下下签','cancel2').set('prompt','天算：是否增加其中一个命运签的权重？').set('ai',function(){
						return Math.random()<0.5?0:4;
					});
					'step 1'
					var list=[0,1,1,2,2,2,3,3,4];
					if(result.control!='cancel2') list.push(result.index);
					var num=list.randomGet();
					event.num=num;
					var str=get.translation(player)+'抽取的命运签为：'+lib.skill['tiansuan2_'+num].name;
					game.log(player,'抽取出了','#g'+lib.skill['tiansuan2_'+num].name);
 				event.dialog=ui.create.dialog(str);
 				event.videoId=lib.status.videoId++;
 				game.broadcast('createDialog',event.videoId,str);
 				game.pause();
 				setTimeout(function(){
 					game.resume();
 				},1500);
					'step 2'
 				event.dialog.close();
 				game.broadcast('closeDialog',event.videoId);
 				player.chooseTarget(true,'令一名角色获得“'+lib.skill['tiansuan2_'+num].name+'”').set('ai',lib.skill['tiansuan2_'+num].aiCheck);
 				'step 3'
 				if(result.bool){
 					var target=result.targets[0];
 					player.line(target,'green');
 					game.log(player,'令',target,'获得了命运签');
 					player.storage.tiansuan2=target;
 					player.storage.tiansuan3='tiansuan2_'+num;
 					player.addTempSkill('tiansuan2',{player:'phaseBegin'});
 					target.addSkill('tiansuan2_'+num);
 					if(num<2&&target.countGainableCards(player,target==player?'e':'he')>0){
 						var next=player.gainPlayerCard(target,target==player?'e':'he',true);
 						if(num==0) next.visible=true;
 					}
 					else game.delayx();
 				}
				},
				derivation:'tiansuan_faq',
				ai:{
					order:7,
					result:{
						player:1,
					},
				},
			},
			tiansuan2:{
				charlotte:true,
				onremove:function(player,skill){
					if(player.storage.tiansuan2) player.storage.tiansuan2.removeSkill(player.storage.tiansuan3);
					delete player.storage.tiansuan2;
					delete player.storage.tiansuan3;
				},
			},
			tiansuan2_0:{
				name:'上上签',
				trigger:{player:'damageBegin4'},
				forced:true,
				charlotte:true,
				content:function(){
					trigger.cancel();
				},
				mark:true,
				intro:{
					content:'当你受到伤害时，防止此伤害。',
				},
				aiCheck:function(target){
					if(target.hasSkill('tiansuan2_0')) return 0;
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(target.countCards('e',function(card){
						return get.value(card,target)<=0;
					})) att*=2;
					return att/Math.sqrt(Math.max(1,target.hp));
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&!player.hasSkillTag('jueqing',false,target)) return 'zerotarget';
						}
					},
				},
			},
			tiansuan2_1:{
				name:'上签',
				trigger:{player:'damageBegin4'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return event.num>1;
				},
				content:function(){
					trigger.num=1;
				},
				group:'tiansuan2_damage',
				mark:true,
				intro:{
					content:'当你受到伤害时，你令伤害值改为1；当你受到1点伤害后，你摸一张牌。',
				},
				aiCheck:function(target){
					if(target.hasSkill('tiansuan2_1')) return 0;
					var player=_status.event.player;
					var att=get.attitude(player,target);
					if(target.countCards('e',function(card){
						return get.value(card,target)<=0;
					})) att*=2;
					if(target.hp==1) return att/2;
					return att/Math.sqrt(Math.max(1,target.hp));
				},
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
					effect:{
						target:function(card,player,target,current){
							if(target&&target.hp>1&&get.tag(card,'damage')&&!player.hasSkillTag('jueqing',false,target)) return 0.8;
						}
					},
				},
			},
			tiansuan2_damage:{
				trigger:{player:'damageEnd'},
				charlotte:true,
				content:function(){
					player.draw(trigger.num);
				},
			},
			tiansuan2_2:{
				name:'中签',
				trigger:{player:'damageBegin4'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return event.num>1;
				},
				content:function(){
					trigger.num=1;
				},
				mark:true,
				intro:{
					content:'当你受到伤害时，你令伤害属性改为火属性并将伤害值改为1。',
				},
				aiCheck:function(target){
					if(target.hasSkill('tiansuan2_2')) return 0;
					var player=_status.event.player;
					target.addSkill('tiansuan2_ai');
					var num=get.damageEffect(target,player,player,'fire');
					target.removeSkill('tiansuan2_ai');
					return num;
				},
				group:['tiansuan2_fire','tiansuan2_ai'],
			},
			tiansuan2_ai:{
				ai:{
					filterDamage:true,
					skillTagFilter:function(player,tag,arg){
						if(arg&&arg.player){
							if(arg.player.hasSkillTag('jueqing',false,player)) return false;
						}
					},
				},
			},
			tiansuan2_fire:{
				trigger:{player:'damageBefore'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return event.nature!='fire';
				},
				content:function(){
					trigger.nature='fire';
				},
			},
			tiansuan2_3:{
				name:'下签',
				trigger:{player:'damageBegin3'},
				forced:true,
				charlotte:true,
				content:function(){
					trigger.num++;
				},
				mark:true,
				intro:{
					content:'当你受到伤害时，你令此伤害+1。',
				},
				aiCheck:function(target){
					if(target.hasSkill('tiansuan2_3')) return 0;
					var player=_status.event.player;
					var att=get.attitude(player,target);
					return -att/Math.sqrt(Math.max(1,target.hp));
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&!player.hasSkillTag('jueqing',false,target)&&current<0) return 1.3;
						}
					},
				},
			},
			tiansuan2_4:{
				name:'下下签',
				trigger:{player:'damageBegin3'},
				forced:true,
				charlotte:true,
				content:function(){
					trigger.num++;
				},
				mod:{
					cardEnabled:function(card,player){
						if(card.name=='tao'||card.name=='jiu') return false;
					},
					cardSavable:function(card,player){
						if(card.name=='tao'||card.name=='jiu') return false;
					},
				},
				mark:true,
				intro:{
					content:'当你受到伤害时，你令此伤害+1。你不能使用【酒】或【桃】。',
				},
				aiCheck:function(target){
					if(target.hasSkill('tiansuan2_4')) return 0;
					var player=_status.event.player;
					var att=get.attitude(player,target);
					return -att/Math.sqrt(Math.max(1,target.hp));
				},
				ai:{
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'damage')&&!player.hasSkillTag('jueqing',false,target)&&current<0) return 1.3;
						}
					},
				},
			},
			relieren:{
				shaRelated:true,
				audio:2,
				audioname:['boss_lvbu3'],
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha'&&player.canCompare(event.target);
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				//priority:5,
				content:function(){
					"step 0"
					player.chooseToCompare(trigger.target).clear=false;
					"step 1"
					if(result.bool){
						if(trigger.target.countGainableCards(player,'he')) player.gainPlayerCard(trigger.target,true,'he');
						ui.clear();
					}
					else{
						var card1=result.player;
						var card2=result.target;
						if(get.position(card1)=='d') trigger.target.gain(card1,'gain2');
						if(get.position(card2)=='d') player.gain(card2,'gain2');
					}
				}
			},
			retiaoxin:{
				audio:'tiaoxin',
				audioname:['sp_jiangwei','xiahouba','re_jiangwei'],
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&target.countCards('he');
				},
				content:function(){
					"step 0"
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.filterTarget.apply(this,arguments);
					}).set('sourcex',player);
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
							if(!target.canUse('sha',player)) return 0;
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
			//狗剩
			reduoji:{
				audio:'duoji',
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0;
				},
				filterCard:true,
				position:'he',
				filterTarget:lib.filter.notMe,
				discard:false,
				toStorage:true,
				delay:false,
				check:function(card){
					return 3-get.value(card);
				},
				content:function(){
					'step 0'
					player.$give(cards[0],target,false);
					target.markAuto('reduoji',cards);
					game.log(player,'将',cards[0],'放在了',target,'的武将牌上');
					'step 1'
					game.delay();
				},
				group:['reduoji_equip','reduoji_gain'],
				intro:{
					content:'cards',
					onunmark:'throw',
				},
				ai:{
				 order:1,
				 result:{target:-1},
				},
				subSkill:{
					equip:{
						audio:'duoji',
						trigger:{global:'equipAfter'},
						forced:true,
						filter:function(event,player){
							if(player==event.player||!event.player.getStorage('reduoji').length||!event.player.getCards('e').contains(event.card)) return false;
							var evt=event.getParent(2);
							return evt.name=='useCard'&&evt.player==event.player;
						},
						logTarget:'player',
						content:function(){
							'step 0'
							player.gain(trigger.card,trigger.player,'give','bySelf');
							'step 1'
							var target=trigger.player,storage=target.getStorage('reduoji');
							if(storage.length){
								var card=storage[0];
								target.$throw(card,1000);
								target.unmarkAuto('reduoji',[card]);
								game.log(target,'移去了',card);
								game.cardsDiscard(card);
								target.draw();
							}
						},
					},
					gain:{
						audio:'duoji',
						trigger:{global:'phaseEnd'},
						forced:true,
						filter:function(event,player){
							return event.player.getStorage('reduoji').length>0;
						},
						logTarget:'player',
						content:function(){
							var target=trigger.player,cards=target.storage.reduoji;
							target.$give(cards,player);
							player.gain(cards,'fromStorage');
							cards.length=0;
							target.unmarkSkill('reduoji');
							game.delay();
						},
					},
				},
			},
			//SP辛毗
			spyinju:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filterTarget:lib.filter.notMe,
				content:function(){
					"step 0"
					target.chooseToUse(function(card,player,event){
						if(get.name(card)!='sha') return false;
						return lib.filter.filterCard.apply(this,arguments);
					},'引裾：对'+get.translation(player)+'使用一张杀，或跳过下回合的出牌阶段和弃牌阶段').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',player);
					"step 1"
					if(!result.bool) target.addSkill('spyinju2');
				},
				ai:{
					order:1,
					expose:0.2,
					result:{
						target:-1.5,
						player:function(player,target){
							if(!target.canUse('sha',player)) return 0;
							if(target.countCards('h')==0) return 0;
							if(target.countCards('h')==1) return -0.1;
							if(player.countCards('h','shan')==0) return -1;
							if(player.hp<2) return -2;
							return -0.5;
						}
					},
					threaten:1.1
				}
			},
			spyinju2:{
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				charlotte:true,
				content:function(){
					player.skip('phaseUse');
					player.skip('phaseDiscard');
					player.removeSkill('spyinju2');
					game.log(player,'跳过了出牌阶段');
					game.log(player,'跳过了弃牌阶段');
				},
				mark:true,
				intro:{content:'衣襟被拽住了，下个准备阶段开始时跳过出牌阶段和弃牌阶段'},
			},
			spchijie:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				usable:1,
				filter:function(event,player){
					return event.player!=player&&event.targets.length==1;
				},
				check:function(event,player){
					return get.effect(player,event.card,event.player,player)<0;
				},
				content:function(){
					'step 0'
					player.judge(function(card){
						if(get.number(card)>6) return 2;
						return 0;
					}).judge2=function(result){
						return result.bool?true:false;
					};
					'step 1'
					if(result.bool){
						trigger.targets.length=0;
						trigger.getParent().triggeredTargets2.length=0;
						trigger.cancel();
					}
				},
			},
			//糜夫人
			spcunsi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.isTurnedOver();
				},
				filterTarget:lib.filter.notMe,
				content:function(){
					'step 0'
					player.turnOver();
					'step 1'
					var card=get.cardPile(function(card){
						return card.name=='sha';
					});
					if(card) target.gain(card,'gain2');
					'step 2'
					target.addSkill('spcunsi2');
					target.addMark('spcunsi2',1,false);
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var card={name:'sha',isCard:true};
							if(!target.hasSkillTag('nogain')&&game.hasPlayer(function(current){
								return (get.attitude(target,current)<0&&
								!current.hasShan()
								&&target.canUse(card,current)&&
								!current.hasSkillTag('filterDamage',null,{
									player:target,
									card:card,
									jiu:true,
								})&&
								get.effect(current,card,target)>0);
							})){
								return 4;
							}
							return 0;
						},
					},
				},
			},
			spcunsi2:{
				charlotte:true,
				trigger:{player:'useCard1'},
				firstDo:true,
				forced:true,
				popup:false,
				onremove:true,
				filter:function(event,player){
					return event.card.name=='sha';
				},
				content:function(){
					trigger.baseDamage+=player.countMark('spcunsi2');
					player.removeSkill('spcunsi2');
				},
				marktext:'嗣',
				intro:{
					content:'下一张【杀】的伤害+#',
				},
			},
			spguixiu:{
				trigger:{player:'damageEnd'},
				forced:true,
				filter:function(event,player){
					if(typeof event.spguixiu=='boolean'&&!event.spguixiu) return false;
					return player.isTurnedOver();
				},
				content:function(){
					player.turnOver();
				},
				group:['spguixiu_draw','spguixiu_count'],
				subSkill:{
					count:{
						trigger:{player:'damageBegin2'},
						lastDo:true,
						silent:true,
						content:function(){
							event.spguixiu=player.isTurnedOver();
						},
					},
					draw:{
						trigger:{player:'turnOverAfter'},
						forced:true,
						filter:function(event,player){
							return !player.isTurnedOver();
						},
						content:function(){
							player.draw();
						},
					},
				},
			},
			//那个男人的舅舅
			heji:{
				audio:2,
				trigger:{global:'useCardAfter'},
				direct:true,
				locked:false,
				filter:function(event,player){
					if(event.targets.length!=1||event.targets[0]==player||event.targets[0].isDead()) return false;
					if(event.card.name!='juedou'&&(event.card.name!='sha'||get.color(event.card)!='red')) return false;
					if(_status.connectMode&&player.countCards('h')>0) return true;
					return player.hasSha()||player.hasUsableCard('juedou');
				},
				content:function(){
					player.chooseToUse(function(card,player,event){
						var name=get.name(card);
						if(name!='sha'&&name!='juedou') return false;
						return lib.filter.cardEnabled.apply(this,arguments);
					},'合击：是否对'+get.translation(trigger.targets[0])+'使用一张【杀】或【决斗】？').set('logSkill','heji').set('complexSelect',true).set('filterTarget',function(card,player,target){
						if(target!=_status.event.sourcex&&!ui.selected.targets.contains(_status.event.sourcex)) return false;
						return lib.filter.targetEnabled.apply(this,arguments);
					}).set('sourcex',trigger.targets[0]).set('addCount',false);
				},
				group:'heji_gain',
				subSkill:{
					gain:{
						trigger:{player:'useCard'},
						forced:true,
						popup:false,
						filter:function(event,player){
							return event.card.isCard&&event.getParent(2).name=='heji';
						},
						content:function(){
							var card=get.cardPile2(function(card){
								return get.color(card,false)=='red';
							});
							if(card) player.gain(card,'gain2');
						},
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.name(card,player)=='sha'&&get.color(card,player)=='red') return num+0.6*(_status.event.name=='chooseToUse'&&player.hasHistory('useCard',function(evt){
							return evt.card.name=='sha'&&evt.cards.length==1;
						})?1:-1);
					},
				},
			},
			//南华老仙
			yufeng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					"step 0"
					if(_status.connectMode) event.time=lib.configOL.choose_timeout;
					event.videoId=lib.status.videoId++;
					if(player.isUnderControl()){
						game.swapPlayerAuto(player);
					}
					var switchToAuto=function(){
						game.pause();
						game.countChoose();
						setTimeout(function(){
							_status.imchoosing=false;
							var max=Math.max(2,1+game.me.countMark('yufeng'));
							var score=Math.random()<0.5?max:get.rand(1,max);
							event._result={
								bool:true,
								score:score,
								win:score>=max,
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
							game.resume();
						},5000);
					};
					var createDialog=function(player,id){
						if(_status.connectMode) lib.configOL.choose_timeout='30';
						if(player==game.me) return;
						var str=get.translation(player)+'正在表演《御风飞行》...<br>';
						ui.create.dialog(str).videoId=id;
					};
					var chooseButton=function(){
						var roundmenu=false;
						if(ui.roundmenu&&ui.roundmenu.display!='none'){
							roundmenu=true;
							ui.roundmenu.style.display='none';
						}
						var event=_status.event;
						event.settleed=false;
						event.score=0;
						event.dialog=ui.create.dialog('forcebutton','hidden');
						event.dialog.textPrompt=event.dialog.add('<div class="text center">准备好了吗？准备好了的话就点击屏幕开始吧！</div>');
						var max=Math.max(2,1+game.me.countMark('yufeng'));
						event.dialog.textPrompt.style["z-index"]=10;
						event.switchToAuto=function(){
							event._result={
								bool:true,
								score:event.score,
								win:event.score>=max,
							};
							event.dialog.close();
							game.resume();
							_status.imchoosing=false;
							if(roundmenu) ui.roundmenu.style.display='';
						};
						event.dialog.classList.add('fixed');
						event.dialog.classList.add('scroll1');
						event.dialog.classList.add('scroll2');
						event.dialog.classList.add('fullwidth');
						event.dialog.classList.add('fullheight');
						event.dialog.classList.add('noupdate');
						event.dialog.style.overflow='hidden';
						event.dialog.open();
						
						var height=event.dialog.offsetHeight;
						var width=event.dialog.offsetWidth;
						var top=50;
						var speed=0;
						var start=false;
						
						var bird=ui.create.div('');
						bird.style["background-image"]='linear-gradient(rgba(240, 235, 3, 1), rgba(230, 225, 5, 1))';
						bird.style["border-radius"]='3px';
						var pipes=[];
						bird.style.position='absolute';
						bird.style.height='40px';
						bird.style.width='40px';
						bird.style.left=Math.ceil(width/3)+'px';
						bird.style.top=(top/100*height)+'px';
						bird.updatePosition=function(){
							bird.style.transform='translateY('+(top/100*height-bird.offsetTop)+'px)';
						};
						event.dialog.appendChild(bird);
						var isDead=function(){
							if(top>100||top<0) return true;
							var btop=top;
							var bleft=100/3;
							var bdown=btop+5;
							var bright=bleft+5;
							for(var i of pipes){
								var left2=i.left;
								var right2=left2+10;
								var bottom2=i.height1;
								var top2=i.height2;
								
								if(left2>bright||right2<bleft) continue;
								if(btop<bottom2) return true;
								if(bdown>top2) return true;
								return false;
							}
							return false;
						};
						
						var fly=function(){
							if(!start){
								start=true;
								event.dialog.textPrompt.innerHTML='<div class="text center">当前分数：'+event.score+'</div>';
								speed=-4;
								event.fly=setInterval(function(){
									top+=speed;
									if(top<0) top=0;
									bird.updatePosition();
									for(var i of pipes){
										i.left-=0.5;
										i.updateLeft();
									}
									speed+=0.5;
									if(speed>2.5) speed=2.5;
									
									if(isDead()==true){
										event.settle();
									}
								},35);
								var addPipe=function(){
									var num=get.rand(5,55);
									
									var pipe1=ui.create.div('');
									pipe1.style["background-image"]='linear-gradient(rgba(57, 133, 4, 1), rgba(60, 135, 6, 1))';
									pipe1.style["border-radius"]='3px';
									pipe1.style.position='absolute';
									pipe1.height1=num;
									pipe1.height2=num+50;
									pipe1.left=110;
									pipe1.num=1;
									pipe1.style.height=Math.ceil(height*num/100)+'px';
									pipe1.style.width=(width/10)+'px';
									pipe1.style.left=(pipe1.left*width/100)+'px';
									pipe1.style.top='0px';

									var pipe2=ui.create.div('');
									pipe2.style["background-image"]='linear-gradient(rgba(57, 133, 4, 1), rgba(60, 135, 6, 1))';
									pipe2.style["border-radius"]='3px';
									pipe1.pipe2=pipe2;
									pipe2.style.position='absolute';
									pipe2.style.height=Math.ceil((100-pipe1.height2)*height/100)+'px';
									pipe2.style.width=(width/10)+'px';
									pipe2.style.left=(pipe1.left*width/100)+'px';
									pipe2.style.top=Math.ceil(pipe1.height2*height/100)+'px';
									pipes.add(pipe1);
									event.dialog.appendChild(pipe1);
									event.dialog.appendChild(pipe2);
									pipe1.updateLeft=function(){
										this.style.transform='translateX('+((this.left/100*width)-this.offsetLeft)+'px)';
										this.pipe2.style.transform='translateX('+((this.left/100*width)-this.pipe2.offsetLeft)+'px)';
										if(this.left<25&&!this.score){
											this.score=true;
											event.score++;
											event.dialog.textPrompt.innerHTML='<div class="text center">当前分数：'+event.score+'</div>';
											if(event.score>=max){
												event.settle();
											}
										}
										if(this.left<-15){
											this.remove();
											this.pipe2.remove();
											pipes.remove(this);
										}
									}
								};
								event.addPipe=setInterval(addPipe,2500);
							}
							else if(speed>0){
								speed=-4;
							}
						};
						document.addEventListener(lib.config.touchscreen?'touchend':'click',fly);
						
						event.settle=function(){
							clearInterval(event.fly);
							clearInterval(event.addPipe);
							document.removeEventListener(lib.config.touchscreen?'touchend':'click',fly);
							setTimeout(function(){
								event.switchToAuto()
							},1000);
						};
						
						game.pause();
						game.countChoose();
					};
					//event.switchToAuto=switchToAuto;
					game.broadcastAll(createDialog,player,event.videoId);
					if(event.isMine()){
						chooseButton();
					}
					else if(event.isOnline()){
						event.player.send(chooseButton);
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
					player.popup(get.cnNumber(result.score)+'分',result.win?'wood':'fire')
					game.log(player,'御风飞行',result.win?'#g成功':'#y失败');
					game.log(player,'获得了','#g'+result.score+'分');
					var max=player.countMark('yufeng');
					if(!result.win){
						if(result.score) player.draw(result.score);
						if(max) player.removeMark('yufeng',max,false);
						event.finish();
					}
					else{
						if(max<2) player.addMark('yufeng',1,false);
						event.score=result.score;
						player.chooseTarget('请选择【御风】的目标',[1,result.score],function(card,player,target){
							return target!=player&&!target.hasSkill('yufeng2');
						}).set('ai',function(target){
							var player=_status.event.player;
							var att=-get.attitude(player,target),attx=att*2;
							if(att<=0||target.hasSkill('xinfu_pdgyingshi')) return 0;
							if(target.hasJudge('lebu')) attx-=att;
							if(target.hasJudge('bingliang')) attx-=att;
							return attx/Math.max(2.25,Math.sqrt(target.countCards('h')+1));
						});
					}
					"step 2"
					if(result.bool){
						result.targets.sortBySeat();
						player.line(result.targets,'green');
						game.log(result.targets,'获得了','#y“御风”','效果');
						for(var i of result.targets) i.addSkill('yufeng2');
						if(event.score>result.targets.length) player.draw(event.score-result.targets.length);
					}
					else player.draw(event.score);
				},
				ai:{
					order:10,
					result:{player:1},
					threaten:3.2,
				}
			},
			yufeng2:{
				trigger:{player:'phaseZhunbeiBegin'},
				audio:false,
				forced:true,
				charlotte:true,
				content:function(){
					'step 0'
					player.removeSkill('yufeng2');
					player.judge();
					'step 1'
					if(result.color=='red') player.skip('phaseDraw');
					else{
						player.skip('phaseUse');
						player.skip('phaseDiscard');
					}
				},
				mark:true,
				intro:{
					content:'准备阶段时进行判定，结果为红则跳过摸牌阶段，为黑则跳过出牌阶段和弃牌阶段',
				},
				ai:{
					order:7,
					result:{
						player:1,
					},
				},
			},
			tianshu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he')>0&&!game.hasPlayer(function(current){
						return current.countCards('ej','taipingyaoshu');
					});
				},
				position:'he',
				filterCard:true,
				filterTarget:true,
				check:function(card){
					return 6-get.value(card);
				},
				content:function(){
					'step 0'
					if(!lib.inpile.contains('taipingyaoshu')){
						lib.inpile.push('taipingyaoshu');
						event.card=game.createCard2('taipingyaoshu','heart',3);
					}
					else{
						event.card=get.cardPile(function(card){
							return card.name=='taipingyaoshu';
						});
					}
					if(!event.card) event.finish();
					else target.gain(event.card,'gain2');
					'step 1'
					if(target.getCards('h').contains(card)&&get.name(card,target)=='taipingyaoshu') target.chooseUseTarget(card,'nopopup',true);
				},
				ai:{
					order:3,
					result:{
						target:function(player,target){
							if(lib.inpile.contains('taipingyaoshu')&&!get.cardPile(function(card){
								return card.name=='taipingyaoshu';
							})) return 0;
							return target.getUseValue({name:'taipingyaoshu'});
						},
					},
				},
			},
			//始计篇·智
			refubi:{
				audio:'fubi',
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				direct:true,
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('refubi'),lib.filter.notMe).set('ai',function(target){
						return 1+get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('refubi',target);
						target.addMark('refubi',1);
					}
				},
				intro:{
					content:function(info,player){
						var str='已获得“辅弼”标记'
						if(player.storage.refubi_effect0){
							str+='；本回合使用【杀】的次数上限+';
							str+=player.storage.refubi_effect0;
						}
						if(player.storage.refubi_effect1){
							str+='；本回合的手牌上限+';
							str+=(player.storage.refubi_effect1*3);
						}
						return str;
					},
				},
				marktext:'弼',
				group:'refubi_buff',
				subSkill:{
					buff:{
						trigger:{global:'phaseZhunbeiBegin'},
						direct:true,
						filter:function(event,player){
							return event.player!=player&&event.player.hasMark('refubi');
						},
						content:function(){
							'step 0'
							var str=get.translation(trigger.player);
							player.chooseControl('cancel2').set('choiceList',[
								'令'+str+'本回合使用【杀】的次数上限+1',
								'令'+str+'本回合的手牌上限+3',
							]).set('ai',function(){
								var player=_status.event.player,target=_status.event.getTrigger().player;
								if(get.attitude(player,target)<=0) return 'cancel2';
								if(!target.hasJudge('lebu')&&target.countCards('h',function(card){
									return get.name(card,target)=='sha'&&target.hasValueTarget(card);
								})>target.getCardUsable('sha')) return 0;
								return 1;
							});
							'step 1'
							if(result.control!='cancel2'){
								var target=trigger.player;
								player.logSkill('refubi',target);
								var str='refubi_effect'+result.index;
								target.addTempSkill(str);
								target.addMark(str,1,false);
								game.log(target,[
									'本回合使用【杀】的次数上限+1',
									'本回合的手牌上限+3',
								][result.index]);
							}
						},
					},
					effect0:{
						onremove:true,
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return num+player.countMark('refubi_effect0');
							},
						},
					},
					effect1:{
						onremove:true,
						mod:{
							maxHandcard:function(player,num){
								return num+3*player.countMark('refubi_effect1');
							},
						},
					},
				},
			},
			rezuici:{
				audio:'zuici',
				enable:'chooseToUse',
				filter:function(event,player){
					if(event.type=='phase'||event.type=='dying'&&player==event.dying) return (player.isDamaged()&&player.countCards('e')>0);
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('###罪辞###选择废除一个有牌的装备栏，然后回复2点体力，并可移动“辅弼”标记。');
					},
					chooseControl:function(event,player){
						var list=[];
						for(var i=1;i<6;i++){
							if(player.getEquip(i)) list.push('equip'+i);
						}
						list.push('cancel2');
						return list;
					},
					check:function(event,player){
						if(player.hp>1&&player.getDamagedHp()<2) return 'cancel2';
						var cards=player.getCards('e').sort(function(a,b){
							return get.value(a)-get.value(b);
						});
						var sub=get.subtype(cards[0],false);
						if(player.hp<1) return sub;
						var val=get.value(cards[0]);
						if(val<0) return sub;
						return val<4?sub:'cancel2';
					},
					backup:function(result){
						var next=get.copy(lib.skill.rezuicix);
						next.position=result.control;
						return next;
					},
				},
				ai:{
					order:2.7,
					result:{
						player:1,
					},
					save:true,
					skillTagFilter:function(player,tag,arg){
						return player==arg;
					},
				},
			},
			rezuicix:{
				audio:'zuici',
				content:function(){
					'step 0'
					player.disableEquip(lib.skill.rezuici_backup.position);
					player.recover(2);
					'step 1'
					var b1=false,b2=false;
					for(var i of game.players){
						if(i.hasMark('refubi')) b1=true;
						else if(i!=player) b2=true;
						if(b1&&b2) break;
					}
					if(b1&&b2){
						player.chooseTarget('是否转移“辅弼”标记？',function(card,player,target){
							return target!=player&&!target.hasMark('refubi');
						}).set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							return Math.min(att,att-_status.event.preatt);
						}).set('preatt',get.attitude(player,game.findPlayer(function(current){
							return current.hasMark('refubi');
						})));
					}
					else event.finish();
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'group');
						game.countPlayer(function(current){
							var num=current.countMark('refubi');
							if(num) current.removeMark('refubi',1,false);
						});
						target.addMark('refubi',1);
					}
				},
				ai:{
					result:{
						player:1,
					},
				},
			},
			reshengxi:{
				audio:'shengxi',
				audioname:['feiyi'],
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				preHidden:true,
				filter:function(event,player){
					return !player.getHistory('sourceDamage').length;
				},
				content:function(){
					player.draw(2);
				},
			},
			fyjianyu:{
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return !player.hasSkill('fyjianyu2')&&game.countPlayer(function(current){
						return !current.hasMark('fyjianyux');
					})>1;
				},
				filterTarget:function(card,player,target){
					return !target.hasMark('fyjianyux');
				},
				selectTarget:2,
				content:function(){
					player.addTempSkill('fyjianyux',{player:'phaseBegin'});
					target.addMark('fyjianyux',1);
				},
				ai:{
					order:0.1,
					result:{
						target:function(player,target){
							if(!ui.selected.targets.length) return target==player?1:0;
							if(get.attitude(player,target)<0) return -1.6*(1+(target.countCards('h',function(card){
								return target.hasValueTarget(card)&&get.effect(player,card,target,target)>0;
							}))*Math.sqrt(target.countCards('h')));
							return 0.3*(1+(target.countCards('h',function(card){
								return target.hasValueTarget(card)&&get.effect(player,card,target,target)>0;
							}))*Math.sqrt(target.countCards('h')));
						},
					},
				},
			},
			fyjianyux:{
				trigger:{global:'useCardToPlayer'},
				forced:true,
				charlotte:true,
				filter:function(event,player){
					return event.player!=event.target&&event.player.hasMark('fyjianyux')&&
					event.target.hasMark('fyjianyux')&&event.target.isAlive();
				},
				logTarget:'target',
				content:function(){
					trigger.target.draw();
				},
				onremove:function(){
					game.countPlayer(function(current){
						var num=current.countMark('fyjianyux');
						if(num) current.removeMark('fyjianyux');
					});
				},
				intro:{
					content:'mark',
				},
			},
			fyjianyu2:{},
			spwanwei:{
				audio:2,
				enable:'chooseToUse',
				filter:function(event,player){
					if(player.hasSkill('spwanwei2')||player.hp<1) return false;
					if(event.type=='dying') return event.dying!=player;
					if(event.type!='phase') return false;
					return game.hasPlayer(function(current){
						return current!=player&&current.isDamaged();
					});
				},
				filterTarget:function(card,player,target){
					if(_status.event.type=='dying') return target==_status.event.dying;
					return player!=target&&target.isDamaged();
				},
				selectTarget:function(){
					if(_status.event.type=='dying') return -1;
					return 1;
				},
				content:function(){
					player.addTempSkill('spwanwei2','roundStart');
					var num=player.hp;
					target.recover(Math.max(num+1,1-target.hp));
					player.loseHp(num);
				},
				ai:{
					save:true,
					skillTagFilter:function(player,tag,target){
						return player!=target;
					},
					expose:0.5,
					order:6,
					result:{
						target:function(player,target){
							if(_status.event.type!='dying') return 0;
							if(get.attitude(player,target)<4) return 0;
							if(player.countCards('he')<2&&target!=get.zhu(player)) return 0;
							return 1;
						},
					},
				},
			},
			spwanwei2:{},
			spyuejian:{
				mod:{
					maxHandcardBase:function(player){
						return player.maxHp;
					},
				},
				audio:2,
				enable:'chooseToUse',
				filter:function(event,player){
					return event.type=='dying'&&player==event.dying&&player.countCards('he')>1;
				},
				selectCard:2,
				filterCard:true,
				position:'he',
				check:function(card){
					return 1/Math.max(0.1,get.value(card));
				},
				content:function(){
					player.recover();
				},
				ai:{
					save:true,
					skillTagFilter:function(player,tag,target){
						return player==target;
					},
					order:1.4,
					result:{
						player:1,
					},
				},
			},
			spwuku:{
				audio:2,
				trigger:{global:'useCard'},
				forced:true,
				preHidden:true,
				filter:function(event,player){
					if(get.type(event.card)!='equip') return false;
					var gz=get.mode()=='guozhan';
					if(gz&&event.player.isFriendOf(player)) return false;
					return player.countMark('spwuku')<(gz?2:3);
				},
				content:function(){
					player.addMark('spwuku',1);
				},
				marktext:'库',
				intro:{
					content:'mark',
				},
			},
			spsanchen:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				forced:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'gray',
				filter:function(event,player){
					return player.countMark('spwuku')>2;
				},
				content:function(){
					player.awakenSkill('spsanchen');
					player.gainMaxHp();
					player.recover();
					player.addSkillLog('spmiewu');
				},
				derivation:'spmiewu',
			},
			spmiewu:{
				audio:2,
				enable:['chooseToUse','chooseToRespond'],
				filter:function(event,player){
					if(!player.countMark('spwuku')||!player.countCards('hse')||player.hasSkill('spmiewu2')) return false;
					for(var i of lib.inpile){
						var type=get.type2(i);
						if((type=='basic'||type=='trick')&&lib.filter.filterCard({name:i},player,event)) return true;
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						for(var i=0;i<lib.inpile.length;i++){
							var name=lib.inpile[i];
							if(name=='sha'){
								if(event.filterCard({name:name},player,event)) list.push(['基本','','sha']);
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:name,nature:j},player,event)) list.push(['基本','','sha',j]);
								}
							}
							else if(get.type2(name)=='trick'&&event.filterCard({name:name},player,event)) list.push(['锦囊','',name]);
							else if(get.type(name)=='basic'&&event.filterCard({name:name},player,event)) list.push(['基本','',name]);
						}
						return ui.create.dialog('灭吴',[list,'vcard']);
					},
					filter:function(button,player){
						return _status.event.getParent().filterCard({name:button.link[2]},player,_status.event.getParent());
					},
					check:function(button){
						if(_status.event.getParent().type!='phase') return 1;
						var player=_status.event.player;
						if(['wugu','zhulu_card','yiyi','lulitongxin','lianjunshengyan','diaohulishan'].contains(button.link[2])) return 0;
						return player.getUseValue({
							name:button.link[2],
							nature:button.link[3],
						});
					},
					backup:function(links,player){
						return {
							filterCard:true,
							audio:'spmiewu',
							popname:true,
							check:function(card){
								return 8-get.value(card);
							},
							position:'hse',
							viewAs:{name:links[0][2],nature:links[0][3]},
							precontent:function(){
								player.addTempSkill('spmiewu2');
								player.removeMark('spwuku',1);
							},
						}
					},
					prompt:function(links,player){
						return '将一张牌当做'+(get.translation(links[0][3])||'')+get.translation(links[0][2])+'使用';
					}
				},
				hiddenCard:function(player,name){
					var type=get.type2(name);
					return (type=='basic'||type=='trick')&&player.countMark('spwuku')>0&&player.countCards('she')>0&&!player.hasSkill('spmiewu2');
				},
				ai:{
					combo:'spwuku',
					fireAttack:true,
					respondSha:true,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countMark('spwuku')||!player.countCards('hse')||player.hasSkill('spmiewu2')) return false;
					},
					order:1,
					result:{
						player:function(player){
							if(_status.event.dying) return get.attitude(player,_status.event.dying);
							return 1;
						},
					},
				},
			},
			spmiewu2:{
				trigger:{player:['useCardAfter','respondAfter']},
				forced:true,
				charlotte:true,
				popup:false,
				filter:function(event,player){
					return event.skill=='spmiewu_backup';
				},
				content:function(){
					player.draw();
				},
			},
			spmiewu_backup:{audio:'spmiewu'},
			qinzheng:{
				audio:2,
				trigger:{player:['useCard','respond']},
				forced:true,
				filter:function(event,player){
					var num=player.getAllHistory('useCard').length+player.getAllHistory('respond').length;
					return num%3==0||num%5==0||num%8==0;
				},
				content:function(){
					var num=player.getAllHistory('useCard').length+player.getAllHistory('respond').length;
					var cards=[];
					if(num%3==0){
						var card=get.cardPile2(function(card){
							return card.name=='sha'||card.name=='shan';
						});
						if(card) cards.push(card);
					}
					if(num%5==0){
						var card=get.cardPile2(function(card){
							return ['tao','jiu','zong','xionghuangjiu'].contains(card.name);
						});
						if(card) cards.push(card);
					}
					if(num%8==0){
						var card=get.cardPile2(function(card){
							return ['juedou','wuzhong','zengbin','sadouchengbing','dongzhuxianji','tongzhougongji'].contains(card.name);
						});
						if(card) cards.push(card);
					}
					if(cards.length) player.gain(cards,'gain2');
				},
				group:'qinzheng_count',
				intro:{
					content:function(num){
						var str='<li>总次数：';
						str+=num;
						str+='<br><li>杀/闪：';
						str+=num%3;
						str+='/3<br><li>桃/酒：';
						str+=num%5;
						str+='/5<br><li>决斗/无中生有：';
						str+=num%8;
						str+='/8';
						return str;
					},
				},
			},
			qinzheng_count:{
				trigger:{player:['useCard1','respond']},
				silent:true,
				firstDo:true,
				noHidden:true,
				content:function(){
					player.storage.qinzheng=player.getAllHistory('useCard').length+player.getAllHistory('respond').length;
					player.markSkill('qinzheng');
				},
			},
			spqiai:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('he',function(card){
						return get.type(card)!='basic';
					})>0;
				},
				filterCard:function(card){
					return get.type(card)!='basic';
				},
				position:'he',
				filterTarget:lib.filter.notMe,
				delay:false,
				discard:false,
				lose:false,
				check:function(card){
					var player=_status.event.player;
					if(get.position(card)=='e'&&card.name=='jinhe') return 10;
					if(player.isHealthy()) return 7-get.value(card);
					return 9-get.value(card);
				},
				content:function(){
					'step 0'
					target.gain(cards,player,'give');
					'step 1'
					if(!target.isIn()){
						event.finish();
						return;
					}
					if(player.isHealthy()) event._result={index:1};
					else{
						var str=get.translation(player);
						target.chooseControl().set('choiceList',[
							'令'+str+'回复1点体力',
							'令'+str+'摸两张牌',
						]);
					}
					'step 2'
					if(result.index==0) player.recover();
					else player.draw(2);
				},
				ai:{
					order:8,
					result:{
						player:1,
						target:function(player,target){
							if(ui.selected.cards.length){
								var card=ui.selected.cards[0];
								var val=get.value(card,target);
								if(val<0) return -1;
								if(target.hasSkillTag('nogain')) return 0;
								var useval=target.getUseValue(card);
								if(val<1||useval<=0) return 0.1;
								return Math.sqrt(useval);
							}
							return 0;
						},
					},
				},
			},
			spshanxi:{
				audio:2,
				trigger:{player:'phaseUseBegin'},
				direct:true,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return current!=player&&!current.hasMark('spshanxi');
					});
				},
				content:function(){
					'step 0'
					var eff=0;
					var target=game.findPlayer(function(current){
						return current!=player&&!current.hasMark('spshanxi');
					});
					if(target) eff=(-get.attitude(player,target)/Math.sqrt(Math.max(1,target.hp)));
					player.chooseTarget(get.prompt('spshanxi'),'令一名其他角色获得“檄”',function(card,player,target){
						return target!=player&&!target.hasMark('spshanxi');
					}).set('ai',function(target){
						return (-get.attitude(_status.event.player,target)/Math.sqrt(Math.max(1,target.hp)))-_status.event.eff;
					}).set('eff',eff);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('spshanxi',target);
						game.countPlayer(function(current){
							if(current==target) current.addMark('spshanxi',1);
							else{
								var num=current.countMark('spshanxi');
								if(num>0) current.removeMark('spshanxi',num);
							}
						});
					}
				},
				marktext:'檄',
				intro:{
					name2:'檄',
					content:'已被设下索命檄文',
				},
				group:'spshanxi_suoming',
				ai:{threaten:3.3},
			},
			spshanxi_suoming:{
				audio:'spshanxi',
				trigger:{global:'recoverAfter'},
				forced:true,
				filter:function(event,player){
					return event.player.hasMark('spshanxi')&&event.player.hp>0;
				},
				logTarget:'player',
				content:function(){
					'step 0'
					if(trigger.player.countCards('he')<2) event._result={bool:false};
					else trigger.player.chooseCard('he',2,'交给'+get.translation(player)+'两张牌，或失去1点体力').set('ai',function(card){
						return 9-get.value(card);
					});
					'step 1'
					if(!result.bool) trigger.player.loseHp();
					else player.gain(result.cards,trigger.player,'giveAuto');
				},
			},
			shameng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					var hs=player.getCards('h');
					if(hs.length<2) return false;
					var red=0,black=0;
					for(var i of hs){
						if(get.color(i,player)=='red') red++;
						else black++;
						if(red>1||black>1) return true;
					}
					return false;
				},
				complexCard:true,
				selectCard:2,
				filterCard:function(card,player){
					if(ui.selected.cards.length) return get.color(card,player)==get.color(ui.selected.cards[0],player);
					var color=get.color(card,player);
					return player.countCards('h',function(cardx){
						return cardx!=card&&color==get.color(cardx,player);
					})>0;
				},
				filterTarget:lib.filter.notMe,
				check:function(card){return 7-get.value(card)},
				position:'h',
				content:function(){
					target.draw(2);
					player.draw(3);
				},
				ai:{
					order:6,
					result:{target:2},
				},
			},
			fubi:{
				trigger:{
					global:'phaseBefore',
					player:'enterGame',
				},
				direct:true,
				skillAnimation:true,
				animationColor:'wood',
				filter:function(event,player){
					return (event.name!='phase'||game.phaseNumber==0);
				},
				content:function(){
					'step 0'
					player.chooseTarget(get.prompt2('fubi'),lib.filter.notMe).set('ai',function(target){
						return get.attitude(_status.event.player,target);
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('fubi',target);
						target.addSkill('fubi2');
						target.storage.fubi2.push(player);
					}
				},
			},
			fubi2:{
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=[];
				},
				mod:{
					maxHandcard:function(player,num){
						var list=player.getStorage('fubi2');
						for(var i of list){
							if(i.isIn()) num+=3;
						}
						return num;
					},
				},
				mark:true,
				intro:{content:'若$存活，则手牌上限+3'},
			},
			zuici:{
				trigger:{player:'dying'},
				direct:true,
				filter:function(event,player){
					return player.countCards('e')>0;
				},
				content:function(){
					'step 0'
					var list=[];
					var cards=player.getCards('e');
					for(var i of cards) list.push(get.subtype(i));
					list.push('cancel2');
					player.chooseControl(list).set('prompt',get.prompt2('zuici'));
					'step 1'
					if(result.control!='cancel2'){
						player.disableEquip(result.control);
					}
					else event.finish();
					'step 2'
					if(player.hp<1) player.recover(1-player.hp);
				},
			},
			jianzhan:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return game.hasPlayer(function(current){
						return lib.skill.jianzhan.filterTarget(null,player,current);
					});
				},
				filterTarget:function(card,player,target){
					if(target==player) return false;
					if(ui.selected.targets.length){
						var targetx=ui.selected.targets[0];
						return targetx!=target&&targetx.countCards('h')>target.countCards('h')&&targetx.inRange(target);
					}
					var num=target.countCards('h');
					return game.hasPlayer(function(current){
						return current!=target&&current!=player&&current.countCards('h')<num&&target.inRange(current);
					});
				},
				selectTarget:2,
				complexTarget:true,
				targetprompt:['出杀','被出杀'],
				multitarget:true,
				content:function(){
					'step 0'
					if(!targets[0].canUse('sha',targets[1])) event._result={index:1};
					else targets[0].chooseControl().set('choiceList',[
						'视为对'+get.translation(targets[1])+'使用一张【杀】',
						'令'+get.translation(player)+'摸一张牌',
					]).set('ai',function(){
						var evt=_status.event.getParent();
						var eff=get.effect(evt.targets[1],{name:'sha',isCard:true},evt.targets[0],evt.targets[0]);
						if(eff>0) return 0;
						if(eff<0||get.attitude(evt.targets[0],evt.player)>1) return 1;
						return 0;
					});
					'step 1'
					if(result.index==0) targets[0].useCard({name:'sha',isCard:true},targets[1],false);
					else player.draw();
				},
				ai:{
					result:{
						target:function(player,target){
							if(ui.selected.targets.length){
								var from=ui.selected.targets[0];
								return get.effect(target,{name:'sha'},from,target);
							}
							var effs=[0,0];
							game.countPlayer(function(current){
								if(current!=target&&target.canUse('sha',current)){
									var eff=get.effect(current,{name:'sha'},target,target);
									if(eff>effs[0]) effs[0]=eff;
									if(eff<effs[1]) effs[1]=eff;
								}
							});
							return effs[get.attitude(player,target)>0?0:1];
						}
					},
					order:8.5,
					expose:0.2
				},
			},
			duoji:{
				audio:2,
				enable:'phaseUse',
				limited:true,
				filter:function(event,player){
					return player.countCards('h')>1&&game.hasPlayer(function(current){
						return current!=player&&current.countGainableCards(player,'e')>0;
					});
				},
				filterCard:true,
				selectCard:2,
				filterTarget:function(card,player,target){
					return target!=player&&target.countGainableCards(player,'e')>0;
				},
				check:function(card){
					return 8-get.value(card);
				},
				position:'h',
				skillAnimation:true,
				animationColor:'metal',
				content:function(){
					player.awakenSkill('duoji');
					var cards=target.getGainableCards(player,'e');
					player.gain(cards,target,'give','bySelf');
				},
				ai:{
					order:1,
					result:{
						target:function(player,target){
							var num=0,es=target.getCards('e'),val=0;
							for(var i of es){
								num+=get.value(i,target);
							}
							for(var i of ui.selected.cards){
								val+=get.value(i,player);
							}
							if(Math.abs(num)>val) return -num;
							return 0;
						},
					},
				},
			},
			//界伏寿
			xinzhuikong:{
				audio:2,
				trigger:{global:'phaseZhunbeiBegin'},
				check:function(event,player){
					if(get.attitude(player,event.player)<-2){
						var cards=player.getCards('h');
						if(cards.length>player.hp) return true;
						for(var i=0;i<cards.length;i++){
							var useful=get.useful(cards[i]);
							if(useful<5) return true;
							if(cards[i].number>7&&useful<7) return true;
						}
					}
					return false;
				},
				logTarget:'player',
				filter:function(event,player){
					return !player.hasSkill('xinzhuikong2')&&player.hp<=event.player.hp&&player.canCompare(event.player);
				},
				content:function(){
					"step 0"
					player.addTempSkill('xinzhuikong2','roundStart');
					player.chooseToCompare(trigger.player).set('small',(player.hp>1&&get.effect(player,{name:'sha'},trigger.player,player)>0&&Math.random()<0.9));
					"step 1"
					if(result.bool){
						trigger.player.addTempSkill('zishou2');
						event.finish();
					}
					else if(result.target&&get.position(result.target)=='d') player.gain(result.target,'gain2','log');
					"step 2"
					var card={name:'sha',isCard:true};
					if(trigger.player.canUse(card,player,false)) trigger.player.useCard(card,player,false);
				},
			},
			xinzhuikong2:{charlotte:true},
			xinqiuyuan:{
				audio:2,
				trigger:{target:'useCardToTarget'},
				direct:true,
				filter:function(event,player){
					return event.card.name=='sha';
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('xinqiuyuan'),function(card,player,target){
						return target!=player&&!_status.event.targets.contains(target)&&_status.event.playerx.canUse('sha',target,false);
					}).set('ai',function(target){
						var trigger=_status.event.getTrigger();
						var player=_status.event.player;
						return get.effect(target,trigger.card,trigger.player,player)+0.1;
					}).set('targets',trigger.targets).set('playerx',trigger.player);
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.logSkill('xinqiuyuan',target);
						event.target=target;
						target.chooseCard(function(card,player){
							var name=get.name(card,player);
							return name!='sha'&&get.type(name)=='basic';
						},'h','交给'+get.translation(player)+
						'一张不为【杀】的基本牌，或成为此杀的额外目标').set('ai',function(card){
							return get.attitude(target,_status.event.sourcex)>=0?1:-1;
						}).set('sourcex',player);
						game.delay();
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
						player.gain(result.cards,event.target,'give');
						game.delay();
					}
					else{
						trigger.getParent().targets.push(event.target);
						trigger.getParent().triggeredTargets2.push(event.target);
						game.log(event.target,'成为了',trigger.card,'的额外目标');
					}
				},
				ai:{
					expose:0.2,
					effect:{
						target:function(card,player,target){
							if(card.name!='sha') return;
							var players=game.filterPlayer();
							if(get.attitude(player,target)<=0){
								for(var i=0;i<players.length;i++){
									var target2=players[i];
									if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
										get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,target)>0&&
										get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,player)<0){
										if(target.hp==target.maxHp) return 0.3;
										return 0.6;
									}
								}
							}
							else{
								for(var i=0;i<players.length;i++){
									var target2=players[i];
									if(player!=target2&&target!=target2&&player.canUse(card,target2,false)&&
										get.effect(target2,{name:'shacopy',nature:card.nature,suit:card.suit},player,player)>0){
										if(player.canUse(card,target2)) return;
										if(target.hp==target.maxHp) return [0,1];
										return [0,0];
									}
								}
							}
						}
					}
				}
			},
			//界潘璋马忠
			xinduodao:{
				audio:2,
				trigger:{player:'damageEnd'},
				logTarget:'source',
				filter:function(event,player){
					var source=event.source;
					if(!source) return false;
					var card=source.getEquip(1);
					return card&&get.itemtype(card)=='card'&&lib.filter.canBeGained(card,player,source);
				},
				prompt2:function(event){
					return '获得其装备区中的'+get.translation(event.source.getEquip(1));
				},
				check:function(event,player){
					return (get.attitude(player,event.source)+0.1)*get.value(event.source.getEquip(1),event.source);
				},
				content:function(){
					player.gain(trigger.source.getEquip(1),trigger.source,'give','bySelf');
				},
			},
			xinanjian:{
				audio:2,
				trigger:{player:'useCardToPlayered'},
				forced:true,
				logTarget:'target',
				filter:function(event,player){
					return event.card.name=='sha'&&!player.inRangeOf(event.target);
				},
				content:function(){
					'step 0'
					var card=get.translation(trigger.card);
					var target=get.translation(trigger.target);
					player.chooseControl().set('prompt','暗箭：请选择一项').set('choiceList',[
						'令'+target+'不能响应'+card,
						'令'+card+'对'+target+'的伤害值基数+1',
					]).set('ai',function(){
						var target=_status.event.getTrigger().target;
						var player=_status.event.player;
						var num=target.mayHaveShan()?0:1;
						if(get.attitude(player,target)>0) num=1-num;
						return num;
					});
					'step 1'
					if(result.index==0){
						game.log(player,'令',trigger.card,'不能被',trigger.target,'响应');
						trigger.directHit.push(trigger.target);
					}
					else{
						game.log(player,'令',trigger.card,'对',trigger.target,'的伤害+1');
						var id=trigger.target.playerid;
						var map=trigger.customArgs;
						if(!map[id]) map[id]={};
						if(!map[id].extraDamage) map[id].extraDamage=0;
						map[id].extraDamage++;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(!arg||!arg.card||!arg.target||arg.card.name!='sha'||arg.target.inRange(player)||get.attitude(player,arg.target)>0) return false;
					},
				},
			},
			//界郭笨
			mobilejingce:{
				audio:2,
				trigger:{player:'phaseJieshuBegin'},
				frequent:true,
				filter:function(event,player){
					var num=0;
					game.getGlobalHistory('cardMove',function(evt){
						if(evt.name!='cardsDiscard') return;
						var evtx=evt.getParent();
						if(evtx.name!='orderingDiscard') return false;
						var evt2=(evtx.relatedEvent||evtx.getParent());
						if(evt2&&(evt2.name=='useCard'||evt2.name=='respond')) num+=evt.cards.length;
					});
					return num>=player.hp;
				},
				content:function(){
					player.draw(2);
				},
				group:'mobilejingce_count',
				intro:{
					content:function(num,player){
						if(num==0) return '一张都没有？就这？';
						if(num<player.hp) return '才'+get.cnNumber(num)+'张？就这？';
						return '卧槽，牛逼啊，居然'+get.cnNumber(num)+'张了！';
					},
				},
			},
			mobilejingce_count:{
			 trigger:{
			 	global:['cardsDiscardEnd','phaseBefore'],
			 	player:'phaseAfter',
			 },
			 silent:true,
			 firstDo:true,
			 filter:function(evt,player){
			 	if(evt.name=='phase') return true;
			 	if(player!=_status.currentPhase) return false;
					var evtx=evt.getParent();
					if(evtx.name!='orderingDiscard') return false;
					var evt2=(evtx.relatedEvent||evtx.getParent());
					return (evt2&&(evt2.name=='useCard'||evt2.name=='respond'))
			 },
			 content:function(){
			 	if(trigger.name=='phase') player.unmarkSkill('mobilejingce');
			 	else{
			 	 var num=0;
						game.getGlobalHistory('cardMove',function(evt){
							if(evt.name!='cardsDiscard') return;
							var evtx=evt.getParent();
							if(evtx.name!='orderingDiscard') return false;
							var evt2=(evtx.relatedEvent||evtx.getParent());
							if(evt2&&(evt2.name=='useCard'||evt2.name=='respond')) num+=evt.cards.length;
						});
						player.storage.mobilejingce=num;
			 	 player.markSkill('mobilejingce');
			 	}
			 },
			},
			//公孙康
			juliao:{
				mod:{
					globalTo:function(from,to,distance){
						return distance+game.countGroup()-1;
					},
				},
			},
			taomie:{
				audio:3,
				group:['taomie1','taomie2','taomie3'],
				trigger:{source:'damageBegin1'},
				forced:true,
				locked:false,
				direct:true,
				filter:function(event,player){
					return event.player.hasMark('taomie');
				},
				content:function(){
					'step 0'
					player.logSkill(Math.random()<0.5?'taomie2':'taomie3',trigger.player);
					var target=get.translation(trigger.player);
					player.chooseControl().set('prompt','讨灭：请选择一项').set('choiceList',[
						'令即将对'+target+'造成的伤害+1',
						'获得'+target+'的一张牌，并可将其交给另一名其他角色',
						'依次执行以上所有选项，并移去'+target+'的“讨灭”标记',
					]).set('ai',function(){
						var evt=_status.event.getTrigger();
						var player=_status.event.player;
						var target=evt.player;
						var bool1=!target.hasSkillTag('filterDamage',null,{
							player:player,
							card:evt.card,
						});
						var bool2=get.effect(target,{name:'shunshou'},player,player)>0;
						if(bool1&&bool2&&target.hp<=evt.num+1) return 2;
						if(bool1) return 0;
						return 1;
					});
					'step 1'
					if(result.index==2){
						trigger.taomie_player=trigger.player;
						trigger.player.addTempSkill('taomie4');
					}
					if(result.index!=1){
						trigger.num++;
					}
					if(result.index!=0&&trigger.player.countGainableCards(player,'hej')>0){
						player.gainPlayerCard(trigger.player,'hej',true);
					}
				 else event.finish();
				 'step 2'
				 var card=result.cards[0];
				 if(card&&player.getCards('h').contains(card)&&game.hasPlayer(function(current){
				 	return current!=player&&current!=trigger.player;
				 })){
				 	event.card=card;
				 	player.chooseTarget('是否将'+get.translation(card)+'交给一名其他角色？',function(card,player,target){
				 		return target!=player&&target!=_status.event.getTrigger().player;
				 	}).set('ai',function(target){
				  	var player=_status.event.player;
				  	var card=_status.event.getParent().card;
				  	if(target.hasSkillTag('nogain')||!player.needsToDiscard()||(get.tag(card,'damage')&&player.hasValueTarget(card,null,false)&&get.effect(_status.event.getTrigger().player,card,null,false)>0)) return 0;
				  	return get.attitude(player,target)/(1+target.countCards('h'));
				 	});
				 }
				 else event.finish();
				 'step 3'
				 if(result.bool){
				 	var target=result.targets[0];
				 	player.line(target);
				 	target.gain(card,player,'giveAuto');
				 }
				},
				mod:{
					inRangeOf:function(from,to){
						if(from.hasMark('taomie')) return true;
					},
					inRange:function(from,to){
						if(to.hasMark('taomie')) return true;
					},
				},
				intro:{
					content:'mark',
				},
				ai:{
					effect:{
						player:function(card,player,target){
							if(target&&get.tag(card,'damage')&&target.hasMark('taomie')){
								if(player.hasSkillTag('jueqing',false,target)) return;
								if(get.attitude(player,target)>0){
									return 0.7;
								}
								return 1.2;
							}
						},
					},
				},
			},
			taomie1:{
				audio:true,
				trigger:{
					player:'damageEnd',
					source:'damageSource',
				},
				logTarget:function(trigger,player){
					if(player==trigger.player) return trigger.source;
					return trigger.player;
				},
				filter:function(event,player){
					var target=lib.skill.taomie1.logTarget(event,player);
					return target&&target.isAlive()&&!target.hasMark('taomie');
				},
				check:function(event,player){
					var target=lib.skill.taomie1.logTarget(event,player);
					if(get.attitude(player,target)>0) return false;
					var target0=game.findPlayer(function(current){
						return current.hasMark('taomie');
					});
					if(!target0) return true;
					var eff1=0,eff2=0;
					player.countCards('h',function(card){
						if(!get.tag(card,'damage')) return false;
						if(player.hasValueTarget(card,null,true)>0){
							if(player.canUse(card,target,null,true)){
								var eff=get.effect(target,card,player,player);
								if(eff>0) eff1+=eff;
							}
							if(player.canUse(card,target0,null,true)){
								var eff=get.effect(target0,card,player,player);
								if(eff>0) eff2+=eff;
							}
						}
					});
					return eff1>eff2;
				},
				prompt2:function(event,player){
					var target=lib.skill.taomie1.logTarget(event,player);
					var str='令'+get.translation(target)+'获得“讨灭”标记';
					if(game.hasPlayer(function(current){
						return current.hasMark('taomie');
					})) str+='，并移去场上已有的“讨灭”标记';
					return str;
				},
				content:function(){
					game.countPlayer(function(current){
						var num=current.countMark('taomie');
						if(num) current.removeMark('taomie');
					});
					lib.skill.taomie1.logTarget(trigger,player).addMark('taomie',1);
				},
			},
			taomie2:{audio:true},
			taomie3:{audio:true},
			taomie4:{
				trigger:{
					global:['damageAfter','damageCancelled','damageZero'],
					player:'dieBegin',
				},
				forced:true,
				popup:false,
				charlotte:true,
				filter:function(event,player){
					return player.hasMark('taomie')&&(event.name=='die'||event.taomie_player==player);
				},
				content:function(){
					player.removeMark('taomie',player.countMark('taomie'));
					player.removeSkill('taomie2');
				},
			},
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
				position:'hse',
				viewAs:{name:'sha'},
				viewAsFilter:function(player){
					if(!player.countCards('hse',{color:'black'})) return false;
				},
				prompt:'将一张黑色牌当杀使用或打出',
				check:function(card){return 4.5-get.value(card)},
				ai:{
					skillTagFilter:function(player){
						if(!player.countCards('hes',{color:'black'})) return false;
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
				trigger:{global:['dieEnd','loseEnd','gainEnd']},
				silent:true,
				lastDo:true,
				charlotte:true,
				filter:function(event,player){
					if(event.name!='gain'&&event.player!=player.storage.jinglve2) return false;
					return event.name=='die'||(event.cards.contains(player.storage.jinglve3)&&(event.name=='gain'||event.position!=ui.ordering&&event.position!=ui.discardPile));
				},
				content:function(){
					player.removeSkill('jinglve2');
				},
				group:'jinglve3',
			},
			jinglve3:{
				audio:'jinglve',
				trigger:{global:['loseAfter','useCard','phaseAfter','cardsDiscardAfter']},
				filter:function(event,player){
					if(event.player&&event.player!=player.storage.jinglve2) return false;
					if(event.name=='phase') return event.player.getCards('hej').contains(player.storage.jinglve3);
					if(!event.cards.contains(player.storage.jinglve3)) return false;
					return event.name=='useCard'||get.position(player.storage.jinglve3,true)=='d'||event.position==ui.discardPile;
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
						if(trigger.name=='phase'){
							player.gain(player.storage.jinglve3,trigger.player,'giveAuto');
						}
						else if(get.position(player.storage.jinglve3,true)=='d') player.gain(player.storage.jinglve3,'gain2');
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
				//filter:function(event,player){
				//	return player.countCards('he')>=Math.min(2,game.dead.length);
				//},
				//selectCard:function(){
				//	return Math.min(2,game.dead.length);
				//},
				//filterCard:true,
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
			requanfeng:{
				audio:'quanfeng',
				enable:'chooseToUse',
				limited:true,
				skillAnimation:true,
				animationColor:'thunder',
				filter:function(event,player){
					return event.type=='dying'&&player==event.dying;
				},
				content:function(){
					player.awakenSkill('requanfeng');
					player.gainMaxHp(2);
					player.recover(4);
				},
				ai:{
					save:true,
					skillTagFilter:function(player,tag,arg){
						return player==arg;
					},
					order:10,
					result:{
						player:1,
					},
				},
				group:'requanfeng_gain',
			},
			requanfeng_gain:{
				audio:'quanfeng',
				trigger:{global:'die'},
				filter:function(event,player){
					return player.hasSkill('hongyi')&&event.player.getStockSkills('仲村由理','天下第一').filter(function(skill){
						var info=get.info(skill);
						return info&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte;
					}).length>0;
				},
				logTarget:'player',
				skillAnimation:true,
				animationColor:'thunder',
				prompt2:'（限定技）失去技能【劝封】，并获得该角色武将牌上的所有技能，然后加1点体力上限并回复1点体力',
				content:function(){
					player.awakenSkill('requanfeng');
					player.removeSkill('hongyi');
					var skills=trigger.player.getStockSkills('仲村由理','天下第一').filter(function(skill){
						var info=get.info(skill);
						return info&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte;
					});
					if(skills.length){
						for(var i of skills) player.addSkillLog(i);
						game.broadcastAll(function(list){
							game.expandSkills(list);
							for(var i of list){
								var info=lib.skill[i];
								if(!info) continue;
								if(!info.audioname2) info.audioname2={};
								info.audioname2.yanghuiyu='quanfeng';
							}
						},skills);
					}
					player.gainMaxHp();
					player.recover();
				}
			},
			quanfeng:{
				audio:2,
				trigger:{global:'die'},
				filter:function(event,player){
					return event.player.getStockSkills('仲村由理','天下第一').filter(function(skill){
						var info=get.info(skill);
						return info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte&&!info.limited&&!info.dutySkill;
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
						return info&&!info.juexingji&&!info.hiddenSkill&&!info.zhuSkill&&!info.charlotte&&!info.limited&&!info.dutySkill;
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
					global:['phaseBefore','dying','phaseDrawBegin2'],
					player:['enterGame','phaseZhunbeiBegin'],
				},
				direct:true,
				filter:function(event,player){
					if(event.name=='phaseDraw') return event.player.hasMark('tongqu');
					if(event.name=='dying') return event.player.hasMark('tongqu');
					if(event.name=='phaseZhunbei') return game.hasPlayer(function(current){
						return !current.hasMark('tongqu');
					});
					return !player.hasMark('tongqu')&&(event.name!='phase'||game.phaseNumber==0);
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
						if(target.hasSkill('zhengjian_mark')) return 0;
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
				ai:{
					notemp:true,
				},
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
					if(list.length>1){
						event.delay=true;
						game.asyncDraw(list,function(target){
							return Math.min(5,target.maxHp,target.countMark('zhengjian_mark'));
						});
					}
					else if(list.length==1) list[0].draw(Math.min(5,list[0].maxHp,list[0].countMark('zhengjian_mark')));
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
							if(get.mode()=='doudizhu'){
								if(cards.length==1&&!get.isLuckyStar(player)&&Math.random()<0.33) break;
								if(cards.length==2&&!get.isLuckyStar(player)&&Math.random()<0.5) break;
								if(cards.length>=3) break;
							}
							else{
								if(cards.length==3&&!get.isLuckyStar(player)&&Math.random()<0.33) break;
								if(cards.length==4&&!get.isLuckyStar(player)&&Math.random()<0.5) break;
								if(cards.length>=5) break;
							}
						}
						else break;
					};
					event.cards=cards;
					if(!cards.length){event.finish();return;};
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
						var roundmenu=false;
						if(ui.roundmenu&&ui.roundmenu.display!='none'){
							roundmenu=true;
							ui.roundmenu.style.display='none';
						}
						var event=_status.event;
						event.settleed=false;
						event.finishedx=[];
						event.map={};
						var names=list.slice(0)
						event.zhengjing_nodes=[];
						names.push('du');
						names.randomSort()
						var names2=names.slice(0);
						for(var i=0;i<2;i++){
							names2.randomSort();
							names=names.concat(names2);
						}
						
						event.zhengjing=names;
						for(var i of list){
							event.map[i]=0;
						}
						event.dialog=ui.create.dialog('forcebutton','hidden');
						event.dialog.textPrompt=event.dialog.add('<div class="text center">及时点击卡牌，但不要点到毒了！</div>');
						var str='<div class="text center">';
						for(var i of list){
							str+=(get.translation(i)+': '+Math.min(2,event.map[i])+'/2 ');
						}
						str+='</div>';
						event.dialog.textPrompt2=event.dialog.add(str);
						event.switchToAuto=function(){
							event._result={
								bool:true,
								links:event.finishedx.slice(0),
							};
							event.dialog.close();
							game.resume();
							_status.imchoosing=false;
							if(roundmenu) ui.roundmenu.style.display='';
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
							event.dialog.textPrompt2.innerHTML='';
							if(du){
								if(lib.config.background_speak) game.playAudio('skill','zhengjing_boom');
								event.dialog.textPrompt.innerHTML='<div class="text center">叫你别点毒你非得点 这下翻车了吧</div>';
							}
							else {
								if(lib.config.background_speak) game.playAudio('skill','zhengjing_finish');
								event.dialog.textPrompt.innerHTML='<div class="text center">整理经典结束！共整理出'+get.cnNumber(event.finishedx.length)+'份经典</div>';
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
								event.map[name]++;
								if(event.map[name]>1) event.finishedx.add(name);
								if(event.finishedx.length<list.length){
									var str='<div class="text center">';
									for(var i of list){
										str+=(get.translation(i)+': '+Math.min(2,event.map[i])+'/2 ');
									}
									str+='</div>';
									event.dialog.textPrompt2.innerHTML=str;
								}
								else{
									event.zhengjing.length=0;
									event.settle();
								}
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
					if(cards.length){
						player.showCards(cards,get.translation(player)+'整理出了以下经典');
						game.cardsGotoOrdering(cards);
					}
					else{
						game.log(player,'并没有整理出经典');
						player.popup('杯具');
						event.finish();
					}
					"step 2"
					game.updateRoundNumber();
					player.chooseTarget(true,'将整理出的经典置于一名角色的武将牌上').set('ai',function(target){
						if(target.hasSkill('xinfu_pdgyingshi')) return 0;
						var player=_status.event.player;
						var cards=_status.event.getParent().cards;
						var att=get.attitude(player,target);
						return -att;
						//if(cards.length==1) return -att;
						if(player==target) att/=2;
						if(target.hasSkill('pingkou')) att*=1.4;
						att*=(1+target.countCards('j')/2);
						return att;
					});
					"step 3"
					if(result.bool){
						var target=result.targets[0];
						event.target=target;
						player.line(target,'thunder');
					}
					"step 4"
					if(cards.length==1){
						event._result={bool:true,moved:[cards,[]]};
						return;
					}
					var next=player.chooseToMove('整经：请分配整理出的经典',true);
					next.set('list',[
						['置于'+get.translation(target)+'的武将牌上',cards],
						['自己获得'],
					]);
					next.set('filterMove',function(from,to,moved){
						if(moved[0].length==1&&to==1&&from.link==moved[0][0]) return false;
						return true;
					});
					next.set('filterOk',function(moved){
						return moved[0].length>0;
					});
					next.set('processAI',function(list){
						var cards=list[0][1].slice(0).sort(function(a,b){
							return get.value(a)-get.value(b);
						});
						return [cards.splice(0,1),cards];
					})
					"step 5"
					if(result.bool){
						var cards=result.moved[0],gains=result.moved[1];
						target.addSkill('zhengjing2');
						target.addToExpansion(cards,'gain2').gaintag.add('zhengjing2');
						if(gains.length) player.gain(gains,'gain2');
					}
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
				charlotte:true,
				intro:{content:'expansion',markcount:'expansion'},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				content:function(){
					'step 0'
					player.gain(player.getExpansions('zhengjing2'),'gain2');
					player.skip('phaseJudge');
					player.skip('phaseDraw');
					'step 1'
					player.removeSkill('zhengjing2');
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
					return event.getParent(2).relihuo==true&&event.player.isLinked();
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
						player.addToExpansion(card,target,'give').gaintag.add('rezhengrong');
					}
				},
				marktext:'荣',
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
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
					return player.getExpansions('rezhengrong').length>=3&&game.dead.length>0;
				},
				content:function(){
					'step 0'
					player.awakenSkill('rehongju');
					player.draw(player.getExpansions('rezhengrong').length);
					'step 1'
					if(player.countCards('h')==0) event.goto(3);
					else{
						var dialog=['请选择要交换的手牌和「荣」，或点「取消」','<div class="text center">「征荣」牌</div>',player.getExpansions('rezhengrong'),'<div class="text center">手牌区</div>',player.getCards('h')];
						var next=player.chooseButton(dialog);
						next.set('filterButton',function(button){
							var ss=_status.event.player.getExpansions('rezhengrong');
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
							var ss=_status.event.player.getExpansions('rezhengrong');
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
						var expansions=player.getExpansions('rezhengrong');
						for(var i=0;i<result.links.length;i++){
							var card=result.links[i];
							if(expansions.contains(card)) gains.push(card);
							else pushs.push(card);
						}
						player.addToExpansion(pushs,player,'give').gaintag.add('rezhengrong');
						player.gain(gains,'gain2');
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
					return player.getExpansions('rezhengrong').length>0;
				},
				chooseButton:{
					dialog:function(event,player){
						return ui.create.dialog('请选择要移去的「荣」',player.getExpansions('rezhengrong'),'hidden');
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
					player.loseToDiscardpile(card);
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
				trigger:{player:'phaseZhunbeiBegin'},
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
					target.addToExpansion(result.cards,'giveAuto',target).gaintag.add('reshanxi2');
				},
			},
			reshanxi2:{
				trigger:{global:'phaseEnd'},
				forced:true,
				popup:false,
				charlotte:true,
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				content:function(){
					'step 0'
					var cards=player.getExpansions('reshanxi2');
					if(cards.length) player.gain(cards,'draw');
					'step 1'
					player.removeSkill('reshanxi2');
				},
				intro:{
					markcount:'expansion',
					mark:function(dialog,storage,player){
						var cards=player.getExpansions('reshanxi2');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+get.cnNumber(cards.length)+'张牌';
					},
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
							try{
								var cardz=get.card();
							}
							catch(e){
								return;
							}
							if(!cardz||cardz.name!='sha') return;
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
						player.addToExpansion(result.cards,'giveAuto',player).gaintag.add('xinqingjian2');
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
					return player.getExpansions('xinqingjian2').length>0;
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				content:function(){
					'step 0'
					var cards=player.getExpansions('xinqingjian2');
					player.chooseTarget(true,lib.filter.notMe).set('createDialog',['清俭：选择一名角色获得这些牌'+(cards.length>1?'，然后摸一张牌':''),cards]);
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						if(target.gain(player.getExpansions('xinqingjian2'),player,'giveAuto').cards.length>1) player.draw();
					}
					'step 2'
					player.removeSkill('xinqingjian2');
				},
				intro:{
					markcount:'expansion',
					mark:function(dialog,storage,player){
						var cards=player.getExpansions('xinqingjian2');
						if(player.isUnderControl(true)) dialog.addAuto(cards);
						else return '共有'+get.cnNumber(cards.length)+'张牌';
					},
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
								case 'stab':name='cisha';break;
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
								case 'stab':name='cisha';break;
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
							if(event.controls){
								for(var i of event.controls) i.close();
							}
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
							for(var i of event.controls) i.close();
							game.resume();
							_status.imchoosing=false;
						},
						event.controls=[];
						for(var i=1;i<=6;i++) event.controls.push(ui.create.control('qiaosi_c'+i,function(link){
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
									for(var i of event.controls) i.close();
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
						}));
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
								if(target.hasSkillTag('nogain')) att/=10;
								if(target.hasJudge('lebu')) att/=5;
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
					content:"expansion",
					markcount:'expansion',
				},
				trigger:{
					player:"phaseJieshuBegin",
				},
				direct:true,
				filter:function(event,player){
					return player.countCards('he')>0&&!player.getExpansions('rebiaozhao').length;
				},
				content:function(){
					'step 0'
					player.chooseCard('he',get.prompt('rebiaozhao'),'将一张牌置于武将牌上作为“表”').ai=function(card){
						return 6-get.value(card);
					}
					'step 1'
					if(result.bool){
						player.logSkill('rebiaozhao');
						player.addToExpansion(player,'give',result.cards).gaintag.add('rebiaozhao');
					}
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{notemp:true},
				group:['rebiaozhao2','rebiaozhao3'],
			},
			rebiaozhao2:{
				trigger:{
					global:["loseAfter","cardsDiscardAfter"],
				},
				forced:true,
				audio:"biaozhao",
				filter:function(event,player){
					if(event.name=='lose'&&(event.position!=ui.discardPile||event.getParent(2).name=='rebiaozhao3')) return false;
					var cards=player.getExpansions('rebiaozhao');
					if(!cards.length) return false;
					var num=get.number(cards[0]);
					for(var i=0;i<event.cards.length;i++){
						if(get.number(event.cards[i])==num) return true;
					}
					return false;
				},
				content:function(){
					player.loseToDiscardpile(player.getExpansions('rebiaozhao'));
					player.loseHp();
				},
			},
			rebiaozhao3:{
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				forced:true,
				charlotte:true,
				audio:"biaozhao",
				filter:function(event,player){
					return player.getExpansions('rebiaozhao').length>0;
				},
				content:function(){
					"step 0"
					player.loseToDiscardpile(player.getExpansions('rebiaozhao'));
					"step 1"
					player.chooseTarget('令一名角色摸三张牌并回复1点体力',true).ai=function(target){
						var num=2;
						if(target.isDamaged()) num++;
						return num*get.attitude(_status.event.player,target);
					};
					"step 2"
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
				delay:false,
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
						return current.hasSex('male');
					})
				},
				skillAnimation:true,
				animationColor:'fire',
				content:function(){
					player.addSkill('rexushen2');
					player.awakenSkill('rexushen');
					player.loseHp(game.countPlayer(function(current){
						return current.hasSex('male');
					}));
				},
				ai:{
					order:10,
					result:{
						player:function(player){
							if(player.hp!=game.countPlayer(function(current){
								return current.hasSex('male');
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
							event.trigger('remoucheng_awaken');
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
				filter:function(event,player){
					return player.storage.relianji&&player.storage.relianji>2;
				},
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
						},'hs');
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							for(var j of lib.inpile_nature) list.push(['基本','','sha',j]);
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
									if(player.countCards('hs',{type:'basic'})>=2) return 3;
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
							position:'hs',
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
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.countCards('hs',{type:'basic'})>=2){
							return 3.3;
						}
						return 3.1;
					},
					respondSha:true,
					skillTagFilter:function(player,tag,arg){
						if(player.hasCard(function(card){
							return get.type(card)=='basic';
						},'hs')){
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
					return event.card.name=='sha'&&event.target.countCards('he')>0&&event.targets.length==1;
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
			xinfu_zhaoxin:{
				group:["zhaoxin_give"],
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				enable:"phaseUse",
				usable:1,
				audio:2,
				filter:function(event,player){
					return player.countCards('h')>0&&player.getExpansions('xinfu_zhaoxin').length<3;
				},
				filterCard:true,
				selectCard:function(){
					var player=_status.event.player;
					return [1,3-player.getExpansions('xinfu_zhaoxin').length];
				},
				discard:false,
				lose:false,
				delay:false,
				content:function(){
					player.addToExpansion(player,'give',cards).gaintag.add('xinfu_zhaoxin');
					player.draw(cards.length);
				},
				check:function(card){
					return 6-get.value(card);
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				ai:{
					order:1,
					result:{
						player:1,
					},
				},
			},
			zhaoxin_give:{
				trigger:{
					global:"phaseDrawAfter",
				},
				filter:function(event,player){
					if(!player.getExpansions('xinfu_zhaoxin').length) return false;
					return player==event.player||player.inRange(event.player);
				},
				direct:true,
				content:function(){
					'step 0'
					player.chooseCardButton(get.prompt('xinfu_zhaoxin',trigger.player),player.getExpansions('xinfu_zhaoxin'),function(button){
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
						trigger.player.gain(event.card,'give',player);
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
			xinfu_shangjian:{
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
				locked:true,
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
					player.judge('rewrite_bagua',function(card){return (get.suit(card)!='spade')?1.5:-0.5}).judge2=function(result){
						return result.bool;
					};
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
					if(!player.storage.yizan&&player.countCards('hes')<2) return false;
					return player.hasCard(function(card){
						return get.type(card)=='basic';
					},'hs');
				},
				filter:function(event,player){
					if(!player.storage.yizan&&player.countCards('hes')<2) return false;
					if(event.filterCard({name:'sha'},player,event)||
						event.filterCard({name:'shan'},player,event)||
						event.filterCard({name:'jiu'},player,event)||
						event.filterCard({name:'tao'},player,event)){
						return player.hasCard(function(card){
							return get.type(card)=='basic';
						},'hs');
					}
					return false;
				},
				chooseButton:{
					dialog:function(event,player){
						var list=[];
						if(event.filterCard({name:'sha'},player,event)){
							list.push(['基本','','sha']);
							for(var j of lib.inpile_nature) list.push(['基本','','sha',j]);
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
									if(player.storage.yizan&&player.countCards('hs',{type:'basic'})>2) return 3;
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
							position:'hes',
							popname:true,
							precontent:function(){
								player.addMark('yizan_use',1,false);
							},
						}
					},
					prompt:function(links,player){
						var str=player.storage.yizan?'一张基本牌':'两张牌(其中至少应有一张基本牌)';
						return '将'+str+'当做'+get.translation(links[0][3]||'')+get.translation(links[0][2])+'使用或打出';
					},
				},
				ai:{
					order:function(){
						var player=_status.event.player;
						var event=_status.event;
						if(event.filterCard({name:'jiu'},player,event)&&get.effect(player,{name:'jiu'})>0&&player.storage.yizan&&player.countCards('hs',{type:'basic'})>2){
							return 3.3;
						}
						return 3.1;
					},
					skillTagFilter:function(player,tag,arg){
						if(tag=='fireAttack') return true;
						if(!player.storage.yizan&&player.countCards('hes')<2) return false;
						if(!player.hasCard(function(card){
							return get.type(card)=='basic';
						},'hes')){
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
			xinfu_jingxie:{
				audio:2,
				video:function(player,info){
					var l2=player.getCards(info[0]?'e':'h'),l1=info[1];
					for(var j=0;j<l2.length;j++){
						if(l2[j].suit==l1[0]&&l2[j].number==l1[1]&&l2[j].name==l1[2]){
							l2[j].init([l2[j].suit,l2[j].number,'rewrite_'+l2[j].name]);
							break;
						}
					}
				},
			},
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
				lose:false,
				delay:false,
				check:function(){
					return 1;
				},
				content:function(){
					"step 0"
					player.showCards(cards);
					"step 1"
					var card=cards[0];
					var bool=(get.position(card)=='e');
					if(bool) player.removeEquipTrigger(card);
					game.addVideo('skill',player,['xinfu_jingxie',[bool,get.cardInfo(card)]])
					game.broadcastAll(function(card){
						card.init([card.suit,card.number,'rewrite_'+card.name]);
					},card);
					if(bool){
						var info=get.info(card);
						if(info.skills){
							for(var i=0;i<info.skills.length;i++){
								player.addSkillTrigger(info.skills[i]);
							}
						}
					}
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
				audioname:['re_taoqian'],
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
				audioname:['re_taoqian'],
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
				audioname:['re_taoqian'],
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
							aiOrder:function(player,card,num){
								var name=get.name(card);
								if(name=='tao') return num+7+Math.pow(player.getDamagedHp(),2);
								if(name=='sha') return num+6;
								if(get.subtype(card)=='equip2') return num+get.value(card)/3;
							},
						},
						trigger:{player:'useCard'},
						forced:true,
						charlotte:true,
						silent:true,
						popup:false,
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
				preHidden:true,
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
				preHidden:true,
				locked:false,
				filter:function(event,player){
					if(event.numFixed||player.getExpansions('tunchu').length) return false;
					return true;
				},
				content:function(){
					trigger.num+=2;
					player.addTempSkill('tunchu_choose','phaseDrawAfter');
				},
				onremove:function(player,skill){
					var cards=player.getExpansions(skill);
					if(cards.length) player.loseToDiscardpile(cards);
				},
				intro:{
					content:'expansion',
					markcount:'expansion',
				},
				mod:{
					cardEnabled:function(card,player){
						if(player.getExpansions('tunchu').length&&card.name=='sha'){
							return false;
						}
					},
				},
				subSkill:{
					choose:{
						trigger:{player:'phaseDrawEnd'},
						forced:true,
						popup:false,
						charlotte:true,
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
								player.addToExpansion(result.cards,player,'giveAuto').gaintag.add('tunchu');
							}
						}
					},
				}
			},
			shuliang:{
				audio:2,
				trigger:{global:'phaseJieshuBegin'},
				direct:true,
				filter:function(event,player){
					return player.getExpansions('tunchu').length>0&&event.player.countCards('h')<event.player.hp&&event.player.isAlive();
				},
				content:function(){
					'step 0'
					var goon=(get.attitude(player,trigger.player)>0);
					player.chooseCardButton(get.prompt('shuliang',trigger.player),player.getExpansions('tunchu')).set('ai',function(){
						if(_status.event.goon) return 1;
						return 0;
					}).set('goon',goon);
					'step 1'
					if(result.bool){
						player.logSkill('shuliang',trigger.player);
						player.loseToDiscardpile(result.links);
						trigger.player.draw(2);
					}
				},
				ai:{combo:'tunchu'},
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
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					if(!lib.inpile.contains('ly_piliche')) return true;
					return !!get.cardPile(function(card){
						return card.name=='ly_piliche';
					});
				},
				content:function(){
					var card;
					if(!lib.inpile.contains('ly_piliche')){
						card=game.createCard2('ly_piliche','diamond',1);
						lib.inpile.push('ly_piliche');
					}
					else card=get.cardPile(function(card){
						return card.name=='ly_piliche';
					});
					player.chooseUseTarget(card,true,'nopopup');
				},
				group:'polu_damage',
				subSkill:{
					damage:{
						trigger:{player:'damageEnd'},
						forced:true,
						filter:function(event,player){
							return !player.getEquip('ly_piliche');
						},
						content:function(){
							'step 0'
							event.count=trigger.num;
							'step 1'
							event.count--;
							player.draw();
							'step 2'
							var card=get.cardPile2(function(card){
								return get.subtype(card,false)=='equip1'&&player.canUse(card,player);
							});
							if(card) player.chooseUseTarget(card,true,'nopopup');
							'step 3'
							if(event.count>0&&!player.getEquip('ly_piliche')) event.goto(1);
						},
					},
				},
			},
			ly_piliche:{
				trigger:{source:'damageSource'},
				check:function(event,player){
					return get.attitude(player,event.player)*get.value(event.player.getDiscardableCards(player,'e'),event.player)>0;
				},
				filter:function(event,player){
					return player!=event.player&&event.player.countDiscardableCards(player,'e')>0;
				},
				logTarget:'player',
				content:function(){
					player.discardPlayerCard(trigger.player,'e',true,trigger.player.countCards('e'));
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
					if(ui.selected.cards.length||player.hasSkill('xinxhzhiyan_false')||player.countCards('h')>=player.maxHp) return [num,num];
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
					player.getCards('s',function(card){
						if(card.hasGaintag('gnjinfan')) list.add(get.suit(card));
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
						player.getCards('s',function(card){
							if(card.hasGaintag('gnjinfan')) list.add(get.suit(card));
						});
						player.getCards('h',function(card){
							list2.add(get.suit(card));
						});
						list2.removeArray(list);
						return list2.length;
					}()],function(card,player){
						return !player.countCards('s',function(cardx){
							return cardx.hasGaintag('gnjinfan')&&get.suit(cardx,false)==get.suit(card,player);
						})&&!ui.selected.cards.filter(function(cardx){
							return get.suit(cardx,player)==get.suit(card,player);
						}).length;
					}).set('ai',function(card){
						var player=_status.event.player;
						if(player.hasUseTarget(card)&&!player.hasValueTarget(card)) return 0;
						if(['sha','shan','wuxie','caochuan'].contains(card.name)) return 2+Math.random();
						return 1+Math.random();
					}).set('complexCard',true);
					'step 1'
					if(result.bool){
						player.logSkill('gnjinfan');
						game.log(player,'将',result.cards,'放到了武将牌上');
						player.loseToSpecial(result.cards,'gnjinfan').visible=true;
					}
					else event.finish();
					'step 2'
					player.markSkill('gnjinfan');
				},
				group:['gnjinfan_gain'],
				marktext:'铃',
				intro:{
					mark:function(dialog,storage,player){
						dialog.addAuto(player.getCards('s',function(card){
							return card.hasGaintag('gnjinfan');
						}));
					},
					markcount:function(storage,player){
						return player.getCards('s',function(card){
							return card.hasGaintag('gnjinfan');
						}).length;
					},
					onunmark:function(storage,player){
						var cards=player.getCards('s',function(card){
							return card.hasGaintag('gnjinfan');
						});
						if(cards.length){
							player.lose(cards,ui.discardPile);
							player.$throw(cards,1000);
							game.log(cards,'进入了弃牌堆');
						}
					},
				},
				mod:{
					aiOrder:function(player,card,num){
						if(get.itemtype(card)=='card'&&card.hasGaintag('gnjinfan')) return num+0.5;
					},
				},
			},
			gnjinfan_gain:{
				trigger:{player:'loseAfter'},
				forced:true,
				filter:function(event,player){
					if(!event.ss||!event.ss.length) return false;
					for(var i in event.gaintag_map){
						if(event.gaintag_map[i].contains('gnjinfan')) return true;
						return false;
					}
				},
				content:function(){
					'step 0'
					var cards=[];
					for(var i of trigger.ss){
						if(!trigger.gaintag_map[i.cardid]||!trigger.gaintag_map[i.cardid].contains('gnjinfan')) continue;
						var suit=get.suit(i,false);
						var card=get.cardPile2(function(card){
							return !cards.contains(card)&&get.suit(card,false)==suit;
						});
						if(card) cards.push(card);
					}
					if(cards.length) player.gain(cards,'gain2');
					var num=player.getCards('s',function(card){
						return card.hasGaintag('gnjinfan');
					}).length;
					if(num) player.markSkill('gnjinfan');
					else player.unmarkSkill('gnjinfan');
					'step 1'
					game.updateRoundNumber();
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
						try{
							card.gnsheque_tag=true;
						}catch(e){
							alert('发生了一个导致【射却】无法正常触发无视防具效果的错误。请关闭十周年UI/手杀UI等扩展以解决');
						}
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
			_doublegroup_choice:{
				trigger:{
					global:'gameStart',
					player:'enterGame',
				},
				forced:true,
				charlotte:true,
				firstDo:true,
				popup:false,
				filter:function(event,player){
					return get.mode()!='guozhan'&&get.is.double(player.name1)&&!player._groupChosen;
				},
				content:function(){
					'step 0'
					player._groupChosen=true;
					player.chooseControl(get.is.double(player.name1,true)).set('prompt','请选择你的势力');
					'step 1'
					player.changeGroup(result.control);
				},
			},
		},
		dynamicTranslate:{
			yizan_use:function(player){
				if(player.storage.yizan) return '你可以将一张基本牌当做任意基本牌使用或打出。';
				return '你可以将两张牌（其中至少一张为基本牌）当做任意基本牌使用或打出。';
			},
			miaojian:function(player){
				return [
					'出牌阶段限一次。你可将一张【杀】当做刺【杀】使用，或将一张锦囊牌当做【无中生有】使用。',
					'出牌阶段限一次。你可将一张基本牌当做刺【杀】使用，或将一张非基本牌当做【无中生有】使用。',
					'出牌阶段限一次。你可视为使用一张刺【杀】或【无中生有】。',
				][player.countMark('miaojian')];
			},
			shhlianhua:function(player){
				return [
					'当你成为【杀】的目标后，你摸一张牌。',
					'当你成为【杀】的目标后，你摸一张牌。然后你进行判定，若结果为黑桃，则此【杀】对你无效。',
					'当你成为【杀】的目标后，你摸一张牌。然后此【杀】的使用者选择一项：①弃置一张牌。②令此【杀】对你无效。',
				][player.countMark('shhlianhua')];
			},
			spshidi:function(player){
				if(player.countMark('spshidi')%2==0) return '转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。<span class="bluetext">②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。</span>③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。';
				return '转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。<span class="bluetext">③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。</span>';
			},
		},
		perfectPair:{
			wujing:['sunce','sunben','wuguotai'],
			simazhao:['simayi','jin_simayi','jin_wangyuanji'],
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
			wangcan:['tw_wangcan','wangcan','sp_wangcan'],
			sunshao:['sp_sunshao','sunshao'],
			xunchen:['re_xunchen','xunchen','sp_xunchen'],
			xinpi:['xinpi','sp_xinpi'],
			duyu:['duyu','sp_duyu'],
			zhangwen:['sp_zhangwen','zhangwen'],
			ol_bianfuren:['ol_bianfuren','sp_bianfuren'],
			wangshuang:['wangshuang','sp_wangshuang'],
			huaman:['huaman','sp_huaman'],
			gaolan:['dc_gaolan','gaolan','sp_gaolan'],
			cuiyan:['sp_cuiyan','cuiyan'],
			wujing:['tw_wujing','wujing'],
		},
		translate:{
			liuzan:'手杀留赞',
			re_sp_zhugeliang:"手杀卧龙",
			ly_piliche:'霹雳车',
			ly_piliche_info:'当你对其他角色造成伤害后，你可以弃置其装备区内的所有牌。',
			polu:'破橹',
			polu_info:'锁定技，回合开始时，若【霹雳车】未加入游戏或在牌堆/弃牌堆内，则你使用之；当你受到1点伤害后，若你的装备区里没有【霹雳车】，则你摸一张牌并使用牌堆中的一张随机武器牌。',
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
			"xinfu_shangjian_info":"锁定技。一名角色的结束阶段开始时，若你于此回合内失去了X张或更少的牌，则你可以摸等量的牌（X为你的体力值）。",
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
			old_caochun:'旧曹纯',
			shenpei:'审配',
			re_wangyun:'手杀王允',
			relianji:'连计',
			relianji_info:'出牌阶段限一次，你可以选择两名其他角色。第一名角色随机使用牌堆中的一张武器牌，然后这名角色视为对另一名角色随机使用一张下列的牌名的牌：【决斗】、【火攻】、【南蛮入侵】、【万箭齐发】或普【杀】。然后若此牌造成伤害，你获得X枚“连计”标记（X为此次扣减的体力值点数）。',
			remoucheng:'谋逞',
			remoucheng_info:'觉醒技，当一名角色因〖连计〗造成伤害后，若你拥有的“连计”标记数大于2，你加1点体力上限，回复1点体力，失去“连计”，获得“矜功”。',
			mobile_default:'常规',
			mobile_others:'其他',
			
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
			xinzhanyi_info:'出牌阶段限一次，你可以弃置一张牌并失去1点体力，然后根据你弃置的牌获得以下效果直到回合结束：基本牌，你可以将一张基本牌当作杀、酒或桃使用，且你本回合第一次以此法使用的牌的回复值/伤害值+1；锦囊牌，摸三张牌且你使用的牌不能被【无懈可击】响应；装备牌，你使用【杀】指定唯一目标后，其弃置两张牌，然后你获得其中的一张。',
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
			"rebiaozhao_info":"结束阶段，你可以将一张牌置于武将牌上，称为「表」。当有一张与「表」点数相同的牌进入弃牌堆后，你将「表」置入弃牌堆并失去1点体力。准备阶段，若你的武将牌上有「表」，则你移去「表」并选择一名角色，该角色回复1点体力并摸三张牌。",
			"rebiaozhao2":"表召",
			"rebiaozhao2_info":"",
			"rebiaozhao3":"表召",
			"rebiaozhao3_info":"",
			refuhai:'浮海',
			refuhai_info:'出牌阶段限一次，你可令其他角色同时在「潮起」和「潮落」中选择一项，并依次展示这些角色的选项。若从你下家开始选择了相同选项的角色数目大于1，则你摸X张牌（X为连续相同结果的数量）。',
			qiaosi:'巧思',
			qiaosi_info:'出牌阶段限一次，你可以表演「大键角色图」并根据表演结果获得相应的牌。然后，你选择一项：1.弃置X张牌。2.将X张牌交给一名其他角色。（X为你以此法获得的牌数）',
			qiaosi_map:'大键角色图',
			qiaosi_map_info:'<br><li>星野 梦美：锦囊牌*2<br><li>能美 库特莉亚芙卡：装备牌/【杀】/【酒】*1<br><li>友利 奈绪：【杀】/【酒】*1<br><li>神尾 观铃：【闪】/【桃】*1<br><li>伊吹 风子：锦囊牌/【闪】/【桃】*1<br><li>仲村 由理：装备牌*2<br><li>Illustration: うら;Twitter:@ura530',
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
			//仲村 由理
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
			chendeng:'手杀陈登',
			zhouxuan:'周旋',
			zhouxuan2:'周旋',
			zhouxuan_info:'出牌阶段限一次，你可以弃置一张牌并指定一名角色，然后选择一个基本牌的名称或非基本牌的类型。其使用或打出下一张牌时，若此牌的名称或类型和你选择的相同，则你观看牌堆顶的三张牌，然后将这些牌分配给任意角色。',
			fengji:'丰积',
			fengji_info:'锁定技，回合结束时，你记录你的手牌数。准备阶段开始时，若你的手牌数不小于你记录的手牌数，则你摸两张牌且本回合手牌上限为体力上限。',
			re_guanqiujian:'手杀毌丘俭',
			rezhengrong:'征荣',
			rehongju:'鸿举',
			reqingce:'清侧',
			reqingce_backup:'清侧',
			rezhengrong_info:'当你于出牌阶段使用的指定了其他角色为目标的牌结算完成后，若此牌是你本局游戏内于出牌阶段使用的指定了其他角色为目标的第偶数张牌，则你可以将一名其他角色角色的随机一张牌置于你的武将牌上，称为「荣」。',
			rehongju_info:'觉醒技，准备阶段，若你武将牌上「荣」的数量不小于3且有角色死亡，则你摸等同于「荣」数量的牌。然后可以用任意数量的手牌交换等量的「荣」。你减1点体力上限并获得技能〖清侧〗。',
			reqingce_info:'出牌阶段，你可以将一张「荣」置入弃牌堆，然后弃置场上的一张牌。',
			re_pangtong:"手杀庞统",
			dongcheng:'手杀董承',
			chengzhao:'承诏',
			chengzhao_info:'一名角色的结束阶段，若你于本回合内获得了两张以上的牌，则你可以与一名其他角色拼点。若你赢，你视为对其使用一张无视防具的【杀】。',
			yangyi:'手杀杨仪',
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
			dengzhi:'手杀邓芝',
			jimeng:'急盟',
			jimeng_info:'出牌阶段开始时，你可以获得一名其他角色的一张牌，然后交给该角色X张牌（X为你当前体力值）。',
			shuaiyan:'率言',
			shuaiyan_info:'弃牌阶段开始时，若你的手牌数大于1，则你可以展示所有手牌，然后你令一名其他角色交给你一张牌。',
			zhengxuan:'郑玄',
			zhengjing:'整经',
			zhengjing_info:'出牌阶段，你可以整理卡牌。然后，你将整理出的卡牌中的至少一张作为“经”置于一名角色的武将牌上，然后获得其余的牌。该角色的准备阶段获得这些牌，且跳过此回合的判定和摸牌阶段。',
			zhengjing2:'整经',
			
			mobile_yijiang:'将星独具',
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
			xinxhzhiyan_info:'出牌阶段每项各限一次，若你的手牌数：大于体力值，则你可以将X张手牌交给一名其他角色（X为你的手牌数与体力值之差）；小于体力上限，则你可以摸X张牌且本阶段内不能再对其他角色使用牌。（X为你的手牌数与体力上限之差）',
			weifeng:'威风',
			weifeng2:'威风',
			weifeng3:'威风',
			weifeng_info:'锁定技，当你于出牌阶段内使用第一张伤害性基本牌或普通锦囊牌后，你令此牌的一名没有“惧”的其他目标角色获得一枚名称为此牌牌名的“惧”。有“惧”的角色受到伤害时，其移去“惧”，然后若造成伤害的牌名称和“惧”：相同，此伤害+1；不同，你获得该角色的一张牌。准备阶段开始时或你死亡时，你移去场上的所有“惧”。',
			gnjinfan:'锦帆',
			gnjinfan_gain:'锦帆',
			gnjinfan_info:'弃牌阶段开始时，你可将任意张手牌置于武将牌上，称为“铃”（每种花色的“铃”限一张）。你可以如手牌般使用或打出“铃”。当有“铃”移动到处理区后，你从牌堆中获得与“铃”花色相同的一张牌。',
			gnsheque:'射却',
			gnsheque_info:'一名其他角色的准备阶段开始时，若其装备区内有牌，则你可以对其使用一张【杀】（无距离关系的限制且无视防具）。',
			sp_sufei:'手杀苏飞',
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
			hongyi_info:'出牌阶段限一次，你可以选择一名其他角色。你的下回合开始前，该角色造成伤害时进行判定，若结果为：黑色，此伤害-1。红色，受到伤害的角色摸一张牌。',
			requanfeng:'劝封',
			requanfeng_gain:'劝封',
			requanfeng_info:'限定技。①其他角色死亡时，你可失去〖弘仪〗，然后获得其武将牌上的所有非主公技，非隐匿技和非Charlotte技，加1点体力上限并回复1点体力。②当你处于濒死状态时，你可以加2点体力上限，然后回复4点体力。',
			quanfeng:'劝封',
			quanfeng_info:'锁定技，限定技，一名角色死亡时，你选择获得其的一个技能（主公技，限定技，觉醒技，隐匿技，使命技，带有Charlotte标签的技能除外），然后加1点体力上限并回复1点体力。',
			simashi:'司马师',
			baiyi:'败移',
			baiyi_info:'限定技，出牌阶段，若你已受伤，你可以交换两名其他角色的座次。',
			jinglve:'景略',
			jinglve2:'景略',
			jinglve3:'景略',
			jinglve_info:'出牌阶段限一次，若场上没有与你对应的「死士」牌，则你可以观看一名其他角色的手牌，将其中一张牌标记为「死士」。当其使用对应的实体牌中包含「死士」的牌时，你取消此牌的所有目标。当「死士」牌不因使用而进入弃牌堆，或其回合结束后，若「死士」牌仍在其区域内，则你获得此牌。',
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
			gongsunkang:'公孙康',
			juliao:'据辽',
			juliao_info:'锁定技，其他角色计算与你的距离始终+X（X为场上势力数-1）。',
			taomie:'讨灭',
			taomie1:'讨灭',
			taomie2:'讨灭',
			taomie3:'讨灭',
			taomie4:'讨灭',
			taomie_info:'当你受到伤害后或当你造成伤害后，你可以令伤害来源或受伤角色获得“讨灭”标记（如场上已有标记则转移给该角色）；你和拥有“讨灭”标记的角色视为在彼此的攻击范围内，且当你对该角色造成伤害时，选择一项：1. 此伤害+1；2. 你获得其区域内的一张牌并可将之交给另一名角色；3. 依次执行前两项并于伤害结算后弃置其“讨灭”标记。',
			xin_guohuai:'手杀郭淮',
			mobilejingce:'精策',
			mobilejingce_info:'结束阶段，若此回合因使用或打出而置入弃牌堆的牌的数量不小于你的体力值，则你可以摸两张牌。',
			xin_panzhangmazhong:'手杀潘璋马忠',
			xinduodao:'夺刀',
			xinduodao_info:'当你受到伤害后，你可以获得伤害来源装备区里的武器牌。',
			xinanjian:'暗箭',
			xinanjian_info:'锁定技，当你使用【杀】指定目标后，若你不在目标角色攻击范围内，你选择一项：1. 令其无法响应此【杀】；2. 其受到此【杀】造成的伤害+1。',
			xin_fuhuanghou:'手杀伏寿',
			xinzhuikong:'惴恐',
			xinzhuikong_info:'每轮限一次，其他角色的回合开始时，若其体力值不小于你，你可与其拼点。若你赢，其本回合无法使用牌指定除其以外的角色为目标；若你没赢，你获得其拼点的牌，然后其视为对你使用一张【杀】。',
			xinqiuyuan:'求援',
			xinqiuyuan_info:'当你成为【杀】的目标时，你可以令另一名其他角色交给你一张除【杀】以外的基本牌，否则其也成为此【杀】的目标。',
			xin_gongsunzan:'手杀公孙瓒',
			re_dengai:'手杀邓艾',
			flappybird:'飞鸟',
			flappybird_info:'出牌阶段，你可游玩一局Flappy Bird。',
			sp_wangcan:'手杀王粲',
			spqiai:'七哀',
			spqiai_info:'出牌阶段限一次，你可以将一张非基本牌交给一名其他角色。然后其选择一项：①你回复1点体力。②你摸两张牌。',
			spshanxi:'善檄',
			spshanxi_suoming:'善檄',
			spshanxi_info:'出牌阶段开始时，你可令一名其他角色获得“檄”标记并清除场上已有的其他“檄”标记（若有）。有“檄”标记的角色回复体力时，若其体力值大于0，则其需选择一项：①交给你两张牌。②失去1点体力。',
			sp_chenzhen:'陈震',
			shameng:'歃盟',
			shameng_info:'出牌阶段限一次，你可弃置两张颜色相同的手牌并选择一名其他角色。其摸两张牌，然后你摸三张牌。',
			sp_sunshao:'手杀孙邵',
			fubi:'辅弼',
			fubi2:'辅弼',
			fubi_info:'游戏开始时，你可选择一名其他角色。该角色的手牌上限于你死亡前+3。',
			zuici:'罪辞',
			zuici_info:'当你进入濒死状态时，你可废除你的一个不为空的装备栏，然后将体力值回复至1点。',
			sp_xunchen:'手杀荀谌',
			jianzhan:'谏战',
			jianzhan_info:'出牌阶段限一次，你可选择一名其他角色A和其攻击范围内的另一名手牌数小于其的角色B。A选择一项：①视为对B使用一张【杀】。②令你摸一张牌。',
			duoji:'夺冀',
			duoji_info:'限定技，出牌阶段，你可弃置两张手牌并选择一名装备区有牌的其他角色。你获得其装备区里的所有牌。',
			re_handang:'手杀韩当',
			luotong:'骆统',
			qinzheng:'勤政',
			qinzheng_info:'锁定技，当你使用或打出牌时，若你本局游戏内使用或打出过的牌数和：为3的倍数，你从牌堆中获得一张【杀】或【闪】；为5的倍数，你从牌堆中获得一张【桃】或【酒】；为8的倍数，你从牌堆中获得一张【决斗】或【无中生有】（可获得对应的衍生替换牌）。',
			sp_duyu:'手杀杜预',
			spwuku:'武库',
			spwuku_info:'锁定技，当有角色使用装备牌时，若你的“武库”数小于3，则你获得一个“武库”。',
			spwuku_info_guozhan:'锁定技，当有其他势力的角色使用装备牌时，若你的“武库”数小于2，则你获得一个“武库”。',
			spsanchen:'三陈',
			spsanchen_info:'觉醒技，结束阶段，若你的“武库”数大于2，则你加1点体力上限并回复1点体力，然后获得〖灭吴〗。',
			spmiewu:'灭吴',
			spmiewu2:'灭吴',
			spmiewu_backup:'灭吴',
			spmiewu_info:'每回合限一次。你可弃置一枚“武库”并将一张牌当做任意基本牌或锦囊牌使用，然后摸一张牌。',
			sp_bianfuren:'手杀卞夫人',
			spwanwei:'挽危',
			spwanwei_info:'每轮累计限一次。①出牌阶段，你可选择一名其他角色。②当有其他角色处于濒死状态时。你可令该角色回复X+1点体力（至少回复至1），然后你失去X点体力。（X为你的体力值）',
			spyuejian:'约俭',
			spyuejian_info:'锁定技，你的手牌上限基数等于你的体力上限。当你处于濒死状态时，你可弃置两张牌，然后回复1点体力。',
			feiyi:'费祎',
			reshengxi:'生息',
			reshengxi_info:'结束阶段，若你于本回合内未造成过伤害，则你可摸两张牌。',
			fyjianyu:'谏喻',
			fyjianyu_info:'每轮限一次。出牌阶段，你可选择两名角色，令这些角色获得“喻”直到你的下回合开始。当一名有“喻”的角色A使用牌指定另一名有“喻”的角色B为目标时，你令B摸一张牌。',
			fyjianyux:'谏喻',
			refubi:'辅弼',
			refubi_info:'游戏开始时，你可令一名其他角色获得“辅弼”标记。有“辅弼”标记的角色的准备阶段开始时，你可选择一项：①令其本回合使用【杀】的次数上限+1。②令其本回合的手牌上限+3。',
			rezuici:'罪辞',
			rezuici_backup:'罪辞',
			rezuici_info:'出牌阶段，或当你处于濒死状态时，你可以废除一个有牌的装备栏并回复2点体力，然后可以移动“辅弼”标记。',
			nanhualaoxian:'手杀南华老仙',
			yufeng:'御风',
			yufeng2:'御风',
			yufeng_info:'出牌阶段限一次，你可以表演“御风飞行”。若表演失败，则你摸X张牌。若表演成功，则你可以选择至多X名其他角色获得“御风”效果，然后摸X-Y张牌（准备阶段开始时，你进行判定。若结果为：红色，你跳过摸牌阶段；黑色，你跳过出牌阶段和弃牌阶段。X为你的得分。Y为你选择的角色数）。',
			tianshu:'天书',
			tianshu_info:'出牌阶段限一次，若场上没有【太平要术】，则你可以弃置一张牌并选择一名角色。该角色获得并使用【太平要术】。',
			wujing:'吴景',
			heji:'合击',
			heji_info:'当有角色使用的【决斗】或红色【杀】结算完成后，若此牌对应的目标数为1，则你可以对相同的目标使用一张【杀】或【决斗】（无距离和次数限制）。若你以此法使用的牌不为转化牌，则你从牌堆中随机获得一张红色牌。',
			liubing:'流兵',
			liubing_info:'锁定技。①当你声明使用【杀】时，若此牌是你本回合使用的第一张有唯一对应实体牌的【杀】，则你将此牌的花色改为♦。②其他角色于其出牌阶段内使用的非转化黑色杀结算结束后，若此【杀】未造成伤害，则你获得之。',
			sp_mifuren:'糜夫人',
			spcunsi:'存嗣',
			spcunsi2:'存嗣',
			spcunsi_info:'出牌阶段限一次，你可将武将牌翻至背面并选择一名其他角色。其从牌堆或弃牌堆中获得一张【杀】，且下一张杀的伤害值基数+1。',
			spguixiu:'闺秀',
			spguixiu_info:'锁定技，当你受到伤害后，若你的武将牌背面朝上，则你将武将牌翻至正面。当你的武将牌从背面翻至正面时，你摸一张牌。',
			sp_xinpi:'手杀辛毗',
			spyinju:'引裾',
			spyinju2:'引裾',
			spyinju_info:'出牌阶段限一次，你可令一名其他角色选择一项：①对你使用一张【杀】（无距离限制）。②其下个回合的准备阶段开始时，跳过出牌阶段和弃牌阶段。',
			spchijie:'持节',
			spchijie_info:'每回合限一次。当你成为其他角色使用牌的唯一目标时，你可判定。若结果大于6，则你取消此牌的所有目标。',
			reduoji:'夺冀',
			reduoji_info:'出牌阶段限一次，你可将一张牌置于其他角色的武将牌上，称为“冀”。当有装备牌因使用而进入一名角色的装备区后，若该角色有“冀”且其为使用者，则你获得此装备牌，其移去一个“冀”并摸一张牌。一名其他角色的回合结束后，若其有“冀”，则你获得其的所有“冀”。',
			re_jiangwei:'手杀姜维',
			retiaoxin:'挑衅',
			retiaoxin_info:'出牌阶段限一次，你可以指定一名有牌的其他角色，该角色需对你使用一张【杀】，否则你弃置其一张牌。',
			re_zhurong:'手杀祝融',
			relieren:'烈刃',
			relieren_info:'当你使用【杀】指定目标后，你可以和目标角色进行拼点。若你赢，你获得其一张牌。若你没赢，你获得对方的拼点牌，其获得你的拼点牌。',
			zhouqun:'周群',
			tiansuan:'天算',
			tiansuan_info:'出牌阶段限一次，若场上没有因你产生的“命运签”，则你可以抽取一张“命运签”，然后令一名角色获得“命运签”直到你的下回合开始。若你以此法抽取的“命运签”为：上上签，你观看其手牌；上上签/上签，你获得其区域内的一张牌。',
			tiansuan_faq:'【命运签】说明',
			tiansuan_faq_info:'当你抽取“命运签”时，你可以令其中一种命运签的权重+1。<br>上上签（权重1）：当你受到伤害时，防止此伤害。<br>上签（权重2）：当你受到伤害时，你令伤害值改为1；当你受到1点伤害后，你摸一张牌。<br>中签（权重3）：当你受到伤害时，你令伤害属性改为火属性并将伤害值改为1。<br>下签（权重2）：当你受到伤害时，你令此伤害+1。<br>下下签（权重1）：当你受到伤害时，你令此伤害+1。你不能使用【酒】或【桃】。',
			tiansuan2_0:'命运签',
			tiansuan2_1:'命运签',
			tiansuan2_2:'命运签',
			tiansuan2_damage:'命运签',
			tiansuan2_fire:'命运签',
			tiansuan2_3:'命运签',
			tiansuan2_4:'命运签',
			wangling:'王凌',
			mouli:'谋立',
			mouli_info:'出牌阶段限一次，你可以将一张手牌交给一名其他角色，其获得如下效果直到你的下回合开始：其可以将黑色牌当做【杀】，红色牌当做【闪】使用。其第一次触发“使用【杀】/【闪】结算完成后”的时机时，你摸三张牌。',
			zifu:'自缚',
			zifu_info:'锁定技，当有角色死亡时，若其因你获得的“谋立”效果未过期，则你减2点体力上限。',
			wangfuzhaolei:'王甫赵累',
			xunyi:'殉义',
			xunyi2:'殉义',
			xunyi3:'殉义',
			xunyi_info:'游戏开始时，或当上一个拥有“殉义”效果的角色死亡后，你可以选择一名角色获得如下效果：当其/你对二者之外的角色造成伤害后，你/其摸一张牌；当其/你受到二者之外的角色造成的伤害后，你/其弃置一张牌。',
			zhouchu:'周处',
			xianghai:'乡害',
			xianghai_info:'锁定技，其他角色的手牌上限-1。你手牌区的装备牌均视为【酒】。',
			chuhai:'除害',
			chuhai_info:'出牌阶段限一次，你可以摸一张牌，然后和一名其他角色拼点。若你赢，则你观看其手牌，并从牌堆/弃牌堆中获得其手牌中包含的类型的牌各一张，且当你于此阶段内对其造成伤害后，你将牌堆/弃牌堆中的一张装备牌置于你的一个空置装备栏内。',
			sp_kongrong:'孔融',
			spmingshi:'名士',
			spmingshi_info:'锁定技，当你受到1点伤害后，伤害来源弃置一张牌。',
			splirang:'礼让',
			splirang_info:'出牌阶段限一次，你可以弃置所有手牌，然后将其中的至多X张牌交给一名其他角色（X为你的体力值），之后摸一张牌。',
			ol_yujin:'手杀于禁',
			rejieyue:'节钺',
			rejieyue_info:'结束阶段开始时，你可以将一张牌交给一名其他角色。然后其选择一项：令你摸三张牌：或其保留一张手牌和装备区的牌，然后弃置其余的牌。',
			caizhenji:'蔡贞姬',
			sheyi:'舍裔',
			sheyi_info:'每轮限一次。当有体力值小于你的其他角色受到伤害时，你可以交给其至少X张牌并防止此伤害（X为你的体力值）。',
			tianyin:'天音',
			tianyin_info:'锁定技，结束阶段开始时，你从牌堆中获得每种本回合未使用过的类型的牌各一张。',
			xiangchong:'向宠',
			guying:'固营',
			guying_info:'锁定技。每回合限一次，当你于回合外因使用/打出/弃置而失去牌后，若牌数为1，则你获得一枚“固”并令当前回合角色选择一项：①随机交给你一张牌。②令你获得本次失去的牌，若为装备牌，则你使用之。准备阶段开始时，你移去所有“固”并弃置等量的牌。',
			muzhen:'睦阵',
			muzhen_backup:'睦阵',
			muzhen_info:'出牌阶段各限一次。①你可以将两张牌交给一名装备区内有牌的其他角色，然后获得其装备区内的一张牌。②你可以将装备区内的一张牌置于其他角色的装备区内，然后获得其一张手牌。',
			sp_huaxin:'手杀华歆',
			hxrenshi:'仁仕',
			hxrenshi_info:'出牌阶段每名角色限一次。你可以将一张手牌交给一名其他角色。',
			debao:'德保',
			debao_info:'锁定技，当其他角色获得你的牌后，若你的“仁”数小于你的体力上限，则你将牌堆顶的一张牌置于你的武将牌上，称为“仁”。准备阶段，你获得所有“仁”。',
			buqi:'不弃',
			buqi_info:'锁定技，当有角色进入濒死状态时，若你的“仁”数大于1，则你移去两张“仁”并令其回复1点体力。一名角色死亡后，你将所有“仁”置入弃牌堆。',
			sp_xujing:'手杀许靖',
			boming:'博名',
			boming_info:'出牌阶段限两次，你可以将一张牌交给一名其他角色。结束阶段，若你本回合以此法失去了两张以上的牌，则你摸一张牌。',
			ejian:'恶荐',
			ejian_info:'锁定技，每名角色限一次。当有其他角色因〖博名〗而获得了你的牌后，若其拥有与此牌类型相同的其他牌，则你令其选择一项：①受到1点伤害。②展示所有手牌，并弃置所有与此牌类别相同的牌。',
			xin_zhoucang:'手杀周仓',
			mobilezhongyong:'忠勇',
			mobilezhongyong_info:'当你于出牌阶段使用【杀】结算结束后，若没有目标角色使用【闪】响应过此【杀】，则你可获得此【杀】；否则你可选择一项：①获得目标角色使用的【闪】，然后可将此【杀】交给另一名其他角色。②将目标角色使用的【闪】交给另一名其他角色，然后你本回合使用【杀】的次数上限+1且下一张【杀】的伤害值基数+1。（你不能使用本回合因执行〖忠勇〗的效果获得的牌）',
			mjdingyi:'定仪',
			mjdingyi_info:'游戏开始时，你选择一个效果（相同效果不可叠加）并令全场角色获得之：①摸牌阶段额定摸牌数+1。②手牌上限+2。③攻击范围+1。④脱离濒死状态时回复1点体力。',
			mjzuici:'罪辞',
			mjzuici_info:'当你受到伤害后，你可令伤害来源失去〖定仪〗效果，然后令其从牌堆中获得一张由你选择的智囊。',
			mjfubi:'辅弼',
			mjfubi_info:'每轮限一次。出牌阶段，你可选择一项：①更换一名角色的〖定仪〗效果。②弃置一张牌并令一名角色的〖定仪〗效果翻倍直到你的下回合开始。',
			mjshengxi:'生息',
			mjshengxi_info:'准备阶段，你可以获得一张【调剂盐梅】；结束阶段，若你本回合使用过牌且未造成伤害，则你可以获得一张智囊。',
			mjkuanji:'宽济',
			mjkuanji_info:'每回合限一次。当你因弃置而失去牌后，你可令一名其他角色获得其中的一张牌，然后你摸一张牌。',
			tiaojiyanmei:'调剂盐梅',
			tiaojiyanmei_info:'出牌阶段，对两名手牌数不均相同的其他角色使用。若目标角色于此牌使用准备工作结束时的手牌数大于此时所有目标的平均手牌数，其弃置一张牌。若小于则其摸一张牌。此牌使用结束后，若所有目标角色的手牌数均相等，则你可令一名角色获得所有因执行此牌效果而弃置的牌。',
			binglinchengxiax:'兵临城下',
			binglinchengxiax_info:'出牌阶段，对一名其他角色使用。你展示牌堆顶的四张牌，依次对其使用其中所有的【杀】，然后将剩余的牌置于牌堆顶。',
			mjweipo:'危迫',
			mjweipo_effect:'危迫',
			mjweipo_remove:'危迫',
			mjweipo_info:'出牌阶段限一次。你可以选择一个智囊或【兵临城下】，令一名没有〖危迫〗效果的角色获得如下一次性效果直到你下回合开始：其可于出牌阶段弃置一张【杀】，并获得一张你选择的牌。',
			mjchenshi:'陈势',
			mjchenshi_player:'陈势',
			mjchenshi_target:'陈势',
			mjchenshi_info:'当有角色使用【兵临城下】指定第一个目标后，其可交给你一张牌，并将牌堆的顶三张牌中所有不为【杀】的牌置入弃牌堆；当有角色成为【兵临城下】的目标后，其可交给你一张牌，然后将牌堆顶三张牌中所有的【杀】置入弃牌堆。',
			mjmouzhi:'谋识',
			mjmouzhi_info:'锁定技，当你受到伤害时，若伤害渠道对应的牌和你上次受到的伤害花色相同，则你防止此伤害。',
			zhangzhongjing:'张机',
			jishi:'济世',
			jishi_info:'锁定技。①当你使用的牌结算完成后，若你未因此牌造成过伤害，则你将此牌对应的所有实体牌置于仁库中。②当有牌不因溢出而离开仁库时，你摸一张牌。',
			liaoyi:'疗疫',
			liaoyi_info:'其他角色的回合开始时，若其：①手牌数小于体力值且仁库内牌数大于等于X，则你可令其从仁库中获得X张牌；②手牌数大于体力值，则你可以令其将X张牌置于仁库中（X为其手牌数与体力值之差且至多为4）。',
			xinliaoyi:'疗疫',
			xinliaoyi_info:'其他角色的回合开始时，你可选择一项：①令其从仁库中获得一张牌。②若其手牌数大于体力值，则令其将X张手牌置入仁库（X为其手牌数与体力值之差）。',
			binglun:'病论',
			binglun_info:'出牌阶段限一次，你可以将仁库中的一张牌置于弃牌堆并选择一名角色。该角色选择一项：①摸一张牌。②于其下回合结束时回复1点体力。',
			sp_zhangwen:'手杀张温',
			gebo:'戈帛',
			gebo_info:'锁定技，当有角色回复体力后，你将牌堆顶的一张牌置入仁库。',
			spsongshu:'颂蜀',
			spsongshu_info:'其他角色的摸牌阶段开始时，若其体力值大于你且仁库内有牌，则你可以令其放弃摸牌。其改为获得X张仁（X为你的体力值且至多为5），且本回合内不能使用牌指定其他角色为目标。',
			liuzhang:'刘璋',
			xiusheng:'休生',
			xiusheng_info:'锁定技。准备阶段，你将所有“生”置入弃牌堆，然后摸X张牌，并将等量的牌置于武将牌上，称为“生”（X为你因〖引狼〗而选择的势力的存活角色数）。',
			yinlang:'引狼',
			yinlang_info:'①每轮限一次。回合开始时，你选择场上的一个势力。②一名角色的出牌阶段开始时，若其势力与你选择的势力相同，则其选择一项：1.获得你的一张“生”，然后其本回合使用牌时不能指定你以外的角色为目标。2.你获得一张“生”。',
			huaibi:'怀璧',
			huaibi_info:'主公技，锁定技。你的手牌上限+X（X为你因〖引狼〗而选择的势力的存活角色数）。',
			qiaogong:'桥公',
			yizhu:'遗珠',
			yizhu_info:'①结束阶段，你摸两张牌，然后将两张牌随机插入牌堆前2X张牌的位置中（X为角色数，选择牌的牌名对其他角色可见）。②当有其他角色使用“遗珠”牌指定唯一目标时，你可清除对应的“遗珠”标记并取消此目标，然后你可使用此牌。③当有“遗珠”牌进入弃牌堆后，你摸一张牌并清除对应的“遗珠”标记。',
			luanchou:'鸾俦',
			luanchou_info:'出牌阶段限一次，你可令两名角色获得“姻”标记并清除原有标记。拥有“姻”标记的角色视为拥有技能〖共患〗。',
			gonghuan:'共患',
			gonghuan_info:'锁定技。每回合限一次，一名其他角色受到伤害时，若其拥有“姻”标记且其体力值小于你，则你将伤害转移给自己。此伤害结算结束后，若你与其体力值相等，则你与其移去“姻”标记。',
			sp_yanghu:'手杀羊祜',
			mingfa:'明伐',
			mingfa_info:'①结束阶段，你可展示一张牌并记录为“明伐”。②出牌阶段开始时，若“明伐”牌在你的手牌区或装备区，则你可以使用“明伐”牌与一名其他角色拼点。若你赢：你获得对方一张牌并从牌堆中获得一张点数等于“明伐”牌牌面点数-1的牌。若你没赢：你本回合不能使用牌指定其他角色为目标。③你的拼点牌亮出后，你令此牌的点数+2。',
			rongbei:'戎备',
			rongbei_info:'限定技。出牌阶段，你可选择一名有空装备栏的角色。系统为该角色的每个空装备栏选择一张装备牌，然后该角色使用之。',
			xin_caifuren:'手杀蔡夫人',
			xinqieting:'窃听',
			xinqieting_info:'其他角色的回合结束时，若其本回合内未对其他角色造成过伤害，则你可选择一项：①摸一张牌。②观看其两张手牌并获得其中的一张。③将其装备区内的一张牌移动至你的装备区。',
			xinguixiu:'闺秀',
			xinguixiu_info:'锁定技。结束阶段，若你的体力值为：奇数，你摸一张牌；偶数，你回复1点体力。',
			qingyu:'清玉',
			qingyu_info:'使命技。①当你受到伤害时，你弃置两张牌，然后防止此伤害。②使命：准备阶段，若你的体力值等于体力上限且你没有手牌，则你获得〖悬存〗。③失败：当你进入濒死状态时，你减1点体力上限。',
			xuancun:'悬存',
			xuancun_info:'其他角色的回合结束时，若你的手牌数小于体力值，则你可以令其摸X张牌（X为你的体力值与手牌数之差且至多为2）',
			xinlirang:'礼让',
			xinlirang_info:'①其他角色的摸牌阶段开始时，若你没有“谦”标记，则你可以获得一枚“谦”标记。若如此做，其额定摸牌数+2，且本回合的弃牌阶段开始时，你可以获得其弃置的至多两张牌。②摸牌阶段开始时，若你有“谦”标记，则你跳过此摸牌阶段并移除“谦”标记。',
			xinmingshi:'名仕',
			xinmingshi_info:'锁定技，当你受到伤害后，若你有“谦”标记，则伤害来源弃置一张牌。若此牌为：黑色：你获得之。红色，你回复1点体力。',
			xingqi:'星启',
			xingqi_info:'①当你使用牌时，若此牌不为延时锦囊牌且你没有同名的“备”，则你获得一枚与此牌名称相同的“备”。②结束阶段，你可移去一枚“备”，然后从牌堆中获得一张与此“备”名称相同的牌。',
			xinzifu:'自缚',
			xinzifu_info:'锁定技。出牌阶段结束时，若你本阶段内未使用牌，则你移去所有“备”且本回合的手牌上限-1。',
			mibei:'秘备',
			mibei_info:'使命技。①使命：当你使用的牌结算完成后，若你的“备”中包含的基本牌，锦囊牌，装备牌数量均大于1，则你从牌堆中获得这三种类型的牌各一张并获得技能“谋立”。②失败：结束阶段开始时，若你没有“备”，且你于本回合的准备阶段开始时也没有“备”，则你减1点体力上限。',
			xinmouli:'谋立',
			xinmouli_info:'出牌阶段限一次，你可以指定一名其他角色。其移去你的一个“备”，然后从牌堆中获得一张与此“备”名称相同的牌。',
			re_zhonghui:'手杀钟会',
			requanji:'权计',
			requanji_info:'出牌阶段结束时，若你的手牌数大于体力值，或当你受到1点伤害后，你可以摸一张牌，然后将一张手牌置于武将牌上，称为“权”；你的手牌上限+X（X为“权”的数量）。',
			xin_guyong:'手杀顾雍',
			xinshenxing:'慎行',
			xinshenxing_info:'出牌阶段限X次（X为你的体力值），你可以弃置两张牌，然后摸一张牌。若这两张牌颜色不同，则改为摸两张牌。',
			xinbingyi:'秉壹',
			xinbingyi_info:'结束阶段，你可展示所有手牌。若这些牌的颜色或类型均相同，则你可以令至多X名角色各摸一张牌（X为你的手牌数）。',
			db_wenyang:'文鸯',
			dbquedi:'却敌',
			dbquedi_info:'每回合限一次。当你使用【杀】或【决斗】指定唯一目标后，你可选择：①获得目标角色的一张手牌。②弃置一张基本牌，并令此牌的伤害值基数+1。③背水：减1点体力上限，然后依次执行上述所有选项。',
			dbzhuifeng:'椎锋',
			dbzhuifeng_info:'魏势力技。每回合限两次，你可以失去1点体力并视为使用一张【决斗】。当你因此【决斗】而受到伤害时，你防止此伤害并令此技能失效直到出牌阶段结束。',
			dbchongjian:'冲坚',
			dbchongjian_backup:'冲坚',
			dbchongjian_info:'吴势力技。你可以将一张装备牌当做一种【杀】（无距离限制且无视防具）或【酒】使用。当你以此法使用【杀】造成伤害后，你获得目标角色装备区内的X张牌（X为伤害值）。',
			dbchoujue:'仇决',
			dbchoujue_info:'锁定技。当你杀死其他角色后，你加1点体力上限并摸两张牌，然后本回合发动【却敌】的次数上限+1。',
			qiaozhou:'谯周',
			zhiming:'知命',
			zhiming_info:'准备阶段开始时或弃牌阶段结束时，你摸一张牌，然后可以将一张牌置于牌堆顶。',
			xingbu:'星卜',
			xingbu_info:'结束阶段，你可以展示牌堆顶的三张牌，然后根据X值（X为这三张牌中红色牌的数量），令一名其他角色获得对应的效果直到其下回合结束：①三张：其摸牌阶段多摸两张牌，使用【杀】的次数上限+1。②两张：其使用【杀】的次数上限-1，跳过弃牌阶段。③小于两张：其于准备阶段开始时弃置一张手牌。',
			yuanqing:'渊清',
			yuanqing_info:'锁定技，出牌阶段结束时，你随机将弃牌堆中你本阶段使用过的牌类型的各一张牌置于仁库中。', 
			shuchen:'疏陈',
			shuchen_info:'锁定技，当有角色进入濒死状态时，若仁库中的牌数大于四，则你获得仁库中的所有牌，然后其回复1点体力。',
			rechuhai:'除害',
			rechuhai_info:'使命技。①出牌阶段限一次，你可以摸一张牌，然后和一名其他角色拼点。若你赢，则你观看其手牌，并从牌堆/弃牌堆中获得其手牌中包含的类型的牌各一张，且当你于此阶段内对其造成伤害后，你将牌堆/弃牌堆中的一张装备牌置于你的一个空置装备栏内。②当你因发动〖除害①〗而展示拼点牌时，你令此牌的点数+X（X=(4-你装备区的牌数)）。③使命：当有装备牌进入你的装备区后，若你的装备区内有至少三张牌，则你将体力值回复至上限，失去〖乡害〗并获得〖彰名〗。④失败：当你因发动〖除害①〗发起的拼点没赢时，若你的最终点数不大于6，则你触发使命失败分支。',
			zhangming:'彰名',
			zhangming_info:'锁定技。①你使用的♣牌不能被其他角色响应。②每回合限一次，当你对其他角色造成伤害后，你随机弃置其一张手牌，然后你从牌堆或弃牌堆中获得与其展示牌类型不同类型的牌各一张（若其没有手牌，则你改为从牌堆或弃牌堆中获得所有类型牌各一张），且以此法获得的牌不计入本回合的手牌上限。',
			xin_sunluban:'手杀孙鲁班',
			xinzenhui:'谮毁',
			xinzenhui_info:'出牌阶段限一次。当你使用【杀】或黑色普通锦囊牌指定目标时，你可选择另一名能成为此牌目标的其他角色并选择一项：①令其也成为此牌的目标。②获得其一张牌，然后将此牌的使用者改为该角色。',
			xinjiaojin:'骄矜',
			xinjiaojin_info:'当你受到男性角色造成的伤害时，你可以弃置一张装备牌并防止此伤害。',
			xin_caozhen:'手杀曹真',
			discretesidi:'司敌',
			discretesidi_info:'①当你使用的不为延时锦囊牌的牌结算结束后，你可选择一名R内不存在以a为第一序偶的二元序偶的其他角色a，并选择一名角色b，在关系R内建立二元序偶&lt;a,b&gt;（b对其他角色不可见）。②一名角色a使用不为延时锦囊牌的牌指定b为目标时，若(aRb)∧(此牌目标数为1)为真，则{你从R内移除&lt;a,b&gt;，且：若b为你，你摸一张牌；若b不为你，你可选择：⒈取消此牌的目标，然后若场上没有处于濒死状态的角色，则你对a造成1点伤害。⒉摸两张牌}；否则{你清除R内以a为第一元素的二元序偶}。',
			sp_chendong:'陈武董袭',
			spyilie:'毅烈',
			spyilie_info:'出牌阶段开始时，你可选择：①本阶段内使用【杀】的次数上限+1。②本回合内使用【杀】被【闪】抵消时，摸一张牌。③背水：失去1点体力，然后依次执行上述所有选项。',
			spfenming:'奋命',
			spfenming_info:'出牌阶段限一次，你可以选择一名体力值不大于你的角色。若其：未横置，其横置；已横置，你获得其一张牌。',
			yuanhuan:'袁涣',
			qingjue:'请决',
			qingjue_info:'每轮限一次。当有其他角色A使用牌指定另一名体力值小于A且不处于濒死状态的其他角色B为目标时，你可以摸一张牌，然后与A拼点。若你赢，你取消此目标。若你没赢，你将此牌的目标改为自己。',
			fengjie:'奉节',
			fengjie2:'奉节',
			fengjie_info:'锁定技，准备阶段开始时，你选择一名其他角色并获得如下效果直到你下回合开始：一名角色的结束阶段开始时，你将手牌摸至（至多摸四张）或弃置至与其体力值相等。',
			sp_zongyu:'手杀宗预',
			zhibian:'直辩',
			zhibian_info:'准备阶段，你可以和一名其他角色拼点。若你赢，你可选择：①将其装备区/判定区内的一张牌移动到你的对应区域。②回复1点体力。③背水：跳过下个摸牌阶段，然后依次执行上述所有选项；若你没赢，你失去1点体力。',
			yuyan:'御严',
			yuyan_info:'锁定技。当你成为非转换的【杀】的目标时，若使用者的体力值大于你且此【杀】有点数，则你令使用者选择一项：①交给你一张点数大于此【杀】的牌。②取消此目标。',
			fuqian:'傅佥',
			jueyong:'绝勇',
			jueyong_info:'锁定技。①当你不因〖绝勇〗成为唯一牌的目标时，若此牌不为转化牌且对应的实体牌牌数为1且不为【桃】或【酒】且你的“绝”数小于你的体力值的二倍，则你将此牌置于你的武将牌上，称为“绝”，且取消此牌的目标。②结束阶段开始时，若你有“绝”，则你令所有“绝”的原使用者依次对你使用所有“绝”，将无法使用的“绝”置入弃牌堆。',
			poxiang:'破降',
			poxiang_info:'出牌阶段限一次。你可以将一张牌交给一名其他角色。你摸三张牌（不计入本回合的手牌上限），移去所有“绝”并失去1点体力。',
			jutu:'据土',
			jutu_info:'锁定技，准备阶段，你获得所有你武将牌上的“生”，然后摸X+1张牌，然后将X张牌置于你的武将牌上，称为“生”（X为你因〖邀虎〗选择势力的角色数量)。',
			yaohu:'邀虎',
			yaohu_info:'每轮限一次，你的回合开始时，你须选择场上一个势力。该势力其他角色的出牌阶段开始时，其获得你的一张“生”，然后其须选择一项：①对你指定的另一名的其他角色使用一张【杀】（无距离和次数限制）；②交给你两张牌。',
			rehuaibi:'怀璧',
			rehuaibi_info:'主公技，锁定技，你的手牌上限+X（X为你因〖邀虎〗选择势力的角色数量)。',
			simafu:'司马孚',
			xunde:'勋德',
			xunde_info:'一名角色受到伤害后，若你至其的距离不大于1，则你可判定。若判定结果：大于5，你令该角色获得判定牌；小于7，你令伤害来源弃置一张牌。',
			chenjie:'臣节',
			chenjie_info:'一名角色的判定牌生效前，你可打出一张花色相同的牌。系统将你打出的牌作为新判定牌，将原判定牌置入弃牌堆。然后你摸两张牌。',
			mayuanyi:'马元义',
			jibing:'集兵',
			jibing_info:'①摸牌阶段开始时，若你的“兵”数小于势力数，则你可以改为将牌堆顶的两张牌置于你的武将牌上，称为“兵”。②你可以将一张“兵”当做【杀】或【闪】使用或打出。',
			wangjing:'往京',
			wangjing_info:'锁定技。当你因〖集兵〗而使用或打出牌时，若对方是场上体力值最高的角色，则你摸一张牌。',
			moucuan:'谋篡',
			moucuan_info:'觉醒技。准备阶段，若你的“兵”数不小于势力数，则你减1点体力上限并获得〖兵祸〗。',
			binghuo:'兵祸',
			binghuo_info:'一名角色的结束阶段开始时，若你本回合内因〖集兵〗而使用或打出过牌，则你可令一名角色判定。若判定结果为黑色，则你对其造成1点雷属性伤害。',
			yanpu:'阎圃',
			huantu:'缓图',
			huantu_info:'每轮限一次。一名角色的摸牌阶段开始前，若其在你攻击范围内，则你可以交给其一张牌并令其跳过此阶段。然后你于此回合的结束阶段选择一项：①令其回复1点体力并摸两张牌。②你摸三张牌，然后交给其两张手牌。',
			bihuo:'避祸',
			bihuo_info:'限定技。一名角色脱离濒死状态时，你可以令其摸三张牌，然后其他角色计算至其的距离时+X直到本轮结束（X为角色数）。',
			sp_wangshuang:'手杀王双',
			yiyong:'异勇',
			yiyong_info:'当你受到其他角色造成的渠道为【杀】的伤害后，若你的装备区内有武器牌，则你可以获得此【杀】对应的所有实体牌，然后将这些牌当做【杀】对伤害来源使用（无距离限制）。若其装备区内没有武器牌，则此伤害+1。',
			shanxie:'擅械',
			shanxie_info:'①出牌阶段限一次，你可从牌堆中获得一张武器牌。若牌堆中没有武器牌，则你改为随机获得一名角色装备区内的一张武器牌。②当其他角色使用【闪】响应你使用的【杀】时，若此【闪】没有点数或点数不大于你攻击范围的二倍，则你令此【闪】无效。',
			shanxie_info_old:'①出牌阶段限一次，你可选择一项：⒈从牌堆中获得一张武器牌。⒉获得一名其他角色装备区内的一张武器牌并使用，然后其将一张手牌当做【杀】对你使用。②当其他角色使用【闪】响应你使用的【杀】时，若此【闪】没有点数或点数不大于你攻击范围的二倍，则你令此【闪】无效。',
			sunyi:'手杀孙翊',
			zaoli:'躁厉',
			zaoli_info:'锁定技。①你不能于回合内使用你手牌中不为本回合获得的牌。②当你使用或打出手牌时，你获得一个“厉”（至多4个）。③回合开始时，若你有“厉”，则你移去所有“厉”并弃置任意张牌，然后摸X+Y张牌。若X大于2，你失去1点体力（X为你移去的标记数，Y为你弃置的牌数）。',
			sp_gaolan:'手杀高览',
			spjungong:'峻攻',
			spjungong_info:'出牌阶段，你可失去X+1点体力或弃置X+1张牌，视为对一名其他角色使用【杀】（不计入次数和距离限制，X为你本回合内发动过〖等力〗的次数）。若你因此【杀】造成了伤害，则你令此技能失效直到回合结束。',
			spdengli:'等力',
			spdengli_info:'当你使用【杀】指定目标后，或成为【杀】的目标后，若使用者和目标的体力值相等，则你摸一张牌。',
			sp_huaman:'手杀花蔓',
			spxiangzhen:'象阵',
			spxiangzhen_info:'锁定技。①【南蛮入侵】对你无效。②当有角色使用的【南蛮入侵】结算结束后，若有角色因此牌受到过伤害，则你和使用者各摸一张牌。',
			spfangzong:'芳踪',
			spfangzong_info:'锁定技。若你于当前回合内未发动过〖嬉战〗选择过选项二，则：①你不能于回合内使用具有伤害标签的牌指定攻击范围内的角色为目标。②攻击范围内包含你的角色不能使用具有伤害标签的牌指定你为目标。③结束阶段，你将手牌摸至X张（X为场上存活人数且至多为8）',
			spxizhan:'嬉战',
			spxizhan_info:'其他角色的回合开始时，你须选择一项：①失去1点体力。②弃置一张牌。然后若此牌的花色为：♠，其视为使用一张【酒】；♥，你视为使用一张【无中生有】；♣，你视为对其使用【铁索连环】；♦：你视为对其使用火【杀】（无距离限制）。',
			sp_cuiyan:'手杀崔琰',
			spyajun:'雅俊',
			spyajun_info:'①摸牌阶段，你令额定摸牌数+1。②出牌阶段开始时，你可以用一张本回合获得的牌与其他角色拼点。若你赢，则你可将其中一张拼点牌置于牌堆顶。若你没赢，你本回合的手牌上限-1。',
			spzundi:'尊嫡',
			spzundi_info:'出牌阶段限一次，你可以弃置一张手牌并选择一名角色，然后你进行判定。若结果为：黑色，其摸三张牌；红色，其可以移动场上的一张牌。',
			sp_zhangchangpu:'手杀张昌蒲',
			spdifei:'抵诽',
			spdifei_info:'锁定技。每回合限一次，当你受到伤害后，你摸一张牌或弃置一张手牌，然后展示所有手牌。若此伤害的渠道为没有花色的牌或你的手牌中没有与此牌花色相同的牌，则你回复1点体力。',
			spyanjiao:'严教',
			spyanjiao_info:'出牌阶段限一次。你可以将手牌中一种花色的所有牌交给一名其他角色，对其造成1点伤害。然后你于自己的下回合开始时摸等量的牌。',
			sp_jiangwan:'蒋琬',
			spzhenting:'镇庭',
			spzhenting_info:'每回合限一次。当你攻击范围内的角色成为【杀】或延时锦囊的目标时，若你不是此牌的使用者且不是此牌的目标，则你可以将此目标改为自己。然后你选择一项：①弃置使用者的一张手牌。②摸一张牌。',
			spjincui:'尽瘁',
			spjincui_info:'限定技。出牌阶段，你可以和一名其他角色交换位置，然后失去X点体力（X为你的体力值）。',
			sp_jiangqing:'蒋钦',
			spjianyi:'俭衣',
			spjianyi_info:'锁定技。其他角色的回合结束时，若弃牌堆中有于本回合内因弃置而进入弃牌堆的防具牌，则你获得其中一张。',
			spshangyi:'尚义',
			spshangyi_info:'出牌阶段限一次。你可以弃置一张牌并选择一名其他角色。其观看你的手牌，然后你观看其手牌并获得其中的一张。',
			sunhanhua:'孙寒华',
			chongxu:'冲虚',
			chongxu_info:'出牌阶段限一次，你可以随机演奏一首音乐，并根据完成度来获得相应的分数（至多五分）。然后你可修改〖妙剑〗或〖莲华〗（消耗3分），并使用剩余的分数进行摸牌（每张2分）。',
			chongxu_faq:'目前的曲库',
			chongxu_faq_info:'　<br>《鸟之诗》- 折户伸治<br>《竹取飛翔　～ Lunatic Princess》- ZUN<br>《ignotus》- ak+q<br>《Super Mario 3D World Theme》- 横田真人',
			miaojian:'妙剑',
			miaojian_info:'出牌阶段限一次。你可将一张【杀】当做刺【杀】使用，或将一张锦囊牌当做【无中生有】使用。',
			miaojian1:'妙剑·改',
			miaojian1_info:'出牌阶段限一次。你可将一张基本牌当做刺【杀】使用，或将一张非基本牌当做【无中生有】使用。',
			miaojian2:'妙剑·极',
			miaojian2_info:'出牌阶段限一次。你可视为使用一张刺【杀】或【无中生有】。',
			shhlianhua:'莲华',
			shhlianhua_info:'当你成为【杀】的目标后，你摸一张牌。',
			shhlianhua1:'莲华·改',
			shhlianhua1_info:'当你成为【杀】的目标后，你摸一张牌。然后你进行判定，若结果为黑桃，则此【杀】对你无效。',
			shhlianhua2:'莲华·极',
			shhlianhua2_info:'当你成为【杀】的目标后，你摸一张牌。然后此【杀】的使用者选择一项：①弃置一张牌。②令此【杀】对你无效。',
			re_yufan:'手杀虞翻',
			rezongxuan:'纵玄',
			rezongxuan_place:'纵玄',
			rezongxuan_info:'当你的牌因弃置而进入弃牌堆后，你可以将其以任意顺序置于牌堆顶。出牌阶段限一次，你可以摸一张牌，然后将一张牌置于牌堆顶。',
			sp_lvfan:'吕范',
			spdiaodu:'调度',
			spdiaodu_info:'准备阶段，你可令一名角色摸一张牌，然后移动其装备区内的一张牌。',
			spdiancai:'典财',
			spdiancai_info:'其他角色的结束阶段开始时，你可以令至多X名角色各摸一张牌（X为你本回合失去的手牌数）。',
			spyanji:'严纪',
			spyanji_info:'出牌阶段开始时，你可以进行“整肃”。',
			yj_huangzhong:'☆黄忠',
			spshidi:'势敌',
			spshidi_info:'转换技，锁定技。①准备阶段/结束阶段开始时，若你发动此分支的累计次数为奇数/偶数，则你获得一个“☯”。②若你的“☯”数为偶数，则你至其他角色的距离-1，且你使用的黑色【杀】不可被响应。③若你的“☯”数为奇数，则其他角色至你的距离+1，且你不可响应红色【杀】。',
			spyishi:'义释',
			spyishi_info:'当你对装备区有牌的其他角色造成伤害时，你可令此伤害-1，然后获得其装备区内的一张牌。',
			spqishe:'骑射',
			spqishe_info:'你可以将一张装备牌当做【酒】使用。你的手牌上限+X（X为你装备区内的牌数）。',
			sp_huangfusong:'手杀皇甫嵩',
			spzhengjun:'整军',
			spzhengjun_info:'①出牌阶段开始时，你可进行“整肃”。②当你因整肃而摸牌或回复体力后，你可令一名其他角色选择摸两张牌或回复1点体力。',
			spshiji:'势击',
			spshiji_info:'当你对其他角色造成属性伤害时，若你的手牌数不为全场唯一最多，则你可以观看其手牌。你令其弃置其中的所有红色牌，然后摸等量的牌。',
			sptaoluan:'讨乱',
			sptaoluan_info:'每回合限一次。一名角色的判定牌生效后，若判定结果的花色为♠，则你可以终止导致此判定发生的上级事件。然后选择一项：①获得判定牌对应的实体牌。②视为对判定角色使用一张火【杀】（无距离和次数限制）',
			sp_zhujun:'手杀朱儁',
			yangjie:'佯解',
			yangjie_info:'出牌阶段限一次，你可以摸一张牌并和一名其他角色A拼点。当你以此法展示你的拼点牌时，你令此牌点数-X（X为你已损失的体力值）。若你没赢，则你可以令另一名其他角色B获得两张拼点牌，然后其视为对A使用一张火【杀】。',
			zjjuxiang:'拒降',
			zjjuxiang_info:'限定技。一名其他角色脱离濒死状态时，你可以对其造成1点伤害，然后摸X张牌（X为其体力上限且至多为5）。',
			houfeng:'厚俸',
			houfeng_info:'每轮限一次。一名其他角色的出牌阶段开始时，若其在你的攻击范围内，则你可以令其进行“整肃”。然后当其于本回合内因整肃而摸牌或回复体力后，你可选择摸两张牌或回复1点体力。',
			sp_maojie:'毛玠',
			bingqing:'秉清',
			bingqing_info:'当你于出牌阶段内使用的牌结算结束后，若你于本阶段内使用的所有其他牌与此牌花色均不相同，则你可根据X的值执行对应效果：为2，你令一名角色摸两张牌；为3，你弃置一名角色区域内的一张牌；为4，你对一名其他角色造成1点伤害。（X为你本阶段内使用过的牌中包含的花色数）',
			yingfeng:'迎奉',
			yingfeng_info:'准备阶段，你可以令一名角色获得“奉”标记并移除场上所有其他的“奉”标记。有“奉”标记的角色使用牌没有距离限制。',
			xin_sunxiu:'手杀孙休',
			mobileyanzhu:'宴诛',
			mobileyanzhu_info:'出牌阶段限一次，你可以令一名有牌的其他角色选择一项：①你获得其装备区里所有的牌，然后你失去技能〖宴诛〗。②你获得其一张牌。',
			mobilexingxue:'兴学',
			mobilexingxue_info:'结束阶段开始时，你可以令至多X名角色依次摸一张牌并将一张牌置于牌堆顶（X为你的体力值，若你未拥有〖宴诛〗，则将X改为你的体力上限，且其可以改为将一张牌交给一名其他目标角色）。',
			re_wuguotai:'手杀吴国太',
			reganlu:'甘露',
			reganlu_info:'出牌阶段限一次，你可以选择装备区牌数之差的绝对值不大于X的两名角色或包含你在内的两名角色，然后交换这两名角色装备区内的牌。（X为你已损失的体力值）',
			taoqian:'手杀陶谦',
			miheng:'手杀祢衡',
			re_gaoshun:'手杀高顺',
			peixiu:'裴秀',
			xingtu:'行图',
			xingtu_info:'锁定技。①当你使用有点数的牌结算结束后，你将此牌点数记录为X。②当你使用牌时，若X÷Y的余数为0，则你摸一张牌（Y为此牌的点数）。③你使用Y÷X的余数为0的牌无次数限制（Y为此牌的点数）。',
			juezhi:'爵制',
			juezhi_info:'出牌阶段，你可以弃置至少两张牌，然后从牌堆中获得一张点数为X的牌（X=min(13, 这些牌的点数和)）。',
			sp_jianggan:'手杀蒋干',
			spdaoshu:'盗书',
			spdaoshu_info:'每轮限一次。一名敌方角色的出牌阶段开始时，若其有手牌，则你可以令其视为使用一张【酒】。其须声明一个基本牌的牌名，然后你判断其手牌区内是否有该牌名的牌。若你判断正确，则你随机获得其五张手牌，否则你不能响应其使用的牌直到回合结束。',
			spdaizui:'戴罪',
			spdaizui_info:'限定技。当你受到伤害值不小于体力值的伤害时，你可防止此伤害并将此伤害渠道对应的所有实体牌置于伤害来源的武将牌上，称为“释”。本回合结束时，其获得所有“释”。',
			re_caiwenji:'手杀蔡琰',
			re_bulianshi:'手杀步练师',
			reanxu:'安恤',
			reanxu_info:'出牌阶段限一次，你可以选择两名其他角色，令其中一名角色获得另一名角色的一张牌。若以此法移动的牌不来自装备区，则你摸一张牌。然后你可以令二者中手牌数较少的一名角色摸一张牌。',
			liuba:'刘巴',
			duanbi:'锻币',
			duanbi_info:'出牌阶段限一次。若场上所有角色的手牌数之和大于角色数之和的二倍，则你可以令所有其他角色各弃置X张手牌（X为该角色手牌数的一半且向下取整且至多为3）。然后你可选择一名角色，令其随机获得三张以此法被弃置的牌。',
			tongduo:'统度',
			tongduo_info:'每回合限一次。当你成为其他角色使用牌的唯一目标后，你可令一名角色重铸一张牌。',
			xin_jushou:'手杀沮授',
			xinjianying:'渐营',
			xinjianying_info:'锁定技。①当你于出牌阶段内使用与此阶段你使用的上一张牌点数或花色相同的牌时，你可以摸一张牌。②出牌阶段限一次，你可以将一张牌当做任意基本牌使用（不计入次数限制）。若你于此阶段内使用的上一张牌有花色，则此牌的花色视为上一张牌的花色。',
			
			mobile_standard:'手杀异构·标准包',
			mobile_shenhua:'手杀异构·神话再临',
			mobile_yijiang1:'手杀异构·将1',
			mobile_yijiang2:'手杀异构·将2',
			mobile_yijiang3:'手杀异构·将3',
			mobile_yijiang4:'手杀异构·将4',
			mobile_yijiang5:'手杀异构·将5',
			mobile_yijiang67:'手杀异构·原创设计',
			mobile_sp:'手杀异构·SP',
			mobile_shijiren:'始计篇·仁',
			mobile_shijizhi:'始计篇·智',
			mobile_shijixin:'始计篇·信',
			mobile_shijiyong:'始计篇·勇',
			mobile_shijiyan:'始计篇·严',
		}
	};
});
