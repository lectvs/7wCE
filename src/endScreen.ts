class EndScreen {

    private readonly POSITIONS_Y = 50;
    private readonly NAMES_Y = 80;
    private readonly POINTS_Y = 130;
    private readonly POINTS_DX = 100;
    private readonly POINTS_DY = 50;

    constructor() {
    }

    create() {
        let players = Main.gamestate.players;
        players.sort((p1, p2) => Main.gamestate.playerData[p2].pointsDistribution.total - Main.gamestate.playerData[p1].pointsDistribution.total);
        let pointsDistributions = players.map(player => Main.gamestate.playerData[player].pointsDistribution);

        let endscreen = document.getElementById('endscreen');

        let x = (-1 - (players.length - 1) / 2) * this.POINTS_DX;
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('red')), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*0}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledCircle(0, 0, 16, 0xFBE317), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*1}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledPolygon(0, 0, [ -18, 16, 18, 16, 0, -16 ], 0xFFFF00), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*2}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('green')), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*3}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('yellow')), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*4}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('purple')), `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*5}px`));
        endscreen.appendChild(this.scoreText('Total', `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*6}px`));

        for (let i = 0; i < players.length; i++) {
            let x = (i - (players.length - 1) / 2) * this.POINTS_DX;
            endscreen.appendChild(this.scoreText(`#${i+1}`, `calc(50% + ${x}px)`, `${this.POSITIONS_Y}px`));
            endscreen.appendChild(this.scoreText(players[i], `calc(50% + ${x}px)`, `${this.NAMES_Y}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].conflict}`, `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*0}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].finance}`,  `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*1}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].wonder}`,   `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*2}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].science}`,  `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*3}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].commerce}`, `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*4}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].guild}`,    `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*5}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].total}`,    `calc(50% + ${x}px)`, `${this.POINTS_Y + this.POINTS_DY*6}px`));
        }
    }

    destroy() {
        let game = document.getElementById('game');
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        }
    }

    private scoreArt(pixiArt: PIXI.DisplayObject, xs: string, ys: string) {
        let art = ArtCommon.domElementForArt(pixiArt);
        art.style.position = 'absolute';
        art.style.left = xs;
        art.style.top = ys;
        return art;
    }

    private scoreText(text: string, xs: string, ys: string) {
        let p = document.createElement('p');
        p.textContent = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = '24px';
        p.style.color = `#FFFFFF`;
        p.style.transform = 'translate(-50%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }
}