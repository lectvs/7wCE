class LobbyMain {
    static username: string;
    static user: API.User;
    static inviteGameids: string[];
    static currentError: string;

    static delta: number = 0;
    static mouseX: number = 0;
    static mouseY: number = 0;
    static mouseDown: boolean = false;

    static scriptManager: ScriptManager;

    static wonderPreferenceList: WonderPreferenceList;
    static createGameSection: CreateGameSection;

    static start() {
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);

        window.onmousemove = (event: MouseEvent) => {
            event.preventDefault();
            this.mouseX = event.pageX;
            this.mouseY = event.pageY;
        }

        this.mouseDown = false;
        this.scriptManager = new ScriptManager(() => this.delta);

        let params = new URLSearchParams(window.location.search);
        this.username = params.get('player');

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta/60;
            this.update();
        });

        if (!this.username) {
            this.error('player must be passed in queryParameters', true);
            return;
        }

        API.getusers([this.username], (users: Dict<API.User>, error: string) => {
            if (error) {
                this.error(error, true);
                return;
            }

            if (!users[this.username]) {
                this.error(`User ${this.username} does not exist`, true);
                return;
            }
            console.log('Fetched user:', users[this.username]);
            this.user = users[this.username];
            this.load();
        });
    }

    static load() {
        this.wonderPreferenceList = new WonderPreferenceList();
        this.wonderPreferenceList.create();
        this.createGameSection = new CreateGameSection();
        this.createGameSection.create();
        this.getInvites();
    }

    static createGame() {
        let options = this.createGameSection.getOptions();
        API.creategame(options, (gameid: string, error: string) => {
            if (error) {
                this.error('Failed to create game: ' + error);
                return;
            }
            console.log('Created game with id:', gameid);
            window.location.href = `./game.html?gameid=${gameid}&player=${this.username}`;
        });

        // Disable button for a bit to avoid duplicate game creation
        this.scriptManager.runScript(function*() {
            let button = <HTMLButtonElement>document.getElementById('createsectionbutton');
            button.disabled = true;
            button.style.backgroundColor = '#888888';
            button.querySelector('p').innerText = 'Creating...';
            yield* S.wait(3)();
            button.disabled = false;
            button.style.backgroundColor = '#FFFFFF';
            button.querySelector('p').innerText = 'Create Game';
        });
    }

    static update() {
        this.scriptManager.update();
        if (this.wonderPreferenceList) this.wonderPreferenceList.update();
    }

    static sendUpdate() {
        this.scriptManager.runScript(S.chain(
            S.wait(2),
            S.call(() => {
                this.getInvites();
            })
        ));
    }

    static getInvites() {
        API.getinvites(this.username, (gameids: string[], error: string) => {
            if (error) {
                this.error(error);
                this.sendUpdate();
                return;
            }
            this.inviteGameids = gameids;
            this.setStatus();
            this.sendUpdate();
        });
    }

    static setWonderPreferences(preferences: API.WonderPreference[]) {
        API.setwonderpreferences(this.username, preferences, (error: string) => {
            console.log(preferences)
            if (error) {
                this.error(error);
                return;
            }
            console.log('Successfully set wonder preferences');
        });
    }

    static setStatus() {
        let status = <HTMLParagraphElement>document.querySelector('#status');
        let statusText = <HTMLParagraphElement>document.querySelector('#status > p');

        if (this.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.textContent = this.currentError;
            return;
        }

        status.style.backgroundColor = C.OK_BG_COLOR;
        status.style.color = C.OK_TEXT_COLOR;

        if (this.inviteGameids && this.inviteGameids.length > 0) {
            let links = this.inviteGameids.map(gameid => `<a href="./game.html?gameid=${gameid}&player=${this.username}">${gameid}</a>`);
            let text = `Current Games: ${links.join(', ')}`;
            if (statusText.innerHTML !== text) statusText.innerHTML = text;
        } else {
            statusText.textContent = "No current games"
        }
    }

    static error(error: string, fatal: boolean = false) {
        console.error(error);
        this.scriptManager.runScript(function*() {
            LobbyMain.currentError = error;
            LobbyMain.setStatus();
            yield* S.wait(3)();
            if (!fatal) {
                LobbyMain.currentError = undefined;
                LobbyMain.setStatus();
            }
        });
    }
}