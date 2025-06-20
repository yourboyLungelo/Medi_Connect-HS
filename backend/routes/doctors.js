const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// GET /api/doctors - get all doctors or search by query
router.get('/', async (req, res) => {
  try {
    const search = req.query.search;
    let query = {};
    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive
      query = {
        $or: [
          { name: regex },
          { surname: regex },
          { staffId: regex },
          { email: regex },
          { cellphone: regex },
          { specialization: regex },
          { hospitalName: regex },
          { gender: regex },
          { status: regex },
          { licenseNumber: regex },
          { qualification: regex },
          { availability: regex },
          { bio: regex },
        ],
      };
    }
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/doctors - add a new doctor
router.post('/', async (req, res) => {
  const {
    name,
    surname,
    staffId,
    email,
    cellphone,
    specialization,
    hospitalName,
    gender,
    status,
    licenseNumber,
    qualification,
    availability,
    bio,
    profilePicture,
  } = req.body;

  if (!name || !surname || !staffId || !email || !cellphone || !specialization || !hospitalName || !gender || !status || !licenseNumber || !qualification || !availability) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingDoctor = await Doctor.findOne({ staffId });
    if (existingDoctor) {
      return res.status(409).json({ message: 'Doctor with this Staff ID already exists' });
    }

    const doctor = new Doctor({
      name,
      surname,
      staffId,
      email,
      cellphone,
      specialization,
      hospitalName,
      gender,
      status,
      licenseNumber,
      qualification,
      availability,
      bio,
      profilePicture,
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
