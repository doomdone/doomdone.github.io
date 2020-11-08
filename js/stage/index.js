let hz = require('../haze/index');
let hi = require('../hail/index');

let stage = new createjs.Stage("havoqCanvas");

let load = function(url) {
    let getData = new Promise((resolve, reject) => {
        $.get( url, function(data) {
            resolve(data);
        })
        .fail(function() {
            reject( "failed to load hail data");
        });
    });
    return getData.then(
        function(data) {
            return $.parseJSON(data);
        },
        function(error) {
            console.log(error);
        }
    );
}

async function init() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    let loadHaze = load("https://havoq.herokuapp.com/haze");
    let loadHail = load("https://havoq.herokuapp.com/hail");

    let hazeData = await loadHaze;
    let haze = window.haze = new hz.Haze(hazeData);
    haze.draw();

    let hailData = await loadHail;
    let hail = haze.hail = new hi.Hail(hailData);
    hail.draw();
    haze.container.addChild(hail.container);

    let text = require('../text/index');
    let hitzoneParams = {
        x: hail.x,
        y: hail.y,
        size: hi.startSize,
        color: hail.color,
    }
    text.init(hitzoneParams);


    let handleClick = function() {
        haze.container.removeChild(text.container);
        stage.addEventListener('stagemousemove', mouseMove)
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
}

function mouseMove(event) {
    let speedX = Math.floor(event.stageX - window.innerWidth / 2);
    let speedY = Math.floor(event.stageY - window.innerHeight / 2);
    window.haze.hail.changeSpeed(speedX,speedY);
}

const playerMoveSpeed = 1000;

function tick(event) {
    let hazec = window.haze.container;
    let hail = window.haze.hail;
    let hailc = hail.container;

    if (inputs.moveForwards || inputs.moveBackwards || inputs.moveLeft || inputs.moveRight) {
        let tx = hail.speed.x;
        let ty = hail.speed.y;

        // Normalise the movement so we dont go faster than max speed when moving at a diagonal.
        let m = Math.sqrt(tx * tx + ty * ty);
        if (m > 1) {
            tx = tx / m;
            ty = ty / m;
        }

        if (tx != 0 || ty != 0) {
            hailc.x += tx * playerMoveSpeed * (event.delta / 1000);
            hailc.y += ty * playerMoveSpeed * (event.delta / 1000);
        }
    }

    // make the player the center of the world
    hazec.regX = hailc.x;
    hazec.regY = hailc.y;

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

init();
module.exports = stage;