// index.js

export function draw(params, start, parentContainer) {
    let container = new createjs.Container();

    let hitZone = new createjs.Shape();
    hitZone.graphics.beginFill(params.background).drawCircle(params.x, params.y, params.size);
    let clickHandler = function() {
        parentContainer.removeChild(container);
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
    parentContainer.addChild(container);
}
