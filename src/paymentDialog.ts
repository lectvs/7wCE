class PaymentDialog extends GameElement {

    private scene: GameScene;
    private card: Card;
    private move: API.Move;
    private activeWonder: Wonder;

    constructor(scene: GameScene, card: Card, move: API.Move, activeWonder: Wonder) {
        super();
        this.scene = scene;
        this.card = card;
        this.move = move;
        this.activeWonder = activeWonder;
        this.div.appendChild(this.draw());
    }

    update() {
        this.x = this.activeWonder.x + C.PAYMENT_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.PAYMENT_DIALOG_OFFSET_Y;
    }

    private draw() {
        let validPayments: API.Payment[] = API.minimalPaymentOptions(this.move, Main.gamestate.validMoves);

        let dialogDiv = document.createElement('div');
        dialogDiv.style.width = `${C.PAYMENT_DIALOG_WIDTH}px`;
        dialogDiv.style.height = `${validPayments.length * C.PAYMENT_DIALOG_PAYMENTS_DY + C.PAYMENT_DIALOG_EXTRA_HEIGHT}px`;
        dialogDiv.style.backgroundColor = C.PAYMENT_DIALOG_COLOR;
        dialogDiv.style.borderRadius = `${C.PAYMENT_DIALOG_CORNER_RADIUS}px`;
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = `translate(-50%, -50%)`;

        let dialogTitle = dialogDiv.appendChild(this.drawText(C.PAYMENT_DIALOG_TITLE, C.PAYMENT_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = `${C.PAYMENT_DIALOG_TITLE_PADDING}px`;

        let [negPlayer, posPlayer] = API.getNeighbors(Main.gamestate, Main.player);

        for (let i = 0; i < validPayments.length; i++) {
            let leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = `${50 - C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/2}%`;
            leftDiv.style.height = `${C.PAYMENT_DIALOG_PAYMENTS_DY}px`;
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            let middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = `${C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT}%`;
            middleDiv.style.height = `${C.PAYMENT_DIALOG_PAYMENTS_DY}px`;
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            let rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = `${50 - C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/2}%`;
            rightDiv.style.height = `${C.PAYMENT_DIALOG_PAYMENTS_DY}px`;
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';

            let payment = validPayments[i];
            if (payment.neg) {
                let paymentTextNegP = leftDiv.appendChild(this.drawText(`<-- ${payment.neg} to ${negPlayer}`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextNegP.style.width = '100%';
                paymentTextNegP.style.textAlign = 'right';
                paymentTextNegP.style.position = 'absolute';
                paymentTextNegP.style.top = '50%';
                paymentTextNegP.style.transform = 'translate(0, -50%)';
            }
            if (payment.pos) {
                let paymentTextPosP = rightDiv.appendChild(this.drawText(`to ${posPlayer} ${payment.pos} -->`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextPosP.style.width = '100%';
                paymentTextPosP.style.textAlign = 'left';
                paymentTextPosP.style.position = 'absolute';
                paymentTextPosP.style.top = '50%';
                paymentTextPosP.style.transform = 'translate(0, -50%)';
            }
            if (payment.free_with_zeus) {
                let paymentTextZeus1 = leftDiv.appendChild(this.drawText(`Free with`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextZeus1.style.width = '100%';
                paymentTextZeus1.style.textAlign = 'right';
                paymentTextZeus1.style.position = 'absolute';
                paymentTextZeus1.style.top = '50%';
                paymentTextZeus1.style.transform = 'translate(0, -50%)';
                let paymentTextZeus2 = rightDiv.appendChild(this.drawText(`Olympia :)`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextZeus2.style.width = '100%';
                paymentTextZeus2.style.textAlign = 'left';
                paymentTextZeus2.style.position = 'absolute';
                paymentTextZeus2.style.top = '50%';
                paymentTextZeus2.style.transform = 'translate(0, -50%)';
            }
            if (payment.free_with_delphoi) {
                let paymentTextDelphoi1 = leftDiv.appendChild(this.drawText(`Free with`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextDelphoi1.style.width = '100%';
                paymentTextDelphoi1.style.textAlign = 'right';
                paymentTextDelphoi1.style.position = 'absolute';
                paymentTextDelphoi1.style.top = '50%';
                paymentTextDelphoi1.style.transform = 'translate(0, -50%)';
                let paymentTextDelphoi2 = rightDiv.appendChild(this.drawText(`Delphoi :)`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextDelphoi2.style.width = '100%';
                paymentTextDelphoi2.style.textAlign = 'left';
                paymentTextDelphoi2.style.position = 'absolute';
                paymentTextDelphoi2.style.top = '50%';
                paymentTextDelphoi2.style.transform = 'translate(0, -50%)';
            }

            let payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.PAYMENT_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = `${C.PAYMENT_DIALOG_PAY_BUTTON_WIDTH}px`;
            payButton.style.height = `${C.PAYMENT_DIALOG_PAY_BUTTON_HEIGHT}px`;
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.style.color = C.PAYMENT_DIALOG_PAY_BUTTON_TEXT_COLOR;
            payButton.onclick = (event: MouseEvent) => {
                let trueMove: API.Move = {
                    action: this.move.action,
                    card: this.move.card,
                    index: this.move.index,
                    stage: this.move.stage,
                    copyPlayer: this.move.copyPlayer,
                    copyStage: this.move.copyStage,
                    payment: validPayments[i]
                }
                Main.submitMove(trueMove);
                this.removeFromGame(true);
            }

            if (payment.bank) {
                let payButtonText = payButton.appendChild(this.drawText(`${payment.bank} to bank`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                payButtonText.style.width = '100%';
                payButtonText.style.position = 'absolute';
                payButtonText.style.left = '50%';
                payButtonText.style.top = '50%';
                payButtonText.style.transform = 'translate(-50%, -50%)';
            }

            if (payment.free_with_delphoi) {
                let payButtonText = payButton.appendChild(this.drawText(`${Main.gamestate.playerData[Main.player].buildFreeWithoutChainUsages} left`, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                payButtonText.style.width = '100%';
                payButtonText.style.position = 'absolute';
                payButtonText.style.left = '50%';
                payButtonText.style.top = '50%';
                payButtonText.style.transform = 'translate(-50%, -50%)';
            }
        }

        let closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = `calc(100% - ${C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_X}px)`;
        closeButton.style.top = `${C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_Y}px`;
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = (event: MouseEvent) => {
            this.removeFromGame();
        }
        
        return dialogDiv;
    }

    private drawText(text: string, fontSize: number) {
        let p = document.createElement('p');
        p.textContent = text;
        p.style.textAlign = 'center';
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${fontSize}px`;
        return p;
    }

    private drawCloseButton() {
        let closeButton = new PIXI.Container();
        let X = ArtCommon.X(C.PAYMENT_DIALOG_CLOSE_BUTTON_COLOR);
        X.scale.set(C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
        X.position.set(100*C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE, 100*C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
        closeButton.addChild(X);
        return render(closeButton, 200*C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE, 200*C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
    }

    removeFromGame(success: boolean = false) {
        super.removeFromGame();
        this.scene.paymentDialog = null;
        if (!success) {
            this.card.deselect();
        }
    }
}