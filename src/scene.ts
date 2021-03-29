class Scene {
    wonders: Wonder[];
    militaryOverlays: MilitaryOverlay[];
    hands: Hand[];
    discardPile: DiscardPile;
    discardHand: Hand;
    paymentDialog: PaymentDialog;
    actionButton: ActionButton;

    get hand() { return this.hands[Main.gamestate.players.indexOf(Main.player)]; }
    get topWonder() { return this.wonders[Main.gamestate.players.indexOf(Main.player)]; }
    get isPaymentMenuActive() { return !!this.paymentDialog; }

    constructor() {
        this.wonders = [];
    }

    update() {
        for (let hand of this.hands) {
            hand.update();
        }

        this.actionButton.setType(this.isMyTurnToBuildFromDiscard() ? 'reject_discard' : 'undo');
        for (let wonder of this.wonders) {
            wonder.update();
        }

        this.topWonder.adjustPlaceholdersFor(this.hand.selectedCard);
        
        if (this.discardHand) {
            this.discardHand.update();
        }

        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
        this.setStatus();
    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;

        Main.game.style.height = `${C.WONDER_START_Y + C.WONDER_DY * Math.ceil((gamestate.players.length + 1) / 2)}px`;

        let cardsInHand = this.isMyTurnToBuildFromDiscard() ? gamestate.discardedCards : gamestate.hand;

        this.wonders = players.map(player => undefined);
        this.militaryOverlays = players.map(player => undefined);
        this.hands = players.map(player => undefined);

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);

        this.wonders[p] = new Wonder(Main.player);
        this.wonders[p].x = 0;
        this.wonders[p].y = C.WONDER_START_Y;
        this.wonders[p].addToGame();
        this.militaryOverlays[p] = new MilitaryOverlay();
        this.militaryOverlays[p].y = C.WONDER_START_Y;
        this.militaryOverlays[p].addToGame();
        this.hands[p] = new Hand(this.getHandPosition(p), { type: 'normal', cardIds: cardsInHand, activeWonder: this.wonders[p], validMoves: Main.gamestate.validMoves });
        this.hands[p].snap();

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            this.wonders[l] = new Wonder(players[l]);
            this.wonders[l].x = -C.WONDER_DX;
            this.wonders[l].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.wonders[l].addToGame();
            this.militaryOverlays[l] = new MilitaryOverlay();
            this.militaryOverlays[l].x = -C.WONDER_DX;
            this.militaryOverlays[l].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.militaryOverlays[l].addToGame();
            this.hands[l] = new Hand(this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: -1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();

            this.wonders[r] = new Wonder(players[r]);
            this.wonders[r].x = C.WONDER_DX;
            this.wonders[r].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.wonders[r].addToGame();
            this.militaryOverlays[r] = new MilitaryOverlay();
            this.militaryOverlays[r].x = C.WONDER_DX;
            this.militaryOverlays[r].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.militaryOverlays[r].addToGame();
            this.hands[r] = new Hand(this.getHandPosition(r), { type: 'back', player: players[r], age: gamestate.age, flankDirection: 1 });
            this.hands[r].state = { type: 'back', moved: !!gamestate.playerData[players[r]].currentMove };
            this.hands[r].scale = C.HAND_FLANK_SCALE;
            this.hands[r].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[r].snap();

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            this.wonders[l] = new Wonder(players[l]);
            this.wonders[l].x = 0;
            this.wonders[l].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.wonders[l].addToGame();
            this.militaryOverlays[l] = new MilitaryOverlay();
            this.militaryOverlays[l].x = 0;
            this.militaryOverlays[l].y = C.WONDER_START_Y + C.WONDER_DY*i;
            this.militaryOverlays[l].addToGame();
            this.hands[l] = new Hand(this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: 1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();
        }

        this.actionButton = new ActionButton();
        this.actionButton.x = 0;
        this.actionButton.y = C.ACTION_BUTTON_Y;
        this.actionButton.addToGame();

        this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);

        this.discardPile = new DiscardPile();
        this.discardPile.x = 0;
        this.discardPile.y = C.WONDER_START_Y + C.WONDER_DY;
        this.discardPile.addToGame();

        this.discardHand = new Hand(this.discardPile.getDiscardLockPoint(),
                            { type: 'discard', count: this.isMyTurnToBuildFromDiscard() ? 0 : gamestate.discardedCardCount, lastCardAge: gamestate.lastDiscardedCardAge });
        this.discardHand.state = { type: 'back', moved: false };
        this.discardHand.setZIndex(C.Z_INDEX_DISCARD_CARDS);
        this.discardHand.snap();

        this.update();
    }

    destroy() {
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
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
                if (gamestate.lastCardPlayers.length === 1) {
                    statusText.textContent = `Waiting for ${gamestate.lastCardPlayers[0]} to play their last card`;
                } else {
                    statusText.textContent = "Waiting for others to play their last cards";
                }
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

    getSourceSinkPosition() {
        return new PIXI.Point(this.discardPile.x, this.discardPile.y);
    }

    getHandOffScreenPoint() {
        return new PIXI.Point(0, -Main.getGameY() - 200);
    }

    getHandPosition(index: number) {
        let p = Main.gamestate.players.indexOf(Main.player);
        let l = mod(p-1, Main.gamestate.players.length);
        let r = mod(p+1, Main.gamestate.players.length);

        if (index === p) return new PIXI.Point(0, C.HAND_Y);

        let i: number;
        for (i = 1; i < Math.floor((Main.gamestate.players.length - 1)/2 + 1); i++) {
            if (index === l) return new PIXI.Point(-C.HAND_FLANK_DX, C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY);
            if (index === r) return new PIXI.Point(C.HAND_FLANK_DX, C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY);
            l = mod(l-1, Main.gamestate.players.length);
            r = mod(r+1, Main.gamestate.players.length);
        }

        if (Main.gamestate.players.length % 2 === 0) {
            if (index === l) return new PIXI.Point(C.HAND_LAST_DX, C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY);
        }

        console.log(`Hand position index ${index} is out of bounds`);
        return undefined;
    }

    private isMyTurnToBuildFromDiscard() {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    }
}