<?php

include_once("category.php");

class Product {

    public $name;
    public $price;
    public $amount;
    public $category;
    
    public function __construct($name, $price, $amount, $category) {
        $this->name = $name;
        $this->price = $price;
        $this->amount = $amount;
        $this->category = $category;
    }

}

?>