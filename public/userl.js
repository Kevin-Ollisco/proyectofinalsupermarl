document.addEventListener('DOMContentLoaded', function () {
    const userContainer = document.getElementById('user-container');
    const searchInput = document.getElementById('search-input');

    let usersData = []; // Para almacenar los usuarios cargados

    // Cargar usuarios
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            usersData = users; // Almacenar datos de los usuarios
            renderUsers(users); // Renderizar los usuarios inicialmente
        })
        .catch(error => console.error('Error al obtener usuarios:', error));

    // Renderizar usuarios en el contenedor
    function renderUsers(users) {
        userContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar
        users.forEach(user => {
            // Crear el contenedor para cada usuario
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            // Imagen del usuario
            const userImage = document.createElement('img');
            userImage.src = `./image/${user.image}`;

            // Datos del usuario
            const userData = document.createElement('div');
            userData.className = 'user-data';
            userData.innerHTML = `
                <strong>${user.name}</strong><br>
                <em>${user.email}</em><br>
                ${user.role}
            `;

            // Botón de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => openEditForm(user));

            // Agregar elementos al contenedor
            userCard.appendChild(userImage);
            userCard.appendChild(userData);
            userCard.appendChild(editButton);
            userContainer.appendChild(userCard);
        });
    }

    // Función para buscar usuarios
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase(); // Convertir búsqueda a minúsculas
        const filteredUsers = usersData.filter(user => user.name.toLowerCase().includes(searchTerm));
        renderUsers(filteredUsers); // Renderizar solo los usuarios que coincidan
    });

    // Abrir el formulario de edición
    function openEditForm(user) {
        document.getElementById('edit-id').value = user.id;
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-role').value = user.role;
        document.getElementById('edit-form-container').style.display = 'block';
    }

    // Cerrar el formulario de edición
    window.closeEditForm = function () {
        document.getElementById('edit-form-container').style.display = 'none';
    };

    // Manejar la actualización del usuario
    document.getElementById('edit-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const id = document.getElementById('edit-id').value;
        const updatedUser = {
            name: document.getElementById('edit-name').value,
            email: document.getElementById('edit-email').value,
            role: document.getElementById('edit-role').value,
        };

        fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        })
            .then(response => {
                if (response.ok) {
                    alert('Usuario actualizado exitosamente');
                    closeEditForm();
                    location.reload(); // Recargar la lista de usuarios
                } else {
                    alert('Error al actualizar el usuario');
                }
            })
            .catch(error => console.error('Error al actualizar el usuario:', error));
    });
});
