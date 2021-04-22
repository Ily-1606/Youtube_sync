<?php
include_once("../_connect.php");
include_once("../_functions.php");
$lifetime = 3600 * 24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
header('Access-Control-Allow-Origin: ' . $_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
$data = array("status" => false, "message" => "Có lỗi khi thực hiện chặn kênh!");
if (isset($_SESSION["username"])) {
    if (isset($_POST["data_id"])) {
        $username = $_SESSION["username"];
        $data_id = mysqli_real_escape_string($conn, htmlspecialchars($_POST["data_id"]));
        $res = mysqli_query($conn, "SELECT COUNT(*) as count FROM block_channels WHERE `username` = '$username' AND `url_chanel` = '$data_id' LIMIT 1");
        $row = mysqli_fetch_assoc($res);
        if ($row["count"] == 0) {
            /*
            $data_info = json_decode(get_info_channel($data_id),true);
            $data_info = $data_info[1]["response"]["header"]["c4TabbedHeaderRenderer"];
            $title = $data_info["title"];
            $chanel_url = "https://www.youtube.com/channel/".$data_info["channelId"];
            $chanel_id = $data_info["channelId"];
            */
            $res = mysqli_query($conn, "INSERT INTO block_channels (`username`,`url_chanel`) VALUES ('$username','$data_id')");
            if ($res) {
                $data["status"] = true;
                $data["message"] = "Chặn URL thành công!";
            } else {
                $data["status"] = false;
                $data["message"] = "Có lỗi khi chặn URL!";
            }
        }
    }
} else {
    $data["status"] = false;
    $data["message"] = "Bạn chưa đăng nhập, vui lòng đăng nhập!";
}
echo json_encode($data);
