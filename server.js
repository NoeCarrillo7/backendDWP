const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors'); // Asegúrate de que esté instalado

// Conexión a MongoDB
mongoose
    .connect('mongodb+srv://noeclti22:6Kcab3QG1IdCWIXu@cluster0.gew1ptp.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) => {
        console.log(`Conectado a MongoDB: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });

// Rutas
const empleadosRutas = require('./routes/empleado.routes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Ruta base para API
app.use('/api', empleadosRutas);

// ---------- Rutas inexistentes ----------
app.use((req, res, next) => {
    next(createError(404, 'Recurso no encontrado'));
});

// ---------- Manejador de errores ----------
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || err.statusCode || 500)
       .json({ message: err.message });
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
