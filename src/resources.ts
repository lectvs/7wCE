type CardResource = {
    front: HTMLCanvasElement;
    back: HTMLCanvasElement;
    fullClipRect: PIXI.Rectangle;
    effectClipRect: PIXI.Rectangle;
}

type WonderResource = {
    board: HTMLCanvasElement;
    startingEffectsRect: PIXI.Rectangle;
    stageXs: number[];
}

class Resources {
    static readonly PIXI_TEXTURES: Dict<PIXI.Texture> = {};
    static readonly CARD_CACHE: Dict<CardResource[]> = {};
    static readonly WONDER_CACHE: Dict<WonderResource[]> = {};
    static DISCARD_PILE: HTMLCanvasElement;
    static CARD_LIST: HTMLCanvasElement;

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

    static getWonder(name: string, side: string): WonderResource {
        let key = `${name}/${side}`;
        if (!this.WONDER_CACHE[key] || this.WONDER_CACHE[key].length === 0) {
            console.error(`Wonder ${key} not found in wonder cache`, this.WONDER_CACHE);
            return undefined;
        }

        let cache = this.WONDER_CACHE[key];

        if (cache.length === 1) {
            return {
                board: cloneCanvas(cache[0].board),
                startingEffectsRect: cache[0].startingEffectsRect.clone(),
                stageXs: cloneArray(cache[0].stageXs),
            };
        }

        return cache.pop();
    }

    static returnWonder(name: string, side: string, wonderResource: WonderResource) {
        let key = `${name}/${side}`;
        if (!this.WONDER_CACHE[key] || this.WONDER_CACHE[key].length === 0) {
            console.error(`Wonder ${key} not found in wonder cache`, this.WONDER_CACHE);
            return undefined;
        }
        if (!wonderResource) return;
        this.WONDER_CACHE[key].push(wonderResource);
    }
}