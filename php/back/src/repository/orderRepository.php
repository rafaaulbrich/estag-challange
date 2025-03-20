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
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllOrderItems() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDER_ITEM");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllOrders() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDERS");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createOrder() {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO ORDERS (total, tax, active) VALUES (0, 0, True)");
        $stmt->execute();
    }

    public function deleteOrder($id) {
        $stmt = $this->db->getConnection()->prepare("UPDATE ORDERS SET active = false WHERE code = :id");
        $stmt->execute(['id' => $id]);
    }

    public function getActiveOrder() {
        $stmt = $this->db->getConnection()->prepare("SELECT * FROM ORDERS WHERE active = true");
        $stmt->execute();

        $orderData = $stmt->fetch(PDO::FETCH_ASSOC);
        if($orderData) {{
            return $orderData;
        }} else {
            return null;
        }
    }

    public function currentOrder() {
        $stmt = $this->db->getConnection()->prepare("UPDATE ORDERS SET active = false WHERE active = true");
        $stmt->execute();
    }

    public function getAllOrdersInactive() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDERS WHERE active = false");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateOrder($data) {
        $stmt = $this->db->getConnection()->prepare("UPDATE ORDERS SET total = :total, tax = :tax WHERE code = :id");
        $stmt->execute(['total' => $data['total'], 'tax' => $data['tax'], 'id' => $data['id']]);    

        $orderData = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($orderData) {
            return $orderData;
        } else {
            return null;
        }
    }
}

?>