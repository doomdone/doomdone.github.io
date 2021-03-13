const startSize = 200;

let attrs = require('./attributes');
let utils = require('./utils');

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
        if (hailData.speed === undefined || hailData.speed <= 0) {
            hailData.speed = attrs.defaultSpeed;
        }
        this.size = hailData.size;
        this.color = hailData.color;
        this.width = attrs.width(this.size);
        this.setSpeed(0, 0);
        this.maxSpeed = hailData.speed;
    }
    draw() {
        this.container = new createjs.Container();
        let newHail = new createjs.Shape();
        newHail.graphics.setStrokeStyle(attrs.width(startSize)).beginStroke(this.color).drawCircle(0,0, startSize);
        newHail.shadow = new createjs.Shadow(this.color, 0, 0, 30);
        newHail.name = "hail";

        this.container.addChild(newHail);
        this.container.x = this.x;
        this.container.y = this.y;

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
        //TODO register grow event here
        //TODO here this is not what you expect (e.g. console.log(this)) - fix it
    }
    go() {
        console.log("hail can be moved now");
        //TODO register tick events here
        //TODO here this is not what you expect (e.g. console.log(this)) - fix it
    }
    move(delta) {
        let stepX = this.speed.x * delta;
        let stepY = this.speed.y * delta;
        let pos = utils.mean(this.x, this.y);
        let posNext = utils.mean(this.x + stepX, this.y + stepY);
        if (posNext > pos && posNext > utils.limit()) {
            //reverse speed if hail touched the border and next step is pushing hail further
            this.setSpeed(-this.speed.x, -this.speed.y);
        }
        this.x += stepX;
        this.y += stepY;
        this.container.x = this.x;
        this.container.y = this.y;
    }

    setDirection(x,y) {
        let speedX = Math.floor(x - window.innerWidth / 2);
        let speedY = Math.floor(y - window.innerHeight / 2);
        // Normalise the movement so we don't go faster than max speed when moving at a diagonal.
        let m = mean(speedX, speedY)
        speedX /= m;
        speedY /= m;
        let stepX = speedX * this.maxSpeed;
        let stepY = speedY * this.maxSpeed;

        if (utils.mean(this.x, this.y) <= utils.limit()) {
            // To make sure that changing of speed doesn't affect crossing the border behavior
            this.setSpeed(stepX, stepY);
        }

    }

    setSpeed(x,y) {
        this.speed = new attrs.speed(x, y);
    }
}

function mean(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}