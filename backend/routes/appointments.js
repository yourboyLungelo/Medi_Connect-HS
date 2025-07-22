const express = require('express');
const router = express.Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');

// POST /api/appointments/book - Book a new appointment and embed in user document
router.post('/book', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let idNumber;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      idNumber = decoded.idNumber;
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const { date, time, doctor, type } = req.body;
    if (!date || !time || !doctor || !type) {
      return res.status(400).json({ message: 'Missing required appointment fields' });
    }

    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAppointment = {
      date: new Date(date),
      time,
      doctor,
      type,
      status: 'Scheduled',
    };

    user.appointments.push(newAppointment);
    await user.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
});

module.exports = router;
