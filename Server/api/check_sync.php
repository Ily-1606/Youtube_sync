<?php
include_once("../_connect.php");
$lifetime = 3600 * 24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
header('Access-Control-Allow-Origin: ' . $_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
if (isset($_SESSION["username"])) {
    if (isset($_POST["list_id"])) {
        $list_id =  json_decode($_POST["list_id"], true);
        $username = $_SESSION["username"];
        $data["status"] = true;
        $data["data"] = array();
        foreach ($list_id as $value) {
            $data_id = mysqli_real_escape_string($conn, htmlspecialchars($value["id"]));
            $res = mysqli_query($conn, "SELECT COUNT(*) as count FROM table_sync WHERE `username` = '$username' AND `id_youtube` = '$data_id' LIMIT 1");
            $row = mysqli_fetch_assoc($res);
            if ($row["count"] > 0) {
                array_push($data["data"],array("data_id"=>$value["unique_id"],"viewed"=>1));
            } else {
                array_push($data["data"],array("data_id"=>$value["unique_id"],"viewed"=>0));
            }
        }
    }
} else {
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
