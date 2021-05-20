const renderer: PIXI.Renderer = new PIXI.Renderer({ antialias: true, transparent: true });
const resolution = Math.min(2 * (window.devicePixelRatio || 1), 3); // Cap resolution at 3x

function render(object: PIXI.DisplayObject, width: number, height: number) {
    renderer.view.width = width * resolution;
    renderer.view.height = height * resolution;
    object.x *= resolution;
    object.y *= resolution;
    object.scale.x *= resolution;
    object.scale.y *= resolution;
    renderer.render(object);
    object.x /= resolution;
    object.y /= resolution;
    object.scale.x /= resolution;
    object.scale.y /= resolution;
    let canvas = cloneCanvas(renderer.view);
    canvas.style.width = `${width}px`;
    return canvas;
}