import { nonMedial } from "./metadata/non-medial.js";
import { rhyme } from "./metadata/rhyme.js";

export const pinyinsMetadata = {
	shengmu: ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "l", "n", "g", "k", "h", "j", "q", "x", "r", "z", "c", "s", "y", "w"],
	special_shengmu: ["j", "q", "x", "y"],
	feijiemu: nonMedial,
	zhengtirendu: ["zhi", "chi", "shi", "ri", "zi", "ci", "si"],
	yunjiao: rhyme
};
