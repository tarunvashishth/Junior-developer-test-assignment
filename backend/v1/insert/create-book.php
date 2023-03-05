<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once("../../config/database.php");
include_once("../../config/operations.php");
include_once("../../classes/product.php");
include_once("../../classes/book.php");

//object for database
$db = new Database();

$connection = $db->connect();

$operation = new Operations($connection);

$product = new Book();

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->sku) && !empty($data->name) && !empty($data->price) && !empty($data->weight)) {

        $product->setSku($data->sku);
        $product->setName($data->name);
        $product->setPrice($data->price);
        $product->setWeight($data->weight);
        $product->setAttribute();

        if ($operation->create($product)) {
            http_response_code(200); //All ok
            echo json_encode(array(
                "status" => 200,
                "message" => "Product has been created"
            ));
        } else {
            http_response_code(500); //internal server error
            echo json_encode(array(
                "status" => 500,
                "message" => "Failed to insert product"
            ));
        }
    } else {
        http_response_code(404); //page not found
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
