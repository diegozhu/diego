function Game(name,cfg,divObj,playerName){
	var gameZone = divObj;
	var _tmpWidth = gameZone.getAttribute("width") || gameZone.style.width;
	var _tmpHeight = gameZone.getAttribute("height") || gameZone.style.height;
	this.cfg = cfg || new Configuration(_tmpWidth,_tmpHeight);
	this.cubes = new Array();
	this.timeoutCubeAddHandler;
	this.timeoutCubeMoveHandler;
	this.timeoutCubeChangeSpeedHandler;
	this.timeoutCubeChangeDirectionHandler;

	this.name = name;	
	this.isGamePaused = false;
	this.isGameOver = false;
	this.beginTime;
	this.endTime;
	this.Score = 0;   // record player's score
	this.playerName = playerName || "";
	this.currentCubeNumber = 0;
	gameZone.setAttribute("postion","relative");
}
Game.prototype.begin = function(){
	this.cubes.push(new Cube("black",null,null,null,null,"blackCube.png",null,null,null,null,cfg));
	this.addCube();
	this.display();
	this.changeCubesDirection();
	this.changeCubesSpeed();
}

Game.prototype.addCube = function(){
	if(!this.isGamePaused && !this.isGameOver){
		this.cubes.push(new Cube());
		setTimeout("this."+this.name+".addCube()",this.cfg.cubeAddSpeed);
	}
}
Game.prototype.changeCubesDirection = function(){
	if(!this.isGamePaused && !this.isGameOver){
		for(var i =0;i<this.cubes.length;i++){
			this.cubes[i].changeDirection();
		}
		setTimeout("this."+this.name+".changeCubesDirection()",this.cfg.cubeAddSpeed);
	}
}

Game.prototype.changeCubesSpeed = function(){
	if(!this.isGamePaused && !this.isGameOver){
		for(var i =0;i<this.cubes.length;i++){
			this.cubes[i].changeSpeed();
		}
		setTimeout("this."+this.name+".changeCubesSpeed()",this.cfg.cubeAddSpeed);
	}
}

Game.prototype.display = function(){  // move cubes
	if(!this.isGamePaused && !this.isGameOver){
		var htm = "";
		for(var i =0;i<this.cubes.length;i++){
			this.cubes[i].move();
			htm += this.cubes[i].getHtml();
		}
		gameZone.innerHTML = htm;
		setTimeout("this."+this.name+".display()",this.cfg.fps);
	}
}

Game.prototype.pause = function(){
	if(!this.isGamePaused){
		this.isGamePaused = true;
		clearInterval(timeoutCubeAddHandler);
		clearInterval(timeoutCubeMoveHandler);
	}
}

Game.prototype.over = function(){
	if(!this.isGameOver){
		this.isGamePaused = true;
		clearInterval(timeoutCubeAddHandler);
		clearInterval(timeoutCubeMoveHandler);
	}
}

Game.prototype.newGame = function(defCfg){
	return defCfg ? new Game(this.name,this.cfg,this.divId) : new Game();
}

Game.prototype.getReslult = function(){}

Game.prototype.getInfo = function(){}

Game.prototype.getDebugInfo = function(){}