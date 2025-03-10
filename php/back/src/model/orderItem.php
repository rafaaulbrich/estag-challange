<?php

class OrderItem {

    public $name;
    public $amount;
    public $price;
    public $tax;

    public function __construct($name, $amount, $price, $tax) {
        $this->name = $name;
        $this->amount = $amount;
        $this->price = $price;
        $this->tax = $tax;
    }
}

?>