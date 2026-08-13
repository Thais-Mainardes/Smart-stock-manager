// =========================================
// SMART STOCK MANAGER
// SUPPLIERS.JS
// =========================================


// =========================================
// FORNECEDORES INICIAIS
// =========================================

const defaultSuppliers = [

    {
        code: "FOR001",
        name: "Tech Solutions",
        cnpj: "00.000.000/0001-00",
        phone: "(41) 99999-9999",
        email: "contato@techsolutions.com",
        status: "Ativo"
    },

    {
        code: "FOR002",
        name: "ABC Eletrônicos",
        cnpj: "11.111.111/0001-11",
        phone: "(41) 98888-8888",
        email: "contato@abceletronicos.com",
        status: "Ativo"
    }

];


// =========================================
// CARREGAMENTO
// =========================================

let suppliers =
    JSON.parse(
        localStorage.getItem("suppliers")
    ) || defaultSuppliers;


// =========================================
// SALVAR
// =========================================

function saveSuppliers() {

    localStorage.setItem(
        "suppliers",
        JSON.stringify(suppliers)
    );

}


// =========================================
// LISTAR FORNECEDORES
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


    suppliers.forEach(
        (supplier, index) => {

            const row =
                document.createElement("tr");


            const statusClass =
                supplier.status === "Ativo"
                    ? "status-normal"
                    : "status-low";


            row.innerHTML = `

                <td>
                    ${supplier.code}
                </td>

                <td>
                    <strong>
                        ${supplier.name}
                    </strong>
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
                        ${supplier.status}
                    </span>

                </td>

                <td>

                    <button
                        onclick="deleteSupplier(${index})"
                        class="delete-button"
                    >
                        Excluir
                    </button>

                </td>

            `;


            supplierList.appendChild(row);

        }
    );

}


// =========================================
// DASHBOARD
// =========================================

function updateSupplierDashboard() {

    const total =
        suppliers.length;


    const active =
        suppliers.filter(
            supplier =>
                supplier.status === "Ativo"
        ).length;


    const inactive =
        suppliers.filter(
            supplier =>
                supplier.status === "Inativo"
        ).length;


    document.getElementById(
        "total-suppliers"
    ).textContent = total;


    document.getElementById(
        "active-suppliers"
    ).textContent = active;


    document.getElementById(
        "inactive-suppliers"
    ).textContent = inactive;

}


// =========================================
// MODAL
// =========================================

const addSupplierButton =
    document.getElementById(
        "add-supplier"
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


if (
    addSupplierButton &&
    supplierModal
) {

    addSupplierButton.addEventListener(
        "click",
        () => {

            supplierModal.style.display =
                "flex";

        }
    );

}


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


            const status =
                document.getElementById(
                    "supplier-status"
                ).value;


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

                code,
                name,
                cnpj,
                phone,
                email,
                status

            });


            saveSuppliers();

            displaySuppliers();

            updateSupplierDashboard();


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
// EXCLUSÃO
// =========================================

function deleteSupplier(index) {

    const supplier =
        suppliers[index];


    if (!supplier) {
        return;
    }


    const confirmed =
        confirm(
            `Deseja realmente excluir o fornecedor "${supplier.name}"?`
        );


    if (!confirmed) {
        return;
    }


    suppliers.splice(
        index,
        1
    );


    saveSuppliers();

    displaySuppliers();

    updateSupplierDashboard();

}


// =========================================
// INICIALIZAÇÃO
// =========================================

saveSuppliers();

displaySuppliers();

updateSupplierDashboard();