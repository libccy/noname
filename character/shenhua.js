'use strict';
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'shenhua',
		connect:true,
		connectBanned:['zuoci'],
		characterSort:{
			shenhua:{
				shenhua_feng:['caoren','re_xiahouyuan','re_huangzhong','re_weiyan','re_xiaoqiao','zhoutai','sp_zhangjiao','re_yuji'],
				shenhua_huo:['dianwei','xunyu','pangtong','sp_zhugeliang','taishici','yanwen','re_yuanshao','re_pangde'],
				shenhua_lin:['caopi','re_xuhuang','menghuo','zhurong','re_lusu','sunjian','dongzhuo','jiaxu'],
				shenhua_shan:['dengai','zhanghe','liushan','jiangwei','zhangzhang','sunce','caiwenji','zuoci'],
				shenhua_yin:['wangji','kuailiangkuaiyue','yanyan','wangping','sunliang','luji','xuyou','yl_luzhi'],
				shenhua_lei:['haozhao','guanqiujian','chendao','zhugezhan','lukang','zhoufei','zhangxiu','yl_yuanshu'],
			},
		},
		character:{
			re_xiahouyuan:['male','wei',4,['xinshensu']],
			caoren:['male','wei',4,['xinjushou','xinjiewei']],
			re_huangzhong:['male','shu',4,['xinliegong']],
			re_weiyan:['male','shu',4,['xinkuanggu','qimou']],
			re_xiaoqiao:['female','wu',3,['retianxiang','hongyan']],
			zhoutai:['male','wu',4,['buqu','fenji']],
			sp_zhangjiao:['male','qun',3,['releiji','guidao','huangtian'],['zhu']],
			re_yuji:["male","qun",3,["xinfu_guhuo"],["forbidai"]],
			// yuji:['male','qun',3,['guhuo']],
			// xin_yuji:['male','qun',3,['guhuo']],

			sp_zhugeliang:['male','shu',3,['huoji','bazhen','kanpo']],
			pangtong:['male','shu',3,['lianhuan','oldniepan']],
			xunyu:['male','wei',3,['quhu','jieming']],
			dianwei:['male','wei',4,['qiangxix']],
			taishici:['male','wu',4,['tianyi']],
			yanwen:['male','qun',4,['shuangxiong']],
			re_yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
			re_pangde:['male','qun',4,['mashu','jianchu']],

			menghuo:['male','shu',4,['huoshou','zaiqixx']],
			zhurong:['female','shu',4,['juxiang','lieren']],
			caopi:['male','wei',3,['xingshang','fangzhu','songwei'],['zhu']],
			re_xuhuang:['male','wei',4,['duanliang','jiezi']],
			re_lusu:['male','wu',3,['haoshi','dimeng']],
			sunjian:['male','wu',4,['gzyinghun']],
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
			
			wangji:['male','wei',3,['qizhi','jinqu']],
			"yanyan":["male","shu",4,["nzry_juzhan"],[]],
			"wangping":["male","shu",4,["nzry_feijun","nzry_binglve"],[]],
			"luji":["male","wu",3,["nzry_huaiju","nzry_yili","nzry_zhenglun"],[]],
			"sunliang":["male","wu",3,["nzry_kuizhu","nzry_zhizheng","nzry_lijun"],['zhu']],
			"xuyou":["male","qun",3,["nzry_chenglve","nzry_shicai","nzry_cunmu"],[]],
			"yl_luzhi":["male","qun",3,["nzry_mingren","nzry_zhenliang"],["die_audio"]],
			"kuailiangkuaiyue":["male","wei",3,["nzry_jianxiang","nzry_shenshi"],[]],
			
			"guanqiujian":["male","wei",4,["drlt_zhenrong","drlt_hongju"],[]],
			"haozhao":["male","wei",4,["drlt_zhenggu"],[]],
			"zhugezhan":["male","shu",3,["xinfu_zuilun","xinfu_fuyin"],[]],
			"lukang":["male","wu",4,["drlt_qianjie","drlt_jueyan","drlt_poshi"],[]],
			"yl_yuanshu":["male","qun",4,["drlt_yongsi","drlt_weidi"],["zhu"]],
			"zhangxiu":["male","qun",4,["drlt_xiongluan","drlt_congjian"],[]],
			"chendao":["male","shu",4,["drlt_wanglie"],[]],
			zhoufei:["female","wu",3,["liangyin","kongsheng"],[]],
		},
		perfectPair:{
			jiaxu:['liqueguosi'],
			re_yuanshao:['yanwen'],
			menghuo:['zhurong'],
			sp_zhugeliang:['pangtong'],
			sunce:['zhouyu','taishici','daqiao'],
			zuoci:['yuji'],
			xunyu:['xunyou'],
			lukang:['luxun'],
			yuanshu:['jiling'],
			zhangxiu:['jiaxu'],
			wangping:['jiangfei'],
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
			
			"yanyan":"严颜，东汉末年武将，初为刘璋部下，担任巴郡太守。建安十九年，刘备进攻江州，严颜战败被俘，张飞对严颜说：“大军至，何以不降而敢拒战？”，严颜回答说：“卿等无状，侵夺我州，我州但有断头将军，无降将军也！”，张飞生气，命左右将严颜牵去砍头，严颜表情不变地说：“砍头便砍头，何为怒邪！”张飞敬佩严颜的勇气，遂释放严颜并以严颜为宾客，之后的事迹不在正史中出现。",
			"wangping":"王平，字子均，巴西宕渠（今四川省渠县东北）人，籍贯益州。三国时蜀汉后期大将。原属曹操，曹操与刘备争汉中，得以投降刘备。诸葛亮第一次北伐时与马谡一同守街亭，之后深受诸葛亮的器重，率领蜀汉的王牌军队无当飞军，多次随诸葛亮北伐。诸葛亮死后，拜前监军、镇北大将军，镇守汉中，曹爽率领十万大军攻汉中时，被王平所击退，累封安汉侯。延熙十一年，王平去世，其子王训继承了爵位。",
			"luji":"陆绩（公元188年－公元219年），字公纪，吴郡吴县（今苏州）人，汉末庐江太守陆康之子。陆绩成年后，博学多识，通晓天文、历算，星历算数无不涉览。孙权征其为奏曹掾，常以直道见惮。后出为郁林太守，加偏将军。在军中不废著作，曾作《浑天图》，注《易经》，撰写《太玄经注》。",
			"sunliang":"孙亮（243－260年），字子明，吴郡富春（今浙江杭州富阳区）人。三国时期吴国的第二位皇帝，公元252－258年在位。吴大帝孙权第七子，母潘皇后。史称吴少帝、吴废帝、会稽王。建兴元年（252年），十岁登基为帝，太平二年（257年），十五岁亲政，但一年后（258年）就被权臣孙綝废为会稽王。永安三年（260年），孙亮再被贬为候官侯，在前往封地途中自杀（一说被毒杀），终年18岁。西晋太康年间，原先任职吴国的官员戴显将孙亮的遗骨葬在赖乡。",
			"xuyou":"许攸（？－204年），字子远，南阳（治今河南南阳）人。本为袁绍帐下谋士，官渡之战时其家人因犯法而被收捕，许攸因此背袁投曹，并为曹操设下偷袭袁绍军屯粮之所乌巢的计策，袁绍因此而大败于官渡。后许攸随曹操平定冀州，因自恃其功而屡屡口出狂言，终因触怒曹操而被杀。",
			"yl_luzhi":"卢植（139年—192年），字子干。涿郡涿县（今河北涿州）人。东汉末年经学家、将领。卢植性格刚毅，师从太尉陈球、大儒马融等，为郑玄、管宁、华歆的同门师兄。曾先后担任九江、庐江太守，平定蛮族叛乱。后与马日磾、蔡邕等一起在东观校勘儒学经典书籍，并参与续写《汉记》。黄巾起义时为北中郎将，率军与张角交战，后被诬陷下狱，皇甫嵩平定黄巾后力救卢植，于是复任为尚书。后因上谏激怒董卓被免官，隐居在上谷军都山，被袁绍请为军师。初平三年（192年）去世。著有《尚书章句》、《三礼解诂》等，今皆失佚。唐代时配享孔子，北宋时被追封为良乡伯。白马将军公孙瓒以及后来的蜀汉昭烈帝刘备皆为卢植门下弟子。范阳卢氏后来也成为著名的家族。",
			"kuailiangkuaiyue":"蒯（kuǎi）良，字子柔，襄阳中庐人。归刘表。蒯良为刘表定下安抚荆楚的政治方向，佐其成业，被刘表誉为“雍季之论”。之后，蒯良就被刘表擢升为主簿（bù）。其后蒯良的生平，就不得而知了，《三国志》亦没有记载其卒年。与蒯越、以及同样活跃于襄阳的蒯祺（诸葛亮姐夫）或为同族兄弟。蒯越（？－214年），字异度，襄阳中庐（今湖北襄阳西南）人。东汉末期人物，演义中为蒯良之弟。原本是荆州牧刘表的部下，曾经在刘表初上任时帮助刘表铲除荆州一带的宗贼（以宗族、乡里关系组成的武装集团）。刘表病逝后与刘琮一同投降曹操，后来官至光禄勋。",
			
			"guanqiujian":"毌丘俭，字仲恭，河东闻喜（今山西闻喜县）人。三国时期曹魏后期的重要将领。继承父毌丘兴爵位高阳乡侯，任平原侯文学。魏明帝即位后，上疏劝魏明帝停止加建皇宫的工程，升为荆州刺史。景初二年（238年）从司马懿攻灭公孙渊；正始五年（244年）至正始六年（245年）两次率兵征讨高句丽，攻破丸都，几亡其国，刻石纪功而还；253年击退吴国诸葛恪的大举进犯，战功累累。司马师废帝，毌丘俭感昔日魏明帝之恩，为曹魏政权做拼死一搏，于正元二年（255年）发动兵变，即后人所谓“淮南三叛”（王淩、毌丘俭、诸葛诞）之一，惜准备不足，兵败身亡。",
			"haozhao":"郝昭（生卒年不详），字伯道，太原人，中国东汉末年至曹魏初年著名将领。郝昭少年从军，屡立战功，逐渐晋升为杂号将军，后受曹真的推荐镇守陈仓（在小说三国演义中是司马懿推荐），防御蜀汉。太和二年（228年），诸葛亮率军北伐，为郝昭所阻，劝降不成，昼夜相攻二十余日后被迫退军。魏明帝因此封其为关内侯。不久因染疾而病死。",
			"zhugezhan":"诸葛瞻，字思远，琅邪阳都（今山东沂南县）人。三国时期蜀汉大臣，蜀汉丞相诸葛亮之子。邓艾伐蜀时，他与长子诸葛尚及蜀将张遵、李球、黄崇等人防御绵竹（今四川德阳），因不听黄崇速占险要的建议而坐失良机，后来出城与邓艾决战，在交战时阵亡，绵竹也随后失守。",
			"zhoufei":"周妃（210年？—？），一说本名周彻。周瑜独女，生母无载，疑为汉末美女小乔，因嫁孙登为太子妃，故称周妃。周瑜英年早逝，其遗孤都得到孙权厚遇，除却她本人在黄武四年（225年）嫁予太子外，兄长周循亦娶孙权长女孙鲁班为妻。",
			"lukang":"陆抗，字幼节，吴郡吴县（今江苏苏州）人。三国时期吴国名将，丞相陆逊次子。陆抗袭父爵为江陵侯，为建武校尉，领其父众五千人。后迁立节中郎将、镇军将军等。孙皓为帝，任镇军大将军、都督西陵、信陵、夷道、乐乡、公安诸军事，驻乐乡（今湖北江陵西南）。凤凰元年（272年），击退晋将羊祜进攻，并攻杀叛将西陵督步阐。后拜大司马、荆州牧，卒于官，终年49岁。与陆逊皆是吴国的中流砥柱，并称“逊抗 ”，被誉为吴国最后的名将。",
			"zhangxiu":"张绣，武威祖厉（今甘肃靖远）人。骠骑将军张济的从子。东汉末年割据宛城的军阀，汉末群雄之一。初随张济征伐，张济死后与刘表联合。后降曹操，因曹操调戏其嫂而突袭曹操，复与刘表连和。官渡之战前夕，听从贾诩的建议再次投降曹操，参加官渡之战，官至破羌将军，封宣威侯。在北征乌桓（207年）途中去世（一说为曹丕逼死），谥定侯。",
			"chendao":"陈到，字叔至，生卒年不详，豫州汝南（今河南驻马店平舆县）人。三国时期蜀汉将领，刘备帐下白毦兵统领，名位常亚于赵云，以忠勇著称。蜀汉建兴年间，任征西将军、永安都督，封亭侯。在任期间去世。",
		},
		skill:{
			//阴雷
			"drlt_zhenrong":{
				init:function (player){
					player.storage.drlt_zhenrong=[];
				},
				marktext:"荣",
				intro:{
					content:'cards',
				},
				mark:true,
				audio:2,
				trigger:{
					source:'damageSource',
				},
				filter:function(event,player){
					return event.player!=player&&event.player.countCards('h')>player.countCards('h');
				},
				direct:true,
				content:function (){
					'step 0'
					player.choosePlayerCard('hej',get.prompt('drlt_zhenrong'),trigger.player).set('ai',function(button){
						return -get.attitude(player,trigger.player)+1;
					});
					'step 1'
					if(result&&result.links&&result.links.length){
						player.line(player,trigger.player);
						player.logSkill('drlt_zhenrong');
						player.storage.drlt_zhenrong.push(result.links[0]);
						player.syncStorage('drlt_zhenrong');
						trigger.player.lose(result.links[0],ui.special,'toStorage');
						trigger.player.$give(result.links,player);
						game.log(player,'将',result.links[0],'置于其武将牌上');
					};
				},
			},
			"drlt_hongju":{
				skillAnimation:true,
				animationColor:'thunder',
				audio:2,
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				forced:true,
				unique:true,
				juexingji:true,
				derivation:['drlt_qingce'],
				init:function(player){
					player.storage.drlt_hongju=false;
				},
				filter:function(event,player){
					return !player.storage.drlt_hongju&&player.storage.drlt_zhenrong&&player.storage.drlt_zhenrong.length>=3&&game.dead.length>0;
				},
				content:function(){
					'step 0'
					player.awakenSkill('drlt_hongju'),
					player.storage.drlt_hongju=true;
					var num=player.storage.drlt_zhenrong.length;
					if(num>player.countCards('h')) num=player.countCards('h');
					player.chooseCard('h',[1,num],'请选择需要替换“荣”的手牌').set('ai',function(card){
						return 5-get.value(card);
					}).set('promptx',[player.storage.drlt_zhengrong]);
					'step 1'
					if(result.bool){
						event.cards=result.cards;
						player.chooseCardButton(player.storage.drlt_zhenrong,result.cards.length,'请选择需要替换的“荣”',true).ai=function(button){
							return 6-get.value(button.link);
						};
					}else{
						player.addSkill('drlt_qingce');
						player.loseMaxHp();
						event.finish();
					};
					'step 2'
					if(result.bool){
						var cards=result.links;
						for(var i=0;i<event.cards.length;i++){
							player.storage.drlt_zhenrong.push(event.cards[i]);
						};
						player.syncStorage('drlt_zhenrong');
						player.lose(event.cards,ui.special,'toStorage');
						game.log(player,'将',event.cards,'置于其武将牌上');
						for(var i=0;i<cards.length;i++){
							player.storage.drlt_zhenrong.remove(cards[i]);
						};
						player.syncStorage('drlt_zhenrong');
						player.gain(cards,'gain2','fromStorage');
					};
					player.addSkill('drlt_qingce');
					player.loseMaxHp();
				},
			},
			'drlt_qingce':{
				audio:2,
				enable:'phaseUse',
				filter:function(event,player){
					return player.storage.drlt_zhenrong&&player.storage.drlt_zhenrong.length>0;
				},
				filterTarget:function(card,player,target){
					return target.countCards('hej')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardButton(player.storage.drlt_zhenrong,1,'请选择需要弃置的“荣”',true).ai=function(button){
						return 6-get.value(button.link);
					};
					'step 1'
					if(result.bool){
						var cards=result.links;
						for(var i=0;i<cards.length;i++){
							player.storage.drlt_zhenrong.remove(cards[i]);
						};
						player.syncStorage('drlt_zhenrong');
						player.$throw(cards);
						player.discardPlayerCard(target,'hej',1);
					};
				},
				ai:{
					order:13,
					result:{
						target:function(player,target){
							if(get.attitude(player,target)>0&&target.countCards('j')>0) return 1;
							return -1;
						},
					},
				},
			},
			"drlt_zhenggu":{
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				group:["drlt_zhenggu2"],
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('drlt_zhenggu'),function(card,player,target){
						return target!=player;
					}).ai=function(target){
						var player=_status.event.player;
						var num=(Math.min(5,player.countCards('h'))-target.countCards('h'));
						var att=get.attitude(player,target);
						return num*att;
					};
					"step 1"
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'thunder');
						player.logSkill('drlt_zhenggu',target);
						target.addSkill('drlt_zhenggu2');
						player.storage.drlt_zhenggu1=target;
						target.storage.drlt_zhenggu=player;
					}else{
						event.finish();
					};
				},
			},
			"drlt_zhenggu2":{
				audio:2,
				trigger:{
					player:"phaseEnd",
				},
				forced:true,
				popup:false,
				filter:function(event,player){
					return player.storage.drlt_zhenggu!=undefined||player.storage.drlt_zhenggu1!=undefined;
				},
				content:function(){
					if(player.storage.drlt_zhenggu!=undefined){
						player.removeSkill("drlt_zhenggu2");
						var pl=player.storage.drlt_zhenggu;
						if(pl.isAlive()){
						var num=Math.min(5,pl.countCards('h'));
						var num1=0;
						if(num-player.countCards('h')>0) num1=num-player.countCards('h');
						if(num-player.countCards('h')<0) num1=num-player.countCards('h');
						if(num1!=0){
							pl.line(player,'thunder');
							pl.logSkill('drlt_zhenggu',player);
						}
						if(num1<0) player.chooseToDiscard('h',-num1,true);
						if(num1>0) player.draw(num1);
						}
						delete player.storage.drlt_zhenggu;
					};
					if(player.storage.drlt_zhenggu1!=undefined){
						var pl=player.storage.drlt_zhenggu1;
						if(pl.isAlive()){
						var num=pl.countCards('h');
						var num1=0;
						var num2=Math.min(5,player.countCards('h'));
						if(num2-num>0) num1=num2-num;
						if(num2-num<0) num1=num2-num;
						if(num1<0) pl.chooseToDiscard('h',-num1,true);
						if(num1>0) pl.draw(num1);
						}
						delete player.storage.drlt_zhenggu1;
					};
				},
			},
			"xinfu_zuilun":{
				group:["xinfu_zuilun_count"],
				subSkill:{
					count:{
						sub:true,
						silent:true,
						popup:false,
						trigger:{
							player:"discardAfter",
						},
						filter:function (event,player){
							return _status.currentPhase==player;
						},
						content:function (){
							player.addTempSkill('xinfu_zuilun_discarded');
						},
						forced:true,
					},
					discarded:{
						sub:true,
					},
				},
				audio:2,
				trigger:{
					player:"phaseJieshuBegin",
				},
				check:function (event,player){
					var num=0;
					if(player.hasSkill('xinfu_zuilun_discarded')) num++;
					if(!player.isMinHandcard()) num++;
					if(!player.getStat('damage')) num++;
					if(num==3) return player.hp>=2;
				},
				content:function (){
					'step 0'
					event.num=0;
					event.cards=get.cards(3);
					if(player.hasSkill('xinfu_zuilun_discarded')) event.num++;
					if(!player.isMinHandcard()) event.num++;
					if(!player.getStat('damage')) event.num++;
					'step 1'
					if(event.num==0){
						player.gain(event.cards,'draw');
						event.finish();
					}else{
						var prompt;
						if(event.num==3) prompt="罪论：请按顺将卡牌置于牌堆顶（先选择的在上）";
						else prompt="罪论：请按顺将"+get.cnNumber(event.num)+"张卡牌置于牌堆顶（先选择的在上），然后获得其余的牌。";
						player.chooseCardButton(event.num,true,event.cards,prompt).set('ai',function(button){
							return 100-get.value(button.link);
						});
					}
					'step 2'
					if(result.bool){
						var list=result.links.slice(0);
						var num=list.length-1;
						for(var i=0;i<list.length;i++){
							event.cards.remove(list[num-i]);
							ui.cardPile.insertBefore(list[num-i],ui.cardPile.firstChild);
						}
					}
					'step 3'
					game.updateRoundNumber();
					if(event.cards.length){
						player.gain(event.cards,'draw');
						event.finish();
					}
					else{
						player.chooseTarget('请选择一名角色，与其一同失去1点体力',true,function(card,player,target){
							return target!=player;
						}).ai=function(target){
							return -get.attitude(_status.event.player,target);
						};
					}
					'step 4'
					player.line(result.targets[0],'fire');
					player.loseHp();
					result.targets[0].loseHp();
				},
			},
			"xinfu_fuyin":{
				usable:1,
				trigger:{
					target:"useCardToTargeted",
				},
				forced:true,
				audio:2,
				filter:function (event,player){
					if(event.player.countCards('h')<player.countCards('h')) return false;
					if(event.card.name=='sha'||event.card.name=='juedou') return true;
					return false;
				},
				content:function (){
					trigger.getParent().excluded.add(player);
				},
			},
			
			
			"drlt_qianjie":{
				group:["drlt_qianjie_1","drlt_qianjie_2","drlt_qianjie_3"],
				locked:true,
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							player:'linkBegin'
						},
						forced:true,
						content:function(){
							trigger.cancel();
						},
					},
					'2':{
						mod:{
							targetEnabled:function(card,player,target){
								if(get.type(card)=='delay') return false;
							},
						},
					},
					'3':{
					ai:{noCompareTarget:true,},
					},
				},
			},
			'drlt_jueyan':{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.storage.disableEquip!=undefined&&player.storage.disableEquip.length<5;
				},
				content:function(){
					'step 0'
					player.chooseToDisable(true).set('ai',function(event,player,list){
						if(list.contains('equip2')) return 'equip2';
						if(list.contains('equip1')&&player.countCards('h',{name:'sha'})>2) return 'equip1';
						if(list.contains('equip5')&&player.countCards('h',{type:'trick'})>=1) return 'equip5';
					});
					'step 1'
					if(result.control=='equip1'){
						player.addTempSkill('drlt_jueyan1',{player:'phaseAfter'});
					};
					if(result.control=='equip2'){
						player.draw(3);
						player.addTempSkill('drlt_jueyan3',{player:'phaseAfter'});
					};
					if(result.control=='equip6'){
						player.addTempSkill('drlt_jueyan2',{player:'phaseAfter'});
					};
					if(result.control=='equip5'){
						player.addTempSkill('rejizhi',{player:'phaseAfter'});
					};
				},
				ai:{
					order:13,
					result:{
						player:function(player){
							if(!player.isDisabled('equip2')) return 1;
							if(!player.isDisabled('equip1')&&player.countCards('h',{name:'sha'})>2) return 1;
							if(!player.isDisabled('equip5')&&player.countCards('h',{type:'trick'})>=1) return 1;
							return -1;
						},
					},
				},
			},
			'drlt_jueyan1':{
				mod:{
					cardUsable:function (card,player,num){
						if(card.name=='sha') return num+3;
					},
				},
				mark:true,
				marktext:'决',
				intro:{name:'决堰 - 武器',content:'本回合内可以多使用三张【杀】'},
			},
			'drlt_jueyan2':{
				mod:{
					targetInRange:function (card,player,target,now){
						return true;
					},
				},
				mark:true,
				marktext:'决',
				intro:{name:'决堰 - 坐骑',content:'本回合内使用牌没有距离限制'},
			},
			'drlt_jueyan3':{
				mod:{
					maxHandcard:function (player,num){
						return num+3;
					},
				},
				mark:true,
				marktext:'决',
				intro:{name:'决堰 - 防具',content:'本回合内手牌上限+3'},
			},
			"drlt_poshi":{
				audio:2,
				skillAnimation:true,
				animationColor:'wood',
				trigger:{
					player:'phaseZhunbeiBegin',
				},
				forced:true,
				unique:true,
				juexingji:true,
				derivation:['drlt_huairou'],
				init:function(player){
					player.storage.drlt_poshi=false;
				},
				filter:function(event,player){
					return !player.storage.drlt_poshi&&((player.storage.disableEquip!=undefined&&player.storage.disableEquip.length==5)||player.hp==1);
				},
				content:function(){
					"step 0"
					player.storage.drlt_poshi=true;
					player.loseMaxHp();
					"step 1"
					var num=player.maxHp-player.countCards('h');
					if(num>0) player.draw(num);
					player.removeSkill('drlt_jueyan');
					player.addSkill('drlt_huairou');
				},
			},
			"drlt_huairou":{
				audio:2,
				enable:"phaseUse",
				position:'he',
				filter:function (event,player){
					return player.countCards('he',{type:'equip'})>0;
				},
				filterCard:function (card){
					return get.type(card)=='equip';
				},
				check:function (card){
					return 1;
				},
				content:function (){
					player.draw();
				},
				discard:false,
				visible:true,
				loseTo:'discardPile',
				prompt:"将一张装备牌置入弃牌堆并摸一张牌",
				delay:0.5,
				prepare:function (cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
				},
			},
			"drlt_yongsi":{
				group:["drlt_yongsi_1","drlt_yongsi_2"],
				subSkill:{
					'1':{
						audio:["yongsi1",2],
						trigger:{
							player:'phaseDrawBegin'
						},
						forced:true,
						content:function(){
							trigger.num=game.countGroup();
						},
					},
					'2':{
						audio:["yongsi2",2],
						trigger:{
							player:'phaseUseEnd'
						},
						forced:true,
						filter:function(event,player){
							var num=player.getStat('damage');
							return !num||num>1;
						},
						content:function(){
							var numx=player.getStat('damage');
							if(!numx){
								var num=player.hp-player.countCards('h');
								if(num>0) player.draw(num);
							}
							else{
								player.addTempSkill('drlt_yongsi1',{player:'phaseDiscardAfter'});
							};
						},
					},
				},
			},
			'drlt_yongsi1':{
				mod:{
					maxHandcard:function (player,num){
						return num+player.maxHp-2*Math.max(0,player.hp);
					},
				},
			},
			"drlt_weidi":{
				audio:2,
				forceaudio:true,
				unique:true,
				zhuSkill:true,
				trigger:{
					player:"phaseDiscardBegin",
				},
				direct:true,
				filter:function (event,player){
					if(!player.hasZhuSkill('drlt_weidi')) return false;
					return player.needsToDiscard()>0&&game.countPlayer(function(current){return current!=player&&current.group=='qun'})>0;
				},
				content:function(){
					'step 0'
					event.count=player.needsToDiscard();
					event.logged=false;
					event.gived=[];
					'step 1'
					if(!game.hasPlayer(function(target){
						return target!=player&&target.group=='qun'&&!event.gived.contains(target);
					})) event.finish();
					else player.chooseCardTarget({
						prompt:'是否将一张手牌给予其他群雄角色？',
						filterTarget:function(card,player,target){
							return target!=player&&target.group=='qun'&&!_status.event.gived.contains(target);
						},
						filterCard:true,
						position:'h',
						ai1:function(card){
							var value=get.value(card);
							var player=_status.event.player;
							if(game.hasPlayer(function(current){
								return get.sgn(value)==get.sgn(get.attitude(player,current))
							})) return 1;
							return -1;
						},
						ai2:function(target){
							var player=_status.event.player;
							if(get.value(ui.selected.cards[0])<0) return -get.attitude(player,target);
							return get.attitude(player,target);
						},
						gived:event.gived,
					});
					'step 2'
					if(result.bool){
						if(!event.logged){
							player.logSkill('drlt_weidi');
							event.logged=true;
						}
						player.line(result.targets[0]);
						result.targets[0].gain(result.cards[0],player,'giveAuto');
						event.gived.add(result.targets[0]);
						event.count--;
						if(event.count) event.goto(1);
					}
				},
			},
			"drlt_xiongluan":{
				audio:2,
				unique:true,
				enable:'phaseUse',
				mark:true,
				skillAnimation:true,
				animationColor:'gray',
				limited:true,
				init:function(player){
					player.storage.drlt_xiongluan=false;
				},
				filter:function(event,player){
					if(player.storage.drlt_xiongluan) return false;
					return true;
				},
				filterTarget:function(card,player,target){
					return target!=player;
				},
				content:function(){
					player.awakenSkill('drlt_xiongluan');
					player.storage.drlt_xiongluan=true;
					player.disableEquip('equip1');
					player.disableEquip('equip2');
					player.disableEquip('equip3');
					player.disableEquip('equip4');
					player.disableEquip('equip5');
					player.disableJudge();
					player.addTempSkill('drlt_xiongluan1');
					player.storage.drlt_xiongluan1=target;
					target.addSkill('drlt_xiongluan2');
					target.markSkillCharacter('drlt_xiongluan1',player,'雄乱','无法使用或打出任何手牌');
				},
				ai:{
					order:13,
					result:{
						target:function(player,target){
							var hs=player.countCards('h',{name:['sha','juedou']});
							var ts=target.hp;
							if(hs>=ts&&ts>1) return -1;
							return 0;
						},
					},
				},
				intro:{
					content:'limited'
				},
			},
			'drlt_xiongluan1':{
				onremove:function(player){
					player.storage.drlt_xiongluan1.removeSkill('drlt_xiongluan2');
					player.storage.drlt_xiongluan1.unmarkSkill('drlt_xiongluan1');
					delete player.storage.drlt_xiongluan1;
				},
				mod:{
					targetInRange:function (card,player,target){
						if(target.hasSkill('drlt_xiongluan2')){
							return true;
						}
					},
					cardUsable:function (card,player,num){
						if(typeof num=='number'&&game.hasPlayer(function(current){
							return current.hasSkill('drlt_xiongluan2');
						})) return num+100;
					},
					playerEnabled:function (card,player,target){
						if(game.hasPlayer(function(current){
							return current.hasSkill('drlt_xiongluan2');
						})&&!target.hasSkill('drlt_xiongluan2')){
							var num=player.getCardUsable(card)-100;
							if(num<=0) return false;
						}
					},
				},
			},
			'drlt_xiongluan2':{
				mod:{
					cardEnabled2:function(card,player){
						if(get.position(card)=='h') return false;
					},
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')) return [0,-999999];
						},
					},
				},
			},
			
			
			"drlt_congjian":{
				audio:2,
				trigger:{
					target:"useCardToTargeted",
				},
				direct:true,
				filter:function (event,player){
					return get.type(event.card)=='trick'&&event.targets.length>1&&player.countCards('he')>0;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						filterCard:true,
						selectCard:1,
						position:'he',
						filterTarget:function(card,player,target){
							return player!=target&&trigger.targets.contains(target);
						},
						ai1:function(card){
							if(card.name=='du') return 20;
							if(_status.event.player.storage.drlt_xiongluan&&get.type(card)=="equip") return 15;
							return 6-get.value(card);
						},
						ai2:function(target){
							var att=get.attitude(_status.event.player,target);
							if(ui.selected.cards.length&&ui.selected.cards[0].name=='du'){
								if(target.hasSkillTag('nodu')) return 0.1;
								return 1-att;
							}
							return att-3;
						},
						prompt:get.prompt2('drlt_congjian'),
					});
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						player.line(event.target);
						player.logSkill('drlt_congjian');
						event.target.gain(result.cards[0],player,'give');
						var num=1;
						if(get.type(result.cards[0])=='equip') num=2;
						player.draw(num);
					};
				},
			},
			"drlt_wanglie":{
				mod:{
					targetInRange:function (card,player,target,now){
						if(!player.countUsed()) return true;
					},
				},
				audio:2,
				trigger:{
					player:"useCard",
				},
				filter:function (event,player){
					return _status.currentPhase==player;
				},
				check:function(trigger,player){
					if(player.countCards('h')<=player.hp+1&&((get.type(trigger.card)=='trick'&&game.countPlayer(function(current){return get.attitude(current,player)<=0&&current.countCards('h',{name:'wuxie'})})>0)||trigger.card.name=='sha')) return true;
					return false;
				},
				content:function(){
					trigger.nowuxie=true;
					trigger.directHit.addArray(game.players);
					player.addTempSkill('drlt_wanglie2');
				},
			},
			"drlt_wanglie2":{
				mod:{
					cardEnabled:function(card,player){
						return false;
					},
				},
			},
	
			liangyin:{
				audio:2,
				group:["liangyin_1","liangyin_2"],
				subSkill:{
					"1":{
						trigger:{
							global:["loseAfter","addCardToStorage"],
						},
						filter:function (event,player){
							if(event.name=='lose') return event.toStorage==true;
							return true;
						},
						direct:true,
						content:function (){
							"step 0"
							player.chooseTarget('是否发动【良姻】令手牌数大于你的一名角色摸一张牌？',function(card,player,target){
								return target!=player&&target.countCards('h')>player.countCards('h');
							}).ai=function(target){
								return get.attitude(player,target);
							};
							"step 1"
							if(result.bool){
								player.line(result.targets);
								player.logSkill('liangyin');
								result.targets[0].draw();
							}else{
								event.finish();
							};
						},
						sub:true,
					},
					"2":{
						trigger:{
							global:"gainAfter",
						},
						filter:function (event,player){
							return event.fromStorage==true;
						},
						direct:true,
						content:function (){
							"step 0"
							player.chooseTarget('是否发动【良姻】令手牌数小于你的一名角色弃置一张牌？',function(card,player,target){
								return target!=player&&target.countCards('h')<player.countCards('h')&&target.countCards('he')>0;
							}).ai=function(target){
								return -get.attitude(player,target);
							};
							"step 1"
							if(result.bool){
								player.line(result.targets);
								player.logSkill('liangyin');
								result.targets[0].chooseToDiscard('he',1,true);
							}else{
								event.finish();
							};
						},
						sub:true,
					},
				},
			},
			kongsheng:{
				audio:2,
				trigger:{
					player:"phaseZhunbeiBegin",
				},
				direct:true,
				filter:function (event,player){
					return player.countCards('he')>0;
				},
				content:function (){
					'step 0'
					player.chooseCard(get.prompt2('kongsheng'),'he',[1,player.countCards('he')]).set('ai',function(card){
						if(card.name=='shan'||card.name=='du') return 1;
						return 5-get.value(card);
					});
					'step 1'
					if(result.bool){
						player.logSkill('kongsheng');
						if(player.storage.kongsheng2==undefined) player.storage.kongsheng2=[];
						player.storage.kongsheng2.addArray(result.cards);
						player.lose(result.cards,ui.special,'toStorage');
						game.log(player,'将',result.cards,'置于其武将牌上');
						player.addSkill('kongsheng2');
					}else{
						event.finish();
					}
				},
			},
			"kongsheng2":{
				marktext:"箜",
				intro:{
					content:"cards",
				},
				mark:true,
				trigger:{
					player:"phaseJieshuBegin",
				},
				filter:function (event,player){
					return player.storage.kongsheng2!=undefined&&player.storage.kongsheng2.length>0;
				},
				forced:true,
				popup:false,
				content:function (){
					'step 0'
					player.logSkill('kongsheng');
					event.list=[];
					for(var i=0;i<player.storage.kongsheng2.length;i++){
						if(get.type(player.storage.kongsheng2[i])=='equip'&&game.hasPlayer(function(current){
							return player.canUse(player.storage.kongsheng2[i],current);
						})){
							player.chooseUseTarget(player.storage.kongsheng2[i],true,'nopopup','noanimate');
							event.list.push(player.storage.kongsheng2[i]);
						};
					};
					'step 1'
					for(var i=0;i<event.list.length;i++){
						player.storage.kongsheng2.remove(event.list[i]);
					};
					'step 2'
					player.gain(player.storage.kongsheng2,'gain2','fromStorage');
					'step 3'
					delete player.storage.kongsheng2;
					player.removeSkill('kongsheng2');
				},
			},
	
			"nzry_juzhan":{
				audio:"nzry_juzhan_1",
				mark:true,
				locked:false,
				zhuanhuanji:true,
				marktext:'拒',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_juzhan1==true) return '当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用牌';
						return '当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌';
					},
				},
				mod:{
					targetEnabled:function(card,player,target){
						if(player.storage.nzry_juzhan==true) return false;
					},
				},
				group:["nzry_juzhan_1","nzry_juzhan_2"],
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							target:'useCardToTargeted'
						},
						prompt2:'当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌。',
						filter:function (event,player){
							return event.card.name=='sha'&&(player.storage.nzry_juzhan1==false||player.storage.nzry_juzhan1==undefined);
						},
						logTarget:'player',
						content:function(){
							game.asyncDraw([player,trigger.player]);
							trigger.player.addTempSkill('nzry_juzhany');
							player.storage.nzry_juzhan1=true;
							player.addTempSkill('nzry_juzhanx');
						},
					},
					'2':{
						audio:2,
						trigger:{
							player:'useCardToPlayered'
						},
						prompt2:'当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用牌',
						filter:function (event,player){
							return event.card.name=='sha'&&event.player.countGainableCards(player,'he')>0&&player.storage.nzry_juzhan1==true;
						},
						check:function (event,player){
							return event.player.countCards('he')>0&&event.targets&&event.targets.length==1;
						},
						logTarget:'target',
						content:function(){
							player.gainPlayerCard(trigger.targets[0],'he',true);
							player.storage.nzry_juzhan1=false;
							trigger.target.addTempSkill('nzry_juzhanx');
							player.addTempSkill('nzry_juzhany');
						},
					},
				},
			},
			"nzry_juzhanx":{
				mod:{
					targetEnabled:function(card,player,target){
						if(player.hasSkill('nzry_juzhany')) return false;
					},
				},
			},
			nzry_juzhany:{},
			"nzry_feijun":{
				init:function (player){
					player.storage.nzry_feijun=[];
				},
				marktext:"飞",
				intro:{
					content:function (storage){
						if(!storage.length) return '尚未发动';
						var str=get.translation(storage);
						return '已对'+str+'发动过〖飞军〗';
					},
				},
				mark:true,
				enable:"phaseUse",
				usable:1,
				position:"he",
				audio:2,
				filter:function (event,player){
					return game.countPlayer(function(current){return current.countCards('h')>=player.countCards('h')})>0||game.countPlayer(function(current){return current.countCards('e')>player.countCards('e')})>0;
				},
				filterCard:true,
				check:function (card){
					return 5-get.value(card);
				},
				content:function (){
					'step 0'
					var list=[];
					if(game.countPlayer(function(current){return current.countCards('h')>player.countCards('h')})>0) list.push('令一名手牌数大于你的角色交给你一张牌');
					if(game.countPlayer(function(current){return current.countCards('e')>player.countCards('e')})>0) list.push('令一名装备区里牌数大于你的角色弃置一张装备牌');
					if(list.length==0) event.finish();
					else if(list.length<2){
						if(game.countPlayer(function(current){return current.countCards('h')>player.countCards('h')})>0) event._result={index:0};
						else event._result={index:1};
					}
					else{
					player.chooseControl().set('ai',function(){
						if(game.hasPlayer(function(current){
							return current.countCards('h')>player.countCards('h')&&get.attitude(player,current)<0
						})) return 0;
						return 1;
					}).set('choiceList',list);
					}
					'step 1'
					if(result.index==0){
						event.control='令一名手牌数大于你的角色交给你一张牌';
						player.chooseTarget(function(card,player,target){
							return target.countCards('h')>player.countCards('h')&&target!=player;
						},'请选择【飞军】的目标').ai=function(target){
							return -get.attitude(player,target)
						};
					}else{
						event.control='令一名装备区里牌数大于你的角色弃置一张装备牌';
						player.chooseTarget(function(card,player,target){
							return target.countCards('e')>player.countCards('e')&&target!=player;
						},'请选择【飞军】的目标').ai=function(target){
							return -get.attitude(player,target)
						};
					};
					'step 2'
					if(result.bool){
						event.target=result.targets[0];
						if(!player.storage.nzry_feijun.contains(event.target)){
							if(player.hasSkill('nzry_binglve')){
								player.draw(2);
								player.logSkill('nzry_binglve');
							}
							player.storage.nzry_feijun.push(event.target);
							player.syncStorage('nzry_feijun');
						};
						player.line(event.target);
						if(event.control=='令一名手牌数大于你的角色交给你一张牌'){
							event.target.chooseCard(1,'he',true).set('ai',function(card){
								return 6-get.value(card);
							});
						}else{
							event.target.chooseToDiscard(1,'e',true);
							event.finish();
						};
					}else{
						event.finish();
					};
					'step 3'
					if(result.bool){
						player.gain(result.cards,event.target,'giveAuto');
					};
				},
				ai:{
					order:11,
					result:{
						player:function (player){
							if(game.countPlayer(function(current){return (current.countCards('h')>player.countCards('h')||current.countCards('e')>player.countCards('e'))&&get.attitude(player,current)<0&&!player.storage.nzry_feijun.contains(current)})>0||game.countPlayer(function(current){return current.countCards('h')>player.countCards('h')&&get.attitude(player,current)<0})>0||(player.countCards('h')>=2&&game.countPlayer(function(current){return current.countCards('e')>player.countCards('e')&&get.attitude(player,current)<0})>0)) return 1;
						},
					},
				},
			},
			"nzry_binglve":{audio:2},
			"nzry_huaiju":{
				marktext:"橘",
				init:function(player,skill){
					if(!player.storage[skill]) player.storage[skill]=0;
				},
				intro:{
					content:'当前有#个“橘”',
				},
				mark:true,
				audio:2,
				trigger:{
					global:'gameDrawAfter'
				},
				forced:true,
				content:function(){
					player.storage.nzry_huaiju+=3;
					player.syncStorage('nzry_huaiju');
					game.log(player,'获得了3个“橘”');
				},
				group:['tachibana_effect'],
			},
			//没错 这是个橘
			"tachibana_effect":{
				audio:'nzry_huaiju',
				trigger:{
					global:['damageBegin4','phaseDrawBegin'],
				},
				forced:true,
				filter:function(event,player){
					return !event.tachibanaed&&event.player.storage.nzry_huaiju&&event.player.storage.nzry_huaiju>0;
				},
				content:function(){
					trigger.tachibanaed=true;
					player.line(trigger.player,'green');
					if(trigger.name=='damage'){
						trigger.cancel();
						trigger.player.storage.nzry_huaiju--;
						if(!trigger.player.storage.nzry_huaiju) trigger.player.unmarkSkill('nzry_huaiju');
						else{
							trigger.player.syncStorage('nzry_huaiju');
							trigger.player.updateMarks('nzry_huaiju');
						}
						game.log(trigger.player,'移去了1个“橘”');
					}
					else trigger.num++;
				},
			},
			"nzry_yili":{
				audio:2,
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				content:function (){
					'step 0'
					player.chooseTarget(get.prompt('nzry_yili'),"移去一个【橘】或失去1点体力，然后令一名其他角色获得一个【橘】",function(card,player,target){
						return target!=player
					}).ai=function(target){
						var player=_status.event.player;
						if(player.storage.nzry_huaiju>2||player.hp>2) return get.attitude(player,target);
						return -1;
					};
					'step 1'
					if(result.bool){
						event.target=result.targets[0];
						if(player.storage.nzry_huaiju>0){
							player.chooseControl().set('choiceList',['流失一点体力','移去一个“橘”']).set('ai',function(){
								if(player.hp>2) return 0;
								return 1;
							});
						}
						else event._result={index:0};
					}else{
						event.finish();
					};
					'step 2'
					//player.line(event.target,'green');
					player.logSkill('nzry_yili',target);
					if(result.index==1){
						player.storage.nzry_huaiju--;
						player.syncStorage('nzry_huaiju');
						if(player.storage.nzry_huaiju<=0) player.unmarkSkill('nzry_huaiju');
						game.log(player,'移去了1个“橘”');
					}else{
						player.loseHp();
					};
					if(event.target.storage.nzry_huaiju==undefined) event.target.storage.nzry_huaiju=0;
					event.target.markSkill('nzry_huaiju');
					event.target.storage.nzry_huaiju++;
					event.target.syncStorage('nzry_huaiju');
					game.log(event.target,'获得了1个“橘”');
				},
			},
			"nzry_zhenglun":{
				audio:2,
				trigger:{
					player:'phaseDrawBefore'
				},
				filter:function (event,player){
					return player.storage.nzry_huaiju==undefined||player.storage.nzry_huaiju==0;
				},
				check:function (event,player){
					return player.countCards('h')>=2||player.skipList.contains('phaseUse');
				},
				content:function(){
					trigger.cancel();
					if(player.storage.nzry_huaiju==undefined) player.storage.nzry_huaiju=0;
					player.storage.nzry_huaiju++;
					player.syncStorage('nzry_huaiju');
					player.markSkill('nzry_huaiju');
					game.log(player,'获得了1个“橘”');
				},	
			},
			"nzry_kuizhu":{
				audio:2,
				trigger:{
					player:"phaseDiscardAfter",
				},
				direct:true,
				filter:function (event,player){
					return event.num>0;
				},
				content:function (){
					'step 0'
					event.str1='令至多'+trigger.num+'名角色摸一张牌';
					event.str2='对任意名体力值之和为'+trigger.num+'的角色造成一点伤害';
					player.chooseControl('cancel2').set('ai',function(){
						if(game.countPlayer(function(current){return get.attitude(player,current)<0&&current.hp==trigger.num})>0&&trigger.num<=3) return 1;
						return 0;
					}).set('choiceList',[event.str1,event.str2]).set('prompt','是否发动【溃诛】？');
					'step 1'
					if(result.control=='cancel2') event.finish();
					event.control=[event.str1,event.str2][result.index];
					'step 2'
					var str='请选择【溃诛】的目标';
					if(event.bool==false) str='所选目标体力之和不足'+trigger.num+'，请重选';
					if(event.control==event.str2){
						player.chooseTarget(str,[1,Infinity],function(card,player,target){
							var targets=ui.selected.targets;
							var num=0;
							for(var i=0;i<targets.length;i++){
								num+=targets[i].hp;
							};
							return num+target.hp<=trigger.num;
						}).set('ai',function(target){
							if(ui.selected.targets[0]!=undefined) return -1;
							return get.attitude(player,target)<0;
						}).promptbar='none';
					}else{
						player.chooseTarget('请选择【溃诛】的目标',[1,trigger.num]).ai=function(target){
							return get.attitude(player,target);
						};
					};
					'step 3'
					if(result.bool){
						var targets=result.targets;
						if(event.control==event.str1){
							player.line(targets);
							player.logSkill('nzry_kuizhu',targets);
							game.asyncDraw(targets);
						}else{
							var num=0;
							for(var i=0;i<targets.length;i++){
								num+=targets[i].hp;
							};
							if(num<trigger.num){
								event.bool=false;
								event.goto(2);
							}else{
								player.line(targets);
								player.logSkill('nzry_kuizhu');
								for(var i=0;i<targets.length;i++){
									targets[i].damage();
								};
								if(targets.length>=2) player.damage();
							};
						};
					};
				},
			},
			"nzry_zhizheng":{
				audio:2,
				group:["nzry_zhizheng_1","nzry_zhizheng_2"],
				trigger:{
					player:'useCardAfter'
				},
				filter:function (event,player){
					return player.isPhaseUsing();
				},
				forced:true,
				popup:false,
				content:function(){
					player.storage.nzry_zhizheng++;
				},
				subSkill:{
					others:{
						sub:true,
						mod:{
							targetEnabled:function(card,player,target){
								if(player.hasSkill('nzry_zhizheng')&&player.isPhaseUsing()&&get.distance(target,player,'attack')>1) return false;
							},
						},
					},
					"1":{
						trigger:{
							player:['phaseUseBefore','phaseUseAfter']
						},
						forced:true,
						popup:false,
						content:function(){
							if(event.triggername=='phaseUseBefore') game.countPlayer(function(current){
								if(current!=player){
									current.addTempSkill('nzry_zhizheng_others','phaseUseAfter');
								}
							});
							player.storage.nzry_zhizheng=0;
						},	
					},
					"2":{
						trigger:{
							player:'phaseUseEnd'
						},
						direct:true,
						filter:function (event,player){
							return player.storage.nzry_zhizheng<game.countPlayer(function(current){return get.distance(current,player,'attack')>1});
						},
						content:function(){
							'step 0'
							player.chooseTarget(get.prompt('nzry_zhizheng'),"弃置一名攻击范围内不包含你的角色的一张牌",function(card,player,target){
								return get.distance(target,player,'attack')>1&&target.countDiscardableCards(player,'he');
							}).ai=function(target){
								return -get.attitude(player,target);
							};
							'step 1'
							if(result.bool){
								player.line(result.targets);
								player.logSkill('nzry_zhizheng');
								player.discardPlayerCard(result.targets[0],'he',1,true);
							};
						},	
					},
				},
			},
			"nzry_lijun":{
				unique:true,
				global:'nzry_lijun1',
				audio:'nzry_lijun1',
				zhuSkill:true,
			},
			nzry_lijun2:{},
			"nzry_lijun1":{
				audio:2,
				forceaudio:true,
				trigger:{
					player:'useCardAfter'
				},
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(player.hasSkill('nzry_lijun2')) return false;
					if(player.group!='wu') return false;
					if(_status.currentPhase!=player) return false;
					if(!game.hasPlayer(function(target){
						return player!=target&&target.hasZhuSkill('nzry_lijun',player);
					})) return false;
					for(var i=0;i<event.cards.length;i++){
						if(get.position(event.cards[i])=='d'){
							return true;
						}
					}
				return false;
				},
				direct:true,
				content:function(){
					'step 0'
					var list=game.filterPlayer(function(target){
						return player!=target&&target.hasZhuSkill('nzry_lijun',player);
					});
					player.chooseTarget(get.prompt('nzry_lijun'),'将'+get.translation(trigger.cards)+'交给'+get.translation(list)+(list.length>1?'中的一人':''),function(card,player,target){
						return player!=target&&target.hasZhuSkill('nzry_lijun',player);
					}).ai=function(target){
					return get.attitude(_status.event.player,target);
					};
					'step 1'
					if(!result.bool) event.finish();
					else{
						player.addTempSkill('nzry_lijun2','phaseUseEnd');
						var zhu=result.targets[0];
						player.logSkill('nzry_lijun1',zhu);
						var list=[];
						for(var i=0;i<trigger.cards.length;i++){
							if(get.position(trigger.cards[i])=='d'){
								list.push(trigger.cards[i]);
							}
						}
						player.give(list,zhu);
						zhu.chooseBool().set('ai',function(){
							if(get.attitude(zhu,player)>0) return true;
							return false;
						}).set('prompt','是否令'+get.translation(player)+'摸一张牌？');
					}
					'step 2'
					if(result.bool) player.draw();
				},
			},
			"nzry_chenglve":{
				mark:true,
				locked:false,
				zhuanhuanji:true,
				marktext:'成',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_chenglve==true) return '出牌阶段限一次，你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制';
						return '出牌阶段限一次，你可以摸一张牌，然后弃置两张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制';
					},
				},
				enable:"phaseUse",
				usable:1,
				audio:2,
				filter:function(event,player){
					var num=1;
					if(player.storage.nzry_chenglve==true) num=0;
					return player.countCards('h')>=num;
				},
				content:function(){
					'step 0'
					if(player.storage.nzry_chenglve==true){
						player.storage.nzry_chenglve=false;
						player.draw(2);
						player.chooseToDiscard('h',true);
					}else{
						player.storage.nzry_chenglve=true;
						player.draw();
						player.chooseToDiscard('h',2,true);
					};
					'step 1'
					if(result.bool){
						player.storage.nzry_chenglve1=result.cards;
						player.syncStorage('nzry_chenglve1');
						player.addTempSkill('nzry_chenglve1',{player:'phaseAfter'});
					};
				},
				ai:{
					order:2.7,
					result:{
						player:function(player){
							if((player.storage.nzry_chenglve==undefined||player.storage.nzry_chenglve==false)&&player.countCards('h')<3) return 0;
							return 1;
						},
					},
				},
			},
			"nzry_chenglve1":{
				mod:{
					cardUsable:function(card,player){
						var cards=player.storage.nzry_chenglve1;
						for(var i=0;i<cards.length;i++){
							if(get.suit(cards[i])==get.suit(card)) return Infinity;
						};
					},
					targetInRange:function(card,player){
						var cards=player.storage.nzry_chenglve1;
						for(var i=0;i<cards.length;i++){
							if(get.suit(cards[i])==get.suit(card)) return true;
						};
					}
				},
			},
			"nzry_shicai":{
				audio:"nzry_shicai_2",
				group:["nzry_shicai_1","nzry_shicai_2","nzry_shicai_3"],
				ai:{
					effect:{
						target:function(card,player,target){
							if(get.type(card)=='equip'&&!player.storage.nzry_shicai.contains('equip')&&get.equipResult(player,target,card.name)<=0) return [1,3];
						},
					},
					threaten:2.4,
				},
				subSkill:{
					"1":{
						trigger:{
							global:'phaseBefore'
						},
						forced:true,
						popup:false,
						content:function(){
							player.storage.nzry_shicai=[];
						},	
					},
					"2":{
						audio:2,
						prompt2:"当你使用牌指定目标时，若此牌与你本回合使用的牌类型均不同（包括装备牌），则你可以将此牌置于牌堆顶，然后摸一张牌",
						trigger:{
							player:['useCardAfter'],
							target:'useCardToTargeted',				
						},
						filter:function (event,player,name){
							if(name=='useCardToTargeted'&&('equip'!=get.type(event.card)||event.player!=player)) return false;
							if(name=='useCardAfter'&&['equip','delay'].contains(get.type(event.card))) return false;
							return event.cards.filterInD().length>0&&player.storage.nzry_shicai!=undefined&&!player.storage.nzry_shicai.contains(get.type(event.card,'trick'));
						},
						check:function (event,player){
							if(get.type(event.card)=='equip'){
								return get.equipResult(player,player,event.card.name)<=0;
							}
							return true;
						},
						content:function(){
							"step 0"
							player.storage.nzry_shicai.push(get.type(trigger.card,'trick'));
							for(var i=0;i<trigger.cards.length;i++){
								if(get.position(trigger.cards[i])=='d'){
									trigger.cards[i].fix();
									ui.cardPile.insertBefore(trigger.cards[i],ui.cardPile.firstChild);
									game.log(player,'将',trigger.cards[i],'置于牌堆顶');
								}
							};
							game.updateRoundNumber();
							player.draw();
							"step 1"
							if(event.triggername=='useCardToTargeted'){
								trigger.getParent().excluded.push(player);
							}
						},	
					},
					"3":{
						trigger:{
							global:'phaseAfter'
						},
						forced:true,
						popup:false,
						content:function(){
							delete player.storage.nzry_shicai;
						},	
					},
				},
			},
			"nzry_cunmu":{
				audio:2,
				trigger:{
					player:'drawBegin'
				},
				forced:true,
				content:function(){
					trigger.bottom=true;
				},	
			},
			"nzry_mingren":{
				audio:"nzry_mingren_1",
				init:function (player){
					player.storage.nzry_mingren=[];
				},
				marktext:"任",
				intro:{
					content:'cards',
				},
				mark:true,
				group:["nzry_mingren_1","nzry_mingren_2"],
				subSkill:{
					'1':{
						audio:2,
						trigger:{
							global:'gameDrawAfter',
						},
						forced:true,
						content:function (){
							'step 0'
							player.draw();
							'step 1'
							player.chooseCard('h','请选择一张手牌置于你的武将牌上，称为“任”',true).set('ai',function(card){
								return 6-get.value(card);
							});
							'step 2'
							if(result.bool){
								player.storage.nzry_mingren.push(result.cards[0]);
								player.syncStorage('nzry_mingren');
								game.log(player,'将',result.cards[0],'置于其武将牌上');
								player.lose(result.cards[0],ui.special,'toStorage');
							};
						},
					},
					'2':{
						audio:2,
						trigger:{
							player:'phaseJieshuBegin',
						},
						direct:true,
						content:function (){
							'step 0'
							player.chooseCard('h','是否用一张手牌替换“任”？').set('ai',function(card){
								return 5-get.value(card);
							});
							'step 1'
							if(result.bool){
								player.logSkill('nzry_mingren');
								if(player.storage.nzry_mingren!=undefined&&player.storage.nzry_mingren[0]!=undefined){
									player.gain(player.storage.nzry_mingren[0],'gain2','fromStorage');
									player.storage.nzry_mingren.remove(player.storage.nzry_mingren[0]);
								};
								player.syncStorage('nzry_mingren');
								player.storage.nzry_mingren.push(result.cards[0]);
								player.syncStorage('nzry_mingren');
								game.log(player,'将',result.cards[0],'置于其武将牌上');
								player.lose(result.cards[0],ui.special,'toStorage');
							};
						},
					},
				},
			},
			"nzry_zhenliang":{
				audio:"nzry_zhenliang_1",
				mark:true,
				locked:false,
				zhuanhuanji:true,
				marktext:'贞',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_zhenliang==true) return '你的回合外，当你使用或打出牌进入弃牌堆时，若此牌与“任”类型相同，则你可以令一名角色摸一张牌';
						return '出牌阶段限一次，你可以选择一名攻击范围内的其他角色，然后弃置X张与“任”颜色相同的牌并对其造成一点伤害（X为你与其的体力差且至少为1）';
					},
				},
				group:["nzry_zhenliang_1","nzry_zhenliang_2"],
				subSkill:{
					'1':{
						prompt:"出牌阶段限一次，你可以选择一名攻击范围内的其他角色，然后弃置X张与“任”颜色相同的牌并对其造成一点伤害（X为你与其的体力差且至少为1）",
						audio:2,
						enable:'phaseUse',
						usable:1,
						filter:function(event,player){
							return game.hasPlayer(function(current){
								return current!=player&&
								get.distance(player,current,'attack')<=1&&
								player.storage.nzry_mingren!=undefined&&
								player.countCards('he',{color:get.color(player.storage.nzry_mingren[0])})>=Math.max(Math.abs(current.hp-player.hp),1);
							})&&player.storage.nzry_zhenliang!=true;
						},
						filterTarget:function(card,player,target){
							return player.storage.nzry_mingren!=undefined&&
							target!=player&&
							get.distance(player,target,'attack')<=1&&
							player.countCards('he',{color:get.color(player.storage.nzry_mingren[0])})>=Math.max(Math.abs(target.hp-player.hp),1);
						},
						content:function(){
							'step 0'
							player.chooseCard('请选择发动【贞良】的牌',Math.max(Math.abs(target.hp-player.hp),1),'he',{color:get.color(player.storage.nzry_mingren[0])},true).set('ai',function(card){
								return 6-get.value(card);
							});
							'step 1'
							if(result.bool){
								player.storage.nzry_zhenliang=true;
								player.discard(result.cards);
								target.damage('nocard');
							};
						},
						ai:{
							order:5,
							result:{
								target:function(player,target){
									if(Math.abs(target.hp-player.hp)<=1) return -1;
								},
							},
						},
					},
					'2':{
						audio:2,
						trigger:{
							player:['useCardAfter','respondAfter'],
						},
						filter:function (event,player){
							return _status.currentPhase!=player&&
							player.storage.nzry_mingren!=undefined&&
							player.storage.nzry_mingren[0]!=undefined&&
							get.type(player.storage.nzry_mingren[0])==get.type(event.card)&&
							player.storage.nzry_zhenliang==true;
						},
						direct:true,
						content:function(){
							"step 0"
							player.chooseTarget(get.prompt('nzry_zhenliang'),'令一名角色摸一张牌').ai=function(target){
								return get.attitude(player,target)
							};
							"step 1"
							if(result.bool){
								player.storage.nzry_zhenliang=false;
								player.line(result.targets);
								player.logSkill('nzry_zhenliang');
								result.targets[0].draw();
							}else{
								event.finish();
							};
						},
					},
				},
			},
			'nzry_jianxiang':{
				audio:2,
				trigger:{
					target:'useCardToTargeted',
				},
				filter:function (event,player){
					return event.player!=player;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('nzry_jianxiang'),'令场上手牌数最少的一名角色摸一张牌',function(card,player,target){
						return target.isMinHandcard();
					}).ai=function(target){
						return get.attitude(player,target)
					};
					"step 1"
					if(result.bool){
						player.logSkill('nzry_jianxiang',result.targets);
						result.targets[0].draw();
					}
				},
			},
			"nzry_shenshi":{
				mark:true,
				audio:'nzry_shenshi_1',
				locked:false,
				zhuanhuanji:true,
				marktext:'审',
				intro:{
					content:function(storage,player,skill){
						if(player.storage.nzry_shenshi==true) return '其他角色对你造成伤害后，你可以观看该角色的手牌，然后交给其一张牌，当前角色回合结束时，若该角色未失去此牌，你将手牌摸至四张';
						return '出牌阶段限一次，你可以将一张牌交给一名手牌数最多的角色，然后对其造成一点伤害，若该角色因此死亡，则你可以令一名角色将手牌摸至四张';
					},
				},
				group:["nzry_shenshi_1","nzry_shenshi_2"],
				subSkill:{
					'1':{
						audio:2,
						prompt:'出牌阶段限一次，你可以将一张牌交给一名手牌数最多的角色，然后对其造成一点伤害，若该角色因此死亡，则你可以令一名角色将手牌摸至四张',
						enable:'phaseUse',
						usable:1,
						filter:function(event,player){
							return player.countCards('h')>0&&player.storage.nzry_shenshi!=true;
						},
						discard:false,
						line:true,
						prepare:'give',
						position:'he',
						filterCard:true,
						filterTarget:function(card,player,target){
							return target!=player&&!game.hasPlayer(function(current){
								return current!=player&&current.countCards('h')>target.countCards('h');
							});
						},
						check:function(card){
							return 5-get.value(card);
						},
						content:function(){
							'step 0'
							player.storage.nzry_shenshi=true;
							target.gain(cards,player);
							target.damage('nocard');
							'step 1'
							if(!target.isAlive()){
								player.chooseTarget('请选择一名角色并令其将手牌摸至四张',function(card,player,target){
									return target.countCards('h')<4;
								}).ai=function(target){
									return get.attitude(player,target)
								};
							}
							else{
								event.finish();
							};
							'step 2'
							if(result.bool){
								player.line(result.targets);
								result.targets[0].draw(4-result.targets[0].countCards('h'))
							};
						},
						ai:{
							order:1,
							result:{
								target:function(player,target){
									return -1;
								},
							},
						},
					},
					'2':{
						audio:2,
						trigger:{
							player:'damageEnd',
						},
						filter:function (event,player){
							return player.countCards('he')>0&&event.source&&event.source!=player&&player.storage.nzry_shenshi==true;
						},
						check:function (event,player){
							return event.source&&event.source.countCards('h')<=2&&player.countCards('h')<4;
						},
						content:function(){
							"step 0"
							player.storage.nzry_shenshi=false;
							player.viewHandcards(trigger.source);
							player.chooseCard('he',true).set('ai',function(card){
								return 5-get.value(card);
							});
							"step 1"
							if(result.bool){
								trigger.source.gain(result.cards,player,'give');
								trigger.source.storage.nzry_shenshi1=result.cards[0];
								trigger.source.storage.nzry_shenshi2=player;
								trigger.source.addSkill('nzry_shenshi1');
							};
						},
					},
				},
			},
			"nzry_shenshi1":{
				audio:2,
				trigger:{
					global:'phaseJieshuBegin',
				},
				forced:true,
				popup:false,
				filter:function (event,player){
					return player.storage.nzry_shenshi1!=undefined&&player.storage.nzry_shenshi2!=undefined;
				},
				content:function(){
					var pl=player.storage.nzry_shenshi2;
					var card=player.storage.nzry_shenshi1;
					if(player.getCards('hej').contains(card)&&4-pl.countCards('h')>0){
						pl.draw(4-pl.countCards('h'));
						pl.logSkill('nzry_shenshi');
					};
					player.removeSkill('nzry_shenshi1');
					delete player.storage.nzry_shenshi1;
					delete player.storage.nzry_shenshi2;
				},
			},
			
			xinjushou:{
				audio:'jushou',
				trigger:{player:'phaseJieshuBegin'},
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
						if(get.type(result.cards[0])=='equip'&&!player.isDisabled(get.subtype(result.cards[0]))){
							player.chooseUseTarget(result.cards[0],true,'nopopup');
						}
						else{
							player.discard(result.cards[0]);
						}
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
				audio:2,
				trigger:{player:'useCardToPlayered'},
				filter:function(event,player){
					return event.card.name=='sha'&&event.target.countDiscardableCards(player,'he')>0;
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
							trigger.getParent().directHit.add(trigger.target);
						}
						else if(trigger.cards){
							var list=[];
							for(var i=0;i<trigger.cards.length;i++){
								if(get.position(trigger.cards[i])=='d') list.push(trigger.cards[i]);
							}
							if(list.length) trigger.target.gain(list,'gain2','log');
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
			},
			lianhuan4:{
				mod:{
		selectTarget:function(card,player,range){
			if(card.name=='tiesuo'&&player.hasSkill('xinlianhuan')&&range[1]<3&&range[1]!=-1) range[1]=3;
		},
	},
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
						order:8.9
					}
				},
				group:['reluanji_count','reluanji_reset','reluanji_respond','reluanji_damage','reluanji_draw'],
				subSkill:{
					reset:{
						trigger:{player:'phaseAfter'},
						silent:true,
						content:function(){
							delete player.storage.reluanji;
							delete player.storage.reluanji2;
						}
					},
					count:{
						trigger:{player:'useCard'},
						silent:true,
						filter:function(event){
							return event.skill=='reluanji';
						},
						content:function(){
							player.storage.reluanji2=trigger.card;
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
							return event.getParent(2).skill=='reluanji';
						},
						content:function(){
							trigger.player.draw();
						}
					},
					damage:{
						trigger:{source:'damage'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.reluanji2&&event.card==player.storage.reluanji2;
						},
						content:function(){
							delete player.storage.reluanji2;
						},
					},
					draw:{
						trigger:{player:'useCardAfter'},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							return player.storage.reluanji2&&event.card==player.storage.reluanji2;
						},
						content:function(){
							player.draw(trigger.targets.length);
							delete player.storage.reluanji2;
						},
					},
				}
			},
			qimou:{
				unique:true,
				limited:true,
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
				skillAnimation:true,
				animationColor:'orange',
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
					var map={};
					var list=[];
					for(var i=1;i<=player.hp;i++){
						var cn=get.cnNumber(i,true);
						map[cn]=i;
						list.push(cn);
					}
					event.map=map;
					player.awakenSkill('qimou');
					player.storage.qimou=true;
					player.chooseControl(list,function(){
						return get.cnNumber(_status.event.goon,true);
					}).set('prompt','失去任意点体力').set('goon',num);
					'step 1'
					var num=event.map[result.control]||1;
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
				trigger:{source:'damageSource'},
				filter:function(event,player){
					return get.distance(player,event.player)<=1&&event.num>0;
				},
				direct:true,
				audio:'kuanggu',
				content:function(){
					'step 0'
					event.num=trigger.num;
					'step 1'
					player.chooseDrawRecover(get.prompt('xinkuanggu')).set('logSkill','xinkuanggu').set('prompt2','摸一张牌或回复1点体力');
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
				trigger:{player:'useCardToTargeted'},
				logTarget:'target',
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(event.target.countCards('h')<=player.countCards('h')) return true;
					if(event.target.hp>=player.hp) return true;
					return false;
				},
				content:function(){
					if(trigger.target.countCards('h')<=player.countCards('h')) trigger.getParent().directHit.push(trigger.target);
					if(trigger.target.hp>=player.hp){
						var id=trigger.target.playerid;
						var map=trigger.getParent().customArgs;
						if(!map[id]) map[id]={};
						if(typeof map[id].extraDamage!='number'){
							map[id].extraDamage=0;
						}
						map[id].extraDamage++;
					}
				},
				ai:{
					threaten:0.5
				}
			},
			tiaoxin:{
				audio:2,
				audioname:['sp_jiangwei','xiahouba'],
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					return target!=player&&lib.filter.targetInRange({name:'sha'},target,player)&&target.countCards('he');
				},
				content:function(){
					"step 0"
					target.chooseToUse({name:'sha'},'挑衅：对'+get.translation(player)+'使用一张杀，或令其弃置你的一张牌').set('targetRequired',true).set('complexSelect',true).set('filterTarget',function(card,player,target){
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
				animationColor:'fire',
				audio:2,
				unique:true,
				juexingji:true,
				//priority:-10,
				derivation:'reguanxing',
				trigger:{player:'phaseZhunbeiBegin'},
				forced:true,
				filter:function(event,player){
					if(player.storage.zhiji) return false;
					return player.countCards('h')==0;
				},
				content:function(){
					"step 0"
					player.awakenSkill('zhiji');
					player.chooseDrawRecover(2,true);
					"step 1"
					player.loseMaxHp();
					player.storage.zhiji=true;
					if(player.hp>player.maxHp) player.hp=player.maxHp;
					player.update();
					player.addSkill('reguanxing');
				}
			},
			xiangle:{
				audio:2,
				trigger:{target:'useCardToTargeted'},
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
						trigger.getParent().excluded.add(player);
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
					player.chooseBool(get.prompt2('fangquan')).set('ai',function(){
						if(!_status.event.fang) return false;
						return game.hasPlayer(function(target){
							if(target.hasJudge('lebu')||target==player) return false;
							if(get.attitude(player,target)>4){
								return (get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1)>0);
							}
							return false;
						});
					}).set('fang',fang);
					"step 1"
					if(result.bool){
						player.logSkill('fangquan');
						trigger.cancel();
						player.addSkill('fangquan2');
						//player.storage.fangquan=result.targets[0];
					}
				}
			},
			fangquan2:{
				trigger:{player:'phaseEnd'},
				forced:true,
				popup:false,
				audio:false,
				//priority:-50,
				content:function(){
					"step 0"
					player.chooseToDiscard('是否弃置一张牌并令一名其他角色进行一个额外回合？').set('logSkill','fangquan').ai=function(card){
						return 20-get.value(card);
					};
					"step 1"
					if(result.bool){
						player.chooseTarget(true,'请选择进行额外回合的目标角色',lib.filter.notMe).ai=function(target){
							if(target.hasJudge('lebu')) return -1;
							if(get.attitude(player,target)>4){
								return get.threaten(target)/Math.sqrt(target.hp+1)/Math.sqrt(target.countCards('h')+1);
							}
							return -1;
						};
					}
					else event.finish();
					"step 2"
					var target=result.targets[0];
					player.line(target,'fire');
					target.markSkillCharacter('fangquan',player,'放权','进行一个额外回合');
					target.insertPhase();
					target.addSkill('fangquan3');
					player.removeSkill('fangquan2');
					//delete player.storage.fangquan;
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
				animationColor:'fire',
				audio:2,
				unique:true,
				juexingji:true,
				zhuSkill:true,
				keepSkill:true,
				derivation:'jijiang',
				trigger:{player:'phaseZhunbeiBegin'},
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
				audioname:['gz_dengai'],
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
					player.judge(function(card){
						if(get.suit(card)=='heart') return -1;
						return 1;
					}).callback=lib.skill.tuntian.callback;
				},
				callback:function(){
					'step 0'
						if(!event.judgeResult.bool){
							game.cardsDiscard(card);
							event.finish();
						}
						else if(get.mode()=='guozhan'){
							player.chooseBool('是否将'+get.translation(card)+'作为【田】置于武将牌上？').ai=function(){
								return true;
							};
						}
						else event.directbool=true;
						'step 1'
						if(!result.bool&&!event.directbool){
							game.cardsDiscard(card);
							return;
						};
						event.node=event.judgeResult.node;
						//event.trigger("addCardToStorage");
						//event.card.fix();
						player.storage.tuntian.push(event.card);
						//event.card.goto(ui.special);
						game.cardsGotoSpecial(card);
						event.node.moveDelete(player);
						game.broadcast(function(cardid,player){
							var node=lib.cardOL[cardid];
							if(node){
								node.moveDelete(player);
							}
						},event.node.cardid,player);
						game.addVideo('gain2',player,get.cardsInfo([event.node]));
						player.markSkill('tuntian');
						game.addVideo('storage',player,['tuntian',get.cardsInfo(player.storage.tuntian),'cards']);
				},
				init:function(player){
					if(!player.storage.tuntian) player.storage.tuntian=[];
				},
				intro:{
					content:'cards'
				},
				group:'tuntian_dist',
				locked:false,
				subSkill:{
					dist:{
						locked:false,
						mod:{
							globalFrom:function(from,to,distance){
								if(from.storage.tuntian){
									var num=distance-from.storage.tuntian.length;
									if(_status.event.skill=='jixi_backup'||_status.event.skill=='gzjixi_backup') num++;
									return num;
								}
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
				animationColor:'thunder',
				audio:2,
				unique:true,
				juexingji:true,
				trigger:{player:'phaseZhunbeiBegin'},
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
				audioname:['sp_lvmeng'],
				trigger:{
					player:'useCardToPlayered',
					target:'useCardToTargeted',
				},
				filter:function(event,player){
					if(!(event.card.name=='juedou'||(event.card.name=='sha'&&get.color(event.card)=='red'))) return false;
					return player==event.target||event.getParent().triggeredTargets3.length==1;
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
				animationColor:'wood',
				audio:2,
				juexingji:true,
				derivation:['reyingzi','gzyinghun'],
				unique:true,
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.hp==1&&!player.storage.hunzi;
				},
				forced:true,
				//priority:3,
				content:function(){
					player.loseMaxHp();
					player.addSkill('reyingzi');
					player.addSkill('gzyinghun');
					game.log(player,'获得了技能','#g【英姿】和【英魂】')
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
				audio:'zhiba2',
				zhuSkill:true,
			},
			zhiba2:{
				audio:2,
				forceaudio:true,
				enable:'phaseUse',
				prompt:function(){
					var player=_status.event.player;
					var list=game.filterPlayer(function(target){
						return target.hasZhuSkill('zhiba',player)&&player.canCompare(target);
					});
					var str='和'+get.translation(list);
					if(list.length>1) str+='中的一人';
					str+='进行拼点。若你没赢，其可以获得两张拼点牌。';
					return str;
				},
				filter:function(event,player){
					if(player.group!='wu'||player.countCards('h')==0) return false;
					return game.hasPlayer(function(target){
						return target.hasZhuSkill('zhiba',player)&&player.canCompare(target);
					});
				},
				filterTarget:function(card,player,target){
					return target.hasZhuSkill('zhiba',player)&&player.canCompare(target);
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
						var list=[];
						if(get.position(result.player)=='d') list.push(result.player);
						if(get.position(result.target)=='d') list.push(result.target);
						if(!list.length) event.finish();
						else{
							event.list=list;
							target.chooseBool('是否获得'+get.translation(list)+'？').ai=function(){
								return get.value(list)>0;
							};
						}
					}
					else event.finish();
					"step 3"
					if(result.bool) target.gain(event.list,'gain2');
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
					var type=get.subtype(card);
					return player!=target&&target.isEmpty(type);
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
				group:["guzheng_count"],
				subSkill:{
					count:{
						trigger:{global:['discardAfter','cardsDiscardAfter']},
						forced:true,
						silent:true,
						popup:false,
						filter:function(event,player){
							if(event.guzhenged) return false;
							if(!event.cards||!event.cards.length) return false;
							var evt=event.getParent('phaseDiscard');
							return evt&&evt.name=='phaseDiscard'&&evt.player!=player;
						},
						content:function(){
							var evt=event.getParent('phaseDiscard');
							trigger.guzhenged=true;
							if(!evt.guzhengcards) evt.guzhengcards=[];
							evt.guzhengcards.addArray(trigger.cards);
						},
						sub:true,
					},
				},
				trigger:{global:'phaseDiscardAfter'},
				filter:function(event,player){
					if(event.player!=player&&event.player.isIn()&&
					event.guzhengcards&&event.guzhengcards.length){
						for(var i=0;i<event.guzhengcards.length;i++){
							if(get.position(event.guzhengcards[i])=='d'){
								return true;
							}
						}
						return false;
					}
				},
				checkx:function(event,player){
					var du=false;
					var num=0;
					for(var i=0;i<event.guzhengcards.length;i++){
						if(get.position(event.guzhengcards[i])=='d'){
							num++;
							if(event.guzhengcards[i].name=='du'){
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
					event.cards=trigger.guzhengcards.slice(0);
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
					var next=player.chooseToDiscard('he',get.prompt2('beige',trigger.player));
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
				trigger:{player:'die'},
				forced:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:'gray',
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
				audio:'huashen2',
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
							if(info.limited||info.juexingji||info.charlotte||info.zhuSkill){
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
				setup:function(player,gain){
					for(var i in lib.character){
						if(lib.filter.characterDisabled2(i)) continue;
						var add=false;
						for(var j=0;j<lib.character[i][3].length;j++){
							var info=lib.skill[lib.character[i][3][j]];
							if(!info){
								continue;
							}
							if(!info.limited&&!info.juexingji&&!info.charlotte&&!info.zhuSkill){
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
					player.storage.huasheninited=true;
					if(gain){
						player.markSkill('huashen');
						lib.skill.huashen.get(player,2);
						_status.event.trigger('huashenStart');
					}
				}
			},
			huashen1:{
				trigger:{global:'gameStart',player:['enterGame','damageBefore']},
				forced:true,
				popup:false,
				//priority:10,
				filter:function(event,player){
					return !player.storage.huasheninited;
				},
				content:function(){
					lib.skill.huashen.setup(player,trigger.name!='damage');
				}
			},
			huashen2:{
				audio:2,
				trigger:{player:['phaseBegin','phaseEnd','huashenStart']},
				filter:function(event,player,name){
					if(name=='phaseBegin'&&game.phaseNumber==1) return false;
					return true;
				},
				//priority:50,
				forced:true,
				//popup:false,
				content:function(){
					'step 0'
					if(get.is.empty(player.storage.huashen.owned)){
						if(!player.storage.huasheninited){
							lib.skill.huashen.setup(player,false);
						}
						event.finish();
						return;
					}
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
								//player.logSkill('huashen2');
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

								// if(event.triggername=='phaseZhunbeiBegin'){
								// 	(function(){
								// 		var skills=[link];
								// 		var list=[];
								// 		game.expandSkills(skills);
								// 		var triggerevent=event._trigger;
								// 		var name='phaseZhunbeiBegin';
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
								// 			game.createTrigger('phaseZhunbeiBegin',list[i],player,triggerevent);
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
						if(event.triggername=='phaseZhunbeiBegin'){
							cond='in';
						}
						skills.randomSort();
						skills.sort(function(a,b){
							return get.skillRank(b,cond)-get.skillRank(a,cond);
						});
						var choice=skills[0];
						if(choice){
							event.currentname=map[choice];
							event.clickControl(choice,'ai');
						}
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
					player.markSkill('huashen');
				},
				ai:{
					maixie_hp:true
				}
			},
			huoshou:{
				audio:"huoshou1",
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
				audio:"huoshou1",
				trigger:{global:'damageBefore'},
				forced:true,
				filter:function(event,player){
					return (event.card&&event.card.name=='nanman');
				},
				content:function(){
					trigger.source=player;
				}
			},
			zaiqixx:{
				audio:'zaiqi',
				inherit:'zaiqi',
			},
			zaiqi:{
				audio:2,
				trigger:{player:'phaseDrawBefore'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				check:function(event,player){
					if(player.getDamagedHp()<2){
						return false;
					}
					else if(player.getDamagedHp()==2){
						return player.countCards('h')>=2;
					}
					return true;
				},
				content:function(){
					"step 0"
					trigger.cancel();
					event.cards=get.cards(player.getDamagedHp()+(event.name=='zaiqi'?0:1));
					player.showCards(event.cards);
					"step 1"
					var num=0;
					var cards2=[];
					for(var i=0;i<event.cards.length;i++){
						if(get.suit(event.cards[i])=='heart'){
							num++;
							cards2.push(event.cards[i]);
							event.cards.splice(i--,1);
						}
					}
					game.cardsDiscard(cards2);
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
				audio:"juxiang1",
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
				audio:"juxiang1",
				trigger:{global:'useCardAfter'},
				forced:true,
				filter:function(event,player){
					return (event.card.name=='nanman'&&event.player!=player&&get.itemtype(event.cards)=='cards'&&get.position(event.cards[0])=='d');
				},
				content:function(){
					player.gain(trigger.cards,'gain2');
				}
			},
			lieren:{
				audio:2,
				audioname:['boss_lvbu3'],
				trigger:{source:'damageSource'},
				filter:function(event,player){
					if(event._notrigger.contains(event.player)) return false;
					return (event.card&&event.card.name=='sha'&&
						event.player.isAlive()&&
						player.canCompare(event.player));
				},
				check:function(event,player){
					return get.attitude(player,event.player)<0&&player.countCards('h')>1;
				},
				//priority:5,
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
				//unique:true,
				//gainable:true,
				trigger:{global:'die'},
				//priority:5,
				filter:function(event){
					return event.player.countCards('he')>0;
				},
				content:function(){
					"step 0"
					event.togain=trigger.player.getCards('he');
					player.gain(event.togain,trigger.player,'giveAuto');
				},
			},
			fangzhu:{
				audio:2,
				trigger:{player:'damageEnd'},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('fangzhu'),'令一名其他角色将武将牌翻面并摸'+get.cnNumber(player.getDamagedHp())+'张牌',function(card,player,target){
						return player!=target
					}).ai=function(target){
						if(target.hasSkillTag('noturn')) return 0;
						var player=_status.event.player;
						if(get.attitude(_status.event.player,target)==0) return 0;
						if(get.attitude(_status.event.player,target)>0){
							if(target.classList.contains('turnedover')) return 1000-target.countCards('h');
							if(player.getDamagedHp()<3) return -1;
							return 100-target.countCards('h');
						}
						else{
							if(target.classList.contains('turnedover')) return -1;
							if(player.getDamagedHp()>=3) return -1;
							return 1+target.countCards('h');
						}
					}
					"step 1"
					if(result.bool){
						player.logSkill('fangzhu',result.targets);
						result.targets[0].draw(player.getDamagedHp());
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
				audio:"songwei2",
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
						player.chooseBool('是否发动【颂威】，令'+get.translation(current)+'摸一张牌？').set('choice',get.attitude(player,current)>0);
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
						prompt:'将一半的手牌交给场上手牌数最少的一名角色',
						forced:true,
						ai2:function(target){
							return get.attitude(_status.event.player,target);
						}
					});
					"step 1"
					if(result.targets&&result.targets[0]){
						result.targets[0].gain(result.cards,player,'giveAuto');
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
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.hp<player.maxHp;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('yinghun'),function(card,player,target){
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
				trigger:{player:'phaseZhunbeiBegin'},
				filter:function(event,player){
					return player.getDamagedHp()>0;
				},
				direct:true,
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt2('gzyinghun'),function(card,player,target){
						return player!=target;
					}).set('ai',function(target){
						var player=_status.event.player;
						if(player.getDamagedHp()==1&&target.countCards('he')==0){
							return 0;
						}
						if(get.attitude(_status.event.player,target)>0){
							return 10+get.attitude(_status.event.player,target);
						}
						if(player.getDamagedHp()==1){
							return -1;
						}
						return 1;
					});
					"step 1"
					if(result.bool){
						event.num=player.getDamagedHp();
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
				trigger:{player:'useCardToPlayered',target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					if(player==event.player){
						return event.target.sex=='female';
					}
					return event.player.sex=='female';
				},
				check:function(event,player){
					return player==event.player;
				},
				content:function(){
					var id=(player==trigger.player?trigger.target:player).playerid;
					var map=trigger.getParent().customArgs;
					if(!map[id]) map[id]={};
					if(typeof map[id].shanRequired=='number'){
						map[id].shanRequired++;
					}
					else{
						map[id].shanRequired=2;
					}
				}
			},
			benghuai:{
				audio:2,
				audioname:['zhugedan'],
				trigger:{player:'phaseJieshuBegin'},
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
					}).set('prompt','崩坏：失去1点体力或减1点体力上限');
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
				audio:'baonue2',
				zhuSkill:true,
			},
			baonue2:{
				audio:2,
				forceaudio:true,
				trigger:{source:'damageSource'},
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
					event.currented=[];
					"step 1"
					event.currented.push(event.current);
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
					event.current=event.current.next;
					if(event.current!=player&&!event.currented.contains(event.current)){
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
				audio:2,
				audioname:['boss_lvbu3','shen_simayi'],
				global:'wansha2',
				trigger:{global:'dying'},
				priority:15,
				forced:true,
				filter:function(event,player,name){
					return _status.currentPhase==player&&event.player!=player;
				},
				content:function(){}
			},
			wansha2:{
				mod:{
					cardSavable:function(card,player){
						if(!_status.currentPhase) return;
						if(_status.currentPhase.hasSkill('wansha')&&_status.currentPhase!=player){
							if(card.name=='tao'&&!player.isDying()) return false;
						}
					}
				}
			},
			weimu:{
				trigger:{global:'useCard'},
				audio:2,
				forced:true,
				filter:function (event,player,card){
					if(get.color(event.card)!='black') return false;
					return event.card.name=='nanman'&&player!=event.player||event.card.name=='wanjian'&&player!=event.player||event.card.name=='taoyuan'&&player.hp<player.maxHp||event.card.name=='wugu';
				},
				content:function(){},
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
				equipSkill:true,
				inherit:'bagua_skill',
				filter:function(event,player){
					if(!lib.skill.bagua_skill.filter(event,player)) return false;
					if(!player.isEmpty(2)) return false;
					return true;
				},
				ai:{
					respondShan:true,
					effect:{
						target:function(card,player,target){
							if(player==target&&get.subtype(card)=='equip2'){
								if(get.equipValue(card)<=7.5) return 0;
							}
							if(!target.isEmpty(2)) return;
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
				check:function(card){return 4.5-get.value(card)}
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
				visible:true,
				loseTo:'discardPile',
				prompt:'将一张梅花牌置入弃牌堆并摸一张牌',
				delay:0.5,
				prepare:function(cards,player){
					player.$throw(cards,1000);
					game.log(player,'将',cards,'置入了弃牌堆');
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
				limited:true,
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
					player.awakenSkill('niepan');
					player.storage.niepan=true;
					player.discard(player.getCards('hej'));
					'step 1'
					if(player.hp<3){
						player.recover(3-player.hp);
					}
					'step 2'
					player.draw(3);
					'step 3'
					player.link(false);
					'step 4'
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
				limited:true,
				animationColor:'orange',
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
					player.awakenSkill('oldniepan');
					player.storage.oldniepan=true;
					player.discard(player.getCards('hej'));
					'step 1'
					if(player.hp<3){
						player.recover(3-player.hp);
					}
					'step 2'
					player.draw(3);
					'step 3'
					player.link(false);
					'step 4'
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
					return target.hp>player.hp&&player.canCompare(target);
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
					player.chooseTarget(get.prompt2('jieming'),[1,trigger.num],function(card,player,target){
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
			qiangxix:{
				inherit:'reqiangxi',
				usable:2,
				filterTarget:function (card,player,target){
					if(player==target) return false;
					if(target.hasSkill('reqiangxi_off')) return false;
					return true;
				},
			},
			qiangxi:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				audioname:['boss_lvbu3'],
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
					target.damage('nocard');
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
					target.damage('nocard');
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
					return player.canCompare(target);
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
				prompt:function(){
					var player=_status.event.player;
					var str='将一张'+(player.storage.shuangxiong2=='red'?'红':'黑')+'色手牌当做【决斗】使用';
					return str;
				},
				viewAs:{name:'juedou'},
				onremove:true,
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
						order:8.5
					}
				}
			},
			xueyi:{
				trigger:{player:'phaseDiscardBefore'},
				audio:2,
				forced:true,
				filter:function(event,player){
					return player.hasZhuSkill('xueyi');
				},
				content:function(){},
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
				//priority:-1,
				filter:function(event){
					return event.target.countCards('he')>0;
				},
				check:function(event,player){
					return get.attitude(player,event.target)<0;
				},
				logTarget:'target',
				content:function(){
					player.discardPlayerCard('he',trigger.target,true);
				}
			},
			jiewei:{
				trigger:{player:'turnOverEnd'},
				//direct:true,
				frequent:true,
				audio:2,
				content:function(){
					'step 0'
					player.draw();
					player.chooseToUse(function(card){
						if(!lib.filter.cardEnabled(card,_status.event.player,_status.event)){
							return false;
						}
						var type=get.type(card,'trick');
						return type=='trick'||type=='equip';
					},'是否使用一张锦囊牌或装备牌？');
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
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return event.card.name=='shan';
				},
				direct:true,
				content:function(){
					"step 0";
					player.chooseTarget(get.prompt2('releiji')).ai=function(target){
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
				audio:'shensu1',
				audioname:['xiahouba'],
				group:['shensu1','shensu2']
			},
			xinshensu:{
				audio:'shensu1',
				audioname:['xiahouba'],
				group:['shensu1','shensu2','shensu4']
			},
			shensu1:{
				audio:2,
				audioname:['xiahouba'],
				trigger:{player:'phaseJudgeBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check= player.countCards('h')>2;
					player.chooseTarget(get.prompt("shensu"),"跳过判定阶段和摸牌阶段，视为对一名其他角色使用一张【杀】",function(card,player,target){
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
						trigger.cancel();
						player.skip('phaseDraw');
					}
				}
			},
			shensu2:{
				audio:'shensu1',
				audioname:['xiahouba'],
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
						prompt2:"弃置一张装备牌并跳过出牌阶段，视为对一名其他角色使用一张【杀】",
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
				audioname:['xiahouba'],
				trigger:{player:'phaseDiscardBefore'},
				direct:true,
				content:function(){
					"step 0"
					var check=player.needsToDiscard()||player.isTurnedOver();
					player.chooseTarget(get.prompt('shensu'),"跳过弃牌阶段并将武将牌翻面，视为对一名其他角色使用一张【杀】",function(card,player,target){
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
				trigger:{player:'phaseJieshuBegin'},
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
			moon_jushou:{
				audio:'jushou',
				trigger:{player:'phaseJieshuBegin'},
				content:function(){
					player.draw();
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
				trigger:{player:'useCardToTargeted'},
				check:function(event,player){
					return get.attitude(player,event.target)<=0;
				},
				logTarget:'target',
				filter:function(event,player){
					if(event.card.name!='sha') return false;
					var length=event.target.countCards('h');
					return (length>=player.hp||length<=player.getAttackRange());
				},
				content:function(){
					trigger.getParent().directHit.push(trigger.target);
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
				trigger:{source:'damageSource'},
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
				audioname:['daxiaoqiao'],
				trigger:{player:'damageBegin3'},
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
						prompt:get.prompt2('tianxiang')
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
				charlotte:true,
				content:function(){
					if(player.getDamagedHp()) player.draw(player.getDamagedHp());
					player.removeSkill('tianxiang2');
					player.popup('tianxiang');
				}
			},
			retianxiang:{
				audio:'tianxiang',
				audioname:['daxiaoqiao'],
				trigger:{player:'damageBegin4'},
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
							event.target.damage(trigger.source,'nocard').type='retianxiang';
							event.target.addSkill('retianxiang2');
							if(get.position(event.card)=='s'){
								game.cardsDiscard(event.card);
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
					'step 0'
					player.gain(player.storage.retianxiang3,'gain2');
					'step 1'
					player.removeSkill('retianxiang3');
				},
				onremove:function(player){
					var card=player.storage.retianxiang3;
					if(get.position(card)=='s'){
						game.cardsDiscard(card);
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
						player.draw(player.getDamagedHp());
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
						prompt:get.prompt2('xintianxiang')
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
				trigger:{player:['phaseZhunbeiBegin','dieBegin']},
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
				//priority:-15,
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
							event.count=trigger.num;
							'step 1'
							event.count--;
							if((player.hp+player.storage.gzbuqu.length)>1){
								player.chooseCardButton('移去一张不屈牌',true,player.storage.gzbuqu).set('ai',function(button){
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
							}
							'step 2'
							for(var i=0;i<result.links.length;i++){
								result.links[i].discard();
								player.storage.gzbuqu.remove(result.links[i]);
							}
							player.$throw(result.links);
							game.log(player,'移去了不屈牌',result.links);
							if(event.count) event.goto(1);
							'step 3'
							lib.skill.gzbuqu.process(player);
						}
					}
				},
				content:function(){
					'step 0'
					var num=(-trigger.num-Math.max(player.hp-trigger.num,1)+1);
					var cards=get.cards(num);
					game.cardsGotoSpecial(cards);
					player.storage.gzbuqu.addArray(cards);
					//event.trigger("addCardToStorage");
					player.showCards(get.translation(player)+'的不屈牌',player.storage.gzbuqu);
					'step 1'
					lib.skill.gzbuqu.process(player);
				},
				ai:{
					mingzhi:true
				}
			},
			buqu:{
				audio:2,
				audioname:['key_yuri'],
				trigger:{player:'chooseToUseBefore'},
				forced:true,
				filter:function(event,player){return event.type=='dying'&&player.isDying()&&event.dying==player},
				content:function(){
					"step 0"
					event.card=get.cards()[0];
					if(player.storage.buqu==undefined) player.storage.buqu=[];
					player.storage.buqu.push(event.card);
					player.syncStorage('buqu');
					//event.trigger("addCardToStorage");
					game.cardsGotoSpecial(event.card);
					player.showCards(player.storage.buqu,'不屈')
					player.markSkill('buqu');
					"step 1"
					for(var i=0;i<player.storage.buqu.length-1;i++){
						if(get.number(event.card)&&get.number(event.card)==get.number(player.storage.buqu[i])){
							player.storage.buqu.remove(event.card);
							player.syncStorage('buqu');
							player.markSkill('buqu');
							game.cardsDiscard(event.card);
							return;
						};
					}
					trigger.cancel();
					trigger.result={bool:true};
					if(player.hp<=0){
						player.recover(1-player.hp);
					}
				},
				mod:{
					maxHandcard:function(player,num){
						if(get.mode()!='guozhan'&&player.storage.buqu&&player.storage.buqu.length) return num-player.hp+player.storage.buqu.length;
					},
				},
				ai:{
					save:true,
					skillTagFilter:function(player){
						if(player.hp>0) return false;
						},
					},
				intro:{
					content:'cards',
					onunmark:function(storage,player){
						if(storage&&storage.length){
							player.$throw(storage);
							game.cardsDiscard(storage);
							delete player.storage.buqu;
						}
					}
				}
			},
			fenji:{
				audio:2,
				trigger:{
					global:["gainAfter","discardAfter"],
				},
				filter:function (event){
					var player=event[event.name=='gain'?'source':'player'];
					if(!player||_status.currentPhase==player||player.isDead()) return false;
					if(event[event.name=='gain'?'bySelf':'notBySelf']!=true) return false;
					for(var i=0;i<event.cards.length;i++){
						if(event.cards[i].original=='h') return true;
					}
					return false;
				},
				check:function(event,player){
					return get.attitude(player,event[event.name=='gain'?'source':'player'])>2;
				},
				logTarget:function(event){
					return event[event.name=='gain'?'source':'player'];
				},
				content:function(){
					"step 0"
					player.loseHp();
					"step 1"
					trigger[trigger.name=='gain'?'source':'player'].draw(2);
				},
			},
			leiji:{
				audio:2,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return event.card.name=='shan';
				},
				direct:true,
				content:function(){
					"step 0";
					player.chooseTarget(get.prompt2('leiji')).ai=function(target){
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
						player.respond(result.cards,'highlight','guidao');
					}
					else{
						event.finish();
					}
					"step 2"
					if(result.bool){
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
				audio:'huangtian2',
				global:'huangtian2',
				zhuSkill:true,
			},
			huangtian2:{
				audio:2,
				audioname:['zhangjiao'],
				enable:'phaseUse',
				discard:false,
				line:true,
				prepare:'give',
				prompt:function(){
					var player=_status.event.player;
					var list=game.filterPlayer(function(target){
						return target!=player&&target.hasZhuSkill('huangtian',player);
					});
					var str='将一张【闪】或【闪电】交给'+get.translation(list);
					if(list.length>1) str+='中的一人';
					return str;
				},
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
		//废除装备栏时显示的卡牌
		card:{
			"feichu_equip1":{
				type:"equip",
				subtype:"equip1",
			},
			"feichu_equip2":{
				type:"equip",
				subtype:"equip2",
			},
			"feichu_equip3":{
				type:"equip",
				subtype:"equip3",
			},
			"feichu_equip4":{
				type:"equip",
				subtype:"equip4",
			},
			"feichu_equip5":{
				type:"equip",
				subtype:"equip5",
			},
			disable_judge:{},
		},
		translate:{
			"feichu_equip1":"已废除",
			"feichu_equip1_info":"武器栏已废除",
			"feichu_equip2":"已废除",
			"feichu_equip2_info":"防具栏已废除",
			"feichu_equip3":"已废除",
			"feichu_equip3_info":"防御坐骑栏已废除",
			"feichu_equip4":"已废除",
			"feichu_equip4_info":"攻击坐骑栏已废除",
			"feichu_equip5":"已废除",
			"feichu_equip5_info":"宝物栏已废除",
			"feichu_equip1_bg":"废",
			"feichu_equip2_bg":"废",
			"feichu_equip3_bg":"废",
			"feichu_equip4_bg":"废",
			"feichu_equip5_bg":"废",
			disable_judge:'已废除',
			disable_judge_info:'判定区已废除',
			disable_judge_bg:'废',
			
			re_yuanshao:'袁绍',
			re_lusu:'鲁肃',
			re_yuji:"于吉",
			wangji:'王基',
			"kuailiangkuaiyue":"蒯良蒯越",
			"sunliang":"孙亮",
			"yl_luzhi":"卢植",
			"xuyou":"许攸",
			"luji":"陆绩",
			"wangping":"王平",
			"yanyan":"严颜",
			
			"zhugezhan":"诸葛瞻",
			"lukang":"陆抗",
			"haozhao":"郝昭",
			"yl_yuanshu":"袁术",
			"zhangxiu":"张绣",
			"chendao":"陈到",
			"guanqiujian":"毌丘俭",
			zhoufei:"周妃",
			
			"nzry_jianxiang":"荐降",
			"nzry_jianxiang_info":"当你成为其他角色使用牌的目标时，你可令手牌数最少的一名角色摸一张牌",
			"nzry_shenshi1":"审时",
			"nzry_shenshi":"审时",
			"nzry_shenshi_info":"转换技，①出牌阶段限一次，你可以将一张牌交给一名手牌数最多的角色，然后对其造成一点伤害，若该角色因此死亡，则你可以令一名角色将手牌摸至四张。②其他角色对你造成伤害后，你可以观看该角色的手牌，然后交给其一张牌，当前角色回合结束时，若该角色未失去此牌，你将手牌摸至四张",
			"nzry_mingren":"明任",
			"nzry_mingren_info":"游戏开始时，你摸一张牌，然后将你的一张手牌至于你的武将牌上，称为“任”。结束阶段，你可以用手牌替换“任”",
			"nzry_zhenliang":"贞良",
			"nzry_zhenliang_info":"转换技，①出牌阶段限一次，你可以选择一名攻击范围内的其他角色，然后弃置X张与“任”颜色相同的牌并对其造成一点伤害（X为你与其的体力差且至少为1）。②你的回合外，当你使用或打出牌进入弃牌堆时，若此牌与“任”类型相同，则你可以令一名角色摸一张牌",
			"nzry_chenglve1":"成略",
			"nzry_chenglve":"成略",
			"nzry_chenglve_info":"转换技，出牌阶段限一次，①你可以摸一张牌，然后弃置两张手牌。②你可以摸两张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌花色相同的牌无距离和次数限制",
			"nzry_shicai":"恃才",
			"nzry_shicai_info":"当你使用牌时，若此牌与你本回合使用的牌类型均不同（包括装备牌），则你可以将此牌置于牌堆顶，然后摸一张牌",
			"nzry_cunmu":"寸目",
			"nzry_cunmu_info":"锁定技，当你摸牌时，改为从牌堆底摸牌",
			"nzry_kuizhu":"溃诛",
			"nzry_kuizhu_info":"弃牌阶段结束后，你可以选择一项：令至多X名角色各摸一张牌，或对任意名体力值之和为X的角色造成一点伤害，若不少于2名角色，你须受到一点伤害。（X为你此阶段弃置的牌数）",
			"nzry_zhizheng":"掣政",
			"nzry_zhizheng_info":"锁定技，你的出牌阶段内，攻击范围内不包含你的其他角色不能成为你使用牌的目标。出牌阶段结束时，若你本阶段内使用的牌数小于这些角色数，你可以弃置其中一名角色一张牌",
			"nzry_lijun1":"立军",
			"nzry_lijun":"立军",
			"nzry_lijun_info":"主公技，其他吴势力角色的回合限一次，其使用的【杀】结算后，可以将此【杀】交给你，然后你可以令其摸一张牌",
			"nzry_huaiju":"怀橘",
			"nzry_huaiju_info":"锁定技，游戏开始时，你获得3个“橘”标记。（有“橘”的角色受到伤害时，防止此伤害，然后移去一个“橘”；有“橘”的角色摸牌阶段额外摸一张牌）",
			"tachibana_effect":"怀橘",
			"nzry_yili":"遗礼",
			"nzry_yili_info":"出牌阶段开始时，你可以失去一点体力或移去一个“橘”，然后令一名其他角色获得一个“橘”",
			"nzry_zhenglun":"整论",
			"nzry_zhenglun_info":"若你没有“橘”，你可以跳过摸牌阶段然后获得一个“橘”",
			"nzry_feijun":"飞军",
			"nzry_feijun_info":"出牌阶段限一次，你可以弃置一张牌，然后选择一项：令一名手牌数大于你的角色交给你一张牌；或令一名装备区里牌数大于你的角色弃置一张装备牌",
			"nzry_binglve":"兵略",
			"nzry_binglve_info":"锁定技，当你发动“飞军”时，若目标与你之前指定的目标均不相同，则你摸两张牌",
			"nzry_juzhan1":"拒战",
			"nzry_juzhan":"拒战",
			"nzry_juzhan_info":"转换技，①当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌。②当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用牌",
			
			liangyin:"良姻",
			"liangyin_info":"当有牌移至游戏外时，你可以令手牌数大于你的一名角色摸一张牌；当有牌从游戏外加入任意角色的手牌时，你可以令手牌数小于你的一名角色弃置一张牌",
			kongsheng:"箜声",
			"kongsheng_info":"准备阶段，你可以将任意张牌置于你的武将牌上；结束阶段，你使用武将牌上的装备牌，并获得武将牌上的其他牌",
			"kongsheng2":"箜声",
			"kongsheng2_info":"",
			"xinfu_zuilun":"罪论",
			"xinfu_zuilun_info":"结束阶段，你可以观看牌堆顶三张牌，你每满足以下一项便保留一张，然后以任意顺序放回其余的牌：1.你于此回合内造成过伤害；2.你于此回合内未弃置过牌；3.手牌数为全场最少。若均不满足，你与一名其他角色失去一点体力。",
			"xinfu_fuyin":"父荫",
			"xinfu_fuyin_info":"锁定技，你每回合第一次成为【杀】或【决斗】的目标后，若你的手牌数小于等于该角色，此牌对你无效。",
			"drlt_wanglie":"往烈",
			"drlt_wanglie_info":"出牌阶段，你使用的第一张牌无距离限制；当你于回合内使用牌时，你可以令此牌不能被响应，若如此做，本回合内你不能再使用牌",
			"drlt_xiongluan":"雄乱",
			"drlt_xiongluan_info":"限定技，出牌阶段，你可以废除你的判定区和装备区，然后指定一名其他角色。直到回合结束，你对其使用牌无距离和次数限制，其不能使用和打出手牌",
			"drlt_congjian":"从谏",
			"drlt_congjian_info":"当你成为锦囊牌的目标时，若此牌的目标数大于1，则你可以交给其中一名其他目标角色一张牌，然后摸一张牌，若你给出的是装备牌，改为摸两张牌",
			"drlt_yongsi":"庸肆",
			"drlt_yongsi_info":"锁定技，摸牌阶段，你改为摸X张牌（X为存活势力数）；出牌阶段结束时，若你本回合：1.没有造成伤害，将手牌摸至当前体力值；2.造成的伤害超过1点，本回合手牌上限改为已损失体力值",
			"drlt_weidi":"伪帝",
			"drlt_weidi_info":"主公技，弃牌阶段开始时，若你的手牌数大于手牌上限，则你可以将至多X张手牌分别交给等量的其他群雄角色（X为你的手牌数与手牌上限之差）。",
			"drlt_qianjie":"谦节",
			"drlt_qianjie_info":"锁定技，当你横置时，取消之。你不能成为延时类锦囊的目标。你不能成为其他角色拼点的目标。",
			"drlt_jueyan":"决堰",
			"drlt_jueyan_info":"出牌阶段限一次，你可以废除一个装备栏，然后执行对应一项：武器栏，本回合内你可以多使用三张【杀】；防具栏，摸三张牌，本回合手牌上限+3；2个坐骑栏，本回合你使用的牌无距离限制；宝物栏，本回合获得技能集智",
			"drlt_poshi":"破势",
			"drlt_poshi_info":"觉醒技，准备阶段开始时，若你的装备栏均已被废除或体力值为1，则你减一点体力上限，将手牌摸至体力上限，失去技能“决堰”并获得技能“怀柔”",
			"drlt_huairou":"怀柔",
			"drlt_huairou_info":"出牌阶段，你可以重铸装备牌",
			"drlt_zhenggu":"镇骨",
			"drlt_zhenggu_info":"结束阶段，你可以选择一名其他角色，你的回合结束后和该角色的下个回合结束时，其将手牌摸至或弃至X张。（X为你的手牌数且至多为5）",
			"drlt_zhenrong":"徵荣",
			"drlt_zhenrong_info":"当你对其他角色造成伤害后，若其手牌比你多，你可以将其一张牌置于你的武将牌上，称为“荣”",
			"drlt_hongju":"鸿举",
			"drlt_hongju_info":"觉醒技，准备阶段，若“荣”的数量大于或等于3且场上有角色死亡，则你可以用任意张手牌替换等量的“荣”，然后扣减一点体力上限并获得技能“清侧”",
			"drlt_qingce":"清侧",
			"drlt_qingce_info":"出牌阶段，你可以移去一张“荣”，然后弃置一名角色区域内的一张牌",

			jianchu:'鞬出',
			jianchu_info:'当你使用【杀】指定一名角色为目标后，你可以弃置其一张牌，若以此法弃置的牌为装备牌，此【杀】不可被【闪】响应，若不为装备牌，该角色获得此【杀】',
			redimeng:'缔盟',
			redimeng_info:'出牌阶段限一次，你可以弃置X张牌选择两名其他角色（X为这两名角色的手牌差），你混合他们的手牌，然后令其中一名角色获得其中的一张牌，并令另一名角色获得其中的一张牌，然后重复此流程，直到这些牌均被获得为止',
			reluanji:'乱击',
			reluanji_info:'你可以将两张与你本回合以此法转化的花色均不相同的手牌当【万箭齐发】使用，然后当一名角色因响应此牌而打出【闪】时，该角色摸一张牌。若你以此法使用的【万箭齐发】未造成伤害，则你可以在此牌结算完成后摸X张牌。(X为此牌的目标数)',
			xintianxiang:'天香',
			xintianxiang2:'天香',
			xintianxiang3:'天香',
			xintianxiang4:'天香',
			xintianxiang_bg:'香',
			xintianxiang_info:'当你受到伤害时，你可以弃置一张♥牌，将此伤害转移给一名其他角色，然后你选择一项：令该角色摸X张牌（X为其已损失的体力值）；或防止其造成与受到的所有伤害，且此技能失效直到你的下回合开始',
			xinshensu:'神速',
			xinshensu_info:'你可以选择一至三项：1. 跳过判定阶段和摸牌阶段；2. 跳过出牌阶段并弃置一张装备牌；3. 跳过弃牌阶段并将你的武将牌翻面。你每选择一项，视为你对一名其他角色使用一张没有距离限制的【杀】',
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
			xinjiewei_info:'你可以将装备区里的牌当【无懈可击】使用；当你的武将牌从背面翻至正面时，你可以弃置一张牌，然后移动场上的一张牌',
			xinjushou_info:'结束阶段，你可以翻面并摸四张牌，然后弃置一张手牌，若以此法弃置的是装备牌，则你改为使用之',
			jixi_info:'出牌阶段，你可以将任意一张【田】当作【顺手牵羊】使用',
			xinqiangxi_info:'出牌阶段各限一次，你可以选择一项：1. 失去一点体力并对你攻击范围内的一名其他角色造成一点伤害；2. 弃置一张装备牌并对你攻击范围内的一名其他角色造成一点伤害 ',
			qimou_info:'限定技，出牌阶段，你可以失去任意点体力，然后直到回合结束，你计算与其他角色的距离时-X，且你可以多使用X张【杀】（X为你失去的体力值）',
			tiaoxin_info:'出牌阶段限一次，你可以指定一名攻击范围内包含你的角色，该角色需对你使用一张【杀】，否则你弃置其一张牌。',
			zhiji_info:'觉醒技，准备阶段，若你没有手牌，你须回复1点体力或摸两张牌，然后减1点体力上限，并获得技能〖观星〗。',
			xiangle_info:'锁定技，当其他角色使用【杀】指定你为目标时，其需弃置一张基本牌，否则此【杀】对你无效。',
			fangquan_info:'你可跳过你的出牌阶段，若如此做，回合结束时，你可以弃置一张手牌并令一名其他角色进行一个额外的回合。',
			ruoyu_info:'主公技，觉醒技，准备阶段，若你的体力是全场最少的(或之一)，你须增加1点体力上限并回复1点体力，然后获得技能〖激将〗。',
			qiaobian_info:'你可以弃置一张手牌并跳过自己的一个阶段(准备阶段和结束阶段除外)；若你以此法跳过了摸牌阶段，则你可以获得至多两名其他角色的各一张手牌；若你以此法跳过了出牌阶段，则你可以移动场上的一张牌。',
			tuntian_info:'当你于回合外失去牌时，你可以进行一次判定。若判定结果不为♥，则你将此牌置于你的武将牌上，称之为【田】。锁定技，你计算与其他角色的距离时-X（X为你武将牌上【田】的数目）',
			zaoxian_info:'觉醒技，准备阶段，若你武将牌上【田】的数量达到3张或更多，则你减1点体力上限，并获得技能〖急袭〗',
			jiang_info:'每当你使用（指定目标后）或被使用（成为目标后）一张【决斗】或红色的【杀】时，你可以摸一张牌。',
			hunzi_info:'觉醒技，准备阶段，若你的体力值为1，你减1点体力上限，并获得技能〖英姿〗和〖英魂〗。',
			zhiba_info:'主公技，其他吴势力角色的出牌阶段限一次，其可与你进行一次拼点。若该角色没赢，你可以获得双方拼点的牌；你的觉醒技发动后，你可以拒绝此拼点。',
			zhijian_info:'出牌阶段，你可以将手牌中的一张装备牌置于一名其他角色装备区里（不得替换原装备），然后摸一张牌。',
			guzheng_info:'其他角色的弃牌阶段结束时，你可以令其获得本阶段内进入弃牌堆的牌中的一张，然后你获得其余的牌。',
			beige_info:'当有角色受到【杀】造成的伤害后，你可以弃一张牌，并令其进行一次判定，若判定结果为：♥该角色回复1点体力；♦︎该角色摸两张牌；♣伤害来源弃两张牌；♠伤害来源将其武将牌翻面',
			duanchang_info:'锁定技，杀死你的角色失去当前的所有技能。',
			// fushen_info:'回合开始前，你可以选择与任意一名角色交换控制权，该角色可选择在下一个回合开始前与你换回',
			huashen_info:'所有人都展示武将牌后，你随机获得两张未加入游戏的武将牌，选一张置于你面前并声明该武将的一项技能，你拥有该技能且同时将性别和势力属性变成与该武将相同直到该化身被替换。在你的每个准备阶段和结束后，你可以替换化身牌，你须为新的化身重新声明一项技能（你不可声明限定技、觉醒技或主公技）。',
			xinsheng_info:'每当你受到1点伤害后，你可获得一张新的化身牌。',
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
			re_xuhuang:'徐晃',
			lusu:'旧鲁肃',
			sunjian:'孙坚',
			dongzhuo:'董卓',
			jiaxu:'贾诩',
			huoshou:'祸首',
			huoshou1:'祸首',
			huoshou2:'祸首',
			zaiqi:'再起',
			zaiqixx:'再起',
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
			jiezi_info:'锁定技，其他角色跳过摸牌阶段后，你摸一张牌。',
			huoshou_info:'锁定技，【南蛮入侵】对你无效；你视为所有【南蛮入侵】的伤害来源。',
			zaiqi_info:'摸牌阶段，若你已受伤，则你可以改为展示牌堆顶的X张牌（X为你已损失的体力值），并回复X点体力（X为其中♥牌的数目）。然后你将这些♥牌置入弃牌堆，并获得其余的牌。',
			zaiqixx_info:'摸牌阶段，若你已受伤，则你可以改为展示牌堆顶的X张牌（X为你已损失的体力值+1），并回复X点体力（X为其中♥牌的数目）。然后你将这些♥牌置入弃牌堆，并获得其余的牌。',
			juxiang_info:'锁定技，【南蛮入侵】对你无效。其他角色使用的【南蛮入侵】结算后进入弃牌堆时，你获得之。',
			lieren_info:'当你使用【杀】造成伤害后，可与受到该伤害的角色进行拼点；若你赢，你获得对方的一张牌。',
			xingshang_info:'当有角色死亡后，你可以获得该角色的所有牌。',
			fangzhu_info:'当你受到伤害后，你可令一名其他角色摸X张牌（X为你已损失的体力值），然后该角色将武将牌翻面。',
			songwei_info:'主公技，其他魏势力的角色的判定牌结果为黑色且生效后，其可以令你摸一张牌。',
			duanliang_info:'你可以将一张黑色基本牌或装备牌当做【兵粮寸断】使用；若一名角色的手牌数大于或等于你的手牌数，则你对其使用【兵粮寸断】没有距离限制。',
			haoshi_info:'摸牌阶段，你可以额外摸两张牌。若此时你的手牌数多于五张，你须将一半(向下取整)的手牌交给场上除你外手牌数最少的一名角色。',
			dimeng_info:'出牌阶段限一次，你可以选择其他两名角色，你弃置等同于这两名角色手牌数量之差的牌，然后交换他们的手牌。',
			yinghun_old_info:'准备阶段，若你已受伤，则你可以令一名其他角色执行下列两项中的一项： 1.摸X张牌，然后弃一张牌。 2.摸一张牌，然后弃X张牌。 （X为你已损失的体力值）',
			jiuchi_info:'你可以将一张♠手牌当作【酒】使用。',
			roulin_info:'锁定技。你对女性角色、女性角色对你使用【杀】时，都需连续使用两张【闪】才能抵消。',
			benghuai_info:'结束阶段，若你的体力不是全场最少的(或之一)，你须减1点体力或体力上限。',
			baonue_info:'主公技，其他群雄角色造成伤害后，可进行一次判定，若为♠，你回复1点体力。',
			luanwu_info:'限定技，出牌阶段，你可令除你外的所有角色依次对与其距离最近的另一名角色使用一张【杀】，否则失去1点体力。',
			wansha_info:'锁定技，你的回合内，除你以外，不处于濒死状态的角色不能使用【桃】。',
			weimu_info:'锁定技，你不能成为黑色锦囊牌的目标。',

			sp_zhugeliang:'卧龙',
			pangtong:'庞统',
			xunyu:'荀彧',
			dianwei:'典韦',
			taishici:'太史慈',
			yanwen:'颜良文丑',
			yuanshao:'旧袁绍',
			re_pangde:'庞德',
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
			qiangxix:'强袭',
			qiangxi:'强袭',
			tianyi:'天义',
			shuangxiong:'双雄',
			shuangxiong2:'双雄',
			luanji:'乱击',
			xueyi:'血裔',
			mengjin:'猛进',
			xinlianhuan_info:' 你可以将一张♣手牌当【铁索连环】使用或重铸。你使用的【铁索连环】可以指定至多3个目标。',
			huoji_info:'出牌阶段，你可以将你的任意一张红色手牌当作【火攻】使用。',
			bazhen_info:'锁定技，若你的防具栏内没有牌且没有被废除，则你视为装备着【八卦阵】。',
			kanpo_info:'你可以将你的任意一张黑色手牌当做【无懈可击】使用。',
			lianhuan_info:'出牌阶段，你可以将一张梅花手牌当做【铁索连环】使用或重铸。',
			niepan_info:'限定技，出牌阶段或当你处于濒死状态时，你可以弃置你区域内的所有牌并复原你的武将牌，然后摸三张牌并将体力回复至3点。',
			oldniepan_info:'限定技，当你处于濒死状态时，你可以弃置你区域内的所有牌并复原你的武将牌，然后摸三张牌并将体力回复至3点。',
			quhu_info:'出牌阶段限一次，你可以与一名体力值大于你的角色拼点，若你赢，则该角色对其攻击范围内另一名由你指定的角色造成1点伤害。若你没赢，该角色对你造成一点伤害。',
			jieming_info:'当你受到1点伤害后，你可令一名角色将手牌摸至X张（X为其体力上限且至多为5）。',
			qiangxi_info:'出牌阶段限一次，你可以失去一点体力或弃置一张武器牌，然后对你攻击范围内的一名其他角色造成一点伤害。',
			qiangxix_info:'出牌阶段限两次，你可以失去一点体力或弃置一张武器牌，然后一名本阶段内未成为过〖强袭〗的目标的其他角色造成一点伤害。',
			tianyi_info:'出牌阶段限一次，你可以和一名其他角色拼点。若你赢，你获得以下技能效果直到回合结束：你使用【杀】没有距离限制；可额外使用一张【杀】；使用【杀】时可额外指定一个目标。若你没赢，你不能使用【杀】直到回合结束。',
			shuangxiong_info:'摸牌阶段，你可以改为进行一次判定：你获得此判定牌，且于此回合的出牌阶段，你可以将任意一张与此判定牌不同颜色的手牌当做【决斗】使用。',
			luanji_info:'出牌阶段，你可以将任意两张相同花色的手牌当做【万箭齐发】使用。',
			xueyi_info:'主公技，锁定技，场上每有一名其他群雄角色存活，你的手牌上限便+2。',
			mengjin_info:'当你使用的【杀】被【闪】抵消时，你可以弃置目标角色的一张牌。',

			re_xiahouyuan:'夏侯渊',
			re_huangzhong:'黄忠',
			re_weiyan:'魏延',
			re_xiaoqiao:'小乔',
			
			gz_xiahouyuan:'夏侯渊',
			gz_huangzhong:'黄忠',
			gz_weiyan:'魏延',
			gz_xiaoqiao:'小乔',
			gz_xuhuang:'徐晃',
			gz_pangde:'庞德',
			
			xuhuang:'旧徐晃',
			pangde:'旧庞德',
			xiahouyuan:'旧夏侯渊',
			caoren:'曹仁',
			huangzhong:'旧黄忠',
			sp_zhangjiao:'张角',
			weiyan:'旧魏延',
			xiaoqiao:'旧小乔',
			zhoutai:'周泰',
			zhangjiao:'旧张角',
			yuji:'于吉',
			shensu:'神速',
			shensu1:'神速',
			shensu2:'神速',
			shensu4:'神速',
			jushou:'据守',
			moon_jushou:'据守',
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
			xinkuanggu_info:'当你对距离1以内的一名角色造成1点伤害后，你可以回复1点体力或摸一张牌。',
			xinliegong_info:'你使用【杀】可以选择你距离不大于此【杀】点数的角色为目标；当你使用【杀】指定一个目标后，你可以根据下列条件执行相应的效果：1.其手牌数小于等于你的手牌数，此【杀】不可被【闪】响应，2.其体力值大于等于你的体力值，此【杀】伤害+1。',
			jiewei_info:'当你的武将牌翻面后，你可以摸一张牌。然后你可以使用一张锦囊牌或装备牌，并可以在此牌结算后弃置场上一张同类型的牌',
			releiji_info:'当你使用或打出一张【闪】时，你可令一名其他角色进行一次判定：若结果为梅花，其受到一点雷电伤害，然后你回复一点体力；若结果为黑桃，其受到两点雷电伤害。',
			tiangong_info:'锁定技，你防止即将受到的雷电伤害。每当你造成雷电伤害时，你摸一张牌。',
			shensu_info:'你可以跳过判定阶段和摸牌阶段，或跳过出牌阶段并弃置一张装备牌。若如此做，则你可以视为对任意一名角色使用一张无距离限制的【杀】',
			jushou_info:'结束阶段，你可以摸3张牌，并将武将牌翻面。',
			moon_jushou_info:'结束阶段，你可以摸一张牌，并将武将牌翻面。',
			liegong_info:'当你使用【杀】时，若目标的手牌数大于等于你的体力值，或小于等于你的攻击范围，你可令此【杀】不能被闪避。',
			kuanggu_info:'锁定技，当你造成一点伤害后，若受伤角色与你的距离不大于1，你回复一点体力。',
			tianxiang_info:'当你即将受到伤害时，你可以弃置一张♥手牌，将伤害转移给一名其他角色，然后该角色摸X张牌（X为其已损失的体力值）。',
			hongyan_info:'锁定技，你区域内的黑桃牌和黑桃判定牌均视为红桃。',
			buqu_info:'锁定技，当你处于濒死状态时，你亮出牌堆顶的一张牌并置于你的武将牌上，称之为“创”。若此牌的点数与你武将牌上已有的“创”点数均不同，则你回复至1体力。若点数相同，则将此牌置入弃牌堆。只要你的武将牌上有“创”，你的手牌上限便与“创”的数量相等。',
			buqu_info_guozhan:'锁定技，当你处于濒死状态时，你亮出牌堆顶的一张牌并置于你的武将牌上，称之为“创”。若此牌的点数与你武将牌上已有的“创”点数均不同，则你回复至1体力。若点数相同，则将此牌置入弃牌堆。',
			leiji_info:'当你使用或打出一张【闪】时，你可令任意一名角色进行一次判定。若结果为黑桃，其受到两点雷电伤害',
			guidao_info:'一名角色的判定牌生效前，你可以打出一张黑色牌替换之。',
			huangtian_info:'主公技，其他群势力角色的出牌阶段限一次，其可以交给你一张【闪】或【闪电】。',
			guhuo_info:'每名角色的回合限一次，你可以扣置一张手牌当一张基本牌或普通锦囊牌使用或打出。其他角色依次选择是否质疑。一旦有其他角色质疑则翻开此牌：若为假则此牌作废，若为真，则质疑角色获得技能“缠怨”（锁定技，你不能质疑于吉，只要你的体力值为1，你失去你的武将技能）',
			fenji_info:'每当一名角色的手牌于回合外被其他角色弃置或获得时，你可以失去1点体力，然后令该角色摸两张牌。',
			
			gzduanliang:'断粮',
			gzduanliang_info:'你可以将一张黑色基本牌或黑色装备牌当【兵粮寸断】使用；你可以对距离为2的角色使用【兵粮寸断】',
			
			shenhua_feng:'神话再临•风',
			shenhua_huo:'神话再临•火',
			shenhua_lin:'神话再临•林',
			shenhua_shan:'神话再临•山',
			shenhua_yin:'神话再临•阴',
			shenhua_lei:'神话再临•雷',
		},
	};
});
