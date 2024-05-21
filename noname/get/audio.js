import { lib } from "../library/index.js";
import { get } from "./index.js";

/**
 * @typedef { (string | number | boolean)[] | string | number | boolean } audioInfo
 * @typedef { {
 *     name: string,
 *     file: string,
 *     text: string | undefined,
 *     type: string,
 * } } textMap
 */
export class Audio {
    /**
     * @type { { [key: string]: textMap[] } }
     */
    #Cache = {};

    /**
     * 根据skill中的audio,audioname,audioname2和player来获取技能台词列表及其对应的源文件名
     * @typedef {{audio: audioInfo, audioname?: string[], audioname2?: {[playerName: string]: audioInfo}}} skillInfo
     * @param { object } options
     * @param { string } options.skill 技能名
     * @param { Player | string } [options.player] 角色/角色名
     * @param { audioInfo | skillInfo } [options.info] 使用指定的skillInfo/audioInfo
     * @param { audioInfo } [options.defaultInfo] 默认的audioInfo
     * @returns { textMap[] }
     */
    skill({ skill, player, info, defaultInfo = [true, 2] }) {
        if (skill === void 0) {
            console.error(new ReferenceError(`skill is not defined`));
            return [];
        }
        //@ts-ignore
        if (typeof player === "string") player = get.convertedCharacter({ name: player });
        //@ts-ignore
        else if (typeof player !== "object" || player === null) player = get.convertedCharacter({ isNull: true });

        if (info !== void 0 && info !== null && (typeof info !== "object" || Array.isArray(info))) info = { audio: info };

        const data = {
            audioname: []
        };

        const options = {
            type: "skill",
            defaultPath: "skill",
            defaultInfo,
        };

        const getInfo = name => get.info(name);
        const isExist = name => get.info(name);
        const getAudioInfo = (name, info, data, options) => {
            let audioInfo = info.audio;
            if (Array.isArray(info.audioname)) data.audioname.addArray(info.audioname);
            data._audioname = getName(i => data.audioname.includes(i));
            if (info.audioname2) audioInfo = info.audioname2[getName(i => info.audioname2[i])] || audioInfo;
            return { audioInfo, isDefault: false };
        }

        const getName = filter => {
            //@ts-ignore
            const tempname = (player.tempname || []).find(i => filter(i));
            if (tempname) return name;
            //@ts-ignore
            for (const name of [player.name, player.name1, player.name2]) {
                if (filter(name)) return name;
                const tempname = get.character(name).tempname.find(i => filter(i));
                if (tempname) return tempname;
            }
        }

        return this.#parse({ name: skill, info, data, options, getInfo, isExist, getAudioInfo });
    }

    /**
     * 获取角色死亡时能播放的所有阵亡台词列表及其对应的源文件名
     * @param { object } options
     * @param { Player | string } options.player 角色/角色名
     * @param { audioInfo } [options.info] 使用指定的audioInfo
     * @param { audioInfo } [options.defaultInfo] 默认的audioInfo
     * @returns { textMap[] } 
     */
    die({ player, info, defaultInfo = true }) {
        if (player === void 0) {
            console.error(new ReferenceError(`player is not defined`));
            return [];
        }
        let name = typeof player === "string" ? player : player.name;
        let skinInfo;
        if (info) skinInfo = { dieAudios: info };
        else if (typeof player !== "string" && player.skin && player.skin.name) {
            const skinName = player.skin.name;
            if (skinName !== name && lib.characterSubstitute[name]) {
                const skin = lib.characterSubstitute[name].find(i => i[0] === skinName);
                if (skin) {
                    skinInfo = get.convertedCharacter(["", "", 0, [], skin[1]]);
                    name = skinName;
                }
            }
        }

        const options = {
            type: "die",
            defaultPath: "die",
            defaultInfo,
        };

        const getInfo = name => get.character(name);
        const isExist = name => !get.character(name).isNull;
        const getAudioInfo = (name, info, data, options) => {
            let audioInfo = info.dieAudios;
            if (audioInfo.length === 0) audioInfo = void 0;
            return { audioInfo, isDefault: false };
        }

        return this.#parse({ name, info: skinInfo, options, getInfo, isExist, getAudioInfo });
    }

    /**
     * @this {typeof get.Audio}
     * @returns { textMap[] } 
     */
    #parse = function ({ name, info, data: originData = {}, options, getInfo, isExist, getAudioInfo }) {
        const { type, defaultPath } = options;
        originData.history = [];

        const check = (name, history) => {
            if (!isExist(name)) return false;
            if (!history.includes(name)) return true;
            if (history[0] === name) return false;
            //deadlock
            throw new RangeError(`parseAudio: ${name} in ${history} forms a deadlock`);
        }

        const getInfoAudio = (name, data, { info = void 0, defaultInfo = options.defaultInfo } = {},) => {
            data = JSON.parse(JSON.stringify(data));

            if (info === void 0 || info === null) {
                if (!check(name, data.history)) {
                    // console.warn(`parse: Cannot find ${name} when parsing ${type} audio.`);
                    return parseAudioWithCache(name, defaultInfo, data, true);
                }
                data.history.unshift(name);
                info = getInfo(name);
            }

            const { audioInfo, isDefault } = getAudioInfo(name, info, data, options);
            if (isDefault || audioInfo === null || audioInfo === void 0)
                return parseAudioWithCache(name, defaultInfo, data, true);

            return parseAudioWithCache(name, audioInfo, data);
        }

        const parseAudioWithCache = (name, audioInfo, data, isDefault = false) => {
            const key = this.#getCacheKey(options, name, audioInfo, data);
            const result = this.#Cache[key];
            if (result !== void 0) return this.#copy(result);
            else {
                const result = parseAudio(name, audioInfo, data);
                if (isDefault && name.includes("_")) {
                    name = name.slice(name.indexOf("_") + 1);
                    result.alternate = getInfoAudio(name, originData);
                }
                this.#Cache[key] = result;
                return this.#copy(result);
            }
        }

        const parseAudio = (name, audioInfo, data) => {
            if (Array.isArray(audioInfo)) {
                if (type === "skill") {//skill的屎山
                    if (audioInfo.length === 2 && typeof audioInfo[0] === "string" && typeof audioInfo[1] === "number") {
                        const [newName, number] = audioInfo;
                        return getInfoAudio(newName, data, { defaultInfo: number }).slice(0, number);
                    }
                }
                const map = {};
                audioInfo.forEach(info => {
                    parseAudio(name, info, data).forEach(i => (map[i.name] = i));
                });
                return Object.values(map);
            }


            audioInfo = String(audioInfo);

            if (audioInfo === "false") return [];

            if (["data:", "blob:"].some(prefix => audioInfo.startsWith(prefix))) {
                return [this.#textMap({ path: "", name: audioInfo, ext: "", type, defaultPath })];
            }

            const list = audioInfo.match(/(?:(.*):|^)(true|\d+)(?::(.*)|$)/); // [path, number|true, ext]
            if (list) {
                let [, path = defaultPath, audioNum, ext = "mp3"] = list;
                path = path + "/";
                ext = "." + ext;
                const { _audioname } = data;
                if (_audioname) name += "_" + _audioname;

                if (audioNum === "true") return [this.#textMap({ path, name, ext, type, defaultPath })];
                const audioList = [];
                audioNum = parseInt(audioNum);
                for (let i = 1; i <= audioNum; i++) {
                    audioList.push(this.#textMap({ path, name: name + i, ext, type, defaultPath }));
                }
                return audioList;
            }

            let path = defaultPath + "/";
            const pathIndex = audioInfo.lastIndexOf("/");
            if (pathIndex !== -1) {
                path = audioInfo.slice(0, pathIndex);
                audioInfo = audioInfo.slice(pathIndex);
                if (!["db:", "ext:"].some(i => audioInfo.startsWith(i))) path = defaultPath + "/" + path;
            }

            let ext = ".mp3";
            const extIndex = audioInfo.lastIndexOf(".");
            if (extIndex !== -1) {
                ext = audioInfo.slice(extIndex);
                audioInfo = audioInfo.slice(0, extIndex);
            }

            if (pathIndex === -1 && extIndex === -1) return getInfoAudio(audioInfo, data);
            return [this.#textMap({ path, name: audioInfo, ext, type, defaultPath })];
        }

        return getInfoAudio(name, originData, { info });
    }

    /**
     * @this {typeof get.Audio}
     */
    #getCacheKey = function (options, name, audioInfo, data) {
        const key = { name, audioInfo, ...options };
        for (const i in data) {
            const type = typeof data[i];
            if (type !== 'object' && type !== 'function' || data[i] === null) key[i] = data[i];
        }
        return JSON.stringify(key);
    }

    /**
     * @this {typeof get.Audio}
     * @returns {textMap}
     */
    #textMap = function ({ path, name, ext, type, defaultPath }) {
        const suffix = type === "skill" ? "" : ":" + type; //skill的屎山
        const translatePath = path.startsWith(defaultPath + "/") ? path.slice(defaultPath.length + 1) : path;
        return {
            name: translatePath + name,
            file: path + name + ext,
            text: lib.translate[`#${translatePath}${name}${suffix}`],
            type,
        }
    }

    /**
     * @param {textMap[]} list
     * @this {typeof get.Audio}
     * @returns {textMap[]}
     */
    #copy = function (list) {
        const result = JSON.parse(JSON.stringify(list));
        //@ts-ignore
        if (list.alternate) result.alternate = this.#copy(list.alternate);
        return result;
    }

    /**
     * @param {textMap[]} list
     * @returns {string[]}
     */
    toFile(list) {
        return (function getResult(textMap) {
            const result = textMap.map(data => data.file);
            //@ts-ignore
            if (textMap.alternate) result.alternate = getResult(textMap.alternate);
            return result;
        })(list);
    }

    /**
     * @param {textMap[]} list
     * @returns {string[]}
     */
    toText(list) {
        return (function getResult(textMap) {
            const result = textMap.map(data => data.text).filter(text => text !== void 0);
            //@ts-ignore
            if (textMap.alternate) result.alternate = getResult(textMap.alternate);
            return result;
        })(list);
    }

}