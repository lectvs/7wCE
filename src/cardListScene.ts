class CardListScene {
    cards: Card[];

    popup: Popup;

    constructor() {
        this.cards = [];
    }

    update() {
        for (let card of this.cards) {
            card.update();
        }
    }

    create() {
        let cardList = Main.cardList.appendChild(Resources.CARD_LIST);
        let height = cardList.height/resolution;
        cardList.style.top = `${height/2 + C.CARD_LIST_OFFSET_Y}px`;

        Main.cardList.style.height = `${height + C.CARD_LIST_PADDING + C.CARD_LIST_OFFSET_Y}px`;

        if (Main.gamestate.hideDeck) {
            return;
        }

        let deck = Main.gamestate.deck;

        for (let age = 1; age <= 3; age++) {
            let x = (age-2) * C.CARD_LIST_CARD_DX;
            let y = 0;

            for (let cardInfo of deck[age]) {
                let card = new CardForList(this, cardInfo.id);
                card.x = x - C.CARD_LIST_CARD_WIDTH/2;
                card.y = y - C.CARD_LIST_CARD_HEIGHT/2;
                card.addToGame(Main.cardList);

                y += C.CARD_LIST_CARD_DY;
            }
        }
    }

    destroy() {

    }

    updatePopup(source: CardForList, x: number, y: number) {
        if (this.popup && this.popup.getSource() !== source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
        if (!this.popup) {
            this.popup = new CardInfoPopup(source)
            this.popup.zIndex = C.Z_INDEX_CARD_POPUP;
            this.popup.addToGame(Main.cardList);
        }
        this.popup.x = clamp(x, -window.innerWidth/2 + window.pageXOffset, window.innerWidth/2 + window.pageXOffset - this.popup.width);
        this.popup.y = y;
    }

    stopPopup(source: Popup.Source) {
        if (this.popup && this.popup.getSource() === source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
    }

    protected headerText(text: string, xs: string, ys: string) {
        let p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${C.CARD_LIST_HEADER_TEXT_SIZE}px`;
        p.style.color = C.CARD_LIST_HEADER_TEXT_COLOR;
        p.style.transform = 'translate(0%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }
}