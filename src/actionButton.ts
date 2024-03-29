/// <reference path="gameElement.ts" />

class ActionButton extends GameElement {

    private scene: GameScene;
    private button: HTMLDivElement;
    private textElement: HTMLParagraphElement;
    private type: 'undo' | 'reject_discard' | 'accept_future';

    private _buttonActive: boolean = true;
    private get buttonActive() { return this._buttonActive; }
    private set buttonActive(value: boolean) {
        if (value === this._buttonActive) return;
        this._buttonActive = value;
        this.button.style.backgroundColor = this._buttonActive ? 'white' : 'gray';
    }

    constructor(scene: GameScene) {
        super();

        this.scene = scene;

        this.button = this.div.appendChild(document.createElement('div'));
        this.button.style.backgroundColor = 'white';
        this.button.style.color = 'black';
        this.button.style.width = `${C.ACTION_BUTTON_WIDTH}px`;
        this.button.style.height = `${C.ACTION_BUTTON_HEIGHT}px`;
        this.button.style.borderRadius = `${C.ACTION_BUTTON_CORNER_RADIUS}px`;
        this.button.style.transform = 'translate(-50%, -50%)';
        this.button.style.position = 'relative';
        this.button.style.cursor = 'pointer';

        this.textElement = this.button.appendChild(document.createElement('p'));
        this.textElement.style.fontFamily  = "'Courier New', Courier, monospace";
        this.textElement.style.textAlign = 'center';
        this.textElement.style.position = 'absolute';
        this.textElement.style.left = '50%';
        this.textElement.style.top = '50%';
        this.textElement.style.transform = 'translate(-50%, -50%)';

        this.button.onclick = (event: MouseEvent) => {
            if (this.type === 'undo') {
                Main.undoMove();
                if (this.scene.isPaymentMenuActive) this.scene.paymentDialog.removeFromGame();
            } else if (this.type === 'reject_discard') {
                Main.submitMove({ action: 'reject', card: -1, payment: {} });
            } else if (this.type === 'accept_future') {
                Main.submitMove({ action: 'accept', card: -1, payment: {} });
            }
        };
    }

    setType(type: 'undo' | 'reject_discard' | 'accept_future') {
        this.type = type;
        this.textElement.textContent = {
            'undo': 'Undo',
            'reject_discard': 'No Thanks',
            'accept_future': 'Done',
        }[type];

        let buttonActive = true;
        if (type === 'reject_discard' && !API.canReject(Main.gamestate.validMoves)) buttonActive = false;

        this.buttonActive = buttonActive;
    }
}