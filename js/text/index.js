// index.js

const color = "black";

let text = {
    init: function(hail) {
        this.container = new createjs.Container();
        let hitZone = new createjs.Shape();
        hitZone.graphics.beginFill(color).drawCircle(hail.x, hail.y, hail.size);
        hitZone.name = "hitzone";
        this.container.addChild(hitZone);
        console.log(hail.color);
        let newText = new createjs.Text("start", "bold 60px Courier New", hail.color);
        let b = newText.getBounds();
        newText.x = hail.x - b.width / 2;
        newText.y = hail.y + b.height / 2;
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