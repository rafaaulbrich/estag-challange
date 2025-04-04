import { useEffect, useState } from "react";
import { validInputs, clearInputs } from '../helpers/inputs';
import useCategory from '../hooks/useCategory';
import useProduct from '../hooks/useProduct';
import useOrder from '../hooks/useOrder';
import useOrderItem from "../hooks/useOrderItem";

import Input from '../components/input/Input';
import Button from '../components/button/Button';
import ButtonAction from "../components/button/buttonAction/ButtonAction";
import styles from './Home.module.css';

const Home = () => {
    const { categories, getCategories } = useCategory();
    const { products, getProducts, validAmount } = useProduct();
    const { order, getActiveOrder } = useOrder();
    const { cartItems, getOrderItemsById } = useOrderItem();

    const [productSelect, setProductSelect] = useState("");
    const [amount, setAmount] = useState("");
    const [tax, setTax] = useState("");
    const [price, setPrice] = useState("");

    const [cartTotal, setCartTotal] = useState(0);
    const [fullTax, setFullTax] = useState(0);

    useEffect(() => {
        getCategories();
        getProducts();
        getOrCreateOrder();
    }, [])

    const getItemDetails = async (productValue) => {
        await getProducts();
        await getCategories();

        let product = products.find((p) => Number(p.code) === Number(productValue));
        let category = categories.find((c) => Number(c.code) === Number(product?.category_code));

        setPrice(product ? `${Number(product.price).toFixed(2)}` : "");
        setTax(category ? `${Number(category.tax)}` : "");
    }

    async function deleteItem(id) {
        try {
            const response = await fetch(`http://localhost/orderItem/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            await getOrderItemsById(order.code);
            await getActiveOrder();
        } catch (e) {
            console.error("Erro ao deletar produto:", e);
        }
    }

    async function showTotal() {
        let newCartTotal = 0;
        let newFullTax = 0;

        cartItems.forEach((item) => {
            newCartTotal = Number(newCartTotal) + Number(item.price) * Number(item.amount);
            newFullTax = Number(newFullTax) + ((Number(item.tax) / 100) * Number(item.price) * Number(item.amount))
        })

        try {
            const response = await fetch('http://localhost/updateOrder', {
                method: "POST",
                body: JSON.stringify({
                    tax: newFullTax,
                    total: newCartTotal,
                    id: order.code
                })
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

        } catch (e) {
            console.error("Erro ao atualizar pedido:", e);
        }

        setCartTotal(newCartTotal);
        setFullTax(newFullTax);
    }

    useEffect(() => {
        showTotal();
    }, [cartItems]);

    async function cancelOrder() {
        if (cartItems.length === 0) {
            return alert("Your cart is empty!")
        } else {
            window.confirm("Are you sure?");
            const response = await fetch('http://localhost/cancelOrder', {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        }

        await getOrderItemsById(order.code);
        await showTotal();
    }

    async function finishPurchase() {
        if (cartItems.length === 0) {
            return alert("Your cart is empty!");
        }

        window.location.href = './history';

        cartItems.forEach(async (item) => {
            let product = products.find((p) => p.code === item.product_code);

            try {
                const response = await fetch('http://localhost/orderItemDecrement', {
                    method: "POST",
                    body: JSON.stringify({
                        code: product.code,
                        amount: Number(product?.amount) - Number(item.amount)
                    })
                })
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
            } catch (e) {
                console.error("Erro ao decrementar quantidade do estoque:", e);
            }
        }
        )

        await createOrder();
        await getActiveOrder();
        await getOrderItemsById(order.code);
        await showTotal();
    }

    const validAmountProduct = () => {
        let amountStock = products.find((p) => p.code === Number(productSelect)).amount;
        let findProduct = cartItems.findIndex((p) => p.product_code === Number(productSelect));
        let amountCart = 0;

        if (findProduct !== -1) {
            amountCart = cartItems[findProduct].amount
        }

        if (Number(amountCart) + Number(amount) > Number(amountStock)) {
            return false
        }
        return true;
    }

    async function createOrder() {
        const response = await fetch('http://localhost/orders', {
            method: 'POST',
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        await showTotal();
    }

    const getOrCreateOrder = async () => {
        const activeOrder = await getActiveOrder();

        if (!order.code && !activeOrder.code) {
            await createOrder();
            await getActiveOrder();
        } else {
            await getOrderItemsById(order.code ? order.code : activeOrder.code);
        }
    }

    const createItem = async () => {
        getItemDetails();
        await getProducts();

        const item = {
            order: order.code,
            product: productSelect,
            price: price,
            amount: amount,
            tax: tax,
        };

        if (!validInputs(productSelect, amount, tax, price)) {
            return alert("All fields need to be filled!");
        };

        if (!validAmount(amount)) {
            return alert("The number you want to put isn't valid!");
        };

        if (!validAmountProduct()) {
            clearInputs(setProductSelect, setAmount, setTax, setPrice);
            return alert("The quantity you want isn't available in stock!");
        };

        const existingItem = cartItems.find((val) => val.product_code === Number(productSelect));

        if (existingItem) {
            try {
                const response = await fetch('http://localhost/orderItemIncrement', {
                    method: "POST",
                    body: JSON.stringify({
                        ...existingItem,
                        amount: Number(existingItem?.amount) + Number(amount)
                    })
                })
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
            } catch (e) {
                console.error("Erro ao enviar produtos para incrementar:", e);
            }
        } else {
            try {
                const response = await fetch('http://localhost/orderItem', {
                    method: "POST",
                    body: JSON.stringify(item)
                })

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

            } catch (e) {
                console.error("Erro ao adicionar item:", e);
            }
        }

        await getOrderItemsById(order.code);
        clearInputs(setProductSelect, setAmount, setTax, setPrice);
    }

    const selectItem = async (value) => {
        setProductSelect(value);
        await getItemDetails(value);
    }

    return (
        <>
            <div className={`${styles.inputs}`}>
                <select className={`${styles.select}`} id="productSelect" value={productSelect} onChange={async (e) => selectItem(e.target.value)}>
                    <option value="" defaultValue hidden>Select product</option>
                    {products.map((product) => product.amount > 0 && (
                        <option key={product.code} value={product.code}>{product.name}</option>
                    ))}
                </select>
                <Input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
                <Input type="text" placeholder="Tax" onChange={(e) => setTax(e.target.value)} value={tax} disabled />
                <Input type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} disabled />
                <Button onClick={createItem}>Add product</Button>
            </div>
            {cartItems.length === 0 ? (
                <p className={`${styles.table}`}>Your cart is empty!</p>
            ) : (
                <>
                    <div>
                        <table className={`${styles.table}`}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Unit price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                    <th className={`${styles.lastElement}`}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.code}>
                                        <td className={`${styles.td}`}>{products.find((p) => p.code === item.product_code).name}</td>
                                        <td className={`${styles.td}`}>${Number(item.price).toFixed(2)}</td>
                                        <td className={`${styles.td}`}>{Number(item.amount)} units</td>
                                        <td className={`${styles.td}`}>${(Number(item.price) * Number(item.amount)).toFixed(2)}</td>
                                        <td className={`${styles.lastElement}`}><ButtonAction onClick={() => deleteItem(item.code)}>Delete</ButtonAction></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={`${styles.result}`}>
                            <p>Tax: ${Number(fullTax).toFixed(2)}</p>
                            <p>Total: ${(Number(cartTotal) + Number(fullTax)).toFixed(2)}</p>
                            <ButtonAction onClick={cancelOrder}>Cancel</ButtonAction>
                            <ButtonAction onClick={finishPurchase}>Finish</ButtonAction>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Home