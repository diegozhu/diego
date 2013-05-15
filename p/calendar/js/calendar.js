$(document).delegate("#add_page","pagecreate",function(){
		$(".btSubmit").live( "click",submitSchedule);	
});

$(document).delegate("#schedules_page","pagecreate",function(){
	$(".schedule_type").live("click",function(event,ui){
		var type = event.target.parentElement.parentElement.id;
		display_schedule(type);
	});	
	$("#schedules_page").live("pagebeforeshow",display_schedule);
});

$(document).delegate("#index_page","pagecreate",function(){
	$("#index_page").live("pagebeforeshow",display_calendar);
	$(".changeMonth").live("click",function(){
		switch(event.target.parentElement.name){
			case sLast:
				kCurrent.date("m",-1);
				break;
			case sNext:
				kCurrent.date("m",+1);
				break;
			case sThis:
			default:
				kCurrent.date("m",0);
				break;
			}
			display_calendar();
	});		
	$(".content_date a").live("click",function(event,ui){
			kCurrent.set(event.currentTarget.id);
	});
});

$(document).delegate("#day_page","pagecreate",function(){
	$(".content_change_day").live("click",function(event,ui){
		switch(event.target.parentElement.name){
			case sLast:
				kCurrent.date("d",-1);
				break;
			case sNext:
				kCurrent.date("d",+1);
				break;
			case sThis:
			default:
				kCurrent.date("d",0);
			break;
		}
		display_day_schedule();
	});
	$("#day_page").live("pagebeforeshow",display_day_schedule);
});
		
$(document).delegate("#detail_page","pagecreate",function(){
	$("#detail_page").live("pagebeforeshow",detail_page_show);
});

$(".btBack").live("click",function(){
	history.back();
});
$(".schedule_item").live("click",function(event,ui){
	storage.session("id",event.currentTarget.id);
});