class MilitaryOverlay extends GameElement {
    private shieldsText: HTMLParagraphElement;

    private overlayNeutral: HTMLCanvasElement;
    private overlayVictory: HTMLCanvasElement;
    private overlayDefeat: HTMLCanvasElement;

    constructor() {
        super();

        this.div.appendChild(this.draw());
        this.setShieldDiff(0);
        this.setShields(0);
        this.zIndex = C.Z_INDEX_MILITARY_OVERLAY;
        this.alpha = 0;
    }

    setShieldDiff(diff: number) {
        this.overlayNeutral.style.visibility = (diff === 0) ? 'visible' : 'hidden';
        this.overlayVictory.style.visibility = (diff > 0) ? 'visible' : 'hidden';
        this.overlayDefeat.style.visibility = (diff < 0) ? 'visible' : 'hidden';
    }

    setShields(shields: number) {
        this.shieldsText.textContent = `${shields}`;
    }
    
    private draw() {
        let div = document.createElement('div');
        
        let pixiOverlayNeutral = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_NEUTRAL);
        pixiOverlayNeutral.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayNeutral = div.appendChild(render(pixiOverlayNeutral, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));
        let pixiOverlayVictory = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_VICTORY);
        pixiOverlayVictory.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayVictory = div.appendChild(render(pixiOverlayVictory, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));
        let pixiOverlayDefeat = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_DEFEAT);
        pixiOverlayDefeat.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayDefeat = div.appendChild(render(pixiOverlayDefeat, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));

        let shield = div.appendChild(ArtCommon.domElementForArt(ArtCommon.shield(), C.WONDER_OVERLAY_SHIELD_SCALE));
        shield.style.position = 'absolute';
        shield.style.left = `${C.WONDER_OVERLAY_SHIELD_X}px`;
        shield.style.top = '0px';

        let textDiv = div.appendChild(document.createElement('div'));
        textDiv.style.width = '50%';
        textDiv.style.position = 'absolute';
        textDiv.style.transform = 'translate(-100%, 0)';
        this.shieldsText = textDiv.appendChild(document.createElement('p'));
        this.shieldsText.textContent = '0';
        this.shieldsText.style.fontFamily = "'Courier New', Courier, monospace";
        this.shieldsText.style.fontSize = `${C.WONDER_OVERLAY_TEXT_SIZE}px`;
        this.shieldsText.style.color = C.WONDER_OVERLAY_TEXT_COLOR;
        this.shieldsText.style.width = '100%';
        this.shieldsText.style.textAlign = 'right';
        this.shieldsText.style.transform = 'translate(0, -45%)';

        return div;
    }
}