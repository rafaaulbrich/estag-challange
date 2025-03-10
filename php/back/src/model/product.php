<?php

class Product {

    public $name;
    public $price;
    public $amount;
    
    public function __construct($name, $price, $amount) {
        $this->name = $name;
        $this->price = $price;
        $this->amount = $amount;
    }
}

?>