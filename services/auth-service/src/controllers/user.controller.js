const { User } = require('../models');

// Mise à jour du profil utilisateur
exports.updateProfile = async (req, res) => {
  const { firstname, lastname } = req.body;
  try {
    await User.update({ firstname, lastname }, { where: { id: req.user.id } });
    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile.', error: err.message });
  }
};
