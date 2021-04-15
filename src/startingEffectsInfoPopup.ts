/// <reference path="./popup.ts" />

class StageInfoPopup extends Popup {
    stage: API.WonderStage;

    constructor(stage: API.WonderStage) {
        super();
        this.stage = stage;
        this.div.appendChild(this.draw());
    }

    getSource() {
        return this.stage;
    }

    private draw() {
        let box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';

        let currentY = 16;

        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', `${currentY}px`));
        currentY += 24;

        // Cost
        let resourceCost = this.stage.cost?.resources || [];
        let goldCost = this.stage.cost?.gold || 0;
        let isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText(`Cost:${isFree ? ' None' : ''}`, '10px', `${currentY}px`));

        if (this.stage.cost) {
            let currentX = 60;
            for (let i = 0; i < resourceCost.length; i++) {
                let resource = box.appendChild(document.createElement('div'));
                resource.appendChild(ArtCommon.domElementForArt(ArtCommon.resource(resourceCost[i])));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = `${currentX}px`;
                resource.style.top = `${currentY}px`;
                currentX += 20;
            }

            if (goldCost > 0) {
                let gold = box.appendChild(document.createElement('div'));
                gold.appendChild(ArtCommon.domElementForArt(ArtCommon.gold(goldCost)));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = `${currentX}px`;
                gold.style.top = `${currentY}px`;
                currentX += 20;
            }
        }
        currentY += 24;


        // Effects
        box.appendChild(this.infoText('Effects:', '10px', `${currentY}px`));
        currentY += 20;

        let effects = this.stage.effects;
        for (let i = 0; i < effects.length; i++) {
            let effect = box.appendChild(document.createElement('div'));
            let effectArt = new PIXI.Container();
            effectArt.addChild(ArtCommon.getShadowForEffects([effects[0]], 'dark'));
            effectArt.addChild(ArtCommon.getArtForEffects([effects[0]]));
            effect.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
            effect.style.transform = 'scale(0.2)';
            effect.style.position = 'absolute';
            effect.style.left = `${10 + effectArt.width/10}px`;
            effect.style.top = `${currentY}px`;

            let description = this.infoText(getDescriptionForEffect(effects[i]), `${20 + effectArt.width/5}px`, `${currentY}px`);
            description.style.fontSize = `${C.CARD_INFO_EFFECT_DESCRIPTION_SIZE}px`;
            description.style.marginRight = '10px';
            box.appendChild(description);
            currentY += 20;
        }

        let padding = 10;
        box.style.width = `${this.width-padding}px`;
        box.style.height = `${currentY}px`;
        box.style.paddingRight = `${padding}px`;

        return box;
    }
}