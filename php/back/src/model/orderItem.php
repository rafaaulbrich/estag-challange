<?php

include_once("order.php");
include_once("product.php");

class OrderItem {

    public $product;
    public $order;
    public $amount;
    public $price;
    public $tax;

    public function __construct($product, $order, $amount, $price, $tax) {
        $this->product = $product;
        $this->order = $order;
        $this->amount = $amount;
        $this->price = $price;
        $this->tax = $tax;
    }
}

?>