class Shapes {
    static filledCircle(x: number, y: number, radius: number, color: number) {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawCircle(x, y, radius);
        graphics.endFill();
        return graphics;
    }

    static filledRect(x: number, y: number, width: number, height: number, color: number) {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
        return graphics;
    }

    static filledRoundedRect(x: number, y: number, width: number, height: number, cornerRadius: number, color: number) {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(x, y, width, height, cornerRadius);
        graphics.endFill();
        return graphics;
    }
}