<?php

include_once("order.php");
include_once("product.php");

class OrderItem {

    public $order;
    public $product;
    public $name;
    public $amount;
    public $price;
    public $tax;

    public function __construct($order, $product, $name, $amount, $price, $tax) {
        $this->order = $order;
        $this->product = $product;
        $this->name = $name;
        $this->amount = $amount;
        $this->price = $price;
        $this->tax = $tax;
    }
}

?>