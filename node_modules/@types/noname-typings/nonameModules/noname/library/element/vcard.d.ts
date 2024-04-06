export class VCard {
    /**
     * @param { any } [suitOrCard]
     * @param { number | Card[] } [numberOrCards]
     * @param { string } [name]
     * @param { string } [nature]
     */
    constructor(suitOrCard?: any, numberOrCards?: number | Card[], name?: string, nature?: string);
    /**
     * @type {string}
     */
    suit: string;
    /**
     * @type {number}
     */
    number: number;
    /**
     * @type {string}
     */
    name: string;
    /**
     * @type {string}
     */
    nature: string;
    color: string;
    /**
     * @type { boolean }
     */
    isCard: boolean;
    cardid: any;
    wunature: any;
    /**
     * @type {Record<string, any>}
     */
    storage: Record<string, any>;
    cards: Card[];
    sameSuitAs(card: any): boolean;
    differentSuitFrom(card: any): boolean;
    sameNumberAs(card: any): boolean;
    differentNumberFrom(card: any): boolean;
    sameNameAs(card: any): boolean;
    differentNameFrom(card: any): boolean;
    /**
     * @param { Player } player
     */
    hasNature(nature: any, player: Player): boolean;
    getCacheKey(): string;
    hasGaintag(tag: any): any;
}
