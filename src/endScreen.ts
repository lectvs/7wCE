class EndScreen {

    constructor() {
    }

    create() {
        let players = Main.gamestate.players;
        players.sort((p1, p2) => {
            let points1 = Main.gamestate.playerData[p1].pointsDistribution.total;
            let points2 = Main.gamestate.playerData[p2].pointsDistribution.total;

            if (points1 !== points2) return points2 - points1;

            let gold1 = Main.gamestate.playerData[p1].gold;
            let gold2 = Main.gamestate.playerData[p2].gold;

            if (gold1 !== gold2) return gold2 - gold1;

            return 0;
        });
        let pointsDistributions = players.map(player => Main.gamestate.playerData[player].pointsDistribution);

        let pointsTotals = pointsDistributions.map(pd => `${pd.total}`);
        let golds = players.map(player => Main.gamestate.playerData[player].gold);

        let placements = range(1, players.length);
        for (let i = 1; i < players.length; i++) {
            if (pointsDistributions[i].total === pointsDistributions[i-1].total) {
                pointsTotals[i-1] += ` <span style="color:${ArtCommon.goldColorHtml}">(${golds[i-1]})</span>`;
                pointsTotals[i] += ` <span style="color:${ArtCommon.goldColorHtml}">(${golds[i]})</span>`;
                if (golds[i] === golds[i-1]) placements[i] = placements[i-1];
            }
        }

        let endscreen = document.getElementById('endscreen');

        let x = (-1 - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, C.END_SCREEN_SYMBOL_SIZE, C.END_SCREEN_SYMBOL_SIZE, ArtCommon.cardBannerForColor('red')), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*0}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledCircle(0, 0, C.END_SCREEN_SYMBOL_SIZE/2, ArtCommon.goldColor), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*1}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledPolygon(0, 0, [ -C.END_SCREEN_SYMBOL_SIZE*9/16, C.END_SCREEN_SYMBOL_SIZE/2, C.END_SCREEN_SYMBOL_SIZE*9/16, C.END_SCREEN_SYMBOL_SIZE/2, 0, -C.END_SCREEN_SYMBOL_SIZE/2 ], 0xFFFF00), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*2}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, C.END_SCREEN_SYMBOL_SIZE, C.END_SCREEN_SYMBOL_SIZE, ArtCommon.cardBannerForColor('blue')), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*3}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, C.END_SCREEN_SYMBOL_SIZE, C.END_SCREEN_SYMBOL_SIZE, ArtCommon.cardBannerForColor('green')), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*4}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, C.END_SCREEN_SYMBOL_SIZE, C.END_SCREEN_SYMBOL_SIZE, ArtCommon.cardBannerForColor('yellow')), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*5}px`));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, C.END_SCREEN_SYMBOL_SIZE, C.END_SCREEN_SYMBOL_SIZE, ArtCommon.cardBannerForColor('purple')), `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*6}px`));
        endscreen.appendChild(this.scoreText('Total', `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*7}px`));

        for (let i = 0; i < players.length; i++) {
            let x = (i - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
            endscreen.appendChild(this.scoreText(`#${placements[i]}`, `calc(50% + ${x}px)`, `${C.END_SCREEN_PLACEMENTS_Y}px`));
            endscreen.appendChild(this.scoreText(players[i], `calc(50% + ${x}px)`, `${C.END_SCREEN_NAMES_Y}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].conflict}`, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*0}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].finance}`,  `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*1}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].wonder}`,   `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*2}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].civilian}`, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*3}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].science}`,  `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*4}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].commerce}`, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*5}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].guild}`,    `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*6}px`));
            endscreen.appendChild(this.scoreText(`${pointsTotals[i]}`, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*7}px`));
        }
    }

    destroy() {
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
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
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${C.END_SCREEN_TEXT_SIZE}px`;
        p.style.color = C.END_SCREEN_TEXT_COLOR;
        p.style.transform = 'translate(-50%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }
}