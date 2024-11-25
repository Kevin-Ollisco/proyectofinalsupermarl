class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    verifyClient(req, res, next) {
        const userId = req.userId; // Suponiendo que tienes middleware que establece el userId en req
        const user = this.userService.getUsers().find(u => u.id === userId);
        if (user && user.role === 'client') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Solo para clientes.' });
        }
    }

    verifyAdmin(req, res, next) {
        const userId = req.userId; // Suponiendo que tienes middleware que establece el userId en req
        const user = this.userService.getUsers().find(u => u.id === userId);
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. Solo para administradores.' });
        }
    }
    // Método para crear un nuevo usuario
    createUser(req, res) {
        const { name, username, password, email, address, phone, age, image } = req.body;
        
        // Crear el usuario con rol 'client' por defecto
        const newUser = {
            id: this.userService.getUsers().length + 1,
            name,
            username,
            password,
            email,
            address,
            phone,
            age,
            image: image || 'default.png',
            role: 'client'
        };

        this.userService.addUser(newUser);
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    }

}

module.exports = UserController;
