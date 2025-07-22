require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ add this
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins'); 
const doctorRoutes = require('./routes/doctors');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/doctors', doctorRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

mongoose.connect('mongodb://localhost:27017/Healthcare', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
