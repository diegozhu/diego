var data = {};
function dosomething(){
    var out = "";
    var s,p,c;
    $.each(citycode,function(index,element){        
        code = element.toString();
        s = code.substring(0,3);
        if(!data[s]){
            data[s] = {
                name : index
            };
        }
        
        code = code.substring(3);
        p = code.substring(0,3);
        if(!data[s][p]){
            data[s][p] = {
                name : index
            };
        }
        
        code = code.substring(3);
        c = code.substring(0,3);
        if(!data[s][p][c]){
            data[s][p][c] = {                
                name : index,
                code : element.toString()
                };
        }else{
            console.warn("repeat:" + element.toString());
        }             
    });       
}

function showCities(){
    var i = 0;
    var out = "";
    $.each(citycode,function(index,element){
        out += ("<a href='#' style='display:block;padding:3px;border:#999 1px dotted;float:left;' code='"+element+"'>"+index+"</a>");        
    }); 
    $("#weather").html(out);
}

var path = 0;
function listAllProperty(obj){
    var result = "";
    var intent = (function(){
        var tmp = path;
        var res = "";
        while(tmp-->1){
            res += "&nbsp;&nbsp;";
        }
        return res + ( tmp >= 0 ? "---" : "");
    })();
    
    for(var p in obj){
        result = result + intent;
        switch(typeof obj[p]){
            case "function":
                result += "[F]:"+ p+ "<br />";
                break;
            case "number":
                result += "[N:"+p+"]:"+ obj[p]+ "<br />";
                break;
            case "string":
                result += "[S:"+p+"]:"+ obj[p]+ "<br />";
                break;
            case "object":
                path ++;
                result += "[O:"+p+"]:"+ p + "<br />" + listAllProperty(obj[p]);
                break;
            default:
                result += "[U]:"+ p+ "<br />";
                break;
        }
    }
    path --;
    return result;
}

var s,p,c;    

 function fills(){
    $("#s>option").remove();
    for(var i in data){
        $("<option value='"+i+"'>"+data[i].name+"</option>").appendTo($("#s"));
    }
}
function fillp(){
    $("#p>option").remove();
    for(var i in data[s]){
        if(i != "name"){
            $("<option value='"+i+"'>"+data[s][i].name+"</option>").appendTo($("#p"));
        }
    }
}
function fillc(){
    $("#c>option").remove();
    for(var i in data[s][p]){
        if(i != "name"){
            $("<option value='"+i+"'>"+data[s][p][i].name+"</option>").appendTo($("#c"));
        }
    }
}
    
$(function(){
    //showCities();
    dosomething();     
    fills();
    s = $("#s>option").val();
    fillp();
    p = $("#p>option").val();
    fillc();
    c = $("#c>option").val();
    
    $("#s").on("change",function(e){
        s = $("#s>option")[e.currentTarget.selectedIndex].value;
        fillp();
    });
    
    $("#p").on("change",function(e){
        p = $("#p>option")[e.currentTarget.selectedIndex].value;
        fillc();
    });
    
    $("#c").on("change",function(e){
        c = $("#c>option")[e.currentTarget.selectedIndex].value;
       getWeather(s+""+p+c);
    });
});

function getWeather(citycode){
    var weatherurl = "http://www.weather.com.cn/data/sk/"+citycode+".html";
    $.ajax({
        url : weatherurl,
        async : false,
        cache : false,
        dataType : "txt",
        error : function(xmr,ei,e){
                    console.log("error happened!");
                    console.log(xml);
                    console.log(ei);
                    console.log(e);
                },
        success : function(data){
                    weatherinfo = data.weatherinfo;
                    console.log(weatherinfo);
                    $("#weather").html(listAllProperty(weatherinfo));
                },
        type : "GET"          
    });
    return false;
}