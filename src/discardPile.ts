class DiscardPile extends GameElement {

    constructor() {
        super();

        this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_DISCARD_PILE;
    }

    getDiscardRegion() {
        return new PIXI.Rectangle(this.x - C.DISCARD_PILE_AREA_WIDTH/2, this.y - C.DISCARD_PILE_AREA_HEIGHT/2, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
    }

    getDiscardLockPoint() {
        return new PIXI.Point(this.x, this.y - C.CARD_CENTER_OFFSET_Y);
    }

    private draw() {
        let discardPile = new PIXI.Container();
        discardPile.addChild(Shapes.filledRoundedRect(0, 0, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT, C.DISCARD_PILE_AREA_CORNER_RADIUS, ArtCommon.discardPileColor));
        discardPile.addChild(Shapes.filledRoundedRect(C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_BORDER,
                                                      C.DISCARD_PILE_AREA_WIDTH - 2*C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_HEIGHT - 2*C.DISCARD_PILE_AREA_BORDER,
                                                      C.DISCARD_PILE_AREA_CORNER_RADIUS - C.DISCARD_PILE_AREA_BORDER, 0x000000));
        discardPile.addChild(Shapes.centeredText(C.DISCARD_PILE_AREA_WIDTH/2, C.DISCARD_PILE_TITLE_Y, C.DISCARD_PILE_TITLE_TEXT, C.DISCARD_PILE_TITLE_SCALE, ArtCommon.discardPileColor));
        return render(discardPile, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
    }
}