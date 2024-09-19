const apiControllers = require('../controllers/api');

const express = require('express');
const router = express.Router();

router.get('/apartments', apiControllers.getApartments);
router.get('/apartments/search', apiControllers.searchApartments);
router.post('/apartments/new-apartment', apiControllers.postApartment);

module.exports = router;
