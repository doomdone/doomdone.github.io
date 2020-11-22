const playerMoveSpeed = 1000;

let utils = require("./utils");

export function tick(event) {
    let hail = haze.hail;
    let hailc = hail.container;

    if (hail.speed.x != 0 && hail.speed.y != 0) {
        if (utils.position(hail.x + hailc.x, hail.y + hailc.y) > utils.limit()) {
            hail.reverseSpeed = !hail.reverseSpeed;
        }

        let tx = hail.reverseSpeed? -hail.speed.x: hail.speed.x;
        let ty = hail.reverseSpeed? -hail.speed.y: hail.speed.y;

        // Normalise the movement so we dont go faster than max speed when moving at a diagonal.
        let m = Math.sqrt(tx * tx + ty * ty);
        if (m > 1) {
            tx = tx / m;
            ty = ty / m;
        }

        if (tx != 0 || ty != 0) {
            hailc.x += tx * playerMoveSpeed * (event.delta / 1000);
            hailc.y += ty * playerMoveSpeed * (event.delta / 1000);
        }
    }

    // make the player the center of the world
    let hazec = haze.container;
    hazec.regX = hailc.x;
    hazec.regY = hailc.y;
}