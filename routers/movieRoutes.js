const express = require('express');
const { listMovies } = require('../controllers/movieController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

//GET all movies
router.get('/', authenticate, listMovies);

module.exports = router;
