<?php
$link = mysql_connect("localhost","root");
if(!$link){
    echo "<script language=javascript>history.back();</script>";
    exit(0);
}else{
    mysql_select_db("chizainannong",$link);
    mysql_query("set names utf8");
}
?>