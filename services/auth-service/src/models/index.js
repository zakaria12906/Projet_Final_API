const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const User = require('./user'); // Respectez la casse exacte du nom du fichier.


// Charger les variables d'environnement
dotenv.config();

// Initialiser Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false,
  }
);

// Initialiser les modèles
const models = {
  User: User(sequelize), // Assurez-vous que user.js exporte une fonction prenant sequelize en paramètre
};

// Synchroniser les modèles avec la base de données
sequelize
  .sync()
  .then(() => console.log('Database synced successfully.'))
  .catch((err) => console.error('Error syncing database:', err));

// Exporter Sequelize et les modèles
module.exports = {
  sequelize,
  ...models,
};
