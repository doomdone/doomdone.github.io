let hz = require('../haze/index');
let hi = require('../hail/index');
let utils = require('./utils');


let stage = new createjs.Stage("havoqCanvas");

let load = function(url) {
    let getData = new Promise((resolve, reject) => {
        $.get( url, function(data) {
            resolve(data);
        })
        .fail(function() {
            reject( "failed to load hail data");
        });
    });
    return getData.then(
        function(data) {
            return $.parseJSON(data);
        },
        function(error) {
            console.log("failed to load data from '" + url + "': " + error);
        }
    );
}

async function init() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    let loadHaze = load("https://havoq.herokuapp.com/haze");
    let loadHail = load("https://havoq.herokuapp.com/hail");

    let hazeData = await loadHaze;
    let haze = window.haze = new hz.Haze(hazeData);
    haze.draw();

    let hailData = await loadHail;
    let hail = haze.hail = new hi.Hail(hailData);
    hail.draw();
    haze.container.addChild(hail.container);

    let handleStartClick = function() {
        stage.addEventListener('stagemousemove', function(event) {
            hail.changeDirection(event);
        })
        haze.start();
        hail.start();
    }
    hail.drawText(handleStartClick);

    stage.addChild(haze.container);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    let tickHandler = function(event) {
        if (!event.paused) {
            let hailPt = hail.container.globalToLocal(stage.mouseX, stage.mouseY);
            if (stage.mouseInBounds && !hail.container.hitTest(hailPt.x, hailPt.y)) {
                let stepX = hail.speed.x * event.delta/1000;
                let stepY = hail.speed.y * event.delta/1000;
                let pos = utils.position(hail.x + hail.container.x + stepX, hail.y + hail.container.y + stepY);
                if (pos > utils.limit()) {
                        hail.changeSpeed(-hail.speed.x, -hail.speed.y);
                }
                hail.move(event.delta / 1000);

            }
            // make the player the center of the world
            haze.container.regX = hail.container.x;
            haze.container.regY = hail.container.y;
        }
        stage.update(event);
    }
    createjs.Ticker.addEventListener("tick", tickHandler);

    stage.x = window.innerWidth/2 - hail.x;
    stage.y = window.innerHeight/2 - hail.y;
}

init();
module.exports = stage;