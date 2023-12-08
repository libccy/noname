import { animate } from "./library/animate.js";
import { announce } from "./library/announce.js";
import { cardPack } from "./library/card-pack.js";
import { cardType } from "./library/card-type.js";
import { Channel } from "./library/channel.js";
import { CharacterDialogGroup } from "./library/character-dialog-group.js";
import { characterFilter } from "./library/character-filter.js";
import { characterIntro } from "./library/character-intro.js";
import { characterPack } from "./library/character-pack.js";
import { characterReplace } from "./library/character-replace.js";
import { characterSort } from "./library/character-sort.js";
import { characterTitle } from "./library/character-title.js";
import { CONFIGURATION_MENU } from "./library/configuration-menu.js";
import { dynamicTranslate } from "./library/dynamic-translate.js";
import { element } from "./library/element.js";
import { emotionList } from "./library/emotion-list.js";
import { extensionMenu } from "./library/extension-menu.js";
import { extensionPack } from "./library/extension-pack.js";
import { hookMap } from "./library/hook-map.js";
import { hook } from "./library/hook.js";
import { hooks } from "./library/hooks.js";
import { imported } from "./library/imported.js";
import { pinyins } from "./library/pinyins.js";
import { skin } from "./library/skin.js";
import { stratagemBuff } from "./library/stratagem-buff.js";
import { updateURLs } from "./library/update-urls.js";
import { yingbian } from "./library/yingbian.js";

const nonameInitialized = localStorage.getItem("noname_inited");

export class Library {
	static configprefix = "noname_0.9_";
	static versionOL = 27;
	static updateURLS = updateURLs;
	static updateURL = updateURLs.github;
	static mirrorURL = updateURLs.coding;
	static hallURL = "47.99.105.222";
	static assetURL = typeof nonameInitialized != "string" || nonameInitialized == "nodejs" ? "" : nonameInitialized;
	static userAgent = navigator.userAgent.toLowerCase();
	static compatibleEdition = Boolean(typeof nonameInitialized == "string" && nonameInitialized.match(/\/(?:com\.widget|yuri\.nakamura)\.noname\//));
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
	static hook = hook;
	static hooks = hooks;
	static element = element;
	static Channel = Channel;
	/**
	 * @todo Waiting for [Rintim](https://github.com/Rintim)’s pull request.
	 */
	static announce = announce;
	/**
	 * @type {Map<string, string>}
	 */
	static objectURL = new Map();
	static hookmap = hookMap;
	static imported = imported;
	static layoutfixed = ["chess", "tafang", "stone"];
	static pinyins = pinyins;
	static yingbian = yingbian;
	static stratagemBuff = stratagemBuff;
	/**
	 * The actual card name
	 * 
	 * 实际的卡牌名称
	 */
	static actualCardName = new Map([
		["挟令", "挟天子以令诸侯"],
		["霹雳投石车", "霹雳车"]
	])
	static characterDialogGroup = CharacterDialogGroup;
	static configMenu = CONFIGURATION_MENU;
	static extensionMenu = extensionMenu;

	constructor() {
		throw new TypeError(`${new.target.name} is not a constructor`);
	}

	static listenEnd(node) {
		if (!node._listeningEnd) {
			node._listeningEnd = true;
			node.listenTransition(function () {
				delete node._listeningEnd;
				if (node._onEndMoveDelete) {
					node.moveDelete(node._onEndMoveDelete);
				}
				else if (node._onEndDelete) {
					node.delete();
				}
				node._transitionEnded = true;
			});
		}
	}
}
