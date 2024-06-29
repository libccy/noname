export interface IOnloadSplash {
	readonly id: string;
	readonly name: string;

	init(node: HTMLDivElement, resolve: (mode: string) => void): void | Promise<void>;

	dispose(node: HTMLDivElement): void | Promise<void>;

	preview(node: HTMLDivElement): void | Promise<void>;
}
