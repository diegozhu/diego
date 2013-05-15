// overwrite
Number.prototype.toFormattedString = function(length){
	var str = this.toString();
	var arr = new Array();
	for(var i =0;i<length-str.length;i++){
		arr.push("0");
	}
	arr.push(this);
	return arr.join("");
}
String.prototype.toFormattedString = function(length){
	var str = this.toString();
	var arr = new Array();
	for(var i =0;i<length-str.length;i++){
		arr.push("0");
	}
	arr.push(this);
	return arr.join("");
}
Number.prototype.toInt = function(num){
	//if(typeof this != "number"){throw ("Ex:caller must be number!"+this);return false;}
	var tmpnum = this;
	if(typeof num != "undefined"){
		tmpnum = num;
	}
	return parseInt(tmpnum);
}
String.prototype.time = function(param,value){
	// form 12:15:14
	if(typeof value == "undefined"){
		switch(param){
			case "h":
			case "H":
				return this.substring(0,2);
			case "M":
			case "m":
				return this.substring(3,5);
			case "S":
			case "s":
				return this.substring(6,8);
			default:
				return new Date(this);
		}
	}else{
		switch(param){
			case "h":
			case "H":
				this.replace(this.substring(0,2));
				break;
			case "M":
			case "m":
				this.replace(this.substring(3,5));
				break;
			case "S":
			case "s":
				this.replace(this.substring(6,8));
				break;
			default:
				break;
		}
	}
}
String.prototype.toInt =function(str){
	//alert(typeof this);  object ? why string is object?
	//if(typeof this != "string"){throw ("Ex:caller must be string!"+this);return false;}
	var tmpstr = this;
	if(typeof str != "undefined"){
		tmpstr = str.toString();
	}
	while(tmpstr.charAt(0)=="0"){
		tmpstr = tmpstr.substring(1);
	}
	return parseInt(tmpstr);
}

Date.prototype.getActualMonth =function(){
	return this.getMonth() + 1;
}


// new Objects
function Schedule(id,date,title,time,importance,detail){ 
		this.id = id;
		this.title = title;
		this.time = time;
		this.importance = importance;
		this.detail = detail;
		if(date instanceof MyDate){
			this.date = date;
		}else{
			this.date = new MyDate(date);
		}
		
}
Schedule.valueOfJson = function(id,json){
	var s = JSON.parse(json);
	return new Schedule(id,id.substring(0,10),s.title,s.time,s.importance,s.detail);
}
Schedule.prototype.getJson = function(json){
	var j = { 
			"title":this.title,
			"time":this.time,
			"importance":this.importance,
			"detail":this.detail
		};
	return JSON.stringify(j);
}


function MyDate(param){
	// form 2012-12-15
	if(typeof param == "undefined" || typeof param != "string" || param.length > MyDate.formMax.length || param.length < MyDate.formMin.length){
		var d = new Date();
		this.year = d.getFullYear();
		this.month = d.getMonth() + 1;
		this.day = d.getDate();
		this.sYear = this.year.toString();
		this.sMonth = this.month.toFormattedString(2);
		this.sDay = this.day.toFormattedString(2);
		this.sValue = (new Array(this.sYear,"-",this.sMonth,"-",this.sDay)).join("");
	}else{
		this.sValue = param;
		this.sYear = param.substring(0,4);
		this.sMonth = param.substring(5,7);
		this.sDay = param.substring(8,10);
		this.year = this.sYear.toInt();
		this.month = this.sMonth.toInt();
		this.day = this.sDay.toInt();
	}

}
MyDate.prototype._daysOfMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
MyDate.prototype.getDate =function(){
	return new Date(this.sValue);
}
MyDate.prototype.daysOfMonth = function(arg1,arg2){
	var year;
	var month;
	if(typeof arg2 == "undefined"){
		year = this.year;
		month = (typeof arg1 =="undefined"? this.month : arg1.toInt());
	}else{
		year = arg1.toInt();
		month = arg2.toInt();
	}
	if(month == 2){
		return (year%4==0 && year%400 != 0) ? 29 : 28;
	}else{
		return this._daysOfMonth[month-1];
	}	
}
MyDate.prototype.set =function(key){

	if(typeof key == "undefined"){
		var d = new Date();
		this.day = d.getDate();
		this.month = d.getMonth() + 1;
		this.year = d.getFullYear();
		this.sYear = this.year.toString();
		this.sMonth = this.month.toFormattedString(2);
		this.sDay = this.day.toFormattedString(2);
		this.sValue = (new Array(this.sYear,"-",this.sMonth,"-",this.sDay)).join("");
		d = null;
		return this;
	}else{
		var n = new MyDate(key);
		this.day = n.day;
		this.month = n.month;
		this.year = n.year;
		this.sYear = n.sYear;
		this.sMonth = n.sMonth;
		this.sDay = n.sDay;
		this.sValue = n.sValue;
		n = null;
		return this;
	}
};
MyDate.prototype.date = function(param,value){
	// form 2012-12-06
	if(typeof value == "undefined"){
		switch(param){
			case "y":
			case "Y":
				return this.year;
			case "M":
			case "m":
				return this.month;
			case "D":
			case "d":
				return this.day;
			default:
				return new Date(this.sValue);
		}
	}else{
		switch(param){
			case "y":
			case "Y":
				if((typeof value) == "string"){
					this.sYear = value;
					this.year = value.toInt();
				}else if(value == 1){
					this.year ++;
				}else if(value == -1){
					this.year --;
				}else if(value == 0){
					this.set();
				}
				this.sYear = this.year.toString();
				break;
			case "M":
			case "m":
				if((typeof value) == "string"){
					this.sMonth = value.length == 1 ? "0"+value:value;
					this.month = value.toInt();
				}else{
					if(value == 1){
						if(this.month == 12){
							this.year ++;
							this.month = 1;
						}else{
							this.month ++;
						}						
					}else if(value == -1){
						if(this.month == 1){
							this.year --;
							this.month = 12;
						}else{
							this.month --;
						}	
					}else if(value == 0){
						this.set();
					}
				}
				this.sMonth = this.month.toFormattedString(2);
				this.sYear = this.year.toString();
				break;
			case "D":
			case "d":
				if((typeof value) == "string"){
					this.sDay = value.length == 1 ? "0"+value:value;
					this.day = value.toInt();
				}else{
					if(value == 1){
						if(this.day == this.daysOfMonth()){   // last day of this month
							this.date("m",+1);
							this.day = 1;
						}else{
							this.day ++;
						}						
					}else if(value == -1){
						if(this.day == 1){
							this.date("m",-1);
							this.day = this.daysOfMonth();
						}else{
							this.day -- ;
						}
					}else if(value == 0){
						this.set();
					}
				}
				this.sDay = this.day < 10 ? (new Array("0",this.day)).join("") : this.day.toString();
				break;
			default:
				break;
		}
		this.sValue = (new Array(this.sYear,"-",this.sMonth,"-",this.sDay)).join("");
		return this;
	}
}
MyDate.prototype.dayInWeek = function(arg1,arg2,arg3){
	// form 0 : dayInWeek();   		// return this.dayInWeek;
	
	// from 1.1 : dayInWeek("12");   	// this month day 12 in week number;
	// from 1.2 : dayInWeek(12);		// this month day 12 in week number;
	// form 1.3 : dayInWeek("2012-12-14");	
	
	// from 2.1 : dayInWeek(12,13); // month 12 day 13 in week number;
	// from 2.2 : dayInWeek(12,"13"); // month 12 day 13 in week number;
	// from 2.3 : dayInWeek("12",13);	// month 12 day 13 in week number;
	// from 2.4 : dayInWeek("12","13"); // month 12 day 13 in week number;
	
	// form 3.1 : dayInWeek(2012,12,14);
	// form 3.2 : dayInWeek("2012",12,14);
	// form 3.3 : dayInWeek(2012,"12",14);
	// form 3.4 : dayInWeek(2012,12,"14");
	// form 3.5 : dayInWeek("2012","12",14);
	// form 3.6 : dayInWeek("2012",12,"14");
	// form 3.7 : dayInWeek(2012,"12","14");
	// form 3.8 : dayInWeek("2012","12","14");
	
	// return 0 ~ 6  sun ~ sat

	if(typeof arg3 == "undefined"){
		if(typeof arg2 == "undefined"){
			if(typeof arg1 == "undefined"){
				return (new Date(this.sValue)).getDay();
			}else{
				if(arg1.toString().length <= MyDate.formMax.length && arg1.toString().length >= MyDate.formMin.length){
					return (new Date((new MyDate(arg1.toString())).date("d","1").sValue)).getDay();
				}else{
					return (new Date((new MyDate(this.sValue)).date("d",arg1.toString()).sValue)).getDay();
				}				
			}
		}else{
			return (new Date((new MyDate(this.sValue)).date("m",arg1.toString()).date("d",arg2.toString()).sValue)).getDay();
		}
	}else{
		return (new Date((new MyDate(this.sValue)).date("y",arg1.toString()).date("m",arg2.toString()).date("d",arg3.toString()).sValue)).getDay();
	}


}
MyDate.prototype.clone = function(){
	return new MyDate(this.sValue);
}
MyDate.form = "yyyy-mm-dd";
MyDate.formMax = "yyyy-mm-dd";
MyDate.formMin = "yyyy-m-d";
function Storage(){}
Storage.prototype.session = function(key,value){
	if(typeof value =="undefined"){
		return sessionStorage.getItem(key);
	}else{
		sessionStorage.setItem(key,value);
		return this;
	}
}
Storage.prototype.local = function(key,value){
	if(typeof value =="undefined"){
		return localStorage.getItem(key);
	}else{
		localStorage.setItem(key,value);
		return this;
	}
}
Storage.prototype.sessionRemove = function(key){
	return sessionStorage.removeItem(key);
	return this;
}
Storage.prototype.localRemove = function(key){
	localStorage.removeItem(key);
	return this;
}
