export class Game {
	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
}
