const apiControllers = require('../controllers/api');

const express = require('express');
const router = express.Router();

router.get('/apartments', apiControllers.getApartments);
router.get('/apartments/search', apiControllers.searchApartments)

module.exports = router;
