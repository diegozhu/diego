<?php
header('conten-type:text/html;charset=utf-8');
        include_once("connectdb.php");
        $table = $_GET["column"];
         $exec = "select column_name from information_schema.columns where table_name='$table';";
        $result = mysql_query($exec);              
        $columnNumber =mysql_num_rows($result);
        
        $insertTO  = "`id`";                  //第一个字段肯定为ID，并且 为空
        $insertValues  = "NULL";        //第一个字段肯定为ID，并且 为空
            
        //获取提交值   以及数据库中表字段
        for($i = 1;$i <$columnNumber;$i ++){              
          $colomnName = mysql_result($result, $i,0);
          $insertTO = "$insertTO, `$colomnName`";
          if($colomnName!="update_time"){
                $value = $_POST[$colomnName];
                $insertValues=  "$insertValues, '$value'";
          }else{
                $insertValues=  "$insertValues, CURRENT_TIMESTAMP";
          }
        }
        
       

        //添加新闻
        $query = "INSERT INTO `chizainannong`.`$table` ($insertTO) VALUES ( $insertValues);";
        $result = mysql_query($query);          
        if($result == '1'){
              echo "<script language=javascript>alert(\"新闻添加成功\");window.location=\"manage.php?column=$table\";</script>";
        }else{
            echo "<script language=javascript>alert(\"新闻添加失败，请重试。\");</script><script language=javascript>history.back();</script>";
       }
   mysql_close($link); 

 //   INSERT INTO `chizainannong`.`cai` (`id`,`name`,`price`,`quantity`,`canteen`,`window`,`comments`,`score`,`other`,`source`,`method`) VALUES ( NULL,`234`,`243`,`234`,`234`,`567`,`68`,`568`,`568`,`5678`,`568`);

       ?>

