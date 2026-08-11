const savedProducts =
    localStorage.getItem("products");

if (savedProducts) {

    const storedProducts =
        JSON.parse(savedProducts);

    products.splice(
        0,
        products.length,
        ...storedProducts
    );

}
function displayProducts() {

    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach((product, index) => {

        const row = document.createElement("tr");

       let status;
       let statusClass;

       if (product.stock <= product.minimumStock) {
       status = "Estoque baixo";
       statusClass = "status-low";
       } else if (product.stock <= product.minimumStock * 1.5) {
       status = "Atenção";
       statusClass = "status-warning";
       } else {
       status = "Normal";
       statusClass = "status-normal";
}

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
            <td>
            <span class="status ${statusClass}">
            ${status}
            </span>
            </td>
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
function createCharts() {

    const productNames = products.map(
        product => product.name
    );

    const stockValues = products.map(
        product => product.stock
    );


    const normalProducts = products.filter(
        product => product.stock > product.minimumStock
    ).length;


    const lowStockProducts = products.filter(
        product => product.stock <= product.minimumStock
    ).length;


    new Chart(
        document.getElementById("stock-chart"),
        {
            type: "bar",

            data: {
                labels: productNames,

                datasets: [
                    {
                        label: "Quantidade em estoque",
                        data: stockValues
                    }
                ]
            },

            options: {
                responsive: true,

                maintainAspectRatio: false
            }
        }
    );


    new Chart(
        document.getElementById("status-chart"),
        {
            type: "doughnut",

            data: {
                labels: [
                    "Normal",
                    "Estoque baixo"
                ],

                datasets: [
                    {
                        data: [
                            normalProducts,
                            lowStockProducts
                        ]
                    }
                ]
            },

            options: {
                responsive: true,

                maintainAspectRatio: false
            }
        }
    );

}


createCharts();
function updateDashboardCards() {

    const totalProducts =
        products.length;


    const totalStock =
        products.reduce(
            (total, product) =>
                total + product.stock,
            0
        );


    const lowStock =
        products.filter(
            product =>
                product.stock <= product.minimumStock
        ).length;


    const movements =
        JSON.parse(
            localStorage.getItem("movements")
        ) || [];


    document.getElementById(
        "total-products"
    ).textContent = totalProducts;


    document.getElementById(
        "total-stock"
    ).textContent = totalStock;


    document.getElementById(
        "low-stock"
    ).textContent = lowStock;


    document.getElementById(
        "total-movements"
    ).textContent = movements.length;

}


updateDashboardCards();