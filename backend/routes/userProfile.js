const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to simulate authentication and get current user ID from session or token
// Replace this with real authentication middleware in production
function getCurrentUserId(req) {
  // For testing, use a fixed user ID
  return "64a7f0f1c2a1b2c3d4e5f678";
}

// GET /api/userProfile - get current logged-in user's profile
router.get('/', async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// PUT /api/userProfile - update current logged-in user's profile
router.put('/', async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const updateData = req.body;
    // Prevent password update here or handle separately with hashing
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

module.exports = router;
