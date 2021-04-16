/// <reference path="gameElement.ts" />

class ActionButton extends GameElement {

    private scene: GameScene;
    private textElement: HTMLParagraphElement;
    private type: 'undo' | 'reject_discard';

    constructor(scene: GameScene) {
        super();

        this.scene = scene;

        let button = this.div.appendChild(document.createElement('div'));
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.width = `${C.ACTION_BUTTON_WIDTH}px`;
        button.style.height = `${C.ACTION_BUTTON_HEIGHT}px`;
        button.style.borderRadius = `${C.ACTION_BUTTON_CORNER_RADIUS}px`;
        button.style.transform = 'translate(-50%, -50%)';
        button.style.position = 'relative';
        button.style.cursor = 'pointer';

        this.textElement = button.appendChild(document.createElement('p'));
        this.textElement.style.fontFamily  = "'Courier New', Courier, monospace";
        this.textElement.style.textAlign = 'center';
        this.textElement.style.position = 'absolute';
        this.textElement.style.left = '50%';
        this.textElement.style.top = '50%';
        this.textElement.style.transform = 'translate(-50%, -50%)';

        button.onclick = (event: MouseEvent) => {
            if (this.type === 'undo') {
                Main.undoMove();
                if (this.scene.isPaymentMenuActive) this.scene.paymentDialog.removeFromGame();
            } else if (this.type === 'reject_discard') {
                Main.submitMove({ action: 'reject', card: -1, payment: {} });
            }
        };
    }

    setType(type: 'undo' | 'reject_discard') {
        this.type = type;
        this.textElement.textContent = (type === 'undo') ? 'Undo' : 'No Thanks';
    }
}