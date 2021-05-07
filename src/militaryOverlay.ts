type MilitaryOverlayType = 'victory' | 'defeat' | 'tie' | 'diplomacy';

class MilitaryOverlay extends GameElement {
    private shield: HTMLCanvasElement;
    private shieldsText: HTMLParagraphElement;
    private dove: HTMLCanvasElement;

    private overlayNeutral: HTMLCanvasElement;
    private overlayVictory: HTMLCanvasElement;
    private overlayDefeat: HTMLCanvasElement;


    constructor() {
        super();

        this.div.appendChild(this.draw());
        this.div.className = 'wonderoverlay';
        this.setType('tie');
        this.setShields(0);
        this.zIndex = C.Z_INDEX_MILITARY_OVERLAY;
        this.alpha = 0;
    }

    setType(type: MilitaryOverlayType) {
        this.overlayNeutral.style.visibility = (type === 'tie' || type ==='diplomacy') ? 'visible' : 'hidden';
        this.overlayVictory.style.visibility = type === 'victory' ? 'visible' : 'hidden';
        this.overlayDefeat.style.visibility = type === 'defeat' ? 'visible' : 'hidden';
        this.shield.style.visibility = type === 'diplomacy' ? 'hidden' : 'visible';
        this.shieldsText.style.visibility = type === 'diplomacy' ? 'hidden' : 'visible';
        this.dove.style.visibility = type === 'diplomacy' ? 'visible' : 'hidden';
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

        this.shield = div.appendChild(ArtCommon.domElementForArt(ArtCommon.shield(), C.WONDER_OVERLAY_SHIELD_SCALE));
        this.shield.style.position = 'absolute';
        this.shield.style.left = `${C.WONDER_OVERLAY_SHIELD_X}px`;
        this.shield.style.top = '0px';

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

        this.dove = div.appendChild(ArtCommon.domElementForArt(ArtCommon.dove(), C.WONDER_OVERLAY_SHIELD_SCALE));
        this.dove.style.position = 'absolute';
        this.dove.style.left = '0px';
        this.dove.style.top = '0px';

        return div;
    }
}