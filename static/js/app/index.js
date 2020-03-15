// index.js

let root = {};

let app = root.app = root.app || require('../stage/index');
// document.body.appendChild(app.view);
//
// let field = root.field = root.field || require('../field/index');
// field.on('pointerdown',  start);
// app.stage.addChild(field);
//
// let colored = require('../unit/index');
// let unit = root.unit = root.unit || colored.unit;
// app.stage.addChild(unit);
// let text = root.text = root.text || colored.text;
// app.stage.addChild(text);
//
// function start() {
//     let connection = require('../connection/index')
//     connection.onmessage = messageReceived;
// }
//
// function messageReceived(event) {
//     type = event.data.substr(0,1);
//     data = JSON.parse(event.data.substr(2));
//     switch(type) {
//         case "i": init(data); break;
//         default: console.log("wrong code");
//     }
// }
//
// function init(data) {
//     app.stage.removeChild(text);
//     // app.init(data.f);
//     f = {x:4000,y:4000,size:4000};
//     app.init(f);
//     // field.init(data.f);
//     // unit.init(data.u);
// }