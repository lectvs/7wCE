class DOMDiscardPile extends GameElement {

    private readonly AREA_WIDTH = 250;
    private readonly AREA_HEIGHT = 300;
    private readonly AREA_CORNER_RADIUS = 10;
    private readonly AREA_BORDER = 4;
    private readonly TITLE_Y = 25;
    private readonly TITLE_SCALE = 0.25;
    private readonly TITLE_TEXT = "Discard";
    private readonly LOCK_OFFSET_Y = -60;

    constructor() {
        super();

        this.div.appendChild(this.draw());
        this.zIndex = ZIndices.DISCARD_PILE;
    }

    getDiscardRegion() {
        return new PIXI.Rectangle(this.x - this.AREA_WIDTH/2, this.y - this.AREA_HEIGHT/2, this.AREA_WIDTH, this.AREA_HEIGHT);
    }

    getDiscardLockPoint() {
        return new PIXI.Point(this.x, this.y + this.LOCK_OFFSET_Y);
    }

    private draw() {
        let discardPile = new PIXI.Container();
        discardPile.addChild(Shapes.filledRoundedRect(0, 0, this.AREA_WIDTH, this.AREA_HEIGHT, this.AREA_CORNER_RADIUS, ArtCommon.discardPileColor));
        discardPile.addChild(Shapes.filledRoundedRect(this.AREA_BORDER, this.AREA_BORDER,
                                                      this.AREA_WIDTH - 2*this.AREA_BORDER, this.AREA_HEIGHT - 2*this.AREA_BORDER,
                                                      this.AREA_CORNER_RADIUS - this.AREA_BORDER, 0x000000));
        discardPile.addChild(Shapes.centeredText(this.AREA_WIDTH/2, this.TITLE_Y, this.TITLE_TEXT, this.TITLE_SCALE, ArtCommon.discardPileColor));
        return render(discardPile, this.AREA_WIDTH, this.AREA_HEIGHT);
    }
}