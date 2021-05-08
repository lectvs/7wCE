class DiplomacyTokenRack extends GameElement {
    private wonder: Wonder;

    private tokens: HTMLCanvasElement[];

    constructor(wonder: Wonder) {
        super();
        this.wonder = wonder;
        this.tokens = [];

        this.div.className = 'diplomacytokenrack';
        this.div.style.pointerEvents = 'none';
        this.zIndex = C.Z_INDEX_DIPLOMACY_TOKEN_RACK;
    }

    update() {
        this.x = this.wonder.x + this.wonder.playedCardEffectRolls.red.offsetx
                               + this.wonder.playedCardEffectRolls.red.width
                               + this.wonder.playedCardEffectRolls.red.placeholderWidth;
        this.y = this.wonder.y + this.wonder.playedCardEffectRolls.red.offsety;
    }

    addToken() {
        let token = ArtCommon.domElementForArt(ArtCommon.dove(), 0.25);
        token.style.position = 'absolute';
        token.style.left = `${C.WONDER_DIPLOMACY_TOKENS_OFFSET_X + C.WONDER_DIPLOMACY_TOKENS_DX*this.getTokenCount()}px`;
        this.div.appendChild(token);
        this.tokens.push(token);
    }

    removeToken() {
        let token = this.tokens.pop();
        token.parentElement.removeChild(token);
    }

    getTokenPosition(i: number) {
        return new PIXI.Point(this.x + C.WONDER_DIPLOMACY_TOKENS_OFFSET_X + C.WONDER_DIPLOMACY_TOKENS_DX*i, this.y);
    }

    getTokenCount() {
        return this.tokens.length;
    }
}