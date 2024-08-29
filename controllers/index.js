/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

// Importamos el modelo
const Apartment = require('../models/apartment.model.js');

const getApartments = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}

const getApartmentById = async (req, res) => {
    // 1. Voy al modelo para obtener el apartamento dado su id
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment);

    res.render('detail-apartment', {
        selectedApartment
    });
};

const searchApartments = async (req, res) => {

    // Parsear la query string que recibo del formulario

    // Obtener del modelo todos los apartamentos cuyo precio sea menor que el precio maximo que el usuairo está dispuesto a pagar

    // Pasarle estos apartamentos ya filtrados a la vista
    const apartments = [];
    res.send('home', {
        apartments
    });
}

module.exports = {
    getApartments,
    getApartmentById,
    searchApartments
}