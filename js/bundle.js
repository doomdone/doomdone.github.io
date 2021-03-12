!function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){i(1)},function(e,t,i){let n=i(2),o=i(3),r=new createjs.Stage("havoqCanvas"),s=function(e){return new Promise((t,i)=>{$.get(e,function(e){t(e)}).fail(function(){i("failed to load data from "+e)})}).then(function(e){return $.parseJSON(e)},function(e){console.log("failed to parse data: '"+data+"': "+e)})};!async function(){r.canvas.width=window.innerWidth,r.canvas.height=window.innerHeight;let e=s("https://havoq.herokuapp.com/haze"),t=s("https://havoq.herokuapp.com/hail"),i=await e,a=window.haze=new n.Haze(i);a.draw();let c=await t,h=a.hail=new o.Hail(c);h.draw(),a.container.addChild(h.container),h.drawText(function(){r.addEventListener("stagemousemove",function(e){let t=a.container.globalToLocal(r.mouseX,r.mouseY);r.mouseInBounds&&a.container.hitTest(t.x,t.y)&&(console.log("change direction"),h.setDirection(e.stageX,e.stageY))}),r.addEventListener("stagemouseup",function(e){console.log("fire")}),a.start(),h.start()}),r.addChild(a.container),createjs.Ticker.timingMode=createjs.Ticker.RAF,createjs.Ticker.addEventListener("tick",function(e){if(!e.paused){let t=h.container.globalToLocal(r.mouseX,r.mouseY);r.mouseInBounds&&!h.container.hitTest(t.x,t.y)&&h.move(e.delta/1e3),a.container.regX=h.container.x,a.container.regY=h.container.y}r.update(e)}),r.x=window.innerWidth/2-h.x,r.y=window.innerHeight/2-h.y}(),e.exports=r},function(e,t,i){"use strict";i.r(t),i.d(t,"Haze",function(){return s});const n="black",o=5e3;function r(e,t){console.log("set default params for haze"),this.x=e,this.y=e,this.size=e,this.color=t}class s{constructor(e){void 0===e&&(e=new r(o,n)),this.x=e.x,this.y=e.y,this.size=e.size,void 0===e.color?this.color=n:this.color=e.color}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.beginFill(this.color).drawCircle(this.x,this.y,this.size),e.name="haze",this.container.addChild(e)}start(){this.play()}limit(e){return this.size-e.size-e.width/2}play(){console.log("haze started")}}},function(e,t,i){"use strict";i.r(t),i.d(t,"Hail",function(){return s});const n=200;let o=i(4),r=i(5);class s{constructor(e){void 0===e&&(e=new o.getDefault),this.x=e.x,this.y=e.y,(void 0===e.size||e.size<o.minSize)&&(e.size=o.minSize),(void 0===e.speed||e.speed<=0)&&(e.speed=o.defaultSpeed),this.size=e.size,this.color=e.color,this.width=o.width(this.size),this.setSpeed(0,0),this.maxSpeed=e.speed}draw(){this.container=new createjs.Container;let e=new createjs.Shape;e.graphics.setStrokeStyle(o.width(n)).beginStroke(this.color).drawCircle(this.x,this.y,n),e.shadow=new createjs.Shadow(this.color,0,0,30),e.name="hail",this.container.addChild(e),console.log(this.container.x+" : "+this.container.y)}drawText(e){let t=i(6),o={x:this.x,y:this.y,size:n,color:this.color,background:haze.color};t.draw(o,e,haze.container)}start(){let e=this.go,t=new createjs.Timeline,i=this.container.getChildByName("hail").graphics;t.addTween(createjs.Tween.get(i.command,{loop:!1}).to({radius:this.size},1e3).call(this.grow),createjs.Tween.get(i._strokeStyle,{loop:!1}).to({width:this.width},1e3).call(e)),t.gotoAndPlay(0)}grow(){console.log("hail started to grow")}go(){console.log("hail can be moved now")}move(e){let t=this.speed.x*e,i=this.speed.y*e;r.position(this.x+this.container.x+t,this.y+this.container.y+i)<=r.limit()&&(this.container.x+=t,this.container.y+=i)}position(e,t){let i=this.x+this.container.x,n=this.y+this.container.y;return a(i-haze.x+e,n-haze.y+t)}setDirection(e,t){console.log(this.container.x+" : "+this.container.y);let i=Math.floor(e-window.innerWidth/2),n=Math.floor(t-window.innerHeight/2),o=a(i,n);n/=o;let r=(i/=o)*this.maxSpeed,s=n*this.maxSpeed;this.setSpeed(r,s)}setSpeed(e,t){this.speed=new o.speed(e,t)}}function a(e,t){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}},function(e,t,i){"use strict";i.r(t),i.d(t,"minSize",function(){return n}),i.d(t,"defaultSpeed",function(){return o}),i.d(t,"speed",function(){return r}),i.d(t,"width",function(){return s}),i.d(t,"getDefault",function(){return a});const n=10,o=100;function r(e,t){this.x=e,this.y=t}function s(e){return 2*n**2/e}function a(){console.log("set default params for hail"),this.x=5e3,this.y=5e3,this.size=30,this.color="#00FF40",this.speed=o}},function(e,t,i){"use strict";function n(e,t){return r(e-haze.x,t-haze.y)}function o(){let e=haze.hail;return haze.size-e.size-e.width/2}function r(e,t){return Math.sqrt(Math.pow(e,2)+Math.pow(t,2))}i.r(t),i.d(t,"position",function(){return n}),i.d(t,"limit",function(){return o}),i.d(t,"mean",function(){return r})},function(e,t,i){"use strict";function n(e,t,i){let n=new createjs.Container,o=new createjs.Shape;o.graphics.beginFill(e.background).drawCircle(e.x,e.y,e.size);o.addEventListener("click",function(){i.removeChild(n),t()}),n.addChild(o);let r=new createjs.Text("start","bold 60px Courier New",e.color),s=r.getBounds();r.x=e.x-s.width/2,r.y=e.y+s.height/2,r.textBaseline="alphabetic",n.addChild(r),i.addChild(n)}i.r(t),i.d(t,"draw",function(){return n})}]);