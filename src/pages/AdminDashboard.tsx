import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sections = [
  { id: "userManagement", label: "User Management" },
  { id: "appointmentManagement", label: "Appointment Management" },
  { id: "doctorManagement", label: "Doctor Management" },
  { id: "dashboardAnalytics", label: "Dashboard Analytics" },
  { id: "notificationsAlerts", label: "Notifications & Alerts" },
  { id: "messagesCommunication", label: "Messages & Communication" },
  { id: "settingsRoles", label: "Settings & Roles" },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("userManagement");
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState(null);

  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    surname: "",
    staffId: "",
    email: "",
    password: "",
    cellphone: "",
    specialization: "",
    hospitalName: "",
    gender: "",
    status: "",
    licenseNumber: "",
    qualification: "",
    availability: "",
    bio: "",
    profilePicture: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setErrorUsers(null);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setErrorUsers(error.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      setErrorDoctors(null);
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        setErrorDoctors(error.message);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header toggleSidebar={undefined} />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Panel</h2>
          <ul className="space-y-3">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-grow p-8 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

          {activeSection === "userManagement" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">User Management</h2>
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="mb-4 w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {loadingUsers ? (
                <p>Loading users...</p>
              ) : errorUsers ? (
                <p className="text-red-600">Error: {errorUsers}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-md shadow-md">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Role</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr
                            key={user._id}
                            className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                          >
                            <td className="py-3 px-6">{user.name}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">{user.role}</td>
                            <td className="py-3 px-6 space-x-2">
                              <button className="text-blue-600 hover:underline">Edit</button>
                              <button className="text-red-600 hover:underline">Remove</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4 text-gray-500">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeSection === "appointmentManagement" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Appointment Management</h2>
              <p>View and manage appointments: approve, reject, reschedule, cancel, assign doctors.</p>
              {/* Placeholder for appointment management UI */}
            </section>
          )}

          {activeSection === "doctorManagement" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Doctor Management</h2>
              <p>Manage doctor records, availability, and specialties.</p>
              <div className="mb-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => setShowAddDoctorModal(true)}
                >
                  Add New Doctor
                </button>
              </div>
              {loadingDoctors ? (
                <p>Loading doctors...</p>
              ) : errorDoctors ? (
                <p className="text-red-600">Error: {errorDoctors}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-md shadow-md">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Specialization</th>
                        <th className="py-3 px-6 text-left">Hospital Name</th>
                        <th className="py-3 px-6 text-left">Availability</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                          <tr
                            key={doctor._id}
                            className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                          >
                            <td className="py-3 px-6">{doctor.name}</td>
                            <td className="py-3 px-6">{doctor.email}</td>
                            <td className="py-3 px-6">{doctor.specialization}</td>
                            <td className="py-3 px-6">{doctor.hospitalName}</td>
                            <td className="py-3 px-6">{doctor.availability}</td>
                            <td className="py-3 px-6 space-x-2">
                              <button className="text-blue-600 hover:underline">Edit</button>
                              <button className="text-red-600 hover:underline">Remove</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-4 text-gray-500">
                            No doctors found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {showAddDoctorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-4">Add New Doctor</h3>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                          const response = await fetch("http://localhost:5000/api/doctors", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newDoctor),
                          });
                          if (!response.ok) {
                            throw new Error("Failed to add new doctor");
                          }
                          // Optionally, get the added doctor from response
                          // const addedDoctor = await response.json();
                          setShowAddDoctorModal(false);
                          setNewDoctor({
                            name: "",
                            surname: "",
                            staffId: "",
                            email: "",
                            password: "",
                            cellphone: "",
                            specialization: "",
                            hospitalName: "",
                            gender: "",
                            status: "",
                            licenseNumber: "",
                            qualification: "",
                            availability: "",
                            bio: "",
                            profilePicture: "",
                          });
                          // Refresh doctor list
                          const fetchDoctors = async () => {
                            setLoadingDoctors(true);
                            setErrorDoctors(null);
                            try {
                              const response = await fetch("http://localhost:5000/api/doctors");
                              if (!response.ok) {
                                throw new Error("Failed to fetch doctors");
                              }
                              const data = await response.json();
                              setDoctors(data);
                            } catch (error) {
                              setErrorDoctors(error.message);
                            } finally {
                              setLoadingDoctors(false);
                            }
                          };
                          fetchDoctors();
                        } catch (error) {
                          alert(error.message);
                        }
                      }}
                    >
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="name">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={newDoctor.name}
                          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="surname">
                          Surname
                        </label>
                        <input
                          id="surname"
                          type="text"
                          value={newDoctor.surname}
                          onChange={(e) => setNewDoctor({ ...newDoctor, surname: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="staffId">
                          Staff ID
                        </label>
                        <input
                          id="staffId"
                          type="text"
                          value={newDoctor.staffId}
                          onChange={(e) => setNewDoctor({ ...newDoctor, staffId: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={newDoctor.email}
                          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="cellphone">
                          Cellphone
                        </label>
                        <input
                          id="cellphone"
                          type="text"
                          value={newDoctor.cellphone}
                          onChange={(e) => setNewDoctor({ ...newDoctor, cellphone: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="specialization">
                          Specialization
                        </label>
                        <select
                          id="specialization"
                          value={newDoctor.specialization}
                          onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" disabled>
                            Select specialization
                          </option>
                          <option>General Medicine</option>
                          <option>General Surgery</option>
                          <option>Internal Medicine</option>
                          <option>Pediatrics</option>
                          <option>Obstetrics & Gynecology</option>
                          <option>Family Medicine</option>
                          <option>Emergency Medicine</option>
                          <option>Anesthesiology</option>
                          <option>Psychiatry</option>
                          <option>Orthopedic Surgery</option>
                          <option>Radiology</option>
                          <option>Pathology</option>
                          <option>Ophthalmology</option>
                          <option>Dermatology</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="hospitalName">
                          Hospital Name
                        </label>
                        <select
                          id="hospitalName"
                          value={newDoctor.hospitalName}
                          onChange={(e) => setNewDoctor({ ...newDoctor, hospitalName: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" disabled>
                            Select a hospital
                          </option>
                          <option value="Rob Ferreira Provincial Hospital (Mbombela/Nelspruit)">
                            Rob Ferreira Provincial Hospital (Mbombela/Nelspruit)
                          </option>
                          <option value="Sabie Hospital (Sabie)">Sabie Hospital (Sabie)</option>
                          <option value="Tintswalo Hospital (Acornhoek)">Tintswalo Hospital (Acornhoek)</option>
                          <option value="Mapulaneng Hospital (Bushbuckridge)">Mapulaneng Hospital (Bushbuckridge)</option>
                          <option value="Matikwana Hospital (Mkhuhlu)">Matikwana Hospital (Mkhuhlu)</option>
                          <option value="Lydenburg Hospital (Mashishing)">Lydenburg Hospital (Mashishing)</option>
                          <option value="Shongwe Mission Hospital (Schoemansdal)">Shongwe Mission Hospital (Schoemansdal)</option>
                          <option value="Tonga Hospital (Komatipoort)">Tonga Hospital (Komatipoort)</option>
                          <option value="Barberton Hospital (Barberton)">Barberton Hospital (Barberton)</option>
                          <option value="Bongani TB Hospital (Hazyview)">Bongani TB Hospital (Hazyview)</option>
                          <option value="Philadelphia Hospital (Dennilton)">Philadelphia Hospital (Dennilton)</option>
                          <option value="Embhuleni Hospital (Elukwatini)">Embhuleni Hospital (Elukwatini)</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="gender">
                          Gender
                        </label>
                        <input
                          id="gender"
                          type="text"
                          value={newDoctor.gender}
                          onChange={(e) => setNewDoctor({ ...newDoctor, gender: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="status">
                          Status
                        </label>
                        <input
                          id="status"
                          type="text"
                          value={newDoctor.status}
                          onChange={(e) => setNewDoctor({ ...newDoctor, status: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="licenseNumber">
                          License Number
                        </label>
                        <input
                          id="licenseNumber"
                          type="text"
                          value={newDoctor.licenseNumber}
                          onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="qualification">
                          Qualification
                        </label>
                        <input
                          id="qualification"
                          type="text"
                          value={newDoctor.qualification}
                          onChange={(e) => setNewDoctor({ ...newDoctor, qualification: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="availability">
                          Availability
                        </label>
                        <select
                          id="availability"
                          value={newDoctor.availability}
                          onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" disabled>
                            Select availability
                          </option>
                          <option>Mon–Fri 08:00–16:00</option>
                          <option>Mon–Fri 09:00–17:00</option>
                          <option>Mon–Sat 07:30–13:00</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="bio">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          value={newDoctor.bio}
                          onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="profilePicture">
                          Profile Picture URL
                        </label>
                        <input
                          id="profilePicture"
                          type="text"
                          value={newDoctor.profilePicture}
                          onChange={(e) => setNewDoctor({ ...newDoctor, profilePicture: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mb-4 relative">
                        <label className="block mb-1 font-medium" htmlFor="password">
                          Password
                        </label>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={newDoctor.password}
                          onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
                              <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.5 1.5A8.96 8.96 0 001 10c.73 2.89 4 7 9 7a8.96 8.96 0 004.47-1.15l1.5 1.5a.75.75 0 101.06-1.06L4.03 3.97zM10 15a5 5 0 01-5-5c0-.7.18-1.36.5-1.94l6.44 6.44A4.98 4.98 0 0110 15z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowAddDoctorModal(false)}
                          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Add Doctor
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeSection === "dashboardAnalytics" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Dashboard Analytics</h2>
              <p>Summaries and visualizations of users, appointments, and activity.</p>
              {/* Placeholder for analytics UI */}
            </section>
          )}

          {activeSection === "notificationsAlerts" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Notifications & Alerts</h2>
              <p>Pending actions, system alerts, and notifications.</p>
              {/* Placeholder for notifications UI */}
            </section>
          )}

          {activeSection === "messagesCommunication" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Messages & Communication</h2>
              <p>Broadcast announcements and send messages to users.</p>
              {/* Placeholder for messaging UI */}
            </section>
          )}

          {activeSection === "settingsRoles" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Settings & Roles</h2>
              <p>Manage admin users, permissions, system settings, and password resets.</p>
              {/* Placeholder for settings UI */}
            </section>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;