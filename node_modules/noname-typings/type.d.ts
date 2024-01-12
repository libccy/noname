//这里主要是声明各种游戏内常用的对象的结构
type listeners = {
    [key in keyof HTMLElementEventMap]?: EventListener;
};

type styleObj = {
    [key in keyof CSSStyleDeclaration]?: string;
}

/** key为字符串的map */
interface SMap<V> {
    [key: string]: V
}

/** key为number的map */
interface NMap<V> {
    [key: number]: V
}

declare type Game = import('../../noname/game/index.js').Game;
declare type Library = import('../../noname/library/index.js').Library;
declare type Status = typeof import('../../noname/status/index.js').status;
declare type UI = import('../../noname/ui/index.js').UI;
declare type Get = import('../../noname/get/index.js').Get;
declare type AI = import('../../noname/ai/index.js').AI;

declare type Button = import('../../noname/library/index.js').Button;
declare type Card = import('../../noname/library/index.js').Card;
declare type Dialog = import('../../noname/library/index.js').Dialog;
declare type GameEvent = import('../../noname/library/index.js').GameEvent;
declare type GameEventPromise = import('../../noname/library/index.js').GameEventPromise;
declare type Player = import('../../noname/library/index.js').Player;
declare type VCard = import('../../noname/library/index.js').VCard;
declare type Control = import('../../noname/library/index.js').Control;

declare type Video = import('../../noname/game/index.js').Video;
declare type Videos = import('../../noname/game/index.js').Videos;
declare type GameHistory = import('../../noname/game/index.js').GameHistory;
declare type CodeMirror = typeof import('../../game/codemirror.js').default;

declare type Sex = 'male' | 'female' | 'dobule' | 'none';
declare type Character = [Sex, string, number | string, string[], string[]];