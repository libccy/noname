interface Configuration extends Record<string, any> {
	extension_sources: Record<string, string>;
	favouriteCharacter: string[];
}

export const configuration: Configuration;
