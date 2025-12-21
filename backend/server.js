const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Routes = require('./routes/routes.js');


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bishupandit07:heloeveryone@cluster0.qiosg5f.mongodb.net/rent')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api', Routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
