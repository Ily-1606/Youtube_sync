<?php
$lifetime=3600*24;
session_set_cookie_params($lifetime, '/; samesite=None', $_SERVER['HTTP_HOST'], 1, true);
$data = array("status" => false, "message" => "Có lỗi khi đăng nhập vào hệ thống!");
header('Access-Control-Allow-Origin: '.$_SERVER["HTTP_ORIGIN"]);
header("Access-Control-Allow-Credentials: true");
session_start();
if (!isset($_SESSION["username"])) {
    include_once("../_connect.php");
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = mysqli_real_escape_string($conn, htmlspecialchars($_POST["username"]));
        $password = mysqli_real_escape_string($conn, htmlspecialchars($_POST["password"]));
        if (!empty($username) && !empty($password)) {
            $password = md5($password);
            $res = mysqli_query($conn, "SELECT COUNT(*) as count, username FROM table_accounts WHERE `username` = '$username' AND `password` = '$password' LIMIT 1");
            $row = mysqli_fetch_assoc($res);
            if ($row["count"] > 0) {
                $data["status"] = true;
                $data["message"] = "Đăng nhập thành công!";
                $_SESSION["username"] = $row["username"];
            } else {
                $data["status"] = false;
                $data["message"] = "Sai tên đăng nhập hoặc mật khẩu, vui lòng thử lại!";
            }
        }
    }
}
echo json_encode($data);
