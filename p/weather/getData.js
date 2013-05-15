function Item(code,name){
	this.name = name;
	this.code = code;
}

function format(str){
	var array = new Array();
	var s = str.split(",");
	for(var i = 0;i < s.length;i++){
		var t = s[i].split("|");
		array.push(new Item(t[0],t[1]));
	}
	return array;
}

function Data(){}

Data.prototype.getProvinceData = function(){
	var ApiUrl = "http://www.weather.com.cn/data/list3/city.xml";
	var result = new Array();
	var conf = {
		url : ApiUrl,
		async : false,
		context: getData,
		success : function(data){
			this.result = null;
			this.result = format(data);
		},
		dataType : "text",
		error : function(a,b,c){
			console.log(a+b+c);
		}
		
	};
	
	$.ajax(conf);
	return this.result;
}

Data.prototype.getCityData = function(ProvinceCode){
	var ApiUrl = "http://www.weather.com.cn/data/list3/city" + ProvinceCode + ".xml";
	var result = new Array();
	var conf = {
		url : ApiUrl,
		async : false,
		context: getData,
		success : function(data){
			this.result = null;
			this.result = format(data);
		},
		dataType : "text",
		error : function(a,b,c){
			console.log(a+b+c);
		}
		
	};
	
	$.ajax(conf);
	return this.result;
}

Data.prototype.getCountryData = function(CityCode){	
	var ApiUrl = "http://www.weather.com.cn/data/list3/city" + CityCode + ".xml";
	var result = new Array();
	var conf = {
		url : ApiUrl,
		async : false,
		context: getData,
		success : function(data){
			this.result = null;
			this.result = format(data);
		},
		dataType : "text",
		error : function(a,b,c){
			console.log(a+b+c);
		}
		
	};
	
	$.ajax(conf);
	return this.result;
}

Data.prototype.getWeather = function(cityCode){
	//对四个直辖市代码进行特别处理
	if(parseInt(cityCode.substring(3,5)) < 5){
		var part1 = cityCode.substring(0,5);
		var part2 = cityCode.substring(7,9);
		cityCode = part1+part2+"00";
	}
	console.log("cityId:"+cityCode);
	var ApiUrl = "http://m.weather.com.cn/data/"+cityCode+".html";
	var result = new Array();
	var conf = {
		url : ApiUrl,
		async : false,
		context: getData,
		success : function(data){
			this.result = null;
			this.result = data;
		},
		dataType : "text",
		error : function(a,b,c){
			console.log(a+b+c);
		}
		
	};	
	$.ajax(conf);
	return JSON.parse(this.result);
}
