<?php

include_once("order.php");
include_once("product.php");

class OrderItem {

    public $product;
    public $order;
    public $name;
    public $amount;
    public $price;
    public $tax;

    public function __construct($product, $order, $name, $amount, $price, $tax) {
        $this->product = $product;
        $this->order = $order;
        $this->name = $name;
        $this->amount = $amount;
        $this->price = $price;
        $this->tax = $tax;
    }
}

?>