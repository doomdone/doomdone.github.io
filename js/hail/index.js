// index.js

const minSize = 30;

function DefaultParams() {
    this.x = 5000;
    this.y = 5000;
    this.size = 30;
    this.color = "#00FF40";
    this.width = width(this.size);
}

function width(size) {
    return 2 * minSize**2/size;
}

function Speed(x,y) {
    this.x = x;
    this.y = y;
}

export class Hail {
    constructor(hailData) {
        if (hailData == undefined) {
            console.log("set default params for hail");
            hailData = new DefaultParams();
        }
        this.x = hailData.x;
        this.y = hailData.y;
        if (hailData.size == undefined || hailData.size < minSize) {
            this.size = minSize;
        } else {
            this.size = hailData.size;
        }
        this.color = hailData.color;
        this.width = width(this.size);
        this.speed = new Speed(0, 0);
    }
    draw(startSize) {
        this.container = new createjs.Container();
        let newHail = new createjs.Shape();
        newHail.graphics.setStrokeStyle(width(startSize)).beginStroke(this.color).drawCircle(this.x, this.y, startSize);
        newHail.shadow = new createjs.Shadow(this.color, 0, 0, 30);
        newHail.name = "hail";
        this.container.addChild(newHail);
    }
    start() {
        this.width = 2 * this.size;
        let timeline = new createjs.Timeline();
        let graphics = this.container.getChildByName("hail").graphics;
        timeline.addTween(
            createjs.Tween.get(graphics.command, {loop: false})
                .to({radius: this.size}, 1000).call(this.play),
            createjs.Tween.get(graphics._strokeStyle, {loop: false})
                .to({width: this.width}, 1000).call(function() {
                console.log("here");
            })
        );
        timeline.gotoAndPlay(0);
    }
    play() {
        console.log("hail started");
    }
    changeSpeed(x, y) {
        this.speed = new Speed(x,y);
    }
}