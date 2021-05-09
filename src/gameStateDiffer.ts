type MilitaryShowing = {
    type: 'victory' | 'defeat' | 'tie';
    shields: number;
} | { type: 'diplomacy' };

namespace GameStateDiffer {
    export type DiffResult = {
        scripts: Script.Function[];
    }

    export function diffChooseSide(gamestate: API.GameState) {
        let result: DiffResult = {
            scripts: []
        };

        diffCurrentWonderSideChoices(gamestate, result);

        return result;
    }

    export function diffNonTurn(gamestate: API.GameState, midturn: boolean) {
        let result: DiffResult = {
            scripts: []
        };

        for (let player of Main.gamestate.players) {
            diffPoints(gamestate, player, result);
            diffGold(gamestate, player, result);
            diffDiplomacyPreConflict(gamestate, player, result);
            diffMilitaryTokensPreConflict(gamestate, player, result);
            diffDebtTokens(gamestate, player, result);
            if (midturn) diffCurrentMove(gamestate, player, result);
        }

        return result;
    }

    export function diffTurn(gamestate: API.GameState): DiffResult {
        let result: DiffResult = diffNonTurn(gamestate, false);

        if (!(Main.scene instanceof GameScene)) {
            return result;
        }
        let scene: GameScene = Main.scene;

        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return result;
        }

        result.scripts.push(function*() {
            // Animate all moves performed by players
            let moveScripts = gamestate.players.map(player => {
                return function*() {
                    let i = gamestate.players.indexOf(player);
                    let neg = mod(i-1, gamestate.players.length);
                    let pos = mod(i+1, gamestate.players.length);
                    let hand = scene.hands[i];
                    let lastMove = gamestate.playerData[player].lastMove;
                    if (!lastMove) return;

                    if (player === Main.player) {
                        scene.hand.reflectMove(lastMove);
                        yield* S.wait(0.5)();
                        
                        let selectedCard = scene.hand.selectedCard;
                        scene.hand.cards.splice(scene.hand.cards.indexOf(selectedCard), 1);
                        scene.hand.playedCard = selectedCard;
                        if (selectedCard) {
                            if (lastMove.action === 'play') {
                                if (selectedCard.apiCard.color === 'red' && hasDiplomacyTokenAtStartOfTurn(gamestate, player)) {
                                    selectedCard.setGrayedOut(true);
                                }
                            } else if (lastMove.action === 'throw') {
                                scene.discardHand.cards.push(selectedCard);
                            }
                        }
                    } else {
                        // Make sure move-cards are extended
                        if (Main.gamestate.state !== 'DISCARD_MOVE') {
                            hand.state = { type: 'back', moved: true };
                        }
                        yield* S.wait(0.5)();
                    }

                    if (API.totalPaymentAmount(lastMove.payment) > 0) {
                        let paymentScripts: Script.Function[] = [];
                        if (lastMove.payment.neg) {
                            
                            paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(),
                                                                    scene.wonders[neg].getGoldCoinWorldPosition(), lastMove.payment.neg));
                        }
                        if (lastMove.payment.pos) {
                            paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(),
                                                                    scene.wonders[pos].getGoldCoinWorldPosition(), lastMove.payment.pos));
                        }
                        if (lastMove.payment.bank) {
                            paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(),
                                                                    scene.getSourceSinkPosition(), lastMove.payment.bank));
                        }
                        Main.scriptManager.runScript(S.simul(...paymentScripts));
                    }

                    let goldGain = API.goldGain(Main.gamestate.playerData[player].gold, gamestate.playerData[player].gold,
                        gamestate.playerData[player].lastMove.payment, gamestate.playerData[gamestate.players[neg]].lastMove?.payment, gamestate.playerData[gamestate.players[pos]].lastMove?.payment);
                    if (goldGain > 0) {
                        Main.scriptManager.runScript(animateGoldMovement(scene.getSourceSinkPosition(),
                                                                         scene.wonders[i].getGoldCoinWorldPosition(), goldGain));
                    }

                    // Main player will not participate in the below actions
                    if (player === Main.player) return;

                    if (lastMove.action === 'play') {
                        let card: Card;
                        if (Main.gamestate.state === 'DISCARD_MOVE') {
                            card = scene.discardHand.cards.pop();
                        } else {
                            card = hand.cards.pop();
                            hand.state = { type: 'back', moved: false };
                        }
                        card.destroy();
                        card.create(lastMove.card, false);

                        card.state = { type: 'full', justPlayed: false };
                        yield* S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, t => { card.update() })();

                        scene.hands[i].playedCard = card;
                        card.state = { type: 'effect', justPlayed: false };
                        card.zIndex = C.Z_INDEX_CARD_PLAYED;
                        let playedPoint = scene.wonders[i].getNewCardEffectWorldPosition(card);
                        yield* S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, t => {
                            card.targetPosition.x = lerpTime(card.targetPosition.x, playedPoint.x, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.targetPosition.y = lerpTime(card.targetPosition.y, playedPoint.y, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.scale = lerpTime(card.scale, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.update();
                        })();
                        card.snap();
                        scene.wonders[i].playedCardEffectRolls[card.apiCard.color].addCard(card);
                    } else if (lastMove.action === 'wonder') {
                        let card = hand.cards.pop();
                        hand.state = { type: 'back', moved: false };

                        card.checkMarkVisible = false;
                        yield* S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, t => { card.update() })();

                        card.state = { type: 'flipped', justPlayed: false };
                        card.zIndex = C.Z_INDEX_CARD_WONDER;
                        let wonderPoint = scene.wonders[i].getCardPositionForStage(lastMove.stage);
                        yield* S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, t => {
                            card.targetPosition.x = lerpTime(card.targetPosition.x, wonderPoint.x, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.targetPosition.y = lerpTime(card.targetPosition.y, wonderPoint.y, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.scale = lerpTime(card.scale, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.update();
                        })();
                        card.snap();
                    } else if (lastMove.action === 'throw') {
                        let card = hand.cards.pop();
                        hand.state = { type: 'back', moved: false };

                        card.checkMarkVisible = false;
                        yield* S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, t => { card.update() })();

                        card.state = { type: 'flipped', justPlayed: false };
                        card.zIndex = C.Z_INDEX_CARD_MOVING;
                        let discardPoint = scene.discardPile.getDiscardLockPoint();
                        yield* S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, t => {
                            card.targetPosition.x = lerpTime(card.targetPosition.x, discardPoint.x, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.targetPosition.y = lerpTime(card.targetPosition.y, discardPoint.y, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.scale = lerpTime(card.scale, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                            card.update();
                        })();
                        card.snap();
                        scene.discardHand.cards.push(card);
                    }
                };
            });

            yield* S.simul(...moveScripts)();

            // Return discard if it was in your hand
            if (Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player) {
                scene.discardHand = scene.hand;
                scene.hands[Main.gamestate.players.indexOf(Main.player)] = new Hand(scene, scene.getHandOffScreenPoint(),
                                        { type: 'normal', cardIds: Main.gamestate.hand, activeWonder: scene.topWonder, validMoves: Main.gamestate.validMoves });
                scene.hand.snap();

                let handPosition = scene.hand.getPosition();
                let targetHandPosition = scene.discardHand.getPosition();
                let discardHandPosition = scene.discardHand.getPosition();
                let targetDiscardHandPosition = scene.discardPile.getDiscardLockPoint();

                scene.discardHand.state = { type: 'back', moved: false };
                yield* S.wait(0.4)();

                let lerpt = 0;
                yield* S.doOverTime(0.3, t => {
                    lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                    scene.hand.x = lerpTime(handPosition.x, targetHandPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                    scene.hand.y = lerpTime(handPosition.y, targetHandPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);

                    scene.discardHand.x = lerpTime(discardHandPosition.x, targetDiscardHandPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                    scene.discardHand.y = lerpTime(discardHandPosition.y, targetDiscardHandPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                })();

                yield* S.wait(0.2)();
            }

            let isEndOfAge = gamestate.state === 'GAME_COMPLETE' || gamestate.age !== Main.gamestate.age || gamestate.hand.length < 2;

            if (isEndOfAge) {
                // Discard all non-last-players cards
                let currentHandPositions = scene.hands.map(hand => hand.getPosition());
                let targetHandPosition = scene.discardPile.getDiscardLockPoint();

                scene.hands.forEach(hand => hand.setZIndex(C.Z_INDEX_CARD_MOVING));

                let discardScripts: Script.Function[] = [];

                for (let i = 0; i < scene.hands.length; i++) {
                    if (!contains(gamestate.lastCardPlayers, gamestate.players[i])) {
                        discardScripts.push(function*() {
                            let lerpt = 0;
                            yield* S.doOverTime(0.3, t => {
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                                scene.hands[i].state = { type: 'back', moved: false };
                                scene.hands[i].x = lerpTime(currentHandPositions[i].x, targetHandPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                                scene.hands[i].y = lerpTime(currentHandPositions[i].y, targetHandPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                                scene.hands[i].scale = lerpTime(scene.hands[i].scale, 1, Math.tan(Math.PI/2*lerpt), Main.delta);
                            })();
                            scene.discardHand.cards.push(...scene.hands[i].cards.splice(0));
                        });
                    }
                }

                yield* S.simul(...discardScripts)();

                yield* S.wait(0.5)();
            }

            if (gamestate.state === 'LAST_CARD_MOVE') {
                // Nothing
            } else if (gamestate.state === 'DISCARD_MOVE') {
                if (gamestate.discardMoveQueue[0] === Main.player) {
                    // Replace hand with discard pile
                    scene.discardHand.setAllCardState({ type: 'in_hand_moving' });
                    let handPosition = scene.hand.getPosition();
                    let targetHandPosition = scene.getHandOffScreenPoint();
                    let discardHandPosition = scene.discardHand.getPosition();
                    let discardTargetPosition = scene.getHandPosition(gamestate.players.indexOf(Main.player));

                    let lerpt = 0;
                    yield* S.doOverTime(0.3, t => {
                        lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                        scene.hand.x = lerpTime(handPosition.x, targetHandPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                        scene.hand.y = lerpTime(handPosition.y, targetHandPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);

                        scene.discardHand.x = lerpTime(discardHandPosition.x, discardTargetPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                        scene.discardHand.y = lerpTime(discardHandPosition.y, discardTargetPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                    })();
    
                    yield* S.wait(0.2)();

                    scene.discardHand.destroy();
                    scene.discardHand.createWithData({ type: 'normal', cardIds: gamestate.discardedCards, activeWonder: scene.topWonder, validMoves: gamestate.validMoves });
                    scene.discardHand.snap();
                    scene.discardHand.state = { type: 'normal' };
                    
                    yield* S.wait(0.4)();
                    scene.discardHand.snap();
                }
            } else if (isEndOfAge) {
                // End of age
                let p = gamestate.players.indexOf(Main.player);
                let l = mod(p-1, gamestate.players.length);
                let r = mod(p+1, gamestate.players.length);

                // Military conflicts
                let militaryShowings = getMilitaryShowings(gamestate);
                for (let showings of militaryShowings) {
                    let showingsAnimations = range(0, showings.length-1).map(i => showings[i] ? S.chain(
                        S.call(() => {
                            let showing = showings[i];
                            scene.militaryOverlays[i].setType(showing.type);
                            if (showing.type !== 'diplomacy') {
                                scene.militaryOverlays[i].setShields(showing.shields);
                            }
                        }),
                        S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, t => {
                            scene.militaryOverlays[i].alpha = t;
                        }),
                        S.wait(C.ANIMATION_MILITARY_WAIT_TIME),
                        S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, t => {
                            scene.militaryOverlays[i].alpha = 1-t;
                        })
                    ) : undefined).filter(s => s);
                    yield* S.simul(...showingsAnimations)();
                }

                // Distribute tokens
                let militaryTokenDistributionScripts = gamestate.players.map(player => {
                    let pi = gamestate.players.indexOf(player);
                    let newTokenIndices: number[] = [];
                    for (let i = scene.wonders[pi].militaryTokenRack.getTokenCount(); i < gamestate.playerData[player].militaryTokens.length; i++) {
                        newTokenIndices.push(i);
                    }
                    return S.chain(...newTokenIndices.map(i => animateGiveMilitaryToken(scene, gamestate, player, gamestate.playerData[player].militaryTokens[i])));
                });

                yield* S.simul(...militaryTokenDistributionScripts)();
                yield* S.wait(0.5)();

                // Remove diplomacies if applicable
                for (let player of gamestate.diplomacyPlayers) {
                    let tokens = gamestate.playerData[player].diplomacyTokens;
                    let wonder = scene.wonders[gamestate.players.indexOf(player)];
                    wonder.adjustToDiplomacy(tokens > 0);

                    let token = new DiplomacyToken();
                    let tokenPos = wonder.getDiplomacyTokenPosition(wonder.diplomacyTokenRack.getTokenCount()-1);
                    token.x = tokenPos.x;
                    token.y = tokenPos.y;
                    token.addToGame();
                    wonder.diplomacyTokenRack.removeToken();
                    let targetPosition = scene.getSourceSinkPosition();
                    let lerpt = 0;
                    yield* S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, t => {
                        lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                        token.x = lerpTime(tokenPos.x, targetPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                        token.y = lerpTime(tokenPos.y, targetPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                        token.scale = lerpTime(1, 0, Math.tan(Math.PI/2*lerpt), Main.delta);
                    })();
                    token.removeFromGame();
                }

                if (gamestate.state !== 'GAME_COMPLETE') {
                    // Deal new cards
                    let hands: Hand[] = gamestate.players.map(player => undefined);
                    let entryPoint = scene.getHandOffScreenPoint();

                    hands[p] = new Hand(scene, entryPoint, { type: 'normal', cardIds: gamestate.hand, activeWonder: scene.topWonder, validMoves: gamestate.validMoves });
                    hands[p].state = { type: 'back', moved: false };
                    hands[p].snap();

                    for (let i = 0; i < gamestate.players.length; i++) {
                        if (i === p) continue;
                        hands[i] = new Hand(scene, entryPoint, { type: 'back', age: gamestate.age, player: gamestate.players[i], flankDirection: 1 });
                        hands[i].state = { type: 'back', moved: false };
                        hands[i].snap();
                    }

                    hands.map(hand => hand.setZIndex(C.Z_INDEX_CARD_MOVING));

                    let startPosition = hands[0].getPosition();
                    let endPosition = scene.getHandPosition(p);

                    let lerpt = 0;
                    yield* S.doOverTime(0.3, t => {
                        lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                        for (let hand of hands) {
                            hand.x = lerpTime(startPosition.x, endPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                            hand.y = lerpTime(startPosition.y, endPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                            hand.update();
                        }
                    })();

                    yield* S.wait(0.2)();

                    let i = l;
                    for (let count = 0; count < gamestate.players.length-1; count++) {
                        let startPosition = hands[i].getPosition();
                        let endPosition = scene.getHandPosition(i);

                        let lerpt = 0;
                        yield* S.doOverTime(0.2, t => {
                            lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                            hands[i].x = lerpTime(startPosition.x, endPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                            hands[i].y = lerpTime(startPosition.y, endPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                            hands[i].scale = lerpTime(hands[i].scale, C.HAND_FLANK_SCALE, Math.tan(Math.PI/2*lerpt), Main.delta);
                            hands[i].update();
                        })();
                        hands[i].snap();

                        i = mod(i-1, gamestate.players.length);
                    }

                    scene.hands[p] = hands[p];
                    hands[p].state = { type: 'normal' };
                    yield* S.wait(0.4)();
                    hands[p].snap();
                }
            } else {  
                // Rotate all cards  
                let currentHandPositions = scene.hands.map(hand => hand.getPosition());
                let targetHandPositions = [...currentHandPositions];
                let newHandi: number;
                if (Main.gamestate.age % 2 === 0) {
                    targetHandPositions.unshift(targetHandPositions.pop());
                    newHandi = mod(Main.gamestate.players.indexOf(Main.player)+1, Main.gamestate.players.length);
                } else {
                    targetHandPositions.push(targetHandPositions.shift());
                    newHandi = mod(Main.gamestate.players.indexOf(Main.player)-1, Main.gamestate.players.length);
                }

                scene.hand.state = { type: 'back', moved: false };
                yield* S.wait(0.5)();

                scene.hands.forEach(hand => hand.setZIndex(C.Z_INDEX_CARD_MOVING));

                let lerpt = 0;
                yield* S.doOverTime(0.3, t => {
                    lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                    for (let i = 0; i < scene.hands.length; i++) {
                        scene.hands[i].x = lerpTime(currentHandPositions[i].x, targetHandPositions[i].x, Math.tan(Math.PI/2*lerpt), Main.delta);
                        scene.hands[i].y = lerpTime(currentHandPositions[i].y, targetHandPositions[i].y, Math.tan(Math.PI/2*lerpt), Main.delta);

                        if (i === newHandi) {
                            scene.hands[i].scale = lerpTime(scene.hands[i].scale, 1, Math.tan(Math.PI/2*lerpt), Main.delta);
                        } else {
                            scene.hands[i].scale = lerpTime(scene.hands[i].scale, C.HAND_FLANK_SCALE, Math.tan(Math.PI/2*lerpt), Main.delta);
                        }
                    }
                })();

                yield* S.wait(0.2)();

                scene.hands[newHandi].destroy();
                scene.hands[newHandi].createWithData({ type: 'normal', cardIds: gamestate.hand, activeWonder: scene.hand.activeWonder, validMoves: gamestate.validMoves });
                scene.hands[newHandi].snap();
                scene.hands[newHandi].state = { type: 'normal' };

                yield* S.wait(0.5)();
                scene.hands[newHandi].snap();
            }
        });

        return result;
    }

    function diffPoints(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let oldPoints = Main.gamestate.playerData[player].pointsDistribution.total;
        let newPoints = gamestate.playerData[player].pointsDistribution.total;
        let playeri = Main.gamestate.players.indexOf(player);

        if (newPoints === oldPoints) return;

        result.scripts.push(function*() {
            let pointsText = scene.wonders[playeri].pointsText;

            pointsText.style.color = '#FF0000';
            
            yield* S.doOverTime(1, t => {
                pointsText.textContent = `${Math.round(lerp(oldPoints, newPoints, t))}`;
            })();

            pointsText.style.color = '#FFFFFF';
        });
    }

    function diffGold(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let oldGold = Main.gamestate.playerData[player].gold;
        let newGold = gamestate.playerData[player].gold;
        let playeri = Main.gamestate.players.indexOf(player);

        if (newGold === oldGold) return;

        result.scripts.push(function*() {
            let goldText = scene.wonders[playeri].goldText;

            goldText.style.color = '#FF0000';
            
            yield* S.doOverTime(1, t => {
                goldText.textContent = `${Math.round(lerp(oldGold, newGold, t))}`;
            })();

            goldText.style.color = ArtCommon.goldColorHtml;
        });
    }

    function diffCurrentMove(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let oldMove = Main.gamestate.playerData[player].currentMove;
        let newMove = gamestate.playerData[player].currentMove;
        let playeri = Main.gamestate.players.indexOf(player);

        // Reflect current move.
        if (player === Main.player && !Main.isMoveImmune) {
            result.scripts.push(function*() {
                if (!scene.isPaymentMenuActive) {
                    scene.hand.reflectMove(newMove);
                }
            });
            return;
        }

        if (API.eqMove(newMove, oldMove)) return;

        result.scripts.push(function*() {
            if (!oldMove && newMove) {
                if (Main.gamestate.state !== 'DISCARD_MOVE') scene.hands[playeri].makeMove();
            } else {
                scene.hands[playeri].undoMove();
            }
        });
    }

    function diffCurrentWonderSideChoices(gamestate: API.GameState, result: DiffResult) {
        if (!(Main.scene instanceof ChooseWonderScene)) return;
        let scene: ChooseWonderScene = Main.scene;

        for (let player of gamestate.players) {
            let currentMove = gamestate.playerData[player].currentMove;
            if (player === Main.player) {
                if (currentMove && !Main.isMoveImmune) {
                    result.scripts.push(function*() {
                        scene.selectSide(currentMove.side);
                    });
                }
            } else {
                result.scripts.push(function*() {
                    scene.setCurrentlyMoved(player, !!currentMove);
                });
            }
        }
    }

    function diffDiplomacyPreConflict(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let gainedTokens = gainedDiplomacyTokens(gamestate, player);
        if (gainedTokens <= 0) return;

        // Distribute tokens
        let pi = gamestate.players.indexOf(player);
        let newTokenIndices: number[] = [];
        for (let i = Main.gamestate.playerData[player].diplomacyTokens; i < Main.gamestate.playerData[player].diplomacyTokens + gainedTokens; i++) {
            newTokenIndices.push(i);
        }

        result.scripts.push(S.chain(
            S.call(() => {
                scene.wonders[gamestate.players.indexOf(player)].adjustToDiplomacy(hasDiplomacyTokenAtStartOfTurn(gamestate, player));
            }),
            S.wait(0.5),
            S.simul(...newTokenIndices.map(i => function*() {
                let sourceSink = scene.getSourceSinkPosition();
                let token = new DiplomacyToken();
                token.x = sourceSink.x;
                token.y = sourceSink.y;
                token.addToGame();
                let targetPosition = scene.wonders[pi].getDiplomacyTokenPosition(i);
                let lerpt = 0;
                yield* S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, t => {
                    lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                    token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                    token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                })();
                scene.wonders[gamestate.players.indexOf(player)].addDiplomacyToken();
                token.removeFromGame();
            })),
            S.wait(0.5)
        ));
    }

    function diffMilitaryTokensPreConflict(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let oldTokens = Main.gamestate.playerData[player].militaryTokens;
        let newTokens = gamestate.playerData[player].militaryTokens;

        if (gamestate.age > Main.gamestate.age || gamestate.state === 'GAME_COMPLETE') {
            newTokens = newTokens.slice(0, newTokens.length - gamestate.playerData[player].gainedMilitaryTokensFromConflict.length);
        }

        if (equalsArray(oldTokens, newTokens)) return;

        // Diff the lists
        let removedIndices: number[] = [];
        let addedIndices: number[] = [];

        let i = 0, j = 0;
        while (i < oldTokens.length && j < newTokens.length) {
            if (oldTokens[i] === newTokens[j]) {
                i++;
                j++;
                continue;
            }
            removedIndices.push(i);
            i++;
        }

        if (j >= newTokens.length) {
            removedIndices.push(...range(i, oldTokens.length-1));
        }

        if (i >= oldTokens.length) {
            addedIndices.push(...range(j, newTokens.length-1));
        }

        console.log(player, oldTokens, removedIndices, newTokens, addedIndices);

        let scripts = [...addedIndices.map(j => animateGiveMilitaryToken(scene, gamestate, player, newTokens[j]))];

        result.scripts.push(S.chain(...scripts));
    }

    function diffDebtTokens(gamestate: API.GameState, player: string, result: DiffResult) {
        if (!(Main.scene instanceof GameScene)) return;
        let scene: GameScene = Main.scene;

        let oldTokens = Main.gamestate.playerData[player].debtTokens;
        let newTokens = gamestate.playerData[player].debtTokens;

        if (oldTokens >= newTokens) return;

        result.scripts.push(S.chain(...range(1, newTokens-oldTokens).map(j => animateGiveDebtToken(scene, gamestate, player))));
    }

    function animateGoldMovement(fromPos: PIXI.Point, toPos: PIXI.Point, gold: number) {
        return S.simul(...range(0, gold-1).map(i => S.chain(
            S.wait(0.2*i),
            function*() {
                let goldCoin = new GoldCoin();
                goldCoin.x = fromPos.x;
                goldCoin.y = fromPos.y;
                goldCoin.scale = 0;
                goldCoin.addToGame();

                let lerpt = 0;
                yield* S.doOverTime(C.ANIMATION_GOLD_COIN_MOVE_TIME, t => {
                    lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                    goldCoin.x = lerpTime(fromPos.x, toPos.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                    goldCoin.y = lerpTime(fromPos.y, toPos.y, Math.tan(Math.PI/2*lerpt), Main.delta);
                    goldCoin.scale = 1 - (2*lerpt - 1)**10;
                })();

                goldCoin.removeFromGame();
            }
        )));
    }

    function animateGiveMilitaryToken(scene: GameScene, gamestate: API.GameState, player: string, value: number) {
        return function*() {
            let wonder = scene.wonders[gamestate.players.indexOf(player)];
            let sourceSink = scene.getSourceSinkPosition();
            let token = new MilitaryToken(value);
            token.x = sourceSink.x;
            token.y = sourceSink.y;
            token.addToGame();
            let targetPosition = wonder.getMilitaryTokenWorldPosition(wonder.militaryTokenRack.getTokenCount());
            let lerpt = 0;
            yield* S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, t => {
                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
            })();
            wonder.addMilitaryToken(value);
            token.removeFromGame();
        }
    }

    function animateGiveDebtToken(scene: GameScene, gamestate: API.GameState, player: string) {
        return function*() {
            let wonder = scene.wonders[gamestate.players.indexOf(player)];
            let sourceSink = scene.getSourceSinkPosition();
            let token = new DebtToken();
            token.x = sourceSink.x;
            token.y = sourceSink.y;
            token.addToGame();
            let targetPosition = wonder.getDebtTokenWorldPosition(wonder.debtTokenRack.getTokenCount());
            let lerpt = 0;
            yield* S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, t => {
                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI/2*t**2), Main.delta);
                token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI/2*lerpt), Main.delta);
                token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI/2*lerpt), Main.delta);
            })();
            wonder.addDebtToken();
            token.removeFromGame();
        }
    }

    function getMilitaryShowings(gamestate: API.GameState): MilitaryShowing[][] {
        if (gamestate.fightingPlayers.length < 2) {
            return [gamestate.players.map(player => contains(gamestate.diplomacyPlayers, player) ? { type: 'diplomacy' } : { type: 'tie', shields: gamestate.playerData[player].totalShields })];
        }

        if (contains(gamestate.diplomacyPlayers, Main.player)) {
            let showings = filledMilitaryShowings(gamestate, true, true);
            showings[gamestate.players.indexOf(Main.player)] = { type: 'diplomacy' };

            return [showings];
        } else {
            let showings1 = filledMilitaryShowings(gamestate, true, false);
            let showings2 = filledMilitaryShowings(gamestate, false, true);
            return [showings1, showings2];
        }
    }

    function filledMilitaryShowings(gamestate: API.GameState, left: boolean, right: boolean): MilitaryShowing[] {
        let showings: MilitaryShowing[] = gamestate.players.map(player => undefined);
        let p = gamestate.players.indexOf(Main.player);
        
        let l: number = p;
        if (left) {
            l = mod(p-1, gamestate.players.length);
            while(contains(gamestate.diplomacyPlayers, gamestate.players[l])) {
                showings[l] = { type: 'diplomacy' };
                l = mod(p-1, gamestate.players.length);
            }
        }

        let r: number = p;
        if (right) {
            r = mod(p+1, gamestate.players.length);
            while(contains(gamestate.diplomacyPlayers, gamestate.players[r])) {
                showings[r] = { type: 'diplomacy' };
                r = mod(p+1, gamestate.players.length);
            }
        }

        let lplayer = gamestate.players[l];
        let rplayer = gamestate.players[r];

        let lshields = gamestate.playerData[lplayer].totalShields;
        let rshields = gamestate.playerData[rplayer].totalShields;

        if (lshields > rshields) {
            showings[l] = { type: 'victory', shields: lshields };
            showings[r] = { type: 'defeat', shields: rshields };
        } else if (lshields < rshields) {
            showings[l] = { type: 'defeat', shields: lshields };
            showings[r] = { type: 'victory', shields: rshields };
        } else {
            showings[l] = { type: 'tie', shields: lshields };
            showings[r] = { type: 'tie', shields: rshields };
        }

        return showings;
    }

    function hasDiplomacyTokenAtStartOfTurn(gamestate: API.GameState, player: string) {
        return gamestate.playerData[player].diplomacyTokens > 0 || gainedDiplomacyTokens(gamestate, player) > 0;
    }

    function gainedDiplomacyTokens(gamestate: API.GameState, player: string) {
        let diff = gamestate.playerData[player].diplomacyTokens - Main.gamestate.playerData[player].diplomacyTokens;
        if ((gamestate.age > Main.gamestate.age || gamestate.state === 'GAME_COMPLETE') && contains(gamestate.diplomacyPlayers, player)) {
            diff++;
        }
        return diff;
    }
}