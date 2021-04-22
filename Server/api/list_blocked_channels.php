<?php
include_once("../_connect.php");
$lifetime = 3600 * 24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
if(isset($_SERVER["HTTP_ORIGIN"])){
    $origin = $_SERVER["HTTP_ORIGIN"];
}
else{
    $origin = "*";
}
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
session_start();
if (isset($_SESSION["username"])) {
    if (isset($_GET["page"]))
        $page = $_GET["page"];
    else
        $page = 0;
    if ($page < 0)
        $page = 0;
    $start =  $page * 10;
    $username = $_SESSION["username"];
    $res = mysqli_query($conn, "SELECT * FROM block_channels WHERE `username` = '$username' ORDER BY create_time DESC LIMIT $start,10");
    $data["status"] = true;
    $data["data"] = array();
    while($row = mysqli_fetch_array($res)){
        array_push($data["data"],array("id"=>$row["id"],"create_time"=>$row["create_time"],"url_chanel"=>$row["url_chanel"]));
    }
    if(mysqli_num_rows($res) == 10){
        $data["next_page"] = true;
    }
    else{
        $data["next_page"] = false;
    }
} else {
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
