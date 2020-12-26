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
            background: haze.color,
        }
        text.draw(hitzoneParams, listener, haze.container);
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
    position(incrementX, incrementY) {
        let x = this.x + this.container.x;
        let y = this.y + this.container.y;
        return mean(x - haze.x + incrementX, y - haze.y + incrementY)
    }
    isInside(speedX, speedY) {
        return mean(speedX, speedY) < this.size + this.width/2;
    }
    changeSpeed(event) {
        let speedX = Math.floor(event.stageX - window.innerWidth / 2);
        let speedY = Math.floor(event.stageY - window.innerHeight / 2);
        if (this.position(speedX, speedY) < haze.limit(this)) {
            this.reverseSpeed = false;
        }
        if (this.isInside(speedX, speedY)) {
            this.speed = new attrs.speed(0,0);
        } else {
            this.speed = new attrs.speed(speedX, speedY)
        }
    }
}

function mean(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}