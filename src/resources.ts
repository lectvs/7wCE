type CardResource = {
    front: HTMLCanvasElement;
    back: HTMLCanvasElement;
    fullClipRect: PIXI.Rectangle;
    effectClipRect: PIXI.Rectangle;
}

type WonderResource = {
    board: HTMLCanvasElement;
    stageXs: number[];
}

class Resources {
    static readonly CARD_CACHE: Dict<CardResource[]> = {};
    static readonly WONDER_CACHE: Dict<WonderResource[]> = {};
    static DISCARD_PILE: HTMLCanvasElement;

    static getCard(cardId: number): CardResource {
        if (!this.CARD_CACHE[cardId] || this.CARD_CACHE[cardId].length === 0) {
            console.error(`Card id ${cardId} not found in card cache`, this.CARD_CACHE);
            return undefined;
        }

        let cache = this.CARD_CACHE[cardId];

        if (cache.length === 1) {
            return {
                front: cloneCanvas(cache[0].front),
                back: cloneCanvas(cache[0].back),
                fullClipRect: cache[0].fullClipRect.clone(),
                effectClipRect: cache[0].effectClipRect.clone(),
            };
        }

        return cache.pop();
    }

    static returnCard(cardId: number, cardResource: CardResource) {
        if (!this.CARD_CACHE[cardId]) {
            console.error(`Card id ${cardId} not found in card cache`, this.CARD_CACHE);
            return undefined;
        }
        if (!cardResource) return;
        this.CARD_CACHE[cardId].push(cardResource);
    }

    static getWonder(player: string): WonderResource {
        if (!this.WONDER_CACHE[player] || this.WONDER_CACHE[player].length === 0) {
            console.error(`Player ${player} not found in wonder cache`, this.WONDER_CACHE);
            return undefined;
        }

        let cache = this.WONDER_CACHE[player];

        if (cache.length === 1) {
            return {
                board: cloneCanvas(cache[0].board),
                stageXs: cloneArray(cache[0].stageXs),
            };
        }

        return cache.pop();
    }

    static returnWonder(player: string, wonderResource: WonderResource) {
        if (!this.WONDER_CACHE[player] || this.WONDER_CACHE[player].length === 0) {
            console.error(`Player ${player} not found in wonder cache`, this.WONDER_CACHE);
            return undefined;
        }
        if (!wonderResource) return;
        this.WONDER_CACHE[player].push(wonderResource);
    }
}