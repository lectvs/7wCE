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

        if (!this.username) {
            this.error('player must be passed in queryParameters', true);
            return;
        }

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta/60;
            this.update();
        });

        API.getuser(this.username, (user: API.User, error: string) => {
            if (error) {
                this.error(error, true);
                return;
            }
            console.log('Fetched user:', user);
            this.user = user;
            this.load();
        });
    }

    static load() {
        this.wonderPreferenceList = new WonderPreferenceList();
        this.wonderPreferenceList.create();
        this.getInvites();
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
        API.getinvites(this.username, (result: API.GetInvitesResponse, error: string) => {
            if (error) {
                this.error(error);
                this.sendUpdate();
                return;
            }
            this.inviteGameids = result.gameids;
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