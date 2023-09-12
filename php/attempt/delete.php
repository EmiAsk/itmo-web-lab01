<?php

function main() {
    $_SESSION["attempts"] = [];

    echo json_encode(
        $_SESSION["attempts"]
    );
}

session_start();
main();
?>