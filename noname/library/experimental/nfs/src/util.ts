import { rootURL, lib } from "../../../../../noname.js";

export function toRelativePath(url: URL): string {
	let base = lib.path.relative(rootURL.pathname, url.pathname).slice(3);
	if (rootURL.protocol == "file:" && lib.device) {
		base = `${lib.assetURL}${base}`;
	}
	return base;
}
