<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:GET,POST,OPTIONS');
header('Access-Control-Allow-Headers:Content-Type, Authorization');
header('content-type:text/json');
$server = isset($_POST['server']) ? intval($_POST['server']):1;
$partition = isset($_POST['path']) ? intval($_POST['path']):NULL;
if($partition){
	$conf = include('./config.inc.php');
	//echo json_encode($conf);exit;
	$dsn  = 'mysql:host=' . $conf[1]['host'].';charset=' . $conf[1]['charset'].';dbname=' . $conf[1]['name'];
	$options = array(
		#调整DEBUG 0关闭错误提示,1显示错误,2显示异常
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::MYSQL_ATTR_COMPRESS=>true 
	);
	$pdo = new PDO($dsn,$conf[1]['user'],isset($conf[1]['pw'])?$conf[1]['pw']:$conf[1]['password'],$options);
	if(!empty($_POST['text'])&&!empty($_POST['pos'])&&!empty($_POST['no'])){
		$text = trim($_POST['text']);
		$text = trim(mb_substr($text,0,250));
		if(!empty($text)){
			$PDOStatement = $pdo->prepare('INSERT INTO `qq14_house` (`server`,`path`,`pos`,`no`,`text`,`time`) VALUES(?,?,?,?,?,?);');
			$PDOStatement->execute([$server,intval($partition),intval($_POST['pos']),intval($_POST['no']),$text,time()]);
		}
	}
	$PDOStatement = $pdo->prepare('SELECT * FROM `qq14_house` WHERE `server`= ? AND `path` = ?;');
	if($PDOStatement->execute([$server,intval($partition)])){
		$result = $PDOStatement->fetchAll(PDO::FETCH_ASSOC);
		if(!empty($result)){
			echo json_encode($result);
			exit;
		}
	}

}
echo '[]';
//Access-Control-Allow-Origin