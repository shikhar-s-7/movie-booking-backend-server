const Movie = require('../models/Movie');

// add a new movie
exports.addMovie = async (req, res) => {
    const { name, availableSeats, time } = req.body;


// create the movie entry in db
const movie = await Movie.create({ name, availableSeats, time});

res.json(movie);

};

// list all movies
exports.listMovies = async (req, res) => {
    const movies = await Movie.find();
    res.json(movies);
};

// book seats for a movie
exports.bookMovie = async (req, res) => {
    const { movieId, seats } = req.body;
    const userId = req.user._id;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        if (seats < 1 || seats > 4) {
            return res.status(400).json({ error: 'You can book between 1 and 4 seats only' });
        }

        if (movie.availableSeats < seats) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }

        movie.availableSeats -= seats;
        await movie.save();

        return res.status(201).json({
            message: 'Booking successful',
            updatedMovie: movie,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


// cancel user's booking
exports.cancelBooking = async (req, res) => {
    const { movieId, seats } = req.body;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        movie.availableSeats += seats;
        await movie.save();

        return res.status(200).json({
            message: 'Booking successfully cancelled',
            updatedMovie: movie,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

