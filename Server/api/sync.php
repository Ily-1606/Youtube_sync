<?php
include_once("../_connect.php");
session_start();
$data = array("status"=>false,"message"=>"Có lỗi khi thực hiện đồng bộ hóa!");
header('Access-Control-Allow-Origin: *');
if(isset($_SESSION["username"])){
    if(isset($_POST["data_id"])){
        $username = $_SESSION["username"];
        $data_id = mysqli_real_escape_string($conn, htmlspecialchars($_POST["data_id"]));
        $res = mysqli_query($conn, "SELECT COUNT(*) as count FROM table_sync WHERE `username` = '$username' AND `id_youtube` = '$data_id' LIMIT 1");
        $row = mysqli_fetch_assoc($res);
        if ($row["count"] == 0) {
            $res = mysqli_query($conn,"INSERT INTO table_sync (`id_youtube`,`username`) VALUES ('$data_id','$username')");
            if($res){
                $data["status"] = true;
                $data["message"] = "Đồng bộ hóa thành công!";
            }
            else{
                $data["status"] = false;
                $data["message"] = "Có lỗi khi đồng bộ hóa!";
            }
        }
    }
}
else{
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
?>