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
        $orders = $this->orderRepository->getAllOrders();

        if ($orders) {
            echo json_encode($orders);
            return $orders;
        } else {
            echo json_encode([]);
        }
    }

    public function createOrder() {
        $order = $this->getActiveOrder();

        if($order) {
            $this->deleteOrder($order['code']);
        }
        $this->orderRepository->createOrder();
    }

    public function deleteOrder($id) {
        $this->orderRepository->deleteOrder($id);
    }

    public function getActiveOrder() {
        $order = $this->orderRepository->getActiveOrder();

        if($order) {
            echo json_encode($order);
            return $order;
        } else {
            echo json_encode([]);
        }
    }

    public function currentOrder() {
        $order = $this->orderRepository->currentOrder();

        if($order) {
            echo json_encode($order);
        } else {
            echo json_encode([]);
        }
    }

    public function getAllOrdersInactive() {
        $ordersInactive = $this->orderRepository->getAllOrdersInactive();
        if($ordersInactive) {
            echo json_encode($ordersInactive);
            return $ordersInactive;
        } else {
            echo json_encode([]);
        }
    }

    public function updateOrder($data) {
        $this->orderRepository->updateOrder($data);
    }
}

?>