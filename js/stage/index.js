let hz = require('../haze/index');
let hi = require('../hail/index');

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
            console.log(error);
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
        stage.addEventListener('stagemousemove', require("./events").mouseMove)
        haze.start();
        hail.start();
    }
    let text = hail.drawText(handleStartClick);
    haze.container.addChild(text);

    stage.addChild(haze.container);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    let tickHandler = function(event) {
        require('./tick').tick(event);
        stage.update(event);
    }
    createjs.Ticker.addEventListener("tick", tickHandler);

    stage.x = window.innerWidth/2 - hail.x;
    stage.y = window.innerHeight/2 - hail.y;
}

init();
module.exports = stage;