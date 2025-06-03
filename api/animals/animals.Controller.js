const Animal = require('./animals.Model');
const User = require('../login/user.Model');
// const Species = require('../species/species.Model');

const registerAnimals = async (req, res) => {
    const { groupName, speciesId, quantity } = req.body;

    if (!groupName || !speciesId || !quantity) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        // const existing = await Animal.findAnimalsByGroupName(groupName);
        // if (existing) {
        //     return res.status(409).json({ error: 'Ya existe un grupo de animales con ese nombre' });
        // }
        const userId = req.headers.authorization;
        //console.log('User ID:', userId);
        if (!userId) {
            return res.status(400).json({ error: 'Falta el ID del usuario en los headers' });
        }

        const userExists = await User.findUserById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // const speciesExists = await Species.findByPk(speciesId);
        const newAnimal = await Animal.createAnimals({ groupName, speciesId, quantity, userId });
        return res.status(200).json({ message: 'Grupo de animales creado', id: newAnimal.id });


    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getAnimals = async (req, res) => {
    try {
        const userId = req.headers.authorization;
        //console.log('User ID:', userId);
        if (!userId) {
            return res.status(400).json({ error: 'Falta el ID del usuario en los headers' });
        }

        const userExists = await User.findUserById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const animals = await Animal.findAll(userId);
        return res.status(200).json(animals);
    } catch (error) {
        console.error('Error al obtener los animales:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
module.exports = { registerAnimals, getAnimals };
