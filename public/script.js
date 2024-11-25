
// Este evento se asegura de cerrar el modal si haces clic fuera de él

// Inicia el proceso de inicio de sesión
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Previene el envío tradicional del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Enviar datos al backend
            });

            const data = await response.json(); // Recibir respuesta del servidor

            if (response.ok) {
                // Guardar datos del usuario en localStorage
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirigir según el rol del usuario
                if (data.user.role === 'admin') {
                     window.location.href = 'secionAdministrador.html'; // Página del administrador
                    alert('Acceso denegado. Solo los administradores pueden entrar.');
                  
                } else if (data.user.role === 'client') {
                    window.location.href = 'catalogo.html'; // Página del cliente
                }
            } else {
                alert(data.message || 'Error en las credenciales');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            alert('Ocurrió un error. Inténtalo de nuevo.');
        }
    });

    // Botón "Administrador"
    const adminButton1 = document.querySelector('.admin-button1');  
    adminButton1.addEventListener('click', function () {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.role === 'admin') {
            window.location.href = 'admin.html'; // Solo si es administrador
            alert('exito.');
        } else {
            alert('Acceso denegado. Solo los administradores pueden entrar.');
            window.location.href = 'logincliente.html';

        }
    });
});

//////////////////////////////////////////////
// Función para mostrar la categoría seleccionada
function showCategory(category) {
    // Ocultar todas las categorías
    const allCategories = document.querySelectorAll('.category-content');
    allCategories.forEach(function (categoryDiv) {
        categoryDiv.classList.remove('active');
    });

    // Ocultar los botones de la sección principal
    const buttonsContainer = document.querySelector('.botnes');
    buttonsContainer.style.display = 'none';
   

    // Mostrar la categoría seleccionada
    const categoryContent = document.getElementById(category);
    if (categoryContent) {
        categoryContent.classList.add('active');
    }
}
//////////////////////////////////////////////////////////////
// Función para ocultar el menú (si es necesario en el proyecto)
function hideMenu() {
    const nav = document.querySelector('nav');
    nav.style.display = 'none';
}
// creamos una funcion para buscar productos
function searchItems(category) {
    // Seleccionar el contenedor de la categoría actual
    const categoryContent = document.getElementById(category);

    // Obtener el valor de búsqueda del campo de texto
    const searchValue = categoryContent.querySelector('.search-input').value.toLowerCase();

    // Obtener todos los elementos que se mostrarán en la búsqueda
    const items = categoryContent.querySelectorAll('.item');

    // Iterar sobre cada elemento y mostrar/ocultar según la búsqueda
    items.forEach(item => {
        // Si el texto del elemento incluye el valor de búsqueda, se muestra; si no, se oculta
        if (item.textContent.toLowerCase().includes(searchValue)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


// document.addEventListener('DOMContentLoaded', function() {
//     // Obtener los datos del usuario desde localStorage
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     if (user) {
//         // Mostrar el nombre y el correo en los elementos correspondientes
//         document.getElementById('user-name').textContent = user.name;
//         document.getElementById('user-email').textContent = user.email;
//     } else {
//         alert('No se pudo encontrar los datos del usuario.');
//     }
    // Obtener el objeto de usuario desde localStorage
   

    // Añadir un event listener al botón para que ejecute la función al hacer clic
   






///////////////////////////////////////////////////////////

// REGISTRAR USUSARIOS MEDIANTE LA INTERFACE

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Previene el envío tradicional del formulario

        const user = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            role: 'client' // Asignar rol de cliente
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user) // Envía los datos de registro
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso');
                
                window.location.href = 'index.html'; // Redirigir a inicio de sesión
            } else {
                alert(data.message || 'Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Ocurrió un error durante el registro. Inténtalo de nuevo.');
        }
    });
});

////////////////////////////////////////////////////////////////
// agarea producto al carrito 

function addToCart(productName, productPrice, productImage) {
    // Obtener la cantidad seleccionada, si está vacía establecerla en 1
    const quantityInput = document.querySelector('.quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 0;

    // Validar que la cantidad sea un número positivo
    if (isNaN(quantity) || quantity <= 0) {
        alert('Por favor, ingrese una cantidad válida.');
        return; // Salir si la cantidad no es válida
    }

    // Obtener el carrito desde localStorage o crear uno vacío si no existe
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Comprobar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex >= 0) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push({
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: productImage  // Guardar la URL de la imagen
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar un mensaje de éxito
    alert(`${productName} ha sido agregado al carrito con ${quantity} unidades.`);
}
