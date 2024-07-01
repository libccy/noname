import { IOnloadSplash } from "./IOnloadSplash";

export class WideSplash extends DefaultSplash implements IOnloadSplash {
	readonly id: string;
	readonly name: string;

	protected path: string;
}
