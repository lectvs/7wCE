type HandData = { type: 'normal', cardIds: number[], activeWonder: Wonder, validMoves: API.Move[] }
              | { type: 'back', player: string, age: number, flankDirection: number }
              | { type: 'discard', count: number, lastCardAge: number };

type HandState = { type: 'normal' }
               | { type: 'back', moved: boolean };

class Hand {
    cardIds: number[];
    activeWonder: Wonder;
    flankDirection: number;

    x: number;
    y: number;

    state: HandState;
    cards: Card[];

    scale: number;

    private splicedSelectedCard: Card;
    get selectedCard() {
        if (this.splicedSelectedCard) return this.splicedSelectedCard;
        for (let card of this.cards) {
            if (card.state.type.startsWith('locked')) {
                return card;
            }
        }
        return undefined;
    }

    constructor(position: PIXI.Point, handData: HandData) {
        this.state = { type: 'normal' };
        this.x = position.x;
        this.y = position.y;
        this.scale = 1;
        this.createWithData(handData);
    }

    update() {
        for (let i = 0; i < this.cards.length; i++) {
            let nhp = this.getNormalHandPosition(i);
            this.cards[i].handPosition?.set(nhp.x, nhp.y);
            if (this.state.type === 'normal') {
                if (this.cards[i].state.type === 'in_hand_moving') {
                    this.cards[i].state = { type: 'in_hand', visualState: 'full' };
                }
                this.cards[i].scale = this.scale;
            } else {
                if (this.cards[i].state.type === 'in_hand') {
                    this.cards[i].state = { type: 'in_hand_moving' };
                }
                // No, this should NOT be an 'else'
                if (this.cards[i].state.type === 'in_hand_moving') {
                    this.cards[i].targetPosition.set(this.x, this.y);
                    this.cards[i].scale = this.scale;
                }

                this.cards[i].checkMarkVisible = (this.state.moved && i === this.cards.length-1);
            }
            this.cards[i].update();
        }
    }

    createWithData(handData: HandData) {
        this.cards = [];

        this.cardIds = handData.type === 'normal'
                        ? handData.cardIds
                        : filledArray(handData.type === 'back' ? Main.gamestate.playerData[handData.player].handCount : handData.count, -1);
        this.activeWonder = handData.type === 'normal' ? handData.activeWonder : undefined;
        this.flankDirection = handData.type === 'back' ? handData.flankDirection : 1;

        for (let i = 0; i < this.cardIds.length; i++) {
            let handPosition = this.getNormalHandPosition(i);
            let card = handData.type === 'normal'
                        ? new Card(this.cardIds[i], Main.gamestate.cards[this.cardIds[i]], handPosition, this.activeWonder, handData.validMoves)
                        : Card.flippedCardForAge(handData.type === 'back' ? handData.age : handData.lastCardAge, false);
            card.x = handPosition.x;
            card.y = handPosition.y;
            card.addToGame();
            this.cards.push(card);

            card.state = { type: 'in_hand', visualState: 'full' };
        }

        if (this.cards.length > 0 && handData.type === 'discard') {
            this.cards[this.cards.length-1].addDiscardCountText();
        }
    }

    destroy() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].removeFromGame();
        }
    }

    snap() {
        this.update();
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].snap();
        }
        this.update();
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

    makeMove() {
        if (this.state.type === 'back') this.state.moved = true;
    }

    undoMove() {
        if (this.state.type === 'back') this.state.moved = false;
    }

    setZIndex(zIndex: number) {
        for (let card of this.cards) {
            card.zIndex = zIndex;
        }
    }

    setAllCardState(state: CardState) {
        for (let card of this.cards) {
            card.state = state;
        }
    }

    getPosition() {
        return new PIXI.Point(this.x, this.y);
    }

    getNormalHandPosition(cardIndex: number) {
        let cardsInHand = [];
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].state.type.startsWith('in_hand')) {
                cardsInHand.push(this.cards[i]);
            } else if (i < cardIndex) {
                cardIndex--;
            }
        }
        let position = this.getPosition();
        position.x += (cardIndex - (cardsInHand.length - 1)/2) * C.HAND_CARD_DX;
        return position;
    }

    spliceSelectedCard() {
        let selectedCard = this.selectedCard;
        if (selectedCard) {
            [this.splicedSelectedCard] = this.cards.splice(this.cards.indexOf(selectedCard), 1);
        }
        return selectedCard;
    }
}