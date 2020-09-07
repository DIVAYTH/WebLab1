<?php
require_once "Result.php";
session_start();
$startTime = microtime(true);
date_default_timezone_set("Europe/Moscow");
$time = date("Y-m-d H:i:s");
$y = (float)$_POST['Y'];
$x = $_POST['X'];
$r = $_POST['R'];
if (checkValue($y, $x, $r)) {
    $point = checkPoint($x, $y, $r);
    $benchmark = round(microtime(true) - $startTime, 7) * 1000;
    $answer = array($y, $x, $r, $point, $time, $benchmark);
    array_push($_SESSION['result'], $answer);
    drawResult($answer);
} else {
    http_response_code(400);
}

function checkValue($y, $x, $r)
{
    return is_numeric($y) && $y <= 3 && $y >= -5 && in_array($x, array(-3, -2, -1, 0, 1, 2, 3, 4, 5)) && in_array($r, array(1, 1.5, 2, 2.5, 3));
}

function checkPoint($x, $y, $r)
{
    if (($x >= -$r) && ($y <= $r / 2) && ($x <= 0) && ($y >= 0)) {
        return 'true';
    }
    if (($x >= 0) && ($y >= 0) && ($x * $x + $y * $y <= $r * $r)) {
        return 'true';
    }
    if (($x <= 0) && ($y <= 0) && ($y >= -2 * $x - $r)) {
        return 'true';
    }
    return 'false';
}