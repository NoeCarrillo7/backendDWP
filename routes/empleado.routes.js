const express = require('express');
const empleadoRouter = express.Router();

// Importar el modelo de Empleado
let Empleado = require('../models/Empleado');

// Agregar un nuevo empleado
empleadoRouter.route('/agregar').post((req, res) => {
    Empleado.create(req.body)
    .then((data) =>{
        console.log('Empleado agregado: ');
        res.send(data);
    })
    .catch((error) => {
        console.error('Error al agregar empleado:', error);
    });
});

// Obtener todos los empleados
empleadoRouter.route('/empleados').get((req, res) => {
    Empleado.find()
    .then((data) => {
        console.log('Empleados obtenidos: ');
        res.send(data);
    })
    .catch((error) => {
        console.error('Error al obtener empleados:', error);
    });
});

//Obtener un empleado por ID
empleadoRouter.route('/empleado/:id').get((req, res) => {
    Empleado.findById(req.params.id)
    .then((data) => {
        console.log('Empleado obtenido: ');
        res.send(data);
    })
    .catch((error) => {
        console.error('Error al obtener empleado:', error);
    });
});

// Actualizar un empleado por ID
empleadoRouter.route('/actualizar/:id').put((req, res) => {
    Empleado.findByIdAndUpdate(req.params.id,{
        $set: req.body
    })
    .then((data) => {
        console.log('Empleado actualizado: ');
        res.send(data);
    })
    .catch((error) => {
        console.error('Error al actualizar empleado:', error);
    });
});

// Eliminar un empleado por ID
empleadoRouter.route('/eliminar/:id').delete((req, res) => {
    Empleado.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('Empleado eliminado: ');
        res.send(data);
    })
    .catch((error) => {
        console.error('Error al eliminar empleado:', error);
    });
});

module.exports = empleadoRouter;
