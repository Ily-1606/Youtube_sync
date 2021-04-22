<?php
include_once("../_connect.php");
include_once("../_functions.php");
$lifetime=3600*24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
header('Access-Control-Allow-Origin: '.$_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
$data = array("status"=>false,"message"=>"Có lỗi khi lấy dữ liệu!");
if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $res = mysqli_query($conn, "SELECT * FROM block_channels WHERE `username` = '$username'");
    if (mysqli_num_rows($res)) {
        $data["status"] = true;
        $data["data"] = array();
        unset($data["message"]);
        while ($row = mysqli_fetch_array($res)){
            array_push($data["data"],$row["url_chanel"]);
        }
    }
}
else{
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
