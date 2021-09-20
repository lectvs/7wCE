function getDescriptionForEffect(effect: API.Effect) {
    if (effect.type === 'resource') {
        return `Gives ${effect.resource} each turn`;
    } else if (effect.type === 'multi_resource') {
        return `Gives one of ${effect.resources} each turn`
    } else if (effect.type === 'shields') {
        let s = effect.shields === 1 ? '' : 's';
        return `${effect.shields} military shield${s}`;
    } else if (effect.type === 'science') {
        return `Science symbol`;
    } else if (effect.type === 'points') {
        return `${effect.points} VP`;
    } else if (effect.type === 'gold') {
        return `Gain ${effect.gold} gold`;
    } else if (effect.type === 'trading_post') {
        return `Pay 1 gold instead of 2 for brown resources traded from your ${effect.direction === 'neg' ? 'left' : 'right'} neighbor`;
    } else if (effect.type === 'marketplace') {
        return `Pay 1 gold instead of 2 for grey resources traded from either neighbor`;
    } else if (effect.type === 'gold_for_cards') {
        return `Gain ${effect.gold_per_card} gold for each ${effect.color} card played by you or your neighbors`;
    } else if (effect.type === 'gold_and_points_for_cards') {
        return `Gain ${effect.gold_per_card} gold and ${effect.points_per_card} VP for each ${effect.color} card you have played`;
    } else if (effect.type === 'gold_and_points_for_stages') {
        return `Gain ${effect.gold_per_stage} gold and ${effect.points_per_stage} VP for each wonder stage you have built`;
    } else if (effect.type === 'points_for_cards') {
        return `${effect.points_per_card} VP for each ${effect.color} card played by your neighbors`;
    } else if (effect.type === 'points_for_stages') {
        return `${effect.points_per_stage} VP for each wonder stage you or your neighbors have built`;
    } else if (effect.type === 'points_for_finished_wonder') {
        return `${effect.points} VP if you build all of your wonder stages`;
    } else if (effect.type === 'points_for_self_cards') {
        return `${effect.points_per_card} VP for each ${effect.color} card you have played`;
    } else if (effect.type === 'multi_science') {
        return `Any science symbol`;
    } else if (effect.type === 'play_last_card') {
        return `You may play your last card instead of discarding it at the end of each age`;
    } else if (effect.type === 'build_from_discard') {
        return `Play one card from the discard pile for free. Conflicts resolve in this order: Halikarnassos -> The Great Wall -> Manneken Pis -> Forging Agency`;
    } else if (effect.type === 'build_free_first_color') {
        return `You may ignore the cost of any card, provided you have not already played one of the same color`;
    } else if (effect.type === 'build_free_first_card') {
        return `You may ignore the cost of any card in your first hand of each age`;
    } else if (effect.type === 'build_free_last_card') {
        return `You may ignore the cost of any card in your last hand of each age`;
    } else if (effect.type === 'double_trading_post') {
        return `Pay 1 gold instead of 2 for brown resources traded from either neighbor`
    } else if (effect.type === 'copy_guild') {
        return `Copy the effect of a guild from either neighbor`;
    } else if (effect.type === 'points_for_negative_tokens') {
        return `${effect.points_per_token} VP for each military defeat token your neighbors have`;
    } else if (effect.type === 'build_free_once_per_age') {
        return `You may ignore the cost of a single card of your choice per age`;
    } else if (effect.type === 'gold_for_others') {
        return `All players except you receive ${effect.gold} gold from the bank`;
    } else if (effect.type === 'gold_for_neighbor') {
        return `Your ${effect.direction === 'neg' ? 'left' : 'right'} neighbor receives ${effect.gold} gold from the bank`;
    } else if (effect.type === 'waive_wonder_resource_costs') {
        return `You may ignore the resource costs of your wonder stages (gold costs are unaffected)`;
    } else if (effect.type === 'mask') {
        return `Copy a science symbol from either neighbor, except astrolabes or multi-symbols. Multiple masks cannot copy the same instance of a symbol`;
    } else if (effect.type === 'unproduced_resource') {
        return `Gives one of a resource you are not currently producing in your wonder per turn (untradable resources are ignored)`;
    } else if (effect.type === 'duplicate_produced_resource') {
        return `Gives one extra of a resource you are currently producing in your wonder per turn (untradable resources are ignored)`;
    } else if (effect.type === 'wharf') {
        return `Pay 1 gold less for a single resource per turn traded from your ${effect.direction === 'neg' ? 'left' : 'right'} neighbor`;
    } else if (effect.type === 'smugglers_cache') {
        return `Pay 1 gold less when buying the starting resource from either neighbor`;
    } else if (effect.type === 'dove') {
        return `Gain 1 diplomacy token`;
    } else if (effect.type === 'gain_military_token') {
        return `Gain a military ${effect.token_value < 0 ? 'defeat' : 'victory'} token worth ${effect.token_value} VP`;
    } else if (effect.type === 'debt_for_neighbor') {
        return `Gives a debt token to your ${effect.direction === 'neg' ? 'left' : 'right'} neighbor`;
    } else if (effect.type === 'gold_for_defeat_tokens') {
        return `Gain ${effect.gold_per_token} gold for each military defeat token you have`;
    } else if (effect.type === 'points_for_victory_tokens') {
        return `${effect.points_per_token} VP for each ${effect.token_value}-VP military victory token you have`;
    } else if (effect.type === 'gold_and_points_for_victory_tokens') {
        return `${effect.gold_per_token} gold and ${effect.points_per_token} VP for each military victory token you have`;
    } else if (effect.type === 'discard_defeat_tokens') {
        return `Discard all of your current military defeat tokens`;
    } else if (effect.type === 'broken_gold') {
        return `All players except you lose ${effect.gold} gold`;
    } else if (effect.type === 'broken_gold_for_stages') {
        return `All players except you lose ${effect.gold_per_stage} gold per wonder stage they have built`;
    } else if (effect.type === 'broken_gold_for_victory_tokens') {
        return `All players except you lose ${effect.gold_per_token} gold per military victory token they have`;
    } else if (effect.type === 'turret') {
        return `You may build your wonder stages in any order`;
    } else if (effect.type === 'shields_for_defeat_tokens') {
        return `Your military defeat tokens count as extra military shields`;
    } else if (effect.type === 'points_for_shields') {
        return `${effect.points_per_shield} VP for each military shield you have`;
    } else if (effect.type === 'points_for_pairs') {
        return `${effect.points_per_pair} VP for each pair of same-color cards you have`;
    } else if (effect.type === 'points_for_triplets') {
        return `${effect.points_per_triplet} VP for each triplet of same-color cards you have`;
    } else if (effect.type === 'points_for_chains') {
        return `${effect.points_per_chain} VP for each pair of chained cards you have`;
    } else if (effect.type === 'build_free_without_chain') {
        return `You may build for free a chained card even if you do not have the prerequisite card (limited to ${effect.usages} uses during the game)`;
    } else if (effect.type === 'eye') {
        return `You may look at your starting hand from the next age`;
    } else if (effect.type === 'see_future') {
        return `You may look at all of the purple and black cards in the deck`;
    }
    console.error('Effect type not found:', effect.type);
    return "Description not found";
}