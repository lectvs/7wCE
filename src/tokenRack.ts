class TokenRack extends GameElement {
    private offsetX: number;
    private dx: number;
    private getPos: () => PIXI.Point;
    private tokens: HTMLCanvasElement[];

    constructor(offsetX: number, dx: number, zIndex: number, getPos: () => PIXI.Point) {
        super();
        this.offsetX = offsetX;
        this.dx = dx;
        this.getPos = getPos;
        this.tokens = [];

        this.div.className = 'diplomacytokenrack';
        this.div.style.pointerEvents = 'none';
        this.zIndex = zIndex;
    }

    update() {
        let pos = this.getPos();
        this.x = pos.x;
        this.y = pos.y;
    }

    addToken(token: HTMLCanvasElement) {
        token.style.position = 'absolute';
        token.style.left = `${this.offsetX + this.dx*this.getTokenCount()}px`;
        this.div.appendChild(token);
        this.tokens.push(token);
    }

    removeToken() {
        let token = this.tokens.pop();
        token.parentElement.removeChild(token);
    }

    getTokenPosition(i: number) {
        return new PIXI.Point(this.x + this.offsetX + this.dx*i, this.y);
    }

    getTokenCount() {
        return this.tokens.length;
    }
}