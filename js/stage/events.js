let utils = require("./utils");

export function mouseMove(event) {
    let speedX = Math.floor(event.stageX - window.innerWidth / 2);
    let speedY = Math.floor(event.stageY - window.innerHeight / 2);

    let hail = haze.hail;
    let x = hail.x + hail.container.x;
    let y = hail.y + hail.container.y;
    if (utils.position(x + speedX, y + speedY) < utils.limit()) {//utils.position(x, y)) {
        hail.reverseSpeed = false;
    }

    let inside = hail.size+hail.width/2;
    if (Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2)) < inside) {
        hail.changeSpeed(0,0);
    } else {
        hail.changeSpeed(speedX,speedY)
    }
}