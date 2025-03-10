const categoryName = document.getElementById("categoryName");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const btnAddCategory = document.getElementById("add-category");

let categories = [];

function getCategories() {
    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"))
    } else {
        categories = []
    }
}

let products = [];

function getProducts() {
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"))
    } else {
        products = []
    }
}

function showCategories() {
    table.innerHTML = `
    <table>
    <tr>
        <th>Code</th>
        <th>Category</th>
        <th>Tax</th>
        <th class="last-elem">Action</th>
    </tr>
    </table>
    `;

    let i = 0
    for (category of categories) {
        table.innerHTML += `
            <table>
                <tr>
                    <td>${category.code}</td>
                    <td>${category.name}</td>
                    <td>${Number(category.tax).toFixed(0)}%</td>
                    <td class="last-elem"><button id="btn-table" onclick="deleteCategory(${i})">Delete</button></td>
                </tr>
            </table>
        `;
        i++
    }
}

function validInputs() {
    if (!categoryName.value || !tax.value) {
        return false
    }
    return true
}

function validCategoryName() {
    if(!/^[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(categoryName.value)) {
        return false
    }
    return true
}

function validTax() {
    if(tax.value <= 0 || tax.value > 100) {
        return false
    }
    return true
}

function deleteCategory(index) {
    getProducts()
    getCategories()

    const product = products.findIndex((p) => p.category == categories[index].name);
    
    if(product !== -1) {
        alert("The category you want to delete is been used!");
        return true
    } else {
        categories = categories.filter((_, i) => i !== index);
        localStorage.setItem("categories", JSON.stringify(categories))
    }

    showCategories()
}

function clearInputs() {
    categoryName.value = ""
    tax.value = "";
}

function addCategory() {
    if (!validInputs()) {
        return alert("All fields need to be filled!")
    };

    if(!validCategoryName()) {
        return alert("The field category name aceppts only letters")
    };

    if(!validTax()) {
        return alert("The number you want to put isn't valid!");
    };

    let existingItem = categories.findIndex((category) => category.name === categoryName.value);
 
    if (existingItem !== -1) {
      alert("This category already exists");
      clearInputs();
      return false;
    }

    const category = {
        code: categories.length > 0 ? categories[categories.length -1].code + 1 : 1,
        name: categoryName.value,
        tax: tax.value,
    };

    categories.push(category);

    localStorage.setItem("categories", JSON.stringify(categories));

    getCategories();
    showCategories();
    clearInputs();
}

btnAddCategory.addEventListener("click", addCategory)

setInterval(() => {
    if (categoryName.type !== "text") {
        categoryName.type = "text";
    }
    if (tax.type !== "number") {
        tax.type = "number";
    }
}, 500);

getCategories();
showCategories();
validCategoryName();
validInputs();