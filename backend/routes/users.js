const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');

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


const authenticate = (req, res, next) => {
  // Example authentication middleware
  // In real app, extract user ID from JWT token or session
  // Here, we simulate by reading user ID from header 'x-user-id'
  const userId = req.header('x-user-id');
  console.log("Authenticate middleware received userId:", userId);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user ID provided' });
  }
  req.userId = userId;
  next();
};

// GET /api/users/current - get current logged-in user info
router.get('/current', authenticate, async (req, res) => {
  try {
    console.log("Fetching user with idNumber:", req.userId);
    const user = await User.findOne({ idNumber: req.userId }).select('-password');
    if (!user) {
      console.log("User not found for idNumber:", req.userId);
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/request-password-reset - request password reset email
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;
    await sendEmail(user.email, 'Password Reset Request', message, `<p>${message}</p>`);

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error in request-password-reset:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/users/reset-password - reset password using token
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Error in reset-password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/users/change-password - change password for authenticated user
router.post('/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new passwords are required' });
  }
  try {
    const user = await User.findOne({ idNumber: req.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error in change-password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
