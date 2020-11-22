const startSize = 200;

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
    hail.draw(startSize);
    haze.container.addChild(hail.container);

    let text = require('../text/index');
    let hitzoneParams = {
        x: hail.x,
        y: hail.y,
        size: startSize,
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

    stage.x = window.innerWidth/2 - hail.x;
    stage.y = window.innerHeight/2 - hail.y;
}

function mouseMove(event) {
    let speedX = Math.floor(event.stageX - window.innerWidth / 2);
    let speedY = Math.floor(event.stageY - window.innerHeight / 2);
    let hail = haze.hail;
    let inside = hail.size+hail.width/2;
    console.log(speedX+" : "+speedY);
    hail.reverseSpeed = false;
    if (Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2)) < inside) {
        hail.changeSpeed(0,0);
    } else {
        hail.changeSpeed(speedX,speedY)
    }
}

const playerMoveSpeed = 1000;

function tick(event) {
    let hail = haze.hail;
    let hazec = haze.container;
    let hailc = hail.container;

    if (hail.speed.x != 0 && hail.speed.y != 0) {
        let position = Math.sqrt(Math.pow(hail.x + hailc.x - haze.x, 2) + Math.pow(hail.y + hailc.y - haze.y, 2));
        if (position > haze.size-hail.size-hail.width/2) {
            hail.reverseSpeed = !hail.reverseSpeed;
        }


        let tx = hail.reverseSpeed? -hail.speed.x: hail.speed.x;
        let ty = hail.reverseSpeed? -hail.speed.y: hail.speed.y;

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

init();
module.exports = stage;