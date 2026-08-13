// =========================================
// SMART STOCK MANAGER
// PRODUCTS.JS
// LISTAGEM DE PRODUTOS
// =========================================


// =========================================
// CARREGAR PRODUTOS
// =========================================

const savedProducts =
    localStorage.getItem("products");

let productListData = [];

if (savedProducts) {

    productListData =
        JSON.parse(savedProducts);

}


// =========================================
// ELEMENTO DA TABELA
// =========================================

const productList =
    document.getElementById("product-list");


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
// EXIBIR PRODUTOS
// =========================================

function displayProducts() {

    if (!productList) {

        return;

    }


    productList.innerHTML = "";


    // Nenhum produto cadastrado

    if (productListData.length === 0) {

        productList.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="text-align: center; padding: 40px;"
                >

                    <strong>
                        Nenhum produto cadastrado
                    </strong>

                    <br>

                    <span style="color: #6b7280;">
                        Cadastre um produto pelo dashboard.
                    </span>

                </td>

            </tr>

        `;

        return;

    }


    // Criar as linhas

    productListData.forEach(product => {

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
                    href="product.html?code=${encodeURIComponent(product.code)}"
                    style="
                        color: #2563eb;
                        text-decoration: none;
                        font-weight: 600;
                    "
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

        `;


        productList.appendChild(row);

    });

}


// =========================================
// INICIALIZAÇÃO
// =========================================

displayProducts();