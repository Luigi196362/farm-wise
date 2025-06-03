const { DataTypes } = require('sequelize');
const sequelize = require('../../src/config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

// Funciones auxiliares
const findUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const createUser = async (data) => {
    return await User.create(data);
};


module.exports = { User, findUserByEmail, createUser, findUserById };
