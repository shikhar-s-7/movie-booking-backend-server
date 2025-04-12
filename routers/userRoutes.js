const express = require('express');
const { signup, login } = require('../controllers/userController');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { bookMovie, cancelBooking } = require('../controllers/movieController');

const router = express.Router();

//POST user signup
router.post('/signup', signup);
//POST user login
router.post('/login', login);
//GET user
router.get('/me', authenticate, userController.getCurrentUser);
//POST user booking
router.post('/book', authenticate, authorize('user'), bookMovie);
// POST cancel booking
router.post('/cancel', authenticate, authorize('user'), cancelBooking);

module.exports = router;

