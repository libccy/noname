import { lib, game } from "../../../../../noname.js";
import { NonameFile } from "./file.ts";
import { toRelativePath } from "./util.ts";

export class NonamePath {
	#name: string;
	#contents: (NonameFile | NonamePath)[];

	constructor(contents: (NonameFile | NonamePath)[], name: string) {
		this.#name = name;
		this.#contents = contents;
	}

	get [Symbol.toStringTag]() {
		return "NonamePath";
	}

	get name() {
		return this.#name;
	}

	get contents() {
		return this.#contents.slice(0);
	}

	static async readFrom(url: URL) {
		let name = lib.path.basename(url.pathname);
		let address = toRelativePath(url);

		let [folders, files] = await game.promises.getFileList(address);

		let result: (NonameFile | NonamePath)[] = [];

		for (let folder of folders) {
			result.add(await NonamePath.readFrom(new URL(`./${folder}/`, url)));
		}
		for (let file of files) {
			result.add(await NonameFile.readFrom(new URL(file, url)));
		}

		return new this(result, name);
	}

	add(content: NonameFile | NonamePath) {
		this.#contents.add(content);
		return this;
	}

	async writeTo(url: URL) {
		let base = new URL(`./${this.#name}/`, url);
		let address = toRelativePath(base);
		await game.promises.createDir(address);

		for (let item of this.#contents) {
			await item.writeTo(base);
		}

		return this.#contents.length;
	}
}
