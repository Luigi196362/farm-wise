const User = require('./user.Model');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const existing = await User.findUserByEmail(email);
        if (existing) {
            return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
        }

        const newUser = await User.createUser({ username, email, password });
        return res.status(200).json({ message: 'Usuario creado', id: newUser.id });
    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login request:', req.body);
    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const existing = await User.findUserByEmail(email);
        if (!existing) {
            return res.status(409).json({ error: 'No existe un usuario con ese email' });
        }

        if (existing.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        } else if (existing.password === password) {
            const registeredAt = new Date(existing.createdAt);
            const formattedDate = `${registeredAt.getDate()}/${registeredAt.getMonth() + 1}/${registeredAt.getFullYear()}`;
            return res.status(200).json({ id: existing.id, username: existing.username, email: existing.email, registeredAt: formattedDate });
        }


    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { register, login };
