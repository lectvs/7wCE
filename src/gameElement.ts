class GameElement {
    div: HTMLDivElement;

    get x() {
        return HtmlUtils.cssStylePositionToPixels(this._xs, Main.gameWidth);
    }
    get y() {
        return HtmlUtils.cssStylePositionToPixels(this._ys, Main.gameHeight);
    }
    set x(value: number) { this.xs = `${value}px`; }
    set y(value: number) { this.ys = `${value}px`; }

    private _xs: string = `0px`;
    set xs(value: string) {
        this._xs = value;
        this.div.style.left = value;
    }

    private _ys: string = `0px`;
    set ys(value: string) {
        this._ys = value;
        this.div.style.top = value;
    }

    private _scale: number = 1;
    get scale() { return this._scale; }
    set scale(value: number) {
        this._scale = value;
        this.setTransform();
    }

    private _zIndex: number = 0;
    get zIndex() { return this._zIndex; }
    set zIndex(value: number) {
        this._zIndex = value;
        this.div.style.zIndex = `${value}`;
    }

    private _visible: boolean = true;
    get visible() { return this._visible; }
    set visible(value: boolean) {
        this._visible = value;
        this.div.style.visibility = value ? 'visible' : 'hidden';
    }

    private _alpha: number = 1;
    get alpha() { return this._alpha; }
    set alpha(value: number) {
        this._alpha = value;
        this.div.style.opacity = `${this._alpha}`;
    }

    constructor() {
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
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