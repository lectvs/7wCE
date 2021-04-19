class WonderPreference extends GameElement {
    private wonderPreferenceList: WonderPreferenceList;
    preference: API.WonderPreference;

    dragging: DraggingData;
    snapPosition: PIXI.Point;

    constructor(wonderPreferenceList: WonderPreferenceList, preference: API.WonderPreference, snapPosition: PIXI.Point) {
        super();
        this.wonderPreferenceList = wonderPreferenceList;
        this.preference = preference;
        this.snapPosition = snapPosition;

        this.div.className = 'preferenceelement';

        let p = this.div.appendChild(document.createElement('p'));
        p.className = 'preferenceelementtext';
        p.innerText = preference.name;

        // Dragging
        this.div.onmousedown = (event: MouseEvent) => {
            if (event.button !== 0) return;
            this.dragging = {
                offsetx: this.x - LobbyMain.mouseX,
                offsety: this.y - LobbyMain.mouseY
            };
        };
    }

    update() {
        if (this.dragging) {
            this.x = LobbyMain.mouseX + this.dragging.offsetx;
            this.y = LobbyMain.mouseY + this.dragging.offsety;
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;

            if (!LobbyMain.mouseDown) {
                this.dragging = null;
                this.wonderPreferenceList.setWonderPreferences();
            }
        } else {
            this.x = this.snapPosition.x;
            this.y = this.snapPosition.y;
            this.zIndex = C.Z_INDEX_CARD_HAND;
        }
    }

    addToPage() {
        this.addToGame(<HTMLDivElement>document.getElementById('preferencelist'));
    }
}