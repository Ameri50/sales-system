document.addEventListener("DOMContentLoaded", () => {
    // Referencias de elementos
    const productTableBody = document.getElementById("productTableBody");
    const clientTableBody = document.getElementById("clientTableBody");
    const editFieldName = document.getElementById("editFieldName");
    const editFieldValue = document.getElementById("editFieldValue");
    const saveChangesButton = document.getElementById("saveChangesButton");

    let currentEditItem = null;

    // Registrar Producto
    document.getElementById("productForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const stock = document.getElementById("productStock").value;

        // Crear fila para el producto
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${price}</td>
            <td>${stock}</td>
            <td><button class="btn btn-sm btn-primary edit-btn" data-type="stock">Editar Stock</button></td>
        `;
        productTableBody.appendChild(row);

        // Limpiar formulario
        document.getElementById("productForm").reset();
    });

    // Registrar Cliente
    document.getElementById("clientForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("clientName").value;
        const email = document.getElementById("clientEmail").value;

        // Crear fila para el cliente
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td><button class="btn btn-sm btn-primary edit-btn" data-type="email">Editar Correo</button></td>
        `;
        clientTableBody.appendChild(row);

        // Limpiar formulario
        document.getElementById("clientForm").reset();
    });

    // Abrir Offcanvas para Editar
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const row = e.target.closest("tr");
            currentEditItem = row; // Guardar referencia a la fila
            const type = e.target.dataset.type; // Identificar tipo de edición

            // Configurar el formulario del offcanvas
            if (type === "stock") {
                editFieldName.value = "Stock";
                editFieldValue.value = row.children[2].textContent; // Obtener valor actual del stock
            } else if (type === "email") {
                editFieldName.value = "Correo";
                editFieldValue.value = row.children[1].textContent; // Obtener valor actual del correo
            }

            // Mostrar el offcanvas
            const offcanvas = new bootstrap.Offcanvas(document.getElementById("myOffcanvas"));
            offcanvas.show();
        }
    });

    // Guardar Cambios desde el Offcanvas
    saveChangesButton.addEventListener("click", () => {
        if (currentEditItem) {
            const type = editFieldName.value; // Campo que se está editando
            const newValue = editFieldValue.value; // Nuevo valor ingresado

            // Actualizar el valor correspondiente
            if (type === "Stock") {
                currentEditItem.children[2].textContent = newValue; // Actualizar stock
            } else if (type === "Correo") {
                currentEditItem.children[1].textContent = newValue; // Actualizar correo
            }

            // Cerrar el offcanvas
            bootstrap.Offcanvas.getInstance(document.getElementById("myOffcanvas")).hide();
        }
    });

    // Cambiar entre pestañas de Productos y Clientes
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const tab = e.target.dataset.tab;

            // Mostrar contenido de la pestaña seleccionada
            document.querySelectorAll(".tab-content").forEach((content) => {
                content.style.display = content.id === tab ? "block" : "none";
            });

            // Cambiar el estado activo del botón
            document.querySelectorAll(".tab-button").forEach((btn) => {
                btn.classList.toggle("active", btn === e.target);
            });
        });
    });
});
