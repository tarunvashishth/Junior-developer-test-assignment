<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once("../config/database.php");
include_once("../config/operations.php");
include_once("../classes/product.php");
include_once("../classes/book.php");
include_once("../classes/dvd.php");
include_once("../classes/furniture.php");

//object for database
$db = new Database();

$connection = $db->connect();

$operation = new Operations($connection);

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $data = json_decode(file_get_contents("php://input"));

    $productType = $data->productType;
    $product = new $productType();

    if (!empty($data->sku) && !empty($data->name) && !empty($data->price)) {

        $product->setSku($data->sku);
        $product->setName($data->name);
        $product->setPrice($data->price);
        if (!empty($data->weight)) $product->setWeight($data->weight);
        if (!empty($data->size)) $product->setSize($data->size);
        if (!empty($data->height) && !empty($data->width) && !empty($data->length)) {
            $product->setDimension($data->height, $data->width, $data->length);
        }
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
