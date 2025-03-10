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

let cartItems = [];
let products = [];
let categories = [];
let purchase = [];

function getCategories() {
    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"))
    } else {
        categories = []
    }
}

function getProducts() {
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"))
    } else {
        products = []
    }
}

function populateProducts() {
    products.forEach((p) => {
        if (p.amount > 0) {
            productSelect.innerHTML += `<option value="${p.name}" id="product">${p.name}</option>`;
        }
    })
}

function getItem() {
    if (localStorage.getItem("items")) {
        cartItems = JSON.parse(localStorage.getItem("items"))
    } else {
        cartItems = []
    }
}

function getDetails() {
    if (!productSelect.value) {
        return
    }
    const product = products[products.findIndex((p) => p.name == productSelect.value)];
    const productTax = categories[categories.findIndex((c) => c.name == product.category)].tax;
    tax.value = `${productTax}`;
    price.value = `${product.unitPrice}`;
}

function showCartItems() {
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

    let i = 0
    for (let item of cartItems) {
        table.innerHTML += `
        <table>
            <tr>
                <td>${item.name}</td>
                <td>$${Number(item.price).toFixed(2)}</td>
                <td>${Number(item.amount)} units</td>
                <td>$${Number(item.total).toFixed(2)}</td>
                <td class="last-elem"><button id="btn-table" onclick="deleteItem(${i})">Delete</button></td>
            </tr >
        </table >
        `;
        i++
    }
}

function validInputs() {
    if (!productSelect.value || !amount.value || !tax.value || !price.value) {
        return false
    }
    return true
}

function validAmount() {
    if(amount.value <= 0) {
        return false
    }
    return true
}

function validAmountInteger() {
    if(amount.value % 1 === 0) {
        return amount.value
    }
}

function deleteItem(index) {
    cartItems = cartItems.filter((_, i) => i !== index);

    localStorage.setItem("items", JSON.stringify(cartItems))

    getItem()
    getDetails()
    showCartItems()
    showTotal()
}

function clearInputs() {
    productSelect.value = ""
    amount.value = ""
    tax.value = ""
    price.value = ""
}

function clearTable() {
    if(cartItems.length === 0) {
        return alert("Your cart is empty!")
    } else {
        alert("Are you sure?")
        localStorage.setItem("items", JSON.stringify([]))
    }

    getItem()
    showCartItems();
    showTotal();
}

function validAmountProduct() {
    let amountStock = products[products.findIndex((p) => p.name == productSelect.value)].amount;
    let findProduct = cartItems.findIndex((p) => p.name == productSelect.value);
    let amountCart = 0;

    if (findProduct !== -1) {
        amountCart = cartItems[findProduct].amount
    }

    if (Number(amountCart) + Number(amount.value) > Number(amountStock)) {
        return false
    }
    return true;
}

let cartTotal = 0;
let fullTax = 0;

function showTotal() {
    cartTotal = 0;
    fullTax = 0;
    for (item of cartItems) {
        cartTotal = Number(cartTotal) + Number(item.total)
        fullTax = Number(fullTax) + ((Number(item.tax) / 100) * Number(item.price) * Number(item.amount))
    }

    taxPrice.innerHTML = `Tax: $${ fullTax.toFixed(2) } `;
    total.innerHTML = `Total: $${ Number(cartTotal + fullTax).toFixed(2) } `;
}

function finishPurchase() {
    if (cartItems.length === 0) {
        return alert("Your cart is empty!");
    }
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let purchase = {
        code: history.length > 0 ? history[history.length -1].code + 1 : 1,
        tax: Number(fullTax).toFixed(2),
        total: (Number(fullTax) + Number(cartTotal)).toFixed(2),
        products: [...cartItems]
    };

    history.push(purchase);
    localStorage.setItem("history", JSON.stringify(history));

    let products = JSON.parse(localStorage.getItem("products")) || [];
    cartItems.forEach((item) => {
        let productIndex = products.findIndex((p) => p.name == item.name);

        if(products[productIndex].amount !== -1) {
            products[productIndex].amount -= item.amount;

            if(products[productIndex].amount < 0) {
                products[productIndex].amount = 0
            }
        }
    }
)
    localStorage.setItem("products", JSON.stringify(products))
    localStorage.setItem("items", JSON.stringify([]));

    window.location.href = './history.html'
}

function addItem() {
    if (!validInputs()) {
        return alert("All fields need to be filled!")
    };

    if (!validAmountProduct()) {
        return alert("The quantity you want isn't available in stock!")
    };

    if(!validAmount()) {
        return alert("The number you want to put isn't valid!");
    }

    if(!validAmountInteger()) {
        return alert("You can't add a quantity isn't integer");
    } 

    let existingItem = cartItems.findIndex((item) => item.name == productSelect.value);

    if (existingItem !== -1) {
        cartItems[existingItem].amount = Number(cartItems[existingItem].amount) + Number(amount.value);
        cartItems[existingItem].total = Number(cartItems[existingItem].amount) * Number(cartItems[existingItem].price);
        localStorage.setItem("items", JSON.stringify(cartItems))

        getItem();
        getDetails();
        showCartItems();
        clearInputs();
        showTotal();
        return;
    }

    const item = {
        name: productSelect.value,
        price: price.value,
        amount: amount.value,
        tax: tax.value,
        total: (price.value * amount.value)
    }

    cartItems.push(item);

    localStorage.setItem("items", JSON.stringify(cartItems))

    getItem();
    getDetails();
    showCartItems();
    clearInputs();
    showTotal();
}

btnAddItem.addEventListener("click", addItem)
productSelect.addEventListener("change", getDetails)
btnCancel.addEventListener("click", clearTable)
btnFinish.addEventListener("click", finishPurchase)

setInterval(() => {
    if (amount.type !== "number") {
        amount.type = "number";
    }
    if (tax.type !== "number") {
        tax.type = "number";
    }
    if (price.type !== "number") {
        price.type = "number";
    }
}, 500);

getItem();
getProducts();
showCartItems();
getCategories();
populateProducts();
clearInputs();
showTotal();