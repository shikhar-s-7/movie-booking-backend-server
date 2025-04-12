const mongoose = require('mongoose');

// user schema — represents app users (regular users + admins)
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required:true,
        trim:true
    },    
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
});

module.exports = mongoose.model('User', userSchema);
