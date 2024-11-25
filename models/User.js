class User {
    constructor(id, name, username, password, email, address, phone, age, image, role) {
        this.id = id;
        this.name = name;             // Nombre completo
        this.username = username;     // Nombre de usuario
        this.password = password;     // Contraseña
        this.email = email;           // Correo electrónico
        this.address = address;       // Dirección de envío
        this.phone = phone;           // Teléfono de contacto
        this.age = age;               // Edad del usuario
        this.image = image;           // Imagen de perfil
        this.role = role;             // 'admin' o 'client'
    }
}

module.exports = User;
