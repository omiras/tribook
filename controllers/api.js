const Apartment = require('../models/apartment.model');

const getApartments = async (req, res) => {

    const limit = req.query.limit || 100000;

    if (limit < 1 || limit > 100000) {
        return res.status(400).json({
            message: "Limit parameter must be between 1 and 100000"
        })
    }

    const apartments = await Apartment.find().limit(limit);
    return res.status(200).json({
        message: "Query executed successfully",
        results: apartments
    })
}

module.exports = {
    getApartments
}