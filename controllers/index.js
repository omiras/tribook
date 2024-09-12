/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */
const mongoose = require('mongoose');

// Importamos el modelo
const Apartment = require('../models/apartment.model.js');
const Reservation = require('../models/reservation.model.js');

const getApartments = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find().sort({ _id: -1 });
    console.log(res.locals.success_msg)

    res.render('home', {
        apartments,

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

    // mentos. Parsear la query string que recibo del formulario
    const { maxPrice, orderBy } = req.query;

    // Diccionario para criterios de ordenación
    const orderDict = {
        "default": { _id: -1 },
        "minPrice": { price: 1 }
    }

    const sortCriteria = orderDict[orderBy];
    console.log("🚀 ~ file: index.js:43 ~ searchApartments ~ sortCriteria:", orderBy)


    // Obtener del modelo todos los apartamentos cuyo precio sea menor que el precio maximo que el usuairo está dispuesto a pagar

    // Pasarle estos apartamentos ya filtrados a la vista
    const apartments = await Apartment.find({ price: { $lte: maxPrice } }).sort(sortCriteria);
    res.render('home', {
        apartments
    });
}


const postNewReservation = async (req, res) => {
    // 1. Es una petición tipo POST-> desestructurar el req.body y obtener todos los datos de la reserva
    const { email, startDate, endDate, idApartment } = req.body;

    // 2A. DAdo el id del apartmento,  recuperar el Apartment de la colección. Luego crear la reserva Reservation.create() pasandole el apartamento que acabamos de recuperar
    const apartment = await Apartment.findById(idApartment);
    const newReservation = await Reservation.create({
        email,
        startDate,
        endDate,
        apartment
    });


    // 2B. Crear directamente la reserva con Reservation.create() y establecer el campo apartment, que de tipo ObjectID, con el identificador del apartamento recuperado del formulario
    // const newReservation = await Reservation.create({
    //     email,
    //     startDate,
    //     endDate,
    //     apartment: new mongoose.Types.ObjectId(idApartment)
    // });
    // 3. Podemos contestar con algun tipo mensaje al usuario sobre la reservada creada
    res.json(newReservation);
};

module.exports = {
    getApartments,
    getApartmentById,
    searchApartments,
    postNewReservation
}