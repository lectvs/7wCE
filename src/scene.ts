abstract class Scene {
    popup: Popup;

    update() {

    }

    create() {

    }

    destroy() {

    }

    updatePopup(source: Popup.Source, x: number, y: number) {
        if (this.popup && this.popup.getSource() !== source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
        if (!this.popup) {
            this.popup = (source instanceof Card) ? new CardInfoPopup(source) : (('name' in source) ? new StartingEffectsInfoPopup(source) : new StageInfoPopup(source));
            this.popup.zIndex = C.Z_INDEX_CARD_POPUP;
            this.popup.addToGame();
        }
        this.popup.x = clamp(x, -window.innerWidth/2 + window.pageXOffset, window.innerWidth/2 + window.pageXOffset - this.popup.width);
        this.popup.y = y;
    }

    stopPopup(source: Popup.Source) {
        if (this.popup && this.popup.getSource() === source) {
            this.popup.removeFromGame();
        }
    }

    getWonderPosition(index: number, additionalY: number = 0) {
        let p = Main.gamestate.players.indexOf(Main.player);
        let l = mod(p-1, Main.gamestate.players.length);
        let r = mod(p+1, Main.gamestate.players.length);

        if (index === p) return new PIXI.Point(0, C.WONDER_TOP_Y + additionalY);

        let i: number;
        for (i = 0; i < Math.floor((Main.gamestate.players.length - 1)/2); i++) {
            let dx = (Main.gamestate.players.length === 7 && i === 2) ? C.WONDER_OTHERS_DX_LAST_7P : C.WONDER_OTHERS_DX;
            let y = Main.gamestate.players.length === 4 ? C.WONDER_OTHERS_Y_4P : C.WONDER_OTHERS_Y;
            if (index === l) return new PIXI.Point(-dx, y + C.WONDER_OTHERS_DY*i + additionalY);
            if (index === r) return new PIXI.Point(dx, y + C.WONDER_OTHERS_DY*i + additionalY);
            l = mod(l-1, Main.gamestate.players.length);
            r = mod(r+1, Main.gamestate.players.length);
        }

        if (Main.gamestate.players.length % 2 === 0) {
            let y = Main.gamestate.players.length === 4 ? C.WONDER_LAST_Y_4P : C.WONDER_LAST_Y_6P;
            if (index === l) return new PIXI.Point(0, y + additionalY);
        }

        console.log(`Wonder position index ${index} is out of bounds`);
        return undefined;
    }

    isCurrentlyDragging() {
        return false;
    }
}