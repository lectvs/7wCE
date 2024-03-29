namespace ArtCommon {
    export const cardBg = 0x000000;
    export const wonderBg = 0x000000;

    export const ageBacks = {
        1: 0xB44C20,
        2: 0xF9FDFE,
        3: 0xDE8C60,
    };

    export const ageBacksHtml = {
        1: '#B44C20',
        2: '#F9FDFE',
        3: '#DE8C60',
    };

    export const goldColor = 0xFBE317;
    export const goldColorHtml = '#FBE317';
    export const discardPileColor = 0x888888;
    export const resourceOuterColor = 0xD89846;
    export const selectionColor = 0xFF0000;
    export const freeColor = 0x00FF00;
    export const affordColor = goldColor;
    export const cantAffordColor = 0xFF0000;

    export function eloDiffColor(diff: number) {
        if (diff > 0) return '#00FF00';
        if (diff < 0) return '#FF0000';
        return '#888888';
    }

    export function domElementForArt(art: PIXI.DisplayObject, scale: number = 1, padding: number = 0) {
        art.scale.set(art.scale.x * scale, art.scale.y * scale);
        let bounds = art.getBounds();
        art.position.set(art.x - bounds.left + padding, art.y - bounds.top + padding);
        return render(art, bounds.width + 2*padding, bounds.height + 2*padding);
    }

    export function cardBannerForColor(color: string) {
        if (color === 'brown') return 0x9F441C;
        if (color === 'grey') return 0xADB1B0;
        if (color === 'red') return 0xD51939;
        if (color === 'green') return 0x4FA53A;
        if (color === 'blue') return 0x2A95D7;
        if (color === 'yellow') return 0xF2AA0C;
        if (color === 'purple') return 0x7054AB;
        if (color === 'black') return 0x444444;
        console.error('Could not find color:', color);
        return 0xFF00FF;
    }

    export function cardBannerForColorHtml(color: string) {
        if (color === 'brown') return '#9F441C';
        if (color === 'grey') return '#ADB1B0';
        if (color === 'red') return '#D51939';
        if (color === 'green') return '#4FA53A';
        if (color === 'blue') return '#2A95D7';
        if (color === 'yellow') return '#F2AA0C';
        if (color === 'purple') return '#7054AB';
        if (color === 'black') return '#444444';
        console.error('Could not find color:', color);
        return '#FF00FF';
    }

    export function getArtForEffects(effects: API.Effect[], padding: number = 8) {
        let effectArts = effects.map(effect => {
            if (effect.type === 'resource') {
                return resource(effect.resource);
            } else if (effect.type === 'multi_resource') {
                return multiResource(effect.resources.split('/'));
            } else if (effect.type === 'shields') {
                return shields(effect.shields);
            } else if (effect.type === 'science') {
                return science(effect.symbol);
            } else if (effect.type === 'points') {
                return victoryPoints(effect.points);
            } else if (effect.type === 'gold') {
                return gold(effect.gold);
            } else if (effect.type === 'trading_post') {
                return tradingPost(effect.direction);
            } else if (effect.type === 'marketplace') {
                return marketplace();
            } else if (effect.type === 'gold_for_cards') {
                return goldForCards(effect.color, effect.gold_per_card);
            } else if (effect.type === 'gold_and_points_for_cards') {
                return goldAndPointsForCards(effect.color, effect.gold_per_card, effect.points_per_card);
            } else if (effect.type === 'gold_and_points_for_stages') {
                return goldAndPointsForStages(effect.gold_per_stage, effect.points_per_stage);
            } else if (effect.type === 'points_for_cards') {
                return pointsForCards(effect.color, effect.points_per_card);
            } else if (effect.type === 'points_for_stages') {
                return pointsForStages(effect.points_per_stage);
            } else if (effect.type === 'points_for_finished_wonder') {
                return pointsForFinishedWonder(effect.points);
            } else if (effect.type === 'points_for_self_cards') {
                return pointsForSelfCards(effect.color, effect.points_per_card);
            } else if (effect.type === 'points_for_negative_tokens') {
                return pointsForNegativeTokens(effect.points_per_token);
            } else if (effect.type === 'multi_science') {
                return multiScience(effect.symbols.split('/'));
            } else if (effect.type === 'play_last_card') {
                return playLastCard();
            } else if (effect.type === 'build_from_discard') {
                return buildFromDiscard();
            } else if (effect.type === 'build_free_first_color') {
                return buildFreeFirstColor();
            } else if (effect.type === 'build_free_first_card') {
                return buildFreeFirstCard();
            } else if (effect.type === 'build_free_last_card') {
                return buildFreeLastCard();
            } else if (effect.type === 'double_trading_post') {
                return tradingPost('both');
            } else if (effect.type === 'copy_guild') {
                return copyGuild();
            } else if (effect.type === 'build_free_once_per_age') {
                return buildFreeOncePerAge();
            } else if (effect.type === 'gold_for_others') {
                return goldForOthers(effect.gold);
            } else if (effect.type === 'gold_for_neighbor') {
                return goldForNeighbor(effect.gold, effect.direction);
            } else if (effect.type === 'waive_wonder_resource_costs') {
                return waiveWonderResourceCosts();
            } else if (effect.type === 'mask') {
                return mask();
            } else if (effect.type === 'unproduced_resource') {
                return unproducedResource();
            } else if (effect.type === 'duplicate_produced_resource') {
                return duplicateProducedResource();
            } else if (effect.type === 'wharf') {
                return wharf(effect.direction);
            } else if (effect.type === 'smugglers_cache') {
                return smugglersCache();
            } else if (effect.type === 'dove') {
                return dove();
            } else if (effect.type === 'gain_military_token') {
                return gainMilitaryToken(effect.token_value);
            } else if (effect.type === 'debt_for_neighbor') {
                return debtForNeighbor(effect.direction);
            } else if (effect.type === 'gold_for_defeat_tokens') {
                return goldForDefeatTokens(effect.gold_per_token);
            } else if (effect.type === 'points_for_victory_tokens') {
                return pointsForVictoryTokens(effect.token_value, effect.points_per_token);
            } else if (effect.type === 'gold_and_points_for_victory_tokens') {
                return goldAndPointsForVictoryTokens(effect.gold_per_token, effect.points_per_token);
            } else if (effect.type === 'discard_defeat_tokens') {
                return discardDefeatTokens();
            } else if (effect.type === 'broken_gold') {
                return brokenGold(effect.gold);
            } else if (effect.type === 'broken_gold_for_stages') {
                return brokenGoldForStages(effect.gold_per_stage);
            } else if (effect.type === 'broken_gold_for_victory_tokens') {
                return brokenGoldForVictoryTokens(effect.gold_per_token);
            } else if (effect.type === 'turret') {
                return turret();
            } else if (effect.type === 'shields_for_defeat_tokens') {
                return shieldsForDefeatTokens();
            } else if (effect.type === 'points_for_shields') {
                return pointsForShields(effect.points_per_shield);
            } else if (effect.type === 'points_for_pairs') {
                return pointsForPairs(effect.points_per_pair);
            } else if (effect.type === 'points_for_triplets') {
                return pointsForTriplets(effect.points_per_triplet);
            } else if (effect.type === 'points_for_chains') {
                return pointsForChains(effect.points_per_chain);
            } else if (effect.type === 'build_free_without_chain') {
                return buildFreeWithoutChain(effect.usages);
            } else if (effect.type === 'eye') {
                return eye();
            } else if (effect.type === 'see_future') {
                return seeFuture();
            }
            console.error('Effect type not found:', effect.type);
            return effectNotFound();
        });

        return combineEffectArt(effectArts, padding);
    }

    export function getShadowForArt(artFactory: () => PIXI.DisplayObject, type: 'light' | 'dark', dx: number = 5, dy: number = 5) {
        let container = new PIXI.Container();
        let shadow = artFactory();
        let silhouetteFilter = new SilhouetteFilter(type);
        shadow.filters = [silhouetteFilter, new PIXI.filters.BlurFilter(16 * resolution, 100)];
        shadow.position.set(dx, dy);
        container.addChild(shadow);
        return container;
    }

    export function getShadowForEffects(effects: API.Effect[], type: 'light' | 'dark', dx: number = 5, dy: number = 5, padding: number = 8) {
        return getShadowForArt(() => ArtCommon.getArtForEffects(effects, padding), type, dx, dy);
    }

    export function getArtForCost(cost: API.Cost) {
        if (!cost) {
            return undefined;
        }

        let costArts = [];
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        for (let r of cost.resources || []) {
            costArts.push(resource(r));
        }

        if (costArts.length === 0) {
            return undefined;
        }

        return combineCostArt(costArts, 16);
    }

    export function getArtForStageCost(cost: API.Cost) {
        let costArts = [];
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        for (let r of cost.resources || []) {
            costArts.push(resource(r));
        }

        return combineStageCostArt(costArts, 16);
    }

    export function getArtForStageCopy(stage: string, direction: string) {
        let container = new PIXI.Container();
        if (stage === 'first') {
            container.addChild(copyStageFirst());
        } else if (stage === 'second') {
            container.addChild(copyStageSecond());
        } else if (stage === 'last') {
            container.addChild(copyStageLast());
        } else {
            console.error('Stage not found:', stage);
            container.addChild(effectNotFound());
        }

        if (direction === 'pos') {
            let arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(100, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            let arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-100, 0);
            container.addChild(arrow);
        }

        let parentContainer = new PIXI.Container();
        parentContainer.addChild(container);

        let lb = container.getLocalBounds();
        container.x = -lb.x - lb.width/2;

        return parentContainer;
    }

    export function getShadowForStageCopy(stage: string, direction: string, type: 'light' | 'dark', dx: number = 5, dy: number = 5) {
        return getShadowForArt(() => ArtCommon.getArtForStageCopy(stage, direction), type, dx, dy);
    }

    
    /* EFFECTS */

    export function resource(resource: string) {
        if (resource === 'wood') return wood();
        if (resource === 'stone') return stone();
        if (resource === 'ore') return ore();
        if (resource === 'clay') return clay();
        if (resource === 'glass') return glass();
        if (resource === 'press') return press();
        if (resource === 'loom') return loom();
        console.error('Resource not found:', resource);
        return effectNotFound();
    }

    export function multiResource(resources: string[]) {
        let resourceArts = resources.map(r => resource(r));

        for (let i = resourceArts.length-1; i >= 1; i--) {
            resourceArts.splice(i, 0, slash());
        }

        for (let art of resourceArts) {
            if (resources.length === 3) {
                art.scale.set(0.8);
            } else if (resources.length >= 4) {
                art.scale.set(0.7);
            }
        }

        return combineEffectArt(resourceArts, 4);
    }

    export function shield() {
        let sprite = new PIXI.Sprite(PIXI.Texture.from('shield'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
    }

    export function science(symbol: string) {
        if (symbol === 'gear') return gear();
        if (symbol === 'tablet') return tablet();
        if (symbol === 'compass') return compass();
        if (symbol === 'astrolabe') return astrolabe();
        console.error('Science symbol not found:', symbol);
        return effectNotFound();
    }

    export function multiScience(symbols: string[]) {
        let symbolArts = symbols.map(s => science(s));

        for (let i = symbolArts.length-1; i >= 1; i--) {
            symbolArts.splice(i, 0, slash());
        }

        for (let art of symbolArts) {
            art.scale.set(0.8);
        }

        return combineEffectArt(symbolArts, 4);
    }

    export function victoryPoints(points: number) {
        let container = new PIXI.Container();
        container.addChild(pointsWreath());
        let text = Shapes.centeredText(0, 0, `${points}`, 0.8, 0x000000);
        if (`${points}`.length > 1) {
            text.scale.set(0.65);
        }
        container.addChild(text);
        return container;
    }

    export function gold(gold: number) {
        let container = new PIXI.Container();
        container.addChild(goldCoin());
        let text = Shapes.centeredText(0, 0, `${gold}`, 0.8, 0x000000)
        if (`${gold}`.length > 1) {
            text.scale.set(0.65);
        }
        container.addChild(text);
        return container;
    }

    export function tradingPost(direction: string) {
        let container = new PIXI.Container();
        let coin = gold(1);
        coin.scale.set(0.7);
        coin.position.set(0, -27);
        container.addChild(coin);
        let woodArt = wood();
        woodArt.scale.set(0.5);
        let stoneArt = stone();
        stoneArt.scale.set(0.5);
        let oreArt = ore();
        oreArt.scale.set(0.5);
        let clayArt = clay();
        clayArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-120, -5, 240, 60, 30, cardBannerForColor('brown')));
        let resources = combineEffectArt([woodArt, stoneArt, oreArt, clayArt], 8);
        resources.position.set(0, 25);
        container.addChild(resources);
        if (direction === 'pos' || direction === 'both') {
            let arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(150, 25);
            container.addChild(arrow);
        }
        if (direction === 'neg' || direction === 'both') {
            let arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-150, 25);
            container.addChild(arrow);
        }
        return container;
    }

    export function marketplace() {
        let container = new PIXI.Container();
        let coin = gold(1);
        coin.scale.set(0.7);
        coin.position.set(0, -27);
        container.addChild(coin);
        let glassArt = glass();
        glassArt.scale.set(0.5);
        let loomArt = loom();
        loomArt.scale.set(0.5);
        let pressArt = press();
        pressArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-90, -5, 180, 60, 30, cardBannerForColor('grey')));
        let resources = combineEffectArt([glassArt, loomArt, pressArt], 8);
        resources.position.set(0, 25);
        container.addChild(resources);
        let arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(120, 25);
        container.addChild(arrowR);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-120, 25);
        container.addChild(arrowL);
        return container;
    }

    export function goldForCards(color: string, goldPerCard: number) {
        let container = new PIXI.Container();
        let card = cardGoldPoints(color, goldPerCard, 0);
        card.scale.set(0.7);
        card.position.set(0, -10);
        container.addChild(card);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 5);
        container.addChild(arrowL);
        let arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 5);
        container.addChild(arrowR);
        let arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 45);
        container.addChild(arrowD);
        return container;
    }

    export function goldAndPointsForCards(color: string, goldPerCard: number, pointsPerCard: number) {
        let container = new PIXI.Container();
        let card = cardGoldPoints(color, goldPerCard, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        return container;
    }

    export function goldAndPointsForStages(goldAmount: number, pointsAmount: number) {
        let container = new PIXI.Container();
        container.addChild(pyramidStages());
        let goldCoin = gold(goldAmount);
        goldCoin.scale.set(0.48);
        goldCoin.position.set(-60, 30);
        container.addChild(goldCoin);
        let pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(60, 30);
        container.addChild(pointsWreath);
        return container;
    }

    export function pointsForCards(color: string, pointsPerCard: number) {
        let container = new PIXI.Container();
        let card = cardGoldPoints(color, 0, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-85, 20);
        container.addChild(arrowL);
        let arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(85, 20);
        container.addChild(arrowR);
        return container;
    }

    export function pointsForStages(pointsAmount: number) {
        let container = new PIXI.Container();
        let pyramid = pyramidStages();
        pyramid.position.set(0, -15);
        pyramid.scale.set(0.85);
        container.addChild(pyramid);
        let pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(36, 10);
        container.addChild(pointsWreath);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-80, 10);
        container.addChild(arrowL);
        let arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(80, 10);
        container.addChild(arrowR);
        let arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 45);
        container.addChild(arrowD);
        return container;
    }

    export function pointsForFinishedWonder(pointsAmount: number) {
        let container = new PIXI.Container();
        let pyramid = pyramidFull();
        container.addChild(pyramid);
        let pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(40, 30);
        container.addChild(pointsWreath);
        return container;
    }

    export function pointsForSelfCards(color: string, pointsPerCard: number) {
        let container = new PIXI.Container();
        let card = cardGoldPoints(color, 0, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        return container;
    }

    export function pointsForNegativeTokens(pointsPerToken: number) {
        let container = new PIXI.Container();
        let token = militaryToken(-1);
        token.scale.set(0.8);
        container.addChild(token);
        let pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(36, 24);
        container.addChild(pointsWreath);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-85, 20);
        container.addChild(arrowL);
        let arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(85, 20);
        container.addChild(arrowR);
        return container;
    }

    export function playLastCard() {
        let container = new PIXI.Container();
        let card1 = cardForEffect(0x686B6A);
        card1.position.set(-35, 0);
        card1.angle = -25;
        container.addChild(card1);
        let check1 = checkMark();
        check1.position.set(-30, -15);
        check1.scale.set(0.7);
        container.addChild(check1);
        let card2 = cardForEffect(0x686B6A);
        card2.position.set(35, 0);
        card2.angle = 25;
        container.addChild(card2);
        let check2 = checkMark();
        check2.position.set(45, -15);
        check2.scale.set(0.7);
        container.addChild(check2);
        return container;
    }

    export function buildFromDiscard() {
        let container = new PIXI.Container();
        let backCard = cardForEffect(0x444444);
        backCard.position.set(-15, 0);
        backCard.angle = -20;
        backCard.alpha = 0.8;
        container.addChild(backCard);
        let frontCard = cardForEffect(ArtCommon.cardBannerForColor("grey"));
        container.addChild(frontCard);
        let cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }

    export function buildFreeFirstColor() {
        let container = new PIXI.Container();
        container.addChild(rainbowCard());
        let cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }

    export function buildFreeFirstCard() {
        let container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        container.addChild(Shapes.centeredText(0, 14, '\u03B1', 0.56, 0xFFFFFF));
        let cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }

    export function buildFreeLastCard() {
        let container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        container.addChild(Shapes.centeredText(0, 16, '\u03A9', 0.56, 0xFFFFFF));
        let cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }

    export function buildFreeOncePerAge() {
        let container = new PIXI.Container();
        container.addChild(cardForEffect(0xDDDDDD));
        let cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }

    export function copyGuild() {
        let container = new PIXI.Container();
        let card = cardForEffect(ArtCommon.cardBannerForColor('purple'));
        card.position.set(-80, 0);
        container.addChild(card);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.6);
        arrowL.position.set(0, 0);
        container.addChild(arrowL);
        let slashmark = slash();
        slashmark.position.set(50, 0);
        container.addChild(slashmark);
        let arrowR = arrowRight();
        arrowR.scale.set(0.6);
        arrowR.position.set(100, 0);
        container.addChild(arrowR);
        return container;
    }

    export function goldForOthers(amount: number) {
        let container = new PIXI.Container();
        let goldCoin = gold(amount);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(0, 20);
        container.addChild(goldCoin);

        for (let i = -1; i <= 1; i++) {
            let arrow = arrowRight();
            arrow.scale.set(0.3);
            arrow.angle = -90 + 60*i;
            arrow.position.set(50*Math.cos(arrow.rotation), 20 + 50*Math.sin(arrow.rotation));
            container.addChild(arrow);
        }

        return container;
    }

    export function goldForNeighbor(amount: number, direction: string) {
        let container = new PIXI.Container();
        let goldCoin = gold(amount);
        goldCoin.scale.set(0.6);
        container.addChild(goldCoin);

        if (direction === 'pos') {
            let arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(60, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            let arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-60, 0);
            container.addChild(arrow);
        }

        return container;
    }

    export function waiveWonderResourceCosts() {
        let container = new PIXI.Container();
        let pyramid = pyramidStages();
        container.addChild(pyramid);
        let cross = X(0xFF0000);
        cross.scale.set(0.4);
        cross.position.set(-40, 20);
        container.addChild(cross);
        return container;
    }

    export function mask() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-130, -30, 260, 80, 40, cardBannerForColor('green')));
        let resources = combineEffectArt([compass(), slash(), tablet(), slash(), gear()], 8);
        resources.scale.set(0.65);
        resources.position.set(0, 10);
        container.addChild(resources);
        let mask = new PIXI.Sprite(PIXI.Texture.from('mask'));
        mask.anchor.set(0.5, 0.5);
        mask.scale.set(0.8);
        mask.position.set(0, -5);
        container.addChild(mask);
        let arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(160, 10);
        container.addChild(arrowR);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-160, 10);
        container.addChild(arrowL);
        return container;
    }

    export function unproducedResource() {
        let container = new PIXI.Container();
        let unproduced = new PIXI.Sprite(PIXI.Texture.from('unproduced_resource'));
        unproduced.anchor.set(0.5, 0.5);
        unproduced.scale.set(0.6);
        unproduced.position.set(-80, 0);
        container.addChild(unproduced);
        let arrow = arrowRight();
        arrow.scale.set(0.4);
        container.addChild(arrow);
        let resource = doubleResourceBack();
        resource.scale.set(0.9);
        resource.position.set(80, 0);
        container.addChild(resource);
        return container;
    }

    export function duplicateProducedResource() {
        let container = new PIXI.Container();
        let produced = doubleResourceBack();
        produced.scale.set(0.8);
        produced.position.set(-120, 0);
        container.addChild(produced);
        let arrow = arrowRight();
        arrow.scale.set(0.4);
        arrow.position.set(-40, 0);
        container.addChild(arrow);
        let resources = combineEffectArt([doubleResourceBack(), doubleResourceBack()], 8);
        resources.scale.set(0.8);
        resources.position.set(76, 0);
        container.addChild(resources);
        return container;
    }

    export function wharf(direction: string) {
        let container = new PIXI.Container();
        let coin = goldCoin();
        coin.scale.set(0.8);
        container.addChild(coin);
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0x000000));
        container.addChild(Shapes.centeredText(2, 0, `1`, 0.6, 0x000000));
        if (direction === 'pos') {
            let arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(70, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            let arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-70, 0);
            container.addChild(arrow);
        }
        return container;
    }

    export function smugglersCache() {
        let container = new PIXI.Container();
        let resource = doubleResourceBack();
        resource.scale.set(0.5);
        resource.position.set(0, 15);
        container.addChild(resource);
        let coin = goldCoin();
        coin.scale.set(0.6);
        coin.position.set(0, -15);
        container.addChild(coin);
        container.addChild(Shapes.filledRect(-24, -15, 12, 6, 0x000000));
        container.addChild(Shapes.centeredText(2, -16, `1`, 0.5, 0x000000));
        let arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 15);
        container.addChild(arrowR);
        let arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 15);
        container.addChild(arrowL);
        return container;
    }

    export function dove() {
        let sprite = new PIXI.Sprite(PIXI.Texture.from('dove'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
    }

    export function gainMilitaryToken(value: number) {
        return militaryToken(value);
    }

    export function debtForNeighbor(direction: string) {
        let container = new PIXI.Container();
        let token = debtToken();
        token.scale.set(0.8);
        container.addChild(token);
        if (direction === 'pos') {
            let arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(70, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            let arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-70, 0);
            container.addChild(arrow);
        }
        return container;
    }

    export function goldForDefeatTokens(goldPerToken: number) {
        let container = new PIXI.Container();
        let token = militaryTokenNegative(1);
        token.scale.set(0.9);
        container.addChild(token);
        let goldCoin = gold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }

    export function pointsForVictoryTokens(value: number, pointsPerToken: number) {
        let container = new PIXI.Container();
        let token = militaryTokenPositive(value);
        token.scale.set(0.9);
        container.addChild(token);
        let pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }

    export function goldAndPointsForVictoryTokens(goldPerToken: number, pointsPerToken: number) {
        let container = new PIXI.Container();
        container.addChild(militaryTokenPositiveBlank());
        let goldCoin = gold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        let pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }

    export function discardDefeatTokens() {
        let container = new PIXI.Container();
        let token = militaryTokenNegative(1);
        token.scale.set(0.9);
        container.addChild(token);
        let crackk = crack();
        container.addChild(crackk);
        let crackMask = Shapes.filledOctagon(0, 0, 50, 0xFFFFFF);
        crackMask.scale.set(0.9);
        container.addChild(crackMask);
        crackk.mask = crackMask;
        return container;
    }

    export function brokenGold(gold: number) {
        let container = new PIXI.Container();
        container.addChild(brokenGoldBlank());
        container.addChild(Shapes.centeredText(0, 4, `${gold}`, 1, 0xFF0044));
        return container;
    }

    export function brokenGoldBlank() {
        let container = new PIXI.Container();
        container.addChild(goldCoin());
        let crackk = crack();
        container.addChild(crackk);
        let crackMask = Shapes.filledCircle(0, 0, 50, 0xFFFFFF);
        container.addChild(crackMask);
        crackk.mask = crackMask;
        return container;
    }

    export function brokenGoldForStages(goldPerStage: number) {
        let container = new PIXI.Container();
        container.addChild(pyramidStages());
        let goldCoin = brokenGold(goldPerStage);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }

    export function brokenGoldForVictoryTokens(goldPerToken: number) {
        let container = new PIXI.Container();
        let token = militaryTokenPositiveBlank();
        token.scale.set(0.9);
        container.addChild(token);
        let goldCoin = brokenGold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }

    export function shields(shields: number) {
        if (shields === 5) {
            let dx = 60, dy = 25;
            let container = new PIXI.Container();
            let shields = new PIXI.Container();
            shields.addChild(shield()).position.set(-dx, -dy);
            shields.addChild(shield()).position.set(dx, -dy);
            shields.addChild(shield()).position.set(-2*dx, dy);
            shields.addChild(shield()).position.set(0, dy);
            shields.addChild(shield()).position.set(2*dx, dy);
            shields.scale.set(2/3);
            container.addChild(shields);
            return container;
        }
        return combineEffectArt(range(1, shields).map(i => shield()), 8);
    }

    export function shieldsForDefeatTokens() {
        let container = new PIXI.Container();
        let token = militaryTokenNegative(1);
        token.scale.set(0.9);
        token.position.set(0, -5);
        container.addChild(token);
        let shieldArt = shield();
        shieldArt.scale.set(0.4);
        shieldArt.position.set(0, 30);
        container.addChild(shieldArt);
        return container;
    }

    export function pointsForShields(pointsPerShield: number) {
        let container = new PIXI.Container();
        let shieldArt = shield();
        shieldArt.scale.set(0.7);
        shieldArt.position.set(0, -5);
        container.addChild(shieldArt);
        let pointsWreath = victoryPoints(pointsPerShield);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }

    export function pointsForPairs(pointsPerPair: number) {
        let container = new PIXI.Container();
        let cardContainer = new PIXI.Container();
        let o = 5;
        cardContainer.addChild(Shapes.filledRoundedRect(-85, -60, 170, 120, 10, 0xFFFFFF));
        cardContainer.addChild(Shapes.filledRoundedRect(-85+o, -60+o, 170-2*o, 120-2*o, 10-o, 0x000000));
        let card1 = rainbowCard();
        card1.scale.set(0.9, 1);
        card1.position.set(-40, 0);
        let card2 = rainbowCard();
        card2.scale.set(0.9, 1);
        card2.position.set(40, 0);
        cardContainer.addChild(card1);
        cardContainer.addChild(card2);
        cardContainer.position.set(0, -5);
        container.addChild(cardContainer);
        let pointsWreath = victoryPoints(pointsPerPair);
        pointsWreath.scale.set(0.7);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }

    export function pointsForTriplets(pointsPerTriplet: number) {
        let container = new PIXI.Container();
        let cardContainer = new PIXI.Container();
        let o = 5;
        cardContainer.addChild(Shapes.filledRoundedRect(-125, -60, 250, 120, 10, 0xFFFFFF));
        cardContainer.addChild(Shapes.filledRoundedRect(-125+o, -60+o, 250-2*o, 120-2*o, 10-o, 0x000000));
        let card1 = rainbowCard();
        card1.scale.set(0.9, 1);
        card1.position.set(-80, 0);
        let card2 = rainbowCard();
        card2.scale.set(0.9, 1);
        let card3 = rainbowCard();
        card3.scale.set(0.9, 1);
        card3.position.set(80, 0);
        cardContainer.addChild(card1);
        cardContainer.addChild(card2);
        cardContainer.addChild(card3);
        cardContainer.position.set(0, -5);
        container.addChild(cardContainer);
        let pointsWreath = victoryPoints(pointsPerTriplet);
        pointsWreath.scale.set(0.7);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }

    export function pointsForChains(pointsPerChain: number) {
        let container = new PIXI.Container();
        container.addChild(chainedCards());
        let pointsWreath = victoryPoints(pointsPerChain);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }

    export function buildFreeWithoutChain(usages: number) {
        let container = new PIXI.Container();
        container.addChild(chainedCards());
        let arrow = arrowRight();
        arrow.scale.set(0.65);
        arrow.position.set(0, 30);
        container.addChild(arrow);
        container.addChild(Shapes.centeredText(-5, 30, `${usages}x`, 0.25, 0x000000));
        let cross1 = X(0xFF0000);
        cross1.scale.set(0.8);
        cross1.position.set(-80, 0);
        container.addChild(cross1);
        let cross2 = X(0xFF0000);
        cross2.scale.set(0.3);
        cross2.position.set(57, -23);
        container.addChild(cross2);
        return container;
    }

    export function eye() {
        let sprite = new PIXI.Sprite(PIXI.Texture.from('eye'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
    }

    export function seeFuture() {
        let container = new PIXI.Container();
        let background = Shapes.filledRect(-52.5, -50, 105, 100, 0x000000);
        background.alpha = 0.01;
        container.addChild(background);
        let card1 = cardForEffect(cardBannerForColor('purple'));
        card1.scale.set(0.9);
        card1.position.set(-10, -10);
        let card2 = cardForEffect(cardBannerForColor('black'));
        card2.scale.set(0.9);
        card2.position.set(10, 10);
        container.addChild(card1);
        container.addChild(card2);
        let eyeArt = eye();
        eyeArt.scale.set(0.6);
        eyeArt.position.set(0, 0);
        container.addChild(eyeArt);
        return container;
    }

    /* COMPONENTS */

    export function wood() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0x6D9F2F));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('wood'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }

    export function stone() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0xC3BBBE));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('stone'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }

    export function ore() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0x404340));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('ore'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.4);
        container.addChild(sprite);
        return container;
    }

    export function clay() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0xE35B1E));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('clay'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }

    export function glass() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0x36A1D6));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('glass'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.45);
        container.addChild(sprite);
        return container;
    }

    export function press() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0xD9A86B));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('press'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.4);
        container.addChild(sprite);
        return container;
    }

    export function loom() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0xA5186A));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('loom'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }

    export function gear() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('gear'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }

    export function tablet() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('tablet'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }

    export function compass() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('compass'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }

    export function astrolabe() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('astrolabe'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }

    export function cardGoldPoints(color: string, goldAmount: number, pointsAmount: number) {
        let container = new PIXI.Container();
        container.addChild(cardForEffect(ArtCommon.cardBannerForColor(color)));
        if (goldAmount > 0) {
            let goldCoin = gold(goldAmount);
            goldCoin.scale.set(0.6);
            goldCoin.position.set(-45, 30);
            container.addChild(goldCoin);
        }
        if (pointsAmount > 0) {
            let pointsWreath = victoryPoints(pointsAmount);
            pointsWreath.scale.set(0.6);
            pointsWreath.position.set(45, 30);
            container.addChild(pointsWreath);
        }
        return container;
    }

    export function cardForEffect(color: number) {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, 0xFFFFFF));
        container.addChild(Shapes.filledRoundedRect(-31, -46, 62, 92, 4, color));
        return container;
    }

    export function rainbowCard() {
        let container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        let colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple'];
        for (let i = 0; i < colors.length; i++) {
            container.addChild(Shapes.filledRect(-31 + 62/7*i, -46, 62/7, 92, ArtCommon.cardBannerForColor(colors[i])));
        }
        return container;
    }

    export function chainedCards() {
        let container = new PIXI.Container();

        let card1 = cardForEffect(0x686B6A);
        card1.position.set(-80, 0);
        card1.addChild(Shapes.filledRect(15, -46, 16, 46, 0x343630));
        let card2 = cardForEffect(0x686B6A);
        card2.position.set(80, 0);
        card2.addChild(Shapes.filledRect(-31, -46, 16, 46, 0x343630));
        container.addChild(card1);
        container.addChild(card2);

        let chain = chainlink();
        chain.scale.set(0.55);
        chain.position.set(0, -20);
        container.addChild(chain);

        return container;
    }

    export function pyramidFull() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('pyramid_full'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function pyramidStages() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('pyramid_stages'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function copyStageFirst() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_first'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function copyStageSecond() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_second'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function copyStageLast() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_last'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function goldCoin() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('goldcoin'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function pointsWreath() {
        let container = new PIXI.Container();
        let sprite = new PIXI.Sprite(PIXI.Texture.from('pointswreath'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }

    export function militaryToken(amount: number) {
        if (amount < 0) {
            return militaryTokenNegative(-amount);
        }
        return militaryTokenPositive(amount);
    }

    export function militaryTokenPositive(amount: number) {
        let container = new PIXI.Container();
        container.addChild(militaryTokenPositiveBlank());
        let wreath = pointsWreath();
        wreath.scale.set(0.465);
        wreath.position.set(0, 15.5);
        container.addChild(wreath);
        container.addChild(Shapes.centeredText(0, 15.5, `${amount}`, 0.3875, 0x000000));
        return container;
    }

    export function militaryTokenPositiveBlank() {
        let container = new PIXI.Container();
        let innerContainer = new PIXI.Container();
        innerContainer.addChild(Shapes.filledRect(-50, -20, 100, 80, 0xCC1D17));
        let sprite = new PIXI.Sprite(PIXI.Texture.from('falcon'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        sprite.position.set(-1, -20);
        innerContainer.addChild(sprite);
        innerContainer.scale.set(0.775);
        container.addChild(innerContainer);
        return container;
    }

    export function militaryTokenNegative(amount: number) {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, 0xCC1D17));
        let wreath = pointsWreath();
        wreath.scale.set(0.7);
        container.addChild(wreath);
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0xCC1D17));
        container.addChild(Shapes.centeredText(2, 0, `${amount}`, 0.6, 0xCC1D17));
        return container;
    }

    export function debtToken() {
        let container = new PIXI.Container();
        container.addChild(debtTokenBlank());
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0xCC1D17));
        container.addChild(Shapes.centeredText(2, 0, `1`, 0.6, 0xCC1D17));
        return container;
    }

    export function debtTokenBlank() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledRect(-50, -50, 100, 100, 0x444444));
        let wreath = pointsWreath();
        wreath.scale.set(0.7);
        container.addChild(wreath);
        return container;
    }

    export function doubleResourceBack() {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, cardBannerForColor('brown')));
        container.addChild(Shapes.filledPolygon(0, 0, [0, -50, 22, -50, 50, -22, 50, 22, 22, 50, 0, 50], cardBannerForColor('grey')));
        return container;
    }

    export function crack() {
        let crack = new PIXI.Sprite(PIXI.Texture.from('crack'));
        crack.anchor.set(0.5, 0.5);
        crack.scale.set(0.7);
        return crack;
    }

    export function turret() {
        let turret = new PIXI.Sprite(PIXI.Texture.from('turret'));
        turret.anchor.set(0.5, 0.5);
        turret.scale.set(0.7);
        return turret;
    }

    export function chainlink() {
        let turret = new PIXI.Sprite(PIXI.Texture.from('chainlink'));
        turret.anchor.set(0.5, 0.5);
        turret.scale.set(0.7);
        return turret;
    }

    export function payment(amount: number, canChooseFree: boolean) {
        let errorColor = canChooseFree ? freeColor : cantAffordColor;
        let costColor = canChooseFree ? freeColor : affordColor;
        if (!isFinite(amount)) {
            return X(errorColor);
        }
        
        if (amount === 0) {
            return checkMark();
        }

        let cost = new PIXI.Container();
        cost.addChild(Shapes.filledCircle(0, 0, 50, costColor));
        let goldText = Shapes.centeredText(-70, 0, `${amount}`, 1, costColor);
        goldText.anchor.set(1, 0.5);
        cost.addChild(goldText);
        return cost;
    }

    export function checkMark() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(freeColor, 1);
        graphics.drawPolygon([ -38, -10, -50, 0, -15, 50, 50, -40, 35, -50, -15, 25 ]);
        graphics.endFill();
        return graphics;
    }

    export function X(color: number) {
        let width = 100;
        let thickness = 20;
        
        let container = new PIXI.Container();
        let barHeight = width * Math.SQRT2;
        let rect1 = Shapes.filledRoundedRect(-thickness/2, -barHeight/2, thickness, barHeight, thickness/4, color);
        rect1.angle = 45;
        let rect2 = Shapes.filledRoundedRect(-thickness/2, -barHeight/2, thickness, barHeight, thickness/4, color);
        rect2.angle = -45;
        container.addChild(rect1);
        container.addChild(rect2);
        return container;
    }

    export function endScreenFinanceMarker() {
        return combineEffectArt([goldCoin(), slash(), debtToken()], 8);
    }

    function slash() {
        let container = new PIXI.Container();
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawRect(-4, -20, 8, 40);
        graphics.endFill();
        graphics.angle = 20;
        container.addChild(graphics);
        return container;
    }

    function arrowLeft() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ 45, -40, 35, 0, 45, 40, -45, 0 ]);
        graphics.endFill();
        return graphics;
    }

    function arrowRight() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ -45, -40, -35, 0, -45, 40, 45, 0 ]);
        graphics.endFill();
        return graphics;
    }

    function arrowDown() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ -40, -35, 0, -25, 40, -35, 0, 35 ]);
        graphics.endFill();
        return graphics;
    }

    function combineEffectArt(arts: PIXI.DisplayObject[], padding: number) {
        let totalArtWidth = sum(arts, art => art.getBounds().width) + padding * (arts.length - 1);

        let container = new PIXI.Container();
        let x = -totalArtWidth/2;
        for (let art of arts) {
            let width = art.getBounds().width;
            art.x = x + width/2;
            container.addChild(art);
            x += width + padding;
        }

        return container;
    }

    function combineCostArt(arts: PIXI.DisplayObject[], padding: number) {
        let container = new PIXI.Container();
        let y = 0;
        for (let art of arts) {
            let height = art.getBounds().height;
            art.y = y + height/2;
            container.addChild(art);
            y += height + padding;
        }

        return container;
    }

    function combineStageCostArt(arts: PIXI.DisplayObject[], padding: number): PIXI.Container {
        if (arts.length >= 4) {
            if (arts.length % 2 === 0) {
                let left = combineStageCostArt(arts.slice(0, arts.length/2), padding);
                let right = combineStageCostArt(arts.slice(arts.length/2, arts.length), padding);
                return combineEffectArt([left, right], padding);
            } else {
                let first = combineStageCostArt(arts.slice(0, arts.length-1), padding);
                first.pivot.set(0, first.height/2);
                let last = arts[arts.length-1];
                return combineStageCostArt([first, last], padding);
            }
        }

        let container = new PIXI.Container();
        let y = 0;
        for (let art of arts) {
            let height = art.getBounds().height;
            art.y = y + height/2;
            container.addChild(art);
            y += height + padding;
        }

        return container;
    }

    function effectNotFound() {
        return Shapes.filledRect(-50, -50, 100, 100, 0xFF00FF);
    }
}