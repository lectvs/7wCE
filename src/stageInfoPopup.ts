/// <reference path="./popup.ts" />

class StageInfoPopup extends Popup {
    source: Popup.WonderStageSource

    constructor(source: Popup.WonderStageSource) {
        super();
        this.source = source;
        this.div.className = 'popup';
    }

    getSource() {
        return this.source;
    }

    protected draw() {
        return this.source.stage.copy_stage ? this.drawCopyStage() : this.drawNormalStage();
    }

    private drawNormalStage() {
        let box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';

        let currentY = 16;

        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', `${currentY}px`));
        currentY += 24;

        // Cost
        let resourceCost = this.source.stage.cost?.resources || [];
        let goldCost = this.source.stage.cost?.gold || 0;
        let isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText(`Cost:${isFree ? ' None' : ''}`, '10px', `${currentY}px`));

        if (this.source.stage.cost) {
            let currentX = 60;
            if (goldCost > 0) {
                let gold = box.appendChild(document.createElement('div'));
                let goldArt = new PIXI.Container();
                goldArt.addChild(ArtCommon.getShadowForArt(() => ArtCommon.gold(goldCost), 'dark'));
                goldArt.addChild(ArtCommon.gold(goldCost));
                gold.appendChild(ArtCommon.domElementForArt(goldArt, 1, 10));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = `${currentX}px`;
                gold.style.top = `${currentY}px`;
                currentX += 22;
            }
            for (let i = 0; i < resourceCost.length; i++) {
                let resource = box.appendChild(document.createElement('div'));
                let resourceArt = new PIXI.Container();
                resourceArt.addChild(ArtCommon.getShadowForArt(() => ArtCommon.resource(resourceCost[i]), 'dark'));
                resourceArt.addChild(ArtCommon.resource(resourceCost[i]));
                resource.appendChild(ArtCommon.domElementForArt(resourceArt, 1, 10));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = `${currentX}px`;
                resource.style.top = `${currentY}px`;
                currentX += 22;
            }
        }
        currentY += 24;


        // Effects
        box.appendChild(this.infoText('Effects:', '10px', `${currentY}px`));
        currentY += 20;

        let effects = this.source.stage.effects;
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

    private drawCopyStage() {
        let box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';

        let currentY = 16;

        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', `${currentY}px`));
        currentY += 24;

        let effect = box.appendChild(document.createElement('div'));
        let copyArt = new PIXI.Container();
        copyArt.addChild(ArtCommon.getShadowForStageCopy(this.source.stage.copy_stage.stage, this.source.stage.copy_stage.dir, 'dark'));
        copyArt.addChild(ArtCommon.getArtForStageCopy(this.source.stage.copy_stage.stage, this.source.stage.copy_stage.dir));
        effect.appendChild(ArtCommon.domElementForArt(copyArt, 1, 10));
        effect.style.transform = 'scale(0.2)';
        effect.style.position = 'absolute';
        effect.style.left = `${10 + copyArt.width/10}px`;
        effect.style.top = `${currentY}px`;

        let description = this.infoText(`Copy the ${this.source.stage.copy_stage.stage} wonder stage of your ${this.source.stage.copy_stage.dir === 'neg' ? 'left' : 'right'} neighbor`,
                                        `${20 + copyArt.width/5}px`, `${currentY}px`);
        description.style.fontSize = `${C.CARD_INFO_EFFECT_DESCRIPTION_SIZE}px`;
        description.style.marginRight = '10px';
        box.appendChild(description);
        currentY += 24;

        // Stage copy
        let stageBuilt = this.getStageBuilt();
        if (stageBuilt) {
            box.appendChild(this.infoText('Copied Effects:', '10px', `${currentY}px`));
            currentY += 20;
    
            let effects = (stageBuilt.copyPlayer === undefined || stageBuilt.copyStage === undefined)
                            ? []
                            : Main.gamestate.wonders[stageBuilt.copyPlayer].stages[stageBuilt.copyStage].effects;
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
        }

        let padding = 10;
        box.style.width = `${this.width-padding}px`;
        box.style.height = `${currentY}px`;
        box.style.paddingRight = `${padding}px`;

        return box;
    }

    private getStageBuilt() {
        for (let stageBuilt of Main.gamestate.playerData[this.source.player].stagesBuilt) {
            if (stageBuilt.stage === this.source.stageIndex) {
                return stageBuilt;
            }
        }
        return undefined;
    }
}