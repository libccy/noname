"use strict";
(function(){
    window.resetGameTimeout=setTimeout(function(){
        if(window.inSplash) return;
        if(window.resetExtension){
            if(confirm('游戏似乎未正常载入，是否禁用扩展并重新打开？')){
                window.resetExtension();
                window.location.reload();
            }
        }
        else{
            if(confirm('游戏似乎未正常载入，是否重置游戏？')){
				var noname_inited=localStorage.getItem('noname_inited');
                localStorage.clear();
				if(noname_inited){
					localStorage.setItem('noname_inited',noname_inited);
				}
                if(indexedDB) indexedDB.deleteDatabase('noname_0.9_data');
                window.location.reload();
            }
        }
    },5000);
    var links=document.head.querySelectorAll('link');
    for(var i=0;i<links.length;i++){
        if(links[i].href='app/color.css'){
            links[i].remove();
            break;
        }
    }
}());

(function(){
	var _status={
		paused:false,
		paused2:false,
		over:false,
		clicked:false,
		auto:false,
		event:{
			finished:true,
			next:[],
		},
		ai:{},
		lastdragchange:[],
		skillaudio:[],
		dieClose:[]
	};
	var lib={
		configprefix:'noname_0.9_',
        versionOL:3,
		updateURL:localStorage.getItem('noname_download_source')||'http://isha.applinzi.com/',
		assetURL:'',
		changeLog:[],
		updates:[],
		canvasUpdates:[],
		video:[],
		_onDB:[],
		customCharacters:[],
		customCards:[],
		skilllist:[],
		characterPack:{},
		cardPack:{},
		onresize:[],
		onwash:[],
		onover:[],
        chatHistory:[],
		arenaReady:[],
        extensions:[],
        characterDialogGroup:{
            '收藏':function(name,capt){
                return lib.config.favouriteCharacter.contains(name)?capt:null;
            },
            '最近':function(name,capt){
                return lib.config.recentCharacter.contains(name)?capt:null;
            }
        },
		onDB:function(func){
			if(lib.db){
				func();
			}
			else{
				lib._onDB.push(func);
			}
		},
		setTranslate:function(name){
			if(name.indexOf('|')==-1){
				lib.translate[name]=name;
			}
			else{
				if(name.lastIndexOf('|')>name.indexOf('|')){
					lib.translate[name]=name.slice(name.indexOf('|')+1,name.lastIndexOf('|'));
				}
				else{
					lib.translate[name]=name.slice(name.indexOf('|')+1);
				}
			}
		},
		checkCharacterName:function(name){
			if(lib.character[name]){
				if(!lib.customCharacters.contains(name)) return true;
				for(var i in lib.config.customCharacterPack){
					if(lib.config.customCharacterPack[i].character.contains(name)) return true;
				}
			}
			return false;
		},
		checkSkillName:function(name){
			if(lib.skill[name]){
				if(!lib.skill[name].createInfo) return true;
				for(var i in lib.config.customCharacterPack){
					if(lib.config.customCharacterPack[i].skill.contains(name)) return true;
				}
			}
			return false;
		},
		listenEnd:function(node){
			if(!node._listeningEnd){
				node._listeningEnd=true;
				node.addEventListener('webkitTransitionEnd',function(){
					delete node._listeningEnd;
					if(node._onEndMoveDelete){
						node.moveDelete(node._onEndMoveDelete);
					}
					else if(node._onEndDelete){
						node.delete();
					}
					node._transitionEnded=true;
				});
			}
		},
		configMenu:{
			general:{
				name:'通用',
				config:{
					cheat:{
						name:'控制台命令',
						init:false,
						onclick:function(bool){
                            game.saveConfig('cheat',bool);
                            if(_status.connectMode) return;
							if(bool){
                                lib.cheat.i();
							}
							else{
                                delete window.cheat;
								delete window.game;
								delete window.ui;
								delete window.get;
								delete window.ai;
								delete window.lib;
								delete window._status;
							}
						},
						unfrequent:true,
					},
					low_performance:{
						name:'流畅模式',
						init:false,
						onclick:function(bool){
							game.saveConfig('low_performance',bool);
							if(bool){
								ui.arena.classList.add('low_performance');
							}
							else{
								ui.arena.classList.remove('low_performance');
							}
						}
					},
					confirm_exit:{
						name:'确认退出',
						init:false,
						unfrequent:true
					},
					auto_confirm:{
						name:'自动确认',
						init:true,
						unfrequent:true,
					},
					enable_drag:{
						name:'启用拖拽',
						init:true,
						unfrequent:true,
					},
					enable_dragline:{
						name:'拖拽指示线',
						init:true,
						unfrequent:true,
					},
					enable_touchdragline:{
						name:'拖拽指示线',
						init:false,
						unfrequent:true,
					},
					wuxie_self:{
						name:'不无懈自己',
						init:true,
					},
					tao_enemy:{
						name:'不对敌将使用桃',
						init:false,
					},
					touchscreen:{
						name:'触屏模式',
						init:false,
						restart:true,
						unfrequent:true,
					},
					change_skin:{
						name:'双击换肤',
						init:true
					},
					swipe:{
						name:'滑动手势',
						init:true,
						unfrequent:true,
					},
					swipe_down:{
						name:'下划操作',
						init:'menu',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
                            chat:'显示聊天',
							off:'关闭',
						}
					},
					swipe_up:{
						name:'上划操作',
						init:'auto',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
                            chat:'显示聊天',
							off:'关闭',
						}
					},
					swipe_left:{
						name:'左划操作',
						init:'chat',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
                            chat:'显示聊天',
							off:'关闭',
						}
					},
					swipe_right:{
						name:'右划操作',
						init:'chat',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							pause:'切换暂停',
							auto:'切换托管',
                            chat:'显示聊天',
							off:'关闭',
						}
					},
					round_menu_func:{
						name:'触屏按钮操作',
						init:'system',
						unfrequent:true,
						item:{
							system:'显示按钮',
							menu:'打开菜单',
							// pause:'切换暂停',
							// auto:'切换托管'
						}
					},
					show_splash:{
						name:'显示开始界面',
						init:false,
					},
					game_speed:{
						name:'游戏速度',
						init:'mid',
						item:{
							vslow:'慢',
							slow:'较慢',
							mid:'中',
							fast:'较快',
							vfast:'快',
							vvfast:'很快',
						},
					},
					sync_speed:{
						name:'限制结算速度',
						init:true
					},
					enable_vibrate:{
						name:'开启震动',
						init:true
					},
					right_click:{
						name:'右键功能',
						init:'pause',
						unfrequent:true,
						item:{
							pause:'暂停',
							config:'选项',
							auto:'托管',
						}
					},
					right_info:{
						name:'右键显示信息',
						init:true,
						unfrequent:true,
						restart:true
					},
					hover_all:{
						name:'悬停显示信息',
						init:true,
						unfrequent:true,
						restart:true,
					},
					hover_handcard:{
						name:'悬停手牌显示信息',
						init:true,
						unfrequent:true,
					},
					hoveration:{
						name:'悬停菜单弹出时间',
						unfrequent:true,
						init:'1000',
						item:{
							'500':'0.5秒',
							'700':'0.7秒',
							'1000':'1秒',
							'1500':'1.5秒',
							'2500':'2.5秒',
						}
					},
					video:{
						name:'保存录像',
						init:'20',
						item:{
							'0':'关闭',
							'5':'五局',
							'10':'十局',
							'20':'二十局',
							'50':'五十局',
							'10000':'无限',
						},
						unfrequent:true,
					},
					mousewheel:{
						name:'滚轮控制手牌',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('mousewheel',bool);
							if(lib.config.touchscreen) return;
							if(lib.config.mousewheel){
								ui.handcards1Container.onmousewheel=ui.click.mousewheel;
								ui.handcards2Container.onmousewheel=ui.click.mousewheel;
							}
							else{
								ui.handcards1Container.onmousewheel=null;
								ui.handcards2Container.onmousewheel=null;
							}
						}
					},
					auto_check_update:{
						name:'自动检查游戏更新',
						init:false,
						unfrequent:true
					},
					update:function(config,map){
						if(config.touchscreen){
							map.mousewheel.hide();
							map.hover_all.hide();
							map.hover_handcard.hide();
							map.hoveration.hide();
							map.right_info.hide();
							map.right_click.hide();
							map.swipe.show();
							if(config.swipe){
								map.swipe_up.show();
								map.swipe_down.show();
								map.swipe_left.show();
								map.swipe_right.show();
							}
							else{
								map.swipe_up.hide();
								map.swipe_down.hide();
								map.swipe_left.hide();
								map.swipe_right.hide();
							}
						}
						else{
							map.mousewheel.show();
							map.hover_all.show();
							map.right_info.show();
							map.right_click.show();
							if(!config.hover_all){
								map.hover_handcard.hide();
								map.hoveration.hide();
							}
							else{
								map.hover_handcard.show();
								map.hoveration.show();
							}
							map.swipe.hide();
							map.swipe_up.hide();
							map.swipe_down.hide();
							map.swipe_left.hide();
							map.swipe_right.hide();
						}
						if(lib.config.enable_drag){
							if(lib.config.touchscreen){
								map.enable_dragline.hide();
								map.enable_touchdragline.show();
							}
							else{
								map.enable_dragline.show();
								map.enable_touchdragline.hide();
							}
						}
						else{
							map.enable_dragline.hide();
							map.enable_touchdragline.hide();
						}
						if(lib.config.layout!='phone'){
							map.round_menu_func.hide();
						}
						else{
							map.round_menu_func.show();
						}
					}
				}
			},
			appearence:{
				name:'外观',
				config:{
					theme:{
						name:'主题',
						init:'woodden',
						item:{},
						onclick:function(theme){
							game.saveConfig('theme',theme);
							ui.arena.hide();
							setTimeout(function(){
								var theme=ui.css.theme;
								ui.css.theme=lib.init.css(lib.assetURL+'theme/'+lib.config.theme,'style');
								theme.remove();
								setTimeout(function(){ui.arena.show();},100);
							},500);
						}
					},
					layout:{
						name:'布局',
						init:'mobile',
						item:{
							default:'旧版',
							newlayout:'对称',
							mobile:'默认',
							phone:'移动'
						},
						onclick:function(layout){
							if(lib.config.layoutfixed.contains(lib.config.mode)&&layout=='default'){
								game.saveConfig('layout',layout);
							}
							else{
								lib.init.layout(layout);
							}
						}
					},
					// background_color_music:{
					// 	name:'背景色',
					// 	init:'black',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('background_color_music',color);
					// 		document.body.dataset.background_color_music=color;
					// 	}
					// },
					// background_color_wood:{
					// 	name:'背景色',
					// 	init:'blue',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('background_color_wood',color);
					// 		document.body.dataset.background_color_wood=color;
					// 	}
					// },
					// theme_color_music:{
					// 	name:'主题色',
					// 	init:'black',
					// 	item:{
					// 		blue:'蓝色',
					// 		black:'黑色',
					// 	},
					// 	onclick:function(color){
					// 		game.saveConfig('theme_color_music',color);
					// 		document.body.dataset.theme_color_music=color;
					// 	}
					// },
					ui_zoom:{
						name:'界面缩放',
						unfrequent:true,
						init:'normal',
						item:{
							esmall:'80%',
							vsmall:'90%',
							small:'95%',
							normal:'100%',
							big:'105%',
							vbig:'110%',
							ebig:'120%',
						},
						onclick:function(zoom){
							game.saveConfig('ui_zoom',zoom);
							switch(zoom){
								case 'esmall':ui.window.style.zoom=0.8;break;
								case 'vsmall':ui.window.style.zoom=0.9;break;
								case 'small':ui.window.style.zoom=0.95;break;
								case 'big':ui.window.style.zoom=1.05;break;
								case 'vbig':ui.window.style.zoom=1.1;break;
								case 'ebig':ui.window.style.zoom=1.2;break;
								default:ui.window.style.zoom=1;
							}
						}
					},
					image_background:{
						name:'游戏背景',
						init:'default',
						item:{
							default:'默认',
							custom:'自定',
						},
						onclick:function(background){
							var animate=lib.config.image_background=='default';
							game.saveConfig('image_background',background);
							ui.background.delete();
							ui.background=ui.create.div('.background');

                            if(lib.config.image_background_blur){
                                ui.background.style.filter='blur(8px)';
                                ui.background.style.webkitFilter='blur(8px)';
                                ui.background.style.transform='scale(1.05)';
                            }
                            else{
                                ui.background.style.filter='';
                                ui.background.style.webkitFilter='';
                                ui.background.style.transform='';
                            }

							document.body.insertBefore(ui.background,document.body.firstChild);
							if(animate) ui.background.animate('start');
							if(lib.config.image_background=='default'){
								ui.background.style.backgroundImage="none";
							}
							else if(lib.config.image_background=='custom'){
								ui.background.style.backgroundImage="none";
								game.getDB('image','background',function(fileToLoad){
									if(!fileToLoad) return;
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										ui.background.style.backgroundImage='url('+data+')';
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								});
							}
							else{
								ui.background.setBackgroundImage('image/background/'+lib.config.image_background+'.jpg');
							}
							ui.background.style.backgroundSize='cover';
						},
					},
					import_background:{
						name:'<div style="white-space:nowrap;width:calc(100% - 5px)">'+
						'<input type="file" style="width:calc(100% - 40px)" accept="image/jpeg">'+
						'<button style="width:40px">确定</button></div>',
						clear:true,
					},
					image_background_blur:{
						name:'背景模糊',
						init:false,
						onclick:function(bool){
							game.saveConfig('image_background_blur',bool);
                            if(lib.config.image_background_blur){
                                ui.background.style.filter='blur(8px)';
                                ui.background.style.webkitFilter='blur(8px)';
                                ui.background.style.transform='scale(1.05)';
                            }
                            else{
                                ui.background.style.filter='';
                                ui.background.style.webkitFilter='';
                                ui.background.style.transform='';
                            }
						},
					},
					card_style:{
						name:'卡牌样式',
						init:'default',
						item:{
							default:'默认',
							wood:'木纹',
							music:'音乐',
                            simple:'原版',
							new:'新版'
						},
						onclick:function(layout){
							game.saveConfig('card_style',layout);
							var style=ui.css.card_style;
							ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card',lib.config.card_style);
							style.remove();
						},
						unfrequent:true,
					},
					cardback_style:{
						name:'卡背样式',
						init:'default',
						item:{
							default:'默认',
							wood:'木纹',
							music:'音乐',
                            official:'原版',
							new:'新版',
						},
						onclick:function(layout){
							game.saveConfig('cardback_style',layout);
							var style=ui.css.cardback_style;
							ui.css.cardback_style=lib.init.css(lib.assetURL+'theme/style/cardback',lib.config.cardback_style);
							style.remove();
						},
						unfrequent:true,
					},
					hp_style:{
						name:'体力条样式',
						init:'default',
						item:{
							default:'默认',
							official:'勾玉',
						},
						onclick:function(layout){
							game.saveConfig('hp_style',layout);
							var style=ui.css.hp_style;
							ui.css.hp_style=lib.init.css(lib.assetURL+'theme/style/hp',lib.config.hp_style);
							style.remove();
							if(lib.config.layout=='default'&&lib.config.hp_style=='official'){
								ui.arena.classList.add('hpimage');
							}
							else{
								ui.arena.classList.remove('hpimage');
							}
						},
						unfrequent:true,
					},
					show_log:{
						name:'显示历史记录',
						init:'off',
						unfrequent:true,
						item:{
							off:'关闭',
							left:'靠左',
							center:'居中',
							right:'靠右',
						},
						onclick:function(bool){
							game.saveConfig('show_log',bool);
							if(lib.config.show_log!='off'){
								ui.arenalog.style.display='';
								ui.arenalog.dataset.position=bool;
							}
							else{
								ui.arenalog.style.display='none';
								ui.arenalog.innerHTML='';
							}
						}
					},
					log_highlight:{
						name:'历史记录高亮',
						init:true,
						unfrequent:true,
					},
					glow_phase:{
						name:'当前回合角色高亮',
						unfrequent:true,
						init:'yellow',
						item:{
							none:'无',
							yellow:'黄色',
							green:'绿色',
							purple:'紫色',
						},
						onclick:function(bool){
							game.saveConfig('glow_phase',bool);
							if(_status.currentPhase){
								if(lib.config.glow_phase){
									_status.currentPhase.classList.add('glow_phase');
									ui.arena.dataset.glow_phase=lib.config.glow_phase;
								}
								else{
									_status.currentPhase.classList.remove('glow_phase');
								}
							}
						}
					},
					slim_player:{
						name:'窄边框',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('slim_player',bool);
							if(bool){
								ui.arena.classList.add('slim_player');
							}
							else{
								ui.arena.classList.remove('slim_player');
							}
						}
					},
					reduce_radius:{
						name:'减小圆角',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('reduce_radius',bool);
							if(bool){
								ui.window.classList.add('reduce_radius');
							}
							else{
								ui.window.classList.remove('reduce_radius');
							}
						}
					},
					// popup_style:{
					// 	name:'提示样式',
					// 	init:'newstyle',
					// 	item:{
					// 		newstyle:'默认',
					// 		old:'旧版'
					// 	},
					// 	unfrequent:true,
					// },
					show_card_prompt:{
						name:'显示出牌提示',
						init:true,
						unfrequent:true,
					},
					hide_card_prompt_basic:{
						name:'隐藏基本牌提示',
						init:false,
						unfrequent:true,
					},
					hide_card_prompt_equip:{
						name:'隐藏装备牌提示',
						init:false,
						unfrequent:true,
					},
					show_phase_prompt:{
						name:'显示阶段提示',
						init:true,
						unfrequent:true,
					},
					fold_card:{
						name:'折叠手牌',
						init:true,
						unfrequent:true,
					},
					auto_popped_config:{
						name:'自动弹出选项',
						init:true,
						unfrequent:true,
					},
					auto_popped_history:{
						name:'自动弹出历史',
						init:false,
						unfrequent:true,
					},
					remember_dialog:{
						name:'记住对话框位置',
						init:false,
						unfrequent:true,
					},
					reset_dialog:{
						name:'重置对话框位置',
						clear:true,
						unfrequent:true,
						onclick:function(){
							if(ui.dialog){
								var dialog=ui.dialog;
								dialog.style.transform='';
								dialog._dragtransform=[0,0];
								dialog.style.transition='all 0.3s';
								dialog._dragtouches;
								dialog._dragorigin;
								dialog._dragorigintransform;
								setTimeout(function(){
									dialog.style.transition='';
								},500);
							}
							game.saveConfig('dialog_transform',[0,0]);
						}
					},
					remember_round_button:{
						name:'记住按钮位置',
						init:false,
						unfrequent:true,
					},
					reset_round_button:{
						name:'重置按钮位置',
						clear:true,
						unfrequent:true,
						onclick:function(){
							ui.click.resetround();
						}
					},
                    character_dialog_tool:{
                        name:'自由选将显示',
                        init:'最近',
                        item:{
                            '收藏':'收藏',
                            '最近':'最近',
                            '自创':'自创',
                            all:'全部'
                        },
                        unfrequent:true,
                    },
                    recent_character_number:{
                        name:'最近使用武将',
                        init:'12',
                        item:{
                            '6':'6',
                            '12':'12',
                            '20':'24',
                            '30':'36',
                        },
                        unfrequent:true
                    },
                    show_favourite:{
                        name:'显示添加收藏',
                        init:true,
                        unfrequent:true
                    },
					hide_card_image:{
						name:'隐藏卡牌背景',
						init:false,
						unfrequent:true,
						restart:true,
					},
					show_name:{
						name:'显示武将名',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_name',bool);
							if(lib.config.show_name){
								for(var i=0;i<game.players.length;i++){
									game.players[i].node.name.style.display='';
								}
							}
							else{
								for(var i=0;i<game.players.length;i++){
									game.players[i].node.name.style.display='none';
								}
							}
						}
					},
					show_replay:{
						name:'显示重来按钮',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_replay',bool);
							if(lib.config.show_replay){
								ui.replay.style.display='';
							}
							else{
								ui.replay.style.display='none';
							}
						}
					},
					show_playerids:{
						name:'显示身份按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_playerids',bool);
							if(lib.config.show_playerids){
								ui.playerids.style.display='';
							}
							else{
								ui.playerids.style.display='none';
							}
						}
					},
					show_pause:{
						name:'显示暂停按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_pause',bool);
							if(lib.config.show_pause){
								ui.pause.style.display='';
							}
							else{
								ui.pause.style.display='none';
							}
						}
					},
					show_auto:{
						name:'显示托管按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_auto',bool);
							if(lib.config.show_auto){
								ui.auto.style.display='';
							}
							else{
								ui.auto.style.display='none';
							}
						}
					},
					show_volumn:{
						name:'显示音量按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_volumn',bool);
							if(lib.config.show_volumn){
								ui.volumn.style.display='';
							}
							else{
								ui.volumn.style.display='none';
							}
						}
					},
					show_cardpile:{
						name:'显示牌堆按钮',
						init:true,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_cardpile',bool);
							if(lib.config.show_cardpile){
								ui.cardPileButton.style.display='';
							}
							else{
								ui.cardPileButton.style.display='none';
							}
						}
					},
					show_wuxie:{
						name:'显示不询问无懈',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('show_wuxie',bool);
							if(lib.config.show_wuxie){
								ui.wuxie.style.display='';
							}
							else{
								ui.wuxie.style.display='none';
							}
						}
					},
					show_discardpile:{
						name:'暂停时显示弃牌堆',
						init:false,
						unfrequent:true,
					},
					title:{
						name:'标题栏显示信息',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('title',bool);
							if(!lib.config.title) document.title='无名杀';
						}
					},
					blur_ui:{
						name:'模糊效果',
						init:false,
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('blur_ui',bool);
							if(bool){
								ui.css.blur_ui=lib.init.css(lib.assetURL+'layout/default','blur');
							}
							else if(ui.css.blur_ui){
								ui.css.blur_ui.remove();
							}
						}
					},
					damage_shake:{
						name:'伤害抖动',
						init:true,
						unfrequent:true,
					},
					button_press:{
						name:'按钮效果',
						init:true,
						unfrequent:true,
					},
					jiu_effect:{
						name:'喝酒效果',
						init:true,
						unfrequent:true,
					},
					die_flip:{
						name:'阵亡效果',
						init:true,
						unfrequent:true,
					},
					animation:{
						name:'游戏特效',
						init:true,
					},
					skill_animation:{
						name:'技能特效',
						init:true,
					},
					target_shake:{
						name:'目标效果',
						init:'shake',
						item:{
							off:'关闭',
							zoom:'缩放',
							shake:'抖动',
						},
						unfrequent:true,
						onclick:function(bool){
							game.saveConfig('target_shake',bool);
							ui.arena.dataset.target_shake=bool;
						}
					},
					name_font:{
						name:'人名字体',
						init:'xinwei',
						unfrequent:true,
						item:{},
						onclick:function(font){
							game.saveConfig('name_font',font);
							ui.arena.dataset.name_font=font;
						}
					},
					identity_font:{
						name:'身份字体',
						init:'huangcao',
						unfrequent:true,
						item:{},
						onclick:function(font){
							game.saveConfig('identity_font',font);
							ui.arena.dataset.identity_font=font;
						}
					},
					cardtext_font:{
						name:'卡牌字体',
						init:'default',
						unfrequent:true,
						item:{},
						onclick:function(font){
							game.saveConfig('cardtext_font',font);
							ui.arena.dataset.cardtext_font=font;
						}
					},
					global_font:{
						name:'界面字体',
						init:'default',
						unfrequent:true,
						item:{},
						onclick:function(font){
							game.saveConfig('global_font',font);
							ui.arena.dataset.global_font=font;
						}
					},
					// font_size:{
					// 	name:'字体大小',
					// 	init:'16',
					// 	unfrequent:true,
					// 	item:{
					// 		'14':'14px',
					// 		'16':'16px',
					// 		'18':'18px',
					// 		'20':'20px',
					// 	},
					// 	onclick:function(font){
					// 		game.saveConfig('font_size',font);
					// 		ui.arena.dataset.font_size=font;
					// 	}
					// },
					update:function(config,map){
						if(lib.config.image_background=='default'){
							map.image_background_blur.hide();
						}
						else{
							map.image_background_blur.show();
						}
						if(lib.config.image_background=='custom'&&lib.db){
							map.import_background.show();
						}
						else{
							map.import_background.hide();
						}
						if(config.show_card_prompt){
							map.hide_card_prompt_basic.show();
							map.hide_card_prompt_equip.show();
						}
						else{
							map.hide_card_prompt_basic.hide();
							map.hide_card_prompt_equip.hide();
						}
                        if(lib.config.layout=='phone'){
                            map.remember_round_button.show();
                            map.reset_round_button.show();
                        }
                        else{
                            map.remember_round_button.hide();
                            map.reset_round_button.hide();
                        }
						// if(config.theme=='woodden'&&config.image_background=='default'){
						// 	map.background_color_wood.show();
						// }
						// else{
						// 	map.background_color_wood.hide();
						// }
						// if(config.theme=='music'&&config.image_background=='default'){
						// 	map.background_color_music.show();
						// }
						// else{
						// 	map.background_color_music.hide();
						// }
						// if(config.theme=='music'){
						// 	map.theme_color_music.show();
						// }
						// else{
						// 	map.theme_color_music.hide();
						// }
					},
				}
			},
			audio:{
				name:'音效',
				config:{
					update:function(config,map){
						if(lib.config.background_music=='music_custom'&&lib.db){
							map.import_music.show();
						}
						else{
							map.import_music.hide();
						}
					},
					background_music:{
						name:'背景音乐',
						init:true,
						item:{
							music_default:'默认',
							music_custom:'自定',
						},
						onclick:function(item){
							game.saveConfig('background_music',item);
							game.playBackgroundMusic();
						}
					},
					import_music:{
						name:'<div style="white-space:nowrap;width:calc(100% - 5px)">'+
						'<input type="file" style="width:calc(100% - 40px)" accept="audio/ogg,audio/mpeg">'+
						'<button style="width:40px">确定</button></div>',
						clear:true,
					},
					background_audio:{
						name:'游戏音效',
						init:true,
					},
					background_speak:{
						name:'人物配音',
						init:true,
					},
					background_ogg:{
						name:'补全配音',
						init:true
					},
					volumn_audio:{
						name:'音效音量',
						init:8,
						item:{
							'1':'一',
							'2':'二',
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
						},
						onclick:function(volume){
							game.saveConfig('volumn_audio',parseInt(volume));
						}
					},
					volumn_background:{
						name:'音乐音量',
						init:8,
						item:{
							'1':'一',
							'2':'二',
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
						},
						onclick:function(volume){
							game.saveConfig('volumn_background',parseInt(volume));
							ui.backgroundMusic.volume=volume/8;
						}
					}
				}
			},
			extension:{
				name:'扩展',
				config:{
					character:{
					    name:'技能卡牌',
					    init:false,
					    restart:true,
					    onclick:function(bool){
					        if(bool){
					            lib.config.plays.add('character');
					        }
					        else{
					            lib.config.plays.remove('character');
					        }
					        game.saveConfig('plays',lib.config.plays);
					    }
					},
					character_num_playpackconfig:{
					    name:'卡牌比例',
					    init:'0.05',
					    item:{
					        '0.02':'2%',
					        '0.05':'5%',
					        '0.1':'10%',
					        '0.2':'20%',
					    }
					},
					character_hide_playpackconfig:{
					    name:'隐藏此扩展',
					    clear:true,
					    onclick:function(){
							lib.config.hiddenPlayPack.add('character');
							game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
						}
					},
					soldier:{
					    name:'士兵模式',
					    init:false,
					    restart:true,
					    onclick:function(bool){
					        if(bool){
					            lib.config.plays.add('soldier');
					        }
					        else{
					            lib.config.plays.remove('soldier');
					        }
					        game.saveConfig('plays',lib.config.plays);
					    }
					},
					soldier_hide_playpackconfig:{
					    name:'隐藏此扩展',
					    clear:true,
					    onclick:function(){
							lib.config.hiddenPlayPack.add('soldier');
							game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
						}
					},
					wuxing:{
					    name:'五行生克',
					    init:false,
					    restart:true,
					    onclick:function(bool){
					        if(bool){
					            lib.config.plays.add('wuxing');
					        }
					        else{
					            lib.config.plays.remove('wuxing');
					        }
					        game.saveConfig('plays',lib.config.plays);
					    }
					},
					wuxing_num_playpackconfig:{
					    name:'带属性卡牌',
					    init:'0.3',
					    item:{
					        '0.1':'10%',
					        '0.2':'20%',
					        '0.3':'30%',
					        '0.5':'50%',
					    }
					},
					wuxing_hide_playpackconfig:{
					    name:'隐藏此扩展',
					    clear:true,
					    onclick:function(){
							lib.config.hiddenPlayPack.add('wuxing');
							game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
						}
					},
					weather:{
					    name:'天气变化',
					    init:false,
					    restart:true,
					    onclick:function(bool){
					        if(bool){
					            lib.config.plays.add('weather');
					        }
					        else{
					            lib.config.plays.remove('weather');
					        }
					        game.saveConfig('plays',lib.config.plays);
					    }
					},
					// weather_animation_playpackconfig:{
					// 	name:'天气动画',
					// 	init:true
					// },
					weather_noqing_playpackconfig:{
					    name:'异常天气出现概率',
					    init:'0.5',
					    item:{
					        '0.1':'10%',
					        '0.3':'30%',
					        '0.5':'50%',
					        '0.7':'70%',
					        '0.9':'90%',
					    }
					},
					weather_chance_playpackconfig:{
					    name:'天气效果触发概率',
					    init:'0.5',
					    item:{
					        '0.1':'10%',
					        '0.2':'20%',
					        '0.3':'30%',
					        '0.5':'50%',
					        '0.8':'80%',
					    },
					    onclick:function(item){
					        game.saveConfig('weather_chance_playpackconfig',item);
					        _status.weatherchance=parseFloat(lib.config.weather_chance_playpackconfig)||0;
					    }
					},
					weather_duration_playpackconfig:{
					    name:'异常天气持续时间',
					    init:'[4,4]',
					    item:{
					        '[2,4]':'1~3回合',
					        '[4,4]':'3~6回合',
					        '[4,7]':'3~9回合',
					        '[7,4]':'6~9回合',
					        '[7,7]':'6~12回合',
					    }
					},
					weather_qingduration_playpackconfig:{
					    name:'晴朗天气持续时间',
					    init:'[2,4]',
					    item:{
					        '[2,4]':'1~3回合',
					        '[4,4]':'3~6回合',
					        '[4,7]':'3~9回合',
					        '[7,4]':'6~9回合',
					        '[7,7]':'6~12回合',
					    }
					},
					weather_hide_playpackconfig:{
					    name:'隐藏此扩展',
					    clear:true,
					    onclick:function(){
							lib.config.hiddenPlayPack.add('weather');
							game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
						}
					},
					coin:{
					    name:'富甲天下',
					    init:false,
					    restart:true,
					    onclick:function(bool){
					        if(bool){
					            lib.config.plays.add('coin');
					        }
					        else{
					            lib.config.plays.remove('coin');
					        }
					        game.saveConfig('plays',lib.config.plays);
					    }
					},
					coin_display_playpackconfig:{
					    name:'金币显示',
					    init:'text',
					    item:{
					        symbol:'符号',
					        text:'文字'
					    },
					    onclick:function(item){
					        game.saveConfig('coin_display_playpackconfig',item);
					        if(game.changeCoin) game.changeCoin(0);
					    }
					},
					coin_canvas_playpackconfig:{
					    name:'特效置顶',
					    init:false,
					    onclick:function(bool){
					        game.saveConfig('coin_canvas_playpackconfig',bool);
					        if(bool){
					            ui.window.classList.add('canvas_top');
					        }
					        else{
					            ui.window.classList.remove('canvas_top');
					        }
					    }
					},
					coin_hide_playpackconfig:{
					    name:'隐藏此扩展',
					    clear:true,
					    onclick:function(){
							lib.config.hiddenPlayPack.add('coin');
							game.saveConfig('hiddenPlayPack',lib.config.hiddenPlayPack);
						}
					},
					update:function(config,map){
						for(var i in map){
							if(i.indexOf('extension_')==0) continue;
					        if(i.indexOf('_playpackconfig')!=-1){
								var packname=i.slice(0,i.indexOf('_'));
					            map[i].classList.add('indent');
					            if(!lib.config.hiddenPlayPack.contains(packname)&&
									lib.config.plays.contains(packname)){
					                map[i].show();
					            }
					            else{
					                map[i].hide();
					            }
					        }
					        else{
								if(lib.config.hiddenPlayPack.contains(i)){
									map[i].hide();
								}
								else{
									if(lib.config.plays.contains(i)){
						                map[i].classList.add('on');
						            }
						            else{
						                map[i].classList.remove('on');
						            }
								}
					        }
					    }
						for(var i=0;i<lib.config.extensions.length;i++){
							var name='extension_'+lib.config.extensions[i];
							for(var j in map){
								if(j!=name&&j.indexOf(name)==0){
									map[j].classList.add('indent');
									if(config[name]){
										map[j].show();
									}
									else{
										map[j].hide();
									}
								}
							}
						}
					}
				}
			},
			skill:{
				name:'技能',
				config:{
					update:function(config,map){
						for(var i in map){
							if(map[i]._link.config.type=='autoskill'){
								if(!lib.config.autoskilllist.contains(i)){
									map[i].classList.add('on');
									ui.autoskill[i].lastChild.classList.add('on');
								}
								else{
									map[i].classList.remove('on');
									ui.autoskill[i].lastChild.classList.remove('on');
								}
							}
							else if(map[i]._link.config.type=='banskill'){
								if(!lib.config.forbidlist.contains(i)){
									map[i].classList.add('on');
								}
								else{
									map[i].classList.remove('on');
								}
							}
						}
					}
				}
			},
			others:{
				name:'其它',
				config:{
					reset_game:{
						name:'重置游戏设置',
						onclick:function(){
							var node=this;
							if(node._clearing){
								var noname_inited=localStorage.getItem('noname_inited');
				                localStorage.clear();
								if(noname_inited){
									localStorage.setItem('noname_inited',noname_inited);
								}
								game.reload();
								return;
							}
							node._clearing=true;
							node.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.innerHTML='重置游戏';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true
					},
					reset_database:{
						name:'重置自定义武将及录像',
						onclick:function(){
							var node=this;
							if(node._clearing){
								if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
								game.reload();
								return;
							}
							node._clearing=true;
							node.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.innerHTML='重置自定义武将及录像';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true
					},
					reset_hiddenpack:{
						name:'重置隐藏扩展包',
						onclick:function(){
							if(this.innerHTML!='已重置'){
								this.innerHTML='已重置'
								game.saveConfig('hiddenModePack',[]);
								game.saveConfig('hiddenCharacterPack',[]);
								game.saveConfig('hiddenCardPack',[]);
								game.saveConfig('hiddenPlayPack',[]);
								var that=this;
								setTimeout(function(){
									that.innerHTML='重置隐藏扩展包';
								},500);
							}
						},
						clear:true
					},
					reset_tutorial:{
						name:'重置新手向导',
						onclick:function(){
							if(this.innerHTML!='已重置'){
								this.innerHTML='已重置'
								game.saveConfig('new_tutorial',false);
								var that=this;
								setTimeout(function(){
									that.innerHTML='重置新手向导';
								},500);
							}
						},
						clear:true
					},
					import_data:{
						name:'导入游戏设置',
						onclick:function(){
							ui.import_data_button.classList.toggle('hidden');
						},
						clear:true
					},
					import_data_button:{
						name:'<div style="white-space:nowrap;width:calc(100% - 10px)">'+
						'<input type="file" style="width:calc(100% - 40px)">'+
						'<button style="width:40px">确定</button></div>',
						clear:true,
					},
					export_data:{
						name:'导出游戏设置',
						onclick:function(){
							var data={};
							for(var i in localStorage){
								data[i]=localStorage[i];
							}
							game.export(lib.init.encode(JSON.stringify(data)),'无名杀 - 数据 - '+(new Date()).toLocaleString());
						},
						clear:true
					},
					trim_game:{
						name:'隐藏非官方扩展包',
						onclick:function(){
							if(this.innerHTML!='已隐藏'){
								this.innerHTML='已隐藏';
								game.saveConfig('hiddenModePack',['stone','chess','boss']);
								game.saveConfig('hiddenCardPack',['zhenfa','yunchou','swd','shenqi','hearth','compensate']);
								game.saveConfig('hiddenCharacterPack',['diy','yxs','hearth','swd','gujian','xianjian','xiake','boss']);
								var that=this;
								setTimeout(function(){
									that.innerHTML='隐藏非官方扩展包';
								},500);
							}
						},
						clear:true
					}
				}
			}
		},
		mode:{
			identity:{
		        name:'身份',
                connect:true,
		        config:{
					update:function(config,map){
                        if(ui.connectButton.classList.contains('glow')){
                            for(var i in map){
                                if(map[i]._link.config.connect){
                                    map[i].style.display='';
                                }
                                else{
                                    map[i].style.display='none';
                                }
                            }
                            map.observe.show();
                            map.choose_timeout.show();
                        }
                        else{
                            for(var i in map){
                                map[i].style.display='';
                            }
                            map.observe.hide();
                            map.choose_timeout.hide();
                        }
						if(config.identity_mode=='zhong'){
							map.player_number.hide();
							map.enhance_zhu.hide();
							map.double_nei.hide();
							map.auto_identity.hide();
							map.choice_zhu.hide();
							map.choice_zhong.hide();
							map.choice_nei.hide();
							map.choice_fan.hide();
						}
						else{
							map.player_number.show();
							map.enhance_zhu.show();
							map.auto_identity.show();
							if(config.player_number!='2'){
								map.double_nei.show();
							}
							else{
								map.double_nei.hide();
							}
							map.choice_zhu.show();
							map.choice_zhong.show();
							map.choice_nei.show();
							map.choice_fan.show();
						}
					},
					identity_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'普通',
							zhong:'明忠'
						},
						restart:true,
						frequent:true,
                        connect:true
					},
                    choose_timeout:{
                        name:'出牌时限',
                        init:'30',
                        item:{
                            '10':'10秒',
                            '15':'15秒',
                            '30':'30秒',
                            '60':'60秒',
                            '90':'90秒',
                        },
                        connect:true,
                        frequent:true
                    },
		            player_number:{
		                name:'游戏人数',
		                init:'8',
		                item:{
		                    '2':'两人',
		                    '3':'三人',
		                    '4':'四人',
		                    '5':'五人',
		                    '6':'六人',
		                    '7':'七人',
		                    '8':'八人'
		                },
		                frequent:true,
						restart:true,
                        connect:true
		            },
                    observe:{
                        name:'允许旁观',
                        init:false,
                        connect:true
                    },
					double_nei:{
						name:'双内奸',
						init:false,
						restart:true,
                        frequent:true,
                        connect:true
					},
		            double_character:{
		                name:'双将模式',
		                init:false,
		                frequent:true,
		                restart:true,
                        connect:true
		            },
		            double_hp:{
		                name:'双将体力上限',
		                init:'pingjun',
		                item:{
		                    hejiansan:'和减三',
		                    pingjun:'平均值',
		                    zuidazhi:'最大值',
		                    zuixiaozhi:'最小值',
		                    zonghe:'相加',
		                },
		                restart:true,
                        connect:true
		            },
					auto_identity:{
						name:'自动显示身份',
						item:{
							off:'关闭',
							one:'一轮',
							two:'两轮',
							three:'三轮',
							always:'始终'
						},
						init:'off',
						onclick:function(bool){
							game.saveConfig('auto_identity',bool,this._link.config.mode);
							if(get.config('identity_mode')=='zhong') return;
							var num;
							switch(bool){
								case '一轮':num=1;break;
								case '两轮':num=2;break;
								case '三轮':num=3;break;
								default:num=0;break;
							}
							if(num&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
								_status.identityShown=true;
								game.showIdentity(false);
							}
						}
					},
					auto_mark_identity:{
						name:'自动标记身份',
						init:true,
					},
		            ban_weak:{
		                name:'屏蔽弱将',
						init:false,
						restart:true,
                        connect:true
		            },
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
                        connect:true
		            },
					enhance_zhu:{
						name:'加强主公',
						init:false,
						restart:true,
                        connect:true
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2;
								}
							}
						}
					},
					change_identity:{
						name:'自由选择身份和座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							var dialog;
							if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
							else dialog=_status.event.dialog;
							if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
							ui.update();
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
					},
					change_card:{
						name:'开启手气卡',
						init:'disabled',
						item:{
							disabled:'禁用',
							once:'一次',
							twice:'两次',
							unlimited:'无限',
						},
					},
					continue_game:{
						name:'显示再战',
						init:false,
						onclick:function(bool){
							game.saveConfig('continue_game',bool,this._link.config.mode);
							if(get.config('continue_game')){
								if(!ui.continue_game&&_status.over){
									ui.continue_game=ui.create.control('再战',game.reloadCurrent);
								}
							}
							else if(ui.continue_game){
								ui.continue_game.close();
								delete ui.continue_game;
							}
						}
					},
					dierestart:{
						name:'死亡后显示重来',
						init:true,
						onclick:function(bool){
							game.saveConfig('dierestart',bool,this._link.config.mode);
							if(get.config('dierestart')){
								if(!ui.restart&&game.me.isDead()&&!_status.connectMode){
									ui.restart=ui.create.control('restart',game.reload);
								}
							}
							else if(ui.restart){
								ui.restart.close();
								delete ui.restart;
							}
						}
					},
					revive:{
						name:'死亡后显示复活',
						init:false,
						onclick:function(bool){
							game.saveConfig('revive',bool,this._link.config.mode);
							if(get.config('revive')){
								if(!ui.revive&&game.me.isDead()){
									ui.revive=ui.create.control('revive',ui.click.dierevive);
								}
							}
							else if(ui.revive){
								ui.revive.close();
								delete ui.revive;
							}
						}
					},
					ai_strategy:{
						name:'内奸策略',
						init:'ai_strategy_1',
						item:{
							ai_strategy_1:'均衡',
							ai_strategy_2:'偏反',
							ai_strategy_3:'偏忠',
							ai_strategy_4:'酱油',
							ai_strategy_5:'天使',
							ai_strategy_6:'仇主',
						},
					},
					difficulty:{
						name:'AI对人类态度',
						init:'normal',
						item:{
							easy:'友好',
							normal:'一般',
							hard:'仇视',
						},
					},
					choice_zhu:{
						name:'主公候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_zhong:{
						name:'忠臣候选武将数',
						init:'4',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_nei:{
						name:'内奸候选武将数',
						init:'5',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
					choice_fan:{
						name:'反贼候选武将数',
						init:'3',
						restart:true,
						item:{
							'3':'三',
							'4':'四',
							'5':'五',
							'6':'六',
							'8':'八',
							'10':'十',
						},
					},
		        }
		    },
		    guozhan:{
		        name:'国战',
		        config:{
					guozhan_mode:{
						name:'游戏模式',
						init:'normal',
						item:{
							normal:'普通',
							mingjiang:'明将'
						},
						frequent:true,
					},
		            player_number:{
		                name:'游戏人数',
		                init:'8',
		                item:{
		                    '3':'三人',
		                    '4':'四人',
		                    '5':'五人',
		                    '6':'六人',
		                    '7':'七人',
		                    '8':'八人'
		                },
		                frequent:true,
						restart:true,
		            },
					initshow_draw:{
						name:'首亮摸牌',
						item:{
							'0':'无',
							'1':'一张',
							'2':'两张',
							'3':'三张',
						},
						init:'2',
						frequent:true,
					},
					zhulian:{
						name:'珠联璧合',
						init:true,
						frequent:true,
					},
		            double_hp:{
		                name:'双将体力上限',
		                init:'pingjun',
		                item:{
		                    hejiansan:'和减三',
		                    pingjun:'平均值',
		                    zuidazhi:'最大值',
		                    zuixiaozhi:'最小值',
		                    zonghe:'相加',
		                },
		                restart:true,
		            },
		            ban_weak:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
		            },
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
		            },
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2;
								}
							}
						}
					},
					change_identity:{
						name:'自由选择座位',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_identity',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							var dialog;
							if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
							else dialog=_status.event.dialog;
							if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.getParent().addSetting(dialog);
							else _status.event.getParent().removeSetting(dialog);
							ui.update();
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						}
					},
					change_card:{
						name:'开启手气卡',
						init:'disabled',
						item:{
							disabled:'禁用',
							once:'一次',
							twice:'两次',
							unlimited:'无限',
						}
					},
					continue_game:{
						name:'显示再战',
						init:true,
						onclick:function(bool){
							game.saveConfig('continue_game',bool,this._link.config.mode);
							if(get.config('continue_game')){
								if(!ui.continue_game&&_status.over){
									ui.continue_game=ui.create.control('再战',game.reloadCurrent);
								}
							}
							else if(ui.continue_game){
								ui.continue_game.close();
								delete ui.continue_game;
							}
						}
					},
					dierestart:{
						name:'死亡后显示重来',
						init:true,
						onclick:function(bool){
							game.saveConfig('dierestart',bool,this._link.config.mode);
							if(get.config('dierestart')){
								if(!ui.restart&&game.me.isDead()&&!_status.connectMode){
									ui.restart=ui.create.control('restart',game.reload);
								}
							}
							else if(ui.restart){
								ui.restart.close();
								delete ui.restart;
							}
						}
					},
					revive:{
						name:'死亡后显示复活',
						init:false,
						onclick:function(bool){
							game.saveConfig('revive',bool,this._link.config.mode);
							if(get.config('revive')){
								if(!ui.revive&&game.me.isDead()){
									ui.revive=ui.create.control('revive',ui.click.dierevive);
								}
							}
							else if(ui.revive){
								ui.revive.close();
								delete ui.revive;
							}
						}
					},
					difficulty:{
						name:'AI对人类态度',
						init:'normal',
						item:{
							easy:'友好',
							normal:'一般',
							hard:'仇视',
						}
					},
					choice_num:{
						name:'候选武将数',
						init:'7',
						restart:true,
						item:{
							'5':'五',
							'6':'六',
							'7':'七',
							'8':'八',
							'9':'九',
							'10':'十',
						}
					},
		        }
		    },
			versus:{
				name:'对决',
				config:{
					update:function(config,map){
						if(config.versus_mode=='four'){
							map.change_choice.hide();
							map.enable_all.show();
							map.four_assign.show();
						}
						else{
							map.change_choice.show();
							map.enable_all.hide();
							map.four_assign.hide();
						}
						if(config.versus_mode=='jiange'){
							map.free_choose.show();
							map.double_character_jiange.show();
						}
						else{
							map.free_choose.hide();
							map.double_character_jiange.hide();
						}
					},
					versus_mode:{
						name:'游戏模式',
						init:'standard',
						item:{
							standard:'标准',
							jiange:'剑阁',
							four:'<span style="display:inline-block;width:100%;text-align:center">4v4</span>'
						},
						restart:true,
						frequent:true,
					},
					enable_all:{
						name:'启用全部武将',
						init:false,
						frequent:true,
						restart:true,
					},
					four_assign:{
						name:'代替队友选将',
						init:true,
						frequent:true,
						restart:true,
					},
					free_choose:{
						name:'自由选将',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!ui.create.cheat2) return;
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
							}
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
						frequent:true,
					},
					double_character_jiange:{
						name:'双将模式',
						init:false,
						frequent:true,
					},
					ban_weak:{
		                name:'屏蔽弱将',
						init:false,
						restart:true,
						// frequent:true,
		            },
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
						// frequent:true,
		            },
				}
			},
			boss:{
				name:'挑战',
				config:{
					free_choose:{
						name:'自由选将',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2;
								}
							}
						}
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
						frequent:true,
					},
					single_control:{
						name:'单人控制',
						init:true,
						frequent:true,
						onclick:function(bool){
							game.saveConfig('single_control',bool,this._link.config.mode);
							if(ui.single_swap&&game.me!=game.boss){
								if(bool){
									ui.single_swap.style.display='none';
								}
								else{
									ui.single_swap.style.display='';
								}
							}
						},
					},
					ban_weak:{
						name:'屏蔽弱将',
						init:false,
						restart:true,
						frequent:true,
					},
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
						frequent:true,
		            },
				}
			},
			chess:{
				name:'战棋',
				config:{
					chess_mode:{
						name:'游戏模式',
						init:'combat',
						item:{
							combat:'对战',
							leader:'君主',
							tafang:'塔防'
						},
						restart:true,
						frequent:true,
					},
					update:function(config,map){
						if(config.chess_mode=='leader'){
							map.chess_leader_save.show();
							map.chess_leader_clear.show();
							map.chess_character.hide();
						}
						else{
							map.chess_leader_save.hide();
							map.chess_leader_clear.hide();
							map.chess_character.show();
						}
						if(config.chess_mode=='combat'){
							// map.battle_number.show();
							// map.chess_ordered.show();
							map.free_choose.show();
							map.change_choice.show();
						}
						else{
							// map.battle_number.hide();
							// map.chess_ordered.hide();
							map.free_choose.hide();
							map.change_choice.hide();
						}
						if(config.chess_mode=='tafang'){
							map.chess_treasure.hide();
							map.chess_obstacle.hide();
							map.tafang_size.show();
							map.tafang_turn.show();
							map.tafang_difficulty.show();
						}
						else{
							map.chess_treasure.show();
							map.chess_obstacle.show();
							map.tafang_size.hide();
							map.tafang_turn.hide();
							map.tafang_difficulty.hide();
						}
						if(config.chess_mode!='leader'){
							map.ban_weak.show();
							map.ban_strong.show();
						}
						else{
							map.ban_weak.hide();
							map.ban_strong.hide();
						}
					},
					tafang_turn:{
						name:'游戏胜利',
						init:'20',
						frequent:true,
						item:{
							'10':'十回合',
							'20':'二十回合',
							'30':'三十回合',
							'1000':'无限',
						}
					},
					tafang_size:{
						name:'战场大小',
						init:'9',
						frequent:true,
						item:{
							'6':'小',
							'9':'中',
							'12':'大',
						}
					},
					tafang_difficulty:{
						name:'战斗难度',
						init:'2',
						frequent:true,
						item:{
							'1':'简单',
							'2':'普通',
							'3':'困难',
						}
					},
					chess_leader_save:{
						name:'选择历程',
						init:'save1',
						item:{
							save1:'一',
							save2:'二',
							save3:'三',
							save4:'四',
							save5:'五',
						},
						restart:true,
						frequent:true,
					},
					chess_leader_clear:{
						name:'清除进度',
						onclick:function(){
							var node=this;
							if(node._clearing){
								game.save(get.config('chess_leader_save'),null);
								window.location.reload();
								return;
							}
							node._clearing=true;
							node.innerHTML='单击以确认 (3)';
							setTimeout(function(){
								node.innerHTML='单击以确认 (2)';
								setTimeout(function(){
									node.innerHTML='单击以确认 (1)';
									setTimeout(function(){
										node.innerHTML='清除进度';
										delete node._clearing;
									},1000);
								},1000);
							},1000);
						},
						clear:true,
						frequent:true,
					},
					chess_treasure:{
						name:'战场机关',
						init:'0.2',
						frequent:true,
						item:{
							'0':'关闭',
							'0.1':'较少出现',
							'0.2':'偶尔出现',
							'0.333':'时常出现',
							'0.5':'频繁出现',
						}
					},
					chess_obstacle:{
						name:'随机路障',
						init:'0',
						item:{
							'0':'关闭',
							'0.2':'少量',
							'0.333':'中量',
							'0.5':'大量',
						},
						frequent:true,
					},
					attack_move:{
						name:'击退效果',
						init:true,
					},
					show_range:{
						name:'显示卡牌范围',
						init:true,
					},
					show_distance:{
						name:'显示距离',
						init:true,
					},
					chess_character:{
						name:'战棋武将',
						init:true,
					},
					// chess_jiange:{
					// 	name:'守卫剑阁',
					// 	init:true,
					// },
					chess_card:{
						name:'战棋卡牌',
						init:true,
					},
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2;
								}
							}
						},
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
					},
					ban_weak:{
		                name:'屏蔽弱将',
						init:false,
						restart:true,
		            },
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
		            },
					chessscroll_speed:{
						name:'边缘滚动速度',
						init:'20',
						item:{
							'0':'不滚动',
							'10':'10格/秒',
							'20':'20格/秒',
							'30':'30格/秒',
						}
					},
				}
			},
			stone:{
				name:'炉石',
				config:{
					update:function(config,map){
						if(config.stone_mode=='deck'){
							// map.deck_length.show();
							// map.deck_repeat.show();
							map.random_length.hide();
							map.skill_bar.show();
						}
						else{
							// map.deck_length.hide();
							// map.deck_repeat.hide();
							map.random_length.show();
							map.skill_bar.hide();
						}
					},
					stone_mode:{
						name:'游戏模式',
						init:'deck',
						item:{
							deck:'构筑',
							random:'随机'
						},
						restart:true,
						frequent:true,
					},
					// deck_length:{
					// 	name:'卡组长度',
					// 	init:'30',
					// 	item:{
					// 		'30':'30张',
					// 		'50':'50张',
					// 		'80':'80张',
					// 	},
					// 	frequent:true,
					// },
					// deck_repeat:{
					// 	name:'重复卡牌',
					// 	init:'2',
					// 	item:{
					// 		'2':'2张',
					// 		'3':'3张',
					// 		'5':'5张',
					// 		'80':'无限',
					// 	},
					// 	frequent:true,
					// },
					random_length:{
						name:'随从牌数量',
						init:'1/80',
						item:{
							'1/120':'少',
							'1/80':'中',
							'1/50':'多',
						},
						frequent:true,
					},
					battle_number:{
						name:'出场人数',
						init:'1',
						frequent:true,
						item:{
							'1':'一人',
							'2':'两人',
							'3':'三人',
							'4':'四人',
							'6':'六人',
							'8':'八人',
							'10':'十人',
						},
						onclick:function(num){
							game.saveConfig('battle_number',num,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(_status.event.getParent().changeDialog){
								_status.event.getParent().changeDialog();
							}
						},
					},
					mana_mode:{
						name:'行动值变化',
						init:'inc',
						item:{
							inf:'涨落',
							inc:'递增'
						},
						frequent:true
					},
					skill_bar:{
						name:'怒气值',
						init:true,
						frequent:true,
						restart:true,
					},
		            double_character:{
		                name:'双将模式',
		                init:false,
		                frequent:true,
						restart:function(){
							return _status.event.getParent().name!='chooseCharacter'||_status.event.name!='chooseButton';
						}
		            },
					free_choose:{
						name:'自由选将',
						init:true,
						onclick:function(bool){
							game.saveConfig('free_choose',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
							else if(ui.cheat2&&!get.config('free_choose')){
								ui.cheat2.close();
								delete ui.cheat2;
								if(ui.cheat2x){
									ui.cheat2x.close();
									delete ui.cheat2;
								}
							}
						},
					},
					change_choice:{
						name:'开启换将卡',
						init:true,
						onclick:function(bool){
							game.saveConfig('change_choice',bool,this._link.config.mode);
							if(!_status.event.getParent().showConfig&&!_status.event.showConfig) return;
							if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
							else if(ui.cheat&&!get.config('change_choice')){
								ui.cheat.close();
								delete ui.cheat;
							}
						},
					},
					ban_weak:{
		                name:'屏蔽弱将',
						init:false,
						restart:true,
		            },
		            ban_strong:{
		                name:'屏蔽强将',
						init:false,
						restart:true,
		            },
				}
			},
            connect:{
                name:'联机',
                config:{
                    connect_nickname:{
                        name:'联机昵称',
                        input:true,
                        frequent:true,
                        init:'无名玩家'
                    },
                    connect_avatar:{
                        name:'联机头像',
                        init:'caocao',
                        item:{},
                        frequent:true,
                        onclick:function(item){
                            game.saveConfig('connect_avatar',item);
                            game.saveConfig('connect_avatar',item,'connect');
                        }
                    },
                    connect_start:{
                        name:'启动服务器',
                        clear:true,
                        frequent:true,
                        onclick:function(){
                            game.saveConfig('connectMode',true);
                            game.saveConfig('mode','identity');
                            localStorage.setItem(lib.configprefix+'directstart',true);
                            game.reload();
                        }
                    },
                    update:function(config,map){
                        if(lib.node){
                            map.connect_start.show();
                        }
                        else{
                            map.connect_start.hide();
                        }
                    }
                }
            }
		},
		status:{
			running:false,
			canvas:false,
			time:0,
			delayed:0,
			frameId:0,
			videoId:0,
		},
		help:{
			'游戏选项':'<ul><li>控制台命令<br>开启后可用浏览器控制台控制游戏<li>编辑牌堆<br>在卡牌包中修改牌堆后，将自动创建一个临时牌堆，在所有模式中共用，当保存当前牌堆后，临时牌堆被清除。每个模式可设置不同的已保存牌堆，设置的牌堆优先级大于临时牌堆。<li>自动确认<br>开启后当候选目标仅有1个时点击目标无需再点击确定<li>'+
			'触屏模式<br>可消除iOS等设备上300ms的点击延迟，但开启后无法使用鼠标<li>滚轮控制手牌<br>开启后滚轮可控制手牌的左右滚动，建议Mac等具备横向滚动功能的设备关闭此选项'+
			'<li>游戏玩法<br>为游戏增加不同玩法，开启后可在帮助中查看介绍',
			'游戏操作':'<ul><li>长按/鼠标悬停/右键单击（需在设置中开启）显示信息<li>触屏模式中，双指点击切换暂停；下划显示菜单，上划切换托管<li>键盘快捷键<br>'+
			'<table><tr><td>a<td>切换托管<tr><td>c<td>打开设置<tr><td>w<td>切换不询问无懈<tr><td>i<td>显示身份<tr><td>▭<td>暂停</ul>',
			'游戏命令':'<div style="margin:10px">变量名</div><ul style="margin-top:0"><li>场上角色<br>game.players<li>阵亡角色<br>game.dead'+
			'<li>玩家<br>game.me<li>玩家的上/下家<br>game.me.previous/next'+
			'<li>玩家的上/下家（含阵亡）<br>game.me.previousSeat/<br>nextSeat'+
			'<li>牌堆<br>ui.cardPile<li>弃牌堆<br>ui.discardPile</ul>'+
			'<div style="margin:10px">角色属性</div><ul style="margin-top:0"><li>体力值<br>player.hp'+
			'<li>体力上限<br>player.maxHp<li>身份<br>player.identity<li>手牌<br>player.get("h")<li>装备牌<br>player.get("e")<li>判定牌<br>player.get("j")'+
			'<li>是否存活/横置/翻面<br>player.isAlive()/<br>isLinked()/<br>isTurnedOver()</ul>'+
			'<div style="margin:10px">角色操作</div><ul style="margin-top:0"><li>受到伤害<br>player.damage(source,<br>num)'+
			'<li>回复体力<br>player.recover(num)<li>摸牌<br>player.draw(num)<li>获得牌<br>player.gain(cards)<li>弃牌<br>player.discard(cards)'+
			'<li>使用卡牌<br>player.useCard(card,<br>targets)<li>死亡<br>player.die()<li>复活<br>player.revive(hp)</ul>'+
			'<div style="margin:10px">游戏操作</div><ul style="margin-top:0"><li>在命令框中输出结果<br>game.print(str)<li>清除命令框中的内容<br>cls<li>游戏结束<br>game.over(bool)'+
			'<li>角色资料<br>lib.character<li>卡牌资料<br>lib.card</ul>',
		},
		setIntro:function(node,func){
			if(lib.config.touchscreen){
				lib.setLongPress(node,ui.click.intro);
			}
			else{
				if(lib.config.hover_all){
					lib.setHover(node,ui.click.hoverplayer);
				}
				if(lib.config.right_info){
					node.oncontextmenu=ui.click.rightplayer;
				}
			}
			node._customintro=func;
		},
		setPopped:function(node,func,width,height,forceclick){
			node._poppedfunc=func;
			node._poppedwidth=width;
			node._poppedheight=height;
            if(forceclick){
                node.forceclick=true;
            }
			if(lib.config.touchscreen||forceclick){
				node.listen(ui.click.hoverpopped);
			}
			else{
				node.addEventListener('mouseenter',ui.click.hoverpopped);
				// node.addEventListener('mouseleave',ui.click.hoverpopped_leave);
			}
		},
		placePoppedDialog:function(dialog,e){
            if(dialog._place_text){
                if(dialog._place_text.firstChild.offsetWidth>=190){
                    dialog._place_text.style.textAlign='left';
                    dialog._place_text.style.marginLeft='14px';
                }
            }
			if(e.touches&&e.touches[0]){
				e=e.touches[0];
			}
            var height=Math.min(ui.window.offsetHeight-20,dialog.content.scrollHeight);
            if(dialog._mod_height){
                height+=dialog._mod_height;
            }
			dialog.style.height=height+'px';
			if(e.clientX<ui.window.offsetWidth/2){
				dialog.style.left=(e.clientX+10)+'px';
			}
			else{
				dialog.style.left=(e.clientX-dialog.offsetWidth-10)+'px';
			}
			var idealtop=e.clientY-dialog.offsetHeight/2;
			if(idealtop<10){
				idealtop=10;
			}
			else if(idealtop+dialog.offsetHeight+10>ui.window.offsetHeight){
				idealtop=ui.window.offsetHeight-10-dialog.offsetHeight;
			}
			dialog.style.top=idealtop+'px';
		},
		isMobileMe:function(player){
			return (lib.config.layout=='mobile'||lib.config.layout=='phone')&&lib.config.mode!='chess'&&player.dataset.position==0;
		},
		isNewLayout:function(){
			if(lib.config.layout!='default') return true;
			if(lib.config.layoutfixed.contains(lib.config.mode)) return true;
			return false;
		},
		isSingleHandcard:function(){
			if(game.singleHandcard||lib.config.layout=='mobile'||lib.config.layout=='phone'){
				return true;
			}
			if(lib.config.layout=='default'&&lib.config.layoutfixed.contains(lib.config.mode)){
				return true;
			}
			return false;
		},
		setHover:function(node,func,hoveration,width){
			node._hoverfunc=func;
			if(typeof hoveration=='number'){
				node._hoveration=hoveration;
			}
			if(typeof width=='number'){
				node._hoverwidth=width
			}
			node.addEventListener('mouseenter',ui.click.mouseenter);
			node.addEventListener('mouseleave',ui.click.mouseleave);
			node.addEventListener('mousedown',ui.click.mousedown);
			node.addEventListener('mousemove',ui.click.mousemove);
			return node;
		},
		setScroll:function(node){
			node.ontouchstart=ui.click.touchStart;
			node.ontouchmove = ui.click.touchScroll;
			node.style.WebkitOverflowScrolling='touch';
			return node;
		},
		setLongPress:function(node,func){
			node.addEventListener('touchstart',ui.click.longpressdown);
			node.addEventListener('touchend',ui.click.longpresscancel);
			// node.addEventListener('mouseleave',ui.click.longpresscancel);
			node._longpresscallback=func;
			return node;
		},
		updateCanvas:function(time){
			if(lib.canvasUpdates.length===0){
				lib.status.canvas=false;
				return false;
			}
			ui.canvas.width=ui.arena.offsetWidth;
			ui.canvas.height=ui.arena.offsetHeight;
			var ctx=ui.ctx;
			ctx.shadowBlur=5;
			ctx.shadowColor='rgba(0,0,0,0.3)';
			ctx.strokeStyle='white';
			// ctx.lineCap='round';
			ctx.lineWidth=3;
			ctx.save();
			for(var i=0;i<lib.canvasUpdates.length;i++){
				ctx.restore();
				ctx.save();
				var update=lib.canvasUpdates[i];
				if(!update.starttime){
					update.starttime=time;
				}
				if(update(time-update.starttime,ctx)===false){
					lib.canvasUpdates.splice(i--,1);
				}
			}
		},
		run:function(time){
			lib.status.time=time;
			for(var i=0;i<lib.updates.length;i++){
				if(!lib.updates[i].hasOwnProperty('_time')){
					lib.updates[i]._time=time;
				}
				if(lib.updates[i](time-lib.updates[i]._time-lib.status.delayed)===false){
					lib.updates.splice(i--,1);
				}
			}
			if(lib.updates.length){
				lib.status.frameId=requestAnimationFrame(lib.run);
			}
			else{
				lib.status.time=0;
				lib.status.delayed=0;
			}
		},
		getUTC:function(date){
			return date.getTime();
		},
		saveVideo:function(){
			if(_status.videoToSave){
				game.export(lib.init.encode(JSON.stringify(_status.videoToSave)),
				'无名杀 - 录像 - '+_status.videoToSave.name[0]+' - '+_status.videoToSave.name[1]);
			}
		},
		init:{
			init:function(){
				if(window.noname_update){
					lib.version=window.noname_update.version;
					lib.changeLog=window.noname_update.changeLog;
					delete window.noname_update;
				}

				var noname_inited=localStorage.getItem('noname_inited');
				if(noname_inited&&noname_inited!=='nodejs'){
                    var ua=navigator.userAgent.toLowerCase();
                    if(ua.indexOf('android')!=-1){
                        lib.device='android';
                    }
                    else if(ua.indexOf('iphone')!=-1||ua.indexOf('ipad')!=-1){
                        lib.device='ios';
                        var ua=navigator.userAgent.toLowerCase();
                        if(ua.indexOf('ipad')!=-1){
                            window.isIpad=true;
                        }
                        else{
                            var metas=document.head.querySelectorAll('meta');
                            for(var j=0;j<metas.length;j++){
                                if(metas[j].name=='viewport'){
                                    metas[j].content="user-scalable=no, initial-scale=0.6, maximum-scale=0.6, minimum-scale=0.6, width=device-width, height=device-height";
                                    break;
                                }
                            }
                        }
                    }
					lib.assetURL=noname_inited;
				}

				lib.config={};
                lib.configOL={};
				var config2;
				var config=window.config;
				for(var i in config){
					lib.config[i]=lib.init.eval(config[i]);
				}
				try{
					config2=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
					if(!config2||typeof config2!='object') throw 'err'
				}
				catch(err){
					config2={};
					localStorage.setItem(lib.configprefix+'config',JSON.stringify({}));
				}
				if(config2.mode) lib.config.mode=config2.mode;
				if(lib.config.mode_config[lib.config.mode]==undefined) lib.config.mode_config[lib.config.mode]={};
				for(var i in lib.config.mode_config.global){
					if(lib.config.mode_config[lib.config.mode][i]==undefined){
						lib.config.mode_config[lib.config.mode][i]=lib.config.mode_config.global[i];
					}
				}
				if(lib.config.characters){
					lib.config.defaultcharacters=lib.config.characters.slice(0);
				}
				if(lib.config.cards){
					lib.config.defaultcards=lib.config.cards.slice(0);
				}
				for(var i in config2){
						if(i.indexOf('_mode_config')!=-1){
							var thismode=i.substr(i.indexOf('_mode_config')+13);
							if(!lib.config.mode_config[thismode]){
								lib.config.mode_config[thismode]={};
							}
							lib.config.mode_config[thismode][i.substr(0,i.indexOf('_mode_config'))]=config2[i];
						}
						else{
							lib.config[i]=config2[i];
						}
				}
				for(var i in lib.config.translate){
					lib.translate[i]=lib.config.translate[i];
				}

				lib.config.all.characters=[];
				lib.config.all.cards=[];
				lib.config.all.plays=[];
				lib.config.all.mode=[];

				for(i in character.pack){
					if(lib.config.hiddenCharacterPack.indexOf(i)==-1){
						lib.config.all.characters.push(i);
						lib.translate[i+'_character_config']=character.pack[i];
					}
				}
				for(i in card.pack){
					if(lib.config.hiddenCardPack.indexOf(i)==-1){
						lib.config.all.cards.push(i);
						lib.translate[i+'_card_config']=card.pack[i];
					}
				}
				for(i in play.pack){
					lib.config.all.plays.push(i);
					lib.translate[i+'_play_config']=play.pack[i];
				}

				if(!lib.config.gameRecord){
					lib.config.gameRecord={};
				}
				for(i in mode.pack){
					if(lib.config.hiddenModePack.indexOf(i)==-1){
						lib.config.all.mode.push(i);
						lib.translate[i]=mode.pack[i];
						if(!lib.config.gameRecord[i]){
							lib.config.gameRecord[i]={data:{}};
						}
					}
				}
				if(lib.config.all.mode.length==0){
					lib.config.all.mode.push('identity');
					lib.translate.identity='身份';
					if(!lib.config.gameRecord.identity){
						lib.config.gameRecord.identity={data:{}};
					}
				}
				if(background&&background.pack){
					for(i in background.pack){
						lib.configMenu.appearence.config.image_background.item[i]=background.pack[i];
					}
				}
				if(music&&music.pack){
					for(i in music.pack){
						lib.configMenu.audio.config.background_music.item[i]=music.pack[i];
					}
				    lib.configMenu.audio.config.background_music.item.music_random='随机';
				    lib.configMenu.audio.config.background_music.item.music_off='关闭';
					if(lib.config.touchscreen){
						delete lib.configMenu.audio.config.background_music.item.music_custom;
					}
				}
                if(theme&&theme.pack){
                    for(i in theme.pack){
						lib.configMenu.appearence.config.theme.item[i]=theme.pack[i];
					}
                }

				ui.fontsheet=document.createElement('style');
				document.head.appendChild(ui.fontsheet);
				if(font&&font.pack){
					for(i in font.pack){
						lib.configMenu.appearence.config.name_font.item[i]=font.pack[i];
						lib.configMenu.appearence.config.identity_font.item[i]=font.pack[i];
						lib.configMenu.appearence.config.cardtext_font.item[i]=font.pack[i];
						lib.configMenu.appearence.config.global_font.item[i]=font.pack[i];
						ui.fontsheet.sheet.insertRule("@font-face {font-family: '"+i+"';src: url('"+lib.assetURL+"font/"+i+".ttf');}",0);
					}
					lib.configMenu.appearence.config.cardtext_font.item.default='默认';
					lib.configMenu.appearence.config.global_font.item.default='默认';
				}
				delete character.pack;
				delete card.pack;
				delete play.pack;
				delete mode.pack;
				delete window.background;
				delete window.music;
				delete window.font;

                if(!lib.config.totouched&&(lib.device=='ios'||lib.device=='android')){
                    game.saveConfig('totouched',true);
                    game.saveConfig('touchscreen',true);
                    game.saveConfig('confirmtouch',true);
                    game.saveConfig('low_performance',true);
                    game.saveConfig('layout','phone');
                    game.saveConfig('confirm_exit',true);
                }

				if(lib.config.extensions.length){
					window.resetExtension=function(){
						for(var i=0;i<lib.config.extensions.length;i++){
							game.saveConfig('extension_'+lib.config.extensions[i],false);
						}
					}
				}
				for(var i=0;i<lib.config.extensions.length;i++){
					try{
						eval(localStorage.getItem(lib.configprefix+'extension_'+lib.config.extensions[i]));
					}
					catch(e){
						console.log(e);
					}
					if(game.importedPack&&lib.config['extension_'+game.importedPack.name]){
						var cfg={};
						for(var j in lib.config){
							if(j.indexOf('extension_'+game.importedPack.name)==0&&
								j!='extension_'+game.importedPack.name){
								cfg[j.slice(11+game.importedPack.name.length)]=lib.config[j];
							}
						}
						try{
                            if(game.importedPack.precontent){
                                _status.extension=game.importedPack.name;
    							game.importedPack.precontent(cfg);
    							delete _status.extension;
                            }
                            if(game.importedPack.content){
                                lib.extensions.push([game.importedPack.name,game.importedPack.content,cfg]);
                            }
						}
						catch(e){
							console.log(e);
						}
						delete game.importedPack;
					}
				}
				var toLoad=lib.config.all.cards.length+lib.config.all.characters.length+lib.config.plays.length+1;
				var packLoaded=function(){
					toLoad--;
					if(toLoad==0){
						if(_status.windowLoaded){
							delete _status.windowLoaded;
							lib.init.onload();
						}
						else{
							_status.packLoaded=true;
						}
					}
				};
				if(localStorage.getItem(lib.configprefix+'playback')){
					toLoad++;
					lib.init.js(lib.assetURL+'mode',lib.config.mode,packLoaded,packLoaded);
				}
				else if((localStorage.getItem(lib.configprefix+'directstart')||!lib.config.show_splash)&&
					lib.config.all.mode.indexOf(lib.config.mode)!=-1){
					toLoad++;
					lib.init.js(lib.assetURL+'mode',lib.config.mode,packLoaded,packLoaded);
				}
				lib.init.js(lib.assetURL+'card',lib.config.all.cards,packLoaded,packLoaded);
				lib.init.js(lib.assetURL+'character',lib.config.all.characters,packLoaded,packLoaded);
				lib.init.js(lib.assetURL+'play',lib.config.plays,packLoaded,packLoaded);
				lib.init.js(lib.assetURL+'character','rank',packLoaded,packLoaded);
				ui.css={};
				lib.init.css(lib.assetURL+'layout/default','menu');
				var layout=lib.config.layout;
				if(lib.config.layoutfixed.indexOf(lib.config.mode)!==-1){
					if(layout=='default'){
						layout='mobile';
					}
				}
				ui.css.layout=lib.init.css(lib.assetURL+'layout/'+layout,'layout');
				if(lib.config.blur_ui) ui.css.blur_ui=lib.init.css(lib.assetURL+'layout/default','blur');
				ui.css.theme=lib.init.css(lib.assetURL+'theme/'+lib.config.theme,'style');
				ui.css.card_style=lib.init.css(lib.assetURL+'theme/style/card',lib.config.card_style);
				ui.css.cardback_style=lib.init.css(lib.assetURL+'theme/style/cardback',lib.config.cardback_style);
				ui.css.hp_style=lib.init.css(lib.assetURL+'theme/style/hp',lib.config.hp_style);

				lib.config.duration=500;

				var ua=navigator.userAgent.toLowerCase();
                if(ua.indexOf('iphone')!=-1||ua.indexOf('ipad')!=-1||ua.indexOf('android')!=-1){
					if(!lib.config.totouched&&!lib.config.touchscreen){
						var totouch=window.confirm('您似乎在使用触屏设备，是否切换到触屏模式？');
						game.saveConfig('totouched',true);
						if(totouch){
							game.saveConfig('touchscreen',true);
							game.saveConfig('low_performance',true);
							game.saveConfig('layout','phone');
							game.saveConfig('confirm_exit',true);
							game.reload();
						}
					}
				}
				else if(ua.indexOf('macintosh')!=-1&&!lib.config.toscrolled){
					game.saveConfig('toscrolled',true);
					game.saveConfig('mousewheel',false);
				}

				if(window.indexedDB){
					var request = window.indexedDB.open(lib.configprefix+'data',3);
					request.onupgradeneeded=function(e){
						var db=e.target.result;
						if(!db.objectStoreNames.contains('video')){
							db.createObjectStore('video',{keyPath:'time'});
						}
						if(!db.objectStoreNames.contains('image')){
							db.createObjectStore('image');
						}
						if(!db.objectStoreNames.contains('audio')){
							db.createObjectStore('audio');
						}
						if(!db.objectStoreNames.contains('character')){
							db.createObjectStore('character');
						}
						if(!db.objectStoreNames.contains('card')){
							db.createObjectStore('card');
						}
						if(!db.objectStoreNames.contains('skill')){
							db.createObjectStore('skill');
						}
					};
					request.onsuccess=function(e){
						var db=e.target.result;
						lib.db=db;
						for(var i=0;i<lib._onDB.length;i++){
							lib._onDB[i]();
						}
						game.getDB('skill',null,function(skills){
							if(skills){
								for(var i in skills){
									try{
										eval('lib.skill["'+i+'"]={'+skills[i].content+'}');
									}
									catch(e){
										console.log(e);
										lib.skill[i]={};
									}
									lib.skill[i].createInfo=skills[i];
									lib.setTranslate(i);
									lib.translate[i+'_info']=skills[i].description;
									if(lib.skill[i].marktext){
										lib.translate[i+'_bg']=lib.skill[i].marktext;
									}
								}
								if(_status.cardsFinished){
									game.finishCards();
								}
							}
							game.getDB('character',null,function(list){
								for(var i in list){
									if(!list[i][4]) list[i][4]=[];
									lib.character[i]=list[i];
									lib.customCharacters.push(i);
									lib.setTranslate(i);
								}
								_status.characterLoaded=true;
								if(_status.waitingForCharacters){
									game.createEvent('game',false).content=lib.init.start;
									delete lib.init.start;
									game.loop();
									delete _status.waitingForCharacters;
								}
								if(lib.onCharacterLoad){
									lib.onCharacterLoad();
									delete lib.onCharacterLoad;
								}
							});
						});
					}
				}
                if(typeof window.require=='function'&&!lib.device){
                    lib.node={
                        fs:require('fs'),
                        http:require('http'),
                        debug:function(){
                            require('remote').getCurrentWindow().toggleDevTools();
                        }
                    };
                    game.download=function(url,folder,onsuccess,onerror){
                        url=lib.updateURL+url;
                        var dir=folder.split('/');
                        var str='';
                        var download=function(){
                            try{
                                var file = lib.node.fs.createWriteStream(__dirname+'/'+folder);
                            }
                            catch(e){
                                onerror();
                            }
                            var request = lib.node.http.get(url, function(response) {
                                var stream=response.pipe(file);
                                stream.on('finish',onsuccess);
                                stream.on('error',onerror);
                            });
                        }
                        var access=function(){
                            if(dir.length<=1){
                                download();
                            }
                            else{
                                str+='/'+dir.shift();
                                lib.node.fs.access(__dirname+str,function(e){
                                    if(e){
                                        try{
                                            lib.node.fs.mkdir(__dirname+str,access);
                                        }
                                        catch(e){
                                            onerror();
                                        }
                                    }
                                    else{
                                        access();
                                    }
                                });
                            }
                        }
                        access();
                    }
                }
				lib.cardSelectObserver=new MutationObserver(function(mutations){
					for(var i=0;i<mutations.length;i++){
						if(mutations[i].attributeName=='class'){
							var node=mutations[i].target;
							if(node._transform&&node.parentNode&&node.parentNode.parentNode&&
								node.parentNode.parentNode.parentNode==ui.me){
								if(node.classList.contains('selected')){
									setTimeout((function(node){
										return function(){
											if(node._transform&&node.parentNode&&node.parentNode.parentNode&&
												node.parentNode.parentNode.parentNode==ui.me){
												if(node.classList.contains('selected')&&
												!node.parentNode.parentNode.classList.contains('scrollh')){
													node.style.transform=node._transform+' translateY(-20px)';
												}
												else{
													node.style.transform=node._transform;
												}
											}
										}
									}(node)),200);
								}
								else{
									node.style.transform=node._transform;
								}
							}
						}
					}
				});

				if(lib.device){
					lib.init.cordovaReady=function(){
						if(lib.device=='android'){
							document.addEventListener("pause", function(){
								if(!_status.paused2&&!_status.event.isMine()){
									ui.click.pause();
								}
								if(ui.backgroundMusic){
									ui.backgroundMusic.pause();
								}
							});
							document.addEventListener("resume", function(){
								if(ui.backgroundMusic){
									ui.backgroundMusic.play();
								}
							});
							document.addEventListener("backbutton", function(){
								if(ui.arena&&ui.arena.classList.contains('menupaused')){
									ui.click.configMenu();
								}
								else if(lib.config.confirm_exit){
									navigator.notification.confirm(
										'是否退出游戏？',
										 function(index){
											 switch(index){
												 case 2:game.saveConfig('null');game.reload();break;
												 case 3:navigator.app.exitApp();break;
											 }
										 },
										'确认退出',
										['取消','重新开始','退出']
									);
								}
								else{
									navigator.app.exitApp();
								}
							});
						}
						game.download=function(url,folder,onsuccess,onerror){
							var fileTransfer = new FileTransfer();
							url=lib.updateURL+url;
							folder=lib.assetURL+folder;
							fileTransfer.download(encodeURI(url),folder,onsuccess,onerror);
						};
					}
				}
			},
			onload:function(){
				if(lib.device){
					var script=document.createElement('script');
					script.src='cordova.js';
					document.body.appendChild(script);
					document.addEventListener('deviceready',function(){
						if(lib.init.cordovaReady){
							lib.init.cordovaReady();
							delete lib.init.cordovaReady;
						}
					});
				}
                if(lib.config.debug&&window.require){
                    window.require('remote').getCurrentWindow().openDevTools();
                }
				ui.background=ui.create.div('.background');
				ui.background.style.backgroundSize="cover";
				if(lib.config.image_background&&lib.config.image_background!='default'&&lib.config.image_background!='custom'){
			        ui.background.setBackgroundImage('image/background/'+lib.config.image_background+'.jpg');
                    if(lib.config.image_background_blur){
                        ui.background.style.filter='blur(8px)';
                        ui.background.style.webkitFilter='blur(8px)';
                        ui.background.style.transform='scale(1.05)';
                    }
			    }
				document.body.insertBefore(ui.background,document.body.firstChild);

				document.body.onresize=ui.updatex;
				if(lib.config.touchscreen){
					document.body.addEventListener('touchstart',function(e){
						this.startX=e.touches[0].clientX;
						this.startY=e.touches[0].clientY;
						_status.dragged=false;
					});
					document.body.addEventListener('touchmove',function(e){
						if(_status.dragged) return;
						if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
							Math.abs(e.touches[0].clientY - this.startY) > 10) {
							_status.dragged=true;
						}
					});
				}

				lib.onDB(function(){
					if(lib.config.image_background=='custom'){
						ui.background.style.backgroundImage="none";
						game.getDB('image','background',function(fileToLoad){
							if(!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function(fileLoadedEvent)
							{
								var data = fileLoadedEvent.target.result;
								ui.background.style.backgroundImage='url('+data+')';
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
				});

				var proceed=function(){
					var i,j,k;
					for(i in mode[lib.config.mode].element){
						if(!lib.element[i]) lib.element[i]=[];
						for(j in mode[lib.config.mode].element[i]){
							if(j=='init'){
								if(!lib.element[i].inits) lib.element[i].inits=[];
								lib.element[i].inits.push(lib.init.eval(mode[lib.config.mode].element[i][j]));
							}
							else{
								lib.element[i][j]=lib.init.eval(mode[lib.config.mode].element[i][j]);
							}
						}
					}
					for(i in mode[lib.config.mode].ai){
						if(typeof mode[lib.config.mode].ai[i]=='object'){
							if(ai[i]==undefined) ai[i]={};
							for(j in mode[lib.config.mode].ai[i]){
								ai[i][j]=lib.init.eval(mode[lib.config.mode].ai[i][j]);
							}
						}
						else{
							ai[i]=lib.init.eval(mode[lib.config.mode].ai[i]);
						}
					}
					for(i in mode[lib.config.mode].ui){
						if(typeof mode[lib.config.mode].ui[i]=='object'){
							if(ui[i]==undefined) ui[i]={};
							for(j in mode[lib.config.mode].ui[i]){
								ui[i][j]=lib.init.eval(mode[lib.config.mode].ui[i][j]);
							}
						}
						else{
							ui[i]=lib.init.eval(mode[lib.config.mode].ui[i]);
						}
					}
					for(i in mode[lib.config.mode].game){
						game[i]=lib.init.eval(mode[lib.config.mode].game[i]);
					}
					for(i in mode[lib.config.mode].get){
						get[i]=lib.init.eval(mode[lib.config.mode].get[i]);
					}
					lib.init.start=mode[lib.config.mode].start;
					if(game.onwash){
						lib.onwash.push(game.onwash);
						delete game.onwash;
					}
					if(game.onover){
						lib.onover.push(game.onover);
						delete game.onover;
					}
					lib.config.current_mode=mode[lib.config.mode].config||[];
					lib.config.banned=get.config('banned')||[];
					lib.config.bannedcards=get.config('bannedcards')||[];

					lib.rank=window.characterRank;
					delete window.characterRank;
					for(i in mode[lib.config.mode]){
						if(i=='element') continue;
						if(i=='game') continue;
						if(i=='ai') continue;
						if(i=='ui') continue;
						if(i=='get') continue;
						if(i=='config') continue;
						if(i=='start') continue;
						if(lib[i]==undefined) lib[i]=(get.objtype(mode[lib.config.mode][i])=='array')?[]:{};
						for(j in mode[lib.config.mode][i]){
							lib[i][j]=lib.init.eval(mode[lib.config.mode][i][j]);
						}
					}
					for(i in character){
						if(character[i].character){
							lib.characterPack[i]=character[i].character
						}
						if(character[i].forbid&&character[i].forbid.contains(lib.config.mode)) continue;
						if(character[i].mode&&character[i].mode.contains(lib.config.mode)==false) continue;
						for(j in character[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='character'&&!lib.config.characters.contains(i)){
								if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'){
									for(k in character[i][j]){
										lib.hiddenCharacters.push(k);
									}
								}
								else if(lib.config.mode!='boss'||i!='boss'){
									continue;
								}
							}
							for(k in character[i][j]){
								if(j=='character'){
									if(!character[i][j][k][4]){
										character[i][j][k][4]=[];
									}
									if(character[i][j][k][4].contains('boss')||
										character[i][j][k][4].contains('hiddenboss')){
										lib.config.forbidai.add(k);
									}
									if(lib.config.banned.contains(k)){
										if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'){
											lib.hiddenCharacters.push(k);
										}
										else{
											continue;
										}
									}
									for(var l=0;l<character[i][j][k][3].length;l++){
										lib.skilllist.add(character[i][j][k][3][l]);
									}
								}
								if(j=='translate'&&k==i){
									lib[j][k+'_character_config']=character[i][j][k];
								}
								else{
									if(lib[j][k]==undefined){
										lib[j][k]=lib.init.eval(character[i][j][k]);
										if(j=='card'&&lib[j][k].derivation){
											if(!lib.cardPack.mode_derivation){
												lib.cardPack.mode_derivation=[k];
											}
											else{
												lib.cardPack.mode_derivation.push(k);
											}
										}
									}
									else{
										alert('dublicate '+j+' in character '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+character[i][j][k]);
									}
								}
							}
						}
					}
                    var connect_avatar_list=[];
                    for(var i in lib.character){
                        connect_avatar_list.push(i);
                    }
                    connect_avatar_list.sort(lib.sort.capt);
                    for(var i=0;i<connect_avatar_list.length;i++){
                        var ia=connect_avatar_list[i];
                        lib.mode.connect.config.connect_avatar.item[ia]=lib.translate[ia];
                    }
					if(lib.cardPack.mode_derivation){
						for(var i=0;i<lib.cardPack.mode_derivation.length;i++){
							if(!lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]){
								lib.cardPack.mode_derivation.splice(i--,1);
							}
						}
						if(lib.cardPack.mode_derivation.length==0){
							delete lib.cardPack.mode_derivation;
						}
					}

					var pilecfg=lib.config.customcardpile[get.config('cardpilename')];
					if(pilecfg){
						lib.config.bannedpile=pilecfg[0]||{};
						lib.config.addedpile=pilecfg[1]||{};
					}
					for(i in card){
						lib.cardPack[i]=[];
						if(card[i].card){
							for(var j in card[i].card){
								if(card[i].translate[j+'_info']){
									lib.cardPack[i].push(j);
								}
							}
						}
						for(j in card[i]){
							if(j=='mode'||j=='forbid') continue;
							if(j=='list'){
								if(card[i].forbid&&card[i].forbid.contains(lib.config.mode)) continue;
								if(card[i].mode&&card[i].mode.contains(lib.config.mode)==false) continue;
								if(lib.config.cards.contains(i)){
									var pile;
									if(typeof card[i][j]=='function'){
										pile=lib.init.eval(card[i][j])();
									}
									else{
										pile=card[i][j];
									}
									lib.cardPile[i]=pile.slice(0);
									if(lib.config.bannedpile[i]){
										for(var k=0;k<lib.config.bannedpile[i].length;k++){
											pile[lib.config.bannedpile[i][k]]=null;
										}
									}
									for(var k=0;k<pile.length;k++){
										if(!pile[k]){
											pile.splice(k--,1);
										}
									}
									if(lib.config.addedpile[i]){
										for(var k=0;k<lib.config.addedpile[i].length;k++){
											pile.push(lib.config.addedpile[i][k]);
										}
									}
									lib.card.list=lib.card.list.concat(pile);
								}
							}
							else{
								for(k in card[i][j]){
									if(j=='translate'&&k==i){
										lib[j][k+'_card_config']=card[i][j][k];
									}
									else{
										if(lib[j][k]==undefined) lib[j][k]=lib.init.eval(card[i][j][k]);
										else alert('dublicate '+j+' in card '+i+':\n'+k+'\n'+lib[j][k]+'\n'+card[i][j][k]);
									}
								}
							}
						}
					}
					for(i in play){
						if(lib.config.hiddenPlayPack.contains(i)) continue;
						if(play[i].forbid&&play[i].forbid.contains(lib.config.mode)) continue;
						if(play[i].mode&&play[i].mode.contains(lib.config.mode)==false) continue;
						for(j in play[i].element){
							if(!lib.element[j]) lib.element[j]=[];
							for(k in play[i].element[j]){
								if(k=='init'){
									if(!lib.element[j].inits) lib.element[j].inits=[];
									lib.element[j].inits.push(lib.init.eval(play[i].element[j][k]));
								}
								else{
									lib.element[j][k]=lib.init.eval(play[i].element[j][k]);
								}
							}
						}
						for(j in play[i].ui){
							if(typeof play[i].ui[j]=='object'){
								if(ui[j]==undefined) ui[j]={};
								for(k in play[i].ui[j]){
									ui[j][k]=lib.init.eval(play[i].ui[j][k]);
								}
							}
							else{
								ui[j]=lib.init.eval(play[i].ui[j]);
							}
						}
						for(j in play[i].game){
							game[j]=lib.init.eval(play[i].game[j]);
						}
						for(j in play[i].get){
							get[j]=lib.init.eval(play[i].get[j]);
						}
						for(j in play[i]){
							if(j=='mode'||j=='forbid'||j=='init'||j=='element'||
							j=='game'||j=='get'||j=='ui'||j=='arenaReady') continue;
							for(k in play[i][j]){
								if(j=='translate'&&k==i){
									lib[j][k+'_play_config']=play[i][j][k];
								}
								else{
									if(lib[j][k]!=undefined){
										console.log('dublicate '+j+' in play '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+play[i][j][k]);
									}
									lib[j][k]=lib.init.eval(play[i][j][k]);
								}
							}
						}
						if(typeof play[i].init=='function') (lib.init.eval(play[i].init))();
						if(typeof play[i].arenaReady=='function') lib.arenaReady.push(play[i].arenaReady);
					}
					for(i=0;i<lib.card.list.length;i++){
						if(lib.card.list[i][2]=='huosha'){
							lib.card.list[i]=lib.card.list[i].slice(0);
							lib.card.list[i][2]='sha';
							lib.card.list[i][3]='fire';
						}
						else if(lib.card.list[i][2]=='leisha'){
							lib.card.list[i]=lib.card.list[i].slice(0);
							lib.card.list[i][2]='sha';
							lib.card.list[i][3]='thunder';
						}
						if(!lib.card[lib.card.list[i][2]]){
							lib.card.list.splice(i,1);i--;
						}
						else if(lib.card[lib.card.list[i][2]].mode&&
							lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode)==false){
							lib.card.list.splice(i,1);i--;
						}
					}
					try{
						lib.storage=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
						if(typeof lib.storage!='object') throw('err');
						if(lib.storage==null) throw('err');
					}
					catch(err){
						lib.storage={};
						localStorage.setItem(lib.configprefix+lib.config.mode,"{}");
					}

                    if(lib.config.connectMode&&lib.mode[lib.config.mode].connect){
                        _status.connectMode=true;
                    }
                    else if(lib.config.mode=='connect'){
                        _status.connectMode=true;
                    }
					if(lib.config.cheat&&!lib.storage.test&&(!_status.connectMode||lib.config.debug)){
                        lib.cheat.i();
                    }
					lib.config.sort_card=get.sortCard(lib.config.sort);
					delete window.config;
					delete window.mode;
					delete window.card;
					delete window.character;
					delete window.play;
					for(var i in lib.init){
						if(i.indexOf('setMode_')==0){
							delete lib.init[i];
						}
					}
                    if(!_status.connectMode){
                        for(var i=0;i<lib.extensions.length;i++){
                            try{
                                _status.extension=lib.extensions[i][0];
                                lib.extensions[i][1](lib.extensions[i][2]);
                                delete _status.extension;
                            }
                            catch(e){
                                console.log(e);
                            }
                        }
                    }
                    delete lib.extensions;
					ui.create.arena();

                    if(window.indexedDB&&!_status.characterLoaded){
						_status.waitingForCharacters=true;
					}
					else{
						game.createEvent('game',false).content=lib.init.start;
						delete lib.init.start;
						game.loop();
					}
				}
				if(!mode[lib.config.mode]){
					window.inSplash=true;
                    var clickedNode=false;
                    var proceeded=false;
					var clickNode=function(){
                        if(clickedNode) return;
                        this.classList.add('clicked');
                        clickedNode=true;
						lib.config.mode=this.link;
						game.saveConfig('mode',this.link);
						splash.delete(1000);
						delete window.inSplash;

                        var proceed2=function(){
                            if(proceeded) return;
                            proceeded=true;
                            lib.init.js(lib.assetURL+'mode',lib.config.mode,proceed);
                        };
                        this.addEventListener('webkitTransitionEnd',proceed2);
                        setTimeout(proceed2,500);
					}
                    var downNode=function(){
                        this.classList.add('glow');
                    }
                    var upNode=function(){
                        this.classList.remove('glow');
                    }
					var splash=ui.create.div('#splash',document.body);
                    if(lib.config.touchscreen){
                        splash.classList.add('touch');
                    }
					for(var i=0;i<lib.config.all.mode.length;i++){
						var node=ui.create.div('.hidden',splash,clickNode);
						node.link=lib.config.all.mode[i];
						ui.create.div(node,'.splashtext',get.verticalStr(get.translation(lib.config.all.mode[i])));
						if(lib.config.all.stockmode.indexOf(lib.config.all.mode[i])!=-1){
							ui.create.div(node,'.avatar').setBackgroundImage('image/splash/'+lib.config.all.mode[i]+'.jpg');
						}
						else{
							var avatarnode=ui.create.div(node,'.avatar');
                            var avatarbg=lib.mode[lib.config.all.mode[i]].splash;
                            lib.onDB((function(avatarnode,avatarbg){
                                return (function(){
                                    avatarnode.setBackgroundDB(avatarbg);
                                });
                            }(avatarnode,avatarbg)));
						}
                        if(!lib.config.touchscreen){
                            node.addEventListener('mousedown',downNode);
                            node.addEventListener('mouseup',upNode);
                            node.addEventListener('mouseleave',upNode);
                        }
						setTimeout((function(node){
							return function(){
								node.show();
							}
						}(node)),i*100);
					}
                    if(lib.config.mousewheel){
                        splash.onmousewheel=ui.click.mousewheel;
                    }
				}
				else{
					proceed();
				}
				localStorage.removeItem(lib.configprefix+'directstart');
			},
            startOnline:function(){
                'step 0'
                event._resultid=null;
                event._result=null;
                game.pause();
                'step 1'
                if(result){
                    if(event._resultid){
                        result.id=event._resultid;
                    }
                    game.send('result',result);
                }
                event.goto(0);
            },
            connection:function(ws){
                var client={
                    ws:ws,
                    id:get.id(),
                    closed:false
                };
                lib.node.clients.push(client);
                for(var i in lib.element.client){
                    client[i]=lib.element.client[i];
                }
                ws.on('message',function(messagestr){
                    var message;
                    try{
                        message=JSON.parse(messagestr);
                        if(!Array.isArray(message)||
                            typeof lib.message.server[message[0]]!=='function'){
                            throw('err');
                        }
                        for(var i=1;i<message.length;i++){
                            message[i]=get.parsedResult(message[i]);
                        }
                    }
                    catch(e){
                        console.log(e);
                        console.log('invalid message: '+messagestr);
                        return;
                    }
                    lib.message.server[message.shift()].apply(client,message);
                });
                ws.on('close',function(){
                    client.close();
                });
                client.send('opened');
            },
			css:function(path,file,before){
				var style = document.createElement("link");
			    style.rel = "stylesheet";
			    style.href = path+'/'+file+".css";
				if(before){
					document.head.insertBefore(style,before);
				}
				else{
					document.head.appendChild(style);
				}
			    return style;
			},
			js:function(path,file,onload,onerror){
				if(path[path.length-1]=='/'){
					path=path.slice(0,path.length-1);
				}
				if(path==lib.assetURL+'mode'&&lib.config.all.stockmode.indexOf(file)==-1){
					lib.init['setMode_'+file]();
                    onload();
					return;
				}
				if(Array.isArray(file)){
					for(var i=0;i<file.length;i++){
						lib.init.js(path,file[i],onload,onerror);
					}
				}
				else{
					var script=document.createElement('script');
					script.src = path+'/'+file+".js";
					document.head.appendChild(script);
					if(typeof onload=='function'){
						script.addEventListener('load',onload);
						script.addEventListener('error',onerror);
					}
					return script;
				}
			},
			layout:function(layout){
				game.saveConfig('layout',layout);
				ui.arena.hide();
				setTimeout(function(){
					var layout=ui.css.layout;
					ui.css.layout=lib.init.css(lib.assetURL+'layout/'+lib.config.layout,'layout',layout);
					if(lib.config.layout=='mobile'||lib.config.layout=='phone'){
						ui.arena.classList.add('mobile');
						if(game.me&&game.me.node.handcards2.childNodes.length){
							while(game.me.node.handcards2.childNodes.length){
								game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
							}
						}
					}
					else{
						ui.arena.classList.remove('mobile');
					}
					if(lib.config.layout=='default'){
						ui.arena.classList.add('oldlayout');
					}
					else{
						ui.arena.classList.remove('oldlayout');
					}
					if(lib.config.layout=='default'&&lib.config.hp_style=='official'){
						ui.arena.classList.add('hpimage');
					}
					else{
						ui.arena.classList.remove('hpimage');
					}
					if(lib.config.layout=='phone'){
						ui.roundmenu.style.display='';
					}
					else{
						ui.roundmenu.style.display='none';
					}
					setTimeout(function(){
						layout.remove();
						ui.arena.show();
						if(game.me) game.me.update();
						setTimeout(function(){
							ui.updatex();
						},500);
						setTimeout(function(){
							ui.updatec();
						},1000);
					},100);
				},500);
			},
			parse:function(func){
				var k;
				var str='(';
				str+=func.toString();
				if(str.indexOf('step 0')==-1){
					str=str.replace(/\{/,'{{if(event.step==1) {event.finish();return;}');
				}
				else{
					for(k=1;k<99;k++){
						if(str.indexOf('step '+k)==-1) break;
						str=str.replace(new RegExp("'step "+k+"'",'g'),"break;case "+k+":");
						str=str.replace(new RegExp('"step '+k+'"','g'),"break;case "+k+":");
					}
					str=str.replace(/'step 0'|"step 0"/,'if(event.step=='+k+') {event.finish();return;}switch(step){case 0:');
				}
				str+='})';
				return str;
			},
			eval:function(func){
				if(typeof func=='function'){
					return eval('('+func.toString()+')');
				}
				else if(typeof func=='object'){
					for(var i in func){
						if(func.hasOwnProperty(i)){
							func[i]=lib.init.eval(func[i]);
						}
					}
				}
				return func;
			},
			encode:function(strUni){
				var strUtf = strUni.replace(
					/[\u0080-\u07ff]/g,function(c){
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f);
				});
				strUtf = strUtf.replace(
					/[\u0800-\uffff]/g,function(c) {
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f);
				});
				return btoa(strUtf);
			},
			decode:function(str){
				var strUtf=atob(str);
				var strUni = strUtf.replace(
					/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c) {
					var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
					return String.fromCharCode(cc);
				});
				strUni = strUni.replace(
					/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){
					var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
					return String.fromCharCode(cc);
				});
				return strUni;
			},
			stringify:function(obj){
				var str='{'
				for(var i in obj){
					str+='"'+i+'":'
					if(Object.prototype.toString.call(obj[i])=='[object Object]'){
						str+=lib.init.stringify(obj[i]);
					}
					else if(typeof obj[i]=='function'){
						str+=obj[i].toString();
					}
					else{
						str+=JSON.stringify(obj[i]);
					}
					str+=','
				}
				str+='}';
				return str;
			},
			stringifySkill:function(obj){
				var str='';
				for(var i in obj){
					str+=i+':'
					if(Object.prototype.toString.call(obj[i])=='[object Object]'){
						str+='{\n'+lib.init.stringifySkill(obj[i])+'}';
					}
					else if(typeof obj[i]=='function'){
						str+=obj[i].toString().replace(/\t/g,'');
					}
					else{
						str+=JSON.stringify(obj[i]);
					}
					str+=',\n'
				}
				return str;
			}
		},
        cheat:{
			i:function(){
                window.cheat=lib.cheat;
				window.game=game;
				window.ui=ui;
				window.get=get;
				window.ai=ai;
				window.lib=lib;
				window._status=_status;
			},
			uy:function(me){
				if(me){
					game.me.useCard({name:'spell_yexinglanghun'},game.me);
				}
				else{
					var enemy=game.me.getEnemy();
					enemy.useCard({name:'spell_yexinglanghun'},enemy);
				}
			},
			gs:function(name,act){
				var card=game.createCard('spell_'+name);
				game.me.node.handcards1.appendChild(card);
				if(!act){
					game.me.actused=-99;
				}
				ui.updatehl();
				setTimeout(game.check,300);
			},
			gc:function(name,act){
				var card=game.createCard('stone_'+name+'_stonecharacter');
				game.me.node.handcards1.appendChild(card);
				if(!act){
					game.me.actused=-99;
				}
				ui.updatehl();
				setTimeout(game.check,300);
			},
			aa:function(){
				game.saveConfig('test_game',!lib.config.test_game);
				game.reload();
			},
			a:function(name){
				if(lib.storage.test&&!name){
					game.save('test',false);
                    if(lib.config.mode=='identity'){
                        game.saveConfig('double_character',false,true);
                    }
				}
				else{
					game.save('test',name||true);
                    if(lib.config.mode=='identity'){
                        game.saveConfig('double_character',true,true);
                    }
				}
				game.reload();
			},
			u:function(){
				var card={name:'sha'},source=game.me.next;
				for(var i=0;i<arguments.length;i++){
					if(get.itemtype(arguments[i])=='player'){
						source=arguments[i];
					}
					else if(typeof arguments[i]=='object'){
						card=arguments[i];
					}
					else if(typeof arguments[i]=='string'){
						card={name:arguments[i]}
					}
				}
				source.useCard(game.createCard(card.name,card.suit,card.number,card.nature),game.me);
			},
			rank:function(){
		        var list=lib.rank.s.concat(lib.rank.ap).concat(lib.rank.a).concat(lib.rank.am).
		            concat(lib.rank.bp).concat(lib.rank.b).concat(lib.rank.bm).concat(lib.rank.c).concat(lib.rank.d);
		        for(var i in lib.character){
		            if(i!='zuoci'&&i.indexOf('boss_')!=0&&!list.contains(i)&&!lib.customCharacters.contains(i)) console.log(i);
		        }
		    },
			h:function(player){
				console.log(get.translation(player.get('h')));
			},
			g:function(){
				for(var i=0;i<arguments.length;i++){
					if(i>0&&typeof arguments[i]=='number'){
						for(var j=0;j<arguments[i]-1;j++){
							cheat.gx(arguments[i-1]);
						}
					}
					else{
						cheat.gx(arguments[i]);
					}
				}
			},
			gx:function(name,target){
				target=target||game.me;
				var nature=null;
				var suit=null;
				var suits=['club','spade','diamond','heart'];
				for(var i=0;i<suits.length;i++){
					if(name.indexOf(suits[i])==0){
						suit=suits[i];
						name=name.slice(suits[i].length);
						break;
					}
				}
				if(name.indexOf('red')==0){
					name=name.slice(3);
					suit=['diamond','heart'].randomGet();
				}
				if(name.indexOf('black')==0){
					name=name.slice(5);
					suit=['spade','club'].randomGet();
				}

				if(name=='huosha'){
					name='sha';
					nature='fire';
				}
				else if(name=='leisha'){
					name='sha';
					nature='thunder';
				}
				var card=game.createCard(name,suit,null,nature);
				target.node.handcards1.appendChild(card);
				game.check();
				target.update();
				ui.updatehl();
			},
			ge:function(){
				cheat.g('zhuge');
				cheat.g('qilin');
				cheat.g('bagua');
				cheat.g('dilu');
				cheat.g('chitu');
				cheat.g('muniu');
			},
			gj:function(){
				cheat.g('shandian');
				cheat.g('huoshan');
				cheat.g('hongshui');
				cheat.g('lebu');
				cheat.g('bingliang');
				cheat.g('guiyoujie');
			},
			d:function(num,target){
				if(num==undefined) num=1;
				var cards=get.cards(num);
				for(var i=0;i<num;i++){
					var card=cards[i];
					game.me.node.handcards1.appendChild(card);
					game.check();
					game.me.update();
					ui.updatehl();
				}
			},
			s:function(skill){
				game.me.addSkill(skill);
				game.check();
			},
			t:function(num){
				if(num==undefined){
					for(var i=0;i<game.players.length;i++) cheat.t(i);
					return;
				}
				var player=game.players[num];
				var cards=player.get('hej');
				for(var i=0;i<cards.length;i++){
					ui.discardPile.appendChild(cards[i]);
				}
				player.update();
			},
			k:function(i){
				if(i==undefined) i=1;
				game.players[i].hp=1;
				cheat.t(i);
				cheat.g('juedou');
			},
			z:function(name){
				game.zhu.init(name);
				game.zhu.maxHp++;
				game.zhu.hp++;
				game.zhu.update();
			},
			cp:function(){
				cheat.z('caopi');
			},
			cc:function(){
				cheat.z('re_caocao');
			},
			ls:function(){
				cheat.z('liushan');
			},
			zj:function(){
				cheat.z('sp_zhangjiao');
			},
			sc:function(){
				cheat.z('sunce');
			},
			lc:function(){
				cheat.z('liushan');
			},
			lb:function(){
				cheat.z('liubei');
			}
		},
		translate:{
			'default':"默认",
			zhenfa:'阵法',
			mode_derivation_card_config:'衍生',
			heart:"♥︎",
			diamond:"♦︎",
			spade:"♠︎",
			club:"♣︎",
			ghujia:'护甲',
			ghujia_bg:'甲',
			heart2:"红桃",
			diamond2:"方片",
			spade2:"黑桃",
			club2:"梅花",
			red:'红色',
			black:'黑色',
			ok:"确定",
			cancel:"取消",
			restart:"重新开始",
			setting:"设置",
			start:"开始",
			random:"随机",
			_phasebegin:'回合开始',
			_out:'无效',
			agree:'同意',
			refuse:'拒绝',
			fire:"火",
			thunder:"雷",
			poison:"毒",
			wei:'魏',
			shu:'蜀',
			wu:'吴',
			qun:'群',
			male:'男',
			female:'女',
			mad:'混乱',
			mad_bg:'疯',
			draw_card:'摸牌',
			discard_card:'弃牌',
			reset_character:'重置武将牌',
			recover_hp:'回复体力',
			lose_hp:'流失体力',
			get_damage:'受伤害',
			weiColor:"#b0d0e2",
			shuColor:"#ffddb9",
			wuColor:"#b2d9a9",
			qunColor:"#f6f6f6",
			basic:'基本',
			equip:'装备',
			trick:'锦囊',
			delay:'延迟锦囊',
			character:'角色',
			revive:'复活',
			equip1:'武器',
			equip2:'防具',
			equip3:'防御马',
			equip4:'攻击马',
			equip5:'宝物',
			zero:'零',
			one:'一',
			two:'二',
			three:'三',
			four:'四',
			five:'五',
			six:'六',
			seven:'七',
			eight:'八',
			nine:'九',
			ten:'十',
		},
		element:{
			playerproto:{
				phase:function(){
					"step 0"
					player.phaseJudge();
					"step 1"
					player.phaseDraw();
					if(!player.noPhaseDelay){
						if(player==game.me){
							game.delay();
						}
						else{
							game.delayx();
						}
					}
					"step 2"
					player.phaseUse();
					"step 3"
                    game.broadcastAll(function(){
                        if(ui.tempnowuxie){
    						ui.tempnowuxie.close();
    						delete ui.tempnowuxie;
    					}
                    });
					player.phaseDiscard()
					if(!player.noPhaseDelay) game.delayx();
					delete player.using;
					delete player._noSkill;
				},
				phaseJudge:function(){
					"step 0"
					if(player.node.judges.childElementCount){
						event.card=player.node.judges.firstChild;
						player.lose(event.card);
						player.$phaseJudge(event.card);
						event.cancelled=false;
						event.trigger('phaseJudge');
						player.popup(event.card.viewAs||event.card.name,'thunder');
					}
					else event.finish();
					"step 1"
					if(!event.cancelled) player.judge(event.card);
					"step 2"
					var name=event.card.viewAs||event.card.name;
					if(event.cancelled&&!event.direct){
						if(lib.card[name].cancel){
							var next=game.createEvent(name+'Cancelled');
							next.content=lib.card[name].cancel;
							next.card=event.card;
							next.player=player;
						}
					}
					else{
						var next=game.createEvent(name);
						next.content=lib.card[name].effect;
						next._result=result;
						next.card=event.card;
						next.player=player;
					}
					ui.clear();
					event.goto(0);
				},
				phaseDraw:function(){
					if(game.modPhaseDraw){
						game.modPhaseDraw(player,event.num);
					}
					else{
						if(get.config('first_less')&&game.phaseNumber==1&&_status.first_less){
							event.num--;
						}
						if(event.num>0){
							player.draw(event.num);
						}
					}
				},
				phaseUse:function(){
					"step 0";
					player.chooseToUse();
					"step 1"
					if(result.bool){
						event.goto(0);
					}
                    game.broadcastAll(function(){
                        if(ui.tempnowuxie){
    						ui.tempnowuxie.close();
    						delete ui.tempnowuxie;
    					}
                    });
					delete player.using;
				},
				phaseDiscard:function(){
					"step 0"
					event.num=player.num('h')-game.checkMod(player,player.hp,'maxHandcard',player.get('s'));
					if(event.num<=0) event.finish();
					else{
						if(lib.config.show_phase_prompt){
							player.popup('弃牌阶段');
						}
					}
					event.trigger('phaseDiscard');
					"step 1"
					player.chooseToDiscard(num,true);
					"step 2"
					event.cards=result.cards;
				},
				chooseToUse:function(){
					"step 0"
                    _status.noclearcountdown=true;
					if(event.isMine()){
                        if(event.type=='wuxie'){
                            if(ui.wuxie&&ui.wuxie.classList.contains('glow')){
                                event.result={
                                    bool:false
                                }
                                return;
                            }
                            if(ui.tempnowuxie&&ui.tempnowuxie.classList.contains('glow')&&event.getParent().state){
                                event.result={
                                    bool:false
                                }
                                return;
                            }
                            if(!_status.connectMode&&lib.config.wuxie_self&&event.getParent().state){
                                var tw=event.getParent()._trigger.parent;
                                if(tw.player==player&&tw.targets&&tw.targets.length==1){
                                    event.result={
                                        bool:false
                                    }
                                    return;
                                }
                            }
                        }
                        var ok=game.check();
						if(!ok||!lib.config.auto_confirm){
							game.pause();
							if(lib.config.enable_vibrate&&player._noVibrate){
								delete player._noVibrate;
								game.vibrate();
							}
						}
						if(typeof event.prompt=='string'){
							if(!ok) event.dialog=ui.create.dialog(event.prompt);
						}
						else if(event.prompt=='function'){
							if(!ok) event.dialog=ui.create.dialog(event.prompt(event));
						}
						else if(event.prompt==undefined){
							var str;
							if(typeof event.filterCard=='object'){
								var filter=event.filterCard;
								str='请使用'+get.cnNumber(event.selectCard[0])+'张'
								if(filter.name){
									str+=get.translation(filter.name);
								}
								else{
									str+='牌';
								}
							}
							else{
								str='请选择要使用的牌';
							}
							if(!ok){
								if(event.openskilldialog){
									event.skillDialog=ui.create.dialog(event.openskilldialog);
									delete event.openskilldialog;
									event.dialog=str;
								}
								else if(typeof event.skillDialog!='string'){
									event.dialog=ui.create.dialog(str);
								}
								else{
									event.dialog=str;
								}
							}
						}
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
						event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        var ok=game.check();
                        if(ok){
							ui.click.ok();
						}
						else if(ai.basic.chooseCard(event.ai1)){
							if(ai.basic.chooseTarget(event.ai2)){
								ui.click.ok();
								_status.event.aiexclude.length=0;
							}
							else{
								if(!event.norestore){
									if(event.skill){
										var skill=event.skill;
										ui.click.cancel();
										event.aiexclude.add(skill);
                                        var info=get.info(skill);
                                        if(info.sourceSkill){
                                            event.aiexclude.add(info.sourceSkill);
                                        }
									}
									else{
										get.card().aiexclude();
										game.uncheck();
									}
									event.redo();
									game.resume();
								}
								else{
									ui.click.cancel();
								}
							}
						}
						else if(event.skill&&!event.norestore){
							var skill=event.skill;
							ui.click.cancel();
							event.aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
                    }
                    "step 2"
                    if(event.result){
                        if(event.result.skill){
                            var info=get.info(event.result.skill);
                            if(info&&info.chooseButton){
                                if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
                                var dialog=info.chooseButton.dialog(event,player);
                                var next=player.chooseButton(dialog);
                                next.set('ai',info.chooseButton.check||function(){return 1;});
                                next.set('filterButton',info.chooseButton.filter||function(){return true;});
                                event.buttoned=event.result.skill;
                            }
                        }
                    }
                    "step 3"
                    if(event.buttoned){
                        if(result.bool){
                            var info=get.info(event.buttoned).chooseButton;
                            lib.skill[event.buttoned+'_backup']=info.backup(result.links,player);
                            lib.skill[event.buttoned+'_backup'].sourceSkill=event.buttoned;
                            if(game.online){
                                event._sendskill=[event.buttoned+'_backup',lib.skill[event.buttoned+'_backup']];
                            }
                            event.backup(event.buttoned+'_backup');
                            if(info.prompt){
                                event.openskilldialog=info.prompt(result.links,player);
                            }
                        }
                        else{
                            event.aiexclude.add(event.buttoned);
                        }
                        event.goto(0);
                        delete event.buttoned;
                    }
                    "step 4"
                    delete _status.noclearcountdown;
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(event.result.bool&&!game.online&&!event.nouse){
                        player.useResult(event.result,event);
					}
                    else if(event._sendskill){
                        event.result._sendskill=event._sendskill;
                    }
					if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
                    if(!_status.noclearcountdown){
                        game.stopCountChoose();
                    }
                    "step 5"
                    if(event._result&&event.result){
                        event.result.result=event._result;
                    }
				},
				chooseToRespond:function(){
					"step 0"
					if(event.responded){
						delete event.dialog;
						return;
					}
					if(!_status.connectMode&&event.autochoose&&event.autochoose()){
						event.result={bool:false};
					}
					else{
						game.check();
						if(event.isMine()){
							game.pause();
							if(event.dialog) event.dialog=ui.create.dialog(event.dialog);
						}
                        else if(event.isOnline()){
                            event.send();
                        }
						else{
							event.result='ai';
						}
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseCard(event.ai)||forced){
                            ui.click.ok();
                        }
                        else if(event.skill){
                            var skill=event.skill;
                            ui.click.cancel();
                            event.aiexclude.add(skill);
                            event.redo();
                            game.resume();
                        }
                        else{
                            ui.click.cancel();
                        }
                    }
                    "step 2"
					if(event.result.bool&&!game.online){
						player.respond(event.result.cards,event.result.card,event.animate,event.result.skill,event.source);
					}
					if(event.dialog&&event.dialog.close) event.dialog.close();
				},
				chooseToDiscard:function(){
					"step 0"
					if(event.autochoose()){
						event.result={
							bool:true,
							cards:player.get(event.position||'h')
						}
					}
					else{
						var range=get.select(event.selectCard);
						game.check();
						if(event.isMine()){
							game.pause();
							if(range[1]>1){
								event.promptdiscard=ui.create.control('提示',function(){
									ai.basic.chooseCard(event.ai);
									if(_status.event.custom.add.card){
										_status.event.custom.add.card();
									}
								});
							}
							if(event.prompt!=false){
								var str;
								if(typeof(event.prompt)=='string') str=event.prompt;
								else{
									str='请弃置';
									if(range[0]==range[1]) str+=get.cnNumber(range[0]);
									else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
									else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
									str+='张';
									if(event.position=='h'||event.position==undefined) str+='手';
									if(event.position=='e') str+='装备';
									str+='牌';
								}
								event.dialog=ui.create.dialog(str);
								event.dialog.add('0/'+event.selectCard[1]);
								event.custom.add.card=function(){
									_status.event.dialog.content.childNodes[1].innerHTML=
									ui.selected.cards.length+'/'+_status.event.selectCard[1];
								}
							}
							else if(get.itemtype(event.dialog)=='dialog'){
								event.dialog.style.display='';
								event.dialog.open();
							}
						}
                        else if(event.isOnline()){
                            event.send();
                        }
						else{
							event.result='ai';
						}
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseCard(event.ai)||forced){
                            ui.click.ok();
                        }
                        else if(event.skill){
                            var skill=event.skill;
                            ui.click.cancel();
                            event.aiexclude.add(skill);
                            event.redo();
                            game.resume();
                        }
                        else{
                            ui.click.cancel();
                        }
                    }
                    "step 2"
					if(event.promptdiscard){
						event.promptdiscard.close();
					}
					if(event.logSkill&&event.result.bool){
						if(typeof event.logSkill=='string'){
							player.logSkill(event.logSkill);
						}
						else if(Array.isArray(event.logSkill)){
							player.logSkill.apply(player,event.logSkill);
						}
					}
					if(!game.online) player.discard(event.result.cards);
					if(event.dialog) event.dialog.close();
				},
				chooseToCompare:function(){
					"step 0"
					if(player.num('h')==0||target.num('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(player,'对',target,'发起拼点');
                    "step 1"
                    var sendback=function(){
                        if(_status.event!=event){
                            return function(){
                                event.resultOL=_status.event.resultOL;
                            };
                        }
                    };
                    if(player.isOnline()){
                        player.wait(sendback);
                        event.ol=true;
                        player.send(function(ai){
                            game.me.chooseCard('请选择拼点牌',true).set('glow_result',true).ai=ai;
                            game.resume();
                        },event.ai);
                    }
                    else{
                        event.localPlayer=true;
                        player.chooseCard('请选择拼点牌',true).set('glow_result',true).ai=event.ai;
                    }
                    if(target.isOnline()){
                        target.wait(sendback);
                        event.ol=true;
                        target.send(function(ai){
                            game.me.chooseCard('请选择拼点牌',true).set('glow_result',true).ai=ai;
                            game.resume();
                        },event.ai);
                    }
                    else{
                        event.localTarget=true;
                    }
                    "step 2"
                    if(event.localPlayer){
                        event.card1=result.cards[0];
                    }
                    if(event.localTarget){
                        target.chooseCard('请选择拼点牌',true).set('glow_result',true).ai=event.ai;
                    }
                    "step 3"
                    if(event.localTarget){
                        event.card2=result.cards[0];
                    }
                    if(!event.resultOL&&event.ol){
                        game.pause();
                    }
					"step 4"
                    try{
                        if(!event.card1) event.card1=event.resultOL[player.playerid].cards[0];
                        if(!event.card2) event.card2=event.resultOL[target.playerid].cards[0];
                        if(!event.card1||!event.card2){
                            throw('err');
                        }
                    }
                    catch(e){
                        console.log(e);
                        event.finish();
                        return;
                    }
					if(event.card2.number>=10||event.card2.number<=4){
						if(target.num('h')>2){
							event.addToAI=true;
						}
					}
					player.lose(event.card1);
					target.lose(event.card2);
					"step 5"
                    game.broadcast(function(){
                        ui.arena.classList.add('thrownhighlight');
                    });
                    ui.arena.classList.add('thrownhighlight');
					game.addVideo('thrownhighlight1');
					player.$compare(event.card1,target,event.card2);
					game.log(player,'的拼点牌为',event.card1);
					game.log(target,'的拼点牌为',event.card2);
					event.result={
						player:event.card1,
						target:event.card2,
					}
                    event.dialogid=lib.status.videoId++;
					if(get.number(event.card1)>get.number(event.card2)){
						event.result.bool=true;
						setTimeout(function(){
                            var str=get.translation(player.name)+'拼点成功';
                            game.broadcast(function(str,id){
                                var dialog=ui.create.dialog(str);
                                dialog.videoId=id;
                                dialog.classList.add('center');
                            },str,event.dialogid);
							event.dialog=ui.create.dialog(str);
							event.dialog.classList.add('center');
							player.popup('胜');
							target.popup('负');
							game.resume();
						},1500);
					}
					else{
						event.result.bool=false;
						if(get.number(event.card1)>get.number(event.card2)){
							event.result.tie=true;
							setTimeout(function(){
                                var str=get.translation(player.name)+'拼点失败';
                                game.broadcast(function(str,id){
                                    var dialog=ui.create.dialog(str);
                                    dialog.videoId=id;
                                    dialog.classList.add('center');
                                },str,event.dialogid);
								event.dialog=ui.create.dialog(str);
								event.dialog.classList.add('center');
								player.popup('平');
								target.popup('平');
								game.resume();
							},1500);
						}
						else{
							setTimeout(function(){
								event.dialog=ui.create.dialog(get.translation(player.name)+'拼点失败');
								event.dialog.classList.add('center');
								player.popup('负');
								target.popup('胜');
								game.resume();
							},1500);
						}
					}
					game.pause();
					"step 6"
					game.delay(2);
					"step 7"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85&&event.addToAI){
						event.target.ai.shown+=0.1;
					}
					ui.arena.classList.remove('thrownhighlight');
                    game.broadcast(function(id){
                        var dialog=get.idDialog(id);
                        if(dialog){
                            dialog.close();
                        }
                        ui.arena.classList.remove('thrownhighlight');
                    },event.dialogid);
					game.addVideo('thrownhighlight2');
					if(event.clear!==false){
                        game.broadcastAll(ui.clear);
                    }
					event.dialog.close();
				},
				chooseButton:function(){
					"step 0"
                    if(typeof event.dialog=='number'){
                        event.dialog=get.idDialog(event.dialog);
                    }
                    if(event.createDialog&&!event.dialog){
                        if(Array.isArray(event.createDialog)){
                            event.createDialog.add('hidden');
                            event.dialog=ui.create.dialog.apply(this,event.createDialog);
                        }
                        event.closeDialog=true;
                    }
					if(event.dialog==undefined) event.dialog=ui.dialog;
					if(event.isMine()||event.dialogdisplay){
						event.dialog.style.display='';
						event.dialog.open();
					}
					game.check();
					if(event.isMine()){
						game.pause();
					}
                    else if(event.isOnline()){
                        event.send();
                        delete event.callback;
                    }
					else{
                        event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
						else ui.click.cancel();
                    }
					if(event.closeDialog){
						event.dialog.close();
					}
                    if(event.callback){
                        event.callback(event.player,event.result);
                    }
				},
                chooseButtonOL:function(){
                    'step 0'
                    for(var i=0;i<event.list.length;i++){
                        var current=event.list[i];
                        current[0].wait();
                        if(current[0].isOnline()){
                            var target=current.shift();
                            target.send(function(args,callback){
                                game.me.chooseButton.apply(game.me,args).callback=callback;
                                game.resume();
                            },current,event.callback);
                            target._choose_button_ol=current;
                            event.list.splice(i--,1);
                        }
                        else if(current[0]==game.me){
                            event.last=current;
                            event.last.shift();
                            event.list.splice(i--,1);
                        }
                    }
                    'step 1'
                    if(event.list.length){
                        var current=event.list.shift();
                        event.target=current.shift();
                        event.target.chooseButton.apply(event.target,current).callback=event.callback;
                    }
                    else{
                        event.goto(3);
                    }
                    'step 2'
                    event.target.unwait(result);
                    event.goto(1);
                    'step 3'
                    if(event.last){
                        game.me.chooseButton.apply(game.me,event.last).callback=event.callback;
                    }
                    else{
                        event.goto(5);
                    }
                    'step 4'
                    game.me.unwait(result);
                    'step 5'
                    if(!event.resultOL){
                        game.pause();
                    }
                    'step 6'
                    event.result=event.resultOL;
                },
				chooseCard:function(){
					"step 0"
					game.check();
					if(event.isMine()){
						game.pause();
						if(event.prompt!=false){
							var str;
							if(typeof event.prompt=='string') str=event.prompt;
							else{
								str='请选择'
								var range=get.select(event.selectCard);
								if(range[0]==range[1]) str+=get.cnNumber(range[0]);
								else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
								else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
								str+='张';
								if(event.position=='h'||event.position==undefined) str+='手';
								if(event.position=='e') str+='装备';
								str+='牌';
							}
							event.dialog=ui.create.dialog(str);
							event.dialog.add('0/'+event.selectCard[1]);
							event.custom.add.card=function(){
								_status.event.dialog.content.childNodes[1].innerHTML=
								ui.selected.cards.length+'/'+_status.event.selectCard[1];
							}
						}
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
						event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseCard(event.ai)||forced){
							ui.click.ok();
						}
						else if(event.skill){
							var skill=event.skill;
							ui.click.cancel();
							event.aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
                    }
                    "step 2"
                    if(event.glow_result){
                        for(var i=0;i<event.result.cards.length;i++){
                            event.result.cards[i].classList.add('glow');
                        }
                    }
					if(event.dialog) event.dialog.close();
				},
				chooseTarget:function(){
					"step 0"
					if(event.isMine()){
                        game.check();
						game.pause();
						if(event.prompt!=false){
							var str;
							if(typeof event.prompt=='string') str=event.prompt;
							else{
								str='请选择'
								var range=get.select(event.selectTarget);
								if(range[0]==range[1]) str+=get.cnNumber(range[0]);
								else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
								else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
								str+='个目标';
							}
							event.dialog=ui.create.dialog(str);
							event.dialog.add('0/'+event.selectTarget[1]);
							event.custom.add.target=function(){
								_status.event.dialog.content.childNodes[1].innerHTML=
								ui.selected.targets.length+'/'+_status.event.selectTarget[1];
							}
						}
						else if(get.itemtype(event.dialog)=='dialog'){
							event.dialog.open();
						}
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
                        event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseTarget(event.ai)||forced){
							ui.click.ok();
						}
						else{
							ui.click.cancel();
						}
                    }
					if(event.result.bool){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseCardTarget:function(){
					"step 0"
					if(event.isMine()){
                        game.check();
						game.pause();
						if(event.prompt!=false){
							event.dialog=ui.create.dialog(event.prompt||'请选择卡牌和目标');
						}
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
						event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseCard(event.ai1)){
							if(ai.basic.chooseTarget(event.ai2)){
								ui.click.ok();
								_status.event.aiexclude.length=0;
							}
							else{
								get.card().aiexclude();
								game.uncheck();
								event.redo();
								game.resume();
							}
						}
						else{
							ui.click.cancel();
						}
                    }
                    "step 2"
					if(event.result.bool){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseControl:function(){
					"step 0"
					if(event.controls.length==0){
						event.finish();
						return;
					}
					if(event.isMine()){
						event.controlbar=ui.create.control(event.controls);
						if(event.dialog){
							event.dialog.open();
						}
						else if(event.prompt){
							event.dialog=ui.create.dialog(event.prompt);
						}
						game.pause();
                        game.countChoose();
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
						event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        event.result={};
						if(event.ai){
							var result=event.ai(event.getParent(),player);
							if(typeof result=='number') event.result.control=event.controls[result];
							else event.result.control=result;
						}
						else event.result.control=event.controls[event.choice];
                    }
					_status.imchoosing=false;
					if(event.dialog) event.dialog.close();
					if(event.controlbar) event.controlbar.close();
				},
				chooseBool:function(){
					"step 0"
					if(event.isMine()){
						ui.create.confirm('oc');
						if(event.dialog){
							event.dialog.open();
						}
						else if(event.prompt){
							event.dialog=ui.create.dialog(event.prompt);
						}
						game.pause();
                        game.countChoose();
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
                        event.result='ai';
					}
					"step 1"
                    if(event.result=='ai'){
                        if(event.ai){
							event.choice=event.ai(event.getParent(),player);
						}
						event.result={bool:event.choice};
                    }
					_status.imchoosing=false;
					if(event.dialog) event.dialog.close();
				},
				choosePlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					else{
						event.dialog.add('选择'+get.translation(target)+'的一张牌');
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible||target==player){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					var cs=target.get(event.position||'h');
					if(event.forced&&get.select(event.selectButton)[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else{
						if(event.isMine()){
							event.dialog.open();
    						game.check();
							game.pause();
						}
                        else if(event.isOnline()){
                            event.send();
                        }
						else{
							event.result='ai';
						}
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
                        else ui.click.cancel();
                    }
					event.dialog.close();
				},
				discardPlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='弃置'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible||target==player){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					var cs=target.get(event.position||'h');
					if(event.forced&&get.select(event.selectButton)[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else{
						if(event.isMine()){
							event.dialog.open();
    						game.check();
							game.pause();
						}
                        else if(event.isOnline()){
                            event.send();
                        }
						else{
							event.result='ai';
						}
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
                        else ui.click.cancel();
                    }
					event.dialog.close();
					"step 2"
					if(event.result.bool&&event.result.buttons&&!game.online){
						if(event.logSkill){
							if(typeof event.logSkill=='string'){
								player.logSkill(event.logSkill);
							}
							else if(Array.isArray(event.logSkill)){
								player.logSkill.apply(player,event.logSkill);
							}
						}
						var cards=[];
						for(var i=0;i<event.result.links.length;i++){
							cards.push(event.result.links[i]);
						}
						target.discard(cards);
					}
				},
				gainPlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='获得'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible||target==player){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.dialog.close();
						event.finish();
						return;
					}
					var cs=target.get(event.position||'h');
					if(event.forced&&get.select(event.selectButton)[0]>=cs.length){
						event.result={
							bool:true,
							buttons:event.dialog.buttons,
							links:cs
						}
					}
					else{
						if(event.isMine()){
							event.dialog.open();
                            game.check();
							game.pause();
						}
                        else if(event.isOnline()){
                            event.send();
                        }
						else{
							event.result='ai';
						}
					}
					"step 1"
                    if(event.result=='ai'){
                        game.check();
                        if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
                        else ui.click.cancel();
                    }
					event.dialog.close();
                    "step 2"
                    if(game.online){
                        event.finish();
                    }
					"step 3"
					var cards=[];
					for(var i=0;i<event.result.links.length;i++){
						cards.push(event.result.links[i]);
					}
					target.lose(cards);
					event.cards=cards;
					var hs=[],oths=[];
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])=='h'){
							hs.push(cards[i]);
						}
						else{
							oths.push(cards[i]);
						}
					}
					if(hs.length){
						target.$give(hs.length,player);
					}
					if(oths.length){
						target.$give(oths,player);
					}
					"step 4"
					if(player==game.me){
						game.delay(2);
					}
					else{
						game.delayx();
					}
					player.gain(event.cards);
				},
				showHandcards:function(){
					"step 0"
					if(player.num('h')==0){
						event.finish();
						return;
					}
					var cards=player.get('h');
					var str=get.translation(player.name)+'的手牌';
					event.dialog=ui.create.dialog(str,cards);
                    event.dialogid=lib.status.videoId++;
                    event.dialog.videoId=event.dialogid;
                    game.broadcast(function(str,cards,id){
                        ui.create.dialog(str,cards).videoId=id;
                    },str,cards,event.dialogid);
					game.log(player,'展示了',cards);
					game.addVideo('showCards',player,[str,get.cardsInfo(cards)]);
					game.delayx(2);
					"step 1"
                    game.broadcast(function(id){
                        var dialog=get.idDialog(id);
                        if(dialog){
                            dialog.close();
                        }
                    },event.dialogid);
					event.dialog.close();
				},
				showCards:function(){
					"step 0"
					if(get.itemtype(cards)!='cards'){
						event.finish();
						return;
					}
					if(!event.str){
						event.str=get.translation(player.name)+'展示的牌';
					}
					event.dialog=ui.create.dialog(event.str,cards);
                    event.dialogid=lib.status.videoId++;
                    event.dialog.videoId=event.dialogid;
                    game.broadcast(function(str,cards,id){
                        ui.create.dialog(str,cards).videoId=id;
                    },event.str,cards,event.dialogid);
					game.log(player,'展示了',cards);
					game.delayx(2);
					game.addVideo('showCards',player,[event.str,get.cardsInfo(cards)]);
					"step 1"
                    game.broadcast(function(id){
                        var dialog=get.idDialog(id);
                        if(dialog){
                            dialog.close();
                        }
                    },event.dialogid);
					event.dialog.close();
				},
				viewHandcards:function(){
					"step 0"
					if(player==game.me&&target){
						event.dialog=ui.create.dialog(get.translation(target.name)+'的手牌',target.get('h'));
						if(event.isMine()){
							game.pause();
							ui.create.confirm('o');
                            game.countChoose();
						}
						else{
							event.finish();
                            event.result='viewed';
							setTimeout(function(){
								event.dialog.close();
							},2*lib.config.duration);
							game.delayx(2);
						}
					}
                    else if(event.isOnline()){
                        event.send();
                    }
					else{
						event.finish();
					}
					"step 1"
                    event.result='viewed';
					_status.imchoosing=false;
					if(event.dialog) event.dialog.close();
				},
				useCard:function(){
					"step 0"
					if(!card){
						console.log('err: no card',get.translation(event.player));
						event.finish();
						return;
					}
					player.lose(cards);
					player.using=cards;
					var cardaudio=true;
					if(event.skill){
						if(lib.skill[event.skill].audio){
							cardaudio=false;
						}
						player.logSkill(event.skill);
						if(get.info(event.skill).popname){
							player.popup(event.card.name);
						}
					}
					else if(lib.config.show_card_prompt){
						if(get.type(event.card)=='equip'&&lib.config.hide_card_prompt_equip);
						else if(get.type(event.card)=='basic'&&lib.config.hide_card_prompt_basic);
						else{
							player.popup(event.card.name,'metal');
						}
					}
					if(event.audio===false){
						cardaudio=false;
					}
					if(cardaudio){
                        game.broadcastAll(function(player,card){
                            if(lib.config.background_audio){
                                var sex=player.sex=='female'?'female':'male';
        						if(lib.card[card.name].audio||lib.config.background_ogg){
        							if(card.name=='sha'&&(card.nature=='fire'||card.nature=='thunder')){
        								game.playAudio('card',sex,card.name+'_'+card.nature);
        							}
        							else{
        								game.playAudio('card',sex,card.name);
        							}
        						}
        						else if(get.type(card)!='equip'){
        							game.playAudio('card/default');
        						}
                            }
                        },player,card);
					}
					if(event.animate!=false){
						if(card.name=='wuxie'&&event.getParent().target){
							var lining=event.getParent().target2||event.getParent().target;
							if(Array.isArray(lining)&&event.getParent()._trigger.name=='jiedao'){
								player.line(lining[0],'green');
							}
							else{
								player.line(lining,'green');
							}
						}
						else{
							var config={};
							if(card.nature=='fire'||
								(card.classList&&card.classList.contains('fire'))){
								config.color='fire';
							}
							else if(card.nature=='thunder'||
								(card.classList&&card.classList.contains('thunder'))){
								config.color='thunder';
							}
							if(get.info(card).multitarget&&targets.length>1&&!get.info(card).multiline){
								player.line2(targets,config);
							}
							else{
								player.line(targets,config);
							}
						}
						player.$throw(cards);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							var waitingForTransition=get.time();
							event.waitingForTransition=waitingForTransition;
							cards[0].clone.addEventListener('webkitTransitionEnd',function(){
								if(_status.waitingForTransition==waitingForTransition&&_status.paused){
									game.resume();
								}
								delete event.waitingForTransition;
							});
						}
					}
                    event.id=get.id();
					event.trigger('useCard');
                    event._oncancel=function(){
                        game.broadcastAll(function(id){
                            if(ui.tempnowuxie&&ui.tempnowuxie._origin==id){
        						ui.tempnowuxie.close();
        						delete ui.tempnowuxie;
        					}
                        },event.id);
                    };
					if(get.type(card)!='equip'){
						var str='';
						if(targets.length){
							str+='对<span class="bluetext">'+(targets[0]==player?'自己':get.translation(targets[0]));
							for(var i=1;i<targets.length;i++){
								str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
							}
							str+='</span>'
						}
						str+='使用了';
						if(cards.length&&(cards.length>1||cards[0]!=card)){
							game.log(player,str,card,'（',cards,'）');
						}
						else{
							game.log(player,str,card);
						}
					}
					if(event.addCount!=false){
						if(player.stat[player.stat.length-1].card[card.name]==undefined){
							player.stat[player.stat.length-1].card[card.name]=1;
						}
						else{
							player.stat[player.stat.length-1].card[card.name]++;
						}
						if(event.skill){
							if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
								player.stat[player.stat.length-1].skill[event.skill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[event.skill]++;
							}
                            var sourceSkill=get.info(event.skill).sourceSkill;
                            if(sourceSkill){
                                if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
        							player.stat[player.stat.length-1].skill[sourceSkill]=1;
        						}
        						else{
        							player.stat[player.stat.length-1].skill[sourceSkill]++;
        						}
                            }
						}
					}
					"step 1"
					if(get.info(card).contentBefore){
						var next=game.createEvent(card.name+'ContentBefore');
						next.content=get.info(card).contentBefore;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
					}
					"step 2"
					if(targets[num]&&targets[num].isDead()) return;
					if(targets[num]&&targets[num].isOut()) return;
					if(targets[num]&&targets[num].removed) return;
					var info=get.info(card);
					if(targets.length==0&&!info.notarget) return;
					var next=game.createEvent(card.name);
					next.content=info.content;
					next.targets=targets;
					next.card=card;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.type='card';
					next.skill=event.skill;
					next.multitarget=info.multitarget;
					next.preResult=event.preResult;
					if(num==0&&next.targets.length>1){
						if(!info.multitarget){
							lib.tempSortSeat=player;
							targets.sort(lib.sort.seat);
							delete lib.tempSortSeat;
							for(var i=0;i<targets.length;i++){
								targets[i].animate('target');
							}
						}
						else{
							for(var i=0;i<targets.length;i++){
								targets[i].animate('target');
							}
						}
					}
					next.target=targets[num];
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(event.animate!=false||num>0){
						if(num==0){
							if(event.delayx!==false){
								if(event.waitingForTransition){
									_status.waitingForTransition=event.waitingForTransition;
									game.pause();
								}
								else{
									game.delayx();
								}
							}
						}
						else game.delayx(0.5);
					}
					"step 3"
					if(!get.info(event.card).multitarget&&num<targets.length-1){
						event.num++;
						event.goto(2);
					}
					"step 4"
					if(get.info(card).contentAfter){
						var next=game.createEvent(card.name+'contentAfter');
						next.content=get.info(card).contentAfter;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
						next.preResult=event.preResult;
					}
					"step 5"
                    if(event._result){
                        event.result=event._result;
                    }
					delete player.using;
					if(document.getElementsByClassName('thrown').length){
						if(event.delayx!==false) game.delayx();
					}
					else{
						event.finish();
					}
					"step 6"
					if(event.card.name!='wuxie'){
                        game.broadcastAll(ui.clear);
                    }
                    event._oncancel();
				},
				useSkill:function(){
					"step 0"
					var info=get.info(event.skill);
					event._skill=event.skill;
					game.trySkillAudio(event.skill,player);
					if(player.checkShow){
						player.checkShow(event.skill);
					}
					if(info.discard!=false&&info.lose!=false&&!info.viewAs){
						player.discard(cards).delay=false;
						if(info.prepare){
							info.prepare(cards,player,targets);
						}
						if(lib.config.low_performance){
							event.discardTransition=true;
						}
					}
					else{
						if(info.lose!=false){
							player.lose(cards,ui.special);
						}
						if(info.prepare){
							info.prepare(cards,player,targets);
						}
						else if(info.viewAs){
							player.$throw(cards);
							if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							    var waitingForTransition=get.time();
							    event.waitingForTransition=waitingForTransition;
							    cards[0].clone.addEventListener('webkitTransitionEnd',function(){
							        if(_status.waitingForTransition==waitingForTransition&&_status.paused){
							            game.resume();
							        }
							        delete event.waitingForTransition;
							    });
							}
						}
					}
					if(info.line!=false&&targets.length){
						var config={};
						if(info.line=='fire'){
							config.color='fire';
						}
						else if(info.line=='thunder'){
							config.color='thunder';
						}
						else if(info.line===undefined||info.line=='green'){
							config.color='green';
						}
						if(info.multitarget&&!info.multiline&&targets.length>1){
							player.line2(targets,config);
						}
						else{
							player.line(targets,config);
						}
					}
					var str='';
					if(targets&&targets.length&&info.log!='notarget'){
						str+='对<span class="bluetext">'+(targets[0]==player?'自己':get.translation(targets[0]));
						for(var i=1;i<targets.length;i++){
							str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
						}
						str+='</span>'
					}
					str+='发动了';
					if(!info.direct){
						game.log(player,str,'【'+get.translation(skill)+'】');
						if(lib.config.skill_animation&&lib.skill[skill]&&lib.skill[skill].skillAnimation){
							player.$skill(lib.skill[skill].animationStr||lib.translate[skill],lib.skill[skill].skillAnimation,lib.skill[skill].animationColor);
						}
						else{
							player.popup(skill);
						}
					}
					if(event.addCount!=false){
						if(player.stat[player.stat.length-1].skill[skill]==undefined){
							player.stat[player.stat.length-1].skill[skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[skill]++;
						}
                        var sourceSkill=get.info(skill).sourceSkill;
                        if(sourceSkill){
                            if(player.stat[player.stat.length-1].skill[sourceSkill]==undefined){
    							player.stat[player.stat.length-1].skill[sourceSkill]=1;
    						}
    						else{
    							player.stat[player.stat.length-1].skill[sourceSkill]++;
    						}
                        }
					}
					if(player.stat[player.stat.length-1].allSkills==undefined){
						player.stat[player.stat.length-1].allSkills=1;
					}
					else{
						player.stat[player.stat.length-1].allSkills++;
					}
					"step 1"
					if(!event.skill){
						console.log('error: no skill',get.translation(event.player),event.player.get('s'));
						if(event._skill){
							event.skill=event._skill;
							console.log(event._skill);
						}
						else{
							event.finish();
							return;
						}
					}
					var info=get.info(event.skill);
					if(targets[num]&&targets[num].isDead()||
						targets[num]&&targets[num].isOut()||
						targets[num]&&targets[num].removed){
						if(!info.multitarget&&num<targets.length-1){
							event.num++;
							event.redo();
						}
						return;
					}
					var next=game.createEvent(event.skill);
					next.content=info.content;
					next.targets=targets;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.multitarget=info.multitarget;
					if(num==0&&next.targets.length>1){
						if(!info.multitarget){
							lib.tempSortSeat=player;
							targets.sort(lib.sort.seat);
							delete lib.tempSortSeat;
						}
						for(var i=0;i<targets.length;i++){
							targets[i].animate('target');
						}
					}
					next.target=targets[num];
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(num==0){
						if(typeof info.delay=='number') game.delay(info.delay);
						else if(info.delay!==false&&info.delay!==0){
							if(event.waitingForTransition){
							    _status.waitingForTransition=event.waitingForTransition;
							    game.pause();
							}
							else{
								game.delayx()
							}
						}
					}
					else game.delayx(0.5);
					if(!info.multitarget&&num<targets.length-1){
						event.num++;
						event.redo();
					}
					"step 2"
					if(player.getStat().allSkills>200){
						player._noSkill=true;
						console.log(player.name,event.skill);
					}
					if(document.getElementsByClassName('thrown').length){
						if(event.skill&&get.info(event.skill).delay!==0) game.delayx();
					}
					else{
						event.finish();
					}
					"step 3"
					ui.clear();
				},
				draw:function(){
					if(lib.config.background_audio){
						game.playAudio('effect','draw');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','draw');
    					}
                    });
					if(event.drawDeck){
						if(event.drawDeck>num){
							event.drawDeck=num;
						}
						num-=event.drawDeck;
					}
					if(event.log!=false){
						if(num>0){
							game.log(player,'摸了'+get.cnNumber(num)+'张牌');
						}
						if(event.drawDeck){
							game.log(player,'从牌库中获得了'+get.cnNumber(event.drawDeck)+'张牌');
						}
					}
					var cards;
					if(num>0){
						cards=get.cards(num);
					}
					else{
						cards=[];
					}
					if(event.drawDeck){
						cards=cards.concat(player.getDeckCards(event.drawDeck));
					}
					if(event.animate!=false){
						player.gain(cards,'draw');
					}
					else{
						player.gain(cards);
					}
					event.result=cards;
				},
				discard:function(){
					"step 0"
					if(lib.config.background_audio){
						game.playAudio('effect','discard');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','discard');
    					}
                    });
					game.log(player,'弃置了',cards);
					player.lose(cards);
					if(event.animate!=false){
						player.$throw(cards,1000);
						if(lib.config.sync_speed&&cards[0]&&cards[0].clone){
							if(event.delay!=false){
								var waitingForTransition=get.time();
							    event.waitingForTransition=waitingForTransition;
							    cards[0].clone.addEventListener('webkitTransitionEnd',function(){
							        if(_status.waitingForTransition==waitingForTransition&&_status.paused){
							            game.resume();
							        }
							        delete event.waitingForTransition;
							    });
							}
							else if(event.getParent().discardTransition){
								delete event.getParent().discardTransition;
								var waitingForTransition=get.time();
							    event.getParent().waitingForTransition=waitingForTransition;
							    cards[0].clone.addEventListener('webkitTransitionEnd',function(){
							        if(_status.waitingForTransition==waitingForTransition&&_status.paused){
							            game.resume();
							        }
							        delete event.getParent().waitingForTransition;
							    });
							}
						}
					}
					event.trigger('discard');
					"step 1"
					if(event.delay!=false){
						if(event.waitingForTransition){
						    _status.waitingForTransition=event.waitingForTransition;
						    game.pause();
						}
						else{
							game.delayx();
						}
					}
				},
				respond:function(){
					var cardaudio=true;
					if(event.skill){
						if(lib.skill[event.skill].audio){
							cardaudio=false;
						}
						player.logSkill(event.skill);
						if(player.checkShow){
							player.checkShow(event.skill);
						}
					}
					else if(lib.config.show_card_prompt&&!lib.config.hide_card_prompt_basic){
						player.popup(card.name,'wood');
					}
					if(cardaudio&&event.getParent(3).name=='useCard'){
                        game.broadcastAll(function(player,card){
                            if(lib.config.background_audio){
    							var sex=player.sex=='female'?'female':'male';
    							if(lib.card[card.name].audio||lib.config.background_ogg){
    								game.playAudio('card',sex,card.name);
    							}
    							else{
    								game.playAudio('card/default');
    							}
    						}
                        },player,card);
					}
					if(cards.length&&(cards.length>1||cards[0].name!=card.name)){
						game.log(player,'打出了',card,'（',cards,'）');
					}
					else{
						game.log(player,'打出了',card);
					}
					for(var i=0;i<cards.length;i++){
						player.lose(cards[i]);
						if(event.animate!=false) player.$throw(cards[i]);
						if(event.highlight){
							cards[i].clone.classList.add('thrownhighlight');
							game.addVideo('highlightnode',player,get.cardInfo(cards[i]));
						}
						var name='';
						if(event.skill) name=get.translation(event.skill)+'：';
						if(event.card) name+=get.translation(event.card.name);
					}
                    if(event.highlight){
                        game.broadcast(function(cards){
                            for(var i=0;i<cards.length;i++){
                                if(cards[i].clone){
                                    cards[i].clone.classList.add('thrownhighlight');
                                }
                            }
                        },cards);
                    }
					event.trigger('respond');
					game.delayx(0.5);
				},
				gain:function(){
					"step 0"
					if(cards){
						event.source=get.owner(cards[0]);
						if(event.source){
							event.source.lose(cards,ui.special);
						}
					}
					else{
						event.finish();
					}
					"step 1"
					if(event.source) game.delayx();
					"step 2"
					if(player.getStat().gain==undefined){
						player.getStat().gain=cards.length;
					}
					else{
						player.getStat().gain+=cards.length;
					}
					"step 3"
					var sort;
					var frag1=document.createDocumentFragment();
					var frag2=document.createDocumentFragment();
					var hs=player.get('h');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var num=0;num<cards.length;num++){
						sort=lib.config.sort_card(cards[num]);
						if(lib.config.reverse_sort) sort=-sort;
						cards[num].fix();
						cards[num].style.transform='';
						if(player==game.me){
							cards[num].classList.add('drawinghidden');
						}

						if(lib.isSingleHandcard()||sort>0) frag1.appendChild(cards[num]);
						else frag2.appendChild(cards[num]);
					}
					var addv=function(){
						if(player==game.me){
							game.addVideo('gain12',player,[get.cardsInfo(frag1.childNodes),get.cardsInfo(frag2.childNodes)]);
						}
					};
                    var broadcast=function(){
                        game.broadcast(function(player,cards,num){
                            player.directgain(cards);
                            _status.cardPileNum=num;
                        },player,cards,ui.cardPile.childNodes.length);
                    };
					if(event.animate=='draw'){
						player.$draw(cards.length);
						game.delayx(1,500);
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
                            broadcast();
						},500);
					}
					else if(event.animate=='gain'){
						player.$gain(cards);
						game.delayx(1,700);
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
                            broadcast();
						},700);
					}
					else if(event.animate=='gain2'||event.animate=='draw2'){
						player.$gain2(cards);
						game.delayx(1,500);
						setTimeout(function(){
							addv();
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
							if(player==game.me) ui.updatehl();
                            broadcast();
						},500);
					}
					else{
						addv();
						player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
						player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
						player.update();
						if(player==game.me) ui.updatehl();
                        broadcast();
					}
				},
				lose:function(){
					"step 0"
					var hs=[],es=[],js=[];
					for(var i=0;i<cards.length;i++){
						if(cards[i].parentNode){
							if(cards[i].parentNode.classList.contains('equips')){
								cards[i].original='e';
								es.push(cards[i]);
							}
							else if(cards[i].parentNode.classList.contains('judges')){
								cards[i].original='j';
								js.push(cards[i]);
							}
							else if(cards[i].parentNode.classList.contains('handcards')){
								cards[i].original='h';
								hs.push(cards[i]);
							}
							else{
								cards[i].original=null;
							}
						}
						cards[i].style.transform+=' scale(0.2)';
                        cards[i].classList.remove('glow');
						if(event.position){
							cards[i].goto(event.position);
						}
						else{
							cards[i].delete();
						}
					}
					if(player==game.me) ui.updatehl();
                    game.broadcast(function(player,cards,num){
                        for(var i=0;i<cards.length;i++){
                            cards[i].classList.remove('glow');
                            cards[i].delete();
                        }
                        if(player==game.me){
                            for(var i=player.node.handcards1.childNodes.length-1;i>0;i--){
        						if(player.node.handcards1.childNodes[i].classList.contains('removing')==false){
        							player.node.handcards1.childNodes[i].animate('last');
        							break;
        						}
        					}
        					for(var i=player.node.handcards2.childNodes.length-1;i>0;i--){
        						if(player.node.handcards2.childNodes[i].classList.contains('removing')==false){
        							player.node.handcards2.childNodes[i].animate('last');
        							break;
        						}
        					}
                            ui.updatehl();
                        }
                        _status.cardPileNum=num;
                    },player,cards,ui.cardPile.childNodes.length);
					game.addVideo('lose',player,[get.cardsInfo(hs),get.cardsInfo(es),get.cardsInfo(js)]);
					player.update();
					game.addVideo('loseAfter',player);
					for(var i=player.node.handcards1.childNodes.length-1;i>0;i--){
						if(player.node.handcards1.childNodes[i].classList.contains('removing')==false){
							player.node.handcards1.childNodes[i].animate('last');
							break;
						}
					}
					for(var i=player.node.handcards2.childNodes.length-1;i>0;i--){
						if(player.node.handcards2.childNodes[i].classList.contains('removing')==false){
							player.node.handcards2.childNodes[i].animate('last');
							break;
						}
					}
					event.num=0;
					"step 1"
					if(num<cards.length){
						if(cards[num].original=='e'){
							var info=get.info(cards[num]);
							if(info.onLose&&(!info.filterLose||info.filterLose(cards[num],player))){
								event.goto(2);
								return;
							}
						}
						event.num++;
						event.redo();
					}
					else{
						event.finish();
					}
					"step 2"
					player.popup(cards[num].name);
					var next=game.createEvent('lose_'+cards[num].name);
					var info=get.info(cards[num]);
					next.content=info.onLose;
					next.player=player;
					next.card=cards[num];
					game.delayx();
					event.num++;
					event.goto(1);
				},
				damage:function(){
					"step 0"
					if(num<0) num=0;
					if(num>0&&player.hujia&&!player.hasSkillTag('nohujia')){
						if(num>=player.hujia){
							num-=player.hujia;
							game.log(player,'的护甲抵挡了'+get.cnNumber(player.hujia)+'点伤害');
							player.hujia=0;
						}
						else{
							player.hujia-=num;
							game.log(player,'的护甲抵挡了'+get.cnNumber(num)+'点伤害');
							num=0;
						}
						event.hujia=true;
						player.update();
					}
					event.num=num;
					if(lib.config.background_audio){
						game.playAudio('effect','damage'+(num>1?'2':''));
					}
                    game.broadcast(function(num){
                        if(lib.config.background_audio){
    						game.playAudio('effect','damage'+(num>1?'2':''));
    					}
                    },num);
					var str='受到了';
					if(source) str+='来自<span class="bluetext">'+(source==player?'自己':get.translation(source))+'</span>的';
					str+=get.cnNumber(num)+'点';
					if(event.nature) str+=get.translation(event.nature)+'属性';
					str+='伤害';
					game.log(player,str);
					if(player.stat[player.stat.length-1].damaged==undefined){
						player.stat[player.stat.length-1].damaged=num;
					}
					else{
						player.stat[player.stat.length-1].damaged+=num;
					}
					if(source){
						if(source.stat[source.stat.length-1].damage==undefined){
							source.stat[source.stat.length-1].damage=num;
						}
						else{
							source.stat[source.stat.length-1].damage+=num;
						}
					}
					player.changeHp(-num,false);
					if(event.animate!==false){
						player.$damage(source);
                        game.broadcastAll(function(nature,player){
                            if(lib.config.animation&&!lib.config.low_performance){
    							if(nature=='fire'){
    								player.$fire();
    							}
    							else if(nature=='thunder'){
    								player.$thunder();
    							}
    						}
                        },event.nature,player);
						player.$damagepop(-num,event.nature);
					}
					// if(source){
					// 	if(player._damagetimeout!=source){
					// 		player.$damage(source);
					// 		player._damagetimeout=source;
					// 		setTimeout(function(){
					// 			delete player._damagetimeout;
					// 		},500);
					// 	}
					// 	if(player._damagepopup){
					// 		player._damagepopup-=num;
					// 		player._damagenature=event.nature;
					// 	}
					// 	else{
					// 		player._damagepopup=-num;
					// 		player._damagenature=event.nature;
					// 		setTimeout(function(){
					// 			player.popup(player._damagepopup,player._damagenature);
					// 			delete player._damagepopup;
					// 			delete player._damagenature;
					// 		},300);
					// 	}
					// }
					// else{
					// 	player.$damage();
					// }
					event.trigger('damage');
					"step 1"
					if(player.hp<=0&&player.isAlive()){
						game.delayx();
						player.dying(event);
					}
				},
				recover:function(){
					if(lib.config.background_audio){
						game.playAudio('effect','recover');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','recover');
    					}
                    });
					if(num>player.maxHp-player.hp) num=player.maxHp-player.hp;
					if(num>0){
						player.changeHp(num,false);
						if(lib.config.animation&&!lib.config.low_performance){
							player.$recover();
						}
						player.$damagepop(num,'wood');
						game.log(player,'回复了'+get.cnNumber(num)+'点体力')
					}
				},
				loseHp:function(){
					"step 0"
					if(lib.config.background_audio){
						game.playAudio('effect','loseHp');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','loseHp');
    					}
                    });
					game.log(player,'失去了'+get.cnNumber(num)+'点体力')
					player.changeHp(-num);
					"step 1"
					if(player.hp<=0){
						game.delayx();
						player.dying(event);
					}
				},
				doubleDraw:function(){
					"step 0"
					player.chooseBool('你的武将牌上有单独的阴阳鱼，是否摸一张牌？');
					"step 1"
					if(result.bool){
						player.draw();
					}
				},
				loseMaxHp:function(){
					"step 0"
					game.log(player,'失去了'+get.cnNumber(num)+'点体力上限');
					if(!event.forced&&typeof player.singleHp==='boolean'){
						if(player.singleHp){
							player.singleHp=false;
							player.maxHp-=num-1;
						}
						else{
							player.singleHp=true;
							player.maxHp-=num;
						}
					}
					else{
						player.maxHp-=num;
					}
					player.update();
					"step 1"
					if(player.maxHp<=0){
						player.die();
					}
					"step 2"
					if(!event.forced&&player.singleHp===true&&
						!player.classList.contains('unseen')&&!player.classList.contains('unseen2')){
						player.doubleDraw();
					}
				},
				gainMaxHp:function(){
					"step 0"
					game.log(player,'获得了'+get.cnNumber(num)+'点体力上限');
					if(!event.forced&&typeof player.singleHp==='boolean'){
						if(player.singleHp){
							player.singleHp=false;
							player.maxHp+=num;
						}
						else{
							player.singleHp=true;
							player.maxHp+=num-1;
						}
					}
					else{
						player.maxHp+=num;
					}
					player.update();
					"step 1"
					if(player.singleHp===true&&!player.classList.contains('unseen')&&!player.classList.contains('unseen2')){
						player.doubleDraw();
					}
				},
				changeHp:function(){
					player.hp+=num;
					if(player.hp>player.maxHp) player.hp=player.maxHp;
					player.update();
					if(event.popup!==false){
						player.$damagepop(num,'water');
					}
					event.trigger('changeHp');
				},
				dying:function(){
					"step 0"
					_status.dying=player;
					event.trigger('dying');
					game.log(player,'濒死')
					"step 1"
					if(_status.dying==player) delete _status.dying;
					if(player.hp<=0) player.die(event.reason);
				},
				die:function(){
					if(source){
						game.log(player,'被',source,'杀害');
						if(source.stat[source.stat.length-1].kill==undefined){
							source.stat[source.stat.length-1].kill=1;
						}
						else{
							source.stat[source.stat.length-1].kill++;
						}
					}
					else{
						game.log(player,'遇难')
					}
					event.cards=player.get('hej');
					event.playerCards=player.get('he');
					if(event.cards.length){
						player.$throw(event.cards,1000);
						game.log(player,'弃置了',event.cards);
					}
					if(!game.reserveDead){
						for(var mark in player.marks){
							player.unmarkSkill(mark);
						}
						while(player.node.marks.childNodes.length){
							player.node.marks.firstChild.remove();
						}
                        game.broadcast(function(player){
                            while(player.node.marks.childNodes.length){
    							player.node.marks.firstChild.remove();
    						}
                        },player);
					}
					for(var i in player.tempSkills){
						player.skills.remove(i);
						delete player.tempSkills[i];
					}

                    game.broadcastAll(function(player,cards){
                        player.classList.add('dead');
    					// player.classList.remove('linked');
    					player.classList.remove('turnedover');
    					player.classList.remove('out');
    					player.node.count.innerHTML='0';
    					player.node.hp.hide();
    					player.node.equips.hide();
    					player.node.count.hide();
    					player.previous.next=player.next;
    					player.next.previous=player.previous;
    					game.players.remove(player);
    					game.dead.push(player);

                        for(var i=0;i<cards.length;i++){
							cards[i].goto(ui.discardPile);
						}
                        if(game.online&&player==game.me&&!_status.over&&!game.controlOver&&!ui.exit){
                            ui.exit=ui.create.control('退出联机',function(){
                                game.saveConfig('reconnect_info');
                                game.reload();
                            });
                        }

                        if(lib.config.background_speak){
    						if(lib.character[player.name]&&
    						lib.character[player.name][4].contains('die_audio')){
    							game.playAudio('die',player.name);
    						}
    						else if(lib.config.background_ogg){
    							game.playAudio('die',player.name.slice(player.name.indexOf('_')+1));
    						}
    					}
                    },player,event.cards);

					if(!_status.connectMode&&player==game.me&&!_status.over&&!game.controlOver){
						ui.control.show();
						if(get.config('revive')&&lib.mode[lib.config.mode].config.revive){
							ui.revive=ui.create.control('revive',ui.click.dierevive);
						}
						if(get.config('dierestart')&&lib.mode[lib.config.mode].config.dierestart){
							ui.restart=ui.create.control('restart',game.reload);
						}
					}

					if(!_status.connectMode&&player==game.me&&!game.modeSwapPlayer){
						// _status.auto=false;
						if(ui.auto){
							// ui.auto.classList.remove('glow');
							ui.auto.hide();
						}
						if(ui.wuxie) ui.wuxie.hide();
					}
					game.addVideo('diex',player);
					if(event.animate!==false){
						player.$die(source);
					}
					if(player.dieAfter) player.dieAfter(source);
					if(typeof _status.coin=='number'&&source&&!_status.auto){
						if(source==game.me||source.isUnderControl()){
							_status.coin+=10;
						}
					}
				},
				equip:function(){
					"step 0"
					if(get.owner(card)) get.owner(card).lose(card,ui.special);
					if(card.clone){
                        game.broadcast(function(card,player){
                            if(card.clone){
                                card.clone.moveDelete(player);
                            }
                        },card,player);
						card.clone.moveDelete(player);
						game.addVideo('gain2',player,get.cardsInfo([card.clone]));
					}

					player.equiping=true;
					player.lose(player.get('e',{subtype:get.subtype(card)}),false);
					"step 1"
					if(player.isMin()){
						event.finish();
						ui.discardPile.appendChild(card);
						delete player.equiping;
						return;
					}
					if(lib.config.background_audio){
						game.playAudio('effect',get.subtype(card));
					}
                    game.broadcast(function(type){
                        if(lib.config.background_audio){
    						game.playAudio('effect',type);
    					}
                    },get.subtype(card));
					player.$equip(card);
					game.addVideo('equip',player,get.cardInfo(card));
					game.log(player,'装备了',card);
					"step 2"
					var info=get.info(card);
					if(info.onEquip&&(!info.filterEquip||info.filterEquip(card,player))){
						var next=game.createEvent('equip_'+card.name);
						next.content=info.onEquip;
						next.player=player;
						next.card=card;
						game.delayx();
					}
					delete player.equiping;
				},
				addJudge:function(){
					"step 0"
					if(cards&&get.owner(cards[0])) get.owner(cards[0]).lose(cards);
					"step 1"
					if(lib.config.background_audio){
						game.playAudio('effect','judge');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','judge');
    					}
                    });
					cards[0].fix();
					cards[0].style.transform='';
					cards[0].classList.remove('drawinghidden');
					var viewAs=typeof card=='string'?card:card.name;
					if(!lib.card[viewAs]||!lib.card[viewAs].effect){
						ui.discardPile.appendChild(cards[0]);
					}
					else{
						cards[0].style.transform='';
						player.node.judges.insertBefore(cards[0],player.node.judges.firstChild);
                        game.broadcast(function(player,card,viewAs){
                            card.fix();
        					card.style.transform='';
        					card.classList.remove('drawinghidden');
                            card.viewAs=viewAs;
                            player.node.judges.insertBefore(card,player.node.judges.firstChild);
                            if(card.clone&&card.clone.parentNode==player.parentNode){
    							card.clone.moveDelete(player);
    							game.addVideo('gain2',player,get.cardsInfo([card]));
    						}
                        },player,cards[0],viewAs);
						if(cards[0].clone&&cards[0].clone.parentNode==player.parentNode){
							cards[0].clone.moveDelete(player);
							game.addVideo('gain2',player,get.cardsInfo(cards));
						}
						// player.$gain2(cards);
						if(get.itemtype(card)!='card'){
							if(typeof card=='string') cards[0].viewAs=card;
							else cards[0].viewAs=card.name;
						}
						else{
							delete cards[0].viewAs;
						}
						if(cards[0].viewAs&&cards[0].viewAs!=cards[0].name){
							game.log(player,'被贴上了<span class="yellowtext">'+get.translation(cards[0].viewAs)+'</span>（',cards,'）');
						}
						else{
							game.log(player,'被贴上了',cards);
						}
						game.addVideo('addJudge',player,[get.cardInfo(cards[0]),cards[0].viewAs]);
					}
				},
				judge:function(){
					"step 0"
					var judgestr=get.translation(player)+'的'+event.judgestr+'判定';
					event.videoId=lib.status.videoId++;
					player.judging.unshift(get.cards()[0]);
					game.addVideo('judge1',player,[get.cardInfo(player.judging[0]),judgestr,event.videoId]);
                    game.broadcastAll(function(player,card,str,id,cardid){
                        var event;
                        if(game.online){
                            event={};
                        }
                        else{
                            event=_status.event;
                        }
                        if(lib.config.mode=='chess'){
    						event.node=card.copy('thrown','center',ui.arena).animate('start');
    					}
    					else{
    						event.node=player.$throwordered(card.copy(),true);
    					}
                        if(lib.cardOL) lib.cardOL[cardid]=event.node;
                        event.node.cardid=cardid;
    					event.node.classList.add('thrownhighlight');
    					ui.arena.classList.add('thrownhighlight');
    					event.dialog=ui.create.dialog(str);
    					event.dialog.classList.add('center');
                        event.dialog.videoId=id;
                    },player,player.judging[0],judgestr,event.videoId,get.id());

					game.log(player,'进行'+event.judgestr+'判定，亮出的判定牌为',player.judging[0]);
					game.delay(2);
					event.trigger('judge');
					"step 1"
					event.result={
						card:player.judging[0],
						number:get.number(player.judging[0]),
						suit:get.suit(player.judging[0]),
						color:get.color(player.judging[0]),
						judge:event.judge(player.judging[0]),
						node:event.node,
					};
					if(event.result.judge>0) event.result.bool=true;
					if(event.result.judge<0) event.result.bool=false;
					player.judging.shift();
					if(event.result.judge>0){
						player.popup('洗具');
					}
					else if(event.result.judge<0){
						player.popup('杯具');
					}
					if(event.clearArena!=false){
                        game.broadcastAll(ui.clear);
                    }
                    game.broadcast(function(id){
                        var dialog=get.idDialog(id);
                        if(dialog){
                            dialog.close();
                        }
                        ui.arena.classList.remove('thrownhighlight');
                    },event.videoId);
					event.dialog.close();
					game.addVideo('judge2',null,event.videoId);
					ui.arena.classList.remove('thrownhighlight');
					game.log(player,'的判定结果为',event.result.card);
					if(!get.owner(event.result.card)) event.position.appendChild(event.result.card);
				},
				turnOver:function(){
					game.log(player,'翻面');
					player.classList.toggle('turnedover');
                    game.broadcast(function(player){
                        player.classList.toggle('turnedover');
                    },player);
					game.addVideo('turnOver',player,player.classList.contains('turnedover'));
				},
				link:function(){
					if(player.isLinked()){
						game.log(player,'解除连环');
					}
					else{
						game.log(player,'被连环');
					}
					if(lib.config.background_audio){
						game.playAudio('effect','link');
					}
                    game.broadcast(function(){
                        if(lib.config.background_audio){
    						game.playAudio('effect','link');
    					}
                    });
                    player.classList.remove('target');
					player.classList.toggle('linked');
                    game.broadcast(function(player){
                        player.classList.remove('target');
    					player.classList.toggle('linked');
                    },player);
					game.addVideo('link',player,player.classList.contains('linked'));
				},
			},
			player:{
				init:function(character,character2,skill){
					if(!lib.character[character]) return;
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
					this.skills.length=0;
					this.classList.add('fullskin');
					if(!game.minskin&&lib.isNewLayout()&&!info[4].contains('minskin')){
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

					this.node.avatar.show();
					this.node.count.show();
					this.node.equips.show();
					this.name=character;
					this.sex=info[0];
					this.group=info[1];
					this.hp=info[2];
					this.maxHp=info[2];
					this.hujia=0;
					this.node.intro.innerHTML=lib.config.intro;
					switch(this.group){
						case 'wei':this.node.name.dataset.nature='watermm';break;
						case 'shu':this.node.name.dataset.nature='soilmm';break;
						case 'wu':this.node.name.dataset.nature='woodmm';break;
						case 'qun':this.node.name.dataset.nature='metalmm';break;
					}
					if(lib.config.touchscreen){
						lib.setLongPress(this,ui.click.intro);
					}
					else{
						if(lib.config.hover_all){
							lib.setHover(this,ui.click.hoverplayer);
						}
						if(lib.config.right_info){
							this.oncontextmenu=ui.click.rightplayer;
						}
					}
					// var name=get.translation(character);
					this.node.name.innerHTML=get.slimName(character);
					if(!lib.config.show_name){
						this.node.name.style.display='none';
					}
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
						var hp1=info[2],hp2=info2[2];
						switch(get.config('double_hp')){
							case 'pingjun':{
								this.maxHp=Math.floor((hp1+hp2)/2);
								this.singleHp=((hp1+hp2)%2===1);
								break;
							}
							case 'zuidazhi':this.maxHp=Math.max(hp1,hp2);break;
							case 'zuixiaozhi':this.maxHp=Math.min(hp1,hp2);break;
							case 'zonghe':this.maxHp=hp1+hp2;break;
							default:this.maxHp=hp1+hp2-3;
						}
						this.hp=this.maxHp;
						this.node.count.classList.add('p2');
						skills=skills.concat(info2[3]);

						// var name=get.translation(character2);
						this.node.name2.innerHTML=get.slimName(character2);
						if(!lib.config.show_name){
							this.node.name2.style.display='none';
						}
						// for(var i=0;i<name.length;i++){
						// 	this.node.name2.innerHTML+=name[i]+'<br/>';
						// }
					}
					if(skill!=false){
						for(var i=0;i<skills.length;i++){
							this.addSkill(skills[i]);
						}
					}
					lib.group.add(this.group);
					if(this.inits){
						for(var i=0;i<lib.element.player.inits.length;i++){
							lib.element.player.inits[i](this);
						}
					}
					this.update();
					return this;
				},
                initOL:function(name,character){
                    this.node.avatar.setBackground(character,'character');
                    this.node.avatar.show();
                    this.node.name.innerHTML=get.verticalStr(name);
                    this.nickname=name;
                    this.avatar=character;
                },
                uninitOL:function(){
                    this.node.avatar.hide();
                    this.node.name.innerHTML='';
                    delete this.nickname;
                    delete this.avatar;
                },
				uninit:function(){
					this.node.avatar.hide();
					this.node.count.hide();
					if(this.node.wuxing){
						this.node.wuxing.hide();
					}
					delete this.name;
					delete this.sex;
					delete this.group;
					delete this.hp;
					delete this.maxHp;
					delete this.hujia;
					this.skills.length=0;
					this.node.identity.style.backgroundColor='';
					this.node.intro.innerHTML='';
					this.node.name.innerHTML='';
					this.node.hp.innerHTML='';
					this.node.count.innerHTML='0';
					if(this.name2){
						this.node.avatar2.hide();
						delete this.name2;
						this.node.count.classList.remove('p2');
					}
					for(var mark in this.marks){
						this.marks[mark].remove();
					}

					this.skipList=[];
					this.skills=[];
					this.initedSkills=[];
					this.additionalSkills={};
					this.disabledSkills={};
					this.hiddenSkills=[];
					this.forbiddenSkills=[];
					this.modeSkills=[];
					this.stat=[{card:{},skill:{}}];
					this.tempSkills={};
					this.storage={};
					this.marks={};
					this.ai={friend:[],enemy:[],neutral:[]};

					return this;
				},
                send:function(){
                    if(!this.ws||this.ws.closed) return this;
                    this.ws.send.apply(this.ws,arguments);
                    return this;
                },
                chat:function(str){
                    lib.element.player.say.call(this,str);
                    game.broadcast(function(id,str){
                        if(lib.playerOL[id]){
                            lib.playerOL[id].say(str);
                        }
                        else if(game.connectPlayers){
                            for(var i=0;i<game.connectPlayers.length;i++){
                                if(game.connectPlayers[i].playerid==id){
                                    lib.element.player.say.call(game.connectPlayers[i],str);
                                    return;
                                }
                            }
                        }
                    },this.playerid,str);
                },
                say:function(str){
                    var dialog=ui.create.dialog('hidden');
                    dialog.classList.add('static');
                    dialog.add('<div class="text" style="word-break:break-all;display:inline">'+str+'</div>');
                    dialog.classList.add('popped');
                    ui.window.appendChild(dialog);
                    var width=dialog.content.firstChild.firstChild.offsetWidth;
                    if(width<190){
                        dialog._mod_height=-16;
                    }
                    else{
                        dialog.content.firstChild.style.textAlign='left';
                    }
                    dialog.style.width=(width+16)+'px';
                    var refnode;
                    if(this.node&&this.node.avatar&&this.parentNode==ui.arena){
                        refnode=this.node.avatar;
                    }
                    if(refnode){
                        lib.placePoppedDialog(dialog,{
                            clientX:ui.arena.offsetLeft+this.offsetLeft+refnode.offsetLeft+refnode.offsetWidth/2,
                            clientY:ui.arena.offsetTop+this.offsetTop+refnode.offsetTop+refnode.offsetHeight/4
                        });
                    }
                    else{
                        lib.placePoppedDialog(dialog,{
                            clientX:this.offsetLeft+this.offsetWidth/2,
                            clientY:this.offsetTop+this.offsetHeight/4
                        });
                    }
                    if(dialog._mod_height){
                        dialog.content.firstChild.style.padding=0;
                    }
                    setTimeout(function(){
                        dialog.delete();
                    },2000);
                    var info=[get.translation(this.name)||this.nickname,str];
                    lib.chatHistory.push(info);
                    if(_status.addChatEntry){
                        if(_status.addChatEntry._origin.parentNode){
                            _status.addChatEntry(info,false);
                        }
                        else{
                            delete _status.addChatEntry;
                        }
                    }
                },
                getState:function(){
                    return {
                        hp:this.hp,
                        maxHp:this.maxHp,
                        nickname:this.nickname,
                        name:this.name,
                        name2:this.name2,
                        handcards:this.get('h'),
                        equips:this.get('e'),
                        judges:this.get('j'),
                        position:parseInt(this.dataset.position),
                        hujia:this.hujia,
                        identityShown:this.identityShown,
                        identityNode:[this.node.identity.innerHTML,this.node.identity.dataset.color],
                        identity:this.identity,
                        dead:this.isDead(),
                        linked:this.isLinked(),
                        turnedover:this.isTurnedOver(),
                    }
                },
                setNickname:function(str){
                    this.node.nameol.innerHTML=str||this.nickname||'';
                    return this;
                },
				update:function(){
					if(_status.video&&arguments.length==0) return;
					if(this.hp>=this.maxHp) this.hp=this.maxHp;
					var hp=this.node.hp;
					hp.style.transition='none';
                    game.broadcast(function(player,hp,maxHp,hujia){
                        player.hp=hp;
                        player.maxHp=maxHp;
                        player.hujia=hujia;
                        player.update();
                    },this,this.hp,this.maxHp,this.hujia);
					if(!_status.video){
						if(this.hujia){
							this.markSkill('ghujia');
						}
						else{
							this.unmarkSkill('ghujia');
						}
					}
					if(this.maxHp==Infinity){
						hp.innerHTML='∞';
					}
					else if(lib.config.layout=='default'&&this.maxHp>14){
						hp.innerHTML=this.hp+'/'+this.maxHp;
						hp.classList.add('text');
					}
					else if(lib.isNewLayout()&&
					(
						this.maxHp>9||
						(this.maxHp>5&&this.classList.contains('minskin'))||
						((lib.config.layout=='mobile'||lib.config.layout=='phone')&&this.dataset.position==0&&this.maxHp>7)
					)){
						hp.innerHTML=this.hp+'<br>/<br>'+this.maxHp;
						hp.classList.add('text');
						hp.classList.remove('long');
					}
					else{
						hp.innerHTML='';
						hp.classList.remove('text');
						while(this.maxHp>hp.childNodes.length){
							ui.create.div(hp);
						}
						while(this.maxHp<hp.childNodes.length){
							hp.removeChild(hp.lastChild);
						}
						for(var i=0;i<this.maxHp;i++){
							if(i<this.hp){
								hp.childNodes[i].classList.remove('lost');
							}
							else{
								hp.childNodes[i].classList.add('lost');
							}
						}
						if(this.maxHp==9){
							hp.classList.add('long');
						}
						else{
							hp.classList.remove('long');
						}
					}
					if(this.hp==0){
						hp.dataset.condition='';
					}
					else if(this.hp>Math.round(this.maxHp/2)||this.hp===this.maxHp){
						hp.dataset.condition='high';
					}
					else if(this.hp>Math.floor(this.maxHp/3)){
						hp.dataset.condition='mid';
					}
					else{
						hp.dataset.condition='low';
					}

					setTimeout(function(){
						hp.style.transition='';
					});
					var numh=this.num('h');
					if(_status.video){
						numh=arguments[0];
					}
					if(numh>=10){
						numh=numh.toString();
						this.node.count.dataset.condition='low';
						this.node.count.innerHTML=numh[0]+'<br>'+numh[1];
					}
					else{
						if(numh>5){
							this.node.count.dataset.condition='higher';
						}
						else if(numh>2){
							this.node.count.dataset.condition='high';
						}
						else if(numh>0){
							this.node.count.dataset.condition='mid';
						}
						else{
							this.node.count.dataset.condition='none';
						}
						this.node.count.innerHTML=numh;
					}
					if(this.updates){
						for(var i=0;i<lib.element.player.updates.length;i++){
							lib.element.player.updates[i](this);
						}
					}
					if(!_status.video){
						game.addVideo('update',this,[this.num('h'),this.hp,this.maxHp,this.hujia]);
					}
					if(this.node.jiu&&!this.skills.contains('jiu')){
						this.node.jiu.delete();
						this.node.jiu2.delete();
						delete this.node.jiu;
						delete this.node.jiu2;
					}
					this.updateMarks();
					return this;
				},
				updateMarks:function(){
					for(var i in this.marks){
						if(i=='ghujia'||(!this.marks[i].querySelector('.image')&&lib.skill[i]&&
							lib.skill[i].intro&&!lib.skill[i].intro.nocount&&this.storage[i])){
							this.marks[i].classList.add('overflowmark')
							var num;
							if(i=='ghujia'){
								num=this.hujia;
							}
							else if(typeof this.storage[i]=='number'){
								num=this.storage[i];
							}
							else if(Array.isArray(this.storage[i])){
								num=this.storage[i].length;
							}
							if(num){
								if(!this.marks[i].markcount){
									this.marks[i].markcount=ui.create.div('.markcount.menubutton',this.marks[i]);
								}
								this.marks[i].markcount.innerHTML=num;
							}
							else if(this.marks[i].markcount){
								this.marks[i].markcount.delete();
								delete this.marks[i].markcount;
							}
						}
						else if(this.marks[i].markcount){
							this.marks[i].markcount.delete();
							delete this.marks[i].markcount;
						}
					}
				},
				num:function(arg1,arg2,arg3){
					if(get.itemtype(arg1)=='position'){
						return this.get(arg1,arg2,arg3).length;
					}
					else if(arg1=='s'){
						if(typeof arg2=='boolean'){
							return game.expandSkills(this.get('s',arg2).concat(lib.skill.global)).contains(arg3);
						}
						else{
							return game.expandSkills(this.get('s').concat(lib.skill.global)).contains(arg2);
						}
					}
				},
				line:function(target,config){
					if(get.itemtype(target)=='players'){
						for(var i=0;i<target.length;i++){
							this.line(target[i],config);
						}
					}
					else if(get.itemtype(target)=='player'){
						if(target==this) return;
                        game.broadcast(function(player,target,config){
                            player.line(target,config);
                        },this,target,config);
						game.addVideo('line',this,[target.dataset.position,config]);
						game.linexy([
							this.offsetLeft+this.offsetWidth/2,
							this.offsetTop+this.offsetHeight/2,
							target.offsetLeft+target.offsetWidth/2,
							target.offsetTop+target.offsetHeight/2
						],config,true);
					}
				},
				line2:function(targets,config){
					this.line(targets[0],config);
					targets=targets.slice(0);
					for(var i=1;i<targets.length;i++){
						(function(j){
							setTimeout(function(){
								targets[j-1].line(targets[j],config);
							},lib.config.duration*i);
						}(i));
					}
				},
				get:function(arg1,arg2,arg3,arg4){
					var i,j;
					if(arg1=='s'){
						this.checkConflict();
						var skills=this.skills.slice(0);
						for(var i in this.additionalSkills){
							if(Array.isArray(this.additionalSkills[i])){
								for(j=0;j<this.additionalSkills[i].length;j++){
									if(this.additionalSkills[i][j]){
										skills.add(this.additionalSkills[i][j]);
									}
								}
							}
							else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
								skills.add(this.additionalSkills[i]);
							}
						}
						if(arg2) skills=skills.concat(this.hiddenSkills);
						if(arg3!==false){
							for(i=0;i<this.node.equips.childNodes.length;i++){
								if(this.node.equips.childNodes[i].classList.contains('removing')) continue;
								if(get.info(this.node.equips.childNodes[i]).skills){
									skills=skills.concat(get.info(this.node.equips.childNodes[i]).skills);
								}
							}
						}
						for(i=0;i<this.forbiddenSkills.length;i++){
							skills.remove(this.forbiddenSkills[i]);
						}
						if(arg4!==false){
							skills=game.filterSkills(skills,this);
						}
						return skills;
					}
					else if(get.itemtype(arg1)=='position'){
						var cards=[],cards1=[];
						for(i=0;i<arg1.length;i++){
							if(arg1[i]=='h'){
								for(j=0;j<this.node.handcards1.childNodes.length;j++){
									cards.push(this.node.handcards1.childNodes[j]);
								}
								for(j=0;j<this.node.handcards2.childNodes.length;j++){
									cards.push(this.node.handcards2.childNodes[j]);
								}
							}
							else if(arg1[i]=='e'){
								for(j=0;j<this.node.equips.childNodes.length;j++){
									cards.push(this.node.equips.childNodes[j]);
								}
								if(arguments.length==2&&typeof arg2=='string'&&/1|2|3|4|5/.test(arg2)){
									for(j=0;j<cards.length;j++){
										if(get.subtype(cards[j])=='equip'+arg2) return cards[j];
									}
									return;
								}
							}
							else if(arg1[i]=='j'){
								for(j=0;j<this.node.judges.childNodes.length;j++){
									cards.push(this.node.judges.childNodes[j]);
									if(this.node.judges.childNodes[j].viewAs){
										this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
										this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
										cards1.push(this.node.judges.childNodes[j]);
									}
								}
							}
						}
						for(i=0;i<cards.length;i++){
							if(cards[i].classList.contains('removing')){
								cards.splice(i,1);i--;
							}
						}
						if(arg2!=undefined){
							if(typeof arg3=='function'){
								var cards2=cards.slice(0);
								cards.sort(function(a,b){
									return arg3(b,cards2)-arg3(a,cards2);
								});
							}
							if(typeof arg2=='string'){
								for(i=0;i<cards.length;i++){
									if(cards[i].name!=arg2){
										cards.splice(i,1);i--;
									}
								}
							}
							else if(typeof arg2=='object'){
								for(i=0;i<cards.length;i++){
									for(j in arg2){
										if(j=='type'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.type(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.type(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='subtype'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.subtype(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.subtype(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='color'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.color(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.color(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='suit'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.suit(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.suit(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='number'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.number(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.number(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(typeof arg2[j]=='object'){
											if(arg2[j].contains(cards[i][j])==false){
												cards.splice(i,1);i--;break;
											}
										}
										else if(typeof arg2[j]=='string'){
											if(cards[i][j]!=arg2[j]){
												cards.splice(i,1);i--;break;
											}
										}
									}
								}
							}
							else if(typeof arg2=='number'&&arg2>0){
								cards.splice(arg2);
							}
							else if(typeof arg2=='function'){
								for(i=0;i<cards.length;i++){
									if(!arg2(cards[i])){
										cards.splice(i,1);i--;
									}
								}
							}
						}
						for(i=0;i<cards1.length;i++){
							if(cards1[i].tempJudge){
								cards1[i].name=cards1[i].tempJudge;
								delete cards1[i].tempJudge;
							}
						}
						if(arg2===0) return cards[0];
						if(typeof arg3=='number'){
							if(arg3==0) return cards[0];
							cards.splice(arg3);
						}
						if(typeof arg4=='number'){
							if(arg4==0) return cards[0];
							cards.splice(arg4);
						}
						return cards;
					}
				},
				syncStorage:function(skill){
					switch(get.itemtype(this.storage[skill])){
						case 'cards':game.addVideo('storage',this,[skill,get.cardsInfo(this.storage[skill]),'cards']);break;
						case 'card':game.addVideo('storage',this,[skill,get.cardInfo(this.storage[skill]),'card']);break;
						default:
                        try{
                            game.addVideo('storage',this,[skill,JSON.parse(JSON.stringify(this.storage[skill]))]);
                        }
                        catch(e){
                            console.log(this.storage[skill]);
                        }
					}
				},
				playerfocus:function(time){
					time=time||1000;
					this.classList.add('playerfocus');
					ui.arena.classList.add('playerfocus');
					var that=this;
					setTimeout(function(){
						that.classList.remove('playerfocus');
						ui.arena.classList.remove('playerfocus');
					},time);
					game.addVideo('playerfocus',this,time);
                    game.broadcast(function(player,time){
                        player.playerfocus(time);
                    },this,time);
					return this;
				},
				changeHujia:function(num){
					if(typeof num!='number'){
						num=1;
					}
					this.hujia+=num;
					if(num>0){
						game.log(this,'获得了'+get.cnNumber(num)+'点护甲值');
					}
					if(this.hujia<0){
						this.hujia=0;
					}
					this.update();
				},
				setIdentity:function(identity){
					if(!identity) identity=this.identity;
					this.node.identity.firstChild.innerHTML=get.translation(identity);
					this.node.identity.dataset.color=identity;
				},
				phase:function(){
					var next=game.createEvent('phase');
					next.player=this;
					next.content=lib.element.playerproto.phase;
				},
				phaseJudge:function(){
					var next=game.createEvent('phaseJudge');
					next.player=this;
					next.content=lib.element.playerproto.phaseJudge;
				},
				phaseDraw:function(){
					var next=game.createEvent('phaseDraw');
					next.player=this;
					next.num=2;
					next.content=lib.element.playerproto.phaseDraw;
				},
				phaseUse:function(){
					var next=game.createEvent('phaseUse');
					next.player=this;
					next.content=lib.element.playerproto.phaseUse;
				},
				phaseDiscard:function(){
					var next=game.createEvent('phaseDiscard');
					next.player=this;
					next.content=lib.element.playerproto.phaseDiscard;
				},
				chooseToUse:function(use){
					var next=game.createEvent('chooseToUse');
					next.player=this;
					if(arguments.length==1&&get.objtype(arguments[0])=='object'){
						for(var i in use){
							next[i]=use[i];
						}
					}
					else{
						for(var i=0;i<arguments.length;i++){
							if(typeof arguments[i]=='number'||get.itemtype(arguments[i])=='select'){
								next.selectTarget=arguments[i];
							}
							else if(typeof arguments[i]=='object'||typeof arguments[i]=='function'){
								if(get.itemtype(arguments[i])=='player'||next.filterCard){
									next.filterTarget=arguments[i];
								}
								else next.filterCard=arguments[i];
							}
							else if(typeof arguments[i]=='boolean'){
								next.forced=arguments[i];
							}
							else if(typeof arguments[i]=='string'){
								next.prompt=arguments[i];
							}
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined){
						next.filterCard=lib.filter.filterCard;
					}
					if(next.selectCard==undefined){
						next.selectCard=lib.filter.selectCard;
					}
					if(next.filterTarget==undefined){
						next.filterTarget=lib.filter.filterTarget;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=lib.filter.selectTarget;
					}
					if(next.ai1==undefined) next.ai1=ai.get.order;
					if(next.ai2==undefined) next.ai2=ai.get.effect;
					next.content=lib.element.playerproto.chooseToUse;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseToRespond:function(){
					var next=game.createEvent('chooseToRespond');
					next.player=this;
					var filter;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
							filter=arguments[i];
						}
						else if(arguments[i]=='nosource'){
							next.nosource=true;
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.source==undefined&&!next.nosource) next.source=_status.event.player;
					if(next.ai==undefined) next.ai=ai.get.unuseful2;
					if(next.prompt!=false){
						if(typeof next.prompt=='string'){
							next.dialog=next.prompt;
						}
						else{
							var str='请打出'+get.cnNumber(next.selectCard[0])+'张'
							if(filter){
								if(filter.name){
									str+=get.translation(filter.name);
								}
								else{
									str+='牌';
								}
							}
							else{
								str+='牌';
							}
							next.dialog=str;
						}
					}
					next.content=lib.element.playerproto.chooseToRespond;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseToDiscard:function(){
					var next=game.createEvent('chooseToDiscard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=ai.get.unuseful;
					next.autochoose=function(){
						if(!this.forced) return false;
						return get.select(this.selectCard)[0]>=this.player.num(this.position||'h');
					}
					next.content=lib.element.playerproto.chooseToDiscard;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseToCompare:function(target,check){
					var next=game.createEvent('chooseToCompare');
					next.player=this;
					next.target=target;
					if(check) next.ai=check;
					else next.ai=function(card){
						var player=get.owner(card);
						var event=_status.event.getParent();
						var to=(player==event.player?event.target:event.player);
						var addi=(ai.get.value(card)>=8&&get.type(card)!='equip')?-10:0;
						if(player==event.player){
							if(ai.get.attitude(player,to)>0&&event.small){
								return -get.number(card)-ai.get.value(card)/2+addi;
							}
							return get.number(card)-ai.get.value(card)/2+addi;
						}
						else{
							if(ai.get.attitude(player,to)>0&&!event.small){
								return -get.number(card)-ai.get.value(card)/2+addi;
							}
							return get.number(card)-ai.get.value(card)/2+addi;
						}
					}
					next.content=lib.element.playerproto.chooseToCompare;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseCardButton:function(){
					var cards,prompt,forced,select;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards') cards=arguments[i];
						else if(typeof arguments[i]=='boolean') forced=arguments[i];
						else if(typeof arguments[i]=='string') prompt=arguments[i];
						else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
					}
					if(prompt==undefined) prompt='请选择卡牌';
					return this.chooseButton([prompt,cards,'hidden'],forced,select,'hidden');
				},
				chooseButton:function(){
					var next=game.createEvent('chooseButton');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.closeDialog=true;
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
                        else if(Array.isArray(arguments[i])){
                            next.createDialog=arguments[i];
                        }
					}
					next.player=this;
                    if(typeof next.forced!='boolean') next.forced=false;
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterButton==undefined) next.filterButton=lib.filter.filterButton;
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(){return 1};
					next.content=lib.element.playerproto.chooseButton;
                    next._args=Array.from(arguments);
					return next;
				},
                chooseButtonOL:function(list,callback,ai){
                    var next=game.createEvent('chooseButtonOL');
                    next.list=list;
                    next.content=lib.element.playerproto.chooseButtonOL;
                    next.ai=ai;
                    next.callback=callback;
                    next._args=Array.from(arguments);
                    return next;
                },
				chooseCard:function(){
					var next=game.createEvent('chooseCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=ai.get.unuseful2;
					next.content=lib.element.playerproto.chooseCard;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseTarget:function(){
					var next=game.createEvent('chooseTarget');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectTarget=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectTarget=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterTarget) next.ai=arguments[i];
							else next.filterTarget=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterTarget==undefined) next.filterTarget=lib.filter.all;
					if(next.selectTarget==undefined) next.selectTarget=[1,1];
					if(next.ai==undefined) next.ai=ai.get.attitude2;
					next.content=lib.element.playerproto.chooseTarget;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseCardTarget:function(choose){
					var next=game.createEvent('chooseCardTarget');
					next.player=this;
					if(arguments.length==1){
						for(var i in choose){
							next[i]=choose[i];
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined||next.filterCard===true){
						next.filterCard=lib.filter.all;
					}
					if(next.selectCard==undefined){
						next.selectCard=1;
					}
					if(next.filterTarget==undefined||next.filterTarget===true){
						next.filterTarget=lib.filter.all;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=1;
					}
					if(next.ai1==undefined) next.ai1=ai.get.unuseful2;
					if(next.ai2==undefined) next.ai2=ai.get.attitude2;
					next.content=lib.element.playerproto.chooseCardTarget;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseControl:function(){
					var next=game.createEvent('chooseControl');
					next.controls=[];
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string'){
							next.controls.push(arguments[i]);
						}
						else if(get.objtype(arguments[i])=='array'){
							next.controls=next.controls.concat(arguments[i]);
						}
						else if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.choice=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
						}
					}
					next.player=this;
					if(next.choice==undefined) next.choice=0;
					next.content=lib.element.playerproto.chooseControl;
                    next._args=Array.from(arguments);
					return next;
				},
				chooseBool:function(){
					var next=game.createEvent('chooseBool');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.choice=arguments[i];
						}
						else  if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
						}
						if(next.choice==undefined) next.choice=true;
					}
					next.player=this;
					next.content=lib.element.playerproto.chooseBool;
                    next._args=Array.from(arguments);
					return next;
				},
				choosePlayerCard:function(){
					var next=game.createEvent('choosePlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='hej';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.choosePlayerCard;
                    next._args=Array.from(arguments);
					return next;
				},
				discardPlayerCard:function(){
					var next=game.createEvent('discardPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='hej';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.discardPlayerCard;
                    next._args=Array.from(arguments);
					return next;
				},
				gainPlayerCard:function(){
					var next=game.createEvent('gainPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='h';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.gainPlayerCard;
                    next._args=Array.from(arguments);
					return next;
				},
				showHandcards:function(){
					var next=game.createEvent('showHandcards');
					next.player=this;
					next.content=lib.element.playerproto.showHandcards;
                    next._args=Array.from(arguments);
                    return next;
				},
				showCards:function(cards,str){
					var next=game.createEvent('showCards');
					next.player=this;
					next.str=str;
					if(get.itemtype(cards)=='card') next.cards=[cards];
					else if(get.itemtype(cards)=='cards') next.cards=cards;
					else _status.event.next.remove(next);
					next.content=lib.element.playerproto.showCards;
                    next._args=Array.from(arguments);
				},
				viewHandcards:function(target){
					var next=game.createEvent('viewHandcards');
					next.player=this;
					next.target=target;
					next.content=lib.element.playerproto.viewHandcards;
                    next._args=Array.from(arguments);
                    return next;
				},
                useResult:function(result,event){
                    event=event||_status.event;
                    if(result._sendskill){
                        lib.skill[result._sendskill[0]]=result._sendskill[1];
                    }
                    if(event.onresult){
                        event.onresult(result);
                    }
                    if(result.skill){
                        var info=get.info(result.skill);
                        if(info.onuse){
                            info.onuse(result,this);
                        }
                        if(info.direct){
                            _status.noclearcountdown=true;
                        }
                    }
                    if(event.logSkill){
                        if(typeof event.logSkill=='string'){
                            this.logSkill(event.logSkill);
                        }
                        else if(Array.isArray(event.logSkill)){
                            this.logSkill.apply(this,event.logSkill);
                        }
                    }
                    if(result.card||!result.skill){
                        this.useCard(result.card,result.cards,result.targets,result.skill);
                    }
                    else if(result.skill){
                        this.useSkill(result.skill,result.cards,result.targets);
                    }
                },
				useCard:function(){
					var next=game.createEvent('useCard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.targets=[arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else next.cards=[];
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					if(!next.targets){
						next.targets=[];
					}
					for(var i=0;i<next.targets.length;i++){
						if(ai.get.attitude(this,next.targets[i])>=-1&&ai.get.attitude(this,next.targets[i])<0){
							if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
							this.ai.tempIgnore.add(next.targets[i]);
						}
					}
					if(typeof this.logAi=='function'){
						this.logAi(next.targets,next.card);
					}
					next.content=lib.element.playerproto.useCard;
					return next;
				},
				useSkill:function(){
					var next=game.createEvent('useSkill');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						next.cards=[];
					}
					if(next.targets){
						for(var i=0;i<next.targets.length;i++){
							if(ai.get.attitude(this,next.targets[i])>=-1&&ai.get.attitude(this,next.targets[i])<0){
								if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
								this.ai.tempIgnore.add(next.targets[i]);
							}
						}
						if(typeof this.logAi=='function'){
							this.logAi(next.targets,next.skill);
						}
					}
					else{
						next.targets=[];
					}
					next.content=lib.element.playerproto.useSkill;
				},
				draw:function(){
					var next=game.createEvent('draw');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].drawDeck!=undefined){
							next.drawDeck=arguments[i].drawDeck;
						}
					}
					if(next.num==undefined) next.num=1;
					if(next.num<=0) _status.event.next.remove(next);
					next.content=lib.element.playerproto.draw;
					if(lib.config.mode=='stone'&&_status.mode=='deck'&&
					next.drawDeck==undefined&&!next.player.isMin()&&next.num>1){
						next.drawDeck=1;
					}
					return next;
				},
				discard:function(){
					var next=game.createEvent('discard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					next.content=lib.element.playerproto.discard;
					return next;
				},
				respond:function(){
					var next=game.createEvent('respond');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='boolean') next.animate=arguments[i];
						else if(arguments[i]=='highlight') next.highlight=true;
						else if(typeof arguments[i]=='string') next.skill=arguments[i];
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else{
							next.cards=[];
						}
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					next.content=lib.element.playerproto.respond;
				},
				directgain:function(cards){
					var hs=this.get('h');
					for(var i=0;i<cards.length;i++){
						if(hs.contains(cards[i])){
							cards.splice(i--,1);
						}
					}
					for(var i=0;i<cards.length;i++){
						cards[i].fix();
						var sort=lib.config.sort_card(cards[i]);
						if(this==game.me){
							cards[i].classList.add('drawinghidden');
						}
						if(lib.isSingleHandcard()||sort>0){
							this.node.handcards1.insertBefore(cards[i],this.node.handcards1.firstChild);
						}
						else{
							this.node.handcards2.insertBefore(cards[i],this.node.handcards2.firstChild);
						}
					}
					if(this==game.me||_status.video) ui.updatehl();
					if(!_status.video){
						game.addVideo('directgain',this,get.cardsInfo(cards));
						this.update();
					}
                    game.broadcast(function(player,cards){
                        player.directgain(cards);
                    },this,cards);
					return this;
				},
				gain:function(){
					var next=game.createEvent('gain');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='string'){
							next.animate=arguments[i];
						}
					}
					next.content=lib.element.playerproto.gain;
					return next;
				},
				lose:function(){
					var next=game.createEvent('lose');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					if(next.position==undefined) next.position=ui.discardPile;
					next.content=lib.element.playerproto.lose;
					return next;
				},
				damage:function(){
					var next=game.createEvent('damage');
					next.player=this;
					var nocard,nosource;
					var event=_status.event;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(arguments[i]=='nocard'){
							nocard=true;
						}
						else if(arguments[i]=='nosource'){
							nosource=true;
						}
						else if(get.itemtype(arguments[i])=='nature'){
							next.nature=arguments[i];
						}
					}
					if(next.card==undefined&&!nocard) next.card=event.card;
					if(next.cards==undefined&&!nocard) next.cards=event.cards;
					if(next.source==undefined&&!nosource) next.source=event.player;
					if(next.num==undefined) next.num=1;
					if(next.nature=='poison') delete next._triggered;
					next.content=lib.element.playerproto.damage;
					return next;
				},
				recover:function(){
					var next=game.createEvent('recover');
					next.player=this;
					var nocard,nosource;
					var event=_status.event;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(arguments[i]=='nocard'){
							nocard=true;
						}
						else if(arguments[i]=='nosource'){
							nosource=true;
						}
					}
					if(next.card==undefined&&!nocard) next.card=event.card;
					if(next.cards==undefined&&!nocard) next.cards=event.cards;
					if(next.source==undefined&&!nosource) next.source=event.player;
					if(next.num==undefined) next.num=1;
					if(next.num<=0) _status.event.next.remove(next);
					next.content=lib.element.playerproto.recover;
					return next;
				},
				doubleDraw:function(){
					var next=game.createEvent('doubleDraw');
					next.player=this;
					next.content=lib.element.playerproto.doubleDraw;
					return next;
				},
				loseHp:function(num){
					var next=game.createEvent('loseHp');
					next.num=num;
					next.player=this;
					if(next.num==undefined) next.num=1;
					next.content=lib.element.playerproto.loseHp;
				},
				loseMaxHp:function(){
					var next=game.createEvent('loseMaxHp');
					next.player=this;
					next.num=1;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]==='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]==='boolean'){
							next.forced=arguments[i];
						}
					}
					next.content=lib.element.playerproto.loseMaxHp;
				},
				gainMaxHp:function(){
					var next=game.createEvent('gainMaxHp');
					next.player=this;
					next.num=1;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]==='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]==='boolean'){
							next.forced=arguments[i];
						}
					}
					next.content=lib.element.playerproto.gainMaxHp;
				},
				changeHp:function(num,popup){
					var next=game.createEvent('changeHp',false);
					next.num=num;
					if(popup!=undefined) next.popup=popup;
					next.player=this;
					next.content=lib.element.playerproto.changeHp;
				},
				dying:function(reason){
					var next=game.createEvent('dying',false);
					next.player=this;
					next.reason=reason;
					next.source=reason.source;
					next.content=lib.element.playerproto.dying;
				},
				die:function(reason){
					var next=game.createEvent('die');
					next.player=this;
					next.reason=reason;
					if(reason) next.source=reason.source;
					next.content=lib.element.playerproto.die;
					return next;
				},
				revive:function(hp){
					game.log(this,'复活');
					if(this.maxHp<1) this.maxHp=1;
					if(hp) this.hp=hp;
					else{
						this.hp=1;
					}
					game.addVideo('revive',this);
					this.classList.remove('dead');
					this.removeAttribute('style');
					this.node.avatar.style.transform='';
					this.node.avatar2.style.transform='';
					this.node.hp.show();
					this.node.equips.show();
					this.node.count.show();
					this.update();
					var player;
					player=this.previousSeat;
					while(player.isDead()) player=player.previousSeat;
					player.next=this;
					this.previous=player;
					player=this.nextSeat;
					while(player.isDead()) player=player.nextSeat;
					player.previous=this;
					this.next=player;
					game.players.add(this);
					game.dead.remove(this);
					if(this==game.me){
						if(ui.auto) ui.auto.show();
						if(ui.wuxie) ui.wuxie.show();
						if(ui.revive){
							ui.revive.close();
							delete ui.revive;
						}
						if(ui.swap){
							ui.swap.close();
							delete ui.swap;
						}
						if(ui.restart){
							ui.restart.close();
							delete ui.restart;
						}
					}
				},
				isMad:function(){
					return this.skills.contains('mad');
				},
				goMad:function(){
					this.addSkill('mad');
					game.log(this,'进入混乱状态');
				},
				unMad:function(){
					this.removeSkill('mad');
					game.log(this,'解除混乱状态');
				},
				equip:function(card){
					var next=game.createEvent('equip');
					next.card=card;
					next.player=this;
					next.content=lib.element.playerproto.equip;
				},
				addJudge:function(card,cards){
					var next=game.createEvent('addJudge');
					next.card=card;
					next.cards=cards;
					if(next.cards==undefined) next.cards=[card];
					if(get.itemtype(next.cards)=='card') next.cards=[next.cards];
					next.player=this;
					next.content=lib.element.playerproto.addJudge;
				},
				judge:function(){
					var next=game.createEvent('judge');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							next.judge=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.clearArena=arguments[i];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
					}
					if(next.card&&next.judge==undefined){
						next.judge=get.judge(next.card);
					}
					if(next.judge==undefined) next.judge=function(){return 0};
					if(next.position==undefined) next.position=ui.discardPile;

					var str='';
					if(next.card) str=get.translation(next.card.viewAs||next.card.name);
					else if(next.skill) str=get.translation(next.skill);
					else str=get.translation(_status.event.name);
					next.judgestr=str;
					next.content=lib.element.playerproto.judge;
				},
				turnOver:function(){
					var next=game.createEvent('turnOver');
					next.player=this;
					next.content=lib.element.playerproto.turnOver;
				},
				out:function(bool){
					if(this.lockOut) return;
					if(this.isOut()){
						game.log(this,'进入游戏');
					}
					else{
						game.log(this,'离开游戏');
					}
					this.classList.toggle('out');
					if(bool) this.lockOut=bool;
				},
				link:function(){
					var next=game.createEvent('link');
					next.player=this;
					next.content=lib.element.playerproto.link;
				},
				skip:function(name){
					this.skipList.add(name);
				},
                wait:function(callback){
                    if(lib.node){
                        if(typeof callback=='function'){
                            callback._noname_waiting=true;
                            lib.node.torespond[this.playerid]=callback;
                        }
                        else{
                            lib.node.torespond[this.playerid]='_noname_waiting';
                        }
                        clearTimeout(lib.node.torespondtimeout[this.playerid]);
                        if(this.ws&&!this.ws.closed){
                            var player=this;
                            var time=parseInt(lib.configOL.choose_timeout)*1000;
                            if(!_status.event._global_waiting){
                                player.showTimer(time);
                            }
                            lib.node.torespondtimeout[this.playerid]=setTimeout(function(){
                                player.unwait('ai');
                                player.ws.ws.close();
                            },time+5000);
                        }
                    }
                },
                unwait:function(result){
                    if(!_status.event._global_waiting){
                        this.hideTimer();
                    }
                    clearTimeout(lib.node.torespondtimeout[this.playerid]);
                    delete lib.node.torespondtimeout[this.playerid];
                    if(!lib.node.torespond.hasOwnProperty(this.playerid)){
                        return;
                    }
                    var noresume=false;
                    var proceed=null;
                    if(typeof lib.node.torespond[this.playerid]=='function'&&lib.node.torespond[this.playerid]._noname_waiting){
                        proceed=lib.node.torespond[this.playerid](result,this);
                        if(proceed===false){
                            noresume=true;
                        }
                    }
                    lib.node.torespond[this.playerid]=result;
                    for(var i in lib.node.torespond){
                        if(lib.node.torespond[i]=='_noname_waiting'){
                            return;
                        }
                        else if(lib.node.torespond[i]&&lib.node.torespond[i]._noname_waiting){
                            return;
                        }
                    }
                    _status.event.result=result;
                    _status.event.resultOL=lib.node.torespond;
                    lib.node.torespond={};
                    if(typeof proceed=='function') proceed();
                    else if(_status.paused&&!noresume) game.resume();
                },
				logSkill:function(name,targets,nature){
					if(get.itemtype(targets)=='player') targets=[targets];
					var nopop=false;
					if(Array.isArray(name)){
						this.popup(name[1]);
						name=name[0];
						nopop=true;
					}
					if(lib.translate[name]){
						if(lib.config.skill_animation&&lib.skill[name]&&lib.skill[name].skillAnimation){
							this.$skill(lib.skill[name].animationStr||lib.translate[name],lib.skill[name].skillAnimation,lib.skill[name].animationColor);
						}
						else if(!nopop) this.popup(name);
						if(typeof targets=='object'&&targets.length){
							game.log(this,'对',targets,'发动了','【'+get.translation(name)+'】');
						}
						else{
							game.log(this,'发动了','【'+get.translation(name)+'】');
						}
					}
					if(nature!=false){
						if(nature===undefined){
							nature='green';
						}
						this.line(targets,nature);
					}
					if(lib.skill[name]&&lib.skill[name].ai&&lib.skill[name].ai.expose!=undefined&&this.logAi){
						this.logAi(lib.skill[name].ai.expose);
					}
					if(this.checkShow){
						this.checkShow(name);
					}
					game.trySkillAudio(name,this,true);
					if(lib.config.mode=='chess'){
						this.chessFocus();
					}
				},
				unprompt:function(){
					if(this.node.prompt){
						this.node.prompt.delete();
						delete this.node.prompt;
					}
				},
				prompt:function(name2,className){
					var node;
					if(this.node.prompt){
						node=this.node.prompt;
						node.innerHTML='';
						node.className='popup';
					}
					else{
						node=ui.create.div('.popup',this.parentNode);
						this.node.prompt=node;
					}
					node.dataset.position=this.dataset.position;
					if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
						typeof name2=='number'||this.classList.contains('minskin')){
						node.innerHTML=name2;
					}
					else{
						for(var i=0;i<name2.length;i++){
							node.innerHTML+=name2[i]+'<br/>';
						}
					}
					if(className){
						node.classList.add(className);
					}
				},
				popup:function(name,className){
					var name2=get.translation(name);
                    if(!name2) return;
                    this.$damagepop(name2,className||'water',true);
				},
                popup_old:function(name,className){
                    var name2=get.translation(name);
					var node=ui.create.div('.popup',this.parentNode);
					if(!name2){
						node.remove();
						return node;
					}
					game.addVideo('popup',this,[name,className]);
					node.dataset.position=this.dataset.position;
					if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
						typeof name2=='number'||this.classList.contains('minskin')){
						node.innerHTML=name2;
					}
					else{
						for(var i=0;i<name2.length;i++){
							node.innerHTML+=name2[i]+'<br/>';
						}
					}
					if(className){
						node.classList.add(className);
					}
					this.popups.push(node);
					if(this.popups.length>1){
						node.hide();
					}
					else{
						var that=this;
						setTimeout(function(){that._popup();},1000);
					}
					return node;
                },
				_popup:function(){
					if(this.popups.length){
						this.popups.shift().delete();
						if(this.popups.length){
							this.popups[0].show();
							var that=this;
							setTimeout(function(){that._popup();},1000);
						}
					}
				},
                showTimer:function(time){
                    if(!time&&lib.configOL){
                        time=parseInt(lib.configOL.choose_timeout)*1000;
                    }
                    if(_status.connectMode&&!game.online){
                        game.broadcast(function(player,time){
                            player.showTimer(time);
                        },this,time);
                    }
                    if(this==game.me){
                        return;
                    }
                    if(this.node.timer){
                        this.node.timer.remove();
                    }
                    var timer=ui.create.div('.timerbar',this);
                    this.node.timer=timer;
                    ui.create.div(this.node.timer);
                    var bar=ui.create.div(this.node.timer);
                    ui.refresh(bar);
                    bar.style.transitionDuration=(time/1000)+'s';
                    bar.style.width=0;
                },
                hideTimer:function(){
                    if(_status.connectMode&&!game.online){
                        game.broadcast(function(player){
                            player.hideTimer();
                        },this);
                    }
                    if(this.node.timer){
                        this.node.timer.delete();
                        delete this.node.timer;
                    }
                },
				markSkill:function(name,info,card){
					if(get.itemtype(card)=='card'){
						game.addVideo('markSkill',this,[name,get.cardInfo(card)]);
					}
					else{
						game.addVideo('markSkill',this,[name]);
					}
                    game.broadcastAll(function(storage,player,name,info,card){
                        player.storage[name]=storage;
                        if(!info){
    						if(player.marks[name]){
    							player.updateMarks();
                                return;
    						}
    						if(lib.skill[name]){
    							info=lib.skill[name].intro;
    						}
    						if(!info){
    							return;
    						}
    					}
    					if(player.marks[name]){
    						player.marks[name].info=info;
    					}
    					else{
    						if(card){
    							player.marks[name]=player.mark(card,info,name);
    						}
    						else{
    							player.marks[name]=player.mark(name,info);
    						}
    					}
                        player.updateMarks();
                    },this.storage[name],this,name,info,card);
					return this;
				},
				unmarkSkill:function(name){
					game.addVideo('unmarkSkill',this,name);
                    game.broadcast(function(player,name){
                        if(player.marks[name]){
                            player.marks[name].delete();
                            delete player.marks[name];
                        }
                    },this,name);
					if(this.marks[name]){
						this.marks[name].delete();
						delete this.marks[name];
						var info=lib.skill[name];
						if(info&&info.intro&&info.intro.onunmark){
							if(info.intro.onunmark=='throw'){
								if(get.itemtype(this.storage[name])=='cards'){
									this.$throw(this.storage[name]);
									while(this.storage[name].length){
										ui.discardPile.appendChild(this.storage[name].shift());
									}
								}
							}
							else if(typeof info.intro.onunmark=='function'){
								info.intro.onunmark(this.storage[name],this);
							}
						}
					}
				},
				markSkillCharacter:function(id,target,name,content){
					if(typeof target=='object'){
						target=target.name;
					}
                    game.broadcastAll(function(player,target,name,content,id){
                        if(player.marks[id]){
    						if(player.marks[id]._name==target){
    							return player;
    						}
    						player.marks[id].name=name+'_charactermark';
    						player.marks[id]._name=target;
    						player.marks[id].info={
    							name:name,
    							content:content
    						};
    						player.marks[id].setBackground(target,'character');
    						game.addVideo('changeMarkCharacter',player,{
    							id:id,
    							name:name,
    							content:content,
    							target:target
    						});
    					}
    					else{
    						player.marks[id]=player.markCharacter(target,{
    							name:name,
    							content:content
    						});
    						player.marks[id]._name=target;
    						game.addVideo('markCharacter',player,{
    							name:name,
    							content:content,
    							id:id,
    							target:target
    						});
    					}
                    },this,target,name,content,id);
					return this;
				},
				markCharacter:function(name,info,learn,learn2){
					if(typeof name=='object'){
						name=name.name;
					}
					if(!lib.character[name]) return this;
					var node=ui.create.div('.card.mark',this.node.marks).setBackground(name,'character');
					node.name=name+'_charactermark';
					if(!info){
						info={};
					}
					if(!info.name){
						info.name=get.translation(name);
					}
					if(!info.content){
						info.content=get.skillintro(name,learn,learn2)
					}
					node.info=info;
					if(lib.config.touchscreen){
						lib.setLongPress(node,ui.click.intro);
					}
					else{
						if(lib.config.hover_all){
							lib.setHover(node,ui.click.hoverplayer);
						}
						if(lib.config.right_info){
							node.oncontextmenu=ui.click.rightplayer;
						}
					}
					return node;
				},
				mark:function(name,info,skill){
					if(get.itemtype(name)=='cards'){
						var marks=[];
						for(var i=0;i<name.length;i++){
							marks.push(this.mark(name[i],info));
						}
						return marks;
					}
					else{
						var node;
						if(get.itemtype(name)=='card'){
							node=name.copy('mark',this.node.marks);
							node.suit=name.suit;
							node.number=name.number;
							name=name.name;
						}
						else{
							node=ui.create.div('.card.mark',this.node.marks);
							var str=lib.translate[name+'_bg'];
							if(!str||str[0]=='+'||str[0]=='-'){
								str=get.translation(name)[0];
							}
							ui.create.div('.background.skillmark',node).innerHTML=str;
							// node.style.fontFamily=lib.config.card_font;
						}
						node.name=name;
						node.skill=skill||name;
						if(typeof info=='object'){
							node.info=info;
						}
						else if(typeof info=='string'){
							node.markidentifer=info;
						}

						if(lib.config.touchscreen){
							lib.setLongPress(node,ui.click.intro);
						}
						else{
							if(lib.config.hover_all){
								lib.setHover(node,ui.click.hoverplayer);
							}
							if(lib.config.right_info){
								node.oncontextmenu=ui.click.rightplayer;
							}
						}
						this.updateMarks();
						return node;
					}
				},
				unmark:function(name,info){
					game.addVideo('unmarkname',this,name);
					if(get.itemtype(name)=='card'){
						this.unmark(name.name,info);
					}
					else if(get.itemtype(name)=='cards'){
						for(var i=0;i<name.length;i++){
							this.unmark(name[i].name,info);
						}
					}
					else{
						for(var i=0;i<this.node.marks.childNodes.length;i++){
							if(this.node.marks.childNodes[i].name==name&&
								(!info||this.node.marks.childNodes[i].markidentifer==info)){
								this.node.marks.childNodes[i].delete();
								return;
							}
						}
					}
				},
				canUse:function(card,player,distance,includecard){
					if(typeof card=='string') card={name:card};
					if(includecard&&!lib.filter.filterCard(card,this)) return false;
					if(distance==false) return lib.filter.targetEnabled(card,this,player);
					return lib.filter.filterTarget(card,this,player);
				},
				addSkill:function(skill){
					if(get.objtype(skill)=='array'){
						for(var i=0;i<skill.length;i++){
							this.addSkill(skill[i]);
						}
					}
					else{
						if(!lib.skill[skill]) return;
						if(this.skills.contains(skill)) return;
						this.skills.add(skill);
						if(lib.skill[skill].global){
							if(typeof lib.skill[skill].global=='string'){
								lib.skill.global.add(lib.skill[skill].global);
							}
							else{
								for(var j=0;j<lib.skill[skill].global.length;j++){
									lib.skill.global.add(lib.skill[skill].global[j])
								}
							}
						}
						if(lib.skill[skill].init){
							if(!this.initedSkills.contains(skill)){
								lib.skill[skill].init(this);
								this.initedSkills.push(skill);
							}
						}
						if(lib.skill[skill].init2){
							lib.skill[skill].init2(this);
						}
						if(lib.skill[skill].mark){
							if(lib.skill[skill].mark=='card'&&
								get.itemtype(this.storage[skill])=='card'){
									this.markSkill(skill,null,this.storage[skill]);
							}
							else if(lib.skill[skill].mark=='image'){
									this.markSkill(skill,null,ui.create.card(null,'noclick').init([null,null,skill]));
							}
							else{
								this.markSkill(skill);
							}
						}
					}
					this.checkConflict();
					return skill;
				},
				checkMarks:function(){
					var skills=this.get('s');
					for(var i in this.marks){
						if(!skills.contains(i)&&!this.marks[i].info.fixed){
							this.unmarkSkill(i);
						}
					}
					return this;
				},
				removeSkill:function(skill){
					this.unmarkSkill(skill);
					this.skills.remove(skill);
					this.checkConflict();
					if(lib.skill[skill]&&lib.skill[skill].onremove){
						lib.skill[skill].onremove(this);
					}
					return skill;
				},
				addTempSkill:function(skill,expire){
					if(this.skills.contains(skill)&&this.tempSkills[skill]==undefined) return;
					this.addSkill(skill);
					this.tempSkills[skill]=expire;
					this.checkConflict();
					return skill;
				},
				attitudeTo:function(target){
					if(typeof ai.get.attitude=='function') return ai.get.attitude(this,target);
					return 0;
				},
				clearSkills:function(){
					var list=[];
					var exclude=[];
					for(var i=0;i<arguments.length;i++) exclude.push(arguments[i]);
					for(i=0;i<this.skills.length;i++){
						if(this.modeSkills.contains(this.skills[i])==false&&
							exclude.contains(this.skills[i])==false){
							list.push(this.skills[i]);
							if(lib.skill[this.skills[i]]&&lib.skill[this.skills[i]].onremove){
								lib.skill[this.skills[i]].onremove(this);
							}
						}
					}
					this.skills.remove(list);
					this.checkConflict();
					this.checkMarks();
					return list;
				},
				checkConflict:function(){
					if(this.name&&this.name2){
						this.forbiddenSkills.length=0;
						var forbid=[];
						var getName=function(arr){
							var str='';
							for(var i=0;i<arr.length;i++){
								str+=arr[i]+'+';
							}
							return str.slice(0,str.length-1);
						}
						var forbidlist=lib.config.forbid.concat(lib.config.customforbid);
						for(var i=0;i<forbidlist.length;i++){
							if(lib.config.customforbid.contains(forbidlist[i])||
								!lib.config.forbidlist.contains(getName(forbidlist[i]))){
								for(var j=0;j<forbidlist[i].length;j++){
									if(this.skills.contains(forbidlist[i][j])==false) break;
								}
								if(j==forbidlist[i].length){
									forbid.push(forbidlist[i]);
								}
							}
						}
						for(var i=0;i<forbid.length;i++){
							this.forbiddenSkills.add(forbid[i][0]);
						}
					}
				},
				getStat:function(key){
					if(!key) return this.stat[this.stat.length-1];
					return this.stat[this.stat.length-1][key];
				},
				queue:function(time){
					if(time==false){
						clearTimeout(this.queueTimeout);
						this.queueCount=0;
						return;
					}
					if(time==undefined) time=500;
					var player=this;
					player.queueCount++;
					this.queueTimeout=setTimeout(function(){
						player.queueCount--;
						if(player.queueCount==0){
							player.style.transform='';
							player.node.avatar.style.transform='';
							player.node.avatar2.style.transform='';
							if(player==game.me) ui.me.removeAttribute('style');
						}
					},time)
				},
				isEnemyOf:function(){
					return !this.isFriendOf.apply(this,arguments);
				},
				isFriendOf:function(player){
					if(typeof this.side=='boolean'&&typeof player.side=='boolean'){
						return this.side==player.side;
					}
					if(lib.config.mode=='guozhan'){
						if(this.identity=='unknown'||this.identity=='ye') return false;
						if(player.identity=='unknown'||player.identity=='ye') return false;
						return this.identity==player.identity;
					}
					return this==player;
				},
				isAlive:function(){
					return this.classList.contains('dead')==false;
				},
				isDead:function(){
					return this.classList.contains('dead');
				},
				isDamaged:function(){
					return this.hp<this.maxHp;
				},
				isLinked:function(){
					return this.classList.contains('linked');
				},
				isTurnedOver:function(){
					return this.classList.contains('turnedover');
				},
				isOut:function(){
					return this.classList.contains('out');
				},
				isMin:function(distance){
					if(distance&&lib.config.mode!='stone') return false;
					if(this.forcemin) return true;
					return this.classList.contains('minskin')&&lib.config.mode!='chess';
				},
				isIn:function(){
					return this.classList.contains('dead')==false&&this.classList.contains('out')==false&&!this.removed;
				},
				isUnderControl:function(self){
					if(this.isMad()) return false;
					if(this===game.me){
						if(self) return true;
						return false;
					}
					if(lib.config.mode=='versus'){
						if(_status.mode=='four'||_status.mode=='jiange') return false;
						return ui.autoreplace&&ui.autoreplace.classList.contains('on')&&
							this.side==game.me.side;
					}
					else if(lib.config.mode=='boss'){
						return this.side==game.me.side&&get.config('single_control');
					}
					else if(lib.config.mode=='chess'){
						if(_status.mode=='combat'&&!get.config('single_control')) return false;
						return this.side==game.me.side;
					}
					return false;
				},
                isOnline:function(){
                    if(this.ws&&lib.node&&!this.ws.closed&&this.ws.inited&&!this.isAuto){
                        return true;
                    }
                    return false;
                },
                isOnline2:function(){
                    if(this.ws&&lib.node&&!this.ws.closed){
                        return true;
                    }
                    return false;
                },
                isOffline:function(){
                    if(this.ws&&lib.node&&this.ws.closed){
                        return true;
                    }
                    return false;
                },
				hasSkill:function(skill){
					return this.get('s').contains(skill);
				},
				hasSkillTag:function(tag,hidden){
					var skills=game.expandSkills(this.get('s',hidden));
					for(var i=0;i<skills.length;i++){
						var info=lib.skill[skills[i]];
						if(info&&info.ai){
							if(info.ai.skillTagFilter&&
								info.ai.skillTagFilter(this,tag)===false) continue;
							if(info.ai[tag]) return true;
						}
					}
					return false;
				},
				hasJudge:function(name){
					var judges=this.node.judges.childNodes;
					for(var i=0;i<judges.length;i++){
						if((judges[i].viewAs||judges[i].name)==name){
							return true;
						}
					}
					return false;
				},
				hasFriend:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=this&&ai.get.attitude(game.players[i],this)>=0){
							return true;
						}
					}
					return false;
				},
                hasWuxie:function(){
                    if(this.num('h','wuxie')) return true;
					var skills=this.get('s',true).concat(lib.skill.global);
					game.expandSkills(skills);
					for(var i=0;i<skills.length;i++){
						var ifo=get.info(skills[i]);
						if(ifo.viewAs&&ifo.viewAs.name=='wuxie'){
							if(!ifo.viewAsFilter||ifo.viewAsFilter(this)){
								return true;
							}
						}
						else{
							var hiddenCard=get.info(skills[i]).hiddenCard;
							if(typeof hiddenCard=='function'&&hiddenCard(this,'wuxie')){
								return true;
							}
						}
					}
                    return false;
                },
				getJudge:function(name){
					var judges=this.node.judges.childNodes;
					for(var i=0;i<judges.length;i++){
						if((judges[i].viewAs||judges[i].name)==name){
							return judges[i];
						}
					}
					return null;
				},
				$draw:function(num,init,config){
                    if(init!==false&&init!=='nobroadcast'){
                        game.broadcast(function(player,num,init,config){
                            player.$draw(num,init,config)
                        },this,num,init,config);
					}
					var cards,node;
					if(get.itemtype(num)=='cards'){
						cards=num;
						num=cards.length;
					}
					else if(get.itemtype(num)=='card'){
						cards=[num];
						num=1;
					}
					if(init!==false){
						if(cards){
							game.addVideo('drawCard',this,get.cardsInfo(cards));
						}
						else{
							game.addVideo('draw',this,num);
						}
					}
					if(cards){
						cards=cards.slice(0);
						node=cards.shift().copy('thrown');
					}
					else{
						node=ui.create.div('.card.thrown');
					}
					node.fixed=true;
					node.hide();

					node.style.left='calc(50% - 52px)';
					node.style.top='calc(50% - 52px)';

					this.parentNode.appendChild(node);
					node.style.transitionDuration='0.8s';
					ui.refresh(node);

					var dx=this.offsetLeft+this.offsetWidth/2-52-node.offsetLeft;
					var dy=this.offsetTop+this.offsetHeight/2-52-node.offsetTop;
					if(typeof num=='number'&&init!==false){
						config={
							total:num,
							current:1
						}
					}
					if(config&&config.total>1){
						var total=config.total,current=config.current;
						var dxtotal;
						if(total<=5){
							dxtotal=Math.min(80,(total-1)*20);
							dx+=-dxtotal+2*dxtotal*(current-1)/(total-1)
						}
						else{
							var total2=Math.floor(total/2);
							if(current<=total2){
								total=total2;
								dy-=20;
							}
							else{
								current-=total2;
								total-=total2;
								dy+=20;
							}
							dxtotal=Math.min(80,(total-1)*20);
							dx+=-dxtotal+2*dxtotal*(current-1)/(total-1)
						}
						config.current++;
					}
					if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
						node.style.transform+=' translate('+dx+'px,'+dy+'px)';
					}
					else{
						node.style.transform='translate('+dx+'px,'+dy+'px)';
					}
					node.show();

					node.addEventListener('webkitTransitionEnd',function(){
						node.style.transitionDuration='0.5s';
						ui.refresh(node);
						node.delete();
					});
					var that=this;
					if(num&&num>1){
						if(config&&config.total>1){
							setTimeout(function(){
								if(cards){
									that.$draw(cards,false,config)
								}
								else{
									that.$draw(num-1,false,config)
								}
							},50)
						}
						else{
							setTimeout(function(){
								if(cards){
									that.$draw(cards,false,config)
								}
								else{
									that.$draw(num-1,false,config)
								}
							},200);
						}
					}
				},
				$compare:function(card1,target,card2){
                    game.broadcast(function(player,target,card1,card2){
                        player.$compare(card1,target,card2);
                    },this,target,card1,card2);
					game.addVideo('compare',this,[get.cardInfo(card1),target.dataset.position,get.cardInfo(card2)]);
					var player=this;
					var node1=player.$throwxy2(card1,
						'calc(50% - 114px)','calc(50% - 52px)','perspective(600px) rotateY(180deg)',true
					);
					if(lib.config.cardback_style!='default'){
						node1.style.transitionProperty='none';
						ui.refresh(node1);
						node1.classList.add('infohidden');
						ui.refresh(node1);
						node1.style.transitionProperty='';
					}
					else{
						node1.classList.add('infohidden');
					}

					node1.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
					var onEnd01=function(){
						node1.removeEventListener('webkitTransitionEnd',onEnd01);
						setTimeout(function(){
							node1.style.transition='all ease-in 0.3s';
							node1.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
							var onEnd=function(){
								node1.classList.remove('infohidden');
								node1.style.transition='all 0s';
								ui.refresh(node1);
								node1.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
								ui.refresh(node1);
								node1.style.transition='';
								ui.refresh(node1);
								node1.style.transform='';
								node1.removeEventListener('webkitTransitionEnd',onEnd);
							}
							node1.addEventListener('webkitTransitionEnd',onEnd);
						},300);
					};
					node1.addEventListener('webkitTransitionEnd',onEnd01);
					setTimeout(function(){
						var node2=target.$throwxy2(card2,
							'calc(50% + 10px)','calc(50% - 52px)','perspective(600px) rotateY(180deg)',true
						);
						if(lib.config.cardback_style!='default'){
							node2.style.transitionProperty='none';
							ui.refresh(node2);
							node2.classList.add('infohidden');
							ui.refresh(node2);
							node2.style.transitionProperty='';
						}
						else{
							node2.classList.add('infohidden');
						}
						node2.style.transform='perspective(600px) rotateY(180deg) translateX(0)';
						var onEnd02=function(){
							node2.removeEventListener('webkitTransitionEnd',onEnd02);
							setTimeout(function(){
								node2.style.transition='all ease-in 0.3s';
								node2.style.transform='perspective(600px) rotateY(270deg) translateX(52px)';
								var onEnd=function(){
									node2.classList.remove('infohidden');
									node2.style.transition='all 0s';
									ui.refresh(node2);
									node2.style.transform='perspective(600px) rotateY(-90deg) translateX(52px)';
									ui.refresh(node2);
									node2.style.transition='';
									ui.refresh(node2);
									node2.style.transform='';
									node2.removeEventListener('webkitTransitionEnd',onEnd);
								}
								node2.addEventListener('webkitTransitionEnd',onEnd);
							},200);
						};
						node2.addEventListener('webkitTransitionEnd',onEnd02);
					},200);
				},
				$throw:function(card,time,init){
					if(init!==false){
                        game.broadcast(function(player,card,time,init){
                            player.$throw(card,time,init);
                        },this,card,time,init);
						if(get.itemtype(card)!='cards'){
							if(get.itemtype(card)=='card'){
								card=[card];
							}
							else{
								return;
							}
						}
						game.addVideo('throw',this,[get.cardsInfo(card),time]);
					}
					if(get.itemtype(card)=='cards'){
						var node;
						for(var i=0;i<card.length;i++){
							node=this.$throw(card[i],time,false);
						}
						return node;
					}
					else{
						var node;
						if(card==undefined||card.length==0) return;
						node=this.$throwordered(card.copy('thrown'));
						if(time!=undefined){
							node.fixed=true;
							setTimeout(function(){node.delete()},time);
						}
						lib.listenEnd(node);
						return node;
					}
				},
				$throwordered:function(){
					if(lib.config.low_performance){
						return this.$throwordered2.apply(this,arguments);
					}
					else{
						return this.$throwordered1.apply(this,arguments);
					}
				},
				$throwordered1:function(node,nosource){
					node.classList.add('thrown');
					node.hide();
					node.style.transitionProperty='left,top,opacity,transform';
					for(var i=0;i<ui.thrown.length;i++){
						if(ui.thrown[i].parentNode!=ui.arena||
							ui.thrown[i].classList.contains('removing')){
							ui.thrown.splice(i--,1);
						}
					}
					ui.thrown.push(node);
					var uithrowns=ui.thrown.slice(0);
					var tops;
					switch(Math.floor((ui.thrown.length-1)/4)){
						case 0:
							tops=['calc(50% - 52px)'];
							break;
						case 1:
							tops=['calc(50% - 109px)','calc(50% + 5px)'];
							break;
						case 2:
							tops=['calc(50% - 166px)','calc(50% - 52px)','calc(50% + 62px)'];
							break;
						default:
							tops=['calc(50% - 223px)','calc(50% - 109px)',
								'calc(50% + 5px)','calc(50% + 119px)'];
					}
					while(uithrowns.length){
						var throwns=uithrowns.splice(0,Math.min(uithrowns.length,4));
						switch(throwns.length){
							case 1:
								throwns[0].style.left='calc(50% - 52px)';
								break;
							case 2:
								throwns[0].style.left='calc(50% - 109px)';
								throwns[1].style.left='calc(50% + 5px)';
								break;
							case 3:
								throwns[0].style.left='calc(50% - 166px)';
								throwns[1].style.left='calc(50% - 52px)';
								throwns[2].style.left='calc(50% + 62px)';
								break;
							case 4:
								throwns[0].style.left='calc(50% - 223px)';
								throwns[1].style.left='calc(50% - 109px)';
								throwns[2].style.left='calc(50% + 5px)';
								throwns[3].style.left='calc(50% + 119px)';
								break;
						}
						var top;
						if(tops.length){
							top=tops.shift();
						}
						else{
							top='calc(50% - 52px)';
						}
						for(var i=0;i<throwns.length;i++){
							throwns[i].style.top=top;
						}
					}
					if(nosource){
						node.style.transform='scale(0)';
						node.classList.add('center');
					}
					else{
						var parseCalc=function(str){
							var per=str.slice(str.indexOf('calc(')+5,str.indexOf('%'));
							var add=str.slice(str.indexOf('%')+1,str.indexOf('px')).replace(/\s/g,'');
							return [parseInt(per),parseInt(add)];
						}
						var nx=parseCalc(node.style.left);
						var ny=parseCalc(node.style.top);
						nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
						ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
						var dx=this.offsetLeft+this.offsetWidth/2-52-nx;
						var dy=this.offsetTop+this.offsetHeight/2-52-ny;
						if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
							node.style.transform+=' translate('+dx+'px,'+dy+'px)';
						}
						else{
							node.style.transform='translate('+dx+'px,'+dy+'px)';
						}
					}
					ui.arena.appendChild(node);
					ui.refresh(node);
					node.style.transform='';
					node.show();
					lib.listenEnd(node);
					return node;
				},
				$throwordered2:function(node,nosource){
					node.classList.add('thrown');
					node.classList.add('center');
					node.hide();
					node.style.transitionProperty='left,top,opacity,transform';

					if(nosource){
						// node.style.transform='scale(0)';
					}
					else{
						var nx=[50,-52];
						var ny=[50,-52];
						nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
						ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
						var dx=this.offsetLeft+this.offsetWidth/2-52-nx;
						var dy=this.offsetTop+this.offsetHeight/2-52-ny;
						if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
							node.style.transform+=' translate('+dx+'px,'+dy+'px)';
						}
						else{
							node.style.transform='translate('+dx+'px,'+dy+'px)';
						}
					}
					ui.arena.appendChild(node);
					ui.refresh(node);

					for(var i=0;i<ui.thrown.length;i++){
						if(ui.thrown[i].parentNode!=ui.arena||
							ui.thrown[i].classList.contains('removing')){
							ui.thrown.splice(i--,1);
						}
					}
					ui.thrown.push(node);
					var uithrowns=ui.thrown.slice(0);
					var tops;
					switch(Math.floor((ui.thrown.length-1)/4)){
						case 0:
							tops=[0];
							break;
						case 1:
							tops=[-57,57];
							break;
						case 2:
							tops=[-114,0,114];
							break;
						default:
							tops=[-171,-57,57,171];
					}
					while(uithrowns.length){
						var throwns=uithrowns.splice(0,Math.min(uithrowns.length,4));
						switch(throwns.length){
							case 1:
								throwns[0]._transthrown='translate(0px,';
								break;
							case 2:
								throwns[0]._transthrown='translate(-57px,';
								throwns[1]._transthrown='translate(57px,';
								break;
							case 3:
								throwns[0]._transthrown='translate(-114px,';
								throwns[1]._transthrown='translate(0,';
								throwns[2]._transthrown='translate(114px,';
								break;
							case 4:
								throwns[0]._transthrown='translate(-171px,';
								throwns[1]._transthrown='translate(-57px,';
								throwns[2]._transthrown='translate(57px,';
								throwns[3]._transthrown='translate(171px,';
								break;
						}
						var top;
						if(tops.length){
							top=tops.shift();
						}
						else{
							top=0;
						}
						for(var i=0;i<throwns.length;i++){
							throwns[i].style.transform=throwns[i]._transthrown+top+'px)';
							delete throwns[i]._transthrown;
						}
					}

					node.show();
					lib.listenEnd(node);
					return node;
				},
				$throwxy:function(card,left,top){
					var node=card.copy('thrown','thrownhighlight');
					node.dataset.position=this.dataset.position;
					node.hide();
					node.style.transitionProperty='left,top,opacity';

					ui.arena.appendChild(node);
					ui.refresh(node);
					node.show();
					node.style.left=left;
					node.style.top=top;
					lib.listenEnd(node);
					return node;
				},
				$throwxy2:function(card,left,top,trans,flipx,flipy){
					if(lib.config.mode=='chess'){
						return this.$throwxy.apply(this,arguments);
					}
					var node=card.copy('thrown','thrownhighlight');
					node.style.left=left;
					node.style.top=top;
					node.hide();
					// node.style.transitionProperty='left,top,opacity,transform';

					var parseCalc=function(str){
						var per=str.slice(str.indexOf('calc(')+5,str.indexOf('%'));
						var add=str.slice(str.indexOf('%')+1,str.indexOf('px')).replace(/\s/g,'');
						return [parseInt(per),parseInt(add)];
					}
					var nx=parseCalc(node.style.left);
					var ny=parseCalc(node.style.top);
					nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
					ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
					var dx=this.offsetLeft+this.offsetWidth/2-52-nx;
					var dy=this.offsetTop+this.offsetHeight/2-52-ny;
					if(flipx) dx=-dx;
					if(flipy) dy=-dy;
					if(trans){
						node.style.transform=trans+' translate('+dx+'px,'+dy+'px)';
					}
					else{
						node.style.transform='translate('+dx+'px,'+dy+'px)';
					}

					ui.arena.appendChild(node);
					ui.refresh(node);
					node.show();
					// node.style.transform=trans||'';
					lib.listenEnd(node);
					return node;
				},
				$give:function(card,player,log,init){
					if(init!==false){
                        game.broadcast(function(source,card,player,init){
                            source.$give(card,player,false,init);
                        },this,card,player,init);
						if(typeof card=='number'&&card>=0){
							game.addVideo('give',this,[card,player.dataset.position]);
						}
						else{
							if(get.itemtype(card)=='card'){
								card=[card];
							}
							if(get.itemtype(card)=='cards'){
								game.addVideo('giveCard',this,[get.cardsInfo(card),player.dataset.position]);
							}
						}
					}
					if(get.itemtype(card)=='cards'){
						if(log!=false){
							game.log(player,'从',this,'获得了',card);
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							for(var i=0;i<card.length;i++){
								this.$give(card[i],player,false,false);
							}
						}
					}
					else if(typeof card=='number'&&card>=0){
						if(log!=false){
							game.log(player,'从',this,'获得了'+get.cnNumber(card)+'张牌');
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							while(card--) this.$give('',player,false,false);
						}
					}
					else{
						if(log!=false){
							if(get.itemtype(card)=='card'&&log!=false){
								game.log(player,'从',this,'获得了',card);
							}
							else{
								game.log(player,'从',this,'获得了一张牌');
							}
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							var node;
							if(get.itemtype(card)=='card'){
								node=card.copy('card','thrown',false);
							}
							else{
								node=ui.create.div('.card.thrown');
							}
							// node.dataset.position=this.dataset.position;
							node.fixed=true;
							this.$throwordered(node);
							// lib.listenEnd(node);
							// node.hide();
							// node.style.transitionProperty='left,top,opacity';
							//
							// node.style.transform='rotate('+(Math.random()*16-8)+'deg)';
							//
							// ui.arena.appendChild(node);
							// ui.refresh(node);
							// node.show();
							// node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							// node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

							node.addEventListener('webkitTransitionEnd',function(){
								var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
								var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
								if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
									node.style.transform+=' translate('+dx+'px,'+dy+'px)';
								}
								else{
									node.style.transform='translate('+dx+'px,'+dy+'px)';
								}

								node.delete();
							});
							// setTimeout(function(){
							// 	// node.removeAttribute('style');
							// 	// node.dataset.position=player.dataset.position;
							// 	var dx=player.offsetLeft+player.offsetWidth/2-52-node.offsetLeft;
							// 	var dy=player.offsetTop+player.offsetHeight/2-52-node.offsetTop;
							// 	if(node.style.transform&&node.style.transform!='none'&&node.style.transform.indexOf('translate')==-1){
							// 		node.style.transform+=' translate('+dx+'px,'+dy+'px)';
							// 	}
							// 	else{
							// 		node.style.transform='translate('+dx+'px,'+dy+'px)';
							// 	}
							//
							// 	node.delete();
							// },700);
						}
					}
				},
				$equip:function(card){
                    game.broadcast(function(player,card){
                        player.$equip(card);
                    },this,card);
                    card.fix();
					card.style.transform='';
					card.classList.remove('drawinghidden');
					var player=this;
					var equipNum=get.equipNum(card);
					var equipped=false;
					for(var i=0;i<player.node.equips.childNodes.length;i++){
						if(get.equipNum(player.node.equips.childNodes[i])>=equipNum){
							player.node.equips.insertBefore(card,player.node.equips.childNodes[i]);
							equipped=true;
							break;
						}
					}
					if(!equipped){
						player.node.equips.appendChild(card);
					}
					return player;
				},
				$gain:function(card,log,init){
					if(init!==false){
                        game.broadcast(function(player,card,init){
                            player.$gain(card,false,init);
                        },this,card,init);
						if(typeof card=='number'&&card>=0){
							game.addVideo('gain',this,card);
						}
						else{
							if(get.itemtype(card)=='card'){
								card=[card];
							}
							if(get.itemtype(card)=='cards'){
								game.addVideo('gainCard',this,get.cardsInfo(card));
							}
							else{
								game.addVideo('gain',this,1);
							}
						}
					}
					if(get.itemtype(card)=='cards'){
						if(log!=false){
							game.log(this,'获得了',card);
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							for(var i=0;i<card.length;i++){
								this.$gain(card[i],false,false);
							}
						}
					}
					else if(typeof card=='number'&&card>1){
						if(log!=false){
							game.log(this,'获得了'+get.cnNumber(card)+'张牌');
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							for(var i=0;i<card;i++){
								this.$gain(1,false,false);
							}
						}
					}
					else{
						if(get.itemtype(card)=='card'&&log!=false){
							game.log(this,'获得了',card);
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							var node;
							if(get.itemtype(card)=='card'){
								// node=this.$throwordered(card.copy(),true);
								node=card.copy('thrown',false);
							}
							else{
								// node=this.$throwordered(ui.create.div('.card.thrown'),true);
								node=ui.create.div('.card.thrown');
								node.moveTo=lib.element.card.moveTo;
								node.moveDelete=lib.element.card.moveDelete;
							}
							node.fixed=true;
							node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							node.style.transform='scale(0)';
							node.hide();
							ui.arena.appendChild(node);
							ui.refresh(node);
							node.show();
							node.style.transform='';

							lib.listenEnd(node);
							var player=this;
							setTimeout(function(){
								node.moveDelete(player);
							},700);
						}
					}
				},
				$gain2:function(cards){
                    game.broadcast(function(player,cards){
                        player.$gain2(cards);
                    },this,cards);
					if(get.itemtype(cards)=='card') cards=[cards];
					else if(get.itemtype(cards)!='cards') return;
					var list=[],list2=[];
					for(var i=0;i<cards.length;i++){
						if(cards[i].clone&&
							(cards[i].clone.parentNode==this.parentNode||
							cards[i].clone.parentNode==ui.arena)&&
							parseFloat(getComputedStyle(cards[i].clone).opacity)>0.3){
							cards[i].clone.moveDelete(this);
							list2.push(cards[i].clone);
						}
						else{
							list.push(cards[i]);
						}
					}
					if(list2.length){
						game.addVideo('gain2',this,get.cardsInfo(list2));
					}
					if(list.length) this.$draw(list,'nobroadcast');
				},
				$skill:function(name,type,color){
					if(typeof type!='string') type='legend';
					game.delay(2);
					this.playerfocus(1500);
					var that=this;
					setTimeout(function(){
                        game.broadcastAll(function(that,type,name,color){
                            if(lib.config.animation&&!lib.config.low_performance){
    							if(lib.config.mode=='chess'){
    								that['$'+type+'2'](1200);
    							}
    							else{
    								that['$'+type](1200);
    							}
    						}
    						if(name){
    							that.$fullscreenpop(name,color);
    						}
                        },that,type,name,color);
					},300);
				},
				$fire:function(){
					game.addVideo('flame',this,'fire');
					var left,top;
					if(lib.config.mode=='chess'){
						var rect=this.getBoundingClientRect();
						left=rect.left;
						top=rect.top;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-20,700,'fire');
				},
				$thunder:function(){
					game.addVideo('flame',this,'thunder');
					var left,top;
					if(lib.config.mode=='chess'){
						var rect=this.getBoundingClientRect();
						left=rect.left;
						top=rect.top;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'thunder');
				},
				$rare2:function(){
					game.addVideo('flame',this,'rare2');
					var rect=this.getBoundingClientRect();
					var left=rect.left;
					var top=rect.top+15;
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'rare');
				},
				$epic2:function(){
					game.addVideo('flame',this,'epic2');
					var rect=this.getBoundingClientRect();
					var left=rect.left;
					var top=rect.top+15;
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'epic');
				},
				$legend2:function(){
					game.addVideo('flame',this,'legend2');
					var rect=this.getBoundingClientRect();
					var left=rect.left;
					var top=rect.top+15;
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'legend');
				},
				$rare:function(time){
					time=time||700;
					game.addVideo('flame',this,'rare');
					var left,top;
					if(lib.config.mode=='chess'){
						left=this.offsetLeft-ui.arena.offsetLeft;
						top=this.offsetTop-ui.arena.offsetTop;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					if(this.classList.contains('minskin')){
						top+=15;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,time,'rare');
				},
				$epic:function(time){
					time=time||700;
					game.addVideo('flame',this,'epic');
					var left,top;
					if(lib.config.mode=='chess'){
						left=this.offsetLeft-ui.arena.offsetLeft;
						top=this.offsetTop-ui.arena.offsetTop;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					if(this.classList.contains('minskin')){
						top+=15;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,time,'epic');
				},
				$legend:function(time){
					time=time||700;
					game.addVideo('flame',this,'legend');
					var left,top;
					if(lib.config.mode=='chess'){
						left=this.offsetLeft-ui.arena.offsetLeft;
						top=this.offsetTop-ui.arena.offsetTop;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					if(this.classList.contains('minskin')){
						top+=15;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,time,'legend');
				},
				$coin:function(){
                    game.broadcast(function(player){
                        if(!lib.config.low_performance){
                            player.$coin();
                        }
                    },this);
					game.addVideo('flame',this,'coin');
					var left=this.offsetLeft-ui.arena.offsetLeft;
					var top=this.offsetTop-ui.arena.offsetTop;
					if(this.classList.contains('minskin')){
						top+=15;
					}
					top-=25;
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'coin');
				},
				$dust:function(){
                    game.broadcast(function(player){
                        if(!lib.config.low_performance){
                            player.$dust();
                        }
                    },this);
					game.addVideo('flame',this,'dust');
					var left=this.offsetLeft-ui.arena.offsetLeft;
					var top=this.offsetTop-ui.arena.offsetTop;
					if(this.classList.contains('minskin')){
						top+=15;
					}
					top-=25;
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'dust');
				},
				$recover:function(){
                    game.broadcast(function(player){
                        if(!lib.config.low_performance){
                            player.$recover();
                        }
                    },this);
					game.addVideo('flame',this,'recover');
					var left,top;
					if(lib.config.mode=='chess'){
						var rect=this.getBoundingClientRect();
						left=rect.left;
						top=rect.top;
					}
					else{
						left=this.offsetLeft;
						top=this.offsetTop;
					}
					game.animate.flame(left+this.offsetWidth/2,
						top+this.offsetHeight-30,700,'recover');
				},
				$fullscreenpop:function(str,nature){
                    game.broadcast(function(player,str,nature){
                        player.$fullscreenpop(str,nature);
                    },this,str,nature);
					game.addVideo('fullscreenpop',this,[str,nature]);
					var node=ui.create.div('.damage',ui.window);
					node.innerHTML=str;
					node.dataset.nature=nature||'soil';
					ui.refresh(node);
					node.classList.add('damageadded');
					setTimeout(function(){
						node.delete();
					},1000);
				},
				$damagepop:function(num,nature,font){
					if(typeof num=='number'||typeof num=='string'){
						game.addVideo('damagepop',this,[num,nature,font]);
                        game.broadcast(function(player,num,nature,font){
                            player.$damagepop(num,nature,font);
                        },this,num,nature,font);
						var node=ui.create.div('.damage');
						if(font){
							node.classList.add('normal-font');
						}
						if(typeof num=='number'&&num>0){
							num='+'+num;
						}
						node.innerHTML=num;
						this.damagepopups.push(node);
						node.dataset.nature=nature||'soil';
						if(this.damagepopups.length==1){
							this.$damagepop();
						}
					}
					else if(this.damagepopups.length){
						var node=this.damagepopups[0];
						this.appendChild(node);
						ui.refresh(node);
						node.classList.add('damageadded');
						node.addEventListener('webkitTransitionEnd',function(){
							setTimeout(function(){
								node.delete();
							},200);
						});
						// setTimeout(function(){
						// 	node.delete();
						// },500);
						var that=this;
						setTimeout(function(){
							that.damagepopups.shift();
							that.$damagepop();
						},500);
					}
				},
				$damage:function(source){
					if(get.itemtype(source)=='player'){
						game.addVideo('damage',this,source.dataset.position);
					}
					else{
						game.addVideo('damage',this);
					}
                    game.broadcast(function(player,source){
                        player.$damage(source);
                    },this,source);
					if(source&&source!=this&&lib.config.damage_shake){
						var left,top;
						if(source.offsetTop==this.offsetTop){
							left=20;
							top=0;
						}
						else{
							var ratio=(source.offsetLeft-this.offsetLeft)/(source.offsetTop-this.offsetTop);
							left=Math.abs(20*ratio/Math.sqrt(1+ratio*ratio));
							top=Math.abs(20/Math.sqrt(1+ratio*ratio));
						}
						if(source.offsetLeft-this.offsetLeft>0) left=-left;
						if(source.offsetTop-this.offsetTop>0) top=-top;
						if(lib.isMobileMe(this)){
							if(this.isLinked()){
								this.node.avatar.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
								this.node.avatar2.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
							}
							else{
								this.node.avatar.style.transform='translate('+left+'px,'+top+'px)';
								this.node.avatar2.style.transform='translate('+left+'px,'+top+'px)';
							}
						}
						else if(this.isLinked()&&lib.isNewLayout()){
							this.style.transform='translate('+left+'px,'+top+'px) rotate(-90deg)';
						}
						else{
							this.style.transform='translate('+left+'px,'+top+'px)';
						}
					}
					else{
						var zoom1=0.9,zoom2=0.95;
						if(arguments[1]=='phase'){
							zoom1=1.05;
							zoom2=1.05;
						}
						if(lib.isMobileMe(this)){
							if(this.isLinked()){
								this.node.avatar.style.transform='scale('+zoom1+') rotate(-90deg)';
								this.node.avatar2.style.transform='scale('+zoom1+') rotate(-90deg)';
							}
							else{
								this.node.avatar.style.transform='scale('+zoom1+')';
								this.node.avatar2.style.transform='scale('+zoom1+')';
							}
						}
						else if(this.isLinked()&&lib.isNewLayout()){
							this.style.transform='scale('+zoom2+') rotate(-90deg)';
						}
						else{
							this.style.transform='scale('+zoom2+')';
						}
					}
					this.queue();
				},
				$die:function(){
					game.addVideo('die',this);
                    game.broadcast(function(player){
                        player.$die();
                    },this);
					if(lib.config.die_flip){
                        this.$dieflip();
					}
                    if(lib.element.player.$dieAfter){
                        lib.element.player.$dieAfter.call(this);
                    }
				},
                $dieflip:function(){
                    var top0=ui.window.offsetHeight/2;
                    var left0=ui.window.offsetWidth/2;
                    var ratio=(left0-this.offsetLeft)/(top0-this.offsetTop);
                    var left=Math.abs(50*ratio/Math.sqrt(1+ratio*ratio));
                    var top=Math.abs(50/Math.sqrt(1+ratio*ratio));
                    if(left0-this.offsetLeft>0) left=-left;
                    if(top0-this.offsetTop>0) top=-top;
                    if(lib.isMobileMe(this)){
                        left=-Math.random()*5-10;
                        top=Math.random()*5+10;
                    }
                    var transform='translate('+left+'px,'+top+'px) '+
                    'rotate('+(Math.random()*20-10)+'deg) '+
                    ((Math.random()-0.5<0)?'rotateX(180deg)':'rotateY(180deg)');
                    if(lib.isMobileMe(this)){
                        this.node.avatar.style.transform=transform;
                        this.node.avatar2.style.transform=transform;
                    }
                    else{
                        this.style.transform=transform;
                    }
                    this.queue(false);
                },
				$phaseJudge:function(card){
					game.addVideo('phaseJudge',this,get.cardInfo(card));
					var player=this;
					var clone=player.$throw(card);
					if(lib.config.low_performance&&card&&card.clone){
					    var waitingForTransition=get.time();
					    _status.waitingForTransition=waitingForTransition;
					    card.clone.addEventListener('webkitTransitionEnd',function(){
					        if(_status.waitingForTransition==waitingForTransition&&_status.paused){
					            game.resume();
					        }
					    });
						game.pause();
					}
					else{
						game.delay();
					}
				}
			},
			card:{
				init:function(card){
					if(Array.isArray(card)){
						if(card[2]=='huosha'){
							card[2]='sha';
							card[3]='fire';
						}
						if(card[2]=='leisha'){
							card[2]='sha';
							card[3]='thunder';
						}
					}
					var bg=card[2];
                    var nocard=false;
                    if(!lib.card[card[2]]){
                        nocard=true;
                        lib.card[card[2]]={};
                    }
					var img=lib.card[card[2]].image;
					if(img&&img.indexOf('db:')==0){
						img=img.slice(3);
					}
					else{
						img=null;
					}
					if(!lib.config.hide_card_image&&lib.card[card[2]].fullskin){
						this.classList.add('fullskin');
						if(img){
							this.node.image.setBackgroundDB(img);
						}
						else{
							this.node.image.setBackgroundImage('image/card/'+card[2]+'.png');
						}
					}
					else if(lib.card[card[2]].image=='background'){
						if(card[3]) this.node.background.setBackground(bg+'_'+card[3],'card');
						else this.node.background.setBackground(bg,'card');
					}
					else if(lib.card[card[2]].fullimage){
						if(img){
							this.setBackgroundDB(img);
						}
						else{
							this.setBackground('card/'+bg);
						}
					}
					else if(lib.card[card[2]].image=='card'){
						if(card[3]) this.setBackground(bg+'_'+card[3],'card');
						else this.setBackground(bg,'card');
					}
					else if(typeof lib.card[card[2]].image=='string'&&!lib.card[card[2]].fullskin){
						if(img){
							this.setBackgroundDB(img);
						}
						else{
							this.setBackground(lib.card[card[2]].image);
						}
					}
					else{
						this.node.background.innerHTML=lib.translate[bg+'_bg']||get.translation(bg)[0];
						// this.node.background.style.fontFamily=lib.config.card_font;
						if(this.node.background.innerHTML.length>1) this.node.background.classList.add('tight');
						else this.node.background.classList.remove('tight');
					}
					if(lib.card[card[2]].noname){
						this.node.name.style.display='none';
					}
					if(lib.card[card[2]].color){
						this.style.color=lib.card[card[2]].color;
					}
					else if(lib.card[card[2]].fullimage){
						this.style.color='white';
					}
					if(lib.card[card[2]].textShadow){
						this.style.textShadow=lib.card[card[2]].textShadow;
					}
					else if(lib.card[card[2]].fullimage){
						this.style.textShadow='black 0 0 2px';
					}
					if(lib.card[card[2]].opacity){
						this.node.info.style.opacity=lib.card[card[2]].opacity;
						this.node.name.style.opacity=lib.card[card[2]].opacity;
					}
					else if(lib.card[card[2]].fullimage){
						this.node.info.style.opacity=1;
						this.node.name.style.opacity=1;
					}
					if(lib.card[card[2]].modinfo){
						this.node.info.innerHTML=lib.card[card[2]].modinfo;
					}
					else{
						this.node.info.innerHTML=get.translation(card[0])+'<span> </span>'+card[1];
					}
					if(lib.card[card[2]].addinfo){
						this.node.addinfo=ui.create.div('.range',this);
						this.node.addinfo.innerHTML=lib.card[card[2]].addinfo;
					}
					if(card[0]=='heart'||card[0]=='diamond'){
						this.node.info.classList.add('red');
					}
					this.node.name.innerHTML='';
					this.node.image.className='image';
					var name=get.translation(card[2]);
					if(card[2]=='sha'){
						if(card[3]=='fire'){
							name='火'+name;
							this.node.image.classList.add('fire');
						}
						else if(card[3]=='thunder'){
							name='雷'+name;
							this.node.image.classList.add('thunder');
						}
					}
					for(var i=0;i<name.length;i++){
						this.node.name.innerHTML+=name[i]+'<br/>';
					}
					// if(lib.card[card[2]].subtype=='equip3'){
					// 	this.node.name.innerHTML+='+';
					// }
					// else if(lib.card[card[2]].subtype=='equip4'){
					// 	this.node.name.innerHTML+='-';
					// }
					this.node.name2.innerHTML=get.translation(card[0])+card[1]+' '+name;
					this.suit=card[0];
					this.number=card[1];
					this.name=card[2];
					this.classList.add('card');
					if(card[3]){
						if(lib.nature.contains(card[3])) this.nature=card[3];
						this.classList.add(card[3]);
					}
					else if(this.nature){
						this.classList.remove(this.nature);
						delete this.nature;
					}
					if(lib.card[card[2]].subtype) this.classList.add(lib.card[card[2]].subtype);
					if(this.inits){
						for(var i=0;i<lib.element.card.inits.length;i++){
							lib.element.card.inits[i](this);
						}
					}
					if(typeof lib.card[card[2]].init=='function') lib.card[card[2]].init();

					switch(get.subtype(this)){
						case 'equip1':
							var added=false;
							if(lib.card[this.name]&&lib.card[this.name].distance){
								var dist=lib.card[this.name].distance;
								if(dist.attackFrom){
									added=true;
									this.node.range.innerHTML='范围: '+(-dist.attackFrom+1);
								}
							}
							if(!added){
								this.node.range.innerHTML='范围: 1';
							}
							break;
						case 'equip3':this.node.range.innerHTML='防御: 1';break;
						case 'equip4':this.node.range.innerHTML='进攻: 1';break;
					}
                    // if(nocard){
                    //     delete lib.card[card[2]];
                    // }
                    if(_status.connectMode&&!game.online&&lib.cardOL&&!this.cardid){
                        this.cardid=get.id();
                        lib.cardOL[this.cardid]=this;
                    }
					return this;
				},
				aiexclude:function(){
					_status.event.aiexclude.add(this);
				},
                getState:function(){

                },
				moveDelete:function(player){
					this.fixed=true;
					if(!this._listeningEnd||this._transitionEnded){
						this.moveTo(player).delete();
					}
					else{
						this._onEndMoveDelete=player;
					}
				},
				moveTo:function(player){
					this.fixed=true;
					var dx,dy;
					if(this.classList.contains('center')){
						var nx=[50,-52];
						var ny=[50,-52];
						nx=nx[0]*ui.arena.offsetWidth/100+nx[1];
						ny=ny[0]*ui.arena.offsetHeight/100+ny[1];
						dx=player.offsetLeft+player.offsetWidth/2-52-nx;
						dy=player.offsetTop+player.offsetHeight/2-52-ny;
					}
					else{
						this.style.left=this.offsetLeft+'px';
						this.style.top=this.offsetTop+'px';

						dx=player.offsetLeft+player.offsetWidth/2-52-this.offsetLeft;
						dy=player.offsetTop+player.offsetHeight/2-52-this.offsetTop;
					}

					if(this.style.transform&&this.style.transform!='none'&&this.style.transform.indexOf('translate')==-1){
						this.style.transform+=' translate('+dx+'px,'+dy+'px)';
					}
					else{
						this.style.transform='translate('+dx+'px,'+dy+'px)';
					}
					return this;
				},
				copy:function(){
					var node=this.cloneNode(true);
					node.style.transform='';
					node.name=this.name;
					node.suit=this.suit;
					node.number=this.number;
					node.classList.remove('hidden');
					node.classList.remove('start');
					node.classList.remove('thrown');
					node.classList.remove('selectable');
					node.classList.remove('selected');
					node.classList.remove('removing');
					node.classList.remove('drawinghidden');
					node.node={
						name:node.querySelector('.name'),
						info:node.querySelector('.info'),
						intro:node.querySelector('.intro'),
						background:node.querySelector('.background'),
						image:node.querySelector('.image'),
					}
					var clone=true;
					var position;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string') node.classList.add(arguments[i]);
						else if(get.objtype(arguments[i])=='div') position=arguments[i];
						else if(typeof arguments[i]=='boolean') clone=arguments[i];
					}
					node.moveTo=lib.element.card.moveTo;
					node.moveDelete=lib.element.card.moveDelete;
					if(clone) this.clone=node;
					if(position) position.appendChild(node);
					return node;
				}
			},
			button:{
				exclude:function(){
					if(_status.event.excludeButton==undefined){
						_status.event.excludeButton=[];
					}
					_status.event.excludeButton.add(this);
				}
			},
			event:{
				finish:function(){
					this.finished=true;
				},
				goto:function(step){
					this.step=step-1;
				},
				redo:function(){
					this.step--;
				},
                set:function(key,value){
                    this[key]=value;
                    this._set.push([key,value]);
                    return this;
                },
                send:function(){
                    var skills={
                        global:lib.skill.global
                    };
                    var skillinfo={};
                    for(var i in lib.playerOL){
                        skills[i]={
                            skills:lib.playerOL[i].skills,
                            hiddenSkills:lib.playerOL[i].hiddenSkills,
                            additionalSkills:lib.playerOL[i].additionalSkills,
                            tempSkills:lib.playerOL[i].tempSkills,
                            storage:lib.playerOL[i].storage,
                        }
                    }
                    for(var i in lib.skill){
                        if(lib.skill[i].chooseButton&&lib.skill[i].enable){
                            skillinfo[i]=lib.skill[i].chooseButton;
                        }
                    }
                    this.player.send(function(name,args,set,event,stat,skills,skillinfo){
                        for(var i in skills){
                            if(i=='global'){
                                lib.skill.global=skills[i];
                            }
                            else if(lib.playerOL[i]){
                                for(var j in skills[i]){
                                    lib.playerOL[i][j]=skills[i][j];
                                }
                            }
                        }
                        for(var i in skillinfo){
                            if(!lib.skill[i]){
                                lib.skill[i]={};
                            }
                            lib.skill[i].chooseButton=skillinfo[i];
                        }
                        game.me.stat=[stat];
                        var next=game.me[name].apply(game.me,args);
                        for(var i=0;i<set.length;i++){
                            next.set(set[i][0],set[i][1]);
                        }
                        next._modparent=event;
                        game.resume();
                    },this.name,this._args||[],this._set,
                    get.stringifiedResult(this.parent,3),
                    this.player.getStat(),skills,skillinfo);
                    this.player.wait();
                    game.pause();
                },
                getParent:function(level){
                    var parent;
                    if(this._modparent&&game.online){
                        parent=this._modparent;
                    }
                    else{
                        parent=this.parent;
                    }
                    if(typeof level=='number'){
                        for(var i=1;i<level;i++){
                            parent=parent.parent;
                        }
                    }
                    return parent;
                },
				backup:function(skill){
					this._backup={
						filterButton:this.filterButton,
						selectButton:this.selectButton,
						filterTarget:this.filterTarget,
						selectTarget:this.selectTarget,
						filterCard:this.filterCard,
						selectCard:this.selectCard,
						position:this.position,
						forced:this.forced,
						aiexclude:this.aiexclude
					}
					if(skill){
						var info=get.info(skill);
						this.skill=skill;
						this.aiexclude=[];
						if(info.viewAs){
							if(info.filterButton!=undefined) this.filterButton=get.filter(info.filterButton);
							if(info.selectButton!=undefined) this.selectButton=info.selectButton;
							if(info.filterTarget!=undefined) this.filterTarget=get.filter(info.filterTarget);
							if(info.selectTarget!=undefined) this.selectTarget=info.selectTarget;
							if(info.filterCard!=undefined) this.filterCard=get.filter(info.filterCard);
							if(info.selectCard!=undefined) this.selectCard=info.selectCard;
							if(info.position!=undefined) this.position=info.position;
							if(info.forced!=undefined) this.forced=info.forced;
						}
						else{
							this.filterButton=info.filterButton?get.filter(info.filterButton):undefined;
							this.selectButton=info.selectButton;
							this.filterTarget=info.filterTarget?get.filter(info.filterTarget):undefined;
							this.selectTarget=info.selectTarget;
							this.filterCard=info.filterCard?get.filter(info.filterCard):undefined;
							this.selectCard=info.selectCard;
							this.position=info.position;
							this.forced=info.forced;
						}
					}
				},
				restore:function(){
					if(this._backup){
						this.filterButton=this._backup.filterButton;
						this.selectButton=this._backup.selectButton;
						this.filterTarget=this._backup.filterTarget;
						this.selectTarget=this._backup.selectTarget;
						this.filterCard=this._backup.filterCard;
						this.selectCard=this._backup.selectCard;
						this.position=this._backup.position;
						this.forced=this._backup.forced;
						this.aiexclude=this._backup.aiexclude;
					}
					delete this.skill;
				},
				isMine:function(){
					return (this.player&&this.player==game.me&&!_status.auto&&!this.player.isMad());
				},
                isOnline:function(){
                    return (this.player&&this.player.isOnline());
                },
				notLink:function(){
					return this.getParent().name!='_lianhuan'&&this.getParent().name!='_lianhuan2';
				},
				trigger:function(name){
					if(_status.video) return;
                    if(name=='gameStart'){
                        _status.gameStarted=true;
                    }
					var event=this;
					var i,j,iwhile,next,add;
					var totalPopulation=game.players.length+game.dead.length+1;
					if(event.player&&event.player.removed) return;
					if(!event.player&&name!='gameStart') return;
					event._endTrigger=event.player||game.me;

					if(!game.players.contains(event._endTrigger)){
						event._endTrigger=game.findNext(event._endTrigger);
					}

					var player=event._endTrigger;
					var list=[];
					for(i=0;i<game.players.length;i++){
						for(j in game.players[i].tempSkills){
							var expire=game.players[i].tempSkills[j];
							if(expire==name||
								(get.objtype(expire)=='array'&&expire.contains(name))||
								(typeof expire=='function'&&expire(event,game.players[i],name))){
								delete game.players[i].tempSkills[j];
								game.players[i].removeSkill(j);
							}
							else if(typeof expire=='object'){
								if(expire.player==name&&event.player==game.players[i]||
									expire.target==name&&event.target==game.players[i]||
									expire.source==name&&event.source==game.players[i]){
									delete game.players[i].tempSkills[j];
									game.players[i].removeSkill(j);
								}
							}
						}
					}
					for(iwhile=0;iwhile<totalPopulation;iwhile++){
						var skills=player.get('s',true).concat(lib.skill.global);
						game.expandSkills(skills);
						for(i=0;i<skills.length;i++){
							var trigger=get.info(skills[i]).trigger;
							if(trigger){
								add=false;
								if(player==event.player&&trigger.player){
									if(typeof trigger.player=='string'){
										if(trigger.player==name) add=true;
									}
									else if(trigger.player.contains(name)) add=true;
								}
								if((player==event.target||
									(event.multitarget&&event.targets&&event.targets.contains(player)))&&
									trigger.target){
									if(typeof trigger.target=='string'){
										if(trigger.target==name) add=true;
									}
									else if(trigger.target.contains(name)) add=true;
								}
								if(player==event.source&&trigger.source){
									if(typeof trigger.source=='string'){
										if(trigger.source==name) add=true;
									}
									else if(trigger.source.contains(name)) add=true;
								}
								if(trigger.global){
									if(typeof trigger.global=='string'){
										if(trigger.global==name) add=true;
									}
									else if(trigger.global.contains(name)) add=true;
								}
								if(add&&player.isOut()==false) list.push([skills[i],player]);
							}
						}
						player=player.next;
						if(!player||player==event._endTrigger){
							break;
						}
					}
					if(list.length){
						list.sort(lib.sort.priority);
						for(i=0;i<list.length;i++){
							game.createTrigger(name,list[i][0],list[i][1],event);
						}
					}
				},
				untrigger:function(all,player){
					if(all){
						this.next.length=0;
						this._triggered=5;
					}
					else if(player){
						this.notrigger.add(player);
						for(var i=0;i<this.next.length;i++){
							if(this.next[i].player==player) this.next.splice(i--,1);
						}
					}
					else{
						for(var i=0;i<this.next.length;i++){
							if(this.next[i]._trigger==this) this.next.splice(i--,1);
						}
					}
				}
			},
			dialog:{
				add:function(item,noclick,zoom){
					if(typeof item=='string'){
						if(noclick){
							var strstr=item;
							item=ui.create.div('',this.content);
							item.innerHTML=strstr;
						}
						else{
							item=ui.create.caption(item,this.content);
						}
					}
					else if(get.objtype(item)=='div'){
						this.content.appendChild(item);
					}
					else if(get.itemtype(item)=='cards'){
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item,'card',buttons,noclick));
					}
					else if(get.itemtype(item)=='players'){
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item,'player',buttons,noclick));
					}
					else{
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item[0],item[1],buttons,noclick));
					}
					ui.update();
					return item;
				},
				addSmall:function(item,noclick){
					return this.add(item,noclick,true);
				},
				open:function(){
					if(this.noopen) return;
					for(var i=0;i<ui.dialogs.length;i++){
						if(ui.dialogs[i]==this){
							this.show();
							this.refocus();
							ui.dialogs.remove(this);
							ui.dialogs.unshift(this);
							ui.update();
							return this;
						}
						if(ui.dialogs[i].static) ui.dialogs[i].unfocus();
						else ui.dialogs[i].hide();
					}
					ui.dialog=this;
					var translate;
					if(lib.config.remember_dialog&&lib.config.dialog_transform&&!this.classList.contains('fixed')){
						translate=lib.config.dialog_transform;
						this._dragtransform=translate;
						this.style.transform='translate('+translate[0]+'px,'+translate[1]+'px) scale(0.8)';
					}
					else{
						this.style.transform='scale(0.8)';
					}
					this.style.transitionProperty='opacity,transform';
					this.style.opacity=0;
					ui.arena.appendChild(this);
					ui.dialogs.unshift(this);
					ui.update();
					ui.refresh(this);
					if(lib.config.remember_dialog&&lib.config.dialog_transform&&!this.classList.contains('fixed')){
						this.style.transform='translate('+translate[0]+'px,'+translate[1]+'px) scale(1)';
					}
					else{
						this.style.transform='scale(1)';
					}
					this.style.opacity=1;
					var that=this;
					setTimeout(function(){
						that.style.transitionProperty='';
					},500);
					return this;
				},
				close:function(){
					ui.dialogs.remove(this);
					this.delete();
					if(ui.dialogs.length>0){
						ui.dialog=ui.dialogs[0];
						ui.dialog.show();
						ui.dialog.refocus();
						ui.update();
					}
					// if(ui.arenalog){
					// 	ui.arenalog.classList.remove('withdialog');
					// }
					return this;
				},
				setCaption:function(str){
					this.querySelector('.caption').innerHTML=str;
					return this;
				}
			},
			control:{
				add:function(item){
					var node=document.createElement('div');
					this.appendChild(node);
					node.link=item;
					node.innerHTML=get.translation(item);
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.control);

					if(lib.config.button_press){
						node.addEventListener(lib.config.touchscreen?'touchstart':'mousedown',function(){
							node.classList.add('controlthundertext');
							node.parentNode.classList.add('controlpressdown');
							node.parentNode.classList.add('controlpressdownx');
						});
						node.addEventListener(lib.config.touchscreen?'touchend':'mouseup',function(){
							node.classList.remove('controlthundertext');
							node.parentNode.classList.remove('controlpressdown');
							node.parentNode.classList.remove('controlpressdownx');
							// setTimeout(function(){
							// 	if(node.parentNode)
							// },200);
						});
						node.addEventListener(lib.config.touchscreen?'touchmove':'mousemove',function(){
							node.classList.remove('controlthundertext');
							node.parentNode.classList.remove('controlpressdown');
							node.parentNode.classList.remove('controlpressdownx');
						});
					}
				},
				close:function(){
					ui.controls.remove(this);
					this.delete();

					setTimeout(ui.updatec,100);


					if(ui.confirm==this) delete ui.confirm;
					if(ui.skills==this) delete ui.skills;
					if(ui.skills2==this) delete ui.skills2;
					if(ui.skills3==this) delete ui.skills3;
				},
				replace:function(){
					while(this.childNodes.length) this.firstChild.remove();
					var i,controls;
					if(get.objtype(arguments[0])=='array') controls=arguments[0];
					else controls=arguments;
					delete this.custom;
					for(i=0;i<controls.length;i++){
						if(typeof controls[i]=='function'){
							this.custom=controls[i];
						}
						else{
							this.add(controls[i]);
						}
					}
					if(this.childNodes.length){
						var width=0;
						for(i=0;i<this.childNodes.length;i++) width+=this.childNodes[i].offsetWidth;
						ui.refresh(this);
						this.style.width=width+'px';
					}
					ui.updatec();
					return this;
				}
			},
            client:{
                send:function(){
                    if(this.closed) return this;
                    var args=Array.from(arguments);
                    if(typeof args[0]=='function'){
                        args.unshift('exec');
                    }
                    for(var i=1;i<args.length;i++){
                        args[i]=get.stringifiedResult(args[i]);
                    }
                    try{
                        this.ws.send(JSON.stringify(args));
                    }
                    catch(e){
                        this.ws.close();
                    }
                    return this;
                },
                close:function(){
                    lib.node.clients.remove(this);
                    lib.node.observing.remove(this);
                    if(ui.removeObserve&&!lib.node.observing.length){
                        ui.removeObserve.remove();
                        delete ui.removeObserve;
                    }
                    this.closed=true;
                    if(_status.waitingForPlayer){
                        for(var i=0;i<game.connectPlayers.length;i++){
                            if(game.connectPlayers[i].playerid==this.id){
                                game.connectPlayers[i].uninitOL();
                                delete game.connectPlayers[i].playerid;
                            }
                        }
                        game.updateWaiting();
                    }
                    else if(lib.playerOL[this.id]){
                        var player=lib.playerOL[this.id];
                        player.setNickname(player.nickname+' - 离线');
                        game.broadcast(function(player){
                            player.setNickname(player.nickname+' - 离线');
                        },player);
                        player.unwait('ai');
                    }
                    return this;
                }
            },
            ws:{
                onopen:function(){
                    if(_status.connectCallback){
                        _status.connectCallback(true);
                        delete _status.connectCallback;
                    }
                },
                onmessage:function(messageevent){
                    var message;
                    try{
                        message=JSON.parse(messageevent.data);
                        if(!Array.isArray(message)||
                            typeof lib.message.client[message[0]]!=='function'){
                            throw('err');
                        }
                        for(var i=1;i<message.length;i++){
                            message[i]=get.parsedResult(message[i]);
                        }
                    }
                    catch(e){
                        console.log(e);
                        console.log('invalid message: '+messageevent.data);
                        return;
                    }
                    lib.message.client[message.shift()].apply(null,message);
                },
                onerror:function(e){
                    if(this._nocallback) return;
                    if(_status.connectCallback){
                        _status.connectCallback(false);
                        delete _status.connectCallback;
                    }
                    else{
                        alert('连接失败');
                    }
                },
                onclose:function(){
                    if(this._nocallback) return;
                    if(_status.connectCallback){
                        _status.connectCallback(false);
                        delete _status.connectCallback;
                    }
                    if(game.online){
                        localStorage.setItem(lib.configprefix+'directstart',true);
                        game.reload();
                    }
                    else{
                        game.saveConfig('reconnect_info');
                    }
                    game.online=false;
                    game.ws=null;
                }
            }
		},
		card:{
			list:[],
		},
		filter:{
			all:function(){
				return true;
			},
			buttonIncluded:function(button){
				return !(_status.event.excludeButton&&_status.event.excludeButton.contains(button));
			},
			filterButton:function(button){
				return true;
			},
            characterDisabled:function(i){
                if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) return true;
                if(lib.config.forbidai.contains(i)) return true;
                if(lib.config.banned.contains(i)) return true;
                var double_character=false;
                if(lib.config.mode=='guozhan'){
                    double_character=true;
                }
                else if(get.config('double_character')&&(lib.config.mode=='identity'||lib.config.mode=='stone')){
                    double_character=true;
                }
                else if(get.config('double_character_jiange')&&(lib.config.mode=='versus'&&_status.mode=='jiange')){
                    double_character=true;
                }
                if(double_character&&lib.config.forbiddouble.contains(i)){
                    return true;
                }
                if(get.config('ban_weak')){
                    if(lib.config.forbidall.contains(i)) return true;
                    if(!double_character&&(lib.rank.c.contains(i)||lib.rank.d.contains(i))){
                        return true;
                    }
                }
                if(get.config('ban_strong')&&(lib.rank.s.contains(i)||lib.rank.ap.contains(i))){
                    return true;
                }
            },
			cardEnabled:function(card,player,event){
				if(player==undefined) player=_status.event.player;
				var filter=get.info(card).enable;
				if(!filter) return;
				var mod=game.checkMod(card,player,'unchanged','cardEnabled',player.get('s'));
				if(mod!='unchanged') return mod;
				if(typeof filter=='boolean') return filter;
				if(typeof filter=='function') return filter(card,player);
			},
			cardRespondable:function(card,player){
				if(_status.event.name!='chooseToRespond') return true;
				if(player==undefined) player=_status.event.player;
				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player.get('s'));
				if(mod!='unchanged') return mod;
				return true;
			},
			cardUsable:function(card,player,event){
				if(player!=_status.event.player) return true;
				event=event||_status.event;
				if(event.getParent().name!='phaseUse') return true;
				if(event.getParent().player!=player) return true;
				var num=get.info(card).usable;
				if(typeof num=='function') num=num(card,player);
				num=game.checkMod(card,player,num,'cardUsable',player.get('s'));
				if(typeof num!='number') return true;
				else return(get.cardCount(card,player)<num);
			},
			cardAiIncluded:function(card){
				if(_status.event.isMine()) return true;
				return (_status.event.aiexclude.contains(card)==false);
			},
			filterCard:function(card,player,event){
				return (lib.filter.cardEnabled(card,player,event)&&
					lib.filter.cardUsable(card,player,event));
			},
			targetEnabled:function(card,player,target){
				if(card==undefined) return false;
				var filter=get.info(card).filterTarget;
				var mod=game.checkMod(card,player,target,'unchanged','playerEnabled',player.get('s'));
				if(mod==false) return false;
				var mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target.get('s'));
				if(mod!='unchanged') return mod;
				if(typeof filter=='boolean') return filter;
				if(typeof filter=='function') return filter(card,player,target);
			},
			targetInRange:function(card,player,target){
				var mod=game.checkMod(card,player,target,'unchanged','targetInRange',player.get('s'));
				var extra=0;
				if(mod!='unchanged'){
					if(typeof mod=='boolean') return mod;
					if(typeof mod=='number') extra=mod;
				}
				var range=get.info(card).range;
				if(range==undefined) return true;
				for(var i in range){
					if(range[i]<get.distance(player,target,i)+extra) return false;
				}
				return true;
			},
			filterTarget:function(card,player,target){
				return (lib.filter.targetEnabled(card,player,target)&&
					lib.filter.targetInRange(card,player,target));
			},
			notMe:function(card,player,target){
				return (player!=target)
			},
			isMe:function(card,player,target){
				return (player==target)
			},
			selectCard:function(){
				return [1,1];
			},
			selectTarget:function(){
				var card=get.card(),player=get.player();
				if(card==undefined) return;
				var range;
				var select=get.info(card).selectTarget;
				if(select==undefined){
					if(get.info(card).filterTarget==undefined) return[0,0];
					range=[1,1];
				}
				else if(typeof select=='number') range=[select,select];
				else if(get.itemtype(select)=='select') range=select;
				else if(typeof select=='function') range=select(card,player);
				game.checkMod(card,player,range,'selectTarget',player.get('s'));
				return range;
			},
			judge:function(card,player,target){
				var judges=target.get('j');
				for(var i=0;i<judges.length;i++){
					if(judges[i].name==card.name||judges[i].viewAs==card.name) return false;
				}
				return true;
			},
			autoRespondSha:function(){
				if(this.player.num('h','sha')) return false;
				if(this.player.num('h','hufu')) return false;
				if(this.player.hasSkillTag('respondSha',true)) return false;
				return true;
			},
			autoRespondShan:function(){
				if(this.player.num('h','shan')) return false;
				if(this.player.num('h','hufu')) return false;
				if(this.player.hasSkillTag('respondShan',true)) return false;
				return true;
			},
		},
		sort:{
			random:function(){
				return (Math.random()-0.5);
			},
			seat:function(a,b){
				var player=lib.tempSortSeat||_status.event.player;
				var delta=get.distance(player,a,'absolute')-get.distance(player,b,'absolute');
				if(delta) return delta;
				delta=parseInt(a.dataset.position)-parseInt(b.dataset.position);
				if(player.side==game.me.side) return delta;
				return -delta;
			},
			position:function(a,b){
				return parseInt(a.dataset.position)-parseInt(b.dataset.position);
			},
			priority:function(a,b){
				var i1=get.info(a[0]),i2=get.info(b[0]);
				if(i1.priority==undefined) i1.priority=0;
				if(i2.priority==undefined) i2.priority=0;
				if(i1.priority==i2.priority){
					if(i1.forced==undefined&&i2.forced==undefined) return 0;
					if(i1.forced&&i2.forced) return 0;
					if(i1.forced) return 1;
					if(i2.forced) return -1;
				}
				return i2.priority-i1.priority;
			},
			number:function(a,b){
				return get.number(a)-get.number(b);
			},
			number2:function(a,b){
				return get.number(b)-get.number(a);
			},
            capt:function(a,b){
                var aa=a,bb=b;
                if(aa.indexOf('_')!=-1){
                    aa=aa.slice(aa.indexOf('_')+1);
                }
                if(bb.indexOf('_')!=-1){
                    bb=bb.slice(bb.indexOf('_')+1);
                }
                if(aa!=bb){
                    return aa>bb?1:-1;
                }
                return a>b?1:-1;
            }
		},
		skill:{
			global:[],
			storage:{},
			unequip:{},
			mad:{
				mark:true,
				intro:{
					content:'已进入混乱状态',
					name:'混乱'
				}
			},
			ghujia:{
				intro:{
					content:function(content,player){
						return '已有'+get.cnNumber(player.hujia)+'点护甲值';
					}
				}
			},
			_recoverCheck:{
				trigger:{player:'recoverBefore'},
				forced:true,
				priority:20,
				popup:false,
				filter:function(event,player){
					return player.hp>=player.maxHp;
				},
				content:function(){
					trigger.untrigger();
					trigger.finish();
				},
			},
			_turnover:{
				trigger:{player:'phaseBefore'},
				forced:true,
				priority:20,
				popup:false,
				// filter:function(event,player){
				// 	return player.isTurnedOver();
				// },
				content:function(){
					if(player.isTurnedOver()){
						trigger.untrigger();
						trigger.finish();
						player.turnOver();
						player.phaseSkipped=true;
					}
					else{
						player.phaseSkipped=false;
					}
				},
			},
			_out:{
				trigger:{target:'useCardToBefore',player:['damageBefore','phaseBefore']},
				forced:true,
				popup:false,
				priority:20,
				filter:function(event,player){
					return player.isOut();
				},
				content:function(){
					trigger.untrigger();
					trigger.finish();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.isOut()) return 0;
						}
					},
					threaten:function(player,target){
						if(target.isOut()) return 0;
					}
				}
			},
			_phasebegin:{
				trigger:{player:'phaseBegin'},
				forced:true,
				priority:20,
				popup:false,
				content:function(){
					if(!player.noPhaseDelay&&lib.config.show_phase_prompt){
						player.popup('回合开始');
					}
					if(lib.config.glow_phase){
						if(_status.currentPhase){
							_status.currentPhase.classList.remove('glow_phase');
                            game.broadcast(function(player){
                                player.classList.remove('glow_phase');
                            },_status.currentPhase);
						}
						player.classList.add('glow_phase');
                        game.broadcast(function(player){
                            player.classList.add('glow_phase');
                        },player);
					}
					_status.currentPhase=player;
                    game.syncState();
					game.addVideo('phaseChange',player);
					game.log();
					game.log(player,'的回合开始');
					game.phaseNumber++;
					player._noVibrate=true;
					if(get.config('identity_mode')!='zhong'&&!_status.connectMode){
						var num;
						switch(get.config('auto_identity')){
							case 'one':num=1;break;
							case 'two':num=2;break;
							case 'three':num=3;break;
							case 'always':num=-1;break;
							default:num=0;break;
						}
						if(num&&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
							if(!_status.video) player.popup('显示身份');
							_status.identityShown=true;
							game.showIdentity(false);
						}
					}
					player.ai.tempIgnore=[];
					player.stat.push({card:{},skill:{}});
				},
			},
			_save:{
				trigger:{source:'dying',player:'dying'},
				priority:5,
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.player.hp>0) return false;
					if(event.source&&event.source!=player) return false;
					return true;
				},
				content:function(){
					"step 0"
					event.dying=_status.dying;
					"step 1"
					trigger.start=trigger.source||trigger.player;
					var str=get.translation(trigger.player.name)+'濒死，是否帮助？';
					_status.dying=event.dying;
					if(lib.config.tao_enemy&&event.dying.side!=player.side&&lib.config.mode!='identity'&&lib.config.mode!='guozhan'){
						event._result={bool:false}
					}
					else if(player.isOnline()||(_status.connectMode&&player==game.me)||player.hasSkillTag('save',true)||player.num('h','tao')||player.num('h','spell_zhiliaoshui')||
					(player==event.dying&&(player.num('h','jiu')||player.num('h','hufu')||player.num('h','tianxianjiu')))){
						player.chooseToUse({
							filterCard:function(card,player){
								var mod=game.checkMod(card,player,'unchanged','cardSavable',player.get('s'));
								if(mod!='unchanged') return mod;
								var savable=get.info(card).savable;
								if(typeof savable=='function') savable=savable(card,player,_status.event.dying);
								return savable;
							},
							filterTarget:trigger.player,
							prompt:str,
							ai1:function(){return 1;},
							ai2:ai.get.effect,
							type:'dying',
							targetRequired:true,
							dying:event.dying
						});
					}
					else{
						event._result={bool:false}
					}
					"step 2"
					if(result.bool){
						if(trigger.player.hp<=0&&trigger.player.isAlive()&&!trigger.player.isOut()&&!trigger.player.removed) event.goto(0);
						else trigger.untrigger();
					}
					else{
						for(var i=0;i<20;i++){
							if(event.player.next!=trigger.start){
								event.player=event.player.next;
								if(!event.player.isOut()){
									event.goto(1);
									break;
								}
							}
							else{
								break;
							}
						}
					}
				}
			},
			_ismin:{
				mod:{
					cardEnabled:function(card,player){
						if(player.isMin()){
							if(get.type(card)=='equip') return false;
						}
					}
				}
			},
			_chongzhu:{
				enable:'phaseUse',
				prompt:'将要重铸的牌置于弃牌堆并摸一张牌',
				filter:function(event,player){
					if(player.isMin()&&lib.config.mode=='stone') return false;
					return (player.get('h',function(card){
						return get.info(card).chongzhu;
					}).length);
				},
				filterCard:function(card){
					return get.info(card).chongzhu;
				},
				prepare:function(cards,player){
					player.$throw(cards,1000);
				},
				check:function(card){
					if(get.type(card)=='stonecharacter'&&_status.event.player.num('h',{type:'stonecharacter'})<=1){
						return 0;
					}
					return 1;
				},
				discard:false,
				delay:0.5,
				content:function(){
					"step 0"
					if(lib.config.mode=='stone'&&_status.mode=='deck'&&
					!player.isMin()&&get.type(cards[0]).indexOf('stone')==0){
						var list=get.stonecard(1,player.career);
						if(list.length){
							player.gain(game.createCard(list.randomGet()),'draw');
						}
						else{
							player.draw({drawDeck:1})
						}
					}
					else{
						player.draw();
					}
					"step 1"
					for(var i=0;i<cards.length;i++){
						ui.discardPile.appendChild(cards[i]);
					}
				},
				ai:{
					basic:{
						order:6
					},
					result:{
						player:1,
					},
				}
			},
			_lianhuan:{
				trigger:{player:'damageAfter'},
				filter:function(event,player){
					return (event.nature&&lib.linked.contains(event.nature)&&event.player.classList.contains('linked'));
				},
				forced:true,
				popup:false,
				content:function(){
					"step 0"
					player.link();
					"step 1"
					var players=game.players.slice(0);
					lib.tempSortSeat=player;
					players.sort(lib.sort.seat);
					delete lib.tempSortSeat;
					for(var i=0;i<players.length;i++){
						if(players[i].classList.contains('linked')){
							if(trigger.source){
								players[i].damage(trigger.num,trigger.nature,trigger.source,trigger.cards,trigger.card);
							}
							else{
								players[i].damage(trigger.num,trigger.nature,'nosource',trigger.cards,trigger.card);
							}
							return;
						}
					}
				}
			},
			_lianhuan2:{
				trigger:{global:'damageAfter'},
				filter:function(event,player){
					return (event.nature&&lib.linked.contains(event.nature)&&event.player.classList.contains('linked')&&
						event.player.classList.contains('dead')&&player.classList.contains('linked'));
				},
				forced:true,
				content:function(){
					"step 0"
					trigger.player.classList.remove('linked');
					"step 1"
					if(trigger.source){
						player.damage(trigger.num,trigger.nature,trigger.source,trigger.cards,trigger.card);
					}
					else{
						player.damage(trigger.num,trigger.nature,'nosource',trigger.cards,trigger.card);
					}
				}
			},
			_lianhuan3:{
				trigger:{global:'damageAfter'},
				priority:-10,
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.player.classList.contains('dead');
				},
				content:function(){
					trigger.player.classList.remove('linked');
				}
			},
			_lianhuan4:{
				trigger:{global:'dieAfter'},
				priority:-10,
				forced:true,
				popup:false,
				filter:function(event,player){
					return event.player.classList.contains('dead')&&event.getParent(2).name!='damage';
				},
				content:function(){
					window.x=event;
					trigger.player.classList.remove('linked');
				}
			}
		},
		character:{},
		perfectPair:{},
		cardPile:{},
        message:{
            server:{
                init:function(version,config,banned_info){
                    if(lib.node.banned.contains(banned_info)){
                        this.send('denied','banned');
                    }
                    else if(config.id&&lib.playerOL&&lib.playerOL[config.id]&&lib.playerOL[config.id].isOffline()){
                        var player=lib.playerOL[config.id];
                        player.setNickname();
                        player.ws=this;
                        this.id=config.id;
                        game.broadcast(function(player){
                            player.setNickname();
                        },player);
                        this.send('reinit',lib.configOL,get.arenaState(),game.getState?game.getState():{},game.ip);
                    }
                    else if(version!=lib.versionOL){
                        this.send('denied','version');
                        lib.node.clients.remove(this);
                        this.closed=true;
                    }
                    else if(!_status.waitingForPlayer){
                        if(game.phaseNumber&&lib.configOL.observe){
                            lib.node.observing.push(this);
                            this.send('reinit',lib.configOL,get.arenaState(),game.getState?game.getState():{},game.ip,game.me.playerid);
                            if(!ui.removeObserve){
                                ui.removeObserve=ui.create.system('移除旁观',function(){
                                    lib.configOL.observe=false;
                                    while(lib.node.observing.length){
                                        lib.node.observing.shift().ws.close();
                                    }
                                    this.remove();
                                    delete ui.removeObserve;
                                },true);
                            }
                        }
                        else{
                            this.send('denied','gaming');
                            lib.node.clients.remove(this);
                            this.closed=true;
                        }
                    }
                    else if(lib.node.clients.length>=parseInt(lib.configOL.number)){
                        this.send('denied','number');
                        lib.node.clients.remove(this);
                        this.closed=true;
                    }
                    else{
                        if(config){
                            this.avatar=config.avatar;
                            this.nickname=config.nickname;
                        }
                        for(var i=0;i<game.connectPlayers.length;i++){
                            if(game.connectPlayers[i].classList.contains('unselectable2')) continue;
                            if(game.connectPlayers[i]!=game.me&&!game.connectPlayers[i].playerid){
                                game.connectPlayers[i].playerid=this.id;
                                game.connectPlayers[i].initOL(this.nickname,this.avatar);
                                game.connectPlayers[i].ws=this;
                                break;
                            }
                        }
                        this.send('init',this.id,lib.configOL,game.ip);
                    }
                },
                inited:function(){
                    this.inited=true;
                    if(_status.waitingForPlayer){
                        game.updateWaiting();
                    }
                },
                reinited:function(){
                    this.inited=true;
                },
                result:function(result){
                    var player=lib.playerOL[this.id];
                    if(player){
                        player.unwait(result);
                    }
                },
                chat:function(id,str){
                    var player;
                    if(lib.playerOL[id]){
                        player=lib.playerOL[id];
                    }
                    else if(game.connectPlayers){
                        for(var i=0;i<game.connectPlayers.length;i++){
                            if(game.connectPlayers[i].playerid==id){
                                player=game.connectPlayers[i];break;
                            }
                        }
                    }
                    if(player) lib.element.player.chat.call(player,str);
                },
                giveup:function(player){
                    game.log(player,'投降');
                    player.popup('投降');
                    setTimeout(function(){
                        player.die('nosource');
                    },1000);
                },
                auto:function(){
                    var player=lib.playerOL[this.id];
                    if(player){
                        player.isAuto=true;
                        player.setNickname(player.nickname+' - 托管');
                        game.broadcast(function(player){
                            player.setNickname(player.nickname+' - 托管');
                        },player);
                    }
                },
                unauto:function(){
                    var player=lib.playerOL[this.id];
                    if(player){
                        player.isAuto=false;
                        player.setNickname(player.nickname);
                        game.broadcast(function(player){
                            player.setNickname(player.nickname);
                        },player);
                    }
                },
                exec:function(func){
                    // if(typeof func=='function'){
                    //     var args=Array.from(arguments);
                    //     args.shift();
                    //     func.apply(this,args);
                    // }
                },
            },
            client:{
                opened:function(){
                    game.send('init',lib.versionOL,{
                        id:game.onlineID,
                        avatar:lib.config.connect_avatar,
                        nickname:lib.config.connect_nickname
                    },lib.config.banned_info);
                },
                createroom:function(){
                    game.online=false;
                    lib.node={};
                    for(var i=0;i<ui.rooms.length;i++){
                        ui.rooms[i].delete();
                    }
                    delete ui.rooms;
                    game.switchMode('identity');
                },
                roomlist:function(list){
                    game.online=true;
                    lib.config.recentIP.remove(_status.ip);
                    lib.config.recentIP.unshift(_status.ip);
                    lib.config.recentIP.splice(5);
                    game.saveConfig('recentIP',lib.config.recentIP);
                    _status.connectMode=true;

                    game.clearArena();
                    ui.pause.hide();
                    ui.auto.hide();

                    if(ui.ipnode){
                        ui.ipnode.remove();
                        delete ui.ipnode;
                    }
                    if(ui.iptext){
                        ui.iptext.remove();
                        delete ui.iptext;
                    }
                    if(ui.ipbutton){
                        ui.ipbutton.remove();
                        delete ui.ipbutton;
                    }
                    if(ui.recentIP){
                        ui.recentIP.remove();
                        delete ui.recentIP;
                    }
                    clearTimeout(_status.createNodeTimeout);

                    var proceed=function(){
                        var list2=['re_caocao','liubei','sunquan'];
                        ui.rooms=[];
                        game.ip=get.trimip(_status.ip);
                        for(var i=0;i<3;i++){
                            var player=ui.create.player(ui.window);
                            player.dataset.position='c'+i;
                            player.classList.add('connect');
                            player.roomindex=i;
                            if(!list[i]||!list[i].config){
                                player.initOL('空房间',list2[i])
                            }
                            else{
                                var config=list[i].config;
                                player.initOL(get.cnNumber(parseInt(config.number))+'人'+get.translation(config.mode),list[i].owner[1]);
                                player.setNickname(list[i].owner[0]);
                            }
                            ui.rooms.push(player);
                        }
                    }
                    if(_status.event.getParent()){
                        game.forceOver('noover',proceed);
                    }
                    else{
                        proceed();
                    }
                },
                init:function(id,config,ip){
                    game.online=true;
                    game.onlineID=id;
                    game.ip=ip;
                    game.saveConfig('reconnect_info',[_status.ip,id]);
                    lib.config.recentIP.remove(_status.ip);
                    lib.config.recentIP.unshift(_status.ip);
                    lib.config.recentIP.splice(5);
                    game.saveConfig('recentIP',lib.config.recentIP);
                    _status.connectMode=true;
                    lib.configOL=config;
        			lib.playerOL={};
        			lib.cardOL={};

                    game.clearArena();
                    game.finishCards();
                    ui.create.roomInfo();
                    ui.create.chat();
                    ui.create.connectPlayers(ip);
                    ui.pause.hide();
                    ui.auto.hide();
                    if(ui.ipnode){
                        ui.ipnode.remove();
                        delete ui.ipnode;
                    }
                    if(ui.iptext){
                        ui.iptext.remove();
                        delete ui.iptext;
                    }
                    if(ui.ipbutton){
                        ui.ipbutton.remove();
                        delete ui.ipbutton;
                    }
                    if(ui.recentIP){
                        ui.recentIP.remove();
                        delete ui.recentIP;
                    }
                    clearTimeout(_status.createNodeTimeout);

                    var proceed=function(){
                        game.loadModeAsync(config.mode,function(mode){
                            for(var i in mode.ai){
        						if(typeof mode.ai[i]=='object'){
        							if(ai[i]==undefined) ai[i]={};
        							for(j in mode.ai[i]){
        								ai[i][j]=lib.init.eval(mode.ai[i][j]);
        							}
        						}
        						else{
        							ai[i]=lib.init.eval(mode.ai[i]);
        						}
        					}
                            for(var i in mode.translate){
                                lib.translate[i]=mode.translate[i];
                            }
                            if(mode.game){
                                game.getIdentityList=lib.init.eval(mode.game.getIdentityList);
                                game.updateState=lib.init.eval(mode.game.updateState);
                                game.getRoomInfo=lib.init.eval(mode.game.getRoomInfo);
                                if(mode.element&&mode.element.player&&mode.element.player.$dieAfter){
                                    lib.element.player.$dieAfter=lib.init.eval(mode.element.player.$dieAfter);
                                }
                            }
                            _status.event={
                                finished:true,
                                next:[],
                            };
                            _status.paused=false;
                            game.createEvent('game',false).content=lib.init.startOnline;
                            game.loop();
                            game.send('inited');
                        });
                    }
                    if(_status.event.getParent()){
                        game.forceOver('noover',proceed);
                    }
                    else{
                        proceed();
                    }
                    for(var i in lib.characterPack){
        				for(var j in lib.characterPack[i]){
        					lib.character[j]=lib.character[j]||lib.characterPack[i][j];
        				}
        			}
                },
                reinit:function(config,state,state2,ip,observe){
                    if(ui.ipnode){
                        ui.ipnode.remove();
                        delete ui.ipnode;
                    }
                    if(ui.iptext){
                        ui.iptext.remove();
                        delete ui.iptext;
                    }
                    if(ui.ipbutton){
                        ui.ipbutton.remove();
                        delete ui.ipbutton;
                    }
                    if(ui.recentIP){
                        ui.recentIP.remove();
                        delete ui.recentIP;
                    }
                    clearTimeout(_status.createNodeTimeout);
                    game.online=true;
                    game.ip=ip;
                    if(observe){
                        game.onlineID=null;
                    }
                    game.saveConfig('reconnect_info',[_status.ip,game.onlineID]);
                    _status.connectMode=true;
                    lib.configOL=config;
        			lib.playerOL={};
        			lib.cardOL={};

                    game.loadModeAsync(config.mode,function(mode){
                        for(var i in mode.ai){
                            if(typeof mode.ai[i]=='object'){
                                if(ai[i]==undefined) ai[i]={};
                                for(j in mode.ai[i]){
                                    ai[i][j]=lib.init.eval(mode.ai[i][j]);
                                }
                            }
                            else{
                                ai[i]=lib.init.eval(mode.ai[i]);
                            }
                        }
                        for(var i in mode.translate){
                            lib.translate[i]=mode.translate[i];
                        }
                        if(mode.game){
                            game.getIdentityList=lib.init.eval(mode.game.getIdentityList);
                            game.updateState=lib.init.eval(mode.game.updateState);
                            if(mode.element&&mode.element.player&&mode.element.player.$dieAfter){
                                lib.element.player.$dieAfter=lib.init.eval(mode.element.player.$dieAfter);
                            }
                        }
                        state=get.parsedResult(state);
                        game.players=[];
                        game.dead=[];
                        for(var i in lib.characterPack){
            				for(var j in lib.characterPack[i]){
            					lib.character[j]=lib.character[j]||lib.characterPack[i][j];
            				}
            			}
                        game.clearArena();
                        game.finishCards();
                        if(!observe) ui.create.chat();
                        else{
                            ui.create.system('退出旁观',function(){
                                game.saveConfig('reconnect_info');
                                game.reload();
                            },true);
                        }
                        ui.arena.dataset.number=state.number;
                        var pos=state.players[observe||game.onlineID].position;
                        for(var i in state.players){
                            var info=state.players[i];
                            var player=ui.create.player(ui.arena).animate('start');
        					player.dataset.position=(info.position<pos)?info.position-pos+parseInt(state.number):info.position-pos;
                            player.init(info.name,info.name2);
                            player.playerid=i;
                            player.nickname=info.nickname;
                            player.identity=info.identity;
                            player.identityShown=info.identityShown;
                            player.hp=info.hp;
                            player.maxHp=info.maxHp;
                            player.hujia=info.hujia;
                            player.setNickname();
                            if(info.dead){
                                player.classList.add('dead');
                                if(lib.config.die_flip){
            						player.$dieflip();
            					}
                                if(lib.element.player.$dieAfter){
                                    lib.element.player.$dieAfter.call(player);
                                }
                                game.dead.push(player);
                            }
                            else{
                                game.players.push(player);
                            }
                            if(info.linked){
                                player.classList.add('linked');
                            }
                            if(info.turnedover){
                                player.classList.add('turnedover');
                            }
                            if(i==observe||i==game.onlineID){
                                game.me=player;
                            }

                            player.directgain(info.handcards);
                            lib.playerOL[i]=player;
                            for(var i=0;i<info.equips.length;i++){
                                player.$equip(info.equips[i]);
                            }
                            for(var i=0;i<info.judges.length;i++){
                                player.node.judges.appendChild(info.judges[i]);
                            }
                            if(player==game.me||player.identityShown){
                                player.setIdentity();
                            }
                            else if(!game.getIdentityList&&info.identityNode){
                                player.node.identity.innerHTML=info.identityNode[0];
                                player.node.identity.dataset.color=info.identityNode[1];
                            }
                            else{
                                player.setIdentity('cai');
                            }
                            player.update();
                        }
                        game.arrangePlayers();
                        ui.create.me(true);

                        _status.event={
                            finished:true,
                            next:[],
                        };
                        _status.paused=false;

                        if(game.updateState){
                            game.updateState(state2);
                        }
                        var next=game.createEvent('game',false);
                        next.content=lib.init.startOnline;
                        if(observe){
                            next.custom.replace.target=function(player){
                                if(player.isAlive()) game.swapPlayer(player);
                            }
                        }
                        game.loop();
                        game.send('reinited');
                        if(!observe&&game.me&&game.me.isDead()){
                            ui.exit=ui.create.control('退出联机',function(){
                                game.saveConfig('reconnect_info');
                                game.reload();
                            });
                        }
                    });
                },
                exec:function(func){
                    if(typeof func=='function'){
                        var args=Array.from(arguments);
                        args.shift();
                        func.apply(this,args);
                    }
                },
                denied:function(reason){
                    switch(reason){
                        case 'version':alert('加入失败：版本不匹配');break;
                        case 'gaming':alert('加入失败：游戏已开始');break;
                        case 'number':alert('加入失败：房间已满');break;
                        case 'banned':alert('加入失败：房间拒绝你加入');break;
                        case 'offline':
                        if(_status.paused&&_status.event.name=='game'){
                            setTimeout(game.resume,500);
                        }
                        break;
                    }
                    game.ws.close();
                    if(_status.connectDenied){
                        _status.connectDenied();
                    }
                },
                cancel:function(id){
                    if(_status.event.id==id&&_status.event.isMine()&&_status.paused&&_status.imchoosing){
                        ui.click.cancel();
                        if(ui.confirm){
                            ui.confirm.close();
                        }
                        if(_status.event.result){
                            _status.event.result.id=id;
                        }
                    }
                },
                closeDialog:function(id){
                    var dialog=get.idDialog(id);
                    if(dialog){
                        dialog.close();
                    }
                },
                createDialog:function(id){
                    var args=Array.from(arguments);
                    args.shift();
                    ui.create.dialog.apply(this,args).videoId=id;
                },
                gameStart:function(){
                    for(var i=0;i<game.connectPlayers.length;i++){
                        game.connectPlayers[i].delete();
                    }
                    delete game.connectPlayers;
                    if(ui.connectStartButton){
                        ui.connectStartButton.delete();
                        delete ui.connectStartButton;
                    }
                    if(ui.connectStartBar){
                        ui.connectStartBar.delete();
                        delete ui.connectStartBar;
                    }
                    if(ui.roomInfo){
                        ui.roomInfo.remove();
                        delete ui.roomInfo;
                    }
                    ui.auto.show();
                    ui.pause.show();
                    if(lib.config.show_cardpile){
                        ui.cardPileButton.style.display='';
                    }
                },
                updateWaiting:function(map){
                    for(var i=0;i<map.length;i++){
                        if(map[i]=='disabled'){
                            game.connectPlayers[i].classList.add('unselectable2');
                        }
                        else{
                            game.connectPlayers[i].classList.remove('unselectable2');
                            if(map[i]){
                                if(i==0){
                                    game.connectPlayers[i].setIdentity('zhu');
                                }
                                game.connectPlayers[i].initOL(map[i][0],map[i][1]);
                                game.connectPlayers[i].playerid=map[i][2];
                            }
                            else{
                                game.connectPlayers[i].uninitOL();
                                delete game.connectPlayers[i].playerid;
                            }
                        }
                    }
                }
            }
        },
		group:['wei','shu','wu','qun'],
		nature:['fire','thunder','poison'],
		linked:['fire','thunder'],
	};
	var game={
        online:false,
        onlineID:null,
        closeMenu:function(){
            if(!ui.menuContainer.classList.contains('hidden')){
                ui.click.configMenu();
            }
        },
        closePopped:function(){
            if(ui.currentpopped){
                if(ui.currentpopped._uiintro){
                    ui.currentpopped._uiintro.delete();
                    delete ui.currentpopped._uiintro;
                }
                delete ui.currentpopped;
            }
        },
        broadcast:function(){
            if(!lib.node||!lib.node.clients||game.online) return;
            for(var i=0;i<lib.node.clients.length;i++){
                if(lib.node.clients[i].inited){
                    lib.node.clients[i].send.apply(lib.node.clients[i],arguments);
                }
            }
        },
        broadcastAll:function(func){
            if(game.online) return;
            game.broadcast.apply(this,arguments);
            var args=Array.from(arguments);
            args.shift();
            func.apply(this,args);
        },
        syncState:function(){
            if(game.getState&&game.updateState){
                game.broadcast(function(state,current){
    				game.updateState(state);
                    _status.currentPhase=current;
    			},game.getState(),_status.currentPhase);
            }
		},
        updateWaiting:function(){
            var map=[];
            for(var i=0;i<game.connectPlayers.length;i++){
                var player=game.connectPlayers[i];
                if(player.playerid){
                    map[i]=[player.nickname,player.avatar,player.playerid];
                }
                else if(player.classList.contains('unselectable2')){
                    map[i]='disabled';
                }
                else{
                    map[i]=null;
                }
            }
            game.broadcast('updateWaiting',map);
        },
        waitForPlayer:function(func){
            var next=game.createEvent('waitForPlayer',false);
            next.func=func;
            next.content=function(){
                'step 0'
                ui.auto.hide();
                ui.pause.hide();

                game.createServer();
                if(event.func){
                    event.func();
                }
                if(game.ws){
                    game.send('server','config',lib.configOL);
                }

                ui.create.connectPlayers(game.ip);
                var me=game.connectPlayers[0];
                me.initOL(lib.config.connect_nickname,lib.config.connect_avatar);
                me.playerid=1;
                me.setIdentity('zhu');
                _status.waitingForPlayer=true;

                game.pause();
                'step 1'
                _status.waitingForPlayer=false;
                for(var i=0;i<game.connectPlayers.length;i++){
                    game.connectPlayers[i].delete();
                }
                delete game.connectPlayers;
                game.broadcast('gameStart');
                game.delay(2);
                ui.auto.show();
                ui.pause.show();
                if(lib.config.show_cardpile){
                    ui.cardPileButton.style.display='';
                }
            }
        },
        countDown:function(time,onEnd){
            time=parseInt(time);
            if(!time) return;
            if(time<=0) return;
            var current=time;
            ui.timer.set(current,1);
            _status.countDown=setInterval(function(){
                if(current){
                    ui.timer.set(--current,current/time);
                }
                else{
                    clearInterval(_status.countDown);
                    delete _status.countDown;
                    if(onEnd) onEnd();
                }
            },1000);
        },
        countChoose:function(clear){
            if(_status.imchoosing){
                return;
            }
            _status.imchoosing=true;
            if(_status.connectMode&&!_status.countDown){
                ui.timer.show();
                var num;
                if(_status.connectMode){
                    num=lib.configOL.choose_timeout;
                }
                else{
                    num=get.config('choose_timeout');
                }
                game.countDown(parseInt(num),function(){
                    ui.click.auto();
                    ui.timer.hide();
                });
                if(!game.online&&game.me){
                    game.me.showTimer();
                }
            }
        },
        stopCountChoose:function(){
            if(_status.countDown){
                clearInterval(_status.countDown);
                delete _status.countDown;
                ui.timer.hide();
            }
            if(_status.connectMode&&!game.online&&game.me){
                game.me.hideTimer();
            }
        },
        connect:function(ip,callback){
            if(game.online) return;
            var withport=false;
            var index=ip.lastIndexOf(':');
            if(index!=-1){
                index=parseFloat(ip.slice(index+1));
                if(index&&Math.floor(index)==index){
                    withport=true;
                }
            }
            if(!withport){
                ip=ip+':8080';
            }
            _status.connectCallback=callback;
            try{
                if(game.ws){
                    game.ws._nocallback=true;
                    game.ws.close();
                    delete game.ws;
                }
                game.ws=new WebSocket('ws://'+ip+'');
            }
            catch(e){
                alert('错误：无效联机地址');
                if(callback){
                    callback(false);
                }
                return;
            }
            game.ws.onopen=lib.element.ws.onopen;
            game.ws.onmessage=lib.element.ws.onmessage;
            game.ws.onerror=lib.element.ws.onerror;
            game.ws.onclose=lib.element.ws.onclose;
            _status.ip=ip;
        },
        send:function(){
            if(game.ws){
                var args=Array.from(arguments);
                if(typeof args[0]=='function'){
                    args.unshift('exec');
                }
                game.ws.send(JSON.stringify(get.stringifiedResult(args)));
            }
        },
        createServer:function(){
            lib.node.clients=[];
            lib.node.banned=[];
            lib.node.observing=[];
            lib.node.torespond={};
            lib.node.torespondtimeout={};
            lib.configOL={};
			lib.playerOL={};
			lib.cardOL={};
            ui.create.chat();

            if(game.ws){

            }
            else{
                var WebSocketServer=require('ws').Server;
                var wss=new WebSocketServer({port:8080});

                var interfaces = require('os').networkInterfaces();
                for(var devName in interfaces){
                    var iface = interfaces[devName];
                    for(var i=0;i<iface.length;i++){
                        var alias = iface[i];
                        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                            game.ip=alias.address;break;
                        }
                    }
                    if(game.ip) break;
                }

                wss.on('connection',lib.init.connection);
            }
        },
		playAudio:function(){
			if(_status.video&&arguments[1]!='video') return;
			var str='';
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
					str+='/'+arguments[i];
				}
				if(_status.video) break;
			}
			if(_status.skillaudio.contains(str)) return;
			_status.skillaudio.add(str);
			game.addVideo('playAudio',null,str);
			setTimeout(function(){
				_status.skillaudio.remove(str);
			},1000);
			var audio=document.createElement('audio');
			audio.autoplay=true;
			audio.volume=lib.config.volumn_audio/8;
			audio.src=lib.assetURL+'audio'+str+'.mp3';
			audio.addEventListener('ended',function(){
				this.remove();
			});
			audio.onerror=function(){
				if(this._changed){
					this.remove();
				}
				else{
					this.src=lib.assetURL+'audio'+str+'.ogg';
					this._changed=true;
				}
			};
			ui.window.appendChild(audio);
		},
		trySkillAudio:function(skill,player,directaudio){
            game.broadcast(game.trySkillAudio,skill,player,directaudio);
			var info=get.info(skill);
			if(!info) return;
			if((!info.direct||directaudio)&&lib.config.background_speak&&
				(!lib.skill.global.contains(skill)||lib.skill[skill].forceaudio)){
				var audioname=skill;
				var audioinfo=info.audio;
				if(typeof audioinfo=='string'){
					audioname=audioinfo;
					if(lib.skill[audioinfo]){
						audioinfo=lib.skill[audioinfo].audio;
					}
				}
				else if(Array.isArray(audioinfo)){
					audioname=audioinfo[0];
					audioinfo=audioinfo[1];
				}
				if(Array.isArray(info.audioname)&&player){
					if(info.audioname.contains(player.name)){
						audioname+='_'+player.name;
					}
					else if(info.audioname.contains(player.name1)){
						audioname+='_'+player.name1;
					}
					else if(info.audioname.contains(player.name2)){
						audioname+='_'+player.name2;
					}
				}
				if(typeof audioinfo=='number'){
					game.playAudio('skill',audioname+Math.ceil(audioinfo*Math.random()));
				}
				else if(audioinfo){
					game.playAudio('skill',audioname);
				}
				else if(lib.config.background_ogg&&info.audio!==false){
					game.playSkillAudio(audioname);
				}
			}
		},
		playSkillAudio:function(name){
			if(_status.video&&arguments[1]!='video') return;
			if(_status.skillaudio.contains(name)) return;
			game.addVideo('playSkillAudio',null,name);
			if(name.indexOf('|')<name.lastIndexOf('|')){
				name=name.slice(name.lastIndexOf('|')+1);
			}
			_status.skillaudio.add(name);
			setTimeout(function(){
				_status.skillaudio.remove(name);
			},1000);
			var str='audio/skill/';
			var audio=document.createElement('audio');
			audio.autoplay=true;
			audio.volume=lib.config.volumn_audio/8;
			audio.src=lib.assetURL+str+name+'.mp3';
			audio.addEventListener('ended',function(){
				this.remove();
			});
			audio._changed=1;
			audio.onerror=function(){
				switch(this._changed){
					case 1:{
						audio.src=lib.assetURL+str+name+'.ogg';
						this._changed=2;
						break;
					}
					case 2:{
						audio.src=lib.assetURL+str+name+Math.ceil(Math.random()*2)+'.mp3';
						this._changed=3;
						break;
					}
					case 3:{
						audio.src=lib.assetURL+str+name+Math.ceil(Math.random()*2)+'.ogg';
						this._changed=4;
						break;
					}
					default:{
						this.remove();
					}
				}
			};
			ui.window.appendChild(audio);
		},
		playBackgroundMusic:function(){
			if(lib.config.background_music=='music_off'){
				ui.backgroundMusic.src='';
			}
			else{
				var music=lib.config.background_music;
				if(music=='music_random'){
					music=lib.config.all.background_music.randomGet('music_off','music_random',_status.currentMusic);
				}
				_status.currentMusic=music;
				if(music=='music_custom'){
					if(_status.background_music_src){
						ui.backgroundMusic.src=_status.background_music_src;
					}
					else if(lib.db){
						game.getDB('audio','background',function(fileToLoad){
							if(!fileToLoad) return;
							var fileReader = new FileReader();
							fileReader.onload = function(fileLoadedEvent)
							{
								var data = fileLoadedEvent.target.result;
								if(data){
									_status.background_music_src=data;
									ui.backgroundMusic.src=_status.background_music_src;
								}
							};
							fileReader.readAsDataURL(fileToLoad, "UTF-8");
						});
					}
				}
				else{
					ui.backgroundMusic.src=lib.assetURL+'audio/background/'+music+'.mp3';
				}
			}
		},
		import:function(type,obj){
			if(type=='character'){
				if(lib.config.customCharacterPack[obj.name]){
					alert('武将包已存在');
					return;
				}
				var pack={
					name:obj.name,
					character:[],
					skill:[],
				};
				for(var i in obj.character){
					if(lib.checkCharacterName(i)){
						alert('武将名重复：'+i);
						continue;
					}
					game.putDB('character',i,obj.character[i]);
					lib.character[i]=obj.character[i];
					lib.customCharacters.add(i);
					pack.character.push(i);
					lib.setTranslate(i);
				}
				for(var i in obj.skill){
					if(lib.checkSkillName(i)){
						alert('技能名重复：'+i);
						continue;
					}
					var info=obj.skill[i];
					try{
						eval('lib.skill["'+info.name+'"]={'+info.content+'}');
					}
					catch(e){
						console.log(e);
						lib.skill[info.name]={};
					}
					lib.skill[info.name].createInfo=info;
					lib.setTranslate(i);
					lib.translate[info.name+'_info']=info.description;
					game.putDB('skill',info.name,info);
					pack.skill.push(i);
				}
				lib.config.customCharacterPack[obj.name]=pack;
				game.saveConfig('customCharacterPack',lib.config.customCharacterPack);
			}
			else if(type=='extension'){
				lib.configMenu.extension.config['extension_'+obj.name]={
					name:obj.name,
					init:true
				}
				for(var i in obj.config){
					lib.configMenu.extension.config['extension_'+obj.name+'_'+i]=obj.config[i];
				}
				for(var i in obj.help){
					lib.help[i]=obj.help[i];
				}
				lib.configMenu.extension.config['extension_'+obj.name+'_delete']={
					name:'删除此扩展',
					clear:true,
					onclick:function(){
						if(this.innerHTML=='确认删除'){
							var prefix='extension_'+obj.name;
							var page=this.parentNode;
							for(var i=0;i<page.childElementCount;i++){
								if(page.childNodes[i]._link&&page.childNodes[i]._link.config._name.indexOf(prefix)==0){
									page.childNodes[i].remove();
									i--;
								}
							}
							for(var i in lib.config){
								if(i.indexOf(prefix)==0){
									game.saveConfig(i);
								}
							}
							localStorage.removeItem(lib.configprefix+prefix);
							lib.config.extensions.remove(obj.name);
							game.saveConfig('extensions',lib.config.extensions);
							if(obj.image){
								for(var i=0;i<obj.image.length;i++){
									game.deleteDB('image','extension-'+obj.name+':'+obj.image[i]);
								}
							}
							if(obj.onremove){
								obj.onremove();
							}
						}
						else{
							this.innerHTML='确认删除';
							var that=this;
							setTimeout(function(){
								that.innerHTML='删除'+obj.name;
							},1000);
						}
					}
				}
			}
			game.importedPack=obj;
		},
		export:function(textToWrite,name){
			var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
			var fileNameToSaveAs = name||'noname';
			fileNameToSaveAs=fileNameToSaveAs.replace(/\\|\/|\:|\?|\"|\*|\<|\>|\|/g,'.');

			if(lib.device){
				var directory;
				if(lib.device=='android'){
					directory=cordova.file.externalDataDirectory;
				}
				else{
					directory=cordova.file.documentsDirectory;
				}
				window.resolveLocalFileSystemURL(directory,function(entry){
					entry.getFile(fileNameToSaveAs,{create:true},function(fileEntry){
						fileEntry.createWriter(function(fileWriter){
							fileWriter.onwriteend=function(){
								alert('文件已导出至'+directory+fileNameToSaveAs);
							}
							fileWriter.write(textFileAsBlob)
						});
					});
				});
			}
			else{
				var downloadLink = document.createElement("a");
				downloadLink.download = fileNameToSaveAs;
				downloadLink.innerHTML = "Download File";
				downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
				downloadLink.click();
			}
		},
		exportCharacters:function(packname,list,callback){
			var zipReady=function(){
				var zip=new JSZip();
				var imageLoaded=0;
				var character={
					name:packname||'noname',
					character:{},
					skill:{},
				};
				var load=function(img){
					var blob = zip.generate({type:"blob"});
					var fileNameToSaveAs = packname||'noname';
					fileNameToSaveAs=fileNameToSaveAs.replace(/\\|\/|\:|\?|\"|\*|\<|\>|\|/g,'.');
					fileNameToSaveAs+='.zip';

					if(lib.device){
						var directory;
						if(lib.device=='android'){
							directory=cordova.file.externalDataDirectory;
						}
						else{
							directory=cordova.file.documentsDirectory;
						}
						window.resolveLocalFileSystemURL(directory,function(entry){
							entry.getFile(fileNameToSaveAs,{create:true},function(fileEntry){
								fileEntry.createWriter(function(fileWriter){
									fileWriter.onwriteend=function(){
										alert('文件已导出至'+directory+fileNameToSaveAs);
									}
									fileWriter.write(blob)
								});
							});
						});
					}
					else{
						var downloadLink = document.createElement("a");
						downloadLink.download = fileNameToSaveAs;
						downloadLink.innerHTML = "Download File";
						downloadLink.href = window.URL.createObjectURL(blob);
						downloadLink.click();
					}

					if(typeof callback=='function'){
						callback(character);
					}
				};
				for(var i=0;i<lib.customCharacters.length;i++){
					var name=lib.customCharacters[i];
					if(lib.checkCharacterName(name)){
						imageLoaded++;
						continue;
					}
					if(list&&!list.contains(name)){
						imageLoaded++;
						continue;
					}
					character.character[name]=lib.character[name];
					for(var j=0;j<lib.character[name][3].length;j++){
						var skillname=lib.character[name][3][j];
						if(lib.skill[skillname].createInfo){
							character.skill[skillname]=lib.skill[skillname].createInfo;
						}
					}
					(function(name){
						game.getDB('image','character:'+name,function(img){
							imageLoaded++;
							zip.file(name+'.jpg',img.slice(img.indexOf('base64,')+7),{base64:true});
							if(imageLoaded==lib.customCharacters.length){
								load();
							}
						});
					}(name));
				}
				zip.file('pack.js','game.import("character",'+lib.init.stringify(character)+')');
			}
			if(!window.JSZip){
				lib.init.js(lib.assetURL+'game','jszip',zipReady);
			}
			else{
				zipReady();
			}
		},
        multiDownload:function(list,onsuccess,onerror,onfinish){
            list=list.slice(0);
            var download=function(){
                if(list.length){
                    var current=list.shift();
                    game.download(current,current,function(){
                        if(onsuccess) onsuccess();
                        download();
                    },function(){
                        if(onerror) onerror();
                        download();
                    });
                }
                else{
                    if(onfinish) onfinish();
                }
            }
            download();
        },
		playVideo:function(time,mode){
			if(!_status.replayvideo){
				localStorage.setItem(lib.configprefix+'playbackmode',lib.config.mode);
			}
			game.saveConfig('mode',mode);
			localStorage.setItem(lib.configprefix+'playback',time);
			game.reload();
		},
		playVideoContent:function(video){
			var next=game.createEvent('video',false);
			next.video=video;
			ui.system.style.display='none';
			ui.system.hide();
			ui.arena.style.display='none';
			ui.arena.hide();
			_status.event=next;
			_status.paused=false;
			_status.paused2=false;
			_status.over=false;
			_status.video=true;
			clearTimeout(_status.timeout);

			for(var i in lib.characterPack){
				for(var j in lib.characterPack[i]){
					lib.character[j]=lib.character[j]||lib.characterPack[i][j];
				}
			}
			next.content=function(){
				'step 0'
				game.delay(0,500);
				'step 1'
				if(lib.config.mode!='chess'){
					ui.control.innerHTML='';
					var nodes=[];
					for(var i=0;i<ui.arena.childNodes.length;i++){
						nodes.push(ui.arena.childNodes[i]);
					}
					for(var i=0;i<nodes.length;i++){
						if(nodes[i]==ui.canvas) continue;
						if(nodes[i]==ui.control) continue;
						if(nodes[i]==ui.mebg) continue;
						if(nodes[i]==ui.me) continue;
						if(nodes[i]==ui.roundmenu) continue;
						nodes[i].remove();
					}
					ui.sidebar.innerHTML='';
					ui.cardPile.innerHTML='';
					ui.discardPile.innerHTML='';
					ui.special.innerHTML='';
				}
				ui.system.firstChild.innerHTML='';
				ui.system.lastChild.innerHTML='';
				ui.system.firstChild.appendChild(ui.config2);
				if(ui.updateVideoMenu){
					ui.updateVideoMenu();
				}
				_status.videoDuration=1;
				ui.create.system('返回',function(){
					var mode=localStorage.getItem(lib.configprefix+'playbackmode');
					if(mode){
						game.saveConfig('mode',mode);
					}
					game.reload();
				});
				ui.create.system('重播',function(){
					_status.replayvideo=true;
					game.playVideo(_status.playback,lib.config.mode);
				});
				ui.create.system('暂停',ui.click.pause,true).id='pausebutton';
				var slow=ui.create.system('减速',function(){
					_status.videoDuration*=1.5;
					updateDuration();
				},true);
				var fast=ui.create.system('加速',function(){
					_status.videoDuration/=1.5;
					updateDuration();
				},true);
				var updateDuration=function(){
					if(_status.videoDuration>1){
						slow.classList.add('glow');
					}
					else{
						slow.classList.remove('glow');
					}
					if(_status.videoDuration<1){
						fast.classList.add('glow');
					}
					else{
						fast.classList.remove('glow');
					}
				}
				ui.system.style.display='';
				ui.refresh(ui.system);
				ui.system.show();
				ui.window.show();
				if(lib.config.mode!='versus'&&lib.config.mode!='boss'){
					ui.arena.style.display='';
					ui.refresh(ui.arena);
					ui.arena.show();
				}
				if(lib.config.mode!='chess'){
					game.playerMap={};
				}
				game.finishCards();
				'step 2'
				if(event.video.length){
					var content=event.video.shift();
					// console.log(content);
					if(content.type=='delay'){
						game.delay(content.content);
					}
					else if(content.type=='play'){
						window.play={};
						if(!event.playtoload){
							event.playtoload=1;
						}
						else{
							event.playtoload++;
						}
						var script=lib.init.js(lib.assetURL+'play',content.name);
						script.addEventListener('load',function(){
							var play=window.play[content.name]
							if(play&&play.video){
								play.video(content.init);
							}
							event.playtoload--;
							if(event.playtoload==0){
								delete window.play;
							}
						});
					}
					else if(typeof content.player=='string'&&game.playerMap[content.player]&&
						game.playerMap[content.player].classList&&
						!game.playerMap[content.player].classList.contains('obstacle')){
						game.videoContent[content.type](game.playerMap[content.player],content.content);
					}
					else{
						game.videoContent[content.type](content.content);
					}
					if(event.video.length){
						game.delay(0,_status.videoDuration*Math.min(2000,event.video[0].delay));
					}
					event.redo();
				}
				else{
					_status.over=true;
					ui.system.lastChild.hide();
					setTimeout(function(){
						ui.system.lastChild.innerHTML='';
					},500);
				}
			}
			game.loop();
		},
		videoContent:{
			init:function(players){
				if(lib.config.mode=='chess') return;
				if(lib.config.mode=='versus'){
					players.bool=players.pop();
				}
				ui.arena.dataset.number=players.length;
				ui.arena.classList.add('video');
				game.players.length=0;
				game.dead.length=0;
				ui.create.players(players.length);
				game.me=game.players[0];
				ui.handcards1=game.me.node.handcards1;
				ui.handcards2=game.me.node.handcards2;
				ui.handcards1Container.appendChild(ui.handcards1);
				ui.handcards2Container.appendChild(ui.handcards2);
				if(lib.config.mode=='versus'){
					if(players.bool){
						ui.arena.dataset.number=parseInt(ui.arena.dataset.number)+1;
						for(var i=0;i<game.players.length;i++){
							game.players[i].dataset.position=parseInt(game.players[i].dataset.position)+1;
						}
						game.singleHandcard=true;
						ui.arena.classList.add('single-handcard');
						ui.fakeme=ui.create.div('.fakeme.avatar',ui.me);
					}
					ui.arena.style.display='';
					ui.refresh(ui.arena);
					ui.arena.show();
				}
				else if(lib.config.mode=='boss'){
					if(!players.boss){
						game.singleHandcard=true;
						ui.arena.classList.add('single-handcard');
						ui.fakeme=ui.create.div('.fakeme.avatar',ui.me);
					}
					ui.arena.dataset.number=8;
				}
				ui.updatehl();
				for(var i=0;i<players.length;i++){
					if(lib.config.mode=='identity'){
						game.players[i].init(players[i].name,players[i].name2);
						game.players[i].setIdentity(players[i].identity);
					}
					else if(lib.config.mode=='stone'){
						game.players[i].init(players[i].name,players[i].name2);
						game.players[i].classList.add('noidentity');
						game.players[i].updateActCount(null,players[i].count,0);
					}
					else if(lib.config.mode=='boss'){
						game.players[i].init(players[i].name,players[i].name2);
						game.players[i].setIdentity(players[i].identity);
						game.players[i].dataset.position=players[i].position;
						game.players[i].node.action.innerHTML='行动';
					}
					else if(lib.config.mode=='versus'){
						game.players[i].init(players[i].name,players[i].name2);
						game.players[i].node.identity.firstChild.innerHTML=players[i].identity;
						game.players[i].node.identity.dataset.color=players[i].color;
						game.players[i].node.action.innerHTML='行动';
					}
					else if(lib.config.mode=='guozhan'){
						game.players[i].name=players[i].name;
						game.players[i].name1=players[i].name1;
						game.players[i].name2=players[i].name2;

						game.players[i].sex='unknown';
						game.players[i].identity='unknown';

						lib.translate[game.players[i].name]=players[i].translate;
						game.players[i].init(players[i].name1,players[i].name2,false);

						game.players[i].classList.add('unseen');
						game.players[i].classList.add('unseen2');
						if(game.players[i]!=game.me){
							game.players[i].node.identity.firstChild.innerHTML='猜';
							game.players[i].node.identity.dataset.color='unknown';
						}
						else{
							game.players[i].setIdentity(game.players[i].group);
						}
					}
				}
				for(var i=0;i<game.players.length;i++){
					game.playerMap[game.players[i].dataset.position]=game.players[i];
				}

				if(lib.config.mode=='versus'){
					if(players.bool){
						game.onSwapControl();
					}
				}
				else if(lib.config.mode=='boss'){
					if(!players.boss){
						game.onSwapControl();
					}
					ui.arena.style.display='';
					ui.refresh(ui.arena);
					ui.arena.show();
					ui.updatehl();
				}
			},
			playAudio:function(str){
				game.playAudio(str,'video');
			},
			playSkillAudio:function(name){
				game.playSkillAudio(name,'video');
			},
			phaseChange:function(player){
				if(player){
					var glowing=document.querySelector('.glow_phase');
					if(glowing){
						glowing.classList.remove('glow_phase');
					}
					if(lib.config.glow_phase){
						player.classList.add('glow_phase');
						// player.dataset.glow_phase=lib.config.glow_phase;
					}
				}
				else{
					console.log(player);
				}
			},
			playerfocus:function(player,time){
				if(player&&player.playerfocus){
					player.playerfocus(time);
				}
				else{
					console.log(player);
				}
			},
			identityText:function(player,str){
				if(player&&str){
					player.node.identity.firstChild.innerHTML=str;
				}
				else{
					console.log(player);
				}
			},
			chessSwap:function(content){
				var me=game.playerMap[content[0]];
				var player=game.playerMap[content[1]];
				if(me){
					me.classList.remove('current_action');
				}
				if(player){
					player.classList.add('current_action');
				}
			},
			chessgainmod:function(player,num){
				if(Array.isArray(num)){
					num=get.infoCards(num);
				}
				if(player&&player.$gainmod){
					player.$gainmod(num);
				}
				else{
					console.log(player);
				}
			},
			moveTo:function(player,pos){
				if(player&&player.moveTo&&pos){
					player.moveTo(pos[0],pos[1]);
				}
				else{
					console.log(player)
				}
			},
			addObstacle:function(pos){
				if(pos){
					game.addObstacle(pos[0],pos[1]);
				}
				else{
					console.log(pos)
				}
			},
			removeObstacle:function(pos){
				game.removeObstacle(pos);
			},
			moveTox:function(player,pos){
				if(player&&player.dataset){
					delete lib.posmap[player.dataset.position];
					player.dataset.position=pos;
					lib.posmap[pos]=player;
					game.delay();
				}
				else{
					console.log(player);
				}
			},
			thrownhighlight1:function(){
				ui.arena.classList.add('thrownhighlight');
			},
			thrownhighlight2:function(){
				ui.arena.classList.remove('thrownhighlight');
			},
			chessFocus:function(player){
				if(player){
					player.chessFocus();
				}
				else{
					console.log('chessFocus');
				}
			},
			removeTreasure:function(pos){
				if(game.playerMap[pos]){
					game.playerMap[pos].delete();
					delete game.playerMap[pos];
				}
				else{
					console.log(pos);
				}
			},
			initobs:function(obs){
				if(obs){
					for(var i=0;i<obs.length;i++){
						game.addObstacle(obs[i]);
					}
				}
				else{
					console.log(obs);
				}
			},
			stonePosition:function(content){
				var player=game.playerMap[content[0]];
				if(player){
					delete game.playerMap[content[0]];
					player.dataset.position=content[1];
					game.playerMap[content[1]]=player;
				}
				else{
					console.log(content);
				}
			},
			bossSwap:function(player,name){
				player.delete();
				var boss=ui.create.player().init(name);
				boss.dataset.position=player.dataset.position;
				game.playerMap[player.dataset.position]=boss;
				if(game.me==player){
					game.me=boss;
				}
				game.players.push(boss);
				game.arrangePlayers();
				game.boss=boss;
				ui.arena.appendChild(boss.animate('zoominanim'));
				boss.setIdentity('zhu');
				boss.identity='zhu';
			},
			stoneSwap:function(info){
				var player=ui.create.player();
				player.classList.add('noidentity');
				player.dataset.position=info.position;
				player.animate(info.me?'replaceme':'replaceenemy');
				player.actcount=info.actcount;
				player.init(info.name,info.name2);
				game.players.push(player);
				player.updateActCount(null,info.actcount,0);
				ui.arena.appendChild(player);
				game.playerMap[player.dataset.position]=player;
				game.arrangePlayers();
			},
			chess_tongshuai:function(player,content){
				if(player&&player.storage){
					player.storage.tongshuai.owned=content;
				}
				else{
					console.log(player);
				}
			},
			chess_tongshuai_skill:function(player,content){
				if(player&&content){
					if(player.marks.tongshuai.firstChild){
						player.marks.tongshuai.firstChild.remove();
					}
					player.marks.tongshuai.setBackground(content[0],'character');
					player.additionalSkills.tongshuai=content[1];
				}
				else{
					console.log(player);
				}
			},
			reinit:function(source,content){
				if(source&&content){
					source.uninit();
					source.init(content[0]);
					source.node.identity.dataset.color=content[1];
				}
				else{
					console.log(source);
				}
			},
			reinit2:function(source,name){
				if(source&&name){
					source.init(name);
				}
				else{
					console.log(source);
				}
			},
			skill:function(player,content){
				if(typeof content=='string'){
					lib.skill[content].video(player);
				}
				else if(Array.isArray(content)){
					lib.skill[content[0]].video(player,content[1]);
				}
				else{
					console.log(player,content)
				}
			},
			addFellow:function(content){
				var player=game.addFellow(content[0],content[1]);
				game.playerMap[player.dataset.position]=player;
			},
			updateActCount:function(player,content){
				if(player&&content){
					player.updateActCount(content[0],content[1],content[2]);
				}
				else{
					console.log(player);
				}
			},
			setIdentity:function(player,identity){
				if(player&&identity){
					player.setIdentity(identity);
				}
				else{
					console.log(num);
				}
			},
			showCharacter:function(player,num){
				if(player&&player.classList){
					switch(num){
						case 0:
						player.classList.remove('unseen');
						break;
						case 1:
						player.classList.remove('unseen2');
						break;
						case 2:
						player.classList.remove('unseen');
						player.classList.remove('unseen2');
						break;
					}
				}
				else{
					console.log(num);
				}
			},
			popup:function(player,info){
				if(player&&info){
					player.popup(info[0],info[1]);
				}
				else{
					console.log(player);
				}
			},
			log:function(str){
				game.log(str);
			},
			draw:function(player,info){
				if(player&&player.$draw){
					player.$draw(info);
				}
				else{
					console.log(player);
				}
			},
			drawCard:function(player,info){
				if(player&&info){
					player.$draw(get.infoCards(info));
				}
				else{
					console.log(player);
				}
			},
			throw:function(player,info){
				if(player&&info){
					player.$throw(get.infoCards(info[0]),info[1]);
				}
				else{
					console.log(player);
				}
			},
			compare:function(player,info){
				if(player&&info){
					player.$compare(get.infoCard(info[0]),game.playerMap[info[1]],get.infoCard(info[2]));
				}
				else{
					console.log(player);
				}
			},
			give:function(player,info){
				if(player&&info){
					player.$give(info[0],game.playerMap[info[1]]);
				}
				else{
					console.log(player);
				}
			},
			giveCard:function(player,info){
				if(player&&info){
					player.$give(get.infoCards(info[0]),game.playerMap[info[1]]);
				}
				else{
					console.log(player);
				}
			},
			gain:function(player,info){
				if(player&&player.$gain){
					player.$gain(info);
				}
				else{
					console.log(player);
				}
			},
			gainCard:function(player,info){
				if(player&&info){
					player.$gain(get.infoCards(info));
				}
				else{
					console.log(player);
				}
			},
			gain2:function(player,cards){
				if(player&&player.$draw){
					var nodeList=document.querySelectorAll('#arena>.card,#chess>.card');
					var nodes=[];
					for(var i=0;i<nodeList.length;i++){
						nodes.push(nodeList[i]);
					}
					for(var i=0;i<cards.length;i++){
						for(var j=0;j<nodes.length;j++){
							if(cards[i][2]==nodes[j].name&&cards[i][0]==nodes[j].suit&&cards[i][1]==nodes[j].number){
								nodes[j].moveDelete(player);
								cards.splice(i--,1);
								nodes.splice(j--,1);
								break;
							}
						}
					}
					if(cards.length){
						player.$draw(get.infoCards(cards));
					}
				}
				else{
					console.log(player);
				}
			},
			deletenode:function(player,cards){
				if(cards){
					var nodeList=document.querySelectorAll('#arena>.card,#chess>.card');
					var nodes=[];
					for(var i=0;i<nodeList.length;i++){
						nodes.push(nodeList[i]);
					}
					for(var i=0;i<cards.length;i++){
						for(var j=0;j<nodes.length;j++){
							if(cards[i][2]==nodes[j].name&&cards[i][0]==nodes[j].suit&&cards[i][1]==nodes[j].number){
								nodes[j].delete();
								cards.splice(i--,1);
								nodes.splice(j--,1);
								break;
							}
						}
					}
				}
				else{
					console.log(player,cards);
				}
			},
			highlightnode:function(player,card){
				if(card){
					var nodeList=document.querySelectorAll('#arena>.card,#chess>.card');
					var nodes=[];
					for(var i=0;i<nodeList.length;i++){
						nodes.push(nodeList[i]);
					}
					for(var j=nodes.length-1;j>=0;j--){
						if(card[2]==nodes[j].name&&card[0]==nodes[j].suit&&card[1]==nodes[j].number){
							nodes[j].classList.add('thrownhighlight');
							break;
						}
					}
				}
				else{
					console.log(player,cards);
				}
			},
			uiClear:function(){
				ui.clear();
			},
			judge1:function(player,content){
				if(player&&content){
					var judging=get.infoCard(content[0]);
					if(lib.config.mode=='chess'){
						judging.copy('thrown','center','thrownhighlight',ui.arena).animate('start');
					}
					else{
						player.$throwordered(judging.copy('thrownhighlight'),true);
					}

					ui.create.dialog(content[1]).videoId=content[2];
					ui.arena.classList.add('thrownhighlight');
				}
				else{
					console.log(player);
				}
			},
			centernode:function(content){
				get.infoCard(content).copy('thrown','center','thrownhighlight',ui.arena).animate('start');
			},
			judge2:function(videoId){
				for(var i=0;i<ui.dialogs.length;i++){
					if(ui.dialogs[i].videoId==videoId){
						ui.dialogs[i].close();
					}
				}
				ui.arena.classList.remove('thrownhighlight');
			},
			unmarkname:function(player,name){
				if(player&&player.unmark){
					player.unmark(name);
				}
				else{
					console.log(player);
				}
			},
			unmark:function(player,name){
				if(player&&player.marks&&player.marks[name]){
					player.marks[name].delete();
					delete player.marks[name];
				}
			},
			flame:function(player,type){
				if(player&&type){
					player['$'+type]();
				}
				else{
					console.log(player);
				}
			},
			line:function(player,content){
				if(player&&content){
					player.line(game.playerMap[content[0]],content[1]);
				}
				else{
					console.log(player);
				}
			},
			fullscreenpop:function(player,content){
				if(player&&content){
					player.$fullscreenpop(content[0],content[1]);
				}
				else{
					console.log(player);
				}
			},
			damagepop:function(player,content){
				if(player&&content){
					player.$damagepop(content[0],content[1],content[2]);
				}
				else{
					console.log(player);
				}
			},
			damage:function(player,source){
				if(player&&player.$damage){
					player.$damage(game.playerMap[source]);
				}
				else{
					console.log(player);
				}
			},
			diex:function(player){
				if(!player){
					console.log('diex');
					return;
				}
				var cards=player.get('hej');
				for(var i=0;i<cards.length;i++){
					cards[i].goto(ui.discardPile);
				}
				while(player.node.marks.childNodes.length){
					player.node.marks.firstChild.remove();
				}
				player.classList.add('dead');
				player.classList.remove('turnedover');
				player.classList.remove('out');
				player.node.count.innerHTML='0';
				player.node.hp.hide();
				player.node.equips.hide();
				player.node.count.hide();
				player.previous.next=player.next;
				player.next.previous=player.previous;
				game.players.remove(player);
				game.dead.push(player);
				if(lib.config.mode=='stone'){
					setTimeout(function(){
						player.delete();
					},500);
				}
			},
			tafangMe:function(player){
				if(player){
					game.me=player;
					ui.me.lastChild.show();
					ui.create.fakeme();
					ui.handcards1=player.node.handcards1.animate('start').fix();
					ui.handcards2=player.node.handcards2.animate('start').fix();
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);
					ui.updatehl();
					game.setChessInfo();
				}
			},
			deleteChessPlayer:function(player){
				if(player){
					player.delete();
					delete game.playerMap[player.dataset.position];
					game.players.remove(player);
					for(var i=0;i<ui.phasequeue.length;i++){
						if(ui.phasequeue[i].link==player){
							ui.phasequeue[i].remove();
							ui.phasequeue.splice(i,1);
							break;
						}
					}
				}
			},
			addChessPlayer:function(content){
				game.addChessPlayer.apply(this,content);
			},
			die:function(player){
				if(!player){
					console.log('die');
					return;
				}
				player.$die();
				if(lib.config.mode=='chess'){
					delete lib.posmap[player.dataset.position];
					setTimeout(function(){
						player.delete();
					},500);
					for(var i=0;i<ui.phasequeue.length;i++){
						if(ui.phasequeue[i].link==player){
							ui.phasequeue[i].remove();
							ui.phasequeue.splice(i,1);
							break;
						}
					}
				}
			},
			revive:function(player){
				if(!player){
					console.log('revive');
					return;
				}
				player.classList.remove('dead');
				player.node.hp.show();
				player.node.equips.show();
				player.node.count.show();
				player.node.avatar.style.transform='';
				player.node.avatar2.style.transform='';
				player.removeAttribute('style');
			},
			update:function(player,info){
				if(player&&info){
					player.hp=info[1];
					player.maxHp=info[2];
					player.hujia=info[3];
					player.update(info[0]);
				}
				else{
					console.log(player);
				}
			},
			phaseJudge:function(player,card){
				if(player&&card){
					// player.$phaseJudge(get.infoCard(card));
				}
				else{
					console.log(player);
				}
			},
			directgain:function(player,cards){
				if(player&&cards){
					player.directgain(get.infoCards(cards));
				}
				else{
					console.log(player);
				}
			},
			gain12:function(player,cards12){
				if(player&&cards12){
					var cards1=get.infoCards(cards12[0]);
					var cards2=get.infoCards(cards12[1]);
					for(var i=0;i<cards1.length;i++){
						cards1[i].classList.add('drawinghidden');
						player.node.handcards1.insertBefore(cards1[i],player.node.handcards1.firstChild);
					}
					for(var i=0;i<cards2.length;i++){
						cards2[i].classList.add('drawinghidden');
						player.node.handcards2.insertBefore(cards2[i],player.node.handcards2.firstChild);
					}
					ui.updatehl();
				}
				else{
					console.log(player);
				}
			},
			equip:function(player,card){
				if(player&&card){
					player.equip(get.infoCard(card));
				}
				else{
					console.log(player);
				}
			},
			addJudge:function(player,content){
				if(player&&content){
					var card=get.infoCard(content[0]);
					card.viewAs=content[1];
					player.node.judges.insertBefore(card,player.node.judges.firstChild);
				}
				else{
					console.log(player);
				}
			},
			markCharacter:function(player,content){
				if(player&&content){
					if(game.playerMap[content.target]){
						content.target=game.playerMap[content.target];
					}
					var mark=player.markCharacter(content.target,content);
					if(content.id){
						player.marks[content.id]=mark;
					}
				}
				else{
					console.log(player);
				}
			},
			changeMarkCharacter:function(player,content){
				if(player&&content&&player.marks[content.id]){
					player.marks[content.id].info={
						name:content.name,
						content:content.content
					};
					player.marks[content.id].setBackground(content.target,'character');
				}
			},
			mark:function(player,content){
				if(player&&content){
					var mark=player.mark(content.id,content);
				}
				else{
					console.log(player);
				}
			},
			markSkill:function(player,content){
				if(player&&content){
					if(content[1]){
						player.markSkill(content[0],null,get.infoCard(content[1]));
					}
					else{
						player.markSkill(content[0]);
					}
				}
				else{
					console.log(player);
				}
			},
			unmarkSkill:function(player,name){
				if(player&&player.unmarkSkill){
					player.unmarkSkill(name);
				}
				else{
					console.log(player);
				}
			},
			storage:function(player,content){
				if(player&&content){
					if(content[2]){
						switch(content[2]){
							case 'cards':content[1]=get.infoCards(content[1]);break;
							case 'card':content[1]=get.infoCard(content[1]);break;
						}
					}
					player.storage[content[0]]=content[1];
				}
				else{
					console.log(player);
				}
			},
			markId:function(player,content){
				if(player&&content){
					player.mark(get.infoCard(content[0]),content[1]);
				}
				else{
					console.log(player);
				}
			},
			unmarkId:function(player,content){
				if(player&&content){
					player.unmark(get.infoCard(content[0]),content[1]);
				}
				else{
					console.log(player);
				}
			},
			lose:function(player,info){
				if(player&&info){
					var hs=info[0],es=info[1],js=info[2];
					var phs=player.get('h'),pes=player.get('e'),pjs=player.get('j');
					var checkMatch=function(l1,l2){
						for(var i=0;i<l1.length;i++){
							for(var j=0;j<l2.length;j++){
								if(l2[j].suit==l1[i][0]&&l2[j].number==l1[i][1]&&l2[j].name==l1[i][2]){
									l2[j].delete();
									l2.splice(j--,1);
									break;
								}
							}
						}
					}
					checkMatch(hs,phs);
					checkMatch(es,pes);
					checkMatch(js,pjs);
					ui.updatehl();
				}
				else{
					console.log(player);
				}
			},
			loseAfter:function(player){
				if(!player){
					console.log('loseAfter');
					return;
				}
				for(var i=player.node.handcards1.childNodes.length-1;i>0;i--){
					if(player.node.handcards1.childNodes[i].classList.contains('removing')==false){
						player.node.handcards1.childNodes[i].animate('last');
						break;
					}
				}
				for(var i=player.node.handcards2.childNodes.length-1;i>0;i--){
					if(player.node.handcards2.childNodes[i].classList.contains('removing')==false){
						player.node.handcards2.childNodes[i].animate('last');
						break;
					}
				}
			},
			link:function(player,bool){
				if(player&&player.classList){
					if(bool){
						player.classList.add('linked');
					}
					else{
						player.classList.remove('linked');
					}
				}
				else{
					console.log(player);
				}
			},
			turnOver:function(player,bool){
				if(player&&player.classList){
					if(bool){
						player.classList.add('turnedover');
					}
					else{
						player.classList.remove('turnedover');
					}
				}
				else{
					console.log(player);
				}
			},
			showCards:function(player,info){
				if(info){
					var dialog=ui.create.dialog(info[0],get.infoCards(info[1]));
					setTimeout(function(){
						dialog.close();
					},1000);
				}
				else{
					console.log(player);
				}
			},
			cardDialog:function(content){
				if(Array.isArray(content)){
					ui.create.dialog(content[0],get.infoCards(content[1])).videoId=content[2];
				}
				else if(typeof content=='number'){
					for(var i=0;i<ui.dialogs.length;i++){
						if(ui.dialogs[i].videoId==content){
							ui.dialogs[i].close();
							return;
						}
					}
				}
			},
			dialogCapt:function(content){
				for(var i=0;i<ui.dialogs.length;i++){
					if(ui.dialogs[i].videoId==content[0]){
						ui.dialogs[i].content.firstChild.innerHTML=content[1];
						return;
					}
				}
			},
			swapSeat:function(content){
				var player1=game.playerMap[content[0]];
				var player2=game.playerMap[content[1]];
				if(!player1||!player2){
					console.log(content);
					return;
				}
				var temp1,pos,i,num;
				temp1=player1.dataset.position;
				player1.dataset.position=player2.dataset.position;
				player2.dataset.position=temp1;
				game.arrangePlayers();
				if(player1.dataset.position=='0'||player2.dataset.position=='0'){
					pos=parseInt(player1.dataset.position);
					if(pos==0) pos=parseInt(player2.dataset.position);
					num=game.players.length+game.dead.length;
					for(i=0;i<game.players.length;i++){
						temp1=parseInt(game.players[i].dataset.position)-pos;
						if(temp1<0) temp1+=num;
						game.players[i].dataset.position=temp1;
					}
					for(i=0;i<game.dead.length;i++){
						temp1=parseInt(game.dead[i].dataset.position)-pos;
						if(temp1<0) temp1+=num;
						game.dead[i].dataset.position=temp1;
					}
				}
				game.playerMap={};
				var players=game.players.concat(game.dead);
				for(var i=0;i<players.length;i++){
					game.playerMap[players[i].dataset.position]=players[i];
				}
			},
			swapControl:function(player,hs){
				if(player&&player.node){
					var cards=get.infoCards(hs);
					player.node.handcards1.innerHTML='';
					player.node.handcards2.innerHTML='';
					player.directgain(cards,false);

					game.me.node.handcards1.remove();
					game.me.node.handcards2.remove();

					ui.handcards1=player.node.handcards1.animate('start').fix();
					ui.handcards2=player.node.handcards2.animate('start').fix();
					ui.handcards1Container.insertBefore(ui.handcards1,ui.handcards1Container.firstChild);
					ui.handcards2Container.insertBefore(ui.handcards2,ui.handcards2Container.firstChild);

					game.me=player;
					ui.updatehl();
					if(lib.config.mode=='chess'){
						ui.create.fakeme();
					}
				}
				else{
					console.log(player);
				}
			},
			onSwapControl:function(){
				game.onSwapControl();
			},
			swapPlayer:function(player,hs){
				if(player&&player.node){
					var cards=get.infoCards(hs);
					player.node.handcards1.innerHTML='';
					player.node.handcards2.innerHTML='';
					player.directgain(cards,false);

					var pos=parseInt(player.dataset.position);
					var num=game.players.length+game.dead.length;
					var players=game.players.concat(game.dead);
					var temp;
					for(var i=0;i<players.length;i++){
						temp=parseInt(players[i].dataset.position)-pos;
						if(temp<0) temp+=num;
						players[i].dataset.position=temp;
					}
					game.me.node.handcards1.remove();
					game.me.node.handcards2.remove();
					game.me=player;
					ui.handcards1=player.node.handcards1.animate('start').fix();
					ui.handcards2=player.node.handcards2.animate('start').fix();
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);

					ui.updatehl();

					game.playerMap={};
					var players=game.players.concat(game.dead);
					for(var i=0;i<players.length;i++){
						game.playerMap[players[i].dataset.position]=players[i];
					}
				}
				else{
					console.log(player);
				}
			},
			over:function(str){
				var dialog=ui.create.dialog('hidden');
				dialog.content.innerHTML=str;
				dialog.open();
				if(lib.config.mode=='chess'){
					dialog.classList.add('center');
				}
			}
		},
		reload:function(){
			if(_status){
				_status.reloading=true;
			}
			if(_status.video&&!_status.replayvideo){
				localStorage.removeItem(lib.configprefix+'playbackmode');
			}
			window.location.reload();
		},
        exit:function(){
            if(navigator.app&&navigator.app.exitApp){
                navigator.app.exitApp();
            }
        },
		reloadCurrent:function(){
			game.saveConfig('continue_name',[game.me.name1||game.me.name,game.me.name2]);
			game.saveConfig('mode',lib.config.mode);
			localStorage.setItem(lib.configprefix+'directstart',true);
			game.reload();
		},
		update:function(func){
			lib.updates.push(func);
			if(lib.updates.length===1){
				game.run();
			}
			return func;
		},
		unupdate:function(func){
			lib.updates.remove(func);
		},
		stop:function(){
			cancelAnimationFrame(lib.status.frameId);
		},
		run:function(){
			if(lib.updates.length){
				cancelAnimationFrame(lib.status.frameId);
				lib.status.frameId=requestAnimationFrame(function(time){
					if(lib.status.time!==0){
						lib.status.delayed+=time-lib.status.time;
					}
					lib.status.frameId=requestAnimationFrame(lib.run);
				});
			}
		},
		addVideo:function(type,player,content){
			if(_status.video||game.online) return;
			if(!_status.videoInited) return;
			if(type=='storage'&&player&&player.updateMarks){
				player.updateMarks();
			}
			if(game.getVideoName){
				var time=get.time();
				if(!_status.lastVideoLog){
					_status.lastVideoLog=time;
				}
				if(get.itemtype(player)=='player'){
					player=player.dataset.position;
				}
				lib.video.push({
					type:type,
					player:player,
					content:content,
					delay:time-_status.lastVideoLog
				});
				_status.lastVideoLog=time;
			}
		},
		draw:function(func){
			lib.canvasUpdates.push(func);
			if(!lib.status.canvas){
				lib.status.canvas=true;
				game.update(lib.updateCanvas);
			}
		},
		vibrate:function(time){
			if(typeof navigator.vibrate=='function'){
				navigator.vibrate(time||500);
			}
		},
		animate:{
			flame:function(x,y,duration,type){
				var particles=[];
				var particle_count=50;
				if(type=='thunder'||type=='recover'){
					particle_count=30;
				}
				else if(type=='coin'||type=='dust'){
					particle_count=50;
				}
				else if(type=='legend'){
					particle_count=120;
				}
				else if(type=='epic'){
					particle_count=80;
				}
				else if(type=='rare'){
					particle_count=50;
				}
				for(var i = 0; i < particle_count; i++) {
			  		particles.push(new particle());
			  	}
				function particle() {
					this.speed = {x: -1+Math.random()*2, y: -5+Math.random()*5};
					if(type=='thunder'||type=='coin'||type=='dust'){
						this.speed.y=-3+Math.random()*5;
						this.speed.x=-2+Math.random()*4;
					}
					if(type=='legend'||type=='rare'||type=='epic'){
						this.speed.x*=3;
						this.speed.y*=1.5;
					}
					this.location = {x: x, y: y};

					this.radius = 0.5+Math.random()*1;

					this.life = 10+Math.random()*10;
					this.death = this.life;

					switch(type){
						case 'thunder':{
							this.b = 255;
							this.r = Math.round(Math.random()*255);
							this.g = Math.round(Math.random()*255);
							this.x+=Math.random()*20-10;
							this.y+=Math.random()*20-10;

							break;
						}
						case 'fire':{
							this.r = 255;
							this.g = Math.round(Math.random()*155);
							this.b = 0;
							break;
						}
						case 'coin':{
							this.r = 255;
							this.g = Math.round(Math.random()*25+230);
							this.b = Math.round(Math.random()*100+50);
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.life*=1.3;
							this.death*=1.3;
							break;
						}
						case 'dust':{
							this.r = Math.round(Math.random()*55)+105;
							this.g = Math.round(Math.random()*55)+150;
							this.b = 255;
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.life*=1.3;
							this.death*=1.3;
							break;
						}
						case 'legend':{
							this.r = 255;
							this.g = Math.round(Math.random()*100+155);
							this.b = Math.round(Math.random()*100+50);
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.speed.x/=2;
							this.speed.y/=2;
							this.life*=2;
							this.death*=2;
							break;
						}
						case 'epic':{
							this.r = Math.round(Math.random()*55)+200;
							this.g = Math.round(Math.random()*100)+55;
							this.b = 255;
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.speed.x/=2;
							this.speed.y/=2;
							this.life*=2;
							this.death*=2;
							break;
						}
						case 'rare':{
							this.r = Math.round(Math.random()*55)+105;
							this.g = Math.round(Math.random()*55)+150;
							this.b = 255;
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.speed.x/=2;
							this.speed.y/=2;
							this.life*=2;
							this.death*=2;
							break;
						}
						case 'recover':{
							this.g = 255;
							this.r = Math.round(Math.random()*200+55);
							this.b = Math.round(Math.random()*155+55);
							this.location.x+=Math.round(Math.random()*60)-30;
							this.location.y+=Math.round(Math.random()*40)-20;
							if(this.location.x<x){
								this.speed.x=-Math.abs(this.speed.x);
							}
							else if(this.location.x>x){
								this.speed.x=Math.abs(this.speed.x);
							}
							this.speed.x/=2;
							this.speed.y/=2;
							this.life*=2;
							this.death*=2;
							break;
						}
						default:{
							this.r = 255;
							this.g = Math.round(Math.random()*155);
							this.b = 0;
						}
					}
			  	}

				game.draw(function(time,surface){
			  		surface.globalCompositeOperation = "source-over";
			  		surface.globalCompositeOperation = "lighter";

			  		for(var i = 0; i < particles.length; i++)
			  		{
			  			var p = particles[i];

			  			surface.beginPath();
						var middle=0.5;
						var radius=p.radius;
						if(type=='recover'||type=='legend'||type=='rare'||
							type=='epic'||type=='coin'||type=='dust'){
							middle=0.7;
							radius/=3;
						}

			  			p.opacity = Math.round(p.death/p.life*100)/100
			  			var gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			  			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			  			gradient.addColorStop(middle, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			  			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			  			surface.fillStyle = gradient;
			  			surface.arc(p.location.x, p.location.y, radius, Math.PI*2, false);
			  			surface.fill();
			  			p.death--;
						if(type=='recover'){
							p.radius+=0.5;
						}
						else if(type=='coin'||type=='dust'){
							p.radius+=0.7;
						}
						else if(type=='legend'||type=='rare'||type=='epic'){
							p.radius+=0.5;
						}
						else {
							p.radius++;
						}
			  			p.location.x += (p.speed.x);
			  			p.location.y += (p.speed.y);

			  			if(p.death < 0 || p.radius < 0){
							if(typeof duration=='number'&&time+500>=duration){
								particles.splice(i--,1);
							}
							else{
								particles[i] = new particle();
							}
			  			}
			  		}
					if(particles.length==0){
						return false;
					}
				});
			}
		},
		linexy:function(path){
			var from=[path[0],path[1]];
			var to=[path[2],path[3]];
			var total=typeof arguments[1]==='number'?arguments[1]:lib.config.duration*2;
			var opacity=1;
			var color=[255,255,255];
			var dashed=false;
			if(typeof arguments[1]=='object'){
				for(var i in arguments[1]){
					switch(i){
						case 'opacity':opacity=arguments[1][i];break;
						case 'color':color=arguments[1][i];break;
						case 'dashed':dashed=arguments[1][i];break;
						case 'duration':total=arguments[1][i];break;
					}
				}
			}
			else if(arguments[1]=='fire'||arguments[1]=='thunder'||arguments[1]=='green'){
				color=arguments[1];
			}
			if(color=='fire'){
				color=[255, 146, 68];
			}
			else if(color=='thunder'){
				color=[141, 216, 255];
			}
			else if(color=='green'){
				color=[141, 255, 216];
			}
			var node=ui.create.div('.linexy.hidden');
			node.style.transitionDuration=(total/3000)+'s';
			node.style.left=from[0]+'px';
			node.style.top=from[1]+'px';
			node.style.backgroundColor='rgba('+color.toString()+','+opacity+')';
			var dy=to[1]-from[1];
			var dx=to[0]-from[0];
			var deg=Math.atan(Math.abs(dy)/Math.abs(dx))/Math.PI*180;
			if(dx>=0){
				if(dy<=0){
					deg+=90;
				}
				else{
					deg=90-deg;
				}
			}
			else{
				if(dy<=0){
					deg=270-deg;
				}
				else{
					deg+=270;
				}
			}
			node.style.transform='rotate('+(-deg)+'deg) scaleY(0)';
			node.style.height=get.xyDistance(from,to)+'px';
			if(lib.config.mode=='chess'){
				ui.chess.appendChild(node);
			}
			else{
				ui.arena.appendChild(node);
			}
			ui.refresh(node);
			node.show();
			node.style.transform='rotate('+(-deg)+'deg) scaleY(1)';
			node.addEventListener('webkitTransitionEnd',function(){
				setTimeout(function(){
					node.delete();
				},total/3);
			});
		},
		_linexy:function(path){
			var from=[path[0],path[1]];
			var to=[path[2],path[3]];
			var total=typeof arguments[1]==='number'?arguments[1]:lib.config.duration*2;
			var opacity=1;
			var color=[255,255,255];
			var dashed=false;
			if(typeof arguments[1]=='object'){
				for(var i in arguments[1]){
					switch(i){
						case 'opacity':opacity=arguments[1][i];break;
						case 'color':color=arguments[1][i];break;
						case 'dashed':dashed=arguments[1][i];break;
						case 'duration':total=arguments[1][i];break;
					}
				}
			}
			else if(arguments[1]=='fire'||arguments[1]=='thunder'||arguments[1]=='green'){
				color=arguments[1];
			}
			if(color=='fire'){
				color=[255, 146, 68];
			}
			else if(color=='thunder'){
				color=[141, 216, 255];
			}
			else if(color=='green'){
				color=[141, 255, 216];
			}
			var drawfunc=function(time,ctx){
				var current;
				if(time<total/3){
					ctx.strokeStyle='rgba('+color.toString()+','+opacity*(time/(total/3))+')';
					current=[from[0]+(to[0]-from[0])*time/(total/3),
						from[1]+(to[1]-from[1])*time/(total/3)];
				}
				else if(time<=total){
					current=to;
					if(time>total/1.5){
						ctx.strokeStyle='rgba('+color.toString()+','+opacity*(1-(time-total/1.5)/(total-total/1.5))+')';
					}
					else{
						ctx.strokeStyle='rgba('+color.toString()+','+opacity+')';
					}
				}
				else{
					return false;
				}
				ctx.beginPath();
				if(dashed){
					ctx.lineCap='butt';
					ctx.setLineDash([8,2]);
				}
				else{
					ctx.lineCap='round';
				}
				ctx.moveTo(from[0],from[1]);
				ctx.lineTo(current[0],current[1]);
				ctx.stroke();
			};
			if(arguments[2]&&lib.config.mode=='chess'){
				game.draw2(drawfunc);
			}
			else{
				game.draw(drawfunc);
			}
		},
		createTrigger:function(name,skill,player,event){
			if(player.isOut()||player.isDead()||player.removed) return;
			var next=game.createEvent('trigger',false,event);
			next.skill=skill;
			next.player=player;
			next.triggername=name;
			next._trigger=event;
			next.content=function(){
				"step 0"
				var info=get.info(event.skill);
				if(info.filter&&!info.filter(trigger,player,event.triggername)){
					event.finish();
				}
				else if(event._trigger.notrigger.contains(player)&&!lib.skill.global.contains(event.skill)){
					event.finish();
				}
				else{
					var hidden=player.hiddenSkills.slice(0);
					game.expandSkills(hidden);
					if(hidden.contains(event.skill)&&!get.info(event.skill).direct){
						event.trigger('triggerHidden');
					}
				}
				"step 1"
				if(event.cancelled){
					event.finish();
				}
				else{
					event.trigger('triggerBefore');
				}
				"step 2"
				if(event.cancelled){
					event.finish();
					return;
				}
				if(!event.revealed&&!get.info(event.skill).forced){
					if(get.info(event.skill).direct&&player.isUnderControl()){
						game.modeSwapPlayer(player);
						event._result={bool:true};
					}
					else if(get.info(event.skill).frequent&&!lib.config.autoskilllist.contains(event.skill)){
						event._result={bool:true};
					}
					else if(get.info(event.skill).direct&&player==game.me&&!_status.auto){
						event._result={bool:true};
					}
                    else if(get.info(event.skill).direct&&player.isOnline()){
                        event._result={bool:true};
                    }
					else{
						var str;
						var check=get.info(event.skill).check;
						if(get.info(event.skill).prompt) str=get.info(event.skill).prompt;
						else str='是否发动【'+get.translation(event.skill)+'】？';
						if(typeof str=='function'){str=str(trigger,player)}
						player.chooseBool(str).ai=function(){
							return !check||check(trigger,player);
						};
					}
				}
				"step 3"
				if(result&&result.bool==false) return;
				var info=get.info(event.skill);
				var next=game.createEvent(event.skill);
				next.player=player;
				next._trigger=trigger;
				next.triggername=event.triggername;
				next.content=info.content;
				if(info.popup!=false&&!info.direct){
					if(info.popup){
						player.popup(info.popup);
						game.log(player,'发动了','【'+get.translation(event.skill)+'】');
					}
					else{
						player.logSkill(event.skill);
					}
				}
			}
		},
		createEvent:function(name,trigger,triggerevent){
			var next={
				name:name,
				step:0,
				finished:false,
				next:[],
				aiexclude:[],
				notrigger:[],
				custom:{
					add:{},
					replace:{}
				},
				_result:{},
                _set:[],
			}
			if(trigger!==false&&!game.online) next._triggered=0;
			for(var i in lib.element.event){
				next[i]=lib.element.event[i];
			}
			(triggerevent||_status.event).next.push(next);
			return next;
		},
		addCharacter:function(name,info){
			var extname=(_status.extension||info.extension);
			var character=[info.sex,info.group,info.hp,info.skills||[],['db:extension-'+extname+':'+name+'.jpg']];
			if(info.tags){
				character[4]=character[4].concat(info.tags);
			}
			lib.character[name]=character;
			var packname='mode_extension_'+extname;
			if(!lib.characterPack[packname]){
				lib.characterPack[packname]={};
			}
			lib.translate[name]=info.translate;
			lib.characterPack[packname][name]=character;
			lib.translate[packname+'_character_config']=extname;
		},
		addCard:function(name,info,info2){
			var extname=(_status.extension||info2.extension);
			if(info.fullskin){
				info.image='db:extension-'+extname+':'+name+'.png';
			}
			else if(info.fullimage){
				info.image='db:extension-'+extname+':'+name+'.jpg';
			}
			lib.card[name]=info;
			lib.translate[name]=info2.translate;
			lib.translate[name+'_info']=info2.description;
			if(typeof info2.number=='number'){
				var suits=['heart','spade','diamond','club'];
				if(info2.color=='red'){
					suits=['heart','diamond'];
				}
				else if(info2.color=='black'){
					suits=['club','spade'];
				}
				for(var i=0;i<info2.number;i++){
					lib.card.list.push([suits[Math.floor(Math.random()*suits.length)],Math.ceil(Math.random()*13),name]);
				}
			}
			var packname='mode_extension_'+extname;
			if(!lib.cardPack[packname]){
				lib.cardPack[packname]=[];
				lib.translate[packname+'_card_config']=extname;
			}
			lib.cardPack[packname].push(name);
		},
		addMode:function(name,info,info2){
			lib.config.all.mode.push(name);
			lib.translate[name]=info2.translate;
			lib.mode[name]={
				name:info2.translate,
				config:info2.config,
				splash:'extension-'+(_status.extension||info2.extension)+':'+name+'.jpg'
			}
			lib.init['setMode_'+name]=function(){
				mode[name]=info;
			}
		},
        addRecentCharacter:function(){
            for(var i=0;i<arguments.length;i++){
                if(lib.character[arguments[i]]){
                    lib.config.recentCharacter.unshift(arguments[i]);
                }
            }
            var num=parseInt(lib.config.recent_character_number);
            if(lib.config.recentCharacter.length>num){
                lib.config.recentCharacter.splice(num);
            }
            game.saveConfig('recentCharacter',lib.config.recentCharacter);
        },
		createCard:function(name,suit,number,nature){
			if(typeof name=='object'){
				nature=name.nature;
				number=name.number;
				suit=name.suit;
				name=name.name;
			}
			if(typeof name!='string'){
				name='sha';
			}
			if(typeof suit!='string'){
				suit=['heart','diamond','club','spade'].randomGet();
			}
			else if(suit=='black'){
				suit=Math.random()<0.5?'club':'spade';
			}
			else if(suit=='red'){
				suit=Math.random()<0.5?'diamond':'heart';
			}
			if(typeof number!='number'){
				number=Math.ceil(Math.random()*13);
			}
			return ui.create.card(ui.special).init([suit,number,name,nature]);
		},
		forceOver:function(bool,callback){
			_status.event.next.length=0;
			var next=game.createEvent('finish_game');
			next.bool=bool;
            next.callback=callback;
			next.content=function(){
				'step 0'
				while(ui.controls.length){
					ui.controls[0].close();
				}
				while(ui.dialogs.length){
					ui.dialogs[0].close();
				}
				'step 1'
                if(event.bool!='noover'){
                    game.over(event.bool);
                }
                if(event.callback){
                    event.callback();
                }
			};
			if(_status.paused){
				game.uncheck();
				game.resume();
			}
		},
		over:function(result){
			var i,j,k,num,table,tr,td,dialog;
			_status.over=true;
			ui.control.show();
			ui.clear();
            game.stopCountChoose();
            if(game.online){
                var dialog=ui.create.dialog();
                dialog.content.innerHTML=result;
                var result2=arguments[1];
                if(result2==true){
                    dialog.content.firstChild.innerHTML='战斗胜利';
                }
                else if(result2==false){
                    dialog.content.firstChild.innerHTML='战斗失败';
                }
                ui.update();
                if(lib.config.background_audio){
    				if(result2===true){
    					game.playAudio('effect','win');
    				}
    				else if(result2===false){
    					game.playAudio('effect','lose');
    				}
    				else{
    					game.playAudio('effect','tie');
    				}
    			}
                if(!ui.exit){
                    ui.exit=ui.create.control('退出联机',function(){
                        game.saveConfig('reconnect_info');
                        game.reload();
                    });
                }
                if(ui.tempnowuxie){
    				ui.tempnowuxie.close();
    				delete ui.tempnowuxie;
    			}
                for(var i=0;i<game.players.length;i++){
                    game.players[i].setIdentity();
                }
                return;
            }
			if(lib.config.background_audio){
				if(result===true){
					game.playAudio('effect','win');
				}
				else if(result===false){
					game.playAudio('effect','lose');
				}
				else{
					game.playAudio('effect','tie');
				}
			}
			var resultbool=result;
			if(typeof resultbool!=='boolean'){
				resultbool=null;
			}
			if(result===true) result='战斗胜利';
			if(result===false) result='战斗失败';
			if(result==undefined) result='战斗结束';
			dialog=ui.create.dialog(result);
			if(game.addOverDialog){
				game.addOverDialog(dialog,result);
			}
			if(typeof _status.coin=='number'&&!_status.connectMode){
				var coeff=Math.random()*0.4+0.8;
				var added=0;
				var betWin=false;
				if(result=='战斗胜利'){
					if(_status.betWin){
						betWin=true;
						_status.coin+=10;
					}
					_status.coin+=20;
					if(_status.additionalReward){
						_status.coin+=_status.additionalReward();
					}
					switch(lib.config.mode){
						case 'identity':{
							switch(game.me.identity){
								case 'zhu':case 'zhong':case 'mingzhong':
									if(get.config('enhance_zhu')){
										added=10;
									}
									else{
										added=20;
									}
									break;
								case 'fan':
									if(get.config('enhance_zhu')){
										added=16;
									}
									else{
										added=8;
									}
									break;
								case 'nei':
									added=40;
									break;
							}
							added=added*(game.players.length+game.dead.length)/8;
							break;
						}
						case 'guozhan':
							if(game.me.identity=='ye'){
								added=8;
							}
							else{
								added=5/get.totalPopulation(game.me.identity);
							}
							added=added*(game.players.length+game.dead.length);
							break;
						case 'versus':
							if(_status.friend){
								added=5*(game.players.length+_status.friend.length);
							}
							break;
						default:
							added=10;
					}
				}
				else{
					added=10;
				}
				if(lib.config.mode=='chess'&&_status.mode=='combat'&&get.config('additional_player')){
					added=2;
				}
				_status.coin+=added*coeff;
				if(_status.coinCoeff){
					_status.coin*=_status.coinCoeff;
				}
				_status.coin=Math.ceil(_status.coin);
				dialog.add(ui.create.div('','获得'+_status.coin+'金'));
				if(betWin){
					game.changeCoin(20);
					dialog.content.appendChild(document.createElement('br'));
					dialog.add(ui.create.div('','（下注赢得10金）'));
				}
				game.changeCoin(_status.coin);
			}
			if(true){
				if(game.players.length){
					table=document.createElement('table');
					tr=document.createElement('tr');
					tr.appendChild(document.createElement('td'));
					td=document.createElement('td');
					td.innerHTML='伤害';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='受伤';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='摸牌';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='出牌';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='杀敌';
					tr.appendChild(td);
					table.appendChild(tr);
					for(i=0;i<game.players.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.players[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].damage!=undefined) num+=game.players[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].damaged!=undefined) num+=game.players[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].gain!=undefined) num+=game.players[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							for(k in game.players[i].stat[j].card){
								num+=game.players[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].kill!=undefined) num+=game.players[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
				if(game.dead.length){
					table=document.createElement('table');
					table.style.opacity='0.5';
					if(game.players.length==0){
						tr=document.createElement('tr');
						tr.appendChild(document.createElement('td'));
						td=document.createElement('td');
						td.innerHTML='伤害';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='受伤';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='摸牌';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='出牌';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='杀敌';
						tr.appendChild(td);
						table.appendChild(tr);
					}
					for(i=0;i<game.dead.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.dead[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].damage!=undefined) num+=game.dead[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].damaged!=undefined) num+=game.dead[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].gain!=undefined) num+=game.dead[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							for(k in game.dead[i].stat[j].card){
								num+=game.dead[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].kill!=undefined) num+=game.dead[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
				if(game.additionaldead&&game.additionaldead.length){
					table=document.createElement('table');
					table.style.opacity='0.5';
					for(i=0;i<game.additionaldead.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.additionaldead[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].damage!=undefined) num+=game.additionaldead[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].damaged!=undefined) num+=game.additionaldead[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].gain!=undefined) num+=game.additionaldead[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							for(k in game.additionaldead[i].stat[j].card){
								num+=game.additionaldead[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].kill!=undefined) num+=game.additionaldead[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
			}
			dialog.add(ui.create.div('.placeholder'));
			dialog.add(ui.create.div('.placeholder'));
            var clients=game.players.concat(game.dead);
            for(var i=0;i<clients.length;i++){
                if(clients[i].isOnline2()){
                    clients[i].send(game.over,dialog.content.innerHTML,game.checkOnlineResult(clients[i]));
                }
            }
			game.addVideo('over',null,dialog.content.innerHTML);
			var vinum=parseInt(lib.config.video);
			if(!_status.video&&vinum&&game.getVideoName&&window.indexedDB&&!game.online){
				var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
				var videos=lib.videos.slice(0);
				for(var i=0;i<videos.length;i++){
					if(videos[i].starred){
						videos.splice(i--,1);
					}
				}
				for(var deletei=0;deletei<5;deletei++){
					if(videos.length>=vinum){
						var toremove=videos.pop();
						lib.videos.remove(toremove);
						store.delete(toremove.time);
					}
					else{
						break;
					}
				}
				var newvid={
					name:game.getVideoName(),
					mode:lib.config.mode,
					video:lib.video,
					win:result=='战斗胜利',
					name1:game.me.name1||game.me.name,
					name2:game.me.name2,
					time:lib.getUTC(new Date())
				};
				lib.videos.unshift(newvid);
				store.put(newvid);
				lib.createVideoNode(newvid,true);
			}
			// _status.auto=false;
			if(ui.auto){
				// ui.auto.classList.remove('glow');
				ui.auto.hide();
			}
			if(ui.wuxie) ui.wuxie.hide();

			if(lib.storage.test){
				if(lib.config.test_game){
					switch(lib.config.mode){
						case 'identity':game.saveConfig('mode','guozhan');break;
						case 'guozhan':game.saveConfig('mode','versus');break;
						case 'versus':game.saveConfig('mode','boss');break;
						case 'boss':game.saveConfig('mode','chess');break;
						case 'chess':game.saveConfig('mode','stone');break;
						case 'stone':game.saveConfig('mode','identity');break;
					}
				}
				setTimeout(game.reload,500);
			}
			if(game.controlOver){
				game.controlOver();return;
			}
			if(lib.config.mode=='boss'){
				ui.create.control('再战',function(){
					var pointer=game.boss;
					var map={boss:game.me==game.boss,links:[]};
					for(var iwhile=0;iwhile<10;iwhile++){
						pointer=pointer.nextSeat;
						if(pointer==game.boss){
							break;
						}
						map.links.push(pointer.name);
					}
					game.saveConfig('continue_name_boss',map);
					game.saveConfig('mode',lib.config.mode);
					localStorage.setItem(lib.configprefix+'directstart',true);
					game.reload();
				});
			}
			else if(lib.config.mode=='versus'){
				if(_status.mode=='standard'){
					ui.create.control('再战',function(){
						game.saveConfig('continue_name_versus',{
							friend:_status.friendBackup,
							enemy:_status.enemyBackup,
							color:_status.color
						});
						game.saveConfig('mode',lib.config.mode);
						localStorage.setItem(lib.configprefix+'directstart',true);
						game.reload();
					});
				}
			}
			else if(!_status.connectMode&&get.config('continue_game')){
				ui.continue_game=ui.create.control('再战',game.reloadCurrent);
			}
			if(!ui.restart){
				ui.restart=ui.create.control('restart',game.reload);
			}
			if(ui.tempnowuxie){
				ui.tempnowuxie.close();
				delete ui.tempnowuxie;
			}

			if(ui.revive){
				ui.revive.close();
				delete ui.revive;
			}
			if(ui.swap){
				ui.swap.close();
				delete ui.swap;
			}
			for(var i=0;i<lib.onover.length;i++){
				lib.onover[i](resultbool);
			}
			if(game.addRecord){
				game.addRecord(resultbool);
			}
		},
		loop:function(){
			var event=_status.event;
			var step=event.step;
			var source=event.source;
			var player=event.player;
			var target=event.target;
			var targets=event.targets;
			var card=event.card;
			var cards=event.cards;
			var skill=event.skill;
			var forced=event.forced;
			var num=event.num;
			var trigger=event._trigger;
			var result=event._result;
			if(_status.paused2||_status.imchoosing){
				if(!lib.status.dateDelaying){
					lib.status.dateDelaying=new Date();
				}
			}
			if(_status.paused||_status.paused2||_status.over){
				return;
			}
			if(lib.status.dateDelaying){
				lib.status.dateDelayed+=lib.getUTC(new Date())-lib.getUTC(lib.status.dateDelaying);
				delete lib.status.dateDelaying;
			}
			if(event.next.length>0){
				var next=event.next.shift();
				if(next.player&&next.player.skipList.contains(next.name)){
					next.player.skipList.remove(next.name);
				}
				else{
					next.parent=event;
					_status.event=next;
				}
			}
			else if(event.finished){
				if(event._triggered==1){
					if(event.type=='card') event.trigger('useCardToCancelled');
					event.trigger(event.name+'Cancelled');
					event._triggered=4;
				}
				else if(event._triggered==2){
					if(event.type=='card') event.trigger('useCardToEnd');
					event.trigger(event.name+'End');
					event._triggered=3;
				}
				else if(event._triggered==3){
					if(event.type=='card') event.trigger('useCardToAfter');
					event.trigger(event.name+'After');
					event._triggered++;
				}
				else{
					if(event.parent){
						if(event.result){
							event.parent._result=event.result;
						}
						_status.event=event.parent;
					}
					else{
						return;
					}
				}
			}
			else{
				if(event._triggered==0){
					if(event.type=='card') event.trigger('useCardToBefore');
					event.trigger(event.name+'Before');
					event._triggered++;
				}
				else if(event._triggered==1){
					if(event.type=='card') event.trigger('useCardToBegin');
					event.trigger(event.name+'Begin');
					event._triggered++;
				}
				else{
					if(player&&player.classList.contains('dead')&&!event.forceDie&&event.name!='phaseLoop'){
						while(_status.dieClose.length){
							_status.dieClose.shift().close();
						}
                        game.broadcast(function(){
                            while(_status.dieClose.length){
    							_status.dieClose.shift().close();
    						}
                        });
                        if(event._oncancel){
                            event._oncancel();
                        }
						event.finish();
					}
					else if(player&&player.removed&&event.name!='phaseLoop'){
						event.finish();
					}
					else if(player&&player.isOut()&&event.name!='phaseLoop'){
						event.finish();
					}
					else{
						eval(lib.init.parse(event.content))();
					}
					event.step++;
				}
			}
			game.loop();
		},
		pause:function(){
			clearTimeout(_status.timeout);
			_status.paused=true;
		},
		pause2:function(){
            if(_status.connectMode) return;
			_status.paused2=true;
		},
		resume:function(){
			if(_status.paused){
                if(!_status.noclearcountdown){
                    game.stopCountChoose();
                }
				_status.paused=false;
				delete _status.waitingForTransition;
				game.loop();
			}
		},
		resume2:function(){
            if(_status.connectMode) return;
			if(_status.paused2){
				_status.paused2=false;
				game.loop();
			}
		},
		delay:function(time,time2){
			if(_status.paused) return;
			game.pause();
			if(time==undefined) time=1;
			if(time2==undefined) time2=0;
			time=time*lib.config.duration+time2;
			if(lib.config.speed=='vvfast') time/=3;
			_status.timeout=setTimeout(game.resume,time);
		},
		delayx:function(time,time2){
			if(typeof time!='number') time=1;
			switch(lib.config.game_speed){
				case 'vslow':time*=2.5;break;
				case 'slow':time*=1.5;break;
				case 'fast':time*=0.7;break;
				case 'vfast':time*=0.4;break;
				case 'vvfast':time*=0.2;break;
			}
			return game.delay(time,time2);
		},
		check:function(event){
			var i,j,range;
			if(event==undefined) event=_status.event;
			var custom=event.custom||{};
			var ok=true,auto=true;
			var player=event.player;
			if(!event.filterButton&&!event.filterCard&&!event.filterTarget&&!event.skill) return;
			if(event.filterButton){
				var dialog=event.dialog;
				range=get.select(event.selectButton);
				if(range[0]!=range[1]||range[0]>1) auto=false;
				for(i=0;i<dialog.buttons.length;i++){
					if(dialog.buttons[i].classList.contains('unselectable')) continue;
					if(event.filterButton(dialog.buttons[i],player)&&lib.filter.buttonIncluded(dialog.buttons[i])){
						if(ui.selected.buttons.length<range[1]){
							dialog.buttons[i].classList.add('selectable');
						}
						else if(range[1]==-1){
							dialog.buttons[i].classList.add('selected');
							ui.selected.buttons.add(dialog.buttons[i]);
						}
						else{
							dialog.buttons[i].classList.remove('selectable');
						}
					}
					else{
						dialog.buttons[i].classList.remove('selectable');
						if(range[1]==-1){
							dialog.buttons[i].classList.remove('selected');
							ui.selected.buttons.remove(dialog.buttons[i]);
						}
					}
					if(dialog.buttons[i].classList.contains('selected')){
						dialog.buttons[i].classList.add('selectable');
					}
				}
				if(ui.selected.buttons.length<range[0]){
					if(!event.forced||get.selectableButtons().length)
					ok=false;
					if(event.complexSelect||event.getParent().name=='chooseCharacter') ok=false;
				}
				if(custom.add.button){
					custom.add.button();
				}
			}
			if(event.filterCard){
				if(ok==false){
					game.uncheck('card');
				}
				else{
					var cards;
					if(event.position){
						cards=player.get(event.position);
					}
					else{
						cards=player.get('h');
					}
					range=get.select(event.selectCard);
					if(range[0]!=range[1]||range[0]>1) auto=false;
					for(i=0;i<cards.length;i++){
						if(event.filterCard(cards[i],player)&&
							lib.filter.cardAiIncluded(cards[i])&&
							(player.isOut()==false||event.includeOutCard)&&
							lib.filter.cardRespondable(cards[i],player)){
							if(ui.selected.cards.length<range[1]){
								cards[i].classList.add('selectable');
							}
							else if(range[1]==-1){
								cards[i].classList.add('selected');
								ui.selected.cards.add(cards[i]);
							}
							else{
								cards[i].classList.remove('selectable');
							}
						}
						else{
							cards[i].classList.remove('selectable');
							if(range[1]==-1){
								cards[i].classList.remove('selected');
								ui.selected.cards.remove(cards[i]);
							}
						}
						if(cards[i].classList.contains('selected')){
							cards[i].classList.add('selectable');
						}
					}
					if(ui.selected.cards.length<range[0]){
						if(!event.forced||get.selectableCards().length)
						ok=false;
						if(event.complexSelect) ok=false;
					}
				}
				if(custom.add.card){
					custom.add.card();
				}
			}
			if(event.filterTarget){
				if(ok==false){
					game.uncheck('target');
				}
				else{
					var card=get.card();
					range=get.select(event.selectTarget);
					if(range[0]!=range[1]||range[0]>1) auto=false;
					for(i=0;i<game.players.length;i++){
						var nochess=true;
						if(lib.config.mode=='chess'&&!event.chessForceAll){
							if(player&&get.distance(player,game.players[i],'pure')>7){
								nochess=false;
							}
						}
						if(event.filterTarget(card,player,game.players[i])&&!game.players[i].forceout&&
							(game.players[i].isOut()==false||event.includeOutTarget)&&nochess){
							if(ui.selected.targets.length<range[1]){
								game.players[i].classList.add('selectable');
							}
							else if(range[1]==-1){
								game.players[i].classList.add('selected');
								ui.selected.targets.add(game.players[i]);
							}
							else{
								game.players[i].classList.remove('selectable');
							}
						}
						else{
							game.players[i].classList.remove('selectable');
							if(range[1]==-1){
								game.players[i].classList.remove('selected');
								ui.selected.targets.remove(game.players[i]);
							}
						}
						if(game.players[i].classList.contains('selected')){
							game.players[i].classList.add('selectable');
						}
						if(game.players[i].instance){
							if(game.players[i].classList.contains('selected')){
								game.players[i].instance.classList.add('selected');
							}
							else{
								game.players[i].instance.classList.remove('selected');
							}
							if(game.players[i].classList.contains('selectable')){
								game.players[i].instance.classList.add('selectable');
							}
							else{
								game.players[i].instance.classList.remove('selectable');
							}
						}
					}
					if(ui.selected.targets.length<range[0]){
						if(!event.forced||get.selectableTargets().length)
						ok=false;
						if(event.complexSelect) ok=false;
					}
					if(range[1]==-1&&ui.selected.targets.length==0&&event.targetRequired){
						ok=false;
					}
				}
				if(custom.add.target){
					custom.add.target();
				}
			}
			if(!event.skill&&get.noSelected()&&!_status.noconfirm){
				var skills=[],enable,info;
				var skills2=player.get('s').concat(player.hiddenSkills).concat(lib.skill.global);
				game.expandSkills(skills2);
				for(i=0;i<skills2.length;i++){
					info=get.info(skills2[i]);
					enable=false;
					if(typeof info.enable=='function') enable=info.enable(event);
					else if(typeof info.enable=='object') enable=info.enable.contains(event.name);
					else if(info.enable=='phaseUse') enable=(event.getParent().name=='phaseUse');
					else if(typeof info.enable=='string') enable=(info.enable==event.name);
					if(enable){
						if(info.filter&&info.filter(event,player)==false) enable=false;
						if(info.viewAs&&event.filterCard&&!event.filterCard(info.viewAs,player)) enable=false;
						if(info.viewAs&&info.viewAsFilter&&info.viewAsFilter(player)==false) enable=false;
						if(!event.isMine()&&event.aiexclude.contains(skills2[i])) enable=false;
						if(info.usable&&get.skillCount(skills2[i])>=info.usable) enable=false;
					}
					if(enable){
						skills.add(skills2[i]);
					}
				}


				var globalskills=[];
				var globallist=lib.skill.global.slice(0);
				game.expandSkills(globallist);
				for(var i=0;i<skills.length;i++){
					if(globallist.contains(skills[i])){
						globalskills.push(skills.splice(i--,1)[0]);
					}
				}
				var equipskills=[];
				var ownedskills=player.get('s',true,false);
				game.expandSkills(ownedskills);
				for(var i=0;i<skills.length;i++){
					if(!ownedskills.contains(skills[i])){
						equipskills.push(skills.splice(i--,1)[0]);
					}
				}
				if(equipskills.length){
					ui.create.skills3(equipskills);
				}
				else if(ui.skills3){
					ui.skills3.close();
				}
				if(skills.length){
					ui.create.skills(skills);
				}
				else if(ui.skills){
					ui.skills.close();
				}
				if(globalskills.length){
					ui.create.skills2(globalskills);
				}
				else if(ui.skills2){
					ui.skills2.close();
				}
			}
			else{
				if(ui.skills){
					ui.skills.close()
				}
				if(ui.skills2){
					ui.skills2.close()
				}
				if(ui.skills3){
					ui.skills3.close()
				}
			}
			_status.multitarget=false;
			var skillinfo=get.info(_status.event.skill);
			if(_status.event.name=='chooseToUse'){
				if(skillinfo&&skillinfo.multitarget&&!skillinfo.multiline){
					_status.multitarget=true;
				}
				if((skillinfo&&skillinfo.viewAs)||!_status.event.skill){
					var cardinfo=get.info(get.card());
					if(cardinfo&&cardinfo.multitarget&&!cardinfo.multiline){
						_status.multitarget=true;
					}
				}
			}
			else if(_status.event.multitarget){
				_status.multitarget=true;
			}
			if(event.isMine()){
				if(lib.config.mode=='chess'&&game.me&&get.config('show_distance')){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==game.me){
							game.players[i].node.action.hide();
						}
						else{
							game.players[i].node.action.show();
							var dist=get.distance(game.me,game.players[i],'pure');
							var dist2=get.distance(game.me,game.players[i]);
							game.players[i].node.action.innerHTML='距离：'+dist2+'/'+dist;
							if(dist>7){
								game.players[i].node.action.classList.add('thunder');
							}
							else{
								game.players[i].node.action.classList.remove('thunder');
							}
						}
					}
				}
				if(ok&&auto&&lib.config.auto_confirm&&(!_status.mousedragging||!_status.mouseleft)&&
				!_status.mousedown&&!_status.touchnocheck){
					if(ui.confirm){
						if(!skillinfo||!skillinfo.preservecancel){
							ui.confirm.close();
						}
					}
					if(event.skillDialog==true) event.skillDialog=false;
					ui.click.ok();
					_status.mousedragging=null;
				}
				else{
					ui.arena.classList.add('selecting');
					game.countChoose();
					if(!_status.noconfirm&&!_status.event.noconfirm){
						if(!_status.mousedown||_status.mouseleft){
							var str='';
							if(ok) str+='o';
							if(!event.forced&&get.noSelected()) str+='c';
							ui.create.confirm(str);
						}
					}
				}
				if(ui.confirm&&ui.confirm.lastChild.link=='cancel'){
					if(_status.event.getParent().name=='phaseUse'&&!_status.event.skill){
						ui.confirm.lastChild.innerHTML='结束';
					}
					else{
						ui.confirm.lastChild.innerHTML='取消';
					}
				}
			}
			return ok;
		},
		uncheck:function(){
			var i,j;
			if(true){
				if(lib.config.mode=='chess'){
					var shadows=ui.chessContainer.getElementsByClassName('playergrid temp');
					while(shadows.length){
						shadows[0].remove();
					}
				}
			}
			if(arguments.length==0){
				while(document.getElementsByClassName('selectable').length>0){
					document.getElementsByClassName('selectable')[0].classList.remove('selectable');
				}
				while(document.getElementsByClassName('selected').length>0){
					document.getElementsByClassName('selected')[0].classList.remove('selected');
				}
				if(_status.event.player){
					var cards=_status.event.player.get('hej');
					for(j=0;j<cards.length;j++){
						cards[j].classList.remove('selected');
						cards[j].classList.remove('selectable');
					}
				}
				ui.selected.buttons.length=0;
				ui.selected.cards.length=0;
				ui.selected.targets.length=0;
			}
			else{
				for(i=0;i<arguments.length;i++){
					if(arguments[i]=='target'){
						for(j=0;j<game.players.length;j++){
							game.players[j].classList.remove('selected');
							game.players[j].classList.remove('selectable');
							if(game.players[j].instance){
								game.players[j].instance.classList.remove('selected');
								game.players[j].instance.classList.remove('selectable');
							}
						}
						ui.selected.targets.length=0;
					}
					else if(arguments[i]=='card'){
						var cards=_status.event.player.get('hej');
						for(j=0;j<cards.length;j++){
							cards[j].classList.remove('selected');
							cards[j].classList.remove('selectable');
						}
						ui.selected.cards.length=0;
					}
				}
			}
			if(arguments[0]!='target'&&arguments[0]!='card'&&arguments[0]!='button'){
				ui.arena.classList.remove('selecting');
				_status.imchoosing=false;
				_status.lastdragchange.length=0;
				_status.mousedragging=null;
				_status.mousedragorigin=null;

				while(ui.touchlines.length){
					ui.touchlines.shift().delete();
				}
			}
			ui.canvas.width=ui.arena.offsetWidth;
			ui.canvas.height=ui.arena.offsetHeight;
			for(var i=0;i<game.players.length;i++){
				game.players[i].unprompt();
			}
		},
		swapSeat:function(player1,player2,prompt,behind){
			if(behind){
				var totalPopulation=game.players.length+game.dead.length+1;
				for(var iwhile=0;iwhile<totalPopulation;iwhile++){
					if(player1.next!=player2){
						game.swapSeat(player1,player1.next,false,false);
					}
					else{
						break;
					}
				}
				if(prompt!=false){
					game.log(player1,'将座位移至',player2,'后');
				}
			}
			else{
				game.addVideo('swapSeat',null,[player1.dataset.position,player2.dataset.position]);
				var temp1,pos,i,num;
				temp1=player1.dataset.position;
				player1.dataset.position=player2.dataset.position;
				player2.dataset.position=temp1;
				game.arrangePlayers();
				if(lib.config.mode!='chess'){
					if(player1.dataset.position=='0'||player2.dataset.position=='0'){
						pos=parseInt(player1.dataset.position);
						if(pos==0) pos=parseInt(player2.dataset.position);
						num=game.players.length+game.dead.length;
						for(i=0;i<game.players.length;i++){
							temp1=parseInt(game.players[i].dataset.position)-pos;
							if(temp1<0) temp1+=num;
							game.players[i].dataset.position=temp1;
						}
						for(i=0;i<game.dead.length;i++){
							temp1=parseInt(game.dead[i].dataset.position)-pos;
							if(temp1<0) temp1+=num;
							game.dead[i].dataset.position=temp1;
						}
					}
				}
				if(prompt!=false){
					game.log(player1,'和',player2,'交换了座位');
				}
			}
		},
		swapPlayer:function(player,player2){
			if(player2){
				if(player==game.me) game.swapPlayer(player2);
				else if(player2==game.me) game.swapPlayer(player);
			}
			else{
				if(player==game.me) return;
				game.addVideo('swapPlayer',player,get.cardsInfo(player.get('h')));
				var pos=parseInt(player.dataset.position);
				var num=game.players.length+game.dead.length;
				var players=game.players.concat(game.dead);
				var temp;
				for(var i=0;i<players.length;i++){
					temp=parseInt(players[i].dataset.position)-pos;
					if(temp<0) temp+=num;
					players[i].dataset.position=temp;
				}
				game.me.node.handcards1.remove();
				game.me.node.handcards2.remove();
				game.me=player;
				ui.handcards1=player.node.handcards1.animate('start').fix();
				ui.handcards2=player.node.handcards2.animate('start').fix();
				ui.handcards1Container.appendChild(ui.handcards1);
				ui.handcards2Container.appendChild(ui.handcards2);

				ui.updatehl();
			}
			if(game.me.isAlive()){
				if(ui.auto) ui.auto.show();
				if(ui.wuxie) ui.wuxie.show();
				if(ui.revive){
					ui.revive.close();
					delete ui.revive;
				}
				if(ui.swap){
					ui.swap.close();
					delete ui.swap;
				}
				if(ui.restart){
					ui.restart.close();
					delete ui.restart;
				}
			}
			if(lib.config.mode=='identity'){
				game.me.setIdentity(game.me.identity);
			}
		},
		swapControl:function(player){
			if(player==game.me) return;

			game.me.node.handcards1.remove();
			game.me.node.handcards2.remove();

			game.me=player;
			ui.handcards1=player.node.handcards1.animate('start').fix();
			ui.handcards2=player.node.handcards2.animate('start').fix();
			ui.handcards1Container.insertBefore(ui.handcards1,ui.handcards1Container.firstChild);
			ui.handcards2Container.insertBefore(ui.handcards2,ui.handcards2Container.firstChild);
			ui.updatehl();
			game.addVideo('swapControl',player,get.cardsInfo(player.get('h')));

			if(game.me.isAlive()){
				if(ui.auto) ui.auto.show();
				if(ui.wuxie) ui.wuxie.show();
				if(ui.revive){
					ui.revive.close();
					delete ui.revive;
				}
				if(ui.swap){
					ui.swap.close();
					delete ui.swap;
				}
				if(ui.restart){
					ui.restart.close();
					delete ui.restart;
				}
			}
		},
		findNext:function(player){
			var players=get.players(lib.sort.position);
			var position=parseInt(player.dataset.position);
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					return players[i];
				}
			}
			return players[0];
		},
        loadModeAsync:function(name,callback){
            window.mode={};
            var script=lib.init.js(lib.assetURL+'mode',name,function(){
                script.remove();
                var mode=window.mode;
                delete window.mode;
                callback(mode[name]);
            });
        },
        switchMode:function(name){
            window.mode={};
            var script=lib.init.js(lib.assetURL+'mode',name,function(){
                script.remove();
                var mode=window.mode;
                delete window.mode;
                lib.config.mode=name;

                var i,j,k;
                for(i in mode[lib.config.mode].element){
                    if(!lib.element[i]) lib.element[i]=[];
                    for(j in mode[lib.config.mode].element[i]){
                        if(j=='init'){
                            if(!lib.element[i].inits) lib.element[i].inits=[];
                            lib.element[i].inits.push(lib.init.eval(mode[lib.config.mode].element[i][j]));
                        }
                        else{
                            lib.element[i][j]=lib.init.eval(mode[lib.config.mode].element[i][j]);
                        }
                    }
                }
                for(i in mode[lib.config.mode].ai){
                    if(typeof mode[lib.config.mode].ai[i]=='object'){
                        if(ai[i]==undefined) ai[i]={};
                        for(j in mode[lib.config.mode].ai[i]){
                            ai[i][j]=lib.init.eval(mode[lib.config.mode].ai[i][j]);
                        }
                    }
                    else{
                        ai[i]=lib.init.eval(mode[lib.config.mode].ai[i]);
                    }
                }
                for(i in mode[lib.config.mode].ui){
                    if(typeof mode[lib.config.mode].ui[i]=='object'){
                        if(ui[i]==undefined) ui[i]={};
                        for(j in mode[lib.config.mode].ui[i]){
                            ui[i][j]=lib.init.eval(mode[lib.config.mode].ui[i][j]);
                        }
                    }
                    else{
                        ui[i]=lib.init.eval(mode[lib.config.mode].ui[i]);
                    }
                }
                for(i in mode[lib.config.mode].game){
                    game[i]=lib.init.eval(mode[lib.config.mode].game[i]);
                }
                for(i in mode[lib.config.mode].get){
                    get[i]=lib.init.eval(mode[lib.config.mode].get[i]);
                }
                if(game.onwash){
                    lib.onwash.push(game.onwash);
                    delete game.onwash;
                }
                if(game.onover){
                    lib.onover.push(game.onover);
                    delete game.onover;
                }
                lib.config.current_mode=mode[lib.config.mode].config||[];
                lib.config.banned=get.config('banned')||[];
                lib.config.bannedcards=get.config('bannedcards')||[];

                for(i in mode[lib.config.mode]){
                    if(i=='element') continue;
                    if(i=='game') continue;
                    if(i=='ai') continue;
                    if(i=='ui') continue;
                    if(i=='get') continue;
                    if(i=='config') continue;
                    if(i=='start') continue;
                    if(lib[i]==undefined) lib[i]=(get.objtype(mode[lib.config.mode][i])=='array')?[]:{};
                    for(j in mode[lib.config.mode][i]){
                        lib[i][j]=lib.init.eval(mode[lib.config.mode][i][j]);
                    }
                }

                var pilecfg=lib.config.customcardpile[get.config('cardpilename')];
                if(pilecfg){
                    lib.config.bannedpile=pilecfg[0]||{};
                    lib.config.addedpile=pilecfg[1]||{};
                }

                try{
                    lib.storage=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
                    if(typeof lib.storage!='object') throw('err');
                    if(lib.storage==null) throw('err');
                }
                catch(err){
                    lib.storage={};
                    localStorage.setItem(lib.configprefix+lib.config.mode,"{}");
                }

                _status.event={
                    finished:true,
                    next:[],
                };
                _status.paused=false;
                game.createEvent('game',false).content=mode[lib.config.mode].start;
                game.loop();
            });
        },
		loadMode:function(mode){
			var next=game.createEvent('loadMode');
			next.mode=mode;
			next.content=function(){
				'step 0'
				window.mode={};
				lib.init.js(lib.assetURL+'mode',event.mode,game.resume);
				game.pause();
				'step 1'
				event.result=window.mode[event.mode];
				delete window.mode;
			}
		},
		loadPackage:function(){
			var next=game.createEvent('loadPackage');
			next.packages=[];
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]=='string'){
					next.packages.push(arguments[i]);
				}
			}
			next.content=function(){
				'step 0'
				if(event.packages.length){
					window.character={};
					window.card={};
					var pack=event.packages.shift().split('/');
					lib.init.js(lib.assetURL+pack[0],pack[1],game.resume);
					game.pause();
				}
				else{
					event.finish();
				}
				'step 1'
				var character=window.character;
				var card=window.card;
				var i,j,k;
				for(i in character){
					if(character[i].character){
						lib.characterPack[i]=character[i].character
					}
					if(character[i].forbid&&character[i].forbid.contains(lib.config.mode)) continue;
					if(character[i].mode&&character[i].mode.contains(lib.config.mode)==false) continue;
					for(j in character[i]){
						if(j=='mode'||j=='forbid') continue;
						for(k in character[i][j]){
							if(j=='character'){
								if(!character[i][j][k][4]){
									character[i][j][k][4]=[];
								}
								if(character[i][j][k][4].contains('boss')||
									character[i][j][k][4].contains('hiddenboss')){
									lib.config.forbidai.add(k);
								}
								if(lib.config.banned.contains(k)){
									if(lib.config.mode=='chess'&&get.config('chess_mode')=='leader'){
										lib.hiddenCharacters.push(k);
									}
									else{
										continue;
									}
								}
								for(var l=0;l<character[i][j][k][3].length;l++){
									lib.skilllist.add(character[i][j][k][3][l]);
								}
							}
							if(j=='translate'&&k==i){
								lib[j][k+'_character_config']=character[i][j][k];
							}
							else{
								if(lib[j][k]==undefined){
									lib[j][k]=lib.init.eval(character[i][j][k]);
								}
								else{
									alert('dublicate '+j+' in character '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+character[i][j][k]);
								}
							}
						}
					}
				}
				for(i in card){
					lib.cardPack[i]=[];
					if(card[i].card){
						for(var j in card[i].card){
							if(card[i].translate[j+'_info']){
								lib.cardPack[i].push(j);
							}
						}
					}
					for(j in card[i]){
						if(j=='mode'||j=='forbid') continue;
						if(j=='list') continue;
						for(k in card[i][j]){
							if(j=='translate'&&k==i){
								lib[j][k+'_card_config']=card[i][j][k];
							}
							else{
								if(lib[j][k]==undefined) lib[j][k]=lib.init.eval(card[i][j][k]);
								else alert('dublicate '+j+' in card '+i+':\n'+k+'\n'+lib[j][k]+'\n'+card[i][j][k]);
							}
						}
					}
				}
				event.goto(0);
			}
		},
		phaseLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				player.phase();
				"step 1"
				if(!game.players.contains(event.player.next)){
					event.player=game.findNext(event.player.next);
				}
				else{
					event.player=event.player.next;
				}
				event.goto(0);
			}
		},
		gameDraw:function(player,num){
			var next=game.createEvent('gameDraw');
			next.player=player||game.me;
			if(num==undefined) next.num=4;
			else next.num=num;
			next.content=function(){
				"step 0"
				var end=player;
				var numx=num;
				do{
					if(typeof num=='function'){
						numx=num(player);
					}
					player.directgain(get.cards(numx));
					if(player.singleHp===true&&lib.config.mode!='guozhan'){
						player.doubleDraw();
					}
					player=player.next;
				}
				while(player!=end);
				event.changeCard=get.config('change_card');
				if(lib.config.mode!='identity'&&lib.config.mode!='guozhan'){
					event.changeCard='disabled';
				}
				"step 1"
				if(event.changeCard!='disabled'&&!_status.auto){
					event.dialog=ui.create.dialog('是否使用手气卡？');
					ui.create.confirm('oc');
					event.custom.replace.confirm=function(bool){
						_status.event.bool=bool;
						game.resume();
					}
				}
				else{
					event.finish();
				}
				"step 2"
				if(event.changeCard=='once'){
					event.changeCard='disabled';
				}
				else if(event.changeCard=='twice'){
					event.changeCard='once';
				}
				else if(event.changeCard=='disabled'){
					event.bool=false;
					return;
				}
				game.pause();
				"step 3"
				if(event.bool){
					if(game.changeCoin){
						game.changeCoin(-3);
					}
					var hs=game.me.get('h');
					for(var i=0;i<hs.length;i++){
						ui.discardPile.appendChild(hs[i]);
					}
					game.me.directgain(get.cards(hs.length));
					event.goto(2);
				}
				else{
					event.dialog.close();
					ui.confirm.close();
					event.finish();
				}
			}
		},
		asyncDraw:function(players,num,drawDeck){
			for(var i=0;i<players.length;i++){
				var num2=1;
				if(typeof num=='number'){
					num2=num;
				}
				else if(Array.isArray(num)){
					num2=num[i];
				}
				if(drawDeck&&drawDeck.drawDeck){
					players[i].draw(num2,false,drawDeck);
				}
				else{
					players[i].draw(num2,false);
				}
				players[i].$draw(num2);
			}
		},
		finishCards:function(){
			_status.cardsFinished=true;
			var i,j,k;
			for(i in lib.card){
				var card=lib.card[i];
				if(card.type=='equip'){
					if(card.enable==undefined) card.enable=true;
					if(card.selectTarget==undefined) card.selectTarget=-1;
					if(card.filterTarget==undefined) card.filterTarget=function(card,player,target){
						return target==player;
					};
					if(card.content==undefined) card.content=function(){
						target.equip(card);
					};
					if(card.ai==undefined) card.ai={basic:{}};
					if(card.ai.basic==undefined) card.ai.basic={};
					if(card.ai.result==undefined) card.ai.result={target:1.5};
					if(card.ai.basic.order==undefined) card.ai.basic.order=function(card,player){
						return 8+ai.get.equipValue(card,player)/20;
					};
					if(card.ai.basic.useful==undefined) card.ai.basic.useful=2;
					if(card.subtype=='equip3'){
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=7;
					}
					else if(card.subtype=='equip4'){
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=5;
					}
					else{
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=1;
					}
					if(card.ai.basic.value==undefined)card.ai.basic.value=function(card,player){
						var value=0;
						var info=get.info(card);
						if(player.get('e',info.subtype[5])&&card!=player.get('e',info.subtype[5])){
							value=ai.get.value(player.get('e',info.subtype[5]),player);
						}
						var equipValue=info.ai.equipValue||info.ai.basic.equipValue;
						if(typeof equipValue=='function') return equipValue(card,player)-value;
						return equipValue-value;
					}
					card.ai.result.target=function(player,target){
						var card=get.card();
						if(card==undefined) return 0;
						var value1=ai.get.value(card,target);
						var value2=0;
						if(target[get.subtype(card)]&&target[get.subtype(card)]!=card)
							value2=ai.get.value(target[get.subtype(card)],target);
						if(value1>value2) return 1;
						return -1;
					};
				}
				else if(card.type=='delay'){
					if(card.enable==undefined) card.enable=true;
					if(card.filterTarget==undefined) card.filterTarget=lib.filter.judge;
					if(card.content==undefined) card.content=function(){
						target.addJudge(card,cards);
					};
				}
			}
			for(i in lib.skill){
				if(lib.skill[i].forbid&&lib.skill[i].forbid.contains(lib.config.mode)){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
					continue;
				}
				if(lib.skill[i].mode&&lib.skill[i].mode.contains(lib.config.mode)==false){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
					continue;
				}
				if(lib.skill[i].viewAs){
					if(typeof lib.skill[i].viewAs=='string'){
						lib.skill[i].viewAs={name:lib.skill[i].viewAs};
					}
					if(lib.skill[i].ai==undefined) lib.skill[i].ai={};
					var skill=lib.skill[i].ai;
					if(!lib.card[lib.skill[i].viewAs.name]){
						lib.skill[i]={};
						lib.translate[i+'_info']='技能不可用';
						continue;
					}
					var card=lib.card[lib.skill[i].viewAs.name].ai;
					for(j in card){
						if(skill[j]==undefined) skill[j]=card[j];
						else if(typeof skill[j]=='object'){
							for(var k in card[j]){
								if(skill[j][k]==undefined) skill[j][k]=card[j][k];
							}
						}
					}
				}
				if(lib.skill[i].inherit){
					var skill=lib.skill[lib.skill[i].inherit];
					for(j in skill){
						if(lib.skill[i][j]==undefined) lib.skill[i][j]=skill[j];
					}
					if(lib.translate[i+'_info']==undefined){
						lib.translate[i+'_info']=lib.translate[lib.skill[i].inherit+'_info'];
					}
				}
				if(lib.skill[i].subSkill){
					for(var j in lib.skill[i].subSkill){
						lib.skill[i+'_'+j]=lib.skill[i].subSkill[j];
						if(lib.skill[i].subSkill[j].name){
							lib.translate[i+'_'+j]=lib.skill[i].subSkill[j].name;
						}
						else{
							lib.translate[i+'_'+j]=lib.translate[i];
						}
						if(lib.skill[i].subSkill[j].description){
							lib.translate[i+'_'+j+'_info']=lib.skill[i].subSkill[j].description;
						}
						if(lib.skill[i].subSkill[j].marktext){
							lib.translate[i+'_'+j+'_bg']=lib.skill[i].subSkill[j].marktext;
						}
					}
				}
				if(lib.skill[i].marktext){
					lib.translate[i+'_bg']=lib.skill[i].marktext;
				}
				if(i[0]=='_'){
					lib.skill.global.add(i);
				}
			}
		},
		checkMod:function(){
			var name=arguments[arguments.length-2];
			var skills=arguments[arguments.length-1].concat(lib.skill.global);
			game.expandSkills(skills);
			var arg=[],i,info;
			for(i=0;i<arguments.length-2;i++){
				arg.push(arguments[i]);
			}
			for(i=0;i<skills.length;i++){
				info=get.info(skills[i]);
				if(info.mod&&info.mod[name]){
					var result=info.mod[name].apply(this,arg);
					if(typeof arg[arg.length-1]!='object'&&result!=undefined) arg[arg.length-1]=result;
				}
			}
			return arg[arg.length-1];
		},
		prepareArena:function(num){
			ui.create.players(num);
			ui.create.me();
			ui.create.cards();
			game.finishCards();
		},
        clearArena:function(){
            ui.control.innerHTML='';
            ui.arenalog.innerHTML='';
            var nodes=[];
            for(var i=0;i<ui.arena.childNodes.length;i++){
                nodes.push(ui.arena.childNodes[i]);
            }
            for(var i=0;i<nodes.length;i++){
                if(nodes[i]==ui.canvas) continue;
                if(nodes[i]==ui.control) continue;
                if(nodes[i]==ui.arenalog) continue;
                if(nodes[i]==ui.roundmenu) continue;
                if(nodes[i]==ui.timer) continue;
                nodes[i].remove();
            }
            ui.sidebar.innerHTML='';
            ui.cardPile.innerHTML='';
            ui.discardPile.innerHTML='';
            ui.special.innerHTML='';
            ui.playerids.remove();
            game.players.length=0;
            game.dead.length=0;
            game.me=null;
        },
		log:function(str){
			var str='';
			for(var i=0;i<arguments.length;i++){
				var itemtype=get.itemtype(arguments[i]);
				if(itemtype=='player'||itemtype=='players'){
					if(lib.config.log_highlight){
						str+='<span class="bluetext">'+get.translation(arguments[i])+'</span>';
					}
					else{
						str+=get.translation(arguments[i]);
					}
				}
				else if(itemtype=='cards'||itemtype=='card'||(typeof arguments[i]=='object'&&arguments[i].name)){
					if(lib.config.log_highlight){
						str+='<span class="yellowtext">'+get.translation(arguments[i])+'</span>';
					}
					else{
						str+=get.translation(arguments[i]);
					}
				}
				else if(typeof arguments[i]=='object'){
					str+=get.translation(arguments[i]);
				}
				else if(typeof arguments[i]=='string'&&arguments[i][0]=='【'&&arguments[i][arguments[i].length-1]=='】'){
					if(lib.config.log_highlight){
						str+='<span class="greentext">'+get.translation(arguments[i])+'</span>';
					}
					else{
						str+=get.translation(arguments[i]);
					}
				}
				else{
					str+=arguments[i];
				}

			}
			var node=ui.create.div();
			node.innerHTML=str;
			ui.sidebar.insertBefore(node,ui.sidebar.firstChild);
			game.addVideo('log',null,str);
            game.broadcast(function(str){
                game.log(str);
            },str);
			if(lib.config.title) document.title=str;
			if(lib.config.show_log!='off'&&lib.config.mode!='chess'){
				ui.arenalog.insertBefore(node.cloneNode(true),ui.arenalog.firstChild);
				while(ui.arenalog.childNodes.length&&ui.arenalog.scrollHeight>ui.arenalog.offsetHeight){
					ui.arenalog.lastChild.remove();
				}
			}
		},
		putDB:function(type,id,item,callback){
			if(!lib.db) return item;
			var put=lib.db.transaction([type],'readwrite').objectStore(type).put(item,id);
			if(callback){
				put.onsuccess=callback;
			}
		},
		getDB:function(type,id,callback){
			if(!lib.db){
				callback(null);
				return;
			}
			if(!callback) return;
			var store=lib.db.transaction([type],'readwrite').objectStore(type);
			if(id){
				store.get(id).onsuccess=function(e){
					callback(e.target.result);
				};
			}
			else{
				var obj={};
				store.openCursor().onsuccess=function(e){
					var cursor=e.target.result;
					if(cursor){
						obj[cursor.key]=cursor.value;
						cursor.continue();
					}
					else{
						callback(obj);
					}
				}
			}
		},
		deleteDB:function(type,id,callback){
			if(!lib.db){
				callback(false);
				return;
			}
			var store=lib.db.transaction([type],'readwrite').objectStore(type);
			store.delete(id).onsuccess=callback;
		},
		save:function(key,value){
			if(_status.reloading) return;
			var config={};
			if(arguments.length>0){
				try{
					config=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
					if(typeof config!='object') throw 'err';
				}
				catch(err){
					config={};
				}
				if(value==undefined){
					delete config[key];
					delete lib.storage[key];
				}
				else{
					config[key]=value;
					lib.storage[key]=value;
				}
			}
			config.version=lib.version;
			localStorage.setItem(lib.configprefix+lib.config.mode,JSON.stringify(config));
		},
		showChangeLog:function(){
			if(lib.version!=lib.config.version){
				game.saveConfig('version',lib.version);
				var ul=document.createElement('ul');
				ul.style.textAlign='left';
				for(var i=0;i<lib.changeLog.length;i++){
					var li=document.createElement('li');
					li.innerHTML=lib.changeLog[i];
					ul.appendChild(li);
				}
				var dialog=ui.create.dialog(lib.version+'更新内容','hidden');
				dialog.content.appendChild(ul);
				dialog.open();
				var hidden=false;
				if(!ui.auto.classList.contains('hidden')){
					ui.auto.hide();
					hidden=true;
				}
				game.pause();
				var control=ui.create.control('确定',function(){
					dialog.close();
					control.close();
					if(hidden) ui.auto.show();
					game.resume();
				});
			}
		},
		updateSave:function(){
			if(_status.reloading) return;
			localStorage.setItem(lib.configprefix+lib.config.mode,JSON.stringify(lib.storage));
		},
		saveConfig:function(key,value,local){
			if(_status.reloading) return;
			var config;
			try{
				config=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
				if(!config||typeof config!='object') throw 'err'
			}
			catch(err){
				config={};
			}
			if(local){
				var localmode;
				if(typeof local=='string'){
					localmode=local;
				}
				else{
					localmode=lib.config.mode;
				}
				if(!lib.config.mode_config[localmode]){
					lib.config.mode_config[localmode]={};
				}
				lib.config.mode_config[localmode][key]=value;
				key+='_mode_config_'+localmode;
			}
			else{
				lib.config[key]=value;
			}
			if(value===undefined){
				delete config[key];
			}
			else{
				config[key]=value;
			}
			localStorage.setItem(lib.configprefix+'config',JSON.stringify(config));
		},
		saveExtensionConfig:function(extension,key,value){
			return game.saveConfig('extension_'+extension+'_'+key,value);
		},
		getExtensionConfig:function(extension,key){
			return lib.config['extension_'+extension+'_'+key];
		},
		clearModeConfig:function(mode){
			if(_status.reloading) return;
			var config;
			try{
				config=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
				if(!config||typeof config!='object') throw 'err'
			}
			catch(err){
				config={};
			}
			for(var i in config){
				if(i.substr(i.indexOf('_mode_config')+13)==mode){
					delete config[i];
				}
			}
			localStorage.setItem(lib.configprefix+'config',JSON.stringify(config));
			localStorage.removeItem(lib.configprefix+mode);
		},
		addPlayer:function(position,character,character2){
			if(position<0||position>game.players.length+game.dead.length||position==undefined){
				position=Math.ceil(Math.random()*(game.players.length+game.dead.length));
			}
			var players=game.players.concat(game.dead);
			ui.arena.dataset.number=players.length+1;
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					players[i].dataset.position=parseInt(players[i].dataset.position)+1;
				}
			}
			var player=ui.create.player(ui.arena).animate('start');
			if(character) player.init(character,character2);
			game.players.push(player);
			player.dataset.position=position;
			game.arrangePlayers();
			return player;
		},
		addFellow:function(position,character,animation){
			game.addVideo('addFellow',null,[position,character]);
			var player=ui.create.player(ui.arena).animate(animation||'start');
			player.dataset.position=position||game.players.length+game.dead.length;
			if(character) player.init(character);
			game.players.push(player);game.arrangePlayers();
			return player;
		},
		restorePlayer:function(player){
			if(game.players.contains(player)||game.dead.contains(player)) return;
			var position=parseInt(player.dataset.position);
			if(position<0||position>game.players.length+game.dead.length||position==undefined){
				position=Math.ceil(Math.random()*(game.players.length+game.dead.length));
			}
			var players=game.players.concat(game.dead);
			ui.arena.dataset.number=players.length+1;
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					players[i].dataset.position=parseInt(players[i].dataset.position)+1;
				}
			}
			game.players.push(player);
			delete player.removed;
			player.removeAttribute('style');
			player.animate('start');
			ui.arena.appendChild(player);
			game.arrangePlayers();
			return player;
		},
		removePlayer:function(player){
			var players=game.players.concat(game.dead);
			player.style.top=player.offsetTop+'px';
			player.style.left=player.offsetLeft+'px';
			if(player==undefined) player=game.dead[0]||game.me.next;
			var position=parseInt(player.dataset.position);
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>position){
					players[i].dataset.position=parseInt(players[i].dataset.position)-1;
				}
			}
			if(player.isAlive()){
				player.next.previous=player.previous;
				player.previous.next=player.next;
			}
			player.nextSeat.previousSeat=player.previousSeat;
			player.previousSeat.nextSeat=player.nextSeat;
			player.delete();
			game.players.remove(player);
			game.dead.remove(player);
			ui.arena.dataset.number=players.length-1;
			player.removed=true;
			if(player==game.me){
				ui.me.hide();
				ui.auto.hide();
				ui.wuxie.hide();
			}
			setTimeout(function(){
				player.removeAttribute('style');
			},500);
			return player;
		},
		replacePlayer:function(player,character,character2){
			player.removed=true;
			var position=parseInt(player.dataset.position);
			game.players.remove(player);
			game.dead.remove(player);
			player.delete();
			var player2=ui.create.player(ui.arena).animate('start');
			if(character) player2.init(character,character2);
			game.players.push(player2);
			player2.dataset.position=position;
			player2.nextSeat=player.nextSeat;
			player2.previousSeat=player.previousSeat;
			player2.nextSeat.previousSeat=player2;
			player2.previousSeat.nextSeat=player2;
			var player3=player2.nextSeat;
			while(player3.isDead()) player3=player3.nextSeat;
			player3.previous=player2;
			player2.next=player3;
			var player4=player2.previousSeat;
			while(player4.isDead()) player4=player4.previousSeat;
			player4.next=player2;
			player2.previous=player4;
			return player2;
		},
		arrangePlayers:function(){
			if(lib.config.mode=='chess'&&game.me){
				var friendCount=0;
				var enemyCount=0;
				var rand=Math.random()<0.5;
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].side==game.me.side){
						if(rand){
							if(game.players[i]==game.friendZhu){
								game.players[i]._sortCount=-2;
							}
							else{
								game.players[i]._sortCount=2*friendCount;
							}
						}
						else{
							if(game.players[i]==game.friendZhu){
								game.players[i]._sortCount=-1;
							}
							else{
								game.players[i]._sortCount=2*friendCount+1;
							}
						}
						friendCount++;
					}
					else{
						if(rand){
							if(game.players[i]==game.enemyZhu){
								game.players[i]._sortCount=-1;
							}
							else{
								game.players[i]._sortCount=2*enemyCount+1;
							}
						}
						else{
							if(game.players[i]==game.enemyZhu){
								game.players[i]._sortCount=-2;
							}
							else{
								game.players[i]._sortCount=2*enemyCount;
							}
						}
						enemyCount++;
					}
				}
				game.players.sort(function(a,b){
					return a._sortCount-b._sortCount;
				});
				for(var i=0;i<game.players.length;i++){
					delete game.players[i]._sortCount;
				}
			}
			else{
				game.players.sort(lib.sort.position);
			}
			var players=game.players.concat(game.dead);
			players.sort(lib.sort.position);
			for(var i=0;i<players.length;i++){
				if(i==0){
					players[i].previousSeat=players[players.length-1];
				}
				else{
					players[i].previousSeat=players[i-1];
				}
				if(i==players.length-1){
					players[i].nextSeat=players[0];
				}
				else{
					players[i].nextSeat=players[i+1];
				}
			}
			for(var i=0;i<game.players.length;i++){
				if(i==0){
					game.players[i].previous=game.players[game.players.length-1];
				}
				else{
					game.players[i].previous=game.players[i-1];
				}
				if(i==game.players.length-1){
					game.players[i].next=game.players[0];
				}
				else{
					game.players[i].next=game.players[i+1];
				}
			}
		},
		filterSkills:function(skills,player){
			var out=skills.slice(0);
			var filter=[];
			for(var i in player.disabledSkills){
				if(typeof player.disabledSkills[i]=='string'){
					filter.add(player.disabledSkills[i]);
				}
				else if(Array.isArray(player.disabledSkills[i])){
					for(var j=0;j<player.disabledSkills[i].length;j++){
						filter.add(player.disabledSkills[i][j]);
					}
				}
			}
			for(var i=0;i<filter.length;i++){
				if(filter[i]){
					out.remove(filter[i]);
				}
			}
			return out;
		},
		expandSkills:function(skills){
			var skills2=[];
			for(var i=0;i<skills.length;i++){
                if(!get.info(skills[i])){
                    console.log(skills[i]);
                }
				if(get.info(skills[i]).group) skills2=skills2.concat(get.info(skills[i]).group);
			}
			for(var i=0;i<skills2.length;i++){
				skills.add(skills2[i]);
			}
			return skills;
		},
		css:function(style){
			for(var i in style){
				if(ui.style[i]) ui.style[i].innerHTML=i+JSON.stringify(style[i]).replace(/"/g,"");
				else{
					ui.style[i]=document.createElement('style');
					ui.style[i].innerHTML=i+JSON.stringify(style[i]).replace(/"/g,"");
					document.head.appendChild(ui.style[i]);
				}
			}
		},
		hasPlayer:function(func){
			for(var i=0;i<game.players.length;i++){
				if(func(game.players[i])) return true;
			}
			return false;
		},
		countPlayer:function(func){
			var num=0;
			for(var i=0;i<game.players.length;i++){
				if(func(game.players[i])) num++;
			}
			return num;
		},
		filterPlayer:function(func){
			var list=[];
			for(var i=0;i<game.players.length;i++){
				if(func(game.players[i])){
					list.push(game.players[i]);
				}
			}
			return list;
		},
		findCards:function(func){
			var cards=[];
			for(var i in lib.card){
				if(!lib.translate[i+'_info']) continue;
				if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
				if(func(i,lib.card[i])){
					cards.push(i);
				}
			}
			return cards;
		},
		players:[],
		dead:[],
		imported:[],
		phaseNumber:0
	};
	var ui={
		updates:[],
		thrown:[],
		touchlines:[],
		refresh:function(node){
			void window.getComputedStyle(node, null).getPropertyValue("opacity");
		},
		create:{
			div:function(){
				var str,innerHTML,position,position2,style,divposition,listen;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string'){
						if(typeof str=='string'){
							innerHTML=arguments[i];
						}
						else{
							str=arguments[i];
						}
					}
					else if(get.objtype(arguments[i])=='div'||
						get.objtype(arguments[i])=='table'||
						get.objtype(arguments[i])=='tr'||
						get.objtype(arguments[i])=='td'||
						get.objtype(arguments[i])=='body') position=arguments[i];
					else if(typeof arguments[i]=='number') position2=arguments[i];
					else if(get.itemtype(arguments[i])=='divposition') divposition=arguments[i];
					else if(typeof arguments[i]=='object') style=arguments[i];
					else if(typeof arguments[i]=='function') listen=arguments[i];
				}
				if(str==undefined) str='';
				var node=document.createElement('div');
	            for(var i=0;i<str.length;i++){
	                if(str[i]=='.'){
	                    if(node.className.length!=0){
	                        node.className+=' ';
	                    }
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.className+=str[i+1];
	                        i++;
	                    }
	                }
	                else if(str[i]=='#'){
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.id+=str[i+1];
	                        i++;
	                    }
	                }
	            }
	            if(position){
	            	if(typeof position2=='number'&&position.childNodes.length>position2){
	            		position.insertBefore(node,position.childNodes[position2]);
	            	}
	            	else{
	            		position.appendChild(node);
	            	}
	            }
	            if(style) node.css(style);
	            if(divposition) node.setPosition(divposition);
				if(innerHTML) node.innerHTML=innerHTML;
				if(listen) node.listen(listen);
	            return node;
			},
            chat:function(){
                var chat=ui.create.system('聊天',null,true);
                ui.chatButton=chat;
                lib.setPopped(chat,ui.click.chat,220);
            },
            roomInfo:function(){
                var chat=ui.create.system('房间信息',null,true);
                ui.roomInfo=chat;
                lib.setPopped(chat,function(){
                    if(game.getRoomInfo){
                        var uiintro=ui.create.dialog('hidden');
                        game.getRoomInfo(uiintro);
                        return uiintro;
                    }
                },180);
            },
			selectlist:function(list,init,position){
				var select=document.createElement('select');
				for(var i=0;i<list.length;i++){
					var option=document.createElement('option');
					if(Array.isArray(list[i])){
						option.value=list[i][0];
						option.innerHTML=list[i][1];
					}
					else{
						option.value=list[i];
						option.innerHTML=list[i];
					}
					if(init==list[i]){
						option.selected='selected';
					}
					select.appendChild(option);
				}
				if(position){
					position.appendChild(select);
				}
				return select;
			},
			table:function(){
				var str,row,col,position,position2,fixed,style,divposition;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string') str=arguments[i];
					else if(typeof arguments[i]=='number'){
						if(typeof row=='number'){
							if(typeof col=='number') position2=arguments[i];
							else col=arguments[i];
						}
						else row=arguments[i];
					}
					else if(get.objtype(arguments[i])=='div'||
						get.objtype(arguments[i])=='table'||
						get.objtype(arguments[i])=='tr'||
						get.objtype(arguments[i])=='td'||
						get.objtype(arguments[i])=='body') position=arguments[i];
					else if(typeof arguments[i]=='boolean') fixed=arguments[i];
					else if(get.itemtype(arguments[i])=='divposition') divposition=arguments[i];
					else if(typeof arguments[i]=='object') style=arguments[i];
				}
				if(str==undefined) str='';
				var node=document.createElement('table');
	            for(var i=0;i<str.length;i++){
	                if(str[i]=='.'){
	                    if(node.className.length!=0){
	                        node.className+=' ';
	                    }
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.className+=str[i+1];
	                        i++;
	                    }
	                }
	                else if(str[i]=='#'){
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.id+=str[i+1];
	                        i++;
	                    }
	                }
	            }
	            var tr,td;
	            for(var i=0;i<row;i++){
	            	tr=document.createElement('tr');
	            	if(fixed) tr.style.height=(100/row)+'%';
	            	node.appendChild(tr);
	            	for(var j=0;j<col;j++){
	            		td=document.createElement('td');
	            		tr.appendChild(td);
	            	}
	            }
	            if(position){
	            	if(typeof position2=='number'&&position.childNodes.length>position2){
	            		position.insertBefore(node,position.childNodes[position2]);
	            	}
	            	else{
	            		position.appendChild(node);
	            	}
	            }
	            return node;
			},
            giveup:function(){
                ui.create.system('投降',function(){
                    var player=game.me;
                    this.remove();
                    if(game.online){
                        game.send('giveup',player);
                    }
                    else{
                        game.log(player,'投降');
                        player.popup('投降');
                        setTimeout(function(){
                            player.die('nosource');
                        },1000);
                    }
                    if(_status.paused&&_status.imchoosing&&!_status.auto){
                        ui.click.auto();
                    }
                },true);
            },
			groupControl:function(dialog){
				return ui.create.control('wei','shu','wu','qun',function(link,node){
					if(link=='全部'){
						dialog.currentcapt='';
						dialog.currentgroup='';
						for(var i=0;i<dialog.buttons.length;i++){
							dialog.buttons[i].style.display='';
						}
					}
					else{
						if(node.classList.contains('thundertext')){
							dialog.currentgroup=null;
							dialog.currentgroupnode=null;
							node.classList.remove('thundertext');
							for(var i=0;i<dialog.buttons.length;i++){
								if(dialog.currentcapt&&dialog.buttons[i].capt!=dialog.getCurrentCapt(dialog.buttons[i].link,dialog.buttons[i].capt)){
									dialog.buttons[i].classList.add('nodisplay');
								}
								else{
									dialog.buttons[i].classList.remove('nodisplay');
								}
							}
						}
						else{
							if(dialog.currentgroupnode){
								dialog.currentgroupnode.classList.remove('thundertext');
							}
							dialog.currentgroup=link;
							dialog.currentgroupnode=node;
							node.classList.add('thundertext');
							for(var i=0;i<dialog.buttons.length;i++){
								if(dialog.buttons[i].group!=link||
								(dialog.currentcapt&&dialog.buttons[i].capt!=dialog.getCurrentCapt(dialog.buttons[i].link,dialog.buttons[i].capt))){
									dialog.buttons[i].classList.add('nodisplay');
								}
								else{
									dialog.buttons[i].classList.remove('nodisplay');
								}
							}
						}
					}
				});
			},
			cardDialog:function(){
				var args=['thisiscard'];
				for(var i=0;i<arguments.length;i++){
					args.push(arguments[i]);
				}
				return ui.create.characterDialog.apply(this,args);
			},
			characterDialog:function(){
				var filter,str,noclick,thisiscard,seperate;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i]==='thisiscard'){
						thisiscard=true;
					}
					else if(typeof arguments[i]=='object'&&typeof arguments[i].seperate=='function'){
						seperate=arguments[i].seperate;
					}
					else if(typeof arguments[i]==='string'){
						str=arguments[i];
					}
					else if(typeof arguments[i]==='function'){
						filter=arguments[i];
					}
					else if(typeof arguments[i]=='boolean'){
						noclick=arguments[i];
					}
				}
				var list=[];
				var dialog;
				var node=ui.create.div('.caption');
				if(lib.config.layout=='phone'){
					node.style.fontSize='30px';
				}
				var namecapt=[];
				var getCapt=function(str){
					if(lib.customCharacters.contains(str)){
						return '自创';
					}
					var capt;
					if(str.indexOf('_')==-1){
						capt=str[0];
					}
					else{
						capt=str[str.indexOf('_')+1];
					}
					capt=capt.toLowerCase();
					if(!/[a-z]/i.test(capt)){
                        capt='自创';
					}
					return capt;
				}
				if(thisiscard){
					for(var i in lib.card){
						if(!lib.translate[i+'_info']) continue;
						if(filter&&filter(i)) continue;
						list.push(['',get.translation(lib.card[i].type),i]);
						if(namecapt.indexOf(getCapt(i))==-1){
							namecapt.push(getCapt(i));
						}
					}
				}
				else{
					for(var i in lib.character){
						if(lib.character[i][4].contains('minskin')) continue;
						if(lib.character[i][4].contains('boss')||lib.character[i][4].contains('hiddenboss')){
							if(lib.config.mode=='boss') continue;
							if(!lib.character[i][4].contains('bossallowed')) continue;
						}

						if(lib.character[i][4].contains('stonehidden')) continue;
						if(lib.config.banned.contains(i)) continue;
						if(filter&&filter(i)) continue;
						list.push(i);
						if(namecapt.indexOf(getCapt(i))==-1){
							namecapt.push(getCapt(i));
						}
					}
				}
				namecapt.sort(function(a,b){
					return a>b?1:-1;
				});
                if(!thisiscard){
                    namecapt.remove('自创');
                    namecapt.push('newline');
                    for(var i in lib.characterDialogGroup){
                        namecapt.push(i);
                    }
                    namecapt.push('自创');
                }
                var newlined=false;
				var clickCapt=function(e){
					if(_status.dragged) return;
					if(this.classList.contains('thundertext')){
						dialog.currentcapt=null;
						dialog.currentcaptnode=null;
						this.classList.remove('thundertext');
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.currentgroup&&dialog.buttons[i].group!=dialog.currentgroup){
								dialog.buttons[i].classList.add('nodisplay');
							}
							else{
								dialog.buttons[i].classList.remove('nodisplay');
							}
						}
					}
					else{
						if(dialog.currentcaptnode){
							dialog.currentcaptnode.classList.remove('thundertext');
						}
						dialog.currentcapt=this.link;
						dialog.currentcaptnode=this;
						this.classList.add('thundertext');
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.buttons[i].capt!=dialog.getCurrentCapt(dialog.buttons[i].link,dialog.buttons[i].capt)||
							(dialog.currentgroup&&dialog.buttons[i].group!=dialog.currentgroup)){
								dialog.buttons[i].classList.add('nodisplay');
							}
							else{
								dialog.buttons[i].classList.remove('nodisplay');
							}
						}
					}
					if(dialog.seperate){
						for(var i=0;i<dialog.seperate.length;i++){
							if(!dialog.seperate[i].nextSibling.querySelector('.button:not(.nodisplay)')){
								dialog.seperate[i].style.display='none';
								dialog.seperate[i].nextSibling.style.display='none';
							}
							else{
								dialog.seperate[i].style.display='';
								dialog.seperate[i].nextSibling.style.display='';
							}
						}
					}

					if(e) e.stopPropagation();
				};
				for(i=0;i<namecapt.length;i++){
                    if(namecapt[i]=='newline'){
                        newlined=document.createElement('div');
                        newlined.style.marginTop='5px';
                        newlined.style.display='block';
                        newlined.style.fontFamily='xinwei';
                        newlined.style.fontSize='22px';
                        newlined.style.textAlign='center';
                        node.appendChild(newlined);
                    }
                    else if(newlined){
                        var span=document.createElement('span');
                        span.style.margin='3px';
    					span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
    					span.link=namecapt[i];
    					span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
    					newlined.appendChild(span);
                        node[namecapt[i]]=span;
                    }
                    else{
                        var span=document.createElement('span');
    					span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
    					span.link=namecapt[i];
    					span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
    					node.appendChild(span);
                    }
				}
				var groupSort;
				if(thisiscard){
					groupSort=function(name){
						if(lib.card[name[2]].type=='basic') return 0;
						if(lib.card[name[2]].type=='stonecard') return -0.5;
						if(lib.card[name[2]].type=='hsmengjing') return 0.3;
						if(lib.card[name[2]].type=='hsbaowu') return 0.3;
						if(lib.card[name[2]].type=='hsshenqi') return 0.3;
						if(lib.card[name[2]].type=='stonecharacter') return -1;
						if(lib.card[name[2]].type=='chess') return 1.5;
						if(lib.card[name[2]].type=='trick') return 2;
						if(lib.card[name[2]].type=='delay') return 3;
						if(lib.card[name[2]].type=='equip') return 4;
						if(lib.card[name[2]].type=='zhenfa') return 5;
						return 6;
					};
				}
				else{
					groupSort=function(name){
						if(lib.character[name][1]=='wei') return 0;
						if(lib.character[name][1]=='shu') return 1;
						if(lib.character[name][1]=='wu') return 2;
						if(lib.character[name][1]=='qun') return 3;
					}
				}
				list.sort(function(a,b){
					var del=groupSort(a)-groupSort(b);
					if(del!=0) return del;
					var aa=a,bb=b;
					if(a.indexOf('_')!=-1){
						a=a.slice(a.indexOf('_')+1);
					}
					if(b.indexOf('_')!=-1){
						b=b.slice(b.indexOf('_')+1);
					}
					if(a!=b){
						return a>b?1:-1;
					}
					return aa>bb?1:-1;
				});
				dialog=ui.create.dialog('hidden');
                dialog.getCurrentCapt=function(link,capt){
                    if(lib.characterDialogGroup[this.currentcapt]){
                        return lib.characterDialogGroup[this.currentcapt](link,capt);
                    }
                    return this.currentcapt;
                }
				if(str){
					dialog.add(str);
				}
				dialog.add(node);
				if(thisiscard){
					if(seperate){
						seperate=seperate(list);
						dialog.seperate=[];
						for(var i in seperate){
							var link='';
							var linkcontent=seperate[i];
							if(i.indexOf('_link:')!=-1){
								link=i.slice(i.indexOf('_link:')+6);
								i=i.slice(0,i.indexOf('_link:'));
							}
							var nodesep=dialog.add(i);
							nodesep.link=link;
							dialog.seperate.push(nodesep);
							dialog.add([linkcontent,'vcard'],noclick);
						}
					}
					else{
						dialog.add([list,'vcard'],noclick);
					}
				}
				else{
					dialog.add([list,'character'],noclick);
				}
				dialog.add(ui.create.div('.placeholder'));
				for(i=0;i<dialog.buttons.length;i++){
					if(thisiscard){
						dialog.buttons[i].capt=getCapt(dialog.buttons[i].link[2]);
					}
					else{
						dialog.buttons[i].group=lib.character[dialog.buttons[i].link][1];
						dialog.buttons[i].capt=getCapt(dialog.buttons[i].link);
					}
				}

                if(!thisiscard&&(lib.characterDialogGroup[lib.config.character_dialog_tool]||
                    lib.config.character_dialog_tool=='自创')){
                    clickCapt.call(node[lib.config.character_dialog_tool]);
                }
				return dialog;
			},
			dialog:function(){
				var i;
				var hidden=false;
                var notouchscroll=false;
				var dialog=ui.create.div('.dialog');
				dialog.contentContainer=ui.create.div('.content-container',dialog);
				dialog.content=ui.create.div('.content',dialog.contentContainer);
				dialog.bar1=ui.create.div('.bar.top',dialog);
				dialog.bar2=ui.create.div('.bar.bottom',dialog);
				dialog.buttons=[];
				for(i in lib.element.dialog){
					dialog[i]=lib.element.dialog[i];
				}
				for(i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='boolean') dialog.static=arguments[i];
                    else if(arguments[i]=='hidden') hidden=true;
					else if(arguments[i]=='notouchscroll') notouchscroll=true;
					else dialog.add(arguments[i]);
				}
				if(!hidden){
					dialog.open();
				}
				if(!lib.config.touchscreen) dialog.contentContainer.onscroll=ui.update;
                if(!notouchscroll){
                    dialog.contentContainer.ontouchstart=ui.click.dialogtouchStart;
    				dialog.contentContainer.ontouchmove = ui.click.touchScroll;
    				dialog.contentContainer.style.WebkitOverflowScrolling='touch';
    				dialog.ontouchstart=ui.click.dragtouchdialog;
                }
				return dialog;
			},
			line2:function(){
				var node=ui.create.line.apply(this,arguments);
				node.classList.add('line2');
				return node;
			},
			line:function(){
				var two=false,func;
				var node=ui.create.div('.config');
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string'||typeof arguments[i]=='number'){
						if(two) ui.create.div('.toggle',node).innerHTML=arguments[i];
						else {
							ui.create.div(node).innerHTML=arguments[i];
							two=true;
						}
					}
					else if(typeof arguments[i]=='function') func=arguments[i];
				}
				if(func){
					for(var i=0;i<node.childNodes.length;i++) node.childNodes[i].listen(func);
				}
				return node;
			},
			switcher:function(name,current,current2){
				var func;
				var node=ui.create.div('.config');
				ui.create.div(node).innerHTML=get.translation(name+'_config');
				var switcher=ui.create.div('.toggle',node);
				switcher.name=name;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='function'){
						func=arguments[i];break;
					}
				}
				if(typeof current=='string'){
					switcher.link=current;
					switcher.innerHTML=get.translation(current);
					switcher.contentEditable=true;
                    switcher.style.webkitUserSelect='text';
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.editor);
				}
				else if(typeof current=='object'){
					switcher.link=current2||current[0];
					switcher.innerHTML=get.translation(switcher.link);
					switcher.choice=current;
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.switcher);
				}
				else{
					if(current){
						switcher.classList.add('on');
					}
					switcher.classList.add('onoff');
					ui.create.div(ui.create.div(switcher));
					switcher.link=current?true:false;
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.toggle);
				}
				if(func) switcher.additionalCommand=func;
				return node;
			},
			caption:function(str,position){
				var caption=ui.create.div('.caption',position);
				caption.innerHTML=str;
				return caption;
			},
			control:function(){
				var nc=(ui.control.childNodes.length==0);
				// for(var i=0;i<ui.control.childNodes.length;i++){
				// 	if(ui.control.childNodes[i].classList.contains('removing')){
				// 		var that=ui.control.childNodes[i];
				// 		var width=that.offsetWidth;
				// 		that.style.marginLeft=(-width/2)+'px';
				// 		that.style.marginRight=(-width/2)+'px';
				// 		that.style.transitionDuration=0.8*parseFloat(getComputedStyle(that).opacity)+'s';
				// 	}
				// }
				var i,controls;
				var nozoom=false;
				if(get.objtype(arguments[0])=='array') controls=arguments[0];
				else controls=arguments;
				var control=ui.create.div('.control');
				ui.control.insertBefore(control,_status.createControl||ui.confirm);
				for(i in lib.element.control){
					control[i]=lib.element.control[i];
				}
				for(i=0;i<controls.length;i++){
					if(typeof controls[i]=='function'){
						control.custom=controls[i];
					}
					else if(controls[i]=='nozoom'){
						nozoom=true;
					}
					else{
						control.add(controls[i]);
					}
				}
				ui.controls.unshift(control);
				if(nc){
					ui.control.animate('nozoom',100);
				}
				// if(ui.control.classList.contains('nozoom')){
				// 	nozoom=true;
				// }
				// if(nozoom){
				// 	control.classList.add('nozoom');
				// }
				if(control.childNodes.length){
					// if(nozoom||true){
					control.style.transition='opacity 0.5s';
					// }
					// else{
					// 	control.style.transition='';
					// 	control.style.transform='scale(0.8)';
					// }
					ui.refresh(control);
					control.style.transform='translateX(-'+(control.offsetWidth/2)+'px)';
					control.style.opacity=1;
					ui.refresh(control);
					control.style.transition='';
				}
				ui.updatec();
				return control;
			},
			confirm:function(str,func){
				if(ui.confirm&&ui.confirm.str==str){
					return;
				}
				if(str=='o'){
					if(ui.confirm){
						ui.confirm.replace('ok');
					}
					else{
						ui.confirm=ui.create.control('ok');
					}
				}
				else if(str=='oc'||str=='co'){
					if(ui.confirm){
						ui.confirm.replace('ok','cancel');
					}
					else{
						ui.confirm=ui.create.control('ok','cancel');
					}
				}
				else if(str=='c'){
					if(ui.confirm){
						ui.confirm.replace('cancel');
					}
					else{
						ui.confirm=ui.create.control('cancel');
					}
				}
				else if(ui.confirm){
					ui.confirm.close();
					delete ui.confirm;
				}
				if(ui.confirm){
					ui.confirm.str=str;
					if(func) ui.confirm.custom=func;
					else delete ui.confirm.custom;
				}
			},
			skills:function(skills){
				var i,same;
				if(ui.skills){
					if(ui.skills.skills.length==skills.length&&ui.skills.style.display!='none'){
						same=true;
						for(i=0;i<skills.length;i++){
							if(ui.skills.skills.contains(skills[i])==false){
								same=false;
								break;
							}
						}
					}
					if(same) return;
					ui.skills.close();
					delete ui.skills;
				}
				if(skills==undefined||skills.length==0) return;
				if(!_status.event.isMine()){
					_status.noupdatec=true;
				}
				ui.skills=ui.create.control(skills.concat([ui.click.skill]));
				if(!_status.event.isMine()){
					ui.skills.style.display='none';
				}
				else{
					ui.updatec();
				}
				_status.noupdatec=false;
				ui.skills.skills=skills;
				return ui.skills;
			},
			skills2:function(skills){
				var i,same;
				if(ui.skills2){
					if(ui.skills2.skills.length==skills.length&&ui.skills2.style.display!='none'){
						same=true;
						for(i=0;i<skills.length;i++){
							if(ui.skills2.skills.contains(skills[i])==false){
								same=false;
								break;
							}
						}
					}
					if(same) return;
					ui.skills2.close();
					delete ui.skills2;
				}
				if(skills==undefined||skills.length==0) return;
				if(!_status.event.isMine()){
					_status.noupdatec=true;
				}
				ui.skills2=ui.create.control(skills.concat([ui.click.skill]));
				if(!_status.event.isMine()){
					ui.skills2.style.display='none';
				}
				else{
					ui.updatec();
				}
				_status.noupdatec=false;
				ui.skills2.skills=skills;
				return ui.skills2;
			},
			skills3:function(skills){
				var i,same;
				if(ui.skills3){
					if(ui.skills3.skills.length==skills.length&&ui.skills3.style.display!='none'){
						same=true;
						for(i=0;i<skills.length;i++){
							if(ui.skills3.skills.contains(skills[i])==false){
								same=false;
								break;
							}
						}
					}
					if(same) return;
					ui.skills3.close();
					delete ui.skills3;
				}
				if(skills==undefined||skills.length==0) return;
				if(!_status.event.isMine()){
					_status.noupdatec=true;
				}
				ui.skills3=ui.create.control(skills.concat([ui.click.skill]));
				if(!_status.event.isMine()){
					ui.skills3.style.display='none';
				}
				else{
					ui.updatec();
				}
				_status.noupdatec=false;
				ui.skills3.skills=skills;
				return ui.skills3;
			},
			arena:function(){
				var i,j;
				ui.window=ui.create.div('#window.hidden',document.body);
				if(window.isIpad){
					ui.window.classList.add('ipad');
					delete window.isIpad;
				}
				ui.refresh(ui.window);
				if(!localStorage.getItem(lib.configprefix+'playback')){
					ui.window.show();
				}
				else{
					setTimeout(function(){
						ui.window.show();
					},1000);
				}

				if(lib.config.test_game){
					lib.storage.test=true;
				}

				ui.window.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.window);
				ui.system=ui.create.div("#system.",ui.window);
				ui.arena=ui.create.div('#arena',ui.window);

				if(lib.config.layout=='mobile'||lib.config.layout=='phone'){
					ui.arena.classList.add('mobile');
				}
				if(lib.config.layout=='default'){
					ui.arena.classList.add('oldlayout');
				}
				if(lib.config.low_performance){
					ui.arena.classList.add('low_performance');
				}
				if(lib.config.slim_player){
					ui.arena.classList.add('slim_player');
				}
				if(lib.config.reduce_radius){
					ui.window.classList.add('reduce_radius');
				}
				if(lib.config.layout=='default'&&lib.config.hp_style=='official'){
					ui.arena.classList.add('hpimage');
				}
				// var themeentry='background_color_'+lib.config.theme;
				// if(lib.config[themeentry]){
				// 	document.body.dataset[themeentry]=lib.config[themeentry];
				// }
				// themeentry='theme_color_'+lib.config.theme;
				// if(lib.config[themeentry]){
				// 	document.body.dataset[themeentry]=lib.config[themeentry];
				// }

				ui.arena.dataset.target_shake=lib.config.target_shake||'shake';

				ui.arena.dataset.name_font=lib.config.name_font||'xinwei';
				ui.arena.dataset.identity_font=lib.config.identity_font||'huangcao';
				ui.arena.dataset.cardtext_font=lib.config.cardtext_font||'default';
				ui.arena.dataset.global_font=lib.config.global_font||'default';
				// ui.arena.dataset.font_size=lib.config.font_size||'16';
				ui.arena.dataset.glow_phase=lib.config.glow_phase;
				ui.backgroundMusic=document.createElement('audio');
				ui.backgroundMusic.volume=lib.config.volumn_background/8;
				game.playBackgroundMusic();
				ui.backgroundMusic.autoplay=true;
				ui.backgroundMusic.addEventListener('ended',game.playBackgroundMusic);
				ui.window.appendChild(ui.backgroundMusic);

				ui.arenalog=ui.create.div('#arenalog',ui.arena);
				if(lib.config.show_log=='off'){
					ui.arenalog.style.display='none';
				}
				else{
					ui.arenalog.dataset.position=lib.config.show_log;
				}

				ui.roundmenu=ui.create.div('#roundmenu.roundarenabutton.menubutton.round',ui.arena);
				ui.roundmenu._position=[180,210];
				ui.create.div(ui.roundmenu);
				ui.create.div(ui.roundmenu);
				ui.create.div(ui.roundmenu);
				ui.create.div(ui.roundmenu);
				ui.create.div(ui.roundmenu);
				ui.create.div(ui.roundmenu);
				var resetround=function(e){
					_status.draggingroundmenu=false;
					ui.roundmenu.style.transform='';
					ui.roundmenu._dragtransform=[0,0];
					ui.roundmenu.style.transition='all 0.3s';
					delete ui.roundmenu._dragtouches;
					delete ui.roundmenu._dragorigin;
					delete ui.roundmenu._dragorigintransform;
					setTimeout(function(){
						ui.roundmenu.style.transition='';
					},500);
					game.saveConfig('roundmenu_transform',[0,0]);
					if(e) e.stopPropagation();
					return false;
				};
                ui.click.resetround=resetround;
				if(lib.config.touchscreen){
					ui.roundmenu.addEventListener('touchstart',function(e){
						_status.draggingroundmenu=true;
						ui.roundmenu._dragorigin={
							clientX:e.touches[0].clientX,
							clientY:e.touches[0].clientY,
						};
						if(!ui.roundmenu._dragtransform){
							ui.roundmenu._dragtransform=[0,0];
						}
						ui.roundmenu._dragorigintransform=ui.roundmenu._dragtransform.slice(0);
						ui.roundmenu._resetTimeout=setTimeout(function(){
							resetround();
							delete ui.roundmenu._resetTimeout;
						},1000);
					});
				}
				else{
					ui.roundmenu.oncontextmenu=resetround;
				}
                if(!lib.config.remember_round_button){
                    game.saveConfig('roundmenu_transform');
                }
				if(lib.config.roundmenu_transform){
					var translate=lib.config.roundmenu_transform;
					ui.roundmenu._dragtransform=translate;
					ui.roundmenu.style.transform='translate('+translate[0]+'px,'+translate[1]+'px)';
					ui.click.checkroundtranslate();
				}
				if(lib.config.layout!='phone'){
					ui.roundmenu.style.display='none';
				}

				ui.sidebar=ui.create.div('#sidebar');
				ui.sidebar3=ui.create.div('#sidebar3');
				ui.canvas=document.createElement('canvas');

				ui.arena.appendChild(ui.canvas);
				ui.canvas.id='canvas';
				ui.ctx=ui.canvas.getContext('2d');
				ui.configbg=ui.create.div("#click");
				ui.configbg.listen(ui.click.config2);
				if(!lib.config.touchscreen){
					ui.configbg.oncontextmenu=ui.click.config2;
				}
				ui.config=ui.create.div('#sidebar2.content');
				ui.config.listen(function(){
					if(_status.reloading) return;
					if(_status.choosing){
						if(!_status.choosing.expand){
							_status.choosing.parentNode.style.height='';
							_status.choosing.nextSibling.delete();
							_status.choosing.previousSibling.show();
							delete _status.choosing;
						}
					}
					_status.clicked=true;
					if(ui.arena.classList.contains('selecting')){
						game.check();
					}
				});
				if(!lib.config.touchscreen){
					ui.config.oncontextmenu=function(e){
						e.stopPropagation();
						return false;
					};
				}

				ui.sidebar.ontouchstart=ui.click.touchStart;
				ui.config.ontouchstart=ui.click.touchStart;
				ui.sidebar.ontouchmove = ui.click.touchScroll;
				ui.config.ontouchmove = ui.click.touchScroll;
				ui.sidebar.style.WebkitOverflowScrolling='touch';
				ui.config.style.WebkitOverflowScrolling='touch';
				if(false&&lib.config.right_sidebar){
					ui.sidebar.classList.add('right');
					ui.sidebar3.classList.add('left');
					ui.config.classList.add('right');
				}

				switch(lib.config.ui_zoom){
					case 'esmall':ui.window.style.zoom=0.8;break;
					case 'vsmall':ui.window.style.zoom=0.9;break;
					case 'small':ui.window.style.zoom=0.95;break;
					case 'big':ui.window.style.zoom=1.05;break;
					case 'vbig':ui.window.style.zoom=1.1;break;
					case 'ebig':ui.window.style.zoom=1.2;break;
					default:ui.window.style.zoom=1;
				}

				var autoskill={};
				ui.autoskill=autoskill;

				if(!lib.config.autoskilllist){
					lib.config.autoskilllist=[];
				}
				var nodex;
				for(i in lib.skill){
					if(lib.skill[i].frequent&&lib.translate[i]){
						lib.translate[i+'_forbid_config']=lib.translate[i];
						nodex=ui.create.switcher(i+'_forbid',
							!lib.config.autoskilllist.contains(i),ui.click.autoskill);
						nodex.link=i;
						autoskill[i]=nodex;
					}
				}

				ui.system1=ui.create.div('#system1',ui.system);
				ui.system2=ui.create.div('#system2',ui.system);

				ui.replay=ui.create.system('重来',game.reload,true);
                ui.replay.id='restartbutton';
				ui.config2=ui.create.system('选项',ui.click.config);
				ui.pause=ui.create.system('暂停',ui.click.pause);
                ui.pause.id='pausebutton';
				if(!lib.config.touchscreen){
					lib.setPopped(ui.pause,ui.click.pausehistory,220,400);
				}
				if(!lib.config.show_pause){
					ui.pause.style.display='none';
				}
				ui.cardPileButton=ui.create.system('牌堆',null,true);
				lib.setPopped(ui.cardPileButton,ui.click.cardPileButton,220);
				ui.wuxie=ui.create.system('不询问无懈',ui.click.wuxie,true);
				if(!lib.config.touchscreen){
					lib.setPopped(ui.config2,ui.click.pauseconfig,170);
				}
				ui.auto=ui.create.system('托管',ui.click.auto);
                ui.auto.id='autobutton';
				ui.volumn=ui.create.system('♫');
				lib.setPopped(ui.volumn,ui.click.volumn,200);
				// if(lib.config.show_pause) ui.auto.style.marginLeft='10px';
				if(!lib.config.show_volumn){
					ui.volumn.style.display='none';
				}
				if(!lib.config.show_auto){
					ui.auto.style.display='none';
				}
				if(!lib.config.show_wuxie){
					ui.wuxie.style.display='none';
				}
				if(!lib.config.show_cardpile||_status.connectMode){
					ui.cardPileButton.style.display='none';
				}
				if(lib.config.touchscreen&&!lib.config.confirmtouch){
					var backtomouse=ui.create.system('返回鼠标模式');
					backtomouse.addEventListener('click',function(){
						game.saveConfig('touchscreen',false);
						game.reload();
					});
					var keeptouch=ui.create.system('确认触屏');
					keeptouch.addEventListener('touchend',function(){
						game.saveConfig('confirmtouch',true);
						keeptouch.remove();
						backtomouse.remove();
					});
				}
				ui.playerids=ui.create.system('显示身份',function(){
					if(game.showIdentity){
						game.showIdentity();
						_status.identityShown=true;
					}
				},true);
				if(!lib.config.show_playerids||!game.showIdentity){
					ui.playerids.style.display='none';
				}
				if(!lib.config.show_replay){
					ui.replay.style.display='none';
				}
				ui.control=ui.create.div('#control',ui.arena).animate('nozoom');
				ui.cardPile=ui.create.div('#cardPile');
				ui.discardPile=ui.create.div('#discardPile');
				ui.special=ui.create.div('#special');
				ui.dialogs=[];
				ui.controls=[];
				ui.style={};


                ui.timer=ui.create.div('.skillbar.shadowed.playerbg.hidden');
                ui.timer.id='timer';
                ui.create.div('.skillbarshadow',ui.timer);
                ui.create.div('.skillbarfill',ui.timer);
                ui.timer.fillnode=ui.create.div(ui.timer.lastChild);
                ui.timer.popnode=ui.create.div('.skillbartext',ui.timer);
                ui.timer.popnode.style.opacity=1;
                ui.timer.position=4;
                ui.timer.style.zIndex=5;
                ui.timer.set=function(text,percentage){
                    if(typeof text=='string'||typeof text=='number'){
                        ui.timer.popnode.innerHTML=text;
                    }
                    ui.timer.fillnode.style.top=((1-percentage)*100)+'%';
                }
                var setTimerPosition=function(e){
                    this.position++;
                    if(this.position>4){
                        this.position=1;
                    }
                    var left1='180px';
                    var left2='calc(100% - 245px)';
                    var top1='210px';
                    var top2='calc(100% - 245px)';
                    if(lib.config.layout=='default'){
                        left1='265px';
                        top1='160px';
                        left2='calc(100% - 330px)';
                        top2='calc(100% - 235px)';
                    }
                    if(this.position==1||this.position==2){
                        this.style.top=top2;
                    }
                    else{
                        this.style.top=top1;
                    }
                    if(this.position==1||this.position==4){
                        this.style.left=left2;
                    }
                    else{
                        this.style.left=left1;
                    }
                }
                ui.timer.listen(setTimerPosition);

                ui.shortcut=ui.create.div('#shortcut.hidden',ui.window);
                ui.shortcut.listen(ui.click.shortcut);
                ui.create.div(ui.shortcut,function(e){e.stopPropagation()});
                ui.create.div('.menubutton.round','<span>重来</span>',ui.shortcut,game.reload).dataset.position=1;
                ui.create.div('.menubutton.round','<span>退出</span>',ui.shortcut,game.exit).dataset.position=3;
                ui.create.div('.menubutton.round','<span>记录</span>',ui.shortcut,ui.click.pause).dataset.position=4;
                ui.shortcut.autobutton=ui.create.div('.menubutton.round','<span>托管</span>',ui.shortcut,ui.click.auto);
                ui.shortcut.autobutton.dataset.position=2;
                // ui.create.div('.menubutton.round','<span>菜单</span>',ui.shortcut,ui.click.config).dataset.position=5;


                if(_status.connectMode){
                    ui.playerids.remove();
                    ui.pause.innerHTML='记录';
                }
                setTimerPosition.call(ui.timer);
                ui.arena.appendChild(ui.timer);

				(function(){
					var menu,menuContainer;
					var startButton;
                    var connectButton;
					var popupContainer;
		            var closeMenu=function(){
		                popupContainer.classList.add('hidden');
		                if(popupContainer.onclose){
		                    popupContainer.onclose();
		                }
		            };
		            popupContainer=ui.create.div('.popup-container.hidden',ui.window,closeMenu);

		            var openMenu=function(node,e,onclose){
		                popupContainer.innerHTML='';
		                if(e){
		                    node.style.left=e.x+'px';
		                    node.style.top=e.y+'px';
		                }
		                popupContainer.appendChild(node);
		                popupContainer.classList.remove('hidden');
		                popupContainer.onclose=onclose;
		            };
		            var clickToggle=function(){
		                this.classList.toggle('on');
		                var config=this._link.config;
		                if(config.onclick){
		                    config.onclick.call(this,this.classList.contains('on'));
		                }
		                if(config.update){
		                    config.update();
		                }
		            };
		            var clickSwitcher=function(){
		                var node=this;
		                this.classList.add('on');
		                if(this._link.menu){
		                    var pos1=this.lastChild.getBoundingClientRect();
		                    var pos2=ui.window.getBoundingClientRect();
                            if(this._link.menu.childElementCount>10){
                                openMenu(this._link.menu,{
    		                        x:pos1.left+pos1.width+5-pos2.left,
    		                        y:Math.min((ui.window.offsetHeight-400)/2,pos1.top-pos2.top)
    		                    },function(){
    		                        node.classList.remove('on');
    		                    });
                                lib.setScroll(this._link.menu);
                            }
                            else{
                                openMenu(this._link.menu,{
    		                        x:pos1.left+pos1.width+5-pos2.left,
    		                        y:pos1.top-pos2.top
    		                    },function(){
    		                        node.classList.remove('on');
    		                    });
                            }
		                }
		            };
					var clickContainer=function(){
						menuContainer.classList.add('hidden');

						game.resume2();
						if(game.onresume2){
							game.onresume2();
						}
						ui.arena.classList.remove('menupaused');
						ui.config2.classList.remove('pressdown2');
					};
					var clickMenuItem=function(){
		                var node=this.parentNode._link;
		                var config=node._link.config;
		                node._link.current=this.link;
		                node.lastChild.innerHTML=config.item[this._link];
		                if(config.onclick){
		                    config.onclick.call(node,this._link);
		                }
		                if(config.update){
		                    config.update();
		                }
		            };
					var createMenu=function(tabs,config){
						var createPage=function(position){
			                var node=ui.create.div(position);
			                lib.setScroll(ui.create.div('.left.pane',node));
			                lib.setScroll(ui.create.div('.right.pane',node));
			                return node;
			            };
						var menu=ui.create.div('.main.menu.dialog.popped.static',config.position,function(e){
			                e.stopPropagation();
			            });
		                var menuTab=ui.create.div('.menu-tab',menu);
		                var menuTabBar=ui.create.div('.menu-tab-bar',menu);
						menuTabBar.style.left=(config.bar||0)+'px';
		                var menuContent=ui.create.div('.menu-content',menu);
		                var clickTab=function(){
							if(this.classList.contains('disabled')) return;
		                    var active=this.parentNode.querySelector('.active');
		                    if(active){
		                        active.classList.remove('active');
		                        active._link.remove();
		                    }
		                    this.classList.add('active');
		                    menuTabBar.style.left=this.offsetLeft+'px';
		                    menuContent.appendChild(this._link);
		                };
						ui.click.menuTab=function(tab){
							for(var i=0;i<menuTab.childNodes.length;i++){
								if(menuTab.childNodes[i].innerHTML==tab){
									clickTab.call(menuTab.childNodes[i]);
									return;
								}
							}
						};
		                var pages=[];
		                for(var i=0;i<tabs.length;i++){
		                    var active=(i===(config.init||0));
		                    pages[i]=createPage(active?menuContent:null);
		                    ui.create.div(active?'.active':'',tabs[i],menuTab,clickTab)._link=pages[i];
		                }
		                return {
		                    menu:menu,
		                    pages:pages
		                };
					};
					var createConfig=function(config,position){
		                var node=ui.create.div('.config',config.name);
						node._link={config:config};
		                if(config.item){
		                    if(Array.isArray(config.init)){

		                    }
		                    else{
		                        node.classList.add('switcher');
		                        node.listen(clickSwitcher);
		                        ui.create.div('',config.item[config.init],node);
		                        node._link.menu=ui.create.div('.menu');
								node._link.menu._link=node;
		                        node._link.current=config.init;
		                        for(var i in config.item){
		                            ui.create.div('',config.item[i],node._link.menu,clickMenuItem)._link=i;
		                        }
		                    }
		                }
		                else if(config.range){

		                }
						else if(config.clear){
							node.listen(clickToggle);
						}
                        else if(config.input){
                            node.classList.add('switcher');
                            var input=ui.create.div(node);
                            input.innerHTML=config.init||'无名玩家';
                            input.contentEditable=true;
                            input.style.webkitUserSelect='text';
                            input.style.minWidth='10px';
                            input.onkeydown=function(e){
            					if(e.keyCode==13){
            						e.preventDefault();
            						e.stopPropagation();
            						input.blur();
            					}
            				};
                            input.onblur=function(){
                                input.innerHTML=input.innerHTML.replace(/\<br\>/g,'');
                                if(!input.innerHTML){
                                    input.innerHTML='无名玩家';
                                }
                                game.saveConfig('connect_nickname',input.innerHTML);
                                game.saveConfig('connect_nickname',input.innerHTML,'connect');
                            }
                        }
		                else{
		                    node.classList.add('toggle');
		                    node.listen(clickToggle);
		                    ui.create.div(ui.create.div(node));
		                    if(config.init==true){
		                        node.classList.add('on');
		                    }
		                }
		                if(position){
		                    position.appendChild(node);
		                }
		                return node;
		            };
					var menuUpdates=[];
					menuContainer=ui.create.div('.menu-container.hidden',ui.window,clickContainer);
					ui.menuContainer=menuContainer;
					ui.click.configMenu=function(){
                        ui.click.shortcut(false)
                        if(menuContainer.classList.contains('hidden')){
							ui.config2.classList.add('pressdown2');
							ui.arena.classList.add('menupaused');
                            menuContainer.classList.remove('hidden');
							for(var i=0;i<menuUpdates.length;i++){
								menuUpdates[i]();
							}
                        }
                        else{
							clickContainer.call(menuContainer);
                        }
					}

					var menux=createMenu(['开始','选项','武将','卡牌','战局','帮助'],{
	                    position:menuContainer,bar:40
	                });
					menu=menux.menu;

					var copyObj=function(obj){
						var copy={};
						for(var i in obj){
							if(get.objtype(obj[i])=='object'){
								copy[i]=copyObj(obj[i]);
							}
							else if(Array.isArray(obj[i])){
								copy[i]=obj[i].slice(0);
							}
							else{
								copy[i]=obj[i];
							}
						}
						return copy;
					};

					(function(){
						var start=menux.pages[0];
						var rightPane=start.lastChild;


                        connectButton=ui.create.div('.menubutton.round.highlight','联',start,function(){
                            this.classList.toggle('glow');
                            var active=this.parentNode.querySelector('.active');
                            if(active&&active.update){
                                active.update();
	                        }
	                    });
                        if(!lib.node){
                            connectButton.style.display='none';
                        }
                        connectButton.style.left='275px';
                        ui.connectButton=connectButton;
                        if(lib.config.connectMode){
                            connectButton.classList.add('glow');
                        }

						startButton=ui.create.div('.menubutton.round.highlight','启',start,function(){
	                        if(this.animating||this.classList.contains('dim')){
	                            return;
	                        }
	                        var active=this.parentNode.querySelector('.active');
	                        if(active){
                                if(connectButton.classList.contains('glow')&&lib.mode[active.mode].connect){
                                    game.saveConfig('connectMode',true);
                                }
                                else{
                                    game.saveConfig('connectMode');
                                }
								game.saveConfig('mode',active.mode);
								localStorage.setItem(lib.configprefix+'directstart',true);
								game.reload();
	                        }
	                    });

						var clickMode=function(){
							var active=this.parentNode.querySelector('.active');
							if(active===this){
								return;
							}
							active.classList.remove('active');
							active.link.remove();
							active=this;
							this.classList.add('active');
							rightPane.appendChild(this.link);
                            if(lib.mode[this.mode].connect&&lib.node){
                                connectButton.style.display='';
                            }
                            else{
                                connectButton.style.display='none';
                            }
						};

						var createModeConfig=function(mode,position){
	                        var info=lib.mode[mode];
	                        var page=ui.create.div('');
	                        var node=ui.create.div('.menubutton.large',info.name,position,clickMode);
							node.link=page;
							node.mode=mode;
							if(mode==lib.config.mode){
								node.classList.add('active');
							}
	                        var map={};
	                        if(info.config){
	                            var hiddenNodes=[];
								var config=lib.config.mode_config[mode]||{};
	                            for(var j in info.config){
	                                if(j==='update'){
	                                    continue;
	                                }
	                                var cfg=copyObj(info.config[j]);
									cfg._name=j;
									cfg.mode=mode;
	                                if(!config.hasOwnProperty(j)){
										game.saveConfig(j,cfg.init,mode);
	                                }
	                                else{
	                                    cfg.init=config[j];
	                                }
	                                if(!cfg.onclick){
	                                    cfg.onclick=function(result){
											var cfg=this._link.config;
											game.saveConfig(cfg._name,result,mode);
	                                        if(cfg.onsave){
	                                            cfg.onsave.call(this,result);
	                                        }
                                            if(!_status.connectMode||game.online){
                                                if(typeof cfg.restart=='function'){
    												if(cfg.restart()){
    													startButton.classList.add('glowing');
    												}
    											}
    											else if(cfg.restart){
    												startButton.classList.add('glowing');
    											}
                                            }
	                                    };
	                                }
	                                if(info.config.update){
	                                    cfg.update=function(){
	                                        info.config.update(config,map);
	                                    };
	                                }
	                                var cfgnode=createConfig(cfg);
	                                map[j]=cfgnode;
	                                if(cfg.frequent){
	                                    page.appendChild(cfgnode);
	                                }
	                                else{
	                                    cfgnode.classList.add('auto-hide');
	                                    hiddenNodes.push(cfgnode);
	                                }
	                            }
	                            var expanded=false;
								var hasexpand=true;
	                            if(hiddenNodes.length){
	                                ui.create.div('.config.more','更多 <div>&gt;</div>',page,function(){
	                                    if(expanded){
	                                        this.classList.remove('on');
	                                        this.parentNode.classList.remove('expanded');
	                                    }
	                                    else{
	                                        this.classList.add('on');
	                                        this.parentNode.classList.add('expanded');
	                                    }
	                                    expanded=!expanded;
	                                });
	                                for(var k=0;k<hiddenNodes.length;k++){
	                                    page.appendChild(hiddenNodes[k]);
	                                }
	                            }
								else{
									hasexpand=false;
								}
								var hidemode=ui.create.div('.config.more','隐藏此模式',page,function(){
									if(this.innerHTML=='隐藏此模式'){
										this.innerHTML='此模式将在重启后隐藏';
										lib.config.hiddenModePack.add(mode);
									}
									else{
										this.innerHTML='隐藏此模式';
										lib.config.hiddenModePack.remove(mode);
									}
									game.saveConfig('hiddenModePack',lib.config.hiddenModePack);
								});
								if(hasexpand){
									hidemode.classList.add('auto-hide');
								}
	                            if(info.config.update){
	                                info.config.update(config,map);
                                    node.update=function(){
                                        info.config.update(config,map);
                                    }
	                            }
	                        }
	                        return node;
	                    };

						for(var i in lib.mode){
							if(lib.config.all.mode.contains(i)){
								createModeConfig(i,start.firstChild);
							}
	                    }
						var active=start.firstChild.querySelector('.active');
	                    if(!active){
	                        active=start.firstChild.firstChild;
	                        active.classList.add('active');
	                    }
						rightPane.appendChild(active.link);
                        if(!lib.mode[active.mode].connect){
                            connectButton.style.display='none';
                        }
					}());

					(function(){
						var start=menux.pages[1];
						var rightPane=start.lastChild;

						var clickMode=function(){
							var active=this.parentNode.querySelector('.active');
							if(active===this){
								return;
							}
							active.classList.remove('active');
							active.link.remove();
							active=this;
							this.classList.add('active');
							rightPane.appendChild(this.link);
						};

						var clickAutoSkill=function(bool){
							var name=this._link.config._name;
							var list=lib.config.autoskilllist;
							if(bool){
								list.remove(name);
							}
							else{
								list.add(name);
							}
							game.saveConfig('autoskilllist',list);
						};
						for(var i in lib.skill){
							if(!lib.skilllist.contains(i)) continue;
							if(lib.skill[i].frequent&&lib.translate[i]){
								lib.configMenu.skill.config[i]={
									name:lib.translate[i],
									init:true,
									type:'autoskill',
									onclick:clickAutoSkill
								}
							}
						}
						var clickBanSkill=function(bool){
							var name=this._link.config._name;
							var list=lib.config.forbidlist;
							if(bool){
								list.remove(name);
							}
							else{
								list.add(name);
							}
							game.saveConfig('forbidlist',list);
						};
						var forbid=lib.config.forbid;
						lib.config.forbidmap={};
						if(!lib.config.forbidlist){
							game.saveConfig('forbidlist',[]);
						}
						for(var i=0;i<forbid.length;i++){
							var skip=false;
							var str='';
							var str2='';
							for(var j=0;j<forbid[i].length;j++){
								if(!lib.skilllist.contains(forbid[i][j])){
									skip=true;
									break;
								}
								str+=get.translation(forbid[i][j])+'+';
								str2+=forbid[i][j]+'+';
							}
							if(skip) continue;
							lib.config.forbidmap[str2]=forbid[i];
							str=str.slice(0,str.length-1);
							str2=str2.slice(0,str2.length-1);

							lib.configMenu.skill.config[str2]={
								name:str,
								init:true,
								type:'banskill',
								onclick:clickBanSkill
							}
						}

						var createModeConfig=function(mode,position){
	                        var info=lib.configMenu[mode];
	                        var page=ui.create.div('');
	                        var node=ui.create.div('.menubutton.large',info.name,position,clickMode);
							node.link=page;
							node.mode=mode;
	                        var map={};
	                        if(info.config){
	                            var hiddenNodes=[];
								var autoskillNodes=[];
								var banskillNodes=[];
								var custombanskillNodes=[];
								var banskill;
								if(mode=='extension'){
									var importextensionexpanded=false;
									page.style.textAlign='left';
									page.style.paddingBottom='10px';
									var importExtension;
	                                var extensionnode=ui.create.div('.config.more','导入扩展 <div>&gt;</div>',page,function(){
	                                    if(importextensionexpanded){
	                                        this.classList.remove('on');
	                                        importExtension.style.display='none';
	                                    }
	                                    else{
	                                        this.classList.add('on');
											importExtension.style.display='';
	                                    }
	                                    importextensionexpanded=!importextensionexpanded;
	                                });
									importExtension=ui.create.div('.new_character.export.import',page);
									importExtension.style.marginLeft='5px';
									importExtension.style.marginTop='5px';
									importExtension.style.display='none';
									ui.create.div('','<input type="file" accept="application/zip" style="width:153px"><button>确定</button>',importExtension);

									importExtension.firstChild.lastChild.onclick=function(){
										var fileToLoad=this.previousSibling.files[0];
										if(fileToLoad){
											var zipReady=function(){
												var fileReader = new FileReader();
												fileReader.onload = function(fileLoadedEvent)
												{
													var data = fileLoadedEvent.target.result;
													var zip=new JSZip();
													zip.load(data);
													var str=zip.file('extension.js').asText();
													try{
														eval(str);
														if(!game.importedPack) throw('err');
														var extname=game.importedPack.name;
														localStorage.setItem(lib.configprefix+'extension_'+extname,str);
														lib.config.extensions.add(extname);
														game.saveConfig('extensions',lib.config.extensions);
														game.saveConfig('extension_'+extname,true);
														for(var i in game.importedPack.config){
															if(game.importedPack.config[i]&&game.importedPack.config[i].hasOwnProperty('init')){
																game.saveConfig('extension_'+extname+'_'+i,game.importedPack.config[i].init);
															}
														}
														if(game.importedPack.image&&lib.db){
															for(var i=0;i<game.importedPack.image.length;i++){
																var buttons=page.querySelectorAll('.button.character');
																for(var j=0;j<buttons.length;j++){
																	if(buttons[j].link==i){
																		buttons[j].remove();
																		break;
																	}
																}
																var imgname=game.importedPack.image[i];
																var str=zip.file(imgname).asArrayBuffer();
																if(str){
																	var blob=new Blob([str]);
																	var fileReader=new FileReader();
																	fileReader.onload = (function(imgname){
																		return function(fileLoadedEvent)
																		{
																			var data = fileLoadedEvent.target.result;
																			game.putDB('image','extension-'+extname+':'+imgname,data);
																		};
																	}(imgname))
																	fileReader.readAsDataURL(blob, "UTF-8");
																}
															}
														}
														delete game.importedPack;
													}
													catch(e){
														console.log(e);
														alert('导入失败');
														return;
													}
			                                        extensionnode.innerHTML='导入成功，5秒后将重启';
													setTimeout(function(){
														extensionnode.innerHTML='导入成功，4秒后将重启';
														setTimeout(function(){
															extensionnode.innerHTML='导入成功，3秒后将重启';
															setTimeout(function(){
																extensionnode.innerHTML='导入成功，2秒后将重启';
																setTimeout(function(){
																	extensionnode.innerHTML='导入成功，1秒后将重启';
																	setTimeout(game.reload,1000);
																},1000);
															},1000);
														},1000);
													},1000);
			                                        importExtension.style.display='none';
												};
												fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
											}
											if(!window.JSZip){
												lib.init.js(lib.assetURL+'game','jszip',zipReady);
											}
											else{
												zipReady();
											}
										}
									}
								}
								else if(mode=='skill'){
									var autoskillexpanded=false;
									var banskillexpanded=false;
	                                ui.create.div('.config.more','自动发动 <div>&gt;</div>',page,function(){
	                                    if(autoskillexpanded){
	                                        this.classList.remove('on');
	                                        for(var k=0;k<autoskillNodes.length;k++){
			                                    autoskillNodes[k].style.display='none';
			                                }
	                                    }
	                                    else{
	                                        this.classList.add('on');
	                                        for(var k=0;k<autoskillNodes.length;k++){
			                                    autoskillNodes[k].style.display='';
			                                }
	                                    }
	                                    autoskillexpanded=!autoskillexpanded;
	                                });
									banskill=ui.create.div('.config.more','双将禁配 <div>&gt;</div>',page,function(){
	                                    if(banskillexpanded){
	                                        this.classList.remove('on');
	                                        for(var k=0;k<banskillNodes.length;k++){
			                                    banskillNodes[k].style.display='none';
			                                }
	                                    }
	                                    else{
	                                        this.classList.add('on');
	                                        for(var k=0;k<banskillNodes.length;k++){
			                                    banskillNodes[k].style.display='';
			                                }
	                                    }
	                                    banskillexpanded=!banskillexpanded;
	                                });

									var banskilladd=ui.create.div('.config.indent','添加...',page,function(){
										this.nextSibling.classList.toggle('hidden');
									});
									banskilladd.style.display='none';
									banskillNodes.push(banskilladd);

									var banskilladdNode=ui.create.div('.config.indent.hidden.banskilladd',page);
									banskilladdNode.style.display='none';
									banskillNodes.push(banskilladdNode);

									var matchBanSkill=function(skills1,skills2){
										if(skills1.length!=skills2.length) return false;
										for(var i=0;i<skills1.length;i++){
											if(!skills2.contains(skills1[i])) return false;
										}
										return true;
									}
									var deleteCustomBanSkill=function(){
										for(var i=0;i<lib.config.customforbid.length;i++){
											if(matchBanSkill(lib.config.customforbid[i],this.parentNode.link)){
												lib.config.customforbid.splice(i--,1);
												break;
											}
										}
										game.saveConfig('customforbid',lib.config.customforbid);
										this.parentNode.remove();
									}
									var createCustomBanSkill=function(skills){
										var node=ui.create.div('.config.indent.toggle');
										node.style.display='none';
										node.link=skills;
										banskillNodes.push(node);
										custombanskillNodes.push(node);
										var str=get.translation(skills[0]);
										for(var i=1;i<skills.length;i++){
											str+='+'+get.translation(skills[i]);
										}
										node.innerHTML=str;
										var span=document.createElement('span');
										span.classList.add('cardpiledelete');
										span.innerHTML='删除';
										span.onclick=deleteCustomBanSkill;
										node.appendChild(span);
										page.insertBefore(node,banskilladdNode.nextSibling);
										return node;
									};
									for(var i=0;i<lib.config.customforbid.length;i++){
										createCustomBanSkill(lib.config.customforbid[i]);
									}
									(function(){
										var list=[];
										for(var i in lib.character){
											if(lib.character[i][3].length)
											list.push([i,lib.translate[i]]);
										}

										list.sort(function(a,b){
											a=a[0];b=b[0];
											var aa=a,bb=b;
											if(aa.indexOf('_')!=-1){
												aa=aa.slice(aa.indexOf('_')+1);
											}
											if(bb.indexOf('_')!=-1){
												bb=bb.slice(bb.indexOf('_')+1);
											}
											if(aa!=bb){
												return aa>bb?1:-1;
											}
											return a>b?1:-1;
										});

										var list2=[];
										var skills=lib.character[list[0][0]][3];
										for(var i=0;i<skills.length;i++){
											list2.push([skills[i],lib.translate[skills[i]]]);
										}

										var selectname=ui.create.selectlist(list,list[0],banskilladdNode);
										selectname.onchange=function(){
											var skills=lib.character[this.value][3];
											skillopt.innerHTML='';
											for(var i=0;i<skills.length;i++){
												var option=document.createElement('option');
												option.value=skills[i];
												option.innerHTML=lib.translate[skills[i]];
												skillopt.appendChild(option);
											}
										};
										selectname.style.maxWidth='85px';
										var skillopt=ui.create.selectlist(list2,list2[0],banskilladdNode);

										var span=document.createElement('span');
										span.innerHTML='＋';
										banskilladdNode.appendChild(span);
										var br=document.createElement('br');
										banskilladdNode.appendChild(br);

										var selectname2=ui.create.selectlist(list,list[0],banskilladdNode);
										selectname2.onchange=function(){
											var skills=lib.character[this.value][3];
											skillopt2.innerHTML='';
											for(var i=0;i<skills.length;i++){
												var option=document.createElement('option');
												option.value=skills[i];
												option.innerHTML=lib.translate[skills[i]];
												skillopt2.appendChild(option);
											}
										};
										selectname2.style.maxWidth='85px';
										var skillopt2=ui.create.selectlist(list2,list2[0],banskilladdNode);
										var confirmbutton=document.createElement('button');
										confirmbutton.innerHTML='确定';
										banskilladdNode.appendChild(confirmbutton);

										confirmbutton.onclick=function(){
											var skills=[skillopt.value,skillopt2.value];
											if(skills[0]==skills[1]){
												skills.shift();
											}
											if(!lib.config.customforbid) return;
											for(var i=0;i<lib.config.customforbid.length;i++){
												if(matchBanSkill(lib.config.customforbid[i],skills)) return;
											}
											lib.config.customforbid.push(skills);
											game.saveConfig('customforbid',lib.config.customforbid);
											createCustomBanSkill(skills).style.display='';
										}
									}());
									page.style.paddingBottom='10px';
								}
								var config=lib.config;
	                            for(var j in info.config){
	                                if(j==='update'){
	                                    continue;
	                                }
	                                var cfg=copyObj(info.config[j]);
									cfg._name=j;
	                                if(!config.hasOwnProperty(j)){
										if(cfg.type!='autoskill'&&cfg.type!='banskill'){
											game.saveConfig(j,cfg.init);
										}
	                                }
	                                else{
	                                    cfg.init=config[j];
	                                }
	                                if(!cfg.onclick){
	                                    cfg.onclick=function(result){
											var cfg=this._link.config;
											game.saveConfig(cfg._name,result);
	                                        if(cfg.onsave){
	                                            cfg.onsave.call(this,result);
	                                        }
	                                    };
	                                }
	                                if(info.config.update){
	                                    cfg.update=function(){
	                                        info.config.update(config,map);
	                                    };
	                                }
	                                var cfgnode=createConfig(cfg);
									if(cfg.type=='autoskill'){
										autoskillNodes.push(cfgnode);
										// cfgnode.style.transition='all 0s';
										cfgnode.classList.add('indent');
										// cfgnode.hide();
										cfgnode.style.display='none';
									}
									else if(cfg.type=='banskill'){
										banskillNodes.push(cfgnode);
										// cfgnode.style.transition='all 0s';
										cfgnode.classList.add('indent');
										// cfgnode.hide();
										cfgnode.style.display='none';
									}
									if(j=='import_data_button'){
										ui.import_data_button=cfgnode;
										cfgnode.hide();
										cfgnode.querySelector('button').onclick=function(){
											var fileToLoad=this.previousSibling.files[0];
											if(fileToLoad){
												var fileReader = new FileReader();
												fileReader.onload = function(fileLoadedEvent)
												{
													var data = fileLoadedEvent.target.result;
													if(!data) return;
													try{
														data=JSON.parse(lib.init.decode(data));
														var noname_inited=localStorage.getItem('noname_inited');
										                localStorage.clear();
														if(noname_inited){
															localStorage.setItem('noname_inited',noname_inited);
														}
														for(var i in data){
															localStorage.setItem(i,data[i]);
														}
													}
													catch(e){
														console.log(e);
														alert('导入失败');
														return;
													}
													alert('导入成功');
													game.reload();
												};
												fileReader.readAsText(fileToLoad, "UTF-8");
											}
										}
									}
									else if(j=='import_background'){
										cfgnode.querySelector('button').onclick=function(){
											var fileToLoad=this.previousSibling.files[0];
											if(fileToLoad){
												game.putDB('image','background',fileToLoad);
												var fileReader = new FileReader();
												fileReader.onload = function(fileLoadedEvent)
												{
													var data = fileLoadedEvent.target.result;
													ui.background.style.backgroundImage='url('+data+')';
												};
												fileReader.readAsDataURL(fileToLoad, "UTF-8");
											}
											else{
												game.deleteDB('image','background');
												ui.background.style.backgroundImage='none';
											}
										}
									}
									else if(j=='import_music'){
										cfgnode.querySelector('button').onclick=function(){
											delete _status.background_music_src;
											var fileToLoad=this.previousSibling.files[0];
											if(fileToLoad){
												game.putDB('audio','background',fileToLoad);
												var fileReader = new FileReader();
												fileReader.onload = function(fileLoadedEvent)
												{
													var data = fileLoadedEvent.target.result;
													_status.background_music_src=data;
													game.playBackgroundMusic();
												};
												fileReader.readAsDataURL(fileToLoad, "UTF-8");
											}
											else{
												game.deleteDB('audio','background');
												delete _status.background_music_src;
												ui.backgroundMusic.src='';
											}
										}
									}
	                                map[j]=cfgnode;
	                                if(!cfg.unfrequent){
										if(cfg.type=='autoskill'){
											page.insertBefore(cfgnode,banskill);
										}
										else{
											page.appendChild(cfgnode);
										}
	                                }
	                                else{
	                                    // cfgnode.classList.add('auto-hide');
	                                    hiddenNodes.push(cfgnode);
	                                }
	                            }
	                            var expanded=false;
	                            if(hiddenNodes.length){
	                                // ui.create.div('.config.more','更多 <div>&gt;</div>',page,function(){
	                                //     if(expanded){
	                                //         this.classList.remove('on');
	                                //         this.parentNode.classList.remove('expanded');
	                                //     }
	                                //     else{
	                                //         this.classList.add('on');
	                                //         this.parentNode.classList.add('expanded');
	                                //     }
	                                //     expanded=!expanded;
	                                // });
									page.classList.add('morenodes');
	                                for(var k=0;k<hiddenNodes.length;k++){
	                                    page.appendChild(hiddenNodes[k]);
	                                }
	                            }
	                            if(info.config.update){
	                                info.config.update(config,map);
	                            }
	                        }
	                        return node;
	                    };

						for(var i in lib.configMenu){
	                        createModeConfig(i,start.firstChild);
	                    }
						var active=start.firstChild.querySelector('.active');
	                    if(!active){
	                        active=start.firstChild.firstChild;
	                        active.classList.add('active');
	                    }
						rightPane.appendChild(active.link);
					}());

					(function(){
						var start=menux.pages[2];
						var rightPane=start.lastChild;

						var clickMode=function(){
							var active=this.parentNode.querySelector('.active');
							if(active){
								if(active===this){
									return;
								}
								active.classList.remove('active');
								active.link.remove();
							}
							this.classList.add('active');
							rightPane.appendChild(this.link);
						};
						var updateNodes=function(){
							for(var i=0;i<start.firstChild.childNodes.length;i++){
								var node=start.firstChild.childNodes[i];
								if(node.link){
									if(node.mode.indexOf('mode_')==0) continue;
									if(node.mode=='custom') continue;
									if(lib.config.customCharacterPack[node.mode]) continue;
									if(lib.config.characters.contains(node.mode)){
										node.classList.remove('off');
										node.link.firstChild.classList.add('on');
									}
									else{
										node.classList.add('off');
										node.link.firstChild.classList.remove('on');
									}
								}
							}
						}
						var togglePack=function(bool){
							var name=this._link.config._name;
							if(bool){
								lib.config.characters.add(name);
							}
							else{
								lib.config.characters.remove(name);
							}
							game.saveConfig('characters',lib.config.characters);
							updateNodes();
						};

						var createModeConfig=function(mode,position,position2){
	                        var info=lib.characterPack[mode];
	                        var page=ui.create.div('');
	                        var node=ui.create.div('.menubutton.large',lib.translate[mode+'_character_config'],position,clickMode);
							if(position2){
								position.insertBefore(node,position2);
							}
							node.link=page;
							node.mode=mode;
							var list=[];
							for(var i in info){
								list.push(i);
							}
							var cfgnode=createConfig({
								name:'开启',
								_name:mode,
								init:lib.config.characters.contains(mode),
								onclick:togglePack
							});
							if(mode.indexOf('mode_')!=0&&!lib.config.customCharacterPack[mode]){
								page.appendChild(cfgnode);
							}
							var banCharacter=function(){
								if(_status.clicked){
									_status.clicked=false;
									return;
								}
								if(mode.indexOf('mode_')==0){
									return;
								}
								this.classList.toggle('unselectable');
								if(this.classList.contains('unselectable')){
									lib.config.banned.add(this.link);
									this.node.hp._innerHTML=this.node.hp.innerHTML;
									this.node.hp.innerHTML='已禁用';
									this.node.hp.style.top='8px';
								}
								else{
									lib.config.banned.remove(this.link);
									this.node.hp.innerHTML=this.node.hp._innerHTML;
									this.node.hp.style.top='';
								}
								game.saveConfig('banned',lib.config.banned,true);
							};
							var buttons=ui.create.buttons(list,'character',page);
							for(var i=0;i<buttons.length;i++){
								buttons[i].classList.add('noclick');
								buttons[i].listen(banCharacter);
								buttons[i].node.hp.style.transition='all 0s';
								if(lib.config.banned.contains(buttons[i].link)){
									buttons[i].classList.add('unselectable');
									buttons[i].node.hp._innerHTML=buttons[i].node.hp.innerHTML;
									buttons[i].node.hp.innerHTML='已禁用';
									buttons[i].node.hp.style.top='8px';
								}
							}
							page.classList.add('menu-buttons');
							if(lib.config.customCharacterPack[mode]){
								ui.create.div('.config.more','编辑武将包',page,function(){
									if(this.innerHTML=='编辑武将包'){
										this.innerHTML='确认编辑';
										var that=this;
										setTimeout(function(){
											that.innerHTML='编辑武将包';
										},1000);
									}
									else{
										var pack=lib.config.customCharacterPack[mode];
										delete lib.config.customCharacterPack[mode];
										game.saveConfig('customCharacterPack',lib.config.customCharacterPack);
										page.remove();
										node.remove();
										lib.recreateCustomCharacters();

										var active=ui.customCharacter;
										active.classList.add('active');
										rightPane.appendChild(active.link);
									}
								});
								ui.create.div('.config.more','删除武将包',page,function(){
									if(this.innerHTML=='删除武将包'){
										this.innerHTML='确认删除';
										var that=this;
										setTimeout(function(){
											that.innerHTML='删除武将包';
										},1000);
									}
									else{
										var pack=lib.config.customCharacterPack[mode];
										delete lib.config.customCharacterPack[mode];
										game.saveConfig('customCharacterPack',lib.config.customCharacterPack);
										page.remove();
										node.remove();
										for(var i=0;i<pack.character.length;i++){
											lib.customCharacters.remove(pack.character[i]);
											delete lib.character[pack.character[i]];
											game.deleteDB('character',pack.character[i]);
											game.deleteDB('image','character:'+pack.character[i]);
											lib.config.banned.remove(pack.character[i])
										}
										game.saveConfig('banned',lib.config.banned,true);
										for(var i=0;i<pack.skill.length;i++){
											game.deleteDB('skill',pack.skill[i]);
										}
									}
								}).style.marginTop='5px';
							}
							else if(mode.indexOf('mode_')!=0){
								ui.create.div('.config.more','隐藏武将包',page,function(){
									if(this.innerHTML=='隐藏武将包'){
										this.innerHTML='武将包将在重启后隐藏';
										lib.config.hiddenCharacterPack.add(mode);
									}
									else{
										this.innerHTML='隐藏武将包';
										lib.config.hiddenCharacterPack.remove(mode);
									}
									game.saveConfig('hiddenCharacterPack',lib.config.hiddenCharacterPack);
								});
							}
	                        return node;
	                    };

						for(var i=0;i<lib.config.all.characters.length;i++){
	                        createModeConfig(lib.config.all.characters[i],start.firstChild);
	                    }
						for(var i in lib.characterPack){
							if(i.indexOf('mode_')==0){
								createModeConfig(i,start.firstChild);
							}
						}
						var active=start.firstChild.querySelector('.active');
	                    if(!active){
	                        active=start.firstChild.firstChild;
	                        active.classList.add('active');
	                    }
						rightPane.appendChild(active.link);

						lib.onDB(function(){
							var page=ui.create.div('.menu-buttons');
	                        var node=ui.create.div('.menubutton.large','自定义',clickMode);
							ui.customCharacter=node;
							start.firstChild.insertBefore(node,start.firstChild.querySelector('.lefttext'));
							node.link=page;
							node.mode='custom';

							var currentEditing=null;
							var packExporting=false;

							var clickButton=function(){
								if(packExporting){
									this.classList.toggle('selected');
									return;
								}
								resetImport();
								resetEditor();
								if(currentEditing==this){
									currentEditing=null;
									return;
								}
								else{
									currentEditing=this;
								}
								toggle.classList.add('on');
								newCharacter.style.display='';
								fakeme.classList.add('inited');
								delete fakeme.image;
								fakeme.setBackground(this.link,'character');
								newCharacter.querySelector('.new_name').value=this.link;
								var info=lib.character[this.link];
								newCharacter.querySelector('.new_hp').value=info[2];
								sexes.value=info[0];
								groups.value=info[1];
								if(info[4]){
									for(var i=0;i<options.childNodes.length-1;i++){
										if(info[4].contains(options.childNodes[i].lastChild.name)){
											options.childNodes[i].lastChild.checked=true;
										}
									}
								}

								var skills=info[3];
								for(var i=0;i<skills.length;i++){
									var node=ui.create.div(skillList.firstChild);
									node.skill=skills[i];
									ui.create.div('',lib.translate[skills[i]],node,editnode);
									ui.create.div('','×',node,deletenode);
									if(lib.skill[skills[i]].createInfo){
										node.createInfo=lib.skill[skills[i]].createInfo;
									}
								}

								toggle.innerHTML='编辑武将 <div>&gt;</div>';
								var confirm=newCharacter.querySelector('.menubutton.large');
								confirm.innerHTML='编辑武将';
								confirm._origin=this;
								var button=this;
								var delnodefunc=function(){
									button.remove();
									lib.customCharacters.remove(button.link);
									game.deleteDB('character',button.link);
									game.deleteDB('image','character:'+button.link);
									var skills=lib.character[button.link][3];
									delete lib.character[button.link];
									for(var i=0;i<skills.length;i++){
										if(!lib.checkSkillName(skills[i])){
											var keep=false;
											for(var j=0;j<lib.customCharacters.length;j++){
												if(lib.customCharacters[j]==button.link) continue;
												if(lib.character[lib.customCharacters[j]][3].contains(skills[i])){
													keep=true;break;
												}
											}
											if(!keep){
												game.deleteDB('skill',skills[i]);
											}
										}
									}
									resetEditor();
								};
								var delnode=ui.create.div('.menubutton.large','删除',confirm.parentNode,delnodefunc);
								delnode.style.marginLeft='25px';
							}

							var createButton=function(name){
								var button=ui.create.button(name,'character');
								button.listen(clickButton);
								button.classList.add('noclick');
								page.insertBefore(button,page.firstChild);
							}

							var cl=function(){
								for(var i in lib.config.customCharacterPack){
									lib.characterPack[i]={};
									lib.translate[i+'_character_config']=i;
									for(var j=0;j<lib.config.customCharacterPack[i].character.length;j++){
										var namej=lib.config.customCharacterPack[i].character[j];
										lib.characterPack[i][namej]=lib.character[namej];
									}
									createModeConfig(i,start.firstChild,node);
								}
								for(var i=0;i<lib.customCharacters.length;i++){
									var clname=lib.customCharacters[i];
									for(var j=0;j<lib.character[clname][3].length;j++){
										if(!lib.skill[lib.character[clname][3][j]]){
											lib.character[clname][3].splice(j--,1);
										}
									}
									if(!lib.checkCharacterName(clname))
									createButton(clname);
								}
							}
							if(_status.characterLoaded){
								cl();
							}
							else{
								lib.onCharacterLoad=cl;
							}
							lib.recreateCustomCharacters=function(){
								var buttons=page.querySelectorAll('.button.character');
								var list=[];
								for(var i=0;i<buttons.length;i++){
									list.push(buttons[i]);
								}
								for(var i=0;i<list.length;i++){
									list[i].remove();
								}
								for(var i=0;i<lib.customCharacters.length;i++){
									if(!lib.checkCharacterName(lib.customCharacters[i]))
									createButton(lib.customCharacters[i]);
								}
								resetEditor();
								resetImport();
								resetExport();
							}

							var importCharacter;
							var toggle3=ui.create.div('.config.more','导入武将包 <div>&gt;</div>',page,function(){
								this.classList.toggle('on');
								if(this.classList.contains('on')){
									importCharacter.style.display='';
									resetEditor();
									resetExport();
									currentEditing=null;
								}
								else{
									importCharacter.style.display='none';
								}
							});
							var resetImport=function(){
								importCharacter.style.display='none';
								toggle3.classList.remove('on')
							}
							importCharacter=ui.create.div('.new_character.export.import',page);
							importCharacter.style.display='none';
							ui.create.div('','<input type="file" accept="application/zip"><button>确定</button>',importCharacter);
							importCharacter.firstChild.lastChild.onclick=function(){
								var fileToLoad=this.previousSibling.files[0];
								if(fileToLoad){
									var zipReady=function(){
										var fileReader = new FileReader();
										fileReader.onload = function(fileLoadedEvent)
										{
											var data = fileLoadedEvent.target.result;
											var zip=new JSZip();
											zip.load(data);
											var str=zip.file('pack.js').asText();
											try{
												eval(str);
												if(!game.importedPack) throw('err');
												for(var i in game.importedPack.character){
													var buttons=page.querySelectorAll('.button.character');
													for(var j=0;j<buttons.length;j++){
														if(buttons[j].link==i){
															buttons[j].remove();
															break;
														}
													}
													var str=zip.file(i+'.jpg').asArrayBuffer();
													if(str){
														var blob=new Blob([str]);
														var fileReader=new FileReader();
														fileReader.onload = (function(i){
															return function(fileLoadedEvent)
															{
																var data = fileLoadedEvent.target.result;
																game.putDB('image','character:'+i,data);
															};
														}(i))

														fileReader.readAsDataURL(blob, "UTF-8");
													}
												}

												var name=game.importedPack.name;
												setTimeout(function(){
													lib.characterPack[name]={};
													lib.translate[name+'_character_config']=name;
													for(var j=0;j<lib.config.customCharacterPack[name].character.length;j++){
														var namej=lib.config.customCharacterPack[name].character[j];
														lib.characterPack[name][namej]=lib.character[namej];
													}
													clickMode.call(createModeConfig(name,start.firstChild,node));
												},500);

												delete game.importedPack;
											}
											catch(e){
												console.log(e);
												alert('导入失败');
											}
											resetImport();
										};
										fileReader.readAsArrayBuffer(fileToLoad, "UTF-8");
									}
									if(!window.JSZip){
										lib.init.js(lib.assetURL+'game','jszip',zipReady);
									}
									else{
										zipReady();
									}
								}
							}

							var exportCharacter;
							var toggle2=ui.create.div('.config.more','导出武将包 <div>&gt;</div>',page,function(){
								this.classList.toggle('on');
								if(this.classList.contains('on')){
									exportCharacter.style.display='';
									resetEditor();
									resetImport();
									currentEditing=null;
									packExporting=true;
								}
								else{
									resetExport();
								}
							});
							var resetExport=function(){
								packExporting=false;
								exportCharacter.style.display='none';
								toggle2.classList.remove('on');
								var selected=page.querySelectorAll('.button.character.selected');
								var list=[];
								for(var i=0;i<selected.length;i++){
									list.push(selected[i]);
								}
								for(var i=0;i<list.length;i++){
									list[i].classList.remove('selected');
								}
							}
							exportCharacter=ui.create.div('.new_character.export',page);
							exportCharacter.style.display='none';
							ui.create.div('','名称：<input type="text"><button>确定</button>',exportCharacter);
							exportCharacter.firstChild.lastChild.onclick=function(){
								var name=this.previousSibling.value;
								var selected=page.querySelectorAll('.button.character.selected');
								var list=[];
								var list2=[];
								for(var i=0;i<selected.length;i++){
									list.push(selected[i].link);
									list2.push(selected[i]);
								}
								for(var i=0;i<list2.length;i++){
									list2[i].classList.remove('selected');
								}
								if(name) game.exportCharacters(name,list.length?list:null,function(result){
									game.import('character',result);
									for(var i in result.character){
										var buttons=page.querySelectorAll('.button.character');
										for(var j=0;j<buttons.length;j++){
											if(buttons[j].link==i){
												buttons[j].remove();
												break;
											}
										}
									}

									lib.characterPack[name]={};
									lib.translate[name+'_character_config']=name;
									for(var j=0;j<lib.config.customCharacterPack[name].character.length;j++){
										var namej=lib.config.customCharacterPack[name].character[j];
										lib.characterPack[name][namej]=lib.character[namej];
									}
									clickMode.call(createModeConfig(name,start.firstChild,node));
									resetExport();

									delete game.importedPack;
								});
							}

							var newCharacter;
							var toggle=ui.create.div('.config.more','创建武将 <div>&gt;</div>',page,function(){
								this.classList.toggle('on');
								if(this.classList.contains('on')){
									newCharacter.style.display='';
									resetExport();
									resetImport();
								}
								else{
									newCharacter.style.display='none';
								}
							});
							var resetEditor=function(){
								toggle.classList.remove('on');
								newCharacter.style.display='none';
								fakeme.classList.remove('inited');
								delete fakeme.image;
								fakeme.style.backgroundImage='';
								var inputs=newCharacter.querySelectorAll('input');
								for(var i=0;i<inputs.length;i++){
									inputs[i].value='';
								}
								inputs=newCharacter.querySelectorAll('textarea');
								for(var i=0;i<inputs.length;i++){
									inputs[i].value='';
								}
								skillList.firstChild.innerHTML='';
								toggle.innerHTML='创建武将 <div>&gt;</div>';
								var node=newCharacter.querySelector('.menubutton.large');
								node.innerHTML='创建武将';
								delete node._origin;
								if(node.nextSibling){
									node.nextSibling.remove();
								}
							}

							newCharacter=ui.create.div('.new_character',page);
							newCharacter.style.display='none';

							var fakeme=ui.create.div('.avatar',newCharacter);

							var input=document.createElement('input');
							input.type='file';
							input.accept='image/jpeg';
							input.onchange=function(){
								var fileToLoad=input.files[0];
								if(fileToLoad){
									var fileReader = new FileReader();
									fileReader.onload = function(fileLoadedEvent)
									{
										var data = fileLoadedEvent.target.result;
										fakeme.image=data;
										fakeme.style.backgroundImage='url('+data+')';
										fakeme.classList.add('inited');
									};
									fileReader.readAsDataURL(fileToLoad, "UTF-8");
								}
							}
							fakeme.appendChild(input);

							ui.create.div('.select_avatar','选择头像',fakeme);

							ui.create.div('.indent','姓名：<input class="new_name" type="text">',newCharacter).style.paddingTop='10px';
							ui.create.div('.indent','体力：<input class="new_hp" type="text">',newCharacter).style.paddingTop='10px';
							var sexes=ui.create.selectlist([
								['male','男'],
								['female','女'],
								['none','无'],
							],null,ui.create.div('.indent','性别：',newCharacter));
							var groups=ui.create.selectlist([
								['wei','魏'],
								['shu','蜀'],
								['wu','吴'],
								['qun','群'],
							],null,ui.create.div('.indent','势力：',newCharacter));
							var options=ui.create.div('.add_skill.options','<span>主公<input type="checkbox" name="zhu"></span><span>BOSS<input type="checkbox" name="boss"></span><span>AI禁选<input type="checkbox" name="forbidai"></span><br>',newCharacter);
							var addSkill=ui.create.div('.add_skill','添加技能<br>',newCharacter);
							var list=[];
							for(var i in lib.character){
								if(!lib.customCharacters.contains(i)&&lib.character[i][3].length)
								list.push([i,lib.translate[i]]);
							}
							list.sort(function(a,b){
								a=a[0];b=b[0];
								var aa=a,bb=b;
								if(aa.indexOf('_')!=-1){
									aa=aa.slice(aa.indexOf('_')+1);
								}
								if(bb.indexOf('_')!=-1){
									bb=bb.slice(bb.indexOf('_')+1);
								}
								if(aa!=bb){
									return aa>bb?1:-1;
								}
								return a>b?1:-1;
							});
							var list2=[];
							var skills=lib.character[list[0][0]][3];
							for(var i=0;i<skills.length;i++){
								list2.push([skills[i],lib.translate[skills[i]]]);
							}
							var selectname=ui.create.selectlist(list,list[0],addSkill);
							selectname.onchange=function(){
								var skills=lib.character[this.value][3];
								skillopt.innerHTML='';
								for(var i=0;i<skills.length;i++){
									var option=document.createElement('option');
									option.value=skills[i];
									option.innerHTML=lib.translate[skills[i]];
									skillopt.appendChild(option);
								}
							};
							selectname.style.maxWidth='85px';
							var skillopt=ui.create.selectlist(list2,list2[0],addSkill);
							var editSkillButton=document.createElement('button');
							editSkillButton.innerHTML='编辑';
							editSkillButton.style.marginRight='3px';
							addSkill.appendChild(editSkillButton);
							var addSkillButton=document.createElement('button');
							addSkillButton.innerHTML='添加';
							addSkill.appendChild(addSkillButton);
							var deletenode=function(){
								this.parentNode.remove();
							}
							var editnode=function(){
								var info=this.parentNode.createInfo;
								if(info){
									createSkill.lastChild.classList.remove('hidden');
									createSkill.firstChild.innerHTML='创建技能';
									skillList.style.top='435px';

									createSkill.lastChild.querySelector('.skillname').value=info.name;
									createSkill.lastChild.querySelector('.skilldescription').value=info.description;
									createSkill.lastChild.querySelector('textarea').value=info.content;
								}
							};
							editSkillButton.onclick=function(){
								var name=skillopt.value;
								var info=lib.skill[name];
								if(info){
									createSkill.lastChild.classList.remove('hidden');
									createSkill.firstChild.innerHTML='创建技能';
									skillList.style.top='435px';

									createSkill.lastChild.querySelector('.skillname').value='skill|'+lib.translate[name]+'|'+name;
									createSkill.lastChild.querySelector('.skilldescription').value=lib.translate[name+'_info'];
									createSkill.lastChild.querySelector('textarea').value=lib.init.stringifySkill(info);
								}
							};
							addSkillButton.onclick=function(){
								for(var i=0;i<skillList.firstChild.childNodes.length;i++){
									if(skillList.firstChild.childNodes[i].skill==skillopt.value) return;
								}
								var node=ui.create.div(skillList.firstChild);
								node.skill=skillopt.value;
								ui.create.div('',lib.translate[skillopt.value],node,editnode);
								ui.create.div('','×',node,deletenode);
								if(lib.skill[skillopt.value].createInfo){
									node.createInfo=lib.skill[skillopt.value].createInfo;
								}
							};

							var createSkill=ui.create.div('.add_skill.create','<div>创建技能...</div><br><div class="hidden"></div>',newCharacter);
							createSkill.firstChild.listen(function(){
								createSkill.lastChild.classList.toggle('hidden');
								if(createSkill.lastChild.classList.contains('hidden')){
									this.innerHTML='创建技能...';
									skillList.style.top='';
								}
								else{
									this.innerHTML='创建技能';
									skillList.style.top='435px';
								}
							});
							var newSkill=document.createElement('textarea');
							createSkill.lastChild.appendChild(newSkill);
							createSkill.lastChild.innerHTML+='<br>';
							ui.create.div('','技能名称：<input class="skillname" type="text">',createSkill.lastChild);
							createSkill.lastChild.innerHTML+='<br>';
							ui.create.div('','技能描述：<input class="skilldescription" type="text"><br><button>确定</button><button>取消</button>',createSkill.lastChild);
							createSkill.lastChild.lastChild.lastChild.previousSibling.style.marginTop='5px';
							createSkill.lastChild.lastChild.lastChild.previousSibling.style.marginRight='3px';
							createSkill.lastChild.lastChild.lastChild.previousSibling.onclick=function(){
								var node;
								var name=createSkill.lastChild.querySelector('.skillname').value;
								var description=createSkill.lastChild.querySelector('.skilldescription').value;
								var content=createSkill.lastChild.querySelector('textarea').value;
								if(!name||!description) return;
								if(lib.checkSkillName(name)){
									alert('技能名重复');
									return;
								}
								for(var i=0;i<skillList.firstChild.childNodes.length;i++){
									if(skillList.firstChild.childNodes[i].skill==name){
										node=skillList.firstChild.childNodes[i];
									}
								}
								if(!node){
									node=ui.create.div(skillList.firstChild);
									node.skill=name;
									var name2=name;
									if(name.indexOf('|')!=-1){
										if(name2.lastIndexOf('|')>name2.indexOf('|')){
											name2=name2.slice(name2.indexOf('|')+1,name2.lastIndexOf('|'));
										}
										else{
											name2=name2.slice(name2.indexOf('|')+1);
										}
									}
									ui.create.div('',name2,node,editnode);
									ui.create.div('','×',node,deletenode);
								}
								node.createInfo={
									name:name,
									description:description,
									content:content
								}
								createSkill.lastChild.querySelector('.skillname').value='';
								createSkill.lastChild.querySelector('.skilldescription').value='';
								createSkill.lastChild.querySelector('textarea').value='';

								createSkill.lastChild.classList.add('hidden');
								createSkill.firstChild.innerHTML='创建技能...';
								skillList.style.top='';
							}
							createSkill.lastChild.lastChild.lastChild.onclick=function(){
								createSkill.lastChild.querySelector('.skillname').value='';
								createSkill.lastChild.querySelector('.skilldescription').value='';
								createSkill.lastChild.querySelector('textarea').value='';

								createSkill.lastChild.classList.add('hidden');
								createSkill.firstChild.innerHTML='创建技能...';
								skillList.style.top='';
							};
							var skillList=ui.create.div('.skill_list',newCharacter);
							ui.create.div(skillList);
							ui.create.div('.menubutton.large','创建武将',ui.create.div(skillList),function(){
								var image=fakeme.image;if(!image&&this.innerHTML!='编辑武将') return;
								var name=newCharacter.querySelector('.new_name').value;if(!name) return;
								if(lib.checkCharacterName(name)){
									alert('武将名重复');return;
								}
								var hp=newCharacter.querySelector('.new_hp').value;
								hp=parseInt(hp);
								if(!hp) hp=1;
								var skills=[];
								var dontcreate=false;
								if(this.innerHTML=='编辑武将'&&this._origin&&this._origin.link!=name){
									dontcreate=true;
									var origin=this._origin;
									game.getDB('image','character:'+this._origin.link,function(data){
										if(data){
											game.putDB('image','character:'+name,data);
											origin.remove();
											lib.customCharacters.remove(origin.link);
											game.deleteDB('character',origin.link);
											game.deleteDB('image','character:'+origin.link);
											if(lib.character[origin.link]){
												var skills=lib.character[origin.link][3];
												delete lib.character[origin.link];
												for(var i=0;i<skills.length;i++){
													if(!lib.checkSkillName(skills[i])){
														var keep=false;
														for(var j=0;j<lib.customCharacters.length;j++){
															if(lib.customCharacters[j]==origin.link) continue;
															if(lib.character[lib.customCharacters[j]][3].contains(skills[i])){
																keep=true;break;
															}
														}
														if(!keep){
															game.deleteDB('skill',skills[i]);
														}
													}
												}
											}
										}
										createButton(name);
									});
								}
								else{
									if(image){
										game.putDB('image','character:'+name,image);
									}
								}

								for(var i=0;i<skillList.firstChild.childNodes.length;i++){
									if(skillList.firstChild.childNodes[i].createInfo&&
										lib.checkSkillName(skillList.firstChild.childNodes[i].skill)) continue;
									skills.add(skillList.firstChild.childNodes[i].skill);
									var info=skillList.firstChild.childNodes[i].createInfo;
									if(info){
										try{
											eval('lib.skill["'+info.name+'"]={'+info.content+'}');
										}
										catch(e){
											console.log(e);
											lib.skill[info.name]={};
										}
										lib.skill[info.name].createInfo=info;
										lib.setTranslate(info.name);
										lib.translate[info.name+'_info']=info.description;
										game.putDB('skill',info.name,info);
									}
								}
								var tags=[];
								for(var i=0;i<options.childNodes.length-1;i++){
									if(options.childNodes[i].lastChild.checked){
										tags.push(options.childNodes[i].lastChild.name);
									}
								}
								if(tags.contains('boss')){
									tags.add('bossallowed');
								}
								var charinfo=[sexes.value,groups.value,hp,skills,tags];
								game.putDB('character',name,charinfo);
								lib.character[name]=charinfo;
								lib.customCharacters.add(name);
								lib.setTranslate(name);
								if(this.innerHTML=='编辑武将'){
									var buttons=page.querySelectorAll('.button.character');
									for(var i=0;i<buttons.length;i++){
										if(buttons[i].link==name){
											buttons[i].remove();
											break;
										}
									}
								}
								if(!dontcreate) createButton(name);
								resetEditor();
								currentEditing=null;
								delete this._origin;
							});
						});

						var node1=ui.create.div('.lefttext','全部开启',start.firstChild,function(){
							game.saveConfig('characters',lib.config.all.characters);
							updateNodes();
						});
						var node2=ui.create.div('.lefttext','恢复默认',start.firstChild,function(){
							game.saveConfig('characters',lib.config.defaultcharacters);
							updateNodes();
						});
						node1.style.marginTop='12px';
						node2.style.marginTop='7px';

						updateNodes();
					}());

					(function(){
						var start=menux.pages[3];
						var rightPane=start.lastChild;

						var clickMode=function(){
							var active=this.parentNode.querySelector('.active');
							if(active===this){
								return;
							}
							active.classList.remove('active');
							active.link.remove();
							active=this;
							this.classList.add('active');
							rightPane.appendChild(this.link);
						};
						var updateNodes=function(){
							for(var i=0;i<start.firstChild.childNodes.length;i++){
								var node=start.firstChild.childNodes[i];
								if(node.link){
									if(node.mode.indexOf('mode_')==0) continue;
									if(node.mode=='custom') continue;
									if(node.mode=='cardpile') continue;
									if(lib.config.cards.contains(node.mode)){
										node.classList.remove('off');
										node.link.firstChild.classList.add('on');
									}
									else{
										node.classList.add('off');
										node.link.firstChild.classList.remove('on');
									}
								}
							}
						}
						var togglePack=function(bool){
							var name=this._link.config._name;
							if(bool){
								lib.config.cards.add(name);
							}
							else{
								lib.config.cards.remove(name);
							}
							game.saveConfig('cards',lib.config.cards);
							updateNodes();
						};
						var toggleCardPile=function(bool){
							var name=this._link.config._name;
							var number=this._link.config._number;
							if(bool){
								lib.config.bannedpile[name].remove(number);
							}
							else{
								lib.config.bannedpile[name].add(number);
							}
							game.saveConfig('bannedpile',lib.config.bannedpile);
						}

						var createModeConfig=function(mode,position){
	                        var info=lib.cardPack[mode];
	                        var page=ui.create.div('');
	                        var node=ui.create.div('.menubutton.large',lib.translate[mode+'_card_config'],position,clickMode);
							node.link=page;
							node.mode=mode;
							var list=[];
							for(var i=0;i<info.length;i++){
								list.push(['',get.translation(get.type(info[i],'trick')),info[i]]);
							}
							var cfgnode=createConfig({
								name:'开启',
								_name:mode,
								init:lib.config.cards.contains(mode),
								onclick:togglePack
							});
							if(mode.indexOf('mode_')!=0){
								page.appendChild(cfgnode);
							}
							var banCard=function(){
								if(_status.clicked){
									_status.clicked=false;
									return;
								}
								if(mode.indexOf('mode_')==0){
									return;
								}
								this.classList.toggle('unselectable');
								if(this.classList.contains('unselectable')){
									lib.config.bannedcards.add(this.link[2]);
									this.node.info._innerHTML=this.node.info.innerHTML;
									this.node.info.innerHTML='已禁用';
								}
								else{
									lib.config.bannedcards.remove(this.link[2]);
									this.node.info.innerHTML=this.node.info._innerHTML;
									this.node.info.style.top='';
								}
								game.saveConfig('bannedcards',lib.config.bannedcards,true);
							};
							var buttons=ui.create.buttons(list,'vcard',page);
							for(var i=0;i<buttons.length;i++){
								buttons[i].classList.add('noclick');
								buttons[i].listen(banCard);
								if(lib.config.bannedcards.contains(buttons[i].link[2])){
									buttons[i].classList.add('unselectable');
									buttons[i].node.info._innerHTML=buttons[i].node.info.innerHTML;
									buttons[i].node.info.innerHTML='已禁用';
								}
							}
							page.classList.add('menu-buttons');
							if(mode.indexOf('mode_')!=0&&!lib.config.customCardPack[mode]){
								ui.create.div('.config.more','隐藏卡牌包',page,function(){
									if(this.innerHTML=='隐藏卡牌包'){
										this.innerHTML='卡牌包将在重启后隐藏';
										lib.config.hiddenCardPack.add(mode);
									}
									else{
										this.innerHTML='隐藏卡牌包';
										lib.config.hiddenCardPack.remove(mode);
									}
									game.saveConfig('hiddenCardPack',lib.config.hiddenCardPack);
								});
							}
							if(mode.indexOf('mode_')!=0&&lib.cardPile[mode]){
								var cardpileNodes=[];
								var cardpileexpanded=false;
								if(!lib.config.bannedpile[mode]){
									lib.config.bannedpile[mode]=[];
								}
								if(!lib.config.addedpile[mode]){
									lib.config.addedpile[mode]=[];
								}
								ui.create.div('.config.more','编辑牌堆 <div>&gt;</div>',page,function(){
									if(cardpileexpanded){
										this.classList.remove('on');
										for(var k=0;k<cardpileNodes.length;k++){
											cardpileNodes[k].style.display='none';
										}
									}
									else{
										this.classList.add('on');
										for(var k=0;k<cardpileNodes.length;k++){
											cardpileNodes[k].style.display='';
										}
									}
									cardpileexpanded=!cardpileexpanded;
								});
								var cfgnode=createConfig({
									name:'添加...',
									clear:true,
									onclick:function(){
										this.nextSibling.classList.toggle('hidden');
									}
								});
								cardpileNodes.push(cfgnode);
								cfgnode.style.display='none';
								cfgnode.classList.add('cardpilecfg');
								cfgnode.classList.add('toggle');
								cfgnode.style.marginTop='5px';
								page.appendChild(cfgnode);

								var cardpileadd=ui.create.div('.config.toggle.hidden.cardpilecfg.cardpilecfgadd',page);
								var pileaddlist=[];
								for(var i=0;i<lib.config.cards.length;i++){
									if(!lib.cardPack[lib.config.cards[i]]) continue;
									for(var j=0;j<lib.cardPack[lib.config.cards[i]].length;j++){
										var cname=lib.cardPack[lib.config.cards[i]][j];
										pileaddlist.push([cname,get.translation(cname)]);
										if(cname=='sha'){
											pileaddlist.push(['huosha','火杀']);
											pileaddlist.push(['leisha','雷杀']);
										}
									}
								}
								var cardpileaddname=ui.create.selectlist(pileaddlist,null,cardpileadd);
								cardpileaddname.style.width='75px';
								cardpileaddname.style.marginRight='2px';
								cardpileaddname.style.marginLeft='-1px';
								var cardpileaddsuit=ui.create.selectlist([
									['heart','红桃'],
									['diamond','方片'],
									['club','梅花'],
									['spade','黑桃'],
								],null,cardpileadd);
								cardpileaddsuit.style.width='53px';
								cardpileaddsuit.style.marginRight='2px';
								var cardpileaddnumber=ui.create.selectlist([
									1,2,3,4,5,6,7,8,9,10,11,12,13
								],null,cardpileadd);
								cardpileaddnumber.style.width='43px';
								cardpileaddnumber.style.marginRight='2px';
								var button=document.createElement('button');
								button.innerHTML='确定';
								button.style.width='40px';
								var deletecard=function(){
									this.parentNode.remove();
									var info=this.parentNode._info;
									var list=lib.config.addedpile[mode];
									for(var i=0;i<list.length;i++){
										if(list[i][0]==info[0]&&list[i][1]==info[1]&&list[i][2]==info[2]){
											list.splice(i,1);break;
										}
									}
									game.saveConfig('addedpile',lib.config.addedpile);
								};
								button.onclick=function(){
									var card=[
										cardpileaddsuit.value,
										cardpileaddnumber.value,
										cardpileaddname.value,
									];
									lib.config.addedpile[mode].push(card);
									game.saveConfig('addedpile',lib.config.addedpile);
									var cfgnode=ui.create.div('.config.toggle.cardpilecfg');
									cfgnode._info=card;
									cfgnode.innerHTML=get.translation(card[2])+' '+get.translation(card[0])+card[1];
									var cfgnodedelete=document.createElement('span');
									cfgnodedelete.classList.add('cardpiledelete');
									cfgnodedelete.innerHTML='删除';
									cfgnodedelete.onclick=deletecard;
									cfgnode.appendChild(cfgnodedelete);
									page.insertBefore(cfgnode,cardpileadd.nextSibling);
								};
								cardpileadd.appendChild(button);
								cardpileadd.style.whiteSpace='nowrap';
								cardpileNodes.push(cardpileadd);

								for(var i=0;i<lib.config.addedpile[mode].length;i++){
									var card=lib.config.addedpile[mode][i];
									var cfgnode=ui.create.div('.config.toggle.cardpilecfg');
									cfgnode._info=card;
									cfgnode.innerHTML=get.translation(card[2])+' '+get.translation(card[0])+card[1];
									var cfgnodedelete=document.createElement('span');
									cfgnodedelete.classList.add('cardpiledelete');
									cfgnodedelete.innerHTML='删除';
									cfgnodedelete.onclick=deletecard;
									cfgnode.appendChild(cfgnodedelete);
									cfgnode.style.display='none';
									cardpileNodes.push(cfgnode);
									page.appendChild(cfgnode);
								}

								for(var i=0;i<lib.cardPile[mode].length;i++){
									var card=lib.cardPile[mode][i];
									var cfgnode=createConfig({
										name:get.translation(card[2])+' '+get.translation(card[0])+card[1],
										_number:i,
										_name:mode,
										init:!lib.config.bannedpile[mode].contains(i),
										onclick:toggleCardPile
									});
									cardpileNodes.push(cfgnode);
									cfgnode.style.display='none';
									cfgnode.classList.add('cardpilecfg');
									page.appendChild(cfgnode);
								}
							}
	                        return node;
	                    };

						for(var i=0;i<lib.config.all.cards.length;i++){
	                        createModeConfig(lib.config.all.cards[i],start.firstChild);
	                    }
						for(var i in lib.cardPack){
							if(i.indexOf('mode_')==0){
								createModeConfig(i,start.firstChild);
							}
						}
						var active=start.firstChild.querySelector('.active');
	                    if(!active){
	                        active=start.firstChild.firstChild;
	                        active.classList.add('active');
	                    }
						rightPane.appendChild(active.link);

						(function(){
							var page=ui.create.div('.menu-buttons');
	                        var node=ui.create.div('.menubutton.large','牌堆',clickMode);
							start.firstChild.insertBefore(node,start.firstChild.querySelector('.lefttext'));
							node.link=page;
							node.mode='cardpile';

							var updatePileConfig=function(){
								var current=get.config('cardpilename');
								for(var i=0;i<page.childNodes.length;i++){
									if(page.childNodes[i].use){
										if(page.childNodes[i].link==current){
											page.childNodes[i].use.style.display='none';
										}
										else{
											page.childNodes[i].use.style.display='';
										}
									}
								}
							};

							var pileUse=function(){
								game.saveConfig('cardpilename',this.parentNode.link,true);
								restart.style.display='';
								updatePileConfig();
							};
							var pileDel=function(){
								delete lib.config.customcardpile[this.parentNode.link];
								this.parentNode.remove();
								game.saveConfig('customcardpile',lib.config.customcardpile);
								for(var i in lib.config.mode_config){
									if(i=='global') continue;
									if(lib.config.mode_config[i].cardpilename==this.parentNode.link){
										game.saveConfig('cardpilename',null,i);
									}
								}
							};
							var createPileNode=function(name){
								var node=ui.create.div('.config.toggle.cardpilecfg.nomarginleft',name);
								node.link=name;
								var edit=document.createElement('span');
								edit.innerHTML='使用';
								edit.classList.add('cardpiledelete');
								edit.onclick=pileUse;
								var del=document.createElement('span');
								del.innerHTML='删除';
								del.classList.add('cardpiledelete');
								del.onclick=pileDel;
								node.appendChild(del);
								node.appendChild(edit);
								node.use=edit;
								page.insertBefore(node,page.firstChild);
							};
							for(var i in lib.config.customcardpile){
								createPileNode(i);
							}
							updatePileConfig();
							var restart=ui.create.div('.config.more','重新启动',game.reload,page);
							restart.style.display='none';
							ui.create.div('.config.more','使用默认牌堆',function(){
								this.innerHTML='已使用';
								var that=this;
								setTimeout(function(){
									that.innerHTML='使用默认牌堆';
								},1000);
								game.saveConfig('cardpilename',null,true);
								game.saveConfig('bannedpile');
								game.saveConfig('addedpile');
								updatePileConfig();
							},page);
							var exportCardPile;
							ui.create.div('.config.more','保存当前牌堆 <div>&gt;</div>',page,function(){
								this.classList.toggle('on');
								if(this.classList.contains('on')){
									exportCardPile.classList.remove('hidden');
								}
								else{
									exportCardPile.classList.add('hidden');
								}
							});
							exportCardPile=ui.create.div('.config.cardpileadd.indent',page);
							exportCardPile.classList.add('hidden');
							ui.create.div('','名称：<input type="text"><button>确定</button>',exportCardPile);
							var input=exportCardPile.firstChild.lastChild.previousSibling;
							input.value='自定义牌堆';
							input.style.marginRight='3px';
							input.style.width='120px';
							exportCardPile.firstChild.lastChild.onclick=function(){
								var name=input.value;
								var ok=true;
								if(lib.config.customcardpile[name]){
									for(var i=1;i<=1000;i++){
										if(!lib.config.customcardpile[name+'('+i+')']){
											name=name+'('+i+')';
											break;
										}
									}
								}
								lib.config.customcardpile[name]=[lib.config.bannedpile,lib.config.addedpile];
								game.saveConfig('cardpilename',name,true);
								game.saveConfig('customcardpile',lib.config.customcardpile);
								game.saveConfig('bannedpile');
								game.saveConfig('addedpile');
								createPileNode(name);
								updatePileConfig();
							};
						}());

						var node1=ui.create.div('.lefttext','全部开启',start.firstChild,function(){
							game.saveConfig('cards',lib.config.all.cards);
							updateNodes();
						});
						var node2=ui.create.div('.lefttext','恢复默认',start.firstChild,function(){
							game.saveConfig('cards',lib.config.defaultcards);
							updateNodes();
						});
						node1.style.marginTop='12px';
						node2.style.marginTop='7px';

						updateNodes();
					}());

					(function(){
						var start=menux.pages[4];
						var rightPane=start.lastChild;
						var cheatButton=ui.create.div('.menubutton.round.highlight','作',start);
						var runButton=ui.create.div('.menubutton.round.highlight','执',start);
						runButton.style.display='none';
						var playButton=ui.create.div('.menubutton.round.highlight','播',start);
						playButton.style.display='none';
						playButton.style.left='215px';
						var deleteButton=ui.create.div('.menubutton.round.highlight','删',start);
						deleteButton.style.display='none';
						deleteButton.style.left='275px';
						var saveButton=ui.create.div('.menubutton.round.highlight','存',start);
						saveButton.style.display='none';

						var clickMode=function(){
							if(this.classList.contains('off')) return;
							var active=this.parentNode.querySelector('.active');
							if(active===this){
								return;
							}
							active.classList.remove('active');
							active.link.remove();
							active=this;
							this.classList.add('active');
							rightPane.appendChild(this.link);
							if(this.type=='cheat'){
								cheatButton.style.display='';
							}
							else{
								cheatButton.style.display='none';
							}
							if(this.type=='cmd'){
								runButton.style.display='';
							}
							else{
								runButton.style.display='none';
							}
							if(this.type=='video'){
								playButton.style.display='';
								saveButton.style.display='';
								deleteButton.style.display='';
							}
							else{
								playButton.style.display='none';
								saveButton.style.display='none';
								deleteButton.style.display='none';
							}
						};
						(function(){
							var checkCheat=function(){
								if(currentrow1&&currentrow2&&row3.querySelector('.glow')){
									cheatButton.classList.add('glowing');
									return true;
								}
								else{
									cheatButton.classList.remove('glowing');
									return false;
								}
							}
							cheatButton.listen(function(){
								if(checkCheat()){
									var num;
									switch(currentrow2.innerHTML){
										case '一':num=1;break;
										case '二':num=2;break;
										case '三':num=3;break;
										case '四':num=4;break;
										case '五':num=5;break;
									}
									var targets=[];
									var buttons=row3.querySelectorAll('.glow');
									for(var i=0;i<buttons.length;i++){
										targets.push(buttons[i].link);
									}
									while(targets.length){
										var target=targets.shift();
										switch(currentrow1.innerHTML){
											case '伤害':target.damage(num,'nosource');break;
											case '回复':target.recover(num,'nosource');break;
											case '摸牌':target.draw(num);break;
											case '弃牌':
												var hs=target.get('he');
												if(hs.length){
													target.discard(hs.randomGets(num));
												}
												break;
										}
									}
									if(ui.coin){
										game.changeCoin(-20);
									}
									clickContainer.call(menuContainer);
								}
							});

							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large','作弊',start.firstChild,clickMode);
							node.link=page;
							node.type='cheat';
							page.classList.add('menu-sym');

							var currentrow1=null;
							var row1=ui.create.div('.menu-cheat',page);
							var clickrow1=function(){
								if(currentrow1==this){
									this.classList.remove('selecting');
									currentrow1=null;
								}
								else{
									this.classList.add('selecting');
									if(currentrow1){
										currentrow1.classList.remove('selecting');
									}
									currentrow1=this;
								}
								checkCheat();
							};
							var nodedamage=ui.create.div('.menubutton','伤害',row1,clickrow1);
							var noderecover=ui.create.div('.menubutton','回复',row1,clickrow1);
							var nodedraw=ui.create.div('.menubutton','摸牌',row1,clickrow1);
							var nodediscard=ui.create.div('.menubutton','弃牌',row1,clickrow1);

							var currentrow2=null;
							var row2=ui.create.div('.menu-cheat',page);
							var clickrow2=function(){
								if(currentrow2==this){
									this.classList.remove('selecting');
									currentrow2=null;
								}
								else{
									this.classList.add('selecting');
									if(currentrow2){
										currentrow2.classList.remove('selecting');
									}
									currentrow2=this;
								}
								checkCheat();
							};
							var nodex1=ui.create.div('.menubutton','一',row2,clickrow2);
							var nodex2=ui.create.div('.menubutton','二',row2,clickrow2);
							var nodex3=ui.create.div('.menubutton','三',row2,clickrow2);
							var nodex4=ui.create.div('.menubutton','四',row2,clickrow2);
							var nodex5=ui.create.div('.menubutton','五',row2,clickrow2);

							var row3=ui.create.div('.menu-buttons',page);
							row3.style.marginTop='3px';
							var clickrow3=function(){
								this.classList.toggle('glow');
								checkCheat();
							};
							menuUpdates.push(function(){
								if(_status.video||_status.connectMode){
									node.classList.add('off');
                                    if(node.classList.contains('active')){
                                        node.classList.remove('active');
										node.link.remove();
										active=start.firstChild.lastChild.previousSibling;
										active.classList.add('active');
										rightPane.appendChild(active.link);
                                    }

									page.remove();
									cheatButton.remove();
									if(_status.video) node.remove();
									return;
								}
								var list=[];
								for(var i=0;i<game.players.length;i++){
									if(lib.character[game.players[i].name]&&game.players[i].isAlive()){
										list.push(game.players[i]);
									}
									else if(game.players[i]==game.me&&game.me.name1){
										list.push(game.me);
									}
								}
								if(list.length){
									row1.show();
									row2.show();
									row3.innerHTML='';
									var buttons=ui.create.buttons(list,'player',row3,true);
									for(var i=0;i<buttons.length;i++){
										buttons[i].listen(clickrow3);
									}
								}
								else{
									row1.hide();
									row2.hide();
								}
								checkCheat();
							});
						}());
						(function(){
							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large','换人',start.firstChild,clickMode);
							node.link=page;
							page.classList.add('menu-sym');
							var caption=ui.create.div('','选择一个换人目标',page);
							caption.style.margin='5px';
							caption.style.marginTop='6px';
							var row3=ui.create.div('.menu-buttons',page);
							row3.style.marginTop='3px';

							var currentrow3=null;
							var clickrow3=function(){
								if(game.changeCoin){
									game.changeCoin(-10);
								}
								game.swapPlayer(this.link);
							};
							menuUpdates.push(function(){
								if(_status.connectMode||(lib.config.mode!='identity'&&lib.config.mode!='guozhan')){
									node.classList.add('off');
									var active=start.firstChild.querySelector('.active');
									if(active==node){
										node.classList.remove('active');
										node.link.remove();
                                        if(_status.connectMode){
                                            active=start.firstChild.lastChild;
                                        }
                                        else{
                                            active=start.firstChild.firstChild.previousSibling;
                                            cheatButton.style.display='';
                                        }
										active.classList.add('active');
										rightPane.appendChild(active.link);
									}
                                    return;
								}
								var list=[];
								for(var i=0;i<game.players.length;i++){
									if(lib.character[game.players[i].name]&&
										game.players[i].isAlive()&&game.players[i]!=game.me){
										list.push(game.players[i]);
									}
								}
								if(_status.video){
									node.remove();
								}
								if(!_status.video&&list.length&&game.phaseNumber&&!_status.event.isMine()){
									node.classList.remove('off');
									row3.innerHTML='';
									var buttons=ui.create.buttons(list,'player',row3,true);
									for(var i=0;i<buttons.length;i++){
										buttons[i].listen(clickrow3);
									}
								}
								else{
									node.classList.add('off');
									var active=start.firstChild.querySelector('.active');
									if(active==node){
										node.classList.remove('active');
										node.link.remove();
										active=start.firstChild.firstChild;
										active.classList.add('active');
										rightPane.appendChild(active.link);
										cheatButton.style.display='';
									}
								}
							});
						}());
						(function(){
							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large','命令',start.firstChild,clickMode);
							node.type='cmd';
							node.link=page;
							page.classList.add('menu-sym');
                            menuUpdates.push(function(){
								if(_status.connectMode&&!lib.config.debug){
									node.classList.add('off');
                                    if(node.classList.contains('active')){
                                        node.classList.remove('active');
										node.link.remove();
										active=start.firstChild.lastChild.previousSibling;
										active.classList.add('active');
										rightPane.appendChild(active.link);
                                    }
                                }
                            });
							var text=document.createElement('div');
							text.style.width='194px';
                            text.style.height='124px';
							text.style.padding='3px';
                            text.style.borderRadius='2px';
                            text.style.boxShadow='rgba(0, 0, 0, 0.2) 0 0 0 1px';
                            text.style.textAlign='left';
                            text.style.webkitUserSelect='initial';
                            text.style.overflow='scroll';
                            text.style.position='absolute';
                            text.style.left='30px';
                            text.style.top='50px';
                            text.style.wordBreak='break-all';
							page.appendChild(text);

							// var caption=ui.create.div('','输入命令',page);
							// caption.style.margin='6px';
                            // caption.style.position='absolute';
                            // caption.style.width='120px';
                            // caption.style.top='129px';
                            // caption.style.left='64px';
							var text2=document.createElement('input');
                            text2.style.width='200px';
                            text2.style.height='20px';
							text2.style.padding='0';
                            text2.style.position='absolute';
                            text2.style.top='15px';
                            text2.style.left='30px';
							text2.style.resize='none';
                            text2.style.border='none';
                            text2.style.borderRadius='2px';
                            text2.style.boxShadow='rgba(0, 0, 0, 0.2) 0 0 0 1px';
                            var g={};
                            var logs=[];
                            var logindex=-1;
                            var cheat=lib.cheat;
                            var runCommand=function(e){
                                if(text2.value){
                                    logindex=-1;
                                    logs.unshift(text2.value);
                                }
                                if(text2.value=='cls'){
                                    text.innerHTML='';
                                }
                                else{
                                    try{
                                        var result=eval(text2.value);
                                        game.print(result);
                                    }
                                    catch(e){
                                        game.print(e);
                                    }
                                }
                                text2.value='';
                            }
                            text2.addEventListener('keydown',function(e){
                                if(e.keyCode==13){
                                    runCommand();
                                }
                                else if(e.keyCode==38){
                                    if(logindex+1<logs.length){
                                        text2.value=logs[++logindex];
                                    }
                                }
                                else if(e.keyCode==40){
                                    if(logindex>=0){
                                        logindex--;
                                        if(logindex<0){
                                            text2.value='';
                                        }
                                        else{
                                            text2.value=logs[logindex];
                                        }
                                    }
                                }
                            });
							page.appendChild(text2);
							game.print=function(){
							    var textstr='';
								for(var i=0;i<arguments.length;i++){
									textstr+=arguments[i];
                                    if(i<arguments.length-1){
                                        textstr+=' ';
                                    }
								}
								textstr+='<br>';
								text.innerHTML+=textstr;
                                text.scrollTop=text.scrollHeight;
							}
							runButton.listen(runCommand);
						}());
						(function(){
							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large','战绩',start.firstChild,clickMode);
							node.type='rec';
							node.link=page;
							page.style.paddingBottom='10px';
							var reset=function(){
								if(this.innerHTML=='重置'){
									this.innerHTML='确定';
									var that=this;
									setTimeout(function(){
										that.innerHTML='重置';
									},1000);
								}
								else{
									this.parentNode.previousSibling.remove();
									this.parentNode.remove();
									delete lib.config.gameRecord[this.parentNode.link];
									game.saveConfig('gameRecord',lib.config.gameRecord);
								}
							}
							for(var i=0;i<lib.config.all.mode.length;i++){
								if(!lib.config.gameRecord[lib.config.all.mode[i]]) continue;
								if(lib.config.gameRecord[lib.config.all.mode[i]].str){
									ui.create.div('.config.indent',lib.translate[lib.config.all.mode[i]],page).style.marginBottom='-5px';
									var item=ui.create.div('.config.indent',lib.config.gameRecord[lib.config.all.mode[i]].str+'<span>重置</span>',page);
									item.style.height='auto';
									item.lastChild.addEventListener('click',reset);
									item.link=lib.config.all.mode[i];
								}
							}
						}());
						(function(){
							if(!window.indexedDB) return;
							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large','录像',start.firstChild,clickMode);
							node.type='video';
							node.link=page;

							lib.onDB(function(){
								var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
								lib.videos=[];
								store.openCursor().onsuccess=function(e){
								    var cursor=e.target.result;
								    if(cursor){
										lib.videos.push(cursor.value);
										cursor.continue();
								    }
									else{
										lib.videos.sort(function(a,b){
											return parseInt(b.time)-parseInt(a.time);
										});
										var clickcapt=function(){
											var current=this.parentNode.querySelector('.videonode.active');
											if(current&&current!=this){
												current.classList.remove('active');
											}
											this.classList.toggle('active');
										};
										var staritem=function(){
											this.parentNode.classList.toggle('starred');
											var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
											if(this.parentNode.classList.contains('starred')){
												this.parentNode.link.starred=true;
											}
											else{
												this.parentNode.link.starred=false;
											}
											store.put(this.parentNode.link);
										}
										var createNode=function(video,before){
											var node=ui.create.div('.videonode.menubutton.large',clickcapt);
											node.link=video;
											ui.create.div('.menubutton.videoavatar',node).setBackground(video.name1,'character');
											if(video.name2){
												ui.create.div('.menubutton.videoavatar2',node).setBackground(video.name2,'character');
											}
											var date=new Date(video.time);
											var str=date.getFullYear()+'.'+(date.getMonth()+2)+'.'+(date.getDay()+1)+' '+
												date.getHours()+':';
											var minutes=date.getMinutes();
											if(minutes<10){
												str+='0';
											}
											str+=minutes;
											ui.create.div('.caption',video.name[0],node);
											ui.create.div('.text',str+'<br>'+video.name[1],node);
											if(video.win){
												ui.create.div('.victory','胜',node);
											}

											if(before){
												page.insertBefore(node,page.firstChild);
											}
											else{
												page.appendChild(node);
											}
											ui.create.div('.video_star','★',node,staritem);
											if(video.starred){
												node.classList.add('starred');
											}
										}
										for(var i=0;i<lib.videos.length;i++){
											createNode(lib.videos[i]);
										}
										lib.createVideoNode=createNode;
										var importVideoNode=ui.create.div('.config.switcher',
										'<span class="underlinenode slim">导入录像...</span>',function(){
											this.nextSibling.classList.toggle('hidden');
										},page);
										importVideoNode.style.marginLeft='12px';
										importVideoNode.style.marginTop='3px';
										var importVideo=ui.create.div('.config.hidden',page);
										importVideo.style.whiteSpace='nowrap';
										importVideo.style.marginBottom='80px';
										importVideo.style.marginLeft='13px';
										importVideo.style.width='calc(100% - 30px)';
										importVideo.innerHTML='<input type="file" style="width:calc(100% - 40px)">'+
										'<button style="width:40px">确定</button>';
										importVideo.lastChild.onclick=function(){
											var fileToLoad = importVideo.firstChild.files[0];
											var fileReader = new FileReader();
											fileReader.onload = function(fileLoadedEvent)
											{
												var data = fileLoadedEvent.target.result;
												if(!data) return;
												try{
													data=JSON.parse(lib.init.decode(data));
												}
												catch(e){
													console.log(e);
													alert('导入失败');
													return;
												}
												var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
												var videos=lib.videos.slice(0);
												for(var i=0;i<videos.length;i++){
													if(videos[i].starred){
														videos.splice(i--,1);
													}
												}
												for(var deletei=0;deletei<5;deletei++){
													if(videos.length>=parseInt(lib.config.video)&&videos.length){
														var toremove=videos.pop();
														lib.videos.remove(toremove);
														store.delete(toremove.time);
														for(var i=0;i<page.childNodes.length;i++){
															if(page.childNodes[i].link==toremove){
																page.childNodes[i].remove();
																break;
															}
														}
													}
													else{
														break;
													}
												}
												for(var i=0;i<lib.videos.length;i++){
													if(lib.videos[i].time==data.time){
														alert('录像已存在');
														return;
													}
												}
												lib.videos.unshift(data);
												store.put(data);
												createNode(data,true);
											};
											fileReader.readAsText(fileToLoad, "UTF-8");
										}

										playButton.listen(function(){
											var current=this.parentNode.querySelector('.videonode.active');
											if(current){
												game.playVideo(current.link.time,current.link.mode);
											}
										});
										deleteButton.listen(function(){
											var current=this.parentNode.querySelector('.videonode.active');
											if(current){
												lib.videos.remove(current.link);
												var store=lib.db.transaction(['video'],'readwrite').objectStore('video');
												store.delete(current.link.time);
												current.remove();
											}
										});
										saveButton.listen(function(){
											var current=this.parentNode.querySelector('.videonode.active');
											if(current){
												game.export(lib.init.encode(JSON.stringify(current.link)),
												'无名杀 - 录像 - '+current.link.name[0]+' - '+current.link.name[1]);
											}
										});

										ui.updateVideoMenu=function(){
											node.classList.add('active');
											rightPane.appendChild(page);
											playButton.style.display='';
											deleteButton.style.display='';
											saveButton.style.display='';
										}
									}
						        };
							});
						}());

						var active=start.firstChild.querySelector('.active');
						if(!active){
                            if(_status.connectMode){
                                active=start.firstChild.lastChild.previousSibling;
                            }
							else{
                                active=start.firstChild.firstChild;
                            }
							active.classList.add('active');
						}
						rightPane.appendChild(active.link);
					}());

					(function(){
						var start=menux.pages[5];
						var rightPane=start.lastChild;
						var clickMode=function(){
							if(this.classList.contains('off')) return;
							var active=this.parentNode.querySelector('.active');
							if(active===this){
								return;
							}
							active.classList.remove('active');
							active.link.remove();
							active=this;
							this.classList.add('active');
							rightPane.appendChild(this.link);
						};

						var page=ui.create.div();
						var node=ui.create.div('.menubutton.large','检查更新',start.firstChild,clickMode);
						node.link=page;
						page.classList.add('menu-help');
						var ul=document.createElement('ul');
						var li1=document.createElement('li');
                        var li2=document.createElement('li');
						var li3=document.createElement('li');
						li1.innerHTML='游戏版本：'+lib.version+'<p style="margin-top:8px"></p>';
						li2.innerHTML='素材版本：'+(lib.config.asset_version||'无')+'<p style="margin-top:8px"></p>';
                        li3.innerHTML='更新源<br><p style="margin-top:8px"><input type="text" style="width:120px" value="'+lib.updateURL+'"><button style="margin-left:5px">确定</button></p>';
                        li3.querySelector('button').onclick=function(){
                            lib.updateURL=this.previousSibling.value;
                            localStorage.setItem('noname_download_source',lib.updateURL);
                        }

						var button1,button2;

						game.checkForUpdate=function(forcecheck){
							if(button1.disabled){
								return;
							}
							else{
								button1.innerHTML='正在检查更新';
								button1.disabled=true;

								var goupdate=function(){
									if(game.download){
										var script=lib.init.js(lib.updateURL,'game/source',function(){
											script.remove();
											var updates=window.noname_source_list;
											delete window.noname_source_list;
                                            for(var i=0;i<updates.length;i++){
                                                if(updates[i].indexOf('theme/')==0&&updates[i].indexOf('style.css')==-1){
                                                    updates.splice(i--,1);
                                                }
                                            }

											if(!ui.arena.classList.contains('menupaused')){
												ui.click.configMenu();
												ui.click.menuTab('帮助');
											}
											var p=button1.parentNode;
											button1.remove();
											var span=document.createElement('span');
											var n1=0;
											var n2=updates.length;
											span.innerHTML='正在下载文件（'+n1+'/'+n2+'）';
											p.appendChild(span);
											var finish=function(){
												span.innerHTML='游戏更新完毕（'+n1+'/'+n2+'）';
												p.appendChild(document.createElement('br'));
												var button=document.createElement('button');
												button.innerHTML='重新启动';
												button.onclick=game.reload;
												p.appendChild(button);
											}
                                            game.multiDownload(updates,function(){
                                                n1++;
                                                span.innerHTML='正在下载文件（'+n1+'/'+n2+'）';
                                            },function(){
                                                game.print('下载失败：'+e.source);
                                            },function(){
                                                setTimeout(finish,500);
                                            });
										});
									}
									else{
										var layer=document.createElement('div');
										layer.classList.add('poplayer');
										layer.style.zIndex='25';
										layer.listen(function(){
											this.remove();
										});
										layer.style.background='rgba(0,0,0,0.5)';

										var iframe=document.createElement('iframe');
										iframe.src='http://pan.baidu.com/s/1jG5oK8e';
										iframe.width=Math.round(ui.window.offsetWidth*0.8)+'px';
										iframe.height=Math.round(ui.window.offsetHeight*0.9)+'px';
										iframe.style.left=Math.round(ui.window.offsetWidth*0.1)+'px';
										iframe.style.top=Math.round(ui.window.offsetHeight*0.05)+'px';
										iframe.style.position='absolute';
										layer.appendChild(iframe);

										ui.window.appendChild(layer);
									}
								};


								var script=lib.init.js(lib.updateURL,'game/update',function(){
									button1.disabled=false;
									button1.innerHTML='检查游戏更新';
									script.remove();
									var update=window.noname_update;
									delete window.noname_update;
									if(forcecheck===false&&update.version==lib.config.check_version){
										return;
									}
									game.saveConfig('check_version',update.version);
									if(update.version!=lib.version){
										var str='有新版本'+update.version+'可用，是否下载？';
										if(navigator.notification&&navigator.notification.confirm){
											var str2=update.changeLog[0];
											for(var i=1;i<update.changeLog.length;i++){
												str2+='；'+update.changeLog[i];
											}
											navigator.notification.confirm(
												str2,
												function(index){
													if(index==1){
														goupdate();
													}
												},
												str,
												['确定','取消']
											);
										}
										else{
											if(confirm(str)){
												goupdate();
											}
										}
									}
									else{
										alert('当前版本已是最新');
									}
								},function(){
                                    if(forcecheck===false){
                                        return;
                                    }
                                    alert('连接失败');
                                    button1.disabled=false;
									button1.innerHTML='检查游戏更新';
									script.remove();
                                });
							}
						};
						var checkForAssetUpdate=function(){
							if(button2.disabled){
								return;
							}
							else if(game.download){
								button2.innerHTML='正在检查更新';
								button2.disabled=true;
								var script=lib.init.js(lib.updateURL,'game/asset',function(){
									script.remove();
									var updates=window.noname_asset_list;
									delete window.noname_asset_list;
									var asset_version=updates.shift();
									if(asset_version==lib.config.asset_version){
										alert('素材已是最新');
										button2.disabled=false;
										button2.innerHTML='检查素材更新';
										return;
									}
									var n=updates.length;

									var proceed=function(){
										if(updates.length==0){
											game.saveConfig('asset_version',asset_version);
											alert('素材已是最新');
											button2.disabled=false;
											button2.innerHTML='检查素材更新';
											return;
										}
										if(!ui.arena.classList.contains('menupaused')){
											ui.click.configMenu();
											ui.click.menuTab('帮助');
										}
										var p=button2.parentNode;
										button2.remove();
										var span=document.createElement('span');
										var n1=0;
										var n2=updates.length;
										span.innerHTML='正在下载素材（'+n1+'/'+n2+'）';
										p.appendChild(span);
										var finish=function(){
											if(n1==n2){
												game.saveConfig('asset_version',asset_version);
											}
											span.innerHTML='素材更新完毕（'+n1+'/'+n2+'）';
											p.appendChild(document.createElement('br'));
											var button=document.createElement('button');
											button.innerHTML='重新启动';
											button.onclick=game.reload;
											p.appendChild(button);
										}
                                        game.multiDownload(updates,function(){
                                            n1++;
                                            span.innerHTML='正在下载素材（'+n1+'/'+n2+'）';
                                        },function(){
                                            game.print('下载失败：'+e.source);
                                        },function(){
                                            setTimeout(finish,500);
                                        });
									};
									for(var i=0;i<updates.length;i++){
                                        if(lib.node&&lib.node.fs){
                                            lib.node.fs.access(__dirname+'/'+updates[i],(function(entry){
                                                return function(err){
                                                    if(err){
                                                        n--;
            											if(n==0){
            												proceed();
            											}
                                                    }
                                                    else{
                                                        n--;
            											updates.remove(entry);
            											if(n==0){
            												proceed();
            											}
                                                    }
        										}
                                            }(updates[i])));
                                        }
                                        else{
                                            resolveLocalFileSystemURL(lib.assetURL+updates[i],function(entry){
    											n--;
    											updates.remove(entry.toURL().slice(lib.assetURL.length));
    											if(n==0){
    												proceed();
    											}
    										},function(){
    											n--;
    											if(n==0){
    												proceed();
    											}
    										});
                                        }
									}
								},function(){
                                    alert('连接失败');
                                    button2.disabled=false;
									button2.innerHTML='检查游戏更新';
									script.remove();
                                });
							}
							else{
								alert('此版本不支持游戏内更新素材，请手动更新');
							}
						};

						button1=document.createElement('button');
						button1.innerHTML='检查游戏更新';
						button1.onclick=game.checkForUpdate;
						li1.lastChild.appendChild(button1);
						button2=document.createElement('button');
						button2.innerHTML='检查素材更新';
						button2.onclick=checkForAssetUpdate;
						li2.lastChild.appendChild(button2);

						ul.appendChild(li1);
                        ul.appendChild(li2);
						ul.appendChild(li3);
						page.appendChild(ul);

						for(var i in lib.help){
							var page=ui.create.div('');
							var node=ui.create.div('.menubutton.large',i,start.firstChild,clickMode);
							node.link=page;
							page.classList.add('menu-help');
							page.innerHTML=lib.help[i];
						}
						var active=start.firstChild.querySelector('.active');
						if(!active){
							active=start.firstChild.firstChild;
							active.classList.add('active');
						}
						rightPane.appendChild(active.link);
					}());

				}());
				lib.status.date=new Date();
				lib.status.dateDelayed=0;

				while(lib.arenaReady.length){
					(lib.init.eval(lib.arenaReady.shift()))();
				}
				delete lib.arenaReady;
				if(lib.config.auto_check_update){
					setTimeout(function(){
						game.checkForUpdate(false);
					},3000);
				}
				clearTimeout(window.resetGameTimeout);
				delete window.resetGameTimeout;
				delete window.resetExtension;
			},
			system:function(str,func,right){
				var node=ui.create.div(right?ui.system2:ui.system1);
				node.innerHTML=str;
				if(func){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',function(e){
						if(_status.dragged) return;
						func.call(this,e);
					});
				}
				if(lib.config.button_press){
					node.addEventListener(lib.config.touchscreen?'touchstart':'mousedown',function(e){
						if(!node.classList.contains('hidden')) node.classList.add('pressdown');
					});
					node.addEventListener(lib.config.touchscreen?'touchend':'mouseup',function(e){
						node.classList.remove('pressdown');
					});
					node.addEventListener(lib.config.touchscreen?'touchmove':'mousemove',function(e){
						node.classList.remove('pressdown');
					});
				}
				return node;
			},
			pause:function(){
				if(_status.pausing) return;
                ui.click.shortcut(false);
				var node=ui.create.div("#paused",ui.window);
				_status.pausing=true;
				setTimeout(function(){
					_status.pausing=false;
				},500);
				if(lib.config.touchscreen){
					setTimeout(function(){
						node.addEventListener('touchend',ui.click.resume);
					},500);
				}
				else{
					node.addEventListener('click',ui.click.resume);
				}
				if(!lib.config.touchscreen){
					node.oncontextmenu=ui.click.resume;
				}

				var node2=ui.create.div('#paused2',node);
                if(_status.connectMode){
                    node2.innerHTML='';
                }
                else{
                    node2.innerHTML='已暂停';
                }

				// node2.listen(function(){
				// 	_status.clicked=true;
				// 	if(ui.sidebar.classList.contains('hidden')){
				// 		ui.sidebar.show();
				// 		ui.sidebar3.show();
				// 	}
				// 	else{
				// 		ui.sidebar.hide();
				// 		ui.sidebar3.hide();
				// 	}
				// });
				return node;
			},
			button:function(item,type,position,noclick){
				var node;
				switch(type){
					case 'blank':
					node=ui.create.div('.button.card',position);
					node.link=item;
					break;

					case 'card':
					if(typeof item.copy=='function'){
						node=item.copy();
					}
					else{
						node=item.cloneNode(true);
					}
					node.classList.add('button');
					position.appendChild(node);
					node.link=item;
					if(item.style.backgroundImage){
						node.style.backgroundImage=item.style.backgroundImage;
						node.style.backgroundSize='cover';
					}
					if(item.style.color){
						node.style.color=item.style.color;
					}
					if(item.nature){
						node.classList.add(item.nature);
					}
					break;

					case 'vcard':
					node=ui.create.card(position,'noclick',noclick).init(item);
					node.classList.add('button');
					node.link=item;
					break;

					case 'character':case 'player':
					node=ui.create.div('.button.character',position);
					node.link=item;
					if(type=='character'){
						node.setBackground(item,'character');
						node.node={
							name:ui.create.div('.name',node),
							hp:ui.create.div('.hp',node),
							intro:ui.create.div('.intro',node),
							group:ui.create.div('.identity',node)
						}
						var infoitem=lib.character[item];
						if(!infoitem){
							for(var itemx in lib.characterPack){
								if(lib.characterPack[itemx][item]){
									infoitem=lib.characterPack[itemx][item];break;
								}
							}
						}
						if(infoitem[2]>14){
							node.node.hp.innerHTML=infoitem[2];
							if(infoitem[2]==Infinity){
								node.node.hp.innerHTML='∞';
							}
							node.node.hp.classList.add('text');
						}
						else{
							for(var i =0;i<infoitem[2];i++){
								ui.create.div('',node.node.hp);
							}
						}
						if(!lib.config.show_name){
							node.node.name.style.display='none';
						}
						if(node.node.hp.childNodes.length==0){
							node.node.name.style.top='8px';
						}
						// var name=get.translation(item);
						node.node.name.innerHTML=get.slimName(item);
						// for(var i=0;i<name.length;i++){
						// 	node.node.name.innerHTML+=name[i]+'<br/>';
						// }
						node.node.intro.innerHTML=lib.config.intro;
						if(!noclick){
							if(lib.config.touchscreen){
								lib.setLongPress(node,ui.click.intro);
							}
							else{
								if(lib.config.hover_all){
									lib.setHover(node,ui.click.hoverplayer);
								}
								if(lib.config.right_info){
									node.oncontextmenu=ui.click.rightplayer;
								}
							}
						}
						if(infoitem[1]){
							node.node.group.innerHTML='<div>'+get.translation(infoitem[1])+'</div>';
							node.node.group.style.backgroundColor=get.translation(infoitem[1]+'Color');
						}
						else{
							node.node.group.style.display='none';
						}
					}
					else{
						node.node={
							name:ui.create.div('.name',node),
							intro:ui.create.div('.intro',node)
						}
						if(item.name.indexOf('unknown')==0){
							node.setBackground(item.name1,'character');
						}
						else{
							node.setBackground(item.name,'character');
						}
					}
					break;

					case 'text':
					node=ui.create.div('.button.text',position);
					node.innerHTML=lib.get.translate(item);
					break;
				}
				if(!noclick){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
				}
				else{
					node.classList.add('noclick');
					if(node.querySelector('.intro')){
						node.querySelector('.intro').remove();
					}
				}
				for(var i in lib.element.button){
					node[i]=lib.element.button[i];
				}
				return node;
			},
			buttons:function(list,type,position,noclick,zoom){
				var buttons=[];
				for(var i=0;i<list.length;i++){
					buttons.push(ui.create.button(list[i],type,position,noclick));
				}
				return buttons;
			},
			player:function(position){
				var node=ui.create.div('.player',position);
				node.node={
					avatar:ui.create.div('.avatar',node,ui.click.avatar).hide(),
					avatar2:ui.create.div('.avatar2',node,ui.click.avatar2).hide(),
					intro:ui.create.div('.intro',node),
					identity:ui.create.div('.identity',node),
					hp:ui.create.div('.hp',node),
					name:ui.create.div('.name',node),
					name2:ui.create.div('.name.name2',node),
                    nameol:ui.create.div('.nameol',node),
					count:ui.create.div('.count',node).hide(),
					equips:ui.create.div('.equips',node).hide(),
					judges:ui.create.div('.judges',node),
					marks:ui.create.div('.marks',node),
					handcards1:ui.create.div('.handcards'),
					handcards2:ui.create.div('.handcards'),
				};
				node.node.action=ui.create.div('.action',node.node.avatar);

				node.skipList=[];
				node.skills=[];
				node.initedSkills=[];
				node.additionalSkills={};
				node.disabledSkills={};
				node.hiddenSkills=[];
				node.forbiddenSkills=[];
				node.modeSkills=[];
				node.popups=[];
				node.damagepopups=[];
				node.judging=[];
				node.stat=[{card:{},skill:{}}];
				node.tempSkills={};
				node.storage={};
				node.marks={};
				node.ai={friend:[],enemy:[],neutral:[]};
				node.queueCount=0;

				for(var i in lib.element.player){
					node[i]=lib.element.player[i];
				}
				ui.create.div(node.node.identity);
				node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.target);
				node.node.identity.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.identity);

				if(lib.config.touchscreen){
					node.addEventListener('touchstart',ui.click.playertouchstart);
				}

				return node;
			},
            connectPlayers:function(ip){
                game.connectPlayers=[];
                for(var i=0;i<8;i++){
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

                var button=ui.create.div('.menubutton.large.highlight.connectbutton',game.online?'退出联机':'开始游戏',ui.window,function(){
                    if(button.clicked) return;
                    if(game.online){
                        game.saveConfig('reconnect_info');
                        game.reload();
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
            },
			players:function(num){
				if(num===0){
					return;
				}
                if(num==undefined) num=lib.configOL.number;
				if(num==undefined) num=lib.config.mode_config[lib.config.mode].player_number;
				if(typeof num=='string'){
					num=parseInt(num);
				}
				if(!num) num=5;
				for(var i=0;i<num;i++){
					var player=ui.create.player(ui.arena).animate('start');
					game.players.push(player);
					player.dataset.position=i;
				}
				var players=game.players;
				for(var i=0;i<players.length;i++){
					if(i>0){
						players[i].previous=players[i-1];
						players[i].previousSeat=players[i-1];
					}
					if(i<players.length-1){
						players[i].next=players[i+1];
						players[i].nextSeat=players[i+1];
					}
				}
				players[0].previous=players[players.length-1];
				players[0].previousSeat=players[players.length-1];
				players[players.length-1].next=players[0];
				players[players.length-1].nextSeat=players[0];
				ui.arena.dataset.number=num;
				return players;
			},
			me:function(hasme){
				ui.mebg=ui.create.div('#mebg',ui.arena);
				ui.me=ui.create.div('#me',ui.arena).animate('start');
				ui.handcards1Container=ui.create.div('#handcards1',ui.me);
				ui.handcards2Container=ui.create.div('#handcards2',ui.me);
				if(lib.config.mousewheel&&!lib.config.touchscreen){
					ui.handcards1Container.onmousewheel=ui.click.mousewheel;
					ui.handcards2Container.onmousewheel=ui.click.mousewheel;
				}
				ui.handcards1Container.ontouchstart = ui.click.touchStart;
				ui.handcards2Container.ontouchstart = ui.click.touchStart;
				ui.handcards1Container.ontouchmove = ui.click.touchScroll;
				ui.handcards2Container.ontouchmove = ui.click.touchScroll;
				ui.handcards1Container.style.WebkitOverflowScrolling='touch';
				ui.handcards2Container.style.WebkitOverflowScrolling='touch';

                if(hasme&&game.me){
                    ui.handcards1=game.me.node.handcards1;
					ui.handcards2=game.me.node.handcards2;
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);
					ui.updatehl();
                }
				else if(game.players.length){
					game.me=game.players[0];
					ui.handcards1=game.me.node.handcards1;
					ui.handcards2=game.me.node.handcards2;
					ui.handcards1Container.appendChild(ui.handcards1);
					ui.handcards2Container.appendChild(ui.handcards2);
					ui.updatehl();
				}
			},
			card:function(position,info,noclick){
				var node=ui.create.div('.card',position);
				node.node={
					image:ui.create.div('.image',node),
					info:ui.create.div('.info',node),
					name:ui.create.div('.name',node),
					name2:ui.create.div('.name2',node),
					background:ui.create.div('.background',node),
					intro:ui.create.div('.intro',node),
					range:ui.create.div('.range',node),
				}
				for(var i in lib.element.card){
					node[i]=lib.element.card[i];
				}
				node.node.intro.innerHTML=lib.config.intro;
				if(!noclick){
					if(lib.config.touchscreen){
						lib.setLongPress(node,ui.click.intro);
					}
					else{
						if(lib.config.hover_all){
							lib.setHover(node,ui.click.hoverplayer);
						}
						if(lib.config.right_info){
							node.oncontextmenu=ui.click.rightplayer;
						}
					}
				}
				node.storage={};
				if(info!='noclick'){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.card);
					if(lib.config.touchscreen){
						node.addEventListener('touchstart',ui.click.cardtouchstart);
						node.addEventListener('touchmove',ui.click.cardtouchmove);
					}
					if(lib.cardSelectObserver){
						lib.cardSelectObserver.observe(node,{attributes:true});
					}
				}
				return node;
			},
			cards:function(random){
				if(!random){
					lib.card.list.randomSort();
				}
				for(var i=0;i<lib.card.list.length;i++){
					if(lib.card[lib.card.list[i][2]]){
						if(lib.config.bannedcards.contains(lib.card.list[i][2])) continue;
						if(game.bannedcards&&game.bannedcards.contains(lib.card.list[i][2])) continue;
						ui.create.card(ui.cardPile).init(lib.card.list[i]);
					}
				}
			},
		},
		click:{
            shortcut:function(show){
                if(show===false){
                    ui.shortcut.classList.add('hidden');
                }
                else{
                    ui.shortcut.classList.toggle('hidden');
                }
                if(ui.shortcut.classList.contains('hidden')){
                    ui.window.classList.remove('shortcutpaused');
                }
                else{
                    if(_status.auto){
                        ui.shortcut.autobutton.classList.add('active');
                    }
                    else{
                        ui.shortcut.autobutton.classList.remove('active');
                    }
                    ui.window.classList.add('shortcutpaused');
                }
            },
            favouriteCharacter:function(e){
                if(this.innerHTML=='添加收藏'){
                    this.innerHTML='移除收藏';
                    lib.config.favouriteCharacter.add(this.link);
                }
                else{
                    this.innerHTML='添加收藏';
                    lib.config.favouriteCharacter.remove(this.link);
                }
                game.saveConfig('favouriteCharacter',lib.config.favouriteCharacter);
                e.stopPropagation();
            },
			dragtouchdialog:function(e){
				if(e.touches.length>1&&
					!this.classList.contains('popped')&&
					!this.classList.contains('fixed')){
					_status.draggingtouchdialog=this;
					this._dragorigin={
						clientX:e.touches[0].clientX,
						clientY:e.touches[0].clientY,
					};
					if(!this._dragtransform){
						this._dragtransform=[0,0];
					}
					this._dragorigintransform=this._dragtransform.slice(0);
					e.preventDefault();
					e.stopPropagation();
				}
			},
			identity:function(){
				if(_status.dragged) return;
				_status.clicked=true;
				if(!game.getIdentityList) return;
				if(_status.video) return;
				if(_status.clickingidentity){
					for(var i=0;i<_status.clickingidentity[1].length;i++){
						_status.clickingidentity[1][i].delete();
						_status.clickingidentity[1][i].style.transform='';
					}
					if(_status.clickingidentity[0]==this.parentNode){
						delete _status.clickingidentity;
						return;
					}
				}
				var list=game.getIdentityList(this.parentNode);
				if(!list) return;
				var nodes=[];
				_status.clickingidentity=[this.parentNode,nodes];
				var num=1;
				for(var i in list){
					if(this.firstChild.innerHTML!=list[i]){
						var node=ui.create.div('.identity.hidden',this.parentNode,ui.click.identity2);
						ui.create.div(node).innerHTML=list[i];
						node.dataset.color=i;
						ui.refresh(node);
						node.show();
						var transstr='translateY('+((num++)*30)+'px)';
						if(lib.config.layout=='phone'){
							transstr+=' scale(1.3)';
						}
						if(lib.isNewLayout()&&this.parentNode.isLinked()){
							transstr+=' rotate(90deg)';
						}
						node.style.transform=transstr;
						nodes.push(node);
					}
				}
			},
			identity2:function(){
				if(_status.clickingidentity){
					_status.clicked=true;
					var player=_status.clickingidentity[0];
					var nodes=_status.clickingidentity[1];
					player.node.identity.dataset.color=this.dataset.color;
					player.node.identity.firstChild.innerHTML=this.firstChild.innerHTML;
					for(var i=0;i<nodes.length;i++){
						nodes[i].delete();
						nodes[i].style.transform='';
					}
					delete _status.clickingidentity;
				}
			},
			roundmenu:function(){
				switch(lib.config.round_menu_func){
					case 'system':
                        game.closePopped();
						ui.system1.classList.add('shown');
						ui.system2.classList.add('shown');
                        game.closeMenu();
                        ui.click.shortcut();
						break;
					case 'menu':
                        game.closePopped();
						game.pause2();
						ui.click.configMenu();
						ui.system1.classList.remove('shown');
						ui.system2.classList.remove('shown');
						break;
					case 'pause':
						ui.click.pause();
						break;
					case 'auto':
						ui.click.auto();
						break;
				}
				_status.clicked=true;
			},
			pausehistory:function(){
				if(!lib.config.auto_popped_history) return;
				if(!ui.sidebar.childNodes.length) return;
				var uiintro=ui.create.dialog('hidden');
				uiintro.style.maxHeight='400px';
				uiintro.add(ui.sidebar);
				return uiintro;
			},
			pauseconfig:function(){
				if(!lib.config.auto_popped_config) return;
                if(lib.config.layout=='phone') return;
				// if(!ui.config.childNodes.length) return;
				var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});

				var rows=Math.ceil(lib.config.all.mode.length/3);
				uiintro.type='config';
				for(var k=0;k<rows;k++){
					var node=ui.create.div('.newgame');
					for(var i=0;i<3&&i+k*3<lib.config.all.mode.length;i++){
						var thismode=lib.config.all.mode[i+k*3];
                        if(thismode=='connect') continue;
						var div=ui.create.div(thismode==lib.config.mode?'.underlinenode.on':'.underlinenode',node);
						div.innerHTML=lib.translate[thismode];
						div.link=thismode;
						div.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							game.saveConfig('mode',this.link);
							localStorage.setItem(lib.configprefix+'directstart',true);
							game.reload();
						});
					}
					uiintro.add(node);
				}
				if(_status.video) return uiintro;

				var auto=null;
				var ng=null;
				var sks=[];
				var autoskill=ui.autoskill;
				if(game.players){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==game.me||game.players[i].isUnderControl()){
							sks=sks.concat(game.expandSkills(game.players[i].get('s')));
						}
					}
				}
				for(var i=0;i<sks.length;i++){
					if(autoskill[sks[i]]){
						if(!auto){
							ng=ui.create.div('.text');
							ng.style.marginBottom=0;
							ng.innerHTML='新游戏';
							uiintro.content.insertBefore(ng,uiintro.content.firstChild);

							auto=ui.create.div('.text');
							auto.style.marginBottom=0;
							auto.innerHTML='自动发动';
							uiintro.add(auto);
						}
						autoskill[sks[i]].style.display='';
						uiintro.add(autoskill[sks[i]]);
					}
				}

				return uiintro;
			},
			cardPileButton:function(){
				var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});
                var num;
                if(game.online){
                    num=_status.cardPileNum||0;
                }
                else{
                    num=ui.cardPile.childNodes.length;
                }
				uiintro.add('剩余 <span style="font-family:'+'xinwei'+'">'+num);

                if(_status.connectMode) return uiintro;
				uiintro.add('<div class="text center">弃牌堆</div>');
				if(ui.discardPile.childNodes.length){
					var list=[];
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						list.push(ui.discardPile.childNodes[i]);
					}
					uiintro.addSmall([list,'card']);
				}
				else{
					uiintro.add('<div class="text center" style="padding-bottom:3px">无</div>');
				}
				return uiintro;
			},
            chat:function(){
                ui.system1.classList.add('shown');
                ui.system2.classList.add('shown');

                var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});

                var list=ui.create.div('.caption');
                if(lib.config.layout=='phone'){
                    list.style.maxHeight='250px';
                }
                else{
                    list.style.maxHeight='350px';
                }
                list.style.overflow='scroll';
                lib.setScroll(list);
                uiintro.contentContainer.style.overflow='hidden';

                var input;
                var addEntry=function(info,clear){
                    if(list._chatempty){
                        list.innerHTML='';
                        delete list._chatempty;
                    }
                    var node=ui.create.div('.text.chat');
                    node.innerHTML=info[0]+': '+info[1];
                    list.appendChild(node);
                    list.scrollTop=list.scrollHeight;
    				uiintro.style.height=uiintro.content.scrollHeight+'px';
                }
                _status.addChatEntry=addEntry;
                _status.addChatEntry._origin=uiintro;
                if(lib.chatHistory.length){
                    for(var i=0;i<lib.chatHistory.length;i++){
                        addEntry(lib.chatHistory[i]);
                    }
                }
                else{
                    list._chatempty=true;
                    list.appendChild(ui.create.div('.text.center','无聊天记录'))
                }
                uiintro.add(list);
                uiintro.style.height=uiintro.content.offsetHeight+'px';
                list.scrollTop=list.scrollHeight;

                var node=uiintro.add('<input type="text" value="">');
                node.style.paddingTop=0;
                node.style.marginBottom='16px';
                input=node.firstChild;
                input.style.width='calc(100% - 20px)';
                input.onkeydown=function(e){
                    if(e.keyCode==13&&input.value){
                        var player=game.me;
                        var str=input.value;
                        if(!player){
                            if(game.connectPlayers){
                                if(game.online){
                                    for(var i=0;i<game.connectPlayers.length;i++){
                                        if(game.connectPlayers[i].playerid==game.onlineID){
                                            player=game.connectPlayers[i];break;
                                        }
                                    }
                                }
                                else{
                                    player=game.connectPlayers[0];
                                }
                            }
                        }
                        if(!player) return;
                        if(game.online){
                            game.send('chat',game.onlineID,str);
                        }
                        else{
                            lib.element.player.chat.call(player,str);
                        }
                        input.value='';
                    }
                    e.stopPropagation();
                }
                uiintro._onopen=function(){
                    input.focus();
                    list.scrollTop=list.scrollHeight;
                };
                uiintro._heightfixed=true;
                return uiintro;
            },
			volumn:function(){
				var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});
				uiintro.add('背景音乐');
				var vol1=ui.create.div('.volumn');
				uiintro.add(vol1);
				for(var i=0;i<8;i++){
					var span=document.createElement('span');
					span.link=i+1;
					span.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.volumn_background);
					if(i<lib.config.volumn_background){
						span.innerHTML='●';
					}
					else{
						span.innerHTML='○';
					}
					vol1.appendChild(span);
				}
				uiintro.add('游戏音效');

				var vol2=ui.create.div('.volumn');
				uiintro.add(vol2);
				for(var i=0;i<8;i++){
					var span=document.createElement('span');
					span.link=i+1;
					span.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.volumn_audio);
					if(i<lib.config.volumn_audio){
						span.innerHTML='●';
					}
					else{
						span.innerHTML='○';
					}
					vol2.appendChild(span);
				}
				uiintro.add(ui.create.div('.placeholder'));
				return uiintro;
			},
			volumn_background:function(e){
				if(_status.dragged) return;
				var volume=this.link;
				if(volume===1&&lib.config.volumn_background===1){
					volume=0;
				}
				game.saveConfig('volumn_background',volume);
				ui.backgroundMusic.volume=volume/8;
				for(var i=0;i<8;i++){
					if(i<lib.config.volumn_background){
						this.parentNode.childNodes[i].innerHTML='●';
					}
					else{
						this.parentNode.childNodes[i].innerHTML='○';
					}
				}
				e.stopPropagation();
			},
			volumn_audio:function(e){
				if(_status.dragged) return;
				var volume=this.link;
				if(volume===1&&lib.config.volumn_audio===1){
					volume=0;
				}
				game.saveConfig('volumn_audio',volume);
				for(var i=0;i<8;i++){
					if(i<lib.config.volumn_audio){
						this.parentNode.childNodes[i].innerHTML='●';
					}
					else{
						this.parentNode.childNodes[i].innerHTML='○';
					}
				}
				e.stopPropagation();
			},
			hoverpopped:function(){
				if(this._uiintro){
					return;
				}
				if(!this._poppedfunc){
					return;
				}
				if(lib.config.touchscreen||this.forceclick){
					_status.touchpopping=true;
					setTimeout(function(){
						_status.touchpopping=false;
					},500);
				}
				var uiintro=this._poppedfunc();
				if(!uiintro) return;
				if(ui.currentpopped&&ui.currentpopped._uiintro){
					ui.currentpopped._uiintro.delete();
					delete ui.currentpopped._uiintro;
				}
				ui.currentpopped=this;
                uiintro.classList.add('popped');
				uiintro.classList.add('hoverdialog');
				uiintro.classList.add('static');
				this._uiintro=uiintro;

				ui.window.appendChild(uiintro);
				var width=this._poppedwidth||330;
				uiintro.style.width=width+'px';
                if(lib.config.layout=='phone'){
                    width*=1.3;
                }

                if(uiintro._heightfixed){
                    uiintro.style.height=uiintro.content.scrollHeight+'px';
                }
                else{
                    var height=this._poppedheight||uiintro.content.scrollHeight;
                    var height2=ui.window.offsetHeight-260;
                    if(lib.config.layout=='phone'){
                        height2=(ui.window.offsetHeight-80)/1.3;
                    }
    				uiintro.style.height=Math.min(height2,height)+'px';
                }
				if(lib.config.layout=='phone'){
					uiintro.style.top='70px';
				}
				else{
					uiintro.style.top='50px';
				}
				var left=this.parentNode.offsetLeft+this.offsetLeft+this.offsetWidth/2-width/2;
				if(left<10){
					left=10;
				}
				else if(left+width>ui.window.offsetWidth-10){
					left=ui.window.offsetWidth-width-10;
				}
				uiintro.style.left=left+'px';
				uiintro._poppedorigin=this;
				if(!lib.config.touchscreen){
					uiintro.addEventListener('mouseleave',ui.click.leavehoverpopped);
				}
                ui.click.shortcut(false);
                if(uiintro._onopen){
                    uiintro._onopen();
                }
			},
			hoverpopped_leave:function(){
				this._poppedalready=false;
			},
			leavehoverpopped:function(){
				if(_status.dragged) return;
				if(this.classList.contains('noleave')) return;
				this.delete();
				var button=this._poppedorigin;

				var uiintro=this;
				setTimeout(function(){
					if(button._uiintro==uiintro){
						delete button._uiintro;
					}
				},500);

			},
			dierevive:function(){
				if(game.me.isDead()){
					game.me.revive(Math.max(1,game.me.maxHp));
					game.me.draw(2);
				}
				else{
					if(ui.revive){
						ui.revive.close();
						delete ui.revive;
					}
				}
			},
			dieswap:function(){
				if(game.me.isDead()){
					_status.clicked=true;
					var i,translation,intro,str;
					if(ui.intro){
						ui.intro.close();
						if(ui.intro.source=='dieswap'){
							delete ui.intro;
							ui.control.show();
							game.resume2();
							return;
						}
					}
					game.pause2();
					ui.control.hide();
					ui.intro=ui.create.dialog();
					ui.intro.source='dieswap';

					var players=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isAlive()){
							players.push(game.players[i]);
						}
					}
					ui.intro.add(players,true);
					var buttons=ui.intro.querySelectorAll('.button');
					for(var i=0;i<buttons.length;i++){
						buttons[i].addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.dieswap2);
					}
				}
				else{
					if(ui.swap){
						ui.swap.close();
						delete ui.swap;
					}
				}
			},
			dieswap2:function(){
				if(_status.dragged) return;
				game.swapPlayer(this.link);
			},
			windowtouchstart:function(e){
				if(window.inSplash) return;
				if(e.touches[0]&&lib.config.swipe&&e.touches.length<2){
					_status._swipeorigin={
						clientX:e.touches[0].clientX,
						clientY:e.touches[0].clientY,
						time:get.currentTime()
					}
				}
			},
			windowtouchmove:function(e){
				e.preventDefault();
				if(window.inSplash) return;
				if(_status.draggingroundmenu){
					delete _status._swipeorigin;
					if(ui.roundmenu._dragorigin&&ui.roundmenu._dragtransform&&e.touches.length){
						var translate=ui.roundmenu._dragtransform.slice(0);
						var dx=e.touches[0].clientX-ui.roundmenu._dragorigin.clientX;
						var dy=e.touches[0].clientY-ui.roundmenu._dragorigin.clientY;
						translate[0]+=dx;
						translate[1]+=dy;
						if(dx*dx+dy*dy>100){
							if(ui.roundmenu._resetTimeout){
								clearTimeout(ui.roundmenu._resetTimeout);
								delete ui.roundmenu._resetTimeout;
							}
						}
						ui.roundmenu._dragtouches=e.touches[0];
						ui.click.checkroundtranslate(translate);
					}
					_status.clicked=true;
				}
				else if(_status.draggingtouchdialog){
					delete _status._swipeorigin;
					if(_status.draggingtouchdialog._dragorigin&&_status.draggingtouchdialog._dragtransform&&e.touches.length){
						var translate=_status.draggingtouchdialog._dragtransform.slice(0);
						var dx=e.touches[0].clientX-_status.draggingtouchdialog._dragorigin.clientX;
						var dy=e.touches[0].clientY-_status.draggingtouchdialog._dragorigin.clientY;
						translate[0]+=dx;
						translate[1]+=dy;
						_status.draggingtouchdialog._dragtouches=e.touches[0];
						ui.click.checkdialogtranslate(translate,_status.draggingtouchdialog);
					}
					_status.clicked=true;
				}
				else if(_status._swipeorigin&&e.touches[0]){
					_status._swipeorigin.touches=e.touches[0];
				}

				if(_status.mousedragging&&e.touches.length){
					e.preventDefault();
					var item=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
					while(item){
						if(lib.config.enable_touchdragline&&_status.mouseleft&&lib.config.mode!='chess'){
							ui.canvas.width=ui.arena.offsetWidth;
							ui.canvas.height=ui.arena.offsetHeight;
							var ctx=ui.ctx;
							ctx.shadowBlur=5;
							ctx.shadowColor='rgba(0,0,0,0.3)';
							ctx.strokeStyle='white';
							ctx.lineWidth=3;
							ctx.setLineDash([8,2]);

							ctx.beginPath();

							ctx.moveTo(_status.mousedragging.clientX-ui.arena.offsetLeft,_status.mousedragging.clientY-ui.arena.offsetTop);

							if(_status.multitarget){
								for(var i=0;i<_status.lastdragchange.length;i++){
									var exy=_status.lastdragchange[i]._lastdragchange;
									ctx.lineTo(exy[0],exy[1]);
								}
							}
							if(!_status.selectionfull){
								ctx.lineTo(e.touches[0].clientX-ui.arena.offsetLeft,e.touches[0].clientY-ui.arena.offsetTop);
							}
							ctx.stroke();
							if(!_status.multitarget){
								for(var i=0;i<_status.lastdragchange.length;i++){
									ctx.moveTo(_status.mousedragging.clientX-ui.arena.offsetLeft,_status.mousedragging.clientY-ui.arena.offsetTop);
									var exy=_status.lastdragchange[i]._lastdragchange;
									ctx.lineTo(exy[0],exy[1]);
									ctx.stroke();
								}
							}
						}

						if(item==_status.mousedragorigin){
							if(_status.mouseleft){
								_status.mousedragging=null;
								_status.mousedragorigin=null;
								_status.clicked=false;
								game.uncheck();
								game.check();
								ui.canvas.width=ui.arena.offsetWidth;
								ui.canvas.height=ui.arena.offsetHeight;
								_status.clicked=true;
							}
							return;
						}
						var itemtype=get.itemtype(item);
						if(itemtype=='card'||itemtype=='button'||itemtype=='player'){
							_status.mouseleft=true;
							var ex=e.touches[0].clientX-ui.arena.offsetLeft;
							var ey=e.touches[0].clientY-ui.arena.offsetTop;
							var exx=ex,eyy=ey;
							if(lib.config.mode=='chess'){
								ex-=-ui.chessContainer.scrollLeft+ui.chess.offsetLeft;
								ey-=-ui.chessContainer.scrollTop+ui.chess.offsetTop;
							}
							if(itemtype!='player'||(ex>item.offsetLeft&&ex<item.offsetLeft+item.offsetWidth&&
								ey>item.offsetTop&&ey<item.offsetTop+item.offsetHeight)){
								var targetfixed=false;
								if(itemtype=='player'){
									if(get.select(_status.event.selectTarget)[1]==-1){
										targetfixed=true;
									}
								}
								if(!targetfixed&&item.classList.contains('selectable')&&_status.dragstatuschanged!=item){
									_status.mouseleft=true;
									_status.dragstatuschanged=item;
									_status.clicked=false;
									_status.dragged=false;
									var notbefore=itemtype=='player'&&!item.classList.contains('selected');
									ui.click[itemtype].call(item);
									if(item.classList.contains('selected')){
										if(notbefore){
											_status.lastdragchange.push(item);
											item._lastdragchange=[exx,eyy];
											if(lib.falseitem){
												var from=[_status.mousedragging.clientX-ui.arena.offsetLeft,_status.mousedragging.clientY-ui.arena.offsetTop];
												var to=[exx,eyy];
												var node=ui.create.div('.linexy.hidden');
												node.style.left=from[0]+'px';
												node.style.top=from[1]+'px';
												node.style.transitionDuration='0.3s';
												node.style.backgroundColor='white';
												var dy=to[1]-from[1];
												var dx=to[0]-from[0];
												var deg=Math.atan(Math.abs(dy)/Math.abs(dx))/Math.PI*180;
												if(dx>=0){
													if(dy<=0){
														deg+=90;
													}
													else{
														deg=90-deg;
													}
												}
												else{
													if(dy<=0){
														deg=270-deg;
													}
													else{
														deg+=270;
													}
												}
												node.style.transform='rotate('+(-deg)+'deg) scaleY(0)';
												node.style.height=get.xyDistance(from,to)+'px';
												if(lib.config.mode=='chess'){
													ui.chess.appendChild(node);
												}
												else{
													ui.arena.appendChild(node);
												}
												ui.refresh(node);
												node.show();
												node.style.transform='rotate('+(-deg)+'deg) scaleY(1)';
												ui.touchlines.push(node);
												node._origin=item;
											}
										}
									}
									else{
										_status.lastdragchange.remove(item);
										for(var i=0;i<ui.touchlines.length;i++){
											if(ui.touchlines[i]._origin==item){
												ui.touchlines[i].delete();
												ui.touchlines.splice(i--,1);
											}
										}
									}
									_status.selectionfull=true;
									if(_status.event.filterButton&&ui.selected.buttons.length<get.select(_status.event.selectButton)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterCard&&ui.selected.cards.length<get.select(_status.event.selectCard)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterTarget&&ui.selected.targets.length<get.select(_status.event.selectTarget)[1]){
										_status.selectionfull=false;
									}
								}
							}
							return;
						}
						item=item.parentNode;
					}
					_status.mouseleft=true;
					_status.dragstatuschanged=null;
				}
			},
			windowtouchend:function(e){
				if(window.inSplash) return;
				if(e.touches.length==1&&!_status.dragged&&!_status.draggingtouchdialog){
					ui.click.pause();
				}
				if(_status.draggingroundmenu){
					delete _status._swipeorigin;
					if(ui.roundmenu._resetTimeout){
						clearTimeout(ui.roundmenu._resetTimeout);
						delete ui.roundmenu._resetTimeout;
					}
					var translate;
					if(ui.roundmenu._dragorigin&&ui.roundmenu._dragtransform&&ui.roundmenu._dragtouches){
						var dx=ui.roundmenu._dragtouches.clientX-ui.roundmenu._dragorigin.clientX;
						var dy=ui.roundmenu._dragtouches.clientY-ui.roundmenu._dragorigin.clientY;
						if(dx*dx+dy*dy<1000){
							ui.click.roundmenu();
							ui.roundmenu._dragtransform=ui.roundmenu._dragorigintransform;
							translate=ui.roundmenu._dragtransform;
							ui.roundmenu.style.transform='translate('+translate[0]+'px,'+translate[1]+'px)';
						}
						else{
							translate=ui.roundmenu._dragtransform;
							translate[0]+=dx;
							translate[1]+=dy;
							ui.click.checkroundtranslate();
						}
						delete ui.roundmenu._dragorigin;
					}
					else{
						ui.click.roundmenu();
					}
					_status.clicked=false;
					game.saveConfig('roundmenu_transform',translate);
					delete _status.draggingroundmenu;
				}
				else if(_status.draggingtouchdialog){
					delete _status._swipeorigin;
					var translate;
					if(_status.draggingtouchdialog._dragorigin&&_status.draggingtouchdialog._dragtransform&&_status.draggingtouchdialog._dragtouches){
						var dx=_status.draggingtouchdialog._dragtouches.clientX-_status.draggingtouchdialog._dragorigin.clientX;
						var dy=_status.draggingtouchdialog._dragtouches.clientY-_status.draggingtouchdialog._dragorigin.clientY;
						translate=_status.draggingtouchdialog._dragtransform;
						translate[0]+=dx;
						translate[1]+=dy;
						ui.click.checkdialogtranslate(null,_status.draggingtouchdialog);

						delete _status.draggingtouchdialog._dragorigin;
					}
					_status.clicked=false;
					game.saveConfig('dialog_transform',translate);
					delete _status.draggingtouchdialog;
					_status.justdragged=true;
					setTimeout(function(){
						_status.justdragged=false;
					},500);
				}
				else if(_status._swipeorigin&&!_status.paused2&&!_status.mousedragging){
					 if(get.currentTime()-_status._swipeorigin.time<500){
						var dx=_status._swipeorigin.touches.clientX-_status._swipeorigin.clientX;
						var dy=_status._swipeorigin.touches.clientY-_status._swipeorigin.clientY;
						var goswipe=function(action){
							switch(action){
								case 'system':
                                    game.closePopped();
									ui.system1.classList.add('shown');
									ui.system2.classList.add('shown');
                                    game.closeMenu();
                                    ui.click.shortcut();
									break;
								case 'menu':
                                    game.closePopped();
									game.pause2();
									ui.click.configMenu();
									ui.system1.classList.remove('shown');
									ui.system2.classList.remove('shown');
									break;
								case 'pause':
									ui.click.pause();
									break;
								case 'auto':
									ui.click.auto();
									break;
                                case 'chat':
                                    game.closeMenu();
                                    if(ui.chatButton){
                                        ui.click.hoverpopped.call(ui.chatButton);
                                    }
                                    break;
							}
						}
						if(Math.abs(dx)<100){
							if(dy<-200){
								goswipe(lib.config.swipe_up);
							}
							else if(dy>200){
								goswipe(lib.config.swipe_down);
							 }
						 }
						 else if(Math.abs(dy)<100){
							 if(dx<-200){
 								goswipe(lib.config.swipe_left);
 							}
 							else if(dx>200){
 								goswipe(lib.config.swipe_right);
 							 }
						 }
					 }
				}
				var tmpflag=false;
				_status.mousedown=false;
				_status.clicked=false;
				if(_status.mousedragging&&_status.mouseleft){
					if(game.check()){
						if(ui.confirm){
							ui.confirm.close();
						}
						ui.click.ok();
					}
					else{
						game.uncheck();
						game.check();
					}
				}
				else if(_status.mousedragging&&_status.mousedragorigin){
					tmpflag=_status.mousedragorigin;
				}
				_status.lastdragchange.length=0;
				_status.mousedragging=null;
				_status.mouseleft=false;
				_status.mousedragorigin=null;
				_status.dragstatuschanged=false;
				while(ui.touchlines.length){
					ui.touchlines.shift().delete();
				}
				ui.canvas.width=ui.arena.offsetWidth;
				ui.canvas.height=ui.arena.offsetHeight;
				if(tmpflag){
					game.check();
				}
				_status.dragged=false;
				_status.clicked=false;
			},
			checkroundtranslate:function(translate){
				var translate=translate||ui.roundmenu._dragtransform;
				if(translate[1]+ui.roundmenu._position[1]+50+ui.arena.offsetTop>ui.window.offsetHeight){
					translate[1]=ui.window.offsetHeight-(ui.roundmenu._position[1]+50)-ui.arena.offsetTop;
				}
				else if(translate[1]+ui.roundmenu._position[1]+ui.arena.offsetTop<0){
					translate[1]=-ui.roundmenu._position[1]-ui.arena.offsetTop;
				}
				if(translate[0]+ui.roundmenu._position[0]+50+ui.arena.offsetLeft>ui.window.offsetWidth){
					translate[0]=ui.window.offsetWidth-(ui.roundmenu._position[0]+50)-ui.arena.offsetLeft;
				}
				else if(translate[0]+ui.roundmenu._position[0]+ui.arena.offsetLeft<0){
					translate[0]=-ui.roundmenu._position[0]-ui.arena.offsetLeft;
				}
				ui.roundmenu.style.transform='translate('+translate[0]+'px,'+translate[1]+'px)';
			},
			checkdialogtranslate:function(translate,dialog){
				var translate=translate||dialog._dragtransform;
				dialog.style.transform='translate('+translate[0]+'px,'+translate[1]+'px)';
			},
			windowmousewheel:function(e){
				_status.tempunpopup=e;
			},
			windowmousemove:function(e){
				if(window.inSplash) return;
				if(_status.tempunpopup){
					if(get.evtDistance(_status.tempunpopup,e)>5){
						delete _status.tempunpopup;
					}
				}
				if(e.button==2) return;
				if(!Array.isArray(e.path)) return;
				var dialogs=document.querySelectorAll('#window>.dialog.popped:not(.static)');
				for(var i=0;i<dialogs.length;i++){
					dialogs[i].delete();
				}
				var node=_status.currentmouseenter;
				if(_status.mousedragging){
					e.preventDefault();
					if(lib.config.enable_dragline){
						ui.canvas.width=ui.arena.offsetWidth;
						ui.canvas.height=ui.arena.offsetHeight;
						var ctx=ui.ctx;
						ctx.shadowBlur=5;
						ctx.shadowColor='rgba(0,0,0,0.3)';
						ctx.strokeStyle='white';
						ctx.lineWidth=3;
						ctx.setLineDash([8,2]);

						ctx.beginPath();

						ctx.moveTo(_status.mousedragging.x-ui.arena.offsetLeft,_status.mousedragging.y-ui.arena.offsetTop);
						if(_status.multitarget){
							for(var i=0;i<_status.lastdragchange.length;i++){
								var exy=_status.lastdragchange[i]._lastdragchange;
								ctx.lineTo(exy[0],exy[1]);
							}
						}
						if(!_status.selectionfull){
							ctx.lineTo(e.x-ui.arena.offsetLeft,e.y-ui.arena.offsetTop);
						}
						ctx.stroke();
						if(!_status.multitarget){
							for(var i=0;i<_status.lastdragchange.length;i++){
								ctx.moveTo(_status.mousedragging.x-ui.arena.offsetLeft,_status.mousedragging.y-ui.arena.offsetTop);
								var exy=_status.lastdragchange[i]._lastdragchange;
								ctx.lineTo(exy[0],exy[1]);
								ctx.stroke();
							}
						}
					}

					for(var i=0;i<e.path.length;i++){
						if(e.path[i]==_status.mousedragorigin){
							if(_status.mouseleft){
								_status.mousedragging=null;
								_status.mousedragorigin=null;
								_status.clicked=false;
								game.uncheck();
								game.check();
								ui.canvas.width=ui.arena.offsetWidth;
								ui.canvas.height=ui.arena.offsetHeight;
								_status.clicked=true;
							}
							return;
						}
						var itemtype=get.itemtype(e.path[i]);
						if(itemtype=='card'||itemtype=='button'||itemtype=='player'){
							_status.mouseleft=true;
							var item=e.path[i];
							var ex=e.x-ui.arena.offsetLeft;
							var ey=e.y-ui.arena.offsetTop;
							var exx=ex,eyy=ey;
							if(lib.config.mode=='chess'){
								ex-=-ui.chessContainer.scrollLeft+ui.chess.offsetLeft;
								ey-=-ui.chessContainer.scrollTop+ui.chess.offsetTop;
							}
							if(itemtype!='player'||(ex>item.offsetLeft&&ex<item.offsetLeft+item.offsetWidth&&
								ey>item.offsetTop&&ey<item.offsetTop+item.offsetHeight)){
								var targetfixed=false;
								if(itemtype=='player'){
									if(get.select(_status.event.selectTarget)[1]==-1){
										targetfixed=true;
									}
								}
								if(!targetfixed&&item.classList.contains('selectable')&&_status.dragstatuschanged!=item){
									_status.mouseleft=true;
									_status.dragstatuschanged=item;
									_status.clicked=false;
									var notbefore=itemtype=='player'&&!item.classList.contains('selected');
									ui.click[itemtype].call(item);
									if(item.classList.contains('selected')){
										if(notbefore){
											_status.lastdragchange.push(item);
											e.path[i]._lastdragchange=[exx,eyy];
										}
									}
									else{
										_status.lastdragchange.remove(item);
									}
									_status.selectionfull=true;
									if(_status.event.filterButton&&ui.selected.buttons.length<get.select(_status.event.selectButton)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterCard&&ui.selected.cards.length<get.select(_status.event.selectCard)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterTarget&&ui.selected.targets.length<get.select(_status.event.selectTarget)[1]){
										_status.selectionfull=false;
									}
								}
							}
							return;
						}
					}
					_status.mouseleft=true;
					_status.dragstatuschanged=null;
				}
				else{
					if(e.path.contains(node)&&!node._mouseentercreated){
						ui.click.mouseentercancel();
						var hoveration;
						if(typeof node._hoveration=='number'){
							hoveration=node._hoveration;
						}
						else{
							hoveration=parseInt(lib.config.hoveration);
							if(node.classList.contains('button')||
								(node.parentNode&&node.parentNode.parentNode)==ui.me){
								hoveration+=500;
							}
						}
						_status._mouseentertimeout=setTimeout(function(){
							if(_status.currentmouseenter!=node||node._mouseentercreated||_status.tempunpopup||
								_status.mousedragging||_status.mousedown||!node.offsetWidth||!node.offsetHeight){
								return;
							}
							if(node._hoverfunc&&!node._nopup){
								var dialog=node._hoverfunc.call(node,e);
								dialog.classList.add('popped');
								ui.window.appendChild(dialog);
								lib.placePoppedDialog(dialog,e);
								if(node._hoverwidth){
									dialog.style.width=node._hoverwidth+'px';
									dialog._hovercustomed=true;
								}
								node._mouseenterdialog=dialog;
								node._mouseentercreated=true;
							}
						},hoveration);
					}
					if(_status.draggingdialog){
						var ddialog=_status.draggingdialog;
						if(ddialog._dragorigin&&ddialog._dragtransform){
							var translate=ddialog._dragtransform.slice(0);
							translate[0]+=e.x-ddialog._dragorigin.x;
							translate[1]+=e.y-ddialog._dragorigin.y;
							ui.click.checkdialogtranslate(translate,ddialog);
						}
						_status.clicked=true;
					}
					if(_status.draggingroundmenu){
						if(ui.roundmenu._dragorigin&&ui.roundmenu._dragtransform){
							var translate=ui.roundmenu._dragtransform.slice(0);
							translate[0]+=e.x-ui.roundmenu._dragorigin.x;
							translate[1]+=e.y-ui.roundmenu._dragorigin.y;
							ui.click.checkroundtranslate(translate);
						}
						_status.clicked=true;
					}
				}
			},
			windowmousedown:function(e){
				if(window.inSplash) return;
				if(e.button==2) return;
				_status.mousedown=true;
				var dialogs=ui.window.querySelectorAll('#window>.dialog.popped:not(.static)');
				for(var i=0;i<dialogs.length;i++){
					dialogs[i].delete();
				}
				if(e.path){
					for(var i=0;i<e.path.length;i++){
						var itemtype=get.itemtype(e.path[i]);
						if(itemtype=='button') break;
						if(itemtype=='dialog'&&
						!e.path[i].classList.contains('popped')&&
						!e.path[i].classList.contains('fixed')){
							var ddialog=e.path[i];
							_status.draggingdialog=ddialog;
							ddialog._dragorigin=e;
							if(!ddialog._dragtransform){
								ddialog._dragtransform=[0,0];
							}
							return;
						}
						if(e.path[i]==ui.roundmenu){
							_status.draggingroundmenu=true;
							ui.roundmenu._dragorigin=e;
							if(!ui.roundmenu._dragtransform){
								ui.roundmenu._dragtransform=[0,0];
							}
						}
					}
				}

				var evt=_status.event;
				if(!lib.config.enable_drag) return;
				if(!ui.arena.classList.contains('selecting')) return;
				if(!evt.isMine()) return;
				if(!Array.isArray(e.path)) return;
				for(var i=0;i<e.path.length;i++){
					var itemtype=get.itemtype(e.path[i]);
					if(itemtype=='card'||itemtype=='button'||itemtype=='player'){
						if(e.path[i].classList.contains('selectable')&&
							!e.path[i].classList.contains('selected')&&
							!e.path[i].classList.contains('noclick')){
							_status.clicked=false;
							ui.click[itemtype].call(e.path[i]);
							if(e.path[i].classList.contains('selected')){
								_status.mousedragging=e;
								_status.mousedragorigin=e.path[i];
								_status.mouseleft=false;
								_status.selectionfull=false;
								_status.multitarget=false;
								// if(ui.confirm&&ui.confirm.str=='c') ui.confirm.close();
							}
						}
						return;
					}
				}
			},
			cardtouchstart:function(e){
				if(e.touches.length!=1) return;
				if(!lib.config.enable_drag) return;
				if(!this.parentNode) return;
				if(!this.parentNode.parentNode) return;
				if(this.parentNode.parentNode.parentNode!=ui.me) return;
				if(this.parentNode.parentNode.classList.contains('scrollh')) return;
				if(this.classList.contains('selectable')&&
					!this.classList.contains('selected')&&
					!this.classList.contains('noclick')){
					this._waitingfordrag={clientX:e.touches[0].clientX,clientY:e.touches[0].clientY};
				}
			},
			cardtouchmove:function(e){
				if(this._longpresstimeout){
					clearTimeout(this._longpresstimeout);
					delete this._longpresstimeout;
				}
				if(this._waitingfordrag){
					var drag=this._waitingfordrag;
					_status.clicked=false;
					_status.touchnocheck=true;
					ui.click.card.call(this);
					_status.touchnocheck=false;
					if(this.classList.contains('selected')){
						_status.mousedragging=drag;
						_status.mousedragorigin=this;
						_status.mouseleft=false;
						_status.selectionfull=false;
						_status.multitarget=false;
					}
					delete this._waitingfordrag;
				}
			},
			windowmouseup:function(e){
				if(window.inSplash) return;
				if(_status.draggingdialog){
					var ddialog=_status.draggingdialog;
					var translate;
					if(ddialog._dragorigin&&ddialog._dragtransform){
						translate=ddialog._dragtransform;
						translate[0]+=e.x-ddialog._dragorigin.x;
						translate[1]+=e.y-ddialog._dragorigin.y;
						ui.click.checkdialogtranslate(null,ddialog);
						delete ddialog._dragorigin;
					}
					game.saveConfig('dialog_transform',translate);
					delete _status.draggingdialog;
				}
				if(_status.draggingroundmenu){
					var translate;
					if(ui.roundmenu._dragorigin&&ui.roundmenu._dragtransform){
						var dx=e.x-ui.roundmenu._dragorigin.x;
						var dy=e.y-ui.roundmenu._dragorigin.y;
						if(dx*dx+dy*dy<25){
							ui.click.roundmenu();
						}
						translate=ui.roundmenu._dragtransform;
						translate[0]+=dx;
						translate[1]+=dy;
						ui.click.checkroundtranslate();
						delete ui.roundmenu._dragorigin;
					}
					game.saveConfig('roundmenu_transform',translate);
					delete _status.draggingroundmenu;
				}
				if(e.button==2){
					if(_status.mousedragging){
						_status.mousedragging=null;
						_status.mouseleft=false;
						_status.mousedragorigin=null;
						_status.dragstatuschanged=false;
						ui.canvas.width=ui.arena.offsetWidth;
						ui.canvas.height=ui.arena.offsetHeight;
						game.uncheck();
						game.check();
						_status.noright=true;
					}
				}
				else{
					var tmpflag=false;
					_status.mousedown=false;
					if(_status.mousedragging&&_status.mouseleft){
						if(game.check()){
							if(ui.confirm){
								ui.confirm.close();
							}
							ui.click.ok();
						}
						else{
							game.uncheck();
							game.check();
						}
					}
					else if(_status.mousedragging&&_status.mousedragorigin){
						tmpflag=_status.mousedragorigin;
					}
					_status.lastdragchange.length=0;
					_status.mousedragging=null;
					_status.mouseleft=false;
					_status.mousedragorigin=null;
					_status.dragstatuschanged=false;
					ui.canvas.width=ui.arena.offsetWidth;
					ui.canvas.height=ui.arena.offsetHeight;
					if(tmpflag){
						ui.click[get.itemtype(tmpflag)].call(tmpflag);
						game.check();
					}
					// ui.updatehl();
				}
			},
			mousemove:function(){
				if(!lib.config.hover_handcard&&this.parentNode&&this.parentNode.parentNode==ui.me){
					return;
				}
				if(!_status.currentmouseenter){
					_status.currentmouseenter=this;
				}
			},
			mouseenter:function(){
				if(!lib.config.hover_handcard&&this.parentNode&&this.parentNode.parentNode==ui.me){
					return;
				}
				_status.currentmouseenter=this;
			},
			mouseleave:function(){
				ui.click.mouseentercancel();
				if(_status.currentmouseenter==this){
					_status.currentmouseenter=null;
				}
				this._mouseentercreated=false;
			},
			mousedown:function(){
				ui.click.mouseentercancel();
				if(_status.currentmouseenter==this){
					_status.currentmouseenter=null;
				}
				this._mouseentercreated=true;
			},
			mouseentercancel:function(){
				if(_status._mouseentertimeout){
					clearTimeout(_status._mouseentertimeout);
					delete _status._mouseentertimeout
				}
			},
			hoverplayer:function(e){
				var node=get.nodeintro(this,true);
				node.style.zIndex=21;
				return node;
			},
			longpressdown:function(e){
				if(_status.longpressed) return;
				if(this._longpresstimeout){
					clearTimeout(this._longpresstimeout);
				}
				var func=this._longpresscallback;
				var node=this;
				this._longpresstimeout=setTimeout(function(){
					delete node._longpresstimeout;
					if(_status.mousedragging&&_status.mouseleft) return;
					if(!_status.longpressed){
						_status.longpressed=true;
						setTimeout(function(){
							_status.longpressed=false;
						},500);
						func.call(node,e);
						if(lib.config.touchscreen&&lib.config.enable_drag&&!node._waitingfordrag){
							_status.mousedragging=null;
							_status.mousedragorigin=null;
							_status.clicked=false;
							game.uncheck();
							game.check();
							ui.canvas.width=ui.arena.offsetWidth;
							ui.canvas.height=ui.arena.offsetHeight;
							_status.clicked=true;
						}
					}
				},500);
			},
			longpresscancel:function(){
				if(this._longpresstimeout){
					clearTimeout(this._longpresstimeout);
					delete this._longpresstimeout;
				}
			},
			window:function(){
				var clicked=_status.clicked;
				var dialogtouched=false;
				if(_status.dialogtouched){
					_status.dialogtouched=false;
					dialogtouched=true;
				}
				if(_status.dragged) return;
				if(_status.touchpopping) return;
				if(_status.reloading) return;
				if(_status.clicked){
					_status.clicked=false;
				}
				else{
					if(ui.controls.length){
						ui.updatec();
					}
					if(_status.editing){
						if(_status.editing.innerHTML.length){
							_status.editing.link=_status.editing.innerHTML;
						}
						_status.editing.innerHTML=get.translation(_status.editing.link);
						delete _status.editing;
					}
					else if(_status.choosing){
						if(!_status.choosing.expand){
							_status.choosing.parentNode.style.height='';
							_status.choosing.nextSibling.delete();
							_status.choosing.previousSibling.show();
							delete _status.choosing;
						}
					}
					else if(ui.intro){
						ui.intro.close();
						delete ui.intro;
						ui.control.show();
						game.resume2();
					}
					else if(_status.event.isMine()&&!dialogtouched){
						if(_status.event.custom.replace.window){
							_status.event.custom.replace.window();
						}
						else{
							if(_status.event.skill&&_status.event.name=='chooseToUse'){
								ui.click.cancel();
							}
							else{
								game.uncheck();
								game.check();
							}
						}
					}
                    ui.click.shortcut(false);
					if(lib.config.layout=='phone'&&ui.menuContainer.classList.contains('hidden')){
						if(ui.system2.classList.contains('shown')){
							_status.removinground=true;
							setTimeout(function(){
								_status.removinground=false;
							},200);
						}
						ui.arena.classList.remove('phonetop');
						ui.system1.classList.remove('shown');
						ui.system2.classList.remove('shown');
						// if(ui.chessinfo){
						// 	ui.chessinfo.classList.remove('zoomed');
						// }
					}
				}
				if(_status.tempunpop){
					_status.tempunpop=false;
				}
				else{
					game.closePopped();
				}
				if(_status.event.custom.add.window){
					_status.event.custom.add.window(clicked);
				}
			},
			toggle:function(){
				if(_status.dragged) return;
				if(this.parentNode.classList.contains('disabled')) return;
				_status.tempunpop=true;
				if(this.link){
					this.link=false;
					this.classList.remove('on');
					if(this.additionalCommand) this.additionalCommand(false,this.parentNode);
				}
				else{
					this.link=true;
					this.classList.add('on');
					if(this.additionalCommand) this.additionalCommand(true,this.parentNode);
				}
			},
			editor:function(){
				if(_status.dragged) return;
				if(_status.editing) return;
				_status.clicked=true;
				this.innerHTML='';
				_status.editing=this;
				if(this.additionalCommand) this.additionalCommand(this);
			},
			switcher:function(){
				if(_status.dragged) return;
				if(this.parentNode.classList.contains('disabled')) return;
				if(_status.choosing) return;
				_status.clicked=true;
				_status.tempunpop=true;
				this.previousSibling.hide();
				var node=ui.create.div('.switcher',this.parentNode).animate('start');
				for(var i=0;i<this.choice.length;i++){
					var choice=ui.create.div(node);
					choice.innerHTML=get.translation(this.choice[i]);
					choice.link=this.choice[i];
					choice.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.choice);
				}
				this.parentNode.style.height=(node.offsetHeight)+'px';
				_status.choosing=this;
				if(!_status.choosing.expand){
					_status.choosing.expand=true;
					setTimeout(function(){
						_status.choosing.expand=false;
					},500);
				}
			},
			choice:function(){
				if(_status.dragged) return;
				if(!_status.choosing) return;
				_status.choosing.link=this.link;
				_status.choosing.innerHTML=get.translation(this.link);
				this.parentNode.parentNode.style.height='';
				this.parentNode.delete();
				_status.choosing.previousSibling.show();
				delete _status.choosing;
				if(this.parentNode.parentNode.querySelector('.toggle').additionalCommand){
					this.parentNode.parentNode.querySelector('.toggle').additionalCommand(this.link,this.parentNode.parentNode);
				}
			},
			button:function(){
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(_status.tempNoButton) return;
				if(_status.draggingtouchdialog) return;
				if(this.classList.contains('noclick')) return;
				if(_status.justdragged) return;
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.button){
					custom.replace.button(this);
					return;
				}
                if(!_status.event.isMine()) return;
				if(this.classList.contains('selectable')==false) return;
				if(this.classList.contains('selected')){
					ui.selected.buttons.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
					}
				}
				else{
					ui.selected.buttons.add(this);
				}
				this.classList.toggle('selected');
				if(custom.add.button){
					custom.add.button();
				}
				game.check();
			},
			card:function(){
				delete this._waitingfordrag;
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(ui.intro) return;
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.card){
					custom.replace.card(this);
					return;
				}
				if(this.classList.contains('selectable')==false) return;
				var notoggle=false;
				if(this.classList.contains('selected')){
					ui.selected.cards.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
						notoggle=true;
					}
				}
				else{
					ui.selected.cards.add(this);
				}
				if(!notoggle){
					this.classList.toggle('selected');
				}
                if(lib.config.mode=='chess'&&get.config('show_range')&&!_status.event.skill&&this.classList.contains('selected')&&
                _status.event.isMine()&&_status.event.name=='chooseToUse'){
                    var player=_status.event.player;
                    var range=get.info(this).range;
                    if(range){
                        if(typeof range.attack==='number'){
                            player.createRangeShadow(Math.min(8,get.attackRange(player)+range.attack-1));
                        }
                        else if(typeof range.global==='number'){
                            player.createRangeShadow(Math.min(8,get.globalFrom(player)+range.global));
                        }
                    }
                }
				if(custom.add.card){
					custom.add.card();
				}
				game.check();
			},
			avatar:function(){
				if(!lib.config.change_skin) return;
				if(this.parentNode.classList.contains('unseen')) return;
                if(!this.parentNode.name) return;
				var avatar=this;
				var player=this.parentNode;
				if(!this._doubleClicking){
					this._doubleClicking=true;
					setTimeout(function(){
						avatar._doubleClicking=false;
					},500);
					return;
				}
				var num=1;
				if(lib.config.skin[player.name]){
					num=lib.config.skin[player.name]+1;
				}
				var img=new Image();
				img.onload=function(){
					lib.config.skin[player.name]=num;
					game.saveConfig('skin',lib.config.skin);
					avatar.style.backgroundImage='url("'+img.src+'")';
					if(lib.config.animation&&!lib.config.low_performance){
						player.$rare();
					}
				}
				img.onerror=function(){
					if(lib.config.skin[player.name]){
						if(lib.config.animation&&!lib.config.low_performance){
							player.$rare();
						}
					}
					delete lib.config.skin[player.name];
					game.saveConfig('skin',lib.config.skin);
					avatar.setBackground(player.name,'character');
				}
				img.src=lib.assetURL+'image/skin/'+player.name+'/'+num+'.jpg';
			},
			avatar2:function(){
				if(!lib.config.change_skin) return;
				if(this.parentNode.classList.contains('unseen2')) return;
                if(!this.parentNode.name2) return;
				var avatar=this;
				var player=this.parentNode;
				if(!this._doubleClicking){
					this._doubleClicking=true;
					setTimeout(function(){
						avatar._doubleClicking=false;
					},500);
					return;
				}
				var num=1;
				if(lib.config.skin[player.name2]){
					num=lib.config.skin[player.name2]+1;
				}
				var img=new Image();
				img.onload=function(){
					lib.config.skin[player.name2]=num;
					game.saveConfig('skin',lib.config.skin);
					avatar.style.backgroundImage='url("'+img.src+'")';
					if(lib.config.animation&&!lib.config.low_performance){
						player.$rare();
					}
				}
				img.onerror=function(){
					if(lib.config.skin[player.name2]){
						if(lib.config.animation&&!lib.config.low_performance){
							player.$rare();
						}
					}
					delete lib.config.skin[player.name2];
					game.saveConfig('skin',lib.config.skin);
					avatar.setBackground(player.name2,'character');
				}
				img.src=lib.assetURL+'image/skin/'+player.name2+'/'+num+'.jpg';
			},
			player:function(){
				return ui.click.target.apply(this,arguments);
			},
			target:function(e){
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(ui.intro) return;
                if(this.classList.contains('connect')){
                    if(game.online){
                        if(this.hasOwnProperty('roomindex')){
                            if(!_status.enteringroom){
                                _status.enteringroom=true;
                                game.send('server','enter',this.roomindex,lib.config.connect_nickname,lib.config.connect_avatar);
                            }
                        }
                        return;
                    }
                    if(this.playerid){
                        if(this.ws){
                            if(confirm('是否踢出'+this.nickname+'？')){
                                var id=get.id();
                                this.ws.send(function(id){
                                    if(game.ws){
                                        game.ws.close();
                                        game.saveConfig('reconnect_info');
                                        game.saveConfig('banned_info',id);
                                    }
                                },id);
                                lib.node.banned.push(id);
                            }
                        }
                    }
                    else{
                        this.classList.toggle('unselectable2')
                        if(this.classList.contains('unselectable2')){
                            lib.configOL.number--;
                        }
                        else{
                            lib.configOL.number++;
                        }
                        game.updateWaiting();
                    }
                    return;
                }
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.target){
					custom.replace.target(this,e);
					return;
				}
				if(this.classList.contains('selectable')==false) return;
				this.unprompt();
				if(this.classList.contains('selected')){
					ui.selected.targets.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
					}
					else{
						this.classList.remove('selected');
					}
				}
				else{
					ui.selected.targets.add(this);
					if(_status.event.name=='chooseToUse'){
						var targetprompt=null;
						if(_status.event.targetprompt){
							targetprompt=_status.event.targetprompt;
						}
						else if(_status.event.skill&&!get.info(_status.event.skill).viewAs){
							targetprompt=get.info(_status.event.skill).targetprompt;
						}
						else{
							var currentcard=get.card();
							if(currentcard){
								targetprompt=get.info(currentcard).targetprompt;
							}
						}
						if(targetprompt){
							if(Array.isArray(targetprompt)){
								targetprompt=targetprompt[Math.min(targetprompt.length-1,ui.selected.targets.indexOf(this))];
							}
							else if(typeof targetprompt=='function'){
								targetprompt=targetprompt(this);
							}
							if(targetprompt&&typeof targetprompt=='string'){
								this.prompt(targetprompt);
							}
						}
					}
					this.classList.add('selected');
				}
				if(custom.add.target){
					custom.add.target();
				}
				game.check();
			},
			control:function(){
				if(_status.dragged) return;
				if(ui.control.classList.contains('hidden')) return;
				var node=this.parentNode;
				if(node){
					if(node._doubleclick){
						return;
					}
					else{
						node._doubleclick=true;
						setTimeout(function(){
							node._doubleclick=false;
						},500);
					}
				}
				if(this.parentNode.classList.contains('hidden')) return;
				if(this.parentNode.classList.contains('removing')) return;
				if(ui.intro){
					ui.intro.close();
					delete ui.intro;
				}
				_status.clicked=true;
				if(this.parentNode.custom){
					this.parentNode.custom(this.link,this);
					return;
				}
				if(this.link=='ok'){
					ui.click.ok(this);
				}
				else if(this.link=='cancel'){
					ui.click.cancel(this);
				}
				else{
					_status.event.result={
						buttons:ui.selected.buttons.slice(0),
						cards:ui.selected.cards.slice(0),
						targets:ui.selected.targets.slice(0),
						control:this.link,
						links:get.links(ui.selected.buttons)
					};
					if(this.parentNode.close!=false){
						game.uncheck();
						this.parentNode.close();
					}
					game.resume();
				}
			},
			skill:function(skill){
				var info=get.info(skill);
				var event=_status.event;
				event.backup(skill);
				if(typeof event.skillDialog=='object'){
					event.skillDialog.close();
				}
				if(event.isMine()){
					event.skillDialog=true;
				}
				game.uncheck();
				game.check();
				if(event.skillDialog){
					var str=get.translation(skill);
					if(info.prompt){
						if(typeof info.prompt=='function'){
							str+='：'+info.prompt(event);
						}
						else{
							str+='：'+info.prompt;
						}
						event.skillDialog=ui.create.dialog(str);
					}
					else if(info.promptfunc){
						event.skillDialog=ui.create.dialog(str,'<div><div style="width:100%">'+info.promptfunc(event,event.player)+'</div></div>');
					}
					else if(lib.translate[skill+'_info']){
						event.skillDialog=ui.create.dialog(str,'<div><div style="width:100%">'+lib.translate[skill+'_info']+'</div></div>');
					}
				}
			},
			ok:function(node){
				var event=_status.event;
				if(event.custom.replace.confirm){
					event.custom.replace.confirm(true);return;
				}
				event.result={
					buttons:ui.selected.buttons.slice(0),
					cards:ui.selected.cards.slice(0),
					targets:ui.selected.targets.slice(0),
					confirm:'ok',
					bool:true,
					links:get.links(ui.selected.buttons)
				};
				if(node){
					node.parentNode.close();
				}
				if(event.skill){
					event.result.skill=event.skill;
					event.result.card=get.info(event.skill).viewAs;
					if(event.result.cards.length==1&&event.result.card){
						event.result.card.suit=event.result.cards[0].suit;
					}
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					event.restore();
				}
				if(ui.skills) ui.skills.close();
				if(ui.skills2) ui.skills2.close();
				if(ui.skills3) ui.skills3.close();
				game.uncheck();
				if(event.custom.add.confirm){
					event.custom.add.confirm(true);
				}
				game.resume();
			},
			cancel:function(node){
				var event=_status.event;
				if(event.custom.replace.confirm){
					event.custom.replace.confirm(false);return;
				}
				if(event.skill&&!event.norestore){
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(typeof event.dialog=='string'&&event.isMine()){
						event.dialog=ui.create.dialog(event.dialog);
					}
					event.restore();
					game.uncheck();
					game.check();
					return;
				}
				event.result={
					confirm:'cancel',
					bool:false
				};
				if(node){
					node.parentNode.close();
				}
				if(ui.skills) ui.skills.close();
				if(ui.skills2) ui.skills2.close();
				if(ui.skills3) ui.skills3.close();
				game.uncheck();
				if(event.custom.add.confirm){
					event.custom.add.confirm(true);
				}
				game.resume();
			},
			oldintro:function(e){
				if(_status.dragged) return;
				_status.clicked=true;
				if(this.classList.contains('player')&&!this.name){
					return;
				}
				var i,translation,intro,str;
				ui.click.intro2.call(this);
				game.pause2();
				ui.control.hide();
				ui.intro=get.nodeintro(this).open();
				ui.intro.source=this;
			},
			intro:function(e){
				if(_status.dragged) return;
				_status.clicked=true;
				if(this.classList.contains('player')&&!this.name){
					return;
				}
				var uiintro=get.nodeintro(this);
				uiintro.classList.add('popped');
				uiintro.classList.add('static');
				ui.window.appendChild(uiintro);
				var layer=ui.create.div('.poplayer',ui.window);
				var clicklayer=function(e){
					uiintro.delete();
					this.remove();
					if(!ui.arena.classList.contains('menupaused')) game.resume2();
					e.stopPropagation();
					return false;
				}
				layer.addEventListener(lib.config.touchscreen?'touchend':'click',clicklayer);
				if(!lib.config.touchscreen) layer.oncontextmenu=clicklayer;
				lib.placePoppedDialog(uiintro,e);
				uiintro.style.zIndex=21;

				var clickintro=function(){
					layer.remove();
					this.delete();
					if(!ui.arena.classList.contains('menupaused')) game.resume2();
				};
				uiintro.addEventListener('mouseleave',clickintro);
				uiintro.addEventListener('click',clickintro);

				game.pause2();
				return uiintro;
			},
			intro2:function(){
				if(ui.intro){
					ui.intro.close();
					if(ui.intro.source==this){
						delete ui.intro;
						ui.control.show();
						game.resume2();
						return;
					}
				}
			},
			auto:function(){
				if(ui.auto.classList.contains('hidden')) return;
				if(_status.paused2) return;
                ui.click.shortcut(false);
				if(!_status.auto){
					_status.auto=true;
					ui.auto.classList.add('glow');

                    if(_status.imchoosing&&_status.paused){
                        if(ui.confirm) ui.confirm.close();
    					ui.control.hide();
    					if(_status.event.switchToAuto){
    						_status.event.switchToAuto();
    					}
    					else{
    						if(_status.paused&&_status.imchoosing){
    							game.uncheck();
    							_status.event.redo();
    						}
    					}
    					game.resume();
                    }
                    else if(_status.event.switchToAuto){
                        _status.event.switchToAuto();
                    }

                    if(game.online){
                        game.send('auto');
                    }
				}
				else{
					ui.control.show();
					_status.auto=false;
					ui.auto.classList.remove('glow');

                    if(game.online){
                        game.send('unauto');
                    }
				}
			},
			wuxie:function(){
				if(this.classList.contains('hidden')) return;
				this.classList.toggle('glow');
				if(this.classList.contains('glow')&&_status.event.type=='wuxie'&&
                _status.event.isMine()&&ui.confirm&&_status.imchoosing){
					ui.click.cancel(ui.confirm.lastChild);
				}
			},
			tempnowuxie:function(){
				if(this.classList.contains('hidden')) return;
				this.classList.toggle('glow');
				if(this.classList.contains('glow')&&_status.event.type=='wuxie'&&
				_status.event.isMine()&&ui.confirm&&_status.imchoosing){
					ui.click.cancel(ui.confirm.lastChild);
				}
			},
			pause:function(){
				if(_status.paused2) return;
				if(_status.nopause) return;
				if(ui.pause.classList.contains('hidden')) return;
                if(!_status.gameStarted) return;
				ui.system.hide();
				game.pause2();
				var node=ui.create.pause().animate('start');
				ui.sidebar3.innerHTML='';
				if(lib.config.show_discardpile){
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var div=ui.create.div(ui.sidebar3);
						div.innerHTML=get.translation(ui.discardPile.childNodes[i]);
						ui.sidebar3.insertBefore(div,ui.sidebar3.firstChild);
					}
				}
				node.appendChild(ui.sidebar);
				node.appendChild(ui.sidebar3);
				ui.arena.classList.add('paused');
				if(game.onpause){
					game.onpause();
				}
			},
			resume:function(e){
				if(_status.pausing) return;
				if(_status.dragged) return;
				if(_status.clicked) return;
				this.delete();
				ui.system.show();
				ui.arena.classList.remove('paused');
				game.resume2();
				e.stopPropagation();
				if(game.onresume){
					game.onresume();
				}
				return false;
			},
			config:function(){
				if(_status.paused2) _status.config2=false;
				else _status.config2=true;

				_status.clicked=true;
				game.pause2();
				ui.click.configMenu();
				ui.system1.classList.remove('shown');
				ui.system2.classList.remove('shown');
			},
			config2:function(e){
				_status.clicked=true;
				ui.system.show();
				ui.arena.classList.remove('right');
				ui.arena.classList.remove('left');
				ui.arena.classList.remove('paused2');
				// ui.arena.classList.remove('paused');
				this.remove();
				if(ui.gameviewdialog){
					if(ui.gameviewdialog.popped){
						ui.gameviewdialog.popped.delete();
						delete ui.gameviewdialog.popped;
					}
					ui.gameviewdialog.close();
					delete ui.gameviewdialog;
					ui.currentgameview.classList.remove('thundertext');
				}
				ui.config.delete();
				if(_status.config2){
					game.resume2();
				}
				// e.stopPropagation();
				if(game.onresume2){
					game.onresume2();
				}
				return false;
			},
			swap:function(){
				if(_status.dragged) return;
				if(this.classList.contains('dead')) return;
				if(_status.over) return;
				if(ui.auto) ui.auto.show();
				if(ui.wuxie) ui.wuxie.show();
				game.swapPlayer(this);
			},
			mousewheel:function(evt){
				if(this.firstChild&&this.firstChild.classList.contains('handcards')&&
					!this.classList.contains('scrollh')) return;
				var node=this;
				var num=this._scrollnum||6;
				var speed=this._scrollspeed||16;
				clearInterval(node.interval);
				if(evt.detail > 0 || evt.wheelDelta < 0){
					node.interval=setInterval(function(){
						if(num--&&Math.abs(node.scrollLeft+node.clientWidth-node.scrollWidth)>0){
							node.scrollLeft +=speed;
						}
						else{
							clearInterval(node.interval);
						}
					},16);
				}
				else{
					node.interval=setInterval(function(){
						if(num--&&node.scrollLeft>0){
							node.scrollLeft -=speed;
						}
						else{
							clearInterval(node.interval);
						}
					},16);
				}
			},
			touchStart:function(e){
				this.startX=e.touches[0].clientX;
				this.startY=e.touches[0].clientY;
				_status.dragged=false;
			},
			dialogtouchStart:function(e){
				this.startX=e.touches[0].clientX;
				this.startY=e.touches[0].clientY;
				_status.dragged=false;
				_status.dialogtouched=true;
			},
			touchScroll:function(e) {
				if(_status.mousedragging) return;
				if(_status.draggingtouchdialog) return;
				if(!_status.dragged){
					if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
						Math.abs(e.touches[0].clientY - this.startY) > 10) {
						_status.dragged=true;
					}
				}
				if(this.scrollWidth<=this.offsetWidth+5&&
					this.scrollHeight<=this.offsetHeight+5){
					e.preventDefault();
				}
				else{
					delete _status._swipeorigin;
					e.stopPropagation();
				}
			},
            autoskill:function(bool,node){
                var list=lib.config.autoskilllist;
                if(bool){
                    list.remove(node.link);
                }
                else{
                    list.add(node.link);
                }
                game.saveConfig('autoskilllist',list);
            },
            rightplayer:function(e){
				if(this._nopup) return false;
				if(_status.clickedplayer){
					return false;
				}
				// if(this._mouseentercreated){
				// 	this._mouseentercreated=false;
				// 	ui.click.window();
				// }
				// else{
				// 	ui.click.intro.call(this,e);
				// }

				if(this._mouseenterdialog&&this._mouseenterdialog.parentNode){
					this._mouseenterdialog.delete();
				}
				else{
					ui.click.intro.call(this,e);
				}
				_status.clickedplayer=true;
				_status.clicked=false;
				ui.click.longpresscancel.call(this);
				return false;
			},
			right:function(){
				if(window.inSplash) return false;
				if(lib.config.touchscreen) return;
				if(_status.noright){
					_status.noright=false;
					return false;
				}
				if(_status.clickedplayer){
					_status.clickedplayer=false;
					return;
				}
				game.closePopped();
				switch(lib.config.right_click){
					case 'pause':ui.click.pause();break;
					case 'auto':ui.click.auto();break;
					case 'config':ui.click.config();break;
				}
				return false;
			}
		},
		selected:{
			buttons:[],cards:[],targets:[]
		},
		clear:function(){
			game.addVideo('uiClear');
			var thrown=document.getElementsByClassName('thrown');
			var nodes=[];
			var i;
			for(i=0;i<thrown.length;i++){
				nodes.push(thrown[i]);
			}
			for(i=0;i<nodes.length;i++){
				if(!nodes[i].fixed) nodes[i].delete();
			}
		},
		updatec:function(){
			if(_status.noupdatec) return;
			var length=0;
			var controls=[];
			var widths=[];
			for(var i=0;i<ui.control.childNodes.length;i++){
				if(ui.control.childNodes[i].classList.contains('removing')) continue;
				var thiswidth=parseInt(ui.control.childNodes[i].style.width);
				if(thiswidth){
					thiswidth+=8;
					length+=thiswidth;
					widths.push(thiswidth);
				}
				else{
					length+=ui.control.childNodes[i].offsetWidth;
					widths.push(ui.control.childNodes[i].offsetWidth);
				}
				controls.push(ui.control.childNodes[i]);
				if(i>0){
					if(lib.config.layout=='phone'){
						width+=12;
					}
					else{
						width+=6;
					}
				}
			}
			if(!controls.length) return;
			var offset=-length/2;
			var control=controls.shift();
			control.style.transform='translateX('+offset+'px)';
			while(controls.length){
				var control=controls.shift();
				var width=widths.shift();
				offset+=width+6;
				if(lib.config.layout=='phone'){
					offset+=6;
				}
				control.style.transform='translateX('+offset+'px)';
			}
		},
		updatex:function(){
			ui.update.apply(this,arguments);
			ui.updatehl();
			for(var i=0;i<lib.onresize.length;i++){
				lib.onresize[i]();
			}
		},
		updatehl:function(){
			if(!game.me) return;
			if(!ui.handcards1Container||!ui.handcards2Container) return;
			if(!ui.handcards1Container.childNodes.length) return;
			var hs1=[],hs2=[];
			for(var i=0;i<ui.handcards1Container.firstChild.childElementCount;i++){
				if(!ui.handcards1Container.firstChild.childNodes[i].classList.contains('removing')){
					hs1.push(ui.handcards1Container.firstChild.childNodes[i]);
				}
			}
			for(var i=0;i<ui.handcards2Container.firstChild.childElementCount;i++){
				if(!ui.handcards2Container.firstChild.childNodes[i].classList.contains('removing')){
					hs2.push(ui.handcards2Container.firstChild.childNodes[i]);
				}
			}
			var offset1,offset12=0;
			if(!lib.config.fold_card){
				offset1=112;
				ui.handcards1Container.classList.add('scrollh');
			}
			else{
				offset1=Math.min(112,(ui.handcards1Container.offsetWidth-128)/(hs1.length-1));
				if(offset1<32){
					offset1=32;
					ui.handcards1Container.classList.add('scrollh');
				}
				else{
					ui.handcards1Container.classList.remove('scrollh');
				}
			}
			if(offset1<100){
				offset12=100-offset1;
			}
			for(var i=0;i<hs1.length;i++){
				hs1[i].style.transform='translateX('+(i*offset1)+'px)';
				hs1[i]._transform='translateX('+(i*offset1)+'px)';
				ui.refresh(hs1[i]);
				hs1[i].classList.remove('drawinghidden');
				if(offset12>40){
					offset12=90-hs1[i].node.info.offsetWidth;
					hs1[i].node.info.querySelector('span').style.display='none';
					hs1[i].node.name.style.transform='translateY(16px)';
					hs1[i].node.info.style.transform='translateX(-'+offset12+'px) translateY(-3px)';
				}
				else{
					hs1[i].node.info.querySelector('span').style.display='';
					hs1[i].node.name.style.transform='';
					hs1[i].node.info.style.transform='translateX(-'+offset12+'px)';
				}
			}
			ui.handcards1Container.firstChild.style.width=(offset1*(hs1.length-1)+118)+'px';

			var offset2,offset22=0;
			if(!lib.config.fold_card){
				offset2=112;
				ui.handcards2Container.classList.add('scrollh');
			}
			else{
				offset2=Math.min(112,(ui.handcards2Container.offsetWidth-128)/(hs2.length-1));
				if(offset2<32){
					offset2=32;
					ui.handcards2Container.classList.add('scrollh');
				}
				else{
					ui.handcards2Container.classList.remove('scrollh');
				}
			}
			if(offset2<100){
				offset22=100-offset2;
			}
			for(var i=0;i<hs2.length;i++){
				hs2[i].style.transform='translateX('+(i*offset2)+'px)';
				hs2[i]._transform='translateX('+(i*offset2)+'px)';
				ui.refresh(hs2[i]);
				hs2[i].classList.remove('drawinghidden');
				if(offset22>40){
					offset22=90-hs2[i].node.info.offsetWidth;
					hs2[i].node.info.querySelector('span').style.display='none';
					hs2[i].node.name.style.transform='translateY(16px)';
					hs2[i].node.info.style.transform='translateX(-'+offset22+'px) translateY(-3px)';
				}
				else{
					hs2[i].node.info.querySelector('span').style.display='';
					hs2[i].node.name.style.transform='';
					hs2[i].node.info.style.transform='translateX(-'+offset22+'px)';
				}
			}
			ui.handcards2Container.firstChild.style.width=(offset2*(hs2.length-1)+118)+'px';
		},
		updateh:function(compute){
			if(!game.me) return;
			if(!ui.handcards1Container) return;
			if(lib.config.low_performance){
				if(compute){
					ui.updatehl();
					setTimeout(ui.updatehl,1000);
				}
				return;
			}
			if(compute){
				ui.handcards1Container._handcardsWidth=ui.handcards1Container.offsetWidth;
				ui.handcards2Container._handcardsWidth=ui.handcards2Container.offsetWidth;
			}
			ui.updatehx(game.me.node.handcards1);
			ui.updatehx(game.me.node.handcards2);
		},
		updatehx:function(node){
			var width=node.parentNode._handcardsWidth;
			var num=node.childElementCount-node.getElementsByClassName('removing').length;
			node.classList.remove('fold0');
			node.classList.remove('fold1');
			node.classList.remove('fold2');
			node.classList.remove('fold3');
			if(num*78+40>=width){
				// node.dataset.fold=3;
				node.classList.add('fold3');
			}
			else if(num*93+25>=width){
				// node.dataset.fold=2;
				node.classList.add('fold2');
			}
			else if(num*112+6>=width){
				// node.dataset.fold=1;
				node.classList.add('fold1');
			}
			else{
				// node.dataset.fold=0;
				node.classList.add('fold0');
			}
		},
		update:function(){
			for(var i=0;i<ui.updates.length;i++){
				ui.updates[i]();
			}
			if(ui.dialog&&!ui.dialog.classList.contains('noupdate')){
				if(lib.config.mode=='chess'){
					if(ui.dialog.content.scrollHeight<240&&(!ui.dialog.buttons||!ui.dialog.buttons.length)){
						ui.dialog.style.height=ui.dialog.content.offsetHeight+'px';
						ui.dialog.classList.add('slim');
					}
					else{
						ui.dialog.style.height='';
						ui.dialog.classList.remove('slim');
					}
				}
				else{
					if(!ui.dialog.buttons||!ui.dialog.buttons.length){
						ui.dialog.classList.add('nobutton');
						if(ui.dialog.content.offsetHeight<240){
							if(!ui.dialog._heightset){
								ui.dialog._heightset=ui.dialog.style.height||true;
							}
							ui.dialog.style.height=ui.dialog.content.offsetHeight+'px';
							if(lib.config.show_log!='off'){
								ui.dialog.classList.add('scroll1');
								ui.dialog.classList.add('scroll2');
								return;
							}
						}
						else{
							if(typeof ui.dialog._heightset=='string'){
								ui.dialog.style.height=ui.dialog._heightset;
							}
							else if(ui.dialog._heightset){
								ui.dialog.style.height='';
							}
							delete ui.dialog._heightset;
						}
					}
					else{
						if(typeof ui.dialog._heightset=='string'){
							ui.dialog.style.height=ui.dialog._heightset;
						}
						else if(ui.dialog._heightset){
							ui.dialog.style.height='';
						}
						delete ui.dialog._heightset;
						ui.dialog.classList.remove('nobutton');
					}
				}
				if(false&&lib.config.layout=='mobile'){
					ui.dialog.style.height='';
					if(ui.dialog.contentContainer.offsetHeight>=ui.dialog.content.offsetHeight){
						ui.dialog.style.height=ui.dialog.content.offsetHeight+'px';
					}
					else{
						ui.dialog.style.height='';
					}
					if(ui.dialog.content.offsetHeight<240){
						ui.dialog.classList.add('slim');
						ui.dialog.classList.remove('scroll1');
						ui.dialog.classList.remove('scroll2');
					}
					else{
						ui.dialog.classList.remove('slim');
						ui.dialog.classList.add('scroll1');
						ui.dialog.classList.add('scroll2');
					}
				}
				else{
					if(ui.dialog.content.offsetHeight<=240||
						ui.dialog.contentContainer.offsetHeight>=ui.dialog.content.offsetHeight){
						ui.dialog.classList.remove('scroll1');
						ui.dialog.classList.remove('scroll2');
					}
					else{
						ui.dialog.classList.add('scroll1');
						ui.dialog.classList.add('scroll2');
					}
				}
			}
		},
		recycle:function(node,key){
			if(!ui._recycle) ui._recycle={};
			if(typeof node=='string'){
				return ui._recycle[node]
			}
			ui._recycle[key]=node;
		},
	};
	var get={
        trimip:function(str){
            var len=str.length-5;
            if(str.lastIndexOf(':8080')==len){
                str=str.slice(0,len);
            }
            return str;
        },
        mode:function(){
            if(_status.connectMode){
                return lib.configOL.mode;
            }
            else{
                return lib.config.mode;
            }
        },
        idDialog:function(id){
            for(var i=0;i<ui.dialogs.length;i++){
                if(ui.dialogs[i].videoId==id){
                    return ui.dialogs[i];
                }
            }
            return null;
        },
        arenaState:function(){
            var state={
                number:ui.arena.dataset.number,
                players:{},
            };
            for(var i in lib.playerOL){
                state.players[i]=lib.playerOL[i].getState();
            }
            return state;
        },
        id:function(){
            return (Math.floor(1000000000+9000000000*Math.random())).toString();
        },
		zhu:function(player,skill){
			if(typeof player=='string'){
				skill=player;
				player=null;
			}
            var mode=get.mode();
			if(mode=='identity'){
				if(skill&&!game.zhu.get('s').contains(skill)) return null;
				if(game.zhu.isZhu) return game.zhu;
			}
			else if(mode=='versus'&&_status.mode=='four'){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isZhu){
						if(skill&&!(game.players[i].get('s').contains(skill))) continue;
						if(!player||player.side==game.players[i].side){
							return game.players[i];
						}
					}
				}
			}
			return null;
		},
		config:function(item){
			if(!lib.config.mode_config[lib.config.mode]) return;
			return lib.config.mode_config[lib.config.mode][item];
		},
		coinCoeff:function(list){
			var num=0;
			for(var i=0;i<list.length;i++){
				var rank=get.rank(list[i]);
				switch(rank){
					case 'sp':return 0.1;
					case 's':num+=0.4;break;
					case 'ap':num+=0.6;break;
					case 'a':num+=0.8;break;
					case 'am':num+=0.95;break;
					case 'bp':num+=1.05;break;
					case 'b':num+=1.2;break;
					case 'bm':num+=1.4;break;
					case 'c':num+=1.6;break;
					case 'd':num+=1.8;break;
				}
			}
			return num/list.length;
		},
		rank:function(name){
			if(name==_status.lord) return 'ap';
			var rank=lib.rank;
			if(rank.s.contains(name)) return 's';
			if(rank.ap.contains(name)) return 'ap';
			if(rank.a.contains(name)) return 'a';
			if(rank.am.contains(name)) return 'am';
			if(rank.bp.contains(name)) return 'bp';
			if(rank.b.contains(name)) return 'b';
			if(rank.bm.contains(name)) return 'bm';
			if(rank.c.contains(name)) return 'c';
			if(rank.d.contains(name)) return 'd';
			if(lib.customCharacters.contains(name)) return 's';
			if(lib.characterPack.boss&&lib.characterPack.boss[name]) return 'sp';
			return 'x';
		},
		cardInfo:function(card){
			return [card.suit,card.number,card.name,card.nature];
		},
		cardsInfo:function(cards){
			var info=[];
			for(var i=0;i<cards.length;i++){
				info.push(get.cardInfo(cards[i]));
			}
			return info;
		},
		infoCard:function(info){
			var card=ui.create.card();
			if(info[0]){
				card.init(info);
			}
			return card;
		},
		infoCards:function(info){
			var cards=[];
			for(var i=0;i<info.length;i++){
				cards.push(get.infoCard(info[i]));
			}
			return cards;
		},
        cardInfoOL:function(card){
            return '_noname_card:'+JSON.stringify([card.cardid,card.suit,card.number,card.name,card.nature]);
        },
        infoCardOL:function(info){
            if(!lib.cardOL) return info;
            var card;
            try{
                var info=JSON.parse(info.slice(13));
                var id=info.shift();
                if(!id){
                    card=ui.create.card().init(info);
                }
                else if(lib.cardOL[id]){
                    if(lib.cardOL[id].name!=info[2]){
                        lib.cardOL[id].init(info);
                    }
                    card=lib.cardOL[id];
                }
                else if(game.online){
                    card=ui.create.card().init(info);
                    lib.cardOL[id]=card;
                    card.cardid=id;
                }
            }
            catch(e){
                console.log(e);
            }
            return card||info;
        },
        cardsInfoOL:function(cards){
            var info=[];
            for(var i=0;i<cards.length;i++){
                info.push(get.cardInfoOL(cards[i]));
            }
            return info;
        },
        infoCardsOL:function(info){
            var cards=[];
            for(var i=0;i<info.length;i++){
                cards.push(get.infoCardOL(info[i]));
            }
            return cards;
        },
        playerInfoOL:function(player){
            return '_noname_player:'+player.playerid;
        },
        infoPlayerOL:function(info){
            if(!lib.playerOL) return info
            return lib.playerOL[info.slice(15)]||info;
        },
        playersInfoOL:function(players){
            var info=[];
            for(var i=0;i<players.length;i++){
                info.push(get.playerInfoOL(players[i]));
            }
            return info;
        },
        infoPlayersOL:function(info){
            var players=[];
            for(var i=0;i<info.length;i++){
                players.push(get.infoPlayerOL(info[i]));
            }
            return players;
        },
        funcInfoOL:function(func){
            if(typeof func=='function'){
                if(func._filter_args){
                    return '_noname_func:'+JSON.stringify(get.stringifiedResult(func._filter_args,3));
                }
                return '_noname_func:'+func.toString();
            }
            return '';
        },
        infoFuncOL:function(info){
            var func;
            try{
                eval('func=('+info.slice(13)+');');
            }
            catch(e){
                return function(){};
            }
            if(Array.isArray(func)){
                func=get.filter.apply(this,get.parsedResult(func));
            }
            return func;
        },
        stringifiedResult:function(item,level){
            if(!item) return item;
            if(typeof item=='function'){
                return get.funcInfoOL(item);
            }
            else if(typeof item=='object'){
                switch(get.itemtype(item)){
                    case 'card': return get.cardInfoOL(item);
                    case 'cards': return get.cardsInfoOL(item);
                    case 'player': return get.playerInfoOL(item);
                    case 'players': return get.playersInfoOL(item);
                    default:
                    if(typeof level!='number'){
                        level=5;
                    }
                    if(Array.isArray(item)){
                        if(level==0){
                            return [];
                        }
                        var item2=[];
                        for(var i=0;i<item.length;i++){
                            item2.push(get.stringifiedResult(item[i],level-1));
                        }
                        return item2;
                    }
                    else if(Object.prototype.toString.call(item)=='[object Object]'){
                        if(level==0){
                            return {};
                        }
                        var item2={};
                        for(var i in item){
                            item2[i]=get.stringifiedResult(item[i],level-1);
                        }
                        return item2;
                    }
                    else{
                        return {};
                    }
                }
            }
            else{
                return item;
            }
        },
        parsedResult:function(item){
            if(!item) return item;
            if(typeof item=='string'){
                if(item.indexOf('_noname_func:')==0){
                    return get.infoFuncOL(item);
                }
                else if(item.indexOf('_noname_card:')==0){
                    return get.infoCardOL(item);
                }
                else if(item.indexOf('_noname_player:')==0){
                    return get.infoPlayerOL(item);
                }
                else{
                    return item;
                }
            }
            else if(Array.isArray(item)){
                var item2=[];
                for(var i=0;i<item.length;i++){
                    item2.push(get.parsedResult(item[i]));
                }
                return item2;
            }
            else if(typeof item=='object'){
                var item2={};
                for(var i in item){
                    item2[i]=get.parsedResult(item[i]);
                }
                return item2;
            }
            else{
                return item;
            }
        },
		verticalStr:function(str,sp){
			if(typeof str!='string') return '';
			str=str.toUpperCase();
			var str2='';
			for(var i=0;i<str.length;i++){
				str2+=str[i];
				if(sp&&str[i]=='S'&&str[i+1]=='P') continue;
				if(i<str.length-1){
					str2+='<br>';
				}
			}
			return str2;
		},
		slimName:function(str){
			var str2=lib.translate[str];
			if(!str2) return '';
			if(str2.indexOf('sp')==0){
				str2=str2.slice(2);
			}
			else if(str2.indexOf('界sp')==0){
				str2=str2.slice(3);
			}
			return get.verticalStr(str2,true);
		},
		time:function(){
			if(lib.status.dateDelaying){
				return lib.getUTC(lib.status.dateDelaying)-lib.getUTC(lib.status.date)-lib.status.dateDelayed;
			}
			else{
				return lib.getUTC(new Date())-lib.getUTC(lib.status.date)-lib.status.dateDelayed;
			}
		},
		currentTime:function(){
			return lib.getUTC(new Date());
		},
		evtDistance:function(e1,e2){
			return Math.sqrt((e1.x-e2.x)*(e1.x-e2.x)+(e1.y-e2.y)*(e1.y-e2.y));
		},
		xyDistance:function(from,to){
			return Math.sqrt((from[0]-to[0])*(from[0]-to[0])+(from[1]-to[1])*(from[1]-to[1]));
		},
		skillLocked:function(skill){
			var info=lib.skill[skill];
			if(info.locked==false) return false;
			if(info.trigger&&info.forced) return true;
			if(info.mod) return true;
			if(info.locked) return true;
			return false;
		},
		itemtype:function(obj){
			var i,j;
			if(typeof obj=='string'){
				if(obj.length<=3){
					for(i=0;i<obj.length;i++){
						if(/h|e|j/.test(obj[i])==false) return;
					}
					return 'position';
				}
				if(lib.nature.contains(obj)) return 'nature';
			}
			if(get.objtype(obj)=='array'&&obj.length){

				var isPlayers=true;
				for(i=0;i<obj.length;i++){
					if(get.itemtype(obj[i])!='player') {isPlayers=false;break;}
				}
				if(isPlayers) return 'players';

				var isCards=true;
				for(i=0;i<obj.length;i++){
					if(get.itemtype(obj[i])!='card') {isCards=false;break;}
				}
				if(isCards) return 'cards';

				if(obj.length==2){
					if(typeof obj[0]=='number'&&typeof obj[1]=='number'){
						if(obj[0]<=obj[1]) return 'select';
					}
				}

				if(obj.length==4){
					var isPosition=true;
					for(i=0;i<obj.length;i++){
						if(typeof obj[i]!='number') {isPosition=false;break;}
					}
					if(isPosition) return 'divposition';
				}
			}
			if(get.objtype(obj)=='div'){
				if(obj.classList.contains('button')) return 'button';
				if(obj.classList.contains('card')) return 'card';
				if(obj.classList.contains('player')) return 'player';
				if(obj.classList.contains('dialog')) return 'dialog';
			}
		},
		equipNum:function(card){
			if(get.type(card)=='equip'){
				return parseInt(get.subtype(card)[5]);
			}
			return 0;
		},
		objtype:function(obj){
            if(Object.prototype.toString.call(obj) === '[object Array]') return 'array';
			if(Object.prototype.toString.call(obj) === '[object Object]') return 'object';
			if(Object.prototype.toString.call(obj) === '[object HTMLDivElement]') return 'div';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableElement]') return 'table';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableRowElement]') return 'tr';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableCellElement]') return 'td';
			if(Object.prototype.toString.call(obj) === '[object HTMLBodyElement]') return 'td';
		},
		type:function(obj,method){
			if(typeof obj=='string') obj={name:obj};
			if(typeof obj!='object') return;
			if(!lib.card[obj.name]) return;
			if(method=='trick'&&lib.card[obj.name].type=='delay') return 'trick';
			return lib.card[obj.name].type;
		},
		subtype:function(obj){
			if(!lib.card[obj.name]) return;
			return lib.card[obj.name].subtype;
		},
		suit:function(card){
			if(get.itemtype(card)=='cards'){
				var suit=get.suit(card[0])
				for(var i=1;i<card.length;i++){
					if(get.suit(card[i])!=suit) return 'none';
				}
				return suit;
			}
			else{
				if(get.owner(card)){
					return game.checkMod(card,card.suit,'suit',get.owner(card).get('s'));
				}
				return card.suit;
			}
		},
		color:function(card){
			if(get.itemtype(card)=='cards'){
				var color=get.color(card[0])
				for(var i=1;i<card.length;i++){
					if(get.color(card[i])!=color) return 'none';
				}
				return color;
			}
			else{
				if(get.suit(card)=='spade'||get.suit(card)=='club') return 'black';
				if(get.suit(card)=='heart'||get.suit(card)=='diamond') return 'red';
				return 'none';
			}
		},
		number:function(card){
			return card.number;
		},
		nature:function(card){
			return card.nature;
		},
		cards:function(num){
			var list=[];
			var card=false;
			if(typeof num!='number') num=1;
			if(num==0) {card=true;num=1;}
			if(num<0) num=1;
			while(num--){
				if(ui.cardPile.hasChildNodes()==false){
					if(_status.maxShuffle!=undefined){
						if(_status.maxShuffle==0){
							game.over('平局');
							return;
						}
						_status.maxShuffle--;
					}
					var cards=[],i;
					for(var i=0;i<lib.onwash.length;i++){
						lib.onwash[i]();
					}
					for(i=0;i<ui.discardPile.childNodes.length;i++){
						if(get.info(ui.discardPile.childNodes[i]).vanish) continue;
						cards.push(ui.discardPile.childNodes[i]);
					}
					cards.randomSort();
					for(var i=0;i<cards.length;i++){
						ui.cardPile.appendChild(cards[i]);
					}
				}
				if(ui.cardPile.hasChildNodes()==false){
					game.over('平局');
					return;
				}
				list.push(ui.cardPile.removeChild(ui.cardPile.firstChild));
			}
			if(card) return list[0];
			return list;
		},
		judge:function(card){
			if(card.viewAs) return lib.card[card.viewAs].judge;
			return get.info(card).judge;
		},
		distance:function(from,to,method){
			if(from==to) return 0;
			if(!game.players.contains(from)&&!game.dead.contains(from)) return Infinity;
			if(!game.players.contains(to)&&!game.dead.contains(to)) return Infinity;
			var player=from,m,n=1,i;
			var fxy,txy;
			if(lib.config.mode=='chess'){
				fxy=from.getXY();
				txy=to.getXY();
				n=Math.abs(fxy[0]-txy[0])+Math.abs(fxy[1]-txy[1]);
				if(method=='raw'||method=='pure'||method=='absolute') return n;
			}
			else if(to.isMin(true)||from.isMin(true)){
				if(method=='raw'||method=='pure'||method=='absolute') return 1;
			}
			else{
				var length=game.players.length;
				var totalPopulation=game.players.length+game.dead.length+1;
				for(var iwhile=0;iwhile<totalPopulation;iwhile++){
					if(player.nextSeat!=to){
						player=player.nextSeat;
						if(player.isAlive()&&!player.isOut()&&!player.isMin(true)) n++;
					}
					else{
						break;
					}
				}
				for(i=0;i<game.players.length;i++){
					if(game.players[i].isOut()||game.players[i].isMin(true)) length--;
				}
				if(method=='absolute') return n;
				if(from.isDead()) length++;
				if(to.isDead()) length++;
				n=Math.min(n,length-n);
				if(method=='raw'||method=='pure') return n;
			}

			n=game.checkMod(from,to,n,'globalFrom',from.get('s'));
			n=game.checkMod(from,to,n,'globalTo',to.get('s'));
			m=n;
			m=game.checkMod(from,to,m,'attackFrom',from.get('s'));
			m=game.checkMod(from,to,m,'attackTo',to.get('s'));
			var equips1=from.get('e'),equips2=to.get('e');
			for(i=0;i<equips1.length;i++){
				var info=get.info(equips1[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					m+=info.globalFrom;
					n+=info.globalFrom;
				}
				if(info.attackFrom){
					m+=info.attackFrom;
				}
			}
			for(i=0;i<equips2.length;i++){
				var info=get.info(equips2[i]).distance;
				if(!info) continue;
				if(info.globalTo){
					m+=info.globalTo;
					n+=info.globalTo;
				}
				if(info.attaclTo){
					m+=info.attaclTo;
				}
			}
			if(method=='attack') return m;
			return n;
		},
		attackRange:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalFrom',player.get('s'));
			range=game.checkMod(player,player,range,'attackFrom',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					range+=info.globalFrom;
				}
				if(info.attackFrom){
					range+=info.attackFrom;
				}
			}
			return (1-range);
		},
		globalFrom:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalFrom',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					range+=info.globalFrom;
				}
			}
			return (-range);
		},
		globalTo:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalTo',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalTo){
					range+=info.globalTo;
				}
			}
			return (range);
		},
		info:function(item){
			if(typeof item=='string'){
				return lib.skill[item];
			}
			if(typeof item=='object'){
				return lib.card[item.name];
			}
		},
		select:function(select){
			if(typeof select=='number') return [select,select];
			if(get.itemtype(select)=='select') return select;
			if(typeof select=='function') return get.select(select());
			return [1,1]
		},
		card:function(){
			if(_status.event.skill){
				var card=get.info(_status.event.skill).viewAs;
				if(card) return card;
			}
			return ui.selected.cards[0];
		},
		player:function(){
			return _status.event.player;
		},
		players:function(sort,dead){
			var players=game.players.slice(0);
			if(sort!=false){
				if(typeof sort=='function'){
					players.sort(sort);
				}
				else{
					if(get.itemtype(sort)!='player') lib.tempSortSeat=_status.event.player;
					else lib.tempSortSeat=sort;
					players.sort(lib.sort.seat);
					delete lib.tempSortSeat;
					lib.temp={};
				}
			}
			if(dead) players=players.concat(game.dead);
			return players;
		},
		position:function(card){
			if(get.itemtype(card)=='player') return parseInt(card.dataset.position);
			if(card.timeout&&card.destiny){
				if(card.destiny.classList.contains('equips')) return 'e';
				if(card.destiny.classList.contains('judges')) return 'j';
				if(card.destiny.classList.contains('handcards')) return 'h';
				if(card.destiny.id=='discardPile') return 'd';
				if(card.destiny.id=='special') return 's';
				return;
			}
			if(!card.parentNode) return;
			if(card.parentNode.classList.contains('equips')) return 'e';
			if(card.parentNode.classList.contains('judges')) return 'j';
			if(card.parentNode.classList.contains('handcards')) return 'h';
			if(card.parentNode.id=='discardPile') return 'd';
			if(card.parentNode.id=='special') return 's';
		},
		translation:function(str,arg){
			if(str&&typeof str=='object'&&str.name){
				var str2;
				if(arg=='viewAs'&&str.viewAs){
					str2=get.translation(str.viewAs);
				}
				else{
					str2=get.translation(str.name);
				}
				if(str2=='杀'){
					if(str.nature=='fire'){
						str2='火'+str2;
					}
					else if(str.nature=='thunder'){
						str2='雷'+str2;
					}
				}
				if(get.itemtype(str)=='card'&&str.suit&&str.number){
					str2+='【'+get.translation(str.suit)+str.number+'】'
				}
				return str2;
			}
			if(get.itemtype(str)=='cards'||get.itemtype(str)=='players'){
				var str2=get.translation(str[0],arg);
				for(var i=1;i<str.length;i++){
					str2+='、'+get.translation(str[i],arg);
				}
				return str2;
			}
			return lib.translate[str]||str;
		},
		cnNumber:function(num,two){
			if(num==Infinity) return '∞';
			if(typeof num!='number') return num;
			if(num<0||num>99) return num;
			if(num<=10){
				switch(num){
					case 0:return '〇';
					case 1:return '一';
					case 2:return two?'二':'两';
					case 3:return '三';
					case 4:return '四';
					case 5:return '五';
					case 6:return '六';
					case 7:return '七';
					case 8:return '八';
					case 9:return '九';
					case 10:return '十';
				}
			}
			if(num<20){
				return '十'+get.cnNumber(num-10,true);
			}
			var x=Math.floor(num/10);
			return get.cnNumber(x,true)+'十'+(num>10*x?get.cnNumber(num-10*x,true):'');
		},
		selectableButtons:function(sort){
			if(!_status.event.player) return[];
			var buttons=_status.event.dialog.buttons;
			var selectable=[];
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].classList.contains('selectable')&&
					buttons[i].classList.contains('selected')==false){
					selectable.push(buttons[i]);
				}
			}
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		selectableCards:function(sort){
			if(!_status.event.player) return[];
			var cards=_status.event.player.get('hej');
			var selectable=[];
			for(var i=0;i<cards.length;i++){
				if(cards[i].classList.contains('selectable')&&
					cards[i].classList.contains('selected')==false){
					selectable.push(cards[i]);
				}
			}
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		skills:function(){
			var skills=[];
			if(ui.skills){
				skills=skills.concat(ui.skills.skills);
			}
			if(ui.skills2){
				skills=skills.concat(ui.skills2.skills);
			}
			if(ui.skills3){
				skills=skills.concat(ui.skills3.skills);
			}
			return skills;
		},
		selectableTargets:function(sort){
			var selectable=[];
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].classList.contains('selectable')&&
					game.players[i].classList.contains('selected')==false){
					selectable.push(game.players[i]);
				}
			}
			selectable.randomSort();
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		filter:function(filter,i){
			if(typeof filter=='function') return filter;
			if(i==undefined) i=0;
			var result=function(){
				if(filter==arguments[i]) return true;
				for(var j in filter){
					if(filter.hasOwnProperty(j)){
						if(get.itemtype(arguments[i])=='card'){
							if(j=='type'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.type(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.type(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='subtype'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.subtype(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.subtype(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='color'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.color(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.color(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='suit'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.suit(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.suit(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='number'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.number(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.number(arguments[i])!=filter[j]) return false;
								}
							}
							else if(typeof filter[j]=='object'){
								if(filter[j].contains(arguments[i][j])==false) return false;
							}
							else if(typeof filter[j]=='string'){
								if(arguments[i][j]!=filter[j]) return false;
							}
						}
						else{
							if(arguments[i][j]!=filter[j]) return false;
						}
					}
				}
				return true;
			}
            result._filter_args=[filter,i];
            return result;
		},
		cardCount:function(card,player){
			var num;
			if(card==true){
				num=0;
				var stat=player.getStat('card');
				for(var i in stat){
					if(typeof stat[i]=='number') num+=stat[i];
				}
				return num;
			}
			if(player==undefined) player=_status.event.player;
			if(typeof card=='object'){
				card=card.name;
			}
			num=player.getStat('card')[card];
			if(num==undefined) return 0;
			return num;
		},
		skillCount:function(skill,player){
			if(player==undefined) player=_status.event.player;
			var num=player.getStat('skill')[skill];
			if(num==undefined) return 0;
			return num;
		},
		owner:function(card){
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].get('hej').contains(card)||game.players[i].judging[0]==card)
					return game.players[i];
			}
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].using&&game.players[i].using.contains(card))
					return game.players[i];
			}
		},
		noSelected:function(){
			return (ui.selected.buttons.length+ui.selected.cards.length+ui.selected.targets.length==0)
		},
		population:function(identity){
			if(identity==undefined) return game.players.length+game.dead.length;
			var i;
			var num=0;
			for(i=0;i<game.players.length;i++){
				if(game.players[i].identity==identity) num++;
			}
			return num;
		},
		totalPopulation:function(identity){
			if(identity==undefined) return game.players.length+game.dead.length;
			var i,players=game.players.concat(game.dead);
			var num=0;
			for(i=0;i<players.length;i++){
				if(players[i].identity==identity) num++;
			}
			return num;
		},
		tag:function(item,tag,item2){
			var result;
			if(get.info(item)&&get.info(item).ai&&get.info(item).ai.tag){
				result=get.info(item).ai.tag[tag];
			}
			if(typeof result=='function') return result(item,item2);
			return result;
		},
		sortCard:function(sort){
			var func;
			if(sort=='type_sort'){
				func=function(card){
					if(get.type(card)=='basic') return 2;
					if(get.type(card)=='stonecard') return -0.5;
					if(get.type(card)=='hsmengjing') return 0.5;
					if(get.type(card)=='hsbaowu') return 0.5;
					if(get.type(card)=='hsshenqi') return 0.5;
					if(get.type(card)=='stonecharacter') return 1;
					if(get.type(card)=='chess') return 1.5;
					if(get.type(card)=='trick') return -1;
					if(get.type(card)=='delay') return -2;
					if(get.type(card)=='equip') return -3;
					return -4;
				}
			}
			else if(sort=='suit_sort'){
				func=function(card){
					if(get.suit(card)=='heart') return 2;
					if(get.suit(card)=='diamond') return 1;
					if(get.suit(card)=='spade') return -1;
					if(get.suit(card)=='club') return -2;
				}
			}
			else if(sort=='number_sort'){
				func=function(card){
					return get.number(card)-7+0.5;
				}
			}
			return func;
		},
		difficulty:function(){
			switch(get.config('difficulty')){
				case 'easy':return 1;
				case 'normal':return 2;
				case 'hard':return 3;
				default: return 1;
			}
		},
		cardPile:function(name){
			var card;
			for(var i=0;i<ui.cardPile.childNodes.length;i++){
				card=ui.cardPile.childNodes[i];
				if(typeof name=='string'){
					if(card.name==name){
						return card;
					}
				}
				else if(typeof name=='function'){
					if(name(card)){
						return card;
					}
				}
			}
			for(var i=0;i<ui.discardPile.childNodes.length;i++){
				card=ui.discardPile.childNodes[i];
				if(typeof name=='string'){
					if(card.name==name){
						return card;
					}
				}
				else if(typeof name=='function'){
					if(name(card)){
						return card;
					}
				}
			}
			return null;
		},
		aiStrategy:function(){
			switch(get.config('ai_strategy')){
				case 'ai_strategy_1':return 1;
				case 'ai_strategy_2':return 2;
				case 'ai_strategy_3':return 3;
				case 'ai_strategy_4':return 4;
				case 'ai_strategy_5':return 5;
				case 'ai_strategy_6':return 6;
				default: return 1;
			}
		},
		skillintro:function(name,learn,learn2){
			var str='';
			var infoitem=lib.character[name];
			if(!infoitem){
				for(var itemx in lib.characterPack){
					if(lib.characterPack[itemx][name]){
						infoitem=lib.characterPack[itemx][name];break;
					}
				}
			}
			var skills=infoitem[3];
			var opacity;
			for(var i=0;i<skills.length;i++){
				if(lib.translate[skills[i]]&&lib.translate[skills[i]+'_info']&&lib.skill[skills[i]]){
					if(learn&&lib.skill[skills[i]].unique&&(learn2||!lib.skill[skills[i]].gainable)){
						opacity='opacity:0.5';
					}
					else{
						opacity='';
					}
					var skilltrans=get.translation(skills[i]);
					if(skilltrans&&skilltrans.length==3&&skilltrans[0]=='新'){
						skilltrans=skilltrans.slice(1);
					}
					else{
						skilltrans=skilltrans.slice(0,2);
					}
					str+='<div class="skill" style="'+opacity+
					'">【'+skilltrans+'】</div><div style="'+opacity+'">'+
					lib.translate[skills[i]+'_info']+'</div><div style="display:block;height:10px"></div>';
				}
			}
			return str;
		},
		intro:function(name){
			var info=lib.character[name];
			var str='性别：'+get.translation(info[0])+'<br/>';
			str+='势力：'+get.translation(info[1])+'<br/>';
			str+='体力：'+get.translation(info[2])+'<br/>';
			str+='技能：';
			if(info[3].length){
				str+=get.translation(info[3][0]);
				for(var i=1;i<info[3].length;i++){
					str+='、'+get.translation(info[3][i]);
				}
			}
			return str;
		},
		storageintro:function(type,content,player,dialog){
			switch(type){
				case 'mark':{
					if(content>0){
						return '共有'+content+'个标记';
					}
					return false;
				}
				case 'turn':{
					if(content>0){
						return '还剩'+content+'个回合';
					}
					return false;
				}
				case 'time':{
					if(content>0){
						return '还剩'+content+'次';
					}
					return false;
				}
				case 'limited':{
					if(content){
						return '已发动';
					}
					return '未发动';
				}
				case 'cardCount':{
					if(typeof content=='object'&&typeof content.length=='number'){
						return '共有'+get.cnNumber(content.length)+'张牌';
					}
					return false;
				}
				case 'card':case 'cards':{
					if(get.itemtype(content)=='card'){
						content=[content];
					}
					if(dialog&&get.itemtype(content)=='cards'){
						if(content.length>6&&!dialog._hovercustomed){
							dialog.addSmall(content);
						}
						else{
							dialog.add(content);
						}
					}
					else{
						if(content&&content.length){
							return get.translation(content);
						}
					}
					return false;
				}
				case 'player':case 'players':{
					if(get.itemtype(content)=='player'){
						content=[content];
					}
					if(dialog&&get.itemtype(content)=='players'){
						if(content.length>6&&!dialog._hovercustomed){
							dialog.addSmall(content);
						}
						else{
							dialog.add(content);
						}
						return false;
					}
					else{
						if(content&&content.length){
							return get.translation(content);
						}
						return false;
					}
					break;
				}
				default:{
					if(typeof type=='string'){
						return type.replace(/#/g,content);
					}
					else if(typeof type=='function'){
						return type(content,player);
					}
					return false;
				}
			}
		},
		nodeintro:function(node,simple){
			var uiintro=ui.create.dialog('hidden','notouchscroll');
			if(node.classList.contains('player')&&!node.name){
				return uiintro;
			}
			var i,translation,intro,str;
			if(typeof node._customintro=='function'){
				node._customintro(uiintro);
			}
			else if(Array.isArray(node._customintro)){
				var caption=node._customintro[0];
				var content=node._customintro[1];
				if(typeof caption=='function'){
					caption=caption(node);
				}
				if(typeof content=='function'){
					content=content(node);
				}
				uiintro.add(caption);
				uiintro.add('<div class="text center" style="padding-bottom:5px">'+content+'</div>');
			}
			else if(node.classList.contains('player')){
				var capt=get.translation(node.name);
				if(lib.character[node.name]&&lib.character[node.name][1]){
					capt+='&nbsp;&nbsp;'+lib.translate[lib.character[node.name][1]];
				}
				uiintro.add(capt);
				var skills=node.skills;
				var skills2=game.filterSkills(node.skills,node);
				for(i=0;i<skills.length;i++){
					if(lib.skill[skills[i]]&&lib.skill[skills[i]].nopop) continue;
					if(lib.translate[skills[i]+'_info']){
						translation=get.translation(skills[i]);
						if(translation.length==3&&translation[0]=='新'){
							translation=translation.slice(1);
						}
						else{
							translation=translation.slice(0,2);
						}
						if(!skills2.contains(skills[i])){
							uiintro.add('<div style="opacity:0.5"><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
						}
						else{
							uiintro.add('<div><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
						}
					}
				}
				var forbidden=node.forbiddenSkills;
				for(i=0;i<forbidden.length;i++){
					if(lib.translate[forbidden[i]+'_info']){
						translation=get.translation(forbidden[i]).slice(0,2);
						uiintro.add('<div><div class="skill">『'+translation+'』</div><div>'+'已禁用'+'</div></div>');
					}
				}

                if(lib.config.show_favourite&&lib.character[node.name]){
                    var addFavourite=ui.create.div('.text.center');
                    addFavourite.link=node.link;
                    if(lib.config.favouriteCharacter.contains(node.name)){
                        addFavourite.innerHTML='移除收藏';
                    }
                    else{
                        addFavourite.innerHTML='添加收藏';
                    }
                    addFavourite.listen(ui.click.favouriteCharacter)
                    uiintro.add(addFavourite);
                }

				if(!simple||lib.config.touchscreen){
					var storage=node.storage;
					for(i in storage){
						if(get.info(i)&&get.info(i).intro){
							intro=get.info(i).intro;
							if(node.get('s').concat(lib.skill.global).contains(i)==false&&!intro.show) continue;
							var name=intro.name?intro.name:get.translation(i);
							if(typeof name=='function'){
								name=name(storage[i],node);
							}
							translation='<div><div class="skill">『'+name[0]+name[1]+'』</div><div>';
							var stint=get.storageintro(intro.content,storage[i],node);
							if(stint){
								translation+=stint+'</div></div>';
								uiintro.add(translation);
							}
						}
					}
					var js=node.get('j');
					for(var i=0;i<js.length;i++){
						var name=lib.translate[js[i].viewAs||js[i].name];
						translation='<div><div class="skill">『'+name[0]+name[1]+'』</div><div>'+
						lib.translate[(js[i].viewAs||js[i].name)+'_info']+'</div></div>';
						uiintro.add(translation);
					}
					if(lib.falseitem){
						uiintro.add(ui.create.div('.placeholder'));
						var table,tr,td;
						table=document.createElement('table');
						tr=document.createElement('tr');
						table.appendChild(tr);
						td=document.createElement('td');
						td.innerHTML='攻击范围';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='进攻距离';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='防御距离';
						tr.appendChild(td);

						tr=document.createElement('tr');
						table.appendChild(tr);
						td=document.createElement('td');
						td.innerHTML=get.attackRange(node);
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML=get.globalFrom(node);
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML=get.globalTo(node);
						tr.appendChild(td);

						uiintro.content.appendChild(table);
					}

					if(lib.config.change_skin&&(
						!node.classList.contains('unseen')||!node.classList.contains('unseen2')
					)){
						var num=1;
						var introadded=false;
						var loadImage=function(avatar2){
							var img=new Image();
							img.onload=function(){
								num++;
								loadImage(avatar2);
							}
							img.onerror=function(){
								num--;
								if(num){
									if(!introadded){
										introadded=true;
										uiintro.add('<div class="text center">更改皮肤</div>');
									}
									var buttons=ui.create.div('.buttons.smallzoom');
									for(var i=0;i<=num;i++){
										var button=ui.create.div('.button.character',buttons,function(){
											if(this._link){
												if(avatar2){
													lib.config.skin[node.name2]=this._link;
													node.node.avatar2.style.backgroundImage=this.style.backgroundImage;
												}
												else{
													lib.config.skin[node.name]=this._link;
													node.node.avatar.style.backgroundImage=this.style.backgroundImage;
												}
												game.saveConfig('skin',lib.config.skin);
											}
											else{
												if(avatar2){
													delete lib.config.skin[node.name2];
													node.node.avatar2.setBackground(node.name2,'character');
												}
												else{
													delete lib.config.skin[node.name];
													node.node.avatar.setBackground(node.name,'character');
												}
												game.saveConfig('skin',lib.config.skin);
											}
										});
										button._link=i;
										if(i){
											button.setBackgroundImage('image/skin/'+(avatar2?node.name2:node.name)+'/'+i+'.jpg');
										}
										else{
											button.setBackgroundImage('image/character/'+(avatar2?node.name2:node.name)+'.jpg');
										}
									}
									uiintro.add(buttons);
								}
								if(!avatar2){
									if(!node.classList.contains('unseen2')&&node.name2){
										num=1;
										loadImage(true);
									}
								}
							}
							img.src=lib.assetURL+'image/skin/'+(avatar2?node.name2:node.name)+'/'+num+'.jpg';
						}
						if(!node.classList.contains('unseen')){
							loadImage();
						}
					}
				}

				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('mark')&&node.info&&
				node.parentNode&&node.parentNode.parentNode&&node.parentNode.parentNode.classList.contains('player')){
				var info=node.info;
				var player=node.parentNode.parentNode;
				if(info.name){
					if(typeof info.name=='function'){
						var named=info.name(player.storage[node.skill],player);
						if(named){
							uiintro.add(named);
						}
					}
					else{
						uiintro.add(info.name);
					}
				}
				else if(info.name!==false){
					uiintro.add(get.translation(node.skill));
				}
				if(typeof info.mark=='function'){
					var stint=info.mark(uiintro,player.storage[node.skill],player);
					if(stint){
						if(stint.length<=100){
							uiintro.add('<div class="text center">'+stint+'</div>');
						}
						else{
							uiintro.add('<div class="text">'+stint+'</div>');
						}
					}
				}
				else{
					var stint=get.storageintro(info.content,player.storage[node.skill],player,uiintro);
					if(stint){
						if(stint[0]=='$'){
							uiintro.add('<div class="caption">'+stint.slice(1)+'</div>');
						}
						else if(stint.length<=100){
							uiintro.add('<div class="text center">'+stint+'</div>');
						}
						else{
							uiintro.add('<div class="text">'+stint+'</div>');
						}
					}
				}
				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('card')){
				var name=node.name;
				if(get.position(node)=='j'&&node.viewAs&&node.viewAs!=name){
					uiintro.add(get.translation(node.viewAs)+'（'+get.translation(node)+'）');
					name=node.viewAs;
				}
				else{
					uiintro.add(get.translation(node));
				}
				if(node.name=='muniu'&&get.position(node)=='e'){
					var num=0;
					if(node.cards){
						num=node.cards.length;
					}
					if(get.owner(node)==game.me&&num){
						uiintro.add(node.cards,true,num>4);
					}
					else{
						uiintro.add('<div class="text center">'+'共有'+get.cnNumber(num)+'张牌'+'</div>');
					}
				}
				else if(node.name=='lianyaohu'&&get.position(node)=='e'){
					var num=0;
					if(node.storage.shouna){
						num=node.storage.shouna.length;
					}
					if(num){
						uiintro.add(node.storage.shouna,true,num>4);
					}
					else{
						uiintro.add('<div class="text center">炼妖壶内没有牌</div>');
					}
				}
				else if(lib.translate[name+'_info']){
					if(get.subtype(node)=='equip1'){
						var added=false;
						if(lib.card[node.name]&&lib.card[node.name].distance){
							var dist=lib.card[node.name].distance;
							if(dist.attackFrom){
								added=true;
								uiintro.add('<div class="text center">攻击范围：'+(-dist.attackFrom+1)+'</div>');
							}
						}
						if(!added){
							uiintro.add('<div class="text center">攻击范围：1</div>');
						}
					}
					else if(lib.card[name]&&lib.card[name].addinfomenu){
						uiintro.add('<div class="text center">'+lib.card[name].addinfomenu+'</div>');
					}
                    uiintro._place_text=uiintro.add('<div class="text" style="display:inline">'+lib.translate[name+'_info']+'</div>');
				}
				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('character')){
				var character=node.link;
				uiintro.add(get.translation(character));
				var infoitem=lib.character[character];
				if(!infoitem){
					for(var itemx in lib.characterPack){
						if(lib.characterPack[itemx][character]){
							infoitem=lib.characterPack[itemx][character];break;
						}
					}
				}
				var skills=infoitem[3];
				for(i=0;i<skills.length;i++){
					if(lib.translate[skills[i]+'_info']){
						translation=get.translation(skills[i]);
						if(translation.length==3&&translation[0]=='新'){
							translation=translation.slice(1);
						}
						else{
							translation=translation.slice(0,2);
						}
						uiintro.add('<div><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
					}
				}
                if((node.parentNode.classList.contains('menu-buttons')||lib.config.show_favourite)&&lib.character[node.link]){
                    var addFavourite=ui.create.div('.text.center');
                    addFavourite.link=node.link;
                    addFavourite.style.marginBottom='15px';
                    if(lib.config.favouriteCharacter.contains(node.link)){
                        addFavourite.innerHTML='移除收藏';
                    }
                    else{
                        addFavourite.innerHTML='添加收藏';
                    }
                    addFavourite.listen(ui.click.favouriteCharacter)
                    uiintro.add(addFavourite);
                }
                else{
                    uiintro.add(ui.create.div('.placeholder.slim'));
                }
			}
			else if(node.classList.contains('identity')&&node.dataset.career){
				var career=node.dataset.career;
				uiintro.add(get.translation(career));
				uiintro.add('<div class="text center" style="padding-bottom:5px">'+lib.translate['_'+career+'_skill_info']+'</div>');
			}
			else if(node.classList.contains('skillbar')){
				if(node==ui.friendBar){
					uiintro.add('友方怒气值');
					uiintro.add('<div class="text center" style="padding-bottom:5px">'+_status.friendRage+'/100</div>');
				}
				else if(node==ui.enemyBar){
					uiintro.add('敌方怒气值');
					uiintro.add('<div class="text center" style="padding-bottom:5px">'+_status.enemyRage+'/100</div>');
				}
			}
            if(lib.config.touchscreen){
                lib.setScroll(uiintro.contentContainer);
            }
            return uiintro;
		},
		groups:function(){
			return ['wei','shu','wu','qun'];
		},
		types:function(){
			var types=[];
			for(var i in lib.card){
				if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
				if(lib.card[i].forbid&&lib.card[i].forbid.contains(lib.config.mode)) continue;
				if(lib.card[i].type){
					if(lib.card[i].type=='delay') types.add('trick');
					else types.add(lib.card[i].type);
				}
			}
			return types;
		},
		links:function(buttons){
			var links=[];
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].link!=undefined) links.push(buttons[i].link);
			}
			return links;
		}
	};
	var ai={
		basic:{
			chooseButton:function(check){
				var event=_status.event;
				var i,j,range,buttons,buttons2;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectButton);
					if(range[1]==-1){
						j=0;
						for(i=0;i<ui.selected.buttons.length;i++){
							j+=check(ui.selected.buttons[i]);
						}
						return (j>0);
					}
					lib.temp={};
					buttons=get.selectableButtons();
					if(buttons.length==0){
						return ok;
					}
					buttons2=buttons.slice(0);
					var ix=0;
					var checkix=check(buttons[0],buttons2);
					for(i=1;i<buttons.length;i++){
						var checkixtmp=check(buttons[i],buttons2);
						if(checkixtmp>checkix){
							ix=i;
							checkix=checkixtmp;
						}
					}
					// buttons.sort(function(a,b){
					// 	return check(b,buttons2)-check(a,buttons2);
					// });
					if(check(buttons[ix])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					buttons[ix].classList.add('selected');
					ui.selected.buttons.add(buttons[ix]);
					game.check();
					if(ui.selected.buttons.length>=range[0]){
						ok=true;
					}
					if(ui.selected.buttons.length==range[1]){
						return true;
					}
				}
			},
			chooseCard:function(check){
				var event=_status.event;
				if(event.filterCard==undefined) return (check()>0);
				var i,j,range,cards,cards2,skills,check,effect;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectCard);
					if(ui.selected.cards.length>=range[0]){
						ok=true;
					}
					if(range[1]==-1){
						if(ui.selected.cards.length==0) return true;
						j=0;
						for(i=0;i<ui.selected.cards.length;i++){
							effect=check(ui.selected.cards[i]);
							if(effect<0) j-=Math.sqrt(-effect);
							else j+=Math.sqrt(effect);
						}
						return (j>0);
					}
					lib.temp={};
					cards=get.selectableCards();
					if(!_status.event.player._noSkill){
						cards=cards.concat(get.skills());
					}
					if(cards.length==0){
						return ok;
					}
					cards2=cards.slice(0);
					// cards.sort(function(a,b){
					// 	return (check(b,cards2)-check(a,cards2));
					// });
					var ix=0;
					var checkix=check(cards[0],cards2);
					for(i=1;i<cards.length;i++){
						var checkixtmp=check(cards[i],cards2);
						if(checkixtmp>checkix){
							ix=i;
							checkix=checkixtmp;
						}
					}
					if(check(cards[ix])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					if(typeof cards[ix]=='string'){
						ui.click.skill(cards[ix]);
						var info=get.info(event.skill);
						if(info.filterCard){
							check=info.check||ai.get.unuseful2;
							return (ai.basic.chooseCard(check));
						}
						else{
							return true;
						}
					}
					else{
						cards[ix].classList.add('selected');
						ui.selected.cards.add(cards[ix]);
						game.check();
						if(ui.selected.cards.length>=range[ix]){
							ok=true;
						}
						if(ui.selected.cards.length==range[1]){
							return true;
						}
					}
				}
			},
			chooseTarget:function(check){
				var event=_status.event;
				if(event.filterTarget==undefined) return (check()>0);
				var i,j,range,targets,targets2,effect;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectTarget);
					if(range[1]==-1){
						j=0;
						for(i=0;i<ui.selected.targets.length;i++){
							effect=check(ui.selected.targets[i]);
							if(effect<0) j-=Math.sqrt(-effect);
							else j+=Math.sqrt(effect);
						}
						return (j>0);
					}
					else if(range[1]==0){
						return check()>0
					}
					lib.temp={};
					targets=get.selectableTargets();
					if(targets.length==0){
						return ok;
					}
					targets2=targets.slice(0);
					// targets.sort(function(a,b){
					// 	return check(b)-check(a);
					// });
					var ix=0;
					var checkix=check(targets[0],targets2);
					for(i=1;i<targets.length;i++){
						var checkixtmp=check(targets[i],targets2);
						if(checkixtmp>checkix){
							ix=i;
							checkix=checkixtmp;
						}
					}
					if(check(targets[ix])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					targets[ix].classList.add('selected');
					ui.selected.targets.add(targets[ix]);
					game.check();
					if(ui.selected.targets.length>=range[0]){
						ok=true;
					}
					if(ui.selected.targets.length==range[1]){
						return true;
					}
				}
			}
		},
		get:{
			useful:function(card){
				if(get.position(card)=='j') return -1;
				if(get.position(card)=='e') return ai.get.equipValue(card);
				if(lib.temp[card.name]==undefined) lib.temp[card.name]=[card];
				else lib.temp[card.name].add(card);
				var i=lib.temp[card.name].find(card);
				var aii=get.info(card).ai;
				var useful;
				if(aii&&aii.useful) useful=aii.useful;
				else if(aii&&aii.basic) useful=aii.basic.useful;
				if(useful==undefined) return -1;
				if(typeof useful=='function'){
					return useful(card,i);
				}
				if(typeof useful=='number') return useful;
				if(i<useful.length){
					return useful[i];
				}
				return useful[useful.length-1];
			},
			unuseful:function(card){
				return -ai.get.useful(card);
			},
			unuseful2:function(card){
				return 10-ai.get.useful(card);
			},
			value:function(card,player,method){
				var aii=get.info(card).ai;
				var value;
				if(aii&&aii.value) value=aii.value;
				else if(aii&&aii.basic) value=aii.basic.value;
				if(value==undefined) return 0;
				if(player==undefined||get.itemtype(player)!='player') player=_status.event.player;
				if(typeof value=='function') return value(card,player);
				if(typeof value=='number') return value;
				if(get.objtype(value)=='array'){
					if(method=='raw') return value[0];
					var num=0,i;
					var cards=player.get('h');
					for(i=0;i<cards.length;i++){
						if(cards[i].name==card.name&&
							cards[i]!=card&&
							cards[i].classList.contains('selected')==false) num++;
					}
					if(num<value.length) return value[num];
					return value[value.length-1];
				}
				return 0;
			},
			equipValue:function(card,player){
				if(player==undefined||get.itemtype(player)!='player') player=get.owner(card);
				if(player==undefined||get.itemtype(player)!='player') player=_status.event.player;
				var info=get.info(card);
				if(!info.ai) return 0;
				var value=info.ai.equipValue;
				if(value==undefined){
					if(info.ai.basic&&info.ai.basic.equipValue!=undefined){
						value=info.ai.basic.equipValue;
					}
					else return 0;
				}
				if(typeof value=='number') return value;
				if(typeof value=='function') return value(card,player);
				return 0;
			},
			disvalue:function(card,player){
				return -ai.get.value(card,player);
			},
			skillthreaten:function(skill,player,target){
				if(!lib.skill[skill]) return 1;
				if(!lib.skill[skill].ai) return 1;
				var threaten=lib.skill[skill].ai.threaten;
				if(typeof threaten=='number') return threaten;
				if(typeof threaten=='function'){
					player=player||_status.event.player;
					target=target||player;
					return threaten(player,target);
				}
				return 1;
			},
			order:function(item){
				var aii=get.info(item).ai;
				var order;
				if(aii&&aii.order) order=aii.order;
				else if(aii&&aii.basic) order=aii.basic.order;
				if(order==undefined) return -1;
				if(typeof(order)=='function'){
					return order(item,_status.event.player);
				}
				return order;
			},
			result:function(item){
				var result;
				if(get.info(item).ai) result=get.info(item).ai.result;
				if(result==undefined) return {};
				if(typeof(result)=='function') return result(item);
				return result;
			},
			effect:function(target,card,player,player2){
				var event=_status.event;
				if(player==undefined) player=_status.event.player;
				if(typeof card!='string'&&(typeof card!='object'||!card.name)){
					if(event.skill&&get.info(event.skill).viewAs==undefined) card=_status.event.skill;
					else card=get.card();
				}
				var result=ai.get.result(card);
				var result1=result.player,result2=result.target;
				if(typeof result1=='function') result1=result1(player,target,card);
				if(typeof result2=='function') result2=result2(player,target,card);
				if(typeof result1!='number') result1=0;
				if(typeof result2!='number') result2=0;
				var temp1,temp2,temp3,temp01=0,temp02=0,threaten=1;
				var skills1=player.get('s').concat(lib.skill.global);
				game.expandSkills(skills1);
				var zerotarget=false,zeroplayer=false;
				for(var i=0;i<skills1.length;i++){
					temp1=get.info(skills1[i]).ai;
					if(temp1&&typeof temp1.effect=='object'&&typeof temp1.effect.player=='function'){
						temp1=temp1.effect.player(card,player,target,result1);
					}
					else temp1=undefined;
					if(typeof temp1=='object'){
						if(temp1.length==2||temp1.length==4){
							result1*=temp1[0];
							temp01+=temp1[1];
						}
						if(temp1.length==4){
							result2*=temp1[2];
							temp02+=temp1[3];
						}
					}
					else if(typeof temp1=='number'){
						result1*=temp1;
					}
					else if(temp1=='zeroplayer'){
						zeroplayer=true;
					}
					else if(temp1=='zerotarget'){
						zerotarget=true;
					}
					else if(temp1=='zeroplayertarget'){
						zeroplayer=true;
						zerotarget=true;
					}
				}
				if(target){
					var skills2=target.get('s').concat(lib.skill.global);
					game.expandSkills(skills2);
					for(var i=0;i<skills2.length;i++){
						temp2=get.info(skills2[i]).ai;
						if(temp2&&temp2.threaten) temp3=temp2.threaten;
						else temp3=undefined;
						if(temp2&&typeof temp2.effect=='function'){
							temp2=temp2.effect(card,player,target,result2);
						}
						else if(temp2&&typeof temp2.effect=='object'&&typeof temp2.effect.target=='function'){
							temp2=temp2.effect.target(card,player,target,result2);
						}
						else temp2=undefined;
						if(typeof temp2=='object'){
							if(temp2.length==2||temp2.length==4){
								result2*=temp2[0];
								temp02+=temp2[1];
							}
							if(temp2.length==4){
								result1*=temp2[2];
								temp01+=temp2[3];
							}
						}
						else if(typeof temp2=='number'){
							result2*=temp2;
						}
						else if(temp2=='zeroplayer'){
							zeroplayer=true;
						}
						else if(temp2=='zerotarget'){
							zerotarget=true;
						}
						else if(temp2=='zeroplayertarget'){
							zeroplayer=true;
							zerotarget=true;
						}
						if(typeof temp3=='function'&&temp3(player,target)!=undefined){
							threaten*=temp3(player,target);
						}
						else if(typeof temp3=='object'){
							if(typeof temp3.target=='number'){
								threaten*=temp3;
							}
							else if(typeof temp3.target=='function'&&temp3(player,target)!=undefined){
								threaten*=temp3(player,target);
							}
						}
						else if(typeof temp3=='number'){
							threaten*=temp3;
						}
					}
					result2+=temp02;
					result1+=temp01;
					if(ai.get.attitude(player,target)<0){
						result2*=threaten;
					}
					else{
						result2*=Math.sqrt(threaten);
					}
					if(target.hp<=1) result2*=2;
					if(target.hp==2) result2*=1.1;
					if(target.num('h')==0){
						result2*=1.1;
						if(get.tag(card,'respondSha')||get.tag(card,'respondShan')) result2*=1.4;
					}
					if(target.num('h')==1) result2*=1.05;
					if(target.num('h')==2) result2*=1.02;
					if(target.num('h')>3) result2*=0.9;
					if(target.hp==4) result2*=0.9;
					if(target.hp==5) result2*=0.8;
					if(target.hp>5) result2*=0.6;
				}
				else{
					result2+=temp02;
					result1+=temp01;
				}
				if(zeroplayer) result1=0;
				if(zerotarget) result2=0;
				if(player2){
					return (result1*ai.get.attitude(player2,player)+(target?result2*ai.get.attitude(player2,target):0));
				}
				return (result1*ai.get.attitude(player,player)+(target?result2*ai.get.attitude(player,target):0));
			},
			damageEffect:function(target,player,viewer,nature){
				if(!player){
					player=target;
				}
				if(!viewer){
					viewer=target;
				}
				var name='damage';
				if(nature=='fire'){
					name='firedamage';
				}
				else if(nature=='thunder'){
					name='thunderdamage';
				}
				return ai.get.effect(target,{name:name},player,viewer);
			},
			recoverEffect:function(target,player,viewer){
				if(target.hp==target.maxHp) return 0;
				if(!player){
					player=target;
				}
				if(!viewer){
					viewer=target;
				}
				return ai.get.effect(target,{name:'recover'},player,viewer);
			},
			buttonValue:function(button){
				var card=button.link;
				var player=get.owner(card);
				if(!player) player=_status.event.player;
				if(player.get('j').contains(card)){
					var efff=ai.get.effect(player,card,player,player);
					if(efff>0) return 0.5;
					if(efff==0) return 0;
					return -1.5;
				}
				if(player.get('e').contains(card)){
					return ai.get.equipValue(card)/3;
				}
				var nh=player.num('h');
				switch(nh){
					case 1:return 2;
					case 2:return 1.6;
					case 3:return 1;
					case 4:return 0.8;
					case 5:return 0.6;
					default:return 0.4;
				}
			},
			attitude2:function(to){
				return ai.get.attitude(_status.event.player,to);
			},
			players:function(range,sort){
				var players=[];
				if(range.max==undefined) range.max=Infinity;
				if(range.min==undefined) range.min=-Infinity;
				if(range.player==undefined) range.player=_status.event.player;
				for(var i=0;i<game.players.length;i++){
					if(ai.get.attitude(range.player,game.players[i])<=range.max&&
						ai.get.attitude(range.player,game.players[i])>=range.min){
						players.push(game.players[i]);
					}
				}
				if(sort) players.sort(sort);
				return players;
			}
		},
	};
	lib.init.init();
		HTMLDivElement.prototype.animate=function(name,time){
			this.classList.add(name);
			var that=this;
			setTimeout(function(){
				that.classList.remove(name);
			},time||1000);
			return this;
		};
		HTMLDivElement.prototype.hide=function(){
			this.classList.add('hidden');
			return this;
		};
		HTMLDivElement.prototype.unfocus=function(){
			this.classList.add('transparent');
			return this;
		};
		HTMLDivElement.prototype.refocus=function(){
			this.classList.remove('transparent');
			return this;
		};
		HTMLDivElement.prototype.show=function(){
			this.classList.remove('hidden');
			return this;
		};
		HTMLDivElement.prototype.delete=function(time){
			if(this.timeout){
				clearTimeout(this.timeout);
				delete this.timeout;
			}
			if(!this._listeningEnd||this._transitionEnded){
				if(typeof time!='number') time=500;
				this.classList.add('removing');
				var that=this;
				this.timeout=setTimeout(function(){
					that.remove();
					that.classList.remove('removing');
				},time);
			}
			else{
				this._onEndDelete=true;
			}
			return this;
		};
		HTMLDivElement.prototype.goto=function(position,time){
			if(this.timeout){
				clearTimeout(this.timeout);
				delete this.timeout;
			}

			if(typeof time!='number') time=500;
			this.classList.add('removing');

			var that=this;
			this.timeout=setTimeout(function(){
				position.appendChild(that);
				that.classList.remove('removing');
				delete that.destiny;
			},time);
			this.destiny=position;
			return this;
		};
		HTMLDivElement.prototype.fix=function(){
			clearTimeout(this.timeout);
			delete this.timeout;
			delete this.destiny;
			this.classList.remove('removing');
			return this;
		};
		HTMLDivElement.prototype.setBackground=function(name,type,ext,subfolder){
			var src;
			ext=ext||'.jpg';
			subfolder=subfolder||'default'
			if(type){
				var dbimage=null;
				if(type=='character'&&lib.character[name]&&lib.character[name][4]){
					for(var i=0;i<lib.character[name][4].length;i++){
						if(lib.character[name][4][i].indexOf('db:')==0){
							dbimage=lib.character[name][4][i];break;
						}
					}
				}
				if(dbimage){
					this.setBackgroundDB(dbimage.slice(3));
					return this;
				}
				else if(type=='character'&&lib.customCharacters.contains(name)){
					src="";
					var node=this;
					game.getDB('image','character:'+name,function(src){
						node.style.backgroundImage="url('"+src+"')";
					});
				}
				else if(type=='character'&&lib.config.skin[name]){
					src='image/skin/'+name+'/'+lib.config.skin[name]+ext;
				}
				else{
					if(type=='character'){
						src='image/character/'+name+ext;
					}
					else{
						src='image/'+type+'/'+subfolder+'/'+name+ext;
					}
				}
			}
			else{
				src='image/'+name+ext;
			}
			this.setBackgroundImage(src);
			this.style.backgroundSize="cover";
			return this;
		};
		HTMLDivElement.prototype.setBackgroundDB=function(img){
			var node=this;
			game.getDB('image',img,function(src){
				node.style.backgroundImage="url('"+src+"')";
				node.style.backgroundSize="cover";
			});
		};
		HTMLDivElement.prototype.setBackgroundImage=function(img){
			this.style.backgroundImage='url("'+lib.assetURL+img+'")';
		},
		HTMLDivElement.prototype.listen=function(func){
			this.addEventListener(lib.config.touchscreen?'touchend':'click',function(e){
				if(_status.dragged) return;
				func.call(this,e);
			})
			return this;
		};
		HTMLDivElement.prototype.setPosition=function(){
			var position;
			if(arguments.length==4){
				position=[];
				for(var i=0;i<arguments.length;i++) position.push(arguments[i]);
			}
			else if(arguments.length==1&&get.objtype(arguments[0])=='array'&&arguments[0].length==4){
				position=arguments[0];
			}
			else{
				return this;
			}
			var top='calc('+position[0]+'% ';
			if(position[1]>0) top+='+ '+position[1]+'px)';
			else top+='- '+Math.abs(position[1])+'px)';
			var left='calc('+position[2]+'% ';
			if(position[3]>0) left+='+ '+position[3]+'px)';
			else left+='- '+Math.abs(position[3])+'px)';
			this.style.top=top;
			this.style.left=left;
			return this;
		};
		HTMLDivElement.prototype.css=function(style){
			for(var i in style){
				if(i=='innerHTML'){
					this.innerHTML=style[i];
				}
				else{
					this.style[i]=style[i];
				}
			}
			return this;
		};
		HTMLDivElement.prototype.transform=function(transform){
			var str='';
			for(var i in transform){
				switch(i){
					case 'scale':str+='scale('+transform[i]+') ';break;
					case 'rotate':str+='rotate('+transform[i]+'deg) ';break;
				}
			}
			if(typeof transform=='object'){
				if(transform.left&&transform.top){
					str+='translate('+parseInt(transform.left)+'px,'+parseInt(transform.top)+'px) ';
				}
				else if(transform.left){
					str+='translate('+parseInt(transform.left)+'px) ';
				}
				else if(transform.top){
					str+='translate(0,'+parseInt(transform.top)+'px) ';
				}
			}
			this.style.transform=str;
			return this;
		};
		HTMLTableElement.prototype.get=function(row,col){
			if(row<this.childNodes.length){
				return this.childNodes[row].childNodes[col];
			}
		};
		Array.prototype.find=function(item){
			return this.indexOf(item);
		};
		Array.prototype.contains=function(item){
			return this.indexOf(item)!=-1;
		};
		Array.prototype.add=function(){
			for(var i=0;i<arguments.length;i++){
				if(this.contains(arguments[i])){
					return false;
				}
				this.push(arguments[i]);
			}
			return this;
		};
		Array.prototype.remove=function(item){
			if(get.objtype(item)=='array'){
				for(var i=0;i<item.length;i++) this.remove(item[i]);
				return;
			}
			var pos=this.find(item);
			if(pos==-1){
				return false;
			}
			this.splice(pos,1);
			return this;
		};
		Array.prototype.randomGet=function(){
			var arr=this.slice(0);
			for(var i=0;i<arguments.length;i++) arr.remove(arguments[i]);
			return arr[Math.floor(Math.random()*arr.length)];
		};
		Array.prototype.randomRemove=function(num){
            if(typeof num=='number'){
                var list=[];
                for(var i=0;i<num;i++){
                    if(this.length){
                        list.push(this.randomRemove());
                    }
                    else{
                        break;
                    }
                }
                return list;
            }
            else{
    			return this.splice(Math.floor(Math.random()*this.length),1)[0];
            }
		};
		Array.prototype.randomSort=function(){
			var list=[];
			while(this.length){
				list.push(this.randomRemove());
			}
			for(var i=0;i<list.length;i++){
				this.push(list[i]);
			}
			return this;
		};
		Array.prototype.randomGets=function(num){
			if(num>this.length){
				num=this.length;
			}
			var arr=this.slice(0);
			var list=[];
			for(var i=0;i<num;i++){
				list.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
			}
			return list;
		};
		window.countGroups=function(){
			var a=0,b=0,c=0,d=0;
			var sa=0,sb=0,sc=0,sd=0;
			for(var i in lib.character){
				switch(lib.character[i][1]){
					case 'wei':a++;if(lib.config.forbidsingle.contains(i)) sa++;break;
					case 'shu':b++;if(lib.config.forbidsingle.contains(i)) sb++;break;
					case 'wu':c++;if(lib.config.forbidsingle.contains(i)) sc++;break;
					case 'qun':d++;if(lib.config.forbidsingle.contains(i)) sd++;break;
				}
			}
			console.log('魏：'+(a-sa)+'/'+a);
			console.log('蜀：'+(b-sb)+'/'+b);
			console.log('吴：'+(c-sc)+'/'+c);
			console.log('群：'+(d-sd)+'/'+d);
			return ((a+b+c+d)-(sa+sb+sc+sd))+'/'+(a+b+c+d);
		}
		window.countSkills=function(){
			for(var i in lib.skill){
			if(lib.translate[i+'_info']){
			console.log(lib.translate[i],lib.translate[i+'_info'])
			}
			}
		}
		window.countCards=function(){
			var a=0,b=0,c=0,d=0;
			var aa=0,bb=0,cc=0,dd=0;
			var sa=0,sb=0,sc=0,sd=0;
			var sha=0,shan=0,tao=0,jiu=0,wuxie=0,heisha=0,hongsha=0;
			var num={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0};
			for(var i in lib.card){
				if(typeof lib.card[i]=='object'){
					switch(lib.card[i].type){
						case 'basic':a++;break;
						case 'trick':b++;break;
						case 'equip':c++;break;
						default:d++;break;
					}
				}
			}
			for(var i=0;i<lib.card.list.length;i++){
				if(typeof lib.card[lib.card.list[i][2]]=='object'){
					switch(lib.card[lib.card.list[i][2]].type){
						case 'basic':aa++;break;
						case 'trick':case 'delay':bb++;break;
						case 'equip':cc++;break;
						default:dd++;break;
					}
					switch(lib.card.list[i][0]){
						case 'heart':sa++;break;
						case 'diamond':sb++;break;
						case 'club':sc++;break;
						case 'spade':sd++;break;
					}
					if(lib.card.list[i][2]=='sha'){
						sha++;
						if(lib.card.list[i][0]=='club'||lib.card.list[i][0]=='spade'){
							heisha++;
						}
						else{
							hongsha++;
						}
					}
					if(lib.card.list[i][2]=='shan'){
						shan++;
					}
					if(lib.card.list[i][2]=='tao'){
						tao++;
					}
					if(lib.card.list[i][2]=='jiu'){
						jiu++;
					}
					if(lib.card.list[i][2]=='wuxie'){
						wuxie++;
					}
					num[lib.card.list[i][1]]++;
				}
			}
			var str='基本牌'+aa+'； '+'锦囊牌'+bb+'； '+'装备牌'+cc+'； '+'其它牌'+dd
			console.log(str);
			str='红桃牌'+sa+'； '+'方片牌'+sb+'； '+'梅花牌'+sc+'； '+'黑桃牌'+sd
			console.log(str);
			str='杀'+sha+'； '+'黑杀'+heisha+'； '+'红杀'+hongsha+'； '+'闪'+shan+'； '+'桃'+tao+'； '+'酒'+jiu+'； '+'无懈'+wuxie
			console.log(str);
			for(var i=1;i<=13;i++){
				if(i<10){
					console.log(i+' ',num[i]);
				}
				else{
					console.log(i,num[i]);
				}
			}
			return aa+bb+cc+dd;
		}
		window.onkeydown=function(e){
			if(!ui.menuContainer||!ui.menuContainer.classList.contains('hidden')) return;
			game.closePopped();
			var dialogs=document.querySelectorAll('#window>.dialog.popped:not(.static)');
			for(var i=0;i<dialogs.length;i++){
				dialogs[i].delete();
			}
			if(e.keyCode==32){
				var node=ui.window.querySelector('#paused');
				if(node){
					node.click();
				}
				else{
					ui.click.pause();
				}
			}
			else if(e.keyCode==65){
				if(ui.auto) ui.auto.click();
			}
			else if(e.keyCode==87){
				if(ui.wuxie&&ui.wuxie.style.display!='none'){
					ui.wuxie.classList.toggle('glow')
				}
				else if(ui.tempnowuxie){
					ui.tempnowuxie.classList.toggle('glow')
				}
			}
			else if(e.keyCode==73){
				// if(game.showIdentity){
				// 	game.showIdentity();
				// }
			}
			else if(e.keyCode==67){
				var node=ui.window.querySelector('#click');
				if(node){
					node.click();
				}
				else{
					ui.click.config();
				}
			}
			else if(e.keyCode==116||((e.ctrlKey||e.metaKey)&&e.keyCode==82)){
				if(e.shiftKey){
					if(confirm('是否重置游戏？')){
						var noname_inited=localStorage.getItem('noname_inited');
		                localStorage.clear();
						if(noname_inited){
							localStorage.setItem('noname_inited',noname_inited);
						}
						if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
						game.reload();
						return;
					}
				}
				else{
					game.reload();
				}
			}
		};
		window.onload=function(){
			if(_status.packLoaded){
				delete _status.packLoaded;
				lib.init.onload();
			}
			else{
				_status.windowLoaded=true;
			}
		};
		if(!lib.config.touchscreen){
			document.onmousewheel=ui.click.windowmousewheel;
			document.onmousemove=ui.click.windowmousemove;
			document.onmousedown=ui.click.windowmousedown;
			document.onmouseup=ui.click.windowmouseup;
			document.oncontextmenu=ui.click.right;
		}
		else{
			document.ontouchstart=ui.click.windowtouchstart;
			document.ontouchend=ui.click.windowtouchend;
			document.ontouchmove=ui.click.windowtouchmove;
		}
		window.onbeforeunload=function(){
			if(lib.config.confirm_exit&&!_status.reloading){
				return '是否离开游戏？'
			}
			else{
				return null;
			}
		}
}());
