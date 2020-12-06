const startSize = 200;

let attrs = require('./attributes');

export class Hail {
    constructor(hailData) {
        if (hailData === undefined) {
            hailData = new attrs.getDefault();
        }
        this.x = hailData.x;
        this.y = hailData.y;
        if (hailData.size === undefined || hailData.size < attrs.minSize) {
            hailData.size = attrs.minSize;
        }
        this.size = hailData.size;
        this.color = hailData.color;
        this.width = attrs.width(this.size);
        this.speed = new attrs.speed(0, 0);
        this.reverseSpeed = false;
    }
    draw() {
        this.container = new createjs.Container();
        let newHail = new createjs.Shape();
        newHail.graphics.setStrokeStyle(attrs.width(startSize)).beginStroke(this.color).drawCircle(this.x, this.y, startSize);
        newHail.shadow = new createjs.Shadow(this.color, 0, 0, 30);
        newHail.name = "hail";
        this.container.addChild(newHail);
    }
    drawText(listener) {
        let text = require('../text/index');
        let hitzoneParams = {
            x: this.x,
            y: this.y,
            size: startSize,
            color: this.color,
        }
        return text.draw(hitzoneParams, listener);
    }
    start() {
        let timeline = new createjs.Timeline();
        let graphics = this.container.getChildByName("hail").graphics;
        timeline.addTween(
            createjs.Tween.get(graphics.command, {loop: false})
                .to({radius: this.size}, 1000).call(this.grow),
            createjs.Tween.get(graphics._strokeStyle, {loop: false})
                .to({width: this.width}, 1000).call(this.go)
        );
        timeline.gotoAndPlay(0);
    }
    grow() {
        console.log("hail started to grow");
    }
    go() {
        console.log("hail can be moved now");
    }
    move() {

    }

    changeSpeed(x, y) {
        this.speed = new attrs.speed(x,y);
    }
}