let hz = require('../haze/index');
let hi = require('../hail/index');

let stage = new createjs.Stage("havoqCanvas");

let load = function(url) {
    let getData = new Promise((resolve, reject) => {
        $.get( url, function(data) {
            resolve(data);
        })
        .fail(function() {
            reject( "failed to load data from "+url);
        });
    });
    return getData.then(
        function(data) {
            return $.parseJSON(data);
        },
        function(error) {
            console.log("failed to parse data: '" + data + "': " + error);
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
            let hazePt = haze.container.globalToLocal(stage.mouseX, stage.mouseY);
            if (stage.mouseInBounds && haze.container.hitTest(hazePt.x, hazePt.y)) {
                console.log("change direction");
                //change direction only when mouse pointer is inside the haze
                hail.setDirection(event.stageX, event.stageY)
            }
        })
        stage.addEventListener('stagemouseup', function(event) {
            console.log("fire :"+ event.stageX+ ", "+event.stageY);
        })
        haze.start();
        hail.start();
    }
    hail.drawText(handleStartClick);

    stage.addChild(haze.container);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    let tickHandler = function(event) {
        if (!event.paused) {
            //stop movement when mouse pointer inside the hail
            let hailPt = hail.container.globalToLocal(stage.mouseX, stage.mouseY);
            if (stage.mouseInBounds && !hail.container.hitTest(hailPt.x, hailPt.y)) {
                // console.log("move hail");
                hail.move(event.delta / 1000);
            }

            // make the player the center of the world
            // haze.container.regX = hail.container.x;
            // haze.container.regY = hail.container.y;
        }
        stage.update(event);
    }
    createjs.Ticker.addEventListener("tick", tickHandler);

    stage.x = stage.canvas.width/2 - hail.x;
    stage.y = stage.canvas.height/2 - hail.y;
}

init();

module.exports = stage;