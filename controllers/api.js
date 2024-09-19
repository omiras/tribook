const Apartment = require('../models/apartment.model');

const getApartments = async (req, res) => {
    const apartments = await Apartment.find();
    return res.status(200).json({
        message: "Operation success",
        results: apartments
    })
}

module.exports = {
    getApartments
}