<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: GET");

include_once("../config/database.php");
include_once("../config/operations.php");
include_once("../classes/product.php");

//object for database
$db = new Database();

$connection = $db->connect();

$operation = new Operations($connection);

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    $data = $operation->read();

    if ($data->num_rows > 0) {

        $res = mysqli_fetch_all($data, MYSQLI_ASSOC);

        http_response_code(200);
        echo json_encode(array(
            "status" => 200,
            "data" => $res
        ));
    } else {
        http_response_code(404); //data not found
        echo json_encode(array(
            "status" => 404,
            "message" => "No data present"
        ));
    }
} else {
    http_response_code(503); //service unavailable
    echo json_encode(array(
        "status" => 503,
        "message" => "Acces Denied"
    ));
}
