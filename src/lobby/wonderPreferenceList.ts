class WonderPreferenceList {
    private wonderPreferences: WonderPreference[];

    constructor() {
        this.wonderPreferences = [];
    }

    update() {
        this.wonderPreferences.sort((wp1, wp2) => wp1.y - wp2.y);
        for (let i = 0; i < this.wonderPreferences.length; i++) {
            this.wonderPreferences[i].snapPosition = this.getPreferenceElementPos(i);
            this.wonderPreferences[i].update();
        }
    }

    create() {
        this.wonderPreferences = [];

        for (let i = 0; i < LobbyMain.user.wonder_preferences.length; i++) {
            let pos = this.getPreferenceElementPos(i);
            let wonderPreference = new WonderPreference(this, LobbyMain.user.wonder_preferences[i], pos);
            wonderPreference.x = pos.x;
            wonderPreference.y = pos.y;
            wonderPreference.addToPage();
            this.wonderPreferences.push(wonderPreference);
        }
    }

    setWonderPreferences() {
        LobbyMain.setWonderPreferences(this.wonderPreferences.map(wp => wp.preference));
    }

    private getPreferenceElementPos(i: number) {
        return new PIXI.Point(0, 32*i);
    }
}