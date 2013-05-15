<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>添加</title>
        </head>
    <body> 
        <?php
        include_once("connectdb.php");
        $table = $_GET["column"];
        echo $table;
        echo "<form action=\"add.php?column=$table\" method=\"post\">\n";
         $exec = "select column_name,column_type from information_schema.columns where table_name='$table';";
        $result = mysql_query($exec);              
        $columnNumber =mysql_num_rows($result);
        for($i = 1;$i <$columnNumber;$i ++){     //第一个字段为id，用户不能修改，故不显示
            $colomnName = mysql_result($result, $i,0);     //第一个字段为name
            $colomnType = mysql_result($result, $i,1);      //第一个字段为type
            if($colomnName!="update_time"){
                echo $colomnName.":\n\t<input type=\"text\" name=\"$colomnName\">";
                echo "\t\t<input name=\"".$colomnName."Hidden\" value=\"$colomnType\" type=\"hidden\"><br />\n";
            }
        }
        ?>  
	<input type="submit" value="提交" />
	<div id='message'></div>
	<script  language="JavaScript">
	    var inputs = document.getElementsByTagName("input");
	    var message = document.getElementById("message");
	    message.innerHTML = "inputs.toString();";
	    message.innerHTML = message.innerHTML + inputs.toString();
	</script>
	</form>
</body>
</html>
