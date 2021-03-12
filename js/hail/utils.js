export function position(x,y) {
    return mean(x - haze.x, y - haze.y)
}

export function limit() {
    let hail = haze.hail;
    return haze.size - hail.size - hail.width/2;
}

export function mean(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}