const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');



router.post('/register', async (req, res) => {
  try {
    console.log("Registration request body:", req.body);
    const { idNumber, name, email, phoneNumber, password } = req.body;
    if (!idNumber || !name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user with role "Patient"
    const newUser = new User({
      idNumber,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error during registration" });
  }
});

// GET /api/users - get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/current - get current logged-in user info
router.get('/current', async (req, res) => {
  try {
    // For demo, using mockCurrentUserId
    const user = await User.findById(mockCurrentUserId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
