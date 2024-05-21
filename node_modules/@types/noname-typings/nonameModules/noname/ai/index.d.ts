export class AI {
    basic: Basic;
    get: import("../get/index.js").Get;
}
export let ai: AI;
export function setAI(instance?: InstanceType<typeof AI>): void;
export { Basic };
import { Basic } from "./basic.js";
