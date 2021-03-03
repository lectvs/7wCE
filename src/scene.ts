class Scene {
    wonders: Wonder[];
    hand: Hand;
    discardPile: PIXI.Container;

    mainContainer: PIXI.Container;

    constructor() {
        this.mainContainer = new PIXI.Container();
    }

    render() {
        let gamedata = Main.gamedata;
        let gamestate = Main.gamestate;
        let player = Main.player;

        let wonderStartY = 600;
        let wonderDX = Main.width/4;
        let wonderDY = 400;
        let discardY = 1000;
        let discardWidth = 250;
        let discardHeight = 300;

        this.mainContainer.removeChildren();

        this.wonders = gamedata.players.map(p => undefined);
        let p = gamedata.players.indexOf(player);
        this.addWonderForPlayer(gamedata, gamestate, p, Main.width/2, wonderStartY);

        let l = mod(p-1, gamedata.players.length);
        let r = mod(p+1, gamedata.players.length);
        let i: number;
        for (i = 1; i < gamedata.players.length/2; i++) {
            this.addWonderForPlayer(gamedata, gamestate, l, Main.width/2 - wonderDX, wonderStartY + wonderDY*i);
            this.addWonderForPlayer(gamedata, gamestate, r, Main.width/2 + wonderDX, wonderStartY + wonderDY*i);
            l = mod(l-1, gamedata.players.length);
            r = mod(r+1, gamedata.players.length); 
        }

        if (gamedata.players.length % 2 === 0) {
            this.addWonderForPlayer(gamedata, gamestate, l, Main.width/2, wonderStartY + wonderDY*i);
        }

        this.discardPile = new PIXI.Container();
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2, -discardHeight/2, discardWidth, discardHeight, 10, 0x888888));
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2+4, -discardHeight/2+4, discardWidth-8, discardHeight-8, 6, 0x000000));
        this.discardPile.position.set(Main.width/2, discardY);
        this.mainContainer.addChild(this.discardPile);

        let handIds = gamestate.playerData[player].hand;
        handIds = [...handIds].sort((a, b) => a-b);
        let handCards = handIds.map(id => gamedata.cards[id]);

        this.hand = new Hand(this.mainContainer, handCards, this.wonders[gamedata.players.indexOf(player)], this.discardPile);
    }

    update() {
        this.hand.update();
    }

    private addWonderForPlayer(gamedata: API.GameData, gamestate: API.GameState, i: number, x: number, y: number) {
        let player = gamedata.players[i];
        let wonder = new Wonder(gamedata.wonders[player],
            gamestate.playerData[player].playedCards.map(id => gamedata.cards[id]),
            gamestate.playerData[player].stagesBuilt,
            gamestate.playerData[player].gold, player);
        wonder.position.set(x, y);
        wonder.scale.set(2.5);
        this.mainContainer.addChild(wonder);
        this.wonders[i] = wonder;
    }
}