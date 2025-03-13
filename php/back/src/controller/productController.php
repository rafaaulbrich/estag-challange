<?php

require_once("./model/product.php");
require_once("./repository/productRepository.php");
require_once("./model/category.php");
require_once("./repository/categoryRepository.php");

class ProductController {
    private $productRepository;

    public function __construct() {
        $this->productRepository = new productRepository();
    }

    public function getCategories($name) {
        $category = $this->categoryRepository->getCategories($name);

        if ($category) {
            echo json_encode($category);
        } else {
            echo json_encode([]);
        }
    }

    public function getProducts($name) {
        $product = $this->productRepository->getProducts($name);

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode([]);
        }
    }

    public function getProductById($id) {
        $product = $this->productRepository->getProductById($id);

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode([]);
        }
    }

    public function getAllProducts() {
        $product = $this->productRepository->getAllProducts();

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode([]);
        }
    }

    public function createProduct($data) {
        $product = new Product($data['name'], $data['price'], $data['amount'], $data['category']);
        $this->productRepository->createProduct((array)$product);
    }

    public function deleteProduct($id) {
        $this->productRepository->deleteProduct($id);
    }
}

?>