
function displayProducts() {

    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach((product, index) => {

        const row = document.createElement("tr");

        const status = product.stock <= product.minimumStock
            ? "Estoque baixo"
            : "Normal";

        row.innerHTML = `
            <td>${product.code}</td>
            <td>
            <a href="product.html?code=${product.code}">
            ${product.name}
            </a>
            </td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.minimumStock}</td>
            <td>${status}</td>
            <td>
                <button onclick="editProduct(${index})">
                    Editar
                </button>

                <button
                    onclick="deleteProduct(${index})"
                    class="delete-button"
                >
                    Excluir
                </button>
            </td>
        `;

        productList.appendChild(row);
    });
}

function updateDashboard() {

    const totalProducts = products.length;

    const lowStockProducts = products.filter(
        product => product.stock <= product.minimumStock
    ).length;

    const totalMovements = 0;

    document.getElementById("total-products").textContent = totalProducts;

    document.getElementById("low-stock").textContent = lowStockProducts;

    document.getElementById("total-movements").textContent = totalMovements;
}

displayProducts();

updateDashboard();
const addProductButton = document.getElementById("add-product");

const productModal = document.getElementById("product-modal");

const closeModalButton = document.getElementById("close-modal");

const productForm = document.getElementById("product-form");


addProductButton.addEventListener("click", () => {

    productModal.style.display = "flex";

});


closeModalButton.addEventListener("click", () => {

    productModal.style.display = "none";

});


productForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const newProduct = {

        code: document.getElementById("product-code").value,

        name: document.getElementById("product-name").value,

        category: document.getElementById("product-category").value,

        stock: Number(
            document.getElementById("product-stock").value
        ),

        minimumStock: Number(
            document.getElementById("product-minimum").value
        )

    };


    products.push(newProduct);


    displayProducts();

    updateDashboard();


    productForm.reset();

    productModal.style.display = "none";

});
function editProduct(index) {

    const product = products[index];

    const newName = prompt(
        "Nome do produto:",
        product.name
    );

    if (newName === null) {
        return;
    }

    const newStock = prompt(
        "Estoque atual:",
        product.stock
    );

    if (newStock === null) {
        return;
    }

    const newMinimumStock = prompt(
        "Estoque mínimo:",
        product.minimumStock
    );

    if (newMinimumStock === null) {
        return;
    }

    product.name = newName;

    product.stock = Number(newStock);

    product.minimumStock = Number(newMinimumStock);

    displayProducts();

    updateDashboard();
}


function deleteProduct(index) {

    const product = products[index];

    const confirmed = confirm(
        `Deseja realmente excluir o produto "${product.name}"?`
    );

    if (!confirmed) {
        return;
    }

    products.splice(index, 1);

    displayProducts();

    updateDashboard();
}