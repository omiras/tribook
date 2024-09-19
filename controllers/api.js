const Apartment = require('../models/apartment.model');

const getApartments = async (req, res) => {

    // Comprobar el valor del parámetro req.query.limit que esté 1 y 100000
    // Si req.query.limit es menor de 1 O req.query.limit es mayor de 10000, devolver un mensaje de error
    // Además, tenemos que comprobar si realmente me estan pasando un número
    if (req.query.limit < 1 || req.query.limit > 100000) {
        return res.status(400).json({
            message: "The 'limit' parameter must be a number between 1 and 100000"
        })
    }

    // 1. Queremos ser capaces de obtener de la query string el valor del parámetro limit
    const limit = req.query.limit || 100000;


    // 21.45 -> Corregir la primera parte, es decir, que si está informado el parámetro 'limit', devolver como mucho ese número de apartmentos

    const apartments = await Apartment.find().limit(limit);


    // 2. Devolver una respuesta
    res.status(200).json({
        message: "Query executed successfully",
        results: apartments // TODO: Completar con todos los apartmentos de la base de datos
    })
}

module.exports = {
    getApartments
}