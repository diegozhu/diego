<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
</head>
<body>
<?php
    $id = $_GET['id'];
    $column = $_GET['column'];
    if($id!=""&&$column!=""){
       include_once("connectdb.php");
            $sql = "delete from $column where id =$id";
            $result = mysql_query($sql);
            if($result == '1'){
                echo "<script language=javascript>alert(\"新闻删除成功！\");</script>";
                   /*将剩余newsid重新排序*/
                $exec = "select * from $column";
                $result = mysql_query($exec);
                   /*每次删除1条，因此id最大为删除条目后查询得到的行数+1*/
                for($count = $id +1;$count <= mysql_num_rows($result)+1;$count ++){
                    $sql = "update $column set id = '$id' where id = '$count'";
                    mysql_query($sql);
                    $id ++;
                    }
                $sql  = "alter table $column AUTO_INCREMENT=$id";
                mysql_query($sql);
            }else{
                echo "<script language=javascript>alert(\"新闻删除失败，请重试。\");</script>";
            }
    }else{echo "<script language=javascript>alert(\"出错了～\");</script>";}
    echo "<script language=javascript>window.location=\"manage.php?column=$column\";</script>";
    mysql_free_result($result);    
    mysql_close($link); 
?>
</body>
</html>
