const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctor: { type: String, required: true },
  staffId: { type: String, required: false },
  type: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
  additionalInfo: { type: String, required: false },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'Patient' }, // Added role field
  dob: { type: Date, required: false }, // Added DOB field
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  appointments: [AppointmentSchema], // Embedded appointments
  // Add other user fields as needed
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
