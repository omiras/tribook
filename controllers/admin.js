// importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = (req, res) => {

    // Obtener todos los apartmentos de la base de datos
    const apartments = Apartment.find();

    res.render('new-apartment.ejs')
}

const postNewApartment = async (req, res) => {

    await Apartment.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        mainPhoto: req.body.mainPhoto
    });

    res.send('Apartamaneto creado');
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartment
}

