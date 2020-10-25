const color = "black";

let haze = require('../haze/index');
let hail = require('../hail/index');

stage = {
    init: function () {
        let newStage = new createjs.Stage("havoqCanvas");
        newStage.canvas.width = window.innerWidth;
        newStage.canvas.height = window.innerHeight;
        newStage.canvas.style.background = color;

        haze.init();
        haze.container.getChildByName("haze").addEventListener("click", handleClick);

        hail.init();
        haze.container.addChild(hail.container);
        newStage.addChild(haze.container);

        // createjs.Ticker.addEventListener("tick", newStage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", tick);

        setEventListeners();
        this.onCanvas = newStage;
    }
}

function handleClick() {
    console.log("click");
    haze.container.getChildByName("haze").removeEventListener("click", handleClick);
    haze.start();
    hail.start();
}

function tick(event) {
    console.log("tick");
}

module.exports = stage;