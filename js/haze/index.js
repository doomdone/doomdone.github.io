// index.js

const color = "black";

let defaultParams = function() {
    this.x = 5000;
    this.y = 5000;
    this.size = 5000;
}

export class Haze {
    constructor(hazeData) {
        if (hazeData == undefined) {
            console.log("set default params for haze");
            hazeData = defaultParams();
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
        this.started();
    };

    started() {
        console.log("haze started");
    };
}