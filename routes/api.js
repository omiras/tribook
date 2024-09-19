const apiControllers = require('../controllers/api');

const express = require('express');
const router = express.Router();

router.get('/apartments', apiControllers.getApartments);

module.exports = router;
