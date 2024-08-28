// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index.js');

// Router funciona igual que el "app" para crear los endpoints. Nos permite definir un conjunto arbitrario de rutas
router.get('/', indexControllers.getApartments);

// ruta dinámica para detalle del apartamento
router.get('/apartment/:idApartment', indexControllers.getApartmentById);


// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;