class Scene {
    wonders: Wonder[];
    hand: Hand;
    discardPile: PIXI.Container;

    mainContainer: PIXI.Container;

    constructor() {
        this.mainContainer = new PIXI.Container();
    }

    create() {
        let gamedata = Main.gamedata;
        let gamestate = Main.gamestate;
        let player = Main.player;

        let discardWidth = 250;
        let discardHeight = 300;

        this.mainContainer.removeChildren();

        this.discardPile = new PIXI.Container();
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2, -discardHeight/2, discardWidth, discardHeight, 10, 0x888888));
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth/2+4, -discardHeight/2+4, discardWidth-8, discardHeight-8, 6, 0x000000));
        this.mainContainer.addChild(this.discardPile);

        this.wonders = [];
        for (let i = 0; i < gamedata.players.length; i++) {
            let player = gamedata.players[i];
            let wonder = new Wonder(gamedata.wonders[player], gamestate.playerData[player], player);
            this.mainContainer.addChild(wonder);
            this.wonders.push(wonder);
        }

        let cardIds = gamestate.playerData[player].hand;
        cardIds = [...cardIds].sort((a, b) => a-b);

        this.hand = new Hand(this.mainContainer, cardIds, this.wonders[gamedata.players.indexOf(player)], this.discardPile);
        this.hand.reflectMove(gamestate.playerData[player].currentMove);

        this.adjustPositions();
    }

    adjustPositions() {
        let gamedata = Main.gamedata;
        let player = Main.player;

        let wonderScale = 2.5;
        let wonderStartY = 600;
        let wonderDX = Main.width/4;
        let wonderDY = 500;
        let discardY = 1000;

        // WONDERS
        let p = gamedata.players.indexOf(player);
        this.wonders[p].position.set(Main.width/2, wonderStartY);
        this.wonders[p].scale.set(wonderScale);

        let l = mod(p-1, gamedata.players.length);
        let r = mod(p+1, gamedata.players.length);

        let i: number;
        for (i = 1; i < gamedata.players.length/2; i++) {
            this.wonders[l].position.set(Main.width/2 - wonderDX, wonderStartY + wonderDY*i);
            this.wonders[l].scale.set(wonderScale);
            this.wonders[r].position.set(Main.width/2 + wonderDX, wonderStartY + wonderDY*i);
            this.wonders[r].scale.set(wonderScale);
            l = mod(l-1, gamedata.players.length);
            r = mod(r+1, gamedata.players.length); 
        }

        if (gamedata.players.length % 2 === 0) {
            this.wonders[l].position.set(Main.width/2, wonderStartY + wonderDY*i);
            this.wonders[l].scale.set(wonderScale);
        }

        // DISCARD PILE
        this.discardPile.position.set(Main.width/2, discardY);

        this.hand.adjustPositions();
    }

    update() {
        this.hand.update();
    }
}