<?php

require_once('Product.php');

class Dvd extends Product
{
    private $size;

    public function getSize()
    {
        return $this->size;
    }

    public function setsize($size)
    {
        $this->size = $size;
    }

    public function setAttribute()
    {
        $this->attribute = 'Size: ' . $this->size . ' MB';
    }
}
