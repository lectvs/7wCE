/// <reference path="./popup.ts" />

class StartingEffectsInfoPopup extends Popup {
    wonder: API.Wonder;

    constructor(wonder: API.Wonder) {
        super();
        this.wonder = wonder;
        this.div.className = 'popup';
    }

    getSource() {
        return this.wonder;
    }

    protected draw() {
        let box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';

        let currentY = 16;

        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Starting Effects</span>', '10px', `${currentY}px`));
        currentY += 24;

        // Effects
        box.appendChild(this.infoText('Effects:', '10px', `${currentY}px`));
        currentY += 20;

        let effects = this.wonder.starting_effects;
        for (let i = 0; i < effects.length; i++) {
            let effect = box.appendChild(document.createElement('div'));
            let effectArt = new PIXI.Container();
            effectArt.addChild(ArtCommon.getShadowForEffects([effects[i]], 'dark'));
            effectArt.addChild(ArtCommon.getArtForEffects([effects[i]]));
            effect.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
            effect.style.transform = 'scale(0.2)';
            effect.style.position = 'absolute';
            effect.style.left = `${10 + effectArt.width/10}px`;
            effect.style.top = `${currentY}px`;

            let description = this.infoText(getDescriptionForEffect(effects[i]), `${20 + effectArt.width/5}px`, `${currentY}px`);
            description.style.fontSize = `${C.CARD_INFO_EFFECT_DESCRIPTION_SIZE}px`;
            description.style.marginRight = '10px';
            box.appendChild(description);
            currentY += 24;
        }

        let padding = 10;
        box.style.width = `${this.width-padding}px`;
        box.style.height = `${currentY}px`;
        box.style.paddingRight = `${padding}px`;

        return box;
    }
}