// =========================================
// SMART STOCK MANAGER
// FORNECEDORES
// =========================================


// =========================================
// DADOS DOS FORNECEDORES
// =========================================

let suppliers =
    JSON.parse(
        localStorage.getItem("suppliers")
    ) || [];


// =========================================
// PERSISTÊNCIA
// =========================================

function saveSuppliers() {

    localStorage.setItem(
        "suppliers",
        JSON.stringify(suppliers)
    );

}


// =========================================
// LISTAGEM
// =========================================

function displaySuppliers() {

    const supplierList =
        document.getElementById(
            "supplier-list"
        );

    if (!supplierList) {
        return;
    }

    supplierList.innerHTML = "";


    if (suppliers.length === 0) {

        supplierList.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    style="text-align: center;"
                >
                    Nenhum fornecedor cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    suppliers.forEach(
        supplier => {

            const row =
                document.createElement("tr");


            const statusClass =
                supplier.active
                    ? "status-normal"
                    : "status-low";


            const statusLabel =
                supplier.active
                    ? "Ativo"
                    : "Inativo";


            row.innerHTML = `

                <td>
                    ${supplier.code}
                </td>

                <td>
                    ${supplier.name}
                </td>

                <td>
                    ${supplier.cnpj}
                </td>

                <td>
                    ${supplier.phone}
                </td>

                <td>
                    ${supplier.email}
                </td>

                <td>

                    <span
                        class="status ${statusClass}"
                    >
                        ${statusLabel}
                    </span>

                </td>

            `;


            supplierList.appendChild(row);

        }
    );

}


// =========================================
// MODAL
// =========================================

const newSupplierButton =
    document.getElementById(
        "new-supplier"
    );


const supplierModal =
    document.getElementById(
        "supplier-modal"
    );


const closeSupplierModal =
    document.getElementById(
        "close-supplier-modal"
    );


const supplierForm =
    document.getElementById(
        "supplier-form"
    );


// ABRIR

if (
    newSupplierButton &&
    supplierModal
) {

    newSupplierButton.addEventListener(
        "click",
        () => {

            supplierModal.style.display =
                "flex";

        }
    );

}


// FECHAR

if (
    closeSupplierModal &&
    supplierModal
) {

    closeSupplierModal.addEventListener(
        "click",
        () => {

            supplierModal.style.display =
                "none";

        }
    );

}


// =========================================
// CADASTRO
// =========================================

if (supplierForm) {

    supplierForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const code =
                document.getElementById(
                    "supplier-code"
                ).value.trim();


            const name =
                document.getElementById(
                    "supplier-name"
                ).value.trim();


            const cnpj =
                document.getElementById(
                    "supplier-cnpj"
                ).value.trim();


            const phone =
                document.getElementById(
                    "supplier-phone"
                ).value.trim();


            const email =
                document.getElementById(
                    "supplier-email"
                ).value.trim();


            const existingSupplier =
                suppliers.find(
                    supplier =>
                        supplier.code === code
                );


            if (existingSupplier) {

                alert(
                    "Já existe um fornecedor com este código."
                );

                return;

            }


            suppliers.push({

                code: code,

                name: name,

                cnpj: cnpj,

                phone: phone,

                email: email,

                active: true

            });


            saveSuppliers();

            displaySuppliers();

            supplierForm.reset();

            supplierModal.style.display =
                "none";


            alert(
                "Fornecedor cadastrado com sucesso!"
            );

        }
    );

}


// =========================================
// INICIALIZAÇÃO
// =========================================

displaySuppliers();