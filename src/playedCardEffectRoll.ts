class PlayedCardEffectRoll extends PIXI.Container {
    cards: Card[];

    private reverse: boolean;

    constructor(reverse: boolean) {
        super();
        this.cards = [];
        this.reverse = reverse;
    }

    addCard(card: Card) {
        card.position.set(this.getNextLocalX(card, 1), 0);
        this.addChild(card);
        this.cards.push(card);
    }

    getNextX(card: Card, scaleX: number) {
        let localX = this.getNextLocalX(card, scaleX);
        return this.x + localX * this.scale.x;
    }

    getWidth() {
        return sum(this.cards, card => card.getWidth());
    }

    private getNextLocalX(card: Card, scaleX: number) {
        let d = this.reverse ? -1 : 1;
        return d*(this.getWidth() + card.getEffectRollOffsetX(this.reverse)/scaleX);
    }
}