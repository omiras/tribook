const Apartment = require('../models/apartment.model');

const getApartments = async (req, res) => {

    const limit = req.query.limit || 100000;

    if (limit < 1 || limit > 100000) {
        return res.status(400).json({
            message: "'Limit' parameter must be between 1 and 100000"
        })
    }

    const apartments = await Apartment.find().limit(limit);
    return res.status(200).json({
        message: "Query executed successfully",
        results: apartments
    })
}

const searchApartments = async (req, res) => {
    const { q } = req.query;

    if (!q || q.length < 3 || q.length > 100) {
        return res.status(400).json({
            message: "'q' parameter must be between 3 and 100 characters long"
        })
    }

    const apartments = await Apartment.find({
        $or: [
            { title: new RegExp(q, 'i') },
            { description: new RegExp(q, 'i') }
        ]
    });
    return res.status(200).json({
        message: "Query executed successfully",
        results: apartments
    })
}

const postApartment = async (req, res) => {
    const { title, description, price, size, mainPhoto } = req.body;
    console.log("🚀 ~ file: api.js:43 ~ postApartment ~ title:", title)

    if (!title || title.length < 3 || title.length > 30) {
        return res.status(400).json({
            message: "'title' parameter must be between  3 and 30 character long"
        })
    }

    try {
        const apartmentCreated = await Apartment.create({ title, description, price, size, mainPhoto });
        return res.status(201).json({
            message: "Apartment created correctly",
            apartmentId: apartmentCreated._id
        })

    } catch (error) {
        return res.status(500).json({
            message: `Something went wrong...apartment was not created. Error: ${error.message}`
        })
    }
}

module.exports = {
    getApartments,
    searchApartments,
    postApartment
}