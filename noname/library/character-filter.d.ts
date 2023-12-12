interface CharacterFilter extends Record<string, (mode: string) => boolean> {
}

export const characterFilter: CharacterFilter;
