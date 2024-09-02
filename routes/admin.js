// Rutas de administrador

// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// Middleware específico para rutas prefijadas por '/admin' para cambiar isAdmin a true
router.use((req, res, next) => {
    res.locals.isAdmin = true;
    next();
});

// importar todos los controladores de controllers/admin.js

// Crear primer endpoint de administrador que es el que nos permite mostrar un formulario para añadir un nuevo apartamento
const adminControllers = require('../controllers/admin.js');

router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm);
router.post('/apartment/new-apartment', adminControllers.postNewApartment);
router.get('/apartment/:idApartment', adminControllers.getApartmentById);
router.get('/apartment/:idApartment/edit', adminControllers.getNewApartmentForm);


module.exports = router;