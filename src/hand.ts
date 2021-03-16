class DOMHand {
    private readonly HAND_Y = 150;
    private readonly CARD_DX = 137;

    private cardIds: number[];
    private activeWonder: DOMWonder;

    handPositions: HTMLDivElement[];
    cards: DOMCard[];

    get selectedCard() {
        for (let card of this.cards) {
            if (card.state.type.startsWith('locked')) {
                return card;
            }
        }
        return undefined;
    }

    constructor(cardIds: number[], activeWonder: DOMWonder) {
        this.cardIds = cardIds;
        this.activeWonder = activeWonder;
        this.create();
    }

    update() {
        for (let card of this.cards) {
            card.update();
        }
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

            card.state = { type: 'in_hand', visualState: 'full' };
        }
    }

    reflectMove(move: API.Move) {
        if (!move || move.action === 'reject') {
            for (let card of this.cards) {
                card.deselect();
            }
            return;
        }

        let moved = false;
        for (let card of this.cards) {
            if (card.apiCardId === move.card) {
                card.select(move);
                moved = true;
            } else {
                card.deselect();
            }
        }
        if (!moved) console.error('Move card not found in hand:', move);
    }
}