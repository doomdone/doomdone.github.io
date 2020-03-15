// init.js
var PIXI = require('pixi.js');

const color = 0xFFFFFF;
const fieldColor = 0x000000;

function init(data) {
    console.log("stage x: " + data.x + ", stage y: " + data.y);
    this.renderer.backgroundColor = color;
    this.renderer.resize(data.x * 2, data.y * 2);
}

module.exports = init;