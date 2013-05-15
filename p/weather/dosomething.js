var $provinces ,$cities , $countries;
var $infor;
var getData = new Data();
var provinces = getData.getProvinceData();
var cities = getData.getCityData(provinces[0].code);
var countries = getData.getCountryData(cities[0].code);

function fillPr(){
	$provinces.find('option').remove();
    for(var i = 0;i<provinces.length;i++){
		$provinces.append("<option value='"+provinces[i].code+"'>"+provinces[i].name+"</option>");
	}
}

function fillCi(){
	$cities.find('option').remove();
	for(var i = 0;i<cities.length;i++){
		$cities.append("<option value='"+cities[i].code+"'>"+cities[i].name+"</option>");
	}
}

function fillCo(){
	$countries.find('option').remove();
	for(var i = 0;i< countries.length;i++){
		$countries.append("<option value='"+countries[i].code+"'>"+countries[i].name+"</option>");
	}
}

function showWeather(WeatherObj){
	console.log(WeatherObj.weatherinfo);
	ko.applyBindings(WeatherObj.weatherinfo);
}

$(function(){
	$infor = $("#infor");
    $provinces = $("#provinces");
    $cities = $("#cities");
    $countries = $("#countries");
       
    $provinces.on("change",function(e){
		cities = getData.getCityData(e.target.value);
        fillCi();
		countries = getData.getCountryData(cities[0].code);
		fillCo();
		var weatherObj = getData.getWeather("101"+$countries.find("option:selected").val());
		showWeather(weatherObj);
    }); 
    
    $cities.on("change",function(e){
        countries = getData.getCountryData(e.target.value);
		fillCo();
		var weatherObj = getData.getWeather("101"+$countries.find("option:selected").val());
		showWeather(weatherObj);
    }); 
    
    $countries.on("change",function(e){
		var weatherObj = getData.getWeather("101"+$countries.find("option:selected").val());
		showWeather(weatherObj);
    }); 
   
    fillPr();
	fillCi();
	fillCo();
	var weatherObj = getData.getWeather("101"+$countries.find("option:selected").val());
	showWeather(weatherObj);
});