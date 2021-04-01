class DiscardPile extends GameElement {

    constructor() {
        super();

        this.div.appendChild(Resources.DISCARD_PILE);
        this.zIndex = C.Z_INDEX_DISCARD_PILE;
    }

    getDiscardRegion() {
        return new PIXI.Rectangle(this.x - C.DISCARD_PILE_AREA_WIDTH/2, this.y - C.DISCARD_PILE_AREA_HEIGHT/2, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
    }

    getDiscardLockPoint() {
        return new PIXI.Point(this.x, this.y - C.CARD_CENTER_OFFSET_Y);
    }
}