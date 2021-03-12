class DOMHand {
    private readonly HAND_Y = 250;
    private readonly CARD_DX = 137;

    private cardIds: number[];
    private activeWonder: DOMWonder;

    handPositions: HTMLDivElement[];
    cards: DOMCard[];

    constructor(cardIds: number[], activeWonder: DOMWonder) {
        this.cardIds = cardIds;
        this.activeWonder = activeWonder;
        this.create();
    }

    create() {
        this.handPositions = [];
        this.cards = [];

        for (let i = 0; i < this.cardIds.length; i++) {
            let handPosition = document.createElement('div');
            handPosition.style.left = `calc(50% + ${(i - (this.cardIds.length - 1)/2) * this.CARD_DX}px)`;
            handPosition.style.top = `${this.HAND_Y}px`;
            let card = new DOMCard(this.cardIds[i], Main.gamestate.cards[this.cardIds[i]], handPosition, this.activeWonder);
            card.xs = handPosition.style.left;
            card.ys = handPosition.style.top;
            card.addToGame();
            this.cards.push(card);

            //card.state = { type: 'in_hand', visualState: 'full' };
        }
    }

    destroy() {

    }
}