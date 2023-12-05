export class Click {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
}
