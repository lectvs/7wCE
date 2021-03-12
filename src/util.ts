type Dict<T> = {[key: string]: T};

function clamp(n: number, min: number, max: number) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

function cloneCanvas(canvas: HTMLCanvasElement) {
    let newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext('2d').drawImage(canvas, 0, 0);
    return newCanvas;
}

function contains<T>(array: T[], element: T) {
    for (let e of array) {
        if (e === element) return true;
    }
    return false;
}

function lerp(a: number, b: number, t: number) {
    return a + (b-a)*t;
}

function mod(n: number, mod: number) {
    while (n >= mod) n -= mod;
    while (n < 0) n += mod;
    return n;
}

function randInt(min: number, max: number) {
    return min + Math.floor(Math.random() * (max+1 - min));
}

function randElement<T>(array: T[]) {
    return array[randInt(0, array.length-1)];
}

function sum<T>(array: T[], key: (t: T) => number) {
    if (!array || array.length === 0) {
        return 0;
    }

    let result = 0;
    for (let e of array) {
        result += key(e);
    }

    return result;
}