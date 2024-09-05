const { Schema, model } = require('mongoose');

const reservationSchema = Schema({
    email: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
        // TODO: podéis preguntar a CHAT como realizar una validación para que startDate sea siempre antes que endDate
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' }
});

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;