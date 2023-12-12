export class Comparator {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static equals() {
		if (arguments.length == 0) return false;
		if (arguments.length == 1) return true;
		for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return false;
		return true;
	}

	static equalAny() {
		if (arguments.length == 0) return false;
		if (arguments.length == 1) return true;
		for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return true;
		return false;
	}

	static notEquals() {
		if (arguments.length == 0) return false;
		if (arguments.length == 1) return true;
		for (let i = 1; i < arguments.length; ++i) if (arguments[i] === arguments[0]) return false;
		return true;
	}

	static notEqualAny() {
		if (arguments.length == 0) return false;
		if (arguments.length == 1) return true;
		for (let i = 1; i < arguments.length; ++i) if (arguments[i] !== arguments[0]) return true;
		return false;
	}

	static typeEquals() {
		if (arguments.length == 0) return false;
		if (arguments.length == 1) return arguments[0] !== null;
		const type = typeof arguments[0];
		for (let i = 1; i < arguments.length; ++i) if (type !== arguments[i]) return false;
		return true;
	}
}
