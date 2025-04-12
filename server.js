// importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

//import routes
const userRoutes = require('./routers/userRoutes');
const adminRoutes = require('./routers/adminRoutes');
const movieRoutes = require('./routers/movieRoutes');

const app = express();

// middleware to parse incoming json
app.use(express.json());

// testing GET
app.get('/testget', (req, res) => {
    res.send('Movie Booking Backend is running!');
});

// testing POST
app.post('/testpost', (req, res) => {
    console.log('Received body:', req.body);
    res.send('POST works');
});

// setup static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// mongodb connection setup
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected to mongodb'); 
}).catch((err) => {
    console.error('mongodb connection failed due to error: ', err); 
});

// routers
app.use('/api/users', userRoutes);    // All user-related APIs
app.use('/api/admin', adminRoutes);   // Admin dashboard/backend routes
app.use('/api/movies', movieRoutes);  // For managing the movie data

const PORT = process.env.PORT || 8000;

// starting server
app.listen(PORT, () => {
console.log(`Server is up and running on port ${PORT}`);
});