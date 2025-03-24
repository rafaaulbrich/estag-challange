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
        error_log("products");
        $stmt = $this->db->getConnection()->query("SELECT * FROM PRODUCTS");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllOrders() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDERS");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getOrderItem($name) {
        $stmt = $this->db->getConnection()->prepare("SELECT name FROM ORDER_ITEM WHERE name = :name");
        $stmt->execute(['name' => $name]);
    }

    public function getAllOrderItems() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM ORDER_ITEM");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createOrderItem($data) {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO ORDER_ITEM (product_code, order_code, amount, price, tax) VALUES (:product, :order, :amount, :price, :tax)");
        $stmt->execute(["product" => $data["product"],
                        "order" => $data["order"], 
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

    public function incrementAmountOrderItem($data) {
        $stmt = $this->db->getConnection()->prepare("UPDATE ORDER_ITEM SET amount = :amount WHERE code = :id");
        $stmt->execute(['amount' => $data['amount'], 'id' => $data['code']]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getHistoryItem($id) {
        $stmt = $this->db->getConnection()->prepare("SELECT * FROM order_item INNER JOIN orders ON order_item.order_code = orders.code WHERE orders.active = false AND order_item.product_code = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function cancelOrder() {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM ORDER_ITEM WHERE order_code IN (SELECT order_code FROM ORDER_ITEM INNER JOIN ORDERS ON order_item.order_code = orders.code WHERE orders.active = true)");
        $stmt->execute();
    }
}

?>