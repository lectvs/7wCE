function getDescriptionForEffect(effect: API.Effect) {
    if (effect.type === 'resource') {
        return `Gives ${effect.resource} each turn`;
    } else if (effect.type === 'multi_resource') {
        return `Gives one of ${effect.resources} each turn`
    } else if (effect.type === 'shield') {
        return `Military shield`;
    } else if (effect.type === 'science') {
        return `Science symbol`;
    } else if (effect.type === 'points') {
        return `${effect.points} VP`;
    } else if (effect.type === 'gold') {
        return `${effect.gold} gold`;
    } else if (effect.type === 'trading_post') {
        return `Pay 1 gold instead of 2 for brown resources traded from your ${effect.direction === 'neg' ? 'left' : 'right'} neighbor`;
    } else if (effect.type === 'marketplace') {
        return `Pay 1 gold instead of 2 for grey resources traded from either neighbor`;
    } else if (effect.type === 'gold_for_cards') {
        return `${effect.gold_per_card} gold for each ${effect.color} card played by you or your neighbors`;
    } else if (effect.type === 'gold_and_points_for_cards') {
        return `${effect.gold_per_card} gold and ${effect.points_per_card} VP for each ${effect.color} card played by you`;
    } else if (effect.type === 'gold_and_points_for_stages') {
        return `${effect.gold_per_stage} gold and ${effect.points_per_stage} VP for each wonder stage you have built`;
    } else if (effect.type === 'points_for_cards') {
        return `${effect.points_per_card} VP for each ${effect.color} card played by your neighbors`;
    } else if (effect.type === 'points_for_stages') {
        return `${effect.points_per_stage} VP for each wonder stage you or your neighbors have built`;
    } else if (effect.type === 'points_for_finished_wonder') {
        return `${effect.points} VP if you build all of your wonder stages`;
    } else if (effect.type === 'points_for_self_cards') {
        return `${effect.points_per_card} VP for each ${effect.color} card played by you`;
    } else if (effect.type === 'multi_science') {
        return `At the end of the game, becomes the most highest value science symbol for you`;
    } else if (effect.type === 'play_last_card') {
        return `You may play your last card instead of discarding it at the end of each age`;
    } else if (effect.type === 'build_from_discard') {
        return `Play one card from the discard pile for free`;
    } else if (effect.type === 'build_free_first_color') {
        return `You may ignore the cost of any card, provided you have not already played one of the same color`;
    } else if (effect.type === 'build_free_first_card') {
        return `You may ignore the cost of any card in your first hand of each age`;
    } else if (effect.type === 'build_free_last_card') {
        return `You may ignore the cost of any card in your last hand of each age`;
    }
    console.error('Effect type not found:', effect.type);
    return "Description not found";
}