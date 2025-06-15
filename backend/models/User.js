const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'Patient' }, // Added role field
  // Add other user fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
