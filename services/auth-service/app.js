// auth-service/src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const { sequelize } = require('./src/models');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);



// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync(); // Sync models with the database
  })
  .catch((err) => console.error('Unable to connect to the database:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Auth-Service running on port ${PORT}`);
});
