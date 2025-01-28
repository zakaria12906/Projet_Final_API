const express = require('express');
const { signUp, login, verifyAccount, refreshToken } = require('../controllers/auth.controller');

const router = express.Router();

// Routes pour l'authentification
router.post('/signup', signUp);
router.post('/login', login);
router.get('/verify', verifyAccount);
router.post('/refresh', refreshToken);

module.exports = router;
