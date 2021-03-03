class Main {
    
    static get width() { return this.app.view.width };
    static get height() { return this.app.view.height };

    static gameid: string;
    static player: string;
    static gamedata: API.GameData;
    static gamestate: API.GameState;

    static mouseDown: boolean;

    static app: PIXI.Application;
    static scene: Scene;

    static initialized: boolean;

    static delta: number = 0;

    static scriptManager: ScriptManager;

    static start() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: 2000,
            antialias: true
        });
        
        document.body.appendChild(this.app.view);
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);
        window.addEventListener('resize', () => this.resize());

        this.mouseDown = false;
        this.initialized = false;

        this.scriptManager = new ScriptManager();

        let params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta / 60;
            this.update();
        });

        API.getgamedata(this.gameid, (gamedata: API.GameData, error: string) => {
            if (error) {
                Main.error('Failed to get game data: ' + error);
                return;
            }

            API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
                if (error) {
                    Main.error('Failed to get game state: ' + error);
                    return;
                }

                console.log('Got game data:', gamedata);
                console.log('Got game state:', gamestate);
                this.setupGame(gamedata, gamestate);
            });
        });
    }

    static setupGame(gamedata: API.GameData, gamestate: API.GameState) {
        this.gamedata = gamedata;
        this.gamestate = gamestate;
        this.initialized = true;

        this.scene = new Scene();
        this.app.stage.addChild(this.scene.mainContainer);
        this.render();

        this.sendUpdateGameState();
    }

    static update() {
        if (this.scene) this.scene.update();
        this.scriptManager.update();
    }

    static render() {
        if (!this.initialized) return;
        this.scene.render();
    }

    static resize() {
        this.app.renderer.resize(window.innerWidth, this.height);
        this.render();
    }

    static sendUpdateGameState() {
        this.scriptManager.runScript(S.chain(
            S.wait(1),
            S.call(() => this.updateGameState())
        ));
    }

    static updateGameState() {
        API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                this.sendUpdateGameState();
                return;
            }

            console.log('Refreshed gamestate:', gamestate);
            if (gamestate.turn < Main.gamestate.turn) {
                Main.error(`Error: local turn (${Main.gamestate.turn}) is greater than the game's (${gamestate.turn})?`);
                this.sendUpdateGameState();
                return;
            } else if (gamestate.turn === Main.gamestate.turn) {
                let diffResult = GameStateDiffer.diffNonTurn(gamestate);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        this.sendUpdateGameState();
                    })
                ));
            } else {
                API.getmovehistory(this.gameid, this.player, (movehistory: API.MoveHistory, error: string) => {
                    if (error) {
                        Main.error('Failed to get move history: ' + error);
                        this.sendUpdateGameState();
                        return;
                    }

                    let diffResult = GameStateDiffer.diffTurn(gamestate, movehistory);
                    this.scriptManager.runScript(S.chain(
                        S.simul(...diffResult.scripts),
                        S.call(() => {
                            this.gamestate = gamestate;
                            console.log('reloading')
                            this.render();
                            this.sendUpdateGameState();
                        })
                    ));
                });
            }
        });
    }

    static stop() {
        this.scriptManager.reset();
    }

    static error(text: string) {
        console.error(text);

        let errorBox = Shapes.filledRect(0, 0, Main.width, 50, 0xFF0000);
        let errorText = new PIXI.Text(text, { fontFamily : 'Arial', fontSize: 50, fill : 0x000000 });
        errorText.anchor.set(0.5, 0.5);
        errorText.scale.set(0.5);
        errorText.position.set(Main.width/2, errorBox.height/2);
        errorBox.addChild(errorText);

        let app = this.app;
        this.scriptManager.runScript(function*() {
            errorBox.position.set(0, -50);
            app.stage.addChild(errorBox);

            yield* S.doOverTime(0.1, t => errorBox.position.y = 50*t-50)();
            yield* S.wait(2)();
            yield* S.doOverTime(0.1, t => errorBox.position.y = -50*t)();

            app.stage.removeChild(errorBox);
        });
    }
}
