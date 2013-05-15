<?php 

/*
echo "- Application name" . $_ENV['OPENSHIFT_APP_NAME']   ."\n<br />";
echo "- For persistent storage (between pushes)" . $_ENV['OPENSHIFT_DATA_DIR'] ."\n<br />" ; 
echo " - Temp storage (unmodified files deleted after 10 days)" .  $_ENV['OPENSHIFT_TMP_DIR']."\n<br />"  ; 
echo " - DB host" . $_ENV['OPENSHIFT_MYSQL_DB_HOST']   ."\n<br />"  ;
echo "  - DB Port" .  $_ENV['OPENSHIFT_MYSQL_DB_PORT'] ."\n<br />"  ;
echo "- DB Username" .  $_ENV['OPENSHIFT_MYSQL_DB_USERNAME'] ."\n<br />" ;
echo "  - DB Password" . $_ENV['OPENSHIFT_MYSQL_DB_PASSWORD']."\n<br />";

$link = mysql_connect($_ENV['OPENSHIFT_MYSQL_DB_HOST'].":".$_ENV['OPENSHIFT_MYSQL_DB_PORT'],$_ENV['OPENSHIFT_MYSQL_DB_USERNAME']  ,$_ENV['OPENSHIFT_MYSQL_DB_PASSWORD']); 
if (!$link) { 
	die('Could not connect to MySQL: ' . mysql_error()); 
} 
echo 'Connection OK'; mysql_close($link); 
*/

?> 