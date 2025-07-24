import React from "react";

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const role = localStorage.getItem("role") || null;

  if (role !== "patient" && role !== null) {
    // Do not show user sidebar if role is not patient or role is null
    return null;
  }

  return (
    <aside className={`fixed inset-y-0 left-0 bg-white shadow-md w-64 transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-4">
        <button onClick={toggleSidebar} className="mb-4 text-gray-600 hover:text-gray-900 focus:outline-none">
          Close
        </button>
        <nav>
          <ul>
            <li><a href="/dashboard" className="block py-2 px-4 hover:bg-gray-100 rounded">Dashboard</a></li>
            <li><a href="/profile" className="block py-2 px-4 hover:bg-gray-100 rounded">Profile</a></li>
            <li><a href="/bookappointment" className="block py-2 px-4 hover:bg-gray-100 rounded">Appointments</a></li>
            <li><a href="/settings" className="block py-2 px-4 hover:bg-gray-100 rounded">Settings</a></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default UserSidebar;
