const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  role: { type: String, required: true, default: 'Admin' },
  password: { type: String, required: true },
  // Add other admin fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
