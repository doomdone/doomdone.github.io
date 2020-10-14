// index.js
var PHASER = require('phaser');

const color = 0x000000;

var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: {
        create: create,
    }
};

var stage = new Phaser.Game(config);
var field = new Phaser.Geom.Circle(window.innerWidth/2, window.innerHeight/2, 200);
var unit = new Phaser.Geon.Circle(window.innerWidth/2, window.innerHeight/2, 200);

function create () {
    var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
    graphics.fillCircleShape(field);
    graphics.setInteractive(field, PHASER.Geom.Circle.Contains);
    graphics.on('pointerdown', start);
    


    // let style = { font: "65px Arial", fill: 0xFF00FF, align: "center" };
    // let text = stage.add.text(game.world.centerX, game.world.centerY, "start", style);
}

function start() {
    stage.scaleManager
}

// let stage = new PIXI.Application({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     autoStart: true,
//     backgroundColor: color,
// });
//
// stage.init = require('./init.js');

module.exports = stage;
