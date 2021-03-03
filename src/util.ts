type Dict<T> = {[key: string]: T};

function clamp(n: number, min: number, max: number) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

function lerp(a: number, b: number, t: number) {
    return a + (b-a)*t;
}

function mod(n: number, mod: number) {
    while (n >= mod) n -= mod;
    while (n < 0) n += mod;
    return n;
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