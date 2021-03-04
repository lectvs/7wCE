namespace GameStateDiffer {
    export type DiffResult = {
        scripts: Script.Function[];
    }

    export function diffNonTurn(gamestate: API.GameState) {
        let result: DiffResult = {
            scripts: []
        };

        for (let player of Main.gamedata.players) {
            diffGold(gamestate, player, result);
            diffCurrentMove(gamestate, player, result);
        }

        return result;
    }

    export function diffTurn(gamestate: API.GameState): DiffResult {
        let result: DiffResult = diffNonTurn(gamestate);

        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return;
        }

        result.scripts.push(function*() {
            // if (move.action === 'play') {
                
            // }
        });

        // result.scripts.push(function*() {
        //     Main.scene.hand.flip();
        //     yield* S.wait(0.1)();
        //     Main.scene.hand.collapse();
        //     yield* S.wait(0.5)();

        //     Main.scene.hand.uncollapse();
        //     yield* S.wait(0.5)();
        // });

        return result;
    }

    function diffGold(gamestate: API.GameState, player: string, result: DiffResult) {
        let oldGold = Main.gamestate.playerData[player].gold;
        let newGold = gamestate.playerData[player].gold;
        let playeri = Main.gamedata.players.indexOf(player);

        if (newGold === oldGold) return;

        result.scripts.push(function*() {
            let goldText = Main.scene.wonders[playeri].goldText;

            goldText.style.fill = 0xFF0000;
            
            yield* S.doOverTime(1, t => {
                goldText.text = `${Math.round(lerp(oldGold, newGold, t))}`;
            })();

            goldText.style.fill = 0xFFFFFF;
        });
    }

    function diffCurrentMove(gamestate: API.GameState, player: string, result: DiffResult) {
        let oldMove = Main.gamestate.playerData[player].currentMove;
        let newMove = gamestate.playerData[player].currentMove;
        let playeri = Main.gamedata.players.indexOf(player);

        // Always reflect current move.
        if (player === Main.player) {
            result.scripts.push(function*() {
                Main.scene.hand.reflectMove(newMove);
            });
            return;
        }

        if (API.eqMove(newMove, oldMove)) return;

        result.scripts.push(function*() {
            let wonder = Main.scene.wonders[playeri];
            if (!oldMove && newMove) {
                wonder.makeMove();
            } else {
                wonder.undoMove();
            }
        });
    }
}