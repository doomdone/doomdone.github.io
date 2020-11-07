!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1)},function(e,t,n){let o=n(2),i=n(3),a=new createjs.Stage("havoqCanvas"),r=function(e){return new Promise((t,n)=>{$.get(e,function(e){t(e)}).fail(function(){n("failed to load hail data")})}).then(function(e){return $.parseJSON(e)},function(e){console.log(e)})};function s(e){let t=Math.floor(e.stageX-window.innerWidth/2),n=Math.floor(e.stageY-window.innerHeight/2);window.haze.hail.mouseMove(t,n)}const c=1e3,l=60,h=Math.PI/180;function d(e){let t=window.haze.container,n=window.haze.hail.container;if(u.moveForwards||u.moveBackwards||u.moveLeft||u.moveRight){var o=n.rotation*h,i=Math.cos(o),r=Math.sin(o),s=(u.moveForwards?1:0)+(u.moveBackwards?-1:0),d=(u.moveLeft?1:0)+(u.moveRight?-1:0),w=Math.sqrt(s*s+d*d);w>1&&(s/=w,d/=w),0==s&&0==d||(n.x+=(i*s+r*d)*c*(e.delta/1e3),n.y+=(r*s-i*d)*c*(e.delta/1e3))}if(u.turnLeft||u.turnRight){var f=(u.turnLeft?1:0)+(u.turnRight?-1:0);0!=f&&(n.rotation-=f*l*(e.delta/1e3))}t.regX=n.x,t.regY=n.y,u.toggleRotateCamera&&(u.toggleRotateCamera=!1,rotateCamera=!rotateCamera,rotateCamera||(t.rotation=0)),a.update(e)}let u={turnLeft:!1,moveForwards:!1,turnRight:!1,moveBackwards:!1,moveLeft:!1,moveRight:!1,toggleRotateCamera:!1},w=[];w[37]="turnLeft",w[38]="moveForwards",w[39]="turnRight",w[40]="moveBackwards",w[87]="moveForwards",w[83]="moveBackwards",w[65]="moveLeft",w[68]="moveRight",w[69]="toggleRotateCamera",async function(){a.canvas.width=window.innerWidth,a.canvas.height=window.innerHeight;let e=r("https://havoq.herokuapp.com/haze"),t=r("https://havoq.herokuapp.com/hail"),c=await e,l=window.haze=new o.Haze(c);l.draw();let h=await t,f=l.hail=new i.Hail(h);f.draw(),l.container.addChild(f.container);let g=n(4);g.init(f),g.container.getChildByName("hitzone").addEventListener("click",function(){l.container.removeChild(g.container),a.addEventListener("stagemousemove",s),l.start(),f.start()}),l.container.addChild(g.container),a.addChild(l.container),createjs.Ticker.timingMode=createjs.Ticker.RAF,createjs.Ticker.addEventListener("tick",d),document.addEventListener("keydown",function(e){e.preventDefault();var t=w[e.which];null!=t&&(u[t]=!0)},!0),document.addEventListener("keyup",function(e){e.preventDefault();var t=w[e.which];null!=t&&(u[t]=!1)},!0),window.focus(),document.getElementById("havoqCanvas").focus(),a.x=window.innerWidth/2-f.x,a.y=window.innerHeight/2-f.y}(),e.exports=a},function(e,t,n){"use strict";n.r(t),n.d(t,"Haze",function(){return r});const o="black",i=5e3;function a(e){this.x=e,this.y=e,this.size=e}class r{constructor(e){null==e&&(console.log("set default params for haze"),e=new a(i)),this.x=e.x,this.y=e.y,this.size=e.size}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.beginFill(o).drawCircle(this.x,this.y,this.size),e.name="haze",this.container.addChild(e)}start(){this.play()}play(){console.log("haze started")}}},function(e,t,n){"use strict";n.r(t),n.d(t,"Hail",function(){return c});const o=200,i=20,a=60;function r(){this.x=5e3,this.y=5e3,this.size=30,this.color="#00FF40",this.width=60}function s(e,t){this.x=e,this.y=t}class c{constructor(e){null==e&&(console.log("set default params for hail"),e=new r),this.x=e.x,this.y=e.y,this.size=e.size,this.color=e.color,this.width=i,this.speed=new s(0,0)}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.setStrokeStyle(this.width).beginStroke(this.color).drawCircle(this.x,this.y,o),e.shadow=new createjs.Shadow(this.color,0,0,40),e.name="hail",this.container.addChild(e)}start(){this.width=a;let e=new createjs.Timeline,t=this.container.getChildByName("hail").graphics;e.addTween(createjs.Tween.get(t.command,{loop:!1}).to({radius:this.size},1e3).call(this.play),createjs.Tween.get(t._strokeStyle,{loop:!1}).to({width:this.width},1e3).call(function(){console.log("here")})),e.gotoAndPlay(0)}play(){console.log("hail started")}mouseMove(e,t){console.log(e+" : "+t);let n=window.haze.hail.container.getChildByName("hail");n.graphics.command.x,n.graphics.command.y}}},function(e,t){let n={init:function(e){this.container=new createjs.Container;let t=new createjs.Shape;t.graphics.beginFill("black").drawCircle(e.x,e.y,e.size),t.name="hitzone",this.container.addChild(t),console.log(e.color);let n=new createjs.Text("start","bold 60px Courier New",e.color),o=n.getBounds();n.x=e.x-o.width/2,n.y=e.y+o.height/2,n.textBaseline="alphabetic",this.container.addChild(n)},start:function(){console.log("start"),this.started()},started:function(){console.log("started")}};e.exports=n}]);