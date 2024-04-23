import { rootURL, lib } from "../../../../../noname.js";

export function toRelativePath(url: URL): string {
	let base = lib.path.relative(decodeURI(rootURL.pathname), decodeURI(url.pathname)).slice(3);
	if (rootURL.protocol == "file:" && lib.device) {
		base = `${lib.assetURL}${base}`;
	}
	return base;
}
