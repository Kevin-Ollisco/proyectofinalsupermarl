

document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart-btn');

    // Leer los productos del carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Si el carrito está vacío, mostrar un mensaje
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        totalPriceContainer.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;

    // Mostrar los productos en el carrito
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item'); // Añadir una clase para los productos

        // Crear la imagen del producto y agregarla al carrito
        const productImage = document.createElement('img');
        productImage.src = item.image;  // Obtener la URL de la imagen
        productImage.classList.add('product-image');  // Añadir una clase para estilos
        cartItem.appendChild(productImage);  // Añadir la imagen al contenedor del producto

        // Crear un contenedor para el nombre y precio
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info'); // Añadir la clase para organizar el contenido

        // Agregar nombre y precio
        const productName = document.createElement('span');
        productName.textContent = item.name;
        productInfo.appendChild(productName); // Agregar el nombre al contenedor

        const productDetails = document.createElement('div');
        productDetails.innerHTML = `
            <span>${item.price} bs</span>
            <span> x${item.quantity} U </span>
            <span>= ${(item.price * item.quantity).toFixed(2)} bs</span>
        `;
        productInfo.appendChild(productDetails); // Agregar el detalle del producto (precio y cantidad)

        // Agregar el contenedor con el nombre y el precio al producto
        cartItem.appendChild(productInfo);

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            // Eliminar el producto del carrito
            cart.splice(index, 1);  // Eliminar el producto por su índice

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizar la vista
            cartItemsContainer.removeChild(cartItem);
            total -= item.price * item.quantity;
            totalPriceContainer.textContent = `Total: ${total.toFixed(2)} bs`;

            // Si el carrito está vacío, mostrar el mensaje
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
                totalPriceContainer.textContent = 'Total: $0.00';
            }
        });

        // Agregar el botón de eliminar al contenedor del producto
        cartItem.appendChild(deleteButton);

        // Agregar el item al contenedor de productos
        cartItemsContainer.appendChild(cartItem);

        // Calcular el total
        total += item.price * item.quantity;
    });

    // Mostrar el precio total
    totalPriceContainer.textContent = `Total: ${total.toFixed(2)} bs`;

    // Funcionalidad para limpiar el carrito
    clearCartButton.addEventListener('click', function () {
        // Limpiar el carrito del localStorage
        localStorage.removeItem('cart');
        // Vaciar el contenedor de productos
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        totalPriceContainer.textContent = 'Total: $0.00';
    });
});
