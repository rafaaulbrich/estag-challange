import { useState } from 'react';

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const response = await fetch('http://localhost/categories', {
            method: 'GET'
        });

        const data = await response.json();
        setCategories(data);
    }

    const validTax = (tax) => {
        if (tax <= 0 || tax > 100) {
            return false
        }
        return true
    }

    return { categories, setCategories, getCategories, validTax };
}