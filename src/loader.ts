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
        for (let player of Main.gamestate.players) {
            this.loadWonder(player);
        }

        // Other
        this.loadDiscardPile();
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

            let effectContainer = ArtCommon.getArtForEffects(card.effects);
            effectContainer.position.set(C.CARD_WIDTH/2, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2);
            effectContainer.scale.set(C.CARD_EFFECT_SCALE);
            front.addChild(effectContainer);

            let fullClipRect = new PIXI.Rectangle(0, -C.CARD_PAYMENT_HEIGHT, C.CARD_WIDTH, C.CARD_HEIGHT + C.CARD_PAYMENT_HEIGHT);
            let effectBounds = effectContainer.getBounds();
            let effectHalfWidth = Math.max(C.CARD_WIDTH/2 - effectBounds.left, effectBounds.right - C.CARD_WIDTH/2);
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

    private loadWonder(player: string) {
        let resource = this.addNewResource();

        resource.load = () => {
            let wonder = Main.gamestate.wonders[player];
    
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
    
                let stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
                stageEffects.scale.set(C.WONDER_STAGE_EFFECT_SCALE);
                stageEffects.position.set(stageXs[i], C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT/2);
                wonderBoard.addChild(stageEffects);
    
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
    
            Resources.WONDER_CACHE[player] = [{
                board: render(wonderBoard, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT),
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

    private addNewResource() {
        let resource: LoaderResource = {
            load: undefined,
            loaded: false
        };
        this.resources.push(resource);
        return resource;
    }
}