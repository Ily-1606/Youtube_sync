<?php
include_once($_SERVER["DOCUMENT_ROOT"]."/_config.php");
$conn = new mysqli($db_hostname, $db_username, $db_password, $db_database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
