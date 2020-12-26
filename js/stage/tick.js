let utils = require("./utils");

export function tick(event) {
    if (!event.paused) {
        let hail = haze.hail;
        let hailc = hail.container;

        if (hail.speed.x != 0 && hail.speed.y != 0) {
            let tx = hail.reverseSpeed ? -hail.speed.x : hail.speed.x;
            let ty = hail.reverseSpeed ? -hail.speed.y : hail.speed.y;

            if (tx != 0 || ty != 0) {
                let stepX = tx * (event.delta / 1000);
                let stepY = ty * (event.delta / 1000);
                let pos = utils.position(hail.x + hailc.x + stepX, hail.y + hailc.y + stepY);
                if (pos > utils.limit()) {
                    let coef = utils.coef(stepX, stepY, utils.limit() - pos);
                    stepX *= coef;
                    stepY *= coef;
                    hail.reverseSpeed = !hail.reverseSpeed;
                }
                hailc.x += stepX;
                hailc.y += stepY;
            }
        }

        // make the player the center of the world
        let hazec = haze.container;
        hazec.regX = hailc.x;
        hazec.regY = hailc.y;
    }
}