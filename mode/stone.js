'use strict';
mode.stone={
	element:{
		stonecharacter:{
			type:'stonecharacter',
			color:'white',
			opacity:1,
			enable:function(event,player){
				return player.canAddFellow();
			},
			chongzhu:true,
			textShadow:'black 0 0 2px',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				"step 0"
				var name=card.name.slice(0,card.name.indexOf('_stonecharacter'));
				var added=false;
				var i;
				for(i=0;i<player.actcharacterlist.length;i++){
					if(player.actcharacterlist[i]===null){
						added=true;
						break;
					}
				}
				var pos=i+4;
				if(player!=game.me){
					pos+=4;
				}
				var fellow=game.addFellow(pos,name);
				fellow.side=player.side;
				fellow.classList.add('turnedover');
				player.actcharacterlist[i]=fellow;
				fellow.$gain2(card);
				event.source=fellow;
				var num=lib.character[name][5][1];
				if(num){
					fellow.draw(num,false);
				}
				player.updateActCount();
				if(fellow.skills.contains('shaman_tuteng')){
					fellow.noPhaseDelay=true;
				}
				"step 1"
				event.trigger('fellow');
			},
			ai:{
				order:8.5,
				useful:[5.5,1],
				result:{
					target:1
				}
			}
		},
		player:{
			init:function(player){
				if(!player.isMin()||player.forcemin){
					if(!player.node.actcount){
						player.node.actcount=ui.create.div('.actcount.hp',player);
					}
					if(typeof player.actcount!=='number'){
						player.actcount=2;
					}
					player.actused=0;
					if(!player.actcharacterlist){
						player.actcharacterlist=[];
					}
					player.updateActCount();
				}
			},
			drawDeck:function(num,log){
				if(!num){
					num=1;
				}
				if(log==false){
					this.directgain(this.getDeckCards(num));
				}
				else if(log==true){
					this.directgain(this.getDeckCards(num));
					game.log(this,'从牌库中获得了'+get.cnNumber(num)+'张牌');
				}
				else{
					this.gain(this.getDeckCards(num),'draw');
					game.log(this,'从牌库中获得了'+get.cnNumber(num)+'张牌');
				}
			},
			updateActCount:function(used,countx,current){
				if(_status.video){
					this.actcount=countx||2;
				}
				else{
					game.addVideo('updateActCount',this,[used,this.actcount,this.getActCount()]);
				}
				for(var i=0;i<10;i++){
					if(this.actcount>this.node.actcount.childElementCount){
						ui.create.div(this.node.actcount);
					}
					else if(this.actcount<this.node.actcount.childElementCount){
						this.node.actcount.lastChild.remove();
					}
					else{
						break;
					}
				}
				if(used!==false){
					var count;
					if(_status.video){
						count=this.actcount-(current||0);
					}
					else{
						count=this.actcount-this.getActCount();
					}
					for(var i=0;i<this.actcount;i++){
						if(i<count){
							this.node.actcount.childNodes[i].classList.remove('lost');
						}
						else{
							this.node.actcount.childNodes[i].classList.add('lost');
						}
					}
				}
			},
			hasFellowSkill:function(skill){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].skills.contains(skill)&&
					game.players[i].side==this.side){
						return true;
					}
				}
				return false;
			},
			canAddFellow:function(){
				if(!this.actcharacterlist) return false;
				if(this.actcharacterlist.length<4) return true;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]===null) return true;
				}
				return false;
			},
			getDeckCards:function(num){
				var player=this;
				if(typeof num!='number'){
					num=1;
				}
				for(var i=0;i<5;i++){
					if(player.deckCards.length<num){
						get.deck(player,player.deck);
					}
					else{
						break;
					}
				}
				var list=[];
				for(var i=0;i<num;i++){
					list.push(player.deckCards.randomRemove());
				}
				return list;
			},
			getActCount:function(){
				return get.cardCount(true,this)+(this.actused||0)
			},
			getLeader:function(){
				return this.side==game.me.side?game.me:game.enemy;
			},
			getEnemy:function(){
				return this.side!=game.me.side?game.me:game.enemy;
			},
			hasFellow:function(){
				if(!this.actcharacterlist) return false;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]) return true;
				}
				return false;
			},
			countFellow:function(){
				if(!this.actcharacterlist) return 0;
				var num=0;
				for(var i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]) num++;
				}
				return num;
			},
			addFellow:function(fellow){
				if(!this.actcharacterlist) return this;
				var i;
				for(i=0;i<this.actcharacterlist.length;i++){
					if(this.actcharacterlist[i]===null){
						break;
					}
				}
				this.actcharacterlist[i]=fellow;
				game.addVideo('stonePosition',null,[fellow.dataset.position,i+4+(this==game.me?0:4)]);
				fellow.dataset.position=i+4+(this==game.me?0:4);
				return this;
			},
			addFellowAuto:function(name){
				var next=game.createEvent('addFellowAuto');
				next.player=this;
				next.fellowName=name;
				next.content=function(){
					"step 0"
					if(!player.canAddFellow()){
						event.finish();
						return;
					}
					var name=event.fellowName;
					var added=false;
					var i;
					for(i=0;i<player.actcharacterlist.length;i++){
						if(player.actcharacterlist[i]===null){
							added=true;
							break;
						}
					}
					var pos=i+4;
					if(player!=game.me){
						pos+=4;
					}
					var fellow=game.addFellow(pos,name,'zoominanim');
					fellow.side=player.side;
					fellow.classList.add('turnedover');
					player.actcharacterlist[i]=fellow;
					event.source=fellow;
					var num=lib.character[name][5][1];
					if(num){
						fellow.draw(num,false);
					}
					player.updateActCount();
					if(fellow.skills.contains('shaman_tuteng')){
						fellow.noPhaseDelay=true;
					}
					// player.line(fellow,'green');
					"step 1"
					event.trigger('fellow');
					event.result=event.source;
				}
			},
			removeFellow:function(fellow){
				if(!this.actcharacterlist) return this;
				var index=this.actcharacterlist.indexOf(fellow);
				if(index>=0){
					this.actcharacterlist[index]=null;
				}
				return this;
			},
			dieAfter:function(source){
				var dead=this;
				if(game.me.isDead()){
					if(!_status.mylist.length){
						_status.friendCount.innerHTML='友军: '+get.cnNumber(0);
						game.over(false);
					}
					else{
						game.pause();
						_status.deadfriend.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.classList.add('noidentity');
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceme');
							player.actcount=game.enemy.actcount;
							player.actcount=dead.actcount;
							if(_status.double_character){
								player.init(_status.mylist.shift(),_status.mylist.shift());
							}
							else{
								player.init(_status.mylist.shift());
							}
							player.maxHp++;
							player.hp++;
							if(_status.mode=='deck'){
								get.deck(player,_status.deck.shift());
							}
							game.players.push(player);
							ui.arena.appendChild(player);

							game.addVideo('stoneSwap',null,{
								name:player.name,
								name2:player.name2,
								position:player.dataset.position,
								actcount:player.actcount,
								me:true
							});
							game.swapControl(player);
							game.arrangePlayers();
							if(_status.mode=='deck'){
								var nd=game.enemy.countFellow();
								if(nd){
									player.draw(3+nd,{drawDeck:nd},false);
								}
								else{
									player.draw(3,false);
								}
							}
							else{
								player.draw(3+game.enemy.countFellow(),false);
							}
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);

					}
				}
				else if(game.enemy.isDead()){
					if(!_status.enemylist.length){
						_status.enemyCount.innerHTML='敌军: '+get.cnNumber(0);
						game.over(true);
					}
					else{
						game.pause();
						_status.deadenemy.push(this);
						game.additionaldead.push(this);
						setTimeout(function(){
							var player=ui.create.player();
							player.classList.add('noidentity');
							player.dataset.position=dead.dataset.position;
							player.side=dead.side;
							player.actcharacterlist=dead.actcharacterlist;
							player.animate('replaceenemy');
							player.actcount=dead.actcount;
							if(_status.double_character){
								player.init(_status.enemylist.shift(),_status.enemylist.shift());
							}
							else{
								player.init(_status.enemylist.shift());
							}
							player.maxHp++;
							player.hp++;
							if(_status.mode=='deck'){
								get.deck(player,'random');
							}
							game.players.push(player);
							game.enemy=player;
							ui.arena.appendChild(player);

							game.addVideo('stoneSwap',null,{
								name:player.name,
								name2:player.name2,
								position:player.dataset.position,
								actcount:player.actcount,
							});
							game.arrangePlayers();
							if(_status.mode=='deck'){
								var nd=game.me.countFellow();
								if(nd){
									player.draw(3+nd,{drawDeck:nd},false);
								}
								else{
									player.draw(3,false);
								}
							}
							else{
								player.draw(3+game.me.countFellow(),false);
							}
							game.resume();
							game.updateStatusCount();
						},lib.config.duration);
					}
				}
				if(source&&source.side!=this.side&&!source.isMin()){
					if(_status.mode=='deck'){
						source.draw(2,{drawDeck:1});
					}
					else{
						source.draw(2);
					}
					if(source.getActCount()>0){
						source.actused--;
					}
					source.updateActCount();
				}
				game.dead.remove(this);
				game.arrangePlayers();
				this.getLeader().removeFellow(this);
				setTimeout(function(){
					dead.delete();
				},500);
			}
		}
	},
	cardPack:{
		mode_stone:[
			'spell_xiaoshi','spell_chenmo','spell_morizaihuo','spell_shengerpingdeng','spell_jingshenkongzhi','spell_anyingkuangluan',
			'spell_binghuan','spell_yanmie','spell_zhiliaozhichu','spell_wangzhezhufu','spell_diyulieyan','spell_zhiliaoshui',
			'spell_hanbingjian','spell_huoqiushu','spell_bianxingshu','spell_aoshuzhihui','spell_baofengxue','spell_lieyanfengbao',
			'spell_shandianfengbao','spell_chazhuangshandian','spell_yaoshu','spell_shixue','spell_lianhuanbaolie','spell_yexinglanghun',
			'spell_fuchouzhinu','spell_liliangzhufu','spell_fennuzhichui','spell_fengxian','spell_zuozhandongyuan','spell_shengliaoshu',
			'spell_cigu','spell_modaoyou','spell_jianrenluanwu','spell_daoshan','spell_cisha','spell_sijidaifa',
			'spell_huotigenxu','spell_wuyashenxiang','spell_ziranzhili','spell_yemanpaoxiao','spell_hengsao','spell_yexingchengzhang',
			'spell_xishengqiyue','spell_zuzhou','spell_xiaoguibaopo','spell_emozhinu','spell_anyinglieyan','spell_liliangdaijia',
			'spell_shenshengxinxing','spell_shengguangzhadan','spell_maizang','spell_xinlingshijie','spell_naluzhiguang','spell_zhiliaozhihuan',
			'spell_nuxi','spell_dunpaimengji','spell_zhansha','spell_nuhuozhongshao','spell_xuanfengzhan','spell_juemingluandou',
			'spell_lierenyinji','spell_kuaisusheji','spell_guanmenfanggou','spell_zhaohuanchongwu','spell_zidanshangtang','spell_duochongsheji'
		]
	},
	characterPack:{
		mode_stone:{
			stone_tutengyongshi:['male','wei',4,['shaman_jili'],['minskin','stone'],[4,2,'shaman']],
			stone_xuejuren:['male','wei',2,['shaman_xueju'],['minskin','stone'],[1,1,'shaman']],
			stone_tuyuansu:['male','qun',5,['chaofeng'],['minskin','stone'],[5,4,'shaman']],
			stone_huoyuansu:['male','shu',3,['shaman_huoxi'],['minskin','stone'],[4,3,'shaman']],
			stone_fachao:['male','wei',3,['shaman_tuteng','shaman_fachao'],['minskin','stone'],[3,0,'shaman']],
			stone_huoshe:['male','shu',3,['shaman_tuteng','shaman_huoshe'],['minskin','stone'],[3,0,'shaman']],

			stone_kuangyedoushi:['male','wu',3,['druid_nuhuo'],['minskin','stone'],[4,2,'druid']],
			stone_conglinshouwei:['male','wu',3,['druid_huwei'],['minskin','stone'],[4,2,'druid']],
			stone_baohuzhishu:['male','qun',6,['chaofeng'],['minskin','stone'],[6,4,'druid']],
			stone_liebao:['male','wei',3,['stone_chongfeng'],['minskin','stone'],[3,3,'druid']],
			stone_zongxiong:['male','shu',4,['chaofeng'],['minskin','stone'],[4,2,'druid']],
			stone_baoqishi:['female','wei',2,['druid_chengzhang'],['minskin','stone'],[2,2,'druid']],

			stone_caoyuanshi:['male','qun',5,['hunter_nuhou'],['minskin','stone'],[5,2,'hunter']],
			stone_leiouke:['male','shu',3,['hunter_zhanhuo'],['minskin','stone'],[3,1,'hunter']],
			stone_huofu:['male','qun',2,['stone_chongfeng'],['minskin','stone'],[3,4,'hunter']],
			stone_misha:['male','shu',3,['chaofeng'],['minskin','stone'],[3,3,'hunter']],
			stone_jiewangzhu:['male','wu',1,['hunter_jiewang'],['minskin','stone'],[1,2,'hunter']],
			stone_xunshoushi:['male','qun',2,['hunter_xunshou'],['minskin','stone'],[4,3,'hunter']],

			stone_shuiyuansu:['male','wei',4,['mage_bingdong'],['minskin','stone'],[4,2,'mage']],
			stone_wushixuetu:['female','wu',1,['mage_zhufa'],['minskin','stone'],[1,2,'mage']],
			stone_huoyao:['male','shu',3,['mage_lieyan'],['minskin','stone'],[3,1,'mage']],
			stone_falifulong:['male','shu',2,['mage_tunfa'],['minskin','stone'],[1,1,'mage']],
			stone_yingxiongzhihun:['male','wei',1,['mage_minghuo'],['minskin','stone'],[1,2,'mage']],
			stone_shifazhe:['male','qun',3,['mage_shifa'],['minskin','stone'],[3,3,'mage']],

			stone_hudunren:['male','qun',2,['paladin_hudun'],['minskin','stone'],[2,2,'paladin']],
			stone_junxuguan:['male','qun',3,['paladin_buji'],['minskin','stone'],[4,1,'paladin']],
			stone_yurenqishi:['male','qun',2,['paladin_zhaochao'],['minskin','stone'],[4,2,'paladin']],
			stone_chidunweishi:['male','qun',3,['paladin_chidun'],['minskin','stone'],[3,2,'paladin']],
			stone_liewangshouwei:['male','qun',5,['paladin_shouwei'],['minskin','stone'],[5,2,'paladin']],
			stone_longwangpeiou:['female','qun',4,['paladin_zhaohuan'],['minskin','stone'],[5,4,'paladin']],

			stone_lieyanxiaogui:['male','qun',2,['warlock_nonghuo'],['minskin','stone'],[1,4,'warlock']],
			stone_xiaoguishouling:['male','qun',3,['warlock_zhaogui'],['minskin','stone'],[3,1,'warlock']],
			stone_xiaogui:['male','qun',1,[],['minskin','stone','stonehidden'],[1,1]],
			stone_kongjuzhanma:['male','qun',1,['warlock_yongsheng'],['minskin','stone'],[3,1,'warlock']],
			stone_morishouwei:['male','qun',5,['warlock_zaihuo'],['minskin','stone'],[4,4,'warlock']],
			stone_xukongxingzhe:['male','qun',2,['chaofeng'],['minskin','stone'],[1,1,'warlock']],
			stone_diyuhuo:['male','qun',4,['warlock_yuhuo'],['minskin','stone'],[5,4,'warlock']],

			stone_zhihuiguan:['female','qun',2,['warrior_tongling'],['minskin','stone'],[2,2,'warrior']],
			stone_kuangzhanshi:['male','qun',2,['warrior_baoluan'],['minskin','stone'],[3,1,'warrior']],
			stone_zhujiashi:['male','qun',2,['warrior_zhujia'],['minskin','stone'],[2,1,'warrior']],
			stone_jiangong:['male','qun',2,['warrior_jiangong'],['minskin','stone'],[2,2,'warrior']],
			stone_chidunshinv:['female','qun',4,['warrior_tidun'],['minskin','stone'],[5,4,'warrior']],
			stone_yuanhou:['male','qun',2,['chaofeng'],['minskin','stone'],[2,3,'warrior']],

			stone_daomufeizei:['male','qun',3,['rogue_xunbao'],['minskin','stone'],[4,3,'rogue']],
			stone_qiezei:['male','qun',2,['rogue_touqie'],['minskin','stone'],[2,2,'rogue']],
			stone_heitieairen:['male','qun',2,['rogue_qiancang'],['minskin','stone'],[4,3,'rogue']],
			stone_tegong:['male','qun',2,['rogue_touxi'],['minskin','stone'],[3,3,'rogue']],
			stone_haidaotoumu:['male','qun',2,['rogue_zhaomu'],['minskin','stone'],[3,2,'rogue']],
			stone_haidao:['male','qun',1,[],['minskin','stone','stonehidden'],[1,2,'rogue']],
			stone_cike:['male','qun',1,['rogue_cisha','stone_qianxing'],['minskin','stone'],[2,1,'rogue']],

			stone_beijunmushi:['male','qun',2,['priest_shengliao'],['minskin','stone'],[1,1,'priest']],
			stone_guanliyuan:['male','qun',2,['priest_faxian'],['minskin','stone'],[2,1,'priest']],
			stone_linghunjisi:['female','qun',4,['priest_hunwu'],['minskin','stone'],[4,2,'priest']],
			stone_heianjiaotu:['male','qun',3,['priest_zhufu'],['minskin','stone'],[3,2,'priest']],
			stone_guangyaozhizi:['male','qun',3,['priest_guangyao'],['minskin','stone'],[5,3,'priest']],
			stone_longmianjiaoguan:['male','qun',2,['priest_xundao'],['minskin','stone'],[2,2,'priest']],

			stone_zhongshi:['male','wei',1,['stone_zhongshi1'],['minskin','stone'],[1,2]],
			stone_zhucangzhe:['male','wei',1,['stone_zhucangzhe1'],['minskin','stone'],[1,2]],
			stone_huoqiangshou:['male','wei',3,['stone_huoqiangshou1'],['minskin','stone'],[3,1]],

			stone_lansaizhanshi:['male','shu',1,['stone_chongfeng'],['minskin','stone'],[1,2]],
			stone_kutongsiseng:['male','shu',1,['stone_kutongsiseng1'],['minskin','stone'],[1,2]],
			stone_yuanguanying:['male','shu',3,['stone_yuanguanying1'],['minskin','stone'],[3,1]],

			stone_dijieshicong:['male','wu',2,['stone_dijieshicong1'],['minskin','stone'],[1,1]],
			stone_yaosaishouwei:['male','wu',1,['stone_yaosaishouwei1'],['minskin','stone'],[1,2]],
			stone_famingjia:['male','wu',3,['stone_famingjia1'],['minskin','stone'],[3,1]],

			stone_chilundashi:['male','qun',2,['stone_chilundashi1'],['minskin','stone'],[1,1]],
			stone_hanguangzhizhe:['male','qun',2,['stone_hanguangzhizhe1'],['minskin','stone'],[2,2]],
			stone_aihaozhihun:['male','qun',3,['stone_aihaozhihun1'],['minskin','stone'],[3,1]],

			stone_fennuxiaoji:['male','qun',1,['stone_fennuxiaoji1'],['minskin','stone'],[1,2]],
			stone_juxingchanchu:['male','qun',2,['stone_juxingchanchu1'],['minskin','stone'],[2,1]],
			stone_wuyi:['male','qun',1,['jijiu'],['minskin','stone'],[2,2]],
			stone_langren:['male','qun',1,['stone_qianxing'],['minskin','stone'],[1,2]],
			stone_shishigui:['male','qun',2,['stone_shishigui1'],['minskin','stone'],[2,1]],

			stone_fatiaozhuru:['female','qun',1,['stone_fatiaozhuru1'],['minskin','stone'],[1,2]],
			stone_mingguangjisi:['female','wu',2,['shushen'],['minskin','stone'],[2,1]],
			stone_nianqingjisi:['female','wei',2,['stone_zhufu'],['minskin','stone'],[2,1]],
			stone_aomishouwei:['female','qun',1,['biyue'],['minskin','stone'],[2,2]],
			stone_yanjingshe:['female','qun',2,['stone_yanjingshe1'],['minskin','stone'],[3,2]],
			stone_zhiyuzhe:['female','qun',3,['stone_zhiyu'],['minskin','stone'],[3,1]],
			stone_mafengzhuru:['female','qun',1,['stone_mafengzhuru1'],['minskin','stone'],[1,2]],

			stone_shumiao:['none','wu',1,[],['minskin','stone','stonehidden'],[1,1]],
			stone_shuren:['none','wu',2,['stone_chongfeng','stone_zibao'],['minskin','stone','stonehidden'],[2,2]],
			stone_youlinglang:['none','qun',2,['chaofeng'],['minskin','stone','stonehidden'],[2,2]],
			stone_shengguanghuwei:['female','qun',2,['priest_shengguang'],['minskin','stone','stonehidden'],[1,1]],
			stone_liegou:['none','qun',1,['stone_chongfeng'],['minskin','stone','stonehidden'],[1,2]],
			stone_mianyang:['none','qun',1,['mage_mianyang'],['minskin','stone','stonehidden'],[1,0]],
			stone_qingwa:['none','wu',1,['shaman_qingwa'],['minskin','stone','stonehidden'],[1,0]],

			stone_tuteng1:['none','qun',2,['shaman_tuteng','chaofeng'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng2:['none','qun',2,['shaman_tuteng','shaman_zhuore'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng3:['none','qun',2,['shaman_tuteng','shaman_fali'],['minskin','stone','stonehidden'],[2,0]],
			stone_tuteng4:['none','qun',2,['shaman_tuteng','shaman_zhiliao'],['minskin','stone','stonehidden'],[2,0]],

			stone_xinbing:['none','qun',2,[],['minskin','stone','stonehidden'],[2,1]],
		}
	},
	careerList:['mage','shaman','druid','paladin','rogue','priest','hunter','warrior','warlock'],
	game:{
		reserveDead:true,
		onWash:function(){
			if(_status.mode!='deck') return;
			var list=[];
			for(var i=0;i<ui.discardPile.childElementCount;i++){
				var type=get.type(ui.discardPile.childNodes[i]);
				if(type=='stonecard'||type=='stonecharacter'){
					list.push(ui.discardPile.childNodes[i]);
				}
			}
			while(list.length){
				list.shift().remove();
			}
		},
		modPhaseDraw:function(player,num){
			if(_status.mode=='deck'&&!player.isMin()){
				player.draw(num,{drawDeck:1});
			}
			else{
				player.draw(num);
			}
		},
		getVideoName:function(){
			var str=get.translation(game.me.name);
			if(game.me.name2){
				str+='/'+get.translation(game.me.name2);
			}
			var name=[
				str,'炉石 - '+get.config('battle_number')+'人'
			];
			return name;
		},
		updateStatusCount:function(){
			_status.friendCount.innerHTML='友军: '+get.cnNumber(1+_status.mylist.length/(_status.double_character?2:1),true);
			_status.enemyCount.innerHTML='敌军: '+get.cnNumber(1+_status.enemylist.length/(_status.double_character?2:1),true);
		},
		stoneLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				player.phase();
				event.num=0;
				"step 1"
				if(event.num<player.actcharacterlist.length){
					var current=player.actcharacterlist[event.num];
					if(current){
						current.phase();
					}
					event.num++;
					event.redo();
				}
				"step 2"
				if(event.player==game.me){
					event.player=game.enemy;
				}
				else{
					event.player=game.me;
				}
				event.goto(0);
			}
		},
		initStone:function(){
			var list=[],list2=[],list3={},list4={};
			for(var i=0;i<lib.careerList.length;i++){
				list3[lib.careerList[i]]=[];
				list4[lib.careerList[i]]=[];
			}
			var i,j,name;
			for(var i in lib.characterPack.mode_stone){
				lib.character[i]=lib.characterPack.mode_stone[i];
				lib.character[i][3].add('stonesha');
				lib.character[i][3].add('stoneshan');
				lib.character[i][3].add('stonedraw');
				name=i+'_stonecharacter';
				lib.card[name]={
					image:'character/'+i,
					stoneact:lib.character[i][5][0],
					career:lib.character[i][5][2]||null
				};
				for(j in lib.element.stonecharacter){
					lib.card[name][j]=lib.element.stonecharacter[j];
				}
				lib.translate[name]=get.translation(i);
				lib.translate[name+'_info']=get.skillintro(i);
				if(lib.character[i][4].contains('stonehidden')){
					lib.card[name].stonehidden=true;
					continue;
				}
				if(!lib.character[i][5][2]){
					if(lib.character[i][5][0]<3){
						list.push(name);
					}
					else{
						list2.push(name);
					}
				}
				else{
					list3[lib.character[i][5][2]].push(name);
				}
			}
			if(_status.mode=='deck'){
				lib.spells=[];
				var spells=lib.cardPack.mode_stone;
				for(var i=0;i<spells.length;i++){
					if(lib.card[spells[i]].career){
						list4[lib.card[spells[i]].career].push(spells[i]);
					}
					else{
						lib.spells.push(spells[i]);
					}
				}
				lib.careerSpells=list4;
				lib.minions=list.concat(list2);
				lib.careerMinions=list3;
				if(!lib.storage.deckList){
					lib.storage.deckList={};
				}
			}
			else{
				delete game.modPhaseDraw;
				var random_length=parseInt(get.config('random_length').slice(2));
				if(!random_length){
					random_length=80;
				}
				var addedcardcount=Math.ceil(lib.card.list.length/random_length);
				var addedcardcount2=Math.ceil(lib.card.list.length/random_length/2);
				var suit=['heart','diamond','club','spade'];
				while(addedcardcount--){
					for(i=0;i<list.length;i++){
						lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list[i]]);
					}
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_shengerpingdeng']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_anyingkuangluan']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_jingshenkongzhi']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_binghuan']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_zuzhou']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_diyulieyan']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_diyulieyan']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_chenmo']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_xishengqiyue']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_zhiliaoshui']);
				}
				while(addedcardcount2--){
					for(i=0;i<list2.length;i++){
						lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),list2[i]]);
					}
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_morizaihuo']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_zhiliaozhichu']);
					lib.card.list.push([suit.randomGet(),Math.ceil(Math.random()*13),'spell_wangzhezhufu']);
				}
				lib.card.list.randomSort();
			}

			lib.skill._chongzhu.usable=3;
			for(i in lib.skill){
				if(lib.skill[i].changeSeat){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
				}
			}
			for(i in lib.card){
				if(lib.card[i].type=='equip'){
					lib.card[i].stoneact=0;
				}
				else{
					if(typeof lib.card[i].stoneact==='number'&&!lib.card[i].addinfo){
						lib.card[i].addinfo='消耗: '+lib.card[i].stoneact;
						lib.card[i].addinfomenu='消耗：'+lib.card[i].stoneact;
					}
				}
			}

			_status.deadfriend=[];
			_status.deadenemy=[];
			game.additionaldead=[];
		},
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				if(lib.db&&!_status.characterLoaded){
					_status.waitingForCharacters=true;
					game.pause();
				}
				"step 1"
				lib.init.css('layout/mode/','stone');
				_status.mode=get.config('stone_mode');
				game.initStone();
				var playback=localStorage.getItem(lib.configprefix+'playback');

				if(!playback&&_status.mode=='deck'){
					(function(){
						ui.deckBuilder=ui.create.div('.popup-container#deck-builder',function(){
							if(careerList.classList.contains('shown')){
								careerList.classList.remove('shown');
								newDeck.classList.remove('active');
							}
							else if(!cardDialog.classList.contains('shown')){
								this.classList.remove('shown');
								this.timeout=setTimeout(function(){
									ui.deckBuilder.remove();
								},500);
								ui.arena.style.top='';
								ui.arena.style.transform='';
								ui.arena.style.opacity='';
								ui.system.style.opacity='';
								ui.auto.show();
								ui.pause.show();
							}
						});
						var clickNode=function(){
							cardDialog.classList.add('shown');
							controls.classList.add('shown');
							var name='未命名';
							for(var i=1;;i++){
								if(!lib.storage.deckList[name+i]){
									break;
								}
							}
							cardDialog.editing={
								name:name+i,
								content:{
									career:this.firstChild.dataset.career,
									deck:[]
								},
							}
							rename.innerHTML=name+i;
							newDeck.innerHTML='确认编辑';
							newDeck.classList.add('active');
							careerList.classList.remove('shown');
							listContainer.style.transform='translateX(200px)';
							deckContainer.innerHTML='';
							deckContainer.classList.add('shown');
							updateCardDialog();
						}
						var careerList=ui.create.div('.shadowed.career',ui.deckBuilder);
						for(var i=0;i<lib.careerList.length;i++){
							var node=ui.create.div(careerList,clickNode);
							ui.create.div('.menubutton.round',node).dataset.career=lib.careerList[i];
							ui.create.div('.text',lib.translate[lib.careerList[i]],node);
						}
						var controls=ui.create.div('.controls',ui.deckBuilder);
						var cardCount=ui.create.div('.card-count',controls);
						ui.create.div('.menubutton.large','删除',controls,function(e){
							if(this.innerHTML=='删除'){
								this.innerHTML='确定';
								var that=this;
								setTimeout(function(){
									that.innerHTML='删除';
								},1000);
							}
							else{
								cardDialog.classList.remove('shown');
								controls.classList.remove('shown');
								newDeck.innerHTML='新建卡组';
								newDeck.classList.remove('active');
								var editing=cardDialog.editing;
								if(editing){
									if(editing.origin){
										delete lib.storage.deckList[editing.origin];
										for(var i=0;i<listContainer.childElementCount;i++){
											if(listContainer.childNodes[i].name==editing.origin){
												listContainer.childNodes[i].remove();break;
											}
										}
									}
								}
								game.save('deckList',lib.storage.deckList);
								listContainer.style.transform='';
								deckContainer.classList.remove('shown');
							}
							e.stopPropagation();
						});
						var rename=ui.create.div('.menubutton.large','重命名',controls);
						rename.contentEditable=true;
						rename.onfocus=function(){
							var range = document.createRange();
						    range.selectNodeContents(this);
						    var sel = window.getSelection();
						    sel.removeAllRanges();
						    sel.addRange(range);
						};
						rename.onblur=function(){
							if(cardDialog.editing){
								if(!lib.storage.deckList[this.innerHTML]){
									cardDialog.editing.name=this.innerHTML;
								}
								else{
									this.innerHTML=cardDialog.editing.name;
								}
							}
							var sel = window.getSelection();
						    sel.removeAllRanges();
						};
						rename.onkeydown=function(e){
							if(e.keyCode==13){
								e.preventDefault();
								e.stopPropagation();
								rename.blur();
							}
						};
						var removeLine=function() {
							rename.innerHTML=rename.innerHTML.replace(/\n|<br>/g,'');
						};
						var observer = new MutationObserver(removeLine);
						observer.observe(rename,{characterData:true,subtree:true});
						rename.addEventListener('keyup',removeLine);

						var cardDialog=ui.create.cardDialog(true,function(name){
							if(lib.card[name].stonehidden) return true;
							var type=lib.card[name].type;
							return type!='stonecard'&&type!='stonecharacter';
						},{seperate:function(list){
							var nl=[],ns=[];
							var career={};
							var careerspell={};
							for(var i=0;i<lib.careerList.length;i++){
								career[lib.careerList[i]]=[];
								careerspell[lib.careerList[i]]=[];
							}
							var result={}
							for(var i=0;i<list.length;i++){
								if(lib.card[list[i][2]].type=='stonecard'){
									if(lib.card[list[i][2]].career&&lib.careerList.contains(lib.card[list[i][2]].career)){
										careerspell[lib.card[list[i][2]].career].push(list[i]);
									}
									else{
										ns.push(list[i]);
									}
								}
								else{
									if(lib.card[list[i][2]].career&&lib.careerList.contains(lib.card[list[i][2]].career)){
										career[lib.card[list[i][2]].career].push(list[i]);
									}
									else{
										nl.push(list[i]);
									}
								}
							}
							for(var i=0;i<lib.careerList.length;i++){
								result['法术·'+get.translation(lib.careerList[i])+'_link:'+lib.careerList[i]]=careerspell[lib.careerList[i]];
								result['随从·'+get.translation(lib.careerList[i])+'_link:'+lib.careerList[i]]=career[lib.careerList[i]];
							}
							result['法术·中立']=ns;
							result['随从·中立']=nl;
							return result;
						}});
						for(var i=0;i<cardDialog.buttons.length;i++){
							if(cardDialog.buttons[i].node.info.innerHTML.indexOf('随从')!=-1){
								var buttonName=cardDialog.buttons[i].link[2];
								buttonName=buttonName.slice(0,buttonName.indexOf('_stonecharacter'));
								buttonName=lib.character[buttonName];
								cardDialog.buttons[i].node.info.innerHTML=buttonName[5][1]+'/'+buttonName[2];
							}
							if(lib.config.touchscreen){
								lib.setLongPress(cardDialog.buttons[i],ui.click.intro);
							}
							else{
								if(lib.config.hover_all){
									lib.setHover(cardDialog.buttons[i],ui.click.hoverplayer);
								}
								if(lib.config.right_info){
									cardDialog.buttons[i].oncontextmenu=ui.click.rightplayer;
								}
							}
						}
						var updateCardDialog=function(button){
							if(!deckContainer.classList.contains('shown')){
								for(var i=0;i<cardDialog.buttons.length;i++){
									cardDialog.buttons[i].classList.remove('unselectable');
								}
								for(var i=0;i<cardDialog.content.childElementCount;i++){
									cardDialog.content.childNodes[i].classList.remove('nodisplay');
								}
								return;
							}
							if(deckContainer.childElementCount>=30){
								for(var i=0;i<cardDialog.buttons.length;i++){
									cardDialog.buttons[i].classList.add('unselectable');
								}
							}
							else{
								var nummap={};
								for(var i=0;i<deckContainer.childElementCount;i++){
									var name=deckContainer.childNodes[i].name;
									if(!nummap[name]){
										nummap[name]=1;
									}
									else{
										nummap[name]++;
									}
								}
								var list=[];
								for(var i in nummap){
									if(nummap[i]>=2){
										list.push(i);
									}
								}
								for(var i=0;i<cardDialog.buttons.length;i++){
									if(list.contains(cardDialog.buttons[i].link[2])){
										cardDialog.buttons[i].classList.add('unselectable');
									}
									else{
										cardDialog.buttons[i].classList.remove('unselectable');
									}
								}
							}
							var career=cardDialog.editing.content.career;
							for(var i=0;i<cardDialog.content.childElementCount;i++){
								var currentNode=cardDialog.content.childNodes[i];
								if(currentNode.link){
									if(currentNode.link==career){
										currentNode.classList.remove('nodisplay');
										currentNode.nextSibling.classList.remove('nodisplay');
									}
									else{
										currentNode.classList.add('nodisplay');
										currentNode.nextSibling.classList.add('nodisplay');
									}
								}
							}
							cardCount.innerHTML=deckContainer.childElementCount+'/30';
						};
						var clickCard=function(){
							this.remove();
							updateCardDialog();
						};
						var clickButton=function(){
							if(!deckContainer.classList.contains('shown')) return;
							if(!this.classList.contains('unselectable')){
								var card=ui.create.card(null,'noclick').init(this.link).listen(clickCard);
								deckContainer.insertBefore(card,deckContainer.firstChild);
								updateCardDialog();
							}
						}
						for(var i=0;i<cardDialog.buttons.length;i++){
							cardDialog.buttons[i].listen(clickButton);
						}
						cardDialog.classList.add('fullheight');
						cardDialog.classList.add('scroll1');
						cardDialog.classList.add('scroll2');
						cardDialog.classList.add('fixed');
						cardDialog.listen(function(e){
							e.stopPropagation();
						});

						ui.deckBuilder.appendChild(cardDialog);
						var deckList=ui.create.div('.shadowed.list',ui.deckBuilder,function(e){
							e.stopPropagation();
							if(careerList.classList.contains('shown')){
								careerList.classList.remove('shown');
								newDeck.classList.remove('active');
							}
						});
						var editDeck=function(){
							if(!cardDialog.classList.contains('shown')){
								cardDialog.classList.add('shown');
								controls.classList.add('shown');
								var info=lib.storage.deckList[this.name];
								cardDialog.editing={
									origin:this.name,
									name:this.name,
									content:{
										career:info.career,
										deck:info.deck
									},
								}
								rename.innerHTML=this.name;
								newDeck.innerHTML='确认编辑';
								newDeck.classList.add('active');
								careerList.classList.remove('shown');
								listContainer.style.transform='translateX(200px)';
								deckContainer.innerHTML='';
								for(var i=0;i<info.deck.length;i++){
									ui.create.card(deckContainer,'noclick').init(['',get.translation(lib.card[info.deck[i]].type),info.deck[i]]).listen(clickCard);
								}
								deckContainer.classList.add('shown');
								updateCardDialog();
							}
						};
						var newDeck=ui.create.div('.menubutton.large.create','新建卡组',deckList,function(e){
							if(this.innerHTML=='新建卡组'){
								this.classList.toggle('active');
								if(this.classList.contains('active')){
									careerList.classList.add('shown');
								}
								else{
									careerList.classList.remove('shown');
								}
							}
							else{
								cardDialog.classList.remove('shown');
								controls.classList.remove('shown');
								this.innerHTML='新建卡组';
								this.classList.remove('active');
								var editing=cardDialog.editing;
								if(editing){
									editing.content.deck.length=0;
									for(var i=0;i<deckContainer.childElementCount;i++){
										editing.content.deck.push(deckContainer.childNodes[i].name);
									}
									editing.content.deck.sort(function(a,b){
										if(a>b) return 1;
										if(a<b) return -1;
										return 0;
									});
									if(editing.origin){
										for(var i=0;i<listContainer.childElementCount;i++){
											if(listContainer.childNodes[i].name==editing.origin){
												listContainer.childNodes[i].name=editing.name;
												listContainer.childNodes[i].firstChild.innerHTML=editing.name;
												break;
											}
										}
										delete lib.storage.deckList[editing.origin];
									}
									else if(!lib.storage.deckList[editing.name]){
										var deckitem=ui.create.div('.deckitem.shadowed','<span>'+editing.name+'</span>',
											listContainer,editDeck);
										ui.create.div('.menubutton.round',deckitem).dataset.career=editing.content.career;
										deckitem.name=editing.name;
									}
									lib.storage.deckList[editing.name]=editing.content;
								}
								game.save('deckList',lib.storage.deckList);
								listContainer.style.transform='';
								deckContainer.classList.remove('shown');
								updateCardDialog();
							}
							e.stopPropagation();
						});
						var listContainer=ui.create.div('.list-container',deckList);
						for(var i in lib.storage.deckList){
							var deckitem=ui.create.div('.deckitem.shadowed','<span>'+i+'</span>',
								listContainer,editDeck);
							ui.create.div('.menubutton.round',deckitem).dataset.career=lib.storage.deckList[i].career;
							deckitem.name=i;
						}
						var deckContainer=ui.create.div('.list-container.deck',deckList);
					}());

					ui.deckcontrol=ui.create.system('卡组管理',function(){
						// if(lib.config.low_performance){
						// 	ui.arena.style.transform='translateY('+ui.window.offsetHeight+'px)';
						// }
						// else{
						// 	ui.arena.style.top='100%';
						// }
						// ui.arena.style.transform='scale(0.6)';
						ui.arena.style.opacity=0;
						ui.system.style.opacity=0;
						ui.window.appendChild(ui.deckBuilder);
						if(ui.deckBuilder.timeout){
							clearTimeout(ui.deckBuilder.timeout);
							delete ui.deckBuilder.timeout;
						}
						ui.refresh(ui.deckBuilder);
						ui.deckBuilder.classList.add('shown');
						ui.auto.hide();
						ui.pause.hide();
					},true);

				}

				if(playback){
					ui.create.me();
					ui.arena.style.display='none';
					ui.system.style.display='none';
					_status.playback=playback;
					localStorage.removeItem(lib.configprefix+'playback');
					var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
					store.get(parseInt(playback)).onsuccess=function(e){
						if(e.target.result){
							game.playVideoContent(e.target.result.video);
						}
						else{
							alert('播放失败：找不到录像');
							game.reload();
						}
					}
					event.finish();
				}
				else{
					game.prepareArena(2);
					game.delay();
				}
				ui.arena.classList.add('stone');
				"step 2"
				for(var i=0;i<game.players.length;i++){
					game.players[i].classList.add('noidentity');
				}
				game.enemy=game.me.next;
				if(lib.storage.test){
					lib.config.game_speed='vfast';
					_status.auto=true;
					ui.auto.classList.add('glow');
				}
				game.chooseCharacter();
				"step 3"
				if(_status.mode=='deck'){
					_status.deckButton=ui.create.system('卡组',null,true);
					lib.setPopped(_status.deckButton,function(){
						var uiintro=ui.create.dialog('hidden');
						uiintro.listen(function(e){
							e.stopPropagation();
						});
						uiintro.add('剩余 <span style="font-family:'+'xinwei'+'">'+game.me.deckCards.length);
						uiintro.addSmall([game.me.deckCards,'card']);
						return uiintro;
					},220);
				}
				_status.friendCount=ui.create.system('',null,true);
				_status.enemyCount=ui.create.system('',null,true);
				game.updateStatusCount();
				lib.setPopped(_status.friendCount,function(){
					var uiintro=ui.create.dialog('hidden');

					if(_status.deadfriend.length){
						uiintro.add('已阵亡');
						uiintro.add([_status.deadfriend,'player']);
					}

					uiintro.add('未上场');
					if(_status.mylist.length){
						uiintro.add([_status.mylist,'character']);
					}
					else{
						uiintro.add('（无）')
					}

					return uiintro;
				});
				lib.setPopped(_status.enemyCount,function(){
					if(_status.deadenemy.length){
						var uiintro=ui.create.dialog('hidden');
						uiintro.add('已阵亡');
						uiintro.add([_status.deadenemy,'player']);
						return uiintro;
					}
				});

				game.me.side=Math.random()<0.5;
				game.enemy.side=!game.me.side;

				var players=get.players(lib.sort.position);
				var info=[];
				for(var i=0;i<players.length;i++){
					info.push({
						name:players[i].name,
						name2:players[i].name2,
						count:players[i].actcount
					});
				}
				_status.videoInited=true,
				game.addVideo('init',null,info);

				event.trigger('gameStart');
				if(_status.mode=='deck'){
					game.gameDraw(game.me,3);
					game.me.drawDeck(1,false);
					game.me.next.drawDeck(1,false);
				}
				else{
					game.gameDraw(game.me);
				}
				"step 4"
				game.me.chooseBool('是否置换手牌？');
				"step 5"
				if(result.bool){
					var hs=game.me.get('h');
					for(var i=0;i<hs.length;i++){
						ui.discardPile.appendChild(hs[i]);
					}
					if(_status.mode=='deck'){
						game.me.drawDeck(1,false);
						game.me.directgain(get.cards(3));
					}
					else{
						game.me.directgain(get.cards(4));
					}
				}
				"step 6"
				if(game.me.side){
					game.stoneLoop(game.me);
				}
				else{
					game.stoneLoop(game.enemy);
				}
			}
		},
		chooseCharacter:function(){
			var next=game.createEvent('chooseCharacter',false);
			next.showConfig=true;
			next.content=function(){
				"step 0"
				var i;
				var list=[];
				event.list=list;
				for(i in lib.character){
					if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('minskin')) continue;
					if(lib.character[i][4]&&lib.character[i][4].contains('stonehidden')) continue;
					if(lib.config.forbidai.contains(i)) continue;
					if(lib.config.forbidall.contains(i)) continue;
					if(lib.config.forbidstone.contains(i)) continue;
					if(lib.config.banned.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
					if(!get.config('double_character')&&get.config('ban_weak')&&(lib.rank.c.contains(i)||lib.rank.d.contains(i))) continue;
					if(get.config('ban_strong')&&(lib.rank.s.contains(i)||lib.rank.ap.contains(i))) continue;
					if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
					list.push(i);
				}
				list.randomSort();
				var dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''),'hidden');
				dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
				dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);
				dialog.open();

				var next=game.me.chooseButton(dialog,true);
				next.selectButton=function(){
					return (get.config('double_character')?2:1)*get.config('battle_number');
				};
				next.custom.add.button=function(){
					if(ui.cheat2&&ui.cheat2.backup) return;
					_status.event.dialog.content.childNodes[0].innerHTML=
					'按顺序选择出场角色'+(get.config('double_character')?'（双将）':'');
					_status.event.dialog.content.childNodes[1].innerHTML=
					ui.selected.buttons.length+'/'+_status.event.selectButton();
				};
				event.changeDialog=function(){
					if(ui.cheat2&&ui.cheat2.dialog==_status.event.dialog){
						return;
					}
					if(game.changeCoin){
						game.changeCoin(-3);
					}
					list.randomSort();
					_status.event.dialog.close();
					_status.event.dialog=ui.create.dialog('按顺序选择出场角色'+(get.config('double_character')?'（双将）':''));
					_status.event.dialog.add('0/'+(get.config('double_character')?2:1)*get.config('battle_number'));
					_status.event.dialog.add([list.slice(0,get.config('battle_number')*2+5),'character']);
					game.uncheck();
					game.check();
				};
				ui.create.cheat=function(){
					_status.createControl=ui.cheat2;
					ui.cheat=ui.create.control('更换',event.changeDialog);
					delete _status.createControl;
				};
				event.dialogxx=ui.create.characterDialog();
				ui.create.cheat2=function(){
					ui.cheat2=ui.create.control('自由选将',function(){
						if(this.dialog==_status.event.dialog){
							if(game.changeCoin){
								game.changeCoin(50);
							}
							this.dialog.close();
							_status.event.dialog=this.backup;
							this.backup.open();
							delete this.backup;
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=1;
							}
							if(ui.cheat2x){
								ui.cheat2x.close();
								delete ui.cheat2x;
							}
						}
						else{
							if(game.changeCoin){
								game.changeCoin(-10);
							}
							ui.cheat2x=ui.create.groupControl(_status.event.parent.dialogxx);
							this.backup=_status.event.dialog;
							_status.event.dialog.close();
							_status.event.dialog=_status.event.parent.dialogxx;
							this.dialog=_status.event.dialog;
							this.dialog.open();
							game.uncheck();
							game.check();
							if(ui.cheat){
								ui.cheat.style.opacity=0.6;
							}
						}
					});
				}
				if(!ui.cheat&&get.config('change_choice'))
				ui.create.cheat();
				if(!ui.cheat2&&get.config('free_choose'))
				ui.create.cheat2();
				"step 1"
				if(ui.cheat){
					ui.cheat.close();
					delete ui.cheat;
				}
				if(ui.cheat2){
					ui.cheat2.close();
					delete ui.cheat2;
				}
				if(ui.cheat2x){
					ui.cheat2x.close();
					delete ui.cheat2x;
				}
				if(ui.deckcontrol){
					ui.deckcontrol.remove();
					delete ui.deckcontrol;
				}
				_status.mylist=result.links.slice(0);
				for(var i=0;i<result.links.length;i++){
					event.list.remove(result.links[i]);
				}
				event.list.randomSort();
				_status.enemylist=event.list.slice(0,result.links.length);
				_status.double_character=get.config('double_character');
				"step 2"
				if(_status.mode=='deck'){
					_status.deck=[];
					if(!_status.auto){
						ui.auto.hide();
						game.pause();
						var list=_status.mylist.slice(0);
						if(_status.double_character){
							event.dialog=ui.create.dialog('','hidden');
						}
						else{
							event.dialog=ui.create.dialog('','hidden');
						}

						var buttons=ui.create.div('.buttons',event.dialog.content);
						var currentNode=null;
						var clickButton=function(click){
							if(click!==false){
								_status.deck.push(this.name);
							}
							if(currentNode){
								currentNode.delete();
							}
							if(list.length){
								var names=[];
								if(_status.double_character){
									names.push(list.shift());
									names.push(list.shift());
									event.dialog.content.firstChild.innerHTML='为'+get.translation(names[0])+'/'+get.translation(names[1])+'选择一个卡组';
									currentNode=ui.create.player().init(names[0],names[1]);
								}
								else{
									names.push(list.shift());
									event.dialog.content.firstChild.innerHTML='为'+get.translation(names[0])+'选择一个卡组';
									currentNode=ui.create.player().init(names[0]);
								}
								currentNode.classList.add('stone_deck');
								ui.arena.appendChild(currentNode);
								ui.refresh(currentNode);
								currentNode.classList.add('shown');
							}
							else{
								event.dialog.close();
								ui.auto.show();
								game.resume();
							}
						}
						clickButton(false);
						for(var i in lib.storage.deckList){
							if(lib.storage.deckList[i].deck.length==30){
								var deckitem=ui.create.div('.deckitem.shadowed','<span>'+i+'</span>',buttons,clickButton);
								ui.create.div('.menubutton.round',deckitem).dataset.career=lib.storage.deckList[i].career;
								deckitem.name=i;
							}
						}
						for(var i=0;i<lib.careerList.length;i++){
							var deckitem=ui.create.div('.deckitem.shadowed','<span>随机</span>',buttons,clickButton);
							ui.create.div('.menubutton.round',deckitem).dataset.career=lib.careerList[i];
							deckitem.name='random:'+lib.careerList[i];
						}
						event.dialog.open();
					}
					else{
						var bn=parseInt(get.config('battle_number'));
						for(var i=0;i<bn;i++){
							_status.deck.push('random');
						}
					}
				}
				"step 3"
				if(ui.coin){
					_status.coinCoeff=get.coinCoeff(_status.mylist);
				}
				if(_status.double_character){
					game.me.init(_status.mylist.shift(),_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift(),_status.enemylist.shift());
				}
				else{
					game.me.init(_status.mylist.shift());
					game.enemy.init(_status.enemylist.shift());
				}
				game.me.maxHp++;
				game.me.hp++;
				game.me.update();
				game.enemy.maxHp++;
				game.enemy.hp++;
				game.enemy.update();
				if(_status.mode=='deck'){
					get.deck(game.me,_status.deck.shift());
					get.deck(game.enemy,'random');
				}
			}
		},
	},
	get:{
		deck:function(player,name){
			var career,deck;
			if(name=='random'||name.indexOf('random:')==0){
				if(name=='random'){
					career=lib.careerList.randomGet();
					name=name+':'+career;
				}
				else{
					career=name.slice(7);
				}
				deck=[];
				for(var i=0;i<lib.careerMinions[career].length;i++){
					deck.push(lib.careerMinions[career][i]);
					deck.push(lib.careerMinions[career][i]);
				}
				deck=deck.concat(lib.minions.randomGets(18-lib.careerMinions[career].length*2-lib.careerSpells[career].length)).
				concat(lib.careerSpells[career]).concat(lib.spells.randomGets(12-lib.careerSpells[career].length));
			}
			else{
				career=lib.storage.deckList[name].career;
				deck=lib.storage.deckList[name].deck.slice(0);
			}
			player.deck=name;
			player.career=career;
			if(!player.node.career){
				player.node.career=ui.create.div('.menubutton.round.identity',player);
				player.node.career.dataset.career=career;
				if(lib.config.touchscreen){
					lib.setLongPress(player.node.career,ui.click.intro);
				}
				else{
					if(lib.config.hover_all){
						lib.setHover(player.node.career,ui.click.hoverplayer);
					}
					if(lib.config.right_info){
						player.node.career.oncontextmenu=ui.click.rightplayer;
					}
				}
			}
			if(!player.deckCards) player.deckCards=[];
			for(var i=0;i<deck.length;i++){
				player.deckCards.push(game.createCard(deck[i]));
			}
		}
	},
	card:{
		spell_shenshengxinxing:{
			type:'stonecard',
			stoneact:5,
			career:'priest',
			enable:true,
			fullimage:true,
			filterTarget:true,
			selectTarget:-1,
			content:function(){
				if(player.side==target.side){
					if(player.hasFellowSkill('priest_hunwu')){
						target.loseHp();
					}
					else{
						target.recover();
					}
				}
				else{
					target.damage();
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						if(player.hasFellowSkill('priest_hunwu')) return -1;
						if(player.side==target.side) return 1;
						return -1;
					}
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1
				}
			}
		},
		spell_shengguangzhadan:{
			type:'stonecard',
			stoneact:2,
			career:'priest',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.num('h')>0;
			},
			selectTarget:-1,
			content:function(){
				target.damage(target.num('h'));
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return -Math.min(target.num('h'),target.hp);
					}
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1
				}
			}
		},
		spell_maizang:{
			type:'stonecard',
			stoneact:3,
			career:'priest',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				'step 0'
				target.die();
				'step 1'
				player.gain(game.createCard(target.name+'_stonecharacter'),'gain2');
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return -target.hp-target.num('h')/2;
					}
				}
			}
		},
		spell_xinlingshijie:{
			type:'stonecard',
			stoneact:0,
			career:'priest',
			enable:function(event,player){
				return player.getEnemy().num('h')>0;
			},
			fullimage:true,
			filterTarget:function(card,player,target){
				return target==player.getEnemy();
			},
			selectTarget:-1,
			content:function(){
				var card=target.get('h').randomGet();
				if(card){
					player.gain(game.createCard(card.name,card.suit,card.number,card.nature),'draw');
				}
			},
			ai:{
				order:9.5,
				value:5,
				useful:5,
				result:{
					player:1
				}
			}
		},
		spell_naluzhiguang:{
			type:'stonecard',
			stoneact:1,
			career:'priest',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				if(player.hasFellowSkill('priest_hunwu')){
					return true;
				}
				return target.hp<target.maxHp;
			},
			content:function(){
				'step 0'
				if(player.hasFellowSkill('priest_hunwu')){
					target.loseHp();
				}
				else{
					target.recover();
				}
				'step 1'
				if(target.hp<target.maxHp&&player.canAddFellow()){
					player.addFellowAuto('stone_shengguanghuwei');
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					player:function(player,target){
						if(player.hasFellowSkill('priest_hunwu')){
							return 1;
						}
						if(target.hp<target.maxHp-1) return 2;
						return 0;
					},
					target:function(player,target){
						if(player.hasFellowSkill('priest_hunwu')){
							return -2
						}
						return ai.get.recoverEffect(target,player,target);
					}
				}
			}
		},
		spell_zhiliaozhihuan:{
			type:'stonecard',
			stoneact:0,
			career:'priest',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				if(player.hasFellowSkill('priest_hunwu')){
					target.loseHp(2);
				}
				else{
					target.recover(2);
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						if(player.hasFellowSkill('priest_hunwu')){
							return -1;
						}
						return ai.get.recoverEffect(target,player,target);
					}
				}
			}
		},

		spell_nuxi:{
			type:'stonecard',
			stoneact:3,
			career:'warrior',
			enable:true,
			fullimage:true,
			filterTarget:true,
			content:function(){
				target.damage();
				player.changeHujia(2);
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:-1.5,
				},
				tag:{
					damage:1
				}
			}
		},
		spell_dunpaimengji:{
			type:'stonecard',
			stoneact:2,
			career:'warrior',
			enable:function(event,player){
				return player.hujia>0;
			},
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.damage(player.hujia);
			},
			ai:{
				order:7.2,
				value:5,
				useful:5,
				result:{
					target:-1.5,
					tag:{
						damage:1
					}
				}
			}
		},
		spell_zhansha:{
			type:'stonecard',
			stoneact:1,
			career:'warrior',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.hp<target.maxHp;
			},
			content:function(){
				target.die({source:player});
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-2
				}
			}
		},
		spell_nuhuozhongshao:{
			type:'stonecard',
			stoneact:0,
			career:'warrior',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				'step 0'
				target.damage();
				'step 1'
				if(target.isAlive()){
					target.draw(2);
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						if(target.hp==1) return -1;
						if(target.hp>=4) return 1.5;
						if(target.hp>=3&&target.num('h')<target.hp) return 1;
						return 0;
					}
				}
			}
		},
		spell_xuanfengzhan:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'warrior',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_juemingluandou:{
			type:'stonecard',
			stoneact:4,
			career:'warrior',
			enable:function(){
				var num=0;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()){
						num++;
						if(num>=2) return true;
					}
				}
				return false;
			},
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				targets.randomRemove();
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die()._triggered=null;
				}
				ui.clear();
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					target:-2
				}
			}
		},

		spell_lierenyinji:{
			type:'stonecard',
			stoneact:0,
			career:'hunter',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.maxHp>1;
			},
			content:function(){
				target.loseMaxHp(target.maxHp-1);
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return 1-target.hp;
					}
				}
			}
		},
		spell_kuaisusheji:{
			type:'stonecard',
			stoneact:2,
			career:'hunter',
			enable:true,
			fullimage:true,
			filterTarget:true,
			content:function(){
				target.damage();
				player.draw();
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:-1.5,
				},
				tag:{
					damage:1
				}
			}
		},
		spell_guanmenfanggou:{
			type:'stonecard',
			stoneact:3,
			career:'hunter',
			enable:function(event,player){
				return player.getEnemy().countFellow()>0;
			},
			fullimage:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				event.num=player.getEnemy().countFellow();
				'step 1'
				if(player.canAddFellow()&&event.num--){
					player.addFellowAuto('stone_liegou');
					event.redo();
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:1
				}
			}
		},
		spell_zhaohuanchongwu:{
			type:'stonecard',
			stoneact:2,
			career:'hunter',
			enable:function(event,player){
				return player.canAddFellow();
			},
			fullimage:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				var list=['stone_misha','stone_leiouke','stone_huofu',
				'stone_caoyuanshi','stone_qingwa','stone_mianyang','stone_jiewangzhu',
				'stone_fennuxiaoji','stone_juxingchanchu','stone_yanjingshe'];
				player.addFellowAuto(list.randomGet());
			},
			ai:{
				order:6,
				value:5,
				useful:5,
				result:{
					player:1
				}
			}
		},
		spell_zidanshangtang:{
			type:'stonecard',
			stoneact:1,
			career:'hunter',
			enable:true,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				var list=['spell_lierenyinji','spell_guanmenfanggou','spell_duochongsheji','spell_kuaisusheji','spell_zhaohuanchongwu'];
				player.gain(game.createCard(list.randomGet()),'draw');
				player.addTempSkill('hunter_zidanshangtang','phaseAfter');
			},
			ai:{
				order:7.5,
				value:5,
				useful:5,
				result:{
					player:1
				}
			}
		},
		spell_duochongsheji:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						return true;
					}
				}
				return false;
			},
			stoneact:4,
			career:'hunter',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					list=list.randomGets(2);
					list.sort(lib.sort.seat);
				}
				event.list=list;
				'step 1'
				if(event.list.length){
					var current=event.list.shift();
					player.line(current);
					current.damage(2);
					event.redo();
				}
			},
			ai:{
				order:5,
				result:{
					player:1
				},
			}
		},

		spell_liliangdaijia:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'warlock',
			filterTarget:function(card,player,target){
				return target.side==player.side&&target.isMin();
			},
			content:function(){
				target.draw(4);
				target.hp=5;
				target.maxHp=5;
				target.update();
				target.addSkill('stone_zibao');
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						if(target.skills.contains('warlock_yongsheng')) return 2;
						if(target.hp==1&&target.num('h')<=2) return 1;
						return 0;
					}
				},
			}
		},
		spell_xiaoguibaopo:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'warlock',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				'step 0'
				event.num=Math.ceil(Math.random()*3);
				target.damage(event.num);
				'step 1'
				if(player.canAddFellow()&&event.num--){
					player.addFellowAuto('stone_xiaogui');
					event.redo();
				}
			},
			ai:{
				order:6,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
				}
			}
		},
		spell_emozhinu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'warlock',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_anyinglieyan:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'warlock',
			filterTarget:function(card,player,target){
				return target.side==player.side&&target.isMin();
			},
			content:function(){
				'step 0'
				target.die({source:player});
				event.num=target.hp;
				'step 1'
				event.list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						event.list.push(game.players[i]);
					}
				}
				event.list.sort(lib.sort.seat);
				'step 2'
				if(event.list.length){
					event.list.shift().damage(event.num);
					event.redo();
				}
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					player:function(player,target){
						if(player==target) return -10;
						var list=[];
						var maxHp=0;
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isMin()&&game.players[i].side!=player.side){
								list.push(game.players[i]);
								if(game.players[i].hp>maxHp){
									maxHp=game.players[i].hp;
								}
							}
						}
						if(list.length<2) return 0;
						if(list.length==2&&target.hp>=4) return 0;
						if(target.hp>maxHp) return 1;
						return target.hp;
					}
				},
			}
		},
		spell_xishengqiyue:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:0,
			career:'warlock',
			filterTarget:function(card,player,target){
				if(!target.isMin()) return false;
				if(ui.selected.targets.length){
					return target.side!=ui.selected.targets[0].side;
				}
				return true;
			},
			selectTarget:2,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die();
				}
			},
			ai:{
				result:{
					target:function(player,target){
						if(ui.selected.targets.length&&target.hp<ui.selected.targets[0].hp){
							return 1;
						}
						return -1;
					}
				},
				order:6
			}
		},
		spell_zuzhou:{
			type:'stonecard',
			enable:true,
			stoneact:1,
			fullimage:true,
			career:'warlock',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.turnOver();
				player.draw();
			},
			ai:{
				order:6,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},

		spell_yexingchengzhang:{
			type:'stonecard',
			fullimage:true,
			chongzhu:true,
			enable:function(event,player){
				return !player.skills.contains('druid_yexingchengzhang');
			},
			stoneact:2,
			career:'druid',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.addSkill('druid_yexingchengzhang');
			},
			ai:{
				order:2,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_ziranzhili:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.canAddFellow();
			},
			stoneact:4,
			career:'druid',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				event.num=3;
				'step 1'
				if(player.canAddFellow()&&event.num--){
					player.addFellowAuto('stone_shuren');
					event.redo();
				}
			},
			ai:{
				order:6,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_yemanpaoxiao:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return !player.skills.contains('spell_yemanpaoxiao');
			},
			stoneact:2,
			career:'druid',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.addTempSkill('spell_yemanpaoxiao',{player:'phaseBegin'});
			},
			ai:{
				order:1,
				value:5,
				useful:5,
				result:{
					player:function(player){
						if(player.countFellow()>=2) return 1;
						return 0;
					}
				},
			}
		},
		spell_hengsao:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:4,
			career:'druid',
			filterTarget:function(card,player,target){
				return target.side!=player.side;
			},
			content:function(){
				'step 0'
				event.list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=target&&game.players[i].side==target.side){
						event.list.push(game.players[i]);
					}
				}
				target.damage(2);
				'step 1'
				if(event.list.length){
					event.list.shift().damage();
					event.redo();
				}
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					target:-2
				},
				tag:{
					damage:1
				}
			}
		},
		spell_wuyashenxiang:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'druid',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				player.chooseControl('法术牌','随从牌').ai=function(){
					return Math.random()<0.5?'法术牌':'随从牌';
				}
				'step 1'
				var list=[];
				var bool=(result.control=='法术牌');
				for(var i in lib.card){
					if(lib.card[i].stonehidden) continue;
					if(bool){
						if(lib.card[i].type=='stonecard'){
							list.push(i);
						}
					}
					else{
						if(lib.card[i].type=='stonecharacter'){
							list.push(i);
						}
					}
				}
				list=list.randomGets(3);
				var cards=[];
				for(var i=0;i<list.length;i++){
					cards.push(game.createCard(list[i]));
				}
				player.chooseCardButton(cards,'选择一张加入手牌',true);
				'step 2'
				player.gain(result.links,'draw');
			},
			ai:{
				order:2,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_huotigenxu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'druid',
			filterTarget:true,
			selectTarget:[0,1],
			notarget:true,
			content:function(){
				'step 0'
				if(targets.length){
					targets[0].damage();
					event.finish();
				}
				else{
					event.num=2;
				}
				'step 1'
				if(player.canAddFellow()&&event.num--){
					player.addFellowAuto('stone_shumiao');
					event.redo();
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					player:1,
					target:-1
				},
				tag:{
					damage:1
				}
			}
		},

		spell_cigu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'rogue',
			filterTarget:true,
			content:function(){
				'step 0'
				if(player.num('e')){
					player.chooseToDiscard('e','是否弃置一张装备区内的牌令伤害+1？').ai=function(card){
						return 7-ai.get.value(card);
					}
				}
				else{
					event.goto(2);
				}
				'step 1'
				if(result.bool){
					event.add=true;
				}
				'step 2'
				if(event.add){
					target.damage(2);
				}
				else{
					target.damage();
				}
				player.storage.spell_cigu=false;
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
				}
			}
		},
		spell_sijidaifa:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return !player.skills.contains('spell_sijidaifa');
			},
			stoneact:0,
			career:'rogue',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.addSkill('spell_sijidaifa');
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_daoshan:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'rogue',
			filterTarget:function(card,player,target){
				return target.side!=player.side&&target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			contentAfter:function(){
				player.drawDeck();
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_jianrenluanwu:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.get('e','1')?true:false;
			},
			stoneact:2,
			career:'rogue',
			filterTarget:function(card,player,target){
				return target.side!=player.side;
			},
			selectTarget:-1,
			contentBefore:function(){
				player.discard(player.get('e','1'));
			},
			content:function(){
				if(typeof player.storage.spell_modaoyou=='number'){
					target.damage(player.storage.spell_modaoyou+1);
				}
				else{
					target.damage();
				}
				player.unmarkSkill('spell_modaoyou');
			},
			contentAfter:function(){
				player.storage.spell_modaoyou=0;
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_cisha:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'rogue',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.die({source:player});
			},
			ai:{
				order:8.8,
				value:5,
				useful:5,
				result:{
					target:-100
				},
			}
		},
		spell_modaoyou:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'rogue',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.markSkill('spell_modaoyou');
				if(typeof player.storage.spell_modaoyou!='number'){
					player.storage.spell_modaoyou=1;
				}
				else{
					player.storage.spell_modaoyou++;
				}
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side==player.side){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					game.asyncDraw([player,list.randomGet()],2);
				}
				else{
					player.draw(2);
				}
			},
			ai:{
				order:1,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},

		spell_fengxian:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'paladin',
			filterTarget:function(card,player,target){
				return target.side!=player.side;
			},
			selectTarget:-1,
			content:function(){
				target.damage();
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_fuchouzhinu:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.getEnemy().countFellow()>0;
			},
			stoneact:4,
			career:'paladin',
			filterTarget:function(card,player,target){
				return target.side!=player.side&&target.isMin();
			},
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				'step 0'
				var map=[];
				for(var i=0;i<targets.length;i++){
					map.push(0);
				}
				for(var i=0;i<5;i++){
					map[Math.floor(Math.random()*map.length)]++;
				}
				event.num=0;
				event.map=map;
				'step 1'
				if(event.num<targets.length){
					if(event.map[event.num]){
						targets[event.num].damage(event.map[event.num]);
					}
					event.num++;
					event.redo();
				}
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
				}
			}
		},
		spell_liliangzhufu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'paladin',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.draw(2);
			},
			ai:{
				order:6,
				value:5,
				useful:5,
				result:{
					target:1
				},
			}
		},
		spell_shengliaoshu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'paladin',
			filterTarget:true,
			content:function(){
				target.recover(2);
				target.draw(2);
			},
			ai:{
				order:4,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return 1+target.maxHp-target.hp;
					}
				},
			}
		},
		spell_zuozhandongyuan:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.canAddFellow();
			},
			stoneact:3,
			career:'paladin',
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return player==target;
			},
			content:function(){
				'step 0'
				if(player.canAddFellow()){
					player.addFellowAuto('stone_xinbing');
				}
				'step 1'
				if(player.canAddFellow()){
					player.addFellowAuto('stone_xinbing');
				}
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_fennuzhichui:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'paladin',
			filterTarget:true,
			content:function(){
				target.damage();
				player.drawDeck();
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
				}
			}
		},

		spell_lianhuanbaolie:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'shaman',
			filterTarget:true,
			content:function(){
				target.damage(Math.ceil(Math.random()*2),'thunder');
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					natureDamage:1,
					thunderDamage:1
				}
			}
		},
		spell_shandianfengbao:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'shaman',
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			selectTarget:-1,
			content:function(){
				target.damage(Math.ceil(Math.random()*2),'thunder');
			},
			ai:{
				order:9,
				useful:5,
				value:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					natureDamage:1,
					thunderDamage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_yaoshu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'shaman',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.clearSkills();
				target.init('stone_qingwa');
				target.noPhaseDelay=true;
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				},
			}
		},
		spell_shixue:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:4,
			career:'shaman',
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side==player.side;
			},
			multitarget:true,
			multiline:true,
			content:function(){
				game.asyncDraw(targets,2);
			},
			ai:{
				order:5,
				value:5,
				useful:5,
				result:{
					target:2
				},
				tag:{
					multitarget:1
				}
			}
		},
		spell_yexinglanghun:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.canAddFellow();
			},
			stoneact:4,
			career:'shaman',
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return player==target;
			},
			content:function(){
				'step 0'
				if(player.canAddFellow()){
					player.addFellowAuto('stone_youlinglang');
				}
				'step 1'
				if(player.canAddFellow()){
					player.addFellowAuto('stone_youlinglang');
				}
			},
			ai:{
				order:9,
				value:5,
				useful:5,
				result:{
					player:1
				},
			}
		},
		spell_chazhuangshandian:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						return true;
					}
				}
				return false;
			},
			stoneact:2,
			career:'shaman',
			filterTarget:function(card,player,target){
				return player==target;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					list=list.randomGets(2);
					list.sort(lib.sort.seat);
				}
				event.list=list;
				'step 1'
				if(event.list.length){
					var current=event.list.shift();
					player.line(current,'thunder');
					current.damage('thunder');
					event.redo();
				}
			},
			ai:{
				order:5,
				result:{
					player:1
				},
			}
		},

		spell_hanbingjian:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			career:'mage',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				'step 0'
				target.damage(2);
				'step 1'
				if(target.isAlive()&&!target.isTurnedOver()){
					target.turnOver();
				}
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-1
				},
				tag:{
					damage:2,
				}
			}
		},
		spell_huoqiushu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			career:'mage',
			filterTarget:true,
			content:function(){
				target.damage(2,'fire');
			},
			ai:{
				order:8,
				value:5,
				useful:5,
				result:{
					target:-2
				},
				tag:{
					damage:2,
					natureDamage:2,
					fireDamage:2,
				}
			}
		},
		spell_lieyanfengbao:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:5,
			career:'mage',
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			selectTarget:-1,
			content:function(){
				target.damage(2);
			},
			ai:{
				order:9,
				useful:5,
				value:5,
				result:{
					target:-2
				},
				tag:{
					damage:2,
					multitarget:1,
					multineg:1,
				}
			}
		},
		spell_bianxingshu:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'mage',
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.clearSkills();
				target.init('stone_mianyang');
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				},
			}
		},
		spell_aoshuzhihui:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:1,
			career:'mage',
			filterTarget:function(card,player,target){
				return target==player;
			},
			selectTarget:-1,
			content:function(){
				player.drawDeck(2);
			},
			ai:{
				order:0.5,
				result:{
					player:1
				}
			}
		},
		spell_baofengxue:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:4,
			career:'mage',
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			selectTarget:-1,
			content:function(){
				'step 0'
				target.damage();
				'step 1'
				if(target.isAlive()){
					target.turnOver();
				}
			},
			ai:{
				order:9,
				useful:5,
				value:5,
				result:{
					target:-1.5
				},
				tag:{
					damage:1,
					multitarget:1,
					multineg:1,
				}
			}
		},

		spell_chenmo:{
			type:'stonecard',
			enable:true,
			stoneact:2,
			fullimage:true,
			filterTarget:function(card,player,target){
				return target.isMin()&&(target.maxHp>1||target.num('he')>0);
			},
			content:function(){
				"step 0"
				target.discard(target.get('he'));
				"step 1"
				if(target.maxHp>1){
					target.loseMaxHp(target.maxHp-1);
				}
			},
			ai:{
				result:{
					target:function(player,target){
						return 1-target.hp-target.num('h')/2;
					}
				},
				order:7
			}
		},
		spell_morizaihuo:{
			fullimage:true,
			type:'stonecard',
			enable:true,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			multiline:true,
			multitarget:true,
			content:function(){
				'step 0'
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].die()._triggered=null;
				}
				ui.clear();
				'step 1'
				player.recover(2)
			},
			stoneact:5,
			ai:{
				order:9,
				result:{
					target:-1,
					player:function(player){
						if(player.hp<player.maxHp) return 1;
						return 0;
					}
				}
			}
		},
		spell_shengerpingdeng:{
			fullimage:true,
			type:'stonecard',
			enable:true,
			stoneact:2,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.maxHp>1;
			},
			selectTarget:-1,
			content:function(){
				target.loseMaxHp(target.maxHp-1);
			},
			ai:{
				order:9.1,
				result:{
					target:function(player,target){
						if(target.hp>1) return -1;
						if(target.maxHp>1) return -0.1;
						return 0;
					}
				}
			}
		},
		spell_jingshenkongzhi:{
			fullimage:true,
			type:'stonecard',
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:5,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
			},
			ai:{
				order:9.5,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		spell_anyingkuangluan:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				if(player.isMin()) return false;
				return player.canAddFellow();
			},
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side!=player.side;
			},
			content:function(){
				target.getLeader().removeFellow(target);
				target.side=player.side;
				player.addFellow(target);
				target.addSkill('spell_anyingkuangluan_die');
			},
			ai:{
				order:9.5,
				result:{
					target:function(player,target){
						return -target.hp;
					}
				}
			}
		},
		spell_binghuan:{
			fullimage:true,
			type:'stonecard',
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			selectTarget:-1,
			content:function(){
				target.turnOver();
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						if(target.isTurnedOver()) return 1;
						return -1;
					}
				}
			}
		},
		spell_zhiliaozhichu:{
			fullimage:true,
			type:'stonecard',
			enable:true,
			stoneact:1,
			filterTarget:function(card,player,target){
				return target.isMin()&&target.side==player.side&&
				(!target.skills.contains('chaofeng')||target.hp<target.maxHp);
			},
			content:function(){
				if(target.hp<target.maxHp){
					target.recover(target.maxHp-target.hp);
				}
				target.addSkill('chaofeng');
				target.markSkill('chaofeng');
				game.log(target,'获得了嘲讽');
				target.popup('嘲讽');
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return target.maxHp-target.hp;
					}
				}
			}
		},
		spell_wangzhezhufu:{
			fullimage:true,
			type:'stonecard',
			enable:true,
			stoneact:4,
			filterTarget:function(card,player,target){
				return target.isMin();
			},
			content:function(){
				target.gainMaxHp(2);
				target.recover(2);
				target.draw(2);
			},
			ai:{
				order:7,
				result:{
					target:function(player,target){
						return Math.max(1,10-target.hp);
					}
				}
			}
		},
		spell_diyulieyan:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			filterTarget:true,
			selectTarget:-1,
			multitarget:true,
			multiline:true,
			content:function(){
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].loseHp();
				}
				ui.clear();
			},
			ai:{
				order:9,
				result:{
					target:-1
				}
			}
		},
		spell_zhiliaoshui:{
			type:'stonecard',
			fullimage:true,
			enable:function(event,player){
				return player.hp<player.maxHp;
			},
			savable:true,
			stoneact:2,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player;
			},
			content:function(){
				if(target==_status.dying){
					target.recover();
				}
				else{
					target.recover(2);
				}
			},
			ai:{
				order:8,
				value:6,
				useful:6,
				result:{
					target:1
				}
			}
		},
		spell_yanmie:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:3,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player.getEnemy();
			},
			content:function(){
				"step 0"
				var targets=[player,target];
				event.cards=[targets[0].get('e'),targets[1].get('e')];
				targets[0].lose(event.cards[0],ui.special);
				targets[1].lose(event.cards[1],ui.special);
				if(event.cards[0].length) targets[0].$give(event.cards[0],targets[1]);
				if(event.cards[1].length) targets[1].$give(event.cards[1],targets[0]);
				"step 1"
				var targets=[player,target];
				for(var i=0;i<event.cards[1].length;i++){
					targets[0].equip(event.cards[1][i]);
				}
				for(var i=0;i<event.cards[0].length;i++){
					targets[1].equip(event.cards[0][i]);
				}
				"step 2"
				var dh=target.num('h')-player.num('h');
				if(dh>0){
					player.draw(dh);
				}
			},
			ai:{
				order:7,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						var ne1=target.num('e'),ne2=player.num('e');
						var nh1=target.num('h'),nh2=player.num('h');
						if(nh1<nh2) nh1=nh2;
						if(ne2-ne1<nh1-nh2+ne1-ne2) return -1;
						return 0;
					}
				}
			}
		},
		spell_xiaoshi:{
			type:'stonecard',
			fullimage:true,
			enable:true,
			stoneact:2,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target==player.getEnemy();
			},
			content:function(){
				'step 0'
				target.gain(target.get('e'),'gain2');
				'step 1'
				var dh=target.num('h')-player.num('h');
				if(dh>0){
					target.discard(target.get('h').randomGets(dh));
				}
			},
			ai:{
				order:1,
				value:5,
				useful:5,
				result:{
					target:function(player,target){
						if(target.num('he')>=player.num('h')) return -1;
						return 0;
					}
				}
			}
		},
	},
	skill:{
		spell_modaoyou:{
			intro:{
				content:function(storage){
					return '下次剑刃乱舞的伤害+'+storage;
				}
			}
		},
		hunter_jiewang2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.player.skills.contains('hunter_jiewang');
			},
			content:function(){
				var list=[];
				for(var i in lib.card){
					if(lib.card[i].stonehidden) continue;
					if(lib.card[i].type=='stonecharacter'){
						list.push(i);
					}
				}
				player.gain(game.createCard(list.randomGet()),'draw');
				player.removeSkill('hunter_jiewang2');
			}
		},
		hunter_zidanshangtang:{
			trigger:{player:'useCard'},
			forced:true,
			mark:true,
			intro:{
				content:'每当你使用一张法术牌，便随机获得一张猎人职业法术牌'
			},
			filter:function(event){
				return get.type(event.card)=='stonecard';
			},
			content:function(){
				var list=['spell_lierenyinji','spell_guanmenfanggou','spell_duochongsheji','spell_kuaisusheji','spell_zhaohuanchongwu'];
				player.gain(game.createCard(list.randomGet()),'draw');
			}
		},
		spell_yemanpaoxiao:{
			mark:true,
			intro:{
				content:'友方角色造成的伤害+1'
			},
			global:'spell_yemanpaoxiao2'
		},
		spell_yemanpaoxiao2:{
			trigger:{source:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return player.getLeader().skills.contains('spell_yemanpaoxiao')&&event.notLink();
			},
			content:function(){
				trigger.num++;
			}
		},
		stone_zibao:{
			trigger:{player:'phaseAfter'},
			forced:true,
			content:function(){
				player.die();
			}
		},
		spell_sijidaifa:{
			trigger:{player:'useCard'},
			forced:true,
			filter:function(event,player){
				return get.type(event.card)=='stonecard';
			},
			mark:true,
			intro:{
				content:'使用下一张法术牌时获得X点行动值，X为该法术的行动值消耗且不超过3'
			},
			content:function(){
				var num=lib.card[trigger.card.name].stoneact;
				if(num>3) num=3;
				player.actused-=num;
				player.updateActCount();
				player.removeSkill('spell_sijidaifa');
			}
		},
		shaman_qingwa:{
			trigger:{player:'phaseDrawBefore'},
			forced:true,
			unique:true,
			popup:false,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		mage_mianyang:{
			mod:{
				cardEnabled:function(card){
					if(card.name=='sha') return false;
				}
			}
		},
		priest_xundao:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getLeader().num('h',{type:'stonecharacter'})>0;
			},
			content:function(){
				player.draw();
				player.addSkill('chaofeng');
			}
		},
		priest_guangyao:{
			trigger:{player:'changeHp'},
			forced:true,
			unique:true,
			filter:function(event){
				return event.num!=0;
			},
			content:function(){
				player.draw(Math.abs(trigger.num));
			},
		},
		priest_zhufu:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&
					game.players[i].side==player.side&&game.players[i]!=player){
						return true;
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&
					game.players[i].side==player.side&&game.players[i]!=player){
						list.push(game.players[i]);
					}
				}
				var target=list.randomGet();
				player.line(target,'green');
				target.gainMaxHp();
				target.recover();
			}
		},
		priest_hunwu:{},
		priest_faxian:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				'step 0'
				var list=[];
				for(var i in lib.card){
					if(lib.card[i].stonehidden) continue;
					if(lib.card[i].type=='stonecharacter'){
						list.push(i);
					}
				}
				list=list.randomGets(3);
				var cards=[];
				for(var i=0;i<list.length;i++){
					cards.push(game.createCard(list[i]));
				}
				player.getLeader().chooseCardButton(cards,'选择一个随从加入手牌',true);
				'step 1'
				player.getLeader().gain(result.links,'draw');
			}
		},
		priest_shengliao:{
			trigger:{global:'recoverEnd'},
			forced:true,
			unique:true,
			filter:function(event){
				return event.player.isMin();
			},
			content:function(){
				player.getLeader().drawDeck();
			}
		},
		priest_shengguang:{
			trigger:{global:'recoverEnd'},
			forced:true,
			unique:true,
			filter:function(event){
				return event.player.isMin();
			},
			content:function(){
				player.draw();
			}
		},
		rogue_cisha:{
			trigger:{source:'damageEnd'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return event.player.isAlive()&&event.player.isMin();
			},
			content:function(){
				trigger.player.die({source:player});
			}
		},
		rogue_touxi:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				var target=player.getLeader();
				return target.num('e')>0;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseCardTarget({
					position:'e',
					filterTarget:function(card,player,target){
						return player.side!=target.side;
					},
					filterCard:true,
					ai1:function(card){
						return 9-ai.get.value(card);
					},
					ai2:function(target){
						return ai.get.damageEffect(target,player,player);
					},
					prompt:'偷袭：弃置一张装备区内的牌并对一名敌方角色一点伤害'
				});
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.discard(result.cards);
					event.chooser.line(result.targets[0]);
					result.targets[0].damage(event.chooser);
				}
			}
		},
		rogue_qiancang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side&&
					game.players[i].hp==game.players[i].maxHp){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side&&
					game.players[i].hp==game.players[i].maxHp){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				event.list=list;
				"step 1"
				if(event.list.length){
					var current=event.list.shift();
					current.damage();
					player.line(current,'green');
					event.redo();
				}
			}
		},
		rogue_xunbao:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('rogue_xunbao2');
			}
		},
		rogue_xunbao2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.player.skills.contains('rogue_xunbao');
			},
			content:function(){
				player.gain(game.createCard('spell_sijidaifa'),'draw2');
				player.removeSkill('rogue_xunbao2');
			}
		},
		rogue_touqie:{
			trigger:{source:'damageEnd'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().drawDeck();
			}
		},
		rogue_zhaomu:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getLeader().canAddFellow();
			},
			content:function(){
				'step 0'
				player.getLeader().addFellowAuto('stone_haidao');
				'step 1'
				player.line(result,'green');
			}
		},
		warrior_zhujia:{
			trigger:{player:'damageEnd'},
			forced:true,
			unique:true,
			content:function(){
				var leader=player.getLeader();
				leader.changeHujia();
			}
		},
		warrior_tidun:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var leader=player.getLeader();
				leader.changeHujia(2);
			}
		},
		warrior_tongling:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&
						game.players[i].side==player.side&&game.players[i].isTurnedOver()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&
						game.players[i].side==player.side&&game.players[i].isTurnedOver()){
						game.players[i].turnOver();
						player.line(game.players[i],'green');
					}
				}
			}
		},
		warrior_baoluan:{
			trigger:{global:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.player.isMin();
			},
			content:function(){
				player.draw();
			}
		},
		warrior_jiangong:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('监工：对一名随从造成一点伤害然后令其摸两张牌',function(card,playerx,target){
					return player!=target&&target.isMin();
				}).ai=function(target){
					var att=ai.get.attitude(event.chooser,target);
					if(target.hp==1) return -att;
					if(target.hp==2) return 0;
					return att;
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].damage(event.chooser);
					result.targets[0].draw(2);
				}
			}
		},
		warlock_yuhuo:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						list.push(game.players[i]);
					}
				}
				list.sort(lib.sort.seat);
				event.list=list;
				"step 1"
				if(event.list.length){
					var current=event.list.shift();
					current.damage();
					player.line(current,'green');
					event.redo();
				}
			}
		},
		warlock_zaihuo:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.classList.remove('turnedover');
				var target=player.getLeader();
				var hs=target.get('h');
				if(hs.length){
					target.discard(hs.randomGets(2));
				}
			}
		},
		warlock_yongsheng:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('warlock_yongsheng2');
			},
			ai:{
				threaten:0.1
			}
		},
		warlock_yongsheng2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.player.skills.contains('warlock_yongsheng');
			},
			content:function(){
				game.delay();
				player.addFellowAuto('stone_kongjuzhanma');
				player.removeSkill('warlock_yongsheng2');
			}
		},
		warlock_zhaogui:{
			trigger:{player:'damageEnd'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getLeader().canAddFellow();
			},
			content:function(){
				player.getLeader().addFellowAuto('stone_xiaogui');
			}
		},
		warlock_nonghuo:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var target=player.getLeader();
				target.damage('fire');
				player.line(target,'green');
				game.delay();
			}
		},
		paladin_zhaohuan:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('paladin_zhaohuan2');
			}
		},
		paladin_zhaohuan2:{
			trigger:{player:'useCard'},
			forced:true,
			mark:true,
			intro:{
				content:'使用下一张随从牌时，获得一点行动值'
			},
			filter:function(event,player){
				return get.type(event.card)=='stonecharacter';
			},
			content:function(){
				player.actused--;
				player.updateActCount();
				player.removeSkill('paladin_zhaohuan2');
			}
		},
		paladin_shouwei:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				var leader=player.getLeader();
				return leader.hp<leader.maxHp;
			},
			content:function(){
				var leader=player.getLeader();
				leader.recover(2);
			}
		},
		paladin_chidun:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()&&
						game.players[i].num('he')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('持盾：弃置对方一名随从的所有牌',function(card,playerx,target){
					return player.side!=target.side&&target.isMin()&&target.num('he')>0;
				}).ai=function(target){
					return target.num('he');
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].discard(result.targets[0].get('he'));
				}
			}
		},
		paladin_zhaochao:{
			trigger:{global:'useSkillAfter'},
			forced:true,
			filter:function(event,player){
				return event.career&&event.player.side==player.side;
			},
			content:function(){
				player.draw(2);
			}
		},
		paladin_buji:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].name=='stone_xinbing'&&game.players[i].side==player.side){
						return true;
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].name=='stone_xinbing'&&game.players[i].side==player.side){
						list.push(game.players[i]);
					}
				}
				for(var i=0;i<list.length;i++){
					list[i].gainMaxHp();
					list[i].recover();
				}
				game.asyncDraw(list,2);
				player.line(list,'green');
			}
		},
		paladin_hudun:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.changeHujia();
			}
		},
		mage_shifa:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side&&
						game.players[i]!=player) return true;
				}
				return false;
			},
			content:function(){
				var target1=player.getLeader();
				var target2=player.getEnemy();
				var list=[];
				for(var i in lib.card){
					if(lib.card[i].stonehidden) continue;
					if(lib.card[i].type=='stonecard'){
						list.push(i);
					}
				}
				target1.gain(game.createCard(list.randomGet()));
				target2.gain(game.createCard(list.randomGet()));
				target1.$draw();
				target2.$draw();
				game.delay();
			}
		},
		mage_minghuo:{
			trigger:{global:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.source&&event.source==player.getLeader()&&event.parent.name=='_mage_skill';
			},
			content:function(){
				trigger.num++;
			}
		},
		mage_tunfa:{
			trigger:{global:'useCard'},
			forced:true,
			filter:function(event,player){
				return get.type(event.card)=='stonecard'&&event.player==player.getLeader();
			},
			content:function(){
				player.draw();
			}
		},
		mage_lieyan:{
			trigger:{global:'useCardAfter'},
			forced:true,
			filter:function(event,player){
				return get.type(event.card)=='stonecard'&&event.player==player.getLeader();
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side){
						list.push(game.players[i]);
					}
				}
				var target=list.randomGet();
				player.line(target,'fire');
				target.damage('fire');
				game.delay();
			},
			ai:{
				threaten:1.3
			}
		},
		mage_zhufa:{
			trigger:{global:'useCard'},
			forced:true,
			filter:function(event,player){
				return get.type(event.card)=='stonecard'&&event.player==player.getLeader();
			},
			content:function(){
				trigger.player.actused--;
				trigger.player.updateActCount();
			}
		},
		mage_bingdong:{
			trigger:{source:'damageEnd'},
			forced:true,
			filter:function(event,player){
				return event.player.isMin()&&event.player!=player&&!event.player.isTurnedOver();
			},
			content:function(){
				trigger.player.turnOver();
			}
		},
		hunter_xunshou:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side&&
						game.players[i]!=player) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('驯兽：选择己方一名随从增加一点体力上限，回复一点体力并摸两张牌',function(card,playerx,target){
					return player!=target&&player.side==target.side&&target.isMin();
				}).ai=function(target){
					return ai.get.attitude(event.chooser,target);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					result.targets[0].gainMaxHp();
					result.targets[0].recover();
					result.targets[0].draw(2);
				}
			}
		},
		hunter_jiewang:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('hunter_jiewang2');
			}
		},
		hunter_zhanhuo:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&game.players[i].side==player.side){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				game.asyncDraw(targets);
			}
		},
		stone_zhiyu:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&
					game.players[i].side==player.side&&game.players[i].hp<game.players[i].maxHp){
						game.players[i].recover();
					}
				}
			}
		},
		hunter_nuhou:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side){
						game.players[i].addSkill('hunter_nuhou2');
					}
				}
			}
		},
		hunter_nuhou2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('hunter_nuhou2');
			},
			content:function(){
				player.damage('nosource');
				player.removeSkill('hunter_nuhou2');
			}
		},
		stone_chongfeng:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.classList.remove('turnedover');
			}
		},
		druid_nuhuo:{
			trigger:{global:'useSkillAfter'},
			forced:true,
			filter:function(event,player){
				return event.career&&event.player.side==player.side;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side){
						list.push(game.players[i]);
					}
				}
				var target=list.randomGet();
				player.line(target,'green');
				target.damage();
				game.delay();
			},
			ai:{
				threaten:1.5
			}
		},
		druid_huwei:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('护卫：对一名对方随从造成一点伤害或弃置其所有牌并将其体力上限改为1',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.target=result.targets[0];
					event.chooser.chooseControl('造成伤害','discard_card').ai=function(){
						if(event.target.hp>1) return 'discard_card';
						return '造成伤害';
					};
					event.chooser.line(event.target);
					game.delay();
				}
				else{
					event.finish();
				}
				"step 2"
				if(result.control=='造成伤害'){
					event.target.damage(event.chooser);
				}
				else{
					event.target.discard(event.target.get('h'));
					if(event.target.maxHp>1){
						event.target.loseMaxHp(event.target.maxHp-1);
					}
				}
			}
		},
		druid_yexingchengzhang:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			mark:true,
			intro:{
				content:'下个出牌阶段开始时获得三点额外行动值',
			},
			content:function(){
				player.actused-=3;
				player.updateActCount();
				player.removeSkill('druid_yexingchengzhang');
			}
		},
		druid_chengzhang:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var target=player.getLeader();
				target.actused--;
				target.updateActCount();
			},
			group:'druid_chengzhang2'
		},
		druid_chengzhang2:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('druid_chengzhang3');
			}
		},
		druid_chengzhang3:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return event.player.skills.contains('druid_chengzhang');
			},
			content:function(){
				if(player.num('h')){
					game.delay();
					player.chooseToDiscard('h',true);
				}
				player.removeSkill('druid_chengzhang3');
			}
		},
		shaman_xueju:{
			trigger:{global:'useCard'},
			forced:true,
			filter:function(event,player){
				return get.type(event.card)=='stonecharacter'&&event.player==player.getLeader();
			},
			content:function(){
				player.draw();
			}
		},
		shaman_huoxi:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('火袭：对一名对方随从造成两点伤害',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].damage(2,'fire',event.chooser);
				}
			}
		},
		shaman_fachao:{
			trigger:{global:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				return event.player.career&&player.side==event.player.side;
			},
			content:function(){
				trigger.player.drawDeck();
				trigger.player.recover();
			}
		},
		shaman_jili:{
			trigger:{global:'phaseEnd'},
			forced:true,
			filter:function(event,player){
				if(event.player.career&&player.side==event.player.side){
					for(var i=0;i<game.players.length;i++){
						if(!game.players[i].career&&game.players[i].skills.contains('shaman_tuteng')&&
						game.players[i].side==player.side){
							return true;
						}
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(!game.players[i].career&&game.players[i].skills.contains('shaman_tuteng')&&
					game.players[i].side==player.side){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					game.asyncDraw(list);
				}
			}
		},
		shaman_huoshe:{
			trigger:{global:'damageBegin'},
			forced:true,
			filter:function(event,player){
				return event.source&&event.source!=player&&player.side==event.source.side&&event.notLink();
			},
			content:function(){
				trigger.num++
			},
			ai:{
				threaten:1.8
			}
		},
		_priest_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='priest') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			prompt:function(event){
				if(event.player.hasFellowSkill('priest_hunwu')) return '令目标流失一点体力';
				return '回复一点体力';
			},
			filterTarget:function(card,player,target){
				if(player.hasFellowSkill('priest_hunwu')) return true;
				return target.hp<target.maxHp;
			},
			content:function(){
				player.actused+=2;
				player.updateActCount();
				event.parent.career='priest';
				if(player.hasFellowSkill('priest_hunwu')){
					target.loseHp();
				}
				else{
					target.recover();
				}
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						if(player.hasFellowSkill('priest_hunwu')){
							return -1;
						}
						return ai.get.recoverEffect(target,player,target);
					}
				}
			}
		},
		_mage_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='mage') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			line:'fire',
			filterTarget:function(card,player,target){
				return !target.career;
			},
			content:function(){
				player.actused+=2;
				player.updateActCount();
				target.damage('fire');
				event.parent.career='mage';
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target,'fire');
					}
				}
			}
		},
		_warlock_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='warlock') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.drawDeck(2);
				event.parent.career='warlock';
			},
			ai:{
				order:0.5,
				result:{
					player:1
				}
			}
		},
		_hunter_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='hunter') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			selectTarget:-1,
			filterTarget:function(card,player,target){
				return target.career&&target.side!=player.side;
			},
			content:function(){
				player.actused+=2;
				player.updateActCount();
				target.damage();
				event.parent.career='hunter';
			},
			ai:{
				order:2,
				result:{
					target:function(player,target){
						return ai.get.damageEffect(target,player,target);
					}
				}
			}
		},
		_warrior_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.hujia>=5) return false;
				if(player.career!='warrior') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.changeHujia(1);
				event.parent.career='warrior';
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		_rogue_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='rogue') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				'step 0'
				player.actused+=2;
				player.updateActCount();
				var equip1=get.cardPile(function(card){
					return get.subtype(card)=='equip1';
				});
				if(!equip1){
					equip1=game.createCard('qingnang');
				}
				var equip4=get.cardPile(function(card){
					return get.type(card)=='equip'&&get.subtype(card)!='equip1';
				});
				if(!equip4){
					equip4=game.createCard('chitu');
				}
				player.$gain(equip1);
				setTimeout(function(){
					player.$gain(equip4);
				},250);
				game.delay();
				event.equip1=equip1;
				event.equip4=equip4;
				'step 1'
				player.equip(event.equip1);
				game.delay(0.5);
				'step 2'
				player.equip(event.equip4);
				event.parent.career='rogue';
			},
			ai:{
				order:function(skill,player){
					if(!player.get('e','1')&&player.num('e')<2){
						if(player.num('h','sha')&&player.getActCount()+3<=player.actcount){
							return 4;
						}
						return 0.1;
					}
					return 0;
				},
				result:{
					player:function(player){
						if(player.num('e')<=2) return 1;
						return 0;
					}
				}
			}
		},
		_druid_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='druid') return false;
				if(player.getActCount()+2>player.actcount) return false;
				return player.num('he')>0&&lib.filter.cardEnabled({name:'sha'},player);
			},
			usable:1,
			filterTarget:function(card,player,target){
				return player.canUse('sha',target,null,false);
			},
			direct:true,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.useCard({name:'sha'},targets,'_druid_skill',false).animate=false;
				event.parent.career='druid';
			},
			ai:{
				order:function(){
					return lib.card.sha.ai.order-0.1;
				},
				result:{
					target:function(player,target){
						return ai.get.effect(target,{name:'sha'},player,target);
					}
				}
			}
		},
		shaman_tuteng:{
			trigger:{player:'phaseDrawBefore'},
			forced:true,
			popup:false,
			content:function(){
				trigger.untrigger();
				trigger.finish();
			}
		},
		shaman_zhiliao:{
			trigger:{global:'phaseEnd'},
			forced:true,
			direct:true,
			filter:function(event,player){
				return event.player==player.getLeader();
			},
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side==player.side&&!players[i].career&&players[i].hp<players[i].maxHp){
						targets.push(players[i]);
						players[i].recover();
					}
				}
				if(targets.length){
					player.logSkill('shaman_zhiliao');
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			},
			ai:{
				threaten:2
			}
		},
		shaman_fali:{
			trigger:{global:'phaseEnd'},
			forced:true,
			direct:true,
			filter:function(event,player){
				return event.player==player.getLeader();
			},
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side==player.side&&!players[i].career&&players[i].num('h')<=1){
						targets.push(players[i]);
					}
				}
				if(targets.length){
					game.asyncDraw(targets);
					player.logSkill('shaman_fali');
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			}
		},
		shaman_zhuore:{
			trigger:{global:'phaseEnd'},
			forced:true,
			direct:true,
			filter:function(event,player){
				return event.player==player.getLeader();
			},
			content:function(){
				'step 0'
				var players=get.players();
				var targets=[];
				for(var i=0;i<players.length;i++){
					if(players[i].side!=player.side&&!players[i].career){
						targets.push(players[i]);
					}
				}
				if(targets.length){
					var target=targets.randomGet();
					player.logSkill('shaman_zhuore',target);
					target.damage();
				}
				else{
					event.finish();
				}
				'step 1'
				game.delay();
			}
		},
		_shaman_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='shaman') return false;
				if(!player.canAddFellow()) return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				var name='stone_tuteng'+Math.ceil(Math.random()*4);
				player.addFellowAuto(name);
				event.parent.career='shaman';
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		_paladin_skill:{
			enable:'phaseUse',
			filter:function(event,player){
				if(player.career!='paladin') return false;
				if(!player.canAddFellow()) return false;
				if(player.getActCount()+2>player.actcount) return false;
				return true;
			},
			usable:1,
			content:function(){
				player.actused+=2;
				player.updateActCount();
				player.addFellowAuto('stone_xinbing');
				event.parent.career='paladin';
			},
			ai:{
				order:2,
				result:{
					player:1
				}
			}
		},
		chaofeng:{
			mark:true,
			intro:{
				content:'已获得嘲讽'
			}
		},
		_chaofeng:{
			mod:{
				targetEnabled:function(card,player,target){
					if(target.skills.contains('chaofeng')) return;
					if(card.name=='sha'||card.name=='juedou'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].side==target.side&&game.players[i].skills.contains('chaofeng')){
								return false;
							}
						}
					}
				}
			}
		},
		spell_anyingkuangluan_die:{
			trigger:{player:'phaseAfter'},
			forced:true,
			unique:true,
			content:function(){
				player.die();
			}
		},
		stone_juxingchanchu1:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('毒液：令一名敌方随从失去一点体力',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].addSkill('stone_juxingchanchu2');
				}
			}
		},
		stone_juxingchanchu2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_juxingchanchu2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_juxingchanchu2');
			}
		},
		stone_shishigui1:{
			trigger:{player:'dieBegin'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i]!=player&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						game.players[i].addSkill('stone_shishigui2');
					}
				}
			}
		},
		stone_shishigui2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_shishigui2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_shishigui2');
			}
		},
		stone_fennuxiaoji1:{
			trigger:{player:'phaseBegin'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw(2);
			}
		},
		stone_fatiaozhuru1:{
			trigger:{player:'phaseEnd'},
			filter:function(event,player){
				return player.num('h')==0;
			},
			content:function(){
				player.draw(2);
			}
		},
		stone_qianxing:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addTempSkill('stone_qianxing2',{player:'phaseBegin'});
			}
		},
		stone_qianxing2:{
			mod:{
				targetEnabled:function(){
					return false;
				}
			}
		},
		stone_kutongsiseng1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addSkill('stone_kutongsiseng2');
			}
		},
		stone_kutongsiseng2:{
			trigger:{player:'phaseEnd'},
			forced:true,
			content:function(){
				player.draw();
				player.removeSkill('stone_kutongsiseng2');
			}
		},
		stone_yuanguanying1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('暗影：选择敌方一名角色视为对其使用一张杀',function(card,player,target){
					return lib.filter.targetEnabled({name:'sha'},event.chooser,target);
				}).ai=function(target){
					return ai.get.effect(target,{name:'sha'},event.chooser);
				}
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.useCard({name:'sha'},result.targets,false);
				}

			}
		},
		stone_zhucangzhe1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==player.side&&
						game.players[i]!=player) return true;
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('发明：选择己方一名角色摸一张牌',function(card,playerx,target){
					return player!=target&&player.side==target.side;
				}).ai=function(target){
					return ai.get.attitude(event.chooser,target);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					result.targets[0].draw();
				}
			}
		},
		stone_zhongshi1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()&&
						game.players[i].num('he')){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('叫嚣：弃置对方一名随从的所有牌',function(card,playerx,target){
					return player.side!=target.side&&target.isMin()&&target.num('he')>0;
				}).ai=function(target){
					return target.num('he');
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].discard(result.targets[0].get('he'));
				}
			}
		},
		stone_huoqiangshou1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side!=player.side&&
						game.players[i].isMin()){
						return true;
					}
				}
				return false;
			},
			content:function(){
				"step 0"
				event.chooser=player.getLeader();
				event.chooser.chooseTarget('火枪：对一名对方随从造成一点伤害',function(card,playerx,target){
					return player.side!=target.side&&target.isMin();
				}).ai=function(target){
					return Math.max(1,10-target.hp);
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].damage(event.chooser);
				}
			}
		},
		stone_dijieshicong1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().num('e')>0;
			},
			content:function(){
				var enemy=player.getEnemy();
				var es=enemy.get('e');
				if(es.length){
					player.getLeader().line(enemy);
					game.delay();
					enemy.discard(es.randomGet());
					// game.log(get.translation(event.enemy)+'将'+get.translation(es)+'收入手牌')
				}
			}
		},
		stone_yaosaishouwei1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().addTempSkill('stone_yaosaishouwei2','phaseAfter');
			}
		},
		stone_yaosaishouwei2:{
			mod:{
				maxHandcard:function(player,num){
					return num+2;
				}
			},
		},
		stone_famingjia1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.getLeader().draw(2);
			}
		},
		stone_chilundashi1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				player.addSkill('stone_chilundashi2');
			}
		},
		stone_chilundashi2:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			content:function(){
				trigger.num++;
				player.removeSkill('stone_chilundashi2');
			}
		},
		stone_hanguangzhizhe1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				game.asyncDraw(targets);
			}
		},
		stone_aihaozhihun1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			content:function(){
				var targets=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						targets.push(game.players[i]);
					}
				}
				targets.sort(lib.sort.seat);
				for(var i=0;i<targets.length;i++){
					targets[i].discard(targets[i].get('he'));
				}
			}
		},
		stone_yanjingshe1:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				var num=player.getEnemy().countFellow();
				return num>0&&num>=player.getLeader().countFellow();
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i].side!=player.side){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					var target=list.randomGet();
					player.line(target,'green');
					target.die({source:player});
					game.delay();
				}
			}
		},
		stone_yanjingshe_old:{
			trigger:{source:'fellow'},
			forced:true,
			unique:true,
			filter:function(event,player){
				return player.getEnemy().countFellow()>=player.getLeader().countFellow();
			},
			content:function(){
				"step 0"
				event.chooser=player.getEnemy();
				event.chooser.chooseTarget('毒噬：选择己方一名随从令其死亡',function(card,playerx,target){
					return target.isMin()&&target.side!=player.side;
				},true).ai=function(target){
					return -target.hp;
				};
				player.line(event.chooser);
				"step 1"
				if(result.bool){
					event.chooser.line(result.targets[0]);
					game.delay();
					result.targets[0].die();
				}
			}
		},
		stone_mafengzhuru1:{
			trigger:{player:'dieBegin'},
			forced:true,
			filter:function(event){
				return event.source&&event.source.isMin();
			},
			content:function(){
				trigger.source.addSkill('stone_mafengzhuru2');
			},
		},
		stone_mafengzhuru2:{
			trigger:{global:'dieAfter'},
			forced:true,
			popup:false,
			unique:true,
			filter:function(event,player){
				return player.skills.contains('stone_mafengzhuru2');
			},
			content:function(){
				player.loseHp();
				player.removeSkill('stone_mafengzhuru2');
			}
		},
		stone_zhufu:{
			trigger:{player:'phaseEnd'},
			forced:true,
			unique:true,
			filter:function(event,player){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&
					game.players[i].side==player.side&&game.players[i].hp<game.players[i].maxHp){
						return true;
					}
				}
				return false;
			},
			content:function(){
				var list=[];
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isMin()&&game.players[i]!=player&&
					game.players[i].side==player.side&&game.players[i].hp<game.players[i].maxHp){
						list.push(game.players[i]);
					}
				}
				if(list.length){
					var target=list.randomGet();
					target.recover();
					game.delay();
					player.line(target,'green');
				}
			}
		},
		_actcount:{
			mod:{
				cardEnabled:function(card,player){
					if(player.isMin()){
						return;
					}
					if(_status.currentPhase!=player) return;
					var stoneact=get.info(card).stoneact;
					if(typeof stoneact!='number'){
						stoneact=1;
					}
					if(player.getActCount()+stoneact>player.actcount) return false;
				}
			},
			trigger:{player:'phaseBegin'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				player.actused=0;
				if(player.side){
					player.actcount=player.getEnemy().actcount;
				}
				else{
					player.actcount=player.getEnemy().actcount+1;
				}
				if(player.actcount>6){
					player.actcount-=4;
				}
				player.updateActCount();
			}
		},
		_actcount2:{
			trigger:{player:'useCard'},
			forced:true,
			popup:false,
			filter:function(event,player){
				return !player.isMin();
			},
			content:function(){
				var stoneact=get.info(trigger.card).stoneact;
				if(typeof stoneact==='number'){
					player.actused+=stoneact-1;
				}
				player.updateActCount();
			}
		},
		stonesha:{
			unique:true,
			enable:['chooseToUse','chooseToRespond'],
			filterCard:{type:'equip'},
			viewAs:{name:'sha'},
			check:function(){return 1},
			filter:function(event,player){
				return player.num('h',{type:'equip'})>0;
			},
			viewAsFilter:function(player){
				return player.num('h',{type:'equip'})>0;
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{type:'equip'})>0;
				},
				respondSha:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stoneshan:{
			unique:true,
			enable:['chooseToRespond'],
			viewAs:{name:'shan'},
			filterCard:{type:'stonecharacter'},
			check:function(){return 1},
			filter:function(event,player){
				return player.num('h',{type:'stonecharacter'})>0;
			},
			viewAsFilter:function(player){
				return player.num('h',{type:'stonecharacter'})>0;
			},
			ai:{
				skillTagFilter:function(player){
					return player.num('h',{type:'stonecharacter'})>0;
				},
				respondShan:true,
				order:4,
				useful:-1,
				value:-1
			}
		},
		stonedraw:{
			trigger:{player:'phaseDrawBegin'},
			forced:true,
			popup:false,
			content:function(){
				trigger.num--;
			}
		}
	},
	translate:{
		shaman:'萨满',
		mage:'法师',
		priest:'牧师',
		warrior:'战士',
		warlock:'术士',
		knight:'死亡骑士',
		rogue:'潜行者',
		paladin:'圣骑士',
		hunter:'猎人',
		druid:'德鲁伊',

		spell_shenshengxinxing:'神圣新星',
		spell_shenshengxinxing_info:'对所有敌方角色造成一点伤害，令所有友方角色回复一点体力',
		spell_shengguangzhadan:'圣光炸弹',
		spell_shengguangzhadan_info:'对所有随从造成等同于其手牌数的伤害',
		spell_maizang:'埋葬',
		spell_maizang_info:'令一名敌方随从死亡，并将一张与该随从同名的随从牌置于你的手牌',
		spell_xinlingshijie:'心灵视界',
		spell_xinlingshijie_info:'将一张敌方主将手牌的复制置于你的手牌',
		spell_naluzhiguang:'纳鲁之光',
		spell_naluzhiguang_info:'恢复一点体力值，若目标仍处于受伤状态，则召唤一名圣光护卫',
		spell_zhiliaozhihuan:'治疗之环',
		spell_zhiliaozhihuan_info:'令所有随从恢复两点体力值',

		stone_shengguanghuwei:'圣光护卫',
		priest_shengguang:'圣光',
		priest_shengguang_info:'每当一名随从获得治疗，摸一张牌',

		spell_nuxi:'怒袭',
		spell_nuxi_info:'造成一点伤害，获得两点护甲',
		spell_dunpaimengji:'盾牌猛击',
		spell_dunpaimengji_info:'对一名随从造成等同于你护甲值的伤害',
		spell_zhansha:'斩杀',
		spell_zhansha_info:'杀死一名已受伤的敌方随从',
		spell_nuhuozhongshao:'怒火中烧',
		spell_nuhuozhongshao_info:'对一名随从造成一点伤害，然后令其摸两张牌',
		spell_xuanfengzhan:'旋风斩',
		spell_xuanfengzhan_info:'对所有随从造成一点伤害',
		spell_juemingluandou:'绝命乱半',
		spell_juemingluandou_info:'随机保留一名随从，然后令所有其他随从死亡',

		spell_lierenyinji:'猎人印记',
		spell_lierenyinji_info:'将一名随从的体力上限降至1',
		spell_kuaisusheji:'快速射击',
		spell_kuaisusheji_info:'造成一点伤害，摸一张牌',
		spell_guanmenfanggou:'关门放狗',
		spell_guanmenfanggou_info:'每有一名敌方随从，便召唤一只猎狗',
		spell_zhaohuanchongwu:'动物伙伴',
		spell_zhaohuanchongwu_info:'随机召唤一只野兽',
		spell_zidanshangtang:'子弹上膛',
		spell_zidanshangtang_info:'随机获得一张猎人职业法术牌，并获得技能【上膛】直到回合结束',
		spell_duochongsheji:'多重射击',
		spell_duochongsheji_info:'对两名随机敌方随从各造成两点伤害',

		stone_liegou:'猎狗',
		hunter_zidanshangtang:'上膛',
		hunter_zidanshangtang_bg:'膛',
		hunter_zidanshangtang_info:'每当你使用一张法术牌，便随机获得一张猎人职业法术牌',

		spell_zuzhou:'诅咒',
		spell_zuzhou_info:'将目标随从翻面，摸一张牌',
		spell_xishengqiyue:'牺牲契约',
		spell_xishengqiyue_info:'令双方各一名随从立即死亡',
		spell_xiaoguibaopo:'小鬼爆破',
		spell_xiaoguibaopo_info:'对一名随从造成1〜3点伤害，每造成一点伤害，便召唤一只小鬼',
		spell_anyinglieyan:'暗影裂焰',
		spell_anyinglieyan_info:'杀死一名友方随从，并对所有敌方随从造成等于其体力值的伤害',
		spell_liliangdaijia:'力量代价',
		spell_liliangdaijia_info:'令一名友方随从摸4张牌，将体力值变为5，并在其下个回合结束后死亡',
		spell_emozhinu:'恶魔之怒',
		spell_emozhinu_info:'对所有随从造成一点伤害',

		spell_wuyashenxiang:'乌鸦神像',
		spell_wuyashenxiang_info:'从三张法术牌或随从牌中选择一张加入手牌',
		spell_huotigenxu:'活体根须',
		spell_huotigenxu_info:'造成一点伤害，或召唤两个树苗',
		spell_hengsao:'横扫',
		spell_hengsao_info:'对一名敌方角色造成两点伤害，然后对其他敌方角色造成一点伤害',
		spell_yexingchengzhang:'野性成长',
		spell_yexingchengzhang_info:'下个出牌阶段开始时获得三点额外行动值',
		spell_ziranzhili:'自然之力',
		spell_ziranzhili_info:'召唤三个树人，树人在其回合结束后死亡',
		spell_yemanpaoxiao:'野蛮咆哮',
		spell_yemanpaoxiao_bg:'咆',
		spell_yemanpaoxiao2:'咆哮',
		spell_yemanpaoxiao_info:'所有友方角色造成的伤害+1，直到你的下个回合开始',

		druid_yexingchengzhang:'成长',
		druid_yexingchengzhang_bg:'长',
		druid_yexingchengzhang_info:'下个出牌阶段开始时获得三点额外行动值',

		stone_shumiao:'树苗',
		stone_shuren:'树人',
		stone_zibao:'自爆',
		stone_zibao_info:'结合结束后立即死亡',

		spell_cigu:'刺骨',
		spell_cigu_info:'造成一点伤害，你可以弃置一张装备区内的牌令伤害+1',
		spell_jianrenluanwu:'剑刃乱舞',
		spell_jianrenluanwu_info:'弃置你的武器牌，并对所有敌方角色造成一点伤害',
		spell_daoshan:'刀扇',
		spell_daoshan_info:'对所有敌方随从造成一点伤害，从牌库中获得一张牌',
		spell_sijidaifa:'伺机待发',
		spell_sijidaifa_info:'你使用下一张法术牌时获得X点行动值，X为该法术的行动值消耗且不超过3',
		spell_cisha:'刺杀',
		spell_cisha_info:'杀死一名随从',
		spell_modaoyou:'磨刀油',
		spell_modaoyou_info:'令你下一次剑刃乱舞造成的伤害+1，并与一名随机友方随从各摸两张牌',

		spell_fengxian:'奉献',
		spell_fengxian_info:'对所有敌方角色造成一点伤害',
		spell_fuchouzhinu:'复仇之怒',
		spell_fuchouzhinu_info:'造成5点伤害，随机分配到所有敌方随从上',
		spell_shengliaoshu:'圣疗术',
		spell_shengliaoshu_info:'恢复两点体力，摸两张牌',
		spell_fennuzhichui:'愤怒之锤',
		spell_fennuzhichui_info:'造成一点伤害，从牌库中获得一张牌',
		spell_zuozhandongyuan:'作战动员',
		spell_zuozhandongyuan_info:'召唤两个新兵',
		spell_liliangzhufu:'力量祝福',
		spell_liliangzhufu_info:'令一名随从摸两张牌',

		spell_lianhuanbaolie:'连环爆裂',
		spell_lianhuanbaolie_info:'造成1〜2点雷电伤害',
		spell_shandianfengbao:'闪电风暴',
		spell_shandianfengbao_info:'对所有敌方随从造成1〜2点伤害',
		spell_yaoshu:'妖术',
		spell_yaoshu_info:'将一个随从变成一只青蛙',
		spell_yexinglanghun:'野性狼魂',
		spell_yexinglanghun_info:'召唤两个幽灵狼',
		spell_shixue:'嗜血',
		spell_shixue_info:'所有友方随从摸两张牌',
		spell_chazhuangshandian:'叉状闪电',
		spell_chazhuangshandian_info:'对两个随机敌方随从各造成一点雷电伤害',

		stone_qingwa:'青蛙',
		stone_youlinglang:'幽灵狼',
		shaman_qingwa:'青蛙',
		shaman_qingwa_info:'锁定技，你跳过摸牌阶段',


		spell_hanbingjian:'寒冰箭',
		spell_hanbingjian_info:'对一个随从造成两点伤害，然后将其翻面',
		spell_lieyanfengbao:'烈焰风暴',
		spell_lieyanfengbao_info:'对所有敌方随从造成两点伤害',
		spell_baofengxue:'暴风雪',
		spell_baofengxue_info:'对所有敌方随从造成一点伤害，然后将其翻面',
		spell_aoshuzhihui:'奥术智慧',
		spell_aoshuzhihui_info:'从牌库中获得两张牌',
		spell_bianxingshu:'变形术',
		spell_bianxingshu_info:'将一个随从变成一只绵羊',
		spell_huoqiushu:'火球术',
		spell_huoqiushu_info:'造成两点火焰伤害',

		stone_mianyang:'绵羊',
		mage_mianyang:'绵羊',
		mage_mianyang_info:'锁定技，你不能使用杀',

		stone_beijunmushi:'北郡牧师',
		stone_guangyaozhizi:'光耀之子',
		stone_longmianjiaoguan:'龙眠教官',
		stone_linghunjisi:'灵魂祭司',
		stone_guanliyuan:'管理员',
		stone_heianjiaotu:'黑暗教徒',

		priest_shengliao:'圣疗',
		priest_shengliao_info:'每当一名随从回复体力，己方主将从牌库中获得一张牌',
		priest_guangyao:'光耀',
		priest_guangyao_info:'每当你的体力值发生改变，摸一张牌',
		priest_xundao:'训导',
		priest_xundao_info:'你出场时，若己方主将手牌中有随从牌，则摸一张牌并获得嘲讽',
		priest_hunwu:'魂舞',
		priest_hunwu_info:'己方主将的职业技能及法术的治疗效果改为令目标流失等量体力',
		priest_faxian:'发现',
		priest_faxian_info:'你出场时，己方主将从3张随机随从牌中选择一张加入手牌',
		priest_zhufu:'献身',
		priest_zhufu_info:'你死亡时，令一名随机友方随从增加一点体力上限并回复一点体力',

		stone_daomufeizei:'盗墓匪贼',
		stone_haidao:'海盗',
		stone_haidaotoumu:'海盗头目',
		stone_cike:'刺客',
		stone_tegong:'特工',
		stone_qiezei:'窃贼',
		stone_heitieairen:'黑铁矮人',

		rogue_touqie:'偷窃',
		rogue_touqie_info:'每当你造成一次伤害，己方主将从牌库中获得一张牌',
		rogue_xunbao:'寻宝',
		rogue_xunbao_info:'你死亡时，将一张伺机行发置于己方主将的手牌',
		rogue_cisha:'刺杀',
		rogue_cisha_info:'每当你对一名随从造成伤害，受伤害随从立即死亡',
		rogue_touxi:'偷袭',
		rogue_touxi_info:'你出场时，己方主将可弃置一张装备区内的牌并对一名敌方角色造成一点伤害',
		rogue_qiancang:'潜藏',
		rogue_qiancang_info:'你出场时，对所有未受伤害的敌方随从造成一点伤害',
		rogue_zhaomu:'结伙',
		rogue_zhaomu_info:'你出场时，召唤一个海盗',

		stone_zhihuiguan:'指挥官',
		stone_jiangong:'监工',
		stone_yuanhou:'猿猴',
		stone_chidunshinv:'持盾侍女',
		stone_zhujiashi:'铸甲师',
		stone_kuangzhanshi:'狂战士',

		warrior_tongling:'统领',
		warrior_tongling_info:'你出场时，将所有友方随从的武将牌翻至正面',
		warrior_baoluan:'暴乱',
		warrior_baoluan_info:'每当一名随从受到一次伤害，摸一张牌',
		warrior_jiangong:'监工',
		warrior_jiangong_info:'你出场时，己方主将可对一名随从造成一点伤害，然后令该随从摸两张牌',
		warrior_zhujia:'铸甲',
		warrior_zhujia_info:'每当你受到一次伤害，己方主将获得一点护甲',
		warrior_tidun:'提盾',
		warrior_tidun_info:'你出场时，己方主将获得两点护甲',

		stone_lieyanxiaogui:'烈焰小鬼',
		stone_xiaoguishouling:'小鬼首领',
		stone_kongjuzhanma:'恐惧战马',
		stone_morishouwei:'末日守卫',
		stone_xukongxingzhe:'虚空行者',
		stone_diyuhuo:'地狱火',
		stone_xiaogui:'小鬼',

		warlock_nonghuo:'弄火',
		warlock_nonghuo_info:'你出场时，对己方主将造成1点火焰伤害',
		warlock_zhaogui:'召鬼',
		warlock_zhaogui_info:'每当你受到一次伤害，召唤一个小鬼',
		warlock_yongsheng:'永生',
		warlock_yongsheng_info:'你死亡后，召唤一匹恐惧战马',
		warlock_yuhuo:'狱火',
		warlock_yuhuo_info:'你出场时，对所有其他随从造成一点伤害',
		warlock_zaihuo:'灾祸',
		warlock_zaihuo_info:'你出场时，将武将牌翻至正面并随机弃置主将的两张手牌',

		stone_hudunren:'护盾人',
		stone_junxuguan:'军需官',
		stone_yurenqishi:'鱼人骑士',
		stone_chidunweishi:'持盾卫士',
		stone_liewangshouwei:'列王守卫',
		stone_longwangpeiou:'龙王配偶',

		paladin_zhaohuan:'召唤',
		paladin_zhaohuan2:'召唤',
		paladin_zhaohuan_info:'你出场后，你的主将在使用下一张随从牌时获得一点行动值',
		paladin_shouwei:'守卫',
		paladin_shouwei_info:'你出场时，你的主将回复两点体力值',
		paladin_chidun:'持盾',
		paladin_chidun_info:'你出场时，己方主将可以弃置对方一名随从的所有牌',
		paladin_buji:'补给',
		paladin_buji_info:'你出场时，所有友方新兵增加一点体力上限，回复一点体力并摸两张牌',
		paladin_hudun:'护盾',
		paladin_hudun_info:'你出场时，获得一点护甲值',
		paladin_zhaochao:'招潮',
		paladin_zhaochao_info:'每当你的主将使用一次英雄技能，便摸两张牌',

		stone_shifazhe:'嗜法者',
		stone_wushixuetu:'巫师学徒',
		stone_shuiyuansu:'水元素',
		stone_falifulong:'法力浮龙',
		stone_yingxiongzhihun:'英雄之魂',
		stone_huoyao:'火妖',

		mage_shifa:'嗜法',
		mage_shifa_info:'你出场时，将一张随机法术牌置入双方主将的手牌',
		mage_minghuo:'冥火',
		mage_minghuo_info:'你的主将的职业技能造成的伤害+1',
		mage_tunfa:'吞法',
		mage_tunfa_info:'每当己方主将使用一张法术牌，摸一张牌',
		mage_lieyan:'烈焰',
		mage_lieyan_info:'每当己方主将使用一张法术牌，对一名随机敌方角色造成一点火焰伤害',
		mage_zhufa:'助法',
		mage_zhufa_info:'每当己方主将使用一张法术牌，令其获得一点行动值',
		mage_bingdong:'冰冻',
		mage_bingdong_info:'每当你对一个随从造成伤害，该随从将武将牌翻至背面',

		stone_caoyuanshi:'草原狮',
		stone_leiouke:'雷欧克',
		stone_misha:'米莎',
		stone_huofu:'霍弗',
		stone_jiewangzhu:'结网蛛',
		stone_xunshoushi:'驯兽师',

		hunter_jiewang:'结网',
		hunter_jiewang_info:'你死亡时，己方主将获得一张随机随从牌',
		hunter_xunshou:'驯兽',
		hunter_xunshou_info:'你出场时，己方主将可选择一名其他友方随从令其增加一点体力上限，回复一点体力并摸两张牌',
		hunter_zhanhuo:'战火',
		hunter_zhanhuo_info:'你出场时，所有友方随从摸一张牌',
		hunter_nuhou:'怒吼',
		hunter_nuhou_info:'当你死亡时，对所有敌方角色造成一点伤害',

		stone_baoqishi:'豹骑士',
		stone_conglinshouwei:'从林守卫',
		stone_baohuzhishu:'保护之树',
		stone_kuangyedoushi:'狂野斗士',
		stone_liebao:'猎豹',
		stone_zongxiong:'棕熊',

		stone_chongfeng:'冲锋',
		stone_chongfeng_info:'你出场时，立即将武将牌翻至正面',
		druid_nuhuo:'怒火',
		druid_nuhuo_info:'每当己方主将使用一次职业技能，便对一名随机敌人造成一点伤害',
		druid_chengzhang:'成长',
		druid_chengzhang2:'成长',
		druid_chengzhang_info:'你出场时，己方主将获得一点行动值；你死亡时，己方主将需弃置一张手牌',
		druid_huwei:'护卫',
		druid_huwei_info:'你出场时，己方主将可以选择一项：对一名随从造成一点伤害，或弃置一名随从的所有牌并将其体力上限改为1',


		stone_fachao:'法潮图腾',
		stone_tutengyongshi:'图腾勇士',
		stone_huoshe:'火舌图腾',
		stone_huoyuansu:'火元素',
		stone_tuyuansu:'土元素',
		stone_wujiyuansu:'无羁元素',
		stone_xuejuren:'穴居人',

		shaman_xueju:'穴居',
		shaman_xueju_info:'每当己主将使用一张随从牌，摸一张牌',
		shaman_huoxi:'火袭',
		shaman_huoxi_info:'你出场时，己方主将可以对对方一名随从造成两点火焰伤害',
		shaman_fachao:'法潮',
		shaman_fachao_info:'己方主将在其每个回合结束阶从牌库中获得一张牌并回复一点体力',
		shaman_huoshe:'火舌',
		shaman_huoshe_info:'其他己方角色造成的伤害始终+1',

		shaman_jili:'激励',
		shaman_jili_info:'己方主将回合结束时，所有友方图腾摸一张牌',
		shaman_tuteng:'图腾',
		shaman_tuteng_info:'你跳过摸牌阶段',
		shaman_fali:'空气',
		shaman_fali_info:'已方主将的回合结束阶段，令所有手牌数不大于1的友方随从摸一张牌',
		shaman_zhiliao:'治疗',
		shaman_zhiliao_info:'已方主将的回合结束阶段，令所有友方随从回复一点体力',
		shaman_zhuore:'灼热',
		shaman_zhuore_info:'已方主将的回合结束阶段，对一名随机敌方随从造成一点伤害',

		_shaman_skill:'祭天',
		_shaman_skill_info:'召唤一个随机图腾',
		_mage_skill:'火冲',
		_mage_skill_info:'对一名随从造成一点火焰伤害',
		_priest_skill:'治疗',
		_priest_skill_info:'回复一点体力',
		_warrior_skill:'战甲',
		_warrior_skill_info:'获得一点护甲（不能超过5点）',
		_warlock_skill:'作法',
		_warlock_skill_info:'从牌库中获得两张牌',
		_rogue_skill:'出鞘',
		_rogue_skill_info:'装备一把武器和一个随机非武器装备',
		_paladin_skill:'动员',
		_paladin_skill_info:'召唤一名士兵',
		_hunter_skill:'射击',
		_hunter_skill_info:'对敌方主将造成一点伤害',
		_druid_skill:'猛击',
		_druid_skill_info:'视为使用一张不计入出杀次数的杀',

		stone_tuteng1:'石爪图腾',
		stone_tuteng2:'灼热图腾',
		stone_tuteng3:'空气图腾',
		stone_tuteng4:'治疗图腾',

		stone_xinbing:'新兵',

		stone_zhongshi:'中士',
		stone_zhongshi1:'叫嚣',
		stone_zhongshi1_info:'你出场时，己方主将可以弃置对方一名随从的所有牌',
		stone_zhucangzhe:'伫藏者',
		stone_zhucangzhe1:'伫藏',
		stone_zhucangzhe1_info:'你出场时，己方主将可以令己方一名其他角色摸一张牌',
		stone_huoqiangshou:'火枪手',
		stone_huoqiangshou1:'火枪',
		stone_huoqiangshou1_info:'你出场时，己方主将可以对对方一名随从造成一点伤害',

		stone_lansaizhanshi:'蓝腮战士',
		stone_kutongsiseng:'苦痛侍僧',
		stone_kutongsiseng1:'苦痛',
		stone_kutongsiseng2:'苦痛',
		stone_kutongsiseng1_info:'你出场时，己方主将于本回合结束阶段摸一张牌',
		stone_yuanguanying:'远古暗影',
		stone_yuanguanying1:'暗影',
		stone_yuanguanying1_info:'你出场时，己方主将可视为对一名敌方角色使用一张杀',

		stone_dijieshicong:'低阶侍从',
		stone_dijieshicong1:'持枪',
		stone_dijieshicong1_info:'你出场时，敌方主将随机弃置一张装备牌',
		stone_yaosaishouwei:'要塞守卫',
		stone_yaosaishouwei1:'守卫',
		stone_yaosaishouwei1_info:'你出场时，己方主将本回合手牌上限+2',
		stone_famingjia:'发明家',
		stone_famingjia1:'发明',
		stone_famingjia1_info:'你出场时，己方主将摸两张牌',

		stone_chilundashi:'齿轮大师',
		stone_chilundashi1:'齿轮',
		stone_chilundashi2:'齿轮',
		stone_chilundashi1_info:'你出场后的第一个摸牌阶段摸牌数+1',
		stone_hanguangzhizhe:'寒光智者',
		stone_hanguangzhizhe1:'寒光',
		stone_hanguangzhizhe1_info:'你出场时，所有其他随从各摸一张牌',
		stone_aihaozhihun:'哀嚎之魂',
		stone_aihaozhihun1:'哀嚎',
		stone_aihaozhihun1_info:'你出场时，敌方随从弃置所有牌',

		stone_fennuxiaoji:'愤怒小鸡',
		stone_fennuxiaoji1:'激怒',
		stone_fennuxiaoji1_info:'回合开始阶段，若你没有手牌，你摸两张牌',
		stone_juxingchanchu:'巨型蟾蜍',
		stone_juxingchanchu1:'毒液',
		stone_juxingchanchu1_info:'你死亡时，己方主将可令一名敌方随从失去1点体力',
		stone_shishigui:'食尸鬼',
		stone_shishigui1:'食尸',
		stone_shishigui1_info:'你死亡后，场上所有其他随从失去1点体力',
		stone_wuyi:'巫医',
		stone_langren:'狼人',
		stone_qianxing:'潜行',
		stone_qianxing_info:'在你的回合开始前，不能成为任何卡牌的目标',

		stone_mingguangjisi:'明光祭司',
		stone_nianqingjisi:'年轻祭司',
		stone_zhufu:'祝福',
		stone_zhufu_info:'回合结束阶段，你令一名随机的受伤友方随从回复一点体力',
		stone_aomishouwei:'奥秘守卫',
		stone_yanjingshe:'眼镜蛇',
		stone_yanjingshe1:'毒噬',
		stone_yanjingshe1_info:'你出场时，若敌方随从数不少于己方，则随机杀死一名随从',
		stone_zhiyuzhe:'治愈者',
		stone_zhiyu:'治愈',
		stone_zhiyu_info:'你出场时，令所有友方随从回复一点体力',
		stone_mafengzhuru:'麻风侏儒',
		stone_mafengzhuru1:'麻风',
		stone_mafengzhuru1_info:'杀死你的随从失去一点体力',
		stone_fatiaozhuru:'发条侏儒',
		stone_fatiaozhuru1:'发条',
		stone_fatiaozhuru1_info:'回合结束阶段，若你没有手牌，你摸两张牌',

		stonesha:'进攻',
		stonesha_info:'锁定技，你的装备牌均视为杀',
		stoneshan:'格挡',
		stoneshan_info:'锁定技，你的随从牌均视为闪',

		stonecharacter:'随从',
		spell_shengerpingdeng:'生而平等',
		spell_shengerpingdeng_info:'将所有随从体力上限降为1',
		spell_jingshenkongzhi:'精神控制',
		spell_jingshenkongzhi_info:'限主将使用，将一名敌方随从吸收为己方',
		spell_anyingkuangluan:'暗影狂乱',
		spell_anyingkuangluan_info:'限主将使用，将一名敌方随从吸收为己方，并令其于下个回合结束后死亡',
		spell_anyingkuangluan_die:'暗影狂乱',
		spell_anyingkuangluan_die_info:'下个回合结束后死亡',
		spell_binghuan:'冰环',
		spell_binghuan_info:'将场上所有随从翻面',
		spell_morizaihuo:'末日灾祸',
		spell_morizaihuo_info:'令场上所有随从立即死亡（无法触发死亡技能），回复两点体力',
		spell_zhiliaozhichu:'治疗之触',
		spell_zhiliaozhichu_info:'令目标随从恢复所有体力值并获得嘲讽',
		chaofeng:'嘲讽',
		chaofeng_info:'同阵营的无嘲讽角色不以能成为杀或决斗的目标',
		spell_wangzhezhufu:'王者祝福',
		spell_wangzhezhufu_info:'令一名随从增加两点体力上限，回复两点体力并摸两张牌',
		spell_diyulieyan:'地狱烈焰',
		spell_diyulieyan_info:'所有角色失去一点体力',
		spell_chenmo:'沉默',
		spell_chenmo_info:'弃置一名随从的所有牌，并令其体力上限减至1',
		spell_zhiliaoshui:'治疗水',
		spell_zhiliaoshui_info:'出牌阶段对自己使用，恢复两点体力值；或于濒死阶段对一名角色使用，令目标恢复一点体力',
		spell_yanmie:'黑暗契约',
		spell_yanmie_info:'交换你与敌方主将的装备区，并摸若干张牌直到你的手牌数与敌方主将相等',
		spell_xiaoshi:'消失',
		spell_xiaoshi_info:'令敌方主将将所有装备区内的牌收入手牌，并弃置其若干张手牌，直到其手牌数与你相等',

		stonecard:'法术',
		mode_stone_card_config:'炉石模式',
		mode_stone_character_config:'炉石模式',
	},
	ai:{
		get:{
			attitude:function(from,to){
				var num;
				if(to.isMin()&&!to.skills.contains('chaofeng')){
					num=5;
				}
				else{
					num=6;
				}
				return num*(from.side==to.side?1:-1);
			}
		}
	},
	config:['battle_number','double_character','double_hp','ban_weak','free_choose','change_choice'],
}
