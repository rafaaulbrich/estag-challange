const productSelect = document.getElementById("productName");
const amount = document.getElementById("amount");
const tax = document.getElementById("tax");
const price = document.getElementById("price");
const taxPrice = document.getElementById("tax-price");
const total = document.getElementById("total");
const table = document.getElementById("table");
const btnAddItem = document.getElementById("add-item");
const btnCancel = document.getElementById("cancel");
const btnFinish = document.getElementById("finish");

let order = {};
let cartItems = [];
let products = [];
let categories = [];
let purchase = [];

const getCategories = async () => {
    try {
        const response = await fetch('http://localhost/categories', {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        categories = await response.json(categories);

    } catch (e) {
        console.error("Erro ao buscar categorias:", e);
    }
}

const getProducts = async () => {
    try {
        const response = await fetch('http://localhost/products', {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        products = await response.json(products);

    } catch (e) {
        console.error("Erro ao buscar produtos:", e);
    }
}

function populateProducts() {
    let selectedValue = productSelect.value;
    products.forEach((p) => {
        if (p.amount > 0) {
            productSelect.innerHTML += `<option value="${p.code}" id="product">${p.name}</option>`;
        }
        productSelect.value = selectedValue;
    })
}

const getActiveOrder = async () => {
    try {
        const response = await fetch('http://localhost/activeOrder', {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        order = await response.json(order);

    } catch (e) {
        console.error("Erro ao buscar pedidos ativos:", e);
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
        cartItems = await response.json();

    } catch (e) {
        console.error("Erro ao buscar pedidos pelo id:", e);
    }
}

const getOrderItems = async () => {
    try {
        const response = await fetch('http://localhost/orderItem', {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        cartItems = await response.json();

    } catch (e) {
        console.error("Erro ao buscar itens do pedido:", e);
    }
}

const getCurrentOrder = async () => {
    try {
        const response = await fetch('http://localhost/currentOrder', {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        cartItems = await response.json();

    } catch (e) {
        console.error("Erro ao buscar pedido atual:", e);
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
        cartItems = await response.json();

    } catch (e) {
        console.error("Erro ao buscar pedidos inativos:", e);
    }
}

const getItemDetails = async () => {
    let product = products.find((p) => p.code == productSelect.value);
    let category = categories.find((c) => c.code == product?.category_code);
    try {
        const response = await fetch('http://localhost/products', {
            method: "GET"
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        products = await response.json(product);
    } catch (e) {
        console.error("Erro ao buscar produtos para mostrar detalhes:", e);
    }

    try {
        const response = await fetch('http://localhost/categories', {
            method: "GET"
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        categories = await response.json(category);
    } catch (e) {
        console.error("Erro ao buscar categorias para mostrar detalhes:", e);
    }
    tax.value = `${category?.tax}`;
    price.value = `${product?.price}`;
}

async function showCartItems() {
    if (cartItems.length === 0) {
        table.innerHTML = "<p>Your cart is empty!</p>"
        return;
    }

    table.innerHTML = `
    <table>
        <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Amount</th>
            <th>Total</th>
            <th class="last-elem">Action</th>
        </tr>
    </table>
    `;

    for (let item of cartItems) {
        table.innerHTML += `
        <table>
            <tr>
                <td>${products.find((p) => p.code == item.product_code).name}</td>
                <td>$${Number(item.price).toFixed(2)}</td>
                <td>${Number(item.amount)} units</td>
                <td>$${(Number(item.price) * Number(item.amount)).toFixed(2)}</td>
                <td class="last-elem"><button id="btn-table" onclick="deleteItem(${item.code})">Delete</button></td>
            </tr >
        </table >
        `;
    }
    await showTotal();
}

function validInputs() {
    if (!productSelect.value || !amount.value || !tax.value || !price.value) {
        return false
    }
    return true
}

function validAmount() {
    if (amount.value <= 0) {
        return false
    }
    return true
}

function validAmountInteger() {
    if (amount.value % 1 === 0) {
        return amount.value
    }
}

async function deleteItem(id) {
    await fetch(`http://localhost/orderItem/${id}`, {
        method: 'DELETE'
    })

    await getActiveOrder();
    await getOrderItemsById(order.code);
    await showCartItems();
    await showTotal();
}

function clearInputs() {
    productSelect.value = ""
    amount.value = ""
    tax.value = ""
    price.value = ""
}

let cartTotal = 0;
let fullTax = 0;

async function showTotal() {
    cartTotal = 0;
    fullTax = 0;

    for (item of cartItems) {
        cartTotal = Number(cartTotal) + Number(item.price) * Number(item.amount);
        fullTax = Number(fullTax) + ((Number(item.tax) / 100) * Number(item.price) * Number(item.amount))
    }

    try {
        const response = await fetch('http://localhost/updateOrder', {
            method: "POST",
            body: JSON.stringify({
                tax: fullTax,
                total: cartTotal,
                id: order.code
            })
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (e) {
        console.error("Erro ao atualizar pedido:", e);
    }

    taxPrice.innerHTML = `Tax: $${fullTax.toFixed(2)} `;
    total.innerHTML = `Total: $${Number(cartTotal + fullTax).toFixed(2)} `;
}

async function cancelOrder() {
    if (cartItems.length === 0) {
        return alert("Your cart is empty!")
    } else {
        !confirm("Are you sure?");
        const response = await fetch('http://localhost/cancelOrder', {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    }

    await getOrderItems();
    await showCartItems();
    await showTotal();
}

function validAmountProduct() {
    let amountStock = products.find((p) => p.code == productSelect.value).amount;
    let findProduct = cartItems.findIndex((p) => p.product_code == productSelect.value);
    let amountCart = 0;

    if (findProduct !== -1) {
        amountCart = cartItems[findProduct].amount
    }

    if (Number(amountCart) + Number(amount.value) > Number(amountStock)) {
        return false
    }
    return true;
}

async function finishPurchase() {
    if (cartItems.length === 0) {
        return alert("Your cart is empty!");
    }

    window.location.href = './history.html';

    cartItems.forEach(async (item) => {
        let product = products.find((p) => p.code == item.product_code);

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
    await showCartItems();
}

async function createOrder() {
    const response = await fetch('http://localhost/orders', {
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    await showTotal();
    await showCartItems();
}

async function getOrCreateOrder() {
    await getActiveOrder()

    if (!order.code) {
        await createOrder();
        await getActiveOrder();
    }
}

async function addOrIncrement(item) {
    let existingItem = cartItems.find((val) => val.product_code == productSelect.value);

    if (existingItem) {
        try {
            const response = await fetch('http://localhost/orderItemIncrement', {
                method: "POST",
                body: JSON.stringify({
                    ...existingItem,
                    amount: Number(existingItem.amount) + Number(amount.value)
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

}

const createItem = async () => {
    await getItemDetails();
    await getProducts();

    const item = {
        order: order.code,
        product: productSelect.value,
        name: name.value,
        price: price.value,
        amount: amount.value,
        tax: tax.value,
    };

    if (!validInputs()) {
        return alert("All fields need to be filled!")
    };

    if (!validAmount()) {
        return alert("The number you want to put isn't valid!");
    };

    if (!validAmountProduct()) {
        return alert("The quantity you want isn't available in stock!")
    };

    if (!validAmountInteger()) {
        return alert("You can't add a quantity isn't integer");
    };

    await addOrIncrement(item);
    await getOrderItemsById(order.code);
    await showCartItems();
    await showTotal();
    clearInputs();
}

btnAddItem.addEventListener("click", createItem);
productSelect.addEventListener("change", getItemDetails);
btnCancel.addEventListener("click", cancelOrder);
btnFinish.addEventListener("click", finishPurchase);

// setInterval(() => {
//     if (amount.type !== "number") {
//         amount.type = "number";
//     }
//     if (tax.type !== "number") {
//         tax.type = "number";
//     }
//     if (price.type !== "number") {
//         price.type = "number";
//     }
// }, 500);

(async () => {
    await getProducts();
    await getCategories();
    await getOrCreateOrder();
    await getOrderItemsById(order.code);
    await showCartItems();
    await showTotal();
    populateProducts();
    clearInputs();
})()