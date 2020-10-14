// index.js
var PIXI = require('pixi.js');

const color = 0x000000;
const size = 200;

let field = new PIXI.Graphics();
field.beginFill(color);
field.drawCircle(0, 0, size);
field.endFill();
field.position.set(window.innerWidth / 2, window.innerHeight / 2);
field.interactive = true;
field.buttonMode = true;

field.init = require('./init.js');

module.exports = field;