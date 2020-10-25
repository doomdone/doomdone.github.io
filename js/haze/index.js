// index.js

const size = 200;
const color = "black";

let haze = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    size: size,
    init: function() {
        haze.container = new createjs.Container();
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(color).drawCircle(this.x, this.y, this.size);
        newHaze.name = "haze";
        haze.container.addChild(newHaze);
    },
    start: function() {
        let graphics = haze.container.getChildByName("haze").graphics;
        graphics.command.radius = 3000;
        graphics.command.x = -3000 / 2;
        graphics.command.y = -3000 / 2;
        haze.started();
    },
    started: function() {
        console.log("haze started");
    }
}

module.exports = haze;