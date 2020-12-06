// index.js

const color = "black";

export function draw(params, start) {
    let container = new createjs.Container();

    let hitZone = new createjs.Shape();
    hitZone.graphics.beginFill(color).drawCircle(params.x, params.y, params.size);
    hitZone.name = "hitzone";
    let clickHandler = function() {
        haze.container.removeChild(container);
        start();
    }
    hitZone.addEventListener("click", clickHandler);
    container.addChild(hitZone);

    let newText = new createjs.Text("start", "bold 60px Courier New", params.color);
    let b = newText.getBounds();
    newText.x = params.x - b.width / 2;
    newText.y = params.y + b.height / 2;
    newText.textBaseline = "alphabetic";
    container.addChild(newText);
    return container
}
