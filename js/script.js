/* Archivo Unificado: app.js */

let sampleProducts = [
    { name: 'Producto A', price: 100 },
    { name: 'Producto B', price: 200 },
    { name: 'Producto C', price: 150 },
  ];
  
  function TableManager(tableId) {
    this.table = document.getElementById(tableId);
    this.tbody = this.table.querySelector('tbody');
    this.headers = this.table.querySelectorAll('th[data-sort]');
  }
  
  TableManager.prototype.init = function() {
    this.headers.forEach((header) => {
      header.addEventListener('click', () => {
        const sortKey = header.dataset.sort;
        const direction = header.dataset.direction === 'asc' ? 'desc' : 'asc';
        header.dataset.direction = direction;
        this.sort(sortKey, direction);
      });
    });
  
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (event) => {
      this.search(event.target.value);
    });
  };
  
  TableManager.prototype.render = function(data) {
    this.tbody.innerHTML = '';
    data.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <button class="btn btn-warning edit-btn" data-index="${index}">Editar</button>
          <button class="btn btn-danger delete-btn" data-index="${index}">Eliminar</button>
        </td>
      `;
      this.tbody.appendChild(row);
    });
  
    this._addEventListenersToButtons();
  };
  
  TableManager.prototype.sort = function(column, direction) {
    const rows = Array.from(this.tbody.rows);
    const multiplier = direction === 'asc' ? 1 : -1;
  
    rows.sort((a, b) => {
      const aText = a.querySelector(`td:nth-child(${column === 'name' ? 1 : 2})`).textContent.trim();
      const bText = b.querySelector(`td:nth-child(${column === 'name' ? 1 : 2})`).textContent.trim();
      return aText.localeCompare(bText) * multiplier;
    });
  
    rows.forEach((row) => this.tbody.appendChild(row));
  };
  
  TableManager.prototype.search = function(query) {
    const rows = Array.from(this.tbody.rows);
    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
  };
  
  TableManager.prototype._addEventListenersToButtons = function() {
    const editButtons = this.table.querySelectorAll('.edit-btn');
    const deleteButtons = this.table.querySelectorAll('.delete-btn');
  
    // Editar
    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        const product = sampleProducts[index];
        const productForm = document.getElementById('productFormContent');
        productForm.querySelector('[name="name"]').value = product.name;
        productForm.querySelector('[name="price"]').value = product.price;
  
        // Muestra el formulario con los datos para editar
        const offcanvas = bootstrap.Offcanvas.getInstance(productForm.closest('.offcanvas'));
        offcanvas.show();
  
        // Actualizar el producto
        const submitBtn = productForm.querySelector('button[type="submit"]');
        submitBtn.addEventListener('click', (submitEvent) => {
          submitEvent.preventDefault();
          const updatedProduct = {
            name: productForm.querySelector('[name="name"]').value,
            price: parseFloat(productForm.querySelector('[name="price"]').value),
          };
          sampleProducts[index] = updatedProduct;
          this.render(sampleProducts);
          offcanvas.hide();
        });
      });
    });
  
    // Eliminar
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        sampleProducts.splice(index, 1); // Elimina el producto
        this.render(sampleProducts); // Vuelve a renderizar la tabla
      });
    });
  };
  
  function FormManager(formId, model) {
    this.form = document.getElementById(formId);
    this.model = model;
    this.offcanvas = bootstrap.Offcanvas.getInstance(this.form.closest('.offcanvas'));
  }
  
  FormManager.prototype.init = function() {
    this.form.addEventListener('reset', () => {
      this.form.querySelectorAll('input').forEach((input) => (input.value = ''));
    });
  };
  
  FormManager.prototype.getFormData = function() {
    const data = {};
    this.form.querySelectorAll('input').forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const productTable = new TableManager('productsTable');
    const productForm = new FormManager('productFormContent', 'product');
  
    productTable.init();
    productTable.render(sampleProducts);
    productForm.init();
  
    // Agregar nuevo producto
    productForm.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const newProduct = productForm.getFormData();
      sampleProducts.push(newProduct);
      productTable.render(sampleProducts);
      productForm.form.reset();
      productForm.offcanvas.hide();
    });
  });
  