class PlayedCardEffectRoll {
    x: number;
    y: number;
    offsetx: number;
    offsety: number;
    reverse: boolean;

    cards: Card[];

    get width() { return sum(this.cards, card => card.effectWidth); }

    constructor(offsetx: number, offsety: number, reverse: boolean) {
        this.cards = [];
        this.x = 0;
        this.y = 0;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.reverse = reverse;
    }

    update() {
        let d = this.reverse ? -1 : 1;
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].x = (i === 0)
                ? this.x + d*this.cards[i].effectWidth/2
                : this.cards[i].x = this.cards[i-1].x + d*(this.cards[i-1].effectWidth/2 + this.cards[i].effectWidth/2);
            this.cards[i].y = this.y;
            this.cards[i].update();
        }
    }

    canAddCard(card: Card, maxWidth: number) {
        return this.width + card.effectWidth <= maxWidth;
    }

    addCard(card: Card) {
        card.zIndex = C.Z_INDEX_CARD_PLAYED;
        this.cards.push(card);
        this.update();
    }

    getNextPosition(card: Card) {
        let d = this.reverse ? -1 : 1;
        return new PIXI.Point(this.x + d*(this.width + card.effectWidth/2), this.y);
    }
}