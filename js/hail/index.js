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
        //TODO register grow event here
    }
    go() {
        console.log("hail can be moved now");
        //TODO register tick events here
    }
    move(delta) {
        // let x = this.speed.reverse ? -this.speed.x : this.speed.x;
        // let y = this.speed.reverse ? -this.speed.y : this.speed.y;
        this.container.x += this.speed.x * delta;
        this.container.y += this.speed.y * delta;
    }
    position(incrementX, incrementY) {
        let x = this.x + this.container.x;
        let y = this.y + this.container.y;
        return mean(x - haze.x + incrementX, y - haze.y + incrementY)
    }

    setDirection(x,y) {
        let speedX = Math.floor(x - window.innerWidth / 2);
        let speedY = Math.floor(y - window.innerHeight / 2);
        // Normalise the movement so we don't go faster than max speed when moving at a diagonal.
        let m = mean(speedX, speedY)
        speedX /= m;
        speedY /= m;
        //TODO if mouse position inside the hail - set speed to 0

        this.setSpeed(speedX * this.maxSpeed, speedY * this.maxSpeed);
    }

    setSpeed(x,y) {
        this.speed = new attrs.speed(x, y);
    }
    // changeSpeed(x,y) {
    //     this.speed.x = x;
    //     this.speed.y = y;
    // }
    // reverseSpeed() {
    //     this.speed.reverse = !this.speed.reverse;
    // }
}

function mean(x,y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}