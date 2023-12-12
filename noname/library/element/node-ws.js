export class NodeWS {
	/**
	 * @param {string} id
	 */
	constructor(id) {
		this.wsid = id;
	}
	send(message) {
		game.send("server", "send", this.wsid, message);
	}
	on(type, func) {
		this["on" + type] = func;
	}
	close() {
		game.send("server", "close", this.wsid);
	}
}
