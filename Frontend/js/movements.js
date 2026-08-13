// =========================================
// SMART STOCK MANAGER
// MOVEMENTS.JS
// =========================================


// =========================================
// MOVIMENTAÇÕES INICIAIS
// =========================================

const defaultMovements = [

    {
        date: "11/08/2026",
        productCode: "NB001",
        product: "Notebook",
        type: "Entrada",
        quantity: 10,
        description: "Compra de novos equipamentos"
    },

    {
        date: "11/08/2026",
        productCode: "MS001",
        product: "Mouse",
        type: "Saída",
        quantity: 2,
        description: "Entrega para funcionário"
    }

];


// =========================================
// CARREGAMENTO DAS MOVIMENTAÇÕES
// =========================================

let movements =
    JSON.parse(
        localStorage.getItem("movements")
    ) || defaultMovements;


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


function saveMovements() {

localStorage.setItem(
    "movements",
    JSON.stringify(movements)
);


}

function displayMovements() {

const movementList =
    document.getElementById("movement-list");

movementList.innerHTML = "";

movements.forEach(movement => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${movement.date}</td>
        <td>${movement.product}</td>
        <td>${movement.type}</td>
        <td>${movement.quantity}</td>
        <td>${movement.description}</td>
    `;

    movementList.appendChild(row);

});


}

function loadProducts() {

const productSelect =
    document.getElementById("movement-product");

productSelect.innerHTML =
    '<option value="">Selecione um produto</option>';

products.forEach(product => {

    const option =
        document.createElement("option");

    option.value = product.code;

    option.textContent =
        `${product.code} - ${product.name}`;

    productSelect.appendChild(option);

});


}

const newMovementButton =
document.getElementById("new-movement");

const movementModal =
document.getElementById("movement-modal");

const closeMovementModal =
document.getElementById("close-movement-modal");

const movementForm =
document.getElementById("movement-form");

newMovementButton.addEventListener("click", () => {

movementModal.style.display = "flex";


});

closeMovementModal.addEventListener("click", () => {

movementModal.style.display = "none";


});

movementForm.addEventListener("submit", event => {

event.preventDefault();


const productCode =
    document.getElementById("movement-product").value;

const type =
    document.getElementById("movement-type").value;

const quantity =
    Number(
        document.getElementById("movement-quantity").value
    );

const description =
    document.getElementById("movement-description").value;


const product =
    products.find(
        product => product.code === productCode
    );


if (!product) {

    alert("Produto não encontrado.");

    return;

}


if (quantity <= 0) {

    alert("A quantidade deve ser maior que zero.");

    return;

}


if (type === "EXIT" && quantity > product.stock) {

    alert(
        "Não é possível realizar a saída. Estoque insuficiente."
    );

    return;

}


if (type === "ENTRY") {

    product.stock += quantity;

}


if (type === "EXIT") {

    product.stock -= quantity;

}


movements.push({

    date: new Date().toLocaleDateString("pt-BR"),

    productCode: product.code,

    product: product.name,

    type: type === "ENTRY"
        ? "Entrada"
        : "Saída",

    quantity: quantity,

    description: description

});


saveMovements();

localStorage.setItem(
"products",
JSON.stringify(products)
);

displayMovements();

movementForm.reset();

movementModal.style.display = "none";


alert(
    "Movimentação registrada com sucesso!"
);

})

displayMovements();

loadProducts();

localStorage.setItem(
"products",
JSON.stringify(products)
);