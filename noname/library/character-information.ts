type CharacterSex = "double" | "female" | "male" | "none" | "unknown" | string & {};
type CharacterGroup = "wei" | "shu" | "wu" | "qun" | "jin";
type CharacterHP = number | `${number}/${number}` | `${number}/${number}/${number}`;
export type CharacterInformation = [CharacterSex, CharacterGroup, CharacterHP, string[], string[]?];
