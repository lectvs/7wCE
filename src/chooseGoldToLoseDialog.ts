class ChooseGoldToLoseDialog extends GameElement {

    private scene: GameScene;
    private gold: number;
    private goldToLose: number;
    private activeWonder: Wonder;

    constructor(scene: GameScene, gold: number, goldToLose: number, activeWonder: Wonder) {
        super();
        this.scene = scene;
        this.gold = gold;
        this.goldToLose = goldToLose;
        this.activeWonder = activeWonder;
        this.div.appendChild(this.draw());
    }

    update() {
        this.x = this.activeWonder.x + C.CGTL_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.CGTL_DIALOG_OFFSET_Y;
    }

    private draw() {
        let maxGoldToLose = Math.min(this.gold, this.goldToLose);

        let dialogDiv = document.createElement('div');
        dialogDiv.style.width = `${C.CGTL_DIALOG_WIDTH}px`;
        dialogDiv.style.height = `${(maxGoldToLose + 1) * C.CGTL_DIALOG_PAYMENTS_DY + C.CGTL_DIALOG_EXTRA_HEIGHT}px`;
        dialogDiv.style.backgroundColor = C.CGTL_DIALOG_COLOR;
        dialogDiv.style.borderRadius = `${C.CGTL_DIALOG_CORNER_RADIUS}px`;
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = `translate(-50%, -50%)`;

        let dialogTitle = dialogDiv.appendChild(this.drawText(`You've lost ${this.goldToLose} gold!<br/>You may choose to take debt tokens instead`, C.CGTL_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = `${C.CGTL_DIALOG_TITLE_PADDING}px`;

        for (let i = 0; i <= maxGoldToLose; i++) {
            let leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = `${50 - C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/2}%`;
            leftDiv.style.height = `${C.CGTL_DIALOG_PAYMENTS_DY}px`;
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            let middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = `${C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT}%`;
            middleDiv.style.height = `${C.CGTL_DIALOG_PAYMENTS_DY}px`;
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            let rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = `${50 - C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT/2}%`;
            rightDiv.style.height = `${C.CGTL_DIALOG_PAYMENTS_DY}px`;
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';

            let goldToLose = maxGoldToLose - i;
            if (goldToLose > 0) {
                let goldToLoseText = rightDiv.appendChild(this.drawText(`Lose ${goldToLose} gold`, C.CGTL_DIALOG_PAYMENTS_TEXT_SIZE));
                goldToLoseText.style.width = '100%';
                goldToLoseText.style.textAlign = 'left';
                goldToLoseText.style.position = 'absolute';
                goldToLoseText.style.top = '50%';
                goldToLoseText.style.transform = 'translate(0, -50%)';
            }
            if (goldToLose < this.goldToLose) {
                let debtTokens = this.goldToLose - goldToLose;
                let s = debtTokens === 1 ? '' : 's';
                let debtTokensToGainText = leftDiv.appendChild(this.drawText(`+ ${debtTokens} debt token${s}`, C.CGTL_DIALOG_PAYMENTS_TEXT_SIZE));
                debtTokensToGainText.style.width = '100%';
                debtTokensToGainText.style.textAlign = 'right';
                debtTokensToGainText.style.position = 'absolute';
                debtTokensToGainText.style.top = '50%';
                debtTokensToGainText.style.transform = 'translate(0, -50%)';
            }

            let payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.CGTL_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = `${C.CGTL_DIALOG_PAY_BUTTON_WIDTH}px`;
            payButton.style.height = `${C.CGTL_DIALOG_PAY_BUTTON_HEIGHT}px`;
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.onclick = (event: MouseEvent) => {
                Main.chooseGoldToLose(goldToLose);
                //this.removeFromGame();
            }
        }
        
        return dialogDiv;
    }

    private drawText(text: string, fontSize: number) {
        let p = document.createElement('p');
        p.innerHTML = text;
        p.style.textAlign = 'center';
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${fontSize}px`;
        return p;
    }

    removeFromGame() {
        super.removeFromGame();
        this.scene.chooseGoldToLoseDialog = null;
    }
}