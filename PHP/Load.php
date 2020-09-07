<?php
require_once "Result.php";
session_start();
if (isset($_SESSION['result'])) {
    foreach ($_SESSION['result'] as $tr) {
        drawResult($tr);
    }
} else {
    $_SESSION['result'] = array();
}