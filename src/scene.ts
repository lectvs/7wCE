class DOMScene {
    private readonly WONDER_START_Y = 600;
    private readonly WONDER_DX = 500;
    private readonly WONDER_DY = 500;

    mouseX: number = 0;
    mouseY: number = 0;

    wonders: DOMWonder[];
    hand: DOMHand;
    discardPile: DOMDiscardPile;
    paymentDialog: DOMPaymentDialog;

    get isPaymentMenuActive() { return !!this.paymentDialog; }

    constructor() {
        this.wonders = [];
    }

    update() {
        this.hand.update();
        for (let wonder of this.wonders) {
            wonder.update();
        }
        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;

        document.getElementById('game').style.height = `${this.WONDER_START_Y + this.WONDER_DY * Math.ceil((gamestate.players.length + 1) / 2)}px`;

        this.wonders = players.map(player => undefined);

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);

        let playerWonder = new DOMWonder(Main.player);
        playerWonder.xs = '50%';
        playerWonder.y = this.WONDER_START_Y;
        playerWonder.addToGame();
        this.wonders[p] = playerWonder;

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            let wonder_l = new DOMWonder(players[l]);
            wonder_l.xs = `calc(50% - ${this.WONDER_DX}px)`;
            wonder_l.y = this.WONDER_START_Y + this.WONDER_DY*i;
            wonder_l.addToGame();
            this.wonders[l] = wonder_l;

            let wonder_r = new DOMWonder(players[r]);
            wonder_r.xs = `calc(50% + ${this.WONDER_DX}px)`;
            wonder_r.y = this.WONDER_START_Y + this.WONDER_DY*i;
            wonder_r.addToGame();
            this.wonders[r] = wonder_r;

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            let lastWonder = new DOMWonder(players[l]);
            lastWonder.xs = '50%';
            lastWonder.y = this.WONDER_START_Y + this.WONDER_DY*i;
            lastWonder.addToGame();
            this.wonders[l] = lastWonder;
        }

        this.hand = new DOMHand(gamestate.hand, this.wonders[p]);

        this.discardPile = new DOMDiscardPile();
        this.discardPile.xs = '50%';
        this.discardPile.y = this.WONDER_START_Y + this.WONDER_DY;
        this.discardPile.addToGame();

        document.getElementById('game').onmousemove = (event: MouseEvent) => {
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

    startPaymentDialog(card: DOMCard, move: API.Move) {
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        this.paymentDialog = new DOMPaymentDialog(card, move, this.wonders[Main.gamestate.players.indexOf(Main.player)]);
        this.paymentDialog.zIndex = ZIndices.PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    }
}