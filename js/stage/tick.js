export function tick(event) {
    if (!event.paused) {
        let hail = haze.hail;
        hail.move(event.delta / 1000);

        // make the player the center of the world
        haze.container.regX = hail.container.x;
        haze.container.regY = hail.container.y;
    }
}