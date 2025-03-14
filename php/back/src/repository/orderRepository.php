<?php

require_once("./database.php");
require_once("./model/order.php");
require_once("./controller/orderItemController.php");
require_once("./model/product.php");
require_once("./controller/productController.php");

class OrderRepository {

    public $db;

    public function __construct() {
        $this->db =  new Database;
    }

    public function getAllProducts() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM PRODUCTS");
        return $stmt->fetchAll();
    }

    public function getAllOrderItems() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDER_ITEM");
        return $stmt->fetchAll();
    }

    public function getAllOrders() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDERS");
        return $stmt->fetchAll();
    }

    public function createOrder($data) {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO ORDERS (total, tax) VALUES (:total, :tax)");
        $stmt->execute(["total" => $data["total"], "tax" => $data["tax"]]);
    }

    public function deleteOrder($id) {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM ORDERS WHERE code = :id");
        $stmt->execute(['id' => $id]);
    }
}

?>