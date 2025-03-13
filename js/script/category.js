const categoryName = document.getElementById("categoryName");
const tax = document.getElementById("tax");
const table = document.getElementById("table");
const btnAddCategory = document.getElementById("add-category");

let categories = [];

const getCategories = async () => {
    const response = await fetch('http://localhost/categories', {
        method: 'GET'
    });

    categories = await response.json(categories);
}

let products = [];

const getProducts =  async () => {
    const response = await fetch('http://localhost/products', {
        method: 'GET'
    })

    products = await response.json(products);
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

    for (category of categories) {
        table.innerHTML += `
            <table>
                <tr>
                    <td>${category.code}</td>
                    <td>${category.name}</td>
                    <td>${Number(category.tax)}%</td>
                    <td class="last-elem"><button id="btn-table" onclick="deleteCategory(${category.code})">Delete</button></td>
                </tr>
            </table>
        `;
    }
}

function validInputs() {
    if (!categoryName.value || !tax.value) {
        return false
    }
    return true
}

function validCategoryName() {
    if (!/^[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(categoryName.value)) {
        return false
    }
    return true
}

function validTax() {
    if (tax.value <= 0 || tax.value > 100) {
        return false
    }
    return true
}

async function deleteCategory(id) {
    async function callApi(id) {
        await fetch('http://localhost/categories/' + id, {
            method: 'DELETE'
        });
    }

    await callApi(id);
    await getCategories();
    await getProducts();
    showCategories();

    // const product = products.findIndex((p) => p.category == categories[index].name);

    // if (product !== -1) {
    //     alert("The category you want to delete is being used!");
    //     return true
    // } else {
    // categories = categories.filter((_, i) => i !== index);
    // localStorage.setItem("categories", JSON.stringify(categories))
    // }
}

function clearInputs() {
    categoryName.value = ""
    tax.value = "";
}

const createCategory = async () => {

    if (!validInputs()) {
        return alert("All fields need to be filled!")
    };

    if (!validCategoryName()) {
        return alert("The field category name aceppts only letters")
    };

    if (!validTax()) {
        return alert("The number you want to put isn't valid!");
    };


    const category = {
        code: categories.length > 0 ? categories[categories.length - 1].code + 1 : 1,
        name: categoryName.value,
        tax: tax.value,
    }

    try {
        const response = await fetch('http://localhost/categories', {
            method: "POST",
            body: JSON.stringify(category),
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (e) {
        console.error("Erro ao adicionar categoria:", e);
    }

    // let existingItem = categories.findIndex((category) => category.name === categoryName.value);

    // if (existingItem !== -1) {
    //     alert("This category already exists");
    //     clearInputs();
    //     return false;

    // }

    // localStorage.setItem("categories", JSON.stringify(categories));

    await getCategories();
    showCategories();
    clearInputs();
}

btnAddCategory.addEventListener("click", createCategory);

// setInterval(() => {
//     if (categoryName.type !== "text") {
//         categoryName.type = "text";
//     }
//     if (tax.type !== "number") {
//         tax.type = "number";
//     }
// }, 500);

(async () => {
    await getCategories();
    showCategories();
    validCategoryName();
    validInputs();
})()