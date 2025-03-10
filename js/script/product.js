const productName = document.getElementById("productName");
const amount = document.getElementById("amount");
const unitPrice = document.getElementById("unitPrice");
const category = document.getElementById("category");
const btnAddProduct = document.getElementById("add-product");

let categories = [];

function getCategories() {
    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"))
    } else {
        categories = []
    }
}

function populateCategories() {
    categories.forEach((c) => {
        category.innerHTML += `
            <option value="${c.name}" id="category">${c.name}</option>
        `;
    })
}

let products = [];

function getProducts() {
    if(localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"))
    } else {
        products = []
    }
}

let cartItems = [];

function getItem() {
    if (localStorage.getItem("items")) {
        cartItems = JSON.parse(localStorage.getItem("items"))
    } else {
        cartItems = []
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

    let i = 0
    for(let product of products) {
        table.innerHTML += `
        <table>
            <tr>
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${Number(product.amount)} units</td>
                <td>$${Number(product.unitPrice).toFixed(2)}</td>
                <td>${product.category}</td>
                <td class="last-elem"><button id="btn-table" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        </table>
        `;
        i++
    }
}

function validInputs() {
    if(!productName.value || !amount.value || !unitPrice.value || !category.value) {
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
    if(unitPrice.value <= 0) {
        return false
    }
    return true
}

function deleteProduct(index) {
    getItem()
    getProducts()

    const item = cartItems.findIndex((c) => c.name == products[index].name);

    if(item !== -1) {
        alert("Can't delete the product because it's in your cart!")
        return true;
    } else {
        products = products.filter((_, i) => i !== index);
        localStorage.setItem("products", JSON.stringify(products))
    }

    showProducts()
}

function clearInputs() {
    productName.value = ""
    amount.value = ""
    unitPrice.value = ""
    category.value = ""
}

function addProduct() {
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

    let existingItem = products.findIndex((product) => product.name === productName.value);
 
    if (existingItem !== -1) {
      alert("This product already exists");
      clearInputs();
      return false;
    }

    const product = {
        code: products.length > 0 ? products[products.length -1].code + 1 : 1,
        name: productName.value,
        amount: amount.value,
        category: category.value,
        unitPrice: unitPrice.value,
    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    getProducts();
    showProducts();
    clearInputs();
}

btnAddProduct.addEventListener("click", addProduct)

setInterval(() => {
    if (productName.type !== "text") {
        productName.type = "text";
    }
    if (amount.type !== "number") {
        amount.type = "number";
    }
    if (unitPrice.type !== "number") {
        unitPrice.type = "number";
    }
}, 500);

getProducts();
showProducts();
getCategories();
populateCategories();
clearInputs();
validProductName();
validInputs();