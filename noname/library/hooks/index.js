import { NonameHook } from "./hook.js"

export const defaultHooks = {
	addGroup: new NonameHook("addGroup"),
	addNature: new NonameHook("addNature"),

	checkBegin: new NonameHook("checkBegin"),
	checkCard: new NonameHook("checkCard"),
	checkTarget: new NonameHook("checkTarget"),
	checkButton: new NonameHook("checkButton"),
	checkEnd: new NonameHook("checkEnd"),

	uncheckBegin: new NonameHook("uncheckBegin"),
	uncheckCard: new NonameHook("uncheckCard"),
	uncheckTarget: new NonameHook("uncheckTarget"),
	uncheckButton: new NonameHook("uncheckButton"),
	uncheckEnd: new NonameHook("uncheckEnd")
}
