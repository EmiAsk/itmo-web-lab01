<?php

function main() {
    $response = (isset($_SESSION["attempts"])) ? $_SESSION["attempts"] : [];

    http_response_code(200);

    echo json_encode(
        $response
    );
}

session_start();
main();
?>