const express = require('express');
const { updateProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Routes pour la gestion du profil utilisateur
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
