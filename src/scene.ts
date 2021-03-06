class Scene {
    wonders: Wonder[];
    hand: Hand;
    discardHand: Hand;
    discardPile: PIXI.Container;
    paymentMenu: PIXI.Container;
    statusBar: PIXI.Container;
    statusText: PIXI.Text;

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
        let discardTitle = new PIXI.Text("Discard", { fontFamily : 'Arial', fontSize: 70, fill : 0x888888 });
        discardTitle.anchor.set(0.5, 0.5);
        discardTitle.scale.set(0.35, 0.35);
        discardTitle.position.set(0, -125);
        this.discardPile.addChild(discardTitle);
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
        this.discardHand.reflectMove(gamestate.playerData[player].currentMove);

        this.paymentMenu = new PIXI.Container();
        this.paymentMenu.visible = false;
        this.mainContainer.addChild(this.paymentMenu);

        this.statusBar = new PIXI.Container();
        this.statusBar.addChild(Shapes.filledRoundedRect(-400, -50, 800, 100, 20, 0xDDDDDD));
        this.mainContainer.addChild(this.statusBar);

        this.statusText = new PIXI.Text("", { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
        this.statusText.anchor.set(0.5, 0.5);
        this.statusText.scale.set(0.4, 0.4);
        this.statusText.position.set(0, 22);
        this.statusBar.addChild(this.statusText);

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

        this.hand.adjustPositions();
    }

    startPaymentDialog(move: API.Move, x: number, y: number) {
        let validPayments: API.Payment[] = API.minimalPaymentOptions(move, Main.gamestate.validMoves);

        let paymentsStart = -100;
        let paymentsDX = 50;
        let paymentsDY = 50;

        this.paymentMenu.position.set(x, y);
        this.paymentMenu.removeChildren();
        let paymentTitle = new PIXI.Text("Payment", { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
        paymentTitle.anchor.set(0.5, 0.5);
        paymentTitle.scale.set(0.35, 0.35);
        paymentTitle.position.set(0, -160);
        this.paymentMenu.addChild(paymentTitle);

        let [negPlayer, posPlayer] = API.getNeighbors(Main.gamestate, Main.player);

        for (let i = 0; i < validPayments.length; i++) {
            let payment = validPayments[i];
            if (payment.neg) {
                let paymentTextNeg = new PIXI.Text(`<-- ${payment.neg} to ${negPlayer}`, { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
                paymentTextNeg.anchor.set(1, 0.5);
                paymentTextNeg.scale.set(0.35, 0.35);
                paymentTextNeg.position.set(-paymentsDX, paymentsStart + i*paymentsDY);
                this.paymentMenu.addChild(paymentTextNeg);
            }
            if (payment.pos) {
                let paymentTextPos = new PIXI.Text(`to ${posPlayer} ${payment.pos} -->`, { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
                paymentTextPos.anchor.set(0, 0.5);
                paymentTextPos.scale.set(0.35, 0.35);
                paymentTextPos.position.set(paymentsDX, paymentsStart + i*paymentsDY);
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