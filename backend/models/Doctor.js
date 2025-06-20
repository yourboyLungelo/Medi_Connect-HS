const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  staffId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  cellphone: { type: String, required: true },
  specialization: { type: String, required: true },
  hospitalName: { type: String, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  qualification: { type: String, required: true },
  availability: { type: String, required: true },
  bio: { type: String, required: false },
  profilePicture: { type: String, required: false }, // URL or base64 string
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
