const express = require('express');
const { signUp, signIn, validateToken } = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', signUp);

// Signin route
router.post('/signin', signIn);

// Token validation route
router.get('/validate', validateToken);

module.exports = router;
