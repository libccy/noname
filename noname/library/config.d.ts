interface Config extends Record<string, any> {
	extension_sources: Record<string, string>;
	favouriteCharacter: string[];
}

export const config: Config;
