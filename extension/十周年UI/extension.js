/*jshint esversion: 6 */
game.import("extension", function(lib,game,ui,get,ai,_status){ return { name:"十周年UI",
content:function(config, pack){
	var extensionName = '十周年UI';
	var extension = lib.extensionMenu['extension_' + extensionName];
	var extensionPath = lib.assetURL + 'extension/' + extensionName + '/';
    if (!(extension && extension.enable && extension.enable.init)) return;

    lib.config.forbiddouble=['miheng','swd_kangnalishi','wutugu','hs_siwangzhiyi','hs_ronghejuren','hs_shanlingjuren'];
    lib.config.mode_config.identity.identity[7]=['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan'];
    lib.config.mode_config.identity.identity[8]=['zhu','zhong','zhong','zhong','nei','fan','fan','fan','fan','fan'];

    lib.mode.identity.connect.connect_player_number.item["9"] = "九人";
    lib.mode.identity.connect.connect_player_number.item["10"] = "十人";

    lib.mode.identity.config.player_number.item["9"] = "九人";
    lib.mode.identity.config.player_number.item["10"] = "十人";

    lib.mode.identity.config.double_hp.item["zuidashangxianzuixiaotili"] = "最大上限最小体力";

    lib.translate['woshixiaonei']='我是小内';
    lib.translate['woshixiaonei_info']='村规小内限定技，先选择自己，然后2选1：1）回复一点体力，摸2张牌，增加一点体力上限；2）回复一点体力，摸3张牌';
    lib.skill['woshixiaonei']={
                              				limited:true,
                              				check:function (){return -1},
                              				enable:'chooseToUse',
                              				filter:function(event,player){
                              					return player.identity=='nei';
                              				},
                              				skillAnimation:'legend',
                              				animationColor:'thunder',
                              				filterTarget:function(card,player,target){
                              					return target==game.me;
                              				},
                              				content:function(){
                              					'step 0'
                                                  player.chooseControlList(true,function(event,player){
                                                      return 0;
                                                  },
                                                  ['回复一点体力，摸2张牌，增加一点体力上限','回复一点体力，摸3张牌']);

                              					'step 1'
                                                  if(result.index==0 || result.index==1){
                                                      if(result.index==0){
                                                          player.gainMaxHp();
                                                          player.draw(2);
                                                      }
                                                      else if(result.index==1){
                                                          player.draw(3);
                                                      }
                                                      player.recover();
                                                      game.broadcastAll(function(player){
                                                          player.showIdentity();
                                                      },player);
                                                      game.removeGlobalSkill('woshixiaonei');
                                                  }
                              				},
                              			}
    game.addGlobalSkill('woshixiaonei');

	switch(lib.config.layout){
        case 'long2':
        case 'nova':
            break;
        default:
            alert('十周年UI提醒您，请更换<手杀>、<新版>布局以获得良好体验（在选项-外观-布局）。');
            break;
    }

	console.time(extensionName);
	window.decadeUI = {
		init:function(){
			this.extensionName = extensionName;
			
			var SVG_NS = 'http://www.w3.org/2000/svg';
			var svg = document.body.appendChild(document.createElementNS(SVG_NS, 'svg'));
			var defs = svg.appendChild(document.createElementNS(SVG_NS, 'defs'));
			var solo = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			var duol = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			var duor = defs.appendChild(document.createElementNS(SVG_NS, 'clipPath'));
			
			solo.id = 'solo-clip';
			duol.id = 'duol-clip';
			duor.id = 'duor-clip';
			
			solo.setAttribute('clipPathUnits', 'objectBoundingBox');
			duol.setAttribute('clipPathUnits', 'objectBoundingBox');
			duor.setAttribute('clipPathUnits', 'objectBoundingBox');
			
			var soloPath = solo.appendChild(document.createElementNS(SVG_NS, 'path'));
			var duoLPath = duol.appendChild(document.createElementNS(SVG_NS, 'path'));
			var duoRPath = duor.appendChild(document.createElementNS(SVG_NS, 'path'));
			
			soloPath.setAttribute('d', 'M0 0 H1 Q1 0.065 0.9 0.065 Q1 0.065 1 0.11 V0.96 Q1 1 0.9 1 H0.1 Q0 1 0 0.96 V0.11 Q0 0.065 0.1 0.065 Q0 0.065 0 0 Z');
			duoLPath.setAttribute('d', 'M0 0 H1 V1 Q1 1 0.9 1 H0.1 Q0 1 0 0.96 V0.11 Q0 0.065 0.1 0.065 Q0 0.065 0 0 Z');
			duoRPath.setAttribute('d', 'M0 0 H1 Q1 0.065 0.9 0.065 Q1 0.065 1 0.11 V0.96 Q1 1 0.9 1 H0 Z');

			this.initOverride();
		},
		initOverride:function(){
		    var base = {
				ui:{
					create:{
						cards: ui.create.cards,
					},
				},
				get:{
					infoHp: get.infoHp,
					infoMaxHp: get.infoMaxHp,
					skillState: get.skillState,
				},
				game:{
					check: game.check,
					uncheck: game.uncheck,
					loop: game.loop,
					over: game.over,
					updateRoundNumber: game.updateRoundNumber,
					phaseLoop: game.phaseLoop,
					bossPhaseLoop: game.bossPhaseLoop,
					
				},
				lib:{
					element:{
						player:{
							getState: lib.element.player.getState,
							setModeState: lib.element.player.setModeState,
							countCards: lib.element.player.countCards,
							$compare: lib.element.player.$compare,
						},
						event:{
							send: lib.element.event.send,
						},
					},
				},
			};
			
			if (decadeParts.parts) for (var i = 0; i < decadeParts.parts.length; i++) decadeParts.parts[i](lib, game, ui, get, ai, _status);

			var getNodeIntro = get.nodeintro;
			var gameLinexyFunction = game.linexy;
		    var gameUncheckFunction = game.uncheck;
			var swapControlFunction = game.swapControl;
		    var swapPlayerFunction = game.swapPlayer;
			var baseChooseCharacter = game.chooseCharacter;
		    var createArenaFunction = ui.create.arena;
			var createPauseFunction = ui.create.pause;
			var createPlayerFunction = ui.create.player;
			var createMenuFunction = ui.create.menu;
			var createCardFunction = ui.create.card;
			ui.create.connectPlayers = function(ip){
                                               				game.connectPlayers=[];
                                               				for(var i=0;i<10;i++){
                                               					var player=ui.create.player(ui.window);
                                               					player.dataset.position=i;
                                               					player.classList.add('connect');
                                               					game.connectPlayers.push(player);
                                               					if(i>=lib.configOL.number){
                                               						player.classList.add('unselectable2');
                                               					}
                                               				}

                                               				var bar=ui.create.div(ui.window);
                                               				bar.style.height='20px';
                                               				bar.style.width='80%';
                                               				bar.style.left='10%';
                                               				bar.style.top='calc(200% / 7 - 120px + 5px)';
                                               				bar.style.textAlign='center';
                                               				var ipbar=ui.create.div('.shadowed',ip,bar);
                                               				ipbar.style.padding='4px';
                                               				ipbar.style.borderRadius='2px';
                                               				ipbar.style.position='relative';

                                               				var button=ui.create.div('.menubutton.large.highlight.connectbutton.pointerdiv',game.online?'退出联机':'开始游戏',ui.window,function(){
                                               					if(button.clicked) return;
                                               					if(game.online){
                                               						if(game.onlinezhu){
                                               							game.send('startGame');
                                               						}
                                               						else{
                                               							game.saveConfig('tmp_owner_roomId');
                                               							game.saveConfig('tmp_user_roomId');
                                               							game.saveConfig('reconnect_info');
                                               							game.reload();
                                               						}
                                               					}
                                               					else{
                                               						game.resume();
                                               					}
                                               					button.delete();
                                               					bar.delete();
                                               					delete ui.connectStartButton;
                                               					delete ui.connectStartBar;
                                               					button.clicked=true;
                                               				});

                                               				ui.connectStartButton=button;
                                               				ui.connectStartBar=bar;
                                               			};
			var initCssstylesFunction = lib.init.cssstyles;
			var initLayoutFunction = lib.init.layout;
			var cardInitFunction = lib.element.card.init;
			var cardCopyFunction = lib.element.card.copy;
			var playerInitFunction = function(character,character2,skill){
                                     					if(typeof character=='string'&&!lib.character[character]){
                                     						lib.character[character]=get.character(character);
                                     					}
                                     					if(typeof character2=='string'&&!lib.character[character2]){
                                     						lib.character[character2]=get.character(character2);
                                     					}
                                     					if(!lib.character[character]) return;
                                     					if(get.is.jun(character2)){
                                     						var tmp=character;
                                     						character=character2;
                                     						character2=tmp;
                                     					}
                                     					if(character2==false){
                                     						skill=false;
                                     						character2=null;
                                     					}
                                     					var info=lib.character[character];
                                     					if(!info){
                                     						info=['','',1,[],[]];
                                     					}
                                     					if(!info[4]){
                                     						info[4]=[];
                                     					}
                                     					var skills=info[3];
                                     					this.clearSkills(true);
                                     					this.classList.add('fullskin');
                                     					if(!game.minskin&&get.is.newLayout()&&!info[4].contains('minskin')){
                                     						this.classList.remove('minskin');
                                     						this.node.avatar.setBackground(character,'character');
                                     					}
                                     					else{
                                     						this.node.avatar.setBackground(character,'character');
                                     						if(info[4].contains('minskin')){
                                     							this.classList.add('minskin');
                                     						}
                                     						else if(game.minskin){
                                     							this.classList.add('minskin');
                                     						}
                                     						else{
                                     							this.classList.remove('minskin');
                                     						}
                                     					}

                                     					var hp1=get.infoHp(info[2]);
                                     					var maxHp1=get.infoMaxHp(info[2]);

                                     					this.node.avatar.show();
                                     					this.node.count.show();
                                     					this.node.equips.show();
                                     					this.name=character;
                                     					this.sex=info[0];
                                     					this.group=info[1];
                                     					this.hp=hp1;
                                     					this.maxHp=maxHp1;
                                     					this.hujia=0;
                                     					this.node.intro.innerHTML=lib.config.intro;
                                     					this.node.name.dataset.nature=get.groupnature(this.group);
                                     					lib.setIntro(this);
                                     					// var name=get.translation(character);
                                     					this.node.name.innerHTML=get.slimName(character);
                                     					if(this.classList.contains('minskin')&&this.node.name.querySelectorAll('br').length>=4){
                                     						this.node.name.classList.add('long');
                                     					}
                                     					// if(!lib.config.show_name){
                                     					// 	this.node.name.style.display='none';
                                     					// }
                                     					// for(var i=0;i<name.length;i++){
                                     					// 	if(name[i]!='s'&&name[i]!='p')
                                     					// 	this.node.name.innerHTML+=name[i]+'<br/>';
                                     					// }
                                     					if(character2&&lib.character[character2]){
                                     						var info2=lib.character[character2];
                                     						if(!info2){
                                     							info2=['','',1,[],[]];
                                     						}
                                     						if(!info2[4]){
                                     							info2[4]=[];
                                     						}
                                     						this.classList.add('fullskin2');
                                     						this.node.avatar2.setBackground(character2,'character');

                                     						this.node.avatar2.show();
                                     						this.name2=character2;
                                     						var hp2=get.infoHp(info2[2]);
                                     						var maxHp2=get.infoMaxHp(info2[2]);
                                     						var double_hp;
                                                            double_hp=get.config('double_hp');
                                     						switch(double_hp){
                                     							case 'pingjun':{
                                     								this.maxHp=Math.floor((maxHp1+maxHp2)/2);
                                     								this.hp=Math.floor((hp1+hp2)/2);
                                     								this.singleHp=((maxHp1+maxHp2)%2===1);
                                     								break;
                                     							}
                                     							case 'zuidazhi':{
                                     								this.maxHp=Math.max(maxHp1,maxHp2);
                                     								this.hp=Math.max(hp1,hp2);
                                     								break;
                                     							}
                                     							case 'zuixiaozhi':{
                                     								this.maxHp=Math.min(maxHp1,maxHp2);
                                     								this.hp=Math.min(hp1,hp2);
                                     								break;
                                     							}
                                     							case 'zonghe':{
                                     								this.maxHp=maxHp1+maxHp2;
                                     								this.hp=hp1+hp2;
                                     								break;
                                     							}
                                     							case 'zuidashangxianzuixiaotili':{
                                     								this.maxHp=Math.max(maxHp1,maxHp2);
                                     								this.hp=Math.min(hp1,hp2);
                                                                    if(this.maxHp>4){
                                                                        this.hp+=this.maxHp-4;
                                                                    }
                                     								break;
                                     							}
                                     							default:{
                                     								this.maxHp=maxHp1+maxHp2-3;
                                     								this.hp=hp1+hp2-3;
                                     							};
                                     						}
                                     						this.node.count.classList.add('p2');
                                     						skills=skills.concat(info2[3]);

                                     						// var name=get.translation(character2);
                                     						this.node.name2.innerHTML=get.slimName(character2);
                                     						// this.node.name2.dataset.nature=get.groupnature(info2[1]);
                                     						// if(!lib.config.show_name){
                                     						// 	this.node.name2.style.display='none';
                                     						// }
                                     						// for(var i=0;i<name.length;i++){
                                     						// 	this.node.name2.innerHTML+=name[i]+'<br/>';
                                     						// }
                                     					}
                                     					if(skill!=false){
                                     						for(var i=0;i<skills.length;i++){
                                     							this.addSkill(skills[i]);
                                     						}
                                     						this.checkConflict();
                                     					}
                                     					lib.group.add(this.group);
                                     					if(this.inits){
                                     						for(var i=0;i<lib.element.player.inits.length;i++){
                                     							lib.element.player.inits[i](this);
                                     						}
                                     					}
                                     					if(this._inits){
                                     						for(var i=0;i<this._inits.length;i++){
                                     							this._inits[i](this);
                                     						}
                                     					}
                                     					this.update();
                                     					return this;
                                     				};
			var playerUninitFunction = lib.element.player.uninit;
			var playerAddSkillFunction = lib.element.player.addSkill;
			var playerRemoveSkillFunction = lib.element.player.removeSkill;
			var playerDamageFunction = lib.element.player.$damage;
			var playerUpdateFunction = lib.element.player.update;
			var playerChooseTargetFunction = lib.element.player.chooseTarget;
			var playerThrowFunction = lib.element.player.$throw;
			var playerDrawFunction = lib.element.player.$draw;
			var playerDieAfterFunction = lib.element.player.$dieAfter;
			var playerDieFlipFunction = lib.element.player.$dieflip;
			
			
			ui.updatehl = decadeUI.layout.updateHand;
			ui.updatej = decadeUI.layout.updateJudges;
			
			ui.updatexr = function(){
				if (ui._updatexr) {
					clearTimeout(ui._updatexr);
				}
				
				ui._updatexr = setTimeout(ui.updatex, 100);
			};
			
			document.body.onresize = ui.updatexr;
			
			ui.updatez = function(zoom){
    			var width = document.documentElement.offsetWidth;
    			var height = document.documentElement.offsetHeight;
				var zoom = game.documentZoom;
				decadeUI.zooms.body = zoom;
				
    			if(zoom != 1){
    			    width = Math.round(width / zoom);
    			    height = Math.round(height / zoom);
    			    // if (width % 2 != 0) width += 1;
    			    // if (height % 2 != 0) height += 1;
    				document.body.style.width = width + 'px';
    				document.body.style.height = height + 'px'
					document.body.style.zoom = zoom;
					document.body.style.transform = '';
    			}else{
    				document.body.style.width = width + 'px';
    				document.body.style.height = height + 'px';
					document.body.style.zoom = 1;
    				document.body.style.transform = '';
    			}
			};
			
			get.infoHp = function(hp){
				if (typeof hp == 'number') {
					return hp;
				} else if (typeof hp == 'string') {
					var index = hp.indexOf('/');
					if (index >= 0) hp = hp.slice(0, hp.indexOf('/'));
					if (hp == 'Infinity' || hp == '∞') {
						return Infinity;
					} else {
						return parseInt(hp);
					}
						
				}

				return 0;
			};
			
			get.infoMaxHp = function(hp){
				if (typeof hp == 'number') {
					return hp;
				} else if (typeof hp == 'string') {
					var index = hp.indexOf('/');
					if (index >= 0) hp = hp.slice(hp.indexOf('/') + 1);
					if (hp == 'Infinity' || hp == '∞') {
						return Infinity;
					} else {
						return parseInt(hp);
					}
						
				}

				return 0;
			},
			
			get.skillState = function(player){
				var skills = base.get.skillState.apply(this, arguments);
				if (game.me != player) {
					var global = skills.global = skills.global.concat();
					for (var i = global.length - 1; i >= 0; i--) {
						if (global[i].indexOf('decadeUI') >= 0) global.splice(i, 1);
					}
				}
				
				return skills;
			};
			
			lib.placePoppedDialog = function(dialog, e, element){
				if (dialog._place_text) {
					if (dialog._place_text.firstChild.offsetWidth >= 190 || dialog._place_text.firstChild.offsetHeight >= 30) {
						dialog._place_text.style.textAlign = 'left';
						dialog._place_text.style.marginLeft = '14px';
					}
				}
				
				var zoom = game.documentZoom;
				if (decadeUI.isMobile() && element && element.classList.contains('mark')) zoom = 1;
				if (e.touches && e.touches[0]) {
					e = e.touches[0];
				}
				
				var height = Math.min(ui.window.offsetHeight - 20, dialog.content.scrollHeight);
				if (dialog._mod_height) {
					height += dialog._mod_height;
				}
				dialog.style.height = height + 'px';
				if ((e.clientX / zoom) < ui.window.offsetWidth / 2) {
					dialog.style.left = (e.clientX / zoom + 10) + 'px';
				} else {
					dialog.style.left = (e.clientX / zoom - dialog.offsetWidth - 10) + 'px';
				}
				var idealtop = e.clientY / zoom - dialog.offsetHeight / 2;
				if (idealtop < 10) {
					idealtop = 10;
				} else if (idealtop + dialog.offsetHeight + 10 > ui.window.offsetHeight) {
					idealtop = ui.window.offsetHeight - 10 - dialog.offsetHeight;
				}
				
				dialog.style.top = idealtop + 'px';
			};
			
			game.updateRoundNumber = function(){
				game.broadcastAll(function(num1, num2){
					if(ui.cardPileNumber) ui.cardPileNumber.innerHTML = '牌堆' + num2 + ' 第' + num1 +'轮';
				},game.roundNumber, ui.cardPile.childNodes.length);
			};
			
			game.bossPhaseLoop = function(){
				game.broadcastAll(function(firstAction){
					var cur;
					for (var i = 0; i < game.players.length; i++) {
						cur = game.players[i];
						if (!cur.node.seat) cur.node.seat = decadeUI.dialog.create('seat', cur);
						cur.node.seat.innerHTML = get.cnNumber(get.distance(firstAction, cur, 'absolute') + 1, true);
					}
				}, game.boss);
				
				return base.game.bossPhaseLoop.apply(this, arguments);
			};
			
			game.phaseLoop = function(player){
				game.broadcastAll(function(firstAction){
					var cur;
					for (var i = 0; i < game.players.length; i++) {
						cur = game.players[i];
						if (!cur.node.seat) cur.node.seat = decadeUI.dialog.create('seat', cur);
						
						cur.seat = get.distance(firstAction, cur, 'absolute') + 1;
						cur.node.seat.innerHTML = get.cnNumber(cur.seat, true);
					}
				}, player);
				
				return base.game.phaseLoop.apply(this, arguments);
			};
			
			game.loop = function(){
				var event = _status.event;
				
				if (!decadeUI.eventDialog) {
					game.loopLocked = true;
					base.game.loop.apply(this, arguments);
					game.loopLocked = false;
				} else {
					decadeUI.game.wait();
				}
			};
			
			game.check = function(event){
				var i, j, range;
				if (event == undefined) event = _status.event;
				var custom = event.custom || {};
				var ok = true,
				auto = true;
				var player = event.player;
				var auto_confirm = lib.config.auto_confirm;
				var players = game.players.slice(0);
				if (event.deadTarget) players.addArray(game.dead);
				if (!event.filterButton && !event.filterCard && !event.filterTarget && (!event.skill || !event._backup)) {
					if (event.choosing) {
						_status.imchoosing = true;
					}
					return;
				}
				player.node.equips.classList.remove('popequip');
				if (event.filterButton) {
					var dialog = event.dialog;
					range = get.select(event.selectButton);
					var selectableButtons = false;
					if (event.forceAuto && ui.selected.buttons.length == range[1]) auto = true;
					else if (range[0] != range[1] || range[0] > 1) auto = false;
					for (i = 0; i < dialog.buttons.length; i++) {
						if (dialog.buttons[i].classList.contains('unselectable')) continue;
						if (event.filterButton(dialog.buttons[i], player) && lib.filter.buttonIncluded(dialog.buttons[i])) {
							if (ui.selected.buttons.length < range[1]) {
								dialog.buttons[i].classList.add('selectable');
							} else if (range[1] == -1) {
								dialog.buttons[i].classList.add('selected');
								ui.selected.buttons.add(dialog.buttons[i]);
							} else {
								dialog.buttons[i].classList.remove('selectable');
							}
						} else {
							dialog.buttons[i].classList.remove('selectable');
							if (range[1] == -1) {
								dialog.buttons[i].classList.remove('selected');
								ui.selected.buttons.remove(dialog.buttons[i]);
							}
						}
						if (dialog.buttons[i].classList.contains('selected')) {
							dialog.buttons[i].classList.add('selectable');
						} else if (!selectableButtons && dialog.buttons[i].classList.contains('selectable')) {
							selectableButtons = true;
						}
					}
					if (ui.selected.buttons.length < range[0]) {
						if (!event.forced || selectableButtons) {
							ok = false;
						}
						if (event.complexSelect || event.getParent().name == 'chooseCharacter' || event.getParent().name == 'chooseButtonOL') {
							ok = false;
						}
					}
					if (custom.add.button) {
						custom.add.button();
					}
				}
				if (event.filterCard) {
					if (ok == false) {
						game.uncheck('card');
					} else {
						if (ui.handSpecial) ui.handSpecial.hide();
						var cards = player.getCards(event.position);
						if (event.name == 'chooseToUse' && !_status.connectMode) {
							var skill = event.skill;
							var isHand = event.position == undefined || event.position.indexOf('h') != -1;
							if ((!skill && isHand) || (skill && lib.skill[skill].viewAs && (!lib.skill[skill].selectCard || lib.skill[skill].selectCard > 0) && isHand)) {
								var muniu = player.getEquip(5);
								if (muniu && muniu.cards && muniu.cards.length) {
									lib.skill.muniu_skill.sync(muniu);
									cards = cards.concat(player.getEquip(5).cards);
									ui.handSpecial.reset(player.getEquip(5).cards);
									ui.handSpecial.show();
								}
							}
						}
						
						var firstCheck = false;
						range = get.select(event.selectCard);
						if (!event._cardChoice && typeof event.selectCard != 'function' && !event.complexCard && range[1] != -1 && !lib.config.compatiblemode) {
							event._cardChoice = [];
							firstCheck = true;
						}
						if (event.isMine() && event.name == 'chooseToUse' && event.parent.name == 'phaseUse' && !event.skill && !event._targetChoice && !firstCheck && window.Map && !lib.config.compatiblemode) {
							event._targetChoice = new Map();
							for (var i = 0; i < event._cardChoice.length; i++) {
								if (!lib.card[event._cardChoice[i].name].complexTarget) {
									var targets = [];
									for (var j = 0; j < players.length; j++) {
										if (event.filterTarget(event._cardChoice[i], player, players[j])) {
											targets.push(players[j]);
										}
									}
									event._targetChoice.set(event._cardChoice[i], targets);
								}
							}
						}
						var selectableCards = false;
						if (range[0] != range[1] || range[0] > 1) auto = false;
						for (i = 0; i < cards.length; i++) {
							if (lib.config.cardtempname != 'off') {
								var cardname = get.name(cards[i]);
								if (cards[i].name != cardname) {
									if (!cards[i]._tempName) {
										cards[i]._tempName = ui.create.div('.tempname', cards[i]);
									} 
									
									var tempname = get.translation(cardname);
									var nature = get.nature(cards[i]);
									
									if (nature) {
										cards[i]._tempName.dataset.nature = nature;
										if (cardname == 'sha') {
											tempname = get.translation(nature) + tempname;
										}
									}
									
									cards[i]._tempName.innerHTML = '<div>' + tempname + '</div>';
									cards[i]._tempName.tempname = tempname;
								}
							}
							var nochess = true;
							if (!lib.filter.cardAiIncluded(cards[i])) {
								nochess = false;
							} else if (event._cardChoice && !firstCheck) {
								if (!event._cardChoice.contains(cards[i])) {
									nochess = false;
								}
							} else {
								if (player.isOut() || !lib.filter.cardRespondable(cards[i], player) || cards[i].classList.contains('uncheck') || !event.filterCard(cards[i], player)) {
									nochess = false;
								}
							}
							if (nochess) {
								if (ui.selected.cards.length < range[1]) {
									cards[i].classList.add('selectable');
									if (event._cardChoice && firstCheck) {
										event._cardChoice.push(cards[i]);
									}
								} else if (range[1] == -1) {
									cards[i].classList.add('selected');
									cards[i].updateTransform(true);
									ui.selected.cards.add(cards[i]);
								} else {
									cards[i].classList.remove('selectable');
								}
							} else {
								cards[i].classList.remove('selectable');
								if (range[1] == -1) {
									cards[i].classList.remove('selected');
									cards[i].updateTransform();
									ui.selected.cards.remove(cards[i]);
								}
							}
							if (cards[i].classList.contains('selected')) {
								cards[i].classList.add('selectable');
							} else if (!selectableCards && cards[i].classList.contains('selectable')) {
								selectableCards = true;
							}
						}
						if (ui.selected.cards.length < range[0]) {
							if (!event.forced || selectableCards || event.complexSelect) {
								ok = false;
							}
						}

						// if (lib.config.popequip && get.is.phoneLayout() && typeof event.position == 'string' && event.position.indexOf('e') != -1 && player.node.equips.querySelector('.card.selectable')) {
							// player.node.equips.classList.add('popequip');
							// auto_confirm = false;
						// }
					}
					if (custom.add.card) {
						custom.add.card();
					}
				}
				if (event.filterTarget) {
					if (ok == false) {
						game.uncheck('target');
					} else {
						var card = get.card();
						var firstCheck = false;
						range = get.select(event.selectTarget);
						var selectableTargets = false;
						if (range[0] != range[1] || range[0] > 1) auto = false;
						for (i = 0; i < players.length; i++) {
							var nochess = true;
							if (game.chess && !event.chessForceAll && player && get.distance(player, players[i], 'pure') > 7) {
								nochess = false;
							} else if (players[i].isOut()) {
								nochess = false;
							} else if (event._targetChoice && event._targetChoice.has(card)) {
								var targetChoice = event._targetChoice.get(card);
								if (!Array.isArray(targetChoice) || !targetChoice.contains(players[i])) {
									nochess = false;
								}
							} else if (!event.filterTarget(card, player, players[i])) {
								nochess = false;
							}
							if (nochess) {
								if (ui.selected.targets.length < range[1]) {
									players[i].classList.add('selectable');
									if (Array.isArray(event._targetChoice)) {
										event._targetChoice.push(players[i]);
									}
								} else if (range[1] == -1) {
									players[i].classList.add('selected');
									ui.selected.targets.add(players[i]);
								} else {
									players[i].classList.remove('selectable');
								}
							} else {
								players[i].classList.remove('selectable');
								if (range[1] == -1) {
									players[i].classList.remove('selected');
									ui.selected.targets.remove(players[i]);
								}
							}
							
							if (players[i].classList.contains('selected')) {
								players[i].classList.add('selectable');
							} else if (!selectableTargets && players[i].classList.contains('selectable')) {
								selectableTargets = true;
							}
							
							if (players[i].classList.contains('selected') || players[i].classList.contains('selectable')) {
								players[i].classList.remove('un-selectable');
							} else {
								players[i].classList.add('un-selectable');
							}
							
							if (players[i].instance) {
								if (players[i].classList.contains('selected')) {
									players[i].instance.classList.add('selected');
								} else {
									players[i].instance.classList.remove('selected');
								}
								if (players[i].classList.contains('selectable')) {
									players[i].instance.classList.add('selectable');
								} else {
									players[i].instance.classList.remove('selectable');
								}
							}
						}
						if (ui.selected.targets.length < range[0]) {
							if (!event.forced || selectableTargets || event.complexSelect) {
								ok = false;
							}
						}
						if (range[1] == -1 && ui.selected.targets.length == 0 && event.targetRequired) {
							ok = false;
						}
					}
					if (custom.add.target) {
						custom.add.target();
					}
				}
				if (!event.skill && get.noSelected() && !_status.noconfirm) {
					var skills = [],
					enable,
					info;
					var skills2;
					if (event._skillChoice) {
						skills2 = event._skillChoice;
						for (var i = 0; i < skills2.length; i++) {
							if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
								skills.push(skills2[i]);
							}
						}
					} else {
						var skills2;
						if (get.mode() == 'guozhan' && player.hasSkillTag('nomingzhi', false, null, true)) {
							skills2 = player.getSkills(false, true, false);
						} else {
							skills2 = player.getSkills(true, true, false);
						}
						skills2 = game.filterSkills(skills2.concat(lib.skill.global), player);
						event._skillChoice = [];
						game.expandSkills(skills2);
						for (i = 0; i < skills2.length; i++) {
							info = get.info(skills2[i]);
							enable = false;
							if (typeof info.enable == 'function') enable = info.enable(event);
							else if (typeof info.enable == 'object') enable = info.enable.contains(event.name);
							else if (info.enable == 'phaseUse') enable = (event.type == 'phase');
							else if (typeof info.enable == 'string') enable = (info.enable == event.name);
							if (enable) {
								if (info.filter) {
									if (info.filterCard && info.selectCard && info.selectCard < 1) if (ui.handSpecial) ui.handSpecial.ignored = true;
									enable = info.filter(event, player);
									if (ui.handSpecial) ui.handSpecial.ignored = false;
								} 
								if (info.viewAs && event.filterCard && !event.filterCard(info.viewAs, player, event)) enable = false;
								if (info.viewAs && info.viewAsFilter && info.viewAsFilter(player) == false) enable = false;
								if (info.usable && get.skillCount(skills2[i]) >= info.usable) enable = false;
								if (info.chooseButton && _status.event.noButton) enable = false;
								if (info.round && (info.round - (game.roundNumber - player.storage[skills2[i] + '_roundcount']) > 0)) enable = false;
							}
							
							if (enable) {
								if (event.isMine() || !event._aiexclude.contains(skills2[i])) {
									skills.add(skills2[i]);
								}
								event._skillChoice.add(skills2[i]);
							}
						}
					}

					var globalskills = [];
					var globallist = lib.skill.global.slice(0);
					game.expandSkills(globallist);
					for (var i = 0; i < skills.length; i++) {
						if (globallist.contains(skills[i])) {
							globalskills.push(skills.splice(i--, 1)[0]);
						}
					}
					var equipskills = [];
					var ownedskills = player.getSkills(true, false);
					game.expandSkills(ownedskills);
					for (var i = 0; i < skills.length; i++) {
						if (!ownedskills.contains(skills[i])) {
							equipskills.push(skills.splice(i--, 1)[0]);
						}
					}
					if (equipskills.length) {
						ui.create.skills3(equipskills);
					} else if (ui.skills3) {
						ui.skills3.close();
					}
					if (skills.length) {
						ui.create.skills(skills);
					} else if (ui.skills) {
						ui.skills.close();
					}
					if (globalskills.length) {
						ui.create.skills2(globalskills);
					} else if (ui.skills2) {
						ui.skills2.close();
					}
				} else {
					if (ui.skills) {
						ui.skills.close()
					}
					if (ui.skills2) {
						ui.skills2.close()
					}
					if (ui.skills3) {
						ui.skills3.close()
					}
				}
				_status.multitarget = false;
				var skillinfo = get.info(_status.event.skill);
				if (_status.event.name == 'chooseToUse') {
					if (skillinfo && skillinfo.multitarget && !skillinfo.multiline) {
						_status.multitarget = true;
					}
					if ((skillinfo && skillinfo.viewAs) || !_status.event.skill) {
						var cardinfo = get.info(get.card());
						if (cardinfo && cardinfo.multitarget && !cardinfo.multiline) {
							_status.multitarget = true;
						}
					}
				} else if (_status.event.multitarget) {
					_status.multitarget = true;
				}
				if (event.isMine()) {
					if (game.chess && game.me && get.config('show_distance')) {
						for (var i = 0; i < players.length; i++) {
							if (players[i] == game.me) {
								players[i].node.action.hide();
							} else {
								players[i].node.action.show();
								var dist = get.distance(game.me, players[i], 'pure');
								var dist2 = get.distance(game.me, players[i]);
								players[i].node.action.innerHTML = '距离：' + dist2 + '/' + dist;
								if (dist > 7) {
									players[i].node.action.classList.add('thunder');
								} else {
									players[i].node.action.classList.remove('thunder');
								}
							}
						}
					}
					if (ok && auto && (auto_confirm || (skillinfo && skillinfo.direct)) && (!_status.mousedragging || !_status.mouseleft) && !_status.mousedown && !_status.touchnocheck) {
						if (ui.confirm) {
							if (!skillinfo || !skillinfo.preservecancel) {
								ui.confirm.close();
							}
						}
						if (skillinfo && skillinfo.preservecancel && !ui.confirm) {
							ui.create.confirm('c');
						}
						if (event.skillDialog == true) event.skillDialog = false;
						ui.click.ok();
						_status.mousedragging = null;
					} else {
						ui.arena.classList.add('selecting');
						if (event.filterTarget && (!event.filterCard || !event.position || (typeof event.position == 'string' && event.position.indexOf('e') == -1))) {
							ui.arena.classList.add('tempnoe');
						}
						game.countChoose();
						if (!_status.noconfirm && !_status.event.noconfirm) {
							if (!_status.mousedown || _status.mouseleft) {
								var str = '';
								if (ok) str += 'o';
								if (!event.forced && !event.fakeforce && get.noSelected()) str += 'c';
								ui.create.confirm(str);
							}
						}
					}
					if (ui.confirm && ui.confirm.lastChild.link == 'cancel') {
						if (_status.event.type == 'phase' && !_status.event.skill) {
							ui.confirm.lastChild.innerHTML = '结束';
						} else {
							ui.confirm.lastChild.innerHTML = '取消';
						}
					}
				}
				return ok;
			};
			
			game.uncheck = function(){
			    var target = arguments.length == 0;
			    for (var i = 0; i < arguments.length; i++){
			        if (arguments[i] === 'target'){
			            target = true;
			            break;
			        }
			    }
			    
			    if (target){
			        for (var i = 0; i < game.players.length; i++){
			            game.players[i].classList.remove('un-selectable');
			        }
			    }
			    
				if (ui.handSpecial) {
					var args = Array.from(arguments);
				
					if ((!args.length || args.contains('card')) && _status.event.player) {
						ui.handSpecial.hide();
					}
				}
				
			    var result = gameUncheckFunction.apply(this, arguments);
			    return result;
			};
			
			game.swapPlayer = function(player, player2){
			    var result = swapPlayerFunction.call(this, player, player2);
    			if (game.me && game.me != ui.equipsZone.me) {
			        ui.equipsZone.me.appendChild(ui.equipsZone.equips);
			        ui.equipsZone.me = game.me;
				    ui.equipsZone.equips = game.me.node.equips;
					ui.equipsZone.appendChild(game.me.node.equips);
			    }
			    
			    return result;
			};
			
			game.swapControl = function(player){
    			var result = swapControlFunction.call(this, player);
    			if (game.me && game.me != ui.equipsZone.me) {
			        ui.equipsZone.me.appendChild(ui.equipsZone.equips);
			        ui.equipsZone.me = game.me;
				    ui.equipsZone.equips = game.me.node.equips;
					ui.equipsZone.appendChild(game.me.node.equips);
			    }
			    return result;
			};
			
			game.linexy = function(path){
				if (!decadeUI.config.playerLineEffect) return gameLinexyFunction.apply(this, arguments);
				decadeUI.effect.line(path);
			};
			
			ui.click.intro = function(e){
				if (this.classList.contains('infohidden') || _status.dragged) return;
                _status.clicked = true;
                if (this.classList.contains('player') && !this.name) return;
                if (this.parentNode == ui.historybar){
                    if (ui.historybar.style.zIndex == '22'){
                        if (_status.removePop){
                            if (_status.removePop(this) == false) return;
                        } else {
                            return;
                        }
                    }
                    ui.historybar.style.zIndex = 22;
                }
				
                var uiintro = uiintro || get.nodeintro(this, false, e);
                if (!uiintro) return;
                uiintro.classList.add('popped');
                uiintro.classList.add('static');
                ui.window.appendChild(uiintro);
                var layer = ui.create.div('.poplayer', ui.window);
                var clicklayer = function(e){
                    if (_status.touchpopping) return;
                    delete _status.removePop;
                    uiintro.delete();
                    this.remove();
                    ui.historybar.style.zIndex = '';
                    delete _status.currentlogv;
                    if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                    if (e && e.stopPropagation) e.stopPropagation();
                    if (uiintro._onclose){
                        uiintro._onclose();
                    }
                    return false;
                };
                
                layer.addEventListener(lib.config.touchscreen ? 'touchend': 'click', clicklayer);
                if (!lib.config.touchscreen) layer.oncontextmenu = clicklayer;
                if (this.parentNode == ui.historybar && lib.config.touchscreen){
                    var rect = this.getBoundingClientRect();
                    e = {
                        clientX: 0,
                        clientY: rect.top + 30
                    };
                }
				
				lib.placePoppedDialog(uiintro, e, this);
				if (this.parentNode == ui.historybar){
					if (lib.config.show_history == 'right'){
						uiintro.style.left = (ui.historybar.offsetLeft - 230) + 'px';
					} else {
						uiintro.style.left = (ui.historybar.offsetLeft + 60) + 'px';
					}
				}
				
				uiintro.style.zIndex = 21;
                var clickintro = function(){
                    if (_status.touchpopping) return;
                    delete _status.removePop;
                    layer.remove();
                    this.delete();
                    ui.historybar.style.zIndex = '';
                    delete _status.currentlogv;
                    if (!ui.arena.classList.contains('menupaused') && !uiintro.noresume) game.resume2();
                    if (uiintro._onclose){
                        uiintro._onclose();
                    }
                };
                var currentpop = this;
                _status.removePop = function(node){
                    if (node == currentpop) return false;
                    layer.remove();
                    uiintro.delete();
                    _status.removePop = null;
                    return true;
                };
                if (uiintro.clickintro){
                    uiintro.listen(function(){
                        _status.clicked = true;
                    });
                    uiintro._clickintro = clicklayer;
                } else if (!lib.config.touchscreen){
                    uiintro.addEventListener('mouseleave', clickintro);
                    uiintro.addEventListener('click', clickintro);
                } else if (uiintro.touchclose){
                    uiintro.listen(clickintro);
                }
                uiintro._close = clicklayer;
            
                game.pause2();
                return uiintro;
            };
            
            ui.click.identity = function(e){
                if (_status.dragged) return;
                _status.clicked = true;
                if (!game.getIdentityList) return;
                if (_status.video) return;
                if (this.parentNode.forceShown) return;
                if (_status.clickingidentity) {
                    for (var i = 0; i < _status.clickingidentity[1].length; i++) {
                        _status.clickingidentity[1][i].delete();
                        _status.clickingidentity[1][i].style.transform = '';
                    }
                    if (_status.clickingidentity[0] == this.parentNode) {
                        delete _status.clickingidentity;
                        return;
                    }
                }
                var list = game.getIdentityList(this.parentNode);
                if (!list) return;
                if (lib.config.mark_identity_style == 'click') {
                    var list2 = [];
                    for (var i in list) {
                        list2.push(i);
                    }
                    list2.push(list2[0]);
                    for (var i = 0; i < list2.length; i++) {
                        if (this.firstChild.innerHTML == list[list2[i]]) {
                            this.firstChild.innerHTML = list[list2[i + 1]];
                            this.dataset.color = list2[i + 1];
                            break;
                        }
                    }
                } else {
                    if (get.mode() == 'guozhan') {
                        list = {
                            wei: '魏',
                            shu: '蜀',
                            wu: '吴',
                            qun: '群'
                        };
                    }
                    
                    var list2 = get.copy(list);
                    if (game.getIdentityList2) {
                        game.getIdentityList2(list2);
                    }
                    var rect = this.parentNode.getBoundingClientRect();
                    this._customintro = function(uiintro) {
                        if (get.mode() == 'guozhan') {
                            uiintro.clickintro = true;
                        } else {
                            uiintro.touchclose = true;
                        }

                        uiintro.classList.add('woodbg');
                        
                        if (get.is.phoneLayout()) {
                            uiintro.style.width = '100px';
                        } else {
                            uiintro.style.width = '85px';
                        }
                        var source = this.parentNode;
                        for (var i in list) {
                            var node = ui.create.div();
                            node.classList.add('guessidentity');
                            node.classList.add('pointerdiv');
                            ui.create.div('.menubutton.large', list2[i], node);
                            if (!get.is.phoneLayout()) {
                                node.firstChild.style.fontSize = '24px';
                                node.firstChild.style.lineHeight = '24px';
                            }
                            if (get.mode() == 'guozhan') {
                                if (source._guozhanguess) {
                                    if (!source._guozhanguess.contains(i)) {
                                        node.classList.add('transparent');
                                    }
                                }
                                node._source = source;
                                node.listen(ui.click.identitycircle);
                            } else {
                                node.listen(function() {
                                    var info = this.link;
                                    info[0].parentNode.setIdentity(info[2]);
                                    /*
                                    info[0].firstChild.innerHTML = info[1];
                                    info[0].dataset.color = info[2];
                                    */
                                    _status.clicked = false;
                                });
                            }
                            
                            node.link = [this, list[i], i];
                            uiintro.add(node);
                        }
                    };
                    ui.click.touchpop();
                    ui.click.intro.call(this, {
                        clientX: (rect.left + rect.width) * game.documentZoom,
                        clientY: (rect.top) * game.documentZoom
                    });
                }
            };
			
			ui.click.skill = function(skill){
				var info = get.info(skill);
				var event = _status.event;
				event.backup(skill);
				if (info.filterCard && info.discard != false && info.lose != false && !info.viewAs) {
					var cards = event.player.getCards(event.position);
					for (var i = 0; i < cards.length; i++) {
						if (!lib.filter.cardDiscardable(cards[i], event.player)) {
							cards[i].uncheck('useSkill');
						}
					}
				}
				if (typeof event.skillDialog == 'object') {
					event.skillDialog.close();
				}
				if (event.isMine()) {
					event.skillDialog = true;
				}
				game.uncheck();
				game.check();
				if (event.skillDialog) {
					var str = '【' + get.translation(skill) + '】';
					if (info.prompt) {
						if (typeof info.prompt == 'function') {
							str += info.prompt(event);
						} else {
							str += info.prompt;
						}
						
						event.skillDialog = ui.create.dialog(str);
						if (info.longprompt) {
							event.skillDialog.forcebutton = true;
							ui.update();
						}
					} else if (info.promptfunc) {
						event.skillDialog = ui.create.dialog(str, '<div><div style="width:100%">' + info.promptfunc(event, event.player) + '</div></div>');
					} else if (lib.translate[skill + '_info']) {
						var dialog = ui.create.dialog(str);
						var skillInfo = decadeUI.dialog.create('skill-info', dialog);
						skillInfo.innerHTML = lib.translate[skill + '_info'];
						event.skillDialog = dialog;
					}
				}
			};
			
			ui.create.pause = function(){
				var dialog = createPauseFunction.call(this);
				dialog.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
				return dialog;
			};
				
			ui.clear = function(){
				game.addVideo('uiClear');
				var nodes = document.getElementsByClassName('thrown');
				for(var i = nodes.length - 1; i >= 0; i--){
				    if (nodes[i].fixed)
				        continue;
				    
				    if (nodes[i].classList.contains('card')){
				        decadeUI.layout.clearout(nodes[i]);
					}else{
					    nodes[i].delete();
					}
				}
			};
			
			if ((typeof ui.create.menu) == 'function') {
				var str = ui.create.menu.toString();
				str = str.substring(str.indexOf('{'));
				str = str.replace(/game.documentZoom/g, '1');
				createMenuFunction = new Function('connectMenu', '_status','lib','game','ui','get','ai', str);
			}
			
			ui.create.menu = function(connectMenu){
				return createMenuFunction.call(this, connectMenu, _status, lib, game, ui, get, ai);
			};
			
			ui.create.arena = function(){
				ui.updatez();
				var result = createArenaFunction.apply(this, arguments);
				ui.arena.classList.remove('slim_player'); 
				ui.arena.classList.remove('uslim_player');
				ui.arena.classList.remove('mslim_player');
				ui.arena.classList.remove('lslim_player');
				ui.arena.classList.remove('oldlayout');
				ui.arena.classList.remove('mobile');
				
				decadeUI.config.update();
			    return result;
			};
			
			ui.create.me = function(hasme){
				ui.arena.dataset.layout = game.layout;
				
				ui.mebg = ui.create.div('#mebg', ui.arena);
				ui.me = decadeUI.dialog.create('hand-zone', ui.arena);
				ui.handcards1Container = decadeUI.dialog.create('hand-cards', ui.me);
				ui.handcards2Container = ui.create.div('#handcards2', ui.me);
				ui.arena.classList.add('decadeUI');
				ui.arena.classList.remove('nome');
				var equipsZone = decadeUI.dialog.create('equips-zone', ui.arena);
				var equipsBack = decadeUI.dialog.create('equips-back', equipsZone);
				ui.equipsZone = equipsZone;
				decadeUI.dialog.create('equip0', equipsBack);
				decadeUI.dialog.create('equip1', equipsBack);
				decadeUI.dialog.create('equip2', equipsBack);
				decadeUI.dialog.create('equip3', equipsBack);
				decadeUI.dialog.create('equip4', equipsBack);
				
				ui.handSpecial = decadeUI.dialog.create('hand-special playerfocus', ui.arena);
				ui.handSpecial.hide();
				
				var properties = {
					handSpecial:{
						cards: decadeUI.dialog.create('special cards', ui.handSpecial),
						reset:function(cards){
							var elements = ui.handSpecial.cards.childNodes;
							for (var i = elements.length - 1; i >= 0; i--) {
								if (cards && cards.contains(elements[i])) continue;
								ui.special.appendChild(elements[i]);
							}
							
							if (cards && cards.length) {
								for (var i = 0; i < cards.length; i++) {
									if (cards[i]) ui.handSpecial.cards.appendChild(cards[i]);
								}
							}
						},
					}
				};
				
				
				for (var key in properties.handSpecial) {
					ui.handSpecial[key] = properties.handSpecial[key];
				}
				
				decadeUI.resizeSensor.create(ui.me, decadeUI.layout.onResize);
				decadeUI.layout.onResize();
				
				if(lib.config.mousewheel && !lib.config.touchscreen){
					ui.handcards1Container.onmousewheel = ui.click.mousewheel;
					ui.handcards2Container.onmousewheel = ui.click.mousewheel;
				}
				
				ui.handcards1Container.ontouchstart = ui.click.touchStart;
				ui.handcards2Container.ontouchstart = ui.click.touchStart;
				ui.handcards1Container.ontouchmove = ui.click.touchScroll;
				ui.handcards2Container.ontouchmove = ui.click.touchScroll;
				ui.handcards1Container.style.WebkitOverflowScrolling = 'touch';
				ui.handcards2Container.style.WebkitOverflowScrolling = 'touch';

				if(hasme && game.me){
					ui.handcards1 = game.me.node.handcards1;
					ui.handcards2 = game.me.node.handcards2;
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);
				}
				else if(game.players.length){
					game.me = game.players[0];
					ui.handcards1 = game.me.node.handcards1;
					ui.handcards2 = game.me.node.handcards2;
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);
				}
				
				if (game.me){
				    equipsZone.me = game.me;
				    equipsZone.equips = game.me.node.equips;
					equipsZone.appendChild(game.me.node.equips);
				}
			};
			
			ui.create.player = function(position, noclick){
				var player = createPlayerFunction.call(this, position, noclick);
				var zoneCamp = decadeUI.dialog.create('camp-zone');
				var zoneHp = decadeUI.dialog.create('hp-zone');
				
				player.insertBefore(zoneCamp, player.node.name);
				player.insertBefore(zoneHp, player.node.hp);
				player.node.zoneCamp = zoneCamp;
				player.node.zoneHp = zoneHp;
				zoneHp.appendChild(player.node.hp);
				
				var campProps = {
					node:{
						back: decadeUI.dialog.create('camp-back', zoneCamp),
						border: decadeUI.dialog.create('camp-border', zoneCamp),
						campName: decadeUI.dialog.create('camp-name', zoneCamp),
						avatarName: player.node.name,
						avatarDefaultName: decadeUI.dialog.create('avatar-name-default', zoneCamp),
					}
				};
				
				for (var key in campProps) zoneCamp[key] = campProps[key];
				
				zoneCamp.appendChild(player.node.name);
				zoneCamp.node.avatarName.className = 'avatar-name';
				zoneCamp.node.avatarDefaultName.innerHTML = '主<br>将';
				
				var node = {
					mask: player.insertBefore(decadeUI.dialog.create('mask'), player.node.identity),
					gainSkill: decadeUI.dialog.create('gain-skill', player),
				}
				
				var properties = {
					gainSkill:{
						player: player,
						gain:function(skill){
							var sender = this;
							
							if (!sender.skills) sender.skills = [];
							if (!sender.skills.contains(skill) && lib.translate[skill]) {
								var info = lib.skill[skill];
								if(!info || info.charlotte || info.sub || (info.mark && !info.limited) || (info.nopop || info.popup === false)) return;
								if (info.onremove && game.me != this.player.storage[skill]) return;
							
								sender.skills.push(skill);
								var html = '';
								for (var i = 0; i < sender.skills.length; i++) {
									html += '[' + lib.translate[sender.skills[i]] + ']';
								}
								
								sender.innerHTML = html;
							}
						},
						lose:function(skill){
							var sender = this;
							var index = sender.skills.indexOf(skill);
							if (index >= 0) {
								sender.skills.splice(index, 1);
								var html = '';
								for (var i = 0; i < sender.skills.length; i++) {
									html += '[' + get.translation(sender.skills[i]) + ']';
								}
								
								sender.innerHTML = html;
							}
						},
					},
				};
				
				for (var key in properties.gainSkill) {
					node.gainSkill[key] = properties.gainSkill[key];
				}
				
				for (var i in node) {
					player.node[i] = node[i];
				}
				
				Object.defineProperties(player, {
					group: {
						configurable: true,
						get:function(){
							return this.node.zoneCamp.dataset.camp;
						},
						set:function(value){
							this.node.zoneCamp.dataset.camp = value;
							
							if (value){
								if (decadeUI.config.campIdentityImageMode){
								    var that = this;
									var image = new Image();
									var url = extensionPath + 'image/decoration/name_' + value + '.webp';
								    that._finalGroup = value;
									
								    image.onerror = function(){
								        that.node.zoneCamp.node.campName.innerHTML = that._finalGroup ? get.translation(that._finalGroup)[0] : '';
								    };
								    
								    that.node.zoneCamp.node.campName.innerHTML = '';
								    that.node.zoneCamp.node.campName.style.backgroundImage = 'url("' + url + '")';
									image.src = url;
									
								    return;
								}
								
								this.node.zoneCamp.node.campName.innerHTML = value ? get.translation(value)[0] : '';
							}
						}
					}
				});
				
				return player;
			};
			
			ui.create.card = function(position, info, noclick){
				var card = createCardFunction.call(this, position, info, noclick);
				
				card.node.judgeMark = decadeUI.dialog.create('judge-mark', card);
				card.node.usedInfo = decadeUI.dialog.create('used-info', card);
				card.node.cardMask = decadeUI.dialog.create('card-mask', card);
				
				card.node.judgeMark.node = {
					back: decadeUI.dialog.create('back', card.node.judgeMark),
					mark: decadeUI.dialog.create('mark', card.node.judgeMark),
					judge: decadeUI.dialog.create('judge', card.node.judgeMark)
				};

				return card;
			};

			ui.create.cards = function(){
				var retval = base.ui.create.cards.apply(this, arguments);
				game.updateRoundNumber();
				return retval;
			};
			
			lib.init.cssstyles = function(){
			    var temp = lib.config.glow_phase;
			    lib.config.glow_phase = '';
			    initCssstylesFunction.call(this);
			    lib.config.glow_phase = temp;
				ui.css.styles.sheet.insertRule('.avatar-name, .avatar-name-default { font-family: "' + (lib.config.name_font || 'xinkai') + '", "xinwei" }', 0);
			};

			lib.init.layout = function(layout, nosave){
			    if (!nosave) game.saveConfig('layout',layout);
				game.layout = layout;

				var relayout = function(){
					ui.arena.dataset.layout = game.layout;
					if(get.is.phoneLayout()){
						ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
						ui.arena.classList.add('phone');
					}
					else{
						ui.css.phone.href = '';
						ui.arena.classList.remove('phone');
					}
					
					for (var i = 0; i < game.players.length; i++) {
						if (get.is.linked2(game.players[i])) {
							if (game.players[i].classList.contains('linked')) {
								game.players[i].classList.remove('linked');
								game.players[i].classList.add('linked2');
							}
						} else {
							if (game.players[i].classList.contains('linked2')) {
								game.players[i].classList.remove('linked2');
								game.players[i].classList.add('linked');
							}
						}
					}
					
					ui.updatej();
					ui.updatem();
					setTimeout(function(){
						if (game.me) game.me.update();
						setTimeout(function(){
							ui.updatex();
						}, 500);
						
						setTimeout(function(){
							ui.updatec();
						}, 1000);
					}, 100);
				};
				
				setTimeout(relayout, 500);
			};
			
			lib.skill._usecard = {
				trigger: { global: 'useCardAfter' },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(event){
					return ui.clear.delay === 'usecard' && event.card.name != 'wuxie';
				},
				content:function(){
					ui.clear.delay = false;
    				game.broadcastAll(function(){
    					ui.clear();
    				});
				}
			},
			
			lib.skill._decadeUI_usecardBegin = {
				trigger:{ global:'useCardBegin' },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(event){
				    return !ui.clear.delay && event.card.name != 'wuxie';
				},
				content:function(){
					ui.clear.delay = 'usecard';
				}
			};
	        
	        lib.skill._discard = {
				trigger: { global: ['discardAfter'] },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(event){
					return ui.todiscard[event.discardid] ? true : false;
				},
				content:function(){
					game.broadcastAll(function(id){
    					if (window.decadeUI){
    					    ui.todiscard = [];
    					    ui.clear();
    					    return;
    					}
    						
    					var todiscard = ui.todiscard[id];
    					delete ui.todiscard[id];
    					if (todiscard){
    						var time = 1000;
    						if (typeof todiscard._discardtime == 'number'){
    							time += todiscard._discardtime - get.time();
    						}
    						if (time < 0){
    							time = 0;
    						}
    						setTimeout(function(){
    							for (var i = 0; i < todiscard.length; i++){
    								todiscard[i].delete();
    							}
    						},
    						time);
    					}
    				}, trigger.discardid);
				}
			};
			
			lib.skill._decadeUI_gameStartEffect = {
				trigger:{ global:'gameStart' },
				forced: true,
				popup: false,
				priority: -100,
				filter:function(){
					return !lib.skill._decadeUI_gameStartEffect.played;
				},
				content:function(){
					lib.skill._decadeUI_gameStartEffect.played = true;
					if (!decadeUI.config.gameStartEffect) return;
					decadeUI.effect.gameStart();
				}
			};
			
			lib.skill._decadeUI_dieKillEffect = {
				trigger:{ source:['dieBegin'] },
				forced: true,
				popup: false,
				priority: -100,
				content:function(){
					if (!(trigger.source && trigger.player)) return;
					game.broadcastAll(function(source, player){
						if (!window.decadeUI) return;
						if (!decadeUI.config.playerKillEffect) return;
						decadeUI.effect.kill(source, player);
					}, trigger.source, trigger.player);
				}
			};
			
			lib.element.content.addJudge = function(){
				"step 0";
				if (cards){
					var owner = get.owner(cards[0]);
					if (owner){
						owner.lose(cards, 'visible');
					}
				};
				"step 1";
				if (cards[0].destroyed){
					if (player.hasSkill(cards[0].destroyed)){
						delete cards[0].destroyed;
					} else {
						event.finish();
						return;
					}
				}
				cards[0].fix();
				cards[0].style.transform = '';
				cards[0].classList.remove('drawinghidden');
				cards[0]._transform = null;
				
				var viewAs = typeof card == 'string' ? card: card.name;
				if (!lib.card[viewAs] || !lib.card[viewAs].effect){
					game.cardsDiscard(cards[0]);
				} else {
					cards[0].style.transform = '';
					player.node.judges.insertBefore(cards[0], player.node.judges.firstChild);
					if (_status.discarded){
						_status.discarded.remove(cards[0]);
					}
					ui.updatej(player);
					game.broadcast(function(player, card, viewAs){
						card.fix();
						card.style.transform = '';
						card.classList.add('drawinghidden');
						card.viewAs = viewAs;
						if (viewAs && viewAs != card.name){
							if (window.decadeUI){
								card.classList.add('fakejudge');
								card.node.judgeMark.node.judge.innerHTML = get.translation(viewAs)[0];
								
							}else if (card.classList.contains('fullskin') || card.classList.contains('fullborder')){
								card.classList.add('fakejudge');
								card.node.background.innerHTML = lib.translate[viewAs+'_bg'] || get.translation(viewAs)[0];
							}
						} else {
							card.classList.remove('fakejudge');
							if (window.decadeUI) card.node.judgeMark.node.judge.innerHTML = get.translation(card.name)[0];
						}
						
						player.node.judges.insertBefore(card, player.node.judges.firstChild);
						ui.updatej(player);
						if (card.clone && (card.clone.parentNode == player.parentNode || card.clone.parentNode == ui.arena)){
							card.clone.moveDelete(player);
							game.addVideo('gain2', player, get.cardsInfo([card]));
						}
					}, player, cards[0], viewAs);
					
					if (cards[0].clone && (cards[0].clone.parentNode == player.parentNode || cards[0].clone.parentNode == ui.arena)){
						cards[0].clone.moveDelete(player);
						game.addVideo('gain2', player, get.cardsInfo(cards));
					}

					if (get.itemtype(card) != 'card'){
						if (typeof card == 'string') cards[0].viewAs = card;
						else cards[0].viewAs = card.name;
					} else {
						cards[0].viewAs = null;
					}
					
					if (cards[0].viewAs && cards[0].viewAs != cards[0].name){
						cards[0].classList.add('fakejudge');
						cards[0].node.judgeMark.node.judge.innerHTML = get.translation(cards[0].viewAs)[0];
						game.log(player, '被贴上了<span class="yellowtext">' + get.translation(cards[0].viewAs) + '</span>（', cards, '）');
					} else {
						cards[0].classList.remove('fakejudge');
						cards[0].node.judgeMark.node.judge.innerHTML = get.translation(cards[0].name)[0];
						game.log(player, '被贴上了', cards);
					}
					
					game.addVideo('addJudge', player, [get.cardInfo(cards[0]), cards[0].viewAs]);
				}
			};
			
			lib.element.content.chooseToUse = function(){
				"step 0"
				if (event.responded) return;
				if (game.modeSwapPlayer && !_status.auto && player.isUnderControl() && !lib.filter.wuxieSwap(event)) {
					game.modeSwapPlayer(player);
				}
				var skills = player.getSkills(true);
				game.expandSkills(skills);
				for (var i = 0; i < skills.length; i++) {
					var info = lib.skill[skills[i]];
					if (info && info.onChooseToUse) {
						info.onChooseToUse(event);
					}
				}
				_status.noclearcountdown = true;
				if (event.type == 'phase') {
					if (event.isMine()) {
						event.endButton = ui.create.control('结束回合', 'stayleft',
						function() {
							if (_status.event.skill) {
								ui.click.cancel();
							}
							ui.click.cancel();
						});
						event.fakeforce = true;
					} else {
						if (event.endButton) {
							event.endButton.close();
							delete event.endButton;
						}
						event.fakeforce = false;
					}
				}
				if (event.player.isUnderControl() && !_status.auto) {
					event.result = {
						bool: false
					}
					return;
				} else if (event.isMine()) {
					if (event.type == 'wuxie') {
						if (ui.tempnowuxie) {
							var triggerevent = event.getTrigger();
							if (triggerevent && triggerevent.targets && triggerevent.num == triggerevent.targets.length - 1) {
								ui.tempnowuxie.close();
							}
						}
						if (lib.filter.wuxieSwap(event)) {
							event.result = {
								bool: false
							}
							return;
						}
					}
					var ok = game.check();
					if (!ok || !lib.config.auto_confirm) {
						game.pause();
						if (lib.config.enable_vibrate && player._noVibrate) {
							delete player._noVibrate;
							game.vibrate();
						}
					}
					if (!ok) {
						if (typeof event.prompt == 'string') {
							if (event.openskilldialog) {
								event.skillDialog = ui.create.dialog(event.openskilldialog);
								delete event.openskilldialog;
								event.dialog = event.prompt;
							} else {
								event.dialog = ui.create.dialog(event.prompt + (event.prompt2 ? event.prompt2 : ''));
							}
						} else if (event.prompt == 'function') {
							event.dialog = ui.create.dialog(event.prompt(event));
						} else if (event.prompt == undefined) {
							var str;
							if (typeof event.filterCard == 'object') {
								var filter = event.filterCard;
								str = '请使用' + get.cnNumber(event.selectCard[0]) + '张'
								if (filter.name) {
									str += get.translation(filter.name);
								} else {
									str += '牌';
								}
							} else {
								str = '请选择要使用的牌';
							}
							if (event.openskilldialog) {
								event.skillDialog = ui.create.dialog(event.openskilldialog);
								delete event.openskilldialog;
								event.dialog = str;
							} else if (typeof event.skillDialog != 'string') {

								event.dialog = ui.create.dialog(str);
							} else {

								event.dialog = str;
							}
						}
					}
				} else if (event.isOnline()) {
					event.send();
				} else {
					event.result = 'ai';
				}
				"step 1"
				if (event.result == 'ai') {
					var ok = game.check();
					if (ok) {
						ui.click.ok();
					} else if (ai.basic.chooseCard(event.ai1)) {
						if (ai.basic.chooseTarget(event.ai2)) {
							ui.click.ok();
							event._aiexcludeclear = true;
						} else {
							if (!event.norestore) {
								if (event.skill) {
									var skill = event.skill;
									ui.click.cancel();
									event._aiexclude.add(skill);
									var info = get.info(skill);
									if (info.sourceSkill) {
										event._aiexclude.add(info.sourceSkill);
									}
								} else {
									get.card(true).aiexclude();
									game.uncheck();
								}
								event.redo();
								game.resume();
							} else {
								ui.click.cancel();
							}
						}
					} else if (event.skill && !event.norestore) {
						var skill = event.skill;
						ui.click.cancel();
						event._aiexclude.add(skill);
						var info = get.info(skill);
						if (info.sourceSkill) {
							event._aiexclude.add(info.sourceSkill);
						}
						event.redo();
						game.resume();
					} else {
						ui.click.cancel();
					}
					if (event.aidelay && event.result && event.result.bool) {
						game.delayx();
					}
				}
				"step 2"
				if (event.endButton) {
					event.endButton.close();
					delete event.endButton;
				}
				event.resume();
				if (event.result) {
					if (event.result.skill) {
						var info = get.info(event.result.skill);

						if (info && info.chooseButton) {
							if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
							var dialog = info.chooseButton.dialog(event, player);
							var next = player.chooseButton(dialog);
							next.set('ai', info.chooseButton.check ||
							function() {
								return 1;
							});
							next.set('filterButton', info.chooseButton.filter ||
							function() {
								return true;
							});
							next.set('selectButton', info.chooseButton.select || 1);
							event.buttoned = event.result.skill;
						} else if (info && info.precontent && !game.online) {
							var next = game.createEvent('pre_' + event.result.skill);
							next.setContent(info.precontent);
							next.set('result', event.result);
							next.set('player', player);
						}
					}
				}
				"step 3"
				if (event.buttoned) {
					if (result.bool) {
						var info = get.info(event.buttoned).chooseButton;
						lib.skill[event.buttoned + '_backup'] = info.backup(result.links, player);
						lib.skill[event.buttoned + '_backup'].sourceSkill = event.buttoned;
						if (game.online) {
							event._sendskill = [event.buttoned + '_backup', lib.skill[event.buttoned + '_backup']];
						}
						event.backup(event.buttoned + '_backup');
						if (info.prompt) {
							event.openskilldialog = info.prompt(result.links, player);
						}
					} else {
						ui.control.animate('nozoom', 100);
						event._aiexclude.add(event.buttoned);
					}
					event.goto(0);
					delete event.buttoned;
				}
				"step 4"
				if (event._aiexcludeclear) {
					delete event._aiexcludeclear;
					event._aiexclude.length = 0;
				}
				delete _status.noclearcountdown;
				if (event.skillDialog && get.objtype(event.skillDialog) == 'div') {
					event.skillDialog.close();
				}
				if (event.result && event.result.bool && !game.online && !event.nouse) {
					player.useResult(event.result, event);
				} else if (event._sendskill) {
					event.result._sendskill = event._sendskill;
				}
				if (event.dialog && typeof event.dialog == 'object') event.dialog.close();
				if (!_status.noclearcountdown) {
					game.stopCountChoose();
				}
				"step 5"
				if (event._result && event.result) {
					event.result.result = event._result;
				}
			};
			
			lib.element.content.chooseBool = function(){
				"step 0"
				if (event.isMine()) {
					if (event.frequentSkill && !lib.config.autoskilllist.contains(event.frequentSkill)) {
						ui.click.ok();
						return;
					}
					ui.create.confirm('oc');
					if (event.createDialog && !event.dialog) {
						if (Array.isArray(event.createDialog)) {
							event.dialog = ui.create.dialog.apply(this, event.createDialog);
							if (event.dialogselectx) {
								for (var i = 0; i < event.dialog.buttons.length; i++) {
									event.dialog.buttons[i].classList.add('selectedx');
								}
							}
						}
					}
					if (event.dialog) {
						event.dialog.open();
					} else if (event.prompt) {
						event.dialog = ui.create.dialog(event.prompt);
						if (event.prompt2) {
							var skillInfo = decadeUI.dialog.create('skill-info', event.dialog);
							skillInfo.innerHTML = event.prompt2;
						}
					}
					game.pause();
					game.countChoose();
					event.choosing = true;
				} else if (event.isOnline()) {
					event.send();
				} else {
					event.result = 'ai';
				}
				"step 1"
				if (event.result == 'ai') {
					if (event.ai) {
						event.choice = event.ai(event.getParent(), player);
					}
					event.result = {
						bool: event.choice
					};
				}
				_status.imchoosing = false;
				event.choosing = false;
				if (event.dialog) event.dialog.close();
				event.resume();
			};
			
			lib.element.content.chooseToCompare = function(){
				"step 0"
				if (player.countCards('h') == 0 || target.countCards('h') == 0) {
					event.result = {
						cancelled: true,
						bool: false
					}
					event.finish();
					return;
				}
				game.log(player, '对', target, '发起拼点');
				
				// 更新拼点框
				game.broadcastAll(function(player, target){
					if (!window.decadeUI) return;
					
					decadeUI.effectDialog = ui.arena.appendChild(decadeUI.effect.dialog.compare(player, target));
					decadeUI.delay(400);
				}, player, target);
				
				"step 1"
				var sendback = function() {
					if (_status.event != event) {
						return function() {
							event.resultOL = _status.event.resultOL;
						};
					}
				};
				if (player.isOnline()) {
					player.wait(sendback);
					event.ol = true;
					player.send(function(ai) {
						game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
						game.resume();
					}, event.ai);
				} else {
					event.localPlayer = true;
					player.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = event.ai;
				}
				if (target.isOnline()) {
					target.wait(sendback);
					event.ol = true;
					target.send(function(ai) {
						game.me.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = ai;
						game.resume();
					}, event.ai);
				} else {
					event.localTarget = true;
				}
				"step 2"
				if (event.localPlayer) {
					if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
						result.cards = lib.skill[result.skill].onCompare(player);
						player.logSkill(result.skill);
					}
					event.card1 = result.cards[0];
					
					// 更新拼点框
					game.broadcastAll(function(){
						if (!window.decadeUI) return;
						
						decadeUI.effectDialog.cards[0].classList.add('infohidden');
						decadeUI.effectDialog.cards[0].classList.add('infoflip');
					});
				}
				if (event.localTarget) {
					target.chooseCard('请选择拼点牌', true).set('type', 'compare').set('glow_result', true).ai = event.ai;
				}
				"step 3"
				if (event.localTarget) {
					if (result.skill && lib.skill[result.skill] && lib.skill[result.skill].onCompare) {
						target.logSkill(result.skill);
						result.cards = lib.skill[result.skill].onCompare(target);
					}
					
					event.card2 = result.cards[0];
					
					// 更新拼点框
					game.broadcastAll(function(){
						if (!window.decadeUI) return;
						
						decadeUI.effectDialog.cards[1].classList.add('infohidden');
						decadeUI.effectDialog.cards[1].classList.add('infoflip');
					});
					
				}
				if (!event.resultOL && event.ol) {
					game.pause();
				}
				"step 4"
				try {
					if (!event.card1) {
						if (event.resultOL[player.playerid].skill && lib.skill[event.resultOL[player.playerid].skill] && lib.skill[event.resultOL[player.playerid].skill].onCompare) {
							player.logSkill(event.resultOL[player.playerid].skill);
							event.resultOL[player.playerid].cards = lib.skill[event.resultOL[player.playerid].skill].onCompare(player);
						}
						event.card1 = event.resultOL[player.playerid].cards[0];
						
						// 更新拼点框
						game.broadcastAll(function(){
							if (!window.decadeUI) return;
							
							decadeUI.effectDialog.cards[0].classList.add('infohidden');
							decadeUI.effectDialog.cards[0].classList.add('infoflip');
						});
					};
					if (!event.card2) {
						if (event.resultOL[target.playerid].skill && lib.skill[event.resultOL[target.playerid].skill] && lib.skill[event.resultOL[target.playerid].skill].onCompare) {
							target.logSkill(event.resultOL[target.playerid].skill);
							event.resultOL[target.playerid].cards = lib.skill[target.resultOL[target.playerid].skill].onCompare(player);
						}
						
						event.card2 = event.resultOL[target.playerid].cards[0];
						
						// 更新拼点框
						game.broadcastAll(function(){
							if (!window.decadeUI) return;
							
							decadeUI.effectDialog.cards[1].classList.add('infohidden');
							decadeUI.effectDialog.cards[1].classList.add('infoflip');
						});
					}
					if (!event.card1 || !event.card2) {
						throw ('err');
					}
				} catch(e) {
					console.log(e);
					event.finish();
					return;
				}
				if (event.card2.number >= 10 || event.card2.number <= 4) {
					if (target.countCards('h') > 2) {
						event.addToAI = true;
					}
				}
				player.lose(event.card1, ui.ordering);
				target.lose(event.card2, ui.ordering);
				"step 5"
				game.broadcast(function() {
					ui.arena.classList.add('thrownhighlight');
				});
				ui.arena.classList.add('thrownhighlight');
				game.addVideo('thrownhighlight1');
				
				// 更新拼点框
				game.broadcastAll(function(player, target, card1, card2){
					if (!window.decadeUI) {
						player.$compare(card1, target, card2);
						return;
					}
					
					decadeUI.effectDialog.cards[0].appendChild(card1.copy());
					decadeUI.effectDialog.cards[1].appendChild(card2.copy());
				}, player, target, event.card1, event.card2);

				game.log(player, '的拼点牌为', event.card1);
				game.log(target, '的拼点牌为', event.card2);
				// 更新拼点框
				game.broadcastAll(function(player, target){
					if (!window.decadeUI) return;
					
					var dialog = decadeUI.effectDialog;
					setTimeout(function(player, target, dialog){
						player.$throwordered2(dialog.cards[0].firstChild, true);
						target.$throwordered2(dialog.cards[1].firstChild, true);
						decadeUI.effectDialog.close();
					}, 1500, player, target, dialog);
				}, player, target);
				
				decadeUI.delay(1500);
				
				event.num1 = event.card1.number;
				event.num2 = event.card2.number;
				event.trigger('compare');

				"step 6"
				event.result = {
					player: event.card1,
					target: event.card2,
					num1: event.num1,
					num2: event.num2
				}
				var str;
				if (event.num1 > event.num2) {
					event.result.bool = true;
					event.result.winner = player;
					str = get.translation(player.name) + '拼点成功';
					player.popup('胜');
					target.popup('负');
				} else {
					event.result.bool = false;
					str = get.translation(player.name) + '拼点失败';
					if (event.num1 == event.num2) {
						event.result.tie = true;
						player.popup('平');
						target.popup('平');
					} else {
						event.result.winner = target;
						player.popup('负');
						target.popup('胜');
					}
				}
				game.broadcastAll(function(str) {
					var dialog = ui.create.dialog(str);
					dialog.classList.add('center');
					setTimeout(function() {
						dialog.close();
					},
					1000);
				}, str); 
				game.delay(2);
				"step 7"
				if (typeof event.target.ai.shown == 'number' && event.target.ai.shown <= 0.85 && event.addToAI) {
					event.target.ai.shown += 0.1;
				}
				game.broadcastAll(function() {
					ui.arena.classList.remove('thrownhighlight');
				});
				game.addVideo('thrownhighlight2');
				if (event.clear !== false) {
					game.broadcastAll(ui.clear);
				}
				if (typeof event.preserve == 'function') {
					event.preserve = event.preserve(event.result);
				} else if (event.preserve == 'win') {
					event.preserve = event.result.bool;
				} else if (event.preserve == 'lose') {
					event.preserve = !event.result.bool;
				}
			};
			
			lib.element.content.chooseToCompareMultiple = function(){
				"step 0"
				if (player.countCards('h') == 0) {
					event.result = {
						cancelled: true,
						bool: false
					}
					event.finish();
					return;
				}
				for (var i = 0; i < targets.length; i++) {
					if (targets[i].countCards('h') == 0) {
						event.result = {
							cancelled: true,
							bool: false
						}
						event.finish();
						return;
					}
				}
				if (!event.multitarget) {
					targets.sort(lib.sort.seat);
				}
				game.log(player, '对', targets, '发起拼点');
				
				// 更新拼点框
				game.broadcastAll(function(source, target){
					if (!window.decadeUI) return;
					
					decadeUI.effectDialog = ui.arena.appendChild(decadeUI.effect.dialog.compare(source, target));
					decadeUI.delay(400);
				}, player, targets[0]);
				
				"step 1"
				event.list = targets.slice(0);
				event.list.unshift(player);
				player.chooseCardOL(event.list, '请选择拼点牌', true).set('type', 'compare').set('ai', event.ai).set('source', player).aiCard = function(target) {
					var hs = target.getCards('h');
					var event = _status.event;
					event.player = target;
					hs.sort(function(a, b) {
						return event.ai(b) - event.ai(a);
					});
					delete event.player;
					return {
						bool: true,
						cards: [hs[0]]
					};
				};
				
				"step 2"
				var cards = [];
				if (result[0].skill && lib.skill[result[0].skill] && lib.skill[result[0].skill].onCompare) {
					player.logSkill(result[0].skill);
					result[0].cards = lib.skill[result[0].skill].onCompare(player)
				};
				player.lose(result[0].cards, ui.ordering);
				for (var i = 1; i < result.length; i++) {
					if (result[i].skill && lib.skill[result[i].skill] && lib.skill[result[i].skill].onCompare) {
						event.list[i].logSkill(result[i].skill);
						result[i].cards = lib.skill[result[i].skill].onCompare(event.list[i]);
					}
					event.list[i].lose(result[i].cards, ui.ordering);
					cards.push(result[i].cards[0]);
				}
				event.cardlist = cards;
				event.cards = cards;
				event.card1 = result[0].cards[0];
				event.num1 = event.card1.number;
				event.iwhile = 0;
				event.result = {
					player: event.card1,
					targets: event.cardlist.slice(0),
					num1: [],
					num2: [],
				};
				game.log(player, '的拼点牌为', event.card1);
				
				// 更新拼点框
				game.broadcastAll(function(card){
					if (!window.decadeUI) return;
					
					decadeUI.effectDialog.set('card1', card.copy());
				}, event.card1);
				
				"step 3"
				if (event.iwhile < targets.length) {
					event.target = targets[event.iwhile];
					event.target.animate('target');
					player.animate('target');
					event.card2 = event.cardlist[event.iwhile];
					event.num2 = event.card2.number;
					game.log(event.target, '的拼点牌为', event.card2);
					player.line(event.target);
					
					// 更新拼点框
					game.broadcastAll(function(player, target, card1, card2){
						if (!window.decadeUI) {
							player.$compare(card1, target, card2);
							return;
						}
						
						decadeUI.effectDialog.show();
						decadeUI.effectDialog.set('target', target);
						decadeUI.effectDialog.set('card2', card2.copy());
						
						setTimeout(function(player, target, card2){
							target.$throwordered2(card2, true);
							decadeUI.effectDialog.hide();
						}, 1500, player, target, decadeUI.effectDialog.cards[1].firstChild);
					}, player, event.target, event.card1, event.card2);
					
					event.trigger('compare');
					decadeUI.delay(1500);
				} else {
					// 更新拼点框
					game.broadcastAll(function(player){
						if (!window.decadeUI) return;
						
						player.$throwordered2(decadeUI.effectDialog.cards[0].firstChild, true);
						decadeUI.effectDialog.close();
					}, player);
					event.goto(7);
				}
				"step 4"
				event.result.num1[event.iwhile] = event.num1;
				event.result.num2[event.iwhile] = event.num2;
				var str;
				if (event.num1 > event.num2) {
					str = get.translation(player.name) + '拼点成功';
					player.popup('胜');
					target.popup('负');
				} else {
					str = get.translation(player.name) + '拼点失败';
					if (event.num1 == event.num2) {
						player.popup('平');
						target.popup('平');
					} else {
						player.popup('负');
						target.popup('胜');
					}
				}
				game.broadcastAll(function(str) {
					var dialog = ui.create.dialog(str);
					dialog.classList.add('center');
					setTimeout(function() {
						dialog.close();
					}, 1000);
				}, str);
				game.delay(2);
				"step 5"
				if (event.callback) {
					game.broadcastAll(function(card1, card2) {
						if (window.decadeUI) return;
						if (card1.clone) card1.clone.style.opacity = 0.5;
						if (card2.clone) card2.clone.style.opacity = 0.5;
					}, event.card1, event.card2);
					var next = game.createEvent('compareMultiple');
					next.player = player;
					next.target = event.target;
					next.card1 = event.card1;
					next.card2 = event.card2;
					next.num1 = event.num1;
					next.num2 = event.num2;
					next.setContent(event.callback);
				}
				"step 6"
				game.broadcastAll(ui.clear);
				event.iwhile++;
				event.goto(3);
				"step 7"
				event.cards.add(event.card1);
			};
			
		    lib.element.player.init = function(character, character2, skill){
			    Object.defineProperties(this, {
					group: {
						configurable: true,
						get:function(){
							return this.node.zoneCamp.dataset.camp;
						},
						set:function(value){
							this.node.zoneCamp.dataset.camp = value;
							if (value){
								if (decadeUI.config.campIdentityImageMode){
								    var that = this;
									var image = new Image();
									var url = extensionPath + 'image/decoration/name_' + value + '.webp';
								    that._finalGroup = value;
									
								    image.onerror = function(){
								        that.node.zoneCamp.node.campName.innerHTML = that._finalGroup ? get.translation(that._finalGroup)[0] : '';
								    };
								    
								    that.node.zoneCamp.node.campName.innerHTML = '';
								    that.node.zoneCamp.node.campName.style.backgroundImage = 'url("' + url + '")';
									image.src = url;
									
								    return;
								}
								
								this.node.zoneCamp.node.campName.innerHTML = value ? get.translation(value)[0] : '';
							}
						}
					}
				});	
				
			    return playerInitFunction.call(this, character, character2, skill);
			};
			
			lib.element.player.uninit = function(){
			    this.node.zoneCamp.dataset.camp = null;
			    this.node.zoneCamp.node.campName.innerHTML = '';
			    this.node.zoneCamp.node.campName.style.backgroundImage = '';
			    this.node.name2.innerHTML = '';
			    return playerUninitFunction.call(this);
			};
			
			lib.element.player.update = function(nocallUpdate, damage){
			    var result;
			    var nocall = nocallUpdate === 'nocall';
			    if (!nocall) {
			        result = playerUpdateFunction.apply(this, arguments);
			    }
			    
			    var hpNode = this.node.hp;
			    var hp = this.hp - (nocall ? damage : 0);
			    
			    if (this.maxHp > 5){
			        hpNode.innerHTML = (isNaN(hp) ? '×' : (hp == Infinity ? '∞' : hp)) + '<br>/<br>'
						+ (isNaN(this.maxHp) ? '×' : (this.maxHp == Infinity ? '∞' : this.maxHp)) + '<div></div>';
					if(hp == 0){
						hpNode.lastChild.classList.add('lost');
					}
					
					hpNode.classList.add('textstyle');
			    }else if(nocall) {
			        hpNode.innerHTML='';
					hpNode.classList.remove('text');
					hpNode.classList.remove('textstyle');
					while (this.maxHp > hpNode.childNodes.length){
						ui.create.div(hpNode);
					}
					
					while(this.maxHp < hpNode.childNodes.length){
						hpNode.removeChild(hpNode.lastChild);
					}
					
					for (var i = 0; i < this.maxHp; i++) {
                        var index = i;
                        if (get.is.newLayout()) {
                            index = this.maxHp - i - 1;
                        }
                        if (i < hp) {
                            hpNode.childNodes[index].classList.remove('lost');
                        } else {
                            hpNode.childNodes[index].classList.add('lost');
                        }
                    }
			    }
			    
			    if (true) {
                    if (hpNode.classList.contains('room')) {
                        hpNode.dataset.condition = 'high';
                    } else if (hp == 0) {
                        hpNode.dataset.condition = '';
                    } else if (hp > Math.round(this.maxHp / 2) || hp == this.maxHp) {
                        hpNode.dataset.condition = 'high';
                    } else if (hp > Math.floor(this.maxHp / 3)) {
                        hpNode.dataset.condition = 'mid';
                    } else {
                        hpNode.dataset.condition = 'low';
                    }
                    
                    //ui.refresh(hpNode);
			    }
			    
				this.dataset.maxHp = this.maxHp;
				
			    return result;
			};

			lib.element.player.setIdentity = function(identity){
				if(!identity) identity = this.identity;
				
				var identityColor = identity;
				var identityNode = this.node.identity;
				
				switch(get.mode()){
				    case 'identity':
						if (_status.mode == 'purple' && identity.indexOf('cai') >= 0) {
							if (this.identity[0] == 'r') {
								identity = 'cai';
							} else {
								identity = 'cai2';
								this.classList.add('opposite-camp');
								this.finalSide = false;
							}
							
						}
						break;
					
					case 'guozhan':
				        this.group = identity;
				        break;
				    case 'versus':
						this.finalSide = this.side;
						if (this.side === false) this.classList.add('opposite-camp');
				        break;
				}
				
				this.finalShownIdentity = identity;
				identityNode.dataset.color = identityColor;
				if (lib.huanhuazhizhan) return this;
				
				if (decadeUI.config.campIdentityImageMode){
					var that = this;
					var image = new Image();
					var url = extensionPath + 'image/decoration/identity_' + decadeUI.getPlayerIdentity(that, identity) + '.webp';
				    that.finalShownIdentity = identity;
					
					image.identity = identity;
				    image.onerror = function(){
						if (this.identity != that.finalShownIdentity) return;
						
						that.node.identity.firstChild.style.opacity = '';
						that.node.identity.firstChild.innerHTML = get.mode() == 'boss' ? get.translation(that.finalShownIdentity) :
							decadeUI.getPlayerIdentity(that, that.finalShownIdentity, true, true);
				    };
				    
					that.node.identity.firstChild.innerHTML = '';
					that.node.identity.firstChild.style.opacity = '0';
					that.node.identity.style.backgroundImage = 'url("' + url + '")';
					image.src = url;
					
				}else{
				    this.node.identity.firstChild.innerHTML = get.is.jun(this) ? '君' : get.translation(identity);
				}
				
				return this;
			};
			
			lib.element.player.addSkill = function(skill){
				var skill = playerAddSkillFunction.apply(this, arguments);
				if (!Array.isArray(skill)) {
					var character1 = lib.character[this.name];
					var character2 = lib.character[this.name2];
					if ((!character1 || !character1[3].contains(skill)) && (!character2 || !character2[3].contains(skill))) {
						this.node.gainSkill.gain(skill);
					}
				}

				return skill;
			};
			
			lib.element.player.removeSkill = function(skill){
				var skill = playerRemoveSkillFunction.apply(this, arguments);
				if (!Array.isArray(skill)) {
					if (this.node.gainSkill.skills && this.node.gainSkill.skills.contains(skill)) {
						this.node.gainSkill.lose(skill);
					}
				}

				return skill;
			};
			
			lib.element.player.getState = function(){
				var state = base.lib.element.player.getState.apply(this, arguments);
				state.seat = this.seat;
				return state;
			};
			
			lib.element.player.setModeState = function(info){
				if (info && info.seat) {
					if (!this.node.seat) this.node.seat = decadeUI.dialog.create('seat', this);
					this.node.seat.innerHTML = get.cnNumber(info.seat, true);
				}
				
				if (base.lib.element.player.setModeState) {
					return base.lib.element.player.setModeState.apply(this, arguments);
				} else {
					return this.init(info.name, info.name2);
				}
			};
			
			lib.element.player.$damage = function(source){
			    if (!source) source = this;

			    var result = playerDamageFunction.call(this, source);
			    var time = getComputedStyle(source).transitionDuration;
			    if (!time) return result;
			    
			    if (time.lastIndexOf('ms') != -1){
			        time = parseInt(time.replace(/ms/, ''));
			    }else if(time.lastIndexOf('s') != -1){
			        time = parseFloat(time.replace(/s/, '')) * 1000;
			    }
			    
			    decadeUI.delay(time + 100);
			    this.update('nocall', _status.event.num);
			    return result;
			};
			
			lib.element.player.$throw = function(card, time, init, nosource){
				time = undefined;
				return playerThrowFunction.call(this, card, time, init, nosource);
			};
			
			lib.element.player.$dieflip = function(){
				if (!decadeUI.config.playerDieEffect && playerDieFlipFunction) playerDieFlipFunction.apply(this, arguments);
			};
			
			lib.element.player.$dieAfter = function(){
				if (!decadeUI.config.playerDieEffect) {
					if (playerDieAfterFunction) playerDieAfterFunction.apply(this, arguments);
					return;
				}
				
				if(!this.node.dieidentity) this.node.dieidentity = ui.create.div('damage.dieidentity', this);
				this.node.dieidentity.classList.add('damage');
				this.node.dieidentity.classList.add('dieidentity');
				this.classList.add('died-effect');
				
				var that = this;
				var image = new Image();
				var identity = decadeUI.getPlayerIdentity(this);
				
				var url = extensionPath + 'image/decoration/dead_' + identity + '.webp';
				image.onerror = function(){
					that.node.dieidentity.innerHTML = decadeUI.getPlayerIdentity(that, that.identity, true) + '<br>阵亡';
				};
				
				that.node.dieidentity.innerHTML = '';
				that.node.dieidentity.style.backgroundImage = 'url("' + url + '")';
				image.src = url;
			};
			
			lib.element.player.$compare = function(card1, target, card2){
				game.broadcast(function(player, target, card1, card2) {
					player.$compare(card1, target, card2);
				}, this, target, card1, card2);
				game.addVideo('compare', this, [get.cardInfo(card1), target.dataset.position, get.cardInfo(card2)]);
				var player = this;
				target.$throwordered2(card2.copy(false));
				player.$throwordered2(card1.copy(false));
			};
			
			lib.element.player.$throwordered2 = function(card, nosource){
				if (_status.connectMode) ui.todiscard = [];
				
				card.classList.add('thrown');
				card.classList.add('transition-none');
				var inserted = false;
				
				if (!card.fixed){
    				for (var i = 0; i < ui.thrown; i++){
    			        if (ui.thrown[i].parentNode == ui.arena){
    			            ui.arena.insertBefore(card, ui.thrown[i]);
    			            inserted = true;
    			            break;
    			        }
    			    }
				}
				
				if (!inserted) ui.arena.appendChild(card);
				if (!card.fixed) ui.thrown.splice(0, 0, card);
				var parentNode = card.parentNode;
				var x, y;
				if (nosource){
					x = ((parentNode.offsetWidth - card.offsetWidth) / 2 - parentNode.offsetWidth * 0.08) + 'px';
					y = ((parentNode.offsetHeight - card.offsetHeight) / 2) + 'px';
				}else{
					x = ((this.offsetWidth - card.offsetWidth) / 2 + this.offsetLeft) + 'px';
					y = ((this.offsetHeight - card.offsetHeight) / 2 + this.offsetTop) + 'px';
				}

				card.style.transform = 'translate(' + x + ', ' + y + ')' + 'scale(' + decadeUI.getCardBestScale() + ')';
				ui.refresh(card);
				card.classList.remove('transition-none');
				card.scaled = true;
				if (card.fixed) return;
				decadeUI.layout.invalidateDiscard();
				var usedInfo = card.querySelector('.used-info');
				if (!usedInfo) return card;
				var eventName = '';
				var event = _status.event;
	
				switch(event.name){
				    case 'useCard':
				        if (event.targets.length == 1){
				            if (event.targets[0] == this){
				                eventName = '对自己';
				            }else{
				                eventName = '对' + get.translation(event.targets[0]);
				            }
				        }else{
				            eventName = '使用';
				        }
						
						if (decadeUI.config.cardUseEffect && event.card && event.card.cards && event.card.cards.length == 1 && event.card.cards[0].clone == card) {
							var name = event.card.name;
							var nature = event.card.nature;
							if (name == 'sha' || name == 'shan') {
								if (!card.animation) card.animation = decadeUI.dialog.create('animation', card);
								if (get.color(card) == 'red') card.animation.style.color = 'rgb(200,0,0)';
								else card.animation.style.color = 'black';
								card.animation.innerHTML = get.translation(name);
								card.animation.dataset.nature = nature;
								card.animation.style.webkitAnimation = 'use-card 2.5s forwards';
							}
						}
				        break;
				    case 'respond':
				        eventName = '打出';
				        break;
				    case 'useSkill':
				        eventName = '发动';
				        break;
				    case 'die':
				        card.classList.add('invalided');
				        decadeUI.layout.delayClear();
				        eventName = '弃置';
				        break;
				    case 'lose':
						if (event.parent && event.parent.name == 'discard' && event.parent.parent) {
							var skillEvent = event.parent.parent.parent;
							if (skillEvent) {
								eventName = lib.translate[skillEvent.name != 'useSkill' ? skillEvent.name : skillEvent.skill];
								if (eventName == null) eventName = '';
								eventName += '弃置';
								break;
							}
						}
				    case 'discard':
				        eventName = '弃置';
				        break;
				    case 'phaseJudge':
				        eventName = '开始判定';
				        break;
				    case 'judge':
				        eventName = '的判定';
				        if (!lib.element.content['throwJudgeCallback']){
				            lib.element.content['throwJudgeCallback'] = function(event,step,source,player,target,targets,card,cards,skill,forced,num,trigger,result,_status,lib,game,ui,get,ai){
    				            var callback = event.parent.overrides.callback;
    				            if (callback){
    				                if (!callback._parsed){
    				                    event.parent.overrides.callback = lib.init.parse(callback);
    				                    event.parent.overrides.callback._parsed = true;
    				                    callback = event.parent.overrides.callback;
    				                    var steps = callback.toString().match(/case(.*?)(?=:)/g);
    				                    
    				                    if (steps && steps.length){
    				                        event.parent.overrides.step = parseInt(steps[steps.length - 1].replace('case', '')) + 1;
    				                    }
    				                    
    				                }
    				            }
    				            
    				            if (event.parent.overrides.step == step){
    				                event.finish();
    				                return;
    				            }
    				            
    				            if (callback) callback.apply(this, arguments);
    				            var card = event.judgeResult.card.clone;
    				            var judge = event.judgeResult.judge;
    				            card.node.usedInfo = card.querySelector('.used-info');
    				            card.node.usedInfo.innerHTML = (judge != 0 ? (judge > 0 ? '洗具' : '杯具') : '不洗不杯');
				            };
				            
				            lib.element.content['throwJudgeCallback']._parsed = true;
				        }
				        
				        if (!event.overrides) event.overrides = { };
				        event.overrides.callback = event.callback;
				        event.overrides.step = 1;
				        event.callback = 'throwJudgeCallback';
				        break;
				    default:
						eventName = get.translation(event.name);
						if (eventName == event.name) eventName = '';
				        break;
				}
				
				usedInfo.innerHTML = get.translation(this) + eventName;
				return card;
			};
			
			lib.element.card.init = function(param){
				var card = cardInitFunction.call(this, param);
				if (decadeUI.config.cardReplace){
					card.classList.add('decade-card');
					if (!card.classList.contains('infohidden')) {
						var name = card.name;
						if (name == 'sha') {
							switch (card.nature) {
								case 'thunder':
									name = 'lei' + name;
									break;
									
								case 'fire':
									name = 'huo' + name;
									break;
							}
						}
						
						var res = decadeUI.resources.cards[name];
						if (!res) {
							res = {
								name: name,
								chinese: '',
								image: undefined,		// 图片
								loaded: undefined, 		// 是否已加载资源
								rawUrl: undefined, 			// 被替换的图片地址	
							};
							
							decadeUI.resources.cards[name] = res;
						}
						
						if (res.loaded !== false) {
							if (!res.loaded) {
								var url = lib.assetURL + 'extension/' + extensionName + '/image/card/' + res.name + '.webp';
								res.image = new Image();
								res.image.onload = function(){
									this.onload = null;
									res.onload = true;
								};
								
								res.image.onerror = function(){
									this.onerror = null;
									res.loaded = false;
									card.style.background = res.rawUrl;
									card.classList.remove('decade-card');
								}
								
								if (!res.rawUrl) res.rawUrl = card.style.backgroundImage;
								res.image.src = url;
							}
							
							card.style.background = 'url("' + res.image.src + '")';
						} else {
							card.classList.remove('decade-card');
						}
					}
				} else {
					card.classList.remove('decade-card');
				}
				
				
				if (param[0]){
					card.dataset.suit = param[0];
					if (param[1]){
						var cardnum = param[1];
						var cardsuit = get.translation(param[0]);
						if([1,11,12,13].contains(cardnum)){
							cardnum = {'1':'A','11':'J','12':'Q','13':'K'}[cardnum];
						}
						
						if (!card.node.suitNum) {
							card.node.suitNum = decadeUI.dialog.create('suit-num');
							card.insertBefore(card.node.suitNum, card.node.info);
						}
						
						card.node.info.innerHTML = null;
						card.node.suitNum.innerHTML = '<span>' + cardnum + '</span>' + '<br><span>' + cardsuit + '</span>';
						card.node.name2.innerHTML = '<span data-suit="' + param[0] + '">' + cardsuit + cardnum + '</span>' + 
						'<span>&nbsp' + get.translation(this.name) + '</span>';
						var info = lib.card[this.name];
						
						switch(get.subtype(this)){
    						case 'equip3':
        						if(info.distance && info.distance.globalTo){
        							this.node.name2.innerHTML += '&nbsp;+';
        						}
        						break;
    						case 'equip4':
        						if(info.distance&&info.distance.globalFrom){
        							this.node.name2.innerHTML += '&nbsp;-';
        						}
        						break;
    					}
    				
    				}
				} else {
					if (card.node.info.innerText = ' ') card.node.info.innerHTML = null;
				}
				
				if (param[0]) card.dataset.suit = param[0];
				
				if (!card.node.topName) card.node.topName = decadeUI.dialog.create('top-name', card);
				card.node.topName.innerHTML = (this.name == 'sha' ? (card.nature == 'thunder' ? '雷' : (card.nature == 'fire' ? '火' : '')) : '') + get.translation(this.name);
				return card;
			};
			
			lib.element.card.copy = function(){
				var clone = cardCopyFunction.apply(this, arguments);
				
				var res = decadeUI.resources.cards[clone.name];
				if (res && !res.loaded && clone.classList.contains('decade-card')) {
					if (res.loaded !== false) {
						var error = res.image.onerror;
						res.image.onerror = function(){
							error.apply(this, arguments);
							clone.style.background = res.rawUrl;
							clone.classList.remove('decade-card');
						};
						
					} else {
						clone.style.background = res.rawUrl;
						clone.classList.remove('decade-card');
					} 
				}
				
				return clone;
			};
			
			lib.element.card.moveTo = function(player){
                if (!player) return;
                
                this.fixed = true;
                this.moving = true;
                var x = Math.round((player.offsetWidth - this.offsetWidth) / 2 + player.offsetLeft);
                var y = Math.round((player.offsetHeight - this.offsetHeight) / 2 + player.offsetTop);
                var scale = decadeUI.getCardBestScale();
                this.style.transform = 'translate(' + x + 'px,' + y + 'px)scale(' + scale + ')';
                return this;
            };
            
            lib.element.card.moveDelete = function(player, handUpdate){
				this.fixed = true;
				this.moving = true;
				if(!this._listeningEnd || this._transitionEnded){
					this.moveTo(player);
					if (!handUpdate && ui.thrown.indexOf(this) != -1){
					    decadeUI.layout.invalidateDiscard();
					}
					
					setTimeout(function(card){
						card.delete();
					}, 330, this);
				}
				else{
					this._onEndMoveDelete = player;
				}
			};
			
			lib.element.player.countCards = function(hej, filter){
				var count = 0;
				var event = _status.event;
				if (event.name == 'chooseToUse' && event.player == this && !ui.handSpecial.ignored) {
					hej = (typeof hej == 'string') ? hej : 'h';
					if (hej.indexOf('h') >= 0) {
						var muniu = this.getEquip(5);
						if (muniu && muniu.cards) {
							if (filter) {
								var cards = muniu.cards.concat();
								switch (typeof filter) {
									case 'string':
										for (var i = cards.length - 1; i >= 0; i--) {
											if (get.name(cards[i]) != filter) cards.splice(i, 1);
										}
										break;
									
									case 'object':
										for (var i = cards.length - 1; i >= 0; i--) {
											for (j in filter) {
												var value;
												if (j == 'type' || j == 'subtype' || j == 'color' || j == 'suit' || j == 'number') {
													value = get[j](cards[i]);
												} else {
													value = cards[i][j];
												}
												
												if ((typeof filter[j] == 'string' && value != filter[j]) || (Array.isArray(filter[j]) && !filter[j].contains(value))) {
													cards.splice(i, 1);
													break;
												}
											}
										}
										break;
									
									case 'function':
										for (var i = cards.length - 1; i >= 0; i--) {
											if (!filter(cards[i])) cards.splice(i, 1);
										}
										break;
									
									default: break;
								}
							}
							
							count = muniu.cards.length;
						}
					}
				}
				
				count += this.getCards(hej, filter).length;
				return count;
			};
			
			lib.element.player.$draw = function(num, init, config){
                if (game.chess) return playerDrawFunction.call(this, num, init, config);
                if (init !== false && init !== 'nobroadcast'){
                    game.broadcast(function(player, num, init, config){
                        player.$draw(num, init, config);
                    }, this, num, init, config);
                }
                
                var cards;
                if (get.itemtype(num) == 'cards'){
                    cards = num;
                    num = cards.length;
                } else if (get.itemtype(num) == 'card'){
                    cards = [num];
                    num = 1;
                } else if (num == null){
					num = 1;
				}
                
                if (init !== false){
                    if (cards){
                        game.addVideo('drawCard', this, get.cardsInfo(cards));
                    } else {
                        game.addVideo('draw', this, num);
                    }
                }				
                
                var nodes = [];
                for (var i = 0; i < num; i++){
                    var card = cards ? cards[i].copy('thrown', 'drawingcard') : ui.create.div('.card.thrown.drawingcard');
                    card.fixed = true;
                    card.hide();
                    card.classList.add('transition-none');
                    this.parentNode.appendChild(card);
                    nodes.push(card);
                }

                var parentNode = this.parentNode;
                var scale = decadeUI.getCardBestScale();
				var cardWidth = nodes[0].offsetWidth * scale;
				var x;
				var y = Math.round((parentNode.offsetHeight - nodes[0].offsetHeight) / 2);
				var margin = (parentNode.offsetWidth - this.offsetWidth) / 2 - (nodes[0].offsetWidth - cardWidth) / 2;
				var marginOffset = Math.round(margin - this.offsetLeft + (nodes[0].offsetWidth - cardWidth) / 2);
				var offset = this.offsetWidth - cardWidth * nodes.length;
				var overflow = offset < 0;
				if (overflow){
					offset = Math.abs(offset) / (nodes.length - 1);
				}else{
					offset /= 2;
				}
                
                var tx, ty, time = 50;
                for (var i = 0; i < nodes.length; i++){
                    var node = nodes[i];
					if (overflow){
						x = Math.round((i * (cardWidth - offset) + margin));
					}else{
						x = Math.round((offset + i * cardWidth + margin));
					}
					
					node.style.transform = 'translate(' + x + 'px,' + y + 'px)scale(' + scale + ')';
					
                    tx = x - marginOffset;
                    ty = (this.offsetHeight - node.offsetHeight) / 2 + this.offsetTop;
                    
                    setTimeout(function(mnode, mnodes, mtx, mty, mscale){
                        mnode.show();
                        mnode.classList.remove('transition-none');
                        ui.refresh(mnode);
                        mnode.style.transform = 'translate(' + mtx + 'px, ' + mty + 'px)' + 'scale(' + mscale + ')';
                        
                        if (mnode == mnodes[mnodes.length - 1]){
                            mnode.deletes = mnodes;
                            
							var time = getComputedStyle(mnode).transitionDuration;
							if (time) {
								if (time.lastIndexOf('ms') != -1){
								time = parseInt(time.replace(/ms/, ''));
								}else if(time.lastIndexOf('s') != -1){
									time = parseFloat(time.replace(/s/, '')) * 1000;
								}
							} else {
								time = 500;
							}
							
							setTimeout(function(){
								var deletes = mnode.deletes;
                                if (!deletes) return;
                                
                                for (var i = 0; i < deletes.length; i++){
                                    deletes[i].style.transitionDuration = '0.3s';
                                    deletes[i].delete();
                                }
								
                                mnode.deletes = null;
							}, time);                           
                        }
                    }, time, node, nodes, tx, ty, scale);
                    
                    time += 50;
				}
            };
            
            lib.element.player.$give = function(card, player, log, init) {
                if (init !== false) {
                    game.broadcast(function(source, card, player, init) {
                        source.$give(card, player, false, init);
                    },
                    this, card, player, init);
                    if (typeof card == 'number' && card >= 0) {
                        game.addVideo('give', this, [card, player.dataset.position]);
                    } else {
                        if (get.itemtype(card) == 'card') {
                            card = [card];
                        }
                        if (get.itemtype(card) == 'cards') {
                            game.addVideo('giveCard', this, [get.cardsInfo(card), player.dataset.position]);
                        }
                    }
                }
                
                if (get.itemtype(card) == 'cards') {
                    if (log != false && !_status.video) {
                        game.log(player, '从', this, '获得了', card);
                    }
                    if (this.$givemod) {
                        this.$givemod(card, player);
                    } else {
                        for (var i = 0; i < card.length; i++) {
                            this.$give(card[i], player, false, false);
                        }
                    }
                } else if (typeof card == 'number' && card >= 0) {
                    if (log != false && !_status.video) {
                        game.log(player, '从', this, '获得了' + get.cnNumber(card) + '张牌');
                    }
                    if (this.$givemod) {
                        this.$givemod(card, player);
                    } else {
                        while (card--) this.$give('', player, false, false);
                    }
                } else {
                    if (log != false && !_status.video) {
                        if (get.itemtype(card) == 'card' && log != false) {
                            game.log(player, '从', this, '获得了', card);
                        } else {
                            game.log(player, '从', this, '获得了一张牌');
                        }
                    }
                    if (this.$givemod) {
                        this.$givemod(card, player);
                    } else {
                        var node;
                        if (get.itemtype(card) == 'card') {
                            node = card.copy('card', 'thrown', false);
                        } else {
                            node = ui.create.div('.card.thrown');
                        }
                        
                        node.fixed = true;
                        this.$throwordered2(node);
                        node.moveTo = lib.element.card.moveTo;
                        node.moveDelete = lib.element.card.moveDelete;
                        node.moveDelete(player);
                    }
                }
            },
            
            lib.element.player.$gain2 = function(cards, log){
                if (log === true) game.log(this, '获得了', cards);
                
                game.broadcast(function(player, cards){
                    player.$gain2(cards);
                }, this, cards);
                
                switch(get.itemtype(cards)){
                    case 'card':
                        cards = [cards];
                        break;
						
                    case 'cards':
                        cards = cards;
                        break;
						
                    default:
                        if (cards.cards) {
							cards = cards.cards;
							break;
						}
						
						return;
                }
                
                var list = [], list2 = [];
                var update = false;
                
                for (var i = 0; i < cards.length; i++){
                    if (cards[i].clone && (cards[i].clone.parentNode == this.parentNode || cards[i].clone.parentNode == ui.arena)){
                        if (!update){
                            update = ui.thrown.indexOf(cards[i].clone) != -1;
                        }
                        
                        cards[i].clone.moveDelete(this, true);
                        list2.push(cards[i].clone);
                    } else {
                        list.push(cards[i]);
                    }
                }
                
                if (update){
                    ui.clear();
                    decadeUI.layout.invalidateDiscard();
                }
                
                if (list2.length){
                    game.addVideo('gain2', this, get.cardsInfo(list2));
                }
                
                if (list.length){
                    this.$draw(list, 'nobroadcast');
                    return true;
                }
			};
		
		},
		dialog:{
			create:function(className, parentNode, tagNameOptional){
				var element = !tagNameOptional ? document.createElement('div') : document.createElement(tagNameOptional);
				for(var i in decadeUI.dialog){
					if (decadeUI.dialog[i]) element[i] = decadeUI.dialog[i];
				}
				
				element.listens = {};
				for(var i in decadeUI.dialog.listens){
					if (decadeUI.dialog.listens[i]) element.listens[i] = decadeUI.dialog.listens[i];
				}
					
				element.listens._dialog = element;
				element.listens._list = [];
				
				if (className) element.className = className;
				if (parentNode) parentNode.appendChild(element);
				
				return element;
			},
			open:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
			},
			show:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
				
				this.classList.remove('hidden');
			},
			hide:function(){
				if (this == decadeUI.dialog) return console.error('undefined');
				
				this.classList.add('hidden');
			},
			animate:function(property, duration, toArray, fromArrayOptional){
				if (this == decadeUI.dialog) return console.error('undefined');
				if (property == null || duration == null || toArray == null) return console.error('arguments');
				
				var propArray = property.replace(/\s*/g, '').split(',');
				if (!propArray || propArray.length == 0) return console.error('property');
				
				var realDuration = 0;
				if (duration.lastIndexOf('s') != -1){
					if (duration.lastIndexOf('ms') != -1){
						duration = duration.replace(/ms/, '');
						duration = parseInt(duration);
						if (isNaN(duration)) return console.error('duration');
						realDuration = duration;
					}else{
						duration = duration.replace(/s/, '');
						duration = parseFloat(duration);
						if (isNaN(duration)) return console.error('duration');
						realDuration = duration * 1000;
					}
				}else {
					duration = parseInt(duration);
					if (isNaN(duration)) return console.error('duration');
					realDuration = duration;
				}
				
				if (fromArrayOptional){
					for (var i = 0; i < propArray.length; i++){
						this.style.setProperty(propArray[i], fromArrayOptional[i]);
					}
				}
				
				var duraBefore = this.style.transitionDuration;
				var propBefore = this.style.transitionProperty;
				this.style.transitionDuration = realDuration + 'ms';
				this.style.transitionProperty = property;
				
				ui.refresh(this);
				for (var i = 0; i < propArray.length; i++){
					this.style.setProperty(propArray[i], toArray[i]);
				}
				
				var restore = this;
				setTimeout(function(){
					restore.style.transitionDuration = duraBefore;
					restore.style.transitionProperty = propBefore;
				}, realDuration);
			},
			close:function(delayTime, fadeOut){
				if (this == decadeUI.dialog) return console.error('undefined');
				this.listens.clear();
				
				if (!this.parentNode) return;
				
				if (fadeOut === true && delayTime) {
					this.animate('opacity', delayTime, 0);
				}
				
				if (delayTime) {
					var remove = this;
					delayTime = (typeof delayTime == 'number') ? delayTime : parseInt(delayTime);
					setTimeout(function(){ 
						if (remove.parentNode) remove.parentNode.removeChild(remove);
					}, delayTime);
					return;
				}
				
				this.parentNode.removeChild(this);
				return;
			},
			listens:{
				add:function(listenElement, event, func, useCapture){
					if (!this._dialog || !this._list) return console.error('undefined');
					if (!(listenElement instanceof HTMLElement) || !event || (typeof func !== 'function')) return console.error('arguments');
					
					this._list.push(new Array(listenElement, event, func));
					listenElement.addEventListener(event, func);
				}, 
				remove:function(listenElementOptional, eventOptional, funcOptional){
					if (!this._dialog || !this._list) return console.error('undefined');
					
					var list = this._list;
					if (listenElementOptional && eventOptional && funcOptional){
						var index = list.indexOf(new Array(listenElementOptional, eventOptional, funcOptional));
						if (index != -1){
							list[index][0].removeEventListener(list[index][1], list[index][2]);
							list.splice(index, 1);
							return;
						}
					}else if (listenElementOptional && eventOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional && list[i][1] == eventOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (listenElementOptional && funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional && list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (eventOptional && funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][1] == eventOptional && list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (listenElementOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][0] == listenElementOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (eventOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][1] == eventOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}else if (funcOptional){
						for (var i = list.length - 1; i >= 0; i--){
							if (list[i][2] == funcOptional){
								list[i][0].removeEventListener(list[i][1], list[i][2]);
								list.splice(i, 1);
							}
						}
					}
				},
				clear:function(){
					if (!this._dialog || !this._list) return console.error('undefined');
					
					var list = this._list;
					for (var i = list.length - 1; i >= 0; i--){
						list[i][0].removeEventListener(list[i][1], list[i][2]);
						list[i] = undefined;
					}
					list.length = 0;
				}
			}
		},
		animate:{
			check:function(){
				if (!this.frames) this.frames = [];
				
				if (!ui.window) {
					console.log('ui.window is not created.');
					return;
				}
				
				if (!this.window) {
					this.window = ui.window.appendChild(document.createElement('canvas'));
					this.window.id = 'decadeUI-animate-window';
					this.frames[0] = { 
						updates: [],
						canvas: this.window,
					};
				}
				
				if (!ui.arena) {
					console.log('ui.arena is not created.');
					return;
				}
				
				if (!this.arena) {
					this.arena = ui.arena.appendChild(document.createElement('canvas'));
					this.arena.id = 'decadeUI-animate-arena'
					this.frames[2] = { 
						updates: [],
						canvas: this.arena,
					};
				}
			},
			add:function(funcOrObejct, isArena){
				if (typeof funcOrObejct != 'function') throw 'funcOrObejct';
				this.check();

				var obj = {
					inits: [],
					update: funcOrObejct,
					id: decadeUI.getRandom(0, 100),
				};
				
				if (arguments.length > 2) {
					obj.inits = new Array(arguments.length - 2);
					for (var i = 2; i < arguments.length; i++) {
						obj.inits[i - 2] = arguments[i];
					}
				}
				
				if (isArena === true) {
					this.frames[2].updates.push(obj);
				} else {
					this.frames[0].updates.push(obj);
				}
				
				if (!this.frameId) this.update();
				return obj;
			},
			remove:function(obj){
				if (!obj) throw obj;
				this.check();
				
				var index;
				var frames = this.frames;
				
				for (var i = 0; i < frames.length; i++) {
					index = frames[i].updates.indexOf(obj);
					if (index >= 0) {
						frames[i].updates.splice(index, 1);
						if (frames[i].updates.length == 0) frames[i].canvas.height = frames[i].canvas.height;
						break;
					}
				}
				
				var cancel = true;
				for (var i = 0; i < frames.length; i++) {
					if (frames[i].updates.length != 0) cancel = false;
				}
				
				if (cancel) this.cancel();
			},
			update:function(){
				decadeUI.animate.check();
				decadeUI.animate.cancel();

				var nowTime= new Date();
				var lastTime = decadeUI.animate.lastUpdatedTime ? decadeUI.animate.lastUpdatedTime : nowTime;
				
				var e = {
					canvas: undefined,
					context: undefined,
					deltaTime: (nowTime - lastTime),
					lerp:function(min, max, fraction){
						return (max - min) * fraction + min;
					},
					save:function(){
						this.context.save();
						return this.context;
					},
					restore:function(){
						this.context.restore();
						return this.context;
					},
					drawLine:function(x1, y1, x2, y2, color, lineWidth){
						if (x1 == null || y1 == null) throw 'arguments';
						
						var context = this.context;
						context.beginPath();
						
						if (color) context.strokeStyle = color;
						if (lineWidth) context.lineWidth = lineWidth;
						
						if (x2 == null || y2 == null) {
							context.lineTo(x1, y1);
						} else {
							context.moveTo(x1, y1);
							context.lineTo(x2, y2);
						}
						
						context.stroke();
					},
					drawRect:function(x, y , width, height, color, lineWidth){
						if (x == null || y == null || width == null || height == null) throw 'arguments';
						
						var ctx = this.context;
						ctx.beginPath();
						
						if (color) ctx.strokeStyle = color;
						if (lineWidth) ctx.lineWidth = lineWidth;
						ctx.rect(x, y, width, height);
						ctx.stroke();
					},
					drawText:function(text, font, color, x, y, textAlign, textBaseline, stroke){
						if (!text) return;
						if (x == null || y == null) throw 'x or y';
						var context = this.context;
						
						if (font) context.font = font;
						if (textAlign) context.textAlign = textAlign;
						if (textBaseline) context.textBaseline = textBaseline;
						if (color) {
							if (!stroke) context.fillStyle = color;
							else context.strokeStyle = color;
						}
						
						if (!stroke) context.fillText(text, x, y);
						else context.strokeText(text, x, y);
					},
					drawStrokeText:function(text, font, color, x, y, textAlign, textBaseline){
						this.drawText(text, font, color, x, y, textAlign, textBaseline, true);
					},
					fillRect:function(x, y , width, height, color){
						if (color) this.context.fillStyle = color;
						this.context.fillRect(x, y , width, height);
					},
				}
				
				var args;
				var frames;
				var cancel = 0;
				
				frames = decadeUI.animate.frames;
				for (var i = frames.length - 1; i >= 0; i--) {
					if (frames[i] && frames[i].updates.length) {
						e.canvas = frames[i].canvas;
						e.canvas.width = e.canvas.parentNode.offsetWidth;
						e.canvas.height = e.canvas.parentNode.offsetHeight;
						e.context = e.canvas.getContext('2d');
						
						for (var j = 0; j < frames[i].updates.length; j++) {
							if (frames[i].updates[j]) {
								args = Array.from(frames[i].updates[j].inits);
								args.push(e);
								e.save();
								try {
									if (frames[i].updates[j].update.apply(frames[i].updates[j], args)) frames[i].updates.splice(j--, 1);
								} finally {
									e.restore();
								}
							}
							
							if (frames[i].updates.length == 0) { 
								cancel++;
								break;
							}
						}
					} else {
						cancel++;
					}
				}
				

				if (frames.length == cancel) {
					decadeUI.animate.lastUpdatedTime = null;
					return;
				}
				
				decadeUI.animate.lastUpdatedTime = nowTime;
				// decadeUI.animate.frameId = setTimeout(decadeUI.animate.update, 33);
				decadeUI.animate.frameId = requestAnimationFrame(decadeUI.animate.update);
			},
			cancel:function(){
				if (this.frameId == null) return;
				// clearTimeout(this.frameId);
				cancelAnimationFrame(this.frameId);
				this.frameId = null;
			},
			pause:function(){
				
			},
			resume:function(){
				
			},
		},
		resizeSensor:{
			create:function(element, func, execOpt){
				if (!(element instanceof HTMLElement) || (typeof func !== 'function')) return console.error('arguments');
				
				var sensor = {};
				for(var i in decadeUI.resizeSensor){
					if (decadeUI.resizeSensor[i]) sensor[i] = decadeUI.resizeSensor[i];
				}
				
				sensor._element = element;
				sensor._lastWidth = element.offsetWidth || 1;
				sensor._lastHeight = element.offsetHeight || 1;
				sensor._maxWidth = 10000 * (sensor._lastWidth);
				sensor._maxHeight = 10000 * (sensor._lastHeight);

				var expand = document.createElement('div');
				expand.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;z-index=-10000;overflow:hidden;visibility:hidden;transition:all 0s;';
				var shrink = expand.cloneNode(false);

				var expandChild = document.createElement('div');
				expandChild.style.cssText = 'transition: all 0s !important; animation: none !important;';
				var shrinkChild = expandChild.cloneNode(false);

				expandChild.style.width = sensor._maxWidth + 'px';
				expandChild.style.height = sensor._maxHeight + 'px';
				shrinkChild.style.width = '250%';
				shrinkChild.style.height = '250%';

				expand.appendChild(expandChild);
				shrink.appendChild(shrinkChild);
				element.appendChild(expand);
				element.appendChild(shrink);
				
				if (expand.offsetParent != element){
				  element.style.position = 'relative';
				}
				
				expand.scrollTop = shrink.scrollTop = sensor._maxHeight;
				expand.scrollLeft = shrink.scrollLeft = sensor._maxWidth;
				
				sensor.onScroll = function(){
					sensor._newWidth = sensor._element.offsetWidth || 1;
					sensor._newHeight = sensor._element.offsetHeight || 1;

					if (sensor._newWidth != sensor._lastWidth || sensor._newHeight != sensor._lastHeight){
						  sensor._lastWidth = sensor._newWidth;
						  sensor._lastHeight = sensor._newHeight;
						  requestAnimationFrame(func);
					}
					
					expand.scrollTop = shrink.scrollTop = sensor._maxHeight;
					expand.scrollLeft = shrink.scrollLeft = sensor._maxWidth;
				};
				
				expand.addEventListener('scroll', sensor.onScroll);
				shrink.addEventListener('scroll', sensor.onScroll);
				sensor._expand = expand;
				sensor._shrink = shrink;
				if (execOpt){
				    sensor.onScro();
				}
				
				return sensor;
			},
			close:function(){
				if (this == decadeUI.resizeSensor) return console.error('undefined');
				
				this.expand.removeEventListener('scroll', this.onScroll);
				this.shrink.removeEventListener('scroll', this.onScroll);
				
				if (!this._element){
					this._element.removeChild(this._expand);
					this._element.removeChild(this._shrink);
				}
			}
		},
		resources:{
			cards:{
				卡牌名称:{
					name: '拼音名',
					chinese: '中文名',
					image: new Image(),	// 图片
					loaded: false, 		// 是否已加载资源
				},
			},
			cardNames:{
				bagua: ['bagua', '八卦阵'],
				baiyin: ['baiyin', '白银狮子'],
				bingliang: ['bingliang', '兵粮寸断'],
				chitu: ['chitu', '赤兔'],
				cixiong: ['cixiong', '雌雄双股剑'],
				dawan: ['dawan', '大宛'],
				dilu: ['dilu', '的卢'],
				fangtian: ['fangtian', '方天画戟'],
				guanshi: ['guanshi', '贯石斧'],
				guding: ['guding', '古锭刀'],
				guohe: ['guohe', '过河拆桥'],
				hanbing: ['hanbing', '寒冰剑'],
				hualiu: ['hualiu', '骅骝'],
				huogong: ['huogong', '火攻'],
				huosha: ['huosha', '火杀'],
				jiedao: ['jiedao', '借刀杀人'],
				jiu: ['jiu', '酒'],
				juedou: ['juedou', '决斗'],
				jueying: ['jueying', '绝影'],
				lebu: ['lebu', '乐不思蜀'],
				leisha: ['leisha', '雷杀'],
				muniu: ['muniu', '木牛流马'],
				nanman: ['nanman', '南蛮入侵'],
				qilin: ['qilin', '麒麟弓'],
				qinggang: ['qinggang', '青釭剑'],
				qinglong: ['qinglong', '青龙偃月刀'],
				renwang: ['renwang', '仁王盾'],
				sha: ['sha', '杀'],
				shan: ['shan', '闪'],
				shandian: ['shandian', '闪电'],
				shunshou: ['shunshou', '顺手牵羊'],
				tao: ['tao', '桃'],
				taoyuan: ['taoyuan', '桃园结义'],
				tengjia: ['tengjia', '藤甲'],
				tiesuo: ['tiesuo', '铁索连环'],
				wanjian: ['wanjian', '万箭齐发'],
				wugu: ['wugu', '五谷丰登'],
				wuxie: ['wuxie', '无懈可击'],
				wuzhong: ['wuzhong', '无中生有'],
				zhangba: ['zhangba', '丈八蛇矛'],
				zhuahuang: ['zhuahuang', '爪黄飞电'],
				zhuge: ['zhuge', '诸葛连弩'],
				zhuque: ['zhuque', '朱雀羽扇'],
				zixin: ['zixin', '紫骍'],
				// ★SP包
				caomu: ['caomu', '草木皆兵'],
				du: ['du', '毒'],
				fulei: ['fulei', '浮雷'],
				jinchan: ['jinchan', '金蝉脱壳'],
				lanyinjia: ['lanyinjia', '烂银甲'],
				qibaodao: ['qibaodao', '七宝刀'],
				qijia: ['qijia', '弃甲曳兵'],
				shengdong: ['shengdong', '声东击西'],
				yinyueqiang: ['yinyueqiang', '银月枪'],
				zengbin: ['zengbin', '增兵减灶'],
				zhungangshuo: ['zhungangshuo', '衠钢槊'],
				// 国战
				chiling: ['chiling', '敕令'],
				diaohulishan: ['diaohulishan', '调虎离山'],
				dinglanyemingzhu: ['dinglanyemingzhu', '定澜夜明珠'],
				feilongduofeng: ['feilongduofeng', '飞龙夺凤'],
				huoshaolianying: ['huoshaolianying', '火烧连营'],
				huxinjing: ['huxinjing', '护心镜'],
				jingfanma: ['jingfanma', '惊帆'],
				lianjunshengyan: ['lianjunshengyan', '联军盛宴'],
				liulongcanjia: ['liulongcanjia', '六龙骖驾'],
				lulitongxin: ['lulitongxin', '勠力同心'],
				minguangkai: ['minguangkai', '明光铠'],
				sanjian: ['sanjian', '三尖两刃枪'],
				shuiyanqijunx: ['shuiyanqijux', '水淹七军'],
				taipingyaoshu: ['taipingyaoshu', '太平要术'],
				wuliu: ['wuliu', '吴六剑'],
				xietianzi: ['xietianzi', '挟天子以令诸侯'],
				yiyi: ['yiyi', '以逸待劳'],
				yuanjiao: ['yuanjiao', '远交近攻'],
				yuxi: ['yuxi', '玉玺'],
				zhibi: ['zhibi', '知己知彼'],
				// 衍生
				fengchu_card: ['fengchu_card', '凤雏'],
				ly_piliche: ['ly_piliche', '霹雳车'],
				pyzhuren_club: ['pyzhuren_club', '水波剑'],
				pyzhuren_diamond: ['pyzhuren_diamond', '烈淬刀'],
				pyzhuren_heart: ['pyzhuren_heart', '红缎枪'],
				pyzhuren_shandian: ['pyzhuren_shandian', '天雷刃'],
				pyzhuren_spade: ['pyzhuren_spade', '淬毒弯刃'],
				rewrite_bagua: ['wy_meirenji', '先天八卦阵'],
				rewrite_baiyin: ['wy_meirenji', '玉照狮子盔'],
				rewrite_lanyinjia: ['wy_meirenji', '精银甲'],
				rewrite_renwang: ['wy_meirenji', '仁王金刚盾'],
				rewrite_tengjia: ['wy_meirenji', '桐油百炼甲'],
				rewrite_zhuge: ['wy_meirenji', '元戎精械弩'],
				shuijing_card: ['shuijing_card', '水镜'],
				wolong_card: ['wolong_card', '卧龙'],
				wy_meirenji: ['wy_meirenji', '美人计'],
				wy_xiaolicangdao: ['wy_meirenji', '笑里藏刀'],
				xuanjian_card: ['xuanjian_card', '玄剑'],
				// 挑战
				chixueqingfeng: ['chixueqingfeng', '赤血青锋'],
				chiyanzhenhunqin: ['chiyanzhenhunqin', '赤焰镇魂琴'],
				guilongzhanyuedao: ['guilongzhanyuedao', '鬼龙斩月刀'],
				guofengyupao: ['guofengyupao', '国风玉袍'],
				honghuangzhili: ['honghuangzhili', '洪荒之力'],
				hongmianbaihuapao: ['hongmianbaihuapao', '红棉百花袍'],
				juechenjinge: ['juechenjinge', '绝尘金戈'],
				linglongshimandai: ['linglongshimandai', '玲珑狮蛮带'],
				longfenghemingjian: ['longfenghemingjian', '鸾凤和鸣剑'],
				qicaishenlu: ['qicaishenlu', '七彩神鹿'],
				qimenbagua: ['qimenbagua', '奇门八卦'],
				sadouchengbing: ['sadouchengbing', '撒豆成兵'],
				shufazijinguan: ['shufazijinguan', '束发紫金冠'],
				wushuangfangtianji: ['wushuangfangtianji', '无双方天戟'],
				xiuluolianyuji: ['xiuluolianyuji', '修罗炼狱戟'],
				xuwangzhimian: ['xuwangzhimian', '虚妄之冕'],
				yihuajiemu: ['yihuajiemu', '移花接木'],
				// 逐鹿天下
				caochuan: ['caochuan', '草船借箭'],
				
				jiejia: ['jiejia', '解甲归田'],
				jinhe: ['jinhe', '锦盒'],
				kaihua: ['kaihua', '树上开花'],
				numa: ['numa', '驽马'],
				nvzhuang: ['nvzhuang', '女装'],
				suolianjia: ['suolianjia', '锁链甲'],
				wufengjian: ['wufengjian', '无锋剑'],
				yajiaoqiang: ['yajiaoqiang', '涯角枪'],
				yexingyi: ['yexingyi', '夜行衣'],
				yinfengjia: ['yinfengjia', '引蜂甲'],
				zheji: ['zheji', '折戟'],
				zhulu_card: ['zhulu_card', '逐鹿天下'],
			} 
		},
		sheet:{
			init:function(){
				if (!this.sheetList){
					this.sheetList = [];
					for (var i = 0; i < document.styleSheets.length; i++){
						if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('extension/' + encodeURI(extensionName)) != -1){
							this.sheetList.push(document.styleSheets[i]);
						}
					}
				}
				
				if (this.sheetList) delete this.init;
			},
			getStyle:function(selector, cssName){
				if (!this.sheetList) this.init();
				if (!this.sheetList) throw 'sheet not loaded';
				if ((typeof selector != 'string') || !selector) throw 'parameter "selector" error';
				if (!this.cachedSheet) this.cachedSheet = {};
				if (this.cachedSheet[selector]) return this.cachedSheet[selector];
				
				
				var sheetList = this.sheetList;
				var sheet;
				var shouldBreak = false;
				
				for (var j = sheetList.length - 1; j >= 0; j--) {
					if (typeof cssName == 'string') {
						cssName = cssName.replace(/.css/, '') + '.css';
						for (var k = j; k >= 0; k--) {
							if (sheetList[k].href.indexOf(cssName) != -1) {
								sheet = sheetList[k];
							}
						}
						
						shouldBreak = true;
						if (!sheet) throw 'cssName not found';
					} else {
						sheet = sheetList[j];
					}

					for (var i = 0; i < sheet.cssRules.length; i++) {
						if (!(sheet.cssRules[i] instanceof CSSMediaRule)) {
							if (sheet.cssRules[i].selectorText == selector) {
								this.cachedSheet[selector] = sheet.cssRules[i].style;
								return sheet.cssRules[i].style;
							}
						} else {
							var rules = sheet.cssRules[i].cssRules;
							for (var j = 0; j < rules.length; j++) {
								if (rules[j].selectorText == selector) {
									return rules[j].style;
								}
							}
						}
					}
					
					
					if (shouldBreak) break;
				}
				
				return null;
			},
			insertRule:function(rule, index, cssName){
				if (!this.sheetList) this.init();
				if (!this.sheetList) throw 'sheet not loaded';
				if ((typeof rule != 'string') || !rule) throw 'parameter "rule" error';
				
				var sheet;
				if (typeof cssName == 'string') {
					for (var j = sheetList.length - 1; j >= 0; j--) {
						cssName = cssName.replace(/.css/, '') + '.css';
						if (sheetList[j].href.indexOf(cssName) != -1) {
							sheet = sheetList[k];
						}
					}
					
					if (!sheet) throw 'cssName not found';
				}
				
				if (!sheet) sheet = this.sheetList[this.sheetList.length - 1];
				var inserted = 0;
				if (typeof index == 'number'){
					inserted = sheet.insertRule(rule, index);
				} else {
					inserted = sheet.insertRule(rule, sheet.cssRules.length);
				}
				
				return sheet.cssRules[inserted].style;
			}
		},
		layout:{
			update:function(){
				this.updateHand();
				this.updateDiscard();
			},
			updateHand:function(debugName){
				if(!ui.handcards1Container || !ui.handcards1Container.firstChild || !game.me) return;
			
				var parentNode = ui.handcards1Container.firstChild;
				var handCards = [];
				for(var i = 0; i < parentNode.childElementCount; i++){
					if(!parentNode.childNodes[i].classList.contains('removing')){
						handCards.push(parentNode.childNodes[i]);
					}else{
						parentNode.childNodes[i].scaled = null;
					}
				}
				
				if (!handCards.length) return;
				
				var margin = 1;
				var scale = decadeUI.getCardBestScale();
				var cardWidth = handCards[0].offsetWidth;
				var x;
				var y = Math.round((parentNode.offsetHeight - handCards[0].offsetHeight) / 2) + 'px';
				var scaleMargin = (cardWidth - cardWidth * scale) / 2;
				cardWidth = cardWidth * scale + margin * 2;
				
				var offset = parentNode.offsetWidth - cardWidth * handCards.length;
				var overflow = offset < 0;
				if (overflow){
					cardWidth -= margin * 2;
					offset = Math.abs(offset + margin * 2 * handCards.length) / (handCards.length - 1);
				}else{
					offset /= 2;
				}
				
				for(var i = 0; i < handCards.length; i++){
					if (!handCards[i].scaled){
					    handCards[i].classList.add('transition-none');
					    x = -Math.round(scaleMargin) + 'px';
					    handCards[i].style.transform = 'translate(' + x + ',' + y + ')scale(' + scale + ')';
					    ui.refresh(handCards[i]);
					    handCards[i].scaled = true;
					    handCards[i].classList.remove('transition-none');
					}
					
					if (overflow){
						x = Math.round((i * (cardWidth - offset) - scaleMargin)) + 'px';
					}else{
						x = Math.round((offset + i * cardWidth + margin - scaleMargin)) + 'px';
					}

					handCards[i].style.transform = 'translate(' + x + ',' + y + ')scale(' + scale + ')';
					handCards[i]._transform = handCards[i].style.transform;
					handCards[i].classList.remove('drawinghidden');
				}
			},
			updateDiscard:function(){
				if (!ui.thrown) ui.thrown = [];
				for (var i = ui.thrown.length - 1; i >= 0; i--){
					if (ui.thrown[i].classList.contains('drawingcard') ||
					   ui.thrown[i].classList.contains('removing') ||
					   ui.thrown[i].parentNode != ui.arena || ui.thrown[i].moving){
						ui.thrown.splice(i, 1);
					}else{
					    ui.thrown[i].classList.remove('removing');
					}
				}
				
				
				if (!ui.thrown.length) return;
				var discards = ui.thrown;
				var parent = discards[0].parentNode;
				var scale = decadeUI.getCardBestScale();
				var margin = 1;
				var cardWidth = discards[0].offsetWidth * scale + margin * 2;
				var x;
				var y = Math.round((parent.offsetHeight - discards[0].offsetHeight) / 2) + 'px';
				var scaleOffset = (1 - scale) * discards[0].offsetWidth / 2;
				var offset = parent.offsetWidth - cardWidth * discards.length;
				var overflow = offset < 0;
				if (overflow){
					cardWidth -= margin * 2;
					offset = Math.abs(offset + margin * 2 * discards.length) / (discards.length - 1);
				}else{
					offset /= 2;
				}
				
				
				for(var i = 0; i < discards.length; i++){
					if (!discards[i].scaled){
					    discards[i].classList.add('transition-none');
					    x = ((parent.offsetWidth - discards[i].offsetWidth) / 2 - parent.offsetWidth * 0.08) + 'px';
					    discards[i].style.transform = 'translate(' + x + ',' + y + ')scale(' + scale + ')';
					    ui.refresh(discards[i]);
					    discards[i].scaled = true;
					    discards[i].classList.remove('transition-none');
					}
					
					
					if (overflow){
						x = Math.round((i * (cardWidth - offset) - scaleOffset)) + 'px';
					}else{
						x = Math.round((offset + i * cardWidth + margin - scaleOffset)) + 'px';
					}
					discards[i].style.transform = 'translate(' + x + ',' + y + ') scale(' + scale + ')';
					discards[i]._transthrown = null;
				}
			},
			updateJudges:function(player){
				if (!player) return;
				
				var judges = player.node.judges.childNodes;
				for (var i = 0; i < judges.length; i++){
					if (judges[i].classList.contains('removing'))
						continue;
					
					judges[i].classList.remove('drawinghidden');
					if (_status.connectMode) {
						if (judges[i].viewAs){
							judges[i].node.judgeMark.node.judge.innerHTML = get.translation(judges[i].viewAs)[0];
						} else {
							judges[i].node.judgeMark.node.judge.innerHTML = get.translation(judges[i].name)[0];
						}
					}
				}
				
				return;
			},
			clearout:function(card){
			    if (!card) throw card;
			    if (card.classList.contains('drawingcard') ||
			       card.classList.contains('removing') ||
			       card.fixed || card.moving) return;
			    
				if (ui.thrown.indexOf(card) == -1){
					ui.thrown.splice(0, 0, card);
					card.style.left = 'auto';
					card.style.top = 'auto';
					decadeUI.layout.updateDiscard();
				}
				
				if (!card.classList.contains('invalided')){
				    var event = _status.event;
    				var judging = event.triggername == 'judge' || event.name == 'judge';
    				if (event.name == 'judge' && !ui.clear.delay){
    				    ui.clear.delay = 'judge';
    				    Object.defineProperties(event.parent, {
        					finished: {
        						configurable: true,
        						get:function(){
        							return this._finished;
        						},
        						set:function(value){
        							this._finished = value;
        							if (this._finished == true && ui.clear.delay == 'judge'){
        							    ui.clear.delay = false;
        							    ui.clear();
        							}
        						}
        					},
        					_finished: {
        					    value: false,
        					    writable: true
        					}
        				});
    				}
    				
    				if (ui.clear.delay || (judging && !event.finished)) return;
				}
				
				card.classList.add('invalided');
				setTimeout(function(card){
					if (card.parentNode != null){
					    card.classList.add('removing');
					    card.parentNode.removeChild(card);
					}
					
					card = null;
					decadeUI.layout.invalidateDiscard();
				}, 2333, card);
			},
			delayClear:function(){
			    var timestamp = 500;
			    var nowTime = new Date().getTime();
			    if (this._delayClearTimeout){
			        clearTimeout(this._delayClearTimeout);
			        timestamp = nowTime - this._delayClearTimeoutTime;
			        if (timestamp > 1000){
			            this._delayClearTimeout = null;
			            this._delayClearTimeoutTime = null;
			            ui.clear();
			            return;
			        }
			    }else{
			        this._delayClearTimeoutTime = nowTime;
			    }
			    
			    this._delayClearTimeout = setTimeout(function(){
			        decadeUI.layout._delayClearTimeout = null;
			        decadeUI.layout._delayClearTimeoutTime = null;
			        ui.clear();
			    }, timestamp);
			},
			invalidate:function(){
			    this.invalidateHand();
			    this.invalidateDiscard();
			},
			invalidateHand:function(debugName){
			    //和上下面的有点重复，有空合并
			    var timestamp = 40;
			    var nowTime = new Date().getTime();
			    if (this._handcardTimeout){
			        clearTimeout(this._handcardTimeout);
			        timestamp = nowTime - this._handcardTimeoutTime;
			        if (timestamp > 180){
			            this._handcardTimeout = null;
			            this._handcardTimeoutTime = null;
			            this.updateHand();
			            return;
			        }
			    }else{
			        this._handcardTimeoutTime = nowTime;
			    }
			    
			    this._handcardTimeout = setTimeout(function(){
			        decadeUI.layout._handcardTimeout = null;
			        decadeUI.layout._handcardTimeoutTime = null;
			        decadeUI.layout.updateHand();
			    }, timestamp);
			},
			invalidateDiscard:function(){
			    var timestamp = (ui.thrown && ui.thrown.length > 15) ? 80 : 40;
			    var nowTime = new Date().getTime();
			    if (this._discardTimeout){
			        clearTimeout(this._discardTimeout);
			        timestamp = nowTime - this._discardTimeoutTime;
			        if (timestamp > 180){
			            this._discardTimeout = null;
			            this._discardTimeoutTime = null;
			            this.updateDiscard();
			            return;
			        }
			    }else{
			        this._discardTimeoutTime = nowTime;
			    }
			    
			    this._discardTimeout = setTimeout(function(){
			        decadeUI.layout._discardTimeout = null;
			        decadeUI.layout._discardTimeoutTime = null;
			        decadeUI.layout.updateDiscard();
			    }, timestamp);
			},
			onResize:function(){
			    if (decadeUI.isMobile()) ui.window.classList.add('mobile-phone');
				else ui.window.classList.remove('mobile-phone');
				//减少引起的抖动
				var handStyle = decadeUI.sheet.getStyle('.decadeUI > .hand-zone');
				if (!handStyle){
				    handStyle = decadeUI.sheet.insertRule('.decadeUI > .hand-zone { left: 0; right: 0; height: 0; }');
				}
				
				var buttonsWindow = decadeUI.sheet.getStyle('#window > .dialog.popped .buttons:not(.smallzoom)');
				if (!buttonsWindow) {
					buttonsWindow = decadeUI.sheet.insertRule('#window > .dialog.popped .buttons:not(.smallzoom) { zoom: 1; }');
				}
				
				var buttonsArena = decadeUI.sheet.getStyle('#arena:not(.choose-character) .buttons:not(.smallzoom)');
				if (!buttonsArena){
				    buttonsArena = decadeUI.sheet.insertRule('#arena:not(.choose-character) .buttons:not(.smallzoom) { zoom: 1; }');
				}
				
				var me = game.me ? game.me : game.players && game.players.length ? game.players[0] : null;
				
				if (me){
					var meWidth = me.offsetWidth;
					var equipsWidth = ui.equipsZone ? ui.equipsZone.offsetWidth : meWidth;
					ui.me.style.left = Math.round(meWidth + 30) + 'px';
					ui.me.style.right = Math.round(equipsWidth + 30)+ 'px';
					ui.me.style.width = 'auto';
				}
				
				decadeUI.zooms.card = decadeUI.getCardBestScale();
				if (ui.me) {
					ui.me.style.height = Math.round(decadeUI.getHandCardSize().height * decadeUI.zooms.card) + 'px';
					if (handStyle){
						handStyle.left = ui.me.style.left;
						handStyle.right = ui.me.style.right;
						handStyle.height = ui.me.style.height;
					}
				}
				
				if (buttonsArena) {
					buttonsArena.zoom = decadeUI.zooms.card;
				}
				
				if (buttonsWindow) {
					buttonsWindow.zoom = decadeUI.zooms.card;
				}
				
			    decadeUI.layout.invalidate();
			}
		},
		zooms:{
			body: 1,
			card: 1,
		},
		isMobile:function(){
		    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent));
		},
		delay:function(milliseconds){
		    if (typeof milliseconds != 'number') throw 'milliseconds is not number';
		    if(_status.paused) return;
			game.pause();
			_status.timeout = setTimeout(game.resume, milliseconds);
		},
		getRandom:function(min, max) {
			if (min == null) {
				min = -2147483648;
			}
			
			if (max == null) {
				max = 2147483648;
			}
			
			if (min > max) {
				min = min + max;
				max = min - max;
				min = min - max;
			}
			
			var diff = 0;
			if (min < 0) {
				diff = min;
				min = 0;
				max -= diff;
			}
			
			return Math.floor(Math.random() * (max + 1 - min)) + min + diff;
		},
		getCardBestScale:function(sizeOpt){
			if (!(sizeOpt && sizeOpt.height)){
			    sizeOpt = decadeUI.getHandCardSize();
			}
			
			return Math.min(document.body.clientHeight * (decadeUI.isMobile() ? 0.23 : 0.18) / sizeOpt.height, 1);
		},
		getHandCardSize:function(canUseDefault){
			var style = decadeUI.sheet.getStyle('.media_defined > .card');
			if (style == null) style = decadeUI.sheet.getStyle('.hand-cards > .handcards > .card');
			if (style == null) return canUseDefault ? { width: 108, height: 150 } : { width: 0, height: 0 };
			var size = { width: parseFloat(style.width), height: parseFloat(style.height) };
			return size;
		},
		getMapElementPos:function(elementFrom, elementTo){
			if (!(elementFrom instanceof HTMLElement) || !(elementTo instanceof HTMLElement)) return console.error('arguments');
			var rectFrom = elementFrom.getBoundingClientRect();
			var rectTo = elementTo.getBoundingClientRect();
			var pos = { x: rectFrom.left - rectTo.left, y: rectFrom.top - rectTo.top };
			pos.left = pos.x;
			pos.top = pos.y;
			return pos;
		},
		getPlayerIdentity:function(player, identity, chinese, isMark){
			if (!(player instanceof HTMLElement && get.itemtype(player) == 'player')) throw 'player';
			if (!identity) identity = player.identity;
			
			
			var mode = get.mode();
			var translated = false;
			if (!chinese) {
				switch (mode) {
					case 'identity':
						if (!player.isAlive() || player.identityShown || player == game.me) {
							identity = (player.special_identity ? player.special_identity : identity).replace(/identity_/, '');
						}
						
						break;
					
					case 'guozhan':
						if (identity == 'unknown') {
							identity = player.wontYe() ? lib.character[player.name1][1] : 'ye';
						}
						
						if (get.is.jun(player)) identity += 'jun';
						break;
						
					case 'versus':
						if (!game.me) break;
						switch (_status.mode) {
							case 'standard':
								switch (identity) {
									case 'trueZhu': return 'shuai';
									case 'trueZhong': return 'bing';
									case 'falseZhu': return 'jiang';
									case 'falseZhong': return 'zu';
								}
								break;
							case 'three':
							case 'four':
								var side = player.finalSide ? player.finalSide : player.side;
								if (side === false) identity += '_false';
								break;
								
							case 'two':
								var side = player.finalSide ? player.finalSide : player.side;
								identity = game.me.side == side ? 'friend' : 'enemy';
								break;
						}
						
						break;
					case 'doudizhu':
						identity = identity == 'zhu' ? 'dizhu' : 'nongmin';
						break;
					case 'boss':
						switch (identity) {
							case 'zhu': identity = 'boss'; break;
							case 'zhong': identity = 'cong'; break;
							case 'cai': identity = 'meng'; break;
						}
						break;
				}
			} else {
				switch(mode){
					case 'identity':
						if (identity.indexOf('cai') < 0) {
							if (isMark) {
								if (player.special_identity) identity = player.special_identity + '_bg';
							} else {
								identity = player.special_identity ? player.special_identity : identity + '2';
							}
						}
						
						// ok
						break;
						
					case 'guozhan':
						if (identity == 'unknown') {
							identity = player.wontYe() ? lib.character[player.name1][1] : 'ye';
						}
						
						if (get.is.jun(player)) {
							identity = isMark ? '君' : get.translation(identity) + '君';
						} else {
							identity = identity == 'ye' ? '野心家' : (identity == 'qun' ? '群雄' : get.translation(identity) + '将');
						}
						translated = true;
						break;
						
					case 'versus':
						translated = true;
						if (!game.me) break;
						switch (_status.mode) {
							case 'three':
							case 'standard':
							case 'four':
								switch (identity) {
									case 'zhu': identity = '主公'; break;
									case 'zhong': identity = '忠臣'; break;
									case 'fan': identity = '反贼'; break;
									default: translated = false; break;
								}
								break;
								
							case 'two':
								var side = player.finalSide ? player.finalSide : player.side;
								identity = game.me.side == side ? '友方' : '敌方';
								break;
							
							case 'siguo':
							case 'jiange':
								identity = get.translation(identity) + '将';
								break;
								
							default:
								translated = false;
								break;
						}
						break;
						
					case 'doudizhu':
						identity += '2';
						break;
					case 'boss':
						translated = true;
						switch (identity) {
							case 'zhu': identity = 'BOSS'; break;
							case 'zhong': identity = '仆从'; break;
							case 'cai': identity = '盟军'; break;
							default: translated = false; break;
						}
						break;
				}
				
				if (!translated) identity = get.translation(identity);
				if (isMark) identity = identity[0];
			}
			
			return identity;
		},
		
		get:{
			bestValueCards:function(cards, player){
				if (!player) player = _status.event.player;
				
				var matchs = [];
				var basics = [];
				var equips = [];
				var hasEquipSkill = player.hasSkill('xiaoji');
				cards.sort(function(a, b){
					return get.value(b, player) - get.value(a, player);
				});
				
				for (var i = 0; i >= 0 && i < cards.length; i++) {
					var limited = false;
					switch (get.type(cards[i])) {
						case 'basic':
							for (var j = 0; j < basics.length; j++) {
								if (!cards[i].toself && basics[j].name == cards[i].name) {
									limited = true;
									break;
								}
							}
							
							if (!limited) basics.push(cards[i]);
							break;
						
						case 'equip':
							if (hasEquipSkill) break;
							for (var j = 0; j < equips.length; j++) {
								if (get.subtype(equips[j]) == get.subtype(cards[i])) {
									limited = true;
									break;
								}
							}
							
							if (!limited) equips.push(cards[i]);
							break;
					}
					
					if (!limited) {
						matchs.push(cards[i]);
						cards.splice(i--, 1);
					}
				}
				
				cards.sort(function(a, b){
					return get.value(b, player) - get.value(a, player);
				});
				
				cards =  matchs.concat(cards);
				return cards;
			},
			cheatJudgeCards:function(cards, judges, friendly){
				if (!cards || !judges) throw arguments;
				
				var cheats = [];
				var judgeCost;
				for(var i = 0; i < judges.length; i++){
					var judge = get.judge(judges[i]);
					cards.sort(function(a, b) {
						return friendly ? judge(b) - judge(a) : judge(a) - judge(b);
					});
					
					judgeCost = judge(cards[0]);
					if ((friendly && judgeCost >= 0) || (!friendly && judgeCost < 0)) {
						cheats.push(cards.shift());
					} else {
						break;
					}
				}
				
				return cheats;
			},
		},
	};
	
	decadeUI.game = {
		wait:function(){
			game.pause();
		},
		resume:function(){
			if (!game.loopLocked) {
				var ok = false;
				try {
					if (decadeUI.eventDialog && !decadeUI.eventDialog.finished && !decadeUI.eventDialog.finishing) {
						decadeUI.eventDialog.finish();
						decadeUI.eventDialog = undefined;
						ok = true;
					}
				} finally {
					if (!ok) game.resume();
				}
			} else {
				_status.paused = false;
			}
		},
	};

	
	
	
	decadeUI.config = config;
	decadeUI.config.update = function(){
	    ui.arena.dataset.skillMarkColor = decadeUI.config.skillMarkColor;
		ui.arena.dataset.outcropSkin = decadeUI.config.outcropSkin ? 'on' : 'off';
	    ui.arena.dataset.cardSecondaryNameVisible = decadeUI.config.cardSecondaryNameVisible ? 'on' : 'off';
		ui.arena.dataset.borderLevel = decadeUI.config.borderLevel;
		ui.arena.dataset.gainSkillsVisible = decadeUI.config.gainSkillsVisible;
	};
	decadeUI.init();
	console.timeEnd(extensionName);
},
precontent:function(){
	// var explorer = window.navigator.userAgent.toLowerCase();
	// var ver = explorer.match(/chrome\/([\d.].)/)[1];
	// if (ver < 50) document.body.dataset.version = 'low';
	
	
	var extensionName = '十周年UI';
	var extension = lib.extensionMenu['extension_' + extensionName];
	if (lib.config['extension_' + extensionName + '_eruda']) {
	    var script = document.createElement('script');
        script.src = 'http://eruda.liriliri.io/eruda.min.js'; 
        document.body.appendChild(script); 
        script.onload = function(){ eruda.init(); };
	}
	
	if (!(extension && extension.enable && extension.enable.init)) return;
	
	lib.configMenu.appearence.config.layout.visualMenu = function(node, link){
		node.className = 'button character themebutton ' + lib.config.theme;
		node.classList.add(link);
		if (!node.created) {
			node.created = true;
			node.style.overflow = 'hidden';
			
			var list = ['re_caocao', 're_liubei', 'sp_zhangjiao', 'sunquan'];
			for (var i = 0; i < 4; i++) {
				var player = ui.create.div('.seat-player.fakeplayer', node);
				ui.create.div('.avatar', player).setBackground(list.randomRemove(), 'character');
			}
		}
	};
	
	if (!ui.css.layout.href || ui.css.layout.href.indexOf('long2') < 0) {
		ui.css.layout.href = lib.assetURL + 'layout/long2/layout.css';
	}
	
	var thisObject = this;
	window.decadeUIPath = lib.assetURL + 'extension/' + extensionName + '/';

	window.decadeParts = {
		init:function(){
			this.css(decadeUIPath + 'layout.css?v=' + thisObject.package.version);
			this.css(decadeUIPath + 'decadeLayout.css?v=' + thisObject.package.version);
			this.css(decadeUIPath + 'player.css?v=' + thisObject.package.version);
			
			var filePath, ok;
			var fonts = ['shousha', 'xingkai', 'xinwei'];
			var scripts = ['skill', 'content', 'effect'];
			
			var onload = function(){
				this.remove();
			};
			
			var onerror = function(){
				console.error(this.src + 'not found');
				this.remove();
			};
			
			for (var i = 0; i < scripts.length; i++) {
				ok = false;
				
				filePath = decadeUIPath + scripts[i] + '.js';
				try {
					var script = document.createElement('script');
					script.addEventListener('load', onload);
					script.addEventListener('error', onerror);
					script.src = filePath;
					document.head.appendChild(script);
					ok = true;
				} finally {
					if (!ok) console.error('script error');
				}
			}
			
			var fontPreload = document.body.appendChild(document.createElement('div'));
			var fontHtml = '';
			for (var i = 0; i < fonts.length; i++) {
				fontHtml += '<font face="' + fonts[i] + '"> </font>'
			}
			
			fontPreload.innerHTML = fontHtml;
			setTimeout(function(){
				fontPreload.remove();
				fontPreload = null;
			}, 100);
			return this;
		},
		css:function(filePath){
			if (!filePath) return console.error('filePath');
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = filePath;
			document.head.appendChild(link);
			return link;
		},
		import:function(part){
			if (!this.parts) this.parts = [];
			if (typeof part != 'function') return console.error('import failed');
			this.parts.push(part);
		},
	}.init();
	
	
	Object.defineProperties(_status, {
		connectMode: {
			configurable: true,
			get:function(){
				return this._connectMode;
			},
			set:function(value){
				this._connectMode = value;
				if (value && lib.extensions) {
					var decadeExtension;
					var startBeforeFunction = lib.init.startBefore;

					for (var i = 0; i < lib.extensions.length; i++) {
						if (lib.extensions[i][0] == extensionName) {
							decadeExtension = lib.extensions[i];
							break;
						}
					}
					
					if (!decadeExtension) return;

					lib.init.startBefore = function(){
						try {
							_status.extension = decadeExtension[0];
							_status.evaluatingExtension = decadeExtension[3];
							decadeExtension[1](decadeExtension[2], decadeExtension[4]);
							delete _status.extension;
							delete _status.evaluatingExtension;
							console.log('%c' + extensionName + ': 联机成功', 'color:blue');
						} catch(e) {
							console.log(e);
						}
						
						if (startBeforeFunction) startBeforeFunction.apply(this, arguments);
					};
				}
			}
		},
		_connectMode: {
			value: false,
			writable: true
		}
	});
	
},help:{},
config:{
    eruda:{
        name: '调试助手(开发用)',
        init: false,
    },
    cardReplace:{
        name: '使用新杀卡牌素材',
        init: true,
    },
    cardSecondaryNameVisible:{
        name: '显示卡牌辅助名称',
        init: false,
        onclick:function(value){
            game.saveConfig('extension_十周年UI_cardSecondaryNameVisible', value);
            if (window.decadeUI) ui.arena.dataset.cardSecondaryNameVisible = value ? 'on' : 'off';
        },
    },
	campIdentityImageMode:{
        name: '势力身份名图片化',
        init: true,
    },
	playerKillEffect:{
		name: '玩家击杀特效',
        init: true,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerKillEffect', value);
            if (window.decadeUI) decadeUI.config.playerKillEffect = value;
        },
	},
	gameStartEffect:{
		name: '游戏开始特效',
        init: true,
	},
	playerDieEffect:{
		name: '玩家阵亡特效',
        init: true,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerDieEffect', value);
			if (window.decadeUI) decadeUI.config.playerDieEffect = value;
        },
	},
	cardUseEffect:{
		name: '卡牌使用特效',
        init: true,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_cardUseEffect', value);
			if (window.decadeUI) decadeUI.config.cardUseEffect = value;
        },
	},
	playerLineEffect:{
		name: '玩家指示线特效',
        init: true,
		onclick:function(value){
            game.saveConfig('extension_十周年UI_playerLineEffect', value);
			if (window.decadeUI) decadeUI.config.playerLineEffect = value;
        },
	},
	outcropSkin:{
		name: '露头皮肤(需对应素材)',
        init: false,
        onclick:function(value){
            game.saveConfig('extension_十周年UI_outcropSkin', value);
			if (window.decadeUI) ui.arena.dataset.outcropSkin = value ? 'on' : 'off';
        },
	},
	borderLevel:{
		name: '玩家边框等阶',
        init: 'five',
        item:{
            one:'一阶',
			two:'二阶',
			three:'三阶',
			four:'四阶',
			five:'五阶',
        },
        onclick:function(value){
			game.saveConfig('extension_十周年UI_borderLevel', value);
			if (window.decadeUI) ui.arena.dataset.borderLevel = value;
		},
	},
	gainSkillsVisible:{
		name: '获得技能显示',
        init: 'on',
        item:{
            on: '显示',
			off: '不显示',
			othersOn : '显示他人',
        },
        onclick:function(value){
			game.saveConfig('extension_十周年UI_gainSkillsVisible', value);
			if (window.decadeUI) ui.arena.dataset.gainSkillsVisible = value;
		},
	},
    skillMarkColor:{
        name: '玩家技能标记颜色',
        init: 'yellow',
        item:{
            yellow:'黄色',
			red:'红色',
        },
        onclick:function(value){
			game.saveConfig('extension_十周年UI_skillMarkColor', value);
			if (window.decadeUI) ui.arena.dataset.skillMarkColor = value;
		},
    },
},
package:{
    character:{
        character:{
        },
        translate:{
        }
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[]
    },
    skill:{
        skill:{
        },
        translate:{
        }
    },
    intro:
    '<p style="color:rgb(200,200,000); font-size:12px; line-height:14px; text-shadow: 0 0 2px black;">' +
    '有bug请联系作者，目前置顶牌弃置后的牌有虾皮' + '<br>' +
	'1.9.98.5.1.2：<br>' +
	'- 优化了常用的字体预加载；<br>' +
	'- 修正了血条显示，如3/Infinity，3/∞，NaN显示为×；<br>' +
	'- 修正出牌记录阻挡牌堆牌数记录显示；<br>' +
    '</p>',
    author:"短歌 QQ464598631",
    diskURL:"",
    forumURL:"",
    version:"1.9.98.5.1.2",
},
files:{
    "character":[],
    "card":[],
    "skill":[]
},
editable: false
};
});

/*
1.9.97.6.2：修复不是本扩展卡牌图片溢出，因判定不能及时清理弃牌区，更正势力颜色，技能按钮位置。
1.9.97.6.3：修复类似邓小艾这种判定没有标记的bug，对决模式可能正常换装备了。新增自定义势力字图，直接放到(十周年UI/image/decoration/name_你的势力名.webp)，如果不存自动用字体代替。
1.9.97.6.5：修复国战模式势力名显示错误，新增新版布局。
1.9.97.9.1：新增身份面具，identity_你的身份名.webp，暂时关闭pc版判定牌的信息(有bug没电脑)。
1.9.97.9.2：优化对决模式中的对抗4v4显示身份面具一样，另一个命名为identity_身份名_false.webp。
1.9.98.1.1：修复游戏原版的界面缩放问题，以便更好的适配布局。增加红色技能标记。
1.9.98.1.2：修正了在新版布局未亮明武将牌的情况下装备不能正常显示，以及调整角色背景，可以自定义透明图片了，适当调宽其他玩家装备显示。
1.9.98.1.3：修复因缺少素材而造成显示身份名不正确的bug。
1.9.98.1.4：新增卡牌素材开关，卡牌左边辅助名称开关。
1.9.98.1.5：现在游戏1.8版本也能用了，不过我发现没有1.9版本流畅。
1.9.98.1.6：修复缩放问题。
1.9.98.1.7：修复PC版判定牌，新增缩放防抖动（但会模糊点）。
1.9.98.1.8：新增秃头皮肤使用开关（必须有秃头皮肤），双将默认为左右布局；调整缩放后造成的画面抖动，修正展示手牌过大的问题，修复势力名素材无法正确加载的问题。
1.9.98.1.9：修复：菜单栏显示偏移，武将选择框小；新增：人名字体自由设置，扩展联机可用。
1.9.98.1.10：修复：因联机引起的扩展加载错误。
1.9.98.1.11：
- 新增可变关闭的击杀特效、死亡特效，边框可以自由选择等阶；
- 血条框现在根据血量上限自动变化；
- 无限血量现在正常显示为 ∞ / ∞;
- 卡牌美化素材增加：国战、衍生；
- 修正只明置单将的情况下显示错误；
- 修正卡牌辅助名称上下的间距过大；
- 修正张宝符咒的技能标记显示错误；
1.9.98.1.12：
- 修复1.8版本特效失效。
1.9.98.1.13：
- 修复1.8版本特效失效。
1.9.98.2.4.1：
- 新增指示线特效（可关闭）；
- 玩家击杀自己时不再会显示击杀动画；
- 任意一方玩家没有明置的武将不再会触发击杀动画；
- 国战君主阵亡文字正常显示，玩家阵亡复活后阵亡文字仍显示修复；
1.9.98.2.4.2：
- 新增拼点框特效；
- 其他玩家装备位置修正；
- 替换卡牌的素材只需要在扩展目录正确命名即可；
1.9.98.2.4.3：
- 修复武将不能点击查看详情；
- 修复无法正常加载卡牌素材；
1.9.98.2.4.4：
- 修复bug；
1.9.98.3.2.1：
- 视为某牌、联机进度条、菜单栏、标记菜单位置调整，指示线速度调整；
1.9.98.3.2.2：
- 增加获得的技能显示（如幻化之战、合纵抗秦）；
- 修复王朗拼点、刘璋卡牌显示、阵法卡牌摸牌错误等其他BUG；
- 修正特殊坐骑牌位置；
- 修正标记的显示位置；
1.9.98.3.2.3：
- 又㕛叒叕修复标记偏移了；
- 武将获得的技能显示可以关闭；
- 有想试试观星效果的可以再准备阶段（下次估计会更改方法= =）：
- var cads = get.cards(5)；
- decadeUI.content.chooseGuanXing(player, cards, 5, null, 5);
1.9.98.3.2.4：
- 没更新啥内容，小修了下观星；
- 以及可能修复了笨战万里的不能选择；
1.9.98.3.2.5：
- 调整及修复观星界面；
1.9.98.3.2.6：
- 优化观星界面；
1.9.98.3.2.7：
- 修复观星托管BUG；
1.9.98.4.2.1：
- 修复类似【严教】技能的BUG；
1.9.98.4.2.2：
- 增加【杀】【闪】出牌特效（可关闭）；
- 【视为牌】雷属性增加闪电背景；
- 修复结算、标记卡牌大小；
- 修复移动端无法选择装备；
1.9.98.4.3.1：
- 修复【视为牌】的杀闪特效显示；
1.9.98.4.4.1：
- 移植演示观星UI的几个技能（联机模式关闭），替换的是【界观星】、【称象】、【罪论】、【恂恂】、【点化】、【纵玄】；
1.9.98.4.4.2：
- 新增修复原版【木牛流马】不能很好使用的问题，如改判、丈八等（测试阶段中。。）；
- 修复观星UI的几个技能音效问题；
1.9.98.4.4.3：
- 调整【木牛流马】用牌的规则；
1.9.98.4.4.4：
- 增加老【观星】的UI；
- 修复联机模式判定区未显示标记；
- 修复联机对抗模式自动开始的BUG；
- 修复武将详情标记文字偏移；
- 修复挑战模式的弹窗；
1.9.98.4.5.1:
- 修复联机模式其他玩家没有【十周年UI】扩展不能出牌的BUG；
- 修正联机模式进度条显示位置；
1.9.98.5.0.1:
- 增加唐咨【恂恂】、国战君张角【悟心】的UI；
- 修复类似荀攸【奇策】、刘堪【战绝】会弃掉【木牛流马】里的牌的BUG；
- 修复【木牛流马】有牌自己没有手牌，也能发动类似曹睿【明鉴】的技能的BUG；
- 修复【木牛流马】有牌自己没有手牌，敌方也对自己释放【火攻】的BUG；
- 调整类似【对策】拼牌的动画为丢牌动画；
- 调整联机模式中击杀特效由客机自己控制；
1.9.98.5.1.1:
- 增加了角色座位号显示(联机模式下只有房主有UI才显示)；
- 修复技能动画会让【木牛流马】显示的BUG；
- 修复身份模式特殊身份【军师】技能只显示牌堆顶的BUG；
- 优化【纵玄】AI无脑发动，现在根据会根据情况发动了；
1.9.98.5.1.2:
- 优化了常用的字体预加载；
- 修正了血条显示，如3/Infinity，3/∞，NaN显示为×；
- 修正出牌记录阻挡牌堆牌数记录显示；
*/