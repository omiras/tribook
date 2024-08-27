/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

const getApartments = (req, res) => {
    res.render('home');
}

module.exports = {
    getApartments
}