const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Middleware to simulate authentication and set current user
const mockCurrentUserId = "64a7f0f1c2a1b2c3d4e5f678"; // Replace with actual user id

// POST /api/appointments/book - book a new appointment
router.post('/book', async (req, res) => {
  try {
    const { date, time, doctor, type } = req.body;
    if (!date || !time || !doctor || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const appointment = new Appointment({
      userId: mockCurrentUserId,
      date,
      time,
      doctor,
      type,
      status: 'Scheduled',
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments/upcoming - get upcoming appointments for current user
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const appointments = await Appointment.find({
      userId: mockCurrentUserId,
      date: { $gte: now },
      status: { $ne: 'Cancelled' },
    }).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments/past - get past appointments for current user
router.get('/past', async (req, res) => {
  try {
    const now = new Date();
    const appointments = await Appointment.find({
      userId: mockCurrentUserId,
      date: { $lt: now },
    }).sort({ date: -1, time: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
