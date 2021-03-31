<?php
$lifetime=3600*24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
$data = array("status" => false, "message" => "Có lỗi khi đăng nhập vào hệ thống!");
header('Access-Control-Allow-Origin: '.$_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
if (isset($_SESSION["username"])) {
    echo json_encode(array("status"=>true));
}else{
    echo json_encode(array("status"=>false));
}
?>