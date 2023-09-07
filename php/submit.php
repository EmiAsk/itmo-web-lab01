<?php

    function validateX($x) {
        return is_numeric($x) && in_array($x, [-5, -4, -3, -2, -1, 0, 1, 2, 3]);
    }

    function validateY($y) {
        return is_numeric($y) && -5 <= $y && $y <= 3;
    }

    function validateR($r) {
        return is_numeric($r) && 1 <= $r && $r <= 4;
    }

    function success($x, $y, $r) {
        return ($x >= 0 && $y >= 0 && pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)) ||
            ($x <= 0 && $y <= 0 && $x >= -($r / 2) && $y >= -$r) ||
            ($x >= 0 && $y <= 0 && $x <= $r && $y >= (0.5 * $x - 0.5));
    }

    function main() {

        $start_time = microtime(true);

        $x = $_POST["x"];
        $y = $_POST["y"];
        $r = $_POST["r"];

        if (!validateX($x) || !validateY($y) || !validateR($r)) {
            http_response_code(400);
            echo json_encode(
                [
                    "errorCode" => "INVALID_PARAMS",
                    "errorMessage" => "Invalid X, Y or R values"
                ]
            );
        }

        $isSuccessful = success($x, $y, $r);

        $end_time = microtime(true);
        http_response_code(200);

        echo json_encode(
            [
                "x" => $x,
                "y" => $y,
                "r" => $r,
                "timestamp" => intval($end_time),
                "executionTime" => $end_time - $start_time,
                "success" => $isSuccessful
            ]
        );
    }

    session_start();
    main();
?>