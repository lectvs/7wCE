class GoldCoin extends GameElement {
    constructor() {
        super();
        this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_GOLD_COIN;
    }

    private draw() {
        return ArtCommon.domElementForArt(ArtCommon.goldCoin(), C.GOLD_COIN_SCALE);
    }
}