function submitSchedule() {
	var title = $("#a_title").val();
	var date = $("#a_date").val();
	var time = $("#a_time").val();
	var importance = $("#a_importance").val();
	var detail = $("#a_detail").val();
	
	if(title == ""){
		$("#a_title").focus();
		return false;
	};
	
	if(time == ""){
		time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	}
	
	date = new MyDate(date);
	
	var id;
	var num = storage.local(date.sValue);
	if(num == null){
		num = 1;
	}else{
		num = num.toInt()+1;
	}

	storage.local(date.sValue,num);
	id = date.sValue+"-"+num.toFormattedString(4);		
	var s = new Schedule(id,date,title,time,importance,detail);
	storage.local(id,s.getJson());
	
	$("#a_title").val("");
	$("#a_date").val("");
	$("#a_time").val("");
	$("#a_importance").val("");
	$("#a_detail").val("");
}

function display_calendar(){
	// 7 x 6 = 42 divs together;
	var bts = $(".content_date a");
	var tmpMyDate = kCurrent.clone().date("d","1");
	var dayInWeek = tmpMyDate.dayInWeek("1");
	var daysInMonth = tmpMyDate.daysOfMonth();
	for(var i = 0,n=1;i <43;i++){
		if(i < dayInWeek || n > daysInMonth){
			$(bts[i]).hide();
		}else{
			$(bts[i]).show();
			var tmpNum = localStorage.getItem(tmpMyDate.sValue);
			if(tmpNum != null){
				$(bts[i]).html(n+"("+tmpNum+")").attr("id",tmpMyDate.sValue);
			}else{
				$(bts[i]).html(n).attr("id",tmpMyDate.sValue);
			}
			n ++ ;
			tmpMyDate.date("d",+1);	
		}
	}
	$("#calendar_title .ui-btn-text").html("Calendars &nbsp;"+kCurrent.sValue);
}

function display_schedule(type){
	$("#schedule_list").html("");
	var daysArray = new Array();
	var tp = type;

	switch(type){
		case "schedule_w":
			$(schedule_t).show().insertAfter("#schedule_list");
			$(schedule_m).show();
			$(schedule_w).hide();
			schedule_title_msg = schedule_title_w;
			var dayInWeek = kCurrent.dayInWeek();
			if(dayInWeek==0){
				dayInWeek = 7;
			}
			for(var i = 1;i <= 7;i ++){
				var tmpDate = new Date();
				if(i < dayInWeek){
					tmpDate.setDate(d.getDate() + i -dayInWeek);
				}else if(i > dayInWeek){
					tmpDate.setDate(d.getDate() + i - dayInWeek);
				}else{
					tmpDate = d;
				}
				var month = (tmpDate.getMonth() + 1).toFormattedString(2);
				var date = (tmpDate.getDate()).toFormattedString(2);
				daysArray.push(new Array(tmpDate.getFullYear(),"-",month,"-",date).join(""));
			}
			break;
		case "schedule_m":
			$(schedule_t).show();
			$(schedule_m).hide();
			$(schedule_w).show().insertAfter("#schedule_list");
			schedule_title_msg = schedule_title_m;
			
			var day = new Array(kCurrent.sYear,"-",kCurrent.sMonth,"-","01");
			daysArray.push(day.join(""));
			for(var i = 2;i<kCurrent.daysOfMonth();i++){
				day[4] = i.toFormattedString(2);
				daysArray.push(day.join(""));
			}
			
			break;
		case "schedule_t":  // today is default			
		default:
			$(schedule_w).show().insertBefore("#schedule_list");
			$(schedule_m).show();
			$(schedule_t).hide();
			schedule_title_msg = schedule_title_t;
			daysArray.push(kCurrent.sValue);
			break;
	}
	// add schedule title first
	
	var schedule_title = new Array();
	schedule_title.push("<li data-role=\"list-divider\" id=\"schedule_title\" role=\"heading\">");
	schedule_title.push(schedule_title_msg);
	schedule_title.push("</li>");
	$("#schedule_list").append(schedule_title.join(""));
	
	// add schedule items
		
	for(var i=0;i<daysArray.length;i++){
		var ss = getSchedules(daysArray[i]);
		for(var j = 0;j<ss.length;j++){
			var schedule = new Array();
			schedule.push("<li data-theme=\"c\"><a href=\"#detail_page\" id=\"");
			schedule.push(ss[j].id);
			schedule.push("\" class=\"ui-link-inherit schedule_item\">");
			schedule.push(ss[j].date.sValue);
			schedule.push(":");
			schedule.push(j+1);
			schedule.push("&nbsp;");
			schedule.push(ss[j].title);
			schedule.push("</a><span class=\"ui-icon ui-icon-arrow-r\">&nbsp;</span></li>");
			$("#schedule_list").append(schedule.join(""));
		}
	}
	$("#schedule_list").listview("refresh");	
}
	


function display_day_schedule(){
	var date = kCurrent.sValue;
	$("#day_title").html(date);
	$(".schedule_item_li").remove();
	// add schedule items
	var ss = getSchedules(date);
	
	for(var i=0;i<ss.length; i++){
		var t = new Array();
		t.push("<li class=\"schedule_item_li\" data-theme=\"c\"><a href=\"#detail_page\" id=\"");
		t.push(ss[i].id);
		t.push("\" class=\"ui-link-inherit schedule_item\">");
		t.push(ss[i].date.sValue);
		t.push(":");
		t.push(i+1);
		t.push("&nbsp;");
		t.push(ss[i].title);
		t.push("</a><span class=\"ui-icon ui-icon-arrow-r\">&nbsp;</span></li>");
		var item = t.join("");
		$("#day_schedule_list").append(item);
	}
	$("#day_schedule_list").listview("refresh");
}

function detail_page_show(){
	var ok = true;
	var id = storage.session("id");
	if(id == null){ok = false ;}
	var j = storage.local(id);
	if(j == null){ ok = false ;};
	if(ok){
		storage.session
		var s = Schedule.valueOfJson(id,j);
		$("#d_title").html(s.title);
		$("#d_date").html(s.date.sValue); // MyDate
		$("#d_time").html(s.time);
		$("#d_importance").html(s.importance);
		$("#d_detail").html(s.detail);
	}
	$("#d_detail_content").trigger("create");
	
	_detail_page_inited = true;
}

function getSchedules(key){
	//form :"2012-12-12"; unchecked!
	var num = storage.local(key);
	num = num == null ? 0 : num.toInt();
	var lastfix = new Array(key,"-",0,0,0,1);
	var ss = new Array();
	//storaged begins "yyyy-mm-dd-0001"
	for(var i=1;i<= num;i++){
		var id = lastfix.join("");
		var j = storage.local(id);
		if(j == null){break;}
		var s = Schedule.valueOfJson(id,j);
		ss.push(s);
		lastfix[5] ++;
	}
	return ss;
}