<?php
session_start();
if (isset($_SESSION['result'])) {
    require_once "Result.php";
    foreach ($_SESSION['result'] as $tr) {
        drawResult($tr);
    }
}