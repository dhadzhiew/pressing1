<?php
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$subject = trim($_POST['subject']);
$msg = trim($_POST['msg']);

if(strlen($name) == 0){
	echo 'no name';
	exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
	echo 'no email';
	exit;
}
if(strlen($subject) == 0){
	echo 'no subject';
	exit;
}
if(strlen($msg) == 0){
	echo 'no msg';
	exit;
}
// $ipInfo = file_get_contents('http://ip-api.com/json/'. $_SERVER['REMOTE_ADDR']);
// $ipInfoObject = json_decode($ipInfo);
// $ipFormattedInfo = 'IP адрес: ' . $_SERVER['REMOTE_ADDR'] . '<br/>' .
		// 'Държава: ' . $ipInfoObject->country . '<br/>' .
		// 'Град: ' . $ipInfoObject->city . '<br/>' . 
		// 'Област: ' . $ipInfoObject->regionName . '<br/>' . 
		// 'Интернет доставчик: ' . $ipInfoObject->as . ', ' . $ipInfoObject->isp . ', ' . $ipInfoObject->org;

$to = 'dhadzhiew@gmail.com';
$sub = "=?UTF-8?B?".base64_encode($subject)."?=" ; 
$msg = 'Име: ' . $name . '<br/>' . 
		htmlspecialchars($msg);
		// $ipFormattedInfo; 
$headers = "From: <admin@pressing1-pm.com>\r\n";
$headers .= "Reply-To: " . $email ." \r\n";
$headers .= "MIME-Version: 1.0 \r\n" ; 
$headers .= "Content-type: text/html; charset=UTF-8 \r\n" ; 
$headers .= "Content-Transfer-Encoding: 8bit" ; 

mail($to, $sub, $msg, $headers);
?>