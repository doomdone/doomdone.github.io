// init.js

function init(data) {
    console.log("field x: " + data.x + ", stage y: " + data.y+", size " + data.size);
    this.setTransform(data.x/2, data.y*3/2, 2, 2);
    this.on('pointerdown', onClick);
}

function onClick () {
    console.log(this);
    // this.scale.x *= 1.25;
    // this.scale.y *= 1.25;
}

module.exports = init;