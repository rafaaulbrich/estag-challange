<?php

require_once("./model/order.php");
require_once("./repository/orderRepository.php");

class OrderController {
    private $orderRepository;

    public function __construct() {
        $this->orderRepository = new orderRepository();
    }

    public function getAllProducts() {
        $product = $this->productRepository->getAllProducts();

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode([]);
        }
    }

    public function getAllOrderItems() {
        $orderItem = $this->orderItemRepository->getAllOrderItems();

        if ($orderItem) {
            echo json_encode($orderItem);
        } else {
            echo json_encode([]);
        }
    } 

    public function getAllOrders() {
        $order = $this->orderRepository->getAllOrders();

        if ($order) {
            echo json_encode($order);
        } else {
            echo json_encode([]);
        }
    }

    public function createOrder($data) {
        $order = new Order($data['total'], $data['tax']);
        $this->orderRepository->createOrder((array)$order);
    }

    public function deleteOrder($id) {
        $this->orderRepository->deleteOrder($id);
    }
}

?>