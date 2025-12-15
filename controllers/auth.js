// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to sign JWT
function signToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// POST /api/auth/register
// Expect: { email, password }
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            passwordHash,
            role: 'user'
        });

        const token = signToken(user);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/auth/login
// Expect: { email, password }
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // assume Joi validated

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = signToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
