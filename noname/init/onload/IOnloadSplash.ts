export interface IOnloadSplash {
	init(node: HTMLDivElement, resolve: (mode: string) => void): Promise<void>;

	dispose(node: HTMLDivElement): Promise<void>;
}
