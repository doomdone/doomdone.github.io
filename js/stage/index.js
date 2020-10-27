const color = "black";

let haze = require('../haze/index');
let hail = require('../hail/index');

let stage = new createjs.Stage("havoqCanvas");

(function () {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    stage.canvas.style.background = color;

    haze.init();
    haze.container.x = stage.canvas.width / 2;
    haze.container.y = stage.canvas.height / 2;

    let text = require('../text/index');
    text.init();
    let handleClick = function() {
        haze.container.removeChild(text.container);
        haze.start();
        hail.start();
    }
    text.container.getChildByName("hitzone").addEventListener("click", handleClick);
    haze.container.addChild(text.container);

    hail.init();
    haze.container.addChild(hail.container);
    stage.addChild(haze.container);

    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // createjs.Ticker.addEventListener("tick", tick);
    // setEventListeners();

    console.log(stage.x+" : "+stage.y);
    stage.x -= haze.x;
    stage.y -= haze.y;
    console.log(stage.x+" : "+stage.y);
})();

function tick(event) {
    console.log("tick");
}

module.exports = stage;