const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables desde .env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_PORT,
    {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
);

module.exports = sequelize;
