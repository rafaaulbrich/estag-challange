import { useEffect, useState } from "react";
import { validInputs, validName, clearInputs } from '../helpers/inputs';
import useProduct from '../hooks/useProduct';
import useCategory from '../hooks/useCategory';
import useOrder from '../hooks/useOrder';
import useOrderItem from "../hooks/useOrderItem";

import Input from '../components/input/Input';
import Button from "../components/button/Button";
import ButtonAction from "../components/button/buttonAction/ButtonAction";
import styles from './Product.module.css';

const Product = () => {
    const { products, getProducts, validAmount, validPrice } = useProduct();
    const { categories, getCategories } = useCategory();
    const { getActiveOrder } = useOrder();
    const { getOrderItemsById, getAllOrderItems } = useOrderItem();

    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    const createProduct = async () => {
        if (!validInputs(productName, amount, price, categoryName)) {
            return alert("All fields need to be filled!")
        };

        if (!validName(productName)) {
            return alert("The field product name aceppts only letters")
        };

        if (!validAmount(amount)) {
            return alert("The number you want to put isn't valid!");
        };

        if (!validPrice(price)) {
            return alert("The number you want to put isn't valid!");
        };

        const newProduct = {
            code: products.length > 0 ? products[products.length - 1].code + 1 : 1,
            name: productName,
            amount: amount,
            price: price,
            category: categoryName,
        };

        try {
            const response = await fetch('http://localhost/products', {
                method: "POST",
                body: JSON.stringify(newProduct)
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            await getProducts();
            clearInputs(setProductName, setAmount, setPrice, setCategoryName);

        } catch (e) {
            console.error("Erro ao adicionar produto:", e);
        }
    }

    const deleteProduct = async (id) => {
        const tempOrder = await getActiveOrder();
        const orderItems = await getAllOrderItems();    
        const itemsInCart = await getOrderItemsById(tempOrder.code);

        let existingItemInCart = itemsInCart.find((item) => item.product_code === id);
        let itemIndexInHistory = orderItems.findIndex((i) => Number(i.product_code) === Number(id));

        if (existingItemInCart) {
            return alert("Can't delete the product because it's in your cart!");
        }
        if (itemIndexInHistory !== -1) {
            return alert("Can't delete the product because it's in your history!");
        }
        try {
            const response = await fetch(`http://localhost/products/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            await getProducts();
            clearInputs(setProductName, setAmount, setPrice, setCategoryName);

        } catch (e) {
            console.error("Erro ao adicionar produto:", e);
        }

        await getProducts();
    }

    return (
        <>
            <div className={`${styles.inputs}`}>
                <Input type="text" placeholder="Product name" onChange={(e) => setProductName(e.target.value)} value={productName} />
                <Input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
                <Input type="number" placeholder="Unit price ($)" onChange={(e) => setPrice(e.target.value)} value={price} />
                <select className={`${styles.select}`} id="categorySelect" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                    <option value="" defaultValue hidden>Select category</option>
                    {categories.map((category) => (
                        <option key={category.code} value={category.code}>{category.name}</option>
                    ))}
                </select>
                <Button onClick={createProduct}>Add product</Button>
            </div>
            <div>
                <table className={`${styles.table}`}>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Unit price</th>
                            <th>Category</th>
                            <th className={`${styles.lastElement}`}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.code}>
                                <td>{product.code}</td>
                                <td>{product.name}</td>
                                <td>{Number(product.amount)} units</td>
                                <td>${Number(product.price).toFixed(2)}</td>
                                <td>{categories.find((c) => c.code === product.category_code)?.name}</td>
                                <td className={`${styles.lastElement}`}><ButtonAction onClick={() => deleteProduct(product.code)}>Delete</ButtonAction></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product