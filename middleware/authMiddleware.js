const jwt = require('jsonwebtoken');
const User = require('../models/User');

// check if user has a valid token
exports.authenticate = async (req, res, next) => {
  // pull token from authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        // verifying token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // fetch user info and attach it to request object
        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// role-based access control
exports.authorize = (...roles) => (req, res, next) => {

    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

  next(); // role is authorized
};