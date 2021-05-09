class MilitaryToken extends GameElement {
    private amount: number;

    constructor(amount: number) {
        super();
        this.amount = amount;
        this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_TOKEN_MOVING;
    }

    private draw() {
        return ArtCommon.domElementForArt(ArtCommon.militaryToken(this.amount), C.MILITARY_TOKEN_SCALE);
    }
}