<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once("../config/database.php");
include_once("../config/operations.php");
include_once("../classes/product.php");

//object for database
$db = new Database();

$connection = $db->connect();

$operation = new Operations($connection);

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $data = json_decode(file_get_contents("php://input"));

    $all_id = implode(",", $data->id);

    if (!empty($all_id)) {
        if ($operation->delete($all_id)) {
            http_response_code(200); //ok
            echo json_encode(array(
                "status" => 200,
                "message" => "product deleted successfully",
                "data" => $data
            ));
        } else {
            http_response_code(500); //internal server error
            echo json_encode(array(
                "status" => 500,
                "message" => "Failed to delete products"
            ));
        }
    } else {
        http_response_code(404); //data not found
        echo json_encode(array(
            "status" => 404,
            "message" => "All values needed"
        ));
    }
} else {
    http_response_code(503); //service unavailable
    echo json_encode(array(
        "status" => 503,
        "message" => "Acces Denied"
    ));
}
