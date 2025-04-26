const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  'http://localhost:3000',
  'https://student-mng-frontend.onrender.com'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});