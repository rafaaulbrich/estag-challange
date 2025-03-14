<?php

require_once("./database.php");
require_once("./model/order.php");
require_once("./controller/orderItemController.php");
require_once("./model/product.php");
require_once("./controller/productController.php");

class OrderItemRepository {
    
    public $db;

    public function __construct() {
        $this->db = new Database;
    }

    public function getAllProducts() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM PRODUCTS");
        return $stmt->fetchAll();
    }
    
    public function getOrderItem($name) {
        $stmt = $this->db->getConnection()->prepare("SELECT name FROM ORDER_ITEM WHERE name = :name");
        $stmt->execute(['name' => $name]);
    }

    public function getAllOrderItems() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDER_ITEM");
        return $stmt->fetchAll();
    }

    public function createOrderItem($data) {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO ORDER_ITEM (order_code, product_code, name, amount, price, tax) VALUES (:order, :product, :name, :amount, :price, :tax)");
        $stmt->execute(["order" => $data["order"], "product" =>$data["product"], "name" => $data["name"], "amount" => $data["amount"], "price" => $data["price"], "tax" => $data["tax"]]);
    }

    public function deleteOrderItem($id) {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM ORDER_ITEM WHERE code = :id");
        $stmt->execute(['id' => $id]);
    }
}

?>