<?php

require_once("./database.php");
require_once("./model/product.php");
require_once("./controller/productController.php");
require_once("./model/category.php");
require_once("./controller/categoryController.php");

class ProductRepository {

    public $db;

    public function __construct() {
        $this->db = new Database;
    }
   
    public function getProducts($name) {
        $stmt = $this->db->getConnection()->prepare("SELECT name FROM PRODUCTS WHERE name = :name");
        $stmt->execute(['name' => $name]);
    }
    
    public function getAllCategories() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM CATEGORIES");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductById($id) {
        $stmt = $this->db->getConnection()->prepare("SELECT id FROM PRODUCTS WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }

    public function getAllProducts() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM PRODUCTS");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createProduct($data) {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO PRODUCTS (name, price, amount, category_code) VALUES (:name, :price, :amount, :category)");
        $stmt->execute(["name" => $data["name"], "price" => $data["price"], "amount" => $data["amount"], "category" => $data["category"]]);
    }

    public function deleteProduct($id) {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM PRODUCTS WHERE code = :id");
        $stmt->execute(['id' => $id]);
    }

}

?>