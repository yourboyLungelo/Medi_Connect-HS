const express = require('express');
const router = express.Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');

// GET /api/userProfile/:id - Get current user's profile by idNumber from JWT
router.get('/:id', async (req, res) => {
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
      console.error('JWT verification failed bro:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const user = await User.findOne({ idNumber }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// PUT /api/userProfile/:id - Update current user's profile by idNumber from JWT
router.put('/:id', async (req, res) => {
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

    const updateData = req.body;
    console.log("Update profile request for idNumber:", idNumber);
    console.log("Update data:", updateData);

    // Prevent password updates through this route
    delete updateData.password;

    const updatedUser = await User.findOneAndUpdate({ idNumber }, updateData, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: 'Failed to update user profile' });
  }
});

module.exports = router;
