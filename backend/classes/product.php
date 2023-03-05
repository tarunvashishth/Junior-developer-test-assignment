<?php

require_once('Product.php');

abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;
    protected $attribute;
    protected $id;

    abstract public function setAttribute();

    public function getAttribute()
    {
        return $this->attribute;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
}
