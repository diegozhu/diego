<?php
	$time = $_GET["time"];
	$score = $_GET["score"];
	$name = $_GET["name"];
	$totalscore = $_GET["totalscore"];
	$totalCubeNumber  = $_GET["totalCubeNumber"];
	$con = mysql_connect("localhost","root","root");
	if(!$con){
		die('Could not connect: ' . mysql_error());
	}else{
		mysql_select_db("cube", $con);
		$sql = "insert into record values(null,'$name','$score','$time','$totalCubeNumber',null,'$totalscore');";
		$res = mysql_query($sql);
		// echo $res;
	}
?>