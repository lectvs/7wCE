class GameElement {
    game: HTMLElement;
    div: HTMLDivElement;

    get x() {
        return HtmlUtils.cssStylePositionToPixels(this.div.style.left, this.game.clientWidth);
    }
    get y() {
        return HtmlUtils.cssStylePositionToPixels(this.div.style.top, this.game.clientHeight);
    }
    set x(value: number) { this.div.style.left = `${value}px`; }
    set y(value: number) { this.div.style.top = `${value}px`; }
    set xs(value: string) { this.div.style.left = value; }
    set ys(value: string) { this.div.style.top = value; }

    constructor() {
        this.game = document.getElementById('game');
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
    }

    addToGame() {
        document.querySelector('#game').appendChild(this.div);
        HTMLCanvasElement
    }

    removeFromGame() {
        if (this.div.parentElement) {
            this.div.parentElement.removeChild(this.div);
        }
    }
}