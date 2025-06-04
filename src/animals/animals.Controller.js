const Animal = require('./animals.Model');
const User = require('../login/user.Model');
const AnimalDto = require('./animals.Dto');
const { Species } = require('../species/species.Model');

const registerAnimals = async (req, res) => {
    const { groupName, speciesId, quantity } = req.body;

    if (!groupName || !speciesId || !quantity) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const userId = req.headers.authorization;
        if (!userId) {
            return res.status(400).json({ error: 'Falta el ID del usuario en los headers' });
        }

        const userExists = await User.findUserById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const speciesExists = await Species.findByPk(speciesId);
        if (!speciesExists) {
            return res.status(404).json({ error: 'Especie no encontrada' });
        }

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
        if (!userId) {
            return res.status(400).json({ error: 'Falta el ID del usuario en los headers' });
        }

        const userExists = await User.findUserById(userId);
        if (!userExists) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const animals = await Animal.findAll(userId);
        const animalDto = [];

        for (const animal of animals) {
            const species = await Species.findByPk(animal.speciesId);
            const speciesName = species.name;

            animalDto.push(new AnimalDto(
                animal.id,
                animal.groupName,
                speciesName,
                animal.quantity
            ));
        }

        return res.status(200).json(animalDto);
    } catch (error) {
        console.error('Error al obtener los animales:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

};

const findAnimalById = async (req, res) => {
    const animalId = req.params.id;

    if (!animalId) {
        return res.status(400).json({ error: 'Falta el ID del animal' });
    }

    try {
        const animal = await Animal.findAnimalById(animalId);
        if (!animal) {
            return res.status(404).json({ error: 'Animal no encontrado' });
        }


        return res.status(200).json(animal);
    } catch (error) {
        console.error('Error al buscar el animal:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
module.exports = { registerAnimals, getAnimals, findAnimalById };
