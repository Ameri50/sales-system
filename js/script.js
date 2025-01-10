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
  const clientSearchInput = document.getElementById("clientSearchInput");
  const clientSearchButton = document.getElementById("clientSearchButton");
  
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
  
  // Función de búsqueda de productos
  const searchProducts = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const rows = Array.from(productList.getElementsByTagName("tr"));
    let found = false;
  
    rows.forEach(row => {
      const productName = row.querySelector('td:first-child')?.textContent.toLowerCase() || '';
      const matches = productName.includes(searchTerm);
      row.style.display = matches ? "" : "none";
      if (matches) found = true;
    });
  
    searchInput.classList.toggle('is-invalid', !found && searchTerm !== '');
  };
  
  // Eventos de búsqueda
  searchButton.addEventListener('click', searchProducts);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchProducts();
    if (searchInput.value === '') searchProducts();
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
  
    productList.innerHTML = "";
    rows.forEach(row => productList.appendChild(row));
  };
  
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
  
  // Función de búsqueda de clientes
  const searchClients = () => {
    const searchTerm = clientSearchInput.value.trim().toLowerCase();
    const rows = Array.from(clientList.getElementsByTagName("tr"));
    let found = false;
  
    rows.forEach(row => {
      const clientName = row.querySelector('td:first-child')?.textContent.toLowerCase() || '';
      const matches = clientName.includes(searchTerm);
      row.style.display = matches ? "" : "none";
      if (matches) found = true;
    });
  
    clientSearchInput.classList.toggle('is-invalid', !found && searchTerm !== '');
  };
  
  // Eventos de búsqueda de clientes
  clientSearchButton.addEventListener('click', searchClients);
  clientSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchClients();
    if (clientSearchInput.value === '') searchClients();
  });
  