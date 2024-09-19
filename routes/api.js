const express = require('express');
const router = express.Router();

const apiControllers = require('../controllers/api');

router.get('/apartments', apiControllers.getApartments);

module.exports = router;