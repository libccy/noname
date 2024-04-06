export class Basic extends Uninstantable {
    /**
     * @param { (
     * 	button: Button,
     * 	buttons?: Button[]
     * ) => number } check
     */
    static chooseButton(check: (button: Button, buttons?: Button[]) => number): boolean;
    /**
     * @param { (
     * card?: Card,
     * cards?: Card[]
     * ) => number } check
     * @returns { boolean | undefined }
     */
    static chooseCard(check: (card?: Card, cards?: Card[]) => number): boolean | undefined;
    /**
     * @param { (
     * target?: Player,
     * targets?: Player[]
     * ) => number } check
     */
    static chooseTarget(check: (target?: Player, targets?: Player[]) => number): boolean;
}
import { Uninstantable } from "../util/index.js";
