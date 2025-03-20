const table = document.getElementById("table");
const modal = document.getElementById("modal-container");
const purchaseDetails = document.getElementById("purchaseDetails");
const btnClose = document.getElementById("close");

let products = [];
let cartItems = [];

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

async function showPurchases() {
    if (cartItems.length === 0) {
        table.innerHTML = "<p>No purchase history avaible</p>"
        return; 

    }

    table.innerHTML = `
    <table>
        <tr>
            <th>Code</th>
            <th>Tax</th>
            <th>Total</th>
            <th class="last-elem">Action</th>
        </tr>
    </table>
    `;
    cartItems.forEach((item) => {
        table.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>$${Number(item.tax).toFixed(2)}</td>
                <td>$${Number(item.total).toFixed(2)}</td>
                <td class="last-elem">
                    <button onclick="getPurchaseDetails(${item.code}, ${item.tax}, ${item.total})" class="finish" id="btnModal">View</button>
                </td>
            </tr>
        `;
    });
}

async function getPurchaseDetails(id, tax, total) {
    await getOrderItemsById(id);

    cartItems.forEach((item) => {
        purchaseDetails.innerHTML = `
        <div class="modal-header">
            <h1>Purchase #${id}</h1>
            <h5>Total: $${Number(total).toFixed(2)}</h5>
            <h5>Tax: $${Number(tax).toFixed(2)}</h5>
            <button onclick="closeModal()" class="close" id="close">X</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Unit price</th>
                    <th>Amount</th>
                    <th class="last-elem">Total</th>
                    </tr>
            </thead>
            <tbody id="table-history-body">
            </tbody>
        </table>
        `;

    })

    const tableBody = document.getElementById("table-history-body")
    cartItems.forEach((item) => {
        tableBody.innerHTML += `
        <tr>
            <td>${products.find((p) => p.code == item.product_code).name}</td>
            <td>$${Number(item.price).toFixed(2)}</td>
            <td>${item.amount} units</td>
            <td class="last-elem">$${Number(Number(item.price).toFixed(2) * Number(item.amount))}</td>
        </tr>
        `;
    })

    openModal();
}

function openModal() {
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none'
}

btnClose.addEventListener("click", closeModal);

(async () => {
    await getAllOrdersInactive();
    await showPurchases();
    await getProducts();
    closeModal();
})()