/// <reference path="./popup.ts" />

class CardInfoPopup extends Popup {
    card: Card | CardForList;

    constructor(card: Card | CardForList) {
        super();
        this.card = card;
        this.div.className = 'popup';
    }

    getSource() {
        return this.card;
    }

    protected draw() {
        let box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';

        let currentY = 16;

        // Name
        box.appendChild(this.infoText(this.cardName(this.card.apiCard), '10px', `${currentY}px`));
        currentY += 24;

        // Cost
        let resourceCost = this.card.apiCard.cost?.resources || [];
        let goldCost = this.card.apiCard.cost?.gold || 0;
        let isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText(`Cost:${isFree ? ' None' : ''}`, '10px', `${currentY}px`));

        if (this.card.apiCard.cost) {
            let currentX = 60;
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

            let chain = this.card.apiCard.cost.chain;
            if (chain) {
                let cardsProducingChain = API.getCardsProducingChain(Main.gamestate, chain);
                let cardNames = cardsProducingChain.map(card => this.cardName(card)).join(', ');
                let chainText = this.infoText(`(or free chain from ${cardNames})`, `${currentX-4}px`, `${currentY}px`);
                chainText.style.fontSize = '10px';
                box.appendChild(chainText);
            }
        }
        currentY += 24;


        // Effects
        box.appendChild(this.infoText('Effects:', '10px', `${currentY}px`));
        currentY += 24;

        let effects = this.card.apiCard.effects;
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

        // Chains
        let chains = this.card.apiCard.chains;
        if (chains && chains.length > 0) {
            currentY += 16;
            box.appendChild(this.infoText('Future chains:', '10px', `${currentY}px`));
            currentY += 16;
            for (let chain of chains) {
                let cardsConsumingChain = API.getCardsConsumingChain(Main.gamestate, chain);
                for (let card of cardsConsumingChain) {
                    box.appendChild(this.infoText(`- ${this.cardName(card)}`, '18px', `${currentY}px`));
                    currentY += 16;
                }
            }
        }

        box.style.width = `${this.width}px`;
        box.style.height = `${currentY}px`;

        return box;
    }
}