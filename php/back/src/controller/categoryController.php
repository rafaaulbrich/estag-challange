<?php

require_once("./model/category.php");
require_once("./repository/categoryRepository.php");

class CategoryController {
    private $categoryRepository;

    public function __construct() {
        $this->categoryRepository = new CategoryRepository();
    }

    public function getCategories($name) {
        $category = $this->categoryRepository->getCategories($name);

        if ($category) {
            echo json_encode($category);
        } else {
            echo json_encode([]);
        }
    }

    public function getCategoryById($id) {
        $category = $this->categoryRepository->getCategoryById($id);

        if ($category) {
            echo json_encode($category);
        } else {
            echo json_encode([]);
        }
    }

    public function getAllCategories() {
        $categories = $this->categoryRepository->getAllCategories();

        if ($categories) {
            echo json_encode($categories);
        } else {
            echo json_encode([]);
        }
    }

    public function createCategory($data) {
        $category = new Category($data['name'], $data['tax']);
        $this->categoryRepository->createCategory((array)$category);
    }

    public function deleteCategory($id) {
        $this->categoryRepository->deleteCategory($id);
    }
}

?>