const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/product.model');

// create middleware for user authentication

const auth = (req, res, next) => {
    const authHeader = req?.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json('No token, authorization failed');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.error("token verification failed", error.message);
        res.status(401).json('Not a valid token');

    }
};

module.exports = { auth };