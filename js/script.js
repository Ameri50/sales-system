// Definición de las clases Producto y Cliente
function Customer(name, email) {
    this.name = name;
    this.email = email;
}

function Product(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
}

// Referencias a los elementos del DOM
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const clientForm = document.getElementById("clientForm");
const clientList = document.getElementById("clientList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortButton = document.getElementById("sortButton");

// Arreglos para almacenar los productos y clientes
const products = [];
const customers = [];

// Manejo del formulario de productos
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;

    const newProduct = new Product(productName, productPrice, productStock);
    products.push(newProduct);

    const productRow = document.createElement("tr");
    productRow.innerHTML = `
      <td>${productName}</td>
      <td>${productPrice}</td>
      <td>${productStock}</td>
      <td>
        <button class="btn btn-sm btn-warning update-stock">Actualizar Stock</button>
      </td>
    `;

    productList.appendChild(productRow);
    productForm.reset();
});

// Manejo de clic en el listado de productos (actualizar stock)
productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("update-stock")) {
        const row = e.target.closest("tr");
        const stockCell = row.children[2];

        const offcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasWithBothOptions"));
        offcanvas.show();

        document.getElementById("stockInput").value = stockCell.textContent;

        const saveButton = document.getElementById("saveStock");
        saveButton.onclick = () => {
            const newStock = document.getElementById("stockInput").value;
            stockCell.textContent = newStock;
            offcanvas.hide();
        };
    }
});

// Manejo del formulario de clientes
clientForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const clientName = document.getElementById("clientName").value;
    const clientEmail = document.getElementById("clientEmail").value;

    const newCustomer = new Customer(clientName, clientEmail);
    customers.push(newCustomer);

    const clientRow = document.createElement("tr");
    clientRow.innerHTML = `
      <td>${clientName}</td>
      <td>${clientEmail}</td>
      <td>
        <button class="btn btn-sm btn-warning update-email">Actualizar Email</button>
      </td>
    `;

    clientList.appendChild(clientRow);
    clientForm.reset();
});

// Manejo de clic en el listado de clientes (actualizar email)
clientList.addEventListener("click", (e) => {
    if (e.target.classList.contains("update-email")) {
        const row = e.target.closest("tr");
        const emailCell = row.children[1];
        const newEmail = prompt("Ingrese el nuevo email:", emailCell.textContent);
        if (newEmail !== null) {
            emailCell.textContent = newEmail;
        }
    }
});

// Función de búsqueda de productos
const searchProducts = () => {
    const searchTerm = searchInput.value.trim().toLowerCase(); // Obtener la palabra clave en minúsculas
    const rows = Array.from(productList.getElementsByTagName("tr")); // Obtener todas las filas de productos
    let found = false; // Variable para saber si encontramos algún producto

    // Recorrer las filas de productos
    rows.forEach(row => {
        const productName = row.querySelector('td:first-child')?.textContent.toLowerCase() || ''; // Obtener el nombre del producto
        const matches = productName.includes(searchTerm); // Comprobar si el nombre del producto incluye la palabra clave
        row.style.display = matches ? "" : "none"; // Mostrar u ocultar la fila según si hay coincidencia
        if (matches) found = true; // Si encontramos al menos un producto, ponemos found a true
    });

    // Feedback visual: mostrar o quitar la clase 'is-invalid' si no hay resultados
    searchInput.classList.toggle('is-invalid', !found && searchTerm !== '');

    // Crear y mostrar el mensaje de "No se encontraron productos" si no hay resultados
    const noResultsMsg = document.getElementById('noResultsMsg') || createNoResultsMessage();
    noResultsMsg.style.display = (!found && searchTerm !== '') ? 'block' : 'none';
};

// Crear un mensaje de "No se encontraron productos"
const createNoResultsMessage = () => {
    const msg = document.createElement('div');
    msg.id = 'noResultsMsg';
    msg.className = 'alert alert-warning mt-2';
    msg.textContent = 'No se encontraron productos';
    productList.parentNode.insertBefore(msg, productList.nextSibling);
    return msg;
};

// Eventos de búsqueda
searchButton.addEventListener('click', searchProducts); // Al hacer clic en el botón de búsqueda, llamar a searchProducts
searchInput.addEventListener('keyup', (e) => { // Al escribir en el input, llamar a searchProducts
    if (e.key === 'Enter') {
        searchProducts(); // Si presionan Enter, realizar la búsqueda
    }
    if (searchInput.value === '') {
        searchProducts(); // Resetear la vista si se borra el valor del input
    }
});


// Funcionalidad del botón de ordenar productos por stock
let isAscendent = true;

sortButton.onclick = () => {
    const rows = Array.from(productList.getElementsByTagName("tr"));
    rows.sort((rowA, rowB) => {
        const stockA = +rowA.children[2].textContent;
        const stockB = +rowB.children[2].textContent;

        return isAscendent ? stockA - stockB : stockB - stockA;
    });

    isAscendent = !isAscendent;

    productList.innerHTML = ""; // Limpiar la lista existente
    rows.forEach(row => productList.appendChild(row)); // Reagregar filas ordenadas
};
