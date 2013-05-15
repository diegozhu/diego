function CubeType(name,iconWidth,iconHeight,iconUrl,Speed,SpeedUp,SpeedChangeSequance){
	if(instanceof this CubeType){
		this.id = CubeType.prototype.id ++;
		this.name = name || "";
		this.iconWidth = iconWidth;
		this.iconHeight = iconHeight;
		this.iconUrl = iconUrl;
		this.Speed = Speed;
		this.SpeedUp = SpeedUp;
		this.SpeedChangeSequance = SpeedChangeSequance;
	}else{
		return new CubeType(name,iconWidth,iconHeight,iconUrl,Speed,SpeedUp,SpeedChangeSequance);
	}
}
// id,and also number of types.
CubeType.prototype.id = 0;