import { useState } from 'react';

export default function useOrder() {
    const [order, setOrder] = useState([]);
    const [inactiveOrder, setInactiveOrder] = useState([]);

    const getActiveOrder = async () => {
        try {
            const response = await fetch('http://localhost/activeOrder', {
                method: "GET",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setOrder(data);
            return data;

        } catch (e) {
            console.error("Erro ao buscar pedidos ativos:", e);
        }
    }

    const getAllOrdersInactive = async () => {
        try {
            const response = await fetch('http://localhost/ordersInactive', {
                method: "GET",
            })
    
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            setInactiveOrder(data);
            return data;
    
        } catch (e) {
            console.error("Erro ao buscar pedidos inativos:", e);
        }
    }

    return { order, setOrder, getActiveOrder, getAllOrdersInactive, inactiveOrder, setInactiveOrder };
}