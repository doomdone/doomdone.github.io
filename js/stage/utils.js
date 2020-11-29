export function position(x,y) {
    return Math.sqrt(Math.pow(x - haze.x, 2) + Math.pow(y - haze.y, 2))
}

export function limit() {
    let hail = haze.hail;
    return haze.size - hail.size - hail.width/2;
}

export function coef(a,b,c) {
    return Math.sqrt(Math.pow(c, 2) / (Math.pow(a,2) + Math.pow(b,2)));
}