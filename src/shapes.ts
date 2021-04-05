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

    static filledPolygon(x: number, y: number, points: number[], color: number) {
        let shiftedPoints: number[] = [];
        for (let i = 0; i < points.length; i++) {
            shiftedPoints.push(points[i] + (i % 2 === 0 ? x : y));
        }
        let graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawPolygon(shiftedPoints);
        graphics.endFill();
        return graphics;
    }

    static filledOctagon(x: number, y: number, apothem: number, color: number) {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawStar(x, y, 8, apothem, apothem/Math.cos(Math.PI/8));
        graphics.endFill();
        return graphics;
    }

    static centeredText(x: number, y: number, text: string, scale: number, color: number) {
        let pixiText = new PIXI.Text(text, { fontFamily : 'Courier New', fontWeight: 'bold', fontSize: 100, fill : color });
        pixiText.anchor.set(0.5, 0.5);
        pixiText.scale.set(scale);
        pixiText.position.set(x, y);
        return pixiText;
    }
}