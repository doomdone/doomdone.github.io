// index.js

const color = "black";
const defaultSize = 5000;

function DefaultParams(size) {
    this.x = size;
    this.y = size;
    this.size = size;
}

export class Haze {
    constructor(hazeData) {
        if (hazeData == undefined) {
            console.log("set default params for haze");
            hazeData = new DefaultParams(defaultSize);
        }
        this.x = hazeData.x;
        this.y = hazeData.y;
        this.size = hazeData.size;
    }
    draw() {
        this.container = new createjs.Container();
        let newHaze = new createjs.Shape();
        newHaze.graphics.beginFill(color).drawCircle(this.x, this.y, this.size);
        newHaze.name = "haze";
        this.container.addChild(newHaze);
    };

    start() {
        this.play();
    };

    play() {
        console.log("haze started");
    };
}