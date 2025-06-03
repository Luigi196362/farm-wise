require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const defineAssociations = require('./associations');
const servless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());


const loginRoutes = require('./login/auth.Routes');
const animalRoutes = require('./animals/animals.Routes');
const speciesRoutes = require('./species/species.Routes');
app.use('/api/auth', loginRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/species', speciesRoutes);

// Sincronizar base de datos y levantar el servidor
const PORT = process.env.PORT || 3000;
defineAssociations();
sequelize.sync({ alter: true }) // crea o modifica las tablas según los modelos
    .then(() => {
        console.log('✅ Conexión a la base de datos establecida.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al conectar a la base de datos:', err);
    });

module.exports.handler = servless(app); // Exportar la aplicación para pruebas o despliegue en otros entornos