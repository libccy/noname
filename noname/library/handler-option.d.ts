export interface HandlerOption extends Record<string, unknown> {
	state: "begin" | "end";
}
