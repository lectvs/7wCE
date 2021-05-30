class CopyStageDialog extends GameElement {

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
        this.x = this.activeWonder.x + C.COPY_STAGE_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.COPY_STAGE_DIALOG_OFFSET_Y;
    }

    private draw() {
        let copyStageOptions = API.copyStageOptions(this.move.stage, Main.gamestate.validMoves);

        let dialogDiv = document.createElement('div');
        dialogDiv.style.width = `${C.COPY_STAGE_DIALOG_WIDTH}px`;
        dialogDiv.style.height = `${copyStageOptions.length * C.COPY_STAGE_DIALOG_PAYMENTS_DY + C.COPY_STAGE_DIALOG_EXTRA_HEIGHT}px`;
        dialogDiv.style.backgroundColor = C.COPY_STAGE_DIALOG_COLOR;
        dialogDiv.style.borderRadius = `${C.COPY_STAGE_DIALOG_CORNER_RADIUS}px`;
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = `translate(-50%, -50%)`;

        let dialogTitle = dialogDiv.appendChild(this.drawText(C.COPY_STAGE_DIALOG_TITLE, C.COPY_STAGE_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = `${C.COPY_STAGE_DIALOG_TITLE_PADDING}px`;

        for (let i = 0; i < copyStageOptions.length; i++) {
            let leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = `${33 - C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/3}%`;
            leftDiv.style.height = `${C.COPY_STAGE_DIALOG_PAYMENTS_DY}px`;
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            let middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = `${C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT}%`;
            middleDiv.style.height = `${C.COPY_STAGE_DIALOG_PAYMENTS_DY}px`;
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            let rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = `${67 - 2*C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/3}%`;
            rightDiv.style.height = `${C.COPY_STAGE_DIALOG_PAYMENTS_DY}px`;
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';

            let option = copyStageOptions[i];

            let optionStage = Main.gamestate.wonders[option.copyPlayer].stages[option.copyStage];


            let effectContainer = new PIXI.Container();
            effectContainer.addChild(ArtCommon.getShadowForEffects(optionStage.effects, 'dark'));
            effectContainer.addChild(ArtCommon.getArtForEffects(optionStage.effects));

            let effectDiv = ArtCommon.domElementForArt(effectContainer, 0.25, 20);
            effectDiv.style.transform = 'translate(0%, -50%)';
            effectDiv.style.position = 'absolute';
            effectDiv.style.left = `${-20}px`;
            effectDiv.style.top = '50%';

            rightDiv.appendChild(effectDiv);

            let payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.COPY_STAGE_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = `${C.COPY_STAGE_DIALOG_PAY_BUTTON_WIDTH}px`;
            payButton.style.height = `${C.COPY_STAGE_DIALOG_PAY_BUTTON_HEIGHT}px`;
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.style.color = C.COPY_STAGE_DIALOG_PAY_BUTTON_TEXT_COLOR;
            payButton.onclick = (event: MouseEvent) => {
                let copyMove: API.Move = {
                    action: this.move.action,
                    card: this.move.card,
                    index: this.move.index,
                    stage: this.move.stage,
                    copyPlayer: option.copyPlayer,
                    copyStage: option.copyStage,
                }
                this.removeFromGame(true);
                if (API.isPaymentSelectionNecessary(copyMove, Main.gamestate.validMoves)) {
                    this.scene.startPaymentDialog(this.card, copyMove);
                } else {
                    copyMove.payment = { bank: Main.gamestate.wonders[option.copyPlayer].stages[option.copyStage]?.cost?.gold };
                    Main.submitMove(copyMove);
                }
            }

            let minCost = Infinity;
            for (let validMove of Main.gamestate.validMoves) {
                if (validMove.action !== 'wonder') continue;
                if (validMove.stage !== this.move.stage) continue;
                if (validMove.copyPlayer !== option.copyPlayer) continue;
                if (validMove.copyStage !== option.copyStage) continue;
                let cost = API.totalPaymentAmount(validMove.payment);
                if (cost < minCost) {
                    minCost = cost;
                }
            }

            let payment = this.drawPayment(minCost);
            payment.style.position = 'absolute';
            payment.style.left = '50%';
            payment.style.top = '50%';

            payButton.appendChild(payment);
        }

        let closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = `calc(100% - ${C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_X}px)`;
        closeButton.style.top = `${C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_Y}px`;
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

    private drawPayment(minPlayCost: number) {
        let payment = ArtCommon.payment(minPlayCost, false);
        payment.scale.set(C.CARD_PAYMENT_SCALE);
        payment.position.set(C.CARD_WIDTH/2 + (payment.getLocalBounds().width/2 - 50) * C.CARD_PAYMENT_SCALE, C.CARD_PAYMENT_HEIGHT/2);

        return render(payment, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT);
    }

    private drawCloseButton() {
        let closeButton = new PIXI.Container();
        let X = ArtCommon.X(C.COPY_STAGE_DIALOG_CLOSE_BUTTON_COLOR);
        X.scale.set(C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
        X.position.set(100*C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE, 100*C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
        closeButton.addChild(X);
        return render(closeButton, 200*C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE, 200*C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
    }

    removeFromGame(success: boolean = false) {
        super.removeFromGame();
        this.scene.copyStageDialog = null;
        if (!success) {
            this.card.deselect();
        }
    }
}