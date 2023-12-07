class EndScreen {

    constructor() {
    }

    create() {
        let players = Main.gamestate.players;
        players.sort((p1, p2) => {
            let d = Main.gamestate.sevenBlundersEnabled ? -1 : 1;
            let points1 = Main.gamestate.playerData[p1].pointsDistribution.total;
            let points2 = Main.gamestate.playerData[p2].pointsDistribution.total;

            if (points1 !== points2) return d*(points2 - points1);

            let gold1 = Main.gamestate.playerData[p1].gold;
            let gold2 = Main.gamestate.playerData[p2].gold;

            if (gold1 !== gold2) return d*(gold2 - gold1);

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

        let elos = players.map(player => {
            let elo = Main.gamestate.playerData[player].elo;
            if (!elo) return '--';

            let before = Math.round(elo.before);
            let after = Math.round(elo.after);
            let diff = after - before;
            let sixtyNineBonus = '';

            let sixtyNine = Main.gamestate.playerData[player].pointsDistribution.total === 69;
            let sixtyNineSixtyNine = sixtyNine && Main.gamestate.playerData[player].gold === 69;
            let eloMultiplier = this.getEloMultiplier(Main.gamestate);
            if (sixtyNine) {
                let d = sixtyNineSixtyNine ? 69 : 6.9;
                diff -= d * eloMultiplier;
                let eloMultText = eloMultiplier === 1 ? '' : `x${eloMultiplier}`;
                sixtyNineBonus = `<span style="color:${ArtCommon.eloDiffColor(d)}">+${d}${eloMultText}</span>`;
            }

            let sign = (diff >= 0) ? '+' : '';
            return `${after} <span style="color:${ArtCommon.eloDiffColor(diff)}">(${sign}${diff}${sixtyNineBonus})</span>`;
        });

        let endscreen = document.getElementById('endscreen');

        let c = Main.gamestate.citiesEnabled;

        let shield = ArtCommon.shield();
        shield.scale.set(0.25);
        let endScreenFinanceMarker = c ? ArtCommon.endScreenFinanceMarker() : ArtCommon.goldCoin();
        endScreenFinanceMarker.scale.set(0.25);
        let pyramid = ArtCommon.pyramidFull();
        pyramid.scale.set(0.25);
        let blueCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('blue'));
        blueCard.scale.set(0.25);
        let greenCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('green'));
        greenCard.scale.set(0.25);
        let yellowCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('yellow'));
        yellowCard.scale.set(0.25);
        let purpleCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('purple'));
        purpleCard.scale.set(0.25);
        let blackCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('black'));
        blackCard.scale.set(0.25);

        let x = (-1 - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
        endscreen.appendChild(this.scoreArt(shield, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*0}px`));
        endscreen.appendChild(this.scoreArt(endScreenFinanceMarker, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*1}px`));
        endscreen.appendChild(this.scoreArt(pyramid, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*2}px`));
        endscreen.appendChild(this.scoreArt(blueCard, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*3}px`));
        endscreen.appendChild(this.scoreArt(greenCard, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*4}px`));
        endscreen.appendChild(this.scoreArt(yellowCard, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*5}px`));
        endscreen.appendChild(this.scoreArt(purpleCard, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*6}px`));
        if (c) endscreen.appendChild(this.scoreArt(blackCard, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*7}px`));
        endscreen.appendChild(this.scoreText('Total', C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*(c?8:7)}px`));

        for (let i = 0; i < players.length; i++) {
            let x = (i - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
            endscreen.appendChild(this.scoreText(`#${placements[i]}`, C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_PLACEMENTS_Y}px`));
            endscreen.appendChild(this.scoreText(players[i], C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_NAMES_Y}px`));
            endscreen.appendChild(this.scoreText(`${elos[i]}`, C.END_SCREEN_ELO_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_ELOS_Y}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].conflict}`, C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*0}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].finance}`, C.END_SCREEN_TEXT_SIZE,  `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*1}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].wonder}`, C.END_SCREEN_TEXT_SIZE,   `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*2}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].civilian}`, C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*3}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].science}`, C.END_SCREEN_TEXT_SIZE,  `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*4}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].commerce}`, C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*5}px`));
            endscreen.appendChild(this.scoreText(`${pointsDistributions[i].guild}`, C.END_SCREEN_TEXT_SIZE,    `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*6}px`));
            if (c) endscreen.appendChild(this.scoreText(`${pointsDistributions[i].black}`, C.END_SCREEN_TEXT_SIZE,    `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*7}px`));
            endscreen.appendChild(this.scoreText(`${pointsTotals[i]}`, C.END_SCREEN_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*(c?8:7)}px`));
            endscreen.appendChild(this.scoreText(`<span style="color:${ArtCommon.eloDiffColor(6.9)}">${Main.gamestate.playerData[players[i]].pointsDistribution.total === 69 ? 'nice' : ''}</span>`, C.END_SCREEN_NICE_TEXT_SIZE, `calc(50% + ${x}px)`, `${C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY*(c?8.5:7.5)}px`));
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

    private scoreText(text: string, size: number, xs: string, ys: string) {
        let p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${size}px`;
        p.style.color = C.END_SCREEN_TEXT_COLOR;
        p.style.transform = 'translate(-50%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }

    private getEloMultiplier(gamestate: API.GameState) {
        let mult = 1;
        if (gamestate.randomizerEnabled) mult++;
        if (gamestate.sevenBlundersEnabled) mult++;
        return mult;
    }
}