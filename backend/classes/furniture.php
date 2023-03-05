<?php


class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function getHeight()
    {
        return $this->height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function setDimension($height, $width, $length)
    {
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function setAttribute()
    {
        $this->attribute = 'Dimension: ' . $this->height . 'x' . $this->width . 'x' . $this->length;
    }
}
