!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1)},function(e,t,n){let i=n(2),o=n(3),a=new createjs.Stage("havoqCanvas"),r=function(e){return new Promise((t,n)=>{$.get(e,function(e){t(e)}).fail(function(){n("failed to load hail data")})}).then(function(e){return $.parseJSON(e)},function(e){console.log(e)})};function s(e){let t=Math.floor(e.stageX-window.innerWidth/2),n=Math.floor(e.stageY-window.innerHeight/2);window.haze.hail.changeSpeed(t,n)}const c=1e3;function l(e){let t=window.haze.container,n=window.haze.hail,i=n.container;if(h.moveForwards||h.moveBackwards||h.moveLeft||h.moveRight){let t=n.speed.x,o=n.speed.y,a=Math.sqrt(t*t+o*o);a>1&&(t/=a,o/=a),0==t&&0==o||(i.x+=t*c*(e.delta/1e3),i.y+=o*c*(e.delta/1e3))}t.regX=i.x,t.regY=i.y,a.update(e)}let h={turnLeft:!1,moveForwards:!1,turnRight:!1,moveBackwards:!1,moveLeft:!1,moveRight:!1,toggleRotateCamera:!1},d=[];d[37]="turnLeft",d[38]="moveForwards",d[39]="turnRight",d[40]="moveBackwards",d[87]="moveForwards",d[83]="moveBackwards",d[65]="moveLeft",d[68]="moveRight",d[69]="toggleRotateCamera",async function(){a.canvas.width=window.innerWidth,a.canvas.height=window.innerHeight;let e=r("https://havoq.herokuapp.com/haze"),t=r("https://havoq.herokuapp.com/hail"),c=await e,u=window.haze=new i.Haze(c);u.draw();let w=await t,f=u.hail=new o.Hail(w);f.draw(),u.container.addChild(f.container);let g=n(4);g.init(f),g.container.getChildByName("hitzone").addEventListener("click",function(){u.container.removeChild(g.container),a.addEventListener("stagemousemove",s),u.start(),f.start()}),u.container.addChild(g.container),a.addChild(u.container),createjs.Ticker.timingMode=createjs.Ticker.RAF,createjs.Ticker.addEventListener("tick",l),document.addEventListener("keydown",function(e){e.preventDefault();var t=d[e.which];null!=t&&(h[t]=!0)},!0),document.addEventListener("keyup",function(e){e.preventDefault();var t=d[e.which];null!=t&&(h[t]=!1)},!0),window.focus(),document.getElementById("havoqCanvas").focus(),a.x=window.innerWidth/2-f.x,a.y=window.innerHeight/2-f.y}(),e.exports=a},function(e,t,n){"use strict";n.r(t),n.d(t,"Haze",function(){return r});const i="black",o=5e3;function a(e){this.x=e,this.y=e,this.size=e}class r{constructor(e){null==e&&(console.log("set default params for haze"),e=new a(o)),this.x=e.x,this.y=e.y,this.size=e.size}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.beginFill(i).drawCircle(this.x,this.y,this.size),e.name="haze",this.container.addChild(e)}start(){this.play()}play(){console.log("haze started")}}},function(e,t,n){"use strict";n.r(t),n.d(t,"Hail",function(){return c});const i=200,o=20,a=60;function r(){this.x=5e3,this.y=5e3,this.size=30,this.color="#00FF40",this.width=60}function s(e,t){this.x=e,this.y=t}class c{constructor(e){null==e&&(console.log("set default params for hail"),e=new r),this.x=e.x,this.y=e.y,this.size=e.size,this.color=e.color,this.width=o,this.speed=new s(0,0)}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.setStrokeStyle(this.width).beginStroke(this.color).drawCircle(this.x,this.y,i),e.shadow=new createjs.Shadow(this.color,0,0,40),e.name="hail",this.container.addChild(e)}start(){this.width=a;let e=new createjs.Timeline,t=this.container.getChildByName("hail").graphics;e.addTween(createjs.Tween.get(t.command,{loop:!1}).to({radius:this.size},1e3).call(this.play),createjs.Tween.get(t._strokeStyle,{loop:!1}).to({width:this.width},1e3).call(function(){console.log("here")})),e.gotoAndPlay(0)}play(){console.log("hail started")}changeSpeed(e,t){this.speed=new s(e,t)}}},function(e,t){let n={init:function(e){this.container=new createjs.Container;let t=new createjs.Shape;t.graphics.beginFill("black").drawCircle(e.x,e.y,e.size),t.name="hitzone",this.container.addChild(t);let n=new createjs.Text("start","bold 60px Courier New",e.color),i=n.getBounds();n.x=e.x-i.width/2,n.y=e.y+i.height/2,n.textBaseline="alphabetic",this.container.addChild(n)},start:function(){console.log("start"),this.started()},started:function(){console.log("started")}};e.exports=n}]);