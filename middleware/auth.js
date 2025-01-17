const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthMiddleware{
    protect(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
    
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
    
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded; // Tambahkan data user ke request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
}

const object = new AuthMiddleware();
module.exports = object;
