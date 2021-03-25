class MilitaryToken extends GameElement {
    private amount: number;

    constructor(amount: number) {
        super();
        this.amount = amount;
        this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_MILITARY_TOKEN;
    }

    private draw() {
        return ArtCommon.domElementForArt(ArtCommon.militaryToken(this.amount), C.TOKEN_SCALE);
    }
}