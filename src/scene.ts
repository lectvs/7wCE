class Scene {
    wonders: Wonder[];
    hand: Hand;
    discardHand: Hand;
    undoButton: PIXI.Container;
    discardRejectButton: PIXI.Container;
    discardPile: PIXI.Container;
    paymentMenu: PIXI.Container;
    statusBar: PIXI.Container;
    statusText: PIXI.Text;
    endScreen: EndScreen;

    mainContainer: PIXI.Container;

    wonderStartY: number = 700;
    wonderDY: number = 500;

    get isPaymentMenuActive() {
        return this.paymentMenu && this.paymentMenu.visible;
    }

    constructor() {
        this.mainContainer = new PIXI.Container();
    }

    update() {
        this.setStateText();
        this.hand.update();
        this.discardHand.update();

        let myDiscardTurn = this.myTurnToBuildFromDiscard();
        this.hand.setVisible(!myDiscardTurn);
        this.discardHand.setVisible(myDiscardTurn);
        this.undoButton.visible = !myDiscardTurn && !!Main.gamestate.playerData[Main.player].currentMove;
        this.discardRejectButton.visible = myDiscardTurn;
    }

    create() {
        let gamestate = Main.gamestate;
        let player = Main.player;

        let discardWidth = 250;
        let discardHeight = 300;

        this.mainContainer.removeChildren();

        this.discardPile = new PIXI.Container();
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2, -discardHeight/2, discardWidth, discardHeight, 10, 0x888888));
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2+4, -discardHeight/2+4, discardWidth-8, discardHeight-8, 6, 0x000000));
        this.discardPile.addChild(Shapes.centeredText(0, -125, "Discard", 0.25, 0x888888));

        if (gamestate.discardedCardCount > 0) {
            let pile = Card.flippedCardForAge(gamestate.lastDiscardedCardAge, undefined);
            pile.scale.set(2);
            pile.position.set(0, -36*pile.scale.y);
            pile.addChild(Shapes.centeredText(0, 36, `${gamestate.discardedCardCount}`, 0.2, ArtCommon.ageBacks[pile.apiCard.age]));
            this.discardPile.addChild(pile);
        }

        this.mainContainer.addChild(this.discardPile);

        this.wonders = [];
        for (let i = 0; i < gamestate.players.length; i++) {
            let player = gamestate.players[i];
            let wonder = new Wonder(gamestate.wonders[player], gamestate.playerData[player], player);
            this.mainContainer.addChild(wonder);
            this.wonders.push(wonder);
        }

        this.hand = new Hand(this.mainContainer, gamestate.hand, this.wonders[gamestate.players.indexOf(player)], this.discardPile);
        this.hand.reflectMove(gamestate.playerData[player].currentMove);

        this.discardHand = new Hand(this.mainContainer, gamestate.discardedCards || [], this.wonders[gamestate.players.indexOf(player)], this.discardPile);

        this.undoButton = new PIXI.Container();
        this.undoButton.addChild(Shapes.filledRoundedRect(-60, -30, 120, 60, 10, 0xFFFFFF));
        this.undoButton.addChild(Shapes.centeredText(0, 0, "Undo", 0.28, 0x000000));
        this.undoButton.interactive = true;
        this.undoButton.buttonMode = true;
        this.undoButton.on('click', () => {
            Main.undoMove();
        });
        this.mainContainer.addChild(this.undoButton);

        this.discardRejectButton = new PIXI.Container();
        this.discardRejectButton.addChild(Shapes.filledRoundedRect(-80, -30, 160, 60, 10, 0xFFFFFF));
        this.discardRejectButton.addChild(Shapes.centeredText(0, 0, "No thanks", 0.28, 0x000000));
        this.discardRejectButton.interactive = true;
        this.discardRejectButton.buttonMode = true;
        this.discardRejectButton.on('click', () => {
            Main.submitMove({ action: 'reject', card: -1, payment: {} });
        });
        this.mainContainer.addChild(this.discardRejectButton);

        this.paymentMenu = new PIXI.Container();
        this.paymentMenu.visible = false;
        this.mainContainer.addChild(this.paymentMenu);

        this.statusBar = new PIXI.Container();
        this.statusBar.addChild(Shapes.filledRoundedRect(-400, -50, 800, 100, 20, 0xDDDDDD));
        this.mainContainer.addChild(this.statusBar);

        this.statusText = Shapes.centeredText(0, 22, "", 0.28, 0x000000);
        this.statusBar.addChild(this.statusText);

        this.endScreen = new EndScreen();
        this.endScreen.visible = (gamestate.state === 'GAME_COMPLETE');
        this.mainContainer.addChild(this.endScreen);

        this.adjustPositions();
        this.setStateText();
        this.update();
    }

    adjustPositions() {
        let gamestate = Main.gamestate;
        let player = Main.player;

        let wonderScale = 2.5;
        let wonderDX = Main.width/4;
        let discardY = 1200;

        // WONDERS
        let p = gamestate.players.indexOf(player);
        this.wonders[p].position.set(Main.width/2, this.wonderStartY);
        this.wonders[p].scale.set(wonderScale);

        let l = mod(p-1, gamestate.players.length);
        let r = mod(p+1, gamestate.players.length);

        let i: number;
        for (i = 1; i < gamestate.players.length/2; i++) {
            this.wonders[l].position.set(Main.width/2 - wonderDX, this.wonderStartY + this.wonderDY*i);
            this.wonders[l].scale.set(wonderScale);
            this.wonders[r].position.set(Main.width/2 + wonderDX, this.wonderStartY + this.wonderDY*i);
            this.wonders[r].scale.set(wonderScale);
            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length); 
        }

        if (gamestate.players.length % 2 === 0) {
            this.wonders[l].position.set(Main.width/2, this.wonderStartY + this.wonderDY*i);
            this.wonders[l].scale.set(wonderScale);
        }

        // DISCARD PILE
        this.discardPile.position.set(Main.width/2, discardY);

        this.statusBar.position.set(Main.width/2, 0);

        this.endScreen.position.set(Main.width/2, window.innerHeight/2);
        this.endScreen.adjustPositions();

        // HAND
        this.hand.adjustPositions();
        this.undoButton.position.set(Main.width/2, 360);
        this.discardRejectButton.position.set(Main.width/2, 360);
    }

    startPaymentDialog(move: API.Move, x: number, y: number) {
        let validPayments: API.Payment[] = API.minimalPaymentOptions(move, Main.gamestate.validMoves);

        let paymentsStart = -100;
        let paymentsDX = 50;
        let paymentsDY = 50;

        this.paymentMenu.position.set(x, y);
        this.paymentMenu.removeChildren();
        let paymentTitle = Shapes.centeredText(0, -160, "Payment", 0.25, 0x000000);
        this.paymentMenu.addChild(paymentTitle);

        let [negPlayer, posPlayer] = API.getNeighbors(Main.gamestate, Main.player);

        for (let i = 0; i < validPayments.length; i++) {
            let payment = validPayments[i];
            if (payment.neg) {
                let paymentTextNeg = Shapes.centeredText(-paymentsDX, paymentsStart + i*paymentsDY, `<-- ${payment.neg} to ${negPlayer}`, 0.25, 0x000000);
                paymentTextNeg.anchor.set(1, 0.5);
                this.paymentMenu.addChild(paymentTextNeg);
            }
            if (payment.pos) {
                let paymentTextPos = Shapes.centeredText(paymentsDX, paymentsStart + i*paymentsDY, `to ${posPlayer} ${payment.pos} -->`, 0.25, 0x000000);
                paymentTextPos.anchor.set(0, 0.5);
                this.paymentMenu.addChild(paymentTextPos);
            }
            let paymentButton = Shapes.filledRoundedRect(-28, -20, 56, 40, 8, 0x000088);
            paymentButton.position.set(0, paymentsStart + i*paymentsDY);
            paymentButton.interactive = true;
            paymentButton.buttonMode = true;
            paymentButton.on('click', () => {
                let trueMove: API.Move = {
                    action: move.action,
                    card: move.card,
                    stage: move.stage,
                    payment: validPayments[i]
                }
                Main.submitMove(trueMove);
                this.paymentMenu.visible = false;
            });
            this.paymentMenu.addChild(paymentButton);
        }

        let bounds = this.paymentMenu.getLocalBounds();
        let halfWidth = Math.max(Math.abs(bounds.left), Math.abs(bounds.left + bounds.width));
        let margin = 20;

        let closeButton = Shapes.filledRoundedRect(-20, -20, 40, 40, 3, 0xFFFFFF);
        closeButton.position.set(halfWidth - 10, bounds.top + 10);
        this.paymentMenu.addChild(closeButton);

        let X = ArtCommon.X(0x000000);
        X.scale.set(0.3);
        closeButton.addChild(X);

        closeButton.interactive = true;
        closeButton.buttonMode = true;
        closeButton.on('click', () => {
            this.paymentMenu.visible = false;
        });

        this.paymentMenu.addChildAt(Shapes.filledRoundedRect(-halfWidth - margin, bounds.top - margin, 2*halfWidth + 2*margin, bounds.height + 2*margin + 40, 10, 0xFFFFFF), 0);
        this.paymentMenu.visible = true;
        this.paymentMenu.parent.setChildIndex(this.paymentMenu, this.paymentMenu.parent.children.length-1);
    }

    setStateText() {
        let gamestate = Main.gamestate;
        let playerData = gamestate.playerData[Main.player];

        if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                this.statusText.text = "Waiting for others to move";
            } else {
                this.statusText.text = "You must play a card";
            }
        } else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                this.statusText.text = "Waiting for others to play their last card";
            } else {
                this.statusText.text = "You may play your last card";
            }
        } else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === Main.player) {
                this.statusText.text = "You may build a card from the discard pile";
            } else {
                this.statusText.text = `Waiting for ${gamestate.discardMoveQueue[0]} to build a card from the discard pile`;
            }
        } else if (gamestate.state === 'GAME_COMPLETE') {
            this.statusText.text = "Game complete";
        }
    }

    private myTurnToBuildFromDiscard() {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    }
}