// =========================================
// SMART STOCK MANAGER
// APP.JS
// =========================================


// =========================================
// CARREGAMENTO DOS PRODUTOS
// =========================================

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


// =========================================
// PERSISTÊNCIA
// =========================================

function saveProducts() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// =========================================
// STATUS DO PRODUTO
// =========================================

function getProductStatus(product) {

    if (
        product.stock <=
        product.minimumStock
    ) {

        return {
            label: "Estoque baixo",
            className: "status-low"
        };

    }


    if (
        product.stock <=
        product.minimumStock * 1.5
    ) {

        return {
            label: "Atenção",
            className: "status-warning"
        };

    }


    return {
        label: "Normal",
        className: "status-normal"
    };

}


// =========================================
// LISTAGEM DE PRODUTOS
// =========================================

function displayProducts() {

    const productList =
        document.getElementById("product-list");


    if (!productList) {
        return;
    }


    productList.innerHTML = "";


    products.forEach(
        (product, index) => {

            const row =
                document.createElement("tr");


            const status =
                getProductStatus(product);


            row.innerHTML = `

                <td>
                    ${product.code}
                </td>

                <td>

                    <a
                        href="product.html?code=${product.code}"
                        class="product-link"
                    >
                        ${product.name}
                    </a>

                </td>

                <td>
                    ${product.category}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>
                    ${product.minimumStock}
                </td>

                <td>

                    <span
                        class="status ${status.className}"
                    >
                        ${status.label}
                    </span>

                </td>

                <td>

                    <div class="table-actions">

                        <button
                            onclick="editProduct(${index})"
                            class="edit-button"
                        >
                            Editar
                        </button>

                        <button
                            onclick="deleteProduct(${index})"
                            class="delete-button"
                        >
                            Excluir
                        </button>

                    </div>

                </td>

            `;


            productList.appendChild(row);

        }
    );

}


// =========================================
// DASHBOARD
// =========================================

function updateDashboard() {

    const totalProducts =
        products.length;


    const totalStock =
        products.reduce(
            (total, product) =>
                total + Number(product.stock),
            0
        );


    const lowStock =
        products.filter(
            product =>
                product.stock <=
                product.minimumStock
        ).length;


    const movements =
        JSON.parse(
            localStorage.getItem("movements")
        ) || [];


    const totalProductsElement =
        document.getElementById("total-products");


    const totalStockElement =
        document.getElementById("total-stock");


    const lowStockElement =
        document.getElementById("low-stock");


    const totalMovementsElement =
        document.getElementById("total-movements");


    if (totalProductsElement) {

        totalProductsElement.textContent =
            totalProducts;

    }


    if (totalStockElement) {

        totalStockElement.textContent =
            totalStock;

    }


    if (lowStockElement) {

        lowStockElement.textContent =
            lowStock;

    }


    if (totalMovementsElement) {

        totalMovementsElement.textContent =
            movements.length;

    }

}


// =========================================
// GRÁFICO DE ESTOQUE
// =========================================

let stockChart = null;

function updateStockChart() {

    const canvas =
        document.getElementById("stock-chart");


    if (!canvas) {
        return;
    }


    if (
        typeof Chart === "undefined"
    ) {

        console.error(
            "Chart.js não foi carregado."
        );

        return;

    }


    const labels =
        products.map(
            product => product.name
        );


    const data =
        products.map(
            product => Number(product.stock)
        );


    if (stockChart) {
        stockChart.destroy();
    }


    stockChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: "Estoque atual",
                        data: data,

                        backgroundColor:
                            "#2563eb",

                        borderRadius: 8

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0
                        }

                    }

                },

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });

}


// =========================================
// GRÁFICO DE STATUS
// =========================================

let statusChart = null;

function updateStatusChart() {

    const canvas =
        document.getElementById("status-chart");


    if (!canvas) {
        return;
    }


    if (
        typeof Chart === "undefined"
    ) {
        return;
    }


    let normal = 0;
    let warning = 0;
    let low = 0;


    products.forEach(product => {

        const status =
            getProductStatus(product);


        if (
            status.className ===
            "status-normal"
        ) {

            normal++;

        } else if (
            status.className ===
            "status-warning"
        ) {

            warning++;

        } else {

            low++;

        }

    });


    if (statusChart) {
        statusChart.destroy();
    }


    statusChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Normal",
                    "Atenção",
                    "Estoque baixo"
                ],

                datasets: [

                    {

                        data: [
                            normal,
                            warning,
                            low
                        ],

                        backgroundColor: [
                            "#22c55e",
                            "#f59e0b",
                            "#ef4444"
                        ],

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%",

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        });

}


// =========================================
// GRÁFICO DE ENTRADAS X SAÍDAS
// =========================================

let movementChart = null;

function updateMovementChart() {

    const canvas =
        document.getElementById("movement-chart");


    if (!canvas) {
        return;
    }


    if (
        typeof Chart === "undefined"
    ) {
        return;
    }


    const movements =
        JSON.parse(
            localStorage.getItem("movements")
        ) || [];


    let entries = 0;
    let exits = 0;


    movements.forEach(movement => {

        if (
            movement.type === "Entrada"
        ) {

            entries +=
                Number(movement.quantity);

        }


        if (
            movement.type === "Saída"
        ) {

            exits +=
                Number(movement.quantity);

        }

    });


    if (movementChart) {
        movementChart.destroy();
    }


    movementChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: [
                    "Entradas",
                    "Saídas"
                ],

                datasets: [

                    {

                        label: "Quantidade",

                        data: [
                            entries,
                            exits
                        ],

                        backgroundColor: [
                            "#22c55e",
                            "#ef4444"
                        ],

                        borderRadius: 8

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0
                        }

                    }

                },

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });

}


// =========================================
// ATUALIZAR GRÁFICOS
// =========================================

function updateCharts() {

    updateStockChart();

    updateStatusChart();

    updateMovementChart();

}


// =========================================
// CADASTRO DE PRODUTO
// =========================================

const addProductButton =
    document.getElementById("add-product");


const productModal =
    document.getElementById("product-modal");


const closeModalButton =
    document.getElementById("close-modal");


const productForm =
    document.getElementById("product-form");


if (
    addProductButton &&
    productModal
) {

    addProductButton.addEventListener(
        "click",
        () => {

            productModal.style.display =
                "flex";

        }
    );

}


if (
    closeModalButton &&
    productModal
) {

    closeModalButton.addEventListener(
        "click",
        () => {

            productModal.style.display =
                "none";

        }
    );

}


if (productModal) {

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                productModal
            ) {

                productModal.style.display =
                    "none";

            }

        }
    );

}


if (productForm) {

    productForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const code =
                document.getElementById(
                    "product-code"
                ).value.trim();


            const name =
                document.getElementById(
                    "product-name"
                ).value.trim();


            const category =
                document.getElementById(
                    "product-category"
                ).value.trim();


            const stock =
                Number(
                    document.getElementById(
                        "product-stock"
                    ).value
                );


            const minimumStock =
                Number(
                    document.getElementById(
                        "product-minimum"
                    ).value
                );


            if (
                !code ||
                !name ||
                !category
            ) {

                alert(
                    "Preencha todos os campos obrigatórios."
                );

                return;

            }


            const existingProduct =
                products.find(
                    product =>
                        product.code === code
                );


            if (existingProduct) {

                alert(
                    "Já existe um produto com este código."
                );

                return;

            }


            const newProduct = {

                code: code,

                name: name,

                category: category,

                stock: stock,

                minimumStock: minimumStock

            };


            products.push(newProduct);


            saveProducts();

            displayProducts();

            updateDashboard();

            updateCharts();

            analyzeStock();


            productForm.reset();


            productModal.style.display =
                "none";

        }
    );

}


// =========================================
// EDIÇÃO
// =========================================

function editProduct(index) {

    const product =
        products[index];


    if (!product) {
        return;
    }


    const newName =
        prompt(
            "Nome do produto:",
            product.name
        );


    if (newName === null) {
        return;
    }


    const newStock =
        prompt(
            "Estoque atual:",
            product.stock
        );


    if (newStock === null) {
        return;
    }


    const newMinimumStock =
        prompt(
            "Estoque mínimo:",
            product.minimumStock
        );


    if (newMinimumStock === null) {
        return;
    }


    product.name =
        newName.trim();


    product.stock =
        Number(newStock);


    product.minimumStock =
        Number(newMinimumStock);


    saveProducts();

    displayProducts();

    updateDashboard();

    updateCharts();

    analyzeStock();

}


// =========================================
// EXCLUSÃO
// =========================================

function deleteProduct(index) {

    const product =
        products[index];


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `Deseja realmente excluir o produto "${product.name}"?`
        );


    if (!confirmed) {
        return;
    }


    products.splice(
        index,
        1
    );


    saveProducts();

    displayProducts();

    updateDashboard();

    updateCharts();

    analyzeStock();

}


// =========================================
// ANÁLISE DE ESTOQUE
// =========================================

function analyzeStock() {

    const analysisContainer =
        document.getElementById(
            "stock-analysis"
        );


    if (!analysisContainer) {
        return;
    }


    const lowStockProducts =
        products.filter(
            product =>
                product.stock <=
                product.minimumStock
        );


    const warningProducts =
        products.filter(
            product =>
                product.stock >
                    product.minimumStock &&
                product.stock <=
                    product.minimumStock * 1.5
        );


    let html = "";


    if (
        lowStockProducts.length > 0
    ) {

        html += `

            <div class="analysis-alert low">

                <strong>
                    🔴 Estoque baixo
                </strong>

                <ul>

                    ${lowStockProducts
                        .map(
                            product => `

                                <li>
                                    ${product.name}
                                    — estoque atual:
                                    ${product.stock}
                                    — mínimo:
                                    ${product.minimumStock}
                                </li>

                            `
                        )
                        .join("")}

                </ul>

            </div>

        `;

    }


    if (
        warningProducts.length > 0
    ) {

        html += `

            <div class="analysis-alert warning">

                <strong>
                    🟠 Atenção
                </strong>

                <ul>

                    ${warningProducts
                        .map(
                            product => `

                                <li>
                                    ${product.name}
                                    está próximo do estoque mínimo.
                                </li>

                            `
                        )
                        .join("")}

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


    analysisContainer.innerHTML =
        html;

}


// =========================================
// INICIALIZAÇÃO
// =========================================

displayProducts();

updateDashboard();

updateCharts();

analyzeStock();