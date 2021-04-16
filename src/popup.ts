namespace Popup {
    export type Source = Card | CardForList | API.WonderStage | API.Wonder;
}

class Popup extends GameElement {
    width: number = 400;
    private currentScript: Script;

    constructor() {
        super();
        this.div.className = 'popup';
    }

    addToGame(gameDiv: HTMLDivElement = Main.game) {
        this.alpha = 0;
        super.addToGame(gameDiv);
        this.currentScript = Main.scriptManager.runScript(S.chain(
            S.wait(0.5),
            S.doOverTime(0.1, t => {
                this.alpha = t;
            })
        ));
    }

    removeFromGame() {
        if (this.currentScript) this.currentScript.stop();
        let startAlpha = this.alpha;
        this.currentScript = Main.scriptManager.runScript(S.chain(
            S.doOverTime(0.1, t => {
                this.alpha = (1-t)*startAlpha;
            }),
            S.call(() => {
                super.removeFromGame();
                if (Main.scene.popup && Main.scene.popup.getSource() === this.getSource()) {
                    Main.scene.popup = null;
                }
            })
        ));
    }

    getSource(): any {
        return undefined;
    }

    protected infoText(text: string, xs: string, ys: string) {
        let p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = `${C.CARD_INFO_TEXT_SIZE}px`;
        p.style.color = C.CARD_INFO_TEXT_COLOR;
        p.style.transform = 'translate(0%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    }

    protected cardName(card: API.Card) {
        return `<span style="color:${ArtCommon.cardBannerForColorHtml(card.color)}; font-weight:bold">${card.name}</span>`;
    }
}