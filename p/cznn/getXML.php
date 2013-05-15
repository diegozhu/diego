<?php 			    include_once("connectdb.php");
					$idBegin = 1;  
					$idNumbers = 20;	
					$table="cai";
                    $idBegin = 1;  //id号默认从1开始。
                    $idNumber = 20;    //一次默认发送20个数据。
                    $table = "cai";    
                    $orderby = "id";    //默认按id排序
                    $rank = "asc";      //默认排序由小到大
                    $limits = "40";   //默认查询条数 限制 40
                    $field = "*";                 
                     
       
                    if(!isset($_GET['table'])){                              //设定表
                        //die();
                    }else{
                        $table = $_GET['table'];
                    }
                    
                    if(isset($_GET['count'])){                              //查询记录条数
                        $exec =  "select count(*) from $table ";
                         $result = mysql_query($exec);
                         echo mysql_result($result, 0,"count(*)");
                         die();
                    }		    
                    
                    if(isset($_GET['update_time'])){                    //查询更新时间
                        $sql = "SELECT UPDATE_TIME FROM information_schema.tables where TABLE_SCHEMA='chizainannong'and TABLE_NAME='$table';";  
                        $result = mysql_query($sql);
                        $score= mysql_result($result,0,"UPDATE_TIME");
                        echo $score;
                        die();
                    }
                    
                     if(isset($_GET['idBegin'])){                           //设定起始id
                        $idBegin = $_GET['idBegin'];
                    }
                    if(isset($_GET['idNumber'])){                       //设定截止id
                        $idNumber = $_GET['idNumber'];
                    }
                     $idEnd = $idBegin + $idNumber -1;
                     
                    if(isset($_GET['rank'])){                                   //设定排序方法（从大到小还是从小到大）
                        $rank = $_GET['rank'];
                        if($rank == "top"){
                            $rank = "desc";
                        }else{
                                $rank = "asc";
                        }
                    }
                    if(isset($_GET['orderby'])){                                //设定排序字段
                            $orderby = $_GET['orderby'];
                        }
                    if(isset($_GET['$limits'])){
                            $limits = $_GET['limits'];
                        }
                    
                    
                    $exec = "select column_name from information_schema.columns where table_name='$table';";

                    $result = mysql_query($exec);              
                    $columnNumber =mysql_num_rows($result);
                    
                    if(isset($_GET['id'])){                                //查询某一记录    
                        $id = $_GET['id'];
                        $idBegin = $id;
                        $idEnd = $id;                       
                      }
                    
                     if(isset($_GET['field'])){                         //设置查询字段
                            $field = $_GET['field'];                              
                            $exec = "select $field from $table where id >= $idBegin and id<= $idEnd order by $orderby $rank limit $limits;";
                            $res = mysql_query($exec);                  //查询多条 记录                            
                            echo  "<$table"."s>\n";
                             for($i = 0;$i <mysql_num_rows($res);$i ++){
                                    $colomnValue= mysql_result($res, $i,0);
                                    echo  "\t<".$table.">\n";                                    
                                    echo "\t\t<".$field.">".$colomnValue."</".$field.">\n";
                                    echo "\t</".$table.">\n";
                            }       
                            echo "</".$table."s>";        
                        }else{
                           $exec = "select * from $table where id >= $idBegin and id<= $idEnd order by $orderby $rank limit $limits;";
                            $res = mysql_query($exec); 
                            echo  "<".$table."s>\n";
                             for($i = 0;$i <mysql_num_rows($res);$i ++){
                                    echo  "\t<".$table.">\n";   
                                    for($j = 0;$j<$columnNumber;$j++){
                                           $colomnName = mysql_result($result, $j,0);
                                           $colomnValue= mysql_result($res, $i,$j);
                                           echo "\t\t<".$colomnName.">".$colomnValue."</".$colomnName.">\n";
                                       }
                                        echo "\t</".$table.">\n";
                            }       
                            echo "</".$table."s>";             
                        }                        
                   
                    
                    
                    
                    
              /*      查询表所含有字段    
               *      echo $columnNumber."\n";
                      for($i = 0;$i <$columnNumber;$i ++){
                          $colomnName = mysql_result($result, $i,0);
                          echo $colomnName."\n";
                      }
                    */

?>