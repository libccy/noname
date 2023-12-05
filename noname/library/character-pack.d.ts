import { CharacterInformation } from "./character-information";

interface CharacterPack extends Record<string, Record<string, CharacterInformation>> { }

export const characterPack: CharacterPack;
