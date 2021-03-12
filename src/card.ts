/// <reference path="gameElement.ts" />

class DOMCard extends GameElement {

    private readonly CARD_WIDTH = 133;
    private readonly CARD_HEIGHT = 200;
    private readonly CARD_CORNER_RADIUS = 12;
    private readonly CARD_BORDER = 4;
    private readonly CARD_EFFECT_Y = 28;

    apiCardId: number;
    apiCard: API.Card;
    handPosition: HTMLDivElement;
    activeWonder: DOMWonder;

    constructor(cardId: number, card: API.Card, handPosition: HTMLDivElement, activeWonder: DOMWonder) {
        super();

        this.apiCardId = cardId;
        this.apiCard = card;
        this.handPosition = handPosition;
        this.activeWonder = activeWonder;

        let front = this.drawFront();
        this.div.appendChild(front);
    }

    private drawFront() {
        let front = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(this.apiCard.color));
        front.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER,
                                              this.CARD_WIDTH - 2*this.CARD_BORDER, this.CARD_HEIGHT - 2*this.CARD_BORDER,
                                              this.CARD_CORNER_RADIUS, ArtCommon.cardBg);
        front.addChild(cardBg);

        let cardMask = cardBase.clone();
        front.addChild(cardMask);

        return render(front, this.CARD_WIDTH, this.CARD_HEIGHT);
    }
}