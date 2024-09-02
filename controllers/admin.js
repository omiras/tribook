// importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = async (req, res) => {

    const { idApartment } = req.params;

    let apartment = {};
    // ¿Estamos editando?
    if (idApartment) {
        apartment = await Apartment.findById(idApartment);
    }

    res.render('new-apartment.ejs', {
        apartment
    })
}

const getApartmentById = async (req, res) => {
    // 1. Voy al modelo para obtener el apartamento dado su id
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment);

    res.render('detail-apartment', {
        selectedApartment
    });
}

const postNewApartment = async (req, res) => {

    // Me han metido más servicios en el req.services que los servicios que yo quiero? kitchen, wifi, etc. res.status(400).send('Ha ocurrido un error');

    // Editar apartamento
    if (req.body.id) {
        // findoneandbyid and update    
        await Apartment.findByIdAndUpdate(req.body._id, req.body);
        res.send('Apartamento ACUTALIZADO correctamente');
        return;
    }

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
    postNewApartment,
    getApartmentById
}

