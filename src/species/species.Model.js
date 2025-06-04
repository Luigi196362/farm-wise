const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../login/user.Model');

const Species = sequelize.define('Species', {
    name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    diet: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    care: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    }
});

const findAll = async (userId) => {

    return await Species.findAll({ where: { userId } },
        {
            include: [{
                model: User,
                attributes: ['id', 'username']
            }]
        }
    );
};
const findByPk = async (id) => {
    return await Species.findByPk(id);
};

const findSpeciesByName = async (name) => {
    return await Species.findOne({ where: { name } });
};

const createSpecies = async (data) => {
    return await Species.create(data);
};

const findSpeciesById = async (id) => {
    return await Species.findOne({ where: { id } });
};

module.exports = { Species, createSpecies, findSpeciesByName, findAll, findByPk, findSpeciesById };
