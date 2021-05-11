class GoldLossEffect extends GameElement {
    private brokenGold: HTMLCanvasElement;

    amplitude: number = 0;
    
    constructor() {
        super();

        this.brokenGold = this.div.appendChild(this.draw());
        this.zIndex = C.Z_INDEX_GOLD_LOSS_EFFECT;
    }

    update() {
        this.brokenGold.style.left = `${randInt(-this.amplitude, this.amplitude)}px`;
        this.brokenGold.style.top = `${randInt(-this.amplitude, this.amplitude)}px`;
    }

    private draw() {
        let brokenGold = ArtCommon.domElementForArt(ArtCommon.brokenGoldBlank(), 1.5);
        brokenGold.style.position = 'absolute';
        return brokenGold;
    }
}