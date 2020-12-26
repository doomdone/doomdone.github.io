// index.js

const defaultColor = "black";
const defaultSize = 5000;

function DefaultParams(size, color) {
    console.log("set default params for haze");
    this.x = size;
    this.y = size;
    this.size = size;
    this.color = color;
}

export class Haze {
    constructor(hazeData) {
        if (hazeData === undefined) {
            hazeData = new DefaultParams(defaultSize, defaultColor);
        }
        this.x = hazeData.x;
        this.y = hazeData.y;
        this.size = hazeData.size;
        if (hazeData.color === undefined) {
            this.color = defaultColor;
        } else {
            this.color = hazeData.color;
        }
    }
    draw() {
        this.container = new createjs.Container();
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(this.color).drawCircle(this.x, this.y, this.size);
        newHaze.name = "haze";
        this.container.addChild(newHaze);
    }
    start() {
        this.play();
    }
    limit(hail) {
        return this.size - hail.size - hail.width/2;
    }
    play() {
        console.log("haze started");
    };
}