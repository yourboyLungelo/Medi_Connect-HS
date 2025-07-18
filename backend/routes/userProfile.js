const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/userProfile/:id - Get current user's profile by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// PUT /api/userProfile/:id - Update current user's profile by ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    console.log("Update profile request for userId:", userId);
    console.log("Update data:", updateData);

    // Prevent password updates through this route
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

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
