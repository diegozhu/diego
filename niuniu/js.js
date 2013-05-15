var bgimages = new Array("bg3","bg7");
var a = document.getElementById("header");
var i = 0;
setInterval(function(){
	a.style.backgroundImage = "url(../images/"+bgimages[i++]+".jpg)";
	if(i == bgimages.length){
		i = 0;
	}
},3000);

ko.applyBindings(mode_index_zh);
var isChinese = true;

$("#language").on("click",function(event){
	if(isChinese){
		ko.applyBindings(mode_index_en);
	}else{
		ko.applyBindings(mode_index_zh);
	}
	isChinese = !isChinese;
	return false;
});

data_h1 = '<li><a href="#" >';
data_h2 = '</a></li>\n';
var dom  = new Array();
for(var j in fix_list){
	dom.push(data_h1);
	dom.push("^.&nbsp;");
	dom.push(fix_list[j]);
	dom.push(data_h2);
}
$('#content_ul').html(dom.join(""));