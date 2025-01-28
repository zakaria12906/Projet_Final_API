const bcrypt = require('bcryptjs');
const { sendEmail } = require('../services/email.service');
const { User } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require('../services/token.service');

// Inscription utilisateur avec Double Opt-In
exports.signUp = async (req, res) => {
  const { login, password, firstname, lastname } = req.body;
  try {
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { login } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this login already exists.' });
    }

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      login,
      password: hashedPassword,
      firstname,
      lastname,
      isVerified: false,
    });

    // Générer un token de validation
    const verificationToken = generateAccessToken({ id: newUser.id });

    // Lien de vérification
    const verificationLink = `${process.env.BASE_URL}/auth/verify?t=${verificationToken}`;

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


    // Envoyer un e-mail de validation
    await sendEmail(
      login,
      'Account Verification',
      `Click the link to verify your account: ${verificationLink}`
    );

    res.status(201).json({
      message: 'User created successfully. Check your email to verify your account.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Vérification du compte utilisateur
exports.verifyAccount = async (req, res) => {
  const { t: token } = req.query;
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    // Marquer l'utilisateur comme vérifié
    await User.update({ isVerified: true }, { where: { id: decoded.id } });

    res.status(200).json({ message: 'Account verified successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

// Connexion utilisateur
exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.findOne({ where: { login } });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (!user.isVerified) return res.status(403).json({ message: 'Account not verified.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials.' });

    // Générer les tokens
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Rafraîchissement de token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(403).json({ message: 'Refresh token is required.' });

  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET);

    // Générer un nouveau token d'accès
    const newAccessToken = generateAccessToken({ id: decoded.id });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err.message });
  }
};


