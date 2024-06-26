import { DefaultSplash } from "./DefaultSplash.ts";
import { IOnloadSplash } from "./IOnloadSplash.ts";

export class WideSplash extends DefaultSplash implements IOnloadSplash {
	id = "style2";
	name = "样式二";

	path = "image/splash/style2/";
}
