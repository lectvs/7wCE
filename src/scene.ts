class Scene {

    mouseX: number = 0;
    mouseY: number = 0;

    wonders: Wonder[];
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
        // document.getElementById('game').childNodes.forEach((child: HTMLElement) => {
        //     child.style.display = 'none';
        // });

        for (let hand of this.hands) {
            hand.update();
        }

        this.actionButton.setType(this.isMyTurnToBuildFromDiscard() ? 'reject_discard' : 'undo');
        for (let wonder of this.wonders) {
            wonder.update();
        }

        if (this.discardHand) {
            this.discardHand.update();
        }

        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
        this.setStatus();

        // document.getElementById('game').childNodes.forEach((child: HTMLElement) => {
        //     child.style.display = 'block';
        // });
    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;

        document.getElementById('game').style.height = `${C.WONDER_START_Y + C.WONDER_DY * Math.ceil((gamestate.players.length + 1) / 2)}px`;

        let cardsInHand = this.isMyTurnToBuildFromDiscard() ? gamestate.discardedCards : gamestate.hand;

        this.wonders = players.map(player => undefined);
        this.hands = players.map(player => undefined);

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);

        let playerWonder = new Wonder(Main.player);
        playerWonder.xs = '50%';
        playerWonder.y = C.WONDER_START_Y;
        playerWonder.addToGame();
        this.wonders[p] = playerWonder;
        this.hands[p] = new Hand('50%', `${C.HAND_Y}px`, { type: 'normal', cardIds: cardsInHand, activeWonder: playerWonder, validMoves: Main.gamestate.validMoves });
        this.hands[p].snap();

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            let wonder_l = new Wonder(players[l]);
            wonder_l.xs = `calc(50% - ${C.WONDER_DX}px)`;
            wonder_l.y = C.WONDER_START_Y + C.WONDER_DY*i;
            wonder_l.addToGame();
            this.wonders[l] = wonder_l;
            this.hands[l] = new Hand(`calc(50% - ${C.HAND_FLANK_DX}px)`, `${C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY}px`,
                                        { type: 'back', player: players[l], age: gamestate.age, flankDirection: -1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].snap();

            let wonder_r = new Wonder(players[r]);
            wonder_r.xs = `calc(50% + ${C.WONDER_DX}px)`;
            wonder_r.y = C.WONDER_START_Y + C.WONDER_DY*i;
            wonder_r.addToGame();
            this.wonders[r] = wonder_r;
            this.hands[r] = new Hand(`calc(50% + ${C.HAND_FLANK_DX}px)`, `${C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY}px`,
                                        { type: 'back', player: players[r], age: gamestate.age, flankDirection: 1 });
            this.hands[r].state = { type: 'back', moved: !!gamestate.playerData[players[r]].currentMove };
            this.hands[r].scale = C.HAND_FLANK_SCALE;
            this.hands[r].snap();

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            let lastWonder = new Wonder(players[l]);
            lastWonder.xs = '50%';
            lastWonder.y = C.WONDER_START_Y + C.WONDER_DY*i;
            lastWonder.addToGame();
            this.wonders[l] = lastWonder;
            this.hands[l] = new Hand(`calc(50% + ${C.HAND_LAST_DX}px)`, `${C.WONDER_START_Y + C.WONDER_DY*i + C.HAND_FLANK_DY}px`,
                                        { type: 'back', player: players[l], age: gamestate.age, flankDirection: 1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].snap();
        }

        this.actionButton = new ActionButton();
        this.actionButton.xs = '50%';
        this.actionButton.y = C.ACTION_BUTTON_Y;
        this.actionButton.addToGame();

        this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);

        this.discardPile = new DiscardPile();
        this.discardPile.xs = '50%';
        this.discardPile.y = C.WONDER_START_Y + C.WONDER_DY;
        this.discardPile.addToGame();

        let discardPoint = this.discardPile.getDiscardLockPoint();
        this.discardHand = new Hand('50%', `${discardPoint.y}px`,
                            { type: 'discard', count: this.isMyTurnToBuildFromDiscard() ? 0 : gamestate.discardedCardCount, lastCardAge: gamestate.lastDiscardedCardAge });
        this.discardHand.state = { type: 'moving' };
        this.discardHand.snap();

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

    private isMyTurnToBuildFromDiscard() {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    }
}