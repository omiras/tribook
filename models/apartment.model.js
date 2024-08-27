// Your code here ...
const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true,
        min: 0
    },
    mainPhoto: {
        type: String,
        required: true,
        match: ['\b((https?|ftp):\/\/[-\w+&@#/%=~_|!:,.;]+[-\w+&@#/%=~_|])', "URL not valid"]
    },
    services: {
        // array de strings 
        // ["wifi", "air aconditionar"]
        // objeto con los servicios { wifi: true, airConditioner: false}
        wifi: Boolean,
        airConditioner: Boolean,
        kitchen: Boolean,
        disability: Boolean,
        heater: Boolean,
        tv: Boolean
    }

});

