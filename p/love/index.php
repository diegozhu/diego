<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<?php
    $girlName = "zengbike";
    $boyName = "zhy";
    $qqNumber = "674417307";
    $boyPictureUrl = "zhy.png";
    $girlPictureUrl = "zbk.jpg";
?>
<head>
	<title>Our Love Story</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<style type="text/css">@font-face {font-family: digit;src: url('digital-7_mono.ttf') format("truetype");}</style>
	<link href="love/default.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="love/jquery.js"></script>
	<script type="text/javascript" src="love/garden.js"></script>
    <script type="text/javascript" src="love/functions.js"></script>
</head>

<body>
	<div id="mainDiv">
		<div id="content">
			<div id="code">
				<span class="comments">/**</span><br />
				<span class="space"/><span class="comments">* We are both Nanjing Agriculture Unversity Students,</span><br />
				<span class="space"/><span class="comments">* so I write some code to show my love to you.</span><br />
				<span class="space"/><span class="comments">*/</span><br />
				Boy i = <span class="keyword">new</span> Boy(<span class="string">"<?php echo $boyName ?>"</span>);<br />
				Girl u = <span class="keyword">new</span> Girl(<span class="string">"<?php echo $girlName; ?>"</span>);<br />
				<span class="comments">// Todya May 4, 2012, I told you I love you. </span><br />
				i.love(u);<br />
				<span class="comments">// but..., what you said that meaning we are still good friends.</span><br />
				u.sayOtherthing();<br />
				<span class="comments">// Since then, I ask you for the reason.</span><br />
				<span class="keyword">var</span> reason=i.ask(u);<br />
				<span class="comments">// you say we were not understand enough for each other .</span><br />
				$("body").append(reason);<br />
				<span class="comments">// You say that it is too quickily to turn our relation of lover.</span><br />
				<span class="comments">// And take care of u and our love.</span><br />
				i.takeCareOf(u);<br />
				<span class="comments">// So I keep waiting and I have confidence that you will.</span><br />
				<span class="keyword">boolean</span> isAccept = <span class="keyword">false</span>;<br />
				<span class="keyword">while</span> (isAccept) {<br />
				<span class="placeholder"/>i.waitFor(u);<br />
				<span class="placeholder"/><span class="comments">// I think it is an important decision</span><br />
				<span class="placeholder"/><span class="comments">// and you should forgot the unhappy things that happended before.</span><br />
				<span class="placeholder"/>isAccept = u.thinkOver();<br />
				}<br />
				<span class="comments">// After a please sound of accept, we will live happily ever after.</span><br />
				u.accept(i);<br />
				i.liveHappilyWith(u);<br />
			</div>
			<div id="loveHeart">
				<canvas id="garden"></canvas>
				<div id="words">
					<div id="messages">
						<div style="float: left;margin-left: 60px;"> <img src="<?php echo $girlPictureUrl ; ?>" width="120px" height="90px;"/></div> <div style="float:right;margin-right: 60px;">  <img src="<?php echo $boyPictureUrl ; ?>" width="90px" height="90px;"/></div>
						<div style="float: none;clear: both;"><?php echo $girlName; ?>~, I will have fallen in love with you for</div>
						<div id="elapseClock" style="display:none"></div>
						<a href='#' id="accept">will u accept me?</a>
					</div>
					<div id="loveu">
						Love u forever and ever.<br/>
						<div class="signature">- <?php echo $boyName; ?></div>
					</div>
				</div>
			</div>
		</div>
		<div id="copyright">Copyright ? 2012 <a href="#"><?php echo $boyName; ?> && <?php echo $girlName; ?></a></div>
		<iframe id="qqChart" style="visibility:hidden"></iframe>
		<div id="sendMail" style="visibility: hidden"></div>
	</div>
<script type="text/javascript">
		var offsetX = $("#loveHeart").width() / 2;
		var offsetY = $("#loveHeart").height() / 2 -70 ;
		if (!document.createElement('canvas').getContext) {
			var msg = document.createElement("div");
			msg.id = "errorMsg";
			msg.innerHTML = "Your browser doesn't support HTML5!<br/>Recommend use Chrome 14+/IE 9+/Firefox 7+/Safari 4+"; 
			document.body.appendChild(msg);
			$("#code").css("display", "none")
			$("#copyright").css("position", "absolute");
			$("#copyright").css("bottom", "10px");
		    document.execCommand("stop");
		}else{
			setTimeout(function () {adjustWordsPosition();startHeartAnimation();},10000);
			$("#accept").click(function(){
				$(this).hide();
				$("#elapseClock").show();
				var together = new Date();
				timeElapse(together);
				setInterval(function (){timeElapse(together);}, 500);
				$("#qqChart").attr("src","http://wpa.qq.com/msgrd?v=3&uin=<?php echo $qqNumber;?>&site=qq&menu=yes");
				$("#sendMail").load("../sendMail/index.php");
			})
			adjustCodePosition();
			$("#code").typewriter();
		}
</script>
</body>
</html>

