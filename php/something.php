<?php


function main()
{

    echo json_encode(
        [
            "errorCode" => "INVALID_PARAMS",
            "errorMessage" => "Invalid X, Y or R values"
        ]
    );

}

session_start();
main();
?>