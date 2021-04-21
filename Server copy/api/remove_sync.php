<?php
include_once("../_connect.php");
$lifetime=3600*24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
header('Access-Control-Allow-Origin: '.$_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
$data = array("status"=>false,"message"=>"Có lỗi khi thực hiện đồng bộ hóa!");
if(isset($_SESSION["username"])){
    if(isset($_POST["data_id"])){
        $username = $_SESSION["username"];
        $data_id = mysqli_real_escape_string($conn, htmlspecialchars($_POST["data_id"]));
        $res = mysqli_query($conn, "SELECT COUNT(*) as count FROM table_sync WHERE `username` = '$username' AND `id_youtube` = '$data_id' LIMIT 1");
        $row = mysqli_fetch_assoc($res);
        if ($row["count"] == 1) {
            $res = mysqli_query($conn,"DELETE FROM table_sync WHERE `id_youtube` = '$data_id' AND `username` = '$username'");
            if($res){
                $data["status"] = true;
                $data["message"] = "Xóa khỏi đồng bộ hóa thành công!";
            }
            else{
                $data["status"] = false;
                $data["message"] = "Có lỗi khi xóa khỏi đồng bộ hóa!";
            }
        }
    }
}
else{
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
