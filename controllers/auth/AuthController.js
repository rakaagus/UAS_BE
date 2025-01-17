const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
    async register(req, res){
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res){
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async logout(req, res){
        // Frontend harus menghapus token dari storage
        res.status(200).json({ message: 'Logout successful' });
    }
}

const object = new AuthController();
module.exports = object;