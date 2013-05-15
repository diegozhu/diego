<html>
<head>
<script src="../jquery-1.6.4.js" type="text/javascript"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>leisure game</title>
</head>
<body>
<center><h1>积分榜</h1></center>
<table>
<tr><td>排名</td><td>姓名</td><td>吃到</td><td>坚持时间(毫秒)</td><td>方块数</td><td>提交时间</td><td>总得分</td></tr>
<?php
	$time = $_GET["time"];
	$score = $_GET["score"];
	$name = $_GET["name"];
	$totalCubeNumber  = $_GET["totalCubeNumber"];
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		die('Could not connect: ' . mysql_error());
	}else{
		mysql_select_db("cube", $con);
		$sql = "select * from record order by totalscore desc limit 20;";
		$res = mysql_query($sql,$con);
		$index = 1;
		while(($row = mysql_fetch_row($res)) != false){
			echo "<tr><td>$index</td><td>$row[1]</td><td>$row[2]</td><td>$row[3]</td><td>$row[4]</td><td>$row[5]</td><td>$row[6]</td></tr>\n";
			$index ++;
		}
	}
?>
</table>
<style>
body{padding-top:60px;}
table{border-collapse:collapse;border-spacing:0;border:#000 1px;width:800px;height:auto;margin:20px auto auto auto;font-size:13px;}
tr{padding:0;}
td{padding:3px;border:#000 1px double;}
.evenstyle{background:#eef;}
.oddstyle{background:#ffe;}
</style>
<script language="javascript">
$(function(){
	$('tr:odd').addClass('evenstyle');
    $('tr:even').addClass('oddstyle');
});
</script>
</body>