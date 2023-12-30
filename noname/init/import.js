import { Game as game } from '../game/index.js';

/**
 * @param {string} name - 卡牌包名
 */
export const importCardPack = generateImportFunction('card', (name) => `../../card/${name}.js`)

/**
 * @param {string} name - 武将包名
 */
export const importCharacterPack = generateImportFunction('character', (name) => `../../character/${name}.js`)

/**
 * @param {string} name - 扩展名
 */
export const importExtension = generateImportFunction('extension', (name) => `../../extension/${name}/extension.js`)

/**
 * @param {string} name - 模式名 
 */
export const importMode = generateImportFunction('mode', (name) => `../../mode/${name}.js`)

/**
 * 生成导入
 * 
 * @param {string} type 
 * @param {(name: string) => string} pathParser 
 * @returns {(name: string) => Promise<void>}
 */
function generateImportFunction(type, pathParser) {
	return async function (name) {
		try {
			const modeContent = await import(pathParser(name));
			if (!modeContent.type) return;
			if (modeContent.type !== type) throw new Error(`Loaded Content doesnt conform to "${type}"`);
			// TODO: 设想的新导入名称，用`export function entry() {...}`将内容暴露出去
			if ('entry' in modeContent) await game.import(type, (lib, game, ui, get, ai, _status) => {
				// TODO: 第一个参数打算提供一些信息，用于直接判断；后面依然提供六个全局变量，用于一些其他方式制作的扩展
				return modeContent.entry({}, {lib, game, ui, get, ai, _status})
			})
			// 不好说要不要保留
			else await game.import(type, modeContent.default);
		} catch (e) {
			console.error(e);
		}
	}
}
