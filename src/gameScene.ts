/// <reference path="./scene.ts" />

class GameScene extends Scene {
    wonders: Wonder[];
    militaryOverlays: MilitaryOverlay[];
    hands: Hand[];
    discardPile: DiscardPile;
    discardHand: Hand;
    seeFutureHand: Hand;
    paymentDialog: PaymentDialog;
    chooseGoldToLoseDialog: ChooseGoldToLoseDialog;
    copyStageDialog: CopyStageDialog;
    popup: Popup;
    actionButton: ActionButton;

    playedCards: Card[];

    get hand() { return this.hands[Main.gamestate.players.indexOf(Main.player)]; }
    get topWonder() { return this.wonders[Main.gamestate.players.indexOf(Main.player)]; }

    get isMenuActive() { return this.isPaymentMenuActive || this.isChooseGoldToLoseMenuActive || this.isCopyStageMenuActive; }
    get isPaymentMenuActive() { return !!this.paymentDialog; }
    get isChooseGoldToLoseMenuActive() { return !!this.chooseGoldToLoseDialog; }
    get isCopyStageMenuActive() { return !!this.copyStageDialog; }

    constructor() {
        super();
        this.wonders = [];
    }

    update() {
        for (let hand of this.hands) {
            hand.update();
        }

        if (this.isMyTurnToSeeFuture()) {
            this.actionButton.setType('accept_future');
        } else if (this.isMyTurnToBuildFromDiscard()) {
            this.actionButton.setType('reject_discard');
        } else {
            this.actionButton.setType('undo');
        }

        for (let i = 0; i < this.wonders.length; i++) {
            this.wonders[i].adjustPlaceholdersFor(this.hands[i].playedCard || this.hands[i].selectedCard);
            this.wonders[i].update();
        }
        
        if (this.discardHand) {
            this.discardHand.update();
        }

        if (this.seeFutureHand) {
            this.seeFutureHand.update();
        }

        if (this.paymentDialog) {
            this.paymentDialog.update();
        }

        if (this.chooseGoldToLoseDialog) {
            this.chooseGoldToLoseDialog.update();
        }

        if (this.copyStageDialog) {
            this.copyStageDialog.update();
        }
    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;

        let cardsInHand: number[];
        if (this.isMyTurnToSeeFuture()) {
            cardsInHand = gamestate.seeFutureCards;
        } else if (this.isMyTurnToBuildFromDiscard()) {
            cardsInHand = gamestate.discardedCards;
        } else {
            cardsInHand = gamestate.hand;
        }

        this.wonders = players.map(player => undefined);
        this.hands = players.map(player => undefined);
        this.playedCards = players.map(player => undefined);

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);
        let finalY = C.WONDER_TOP_Y;

        this.wonders[p] = new Wonder(this, gamestate.wonders[players[p]], players[p]);
        this.wonders[p].setPosition(this.getWonderPosition(p));
        this.wonders[p].addToGame();
        this.hands[p] = new Hand(this, this.getHandPosition(p), { type: 'normal', cardIds: cardsInHand, activeWonder: this.wonders[p], validMoves: Main.gamestate.validMoves, future: this.isMyTurnToSeeFuture() });
        this.hands[p].snap();
        finalY = this.wonders[p].y;

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            this.wonders[l] = new Wonder(this, gamestate.wonders[players[l]], players[l]);
            this.wonders[l].setPosition(this.getWonderPosition(l));
            this.wonders[l].addToGame();
            this.hands[l] = new Hand(this, this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: -1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();
            finalY = this.wonders[l].y;

            this.wonders[r] = new Wonder(this, gamestate.wonders[players[r]], players[r]);
            this.wonders[r].setPosition(this.getWonderPosition(r));
            this.wonders[r].addToGame();
            this.hands[r] = new Hand(this, this.getHandPosition(r), { type: 'back', player: players[r], age: gamestate.age, flankDirection: 1 });
            this.hands[r].state = { type: 'back', moved: !!gamestate.playerData[players[r]].currentMove };
            this.hands[r].scale = C.HAND_FLANK_SCALE;
            this.hands[r].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[r].snap();
            finalY = this.wonders[r].y;

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            this.wonders[l] = new Wonder(this, gamestate.wonders[players[l]], players[l]);
            this.wonders[l].setPosition(this.getWonderPosition(l));
            this.wonders[l].addToGame();
            this.hands[l] = new Hand(this, this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: 1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();
            finalY = this.wonders[l].y;
        }

        let padding = gamestate.players.length === 3 ? C.GAME_HEIGHT_PADDING_3P : C.GAME_HEIGHT_PADDING_4567P;
        Main.game.style.height = `${finalY + C.WONDER_BOARD_HEIGHT/2 + padding}px`;

        this.militaryOverlays = players.map(player => undefined);
        for (let i = 0; i < this.wonders.length; i++) {
            this.militaryOverlays[i] = new MilitaryOverlay();
            this.militaryOverlays[i].x = this.wonders[i].x;
            this.militaryOverlays[i].y = this.wonders[i].y;
            this.militaryOverlays[i].addToGame();
        }

        this.actionButton = new ActionButton(this);
        this.actionButton.x = 0;
        this.actionButton.y = C.ACTION_BUTTON_Y;
        this.actionButton.addToGame();

        if (gamestate.state !== 'CHOOSE_GOLD_TO_LOSE' && gamestate.state !== 'SEE_FUTURE') {
            this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);
        }

        this.discardPile = new DiscardPile();
        this.discardPile.x = C.DISCARD_PILE_X;
        this.discardPile.y = C.DISCARD_PILE_Y;
        this.discardPile.addToGame();

        this.discardHand = new Hand(this, this.discardPile.getDiscardLockPoint(),
                            { type: 'discard', count: this.isMyTurnToBuildFromDiscard() ? 0 : gamestate.discardedCardCount, lastCardAge: gamestate.lastDiscardedCardAge });
        this.discardHand.state = { type: 'back', moved: false };
        this.discardHand.setZIndex(C.Z_INDEX_DISCARD_CARDS);
        this.discardHand.snap();

        if (gamestate.state === 'CHOOSE_GOLD_TO_LOSE' && contains(gamestate.chooseGoldToLosePlayers, Main.player)) {
            this.startChooseGoldToLoseDialog();
        }

        this.update();
    }

    destroy() {
        for (let hand of this.hands) {
            hand.destroy();
        }

        for (let wonder of this.wonders) {
            wonder.destroy();
        }

        this.paymentDialog = undefined;
        this.chooseGoldToLoseDialog = undefined;

        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    }

    startPaymentDialog(card: Card, move: API.Move) {
        if (this.chooseGoldToLoseDialog) return;
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        this.paymentDialog = new PaymentDialog(this, card, move, this.topWonder);
        this.paymentDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    }

    startChooseGoldToLoseDialog() {
        if (this.chooseGoldToLoseDialog) return;
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        let gold = Main.gamestate.playerData[Main.player].gold;
        let goldToLose = Main.gamestate.playerData[Main.player].goldToLose;
        this.chooseGoldToLoseDialog = new ChooseGoldToLoseDialog(this, gold, goldToLose, this.topWonder);
        this.chooseGoldToLoseDialog.zIndex = C.Z_INDEX_CGTL_DIALOG;
        this.chooseGoldToLoseDialog.addToGame();
    }

    startCopyStageDialog(card: Card, move: API.Move) {
        if (this.chooseGoldToLoseDialog) return;
        if (this.paymentDialog) return;
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        this.copyStageDialog = new CopyStageDialog(this, card, move, this.topWonder);
        this.copyStageDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.copyStageDialog.addToGame();
    }

    getSourceSinkPosition() {
        return new PIXI.Point(this.discardPile.x, this.discardPile.y);
    }

    getHandOffScreenPoint() {
        return new PIXI.Point(0, -Main.getGameY() - 200);
    }

    getHandPosition(index: number) {
        let p = Main.gamestate.players.indexOf(Main.player);

        if (index === p) return new PIXI.Point(0, C.HAND_Y);

        let wonderPosition = this.getWonderPosition(index);

        if (wonderPosition.x < 0) {
            return new PIXI.Point(wonderPosition.x - (C.WONDER_BOARD_WIDTH/2 + C.HAND_FLANK_DX), wonderPosition.y + C.HAND_FLANK_DY);
        }

        return new PIXI.Point(wonderPosition.x + (C.WONDER_BOARD_WIDTH/2 + C.HAND_FLANK_DX), wonderPosition.y + C.HAND_FLANK_DY);
    }

    isCurrentlyDragging() {
        return this.hand && this.hand.cards.some(card => card.state.type.startsWith('dragging'));
    }

    private isMyTurnToBuildFromDiscard() {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    }

    private isMyTurnToSeeFuture() {
        return Main.gamestate.state === 'SEE_FUTURE' && contains(Main.gamestate.seeFuturePlayers, Main.player);
    }
}