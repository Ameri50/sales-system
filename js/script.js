// Variables globales
const productForm = document.getElementById('product-form');
const customerForm = document.getElementById('customer-form');
const salesForm = document.getElementById('sales-form');

const productList = document.getElementById('product-list');
const customerList = document.getElementById('customer-list');
const salesList = document.getElementById('sales-list');

const productSelect = document.getElementById('product-select');
const customerSelect = document.getElementById('customer-select');
const saleTotal = document.getElementById('sale-total');

let products = [];
let customers = [];
let sales = [];

// Gestión de Productos
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);

    if (name && price > 0 && stock > 0) {
        const product = { name, price, stock };
        products.push(product);

        updateProductList();
        productForm.reset();
    } else {
        alert('Por favor, ingresa valores válidos.');
    }
});

function updateProductList() {
    productList.innerHTML = '';
    productSelect.innerHTML = '<option value="" disabled selected>Seleccionar Producto</option>';
    products.forEach((product, index) => {
        productList.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="updateStock(${index})">Actualizar Stock</button>
                </td>
            </tr>
        `;
        productSelect.innerHTML += `<option value="${index}">${product.name}</option>`;
    });
}

function updateStock(index) {
    const newStock = prompt('Ingrese el nuevo stock:');
    if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
        products[index].stock = parseInt(newStock);
        updateProductList();
    } else {
        alert('Por favor, ingresa un número válido.');
    }
}

// Gestión de Clientes
customerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;

    if (name && email) {
        const customer = { name, email, purchaseCount: 0 };
        customers.push(customer);

        updateCustomerList();
        customerForm.reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

function updateCustomerList() {
    customerList.innerHTML = '';
    customerSelect.innerHTML = '<option value="" disabled selected>Seleccionar Cliente</option>';
    customers.forEach((customer, index) => {
        customerList.innerHTML += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.purchaseCount}</td>
                <td>
                    <button onclick="updateEmail(${index})">Actualizar Email</button>
                </td>
            </tr>
        `;
        customerSelect.innerHTML += `<option value="${index}">${customer.name}</option>`;
    });
}

function updateEmail(index) {
    const newEmail = prompt('Ingrese el nuevo email:');
    if (newEmail) {
        customers[index].email = newEmail;
        updateCustomerList();
    } else {
        alert('Por favor, ingresa un email válido.');
    }
}

// Registro de Ventas
salesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const customerIndex = customerSelect.value;
    const productIndex = productSelect.value;
    const quantity = parseInt(document.getElementById('product-quantity').value);

    if (customerIndex && productIndex && quantity > 0) {
        const product = products[productIndex];
        const customer = customers[customerIndex];

        if (product.stock >= quantity) {
            // Reducir el stock
            product.stock -= quantity;

            // Incrementar contador de compras del cliente
            customer.purchaseCount++;

            // Calcular total
            const total = product.price * quantity;

            // Registrar la venta
            const sale = {
                customer: customer.name,
                product: product.name,
                quantity,
                total,
            };
            sales.push(sale);

            updateSalesList();
            updateProductList();
            updateCustomerList();
            saleTotal.textContent = total.toFixed(2);
        } else {
            alert('No hay suficiente stock disponible.');
        }
    } else {
        alert('Por favor, selecciona cliente, producto y cantidad válida.');
    }
});

function updateSalesList() {
    salesList.innerHTML = '';
    sales.forEach((sale) => {
        salesList.innerHTML += `
            <li>
                Cliente: ${sale.customer}, Producto: ${sale.product}, 
                Cantidad: ${sale.quantity}, Total: $${sale.total.toFixed(2)}
            </li>
        `;
    });
}
