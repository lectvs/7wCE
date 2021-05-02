type LoaderResource = {
    load: () => any;
    loaded: boolean;
}

class Loader {
    private resources: LoaderResource[];
    private onFinishedLoading: () => any;
    private complete: boolean;

    get isLoaded() {
        for (let resource of this.resources) {
            if (!resource.loaded) return false;
        }
        return this.resources.length > 0;
    }

    get loadPercentage() {
        if (this.resources.length === 0) return 0;
        let loaded = 0;
        for (let resource of this.resources) {
            if (resource.loaded) loaded++;
        }
        return Math.round(loaded / this.resources.length * 100);
    }

    constructor(onFinishedLoading: () => any) {
        this.resources = [];
        this.onFinishedLoading = onFinishedLoading;
        this.complete = false;
    }

    update() {
        if (this.complete) return;

        let loaded = this.resources.length > 0;
        for (let resource of this.resources) {
            if (!resource.loaded) {
                loaded = false;
                resource.load();
                break;
            }
        }
        if (loaded) {
            this.onFinishedLoading();
            this.complete = true;
        }
    }

    loadGamestateResources() {
        // Cards
        for (let cardId in Main.gamestate.cards) {
            let card = Main.gamestate.cards[cardId];
            this.loadCard(cardId, card);
        }

        // Flipped card placeholders
        this.loadCard('-1', { age: 1, color: 'brown', name: '', effects: [] });
        this.loadCard('-2', { age: 2, color: 'brown', name: '', effects: [] });
        this.loadCard('-3', { age: 3, color: 'brown', name: '', effects: [] });

        // Wonders
        if (Main.gamestate.state === 'CHOOSE_WONDER_SIDE') {
            for (let player in Main.gamestate.wonderChoices) {
                let wonderChoice = Main.gamestate.wonderChoices[player];
                for (let wonder of wonderChoice) {
                    this.loadWonder(wonder);
                }
            }
        } else {
            for (let player in Main.gamestate.wonders) {
                let wonder = Main.gamestate.wonders[player];
                this.loadWonder(wonder);
            }
        }

        // Other
        this.loadDiscardPile();
        this.loadCardList(Main.gamestate);
    }

    private loadCard(id: string, card: API.Card) {
        let resource = this.addNewResource();
        
        resource.load = () => {
            /* FRONT */
            let front = new PIXI.Container();

            let cardBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(card.color));
            front.addChild(cardBase);

            let cardBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER,
                                                C.CARD_WIDTH - 2*C.CARD_BORDER, C.CARD_HEIGHT - 2*C.CARD_BORDER,
                                                C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
            front.addChild(cardBg);

            let cardMask = cardBase.clone();
            front.addChild(cardMask);

            let costContainer = ArtCommon.getArtForCost(card.cost);
            if (costContainer) {
                costContainer.scale.set(C.CARD_COST_SCALE);
                costContainer.position.set(C.CARD_COST_X, C.CARD_COST_Y);

                let costBanner = Shapes.filledRoundedRect(-costContainer.width/2 - C.CARD_COST_PADDING, -C.CARD_COST_PADDING,
                                                        costContainer.width + 2*C.CARD_COST_PADDING, costContainer.height + 2*C.CARD_COST_PADDING,
                                                        C.CARD_COST_PADDING, ArtCommon.cardBannerForColor(card.color));
                costBanner.position.set(C.CARD_COST_X, C.CARD_COST_Y);
                costBanner.mask = cardMask;

                front.addChild(costBanner);
                front.addChild(costContainer);
            }

            let cardBanner = Shapes.filledRect(0, 0, C.CARD_WIDTH, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT, ArtCommon.cardBannerForColor(card.color));
            cardBanner.mask = cardMask;
            front.addChild(cardBanner);

            let effectContainer = new PIXI.Container();
            effectContainer.addChild(ArtCommon.getShadowForEffects(card.effects, 'dark'));
            effectContainer.addChild(ArtCommon.getArtForEffects(card.effects));
            effectContainer.position.set(C.CARD_WIDTH/2, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2);
            effectContainer.scale.set(C.CARD_EFFECT_SCALE);
            front.addChild(effectContainer);

            let fullClipRect = new PIXI.Rectangle(0, -C.CARD_PAYMENT_HEIGHT, C.CARD_WIDTH, C.CARD_HEIGHT + C.CARD_PAYMENT_HEIGHT);
            let effectBounds = effectContainer.getBounds();
            let effectHalfWidth = Math.max(C.CARD_WIDTH/2 - effectBounds.left, effectBounds.right - C.CARD_WIDTH/2, C.CARD_EFFECT_HEIGHT/2);
            let effectClipRect = new PIXI.Rectangle(C.CARD_WIDTH/2 - effectHalfWidth - C.CARD_EFFECT_CLIP_PADDING, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2 - C.CARD_EFFECT_HEIGHT/2 - C.CARD_EFFECT_CLIP_PADDING,
                                                     2*effectHalfWidth + 2*C.CARD_EFFECT_CLIP_PADDING, C.CARD_EFFECT_HEIGHT + 2*C.CARD_EFFECT_CLIP_PADDING);

            let title = Shapes.centeredText(C.CARD_WIDTH/2, C.CARD_TITLE_Y, card.name, C.CARD_TITLE_SCALE, C.CARD_TITLE_COLOR);
            title.anchor.y = 0;
            front.addChild(title);

            /* BACK */

            let back = new PIXI.Container();

            let backBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.ageBacks[card.age]);
            back.addChild(backBase);

            let backBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER,
                                                    C.CARD_WIDTH - 2*C.CARD_BORDER, C.CARD_HEIGHT - 2*C.CARD_BORDER,
                                                    C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
            back.addChild(backBg);

            Resources.CARD_CACHE[id] = [{
                front: render(front, C.CARD_WIDTH, C.CARD_HEIGHT),
                back: render(back, C.CARD_WIDTH, C.CARD_HEIGHT),
                fullClipRect: fullClipRect,
                effectClipRect: effectClipRect,
            }];
            resource.loaded = true;
        };
    }

    private loadWonder(wonder: API.Wonder) {
        let resource = this.addNewResource();

        resource.load = () => {
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
            let startingEffectContainer = new PIXI.Container();
            startingEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.starting_effects, 'dark'));
            startingEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.starting_effects));
            startingEffectContainer.scale.set(C.WONDER_STARTING_EFFECTS_SCALE);
            let startingEffectsBounds = startingEffectContainer.getBounds();
            startingEffectContainer.position.set(C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffectContainer.x),
                                         C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffectContainer.y));
    
            startingEffectsBounds = startingEffectContainer.getBounds();
            let startingEffectsPaddedBounds = new PIXI.Rectangle(startingEffectsBounds.left - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.top - C.WONDER_STARTING_EFFECTS_PADDING,
                                                                 startingEffectsBounds.width + 2*C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2*C.WONDER_STARTING_EFFECTS_PADDING);
            let startingEffectBanner = Shapes.filledRect(startingEffectsPaddedBounds.x, startingEffectsPaddedBounds.y, startingEffectsPaddedBounds.width, startingEffectsPaddedBounds.height,
                                                         ArtCommon.cardBannerForColor(wonder.starting_effect_color));
            startingEffectBanner.mask = boardBgMask;
            wonderBoard.addChild(startingEffectBanner);
            wonderBoard.addChild(startingEffectContainer);
    
            // Wonder stages    
            let stagesMiddle = wonder.stages.length === 2 ? C.WONDER_STAGE_MIDDLE_2 : C.WONDER_STAGE_MIDDLE_134;
            let stageDX = wonder.stages.length === 4 ? C.WONDER_STAGE_DX_4 : C.WONDER_STAGE_DX_123;
    
            let stageXs = [];
            for (let i = 0; i < wonder.stages.length; i++) {
                stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));
    
                let stageBase = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH/2, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT,
                                                         C.WONDER_STAGE_WIDTH, C.WONDER_STAGE_HEIGHT*2, C.WONDER_STAGE_CORNER_RADIUS, wonder.outline_color);
                stageBase.mask = boardBgMask;
                stageBase.x = stageXs[i];
                wonderBoard.addChild(stageBase);
    
                let stageBg = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH/2 + C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT + C.WONDER_BOARD_BORDER,
                                                       C.WONDER_STAGE_WIDTH - 2*C.WONDER_BOARD_BORDER, C.WONDER_STAGE_HEIGHT*2 - 2*C.WONDER_BOARD_BORDER,
                                                       C.WONDER_STAGE_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
                stageBg.mask = boardBgMask;
                stageBg.x = stageXs[i];
                wonderBoard.addChild(stageBg);
    
                let stageEffectContainer = new PIXI.Container();
                stageEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.stages[i].effects, 'light'));
                stageEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.stages[i].effects));
                stageEffectContainer.scale.set(C.WONDER_STAGE_EFFECT_SCALE);
                stageEffectContainer.position.set(stageXs[i], C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT/2);
                wonderBoard.addChild(stageEffectContainer);
    
                let stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
                if (stageCost) {
                    stageCost.scale.set(C.WONDER_STAGE_COST_SCALE);
                    stageCost.position.set(stageXs[i] - C.WONDER_STAGE_WIDTH/2 + C.WONDER_STAGE_COST_OFFSET_X, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_COST_OFFSET_Y);
    
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
            }
    
            Resources.WONDER_CACHE[`${wonder.name}/${wonder.side}`] = [{
                board: render(wonderBoard, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT),
                startingEffectsRect: startingEffectsPaddedBounds,
                stageXs: stageXs,
            }];
            resource.loaded = true;
        };
    }

    private loadDiscardPile() {
        let resource = this.addNewResource();

        resource.load = () => {
            let discardPile = new PIXI.Container();
            discardPile.addChild(Shapes.filledRoundedRect(0, 0, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT, C.DISCARD_PILE_AREA_CORNER_RADIUS, ArtCommon.discardPileColor));
            discardPile.addChild(Shapes.filledRoundedRect(C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_BORDER,
                                                        C.DISCARD_PILE_AREA_WIDTH - 2*C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_HEIGHT - 2*C.DISCARD_PILE_AREA_BORDER,
                                                        C.DISCARD_PILE_AREA_CORNER_RADIUS - C.DISCARD_PILE_AREA_BORDER, 0x000000));
            discardPile.addChild(Shapes.centeredText(C.DISCARD_PILE_AREA_WIDTH/2, C.DISCARD_PILE_TITLE_Y, C.DISCARD_PILE_TITLE_TEXT, C.DISCARD_PILE_TITLE_SCALE, ArtCommon.discardPileColor));
    
            Resources.DISCARD_PILE = render(discardPile, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
            resource.loaded = true;
        };
    }

    private loadCardList(gamestate: API.GameState) {
        let resource = this.addNewResource();

        resource.load = () => {
            let cardList = new PIXI.Container();

            let maxY = 0;

            for (let age = 1; age <= 3; age++) {
                let x = age * C.CARD_LIST_CARD_DX;
                let y = 0;

                for (let cardInfo of gamestate.deck[age]) {
                    let card = gamestate.cards[cardInfo.id];

                    let cardForList = new PIXI.Container();
                    cardForList.addChild(Shapes.filledRect(-C.CARD_LIST_CARD_WIDTH/2, -C.CARD_LIST_CARD_HEIGHT/2, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT, ArtCommon.cardBannerForColor(card.color)));
                    let effectContainer = new PIXI.Container();
                    effectContainer.addChild(ArtCommon.getShadowForEffects(card.effects, 'dark'));
                    effectContainer.addChild(ArtCommon.getArtForEffects(card.effects));
                    effectContainer.scale.set(C.CARD_LIST_EFFECT_SCALE);
                    cardForList.addChild(effectContainer);

                    if (cardInfo.count > 1) {
                        let text = Shapes.centeredText(-60, 0, `${cardInfo.count} ×`, 0.15, 0xFFFFFF);
                        text.anchor.set(1, 0.5);
                        cardForList.addChild(text);
                    }
            
                    let resourceCost = card.cost?.resources || [];
                    let goldCost = card.cost?.gold || 0;
            
                    if (card.cost) {
                        let currentX = 70;
                        for (let i = 0; i < resourceCost.length; i++) {
                            let resource = ArtCommon.resource(resourceCost[i]);
                            resource.scale.set(0.2);
                            resource.position.set(currentX, 0);
                            cardForList.addChild(resource);
                            currentX += 22;
                        }
            
                        if (goldCost > 0) {
                            let gold = ArtCommon.gold(goldCost);
                            gold.scale.set(0.2);
                            gold.position.set(currentX, 0);
                            cardForList.addChild(gold);
                            currentX += 22;
                        }
                    }

                    cardForList.x = x;
                    cardForList.y = y;
                    cardList.addChild(cardForList);

                    y += C.CARD_LIST_CARD_DY;
                }
                maxY = Math.max(maxY, y);
            }
            
            cardList.y += C.CARD_LIST_CARD_HEIGHT/2;

            Resources.CARD_LIST = render(cardList, C.CARD_LIST_WIDTH, maxY);
            resource.loaded = true;
        };
    }

    private addNewResource() {
        let resource: LoaderResource = {
            load: undefined,
            loaded: false
        };
        this.resources.push(resource);
        return resource;
    }
}