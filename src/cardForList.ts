class CardForList extends GameElement {
    private scene: CardListScene;

    apiCardId: number;
    apiCard: API.Card;
    count: number;

    constructor(scene: CardListScene, cardId: number, count: number) {
        super();

        this.scene = scene;
        this.apiCardId = cardId;
        this.apiCard = Main.gamestate.cards[cardId];
        this.count = count;

        this.create();

        // Popup
        this.div.onmousemove = () => {
            if (Main.scene.isCurrentlyDragging()) {
                this.scene.stopPopup(this);
                return;
            }
            this.scene.updatePopup(this, this.x - C.CARD_LIST_CARD_WIDTH/2, this.y + C.CARD_LIST_CARD_HEIGHT/2);
        };

        this.div.onmouseleave = () => {
            this.scene.stopPopup(this);
        };
    }

    update() {

    }

    create() {
        this.div.appendChild(this.draw());
        this.div.appendChild(this.drawInfo());
    }
    
    destroy() {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
    }

    private draw() {
        let cardForList = new PIXI.Container();
        cardForList.addChild(Shapes.filledRect(0, 0, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color)));
        let effectContainer = new PIXI.Container();
        effectContainer.addChild(ArtCommon.getShadowForEffects(this.apiCard.effects, 'dark'));
        effectContainer.addChild(ArtCommon.getArtForEffects(this.apiCard.effects));
        effectContainer.scale.set(C.CARD_LIST_EFFECT_SCALE);
        effectContainer.position.set(C.CARD_LIST_CARD_WIDTH/2, C.CARD_LIST_CARD_HEIGHT/2);
        cardForList.addChild(effectContainer);
        return render(cardForList, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT);
    }

    private drawInfo() {
        let info = document.createElement('div');
        info.style.position = 'absolute';

        if (this.count > 1) {
            info.appendChild(this.infoText(`${this.count} ×`, '-60px', '0px'));
        }

        let resourceCost = this.apiCard.cost?.resources || [];
        let goldCost = this.apiCard.cost?.gold || 0;

        if (this.apiCard.cost) {
            let currentX = 70;
            for (let i = 0; i < resourceCost.length; i++) {
                let resource = info.appendChild(document.createElement('div'));
                let resourceArt = new PIXI.Container();
                resourceArt.addChild(ArtCommon.getShadowForArt(() => ArtCommon.resource(resourceCost[i]), 'light'));
                resourceArt.addChild(ArtCommon.resource(resourceCost[i]));
                resource.appendChild(ArtCommon.domElementForArt(resourceArt, 1, 10));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = `${currentX}px`;
                resource.style.top = `0px`;
                currentX += 22;
            }

            if (goldCost > 0) {
                let gold = info.appendChild(document.createElement('div'));
                let goldArt = new PIXI.Container();
                goldArt.addChild(ArtCommon.getShadowForArt(() => ArtCommon.gold(goldCost), 'light'));
                goldArt.addChild(ArtCommon.gold(goldCost));
                gold.appendChild(ArtCommon.domElementForArt(goldArt, 1, 10));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = `${currentX}px`;
                gold.style.top = `0px`;
                currentX += 22;
            }
        }

        return info;
    }

    protected infoText(text: string, xs: string, ys: string) {
        let p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${C.CARD_LIST_INFO_TEXT_SIZE}px`;
        p.style.color = C.CARD_LIST_INFO_TEXT_COLOR;
        p.style.transform = 'translate(-100%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }
}