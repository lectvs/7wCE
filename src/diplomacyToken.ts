class DiplomacyToken extends GameElement {
    constructor() {
        super();
        this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_TOKEN_MOVING;
    }

    private draw() {
        return ArtCommon.domElementForArt(ArtCommon.dove(), C.DIPLOMACY_TOKEN_SCALE);
    }
}