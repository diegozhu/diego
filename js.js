$(function(){
	var bgimages = new Array("bg3","bg7");
	var a = document.getElementById("header");
	var i = 0;
	setInterval(function(){
		a.style.backgroundImage = "url(images/"+bgimages[i++]+".jpg)";
		if(i == bgimages.length){
			i = 0;
		}
	},3000);

	ko.applyBindings(mode_public_zh);
	var isChinese = true;

	$("#language").on("click",function(event){
		if(isChinese){
			ko.applyBindings(mode_public_en);
		}else{
			ko.applyBindings(mode_public_zh);
		}
		isChinese = !isChinese;
		return flase;
	});
});