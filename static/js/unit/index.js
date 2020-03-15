// index.js

var $ = require("jquery");
var PIXI = require("pixi.js");
var filters = require("pixi-filters");

const width = 30;
const size = 200;
const text = "start";

let unit = new PIXI.Graphics();
let glow = new filters.GlowFilter(20, 0, 5, 0x000000, 0.7);
glow.padding = 10;
unit.filters = [glow];
unit.lineStyle(width, 0xFFFFFF);
unit.drawCircle(window.innerWidth / 2, window.innerHeight / 2, size);
unit.endFill();

let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 60,
    fontWeight: "bold",
    fill: 0xFFFFFF
});

let textBlock = new PIXI.Text(text, style);
textBlock.x = window.innerWidth / 2 - textBlock.width / 2;
textBlock.y = window.innerHeight / 2 - textBlock.height / 2;
let glowText = new filters.GlowFilter(8, 0, 1, 0x000000, 0.1);
textBlock.filters = [glowText];


$.ajax({
    url :  "http://127.0.0.1:8081/color",
    type : "get",
    async: true,
    success : function(tint) {
        unit.tint = tint;
        textBlock.tint = tint;
        // glow.color = tint;
    }
});

unit.init = require('./init.js');

module.exports = {unit: unit, text: textBlock};
