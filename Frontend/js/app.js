const products = [
    {
        code: "P001",
        name: "Notebook",
        category: "Eletrônicos",
        stock: 15,
        minimumStock: 5
    },
    {
        code: "P002",
        name: "Mouse",
        category: "Periféricos",
        stock: 3,
        minimumStock: 5
    },
    {
        code: "P003",
        name: "Teclado",
        category: "Periféricos",
        stock: 10,
        minimumStock: 5
    },
    {
        code: "P004",
        name: "Monitor",
        category: "Eletrônicos",
        stock: 2,
        minimumStock: 3
    }
];

function displayProducts() {
    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {

        const row = document.createElement("tr");

        const status = product.stock <= product.minimumStock
            ? "Estoque baixo"
            : "Normal";

        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.minimumStock}</td>
            <td>${status}</td>
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