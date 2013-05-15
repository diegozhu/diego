function ProvinceManager(sData){
    if(typeof sData != "string"){
        console.warn("ProvinceManager param sData is not string format!");
    }else{
        this._provinces = new Array();    
        var provicesArray = sData.split(",");
        this.size = provicesArray.length;
        for(var i = 0;i< this.size;i++){
            var pro = provicesArray[i].split("|");
            this._provinces.push(new Province(pro[0],pro[1]));
        }
        this.inited = this.size > 0;
        this.cursor = 0;
    }
    return this;
}

function CityManager(provinceCode){
    if(typeof provinceCode != "string"){
        console.warn("CityManager param provinceCode is not string format!");
    }else{
        this.provinceCode = provinceCode;
        this._cities = new Array();       
        this.inited = this.size > 0;
        this.cursor = 0;
    }
    return this;
}

function CountryManager(sDate){
    if(typeof sData != "string"){
        console.warn("CountryManager param sData is not string format!");
    }else{
        this._countries = new Array();    
        var array = sData.split(",");
        this.size = array.length;
        for(var i = 0;i< this.size;i++){
            var pro = array[i].split("|");
            this._countries.push(new Country(pro[0],pro[1]));
        }
        this.inited = this.size > 0;
        this.cursor = 0;
    }
    return this;
}

function Province(code,name){
    this.code = ( typeof code == "string" ? code : ""+code);
    this.name = ( typeof name == "string" ? name : ""+name);
    this.inited = false;
    this.cities = new CityManager(this.code);
    return this;
}

function City(code,name){
    this.code = ( typeof code == "string" ? code : ""+code);
    this.name = ( typeof name == "string" ? name : ""+name);
    this.inited = false;
    this.counties = new CountryManager();
    return this;
}

function Country(code,name){
    this.code = ( typeof code == "string" ? code : ""+code);
    this.name = ( typeof name == "string" ? name : ""+name);
    return this;
}

ProvinceManager.prototype.hasNextProvince = function(){
    if(this.cursor < this.size){
        return true;
    }else{
        this.cursor = 0;
        return false;
    }
}

ProvinceManager.prototype.getNextProvince = function(){
    if(this.cursor < this.size){
        return this._provinces[this.cursor++];
    }else{
        this.cursor = 0;
        console.log("no next province!");
        return null;
    }    
}

ProvinceManager.prototype.getProvinceName = function(code) {
    var result = this;
    var isFound = false;
    if(typeof code == "undefined"){
        console.log("[ProvinceManager.getProvinceName]province code is not defined!"+code);
    }else{
        code = (code < 10 && code > 0 ? "0" : "") + new String(code) ;
        for(var i =0;i<this.size;i++){
            if(this._provinces[i].code == code){
                result =  this._provinces[i].name;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("province code:"+ code +" no match found!");
        }
    }    
    return result
}

ProvinceManager.prototype.getProvinceCode = function(name){
    var result = this;
    var isFound = false;
    if(typeof name == "undefined"){
        console.log("[ProvinceManager.getProvinceName]province name is not defined!"+name);
    }else{
        for(var i =0;i<this.size;i++){
            if(this._provinces[i].name == name){
                result =  this._provinces[i].code;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("province name:"+ name +" no match found!");
        }
    }    
    return result
}

ProvinceManager.prototype.getSize = function(){
    return this.size;
}

ProvinceManager.prototype.getRawArray = function(){
    return this._provinces;
}

ProvinceManager.prototype.refreshProvinces = function(){

}

CityManager.prototype.getCityName = function(code){
    var result = this;
    var isFound = false;
    if(typeof code == "undefined"){
        console.log("[CityManager.getCityName]country code is not defined!"+code);
    }else{
        code = (code < 10 && code > 0 ? "0" : "") + new String(code) ;
        for(var i =0;i<this.size;i++){
            if(this._cites[i].code == code){
                result =  this._cites[i].name;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("city code:"+ code +" no match found!");
        }
    }    
    return result
}

CityManager.prototype.getCityCode = function(name){
    var result = this;
    var isFound = false;
    if(typeof name == "undefined"){
        console.log("[CityManager.getCityName]city name is not defined!"+name);
    }else{
        for(var i =0;i<this.size;i++){
            if(this._cites[i].name == name){
                result =  this._cites[i].code;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("city name:"+ name +" no match found!");
        }
    }    
    return result
}

CityManager.prototype.getSize = function(){
    return this.size;
}

CityManager.prototype.getRawArry = function(){
    return this._cites;
}

CityManager.prototype.refreshCites = function(){
    var provinceCode = this.provinceCode;
    $.ajax({
        method : "GET",
        success : function(data){
            alert(data);
        },
        url : "http://www.weather.com.cn/data/list3/city" + provinceCode + ".xml?level=2"
    });
    var array = sData.split(",");
    this.size = array.length;
    for(var i = 0;i< this.size;i++){
        var pro = array[i].split("|");
        this._cities.push(new City(pro[0],pro[1]));
    }
}

CityManager.prototype.init = function(data){
    if(this.inited){
        console.log("CityManager already inited!");
    }else{
        this.refreshCites();
    }
    return this;
}

CityManager.prototype.hasNextProvince = function(){
    if(this.cursor < this.size){
        return true;
    }else{
        this.cursor = 0;
        return false;
    }
}

CityManager.prototype.getNextProvince = function(){
    if(this.cursor < this.size){
        return this._cities[this.cursor++];
    }else{
        this.cursor = 0;
        console.log("no next province!");
        return null;
    }    
}

CountryManager.prototype.getCountryName = function(code){
    var result = this;
    var isFound = false;
    if(typeof code == "undefined"){
        console.log("[CountryManager.getCountryName]country code is not defined!"+code);
    }else{
        code = (code < 10 && code > 0 ? "0" : "") + new String(code) ;
        for(var i =0;i<this.size;i++){
            if(this._cites[i].code == code){
                result =  this._cites[i].name;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("country code:"+ code +" no match found!");
        }
    }    
    return result
}

CountryManager.prototype.getCountryCode = function(name){
    var result = this;
    var isFound = false;
    if(typeof name == "undefined"){
        console.log("[CountryManager.getCountryName]country name is not defined!"+name);
    }else{
        for(var i =0;i<this.size;i++){
            if(this._cites[i].name == name){
                result =  this._cites[i].code;
                isFound = true;
            }
        }        
        if(!isFound){
            console.log("country name:"+ name +" no match found!");
        }
    }    
    return result
}

CountryManager.prototype.getSize = function(){
    return this.size;
}

CountryManager.prototype.getRawArry = function(){
    return this._cites;
}

CountryManager.prototype.hasNextProvince = function(){
    if(this.cursor < this.size){
        return true;
    }else{
        this.cursor = 0;
        return false;
    }
}

CountryManager.prototype.getNextProvince = function(){
    if(this.cursor < this.size){
        return this._countries[this.cursor++];
    }else{
        this.cursor = 0;
        console.log("no next province!");
        return null;
    }    
}

CountryManager.prototype.refreshCites = function(){}