class PaymentDialog extends GameElement {

    private card: Card;
    private move: API.Move;
    private activeWonder: Wonder;

    constructor(card: Card, move: API.Move, activeWonder: Wonder) {
        super();
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

            let payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.PAYMENT_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = `${C.PAYMENT_DIALOG_PAY_BUTTON_WIDTH}px`;
            payButton.style.height = `${C.PAYMENT_DIALOG_PAY_BUTTON_HEIGHT}px`;
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.onclick = (event: MouseEvent) => {
                let trueMove: API.Move = {
                    action: this.move.action,
                    card: this.move.card,
                    stage: this.move.stage,
                    payment: validPayments[i]
                }
                Main.submitMove(trueMove);
                this.removeFromGame(true);
            }
        }

        let closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = 'calc(100% - 20px)';
        closeButton.style.top = '20px';
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
        let X = ArtCommon.X(0x000000);
        X.scale.set(0.2);
        X.position.set(18, 18);
        closeButton.addChild(X);
        return render(closeButton, 36, 36);
    }

    removeFromGame(success: boolean = false) {
        super.removeFromGame();
        Main.scene.paymentDialog = null;
        if (!success) {
            this.card.deselect();
        }
    }
}