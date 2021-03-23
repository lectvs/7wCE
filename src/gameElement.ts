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

    private _scale: number = 1;
    get scale() { return this._scale; }
    set scale(value: number) {
        this._scale = value;
        this.setTransform();
    }

    set zIndex(value: number) {
        this.div.style.zIndex = `${value}`;
    }

    get visible() { return this.div.style.visibility !== 'hidden'; }
    set visible(value: boolean) {
        this.div.style.visibility = value ? 'visible' : 'hidden';
    }

    constructor() {
        this.game = document.getElementById('game');
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.x = 0;
        this.y = 0;
        this.setTransform();
    }

    addToGame() {
        document.querySelector('#game').appendChild(this.div);
    }

    removeFromGame() {
        if (this.div.parentElement) {
            this.div.parentElement.removeChild(this.div);
        }
    }

    private setTransform() {
        this.div.style.transform = `scale(${this._scale})`;
    }
}