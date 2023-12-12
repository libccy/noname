export const message = {
	server: {
		init: function (version, config, banned_info) {
			if (lib.node.banned.contains(banned_info)) {
				this.send("denied", "banned");
			}
			else if (config.id && lib.playerOL && lib.playerOL[config.id]) {
				var player = lib.playerOL[config.id];
				player.setNickname();
				player.ws = this;
				player.isAuto = false;
				this.id = config.id;
				game.broadcast(function (player) {
					player.setNickname();
				}, player);
				this.send("reinit", lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, null, _status.onreconnect, _status.cardtag, _status.postReconnect);
			}
			else if (version != lib.versionOL) {
				this.send("denied", "version");
				lib.node.clients.remove(this);
				this.closed = true;
			}
			else if (!_status.waitingForPlayer) {
				if (game.phaseNumber && lib.configOL.observe) {
					lib.node.observing.push(this);
					this.send("reinit", lib.configOL, get.arenaState(), game.getState ? game.getState() : {}, game.ip, game.players[0].playerid, null, _status.cardtag);
					if (!ui.removeObserve) {
						ui.removeObserve = ui.create.system("移除旁观", function () {
							lib.configOL.observe = false;
							if (game.onlineroom) {
								game.send("server", "config", lib.configOL);
							}
							while (lib.node.observing.length) {
								lib.node.observing.shift().ws.close();
							}
							this.remove();
							delete ui.removeObserve;
						}, true, true);
					}
				}
				else {
					this.send("denied", "gaming");
					lib.node.clients.remove(this);
					this.closed = true;
				}
			}
			else if (lib.node.clients.length - (window.isNonameServer ? 1 : 0) >= parseInt(lib.configOL.number)) {
				this.send("denied", "number");
				lib.node.clients.remove(this);
				this.closed = true;
			}
			else {
				if (config) {
					this.avatar = config.avatar;
					this.nickname = config.nickname;
				}
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].classList.contains("unselectable2")) continue;
					if (game.connectPlayers[i] != game.me && !game.connectPlayers[i].playerid) {
						game.connectPlayers[i].playerid = this.id;
						game.connectPlayers[i].initOL(this.nickname, this.avatar);
						game.connectPlayers[i].ws = this;
						break;
					}
				}
				this.send("init", this.id, lib.configOL, game.ip, window.isNonameServer, game.roomId);
			}
		},
		inited: function () {
			this.inited = true;
			if (_status.waitingForPlayer) {
				game.updateWaiting();
			}
		},
		reinited: function () {
			this.inited = true;
		},
		result: function (result) {
			if (lib.node.observing.contains(this)) return;
			var player = lib.playerOL[this.id];
			if (player) {
				player.unwait(result);
			}
		},
		tempResult: function (result) {
			if (lib.node.observing.contains(this)) return;
			var player = lib.playerOL[this.id];
			if (player) {
				player.tempUnwait(result);
			}
		},
		startGame: function () {
			if (this.id == game.onlinezhu) {
				game.resume();
			}
		},
		changeRoomConfig: function (config) {
			if (this.id == game.onlinezhu) {
				game.broadcastAll(function (config) {
					for (var i in config) {
						lib.configOL[i] = config[i];
					}
					if (ui.connectStartBar) {
						ui.connectStartBar.firstChild.innerHTML = get.modetrans(lib.configOL, true);
					}
				}, config);
				if (lib.configOL.mode == "identity" && lib.configOL.identity_mode == "zhong" && game.connectPlayers) {
					for (var i = 0; i < game.connectPlayers.length; i++) {
						game.connectPlayers[i].classList.remove("unselectable2");
					}
					lib.configOL.number = 8;
					game.updateWaiting();
				}
				if (game.onlineroom) {
					game.send("server", "config", lib.configOL);
				}
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].playerid == this.id) {
						game.connectPlayers[i].chat("房间设置已更改");
					}
				}
			}
		},
		changeNumConfig: function (num, index, bool) {
			if (this.id == game.onlinezhu) {
				lib.configOL.number = num;
				game.send("server", "config", lib.configOL);
				if (game.connectPlayers && game.connectPlayers[index]) {
					if (bool) {
						game.connectPlayers[index].classList.add("unselectable2");
					}
					else {
						game.connectPlayers[index].classList.remove("unselectable2");
					}
					game.updateWaiting();
				}
			}
		},
		throwEmotion: function (target, emotion, rotate) {
			if (lib.node.observing.contains(this)) return;
			var player = lib.playerOL[this.id];
			if (player) {
				player.throwEmotion(target, emotion, rotate);
			}
		},
		emotion: function (id, pack, emotion) {
			if (lib.node.observing.contains(this)) return;
			var that = this;
			if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].playerid == that.id) {
						return true;
					}
				}
				return false;
			}()))) return;
			var player;
			if (lib.playerOL[id]) {
				player = lib.playerOL[id];
			}
			else if (game.connectPlayers) {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].playerid == id) {
						player = game.connectPlayers[i]; break;
					}
				}
			}
			if (player) player.emotion(pack, emotion);
		},
		chat: function (id, str) {
			if (lib.node.observing.contains(this)) return;
			var that = this;
			if (!this.id || (!lib.playerOL[this.id] && (!game.connectPlayers || !function () {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].playerid == that.id) {
						return true;
					}
				}
				return false;
			}()))) return;
			var player;
			if (lib.playerOL[id]) {
				player = lib.playerOL[id];
			}
			else if (game.connectPlayers) {
				for (var i = 0; i < game.connectPlayers.length; i++) {
					if (game.connectPlayers[i].playerid == id) {
						player = game.connectPlayers[i]; break;
					}
				}
			}
			if (player) player.chat(str);
		},
		giveup: function (player) {
			if (lib.node.observing.contains(this) || !player || !player._giveUp) return;
			_status.event.next.length = 0;
			game.createEvent("giveup", false).set("includeOut", true).setContent(function () {
				game.log(player, "投降");
				player.popup("投降");
				player.die("nosource").includeOut = true;
			}).player = player;
		},
		auto: function () {
			if (lib.node.observing.contains(this)) return;
			var player = lib.playerOL[this.id];
			if (player) {
				player.isAuto = true;
				player.setNickname(player.nickname + " - 托管");
				game.broadcast(function (player) {
					player.setNickname(player.nickname + " - 托管");
				}, player);
			}
		},
		unauto: function () {
			if (lib.node.observing.contains(this)) return;
			var player = lib.playerOL[this.id];
			if (player) {
				player.isAuto = false;
				player.setNickname(player.nickname);
				game.broadcast(function (player) {
					player.setNickname(player.nickname);
				}, player);
			}
		},
		exec: function (func) {
			// if(typeof func=="function"){
			//     var args=Array.from(arguments);
			//     args.shift();
			//     func.apply(this,args);
			// }
		},
		log: function () {
			var items = [];
			try {
				for (var i = 0; i < arguments.length; i++) {
					eval("items.push(" + arguments[i] + ")");
				}
			}
			catch (e) {
				this.send("log", ["err"]);
				return;
			}
			this.send("log", items);
		}
	},
	client: {
		log: function (arr) {
			if (Array.isArray(arr)) {
				for (var i = 0; i < arr.length; i++) {
					console.log(arr[i]);
				}
			}
		},
		opened: function () {
			game.send("init", lib.versionOL, {
				id: game.onlineID,
				avatar: lib.config.connect_avatar,
				nickname: get.connectNickname()
			}, lib.config.banned_info);
			if (ui.connecting && !ui.connecting.splashtimeout) {
				ui.connecting.firstChild.innerHTML = "重连成功";
			}
		},
		onconnection: id => lib.init.connection(lib.wsOL[id] = new lib.element.NodeWS(id)),
		onmessage: function (id, message) {
			if (lib.wsOL[id]) {
				lib.wsOL[id].onmessage(message);
			}
		},
		onclose: function (id) {
			if (lib.wsOL[id]) {
				lib.wsOL[id].onclose();
			}
		},
		selfclose: function () {
			if (game.online || game.onlineroom) {
				if ((game.servermode || game.onlinehall) && _status.over) {
					// later
				}
				else {
					game.saveConfig("tmp_user_roomId");
				}
			}
			game.ws.close();
		},
		reloadroom: function (forced) {
			if (window.isNonameServer && (forced || !_status.protectingroom)) {
				game.reload();
			}
		},
		createroom: function (index, config, mode) {
			game.online = false;
			game.onlineroom = true;
			game.roomId = index;
			lib.node = {};
			if (config && mode && window.isNonameServer) {
				if (mode == "auto") {
					mode = lib.configOL.mode;
				}
				game.switchMode(mode, config);
			}
			else {
				game.switchMode(lib.configOL.mode);
			}
			ui.create.connecting(true);
		},
		enterroomfailed: function () {
			alert("请稍后再试");
			_status.enteringroom = false;
			ui.create.connecting(true);
		},
		roomlist: function (list, events, clients, wsid) {
			game.send("server", "key", [game.onlineKey, lib.version]);
			game.online = true;
			game.onlinehall = true;
			lib.config.recentIP.remove(_status.ip);
			lib.config.recentIP.unshift(_status.ip);
			lib.config.recentIP.splice(5);
			if (!lib.config.reconnect_info || lib.config.reconnect_info[0] != _status.ip) {
				game.saveConfig("reconnect_info", [_status.ip, null]);
			}
			game.saveConfig("recentIP", lib.config.recentIP);
			_status.connectMode = true;

			game.clearArena();
			game.clearConnect();
			ui.pause.hide();
			ui.auto.hide();

			clearTimeout(_status.createNodeTimeout);
			game.send("server", "changeAvatar", get.connectNickname(), lib.config.connect_avatar);

			var proceed = function () {
				game.ip = get.trimip(_status.ip);
				ui.create.connectRooms(list);
				if (events) {
					ui.connectEvents = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv", "约战", ui.window, ui.click.connectEvents);
					ui.connectEventsCount = ui.create.div(".forceopaque.menubutton.icon.connectevents.highlight.hidden", "", ui.window);
					ui.connectClients = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv.left", "在线", ui.window, ui.click.connectClients);
					ui.connectClientsCount = ui.create.div(".forceopaque.menubutton.icon.connectevents.highlight.left", "1", ui.window);
					ui.createRoomButton = ui.create.div(".forceopaque.menubutton.large.connectevents.pointerdiv.left2", "创建房间", ui.window, function () {
						if (!_status.creatingroom) {
							_status.creatingroom = true;
							ui.click.connectMenu();
						}
					});
					if (events.length) {
						ui.connectEventsCount.innerHTML = events.filter(function (evt) {
							return evt.creator == game.onlineKey || !get.is.banWords(evt.content)
						}).length;
						ui.connectEventsCount.show();
					}
				}
				game.wsid = wsid;
				lib.message.client.updaterooms(list, clients);
				lib.message.client.updateevents(events);
				ui.exitroom = ui.create.system("退出房间", function () {
					game.saveConfig("tmp_owner_roomId");
					game.saveConfig("tmp_user_roomId");
					if (ui.rooms) {
						game.saveConfig("reconnect_info");
					}
					else {
						if (lib.config.reconnect_info) {
							lib.config.reconnect_info.length = 1;
							game.saveConfig("reconnect_info", lib.config.reconnect_info);
						}
					}
					game.reload();
				}, true);

				var findRoom = function (id) {
					for (var room of ui.rooms) {
						if (room.key == id) return room;
					}
					return false;
				};
				if (typeof lib.config.tmp_owner_roomId == "string") {
					if (typeof game.roomId != "string" && !findRoom(lib.config.tmp_owner_roomId)) {
						lib.configOL.mode = lib.config.connect_mode;
						game.roomId = lib.config.tmp_owner_roomId;
					}
					game.saveConfig("tmp_owner_roomId");
				}
				if (typeof lib.config.tmp_user_roomId == "string") {
					if (typeof game.roomId != "string") {
						if (findRoom(lib.config.tmp_user_roomId)) {
							game.roomId = lib.config.tmp_user_roomId;
						}
						else {
							ui.create.connecting();
							(function () {
								var n = 10;
								var id = lib.config.tmp_user_roomId;
								var interval = setInterval(function () {
									if (n > 0) {
										n--;
										if (findRoom(id)) {
											clearInterval(interval);
											game.send("server", "enter", id, get.connectNickname(), lib.config.connect_avatar);
										}
									}
									else {
										ui.create.connecting(true);
										clearInterval(interval);
									}
								}, 500);
							}());
						}
					}
					game.saveConfig("tmp_user_roomId");
				}

				if (window.isNonameServer) {
					var cfg = "pagecfg" + window.isNonameServer;
					if (lib.config[cfg]) {
						lib.configOL = lib.config[cfg][0];
						game.send("server", "server", lib.config[cfg].slice(1));
						game.saveConfig(cfg);
						_status.protectingroom = true;
						setTimeout(function () {
							_status.protectingroom = false;
							if (!lib.node || !lib.node.clients || !lib.node.clients.length) {
								game.reload();
							}
						}, 15000);
					}
					else {
						game.send("server", "server");
					}
				}
				else if (typeof game.roomId == "string") {
					var room = findRoom(game.roomId);
					if (game.roomIdServer && room && (room.serving || !room.version)) {
						console.log();
						if (lib.config.reconnect_info) {
							lib.config.reconnect_info[2] = null;
							game.saveConfig("reconnect_info", lib.config.reconnect_info);
						}
					}
					else {
						ui.create.connecting();
						game.send("server", (game.roomId == game.onlineKey) ? "create" : "enter", game.roomId, get.connectNickname(), lib.config.connect_avatar);
					}
				}
				lib.init.onfree();
			}
			if (_status.event.parent) {
				game.forceOver("noover", proceed);
			}
			else {
				proceed();
			}
		},
		updaterooms: function (list, clients) {
			if (ui.rooms) {
				var map = {}, map2 = {};
				for (var i of ui.rooms) map2[i.key] = true;
				for (var i of list) {
					if (!i) continue;
					map[i[4]] = i;
				}
				ui.window.classList.add("more_room");
				for (var i = 0; i < ui.rooms.length; i++) {
					if (!map[ui.rooms[i].key]) {
						ui.rooms[i].remove();
						ui.rooms.splice(i--, 1);
					}
					else ui.rooms[i].initRoom(list[i]);
				}
				for (var i of list) {
					if (!i) continue;
					map[i[4]] = i;
					if (!map2[i[4]]) {
						var player = ui.roombase.add(`<div class="popup text pointerdiv" style="width:calc(100% - 10px);display:inline-block;white-space:nowrap">空房间</div>`);
						player.roomindex = i;
						player.initRoom = lib.element.Player.prototype.initRoom;
						player.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.connectroom);
						player.initRoom(i);
						ui.rooms.push(player);
					}
				}
				if (!_status.requestReadClipboard && get.config("read_clipboard", "connect")) {
					const read = text => {
						try {
							var roomId = text.split("\n")[1].match(/\d+/);
							var caption = ui.rooms.find(caption => caption.key == roomId);
							if (caption && (_status.read_clipboard_text || confirm(`是否通过复制的内容加入${roomId}房间？`))) {
								ui.click.connectroom.call(caption);
								delete _status.read_clipboard_text;
							}
						} catch (e) { console.log(e) }
					}
					//每次启动只请求一次
					_status.requestReadClipboard = true;
					if (_status.read_clipboard_text) {
						read(_status.read_clipboard_text);
					} else {
						window.focus();
						if (navigator.clipboard && lib.node) {
							navigator.clipboard.readText().then(read).catch(() => void 0);
						} else {
							var input = ui.create.node("textarea", ui.window, { opacity: "0" });
							input.select();
							var result = document.execCommand("paste");
							input.blur();
							ui.window.removeChild(input);
							if (result || input.value.length > 0) read(input.value);
							else if (confirm("是否输入邀请链接以加入房间？")) {
								var text = prompt("请输入邀请链接");
								if (typeof text == "string" && text.length > 0) read(text);
							}
						}
					}
				}
			}
			lib.message.client.updateclients(clients, true);
		},
		updateclients: function (clients, bool) {
			if (clients && ui.connectClients) {
				ui.connectClients.info = clients;
				ui.connectClientsCount.innerHTML = clients.length;
			}
			if (_status.connectClientsCallback) {
				_status.connectClientsCallback();
			}
		},
		updateevents: function (events) {
			if (events && ui.connectEvents) {
				ui.connectEvents.info = events;
				var num = events.filter(function (evt) {
					return typeof evt.creator == "string" && (evt.creator == game.onlineKey || !get.is.banWords(evt.content))
				}).length;
				if (num) {
					ui.connectEventsCount.innerHTML = num;
					ui.connectEventsCount.show();
				}
				else {
					ui.connectEventsCount.hide();
				}
				if (_status.connectEventsCallback) {
					_status.connectEventsCallback();
				}
			}
		},
		eventsdenied: function (reason) {
			var str = "创建约战失败";
			if (reason == "total") {
				str += "，约战总数不能超过20";
			}
			else if (reason == "time") {
				str += "，时间已过";
			}
			else if (reason == "ban") {
				str += "，请注意文明发言";
			}
			alert(str);
		},
		init: function (id, config, ip, servermode, roomId) {
			game.online = true;
			game.onlineID = id;
			game.ip = ip;
			game.servermode = servermode;
			game.roomId = roomId;
			if (game.servermode) {
				game.saveConfig("reconnect_info", [_status.ip, id, game.roomId]);
			}
			else {
				game.saveConfig("reconnect_info", [_status.ip, id]);
				game.saveConfig("tmp_user_roomId", roomId);
			}
			lib.config.recentIP.remove(_status.ip);
			lib.config.recentIP.unshift(_status.ip);
			lib.config.recentIP.splice(5);
			game.saveConfig("recentIP", lib.config.recentIP);
			_status.connectMode = true;
			lib.configOL = config;
			lib.playerOL = {};
			lib.cardOL = {};

			game.clearArena();
			game.finishCards();
			ui.create.roomInfo();
			ui.create.chat();
			if (game.servermode) {
				ui.create.connectPlayers(get.modetrans(config, true));
			}
			else {
				ui.create.connectPlayers(ip);
			}
			ui.pause.hide();
			ui.auto.hide();
			game.clearConnect();
			clearTimeout(_status.createNodeTimeout);

			var proceed = function () {
				game.loadModeAsync(config.mode, function (mode) {
					for (var i in mode.ai) {
						if (typeof mode.ai[i] == "object") {
							if (ai[i] == undefined) ai[i] = {};
							for (var j in mode.ai[i]) {
								ai[i][j] = mode.ai[i][j];
							}
						}
						else {
							ai[i] = mode.ai[i];
						}
					}
					for (var i in mode.get) {
						if (typeof mode.get[i] == "object") {
							if (get[i] == undefined) get[i] = {};
							for (var j in mode.get[i]) {
								get[i][j] = mode.get[i][j];
							}
						}
						else {
							get[i] = mode.get[i];
						}
					}
					for (var i in mode.translate) {
						lib.translate[i] = mode.translate[i];
					}
					if (mode.game) {
						game.getIdentityList = mode.game.getIdentityList;
						game.updateState = mode.game.updateState;
						game.getRoomInfo = mode.game.getRoomInfo;
					}
					if (mode.element && mode.element.player) {
						Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
					}
					if (mode.skill) {
						for (var i in mode.skill) {
							lib.skill[i] = mode.skill[i];
						}
					}
					if (mode.card) {
						for (var i in mode.card) {
							lib.card[i] = mode.card[i];
						}
					}
					game.finishCards();
					if (mode.characterPack) {
						for (var i in mode.characterPack) {
							lib.characterPack[i] = mode.characterPack[i];
						}
					}
					_status.event = lib.element.GameEvent.initialGameEvent();
					_status.paused = false;
					game.createEvent("game", false).setContent(lib.init.startOnline);
					game.loop();
					game.send("inited");
					ui.create.connecting(true);
				});
			}
			if (_status.event.parent) {
				game.forceOver("noover", proceed);
			}
			else {
				proceed();
			}
			for (var i in lib.characterPack) {
				for (var j in lib.characterPack[i]) {
					lib.character[j] = lib.character[j] || lib.characterPack[i][j];
				}
			}
		},
		reinit: function (config, state, state2, ip, observe, onreconnect, cardtag, postReconnect) {
			ui.auto.show();
			ui.pause.show();
			game.clearConnect();
			clearTimeout(_status.createNodeTimeout);
			game.online = true;
			game.ip = ip;
			game.servermode = state.servermode;
			game.roomId = state.roomId;
			if (state.over) {
				_status.over = true;
			}
			if (observe) {
				game.observe = true;
				game.onlineID = null;
				game.roomId = null;
			}
			if (game.servermode && !observe) {
				game.saveConfig("reconnect_info", [_status.ip, game.onlineID, game.roomId]);
			}
			else {
				game.saveConfig("reconnect_info", [_status.ip, game.onlineID]);
				if (!observe) {
					game.saveConfig("tmp_user_roomId", game.roomId);
				}
			}
			_status.connectMode = true;
			lib.configOL = config;
			lib.playerOL = {};
			lib.cardOL = {};

			game.loadModeAsync(config.mode, function (mode) {
				for (var i in mode.ai) {
					if (typeof mode.ai[i] == "object") {
						if (ai[i] == undefined) ai[i] = {};
						for (var j in mode.ai[i]) {
							ai[i][j] = mode.ai[i][j];
						}
					}
					else {
						ai[i] = mode.ai[i];
					}
				}
				for (var i in mode.get) {
					if (typeof mode.get[i] == "object") {
						if (get[i] == undefined) get[i] = {};
						for (var j in mode.get[i]) {
							get[i][j] = mode.get[i][j];
						}
					}
					else {
						get[i] = mode.get[i];
					}
				}
				for (var i in mode.translate) {
					lib.translate[i] = mode.translate[i];
				}
				if (mode.game) {
					game.getIdentityList = mode.game.getIdentityList;
					game.getIdentityList2 = mode.game.getIdentityList2;
					game.updateState = mode.game.updateState;
					game.showIdentity = mode.game.showIdentity;
				}
				if (mode.element && mode.element.player) {
					Object.defineProperties(lib.element.Player.prototype, Object.getOwnPropertyDescriptors(mode.element.player));
				}
				if (mode.skill) {
					for (var i in mode.skill) {
						lib.skill[i] = mode.skill[i];
					}
				}
				if (mode.card) {
					for (var i in mode.card) {
						lib.card[i] = mode.card[i];
					}
				}
				game.finishCards();
				if (mode.characterPack) {
					for (var i in mode.characterPack) {
						lib.characterPack[i] = mode.characterPack[i];
					}
				}
				if (mode.onreinit) {
					mode.onreinit();
				}
				_status.cardtag = get.parsedResult(cardtag);
				game.players = [];
				game.dead = [];
				for (var i in lib.characterPack) {
					for (var j in lib.characterPack[i]) {
						lib.character[j] = lib.character[j] || lib.characterPack[i][j];
					}
				}
				game.clearArena();
				game.finishCards();
				if (!observe) {
					ui.create.chat();
					if (ui.exitroom) {
						ui.exitroom.remove();
						delete ui.exitroom;
					}
				}
				else {
					if (!ui.exitroom) {
						ui.create.system("退出旁观", function () {
							game.saveConfig("reconnect_info");
							game.reload();
						}, true);
					}
					if (!lib.configOL.observe_handcard) {
						ui.arena.classList.add("observe");
					}
				}
				postReconnect = get.parsedResult(postReconnect);
				for (var i in postReconnect) {
					if (Array.isArray(postReconnect[i])) {
						postReconnect[i].shift().apply(this, postReconnect[i]);
					}
				}
				state = get.parsedResult(state);
				ui.arena.setNumber(state.number);
				_status.mode = state.mode;
				_status.renku = state.renku;
				lib.inpile = state.inpile;
				lib.inpile_nature = state.inpile_nature;
				var pos = state.players[observe || game.onlineID].position;
				for (var i in state.players) {
					var info = state.players[i];
					var player = ui.create.player(ui.arena).animate("start");
					player.dataset.position = (info.position < pos) ? info.position - pos + parseInt(state.number) : info.position - pos;
					if (i == observe || i == game.onlineID) {
						game.me = player;
					}
					if (player.setModeState) {
						player.setModeState(info);
					}
					else {
						player.init(info.name1, info.name2);
						if (info.name && info.name != info.name1) player.name = info.name;
					}
					if (!info.unseen) player.classList.remove("unseen");
					if (!info.unseen2) player.classList.remove("unseen2");
					if (!player.isUnseen(2) && player.storage.nohp) {
						delete player.storage.nohp;
						player.node.hp.show();
					}
					player.playerid = i;
					player.nickname = info.nickname;
					player.changeGroup(info.group, false, "nobroadcast");
					player.identity = info.identity;
					player.identityShown = info.identityShown;
					player.hp = info.hp;
					player.maxHp = info.maxHp;
					player.hujia = info.hujia;
					player.sex = info.sex;
					player.side = info.side;
					player.phaseNumber = info.phaseNumber;
					player.seatNum = info.seatNum;
					player.disabledSlots = info.disabledSlots;
					player.expandedSlots = info.expandedSlots;
					player.setNickname();
					if (info.dead) {
						player.classList.add("dead");
						if (lib.config.die_move) {
							player.$dieflip();
						}
						if (player.$dieAfter) {
							player.$dieAfter();
						}
						game.dead.push(player);
					}
					else {
						game.players.push(player);
					}
					if (info.linked) {
						player.addLink();
					}
					if (info.turnedover) {
						player.classList.add("turnedover");
					}
					if (info.out) {
						player.classList.add("out");
					}
					if (info.disableJudge) {
						player.$disableJudge();
					}
					player.$syncDisable();

					player.directgain(info.handcards);
					lib.playerOL[i] = player;
					for (var i = 0; i < info.equips.length; i++) {
						player.$equip(info.equips[i]);
					}
					for (var i = 0; i < info.handcards.length; i++) {
						info.handcards[i].addGaintag(info.gaintag[i]);
					}
					for (var i = 0; i < info.specials.length; i++) {
						info.specials[i].classList.add("glows");
					}
					if (info.expansions.length) {
						var expansion_gaintag = [];
						player.$addToExpansion(info.expansions);
						for (var i = 0; i < info.expansions.length; i++) {
							info.expansions[i].addGaintag(info.expansion_gaintag[i]);
							expansion_gaintag.addArray(info.expansion_gaintag[i]);
						}
						for (var i of expansion_gaintag) player.markSkill[i];
					}
					for (var i = 0; i < info.judges.length; i++) {
						if (info.views[i] && info.views[i] != info.judges[i]) {
							info.judges[i].classList.add("fakejudge");
							info.judges[i].viewAs = info.views[i];
							info.judges[i].node.background.innerHTML = lib.translate[info.views[i] + "_bg"] || get.translation(info.views[i])[0]
						}
						player.node.judges.appendChild(info.judges[i]);
					}
					ui.updatej(player);
					if (!player.setModeState) {
						if (!game.getIdentityList && info.identityNode) {
							player.node.identity.innerHTML = info.identityNode[0];
							player.node.identity.dataset.color = info.identityNode[1];
						}
						else if (player == game.me || player.identityShown || observe) {
							player.setIdentity();
							player.forceShown = true;
						}
						else {
							player.setIdentity("cai");
						}
						if (!lib.configOL.observe_handcard && (lib.configOL.mode == "identity" || lib.configOL.mode == "guozhan")) {
							if (observe && !player.identityShown) {
								player.setIdentity("cai");
								player.forceShown = false;
							}
						}
					}
					player.update();
				}
				game.arrangePlayers();
				ui.create.me(true);

				_status.event = lib.element.GameEvent.initialGameEvent();
				_status.paused = false;
				_status.dying = get.parsedResult(state.dying) || [];

				if (game.updateState) {
					game.updateState(state2);
				}
				var next = game.createEvent("game", false);
				next.setContent(lib.init.startOnline);
				if (observe) {
					next.custom.replace.target = function (player) {
						if (!lib.configOL.observe_handcard && lib.configOL.mode == "guozhan") {
							return;
						}
						if (player.isAlive()) {
							if (!game.me.identityShown && lib.configOL.mode == "guozhan") {
								game.me.node.identity.firstChild.innerHTML = "猜";
								game.me.node.identity.dataset.color = "unknown";
							}
							game.swapPlayer(player);
							if (!game.me.identityShown && lib.configOL.mode == "guozhan") {
								game.me.node.identity.firstChild.innerHTML = "";
							}
						}
					}
				}
				else {
					if (Array.isArray(onreconnect)) {
						onreconnect.shift().apply(this, onreconnect);
					}
				}
				game.loop();
				game.send("reinited");
				game.showHistory();
				_status.gameStarted = true;
				if (lib.config.show_cardpile) {
					ui.cardPileButton.style.display = "";
				}
				if (!observe && game.me && (game.me.isDead() || _status.over)) {
					ui.create.exit();
				}
				ui.updatehl();
				ui.create.connecting(true);
			});
		},
		exec: function (func) {
			var key = game.onlineKey;
			if (typeof func == "function") {
				var args = Array.from(arguments);
				args.shift();
				func.apply(this, args);
			}
			if (key) {
				game.onlineKey = key;
				localStorage.setItem(lib.configprefix + "key", game.onlineKey);
			}
		},
		denied: function (reason) {
			switch (reason) {
				case "version":
					alert("加入失败：版本不匹配，请将游戏更新至最新版");
					game.saveConfig("tmp_owner_roomId");
					game.saveConfig("tmp_user_roomId");
					game.saveConfig("reconnect_info");
					break;
				case "gaming": alert("加入失败：游戏已开始"); break;
				case "number": alert("加入失败：房间已满"); break;
				case "banned": alert("加入失败：房间拒绝你加入"); break;
				case "key":
					alert("您的游戏版本过低，请升级到最新版");
					game.saveConfig("tmp_owner_roomId");
					game.saveConfig("tmp_user_roomId");
					game.saveConfig("reconnect_info");
					break;
				case "offline":
					if (_status.paused && _status.event.name == "game") {
						setTimeout(game.resume, 500);
					}
					break;
			}
			game.ws.close();
			if (_status.connectDenied) {
				_status.connectDenied();
			}
		},
		cancel: function (id) {
			if (_status.event._parent_id == id) {
				ui.click.cancel();
			}
			if (_status.event.id == id) {
				if (_status.event._backup) ui.click.cancel();
				ui.click.cancel();
				if (ui.confirm) {
					ui.confirm.close();
				}
				if (_status.event.result) {
					_status.event.result.id = id;
				}
			}
		},
		closeDialog: function (id) {
			var dialog = get.idDialog(id);
			if (dialog) {
				dialog.close();
			}
		},
		createDialog: function (id) {
			var args = Array.from(arguments);
			args.shift();
			ui.create.dialog.apply(this, args).videoId = id;
		},
		gameStart: function () {
			for (var i = 0; i < game.connectPlayers.length; i++) {
				game.connectPlayers[i].delete();
			}
			delete game.connectPlayers;
			if (ui.connectStartButton) {
				ui.connectStartButton.delete();
				delete ui.connectStartButton;
			}
			if (ui.connectStartBar) {
				ui.connectStartBar.delete();
				delete ui.connectStartBar;
			}
			if (ui.connectShareButton) {
				ui.connectShareButton.delete();
				delete ui.connectShareButton;
			}
			if (ui.roomInfo) {
				ui.roomInfo.remove();
				delete ui.roomInfo;
			}
			if (ui.exitroom) {
				ui.exitroom.remove();
				delete ui.exitroom;
			}
			ui.auto.show();
			ui.pause.show();
			if (lib.config.show_cardpile) {
				ui.cardPileButton.style.display = "";
			}
			_status.gameStarted = true;
			game.showHistory();
		},
		updateWaiting: function (map) {
			if (!game.connectPlayers) return;
			if (!lib.translate.zhu) {
				lib.translate.zhu = "主";
			}
			game.onlinezhu = false;
			_status.waitingForPlayer = true;
			for (var i = 0; i < map.length; i++) {
				if (map[i] == "disabled") {
					game.connectPlayers[i].classList.add("unselectable2");
				}
				else {
					game.connectPlayers[i].classList.remove("unselectable2");
					if (map[i]) {
						game.connectPlayers[i].initOL(map[i][0], map[i][1]);
						game.connectPlayers[i].playerid = map[i][2];
						if (map[i][3] == "zhu") {
							game.connectPlayers[i].setIdentity("zhu");
							if (map[i][2] == game.onlineID) {
								game.onlinezhu = true;
								if (ui.roomInfo) {
									ui.roomInfo.innerHTML = "房间设置";
								}
								if (ui.connectStartButton) {
									ui.connectStartButton.innerHTML = "开始游戏";
								}
							}
						}
						else {
							game.connectPlayers[i].node.identity.firstChild.innerHTML = "";
						}
					}
					else {
						game.connectPlayers[i].uninitOL();
						delete game.connectPlayers[i].playerid;
					}
				}
			}
		}
	}
};
