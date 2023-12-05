import { animate } from "./library/animate.js";
import { cardPack } from "./library/card-pack.js";
import { cardType } from "./library/card-type.js";
import { characterFilter } from "./library/character-filter.js";
import { characterIntro } from "./library/character-intro.js";
import { characterPack } from "./library/character-pack.js";
import { characterReplace } from "./library/character-replace.js";
import { characterSort } from "./library/character-sort.js";
import { characterTitle } from "./library/character-title.js";
import { dynamicTranslate } from "./library/dynamic-translate.js";
import { element } from "./library/element.js";
import { emotionList } from "./library/emotion-list.js";
import { extensionPack } from "./library/extension-pack.js";
import { skin } from "./library/skin.js";
import { updateURLs } from "./library/update-urls.js";

const nonameInitialized = localStorage.getItem('noname_inited');

export class Library {
	static configprefix = "noname_0.9_";
	static versionOL = 27;
	static updateURLS = updateURLs;
	static updateURL = updateURLs.github;
	static mirrorURL = updateURLs.coding;
	static hallURL = "47.99.105.222";
	static assetURL = typeof nonameInitialized != 'string' || nonameInitialized == 'nodejs' ? '' : nonameInitialized;
	static userAgent = navigator.userAgent.toLowerCase();
	static compatibleEdition = Boolean(typeof nonameInitialized == 'string' && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//));
	static changeLog = [];
	static updates = [];
	static canvasUpdates = [];
	static video = [];
	static skilllist = [];
	static connectBanned = [];
	static characterIntro = characterIntro;
	static characterTitle = characterTitle;
	static characterPack = characterPack;
	static characterFilter = characterFilter;
	static characterSort = characterSort;
	static characterReplace = characterReplace;
	static characterGuozhanFilter = ["mode_guozhan"];
	static dynamicTranslate = dynamicTranslate;
	static cardPack = cardPack;
	static skin = skin;
	static onresize = [];
	static onphase = [];
	static onwash = [];
	static onover = [];
	static ondb = [];
	static ondb2 = [];
	static chatHistory = [];
	static emotionList = emotionList;
	static animate = animate;
	static onload = [];
	static onload2 = [];
	static onprepare = [];
	static arenaReady = [];
	static onfree = [];
	static inpile = [];
	static inpile_nature = [];
	static extensions = [];
	static extensionPack = extensionPack;
	static cardType = cardType;
	static element = element;

	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}
}
