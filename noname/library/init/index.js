import { nonameInitialized, assetURL, userAgent, Uninstantable, GeneratorFunction, AsyncFunction } from "../../util/index.js";
import { AI as ai } from '../../ai/index.js';
import { Get as get } from '../../get/index.js';
import { Game as game } from '../../game/index.js';
import { Library as lib } from "../index.js";
import { status as _status } from '../../status/index.js';
import { UI as ui } from '../../ui/index.js';
import { GNC as gnc } from '../../gnc/index.js';

import { LibInitPromises } from "./promises.js";

export class LibInit extends Uninstantable {
	/**
	 * 部分函数的Promise版本
	 */
	static promises = LibInitPromises

	static init() {
		return;
	}

	static reset() {
		if (window.inSplash) return;
		if (window.resetExtension) {
			if (confirm('游戏似乎未正常载入，有可能因为部分扩展未正常载入，或者因为部分扩展未载入完毕。\n是否禁用扩展并重新打开？')) {
				window.resetExtension();
				window.location.reload();
			}
		}
		else {
			if (lib.device) {
				if (navigator.notification) {
					navigator.notification.confirm(
						'游戏似乎未正常载入，是否重置游戏？',
						function (index) {
							if (index == 2) {
								localStorage.removeItem('noname_inited');
								window.location.reload();
							}
							else if (index == 3) {
								var noname_inited = localStorage.getItem('noname_inited');
								var onlineKey = localStorage.getItem(lib.configprefix + 'key');
								localStorage.clear();
								if (noname_inited) {
									localStorage.setItem('noname_inited', noname_inited);
								}
								if (onlineKey) {
									localStorage.setItem(lib.configprefix + 'key', onlineKey);
								}
								if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
								setTimeout(function () {
									window.location.reload();
								}, 200);
							}
						},
						'确认退出',
						['取消', '重新下载', '重置设置']
					);
				}
				else {
					if (confirm('游戏似乎未正常载入，是否重置游戏？')) {
						localStorage.removeItem('noname_inited');
						window.location.reload();
					}
				}
			}
			else {
				if (confirm('游戏似乎未正常载入，是否重置游戏？')) {
					var onlineKey = localStorage.getItem(lib.configprefix + 'key');
					localStorage.clear();
					if (onlineKey) {
						localStorage.setItem(lib.configprefix + 'key', onlineKey);
					}
					if (indexedDB) indexedDB.deleteDatabase(lib.configprefix + 'data');
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}
			}
		}
	}

	//lib.onload支持传入GeneratorFunction以解决异步函数的问题 by诗笺
	static async onload() {
		const libOnload = lib.onload;
		delete lib.onload;
		while (Array.isArray(libOnload) && libOnload.length) {
			const fun = libOnload.shift();
			if (typeof fun !== "function") continue;
			await (gnc.is.generatorFunc(fun) ? gnc.of(fun) : fun)();
		}
		ui.updated();
		game.documentZoom = game.deviceZoom;
		if (game.documentZoom != 1) {
			ui.updatez();
		}
		ui.background = ui.create.div('.background');
		ui.background.style.backgroundSize = "cover";
		ui.background.style.backgroundPosition = '50% 50%';
		if (lib.config.image_background && lib.config.image_background != 'default' && !lib.config.image_background.startsWith('custom_')) {
			ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
			if (lib.config.image_background_blur) {
				ui.background.style.filter = 'blur(8px)';
				ui.background.style.webkitFilter = 'blur(8px)';
				ui.background.style.transform = 'scale(1.05)';
			}
		}
		document.documentElement.style.backgroundImage = '';
		document.documentElement.style.backgroundSize = '';
		document.documentElement.style.backgroundPosition = '';
		document.body.insertBefore(ui.background, document.body.firstChild);
		document.body.onresize = ui.updatexr;
		if (lib.config.touchscreen) {
			document.body.addEventListener('touchstart', function (e) {
				this.startX = e.touches[0].clientX / game.documentZoom;
				this.startY = e.touches[0].clientY / game.documentZoom;
				_status.dragged = false;
			});
			document.body.addEventListener('touchmove', function (e) {
				if (_status.dragged) return;
				if (Math.abs(e.touches[0].clientX / game.documentZoom - this.startX) > 10 ||
					Math.abs(e.touches[0].clientY / game.documentZoom - this.startY) > 10) {
					_status.dragged = true;
				}
			});
		}

		if (lib.config.image_background.startsWith('custom_')) {
			ui.background.style.backgroundImage = "none";
			game.getDB('image', lib.config.image_background, function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var data = fileLoadedEvent.target.result;
					ui.background.style.backgroundImage = 'url(' + data + ')';
					if (lib.config.image_background_blur) {
						ui.background.style.filter = 'blur(8px)';
						ui.background.style.webkitFilter = 'blur(8px)';
						ui.background.style.transform = 'scale(1.05)';
					}
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.card_style == 'custom') {
			game.getDB('image', 'card_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.card_stylesheet) {
						ui.css.card_stylesheet.remove();
					}
					ui.css.card_stylesheet = lib.init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.cardback_style == 'custom') {
			game.getDB('image', 'cardback_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.cardback_stylesheet) {
						ui.css.cardback_stylesheet.remove();
					}
					ui.css.cardback_stylesheet = lib.init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB('image', 'cardback_style2', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.cardback_stylesheet2) {
						ui.css.cardback_stylesheet2.remove();
					}
					ui.css.cardback_stylesheet2 = lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.hp_style == 'custom') {
			game.getDB('image', 'hp_style1', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet1) {
						ui.css.hp_stylesheet1.remove();
					}
					ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB('image', 'hp_style2', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet2) {
						ui.css.hp_stylesheet2.remove();
					}
					ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB('image', 'hp_style3', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet3) {
						ui.css.hp_stylesheet3.remove();
					}
					ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
			game.getDB('image', 'hp_style4', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.hp_stylesheet4) {
						ui.css.hp_stylesheet4.remove();
					}
					ui.css.hp_stylesheet4 = lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.player_style == 'custom') {
			ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:none;background-size:100% 100%;}');
			game.getDB('image', 'player_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.player_stylesheet) {
						ui.css.player_stylesheet.remove();
					}
					ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.border_style == 'custom') {
			game.getDB('image', 'border_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.border_stylesheet) {
						ui.css.border_stylesheet.remove();
					}
					ui.css.border_stylesheet = lib.init.sheet();
					ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
					ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.control_style == 'custom') {
			game.getDB('image', 'control_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.control_stylesheet) {
						ui.css.control_stylesheet.remove();
					}
					ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}
		if (lib.config.menu_style == 'custom') {
			game.getDB('image', 'menu_style', function (fileToLoad) {
				if (!fileToLoad) return;
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (ui.css.menu_stylesheet) {
						ui.css.menu_stylesheet.remove();
					}
					ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
				};
				fileReader.readAsDataURL(fileToLoad, "UTF-8");
			});
		}

		var proceed2 = async () => {
			var mode = lib.imported.mode;
			var card = lib.imported.card;
			var character = lib.imported.character;
			var play = lib.imported.play;
			delete window.game;
			var i, j, k;
			for (i in mode[lib.config.mode].element) {
				if (!lib.element[i]) lib.element[i] = [];
				for (j in mode[lib.config.mode].element[i]) {
					if (j == 'init') {
						if (!lib.element[i].inits) lib.element[i].inits = [];
						lib.element[i].inits.push(mode[lib.config.mode].element[i][j]);
					}
					else {
						lib.element[i][j] = mode[lib.config.mode].element[i][j];
					}
				}
			}
			for (i in mode[lib.config.mode].ai) {
				if (typeof mode[lib.config.mode].ai[i] == 'object') {
					if (ai[i] == undefined) ai[i] = {};
					for (j in mode[lib.config.mode].ai[i]) {
						ai[i][j] = mode[lib.config.mode].ai[i][j];
					}
				}
				else {
					ai[i] = mode[lib.config.mode].ai[i];
				}
			}
			for (i in mode[lib.config.mode].ui) {
				if (typeof mode[lib.config.mode].ui[i] == 'object') {
					if (ui[i] == undefined) ui[i] = {};
					for (j in mode[lib.config.mode].ui[i]) {
						ui[i][j] = mode[lib.config.mode].ui[i][j];
					}
				}
				else {
					ui[i] = mode[lib.config.mode].ui[i];
				}
			}
			for (i in mode[lib.config.mode].game) {
				game[i] = mode[lib.config.mode].game[i];
			}
			for (i in mode[lib.config.mode].get) {
				get[i] = mode[lib.config.mode].get[i];
			}
			lib.init.start = mode[lib.config.mode].start;
			lib.init.startBefore = mode[lib.config.mode].startBefore;
			if (game.onwash) {
				lib.onwash.push(game.onwash);
				delete game.onwash;
			}
			if (game.onover) {
				lib.onover.push(game.onover);
				delete game.onover;
			}
			lib.config.banned = lib.config[lib.config.mode + '_banned'] || [];
			lib.config.bannedcards = lib.config[lib.config.mode + '_bannedcards'] || [];

			lib.rank = window.noname_character_rank;
			delete window.noname_character_rank;
			for (i in mode[lib.config.mode]) {
				if (i == 'element') continue;
				if (i == 'game') continue;
				if (i == 'ai') continue;
				if (i == 'ui') continue;
				if (i == 'get') continue;
				if (i == 'config') continue;
				if (i == 'onreinit') continue;
				if (i == 'start') continue;
				if (i == 'startBefore') continue;
				if (lib[i] == undefined) lib[i] = (Array.isArray(mode[lib.config.mode][i])) ? [] : {};
				for (j in mode[lib.config.mode][i]) {
					lib[i][j] = mode[lib.config.mode][i][j];
				}
			}
			if (typeof mode[lib.config.mode].init == 'function') {
				mode[lib.config.mode].init();
			}

			var connectCharacterPack = [];
			var connectCardPack = [];
			for (i in character) {
				if (character[i].character) {
					const characterPack = lib.characterPack[i];
					if (characterPack) Object.assign(characterPack, character[i].character);
					else lib.characterPack[i] = character[i].character;
				}
				for (j in character[i]) {
					if (j == 'mode' || j == 'forbid') continue;
					if (j == 'connect') {
						connectCharacterPack.push(i);
						continue;
					}
					if (j == 'character' && !lib.config.characters.contains(i) && lib.config.mode != 'connect') {
						if (lib.config.mode == 'chess' && get.config('chess_mode') == 'leader' && get.config('chess_leader_allcharacter')) {
							for (k in character[i][j]) {
								lib.hiddenCharacters.push(k);
							}
						}
						else if (lib.config.mode != 'boss' || i != 'boss') {
							continue;
						}
					}
					if (Array.isArray(lib[j]) && Array.isArray(character[i][j])) {
						lib[j].addArray(character[i][j]);
						continue;
					}
					for (k in character[i][j]) {
						if (j == 'character') {
							if (!character[i][j][k][4]) {
								character[i][j][k][4] = [];
							}
							if (character[i][j][k][4].contains('boss') ||
								character[i][j][k][4].contains('hiddenboss')) {
								lib.config.forbidai.add(k);
							}
							if (lib.config.forbidai_user && lib.config.forbidai_user.contains(k)) {
								lib.config.forbidai.add(k);
							}
							for (var l = 0; l < character[i][j][k][3].length; l++) {
								lib.skilllist.add(character[i][j][k][3][l]);
							}
						}
						if (j == 'skill' && k[0] == '_' && (lib.config.mode != 'connect' ? (!lib.config.characters.contains(i)) : (!character[i].connect))) {
							continue;
						}
						if (j == 'translate' && k == i) {
							lib[j][k + '_character_config'] = character[i][j][k];
						}
						else {
							if (lib[j][k] == undefined) {
								if (j == 'skill' && !character[i][j][k].forceLoad && lib.config.mode == 'connect' && !character[i].connect) {
									lib[j][k] = {
										nopop: character[i][j][k].nopop,
										derivation: character[i][j][k].derivation
									};
								}
								else {
									Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(character[i][j], k));
								}
								if (j == 'card' && lib[j][k].derivation) {
									if (!lib.cardPack.mode_derivation) {
										lib.cardPack.mode_derivation = [k];
									}
									else {
										lib.cardPack.mode_derivation.push(k);
									}
								}
							}
							else if (Array.isArray(lib[j][k]) && Array.isArray(character[i][j][k])) {
								lib[j][k].addArray(character[i][j][k]);
							}
							else {
								console.log(
									`dublicate ${j} in character ${i}:\n${k}:\nlib.${j}.${k}`,
									lib[j][k],
									`\ncharacter.${i}.${j}.${k}`,
									character[i][j][k]
								);
							}
						}
					}
				}
			}
			var connect_avatar_list = [];
			for (var i in lib.character) {
				connect_avatar_list.push(i);
			}
			connect_avatar_list.sort(lib.sort.capt);
			for (var i = 0; i < connect_avatar_list.length; i++) {
				var ia = connect_avatar_list[i];
				lib.mode.connect.config.connect_avatar.item[ia] = lib.translate[ia];
			}
			if (lib.config.mode != 'connect') {
				var pilecfg = lib.config.customcardpile[get.config('cardpilename') || '当前牌堆'];
				if (pilecfg) {
					lib.config.bannedpile = get.copy(pilecfg[0] || {});
					lib.config.addedpile = get.copy(pilecfg[1] || {});
				}
				else {
					lib.config.bannedpile = {};
					lib.config.addedpile = {};
				}
			}
			else {
				lib.cardPackList = {};
			}
			for (i in card) {
				const cardPack = lib.cardPack[i] ? lib.cardPack[i] : lib.cardPack[i] = [];
				if (card[i].card) {
					for (var j in card[i].card) {
						if (!card[i].card[j].hidden && card[i].translate[j + '_info']) {
							cardPack.push(j);
						}
					}
				}
				for (j in card[i]) {
					if (j == 'mode' || j == 'forbid') continue;
					if (j == 'connect') {
						connectCardPack.push(i);
						continue;
					}
					if (j == 'list') {
						if (lib.config.mode == 'connect') {
							const cardPackList = lib.cardPackList[i];
							if (cardPackList) cardPackList.addArray(card[i][j]);
							else lib.cardPackList[i] = card[i][j];
						}
						else {
							if (lib.config.cards.contains(i)) {
								var pile;
								if (typeof card[i][j] == 'function') {
									pile = card[i][j]();
								}
								else {
									pile = card[i][j];
								}
								const cardPile = lib.cardPile[i];
								if (cardPile) cardPile.addArray(pile);
								else lib.cardPile[i] = pile.slice(0);
								if (lib.config.bannedpile[i]) {
									for (var k = 0; k < lib.config.bannedpile[i].length; k++) {
										pile[lib.config.bannedpile[i][k]] = null;
									}
								}
								for (var k = 0; k < pile.length; k++) {
									if (!pile[k]) {
										pile.splice(k--, 1);
									}
								}
								if (lib.config.addedpile[i]) {
									for (var k = 0; k < lib.config.addedpile[i].length; k++) {
										pile.push(lib.config.addedpile[i][k]);
									}
								}
								lib.card.list.addArray(pile);
							}
						}
					}
					else {
						for (k in card[i][j]) {
							if (j == 'skill' && k[0] == '_' && !card[i][j][k].forceLoad && (lib.config.mode != 'connect' ? (!lib.config.cards.contains(i)) : (!card[i].connect))) {
								continue;
							}
							if (j == 'translate' && k == i) {
								lib[j][k + '_card_config'] = card[i][j][k];
							}
							else {
								if (lib[j][k] == undefined) {
									if (j == 'skill' && !card[i][j][k].forceLoad && lib.config.mode == 'connect' && !card[i].connect) {
										lib[j][k] = {
											nopop: card[i][j][k].nopop,
											derivation: card[i][j][k].derivation
										};
									}
									else {
										Object.defineProperty(lib[j], k, Object.getOwnPropertyDescriptor(card[i][j], k));
									}
								}
								else {
									console.log(
										`dublicate ${j} in card ${i}:\n${k}:\nlib.${j}.${k}`,
										lib[j][k],
										`\ncard.${i}.${j}.${k}`,
										card[i][j][k]
									);
								}
								if (j == 'card' && lib[j][k].derivation) {
									if (!lib.cardPack.mode_derivation) {
										lib.cardPack.mode_derivation = [k];
									}
									else {
										lib.cardPack.mode_derivation.push(k);
									}
								}
							}
						}
					}
				}
			}
			if (lib.cardPack.mode_derivation) {
				for (var i = 0; i < lib.cardPack.mode_derivation.length; i++) {
					if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivation == 'string' && !lib.character[lib.card[lib.cardPack.mode_derivation[i]].derivation]) {
						lib.cardPack.mode_derivation.splice(i--, 1);
					}
					else if (typeof lib.card[lib.cardPack.mode_derivation[i]].derivationpack == 'string' && !lib.config.cards.contains(lib.card[lib.cardPack.mode_derivation[i]].derivationpack)) {
						lib.cardPack.mode_derivation.splice(i--, 1);
					}
				}
				if (lib.cardPack.mode_derivation.length == 0) {
					delete lib.cardPack.mode_derivation;
				}
			}
			if (lib.config.mode != 'connect') {
				for (i in play) {
					if (lib.config.hiddenPlayPack.contains(i)) continue;
					if (play[i].forbid && play[i].forbid.contains(lib.config.mode)) continue;
					if (play[i].mode && play[i].mode.contains(lib.config.mode) == false) continue;
					for (j in play[i].element) {
						if (!lib.element[j]) lib.element[j] = [];
						for (k in play[i].element[j]) {
							if (k == 'init') {
								if (!lib.element[j].inits) lib.element[j].inits = [];
								lib.element[j].inits.push(play[i].element[j][k]);
							}
							else {
								lib.element[j][k] = play[i].element[j][k];
							}
						}
					}
					for (j in play[i].ui) {
						if (typeof play[i].ui[j] == 'object') {
							if (ui[j] == undefined) ui[j] = {};
							for (k in play[i].ui[j]) {
								ui[j][k] = play[i].ui[j][k];
							}
						}
						else {
							ui[j] = play[i].ui[j];
						}
					}
					for (j in play[i].game) {
						game[j] = play[i].game[j];
					}
					for (j in play[i].get) {
						get[j] = play[i].get[j];
					}
					for (j in play[i]) {
						if (j == 'mode' || j == 'forbid' || j == 'init' || j == 'element' ||
							j == 'game' || j == 'get' || j == 'ui' || j == 'arenaReady') continue;
						for (k in play[i][j]) {
							if (j == 'translate' && k == i) {
								// lib[j][k+'_play_config']=play[i][j][k];
							}
							else {
								if (lib[j][k] != undefined) {
									console.log(
										`dublicate ${j} in play ${i}:\n${k}:\nlib.${j}.${k}`,
										lib[j][k],
										`\nplay.${i}.${j}.${k}`,
										play[i][j][k]
									);
								}
								lib[j][k] = play[i][j][k];
							}
						}
					}
					if (typeof play[i].init == 'function') play[i].init();
					if (typeof play[i].arenaReady == 'function') lib.arenaReady.push(play[i].arenaReady);
				}
			}

			lib.connectCharacterPack = [];
			lib.connectCardPack = [];
			for (var i = 0; i < lib.config.all.characters.length; i++) {
				var packname = lib.config.all.characters[i];
				if (connectCharacterPack.contains(packname)) {
					lib.connectCharacterPack.push(packname)
				}
			}
			for (var i = 0; i < lib.config.all.cards.length; i++) {
				var packname = lib.config.all.cards[i];
				if (connectCardPack.contains(packname)) {
					lib.connectCardPack.push(packname)
				}
			}
			if (lib.config.mode != 'connect') {
				for (i = 0; i < lib.card.list.length; i++) {
					if (lib.card.list[i][2] == 'huosha') {
						lib.card.list[i] = lib.card.list[i].slice(0);
						lib.card.list[i][2] = 'sha';
						lib.card.list[i][3] = 'fire';
					}
					else if (lib.card.list[i][2] == 'leisha') {
						lib.card.list[i] = lib.card.list[i].slice(0);
						lib.card.list[i][2] = 'sha';
						lib.card.list[i][3] = 'thunder';
					}
					if (!lib.card[lib.card.list[i][2]]) {
						lib.card.list.splice(i, 1); i--;
					}
					else if (lib.card[lib.card.list[i][2]].mode &&
						lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode) == false) {
						lib.card.list.splice(i, 1); i--;
					}
				}
			}

			if (lib.config.mode == 'connect') {
				_status.connectMode = true;
			}
			if (window.isNonameServer) {
				lib.cheat.i();
			}
			else if (lib.config.dev && (!_status.connectMode || lib.config.debug)) {
				lib.cheat.i();
			}
			lib.config.sort_card = get.sortCard(lib.config.sort);
			delete lib.imported.character;
			delete lib.imported.card;
			delete lib.imported.mode;
			delete lib.imported.play;
			for (var i in lib.init) {
				if (i.startsWith('setMode_')) {
					delete lib.init[i];
				}
			}
			if (!_status.connectMode) {
				for (var i = 0; i < lib.extensions.length; i++) {
					try {
						_status.extension = lib.extensions[i][0];
						_status.evaluatingExtension = lib.extensions[i][3];
						if (typeof lib.extensions[i][1] == "function")
							await (gnc.is.coroutine(lib.extensions[i][1]) ? gnc.of(lib.extensions[i][1]) : lib.extensions[i][1]).call(lib.extensions[i], lib.extensions[i][2], lib.extensions[i][4]);
						if (lib.extensions[i][4]) {
							if (lib.extensions[i][4].character) {
								for (var j in lib.extensions[i][4].character.character) {
									game.addCharacterPack(get.copy(lib.extensions[i][4].character));
									break;
								}
							}
							if (lib.extensions[i][4].card) {
								for (var j in lib.extensions[i][4].card.card) {
									game.addCardPack(get.copy(lib.extensions[i][4].card));
									break;
								}
							}
							if (lib.extensions[i][4].skill) {
								for (var j in lib.extensions[i][4].skill.skill) {
									game.addSkill(j, lib.extensions[i][4].skill.skill[j],
										lib.extensions[i][4].skill.translate[j],
										lib.extensions[i][4].skill.translate[j + '_info'],
										lib.extensions[i][4].skill.translate[j + '_append'],
										lib.extensions[i][4].skill.translate[j + '_ab']);
								}
							}
						}
						delete _status.extension;
						delete _status.evaluatingExtension;
					}
					catch (e) {
						console.log(e);
					}
				}
			}
			delete lib.extensions;

			if (lib.init.startBefore) {
				lib.init.startBefore();
				delete lib.init.startBefore;
			}
			ui.create.arena();
			game.createEvent('game', false).setContent(lib.init.start);
			if (lib.mode[lib.config.mode] && lib.mode[lib.config.mode].fromextension) {
				var startstr = mode[lib.config.mode].start.toString();
				if (startstr.indexOf('onfree') == -1) {
					setTimeout(lib.init.onfree, 500);
				}
			}
			delete lib.init.start;
			if (Array.isArray(_status.onprepare) && _status.onprepare.length) {
				await Promise.allSettled(_status.onprepare);
				delete _status.onprepare;
			}
			game.loop();
		};
		var proceed = async () => {
			if (!lib.db) {
				try {
					lib.storage = JSON.parse(localStorage.getItem(lib.configprefix + lib.config.mode));
					if (typeof lib.storage !== 'object') throw ('err');
					if (lib.storage === null) throw ('err');
				} catch (err) {
					lib.storage = {};
					localStorage.setItem(lib.configprefix + lib.config.mode, "{}");
				}
				await proceed2();
			}
			else {
				await game.getDB('data', lib.config.mode, async (obj) => {
					lib.storage = obj || {};
					await proceed2();
				});
			}
		};
		if (!lib.imported.mode || !lib.imported.mode[lib.config.mode]) {
			window.inSplash = true;
			clearTimeout(window.resetGameTimeout);
			delete window.resetGameTimeout;
			var clickedNode = false;
			var clickNode = function () {
				if (clickedNode) return;
				this.classList.add('clicked');
				clickedNode = true;
				lib.config.mode = this.link;
				game.saveConfig('mode', this.link);
				if (this.link == 'connect') {
					localStorage.setItem(lib.configprefix + 'directstart', true);
					game.reload();
				}
				else {
					if (game.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) !== -1) {
						game.layout = 'mobile';
						ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
					}
					else if (game.layout == 'mobile' && lib.config.layout != 'mobile' && lib.layoutfixed.indexOf(lib.config.mode) === -1) {
						game.layout = lib.config.layout;
						if (game.layout == 'default') {
							ui.css.layout.href = '';
						}
						else {
							ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
						}
					}
					splash.delete(1000);
					delete window.inSplash;
					window.resetGameTimeout = setTimeout(lib.init.reset, 10000);

					this.listenTransition(function () {
						lib.init.js(lib.assetURL + 'mode', lib.config.mode, proceed);
					}, 500);
				}
			}
			var downNode = function () {
				this.classList.add('glow');
			}
			var upNode = function () {
				this.classList.remove('glow');
			}
			var splash = ui.create.div('#splash', document.body);
			if (lib.config.touchscreen) {
				splash.classList.add('touch');
				lib.setScroll(splash);
			}
			if (lib.config.player_border != 'wide') {
				splash.classList.add('slim');
			}
			splash.dataset.radius_size = lib.config.radius_size;
			for (var i = 0; i < lib.config.all.mode.length; i++) {
				var node = ui.create.div('.hidden', splash, clickNode);
				node.link = lib.config.all.mode[i];
				ui.create.div(node, '.splashtext', get.verticalStr(get.translation(lib.config.all.mode[i])));
				if (lib.config.all.stockmode.includes(lib.config.all.mode[i])) {
					// 初始启动页设置
					if (lib.config.splash_style == undefined) game.saveConfig('splash_style', 'style1');
					splash.dataset.splash_style = lib.config.splash_style;
					// 扩展可通过window.splashurl设置素材读取路径
					if (window.splashurl == undefined) window.splashurl = 'image/splash/';
					if (lib.config.splash_style == 'style1' || lib.config.splash_style == 'style2') {
						ui.create.div(node, '.avatar').setBackgroundImage('image/splash/' + lib.config.splash_style + '/' + lib.config.all.mode[i] + '.jpg');
					} else {
						ui.create.div(node, '.avatar').setBackgroundImage(splashurl + lib.config.splash_style + '/' + lib.config.all.mode[i] + '.jpg');
					}
				}
				else {
					var avatarnode = ui.create.div(node, '.avatar');
					var avatarbg = lib.mode[lib.config.all.mode[i]].splash;
					if (avatarbg.startsWith('ext:')) {
						avatarnode.setBackgroundImage(avatarbg.replace(/^ext:/, 'extension/'));
					}
					else {
						avatarnode.setBackgroundDB(avatarbg);
					}
				}
				if (!lib.config.touchscreen) {
					node.addEventListener('mousedown', downNode);
					node.addEventListener('mouseup', upNode);
					node.addEventListener('mouseleave', upNode);
				}
				setTimeout((function (node) {
					return function () {
						node.show();
					}
				}(node)), i * 100);
			}
			if (lib.config.mousewheel) {
				splash.onmousewheel = ui.click.mousewheel;
			}
		}
		else {
			await proceed();
		}
		localStorage.removeItem(lib.configprefix + 'directstart');
		delete lib.init.init;
		const libOnload2 = lib.onload2;
		delete lib.onload2;
		while (Array.isArray(libOnload2) && libOnload2.length) {
			const fun = libOnload2.shift();
			if (typeof fun != "function") continue;
			await (gnc.is.generatorFunc(fun) ? gnc.of(fun) : fun)();
		}
	}

	static startOnline() {
		'step 0'
		event._resultid = null;
		event._result = null;
		game.pause();
		'step 1'
		if (result) {
			if (event._resultid) {
				result.id = event._resultid;
			}
			game.send('result', result);
		}
		event.goto(0);
	}

	static onfree() {
		if (lib.onfree) {
			clearTimeout(window.resetGameTimeout);
			delete window.resetGameTimeout;
			if (!game.syncMenu) {
				delete window.resetExtension;
				localStorage.removeItem(lib.configprefix + 'disable_extension');
			}

			if (game.removeFile && lib.config.brokenFile.length) {
				while (lib.config.brokenFile.length) {
					game.removeFile(lib.config.brokenFile.shift());
				}
				game.saveConfigValue('brokenFile');
			}

			var onfree = lib.onfree;
			delete lib.onfree;
			var loop = function () {
				if (onfree.length) {
					(onfree.shift())();
					setTimeout(loop, 100);
				}
			};
			setTimeout(loop, 500);
			if (!_status.new_tutorial) game.saveConfig('menu_loadondemand', true, lib.config.mode);
		}
	}

	static connection(ws) {
		const client = new lib.element.Client(ws);
		lib.node.clients.push(client);
		if (window.isNonameServer) {
			document.querySelector('#server_count').innerHTML = lib.node.clients.length;
		}
		ws.on('message', function (messagestr) {
			var message;
			try {
				message = JSON.parse(messagestr);
				if (!Array.isArray(message) ||
					typeof lib.message.server[message[0]] !== 'function') {
					throw ('err');
				}
				for (var i = 1; i < message.length; i++) {
					message[i] = get.parsedResult(message[i]);
				}
			}
			catch (e) {
				console.log(e);
				console.log('invalid message: ' + messagestr);
				return;
			}
			lib.message.server[message.shift()].apply(client, message);
		});
		ws.on('close', function () {
			client.close();
		});
		client.send('opened');
	}

	static sheet() {
		var style = document.createElement('style');
		document.head.appendChild(style);
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == 'string') {
				style.sheet.insertRule(arguments[i], 0);
			}
		}
		return style;
	}

	static css(path, file, before) {
		const style = document.createElement("link");
		style.rel = "stylesheet";
		if (path) {
			if (path[path.length - 1] == '/') path = path.slice(0, path.length - 1);
			if (file) path = `${path}${/^db:extension-[^:]*$/.test(path) ? ':' : '/'}${file}.css`;
			(path.startsWith('db:') ? game.getDB('image', path.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(path))).then(resolvedPath => {
				style.href = resolvedPath;
				if (typeof before == 'function') {
					style.addEventListener('load', before);
					document.head.appendChild(style);
				}
				else if (before) document.head.insertBefore(style, before);
				else document.head.appendChild(style);
			});
		}
		return style;
	}

	//在扩展的precontent中调用，用于加载扩展必需的JS文件。
	//If any of the parameters is an Array, corresponding files will be loaded in order
	//如果任意参数为数组，则按顺序加载加载相应的文件
	static jsForExtension(path, file, onLoad, onError) {
		if (!_status.javaScriptExtensions) _status.javaScriptExtensions = [];
		_status.javaScriptExtensions.push({
			path: path,
			file: file,
			onLoad: onLoad,
			onError: onError
		});
	}

	static js(path, file, onLoad, onError) {
		if (path[path.length - 1] == '/') path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			file.forEach(value => lib.init.js(path, value, onLoad, onError));
			return;
		}
		let scriptSource = file ? `${path}${/^db:extension-[^:]*$/.test(path) ? ':' : '/'}${file}.js` : path;
		if (path.startsWith('http')) scriptSource += `?rand=${get.id()}`;
		else if (lib.config.fuck_sojson && scriptSource.includes('extension') != -1 && scriptSource.startsWith(lib.assetURL)) {
			const pathToRead = scriptSource.slice(lib.assetURL.length);
			const alertMessage = `检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`;
			if (typeof game.readFileAsText == 'function') game.readFileAsText(pathToRead, result => {
				if (result.includes('sojson') || result.includes('jsjiami') || result.includes('var _0x')) alert(alertMessage);
			}, () => void 0);
			else if (location.origin != 'file://') lib.init.reqSync(pathToRead, function () {
				const result = this.responseText;
				if (result.includes('sojson') || result.includes('jsjiami') || result.includes('var _0x')) alert(alertMessage);
			}, () => void 0);
		}
		const script = document.createElement('script');
		(scriptSource.startsWith('db:') ? game.getDB('image', scriptSource.slice(3)).then(get.objectURL) : new Promise(resolve => resolve(scriptSource))).then(resolvedScriptSource => {
			script.src = resolvedScriptSource;
			if (path.startsWith('http')) script.addEventListener('load', () => script.remove());
			document.head.appendChild(script);
			if (typeof onLoad == 'function') script.addEventListener('load', onLoad);
			if (typeof onError == 'function') script.addEventListener('error', onError);
		});
		return script;
	}

	/**
	 * 同步lib.init.js
	 * @returns { void }
	 */
	static jsSync(path, file, onLoad, onError) {
		if (lib.assetURL.length == 0 && location.origin == 'file://' && typeof game.readFile == 'undefined') {
			const e = new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
			if (typeof onError == 'function') onError(e);
			else throw e;
			return;
		}
		if (path[path.length - 1] == '/') path = path.slice(0, path.length - 1);
		if (path == `${lib.assetURL}mode` && lib.config.all.stockmode.indexOf(file) == -1) {
			lib.genAwait(lib.init[`setMode_${file}`]()).then(onLoad);
			return;
		}
		if (Array.isArray(file)) {
			return file.forEach(value => lib.init.jsSync(path, value, onLoad, onError));
		}
		let scriptSource;
		if (!file) scriptSource = path;
		else scriptSource = `${path}/${file}.js`;
		if (path.startsWith('http')) scriptSource += `?rand=${get.id()}`;
		const xmlHttpRequest = new XMLHttpRequest();
		let data;
		xmlHttpRequest.addEventListener("load", () => {
			data = xmlHttpRequest.responseText;
			if (!data) {
				if (typeof onError == 'function') onError(new Error(`${scriptSource}加载失败！`));
				return;
			}
			if (lib.config.fuck_sojson && scriptSource.includes('extension') != -1 && scriptSource.startsWith(lib.assetURL)) {
				const pathToRead = scriptSource.slice(lib.assetURL.length);
				if (data.includes('sojson') || data.includes('jsjiami') || data.includes('var _0x')) alert(`检测到您安装了使用免费版sojson进行加密的扩展。请谨慎使用这些扩展，避免游戏数据遭到破坏。\n扩展文件：${pathToRead}`);
			}
			try {
				window.eval(data);
				if (typeof onLoad == 'function') onLoad();
			}
			catch (error) {
				if (typeof onError == 'function') onError(error);
			}
		});
		if (typeof onError == 'function') xmlHttpRequest.addEventListener("error", onError);
		xmlHttpRequest.open("GET", scriptSource, false);
		xmlHttpRequest.send();
	}

	static req(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith('http')) sScriptURL = str;
		else if (str.startsWith('local:')) {
			if (lib.assetURL.length == 0 && location.origin == 'file://' && typeof game.readFile == 'undefined') {
				const e = new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
				if (typeof onerror == 'function') onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		}
		else {
			let url = get.url(master);
			if (url[url.length - 1] != '/') url += '/';
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == 'function') oReq.addEventListener("load", onload);
		if (typeof onerror == 'function') oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL);
		oReq.send();
	}

	/**
	 * 同步lib.init.req
	 */
	static reqSync(str, onload, onerror, master) {
		let sScriptURL;
		if (str.startsWith('http')) sScriptURL = str;
		else if (str.startsWith('local:')) {
			if (lib.assetURL.length == 0 && location.origin == 'file://' && typeof game.readFile == 'undefined') {
				const e = new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
				if (typeof onerror == 'function') onerror(e);
				else throw e;
				return;
			}
			sScriptURL = lib.assetURL + str.slice(6);
		}
		else {
			let url = get.url(master);
			if (url[url.length - 1] != '/') url += '/';
			sScriptURL = url + str;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == 'function') oReq.addEventListener("load", onload);
		if (typeof onerror == 'function') oReq.addEventListener("error", onerror);
		oReq.open("GET", sScriptURL, false);
		oReq.send();
		if (typeof onload !== 'function') return oReq.responseText;
	}

	static json(url, onload, onerror) {
		const oReq = new XMLHttpRequest();
		if (typeof onload == 'function') oReq.addEventListener("load", () => {
			let result;
			try {
				result = JSON.parse(oReq.responseText);
				if (!result) throw ('err');
			}
			catch (e) {
				if (typeof onerror == 'function') onerror(e);
				return;
			}
			onload(result);
		});
		if (typeof onerror == 'function') oReq.addEventListener("error", onerror);
		oReq.open("GET", url);
		oReq.send();
	}

	/**
	 * 同步lib.init.json
	 */
	static jsonSync(url, onload, onerror) {
		if (lib.assetURL.length == 0 && location.origin == 'file://' && typeof game.readFile == 'undefined') {
			const e = new Error('浏览器file协议下无法使用此api，请在http/https协议下使用此api');
			if (typeof onerror == 'function') onerror(e);
			else throw e;
			return;
		}
		const oReq = new XMLHttpRequest();
		if (typeof onload == 'function') oReq.addEventListener("load", () => {
			let result;
			try {
				result = JSON.parse(oReq.responseText);
				if (!result) throw ('err');
			}
			catch (e) {
				if (typeof onerror == 'function') onerror(e);
				return;
			}
			onload(result);
		});
		if (typeof onerror == 'function') oReq.addEventListener("error", onerror);
		oReq.open("GET", url, false);
		oReq.send();
	}

	static cssstyles() {
		if (ui.css.styles) {
			ui.css.styles.remove();
		}
		ui.css.styles = lib.init.sheet();
		ui.css.styles.sheet.insertRule('#arena .player>.name,#arena .button.character>.name {font-family: ' + (lib.config.name_font || 'xinwei') + ',xinwei}', 0);
		ui.css.styles.sheet.insertRule('#arena .player>.name,.button.character>.name {font-family: ' + (lib.config.name_font || 'xinwei') + ',xinwei}', 0);
		ui.css.styles.sheet.insertRule('#arena .player .identity>div {font-family: ' + (lib.config.identity_font || 'huangcao') + ',xinwei}', 0);
		ui.css.styles.sheet.insertRule('.button.character.newstyle>.identity {font-family: ' + (lib.config.identity_font || 'huangcao') + ',xinwei}', 0);
		if (lib.config.cardtext_font && lib.config.cardtext_font != 'default') {
			ui.css.styles.sheet.insertRule('.card div:not(.info):not(.background) {font-family: ' + lib.config.cardtext_font + ';}', 0);
		}
		if (lib.config.global_font && lib.config.global_font != 'default') {
			ui.css.styles.sheet.insertRule('#window {font-family: ' + lib.config.global_font + ',xinwei}', 0);
			ui.css.styles.sheet.insertRule('#window #control{font-family: STHeiti,SimHei,Microsoft JhengHei,Microsoft YaHei,WenQuanYi Micro Hei,Suits,Helvetica,Arial,sans-serif}', 0);
		}
		switch (lib.config.glow_phase) {
			case 'yellow': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(217, 152, 62) 0 0 15px, rgb(217, 152, 62) 0 0 15px !important;}', 0); break;
			case 'green': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgba(10, 155, 67, 1) 0 0 15px, rgba(10, 155, 67, 1) 0 0 15px !important;}', 0); break;
			case 'purple': ui.css.styles.sheet.insertRule('#arena .player:not(.selectable):not(.selected).glow_phase {box-shadow: rgba(0, 0, 0, 0.3) 0 0 0 1px, rgb(189, 62, 170) 0 0 15px, rgb(189, 62, 170) 0 0 15px !important;}', 0); break;
		}
	}

	static layout(layout, nosave) {
		const loadingScreen = ui.create.div('.loading-screen', document.body), loadingScreenStyle = loadingScreen.style;
		loadingScreenStyle.animationDuration = '1s';
		loadingScreenStyle.animationFillMode = 'forwards';
		loadingScreenStyle.animationName = 'opacity-0-1';
		if (layout == 'default') layout = 'mobile';
		if (!nosave) game.saveConfig('layout', layout);
		game.layout = layout;
		ui.arena.hide();
		new Promise(resolve => setTimeout(resolve, 500)).then(() => {
			if (game.layout == 'default') {
				ui.css.layout.href = '';
			}
			else {
				ui.css.layout.href = lib.assetURL + 'layout/' + game.layout + '/layout.css';
			}
			if (game.layout == 'mobile' || game.layout == 'long') {
				ui.arena.classList.add('mobile');
			}
			else {
				ui.arena.classList.remove('mobile');
			}
			if (game.layout == 'mobile' || game.layout == 'long' || game.layout == 'long2' || game.layout == 'nova') {
				if (game.me && game.me.node.handcards2.childNodes.length) {
					while (game.me.node.handcards2.childNodes.length) {
						game.me.node.handcards1.appendChild(game.me.node.handcards2.firstChild);
					}
				}
			}
			if (game.layout == 'default') {
				ui.arena.classList.add('oldlayout');
			}
			else {
				ui.arena.classList.remove('oldlayout');
			}
			if (lib.config.cardshape == 'oblong' && (game.layout == 'long' || game.layout == 'mobile' || game.layout == 'long2' || game.layout == 'nova')) {
				ui.arena.classList.add('oblongcard');
				ui.window.classList.add('oblongcard');
			}
			else {
				ui.arena.classList.remove('oblongcard');
				ui.window.classList.remove('oblongcard');
			}
			//if(lib.config.textequip=='text'&&(game.layout=='long'||game.layout=='mobile')){
			if (game.layout == 'long' || game.layout == 'mobile') {
				ui.arena.classList.add('textequip');
			}
			else {
				ui.arena.classList.remove('textequip');
			}
			if (get.is.phoneLayout()) {
				ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
				ui.arena.classList.add('phone');
			}
			else {
				ui.css.phone.href = '';
				ui.arena.classList.remove('phone');
			}
			for (var i = 0; i < game.players.length; i++) {
				if (get.is.linked2(game.players[i])) {
					if (game.players[i].classList.contains('linked')) {
						game.players[i].classList.remove('linked');
						game.players[i].classList.add('linked2');
					}
				}
				else {
					if (game.players[i].classList.contains('linked2')) {
						game.players[i].classList.remove('linked2');
						game.players[i].classList.add('linked');
					}
				}
			}
			if (game.layout == 'long' || game.layout == 'long2') {
				ui.arena.classList.add('long');
			}
			else {
				ui.arena.classList.remove('long');
			}
			if (lib.config.player_border != 'wide' || game.layout == 'long' || game.layout == 'long2') {
				ui.arena.classList.add('slim_player');
			}
			else {
				ui.arena.classList.remove('slim_player');
			}
			if (lib.config.player_border == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
				ui.arena.classList.add('lslim_player');
			}
			else {
				ui.arena.classList.remove('lslim_player');
			}
			if (lib.config.player_border == 'slim') {
				ui.arena.classList.add('uslim_player');
			}
			else {
				ui.arena.classList.remove('uslim_player');
			}
			if (lib.config.player_border == 'narrow') {
				ui.arena.classList.add('mslim_player');
			}
			else {
				ui.arena.classList.remove('mslim_player');
			}
			ui.updatej();
			ui.updatem();
			return new Promise(resolve => setTimeout(resolve, 100));
		}).then(() => {
			ui.arena.show();
			if (game.me) game.me.update();
			return new Promise(resolve => setTimeout(resolve, 500));
		}).then(() => {
			ui.updatex();
			ui.updatePlayerPositions();
			return new Promise(resolve => setTimeout(resolve, 500));
		}).then(() => {
			ui.updatec();
			loadingScreenStyle.animationName = 'opacity-1-0';
			loadingScreen.addEventListener('animationend', animationEvent => animationEvent.target.remove());
		});
	}

	static background() {
		if (lib.config.image_background_random) {
			var list = [];
			for (var i in lib.configMenu.appearence.config.image_background.item) {
				if (i == 'default') continue;
				list.push(i);
			}
			list.remove(lib.config.image_background);
			localStorage.setItem(lib.configprefix + 'background', JSON.stringify(list));
		}
		else if (lib.config.image_background && lib.config.image_background != 'default' && !lib.config.image_background.startsWith('custom_')) {
			localStorage.setItem(lib.configprefix + 'background', lib.config.image_background);
		}
		else if (lib.config.image_background == 'default' && lib.config.theme == 'simple') {
			localStorage.setItem(lib.configprefix + 'background', 'ol_bg');
		}
		else {
			localStorage.removeItem(lib.configprefix + 'background');
		}
	}

	/**
	 * 
	 * @param {*} item 
	 * @param {Function} [scope] 作用域
	 * @returns 
	 */
	static parsex(item, scope) {
		//by 诗笺、Tipx-L
		/**
		 * @param {Function} func 
		 */
		function Legacy(func) {
			//Remove all comments
			//移除所有注释
			let str = func.toString().replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|(?:\r?\n|[\s\S])[^/"'\\\s]*)/mg, '$2').trim();
			//获取第一个 { 后的所有字符
			str = str.slice(str.indexOf('{') + 1);
			//判断代码中是否有debugger
			let regex = /event\.debugger\(\)/;
			let hasDebugger = false;
			let insertDebugger = `yield code=>eval(code);`;
			let debuggerSkip = 0;
			let debuggerResult;
			while ((debuggerResult = str.slice(debuggerSkip).match(regex)) != null) {
				let debuggerCopy = str;
				debuggerCopy = debuggerCopy.slice(0, debuggerSkip + debuggerResult.index) + insertDebugger + debuggerCopy.slice(debuggerSkip + debuggerResult.index + debuggerResult[0].length, -1);
				//测试是否有错误
				try {
					new GeneratorFunction(debuggerCopy);
					str = debuggerCopy + '}';
					debuggerSkip += debuggerResult.index + insertDebugger.length;
					hasDebugger = true;
				} catch (error) {
					debuggerSkip += debuggerResult.index + debuggerResult[0].length;
				}
			}
			//func中要写步骤的话，必须要写step 0
			if (str.indexOf('step 0') == -1) {
				str = '{if(event.step==1) {event.finish();return;}\n' + str;
			} else {
				let skip = 0;
				let k = 0;
				let result;
				//去除99个step的限制
				while ((result = str.slice(skip).match(new RegExp(`['"]step ${k}['"]`))) != null) {
					let insertStr;
					if (k == 0) {
						insertStr = `switch(step){case 0:`;
					} else {
						insertStr = `break;case ${k}:`;
					}
					let copy = str;
					copy = copy.slice(0, skip + result.index) + insertStr + copy.slice(skip + result.index + result[0].length);
					//测试是否有错误
					try {
						new (hasDebugger ? GeneratorFunction : Function)(copy);
						str = copy;
						skip += result.index + insertStr.length;
					} catch (error) {
						k--;
						skip += result.index + result[0].length;
					}
					k++;
				}
				str = `if(event.step==${k}){event.finish();return;}` + str;
			}
			if (!scope) {
				return (new (hasDebugger ? GeneratorFunction : Function)('event', 'step', 'source', 'player', 'target', 'targets',
					'card', 'cards', 'skill', 'forced', 'num', 'trigger', 'result',
					'_status', 'lib', 'game', 'ui', 'get', 'ai', str));
			} else {
				return scope(`function${hasDebugger ? '*' : ''} anonymous(event,step,source,player,target,targets,
						card,cards,skill,forced,num,trigger,result,
						_status,lib,game,ui,get,ai){${str}}; anonymous;`);
			}
		}
		switch (typeof item) {
			case "object":
				if (Array.isArray(item)) {
					let lastEvent = null;
					return function* (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai) {
						if (step >= item.length) return event.finish();
						var current = item[step];
						if (typeof current != "function") throw new Error(`content ${step} of ${event.name} is not vaild: ${current}`);
						var currentResult = current(event, {
							event: event,
							step: step,
							source: source,
							player: player,
							target: target,
							targets: targets,
							card: card,
							cards: cards,
							skill: skill,
							forced: forced,
							num: num,
							trigger: trigger,
							result: result
						}, (lastEvent && ("result" in lastEvent)) ? lastEvent.result : null);
						// TODO: use `event.debugger` to replace source
						if (gnc.is.generator(currentResult)) lastEvent = yield* currentResult;
						else lastEvent = currentResult;
					}
				}
				else {
					if (Symbol.iterator in item) return lib.init.parsex(Array.from(item));
					if (item.toString !== Object.prototype.toString) return lib.init.parsex(item.toString());
					if ("render" in item) {
						// TODO: Object Render Parse
						throw new Error("NYI: Object Render Parse");
					}
					// TODO: Object Other Parse
					throw new Error("NYI: Object Other Parse");
				}
			case "function":
				if (gnc.is.generatorFunc(item)) {
					let gen, lastEvent;
					return function* (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai) {
						event.step = NaN;
						if (!gen) gen = item(event, {
							event: event,
							step: step,
							source: source,
							player: player,
							target: target,
							targets: targets,
							card: card,
							cards: cards,
							skill: skill,
							forced: forced,
							num: num,
							trigger: trigger,
							result: result
						});
						var res = gen.next((lastEvent && ("result" in lastEvent)) ? lastEvent.result : null);
						if (res.done) return event.finish();
						var currentResult = res.value;
						// TODO: use `event.debugger` to replace source
						if (typeof currentResult == "function") yield currentResult;
						else {
							if (Array.isArray(currentResult)) {
								event.step = currentResult[1];
								currentResult = currentResult[0];
							}
							lastEvent = currentResult;
						}
					}
				} else if (item._parsed) return item;
			// falls through
			default:
				return Legacy(item);
		}
	}

	static eval(func) {
		if (typeof func == 'function') {
			return eval('(' + func.toString() + ')');
		}
		else if (typeof func == 'object') {
			for (var i in func) {
				if (Object.prototype.hasOwnProperty.call(func, i)) {
					func[i] = lib.init.eval(func[i]);
				}
			}
		}
		return func;
	}

	static encode(strUni) {
		var strUtf = strUni.replace(
			/[\u0080-\u07ff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
			});
		strUtf = strUtf.replace(
			/[\u0800-\uffff]/g, function (c) {
				var cc = c.charCodeAt(0);
				return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
			});
		return btoa(strUtf);
	}

	static decode(str) {
		var strUtf = atob(str);
		var strUni = strUtf.replace(
			/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
				var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
				return String.fromCharCode(cc);
			});
		strUni = strUni.replace(
			/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
				var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
				return String.fromCharCode(cc);
			});
		return strUni;
	}

	static stringify(obj) {
		var str = '{'
		for (var i in obj) {
			str += '"' + i + '":'
			if (Object.prototype.toString.call(obj[i]) == '[object Object]') {
				str += lib.init.stringify(obj[i]);
			}
			else if (typeof obj[i] == 'function') {
				str += obj[i].toString();
			}
			else {
				str += JSON.stringify(obj[i]);
			}
			str += ','
		}
		str += '}';
		return str;
	}

	static stringifySkill(obj) {
		var str = '';
		for (var i in obj) {
			str += i + ':'
			if (Object.prototype.toString.call(obj[i]) == '[object Object]') {
				str += '{\n' + lib.init.stringifySkill(obj[i]) + '}';
			}
			else if (typeof obj[i] == 'function') {
				str += obj[i].toString().replace(/\t/g, '');
			}
			else {
				str += JSON.stringify(obj[i]);
			}
			str += ',\n'
		}
		return str;
	}
}
