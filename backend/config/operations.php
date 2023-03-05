<?php

class Operations
{
    private $conn;
    private $table_name;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->table_name = "products";
    }

    public function create($product)
    {
        //sql query to insert data
        $query = "INSERT INTO " . $this->table_name . " 
            SET sku = ?, name = ?, price = ?, attribute = ?";

        //prepare sql
        $obj = $this->conn->prepare($query);

        $sku = htmlspecialchars(strip_tags($product->getSku()));
        $name = htmlspecialchars(strip_tags($product->getName()));
        $price = htmlspecialchars(strip_tags($product->getPrice()));
        $attribute = htmlspecialchars(strip_tags($product->getAttribute()));

        //binding
        $obj->bind_param("ssds", $sku, $name, $price, $attribute);

        //executing
        if ($obj->execute()) {
            return true;
        }
        return false;
    }

    public function read()
    {
        $sql_query = "SELECT * FROM " . $this->table_name;

        $query_run = mysqli_query($this->conn, $sql_query);

        return $query_run;
    }

    public function delete($all_id)
    {
        $delete_query = "DELETE FROM " . $this->table_name . " WHERE id IN ($all_id)";

        $delete_obj = $this->conn->prepare($delete_query);

        if ($delete_obj->execute()) {
            return true;
        }
        return false;
    }
}
