const express = require('express');
const { adminLogin } = require('../controllers/userController');
const { addMovie } = require('../controllers/movieController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
//POST admin login
router.post('/login', adminLogin);
//POST admin to add new movie
router.post('/add', authenticate, authorize('admin'), addMovie);

module.exports = router;
