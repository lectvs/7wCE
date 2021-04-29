type Dict<T> = {[key: string]: T};

function clamp(n: number, min: number, max: number) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

function cloneArray<T>(array: T[]): T[] {
    return array.slice();
}

function cloneCanvas(canvas: HTMLCanvasElement) {
    let newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext('2d').drawImage(canvas, 0, 0);
    newCanvas.style.width = canvas.style.width;
    newCanvas.style.height = canvas.style.height;
    return newCanvas;
}

function contains<T>(array: T[], element: T) {
    for (let e of array) {
        if (e === element) return true;
    }
    return false;
}

function filledArray<T>(len: number, fillWith: T) {
    let result: T[] = [];
    for (let i = 0; i < len; i++) {
        result.push(fillWith);
    }
    return result;
}

function getCookieUserInfo() {
    let cookies = document.cookie.split('; ');
    let usernameCookie = cookies.find(l => l.startsWith('username='));
    let passwordHashCookie = cookies.find(l => l.startsWith('password_hash='));
    if (!usernameCookie || !passwordHashCookie) {
        return undefined;
    }

    return {
        username: usernameCookie.split('username=')[1],
        password_hash: passwordHashCookie.split('password_hash=')[1]
    };
}

function hash(str: string) {
    var hash: number = 0, i: number, chr: number;
    if (!str || str.length === 0) return '0';
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32-bit integer
    }
    return `${hash}`;
}

function lerp(a: number, b: number, t: number) {
    return a + (b-a)*t;
}

function lerpTime(a: number, b: number, t: number, delta: number) {
    // From https://www.gamasutra.com/blogs/ScottLembcke/20180404/316046/Improved_Lerp_Smoothing.php
    return lerp(a, b, 1-Math.pow(2, -100*t*delta));
}

function mod(n: number, mod: number) {
    while (n >= mod) n -= mod;
    while (n < 0) n += mod;
    return n;
}

/** Inclusive */
function randInt(min: number, max: number) {
    return min + Math.floor(Math.random() * (max+1 - min));
}

function randElement<T>(array: T[]) {
    return array[randInt(0, array.length-1)];
}

/** Inclusive */
function range(start: number, end: number) {
    let result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
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