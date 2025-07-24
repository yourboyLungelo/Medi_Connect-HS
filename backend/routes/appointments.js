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

    const { date, time, doctor, staffId, type } = req.body;
    if (!date || !time || !doctor || !staffId || !type) {
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
      staffId,
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

// GET /api/appointments/doctor?staffId=xxx - Get appointments for a doctor by staffId
router.get('/doctor', async (req, res) => {
  try {
    const { staffId } = req.query;
    if (!staffId) {
      return res.status(400).json({ message: 'Missing staffId query parameter' });
    }

    // Find all users who have appointments with this staffId
    const users = await User.find({ 'appointments.staffId': staffId }).select('idNumber name appointments');

    // Extract appointments for this doctor from all users
    const appointments = [];
    users.forEach(user => {
      user.appointments.forEach(appt => {
        if (appt.staffId === staffId) {
          appointments.push({
            userId: user.idNumber,
            userName: user.name,
            appointmentId: appt._id,
            date: appt.date,
            time: appt.time,
            doctor: appt.doctor,
            staffId: appt.staffId,
            type: appt.type,
            status: appt.status,
            additionalInfo: appt.additionalInfo,
          });
        }
      });
    });

    res.json({ appointments });
  } catch (err) {
    console.error('Error fetching appointments for doctor:', err);
    res.status(500).json({ message: 'Failed to fetch appointments for doctor' });
  }
});

module.exports = router;
