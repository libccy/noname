mode.mowang={
	game:{
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				game.import('boss');
				"step 1"
				game.load();
			}
		},
	},
	character:{
		boss_zuiqiangshenhua:['male','qun',8,['mashu','wushuang','baonu'],['boss']],
		boss_baonuzhanshen:['male','qun',4,['mashu','wushuang','xiuluo','shenwei','shenji'],['boss']],
		boss_gaodayihao:['male','shu',1,['gd_juejing','gd_longhun'],['boss']],
		boss_nianshou:['male','qun',10,['nianrui','qixiang1','qixiang2','jixing'],['boss']],
		boss_hanxu:['male','qun',8,['chonglian','jiankong'],['boss']],
		boss_taiyangshen:['male','wei',8,['youqing','riguang','ty_wuxie','kaikeng'],['boss']],
		boss_paracel:['female','wei',6,['zhiji','liuli','feiying','ganglie','kongcheng','zaiqi'],['boss']],
		boss_ailue:['female','qun',6,['shuihu','guiyin'],['boss']],
		boss_nvwang:['female','wei',6,['wangshou','luanji','wanggong'],['boss']],
		boss_qiongmei:['female','qun',3,['qiongmei','xiyu'],['boss']],
	},
	skill:{
		taoyuan:{
			inherit:'biyue'
		},
		baonu:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return player.hp<=4
			},
			content:function(){
				var hp=player.hp;
				player.init('boss_baonuzhanshen');
				player.hp=hp;
				player.update();
				while(_status.event.name!='phaseLoop'){
					_status.event=_status.event.parent;
				}
				_status.event.player=player;
				_status.event.step=0;
				_status.loopType=0;
			}
		},
		xiuluo:{
			trigger:{player:'phaseBegin'},
			frequent:true,
			filter:function(event,player){
				return player.num('j')>0;
			},
			content:function(){
				player.chooseToDiscard(2,'hj',function(card){
					if(ui.selected.cards.length==0) return true;
					if(get.position(ui.selected.cards[0])=='h'){
						if(get.position(card)!='j') return false;
					}
					if(get.position(ui.selected.cards[0])=='j'){
						if(get.position(card)!='h') return false;
					}
					return get.suit(card)==get.suit(ui.selected.cards[0])
				},'是否一张手牌来弃置一张花色相同的判定牌？').ai=function(card){
					return 11-ai.get.value(card);
				}
			}
		},
		shenwei:{
			group:['shenwei1','shenwei2']
		},
		shenwei1:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			}
		},
		shenwei2:{
			mod:{
				maxHandcard:function(player,current){
					return current+2;
				}
			}
		},
		shenji:{
			mod:{
				selectTarget:function(card,player,range){
					if(!player.get('e','1')&&card.name=='sha') range[1]=3;
				},
			}
		},
		nianrui:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num+=2;
			}
		},
		jixing:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.recover(2);
			}
		},
		qixiang1:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
					return (event.card.name=='lebu'||event.card.viewAs=='lebu');
				}
			},
			content:function(){
				player.addTempSkill('qixiang3','phaseJudgeAfter');
			}
		},
		qixiang2:{
			trigger:{player:'judge'},
			forced:true,
			filter:function(event,player){
				if(event.card){
					return (event.card.name=='bingliang'||event.card.viewAs=='bingliang');
				}
			},
			content:function(){
				player.addTempSkill('qixiang3','phaseJudgeAfter');
			}
		},
		qixiang3:{
			mod:{
				suit:function(card,suit){
					if(suit=='diamond') return 'heart';
					if(suit=='spade') return 'club';
				}
			}
		},
		hlg_dieDraw:{
			trigger:{global:'dieAfter'},
			filter:function(event,player){
				return player!=game.zhu;
			},
			prompt:'是否摸一张牌？',
			content:function(){
				player.draw();
			}
		},
		hlg_chongzhu:{
			enable:'phaseUse',
			filter:function(event,player){
				var cards=player.get('h');
				for(var i=0;i<cards.length;i++){
					if(get.info(cards[i]).chongzhu||get.subtype(cards[i])=='equip1') return true;
				}
				return false;
			},
			filterCard:function(card){
				return get.info(card).chongzhu||get.subtype(card)=='equip1';
			},
			content:function(){
				player.draw();
			},
			ai:{
				result:{
					player:function(player){
						if(player==game.zhu) return 2;
						return ai.get.value(get.card(),player)-5;
					}
				},
				order:11
			}
		},
		chonglian:{
			trigger:{player:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return (event.source!=undefined);
			},
			content:function(){
				trigger.source.clearSkills();
				trigger.source.maxHp=3;
				if(trigger.source.hp>3) trigger.source.hp=3;
				trigger.source.update();
			}
		},
		jiankong:{
			trigger:{global:'drawEnd'},
			frequent:true,
			filter:function(event,player){
				return event.player!=player;
			},
			content:function(){
				player.draw();
			}
		},
		ns_damage:{
			trigger:{player:'damageEnd'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return player==game.zhu
			},
			content:function(){
				player.hp=player.maxHp;
				player.update();
			}
		},
		youqing:{
			trigger:{player:'loseHpBefore'},
			forced:true,
			content:function(){
				trigger.finish();
				trigger.untrigger();
			}
		},
		riguang:{
			enable:'phaseUse',
			selectTarget:-1,
			usable:1,
			filterTarget:function(card,player,target){
				return target!=player;
			},
			content:function(){
				"step 0"
				target.chooseToRespond({name:'shan'});
				"step 1"
				if(result.bool==false){
					target.damage('fire');
				}
			},
			ai:{
				result:{
					target:-1.5,
				},
				order:9,
			}
		},
		ty_wuxie:{
			trigger:{player:'phaseBegin'},
			forced:true,
			content:function(){
				player.gain(player.judges.slice(0));
			}
		},
		kaikeng:{
			trigger:{global:['respondEnd','discardEnd']},
			frequent:true,
			filter:function(event,player){
				return event.player!=player;
			},
			content:function(){
				player.draw();
			}
		},
		shuihu:{
			trigger:{player:'phaseDrawBefore'},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].num('h')){
						player.gain(game.players[i].get('h').randomGet());
						game.players[i].$give(1,player);
					}
				}
			}
		},
		guiyin:{
			trigger:{player:'phaseUseBefore'},
			check:function(event,player){
				return player.num('h')<player.hp;
			},
			content:function(){
				player.skip('phaseDiscard');
				trigger.untrigger();
				trigger.finish();
				player.draw(3);
			}
		},
		wangshou:{
			trigger:{player:'damageEnd'},
			forced:true,
			content:function(){
				player.draw(3);
			}
		},
		wanggong:{
			trigger:{source:'dieAfter'},
			forced:true,
			content:function(){
				player.draw(3)
			}
		},
		qiongmei:{
			trigger:{player:'phaseEnd'},
			frequent:true,
			content:function(){
				"step 0"
				if(event.cards==undefined) event.cards=[];
				player.judge(function(card){
					if(get.suit(card)!='spade') return 1.5;
					return -1.5;
				});
				"step 1"
				if(result.judge>0){
					event.cards.push(result.card);
					if(lib.config.auto_skill==false){
						player.chooseBool('是否再次发动？');
					}
					else{
						event._result={bool:true};
					}
				}
				else{
					player.gain(event.cards);
					event.finish();
				}
				"step 2"
				if(result.bool){
					event.goto(0);
				}
				else{
					player.gain(event.cards);
				}
			}
		},
		xiyu:{
			trigger:{player:'damageBefore'},
			filter:function(event,player){
				if(!event.source) return false;
				return player.num('h')<=event.source.num('h')||
				player.num('h')<=event.source.hp;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				trigger.source.draw();
			}
		},
		gd_juejing:{
			group:['gd_juejing1','gd_juejing2']
		},
		gd_juejing1:{
			trigger:{player:'phaseDrawBegin'},
			priority:-10,
			forced:true,
			content:function(){
				trigger.num=0;
			}
		},
		gd_juejing2:{
			trigger:{player:'loseEnd'},
			forced:true,
			filter:function(event,player){
				return (player.num('h')<4);
			},
			content:function(){
				player.draw(4-player.num('h'));
			}
		},
		gd_longhun:{
			group:['gd_longhun1','gd_longhun2','gd_longhun3','gd_longhun4']
		},
		gd_longhun1:{
			enable:['chooseToUse','chooseToRespond'],
			prompt:'将一张红桃牌当桃使用',
			viewAs:{name:'tao'},
			filterCard:function(card){
				return get.suit(card)=='heart';
			}
		},
		gd_longhun2:{
			enable:['chooseToUse','chooseToRespond'],
			prompt:'将一张方片牌当火杀使用或打出',
			viewAs:{name:'sha',nature:'fire'},
			filterCard:function(card){
				return get.suit(card)=='diamond';
			}
		},
		gd_longhun3:{
			enable:['chooseToUse','chooseToRespond'],
			prompt:'将一张黑桃牌当无懈可击使用',
			viewAs:{name:'wuxie'},
			filterCard:function(card){
				return get.suit(card)=='spade';
			}
		},
		gd_longhun4:{
			enable:['chooseToUse','chooseToRespond'],
			prompt:'将一张梅花牌当闪打出',
			viewAs:{name:'shan'},
			filterCard:function(card){
				return get.suit(card)=='club';
			}
		}
	},
	translate:{
		boss_zuiqiangshenhua:'神吕布·最强神话',
		boss_baonuzhanshen:'神吕布·暴怒战神',
		baonu:'暴怒',
		baonu2:'暴怒',
		baonu3:'暴怒',
		hlg_dieDraw:'重整',
		hlg_chongzhu:'重铸',
		xiuluo:'修罗',
		shenwei:'神威',
		shenwei1:'神威',
		shenwei2:'神威',
		chonglian:'重练',
		jiankong:'监控',
		jiankong_info:'每当有其他角色摸牌，你可以立即摸一张牌',
		chonglian_info:'锁定技，对你造成伤害的角色立即失去所有技能，若体力上限高于3则降至3',
		xiuluo_info:'回合开始阶段，你可以弃一张手牌来弃置你判断区里的一张延时类锦囊（必须花色相同）',
		shenwei_info:'锁定技，摸牌阶段，你额外摸两张牌，你的手牌上限+2',
		shenji:'没装备武器时，你使用的杀可指定至多3名角色为目标',
		boss_nianshou:'年兽',
		nianrui:'年瑞',
		qixiang1:'祺祥',
		qixiang2:'祺祥',
		jixing:'吉兴',
		nianrui_info:'摸牌阶段，你额外摸两张牌',
		jixing_info:'回合开始阶段，你回复两点体力',
		qixiang1_info:'乐不思蜀判定时，你的方块判定牌视为红桃；兵粮寸断判定时，你的黑桃判定牌视为草花',
		boss_hanxu:'韩旭',
		boss_taiyangshen:'太阳神',
		youqing:'有情',
		youqing_info:'锁定技，你不能流失体力',
		riguang:'日光',
		riguang_info:'出牌阶段，你可令所有角色今次打出一张闪，否则受到一点火焰伤害，每阶段限一次',
		ty_wuxie:'无懈',
		ty_wuxie_info:'锁定技，回合开始阶段，你将所有判定区内的牌收入手牌',
		kaikeng:'开坑',
		kaikeng_info:'每当有其他角色打出或弃置卡牌，你可以立即摸一张牌',
		boss_paracel:'Paracel',
		boss_ailue:'宇文天启',
		shuihu:'水浒',
		guiyin:'鬼隐',
		shuihu_info:'你可以放弃摸牌，并从每名其他角色中抽取一张手牌',
		guiyin_info:'你可以跳过出牌阶段和弃牌阶段，并摸X张牌，X为场上现存角色数的一半，向下取整',
		boss_nvwang:'女王受·虫',
		wangshou:'王受',
		wangshou_info:'锁定技，每当你受到一次伤害，你立即摸3张牌',
		wanggong:'王攻',
		wanggong_info:'锁定技，每当你受杀死一名角色，你立即摸3张牌',
		boss_qiongmei:'爱上穹妹的某',
		qiongmei:'穹妹',
		qiongmei_info:'回合结束阶段，你可以进行判定，若不为黑桃则可以继续判定，判定结束后将判定成功的牌收入手牌',
		xiyu:'惜玉',
		xiyu_info:'每当你即将受到伤害时，若你的手牌数不大于伤害来源的手牌数或体力值，你可以防止此伤害，并令伤害来源摸一张牌',
		boss_gaodayihao:'高达一号',
		gd_juejing:'绝境',
		gd_juejing1:'绝境',
		gd_juejing2:'绝境',
		gd_longhun:'龙魂',
		gd_longhun1:'龙魂 ♥︎',
		gd_longhun2:'龙魂 ♦︎',
		gd_longhun3:'龙魂 ♠︎',
		gd_longhun4:'龙魂 ♣︎',
		gd_juejing_info:'锁定技，摸牌阶段，你不摸牌，你的手牌数永远为4。',
		gd_longhun_info:'你的牌可以按以下规则使用或打出：红桃当桃，方块当火杀，梅花当闪，黑桃当无懈可击',
	},
	scene:[
		{
			title:'虎牢关',
			versus:3,
			boss:'boss_zuiqiangshenhua',
			global:['hlg_chongzhu','hlg_dieDraw'],
			disable:['_chongzhu'],
			forbid:['caiwenji'],
			maxShuffle:1,
			loopType:1,
			chongzheng:6
		},
		{
			title:'高达一号',
			versus:7,
			boss:'boss_gaodayihao',
		},
		{
			title:'年兽（计时）',
			boss:'boss_nianshou',
			versus:3,
			prepare:function(){
				_status.damage=0;
				var node=ui.create.div(ui.system);
				node.innerHTML=300;
				var count=300;
				var timer=setInterval(function(){
					if(count){
						count--;node.innerHTML=count;
					}
					else{
						clearInterval(timer);
						if(!_status.over) game.over();
					}
				},1000);
			},
			global:['ns_damage']
		},
		{
			title:'年兽',
			boss:'boss_nianshou',
			versus:3,
		},
		{
			title:'韩旭',
			boss:'boss_hanxu',
			versus:7,
			remove:['zhuge']
		},
		{
			title:'太阳神',
			boss:'boss_taiyangshen',
			versus:7,
		},
		{
			title:'Paracel',
			boss:'boss_paracel',
			versus:3,
		},
		{
			title:'宇文天启',
			boss:'boss_ailue',
			versus:6,
		},
		{
			title:'女王受·虫',
			boss:'boss_nvwang',
			versus:3,
		},
		{
			title:'爱上穹妹的某',
			boss:'boss_qiongmei',
			versus:6,
		},
	],
}