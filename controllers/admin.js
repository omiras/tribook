// importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = (req, res) => {

    // Obtener todos los apartmentos de la base de datos
    const apartments = Apartment.find();

    res.render('new-apartment.ejs')
}

const postNewApartment = async (req, res) => {
    Apartment.create({

    });

    res.send('Apartmaneto creado');
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartment
}

