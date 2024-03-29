class GameElement {
    div: HTMLDivElement;

    useTransform: boolean;

    private _x: number = 0;
    get x() { return this._x; }
    set x(value: number) {
        this._x = value;
        this.setTransform();
    }

    private _y: number = 0;
    get y() { return this._y; }
    set y(value: number) {
        this._y = value;
        this.setTransform();
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

    constructor(useTransform: boolean = false) {
        this.useTransform = useTransform;
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        if (this.useTransform) {
            this.div.style.willChange = 'transform';
        }
        this.setTransform();
    }

    addToGame(gameDiv: HTMLDivElement = Main.game) {
        gameDiv.appendChild(this.div);
    }

    removeFromGame() {
        if (this.div.parentElement) {
            this.div.parentElement.removeChild(this.div);
        }
    }
    
    setPosition(point: PIXI.Point) {
        this.x = point.x;
        this.y = point.y;
    }

    private setTransform() {
        if (this.useTransform) {
            this.div.style.transform = `translate(${this._x}px, ${this._y}px) translateZ(0) scale(${this._scale})`;
        } else {
            this.div.style.left = `${this._x}px`;
            this.div.style.top = `${this._y}px`;
            this.div.style.transform = `scale(${this._scale})`;
        }
    }
}