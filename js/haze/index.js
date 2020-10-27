// index.js

const size = 1000;
const color = "black";

let haze = {
    x: size,
    y: size,
    size: size,
    init: function() {
        haze.container = new createjs.Container();
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(color).drawCircle(this.x, this.y, this.size);
        newHaze.name = "haze";
        haze.container.addChild(newHaze);
    },
    start: function() {
        haze.started();
    },
    started: function() {
        console.log(haze.container.getChildByName("haze").graphics);
    }
}

module.exports = haze;