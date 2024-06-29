<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail -> charSet = 'UTF-8';
$mail -> setLanguage('uk', 'phpmailer/language/');
$mail -> IsHTML(true);

$mail -> setFrom($_POST['email'], 'Сайт');
$mail -> addAdress('romakolishko16@gmail.com');
$mail -> Subject = 'Повідомлення із сайту';

$body = '<h1>Лист із сайту</h1>';
if(trim(!empty($_POST['email']))) {
    $body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))) {
    $body.='<p><strong>Повідомлення:</strong> '$_POST['message']'</p>';
}
$mail -> Body = $body;
if($mail -> send()) {
    $message = 'Помилка';
} else {
    $message = 'Дані відправлені';
}
$response = ['message' => $message];
header('Content-type:application/json');
echo json_encode($response)
?>