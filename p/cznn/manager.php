<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="style.css" />
<body>
<div id="left">
   <input type="button"  id="a0" value="菜肴"  onclick="Display('cai');"><br />
   <input type="button"  id="a0" value="员工"  onclick="Display('worker');"><br />
   <input type="button"  id="a0" value="窗口"  onclick="Display('window');"><br />
   <input type="button"  id="a0" value="评论"  onclick="Display('comment');"><br />  
</div>
<div id="right" >
    <iframe id="content" style="height:600px;width:1000px;;"></iframe>

      
<script language="JavaScript">
  function Display(div) {
      window.frames['content'].document.location.href = "manage.php?column="+div;       
  }  
 
</script>
</div>

</body>
</html>
                    