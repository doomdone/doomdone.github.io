// index.js

const startSize = 200;
const minSize = 30;
const startWidth = 20;
const maxWidth = 60;
const color = "#00FF40";

let hail = {
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    size: startSize,
    width: startWidth,
    color: color,
    init: function() {
        hail.container = new createjs.Container();
        let newHail = new createjs.Shape();
        newHail.graphics.setStrokeStyle(this.width).beginStroke(this.color).drawCircle(this.x, this.y, this.size);
        newHail.shadow = new createjs.Shadow(this.color, 0, 0, 40);
        newHail.name = "hail";
        hail.container.addChild(newHail);
    },
    start: function() {
        hail.size = minSize;
        hail.width = maxWidth
        let timeline = new createjs.Timeline();
        let graphics = hail.container.getChildByName("hail").graphics;
        timeline.addTween(
            createjs.Tween.get(graphics.command, {loop: false})
                .to({radius: hail.size}, 1000).call(this.started),
            createjs.Tween.get(graphics._strokeStyle, {loop: false})
                .to({width: hail.width}, 1000).call(function() {
                    console.log("here");
            })
        );
        timeline.gotoAndPlay(0);
    },
    started: function() {
        console.log("hail started");
    }
}

module.exports = hail;