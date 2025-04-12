const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
