const renderer: PIXI.Renderer = new PIXI.Renderer({ antialias: true, transparent: true });

function render(object: PIXI.DisplayObject, width: number, height: number) {
    renderer.view.width = width;
    renderer.view.height = height;
    renderer.render(object);
    return cloneCanvas(renderer.view);
}