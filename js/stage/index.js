// index.js
var PHASER = require('phaser');

const color = 0x000000;

let gameScene = new Phaser.Scene("Game");

var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    scene: gameScene
};

let stage = new Phaser.Game(config);

gameScene.create = function() {
    console.log("HERE");
    // var graphics = this.add.graphics({ fillStyle: { color: color } });
    // var field = new Phaser.Geom.Circle(window.innerWidth/2, window.innerHeight/2, 200);
    //
    // graphics.fillCircleShape(field);
    // graphics.setInteractive(field, PHASER.Geom.Circle.Contains);
    // graphics.on('pointerdown', start);
    


    // let style = { font: "65px Arial", fill: 0xFF00FF, align: "center" };
    // let text = stage.add.text(game.world.centerX, game.world.centerY, "start", style);
}

function start() {
    console.log("here");
    // stage.scaleManager
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
