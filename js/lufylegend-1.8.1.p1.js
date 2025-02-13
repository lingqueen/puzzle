/**
* lufylegend
* @version 1.8.1
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufylegend.com/lufylegend
* @svn http://lufylegend.googlecode.com/svn/trunk/
* @github https://github.com/lufylegend/lufylegend.js
*/
var OS_PC = "pc",
OS_IPHONE = "iPhone",
OS_IPOD = "iPod",
OS_IPAD = "iPad",
OS_ANDROID = "Android",
STR_ZERO = "0",
NONE = "none",
SUPER = "super",
UNDEFINED = "undefined",
LANDSCAPE = "landscape",/*横向*/
PORTRAIT = "portrait",/*纵向*/
LAjax,LTweenLite,LLoadManage,p,mouseX,mouseY;
/*
 * LEvent.js
 **/
var LEvent = function (){throw "LEvent cannot be instantiated";};
LEvent.INIT = "init",
LEvent.COMPLETE = "complete",
LEvent.ENTER_FRAME = "enter_frame",
LEvent.SOUND_COMPLETE = "sound_complete",
LEvent.END_CONTACT = "endContact",
LEvent.PRE_SOLVE = "preSolve",
LEvent.POST_SOLVE = "postSolve",
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.addEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.addEventListener){
		n.addEventListener(t, f, b);
	}else if(n.attachEvent){
		n["e" + t + f] = f;
		n[t + f] = function(){n["e" + t + f]();};
		n.attachEvent("on" + t, n[t + f]);
	}
};
/*
 * LMouseEvent.js
 **/
var LMouseEvent = function (){throw "LMouseEvent cannot be instantiated";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OUT = "mouseout";
LMouseEvent.DOUBLE_CLICK = "dblclick";
/*
 * LKeyboardEvent.js
 **/
var LKeyboardEvent = function (){throw "LKeyboardEvent cannot be instantiated";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PASS = "keypass";
/*
 * LAccelerometerEvent.js
 **/
var LAccelerometerEvent = function (){throw "LAccelerometerEvent cannot be instantiated";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
/*
 * LMath.js
 **/
var LMath = {
	trim:function (s){
		return s.replace(/(^\s*)|(\s*$)|(\n)/g, "");
	},
	leftTrim:function (s){
		return s.replace(/(^\s*)|(^\n)/g, "");
	},
	rightTrim:function (s){
		return s.replace(/(\s*$)|(\n$)/g, "");
	},
	numberFormat:function (s,l){
		if (!l || l < 1) {
			l = 3;
		}
		s=String(s).split(".");
		s[0]=s[0].replace(new RegExp('(\\d)(?=(\\d{'+l+'})+$)','ig'),"$1,");
		return s.join(".");
	},
	isString:function (s){
		var p=/^([a-z]|[A-Z])+$/;
		return p.exec(s); 
	},
	isNumber:function (s){
		var p=/^\d+\.\d+$/;
		return p.exec(s); 
	},
	isInt:function (s){
		var p=/^\d+$/;
		return p.exec(s); 
	}
};
function LStageScaleMode(){throw "LStageScaleMode cannot be instantiated";}
LStageScaleMode.EXACT_FIT = "exactFit";
LStageScaleMode.SHOW_ALL = "showAll";
LStageScaleMode.NO_SCALE = "noScale";
/*
 * LGlobal.js
 **/
var LGlobal = function (){throw "LGlobal cannot be instantiated";};
/*
设置全屏
*/
LGlobal.FULL_SCREEN="full_screen";
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
LGlobal.aspectRatio = NONE;
LGlobal.script = null;
LGlobal.stage = null;
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.box2d = null;
LGlobal.speed = 50;
LGlobal.IS_MOUSE_DOWN = false;
LGlobal.objectIndex = 0;
LGlobal.preventDefault = true;
LGlobal.childList = new Array();
LGlobal.buttonList = new Array();
LGlobal.stageScale = "noScale";
LGlobal.stageInCenter = false;
LGlobal.stagePaddingLeft = 0;
LGlobal.stagePaddingTop = 0;
LGlobal.canTouch = false;
LGlobal.os = OS_PC;
LGlobal.ios = false;
LGlobal.android = false;
LGlobal.android_new = false;
LGlobal.backgroundColor = null;
LGlobal.destroy = false;
LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
(function(n){
	if (n.indexOf(OS_IPHONE) > 0) {
		LGlobal.os = OS_IPHONE;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPOD) > 0) {
		LGlobal.os = OS_IPOD;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPAD) > 0) {
		LGlobal.os = OS_IPAD;
		LGlobal.ios = true;
		LGlobal.canTouch = true;
	}else if (n.indexOf(OS_ANDROID) > 0) {
		LGlobal.os = OS_ANDROID;
		LGlobal.canTouch = true;
		LGlobal.android = true;
		var i = n.indexOf(OS_ANDROID);
		if(parseInt(n.substr(i+8,1)) > 3){
			LGlobal.android_new = true;
		}
	}
})(navigator.userAgent);
LGlobal.setDebug = function (v){
	LGlobal.traceDebug = v; 
};
LGlobal.setCanvas = function (id,w,h){
	LGlobal.id = id;
	LGlobal.window = window;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;overflow:hidden;z-index:0;">'+
	'<canvas id="' + LGlobal.id + '_canvas" style="margin:0px 0px 0px 0px;width:'+w+'px;height:'+h+'px;">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>"+ 
	'<p>'+
		'To play this game you need a good Browser, like'+ 




	'</p>'+  
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox"></textarea><input type="password" id="' + LGlobal.id + '_passwordBox" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal._canvas=document.createElement("canvas");
	LGlobal._context=LGlobal._canvas.getContext("2d");
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
	LGlobal.inputTextField = null;
	if(w){LGlobal.canvasObj.width = w;}
	if(h){LGlobal.canvasObj.height = h;}
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
	LGlobal.stage = new LSprite();
	LGlobal.stage.parent = "root";
	LGlobal.childList.push(LGlobal.stage);
	if(LSystem.sv == LStage.FULL_SCREEN){LGlobal.resize();}
	if(LGlobal.canTouch){
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LGlobal.inputBox.style.display = NONE;
			}
			var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left),
			canvasY = parseInt(STR_ZERO+LGlobal.object.style.top),eve;
			eve = {offsetX:(event.touches[0].pageX - canvasX)
			,offsetY:(event.touches[0].pageY - canvasY)};
			eve.offsetX = LGlobal.scaleX(eve.offsetX);
			eve.offsetY = LGlobal.scaleY(eve.offsetY);
			LGlobal.offsetX = eve.offsetX;
			LGlobal.offsetY = eve.offsetY;
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
			LGlobal.buttonStatusEvent = eve;
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(eve);
			}
			LGlobal.touchHandler(event);
		});
		LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
			var eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
			LGlobal.touchHandler(event);
			LGlobal.IS_MOUSE_DOWN = false;
			LGlobal.buttonStatusEvent = null;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE,function(e){
			var cX = parseInt(STR_ZERO+LGlobal.object.style.left),
			cY = parseInt(STR_ZERO+LGlobal.object.style.top),
			eve,h,w,de,db,mX,mY;
			eve = {offsetX:(e.touches[0].pageX - cX),offsetY:(e.touches[0].pageY - cY)};
			eve.offsetX = LGlobal.scaleX(eve.offsetX);
			eve.offsetY = LGlobal.scaleY(eve.offsetY);
			LGlobal.buttonStatusEvent = eve;
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
			LGlobal.touchHandler(e);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_move){
				LGlobal.mouseJoint_move(eve);
			}
		});
	}else{
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LGlobal.inputBox.style.display = NONE;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(e);
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.buttonStatusEvent = event;
			mouseX = LGlobal.offsetX = event.offsetX;
			mouseY = LGlobal.offsetY = event.offsetY;
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(e.offsetX / LGlobal.box2d.drawScale, e.offsetY / LGlobal.box2d.drawScale));
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
			LGlobal.IS_MOUSE_DOWN = false;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
			LGlobal.IS_MOUSE_DOWN = false;
		});
	}
} ;
LGlobal.touchHandler = function(e){
	e.stopPropagation();
	if(LGlobal.preventDefault)e.preventDefault();
	if(e.stopImmediatePropagation){
		e.stopImmediatePropagation();
	}
	return e;
};
LGlobal.mouseEvent = function(e,t){
	var k = null;
	for(k in LGlobal.childList){
		if(LGlobal.childList[k].mouseEvent){
			LGlobal.childList[k].mouseEvent(e,t);
		}
	}
};
LGlobal.horizontalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,5,70,100,5]);
	b.graphics.drawRect(4,c,[30,15,20,10]);
	b.graphics.drawRoundRect(4,d,[125,25,100,70,5]);
	b.graphics.drawRect(4,d,[200,50,10,20]);
	b.graphics.drawRect(4,d,[80,50,20,20]);
	b.graphics.drawVertices(4,d,[[100,40],[120,60],[100,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.verticalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,25,100,70,5]);
	b.graphics.drawRect(4,c,[80,50,10,20]);
	b.graphics.drawRoundRect(4,d,[155,5,70,100,5]);
	b.graphics.drawRect(4,d,[180,15,20,10]);
	b.graphics.drawRect(4,d,[110,50,20,20]);
	b.graphics.drawVertices(4,d,[[130,40],[150,60],[130,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.box2d != null){
		LGlobal.box2d.show();
		if(!LGlobal.traceDebug){
			LGlobal.canvasObj.width = LGlobal.canvasObj.width;
		}
	}else{
		LGlobal.canvasObj.width = LGlobal.canvasObj.width;
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.buttonShow(LGlobal.buttonList);
	LGlobal.show(LGlobal.childList);
};
LGlobal.buttonShow = function(b){
	for(var i=0,l=b.length;i<l;i++){
		if(b[i].buttonModeChange)b[i].buttonModeChange();
	}
};
LGlobal.show = function(s){
	for(var i=0,l=s.length;i<l;i++){
		if(s[i].show)s[i].show();
	}
};
LGlobal.divideCoordinate = function (w,h,row,col){
	var i,j,cw = w/col,ch = h/row,r = [];
	for(i=0;i<row;i++){
		var c=[];
		for(j=0;j<col;j++){
			c.push({x:cw*j,y:ch*i});
		}
		r.push(c);
	}
	return r;
};
LGlobal._create_loading_color = function(){
	var co = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
	co.addColorStop(0, "red");  
	co.addColorStop(0.3, "orange");  
	co.addColorStop(0.4, "yellow");  
	co.addColorStop(0.5, "green");  
	co.addColorStop(0.8, "blue");  
	co.addColorStop(1, "violet");  
	return co;
};
LGlobal.hitTestArc = function(objA,objB,objAR,objBR){
	var rA = objA.getWidth()*0.5
	,rB = objB.getWidth()*0.5
	,xA = objA.startX()
	,xB = objB.startX()
	,yA = objA.startY()
	,yB = objB.startY();
	if(typeof objAR != UNDEFINED){
		xA += (rA - objAR);
		yA += (rA - objAR);
		rA = objAR;
	}
	if(typeof objBR != UNDEFINED){
		xB += (rB - objBR);
		yB += (rB - objBR);
		rB = objBR;
	}
	var disx = xA + rA - xB - rB
	,disy = yA + rA - yB - rB;
	return disx*disx + disy*disy < (rA + rB)*(rA + rB);
};
LGlobal.hitTestRect = function(objA,objB,vecA,vecB){
	var wA = objA.getWidth()
	,wB = objB.getWidth()
	,hA = objA.getHeight()
	,hB = objB.getHeight()
	,xA = objA.x
	,xB = objB.x
	,yA = objA.y
	,yB = objB.y;
	if(typeof vecA != UNDEFINED){
		xA += (wA - vecA[0])*0.5;
		yA += (hA - vecA[1])*0.5;
		wA = vecA[0];
		hA = vecA[1];
	}
	if(typeof vecB != UNDEFINED){
		xB += (wB - vecB[0])*0.5;
		yB += (hB - vecB[1])*0.5;
		wB = vecB[0];
		hB = vecB[1];
	}
	var minx = xA > xB ? xA : xB
	,miny = yA > yB ? yA : yB
	,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
	,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
	return minx <= maxx && miny <= maxy;
};
LGlobal.hitTest = LGlobal.hitTestRect;
LGlobal.setFrameRate = function(s){
	if(LGlobal.frameRate)clearInterval(LGlobal.frameRate);
	LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
};
LGlobal.scaleX = function(v){
	var w = parseInt(LGlobal.canvasObj.style.width);
    return (v - LGlobal.stagePaddingLeft)*LGlobal.canvasObj.width/w;
};
LGlobal.scaleY = function(v){
	var h = parseInt(LGlobal.canvasObj.style.height);
    return (v - LGlobal.stagePaddingTop)*LGlobal.canvasObj.height/h;
};
/*
将canvas缩放为规定大小
*/
LGlobal.setStageSize = function(w,h){
	LGlobal.canvasObj.style.width = w+"px";
	LGlobal.canvasObj.style.height = h+"px";
};

LGlobal.setStageInCenter = function(stageWidth,stageHeight){
    if(stageWidth < window.innerWidth){
        LGlobal.stagePaddingLeft = (window.innerWidth - stageWidth)/2;
        LGlobal.canvasObj.style.paddingLeft = LGlobal.stagePaddingLeft + "px";
    }
    if(stageHeight < window.innerHeight){
        LGlobal.stagePaddingTop = (window.innerHeight - stageHeight)/2;
        // LGlobal.canvasObj.style.paddingTop = LGlobal.stagePaddingTop + "px";
    }
}
LGlobal.resize = function(){
    switch(LGlobal.stageScale){
        case LStageScaleMode.EXACT_FIT:
            LGlobal.setStageSize(window.innerWidth,window.innerHeight);
            break;
        case LStageScaleMode.SHOW_ALL:
            var zoomW = window.innerWidth;
            var zoomH = LGlobal.height * window.innerWidth/LGlobal.width;
            if(zoomH > window.innerHeight){
                zoomW = LGlobal.width * window.innerHeight/LGlobal.height;
                zoomH =  window.innerHeight;
            }
            LGlobal.setStageSize(zoomW,zoomH);
            if(LGlobal.stageInCenter){
                LGlobal.setStageInCenter(zoomW,zoomH);
            }
            break;
        case LStageScaleMode.NO_SCALE:
            if(LGlobal.stageInCenter){
                LGlobal.setStageInCenter(LGlobal.width,LGlobal.height);
            }
            break;
    }
};

var LStage = LGlobal;

var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
		if(LGlobal.stage){LGlobal.resize();}
	}
};
/*
* PageProperty.js
**/
function trace(){
	if(!LGlobal.traceDebug)return;
	var t = document.getElementById("traceObject"),i;
	if(trace.arguments.length > 0 && t == null){
		t = document.createElement("div");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		document.body.appendChild(t);
	}
	for(i=0; i < trace.arguments.length; i++){
		t.innerHTML=t.innerHTML+trace.arguments[i] + "<br />";
	}
}
function addChild(o){
	LGlobal.stage.addChild(o);
}
function removeChild(o){
	LGlobal.stage.removeChild(o);
}
function init(s,c,w,h,f,t){
	LGlobal.speed = s;
	var _f = function (){
		if(LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight){
			LGlobal.horizontalError();
		}else if(LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight){
			LGlobal.verticalError();
		}else{
			f();
		}
	};
	if(t != null && t == LEvent.INIT){
		LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
		LGlobal.setCanvas(c,w,h);
		_f();
	}else{
		LEvent.addEventListener(window,"load",function(){
			LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
			LGlobal.setCanvas(c,w,h);
			_f();
		});
	}
}
function base(d,b,a){
	var p=null,o=d.constructor.prototype,h={};
	for(p in o)h[p]=1;
	b.apply(d,a);
	for(p in b.prototype){
		if(!h[p])o[p] = b.prototype[p];
		o[p][SUPER] = b.prototype;
	}
	if(Object.prototype.callParent){
		delete Object.prototype.callParent;
	}
}
if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(elt){
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)from += len;
		for (; from < len; from++){
			if (from in this && this[from] === elt)return from;
		}
		return -1;
	};
}
/*
 * LObject.js
 **/
function LObject(){
	this.type = "LObject";
	this.objectIndex = ++LGlobal.objectIndex;
	this.objectindex = this.objectIndex;
}
LObject.prototype = {
	callParent:function(f_n,args){
		if(!args || !f_n)return;
		return args.callee[SUPER][f_n].apply(this,args);
	},
	toString:function(){
		return "[LObject]";
	}
};
function LMatrix(a,b,c,d,tx,ty){
	var s = this;
	if(typeof a != UNDEFINED)s.a = a;
	if(typeof b != UNDEFINED)s.b = b;
	if(typeof c != UNDEFINED)s.c = c;
	if(typeof d != UNDEFINED)s.d = d;
	if(typeof tx != UNDEFINED)s.tx = tx;
	if(typeof ty != UNDEFINED)s.ty = ty;
}
LMatrix.prototype = {
	a:1,
	b:0,
	c:0,
	d:1,
	tx:0,
	ty:0,
	setTo:function(a,b,c,d,tx,ty){
		var s = this;
		if(typeof a != UNDEFINED)s.a = a;
		if(typeof b != UNDEFINED)s.b = b;
		if(typeof c != UNDEFINED)s.c = c;
		if(typeof d != UNDEFINED)s.d = d;
		if(typeof tx != UNDEFINED)s.tx = tx;
		if(typeof ty != UNDEFINED)s.ty = ty;
		return s;
	},
	isIdentity:function(){
		var s = this;
		return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0);
	},
	transform:function(c){
		var s = this;
		c.transform(s.a,s.b,s.c,s.d,s.tx,s.ty);
		return s;
	},
	toString:function(){
		return "[LMatrix]";
	}
};
/*
 * LEventDispatcher.js
 **/
function LEventDispatcher(){
	var s = this;
	base(s,LObject,[]);
	s._eventList = new Array();
}
p = {
	addEventListener:function(type,listener){
		this._eventList.push({listener:listener,type:type});
	},
	removeEventListener:function(type,listener){
		var s = this,i,length;
		length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type && s._eventList[i].listener == listener){
				s._eventList.splice(i,1);
				return;
			}
		}
	},
	removeAllEventListener:function (){
		this._eventList = [];
	},
	dispatchEvent:function(type){
		var s = this;
		var i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type){
				s.target = s;
				s.event_type = type;
				s._eventList[i].listener(s);
				return;
			}
		}
	},
	hasEventListener:function(type){
		var s = this,i,length = s._eventList.length;
		for(i=0;i<length;i++){
			if(type == s._eventList[i].type)return true;
		}
		return false;
	},
	toString:function(){
		return "[LEventDispatcher]";
	}
};
for(var k in p)LEventDispatcher.prototype[k]=p[k];
/*
 * LDisplayObject.js
 **/
function LDisplayObject(){
	base(this,LEventDispatcher,[]);
	this.blendMode = null;
}
p = {
	setShadow:function(){
		var s=this,f=s.filters;
		if(!f)return;
		for(var i=0,l=f.length;i<l;i++)f[i].show();
	},
	_transformRotate:function(){
		var s = this;
		if(s.rotate == 0)return;
		var c = LGlobal.canvas,rotateFlag = Math.PI / 180,rotateObj = new LMatrix();
		if((typeof s.rotatex) == "undefined"){
			s.rotatex=s.rotatey=0;
		}
		if(s.box2dBody)rotateFlag=1;
		rotateObj.a = Math.cos(s.rotate * rotateFlag);
		rotateObj.b = Math.sin(s.rotate * rotateFlag);
		rotateObj.c = -rotateObj.b;
		rotateObj.d = rotateObj.a;
		rotateObj.tx = s.x + s.rotatex;
		rotateObj.ty = s.y + s.rotatey;
		rotateObj.transform(c).setTo(1,0,0,1,-rotateObj.tx,-rotateObj.ty).transform(c);
	},
	_transformScale:function(){
		var s = this,c = LGlobal.canvas;
		if(s.scaleX == 1 && s.scaleY == 1)return;
		var scaleObj = new LMatrix();
		if(s.scaleX != 1)scaleObj.tx = s.x;
		if(s.scaleY != 1)scaleObj.ty = s.y;
		scaleObj.a = s.scaleX;
		scaleObj.d = s.scaleY;
		scaleObj.transform(c).setTo(1,0,0,1,-scaleObj.tx,-scaleObj.ty).transform(c);
	},
	getRootCoordinate:function(){
		var s = this;
		var sx=s.x,sy=s.y;
		var p = s.parent;
		while(p != "root"){
			sx += p.x;
			sy += p.y;
			p = p.parent;
		}
		return new LPoint(sx,sy);
	},
	getBounds:function(d){
		if(typeof d == UNDEFINED)return new LRectangle(0,0,0,0);
		var s = this,x=0,y=0,w=0,h=0;
		if(s.objectIndex != d.objectIndex){
			var sp = s.getRootCoordinate();
			var dp = d.getRootCoordinate();
			x = sp.x - dp.x;
			y = sp.y - dp.y;
		}
		if(d.getWidth)w=d.getWidth();
		if(d.getHeight)h=d.getHeight();
		return new LRectangle(x,y,w,h);
	},
	getDataURL:function(){
		var s = this,_o,o,_c,c;
		o = LGlobal.canvasObj,c = LGlobal.canvas;
		_o = LGlobal._canvas,_c = LGlobal._context;
		s.width = s.getWidth();
		s.height = s.getHeight();
		_o.width = s.width;
		_o.height = s.height;
		_c.clearRect(0,0,s.width,s.height);
		LGlobal.canvasObj = LGlobal._canvas;
		LGlobal.canvas = LGlobal._context;
		s.show();
		var data = LGlobal.canvasObj.toDataURL();
		LGlobal._canvas = _o;
		LGlobal._context = _c;
		LGlobal.canvasObj = o;
		LGlobal.canvas = c;
		return data;
	},
	toString:function(){
		return "[LDisplayObject]";
	}
};
for(var k in p)LDisplayObject.prototype[k]=p[k];
/*
 * LInteractiveObject.js
 **/
function LInteractiveObject(){
	var s = this;
	base(s,LDisplayObject,[]);
	s.type = "LInteractiveObject";
	s.mouseChildren = true;
	s.frameList = new Array();
	s.mouseList = new Array();
}
p = {
	addEventListener:function(type,listener){
		var s = this;
		if(type == LEvent.ENTER_FRAME){
			s.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0){
			s.mouseList.push({listener:listener,type:type});
		}else{
			this._eventList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function(type,listener){
		var s = this,i,length;
		if(type == LEvent.ENTER_FRAME){
			length = s.frameList.length;
			for(i=0;i<length;i++){
				if(type == LEvent.ENTER_FRAME && s.frameList[i] == listener){
					s.frameList.splice(i,1);
					return;
				}
			}
		}else if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0){
			length = s.mouseList.length;
			for(i=0;i<length;i++){
				if(type == s.mouseList[i].type && s.mouseList[i].listener == listener){
					s.mouseList.splice(i,1);
					return;
				}
			}
		}else{
			length = s._eventList.length;
			for(i=0;i<length;i++){
				if(type == s._eventList[i].type && s._eventList[i].listener == listener){
					s._eventList.splice(i,1);
					return;
				}
			}
		}
	},
	removeAllEventListener:function (){
		var s = this;
		s.frameList.length = 0;
		s.mouseList.length = 0;
		s._eventList.length = 0;
	},
	hasEventListener:function(type){
		var s = this,i,length;
		if(type == LEvent.ENTER_FRAME && s.frameList.length > 0)return true;
		if(type.indexOf("mouse")>=0 || type.indexOf("touch")>=0){
			length = s.mouseList.length;
			for(i=0;i<length;i++){
				if(type == s.mouseList[i].type)return true;
			}
		}else{
			length = s._eventList.length;
			for(i=0;i<length;i++){
				if(type == s._eventList[i].type)return true;
			}
		}
		return false;
	},
	toString:function(){
		return "[LInteractiveObject]";
	}
};
for(var k in p)LInteractiveObject.prototype[k]=p[k];
/*
* LLoader.js
**/
function LLoader(){
	base(this,LEventDispatcher,[]);
	var s = this;
	s.type="LLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "bitmapData"){
			s.content = new Image();
			s.content.onload = function(){
				s.content.onload = null;
				if(s.oncomplete){
					s.event.currentTarget = s.content;
					s.event.target = s;
					s.oncomplete(s.event);
				}
			};
			s.content.src = u; 
		}
	},
	toString:function(){
		return "[LLoader]";
	}
};
for(var k in p)LLoader.prototype[k]=p[k];
/*
* LURLLoader.js
**/
function LURLLoader(){
	var s = this;
	base(s,LObject,[]);
	s.type="LURLLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "text"){
			LAjax.get(u,{},function(data){
				if(s.oncomplete){
					s.event.currentTarget = data;
					s.event.target = s;
					s.data = data;
					if(s.oncomplete)s.oncomplete(s.event);
				}
			});
		}else if(t=="js"){
			var script = document.createElement("script");
			script.onload = function (){
				if(s.oncomplete)s.oncomplete({});
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	},
	toString:function(){
		return "[LURLLoader]";
	}
};
for(var k in p)LURLLoader.prototype[k]=p[k];
/*
 * LMedia.js 
 **/
function LMedia(){
	var s = this;
	base(this,LDisplayObject,[]);
	s.length=0;
	s.loopIndex=0;
	s.loopLength = 1;
	s.playing=false;
	s.event = {};
	s.oncomplete = null;
	s.onsoundcomplete = null;
}
LMedia.CANPLAYTHROUGH_EVENT = "canplaythrough";
LMedia.ENDED_EVENT = "ended";
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = l;
		}
	},
	removeEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = null;
		}else if(t == LEvent.SOUND_COMPLETE){
			this.onsoundcomplete = null;
		}
	},
	onload:function(){
		var s=this;
		if(s.data.readyState || (LGlobal.ios && LGlobal.canTouch)){
			s.length=s.data.duration;
			if(s.oncomplete){
				s.event.currentTarget = s;
				s.oncomplete(s.event);
			}
			return;
		}
		s.data.addEventListener(LMedia.CANPLAYTHROUGH_EVENT, function () {
			s.onload();
		}, false);
	},
	_onended:function(){
		var s=this;
		if(s.data.ended){
			if(s.onsoundcomplete)s.onsoundcomplete();
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
			}
		}
	},
	load:function(u){
		var s = this,a,b,k,d,q={"mov":"quicktime","3gp":"3gpp","ogv":"ogg","m4a":"mpeg","mp3":"mpeg","wave":"wav","aac":"mp4"};
		a = u.split(',');
		for(k in a){
			b = a[k].split('.');
			d=b[b.length-1];
			if(q[d])d=q[d];
			if(s.data.canPlayType(s._type+"/"+d)){
				s.data.src = a[k];
				s.onload();
				s.data.addEventListener(LMedia.ENDED_EVENT, function(){
					s._onended();
				}, false);
				s.data.load();
				return;
			}
		}
		if(s.oncomplete)s.oncomplete({});
	},
	setVolume:function(v){
		this.data.volume=v;
	},
	getVolume:function(){
		return this.data.volume;
	},
	play:function(c,l){
		var s=this;
		if(typeof l == UNDEFINED)l=1;
		if(typeof c == UNDEFINED)c=0;
		if(c>0)s.data.currentTime=c;
		s.data.loop = false;
		s.loopIndex=0;
		s.loopLength = l;
		s.playing=true;
		s.data.play();
		s._onended();
	},
	stop:function(){
		this.playing=false;
		this.data.pause();
	},
	close:function(){
		var s=this;
		s.playing=false;
		s.data.pause();
		s.data.currentTime=0;
	}
};
for(var k in p)LMedia.prototype[k]=p[k];
/*
 * LSound.js 
 **/
function LSound(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LSound";
	s._type="audio";
	s.data = new Audio();
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
LSound.prototype.toString = function(){
	return "[LSound]";
};
/*
 * LVideo.js 
 **/
function LVideo(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LVideo";
	s._type="video";
	s.x=s.y=0;
	s.visible=true;
	s.alpha=1;
	s.scaleX=s.scaleY=1;
	s.rotatex = 0;
	s.rotatey = 0;
	s.rotate = 0;
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectIndex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	show:function (){
		var s=this,c=LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}

		s._transformScale();

		s._transformRotate();
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		c.drawImage(s.data,s.x,s.y);
		c.restore();
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	},
	getWidth:function(){
		return this.data.width;
	},
	getHeight:function(){
		return this.data.height;
	},
	toString:function(){
		return "[LVideo]";
	}
};
for(var k in p)LVideo.prototype[k]=p[k];
/*
* LPoint.js
**/
function LPoint(x,y){
	var s = this;
	s.x = x;
	s.y = y;
}
LPoint.prototype = {
	toString:function(){
		return '[LPoint('+this.x+','+this.y+')]';
	}
};
/*
* LRectangle.js
**/
function LRectangle(x,y,w,h){
	var s = this;
	s.x = x;
	s.y = y;
	s.width = w;
	s.height=h;
	s.setRectangle();
}
LRectangle.prototype = {
	setRectangle:function(){
		var s = this;
		s.bottom = s.y + s.height;
		s.right = s.x + s.width;
		s.left = s.x;
		s.top = s.y;
	},
	clone:function(){
		var s = this;
		return new LRectangle(s.x,s.y,s.width,s.height);
	},
	contains:function(x, y){
		var s = this;
		return x>=s.x && x <= s.right && y>= s.y && y <= s.bootom;
	},
	containsRect:function(rect){
		var s = this;
		return rect.x>=s.x && rect.right <= s.right && rect.y>= s.y && rect.bootom <= s.bootom;
	},
	equals:function(v){
		var s = this;
		return v.x==s.x && v.width == s.width && v.y== s.y && v.height == s.height;
	},
	inflate:function(dx,dy){
		var s = this;
		s.width += dx;
		s.height += dy;
		s.setRectangle();
	},
	intersection:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		if(ix <= ax && iy <= ay){
			return new LRectangle(ix,iy,ax,ay);
		}else{
			return new LRectangle(0,0,0,0);
		}
	},
	intersects:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		return ix <= ax && iy <= ay;
	},
	isEmpty:function(){
		var s = this;
		return s.x==0 && s.y==0 && s.width==0 && s.height==0;
	},
	offset:function(dx,dy){
		var s = this;
		s.x += dx;
		s.y += dy;
		s.setRectangle();
	},
	setEmpty:function(){
		var s = this;
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.setRectangle();
	},
	setTo:function(xa, ya, w, h){
		var s = this;
		s.x = xa;
		s.y = ya;
		s.width = w;
		s.height = h;
		s.setRectangle();
	},
	toString:function(){
		var s = this;
		return "[LRectangle("+s.x+","+s.y+","+s.width+","+s.height+")]";
	},
	union:function(t){
		var s=this;
		return new LRectangle(s.x>t.x?t.x:s.x,s.y>t.y?t.y:s.y,s.right>t.right?s.right:t.right,s.bottom>t.bottom?s.bottom:t.bottom);
	}
};
/*
* LGraphics.js
**/
function LGraphics(){
	base(this,LObject,[]);
	var s = this;
	s.type = "LGraphics";
	s.color = "#000000";
	s.i = 0;
	s.alpha = 1;
	s.bitmap = null;
	s.setList = new Array();
	s.showList = new Array();
}
p = {
	show:function (){
		var s = this,k=null;
		if(s.setList.length == 0)return;
		for(k in s.setList){
			s.setList[k]();
		}
	},
	lineWidth:function (t){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineWidth = t;});
	},
	strokeStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.strokeStyle = co;});
	},
	stroke:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.moveTo(x,y);});
	},
	lineTo:function (x,y){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.lineTo(x,y);});
	},
	clear:function (){
		var s = this;
		s.bitmap = null;
		s.setList.splice(0,s.setList.length);
		s.showList.splice(0,s.showList.length);
	},
	rect:function (x,y,w,h){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.rect(x, y, w, h);});
		s.showList.push({type:"rect",value:[x,y,w,h]});
	},
	fillStyle:function (co){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fillStyle = co;});
	},
	fill:function (){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,r,sa,ea,aw){
		var s = this;
		s.setList.push(function(){LGlobal.canvas.arc(x,y,r,sa,ea,aw);});
		s.showList.push({type:"arc",value:sa});
	},
	beginBitmapFill:function(b){
		var s = this;
		s.setList.push(function(){
			s.bitmap=b;
		});
	},
	drawArc:function(tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.arc(pa[0],pa[1],pa[2],pa[3],pa[4],pa[5]);
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						0,0,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"arc",value:pa});
	},
	drawRect:function (tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.rect(pa[0],pa[1],pa[2],pa[3]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						0,0,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawRoundRect:function(tn,lco,pa,isf,co){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(pa[0]+pa[4],pa[1]);
			c.lineTo(pa[0]+pa[2]-pa[4],pa[1]);
			c.arcTo(pa[0]+pa[2],pa[1],pa[0]+pa[2],pa[1]+pa[4],pa[4]);
			c.lineTo(pa[0]+pa[2],pa[1]+pa[3]-pa[4]);
			c.arcTo(pa[0]+pa[2],pa[1]+pa[3],pa[0]+pa[2]-pa[4],pa[1]+pa[3],pa[4]);
			c.lineTo(pa[0]+pa[4],pa[1]+pa[3]);
			c.arcTo(pa[0],pa[1]+pa[3],pa[0],pa[1]+pa[3]-pa[4],pa[4]);
			c.lineTo(pa[0],pa[1]+pa[4]);
			c.arcTo(pa[0],pa[1],pa[0]+pa[4],pa[1],pa[4]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						0,0,
						s.bitmap.width,s.bitmap.height,
						0,0,
						s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.stroke();
			}
		});
		s.showList.push({type:"rect",value:pa});
	},
	drawVertices:function(tn,lco,v,isf,co){
		var s = this,c;
		if(v.length < 3)return;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(v[0][0],v[0][1]);
			var i,l = v.length;
			for(i=1;i<l;i++){
				var pa = v[i];
				c.lineTo(pa[0],pa[1]);
			};
			c.lineTo(v[0][0],v[0][1]);
			c.closePath();
			if(s.bitmap){
				c.save();
				c.clip();
				c.drawImage(s.bitmap.image,
						s.bitmap.x,s.bitmap.y,s.bitmap.width,s.bitmap.height,
						0,0,s.bitmap.width,s.bitmap.height);
				c.restore(); 
				s.bitmap=null;
				return;
			}
			if(isf){
				c.fillStyle = co;
				c.fill();
			}
			if(tn>0){
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			}
		});
		s.showList.push({type:"vertices",value:v});
	},
	drawTriangles:function(ve, ind, u ,tn,lco){
		var s = this;
		var i,j,l = ind.length,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			var v = ve;
			for(i=0,j=0;i<l;i+=3){
				a=0;
				c.save();
				c.beginPath();
				c.moveTo(v[ind[i]*2],v[ind[i]*2+1]);
				c.lineTo(v[ind[i+1]*2],v[ind[i+1]*2+1]);
				c.lineTo(v[ind[i+2]*2],v[ind[i+2]*2+1]);
				c.lineTo(v[ind[i]*2],v[ind[i]*2+1]);
				c.closePath();
				if(tn){
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
				c.clip();
				if(i%6==0){
					var sw = -1;
					var w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+1 + j]*2]-u[ind[i + j]*2])*s.bitmap.width;
					}
					if(i + j >= l){
						w = (u[ind[i + j - l]*2]-u[ind[i+1]*2])*s.bitmap.width;
						sw = u[ind[i]*2]==1?0:s.bitmap.width*u[ind[i]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+1]*2]-v[ind[i]*2])/w;
					var t2 = (v[ind[i+1]*2+1]-v[ind[i]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.transform(t1,t2,t3,t4, v[ind[i]*2], v[ind[i]*2+1]);
					c.drawImage(s.bitmap.image,
								s.bitmap.x+sw,
								s.bitmap.y+sh,
								w,h,
								0,0,
								w,h);
				}else{
					var sw;
					var w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					var h = (u[ind[i+2]*2+1]-u[ind[i]*2+1])*s.bitmap.height;
					if(j==0 && w < 0){
						for(var k=i+9;k<l;k+=3){
							if(u[ind[i+2]*2+1] == u[ind[k+2]*2+1]){
								j = k - i;
								break;
							}
						}
						if(j==0)j=(l-i);
						w = (u[ind[i+2 + j]*2]-u[ind[i+1 + j]*2])*s.bitmap.width;
					}
					if(i+1 + j >= l){
						w = (u[ind[i+1 + j - l]*2]-u[ind[i+2]*2])*s.bitmap.width;
						sw = u[ind[i+1]*2]==1?0:s.bitmap.width*u[ind[i+1]*2]+w;
						if(sw > s.bitmap.width)sw -= s.bitmap.width;
					}else{
						sw = s.bitmap.width*u[ind[i+1 + j]*2];
					}
					sh = s.bitmap.height*u[ind[i]*2+1];
					if(h < 0){
						h = (u[ind[i+2 - (i > 0?6:-6)]*2+1]-u[ind[i - (i > 0?6:-6)]*2+1])*s.bitmap.height;
						sh = 0;
					}
					var t1 = (v[ind[i+2]*2]-v[ind[i+1]*2])/w;
					var t2 = (v[ind[i+2]*2+1]-v[ind[i+1]*2+1])/w;
					var t3 = (v[ind[i+2]*2]-v[ind[i]*2])/h;
					var t4 = (v[ind[i+2]*2+1]-v[ind[i]*2+1])/h;
					c.transform(t1,t2,t3,t4, v[ind[i+1]*2], v[ind[i+1]*2+1]);
					c.drawImage(s.bitmap.image,
							s.bitmap.x+sw,
							s.bitmap.y+sh,
							w,h,
							0,-h,
							w,h);
				}
				c.restore();
			}
		});
	},
	drawLine:function (tn,lco,pa){
		var s = this,c;
		s.setList.push(function(){
			c=LGlobal.canvas;
			c.beginPath();
			c.moveTo(pa[0],pa[1]);
			c.lineTo(pa[2],pa[3]);
			c.lineWidth = tn;
			c.strokeStyle = lco;
			c.closePath();
			c.stroke();
		});
	},
	lineStyle:function (tn,co){
		var s = this,c=LGlobal.canvas;
		if(color==null)co=s.color;
		s.color = co;
		s.setList.push(function(){
			c.lineWidth = tn;
			c.strokeStyle = co;
		});
	},
	add:function (f){
		this.setList.push(f);
	},
	ismouseon:function(e,co){
		var s = this;
		var k = null;
		if(e==null || e == UNDEFINED)return false;
		if(co==null)co={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(ox >= s.showList[k].value[0] + co.x && ox <= s.showList[k].value[0] + co.x + s.showList[k].value[2] && 
					oy >= s.showList[k].value[1] + co.y && oy <= s.showList[k].value[1] + co.y + s.showList[k].value[3]){
					return true;
				}
			}else if(s.showList[k].type == "arc"){
				var xl = s.showList[k].value[0] + co.x - ox;
				var yl = s.showList[k].value[1] + co.y - oy;
				return xl*xl+yl*yl <= s.showList[k].value[2]*s.showList[k].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[0])min = s.showList[k].value[0];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[0] - s.showList[k].value[2])min = s.showList[k].value[0] - s.showList[k].value[2];
				if(max < s.showList[k].value[0] + s.showList[k].value[2])max = s.showList[k].value[0] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[0])min = v[0];
					if(max < v[0])max = v[0];
				}
			}
		}
		s.left = min;
		return max - min;
	},
	getHeight:function(){
		var s = this;
		var k = null,k1=null;
		var min = 0,max = 0,v;
		for(k in s.showList){
			if(s.showList[k].type == "rect"){
				if(min > s.showList[k].value[1])min = s.showList[k].value[1];
				if(max < s.showList[k].value[1] + s.showList[k].value[3])max = s.showList[k].value[1] + s.showList[k].value[3];
			}else if(s.showList[k].type == "arc"){
				if(min > s.showList[k].value[1] - s.showList[k].value[2])min = s.showList[k].value[1] - s.showList[k].value[2];
				if(max < s.showList[k].value[1] + s.showList[k].value[2])max = s.showList[k].value[1] + s.showList[k].value[2];
			}else if(s.showList[k].type == "vertices"){
				for(k1 in s.showList[k].value){
					v = s.showList[k].value[k1];
					if(min > v[1])min = v[1];
					if(max < v[1])max = v[1];
				}
			}
		}	
		s.top = min;	
		return max - min;
	},
	startX:function(){
		var s=this;
		s.getWidth();
		return s.left;
	},
	startY:function(){
		var s=this;
		s.getHeight();
		return s.top;
	},
	toString:function(){
		return "[LGraphics]";
	}
};
for(var k in p)LGraphics.prototype[k]=p[k];
/*
* LSprite.js
**/
function LSprite(){
	var s = this;
	base(s,LInteractiveObject,[]);
	s.type = "LSprite";
	s.x = 0;
	s.y = 0;
	s.rotatex;
	s.rotatey;
	s.rotate = 0;
	s.alpha = 1;
	s.visible=true;
	s.childList = new Array();
	s.graphics = new LGraphics();
	s.graphics.parent = s;
	s.width = 0;
	s.height = 0;
	s.scaleX=1;
	s.scaleY=1;
	s.box2d = null;
	s.mask = null;
}
p = {
	setRotate:function (angle){
		var s = this;
		if(s.box2dBody){
			s.box2dBody.SetAngle(angle);
		}else{
			s.rotate = angle;
		}
	},
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		if(s.box2dBody){
			if((typeof s.rotatex) == "undefined"){
				s.getRotateXY();
			}
			s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
			s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
			s.rotate = s.box2dBody.GetAngle();
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}

		s._transformRotate();

		s._transformScale();

		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		s.graphics.show();
		LGlobal.show(s.childList);
		c.restore();
		s.loopframe();
	},
	getRotateXY:function(w,h){
		var s = this;
		if(!w || !h){
			w=s.getWidth();
			h=s.getHeight();
		}
		s.rotatex = w/2;
		s.rotatey = h/2;
	},
	getWidth:function(){
		var s=this,i,l,o,a,b,
		left = s.graphics.startX(),right = left + s.graphics.getWidth();
		for(i=0,l=s.childList.length;i<l;i++){
			o = s.childList[i];
			if(typeof o.visible == UNDEFINED || !o.visible)continue;
			a = o.x;
			if(typeof o.startX == "function")a=o.startX();
			b = a + o.getWidth();
			if(a < left)left = a;
			if(b > right)right = b;
		}
		s.left = s.x + left;
		return right - left;
	},
	getHeight:function(){
		var s=this,i,l,o,a,b,
		top = s.graphics.startY(),bottom = top + s.graphics.getHeight();
		for(i=0,l=s.childList.length;i<l;i++){
			o = s.childList[i];
			if(typeof o.visible == UNDEFINED || !o.visible)continue;
			a = o.y;
			if(typeof o.startY == "function")a=o.startY();
			b = a + o.getHeight();
			if(a < top)top = a;
			if(b > bottom)bottom = b;
		}
		s.top = s.y + top;
		return bottom - top;
	},
	startX:function(){
		var s = this;
		s.getWidth();
		return s.left;
	},
	startY:function(){
		var s = this;
		s.getHeight();
		return s.top;
	},
	loopframe:function (){
		var s = this;
		for(var k=0,l=s.frameList.length;k<l;k++){
			s.target = s;
			s.event_type = LEvent.ENTER_FRAME;
			s.frameList[k](s);
		}
	},
	remove:function(){
		var s = this;
		if(!s.parent || s.parent == "root")return;
		s.parent.removeChild(s);
	},
	addChild:function (d){
		var s  = this;
		d.parent = s;
		s.childList.push(d);
		s.resize();
	},
	addChildAt:function(d, i){
		var s = this;
		if(i < 0 || i > s.childList.length){
			return;
		}
		d.remove();
		d.parent = s;
		s.childList.splice(i,0,d);
	},
	removeChild:function(d){
		var s  = this,c = s.childList;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex){
				if(LGlobal.destroy && d.die)d.die();
				s.childList.splice(i,1);
				break;
			}
		}
		s.resize();
	},
	getChildAt:function(i){
		var s  = this,c=s.childList;
		if(c.length == 0 || c.length <= i)return null;
		return c[i];
	},
	removeChildAt:function(i){
		var s  = this,c=s.childList;
		if(c.length <= i)return;
		if(LGlobal.destroy && c[i].die)c[i].die();
		s.childList.splice(i,1);
		s.resize();
	},
	getChildIndex:function(child){
		var s = this,c=s.childList,i,l=c.length;
		for(i=0;i<l;i++){
			if(c[i].objectIndex == child.objectIndex){
				return i;
			}
		}
		return -1;
	},
	setChildIndex:function(child, index){
		var s = this,c=s.childList,i,l=c.length;
		if(child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l){
			return;
		}
		for(i=0;i<l;i++){
			if(c[i].objectIndex == child.objectIndex){
				break;
			}
		}
		s.childList.splice(i,1);
		s.childList.splice(index,0,child);
	},
	resize:function(){
		var s  = this;
		s.width = s.getWidth();
		s.height = s.getHeight();
	},
	removeAllChild:function(){
		var s  = this,c=s.childList;
		for(var i=0,l=c.length;i<l;i++){
			if(LGlobal.destroy && c[i].die)c[i].die();
		}
		s.childList.length = 0;
		s.width = 0;
		s.height = 0;
	},
	mouseEvent:function (e,type,cd){
		if(e==null || e == UNDEFINED)return false;
		var s = this;
		if(!s.mouseChildren || !s.visible)return false;
		if(cd==null)cd={x:0,y:0,scaleX:1,scaleY:1};
		var i,k,ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		var mc = {x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY};
		for(k=s.childList.length-1;k>=0;k--){
			if(s.childList[k].mouseEvent){
				i = s.childList[k].mouseEvent(e,type,mc);
				if(i)return true;
			}
		}
		if(s.mouseList.length == 0){
			return false;
		}
		var i = s.ismouseon(e, cd);
		if(i){
			for(k=0;k<s.mouseList.length;k++){
				var o = s.mouseList[k];
				if(o.type == type){
					e.selfX = ox - (s.x+cd.x);
					e.selfY = oy - (s.y+cd.y);
					e.clickTarget = s;
					o.listener(e,s);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(e,cd){
		var s = this;
		if(!s.visible || e==null)return false;
		var k = null,i=false,l=s.childList;
		var sc={x:s.x+cd.x,y:s.y+cd.y,scaleX:cd.scaleX*s.scaleX,scaleY:cd.scaleY*s.scaleY,alpha:cd.alpha*s.alpha};
		for(k=l.length-1;k>=0;k--){
			if(l[k].ismouseon)i = l[k].ismouseon(e,sc);
			if(i)break;
		}
		if(!i && s.graphics)i = s.graphics.ismouseon(e,sc);
		return i;
	},
	die:function (){
		var s = this;
		s.graphics.clear();
		s.removeAllEventListener();
		if(s.box2dBody)s.clearBody();
		for(var i=0,c=s.childList,l=c.length;i<l;i++){
			if(c[i].die)c[i].die();
		}
	},
	toString:function(){
		return "[LSprite]";
	}
};
for(var k in p)LSprite.prototype[k]=p[k];
/*
* LButton.js
**/
function LButton(d_up,d_over){
	base(this,LSprite,[]);
	var s = this;
	s.type = "LButton";
	s.bitmap_up = d_up;
	s.addChild(d_up);
	if(d_over == null){
		d_over = d_up;
	}else{
		s.addChild(d_over);
	}
	s.bitmap_over = d_over;
	s.bitmap_over.visible = false;
	s.bitmap_up.visible = true;
	LGlobal.buttonList.push(s);
}
LButton.prototype.buttonModeChange = function (){
	var s = this;
	var cood={x:0,y:0,scaleX:1,scaleY:1,alpha:1,rotate:0};
	var parent = s.parent;
	while(parent != "root"){
		cood.x += parent.x;
		cood.y += parent.y;
		parent = parent.parent;
	}
	if(s.ismouseon(LGlobal.buttonStatusEvent,cood)){
		s.bitmap_up.visible = false;
		s.bitmap_over.visible = true;
	}else{
		s.bitmap_over.visible = false;
		s.bitmap_up.visible = true;
	}
};
LButton.prototype.die = function (){
	var s = this;
	arguments.callee[SUPER].die.call(this);
	for(var i=0,b=LGlobal.buttonList,l=b.length;i<l;i++){
		if(b[i].objectIndex == s.objectIndex){
			LGlobal.buttonList.splice(i,1);
			break;
		}
	}
};
LButton.prototype.toString = function(){
	return "[LButton]";
};
function LBlendMode(){throw "LBlendMode cannot be instantiated";}
LBlendMode.SOURCE_OVER = "source-over";
LBlendMode.SOURCE_ATOP = "source-atop";
LBlendMode.SOURCE_IN = "source-in";
LBlendMode.SOURCE_OUT = "source-out";
LBlendMode.DESTINATION_OVER = "destination-over";
LBlendMode.DESTINATION_ATOP = "destination-atop";
LBlendMode.DESTINATION_IN = "destination-in";
LBlendMode.DESTINATION_OUT = "destination-out";
LBlendMode.LIGHTER = "lighter";
LBlendMode.COPY = "copy";
LBlendMode.XOR = "xor";
LBlendMode.NONE = null;
/*
* LTextFieldType.js
**/
var LTextFieldType = function (){throw "LTextFieldType cannot be instantiated";};
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;
/*
* LTextField.js
**/
function LTextField(){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LTextField";
	s.texttype = null;
	s.x = 0;
	s.y = 0;
	s.text = "";
	s.font = "utf-8";
	s.size = "11";
	s.color = "#000000";
	s.weight = "normal";
	s.textAlign = "left";
	s.textBaseline = "top";
	s.lineWidth = 1;
	s.width = 150;
	s.height = s.size;
	s.stroke = false;
	s.visible=true;
	s.scaleX=1;
	s.scaleY=1;
	s.alpha=1;
	s.rotate=0;
	s.displayAsPassword = false;
	s.wordWrap=false;
}
p = {
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		c.font = s.weight + " " + s.size+"pt "+s.font;  
		c.textAlign = s.textAlign;
		c.textBaseline = s.textBaseline;
		c.lineWidth = s.lineWidth;  
		if(s.filters){
			s.setShadow();
		}
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}

		s._transformScale();

		s._transformRotate();
		if(s.x != 0 || s.y != 0)c.transform(1,0,0,1,s.x,s.y);
		if(s.texttype == LTextFieldType.INPUT){
			if(s.x != 0 || s.y != 0){
				s.inputBackLayer.show();
			}
			var rc = s.getRootCoordinate();
		    	if(LGlobal.inputBox.name == "input"+s.objectIndex){
		    		LGlobal.inputBox.style.marginTop = (rc.y) + "px";
		    		LGlobal.inputBox.style.marginLeft = (rc.x) + "px";
		    	}
		}
		var lbl = s.text;
		if(s.displayAsPassword){
			lbl = '';
			for(var i=0,l=s.text.length;i<l;i++)lbl+='*';
		}
		var d;
		if(s.stroke){
			c.strokeStyle = s.color;
			d = c.strokeText;
		}else{
			c.fillStyle = s.color;
			d = c.fillText;
		}
		if(s.wordWrap){
			var i,l,j=0,k=0,m=0;
			for(i=0,l=s.text.length;i<l;i++){
				j = c.measureText(s.text.substr(k,i-k)).width;
				if(j > s.width){
					j = 0;
					k = i;
					m++;
				}
				d.apply(c,[lbl.substr(i,1),j,m*s.wordHeight,c.measureText(lbl).width]);
			}
			s.height = m*s.wordHeight;
		}else{
			d.apply(c,[lbl,0,0,c.measureText(lbl).width]);
		}
		if(s.wind_flag){
			s.windRun();
		}
		c.restore();
	},
	setWordWrap:function(v,h){
		var s = this;
		if(v){
			if(h>0){
				s.wordHeight = h;
			}else{
				s.wordWrap = false;
				s.wordHeight = s.getHeight();
			}
		}
		s.wordWrap = v;
	},
	setType:function(type,inputBackLayer){
		var s = this;
		if(s.texttype != type && type == LTextFieldType.INPUT){
			if(inputBackLayer==null || inputBackLayer.type != "LSprite"){
				s.inputBackLayer = new LSprite();
				s.inputBackLayer.graphics.drawRect(1,"#000000",[0, -s.getHeight()*0.4, s.width, s.getHeight()*1.5]);
			}else{
				s.inputBackLayer = inputBackLayer;
			}
			s.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(s.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+s.objectIndex;
				LGlobal.inputTextField = s;
				LGlobal.inputTextBoxObj.style.display = NONE;
				LGlobal.passwordBoxObj.style.display = NONE;
				if(s.displayAsPassword){
					LGlobal.inputTextBox = LGlobal.passwordBoxObj;
				}else{
					LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
				}
				LGlobal.inputTextBox.style.display = "";
				LGlobal.inputTextBox.value = s.text;
				LGlobal.inputTextBox.style.height = s.height+"px";
				LGlobal.inputTextBox.style.width = s.width+"px";
			});
		}else{
			s.inputBackLayer = null;
		}
		s.texttype = type;
	},
	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var s = this;
		if(s.inputBackLayer == null)return;
		s.inputBackLayer.mouseEvent(event,type,{x:s.x+cood.x,y:s.y+cood.y});
	},
	getWidth:function(){
		var s = this;
		if(s.wordWrap)return s.width;
		LGlobal.canvas.font = s.size+"pt "+s.font;
		return LGlobal.canvas.measureText(s.text).width;
	},
	getHeight:function(){
		var s = this,c = LGlobal.canvas;
		if(s.wordWrap)return s.height;
		c.font = s.weight + " " + s.size+"pt "+s.font; 
		return c.measureText("O").width*1.2;
	},
	wind:function(listener){
		var s = this;
		s.wind_over_function = listener;
		s.wind_flag = true;
		s.wind_text = s.text;
		s.text = "";
		s.wind_length = 0;
	},
	windRun:function(){
		var s = this;
		if(s.wind_length > s.wind_text.length){
			s.wind_flag = false;
			if(s.wind_over_function)s.wind_over_function();
			return;
		}
		s.text = s.wind_text.substring(0,s.wind_length);
		s.wind_length++;
	},
	toString:function(){
		return "[LTextField]";
	}
};
for(var k in p)LTextField.prototype[k]=p[k];
/*
* LLabel.js
**/
function LLabel(){
	var s = this;
	base(s,LTextField,[]);
	s.width = LGlobal.width;
}
/*
* LBitmap.js
**/
function LBitmap(bitmapdata){
	base(this,LDisplayObject,[]);
	var s = this;
	s.type = "LBitmap";
	s.x = 0;  
	s.y = 0;  
	s.width = 0;  
	s.height = 0;  
	s.scaleX=1;
	s.scaleY=1;
	s.alpha = 1;
	s.visible=true;
	s.rotate = 0;
	s.rotateCenter = true;
	s.bitmapData = bitmapdata; 
	if(s.bitmapData){
		s.width = s.bitmapData.width;
		s.height = s.bitmapData.height;
	}
}
p = {
	show:function (){
		var s = this,c = LGlobal.canvas;
		if(!s.visible || !s.bitmapData)return;
		c.save();
		if(s.blendMode){
			c.globalCompositeOperation = s.blendMode;
		}
		if(s.filters){
			s.setShadow();
		}
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		if(s.mask != null && s.mask.show){
			s.mask.show();
			c.clip();
		}

		s._transformScale();

		if(s.rotate != 0 && s.rotateCenter){
			s.rotatex = s.getWidth()*0.5;
			s.rotatey = s.getHeight()*0.5;
		}else{
			s.rotatex = s.rotatey = 0;
		}
		s._transformRotate();
		s.draw();
		c.restore(); 
	},
	draw:function(){
		var s=this;
		LGlobal.canvas.drawImage(s.bitmapData.image,
			s.bitmapData.x,s.bitmapData.y,
			s.bitmapData.width,s.bitmapData.height,
			s.x,s.y,
			s.bitmapData.width,s.bitmapData.height);
	},
	ismouseon:function(e,cood){
		var s = this;
		if(e==null || e == UNDEFINED)return false;
		if(!s.visible || !s.bitmapData)return false;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var ox,oy;
		if(e.offsetX == UNDEFINED){
			ox = e.touches[0].pageX;
			oy = e.touches[0].pageY;
		}else{
			ox = e.offsetX;
			oy = e.offsetY;
		}
		if(ox >= s.x + cood.x && ox <= s.x + cood.x + s.bitmapData.width*s.scaleX*cood.scaleX && 
			oy >= s.y + cood.y && oy <= s.y + cood.y + s.bitmapData.height*s.scaleY*cood.scaleY){
			return true;
		}else{
			return false;
		}
	},
	getWidth:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.width*(s.scaleX>0?s.scaleX:-s.scaleX):0;
	},
	getHeight:function(){
		var s = this;
		return s.bitmapData != null?s.bitmapData.height*(s.scaleY>0?s.scaleY:-s.scaleY):0;
	},
	startX:function(){
		return this.x;
	},
	startY:function(){
		return this.y;
	},
	toString:function(){
		return "[LBitmap]";
	}
};
for(var k in p)LBitmap.prototype[k]=p[k];
/*
* LBitmapData.js
**/
function LBitmapData(image,x,y,width,height){
	base(this,LObject,[]);
	var s = this;
	s.type = "LBitmapData";
	s.oncomplete = null;
	s._locked=false;
	s._setPixel=false;
	s.x = (x==null?0:x);  
	s.y = (y==null?0:y);
	if(image && typeof image == "object"){
		s.image = image; 
		s.width = (width==null?s.image.width:width);  
		s.height = (height==null?s.image.height:height);
	}else{
		s.image = new Image();	
		s.width = (width==null?1:width); 
		s.height = (height==null?1:height);
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		if(typeof image == "string"){
			c.fillStyle = image;
			c.fillRect(0,0,s.width,s.height);
		}
		s.image.src = o.toDataURL();
	}
}
p = {
	setProperties:function (x,y,width,height){
		var s = this;
		s.x = x;
		s.y = y;
		s.width = width;
		s.height = height;
		s.resize();
	},
	setCoordinate:function (x,y){
		var s = this;
		s.x = x;
		s.y = y;
	}
	,ready:function(){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		o.width = s.width;
		o.height = s.height;
		c.clearRect(0,0,s.width,s.height);
		c.drawImage(s.image,0,0,s.width,s.height);
	}
	,getPixel:function(x,y){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(x,y,1,1).data;
	}
	,getPixels:function(rect){
		var s = this;
		var o = LGlobal._canvas,c = LGlobal._context;
		if(!s._locked)s.ready();
		return c.getImageData(rect.x,rect.y,rect.width,rect.height);
	}
	,lock:function(){
		var s = this;
		s.ready();
		s._locked=true;
	}
	,unlock:function(){
		var s = this;
		if(s._setPixel)s.image.src = LGlobal._canvas.toDataURL();
		s._locked=false;
		s._setPixel=false;
	}
	,setPixel:function(x,y,data){
		var s = this;
		if(!s._locked)s.ready();
		var c = LGlobal._context;
		c.fillStyle = 'rgb('+data[0]+', '+data[1]+', '+data[2]+')';
		c.fillRect(x,y,1,1);
		s._setPixel=true;
	}
	,setPixels:function(rect, img){
		var s = this;
		if(!s._locked)s.ready();
		LGlobal._context.putImageData(img, rect.x, rect.y,0,0,rect.width,rect.height);
		s._setPixel=true;
	}
	,draw:function(source){
		var s = this;
		s.image.src = source.getDataURL();
		s.resize();
	},
	resize:function(){
		var s = this,w=s.image.width-s.x,h=s.image.height-s.y;
		s.width = s.width<w?s.width:w;
		s.height = s.height<h?s.height:h;
	},
	toString:function(){
		return "[LBitmapData]";
	}
};
for(var k in p)LBitmapData.prototype[k]=p[k];
/*
 * LDropShadowFilter.js
 **/
function LDropShadowFilter(distance,angle,color,blur){
	var s = this;
	base(s,LObject,[]);
	s.type = "LDropShadowFilter";
	s.distance=distance?distance:0;
	s.angle=angle?angle:0;
	s.shadowColor=color?color:"#000000";
	s.shadowBlur=blur?blur:20;
	s.setShadowOffset();
}
LDropShadowFilter.prototype = {
	setShadowOffset:function(){
		var s = this;
		var a = s.angle*Math.PI/180;
		s.shadowOffsetX=s.distance*Math.cos(a);
		s.shadowOffsetY=s.distance*Math.sin(a);
	},
	show:function(){
		var s = this,c = LGlobal.canvas;
		c.shadowColor=s.shadowColor;
		c.shadowBlur=s.shadowBlur;
		c.shadowOffsetX=s.shadowOffsetX;
		c.shadowOffsetY=s.shadowOffsetY;
	},
	setDistance:function(distance){
		this.distance=distance;
		this.setShadowOffset();
	},
	setAngle:function(angle){
		this.angle=angle;
		this.setShadowOffset();
	},
	setColor:function(color){
		this.shadowColor=color;
	},
	setBlur:function(blur){
		this.shadowBlur=blur;
	},
	toString:function(){
		return "[LDropShadowFilter]";
	}
};
/*
* LAnimation.js
**/
function LAnimation(layer,data,list){
	base(this,LSprite,[]);
	var s = this;
	s.type = "LAnimation";
	s.rowIndex = 0;
	s.colIndex = 0;
	s.mode = 1;
	s.isMirror = false;
	s.bitmap =  new LBitmap(data);
	s.imageArray = list;
	s.addChild(s.bitmap);
	if(layer != null)layer.addChild(s);
};
LAnimation.prototype.setAction = function (rowIndex,colIndex,mode,isMirror){
	var s = this;
	if(rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length)s.rowIndex = rowIndex;
	if(colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length)s.colIndex = colIndex;
	if(mode != null)s.mode = mode;
	if(isMirror != null){
		s.isMirror = isMirror;
		if(s.isMirror){
			s.bitmap.x = s.bitmap.getWidth();
			s.bitmap.scaleX = -1*Math.abs(s.bitmap.scaleX);
		}else{
			s.bitmap.x = 0;
			s.bitmap.scaleX = 1*Math.abs(s.bitmap.scaleX);
		}
	}
};
LAnimation.prototype.getAction = function (){
	var s = this;
	return [s.rowIndex,s.colIndex,s.mode,s.isMirror];
};
LAnimation.prototype.onframe = function (){
	var s = this;
	var arr = s.imageArray[s.rowIndex][s.colIndex];
	s.bitmap.bitmapData.setCoordinate(arr.x,arr.y);
	if(typeof arr.script == "function"){
		arr.script(s,arr.params);
	}
	s.colIndex += s.mode;
	if(s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0){
		s.colIndex = s.mode>0?0:s.imageArray[s.rowIndex].length - 1;
		s.dispatchEvent(LEvent.COMPLETE);
	}
};
LAnimation.prototype.toString = function(){
	return "[LAnimation]";
};
/*
* LAnimationTimeline.js
**/
function LAnimationTimeline(data,list){
	var s = this;
	base(s,LAnimation,[null,data,list]);
	s.type = "LAnimationTimeline";
	s.speed = 0;
	s._speedIndex = 0;
	s.labelList = {};
	s.addEventListener(LEvent.ENTER_FRAME,s._onframe);
};
LAnimationTimeline.prototype._onframe = function (event){
	var self = event.target;
	if(self._speedIndex++<self.speed)return;
	self._speedIndex = 0;
	self.onframe();
};
LAnimationTimeline.prototype.setLabel = function (name,_rowIndex,_colIndex,_mode,_isMirror){
	this.labelList[name] = {rowIndex:_rowIndex,colIndex:_colIndex,mode:_mode,isMirror:_isMirror};
};
LAnimationTimeline.prototype.play = function (){
	this.mode = this.saveMode;
};
LAnimationTimeline.prototype.stop = function (){
	this.saveMode = this.mode;
	this.mode = 0;
};
LAnimationTimeline.prototype.gotoAndPlay = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
};
LAnimationTimeline.prototype.gotoAndStop = function (name){
	var l = this.labelList[name];
	this.setAction(l.rowIndex,l.colIndex,l.mode,l.isMirror);
	this.stop();
};
LAnimationTimeline.prototype.addFrameScript = function (name,func,params){
	var l = this.labelList[name];
	var arr = this.imageArray[l.rowIndex][l.colIndex];
	arr.script = func;
	arr.params = params?params:null;
};
LAnimationTimeline.prototype.removeFrameScript = function (name){
	var l = this.labelList[name];
	this.imageArray[l.rowIndex][l.colIndex].script = null;
};
LAnimationTimeline.prototype.toString = function(){
	return "[LAnimationTimeline]";
};
function $LoadManage(){}
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[];
		s.loadStart();
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(d["type"] == "text" || d["type"] == "js"){
			s.loader = new LURLLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),d["type"]);
		}else if(d["type"] == "sound"){
			s.loader = new LSound();
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path));
		}else{
			s.loader = new LLoader();
			s.loader.name = s.list[s.loadIndex].name;
			s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
			s.loader.load(s.url(s.list[s.loadIndex].path),"bitmapData");
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name)s.result[e.target.name] = e.currentTarget;
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			s.loader = null;
			s.oncomplete(s.result);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};
var LEasing = {
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Strong: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c;s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - LEasing.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return LEasing.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return LEasing.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
var Quad = LEasing.Quad;
var Cubic = LEasing.Cubic;
var Quart = LEasing.Quart;
var Quint = LEasing.Quint;
var Sine = LEasing.Sine;
var Strong = LEasing.Strong;
var Expo = LEasing.Expo;
var Circ = LEasing.Circ;
var Elastic = LEasing.Elastic;
var Back = LEasing.Back;
var Bounce = LEasing.Bounce;
function $LTweenLiteChild($target,$duration,$vars){
	var s = this;
	s.objectIndex = s.objectindex = ++LGlobal.objectIndex;
	s.toNew=[];
	s.init($target,$duration,$vars);
}
$LTweenLiteChild.prototype = {
	init:function($target,$duration,$vars){
		var s = this,k=null;
		s.target=$target;s.duration=$duration || 0.001;s.vars=$vars;
		s.currentTime = (new Date()).getTime() / 1000;
		s.delay = s.vars.delay || 0;
		s.combinedTimeScale = s.vars.timeScale || 1;
		s.active = s.duration == 0 && s.delay == 0;
		s.varsto={};
		s.varsfrom={};
		if (typeof(s.vars.ease) != "function") {
			s.vars.ease = Quad.easeOut;
		}
		s.ease = s.vars.ease;
		delete s.vars.ease;
		if(s.vars.onComplete){
			s.onComplete = s.vars.onComplete;
			delete s.vars.onComplete;
		}
		if(s.vars.onUpdate){
			s.onUpdate = s.vars.onUpdate;
			delete s.vars.onUpdate;
		}
		if(s.vars.onStart){
			s.onStart = s.vars.onStart;
			delete s.vars.onStart;
		}
		for(k in s.vars){
			s.varsto[k] = s.vars[k];
			s.varsfrom[k] = s.target[k];
		}
		s.initTime = s.currentTime;
		s.startTime = s.initTime + s.delay;
	},
	tween:function(){
		var s = this;
		var time = (new Date()).getTime() / 1000 , etime;
		etime = (time - s.startTime);
		if(etime < 0)return;
		var tweentype=null;
		for(tweentype in s.varsto){
			var v = s.ease(etime,s.varsfrom[tweentype],s.varsto[tweentype]-s.varsfrom[tweentype],s.duration);
			s.target[tweentype] = v;
		}
		if (etime >= s.duration){
			for(tweentype in s.varsto)s.target[tweentype] = s.varsto[tweentype];
			if(s.onComplete)s.onComplete(s.target);
			return true;
		}else if(s.onUpdate){
			s.onUpdate(s.target);
		}
		return false;
	},
	to:function($target,$duration,$vars){
		var s = this;
		s.toNew.push({target:$target,duration:$duration,vars:$vars});
		return s;
	},
	keep:function(){
		var s = this;
		if(s.toNew.length > 0){
			var t = s.toNew.shift();
			s.init(t.target,t.duration,t.vars);
			return true;
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	show:null,
	frame:function(){
		var s = this;
		var i,length=s.tweens.length,t;
		for(i=0;i < length;i++){
			t = s.tweens[i];
			if(t.tween()){
				s.tweens.splice(i,1);
				i--,length=s.tweens.length;
				if(t.keep())s.add(t);
			}
		}
		if(s.tweens.length == 0)s.show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var s = this;
		var tween = new $LTweenLiteChild($target,$duration,$vars);
		s.tweens.push(tween);
		s.show = s.frame;
		return tween;
	},
	add:function(tween){
		this.tweens.push(tween);
	},
	remove:function(tween){
		var s = this;
		if(typeof tween == UNDEFINED)return;
		for(i=0,l=s.tweens.length;i < l;i++){
			if(tween.objectIndex == s.tweens[i].objectIndex){
				s.tweens.splice(i,1);
				break;
			}
		}
	},
	removeAll:function(){
		this.tweens.splice(0,this.tweens.length);
	}
};
function $Ajax(){}
$Ajax.prototype = {
	get:function(url, data, oncomplete,onerror){
		this.getRequest("GET",url, data, oncomplete,onerror);
	},
	post:function(url, data, oncomplete,onerror){
		this.getRequest("POST",url, data, oncomplete,onerror);
	},
	getRequest:function(t,url, d, oncomplete,err){
		var s = this,k,data="",a="";
		s.err = err;
		var ajax = s.getHttp();
		if (!ajax)return;
		if(d){
			for(k in d){
				data += (a+k+"="+d[k]);
				a="&";	
			}
		}
		if(t.toLowerCase() == "get"){
			url += ((url.indexOf('?')>=0?'&':'?')+data);
			data = null;
		}
		ajax.open(t, url, true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4){
				if(ajax.status >= 200 && ajax.status < 300 || ajax.status === 304){
					if (ajax.responseText.length > 0){
						oncomplete(ajax.responseText);
					}else{
						oncomplete(null);
					}
				}else{
					if(err)err(ajax);
				}
	 		}
		};
		ajax.send(data);
	},
	getHttp:function(){
		if (typeof XMLHttpRequest != UNDEFINED){
			return new XMLHttpRequest();
		}  
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e) {
				if(!this.err)this.err(e);
			}
		}
		return false;
	}
};
function LStageWebView(){
	var s = this;
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style["z-index"] = 11;
	s.display.style.overflow = "auto";
	s.display.appendChild(s.iframe);
}
LStageWebView.prototype = {
	loadURL:function(u){
		this.iframe.src=u;
	},
	show:function(){
		LGlobal.object.appendChild(this.display);
	},
	die:function(){
		LGlobal.object.removeChild(this.display);
	},
	setViewPort:function(r){
		var s = this;
		s.display.style.marginTop = r.y+"px";
		s.display.style.marginLeft = r.x+"px";
		s.display.style.width = r.width+"px";
		s.display.style.height = r.height+"px";
	},
	toString:function(){
		return "[LStageWebView]";
	}
};
function FPS(){
        var s = this;
        base(s,LSprite,[]);
        s.fps = new LTextField();
        s.fpsCount = 0;
        s.fpsTime = (new Date()).getTime();
        s.fps.color = "#ffffff";
        s.addChild(s.fps);
        s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
}
FPS.prototype.showFPS = function(s){
        s.fpsCount++;
        var t = (new Date()).getTime();
        if(t - s.fpsTime < 1000)return;
        s.fpsTime = t;
        s.fps.text = s.fpsCount;
        s.fpsCount = 0;
        s.graphics.clear();
        s.graphics.drawRect(0,"#000000",[0,0,s.fps.getWidth(),20],true,"#000000");
};
(function(){
	LAjax = new $Ajax();
	LLoadManage = new $LoadManage();
	LTweenLite = new $LTweenLite();
	LGlobal.childList.push(LTweenLite);
})();
/*
* LQuadTree.js
**/
function LQuadTree(rect){
	var self = this;
	self.q1 = null;
	self.q2 = null;
	self.q3 = null;
	self.q4 = null;
	self.parent = null;
	self.data = [];
	self.rect = rect;
	self.root = self;
}
LQuadTree.prototype = {
	createChildren:function (deep){
		if (deep == 0)return;
		var self = this;
		var hw = self.rect.width / 2 , hh = self.rect.height / 2;
		self.q1 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y, hw, hh));
		self.q2 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y + hh, hw, hh));
		self.q3 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y + hh, hw, hh));
		self.q4 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y, hw, hh));
		self.q1.parent = self.q2.parent = self.q3.parent = self.q4.parent = self;
		self.q1.root = self.q2.root = self.q3.root = self.q4.root = self.root;
		self.q1.createChildren(deep - 1);
		self.q2.createChildren(deep - 1);
		self.q3.createChildren(deep - 1);
		self.q4.createChildren(deep - 1);
	},
	hasChildren:function(){
		var self = this;
		return self.q1 && self.q2 && self.q3 && self.q4;
	},
	clear:function(){
		var self = this;
		if (self.hasChildren()){
			return self.q1.clear() || self.q2.clear()|| self.q3.clear() || self.q4.clear();
		}else{
			self.q1 = null;
			self.q2 = null;
			self.q3 = null;
			self.q4 = null;
			self.parent = null;
			self.data = [];
			return self;
		}
	},
	add:function(v, x, y){
		var self = this;
		if (!self.isIn(x,y))return null;
		if (self.hasChildren()){
			return self.q1.add(v,x,y) || self.q2.add(v,x,y) || self.q3.add(v,x,y) || self.q4.add(v,x,y);
		}else{
			self.data.push(v);
			return self;
		}
	},
	remove:function(v, x, y){
		var self = this;
		if (!self.isIn(x,y))return null;
		if (self.hasChildren()){
			return self.q1.remove(v,x,y) || self.q2.remove(v,x,y) || self.q3.remove(v,x,y) || self.q4.remove(v,x,y);
		}else{
			var index = self.data.indexOf(v);
			if (index!=-1){
				self.data.splice(index, 1);
				return self;
			}else{
				return null;
			}
		}
	},
	isIn:function(x, y){
		var self = this;
		return (typeof x == UNDEFINED || (x >= self.rect.x && x < self.rect.right)) && (typeof y == UNDEFINED || (y >= self.rect.y && y < self.rect.bottom));
	},
	getDataInRect:function(rect){
		var self = this;
		if (!self.rect.intersects(rect))return [];
		var r = self.data.concat();
		if (self.hasChildren()){
			r.push.apply(r,self.q1.getDataInRect(rect));
			r.push.apply(r,self.q2.getDataInRect(rect));
			r.push.apply(r,self.q3.getDataInRect(rect));
			r.push.apply(r,self.q4.getDataInRect(rect));
		}
		return r;
	},
	toString:function(){
		return "[LQuadTree]";
	}
};
function LoadingSample1(step,b,c){
	base(this,LSprite,[]);
	var s = this;
	s.numberList = new Array(
		[1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
		[0,1,0,1,1,0,0,1,0,0,1,0,0,1,0],
		[1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
		[1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
		[1,0,1,1,0,1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
		[1,1,1,1,0,0,1,1,1,1,0,1,1,1,1],
		[1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
		[1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,1,1,1,0,1,1,1,1,0,0,1,1,1,1]
	);
	s.backgroundColor = b==null?"#000000":b;
	s.color = c==null?"#ffffff":c;
	s.progress = 0;
	s.step = step==null?LGlobal.width*0.5/15:step;
	s.back = new LSprite();
	s.addChild(s.back);
	s.num = new LSprite();
	s.addChild(s.num);
	s.num.mask = new LSprite();
	s.screenX = (LGlobal.width - s.step*15)/2;
	s.screenY = (LGlobal.height - s.step*5)/2;
	s.num.x = s.screenX;
	s.num.y = s.screenY;
	s.setProgress(s.progress);
}
LoadingSample1.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	var num_0="" , num_1 , num_2 , i;
	var s_x = s.step;
	if(value >= 100){
		num_0 = s.getNumber(1);
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(0);
		s_x = s.step*3;
	}else if(value >= 10){
		num_1 = s.getNumber(Math.floor(value/10));
		num_2 = s.getNumber(value%10);
	}else{
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(value);
	}
	s.back.graphics.clear();
	s.back.graphics.add(function(){
		c.beginPath();
		c.fillStyle = s.backgroundColor;
		c.fillRect(0,0,LGlobal.width,LGlobal.height);
		c.closePath();
		c.fillStyle = s.color;
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.fillRect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		c.moveTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*10.5,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*9.3,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.fill();
		c.moveTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step);
		c.arc(s.screenX + s_x + s.step*8.5,s.screenY + s.step
			,s.step*0.6,0,360+Math.PI/180);
		c.moveTo(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4);
		c.arc(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4
			,s.step*0.6,0,360+Math.PI/180);
		c.fill();
		
	});
	s.num.mask.graphics.clear();
	s.num.mask.graphics.add(function(){
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.rect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(var i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(var i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
	});
	c.fillStyle = LGlobal._create_loading_color();
	s.num.graphics.clear();
	s.num.graphics.drawRect(1,c.fillStyle,[0,s.step*5*(100-value)*0.01,LGlobal.width,LGlobal.height],true,c.fillStyle);
};
LoadingSample1.prototype.getNumber = function (value){
	return this.numberList[value];
};
function LoadingSample2(size,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas,t = "Loading...",l;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);

	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.size = size==null?LGlobal.height*0.2:size;
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = "#ffffff";
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	s.addChild(l);
	s.backLabel = l;
	
	l = new LTextField();
	l.text = "***%";
	l.size = s.size*0.3;
	l.color = color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2 - s.size*0.4;
	s.addChild(l);
	s.progressLabel = l;
	
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = s.color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	l.mask = new LGraphics();
	s.screenX = l.x;
	s.screenY = l.y;
	s.screenWidth = l.getWidth();
	s.addChild(l);
	s.showLabel=l;

	c.shadowOffsetX = 2;  
	c.shadowOffsetY = 2;
	c.shadowColor = "blue"; 
	s.setProgress(s.progress);
}
LoadingSample2.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	s.progressLabel.text = value + "%";
	s.showLabel.mask.clear();
	s.showLabel.mask.drawRect(0,"#000000",[s.screenX,0,s.screenWidth*value*0.01,LGlobal.height]);
	if(value >= 100){
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 0;
	}
};
function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.screenWidth = LGlobal.width*0.75;
	s.screenHeight = height==null?LGlobal.height*0.1:height;
	if(s.screenHeight > 5)s.screenHeight=5;
	s.screenX = (LGlobal.width - s.screenWidth)/2;
	s.screenY = (LGlobal.height - s.screenHeight)/2;
	s.back = new LSprite();
	s.addChild(s.back);
	s.label = new LTextField();
	s.label.color="#ffffff";
	s.label.weight="bolder";
	s.label.size = s.screenHeight * 2;
	s.label.x = s.screenX + (s.screenWidth - s.label.getWidth())*0.5;
	s.label.y = s.screenY - s.screenHeight * 4;
	s.addChild(s.label);
	s.star = new Array();
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(s){
	var i,star,l;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0,l=s.star.length;i<l;i++){
				s.removeChild(s.star[i]);
			}
			s.star.length = 0;
		}
		return;
	}
	for(i=0,l=s.star.length;i<l;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--,l--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(step*2,step);
		c.lineTo(step*4,0);
		c.lineTo(step*3,step*2);
		c.lineTo(step*4,step*4);
		c.lineTo(step*2,step*3);
		c.lineTo(0,step*4);
		c.lineTo(step,step*2);
		c.lineTo(0,0);
		c.fill();
	});
	star.x = s.screenX + s.screenWidth*s.progress*0.01;
	star.y=s.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	s.star.push(star);
	s.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	if(value > 100)value=100;
	s.progress = value;
	s.back.graphics.clear();
	s.back.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#00FFFF";
		c.rect(s.screenX - 3, s.screenY - 3, s.screenWidth + 6, s.screenHeight + 6);
		c.fill();
		c.beginPath();
		c.fillStyle = "#990033";
		c.rect(s.screenX, s.screenY, s.screenWidth, s.screenHeight);
		c.fill();
		c.beginPath();
		c.fillStyle = s.color;
		c.rect(s.screenX, s.screenY, s.screenWidth*value*0.01, s.screenHeight);
		c.fill();
	});
	s.label.text = value + "%";
};
function LoadingSample4(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	for(var i=0;i<360;i++){
		s.arc.graphics.drawArc(1+i/36,color,[0,0,50,(2*Math.PI/360)*i,(2*Math.PI/360)*(i+2)]);
	}
	s.progress = 0;
	s.label = new LTextField();
	s.label.color=color;
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample4.prototype.onframe = function(event){
	event.target.arc.rotate += 20;
};
LoadingSample4.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LoadingSample5(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	var r = 50;
	for(var i=0;i<360;i+=30){
		var child = new LSprite();
		child.graphics.drawArc(0,color,[r,0,7,0,2*Math.PI],true,color);
		child.rotate = i;
		child.alpha = 0.1+i/360;
		s.arc.addChild(child);
	}
	s.index = 0;
	s.max = 3;
	s.progress = 0;
	s.label = new LTextField();
	s.label.color="#FFFFFF";
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample5.prototype.onframe = function(event){
	var s = event.target;
	if(s.index++ < s.max)return;
	s.index = 0;
	s.arc.rotate += 30;
};
LoadingSample5.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LBox2d(){
	var s = this,i,j,b=Box2D,
	a=[b.Collision,b.Common,b.Common.Math,
	b.Dynamics,b.Dynamics.Contacts,b.Dynamics.Controllers,b.Dynamics.Joints,b.Collision.Shapes];
	for(i in a)for(j in a[i])s[j]=a[i][j];
	s.drawScale = 30;
	s.selectedBody = null;
	s.mouseJoint = null;
	s.mousePVec = null;
	s.contactListener = null;
	s.world = new s.b2World(new s.b2Vec2(0, 9.8),true);
	s.removeList = new Array();
	if(LGlobal.traceDebug){
		var d = new s.b2DebugDraw();
		d.SetSprite(LGlobal.canvas);
		d.SetLineThickness(1);
		d.SetFillAlpha(0.5);
		d.SetAlpha(1);
		d.SetDrawScale(s.drawScale);
		d.SetFlags(s.b2DebugDraw.e_shapeBit | s.b2DebugDraw.e_jointBit);
		s.world.SetDebugDraw(d);
	}
	LGlobal.destroy = true;
}
LBox2d.prototype = {
	setEvent:function(t_v,f_v){
		var s = this;
		if(!s.contactListener){
			s.contactListener = new s.b2ContactListener();
			s.world.SetContactListener(s.contactListener);
		}
		switch(t_v){
			case LEvent.END_CONTACT:
				s.contactListener.EndContact = f_v;
				break;
			case LEvent.PRE_SOLVE:
				s.contactListener.PreSolve = f_v;
				break;
			case LEvent.POST_SOLVE:
				s.contactListener.PostSolve = f_v;
				break;
			case LEvent.BEGIN_CONTACT:
			default:
				s.contactListener.BeginContact = f_v;
		}
	},
	setWeldJoint:function(A,B){ 
		var s = this; 
		var j = new s.b2WeldJointDef();
		j.Initialize(B, A, B.GetWorldCenter());
		return s.world.CreateJoint(j);
	},
	setLineJoint:function(A,B,vec,t,m){
		var s = this; 
		var wa = new s.b2Vec2(vec[0],vec[1]);
		var j = new s.b2LineJointDef();
		j.Initialize(A, B, B.GetWorldCenter(), wa);
		if(t == null){
			j.enableLimit = false;
		}else{
			j.lowerTranslation = t[0];
			j.upperTranslation = t[1];
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorForce = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j);
	},
	setGearJoint:function(A,B,ra,r,p){ 
		var s = this; 
		var j = new s.b2GearJointDef();
		j.joint1 = r;
		j.joint2 = p;
		j.bodyA = A;
		j.bodyB = B;
		j.ratio = ra * s.b2Settings.b2_pi / (300 / s.drawScale);
		return s.world.CreateJoint(j);
	},
	setPrismaticJoint:function(A,B,vec,t,m){
		var s = this;
		var wa = new s.b2Vec2(vec[0],vec[1]);
		var j = new s.b2PrismaticJointDef();
		j.Initialize(B, A, B.GetWorldCenter(), wa);
		if(t == null){
			j.enableLimit = false;
		}else{
			j.lowerTranslation = t[0];
			j.upperTranslation = t[1];
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorForce = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j);
	},
	setRevoluteJoint:function(A,B,a,m){
		var s = this;
		var j  = new s.b2RevoluteJointDef();
		j .Initialize(A, B, B.GetWorldCenter());
		if(a == null){
			j.enableLimit = false;
		}else{
			j.lowerAngle = a[0] * s.b2Settings.b2_pi/180;
			j.upperAngle = a[1] * s.b2Settings.b2_pi/180;
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorTorque = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j ); 
	},
	setDistanceJoint:function(A,B){
		var s = this;
		var j = new s.b2DistanceJointDef();
		j.Initialize(A, B, A.GetWorldCenter(), B.GetWorldCenter());
		return s.world.CreateJoint(j); 
	},
	setPulleyJoint:function(A,B,vA,vB,ratio){
		var s = this;
		var a1 = A.GetWorldCenter();  
		var a2 = B.GetWorldCenter();
		var g1 = new s.b2Vec2(a1.x + (vA[0] / s.drawScale), a1.y + (vA[1] / s.drawScale));
		var g2 = new s.b2Vec2(a2.x + (vB[0] / s.drawScale), a2.y + (vB[1] / s.drawScale));
		var j = new s.b2PulleyJointDef();  
		j.Initialize(A, B, g1, g2, a1, a2,ratio);  
		j.maxLengthA = vA[2] / s.drawScale;
		j.maxLengthB = vB[2] / s.drawScale;
		return s.world.CreateJoint(j);
	},
	addCircle:function(r,cx,cy,t,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = t;
		s.fixDef = new s.b2FixtureDef;
		/*密度*/
		s.fixDef.density = d;
		/*摩擦*/
		s.fixDef.friction = f;
		/*弹力*/
		s.fixDef.restitution = e;
		/*加入球*/
		s.fixDef.shape = new s.b2CircleShape( r );
		/*坐标*/
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addPolygon:function(w,h,cx,cy,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = type;
		s.fixDef = new s.b2FixtureDef;
		/*密度*/
		s.fixDef.density = d;
		/*摩擦*/
		s.fixDef.friction = f;
		/*弹力*/
		s.fixDef.restitution = e;
		/*加入球*/
		s.fixDef.shape = new s.b2PolygonShape;
		s.fixDef.shape.SetAsBox(w,h);
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addVertices:function(vertices,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		/*动态*/
		s.bodyDef.type = type;
		var shape = s.world.CreateBody(s.bodyDef);
		for(var i = 0,l=vertices.length; i<l; i++){
			s.createShapeAsArray(shape,vertices[i],type,d,f,e);
		}
		return shape;
	},
	createShapeAsArray:function(c,vertices,type,d,f,e){
		var s = this;
		var shape = new s.b2PolygonShape();
		var sv = s.createVerticesArray(vertices);
		shape.SetAsArray(sv,0);
		var def = new s.b2FixtureDef();
		def.shape = shape;
		/*密度*/
		def.density = d;
		/*摩擦*/
		def.friction = f;
		/*弹力*/
		def.restitution = e;
		c.CreateFixture(def);
	},
	createVerticesArray:function(a){
		var s = this;
		var v = new Array();
		if(a.length < 3)return v;
		for (var i = 0,l=a.length; i<l; i++){
			v.push(new s.b2Vec2(a[i][0]/s.drawScale, a[i][1]/s.drawScale));
		}
		return v;
	},
	getBodyAtMouse:function (mouseX, mouseY) { 
 		var s = this;
		s.mousePVec = new s.b2Vec2(mouseX, mouseY);
		var aabb = new s.b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
		s.selectedBody = null;
		s.world.QueryAABB(s.getBodyCallBack, aabb);
		return s.selectedBody;
	},
	getBodyCallBack:function (fixture) {
		var s = LGlobal.box2d;
		if(fixture.GetBody().GetType() != s.b2Body.b2_staticBody) {
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), s.mousePVec)) {
				s.selectedBody = fixture.GetBody();
				return false;
			}
		}
		return true;
	},
	show:function(){
		var s = this,k=null;
		for(k in s.removeList){
			s.world.DestroyBody(s.removeList[k]);
		}
		s.removeList.splice(0,s.removeList.length);
		s.world.Step(1 / 30,10,10);
		s.world.ClearForces();
		if(LGlobal.traceDebug){
			s.world.DrawDebugData();
		}
	},
	synchronous:function(){
		var s = this;
		var parent = null,child,position=null,cx=0,cy=0,currentBody,joint;
		for (currentBody=s.world.GetBodyList(); currentBody; currentBody=currentBody.GetNext()) {
			child = currentBody.GetUserData();
			if(child){
				if(position==null){
					parent = child.parent;
					cx = currentBody.GetPosition().x;
					cy = currentBody.GetPosition().y;
				}
				currentBody.SetPosition(new s.b2Vec2(
					(child.x + child.rotatex + parent.x)/s.drawScale,
					(child.y + child.rotatey + parent.y)/s.drawScale ));
				if(position==null){
					position = {x:(currentBody.GetPosition().x - cx),y:(currentBody.GetPosition().y - cy)};
				}
			}
		}
		for (joint=s.world.GetJointList(); joint; joint=joint.GetNext()) {
			if(joint.m_groundAnchor1){
				joint.m_groundAnchor1.x += position.x;
				joint.m_groundAnchor1.y += position.y;
			}
			if(joint.m_groundAnchor2){
				joint.m_groundAnchor2.x += position.x;
				joint.m_groundAnchor2.y += position.y;
			}
		}
	}
};
LSprite.prototype.setBodyMouseJoint = function(value){
	var s = this;
	if(!s.box2dBody)return;
	s.box2dBody.mouseJoint = value;
};
LSprite.prototype.clearBody = function(value){
	var s = this;
	if(!s.box2dBody)return;
	LGlobal.box2d.removeList.push(s.box2dBody);
	s.box2dBody = null;
};
LSprite.prototype.addBodyCircle = function(radius,cx,cy,type,density,friction,restitution){
	var s = this;
	s.rotatex = radius;
	s.rotatey = radius;
	s.box2dBody = LGlobal.box2d.addCircle(
		radius/LGlobal.box2d.drawScale,
		(s.x+cx)/LGlobal.box2d.drawScale,
		(s.y+cy)/LGlobal.box2d.drawScale,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
		density==null?.5:density,
		friction==null?0.4:friction,
		restitution==null?0.8:restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyPolygon = function(w,h,type,density,friction,restitution){
	var s = this;
	s.rotatex = w/2;
	s.rotatey = h/2;
	s.box2dBody = LGlobal.box2d.addPolygon(
		w*0.5/LGlobal.box2d.drawScale,
		h*0.5/LGlobal.box2d.drawScale,
		s.x/LGlobal.box2d.drawScale,
		s.y/LGlobal.box2d.drawScale,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
		density==null?.5:density,
		friction==null?0.4:friction,
		restitution==null?0.8:restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyVertices = function(vertices,cx,cy,type,density,friction,restitution){
	var s = this;
	s.rotatex = 0;
	s.rotatey = 0;
	s.box2dBody = LGlobal.box2d.addVertices(vertices,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density,friction,restitution);
	s.box2dBody.SetUserData(s);
	s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x+cx)/LGlobal.box2d.drawScale,(s.y+cy)/LGlobal.box2d.drawScale));
};
LGlobal.mouseJoint_start = function(eve){
	if(LGlobal.box2d.mouseJoint)return;
	var mX = eve.offsetX / LGlobal.box2d.drawScale
	,mY = eve.offsetY / LGlobal.box2d.drawScale
	,b = LGlobal.box2d.getBodyAtMouse(mX, mY);
	if(b && b.mouseJoint) {
		var m = new LGlobal.box2d.b2MouseJointDef();
		m.bodyA = LGlobal.box2d.world.GetGroundBody();
		m.bodyB = b;
		m.target.Set(mX, mY);
		m.collideConnected = true;
		m.maxForce = 300000.0 * b.GetMass();
		LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(m);
		b.SetAwake(true);
	};
};
LGlobal.mouseJoint_move = function(eve){
	if(!LGlobal.box2d.mouseJoint)return;
	mX = eve.offsetX / LGlobal.box2d.drawScale,
	mY = eve.offsetY / LGlobal.box2d.drawScale;
	if(LGlobal.box2d.mouseJoint) {
		LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mX, mY));
	}
};
function LTransition(displayObject,transObj){
	this.child = displayObject;
	this.trans = transObj;
}
LTransition.prototype={
	startTransition:function(){
		var self = this;
		switch(self.trans.type){
			case LTransition.Blinds:
				self.blinds();
				break;
			case LTransition.Fade:
				self.fade();
				break;
			case LTransition.Fly:
				self.fly();
				break;
			case LTransition.Iris:
				self.iris();
				break;
			case LTransition.Squeeze:
				self.squeeze();
				break;
			case LTransition.Wipe:
				self.wipe();
				break;
			case LTransition.Zoom:
				self.zoom();
				break;
			case LTransition.PixelDissolve:
				self.pixelDissolve();
				break;
			case LTransition.Curtain:
				self.curtain();
				break;
			default:
				throw("the type is not exists.");
		}
	},
	blindsComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.blindsUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	blindsUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.dimension){
			g.add(function(){
				c.save();
				for(var i=0;i<self.trans.numStrips;i++){
					c.rect(i*self.maxSize,0,self.blindsSize,self.child.getHeight());
				}
				c.restore();
			});
		}else{
			g.add(function(){
				c.save();
				for(var i=0;i<self.trans.numStrips;i++){
					c.rect(0,0 + i*self.maxSize,self.child.getWidth(),self.blindsSize);
				}
				c.restore();
			});
		}
	},
	blindsUpdate:function(self){
		self.blindsUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	blinds:function(){
		var self = this;
		if(!self.trans.numStrips)self.trans.numStrips = 1;
		self.blindsSize = 0;
		if(self.trans.dimension){
			self.maxSize = self.child.getWidth()/self.trans.numStrips >> 0;
		}else{
			self.maxSize = self.child.getHeight()/self.trans.numStrips >> 0;
		}
		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.blindsSize = self.maxSize;
			toSize = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                blindsSize:toSize,
	                onComplete:self.blindsComplete,
			onUpdate:self.blindsUpdate,
	                ease:self.trans.easing
	        });
	},
	fadeComplete:function(self){
		self.child.alpha = self.alpha;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	fadeUpdate:function(self){
		self.child.alpha = self.alpha;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	fade:function(){
		var self = this;
		var toAlpha = 1;
		self.alpha = 0;
		if(self.trans.direction == LTransition.OUT){
			self.alpha = 1;
			toAlpha = 0;
		}
		self.child.alpha = self.alpha;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                alpha:toAlpha,
	                onComplete:self.fadeComplete,
			onUpdate:self.fadeUpdate,
	                ease:self.trans.easing
	        });
	},
	flyComplete:function(self){
		self.child.x = self.x;
		self.child.y = self.y;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	flyUpdate:function(self){
		self.child.x = self.x;
		self.child.y = self.y;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	fly:function(){
		var self = this;
		var toX = self.child.x;
		var toY = self.child.y;
		switch(self.trans.startPoint){
			case 1:
				self.x = -self.child.getWidth();
				self.y = -self.child.getHeight();
				break;
			case 2:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = -self.child.getHeight();
				break;
			case 3:
				self.x = LGlobal.width;
				self.y = -self.child.getHeight();
				break;
			case 4:
				self.x = -self.child.getWidth();
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
				break;
			case 6:
				self.x = LGlobal.width;
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
				break;
			case 7:
				self.x = -self.child.getWidth();
				self.y = LGlobal.height;
				break;
			case 8:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = LGlobal.height;
				break;
			case 9:
				self.x = LGlobal.width;
				self.y = LGlobal.height;
				break;
			case 5:
			default:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
		}
		if(self.trans.direction == LTransition.OUT){
			var toX = self.x;
			var toY = self.y;
			self.x = self.child.x;
			self.y = self.child.y;
		}else{
			self.child.x = self.x;
			self.child.y = self.y;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                x:toX,
	                y:toY,
	                onComplete:self.flyComplete,
			onUpdate:self.flyUpdate,
	                ease:self.trans.easing
	        });
	},
	irisComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.irisUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	irisUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.shape == LIris.CIRCLE){
			g.drawArc(0,"#000000",[self.x,self.y,self.r,0,Math.PI*2]);
		}else{
			g.drawRect(0,"#000000",[self.x+self.sLeft,self.y+self.sTop,self.width,self.height]);
		}
	},
	irisUpdate:function(self){
		self.irisUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	iris:function(){
		var self = this;
		self.sLeft = 0;
		self.sTop = 0;
		self.width = 0;
		self.height = 0;
		self.x = 0;
		self.y = 0;
		self.r = 0;
		self.eWidth = self.child.getWidth();
		self.eHeight = self.child.getHeight();
		switch(self.trans.startPoint){
			case 1:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				break;
			case 2:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+self.eHeight*self.eHeight);
				self.x = self.child.getWidth()*0.5;
				break;
			case 3:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.x = self.child.getWidth();
				break;
			case 4:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.y = self.child.getHeight()*0.5;
				break;
			case 6:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.x = self.child.getWidth();
				self.y = self.child.getHeight()*0.5;
				break;
			case 7:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.y = self.child.getHeight();
				break;
			case 8:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+self.eHeight*self.eHeight);
				self.x = self.child.getWidth()*0.5;
				self.y = self.child.getHeight();
				break;
			case 9:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.x = self.child.getWidth();
				self.y = self.child.getHeight();
				break;
			case 5:
			default:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.x = self.child.getWidth()*0.5;
				self.y = self.child.getHeight()*0.5;
		}
		self.eLeft = -self.x;
		self.eTop = -self.y;

		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.sLeft = self.eLeft;
			self.sTop = self.eTop;
			self.eLeft = 0;
			self.eTop = 0;
			self.width = self.eWidth;
			self.height = self.eHeight;
			self.eWidth = 0;
			self.eHeight = 0;
			self.r = self.eR;
			self.eR = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                width:self.eWidth,
	                height:self.eHeight,
			sLeft:self.eLeft,
			sTop:self.eTop,
			r:self.eR,
	                onComplete:self.irisComplete,
			onUpdate:self.irisUpdate,
	                ease:self.trans.easing
	        });
	},
	curtainComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.curtainUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	curtainUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.dimension){
			g.add(function(){
				c.save();
				c.rect(0,0,self.width,self.child.getHeight());
				c.rect(self.child.getWidth()-self.width,0,self.width,self.child.getHeight());
				c.restore();
			});
		}else{
			g.add(function(){
				c.save();
				c.rect(0,0,self.child.getWidth(),self.height);
				c.rect(0,self.child.getHeight()-self.height,self.child.getWidth(),self.height);
				c.restore();
			});
		}
	},
	curtainUpdate:function(self){
		self.curtainUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	curtain:function(){
		var self = this;
		var eW = self.child.getWidth()*0.5;
		var eH = self.child.getHeight()*0.5;
		if(self.trans.dimension){
			eH = 0;
		}else{
			eW = 0;
		}
		self.width = 0;
		self.height = 0;
		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.width = eW;
			self.height = eH;
			eW = 0;
			eH = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                width:eW,
	                height:eH,
	                onComplete:self.curtainComplete,
			onUpdate:self.curtainUpdate,
	                ease:self.trans.easing
	        });
	},
	squeezeComplete:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	squeezeUpdate:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	squeeze:function(){
		var self = this;
		var toScaleX = 1,toScaleY = 1;
		self.scaleX = 0,self.scaleY = 0;
		if(self.trans.dimension){
			self.scaleX = 1;
		}else{
			self.scaleY = 1;
		}
		if(self.trans.direction == LTransition.OUT){
			toScaleX = self.scaleX,toScaleY = self.scaleY;
			self.scaleX = 1,self.scaleY = 1;
		}
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                scaleX:toScaleX,
	                scaleY:toScaleY,
	                onComplete:self.squeezeComplete,
			onUpdate:self.squeezeUpdate,
	                ease:self.trans.easing
	        });
	},
	zoomComplete:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	zoomUpdate:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	zoom:function(){
		var self = this;
		var toScaleX = 1,toScaleY = 1;
		self.scaleX = 0,self.scaleY = 0;
		if(self.trans.direction == LTransition.OUT){
			toScaleX = 0,toScaleY = 0;
			self.scaleX = 1,self.scaleY = 1;
		}
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                scaleX:toScaleX,
	                scaleY:toScaleY,
	                onComplete:self.zoomComplete,
			onUpdate:self.zoomUpdate,
	                ease:self.trans.easing
	        });
	},
	wipeComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.wipeUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	wipeUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		g.drawVertices(0,"#000000",[[self.leftTopX,self.leftTopY],[self.leftBottomX,self.leftBottomY],[self.rightBottomX,self.rightBottomY],[self.rightTopX,self.rightTopY]]);
	},
	wipeUpdate:function(self){
		self.wipeUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	wipe:function(){
		var self = this,w=self.child.getWidth(),h=self.child.getHeight(),
		ltX = self.leftTopX = 0,
		ltY = self.leftTopY = 0,
		lbX = self.leftBottomX = 0,
		lbY = self.leftBottomY = h,
		rtX = self.rightTopX = w,
		rtY = self.rightTopY = 0,
		rbX = self.rightBottomX = w,
		rbY = self.rightBottomY = h;
		switch(self.trans.startPoint){
			case 1:
				ltX = self.leftTopX = -w;
				lbX = self.leftBottomX = -w*2;
				self.rightTopX = 0;
				rtX = w*2;
				self.rightBottomX = -w;
				rbX = w;
				break;
			case 2:
				ltY = self.leftTopY = -h;
				self.leftBottomY = 0;
				lbY = h;
				rtY = self.rightTopY = -h;
				self.rightBottomY = 0;
				rbY = h;
				break;
			case 3:
				self.leftTopX = w;
				ltX = -w;
				self.leftBottomX = w*2;
				lbX = 0;
				rtX = self.rightTopX = w*2;
				rbX = self.rightBottomX = w*3;
				break;
			case 4:
				self.rightTopX = 0;
				rtX = w;
				self.rightBottomX = 0;
				rbX = w;
				break;
			case 6:
				self.leftTopX = w;
				ltX = 0;
				self.leftBottomX = w;
				lbX = 0;
				break;
			case 7:
				lbX = self.leftBottomX = -w;
				ltX = self.leftTopX = -w*2;
				self.rightBottomX = 0;
				rbX = w*2;
				self.rightTopX = -w;
				rtX = w;
				break;
			case 8:
				lbY = self.leftBottomY = h;
				self.leftTopY = h;
				ltY = 0;
				rbY = self.rightBottomY = h;
				self.rightTopY = h;
				rtY = 0;
				break;
			case 9:
				self.leftBottomX = w;
				lbX = -w;
				self.leftTopX = w*2;
				ltX = 0;
				rbX = self.rightBottomX = w*2;
				rtX = self.rightTopX = w*3;
				break;
			case 5:
			default:
				self.leftTopX = w*0.5;
				self.leftTopY = h*0.5;
				self.rightTopX = w*0.5;
				self.rightTopY = h*0.5;
				self.leftBottomX = w*0.5;
				self.leftBottomY = h*0.5;
				self.rightBottomX = w*0.5;
				self.rightBottomY = h*0.5;
				ltX = 0,ltY = 0;
				lbX = 0,lbY = h;
				rtX = w,rtY = 0;
				rbX = w,rbY = h;
		}

		var g = new LGraphics();
		self.child.mask = g;
		if(self.trans.direction == LTransition.OUT){
			var oltX=ltX,oltY=ltY,olbX=lbX,olbY=lbY,ortX=rtX,ortY=rtY,orbX=rbX,orbY=rbY;
			ltX=self.leftTopX,ltY=self.leftTopY,lbX=self.leftBottomX,lbY=self.leftBottomY,rtX=self.rightTopX,rtY=self.rightTopY,rbX=self.rightBottomX,rbY=self.rightBottomY;
			self.leftTopX=oltX,self.leftTopY=oltY,self.leftBottomX=olbX,self.leftBottomY=olbY,self.rightTopX=ortX,self.rightTopY=ortY,self.rightBottomX=orbX,self.rightBottomY=orbY;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                leftTopX:ltX,
	                leftTopY:ltY,
	                leftBottomX:lbX,
	                leftBottomY:lbY,
	                rightTopX:rtX,
	                rightTopY:rtY,
	                rightBottomX:rbX,
	                rightBottomY:rbY,
	                onComplete:self.wipeComplete,
			onUpdate:self.wipeUpdate,
	                ease:self.trans.easing
	        });
	},
	pixelDissolveComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.pixelDissolveUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	pixelDissolveUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas,list;
		g.clear();
		g.add(function(){
			c.save();
			for(var i=0;i<self.index;i++){
				list = self.list[i];
				c.rect(list[0]*self.w,list[1]*self.h,self.w,self.h);
			}
			c.restore();
		});
	},
	pixelDissolveUpdate:function(self){
		self.pixelDissolveUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	pixelDissolve:function(){
		var self = this;
		var g = new LGraphics();
		self.child.mask = g;LGlobal.mg = g;
		self.w = self.child.getWidth()/self.trans.xSections,
		self.h = self.child.getHeight()/self.trans.ySections;
		self.list = [];
		for(var i=0;i<self.trans.xSections;i++){
			for(var j=0;j<self.trans.ySections;j++){
				self.list.push([i,j]);
			}
		}
		self.index=0;
		var to = self.trans.xSections*self.trans.ySections;
		if(self.trans.direction == LTransition.OUT){
			self.index = to;
			to = 0;
		}
		self.list = self.list.sort(function(a,b){return Math.random()>0.5;});
		self.pixelDissolveUpdateRun();
	        LTweenLite.to(self,self.trans.duration,
	        {
	                index:to,
	                onComplete:self.pixelDissolveComplete,
			onUpdate:self.pixelDissolveUpdate,
	                ease:self.trans.easing
	        });
	}
};
LTransition.IN = "in";
LTransition.OUT = "out";
/*Blinds：使用逐渐消失或逐渐出现的矩形来显示影剪对象。
	参数：
	numStrips：“遮帘”效果中的遮罩条纹数，建议范围1-50.
	dimension：指示遮罩条纹是垂直的（0）还是水平的（1）。遮罩条纹是垂直的，也意味着显示出来的是水平条纹的影片剪辑。*/
LTransition.Blinds = 1;
/*Fade：淡入淡出效果。
	无参数*/
LTransition.Fade = 2;
/*Fly：从某一指定方向滑入影片剪辑对象。
	参数：
	startPoint:一个指示起始位置的整数，范围1-9：
	1：左上     2：上中     3：右上     4：左中
	5：中心     6：右中     7：左下     8：下中
	9：右下*/
LTransition.Fly = 3;
/*Iris：使用可以缩放的方形或圆形动画遮罩来显示影剪对象。
	参数：
	startPoint:同上
	shape:LIris.SQUARE(方形)或LIris.CIRCLE（圆形）的遮罩形状*/
LTransition.Iris = 4;
/*Curtain：使用挤压遮帘效果水平或垂直显示对象。
	参数：
	dimension：挤压效果是水平的（0）还是垂直的（1）。*/
LTransition.Curtain = 5;
/*PixelDissolve：使用随机出现或消失的棋盘图案矩形来显示影剪。
	参数：
	xSections:整数，沿水平轴的遮罩矩形的数目（建议1-25）
	ySections:整数，沿垂直轴的遮罩矩形的数目（建议1-25）*/
LTransition.PixelDissolve = 6;
/*Squeeze：水平或垂直缩放影剪对象。
	参数：
	dimension：挤压效果是水平的（0）还是垂直的（1）。*/
LTransition.Squeeze = 7;
/*Wipe：使用水平移动的某一形状的动画遮罩来显示或隐藏影剪对象。
	参数：
	startPoint：同上。*/
LTransition.Wipe = 8;
/*Zoom：通过按比例缩放来 放大或缩小 影剪对象。
	无参数*/
LTransition.Zoom = 9;
function LIris(){}
LIris.SQUARE = 0;
LIris.CIRCLE = 1;
function LTransitionManager(displayObject){
	this.child = displayObject;
}
LTransitionManager.prototype={
	startTransition:function(transObj){
		return LTransitionManager.start(this.child,transObj);
	}
};
LTransitionManager.start = function(displayObject,transObj){
	if(!LTweenLite)throw("you need load the LTweenLite.");
	var trans = new LTransition(displayObject,transObj);
	trans.startTransition();
	return trans;
}
