// index.js

const size = 200;
const color = "black";

let haze = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    size: size,
    init: function() {
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(color).drawCircle(this.x, this.y, this.size);
        this.onCanvas = newHaze;
    },
    start: function() {
        haze.container = new createjs.Container();
        haze.onCanvas.radius = 3000
        haze.started();
    },
    started: function() {
        console.log("haze started");
    }
}

module.exports = haze;