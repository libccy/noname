import { DefaultSplash } from "./DefaultSplash.ts";
import { IOnloadSplash } from "./IOnloadSplash.ts";

export class WideSplash extends DefaultSplash implements IOnloadSplash {
	path = "image/splash/style2/";
}
