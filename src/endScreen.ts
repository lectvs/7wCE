class EndScreen extends PIXI.Container {
    constructor() {
        super();
        this.create();
    }

    create() {
        this.removeChildren();

        let players = [];
        for (let p of Main.gamestate.players) players.push(p);
        players.sort((p1, p2) => {
            let points1 = Main.gamestate.playerData[p1].pointsDistribution.total;
            let points2 = Main.gamestate.playerData[p2].pointsDistribution.total;

            if (points1 !== points2) {
                return points2 - points1;
            }

            let gold1 = Main.gamestate.playerData[p1].gold;
            let gold2 = Main.gamestate.playerData[p2].gold;

            return gold2 - gold1;
        })

        let pointsDistributions = players.map(player => Main.gamestate.playerData[player].pointsDistribution);

        let pDX = 200;
        let pDY = 100;
        let pStartX = pDX * (-(players.length-1)/2);
        let pStartY = -450;
        let textScale = 0.3;
        let textColor = 0xFFFFFF;

        let width = (players.length+2.5)*pDX;
        let o = 4;
        this.addChild(Shapes.filledRoundedRect(-width/2, -600, width, 1200, 50, 0xFFFFFF));
        this.addChild(Shapes.filledRoundedRect(-width/2+o, -600+o, width-2*o, 1200-2*o, 50-o, 0x000000));
        this.addChild(Shapes.centeredText(0, -550, "Game Complete", 0.5, textColor));

        this.addChild(Shapes.filledRect(pStartX - pDX - 20, pStartY + 2*pDY - 20, 40, 40, ArtCommon.cardBannerForColor('red')));
        this.addChild(Shapes.filledCircle(pStartX - pDX, pStartY + 3*pDY, 20, 0xFBE317));
        this.addChild(Shapes.filledPolygon(pStartX- pDX, pStartY + 4*pDY, [ -20, 18, 20, 18, 0, -18 ], 0xFFFF00));
        this.addChild(Shapes.filledRect(pStartX - pDX - 20, pStartY + 5*pDY - 20, 40, 40, ArtCommon.cardBannerForColor('blue')));
        this.addChild(Shapes.filledRect(pStartX - pDX - 20, pStartY + 6*pDY - 20, 40, 40, ArtCommon.cardBannerForColor('yellow')));
        this.addChild(Shapes.filledRect(pStartX - pDX - 20, pStartY + 7*pDY - 20, 40, 40, ArtCommon.cardBannerForColor('purple')));
        this.addChild(Shapes.filledRect(pStartX - pDX - 20, pStartY + 8*pDY - 20, 40, 40, ArtCommon.cardBannerForColor('green')));
        this.addChild(Shapes.centeredText(pStartX - pDX, pStartY + 9*pDY, "Total:", textScale, textColor));

        for (let i = 0; i < players.length; i++) {
            let px = pStartX + pDX*i;
            this.addChild(Shapes.centeredText(px, pStartY + 0.5*pDY, `#${i+1}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 1*pDY, players[i], textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 2*pDY, `${pointsDistributions[i].conflict}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 3*pDY, `${pointsDistributions[i].finance}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 4*pDY, `${pointsDistributions[i].wonder}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 5*pDY, `${pointsDistributions[i].civilian}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 6*pDY, `${pointsDistributions[i].commerce}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 7*pDY, `${pointsDistributions[i].guild}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 8*pDY, `${pointsDistributions[i].science}`, textScale, textColor));
            this.addChild(Shapes.centeredText(px, pStartY + 9*pDY, `${pointsDistributions[i].total}`, textScale, textColor));
        }

        let closeButton = Shapes.filledRoundedRect(-20, -20, 40, 40, 3, 0x000000);
        closeButton.position.set(width/2 - 50, -550);
        this.addChild(closeButton);

        let X = ArtCommon.X(0xFFFFFF);
        X.scale.set(0.3);
        closeButton.addChild(X);

        closeButton.interactive = true;
        closeButton.buttonMode = true;
        closeButton.on('click', () => {
            this.visible = false;
        });

        this.adjustPositions();
    }

    adjustPositions() {
        this.scale.set(window.innerHeight * 1/1300);
    }
}