export class Other {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static ignore() {
	}
}
