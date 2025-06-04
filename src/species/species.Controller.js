const Species = require("./species.Model");
const User = require("../login/user.Model");

const registerSpecies = async (req, res) => {
    const { name, diet, care } = req.body;

    if (!name || !diet || !care) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        // const existing = await Species.findSpeciesByName(name);
        // if (existing) {
        //     return res.status(409).json({ error: 'Ya existe un una especie con ese nombre' });
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

        const newSpecies = await Species.createSpecies({ name, diet, care, userId });
        return res.status(200).json({ message: 'Especie creada', id: newSpecies.id });
    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getSpecies = async (req, res) => {
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

        const species = await Species.findAll(userId);
        return res.status(200).json(species);
    } catch (error) {
        console.error('Error al obtener las especies:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};



const findSpeciesById = async (req, res) => {
    const speciesId = req.params.id;
    //console.log('ID de especie:', speciesId);
    if (!speciesId) {
        return res.status(400).json({ error: 'Falta el ID de la especie' });
    }

    try {
        const species = await Species.findSpeciesById(speciesId);
        if (!species) {
            return res.status(404).json({ error: 'Especie no encontrado' });
        }


        return res.status(200).json(species);
    } catch (error) {
        console.error('Error al buscar la especie:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { registerSpecies, getSpecies, findSpeciesById };
