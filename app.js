//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 1000;
let timeAutoNext= 9000; 

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext);
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
    
}
// Función para obtener el carrito de localStorage
function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    return carrito ? carrito : [];
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    let productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        // Si el producto ya está en el carrito, solo aumentamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está, lo añadimos
        carrito.push({...producto, cantidad: 1});
    }
    
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    let carrito = obtenerCarrito();
    let listaCarrito = document.getElementById("lista-carrito").getElementsByTagName("tbody")[0];
    listaCarrito.innerHTML = ""; // Limpiar el carrito antes de agregar los nuevos productos

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
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Event listeners para los botones
document.querySelectorAll(".agregar-carrito").forEach(button => {
    button.addEventListener("click", (e) => {
        const producto = {
            id: e.target.getAttribute("data-id"),
            nombre: e.target.getAttribute("data-nombre"),
            precio: parseFloat(e.target.getAttribute("data-precio")),
            imagen: e.target.getAttribute("data-imagen") || "ruta/default.jpg"  // Si tienes imagenes
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

// Mostrar el carrito cuando la página se carga
document.addEventListener("DOMContentLoaded", mostrarCarrito);


