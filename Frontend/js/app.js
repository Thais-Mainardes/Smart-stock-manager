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
            <a href="products.html?code=${product.code}">
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

    function createMovementChart() {

    const movements =
        JSON.parse(
            localStorage.getItem("movements")
        ) || [];


    const dates = [
        ...new Set(
            movements.map(
                movement => movement.date
            )
        )
    ];


    const entries = dates.map(date => {

        return movements
            .filter(
                movement =>
                    movement.date === date &&
                    movement.type === "Entrada"
            )
            .reduce(
                (total, movement) =>
                    total + movement.quantity,
                0
            );

    });


    const exits = dates.map(date => {

        return movements
            .filter(
                movement =>
                    movement.date === date &&
                    movement.type === "Saída"
            )
            .reduce(
                (total, movement) =>
                    total + movement.quantity,
                0
            );

    });


    new Chart(
        document.getElementById("movement-chart"),
        {

            type: "line",

            data: {

                labels: dates,

                datasets: [

                    {
                        label: "Entradas",
                        data: entries,
                        tension: 0.3
                    },

                    {
                        label: "Saídas",
                        data: exits,
                        tension: 0.3
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


createMovementChart();

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

function analyzeStock() {

    const analysisContainer =
        document.getElementById("stock-analysis");

    const lowStockProducts =
        products.filter(
            product =>
                product.stock <= product.minimumStock
        );


    const warningProducts =
        products.filter(
            product =>
                product.stock > product.minimumStock &&
                product.stock <= product.minimumStock * 1.5
        );


    let html = "";


    if (lowStockProducts.length > 0) {

        html += `
            <div class="analysis-alert low">

                <strong>
                    🔴 Estoque baixo
                </strong>

                <ul>

                    ${lowStockProducts.map(product => `
                        <li>
                            ${product.name}
                            — estoque atual:
                            ${product.stock}
                            — mínimo:
                            ${product.minimumStock}
                        </li>
                    `).join("")}

                </ul>

            </div>
        `;

    }


    if (warningProducts.length > 0) {

        html += `
            <div class="analysis-alert warning">

                <strong>
                    🟠 Atenção
                </strong>

                <ul>

                    ${warningProducts.map(product => `
                        <li>
                            ${product.name}
                            está próximo do estoque mínimo.
                        </li>
                    `).join("")}

                </ul>

            </div>
        `;

    }


    if (
        lowStockProducts.length === 0 &&
        warningProducts.length === 0
    ) {

        html = `
            <div class="analysis-alert normal">

                <strong>
                    🟢 Estoque saudável
                </strong>

                <p>
                    Nenhum produto está abaixo
                    ou próximo do estoque mínimo.
                </p>

            </div>
        `;

    }


    analysisContainer.innerHTML = html;

}


analyzeStock();