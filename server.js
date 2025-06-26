const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose
    //.connect('mongodb://127.0.0.1:27017/empleados')
    .connect('mongodb+srv://noeclti22:6Kcab3QG1IdCWIXu@cluster0.gew1ptp.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0')
    .then((x) =>{
        console.log(`Conectado a MongoDB: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });

const empleadosRutas = require('./routes/empleado.routes');
const app = express();
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());
app.use('/api', empleadosRutas);
const PORT = process.env.PORT || 4000;
const server =app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


app.use((req, res, next) => {
    next(createError(404, 'Recurso no encontrado'));
})

app.use(function (err, req, res, next) {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
    
})


app.use((err, req, res, next) => {
  console.error(err);                       // log interno
  res.status(err.status || 500)
     .json({ message: err.message });       // respuesta al cliente
});
