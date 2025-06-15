const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// GET /api/admins - get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // exclude password
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admins/login - admin login
router.post('/login', async (req, res) => {
  const { idNumber, password } = req.body;
  if (!idNumber || !password) {
    return res.status(400).json({ message: 'ID Number and password are required' });
  }
  try {
    const admin = await Admin.findOne({ idNumber, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid ID Number or Password' });
    }
    res.json({ idNumber: admin.idNumber, name: admin.name, email: admin.email, phoneNumber: admin.phoneNumber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

module.exports = router;
