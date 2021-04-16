/// <reference path="./scene.ts" />

class ChooseWonderScene extends Scene {
    wonderChoices: WonderBoardForChoose[][];
    discardPile: DiscardPile;
    popup: Popup;

    get topWonderChoices() { return this.wonderChoices[Main.gamestate.players.indexOf(Main.player)]; }

    constructor() {
        super();
        this.wonderChoices = [];
    }

    update() {

    }

    create() {
        let gamestate = Main.gamestate;
        let players = Main.gamestate.players;
        let wonderChoices = Main.gamestate.wonderChoices;

        this.wonderChoices = players.map(player => wonderChoices[player].map(wc => undefined));

        let p = players.indexOf(Main.player);
        let l = mod(p-1, players.length);
        let r = mod(p+1, players.length);
        let additionalY = C.WONDER_SIDE_CHOICE_TOP_ADJUST_DY;
        let finalY = C.WONDER_TOP_Y;

        for (let w = 0; w < wonderChoices[players[p]].length; w++) {
            this.wonderChoices[p][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[p]][w], w, players[p]);
            this.wonderChoices[p][w].setPosition(this.getWonderPosition(p, w*C.WONDER_SIDE_CHOICE_DY + additionalY));
            this.wonderChoices[p][w].addToGame();
            finalY = this.wonderChoices[p][w].y;
        }

        let i: number;
        for (i = 1; i < Math.floor((players.length - 1)/2 + 1); i++) {
            for (let w = 0; w < wonderChoices[players[l]].length; w++) {
                this.wonderChoices[l][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[l]][w], w, players[l]);
                this.wonderChoices[l][w].setPosition(this.getWonderPosition(l, w*C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[l][w].addToGame();
                finalY = this.wonderChoices[l][w].y;
            }

            for (let w = 0; w < wonderChoices[players[r]].length; w++) {
                this.wonderChoices[r][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[r]][w], w, players[r]);
                this.wonderChoices[r][w].setPosition(this.getWonderPosition(r, w*C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[r][w].addToGame();
                finalY = this.wonderChoices[r][w].y;
            }

            let maxIndex = Math.max(wonderChoices[players[l]].length, wonderChoices[players[r]].length);
            additionalY += C.WONDER_SIDE_CHOICE_DY * (maxIndex - 1) + C.WONDER_SIDE_CHOICE_GROUP_ADJUST_DY;

            l = mod(l-1, gamestate.players.length);
            r = mod(r+1, gamestate.players.length);
        }

        if (players.length % 2 === 0) {
            for (let w = 0; w < wonderChoices[players[l]].length; w++) {
                this.wonderChoices[l][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[l]][w], w, players[l]);
                this.wonderChoices[l][w].setPosition(this.getWonderPosition(l, w*C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[l][w].addToGame();
                finalY = this.wonderChoices[l][w].y;
            }
            additionalY += C.WONDER_SIDE_CHOICE_DY * (wonderChoices[players[l]].length - 1) + C.WONDER_SIDE_CHOICE_GROUP_ADJUST_DY;
        }

        let padding = gamestate.players.length === 3 ? C.GAME_HEIGHT_PADDING_3P : C.GAME_HEIGHT_PADDING_4567P;
        Main.game.style.height = `${finalY + C.WONDER_BOARD_HEIGHT/2 + padding}px`;

        if (gamestate.playerData[Main.player].currentMove) {
            this.selectSide(gamestate.playerData[Main.player].currentMove.side);
        }
    }

    destroy() {
        for (let wonderChoice of this.wonderChoices) {
            for (let wonder of wonderChoice) {
                wonder.destroy();
            }
        }

        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    }

    selectSide(side: number) {
        let topWonderChoices = this.topWonderChoices;
        for (let i = 0; i < topWonderChoices.length; i++) {
            if (i == side) topWonderChoices[i].select();
            else topWonderChoices[i].deselect();
        }
    }
}