/// <reference path="gameElement.ts" />

class DOMActionButton extends GameElement {
    private readonly BUTTON_WIDTH = 100;
    private readonly BUTTON_HEIGHT = 50;
    private readonly BUTTON_CORNER_RADIUS = 8;

    private textElement: HTMLParagraphElement;
    private type: 'undo' | 'reject_discard';

    constructor() {
        super();

        let button = this.div.appendChild(document.createElement('div'));
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.width = `${this.BUTTON_WIDTH}px`;
        button.style.height = `${this.BUTTON_HEIGHT}px`;
        button.style.borderRadius = `${this.BUTTON_CORNER_RADIUS}px`;
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
                if (Main.scene.isPaymentMenuActive) Main.scene.paymentDialog.removeFromGame();
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