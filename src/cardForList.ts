class CardForList extends GameElement {
    private scene: CardListScene;

    apiCard: API.Card;

    constructor(scene: CardListScene, cardId: number) {
        super();

        this.scene = scene;
        this.apiCard = Main.gamestate.cards[cardId];

        this.div.style.width = `${C.CARD_LIST_CARD_WIDTH}px`;
        this.div.style.height = `${C.CARD_LIST_CARD_HEIGHT}px`;

        // Popup
        this.div.onmousemove = () => {
            if (Main.scene.isCurrentlyDragging()) {
                this.scene.stopPopup(this);
                return;
            }
            this.scene.updatePopup(this, this.x, this.y + C.CARD_LIST_CARD_HEIGHT);
        };

        this.div.onmouseleave = () => {
            this.scene.stopPopup(this);
        };
    }
}