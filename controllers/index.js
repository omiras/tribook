/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

// Importamos el modelo
const Apartment = require('../models/apartment.model.js');

const getApartments = async (req, res) => {

    // Obtenemos todos los apartamentos de la base de datos
    const apartments = await Apartment.find();


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

    // PAso 3 buscar apartamentos. Parsear la query string que recibo del formulario
    const { maxPrice } = req.query;


    // Obtener del modelo todos los apartamentos cuyo precio sea menor que el precio maximo que el usuairo está dispuesto a pagar

    // Pasarle estos apartamentos ya filtrados a la vista
    const apartments = await Apartment.find({ price: { $lte: maxPrice } });
    res.render('home', {
        apartments
    });
}

const postNewReservation = async = (req, res) => {
    // 1. Es una petición tipo POST-> desestructurar el req.body y obtener todos los datos de la reserva

    // 2A. DAdo el id del apartmento,  recuperar el Apartment de la colección. Luego crear la reserva Reservation.create() pasandole el apartamento que acabamos de recuperar

    // 2B. Crear directamente la reserva con Reservation.create() y establecer el campo apartment, que de tipo ObjectID, con el identificador del apartamento recuperado del formulario

    // 3. Podemos contestar con algun tipo mensaje al usuario sobre la reservada creada
    // res.json(newReservation); <-newReservation es la reserva que acabmos de crear
};

module.exports = {
    getApartments,
    getApartmentById,
    searchApartments,
    postNewReservation
}