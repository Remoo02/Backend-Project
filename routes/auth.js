// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validators/auth');

// POST /api/auth/register
router.post(
    '/register',
    validate(registerSchema),
    authController.register
);

// POST /api/auth/login
router.post(
    '/login',
    validate(loginSchema),
    authController.login
);

module.exports = router;
