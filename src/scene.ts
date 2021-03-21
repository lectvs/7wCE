class Scene {

    mouseX: number = 0;
    mouseY: number = 0;

    wonders: Wonder[];
    hand: Hand;
    discardPile: DiscardPile;
    topDiscardCard: Card;
    paymentDialog: PaymentDialog;
    actionButton: ActionButton;

    get isPaymentMenuActive() { return !!this.paymentDialog; }

    constructor() {
        this.wonders = [];
    }

    update() {
        this.hand.update();
        this.actionButton.setType(this.isMyTurnToBuildFromDiscard() ? 'reject_discard' : 'undo');
        for (let wonder of this.wonders) {
            wonder.update();
        }
        
        if (this.topDiscardCard) {
            let discardPoint = this.discardPile.getDiscardLockPoint();
            this.topDiscardCard.x = discardPoint.x;
            this.topDiscardCard.y = discardPoint.y;
        }

        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
        this.setStatus();
    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;

        document.getElementById('game').style.height = `${C.WONDER_START_Y + C.WONDER_DY * Math.ceil((gamestate.players.length + 1) / 2)}px`;

        this.wonders = players.map(player => undefined);

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);

        let playerWonder = new Wonder(Main.player);
        playerWonder.xs = '50%';
        playerWonder.y = C.WONDER_START_Y;
        playerWonder.addToGame();
        this.wonders[p] = playerWonder;

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            let wonder_l = new Wonder(players[l]);
            wonder_l.xs = `calc(50% - ${C.WONDER_DX}px)`;
            wonder_l.y = C.WONDER_START_Y + C.WONDER_DY*i;
            wonder_l.addToGame();
            this.wonders[l] = wonder_l;

            let wonder_r = new Wonder(players[r]);
            wonder_r.xs = `calc(50% + ${C.WONDER_DX}px)`;
            wonder_r.y = C.WONDER_START_Y + C.WONDER_DY*i;
            wonder_r.addToGame();
            this.wonders[r] = wonder_r;

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            let lastWonder = new Wonder(players[l]);
            lastWonder.xs = '50%';
            lastWonder.y = C.WONDER_START_Y + C.WONDER_DY*i;
            lastWonder.addToGame();
            this.wonders[l] = lastWonder;
        }

        this.actionButton = new ActionButton();
        this.actionButton.xs = '50%';
        this.actionButton.y = C.ACTION_BUTTON_Y;
        this.actionButton.addToGame();

        let cardsInHand: number[];
        if (this.isMyTurnToBuildFromDiscard()) {
            cardsInHand = gamestate.discardedCards;
        } else if (gamestate.state === 'DISCARD_MOVE') {
            cardsInHand = [];
        } else {
            cardsInHand = gamestate.hand;
        }

        this.hand = new Hand(cardsInHand, this.wonders[p]);
        this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);

        this.discardPile = new DiscardPile();
        this.discardPile.xs = '50%';
        this.discardPile.y = C.WONDER_START_Y + C.WONDER_DY;
        this.discardPile.addToGame();

        if (gamestate.discardedCardCount > 0) {
            this.topDiscardCard = Card.flippedCardForAge(gamestate.lastDiscardedCardAge, false);
            this.topDiscardCard.addDiscardCountText();
            this.topDiscardCard.addToGame();
        }

        document.getElementById('game').onmousemove = (event: MouseEvent) => {
            event.preventDefault();
            this.mouseX = event.pageX;
            this.mouseY = event.pageY - Main.getGameY();
        }

        this.update();
    }

    destroy() {
        let game = document.getElementById('game');
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        }
    }

    startPaymentDialog(card: Card, move: API.Move) {
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        this.paymentDialog = new PaymentDialog(card, move, this.wonders[Main.gamestate.players.indexOf(Main.player)]);
        this.paymentDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    }

    setStatus() {
        let gamestate = Main.gamestate;
        let playerData = gamestate.playerData[Main.player];

        let statusText = <HTMLParagraphElement>document.querySelector('#status > p');

        if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                statusText.textContent = "Waiting for others to move";
            } else {
                statusText.textContent = "You must play a card";
            }
        } else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                statusText.textContent = "Waiting for others to play their last card";
            } else {
                statusText.textContent = "You may play your last card";
            }
        } else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === Main.player) {
                statusText.textContent = "You may build a card from the discard pile";
            } else {
                statusText.textContent = `Waiting for ${gamestate.discardMoveQueue[0]} to build a card from the discard pile`;
            }
        } else if (gamestate.state === 'GAME_COMPLETE') {
            statusText.textContent = "Game complete";
        }
    }

    private isMyTurnToBuildFromDiscard() {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    }
}