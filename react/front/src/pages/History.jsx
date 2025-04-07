import { useEffect, useState } from "react";
import useProduct from '../hooks/useProduct';
import useOrder from "../hooks/useOrder";
import useOrderItem from "../hooks/useOrderItem";

import ButtonAction from "../components/button/buttonAction/ButtonAction";
import Modal from '../components/modal/Modal';
import styles from './History.module.css';

const History = () => {
    const { products, getProducts } = useProduct();
    const { getAllOrdersInactive, inactiveOrder } = useOrder();
    const { cartItems, getOrderItemsById } = useOrderItem();

    const [modalOpen, setModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});

    useEffect(() => {
        getProducts();
        getAllOrdersInactive();
    }, [])

    const handleModalOpen = async (order) => {
        setCurrentOrder(order);
        await getOrderItemsById(order.code);
        setModalOpen(true);
    }

    return (
        <>
            {inactiveOrder.length === 0 ? (
                <p className={`${styles.table}`}>No purchase history avaible</p>
            ) : (
                <div>
                    <table className={`${styles.table}`}>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Tax</th>
                                <th>Total</th>
                                <th className={`${styles.lastElement}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inactiveOrder.map((item) => {
                                return (
                                    <tr key={item.code}>
                                        <td className={`${styles.td}`}>{item.code}</td>
                                        <td className={`${styles.td}`}>${Number(item.tax).toFixed(2)}</td>
                                        <td className={`${styles.td}`}>${Number(item.total).toFixed(2)}</td>
                                        <td className={`${styles.lastElement}`}>
                                            <ButtonAction onClick={() => handleModalOpen(item)}>View</ButtonAction>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                        <div className={`${styles.modalHeader}`}>
                            <h1>Purchase #{currentOrder?.code}</h1>
                            <h5>Total: ${(Number(currentOrder?.total) + Number(currentOrder.tax)).toFixed(2)}</h5>
                            <h5>Tax: ${Number(currentOrder?.tax)}</h5>
                        </div>
                        <table className={`${styles.tableModal}`}>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Unit price</th>
                                    <th>Amount</th>
                                    <th className={`${styles.lastElement}`}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.code}>
                                        <td>{products.find((p) => p.code == item.product_code).name}</td>
                                        <td>${Number(item.price).toFixed(2)}</td>
                                        <td>{item.amount} units</td>
                                        <td className={`${styles.lastElement}`}>${Number(Number(item.price) * Number(item.amount)).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal>
                </div>
            )}
        </>
    )
}

export default History