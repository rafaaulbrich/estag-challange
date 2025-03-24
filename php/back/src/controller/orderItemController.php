<?php

require_once("./model/orderItem.php");
require_once("./repository/orderItemRepository.php");
require_once("./model/order.php");
require_once("./repository/orderRepository.php");
require_once("./model/product.php");
require_once("./repository/productRepository.php");

class OrderItemController {
    private $orderItemRepository;

    public function __construct() {
        $this->orderItemRepository = new orderItemRepository();
    }

    public function getAllProducts() {
        $product = $this->productRepository->getAllProducts();

        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode([]);
        }
    }

    public function getOrderItem($name) {
        $orderItem = $this->orderItemRepository->getOrderItem($name);

        if ($orderItem) {
            echo json_encode($orderItem);
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

    public function createOrderItem($data) {
        $orderItem = new OrderItem(
            product: $data['product'], 
            order: $data['order'],
            amount: $data['amount'],
            price: $data['price'],
            tax: $data['tax']);
        $this->orderItemRepository->createOrderItem((array)$orderItem);
    }

    public function getOrderItemsById($id) {
        $orderItem = $this->orderItemRepository->getOrderItemsById($id);

        if($orderItem) {
            echo json_encode($orderItem);
        } else {
            echo json_encode([]);
        }
    }

    public function incrementAmountOrderItem($data) {
        $this->orderItemRepository->incrementAmountOrderItem($data);
    }

    public function deleteOrderItem($id) {
        $this->orderItemRepository->deleteOrderItem($id);
    }

    public function getHistoryItem($id) {
        $orderItem = $this->orderItemRepository->getHistoryItem($id);

        if($orderItem) {
            echo json_encode($orderItem);
        } else {
            echo json_encode([]);
        }
    }

    public function cancelOrder() {
        $orderItem = $this->orderItemRepository->cancelOrder();

        if($orderItem) {
            echo json_encode($orderItem);
            return $orderItem;
        } else {
            echo json_encode([]);
        }
    }
}

?>