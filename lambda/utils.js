exports.batchArray = (array, batchSize) => {
    let result = [];
    let currentBatch = [];
    for (let i = 0; i < array.length; i++) {
        currentBatch.push(array[i]);
        if (currentBatch.length >= batchSize) {
            result.push(currentBatch);
            currentBatch = [];
        }
    }
    if (currentBatch.length > 0) {
        result.push(currentBatch);
    }
    return result;
}

exports.cloneArray = (array) => {
    return array ? array.map(e => e) : undefined;
}

exports.indexOfArray = (array, arrayElement) => {
    if (!array || array.length === 0) return -1;
    for (let i = 0; i < array.length; i++) {
        if (exports.equalsArray(array[i], arrayElement)) return i;
    }
    return -1;
}

exports.currentTime = () => {
    return Math.round(Date.now()/1000);
}

exports.equalsArray = (array1, array2) => {
    if (!array1 && !array2) return true;
    if (!array1 || !array2) return false;
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}

// Random integer from min to max, inclusive.
exports.randElement = (array) => {
    return array[exports.randInt(0, array.length-1)];
}

// Random integer from min to max, inclusive.
exports.randInt = (min, max) => {
    return min + Math.floor(Math.random() * (max+1 - min));
}

// Range list from min to max, inclusive.
exports.range = (min, max) => {
    let result = [];
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
}

exports.shuffled = (array) => {
    let pool = array.map(e => e);
    let result = [];
    while (pool.length > 0) {
        result.push(pool.splice(exports.randInt(0, pool.length-1), 1)[0]);
    }
    return result;
}

exports.uid = () => {
    let chars = '0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += exports.randElement(chars);
    }
    return result;
}

/* USERS */
exports.validatePasswordHash = async (dynamo, username, password_hash) => {
    let ddbresult = await dynamo.get({ TableName: '7wCE_users', Key: { username } }).promise();
    if (!ddbresult.Item) {
        // Users not in the DDB do not have passwords to validate.
        return true;
    }
    
    return ddbresult.Item.password_hash === password_hash;
}

/* GAME */
exports.getNeighbors = (gamestate, player) => {
    let neg_index = gamestate.players.indexOf(player)-1;
    if (neg_index < 0) neg_index += gamestate.players.length;

    let pos_index = gamestate.players.indexOf(player)+1;
    if (pos_index >= gamestate.players.length) pos_index -= gamestate.players.length;
    
    return [gamestate.players[neg_index], gamestate.players[pos_index]];
}

exports.getScoreResultForElo = (gamestate, player1, player2) => {
    let points1 = exports.computePointsDistribution(gamestate, player1).total;
    let points2 = exports.computePointsDistribution(gamestate, player2).total;
    let gold1 = gamestate.playerData[player1].gold;
    let gold2 = gamestate.playerData[player2].gold;
    if (points1 < points2) return 0;
    if (points1 > points2) return 1;
    if (gold1 < gold2) return 0;
    if (gold1 > gold2) return 1;
    return 0.5;
}

exports.computeEloDiff = (elo1, elo2, result) => {
    let r1 = 1 / (1 + Math.pow(10, ((elo2 - elo1)/391)));
    return 20*(result - r1);
}

/* WONDER */
exports.computePointsDistribution = (gamestate, player) => {
    let points = {
        conflict: 0,
        finance: 0,
        wonder: 0,
        civilian: 0,
        commerce: 0,
        guild: 0,
        science: 0,
        black: 0,
        total: 0
    };
    
    let wonderEffects = [...exports.getAllStartingEffects(gamestate, player), ...exports.getAllWonderEffects(gamestate, player)];
    let playerData = gamestate.playerData[player];
    
    for (let tokenValue of playerData.militaryTokens) {
        points.conflict += tokenValue;
    }
    
    points.finance += Math.floor(playerData.gold / 3);
    points.finance -= playerData.debtTokens;
    
    for (let effect of wonderEffects) {
        points.wonder += computePointsForEffect(gamestate, player, effect);
    }
    
    for (let cardId of playerData.playedCards) {
        let card = gamestate.cards[cardId];
        for (let effect of card.effects) {
            let pointValue = computePointsForEffect(gamestate, player, effect);
            if (card.color === 'blue') {
                points.civilian += pointValue;
            } else if (card.color === 'yellow') {
                points.commerce += pointValue;
            } else if (card.color === 'purple') {
                points.guild += pointValue;
            } else if (card.color === 'black') {
                points.black += pointValue;
            }
        }
    }
    
    points.science += computeSciencePoints(gamestate, player);
    
    points.total = points.conflict + points.finance + points.wonder + points.civilian + points.commerce + points.guild + points.science + points.black;
    
    return points;
}

exports.computePointsForCard = (gamestate, player, card) => {
    let result = 0;
    for (let effect of card.effects) {
        result += computePointsForEffect(gamestate, player, effect);
    }
    return result;
}

function computePointsForEffect(gamestate, player, effect) {
    if (effect.type === 'points') {
        return effect.points;
    } else if (effect.type === 'gold_and_points_for_cards') {
        let cards = exports.getCardsOfColor(gamestate, player, effect.color);
        return effect.points_per_card * cards;
    } else if (effect.type === 'gold_and_points_for_stages') {
        let stages = gamestate.playerData[player].stagesBuilt.length;
        return effect.points_per_stage * stages;
    } else if (effect.type === 'points_for_cards') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        let negCards = exports.getCardsOfColor(gamestate, negPlayer, effect.color);
        let posCards = exports.getCardsOfColor(gamestate, posPlayer, effect.color);
        return effect.points_per_card * (negCards + posCards);
    } else if (effect.type === 'points_for_finished_wonder') {
        let stages = gamestate.playerData[player].stagesBuilt.length;
        return (stages === gamestate.wonders[player].stages.length) ? 7 : 0;
    } else if (effect.type === 'points_for_stages') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        let stages = gamestate.playerData[player].stagesBuilt.length;
        let negStages = gamestate.playerData[negPlayer].stagesBuilt.length;
        let posStages = gamestate.playerData[posPlayer].stagesBuilt.length;
        return effect.points_per_stage * (stages + negStages + posStages);
    } else if (effect.type === 'points_for_self_cards') {
        let cards = exports.getCardsOfColor(gamestate, player, effect.color);
        return effect.points_per_card * cards;
    } else if (effect.type === 'points_for_negative_tokens') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        let negTokens = gamestate.playerData[negPlayer].militaryTokens.filter(token => token < 0).length;
        let posTokens = gamestate.playerData[posPlayer].militaryTokens.filter(token => token < 0).length;
        return effect.points_per_token * (negTokens + posTokens);
    } else if (effect.type === 'copy_guild') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        let guilds = [...exports.getGuilds(gamestate, negPlayer), ...exports.getGuilds(gamestate, posPlayer)];
        let maxPoints = 0;
        for (let card of guilds) {
            let guildPoints = exports.computePointsForCard(gamestate, player, card);
            if (guildPoints > maxPoints) maxPoints = guildPoints;
        }
        return maxPoints;
    } else if (effect.type === 'points_for_victory_tokens') {
        let tokens = gamestate.playerData[player].militaryTokens.filter(value => value === effect.token_value).length;
        return effect.points_per_token * tokens;
    } else if (effect.type === 'gold_and_points_for_victory_tokens') {
        let tokens = gamestate.playerData[player].militaryTokens.filter(value => value > 0).length;
        return effect.points_per_token * tokens;
    }
    return 0;
}

function computeSciencePoints(gamestate, player) {
    let effects = exports.getAllEffects(gamestate, player);
    let scienceAdditions = { multiSymbols: [], maskSymbols: [], masks: 0 };
    
    let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
    scienceAdditions.maskSymbols = [...exports.getMaskCopyableSymbols(gamestate, negPlayer), ...exports.getMaskCopyableSymbols(gamestate, posPlayer)];
    
    let symbolCounts = { gear: 0, compass: 0, tablet: 0 };
    
    for (let effect of effects) {
        if (effect.type === 'science') {
            symbolCounts[effect.symbol]++;
        } else if (effect.type === 'multi_science') {
            scienceAdditions.multiSymbols.push(effect.symbols.split('/'));
        } else if (effect.type === 'mask') {
            scienceAdditions.masks++;
        }
    }
    return computeSciencePointsFor(scienceAdditions, symbolCounts);
}

function computeSciencePointsFor(scienceAdditions, symbolCounts) {
    if (scienceAdditions.multiSymbols.length === 0 && (scienceAdditions.masks === 0 || scienceAdditions.maskSymbols.length === 0)) {
        let points = 0;
        points += symbolCounts.gear ** 2;
        points += symbolCounts.compass ** 2;
        points += symbolCounts.tablet ** 2;
        points += 7 * Math.min(symbolCounts.gear, symbolCounts.compass, symbolCounts.tablet);
        return points;
    }
    
    let maxPoints = 0;
    if (scienceAdditions.multiSymbols.length > 0) {
        let choices = scienceAdditions.multiSymbols.shift();
        for (let symbol of choices) {
            symbolCounts[symbol]++;
            let points = computeSciencePointsFor(scienceAdditions, symbolCounts);
            if (points > maxPoints) maxPoints = points;
            symbolCounts[symbol]--;
        }
        scienceAdditions.multiSymbols.unshift(choices);
    } else if (scienceAdditions.masks > 0) {
        for (let i = 0; i < scienceAdditions.maskSymbols.length; i++) {
            let symbol = scienceAdditions.maskSymbols.splice(i, 1)[0];
            symbolCounts[symbol]++;
            scienceAdditions.masks--;
            let points = computeSciencePointsFor(scienceAdditions, symbolCounts);
            if (points > maxPoints) maxPoints = points;
            scienceAdditions.masks++;
            symbolCounts[symbol]--;
            scienceAdditions.maskSymbols.splice(i, 0, symbol);
        }
    }
    
    return maxPoints;
}

exports.getAllEffects = (gamestate, player) => {
    let cardEffects = exports.getAllCardEffects(gamestate, player);
    let startingEffects = exports.getAllStartingEffects(gamestate, player);
    let wonderEffects = exports.getAllWonderEffects(gamestate, player);
    return [...startingEffects, ...wonderEffects, ...cardEffects];
}

exports.getAllCardEffects = (gamestate, player) => {
    let playedCards = gamestate.playerData[player].playedCards;
    
    let effects = [];
    for (let cardId of playedCards) {
        let card = gamestate.cards[cardId];
        for (let effect of card.effects) {
            effects.push(effect);
        }
    }

    return effects;
}

exports.getAllStartingEffects = (gamestate, player) => {
    return exports.cloneArray(gamestate.wonders[player].starting_effects);
}

exports.getAllWonderEffects = (gamestate, player) => {
    let wonder = gamestate.wonders[player];
    let stagesBuilt = gamestate.playerData[player].stagesBuilt;
    
    let effects = [];
    for (let stageBuilt of stagesBuilt) {
        let stage = wonder.stages[stageBuilt.stage];
        for (let effect of stage.effects) {
            effects.push(effect);
        }
    }

    return effects;
}

exports.getEffectCount = (effects, type, subtype) => {
    let count = 0;
    for (let effect of effects) {
        if (effect.type !== type) continue;
        if (subtype !== undefined) {
            if (type === 'trading_post' && effect.direction !== subtype) continue;
            if (type === 'wharf' && effect.direction !== subtype) continue;
        }
        count++;
    }
    return count;
}

exports.hasEffect = (effects, type, subtype) => {
    return exports.getEffectCount(effects, type, subtype) > 0;
}

exports.hasChain = (gamestate, player, chain) => {
    for (let cardId of gamestate.playerData[player].playedCards) {
        let card = gamestate.cards[cardId];
        if (card.chains && card.chains.includes(chain)) return true;
    }
    return false;
}

exports.getCardsOfColor = (gamestate, player, color) => {
    let result = 0;
    for (let cardId of gamestate.playerData[player].playedCards) {
        let card = gamestate.cards[cardId];
        if (card.color === color) result += 1;
    }
    return result;
}

exports.getGuilds = (gamestate, player) => {
    let result = [];
    for (let cardId of gamestate.playerData[player].playedCards) {
        let card = gamestate.cards[cardId];
        if (card.color === 'purple') result.push(card);
    }
    return result;
}

exports.getMaskCopyableSymbols = (gamestate, player) => {
    let result = [];
    for (let cardId of gamestate.playerData[player].playedCards) {
        let card = gamestate.cards[cardId];
        if (card.color === 'green') {
            for (let effect of card.effects) {
                if (effect.type === 'science') result.push(effect.symbol);
            }
        }
    }
    return result;
}

exports.getResources = (effects) => {
    let resources = [];
    // Direct resources
    for (let effect of effects) {
        if (effect.type === 'resource') {
            resources.push([effect.resource]);
        } else if (effect.type === 'multi_resource') {
            resources.push(effect.resources.split('/'));
        }
    }
    // Indirect resources
    let producedResources = [...new Set(exports.getPurchasableResources(effects).flat())];
    let unproducedResources = ['wood', 'ore', 'stone', 'clay', 'glass', 'press', 'loom'].filter(r => !producedResources.includes(r));
    for (let effect of effects) {
        if (effect.type === 'unproduced_resource') {
            resources.push(exports.cloneArray(unproducedResources));
        } else if (effect.type === 'duplicate_produced_resource') {
            resources.push(exports.cloneArray(producedResources));
        }
    }
    return resources;
}

exports.getPurchasableResources = (effects) => {
    let purchasableResources = [];
    for (let effect of effects) {
        if (effect.type === 'resource') {
            purchasableResources.push([effect.resource]);
        } else if (effect.type === 'multi_resource' && effect.purchasable) {
            purchasableResources.push(effect.resources.split('/'));
        }
    }
    return purchasableResources;
}

exports.getPurchasableResources = (effects) => {
    let purchasableResources = [];
    for (let effect of effects) {
        if (effect.type === 'resource') {
            purchasableResources.push([effect.resource]);
        } else if (effect.type === 'multi_resource' && effect.purchasable) {
            purchasableResources.push(effect.resources.split('/'));
        }
    }
    return purchasableResources;
}

exports.getShields = (effects) => {
    let shields = 0;
    for (let effect of effects) {
        if (effect.type === 'shields') {
            shields += effect.shields;
        }
    }
    return shields;
}

/* VALID MOVES */
exports.getValidMoves = (gamestate, player) => {
        
    if (gamestate.state === 'LAST_CARD_MOVE' && !exports.hasEffect(exports.getAllEffects(gamestate, player), 'play_last_card')) {
        return [];
    }
    
    if (gamestate.state === 'DISCARD_MOVE') {
        if (gamestate.discardMoveQueue[0] !== player) {
            return [];
        }
        
        let playedCardNames = gamestate.playerData[player].playedCards.map(cardId => gamestate.cards[cardId].name);
        
        let validMoves = [];
        for (let cardId of gamestate.discardedCards) {
            if (!playedCardNames.includes(gamestate.cards[cardId].name)) {
                validMoves.push({ action: 'play', card: cardId, payment: {} });
            }
        }
        
        validMoves.push({ action: 'reject', card: -1, payment: {} });
        return validMoves;
    }
    
    let hand = gamestate.playerData[player].hand;
    
    let possibleStagesToBuild = [];
    if (exports.hasEffect(exports.getAllEffects(gamestate, player), 'turret')) {
        // Can build any wonder stage
        possibleStagesToBuild.push(...exports.range(0, gamestate.wonders[player].stages.length-1).filter(stage => !gamestate.playerData[player].stagesBuilt.includes(stage)));
    } else {
        // Can only build next wonder stage
        if (gamestate.playerData[player].stagesBuilt.length < gamestate.wonders[player].stages.length) {
            possibleStagesToBuild.push(gamestate.playerData[player].stagesBuilt.length);
        }
    }
    
    let possibleStagesPaymentOptions = possibleStagesToBuild.map(stageIndex => exports.getPaymentOptions(gamestate, player, { action: 'wonder', stage: stageIndex }));
    
    let playedCardNames = gamestate.playerData[player].playedCards.map(cardId => gamestate.cards[cardId].name);
    
    let validMoves = [];
    for (let cardId of hand) {
        if (!playedCardNames.includes(gamestate.cards[cardId].name)) {
            let playMove = { action: 'play', card: cardId };
            for (let paymentOption of exports.getPaymentOptions(gamestate, player, playMove)) {
                validMoves.push({ action: 'play', card: cardId, payment: paymentOption });
            }
        }
        
        for (let i = 0; i < possibleStagesToBuild.length; i++) {
            for (let paymentOption of possibleStagesPaymentOptions[i]) {
                validMoves.push({ action: 'wonder', card: cardId, stage: possibleStagesToBuild[i], payment: paymentOption })
            }
        }

        validMoves.push({ action: 'throw', card: cardId, payment: {} });
    }
    
    return validMoves;
}

/* PAYMENT */
exports.performPayment = (gamestate, player, move) => {
    let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
    if (!move.payment) return;
    if (move.payment.bank) {
        gamestate.playerData[player].gold -= move.payment.bank;
    }
    if (move.payment.pos) {
        gamestate.playerData[player].gold -= move.payment.pos;
        gamestate.playerData[posPlayer].gold += move.payment.pos;
    }
    if (move.payment.neg) {
        gamestate.playerData[player].gold -= move.payment.neg;
        gamestate.playerData[negPlayer].gold += move.payment.neg;
    }
    if (move.payment.free_with_zeus) {
        gamestate.playerData[player].zeusUsed = true;
    }
}

exports.getPaymentOptions = (gamestate, player, move) => {
    let [neg_player, pos_player] = exports.getNeighbors(gamestate, player);
    let effects = exports.getAllEffects(gamestate, player);
    let negEffects = exports.getAllEffects(gamestate, neg_player);
    let posEffects = exports.getAllEffects(gamestate, pos_player);
    
    let resources = exports.getResources(effects);
    let negPurchasableResources = exports.getPurchasableResources(negEffects);
    let posPurchasableResources = exports.getPurchasableResources(posEffects);
    
    let negPurchasableStartingResources = exports.getPurchasableResources(exports.getAllStartingEffects(gamestate, neg_player));
    let posPurchasableStartingResources = exports.getPurchasableResources(exports.getAllStartingEffects(gamestate, pos_player));
    
    // De-dupe the starting purchasable resources from the regular ones.
    for (let r of negPurchasableStartingResources) {
        let i = exports.indexOfArray(negPurchasableResources, r);
        if (i >= 0) negPurchasableResources.splice(i, 1);
    }
    for (let r of posPurchasableStartingResources) {
        let i = exports.indexOfArray(posPurchasableResources, r);
        if (i >= 0) posPurchasableResources.splice(i, 1);
    }
    
    let hasNegTradingPost = exports.hasEffect(effects, 'trading_post', 'neg') || exports.hasEffect(effects, 'double_trading_post');
    let hasPosTradingPost = exports.hasEffect(effects, 'trading_post', 'pos') || exports.hasEffect(effects, 'double_trading_post');
    let hasMarketplace = exports.hasEffect(effects, 'marketplace');
    
    let negWharfs = exports.getEffectCount(effects, 'wharf', 'neg');
    let posWharfs = exports.getEffectCount(effects, 'wharf', 'pos');
    let smugglersCaches = exports.getEffectCount(effects, 'smugglers_cache');
    
    let cost;
    if (move.action === 'play') cost = gamestate.cards[move.card].cost;
    if (move.action === 'wonder') cost = gamestate.wonders[player].stages[move.stage].cost;

    if (!cost) {
        return [{}];
    }

    if (cost.chain && exports.hasChain(gamestate, player, cost.chain)) {
        return [{}];
    }
    
    // Free build first color
    if (move.action === 'play' && exports.hasEffect(effects, 'build_free_first_color') && exports.getCardsOfColor(gamestate, player, gamestate.cards[move.card].color) === 0) {
        return [{}];
    }
    
    // Free build first card
    if (move.action === 'play' && exports.hasEffect(effects, 'build_free_first_card') && gamestate.turnInAge === 1) {
        return [{}];
    }
    
    // Free build last card
    if (move.action === 'play' && exports.hasEffect(effects, 'build_free_last_card') && gamestate.playerData[player].hand.length <= 2) {
        return [{}];
    }
    
    let resourceCost = (move.action === 'wonder' && exports.hasEffect(effects, 'waive_wonder_resource_costs')) ? [] : cost.resources;
    
    let paymentOptions = getPaymentOptionsForResources(resourceCost, resources, negPurchasableResources, posPurchasableResources,
                                                       negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches);
    removeDuplicatePayments(paymentOptions);
    
    if (cost.gold) {
        for (let paymentOption of paymentOptions) {
            paymentOption.bank = cost.gold;
        }
    }
    
    for (let paymentOption of paymentOptions) {
        if (paymentOption.neg) paymentOption.neg = Math.max(paymentOption.neg - negWharfs, 0);
        if (paymentOption.pos) paymentOption.pos = Math.max(paymentOption.pos - posWharfs, 0);
    }
    
    let currentGold = gamestate.playerData[player].gold;
    paymentOptions = paymentOptions.filter(paymentOption => getTotalPaymentCost(paymentOption) <= currentGold);
    
    if (move.action === 'play' && exports.hasEffect(effects, 'build_free_once_per_age') && !gamestate.playerData[player].zeusUsed) {
        paymentOptions.push({ free_with_zeus: true });
    }
    
    return paymentOptions;
}

function getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches) {
    
    if (!costResources || costResources.length === 0) {
        return [{}];
    }
    
    let costResource = costResources.shift();
    
    let paymentOptions = [];
    
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].includes(costResource)) {
            let r = resources.splice(i, 1)[0];
            paymentOptions.push(...getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches));
            resources.splice(i, 0, r);
        }
    }
    
    let negCost = (hasNegTradingPost && ['wood', 'ore', 'stone', 'clay'].includes(costResource)) || (hasMarketplace && ['glass', 'press', 'loom'].includes(costResource)) ? 1 : 2;
    for (let i = 0; i < negPurchasableResources.length; i++) {
        if (negPurchasableResources[i].includes(costResource)) {
            let r = negPurchasableResources.splice(i, 1)[0];
            for (let paymentOption of getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches)) {
                paymentOption.neg = (paymentOption.neg || 0) + negCost;
                paymentOptions.push(paymentOption);
            }
            negPurchasableResources.splice(i, 0, r);
        }
    }
    
    let negStartingCost = Math.max(negCost - smugglersCaches, 0);
    for (let i = 0; i < negPurchasableStartingResources.length; i++) {
        if (negPurchasableStartingResources[i].includes(costResource)) {
            let r = negPurchasableStartingResources.splice(i, 1)[0];
            for (let paymentOption of getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches)) {
                paymentOption.neg = (paymentOption.neg || 0) + negStartingCost;
                paymentOptions.push(paymentOption);
            }
            negPurchasableStartingResources.splice(i, 0, r);
        }
    }
    
    let posCost = ((hasPosTradingPost && ['wood', 'ore', 'stone', 'clay'].includes(costResource)) || (hasMarketplace && ['glass', 'press', 'loom'].includes(costResource))) ? 1 : 2;
    for (let i = 0; i < posPurchasableResources.length; i++) {
        if (posPurchasableResources[i].includes(costResource)) {
            let r = posPurchasableResources.splice(i, 1)[0];
            for (let paymentOption of getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches)) {
                paymentOption.pos = (paymentOption.pos || 0) + posCost;
                paymentOptions.push(paymentOption);
            }
            posPurchasableResources.splice(i, 0, r);
        }
    }
    
    let posStartingCost = Math.max(posCost - smugglersCaches, 0);
    for (let i = 0; i < posPurchasableStartingResources.length; i++) {
        if (posPurchasableStartingResources[i].includes(costResource)) {
            let r = posPurchasableStartingResources.splice(i, 1)[0];
            for (let paymentOption of getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches)) {
                paymentOption.pos = (paymentOption.pos || 0) + posStartingCost;
                paymentOptions.push(paymentOption);
            }
            posPurchasableStartingResources.splice(i, 0, r);
        }
    }
    
    costResources.unshift(costResource);
    
    return paymentOptions;
}

function getTotalPaymentCost(payment) {
    if (!payment) return 0;
    return (payment.pos || 0) + (payment.neg || 0) + (payment.bank || 0);
}

function removeDuplicatePayments(payments) {
    for (let i = 0; i < payments.length; i++) {
        for (let j = i+1; j < payments.length; j++) {
            if ((payments[j].pos || 0) !== (payments[i].pos || 0)) continue;
            if ((payments[j].neg || 0) !== (payments[i].neg || 0)) continue;
            if ((payments[j].bank || 0) !== (payments[i].bank || 0)) continue;
            payments.splice(j, 1);
            j--;
        }
    }
}