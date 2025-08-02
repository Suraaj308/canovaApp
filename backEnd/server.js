const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const loginAuthRoutes = require('./routes/loginauth');
const homeAuthRoutes = require('./routes/homeauth');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/auth', loginAuthRoutes,homeAuthRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));