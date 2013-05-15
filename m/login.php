<!DOCTYPE html>
<html xmlns:wb=“http://open.weibo.com/wb”>
    <head>
        <!--[if lt IE 9]>
            <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
       	    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>  
        <![endif]-->
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="wb:webmaster" content="134cf008c784e075" />
        <script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js" type="text/javascript" charset="utf-8"></script>
        <link href="style.css" media="screen" rel="stylesheet" type="text/css" />
        <title>
         Diego in Tracing~
        </title>
    </head>
<body>
    <div id="main">
    
<?php
$name = $_GET["name"];
$password = $_GET["password"];

echo "inputted name:".$name . "   password:".$password;
if(empty($name)){
	echo "user name should not be null!";
}else{
	$mysql = new SaeMysql();
        $sql = "SELECT * FROM `user` WHERE `name` = '" . $name . "';";
        $data = $mysql->getLine( $sql );       
        
        echo $data.password;
  	if(!empty($data) && $data.password == $password){
  		echo "登陆成功！";
        }else{
        	echo "用户不存在或密码不匹配！";
        };
        
        if( $mysql->errno() != 0 )
        {
            die( "Error:" . $mysql->errmsg() );
        }
         
        $mysql->closeDb();
}

?>

	</div>
    </body>
</html>