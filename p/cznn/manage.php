<?php      
                            $column = $_GET['column'];
                            $table = $column;
                            include_once("connectdb.php"); 
                            $exec = "select column_name from information_schema.columns where table_name='$table';";
                            $result = mysql_query($exec);              
                            $columnNumber =mysql_num_rows($result);
                            echo $table."<div style=\"float:right\"><input type=\"button\" value=\"添加\" onclick=\"window.location.href='addNews.php?column=$table'\"/></div>\n\t";
                            echo "<table border=\"1\" style=\"text-align:left;\ width=\"100%\">\n";
                            echo "\t\t<tr>";
                            for($i = 0;$i <$columnNumber;$i ++){
                                $colomnName = mysql_result($result, $i,0);
                                echo "<td>".$colomnName."</td>";
                            }                            
                            echo "<td>manage</td></tr>";   
                            
                            $exec = "select * from $table ;";
                            $res = mysql_query($exec); 
                          
                          
                             for($i = 0;$i <mysql_num_rows($res);$i ++){
                                    echo  "\t<tr>\n";   
                                    for($j = 0;$j<$columnNumber;$j++){  
                                           $colomnValue= mysql_result($res, $i,$j);
                                           echo "\t\t<td>".$colomnValue."</td>\n";
                                       }
                                       $id = $i + 1;
                                        echo  "<td><input type=\"button\" value=\"删除\" onclick=\"window.location.href='del.php?column=$table&id=$id'\"></td>\n";   
                                        echo  "\t</tr>\n";                                      
                            }       
                             echo "</table>";
?>