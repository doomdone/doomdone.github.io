// index.js

const color = "black";

let text = {
    init: function(params) {
        this.container = new createjs.Container();
        let hitZone = new createjs.Shape();
        hitZone.graphics.beginFill(color).drawCircle(params.x, params.y, params.size);
        hitZone.name = "hitzone";
        this.container.addChild(hitZone);
        let newText = new createjs.Text("start", "bold 60px Courier New", params.color);
        let b = newText.getBounds();
        newText.x = params.x - b.width / 2;
        newText.y = params.y + b.height / 2;
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