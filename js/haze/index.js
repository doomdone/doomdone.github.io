// index.js

const size = 2000;
const color = "black";

let haze = {
    x: size,
    y: size,
    size: size,
    init: function() {
        haze.container = new createjs.Container();
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(color).drawCircle(this.size, this.size, this.size);
        newHaze.name = "haze";
        haze.container.addChild(newHaze);
    },
    start: function() {
        haze.started();
    },
    started: function() {
        console.log("haze started");
    }
}

module.exports = haze;