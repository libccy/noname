import { NonameHook } from "./hook.js"
import { defaultAssemblys } from "../assembly/index.js"

export const defaultHooks = {
	addGroup: new NonameHook("addGroup"),
	addNature: new NonameHook("addNature"),

	...defaultAssemblys
}

export {
	NonameHook
}
