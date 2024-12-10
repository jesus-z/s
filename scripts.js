// Variables globales
const cart = [];
const cartItemsElement = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');

// Función para actualizar el carrito
function updateCart() {
    cartItemsElement.innerHTML = '';
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<li class="dropdown-item text-center">El carrito está vacío</li>';
        cartCountElement.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartItemsElement.innerHTML += `
            <li class="dropdown-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity})
                <span>$${item.price * item.quantity}</span>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
            </li>`;
    });

    cartItemsElement.innerHTML += `
        <li><hr class="dropdown-divider"></li>
        <li class="dropdown-item text-center"><strong>Total: Bs${total}</strong></li>`;
}

// Función para cargar el carrito desde localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart.push(...JSON.parse(storedCart));
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        updateCart();
    }
}

// Función para agregar productos al carrito
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCart();
}

// Asignar eventos a los botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

// Cargar el carrito al iniciar
loadCart();
