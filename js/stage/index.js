let haze = require('../haze/index');
let hail = require('../hail/index');

let stage = new createjs.Stage("havoqCanvas");

(function () {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    haze.init();
    hail.init();
    haze.container.addChild(hail.container);

    let text = require('../text/index');
    text.init(hail);

    let handleClick = function() {
        haze.container.removeChild(text.container);
        haze.start();
        hail.start();
    }
    text.container.getChildByName("hitzone").addEventListener("click", handleClick);
    haze.container.addChild(text.container);

    stage.addChild(haze.container);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
    setEventListeners();

    stage.x = window.innerWidth/2 - hail.x;
    stage.y = window.innerHeight/2 - hail.y;
})();

const playerMoveSpeed = 200;
const playerTurnSpeed = 60;
const DEG_TO_RAD = Math.PI / 180;

function tick(event) {
    if (inputs.moveForwards || inputs.moveBackwards || inputs.moveLeft || inputs.moveRight) {
        var r = hail.container.rotation * DEG_TO_RAD;
        var cos = Math.cos(r);
        var sin = Math.sin(r);

        var tx = (inputs.moveForwards ? 1 : 0) + (inputs.moveBackwards ? -1 : 0);
        var ty = (inputs.moveLeft ? 1 : 0) + (inputs.moveRight ? -1 : 0);

        //Normalise the movement so we dont go faster than max speed when moving at a diagonal.
        var m = Math.sqrt(tx * tx + ty + ty);
        if (m > 1) {
            tx = tx / m;
            ty = ty / m;
        }

        if (tx != 0 || ty != 0) {
            hail.container.x += (cos * tx + sin * ty) * playerMoveSpeed * (event.delta / 1000);
            hail.container.y += (sin * tx - cos * ty) * playerMoveSpeed * (event.delta / 1000);
        }
    }

    if (inputs.turnLeft || inputs.turnRight) {
        var tr = (inputs.turnLeft ? 1 : 0) + (inputs.turnRight ? -1 : 0);
        if (tr != 0) {
            hail.container.rotation -= tr * playerTurnSpeed * (event.delta / 1000);
        }
    }

    //make the player the center of the world
    haze.container.regX = hail.container.x;
    haze.container.regY = hail.container.y;

    if (inputs.toggleRotateCamera) {
        inputs.toggleRotateCamera = false;
        rotateCamera = !rotateCamera;
        if (!rotateCamera) {
            haze.container.rotation = 0;
        }
    }

    stage.update(event);
}

let inputs = {
    turnLeft: false,
    moveForwards: false,
    turnRight: false,
    moveBackwards: false,
    moveLeft: false,
    moveRight: false,
    toggleRotateCamera: false,
};

let keyMappings = [];
keyMappings[37] = 'turnLeft'; //left arrow
keyMappings[38] = 'moveForwards'; //up arrow
keyMappings[39] = 'turnRight'; //right arrow
keyMappings[40] = 'moveBackwards'; //down arrow

keyMappings[87] = 'moveForwards'; //w
keyMappings[83] = 'moveBackwards'; //s
keyMappings[65] = 'moveLeft'; // a
keyMappings[68] = 'moveRight'; // d

keyMappings[69] = 'toggleRotateCamera'; //e

function setEventListeners() {
    document.addEventListener('keydown', function(event) {
        event.preventDefault();
        var keyName = keyMappings[event.which];
        if (keyName != undefined) {
            inputs[keyName] = true;
        }
    }, true);

    document.addEventListener('keyup', function(event) {
        event.preventDefault();
        var keyName = keyMappings[event.which];
        if (keyName != undefined) {
            inputs[keyName] = false;
        }
    }, true);

    window.focus();
    document.getElementById('havoqCanvas').focus();
}

module.exports = stage;