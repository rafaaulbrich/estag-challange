<?php

include_once("./controller/categoryController.php");

$categoryController = new CategoryController;

$routes = [
    '/' => 'home',
    '/products' => 'products',
    '/categories' => 'categories',
    '/history' => 'history'
];

function home() {
    echo "Welcome to home!";
}

function products() {
    echo "Welcome to product page";
}

function categories() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $categoryController;
        $data = json_decode(file_get_contents('php://input'), true);
        $categoryController->createCategory($data);
    };

    if($_SERVER["REQUEST_METHOD"] === "GET") {
        global $categoryController;
        $categoryController->getAllCategories();
    }
}

function history() {
    echo "Welcome to history page";
}

function handleRequest($uri, $routes) {
    if(array_key_exists($uri, $routes)) {
        $function = $routes[$uri];
        $function();
    } else {
        echo "404 - page not found";
    }
}

?>