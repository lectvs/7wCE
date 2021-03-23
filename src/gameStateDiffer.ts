namespace GameStateDiffer {
    export type DiffResult = {
        scripts: Script.Function[];
    }

    export function diffNonTurn(gamestate: API.GameState, midturn: boolean) {
        let result: DiffResult = {
            scripts: []
        };

        for (let player of Main.gamestate.players) {
            diffPoints(gamestate, player, result);
            diffGold(gamestate, player, result);
            if (midturn) diffCurrentMove(gamestate, player, result);
        }

        return result;
    }

    export function diffTurn(gamestate: API.GameState): DiffResult {
        let result: DiffResult = diffNonTurn(gamestate, false);

        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return;
        }

        result.scripts.push(function*() {
            // Animate all moves performed by players
            let moveScripts = gamestate.players.map(player => {
                return function*() {
                    let i = gamestate.players.indexOf(player);
                    let hand = Main.scene.hands[i];
                    let lastMove = gamestate.playerData[player].lastMove;
                    if (player === Main.player) {
                        Main.scene.hand.reflectMove(lastMove);
                        return;
                    }
                    if (!lastMove) return;

                    hand.state = { type: 'back', moved: true };
                    yield* S.wait(0.5)();

                    let WAIT_TIME = 1;
                    let MOVE_TIME = 1;

                    if (lastMove.action === 'play') {
                        let card = hand.cards.shift();
                        hand.state = { type: 'back', moved: false };
                        card.destroy();
                        card.create(lastMove.card, gamestate.cards[lastMove.card], false);

                        card.state = { type: 'full', justPlayed: false };
                        yield* S.doOverTime(WAIT_TIME, t => { card.update() })();

                        card.state = { type: 'effect', justPlayed: false };
                        card.zIndex = C.Z_INDEX_CARD_PLAYED;
                        let playedPoint = Main.scene.wonders[i].getNewCardEffectWorldPosition(card);
                        yield* S.doOverTime(MOVE_TIME, t => {
                            card.targetPosition.x = lerp(card.targetPosition.x, playedPoint.x, t**2);
                            card.targetPosition.y = lerp(card.targetPosition.y, playedPoint.y, t**2);
                            card.scale = lerp(card.scale, 1, t**2);
                            card.update();
                        })();
                        card.snap();
                    } else if (lastMove.action === 'wonder') {
                        let card = hand.cards.shift();
                        hand.state = { type: 'back', moved: false };

                        card.checkMarkVisible = false;
                        yield* S.doOverTime(WAIT_TIME, t => { card.update() })();

                        card.state = { type: 'flipped', justPlayed: false };
                        card.zIndex = C.Z_INDEX_CARD_WONDER;
                        let wonderPoint = Main.scene.wonders[i].getCardPositionForStage(lastMove.stage);
                        yield* S.doOverTime(MOVE_TIME, t => {
                            card.targetPosition.x = lerp(card.targetPosition.x, wonderPoint.x, t**2);
                            card.targetPosition.y = lerp(card.targetPosition.y, wonderPoint.y, t**2);
                            card.scale = lerp(card.scale, 1, t**2);
                            card.update();
                        })();
                        card.snap();
                    } else if (lastMove.action === 'throw') {
                        let card = hand.cards.shift();
                        hand.state = { type: 'back', moved: false };

                        card.checkMarkVisible = false;
                        yield* S.doOverTime(WAIT_TIME, t => { card.update() })();

                        let discardPoint = Main.scene.discardPile.getDiscardLockPoint();
                        yield* S.doOverTime(MOVE_TIME, t => {
                            card.targetPosition.x = lerp(card.targetPosition.x, discardPoint.x, t**2);
                            card.targetPosition.y = lerp(card.targetPosition.y, discardPoint.y, t**2);
                            card.scale = lerp(card.scale, 1, t**2);
                            card.update();
                        })();
                        card.snap();
                    }
                };
            });

            yield* S.simul(...moveScripts)();

            // Return discard if it was in your hand
            if (Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player) {
                Main.scene.discardHand = Main.scene.hand;
                Main.scene.hands[Main.gamestate.players.indexOf(Main.player)] = new Hand('50%', `${-Main.getGameY() - 200}px`, { type: 'normal', cardIds: Main.gamestate.hand, activeWonder: Main.scene.topWonder, validMoves: Main.gamestate.validMoves });
                Main.scene.hand.snap();

                let handPosition = Main.scene.hand.getPositionPixels();
                let targetHandPosition = Main.scene.discardHand.getPositionPixels();
                let discardHandPosition = Main.scene.discardHand.getPositionPixels();
                let targetDiscardHandPosition = Main.scene.discardPile.getDiscardLockPoint();

                Main.scene.discardHand.state = { type: 'moving' };
                yield* S.wait(0.4)();

                let lerpt = 0;
                yield* S.doOverTime(0.3, t => {
                    lerpt = lerp(lerpt, 1, t**2);
                    Main.scene.hand.xs = `${lerp(handPosition.x, targetHandPosition.x, lerpt)}px`;
                    Main.scene.hand.ys = `${lerp(handPosition.y, targetHandPosition.y, lerpt)}px`;

                    Main.scene.discardHand.xs = `${lerp(discardHandPosition.x, targetDiscardHandPosition.x, lerpt)}px`;
                    Main.scene.discardHand.ys = `${lerp(discardHandPosition.y, targetDiscardHandPosition.y, lerpt)}px`;
                })();

                yield* S.wait(0.2)();
            }

            if (gamestate.state === 'LAST_CARD_MOVE') {
                // Discard all non-last-players cards
                let currentHandPositions = Main.scene.hands.map(hand => hand.getPositionPixels());
                let targetHandPosition = Main.scene.discardPile.getDiscardLockPoint();

                let lerpt = 0;
                yield* S.doOverTime(0.3, t => {
                    lerpt = lerp(lerpt, 1, t**2);
                    for (let i = 0; i < Main.scene.hands.length; i++) {
                        if (!contains(gamestate.lastCardPlayers, gamestate.players[i])) {
                            Main.scene.hands[i].state = { type: 'moving' };
                            Main.scene.hands[i].xs = `${lerp(currentHandPositions[i].x, targetHandPosition.x, lerpt)}px`;
                            Main.scene.hands[i].ys = `${lerp(currentHandPositions[i].y, targetHandPosition.y, lerpt)}px`;
                            Main.scene.hands[i].scale = lerp(Main.scene.hands[i].scale, 1, lerpt);
                        }
                    }
                })();

                yield* S.wait(0.5)();
            } else if (Main.gamestate.state === 'LAST_CARD_MOVE') {
                // Last card -> end of age... nothing?
            } else if (gamestate.state === 'DISCARD_MOVE') {
                if (gamestate.discardMoveQueue[0] === Main.player) {
                    // Replace hand with discard pile
                    Main.scene.discardHand.setAllCardState({ type: 'in_hand_moving' });
                    let handPosition = Main.scene.hand.getPositionPixels();
                    let targetHandPosition = handPosition.clone();
                    let discardHandPosition = Main.scene.discardHand.getPositionPixels();
                    targetHandPosition.y = -Main.getGameY() - 200;

                    let lerpt = 0;
                    yield* S.doOverTime(0.3, t => {
                        lerpt = lerp(lerpt, 1, t**2);
                        Main.scene.hand.xs = `${lerp(handPosition.x, targetHandPosition.x, lerpt)}px`;
                        Main.scene.hand.ys = `${lerp(handPosition.y, targetHandPosition.y, lerpt)}px`;

                        Main.scene.discardHand.xs = `${lerp(discardHandPosition.x, handPosition.x, lerpt)}px`;
                        Main.scene.discardHand.ys = `${lerp(discardHandPosition.y, handPosition.y, lerpt)}px`;
                    })();
    
                    yield* S.wait(0.2)();

                    Main.scene.discardHand.destroy();
                    Main.scene.discardHand.createWithData({ type: 'normal', cardIds: gamestate.discardedCards, activeWonder: Main.scene.topWonder, validMoves: gamestate.validMoves });
                    Main.scene.discardHand.snap();
                    Main.scene.discardHand.state = { type: 'normal' };
                    
                    yield* S.wait(0.4)();
                    Main.scene.discardHand.snap();
                }
            } else {  
                // Rotate all cards  
                let currentHandPositions = Main.scene.hands.map(hand => hand.getPositionPixels());
                let targetHandPositions = [...currentHandPositions];
                let newHandi: number;
                if (Main.gamestate.age % 2 === 0) {
                    targetHandPositions.unshift(targetHandPositions.pop());
                    newHandi = mod(Main.gamestate.players.indexOf(Main.player)+1, Main.gamestate.players.length);
                } else {
                    targetHandPositions.push(targetHandPositions.shift());
                    newHandi = mod(Main.gamestate.players.indexOf(Main.player)-1, Main.gamestate.players.length);
                }

                Main.scene.hand.state = { type: 'moving' };
                yield* S.wait(0.5)();

                let lerpt = 0;
                yield* S.doOverTime(0.3, t => {
                    lerpt = lerp(lerpt, 1, t**2);
                    for (let i = 0; i < Main.scene.hands.length; i++) {
                        Main.scene.hands[i].xs = `${lerp(currentHandPositions[i].x, targetHandPositions[i].x, lerpt)}px`;
                        Main.scene.hands[i].ys = `${lerp(currentHandPositions[i].y, targetHandPositions[i].y, lerpt)}px`;

                        if (i === newHandi) {
                            Main.scene.hands[i].scale = lerp(C.HAND_FLANK_SCALE, 1, lerpt);
                        } else {
                            Main.scene.hands[i].scale = lerp(1, C.HAND_FLANK_SCALE, lerpt);
                        }
                    }
                })();

                yield* S.wait(0.2)();

                Main.scene.hands[newHandi].destroy();
                Main.scene.hands[newHandi].createWithData({ type: 'normal', cardIds: gamestate.hand, activeWonder: Main.scene.hand.activeWonder, validMoves: gamestate.validMoves });
                Main.scene.hands[newHandi].snap();
                Main.scene.hands[newHandi].state = { type: 'normal' };

                yield* S.wait(0.4)();
                Main.scene.hands[newHandi].snap();
            }
        })

        return result;
    }

    function diffPoints(gamestate: API.GameState, player: string, result: DiffResult) {
        let oldPoints = Main.gamestate.playerData[player].pointsDistribution.total;
        let newPoints = gamestate.playerData[player].pointsDistribution.total;
        let playeri = Main.gamestate.players.indexOf(player);

        if (newPoints === oldPoints) return;

        result.scripts.push(function*() {
            let pointsText = Main.scene.wonders[playeri].pointsText;

            pointsText.style.color = '#FF0000';
            
            yield* S.doOverTime(1, t => {
                pointsText.textContent = `${Math.round(lerp(oldPoints, newPoints, t))}`;
            })();

            pointsText.style.color = '#FFFFFF';
        });
    }

    function diffGold(gamestate: API.GameState, player: string, result: DiffResult) {
        let oldGold = Main.gamestate.playerData[player].gold;
        let newGold = gamestate.playerData[player].gold;
        let playeri = Main.gamestate.players.indexOf(player);

        if (newGold === oldGold) return;

        result.scripts.push(function*() {
            let goldText = Main.scene.wonders[playeri].goldText;

            goldText.style.color = '#FF0000';
            
            yield* S.doOverTime(1, t => {
                goldText.textContent = `${Math.round(lerp(oldGold, newGold, t))}`;
            })();

            goldText.style.color = ArtCommon.goldColorHtml;
        });
    }

    function diffCurrentMove(gamestate: API.GameState, player: string, result: DiffResult) {
        let oldMove = Main.gamestate.playerData[player].currentMove;
        let newMove = gamestate.playerData[player].currentMove;
        let playeri = Main.gamestate.players.indexOf(player);

        // Always reflect current move.
        if (player === Main.player) {
            result.scripts.push(function*() {
                if (!Main.scene.isPaymentMenuActive) {
                    Main.scene.hand.reflectMove(newMove);
                }
            });
            return;
        }

        if (API.eqMove(newMove, oldMove)) return;

        result.scripts.push(function*() {
            if (!oldMove && newMove) {
                Main.scene.wonders[playeri].makeMove();
                Main.scene.hands[playeri].makeMove();
            } else {
                Main.scene.wonders[playeri].undoMove();
                Main.scene.hands[playeri].undoMove();
            }
        });
    }
}