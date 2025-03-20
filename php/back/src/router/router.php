<?php

include_once("./controller/categoryController.php");
include_once("./controller/productController.php");
include_once("./controller/orderController.php");
include_once("./controller/orderItemController.php");

$categoryController = new CategoryController;
$productController = new ProductController;
$orderController = new OrderController;
$orderItemController = new OrderItemController;

$routes = [
    '/' => 'home',
    '/products' => 'products',
    '/products/id' => 'specificProduct',
    '/categories' => 'categories',
    '/categories/id' => 'specificCategory',
    '/orders' => 'orders',
    '/orders/id' => 'specificOrder',
    '/cancelOrder' => 'cancelOrder',
    '/currentOrder' => 'currentOrder',
    '/ordersInactive' => 'ordersInactive',
    '/activeOrder' => 'activeOrder',
    '/updateOrder' => 'updateOrder',
    '/orderItem' => 'orderItem',
    '/orderItem/id' => 'specificOrderItem',
    '/orderItemIncrement' => 'incrementOrderItem',
    '/orderItemDecrement' => 'decrementOrderItem',
];

function home() {
    echo "Welcome to home!";
}

function products() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $productController;
        $data = json_decode(file_get_contents('php://input'), true);
        $productController->createProduct($data);
    };

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $productController;
        $productController->getAllProducts();
    }
}

function specificProduct($id) {
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        global $productController;
        $productController->deleteProduct($id);
    };

    // if($_SERVER['REQUEST_METHOD'] === 'GET') {
    //     global $productController;
    //     $productController->getProductById($id);
    // }
}

function categories() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $categoryController;
        $data = json_decode(file_get_contents('php://input'), true);
        $categoryController->createCategory($data);
    };

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $categoryController;
        $categoryController->getAllCategories();
    }
}

function specificCategory($id) {
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        global $categoryController;
        $categoryController->deleteCategory($id);
    };

    // if($_SERVER['REQUEST_METHOD'] === 'GET') {
    //     global $categoryController;
    //     $categoryController->getCategoryById($id);
    // }
}

function orders() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $orderController;
        $orderController->createOrder();
    };

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderController;
        $orderController->getAllOrders();
    }
}

function cancelOrder() {
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        global $orderItemController;
        $orderItemController->cancelOrder();
    }
}

function activeOrder() {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderController;
        $orderController->getActiveOrder();
    }
}

function currentOrder() {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderController;
        $orderController->currentOrder();
    }
}

function ordersInactive() {
    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderController;
        $orderController->getAllOrdersInactive();
    }
}

function updateOrder() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $orderController;
        $data = json_decode(file_get_contents('php://input'), true);
        $orderController->updateOrder($data);
    }
}

function specificOrder($id) {
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        global $orderController;
        $orderController->deleteOrder($id);
    };

    // if($_SERVER['REQUEST_METHOD'] === 'GET') {
    //     global $orderController;
    //     $orderController->getOrderById($id);
    // }
}

function orderItem() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $orderItemController;
        $data = json_decode(file_get_contents('php://input'), true);
        $orderItemController->createOrderItem($data);
    };

    if($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderItemController;
        $orderItemController->getAllOrderItems();
    }
}

function specificOrderItem($id) {
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        global $orderItemController;
        $orderItemController->deleteOrderItem($id);
    } elseif($_SERVER['REQUEST_METHOD'] === 'GET') {
        global $orderItemController;
        $orderItemController->getOrderItemsById($id);
    };
}

function incrementOrderItem() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $orderItemController;
        $data = json_decode(file_get_contents('php://input'), true);
        $orderItemController->incrementAmountOrderItem($data);
    }
}

function decrementOrderItem() {
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        global $productController;
        $data = json_decode(file_get_contents('php://input'), true);
        $productController->decrementAmountStock($data);
    }
}

function handleRequest($uri, $routes) {
    $args = explode('/', $uri);
    if (isset($args[2])) {
        if(array_key_exists(('/' . $args[1] . '/id'), $routes)) {
            $function = $routes['/' . $args[1] . '/id'];
            $function($args[2]);
        } else {
            echo "404: Page Not Found.";
        }
    } elseif (isset($args[1])) {
        if(array_key_exists(('/' . $args[1]), $routes)) {
            $function = $routes['/' . $args[1]];
            $function();
        } else {
            echo "404: Page Not Found.";
        }
    }
}

?>