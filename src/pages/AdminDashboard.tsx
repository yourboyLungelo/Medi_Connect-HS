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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
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
              {/* Placeholder for doctor management UI */}
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
