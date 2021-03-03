class Hand {
    normalHandPositions: PIXI.Point[];
    homePositions: PIXI.Point[];
    collapsedPosition: PIXI.Point;
    cards: Card[];

    get selectedCard() {
        for (let card of this.cards) {
            if (card.lockPosition) return card;
        }
        return undefined;
    }

    private collapsed: boolean;

    constructor(container: PIXI.Container, cards: API.Card[], activeWonder: Wonder, discardPile: PIXI.Container) {
        let handY = 120;
        let handDX = 136;

        this.normalHandPositions = [];
        this.homePositions = [];
        this.collapsedPosition = new PIXI.Point(Main.width/2, handY);
        this.cards = [];
        this.collapsed = false;

        for (let i = 0; i < cards.length; i++) {
            let normalHandPosition = new PIXI.Point(Main.width/2 + handDX*(i - (cards.length - 1)/2), handY);
            this.normalHandPositions.push(normalHandPosition);

            let homePosition = new PIXI.Point(normalHandPosition.x, normalHandPosition.y);
            this.homePositions.push(homePosition);

            let card = new Card(cards[i], homePosition, activeWonder, discardPile);
            card.position.set(homePosition.x, homePosition.y);
            card.scale.set(2);
            this.cards.push(card);
            container.addChild(card);

            card.setFlipped(true);
            card.setFull();
        }
    }

    update() {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.collapsed) {
                this.cards[i].homePosition.x = lerp(this.cards[i].homePosition.x, this.collapsedPosition.x, 0.125);
                this.cards[i].homePosition.y = lerp(this.cards[i].homePosition.y, this.collapsedPosition.y, 0.125);
            } else {
                this.cards[i].homePosition.x = lerp(this.cards[i].homePosition.x, this.normalHandPositions[i].x, 0.125);
                this.cards[i].homePosition.y = lerp(this.cards[i].homePosition.y, this.normalHandPositions[i].y, 0.125);
            }
            this.cards[i].update();
        }
    }

    collapse() {
        console.log('collapsed')
        this.collapsed = true;
    }

    uncollapse() {
        console.log('uncollapsed')
        this.collapsed = false;
    }

    flip() {
        console.log('flipped')
        for (let card of this.cards) {
            card.setFlipped();
        }
    }

    unflip() {
        console.log('unflipped')
        for (let card of this.cards) {
            card.setFull();
        }
    }
}