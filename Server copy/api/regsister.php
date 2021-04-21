<?php
session_start();
$data = array("status" => false, "message" => "Có lỗi khi đăng ký tài khoản!");
header('Access-Control-Allow-Origin: *');
if (!isset($_SESSION["username"])) {
    include_once("../_connect.php");
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = mysqli_real_escape_string($conn, htmlspecialchars($_POST["username"]));
        $password = mysqli_real_escape_string($conn, htmlspecialchars($_POST["password"]));
        if (!empty($username) && !empty($password)) {
            $password = md5($password);
            $res = mysqli_query($conn, "SELECT COUNT(*) as count FROM table_accounts WHERE `username` = '$username' LIMIT 1");
            $row = mysqli_fetch_assoc($res);
            if ($row["count"] == 0) {
                $res = mysqli_query($conn, "INSERT INTO table_accounts (`username`,`password`) VALUES ('$username','$password')");
                if ($res) {
                    $data["status"] = true;
                    $data["message"] = "Đăng ký tài khoản thành công!";
                } else {
                    $data["status"] = false;
                    $data["message"] = "Không thể đăng ký tài khoản, vui lòng thử lại!";
                }
            } else {
                $data["status"] = false;
                $data["message"] = "Tài khoản đã tồn tại!";
            }
        }
    }
}
echo json_encode($data);
