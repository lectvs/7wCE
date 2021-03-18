/// <reference path="gameElement.ts" />

class Wonder extends GameElement {
    private readonly BOARD_WIDTH = 600;
    private readonly BOARD_HEIGHT = 300;
    private readonly BOARD_CORNER_RADIUS = 30;
    private readonly BOARD_BORDER = 4;
    private readonly STARTING_EFFECTS_SCALE = 0.32;
    private readonly STARTING_EFFECTS_PADDING = 8;
    private readonly STAGE_MIDDLE_2 = 396;
    private readonly STAGE_MIDDLE_134 = 300;
    private readonly STAGE_DX_4 = 147;
    private readonly STAGE_DX_123 = 192;
    private readonly STAGE_WIDTH = 144;
    private readonly STAGE_HEIGHT = 63;
    private readonly STAGE_CORNER_RADIUS = 18;
    private readonly STAGE_EFFECT_SCALE = 0.29;
    private readonly STAGE_COST_OFFSET_X = 10;
    private readonly STAGE_COST_OFFSET_Y = 60;
    private readonly STAGE_COST_PADDING = 6;
    private readonly STAGE_COST_BORDER = 3;
    private readonly STAGE_COST_SCALE = 0.12;
    private readonly STAGE_PAYMENT_OFFSET_X = -10;
    private readonly STAGE_PAYMENT_OFFSET_Y = -13;
    private readonly STAGE_PAYMENT_SCALE = 0.15;
    private readonly BUILT_STAGE_OFFSET_Y = -130;
    private readonly RESOURCE_ROLL_OFFSET_Y = 30;
    private readonly RED_ROLL_X = -200;
    private readonly RED_ROLL_Y = this.BOARD_BORDER + 22;
    private readonly RED_ROLL_MAX_X = 150;
    private readonly YELLOW_ROLL_Y = -24;
    private readonly PURPLE_ROLL_Y = 24;
    private readonly BLUE_ROLL_Y = -24;
    private readonly GREEN_ROLL_Y = 24;
    private readonly OVERFLOW_ROLL_START_Y = -288;
    private readonly OVERFLOW_ROLL_DY = -54;
    private readonly SIDEBAR_WIDTH = 600;
    private readonly SIDEBAR_NAME_X = -18;
    private readonly SIDEBAR_NAME_Y = 25;
    private readonly SIDEBAR_GOLD_COIN_X = -28;
    private readonly SIDEBAR_GOLD_COIN_Y = 25;
    private readonly SIDEBAR_GOLD_TEXT_X = -43;
    private readonly SIDEBAR_GOLD_TEXT_Y = 55;
    private readonly SIDEBAR_POINTS_COIN_X = -88;
    private readonly SIDEBAR_POINTS_COIN_Y = 55;
    private readonly SIDEBAR_POINTS_TEXT_X = -103;
    private readonly SIDEBAR_POINTS_TEXT_Y = 55;
    private readonly SIDEBAR_CHECKMARK_X = -145;
    private readonly SIDEBAR_CHECKMARK_Y = 52;
    private readonly SIDEBAR_TOKENS_X = -28;
    private readonly SIDEBAR_TOKENS_DX = -24;
    private readonly SIDEBAR_TOKENS_Y = 85;

    private player: string;

    stageXs: number[];
    playedCardEffectRolls: {
        brown: PlayedCardEffectRoll;
        grey: PlayedCardEffectRoll;
        red: PlayedCardEffectRoll;
        yellow: PlayedCardEffectRoll;
        purple: PlayedCardEffectRoll;
        blue: PlayedCardEffectRoll;
        green: PlayedCardEffectRoll;
    } & Dict<PlayedCardEffectRoll>;
    overflowCardEffectRolls: PlayedCardEffectRoll[];
    builtWonderCards: Card[];
    moveIndicatorCheck: HTMLCanvasElement;

    constructor(player: string) {
        super();

        this.player = player;
        let playerData = Main.gamestate.playerData[this.player];

        let boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.draw());
        let sidebar = this.div.appendChild(this.drawSidebar());
        sidebar.style.left = `${this.BOARD_WIDTH/2 - this.SIDEBAR_WIDTH}px`;
        sidebar.style.top = `${-this.BOARD_HEIGHT/2}px`;

        this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-this.BOARD_WIDTH/2, -this.BOARD_HEIGHT/2 - this.RESOURCE_ROLL_OFFSET_Y, false),
            grey: undefined,
            red: new PlayedCardEffectRoll(this.RED_ROLL_X, -this.BOARD_HEIGHT/2 + this.RED_ROLL_Y, false),
            yellow: new PlayedCardEffectRoll(-this.BOARD_WIDTH/2 + this.BOARD_BORDER, this.YELLOW_ROLL_Y, false),
            purple: new PlayedCardEffectRoll(-this.BOARD_WIDTH/2 + this.BOARD_BORDER, this.PURPLE_ROLL_Y, false),
            blue: new PlayedCardEffectRoll(this.BOARD_WIDTH/2 - this.BOARD_BORDER, this.BLUE_ROLL_Y, true),
            green: new PlayedCardEffectRoll(this.BOARD_WIDTH/2 - this.BOARD_BORDER, this.GREEN_ROLL_Y, true),
        };
        this.playedCardEffectRolls.grey = this.playedCardEffectRolls.brown;
        this.overflowCardEffectRolls = [];
        this.pushNewOverflowCardEffectRoll();

        for (let apiCardId of playerData.playedCards) {
            let apiCard = Main.gamestate.cards[apiCardId];
            let card = new Card(apiCardId, apiCard, undefined, this);
            this.addNewCardEffect(card);
            card.addToGame();
        }

        this.builtWonderCards = [];
        for (let stageBuilt of playerData.stagesBuilt) {
            let justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
            let card = Card.flippedCardForAge(stageBuilt.cardAge, justPlayed);
            
            card.zIndex = ZIndices.CARD_WONDER;
            this.builtWonderCards.push(card);
            card.addToGame();
        }

        this.zIndex = ZIndices.WONDER;
    }

    update() {
        for (let color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].x = this.x + this.playedCardEffectRolls[color].offsetx;
            this.playedCardEffectRolls[color].y = this.y + this.playedCardEffectRolls[color].offsety;
            this.playedCardEffectRolls[color].update();
        }

        for (let overflowCardEffectRoll of this.overflowCardEffectRolls) {
            overflowCardEffectRoll.x = this.x + overflowCardEffectRoll.offsetx;
            overflowCardEffectRoll.y = this.y + overflowCardEffectRoll.offsety;
            overflowCardEffectRoll.update();
        }

        for (let i = 0; i < this.builtWonderCards.length; i++) {
            this.builtWonderCards[i].x = this.x - this.BOARD_WIDTH/2 + this.stageXs[Main.gamestate.playerData[this.player].stagesBuilt[i].stage];
            this.builtWonderCards[i].y = this.y + this.BOARD_HEIGHT/2 + this.BUILT_STAGE_OFFSET_Y;
            this.builtWonderCards[i].update();
        }
    }

    getMainRegion() {
        return new PIXI.Rectangle(this.x - this.BOARD_WIDTH/2, this.y - this.BOARD_HEIGHT/2, this.BOARD_WIDTH, this.BOARD_HEIGHT - this.STAGE_HEIGHT);
    }

    getStageRegion() {
        return new PIXI.Rectangle(this.x - this.BOARD_WIDTH/2, this.y + this.BOARD_HEIGHT/2 - this.STAGE_HEIGHT, this.BOARD_WIDTH, 2*this.STAGE_HEIGHT);
    }

    getClosestStageId(posx: number) {
        let minStage = 0;
        for (let i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x - this.BOARD_WIDTH/2 + this.stageXs[i] - posx) < Math.abs(this.x - this.BOARD_WIDTH/2 + this.stageXs[minStage] - posx)) {
                minStage = i;
            }
        }
        return minStage;
    }

    getCardPositionForStage(stage: number) {
        return new PIXI.Point(this.x - this.BOARD_WIDTH/2 + this.stageXs[stage], this.y + this.BOARD_HEIGHT/2 + this.BUILT_STAGE_OFFSET_Y);
    }

    getNewCardEffectWorldPosition(card: Card) {
        let color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            return this.playedCardEffectRolls[color].getNextPosition(card);
        } else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, this.BOARD_WIDTH)) {
                this.pushNewOverflowCardEffectRoll();
            }
            return this.overflowCardEffectRolls[0].getNextPosition(card);
        }
    }

    addNewCardEffect(card: Card) {
        let playerData = Main.gamestate.playerData[this.player];
        let justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'play' && playerData.lastMove.card === card.apiCardId);
        card.state = { type: 'permanent_effect', justPlayed: justPlayed };
        let color = card.apiCard.color;

        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addCard(card);
        } else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, this.BOARD_WIDTH)) {
                this.pushNewOverflowCardEffectRoll();
            }
            this.overflowCardEffectRolls[0].addCard(card);
        }
    }

    makeMove() {
        this.moveIndicatorCheck.style.visibility = 'visible';
    }

    undoMove() {
        this.moveIndicatorCheck.style.visibility = 'hidden';
    }

    private getCardEffectRollMaxWidth(color: string) {
        return {
            'brown': this.BOARD_WIDTH,
            'grey': this.BOARD_WIDTH,
            'red': this.RED_ROLL_MAX_X - this.RED_ROLL_X,
            'yellow': this.BOARD_WIDTH - 2*this.BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': this.BOARD_WIDTH - 2*this.BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': this.BOARD_WIDTH - 2*this.BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': this.BOARD_WIDTH - 2*this.BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
        }[color];
    }

    private pushNewOverflowCardEffectRoll() {
        let roll = new PlayedCardEffectRoll(-this.BOARD_WIDTH/2, this.OVERFLOW_ROLL_START_Y + this.OVERFLOW_ROLL_DY*(this.overflowCardEffectRolls.length-1), false);
        this.overflowCardEffectRolls.unshift(roll);
    }

    private draw() {
        let wonder = Main.gamestate.wonders[this.player];
        let playerData = Main.gamestate.playerData[this.player];

        let wonderBoard = new PIXI.Container();

        // Board
        let boardBase = Shapes.filledRoundedRect(0, 0, this.BOARD_WIDTH, this.BOARD_HEIGHT, this.BOARD_CORNER_RADIUS, wonder.outline_color);
        wonderBoard.addChild(boardBase);

        let boardBg = Shapes.filledRoundedRect(this.BOARD_BORDER, this.BOARD_BORDER,
                                                this.BOARD_WIDTH - 2*this.BOARD_BORDER, this.BOARD_HEIGHT - 2*this.BOARD_BORDER,
                                                this.BOARD_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
        wonderBoard.addChild(boardBg);

        let boardBgMask = boardBg.clone();
        wonderBoard.addChild(boardBgMask);

        // Starting effects
        let startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        startingEffects.scale.set(this.STARTING_EFFECTS_SCALE);
        let startingEffectsBounds = startingEffects.getBounds();
        startingEffects.position.set(this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffects.x),
                                     this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffects.y));

        startingEffectsBounds = startingEffects.getBounds();
        let startingEffectBanner = Shapes.filledRect(startingEffectsBounds.left - this.STARTING_EFFECTS_PADDING, startingEffectsBounds.top - this.STARTING_EFFECTS_PADDING,
                                                     startingEffectsBounds.width + 2*this.STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2*this.STARTING_EFFECTS_PADDING,
                                                     ArtCommon.cardBannerForColor(wonder.starting_effect_color));
        startingEffectBanner.mask = boardBgMask;
        wonderBoard.addChild(startingEffectBanner);
        wonderBoard.addChild(startingEffects);

        // Wonder stages
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

        let stagesMiddle = wonder.stages.length === 2 ? this.STAGE_MIDDLE_2 : this.STAGE_MIDDLE_134;
        let stageDX = wonder.stages.length === 4 ? this.STAGE_DX_4 : this.STAGE_DX_123;

        this.stageXs = [];
        for (let i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));

            let stageBase = Shapes.filledRoundedRect(-this.STAGE_WIDTH/2, this.BOARD_HEIGHT - this.STAGE_HEIGHT,
                                                     this.STAGE_WIDTH, this.STAGE_HEIGHT*2, this.STAGE_CORNER_RADIUS, wonder.outline_color);
            stageBase.mask = boardBgMask;
            stageBase.x = this.stageXs[i];
            wonderBoard.addChild(stageBase);

            let stageBg = Shapes.filledRoundedRect(-this.STAGE_WIDTH/2 + this.BOARD_BORDER, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.BOARD_BORDER,
                                                   this.STAGE_WIDTH - 2*this.BOARD_BORDER, this.STAGE_HEIGHT*2 - 2*this.BOARD_BORDER,
                                                   this.STAGE_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = this.stageXs[i];
            wonderBoard.addChild(stageBg);

            let stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(this.STAGE_EFFECT_SCALE);
            stageEffects.position.set(this.stageXs[i], this.BOARD_HEIGHT - this.STAGE_HEIGHT/2);
            wonderBoard.addChild(stageEffects);

            let stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(this.STAGE_COST_SCALE);
                stageCost.position.set(this.stageXs[i] - this.STAGE_WIDTH/2 + this.STAGE_COST_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_COST_OFFSET_Y);

                let costBanner = Shapes.filledRoundedRect(-stageCost.width/2 - this.STAGE_COST_PADDING, -this.STAGE_COST_PADDING,
                                                          stageCost.width + 2*this.STAGE_COST_PADDING, stageCost.height + 2*this.STAGE_COST_PADDING,
                                                          this.STAGE_COST_PADDING, wonder.outline_color);
                costBanner.position.set(stageCost.x, stageCost.y);

                let costBannerBg = Shapes.filledRoundedRect(-stageCost.width/2 - (this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), -(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER),
                                                            stageCost.width + 2*(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), stageCost.height + 2*(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER),
                                                            this.STAGE_COST_PADDING - this.STAGE_COST_BORDER, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);

                wonderBoard.addChild(costBanner);
                wonderBoard.addChild(costBannerBg);
                wonderBoard.addChild(stageCost);
            }

            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                let stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(this.STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + this.STAGE_WIDTH/2 + this.STAGE_PAYMENT_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.STAGE_PAYMENT_OFFSET_Y);
                wonderBoard.addChild(stagePayment);
            }
        }

        return render(wonderBoard, this.BOARD_WIDTH, this.BOARD_HEIGHT);
    }

    private drawSidebar() {
        let sidebar = document.createElement('div');
        sidebar.style.width = `${this.SIDEBAR_WIDTH}px`;
        sidebar.style.height = `${this.BOARD_HEIGHT}px`;
        sidebar.style.position = 'absolute';

        let nameText = sidebar.appendChild(this.drawSidebarText(this.player, 20));
        nameText.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_NAME_X}px`;
        nameText.style.top = `${this.SIDEBAR_NAME_Y}px`;

        let goldCoin = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.goldCoin(), 0.2));
        goldCoin.style.position = 'absolute';
        goldCoin.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_GOLD_COIN_X}px`;
        goldCoin.style.top = `${this.SIDEBAR_GOLD_COIN_Y}px`;

        let goldText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].gold}`, 20));
        goldText.style.color = '#FBE317';
        goldText.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_GOLD_TEXT_X}px`;
        goldText.style.top = `${this.SIDEBAR_GOLD_TEXT_Y}px`;

        let pointsWreath = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.pointsWreath(), 0.2));
        pointsWreath.style.position = 'absolute';
        pointsWreath.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_POINTS_COIN_X}px`;
        pointsWreath.style.top = `${this.SIDEBAR_POINTS_COIN_Y}px`;

        let pointsText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].pointsDistribution.total}`, 20));
        pointsText.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_POINTS_TEXT_X}px`;
        pointsText.style.top = `${this.SIDEBAR_POINTS_TEXT_Y}px`;

        this.moveIndicatorCheck = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.2));
        this.moveIndicatorCheck.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_CHECKMARK_X}px`;
        this.moveIndicatorCheck.style.top = `${this.SIDEBAR_CHECKMARK_Y}px`;
        this.moveIndicatorCheck.style.visibility = 'hidden';

        for (let i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            let token = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.militaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]), 0.2));
            token.style.position = 'absolute';
            token.style.left = `${this.SIDEBAR_WIDTH + this.SIDEBAR_TOKENS_X + this.SIDEBAR_TOKENS_DX*i}px`;
            token.style.top = `${this.SIDEBAR_TOKENS_Y}px`;
        }

        return sidebar;
    }

    private drawSidebarText(text: string, size: number) {
        let div = document.createElement('div');
        div.style.width = '50%';
        div.style.position = 'absolute';
        div.style.transform = 'translate(-100%, 0)';
        let p = div.appendChild(document.createElement('p'));
        p.textContent = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${size}px`;
        p.style.color = `#FFFFFF`;
        p.style.width = '100%';
        p.style.textAlign = 'right';
        p.style.transform = 'translate(0, -50%)';
        return div;
    }
}