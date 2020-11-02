// index.js

const startSize = 200;
const startWidth = 20;
const maxWidth = 60;

let defaultParams = function() {
    this.x = 5000;
    this.y = 5000;
    this.size = 200;
    this.color = "#00FF40";
    this.width = 60;
}

export class Hail {
    constructor(hailData) {
        if (hailData == undefined) {
            console.log("set default params for hail");
            hailData = defaultParams();
        }
        this.x = hailData.x;
        this.y = hailData.y;
        this.size = hailData.size;
        this.color = hailData.color;
        this.width = startWidth;
    }
    draw() {
        this.container = new createjs.Container();
        let newHail = new createjs.Shape();
        newHail.graphics.setStrokeStyle(this.width).beginStroke(this.color).drawCircle(this.x, this.y, startSize);
        newHail.shadow = new createjs.Shadow(this.color, 0, 0, 40);
        newHail.name = "hail";
        this.container.addChild(newHail);
    }
    start() {
        this.width = maxWidth;
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
}