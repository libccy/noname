export class Creation {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static get array() {
		return [];
	}

	static get object() {
		return {};
	}

	static get nullObject() {
		return Object.create(null);
	}

	static get string() {
		return "";
	}
}
