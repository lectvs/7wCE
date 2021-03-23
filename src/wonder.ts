/// <reference path="gameElement.ts" />

class Wonder extends GameElement {

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

    pointsText: HTMLParagraphElement;
    goldText: HTMLParagraphElement;

    constructor(player: string) {
        super();

        this.player = player;
        let playerData = Main.gamestate.playerData[this.player];

        let boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.draw());
        let sidebar = this.div.appendChild(this.drawSidebar());
        sidebar.style.left = `${C.WONDER_BOARD_WIDTH/2 - C.WONDER_SIDEBAR_WIDTH}px`;
        sidebar.style.top = `${-C.WONDER_BOARD_HEIGHT/2}px`;

        this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2, -C.WONDER_BOARD_HEIGHT/2 - C.WONDER_RESOURCE_ROLL_OFFSET_Y, false),
            grey: undefined,
            red: new PlayedCardEffectRoll(C.WONDER_RED_ROLL_X, -C.WONDER_BOARD_HEIGHT/2 + C.WONDER_RED_ROLL_Y, false),
            yellow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_YELLOW_ROLL_Y, false),
            purple: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_PURPLE_ROLL_Y, false),
            blue: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH/2 - C.WONDER_BOARD_BORDER, C.WONDER_BLUE_ROLL_Y, true),
            green: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH/2 - C.WONDER_BOARD_BORDER, C.WONDER_GREEN_ROLL_Y, true),
        };
        this.playedCardEffectRolls.grey = this.playedCardEffectRolls.brown;
        this.overflowCardEffectRolls = [];
        this.pushNewOverflowCardEffectRoll();

        for (let apiCardId of playerData.playedCards) {
            let apiCard = Main.gamestate.cards[apiCardId];
            let card = new Card(apiCardId, apiCard, undefined, this, []);
            this.addNewCardEffect(card);
            card.addToGame();
        }

        this.builtWonderCards = [];
        for (let stageBuilt of playerData.stagesBuilt) {
            let justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
            let card = Card.flippedCardForAge(stageBuilt.cardAge, justPlayed);
            
            card.zIndex = C.Z_INDEX_CARD_WONDER;
            this.builtWonderCards.push(card);
            card.addToGame();
        }

        this.zIndex = C.Z_INDEX_WONDER;
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
            this.builtWonderCards[i].targetPosition.set(this.x - C.WONDER_BOARD_WIDTH/2 + this.stageXs[Main.gamestate.playerData[this.player].stagesBuilt[i].stage],
                                                        this.y + C.WONDER_BOARD_HEIGHT/2 + C.WONDER_BUILT_STAGE_OFFSET_Y);
            this.builtWonderCards[i].snapToTarget();
            this.builtWonderCards[i].update();
        }
    }

    getMainRegion() {
        return new PIXI.Rectangle(this.x - C.WONDER_BOARD_WIDTH/2, this.y - C.WONDER_BOARD_HEIGHT/2, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT);
    }

    getStageRegion() {
        return new PIXI.Rectangle(this.x - C.WONDER_BOARD_WIDTH/2, this.y + C.WONDER_BOARD_HEIGHT/2 - C.WONDER_STAGE_HEIGHT, C.WONDER_BOARD_WIDTH, 2*C.WONDER_STAGE_HEIGHT);
    }

    getClosestStageId(posx: number) {
        let minStage = 0;
        for (let i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x - C.WONDER_BOARD_WIDTH/2 + this.stageXs[i] - posx) < Math.abs(this.x - C.WONDER_BOARD_WIDTH/2 + this.stageXs[minStage] - posx)) {
                minStage = i;
            }
        }
        return minStage;
    }

    getCardPositionForStage(stage: number) {
        return new PIXI.Point(this.x - C.WONDER_BOARD_WIDTH/2 + this.stageXs[stage], this.y + C.WONDER_BOARD_HEIGHT/2 + C.WONDER_BUILT_STAGE_OFFSET_Y);
    }

    getNewCardEffectWorldPosition(card: Card) {
        let color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            return this.playedCardEffectRolls[color].getNextPosition(card);
        } else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, C.WONDER_BOARD_WIDTH)) {
                this.pushNewOverflowCardEffectRoll();
            }
            return this.overflowCardEffectRolls[0].getNextPosition(card);
        }
    }

    addNewCardEffect(card: Card) {
        let playerData = Main.gamestate.playerData[this.player];
        let justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'play' && playerData.lastMove.card === card.apiCardId);
        card.state = { type: 'effect', justPlayed: justPlayed };
        card.snap();
        let color = card.apiCard.color;

        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addCard(card);
        } else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, C.WONDER_BOARD_WIDTH)) {
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
            'brown': C.WONDER_BOARD_WIDTH,
            'grey': C.WONDER_BOARD_WIDTH,
            'red': C.WONDER_RED_ROLL_MAX_X - C.WONDER_RED_ROLL_X,
            'yellow': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
        }[color];
    }

    private pushNewOverflowCardEffectRoll() {
        let roll = new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2, C.WONDER_OVERFLOW_ROLL_START_Y + C.WONDER_OVERFLOW_ROLL_DY*(this.overflowCardEffectRolls.length-1), false);
        this.overflowCardEffectRolls.unshift(roll);
    }

    private draw() {
        let wonder = Main.gamestate.wonders[this.player];
        let playerData = Main.gamestate.playerData[this.player];

        let wonderBoard = new PIXI.Container();

        // Board
        let boardBase = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, wonder.outline_color);
        wonderBoard.addChild(boardBase);

        let boardBg = Shapes.filledRoundedRect(C.WONDER_BOARD_BORDER, C.WONDER_BOARD_BORDER,
                                               C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - 2*C.WONDER_BOARD_BORDER,
                                               C.WONDER_BOARD_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
        wonderBoard.addChild(boardBg);

        let boardBgMask = boardBg.clone();
        wonderBoard.addChild(boardBgMask);

        // Starting effects
        let startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        startingEffects.scale.set(C.WONDER_STARTING_EFFECTS_SCALE);
        let startingEffectsBounds = startingEffects.getBounds();
        startingEffects.position.set(C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffects.x),
                                     C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffects.y));

        startingEffectsBounds = startingEffects.getBounds();
        let startingEffectBanner = Shapes.filledRect(startingEffectsBounds.left - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.top - C.WONDER_STARTING_EFFECTS_PADDING,
                                                     startingEffectsBounds.width + 2*C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2*C.WONDER_STARTING_EFFECTS_PADDING,
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

        let stagesMiddle = wonder.stages.length === 2 ? C.WONDER_STAGE_MIDDLE_2 : C.WONDER_STAGE_MIDDLE_134;
        let stageDX = wonder.stages.length === 4 ? C.WONDER_STAGE_DX_4 : C.WONDER_STAGE_DX_123;

        this.stageXs = [];
        for (let i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));

            let stageBase = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH/2, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT,
                                                     C.WONDER_STAGE_WIDTH, C.WONDER_STAGE_HEIGHT*2, C.WONDER_STAGE_CORNER_RADIUS, wonder.outline_color);
            stageBase.mask = boardBgMask;
            stageBase.x = this.stageXs[i];
            wonderBoard.addChild(stageBase);

            let stageBg = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT + C.WONDER_BOARD_BORDER,
                                                   C.WONDER_STAGE_WIDTH - 2*C.WONDER_BOARD_BORDER, C.WONDER_STAGE_HEIGHT*2 - 2*C.WONDER_BOARD_BORDER,
                                                   C.WONDER_STAGE_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = this.stageXs[i];
            wonderBoard.addChild(stageBg);

            let stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(C.WONDER_STAGE_EFFECT_SCALE);
            stageEffects.position.set(this.stageXs[i], C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT/2);
            wonderBoard.addChild(stageEffects);

            let stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(C.WONDER_STAGE_COST_SCALE);
                stageCost.position.set(this.stageXs[i] - C.WONDER_STAGE_WIDTH/2 + C.WONDER_STAGE_COST_OFFSET_X, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_COST_OFFSET_Y);

                let costBanner = Shapes.filledRoundedRect(-stageCost.width/2 - C.WONDER_STAGE_COST_PADDING, -C.WONDER_STAGE_COST_PADDING,
                                                          stageCost.width + 2*C.WONDER_STAGE_COST_PADDING, stageCost.height + 2*C.WONDER_STAGE_COST_PADDING,
                                                          C.WONDER_STAGE_COST_PADDING, wonder.outline_color);
                costBanner.position.set(stageCost.x, stageCost.y);

                let costBannerBg = Shapes.filledRoundedRect(-stageCost.width/2 - (C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), -(C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER),
                                                            stageCost.width + 2*(C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), stageCost.height + 2*(C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER),
                                                            C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);

                wonderBoard.addChild(costBanner);
                wonderBoard.addChild(costBannerBg);
                wonderBoard.addChild(stageCost);
            }

            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                let stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(C.WONDER_STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + C.WONDER_STAGE_WIDTH/2 + C.WONDER_STAGE_PAYMENT_OFFSET_X, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT + C.WONDER_STAGE_PAYMENT_OFFSET_Y);
                wonderBoard.addChild(stagePayment);
            }
        }

        return render(wonderBoard, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT);
    }

    private drawSidebar() {
        let sidebar = document.createElement('div');
        sidebar.style.width = `${C.WONDER_SIDEBAR_WIDTH}px`;
        sidebar.style.height = `${C.WONDER_BOARD_HEIGHT}px`;
        sidebar.style.position = 'absolute';

        let nameText = sidebar.appendChild(this.drawSidebarText(this.player, 20));
        nameText.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_NAME_X}px`;
        nameText.style.top = `${C.WONDER_SIDEBAR_NAME_Y}px`;

        let goldCoin = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.goldCoin(), 0.2));
        goldCoin.style.position = 'absolute';
        goldCoin.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_GOLD_COIN_X}px`;
        goldCoin.style.top = `${C.WONDER_SIDEBAR_GOLD_COIN_Y}px`;

        let goldText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].gold}`, 20));
        goldText.style.color = ArtCommon.goldColorHtml;
        goldText.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_GOLD_TEXT_X}px`;
        goldText.style.top = `${C.WONDER_SIDEBAR_GOLD_TEXT_Y}px`;
        this.goldText = goldText.querySelector('p');

        let pointsWreath = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.pointsWreath(), 0.2));
        pointsWreath.style.position = 'absolute';
        pointsWreath.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_POINTS_COIN_X}px`;
        pointsWreath.style.top = `${C.WONDER_SIDEBAR_POINTS_COIN_Y}px`;

        let pointsText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].pointsDistribution.total}`, 20));
        pointsText.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_POINTS_TEXT_X}px`;
        pointsText.style.top = `${C.WONDER_SIDEBAR_POINTS_TEXT_Y}px`;
        this.pointsText = pointsText.querySelector('p');

        this.moveIndicatorCheck = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.2));
        this.moveIndicatorCheck.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_CHECKMARK_X}px`;
        this.moveIndicatorCheck.style.top = `${C.WONDER_SIDEBAR_CHECKMARK_Y}px`;
        this.moveIndicatorCheck.style.visibility = 'hidden';

        for (let i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            let token = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.militaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]), 0.2));
            token.style.position = 'absolute';
            token.style.left = `${C.WONDER_SIDEBAR_WIDTH + C.WONDER_SIDEBAR_TOKENS_X + C.WONDER_SIDEBAR_TOKENS_DX*i}px`;
            token.style.top = `${C.WONDER_SIDEBAR_TOKENS_Y}px`;
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