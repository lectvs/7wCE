class Main {
    static gameid: string;
    static player: string;
    static gamestate: API.GameState;

    static mouseDown: boolean = false;

    static scene: Scene;

    static time: number = 0;
    static delta: number = 0;

    static scriptManager: ScriptManager;

    static get initialized() { return !!this.scene; }
    static get isHost() { return this.gamestate.host === this.player; }

    static start() {
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);

        this.mouseDown = false;

        this.scriptManager = new ScriptManager();

        let params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta / 60;
            this.time += this.delta;
            this.update();
        });

        API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                return;
            }

            console.log('Got game state:', gamestate);
            this.setupGame(gamestate);
        });
    }

    static setupGame(gamestate: API.GameState) {
        this.gamestate = gamestate;
        this.scene = new Scene();
        this.scene.create();
        this.sendUpdate();
    }

    static update() {
        if (this.scene) this.scene.update();
        this.scriptManager.update();
    }

    static sendUpdate() {
        if (this.gamestate.state === 'GAME_COMPLETE') return;
        this.scriptManager.runScript(S.chain(
            S.wait(0.5),
            S.call(() => {
                if (this.isHost) this.updateAndGetGameState();
                else this.getGameState();
                this.updateBotMoves();
            })
        ));
    }

    static getGameState() {
        API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                this.sendUpdate();
                return;
            }

            //console.log('Refreshed gamestate:', gamestate);

            if (gamestate.turn < Main.gamestate.turn) {
                Main.error(`Error: local turn (${Main.gamestate.turn}) is greater than the game's (${gamestate.turn})?`);
                this.sendUpdate();
                return;
            } else if (gamestate.turn === Main.gamestate.turn) {
                let diffResult = GameStateDiffer.diffNonTurn(gamestate, true);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        //Main.scene.hand.reflectMove(gamestate.playerData[Main.player].currentMove);
                        this.sendUpdate();
                    })
                ));
            } else {
                let diffResult = GameStateDiffer.diffTurn(gamestate);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        this.scene.destroy();
                        this.scene.create();
                        this.sendUpdate();
                    })
                ));
            }
        });
    }

    static updateAndGetGameState() {
        API.updategame(Main.gameid, (wasUpdate: boolean, error: string) => {
            if (error) {
                Main.error(error);
            } else {
                if (wasUpdate) console.log('Updated game');
            }
            this.getGameState();
        });
    }

    static submitMove(move: API.Move) {
        API.submitmove(Main.gameid, Main.gamestate.turn, Main.player, move, (error: string) => {
            if (error) {
                Main.error(error);
                //this.deselect();
                //Main.undoMove();
                return;
            }
            console.log('Submitted move:', move);
        });
    }

    static undoMove() {
        API.undomove(this.gameid, this.gamestate.turn, this.player, (error: string) => {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Undo move successful');
        })
    }

    static updateBotMoves() {
        if (!this.isHost) return;
        for (let player of this.gamestate.players) {
            if (player.startsWith('BOT') && !this.gamestate.playerData[player].currentMove) {
                let botPlayer = player;
                let turn = this.gamestate.turn;
                API.getvalidmoves(this.gameid, this.gamestate.turn, botPlayer, (validMoves: API.Move[], error: string) => {
                    if (error) {
                        Main.error(error);
                        return;
                    }

                    if (turn !== this.gamestate.turn || validMoves.length === 0) return;

                    let move = Bot.getMove(validMoves);
                    API.submitmove(this.gameid, this.gamestate.turn, botPlayer, move, (error: string) => {
                        if (error) {
                            Main.error(error);
                            return;
                        }
                        console.log('Successfully submitted bot move:', move);
                    })
                });
            }
        }
    }

    static stop() {
        this.scriptManager.reset();
    }

    static error(text: string) {
        console.error(text);

        // let errorBox = Shapes.filledRect(0, 0, Main.width, 50, 0xFF0000);
        // errorBox.addChild(Shapes.centeredText(Main.width/2, errorBox.height/2, text, 0.25, 0x000000));

        // let app = this.app;
        // this.scriptManager.runScript(function*() {
        //     errorBox.position.set(0, -50);
        //     app.stage.addChild(errorBox);

        //     yield* S.doOverTime(0.1, t => errorBox.position.y = 50*t-50)();
        //     yield* S.wait(2)();
        //     yield* S.doOverTime(0.1, t => errorBox.position.y = -50*t)();

        //     app.stage.removeChild(errorBox);
        // });
    }

    static getGameY() {
        return document.getElementById('status').clientHeight;
    }
}
