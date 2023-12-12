import { CharacterInformation } from "./character-information.js";

interface CharacterPack extends Record<string, Record<string, CharacterInformation>> {
}

export const characterPack: CharacterPack;
