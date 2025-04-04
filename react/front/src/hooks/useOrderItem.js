import { useState } from 'react';

export default function useOrderItem() {
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const getOrderItems = async () => {
        try {
            const response = await fetch('http://localhost/orderItem', {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setCartItems(data);

        } catch (e) {
            console.error("Erro ao buscar itens do pedido:", e);
        }
    }

    const getOrderItemsById = async (id) => {
        try {
            const response = await fetch(`http://localhost/orderItem/${id}`, {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setCartItems(data);
            return data;
            
        } catch (e) {
            console.error("Erro ao buscar itens da compra pelo id:", e);
        }
    }

    const getAllOrderItems = async () => {
        try {
            const response = await fetch('http://localhost/orderItem', {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setOrderItems(data);
            return data;

        } catch (e) {
            console.error("Erro ao buscar itens do pedido:", e);
        }
    }

    return { cartItems, setCartItems, getOrderItems, getOrderItemsById, getAllOrderItems };
}