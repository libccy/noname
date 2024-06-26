export interface IOnloadSplash {
	id: string;
	name: string;

	init(node: HTMLDivElement, resolve: (mode: string) => void): Promise<void>;

	dispose(node: HTMLDivElement): Promise<void>;
}
