class Wonder extends PIXI.Container {

    goldText: PIXI.Text;

    mainRegion: PIXI.Rectangle;
    stageRegion: PIXI.Rectangle;

    stageXs: number[];

    brownResourceContainer: PIXI.Container;
    greyResourceContainer: PIXI.Container;
    commerceContainer: PIXI.Container;
    guildContainer: PIXI.Container;
    militaryContainer: PIXI.Container;
    civilianContainer: PIXI.Container;
    scienceContainer: PIXI.Container;

    constructor(wonder: API.Wonder, playedCards: API.Card[], stagesBuilt: API.StageBuilt[], gold: number, player: string) {
        super();

        let wonderColor = 0xFFFFFF;

        let boardBase = Shapes.filledRoundedRect(-100, -50, 200, 100, 8, wonderColor);
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

        this.brownResourceContainer = new PIXI.Container();
        this.brownResourceContainer.position.set(-100, -65);
        this.addChild(this.brownResourceContainer);

        this.greyResourceContainer = new PIXI.Container();
        this.greyResourceContainer.position.set(this.brownResourceContainer.x + this.brownResourceContainer.width, -65);
        this.addChild(this.greyResourceContainer);

        this.commerceContainer = new PIXI.Container();
        this.commerceContainer.position.set(-100+o, -14);
        this.addChild(this.commerceContainer);

        this.guildContainer = new PIXI.Container();
        this.guildContainer.position.set(-100+o, 12);
        this.addChild(this.guildContainer);

        this.militaryContainer = new PIXI.Container();
        this.militaryContainer.position.set(-73, -41+o);
        this.addChild(this.militaryContainer);

        this.civilianContainer = new PIXI.Container();
        this.civilianContainer.position.set(100-o, -14);
        this.addChild(this.civilianContainer);

        this.scienceContainer = new PIXI.Container();
        this.scienceContainer.position.set(100-o, 12);
        this.addChild(this.scienceContainer);

        for (let card of playedCards) {
            let cardArt = new Card(card, new PIXI.Point(), this, new PIXI.Container());
            this.addNewCardEffect(cardArt);
        }

        let stagesMiddle = wonder.stages.length === 2 ? 32 : 0;
        let stageDX = wonder.stages.length === 4 ? 49 : 64;

        this.stageXs = [];
        for (let i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));

            let stageBase = Shapes.filledRoundedRect(-24, 29, 48, 100, 6, 0xFFFFFF);
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

                let costBanner = Shapes.filledRoundedRect(-stageCost.width/2-2, -2, stageCost.width+4, stageCost.height + 4, 2, wonderColor);
                costBanner.position.set(stageCost.x, stageCost.y);

                let costBannerBg = Shapes.filledRoundedRect(-stageCost.width/2-1, -1, stageCost.width+2, stageCost.height+2, 1, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);

                this.addChild(costBanner);
                this.addChild(costBannerBg);
                this.addChild(stageCost);
            }
        }

        for (let stageBuilt of stagesBuilt) {
            let ageCard: API.Card = { age: stageBuilt.cardAge, name: '', color: 'brown', effects: [] };
            let cardArt = new Card(ageCard, new PIXI.Point(), this, new PIXI.Container());
            cardArt.setFlipped(true);
            cardArt.scale.set(0.66);
            cardArt.position.set(this.stageXs[stageBuilt.stage], 5);

            this.addChildAt(cardArt, 0);
        }

        let goldCoin = Shapes.filledCircle(95, -58, 5, 0xFBE317);
        this.addChild(goldCoin);

        this.goldText = new PIXI.Text(`${gold}`, { fontFamily : 'Arial', fontSize: 70, fill : 0xFFFFFF });
        this.goldText.anchor.set(1, 0.5);
        this.goldText.scale.set(0.12);
        this.goldText.position.set(87, -58);
        this.addChild(this.goldText);

        let playerText = new PIXI.Text(`${player}`, { fontFamily : 'Arial', fontSize: 70, fill : 0xFFFFFF });
        playerText.anchor.set(1, 0.5);
        playerText.scale.set(0.12);
        playerText.position.set(100, -70);
        this.addChild(playerText);
    }

    getMainRegion() {
        return new PIXI.Rectangle(this.x + -100*this.scale.x, this.y + -75*this.scale.y, 200*this.scale.x, 100*this.scale.y);
    }

    getStageRegion() {
        return new PIXI.Rectangle(this.x + -100*this.scale.x, this.y + 25*this.scale.y, 200*this.scale.x, 50*this.scale.y);
    }

    getClosestStagePosition(position: PIXI.Point) {
        let minStage = 0;
        for (let i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x + this.stageXs[i]*this.scale.x - position.x) < Math.abs(this.x + this.stageXs[minStage]*this.scale.x - position.x)) {
                minStage = i;
            }
        }
        return new PIXI.Point(this.x + this.stageXs[minStage]*this.scale.x, this.y + 5*this.scale.y);
    }

    getNewCardEffectWorldPosition(cardArt: Card) {
        let color = cardArt.apiCard.color;
        let point: PIXI.Point;
        if (color === 'brown') {
            point = new PIXI.Point(this.x + (this.brownResourceContainer.x + this.brownResourceContainer.width)*this.scale.x + cardArt.getWidth()/2, this.y + this.brownResourceContainer.y*this.scale.y);
        } else if (color === 'grey') {
            point = new PIXI.Point(this.x + (this.greyResourceContainer.x + this.greyResourceContainer.width)*this.scale.x + cardArt.getWidth()/2, this.y + this.greyResourceContainer.y*this.scale.y);
        } else if (color === 'yellow') {
            point = new PIXI.Point(this.x + (this.commerceContainer.x + this.commerceContainer.width)*this.scale.x + cardArt.getWidth()/2, this.y + this.commerceContainer.y*this.scale.y);
        } else if (color === 'purple') {
            point = new PIXI.Point(this.x + (this.guildContainer.x + this.guildContainer.width)*this.scale.x + cardArt.getWidth()/2, this.y + this.guildContainer.y*this.scale.y);
        } else if (color === 'red') {
            point = new PIXI.Point(this.x + (this.militaryContainer.x + this.militaryContainer.width)*this.scale.x + cardArt.getWidth()/2, this.y + this.militaryContainer.y*this.scale.y);
        } else if (color === 'blue') {
            point = new PIXI.Point(this.x + (this.civilianContainer.x + -this.civilianContainer.width)*this.scale.x - cardArt.getWidth()/2, this.y + this.civilianContainer.y*this.scale.y);
        } else if (color === 'green') {
            point = new PIXI.Point(this.x + (this.scienceContainer.x + -this.scienceContainer.width)*this.scale.x - cardArt.getWidth()/2, this.y + this.scienceContainer.y*this.scale.y);
        } else {
            console.error('Card color not found:', color);
            point = new PIXI.Point(0, 0);
        }
        return point;
    }

    addNewCardEffect(cardArt: Card) {
        cardArt.setEffect(true);
        cardArt.scale.set(0.75);
        let color = cardArt.apiCard.color;
        if (color === 'brown') {
            cardArt.position.set(this.brownResourceContainer.width + cardArt.getWidth()/2, 0);
            this.brownResourceContainer.addChild(cardArt);
            this.greyResourceContainer.x += cardArt.getWidth();
        } else if (color === 'grey') {
            cardArt.position.set(this.greyResourceContainer.width + cardArt.getWidth()/2, 0);
            this.greyResourceContainer.addChild(cardArt);
        } else if (color === 'yellow') {
            cardArt.position.set(this.commerceContainer.width + cardArt.getWidth()/2, 0);
            this.commerceContainer.addChild(cardArt);
        } else if (color === 'purple') {
            cardArt.position.set(this.guildContainer.width + cardArt.getWidth()/2, 0);
            this.guildContainer.addChild(cardArt);
        } else if (color === 'red') {
            cardArt.position.set(this.militaryContainer.width + cardArt.getWidth()/2, 0);
            this.militaryContainer.addChild(cardArt);
        } else if (color === 'blue') {
            cardArt.position.set(-this.civilianContainer.width - cardArt.getWidth()/2, 0);
            this.civilianContainer.addChild(cardArt);
        } else if (color === 'green') {
            cardArt.position.set(-this.scienceContainer.width - cardArt.getWidth()/2, 0);
            this.scienceContainer.addChild(cardArt);
        } else {
            console.error('Card color not found:', color);
        }
    }
}