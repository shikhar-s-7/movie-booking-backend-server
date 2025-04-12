const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// user signup
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    console.log('Received body:', req.body);

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in db
    const user = await User.create({
        username,
        password: hashedPassword
    });

    res.json({ message: 'User created' });
};

// login route
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // token creation with user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
        message: 'Login successful',
        user: {
            id: user._id,
            username: user.username,
            role: user.role
        },
        token
    });
};

//GET current user
exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
};

// admin login
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (username !== 'admin' || password !== '123456') {
        return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    // check if admin user already exists
    let admin = await User.findOne({ username: 'admin' });

    // create admin user if not present fallback
    if (!admin) {
        admin = await User.create({
        username: 'admin',
        password: '123456',
        role: 'admin'
        });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({
        message: 'Admin login successful',
        token
    });
};