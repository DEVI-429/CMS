const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const validateInput = require('../middlewares/validateInput');

const registerSchema = {
    username: {
        regex: /^[a-zA-Z0-9]{3,}$/, 
        message: 'Username should be at least 3 of characters.'
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        message: 'Invalid Email Format'
    },
    password: {
        regex: /^.{6,}$/, 
        message: 'Password should be at least 6 characters long.'
    }
};

const loginSchema = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        message: 'Invalid Email Format'
    },
    password: {
        regex: /^.{6,}$/, 
        message: 'Password should be at least 6 characters long.'
    }
};

router.post('/register', validateInput(registerSchema), register);
router.post('/login', validateInput(loginSchema), login);
router.post('/logout', logout);

module.exports = router;