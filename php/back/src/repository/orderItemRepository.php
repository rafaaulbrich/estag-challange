<?php

require_once("./database.php");
require_once("./model/order.php");
require_once("./controller/orderItemController.php");
require_once("./model/product.php");
require_once("./controller/productController.php");
error_log("arquivo");
class OrderItemRepository {
    
    public $db;
    
    public function __construct() {
        $this->db = new Database;
    }

    public function getAllProducts() {
        error_log("products");
        $stmt = $this->db->getConnection()->query("SELECT * FROM PRODUCTS");
        return $stmt->fetchAll();
    }

    public function getAllOrders() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDERS");
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
        $stmt = $this->db->getConnection()->prepare("INSERT INTO ORDER_ITEM (order_code, product_code, amount, price, tax) VALUES (:order, :product, :amount, :price, :tax)");
        $stmt->execute(["order" => $data["order"],
                        "product" =>$data["product"], 
                        "amount" => $data["amount"], 
                        "price" => $data["price"], 
                        "tax" => $data["tax"]]);
    }

    public function deleteOrderItem($id) {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM ORDER_ITEM WHERE code = :id");
        $stmt->execute(['id' => $id]);
    }

    public function getOrderItemsById($id) {
        $stmt = $this->db->getConnection()->prepare("SELECT * FROM ORDER_ITEM WHERE ORDER_CODE = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>