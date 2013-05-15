function Configuration(	
	cubeAddSpeed,
	borderWidth,
	borderHeight,
	imgIcon,
	moveSpeed,
	fps,
	cubeAddSpeedUp,
	cubeAddSpeedUpChangeSequence,
	cubeMoveSpeedUp,
	cubeMoveSpeedUpChangeSequence,
	playerName,
	currentCubeNumber,
	hostIp,
	displayInfo,
	maxCubeNumber,
	displayDetailedInfo,
	enableCubeAddSpeedUp,
	enableCubeAddSpeedUpChange,
	enableCubeMoveSpeedUp,
	enableCubeMoveSpeedUpChange
){
	this.fps = fps || 10; //millisceond

	this.cubeAddSpeed = cubeAddSpeed || 4000 ; //millisceond
	this.cubeAddSpeedUp = cubeAddSpeedUp || 1.01;
	this.cubeAddSpeedUpChangeSequence = cubeAddSpeedUpChangeSequence || 1000;
	this.cubeMoveSpeed = moveSpeed || 1000 ; //px per second
	this.cubeMoveSpeedUp = cubeMoveSpeedUp || 1.01;
	this.cubeMoveSpeedUpChangeSequence = cubeMoveSpeedUpChangeSequence || 1000;

	this.maxCubeNumber = maxCubeNumber || 100;
	this.hostIp = hostIp || "http://192.168.252.26/test/cube/record.php";

	this.borderWidth = 600;
	this.borderHeight = 400;

	this.enableCubeAddSpeedUp = enableCubeAddSpeedUp || true;
	this.enableCubeAddSpeedUpChange = enableCubeAddSpeedUpChange ||  true;
	this.enableCubeMoveSpeedUp = enableCubeMoveSpeedUp || true;
	this.enableCubeMoveSpeedUpChange = enableCubeMoveSpeedUpChange ||  true;

	this.displayInfo = displayInfo || true;
	this.displayDetailedInfo = displayDetailedInfo || false;
}