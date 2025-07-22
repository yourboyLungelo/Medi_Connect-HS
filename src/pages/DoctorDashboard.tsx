import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserSidebar from "@/components/UserSidebar";

interface Appointment {
  _id: string;
  date: string;
  time: string;
  patientName: string;
  status: string;
  notes?: string;
}

interface PatientRecord {
  _id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string;
  prescriptions: string;
  testResults: string;
  notes: string;
}

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Fetch appointments for the logged-in doctor
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments/doctor", {
          headers: {
            "x-user-id": localStorage.getItem("userId") || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError("Error loading appointments");
      }
    };

    // Fetch patient records for the logged-in doctor
    const fetchPatientRecords = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/patients/doctor", {
          headers: {
            "x-user-id": localStorage.getItem("userId") || "",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch patient records");
        const data = await res.json();
        setPatientRecords(data);
      } catch (err) {
        setError("Error loading patient records");
      }
    };

    fetchAppointments();
    fetchPatientRecords();
  }, []);

  const handleAppointmentAction = async (appointmentId: string, action: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": localStorage.getItem("userId") || "",
        },
      });
      if (!res.ok) throw new Error("Failed to update appointment");
      setMessage(`Appointment ${action}ed successfully`);
      // Refresh appointments
      const updatedAppointments = appointments.map((appt) =>
        appt._id === appointmentId ? { ...appt, status: action === "approve" ? "Approved" : "Rejected" } : appt
      );
      setAppointments(updatedAppointments);
    } catch (err) {
      setError("Error updating appointment");
    }
  };

  const handlePatientNoteUpdate = async (patientId: string, notes: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/patients/${patientId}/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": localStorage.getItem("userId") || "",
        },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error("Failed to update patient notes");
      setMessage("Patient notes updated successfully");
      // Update local state
      setPatientRecords((prev) =>
        prev.map((patient) => (patient._id === patientId ? { ...patient, notes } : patient))
      );
    } catch (err) {
      setError("Error updating patient notes");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <UserSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6 overflow-auto max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Doctor Dashboard</h1>

          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Today's Appointments</h2>
            {appointments.length === 0 ? (
              <p>No appointments scheduled for today.</p>
            ) : (
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Time</th>
                    <th className="py-2 px-4 text-left">Patient</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt._id} className="border-b">
                      <td className="py-2 px-4">{appt.date}</td>
                      <td className="py-2 px-4">{appt.time}</td>
                      <td className="py-2 px-4">{appt.patientName}</td>
                      <td className="py-2 px-4">{appt.status}</td>
                      <td className="py-2 px-4 space-x-2">
                        {appt.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleAppointmentAction(appt._id, "approve")}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleAppointmentAction(appt._id, "reject")}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Patient Records</h2>
            {patientRecords.length === 0 ? (
              <p>No patient records available.</p>
            ) : (
              <div className="space-y-6">
                {patientRecords.map((patient) => (
                  <div key={patient._id} className="bg-white rounded shadow p-4">
                    <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                    <p><strong>Prescriptions:</strong> {patient.prescriptions}</p>
                    <p><strong>Test Results:</strong> {patient.testResults}</p>
                    <label htmlFor={`notes-${patient._id}`} className="block font-medium mt-4">Notes</label>
                    <textarea
                      id={`notes-${patient._id}`}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows={4}
                      value={patient.notes}
                      onChange={(e) => {
                        const updatedNotes = e.target.value;
                        setPatientRecords((prev) =>
                          prev.map((p) => (p._id === patient._id ? { ...p, notes: updatedNotes } : p))
                        );
                      }}
                      onBlur={(e) => handlePatientNoteUpdate(patient._id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DoctorDashboard;
