/// <reference path="gameElement.ts" />

class Wonder extends GameElement {

    private scene: GameScene;
    private wonder: API.Wonder;
    private player: string;

    wonderResource: WonderResource;
    stageXs: number[];
    playedCardEffectRolls: {
        brown: PlayedCardEffectRoll;
        grey: PlayedCardEffectRoll;
        red: PlayedCardEffectRoll;
        yellow: PlayedCardEffectRoll;
        purple: PlayedCardEffectRoll;
        blue: PlayedCardEffectRoll;
        green: PlayedCardEffectRoll;
        black: PlayedCardEffectRoll;
        overflow: PlayedCardEffectRoll;
    } & Dict<PlayedCardEffectRoll>;
    builtWonderCards: Card[];
    diplomacyTokenRack: TokenRack;
    militaryTokenRack: TokenRack;
    debtTokenRack: TokenRack;

    sidebar: HTMLDivElement;
    pointsText: HTMLParagraphElement;
    goldText: HTMLParagraphElement;

    constructor(scene: GameScene, wonder: API.Wonder, player: string) {
        super();

        this.scene = scene;
        this.wonder = wonder;
        this.player = player;
        this.create();
    }

    create() {
        let playerData = Main.gamestate.playerData[this.player];

        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);
        this.stageXs = this.wonderResource.stageXs;

        this.div.className = 'wonder';

        let boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);

        let payments = boardDiv.appendChild(this.drawPayments());
        payments.style.transform = `translate(-50%, ${C.WONDER_BOARD_HEIGHT/2 - C.WONDER_STAGE_HEIGHT + C.WONDER_STAGE_PAYMENT_OFFSET_Y}px)`;
        payments.style.zIndex = '10000';

        this.sidebar = this.div.appendChild(this.drawSidebar());
        this.sidebar.style.left = `${C.WONDER_BOARD_WIDTH/2 - C.WONDER_BOARD_WIDTH}px`;
        this.sidebar.style.top = `${-C.WONDER_BOARD_HEIGHT/2}px`;

        // Military tokens
        this.militaryTokenRack = new TokenRack(C.WONDER_MILITARY_TOKENS_OFFSET_X, C.WONDER_MILITARY_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, () => {
            return new PIXI.Point(this.x + C.WONDER_BOARD_WIDTH/2 + C.WONDER_SIDEBAR_TOKENS_X, this.y - C.WONDER_BOARD_HEIGHT/2 + C.WONDER_SIDEBAR_MILITARY_TOKENS_Y);
        });
        for (let i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            this.addMilitaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]);
        }
        this.militaryTokenRack.addToGame();

        // Debt tokens
        this.debtTokenRack = new TokenRack(C.WONDER_DEBT_TOKENS_OFFSET_X, C.WONDER_DEBT_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, () => {
            return new PIXI.Point(this.x + C.WONDER_BOARD_WIDTH/2 + C.WONDER_SIDEBAR_TOKENS_X, this.y - C.WONDER_BOARD_HEIGHT/2 + C.WONDER_SIDEBAR_DEBT_TOKENS_Y);
        });
        for (let i = 0; i < Main.gamestate.playerData[this.player].debtTokens; i++) {
            this.addDebtToken();
        }
        this.debtTokenRack.addToGame();

        let c = Main.gamestate.citiesEnabled;

        this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2, -C.WONDER_BOARD_HEIGHT/2 - C.WONDER_RESOURCE_ROLL_OFFSET_Y, false, C.SORT_CMP_RESOURCES),
            grey: undefined,  // Defined right after this, below.
            red: new PlayedCardEffectRoll(C.WONDER_RED_ROLL_X, -C.WONDER_BOARD_HEIGHT/2 + C.WONDER_RED_ROLL_Y, false, null),
            yellow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_YELLOW_ROLL_Y(c), false, null),
            purple: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_PURPLE_ROLL_Y(c), false, null),
            blue: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH/2 - C.WONDER_BOARD_BORDER, C.WONDER_BLUE_ROLL_Y(c), true, null),
            green: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH/2 - C.WONDER_BOARD_BORDER, C.WONDER_GREEN_ROLL_Y(c), true, C.SORT_CMP_SCIENCE),
            black: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_BLACK_ROLL_Y, false, null),
            overflow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH/2, -C.WONDER_BOARD_HEIGHT/2 - C.WONDER_OVERFLOW_ROLL_OFFSET_Y, false, null),
        };
        this.playedCardEffectRolls.grey = this.playedCardEffectRolls.brown;
        
        for (let apiCardId of playerData.playedCards) {
            let points = apiCardId in playerData.cardPoints ? playerData.cardPoints[apiCardId] : undefined;
            let card = new Card(this.scene, apiCardId, -1, points, undefined, this, []);
            this.addNewCardEffect(card);
            if (card.isMilitary() && playerData.diplomacyTokens > 0) {
                card.setGrayedOut(true);
            }
            card.addToGame();
        }

        this.builtWonderCards = [];
        for (let stageBuilt of playerData.stagesBuilt) {
            let justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
            let card = Card.flippedCardForAge(this.scene, stageBuilt.cardAge, justPlayed);
            card.convertToBuried();
            card.addToGame();
            this.builtWonderCards.push(card);
        }

        this.diplomacyTokenRack = new TokenRack(C.WONDER_DIPLOMACY_TOKENS_OFFSET_X, C.WONDER_DIPLOMACY_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, () => {
            return new PIXI.Point(this.x + this.playedCardEffectRolls.red.offsetx
                                         + this.playedCardEffectRolls.red.width
                                         + this.playedCardEffectRolls.red.placeholderWidth,
                                  this.y + this.playedCardEffectRolls.red.offsety);
        });
        for (let i = 0; i < playerData.diplomacyTokens; i++) {
            this.addDiplomacyToken();
        }
        this.diplomacyTokenRack.addToGame();

        // Starting effects popup
        let popupDiv = this.div.appendChild(document.createElement('div'));
        popupDiv.style.position = 'absolute';
        popupDiv.style.left = `${-C.WONDER_BOARD_WIDTH/2 + this.wonderResource.startingEffectsRect.left}px`;
        popupDiv.style.top = `${-C.WONDER_BOARD_HEIGHT/2 + this.wonderResource.startingEffectsRect.top}px`;
        popupDiv.style.width = `${this.wonderResource.startingEffectsRect.width}px`;
        popupDiv.style.height = `${this.wonderResource.startingEffectsRect.height}px`;

        popupDiv.onmousemove = () => {
            if (Main.scene.isCurrentlyDragging()) {
                Main.scene.stopPopup(this.wonder);
                return;
            }
            Main.scene.updatePopup(this.wonder, this.x - C.WONDER_BOARD_WIDTH/2 + this.wonderResource.startingEffectsRect.left,
                                                this.y - C.WONDER_BOARD_HEIGHT/2 + this.wonderResource.startingEffectsRect.top + this.wonderResource.startingEffectsRect.height);
        };

        popupDiv.onmouseleave = () => {
            Main.scene.stopPopup(this.wonder);
        };

        // Stage popups
        for (let i = 0; i < this.wonder.stages.length; i++) {
            let stageX = this.wonderResource.stageXs[i];
            let wonderStage = this.wonder.stages[i];

            let stageSource = {
                player: this.player,
                stageIndex: i,
                stage: wonderStage,
            };

            let popupDiv = this.div.appendChild(document.createElement('div'));
            popupDiv.style.position = 'absolute';
            popupDiv.style.left = `${-C.WONDER_BOARD_WIDTH/2 + stageX - C.WONDER_STAGE_WIDTH/2}px`;
            popupDiv.style.top = `${C.WONDER_BOARD_HEIGHT/2 - C.WONDER_STAGE_HEIGHT}px`;
            popupDiv.style.width = `${C.WONDER_STAGE_WIDTH}px`;
            popupDiv.style.height = `${C.WONDER_STAGE_HEIGHT}px`;

            popupDiv.onmousemove = () => {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(stageSource);
                    return;
                }
                Main.scene.updatePopup(stageSource, this.x - C.WONDER_BOARD_WIDTH/2 + stageX - C.WONDER_STAGE_WIDTH/2, this.y + C.WONDER_BOARD_HEIGHT/2);
            };
    
            popupDiv.onmouseleave = () => {
                Main.scene.stopPopup(stageSource);
            };
        }

        this.zIndex = C.Z_INDEX_WONDER;
    }

    destroy() {
        for (let color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].destroy();
        }

        for (let card of this.builtWonderCards) {
            card.destroy();
        }

        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnWonder(this.wonder.name, this.wonder.side, this.wonderResource);
        this.wonderResource = null;
    }

    update() {
        for (let color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].x = this.x + this.playedCardEffectRolls[color].offsetx;
            this.playedCardEffectRolls[color].y = this.y + this.playedCardEffectRolls[color].offsety;
            this.playedCardEffectRolls[color].update();
        }

        for (let i = 0; i < this.builtWonderCards.length; i++) {
            this.builtWonderCards[i].targetPosition.set(this.x - C.WONDER_BOARD_WIDTH/2 + this.stageXs[Main.gamestate.playerData[this.player].stagesBuilt[i].stage],
                                                        this.y + C.WONDER_BOARD_HEIGHT/2 + C.WONDER_BUILT_STAGE_OFFSET_Y);
            this.builtWonderCards[i].snapToTarget();
            this.builtWonderCards[i].update();
        }

        this.militaryTokenRack.update();
        this.debtTokenRack.update();
        this.diplomacyTokenRack.update();
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
            return this.playedCardEffectRolls.overflow.getNextPosition(card);
        }
    }

    getGoldCoinWorldPosition() {
        return new PIXI.Point(this.x + C.WONDER_BOARD_WIDTH/2 + C.WONDER_SIDEBAR_GOLD_COIN_X, this.y - C.WONDER_BOARD_HEIGHT/2 + C.WONDER_SIDEBAR_GOLD_COIN_Y);
    }

    getMilitaryTokenWorldPosition(i: number) {
        return this.militaryTokenRack.getTokenPosition(i);
    }

    getDebtTokenWorldPosition(i: number) {
        return this.debtTokenRack.getTokenPosition(i);
    }

    getDiplomacyTokenPosition(i: number) {
        return this.diplomacyTokenRack.getTokenPosition(i);
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
            this.playedCardEffectRolls.overflow.addCard(card);
        }
    }

    adjustPlaceholdersFor(card: Card) {
        this.removePlaceholders();
        if (card && (card.state.type === 'effect' || card.state.type === 'locked_play')) {
            this.addPlaceholder(card);
        }
    }

    adjustToDiplomacy(diplomacy: boolean) {
        for (let key in this.playedCardEffectRolls) {
            for (let card of this.playedCardEffectRolls[key].cards) {
                if (card.isMilitary()) card.setGrayedOut(diplomacy);
            }
        }
    }

    addMilitaryToken(value: number) {
        this.militaryTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.militaryToken(value), C.MILITARY_TOKEN_SCALE));
    }

    addDebtToken() {
        this.debtTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.debtToken(), C.DEBT_TOKEN_SCALE));
    }

    addDiplomacyToken() {
        this.diplomacyTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.dove(), C.DIPLOMACY_TOKEN_SCALE));
    }

    private addPlaceholder(card: Card) {
        let color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addPlaceholder(card);
        }
    }

    private removePlaceholders() {
        for (let color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].removePlaceholder();
        }
    }

    private getCardEffectRollMaxWidth(color: string) {
        return {
            'brown': C.WONDER_BOARD_WIDTH - C.WONDER_RESOURCE_ROLL_INFO_WIDTH,
            'grey': C.WONDER_BOARD_WIDTH - C.WONDER_RESOURCE_ROLL_INFO_WIDTH,
            'red': C.WONDER_RED_ROLL_MAX_X - C.WONDER_RED_ROLL_X,
            'yellow': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
            'black': C.WONDER_BOARD_WIDTH - 2*C.WONDER_BOARD_BORDER,
        }[color];
    }

    private drawPayments() {
        let wonder = Main.gamestate.wonders[this.player];
        let playerData = Main.gamestate.playerData[this.player];

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

        let payments = new PIXI.Container();
        for (let i = 0; i < wonder.stages.length; i++) {
            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                let stagePayment = ArtCommon.payment(wonderStageMinCosts[i], false);
                stagePayment.scale.set(C.WONDER_STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + C.WONDER_STAGE_PAYMENT_OFFSET_X, 0);
                payments.addChild(stagePayment);
            }
        }

        payments.position.set(C.WONDER_STAGE_WIDTH/2, C.WONDER_PAYMENT_HEIGHT/2);

        return render(payments, C.WONDER_BOARD_WIDTH, C.WONDER_PAYMENT_HEIGHT);
    }

    private drawSidebar() {
        let sidebar = document.createElement('div');
        sidebar.style.width = `${C.WONDER_BOARD_WIDTH}px`;
        sidebar.style.height = `${C.WONDER_BOARD_HEIGHT}px`;
        sidebar.style.position = 'absolute';

        let nameElo = this.player in Main.users ? `${this.player}<span style="font-size: 12px"> (${Math.round(Main.users[this.player].elo)})</span>` : this.player;
        let nameText = sidebar.appendChild(this.drawSidebarText(nameElo, C.WONDER_SIDEBAR_NAME_SIZE));
        nameText.style.left = `${C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_NAME_X}px`;
        nameText.style.top = `${C.WONDER_SIDEBAR_NAME_Y}px`;

        let goldCoin = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.goldCoin(), C.WONDER_SIDEBAR_GOLD_COIN_SCALE));
        goldCoin.style.position = 'absolute';
        goldCoin.style.left = `${C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_GOLD_COIN_X}px`;
        goldCoin.style.top = `${C.WONDER_SIDEBAR_GOLD_COIN_Y}px`;

        let goldText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].gold}`, C.WONDER_SIDEBAR_GOLD_TEXT_SIZE));
        goldText.style.color = ArtCommon.goldColorHtml;
        goldText.style.left = `${C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_GOLD_TEXT_X}px`;
        goldText.style.top = `${C.WONDER_SIDEBAR_GOLD_TEXT_Y}px`;
        this.goldText = goldText.querySelector('p');

        let pointsWreath = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.pointsWreath(), C.WONDER_SIDEBAR_POINTS_WREATH_SCALE));
        pointsWreath.style.position = 'absolute';
        pointsWreath.style.left = `${C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_POINTS_WREATH_X}px`;
        pointsWreath.style.top = `${C.WONDER_SIDEBAR_POINTS_WREATH_Y}px`;

        let pointsText = sidebar.appendChild(this.drawSidebarText(`${Main.gamestate.playerData[this.player].pointsDistribution.total}`, C.WONDER_SIDEBAR_POINTS_TEXT_SIZE));
        pointsText.style.left = `${C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_POINTS_TEXT_X}px`;
        pointsText.style.top = `${C.WONDER_SIDEBAR_POINTS_TEXT_Y}px`;
        this.pointsText = pointsText.querySelector('p');

        return sidebar;
    }

    private drawSidebarText(text: string, size: number) {
        let div = document.createElement('div');
        div.style.width = '50%';
        div.style.position = 'absolute';
        div.style.transform = 'translate(-100%, 0)';
        let p = div.appendChild(document.createElement('p'));
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${size}px`;
        p.style.color = `#FFFFFF`;
        p.style.width = '100%';
        p.style.textAlign = 'right';
        p.style.transform = 'translate(0, -50%)';
        return div;
    }
}