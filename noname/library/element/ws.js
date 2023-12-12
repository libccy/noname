export class WS {
	static onopen() {
		if (_status.connectCallback) {
			_status.connectCallback(true);
			delete _status.connectCallback;
		}
	}

	static onmessage(messageevent) {
		if (messageevent.data == "heartbeat") {
			this.send("heartbeat");
			return;
		}
		var message;
		try {
			message = JSON.parse(messageevent.data);
			if (!Array.isArray(message) ||
				typeof lib.message.client[message[0]] !== "function") {
				throw ("err");
			}
			for (var i = 1; i < message.length; i++) {
				message[i] = get.parsedResult(message[i]);
			}
		}
		catch (e) {
			console.log(e);
			console.log("invalid message: " + messageevent.data);
			return;
		}
		lib.message.client[message.shift()].apply(null, message);
	}

	static onerror(e) {
		if (this._nocallback) return;
		if (_status.connectCallback) {
			_status.connectCallback(false);
			delete _status.connectCallback;
		}
		else {
			alert("连接失败");
		}
	}

	static onclose() {
		if (this._nocallback) return;
		if (_status.connectCallback) {
			_status.connectCallback(false);
			delete _status.connectCallback;
		}
		if (game.online || game.onlineroom) {
			if ((game.servermode || game.onlinehall) && _status.over) {
				void 0;
			}
			else {
				localStorage.setItem(lib.configprefix + "directstart", true);
				game.reload();
			}
		}
		game.online = false;
		game.ws = null;
	}
}