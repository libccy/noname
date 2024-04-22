import { lib, game } from "../../../../../noname.js";
import { toRelativePath } from "./util.ts";

export class NonameFile extends File {
	static async readFrom(url: URL, options?: FilePropertyBag): Promise<NonameFile> {
		let address = toRelativePath(url);
		let content = await game.promises.readFile(address);
		let name = lib.path.basename(url.pathname);

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
