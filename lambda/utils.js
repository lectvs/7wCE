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

exports.clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
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

// Random element from an array.
exports.randElement = (array) => {
    return array[exports.randInt(0, array.length-1)];
}

// Random element from an array, weighted by relative weights.
exports.randElementWeighted = (array, weights) => {
    let sum = exports.sumArray(weights);
    let r = exports.randFloat(0, sum);
    for (let i = 0; i < weights.length; i++) {
        if (r <= weights[i]) return array[i];
        r -= weights[i];
    }
    return array[array.length-1];
}

// Random integer from min to max, inclusive.
exports.randInt = (min, max) => {
    return min + Math.floor(Math.random() * (max+1 - min));
}

// Random float from min to max.
exports.randFloat = (min, max) => {
    return min + Math.random() * (max - min);
}

// Random boolean with true chance.
exports.randBool = (chance) => {
    return Math.random() < chance;
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

exports.sumArray = (array, key) => {
    if (!key) key = (a => a);
    let result = 0;
    for (let a of array) {
        result += key(a);
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
exports.colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple', 'black'];

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
    
    if (gamestate.sevenBlundersEnabled) {
        if (points1 < points2) return 1;
        if (points1 > points2) return 0;
        if (gold1 < gold2) return 1;
        if (gold1 > gold2) return 0;
        return 0.5;
    }
    
    if (points1 < points2) return 0;
    if (points1 > points2) return 1;
    if (gold1 < gold2) return 0;
    if (gold1 > gold2) return 1;
    return 0.5;
}

exports.getEloMultiplier = (gamestate) => {
    let gameModeMultiplier = 1;
    if (gamestate.randomizerEnabled) gameModeMultiplier++;
    if (gamestate.sevenBlundersEnabled) gameModeMultiplier++;
    return gameModeMultiplier;
}

exports.computeEloDiff = (gamestate, elo1, elo2, result) => {
    let r1 = 1 / (1 + Math.pow(10, ((elo2 - elo1)/391)));
    let factor = 20;
    return (result - r1) * factor * exports.getEloMultiplier(gamestate);
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
        other: 0,
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
            } else {
                points.other += pointValue;
            }
        }
    }
    
    points.science += computeSciencePoints(gamestate, player);
    
    points.total = points.conflict + points.finance + points.wonder + points.civilian + points.commerce + points.guild + points.science + points.black + points.other;
    
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
    } else if (effect.type === 'points_for_shields') {
        let shields = exports.getShields(gamestate, player);
        return effect.points_per_shield * shields;
    } else if (effect.type === 'points_for_pairs') {
        let colorCounts = {};
        for (let cardId of gamestate.playerData[player].playedCards) {
            let card = gamestate.cards[cardId];
            if (!(card.color in colorCounts)) colorCounts[card.color] = 0;
            colorCounts[card.color]++;
        }
        
        let pairs = 0;
        for (let color in colorCounts) {
            let count = colorCounts[color];
            pairs += Math.floor(count / 2);
        }
        
        return effect.points_per_pair * pairs;
    } else if (effect.type === 'points_for_triplets') {
        let colorCounts = {};
        for (let cardId of gamestate.playerData[player].playedCards) {
            let card = gamestate.cards[cardId];
            if (!(card.color in colorCounts)) colorCounts[card.color] = 0;
            colorCounts[card.color]++;
        }
        
        let triplets = 0;
        for (let color in colorCounts) {
            let count = colorCounts[color];
            triplets += Math.floor(count / 3);
        }
        
        return effect.points_per_triplet * triplets;
    } else if (effect.type === 'points_for_chains') {
        let chains = gamestate.playerData[player].playedCards
            .map(cardId => gamestate.cards[cardId])
            .filter(card => card.cost && card.cost.chain && exports.hasChain(gamestate, player, card.cost.chain))
            .length;
        return effect.points_per_chain * chains;
    }
    return 0;
}

function computeSciencePoints(gamestate, player) {
    let effects = exports.getAllEffects(gamestate, player);
    let scienceAdditions = { multiSymbols: [], maskSymbols: [], masks: 0 };
    
    let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
    scienceAdditions.maskSymbols = [...exports.getMaskCopyableSymbols(gamestate, negPlayer), ...exports.getMaskCopyableSymbols(gamestate, posPlayer)];
    
    let symbolCounts = { gear: 0, compass: 0, tablet: 0, astrolabe: 0 };
    
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
        points += symbolCounts.astrolabe ** 2;
        points += 7 * computeNumberOfScienceSets(symbolCounts);
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

function computeNumberOfScienceSets(symbolCounts) {
    // THIS ALGORITHM ASSUMES ONLY FOUR DIFFERENT SYMBOLS!
    let uniqueSymbols = ['gear', 'compass', 'tablet', 'astrolabe'].filter(symbol => symbolCounts[symbol] > 0);
    if (uniqueSymbols.length < 3) {
        return 0;
    }
    if (uniqueSymbols.length === 3) {
        return Math.min(...uniqueSymbols.map(symbol => symbolCounts[symbol]));
    }
    
    // Otherwise, all symbols present...
    
    let minSymbol = 'gear';
    let maxSymbol = 'gear';
    for (let symbol in symbolCounts) {
        if (symbolCounts[symbol] < symbolCounts[minSymbol]) minSymbol = symbol;
        if (symbolCounts[symbol] > symbolCounts[maxSymbol]) maxSymbol = symbol;
    }
    
    // Consume one set, but convert the excess symbol to an extra `minSymbol`.
    symbolCounts[minSymbol]++;
    for (let symbol in symbolCounts) {
        symbolCounts[symbol]--;
    }
    
    let numScienceSets = 1 + computeNumberOfScienceSets(symbolCounts);
    
    // Undo what we did so we leave `symbolCounts` as we found it.
    symbolCounts[minSymbol]--;
    for (let symbol in symbolCounts) {
        symbolCounts[symbol]++;
    }
    
    return numScienceSets;
}

exports.resolveStage = (gamestate, player, stageBuilt) => {
    if (stageBuilt.copyPlayer === undefined || stageBuilt.copyStage === undefined) {
        return gamestate.wonders[player].stages[stageBuilt.stage];
    }
    
    return gamestate.wonders[stageBuilt.copyPlayer].stages[stageBuilt.copyStage];
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
    let stagesBuilt = gamestate.playerData[player].stagesBuilt;
    
    let effects = [];
    for (let stageBuilt of stagesBuilt) {
        let stage = exports.resolveStage(gamestate, player, stageBuilt);
        if (!stage) continue;
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
        for (let effect of card.effects) {
            if (effect.type === 'science' && ['tablet', 'compass', 'gear'].includes(effect.symbol)) {
                result.push(effect.symbol);
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

exports.getShields = (gamestate, player) => {
    let effects = exports.getAllEffects(gamestate, player);
    let shields = 0;
    for (let effect of effects) {
        if (effect.type === 'shields') {
            shields += effect.shields;
        }
    }
    if (exports.hasEffect(effects, 'shields_for_defeat_tokens')) {
        for (let token of gamestate.playerData[player].militaryTokens) {
            if (token < 0) {
                shields += 1;
            }
        }
    }
    return shields;
}

/* TURN */
exports.applyImmediateEffect = (gamestate, player, effect, discardPlays) => {
    let playerData = gamestate.playerData[player];
    if (effect.type === 'gold') {
        playerData.gold += effect.gold;
    } else if (effect.type === 'gold_for_cards') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        let cards = exports.getCardsOfColor(gamestate, player, effect.color);
        let negCards = exports.getCardsOfColor(gamestate, negPlayer, effect.color);
        let posCards = exports.getCardsOfColor(gamestate, posPlayer, effect.color);
        playerData.gold += effect.gold_per_card * (cards + negCards + posCards);
    } else if (effect.type === 'gold_and_points_for_cards') {
        let cards = exports.getCardsOfColor(gamestate, player, effect.color);
        playerData.gold += effect.gold_per_card * cards;
    } else if (effect.type === 'gold_and_points_for_stages') {
        let stages = playerData.stagesBuilt.length;
        playerData.gold += effect.gold_per_stage * stages;
    } else if (effect.type === 'build_from_discard') {
        let priority = effect.priority || 0;
        if (gamestate.wonders[player].name === 'Manneken Pis') priority /= 2;
        discardPlays.push({ player: player, priority: priority });
    } else if (effect.type === 'gold_for_others') {
        for (let other of gamestate.players) {
            if (other !== player) gamestate.playerData[other].gold += effect.gold;
        }
    } else if (effect.type === 'gold_for_neighbor') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        if (effect.direction === 'neg') gamestate.playerData[negPlayer].gold += effect.gold;
        if (effect.direction === 'pos') gamestate.playerData[posPlayer].gold += effect.gold;
    } else if (effect.type === 'dove') {
        playerData.diplomacyTokens++;
    } else if (effect.type === 'gain_military_token') {
        playerData.militaryTokens.push(effect.token_value);
    } else if (effect.type === 'debt_for_neighbor') {
        let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
        if (effect.direction === 'neg') gamestate.playerData[negPlayer].debtTokens++;
        if (effect.direction === 'pos') gamestate.playerData[posPlayer].debtTokens++;
    } else if (effect.type === 'gold_for_defeat_tokens') {
        let tokens = playerData.militaryTokens.filter(value => value < 0).length;
        playerData.gold += effect.gold_per_token * tokens;
    } else if (effect.type === 'gold_and_points_for_victory_tokens') {
        let tokens = playerData.militaryTokens.filter(value => value > 0).length;
        playerData.gold += effect.gold_per_token * tokens;
    } else if (effect.type === 'discard_defeat_tokens') {
        playerData.militaryTokens = playerData.militaryTokens.filter(value => value >= 0);
    } else if (effect.type === 'broken_gold') {
        for (let other of gamestate.players) {
            if (other !== player) gamestate.playerData[other].goldToLose += effect.gold;
        }
    } else if (effect.type === 'broken_gold_for_stages') {
        for (let other of gamestate.players) {
            if (other !== player) {
                let stages = gamestate.playerData[other].stagesBuilt.length;
                gamestate.playerData[other].goldToLose += effect.gold_per_stage * stages;
            }
        }
    } else if (effect.type === 'broken_gold_for_victory_tokens') {
        for (let other of gamestate.players) {
            if (other !== player) {
                let tokens = gamestate.playerData[other].militaryTokens.filter(value => value > 0).length;
                gamestate.playerData[other].goldToLose += effect.gold_per_token * tokens;
            }
        }
    } else if (effect.type === 'build_free_without_chain') {
        playerData.buildFreeWithoutChainUsages += effect.usages;
    } else if (effect.type === 'eye') {
        if (gamestate.age < 3) {
            let player_i = gamestate.players.indexOf(player);
            playerData.seeFutureCards = gamestate.initialHands[gamestate.age + 1][player_i];
        }
    } else if (effect.type === 'see_future') {
        playerData.seeFutureCards = [];
        for (let age in gamestate.initialHands) {
            for (let agePlayerCards of gamestate.initialHands[age]) {
                playerData.seeFutureCards.push(...agePlayerCards.filter(cardId => ['purple', 'black'].includes(gamestate.cards[cardId].color)));
            }
        }
        playerData.seeFutureCards = exports.shuffled(playerData.seeFutureCards);
        playerData.seeFutureCards.sort((cardId1, cardId2) => {
            let card1 = gamestate.cards[cardId1];
            let card2 = gamestate.cards[cardId2];
            if (card1.color === 'black' && card2.color === 'purple') return -1;
            if (card1.color === 'purple' && card2.color === 'black') return 1;
            return card1.age - card2.age;
        });
    }
}

/* VALID MOVES */
exports.getValidMoves = (gamestate, player) => {
        
    if (gamestate.state === 'LAST_CARD_MOVE' && !exports.hasEffect(exports.getAllEffects(gamestate, player), 'play_last_card')) {
        return [];
    }
    
    if (gamestate.state === 'SEE_FUTURE') {
        if (!gamestate.playerData[player].seeFutureCards) return [];
        return [{ action: 'accept', card: -1, payment: {} }];
    }
    
    if (gamestate.state === 'DISCARD_MOVE') {
        if (gamestate.discardMoveQueue[0] !== player) {
            return [];
        }
        
        let playedCardNames = gamestate.playerData[player].playedCards.map(cardId => gamestate.cards[cardId].name);
        
        let validMoves = [];
        for (let cardId of gamestate.discardedCards) {
            if (!playedCardNames.includes(gamestate.cards[cardId].name) || gamestate.randomizerEnabled) {
                validMoves.push({ action: 'play', card: cardId, payment: {} });
            }
        }
        
        if (!gamestate.sevenBlundersEnabled || validMoves.length === 0) {
            // In 7 Blunders, rejecting the discard is only valid if there are no other moves.
            validMoves.push({ action: 'reject', card: -1, payment: {} });
        }
        return validMoves;
    }
    
    let hand = gamestate.playerData[player].hand;
    
    let possibleStagesToBuild = [];
    if (exports.hasEffect(exports.getAllEffects(gamestate, player), 'turret')) {
        // Can build any wonder stage
        possibleStagesToBuild.push(...exports.range(0, gamestate.wonders[player].stages.length-1).filter(stage => !gamestate.playerData[player].stagesBuilt.map(sb => sb.stage).includes(stage)));
    } else {
        // Can only build next wonder stage
        if (gamestate.playerData[player].stagesBuilt.length < gamestate.wonders[player].stages.length) {
            possibleStagesToBuild.push(gamestate.playerData[player].stagesBuilt.length);
        }
    }
    
    let possibleStageBuildOptions = possibleStagesToBuild.map(stageIndex => {
        let choices = resolveCopyStageChoices(gamestate, player, stageIndex);
        if (choices.length === 0) {
            return [{ stage: stageIndex, copyPlayer: player, copyStage: stageIndex }];
        }
        return choices.map(choice => ({ stage: stageIndex, copyPlayer: choice.player, copyStage: choice.stage }));
    }).flat();
    
    let possibleStageBuildPaymentOptions = possibleStageBuildOptions.map(option => {
        let wonderMove = { action: 'wonder', stage: option.stage };
        if (option.copyPlayer !== player || option.copyStage !== option.stage) {
            wonderMove.copyPlayer = option.copyPlayer;
            wonderMove.copyStage = option.copyStage;
        }
        return { stage: wonderMove.stage, copyPlayer: wonderMove.copyPlayer, copyStage: wonderMove.copyStage, paymentOptions: exports.getPaymentOptions(gamestate, player, wonderMove) };
    });
    
    let playedCardNames = gamestate.playerData[player].playedCards.map(cardId => gamestate.cards[cardId].name);
    
    let validMoves = [];
    for (let cardId of hand) {
        if (gamestate.randomizerEnabled || !playedCardNames.includes(gamestate.cards[cardId].name)) {
            let playMove = { action: 'play', card: cardId };
            for (let paymentOption of exports.getPaymentOptions(gamestate, player, playMove)) {
                validMoves.push({ action: 'play', card: cardId, payment: paymentOption });
            }
        }
        
        for (let stageBuildOptions of possibleStageBuildPaymentOptions) {
            for (let paymentOption of stageBuildOptions.paymentOptions) {
                validMoves.push({ action: 'wonder', card: cardId, stage: stageBuildOptions.stage, copyPlayer: stageBuildOptions.copyPlayer, copyStage: stageBuildOptions.copyStage, payment: paymentOption });
            }
        }

        validMoves.push({ action: 'throw', card: cardId, payment: {} });
    }

    
    if (gamestate.sevenBlundersEnabled) {
        // In 7 Blunders, throwing is only valid if there are no other moves
        let throwlessMoves = validMoves.filter(move => move.action !== 'throw');
        if (throwlessMoves.length > 0) validMoves = throwlessMoves;
    }
    
    return validMoves;
}

function resolveCopyStageChoices(gamestate, player, stageIndex, checkedPlayerStages = []) {
    let stage = gamestate.wonders[player].stages[stageIndex];
    if (!stage.copy_stage) return [{ player: player, stage: stageIndex }];
    
    let playerStage = `${player}_${stageIndex}`;
    if (checkedPlayerStages.includes(playerStage)) return [];  // Infinite loop
    
    let [negPlayer, posPlayer] = exports.getNeighbors(gamestate, player);
    let copyPlayer = stage.copy_stage.dir === 'neg' ? negPlayer : posPlayer;
    
    let copyStages = gamestate.wonders[copyPlayer].stages.length;
    if (copyStages === 0) return [];
    
    let possibleStagesToCopy = [];
    if (exports.hasEffect(exports.getAllEffects(gamestate, copyPlayer), 'turret')) {
        possibleStagesToCopy.push(...exports.range(0, copyStages-1));
    } else if (stage.copy_stage.stage === 'first') {
        possibleStagesToCopy.push(0);
    } else if (stage.copy_stage.stage === 'second') {
        possibleStagesToCopy.push(copyStages === 1 ? 0 : 1);
    } else if (stage.copy_stage.stage === 'last') {
        possibleStagesToCopy.push(copyStages - 1);
    }
    
    checkedPlayerStages.push(playerStage);
    let result = possibleStagesToCopy.map(si => resolveCopyStageChoices(gamestate, copyPlayer, si, checkedPlayerStages)).flat();
    checkedPlayerStages.pop();
    
    // Remove duplicates
    for (let i = 0; i < result.length; i++) {
        for (let j = result.length-1; j > i; j--) {
            if (result[i].player !== result[j].player) continue;
            if (result[i].stage !== result[j].stage) continue;
            result.splice(j, 1);
        }
    }
    
    return result;
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
    if (move.payment.free_with_delphoi) {
        gamestate.playerData[player].buildFreeWithoutChainUsages--;
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
    if (move.action === 'wonder') {
        if (move.copyPlayer) {
            cost = gamestate.wonders[move.copyPlayer].stages[move.copyStage].cost;
        } else {
            cost = gamestate.wonders[player].stages[move.stage].cost;
        }
    }

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
    adjustNeighborResourcesForResourceCost(resourceCost, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources);
    
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
    
    if (move.action === 'play' && gamestate.playerData[player].buildFreeWithoutChainUsages > 0 && gamestate.cards[move.card].cost && gamestate.cards[move.card].cost.chain) {
        paymentOptions.push({ free_with_delphoi: true });
    }
    
    return paymentOptions;
}

function getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches) {
    
    if (!costResources || costResources.length === 0) {
        return [{}];
    }
    
    let costResource = costResources.shift();
    
    let paymentOptions = [];
    
    let requiresTrading = true;
    
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].includes(costResource)) {
            let r = resources.splice(i, 1)[0];
            paymentOptions.push(...getPaymentOptionsForResources(costResources, resources, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources, hasNegTradingPost, hasPosTradingPost, hasMarketplace, smugglersCaches));
            resources.splice(i, 0, r);
            if (r.length === 1) {
                requiresTrading = false;
                break;
            }
        }
    }
    
    if (requiresTrading) {
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
    }
    
    costResources.unshift(costResource);
    
    return paymentOptions;
}

function adjustNeighborResourcesForResourceCost(resourceCost, negPurchasableResources, posPurchasableResources, negPurchasableStartingResources, posPurchasableStartingResources) {
    let resources = sumResources(resourceCost);
    let negResources = sumNeighborResources(negPurchasableResources, negPurchasableStartingResources);
    let posResources = sumNeighborResources(posPurchasableResources, posPurchasableStartingResources);
    
    for (let r in resources) {
        for (let count = resources[r]; count < negResources[r]; count++) {
            negPurchasableResources.splice(exports.indexOfArray(negPurchasableResources, [r]), 1);
        }
        for (let count = resources[r]; count < posResources[r]; count++) {
            posPurchasableResources.splice(exports.indexOfArray(posPurchasableResources, [r]), 1);
        }
    }
}

function sumResources(resources) {
    let result = {
        wood: 0,
        ore: 0,
        clay: 0,
        stone: 0,
        press: 0,
        glass: 0,
        loom: 0
    };
    if (resources) {
        for (let resource of resources) {
            result[resource]++;
        }
    }
    return result;
}

function sumNeighborResources(resources, startingResources) {
    let result = {
        wood: 0,
        ore: 0,
        clay: 0,
        stone: 0,
        press: 0,
        glass: 0,
        loom: 0
    };
    if (resources) {
        for (let resource of resources) {
            if (resource.length === 1) result[resource[0]]++;
        }
    }
    if (startingResources) {
        for (let resource of startingResources) {
            if (resource.length === 1) result[resource[0]]--;
            if (result[resource[0]] < 0) result[resource[0]] = 0;
        }
    }
    return result;
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
