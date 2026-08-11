const params = new URLSearchParams(window.location.search);

const productCode = params.get("code");


const product = products.find(
    product => product.code === productCode
);


if (!product) {

    document.getElementById("product-name").textContent =
        "Produto não encontrado";

} else {

    document.getElementById("product-name").textContent =
        product.name;

    document.getElementById("product-code").textContent =
        product.code;

    document.getElementById("product-category").textContent =
        product.category;

    document.getElementById("product-stock").textContent =
        product.stock;

    document.getElementById("product-minimum").textContent =
        product.minimumStock;


    const status =
        product.stock <= product.minimumStock
            ? "Estoque baixo"
            : "Normal";


    document.getElementById("product-status").textContent =
        status;

}