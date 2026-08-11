const params =
    new URLSearchParams(
        window.location.search
    );


const productCode =
    params.get("code");


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


const product =
    products.find(
        product =>
            product.code === productCode
    );


const productName =
    document.getElementById(
        "product-name"
    );


const productCodeElement =
    document.getElementById(
        "product-code"
    );


const productStatus =
    document.getElementById(
        "product-status"
    );


const infoCode =
    document.getElementById(
        "info-code"
    );


const infoCategory =
    document.getElementById(
        "info-category"
    );


const infoStock =
    document.getElementById(
        "info-stock"
    );


const infoMinimum =
    document.getElementById(
        "info-minimum"
    );


const stockNumber =
    document.getElementById(
        "stock-number"
    );


const movementsContainer =
    document.getElementById(
        "product-movements"
    );


function getProductStatus(product) {

    if (
        product.stock <=
        product.minimumStock
    ) {

        return {
            className: "status-low",
            label: "Estoque baixo"
        };

    }


    if (
        product.stock <=
        product.minimumStock * 1.5
    ) {

        return {
            className: "status-warning",
            label: "Atenção"
        };

    }


    return {
        className: "status-normal",
        label: "Normal"
    };

}


function displayProduct() {

    if (!product) {

        productName.textContent =
            "Produto não encontrado";

        productCodeElement.textContent =
            "O produto solicitado não existe.";

        return;

    }


    const status =
        getProductStatus(product);


    productName.textContent =
        product.name;


    productCodeElement.textContent =
        `Código: ${product.code}`;


    productStatus.textContent =
        status.label;


    productStatus.className =
        `status ${status.className}`;


    infoCode.textContent =
        product.code;


    infoCategory.textContent =
        product.category;


    infoStock.textContent =
        product.stock;


    infoMinimum.textContent =
        product.minimumStock;


    stockNumber.textContent =
        product.stock;

}


function displayMovements() {

    if (!product) {
        return;
    }


    const movements =
        JSON.parse(
            localStorage.getItem("movements")
        ) || [];


    const productMovements =
        movements.filter(
            movement =>
                movement.productCode ===
                product.code
        );


    movementsContainer.innerHTML = "";


    if (
        productMovements.length === 0
    ) {

        movementsContainer.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="text-align: center;"
                >
                    Nenhuma movimentação
                    registrada.
                </td>

            </tr>

        `;

        return;

    }


    productMovements.forEach(
        movement => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${movement.date}
                </td>

                <td>
                    ${movement.type}
                </td>

                <td>
                    ${movement.quantity}
                </td>

                <td>
                    ${movement.observation || "-"}
                </td>

            `;


            movementsContainer.appendChild(
                row
            );

        }
    );

}


displayProduct();

displayMovements();