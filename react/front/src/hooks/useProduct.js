import { useState } from 'react';

export default function useProduct() {
    const [products, setProducts] = useState([]);
    
    const getProducts = async () => {
        const response = await fetch('http://localhost/products', {
            method: 'GET'
        });
    
        const data = await response.json();
        setProducts(data);
    }

    const validAmount = (amount) => {
        if (amount <= 0 || amount % 1 !== 0) {
            return false
        }
        return true
    }

    const validPrice = (price) => {
        if (price <= 0) {
            return false
        }
        return true
    }

    return { products, setProducts, getProducts, validAmount, validPrice };
}