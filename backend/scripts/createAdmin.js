const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const mongoURI = 'mongodb://localhost:27017/Healthcare';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');

  const adminData = {
    idNumber: 'admin001',
    name: 'Admin User',
    email: 'admin@example.com',
    phoneNumber: '1234567890',
    password: 'adminpassword' // In production, hash the password
  };

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ idNumber: adminData.idNumber });
  if (existingAdmin) {
    console.log('Admin with this idNumber already exists.');
  } else {
    const admin = new Admin(adminData);
    await admin.save();
    console.log('Admin user created successfully.');
  }

  mongoose.disconnect();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
