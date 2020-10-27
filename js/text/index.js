// index.js

const size = 200;
const color = "black";
const textColor = "#00FF40";

let text = {
    x: 1000,
    y: 1000,
    size: size,
    init: function() {
        this.container = new createjs.Container();
        let hitZone = new createjs.Shape();
        hitZone.graphics.beginFill(color).drawCircle(this.x, this.y, this.size);
        hitZone.name = "hitzone";
        this.container.addChild(hitZone);
        let newText = new createjs.Text("start", "bold 60px Courier New", textColor);
        let b = newText.getBounds();
        newText.x = 1000 - b.width / 2;
        newText.y = 1000 + b.height / 2;
        newText.textBaseline = "alphabetic";
        this.container.addChild(newText);
    },
    start: function() {
        console.log("start");
        this.started();
    },
    started: function() {
        console.log("started");
    }
}

module.exports = text;