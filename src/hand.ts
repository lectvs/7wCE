class Hand {
    normalHandPositions: PIXI.Point[];
    handPositions: PIXI.Point[];
    collapsedPosition: PIXI.Point;
    cards: Card[];

    get selectedCard() {
        for (let card of this.cards) {
            if (card.state.type.startsWith('locked')) return card;
        }
        return undefined;
    }

    private collapsed: boolean;

    constructor(container: PIXI.Container, cardIds: number[], activeWonder: Wonder, discardPile: PIXI.Container) {
        this.cards = [];
        this.collapsed = false;

        for (let i = 0; i < cardIds.length; i++) {
            let card = new Card(cardIds[i], Main.gamestate.cards[cardIds[i]], new PIXI.Point(), activeWonder, discardPile);
            this.cards.push(card);
            container.addChild(card);

            card.state = { type: 'in_hand', visualState: 'full' };
        }

        this.adjustPositions();
    }

    update() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.collapsed) {
                this.cards[i].handPosition.x = lerp(this.cards[i].handPosition.x, this.collapsedPosition.x, 0.125);
                this.cards[i].handPosition.y = lerp(this.cards[i].handPosition.y, this.collapsedPosition.y, 0.125);
            } else {
                this.cards[i].handPosition.x = lerp(this.cards[i].handPosition.x, this.normalHandPositions[i].x, 0.125);
                this.cards[i].handPosition.y = lerp(this.cards[i].handPosition.y, this.normalHandPositions[i].y, 0.125);
            }
            this.cards[i].update();
        }
    }

    adjustPositions() {
        let handY = 120;
        let handDX = 136;

        this.normalHandPositions = [];
        this.handPositions = [];
        this.collapsedPosition = new PIXI.Point(Main.width/2, handY);

        for (let i = 0; i < this.cards.length; i++) {
            let normalHandPosition = new PIXI.Point(Main.width/2 + handDX*(i - (this.cards.length - 1)/2), handY);
            this.normalHandPositions.push(normalHandPosition);

            let handPosition = new PIXI.Point(normalHandPosition.x, normalHandPosition.y);
            this.handPositions.push(handPosition);
            this.cards[i].handPosition = handPosition;

            this.cards[i].position.set(handPosition.x, handPosition.y);
            this.cards[i].scale.set(2);
        }
    }

    reflectMove(move: API.Move) {
        if (!move) {
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

    collapse() {
        this.collapsed = true;
    }

    uncollapse() {
        this.collapsed = false;
    }

    flip() {
        for (let card of this.cards) {
            if (card.state.type === 'in_hand') card.state.visualState = 'flipped';
        }
    }

    unflip() {
        for (let card of this.cards) {
            if (card.state.type === 'in_hand') card.state.visualState = 'full';
        }
    }
}