class Wonder extends PIXI.Container {

    player: string;
    goldText: PIXI.Text;
    pointsText: PIXI.Text;

    mainRegion: PIXI.Rectangle;
    stageRegion: PIXI.Rectangle;

    stageXs: number[];

    playedCardEffectRolls: Dict<PlayedCardEffectRoll>;
    overflowCardEffectRolls: PlayedCardEffectRoll[];

    private moveRepr: Card;
    private handRepr: Card;

    constructor(wonder: API.Wonder, playerData: API.PlayerData, player: string) {
        super();

        this.player = player;

        let boardBase = Shapes.filledRoundedRect(-100, -50, 200, 100, 8, wonder.outline_color);
        this.addChild(boardBase);

        let o = 1;
        let boardBg = Shapes.filledRoundedRect(-100 + o, -50 + o, 200 - 2*o, 100 - 2*o, 8 - o, ArtCommon.wonderBg);
        this.addChild(boardBg);

        let boardBgMask = boardBg.clone();
        this.addChild(boardBgMask);

        let startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        
        let startingEffectBanner = Shapes.filledRect(-100, -50, 18+o, 18+o, ArtCommon.cardBannerForColor(wonder.starting_effect_color));
        startingEffectBanner.mask = boardBgMask;
        this.addChild(startingEffectBanner);
        
        startingEffects.scale.set(0.12);
        startingEffects.position.set(-91+o, -41+o);
        this.addChild(startingEffects);

        this.playedCardEffectRolls = {};
        this.playedCardEffectRolls['brown'] = new PlayedCardEffectRoll(false);
        this.playedCardEffectRolls['brown'].position.set(-100, -65);
        this.addChild(this.playedCardEffectRolls['brown']);
        this.playedCardEffectRolls['grey'] = new PlayedCardEffectRoll(false);
        this.playedCardEffectRolls['grey'].position.set(-100, -65);
        this.addChild(this.playedCardEffectRolls['grey']);
        this.playedCardEffectRolls['yellow'] = new PlayedCardEffectRoll(false);
        this.playedCardEffectRolls['yellow'].position.set(-100+o, -14);
        this.addChild(this.playedCardEffectRolls['yellow']);
        this.playedCardEffectRolls['purple'] = new PlayedCardEffectRoll(false);
        this.playedCardEffectRolls['purple'].position.set(-100+o, 12);
        this.addChild(this.playedCardEffectRolls['purple']);
        this.playedCardEffectRolls['red'] = new PlayedCardEffectRoll(false);
        this.playedCardEffectRolls['red'].position.set(-73, -41+o);
        this.addChild(this.playedCardEffectRolls['red']);
        this.playedCardEffectRolls['blue'] = new PlayedCardEffectRoll(true);
        this.playedCardEffectRolls['blue'].position.set(100-o, -14);
        this.addChild(this.playedCardEffectRolls['blue']);
        this.playedCardEffectRolls['green'] = new PlayedCardEffectRoll(true);
        this.playedCardEffectRolls['green'].position.set(100-o, 12);
        this.addChild(this.playedCardEffectRolls['green']);

        this.overflowCardEffectRolls = [];
        this.pushNewOverflowCardEffectRoll();

        for (let cardId of playerData.playedCards) {
            let card = Main.gamestate.cards[cardId];
            let cardArt = new Card(cardId, card, new PIXI.Point(), this, new PIXI.Container());
            this.addNewCardEffect(cardArt);
        }

        let stageIdsBuilt = playerData.stagesBuilt.map(stageBuilt => stageBuilt.stage);
        let wonderStageMinCosts = wonder.stages.map(stage => Infinity);
        for (let validMove of Main.gamestate.validMoves) {
            if (validMove.action !== 'wonder') continue;
            let stage = validMove.stage;
            let cost = API.totalPaymentAmount(validMove.payment);
            if (cost < wonderStageMinCosts[stage]) {
                wonderStageMinCosts[stage] = cost;
            }
        }

        let stagesMiddle = wonder.stages.length === 2 ? 32 : 0;
        let stageDX = wonder.stages.length === 4 ? 49 : 64;

        this.stageXs = [];
        for (let i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));

            let stageBase = Shapes.filledRoundedRect(-24, 29, 48, 100, 6, wonder.outline_color);
            stageBase.mask = boardBgMask;
            stageBase.x = this.stageXs[i];
            this.addChild(stageBase);

            let stageBg = Shapes.filledRoundedRect(-24 + o, 29 + o, 48 - 2*o, 100 - 2*o, 6-o, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = this.stageXs[i];
            this.addChild(stageBg);

            let stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(0.10);
            stageEffects.position.set(this.stageXs[i], 39.5);
            this.addChild(stageEffects);

            let stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(0.04);
                stageCost.position.set(this.stageXs[i] - 22, 30);

                let costBanner = Shapes.filledRoundedRect(-stageCost.width/2-2, -2, stageCost.width+4, stageCost.height + 4, 2, wonder.outline_color);
                costBanner.position.set(stageCost.x, stageCost.y);

                let costBannerBg = Shapes.filledRoundedRect(-stageCost.width/2-1, -1, stageCost.width+2, stageCost.height+2, 1, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);

                this.addChild(costBanner);
                this.addChild(costBannerBg);
                this.addChild(stageCost);
            }

            if (player === Main.player && !contains(stageIdsBuilt, i)) {
                let stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(0.05);
                stagePayment.position.set(this.stageXs[i] + 21.5, 25);
                this.addChild(stagePayment);
            }
        }

        for (let stageBuilt of playerData.stagesBuilt) {
            let justPlayed = (playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
            let cardArt = Card.flippedCardForAge(stageBuilt.cardAge, justPlayed);
            cardArt.scale.set(0.66);
            cardArt.position.set(this.stageXs[stageBuilt.stage], 5);

            this.addChildAt(cardArt, 0);
        }

        let goldCoin = Shapes.filledCircle(95, -58, 5, 0xFBE317);
        this.addChild(goldCoin);

        this.goldText = Shapes.centeredText(`${playerData.gold}`, 0.084, 0xFFFFFF);
        this.goldText.anchor.set(1, 0.5);
        this.goldText.position.set(87, -58);
        this.addChild(this.goldText);

        let points = Shapes.filledCircle(69, -58, 5, 0xFFFFFF);
        this.addChild(points);

        this.pointsText = Shapes.centeredText(`${API.totalPoints(playerData.pointsDistribution)}`, 0.084, 0xFFFFFF);
        this.pointsText.anchor.set(1, 0.5);
        this.pointsText.position.set(61, -58);
        this.addChild(this.pointsText);

        let playerText = Shapes.centeredText(player, 0.084, 0xFFFFFF);
        playerText.anchor.set(1, 0.5);
        playerText.position.set(100, -70);
        this.addChild(playerText);

        if (player !== Main.player && Main.gamestate.playerData[player].handCount > 0) {
            this.handRepr = Card.flippedCardForAge(Main.gamestate.age, false);
            this.handRepr.scale.set(0.2);
            this.handRepr.position.set(93, -95);

            this.moveRepr = Card.flippedCardForAge(Main.gamestate.age, false);
            this.moveRepr.scale.set(this.handRepr.scale.x, this.handRepr.scale.y);
            this.moveRepr.position.set(this.handRepr.x, this.handRepr.y);

            let checkMark = ArtCommon.checkMark();
            checkMark.scale.set(0.5);
            checkMark.position.set(0, 36);
            this.moveRepr.addChild(checkMark);

            if (playerData.currentMove) {
                this.moveRepr.x -= 15;
            }

            this.addChild(this.moveRepr);
            this.addChild(this.handRepr);
        }
    }

    getMainRegion() {
        return new PIXI.Rectangle(this.x + -100*this.scale.x, this.y + -75*this.scale.y, 200*this.scale.x, 100*this.scale.y);
    }

    getStageRegion() {
        return new PIXI.Rectangle(this.x + -100*this.scale.x, this.y + 25*this.scale.y, 200*this.scale.x, 50*this.scale.y);
    }

    getClosestStageId(position: PIXI.Point) {
        let minStage = 0;
        for (let i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x + this.stageXs[i]*this.scale.x - position.x) < Math.abs(this.x + this.stageXs[minStage]*this.scale.x - position.x)) {
                minStage = i;
            }
        }
        return minStage;
    }

    getCardPositionForStage(stage: number) {
        return new PIXI.Point(this.x + this.stageXs[stage]*this.scale.x, this.y + 5*this.scale.y);
    }

    getNewCardEffectWorldPosition(cardArt: Card) {
        let color = cardArt.apiCard.color;
        return new PIXI.Point(this.x + this.playedCardEffectRolls[color].getNextX(cardArt, this.scale.x)*this.scale.x, this.y + this.playedCardEffectRolls[color].y*this.scale.y);
    }

    addNewCardEffect(cardArt: Card) {
        let playerData = Main.gamestate.playerData[this.player];
        let justPlayed = (playerData.lastMove && playerData.lastMove.action === 'play' && playerData.lastMove.card === cardArt.apiCardId);
        cardArt.state = { type: 'permanent_effect', justPlayed: justPlayed };
        cardArt.update();
        cardArt.scale.set(0.75);
        let color = cardArt.apiCard.color;

        let maxWidth = {
            'brown': 150 - this.playedCardEffectRolls['grey'].getWidth(),
            'grey': 150 - this.playedCardEffectRolls['brown'].getWidth(),
            'red': 100 - this.playedCardEffectRolls['red'].x,
            'yellow': 200 - this.playedCardEffectRolls['blue'].getWidth(),
            'purple': 200 - this.playedCardEffectRolls['green'].getWidth(),
            'blue': 200 - this.playedCardEffectRolls['yellow'].getWidth(),
            'green': 200 - this.playedCardEffectRolls['purple'].getWidth(),
        }[color];

        if (this.playedCardEffectRolls[color].canAddCard(cardArt, maxWidth)) {
            this.playedCardEffectRolls[color].addCard(cardArt);
        } else {
            if (!this.overflowCardEffectRolls[0].canAddCard(cardArt, 200)) {
                this.pushNewOverflowCardEffectRoll();
            }
            this.overflowCardEffectRolls[0].addCard(cardArt);
        }
        
        this.playedCardEffectRolls['grey'].x = this.playedCardEffectRolls['brown'].x + this.playedCardEffectRolls['brown'].getWidth();
    }

    makeMove() {
        if (!this.moveRepr || !this.handRepr) return;

        Main.scriptManager.runScript(
            S.doOverTime(0.1, t => this.moveRepr.x = this.handRepr.x - 15*t)
        );
    }

    undoMove() {
        if (!this.moveRepr || !this.handRepr) return;

        Main.scriptManager.runScript(
            S.doOverTime(0.1, t => this.moveRepr.x = this.handRepr.x - 15*(1-t))
        );
    }

    private pushNewOverflowCardEffectRoll() {
        let roll = new PlayedCardEffectRoll(false);
        roll.position.set(-100, this.playedCardEffectRolls['brown'].y - 24*(this.overflowCardEffectRolls.length + 1));
        this.overflowCardEffectRolls.unshift(roll);
        this.addChild(roll);
    }
}