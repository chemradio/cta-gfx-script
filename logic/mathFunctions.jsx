function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}

function clamp(a, min, max) {
    if (min) {
        var min = min;
    } else {
        var min = 0
    }
    if (max) {
        var max = max;
    } else {
        var max = 1;
    }
    return Math.min(max, Math.max(min, a));
}

function invlerp(x, y, a) {
    return clamp((a - x) / (y - x));
}

function range(x1, y1, x2, y2, a) {
    return lerp(x2, y2, invlerp(x1, y1, a));
}