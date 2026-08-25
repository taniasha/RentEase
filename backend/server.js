require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./routes/routes.js');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rent';

mongoose
  .connect(mongoURI)
  .then(() => console.log(`MongoDB connected successfully to ${mongoURI}`))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
