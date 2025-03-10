// const table = document.getElementById("table");
const modal = document.getElementById("modal-container");
const purchaseDetails = document.getElementById("purchaseDetails");
const btnModal = document.getElementById("btnModal");
const btnClose = document.getElementById("close");

let products = [];

function showPurchases() {
    let history = JSON.parse(localStorage.getItem("history")) ?? []

    if (history.length === 0) {
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

    history.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.code}</td>
                <td>$${Number(item.tax).toFixed(2)}</td>
                <td>$${Number(item.total).toFixed(2)}</td>
                <td class="last-elem">
                    <button onclick="getPurchaseDetails(${index})" class="finish" id="btnModal">View</button>
                </td>
            </tr>
        `;
    });
}

function getPurchaseDetails(index) {
    let history = JSON.parse(localStorage.getItem("history")) ?? [];
    let purchase = history[index];

    purchaseDetails.innerHTML = `
    <div class="modal-header">
        <h1>Purchase #${purchase.code}</h1>
        <h5>Total: $${purchase.total}</h5>
        <h5>Tax: $${purchase.tax}</h5>
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

    const tableBody = document.getElementById("table-history-body")
    purchase.products.forEach((item) => {
        tableBody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>$${Number(item.price).toFixed(2)}</td>
            <td>${item.amount} units</td>
            <td class="last-elem">$${Number(item.total).toFixed(2)}</td>
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

btnModal.addEventListener("click", getPurchaseDetails)
btnClose.addEventListener("click", closeModal)

showPurchases();
closeModal();