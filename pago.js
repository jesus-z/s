// Obtener los productos del carrito desde localStorage
const productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productosCompra = document.getElementById('productos-compra');
const totalCompra = document.getElementById('total-compra');
const pagarBtn = document.getElementById('pagar-btn');

// Mostrar los productos en la tabla
function mostrarProductos() {
    let total = 0;
    productosCompra.innerHTML = ''; // Limpiar la tabla

    productosEnCarrito.forEach(producto => {
        const precioTotalProducto = producto.precio * producto.cantidad;
        total += precioTotalProducto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.titulo}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>$${precioTotalProducto.toFixed(2)}</td>
        `;
        productosCompra.appendChild(row);
    });

    // Mostrar el total
    totalCompra.textContent = `Total: $${total.toFixed(2)}`;
}

// Generar el PDF de la compra
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Factura de Compra', 20, 20);

    // Agregar los productos al PDF
    let y = 30;
    productosEnCarrito.forEach(producto => {
        doc.text(`${producto.titulo} - $${producto.precio.toFixed(2)} x ${producto.cantidad}`, 20, y);
        y += 10;
    });

    // Mostrar el total en el PDF
    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    doc.text(`Total: $${total.toFixed(2)}`, 20, y + 10);

    // Descargar el PDF
    doc.save('factura_compra.pdf');
}

// Al cargar la página, mostrar los productos
mostrarProductos();

// Al hacer clic en "Pagar", generar el PDF
pagarBtn.addEventListener('click', generarPDF);
