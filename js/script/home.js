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
        console.error("Erro ao buscar categorias:", e);
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
        console.error("Erro ao buscar categorias:", e);
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
        console.error("Erro ao buscar categorias:", e);
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
        console.error("Erro ao adicionar produto:", e);
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
        console.error("Erro ao adicionar produto:", e);
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
        showTotal();
    }
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
    async function callApi(id) {
        await fetch('http://localhost/orderItem' + id, {
            method: 'DELETE'
        })
    }
    // cartItems = cartItems.filter((_, i) => i !== index);

    // localStorage.setItem("items", JSON.stringify(cartItems))

    await callApi(id);
    await getOrders();
    await getItemDetails();
    await showCartItems();
    showTotal();
}

function clearInputs() {
    productSelect.value = ""
    amount.value = ""
    tax.value = ""
    price.value = ""
}

async function clearTable() {
    if (cartItems.length === 0) {
        return alert("Your cart is empty!")
    } else {
        alert("Are you sure?")
        table.innerHTML = ``;
    }

    await getOrders()
    await showCartItems();
    showTotal();
}

// async function validAmountProduct() {
//     let amountStock = products[products.findIndex((p) => p.code == productSelect.value)].amount;
//     let findProduct = cartItems[cartItems.findIndex((p) => p.name == productSelect.value)];
//     let amountCart = 0;

//     if (findProduct !== -1) {
//         amountCart = cartItems[findProduct].amount
//     }

//     if (Number(amountCart) + Number(amount.value) > Number(amountStock)) {
//         return false
//     }
//     return true;
// }

let cartTotal = 0;
let fullTax = 0;

function showTotal() {
    cartTotal = 0;
    fullTax = 0;
    for (item of cartItems) {
        cartTotal = Number(cartTotal) + Number(item.price) * Number(item.amount);
        fullTax = Number(fullTax) + ((Number(item.tax) / 100) * Number(item.price) * Number(item.amount))
    }

    taxPrice.innerHTML = `Tax: $${fullTax.toFixed(2)} `;
    total.innerHTML = `Total: $${Number(cartTotal + fullTax).toFixed(2)} `;
}

async function finishPurchase() {
    await getOrders();

    if (cartItems.length === 0) {
        return alert("Your cart is empty!");
    }
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let purchase = {
        code: history.length > 0 ? history[history.length - 1].code + 1 : 1,
        tax: Number(fullTax).toFixed(2),
        total: (Number(fullTax) + Number(cartTotal)).toFixed(2),
        products: [...cartItems]
    };

    history.push(purchase);
    localStorage.setItem("history", JSON.stringify(history));

    let products = JSON.parse(localStorage.getItem("products")) || [];
    cartItems.forEach((item) => {
        let productIndex = products.findIndex((p) => p.name == item.name);

        if (products[productIndex].amount !== -1) {
            products[productIndex].amount -= item.amount;

            if (products[productIndex].amount < 0) {
                products[productIndex].amount = 0
            }
        }
    }
    )
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("items", JSON.stringify([]));

    window.location.href = './history.html'
}

async function createOrder() {
    const response = await fetch('http://localhost/order', {
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
}

async function getOrCreateOrder() {
    await getActiveOrder()

    if(!order.code) {
        await createOrder();
        await getActiveOrder();
    }
}

const createItem = async () => {
    await getItemDetails();
    await getProducts();

    const item = {
        order: order.code,
        product: productSelect.value,
        price: price.value,
        amount: amount.value,
        tax: tax.value,
    };
    
    let existingItem = cartItems.findIndex((item) => item.product == productSelect.value);

    if (existingItem !== -1) {
        cartItems[existingItem].amount = Number(cartItems[existingItem].amount) + Number(amount.value);
        cartItems[existingItem].total = Number(cartItems[existingItem].amount) * Number(cartItems[existingItem].price);
    }

    if (!validInputs()) {
        return alert("All fields need to be filled!")
    };

    // if (!validAmountProduct()) {
    //     return alert("The quantity you want isn't available in stock!")
    // };

    if (!validAmount()) {
        return alert("The number you want to put isn't valid!");
    }

    if (!validAmountInteger()) {
        return alert("You can't add a quantity isn't integer");
    }

    try {
        const response = await fetch('http://localhost/orderItem', {
            method: "POST",
            body: JSON.stringify(item)
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (e) {
        console.error("Erro ao adicionar produto:", e);
    }

    await getOrderItemsById(order.code);
    await showCartItems();
    clearInputs();
    showTotal();

    //     getItem();
    //     getDetails();
    //     showCartItems();
    //     clearInputs();
    //     showTotal();
    //     return;
    // }
}

btnAddItem.addEventListener("click", createItem);
productSelect.addEventListener("change", getItemDetails);
btnCancel.addEventListener("click", clearTable);
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
    showTotal();
    populateProducts();
    clearInputs();
})()