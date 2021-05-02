class PlayedCardEffectRoll {
    x: number;
    y: number;
    offsetx: number;
    offsety: number;
    reverse: boolean;

    cards: Card[];
    sortCmp: (card1: Card, card2: Card) => number;

    placeholderIndex: number;
    placeholderWidth: number;

    get width() { return sum(this.cards, card => card.effectWidth); }

    constructor(offsetx: number, offsety: number, reverse: boolean, sortCmp: (card1: Card, card2: Card) => number) {
        this.cards = [];
        this.x = 0;
        this.y = 0;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.reverse = reverse;
        this.sortCmp = sortCmp;
        this.placeholderIndex = -1;
        this.placeholderWidth = 0;
    }

    destroy() {
        for (let card of this.cards) {
            card.destroy();
        }
    }

    update() {
        let d = this.reverse ? -1 : 1;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].targetPosition.set((i === 0)
                                                ? this.x + d*this.cards[i].effectWidth/2
                                                : this.cards[i].x = this.cards[i-1].x + d*(this.cards[i-1].effectWidth/2 + this.cards[i].effectWidth/2),
                                             this.y);
            if (i === this.placeholderIndex) {
                this.cards[i].targetPosition.x += d*this.placeholderWidth;
            }
            this.cards[i].snapToTarget();
            this.cards[i].update();
        }
    }

    canAddCard(card: Card, maxWidth: number) {
        return this.width + card.effectWidth <= maxWidth;
    }

    addCard(card: Card) {
        let i = this.getSortedIndex(card);
        this.cards.splice(i, 0, card);
        card.convertToPlayed();
        this.update();
    }

    addPlaceholder(card: Card) {
        this.removePlaceholder();
        this.placeholderIndex = this.getSortedIndex(card);
        this.placeholderWidth = card.effectWidth;
    }

    removePlaceholder() {
        this.placeholderIndex = -1;
        this.placeholderWidth = 0;
    }

    getNextPosition(card: Card) {
        let d = this.reverse ? -1 : 1;
        let i = this.getSortedIndex(card);
        return new PIXI.Point(this.x + d*(this.widthAtIndex(i) + card.effectWidth/2), this.y);
    }

    private getSortedIndex(card: Card) {
        if (this.sortCmp) {
            for (let i = 0; i < this.cards.length; i++) {
                if (this.sortCmp(card, this.cards[i]) < 0) return i;
            }
        }
        return this.cards.length;
    }

    private widthAtIndex(i: number) {
        let s = 0;
        for (let j = 0; j < i; j++) {
            s += this.cards[j].effectWidth;
        }
        return s;
    }
}