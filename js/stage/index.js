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
        haze.onCanvas.addEventListener("click", handleClick);
        newStage.addChild(haze.onCanvas);

        hail.init();
        // haze.hail = hail;
        newStage.addChild(hail.onCanvas);

        createjs.Ticker.addEventListener("tick", newStage);
        this.onCanvas = newStage;
    }
}

function handleClick() {
    haze.onCanvas.removeEventListener("click", handleClick);
    haze.start();
    hail.start();
}

//TODO when started remove old haze and add bigger one
//problem: haze has a click handler but no nothing about stage

module.exports = stage;