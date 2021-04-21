<?php
$lifetime=3600*24;
session_set_cookie_params($lifetime, '/; samesite=None;', $_SERVER['HTTP_HOST'], 1, true);
session_start();
if (!isset($_SESSION["username"])) {
    header("Location: /page/login.php");
}
else{
    header("Location: /page/profile.php");
}
?>