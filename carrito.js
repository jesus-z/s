const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const elementos3 = document.getElementById('lista-3');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalCarrito = document.getElementById('total-carrito'); // Elemento para mostrar el total del carrito

let productosEnCarrito = []; // Array para guardar los productos y sus cantidades

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    elementos3.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: parseFloat(elemento.querySelector('.precio').textContent.replace('$', '')), // Convertir precio a número
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: 1 // Establecemos la cantidad inicial en 1
    }

    // Llamamos a insertarCarrito, pero también verificamos si ya está en el carrito
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    // Verificar si el producto ya existe en el carrito
    const productoExistente = productosEnCarrito.find(producto => producto.id === elemento.id);

    if(productoExistente){
        // Si existe, incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo añadimos al carrito
        productosEnCarrito.push(elemento);
    }

    actualizarCarrito();
}

function actualizarCarrito(){
    // Limpiar la lista de productos en el carrito
    lista.innerHTML = '';

    let total = 0; // Variable para calcular el total del carrito

    // Recorrer los productos en el carrito y agregar los elementos a la tabla
    productosEnCarrito.forEach(producto => {
        const precioTotalProducto = producto.precio * producto.cantidad; // Calcular el precio total por producto
        total += precioTotalProducto; // Sumar al total del carrito

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                $${producto.precio.toFixed(2)}
            </td>
            <td>
                Cantidad: ${producto.cantidad}
            </td>
            <td>
                $${precioTotalProducto.toFixed(2)}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });

    // Actualizar el total en la interfaz
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarElemento(e){
    e.preventDefault();
    let elementoId;

    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elementoId = e.target.parentElement.parentElement.querySelector('a').getAttribute('data-id');

        // Eliminar el producto del carrito
        productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== elementoId);
        actualizarCarrito();
    }
}

function vaciarCarrito(){
    // Vaciar el array de productos
    productosEnCarrito = [];
    actualizarCarrito();
}
// Botón para realizar la compra
const realizarCompraBtn = document.getElementById('realizar-compra');

realizarCompraBtn.addEventListener('click', function() {
    // Guardamos los datos del carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    window.location.href = 'pago.html'; // Redirigimos a la página de confirmación
});

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    return carrito ? carrito : [];  // Si no hay carrito, devolver un array vacío
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));  // Guardar el carrito como una cadena JSON
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();  // Obtener carrito actual

    // Verificar si el producto ya está en el carrito
    let productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si el producto ya está en el carrito, solo aumentamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está, lo agregamos con cantidad 1
        carrito.push({...producto, cantidad: 1});
    }

    // Guardamos el carrito actualizado
    guardarCarrito(carrito);
    mostrarCarrito();  // Mostrar carrito actualizado
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    let carrito = obtenerCarrito();  // Obtener carrito actual
    let listaCarrito = document.getElementById("lista-carrito").getElementsByTagName("tbody")[0];
    listaCarrito.innerHTML = "";  // Limpiar el carrito antes de agregar los nuevos productos

    carrito.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.imagen}" alt="${item.nombre}" width="50"></td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio}</td>
            <td>$${item.cantidad * item.precio}</td>
            <td><button class="eliminar" data-id="${item.id}">Eliminar</button></td>
        `;
        listaCarrito.appendChild(row);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();  // Obtener carrito actual
    carrito = carrito.filter(item => item.id !== id);  // Filtrar el producto que no debe eliminarse

    // Guardar el carrito actualizado
    guardarCarrito(carrito);
    mostrarCarrito();  // Mostrar carrito actualizado
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');  // Eliminar el carrito del localStorage
    mostrarCarrito();  // Mostrar carrito vacío
}

// Event listeners para los botones
document.querySelectorAll(".agregar-carrito").forEach(button => {
    button.addEventListener("click", (e) => {
        const producto = {
            id: e.target.getAttribute("data-id"),
            nombre: e.target.getAttribute("data-nombre"),
            precio: parseFloat(e.target.getAttribute("data-precio")),
            imagen: e.target.getAttribute("data-imagen") || "ruta/default.jpg"  // Si tienes imágenes
        };
        agregarAlCarrito(producto);
    });
});

// Listener para eliminar productos del carrito
document.getElementById("lista-carrito").addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const id = e.target.getAttribute("data-id");
        eliminarDelCarrito(id);
    }
});

// Listener para vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Mostrar el carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", mostrarCarrito);
