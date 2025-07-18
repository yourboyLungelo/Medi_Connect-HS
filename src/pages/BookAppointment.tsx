import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSidebar from "@/components/UserSidebar";

interface Doctor {
  _id: string;
  name: string;
  surname: string;
  specialization: string;
  hospitalName: string;
  bio?: string;
  email?: string;
  cellphone?: string;
}

const BookAppointment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/doctors");
        const data = await res.json();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDoctors(doctors);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = doctors.filter(
        (doc) =>
          doc.name.toLowerCase().includes(term) ||
          doc.surname.toLowerCase().includes(term) ||
          doc.specialization.toLowerCase().includes(term) ||
          doc.hospitalName.toLowerCase().includes(term)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  const openBookingModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingDate("");
    setBookingTime("");
    setAppointmentType("");
    setAdditionalInfo("");
    setMessage("");
    setError("");
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedDoctor(null);
  };

  const openInfoModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedDoctor(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!selectedDoctor) {
      setError("No doctor selected.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    const formData = {
      date: bookingDate,
      time: bookingTime,
      doctor: selectedDoctor._id,
      type: appointmentType,
      additionalInfo,
    };

    try {
      const res = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Appointment booked successfully.");
        setBookingDate("");
        setBookingTime("");
        setAppointmentType("");
        setAdditionalInfo("");
      } else {
        setError(data.message || "Failed to book appointment.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6 overflow-auto max-w-5xl ">
          <h1 className="text-3xl font-semibold mb-4">Book Appointment</h1>

          {/* Search Panel */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search doctors by name, surname, specialization, or hospital"
              className="w-full p-3 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Doctors List */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {filteredDoctors.length === 0 && (
              <p className="text-center col-span-full">No doctors found.</p>
            )}
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white p-4 rounded shadow flex flex-col justify-between w-full"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    Dr. {doctor.name} {doctor.surname}
                  </h2>
                  <p className="text-gray-700">{doctor.specialization}</p>
                  <p className="text-gray-700">{doctor.hospitalName}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => openInfoModal(doctor)}
                    className="flex-grow bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Info
                  </button>
                  <button
                    onClick={() => openBookingModal(doctor)}
                    className="flex-grow bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Modal */}
          {showInfoModal && selectedDoctor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded p-6 max-w-md w-full relative">
                <button
                  onClick={closeInfoModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  aria-label="Close info modal"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                  Dr. {selectedDoctor.name} {selectedDoctor.surname}
                </h2>
                <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                <p><strong>Hospital:</strong> {selectedDoctor.hospitalName}</p>
                {selectedDoctor.bio && <p className="mt-2"><strong>Bio:</strong> {selectedDoctor.bio}</p>}
                {selectedDoctor.email && <p className="mt-2"><strong>Email:</strong> {selectedDoctor.email}</p>}
                {selectedDoctor.cellphone && <p className="mt-2"><strong>Phone:</strong> {selectedDoctor.cellphone}</p>}
              </div>
            </div>
          )}

          {/* Booking Modal */}
          {showBookingModal && selectedDoctor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
              <div className="bg-white rounded p-6 max-w-md w-full relative max-h-full overflow-auto">
                <button
                  onClick={closeBookingModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  aria-label="Close booking modal"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">
                  Book Appointment with Dr. {selectedDoctor.name} {selectedDoctor.surname}
                </h2>
                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-4">
                    <label htmlFor="date" className="block mb-1 font-medium">Date</label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="time" className="block mb-1 font-medium">Time</label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="type" className="block mb-1 font-medium">Type</label>
                    <select
                      id="type"
                      name="type"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      required
                    >
                      <option value="">Select appointment type</option>
                      <option value="General Consultation">General Consultation</option>
                      <option value="Annual Check-up">Annual Check-up</option>
                      <option value="Specialist Consultation">Specialist Consultation</option>
                      <option value="Vaccination">Vaccination</option>
                      <option value="Diagnostic test">Diagnostic test</option>
                      <option value="Follow-up Visit">Follow-up Visit</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="additionalInfo" className="block mb-1 font-medium">Additional Information</label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                  {message && <p className="mt-4 text-green-600">{message}</p>}
                  {error && <p className="mt-4 text-red-600">{error}</p>}
                </form>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default BookAppointment;
