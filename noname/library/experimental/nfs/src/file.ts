import { lib, game } from "../../../../../noname.js";
import mime from "../lib/mime.js";
import { toRelativePath } from "./util.ts";

export class NonameFile extends File {
	get [Symbol.toStringTag]() {
		return "NonameFile";
	}

	static async readFrom(url: URL, options?: FilePropertyBag): Promise<NonameFile> {
		let name = lib.path.basename(url.pathname);

		options ??= {
			type: mime.getType(name),
		};

		let address = toRelativePath(url);
		let content = await game.promises.readFile(address);

		return new this([content], name, options);
	}

	async writeTo(url: URL): Promise<number> {
		let address = toRelativePath(new URL(this.name, url));
		let name = lib.path.basename(address);
		let path = lib.path.dirname(address);

		await game.promises.writeFile(await this.arrayBuffer(), path, name);

		return this.size;
	}
}
