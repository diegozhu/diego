/* params :

	--first must:
		cfg;
		
	--alertnate:
		x:  x position relatived to gameZone Div border left top.
		y;  y position relatived to gameZone Div border left top.
		type: 
		
*/
function Cube(type,x,y,w,h,imgUrl,speed,speedUp,speedChangeSequance,directionChangeSequance,cfg){
	if(this instanceof Cube){
		if(!this._isInited){ Cube.prototype.ClassInit(cfg); }
		this.init(type,x,y,w,h,imgUrl,speed,speedUp,speedChangeSequance,directionChangeSequance);
	}else{
		return new Cube(type,x,y,w,h,imgUrl,speed,speedUp,speedChangeSequance,directionChangeSequance);
	}
}

Cube.prototype._isInited = false;
Cube.prototype.count = 0;
Cube.prototype.types = new Array("black","blue");

Cube.prototype.init = function(type,x,y,w,h,imgUrl,speed,speedUp,speedChangeSequance,directionChangeSequance){
	
	// class private 
	this.id = Cube.prototype.count ++;
	this.type = type || this.types[1];
	this.width = w || 30;
	this.height = h || 30;
	this.imgUrl = imgUrl || "blueCube.png";
	this.directionX = Math.random();
	this.directionY = Math.random();
	this.directionChangeSequance = directionChangeSequance || 1000;
	this.speed = speed || this.cfg.cubeMoveSpeed;
	this.speedUp = speedUp || this.cfg.cubeMoveSpeedUp;
	this.speedChangeSequance = speedChangeSequance || this.cfg.cubeMoveSpeedUpChangeSequence;
	this.x = x || Math.random() * (this.cfg.borderWidth - this.width);
	this.y = y || Math.random() * (this.cfg.borderHeight - this.height);
	this.buf = new Array();
	this.buf.push("<div style=\"width:");
	this.buf.push(this.width);
	this.buf.push("px; height:");
	this.buf.push(this.height);
	this.buf.push("px; border:#000 1px double;display:inline;position:absolute;top:");
	this.buf.push(this.y);
	this.buf.push("px;left:");
	this.buf.push(this.x);
	this.buf.push("px; background-image: url(");
	this.buf.push(this.imgUrl);
	this.buf.push("); \">");
	this.buf.push(this.id);
	this.buf.push("</div>");
}

	
Cube.prototype.ClassInit = function(cfg){	
	if(!cfg){throw "first Cube , Cfg object need ! ";}
	Cube.prototype.cfg = cfg || new Configuration();
	Cube.prototype.defaultType = Cube.prototype.types[1];
	Cube.prototype._isInited = true;
}

Cube.prototype.move = function(){
	this.x += this.directionX;
	this.y += this.directionY;
	if(this.x < 0 || this.x > this.cfg.borderWidth - this.width ){this.directionX = -this.directionX;}
	if(this.y < 0 || this.y > this.cfg.borderHeight - this.height ){this.directionY = -this.directionY;}
}

Cube.prototype.changeDirection = function(){
	this.directionX = Math.random() - 0.5;    // 0~1 方向要有正有负，要不然会挤到右下角去。
	this.directionY = Math.random() - 0.5;   
}

Cube.prototype.changeSpeed = function(){
	this.speed *= this.speedUp;
}

Cube.prototype.getHtml = function(){
	this.buf[1] = this.width;
	this.buf[3] = this.height;
	this.buf[5] = this.y;
	this.buf[7] = this.x;
	this.buf[9] = this.imgUrl;
	this.buf[11] = this.id;
	return this.buf.join("");
}