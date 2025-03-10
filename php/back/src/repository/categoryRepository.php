<?php

require_once("./database.php");
require_once("./model/category.php");
require_once("./controller/categoryController.php");


class CategoryRepository {

    public $db;

    public function __construct() {
        $this->db = new Database;
    }

    public function getCategories($name) {
        $stmt = $this->db->getConnection()->prepare("SELECT name FROM CATEGORIES WHERE name = :name");
        $stmt->execute();
    }

    public function getAllCategories() {
        $stmt = $this->db->getConnection()->query("SELECT * FROM CATEGORIES");
        return $stmt->fetchAll();
    }

    public function createCategory($category) {
        $stmt = $this->db->getConnection()->prepare("INSERT INTO CATEGORIES (name, tax) VALUES (:name, :tax)");
        $stmt->execute(["name" => $category["name"], "tax" => $category["tax"]]);
    }

    public function deleteCategory($id) {
        $stmt = $this->db->getConnection()->prepare("DELETE FROM CATEGORIES WHERE id = :id");
        $stmt->execute();
    }

}

?>