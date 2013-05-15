/* configueration */
var maxNumberLength = 17;
var maxNumberLengthDot = 7;
var info;
var res;
var proccess;

/* value storage */
var firstCaculate = true;
var lastclick = "";
var valueLeft = 0;
var valueLeftDot = 0;
// this is set for test if has a last value
var valueLast = 0;
var isNeg = false;
var hasDot = false;
var savedcaculate = "+";

/*  display style  */
var colordefault = "#dddddd";
var colorhover = "#eeff33";
var colorclick = "green";
var timeout = 100;

function init(){
	info = $("#message");
	res = $("#result");
	proccess = $("#proccess");
}
/* add listener */
$(document).ready(function(){
	init();
  $(".action").css("background-color",colordefault).mouseover(function(){
	$(this).css("background-color",colorhover).css("cursor","pointer");
  }).click(function(even){
		$(this).css("background-color",colorclick)
		getClick(even.target);
		setTimeout(function(){
			$(even.target).css("background-color",colordefault);
		},timeout);
  }).mouseout(function(){
	$(this).css("background-color",colordefault);
  });
});
 
/*  get click and invoke method according to button clicked */
function getClick(obj){
	var clickedName = $(obj).attr("name");
	switch (clickedName){
		/* 
		* !important : var "lastclick" readonly here ! 
		*  never try to modify it inside this switch-case 
		*/
		case "number":
			infor(obj.id);
			getNumber(obj.id);
			break;
		case "neg":
			infor(obj.id);
			isNeg = isNeg ? false:true;
			break;
		case "dot":
			infor(obj.id);
			if(hasDot){
				infor("multi-input dot!",true);
			}else{
				hasDot = true;
			}
			break;
		case "backspace":
			if(hasDot){
				valueLeftDot = Math.round(valueLeftDot/10 - 0.5);
				hasDot = ( 0 == valueLeftDot ) ? false : true ;
			}else{
				valueLeft = Math.round(valueLeft/10 - 0.5);
			}
			infor(clickedName,false);
			break;
		case "caculate":
			if(lastclick == "caculate"){
				infor("error! double caculate",true);
			}
			/* backspace infulence has been detected after backspace case */
			getCaculate($(obj).html())
			firstCaculate = false;
			infor($(obj).html(),false);
			break;
		case "result":
			infor(clickedName,false);
			getResult();
			firstCaculate = true;
			break;
		case "cls":
			doClean(true);
			infor(clickedName,false);
			break;
		default :
			infor("error:"+clickedName,true);
			break;
		}
		// dot and backspace actually is about data input , this will influence operation  
	lastclick = ( clickedName == "dot" ) ? lastclick : clickedName ;
	lastclick = ( clickedName == "backspace" ) ? lastclick : clickedName ;
	showRes();
}

function getNumber(str){
	if(lastclick == "result"){
		doClean(true);
	}
	var num = parseInt(str);
	if(hasDot){
		var tmp = ""+valueLeftDot;
		if(tmp.length >= maxNumberLengthDot){
			infor("error:out of max!"+maxNumberLengthDot,true);
			return ;
		}
		valueLeftDot = valueLeftDot * 10 + num;
	}else{
		var tmp = ""+valueLeft;
		if(tmp.length >= maxNumberLength){
			infor("error:out of max!"+maxNumberLength,true);
			return ;
		}
		valueLeft = valueLeft * 10 + num ;
	}
}

function getResult(){
	//get current value 
	while(valueLeftDot >= 1 ){
		valueLeftDot = valueLeftDot / 10;
	}
	var valueTmp = 0;
	valueTmp = valueLeft + valueLeftDot;
	if(isNeg){
		valueTmp = 0 - valueTmp ;
	}
	if(firstCaculate){
		firstCaculate = false;
		valueLast = valueTmp ;
		
		// keep the valueLast without param true
		doClean();
		return ;
	}
	switch(savedcaculate){
	case "+":
		valueLast = valueLast + valueTmp ;
		break;
	case "-":
		valueLast = valueLast - valueTmp ;
		break;
	case "/":
		if( 0 == valueLast || 0 == valueTmp){
			infor("error:0 divided with 0!",true);
			break;
		}
		valueLast = valueLast / valueTmp ;
		break;
	case "¡Á":
		valueLast = valueLast * valueTmp ;
		break;
	default :
		infor("error:"+savedcaculate,true);
		break;
	}
	// keep the valueLast without param true
	doClean();
}

function getCaculate(str){
	getResult();
	savedcaculate = str;	
}


/* utilities */
function showRes(){
	var tmp = "";
	if(lastclick == "caculate" || lastclick == "result"){
		// display result
		tmp = valueLast;
	}else if( 0 == valueLeft && 0 == valueLeftDot){
		// display input
		tmp = "0";
	}else{
		// display input
		tmp += isNeg ? "-" :"";
		tmp += valueLeft;
		tmp += hasDot ? ".":"";
		tmp += ( valueLeftDot==0 ? "" : valueLeftDot);
	}
	$(res).html(tmp);
	
	
	// caculate statement
	var showInf = valueLast+" ";
	if(savedcaculate == "result"){
		showInf = "=" ;
	}else{
		showInf += savedcaculate;
	}
	if(firstCaculate){
		showInf = "";
	}
	$(proccess).html(showInf);
}

function infor(str,error){
	var tmp = "";
	if((typeof error)!="undefined" && ((typeof error)=="boolean")){
		var fontcolor = error?"red":"blue";
		tmp = "<font style=\"color:"+fontcolor+";\">"+str+"</font>";
	}else{
		tmp = str;
	}
	$(info).html(tmp);
}

function doClean(cleanStorage){
	lastclick = "";
	valueLeft = 0;
	valueLeftDot = 0;
	$(res).html("");
	//by null param , storaged value is saved
	if((typeof cleanAll) != "undefined" && cleanAll == true){
		valueLast = 0;
		$(info).html("");
		$(proccess).html("");
	}		
	isNeg = false;
	hasDot = false;
	firstCaculate = true;
}