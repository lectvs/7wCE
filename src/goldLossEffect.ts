class GoldLossEffect extends GameElement {
    private brokenGold: HTMLCanvasElement;

    amplitude: number = 0;
    
    constructor(goldToLose: number) {
        super();

        this.brokenGold = this.div.appendChild(this.draw(goldToLose));
        this.zIndex = C.Z_INDEX_GOLD_LOSS_EFFECT;
    }

    update() {
        this.brokenGold.style.left = `${randInt(-this.amplitude, this.amplitude)}px`;
        this.brokenGold.style.top = `${randInt(-this.amplitude, this.amplitude)}px`;
    }

    private draw(goldToLose: number) {
        let brokenGold = ArtCommon.domElementForArt(ArtCommon.brokenGold(goldToLose), 1.5);
        brokenGold.style.position = 'absolute';
        return brokenGold;
    }
}