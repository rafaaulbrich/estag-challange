const productName = document.getElementById("productName");
const amount = document.getElementById("amount");
const price = document.getElementById("price");
const category = document.getElementById("category");
const btnAddProduct = document.getElementById("add-product");

let categories = [];

const getCategories = async () => {
    const response = await fetch('http://localhost/categories', {
        method: 'GET'
    });

    categories = await response.json(categories);
}

function populateCategories() {
    let selectedValue = category.value;
    categories.forEach((c) => {
        category.innerHTML += `
            <option value="${c.code}" id="category">${c.name}</option>
        `;
    category.value = selectedValue;
    })
}

let products = [];

const getProducts =  async () => {
    const response = await fetch('http://localhost/products', {
        method: 'GET'
    })

    products = await response.json(products);
}

let order = {};

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

let cartItems = [];

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
        console.error("Erro ao buscar itens da compra pelo id:", e);
    }
}

function showProducts() {
    table.innerHTML = `
    <table>
    <tr>
        <th>Code</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Unit price</th>
        <th>Category</th>
        <th class="last-elem">Action</th>
    </tr>
    </table>
    `;

    for(let product of products) {
        table.innerHTML += `
        <table>
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${Number(product.amount)} units</td>
                <td>$${Number(product.price).toFixed(2)}</td>
                <td>${categories.find((c) => c.code === product.category_code)?.name}</td>
                <td class="last-elem"><button id="btn-table" onclick="deleteProduct(${product.code})">Delete</button></td>
            </tr>
        </table>
        `;
    }
}

function validInputs() {
    if(!productName.value || !amount.value || !price.value || !category.value) {
        return false
    }
    return true
}

function validProductName() {
    if(!/^[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(productName.value)) {
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

function validPrice() {
    if(price.value <= 0) {
        return false
    }
    return true
}

async function deleteProduct(id) {
    let existingItem = cartItems.find((order) => order.product_code == id);
    
    if(existingItem) {
        return alert("Can't delete the product because it's in your cart!");
    } else {
        const response = await fetch(`http://localhost/products/${id}`, {
            method: "DELETE",
        })
    
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    }

    await getProducts();
    await getCategories();
    showProducts();
}

function clearInputs() {
    productName.value = ""
    amount.value = ""
    price.value = ""
    category.value = ""
}

async function createProduct() {

    if(!validInputs()) {
        return alert("All fields need to be filled!")
    };

    if(!validProductName()) {
        return alert("The field product name aceppts only letters")
    };

    if(!validAmount()) {
        return alert("The number you want to put isn't valid!");
    };

    if(!validAmountInteger()) {
        return alert("You can't add a quantity isn't integer");
    } 

    if(!validPrice()) {
        return alert("The number you want to put isn't valid!");
    };
    
    const product = {
        code: products.length > 0 ? products[products.length -1].code + 1 : 1,
        name: productName.value,
        amount: amount.value,
        price: price.value,
        category: category.value,
    };
    
    try {
        const response = await fetch('http://localhost/products', {
            method: "POST",
            body: JSON.stringify(product)
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
    } catch (e) {
        console.error("Erro ao adicionar produto:", e);
    }
    
    // let existingItem = products.findIndex((product) => product.name === productName.value);
 
    // if (existingItem !== -1) {
    //   alert("This product already exists");
    //   clearInputs();
    //   return false;
    // }

    await getProducts();
    showProducts();
    clearInputs();
}

btnAddProduct.addEventListener("click", createProduct);

// setInterval(() => {
//     if (productName.type !== "text") {
//         productName.type = "text";
//     }
//     if (amount.type !== "number") {
//         amount.type = "number";
//     }
//     if (price.type !== "number") {
//         price.type = "number";
//     }
// }, 500);

(async () => {
    await getProducts();
    await getCategories();
    await getActiveOrder();
    await getOrderItemsById(order.code);
    populateCategories();
    showProducts();
    clearInputs();
    validProductName();
    validInputs();
})()